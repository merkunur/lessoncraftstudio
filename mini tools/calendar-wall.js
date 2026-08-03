/* =====================================================================
   TOOL #7 — CALENDAR WALL   (calendar-wall.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks`). Tool #4 of the Premium Tools
   Program pilot wave — the catalog flagship: the daily morning-meeting
   routine (date · days-in-school · weather) run 180×/year on the
   classroom projector, every element touchable by the calendar-helper
   child.

   PEDAGOGY (locked by the 2026-07-16 expert-ensemble design):
     Slide pager, one widget at a time — ritual stability IS the
     pedagogy. The date line (composed from hand-authored per-locale
     date words + Intl weekday/month) persists above every widget and
     is print-speech matched: the words on screen are the words spoken.
     NEVER auto-speak on open — the helper child taps the date card.
     Days-in-school = CRA in parallel: straw bundles + ones ten-frame +
     numeral move together on ONE tap; the rebundling animation at ten
     and one hundred IS the celebration (no confetti, no score — paper,
     ribbon and bunting). The count is SCHOOL days: advance is always a
     human tap, corrections live in a quiet teacher stepper.
     Weather = one observation per school day; the month pictograph is
     the K.MD.B.3 → 2.MD.D.10 bridge (strict 1:1 icons).

   STATE: lcs:calendar-wall:v1 — per-wall {dayCount, lastCountDate,
   countLog, weather by month, pattern, lastSummary}. Date keys are
   LOCAL-device strings (never toISOString — UTC midnight bug); day
   arithmetic via new Date(y,m,d±1) (DST-safe). Free tier = read-gate
   to today's slice, NEVER deletion. Shell reset = view reset only.
   Destructive ops sit behind a two-step confirm in the wall panel.
   Entitlement: house pattern + cached verdict trusted 14 days on
   NETWORK failure (only an authoritative "free" demotes).
   ===================================================================== */
