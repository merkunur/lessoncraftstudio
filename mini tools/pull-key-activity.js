/* =====================================================================
   pull-key-activity.js — ACTIVITY #103 of the one-by-one rebuild:
   "Owl's Cuckoo Cottage" → THE PULL-BACK KEY (1.MD.B.3, 11 locales).
   Design: docs/activities-rebuild/designs/103-clock-read.md
   ---------------------------------------------------------------------
   THE INVENTION: Owl's clock has a brass spring key. Drag it round (or
   press ◀) and both geared hands run BACKWARDS together, five minutes a
   click, until the long hand reaches the 12 — there the key stops itself
   and the short hand stands on the hour the clock is IN, its number
   ringed (half past eight winds back to 8, never 9). Let go and the clock
   whirrs back to now. In set rounds the key is pulled out and winds the
   clock on (or back) from Owl's last activity to her next.
   Four rounds: Owl's day board (which event is it?), write (two wheels),
   partners (which of three clocks says this time?) and set.
   On success the cuckoo door opens and Owl pops out holding the event's
   picture, bobbing the hour on the hour (a dot lights per bob); the
   window takes the time of day only then (before, it would be a tell).
   ACTIVITY LAYER ONLY: the model is pull-key-core.js; the cottage, clock,
   key, wheels, tags and dots are drawn apparatus; Owl and the events are
   library pictures; lcs-shell.js untouched (the shell's Check is hidden
   and pressed by this activity when the round is right).
   Test seams: window.PullKeyActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._view / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var PullKeyActivity = {
  id: 'pull-key',
  apparatusClasses: ['pk-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:       {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:          {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    aClock00:       {en:'Clock: the long hand is on the 12, the short hand is on the {h}.',de:'Uhr: Der große Zeiger steht auf der 12, der kleine Zeiger auf der {h}.',nl:'Klok: de grote wijzer staat op de 12, de kleine wijzer op de {h}.',da:'Ur: Den store viser står på 12, den lille viser på {h}.',sv:'Klocka: den långa visaren står på 12, den korta visaren på {h}.',no:'Klokke: Den store viseren står på 12, den lille viseren på {h}.',es:'Reloj: la manecilla larga está en el 12 y la corta en el {h}.',it:'Orologio: la lancetta lunga è sul numero 12, quella corta sul numero {h}.',pt:'Relógio: o ponteiro grande está no 12 e o pequeno está no {h}.',fr:'Horloge : la grande aiguille est sur le 12, la petite sur le {h}.',fi:'Kello: pitkä viisari on 12:n kohdalla, lyhyt viisari {h}:n kohdalla.'},
    aClock30:       {en:'Clock: the long hand is on the 6, the short hand is halfway between the {h} and the {h2}.',de:'Uhr: Der große Zeiger steht auf der 6, der kleine Zeiger genau zwischen der {h} und der {h2}.',nl:'Klok: de grote wijzer staat op de 6, de kleine wijzer precies tussen de {h} en de {h2}.',da:'Ur: Den store viser står på 6, den lille viser midt mellem {h} og {h2}.',sv:'Klocka: den långa visaren står på 6, den korta visaren mitt emellan {h} och {h2}.',no:'Klokke: Den store viseren står på 6, den lille viseren midt mellom {h} og {h2}.',es:'Reloj: la manecilla larga está en el 6 y la corta, a la mitad entre el {h} y el {h2}.',it:'Orologio: la lancetta lunga è sul numero 6, quella corta a metà tra il numero {h} e il numero {h2}.',pt:'Relógio: o ponteiro grande está no 6 e o pequeno está no meio, entre o {h} e o {h2}.',fr:'Horloge : la grande aiguille est sur le 6, la petite à mi-chemin entre le {h} et le {h2}.',fi:'Kello: pitkä viisari on 6:n kohdalla, lyhyt viisari puolivälissä {h}:n ja {h2}:n välissä.'},
    setTimes:       {en:'Times',de:'Uhrzeiten',nl:'Tijden',da:'Klokkeslæt',sv:'Tider',no:'Klokkeslett',es:'Horas',it:'Orari',pt:'Horários',fr:'Heures',fi:'Ajat'},
    tHalf:          {en:'O\'clock and half past',de:'Volle und halbe Stunden',nl:'Hele en halve uren',da:'Hele og halve timer',sv:'Hela och halva timmar',no:'Hele og halve timer',es:'Horas en punto y medias horas',it:'Ore esatte e mezz’ore',pt:'Horas exatas e meias horas',fr:'Heures pile et demi-heures',fi:'Tasa- ja puolitunnit'},
    title:          {en:'Owl\'s Cuckoo Cottage',de:'Eulchens Kuckucksuhr',nl:'De koekoeksklok van Uiltje',da:'Uglens kukkeur',sv:'Ugglans gökur',no:'Uglas gjøkur',es:'El reloj de cucú de Tecolín',it:'La casa con il cucù del Gufo',pt:'O relógio de cuco da Corujita',fr:'La maison à coucou de Chouette',fi:'Pöllön käkikello'},
    name:           {en:'Owl',de:'Eulchen',nl:'Uiltje',da:'Uglen',sv:'Ugglan',no:'Ugla',es:'Tecolín',it:'il Gufo',pt:'a Corujita',fr:'Chouette',fi:'Pöllö'},
    tBoard:         {en:'What is Owl doing now?',de:'Was macht Eulchen gerade?',nl:'Wat doet Uiltje nu?',da:'Hvad laver Uglen nu?',sv:'Vad gör Ugglan nu?',no:'Hva gjør Ugla nå?',es:'¿Qué está haciendo Tecolín ahorita?',it:'Che cosa sta facendo il Gufo adesso?',pt:'O que a Corujita está fazendo agora?',fr:'Que fait Chouette maintenant ?',fi:'Mitä Pöllö tekee nyt?'},
    tWrite:         {en:'What time is it? Turn the wheels.',de:'Wie spät ist es? Dreh die Räder.',nl:'Hoe laat is het? Draai aan de wieltjes.',da:'Hvad er klokken? Drej hjulene.',sv:'Vad är klockan? Vrid på hjulen.',no:'Hva er klokka? Vri på hjulene.',es:'¿Qué hora es? Gira las ruedas.',it:'Che ore sono? Gira le rotelle.',pt:'Que horas são? Gire as rodinhas.',fr:'Quelle heure est-il ? Tourne les roues.',fi:'Paljonko kello on? Pyöritä rullia.'},
    tPartners:      {en:'Which clock says {d}?',de:'Welche Uhr zeigt {d}?',nl:'Welke klok wijst {d} aan?',da:'Hvilket ur viser {d}?',sv:'Vilken klocka visar {d}?',no:'Hvilken klokke viser {d}?',es:'¿Qué reloj marca {d}?',it:'Quale orologio segna {d}?',pt:'Qual relógio mostra {d}?',fr:'Quelle horloge indique {d} ?',fi:'Mikä kello näyttää {d}?'},
    tSet:           {en:'Wind the clock {to} — {d}.',de:'Dreh die Uhr {to} – {d}.',nl:'Draai de klok door {to} – {d}.',da:'Drej uret {to} – {d}.',sv:'Vrid klockan {to} – {d}.',no:'Drei klokka {to} – {d}.',es:'Mueve las manecillas {to}: {d}.',it:'Gira le lancette {to}: {d}.',pt:'Gire os ponteiros {to}: {d}.',fr:'Avance l’horloge {to} : {d}.',fi:'Kierrä kello {to} – {d}.'},
    hintChoose:     {en:'Choose a card.',de:'Such dir eine Karte aus.',nl:'Kies een kaartje.',da:'Vælg et kort.',sv:'Välj ett kort.',no:'Velg et kort.',es:'Elige una tarjeta.',it:'Scegli una carta.',pt:'Escolha um cartão.',fr:'Choisis une carte.',fi:'Valitse kortti.'},
    hintChooseClock:{en:'Choose a clock.',de:'Such dir eine Uhr aus.',nl:'Kies een klok.',da:'Vælg et ur.',sv:'Välj en klocka.',no:'Velg en klokke.',es:'Elige un reloj.',it:'Scegli un orologio.',pt:'Escolha um relógio.',fr:'Choisis une horloge.',fi:'Valitse kello.'},
    hintWheels:     {en:'Turn the wheels to write the time.',de:'Dreh die Räder und schreib die Uhrzeit.',nl:'Draai aan de wieltjes om de tijd te schrijven.',da:'Drej hjulene for at skrive klokkeslættet.',sv:'Vrid på hjulen och skriv tiden.',no:'Vri på hjulene for å skrive klokkeslettet.',es:'Gira las ruedas para escribir la hora.',it:'Gira le rotelle per scrivere l’ora.',pt:'Gire as rodinhas para escrever a hora.',fr:'Tourne les roues pour écrire l’heure.',fi:'Pyöritä rullia ja kirjoita aika.'},
    hintWind:       {en:'Wind the key to Owl\'s time.',de:'Dreh den Schlüssel bis zu Eulchens Uhrzeit.',nl:'Draai aan de sleutel tot de tijd van Uiltje.',da:'Drej nøglen til Uglens klokkeslæt.',sv:'Vrid nyckeln till Ugglans tid.',no:'Vri nøkkelen til klokkeslettet Ugla trenger.',es:'Gira la llave hasta la hora de Tecolín.',it:'Gira la chiave fino all’ora del Gufo.',pt:'Gire a chave até a hora da Corujita.',fr:'Tourne la clé jusqu’à l’heure de Chouette.',fi:'Kierrä avainta, kunnes kello on Pöllön aika.'},
    hintBack:       {en:'Wind back until the long hand is on the 12 — then the short hand shows the hour.',de:'Dreh zurück, bis der große Zeiger auf der 12 steht – dann zeigt der kleine Zeiger die Stunde.',nl:'Draai terug tot de grote wijzer op de 12 staat – dan wijst de kleine wijzer het uur aan.',da:'Drej tilbage, til den store viser står på 12 – så viser den lille viser timen.',sv:'Vrid tillbaka tills den långa visaren står på 12 – då visar den korta visaren timmen.',no:'Vri tilbake til den store viseren står på 12 – da viser den lille viseren timen.',es:'Gira hacia atrás hasta que la manecilla larga llegue al 12: la corta queda en la hora.',it:'Gira indietro finché la lancetta lunga arriva al 12: allora la corta indica l’ora.',pt:'Volte os ponteiros até o grande chegar no 12: o pequeno fica em cima da hora.',fr:'Fais reculer les aiguilles jusqu’à ce que la grande soit sur le 12 : la petite montre l’heure.',fi:'Kierrä takaisin, kunnes pitkä viisari on 12:n kohdalla – silloin lyhyt viisari näyttää tunnin.'},
    hintShortFirst: {en:'Look at the short hand first: which hour does Owl need?',de:'Schau zuerst auf den kleinen Zeiger: Welche Stunde braucht Eulchen?',nl:'Kijk eerst naar de kleine wijzer: welk uur heeft Uiltje nodig?',da:'Se først på den lille viser: Hvilken time skal Uglen have?',sv:'Titta först på den korta visaren: vilken timme behöver Ugglan?',no:'Se først på den lille viseren: Hvilken time trenger Ugla?',es:'Mira primero la manecilla corta: ¿qué hora necesita Tecolín?',it:'Guarda prima la lancetta corta: quale ora serve al Gufo?',pt:'Olhe primeiro o ponteiro pequeno: de que hora a Corujita precisa?',fr:'Regarde d’abord la petite aiguille : de quelle heure Chouette a-t-elle besoin ?',fi:'Katso ensin lyhyttä viisaria: minkä tunnin Pöllö tarvitsee?'},
    hintCount:      {en:'The ringed number is the hour — now count on to the long hand in fives.',de:'Die Zahl im Ring ist die Stunde – zähl jetzt in Fünferschritten bis zum großen Zeiger.',nl:'Het getal in de ring is het uur – tel nu in sprongen van vijf door tot de grote wijzer.',da:'Tallet i ringen er timen – tæl nu videre i spring på fem hen til den store viser.',sv:'Talet i ringen är timmen – räkna nu vidare i femsteg fram till den långa visaren.',no:'Tallet i ringen er timen – tell nå videre i femmerhopp bort til den store viseren.',es:'El número del anillo es la hora; ahora cuenta de cinco en cinco hasta la manecilla larga.',it:'Il numero nell’anello è l’ora: ora conta di cinque in cinque fino alla lancetta lunga.',pt:'O número no anel é a hora; agora conte de cinco em cinco até o ponteiro grande.',fr:'Le nombre entouré, c’est l’heure : compte maintenant de cinq en cinq jusqu’à la grande aiguille.',fi:'Renkaan numero on tunti – laske nyt viiden välein pitkään viisariin asti.'},
    okBoard:        {en:'{say}! {evt}',de:'{say}! {evt}',nl:'{say}! {evt}',da:'{say}! {evt}',sv:'{say}! {evt}',no:'{say}! {evt}',es:'¡{say}! {evt}',it:'{say}! {evt}',pt:'{say}! {evt}',fr:'{say} ! {evt}',fi:'{say}! {evt}'},
    okWrite:        {en:'{say}!',de:'{say}!',nl:'{say}!',da:'{say}!',sv:'{say}!',no:'{say}!',es:'¡{say}!',it:'{say}!',pt:'{say}!',fr:'{say} !',fi:'{say}!'},
    okSet:          {en:'You wound the clock {to}!',de:'Du hast die Uhr {to} gestellt!',nl:'Je hebt de klok doorgedraaid {to}!',da:'Du drejede uret {to}!',sv:'Du vred klockan {to}!',no:'Du stilte klokka {to}!',es:'¡Moviste las manecillas {to}!',it:'Hai girato le lancette {to}!',pt:'Você girou os ponteiros {to}!',fr:'Tu as avancé l’horloge {to} !',fi:'Kierrit kellon {to}!'},
    ev_breakfast:   {en:'Owl is having breakfast.',de:'Eulchen frühstückt.',nl:'Uiltje ontbijt.',da:'Uglen spiser morgenmad.',sv:'Ugglan äter frukost.',no:'Ugla spiser frokost.',es:'Tecolín está desayunando.',it:'Il Gufo fa colazione.',pt:'A Corujita está tomando café da manhã.',fr:'Chouette prend son petit-déjeuner.',fi:'Pöllö syö aamupalaa.'},
    en_breakfast:   {en:'Breakfast',de:'Frühstück',nl:'Ontbijt',da:'Morgenmad',sv:'Frukost',no:'Frokost',es:'Desayuno',it:'Colazione',pt:'Café da manhã',fr:'Petit-déjeuner',fi:'Aamupala'},
    ev_reading:     {en:'Owl is reading.',de:'Eulchen liest.',nl:'Uiltje leest.',da:'Uglen læser.',sv:'Ugglan läser.',no:'Ugla leser.',es:'Tecolín está leyendo.',it:'Il Gufo legge.',pt:'A Corujita está lendo.',fr:'Chouette lit.',fi:'Pöllö lukee.'},
    en_reading:     {en:'Reading',de:'Lesen',nl:'Lezen',da:'Læsning',sv:'Läsning',no:'Lesing',es:'Lectura',it:'Lettura',pt:'Leitura',fr:'Lecture',fi:'Lukeminen'},
    ev_puzzle:      {en:'Owl is doing a puzzle.',de:'Eulchen macht ein Puzzle.',nl:'Uiltje maakt een puzzel.',da:'Uglen lægger puslespil.',sv:'Ugglan lägger pussel.',no:'Ugla legger puslespill.',es:'Tecolín está armando un rompecabezas.',it:'Il Gufo fa un puzzle.',pt:'A Corujita está montando um quebra-cabeça.',fr:'Chouette fait un puzzle.',fi:'Pöllö kokoaa palapeliä.'},
    en_puzzle:      {en:'Puzzle',de:'Puzzle',nl:'Puzzel',da:'Puslespil',sv:'Pussel',no:'Puslespill',es:'Rompecabezas',it:'Puzzle',pt:'Quebra-cabeça',fr:'Puzzle',fi:'Palapeli'},
    ev_lunch:       {en:'Owl is having lunch.',de:'Eulchen isst zu Mittag.',nl:'Uiltje luncht.',da:'Uglen spiser frokost.',sv:'Ugglan äter lunch.',no:'Ugla spiser lunsj.',es:'Tecolín está comiendo.',it:'Il Gufo pranza.',pt:'A Corujita está almoçando.',fr:'Chouette déjeune.',fi:'Pöllö syö lounasta.'},
    en_lunch:       {en:'Lunch',de:'Mittagessen',nl:'Lunch',da:'Frokost',sv:'Lunch',no:'Lunsj',es:'Comida',it:'Pranzo',pt:'Almoço',fr:'Déjeuner',fi:'Lounas'},
    ev_playground:  {en:'Owl is at the playground.',de:'Eulchen ist auf dem Spielplatz.',nl:'Uiltje is in de speeltuin.',da:'Uglen er på legepladsen.',sv:'Ugglan är på lekplatsen.',no:'Ugla er på lekeplassen.',es:'Tecolín está en los juegos.',it:'Il Gufo è al parco giochi.',pt:'A Corujita está no parquinho.',fr:'Chouette est à l’aire de jeux.',fi:'Pöllö on leikkipuistossa.'},
    en_playground:  {en:'Playground',de:'Spielplatz',nl:'Speeltuin',da:'Legeplads',sv:'Lekplats',no:'Lekeplass',es:'Juegos',it:'Parco giochi',pt:'Parquinho',fr:'Aire de jeux',fi:'Leikkipuisto'},
    ev_snack:       {en:'Owl is having a snack.',de:'Eulchen isst eine Kleinigkeit.',nl:'Uiltje eet een tussendoortje.',da:'Uglen spiser et mellemmåltid.',sv:'Ugglan äter mellanmål.',no:'Ugla spiser et mellommåltid.',es:'Tecolín está comiendo un refrigerio.',it:'Il Gufo fa merenda.',pt:'A Corujita está fazendo um lanche.',fr:'Chouette prend son goûter.',fi:'Pöllö syö välipalaa.'},
    en_snack:       {en:'Snack',de:'Zwischenmahlzeit',nl:'Tussendoortje',da:'Mellemmåltid',sv:'Mellanmål',no:'Mellommåltid',es:'Refrigerio',it:'Merenda',pt:'Lanche',fr:'Goûter',fi:'Välipala'},
    ev_music:       {en:'Owl is playing the piano.',de:'Eulchen spielt Klavier.',nl:'Uiltje speelt piano.',da:'Uglen spiller klaver.',sv:'Ugglan spelar piano.',no:'Ugla spiller piano.',es:'Tecolín está tocando el piano.',it:'Il Gufo suona il pianoforte.',pt:'A Corujita está tocando piano.',fr:'Chouette joue du piano.',fi:'Pöllö soittaa pianoa.'},
    en_music:       {en:'Piano',de:'Klavier',nl:'Piano',da:'Klaver',sv:'Piano',no:'Piano',es:'Piano',it:'Pianoforte',pt:'Piano',fr:'Piano',fi:'Piano'},
    ev_supper:      {en:'Owl is having supper.',de:'Eulchen isst zu Abend.',nl:'Uiltje eet avondeten.',da:'Uglen spiser aftensmad.',sv:'Ugglan äter middag.',no:'Ugla spiser middag.',es:'Tecolín está cenando.',it:'Il Gufo cena.',pt:'A Corujita está jantando.',fr:'Chouette dîne.',fi:'Pöllö syö päivällistä.'},
    en_supper:      {en:'Supper',de:'Abendessen',nl:'Avondeten',da:'Aftensmad',sv:'Middag',no:'Middag',es:'Cena',it:'Cena',pt:'Jantar',fr:'Dîner',fi:'Päivällinen'},
    ev_bath:        {en:'Owl is having a bath.',de:'Eulchen badet.',nl:'Uiltje neemt een bad.',da:'Uglen er i bad.',sv:'Ugglan badar.',no:'Ugla bader.',es:'Tecolín se está bañando.',it:'Il Gufo fa il bagno.',pt:'A Corujita está tomando banho.',fr:'Chouette prend son bain.',fi:'Pöllö kylpee.'},
    en_bath:        {en:'Bath',de:'Baden',nl:'Bad',da:'Bad',sv:'Bad',no:'Bad',es:'Baño',it:'Bagno',pt:'Banho',fr:'Bain',fi:'Kylpy'},
    ev_bed:         {en:'Owl is going to bed.',de:'Eulchen geht ins Bett.',nl:'Uiltje gaat naar bed.',da:'Uglen går i seng.',sv:'Ugglan går och lägger sig.',no:'Ugla legger seg.',es:'Tecolín se va a dormir.',it:'Il Gufo va a letto.',pt:'A Corujita está indo dormir.',fr:'Chouette va se coucher.',fi:'Pöllö menee nukkumaan.'},
    en_bed:         {en:'Bedtime',de:'Schlafenszeit',nl:'Bedtijd',da:'Sengetid',sv:'Läggdags',no:'Leggetid',es:'Hora de dormir',it:'Ora di dormire',pt:'Hora de dormir',fr:'Coucher',fi:'Nukkumaanmeno'},
    aClock15:       {en:'Clock: the long hand is on the 3, the short hand is just past the {h}.',de:'Uhr: Der große Zeiger steht auf der 3, der kleine Zeiger knapp nach der {h}.',nl:'Klok: de grote wijzer staat op de 3, de kleine wijzer net voorbij de {h}.',da:'Ur: Den store viser står på 3, den lille viser lige efter {h}.',sv:'Klocka: den långa visaren står på 3, den korta visaren strax efter {h}.',no:'Klokke: Den store viseren står på 3, den lille viseren like etter {h}.',es:'Reloj: la manecilla larga está en el 3 y la corta, un poco después del {h}.',it:'Orologio: la lancetta lunga è sul numero 3, quella corta subito dopo il numero {h}.',pt:'Relógio: o ponteiro grande está no 3 e o pequeno logo depois do {h}.',fr:'Horloge : la grande aiguille est sur le 3, la petite juste après le {h}.',fi:'Kello: pitkä viisari on 3:n kohdalla, lyhyt viisari juuri numeron {h} jälkeen.'},
    aClock45:       {en:'Clock: the long hand is on the 9, the short hand is close to the {h2}.',de:'Uhr: Der große Zeiger steht auf der 9, der kleine Zeiger kurz vor der {h2}.',nl:'Klok: de grote wijzer staat op de 9, de kleine wijzer vlak voor de {h2}.',da:'Ur: Den store viser står på 9, den lille viser lige før {h2}.',sv:'Klocka: den långa visaren står på 9, den korta visaren strax före {h2}.',no:'Klokke: Den store viseren står på 9, den lille viseren like før {h2}.',es:'Reloj: la manecilla larga está en el 9 y la corta, un poco antes del {h2}.',it:'Orologio: la lancetta lunga è sul numero 9, quella corta poco prima del numero {h2}.',pt:'Relógio: o ponteiro grande está no 9 e o pequeno um pouco antes do {h2}.',fr:'Horloge : la grande aiguille est sur le 9, la petite juste avant le {h2}.',fi:'Kello: pitkä viisari on 9:n kohdalla, lyhyt viisari vähän ennen numeroa {h2}.'},
    aKeyBack:       {en:'Spring key: drag round to wind back',de:'Federschlüssel: im Kreis ziehen, um zurückzudrehen',nl:'Veersleutel: rondslepen om terug te draaien',da:'Fjedernøgle: træk rundt for at dreje tilbage',sv:'Fjädernyckel: dra runt för att vrida tillbaka',no:'Fjærnøkkel: dra rundt for å vri tilbake',es:'Llave de cuerda: arrástrala en círculo para dar marcha atrás',it:'Chiave a molla: trascinala in cerchio per tornare indietro',pt:'Chave de corda: arraste em círculo para voltar',fr:'Clé à ressort : fais-la tourner pour revenir en arrière',fi:'Jousiavain: vedä ympäri, niin kello kiertyy taaksepäin'},
    aKeyOn:         {en:'Key: drag round to wind on or back',de:'Schlüssel: im Kreis ziehen, um vor- oder zurückzudrehen',nl:'Sleutel: rondslepen om vooruit of terug te draaien',da:'Nøgle: træk rundt for at dreje frem eller tilbage',sv:'Nyckel: dra runt för att vrida framåt eller bakåt',no:'Nøkkel: dra rundt for å vri fram eller tilbake',es:'Llave: arrástrala en círculo para avanzar o retroceder',it:'Chiave: trascinala in cerchio per andare avanti o indietro',pt:'Chave: arraste em círculo para avançar ou voltar',fr:'Clé : fais-la tourner pour avancer ou reculer',fi:'Avain: vedä ympäri, niin kello kiertyy eteen- tai taaksepäin'},
    aBack:          {en:'Wind back',de:'Zurückdrehen',nl:'Terugdraaien',da:'Drej tilbage',sv:'Vrid bakåt',no:'Vri tilbake',es:'Atrás',it:'Indietro',pt:'Voltar',fr:'En arrière',fi:'Taaksepäin'},
    aOn:            {en:'Wind on',de:'Vorwärtsdrehen',nl:'Vooruitdraaien',da:'Drej frem',sv:'Vrid framåt',no:'Vri fram',es:'Adelante',it:'Avanti',pt:'Avançar',fr:'En avant',fi:'Eteenpäin'},
    aHourUp:        {en:'Hour up',de:'Stunde hoch',nl:'Uur omhoog',da:'Time op',sv:'Timme upp',no:'Time opp',es:'Hora arriba',it:'Ora su',pt:'Hora para cima',fr:'Heure plus',fi:'Tunti ylös'},
    aHourDown:      {en:'Hour down',de:'Stunde runter',nl:'Uur omlaag',da:'Time ned',sv:'Timme ned',no:'Time ned',es:'Hora abajo',it:'Ora giù',pt:'Hora para baixo',fr:'Heure moins',fi:'Tunti alas'},
    aMinUp:         {en:'Minutes up',de:'Minuten hoch',nl:'Minuten omhoog',da:'Minutter op',sv:'Minuter upp',no:'Minutter opp',es:'Minutos arriba',it:'Minuti su',pt:'Minutos para cima',fr:'Minutes plus',fi:'Minuutit ylös'},
    aMinDown:       {en:'Minutes down',de:'Minuten runter',nl:'Minuten omlaag',da:'Minutter ned',sv:'Minuter ned',no:'Minutter ned',es:'Minutos abajo',it:'Minuti giù',pt:'Minutos para baixo',fr:'Minutes moins',fi:'Minuutit alas'},
    aClockN:        {en:'Clock {i}',de:'Uhr {i}',nl:'Klok {i}',da:'Ur {i}',sv:'Klocka {i}',no:'Klokke {i}',es:'Reloj {i}',it:'Orologio {i}',pt:'Relógio {i}',fr:'Horloge {i}',fi:'Kello {i}'},
    tQuarter:       {en:'With quarter hours',de:'Mit Viertelstunden',nl:'Met kwartieren',da:'Med kvarterer',sv:'Med kvartar',no:'Med kvarter',es:'Con cuartos de hora',it:'Con i quarti d’ora',pt:'Com quartos de hora',fr:'Avec les quarts d’heure',fi:'Myös vartit'},
    setRounds:      {en:'Rounds',de:'Runden',nl:'Rondes',da:'Runder',sv:'Omgångar',no:'Runder',es:'Rondas',it:'Round',pt:'Rodadas',fr:'Manches',fi:'Kierrokset'},
    rRead:          {en:'Read only',de:'Nur ablesen',nl:'Alleen aflezen',da:'Kun aflæse',sv:'Bara läsa av',no:'Bare lese av',es:'Solo leer',it:'Solo leggere',pt:'Só ler',fr:'Lire seulement',fi:'Vain lukeminen'},
    rReadSet:       {en:'Read and set',de:'Ablesen und einstellen',nl:'Aflezen en instellen',da:'Aflæse og stille',sv:'Läsa av och ställa',no:'Lese av og stille',es:'Leer y poner la hora',it:'Leggere e regolare',pt:'Ler e acertar',fr:'Lire et régler',fi:'Lukeminen ja asettaminen'}
  },/*STRINGS-END*/

  /*TIMES-BEGIN*/TIMES: {
    en: { sep:':',
      say: { o:['It\'s one o\'clock','It\'s two o\'clock','It\'s three o\'clock','It\'s four o\'clock','It\'s five o\'clock','It\'s six o\'clock','It\'s seven o\'clock','It\'s eight o\'clock','It\'s nine o\'clock','It\'s ten o\'clock','It\'s eleven o\'clock','It\'s twelve o\'clock'], h:['It\'s half past one','It\'s half past two','It\'s half past three','It\'s half past four','It\'s half past five','It\'s half past six','It\'s half past seven','It\'s half past eight','It\'s half past nine','It\'s half past ten','It\'s half past eleven','It\'s half past twelve'], q:['It\'s quarter past one','It\'s quarter past two','It\'s quarter past three','It\'s quarter past four','It\'s quarter past five','It\'s quarter past six','It\'s quarter past seven','It\'s quarter past eight','It\'s quarter past nine','It\'s quarter past ten','It\'s quarter past eleven','It\'s quarter past twelve'], t:['It\'s quarter to two','It\'s quarter to three','It\'s quarter to four','It\'s quarter to five','It\'s quarter to six','It\'s quarter to seven','It\'s quarter to eight','It\'s quarter to nine','It\'s quarter to ten','It\'s quarter to eleven','It\'s quarter to twelve','It\'s quarter to one'] },
      to: { o:['to one o\'clock','to two o\'clock','to three o\'clock','to four o\'clock','to five o\'clock','to six o\'clock','to seven o\'clock','to eight o\'clock','to nine o\'clock','to ten o\'clock','to eleven o\'clock','to twelve o\'clock'], h:['to half past one','to half past two','to half past three','to half past four','to half past five','to half past six','to half past seven','to half past eight','to half past nine','to half past ten','to half past eleven','to half past twelve'], q:['to quarter past one','to quarter past two','to quarter past three','to quarter past four','to quarter past five','to quarter past six','to quarter past seven','to quarter past eight','to quarter past nine','to quarter past ten','to quarter past eleven','to quarter past twelve'], t:['to quarter to two','to quarter to three','to quarter to four','to quarter to five','to quarter to six','to quarter to seven','to quarter to eight','to quarter to nine','to quarter to ten','to quarter to eleven','to quarter to twelve','to quarter to one'] } },
    de: { sep:':',
      say: { o:['Es ist ein Uhr','Es ist zwei Uhr','Es ist drei Uhr','Es ist vier Uhr','Es ist fünf Uhr','Es ist sechs Uhr','Es ist sieben Uhr','Es ist acht Uhr','Es ist neun Uhr','Es ist zehn Uhr','Es ist elf Uhr','Es ist zwölf Uhr'], h:['Es ist halb zwei','Es ist halb drei','Es ist halb vier','Es ist halb fünf','Es ist halb sechs','Es ist halb sieben','Es ist halb acht','Es ist halb neun','Es ist halb zehn','Es ist halb elf','Es ist halb zwölf','Es ist halb eins'], q:['Es ist Viertel nach eins','Es ist Viertel nach zwei','Es ist Viertel nach drei','Es ist Viertel nach vier','Es ist Viertel nach fünf','Es ist Viertel nach sechs','Es ist Viertel nach sieben','Es ist Viertel nach acht','Es ist Viertel nach neun','Es ist Viertel nach zehn','Es ist Viertel nach elf','Es ist Viertel nach zwölf'], t:['Es ist Viertel vor zwei','Es ist Viertel vor drei','Es ist Viertel vor vier','Es ist Viertel vor fünf','Es ist Viertel vor sechs','Es ist Viertel vor sieben','Es ist Viertel vor acht','Es ist Viertel vor neun','Es ist Viertel vor zehn','Es ist Viertel vor elf','Es ist Viertel vor zwölf','Es ist Viertel vor eins'] },
      to: { o:['auf ein Uhr','auf zwei Uhr','auf drei Uhr','auf vier Uhr','auf fünf Uhr','auf sechs Uhr','auf sieben Uhr','auf acht Uhr','auf neun Uhr','auf zehn Uhr','auf elf Uhr','auf zwölf Uhr'], h:['auf halb zwei','auf halb drei','auf halb vier','auf halb fünf','auf halb sechs','auf halb sieben','auf halb acht','auf halb neun','auf halb zehn','auf halb elf','auf halb zwölf','auf halb eins'], q:['auf Viertel nach eins','auf Viertel nach zwei','auf Viertel nach drei','auf Viertel nach vier','auf Viertel nach fünf','auf Viertel nach sechs','auf Viertel nach sieben','auf Viertel nach acht','auf Viertel nach neun','auf Viertel nach zehn','auf Viertel nach elf','auf Viertel nach zwölf'], t:['auf Viertel vor zwei','auf Viertel vor drei','auf Viertel vor vier','auf Viertel vor fünf','auf Viertel vor sechs','auf Viertel vor sieben','auf Viertel vor acht','auf Viertel vor neun','auf Viertel vor zehn','auf Viertel vor elf','auf Viertel vor zwölf','auf Viertel vor eins'] } },
    nl: { sep:'.',
      say: { o:['Het is één uur','Het is twee uur','Het is drie uur','Het is vier uur','Het is vijf uur','Het is zes uur','Het is zeven uur','Het is acht uur','Het is negen uur','Het is tien uur','Het is elf uur','Het is twaalf uur'], h:['Het is half twee','Het is half drie','Het is half vier','Het is half vijf','Het is half zes','Het is half zeven','Het is half acht','Het is half negen','Het is half tien','Het is half elf','Het is half twaalf','Het is half één'], q:['Het is kwart over één','Het is kwart over twee','Het is kwart over drie','Het is kwart over vier','Het is kwart over vijf','Het is kwart over zes','Het is kwart over zeven','Het is kwart over acht','Het is kwart over negen','Het is kwart over tien','Het is kwart over elf','Het is kwart over twaalf'], t:['Het is kwart voor twee','Het is kwart voor drie','Het is kwart voor vier','Het is kwart voor vijf','Het is kwart voor zes','Het is kwart voor zeven','Het is kwart voor acht','Het is kwart voor negen','Het is kwart voor tien','Het is kwart voor elf','Het is kwart voor twaalf','Het is kwart voor één'] },
      to: { o:['tot één uur','tot twee uur','tot drie uur','tot vier uur','tot vijf uur','tot zes uur','tot zeven uur','tot acht uur','tot negen uur','tot tien uur','tot elf uur','tot twaalf uur'], h:['tot half twee','tot half drie','tot half vier','tot half vijf','tot half zes','tot half zeven','tot half acht','tot half negen','tot half tien','tot half elf','tot half twaalf','tot half één'], q:['tot kwart over één','tot kwart over twee','tot kwart over drie','tot kwart over vier','tot kwart over vijf','tot kwart over zes','tot kwart over zeven','tot kwart over acht','tot kwart over negen','tot kwart over tien','tot kwart over elf','tot kwart over twaalf'], t:['tot kwart voor twee','tot kwart voor drie','tot kwart voor vier','tot kwart voor vijf','tot kwart voor zes','tot kwart voor zeven','tot kwart voor acht','tot kwart voor negen','tot kwart voor tien','tot kwart voor elf','tot kwart voor twaalf','tot kwart voor één'] } },
    da: { sep:'.',
      say: { o:['Klokken er et','Klokken er to','Klokken er tre','Klokken er fire','Klokken er fem','Klokken er seks','Klokken er syv','Klokken er otte','Klokken er ni','Klokken er ti','Klokken er elleve','Klokken er tolv'], h:['Klokken er halv to','Klokken er halv tre','Klokken er halv fire','Klokken er halv fem','Klokken er halv seks','Klokken er halv syv','Klokken er halv otte','Klokken er halv ni','Klokken er halv ti','Klokken er halv elleve','Klokken er halv tolv','Klokken er halv et'], q:['Klokken er kvart over et','Klokken er kvart over to','Klokken er kvart over tre','Klokken er kvart over fire','Klokken er kvart over fem','Klokken er kvart over seks','Klokken er kvart over syv','Klokken er kvart over otte','Klokken er kvart over ni','Klokken er kvart over ti','Klokken er kvart over elleve','Klokken er kvart over tolv'], t:['Klokken er kvart i to','Klokken er kvart i tre','Klokken er kvart i fire','Klokken er kvart i fem','Klokken er kvart i seks','Klokken er kvart i syv','Klokken er kvart i otte','Klokken er kvart i ni','Klokken er kvart i ti','Klokken er kvart i elleve','Klokken er kvart i tolv','Klokken er kvart i et'] },
      to: { o:['til et','til to','til tre','til fire','til fem','til seks','til syv','til otte','til ni','til ti','til elleve','til tolv'], h:['til halv to','til halv tre','til halv fire','til halv fem','til halv seks','til halv syv','til halv otte','til halv ni','til halv ti','til halv elleve','til halv tolv','til halv et'], q:['til kvart over et','til kvart over to','til kvart over tre','til kvart over fire','til kvart over fem','til kvart over seks','til kvart over syv','til kvart over otte','til kvart over ni','til kvart over ti','til kvart over elleve','til kvart over tolv'], t:['til kvart i to','til kvart i tre','til kvart i fire','til kvart i fem','til kvart i seks','til kvart i syv','til kvart i otte','til kvart i ni','til kvart i ti','til kvart i elleve','til kvart i tolv','til kvart i et'] } },
    sv: { sep:'.',
      say: { o:['Klockan är ett','Klockan är två','Klockan är tre','Klockan är fyra','Klockan är fem','Klockan är sex','Klockan är sju','Klockan är åtta','Klockan är nio','Klockan är tio','Klockan är elva','Klockan är tolv'], h:['Klockan är halv två','Klockan är halv tre','Klockan är halv fyra','Klockan är halv fem','Klockan är halv sex','Klockan är halv sju','Klockan är halv åtta','Klockan är halv nio','Klockan är halv tio','Klockan är halv elva','Klockan är halv tolv','Klockan är halv ett'], q:['Klockan är kvart över ett','Klockan är kvart över två','Klockan är kvart över tre','Klockan är kvart över fyra','Klockan är kvart över fem','Klockan är kvart över sex','Klockan är kvart över sju','Klockan är kvart över åtta','Klockan är kvart över nio','Klockan är kvart över tio','Klockan är kvart över elva','Klockan är kvart över tolv'], t:['Klockan är kvart i två','Klockan är kvart i tre','Klockan är kvart i fyra','Klockan är kvart i fem','Klockan är kvart i sex','Klockan är kvart i sju','Klockan är kvart i åtta','Klockan är kvart i nio','Klockan är kvart i tio','Klockan är kvart i elva','Klockan är kvart i tolv','Klockan är kvart i ett'] },
      to: { o:['till ett','till två','till tre','till fyra','till fem','till sex','till sju','till åtta','till nio','till tio','till elva','till tolv'], h:['till halv två','till halv tre','till halv fyra','till halv fem','till halv sex','till halv sju','till halv åtta','till halv nio','till halv tio','till halv elva','till halv tolv','till halv ett'], q:['till kvart över ett','till kvart över två','till kvart över tre','till kvart över fyra','till kvart över fem','till kvart över sex','till kvart över sju','till kvart över åtta','till kvart över nio','till kvart över tio','till kvart över elva','till kvart över tolv'], t:['till kvart i två','till kvart i tre','till kvart i fyra','till kvart i fem','till kvart i sex','till kvart i sju','till kvart i åtta','till kvart i nio','till kvart i tio','till kvart i elva','till kvart i tolv','till kvart i ett'] } },
    no: { sep:'.',
      say: { o:['Klokka er ett','Klokka er to','Klokka er tre','Klokka er fire','Klokka er fem','Klokka er seks','Klokka er sju','Klokka er åtte','Klokka er ni','Klokka er ti','Klokka er elleve','Klokka er tolv'], h:['Klokka er halv to','Klokka er halv tre','Klokka er halv fire','Klokka er halv fem','Klokka er halv seks','Klokka er halv sju','Klokka er halv åtte','Klokka er halv ni','Klokka er halv ti','Klokka er halv elleve','Klokka er halv tolv','Klokka er halv ett'], q:['Klokka er kvart over ett','Klokka er kvart over to','Klokka er kvart over tre','Klokka er kvart over fire','Klokka er kvart over fem','Klokka er kvart over seks','Klokka er kvart over sju','Klokka er kvart over åtte','Klokka er kvart over ni','Klokka er kvart over ti','Klokka er kvart over elleve','Klokka er kvart over tolv'], t:['Klokka er kvart på to','Klokka er kvart på tre','Klokka er kvart på fire','Klokka er kvart på fem','Klokka er kvart på seks','Klokka er kvart på sju','Klokka er kvart på åtte','Klokka er kvart på ni','Klokka er kvart på ti','Klokka er kvart på elleve','Klokka er kvart på tolv','Klokka er kvart på ett'] },
      to: { o:['til ett','til to','til tre','til fire','til fem','til seks','til sju','til åtte','til ni','til ti','til elleve','til tolv'], h:['til halv to','til halv tre','til halv fire','til halv fem','til halv seks','til halv sju','til halv åtte','til halv ni','til halv ti','til halv elleve','til halv tolv','til halv ett'], q:['til kvart over ett','til kvart over to','til kvart over tre','til kvart over fire','til kvart over fem','til kvart over seks','til kvart over sju','til kvart over åtte','til kvart over ni','til kvart over ti','til kvart over elleve','til kvart over tolv'], t:['til kvart på to','til kvart på tre','til kvart på fire','til kvart på fem','til kvart på seks','til kvart på sju','til kvart på åtte','til kvart på ni','til kvart på ti','til kvart på elleve','til kvart på tolv','til kvart på ett'] } },
    es: { sep:':',
      say: { o:['Es la una en punto','Son las dos en punto','Son las tres en punto','Son las cuatro en punto','Son las cinco en punto','Son las seis en punto','Son las siete en punto','Son las ocho en punto','Son las nueve en punto','Son las diez en punto','Son las once en punto','Son las doce en punto'], h:['Es la una y media','Son las dos y media','Son las tres y media','Son las cuatro y media','Son las cinco y media','Son las seis y media','Son las siete y media','Son las ocho y media','Son las nueve y media','Son las diez y media','Son las once y media','Son las doce y media'], q:['Es la una y cuarto','Son las dos y cuarto','Son las tres y cuarto','Son las cuatro y cuarto','Son las cinco y cuarto','Son las seis y cuarto','Son las siete y cuarto','Son las ocho y cuarto','Son las nueve y cuarto','Son las diez y cuarto','Son las once y cuarto','Son las doce y cuarto'], t:['Son cuarto para las dos','Son cuarto para las tres','Son cuarto para las cuatro','Son cuarto para las cinco','Son cuarto para las seis','Son cuarto para las siete','Son cuarto para las ocho','Son cuarto para las nueve','Son cuarto para las diez','Son cuarto para las once','Son cuarto para las doce','Es cuarto para la una'] },
      to: { o:['hasta la una en punto','hasta las dos en punto','hasta las tres en punto','hasta las cuatro en punto','hasta las cinco en punto','hasta las seis en punto','hasta las siete en punto','hasta las ocho en punto','hasta las nueve en punto','hasta las diez en punto','hasta las once en punto','hasta las doce en punto'], h:['hasta la una y media','hasta las dos y media','hasta las tres y media','hasta las cuatro y media','hasta las cinco y media','hasta las seis y media','hasta las siete y media','hasta las ocho y media','hasta las nueve y media','hasta las diez y media','hasta las once y media','hasta las doce y media'], q:['hasta la una y cuarto','hasta las dos y cuarto','hasta las tres y cuarto','hasta las cuatro y cuarto','hasta las cinco y cuarto','hasta las seis y cuarto','hasta las siete y cuarto','hasta las ocho y cuarto','hasta las nueve y cuarto','hasta las diez y cuarto','hasta las once y cuarto','hasta las doce y cuarto'], t:['hasta cuarto para las dos','hasta cuarto para las tres','hasta cuarto para las cuatro','hasta cuarto para las cinco','hasta cuarto para las seis','hasta cuarto para las siete','hasta cuarto para las ocho','hasta cuarto para las nueve','hasta cuarto para las diez','hasta cuarto para las once','hasta cuarto para las doce','hasta cuarto para la una'] } },
    it: { sep:':',
      say: { o:['È l’una in punto','Sono le due in punto','Sono le tre in punto','Sono le quattro in punto','Sono le cinque in punto','Sono le sei in punto','Sono le sette in punto','Sono le otto in punto','Sono le nove in punto','Sono le dieci in punto','Sono le undici in punto','È mezzogiorno'], h:['È l’una e mezza','Sono le due e mezza','Sono le tre e mezza','Sono le quattro e mezza','Sono le cinque e mezza','Sono le sei e mezza','Sono le sette e mezza','Sono le otto e mezza','Sono le nove e mezza','Sono le dieci e mezza','Sono le undici e mezza','È mezzogiorno e mezza'], q:['È l’una e un quarto','Sono le due e un quarto','Sono le tre e un quarto','Sono le quattro e un quarto','Sono le cinque e un quarto','Sono le sei e un quarto','Sono le sette e un quarto','Sono le otto e un quarto','Sono le nove e un quarto','Sono le dieci e un quarto','Sono le undici e un quarto','È mezzogiorno e un quarto'], t:['Sono le due meno un quarto','Sono le tre meno un quarto','Sono le quattro meno un quarto','Sono le cinque meno un quarto','Sono le sei meno un quarto','Sono le sette meno un quarto','Sono le otto meno un quarto','Sono le nove meno un quarto','Sono le dieci meno un quarto','Sono le undici meno un quarto','È mezzogiorno meno un quarto','È l’una meno un quarto'] },
      to: { o:['fino all’una in punto','fino alle due in punto','fino alle tre in punto','fino alle quattro in punto','fino alle cinque in punto','fino alle sei in punto','fino alle sette in punto','fino alle otto in punto','fino alle nove in punto','fino alle dieci in punto','fino alle undici in punto','fino a mezzogiorno'], h:['fino all’una e mezza','fino alle due e mezza','fino alle tre e mezza','fino alle quattro e mezza','fino alle cinque e mezza','fino alle sei e mezza','fino alle sette e mezza','fino alle otto e mezza','fino alle nove e mezza','fino alle dieci e mezza','fino alle undici e mezza','fino a mezzogiorno e mezza'], q:['fino all’una e un quarto','fino alle due e un quarto','fino alle tre e un quarto','fino alle quattro e un quarto','fino alle cinque e un quarto','fino alle sei e un quarto','fino alle sette e un quarto','fino alle otto e un quarto','fino alle nove e un quarto','fino alle dieci e un quarto','fino alle undici e un quarto','fino a mezzogiorno e un quarto'], t:['fino alle due meno un quarto','fino alle tre meno un quarto','fino alle quattro meno un quarto','fino alle cinque meno un quarto','fino alle sei meno un quarto','fino alle sette meno un quarto','fino alle otto meno un quarto','fino alle nove meno un quarto','fino alle dieci meno un quarto','fino alle undici meno un quarto','fino a mezzogiorno meno un quarto','fino all’una meno un quarto'] } },
    pt: { sep:':',
      say: { o:['É uma hora','São duas horas','São três horas','São quatro horas','São cinco horas','São seis horas','São sete horas','São oito horas','São nove horas','São dez horas','São onze horas','É meio-dia'], h:['É uma e meia','São duas e meia','São três e meia','São quatro e meia','São cinco e meia','São seis e meia','São sete e meia','São oito e meia','São nove e meia','São dez e meia','São onze e meia','É meio-dia e meia'], q:['É uma e quinze','São duas e quinze','São três e quinze','São quatro e quinze','São cinco e quinze','São seis e quinze','São sete e quinze','São oito e quinze','São nove e quinze','São dez e quinze','São onze e quinze','É meio-dia e quinze'], t:['São quinze para as duas','São quinze para as três','São quinze para as quatro','São quinze para as cinco','São quinze para as seis','São quinze para as sete','São quinze para as oito','São quinze para as nove','São quinze para as dez','São quinze para as onze','É quinze para o meio-dia','É quinze para a uma'] },
      to: { o:['até a uma hora','até as duas horas','até as três horas','até as quatro horas','até as cinco horas','até as seis horas','até as sete horas','até as oito horas','até as nove horas','até as dez horas','até as onze horas','até o meio-dia'], h:['até a uma e meia','até as duas e meia','até as três e meia','até as quatro e meia','até as cinco e meia','até as seis e meia','até as sete e meia','até as oito e meia','até as nove e meia','até as dez e meia','até as onze e meia','até o meio-dia e meia'], q:['até a uma e quinze','até as duas e quinze','até as três e quinze','até as quatro e quinze','até as cinco e quinze','até as seis e quinze','até as sete e quinze','até as oito e quinze','até as nove e quinze','até as dez e quinze','até as onze e quinze','até o meio-dia e quinze'], t:['até quinze para as duas','até quinze para as três','até quinze para as quatro','até quinze para as cinco','até quinze para as seis','até quinze para as sete','até quinze para as oito','até quinze para as nove','até quinze para as dez','até quinze para as onze','até quinze para o meio-dia','até quinze para a uma'] } },
    fr: { sep:' h ',
      say: { o:['Il est une heure','Il est deux heures','Il est trois heures','Il est quatre heures','Il est cinq heures','Il est six heures','Il est sept heures','Il est huit heures','Il est neuf heures','Il est dix heures','Il est onze heures','Il est midi'], h:['Il est une heure et demie','Il est deux heures et demie','Il est trois heures et demie','Il est quatre heures et demie','Il est cinq heures et demie','Il est six heures et demie','Il est sept heures et demie','Il est huit heures et demie','Il est neuf heures et demie','Il est dix heures et demie','Il est onze heures et demie','Il est midi et demi'], q:['Il est une heure et quart','Il est deux heures et quart','Il est trois heures et quart','Il est quatre heures et quart','Il est cinq heures et quart','Il est six heures et quart','Il est sept heures et quart','Il est huit heures et quart','Il est neuf heures et quart','Il est dix heures et quart','Il est onze heures et quart','Il est midi et quart'], t:['Il est deux heures moins le quart','Il est trois heures moins le quart','Il est quatre heures moins le quart','Il est cinq heures moins le quart','Il est six heures moins le quart','Il est sept heures moins le quart','Il est huit heures moins le quart','Il est neuf heures moins le quart','Il est dix heures moins le quart','Il est onze heures moins le quart','Il est midi moins le quart','Il est une heure moins le quart'] },
      to: { o:['jusqu’à une heure','jusqu’à deux heures','jusqu’à trois heures','jusqu’à quatre heures','jusqu’à cinq heures','jusqu’à six heures','jusqu’à sept heures','jusqu’à huit heures','jusqu’à neuf heures','jusqu’à dix heures','jusqu’à onze heures','jusqu’à midi'], h:['jusqu’à une heure et demie','jusqu’à deux heures et demie','jusqu’à trois heures et demie','jusqu’à quatre heures et demie','jusqu’à cinq heures et demie','jusqu’à six heures et demie','jusqu’à sept heures et demie','jusqu’à huit heures et demie','jusqu’à neuf heures et demie','jusqu’à dix heures et demie','jusqu’à onze heures et demie','jusqu’à midi et demi'], q:['jusqu’à une heure et quart','jusqu’à deux heures et quart','jusqu’à trois heures et quart','jusqu’à quatre heures et quart','jusqu’à cinq heures et quart','jusqu’à six heures et quart','jusqu’à sept heures et quart','jusqu’à huit heures et quart','jusqu’à neuf heures et quart','jusqu’à dix heures et quart','jusqu’à onze heures et quart','jusqu’à midi et quart'], t:['jusqu’à deux heures moins le quart','jusqu’à trois heures moins le quart','jusqu’à quatre heures moins le quart','jusqu’à cinq heures moins le quart','jusqu’à six heures moins le quart','jusqu’à sept heures moins le quart','jusqu’à huit heures moins le quart','jusqu’à neuf heures moins le quart','jusqu’à dix heures moins le quart','jusqu’à onze heures moins le quart','jusqu’à midi moins le quart','jusqu’à une heure moins le quart'] } },
    fi: { sep:'.',
      say: { o:['Kello on yksi','Kello on kaksi','Kello on kolme','Kello on neljä','Kello on viisi','Kello on kuusi','Kello on seitsemän','Kello on kahdeksan','Kello on yhdeksän','Kello on kymmenen','Kello on yksitoista','Kello on kaksitoista'], h:['Kello on puoli kaksi','Kello on puoli kolme','Kello on puoli neljä','Kello on puoli viisi','Kello on puoli kuusi','Kello on puoli seitsemän','Kello on puoli kahdeksan','Kello on puoli yhdeksän','Kello on puoli kymmenen','Kello on puoli yksitoista','Kello on puoli kaksitoista','Kello on puoli yksi'], q:['Kello on varttia yli yksi','Kello on varttia yli kaksi','Kello on varttia yli kolme','Kello on varttia yli neljä','Kello on varttia yli viisi','Kello on varttia yli kuusi','Kello on varttia yli seitsemän','Kello on varttia yli kahdeksan','Kello on varttia yli yhdeksän','Kello on varttia yli kymmenen','Kello on varttia yli yksitoista','Kello on varttia yli kaksitoista'], t:['Kello on varttia vaille kaksi','Kello on varttia vaille kolme','Kello on varttia vaille neljä','Kello on varttia vaille viisi','Kello on varttia vaille kuusi','Kello on varttia vaille seitsemän','Kello on varttia vaille kahdeksan','Kello on varttia vaille yhdeksän','Kello on varttia vaille kymmenen','Kello on varttia vaille yksitoista','Kello on varttia vaille kaksitoista','Kello on varttia vaille yksi'] },
      to: { o:['aikaan yksi','aikaan kaksi','aikaan kolme','aikaan neljä','aikaan viisi','aikaan kuusi','aikaan seitsemän','aikaan kahdeksan','aikaan yhdeksän','aikaan kymmenen','aikaan yksitoista','aikaan kaksitoista'], h:['aikaan puoli kaksi','aikaan puoli kolme','aikaan puoli neljä','aikaan puoli viisi','aikaan puoli kuusi','aikaan puoli seitsemän','aikaan puoli kahdeksan','aikaan puoli yhdeksän','aikaan puoli kymmenen','aikaan puoli yksitoista','aikaan puoli kaksitoista','aikaan puoli yksi'], q:['aikaan varttia yli yksi','aikaan varttia yli kaksi','aikaan varttia yli kolme','aikaan varttia yli neljä','aikaan varttia yli viisi','aikaan varttia yli kuusi','aikaan varttia yli seitsemän','aikaan varttia yli kahdeksan','aikaan varttia yli yhdeksän','aikaan varttia yli kymmenen','aikaan varttia yli yksitoista','aikaan varttia yli kaksitoista'], t:['aikaan varttia vaille kaksi','aikaan varttia vaille kolme','aikaan varttia vaille neljä','aikaan varttia vaille viisi','aikaan varttia vaille kuusi','aikaan varttia vaille seitsemän','aikaan varttia vaille kahdeksan','aikaan varttia vaille yhdeksän','aikaan varttia vaille kymmenen','aikaan varttia vaille yksitoista','aikaan varttia vaille kaksitoista','aikaan varttia vaille yksi'] } }
  },/*TIMES-END*/

  defaults: { times: 'half', rounds: 'readset' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: 'half', labelKey: 'tHalf' }, { value: 'quarter', labelKey: 'tQuarter' }] },
    { key: 'rounds', type: 'choice', labelKey: 'setRounds', options: [{ value: 'readset', labelKey: 'rReadSet' }, { value: 'read', labelKey: 'rRead' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._raf = 0; this._busy = false;
    injectKeyCSS();
    var self = this, themes = { 'forest creatures': 1 };
    Object.keys(PullKeyCore.DATA.EVENTS).forEach(function (e) { themes[PullKeyCore.DATA.EVENTS[e][0]] = 1; });
    if (typeof LCSPictures !== 'undefined') Object.keys(themes).forEach(function (th) { LCSPictures.load(th).then(function (t) { self._pics[th] = t; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {}); });
  },
  destroy: function () { this._stopAnim(); this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; if (!('name' in a)) a.name = this.api && this.api.t ? this.api.t('name') : 'Owl'; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return PullKeyCore.locale(((this.api && this.api.lang) || 'en')); },
  _times: function () { return PullKeyCore.timesOf(this._setting('times')); },
  _rounds: function () { return PullKeyCore.roundsOf(this._setting('rounds')); },
  _key: function () { return this._times() + '.' + this._rounds(); },
  /* time words, from the hand-authored per-locale tables (never a formula) */
  _kind: function (t) { return t.m === 0 ? 'o' : t.m === 30 ? 'h' : t.m === 15 ? 'q' : 't'; },
  _T: function () { return this.TIMES[this._loc()] || this.TIMES.en; },
  _say: function (t) { return this._T().say[this._kind(t)][t.h - 1]; },
  _to: function (t) { return this._T().to[this._kind(t)][t.h - 1]; },
  _digital: function (t) { return t.h + this._T().sep + (t.m < 10 ? '0' + t.m : String(t.m)); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = PullKeyCore.ids(this._times()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = PullKeyCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      this._order = C.plan(this._times(), Math.random, prevIds).order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._prompt(C.round(id, this._rounds())) }; this._pa = pa;
    return {
      id: 'pullkey.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _prompt: function (r) {
    if (r.type === 'board') return this._t('tBoard');
    if (r.type === 'write') return this._t('tWrite');
    if (r.type === 'partners') return this._t('tPartners', { d: this._digital(r.time) });
    return this._t('tSet', { to: this._to(r.time), d: this._digital(r.time) });
  },
  _setPrompt: function () { var line = this._prompt(this.st.r); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (id, pos) {
    var C = PullKeyCore;
    this._stopAnim(); this._clearTimers(); this._pos = pos || 0; this._busy = false;
    this.st = C.newState(C.round(id, this._rounds()));
    this._resetView(); this._setPrompt();
  },
  _resetView: function () { this._view = { ring: null, beads: 0, owl: false, bobs: 0, lit: 0, made: null, note: '', ok: '', free: false, freeT: null, stopFlash: false }; },

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
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'pk-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="pk-stage"></div><div class="pk-answer"></div><div class="pk-foot"></div><p class="pk-note" aria-live="polite"></p>';
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
  /* the geometry: the cottage — a roof band (window · cuckoo door · sign), the clock (or three) and the key column */
  _dims: function () {
    var C = PullKeyCore, w = this._width(), B = C.band(w), S = Math.min(w, 660), wide = B.wide, partners = this.st && this.st.r.type === 'partners';
    var colW = wide ? 110 : 64, roofH = wide ? 92 : B.tiny ? 64 : 72, door = wide ? 64 : 52;
    var D = { w: w, S: S, wide: wide, tiny: B.tiny, colW: colW, roofH: roofH, door: door, owl: wide ? 96 : 64, partners: partners };
    if (!partners) {
      D.r = wide ? 140 : Math.min(118, (S - colW - 28) / 2) - (B.tiny ? 4 : 0);
      var cw = 2 * D.r + 14 + colW; D.left = (S - cw) / 2;
      D.clocks = [{ cx: D.left + D.r, cy: roofH + D.r + 4, r: D.r }];
      D.colX = D.left + 2 * D.r + 14 + colW / 2; D.keyY = D.clocks[0].cy - (wide ? 54 : 40);
      D.H = roofH + 2 * D.r + 12;
    } else {
      var rp = Math.min(wide ? 80 : 60, (S - 20 - 24) / 6); D.r = rp;
      D.clocks = [0, 1, 2].map(function (i) { return { cx: S / 2 + (i - 1) * (2 * rp + 12), cy: roofH + rp + 4, r: rp }; });
      D.colX = S / 2; D.keyY = roofH + 2 * rp + 14 + (wide ? 34 : 28); D.left = (S - (6 * rp + 24)) / 2;
      D.H = D.keyY + (wide ? 34 : 28) + 8;
    }
    D.bowR = wide ? 30 : 22; D.hit = wide ? 76 : 56;
    D.doorX = S / 2 - door / 2; D.doorY = 8;
    return D;
  },
  _pol: function (c, r, deg) { var a = deg * Math.PI / 180; return { x: c.cx + r * Math.sin(a), y: c.cy - r * Math.cos(a) }; },
  _paint_: function () {
    if (!this._wrap) return;
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'pk-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.r.type + ' is-' + this._times();
    this._paintStage(D);
    this._paintAnswer(D);
    var self = this, foot = this._qs('.pk-foot'); foot.innerHTML = '';
    var ck = this._btn('pk-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || this._busy;
    ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck);
    var note = this._qs('.pk-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'pk-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'pk-note is-hint'; }
    else { note.textContent = ''; note.className = 'pk-note'; }
  },
  /* one clock face (geared hands at the given time) */
  _clockSvg: function (D, c, t, opts) {
    var C = PullKeyCore, f = function (x) { return Math.round(x * 10) / 10; }, self = this, out = '', r = c.r, small = r <= 60;
    out += '<circle cx="' + f(c.cx) + '" cy="' + f(c.cy) + '" r="' + f(r) + '" fill="#FBF3E4" stroke="' + (opts.sel ? '#146B5E' : '#8C6A45') + '" stroke-width="' + (opts.sel ? 6 : (D.wide ? 5 : 4)) + '"/>';
    /* numerals and ticks scale with the face (the three partner clocks are smaller than the cottage clock) */
    var tickL = small ? 6 : r >= 130 ? 12 : Math.max(6, Math.round(r * 0.08)), rim = (D.wide ? 5 : 4) / 2;
    for (var m = 0; m < 60; m++) { if (small && m % 5) continue; if (r < 130 && !(m % 5) && (!small || !((m / 5) % 3))) continue; var a1 = this._pol(c, r - rim - 2, m * 6), a2 = this._pol(c, r - rim - (m % 5 ? 5 : tickL), m * 6); svg_line(a1, a2, m % 5 ? 1.2 : 2.6, opts.flashTick === m ? '#F2784B' : '#3A2E1F'); }
    function svg_line(a, b, wdt, col) { out += '<line class="pk-tick" x1="' + f(a.x) + '" y1="' + f(a.y) + '" x2="' + f(b.x) + '" y2="' + f(b.y) + '" stroke="' + col + '" stroke-width="' + wdt + '" stroke-linecap="round"/>'; }
    var numF = small ? Math.max(13, Math.round(r * 0.26)) : r >= 130 ? 26 : Math.round(r * 0.19), numR = 0.76 * r;
    for (var h = 1; h <= 12; h++) {
      var q = this._pol(c, numR, h * 30), ring = opts.ring === h;
      if (small && h % 3) { out += '<circle cx="' + f(q.x) + '" cy="' + f(q.y) + '" r="2.4" fill="#3A2E1F"/>'; continue; }
      if (ring) out += '<circle class="pk-ring" cx="' + f(q.x) + '" cy="' + f(q.y) + '" r="' + f(numF * (small ? 0.62 : 0.72)) + '"/>';
      out += '<text class="pk-num' + (ring ? ' is-ring' : '') + '" x="' + f(q.x) + '" y="' + f(q.y) + '" font-size="' + numF + '" text-anchor="middle" dominant-baseline="central">' + h + '</text>';
    }
    /* miss 2: the five-minute beads from the 12 to the long hand, counted in fives */
    /* the beads sit ON the rim (clear of every numeral at every face size), one on every five-minute mark the long hand has passed — the child counts them in fives; no number is printed (it would be the minutes, the answer) */
    var beadR = small ? 3.5 : D.wide ? 5.5 : 4.5;
    if (opts.beads) for (var b = 1; b <= opts.beads; b++) { var p = this._pol(c, small ? r + 1.5 : r, b * 30); out += '<circle class="pk-bead" cx="' + f(p.x) + '" cy="' + f(p.y) + '" r="' + beadR + '"/>'; }
    var A = C.angles(t), /* hand lengths by face size: the long hand's round cap stays 2 px clear of the hour ring (measured, 320…1366) */
    sp = this._pol(c, (small ? 0.34 : r < 130 ? 0.42 : 0.44) * r, A.hour), lp2 = this._pol(c, (small ? 0.46 : r < 130 ? 0.55 : 0.58) * r, A.minute);
    out += '<line class="pk-long" x1="' + f(c.cx) + '" y1="' + f(c.cy) + '" x2="' + f(lp2.x) + '" y2="' + f(lp2.y) + '" stroke="#146B5E" stroke-width="' + (small ? 3.5 : D.wide ? 6 : 4.5) + '" stroke-linecap="round"/>';
    out += '<line class="pk-short" x1="' + f(c.cx) + '" y1="' + f(c.cy) + '" x2="' + f(sp.x) + '" y2="' + f(sp.y) + '" stroke="#F2784B" stroke-width="' + (small ? 7 : D.wide ? 12 : 9) + '" stroke-linecap="round"/>';
    out += '<circle cx="' + f(c.cx) + '" cy="' + f(c.cy) + '" r="' + (small ? 4 : D.wide ? 8 : 6) + '" fill="#C9A54E" stroke="#8C6A45" stroke-width="2"/>';
    return out;
  },
  _paintStage: function (D) {
    var C = PullKeyCore, st = this.st, r = st.r, v = this._view, stage = this._qs('.pk-stage'), self = this, f = function (x) { return Math.round(x * 10) / 10; };
    stage.style.width = D.S + 'px'; stage.style.height = D.H + 'px';
    var svg = '', wallL = Math.max(4, D.left - 10), wallR = Math.min(D.S - 4, D.left + (D.partners ? 6 * D.r + 24 : 2 * D.r + 14 + D.colW) + 10);
    /* the cottage: wall and roof band */
    svg += '<rect x="' + f(wallL) + '" y="' + f(D.roofH - 14) + '" width="' + f(wallR - wallL) + '" height="' + f(D.H - D.roofH + 12) + '" rx="12" fill="#E9D3B0" stroke="#3A2E1F" stroke-width="3"/>';
    svg += '<path d="M' + f(wallL - 6) + ' ' + f(D.roofH - 8) + ' L' + f(D.S / 2) + ' 2 L' + f(wallR + 6) + ' ' + f(D.roofH - 8) + ' Z" fill="#146B5E" stroke="#3A2E1F" stroke-width="3" stroke-linejoin="round"/>';
    /* the window: a plain daylight pane until success, then the time of day */
    var part = st.done ? C.dayPart(r.time, r.event) : 'day', wx = wallL + 16, ww = D.wide ? 64 : 44, wh = D.wide ? 44 : 32, wy = D.roofH - wh - 22;
    var sky = { day: '#CFE8F2', morning: '#FCE7B8', afternoon: '#BFE0F0', evening: '#1F4E6B' }[part];
    svg += '<rect class="pk-window is-' + part + '" x="' + f(wx) + '" y="' + f(wy) + '" width="' + ww + '" height="' + wh + '" rx="5" fill="' + sky + '" stroke="#3A2E1F" stroke-width="2.5"/><line x1="' + f(wx + ww / 2) + '" y1="' + f(wy) + '" x2="' + f(wx + ww / 2) + '" y2="' + f(wy + wh) + '" stroke="#3A2E1F" stroke-width="2"/>';
    if (part === 'evening') svg += '<path d="M' + f(wx + ww * 0.72) + ' ' + f(wy + wh * 0.2) + ' a' + f(wh * 0.26) + ' ' + f(wh * 0.26) + ' 0 1 0 ' + f(wh * 0.1) + ' ' + f(wh * 0.5) + ' a' + f(wh * 0.2) + ' ' + f(wh * 0.2) + ' 0 1 1 ' + f(-wh * 0.1) + ' ' + f(-wh * 0.5) + 'Z" fill="#F4CF62"/>';
    /* the cuckoo door (open while Owl is out) and the bob dots */
    svg += '<rect class="pk-door' + (v.owl ? ' is-open' : '') + '" x="' + f(D.doorX) + '" y="' + f(D.doorY) + '" width="' + D.door + '" height="' + D.door + '" rx="8"/>';
    if (!v.owl) svg += '<line x1="' + f(D.S / 2) + '" y1="' + f(D.doorY + 4) + '" x2="' + f(D.S / 2) + '" y2="' + f(D.doorY + D.door - 4) + '" stroke="#3A2E1F" stroke-width="2"/>';
    /* the bob dots (one per call, two rows of six) — in the key column above the key, where Owl never covers them */
    var dn = Math.max(v.bobs, 0), ds = D.wide ? 9 : 7, dg = D.wide ? 5 : 3, dx0 = D.partners ? D.colX + D.hit / 2 + 72 : D.colX - 2.5 * (ds + dg), dy0 = D.partners ? D.keyY - (ds + dg) / 2 : D.roofH + (D.wide ? 14 : 10);
    for (var d = 0; d < dn; d++) svg += '<circle class="pk-dot' + (d < v.lit ? ' is-lit' : '') + '" cx="' + f(dx0 + (d % 6) * (ds + dg)) + '" cy="' + f(dy0 + Math.floor(d / 6) * (ds + dg)) + '" r="' + ds / 2 + '"/>';
    /* the partners sign */
    if (r.type === 'partners') { var sx = wallR - (D.wide ? 120 : 84) - 12; svg += '<rect class="pk-sign" x="' + f(sx) + '" y="' + f(D.roofH - (D.wide ? 56 : 44) - 18) + '" width="' + (D.wide ? 120 : 84) + '" height="' + (D.wide ? 56 : 44) + '" rx="8"/>'; }
    /* the clock(s) */
    var self2 = this;
    D.clocks.forEach(function (c, i) {
      var t = r.type === 'partners' ? r.clocks[i] : st.shown, sel = r.type === 'partners' && st.sel === i;
      if (v.free && (r.type !== 'partners' || sel)) t = v.freeT;
      else if (r.type !== 'partners' || sel) t = C.add(t, -5 * st.back);
      svg += self2._clockSvg(D, c, t, { sel: sel, ring: (r.type !== 'partners' || sel) ? v.ring : null, beads: (r.type !== 'partners' || sel) ? v.beads : 0 });
    });
    /* the key: shaft, bow (spring = teal coil; set = pulled out, orange) */
    var setMode = (r.type === 'set' && !st.done) || v.free, ky = D.keyY, kx = D.colX;
    if (!D.partners) svg += '<rect x="' + f(D.clocks[0].cx + D.r - 4) + '" y="' + f(ky - 4) + '" width="' + f(kx - D.clocks[0].cx - D.r - D.bowR + (setMode ? 2 : 6)) + '" height="8" rx="3" fill="#B98A55" stroke="#3A2E1F" stroke-width="1.5"/>';
    svg += '<circle class="pk-bow' + (setMode ? ' is-set' : '') + (v.stopFlash ? ' is-stop' : '') + '" cx="' + f(kx) + '" cy="' + f(ky) + '" r="' + D.bowR + '"/><circle cx="' + f(kx) + '" cy="' + f(ky) + '" r="' + f(D.bowR * 0.45) + '" fill="#E9D3B0" stroke="#3A2E1F" stroke-width="2"/>';
    svg += '<circle cx="' + f(kx) + '" cy="' + f(ky) + '" r="' + f(D.hit / 2) + '" fill="none" stroke="#8C6A45" stroke-width="1.5" stroke-dasharray="3 5" opacity=".7"/>';
    stage.innerHTML = '<svg class="pk-svg" width="' + f(D.S) + '" height="' + f(D.H) + '" viewBox="0 0 ' + f(D.S) + ' ' + f(D.H) + '" aria-hidden="true" focusable="false">' + svg + '</svg>';
    /* the sign's time (a real element, readable) */
    if (r.type === 'partners') { var sg = this.api.el('span', 'pk-signtext'); sg.textContent = this._digital(r.time); var sw = D.wide ? 120 : 84, sh = D.wide ? 56 : 44; sg.style.left = (wallR - sw - 12) + 'px'; sg.style.top = (D.roofH - sh - 18) + 'px'; sg.style.width = sw + 'px'; sg.style.height = sh + 'px'; stage.appendChild(sg); }
    /* what the clock says, for a screen reader */
    var ct = C.clockOf(st) || r.time, sr = this.api.el('p', 'pk-sr'); sr.textContent = this._aria(C.face(st, ct) || ct); stage.appendChild(sr);
    /* partners: each clock is a button */
    if (r.type === 'partners') D.clocks.forEach(function (c, i) { var b = self._btn('pk-clockhit' + (st.sel === i ? ' is-sel' : ''), 'clock-' + i, self._t('aClockN', { i: i + 1 }) + ': ' + self._aria(r.clocks[i])); b.style.left = (c.cx - c.r) + 'px'; b.style.top = (c.cy - c.r) + 'px'; b.style.width = b.style.height = (2 * c.r) + 'px'; b.disabled = st.done || self._busy; b.addEventListener('click', function () { self._select(i); }); stage.appendChild(b); });
    /* the key's grip and its two buttons */
    var keyOn = !this._busy && (setMode || (!st.done && (r.type !== 'partners' || st.sel != null)));
    var kb = this._btn('pk-key', 'key', this._t(setMode ? 'aKeyOn' : 'aKeyBack'));
    kb.style.left = (kx - D.hit / 2) + 'px'; kb.style.top = (ky - D.hit / 2) + 'px'; kb.style.width = kb.style.height = D.hit + 'px'; kb.disabled = !keyOn;
    kb.addEventListener('pointerdown', function (e) { self._dragKey(e); });
    kb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { self._step(-1); e.preventDefault(); } else if (e.key === 'ArrowRight') { self._step(1); e.preventDefault(); } });
    stage.appendChild(kb);
    var bw = 48, bh = 44, by = D.partners ? ky - bh / 2 : ky + D.hit / 2 + 8, bx = D.partners ? kx - D.hit / 2 - 12 - bw : kx - (D.wide ? bw + 6 : bw / 2);
    var back = this._btn('pk-arrow', 'back', this._t('aBack'), '◀'); back.style.left = bx + 'px'; back.style.top = by + 'px'; back.disabled = !keyOn; back.addEventListener('click', function () { self._step(-1); }); stage.appendChild(back);
    if (setMode) { var on = this._btn('pk-arrow', 'on', this._t('aOn'), '▶'); on.style.left = (D.partners ? kx + D.hit / 2 + 12 : D.wide ? kx + 6 : kx - bw / 2) + 'px'; on.style.top = (D.partners || D.wide ? by : by + bh + 6) + 'px'; on.disabled = !keyOn; on.addEventListener('click', function () { self._step(1); }); stage.appendChild(on); }
    /* Owl, out of the door with the event's picture */
    if (v.owl) {
      var ow = this._pic(C.DATA.OWL); if (ow) { ow.className = 'pk-owl' + (this.FAST ? '' : ' is-bob'); ow.alt = ''; ow.style.width = ow.style.height = D.owl + 'px'; ow.style.left = (D.S / 2 - D.owl / 2) + 'px'; ow.style.top = (D.doorY - 4) + 'px'; stage.appendChild(ow); }
      var ev = r.event && this._pic(C.DATA.EVENTS[r.event]); if (ev) { ev.className = 'pk-evpic'; ev.alt = ''; ev.style.width = ev.style.height = D.owl + 'px'; ev.style.left = (D.S / 2 + D.owl / 2 + 4) + 'px'; ev.style.top = (D.doorY + 4) + 'px'; stage.appendChild(ev); }
    }
  },
  _pic: function (pair) { var th = this._pics[pair[0]]; if (!th || typeof LCSPictures === 'undefined') return null; return LCSPictures.img(th, pair[1], this._loc(), {}); },
  _aria: function (t) { var k = t.m === 0 ? 'aClock00' : t.m === 30 ? 'aClock30' : t.m === 15 ? 'aClock15' : 'aClock45'; return this._t(k, { h: t.h, h2: t.h % 12 + 1 }); },
  _paintAnswer: function (D) {
    var C = PullKeyCore, st = this.st, r = st.r, box = this._qs('.pk-answer'), self = this, v = this._view;
    box.innerHTML = ''; box.className = 'pk-answer is-' + r.type;
    if (r.type === 'board') r.cards.forEach(function (c, i) {
      var b = self._btn('pk-card' + (st.pick === i ? ' is-picked' : '') + (st.done && st.pick === i ? ' is-right' : ''), 'card-' + i, self._t('en_' + c.event) + ', ' + self._digital(c.t));
      var im = self._pic(C.DATA.EVENTS[c.event]); if (im) { im.alt = ''; im.className = 'pk-cardpic'; b.appendChild(im); }
      var tg = self.api.el('span', 'pk-tag'); tg.textContent = self._digital(c.t); b.appendChild(tg);
      b.disabled = st.done || self._busy; b.addEventListener('click', function () { self._pick(i); }); box.appendChild(b);
    });
    if (r.type === 'write') {
      var tag = this.api.el('div', 'pk-wheels'); tag.setAttribute('role', 'group');
      var col = function (part, val, up, down) {
        var c = self.api.el('div', 'pk-wheel');
        var u = self._btn('pk-wbtn', part + '-up', self._t(up), '▲'); u.disabled = st.done; u.addEventListener('click', function () { self._wheel(part, 1); });
        var vv = self.api.el('span', 'pk-wval'); vv.textContent = val;
        var dn = self._btn('pk-wbtn', part + '-down', self._t(down), '▼'); dn.disabled = st.done; dn.addEventListener('click', function () { self._wheel(part, -1); });
        c.appendChild(u); c.appendChild(vv); c.appendChild(dn); tag.appendChild(c);
      };
      col('h', String(st.wheels.h), 'aHourUp', 'aHourDown');
      var sep = this.api.el('span', 'pk-sep'); sep.textContent = this._T().sep.trim() || this._T().sep; tag.appendChild(sep);
      col('m', st.wheels.m < 10 ? '0' + st.wheels.m : String(st.wheels.m), 'aMinUp', 'aMinDown');
      box.appendChild(tag);
    }
    if (r.type === 'set') {
      var tt = this.api.el('span', 'pk-tag is-target'); tt.textContent = this._digital(r.time); box.appendChild(tt);
      if (v.made) { var mt = this.api.el('span', 'pk-tag is-made'); mt.textContent = this._digital(v.made); box.appendChild(mt); }
    }
  },

  /* ---------------- motion ---------------- */
  _stopAnim: function () { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; } },
  _reduced: function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } },
  _run: function (steps, done) {
    var self = this; this._stopAnim();
    if (this.FAST || this._reduced() || typeof requestAnimationFrame === 'undefined') { steps.forEach(function (s) { s.fn(1); }); this._paint(); if (done) done(); return; }
    var i = 0, t0 = 0;
    var tick = function (now) {
      if (!t0) t0 = now;
      var s = steps[i], p = s.ms ? Math.min(1, (now - t0) / s.ms) : 1;
      s.fn(p); self._paint_();
      if (p >= 1) { i++; t0 = 0; if (i >= steps.length) { self._raf = 0; if (done) done(); return; } }
      self._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  },
  /* the spring rewinds to the o'clock by itself, rings the hour, holds, then whirrs back */
  _autoRewind: function (then) {
    var C = PullKeyCore, st = this.st, v = this._view, self = this, t = C.clockOf(st); if (!t) { if (then) then(); return; }
    var n = C.backToHour(t), steps = [];
    for (var k = 0; k < n; k++) steps.push({ ms: 75, fn: function (p) { if (p >= 1) C.windBack(st); } });
    steps.push({ ms: 0, fn: function () { v.ring = C.face(st, t).h; v.stopFlash = true; } });
    steps.push({ ms: 700, fn: function () {} });
    steps.push({ ms: 0, fn: function () { C.release(st); v.stopFlash = false; } });
    this._busy = true;
    this._run(steps, function () { self._busy = false; self._paint(); if (then) then(); });
  },

  /* ---------------- actions ---------------- */
  _fresh: function () { this._stopAnim(); var keep = this._view.free ? { free: true, freeT: this._view.freeT } : null; this._resetView(); if (keep) { this._view.free = true; this._view.freeT = keep.freeT; } },
  _pick: function (i) { if (this._busy || this.st.done) return; if (PullKeyCore.pick(this.st, i) === 'picked') { this._fresh(); this.api.sound(440); this._paint(); } },
  _select: function (i) { if (this._busy || this.st.done) return; if (PullKeyCore.select(this.st, i) === 'selected') { this._fresh(); this.api.sound(440); this._paint(); } },
  _wheel: function (part, dir) { if (this._busy || this.st.done) return; if (PullKeyCore.wheel(this.st, part, dir, this._times()) === 'turned') { this._fresh(); this.api.sound(500); this._paint(); } },
  /* ◀ / ▶ and the arrow keys: read = the full spring rewind; set = one detent; free play = five minutes */
  _step: function (dir) {
    var C = PullKeyCore, st = this.st, v = this._view;
    if (this._busy) return;
    if (v.free) { this._freeStep(dir); return; }
    if (st.done) return;
    if (st.r.type === 'set') { if (C.windOn(st, dir, this._times()) === 'wound') { this._fresh(); this.api.sound(900); this._paint(); } return; }
    if (dir > 0) return;
    if (st.r.type === 'partners' && st.sel == null) return;
    this._fresh(); this._autoRewind();
  },
  _freeStep: function (dir) {
    var C = PullKeyCore, v = this._view, before = v.freeT, self = this;
    v.freeT = C.add(v.freeT, 5 * dir); this.api.sound(900);
    if (v.freeT.m === 0) { v.owl = true; v.bobs = C.bobs(v.freeT); v.lit = v.bobs; this._later(function () { v.owl = false; self._paint(); }, 900); }
    this._paint(); if (before) this._advance(3500);
  },
  /* the key by DRAG: thirty degrees of turn = five minutes */
  _dragKey: function (e) {
    var C = PullKeyCore, st = this.st, v = this._view, self = this;
    if (this._busy || (e.button != null && e.button !== 0)) return;
    var D = this._dims(), R = this._qs('.pk-stage').getBoundingClientRect(), cx = R.left + D.colX, cy = R.top + D.keyY;
    var ang = function (ev) { return Math.atan2(ev.clientX - cx, cy - ev.clientY) * 180 / Math.PI; };
    var last = ang(e), acc = 0, moved = false, setMode = (st.r.type === 'set' && !st.done) || v.free;
    if (!setMode && (st.done || (st.r.type === 'partners' && st.sel == null))) return;
    e.preventDefault(); this._fresh(); v = this._view;
    var move = function (ev) {
      var a = ang(ev), d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; acc += d;
      while (Math.abs(acc) >= 30) {
        var dir = acc > 0 ? 1 : -1; acc -= 30 * dir; moved = true;
        if (v.free) { self._freeStep(dir); continue; }
        if (setMode) { C.windFive(st, dir); self.api.sound(900); }
        else if (dir < 0) { var res = C.windBack(st); if (res === 'click') self.api.sound(900); if ((res === 'stop' || (res === 'click' && st.back === C.backToHour(C.clockOf(st)))) && !v.stopFlash) { v.ring = C.face(st).h; v.stopFlash = true; self.api.sound(180); } }
      }
      self._paint_();
    };
    var up = function () {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (setMode && !v.free) { C.settle(st, self._times()); self._paint(); return; }
      if (!setMode && st.back > 0) {
        var reached = v.stopFlash; v.stopFlash = false;
        if (reached) v.ring = C.face(st).h;
        C.release(st); self.api.sound(600); self._paint();
      }
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _check: function () {
    var C = PullKeyCore, st = this.st, self = this, v;
    if (this._busy || st.done) return;
    this._fresh(); v = this._view;
    var a = C.check(st);
    if (a.result === 'none') { this.api.sound(200); v.note = this._t(a.hint); this._paint(); this.api.announce(v.note); return; }
    if (a.result === 'ok') {
      var t = st.r.time, steps = [{ ms: 0, fn: function () { v.owl = true; v.bobs = C.bobs(t); v.lit = 0; } }];
      for (var b = 1; b <= C.bobs(t); b++) (function (b) { steps.push({ ms: 260, fn: function (p) { if (p >= 1) v.lit = b; } }); })(b);
      this._busy = true;
      this._run(steps, function () {
        self._busy = false; v.free = true; v.freeT = { h: t.h, m: t.m };
        v.ok = self._okText(); self.api.sound(880); self._paint(); self.api.announce(v.ok);
        self._advance(v.ok.length * 60 + 3200);
      });
      return;
    }
    /* a miss: read rounds — the spring winds back by itself to show the hour; set rounds — the time made beside the target */
    this.api.sound(220);
    var key = C.hint(st).key, miss2 = st.show >= 2;
    var finish = function () {
      if (miss2) { var tt = st.r.type === 'set' ? st.r.time : (C.clockOf(st) || st.r.time); v.beads = tt.m / 5; v.ring = st.r.type === 'set' ? null : tt.h; }
      v.note = self._t(key); self._paint(); self.api.announce(v.note);
    };
    if (st.r.type === 'set') { v.made = { h: st.shown.h, m: st.shown.m }; finish(); return; }
    this._autoRewind(finish);
  },
  _okText: function () {
    var r = this.st.r, t = r.time;
    if (r.type === 'board') return this._t('okBoard', { say: this._say(t), evt: this._t('ev_' + r.event) });
    if (r.type === 'set') return this._t('okSet', { to: this._to(t) });
    return this._t('okWrite', { say: this._say(t) });
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

var pkCssDone = false;
function injectKeyCSS() {
  if (pkCssDone || typeof document === 'undefined') return;
  pkCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.pk-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .pk-wrap:focus{outline:none;} .pk-wrap.is-narrow{gap:8px;} .pk-wrap.is-tiny{gap:6px;}'
  + '.pk-stage{position:relative;} .pk-svg{display:block;overflow:visible;}'
  + '.pk-num{font-family:' + H + ';font-weight:700;fill:#3A2E1F;} .pk-num.is-ring{fill:#146B5E;} .pk-ring{fill:#DFF0EA;stroke:#146B5E;stroke-width:3;}'
  + '.pk-bead{fill:#F4CF62;stroke:#C9A54E;stroke-width:1.5;}'
  + '.pk-door{fill:#7A4A2A;stroke:#3A2E1F;stroke-width:2.5;} .pk-door.is-open{fill:#2B1A10;}'
  + '.pk-dot{fill:#E2D2B4;stroke:#8C6A45;stroke-width:1;} .pk-dot.is-lit{fill:#F4CF62;stroke:#C9A54E;}'
  + '.pk-sign{fill:#FFF8E7;stroke:#3A2E1F;stroke-width:3;} .pk-signtext{position:absolute;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:30px;color:#0F4A40;pointer-events:none;} .pk-wrap.is-narrow .pk-signtext{font-size:22px;}'
  + '.pk-bow{fill:#C9A54E;stroke:#3A2E1F;stroke-width:3;} .pk-bow.is-set{fill:#F2784B;} .pk-bow.is-stop{fill:#E8B84A;stroke:#146B5E;stroke-width:4;}'
  + '.pk-key{position:absolute;border:0;border-radius:50%;background:transparent;padding:0;cursor:grab;touch-action:none;z-index:3;} .pk-key:disabled{cursor:default;}'
  + '.pk-arrow{position:absolute;width:48px;height:44px;border:0;border-radius:12px;background:#FFF8E7;box-shadow:inset 0 0 0 2px #B98A55,0 3px 0 #B98A55;font-size:18px;color:#3A2E1F;cursor:pointer;z-index:3;} .pk-arrow:disabled{opacity:.4;cursor:default;}'
  + '.pk-clockhit{position:absolute;border:0;border-radius:50%;background:transparent;padding:0;cursor:pointer;z-index:2;} .pk-clockhit.is-sel{box-shadow:0 0 0 4px #F4CF62;}'
  + '.pk-owl{position:absolute;display:block;pointer-events:none;z-index:4;} .pk-owl.is-bob{animation:pkBob .5s ease-in-out 3;} @keyframes pkBob{50%{transform:translateY(-8px);}} .pk-evpic{position:absolute;display:block;pointer-events:none;z-index:4;}'
  + '.pk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;margin:0;}'
  + '.pk-answer{display:flex;gap:12px;justify-content:center;align-items:center;width:100%;max-width:620px;} .pk-wrap.is-narrow .pk-answer{gap:8px;} .pk-answer.is-partners{display:none;}'
  + '.pk-card{flex:1 1 0;max-width:190px;border:0;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #E2D2B4,0 3px 0 #E2D2B4;padding:8px 6px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:transform .08s;}'
  + '.pk-cardpic{display:block;width:96px;height:96px;} .pk-wrap.is-narrow .pk-cardpic{width:64px;height:64px;}'
  + '.pk-card.is-picked{transform:translateY(-3px);box-shadow:inset 0 0 0 4px #146B5E,0 4px 0 #0E5E50;} .pk-card.is-right{box-shadow:inset 0 0 0 4px #F4CF62,0 4px 0 #C9A54E;} .pk-card:disabled{cursor:default;}'
  + '.pk-tag{display:inline-flex;align-items:center;justify-content:center;padding:2px 12px;border-radius:10px;background:#0E3B34;color:#FFF8E7;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1.2;} .pk-wrap.is-narrow .pk-tag{font-size:22px;padding:2px 8px;}'
  + '.pk-tag.is-target{font-size:36px;} .pk-tag.is-made{background:#9E978C;color:#fff;font-size:28px;}'
  + '.pk-wheels{display:flex;align-items:center;gap:6px;padding:8px 12px;border-radius:14px;background:#0E3B34;} .pk-wheel{display:flex;flex-direction:column;align-items:center;gap:4px;}'
  + '.pk-wbtn{width:48px;height:44px;border:0;border-radius:10px;background:#FFF8E7;color:#0E3B34;font-size:16px;cursor:pointer;} .pk-wbtn:disabled{opacity:.4;}'
  + '.pk-wval{min-width:64px;text-align:center;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1.1;color:#FFF8E7;} .pk-sep{font-family:' + H + ';font-weight:800;font-size:36px;color:#FFF8E7;} .pk-wrap.is-narrow .pk-wval{font-size:30px;min-width:52px;line-height:1;} .pk-wrap.is-narrow .pk-wheels{padding:5px 10px;} .pk-wrap.is-narrow .pk-wheel{gap:2px;}'
  /* tiny: the arrows stand beside the numeral (▲ over ▼), so the wheels are two buttons tall, not three rows — keeps Check above a 320 px fold in every locale */
  + '.pk-wrap.is-tiny .pk-wheel{display:grid;grid-template-columns:auto auto;column-gap:4px;row-gap:2px;align-items:center;} .pk-wrap.is-tiny .pk-wheel .pk-wval{grid-column:1;grid-row:1 / span 2;} .pk-wrap.is-tiny .pk-wheel .pk-wbtn{grid-column:2;width:44px;} .pk-wrap.is-tiny .pk-wheels{gap:8px;padding:5px 8px;}'
  + '.pk-foot{display:flex;justify-content:center;} .pk-check{min-width:150px;min-height:54px;padding:0 26px;border:0;border-radius:16px;background:#1E8C78;color:#fff;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0E5E50;} .pk-check:disabled{opacity:.5;cursor:default;}'
  + '.pk-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .pk-note.is-hint{color:#8A3B1F;} .pk-wrap.is-narrow .pk-note{font-size:17px;}'
  + '.pk-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var s = document.createElement('style'); s.id = 'pk-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.PullKeyActivity = PullKeyActivity;
