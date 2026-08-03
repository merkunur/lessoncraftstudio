/* =====================================================================
   TOOL #20 — OUR DAY   (our-day.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #20 of the Premium Tools Program
   (Wave 3, Teacher's Desk) — the predictable-routine display: a vertical
   strip of illustrated schedule cards built by tap-append in ~30s, a
   soft sun marker a HUMAN advances (teacher or the schedule helper —
   NEVER the clock: this tool must never compare the clock to the plan),
   gentle folds for finished activities, a friendly 3-tap change ritual
   for anxious kids (old activity stays small + legible: "was: PE"), a
   quiet moon-fold for skipped cards, and a calm display mode for the
   all-day projector.

   PREMIUM: per-card times (5-min picker; analog+digital chip) spoken
   COLLOQUIALLY via the Learning Clock's native-verified TIME_RULES
   (copied VERBATIM below — the formatMoney precedent; learning-clock.js
   is never touched), spoken activity names + advance announcements,
   saved weekly templates (Mon-Fri + 3 free slots, auto-load banner),
   and a same-DOM print stylesheet (the para/sub desk strip).

   LOCALE STRUCTURE (verified against TIME_RULES output): per-locale
   TIME_FRAME with a leading clock-word STRIP for fi/da/no (their pos-0
   emits "kello/klokken/klokka {H}" — a frame supplying its own clock
   word would double-emit); it/pt use the caseless clock-shows frame
   (article-contraction trap avoided); fi has a per-card announce-form
   field (label nominative, announcement partitive). Activity cards are
   a shared core + per-locale concept cards (de Frühstückspause, es-only
   honores a la bandera, pt escovação, Nordic aftercare) — fr ships NO
   religion card (laïcité).

   NO-SHAME: no timers/countdowns/elapsed bars; no clock-vs-plan cues
   EVER; the sun breathes slowly, never blinks; folds read as completion
   (card stays visible all day); speech declarative-warm; no punctuality
   praise. Day-state persists in localStorage (an all-day tool must
   survive a browser crash).
   ===================================================================== */
