/* =====================================================================
   set-clock-activity.js — ACTIVITY #104 of the one-by-one rebuild:
   "Set the Clock" → THE ECHO SLICE (1.MD.B.3, 11 locales).
   Design: docs/activities-rebuild/designs/104-clock.md
   ---------------------------------------------------------------------
   THE INVENTION: the child builds the clock — both hands lie in a tray,
   are put on the hub and pointed one by one (they are NOT geared, as on
   the paper worksheet). On Check the long hand's swept slice of the face
   (12 → the long hand) is echoed, shrunk to one twelfth, inside the hour
   slice the short hand belongs to; the true short hand points at the
   echo's END. A paper receipt prints what the hands really say (7:50 for
   a long hand put on the 10 for "ten past"), with a "?" by the hour when
   the short hand is not at the echo's end.
   Miss 1: the echo stays with its end pulsing and an arrow from the
   short hand's tip; the hint names the hand to fix (never the answer).
   Miss 2: a five-minute scale (5 … 55) appears round the rim.
   Success: wedge and echo light together, the bell on top rings, the
   receipt turns teal with the time in words; the hands stay free.
   ACTIVITY LAYER ONLY: the model is set-clock-core.js; the clock, tray,
   bell and receipt are drawn apparatus; lcs-shell.js untouched (the
   shell's Check is hidden and pressed by this activity when right).
   Test seams: window.SetClockActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._view / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var SetClockActivity = {
  id: 'set-clock',
  apparatusClasses: ['sc-'],

  /*STRINGS-BEGIN*/strings: {
    title:        {en:'Set the Clock',de:'Stell die Uhr',nl:'Zet de klok goed',da:'Stil uret',sv:'Ställ klockan',no:'Still klokka',es:'Pon la hora en el reloj',it:'Metti l’ora sull’orologio',pt:'Acerte o relógio',fr:'Règle l’horloge',fi:'Aseta kello'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    tShow:        {en:'Show {w} — {d}.',de:'Stell die Uhr auf {w} – {d}.',nl:'Zet de klok op {w} – {d}.',da:'Stil uret på {w} – {d}.',sv:'Ställ klockan på {w} – {d}.',no:'Still klokka på {w} – {d}.',es:'Pon las manecillas en {w}: {d}.',it:'Fai segnare all’orologio {w}: {d}.',pt:'Mostre {w} no relógio: {d}.',fr:'Règle l’horloge sur {w} : {d}.',fi:'Aseta kello: {w} – {d}.'},
    ok:           {en:'{W} — the hands agree!',de:'{W} – die Zeiger stimmen!',nl:'{W} – de wijzers kloppen!',da:'{W} – viserne passer!',sv:'{W} – visarna stämmer!',no:'{W} – viserne stemmer!',es:'¡{W}! Las manecillas coinciden.',it:'{W}: le lancette vanno d’accordo!',pt:'{W}: os ponteiros combinam!',fr:'{W} : les aiguilles sont d’accord !',fi:'{W} – viisarit täsmäävät!'},
    hintTray:     {en:'Put both hands on the clock.',de:'Leg beide Zeiger auf die Uhr.',nl:'Zet beide wijzers op de klok.',da:'Sæt begge visere på uret.',sv:'Sätt båda visarna på klockan.',no:'Sett begge viserne på klokka.',es:'Pon las dos manecillas en el reloj.',it:'Metti tutte e due le lancette sull’orologio.',pt:'Coloque os dois ponteiros no relógio.',fr:'Place les deux aiguilles sur l’horloge.',fi:'Laita molemmat viisarit kelloon.'},
    hintSwap:     {en:'The short hand shows the hour, the long hand shows the minutes.',de:'Der kleine Zeiger zeigt die Stunde, der große Zeiger die Minuten.',nl:'De kleine wijzer wijst het uur aan, de grote wijzer de minuten.',da:'Den lille viser viser timen, den store viser minutterne.',sv:'Den korta visaren visar timmen, den långa visaren minuterna.',no:'Den lille viseren viser timen, den store viseren minuttene.',es:'La manecilla corta marca la hora y la larga, los minutos.',it:'La lancetta corta indica l’ora, quella lunga i minuti.',pt:'O ponteiro pequeno mostra a hora, e o grande, os minutos.',fr:'La petite aiguille montre l’heure, la grande les minutes.',fi:'Lyhyt viisari näyttää tunnin, pitkä viisari minuutit.'},
    hintMinutes:  {en:'The long hand shows the minutes — count by fives from the top.',de:'Der große Zeiger zeigt die Minuten – zähl in Fünferschritten von oben.',nl:'De grote wijzer wijst de minuten aan – tel in sprongen van vijf vanaf de 12.',da:'Den store viser viser minutterne – tæl fem ad gangen fra toppen.',sv:'Den långa visaren visar minuterna – räkna fem i taget från toppen.',no:'Den store viseren viser minuttene – tell fem og fem fra toppen.',es:'La manecilla larga marca los minutos: cuenta de cinco en cinco desde arriba.',it:'La lancetta lunga indica i minuti: conta di cinque in cinque partendo dall’alto.',pt:'O ponteiro grande mostra os minutos: conte de cinco em cinco a partir do alto.',fr:'La grande aiguille montre les minutes : compte de cinq en cinq depuis le haut.',fi:'Pitkä viisari näyttää minuutit – laske viiden välein ylhäältä alkaen.'},
    hintEdge:     {en:'Nearly — point the short hand at the end of the little green slice.',de:'Fast – lass den kleinen Zeiger auf das Ende des kleinen grünen Stücks zeigen.',nl:'Bijna – laat de kleine wijzer naar het eind van het kleine groene stukje wijzen.',da:'Næsten – lad den lille viser pege på enden af det lille grønne stykke.',sv:'Nästan – låt den korta visaren peka på slutet av den lilla gröna biten.',no:'Nesten – la den lille viseren peke på enden av det lille grønne stykket.',es:'Casi: haz que la manecilla corta apunte al final de la rebanadita verde.',it:'Quasi: fai puntare la lancetta corta alla fine della piccola fetta verde.',pt:'Quase: faça o ponteiro pequeno apontar para o fim da fatia verde pequenina.',fr:'Presque : fais pointer la petite aiguille vers le bout de la petite part verte.',fi:'Melkein – osoita lyhyellä viisarilla pienen vihreän siivun loppuun.'},
    hintHour:     {en:'Look at the paper: that is not the hour yet — move the short hand.',de:'Schau auf den Zettel: Die Stunde stimmt noch nicht – beweg den kleinen Zeiger.',nl:'Kijk naar het briefje: het uur klopt nog niet – verplaats de kleine wijzer.',da:'Se på sedlen: Timen passer ikke endnu – flyt den lille viser.',sv:'Titta på lappen: timmen stämmer inte än – flytta den korta visaren.',no:'Se på lappen: Timen stemmer ikke ennå – flytt den lille viseren.',es:'Mira el papelito: la hora todavía no es esa; mueve la manecilla corta.',it:'Guarda il foglietto: l’ora non è ancora giusta, sposta la lancetta corta.',pt:'Olhe o papelzinho: a hora ainda não está certa; mexa o ponteiro pequeno.',fr:'Regarde le ticket : l’heure n’est pas encore la bonne, déplace la petite aiguille.',fi:'Katso lappua: tunti ei vielä täsmää – siirrä lyhyttä viisaria.'},
    hintScale:    {en:'Count the fives round the edge for the minutes, then point the short hand at the end of the little slice.',de:'Zähl die Fünfer am Rand für die Minuten, dann lass den kleinen Zeiger auf das Ende des kleinen Stücks zeigen.',nl:'Tel de vijftallen langs de rand voor de minuten, laat dan de kleine wijzer naar het eind van het stukje wijzen.',da:'Tæl femmerne langs kanten for minutterne, og lad så den lille viser pege på enden af det lille stykke.',sv:'Räkna femmorna runt kanten för minuterna, och låt sedan den korta visaren peka på slutet av den lilla biten.',no:'Tell femmerne rundt kanten for minuttene, og la så den lille viseren peke på enden av det lille stykket.',es:'Cuenta de cinco en cinco por el borde para los minutos; luego haz que la manecilla corta apunte al final de la rebanadita.',it:'Conta di cinque in cinque lungo il bordo per i minuti, poi fai puntare la lancetta corta alla fine della piccola fetta.',pt:'Conte de cinco em cinco pela borda para achar os minutos; depois faça o ponteiro pequeno apontar para o fim da fatia pequenina.',fr:'Compte de cinq en cinq sur le bord pour les minutes, puis fais pointer la petite aiguille vers le bout de la petite part.',fi:'Laske viitoset reunaa pitkin minuutteja varten, ja osoita sitten lyhyellä viisarilla pienen siivun loppuun.'},
    aShortTray:   {en:'Short hand, the hour: put it on the clock',de:'Kleiner Zeiger, die Stunde: auf die Uhr legen',nl:'Kleine wijzer, het uur: op de klok zetten',da:'Lille viser, timen: sæt den på uret',sv:'Kort visare, timmen: sätt den på klockan',no:'Lille viser, timen: sett den på klokka',es:'Manecilla corta, la hora: ponla en el reloj',it:'Lancetta corta, l’ora: mettila sull’orologio',pt:'Ponteiro pequeno, a hora: coloque no relógio',fr:'Petite aiguille, l’heure : la poser sur l’horloge',fi:'Lyhyt viisari, tunti: laita se kelloon'},
    aLongTray:    {en:'Long hand, the minutes: put it on the clock',de:'Großer Zeiger, die Minuten: auf die Uhr legen',nl:'Grote wijzer, de minuten: op de klok zetten',da:'Store viser, minutterne: sæt den på uret',sv:'Lång visare, minuterna: sätt den på klockan',no:'Store viser, minuttene: sett den på klokka',es:'Manecilla larga, los minutos: ponla en el reloj',it:'Lancetta lunga, i minuti: mettila sull’orologio',pt:'Ponteiro grande, os minutos: coloque no relógio',fr:'Grande aiguille, les minutes : la poser sur l’horloge',fi:'Pitkä viisari, minuutit: laita se kelloon'},
    aShortOn:     {en:'Short hand, the hour, on the clock: arrow keys turn it',de:'Kleiner Zeiger, die Stunde, auf der Uhr: mit den Pfeiltasten drehen',nl:'Kleine wijzer, het uur, op de klok: draai met de pijltjestoetsen',da:'Lille viser, timen, på uret: drej med piletasterne',sv:'Kort visare, timmen, på klockan: vrid med piltangenterna',no:'Lille viser, timen, på klokka: vri med piltastene',es:'Manecilla corta, la hora, en el reloj: gírala con las flechas',it:'Lancetta corta, l’ora, sull’orologio: girala con le frecce',pt:'Ponteiro pequeno, a hora, no relógio: gire com as setas',fr:'Petite aiguille, l’heure, sur l’horloge : tourne-la avec les flèches',fi:'Lyhyt viisari, tunti, kellossa: käännä nuolinäppäimillä'},
    aLongOn:      {en:'Long hand, the minutes, on the clock: arrow keys turn it',de:'Großer Zeiger, die Minuten, auf der Uhr: mit den Pfeiltasten drehen',nl:'Grote wijzer, de minuten, op de klok: draai met de pijltjestoetsen',da:'Store viser, minutterne, på uret: drej med piletasterne',sv:'Lång visare, minuterna, på klockan: vrid med piltangenterna',no:'Store viser, minuttene, på klokka: vri med piltastene',es:'Manecilla larga, los minutos, en el reloj: gírala con las flechas',it:'Lancetta lunga, i minuti, sull’orologio: girala con le frecce',pt:'Ponteiro grande, os minutos, no relógio: gire com as setas',fr:'Grande aiguille, les minutes, sur l’horloge : tourne-la avec les flèches',fi:'Pitkä viisari, minuutit, kellossa: käännä nuolinäppäimillä'},
    aFace:        {en:'Clock face: tap or drag to turn the chosen hand',de:'Zifferblatt: tippen oder ziehen, um den gewählten Zeiger zu drehen',nl:'Wijzerplaat: tik of sleep om de gekozen wijzer te draaien',da:'Urskive: tryk eller træk for at dreje den valgte viser',sv:'Urtavla: tryck eller dra för att vrida den valda visaren',no:'Urskive: trykk eller dra for å vri den valgte viseren',es:'Carátula: toca o arrastra para girar la manecilla elegida',it:'Quadrante: tocca o trascina per girare la lancetta scelta',pt:'Mostrador: toque ou arraste para girar o ponteiro escolhido',fr:'Cadran : touche ou fais glisser pour tourner l’aiguille choisie',fi:'Kellotaulu: napauta tai vedä kääntääksesi valittua viisaria'},
    aReceipt:     {en:'The paper says {d}',de:'Auf dem Zettel steht {d}',nl:'Op het briefje staat {d}',da:'På sedlen står der {d}',sv:'På lappen står det {d}',no:'På lappen står det {d}',es:'El papelito dice {d}',it:'Il foglietto dice {d}',pt:'O papelzinho diz {d}',fr:'Le ticket indique {d}',fi:'Lapussa lukee {d}'},
    aTray:        {en:'Hand tray',de:'Zeigerschale',nl:'Wijzerbakje',da:'Viserbakke',sv:'Visarlåda',no:'Viserbrett',es:'Bandeja de las manecillas',it:'Vassoio delle lancette',pt:'Bandeja dos ponteiros',fr:'Plateau des aiguilles',fi:'Viisarialusta'},
    setTimes:     {en:'Times',de:'Uhrzeiten',nl:'Tijden',da:'Klokkeslæt',sv:'Tider',no:'Klokkeslett',es:'Horas',it:'Orari',pt:'Horários',fr:'Heures',fi:'Ajat'},
    lvBoth:       {en:'O\'clock and half past',de:'Volle und halbe Stunden',nl:'Hele en halve uren',da:'Hele og halve timer',sv:'Hela och halva timmar',no:'Hele og halve timer',es:'Horas en punto y medias horas',it:'Ore esatte e mezz’ore',pt:'Horas exatas e meias horas',fr:'Heures pile et demi-heures',fi:'Tasa- ja puolitunnit'},
    lvHour:       {en:'O\'clock',de:'Volle Stunden',nl:'Hele uren',da:'Hele timer',sv:'Hela timmar',no:'Hele timer',es:'Horas en punto',it:'Ore esatte',pt:'Horas exatas',fr:'Heures pile',fi:'Tasatunnit'},
    lvHalf:       {en:'Half past',de:'Halbe Stunden',nl:'Halve uren',da:'Halve timer',sv:'Halvtimmar',no:'Halve timer',es:'Medias horas',it:'Mezz’ore',pt:'Meias horas',fr:'Demi-heures',fi:'Puolitunnit'},
    lvQuarter:    {en:'Quarter hours',de:'Viertelstunden',nl:'Kwartieren',da:'Kvarterer',sv:'Kvartar',no:'Kvarter',es:'Cuartos de hora',it:'Quarti d’ora',pt:'Quartos de hora',fr:'Quarts d’heure',fi:'Vartit'},
    lvFive:       {en:'Five minutes',de:'In Fünf-Minuten-Schritten',nl:'Per vijf minuten',da:'Fem minutter ad gangen',sv:'Fem minuter i taget',no:'Fem minutter om gangen',es:'De cinco en cinco minutos',it:'Di cinque in cinque minuti',pt:'De cinco em cinco minutos',fr:'De cinq en cinq minutes',fi:'Viiden minuutin välein'},
    lvMixed:      {en:'Mixed',de:'Gemischt',nl:'Gemengd',da:'Blandet',sv:'Blandat',no:'Blandet',es:'Mezcladas',it:'Misti',pt:'Misturados',fr:'Mélangées',fi:'Sekaisin'},
    setSlice:     {en:'Green slice',de:'Grünes Stück',nl:'Groen stukje',da:'Grønt stykke',sv:'Grön bit',no:'Grønt stykke',es:'Rebanada verde',it:'Fetta verde',pt:'Fatia verde',fr:'Part verte',fi:'Vihreä siivu'},
    slAfter:      {en:'After Check',de:'Nach dem Prüfen',nl:'Na het controleren',da:'Efter tjek',sv:'Efter kontroll',no:'Etter sjekk',es:'Al comprobar',it:'Dopo il controllo',pt:'Depois de verificar',fr:'Après vérification',fi:'Tarkistuksen jälkeen'},
    slLive:       {en:'While setting',de:'Beim Einstellen',nl:'Tijdens het instellen',da:'Mens du stiller',sv:'Medan du ställer',no:'Mens du stiller',es:'Mientras mueves',it:'Mentre regoli',pt:'Enquanto acerta',fr:'Pendant le réglage',fi:'Asettaessa'}
  },/*STRINGS-END*/

  /*TIMES-BEGIN*/TIMES: {
    en: { sep:':', w:{'3:00':'three o\'clock','7:30':'half past seven','9:00':'nine o\'clock','6:30':'half past six','12:00':'twelve o\'clock','4:30':'half past four','10:00':'ten o\'clock','1:30':'half past one','5:00':'five o\'clock','11:30':'half past eleven','8:00':'eight o\'clock','6:00':'six o\'clock','1:00':'one o\'clock','2:30':'half past two','9:30':'half past nine','12:30':'half past twelve','4:15':'quarter past four','9:45':'quarter to ten','10:15':'quarter past ten','5:45':'quarter to six','12:15':'quarter past twelve','8:45':'quarter to nine','1:15':'quarter past one','11:45':'quarter to twelve','2:10':'ten past two','8:20':'twenty past eight','5:40':'twenty to six','11:50':'ten to twelve','4:05':'five past four','6:25':'twenty-five past six','9:35':'twenty-five to ten','1:55':'five to two','4:00':'four o\'clock','2:15':'quarter past two','6:45':'quarter to seven','11:10':'ten past eleven','3:50':'ten to four','7:05':'five past seven','8:25':'twenty-five past eight','5:35':'twenty-five to six'} },
    de: { sep:':', w:{'3:00':'drei Uhr','7:30':'halb acht','9:00':'neun Uhr','6:30':'halb sieben','12:00':'zwölf Uhr','4:30':'halb fünf','10:00':'zehn Uhr','1:30':'halb zwei','5:00':'fünf Uhr','11:30':'halb zwölf','8:00':'acht Uhr','6:00':'sechs Uhr','1:00':'ein Uhr','2:30':'halb drei','9:30':'halb zehn','12:30':'halb eins','4:15':'Viertel nach vier','9:45':'Viertel vor zehn','10:15':'Viertel nach zehn','5:45':'Viertel vor sechs','12:15':'Viertel nach zwölf','8:45':'Viertel vor neun','1:15':'Viertel nach eins','11:45':'Viertel vor zwölf','2:10':'zehn nach zwei','8:20':'zwanzig nach acht','5:40':'zwanzig vor sechs','11:50':'zehn vor zwölf','4:05':'fünf nach vier','6:25':'fünf vor halb sieben','9:35':'fünf nach halb zehn','1:55':'fünf vor zwei','4:00':'vier Uhr','2:15':'Viertel nach zwei','6:45':'Viertel vor sieben','11:10':'zehn nach elf','3:50':'zehn vor vier','7:05':'fünf nach sieben','8:25':'fünf vor halb neun','5:35':'fünf nach halb sechs'} },
    nl: { sep:'.', w:{'3:00':'drie uur','7:30':'half acht','9:00':'negen uur','6:30':'half zeven','12:00':'twaalf uur','4:30':'half vijf','10:00':'tien uur','1:30':'half twee','5:00':'vijf uur','11:30':'half twaalf','8:00':'acht uur','6:00':'zes uur','1:00':'één uur','2:30':'half drie','9:30':'half tien','12:30':'half één','4:15':'kwart over vier','9:45':'kwart voor tien','10:15':'kwart over tien','5:45':'kwart voor zes','12:15':'kwart over twaalf','8:45':'kwart voor negen','1:15':'kwart over één','11:45':'kwart voor twaalf','2:10':'tien over twee','8:20':'tien voor half negen','5:40':'tien over half zes','11:50':'tien voor twaalf','4:05':'vijf over vier','6:25':'vijf voor half zeven','9:35':'vijf over half tien','1:55':'vijf voor twee','4:00':'vier uur','2:15':'kwart over twee','6:45':'kwart voor zeven','11:10':'tien over elf','3:50':'tien voor vier','7:05':'vijf over zeven','8:25':'vijf voor half negen','5:35':'vijf over half zes'} },
    da: { sep:'.', w:{'3:00':'klokken tre','7:30':'halv otte','9:00':'klokken ni','6:30':'halv syv','12:00':'klokken tolv','4:30':'halv fem','10:00':'klokken ti','1:30':'halv to','5:00':'klokken fem','11:30':'halv tolv','8:00':'klokken otte','6:00':'klokken seks','1:00':'klokken et','2:30':'halv tre','9:30':'halv ti','12:30':'halv et','4:15':'kvart over fire','9:45':'kvart i ti','10:15':'kvart over ti','5:45':'kvart i seks','12:15':'kvart over tolv','8:45':'kvart i ni','1:15':'kvart over et','11:45':'kvart i tolv','2:10':'ti minutter over to','8:20':'ti minutter i halv ni','5:40':'ti minutter over halv seks','11:50':'ti minutter i tolv','4:05':'fem minutter over fire','6:25':'fem minutter i halv syv','9:35':'fem minutter over halv ti','1:55':'fem minutter i to','4:00':'klokken fire','2:15':'kvart over to','6:45':'kvart i syv','11:10':'ti minutter over elleve','3:50':'ti minutter i fire','7:05':'fem minutter over syv','8:25':'fem minutter i halv ni','5:35':'fem minutter over halv seks'} },
    sv: { sep:'.', w:{'3:00':'tre','7:30':'halv åtta','9:00':'nio','6:30':'halv sju','12:00':'tolv','4:30':'halv fem','10:00':'tio','1:30':'halv två','5:00':'fem','11:30':'halv tolv','8:00':'åtta','6:00':'sex','1:00':'ett','2:30':'halv tre','9:30':'halv tio','12:30':'halv ett','4:15':'kvart över fyra','9:45':'kvart i tio','10:15':'kvart över tio','5:45':'kvart i sex','12:15':'kvart över tolv','8:45':'kvart i nio','1:15':'kvart över ett','11:45':'kvart i tolv','2:10':'tio över två','8:20':'tjugo över åtta','5:40':'tjugo i sex','11:50':'tio i tolv','4:05':'fem över fyra','6:25':'fem i halv sju','9:35':'fem över halv tio','1:55':'fem i två','4:00':'fyra','2:15':'kvart över två','6:45':'kvart i sju','11:10':'tio över elva','3:50':'tio i fyra','7:05':'fem över sju','8:25':'fem i halv nio','5:35':'fem över halv sex'} },
    no: { sep:'.', w:{'3:00':'tre','7:30':'halv åtte','9:00':'ni','6:30':'halv sju','12:00':'tolv','4:30':'halv fem','10:00':'ti','1:30':'halv to','5:00':'fem','11:30':'halv tolv','8:00':'åtte','6:00':'seks','1:00':'ett','2:30':'halv tre','9:30':'halv ti','12:30':'halv ett','4:15':'kvart over fire','9:45':'kvart på ti','10:15':'kvart over ti','5:45':'kvart på seks','12:15':'kvart over tolv','8:45':'kvart på ni','1:15':'kvart over ett','11:45':'kvart på tolv','2:10':'ti over to','8:20':'ti på halv ni','5:40':'ti over halv seks','11:50':'ti på tolv','4:05':'fem over fire','6:25':'fem på halv sju','9:35':'fem over halv ti','1:55':'fem på to','4:00':'fire','2:15':'kvart over to','6:45':'kvart på sju','11:10':'ti over elleve','3:50':'ti på fire','7:05':'fem over sju','8:25':'fem på halv ni','5:35':'fem over halv seks'} },
    es: { sep:':', w:{'3:00':'las tres en punto','7:30':'las siete y media','9:00':'las nueve en punto','6:30':'las seis y media','12:00':'las doce en punto','4:30':'las cuatro y media','10:00':'las diez en punto','1:30':'la una y media','5:00':'las cinco en punto','11:30':'las once y media','8:00':'las ocho en punto','6:00':'las seis en punto','1:00':'la una en punto','2:30':'las dos y media','9:30':'las nueve y media','12:30':'las doce y media','4:15':'las cuatro y cuarto','9:45':'cuarto para las diez','10:15':'las diez y cuarto','5:45':'cuarto para las seis','12:15':'las doce y cuarto','8:45':'cuarto para las nueve','1:15':'la una y cuarto','11:45':'cuarto para las doce','2:10':'las dos y diez','8:20':'las ocho y veinte','5:40':'veinte para las seis','11:50':'diez para las doce','4:05':'las cuatro y cinco','6:25':'las seis y veinticinco','9:35':'veinticinco para las diez','1:55':'cinco para las dos','4:00':'las cuatro en punto','2:15':'las dos y cuarto','6:45':'cuarto para las siete','11:10':'las once y diez','3:50':'diez para las cuatro','7:05':'las siete y cinco','8:25':'las ocho y veinticinco','5:35':'veinticinco para las seis'}, p:{'9:45':'un cuarto para las diez','5:45':'un cuarto para las seis','8:45':'un cuarto para las nueve','11:45':'un cuarto para las doce','6:45':'un cuarto para las siete'} },
    it: { sep:':', w:{'3:00':'le tre in punto','7:30':'le sette e mezza','9:00':'le nove in punto','6:30':'le sei e mezza','12:00':'mezzogiorno','4:30':'le quattro e mezza','10:00':'le dieci in punto','1:30':'l’una e mezza','5:00':'le cinque in punto','11:30':'le undici e mezza','8:00':'le otto in punto','6:00':'le sei in punto','1:00':'l’una in punto','2:30':'le due e mezza','9:30':'le nove e mezza','12:30':'mezzogiorno e mezza','4:15':'le quattro e un quarto','9:45':'le dieci meno un quarto','10:15':'le dieci e un quarto','5:45':'le sei meno un quarto','12:15':'mezzogiorno e un quarto','8:45':'le nove meno un quarto','1:15':'l’una e un quarto','11:45':'mezzogiorno meno un quarto','2:10':'le due e dieci','8:20':'le otto e venti','5:40':'le sei meno venti','11:50':'mezzogiorno meno dieci','4:05':'le quattro e cinque','6:25':'le sei e venticinque','9:35':'le dieci meno venticinque','1:55':'le due meno cinque','4:00':'le quattro in punto','2:15':'le due e un quarto','6:45':'le sette meno un quarto','11:10':'le undici e dieci','3:50':'le quattro meno dieci','7:05':'le sette e cinque','8:25':'le otto e venticinque','5:35':'le sei meno venticinque'} },
    pt: { sep:':', w:{'3:00':'três horas','7:30':'sete e meia','9:00':'nove horas','6:30':'seis e meia','12:00':'meio-dia','4:30':'quatro e meia','10:00':'dez horas','1:30':'uma e meia','5:00':'cinco horas','11:30':'onze e meia','8:00':'oito horas','6:00':'seis horas','1:00':'uma hora','2:30':'duas e meia','9:30':'nove e meia','12:30':'meio-dia e meia','4:15':'quatro e quinze','9:45':'quinze para as dez','10:15':'dez e quinze','5:45':'quinze para as seis','12:15':'meio-dia e quinze','8:45':'quinze para as nove','1:15':'uma e quinze','11:45':'quinze para o meio-dia','2:10':'duas e dez','8:20':'oito e vinte','5:40':'vinte para as seis','11:50':'dez para o meio-dia','4:05':'quatro e cinco','6:25':'seis e vinte e cinco','9:35':'vinte e cinco para as dez','1:55':'cinco para as duas','4:00':'quatro horas','2:15':'duas e quinze','6:45':'quinze para as sete','11:10':'onze e dez','3:50':'dez para as quatro','7:05':'sete e cinco','8:25':'oito e vinte e cinco','5:35':'vinte e cinco para as seis'} },
    fr: { sep:' h ', w:{'3:00':'trois heures','7:30':'sept heures et demie','9:00':'neuf heures','6:30':'six heures et demie','12:00':'midi','4:30':'quatre heures et demie','10:00':'dix heures','1:30':'une heure et demie','5:00':'cinq heures','11:30':'onze heures et demie','8:00':'huit heures','6:00':'six heures','1:00':'une heure','2:30':'deux heures et demie','9:30':'neuf heures et demie','12:30':'midi et demi','4:15':'quatre heures et quart','9:45':'dix heures moins le quart','10:15':'dix heures et quart','5:45':'six heures moins le quart','12:15':'midi et quart','8:45':'neuf heures moins le quart','1:15':'une heure et quart','11:45':'midi moins le quart','2:10':'deux heures dix','8:20':'huit heures vingt','5:40':'six heures moins vingt','11:50':'midi moins dix','4:05':'quatre heures cinq','6:25':'six heures vingt-cinq','9:35':'dix heures moins vingt-cinq','1:55':'deux heures moins cinq','4:00':'quatre heures','2:15':'deux heures et quart','6:45':'sept heures moins le quart','11:10':'onze heures dix','3:50':'quatre heures moins dix','7:05':'sept heures cinq','8:25':'huit heures vingt-cinq','5:35':'six heures moins vingt-cinq'} },
    fi: { sep:'.', w:{'3:00':'kolme','7:30':'puoli kahdeksan','9:00':'yhdeksän','6:30':'puoli seitsemän','12:00':'kaksitoista','4:30':'puoli viisi','10:00':'kymmenen','1:30':'puoli kaksi','5:00':'viisi','11:30':'puoli kaksitoista','8:00':'kahdeksan','6:00':'kuusi','1:00':'yksi','2:30':'puoli kolme','9:30':'puoli kymmenen','12:30':'puoli yksi','4:15':'varttia yli neljä','9:45':'varttia vaille kymmenen','10:15':'varttia yli kymmenen','5:45':'varttia vaille kuusi','12:15':'varttia yli kaksitoista','8:45':'varttia vaille yhdeksän','1:15':'varttia yli yksi','11:45':'varttia vaille kaksitoista','2:10':'kymmenen yli kaksi','8:20':'kaksikymmentä yli kahdeksan','5:40':'kaksikymmentä vaille kuusi','11:50':'kymmentä vaille kaksitoista','4:05':'viisi yli neljä','6:25':'viittä vaille puoli seitsemän','9:35':'viisi yli puoli kymmenen','1:55':'viittä vaille kaksi','4:00':'neljä','2:15':'varttia yli kaksi','6:45':'varttia vaille seitsemän','11:10':'kymmenen yli yksitoista','3:50':'kymmentä vaille neljä','7:05':'viisi yli seitsemän','8:25':'viittä vaille puoli yhdeksän','5:35':'viisi yli puoli kuusi'} }
  },/*TIMES-END*/

  defaults: { times: 'both', slice: 'after' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [
      { value: 'both', labelKey: 'lvBoth' }, { value: 'hour', labelKey: 'lvHour' }, { value: 'half', labelKey: 'lvHalf' },
      { value: 'quarter', labelKey: 'lvQuarter' }, { value: 'five', labelKey: 'lvFive' }, { value: 'mixed', labelKey: 'lvMixed' }] },
    { key: 'slice', type: 'choice', labelKey: 'setSlice', options: [{ value: 'after', labelKey: 'slAfter' }, { value: 'live', labelKey: 'slLive' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._raf = 0; this._busy = false; this._drag = null;
    injectSetClockCSS();
  },
  destroy: function () { this._stopAnim(); this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return SetClockCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return SetClockCore.levelOf(this._setting('times')); },
  _slice: function () { return SetClockCore.echoOf(this._setting('slice')); },
  _key: function () { return this._level(); },
  /* time words: the hand-authored per-locale table (never a formula) */
  _TT: function () { return this.TIMES[this._loc()] || this.TIMES.en; },
  _words: function (t) { return this._TT().w[SetClockCore.fmt(t)] || this.TIMES.en.w[SetClockCore.fmt(t)]; },
  _digital: function (t) { return t.h + this._TT().sep + (t.m < 10 ? '0' + t.m : String(t.m)); },
  _cap: function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SetClockCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SetClockCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      this._order = C.plan(this._level(), Math.random, prevIds).order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._prompt(C.round(id)) }; this._pa = pa;
    return {
      id: 'setclock.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* the prompt may take its own form of the words (es-MX "en un cuarto para las diez") */
  _prompt: function (t) { var p = this._TT().p; return this._t('tShow', { w: (p && p[SetClockCore.fmt(t)]) || this._words(t), d: this._digital(t) }); },
  _setPrompt: function () { var line = this._prompt(this.st.t); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (id, pos) {
    this._stopAnim(); this._clearTimers(); this._pos = pos || 0; this._busy = false; this._drag = null;
    this.st = SetClockCore.newState(SetClockCore.round(id));
    this._resetView(); this._setPrompt();
  },
  /* the showing after a Check: wedge + echo (+ arrow at miss 1, the scale at miss 2), the receipt; cleared by any new hand move */
  _resetView: function () { this._view = { showing: false, receipt: null, minutesOff: false, arrow: false, scale: false, note: '', ok: '', ring: 0, wiggle: null, sweep: 1 }; },
  _clearShowing: function () { var v = this._view; v.showing = false; v.receipt = null; v.minutesOff = false; v.arrow = false; v.note = ''; v.wiggle = null; },

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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sc-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="sc-stage"><div class="sc-trayslot"></div><div class="sc-clockbox"></div><div class="sc-side"></div></div><div class="sc-row"></div><div class="sc-foot"></div><p class="sc-note" aria-live="polite"></p>';
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
  /* the geometry: wide = [tray | clock | time card], narrow = clock over a row [time card | tray or receipt] */
  _dims: function () {
    var C = SetClockCore, w = this._width(), B = C.band(w), wide = B.wide;
    var trayW = wide ? 106 : 0, sideW = wide ? 176 : 0, gap = wide ? 14 : 0;
    var S = wide ? Math.min(392, w - trayW - sideW - 2 * gap) : Math.min(w - 4, B.tiny ? 232 : 320);
    var bellH = wide ? 28 : B.tiny ? 14 : 22, label = wide ? 28 : 26;
    var RO = S / 2 - label, rimW = wide ? 12 : 9, r = RO - rimW;
    return { w: w, wide: wide, tiny: B.tiny, S: S, H: S + bellH, bellH: bellH, cx: S / 2, cy: bellH + S / 2, RO: RO, r: r, rimW: rimW, RL: S / 2 - label / 2, trayW: trayW, sideW: sideW, gap: gap,
      numF: Math.max(14, Math.round(r * 0.17)), numR: 0.72 * r, longL: 0.55 * r, shortL: 0.40 * r, echoR: 0.66 * r, laneR: 0.68 * r, longW: wide ? 6 : 5, shortW: wide ? 12 : 9 };
  },
  _pol: function (D, rad, deg) { var a = deg * Math.PI / 180; return { x: D.cx + rad * Math.sin(a), y: D.cy - rad * Math.cos(a) }; },
  _sector: function (D, rad, a0, a1) {
    if (a1 - a0 < 0.01) { var p = this._pol(D, rad, a0); return 'M' + f1(D.cx) + ' ' + f1(D.cy) + 'L' + f1(p.x) + ' ' + f1(p.y) + 'Z'; }
    if (a1 - a0 >= 359.99) return 'M' + f1(D.cx - rad) + ' ' + f1(D.cy) + 'a' + f1(rad) + ' ' + f1(rad) + ' 0 1 0 ' + f1(2 * rad) + ' 0a' + f1(rad) + ' ' + f1(rad) + ' 0 1 0 ' + f1(-2 * rad) + ' 0Z';
    var p0 = this._pol(D, rad, a0), p1 = this._pol(D, rad, a1);
    return 'M' + f1(D.cx) + ' ' + f1(D.cy) + 'L' + f1(p0.x) + ' ' + f1(p0.y) + 'A' + f1(rad) + ' ' + f1(rad) + ' 0 ' + (a1 - a0 > 180 ? 1 : 0) + ' 1 ' + f1(p1.x) + ' ' + f1(p1.y) + 'Z';
  },
  /* the clock face, the hands, the wedge and the echo */
  _clockSvg: function (D) {
    var C = SetClockCore, st = this.st, v = this._view, self = this, lv = this._level(), out = '';
    var live = this._slice() === 'live' && st.short != null && st.long != null && !st.done;
    var drawEcho = (v.showing || st.done || live) && st.short != null && st.long != null;
    out += '<svg class="sc-svg" width="' + D.S + '" height="' + D.H + '" viewBox="0 0 ' + D.S + ' ' + D.H + '" aria-hidden="true" focusable="false">';
    /* the bell on top of the rim (rings three arcs on success) */
    var by = D.cy - D.RO - 2, bw = D.wide ? 44 : 32, bh = D.bellH - 4;
    out += '<g class="sc-bell' + (v.ring ? ' is-ring' : '') + '"><path d="M' + f1(D.cx - bw / 2) + ' ' + f1(by) + ' Q' + f1(D.cx - bw / 2) + ' ' + f1(by - bh) + ' ' + f1(D.cx) + ' ' + f1(by - bh) + ' Q' + f1(D.cx + bw / 2) + ' ' + f1(by - bh) + ' ' + f1(D.cx + bw / 2) + ' ' + f1(by) + 'Z" fill="#C9A54E" stroke="#3A2E1F" stroke-width="2.5"/>';
    if (v.ring) for (var k = 1; k <= 3; k++) { var rr = bw / 2 + 4 * k; out += '<path class="sc-ringarc sc-ra' + k + '" d="M' + f1(D.cx - rr) + ' ' + f1(by - bh / 2) + ' A' + rr + ' ' + rr + ' 0 0 1 ' + f1(D.cx + rr) + ' ' + f1(by - bh / 2) + '" fill="none" stroke="#C9A54E" stroke-width="2.5" stroke-linecap="round"/>'; }
    out += '</g>';
    /* the rim and the face */
    out += '<circle cx="' + f1(D.cx) + '" cy="' + f1(D.cy) + '" r="' + f1(D.RO) + '" fill="#E9D3B0" stroke="#3A2E1F" stroke-width="3"/>';
    out += '<circle cx="' + f1(D.cx) + '" cy="' + f1(D.cy) + '" r="' + f1(D.r) + '" fill="#FBF3E4" stroke="#3A2E1F" stroke-width="1.5"/>';
    /* the 12 hour slices — the lanes the echo lands in (alternate tint + dotted spokes on the numerals' rays) */
    /* "while setting" draws the lanes green (the echo will follow the hands in them), "after Check" in faint paper tones */
    var liveMode = this._slice() === 'live';
    for (var h = 0; h < 12; h++) {
      if (h % 2 === 0) out += '<path class="sc-lane" d="' + this._sector(D, D.laneR, 30 * h, 30 * h + 30) + '" fill="' + (liveMode ? '#E3EFE9' : '#F6EAD5') + '"/>';
      var sp = this._pol(D, D.laneR, 30 * h); out += '<line class="sc-spoke" x1="' + f1(D.cx) + '" y1="' + f1(D.cy) + '" x2="' + f1(sp.x) + '" y2="' + f1(sp.y) + '" stroke="' + (liveMode ? '#7FB3A6' : '#C9B48E') + '" stroke-width="1" stroke-dasharray="2 4"/>';
    }
    /* the long hand's sweep and its echo in the hour slice */
    if (drawEcho) {
      var m = C.settleLong(st.long), e = C.echo(st.short, m), sw = st.done ? 1 : v.sweep;
      out += '<path class="sc-wedge' + (st.done ? ' is-ok' : '') + '" d="' + this._sector(D, D.echoR, 0, 6 * m * sw) + '"/>';
      out += '<path class="sc-echo' + (st.done ? ' is-ok' : '') + '" d="' + this._sector(D, D.echoR, e.start, e.start + e.span * sw) + '"/>';
      var ed = this._pol(D, D.echoR, e.start + e.span);
      out += '<line class="sc-edge' + (v.arrow ? ' is-pulse' : '') + '" x1="' + f1(D.cx) + '" y1="' + f1(D.cy) + '" x2="' + f1(ed.x) + '" y2="' + f1(ed.y) + '"/>';
      if (v.arrow && !st.done) {
        /* an arc from the short hand's tip to the echo's end, along the rim of the slices */
        var a0 = C.shortDeg(st.short), a1 = e.start + e.span, d = ((a1 - a0) % 360 + 540) % 360 - 180;
        if (Math.abs(d) > 2) {
          var rad = D.shortL + 6, p0 = this._pol(D, rad, a0), p1 = this._pol(D, rad, a1), hd = d > 0 ? 1 : -1, tip = this._pol(D, rad, a1 - hd * 7);
          out += '<path class="sc-arrow" d="M' + f1(p0.x) + ' ' + f1(p0.y) + 'A' + f1(rad) + ' ' + f1(rad) + ' 0 0 ' + (d > 0 ? 1 : 0) + ' ' + f1(p1.x) + ' ' + f1(p1.y) + '"/>';
          var n1 = this._pol(D, rad + 6, a1 - hd * 7), n2 = this._pol(D, rad - 6, a1 - hd * 7);
          out += '<path class="sc-arrowhead" d="M' + f1(p1.x) + ' ' + f1(p1.y) + 'L' + f1(n1.x) + ' ' + f1(n1.y) + 'L' + f1(n2.x) + ' ' + f1(n2.y) + 'Z"/>';
          void tip;
        }
      }
    }
    /* ticks by level: o'clock levels 12 five-minute ticks; quarter hours thicken the 3/6/9/12; five minutes + mixed add the 48 minute ticks */
    var fine = lv === 'five' || lv === 'mixed', inner = D.r - 1;
    for (var t = 0; t < 60; t++) {
      var big = t % 5 === 0; if (!big && !fine) continue;
      var L = big ? Math.max(8, Math.min(14, Math.round(D.r * 0.09))) : Math.max(4, Math.min(7, Math.round(D.r * 0.045))), wdt = big ? (lv === 'quarter' && t % 15 === 0 ? 5 : 3) : 1.2;
      var q1 = this._pol(D, inner, t * 6), q2 = this._pol(D, inner - L, t * 6);
      out += '<line class="sc-tick" x1="' + f1(q1.x) + '" y1="' + f1(q1.y) + '" x2="' + f1(q2.x) + '" y2="' + f1(q2.y) + '" stroke="#3A2E1F" stroke-width="' + wdt + '" stroke-linecap="round"/>';
    }
    /* the minute scale outside the rim: five-minute + mixed levels always, every level at miss 2 */
    if (fine || v.scale) for (var mm = 5; mm < 60; mm += 5) { var lp = this._pol(D, D.RL, mm * 6); out += '<text class="sc-min' + (v.scale && !fine ? ' is-help' : '') + '" x="' + f1(lp.x) + '" y="' + f1(lp.y) + '" font-size="' + (D.wide ? 13 : 11) + '" text-anchor="middle" dominant-baseline="central">' + mm + '</text>'; }
    /* numerals */
    for (var n = 1; n <= 12; n++) { var np = this._pol(D, D.numR, n * 30); out += '<text class="sc-num" x="' + f1(np.x) + '" y="' + f1(np.y) + '" font-size="' + D.numF + '" text-anchor="middle" dominant-baseline="central">' + n + '</text>'; }
    /* the hands (long under short), the selected one with a glow at its tip */
    var hand = function (which) {
      if (st[which] == null) return '';
      var deg = which === 'short' ? C.shortDeg(st.short) : C.longDeg(st.long), len = which === 'short' ? D.shortL : D.longL, p = self._pol(D, len, deg);
      var s = '<line class="sc-' + which + '" x1="' + f1(D.cx) + '" y1="' + f1(D.cy) + '" x2="' + f1(p.x) + '" y2="' + f1(p.y) + '" stroke-width="' + (which === 'short' ? D.shortW : D.longW) + '" stroke-linecap="round"/>';
      if (st.sel === which && !st.done) s = '<circle class="sc-glow" cx="' + f1(p.x) + '" cy="' + f1(p.y) + '" r="' + (D.wide ? 8 : 7) + '"/>' + s;
      return s;
    };
    out += hand('long') + hand('short');
    out += '<circle cx="' + f1(D.cx) + '" cy="' + f1(D.cy) + '" r="' + (D.wide ? 9 : 7) + '" fill="#C9A54E" stroke="#8C6A45" stroke-width="2"/>';
    out += '</svg>';
    return out;
  },
  /* one hand drawn lying in the tray (the button's picture) */
  _handPic: function (which, w, h) {
    var short = which === 'short', len = short ? w * 0.62 : w * 0.92, th = short ? 12 : 7, x0 = (w - len) / 2;
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true"><line x1="' + f1(x0) + '" y1="' + f1(h / 2) + '" x2="' + f1(x0 + len) + '" y2="' + f1(h / 2) + '" stroke="' + (short ? '#F2784B' : '#146B5E') + '" stroke-width="' + th + '" stroke-linecap="round"/><circle cx="' + f1(x0) + '" cy="' + f1(h / 2) + '" r="5" fill="#C9A54E"/></svg>';
  },
  _paint_: function () {
    var C = SetClockCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'sc-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    var stage = this._qs('.sc-stage'), box = this._qs('.sc-clockbox'), slot = this._qs('.sc-trayslot'), side = this._qs('.sc-side'), row = this._qs('.sc-row');
    box.innerHTML = this._clockSvg(D); box.setAttribute('role', 'group'); box.setAttribute('aria-label', this._t('aFace'));
    box.style.width = D.S + 'px'; box.style.height = D.H + 'px';
    var svg = box.querySelector('.sc-svg');
    svg.addEventListener('pointerdown', function (e) { self._down(e); });
    /* the tray: a hand lies in it until put on the clock; on the clock its button selects it (and turns it by the arrow keys) */
    var tray = this.api.el('div', 'sc-tray'); tray.setAttribute('role', 'group'); tray.setAttribute('aria-label', this._t('aTray'));
    ['short', 'long'].forEach(function (which) {
      var on = st[which] != null, bw = D.wide ? 84 : (D.tiny ? 104 : 120), bh = D.wide ? 64 : 56;
      var b = self._btn('sc-hand sc-hand-' + which + (on ? ' is-on' : '') + (st.sel === which && on ? ' is-sel' : '') + (v.wiggle === which ? ' is-wiggle' : ''), 'tray-' + which, self._t(on ? (which === 'short' ? 'aShortOn' : 'aLongOn') : (which === 'short' ? 'aShortTray' : 'aLongTray')), self._handPic(which, bw - 16, bh - 16));
      b.addEventListener('click', function () { self._trayTap(which); });
      b.addEventListener('keydown', function (e) { self._key_(e, which); });
      tray.appendChild(b);
    });
    /* the time card: the target, and the receipt after a Check */
    var card = this.api.el('div', 'sc-card');
    card.innerHTML = '<div class="sc-target">' + esc(this._digital(st.t)) + '</div>' + (D.wide ? '<div class="sc-words">' + esc(this._words(st.t)) + '</div>' : '');
    var rcpt = null, R = (v.showing || st.done) ? C.receipt(st) : null;
    if (R) {
      rcpt = this.api.el('div', 'sc-receipt' + (st.done ? ' is-ok' : ''));
      rcpt.setAttribute('aria-label', this._t('aReceipt', { d: this._digital(R) }));
      var mmS = (R.m < 10 ? '0' : '') + R.m;
      rcpt.innerHTML = '<span class="sc-rh">' + R.h + '</span>' + (R.unsure ? '<span class="sc-unsure">?</span>' : '') + '<span class="sc-rsep">' + esc(this._TT().sep.trim() || ':') + '</span><span class="sc-rm' + (v.minutesOff ? ' is-off' : '') + '">' + mmS + '</span>';
    }
    slot.innerHTML = ''; side.innerHTML = ''; row.innerHTML = '';
    if (D.wide) {
      slot.style.width = D.trayW + 'px'; side.style.width = D.sideW + 'px';
      slot.appendChild(tray); side.appendChild(card); if (rcpt) side.appendChild(rcpt);
      row.style.display = 'none';
    } else {
      slot.style.width = '0px'; side.style.width = '0px'; row.style.display = '';
      /* the time card holds the target and, after a Check, the receipt under it; the tray always stays (its buttons choose and turn the hands) */
      var col = this.api.el('div', 'sc-cardcol'); col.appendChild(card); if (rcpt) col.appendChild(rcpt);
      row.appendChild(col); row.appendChild(tray);
    }
    stage.style.gap = D.gap + 'px';
    /* Check */
    var foot = this._qs('.sc-foot'); foot.innerHTML = '';
    var chk = this._btn('sc-check', 'check', null, esc(this._t('check'))); chk.disabled = st.done || this._busy;
    chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.sc-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'sc-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'sc-note is-hint'; }
    else { note.textContent = ''; note.className = 'sc-note'; }
  },
  /* ---------------- the hand ---------------- */
  _trayTap: function (which) {
    if (this._busy) return;
    var st = this.st, r = SetClockCore.place(st, which);
    if (r === 'placed') { this._clearShowing(); this.api.sound(520); }
    this._paint();
  },
  _key_: function (e, which) {
    var st = this.st, k = e.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') {
      e.preventDefault(); if (this._busy) return;
      if (st[which] == null) SetClockCore.place(st, which);
      SetClockCore.nudge(st, which, (k === 'ArrowRight' || k === 'ArrowUp') ? 1 : -1, e.shiftKey);
      this._moved(); return;
    }
    if (k === 'Enter' && st[which] != null) { e.preventDefault(); this._check(); }
  },
  /* a hand moved: any showing fades; in free play the receipt and echo follow; the bell rings on an o'clock */
  _moved: function () {
    var st = this.st, v = this._view;
    if (st.done) { v.showing = true; var R = SetClockCore.receipt(st); v.ring = R && R.m === 0 && !R.unsure ? (v.ring || 0) + 1 : 0; }
    else this._clearShowing();
    this._paint();
  },
  _down: function (e) {
    var C = SetClockCore, st = this.st, self = this;
    if (this._busy || (e.button != null && e.button !== 0)) return;
    var D = this._dims(), R = e.currentTarget.getBoundingClientRect();
    var px = e.clientX - R.left - D.cx, py = e.clientY - R.top - D.cy, dist = Math.hypot(px, py);
    if (dist > D.RO + 4) return;
    var deg = function (ev) { var x = ev.clientX - R.left - D.cx, y = ev.clientY - R.top - D.cy; return ((Math.atan2(x, -y) * 180 / Math.PI) + 360) % 360; };
    /* the hub swaps the chosen hand; a press near the other hand picks it up */
    if (dist < (D.wide ? 16 : 13)) { if (C.swapSel(st) === 'selected') { this.api.sound(440); this._paint(); } return; }
    var near = function (which) {
      if (st[which] == null) return Infinity;
      var a = (which === 'short' ? C.shortDeg(st.short) : C.longDeg(st.long)) * Math.PI / 180, L = which === 'short' ? D.shortL : D.longL;
      var tx = L * Math.sin(a), ty = -L * Math.cos(a), u = Math.max(0, Math.min(1, (px * tx + py * ty) / (L * L)));
      return Math.hypot(px - u * tx, py - u * ty);
    };
    var other = st.sel === 'short' ? 'long' : 'short';
    if (near(other) < 14 && near(other) < near(st.sel)) C.select(st, other);
    if (!st.sel || st[st.sel] == null) {
      if (st.short == null && st.long == null) { this._view.note = this._t('hintTray'); this._view.wiggle = 'short'; this._paint(); }
      return;
    }
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (x) {}
    C.point(st, deg(e), false); this._moved();
    var move = function (ev) { C.point(st, deg(ev), false); self._moved(); };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);
      C.point(st, deg(ev), true); self._moved();
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  /* ---------------- Check ---------------- */
  _stopAnim: function () { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; } },
  _reduced: function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } },
  /* the slice show: the wedge sweeps from 12 and its echo grows in the hour slice */
  _sweep: function (done) {
    var self = this, v = this._view;
    if (this.FAST || this._reduced() || typeof requestAnimationFrame === 'undefined') { v.sweep = 1; this._paint(); if (done) done(); return; }
    var t0 = null, ms = 650; v.sweep = 0; this._busy = true;
    var tick = function (now) {
      if (t0 == null) t0 = now; var p = Math.min(1, (now - t0) / ms); v.sweep = 1 - Math.pow(1 - p, 3); self._paint();
      if (p < 1) self._raf = requestAnimationFrame(tick); else { self._raf = 0; self._busy = false; if (done) done(); }
    };
    this._raf = requestAnimationFrame(tick);
  },
  _check: function () {
    var C = SetClockCore, st = this.st, v = this._view, self = this;
    if (this._busy || st.done) return;
    var a = C.check(st);
    if (a.result === 'tray') {
      this.api.sound(200); v.note = this._t('hintTray'); v.wiggle = st.short == null ? 'short' : 'long';
      this._paint(); this.api.announce(v.note); return;
    }
    v.showing = true; v.wiggle = null;
    if (a.result === 'ok') {
      this._sweep(function () {
        v.ring = 1; v.ok = self._t('ok', { W: self._cap(self._words(st.t)) }); v.note = '';
        self.api.sound(880); self._paint(); self.api.announce(v.ok);
        self._advance(v.ok.length * 60 + 3200);
      });
      return;
    }
    this.api.sound(220);
    var hk = C.hint(st), R = C.receipt(st);
    v.minutesOff = !!(R && R.m !== st.t.m); v.arrow = a.kind === 'edge' || a.kind === 'hour'; v.scale = st.show >= 2;
    this._sweep(function () { v.note = self._t(hk.key); self._paint(); self.api.announce(v.note); });
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

function f1(x) { return Math.round(x * 10) / 10; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectSetClockCSS() {
  if (typeof document === 'undefined' || document.getElementById('sc-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sc-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .sc-wrap:focus{outline:none;} .sc-wrap.is-narrow{gap:8px;}'
  + '.sc-stage{display:flex;align-items:center;justify-content:center;width:100%;}'
  + '.sc-trayslot,.sc-side{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;} .sc-clockbox{flex:0 0 auto;position:relative;}'
  + '.sc-svg{display:block;touch-action:none;cursor:pointer;}'
  + '.sc-num{font-family:' + H + ';font-weight:700;fill:#3A2E1F;pointer-events:none;} .sc-min{font-family:' + H + ';font-weight:800;fill:#146B5E;pointer-events:none;} .sc-min.is-help{fill:#8A3B1F;}'
  + '.sc-short{stroke:#F2784B;} .sc-long{stroke:#146B5E;} .sc-glow{fill:none;stroke:#F4CF62;stroke-width:4;}'
  + '.sc-wedge{fill:rgba(20,107,94,.18);stroke:rgba(20,107,94,.5);stroke-width:1.5;} .sc-wedge.is-ok{fill:rgba(20,107,94,.32);}'
  + '.sc-echo{fill:rgba(20,107,94,.45);stroke:#146B5E;stroke-width:1.5;} .sc-echo.is-ok{fill:rgba(20,107,94,.75);}'
  + '.sc-edge{stroke:#146B5E;stroke-width:3;stroke-linecap:round;} .sc-edge.is-pulse{animation:scPulse 1s ease-in-out infinite;} .sc-wrap.is-fast .sc-edge.is-pulse{animation:none;}'
  + '@keyframes scPulse{0%,100%{stroke-opacity:1;}50%{stroke-opacity:.25;}}'
  + '.sc-arrow{fill:none;stroke:#F2784B;stroke-width:3;stroke-dasharray:6 5;} .sc-arrowhead{fill:#F2784B;}'
  + '.sc-ringarc{opacity:0;animation:scRing .9s ease-out 2;} .sc-ra2{animation-delay:.09s;} .sc-ra3{animation-delay:.18s;} .sc-wrap.is-fast .sc-ringarc{animation:none;opacity:1;}'
  + '@keyframes scRing{0%{opacity:0;}30%{opacity:1;}100%{opacity:0;}}'
  + '.sc-tray{display:flex;flex-direction:column;gap:10px;padding:10px 6px;border-radius:16px;background:#E9D3B0;border:3px solid #3A2E1F;} .sc-wrap.is-narrow .sc-tray{flex-direction:row;padding:6px;gap:8px;}'
  + '.sc-hand{display:flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:6px;border:2px dashed transparent;border-radius:12px;background:#FFF8E7;cursor:pointer;} .sc-hand.is-on{background:transparent;border-color:#8C6A45;} .sc-hand.is-on svg{opacity:.28;} .sc-hand.is-sel{border-style:solid;border-color:#F4CF62;}'
  + '.sc-hand.is-wiggle{animation:scWiggle .5s ease-in-out 2;} @keyframes scWiggle{0%,100%{transform:rotate(0);}25%{transform:rotate(-6deg);}75%{transform:rotate(6deg);}} .sc-wrap.is-fast .sc-hand.is-wiggle{animation:none;}'
  + '.sc-card{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 14px;border-radius:14px;background:#0E3B34;color:#FFF8E7;} .sc-target{font-family:' + H + ';font-weight:800;font-size:44px;line-height:1.05;} .sc-words{font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.2;text-align:center;}'
  + '.sc-wrap.is-narrow .sc-card{padding:6px 12px;} .sc-wrap.is-narrow .sc-target{font-size:32px;}'
  + '.sc-receipt{display:flex;align-items:baseline;gap:2px;padding:8px 16px;border-radius:6px;background:#FFFDF6;border:2px solid #C9B48E;box-shadow:0 2px 0 #C9B48E;font-family:' + H + ';font-weight:800;font-size:34px;line-height:1.1;color:#3A2E1F;animation:scSlide .3s ease-out;} .sc-wrap.is-fast .sc-receipt{animation:none;} .sc-receipt.is-ok{color:#146B5E;border-color:#146B5E;}'
  + '@keyframes scSlide{0%{transform:translateY(-10px);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.sc-unsure{font-size:.6em;color:#8A3B1F;margin-left:1px;} .sc-rm.is-off{text-decoration:underline;text-decoration-color:#F2784B;text-decoration-thickness:3px;}'
  + '.sc-wrap.is-narrow .sc-receipt{font-size:28px;padding:6px 12px;}'
  + '.sc-cardcol{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.sc-row{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;width:100%;}'
  + '.sc-foot{display:flex;justify-content:center;width:100%;}'
  + '.sc-check{min-width:150px;min-height:54px;padding:8px 28px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .sc-check:disabled{opacity:.5;cursor:default;}'
  + '.sc-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .sc-note.is-hint{color:#8A3B1F;} .sc-wrap.is-narrow .sc-note{font-size:17px;}'
  + '.sc-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'sc-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.SetClockActivity = SetClockActivity;