var CalendarWall = {
  id: 'calendar-wall',

  strings: {
    title: {en:'Calendar Wall',de:'Kalendertafel',fr:'Calendrier de la classe',it:'Calendario della classe',es:'Calendario del salón',pt:'Mural do calendário',nl:'Dagopening',sv:'Samlingskalender',da:'Kalendervæg',no:'Kalendervegg',fi:'Kalenteriseinä'},
    instruction: {en:'Your morning meeting, alive: the date, the days in school, and today’s weather — all in one wall.',de:'Der Morgenkreis zum Anfassen: Datum, Schultage und das Wetter von heute — alles an einer Tafel.',fr:'Les rituels du matin, vivants : la date, les jours d’école et la météo du jour — tout sur un seul affichage.',it:'La routine del calendario, dal vivo: la data, i giorni di scuola e il tempo che fa oggi — tutto davanti alla classe.',es:'La rutina de la mañana completa: la fecha, los días de escuela y el clima de hoy — todo en una sola pantalla.',pt:'A rodinha da manhã ganha vida: a data, os dias de aula e o tempo de hoje — tudo em um só mural.',nl:'De dagopening op het digibord: de datum, de schooldagen en het weer van vandaag — alles op één bord.',sv:'Samlingen, fast levande: datumet, skoldagarna och dagens väder — allt på ett och samma ställe.',da:'Jeres morgensamling — lyslevende: datoen, skoledagene og dagens vejr, samlet på én væg.',no:'Samlingsstunden, levende: datoen, skoledagene og været i dag — alt på én vegg.',fi:'Aamupiiri herää eloon: päivämäärä, koulupäivät ja tämän päivän sää — kaikki yhdellä seinällä.'},

    /* dock */
    dockCalendar: {en:'Calendar',de:'Kalender',fr:'Calendrier',it:'Calendario',es:'Calendario',pt:'Calendário',nl:'Kalender',sv:'Kalender',da:'Kalender',no:'Kalender',fi:'Kalenteri'},
    dockCounter: {en:'Days in school',de:'Schultage',fr:'Chaque jour compte',it:'Giorni di scuola',es:'Días de escuela',pt:'Dias de aula',nl:'Schooldagen',sv:'Skoldagar',da:'Skoledage',no:'Skoledager',fi:'Koulupäivät'},
    dockWeather:  {en:'Weather',de:'Wetter',fr:'Météo',it:'Tempo',es:'Clima',pt:'Tempo',nl:'Weer',sv:'Väder',da:'Vejr',no:'Vær',fi:'Sää'},
    prevWidget:   {en:'Previous',de:'Zurück',fr:'Précédent',it:'Indietro',es:'Anterior',pt:'Anterior',nl:'Vorige',sv:'Föregående',da:'Forrige',no:'Forrige',fi:'Edellinen'},
    nextWidget:   {en:'Next',de:'Weiter',fr:'Suivant',it:'Avanti',es:'Siguiente',pt:'Próximo',nl:'Volgende',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},

    /* date strips */
    stripYesterday:{en:'Yesterday was {w}.',de:'Gestern war {w}.',fr:'Hier, c’était {w}.',it:'Ieri era {w}.',es:'Ayer fue {w}.',pt:'Ontem foi {w}.',nl:'Gisteren was het {w}.',sv:'I går var det {w}.',da:'I går var det {w}.',no:'I går var det {w}.',fi:'Eilen oli {w}.'},
    stripToday:   {en:'Today is {d}.',de:'Heute ist {d}.',fr:'Aujourd’hui, c’est {d}.',it:'Oggi è {d}.',es:'Hoy es {d}.',pt:'Hoje é {d}.',nl:'Vandaag is het {d}.',sv:'I dag är det {d}.',da:'I dag er det {d}.',no:'I dag er det {d}.',fi:'Tänään on {d}.'},
    stripTomorrow: {en:'Tomorrow will be {w}.',de:'Morgen ist {w}.',fr:'Demain, ce sera {w}.',it:'Domani sarà {w}.',es:'Mañana será {w}.',pt:'Amanhã será {w}.',nl:'Morgen wordt het {w}.',sv:'I morgon blir det {w}.',da:'I morgen bliver det {w}.',no:'I morgen blir det {w}.',fi:'Huomenna on {w}.'},
    todayBtn:     {en:'Today',de:'Heute',fr:'Aujourd’hui',it:'Oggi',es:'Hoy',pt:'Hoje',nl:'Vandaag',sv:'I dag',da:'I dag',no:'I dag',fi:'Tänään'},
    speakDateAria: {en:'Hear today’s date',de:'Das heutige Datum anhören',fr:'Écouter la date d’aujourd’hui',it:'Ascolta la data di oggi',es:'Escuchar la fecha de hoy',pt:'Ouvir a data de hoje',nl:'De datum van vandaag beluisteren',sv:'Lyssna på dagens datum',da:'Hør dagens dato',no:'Hør dagens dato',fi:'Kuuntele tämän päivän päivämäärä'},
    flipAria: {en:'Turn over today’s card',de:'Die Karte von heute umdrehen',fr:'Retourner la carte d’aujourd’hui',it:'Gira il cartellino di oggi',es:'Voltear la tarjeta de hoy',pt:'Virar o cartão de hoje',nl:'De kaart van vandaag omdraaien',sv:'Vänd på dagens kort',da:'Vend dagens kort',no:'Snu dagens kort',fi:'Käännä tämän päivän kortti'},
    prevMonth:    {en:'Previous month',de:'Voriger Monat',fr:'Mois précédent',it:'Mese precedente',es:'Mes anterior',pt:'Mês anterior',nl:'Vorige maand',sv:'Föregående månad',da:'Forrige måned',no:'Forrige måned',fi:'Edellinen kuukausi'},
    nextMonth:    {en:'Next month',de:'Nächster Monat',fr:'Mois suivant',it:'Mese successivo',es:'Mes siguiente',pt:'Próximo mês',nl:'Volgende maand',sv:'Nästa månad',da:'Næste måned',no:'Neste måned',fi:'Seuraava kuukausi'},
    close:        {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    cancel:       {en:'Cancel',de:'Abbrechen',fr:'Annuler',it:'Annulla',es:'Cancelar',pt:'Cancelar',nl:'Annuleren',sv:'Avbryt',da:'Annuller',no:'Avbryt',fi:'Peruuta'},
    daysLabelOne: {en:'day in school',de:'Schultag',fr:'jour d’école',it:'giorno di scuola',es:'día de escuela',pt:'dia de aula',nl:'schooldag',sv:'skoldag',da:'skoledag',no:'skoledag',fi:'koulupäivä'},

    /* counter */
    plusOne:      {en:'+1 school day',de:'+1 Schultag',fr:'+1 jour d’école',it:'+1 giorno di scuola',es:'+1 día de escuela',pt:'+1 dia de aula',nl:'+1 schooldag',sv:'+1 skoldag',da:'+1 skoledag',no:'+1 skoledag',fi:'+1 koulupäivä'},
    countedToday: {en:'Counted today ✓',de:'Heute gezählt ✓',fr:'Compté aujourd’hui ✓',it:'Contato oggi ✓',es:'Ya contamos hoy ✓',pt:'Já contamos hoje ✓',nl:'Vandaag geteld ✓',sv:'Räknat i dag ✓',da:'Talt i dag ✓',no:'Telt i dag ✓',fi:'Laskettu tänään ✓'},
    undo:         {en:'Undo',de:'Rückgängig',fr:'Annuler',it:'Annulla',es:'Deshacer',pt:'Desfazer',nl:'Ongedaan maken',sv:'Ångra',da:'Fortryd',no:'Angre',fi:'Kumoa'},
    daysLabel:    {en:'days in school',de:'Schultage',fr:'jours d’école',it:'giorni di scuola',es:'días de escuela',pt:'dias de aula',nl:'schooldagen',sv:'skoldagar',da:'skoledage',no:'skoledager',fi:'koulupäivää'},
    jarHundreds:  {en:'Hundreds',de:'Hunderter',fr:'Centaines',it:'Centinaia',es:'Centenas',pt:'Centenas',nl:'Honderdtallen',sv:'Hundratal',da:'Hundreder',no:'Hundrere',fi:'Sadat'},
    jarTens:      {en:'Tens',de:'Zehner',fr:'Dizaines',it:'Decine',es:'Decenas',pt:'Dezenas',nl:'Tientallen',sv:'Tiotal',da:'Tiere',no:'Tiere',fi:'Kymmenet'},
    jarOnes:      {en:'Ones',de:'Einer',fr:'Unités',it:'Unità',es:'Unidades',pt:'Unidades',nl:'Eenheden',sv:'Ental',da:'Enere',no:'Enere',fi:'Ykköset'},
    editCount: {en:'Set the count',de:'Zählerstand ändern',fr:'Corriger le compteur',it:'Modifica il conteggio',es:'Cambiar el conteo',pt:'Ajustar a contagem',nl:'Telling aanpassen',sv:'Ändra antalet dagar',da:'Ret tallet',no:'Endre tellingen',fi:'Muuta lukemaa'},
    narrTen: {en:'Ten ones make one ten!',de:'Aus zehn Einern wird ein Zehner!',fr:'Dix unités font une dizaine !',it:'Dieci unità fanno una decina!',es:'¡Diez unidades forman una decena!',pt:'Dez unidades formam uma dezena!',nl:'Tien eenheden worden samen één tiental!',sv:'Tio ental blir ett tiotal!',da:'Ti enere bliver til én tier!',no:'Ti enere blir én tier!',fi:'Kymmenen ykköstä on yksi kymppi!'},
    narrHundred: {en:'We have been in school for one hundred days!',de:'Hurra! Heute ist unser hundertster Schultag!',fr:'C’est le centième jour d’école !',it:'Siamo a scuola da cento giorni!',es:'¡Llevamos cien días de escuela!',pt:'Já são cem dias de aula!',nl:'Hoera! We zitten al honderd dagen op school!',sv:'Vi har gått i skolan i hundra dagar!',da:'Vi har gået i skole i hundrede dage!',no:'Vi har gått på skolen i hundre dager!',fi:'Olemme olleet koulussa jo sata päivää!'},

    /* weather */
    wSun: {en:'Sunny',de:'Sonne',fr:'Soleil',it:'Sole',es:'Soleado',pt:'Ensolarado',nl:'Zon',sv:'Soligt',da:'Solskin',no:'Sol',fi:'Aurinkoista'},
    wCloud: {en:'Cloudy',de:'Wolken',fr:'Nuages',it:'Nuvole',es:'Nublado',pt:'Nublado',nl:'Wolken',sv:'Molnigt',da:'Skyet',no:'Overskyet',fi:'Pilvistä'},
    wRain: {en:'Rainy',de:'Regen',fr:'Pluie',it:'Pioggia',es:'Lluvioso',pt:'Chuvoso',nl:'Regen',sv:'Regnigt',da:'Regnvejr',no:'Regn',fi:'Sateista'},
    wSnow: {en:'Snowy',de:'Schnee',fr:'Neige',it:'Neve',es:'Nevado',pt:'Com neve',nl:'Sneeuw',sv:'Snöigt',da:'Snevejr',no:'Snø',fi:'Lumisadetta'},
    wWind: {en:'Windy',de:'Wind',fr:'Vent',it:'Vento',es:'Ventoso',pt:'Ventoso',nl:'Wind',sv:'Blåsigt',da:'Blæsevejr',no:'Vind',fi:'Tuulista'},
    wStorm: {en:'Stormy',de:'Gewitter',fr:'Orage',it:'Temporale',es:'Tormenta',pt:'Tempestade',nl:'Onweer',sv:'Åska',da:'Tordenvejr',no:'Torden',fi:'Ukkosta'},
    todayPill:    {en:'Today: {w}',de:'Heute: {w}',fr:'Aujourd’hui : {w}',it:'Oggi: {w}',es:'Hoy: {w}',pt:'Hoje: {w}',nl:'Vandaag: {w}',sv:'I dag: {w}',da:'I dag: {w}',no:'I dag: {w}',fi:'Tänään: {w}'},
    changeWeather: {en:'Change',de:'Ändern',fr:'Modifier',it:'Cambia',es:'Cambiar',pt:'Mudar',nl:'Veranderen',sv:'Ändra',da:'Skift',no:'Endre',fi:'Muuta'},
    yesterdayChip: {en:'Yesterday?',de:'Und gestern?',fr:'Et hier ?',it:'E ieri?',es:'¿Y ayer?',pt:'E ontem?',nl:'En gisteren?',sv:'I går?',da:'Og i går?',no:'I går?',fi:'Entä eilen?'},
    whatWeather:  {en:'What is the weather like today?',de:'Wie ist das Wetter heute?',fr:'Quel temps fait-il aujourd’hui ?',it:'Che tempo fa oggi?',es:'¿Cómo está el clima hoy?',pt:'Como está o tempo hoje?',nl:'Wat voor weer is het vandaag?',sv:'Vad är det för väder i dag?',da:'Hvordan er vejret i dag?',no:'Hvordan er været i dag?',fi:'Millainen sää tänään on?'},
    promptMost: {en:'Which weather has the most days so far?',de:'Welches Wetter gab es bisher am häufigsten?',fr:'Quel temps revient le plus souvent ce mois-ci ?',it:'Quale tempo ha più giorni finora?',es:'¿Qué clima tiene más días hasta ahora?',pt:'Que tempo apareceu mais vezes até agora?',nl:'Welk weer zien we tot nu toe het vaakst?',sv:'Vilket väder har flest dagar hittills?',da:'Hvilket vejr har flest dage indtil nu?',no:'Hvilket vær har flest dager så langt?',fi:'Mitä säätä on ollut tähän mennessä eniten?'},
    promptCompare: {en:'How many more sunny days than rainy days?',de:'Wie viele Sonnentage mehr als Regentage haben wir?',fr:'Combien de jours de soleil de plus que de jours de pluie ?',it:'Quanti giorni di sole in più rispetto ai giorni di pioggia?',es:'¿Cuántos días soleados más que lluviosos llevamos?',pt:'Quantos dias de sol a mais do que dias de chuva?',nl:'Hoeveel zonnige dagen zijn er meer dan regendagen?',sv:'Hur många fler soldagar än regndagar?',da:'Hvor mange flere soldage end regndage har vi haft?',no:'Hvor mange flere soldager enn regndager?',fi:'Montako aurinkoista päivää on enemmän kuin sateisia?'},
    promptTotal: {en:'How many days have we recorded altogether?',de:'Wie viele Tage haben wir insgesamt eingetragen?',fr:'Combien de jours avons-nous notés en tout ?',it:'Quanti giorni abbiamo registrato in tutto?',es:'¿Cuántos días hemos registrado en total?',pt:'Quantos dias registramos ao todo?',nl:'Hoeveel dagen hebben we in totaal al ingevuld?',sv:'Hur många dagar har vi fyllt i sammanlagt?',da:'Hvor mange dage har vi noteret i alt?',no:'Hvor mange dager har vi notert til sammen?',fi:'Montako päivää olemme merkinneet yhteensä?'},
    promptPredict: {en:'What do you predict for tomorrow?',de:'Was glaubst du: Wie wird das Wetter morgen?',fr:'Quel temps prévois-tu pour demain ?',it:'Che tempo prevedi per domani?',es:'¿Qué clima predices para mañana?',pt:'O que você prevê para amanhã?',nl:'Wat voor weer wordt het morgen, denk je?',sv:'Vad tror du om vädret i morgon?',da:'Hvad tror du om vejret i morgen?',no:'Hva tror du om været i morgen?',fi:'Millaista säätä ennustat huomiseksi?'},

    /* wall panel */
    wallsTitle: {en:'Class walls',de:'Klassenkalender',fr:'Mes classes',it:'Calendari di classe',es:'Mis grupos',pt:'Murais de turma',nl:'Mijn klassen',sv:'Klasskalendrar',da:'Klassevægge',no:'Klassevegger',fi:'Luokkaseinät'},
    wallDefault: {en:'My class',de:'Meine Klasse',fr:'Ma classe',it:'La mia classe',es:'Mi grupo',pt:'Minha turma',nl:'Mijn klas',sv:'Min klass',da:'Min klasse',no:'Klassen min',fi:'Oma luokka'},
    newWall: {en:'+ New class wall',de:'+ Neuer Klassenkalender',fr:'+ Nouvelle classe',it:'+ Nuovo calendario di classe',es:'+ Nuevo grupo',pt:'+ Novo mural de turma',nl:'+ Nieuwe klas',sv:'+ Ny klasskalender',da:'+ Ny klassevæg',no:'+ Ny klassevegg',fi:'+ Uusi luokkaseinä'},
    renameWall: {en:'Rename',de:'Umbenennen',fr:'Renommer',it:'Rinomina',es:'Cambiar nombre',pt:'Renomear',nl:'Hernoemen',sv:'Byt namn',da:'Omdøb',no:'Gi nytt navn',fi:'Nimeä uudelleen'},
    newYear: {en:'Start a new school year',de:'Neues Schuljahr beginnen',fr:'Commencer une nouvelle année scolaire',it:'Inizia un nuovo anno scolastico',es:'Empezar un nuevo ciclo escolar',pt:'Começar um novo ano letivo',nl:'Een nieuw schooljaar beginnen',sv:'Starta ett nytt läsår',da:'Start et nyt skoleår',no:'Start et nytt skoleår',fi:'Aloita uusi lukuvuosi'},
    newYearConfirm: {en:'{name} has {n} school days recorded — start a fresh year?',de:'{name} hat {n} gezählte Schultage — ein neues Schuljahr beginnen?',fr:'{name} a {n} jours d’école enregistrés — commencer une nouvelle année ?',it:'{name} ha {n} giorni di scuola registrati — iniziare un nuovo anno?',es:'{name} tiene {n} días de escuela registrados — ¿empezamos un nuevo ciclo?',pt:'{name} tem {n} dias de aula registrados — começar um novo ano letivo?',nl:'{name} heeft {n} schooldagen geteld — een nieuw schooljaar beginnen?',sv:'{name} har {n} räknade skoldagar — starta ett nytt läsår?',da:'{name} har talt {n} skoledage — start et nyt skoleår?',no:'{name} har {n} telte skoledager — starte et nytt år?',fi:'{name}: {n} laskettua koulupäivää — aloitetaanko uusi lukuvuosi?'},
    newYearGo: {en:'Yes, start fresh',de:'Ja, neu beginnen',fr:'Oui, on recommence',it:'Sì, ricominciamo',es:'Sí, empezar de nuevo',pt:'Sim, começar de novo',nl:'Ja, opnieuw beginnen',sv:'Ja, börja om',da:'Ja, begynd forfra',no:'Ja, begynn på nytt',fi:'Kyllä, aloita alusta'},
    lastYear: {en:'Last year: {n} school days',de:'Letztes Schuljahr: {n} Schultage',fr:'L’an dernier : {n} jours d’école',it:'L’anno scorso: {n} giorni di scuola',es:'El ciclo pasado: {n} días de escuela',pt:'Ano passado: {n} dias de aula',nl:'Vorig jaar: {n} schooldagen',sv:'Förra läsåret: {n} skoldagar',da:'Sidste år: {n} skoledage',no:'I fjor: {n} skoledager',fi:'Viime lukuvuonna: {n} koulupäivää'},
    deviceNote: {en:'This wall is saved in this computer’s browser. It won’t follow you to another device or survive clearing browser data.',de:'Dieser Kalender wird im Browser dieses Computers gespeichert. Er wandert nicht auf andere Geräte mit und geht beim Löschen der Browserdaten verloren.',fr:'Ce calendrier est enregistré dans le navigateur de cet ordinateur. Il ne vous suivra pas sur un autre appareil.',it:'Questo calendario è salvato nel browser di questo computer: non ti segue su un altro dispositivo e si perde se cancelli i dati di navigazione.',es:'Este calendario se guarda en el navegador de esta computadora. No te seguirá a otro dispositivo ni se conserva si borras los datos del navegador.',pt:'Este mural fica salvo no navegador deste computador. Ele não acompanha você em outro aparelho.',nl:'Deze dagopening wordt bewaard in de browser van deze computer. De gegevens gaan niet mee naar een ander apparaat en overleven het wissen van browsergegevens niet.',sv:'Den här kalendern sparas i den här datorns webbläsare. Den följer inte med till en annan enhet och försvinner om webbläsardata rensas.',da:'Denne væg gemmes i denne computers browser. Den følger ikke med til en anden enhed.',no:'Denne veggen lagres i nettleseren på denne maskinen. Den følger ikke med til en annen enhet.',fi:'Tämä seinä tallentuu tämän tietokoneen selaimeen. Se ei seuraa mukana toiselle laitteelle.'},
    patternLabel: {en:'Card pattern',de:'Kartenmuster',fr:'Motif des cartes',it:'Ritmo dei cartellini',es:'Patrón de tarjetas',pt:'Padrão dos cartões',nl:'Kaartpatroon',sv:'Kortmönster',da:'Kortmønster',no:'Kortmønster',fi:'Korttikuvio'},

    /* gates */
    freeCounterGate: {en:'Yesterday’s count isn’t saved on the free plan. Subscribers keep their class’s day count all year long.',de:'Der gestrige Zählerstand wird in der kostenlosen Version nicht gespeichert. Abonnenten behalten den Schultage-Zähler ihrer Klasse das ganze Schuljahr.',fr:'Avec l’offre gratuite, le compteur repart chaque jour. Les abonnés gardent le compte de leur classe toute l’année.',it:'Il conteggio di ieri non viene salvato nel piano gratuito. Gli abbonati conservano il conteggio della classe per tutto l’anno.',es:'El conteo de ayer no se guarda en el plan gratuito. Los suscriptores conservan el conteo de su grupo todo el ciclo escolar.',pt:'A contagem de ontem não fica salva no plano gratuito. Assinantes mantêm a contagem da turma o ano todo.',nl:'In de gratis versie wordt de telling van gisteren niet bewaard. Met een abonnement houd je de telling van je klas het hele schooljaar bij.',sv:'Gårdagens räkning sparas inte i gratisplanen. Prenumeranter behåller klassens räknare hela läsåret.',da:'Gårsdagens tal gemmes ikke i den gratis udgave. Abonnenter beholder klassens optælling hele skoleåret.',no:'Gårsdagens telling lagres ikke i gratisversjonen. Abonnenter beholder klassens telling hele året.',fi:'Eilinen lukema ei tallennu ilmaisversiossa. Tilaajilla luokan lukema säilyy koko lukuvuoden.'},
    freeWeatherGate: {en:'On the free plan the chart starts fresh each day. Subscribers watch the whole month grow.',de:'In der kostenlosen Version beginnt das Diagramm jeden Tag neu. Abonnenten sehen den ganzen Monat wachsen.',fr:'Avec l’offre gratuite, le graphique repart de zéro chaque jour. Les abonnés voient grandir tout le mois.',it:'Nel piano gratuito il grafico riparte ogni giorno. Gli abbonati vedono crescere tutto il mese.',es:'En el plan gratuito la gráfica empieza de nuevo cada día. Los suscriptores ven crecer todo el mes.',pt:'No plano gratuito o gráfico recomeça a cada dia. Assinantes veem o mês inteiro crescer.',nl:'In de gratis versie begint de grafiek elke dag opnieuw. Met een abonnement zie je de hele maand groeien.',sv:'I gratisplanen börjar diagrammet om varje dag. Prenumeranter ser hela månaden växa.',da:'I den gratis udgave starter diagrammet forfra hver dag. Abonnenter ser hele måneden vokse.',no:'I gratisversjonen starter diagrammet på nytt hver dag. Abonnenter ser hele måneden vokse.',fi:'Ilmaisversiossa kaavio alkaa joka päivä alusta. Tilaajat näkevät koko kuukauden kasvavan.'},
    newWallGate: {en:'Extra class walls are part of Premium — one wall is always free.',de:'Weitere Klassenkalender gehören zu Premium — ein Kalender bleibt immer kostenlos.',fr:'Les classes supplémentaires font partie de Premium — une classe reste toujours gratuite.',it:'I calendari di classe aggiuntivi fanno parte di Premium — un calendario resta sempre gratuito.',es:'Los grupos adicionales son parte de Premium — el primer grupo siempre es gratis.',pt:'Murais de turma extras fazem parte do Premium — um mural é sempre gratuito.',nl:'Extra klassen horen bij Premium — één klas is altijd gratis.',sv:'Fler klasskalendrar ingår i Premium — en kalender är alltid gratis.',da:'Ekstra klassevægge er en del af Premium — én væg er altid gratis.',no:'Flere klassevegger er en del av Premium — én vegg er alltid gratis.',fi:'Lisäseinät kuuluvat Premiumiin — yksi seinä on aina ilmainen.'},
    unlock: {en:'Keep your wall all year',de:'Behalten Sie Ihren Kalender das ganze Schuljahr',fr:'Gardez votre calendrier toute l’année',it:'Conserva il tuo calendario tutto l\'anno',es:'Conserva tu calendario todo el año',pt:'Mantenha seu mural o ano todo',nl:'Bewaar je dagopening het hele schooljaar',sv:'Behåll klassens kalender hela läsåret',da:'Behold din væg hele året',no:'Behold veggen din hele året',fi:'Pidä seinäsi koko lukuvuoden'},

    /* settings */
    setWeather: {en:'Weather icons',de:'Wettersymbole',fr:'Icônes météo',it:'Icone del tempo',es:'Íconos del clima',pt:'Ícones do tempo',nl:'Weerpictogrammen',sv:'Vädersymboler',da:'Vejrsymboler',no:'Værsymboler',fi:'Sääkuvakkeet'},
    setWeather4:  {en:'4 (pre-K)',de:'4 (Vorschule)',fr:'4 (maternelle)',it:'4 (infanzia)',es:'4 (preescolar)',pt:'4 (educação infantil)',nl:'4 (kleuters)',sv:'4 (förskola)',da:'4 (børnehave)',no:'4 (barnehage)',fi:'4 (esikoulu)'},
    setWeather6:  {en:'6',de:'6',fr:'6',it:'6',es:'6',pt:'6',nl:'6',sv:'6',da:'6',no:'6',fi:'6'},
    setCounter:   {en:'Day counter shows',de:'Der Zähler zeigt',fr:'Le compteur montre',it:'Il contatore mostra',es:'El contador muestra',pt:'O contador mostra',nl:'De teller toont',sv:'Räknaren visar',da:'Tælleren viser',no:'Telleren viser',fi:'Laskuri näyttää'},
    setCounterAll: {en:'Bundles + frame + number',de:'Bündel + Zehnerfeld + Zahl',fr:'Pailles + boîte de dix + nombre',it:'Mazzetti + tabella + numero',es:'Manojos + marco + número',pt:'Feixes + quadro + número',nl:'Bundels + tienraam + getal',sv:'Buntar + tioram + tal',da:'Bundter + tierramme + tal',no:'Bunter + tierramme + tall',fi:'Niput + kymmenruudukko + luku'},
    setCounterTwo: {en:'Frame + number',de:'Zehnerfeld + Zahl',fr:'Boîte de dix + nombre',it:'Tabella + numero',es:'Marco + número',pt:'Quadro + número',nl:'Tienraam + getal',sv:'Tioram + tal',da:'Tierramme + tal',no:'Tierramme + tall',fi:'Kymmenruudukko + luku'},
    setCounterNum:{en:'Number only',de:'Nur die Zahl',fr:'Nombre seul',it:'Solo il numero',es:'Solo el número',pt:'Só o número',nl:'Alleen het getal',sv:'Bara talet',da:'Kun tallet',no:'Bare tallet',fi:'Vain luku'},
    setSpeak: {en:'Speak the date',de:'Datum vorlesen',fr:'Dire la date',it:'Leggi la data ad alta voce',es:'Decir la fecha',pt:'Falar a data',nl:'Datum uitspreken',sv:'Läs upp datumet',da:'Læs datoen op',no:'Les datoen høyt',fi:'Lue päivämäärä ääneen'},
    setWeek: {en:'Week starts on',de:'Die Woche beginnt am',fr:'La semaine commence le',it:'La settimana inizia di',es:'La semana empieza el',pt:'Início da semana',nl:'De week begint op',sv:'Veckan börjar på',da:'Ugen starter',no:'Uken starter på',fi:'Viikko alkaa'},
    setWeekAuto:  {en:'Automatic',de:'Automatisch',fr:'Automatique',it:'Automatico',es:'Automático',pt:'Automático',nl:'Automatisch',sv:'Automatiskt',da:'Automatisk',no:'Automatisk',fi:'Automaattisesti'},
    setWeekMon: {en:'Monday',de:'Montag',fr:'Lundi',it:'Lunedì',es:'Lunes',pt:'Segunda',nl:'Maandag',sv:'Måndag',da:'Mandag',no:'Mandag',fi:'Maanantaista'},
    setWeekSun: {en:'Sunday',de:'Sonntag',fr:'Dimanche',it:'Domenica',es:'Domingo',pt:'Domingo',nl:'Zondag',sv:'Söndag',da:'Søndag',no:'Søndag',fi:'Sunnuntaista'},
    setWeekends:  {en:'Weekends in the chart',de:'Wochenenden im Diagramm',fr:'Week-ends dans le graphique',it:'Weekend nel grafico',es:'Fines de semana en la gráfica',pt:'Fins de semana no gráfico',nl:'Weekenden in de grafiek',sv:'Helger i diagrammet',da:'Weekender i diagrammet',no:'Helger i diagrammet',fi:'Viikonloput kaaviossa'},
    loading: {en:'Opening the wall…',de:'Der Kalender wird geöffnet…',fr:'Ouverture du calendrier…',it:'Apertura del calendario…',es:'Abriendo el calendario…',pt:'Abrindo o mural…',nl:'De dagopening wordt geopend…',sv:'Öppnar kalendern…',da:'Åbner væggen…',no:'Åpner veggen…',fi:'Avataan seinää…'},
  },

  /* ------------------------------------------------------------------
     DATE_L10N — the spoken/written date, per locale.
     template composes {weekday} (Intl), {dateword} (hand-authored below)
     and {month} (Intl, from a day+month formatter so inflecting locales
     — fi partitive "heinäkuuta" — come out right).
     dateWords are HAND-AUTHORED literals (the sv-themes doctrine): TTS
     must never read a raw digit date ("July 15" → "fifteen").
     ordinal locales: en de sv da no fi · cardinal: fr es pt it nl
     (fr/es/pt/it speak the FIRST of the month as an ordinal — index 0).
     Native agents verify/rewrite their block in the fan-out; sv/da/no/fi
     ship [NSR-FLAG].
     ------------------------------------------------------------------ */
  DATE_L10N: {
    en: { weekStart:'sun', intl:'en-US', template:'{weekday}, {month} {dateword}',
      dateWords:['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth','twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth','twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first'] },
    de: { weekStart:'mon', intl:'de-DE', template:'{weekday}, der {dateword} {month}',
      dateWords:['erste','zweite','dritte','vierte','fünfte','sechste','siebte','achte','neunte','zehnte','elfte','zwölfte','dreizehnte','vierzehnte','fünfzehnte','sechzehnte','siebzehnte','achtzehnte','neunzehnte','zwanzigste','einundzwanzigste','zweiundzwanzigste','dreiundzwanzigste','vierundzwanzigste','fünfundzwanzigste','sechsundzwanzigste','siebenundzwanzigste','achtundzwanzigste','neunundzwanzigste','dreißigste','einunddreißigste'] },
    fr: { weekStart:'mon', intl:'fr-FR', template:'{weekday} {dateword} {month}',
      dateWords:['premier','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf','vingt','vingt et un','vingt-deux','vingt-trois','vingt-quatre','vingt-cinq','vingt-six','vingt-sept','vingt-huit','vingt-neuf','trente','trente et un'] },
    es: { weekStart:'sun', intl:'es-MX', template:'{weekday} {dateword} de {month}',
      dateWords:['primero','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve','treinta','treinta y uno'] },
    pt: { weekStart:'sun', intl:'pt-BR', four:['sun','cloud','rain','wind'], template:'{weekday}, {dateword} de {month}',
      dateWords:['primeiro','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove','vinte','vinte e um','vinte e dois','vinte e três','vinte e quatro','vinte e cinco','vinte e seis','vinte e sete','vinte e oito','vinte e nove','trinta','trinta e um'] },
    it: { weekStart:'mon', intl:'it-IT', template:'{weekday} {dateword} {month}',
      dateWords:['primo','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove','venti','ventuno','ventidue','ventitré','ventiquattro','venticinque','ventisei','ventisette','ventotto','ventinove','trenta','trentuno'] },
    nl: { weekStart:'mon', intl:'nl-NL', template:'{weekday} {dateword} {month}',
      dateWords:['één','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien','twintig','eenentwintig','tweeëntwintig','drieëntwintig','vierentwintig','vijfentwintig','zesentwintig','zevenentwintig','achtentwintig','negenentwintig','dertig','eenendertig'] },
    sv: { weekStart:'mon', intl:'sv-SE', template:'{weekday} den {dateword} {month}',
      dateWords:['första','andra','tredje','fjärde','femte','sjätte','sjunde','åttonde','nionde','tionde','elfte','tolfte','trettonde','fjortonde','femtonde','sextonde','sjuttonde','artonde','nittonde','tjugonde','tjugoförsta','tjugoandra','tjugotredje','tjugofjärde','tjugofemte','tjugosjätte','tjugosjunde','tjugoåttonde','tjugonionde','trettionde','trettioförsta'] },
    da: { weekStart:'mon', intl:'da-DK', template:'{weekday} den {dateword} {month}',
      dateWords:['første','anden','tredje','fjerde','femte','sjette','syvende','ottende','niende','tiende','ellevte','tolvte','trettende','fjortende','femtende','sekstende','syttende','attende','nittende','tyvende','enogtyvende','toogtyvende','treogtyvende','fireogtyvende','femogtyvende','seksogtyvende','syvogtyvende','otteogtyvende','niogtyvende','tredivte','enogtredivte'] },
    no: { weekStart:'mon', intl:'nb-NO', template:'{weekday} den {dateword} {month}',
      dateWords:['første','andre','tredje','fjerde','femte','sjette','sjuende','åttende','niende','tiende','ellevte','tolvte','trettende','fjortende','femtende','sekstende','syttende','attende','nittende','tjuende','tjueførste','tjueandre','tjuetredje','tjuefjerde','tjuefemte','tjuesjette','tjuesjuende','tjueåttende','tjueniende','trettiende','trettiførste'] },
    fi: { weekStart:'mon', intl:'fi-FI', template:'{weekday}, {dateword} {month}',
      dateWords:['ensimmäinen','toinen','kolmas','neljäs','viides','kuudes','seitsemäs','kahdeksas','yhdeksäs','kymmenes','yhdestoista','kahdestoista','kolmastoista','neljästoista','viidestoista','kuudestoista','seitsemästoista','kahdeksastoista','yhdeksästoista','kahdeskymmenes','kahdeskymmenesyhdes','kahdeskymmeneskahdes','kahdeskymmeneskolmas','kahdeskymmenesneljäs','kahdeskymmenesviides','kahdeskymmeneskuudes','kahdeskymmenesseitsemäs','kahdeskymmeneskahdeksas','kahdeskymmenesyhdeksäs','kolmaskymmenes','kolmaskymmenesyhdes'] }
  },

  /* 6 weather types — inline SVG so 16px pictograph stamps stay crisp */
  WEATHER: [
    { id:'sun',   labelKey:'wSun',
      svg:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="10" fill="#F2A93B"/><g stroke="#F2A93B" stroke-width="3.4" stroke-linecap="round"><line x1="24" y1="3" x2="24" y2="9"/><line x1="24" y1="39" x2="24" y2="45"/><line x1="3" y1="24" x2="9" y2="24"/><line x1="39" y1="24" x2="45" y2="24"/><line x1="9.2" y1="9.2" x2="13.4" y2="13.4"/><line x1="34.6" y1="34.6" x2="38.8" y2="38.8"/><line x1="9.2" y1="38.8" x2="13.4" y2="34.6"/><line x1="34.6" y1="13.4" x2="38.8" y2="9.2"/></g></svg>' },
    { id:'cloud', labelKey:'wCloud',
      svg:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 34a8 8 0 1 1 1.4-15.9A11 11 0 0 1 35.5 20 8.5 8.5 0 0 1 35 34z" fill="#9FB6B0"/></svg>' },
    { id:'rain',  labelKey:'wRain',
      svg:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 27a8 8 0 1 1 1.4-15.9A11 11 0 0 1 35.5 13 8.5 8.5 0 0 1 35 27z" fill="#9FB6B0"/><g stroke="#4A90B8" stroke-width="3.2" stroke-linecap="round"><line x1="16" y1="33" x2="14" y2="41"/><line x1="25" y1="33" x2="23" y2="41"/><line x1="34" y1="33" x2="32" y2="41"/></g></svg>' },
    { id:'snow',  labelKey:'wSnow',
      svg:'<svg viewBox="0 0 48 48" aria-hidden="true"><g stroke="#7FB4CC" stroke-width="3" stroke-linecap="round"><line x1="24" y1="6" x2="24" y2="42"/><line x1="8.4" y1="15" x2="39.6" y2="33"/><line x1="8.4" y1="33" x2="39.6" y2="15"/><line x1="24" y1="6" x2="20" y2="11"/><line x1="24" y1="6" x2="28" y2="11"/><line x1="24" y1="42" x2="20" y2="37"/><line x1="24" y1="42" x2="28" y2="37"/></g></svg>' },
    { id:'wind',  labelKey:'wWind',
      svg:'<svg viewBox="0 0 48 48" aria-hidden="true"><g stroke="#8AA8A0" stroke-width="3.4" stroke-linecap="round" fill="none"><path d="M6 16h22a5 5 0 1 0-5-5"/><path d="M6 25h32a5 5 0 1 1-5 5"/><path d="M6 34h16a4 4 0 1 1-4 4"/></g></svg>' },
    { id:'storm', labelKey:'wStorm',
      svg:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 25a8 8 0 1 1 1.4-15.9A11 11 0 0 1 35.5 11 8.5 8.5 0 0 1 35 25z" fill="#8AA8A0"/><path d="M26 24l-8 12h6l-3 10 11-14h-6l4-8z" fill="#F2A93B"/></svg>' }
  ],

  /* seasonal corner motifs for the today card (N-hemisphere mapping;
     pt flips by +6 months — the pt native rules on keeping/dropping) */
  MOTIFS: {
    winter:'<svg viewBox="0 0 24 24" aria-hidden="true"><g stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"><line x1="12" y1="3" x2="12" y2="21"/><line x1="4.2" y1="7.5" x2="19.8" y2="16.5"/><line x1="4.2" y1="16.5" x2="19.8" y2="7.5"/></g></svg>',
    spring:'<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="#fff" opacity=".85"><circle cx="12" cy="7" r="3.2"/><circle cx="7" cy="12" r="3.2"/><circle cx="17" cy="12" r="3.2"/><circle cx="9" cy="17" r="3.2"/><circle cx="15" cy="17" r="3.2"/><circle cx="12" cy="12.4" r="2.4" fill="#F2A93B"/></g></svg>',
    summer:'<svg viewBox="0 0 24 24" aria-hidden="true"><g opacity=".85"><circle cx="12" cy="12" r="4.6" fill="#fff"/><g stroke="#fff" stroke-width="1.8" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="7" y2="17"/><line x1="17" y1="7" x2="19.1" y2="4.9"/></g></g></svg>',
    autumn:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C7 7 5 12 5 16a7 7 0 0 0 14 0c0-4-2-9-7-14z" fill="#fff" opacity=".85"/><line x1="12" y1="9" x2="12" y2="21" stroke="#F2A93B" stroke-width="1.6"/></svg>'
  },

  defaults: {
    weatherSet: '6', counterViews: 'all', speakDate: true,
    weekStart: 'auto', weekendsChart: false
  },

  settings: [
    { key:'weatherSet', type:'choice', labelKey:'setWeather', options:[
        { value:'6', labelKey:'setWeather6' },
        { value:'4', labelKey:'setWeather4' }
    ]},
    { key:'counterViews', type:'choice', labelKey:'setCounter', options:[
        { value:'all', labelKey:'setCounterAll' },
        { value:'two', labelKey:'setCounterTwo' },
        { value:'num', labelKey:'setCounterNum' }
    ]},
    { key:'speakDate', type:'toggle', labelKey:'setSpeak' },
    { key:'weekStart', type:'choice', labelKey:'setWeek', options:[
        { value:'auto', labelKey:'setWeekAuto' },
        { value:'mon',  labelKey:'setWeekMon'  },
        { value:'sun',  labelKey:'setWeekSun'  }
    ]},
    { key:'weekendsChart', type:'toggle', labelKey:'setWeekends' }
  ],

  STORE_KEY: 'lcs:calendar-wall:v1',
  ENT_TRUST_DAYS: 14,

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    this.premium = false;
    this._widx = 0;
    this._viewMonth = null;        /* 'YYYY-MM' being viewed (calendar+weather share) */
    this._pendingConfirm = null;
    this._stepperOpen = false;
    this._pickerOpen = false;
    this._backfillTarget = null;

    this._store = this._loadStore();
    if (!this._store.v) {
      this._store = { v: 1, activeWallId: null, ent: null, walls: {} };
    }
    if (!this._store.walls || !Object.keys(this._store.walls).length) {
      var id = 'w_' + Math.random().toString(36).slice(2, 8);
      this._store.walls = {};
      /* name stays null until renamed — a STORED default would freeze in
         whatever locale created it ("Meine Klasse" on a fi page) */
      this._store.walls[id] = this._newWall(null);
      this._store.activeWallId = id;
    }
    /* saved settings ride the store (the shell drawer mutates api.settings) */
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    /* deep links */
    var params = new URLSearchParams(location.search);
    var cls = params.get('class');
    if (cls && this._store.walls[cls]) this._store.activeWallId = cls;
    var w = params.get('widget');
    var idx = ['calendar', 'counter', 'weather'].indexOf(w);
    if (idx >= 0) this._widx = idx;

    this._todayKey = this._keyFor(new Date());
    this._viewMonth = this._todayKey.slice(0, 7);

    this._fetchEntitlement();
    this._bindDayRoll();
  },

  _newWall: function (name) {
    return { name: name, createdAt: this._keyFor(new Date()), dayCount: 0,
      lastCountDate: null, lastFlipDate: null, countLog: [],
      weather: {}, pattern: 'ab', lastSummary: null };
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var s = this._store;
    s.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      s.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  wall: function () { return this._store.walls[this._store.activeWallId]; },

  /* -------- local date keys: NEVER toISOString (UTC midnight bug) --- */
  _pad: function (n) { return (n < 10 ? '0' : '') + n; },
  _keyFor: function (d) { return d.getFullYear() + '-' + this._pad(d.getMonth() + 1) + '-' + this._pad(d.getDate()); },
  _dateFromKey: function (key) {
    var p = key.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);   /* local, DST-safe */
  },
  _shiftDays: function (d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); },

  _bindDayRoll: function () {
    var self = this;
    var check = function () {
      var now = self._keyFor(new Date());
      if (now !== self._todayKey) {
        self._todayKey = now;
        self._viewMonth = now.slice(0, 7);
        self.render();
      }
    };
    document.addEventListener('visibilitychange', check);
    window.addEventListener('focus', check);
    setInterval(check, 60000);
  },

  /* -------- entitlement: house pattern + 14-day cached trust -------- */
  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (new Date() - self._dateFromKey(cached.checkedAt)) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) self.render(); }
      }
    };
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) { return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { trustCache(); return; }   /* auth failure without verdict → cache */
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        var prem = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self.premium = prem;
        self._store.ent = { tier: prem ? 'full' : 'free', checkedAt: self._keyFor(new Date()) };
        self._saveStore();
        if (self._wrap) self.render();
      })
      .catch(function () { trustCache(); }); /* NETWORK error ≠ free */
  },

  /* ============================ helpers ============================ */

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  L: function () { return this.DATE_L10N[this.api.lang] || this.DATE_L10N.en; },
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  _weekStart: function () {
    var s = this.api.settings.weekStart;
    if (s === 'mon' || s === 'sun') return s;
    /* Automatic: Intl weekInfo when available, else the authored table */
    try {
      var lo = new Intl.Locale(this.L().intl);
      var wi = lo.getWeekInfo ? lo.getWeekInfo() : lo.weekInfo;
      if (wi && wi.firstDay) return wi.firstDay === 7 ? 'sun' : 'mon';
    } catch (_) {}
    return this.L().weekStart;
  },

  _weekdayName: function (d, style) {
    return new Intl.DateTimeFormat(this.L().intl, { weekday: style || 'long' }).format(d);
  },
  _monthWord: function (d) {
    /* from a day+month formatter so fi comes out partitive (heinäkuuta) */
    var parts = new Intl.DateTimeFormat(this.L().intl, { day: 'numeric', month: 'long' }).formatToParts(d);
    for (var i = 0; i < parts.length; i++) if (parts[i].type === 'month') return parts[i].value;
    return '';
  },
  _monthTitle: function (ym) {
    var d = new Date(+ym.slice(0, 4), +ym.slice(5, 7) - 1, 1);
    var s = new Intl.DateTimeFormat(this.L().intl, { month: 'long', year: 'numeric' }).format(d);
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  /* standalone=true → capitalize the SENTENCE start (the big date line);
     embedded in a strip ("Today is {d}.") the weekday keeps its raw Intl
     casing — lowercase mid-sentence in fr/es/it/pt/nl/sv/da/no/fi,
     capitalized in en/de (5 native agents flagged the forced capital) */
  _dateSentence: function (d, standalone) {
    var L = this.L();
    var s = L.template
      .replace('{weekday}', this._weekdayName(d, 'long'))
      .replace('{dateword}', L.dateWords[d.getDate() - 1] || String(d.getDate()))
      .replace('{month}', this._monthWord(d));
    if (standalone) s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
  },

  _speakDate: function () {
    if (!this.api.settings.speakDate) return;
    var text = this._dateSentence(new Date(), true);
    LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.9 });
    this.api.announce(text);
    var line = this._wrap && this._wrap.querySelector('.cwl-dateline');
    if (line) { line.classList.remove('cwl-pulseline'); void line.offsetWidth; line.classList.add('cwl-pulseline'); }
  },

  _motifFor: function (d) {
    var m = d.getMonth();                              /* 0-11 */
    if (this.api.lang === 'pt') m = (m + 6) % 12;      /* hemisphere flip */
    if (m === 11 || m <= 1) return this.MOTIFS.winter;
    if (m <= 4) return this.MOTIFS.spring;
    if (m <= 7) return this.MOTIFS.summer;
    return this.MOTIFS.autumn;
  },

  _weatherSet: function () {
    var six = this.api.settings.weatherSet !== '4';
    if (six) return this.WEATHER;
    /* pre-K four-set: per-locale override (pt swaps useless snow for wind) */
    var four = this.L().four;
    if (four) { var self = this; return four.map(function (id) { return self._weatherById(id); }).filter(Boolean); }
    return this.WEATHER.slice(0, 4);
  },
  _weatherById: function (id) {
    for (var i = 0; i < this.WEATHER.length; i++) if (this.WEATHER[i].id === id) return this.WEATHER[i];
    return null;
  },

  WIDGET_IDS: ['calendar', 'counter', 'weather'],

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('cwl-wide');

    var wrap = api.el('div', 'cwl-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    /* ---- wall chip (header row) ---- */
    var head = api.el('div', 'cwl-headrow');
    var wallChip = api.el('button', 'cwl-wallchip');
    wallChip.type = 'button';
    wallChip.textContent = this.wall().name || api.t('wallDefault');
    wallChip.setAttribute('aria-label', api.t('wallsTitle'));
    wallChip.addEventListener('click', function () { self._openPanel(); });
    head.appendChild(wallChip);
    wrap.appendChild(head);

    /* ---- the persistent date line ---- */
    var line = api.el('button', 'cwl-dateline');
    line.type = 'button';
    line.setAttribute('aria-label', api.t('speakDateAria'));
    line.innerHTML = this._datelineHTML();
    line.addEventListener('click', function () { self._speakDate(); });
    wrap.appendChild(line);

    /* ---- active widget ---- */
    var section = api.el('div', 'cwl-widget');
    wrap.appendChild(section);
    this._section = section;
    this._renderWidget(section);

    /* ---- dock ---- */
    var dock = api.el('div', 'cwl-dock');
    var prev = this._navBtn('prev');
    dock.appendChild(prev);
    var labels = ['dockCalendar', 'dockCounter', 'dockWeather'];
    var icons = [
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>',
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="4" x2="6" y2="20"/><line x1="10" y1="4" x2="10" y2="20"/><line x1="14" y1="4" x2="14" y2="20"/><path d="M4 9h12"/><line x1="19" y1="4" x2="19" y2="20"/></svg>',
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="10" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="4" y1="10" x2="2" y2="10"/><line x1="22" y1="10" x2="20" y2="10"/><path d="M6 20h12"/></svg>'
    ];
    for (var i = 0; i < this.WIDGET_IDS.length; i++) {
      (function (i) {
        var chip = api.el('button', 'cwl-dockchip' + (i === self._widx ? ' active' : ''));
        chip.type = 'button';
        chip.innerHTML = '<span class="cwl-dockicon">' + icons[i] + '</span><span class="cwl-docklabel">' + api.t(labels[i]) + '</span>';
        chip.setAttribute('aria-label', api.t(labels[i]));
        chip.addEventListener('click', function () { self._goWidget(i); });
        dock.appendChild(chip);
      }(i));
    }
    var next = this._navBtn('next');
    dock.appendChild(next);
    wrap.appendChild(dock);

    /* keyboard + swipe */
    if (!this._keysBound) {
      this._keysBound = true;
      document.addEventListener('keydown', function (e) {
        if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
        if (self._panelEl && self._panelEl.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') self._goWidget(self._widx - 1);
        else if (e.key === 'ArrowRight') self._goWidget(self._widx + 1);
      });
    }
    this._bindSwipe(section);
    this._saveStore();
  },

  _datelineHTML: function () {
    var d = new Date();
    var s = this._dateSentence(d, true);
    /* weekday + month tinted coral (the "changing parts"); match
       case-insensitively — the sentence-start capital may differ from
       the raw Intl form (fr "jeudi" → "Jeudi …") */
    var wd = this._weekdayName(d, 'long');
    var mo = this._monthWord(d);
    var esc = function (x) { return x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
    var html = s.replace(new RegExp(esc(wd), 'i'), function (m) { return '<span class="cwl-hot">' + m + '</span>'; })
                .replace(new RegExp(esc(mo), 'i'), function (m) { return '<span class="cwl-hot">' + m + '</span>'; });
    /* speaker glyph INSIDE the text span — it wraps inline after the last
       word instead of orphaning onto its own centered line */
    return '<span class="cwl-datetext">' + html +
      ' <svg class="cwl-spk" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg></span>';
  },

  _navBtn: function (dir) {
    var api = this.api, self = this;
    var b = api.el('button', 'cwl-nav');
    b.type = 'button';
    b.setAttribute('aria-label', api.t(dir === 'prev' ? 'prevWidget' : 'nextWidget'));
    b.innerHTML = dir === 'prev'
      ? '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>'
      : '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
    b.addEventListener('click', function () { self._goWidget(self._widx + (dir === 'prev' ? -1 : 1)); });
    return b;
  },

  _goWidget: function (i) {
    var n = this.WIDGET_IDS.length;
    this._widx = ((i % n) + n) % n;
    this._pickerOpen = false;
    this._stepperOpen = false;
    this.render();
    var labels = ['dockCalendar', 'dockCounter', 'dockWeather'];
    this.api.announce(this.api.t(labels[this._widx]));
    this.api.track('widget', { id: this.WIDGET_IDS[this._widx] });
  },

  _bindSwipe: function (el) {
    var self = this, sx = null, sy = null;
    el.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button, input')) { sx = null; return; }
      sx = e.clientX; sy = e.clientY;
    });
    el.addEventListener('pointerup', function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      sx = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2) {
        self._goWidget(self._widx + (dx < 0 ? 1 : -1));
      }
    });
  },

  _renderWidget: function (section) {
    section.innerHTML = '';
    var id = this.WIDGET_IDS[this._widx];
    if (id === 'calendar') this._renderCalendar(section);
    else if (id === 'counter') this._renderCounter(section);
    else this._renderWeather(section);
  },

  paint: function () { this._saveStore(); },

  /* shell reset = VIEW reset only, never data */
  reset: function () {
    this._widx = 0;
    this._viewMonth = this._todayKey.slice(0, 7);
    this._pickerOpen = false;
    this._stepperOpen = false;
    this._pendingConfirm = null;
    if (this._panelEl) { this._panelEl.classList.remove('open'); this._scrimEl.classList.remove('open'); }
    this.render();
  },

  onSettings: function () { this._saveStore(); },

  /* ================== widget 1 — month grid ======================== */

  _renderCalendar: function (section) {
    var api = this.api, self = this;
    var wall = this.wall();
    var today = new Date();
    var ym = this._viewMonth;
    var isCurrent = ym === this._todayKey.slice(0, 7);

    /* sentence strips (current month only) */
    if (isCurrent) {
      var strips = api.el('div', 'cwl-strips');
      var yd = this._shiftDays(today, -1), tm = this._shiftDays(today, 1);
      var mk = function (key, args, hot) {
        var s = api.el('div', 'cwl-strip' + (hot ? ' hot' : ''));
        s.textContent = self.fmt(key, args);
        return s;
      };
      strips.appendChild(mk('stripYesterday', { w: this._weekdayName(yd) }));
      strips.appendChild(mk('stripToday', { d: this._dateSentence(today) }, true));
      strips.appendChild(mk('stripTomorrow', { w: this._weekdayName(tm) }));
      section.appendChild(strips);
    }

    /* month header */
    var headRow = api.el('div', 'cwl-monthrow');
    var back = api.el('button', 'cwl-monav');
    back.type = 'button';
    back.textContent = '‹';
    back.setAttribute('aria-label', api.t('prevMonth'));
    back.addEventListener('click', function () { self._moveMonth(-1); });
    var title = api.el('span', 'cwl-monthtitle');
    title.textContent = this._monthTitle(ym);
    var fwd = api.el('button', 'cwl-monav');
    fwd.type = 'button';
    fwd.textContent = '›';
    fwd.setAttribute('aria-label', api.t('nextMonth'));
    fwd.disabled = isCurrent;
    fwd.addEventListener('click', function () { self._moveMonth(1); });
    headRow.append(back, title, fwd);
    if (!isCurrent) {
      var tb = api.el('button', 'cwl-todaybtn');
      tb.type = 'button';
      tb.textContent = api.t('todayBtn');
      tb.addEventListener('click', function () { self._viewMonth = self._todayKey.slice(0, 7); self.render(); });
      headRow.appendChild(tb);
    }
    section.appendChild(headRow);

    /* grid */
    var mat = api.el('div', 'cwl-mat');
    var y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1;
    var first = new Date(y, m, 1);
    var daysIn = new Date(y, m + 1, 0).getDate();
    var startSun = this._weekStart() === 'sun';
    var offset = (first.getDay() - (startSun ? 0 : 1) + 7) % 7;

    /* weekday header (order per weekStart) */
    var wdRow = api.el('div', 'cwl-wdrow');
    var narrow = window.innerWidth < 768;
    var style = window.innerWidth >= 1024 ? 'long' : (narrow ? 'narrow' : 'short');
    for (var wdi = 0; wdi < 7; wdi++) {
      var refDay = new Date(2026, 5, startSun ? 7 + wdi : 8 + wdi); /* a known Sun/Mon anchor week */
      var cellH = api.el('span', 'cwl-wd');
      cellH.textContent = this._weekdayName(refDay, style);
      wdRow.appendChild(cellH);
    }
    mat.appendChild(wdRow);

    var grid = api.el('div', 'cwl-grid');
    for (var pad = 0; pad < offset; pad++) grid.appendChild(api.el('span', 'cwl-cell empty'));
    var flippedToday = wall.lastFlipDate === this._todayKey;
    var patternLen = wall.pattern === 'abc' ? 3 : (wall.pattern === 'abb' ? 3 : 2);
    for (var d = 1; d <= daysIn; d++) {
      (function (d) {
        var date = new Date(y, m, d);
        var key = self._keyFor(date);
        var dow = date.getDay();
        var weekend = dow === 0 || dow === 6;
        var isToday = key === self._todayKey;
        var past = key < self._todayKey;
        var cls = 'cwl-cell';
        var pi = wall.pattern === 'abb' ? (d % 3 === 1 ? 0 : 1) : ((d - 1) % patternLen);
        if (weekend && !isToday) cls += ' off';
        else if (isToday) cls += flippedToday ? ' today' : ' today facedown';
        else if (past) cls += ' stamped';
        else cls += ' back p' + pi;
        var cell = api.el(isToday ? 'button' : 'span', cls);
        if (isToday) {
          cell.type = 'button';
          cell.setAttribute('aria-label', flippedToday ? api.t('speakDateAria') : api.t('flipAria'));
          cell.addEventListener('click', function () { self._flipToday(cell); });
        }
        if (!(cls.indexOf(' back') >= 0)) {
          var num = api.el('span', 'cwl-cellnum');
          num.textContent = String(d);
          cell.appendChild(num);
        }
        if (isToday) {
          var motif = api.el('span', 'cwl-motif');
          motif.innerHTML = self._motifFor(date);
          cell.appendChild(motif);
        }
        grid.appendChild(cell);
      }(d));
    }
    mat.appendChild(grid);
    section.appendChild(mat);
  },

  _moveMonth: function (n) {
    var y = +this._viewMonth.slice(0, 4), m = +this._viewMonth.slice(5, 7) - 1 + n;
    var d = new Date(y, m, 1);
    var key = d.getFullYear() + '-' + this._pad(d.getMonth() + 1);
    if (key > this._todayKey.slice(0, 7)) return;
    this._viewMonth = key;
    this.render();
  },

  _flipToday: function (cell) {
    var api = this.api, self = this;
    var wall = this.wall();
    if (wall.lastFlipDate === this._todayKey) { this._speakDate(); return; }
    wall.lastFlipDate = this._todayKey;
    this._saveStore();
    api.sound(523);
    if (this._reducedMotion()) {
      cell.classList.remove('facedown');
      setTimeout(function () { self._speakDate(); }, 150);
      return;
    }
    cell.classList.add('flipping');
    setTimeout(function () { cell.classList.remove('facedown'); }, 300);
    setTimeout(function () {
      cell.classList.remove('flipping');
      cell.classList.add('flipped');
      api.sound(659);
      self._speakDate();
      /* the strips + numeral render on the flipped card */
      var num = cell.querySelector('.cwl-cellnum');
      if (!num) {
        num = api.el('span', 'cwl-cellnum');
        num.textContent = String(new Date().getDate());
        cell.insertBefore(num, cell.firstChild);
      }
    }, 560);
    api.track('flip', {});
  },

  /* ================== widget 2 — days in school ==================== */

  /* free tier reads only today's slice: the count renders only when it
     was set TODAY (read-gate, not deletion — premium data stays put) */
  _effectiveCount: function () {
    var wall = this.wall();
    if (this.premium) return wall.dayCount;
    return wall.lastCountDate === this._todayKey ? wall.dayCount : 0;
  },

  _renderCounter: function (section) {
    var api = this.api, self = this;
    var wall = this.wall();
    var count = this._effectiveCount();
    var countedToday = wall.lastCountDate === this._todayKey;
    var views = api.settings.counterViews;

    var box = api.el('div', 'cwl-counter');

    /* free next-morning gate line */
    if (!this.premium && !countedToday && wall.dayCount > 0) {
      box.appendChild(this._gateLine('freeCounterGate'));
    }

    /* the "=" asserts a TRUE equality: bundles = numeral. The ones
       ten-frame is a labeled COMPANION ("how many more to the next
       ten"), never part of the equation — "37 = 7" was a math defect
       the visual critic caught. */
    var row = api.el('div', 'cwl-repr-row');
    if (views === 'all') {
      row.appendChild(this._jarsPanel(count));
      row.appendChild(this._eqGlyph());
    }
    row.appendChild(this._numeralPanel(count));
    if (views === 'all' || views === 'two') {
      var comp = api.el('div', 'cwl-companion');
      comp.appendChild(this._framePanel(count));
      row.appendChild(comp);
    }
    box.appendChild(row);

    var label = api.el('div', 'cwl-dayslabel');
    label.textContent = api.t('daysLabel');
    box.appendChild(label);

    /* advance / counted / undo */
    var ctr = api.el('div', 'cwl-advance');
    if (countedToday) {
      var done = api.el('span', 'cwl-counted');
      done.textContent = api.t('countedToday');
      ctr.appendChild(done);
      var undo = api.el('button', 'cwl-undochip');
      undo.type = 'button';
      undo.textContent = api.t('undo');
      undo.addEventListener('click', function () { self._undoDay(); });
      ctr.appendChild(undo);
    } else {
      var plus = api.el('button', 'cwl-plusone');
      plus.type = 'button';
      plus.textContent = api.t('plusOne');
      plus.addEventListener('click', function () { self._advanceDay(); });
      ctr.appendChild(plus);
    }
    /* quiet teacher stepper */
    var pencil = api.el('button', 'cwl-pencil');
    pencil.type = 'button';
    pencil.setAttribute('aria-label', api.t('editCount'));
    pencil.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4L8 20l-5 1 1-5L17 3z"/></svg>';
    pencil.addEventListener('click', function () { self._stepperOpen = !self._stepperOpen; self.render(); });
    ctr.appendChild(pencil);
    box.appendChild(ctr);

    if (this._stepperOpen) {
      var step = api.el('div', 'cwl-stepper');
      var minus = api.el('button', 'cwl-stepbtn'); minus.type = 'button'; minus.textContent = '−';
      var input = document.createElement('input');
      input.className = 'cwl-stepinput';
      input.type = 'number'; input.min = '0'; input.max = '200';
      input.value = String(wall.dayCount);
      var plusB = api.el('button', 'cwl-stepbtn'); plusB.type = 'button'; plusB.textContent = '+';
      var apply = function (n) {
        n = Math.max(0, Math.min(200, n | 0));
        wall.countLog.push({ d: self._todayKey, from: wall.dayCount, to: n });
        if (wall.countLog.length > 10) wall.countLog.shift();
        wall.dayCount = n;
        wall.lastCountDate = self._todayKey;   /* a set count counts as today's entry */
        self._saveStore();
        self.render();
      };
      minus.addEventListener('click', function () { apply(wall.dayCount - 1); });
      plusB.addEventListener('click', function () { apply(wall.dayCount + 1); });
      input.addEventListener('change', function () { apply(+input.value); });
      step.append(minus, input, plusB);
      box.appendChild(step);
    }

    /* proud footnote after a new-year ritual */
    if (wall.lastSummary && wall.dayCount < 5) {
      var note = api.el('div', 'cwl-lastyear');
      note.textContent = this.fmt('lastYear', { n: wall.lastSummary.days });
      box.appendChild(note);
    }

    section.appendChild(box);
    this._maybeBunting(box, count);
  },

  _eqGlyph: function () {
    var e = this.api.el('span', 'cwl-eq');
    e.textContent = '=';
    e.setAttribute('aria-hidden', 'true');
    return e;
  },

  _strawSvg: function () {
    return '<svg viewBox="0 0 10 46" class="cwl-straw" aria-hidden="true"><rect x="2.4" y="1" width="5.2" height="44" rx="2.6" fill="#F2784B"/><rect x="3.4" y="2" width="1.6" height="42" rx="0.8" fill="#F8A87F"/></svg>';
  },
  _bundleSvg: function () {
    var s = '<svg viewBox="0 0 44 50" class="cwl-bundle" aria-hidden="true">';
    for (var i = 0; i < 10; i++) s += '<rect x="' + (3 + i * 3.9) + '" y="' + (2 + (i % 3)) + '" width="3" height="44" rx="1.5" fill="#F2784B"/>';
    s += '<rect x="0" y="20" width="44" height="8" rx="4" fill="#146B5E"/></svg>';
    return s;
  },
  _hundredSvg: function () {
    var s = '<svg viewBox="0 0 62 54" class="cwl-hundred" aria-hidden="true">';
    for (var i = 0; i < 10; i++) s += '<rect x="' + (2 + i * 5.9) + '" y="' + (2 + (i % 4)) + '" width="4.6" height="46" rx="2" fill="#F2784B"/>';
    s += '<rect x="0" y="16" width="62" height="7" rx="3.5" fill="#146B5E"/><rect x="0" y="30" width="62" height="7" rx="3.5" fill="#146B5E"/></svg>';
    return s;
  },

  _jarsPanel: function (count) {
    var api = this.api;
    var hundreds = Math.floor(count / 100), tens = Math.floor((count % 100) / 10), ones = count % 10;
    var panel = api.el('div', 'cwl-jars');
    var jars = [
      { key: 'jarHundreds', n: hundreds, svg: this._hundredSvg(), always: count >= 100 },
      { key: 'jarTens', n: tens, svg: this._bundleSvg(), always: true },
      { key: 'jarOnes', n: ones, svg: this._strawSvg(), always: true }
    ];
    for (var j = 0; j < jars.length; j++) {
      var cfg = jars[j];
      if (!cfg.always && cfg.n === 0) continue;
      var col = api.el('div', 'cwl-jarcol');
      var jar = api.el('div', 'cwl-jar' + (cfg.key === 'jarOnes' ? ' ones' : ''));
      jar.setAttribute('data-jar', cfg.key);
      for (var i = 0; i < cfg.n; i++) {
        var it = api.el('span', 'cwl-jaritem');
        it.innerHTML = cfg.svg;
        jar.appendChild(it);
      }
      var lab = api.el('span', 'cwl-jarlabel');
      lab.textContent = api.t(cfg.key);
      col.append(jar, lab);
      panel.appendChild(col);
    }
    return panel;
  },

  _framePanel: function (count) {
    var api = this.api;
    var ones = count % 10;
    var panel = api.el('div', 'cwl-frame-panel');
    var frame = api.el('div', 'cwl-tf');
    for (var i = 0; i < 10; i++) {
      var cell = api.el('span', 'cwl-tfcell' + (i < ones ? ' filled' : ''));
      if (i < ones) cell.innerHTML = '<span class="cwl-dot"></span>';
      frame.appendChild(cell);
    }
    panel.appendChild(frame);
    var lab = api.el('span', 'cwl-jarlabel');
    lab.textContent = api.t('jarOnes');
    panel.appendChild(lab);
    return panel;
  },

  _numeralPanel: function (count) {
    var api = this.api;
    var panel = api.el('div', 'cwl-numpanel');
    var num = api.el('div', 'cwl-numeral');
    var digits = String(count).split('');
    for (var i = 0; i < digits.length; i++) {
      var dEl = api.el('span', 'cwl-digit');
      dEl.textContent = digits[i];
      num.appendChild(dEl);
    }
    panel.appendChild(num);
    return panel;
  },

  _advanceDay: function () {
    var api = this.api, self = this;
    var wall = this.wall();
    if (wall.lastCountDate === this._todayKey) return;  /* structural guard */
    var from = wall.dayCount;
    /* free tier starts each day from the read-gated value */
    if (!this.premium && wall.lastCountDate !== this._todayKey) {
      /* keep whatever they set via the stepper today; else count from stored value anyway —
         the read-gate governs display; advancing continues the stored count so a
         subscriber lapsing doesn't corrupt data */
    }
    wall.dayCount = from + 1;
    wall.lastCountDate = this._todayKey;
    wall.countLog.push({ d: this._todayKey, from: from, to: wall.dayCount });
    if (wall.countLog.length > 10) wall.countLog.shift();
    this._saveStore();
    api.sound(523);
    api.track('advance', { to: wall.dayCount });

    var to = wall.dayCount;
    if (to > 0 && to % 100 === 0) this._rebundleChain('hundred', to);
    else if (to > 0 && to % 10 === 0) this._rebundleChain('ten', to);
    else {
      this.render();
      api.announce(String(to) + ' ' + api.t(to === 1 ? 'daysLabelOne' : 'daysLabel'));
    }
  },

  _undoDay: function () {
    var wall = this.wall();
    if (wall.lastCountDate !== this._todayKey || wall.dayCount <= 0) return;
    wall.dayCount -= 1;
    wall.lastCountDate = null;
    wall.countLog.pop();
    this._saveStore();
    this.api.sound(330);
    this.render();
  },

  /* the rebundle chain — the celebration IS the mathematics */
  _rebundleChain: function (kind, to) {
    var api = this.api, self = this;
    if (this._reducedMotion()) {
      this.render();
      LCSAudio.speak({ type: 'ui', text: api.t(kind === 'hundred' ? 'narrHundred' : 'narrTen'), lang: api.lang, rate: 0.9 });
      api.announce(api.t(kind === 'hundred' ? 'narrHundred' : 'narrTen'));
      return;
    }
    /* render the PRE state (count-1 visuals) then animate to the post state */
    var wall = this.wall();
    var real = wall.dayCount;
    wall.dayCount = real - 1;                 /* momentarily render pre-state */
    var preCount = this.premium ? real - 1 : (wall.lastCountDate === this._todayKey ? real - 1 : 0);
    wall.dayCount = real;

    this.render();
    var section = this._section;
    var onesJar = section.querySelector('.cwl-jar.ones');
    /* fake the pre-state in the ones jar: show 10 straws briefly */
    if (onesJar) {
      onesJar.innerHTML = '';
      for (var i = 0; i < 10; i++) {
        var it = api.el('span', 'cwl-jaritem');
        it.innerHTML = this._strawSvg();
        onesJar.appendChild(it);
      }
      setTimeout(function () { onesJar.classList.add('gather'); api.sound(587); }, 250);
      setTimeout(function () {
        var band = api.el('span', 'cwl-band');
        onesJar.appendChild(band);
        api.sound(659);
      }, 600);
      setTimeout(function () {
        onesJar.classList.add('handoff');
        api.sound(784);
      }, 1000);
      setTimeout(function () {
        self.render();
        var line = api.t(kind === 'hundred' ? 'narrHundred' : 'narrTen');
        LCSAudio.speak({ type: 'ui', text: line, lang: api.lang, rate: 0.9 });
        api.announce(line);
        if (kind === 'hundred') self._maybeBunting(self._section, to, true);
      }, 1500);
    } else {
      this.render();
    }
  },

  _maybeBunting: function (box, count, fresh) {
    if (count !== 100 && !(fresh && count === 100)) {
      if (this.wall().dayCount !== 100 || this.wall().lastCountDate !== this._todayKey) return;
    }
    if (this.wall().dayCount !== 100 || this.wall().lastCountDate !== this._todayKey) return;
    if (this._section.querySelector('.cwl-bunting')) return;
    var flags = '';
    var cols = ['#F2784B', '#146B5E', '#FBF3E4'];
    for (var i = 0; i < 9; i++) {
      flags += '<path class="cwl-flag" style="animation-delay:' + (i * 80) + 'ms" d="M' + (10 + i * 42) + ',12 l16,0 l-8,22 z" fill="' + cols[i % 3] + '" stroke="#146B5E" stroke-width="1"/>';
    }
    var b = this.api.el('div', 'cwl-bunting');
    b.setAttribute('aria-hidden', 'true');
    b.innerHTML = '<svg viewBox="0 0 400 40" preserveAspectRatio="none"><path d="M0,8 Q200,22 400,8" fill="none" stroke="#146B5E" stroke-width="2.5"/>' + flags + '</svg>';
    this._section.insertBefore(b, this._section.firstChild);
    var wash = this.api.el('div', 'cwl-wash');
    wash.setAttribute('aria-hidden', 'true');
    this._section.appendChild(wash);
  },

  /* ================== widget 3 — weather =========================== */

  _renderWeather: function (section) {
    var api = this.api, self = this;
    var wall = this.wall();
    var ym = this._viewMonth;
    var isCurrent = ym === this._todayKey.slice(0, 7);
    var month = wall.weather[ym] || {};
    var todayDD = this._todayKey.slice(8, 10);
    var todayPick = isCurrent ? month[todayDD] : null;
    var set = this._weatherSet();

    /* month header (shared pattern) */
    var headRow = api.el('div', 'cwl-monthrow');
    var back = api.el('button', 'cwl-monav');
    back.type = 'button'; back.textContent = '‹';
    back.setAttribute('aria-label', api.t('prevMonth'));
    back.addEventListener('click', function () { self._moveMonth(-1); });
    var title = api.el('span', 'cwl-monthtitle');
    title.textContent = this._monthTitle(ym);
    var fwd = api.el('button', 'cwl-monav');
    fwd.type = 'button'; fwd.textContent = '›';
    fwd.disabled = isCurrent;
    fwd.setAttribute('aria-label', api.t('nextMonth'));
    fwd.addEventListener('click', function () { self._moveMonth(1); });
    headRow.append(back, title, fwd);
    if (!isCurrent) {
      var tb = api.el('button', 'cwl-todaybtn');
      tb.type = 'button'; tb.textContent = api.t('todayBtn');
      tb.addEventListener('click', function () { self._viewMonth = self._todayKey.slice(0, 7); self.render(); });
      headRow.appendChild(tb);
    }
    section.appendChild(headRow);

    /* today's picker / pill (current month only) */
    if (isCurrent) {
      if (!todayPick || this._pickerOpen || this._backfillTarget) {
        var q = api.el('div', 'cwl-wq');
        q.textContent = api.t('whatWeather');
        section.appendChild(q);
        var picker = api.el('div', 'cwl-picker');
        for (var i = 0; i < set.length; i++) {
          (function (w) {
            var b = api.el('button', 'cwl-wbtn');
            b.type = 'button';
            b.setAttribute('data-w', w.id);
            b.innerHTML = '<span class="cwl-wicon">' + w.svg + '</span><span class="cwl-wlabel">' + api.t(w.labelKey) + '</span>';
            b.addEventListener('click', function () { self._pickWeather(w.id, b); });
            picker.appendChild(b);
          }(set[i]));
        }
        section.appendChild(picker);
      } else {
        var pillRow = api.el('div', 'cwl-pillrow');
        var w = this._weatherById(todayPick);
        var pill = api.el('button', 'cwl-todaypill');
        pill.type = 'button';
        pill.innerHTML = '<span class="cwl-pillicon">' + (w ? w.svg : '') + '</span><span>' + this.fmt('todayPill', { w: w ? api.t(w.labelKey) : todayPick }) + '</span><span class="cwl-pillchange">' + api.t('changeWeather') + '</span>';
        pill.addEventListener('click', function () { self._pickerOpen = true; self.render(); });
        pillRow.appendChild(pill);
        /* yesterday backfill (premium reads history; one-day grace) */
        if (this.premium) {
          var yd = this._shiftDays(new Date(), -1);
          var ydKey = this._keyFor(yd);
          var ydDow = yd.getDay();
          if (ydKey.slice(0, 7) === ym && ydDow !== 0 && ydDow !== 6 && !month[ydKey.slice(8, 10)]) {
            var ghost = api.el('button', 'cwl-ghostchip');
            ghost.type = 'button';
            ghost.textContent = api.t('yesterdayChip');
            ghost.addEventListener('click', function () { self._backfillTarget = ydKey; self._pickerOpen = true; self.render(); });
            pillRow.appendChild(ghost);
          }
        }
        section.appendChild(pillRow);
      }
    }

    /* the pictograph */
    var board = api.el('div', 'cwl-chart');
    var maxN = 1;
    var counts = {};
    for (var s2 = 0; s2 < set.length; s2++) counts[set[s2].id] = 0;
    if (this.premium || !isCurrent) {
      for (var dd in month) if (counts[month[dd]] !== undefined) counts[month[dd]]++;
    } else if (todayPick && counts[todayPick] !== undefined) {
      counts[todayPick] = 1;      /* free: today's mark only */
    }
    for (var c in counts) if (counts[c] > maxN) maxN = counts[c];
    var compact = maxN > 16, small = maxN > 12;

    for (var ci = 0; ci < set.length; ci++) {
      var w2 = set[ci];
      var col = api.el('div', 'cwl-col');
      var stack = api.el('div', 'cwl-stack' + (compact ? ' compact' : small ? ' small' : ''));
      var n = counts[w2.id];
      if (compact && n > 0) {
        var badge = api.el('span', 'cwl-colbadge');
        badge.textContent = String(n);
        stack.appendChild(badge);
      }
      for (var k = 0; k < n; k++) {
        var st = api.el('span', 'cwl-stamp');
        st.innerHTML = w2.svg;
        stack.appendChild(st);
      }
      /* free ghost preview under an accumulating month */
      if (!this.premium && isCurrent && n <= 1) {
        /* UNIFORM ghost count — varying heights read as phantom data */
        for (var g = 0; g < 2; g++) {
          var gh = api.el('span', 'cwl-stamp ghost');
          gh.innerHTML = w2.svg;
          stack.appendChild(gh);
        }
      }
      var base = api.el('div', 'cwl-colbase');
      base.innerHTML = '<span class="cwl-colicon">' + w2.svg + '</span>';
      var cnt = api.el('span', 'cwl-colcount');
      cnt.textContent = String(n);
      col.append(stack, base, cnt);
      board.appendChild(col);
    }
    section.appendChild(board);

    if (!this.premium && isCurrent) {
      section.appendChild(this._gateLine('freeWeatherGate'));
    }

    /* rotating talk prompt */
    var prompts = ['promptMost', 'promptCompare', 'promptTotal', 'promptPredict'];
    var p = api.el('div', 'cwl-prompt');
    p.textContent = api.t(prompts[new Date().getDate() % prompts.length]);
    section.appendChild(p);
  },

  _pickWeather: function (id, btn) {
    var api = this.api, self = this;
    var wall = this.wall();
    var target = this._backfillTarget || this._todayKey;
    var ym = target.slice(0, 7), dd = target.slice(8, 10);
    if (!wall.weather[ym]) wall.weather[ym] = {};
    wall.weather[ym][dd] = id;
    this._backfillTarget = null;
    this._pickerOpen = false;
    this._saveStore();
    api.sound(587);
    var w = this._weatherById(id);
    api.announce(api.t(w.labelKey));
    api.track('weather', { w: id });

    if (this._reducedMotion() || !btn) { this.render(); return; }
    /* fly a stamp clone toward the chart, then re-render */
    var r = btn.getBoundingClientRect();
    var fly = document.createElement('span');
    fly.className = 'cwl-flystamp';
    fly.innerHTML = w.svg;
    fly.style.left = (r.left + r.width / 2 - 16) + 'px';
    fly.style.top = (r.top + r.height / 2 - 16) + 'px';
    document.body.appendChild(fly);
    requestAnimationFrame(function () {
      fly.style.transform = 'translate(0, 140px) scale(0.7)';
      fly.style.opacity = '0';
    });
    setTimeout(function () { fly.remove(); self.render(); }, 420);
  },

  /* ==================== gates + panel =============================== */

  _gateLine: function (key) {
    var api = this.api;
    var g = api.el('div', 'cwl-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-calendar-wall';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    return g;
  },

  _openPanel: function () {
    if (!this._panelEl) this._buildPanel();
    this._renderPanel();
    this._panelEl.classList.add('open');
    this._scrimEl.classList.add('open');
  },
  _closePanel: function () {
    if (this._panelEl) { this._panelEl.classList.remove('open'); this._scrimEl.classList.remove('open'); }
    this._pendingConfirm = null;
  },
  _buildPanel: function () {
    var api = this.api, self = this;
    var scrim = api.el('div', 'cwl-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'cwl-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('wallsTitle'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },

  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    var store = this._store;
    panel.innerHTML = '';

    var head = api.el('div', 'cwl-panel-head');
    var h = api.el('span', 'cwl-panel-title');
    h.textContent = api.t('wallsTitle');
    var x = api.el('button', 'cwl-panel-close');
    x.type = 'button';
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.setAttribute('aria-label', api.t('close'));
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(h, x);
    panel.appendChild(head);

    var body = api.el('div', 'cwl-panel-body');

    /* wall rows */
    Object.keys(store.walls).forEach(function (id) {
      var w = store.walls[id];
      var row = api.el('div', 'cwl-wallrow' + (id === store.activeWallId ? ' active' : ''));
      var pick = api.el('button', 'cwl-wallpick');
      pick.type = 'button';
      pick.textContent = w.name || api.t('wallDefault');
      pick.addEventListener('click', function () {
        store.activeWallId = id;
        self._saveStore();
        self._closePanel();
        self.render();
      });
      var meta = api.el('span', 'cwl-wallmeta');
      meta.textContent = w.dayCount + ' · ' + api.t(w.dayCount === 1 ? 'daysLabelOne' : 'daysLabel');
      var ren = api.el('button', 'cwl-linkbtn');
      ren.type = 'button';
      ren.textContent = api.t('renameWall');
      ren.addEventListener('click', function () {
        var name = prompt(api.t('renameWall'), w.name || api.t('wallDefault'));
        if (name) { w.name = name.slice(0, 40); self._saveStore(); self._renderPanel(); self.render(); }
      });
      row.append(pick, meta, ren);
      body.appendChild(row);
    });

    /* + new wall (premium) */
    var add = api.el('button', 'cwl-newwall');
    add.type = 'button';
    add.textContent = api.t('newWall');
    add.addEventListener('click', function () {
      if (!self.premium) {
        var old = body.querySelector('.cwl-gate');
        if (old) old.remove();
        var up = self._gateLine('newWallGate');
        add.insertAdjacentElement('beforebegin', up);
        return;
      }
      var id = 'w_' + Math.random().toString(36).slice(2, 8);
      store.walls[id] = self._newWall(api.t('wallDefault') + ' ' + (Object.keys(store.walls).length + 1));
      store.activeWallId = id;
      self._saveStore();
      self._renderPanel();
      self.render();
    });
    body.appendChild(add);

    /* pattern selector for the active wall */
    var wall = this.wall();
    var patRow = api.el('div', 'cwl-patrow');
    var patLab = api.el('span', 'cwl-patlabel');
    patLab.textContent = api.t('patternLabel');
    patRow.appendChild(patLab);
    ['ab', 'abb', 'abc'].forEach(function (p) {
      var b = api.el('button', 'cwl-patbtn' + (wall.pattern === p ? ' active' : ''));
      b.type = 'button';
      b.textContent = p.toUpperCase();
      b.addEventListener('click', function () { wall.pattern = p; self._saveStore(); self._renderPanel(); self.render(); });
      patRow.appendChild(b);
    });
    body.appendChild(patRow);

    /* new school year — two-step confirm showing the stakes */
    if (!this._pendingConfirm) {
      var ny = api.el('button', 'cwl-linkbtn danger');
      ny.type = 'button';
      ny.textContent = api.t('newYear');
      ny.addEventListener('click', function () { self._pendingConfirm = 'newYear'; self._renderPanel(); });
      body.appendChild(ny);
    } else {
      var conf = api.el('div', 'cwl-confirm');
      var msg = api.el('p');
      msg.textContent = this.fmt('newYearConfirm', { name: wall.name || api.t('wallDefault'), n: wall.dayCount });
      var go = api.el('button', 'cwl-btn danger');
      go.type = 'button';
      go.textContent = api.t('newYearGo');
      go.addEventListener('click', function () {
        wall.lastSummary = { days: wall.dayCount };
        wall.dayCount = 0;
        wall.lastCountDate = null;
        wall.countLog = [];
        wall.weather = {};
        self._pendingConfirm = null;
        self._saveStore();
        self._closePanel();
        self.render();
      });
      var keep = api.el('button', 'cwl-btn');
      keep.type = 'button';
      keep.textContent = '×';
      keep.setAttribute('aria-label', api.t('cancel'));
      keep.addEventListener('click', function () { self._pendingConfirm = null; self._renderPanel(); });
      conf.append(msg, go, keep);
      body.appendChild(conf);
    }

    /* honest device note */
    var note = api.el('p', 'cwl-devicenote');
    note.textContent = api.t('deviceNote');
    body.appendChild(note);

    panel.appendChild(body);
  }
};

/* per-tool styling: STAGE ONLY, consuming shell tokens; the sanctioned
   page-level touches are body.cwl-wide + the ≤480 stacked header. */
(function injectCSS() {
  var css = ''
  + 'body.cwl-wide .lcs-app{max-width:min(1100px,96vw);}'
  + 'body.cwl-wide .lcs-title{overflow-wrap:break-word;word-break:normal;hyphens:auto;}'
  + '@media (max-width:480px){'
  +   'body.cwl-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  +   'body.cwl-wide .lcs-title{font-size:clamp(18px,6vw,26px);}'
  + '}'
  + '.cwl-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.6vmin,14px);width:100%;}'

  /* head row + wall chip */
  + '.cwl-headrow{display:flex;justify-content:flex-end;width:100%;}'
  + '.cwl-wallchip{font-family:var(--lcs-font-body);font-weight:800;font-size:13.5px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:6px 14px;min-height:36px;'
  +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;}'
  + '.cwl-wallchip:hover{background:var(--lcs-structure-soft);}'

  /* the date line */
  + '.cwl-dateline{display:flex;align-items:center;justify-content:center;gap:12px;'
  +   'width:100%;min-height:calc(2.2em);cursor:pointer;background:transparent;border:none;'
  +   'font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(22px,4.2vmin,52px);color:var(--lcs-ink);line-height:1.15;'
  +   'text-align:center;flex-wrap:wrap;}'
  + '.cwl-hot{color:#C9502A;}'
  + '.cwl-spk{color:var(--lcs-structure);display:inline;vertical-align:middle;margin-left:2px;}'
  + '.cwl-dateline.cwl-pulseline .cwl-datetext{animation:cwlLinePulse .6s var(--lcs-ease);}'
  + '@keyframes cwlLinePulse{0%{opacity:1;}35%{opacity:.55;}100%{opacity:1;}}'

  /* widget + dock */
  + '.cwl-widget{width:100%;min-height:clamp(300px,44vh,540px);display:flex;'
  +   'flex-direction:column;gap:clamp(8px,1.4vmin,14px);position:relative;}'
  + '.cwl-dock{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;'
  +   'padding-top:4px;flex-wrap:wrap;}'
  + '.cwl-dockchip{display:inline-flex;align-items:center;gap:8px;min-height:52px;'
  +   'padding:8px 18px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:15px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);box-shadow:var(--lcs-shadow-sm);'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.cwl-dockchip:active{transform:scale(.97);}'
  + '.cwl-dockchip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.cwl-dockicon{display:grid;place-items:center;}'
  + '.cwl-nav{width:48px;height:48px;flex:0 0 auto;display:grid;place-items:center;border-radius:50%;'
  +   'background:var(--lcs-surface);box-shadow:var(--lcs-shadow-sm);color:var(--lcs-structure);cursor:pointer;}'
  + '.cwl-nav:active{transform:scale(.94);}'
  + '@media (max-width:560px){'
  +   '.cwl-docklabel{display:none;}'
  +   '.cwl-dockchip{min-width:48px;justify-content:center;padding:8px 12px;border-radius:50%;}'
  + '}'

  /* strips */
  + '.cwl-strips{display:flex;flex-direction:column;gap:4px;align-items:center;}'
  + '.cwl-strip{font-family:var(--lcs-font-body);font-weight:700;font-size:clamp(13px,2vmin,17px);'
  +   'color:var(--lcs-ink-soft);background:var(--lcs-surface);border-radius:var(--lcs-radius-pill);'
  +   'padding:4px 16px;box-shadow:var(--lcs-shadow-sm);}'
  + '.cwl-strip.hot{color:var(--lcs-ink);background:#FDE8DE;}'

  /* month header */
  + '.cwl-monthrow{display:flex;align-items:center;justify-content:center;gap:12px;}'
  + '.cwl-monthtitle{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(20px,3.4vmin,38px);color:var(--lcs-structure);}'
  + '.cwl-monav{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;'
  +   'font-size:26px;line-height:1;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;font-family:var(--lcs-font-display);}'
  + '.cwl-monav:disabled{opacity:.35;cursor:default;}'
  + '.cwl-todaybtn{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
  +   'padding:8px 16px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'background:var(--lcs-structure);color:var(--lcs-surface);}'

  /* month grid */
  + '.cwl-mat{background:var(--lcs-structure);border-radius:var(--lcs-radius);'
  +   'padding:clamp(6px,1.2vmin,14px);box-shadow:var(--lcs-shadow);}'
  + '.cwl-wdrow{display:grid;grid-template-columns:repeat(7,1fr);gap:clamp(3px,0.7vmin,8px);'
  +   'margin-bottom:clamp(3px,0.7vmin,8px);}'
  + '.cwl-wd{text-align:center;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(11px,1.7vmin,20px);color:var(--lcs-surface);text-transform:uppercase;'
  +   'letter-spacing:.04em;padding:4px 0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}'
  + '.cwl-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:clamp(3px,0.7vmin,8px);}'
  /* NO aspect-ratio here: aspect-ratio + min-height forces item width
     past the 1fr track (pixel-proven 49px in a 41.7px track at 360 —
     the clipped-7th-column bug); height comes from the clamp, width
     from the grid track */
  + '.cwl-cell{position:relative;height:clamp(38px,min(9.5vmin,10.5vh),104px);'
  +   'border-radius:10px;display:grid;place-items:center;'
  +   'font-family:var(--lcs-font-display);font-weight:700;border:none;}'
  + '.cwl-cellnum{font-size:clamp(15px,2.6vmin,34px);}'
  + '.cwl-cell.empty{background:transparent;}'
  + '.cwl-cell.off{background:#E2F0EC;color:rgba(20,107,94,.62);}'
  + '.cwl-cell.stamped{background:var(--lcs-surface-2);color:var(--lcs-ink-soft);'
  +   'box-shadow:inset 0 2px 4px rgba(20,30,28,.08);}'
  + '.cwl-cell.back{background-color:#FBF6E9;'
  +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 1.5px 0 0 #E6D8AF;'
  +   'background-image:radial-gradient(rgba(20,107,94,.14) 1.3px,transparent 1.3px);'
  +   'background-size:10px 10px;background-position:3px 3px;}'
  + '.cwl-cell.back.p1{background-color:#F5EDDC;background-image:radial-gradient(rgba(242,120,75,.18) 1.3px,transparent 1.3px);}'
  + '.cwl-cell.back.p2{background-color:#F0F4EF;background-image:radial-gradient(rgba(74,144,184,.18) 1.3px,transparent 1.3px);}'
  + '.cwl-cell.today{background:#F2784B;color:#fff;cursor:pointer;z-index:2;'
  +   'border:4px solid #fff;outline:1.5px solid var(--lcs-line);'
  +   'transform:rotate(-2deg) scale(1.12);box-shadow:var(--lcs-shadow);}'
  + '.cwl-cell.today.facedown{background-color:#FBF6E9;'
  +   'background-image:radial-gradient(rgba(242,120,75,.3) 1.6px,transparent 1.6px);'
  +   'background-size:10px 10px;color:transparent;}'
  + '.cwl-cell.today.facedown .cwl-cellnum{visibility:hidden;}'
  + '.cwl-cell.today.facedown .cwl-motif{visibility:hidden;}'
  + '.cwl-cell.today.flipping{animation:cwlFlip .56s var(--lcs-ease);}'
  + '@keyframes cwlFlip{0%{transform:rotate(-2deg) scale(1.12) perspective(900px) rotateY(0deg);}'
  +   '25%{transform:rotate(-2deg) scale(1.18) perspective(900px) rotateY(0deg);}'
  +   '75%{transform:rotate(-2deg) scale(1.18) perspective(900px) rotateY(180deg);}'
  +   '100%{transform:rotate(-2deg) scale(1.12) perspective(900px) rotateY(180deg);}}'
  + '.cwl-cell.today.flipped::after{content:"";position:absolute;inset:-4px;border-radius:12px;'
  +   'animation:cwlRing .9s var(--lcs-ease);}'
  + '@keyframes cwlRing{0%{box-shadow:0 0 0 0 rgba(242,120,75,.4);}100%{box-shadow:0 0 0 16px rgba(242,120,75,0);}}'
  + '.cwl-motif{position:absolute;right:4%;top:4%;width:26%;max-width:30px;aspect-ratio:1;}'
  + '.cwl-motif svg{width:100%;height:100%;}'

  /* counter */
  + '.cwl-counter{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.6vmin,16px);'
  +   'padding:clamp(6px,1.2vmin,14px) 0;}'
  + '.cwl-repr-row{display:flex;align-items:center;justify-content:center;'
  +   'gap:clamp(10px,2vmin,26px);flex-wrap:wrap;width:100%;}'
  + '.cwl-eq{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(30px,5vmin,54px);color:var(--lcs-structure);}'
  + '.cwl-jars{display:flex;gap:clamp(8px,1.4vmin,18px);align-items:flex-end;}'
  + '.cwl-jarcol{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.cwl-jar{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;gap:2px;'
  +   'min-width:74px;max-width:150px;min-height:96px;padding:10px 8px 6px;'
  +   'background:var(--lcs-surface-2);border:2px solid #E2F0EC;'
  +   'border-radius:8px 8px 14px 14px;box-shadow:inset 0 3px 8px rgba(20,30,28,.08);position:relative;}'
  + '.cwl-jaritem{display:inline-flex;transition:transform .26s var(--lcs-ease);}'
  + '.cwl-jaritem .cwl-straw{width:9px;height:44px;}'
  + '.cwl-jaritem .cwl-bundle{width:34px;height:40px;}'
  + '.cwl-jaritem .cwl-hundred{width:48px;height:42px;}'
  + '.cwl-jar.gather .cwl-jaritem{transform:translateX(calc((5 - var(--i,0)) * 2px)) scale(.94);}'
  + '.cwl-jar.gather{filter:brightness(1.03);}'
  + '.cwl-band{position:absolute;left:12%;right:12%;top:46%;height:9px;border-radius:5px;'
  +   'background:var(--lcs-structure);animation:cwlBand .3s cubic-bezier(.34,1.56,.64,1);}'
  + '@keyframes cwlBand{0%{transform:scaleX(1.4);opacity:0;}100%{transform:scaleX(1);opacity:1;}}'
  + '.cwl-jar.handoff .cwl-jaritem,.cwl-jar.handoff .cwl-band{opacity:0;transform:translateY(-30px);'
  +   'transition:all .4s var(--lcs-ease);}'
  + '.cwl-jarlabel{font-family:var(--lcs-font-body);font-weight:800;font-size:clamp(11px,1.6vmin,15px);'
  +   'color:var(--lcs-ink-soft);text-transform:uppercase;letter-spacing:.05em;}'
  /* the ones-frame companion: visually subordinate, outside the equation */
  + '.cwl-companion{display:flex;align-items:center;padding-left:clamp(8px,1.6vmin,20px);'
  +   'margin-left:clamp(4px,1vmin,12px);border-left:2px dashed var(--lcs-line);}'
  + '.cwl-companion .cwl-tf{transform:scale(.82);transform-origin:center;}'
  + '.cwl-frame-panel{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.cwl-tf{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;'
  +   'background:var(--lcs-structure);padding:8px;border-radius:12px;box-shadow:var(--lcs-shadow-sm);}'
  + '.cwl-tfcell{width:clamp(26px,4.4vmin,52px);aspect-ratio:1;background:var(--lcs-surface);'
  +   'border-radius:7px;display:grid;place-items:center;}'
  + '.cwl-dot{width:68%;height:68%;border-radius:50%;background:#F2784B;'
  +   'box-shadow:inset 0 -3px 0 rgba(0,0,0,.12);animation:cwlPop .18s var(--lcs-ease);}'
  + '@keyframes cwlPop{0%{transform:scale(.2);}100%{transform:scale(1);}}'
  + '.cwl-numpanel{display:flex;align-items:center;}'
  + '.cwl-numeral{display:flex;background:var(--lcs-surface);border-radius:var(--lcs-radius);'
  +   'padding:clamp(6px,1.2vmin,16px) clamp(12px,2vmin,26px);box-shadow:var(--lcs-shadow);}'
  + '.cwl-digit{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(58px,11vmin,140px);line-height:1;color:var(--lcs-structure);}'
  + '.cwl-dayslabel{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(15px,2.4vmin,24px);color:var(--lcs-ink-soft);}'
  + '.cwl-advance{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;}'
  + '.cwl-plusone{font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(17px,2.6vmin,24px);padding:14px 30px;border-radius:var(--lcs-radius-pill);'
  +   'cursor:pointer;background:#F2784B;color:#fff;border:none;min-height:56px;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.cwl-plusone:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.cwl-counted{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(15px,2.2vmin,20px);'
  +   'color:var(--lcs-structure);background:var(--lcs-structure-soft);'
  +   'padding:12px 22px;border-radius:var(--lcs-radius-pill);}'
  + '.cwl-undochip,.cwl-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;'
  +   'color:var(--lcs-structure);background:transparent;border:none;cursor:pointer;'
  +   'text-decoration:underline;padding:6px;}'
  + '.cwl-linkbtn.danger{color:#C9502A;}'
  + '.cwl-pencil{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:var(--lcs-surface);box-shadow:var(--lcs-shadow-sm);cursor:pointer;}'
  + '.cwl-stepper{display:flex;align-items:center;gap:8px;}'
  + '.cwl-stepbtn{width:44px;height:44px;border-radius:50%;font-size:24px;cursor:pointer;'
  +   'font-family:var(--lcs-font-display);background:var(--lcs-surface);color:var(--lcs-structure);'
  +   'box-shadow:var(--lcs-shadow-sm);border:1.5px solid var(--lcs-line);}'
  + '.cwl-stepinput{width:86px;text-align:center;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:22px;padding:8px;border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface);color:var(--lcs-ink);}'
  + '.cwl-lastyear{font-family:var(--lcs-font-body);font-weight:700;font-size:14px;color:var(--lcs-ink-soft);}'

  /* bunting + wash (day 100) */
  + '.cwl-bunting{position:absolute;left:0;right:0;top:-6px;height:44px;pointer-events:none;z-index:3;}'
  + '.cwl-bunting svg{width:100%;height:100%;}'
  + '.cwl-flag{transform-origin:top center;animation:cwlFlag .5s var(--lcs-ease) backwards;}'
  + '@keyframes cwlFlag{0%{transform:rotateX(80deg);opacity:0;}100%{transform:rotateX(0);opacity:1;}}'
  + '.cwl-wash{position:absolute;inset:0;pointer-events:none;z-index:0;border-radius:var(--lcs-radius);'
  +   'background:radial-gradient(ellipse at center,rgba(253,232,222,.6) 0%,transparent 70%);'
  +   'animation:cwlWash 1.2s ease-out;}'
  + '@keyframes cwlWash{0%{opacity:0;}100%{opacity:1;}}'

  /* weather */
  + '.cwl-wq{text-align:center;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(16px,2.6vmin,26px);color:var(--lcs-ink);}'
  + '.cwl-picker{display:flex;justify-content:center;gap:clamp(8px,1.4vmin,16px);flex-wrap:wrap;}'
  + '.cwl-wbtn{display:flex;flex-direction:column;align-items:center;gap:6px;'
  +   'width:clamp(56px,9vmin,96px);padding:10px 6px;border-radius:14px;cursor:pointer;'
  +   'background:linear-gradient(180deg,#FFFEFB 0%,#F7EBD3 100%);border:none;'
  +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 3px 0 0 #E6D8AF,0 5px 10px rgba(20,30,28,.10);'
  +   'transition:transform .12s var(--lcs-ease);}'
  + '.cwl-wbtn:hover{transform:translateY(-2px);}'
  + '.cwl-wbtn:active{transform:scale(.96);}'
  + '.cwl-wicon{width:70%;aspect-ratio:1;}'
  + '.cwl-wicon svg{width:100%;height:100%;}'
  + '.cwl-wlabel{font-family:var(--lcs-font-body);font-weight:800;'
  +   'font-size:clamp(11px,1.6vmin,15px);color:var(--lcs-ink);}'
  + '.cwl-pillrow{display:flex;justify-content:center;gap:10px;align-items:center;flex-wrap:wrap;}'
  + '.cwl-todaypill{display:inline-flex;align-items:center;gap:10px;min-height:52px;'
  +   'padding:8px 20px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(15px,2.4vmin,21px);'
  +   'color:var(--lcs-ink);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'box-shadow:var(--lcs-shadow-sm);}'
  + '.cwl-pillicon{width:32px;height:32px;}'
  + '.cwl-pillicon svg{width:100%;height:100%;}'
  + '.cwl-pillchange{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;'
  +   'color:var(--lcs-structure);text-decoration:underline;}'
  + '.cwl-ghostchip{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;'
  +   'color:var(--lcs-ink-soft);background:transparent;border:1.5px dashed var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:8px 16px;cursor:pointer;min-height:44px;}'
  + '.cwl-chart{display:flex;justify-content:center;gap:clamp(6px,1.4vmin,18px);'
  +   'background:var(--lcs-surface);border-radius:var(--lcs-radius);'
  +   'border:1.5px solid var(--lcs-line);padding:clamp(8px,1.6vmin,18px);'
  +   'background-image:repeating-linear-gradient(to top,transparent 0 27px,rgba(20,107,94,.08) 27px 28px);'
  +   'min-height:180px;align-items:flex-end;flex:1;}'
  + '.cwl-col{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:48px;}'
  + '.cwl-stack{display:flex;flex-direction:column-reverse;align-items:center;gap:2px;position:relative;}'
  + '.cwl-stamp{width:28px;height:28px;animation:cwlPop .18s var(--lcs-ease);}'
  + '.cwl-stack.small .cwl-stamp{width:22px;height:22px;}'
  + '.cwl-stack.compact .cwl-stamp{width:18px;height:18px;}'
  + '.cwl-stamp svg{width:100%;height:100%;}'
  + '.cwl-stamp.ghost{opacity:.14;animation:none;}'
  + '.cwl-colbadge{position:absolute;top:-24px;font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:15px;color:#fff;background:#F2784B;border-radius:10px;padding:1px 8px;}'
  + '.cwl-colbase{width:100%;display:grid;place-items:center;border-top:2.5px solid var(--lcs-structure);'
  +   'padding-top:5px;}'
  + '.cwl-colicon{width:26px;height:26px;opacity:.85;}'
  + '.cwl-colicon svg{width:100%;height:100%;}'
  + '.cwl-colcount{font-family:var(--lcs-font-display);font-weight:700;font-size:16px;color:var(--lcs-ink-soft);}'
  + '.cwl-flystamp{position:fixed;z-index:80;width:32px;height:32px;pointer-events:none;'
  +   'transition:transform .4s var(--lcs-ease),opacity .4s;}'
  + '.cwl-flystamp svg{width:100%;height:100%;}'
  + '.cwl-prompt{text-align:center;font-family:var(--lcs-font-body);font-weight:700;'
  +   'font-size:clamp(13.5px,2vmin,17px);color:var(--lcs-structure);background:var(--lcs-structure-soft);'
  +   'border-radius:var(--lcs-radius-pill);padding:8px 20px;align-self:center;}'

  /* gates */
  + '.cwl-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:560px;'
  +   'align-self:center;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.cwl-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'

  /* panel */
  + '.cwl-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);'
  +   'opacity:0;pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.cwl-scrim.open{opacity:1;pointer-events:auto;}'
  + '.cwl-panel{position:absolute;left:50%;top:6%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(520px,92%);max-height:86%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.cwl-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.cwl-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.cwl-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:17px;color:var(--lcs-ink);}'
  + '.cwl-panel-close{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.cwl-panel-body{padding:12px 16px 16px;display:flex;flex-direction:column;gap:10px;}'
  + '.cwl-wallrow{display:flex;align-items:center;gap:10px;padding:10px 14px;'
  +   'border-radius:var(--lcs-radius-sm);background:var(--lcs-surface-2);'
  +   'border:1.5px solid var(--lcs-line);}'
  + '.cwl-wallrow.active{border-color:var(--lcs-structure);background:var(--lcs-structure-soft);}'
  + '.cwl-wallpick{font-family:var(--lcs-font-body);font-weight:800;font-size:15px;color:var(--lcs-ink);'
  +   'background:transparent;border:none;cursor:pointer;flex:1;text-align:left;padding:4px 0;}'
  + '.cwl-wallmeta{font-size:12.5px;color:var(--lcs-ink-soft);font-weight:700;font-family:var(--lcs-font-body);}'
  + '.cwl-newwall{font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;'
  +   'padding:10px 18px;border-radius:var(--lcs-radius-pill);cursor:pointer;align-self:flex-start;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-structure);color:var(--lcs-structure);}'
  + '.cwl-patrow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}'
  + '.cwl-patlabel{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-ink-soft);}'
  + '.cwl-patbtn{font-family:var(--lcs-font-display);font-weight:700;font-size:13px;'
  +   'padding:6px 14px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);color:var(--lcs-ink-soft);}'
  + '.cwl-patbtn.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.cwl-confirm{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 14px;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius-sm);}'
  + '.cwl-confirm p{margin:0;font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-ink);flex:1 1 100%;}'
  + '.cwl-btn{font-family:var(--lcs-font-display);font-weight:800;font-size:14px;padding:9px 18px;'
  +   'border-radius:var(--lcs-radius-pill);cursor:pointer;background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-structure);color:var(--lcs-structure);}'
  + '.cwl-btn.danger{background:#C9502A;border-color:#C9502A;color:#fff;}'
  + '.cwl-devicenote{margin:2px 0 0;font-family:var(--lcs-font-body);font-size:12.5px;'
  +   'color:var(--lcs-ink-soft);line-height:1.45;}'

  /* phone stacking for the counter */
  + '@media (max-width:640px){'
  +   '.cwl-repr-row{flex-direction:column;}'
  +   '.cwl-eq{transform:rotate(90deg);font-size:26px;}'
  +   '.cwl-digit{font-size:clamp(44px,14vw,72px);}'
  + '}'

  /* short screens (1024×768 projectors!): compress the vertical rhythm so
     the calendar view — grid AND dock — fits without scrolling */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.cwl-wrap{gap:6px;}'
  +   '.cwl-dateline{font-size:clamp(20px,3.4vmin,36px);min-height:auto;}'
  +   '.cwl-strips{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:6px;}'
  +   '.cwl-strip{font-size:12.5px;padding:3px 12px;}'
  +   '.cwl-widget{min-height:auto;gap:6px;}'
  +   '.cwl-cell{height:clamp(32px,8vh,64px);}'
  +   '.cwl-cellnum{font-size:clamp(14px,3vh,24px);}'
  +   '.cwl-monthtitle{font-size:clamp(18px,3.4vh,28px);}'
  +   '.cwl-wd{font-size:clamp(10px,2vh,15px);padding:2px 0;}'
  +   '.cwl-mat{padding:6px;}'
  +   '.cwl-dockchip{min-height:46px;padding:6px 14px;}'
  + '}'

  /* =====================================================================
     ⭐⭐ THE HEIGHT LADDER — this tool was CLIPPING, not merely small, and it
     is the only real cut-off the wide-viewport gate found in the catalog.
     MEASURED (German, six-row month):
         1024x900   cell  64  card  983x860  -> fits
         1400x880   cell  64  card 1100x834  -> fits
         1920x1080  cell 103  card 1100x1311 -> CUT 231px
         2400x1150  cell 104  card 1100x1333 -> CUT 183px
         2560x1440  cell 104  card 1100x1342 -> fits
     The cell is `clamp(38px, min(9.5vmin,10.5vh), 104px)`, so above the
     narrow breakpoint it more than doubles, and six rows of that overflow a
     1080px board by 231px with NOTHING able to scroll to the dock chip
     underneath (`.cwl-wide` is overflow-y:hidden; there is no scrollable
     ancestor anywhere in the chain — measured, not assumed).

     ⚠ THE `vh` TERM IS THE MECHANISM, and number-sieve's own source already
     calls vh FORBIDDEN inside a manipulative: the iframe grows to its
     content, so a vh rule is a feedback loop the shell has no path for. The
     ladder below is explicit heights, no vh arithmetic, derived from the
     measurements above — shed (card - vh) across six rows:
         >=1080  cell 60  ->  1311 - 6x43 = 1053 of 1080   (27 spare)
         >=1200  cell 76  ->  1333 - 6x28 = 1165 of 1200   (35 spare)
         >=1400  cell 104 ->            1342 of 1400   (58 spare)
     Below 1080 nothing changes: the narrow rules already hold it at 64 and
     it already fits.

     ⚠ THE TOOL GETS SMALLER AT 1920x1080, from a 103px cell to 60px, and
     that is the honest trade — 103 does not fit, and a calendar whose dock
     chip cannot be reached is worse than one drawn smaller. It grows back on
     a taller board, which is where the room actually is. This is the
     opposite direction from every other tool in this programme, and it is
     the same rule: fit the room you have, measured.
     ===================================================================== */
  + '@media (min-height:1080px){'
  +   '.cwl-cell{height:60px;}'
  +   '.cwl-cellnum{font-size:26px;}'
  + '}'
  + '@media (min-height:1200px){'
  +   '.cwl-cell{height:76px;}'
  +   '.cwl-cellnum{font-size:30px;}'
  + '}'
  + '@media (min-height:1400px){'
  +   '.cwl-cell{height:104px;}'
  +   '.cwl-cellnum{font-size:34px;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.cwl-cell.today{transform:none;}'
  +   '.cwl-cell.today.flipping{animation:none;}'
  +   '.cwl-dot,.cwl-stamp,.cwl-flag{animation:none;}'
  +   '.cwl-jaritem{transition:none;}'
  +   '.cwl-wash{animation:none;opacity:1;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