var OurDay = {
  id: 'our-day',

  strings: {
    title:        {en:'Our Day',de:'Unser Tag',fr:'Notre journée',it:'La nostra giornata',es:'Nuestro día',pt:'Nosso dia',nl:'Onze dag',sv:'Vår dag',da:'Vores dag',no:'Dagen vår',fi:'Meidän päivä'},
    instruction:  {en:'Tap the cards to build today — then tap the sun to move through the day.',de:'Tippt die Karten an und baut euren Tag — dann wandert die Sonne von Karte zu Karte.',fr:'Touchez les cartes pour construire la journée — puis touchez le soleil pour avancer.',it:'Tocca le carte per costruire la giornata — poi tocca il sole per andare avanti.',es:'Toca las tarjetas para armar el día — luego toca el sol para avanzar.',pt:'Toque nos cartões para montar o dia — depois toque no sol para avançar.',nl:'Tik op de kaartjes om de dag te bouwen — tik daarna op de zon om verder te gaan.',sv:'Tryck på korten för att bygga dagen — tryck sedan på solen för att gå vidare.',da:'Tryk på kortene for at bygge dagen — tryk så på solen for at gå videre.',no:'Trykk på kortene for å bygge dagen — trykk så på sola for å gå videre.',fi:'Rakenna päivä napauttamalla kortteja — sitten aurinko kuljettaa päivää eteenpäin.'},
    startDay:     {en:'Start the day',de:'Den Tag beginnen',fr:'Commencer la journée',it:'Inizia la giornata',es:'Empezar el día',pt:'Começar o dia',nl:'De dag beginnen',sv:'Starta dagen',da:'Start dagen',no:'Start dagen',fi:'Aloita päivä'},
    sunAria:      {en:'The sun — tap to move to the next activity',de:'Die Sonne — antippen, dann wandert sie zur nächsten Aktivität',fr:'Le soleil — toucher pour passer à l’activité suivante',it:'Il sole — tocca per passare all’attività successiva',es:'El sol — toca para pasar a la siguiente actividad',pt:'O sol — toque para ir à próxima atividade',nl:'De zon — tik om naar de volgende activiteit te gaan',sv:'Solen — tryck för att gå till nästa aktivitet',da:'Solen — tryk for at gå til næste aktivitet',no:'Sola — trykk for å gå til neste aktivitet',fi:'Aurinko — napauta siirtyäksesi seuraavaan puuhaan'},
    backAria:     {en:'Back one step',de:'Einen Schritt zurück',fr:'Reculer d’une étape',it:'Indietro di un passo',es:'Un paso atrás',pt:'Voltar um passo',nl:'Eén stap terug',sv:'Ett steg tillbaka',da:'Et trin tilbage',no:'Ett steg tilbake',fi:'Askel taaksepäin'},
    editChip:     {en:'Edit',de:'Bearbeiten',fr:'Modifier',it:'Modifica',es:'Editar',pt:'Editar',nl:'Bewerken',sv:'Ändra',da:'Rediger',no:'Rediger',fi:'Muokkaa'},
    doneChip:     {en:'Done',de:'Fertig',fr:'Terminé',it:'Fatto',es:'Listo',pt:'Pronto',nl:'Klaar',sv:'Klar',da:'Færdig',no:'Ferdig',fi:'Valmis'},
    changeTitle:  {en:'Something changed today',de:'Heute ist etwas anders',fr:'Quelque chose a changé aujourd’hui',it:'Oggi qualcosa è cambiato',es:'Hoy algo cambió',pt:'Hoje algo mudou',nl:'Er is vandaag iets veranderd',sv:'Något är annorlunda i dag',da:'Noget er anderledes i dag',no:'Noe er annerledes i dag',fi:'Tänään jokin muuttui'},
    changeSwap:   {en:'Swap it',de:'Tauschen',fr:'Remplacer',it:'Cambia',es:'Cambiarla',pt:'Trocar',nl:'Ruilen',sv:'Byt ut',da:'Byt den ud',no:'Bytt ut',fi:'Vaihda'},
    changeRemove: {en:'Remove it',de:'Herausnehmen',fr:'Retirer',it:'Togli',es:'Quitarla',pt:'Tirar',nl:'Weghalen',sv:'Ta bort',da:'Tag den ud',no:'Ta bort',fi:'Poista'},
    changeAddB:   {en:'Add before',de:'Davor einfügen',fr:'Ajouter avant',it:'Aggiungi prima',es:'Agregar antes',pt:'Adicionar antes',nl:'Ervoor toevoegen',sv:'Lägg till före',da:'Tilføj før',no:'Legg til før',fi:'Lisää edelle'},
    changeAddA:   {en:'Add after',de:'Danach einfügen',fr:'Ajouter après',it:'Aggiungi dopo',es:'Agregar después',pt:'Adicionar depois',nl:'Erna toevoegen',sv:'Lägg till efter',da:'Tilføj efter',no:'Legg til etter',fi:'Lisää perään'},
    wasLabel:     {en:'was: {name}',de:'vorher: {name}',fr:'avant : {name}',it:'prima: {name}',es:'antes: {name}',pt:'antes: {name}',nl:'eerst: {name}',sv:'förut: {name}',da:'før: {name}',no:'før: {name}',fi:'aiemmin: {name}'},
    changeSpoken: {en:'Change: today we have {nw} instead of {old}.',de:'Heute ist etwas anders: Wir haben {nw} statt {old}.',fr:'Changement : aujourd’hui, c’est {nw} qui remplace {old}.',it:'Cambio di programma: oggi c’è {nw}, non {old}.',es:'Cambio: hoy cambiamos {old} por {nw}.',pt:'Mudança: hoje temos {nw}, e não {old}.',nl:'Verandering: vandaag hebben we {nw} in plaats van {old}.',sv:'Ändring: i dag har vi {nw} i stället för {old}.',da:'Ændring: i dag har vi {nw} i stedet for {old}.',no:'Endring: i dag har vi {nw} i stedet for {old}.',fi:'Muutos: tänään on {nw}, ei {old}.',},
    skipCard:     {en:'Another day',de:'Ein andermal',fr:'Un autre jour',it:'Un altro giorno',es:'Otro día',pt:'Outro dia',nl:'Een andere keer',sv:'En annan dag',da:'En anden dag',no:'En annen dag',fi:'Toisena päivänä'},
    removedNote:  {en:'{name} moved to another day.',de:'{name} wandert auf einen anderen Tag.',fr:'{name}, ce sera pour un autre jour.',it:'{name} passa a un altro giorno.',es:'Guardamos {name} para otro día.',pt:'{name} ficou para outro dia.',nl:'{name} schuift door naar een andere dag.',sv:'{name} flyttas till en annan dag.',da:'{name} flyttes til en anden dag.',no:'{name} flyttes til en annen dag.',fi:'{name} siirtyy toiseen päivään.'},
    afterFrame:   {en:'{a} comes after {b}.',de:'{a} kommt nach {b}.',fr:'{a} vient après {b}.',it:'{a} viene dopo {b}.',es:'{a}, cuando terminemos con {b}.',pt:'{a} vem depois que {b} termina.',nl:'{a} komt na {b}.',sv:'{a} kommer efter {b}.',da:'{a} kommer efter {b}.',no:'{a} kommer etter {b}.',fi:'{a} on vuorossa, kun {b} on ohi.'},
    firstFrame:   {en:'{a} is how we start our day.',de:'Mit {a} beginnt unser Tag.',fr:'On commence la journée avec {a}.',it:'La giornata comincia con {a}.',es:'{a}: así empezamos el día.',pt:'{a} abre o nosso dia.',nl:'Met {a} begint onze dag.',sv:'Vi börjar dagen med {a}.',da:'Vi begynder dagen med {a}.',no:'Vi begynner dagen med {a}.',fi:'Päivä alkaa: {a}.'},
    emptyHint:    {en:'Tap the activity cards to build today.',de:'Tippt links auf die Karten und baut euren Tag.',fr:'Touchez les cartes à gauche pour construire la journée.',it:'Tocca le carte a sinistra per costruire la giornata.',es:'Toca las tarjetas de la izquierda para armar el día.',pt:'Toque nos cartões ao lado para montar o dia.',nl:'Tik links op de kaartjes om de dag te bouwen.',sv:'Tryck på korten till vänster för att bygga dagen.',da:'Tryk på kortene til venstre for at bygge dagen.',no:'Trykk på kortene til venstre for å bygge dagen.',fi:'Rakenna päivä napauttamalla vieressä olevia kortteja.'},
    dayFull:      {en:'Our day is full — 16 cards is the whole strip.',de:'Unser Tag ist voll — 16 Karten passen auf den Streifen.',fr:'La journée est pleine — 16 cartes, c’est le maximum.',it:'La giornata è piena — il massimo è 16 carte.',es:'El día está lleno — 16 tarjetas es el máximo.',pt:'O dia está cheio — 16 cartões é o máximo.',nl:'De dag is vol — 16 kaartjes is het maximum.',sv:'Dagen är full — fler än 16 kort får inte plats.',da:'Dagen er fuld — der er plads til 16 kort.',no:'Dagen er full — det er plass til 16 kort.',fi:'Päivä on täynnä — 16 korttia on enimmäismäärä.'},
    grpArrival:   {en:'Arriving & leaving',de:'Ankommen & Gehen',fr:'Arrivée & départ',it:'Arrivo e uscita',es:'Llegada y salida',pt:'Chegada e saída',nl:'Komen & gaan',sv:'Komma & gå',da:'Komme & gå',no:'Komme & gå',fi:'Tulo ja lähtö'},
    grpLearning:  {en:'Learning',de:'Lernen',fr:'Apprentissages',it:'Imparare',es:'Aprender',pt:'Aprender',nl:'Leren',sv:'Lärande',da:'Læring',no:'Læring',fi:'Oppiminen'},
    grpCare:      {en:'Food & care',de:'Essen & Pause',fr:'Repas & soins',it:'Pasti e cura',es:'Comer y descansar',pt:'Comida e cuidados',nl:'Eten & rust',sv:'Mat & vila',da:'Mad & hvile',no:'Mat & hvile',fi:'Ruoka ja lepo'},
    grpMove:      {en:'Moving & outside',de:'Bewegung & Draußen',fr:'Bouger & dehors',it:'Movimento e aria aperta',es:'Movimiento y aire libre',pt:'Movimento e lá fora',nl:'Bewegen & buiten',sv:'Rörelse & ute',da:'Bevægelse & ude',no:'Bevegelse & ute',fi:'Liikunta ja ulkoilu'},
    grpTogether:  {en:'Together',de:'Gemeinsam',fr:'Ensemble',it:'Insieme',es:'Juntos',pt:'Juntos',nl:'Samen',sv:'Tillsammans',da:'Sammen',no:'Sammen',fi:'Yhdessä'},
    grpSpecial:   {en:'Special cards',de:'Besondere Karten',fr:'Cartes spéciales',it:'Carte speciali',es:'Tarjetas especiales',pt:'Cartões especiais',nl:'Speciale kaartjes',sv:'Specialkort',da:'Særlige kort',no:'Spesialkort',fi:'Erikoiskortit'},
    tmplTitle:    {en:'Weekly plans',de:'Wochenpläne',fr:'Plans de la semaine',it:'Piani della settimana',es:'Planes de la semana',pt:'Planos da semana',nl:'Weekplannen',sv:'Veckoplaner',da:'Ugeplaner',no:'Ukeplaner',fi:'Viikkosuunnitelmat'},
    tmplSaveAs:   {en:'Save as {day}',de:'Als {day} speichern',fr:'Enregistrer pour {day}',it:'Salva come {day}',es:'Guardar como {day}',pt:'Salvar como {day}',nl:'Opslaan als {day}',sv:'Spara som {day}',da:'Gem som {day}',no:'Lagre som {day}',fi:'Tallenna: {day}'},
    tmplReady:    {en:'{day}’s plan is ready — change anything?',de:'Der Plan für {day} liegt bereit — noch etwas ändern?',fr:'Le plan de {day} est prêt — on change quelque chose ?',it:'Il piano di {day} è pronto — vuoi cambiare qualcosa?',es:'{day}: el plan está listo — ¿cambiamos algo?',pt:'O plano de {day} está pronto — quer mudar algo?',nl:'Het plan voor {day} staat klaar — nog iets aanpassen?',sv:'Planen för {day} är klar — vill du ändra något?',da:'Planen for {day} er klar — skal noget ændres?',no:'Planen for {day} er klar — vil du endre noe?',fi:'{day}-suunnitelma on valmis — muutetaanko jotain?'},
    tmplUse:      {en:'Use it',de:'Übernehmen',fr:'Le garder',it:'Usalo',es:'Usarlo',pt:'Usar',nl:'Gebruiken',sv:'Använd den',da:'Brug den',no:'Bruk den',fi:'Käytä'},
    tmplFresh:    {en:'Start fresh',de:'Neu beginnen',fr:'Partir de zéro',it:'Ricomincia',es:'Empezar de cero',pt:'Começar do zero',nl:'Opnieuw beginnen',sv:'Börja om',da:'Start forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    printChip:    {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Afdrukken',sv:'Skriv ut',da:'Udskriv',no:'Skriv ut',fi:'Tulosta'},
    printWith:    {en:'Today with: ________',de:'Heute mit: ________',fr:'Aujourd’hui avec : ________',it:'Oggi con: ________',es:'Hoy con: ________',pt:'Hoje com: ________',nl:'Vandaag met: ________',sv:'I dag med: ________',da:'I dag med: ________',no:'I dag med: ________',fi:'Tänään mukana: ________'},
    printNotes:   {en:'Notes',de:'Notizen',fr:'Notes',it:'Note',es:'Notas',pt:'Anotações',nl:'Notities',sv:'Anteckningar',da:'Noter',no:'Notater',fi:'Muistiinpanot'},
    timeAria:     {en:'Set the time for {name}',de:'Uhrzeit für {name} festlegen',fr:'Régler l’heure pour {name}',it:'Imposta l’orario per {name}',es:'Poner la hora para {name}',pt:'Definir o horário: {name}',nl:'Tijd instellen voor {name}',sv:'Ställ in tiden för {name}',da:'Sæt tiden for {name}',no:'Sett tiden for {name}',fi:'Aseta aika: {name}'},
    timeNone:     {en:'No time',de:'Ohne Uhrzeit',fr:'Sans heure',it:'Senza orario',es:'Sin hora',pt:'Sem horário',nl:'Zonder tijd',sv:'Ingen tid',da:'Ingen tid',no:'Uten klokkeslett',fi:'Ei kellonaikaa'},
    setVoice:     {en:'Speak activities and times',de:'Aktivitäten und Uhrzeiten ansagen',fr:'Annoncer les activités et les heures',it:'Leggi attività e orari a voce alta',es:'Leer las actividades y las horas en voz alta',pt:'Ler as atividades e os horários em voz alta',nl:'Activiteiten en tijden uitspreken',sv:'Läs upp aktiviteter och tider',da:'Læs aktiviteter og tider højt',no:'Les opp aktiviteter og tider',fi:'Lue puuhat ja ajat ääneen'},
    setCues:      {en:'Sound cues',de:'Töne',fr:'Signaux sonores',it:'Segnali sonori',es:'Efectos de sonido',pt:'Sinais sonoros',nl:'Geluidssignalen',sv:'Ljudsignaler',da:'Lydsignaler',no:'Lydsignaler',fi:'Äänimerkit'},
    gatePremium:  {en:'Times on the cards, the spoken voice, weekly plans, and printing are part of Premium. Building today’s schedule — with the sun, the change cards, and every activity — is always free.',de:'Uhrzeiten auf den Karten, die Vorlesestimme, Wochenpläne und das Drucken gehören zu Premium. Den Tagesplan bauen — mit Sonne, Änderungskarten und allen Aktivitäten — bleibt immer kostenlos.',fr:'Les heures sur les cartes, la voix, les plans de la semaine et l’impression font partie de Premium. Construire la journée — avec le soleil, les cartes de changement et toutes les activités — reste toujours gratuit.',it:'Gli orari sulle carte, la voce che legge, i piani della settimana e la stampa fanno parte di Premium. Costruire la giornata — con il sole, i cambi di programma e tutte le attività — resta sempre gratuito.',es:'Las horas en las tarjetas, la voz, los planes de la semana y la impresión forman parte de Premium. Armar el día — con el sol, las tarjetas de cambio y todas las actividades — es gratis para siempre.',pt:'Os horários nos cartões, a voz, os planos da semana e a impressão fazem parte do Premium. Montar o dia — com o sol, os cartões de mudança e todas as atividades — é sempre gratuito.',nl:'Tijden op de kaartjes, de stem, weekplannen en afdrukken horen bij Premium. De dag bouwen — met de zon, de veranderkaartjes en alle activiteiten — blijft altijd gratis.',sv:'Tider på korten, rösten, veckoplaner och utskrift ingår i Premium. Att bygga dagen — med solen, ändringskorten och alla aktiviteter — är alltid gratis.',da:'Tider på kortene, stemmen, ugeplaner og udskrift er en del af Premium. At bygge dagen — med solen, ændringskortene og alle aktiviteter — er altid gratis.',no:'Klokkeslett på kortene, stemmen, ukeplaner og utskrift er en del av Premium. Å bygge dagen — med sola, endringskortene og alle aktivitetene — er alltid gratis.',fi:'Korttien kellonajat, ääni, viikkosuunnitelmat ja tulostus kuuluvat Premiumiin. Päivän rakentaminen — aurinkoineen, muutoskortteineen ja kaikkine puuhineen — on aina ilmaista.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    voiceMissing: {en:'No voice for this language is installed on this device.',de:'Auf diesem Gerät ist keine Stimme für diese Sprache installiert.',fr:'Aucune voix pour cette langue n’est installée sur cet appareil.',it:'Su questo dispositivo non è installata una voce per questa lingua.',es:'Este dispositivo no tiene instalada una voz para este idioma.',pt:'Este aparelho não tem uma voz instalada para este idioma.',nl:'Op dit apparaat is geen stem voor deze taal geïnstalleerd.',sv:'Det finns ingen röst för det här språket på den här enheten.',da:'Der er ingen stemme til dette sprog på denne enhed.',no:'Det er ikke installert noen stemme for dette språket på denne enheten.',fi:'Tässä laitteessa ei ole puheääntä tälle kielelle.'}
  },

  /* ================== the activity catalog ×11 ====================== */
  /* Card = { id, group, only?: [locales], not?: [locales] } — every card
     is REPEATABLE in the strip (fi välitunti happens several times a
     day). Names ×11 below; fan-out natives own the register (articles
     baked in for fr/es/it/pt so the announce frame never contracts). */
  GROUPS: ['grpArrival', 'grpLearning', 'grpCare', 'grpMove', 'grpTogether', 'grpSpecial'],
  CARDS: [
    { id: 'arrival',   group: 0 },
    { id: 'circle',    group: 0 },
    { id: 'tidyup',    group: 0 },
    { id: 'lineup',    group: 0 },
    { id: 'packup',    group: 0 },
    { id: 'home',      group: 0 },
    { id: 'aftercare', group: 0, only: ['sv', 'da', 'no', 'nl', 'fr', 'de', 'pt', 'fi'] },
    { id: 'reading',   group: 1 },
    { id: 'storytime', group: 1 },
    { id: 'writing',   group: 1 },
    { id: 'math',      group: 1 },
    { id: 'phonics',   group: 1 },
    { id: 'science',   group: 1 },
    { id: 'art',       group: 1 },
    { id: 'crafts',    group: 1 },
    { id: 'music',     group: 1 },
    { id: 'language',  group: 1 },
    { id: 'italiano',  group: 1, only: ['it'] },
    { id: 'religion',  group: 1, not: ['fr'] },
    { id: 'breakfast', group: 2, only: ['de', 'es', 'fi'] },
    { id: 'snack',     group: 2 },
    { id: 'lunch',     group: 2 },
    { id: 'washhands', group: 2 },
    { id: 'bathroom',  group: 2 },
    { id: 'brushing',  group: 2, only: ['pt', 'de'] },
    { id: 'rest',      group: 2 },
    { id: 'pe',        group: 3 },
    { id: 'swimming',  group: 3 },
    { id: 'recess',    group: 3 },
    { id: 'outdoor',   group: 3 },
    { id: 'forest',    group: 3 },
    { id: 'brainbreak',group: 3 },
    { id: 'dance',     group: 3 },
    { id: 'centers',   group: 4 },
    { id: 'stations',  group: 4 },
    { id: 'showtell',  group: 4, only: ['en'] },
    { id: 'library',   group: 4 },
    { id: 'computers', group: 4 },
    { id: 'calendar',  group: 4 },
    { id: 'birthday',  group: 4 },
    { id: 'assembly',  group: 4 },
    { id: 'fieldtrip', group: 4 },
    { id: 'visitor',   group: 4 },
    { id: 'honores',   group: 4, only: ['es', 'pt'] },
    { id: 'change',    group: 5 },
    { id: 'surprise',  group: 5 },
    { id: 'guest',     group: 5 },
    { id: 'celebrate', group: 5 }
  ],
  NAMES: {
    arrival:   {en:'Arrival',de:'Ankommen',fr:'l’accueil',it:'l’accoglienza',es:'la llegada',pt:'a acolhida',nl:'De inloop',sv:'Ankomst',da:'Ankomst',no:'Ankomst',fi:'Saapuminen'},
    circle:    {en:'Morning circle',de:'Morgenkreis',fr:'le regroupement',it:'il cerchio del mattino',es:'el círculo de la mañana',pt:'a roda de conversa',nl:'De kring',sv:'Samling',da:'Samling',no:'Samlingsstund',fi:'Aamupiiri'},
    tidyup:    {en:'Tidy-up',de:'Aufräumen',fr:'le rangement',it:'il riordino',es:'la hora de guardar',pt:'a arrumação',nl:'Opruimen',sv:'Städning',da:'Oprydning',no:'Ryddetid',fi:'Siivous'},
    lineup:    {en:'Line up',de:'Aufstellen',fr:'le rang',it:'la fila',es:'la fila',pt:'a fila',nl:'In de rij',sv:'Uppställning',da:'Opstilling',no:'Oppstilling',fi:'Jonoon'},
    packup:    {en:'Pack up',de:'Einpacken',fr:'le cartable',it:'lo zaino',es:'la mochila',pt:'a hora da mochila',nl:'Inpakken',sv:'Packa ihop',da:'Pakketid',no:'Pakketid',fi:'Pakkaaminen'},
    home:      {en:'Home time',de:'Schulschluss',fr:'la sortie',it:'l’uscita',es:'la salida',pt:'a saída',nl:'Naar huis',sv:'Hemgång',da:'Hjemtid',no:'Skoleslutt',fi:'Kotiinlähtö'},
    aftercare: {en:'After-school care',de:'Hort',fr:'la garderie',it:'il doposcuola',es:'la guardería',pt:'o contraturno',nl:'De opvang',sv:'Fritids',da:'SFO',no:'SFO',fi:'Iltapäiväkerho'},
    reading:   {en:'Reading',de:'Lesen',fr:'la lecture',it:'la lettura',es:'la lectura',pt:'a leitura',nl:'Lezen',sv:'Läsning',da:'Læsning',no:'Lesing',fi:'Lukeminen'},
    storytime: {en:'Story time',de:'Vorlesen',fr:'l’histoire',it:'la storia',es:'el cuento',pt:'a hora da história',nl:'Voorlezen',sv:'Sagostund',da:'Højtlæsning',no:'Høytlesing',fi:'Satuhetki'},
    writing:   {en:'Writing',de:'Schreiben',fr:'l’écriture',it:'la scrittura',es:'la escritura',pt:'a escrita',nl:'Schrijven',sv:'Skrivstund',da:'Skrivning',no:'Skriving',fi:'Kirjoittaminen'},
    math:      {en:'Math',de:'Mathe',fr:'les maths',it:'la matematica',es:'las matemáticas',pt:'a matemática',nl:'Rekenen',sv:'Matte',da:'Matematik',no:'Matte',fi:'Matematiikka'},
    phonics:   {en:'Phonics',de:'Buchstabenzeit',fr:'les sons et les lettres',it:'l’alfabeto',es:'las letras',pt:'a hora das letras',nl:'Letters',sv:'Bokstäver',da:'Bogstaver',no:'Bokstaver',fi:'Kirjaimet'},
    science:   {en:'Science',de:'Sachunterricht',fr:'la découverte du monde',it:'la scienza',es:'las ciencias',pt:'ciências',nl:'Wereldoriëntatie',sv:'NO',da:'Natur og teknologi',no:'Naturfag',fi:'Ympäristöoppi'},
    art:       {en:'Art',de:'Kunst',fr:'les arts plastiques',it:'l’arte',es:'el arte',pt:'a arte',nl:'Knutselen',sv:'Bild',da:'Billedkunst',no:'Kunst og håndverk',fi:'Kuvataide'},
    crafts:    {en:'Crafts',de:'Basteln',fr:'le bricolage',it:'il lavoretto',es:'las manualidades',pt:'a hora das atividades manuais',nl:'Handvaardigheid',sv:'Pyssel',da:'Krea',no:'Forming',fi:'Käsityö'},
    music:     {en:'Music',de:'Musik',fr:'la musique',it:'la musica',es:'la música',pt:'a música',nl:'Muziek',sv:'Musik',da:'Musik',no:'Musikk',fi:'Musiikki'},
    italiano:  {en:'Italian',de:'—',fr:'—',it:'l’italiano',es:'—',pt:'—',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},
    language:  {en:'Language class',de:'Englisch',fr:'l’anglais',it:'l’inglese',es:'el inglés',pt:'o inglês',nl:'Engels',sv:'Engelska',da:'Engelsk',no:'Engelsk',fi:'Englanti'},
    religion:  {en:'Religion & ethics',de:'Religion',fr:'—',it:'la religione',es:'la religión',pt:'o ensino religioso',nl:'Levensbeschouwing',sv:'SO',da:'Kristendom',no:'KRLE',fi:'Katsomusaine'},
    breakfast: {en:'Breakfast break',de:'Frühstückspause',fr:'—',it:'—',es:'el desayuno',pt:'—',nl:'Tien-uurtje',sv:'—',da:'—',no:'—',fi:'Aamupala'},
    snack:     {en:'Snack',de:'Obstpause',fr:'la collation',it:'la merenda',es:'el refrigerio',pt:'o lanche',nl:'Tien-uurtje',sv:'Fruktstund',da:'Frugtpause',no:'Fruktstund',fi:'Välipala'},
    lunch:     {en:'Lunch',de:'Mittagessen',fr:'la cantine',it:'la mensa',es:'la comida',pt:'o almoço',nl:'De lunch',sv:'Lunch',da:'Madpakketid',no:'Matpakketid',fi:'Ruokailu'},
    washhands: {en:'Wash hands',de:'Händewaschen',fr:'le lavage des mains',it:'il lavaggio delle mani',es:'el lavado de manos',pt:'a hora de lavar as mãos',nl:'Handen wassen',sv:'Handtvätt',da:'Håndvask',no:'Håndvask',fi:'Käsienpesu'},
    bathroom:  {en:'Bathroom',de:'Toilette',fr:'le passage aux toilettes',it:'il bagno',es:'el baño',pt:'a hora do banheiro',nl:'Naar de wc',sv:'Toalett',da:'Toilettid',no:'Dopause',fi:'Vessa'},
    brushing:  {en:'Tooth brushing',de:'Zähneputzen',fr:'—',it:'—',es:'—',pt:'a escovação',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},
    rest:      {en:'Rest time',de:'Ruhezeit',fr:'la sieste',it:'il riposino',es:'el descanso',pt:'a hora do descanso',nl:'Rustmoment',sv:'Vila',da:'Hviletid',no:'Hviletid',fi:'Lepohetki'},
    pe:        {en:'PE',de:'Sport',fr:'la motricité',it:'la motoria',es:'la educación física',pt:'a educação física',nl:'Gym',sv:'Idrott',da:'Idræt',no:'Gym',fi:'Liikunta'},
    swimming:  {en:'Swimming',de:'Schwimmen',fr:'la piscine',it:'il nuoto',es:'la natación',pt:'a natação',nl:'Schoolzwemmen',sv:'Simning',da:'Svømning',no:'Svømming',fi:'Uinti'},
    recess:    {en:'Recess',de:'Hofpause',fr:'la récréation',it:'la ricreazione',es:'el recreo',pt:'o recreio',nl:'Pauze',sv:'Rast',da:'Frikvarter',no:'Friminutt',fi:'Välitunti'},
    outdoor:   {en:'Outdoor time',de:'Draußenzeit',fr:'les jeux dehors',it:'il gioco all’aperto',es:'el tiempo al aire libre',pt:'o parquinho',nl:'Buitenspelen',sv:'Utevistelse',da:'Udetid',no:'Utetid',fi:'Ulkoilu'},
    forest:    {en:'Forest day',de:'Waldtag',fr:'la sortie nature',it:'la passeggiata nella natura',es:'el día en la naturaleza',pt:'o dia na natureza',nl:'Natuurdag',sv:'Skogsdag',da:'Skovdag',no:'Turdag',fi:'Metsäretki'},
    brainbreak:{en:'Movement break',de:'Bewegungspause',fr:'la pause active',it:'la pausa attiva',es:'la activación física',pt:'a pausa ativa',nl:'Beweegpauze',sv:'Rörelsepaus',da:'Bevægelsespause',no:'Aktivitetspause',fi:'Taukojumppa'},
    dance:     {en:'Dance',de:'Tanzen',fr:'la danse',it:'il ballo',es:'el baile',pt:'a dança',nl:'Dansen',sv:'Dans',da:'Dans',no:'Dans',fi:'Tanssi'},
    centers:   {en:'Free play',de:'Freispiel',fr:'le jeu libre',it:'il gioco libero',es:'el juego libre',pt:'a brincadeira livre',nl:'Vrij spelen',sv:'Fri lek',da:'Fri leg',no:'Frilek',fi:'Vapaa leikki'},
    stations:  {en:'Stations',de:'Freiarbeit',fr:'les ateliers',it:'il laboratorio',es:'las estaciones',pt:'a hora dos cantinhos',nl:'Hoekenwerk',sv:'Stationer',da:'Værksteder',no:'Stasjoner',fi:'Pistetyöskentely'},
    showtell:  {en:'Show and tell',de:'—',fr:'—',it:'—',es:'—',pt:'—',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},
    library:   {en:'Library',de:'Bücherei',fr:'la bibliothèque',it:'la biblioteca',es:'la biblioteca',pt:'a biblioteca',nl:'De bieb',sv:'Bibliotek',da:'Bibliotekstid',no:'Bibliotek',fi:'Kirjasto'},
    computers: {en:'Computers',de:'Tablet-Zeit',fr:'les tablettes',it:'il tablet',es:'las tabletas',pt:'a hora do tablet',nl:'Tablets',sv:'Lärplattor',da:'Tablets',no:'Nettbrett',fi:'Tabletit'},
    calendar:  {en:'Calendar & weather',de:'Kalender & Wetter',fr:'la date et la météo',it:'il calendario e il meteo',es:'el calendario y el clima',pt:'a hora do calendário',nl:'Kalender & weer',sv:'Kalender & väder',da:'Kalender og vejr',no:'Kalender og vær',fi:'Kalenteri ja sää'},
    birthday:  {en:'Birthday',de:'Geburtstag',fr:'l’anniversaire',it:'il compleanno',es:'el cumpleaños',pt:'o aniversário',nl:'Verjaardag',sv:'Födelsedag',da:'Fødselsdag',no:'Bursdag',fi:'Syntymäpäivä'},
    assembly:  {en:'Assembly',de:'Schulversammlung',fr:'le rassemblement',it:'l’assemblea',es:'la asamblea',pt:'a assembleia',nl:'Weekopening',sv:'Samling i aulan',da:'Fællessamling',no:'Fellessamling',fi:'Aamunavaus'},
    fieldtrip: {en:'Field trip',de:'Ausflug',fr:'la sortie scolaire',it:'la gita',es:'el paseo escolar',pt:'o passeio',nl:'Schoolreisje',sv:'Utflykt',da:'Udflugt',no:'Skoletur',fi:'Retki'},
    visitor:   {en:'Visitor',de:'Besuch',fr:'la visite',it:'l’ospite',es:'la visita',pt:'a visita',nl:'Bezoek',sv:'Besök',da:'Besøg',no:'Besøk',fi:'Vieras'},
    honores:   {en:'Flag ceremony',de:'—',fr:'—',it:'—',es:'los honores a la bandera',pt:'a hora cívica',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},
    change:    {en:'Change',de:'Änderung',fr:'le changement',it:'il cambio di programma',es:'el cambio',pt:'a mudança',nl:'Verandering',sv:'Ändring',da:'Ændring',no:'Endring',fi:'Muutos'},
    surprise:  {en:'Surprise',de:'Überraschung',fr:'la surprise',it:'la sorpresa',es:'la sorpresa',pt:'a surpresa',nl:'Verrassing',sv:'Överraskning',da:'Overraskelse',no:'Overraskelse',fi:'Yllätys'},
    guest:     {en:'Guest teacher',de:'Vertretung',fr:'l’intervenant',it:'l’insegnante ospite',es:'el maestro invitado',pt:'o professor convidado',nl:'Invaljuf of invalmeester',sv:'Vikarie',da:'Vikartime',no:'Vikar',fi:'Vieraileva opettaja'},
    celebrate: {en:'Celebration',de:'Fest',fr:'la fête',it:'la festa',es:'la fiesta',pt:'a festa',nl:'Feest',sv:'Fest',da:'Fest',no:'Fest',fi:'Juhla'}
  },
  /* fi announces in the partitive/case-correct form where the nominative
     label reads wrong in "Nyt on {a}" (subjects want partitive); the fi
     fan-out native owns this table. Other locales fall back to NAMES. */
  ANNOUNCE: {
    de: { home: 'Nachhausegehen', celebrate: 'Feiern' },
    nl: { arrival: 'de inloop', circle: 'de kring', tidyup: 'opruimen', lineup: 'de rij', packup: 'inpakken', home: 'naar huis', aftercare: 'de opvang', reading: 'lezen', storytime: 'voorlezen', writing: 'schrijven', math: 'rekenen', phonics: 'letters', science: 'wereldoriëntatie', art: 'knutselen', crafts: 'handvaardigheid', music: 'muziek', language: 'Engels', religion: 'levensbeschouwing', snack: 'het tien-uurtje', lunch: 'de lunch', washhands: 'handen wassen', bathroom: 'de wc', rest: 'het rustmoment', pe: 'gym', swimming: 'schoolzwemmen', recess: 'pauze', outdoor: 'buitenspelen', forest: 'de natuurdag', brainbreak: 'een beweegpauze', dance: 'dansen', centers: 'vrij spelen', stations: 'hoekenwerk', library: 'de bieb', computers: 'de tablets', calendar: 'de kalender en het weer', birthday: 'de verjaardag', assembly: 'de weekopening', fieldtrip: 'het schoolreisje', visitor: 'het bezoek', surprise: 'een verrassing', guest: 'een invaljuf of invalmeester', celebrate: 'feest' },
    sv: { science: 'N O', religion: 'S O', calendar: 'kalender och väder', surprise: 'en överraskning' },
    fi: { arrival: 'saapumisen aika', circle: 'aamupiiri', tidyup: 'siivouksen aika', lineup: 'aika mennä jonoon', packup: 'pakkaamisen aika', home: 'kotiinlähdön aika', aftercare: 'iltapäiväkerho', reading: 'lukemista', storytime: 'satuhetki', writing: 'kirjoittamista', math: 'matikkaa', phonics: 'kirjainhetki', science: 'ympäristöoppia', art: 'kuvataidetta', crafts: 'käsitöitä', music: 'musiikkia', language: 'englantia', religion: 'katsomustunti', breakfast: 'aamupala', snack: 'välipala', lunch: 'ruokailu', washhands: 'käsienpesun aika', bathroom: 'vessahetki', rest: 'lepohetki', pe: 'liikuntaa', swimming: 'uintia', recess: 'välitunti', outdoor: 'ulkoilu', forest: 'metsäretki', brainbreak: 'taukojumppa', dance: 'tanssia', centers: 'vapaata leikkiä', stations: 'pistetyöskentelyä', library: 'kirjastohetki', computers: 'tablettihetki', calendar: 'kalenterihetki', birthday: 'syntymäpäivä', assembly: 'aamunavaus', fieldtrip: 'retki', visitor: 'vierailu', change: 'muutos', surprise: 'yllätys', guest: 'vierailevan opettajan tunti', celebrate: 'juhla' }
  },
  /* fi time-safe card names for the "{a} alkaa…" frame (labels like
     "Jonoon" cannot be sentence subjects) */
  TIME_NAMES: {
    fi: { lineup: 'Jonoon meno', bathroom: 'Vessakäynti', computers: 'Tablettihetki', phonics: 'Kirjainhetki', visitor: 'Vierailu', guest: 'Vierailevan opettajan tunti', calendar: 'Kalenterihetki' }
  },
  /* the "Now it's …" frame per locale (fi uses ANNOUNCE overrides) */
  NOW_FRAME: {en:'Now it’s time for {a}!',de:'Jetzt ist {a} dran!',fr:'Maintenant, c’est {a} !',it:'Adesso c’è {a}!',es:'¡Ahora vamos con {a}!',pt:'Agora é {a}!',nl:'Nu is het tijd voor {a}!',sv:'Nu är det {a}!',da:'Nu er det {a}!',no:'Nå er det {a}!',fi:'Nyt on {a}!'},
  /* the time frame per locale. fi/da/no STRIP the emitted leading clock
     word (their position-0 emits "kello/klokken/klokka {H}"); it/pt use
     the caseless clock-shows frame (article contraction avoided). */
  TIME_FRAME: {en:'{a} is at {t}.',de:'{a} ist um {t}.',fr:'{a}, c’est à {t}.',it:'{a} comincia quando l’orologio segna {t}.',es:'{a}, a {t}.',pt:'{a} começa quando o relógio marca {t}.',nl:'{a} is om {t}.',sv:'{a} börjar klockan {t}.',da:'{a} er klokken {t}.',no:'{a} er klokka {t}.',fi:'{a} alkaa, kun kello on {t}.'},
  CLOCKWORD_STRIP: { fi: 'kello ', da: 'klokken ', no: 'klokka ' },

  /* ======= TIME_RULES — copied VERBATIM from learning-clock.js =======
     (native-verified colloquial times; the drift gate in
     scripts/verify-our-day.js compares this byte-for-byte against the
     learning-clock source and FAILS on any divergence). */
  TIME_RULES: {
    /*__TR_en__*/ en: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:"{H} o'clock",5:'five past {H}',10:'ten past {H}',15:'quarter past {H}',20:'twenty past {H}',25:'twenty-five past {H}',30:'half past {H}',35:'twenty-five to {N}',40:'twenty to {N}',45:'quarter to {N}',50:'ten to {N}',55:'five to {N}'}, formal:{tpl:'{HW} {M#}',zero:"{HW} o'clock",low:'{HW} oh {M#}'}, specials:[] },
    /*__TR_de__*/ de: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:'{H} Uhr',5:'fünf nach {H}',10:'zehn nach {H}',15:'Viertel nach {H}',20:'zwanzig nach {H}',25:'fünf vor halb {N}',30:'halb {N}',35:'fünf nach halb {N}',40:'zwanzig vor {N}',45:'Viertel vor {N}',50:'zehn vor {N}',55:'fünf vor {N}'}, overlays:{deQuarter:{15:'viertel {N}',45:'dreiviertel {N}'}}, formal:{tpl:'{HW} Uhr {M#}',zero:'{HW} Uhr'}, specials:[] },
    /*__TR_fr__*/ fr: { hourWords:['une heure','deux heures','trois heures','quatre heures','cinq heures','six heures','sept heures','huit heures','neuf heures','dix heures','onze heures','midi'], hourWordsAlt:null, positions:{0:'{H}',5:'{H} cinq',10:'{H} dix',15:'{H} et quart',20:'{H} vingt',25:'{H} vingt-cinq',30:'{H} et demie',35:'{N} moins vingt-cinq',40:'{N} moins vingt',45:'{N} moins le quart',50:'{N} moins dix',55:'{N} moins cinq'}, formal:{tpl:'{H} {M#}',zero:'{H}'}, specials:[{h:12,m:30,text:'midi et demi'}] },
    /*__TR_it__*/ it: { hourWords:['l\'una','le due','le tre','le quattro','le cinque','le sei','le sette','le otto','le nove','le dieci','le undici','mezzogiorno'], hourWordsAlt:null, positions:{0:'{H}',5:'{H} e cinque',10:'{H} e dieci',15:'{H} e un quarto',20:'{H} e venti',25:'{H} e venticinque',30:'{H} e mezza',35:'{N} meno venticinque',40:'{N} meno venti',45:'{N} meno un quarto',50:'{N} meno dieci',55:'{N} meno cinque'}, formal:{tpl:'{H} e {M#}',zero:'{H}'}, specials:[{h:12,m:30,text:'mezzogiorno e mezzo'}] },
    /*__TR_es__*/ es: { hourWords:['la una','las dos','las tres','las cuatro','las cinco','las seis','las siete','las ocho','las nueve','las diez','las once','las doce'], hourWordsAlt:null, positions:{0:'{H} en punto',5:'{H} y cinco',10:'{H} y diez',15:'{H} y cuarto',20:'{H} y veinte',25:'{H} y veinticinco',30:'{H} y media',35:'veinticinco para {N}',40:'veinte para {N}',45:'un cuarto para {N}',50:'diez para {N}',55:'cinco para {N}'}, formal:{tpl:'{H} {M#}',zero:'{H} en punto',low:'{H} cero {M#}'}, specials:[] },
    /*__TR_pt__*/ pt: { hourWords:['uma','duas','três','quatro','cinco','seis','sete','oito','nove','dez','onze','meio-dia'], hourWordsAlt:['a uma','as duas','as três','as quatro','as cinco','as seis','as sete','as oito','as nove','as dez','as onze','o meio-dia'], positions:{0:'{H} horas',5:'{H} e cinco',10:'{H} e dez',15:'{H} e quinze',20:'{H} e vinte',25:'{H} e vinte e cinco',30:'{H} e meia',35:'vinte e cinco para {N2}',40:'vinte para {N2}',45:'quinze para {N2}',50:'dez para {N2}',55:'cinco para {N2}'}, formal:{tpl:'{H} e {M#}',zero:'{H} horas'}, specials:[{h:1,m:0,text:'uma hora'},{h:12,m:0,text:'meio-dia'}] },
    /*__TR_nl__*/ nl: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf'], positions:{0:'{H} uur',5:'vijf over {H}',10:'tien over {H}',15:'kwart over {H}',20:'tien voor half {N}',25:'vijf voor half {N}',30:'half {N}',35:'vijf over half {N}',40:'tien over half {N}',45:'kwart voor {N}',50:'tien voor {N}',55:'vijf voor {N}'}, formal:{tpl:'{HW} uur {M#}',zero:'{HW} uur'}, specials:[] },
    /*__TR_sv__*/ sv: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:'{H}',5:'fem över {H}',10:'tio över {H}',15:'kvart över {H}',20:'tjugo över {H}',25:'fem i halv {N}',30:'halv {N}',35:'fem över halv {N}',40:'tjugo i {N}',45:'kvart i {N}',50:'tio i {N}',55:'fem i {N}'}, formal:{tpl:'{HW} och {M#}',zero:'klockan {HW}',low:'{HW} noll {M#}'}, specials:[] },
    /*__TR_da__*/ da: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['et','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv'], positions:{0:'klokken {H}',5:'fem over {H}',10:'ti minutter over {H}',15:'kvart over {H}',20:'ti i halv {N2}',25:'fem i halv {N}',30:'halv {N}',35:'fem over halv {N}',40:'ti over halv {N2}',45:'kvart i {N}',50:'ti i {N}',55:'fem i {N}'}, formal:{tpl:'{HW} {M#}',zero:'klokken {HW}',low:'{HW} nul {M#}'}, specials:[] },
    /*__TR_no__*/ no: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['ett','to','tre','fire','fem','seks','sju','åtte','ni','ti','elleve','tolv'], positions:{0:'klokka {H}',5:'fem over {H}',10:'ti over {H}',15:'kvart over {H}',20:'ti på halv {N}',25:'fem på halv {N}',30:'halv {N}',35:'fem over halv {N}',40:'ti over halv {N}',45:'kvart på {N}',50:'ti på {N}',55:'fem på {N}'}, formal:{tpl:'{HW} {M#}',zero:'klokka {HW}',low:'{HW} null {M#}'}, specials:[] },
    /*__TR_fi__*/ fi: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista'], hourWordsAlt2:['yhtä','kahta','kolmea','neljää','viittä','kuutta','seitsemää','kahdeksaa','yhdeksää','kymmentä','yhtätoista','kahtatoista'], positions:{0:'kello {H}',5:'viisi yli {H2}',10:'kymmenen yli {H2}',15:'vartti yli {H2}',20:'kymmentä vaille puoli {N2}',25:'viittä vaille puoli {N2}',30:'puoli {N}',35:'viisi yli puoli {N2}',40:'kymmenen yli puoli {N2}',45:'varttia vaille {N2}',50:'kymmentä vaille {N2}',55:'viittä vaille {N2}'}, formal:{tpl:'{HW} {M#}',zero:'kello {HW}',low:'{HW} nolla {M#}'}, specials:[] },
  },

  defaults: { voice: true, soundCues: true },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' },
    { key: 'soundCues', type: 'toggle', labelKey: 'setCues' }
  ],

  STORE_KEY: 'lcs:our-day:v1',
  ENT_TRUST_DAYS: 14,
  MAX_CARDS: 16,

  /* ===================== PURE engine ================================ */

  /* cards visible in a locale (only/not filters) */
  visibleCards: function (loc) {
    return this.CARDS.filter(function (c) {
      if (c.only && c.only.indexOf(loc) < 0) return false;
      if (c.not && c.not.indexOf(loc) >= 0) return false;
      return true;
    });
  },
  cardName: function (id, loc) {
    var m = this.NAMES[id];
    return m ? (m[loc] || m.en) : id;
  },
  announceName: function (id, loc) {
    var ov = this.ANNOUNCE[loc];
    return (ov && ov[id]) || this.cardName(id, loc);
  },

  /* sayTime — positions-path of learning-clock's sayTime (this tool only
     emits 5-minute times, so the formal register never engages). */
  sayTime: function (loc, h, m) {
    var R = this.TIME_RULES[loc] || this.TIME_RULES.en;
    h = ((h - 1) % 12 + 12) % 12 + 1;
    m = ((m % 60) + 60) % 60;
    for (var i = 0; i < (R.specials || []).length; i++) {
      var sp = R.specials[i];
      if (sp.h === h && sp.m === m) return sp.text;
    }
    var tpl = R.positions[m];
    if (!tpl) return null;   /* non-5-min: the picker cannot produce this */
    var n = h % 12 + 1;
    var out = tpl;
    if (R.hourWordsAlt2) out = out.split('{N3}').join(R.hourWordsAlt2[n - 1]);
    if (R.hourWordsAlt) {
      out = out.split('{N2}').join(R.hourWordsAlt[n - 1]);
      out = out.split('{H2}').join(R.hourWordsAlt[h - 1]);
    } else {
      out = out.split('{N2}').join(R.hourWords[n - 1]);
      out = out.split('{H2}').join(R.hourWords[h - 1]);
    }
    out = out.split('{N}').join(R.hourWords[n - 1]);
    out = out.split('{H}').join(R.hourWords[h - 1]);
    return out;
  },
  /* the framed time sentence: "{Activity} ist um halb eins." with the
     fi/da/no leading clock-word STRIP (their pos-0 emits it; the frame
     supplies its own — a doubled clock word is the defect class). */
  timeSentence: function (loc, cardId, h24, m) {
    var h = h24 % 12 === 0 ? 12 : h24 % 12;
    var t = this.sayTime(loc, h, m);
    if (t === null) return null;
    var strip = this.CLOCKWORD_STRIP[loc];
    if (strip && t.indexOf(strip) === 0) t = t.slice(strip.length);
    var frame = this.TIME_FRAME[loc] || this.TIME_FRAME.en;
    var tname = ((this.TIME_NAMES || {})[loc] || {})[cardId] || this.cardName(cardId, loc);
    return frame.split('{a}').join(this._cap(tname)).split('{t}').join(t);
  },
  nowSentence: function (loc, cardId) {
    var frame = this.NOW_FRAME[loc] || this.NOW_FRAME.en;
    return frame.split('{a}').join(this.announceName(cardId, loc));
  },
  /* digital display always HH:MM 24h-agnostic per locale? keep simple:
     the picker range is 7-16, displayed as set (school-day clock). */
  fmtDigital: function (h24, m) { return h24 + ':' + (m < 10 ? '0' + m : m); },

  /* weekday label: Intl (nb for no), SELF-capitalized, Monday-first */
  WEEKDAYS: ['mon', 'tue', 'wed', 'thu', 'fri'],
  weekdayLabel: function (loc, idx) {
    var locMap = { en: 'en', de: 'de', fr: 'fr', it: 'it', es: 'es-MX', pt: 'pt-BR', nl: 'nl', sv: 'sv', da: 'da', no: 'nb', fi: 'fi' };
    /* idx 0 = Monday; 2024-01-01 was a Monday */
    var d = new Date(Date.UTC(2024, 0, 1 + idx));
    var s = '';
    try { s = new Intl.DateTimeFormat(locMap[loc] || 'en', { weekday: 'long', timeZone: 'UTC' }).format(d); } catch (_) { s = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][idx]; }
    return this._cap(s);
  },
  todayWeekdayIdx: function () {
    var d = new Date().getDay();   /* 0=Sun */
    return d >= 1 && d <= 5 ? d - 1 : -1;
  },
  _cap: function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; },

  /* day-state (persisted): items[] of {id, time:null|{h,m}, changedFrom:null|id, skipped:bool}, sunIdx */
  _blankDay: function () { return { items: [], sunIdx: 0, started: false }; },

  /* ========================== mount ================================= */

  premium: false,

  init: function (api) {
    this.api = api;
    injectOurDayCSS();

    this.day = this._blankDay();
    this.mode = 'build';        /* build | run | edit */
    this.changeIdx = null;      /* card index in the change overlay */
    this.changePick = null;     /* 'swap' | 'before' | 'after' */
    this.timeIdx = null;        /* card index in the time picker */
    this.gateOpen = false;
    this.banner = null;         /* pending template banner {idx} */
    this.pebbleUntil = 0;
    this.displayMode = false;
    this._lastTouch = Date.now();
    this._speaking = false;
    this._actx = null;
    this._voiceState = null;
    this._flyFrom = null;

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, settings: null, templates: {}, day: null };
    if (!this._store.templates) this._store.templates = {};
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    /* an all-day tool survives a reload: restore today's day-state */
    if (this._store.day && this._store.day.date === this._todayKey() && this._store.day.state) {
      this.day = this._store.day.state;
      if (this.day.started) this.mode = 'run';
    }

    this.render();
    this._fetchEntitlement();

    var self = this;
    this._idleTimer = setInterval(function () {
      if (self.mode === 'run' && !self.displayMode && Date.now() - self._lastTouch > 60000) {
        self.displayMode = true;
        self.render();
      }
    }, 5000);
    document.addEventListener('pointerdown', function () { self._lastTouch = Date.now(); }, true);
  },

  _todayKey: function () {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  },
  _persistDay: function () {
    this._store.day = { date: this._todayKey(), state: this.day };
    this._saveStore();
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
    var applyDeepLink = function () {
      if (!self.premium) return;
      var p = new URLSearchParams(location.search);
      var t = p.get('template');
      if (t && self.WEEKDAYS.indexOf(t) >= 0 && self._store.templates[t] && !self.day.started && self.day.items.length === 0) {
        self.banner = { idx: self.WEEKDAYS.indexOf(t) };
        self.render();
      } else if (self._wrap) self.render();
    };
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; self._maybeTemplateBanner(); applyDeepLink(); }
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
        if (self._wrap) { self._maybeTemplateBanner(); applyDeepLink(); self.render(); }
      })
      .catch(function () { trustCache(); });
  },
  /* today's weekday template exists → pre-stage behind a banner (never
     silently start, never make her rebuild) */
  _maybeTemplateBanner: function () {
    if (!this.premium || this.day.started || this.day.items.length) return;
    var idx = this.todayWeekdayIdx();
    if (idx >= 0 && this._store.templates[this.WEEKDAYS[idx]]) this.banner = { idx: idx };
  },

  /* ==================== helpers + speech + sfx ====================== */

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _voiceOk: function () {
    if (this._voiceState !== null) return this._voiceState;
    var ok = true;
    try {
      if (!window.speechSynthesis) ok = false;
      else {
        var voices = window.speechSynthesis.getVoices() || [];
        if (voices.length > 0) {
          var want = ({ no: 'nb', pt: 'pt' }[this.api.lang] || this.api.lang).toLowerCase();
          ok = voices.some(function (v) { return (v.lang || '').toLowerCase().indexOf(want) === 0; });
          if (!ok && this.api.lang === 'no') ok = voices.some(function (v) { return (v.lang || '').toLowerCase().indexOf('no') === 0; });
        }
      }
    } catch (_) { ok = true; }
    this._voiceState = ok;
    return ok;
  },
  /* one utterance at a time (a kid drumming on a phone must not queue
     twelve sentences); lang passed in THIS arm and the announce arm */
  _speak: function (text) {
    this.api.announce(text);
    if (!this.premium || !this.api.settings.voice) return;
    if (!this._voiceOk()) return;
    var self = this;
    if (this._speaking) return;
    this._speaking = true;
    setTimeout(function () { self._speaking = false; }, 1200);
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },
  _ctx: function () {
    if (this._actx === null) {
      try { var AC = window.AudioContext || window.webkitAudioContext; this._actx = AC ? new AC() : false; } catch (_) { this._actx = false; }
    }
    if (this._actx && this._actx.state === 'suspended') { try { this._actx.resume(); } catch (_) {} }
    return this._actx;
  },
  _note: function (freq, at, dur, peak) {
    if (!this.api.settings.soundCues) return;
    var ctx = this._ctx();
    if (!ctx) return;
    var t = ctx.currentTime + (at || 0);
    var osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak || 0.09, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.25));
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + (dur || 0.25) + 0.05);
  },
  _sfxAppend: function () { this._note(587.33, 0, 0.10, 0.06); },
  _sfxAdvance: function () { this._note(523.25, 0, 0.22, 0.07); this._note(659.25, 0.12, 0.30, 0.06); },
  _sfxChange: function () { this._note(493.88, 0, 0.14, 0.06); this._note(587.33, 0.10, 0.18, 0.06); },

  /* ======================== day actions ============================= */

  addCard: function (cardId, at) {
    if (this.day.items.length >= this.MAX_CARDS) { this.api.announce(this.api.t('dayFull')); this.render(); return false; }
    var item = { id: cardId, time: null, changedFrom: null, skipped: false };
    if (at === undefined || at >= this.day.items.length) this.day.items.push(item);
    else this.day.items.splice(at, 0, item);
    this._sfxAppend();
    this._persistDay();
    return true;
  },
  removeCard: function (idx) {
    this.day.items.splice(idx, 1);
    if (this.day.sunIdx > idx) this.day.sunIdx--;
    if (this.day.sunIdx > this.day.items.length) this.day.sunIdx = this.day.items.length;
    this._persistDay();
  },
  moveCard: function (from, to) {
    if (from === to || from < 0 || from >= this.day.items.length) return;
    var it = this.day.items.splice(from, 1)[0];
    this.day.items.splice(to, 0, it);
    this._persistDay();
  },
  startDay: function () {
    if (!this.day.items.length) return;
    this.day.started = true;
    this.day.sunIdx = 0;
    this.mode = 'run';
    this._persistDay();
    if (this.day.items[0]) this._speak(this.nowSentence(this.api.lang, this.day.items[0].id));
    this.render();
  },
  advance: function () {
    if (this.day.sunIdx >= this.day.items.length) return;
    this.day.sunIdx++;
    this.pebbleUntil = Date.now() + 12000;
    this._sfxAdvance();
    var next = this.day.items[this.day.sunIdx];
    if (next) this._speak(this.nowSentence(this.api.lang, next.id));
    this._persistDay();
    this.render();
    var self = this;
    setTimeout(function () { if (Date.now() >= self.pebbleUntil && self._wrap) self.render(); }, 12500);
  },
  unAdvance: function () {
    if (this.day.sunIdx === 0) return;
    this.day.sunIdx--;
    this.pebbleUntil = 0;
    this._persistDay();
    this.render();
  },
  /* the change ritual — swap keeps the old activity small + legible */
  swapCard: function (idx, newId) {
    var it = this.day.items[idx];
    var oldId = it.id;
    it.changedFrom = oldId;
    it.id = newId;
    this._sfxChange();
    this._speak(this.fmt('changeSpoken', { nw: this.announceName(newId, this.api.lang), old: this.announceName(oldId, this.api.lang) }));
    this._persistDay();
  },
  /* the quiet "another day" path (moon-fold), only for future cards */
  skipCard: function (idx) {
    var it = this.day.items[idx];
    it.skipped = !it.skipped;
    if (it.skipped) this.api.announce(this.fmt('removedNote', { name: this.cardName(it.id, this.api.lang) }));
    this._persistDay();
  },
  setTime: function (idx, h, m) {
    this.day.items[idx].time = (h === null) ? null : { h: h, m: m };
    this._persistDay();
  },

  /* card-tap speech (RUN mode): time set → the framed time sentence;
     no time → the after/first frame; free tier → pulse only */
  speakCard: function (idx) {
    var it = this.day.items[idx];
    var loc = this.api.lang;
    if (it.time) { this._speak(this.timeSentence(loc, it.id, it.time.h, it.time.m)); return; }
    if (idx === 0) { this._speak(this.fmt('firstFrame', { a: this._cap(this.announceName(it.id, loc)) })); return; }
    var prev = this.day.items[idx - 1];
    this._speak(this.fmt('afterFrame', { a: this._cap(this.announceName(it.id, loc)), b: this.announceName(prev.id, loc) }));
  },

  /* templates */
  saveTemplate: function (slot) {
    if (!this.premium) return;
    this._store.templates[slot] = {
      items: this.day.items.map(function (it) { return { id: it.id, time: it.time ? { h: it.time.h, m: it.time.m } : null }; }),
      ts: Date.now()
    };
    this._saveStore();
    this.render();
  },
  loadTemplate: function (slot) {
    if (!this.premium) return;
    var t = this._store.templates[slot];
    if (!t) return;
    this.day = this._blankDay();
    this.day.items = t.items.map(function (it) { return { id: it.id, time: it.time ? { h: it.time.h, m: it.time.m } : null, changedFrom: null, skipped: false }; });
    this.mode = 'build';
    this.banner = null;
    this._persistDay();
    this.render();
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    document.body.classList.add('od-wide');
    var wrap = api.el('div', 'od-wrap' + (this.displayMode ? ' od-display' : ''));
    api.stage.appendChild(wrap);
    this._wrap = wrap;

    if (this.banner) wrap.appendChild(this._bannerEl());

    var main = api.el('div', 'od-main');
    if (this.mode === 'build' || this.mode === 'edit') main.appendChild(this._palette());
    main.appendChild(this._strip());
    wrap.appendChild(main);

    wrap.appendChild(this._toolbar());
    if (this.gateOpen) wrap.appendChild(this._gatePanel());
    if (this.changeIdx !== null) wrap.appendChild(this._changeOverlay());
    if (this.timeIdx !== null) wrap.appendChild(this._timePicker());
    if (this._tmplOpen) wrap.appendChild(this._templates());
  },

  _bannerEl: function () {
    var api = this.api, self = this;
    var b = api.el('div', 'od-banner');
    var day = this.weekdayLabel(api.lang, this.banner.idx);
    b.innerHTML = '<span>' + this.fmt('tmplReady', { day: day }) + '</span>';
    var use = this._chipBtn(api.t('tmplUse'), 'od-chip od-on', function () {
      var slot = self.WEEKDAYS[self.banner.idx];
      self.banner = null;
      self.loadTemplate(slot);
    });
    var fresh = this._chipBtn(api.t('tmplFresh'), 'od-chip', function () { self.banner = null; self.render(); });
    b.append(use, fresh);
    return b;
  },

  /* ------- palette (build/edit) ------- */
  _palette: function () {
    var api = this.api, self = this;
    var pal = api.el('div', 'od-palette');
    var cards = this.visibleCards(api.lang);
    for (var g = 0; g < this.GROUPS.length; g++) {
      var inGroup = cards.filter(function (c) { return c.group === g; });
      if (!inGroup.length) continue;
      var band = api.el('div', 'od-band');
      band.innerHTML = '<span class="od-band-label">' + api.t(this.GROUPS[g]) + '</span>';
      var row = api.el('div', 'od-band-row');
      inGroup.forEach(function (c) {
        var b = api.el('button', 'od-pal-card');
        b.type = 'button';
        b.innerHTML = self._iconSVG(c.id) + '<span>' + self.cardName(c.id, api.lang) + '</span>';
        b.addEventListener('click', function () {
          if (self.changePick) { self._resolveChangePick(c.id); return; }
          if (self.addCard(c.id)) self.render();
        });
        row.appendChild(b);
      });
      band.appendChild(row);
      pal.appendChild(band);
    }
    return pal;
  },
  _resolveChangePick: function (cardId) {
    var idx = this.changeIdx;
    if (this.changePick === 'swap') this.swapCard(idx, cardId);
    else if (this.changePick === 'before') { if (this.addCard(cardId, idx)) this.day.items[idx].changedFrom = null; }
    else if (this.changePick === 'after') this.addCard(cardId, idx + 1);
    this.changeIdx = null;
    this.changePick = null;
    this.render();
  },

  /* ------- the strip ------- */
  _strip: function () {
    var api = this.api, self = this;
    var host = api.el('div', 'od-striphost');
    var strip = api.el('div', 'od-strip');
    var n = this.day.items.length;
    if (!n) {
      var hint = api.el('div', 'od-empty');
      hint.textContent = api.t('emptyHint');
      strip.appendChild(hint);
      host.appendChild(strip);
      return host;
    }
    /* projector fit: card height clamps 56-96 by count (phone scrolls)
       ⭐ BOTH NUMBERS ARE A JS CEILING — the 96px per-card cap and the 560px
       total strip budget — so no CSS tier can reach them and a wider board
       would have shown the same small cards. --od-cardscale raises both
       together from CSS, where it keys on width AND height; the `560/n` term
       still decides, so a 7-card day stays denser than a 4-card one. */
    var _ok = parseFloat(getComputedStyle(document.body).getPropertyValue('--od-cardscale'));
    if (!(_ok > 0)) _ok = 1;
    var cardH = Math.max(56, Math.min(Math.round(96 * _ok), Math.floor(560 * _ok / n)));
    strip.style.setProperty('--od-cardh', cardH + 'px');

    for (var i = 0; i < n; i++) strip.appendChild(this._cardEl(i, cardH));
    host.appendChild(strip);
    return host;
  },
  _cardEl: function (i, cardH) {
    var api = this.api, self = this;
    var it = this.day.items[i];
    var isDone = this.mode === 'run' && i < this.day.sunIdx;
    var isNow = this.mode === 'run' && i === this.day.sunIdx;
    var cls = 'od-card' + (isDone ? ' od-done' : '') + (isNow ? ' od-now' : '') + (it.skipped ? ' od-skipped' : '');
    var row = api.el('div', cls);

    /* sun rail cell */
    var rail = api.el('div', 'od-rail');
    if (isNow) {
      var sun = api.el('button', 'od-sun');
      sun.type = 'button';
      sun.setAttribute('aria-label', api.t('sunAria'));
      sun.innerHTML = this._sunSVG();
      sun.addEventListener('click', function () { self.advance(); });
      rail.appendChild(sun);
      if (Date.now() < this.pebbleUntil || this.mode === 'edit') rail.appendChild(this._pebble());
    } else if (this.mode === 'run' && this.day.sunIdx >= this.day.items.length && i === this.day.items.length - 1) {
      /* day complete: the sun rests below the last card via CSS marker */
    }
    row.appendChild(rail);

    /* body: icon + name (+ was:) + time chip */
    var body = api.el('button', 'od-cardbody');
    body.type = 'button';
    body.innerHTML = this._iconSVG(it.id) +
      '<span class="od-cardtext"><span class="od-cardname">' + this._cap(this.cardName(it.id, api.lang)) + '</span>' +
      (it.changedFrom ? '<span class="od-was">' + this.fmt('wasLabel', { name: this.cardName(it.changedFrom, api.lang) }) + '</span>' : '') +
      (it.skipped ? '<span class="od-was">' + api.t('skipCard') + ' ☾</span>' : '') +
      '</span>' +
      (it.changedFrom ? '<span class="od-badge" aria-hidden="true">⟳</span>' : '');
    body.addEventListener('click', function () {
      if (self.mode === 'edit') { self.changeIdx = i; self.changePick = null; self.render(); return; }
      /* RUN/BUILD: speak (premium) or pulse (free) — child-tap harmless */
      body.classList.remove('od-pulse'); void body.offsetWidth; body.classList.add('od-pulse');
      if (self.premium && self.mode === 'run') self.speakCard(i);
      else self.api.announce(self.cardName(it.id, self.api.lang));
    });
    row.appendChild(body);

    /* time chip (premium) */
    if (this.premium && (it.time || this.mode === 'edit')) {
      var chip = api.el('button', 'od-timechip' + (it.time ? '' : ' od-timechip-ghost'));
      chip.type = 'button';
      chip.setAttribute('aria-label', this.fmt('timeAria', { name: this.cardName(it.id, api.lang) }));
      chip.innerHTML = it.time ? this._miniClock(it.time.h, it.time.m) + '<span>' + this.fmtDigital(it.time.h, it.time.m) + '</span>' : '+';
      chip.addEventListener('click', function (e) {
        e.stopPropagation();
        if (self.mode === 'edit') { self.timeIdx = i; self.render(); }
        else if (it.time) self._speak(self.timeSentence(self.api.lang, it.id, it.time.h, it.time.m));
      });
      row.appendChild(chip);
    }

    /* edit affordances */
    if (this.mode === 'edit') {
      var grip = api.el('span', 'od-grip');
      grip.innerHTML = '⋮⋮';
      this._wireDrag(grip, row, i);
      row.insertBefore(grip, body);
      var del = api.el('button', 'od-del');
      del.type = 'button';
      del.setAttribute('aria-label', api.t('changeRemove'));
      del.textContent = '×';
      del.addEventListener('click', function () { self.removeCard(i); self.render(); });
      row.appendChild(del);
    }
    return row;
  },
  _pebble: function () {
    var self = this;
    var p = this.api.el('button', 'od-pebble');
    p.type = 'button';
    p.setAttribute('aria-label', this.api.t('backAria'));
    p.innerHTML = '↩';
    p.addEventListener('click', function () { self.unAdvance(); });
    return p;
  },
  /* grip-handle drag (pointer-capture on the HANDLE only — scroll lives
     everywhere else; the center-board pattern, narrowed) */
  _wireDrag: function (grip, row, idx) {
    var self = this;
    grip.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      grip.setPointerCapture(e.pointerId);
      row.classList.add('od-dragging');
      var startY = e.clientY;
      var rowH = row.offsetHeight + 6;
      var move = function (ev) {
        var dy = ev.clientY - startY;
        row.style.transform = 'translateY(' + dy + 'px)';
      };
      var up = function (ev) {
        grip.removeEventListener('pointermove', move);
        grip.removeEventListener('pointerup', up);
        row.classList.remove('od-dragging');
        row.style.transform = '';
        var delta = Math.round((ev.clientY - startY) / rowH);
        if (delta !== 0) {
          var to = Math.max(0, Math.min(self.day.items.length - 1, idx + delta));
          self.moveCard(idx, to);
        }
        self.render();
      };
      grip.addEventListener('pointermove', move);
      grip.addEventListener('pointerup', up);
    });
  },

  /* ------- toolbar ------- */
  _toolbar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'od-toolbar');

    if (this.mode === 'build') {
      var start = api.el('button', 'od-start');
      start.type = 'button';
      start.textContent = api.t('startDay');
      start.disabled = !this.day.items.length;
      start.addEventListener('click', function () { self.startDay(); });
      bar.appendChild(start);
    } else {
      var edit = this._chipBtn(this.mode === 'edit' ? api.t('doneChip') : api.t('editChip'), 'od-chip od-editchip' + (this.mode === 'edit' ? ' od-on' : ''), function () {
        self.mode = self.mode === 'edit' ? 'run' : 'edit';
        self.displayMode = false;
        self.changeIdx = null; self.changePick = null; self.timeIdx = null;
        self.render();
      });
      bar.appendChild(edit);
    }

    var spacer = api.el('div', 'od-spacer');
    bar.appendChild(spacer);

    if (this.api.settings.voice && this.premium && !this._voiceOk()) {
      var vm = api.el('span', 'od-voicemiss');
      vm.title = api.t('voiceMissing');
      vm.textContent = '🔇';
      bar.appendChild(vm);
    }

    bar.appendChild(this._chipBtn(api.t('tmplTitle'), 'od-chip' + (!this.premium ? ' od-locked' : ''), function () {
      if (!self.premium) { self.gateOpen = true; self.render(); return; }
      self._tmplOpen = !self._tmplOpen;
      self.render();
    }));
    bar.appendChild(this._chipBtn(api.t('printChip'), 'od-chip' + (!this.premium ? ' od-locked' : ''), function () {
      if (!self.premium) { self.gateOpen = true; self.render(); return; }
      try { window.print(); } catch (_) {}
    }));
    return bar;
  },

  /* ------- change overlay (the ritual) ------- */
  _changeOverlay: function () {
    var api = this.api, self = this;
    var ov = api.el('div', 'od-scrim');
    var panel = api.el('div', 'od-change');
    var it = this.day.items[this.changeIdx];
    if (!this.changePick) {
      panel.innerHTML = '<div class="od-change-swirl">↝</div><h3>' + api.t('changeTitle') + '</h3>' +
        '<div class="od-change-card">' + this._iconSVG(it.id) + '<span>' + this._cap(this.cardName(it.id, api.lang)) + '</span></div>';
      var opts = api.el('div', 'od-change-opts');
      opts.append(
        this._chipBtn(api.t('changeSwap'), 'od-chip od-on', function () { self.changePick = 'swap'; self.render(); }),
        this._chipBtn(api.t('changeAddB'), 'od-chip', function () { self.changePick = 'before'; self.render(); }),
        this._chipBtn(api.t('changeAddA'), 'od-chip', function () { self.changePick = 'after'; self.render(); }),
        this._chipBtn(api.t('skipCard') + ' ☾', 'od-chip', function () { self.skipCard(self.changeIdx); self.changeIdx = null; self.render(); }),
        this._chipBtn(api.t('changeRemove'), 'od-chip', function () { self.removeCard(self.changeIdx); self.changeIdx = null; self.render(); })
      );
      panel.appendChild(opts);
    } else {
      panel.innerHTML = '<h3>' + api.t('changeTitle') + '</h3><p class="od-change-hint">' + api.t('emptyHint') + '</p>';
      panel.appendChild(this._palette());
    }
    var x = api.el('button', 'od-close');
    x.type = 'button'; x.textContent = '×'; x.setAttribute('aria-label', 'close');
    x.addEventListener('click', function () { self.changeIdx = null; self.changePick = null; self.render(); });
    panel.appendChild(x);
    ov.appendChild(panel);
    ov.addEventListener('click', function (e) { if (e.target === ov) { self.changeIdx = null; self.changePick = null; self.render(); } });
    return ov;
  },

  /* ------- time picker (5-min two-row; pre-seed prev + 30) ------- */
  _timePicker: function () {
    var api = this.api, self = this;
    var idx = this.timeIdx;
    var it = this.day.items[idx];
    var seed = it.time;
    if (!seed) {
      for (var j = idx - 1; j >= 0; j--) {
        if (this.day.items[j].time) {
          var t = this.day.items[j].time;
          var mins = t.h * 60 + t.m + 30;
          seed = { h: Math.min(16, Math.floor(mins / 60)), m: mins % 60 - (mins % 60) % 5 };
          break;
        }
      }
      if (!seed) seed = { h: 8, m: 0 };
    }
    this._pick = this._pick || { h: seed.h, m: seed.m };
    var ov = api.el('div', 'od-scrim');
    var panel = api.el('div', 'od-timepick');
    panel.innerHTML = '<h3>' + this.fmt('timeAria', { name: this.cardName(it.id, api.lang) }) + '</h3>' +
      '<div class="od-tp-preview">' + this._miniClock(this._pick.h, this._pick.m) + '<span>' + this.fmtDigital(this._pick.h, this._pick.m) + '</span></div>';
    var hrow = api.el('div', 'od-tp-row');
    for (var h = 7; h <= 16; h++) {
      (function (hh) {
        var b = self._chipBtn(String(hh), 'od-chip od-tp-key' + (self._pick.h === hh ? ' od-on' : ''), function () { self._pick.h = hh; self.render(); });
        hrow.appendChild(b);
      }(h));
    }
    panel.appendChild(hrow);
    var mrow = api.el('div', 'od-tp-row');
    for (var m = 0; m < 60; m += 5) {
      (function (mm) {
        var b = self._chipBtn(':' + (mm < 10 ? '0' + mm : mm), 'od-chip od-tp-key' + (self._pick.m === mm ? ' od-on' : ''), function () { self._pick.m = mm; self.render(); });
        mrow.appendChild(b);
      }(m));
    }
    panel.appendChild(mrow);
    var act = api.el('div', 'od-tp-actions');
    act.append(
      this._chipBtn(api.t('doneChip'), 'od-chip od-on', function () { self.setTime(idx, self._pick.h, self._pick.m); self.timeIdx = null; self._pick = null; self.render(); }),
      this._chipBtn(api.t('timeNone'), 'od-chip', function () { self.setTime(idx, null); self.timeIdx = null; self._pick = null; self.render(); })
    );
    panel.appendChild(act);
    ov.appendChild(panel);
    ov.addEventListener('click', function (e) { if (e.target === ov) { self.timeIdx = null; self._pick = null; self.render(); } });
    return ov;
  },

  /* ------- templates panel ------- */
  _templates: function () {
    var api = this.api, self = this;
    var host = api.el('div', 'od-templates');
    host.innerHTML = '<span class="od-band-label">' + api.t('tmplTitle') + '</span>';
    var row = api.el('div', 'od-tmpl-row');
    var slots = this.WEEKDAYS.concat(['a', 'b', 'c']);
    slots.forEach(function (slot, si) {
      var label = si < 5 ? self.weekdayLabel(api.lang, si) : '★' + (si - 4);
      var t = self._store.templates[slot];
      var card = api.el('div', 'od-tmpl-card');
      var open = api.el('button', 'od-tmpl-open');
      open.type = 'button';
      if (t) {
        var thumb = api.el('span', 'od-thumb');
        t.items.slice(0, 8).forEach(function (item) {
          var d = api.el('span', 'od-thumb-cell');
          d.innerHTML = self._iconSVG(item.id);
          thumb.appendChild(d);
        });
        open.appendChild(thumb);
      }
      var nm = api.el('span', 'od-tmpl-name');
      nm.textContent = label;
      open.appendChild(nm);
      open.addEventListener('click', function () {
        if (t) self.loadTemplate(slot);
      });
      card.appendChild(open);
      var save = self._chipBtn(self.fmt('tmplSaveAs', { day: label }), 'od-chip od-chip-sm', function () { self.saveTemplate(slot); });
      save.disabled = !self.day.items.length;
      card.appendChild(save);
      row.appendChild(card);
    });
    host.appendChild(row);
    return host;
  },

  _gatePanel: function () {
    var api = this.api, self = this;
    var g = api.el('div', 'od-gate');
    var p = api.el('p', 'od-gate-text');
    p.textContent = api.t('gatePremium');
    var a = api.el('a', 'od-gate-link');
    a.href = '/' + api.lang + '/pricing?from=tool-our-day';
    a.target = '_top';
    a.textContent = api.t('unlock');
    var x = api.el('button', 'od-close');
    x.type = 'button'; x.textContent = '×'; x.setAttribute('aria-label', 'close');
    x.addEventListener('click', function () { self.gateOpen = false; self.render(); });
    g.append(x, p, a);
    return g;
  },

  _chipBtn: function (label, cls, fn) {
    var b = this.api.el('button', cls);
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },

  /* ------- SVG: the sun, the mini clock, the activity icons ------- */
  _sunSVG: function () {
    return '<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true"><g class="od-sun-rays" stroke="#F2C879" stroke-width="3" stroke-linecap="round">' +
      '<line x1="24" y1="2" x2="24" y2="9"/><line x1="24" y1="39" x2="24" y2="46"/><line x1="2" y1="24" x2="9" y2="24"/><line x1="39" y1="24" x2="46" y2="24"/>' +
      '<line x1="8.4" y1="8.4" x2="13.4" y2="13.4"/><line x1="34.6" y1="34.6" x2="39.6" y2="39.6"/><line x1="8.4" y1="39.6" x2="13.4" y2="34.6"/><line x1="34.6" y1="13.4" x2="39.6" y2="8.4"/></g>' +
      '<circle cx="24" cy="24" r="11" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/>' +
      '<circle cx="20.5" cy="22" r="1.5" fill="#8F6512"/><circle cx="27.5" cy="22" r="1.5" fill="#8F6512"/>' +
      '<path d="M20 26.5q4 3 8 0" stroke="#8F6512" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';
  },
  _miniClock: function (h24, m) {
    var h = h24 % 12;
    var ha = (h + m / 60) * 30 - 90, ma = m * 6 - 90;
    var hx = 12 + 5.5 * Math.cos(ha * Math.PI / 180), hy = 12 + 5.5 * Math.sin(ha * Math.PI / 180);
    var mx = 12 + 8 * Math.cos(ma * Math.PI / 180), my = 12 + 8 * Math.sin(ma * Math.PI / 180);
    return '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#146B5E" stroke-width="1.6"/>' +
      '<line x1="12" y1="12" x2="' + hx.toFixed(1) + '" y2="' + hy.toFixed(1) + '" stroke="#146B5E" stroke-width="2" stroke-linecap="round"/>' +
      '<line x1="12" y1="12" x2="' + mx.toFixed(1) + '" y2="' + my.toFixed(1) + '" stroke="#F2784B" stroke-width="1.5" stroke-linecap="round"/></svg>';
  },
  _iconSVG: function (id) {
    var P = this.ICON_PATHS[id] || this.ICON_PATHS.centers;
    return '<svg class="od-ic" viewBox="0 0 48 48" aria-hidden="true">' + P + '</svg>';
  },
  /* flat Direction-A icons — teal strokes, coral/honey accents, 2-4
     primitives each (deliberately simple: readable at 34px from the
     back row beats illustrative detail) */
  ICON_PATHS: {
    arrival:   '<path d="M10 40V14l14-8 14 8v26" fill="none" stroke="#146B5E" stroke-width="3" stroke-linejoin="round"/><rect x="20" y="26" width="8" height="14" rx="1.5" fill="#F2784B"/><path d="M33 20h8m0 0-4-4m4 4-4 4" stroke="#E0A63C" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    circle:    '<circle cx="24" cy="24" r="14" fill="none" stroke="#F2C879" stroke-width="3"/><circle cx="24" cy="10" r="4" fill="#F2784B"/><circle cx="38" cy="24" r="4" fill="#146B5E"/><circle cx="24" cy="38" r="4" fill="#9CC3E5"/><circle cx="10" cy="24" r="4" fill="#C9A8E0"/>',
    tidyup:    '<path d="M30 6 18 26" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><path d="M12 40l6-14 10 5-4 11z" fill="#F2C879" stroke="#E0A63C" stroke-width="2" stroke-linejoin="round"/>',
    lineup:    '<circle cx="10" cy="16" r="5" fill="#F2784B"/><circle cx="24" cy="16" r="5" fill="#F2C879"/><circle cx="38" cy="16" r="5" fill="#9CC3E5"/><path d="M6 34h36" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 5"/>',
    packup:    '<rect x="11" y="16" width="26" height="24" rx="7" fill="#F2784B"/><path d="M18 16v-2a6 6 0 0 1 12 0v2" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round"/><path d="M11 26h26" stroke="#C4552B" stroke-width="2"/><rect x="20" y="29" width="8" height="7" rx="2" fill="#FBF3E4"/>',
    home:      '<path d="M8 24 24 10l16 14" fill="none" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 24v16h22V24" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><rect x="21" y="30" width="6" height="10" fill="#146B5E"/>',
    aftercare: '<path d="M8 26 24 14l16 12" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><circle cx="18" cy="32" r="4" fill="#F2784B"/><circle cx="30" cy="32" r="4" fill="#9CC3E5"/><path d="M14 42q10-6 20 0" stroke="#F2C879" stroke-width="3" fill="none" stroke-linecap="round"/>',
    reading:   '<path d="M24 12q-8-5-16-3v26q8-2 16 3 8-5 16-3V9q-8-2-16 3z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 12v26" stroke="#146B5E" stroke-width="2.5"/>',
    storytime: '<path d="M8 38V12a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v26" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.5"/><path d="M8 38a4 4 0 0 0 4 4h28" fill="none" stroke="#146B5E" stroke-width="2.5"/><path d="M17 18l4 4 8-8" stroke="#FBF3E4" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    writing:   '<path d="M12 36 32 16l6 6-20 20-8 2z" fill="#F2C879" stroke="#E0A63C" stroke-width="2" stroke-linejoin="round"/><path d="M32 16l4-4 6 6-4 4" fill="#F2784B" stroke="#C4552B" stroke-width="2" stroke-linejoin="round"/>',
    math:      '<text x="9" y="24" font-family="sans-serif" font-weight="bold" font-size="17" fill="#146B5E">1</text><text x="20" y="24" font-family="sans-serif" font-weight="bold" font-size="17" fill="#F2784B">2</text><text x="31" y="24" font-family="sans-serif" font-weight="bold" font-size="17" fill="#E0A63C">3</text><path d="M12 34h8m14-4v8m-4-4h8" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',
    phonics:   '<text x="6" y="30" font-family="sans-serif" font-weight="bold" font-size="20" fill="#F2784B">A</text><text x="19" y="30" font-family="sans-serif" font-weight="bold" font-size="20" fill="#146B5E">B</text><text x="32" y="30" font-family="sans-serif" font-weight="bold" font-size="20" fill="#E0A63C">C</text>',
    science:   '<path d="M20 8v12L10 38a4 4 0 0 0 4 6h20a4 4 0 0 0 4-6L28 20V8" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 32h16l4 8H13z" fill="#9CC3E5"/><path d="M17 8h14" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',
    art:       '<path d="M24 6C14 6 6 13 6 22s7 14 12 14c3 0 3-2 3-4 0-3 2-5 5-5h8c6 0 8-5 8-9C42 11 34 6 24 6z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.5"/><circle cx="15" cy="18" r="3" fill="#F2784B"/><circle cx="25" cy="13" r="3" fill="#F2C879"/><circle cx="34" cy="18" r="3" fill="#9CC3E5"/>',
    crafts:    '<circle cx="14" cy="14" r="5" fill="none" stroke="#F2784B" stroke-width="3"/><circle cx="14" cy="30" r="5" fill="none" stroke="#F2784B" stroke-width="3"/><path d="M18 17 40 38M18 27 40 8" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',
    music:     '<path d="M18 36V10l20-4v26" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="13" cy="36" rx="5" ry="4" fill="#F2784B"/><ellipse cx="33" cy="32" rx="5" ry="4" fill="#F2C879"/>',
    italiano:  '<text x="7" y="33" font-family="sans-serif" font-weight="bold" font-size="26" fill="#146B5E">A</text><text x="25" y="33" font-family="sans-serif" font-weight="bold" font-size="22" fill="#F2784B">a</text><path d="M8 38h32" stroke="#E0A63C" stroke-width="3" stroke-linecap="round"/>',
    language:  '<path d="M6 10h22v14H16l-6 6v-6H6z" fill="#9CC3E5" stroke="#146B5E" stroke-width="2"/><path d="M22 26h20v12h-6v6l-6-6h-8z" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/>',
    religion:  '<path d="M24 40c-8 0-14-5-14-12 0-9 14-20 14-20s14 11 14 20c0 7-6 12-14 12z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.5"/><path d="M24 18v14m-5-9h10" stroke="#F2784B" stroke-width="3" stroke-linecap="round"/>',
    breakfast: '<rect x="8" y="18" width="24" height="18" rx="4" fill="#F2784B"/><rect x="12" y="22" width="16" height="4" rx="2" fill="#FBF3E4"/><path d="M36 22c4 0 6 2 6 5s-2 5-6 5" fill="none" stroke="#146B5E" stroke-width="3"/><path d="M14 12q2-3 0-6m6 6q2-3 0-6" stroke="#9CC3E5" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    snack:     '<circle cx="24" cy="27" r="13" fill="#F2784B"/><path d="M24 14q-1-5 4-7" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><path d="M28 12q4-2 6 2-4 3-6-2z" fill="#7FA860"/>',
    lunch:     '<circle cx="26" cy="24" r="13" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.5"/><circle cx="26" cy="24" r="7" fill="#F2C879"/><path d="M8 12v10m0 0v14m-3-24v10m6-10v10" stroke="#146B5E" stroke-width="2.5" stroke-linecap="round"/>',
    washhands: '<path d="M14 20q10-6 20 0v16q-10 6-20 0z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.5" stroke-linejoin="round"/><circle cx="20" cy="12" r="2.5" fill="#9CC3E5"/><circle cx="28" cy="8" r="2" fill="#9CC3E5"/><circle cx="32" cy="14" r="1.8" fill="#9CC3E5"/>',
    bathroom:  '<rect x="14" y="6" width="20" height="36" rx="3" fill="none" stroke="#146B5E" stroke-width="3"/><circle cx="24" cy="18" r="4" fill="#F2C879"/><path d="M18 34q6-6 12 0" stroke="#F2784B" stroke-width="3" fill="none" stroke-linecap="round"/>',
    brushing:  '<rect x="8" y="20" width="22" height="6" rx="3" fill="#F2784B"/><rect x="30" y="17" width="10" height="12" rx="2" fill="#FBF3E4" stroke="#146B5E" stroke-width="2"/><path d="M32 17v12m3-12v12m3-12v12" stroke="#9CC3E5" stroke-width="1.6"/>',
    rest:      '<path d="M32 8a12 12 0 1 0 8 20 14 14 0 0 1-8-20z" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><path d="M8 30h14l-10 8h10" stroke="#146B5E" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    pe:        '<circle cx="24" cy="24" r="15" fill="#F2784B" stroke="#C4552B" stroke-width="2"/><path d="M9 24h30M24 9c-6 8-6 22 0 30M24 9c6 8 6 22 0 30" fill="none" stroke="#FBF3E4" stroke-width="2.4"/>',
    swimming:  '<path d="M4 34q5-4 10 0t10 0 10 0 10 0" fill="none" stroke="#9CC3E5" stroke-width="3.4" stroke-linecap="round"/><circle cx="17" cy="20" r="4.5" fill="#F2C879"/><path d="M22 24q7-4 14-1" stroke="#F2784B" stroke-width="3.4" fill="none" stroke-linecap="round"/>',
    recess:    '<path d="M8 42V14m0 4 22-8v12L8 30" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 10l4 32" stroke="#E0A63C" stroke-width="2.6"/><circle cx="38" cy="36" r="5" fill="#F2784B"/>',
    outdoor:   '<path d="M14 8l-8 12h4l-5 9h18l-5-9h4z" fill="#7FA860" stroke="#146B5E" stroke-width="2" stroke-linejoin="round"/><rect x="12" y="29" width="4" height="8" fill="#8A6B4A"/><path d="M30 14l-3 6m8-6-3 6m8-6-3 6" stroke="#9CC3E5" stroke-width="2.4" stroke-linecap="round"/><path d="M28 34v6h6l2-3-2-3z" fill="#F2C879" stroke="#E0A63C" stroke-width="1.8" stroke-linejoin="round"/>',
    forest:    '<path d="M14 6 6 20h4l-6 12h20L18 20h4z" fill="#7FA860" stroke="#146B5E" stroke-width="2" stroke-linejoin="round"/><path d="M34 12l-6 10h3l-5 9h16l-5-9h3z" fill="#9BC178" stroke="#146B5E" stroke-width="2" stroke-linejoin="round"/><rect x="12" y="32" width="4" height="8" fill="#8A6B4A"/><rect x="32" y="31" width="4" height="9" fill="#8A6B4A"/>',
    brainbreak:'<circle cx="24" cy="10" r="5" fill="#F2C879"/><path d="M24 16v10m0 0-8 12m8-12 8 12M12 20l12 4 12-6" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    dance:     '<circle cx="20" cy="10" r="5" fill="#F2C879"/><path d="M20 16q-2 10 2 14l-6 12m6-12 8 10M10 22l10 2 12-8" fill="none" stroke="#C9A8E0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 8v10" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="36" cy="19" rx="2.6" ry="2" fill="#146B5E"/>',
    centers:   '<rect x="8" y="26" width="12" height="12" rx="2" fill="#F2784B"/><rect x="22" y="26" width="12" height="12" rx="2" fill="#F2C879"/><rect x="15" y="12" width="12" height="12" rx="2" fill="#9CC3E5"/>',
    stations:  '<rect x="7" y="7" width="15" height="15" rx="3" fill="#F2C879"/><rect x="26" y="7" width="15" height="15" rx="3" fill="#9CC3E5"/><rect x="7" y="26" width="15" height="15" rx="3" fill="#C9A8E0"/><rect x="26" y="26" width="15" height="15" rx="3" fill="#F2784B"/>',
    showtell:  '<path d="M24 6l4.5 9 10 1.5-7.2 7 1.7 10L24 28.8 15 33.5l1.7-10-7.2-7 10-1.5z" fill="#F2C879" stroke="#E0A63C" stroke-width="2" stroke-linejoin="round"/>',
    library:   '<rect x="8" y="8" width="8" height="32" rx="1.5" fill="#F2784B"/><rect x="18" y="12" width="8" height="28" rx="1.5" fill="#F2C879"/><rect x="28" y="8" width="8" height="32" rx="1.5" fill="#9CC3E5" transform="rotate(8 32 24)"/>',
    computers: '<rect x="8" y="10" width="32" height="22" rx="3" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6"/><rect x="12" y="14" width="24" height="14" rx="1.5" fill="#9CC3E5"/><path d="M18 38h12" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',
    calendar:  '<rect x="8" y="10" width="26" height="26" rx="3" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6"/><path d="M8 18h26M14 6v8m14-8v8" stroke="#146B5E" stroke-width="2.6"/><circle cx="38" cy="34" r="6" fill="#F2C879" stroke="#E0A63C" stroke-width="1.8"/>',
    birthday:  '<rect x="10" y="24" width="28" height="14" rx="3" fill="#F2784B"/><path d="M10 30q4-3 7 0t7 0 7 0 7 0" fill="none" stroke="#FBF3E4" stroke-width="2.4"/><rect x="22" y="14" width="4" height="10" fill="#F2C879"/><path d="M24 9q-2 2 0 4 2-2 0-4z" fill="#E0A63C"/>',
    assembly:  '<circle cx="12" cy="18" r="4" fill="#F2784B"/><circle cx="24" cy="14" r="4" fill="#F2C879"/><circle cx="36" cy="18" r="4" fill="#9CC3E5"/><path d="M6 38q18-14 36 0" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',
    fieldtrip: '<rect x="6" y="12" width="36" height="20" rx="4" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><rect x="10" y="16" width="8" height="7" fill="#FBF3E4"/><rect x="21" y="16" width="8" height="7" fill="#FBF3E4"/><circle cx="14" cy="36" r="4" fill="#146B5E"/><circle cx="34" cy="36" r="4" fill="#146B5E"/>',
    visitor:   '<circle cx="24" cy="14" r="6" fill="#F2C879"/><path d="M12 40q0-12 12-12t12 12" fill="#9CC3E5" stroke="#146B5E" stroke-width="2"/><path d="M34 10l4-4m0 0h-4m4 0v4" stroke="#F2784B" stroke-width="2.6" stroke-linecap="round"/>',
    honores:   '<path d="M12 6v36" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><path d="M12 8h24l-5 6 5 6H12z" fill="#F2784B" stroke="#C4552B" stroke-width="1.6" stroke-linejoin="round"/>',
    change:    '<path d="M12 18a12 12 0 0 1 21-4m3-6v8h-8" fill="none" stroke="#F2784B" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 30a12 12 0 0 1-21 4m-3 6v-8h8" fill="none" stroke="#E0A63C" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>',
    surprise:  '<rect x="10" y="20" width="28" height="20" rx="3" fill="#C9A8E0"/><rect x="10" y="18" width="28" height="6" rx="2" fill="#B08CD0"/><path d="M24 18v22m-8-26q8-4 8 4 0-8 8-4" fill="none" stroke="#F2C879" stroke-width="3" stroke-linecap="round"/><text x="20" y="36" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FBF3E4">?</text>',
    guest:     '<circle cx="24" cy="15" r="7" fill="#F2C879"/><path d="M10 42q0-14 14-14t14 14" fill="#F2784B"/><path d="M32 8l3-3m0 0h-3m3 0v3" stroke="#146B5E" stroke-width="2" stroke-linecap="round"/><circle cx="21" cy="14" r="1.4" fill="#8F6512"/><circle cx="27" cy="14" r="1.4" fill="#8F6512"/><path d="M21 18q3 2.4 6 0" stroke="#8F6512" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
    celebrate: '<path d="M10 40 20 16l12 12z" fill="#F2C879" stroke="#E0A63C" stroke-width="2" stroke-linejoin="round"/><circle cx="30" cy="10" r="2.4" fill="#F2784B"/><circle cx="38" cy="18" r="2" fill="#9CC3E5"/><circle cx="34" cy="28" r="2.2" fill="#C9A8E0"/><path d="M24 8l2 4" stroke="#F2784B" stroke-width="2.4" stroke-linecap="round"/>'
  },

  reset: function () {
    this.day = this._blankDay();
    this.mode = 'build';
    this.banner = null;
    this.displayMode = false;
    this._persistDay();
    this.render();
  },
  onSettings: function () { this._voiceState = null; this._saveStore(); this.render(); }
};

