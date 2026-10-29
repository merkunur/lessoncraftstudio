/* =====================================================================
   second-ring-activity.js — ACTIVITY #159 of the one-by-one rebuild:
   "Sprocket's Clock — 12-Hour & 24-Hour" → THE SECOND RING (2.MD.C.7,
   extended; all 11 locales). Model: second-ring-core.js (SecondRingCore).
   Design: docs/activities-rebuild/designs/159-clock-convert.md
   ---------------------------------------------------------------------
   The invention: the hour hand carries a counting tag. The open card shows
   a time one way; the child WRITES it the other way. On Check the clock
   runs from midnight to the CHILD's time: on the first lap the tag says
   the face's numbers, after the noon sun it keeps counting 13, 14, 15…
   and drops each number into an empty socket under the face's numeral —
   the 24-hour clock is the second ring. The given time stays on the face
   as dashed outlines; a right answer lands in them and its token stays in
   the ring for the session.
   No timer, no score; numerals only on the face, the ring and the cards.
   Test seams: window.SecondRingActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._type / ._back / ._focus /
   ._part / ._check / ._ring / ._g / .FAST / .OK_MS.
   ===================================================================== */
var SecondRingActivity = {
  id: 'second-ring',
  /* the drawn apparatus (the hierarchy gate): the clock, the ring, the cards */
  apparatusClasses: ['sr-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Sprocket's Clock","de":"Kikos Uhr","fr":"L’horloge de Sprocket","es":"El reloj de Quico","pt":"O relógio do Kiko","it":"Chicco e il suo orologio","nl":"Kukels 24-uursklok","sv":"Sprockets dygnsklocka","da":"Sprockets døgnur","no":"Sprockets døgnklokke","fi":"Sprocketin vuorokausikello"},
    instruction: {"en":"Read the open card. Write the same time the other way: the 24-hour way, or the 12-hour way with its part of the day. Press Check and the clock runs from midnight to your time. After noon the tag on the hour hand keeps counting 13, 14, 15… and fills the second ring.","de":"Lies die offene Karte. Schreib dieselbe Uhrzeit auf die andere Art: mit 24 Stunden, oder mit 12 Stunden und der Tageszeit. Drück auf Prüfen, dann läuft die Uhr von Mitternacht bis zu deiner Uhrzeit. Nach 12 Uhr mittags zählt das Schild am Stundenzeiger weiter, 13, 14, 15 …, und füllt den zweiten Ring.","fr":"Lis la carte ouverte. Écris la même heure de l’autre façon : sur 24 heures, ou sur 12 heures avec le moment de la journée. Appuie sur Vérifier et l’horloge tourne de minuit jusqu’à ton heure. Après midi, l’étiquette de la petite aiguille continue de compter, 13, 14, 15…, et remplit le deuxième anneau.","es":"Lee la tarjeta abierta. Escribe la misma hora de la otra forma: en formato de 24 horas, o en formato de 12 horas con su parte del día. Presiona Revisar y el reloj corre desde la medianoche hasta tu hora. Después del mediodía, la etiqueta de la manecilla de las horas sigue contando 13, 14, 15… y llena el segundo anillo.","pt":"Leia o cartão aberto. Escreva a mesma hora do outro jeito: no formato de 24 horas, ou no de 12 horas com o período do dia. Aperte Conferir e o relógio anda da meia-noite até a sua hora. Depois do meio-dia, a etiqueta do ponteiro das horas continua contando 13, 14, 15… e preenche o segundo anel.","it":"Leggi il cartellino aperto. Scrivi la stessa ora nell’altro modo: nel formato 24 ore, oppure nel formato 12 ore con il momento della giornata. Premi Controlla e l’orologio corre da mezzanotte fino alla tua ora. Dopo mezzogiorno l’etichetta della lancetta delle ore continua a contare 13, 14, 15… e riempie il secondo anello.","nl":"Lees de open kaart. Schrijf dezelfde tijd op de andere manier: in de 24-uursnotatie, of in de 12-uursnotatie met het dagdeel. Druk op Controleer en de klok loopt van middernacht naar jouw tijd. Na 12 uur ’s middags telt het labeltje aan de kleine wijzer door, 13, 14, 15…, en vult de tweede ring.","sv":"Läs det öppna kortet. Skriv samma tid på det andra sättet: med 24 timmar, eller med 12 timmar och fm eller em. Tryck på Kolla, så går klockan från midnatt till din tid. Efter klockan tolv på dagen fortsätter lappen på timvisaren att räkna, 13, 14, 15 …, och fyller den andra ringen.","da":"Læs det åbne kort. Skriv det samme klokkeslæt på den anden måde: med 24 timer, eller med 12 timer og tiden på dagen. Tryk på Tjek, så kører uret fra midnat til dit klokkeslæt. Efter klokken tolv midt på dagen tæller mærket på den lille viser videre, 13, 14, 15 …, og fylder den anden ring.","no":"Les det åpne kortet. Skriv det samme klokkeslettet på den andre måten: med 24 timer, eller med 12 timer og tiden på dagen. Trykk på Sjekk, så går klokka fra midnatt til klokkeslettet ditt. Etter klokka tolv på dagen teller merkelappen på timeviseren videre, 13, 14, 15 …, og fyller den andre ringen.","fi":"Lue avoin kortti. Kirjoita sama aika toisella tavalla: 24 tunnin kellona tai 12 tunnin kellona ap. tai ip. -merkinnän kanssa. Paina Tarkista, niin kello kulkee keskiyöstä sinun aikaasi. Keskipäivän jälkeen tuntiviisarin lappu jatkaa laskemista, 13, 14, 15…, ja täyttää toisen renkaan."},
    taskLine: {"en":"Read the open card. Write the same time the other way.","de":"Lies die offene Karte. Schreib dieselbe Uhrzeit auf die andere Art.","fr":"Lis la carte ouverte. Écris la même heure de l’autre façon.","es":"Lee la tarjeta abierta. Escribe la misma hora de la otra forma.","pt":"Leia o cartão aberto. Escreva a mesma hora do outro jeito.","it":"Leggi il cartellino aperto. Scrivi la stessa ora nell’altro modo.","nl":"Lees de open kaart. Schrijf dezelfde tijd op de andere manier.","sv":"Läs det öppna kortet. Skriv samma tid på det andra sättet.","da":"Læs det åbne kort. Skriv det samme klokkeslæt på den anden måde.","no":"Les det åpne kortet. Skriv det samme klokkeslettet på den andre måten.","fi":"Lue avoin kortti. Kirjoita sama aika toisella tavalla."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    openLabel: {"en":"The open card","de":"Die offene Karte","fr":"La carte ouverte","es":"La tarjeta abierta","pt":"O cartão aberto","it":"Il cartellino aperto","nl":"De open kaart","sv":"Det öppna kortet","da":"Det åbne kort","no":"Det åpne kortet","fi":"Avoin kortti"},
    answer24: {"en":"Write it the 24-hour way","de":"Schreib sie mit 24 Stunden","fr":"Écris-la sur 24 heures","es":"Escríbela en formato de 24 horas","pt":"Escreva no formato de 24 horas","it":"Scrivila nel formato 24 ore","nl":"Schrijf het in de 24-uursnotatie","sv":"Skriv den med 24 timmar","da":"Skriv det med 24 timer","no":"Skriv det med 24 timer","fi":"Kirjoita 24 tunnin kellona"},
    answer12: {"en":"Write it the 12-hour way","de":"Schreib sie mit 12 Stunden","fr":"Écris-la sur 12 heures","es":"Escríbela en formato de 12 horas","pt":"Escreva no formato de 12 horas","it":"Scrivila nel formato 12 ore","nl":"Schrijf het in de 12-uursnotatie","sv":"Skriv den med 12 timmar","da":"Skriv det med 12 timer","no":"Skriv det med 12 timer","fi":"Kirjoita 12 tunnin kellona"},
    aHourBox: {"en":"Hour","de":"Stunde","fr":"Heure","es":"Hora","pt":"Hora","it":"Ora","nl":"Uur","sv":"Timme","da":"Time","no":"Time","fi":"Tunti"},
    aMinBox: {"en":"Minutes","de":"Minuten","fr":"Minutes","es":"Minutos","pt":"Minutos","it":"Minuti","nl":"Minuten","sv":"Minuter","da":"Minutter","no":"Minutter","fi":"Minuutit"},
    aChips: {"en":"Part of the day","de":"Tageszeit","fr":"Moment de la journée","es":"Parte del día","pt":"Período do dia","it":"Momento della giornata","nl":"Dagdeel","sv":"fm eller em","da":"Tid på dagen","no":"Tid på dagen","fi":"Ap. tai ip."},
    aBack: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    aRing: {"en":"Second ring: {list}","de":"Zweiter Ring: {list}","fr":"Deuxième anneau : {list}","es":"Segundo anillo: {list}","pt":"Segundo anel: {list}","it":"Secondo anello: {list}","nl":"Tweede ring: {list}","sv":"Andra ringen: {list}","da":"Anden ring: {list}","no":"Andre ring: {list}","fi":"Toinen rengas: {list}"},
    aRun1: {"en":"The hour hand stopped at {h}, before noon.","de":"Der Stundenzeiger ist bei {h} stehen geblieben, vor 12 Uhr mittags.","fr":"La petite aiguille s’est arrêtée sur {h}, avant midi.","es":"La manecilla de las horas se detuvo en {h}, antes del mediodía.","pt":"O ponteiro das horas parou no {h}, antes do meio-dia.","it":"La lancetta delle ore si è fermata sul {h}, prima di mezzogiorno.","nl":"De kleine wijzer is gestopt bij {h}, voor 12 uur ’s middags.","sv":"Timvisaren stannade på {h}, före klockan tolv på dagen.","da":"Den lille viser stoppede ved {h}, før klokken tolv midt på dagen.","no":"Timeviseren stoppet på {h}, før klokka tolv på dagen.","fi":"Tuntiviisari pysähtyi kohtaan {h} ennen keskipäivää."},
    aRun2: {"en":"The hour hand went past noon and stopped at {h}.","de":"Der Stundenzeiger ist über 12 Uhr mittags hinaus gelaufen und bei {h} stehen geblieben.","fr":"La petite aiguille a dépassé midi et s’est arrêtée sur {h}.","es":"La manecilla de las horas pasó el mediodía y se detuvo en {h}.","pt":"O ponteiro das horas passou do meio-dia e parou no {h}.","it":"La lancetta delle ore ha superato mezzogiorno e si è fermata sul {h}.","nl":"De kleine wijzer is voorbij 12 uur ’s middags gegaan en gestopt bij {h}.","sv":"Timvisaren gick förbi klockan tolv på dagen och stannade på {h}.","da":"Den lille viser gik forbi klokken tolv midt på dagen og stoppede ved {h}.","no":"Timeviseren gikk forbi klokka tolv på dagen og stoppet på {h}.","fi":"Tuntiviisari ohitti keskipäivän ja pysähtyi kohtaan {h}."},
    hintBlank: {"en":"Write the hour and the minutes.","de":"Schreib die Stunde und die Minuten.","fr":"Écris l’heure et les minutes.","es":"Escribe la hora y los minutos.","pt":"Escreva a hora e os minutos.","it":"Scrivi l’ora e i minuti.","nl":"Schrijf het uur en de minuten.","sv":"Skriv timmen och minuterna.","da":"Skriv timen og minutterne.","no":"Skriv timen og minuttene.","fi":"Kirjoita tunti ja minuutit."},
    hintPart: {"en":"Choose the part of the day too.","de":"Wähle auch die Tageszeit.","fr":"Choisis aussi le moment de la journée.","es":"Elige también la parte del día.","pt":"Escolha também o período do dia.","it":"Scegli anche il momento della giornata.","nl":"Kies ook het dagdeel.","sv":"Välj fm eller em också.","da":"Vælg også tiden på dagen.","no":"Velg også tiden på dagen.","fi":"Valitse myös ap. tai ip."},
    hintPartFit: {"en":"That part of the day does not fit that hour. Look at the open card again.","de":"Diese Tageszeit passt nicht zu dieser Stunde. Schau noch einmal auf die offene Karte.","fr":"Ce moment de la journée ne va pas avec cette heure. Regarde encore la carte ouverte.","es":"Esa parte del día no va con esa hora. Mira otra vez la tarjeta abierta.","pt":"Esse período do dia não combina com essa hora. Olhe de novo o cartão aberto.","it":"Questo momento della giornata non va con quest’ora. Guarda di nuovo il cartellino aperto.","nl":"Dat dagdeel past niet bij dat uur. Kijk nog eens naar de open kaart.","sv":"Den delen av dygnet passar inte till den timmen. Titta på det öppna kortet igen.","da":"Den tid på dagen passer ikke til den time. Kig på det åbne kort igen.","no":"Den tiden på dagen passer ikke til den timen. Se på det åpne kortet igjen.","fi":"Se vuorokaudenaika ei sovi siihen tuntiin. Katso avointa korttia uudestaan."},
    hintTwelve: {"en":"The 12-hour way only uses the hours 1 to 12.","de":"Mit 12 Stunden gibt es nur die Stunden 1 bis 12.","fr":"Sur 12 heures, on n’utilise que les heures de 1 à 12.","es":"En formato de 12 horas solo se usan las horas del 1 al 12.","pt":"No formato de 12 horas só existem as horas de 1 a 12.","it":"Nel formato 12 ore ci sono solo le ore da 1 a 12.","nl":"In de 12-uursnotatie gebruik je alleen de uren 1 tot en met 12.","sv":"Med 12 timmar använder man bara timmarna 1 till 12.","da":"Med 12 timer bruger man kun timerne 1 til 12.","no":"Med 12 timer bruker man bare timene 1 til 12.","fi":"12 tunnin kellossa käytetään vain tunteja 1–12."},
    hintPastNoon: {"en":"Your time went past noon. Did the open card's time?","de":"Deine Uhrzeit ist über 12 Uhr mittags hinaus gelaufen. Die Uhrzeit auf der offenen Karte auch?","fr":"Ton heure a dépassé midi. Et l’heure de la carte ouverte ?","es":"Tu hora pasó el mediodía. ¿La hora de la tarjeta abierta también?","pt":"A sua hora passou do meio-dia. E a hora do cartão aberto?","it":"La tua ora ha superato mezzogiorno. E l’ora del cartellino aperto?","nl":"Jouw tijd ging voorbij 12 uur ’s middags. De tijd op de open kaart ook?","sv":"Din tid gick förbi klockan tolv på dagen. Gjorde tiden på det öppna kortet det?","da":"Dit klokkeslæt gik forbi klokken tolv midt på dagen. Gjorde klokkeslættet på det åbne kort det?","no":"Klokkeslettet ditt gikk forbi klokka tolv på dagen. Gjorde klokkeslettet på det åpne kortet det?","fi":"Sinun aikasi meni keskipäivän ohi. Menikö avoimen kortin aika?"},
    hintBeforeNoon: {"en":"Your time stopped before noon. The open card is after noon.","de":"Deine Uhrzeit ist vor 12 Uhr mittags stehen geblieben. Die offene Karte ist nach 12 Uhr mittags.","fr":"Ton heure s’est arrêtée avant midi. La carte ouverte est après midi.","es":"Tu hora se detuvo antes del mediodía. La tarjeta abierta es después del mediodía.","pt":"A sua hora parou antes do meio-dia. O cartão aberto é depois do meio-dia.","it":"La tua ora si è fermata prima di mezzogiorno. Il cartellino aperto è dopo mezzogiorno.","nl":"Jouw tijd stopte voor 12 uur ’s middags. De open kaart is na 12 uur ’s middags.","sv":"Din tid stannade före klockan tolv på dagen. Det öppna kortet är efter klockan tolv.","da":"Dit klokkeslæt stoppede før klokken tolv midt på dagen. Det åbne kort er efter klokken tolv.","no":"Klokkeslettet ditt stoppet før klokka tolv på dagen. Det åpne kortet er etter klokka tolv.","fi":"Sinun aikasi pysähtyi ennen keskipäivää. Avoimen kortin aika on keskipäivän jälkeen."},
    hintHour: {"en":"Look where your hour hand stopped. Count the hours after 12.","de":"Schau, wo dein Stundenzeiger stehen geblieben ist. Zähl die Stunden nach 12.","fr":"Regarde où ta petite aiguille s’est arrêtée. Compte les heures après 12.","es":"Mira dónde se detuvo tu manecilla de las horas. Cuenta las horas después de las 12.","pt":"Veja onde o seu ponteiro das horas parou. Conte as horas depois das 12.","it":"Guarda dove si è fermata la tua lancetta delle ore. Conta le ore dopo le 12.","nl":"Kijk waar jouw kleine wijzer is gestopt. Tel de uren na 12.","sv":"Titta var din timvisare stannade. Räkna timmarna efter 12.","da":"Se, hvor din lille viser stoppede. Tæl timerne efter 12.","no":"Se hvor timeviseren din stoppet. Tell timene etter 12.","fi":"Katso, mihin tuntiviisarisi pysähtyi. Laske tunnit 12:n jälkeen."},
    hintMinute: {"en":"The minutes stay the same in both ways of writing.","de":"Die Minuten bleiben bei beiden Arten gleich.","fr":"Les minutes restent les mêmes dans les deux façons d’écrire.","es":"Los minutos son los mismos en las dos formas de escribir.","pt":"Os minutos são os mesmos nos dois jeitos de escrever.","it":"I minuti restano uguali in tutti e due i modi di scrivere.","nl":"De minuten blijven hetzelfde bij allebei de manieren.","sv":"Minuterna är samma på båda sätten.","da":"Minutterne er de samme på begge måder.","no":"Minuttene er de samme på begge måtene.","fi":"Minuutit pysyvät samoina molemmilla tavoilla."},
    hintMidnight: {"en":"Midnight is where the day starts: 00:00.","de":"Um Mitternacht beginnt der Tag: 00:00.","fr":"À minuit, la journée commence : 0 h 00.","es":"A la medianoche empieza el día: 00:00.","pt":"À meia-noite o dia começa: 00:00.","it":"A mezzanotte comincia il giorno: 00:00.","nl":"Om middernacht begint de dag: 00.00.","sv":"Vid midnatt börjar dygnet: 00.00.","da":"Ved midnat begynder døgnet: 00.00.","no":"Ved midnatt begynner døgnet: 00.00.","fi":"Keskiyöllä vuorokausi alkaa: 0.00."},
    hintNoon: {"en":"Noon is when the tag first says 12, under the sun.","de":"Um 12 Uhr mittags zeigt das Schild zum ersten Mal 12, unter der Sonne.","fr":"Midi, c’est quand l’étiquette affiche 12 pour la première fois, sous le soleil.","es":"El mediodía es cuando la etiqueta dice 12 por primera vez, bajo el sol.","pt":"O meio-dia é quando a etiqueta mostra 12 pela primeira vez, embaixo do sol.","it":"Mezzogiorno è quando l’etichetta dice 12 per la prima volta, sotto il sole.","nl":"12 uur ’s middags is wanneer het labeltje voor het eerst 12 laat zien, onder de zon.","sv":"Klockan tolv på dagen visar lappen 12 för första gången, under solen.","da":"Klokken tolv om dagen viser mærket 12 for første gang, under solen.","no":"Klokka tolv på dagen viser merkelappen 12 for første gang, under sola.","fi":"Keskipäivällä lappu näyttää ensimmäisen kerran 12, auringon alla."},
    hintHelpAm: {"en":"Before noon the hand never passes the sun: the hour stays the same.","de":"Vor 12 Uhr mittags kommt der Zeiger nicht an der Sonne vorbei: Die Stunde bleibt gleich.","fr":"Avant midi, l’aiguille ne passe jamais le soleil : l’heure reste la même.","es":"Antes del mediodía la manecilla nunca pasa el sol: la hora sigue igual.","pt":"Antes do meio-dia o ponteiro nunca passa o sol: a hora continua igual.","it":"Prima di mezzogiorno la lancetta non passa mai il sole: l’ora resta uguale.","nl":"Voor 12 uur ’s middags komt de wijzer niet langs de zon: het uur blijft hetzelfde.","sv":"Före klockan tolv på dagen går visaren aldrig förbi solen: timmen är densamma.","da":"Før klokken tolv midt på dagen kommer viseren aldrig forbi solen: timen er den samme.","no":"Før klokka tolv på dagen går viseren aldri forbi sola: timen er den samme.","fi":"Ennen keskipäivää viisari ei koskaan ohita aurinkoa: tunti pysyy samana."},
    hintHelpPm: {"en":"After noon the tag keeps counting: 13, 14, 15… Count on to the ?.","de":"Nach 12 Uhr mittags zählt das Schild weiter: 13, 14, 15 … Zähl weiter bis zum ?.","fr":"Après midi, l’étiquette continue de compter : 13, 14, 15… Compte jusqu’au ?.","es":"Después del mediodía la etiqueta sigue contando: 13, 14, 15… Sigue contando hasta el ?.","pt":"Depois do meio-dia a etiqueta continua contando: 13, 14, 15… Continue contando até o ?.","it":"Dopo mezzogiorno l’etichetta continua a contare: 13, 14, 15… Conta fino al ?.","nl":"Na 12 uur ’s middags telt het labeltje door: 13, 14, 15… Tel door tot het ?.","sv":"Efter klockan tolv på dagen räknar lappen vidare: 13, 14, 15 … Räkna vidare till ?.","da":"Efter klokken tolv midt på dagen tæller mærket videre: 13, 14, 15 … Tæl videre til ?.","no":"Etter klokka tolv på dagen teller merkelappen videre: 13, 14, 15 … Tell videre til ?.","fi":"Keskipäivän jälkeen lappu jatkaa laskemista: 13, 14, 15… Laske eteenpäin ?-merkkiin asti."},
    ok_to24: {"en":"{open} is {ans}: 12 + {h12} = {h24}!","de":"{open} ist {ans}: 12 + {h12} = {h24}!","fr":"{open}, c’est {ans} : 12 + {h12} = {h24} !","es":"{open} y {ans} son la misma hora: ¡12 + {h12} = {h24}!","pt":"{open} e {ans} são a mesma hora: 12 + {h12} = {h24}!","it":"{open} e {ans} sono la stessa ora: 12 + {h12} = {h24}!","nl":"{open} is {ans}: 12 + {h12} = {h24}!","sv":"{open} är {ans}: 12 + {h12} = {h24}!","da":"{open} er {ans}: 12 + {h12} = {h24}!","no":"{open} er {ans}: 12 + {h12} = {h24}!","fi":"{open} on {ans}: 12 + {h12} = {h24}!"},
    ok_to12: {"en":"{open} is {ans}: {h24} − 12 = {h12}!","de":"{open} ist {ans}: {h24} − 12 = {h12}!","fr":"{open}, c’est {ans} : {h24} − 12 = {h12} !","es":"{open} y {ans} son la misma hora: ¡{h24} − 12 = {h12}!","pt":"{open} e {ans} são a mesma hora: {h24} − 12 = {h12}!","it":"{open} e {ans} sono la stessa ora: {h24} − 12 = {h12}!","nl":"{open} is {ans}: {h24} − 12 = {h12}!","sv":"{open} är {ans}: {h24} − 12 = {h12}!","da":"{open} er {ans}: {h24} − 12 = {h12}!","no":"{open} er {ans}: {h24} − 12 = {h12}!","fi":"{open} on {ans}: {h24} − 12 = {h12}!"},
    ok_am: {"en":"{open} is {ans}: before noon the hour stays the same!","de":"{open} ist {ans}: Vor 12 Uhr mittags bleibt die Stunde gleich!","fr":"{open}, c’est {ans} : avant midi, l’heure reste la même !","es":"{open} y {ans} son la misma hora: ¡antes del mediodía la hora sigue igual!","pt":"{open} e {ans} são a mesma hora: antes do meio-dia a hora continua igual!","it":"{open} e {ans} sono la stessa ora: prima di mezzogiorno l’ora resta uguale!","nl":"{open} is {ans}: voor 12 uur ’s middags blijft het uur hetzelfde!","sv":"{open} är {ans}: före klockan tolv på dagen är timmen densamma!","da":"{open} er {ans}: før klokken tolv midt på dagen er timen den samme!","no":"{open} er {ans}: før klokka tolv på dagen er timen den samme!","fi":"{open} on {ans}: ennen keskipäivää tunti pysyy samana!"},
    ok_noon: {"en":"{open} is {ans}: the tag says 12 under the sun!","de":"{open} ist {ans}: Das Schild zeigt 12 unter der Sonne!","fr":"{open}, c’est {ans} : l’étiquette affiche 12 sous le soleil !","es":"{open} y {ans} son la misma hora: ¡la etiqueta dice 12 bajo el sol!","pt":"{open} e {ans} são a mesma hora: a etiqueta mostra 12 embaixo do sol!","it":"{open} e {ans} sono la stessa ora: l’etichetta dice 12 sotto il sole!","nl":"{open} is {ans}: het labeltje laat 12 zien onder de zon!","sv":"{open} är {ans}: lappen visar 12 under solen!","da":"{open} er {ans}: mærket viser 12 under solen!","no":"{open} er {ans}: merkelappen viser 12 under sola!","fi":"{open} on {ans}: lappu näyttää 12 auringon alla!"},
    ok_midnight: {"en":"{open} is {ans}: the 24-hour day starts again!","de":"{open} ist {ans}: Der Tag mit 24 Stunden fängt wieder an!","fr":"{open}, c’est {ans} : la journée de 24 heures recommence !","es":"{open} y {ans} son la misma hora: ¡el día de 24 horas empieza otra vez!","pt":"{open} e {ans} são a mesma hora: o dia de 24 horas começa de novo!","it":"{open} e {ans} sono la stessa ora: il giorno di 24 ore ricomincia!","nl":"{open} is {ans}: de dag van 24 uur begint opnieuw!","sv":"{open} är {ans}: dygnets 24 timmar börjar om!","da":"{open} er {ans}: døgnets 24 timer begynder forfra!","no":"{open} er {ans}: døgnets 24 timer begynner på nytt!","fi":"{open} on {ans}: vuorokauden 24 tuntia alkavat alusta!"},
    setTimes: {"en":"Times","de":"Uhrzeiten","fr":"Heures","es":"Horas","pt":"Horas","it":"Orari","nl":"Tijden","sv":"Tider","da":"Tider","no":"Tider","fi":"Ajat"},
    tL1: {"en":"O'clock and half past","de":"Volle und halbe Stunden","fr":"Heures pile et demi-heures","es":"Horas en punto y medias horas","pt":"Horas exatas e meias horas","it":"Ore esatte e mezz’ore","nl":"Hele en halve uren","sv":"Hela och halva timmar","da":"Hele og halve timer","no":"Hele og halve timer","fi":"Tasatunnit ja puolitunnit"},
    tL2: {"en":"Five minutes, noon and midnight","de":"Fünf Minuten, Mittag und Mitternacht","fr":"Cinq minutes, midi et minuit","es":"De cinco en cinco minutos, mediodía y medianoche","pt":"De cinco em cinco minutos, meio-dia e meia-noite","it":"Cinque minuti, mezzogiorno e mezzanotte","nl":"Vijf minuten, 12 uur ’s middags en middernacht","sv":"Fem minuter, mitt på dagen och midnatt","da":"Fem minutter, midt på dagen og midnat","no":"Fem minutter, midt på dagen og midnatt","fi":"Viisi minuuttia, keskipäivä ja keskiyö"},
    setRing: {"en":"The second ring","de":"Der zweite Ring","fr":"Le deuxième anneau","es":"El segundo anillo","pt":"O segundo anel","it":"Il secondo anello","nl":"De tweede ring","sv":"Den andra ringen","da":"Den anden ring","no":"Den andre ringen","fi":"Toinen rengas"},
    rKeep: {"en":"Keeps what you built","de":"Behält, was du gebaut hast","fr":"Garde ce que tu as construit","es":"Guarda lo que construiste","pt":"Guarda o que você construiu","it":"Tiene quello che hai costruito","nl":"Bewaart wat je hebt gebouwd","sv":"Behåller det du byggt","da":"Beholder det, du har bygget","no":"Beholder det du har bygget","fi":"Pitää sen, minkä rakensit"},
    rEmpty: {"en":"Empties every round","de":"Wird bei jeder Aufgabe geleert","fr":"Se vide à chaque tour","es":"Se vacía en cada ronda","pt":"Esvazia a cada rodada","it":"Si svuota a ogni turno","nl":"Wordt bij elke opdracht leeggemaakt","sv":"Töms varje runda","da":"Tømmes hver runde","no":"Tømmes for hver oppgave","fi":"Tyhjenee joka tehtävässä"}
  },/*STRINGS-END*/
  defaults: { times: '1', ring: 'keep' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: '1', labelKey: 'tL1' }, { value: '2', labelKey: 'tL2' }] },
    { key: 'ring', type: 'choice', labelKey: 'setRing', options: [{ value: 'keep', labelKey: 'rKeep' }, { value: 'empty', labelKey: 'rEmpty' }] }
  ],
  OK_MS: 500, FAST: false,
  THEMES: ['farm-animals', 'beach'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false; this._busy = false; this._ring = [];
    injectSecondRingCSS();
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
    else { if (this._setting('ring') === 'empty') this._ring = []; if (this._wrap) this._paint(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; this._busy = false; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return SecondRingCore.levelOf(this._setting('times')); },
  _loc: function () { return SecondRingCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level() + '/' + this._loc(); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    /* a new level (or language) starts a new ring */
    if (!this._pool || this._poolKey !== k) { this._pool = SecondRingCore.rounds(this._level(), this._loc()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._ring = []; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SecondRingCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'second-ring.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = SecondRingCore.newState(this._level(), k, this._loc());
    if (this._setting('ring') === 'empty') this._ring = [];
    this._view = { note: '', soft: false, win: false, anim: null, glow: false };
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._busy) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sr-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="sr-main"><div class="sr-clockcol"><div class="sr-clock" data-qa="clock"></div></div><div class="sr-side"><div class="sr-cards"></div><div class="sr-chips"></div><div class="sr-pad"></div></div></div><p class="sr-note" data-qa="note" aria-live="polite"></p>';
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
  _geometry: function (W) {
    var wide = W >= 560, cramp = W < 330;
    var S = wide ? Math.min(340, W - 290) : cramp ? Math.min(196, W - 108) : Math.min(240, W - 8);
    return { W: W, wide: wide, cramp: cramp, S: S, k: S / 400, rooster: wide ? 96 : 64 };
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W);
    this._wrap.className = 'sr-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (st.round.dir === 'to12' ? ' is-to12' : ' is-to24');
    this._paintClock();
    this._paintCards();
    this._paintChips();
    this._paintPad();
    var note = this._qs('.sr-note');
    if (v.note) { note.textContent = v.note; note.className = 'sr-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'sr-note'; }
    this._setPrompt();
  },
  /* the minutes the running hands show (the run in progress, the last run, or none) */
  _runAt: function () { var st = this.st, v = this._view; if (v.anim) return v.anim.cur; if (st.done) return st.round.t; if (st.verdict && st.verdict.t !== null) return st.verdict.t; return null; },
  _paintClock: function () {
    var st = this.st, r = st.round, g = this._g, C = SecondRingCore, v = this._view, el = this._qs('.sr-clock'), self = this;
    var P = function (a, rad) { var t = (a - 90) * Math.PI / 180; return [200 + rad * Math.cos(t), 200 + rad * Math.sin(t)]; };
    var vk = st.verdict && st.verdict.kind;
    el.innerHTML = ''; el.style.width = g.S + 'px'; el.style.height = g.S + 'px';
    var o = '<circle class="sr-face" cx="200" cy="200" r="186"/>';
    for (var i = 0; i < 60; i++) { var t1 = P(i * 6, 176), t2 = P(i * 6, i % 5 ? 170 : 163); o += '<path class="sr-tick' + (i % 5 ? '' : ' is-hour') + '" d="M' + t1[0].toFixed(1) + ' ' + t1[1].toFixed(1) + 'L' + t2[0].toFixed(1) + ' ' + t2[1].toFixed(1) + '"/>'; }
    /* the help: the given time's run, its last token face-down — the face numeral beside it bold */
    /* miss 2: the clock shows the GIVEN time's run instead — its tokens up to the last, which lies face-down ("?"); the tag says "?" */
    var helpH = st.help && vk && vk !== 'midnight' && vk !== 'noon' && vk !== 'twelve' && vk !== 'minute' && !v.anim ? r.h24 : null;
    var run = helpH !== null ? null : this._runAt();
    for (var h = 1; h <= 12; h++) { var q = P(h * 30, 150), bold = helpH !== null && (helpH % 12 || 12) === h; o += '<text class="sr-num' + (bold ? ' is-bold' : '') + '" x="' + q[0].toFixed(1) + '" y="' + (q[1] + 10).toFixed(1) + '" text-anchor="middle">' + h + '</text>'; }
    o += '<circle class="sr-rim" cx="200" cy="200" r="186"/>';
    /* the second ring: twelve sockets under the face's numerals */
    var runTok = run !== null ? C.run(run) : null, keep = run !== null ? C.keepToken(run) : null, ring = this._ring;
    for (var s = 1; s <= 12; s++) {
      var c = P(s * 30, 100), token = s === 12 ? 0 : s + 12, val = null, cls = '';
      if (ring.indexOf(token) >= 0) { val = token; cls = ' is-kept'; }
      if (runTok && runTok.tokens.indexOf(token) >= 0 && val === null && (!st.done || token === keep)) { val = token; cls = keep === token ? (st.done ? ' is-kept' : ' is-stop') : ' is-pass'; }
      if (run === 0 && token === 0 && val === null) { val = 0; cls = st.done ? ' is-kept' : ' is-stop'; }
      if (helpH !== null && helpH >= 13) { if (token >= 13 && token < helpH) { val = token; cls = ' is-ghost'; } if (token === helpH) { val = '?'; cls = ' is-ask'; } }
      o += '<g class="sr-socket' + cls + '" data-socket="' + token + '"' + (val !== null ? ' data-token="' + val + '"' : '') + '><circle cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="18"/>' + (val !== null ? '<text x="' + c[0].toFixed(1) + '" y="' + (c[1] + 7).toFixed(1) + '" text-anchor="middle">' + val + '</text>' : '') + '</g>';
    }
    /* the noon sun pops up over the 12 once a run passes noon */
    var sunOn = (run !== null && run >= 720) || (helpH !== null && r.t >= 720), sun = this._themes.beach;
    if (sunOn && sun && typeof LCSPictures !== 'undefined') o += '<image class="sr-sun" data-mark="sun" href="' + LCSPictures.url(sun, 'sun') + '" x="177" y="-10" width="46" height="46"/>';
    /* the given time: solid at rest, dashed outlines once a run is shown */
    var ga = (r.t % 720) / 2, gm = (r.t % 60) * 6, outline = run !== null;
    var hand = function (ang, len, cls, extra) { var e = P(ang, len); return '<path class="' + cls + '"' + (extra || '') + ' d="M200 200L' + e[0].toFixed(1) + ' ' + e[1].toFixed(1) + '"/>'; };
    o += hand(gm, 150, 'sr-mhand' + (outline ? ' is-outline' : ''), ' data-given-minute="' + gm + '"') + hand(ga, 76, 'sr-hhand' + (outline ? ' is-outline' : ''), ' data-given-hour="' + ga + '"');
    if (outline) {
      var ra = (run % 720) / 2, rm = (run % 60) * 6, tp = P(ra, 52), tag = Math.floor(run / 60);
      o += hand(rm, 150, 'sr-mhand is-run', ' data-run-minute="' + rm + '"') + hand(ra, 76, 'sr-hhand is-run', ' data-run-hour="' + ra + '"');
      o += '<g class="sr-tag' + (st.done ? ' is-gold' : '') + '" data-tag="' + Math.floor(run / 60) + '"><rect x="' + (tp[0] - 22).toFixed(1) + '" y="' + (tp[1] - 15).toFixed(1) + '" width="44" height="30" rx="15"/><text x="' + tp[0].toFixed(1) + '" y="' + (tp[1] + 8).toFixed(1) + '" text-anchor="middle">' + tag + '</text></g>';
    }
    if (helpH !== null) { var hp = P(ga, 52); o += '<g class="sr-tag is-ask" data-tag="?"><rect x="' + (hp[0] - 22).toFixed(1) + '" y="' + (hp[1] - 15).toFixed(1) + '" width="44" height="30" rx="15"/><text x="' + hp[0].toFixed(1) + '" y="' + (hp[1] + 8).toFixed(1) + '" text-anchor="middle">?</text></g>'; }
    o += '<circle class="sr-cap" cx="200" cy="200" r="9"/>';
    el.insertAdjacentHTML('beforeend', '<svg class="sr-art sr-svg" viewBox="0 0 400 400" width="' + g.S + '" height="' + g.S + '" aria-hidden="true">' + o + '</svg>');
    /* the ring read aloud (the drawing itself is decorative to a screen reader) */
    var sr = document.createElement('span'); sr.className = 'sr-srtext'; sr.textContent = this._t('aRing', { list: ring.length ? ring.slice().sort(function (a, b) { return (a || 24) - (b || 24); }).join(', ') : '—' }); el.appendChild(sr);
    /* keeps-what-you-built: twelve pips under the clock fill as the ring fills (the empties-every-round ring keeps no count) */
    var col = this._qs('.sr-clockcol'), pips = col.querySelector('.sr-pips'); if (pips) pips.remove();
    if (this._setting('ring') !== 'empty') { pips = document.createElement('div'); pips.className = 'sr-pips sr-art'; pips.setAttribute('aria-hidden', 'true'); pips.setAttribute('data-kept', String(ring.length)); for (var pi = 0; pi < 12; pi++) { var d = document.createElement('span'); d.className = 'sr-pip' + (pi < ring.length ? ' is-on' : '') + (v.glow ? ' is-glow' : ''); pips.appendChild(d); } col.appendChild(pips); }
    var ro = this._themes['farm-animals'];
    if (ro && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(ro, 'rooster', this._loc(), { size: g.rooster }); im.className = 'sr-rooster sr-art' + (v.win ? ' is-crow' : ''); im.alt = ''; im.setAttribute('data-rooster', '1'); im.style.width = g.rooster + 'px'; im.style.height = g.rooster + 'px'; el.appendChild(im); }
  },
  /* the open card and the answer card (two boxes; the separator drawn between them) */
  _paintCards: function () {
    var st = this.st, r = st.round, self = this, el = this._qs('.sr-cards'), loc = this._loc(), vk = st.verdict && st.verdict.kind;
    el.innerHTML = '';
    var open = document.createElement('div'); open.className = 'sr-open sr-art'; open.setAttribute('data-qa', 'open');
    open.innerHTML = '<span class="sr-cap-label">' + this._esc(this._t('openLabel')) + '</span><span class="sr-given">' + this._esc(r.given) + '</span>';
    el.appendChild(open);
    /* a long day-part word ("om eftermiddagen") must fit its card: shrink the given time until no word overflows (never below 13 px) */
    var gv = open.querySelector('.sr-given'); if (gv) { gv.style.fontSize = ''; var fs = parseFloat(getComputedStyle(gv).fontSize) || 20; while (gv.scrollWidth > gv.clientWidth + 1 && fs > 13) { fs -= 1; gv.style.fontSize = fs + 'px'; } }
    var ans = document.createElement('div'); ans.className = 'sr-answer sr-art'; ans.setAttribute('data-qa', 'answer');
    ans.innerHTML = '<span class="sr-cap-label">' + this._esc(this._t(r.dir === 'to24' ? 'answer24' : 'answer12')) + '</span>';
    var row = document.createElement('div'); row.className = 'sr-boxes';
    var sep = loc === 'fr' ? 'h' : ['nl', 'sv', 'da', 'no', 'fi'].indexOf(loc) >= 0 ? '.' : ':';
    ['h', 'm'].forEach(function (b, i) {
      var markIt = (b === 'h' && /^(hour|pastNoon|beforeNoon|twelve|midnight|noon|part)$/.test(vk || '')) || (b === 'm' && vk === 'minute');
      var x = self._btn('sr-box' + (st.focus === b && !st.done ? ' is-focus' : '') + (markIt ? ' is-mark' : ''), 'box-' + b, self._t(b === 'h' ? 'aHourBox' : 'aMinBox'), self._esc(st[b] || ''));
      x.setAttribute('data-value', st[b]); x.disabled = st.done;
      x.addEventListener('click', function () { self._focus(b); });
      row.appendChild(x);
      if (!i) { var s = document.createElement('span'); s.className = 'sr-sep'; s.textContent = sep; row.appendChild(s); }
    });
    ans.appendChild(row);
    el.appendChild(ans);
  },
  /* the day-part chips (only when the answer is the 12-hour way) */
  _paintChips: function () {
    var st = this.st, self = this, el = this._qs('.sr-chips'), C = SecondRingCore;
    el.innerHTML = '';
    if (st.round.dir !== 'to12') { el.style.display = 'none'; return; }
    el.style.display = '';
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._t('aChips'));
    C.chips(this._loc()).forEach(function (c) {
      var b = self._btn('sr-chip' + (st.part === c.key ? ' is-on' : '') + (st.verdict && st.verdict.kind === 'part' && st.part === c.key ? ' is-mark' : ''), 'chip-' + c.key, null, self._esc(c.label));
      b.setAttribute('aria-pressed', st.part === c.key ? 'true' : 'false'); b.disabled = st.done;
      b.addEventListener('click', function () { self._part(c.key); });
      el.appendChild(b);
    });
  },
  _paintPad: function () {
    var st = this.st, self = this, el = this._qs('.sr-pad'); el.innerHTML = '';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].forEach(function (d) {
      var b = self._btn('sr-key', 'key-' + d, d, d); b.disabled = st.done || self._busy;
      b.addEventListener('click', function () { self._type(d); }); el.appendChild(b);
    });
    var bk = this._btn('sr-key sr-back', 'back', this._t('aBack'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11v12H9l-6-6z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 9.5l5 5M17 9.5l-5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>');
    bk.disabled = st.done || this._busy || (!st.h && !st.m); bk.addEventListener('click', function () { self._back(); }); el.appendChild(bk);
    var c = this._btn('sr-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done || this._busy; c.addEventListener('click', function () { self._check(); }); el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _after: function () { this._view.note = ''; this._paint(); },
  _type: function (d) { if (this._busy || !SecondRingCore.typeDigit(this.st, d)) return false; this.api.sound(440); this._after(); return true; },
  _back: function () { if (this._busy || !SecondRingCore.back(this.st)) return false; this._after(); return true; },
  _focus: function (b) { if (this._busy || !SecondRingCore.focus(this.st, b)) return false; this._paint(); return true; },
  _part: function (key) { if (this._busy || !SecondRingCore.setPart(this.st, key)) return false; this.api.sound(380); this._after(); return true; },
  _keyboard: function (e) {
    var k = e.key;
    if (/^[0-9]$/.test(k)) { e.preventDefault(); this._type(k); }
    else if (k === 'Backspace') { e.preventDefault(); this._back(); }
    else if (k === 'Enter' && (e.target === this._wrap || /^key-|^back$|^box-/.test((e.target.getAttribute && e.target.getAttribute('data-k')) || ''))) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = SecondRingCore, self = this; if (st.done || this._busy) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    var t = res.t, finish = function () {
      v.anim = null; self._busy = false;
      if (t !== null) self.api.announce(self._t(t >= 720 ? 'aRun2' : 'aRun1', { h: Math.floor(t / 60) }));
      if (res.result === 'ok') self._success(); else self._miss();
    };
    /* the run: back to midnight, then forward to the CHILD's time, one hour mark at a time */
    if (this.FAST || t === null || t === 0) { finish(); return; }
    this._busy = true; v.anim = { cur: 0 }; v.note = ''; this._paint();
    var tick = function () {
      if (!v.anim) return;
      var nx = Math.min(t, (Math.floor(v.anim.cur / 60) + 1) * 60);
      v.anim.cur = nx; self._paintClock();
      if (nx >= 780 && nx % 60 === 0) self.api.sound(600 + (nx / 60 - 13) * 30);
      if (nx >= t) self._later(finish, 200); else self._later(tick, 110);
    };
    this._later(tick, 220);
  },
  _miss: function () {
    var st = this.st, v = this._view, key = SecondRingCore.hint(st);
    v.soft = false; v.note = this._t(key);
    this._paint(); this.api.announce(v.note); this.api.sound(240);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = SecondRingCore;
    var kt = C.keepToken(r.t); if (kt !== null && this._ring.indexOf(kt) < 0) { this._ring.push(kt); v.glow = this._ring.length === 12; }
    var msg = this._t(C.okKey(r), C.okArgs(r, this._loc()));
    v.note = ''; v.win = true;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg);
    this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectSecondRingCSS() {
  if (typeof document === 'undefined' || document.getElementById('sr-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sr-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .sr-wrap:focus{outline:none;}'
  + '.sr-main{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;} .sr-wrap.is-wide .sr-main{flex-direction:row;align-items:flex-start;justify-content:center;gap:18px;}'
  + '.sr-side{display:flex;flex-direction:column;align-items:stretch;gap:8px;width:100%;} .sr-wrap.is-wide .sr-side{width:auto;flex:1;min-width:0;max-width:300px;}'
  + '.sr-clock{position:relative;flex:none;} .sr-clockcol{display:flex;flex-direction:column;align-items:center;gap:6px;} .sr-pips{display:flex;gap:5px;} .sr-pip{width:11px;height:11px;border-radius:50%;box-shadow:inset 0 0 0 2px #B9A98A;} .sr-pip.is-on{background:#8C7BC4;box-shadow:inset 0 0 0 2px #5B4C99;} .sr-pip.is-glow{background:#E6B325;} .sr-srtext{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}'
  + '.sr-svg{position:absolute;left:0;top:0;overflow:visible;}'
  + '.sr-face{fill:#FFFDF6;} .sr-rim{fill:none;stroke:#146B5E;stroke-width:9;} .sr-tick{stroke:#8A8197;stroke-width:1.5;} .sr-tick.is-hour{stroke:' + INK + ';stroke-width:3;}'
  + '.sr-num{font-family:' + H + ';font-weight:800;font-size:28px;fill:' + INK + ';} .sr-num.is-bold{fill:#C4522F;font-size:34px;}'
  + '.sr-socket circle{fill:#FFFDF6;stroke:#B9A98A;stroke-width:2;stroke-dasharray:4 3;} .sr-socket text{font-family:' + H + ';font-weight:800;font-size:19px;fill:#fff;}'
  + '.sr-socket.is-kept circle{fill:#8C7BC4;stroke:#5B4C99;stroke-dasharray:0;} .sr-socket.is-stop circle{fill:#F2784B;stroke:#C4522F;stroke-dasharray:0;} .sr-socket.is-pass circle{fill:#D9D1F0;stroke:#8C7BC4;stroke-dasharray:0;} .sr-socket.is-pass text{fill:#5B4C99;}'
  + '.sr-socket.is-ghost circle{fill:#EFEAF8;stroke:#8C7BC4;} .sr-socket.is-ghost text{fill:#8C7BC4;} .sr-socket.is-ask circle{fill:#FFF3D6;stroke:#C4522F;stroke-dasharray:0;stroke-width:3;} .sr-socket.is-ask text{fill:#C4522F;}'
  + '.sr-mhand{stroke:#146B5E;stroke-width:6;stroke-linecap:round;} .sr-hhand{stroke:#F2784B;stroke-width:11;stroke-linecap:round;} .sr-mhand.is-outline,.sr-hhand.is-outline{stroke:#9C93A8;stroke-dasharray:7 6;stroke-width:5;} .sr-cap{fill:' + INK + ';}'
  + '.sr-tag rect{fill:#F2784B;stroke:#fff;stroke-width:2;} .sr-tag text{font-family:' + H + ';font-weight:800;font-size:20px;fill:#fff;} .sr-tag.is-gold rect{fill:#E6B325;} .sr-tag.is-ask rect{fill:#FFF3D6;stroke:#C4522F;} .sr-tag.is-ask text{fill:#C4522F;}'
  + '.sr-rooster{position:absolute;left:-10px;top:-10px;object-fit:contain;pointer-events:none;} .sr-wrap.is-narrow .sr-rooster{left:-6px;top:-6px;} .sr-wrap:not(.is-fast) .sr-rooster.is-crow{animation:srBounce .5s ease-out 2;}'
  + '.sr-cards{display:flex;flex-direction:column;gap:8px;} .sr-wrap.is-narrow .sr-cards{flex-direction:row;}'
  + '.sr-open,.sr-answer{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 10px;border-radius:14px;box-sizing:border-box;flex:1;min-width:0;}'
  + '.sr-open{background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #E6D9BF;} .sr-answer{background:#F4EEDF;box-shadow:inset 0 0 0 2px #D9CBA9;}'
  + '.sr-cap-label{font-family:' + B + ';font-weight:700;font-size:14px;color:#6B6176;text-align:center;line-height:1.15;}'
  + '.sr-given{font-family:' + H + ';font-weight:800;font-size:32px;line-height:1.1;color:#146B5E;text-align:center;max-width:100%;} .sr-wrap.is-narrow .sr-given{font-size:22px;}'
  + '.sr-boxes{display:flex;align-items:center;gap:4px;}'
  + '.sr-box{width:62px;height:58px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset;font-family:' + H + ';font-weight:800;font-size:32px;color:' + INK + ';cursor:pointer;} .sr-box.is-focus{box-shadow:0 0 0 3px #146B5E inset,0 0 0 3px #CDEBE4;} .sr-box.is-mark{text-decoration:underline;text-decoration-color:#E0603A;text-decoration-thickness:3px;text-underline-offset:4px;}'
  + '.sr-wrap.is-narrow .sr-box{width:50px;height:48px;font-size:26px;}'
  + '.sr-sep{font-family:' + H + ';font-weight:800;font-size:28px;color:' + INK + ';}'
  + '.sr-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;}'
  + '.sr-chip{min-height:44px;min-width:48px;padding:0 12px;border:0;border-radius:22px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset;font-family:' + B + ';font-weight:800;font-size:16px;color:' + INK + ';cursor:pointer;} .sr-chip.is-on{background:#146B5E;color:#fff;box-shadow:none;} .sr-chip.is-mark{box-shadow:0 0 0 3px #E0603A inset;} .sr-wrap.is-narrow .sr-chip{font-size:14px;padding:0 10px;}'
  + '.sr-pad{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;} .sr-wrap.is-narrow .sr-pad{grid-template-columns:repeat(6,minmax(44px,1fr));gap:5px;width:100%;}'
  + '.sr-key{height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:23px;color:' + INK + ';cursor:pointer;display:flex;align-items:center;justify-content:center;} .sr-key svg{width:24px;height:24px;} .sr-key:disabled{opacity:.45;cursor:default;}'
  + '.sr-go{grid-column:span 2;height:48px;border:0;border-radius:12px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:19px;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .sr-go svg{width:20px;height:20px;} .sr-go:disabled{opacity:.45;cursor:default;}'
  + '.sr-wrap.is-narrow .sr-key,.sr-wrap.is-narrow .sr-go{height:44px;font-size:20px;} .sr-wrap.is-narrow .sr-go{grid-column:span 1;} .sr-wrap.is-narrow .sr-go span{display:none;} .sr-wrap.is-narrow .sr-go svg{width:24px;height:24px;}'
  + '.sr-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .sr-wrap.is-narrow .sr-note{font-size:16px;line-height:1.25;} .sr-note.is-hint{color:#9A3412;} .sr-wrap.is-narrow .sr-note:empty{display:none;}'
  + '.sr-wrap.is-done .sr-pad,.sr-wrap.is-done .sr-chips{display:none;} .sr-wrap.is-done .sr-note:empty{display:none;}'
  + '.sr-wrap.is-cramp{gap:5px;} .sr-wrap.is-cramp .sr-main{display:grid;grid-template-columns:auto 1fr;gap:6px;align-items:start;} .sr-wrap.is-cramp .sr-side{display:contents;} .sr-wrap.is-cramp .sr-clockcol{grid-column:1;grid-row:1;} .sr-wrap.is-cramp .sr-cards{grid-column:2;grid-row:1;flex-direction:column;gap:6px;} .sr-wrap.is-cramp .sr-chips,.sr-wrap.is-cramp .sr-pad{grid-column:1 / -1;} .sr-wrap.is-cramp .sr-chip{font-size:13px;padding:0 8px;} .sr-wrap.is-cramp .sr-given{font-size:19px;} .sr-wrap.is-cramp .sr-box{width:44px;height:44px;font-size:23px;} .sr-wrap.is-cramp .sr-cap-label{font-size:12px;} .sr-wrap.is-cramp .sr-open,.sr-wrap.is-cramp .sr-answer{padding:5px 3px;} .sr-wrap.is-cramp .sr-cards{min-width:0;}'
  + '@keyframes srBounce{0%,100%{transform:scale(1);}40%{transform:scale(1.12) translateY(-6px);}}'
  + '.sr-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'sr-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.SecondRingActivity = SecondRingActivity;