/* ========================== styles ================================== */
function injectOurDayCSS() {
  if (document.getElementById('od-style')) return;
  var st = document.createElement('style');
  st.id = 'od-style';
  st.textContent = ''
    + '.od-wrap{display:flex;flex-direction:column;gap:10px;max-width:980px;margin:0 auto;padding:4px 2px 10px;}'
    + '.od-main{display:flex;gap:12px;align-items:flex-start;}'

    /* banner */
    + '.od-banner{display:flex;flex-wrap:wrap;align-items:center;gap:10px;background:#FDF7EA;border:2px solid #F2C87966;border-radius:14px;padding:10px 14px;font-family:Nunito,sans-serif;font-weight:800;color:#5B4A2F;}'

    /* palette */
    + '.od-palette{flex:0 0 32%;max-width:340px;display:flex;flex-direction:column;gap:8px;background:#fff;border-radius:16px;padding:10px;box-shadow:0 1px 4px rgba(20,107,94,.08);max-height:72vh;overflow-y:auto;}'
    + '.od-band-label{font-family:Nunito,sans-serif;font-weight:800;font-size:12px;color:#4E6E69;text-transform:uppercase;letter-spacing:.05em;}'
    + '.od-band{display:flex;flex-direction:column;gap:5px;}'
    + '.od-band-row{display:flex;flex-wrap:wrap;gap:5px;}'
    + '.od-pal-card{display:flex;align-items:center;gap:6px;border:1.5px solid rgba(20,107,94,.14);background:#FFFDF7;border-radius:10px;padding:5px 9px 5px 5px;cursor:pointer;font-family:Nunito,sans-serif;font-weight:800;font-size:12.5px;color:#146B5E;min-height:40px;}'
    + '.od-pal-card .od-ic{width:28px;height:28px;flex:none;}'
    + '.od-pal-card:hover{background:#FBF3E4;}'

    /* strip */
    + '.od-striphost{flex:1;background:#FFFDF7;border-radius:18px;padding:12px 14px;box-shadow:0 2px 10px rgba(20,107,94,.10);min-height:200px;}'
    + '.od-strip{display:flex;flex-direction:column;gap:6px;}'
    + '.od-empty{font-family:Nunito,sans-serif;font-weight:700;color:#8A9A96;padding:30px 10px;text-align:center;}'
    + '.od-card{position:relative;display:flex;align-items:center;gap:10px;height:var(--od-cardh,72px);border:1.5px solid rgba(20,107,94,.12);border-radius:14px;background:#fff;padding:0 10px 0 0;transition:height .4s ease,filter .4s ease,opacity .4s ease;}'
    + '.od-rail{flex:0 0 56px;display:flex;align-items:center;justify-content:center;gap:4px;align-self:stretch;}'
    + '.od-sun{border:0;background:transparent;cursor:pointer;padding:4px;min-width:52px;min-height:52px;animation:odBreathe 4s ease-in-out infinite;}'
    + '@keyframes odBreathe{0%,100%{transform:scale(1);}50%{transform:scale(1.06);}}'
    + '.od-pebble{border:0;background:#F2784B;color:#fff;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:15px;box-shadow:0 1px 3px rgba(0,0,0,.2);}'
    + '.od-cardbody{flex:1;display:flex;align-items:center;gap:12px;border:0;background:transparent;cursor:pointer;padding:6px 0;text-align:left;min-width:0;}'
    + '.od-cardbody .od-ic{width:calc(var(--od-cardh,72px)*.66);height:calc(var(--od-cardh,72px)*.66);flex:none;}'
    + '.od-cardtext{display:flex;flex-direction:column;min-width:0;}'
    + '.od-cardname{font-family:Baloo\\ 2,cursive;font-size:clamp(16px,calc(var(--od-cardh,72px)*.34),30px);color:#0E5147;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'
    + '.od-was{font-family:Nunito,sans-serif;font-weight:700;font-size:12px;color:#8A9A96;}'
    + '.od-badge{position:absolute;top:-7px;right:-6px;background:#F2C879;color:#5B4A2F;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 1px 3px rgba(0,0,0,.18);}'
    + '.od-card.od-now{border-color:#F2C879;box-shadow:0 0 0 3px #F2C87955,0 2px 10px rgba(224,166,60,.25);background:#FFFCF2;}'
    + '.od-card.od-done{filter:saturate(.55);opacity:.72;height:calc(var(--od-cardh,72px)*.7);transform:rotate(-.6deg);}'
    + '.od-card.od-skipped{filter:saturate(.4);opacity:.55;}'
    + '.od-card.od-skipped .od-cardname{text-decoration:none;}'
    + '@keyframes odPulse{0%{transform:scale(1);}40%{transform:scale(1.02);}100%{transform:scale(1);}}'
    + '.od-cardbody.od-pulse{animation:odPulse .5s ease;}'
    + '.od-timechip{display:flex;align-items:center;gap:5px;border:1.5px solid #E0A63C88;background:#FDF7EA;border-radius:999px;padding:4px 10px;cursor:pointer;font-family:Nunito,sans-serif;font-weight:800;font-size:14px;color:#5B4A2F;flex:none;}'
    + '.od-timechip-ghost{opacity:.45;min-width:34px;justify-content:center;}'
    + '.od-grip{cursor:grab;color:#8A9A96;font-size:15px;letter-spacing:-2px;padding:0 2px 0 8px;touch-action:none;user-select:none;}'
    + '.od-card.od-dragging{z-index:5;box-shadow:0 8px 18px rgba(20,30,28,.25);}'
    + '.od-del{border:0;background:transparent;color:#8A9A96;font-size:19px;cursor:pointer;padding:2px 6px;flex:none;}'

    /* toolbar */
    + '.od-toolbar{display:flex;align-items:center;gap:8px;background:#fff;border-radius:14px;padding:8px 10px;box-shadow:0 1px 4px rgba(20,107,94,.08);flex-wrap:wrap;}'
    + '.od-spacer{flex:1;}'
    + '.od-voicemiss{font-size:15px;}'
    + '.od-start{min-width:170px;height:54px;border-radius:15px;border:0;background:#F2784B;color:#fff;font-family:Baloo\\ 2,cursive;font-size:20px;cursor:pointer;box-shadow:0 3px 0 #C4552B;}'
    + '.od-start:disabled{opacity:.4;box-shadow:none;cursor:default;}'
    + '.od-chip{border:2px solid #146B5E22;background:#fff;border-radius:999px;padding:7px 13px;font-family:Nunito,sans-serif;font-weight:800;font-size:13.5px;color:#146B5E;cursor:pointer;min-height:38px;}'
    + '.od-chip.od-on{background:#146B5E;border-color:#146B5E;color:#fff;}'
    + '.od-chip.od-locked::after{content:" 🔒";font-size:11px;}'
    + '.od-chip-sm{padding:4px 9px;font-size:12px;min-height:30px;}'

    /* overlays */
    + '.od-scrim{position:fixed;inset:0;background:rgba(20,40,36,.35);display:flex;align-items:center;justify-content:center;z-index:80;padding:12px;}'
    + '.od-change,.od-timepick{position:relative;background:#fff;border-radius:18px;padding:18px;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:560px;width:100%;max-height:86vh;overflow-y:auto;}'
    + '.od-change h3,.od-timepick h3{margin:0 0 10px;font-family:Baloo\\ 2,cursive;color:#146B5E;font-size:20px;}'
    + '.od-change-swirl{font-size:30px;color:#E0A63C;line-height:1;}'
    + '.od-change-card{display:flex;align-items:center;gap:10px;font-family:Baloo\\ 2,cursive;font-size:19px;color:#0E5147;margin:8px 0 12px;}'
    + '.od-change-card .od-ic{width:44px;height:44px;}'
    + '.od-change-opts{display:flex;flex-wrap:wrap;gap:8px;}'
    + '.od-change-hint{font-family:Nunito,sans-serif;font-weight:700;color:#4E6E69;margin:0 0 8px;}'
    + '.od-change .od-palette{flex:none;max-width:none;box-shadow:none;padding:0;max-height:46vh;}'
    + '.od-close{position:absolute;top:8px;right:10px;border:0;background:transparent;font-size:21px;color:#8A7A5C;cursor:pointer;}'
    + '.od-tp-preview{display:flex;align-items:center;gap:8px;font-family:Baloo\\ 2,cursive;font-size:23px;color:#146B5E;margin-bottom:10px;}'
    + '.od-tp-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px;}'
    + '.od-tp-key{min-width:44px;min-height:44px;padding:4px 8px;}'
    + '.od-tp-actions{display:flex;gap:8px;margin-top:6px;}'

    /* templates */
    + '.od-templates{background:#fff;border-radius:16px;padding:10px 12px;box-shadow:0 1px 4px rgba(20,107,94,.08);display:flex;flex-direction:column;gap:8px;}'
    + '.od-tmpl-row{display:flex;flex-wrap:wrap;gap:10px;}'
    + '.od-tmpl-card{display:flex;flex-direction:column;gap:5px;align-items:stretch;}'
    + '.od-tmpl-open{display:flex;flex-direction:column;align-items:center;gap:4px;border:1.5px solid rgba(20,107,94,.14);background:#FFFDF7;border-radius:12px;padding:8px 10px;cursor:pointer;min-width:86px;}'
    + '.od-tmpl-name{font-family:Nunito,sans-serif;font-weight:800;font-size:13px;color:#146B5E;}'
    + '.od-thumb{display:flex;flex-direction:column;gap:2px;}'
    + '.od-thumb-cell .od-ic{width:16px;height:16px;display:block;}'

    /* gate */
    + '.od-gate{position:relative;background:#FDF7EA;border:2px solid #F2C879;border-radius:16px;padding:14px 40px 14px 16px;font-family:Nunito,sans-serif;}'
    + '.od-gate-text{margin:0 0 8px;font-weight:700;color:#5B4A2F;font-size:14.5px;line-height:1.5;}'
    + '.od-gate-link{color:#C4552B;font-weight:900;text-decoration:underline;}'

    /* display mode: chrome fades, the strip owns the screen */
    + '.od-wrap.od-display .od-toolbar,.od-wrap.od-display .od-templates{opacity:0;pointer-events:none;transition:opacity .8s ease;}'

    /* phone: palette above, strip scrolls */
    + '@media (max-width:640px){'
    +   '.od-main{flex-direction:column;}'
    +   '.od-palette{flex:none;max-width:none;width:100%;max-height:38vh;}'
    +   '.od-card{height:auto;min-height:56px;}'
    +   '.od-cardbody .od-ic{width:36px;height:36px;}'
    +   '.od-cardname{font-size:17px;white-space:normal;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){.od-sun{animation:none;}.od-cardbody.od-pulse{animation:none;}.od-card{transition:none;}}'

    /* print: the para/sub desk strip (same DOM) */
    + '@media print{'
    +   'body{background:#fff;}'
    +   '.lcs-header,.lcs-chrome,.od-toolbar,.od-palette,.od-banner,.od-templates,.od-rail,.od-gate,.od-scrim{display:none!important;}'
    +   '.od-striphost{box-shadow:none;padding:0;}'
    +   '.od-card{height:auto!important;min-height:52px;border:1px solid #999;border-radius:8px;page-break-inside:avoid;filter:none!important;opacity:1!important;transform:none!important;}'
    +   '.od-cardbody .od-ic{width:14mm;height:14mm;}'
    +   '.od-cardname{font-size:16pt;color:#000;}'
    +   '.od-timechip{border-color:#999;background:#fff;color:#000;}'
    +   '.od-card::after{content:"________________";color:#bbb;font-size:10pt;margin-left:auto;padding-right:6px;}'
    + '}'

    /* ⚠ THESE MUST SIT OUTSIDE `@media print`. The first version anchored
       on `+ '}';` — which was the PRINT block's closing brace, not the end
       of the stylesheet — so the whole tier block was nested inside
       @media print and applied only on paper. Nothing errored; the tools
       simply did not change, and the computed `--od-cardscale` came back
       EMPTY at 2560. Anchor an inserted rule on the block it must affect,
       not on the first plausible match. */
    /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
       Three caps, and only one of them is CSS: the wrap at 980, the palette at
       340, and the card-height budget in JS above. All three move together —
       raising the wrap alone would have stretched a column of 72px cards.
       ⚠ The card-name type is `clamp(16px, cardh*.34, 30px)`: it already
       follows the card height, but its own 30px CEILING would have capped it
       the moment the cards grew past 88px. Raised, not re-derived. */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.od-wide{--od-cardscale:1.25;}'
    +   'body.od-wide .od-wrap{max-width:1192px;width:100%;}'
    +   'body.od-wide .od-palette{max-width:420px;}'
    +   'body.od-wide .od-pal-card{font-size:15px;min-height:48px;}'
    +   'body.od-wide .od-pal-card .od-ic{width:44px;height:44px;}'
    +   'body.od-wide .od-cardname{font-size:clamp(16px,calc(var(--od-cardh,72px)*.34),38px);}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.od-wide{--od-cardscale:1.45;}'
    +   'body.od-wide .od-wrap{max-width:1460px;width:100%;}'
    +   'body.od-wide .od-palette{max-width:500px;}'
    +   'body.od-wide .od-pal-card{font-size:17px;min-height:52px;}'
    +   'body.od-wide .od-pal-card .od-ic{width:54px;height:54px;}'
    +   'body.od-wide .od-cardname{font-size:clamp(16px,calc(var(--od-cardh,72px)*.34),46px);}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.od-wide{--od-cardscale:1.55;}'
    +   'body.od-wide .od-wrap{max-width:1660px;width:100%;}'
    +   'body.od-wide .od-palette{max-width:560px;}'
    +   'body.od-wide .od-pal-card{font-size:19px;min-height:56px;}'
    +   'body.od-wide .od-pal-card .od-ic{width:64px;height:64px;}'
    +   'body.od-wide .od-cardname{font-size:clamp(16px,calc(var(--od-cardh,72px)*.34),52px);}'
    + '}'
    /* the strip is a HEIGHT budget, so a taller board can afford a lot more */
    + '@media (min-width:2400px) and (min-height:1300px){'
    +   'body.od-wide{--od-cardscale:1.9;}'
    ;
  document.head.appendChild(st);
}
