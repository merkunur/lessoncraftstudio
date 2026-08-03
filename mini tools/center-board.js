/* =====================================================================
   TOOL #27 — CENTER BOARD   (center-board.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #9 — the Wave-2 lead: center /
   station rotation management, the #1 requested feature in K-3 teacher
   communities. A POCKET CHART, not a matrix: big station cards with a
   recessed dock well; each team's animal card sits in its well; tap
   Rotate → every card slides one station over (FLIP, 700ms, staggered;
   the wrap-around card arcs above the row) with the warm three-note
   chime + spoken "Time to rotate!".

   ROTATION MODEL (the correctness heart): perm[g] = the station index
   of group g (identity at start). Rotate = perm[g]=(perm[g]+1)%k for
   all g. A manual drag-override SWAPS perm entries (drop on an occupied
   station swaps the two groups), so the permutation stays a bijection
   and the ring is never broken: k rotations = identity, always, even
   after overrides. groups < stations is legal (resting stations);
   groups > stations is disallowed with a nudge (silent double-up welds
   pairs dishonestly).

   THE ROUND TIMER: the class-timer wall-clock engine pattern copied
   inline (absolute endAt; one 250ms repaint tick; edge-triggered
   dedupe cues; visibilitychange ctx.resume-then-check; wake lock).
   At 0:00 the wedge rests and the Rotate button breathes a warm glow —
   NO auto-rotate, ever: the teacher's tap is the transition.

   CONSUMES `lcs:my-classes:v1` (shipped by Name Sticks): the import
   chip maps groupings[activeClassId].cups → teams with the shared
   animal identities. Writes to my-classes round-trip unknown keys and
   never touch the groupings slot (one slot, two writers = clobber).

   Assign-to-center links: a station may carry a lessoncraftstudio.com
   URL (https, host-allowlisted, lookalikes rejected) surfaced as a QR
   (the new /api/qr?u= route) + copyable link + a printable station
   card. No PII can ride these URLs.
   ===================================================================== */
var CenterBoard = {
  id: 'center-board',

  strings: {
    title:        {en:'Center Board',de:'Stationen-Tafel',fr:'Tableau des ateliers',it:'Tabellone degli angoli',es:'Tablero de rincones',pt:'Quadro de cantinhos',nl:'Hoekenbord',sv:'Stationstavla',da:'Værkstedstavle',no:'Stasjonstavle',fi:'Työpistetaulu'},
    instruction:  {en:'Every team has a station. When it’s time, tap Rotate — the cards slide to the next station.',de:'Jedes Team hat eine Station. Wenn es Zeit ist, tippe auf Wechseln — die Karten wandern zur nächsten Station.',fr:'Chaque équipe a son atelier. Quand c’est l’heure, on appuie sur « On tourne ! » — les cartes glissent vers l’atelier suivant.',it:'Ogni squadra ha il suo angolo. Quando è il momento, tocca Ruota — le carte scivolano all’angolo successivo.',es:'Cada equipo tiene su rincón. Cuando sea hora, toca «¡A rotar!» y las tarjetas pasan al siguiente rincón.',pt:'Cada time tem seu cantinho. Na hora certa, toque em Trocar — os cartões deslizam para o próximo cantinho.',nl:'Elk groepje heeft zijn eigen hoek. Als het tijd is, tik je op Doordraaien — de kaartjes schuiven door naar de volgende hoek.',sv:'Varje lag har en station. När det är dags trycker du på Byt — korten glider vidare till nästa station.',da:'Hvert hold har et værksted. Når det er tid, tryk på Skift — kortene glider videre til næste værksted.',no:'Hvert lag har sin stasjon. Når tiden er inne, trykk på Bytt — kortene glir til neste stasjon.',fi:'Jokaisella ryhmällä on oma piste. Kun on aika, napauta Vaihda — kortit liukuvat seuraavalle pisteelle.'},
    /* 12 station-name defaults (teacher-editable free text seeds) */
    stListening:  {en:'Listening',de:'Hörstation',fr:'Écoute',it:'Ascolto',es:'Escuchar',pt:'Escuta',nl:'Luisterhoek',sv:'Lyssna',da:'Lyttehjørne',no:'Lyttekrok',fi:'Kuuntelu'},
    stLibrary:    {en:'Library',de:'Leseecke',fr:'Bibliothèque',it:'Biblioteca',es:'Biblioteca',pt:'Leitura',nl:'Leeshoek',sv:'Läshörna',da:'Læsehjørne',no:'Lesekrok',fi:'Lukunurkka'},
    stMath:       {en:'Math Table',de:'Mathe-Tisch',fr:'Maths',it:'Matematica',es:'Matemáticas',pt:'Mesa de matemática',nl:'Rekenhoek',sv:'Mattebord',da:'Matematikbord',no:'Mattebord',fi:'Matikkapöytä'},
    stTeacher:    {en:'Teacher Time',de:'Lehrertisch',fr:'Avec la maîtresse',it:'Con la maestra',es:'Con la maestra',pt:'Com a professora',nl:'Bij de juf',sv:'Hos läraren',da:'Hos læreren',no:'Lærerstasjon',fi:'Open pöytä'},
    stWriting:    {en:'Writing',de:'Schreibstation',fr:'Écriture',it:'Scrittura',es:'Escritura',pt:'Escrita',nl:'Schrijfhoek',sv:'Skrivhörna',da:'Skrivehjørne',no:'Skrivekrok',fi:'Kirjoittaminen'},
    stArt:        {en:'Art',de:'Kreativecke',fr:'Arts plastiques',it:'Arte',es:'Arte',pt:'Arte',nl:'Knutselhoek',sv:'Skapande',da:'Kreahjørne',no:'Formingskrok',fi:'Askartelu'},
    stComputer:   {en:'Computers',de:'Tablet-Station',fr:'Tablettes',it:'Tablet',es:'Tabletas',pt:'Tablets',nl:'Computerhoek',sv:'Surfplattor',da:'Tablets',no:'Nettbrett',fi:'Tabletit'},
    stBlocks:     {en:'Building',de:'Bauecke',fr:'Construction',it:'Costruzioni',es:'Construcción',pt:'Construção',nl:'Bouwhoek',sv:'Bygghörna',da:'Byggehjørne',no:'Byggekrok',fi:'Rakentelu'},
    stScience:    {en:'Science',de:'Forscherecke',fr:'Sciences',it:'Scienze',es:'Ciencias',pt:'Ciências',nl:'Ontdekhoek',sv:'Forskarhörna',da:'Forskerhjørne',no:'Forskerkrok',fi:'Tutkimus'},
    stWordWork:   {en:'Word Work',de:'Wörterwerkstatt',fr:'Étude de mots',it:'Officina delle parole',es:'Taller de palabras',pt:'Oficina de palavras',nl:'Letterhoek',sv:'Ordverkstad',da:'Ordværksted',no:'Ordverksted',fi:'Sanapaja'},
    stGames:      {en:'Games',de:'Spielecke',fr:'Jeux',it:'Giochi',es:'Juegos',pt:'Jogos',nl:'Spelletjeshoek',sv:'Spel',da:'Spillehjørne',no:'Spillkrok',fi:'Pelit'},
    stDiscovery:  {en:'Discovery',de:'Entdeckerstation',fr:'Découverte',it:'Scoperta',es:'Descubrimiento',pt:'Descoberta',nl:'Themahoek',sv:'Upptäck',da:'Opdagerhjørne',no:'Oppdagerkrok',fi:'Löytöretki'},
    /* team names — VERBATIM the shipped Name Sticks values (byte-match gated) */
    teamFox:      {en:'Fox team',de:'Team Fuchs',fr:'Équipe Renard',it:'Squadra Volpe',es:'Equipo Zorro',pt:'Time Raposa',nl:'Team Vos',sv:'Rävlaget',da:'Ræveholdet',no:'Revelaget',fi:'Ketut'},
    teamTurtle:   {en:'Turtle team',de:'Team Schildkröte',fr:'Équipe Tortue',it:'Squadra Tartaruga',es:'Equipo Tortuga',pt:'Time Tartaruga',nl:'Team Schildpad',sv:'Sköldpaddslaget',da:'Skildpaddeholdet',no:'Skilpaddelaget',fi:'Kilpikonnat'},
    teamBee:      {en:'Bee team',de:'Team Biene',fr:'Équipe Abeille',it:'Squadra Ape',es:'Equipo Abeja',pt:'Time Abelha',nl:'Team Bij',sv:'Bi-laget',da:'Biholdet',no:'Bielaget',fi:'Mehiläiset'},
    teamRabbit:   {en:'Rabbit team',de:'Team Hase',fr:'Équipe Lapin',it:'Squadra Coniglio',es:'Equipo Conejo',pt:'Time Coelho',nl:'Team Konijn',sv:'Kaninlaget',da:'Kaninholdet',no:'Kaninlaget',fi:'Puput'},
    teamWhale:    {en:'Whale team',de:'Team Wal',fr:'Équipe Baleine',it:'Squadra Balena',es:'Equipo Ballena',pt:'Time Baleia',nl:'Team Walvis',sv:'Val-laget',da:'Hvalholdet',no:'Hvallaget',fi:'Valaat'},
    teamOwl:      {en:'Owl team',de:'Team Eule',fr:'Équipe Hibou',it:'Squadra Gufo',es:'Equipo Búho',pt:'Time Coruja',nl:'Team Uil',sv:'Ugglelaget',da:'Ugleholdet',no:'Uglelaget',fi:'Pöllöt'},

    /* board + dock */
    rotate:       {en:'Rotate!',de:'Wechseln!',fr:'On tourne !',it:'Ruota!',es:'¡A rotar!',pt:'Trocar!',nl:'Doordraaien!',sv:'Byt!',da:'Skift!',no:'Bytt!',fi:'Vaihda!'},
    roundOf:      {en:'Round {n} of {m}',de:'Runde {n} von {m}',fr:'Tour {n} sur {m}',it:'Turno {n} di {m}',es:'Ronda {n} de {m}',pt:'Rodada {n} de {m}',nl:'Ronde {n} van {m}',sv:'Runda {n} av {m}',da:'Runde {n} af {m}',no:'Runde {n} av {m}',fi:'Kierros {n} / {m}'},
    rounds:       {en:'Rounds',de:'Runden',fr:'Tours',it:'Turni',es:'Rondas',pt:'Rodadas',nl:'Rondes',sv:'Rundor',da:'Runder',no:'Runder',fi:'Kierrokset'},
    minutes:      {en:'Minutes',de:'Minuten',fr:'Minutes',it:'Minuti',es:'Minutos',pt:'Minutos',nl:'Minuten',sv:'Minuter',da:'Minutter',no:'Minutter',fi:'Minuutit'},
    startRound:   {en:'Start the round',de:'Runde starten',fr:'Lancer le tour',it:'Avvia il turno',es:'Empezar la ronda',pt:'Começar a rodada',nl:'Ronde starten',sv:'Starta rundan',da:'Start runden',no:'Start runden',fi:'Aloita kierros'},
    pauseRound:   {en:'Pause',de:'Pause',fr:'Pause',it:'Pausa',es:'Pausa',pt:'Pausar',nl:'Pauze',sv:'Paus',da:'Pause',no:'Pause',fi:'Tauko'},
    resumeRound:  {en:'Resume',de:'Weiter',fr:'Reprendre',it:'Riprendi',es:'Continuar',pt:'Continuar',nl:'Verder',sv:'Fortsätt',da:'Fortsæt',no:'Fortsett',fi:'Jatka'},
    plusMin:      {en:'+1 min',de:'+1 Min.',fr:'+1 min',it:'+1 min',es:'+1 min',pt:'+1 min',nl:'+1 min',sv:'+1 min',da:'+1 min.',no:'+1 min',fi:'+1 min'},
    resting:      {en:'Resting this round',de:'Diese Runde frei',fr:'Au repos ce tour-ci',it:'A riposo questo turno',es:'Descansa esta ronda',pt:'De folga nesta rodada',nl:'Deze ronde vrij',sv:'Vilar denna runda',da:'Har fri denne runde',no:'Fri denne runden',fi:'Lepää tällä kierroksella'},
    doneLine:     {en:'Centers are finished for today.',de:'Die Stationen sind für heute geschafft.',fr:'Les ateliers sont terminés pour aujourd’hui.',it:'Gli angoli sono finiti per oggi.',es:'Los rincones terminaron por hoy.',pt:'Os cantinhos acabaram por hoje.',nl:'Het hoekenwerk zit erop voor vandaag.',sv:'Stationerna är klara för i dag.',da:'Værkstederne er færdige for i dag.',no:'Stasjonene er ferdige for i dag.',fi:'Kaikki pisteet on kierretty tältä päivältä.'},
    startFresh:   {en:'Start the day over',de:'Tag neu starten',fr:'Recommencer la journée',it:'Ricomincia la giornata',es:'Empezar el día de nuevo',pt:'Recomeçar o dia',nl:'De dag opnieuw beginnen',sv:'Börja om dagen',da:'Start dagen forfra',no:'Start dagen på nytt',fi:'Aloita päivä alusta'},
    /* voice lines */
    voiceRotate:  {en:'Time to rotate!',de:'Zeit zum Wechseln!',fr:'On change d’atelier !',it:'Si cambia angolo!',es:'¡Hora de rotar!',pt:'Hora de trocar de cantinho!',nl:'Tijd om door te draaien!',sv:'Dags att byta!',da:'Tid til at skifte!',no:'Tid for å bytte!',fi:'On aika vaihtaa!'},
    voiceOneMin:  {en:'One minute — clean-up time!',de:'Noch eine Minute — Zeit zum Aufräumen!',fr:'Encore une minute — on range !',it:'Un minuto — si riordina!',es:'Un minuto — ¡a recoger!',pt:'Falta um minuto — hora de arrumar!',nl:'Nog één minuut — opruimen!',sv:'En minut kvar — dags att städa!',da:'Ét minut tilbage — ryd op!',no:'Ett minutt — ryddetid!',fi:'Vielä minuutti — siivousaika!'},
    /* setup panel */
    setup:        {en:'Set up the board',de:'Tafel einrichten',fr:'Préparer le tableau',it:'Prepara il tabellone',es:'Preparar el tablero',pt:'Montar o quadro',nl:'Bord instellen',sv:'Ställ in tavlan',da:'Indstil tavlen',no:'Sett opp tavlen',fi:'Muokkaa taulua'},
    stationsLbl:  {en:'Stations',de:'Stationen',fr:'Ateliers',it:'Angoli',es:'Rincones',pt:'Cantinhos',nl:'Hoeken',sv:'Stationer',da:'Værksteder',no:'Stasjoner',fi:'Pisteet'},
    teamsLbl:     {en:'Teams',de:'Teams',fr:'Équipes',it:'Squadre',es:'Equipos',pt:'Times',nl:'Groepjes',sv:'Lag',da:'Hold',no:'Lag',fi:'Ryhmät'},
    addStation:   {en:'Add a station',de:'Station hinzufügen',fr:'Ajouter un atelier',it:'Aggiungi un angolo',es:'Agregar un rincón',pt:'Adicionar cantinho',nl:'Hoek toevoegen',sv:'Lägg till station',da:'Tilføj værksted',no:'Legg til stasjon',fi:'Lisää piste'},
    addTeam:      {en:'Add a team',de:'Team hinzufügen',fr:'Ajouter une équipe',it:'Aggiungi una squadra',es:'Agregar un equipo',pt:'Adicionar time',nl:'Groepje toevoegen',sv:'Lägg till lag',da:'Tilføj hold',no:'Legg til lag',fi:'Lisää ryhmä'},
    importTeams:  {en:'Use today’s teams from Name Sticks',de:'Die heutigen Teams aus den Namensstäbchen übernehmen',fr:'Reprendre les équipes du jour depuis les Bâtonnets de prénoms',it:'Usa le squadre di oggi dai Bastoncini dei nomi',es:'Usar los equipos de hoy de Palitos con nombre',pt:'Usar os times de hoje dos Palitos de nomes',nl:'De groepjes van vandaag uit Beurtenstokjes overnemen',sv:'Använd dagens lag från Namnpinnar',da:'Brug dagens hold fra Navnepinde',no:'Bruk dagens lag fra Navnepinner',fi:'Tuo tämän päivän ryhmät Nimitikuista'},
    noteLbl:      {en:'A note for the helper or substitute (optional)',de:'Ein Hinweis für Helfer oder Vertretung (optional)',fr:'Une consigne pour l’ATSEM ou le remplaçant (facultatif)',it:'Una nota per l’aiutante o il supplente (facoltativa)',es:'Una nota para el ayudante o el suplente (opcional)',pt:'Um recado para o ajudante ou substituto (opcional)',nl:'Een notitie voor de hulpouder of de invaller (optioneel)',sv:'En lapp till resursen eller vikarien (valfritt)',da:'En seddel til hjælperen eller vikaren (valgfrit)',no:'En lapp til hjelperen eller vikaren (valgfritt)',fi:'Viesti avustajalle tai sijaiselle (valinnainen)'},
    linkLbl:      {en:'Paste a LessonCraftStudio link (optional)',de:'LessonCraftStudio-Link einfügen (optional)',fr:'Collez un lien LessonCraftStudio (facultatif)',it:'Incolla un link LessonCraftStudio (facoltativo)',es:'Pega un enlace de LessonCraftStudio (opcional)',pt:'Cole um link do LessonCraftStudio (opcional)',nl:'Plak een LessonCraftStudio-link (optioneel)',sv:'Klistra in en LessonCraftStudio-länk (valfritt)',da:'Indsæt et LessonCraftStudio-link (valgfrit)',no:'Lim inn en LessonCraftStudio-lenke (valgfritt)',fi:'Liitä LessonCraftStudio-linkki (valinnainen)'},
    linkBad:      {en:'Only LessonCraftStudio links work here.',de:'Hier funktionieren nur LessonCraftStudio-Links.',fr:'Seuls les liens LessonCraftStudio fonctionnent ici.',it:'Qui funzionano solo i link LessonCraftStudio.',es:'Aquí solo funcionan enlaces de LessonCraftStudio.',pt:'Só links do LessonCraftStudio funcionam aqui.',nl:'Alleen LessonCraftStudio-links werken hier.',sv:'Bara LessonCraftStudio-länkar fungerar här.',da:'Kun LessonCraftStudio-links virker her.',no:'Bare LessonCraftStudio-lenker virker her.',fi:'Vain LessonCraftStudio-linkit toimivat tässä.'},
    noiseLbl:     {en:'Voice level',de:'Arbeitslautstärke',fr:'Niveau de voix',it:'Volume della voce',es:'Nivel de voz',pt:'Nível de voz',nl:'Stemgebruik',sv:'Ljudnivå',da:'Stemmeniveau',no:'Stemmebruk',fi:'Äänitaso'},
    noiseOff:     {en:'No badge',de:'Kein Zeichen',fr:'Sans badge',it:'Nessun cartellino',es:'Sin letrero',pt:'Sem plaquinha',nl:'Geen pictogram',sv:'Ingen skylt',da:'Intet skilt',no:'Uten skilt',fi:'Ei merkkiä'},
    noise0:       {en:'Silent',de:'Still',fr:'Silence',it:'Silenzio',es:'Silencio',pt:'Silêncio',nl:'Stil',sv:'Tyst',da:'Helt stille',no:'Stille',fi:'Hiljaisuus'},
    noise1:       {en:'Whisper',de:'Flüstern',fr:'Chuchotement',it:'Sussurro',es:'Susurro',pt:'Cochicho',nl:'Fluisterstem',sv:'Viskning',da:'Hviskestemme',no:'Hviskestemme',fi:'Kuiskaus'},
    noise2:       {en:'Partner voices',de:'Partnerstimme',fr:'Voix basse',it:'Voce da coppia',es:'Voz baja',pt:'Voz de dupla',nl:'Maatjesstem',sv:'Samtalsröst',da:'Makkerstemme',no:'Samarbeidsstemme',fi:'Hiljainen puhe'},
    mergeNudge:   {en:'Add a station or merge two teams — every team needs a seat.',de:'Füge eine Station hinzu oder lege zwei Teams zusammen — jedes Team braucht einen Platz.',fr:'Ajoutez un atelier ou fusionnez deux équipes — chaque équipe a besoin d’une place.',it:'Aggiungi un angolo o unisci due squadre — ogni squadra ha bisogno di un posto.',es:'Agrega un rincón o junta dos equipos — cada equipo necesita un lugar.',pt:'Adicione um cantinho ou junte dois times — todo time precisa de um lugar.',nl:'Voeg een hoek toe of voeg twee groepjes samen — elk groepje heeft een plek nodig.',sv:'Lägg till en station eller slå ihop två lag — varje lag behöver en plats.',da:'Tilføj et værksted eller slå to hold sammen — hvert hold skal have en plads.',no:'Legg til en stasjon eller slå sammen to lag — hvert lag trenger en plass.',fi:'Lisää piste tai yhdistä kaksi ryhmää — jokainen ryhmä tarvitsee paikan.'},
    deleteBtn:    {en:'Delete',de:'Löschen',fr:'Supprimer',it:'Elimina',es:'Eliminar',pt:'Excluir',nl:'Verwijderen',sv:'Ta bort',da:'Slet',no:'Slett',fi:'Poista'},
    emptyGroups:  {en:'Shake your class into teams in Name Sticks — or add a team here.',de:'Schüttle deine Klasse mit den Namensstäbchen in Teams — oder füge hier ein Team hinzu.',fr:'Secouez le pot des Bâtonnets de prénoms pour former les équipes — ou ajoutez une équipe ici.',it:'Forma le squadre nei Bastoncini dei nomi — o aggiungine una qui.',es:'Forma los equipos en Palitos con nombre — o agrega uno aquí.',pt:'Chacoalhe a turma em times nos Palitos de nomes — ou adicione um time aqui.',nl:'Schud in Beurtenstokjes je klas in groepjes — of voeg hier zelf een groepje toe.',sv:'Skaka fram lagen i Namnpinnar — eller lägg till ett lag här.',da:'Ryst holdene frem i Navnepinde — eller tilføj et hold her.',no:'Rist ut lagene i Navnepinner — eller legg til et lag her.',fi:'Ravista luokka ryhmiin Nimitikuissa — tai lisää ryhmä tähän.'},
    /* QR overlay */
    qrTitle:      {en:'Open this at the station',de:'An der Station öffnen',fr:'À ouvrir à l’atelier',it:'Da aprire nell’angolo',es:'Abre esto en el rincón',pt:'Abra isto no cantinho',nl:'Open dit in de hoek',sv:'Öppna det här vid stationen',da:'Åbn dette ved værkstedet',no:'Åpne dette på stasjonen',fi:'Avaa tämä pisteellä'},
    copyLink:     {en:'Copy the link',de:'Link kopieren',fr:'Copier le lien',it:'Copia il link',es:'Copiar el enlace',pt:'Copiar o link',nl:'Link kopiëren',sv:'Kopiera länken',da:'Kopiér linket',no:'Kopier lenken',fi:'Kopioi linkki'},
    copied:       {en:'Copied!',de:'Kopiert!',fr:'Copié !',it:'Copiato!',es:'¡Copiado!',pt:'Copiado!',nl:'Gekopieerd!',sv:'Kopierat!',da:'Kopieret!',no:'Kopiert!',fi:'Kopioitu!'},
    printCard:    {en:'Print the station card',de:'Stationskarte drucken',fr:'Imprimer la carte d’atelier',it:'Stampa il cartellino dell’angolo',es:'Imprimir la tarjeta del rincón',pt:'Imprimir o cartão do cantinho',nl:'Hoekkaart afdrukken',sv:'Skriv ut stationskortet',da:'Print værkstedskortet',no:'Skriv ut stasjonskortet',fi:'Tulosta pistekortti'},
    /* gates + settings */
    gateSize:     {en:'Bigger boards are part of Premium — two stations are always free.',de:'Größere Tafeln gehören zu Premium — zwei Stationen bleiben immer kostenlos.',fr:'Les grands tableaux font partie de Premium — deux ateliers restent gratuits.',it:'I tabelloni più grandi fanno parte di Premium — due angoli restano gratuiti.',es:'Los tableros más grandes son parte de Premium — dos rincones siempre son gratis.',pt:'Quadros maiores fazem parte do Premium — dois cantinhos são sempre grátis.',nl:'Grotere borden horen bij Premium — twee hoeken blijven altijd gratis.',sv:'Större tavlor ingår i Premium — två stationer är alltid gratis.',da:'Større tavler er en del af Premium — to værksteder er altid gratis.',no:'Større tavler er en del av Premium — to stasjoner er alltid gratis.',fi:'Isommat taulut kuuluvat Premiumiin — kaksi pistettä saat aina ilmaiseksi.'},
    gateLink:     {en:'Station links and QR cards are part of Premium.',de:'Stations-Links und QR-Karten gehören zu Premium.',fr:'Les liens d’atelier et les cartes QR font partie de Premium.',it:'I link degli angoli e i cartellini QR fanno parte di Premium.',es:'Los enlaces de cada rincón y las tarjetas QR son parte de Premium.',pt:'Os links dos cantinhos e os cartões QR fazem parte do Premium.',nl:'Links en QR-kaarten voor de hoeken horen bij Premium.',sv:'Stationslänkar och QR-kort ingår i Premium.',da:'Værkstedslinks og QR-kort er en del af Premium.',no:'Stasjonslenker og QR-kort er en del av Premium.',fi:'Pistelinkit ja QR-kortit kuuluvat Premiumiin.'},
    gateSave:     {en:'Saved boards are part of Premium — today’s board works free, it just won’t be here tomorrow.',de:'Gespeicherte Tafeln gehören zu Premium — die heutige Tafel ist kostenlos, sie ist morgen nur nicht mehr da.',fr:'Les tableaux enregistrés font partie de Premium — le tableau du jour fonctionne gratuitement, il ne sera simplement plus là demain.',it:'I tabelloni salvati fanno parte di Premium — quello di oggi funziona gratis, solo che domani non ci sarà.',es:'Los tableros guardados son parte de Premium — el de hoy funciona gratis, solo que mañana no estará.',pt:'Quadros salvos fazem parte do Premium — o de hoje funciona grátis, só não estará aqui amanhã.',nl:'Opgeslagen borden horen bij Premium — het bord van vandaag werkt gratis, het is er morgen alleen niet meer.',sv:'Sparade tavlor ingår i Premium — dagens tavla funkar gratis, den finns bara inte kvar i morgon.',da:'Gemte tavler er en del af Premium — dagens tavle virker gratis, den er her bare ikke i morgen.',no:'Lagrede tavler er en del av Premium — dagens tavle virker gratis, den er bare borte i morgen.',fi:'Tallennetut taulut kuuluvat Premiumiin — tämän päivän taulu toimii ilmaiseksi, se ei vain säily huomiseen.'},
    unlock:       {en:'Unlock the whole board',de:'Die ganze Tafel freischalten',fr:'Débloquer tout le tableau',it:'Sblocca tutto il tabellone',es:'Desbloquear todo el tablero',pt:'Desbloquear o quadro todo',nl:'Het hele bord ontgrendelen',sv:'Lås upp hela tavlan',da:'Lås hele tavlen op',no:'Lås opp hele tavlen',fi:'Avaa koko taulu'},
    setNames:     {en:'Show names on team cards',de:'Namen auf Teamkarten zeigen',fr:'Afficher les prénoms sur les cartes',it:'Mostra i nomi sulle carte',es:'Mostrar nombres en las tarjetas',pt:'Mostrar nomes nos cartões dos times',nl:'Namen op de groepskaartjes tonen',sv:'Visa namn på lagkorten',da:'Vis navne på holdkortene',no:'Vis navn på lagkortene',fi:'Näytä nimet ryhmäkorteissa'},
    setVoice:     {en:'Voice announcements',de:'Sprachansagen',fr:'Annonces vocales',it:'Annunci vocali',es:'Avisos de voz',pt:'Avisos por voz',nl:'Gesproken aankondigingen',sv:'Röstuppläsning',da:'Oplæste beskeder',no:'Stemme som sier ifra',fi:'Puhutut ilmoitukset'},
    setChimes:    {en:'Chimes',de:'Klänge',fr:'Carillons',it:'Campanellini',es:'Campanitas',pt:'Sininhos',nl:'Belletjes',sv:'Plingljud',da:'Klokkelyd',no:'Klanger',fi:'Merkkiäänet'},
    loading:      {en:'Setting out the stations…',de:'Die Stationen werden aufgebaut…',fr:'On installe les ateliers…',it:'Prepariamo gli angoli…',es:'Acomodando los rincones…',pt:'Arrumando os cantinhos…',nl:'De hoeken worden klaargezet…',sv:'Stationerna ställs fram…',da:'Værkstederne stilles frem…',no:'Stasjonene settes fram…',fi:'Pisteitä laitetaan valmiiksi…'}
  },

  defaults: { showNames: true, voice: true, chimes: true },
  settings: [
    { key:'showNames', type:'toggle', labelKey:'setNames' },
    { key:'voice', type:'toggle', labelKey:'setVoice' },
    { key:'chimes', type:'toggle', labelKey:'setChimes' }
  ],

  MC_KEY: 'lcs:my-classes:v1',
  STORE_KEY: 'lcs:center-board:v1',
  SESSION_KEY: 'lcs:center-board:session',
  ENT_TRUST_DAYS: 14,
  ALLOWED_HOSTS: ['www.lessoncraftstudio.com', 'lessoncraftstudio.com'],
  TEAMS: [
    { key:'teamFox', color:'#F2784B', animal:'fox', ink:'#fff' },
    { key:'teamTurtle', color:'#146B5E', animal:'turtle', ink:'#fff' },
    { key:'teamBee', color:'#F2C879', animal:'bee', ink:'#1F2A28' },
    { key:'teamRabbit', color:'#BFE3DC', animal:'rabbit', ink:'#1F2A28' },
    { key:'teamWhale', color:'#8B6BAE', animal:'whale', ink:'#fff' },
    { key:'teamOwl', color:'#4A90B8', animal:'owl', ink:'#fff' }
  ],
  /* the 6 animal glyphs — copied verbatim from Name Sticks */
  ANIMALS: {
    fox:      '<path d="M5 7 L9 11 M19 7 L15 11" stroke-width="2.2"/><path d="M5 7 Q12 4 19 7 Q20 15 12 19 Q4 15 5 7 Z"/><circle cx="9.5" cy="12" r="1" fill="#146B5E"/><circle cx="14.5" cy="12" r="1" fill="#146B5E"/><path d="M12 14 l0 2" stroke-width="2"/>',
    turtle:   '<path d="M5 14 Q12 4 19 14 Z"/><path d="M9 13 l0 -4 M15 13 l0 -4 M12 14 l0 -6" stroke-width="1.6"/><ellipse cx="12" cy="16" rx="9" ry="2.6"/><circle cx="20" cy="13.5" r="1.8"/>',
    bee:      '<ellipse cx="12" cy="13" rx="7" ry="5.6"/><path d="M9 8.5 l0 9 M12 7.6 l0 10.8 M15 8.5 l0 9" stroke-width="2"/><ellipse cx="7" cy="6" rx="3.4" ry="2.2"/><ellipse cx="17" cy="6" rx="3.4" ry="2.2"/>',
    rabbit:   '<ellipse cx="9" cy="6" rx="2.2" ry="5"/><ellipse cx="15" cy="6" rx="2.2" ry="5"/><circle cx="12" cy="15" r="6.4"/><circle cx="10" cy="14" r="1" fill="#146B5E"/><circle cx="14" cy="14" r="1" fill="#146B5E"/>',
    whale:    '<path d="M4 13 Q12 6 20 13 Q16 19 12 19 Q8 19 4 13 Z"/><path d="M17 8 Q18 4 15 4 M17 8 Q20 6 20 3" stroke-width="1.8"/><circle cx="9" cy="13" r="1" fill="#146B5E"/>',
    owl:      '<circle cx="12" cy="13" r="8"/><circle cx="9" cy="11" r="2.8"/><circle cx="15" cy="11" r="2.8"/><circle cx="9" cy="11" r="1" fill="#146B5E"/><circle cx="15" cy="11" r="1" fill="#146B5E"/><path d="M12 13 l-1.4 2 2.8 0 Z" fill="#146B5E"/>'
  },
  /* 12 station glyphs — the same 24×24 teal line-art language */
  STATION_ICONS: {
    listening: '<path d="M5 13 a7 7 0 0 1 14 0" fill="none" stroke-width="2.2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/>',
    library:   '<path d="M12 6 C 9 4 5 4 3 5 V 18 C 5 17 9 17 12 19 C 15 17 19 17 21 18 V 5 C 19 4 15 4 12 6 Z"/><path d="M12 6 V 19" stroke-width="1.6"/>',
    math:      '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10 h16 M9 5 v14 M15 5 v14" stroke-width="1.6"/><circle cx="6.5" cy="7.5" r="1.1" fill="#146B5E"/><circle cx="12" cy="14.5" r="1.1" fill="#146B5E"/>',
    teacher:   '<path d="M12 7 C 10 4 5 5 5 9 C 5 12 9 15 12 17 C 15 15 19 12 19 9 C 19 5 14 4 12 7 Z"/><path d="M4 20 Q 12 17 20 20" stroke-width="2" fill="none"/>',
    writing:   '<path d="M5 19 L7 13 L16 4 L20 8 L11 17 Z"/><path d="M14 6 L18 10" stroke-width="1.6"/><path d="M5 19 L9 18" stroke-width="1.8"/>',
    art:       '<path d="M7 17 C 3 13 6 4 13 4 C 19 4 21 9 19 12 L 12 19 C 10 21 8 19 7 17 Z"/><circle cx="10" cy="8" r="1.2" fill="#146B5E"/><circle cx="15" cy="8.5" r="1.2" fill="#146B5E"/><path d="M18 17 q1.4 2.4 0 3.4 q-1.6 1 -2.2-1" fill="#146B5E"/>',
    computer:  '<rect x="4" y="4" width="16" height="16" rx="2.6"/><rect x="7" y="7" width="10" height="8" rx="1.2" stroke-width="1.6"/><circle cx="12" cy="17.4" r="1" fill="#146B5E"/>',
    blocks:    '<rect x="8" y="4" width="8" height="5.5" rx="1"/><rect x="4" y="10.5" width="8" height="5.5" rx="1"/><rect x="12.5" y="10.5" width="8" height="5.5" rx="1"/><rect x="8" y="17" width="8" height="3.6" rx="1"/>',
    science:   '<path d="M12 20 C 6 20 4 15 6 11 C 8 7 12 4 19 4 C 19 12 17 20 12 20 Z"/><path d="M6 19 Q10 14 15 9" fill="none" stroke-width="1.8"/>',
    wordwork:  '<rect x="3.5" y="8" width="7.5" height="8" rx="1.4"/><rect x="13" y="8" width="7.5" height="8" rx="1.4"/><path d="M6 13 h2.4 M7.2 10.6 v4" stroke-width="1.6"/><path d="M15.4 13.4 q1.3-3.4 2.6 0" fill="none" stroke-width="1.6"/>',
    games:     '<path d="M9 4 h6 v5 h5 v6 h-5 v5 h-6 v-5 h-5 v-6 h5 Z"/><circle cx="12" cy="12" r="1.4" fill="#146B5E"/>',
    discovery: '<circle cx="12" cy="12" r="8.4"/><path d="M12 3.6 v16.8 M3.6 12 h16.8 M6 6.8 c4 2.6 8 2.6 12 0 M6 17.2 c4-2.6 8-2.6 12 0" fill="none" stroke-width="1.4"/>'
  },
  ICON_KEYS: ['listening', 'library', 'math', 'teacher', 'writing', 'art', 'computer', 'blocks', 'science', 'wordwork', 'games', 'discovery'],
  ICON_NAME_KEY: { listening:'stListening', library:'stLibrary', math:'stMath', teacher:'stTeacher', writing:'stWriting', art:'stArt', computer:'stComputer', blocks:'stBlocks', science:'stScience', wordwork:'stWordWork', games:'stGames', discovery:'stDiscovery' },
  NOISE_ICONS: {
    0: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8 L21 16 M21 8 L16 16" stroke-width="2"/>',
    1: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 10.5 a3 3 0 0 1 0 3" fill="none" stroke-width="2"/>',
    2: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9 a5 5 0 0 1 0 6 M18.5 7 a8 8 0 0 1 0 10" fill="none" stroke-width="2"/>'
  },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    var self = this;
    this.api = api;
    this.premium = false;
    this._audio = null;
    this._wakeLock = null;

    this._store = this._loadJSON(localStorage, this.STORE_KEY) || {};
    if (!this._store.v) this._store.v = 1;
    if (!this._store.boards) this._store.boards = {};
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    this._mc = this._loadJSON(localStorage, this.MC_KEY) || {};

    var params = new URLSearchParams(location.search);
    var cid = params.get('class');
    if (cid && (this._mc.classes || []).some(function (c) { return c.id === cid; })) this._mc.activeClassId = cid;

    this._resolveBoard();
    this._dayRoll();

    this._ticker = setInterval(function () { self._tick(); }, 250);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'visible') return;
      if (self._audio && self._audio.state === 'suspended') { try { self._audio.resume(); } catch (_) {} }
      self._tick();
      if (self.board && self.board.timer && self.board.timer.phase === 'running') self._requestWakeLock();
    });

    this._fetchEntitlement();
  },

  _loadJSON: function (store, key) {
    try { return JSON.parse(store.getItem(key)); } catch (_) { return null; }
  },
  _dateKey: function () {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  },
  _boardKey: function () {
    if (this.premium && this._mc.activeClassId) return this._mc.activeClassId;
    return 'solo';
  },
  _resolveBoard: function () {
    var key = this._boardKey();
    if (key === 'solo') {
      var s = this._loadJSON(sessionStorage, this.SESSION_KEY);
      this.board = (s && s.stations) ? s : this._newBoard();
    } else {
      this.board = this._store.boards[key] || this._newBoard();
      this._store.boards[key] = this.board;
    }
    /* a round that finished while we were away renders done SILENTLY —
       no gesture means no honest audio (the class-timer rule). Runs on
       EVERY resolve: entitlement lands async and swaps the board. */
    var t = this.board.timer;
    if (t && t.phase === 'running' && (!t.endAt || t.endAt <= Date.now())) {
      t.phase = 'done';
      t.endFired = true;
      t.endAt = null;
    }
  },
  _newBoard: function () {
    var api = this.api;
    return {
      stations: [
        { id: this._uid('st_'), icon: 'listening', name: api.t('stListening') },
        { id: this._uid('st_'), icon: 'teacher', name: api.t('stTeacher') }
      ],
      groups: [],
      perm: [],
      round: 1,
      roundsTotal: 0,           /* 0 = default to stations.length */
      timer: { phase: 'idle', duration: 900, endAt: null, remainingAtPause: null, oneMinFired: false, endFired: false },
      dateKey: this._dateKey()
    };
  },
  /* new LOCAL day: keep the setup, reset the rotation + timer */
  _dayRoll: function () {
    var b = this.board;
    if (b.dateKey !== this._dateKey()) {
      b.dateKey = this._dateKey();
      b.perm = b.groups.map(function (_, i) { return i; });
      b.round = 1;
      b.timer = { phase: 'idle', duration: b.timer ? b.timer.duration : 900, endAt: null, remainingAtPause: null, oneMinFired: false, endFired: false };
      this._save();
    }
  },
  _save: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
    if (this._boardKey() === 'solo') {
      try { sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(this.board)); } catch (_) {}
      try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
    } else {
      st.boards[this._boardKey()] = this.board;
      try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
    }
  },
  _uid: function (prefix) {
    var s = '';
    try {
      var a = new Uint32Array(2);
      crypto.getRandomValues(a);
      s = a[0].toString(36) + a[1].toString(36);
    } catch (_) { s = Math.random().toString(36).slice(2, 10); }
    return prefix + s.slice(0, 8);
  },
  _hash: function (str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h;
  },

  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; self._resolveBoard(); if (self._wrap) self.render(); }
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
        self._resolveBoard();
        self._save();
        if (self._wrap) self.render();
      })
      .catch(function () { trustCache(); });
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  _roundsTotal: function () {
    return this.board.roundsTotal || Math.max(1, this.board.stations.length);
  },

  /* ======================= the rotation engine ====================== */

  _rotate: function () {
    var b = this.board;
    var k = b.stations.length;
    if (!b.groups.length || !k) return;
    if (b.round >= this._roundsTotal() && this._doneShown) return;
    /* FLIP first: capture old positions */
    var first = this._cardRects();
    for (var g = 0; g < b.perm.length; g++) b.perm[g] = (b.perm[g] + 1) % k;
    b.round += 1;
    /* the rotate resets the round timer to idle for the new round */
    b.timer.phase = 'idle';
    b.timer.endAt = null;
    b.timer.oneMinFired = false;
    b.timer.endFired = false;
    this._releaseWakeLock();
    this._save();
    this._log('rotate', b.perm.slice());
    if (this.api.settings.chimes) this._chime();
    if (this.premium && this.api.settings.voice) this._speak('voiceRotate');
    this.api.announce(this.api.t('voiceRotate'));
    this.render();
    this._flip(first);
  },
  _cardRects: function () {
    var out = {};
    (this._wrap || document).querySelectorAll('.cbd-groupcard').forEach(function (el) {
      out[el.getAttribute('data-group')] = el.getBoundingClientRect();
    });
    return out;
  },
  _flip: function (first) {
    if (this._reducedMotion()) return;
    var b = this.board;
    var k = b.stations.length;
    (this._wrap || document).querySelectorAll('.cbd-groupcard').forEach(function (el) {
      var id = el.getAttribute('data-group');
      var f = first[id];
      if (!f) return;
      var l = el.getBoundingClientRect();
      var dx = f.left - l.left, dy = f.top - l.top;
      if (!dx && !dy) return;
      var gi = parseInt(el.getAttribute('data-gi'), 10);
      var wrapped = b.perm[gi] === 0 && k > 1;   /* landed back at the first station */
      var stagger = (b.perm[gi] % k) * 60;
      if (wrapped && k > 2) {
        el.animate([
          { transform: 'translate(' + dx + 'px,' + dy + 'px)', opacity: 1 },
          { transform: 'translate(' + (dx / 2) + 'px,' + (dy / 2 - 34) + 'px) scale(0.92)', opacity: 0.65, offset: 0.5 },
          { transform: 'translate(0,0)', opacity: 1 }
        ], { duration: 850, delay: stagger, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'backwards' });
      } else {
        el.animate([
          { transform: 'translate(' + dx + 'px,' + dy + 'px)' },
          { transform: 'translate(0,0)' }
        ], { duration: 700, delay: stagger, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'backwards' });
      }
    });
  },
  /* drag override: drop group g on station s — SWAP if occupied so the
     permutation stays a bijection and the ring never breaks */
  _moveGroupToStation: function (gi, s) {
    var b = this.board;
    var cur = b.perm[gi];
    if (cur === s) return;
    for (var h = 0; h < b.perm.length; h++) {
      if (h !== gi && b.perm[h] === s) { b.perm[h] = cur; break; }
    }
    b.perm[gi] = s;
    this._save();
    this._log('override', b.perm.slice());
    this.render();
  },

  /* ===================== the round timer (inline) =================== */

  _tick: function () {
    var b = this.board;
    if (!b || !b.timer || b.timer.phase !== 'running') return;
    var t = b.timer;
    var remaining = Math.max(0, t.endAt - Date.now());
    if (!t.oneMinFired && t.duration > 90 && remaining <= 60000 && remaining > 0) {
      t.oneMinFired = true;
      this._log('onemin');
      this._pip();
      if (this.premium && this.api.settings.voice) this._speak('voiceOneMin');
      this._save();
    }
    if (!t.endFired && remaining <= 0) {
      t.endFired = true;
      t.phase = 'done';
      this._log('roundend');
      if (this.api.settings.chimes) this._pip();
      this._releaseWakeLock();
      this._save();
      this.render();          /* the glow state — NO auto-rotate */
      return;
    }
    this._paintWedge(remaining);
  },
  _startTimer: function () {
    var t = this.board.timer;
    if (t.phase === 'running') return;
    if (t.phase === 'paused') {
      t.endAt = Date.now() + (t.remainingAtPause || 0);
      t.remainingAtPause = null;
    } else {
      t.endAt = Date.now() + t.duration * 1000;
      t.oneMinFired = false;
      t.endFired = false;
    }
    t.phase = 'running';
    this._ctx();               /* the tap unlocks audio */
    this._requestWakeLock();
    this._save();
    this._log('roundstart');
    this.render();
  },
  _pauseTimer: function () {
    var t = this.board.timer;
    if (t.phase !== 'running') return;
    t.remainingAtPause = Math.max(0, t.endAt - Date.now());
    t.endAt = null;
    t.phase = 'paused';
    this._releaseWakeLock();
    this._save();
    this.render();
  },
  _timerRemaining: function () {
    var t = this.board.timer;
    if (t.phase === 'running') return Math.max(0, t.endAt - Date.now());
    if (t.phase === 'paused') return Math.max(0, t.remainingAtPause || 0);
    if (t.phase === 'done') return 0;
    return t.duration * 1000;
  },
  _paintWedge: function (remaining) {
    var wedge = (this._wrap || document).querySelector('.cbd-wedge-fill');
    if (!wedge) return;
    var total = this.board.timer.duration * 1000;
    var frac = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0;
    if (frac >= 0.9999) wedge.setAttribute('d', 'M50 50 m0 -42 a42 42 0 1 1 -0.01 0 Z');
    else if (frac <= 0.0001) wedge.setAttribute('d', '');
    else {
      var ang = frac * 2 * Math.PI;
      var x = 50 + Math.sin(ang) * 42, y = 50 - Math.cos(ang) * 42;
      var large = ang > Math.PI ? 1 : 0;
      wedge.setAttribute('d', 'M50 50 L50 8 A42 42 0 ' + large + ' 1 ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' Z');
    }
  },

  _requestWakeLock: function () {
    var self = this;
    if (!navigator.wakeLock || document.visibilityState !== 'visible') return;
    try {
      navigator.wakeLock.request('screen').then(function (l) { self._wakeLock = l; }).catch(function () {});
    } catch (_) {}
  },
  _releaseWakeLock: function () {
    if (this._wakeLock) { try { this._wakeLock.release(); } catch (_) {} this._wakeLock = null; }
  },

  /* ------------------------- audio (sine-only) --------------------- */
  _ctx: function () {
    if (this._audio === null) {
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        this._audio = AC ? new AC() : false;
      } catch (_) { this._audio = false; }
    }
    if (this._audio && this._audio.state === 'suspended') { try { this._audio.resume(); } catch (_) {} }
    return this._audio;
  },
  _note: function (freq, at, dur, peak) {
    var ctx = this._ctx();
    if (!ctx) return;
    var t = ctx.currentTime + (at || 0);
    var osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak || 0.22, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 1.2));
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + (dur || 1.2) + 0.05);
  },
  _chime: function () {
    this._log('chime');
    this._note(659.25, 0, 1.2, 0.2);
    this._note(523.25, 0.3, 1.2, 0.2);
    this._note(392.0, 0.6, 1.4, 0.22);
  },
  _pip: function () { this._note(392.0, 0, 0.9, 0.14); },
  _speak: function (key) {
    var text = this.api.t(key);
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.9 }); } catch (_) {}
  },
  _log: function (ev, data) {
    try { (window.__lcsBoardLog = window.__lcsBoardLog || []).push({ ev: ev, data: data || null, at: Date.now() }); } catch (_) {}
  },

  /* =========================== link rules =========================== */

  _validLink: function (raw) {
    try {
      var u = new URL(String(raw).trim());
      if (u.protocol !== 'https:') return null;
      if (this.ALLOWED_HOSTS.indexOf(u.hostname) < 0) return null;
      u.hostname = 'www.lessoncraftstudio.com';   /* §A.10 www-normalize */
      return u.toString();
    } catch (_) { return null; }
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('cbd-wide');

    var wrap = api.el('div', 'cbd-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    var b = this.board;
    var k = b.stations.length;
    /* keep perm aligned to groups */
    while (b.perm.length < b.groups.length) b.perm.push(b.perm.length % Math.max(1, k));
    b.perm.length = b.groups.length;

    var done = b.groups.length > 0 && b.round > this._roundsTotal();
    this._doneShown = done;

    /* schedule strip */
    var strip = api.el('div', 'cbd-strip');
    var total = this._roundsTotal();
    for (var r = 1; r <= Math.min(total, 8); r++) {
      var dot = api.el('span', 'cbd-rdot' + (r < b.round ? ' done' : r === b.round && !done ? ' now' : ''));
      dot.textContent = r < b.round ? '✓' : String(r);
      strip.appendChild(dot);
    }
    var setupChip = api.el('button', 'cbd-chip manage');
    setupChip.type = 'button';
    setupChip.textContent = api.t('setup');
    setupChip.addEventListener('click', function () { self._openPanel(); });
    strip.appendChild(setupChip);
    wrap.appendChild(strip);

    /* the board */
    if (done) {
      var doneCard = api.el('div', 'cbd-done');
      var msg = api.el('p');
      msg.textContent = api.t('doneLine');
      var fresh = api.el('button', 'cbd-big coral');
      fresh.type = 'button';
      fresh.textContent = api.t('startFresh');
      fresh.addEventListener('click', function () {
        b.perm = b.groups.map(function (_, i) { return i; });
        b.round = 1;
        b.timer = { phase: 'idle', duration: b.timer.duration, endAt: null, remainingAtPause: null, oneMinFired: false, endFired: false };
        self._save();
        self.render();
      });
      doneCard.append(msg, fresh);
      wrap.appendChild(doneCard);
      return;
    }

    var grid = api.el('div', 'cbd-grid cbd-n' + k);
    b.stations.forEach(function (st, s) {
      var card = api.el('div', 'cbd-station');
      card.setAttribute('data-station', String(s));
      var head = api.el('div', 'cbd-sthead');
      var disc = api.el('span', 'cbd-stdisc');
      disc.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (self.STATION_ICONS[st.icon] || self.STATION_ICONS.listening) + '</svg>';
      head.appendChild(disc);
      var nm = api.el('span', 'cbd-stname');
      nm.textContent = st.name;
      head.appendChild(nm);
      var badges = api.el('span', 'cbd-stbadges');
      if (st.noise !== undefined && st.noise !== null && st.noise !== -1) {
        var nb = api.el('span', 'cbd-noise');
        nb.title = api.t('noise' + st.noise);
        nb.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' + self.NOISE_ICONS[st.noise] + '</svg>';
        badges.appendChild(nb);
      }
      if (st.link) {
        var qb = api.el('button', 'cbd-qrbadge');
        qb.type = 'button';
        qb.title = api.t('qrTitle');
        qb.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2z M18 14h2 M14 18h2 M18 18h2v2h-2z" stroke-width="1.6"/></svg>';
        qb.addEventListener('click', function () { self._openQR(st); });
        badges.appendChild(qb);
      }
      head.appendChild(badges);
      card.appendChild(head);
      if (st.note) {
        var noteBtn = api.el('button', 'cbd-notechip');
        noteBtn.type = 'button';
        noteBtn.textContent = '✎';
        noteBtn.title = st.note;
        noteBtn.addEventListener('click', function () {
          noteBtn.classList.toggle('open');
          noteBtn.textContent = noteBtn.classList.contains('open') ? st.note : '✎';
        });
        card.appendChild(noteBtn);
      }
      var well = api.el('div', 'cbd-well');
      var here = [];
      b.groups.forEach(function (gr, gi) { if (b.perm[gi] === s) here.push(gi); });
      if (!here.length && b.groups.length) {
        var restEl = api.el('span', 'cbd-rest');
        restEl.textContent = api.t('resting');
        well.appendChild(restEl);
        well.classList.add('empty');
      }
      here.forEach(function (gi) {
        well.appendChild(self._groupCard(gi));
      });
      card.appendChild(well);
      if (s < k - 1) {
        var chev = api.el('span', 'cbd-chev');
        chev.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.35" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
        card.appendChild(chev);
      }
      grid.appendChild(card);
    });
    wrap.appendChild(grid);

    if (!b.groups.length) {
      var invite = api.el('div', 'cbd-invite');
      var txt = api.el('span');
      txt.textContent = api.t('emptyGroups');
      var go = api.el('button', 'cbd-chip manage');
      go.type = 'button';
      go.textContent = api.t('setup');
      go.addEventListener('click', function () { self._openPanel(); });
      invite.append(txt, go);
      wrap.appendChild(invite);
    }

    /* dock: wedge + round label · Rotate · timer controls */
    var dock = api.el('div', 'cbd-dock');
    var twrap = api.el('div', 'cbd-timerbox');
    var t = b.timer;
    var wedge = api.el('span', 'cbd-wedge');
    wedge.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="47" fill="#FFFEFB" stroke="#146B5E" stroke-width="5"/>' +
      '<path class="cbd-wedge-fill" d="" fill="#F2784B"/>' +
      '<circle cx="50" cy="50" r="3.4" fill="#146B5E"/></svg>';
    twrap.appendChild(wedge);
    var rl = api.el('span', 'cbd-roundlbl');
    rl.textContent = this.fmt('roundOf', { n: b.round, m: total });
    twrap.appendChild(rl);
    dock.appendChild(twrap);

    var rotateBtn = api.el('button', 'cbd-big coral cbd-rotate' + (t.phase === 'done' ? ' glow' : ''));
    rotateBtn.type = 'button';
    rotateBtn.textContent = api.t('rotate');
    rotateBtn.disabled = !b.groups.length;
    rotateBtn.addEventListener('click', function () { self._rotate(); });
    dock.appendChild(rotateBtn);

    var tc = api.el('div', 'cbd-timerctl');
    if (t.phase === 'idle' || t.phase === 'done') {
      var ml = api.el('span', 'cbd-mlbl');
      ml.textContent = api.t('minutes');
      tc.appendChild(ml);
      [5, 10, 15, 20].forEach(function (m) {
        var chip = api.el('button', 'cbd-chip small' + (t.duration === m * 60 ? ' active' : ''));
        chip.type = 'button';
        chip.textContent = String(m);
        chip.addEventListener('click', function () { t.duration = m * 60; self._save(); self.render(); });
        tc.appendChild(chip);
      });
      var start = api.el('button', 'cbd-chip manage');
      start.type = 'button';
      start.textContent = api.t('startRound');
      start.addEventListener('click', function () { self._startTimer(); });
      tc.appendChild(start);
    } else {
      var pr = api.el('button', 'cbd-chip');
      pr.type = 'button';
      pr.textContent = t.phase === 'running' ? api.t('pauseRound') : api.t('resumeRound');
      pr.addEventListener('click', function () { if (t.phase === 'running') self._pauseTimer(); else self._startTimer(); });
      var plus = api.el('button', 'cbd-chip');
      plus.type = 'button';
      plus.textContent = api.t('plusMin');
      plus.addEventListener('click', function () {
        if (t.phase === 'running') { t.endAt += 60000; }
        else if (t.phase === 'paused') { t.remainingAtPause += 60000; }
        t.duration += 60;
        self._save();
        self._paintWedge(self._timerRemaining());
      });
      tc.append(pr, plus);
    }
    dock.appendChild(tc);
    wrap.appendChild(dock);

    this._paintWedge(this._timerRemaining());
  },

  _groupCard: function (gi) {
    var api = this.api, self = this;
    var b = this.board;
    var gr = b.groups[gi];
    var team = this.TEAMS[gr.teamIdx % 6];
    var card = api.el('div', 'cbd-groupcard');
    card.setAttribute('data-group', gr.id);
    card.setAttribute('data-gi', String(gi));
    card.style.background = team.color;
    card.style.color = team.ink;
    var disc = api.el('span', 'cbd-adisc');
    disc.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + this.ANIMALS[team.animal] + '</svg>';
    card.appendChild(disc);
    var col = api.el('span', 'cbd-gcol');
    var nm = api.el('span', 'cbd-gname');
    nm.textContent = gr.name || api.t(team.key);
    col.appendChild(nm);
    if (this.api.settings.showNames && gr.memberNames && gr.memberNames.length) {
      var kids = api.el('span', 'cbd-gkids');
      kids.textContent = gr.memberNames.slice(0, 6).join(' · ');
      col.appendChild(kids);
    }
    card.appendChild(col);
    this._bindGroupDrag(card, gi);
    return card;
  },

  _bindGroupDrag: function (card, gi) {
    var self = this;
    card.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      try { card.setPointerCapture(e.pointerId); } catch (_) {}
      var moved = false;
      var move = function (ev) {
        moved = true;
        card.classList.add('dragging');
        card.style.position = 'fixed';
        card.style.left = (ev.clientX - 70) + 'px';
        card.style.top = (ev.clientY - 26) + 'px';
        card.style.zIndex = '60';
        document.querySelectorAll('.cbd-station').forEach(function (stEl) {
          var r = stEl.getBoundingClientRect();
          var over = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
          stEl.classList.toggle('dropover', over);
        });
      };
      var up = function (ev) {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerup', up);
        card.removeEventListener('pointercancel', up);
        card.classList.remove('dragging');
        var target = null;
        document.querySelectorAll('.cbd-station').forEach(function (stEl) {
          stEl.classList.remove('dropover');
          var r = stEl.getBoundingClientRect();
          if (ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom) target = stEl;
        });
        if (moved && target) self._moveGroupToStation(gi, parseInt(target.getAttribute('data-station'), 10));
        else self.render();
      };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerup', up);
      card.addEventListener('pointercancel', up);
    });
  },

  /* shell reset: keep the setup, restart the day */
  reset: function () {
    var b = this.board;
    b.perm = b.groups.map(function (_, i) { return i; });
    b.round = 1;
    b.timer = { phase: 'idle', duration: b.timer.duration || 900, endAt: null, remainingAtPause: null, oneMinFired: false, endFired: false };
    this._releaseWakeLock();
    if (this._panelEl) this._closePanel();
    this._save();
    this.render();
  },
  onSettings: function () { this._save(); if (this._wrap) this.render(); },
  paint: function () {},

  /* ==================== gates + QR + setup panel ==================== */

  _gateInline: function (host, key) {
    var api = this.api;
    var old = (this._panelEl || this._wrap).querySelector('.cbd-gate');
    if (old) old.remove();
    var g = api.el('div', 'cbd-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-center-board';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('afterend', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  _openQR: function (st) {
    var api = this.api, self = this;
    var old = document.querySelector('.cbd-qrscrim');
    if (old) old.remove();
    var scrim = api.el('div', 'cbd-qrscrim');
    var card = api.el('div', 'cbd-qrcard');
    var h = api.el('div', 'cbd-qrhead');
    var disc = api.el('span', 'cbd-stdisc');
    disc.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (this.STATION_ICONS[st.icon] || '') + '</svg>';
    var hn = api.el('span', 'cbd-qrname');
    hn.textContent = st.name;
    h.append(disc, hn);
    var img = document.createElement('img');
    img.className = 'cbd-qrimg';
    img.alt = api.t('qrTitle');
    img.src = '/api/qr?u=' + encodeURIComponent(st.link);
    var urlEl = api.el('div', 'cbd-qrurl');
    urlEl.textContent = st.link;
    var row = api.el('div', 'cbd-qrrow');
    var copy = api.el('button', 'cbd-chip manage');
    copy.type = 'button';
    copy.textContent = api.t('copyLink');
    copy.addEventListener('click', function () {
      try { navigator.clipboard.writeText(st.link); copy.textContent = api.t('copied'); } catch (_) {}
      setTimeout(function () { copy.textContent = api.t('copyLink'); }, 1600);
    });
    var print = api.el('button', 'cbd-chip');
    print.type = 'button';
    print.textContent = api.t('printCard');
    print.addEventListener('click', function () { window.print(); });
    var x = api.el('button', 'cbd-chip');
    x.type = 'button';
    x.textContent = '✕';
    x.addEventListener('click', function () { scrim.remove(); });
    row.append(copy, print, x);
    card.append(h, img, urlEl, row);
    scrim.appendChild(card);
    scrim.addEventListener('click', function (e) { if (e.target === scrim) scrim.remove(); });
    document.querySelector('.lcs-app').appendChild(scrim);
  },

  _openPanel: function () {
    if (!this._panelEl) this._buildPanel();
    this._renderPanel();
    this._panelEl.classList.add('open');
    this._scrimEl.classList.add('open');
  },
  _closePanel: function () {
    if (this._panelEl) { this._panelEl.classList.remove('open'); this._scrimEl.classList.remove('open'); }
  },
  _buildPanel: function () {
    var api = this.api, self = this;
    var scrim = api.el('div', 'cbd-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); self.render(); });
    var panel = api.el('div', 'cbd-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('setup'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },

  _renderPanel: function () {
    var api = this.api, self = this;
    var b = this.board;
    var panel = this._panelEl;
    panel.innerHTML = '';

    var head = api.el('div', 'cbd-panel-head');
    var h = api.el('div', 'cbd-panel-title');
    h.textContent = api.t('setup');
    var x = api.el('button', 'cbd-panel-close');
    x.type = 'button';
    x.setAttribute('aria-label', api.t('deleteBtn'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePanel(); self.render(); });
    head.append(h, x);
    panel.appendChild(head);

    var body = api.el('div', 'cbd-panel-body');

    /* --- stations --- */
    var sl = api.el('div', 'cbd-seclbl');
    sl.textContent = api.t('stationsLbl');
    body.appendChild(sl);
    b.stations.forEach(function (st, s) {
      var row = api.el('div', 'cbd-prow');
      /* icon picker: tap cycles through the 12 */
      var ic = api.el('button', 'cbd-iconbtn');
      ic.type = 'button';
      ic.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + self.STATION_ICONS[st.icon] + '</svg>';
      ic.addEventListener('click', function () {
        var i = self.ICON_KEYS.indexOf(st.icon);
        st.icon = self.ICON_KEYS[(i + 1) % self.ICON_KEYS.length];
        self._save();
        self._renderPanel();
      });
      var nameIn = document.createElement('input');
      nameIn.className = 'cbd-input grow';
      nameIn.type = 'text';
      nameIn.maxLength = 24;
      nameIn.value = st.name;
      nameIn.addEventListener('change', function () { st.name = nameIn.value.trim() || st.name; self._save(); });
      /* noise cycle: off → 0 → 1 → 2 */
      var nz = api.el('button', 'cbd-iconbtn');
      nz.type = 'button';
      var paintNz = function () {
        var lvl = (st.noise === undefined || st.noise === null || st.noise === -1) ? -1 : st.noise;
        /* the OFF state stays sound-domain (a faint speaker), so this
           control can never read as a second delete button */
        nz.innerHTML = lvl < 0
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.8" stroke-linecap="round" opacity="0.3" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' + self.NOISE_ICONS[lvl] + '</svg>';
        nz.classList.toggle('off', lvl < 0);
        nz.title = api.t(lvl < 0 ? 'noiseOff' : 'noise' + lvl);
      };
      paintNz();
      nz.addEventListener('click', function () {
        var lvl = (st.noise === undefined || st.noise === null || st.noise === -1) ? -1 : st.noise;
        st.noise = lvl >= 2 ? -1 : lvl + 1;
        self._save();
        paintNz();
      });
      var del = api.el('button', 'cbd-linkbtn danger');
      del.type = 'button';
      del.textContent = '✕';
      del.setAttribute('aria-label', api.t('deleteBtn'));
      del.addEventListener('click', function () {
        if (b.stations.length <= 2) return;
        b.stations.splice(s, 1);
        var k2 = b.stations.length;
        b.perm = b.perm.map(function (p) { return p % k2; });
        /* re-biject after a removal */
        var seen = {};
        b.perm = b.perm.map(function (p) { while (seen[p]) p = (p + 1) % k2; seen[p] = true; return p; });
        self._save();
        self._renderPanel();
      });
      row.append(ic, nz, nameIn, del);   /* noise beside the icon, away from delete */
      body.appendChild(row);
      /* note + link rows */
      var noteIn = document.createElement('input');
      noteIn.className = 'cbd-input sub';
      noteIn.type = 'text';
      noteIn.maxLength = 90;
      noteIn.placeholder = api.t('noteLbl');
      noteIn.value = st.note || '';
      noteIn.addEventListener('change', function () { st.note = noteIn.value.trim() || undefined; self._save(); });
      body.appendChild(noteIn);
      var linkIn = document.createElement('input');
      linkIn.className = 'cbd-input sub';
      linkIn.type = 'text';
      linkIn.placeholder = api.t('linkLbl');
      linkIn.value = st.link || '';
      linkIn.addEventListener('change', function () {
        if (!self.premium) { linkIn.value = ''; self._gateInline(linkIn, 'gateLink'); return; }
        var raw = linkIn.value.trim();
        if (!raw) { st.link = undefined; self._save(); return; }
        var ok = self._validLink(raw);
        if (!ok) {
          linkIn.classList.add('bad');
          linkIn.value = '';
          linkIn.placeholder = api.t('linkBad');
          setTimeout(function () { linkIn.classList.remove('bad'); linkIn.placeholder = api.t('linkLbl'); }, 2600);
          return;
        }
        st.link = ok;
        linkIn.value = ok;
        self._save();
      });
      body.appendChild(linkIn);
    });
    var addSt = api.el('button', 'cbd-chip manage');
    addSt.type = 'button';
    addSt.textContent = '+ ' + api.t('addStation');
    addSt.addEventListener('click', function () {
      if (b.stations.length >= 6) return;
      if (!self.premium && b.stations.length >= 2) { self._gateInline(addSt, 'gateSize'); return; }
      var used = b.stations.map(function (s2) { return s2.icon; });
      var icon = self.ICON_KEYS.filter(function (i) { return used.indexOf(i) < 0; })[0] || 'games';
      b.stations.push({ id: self._uid('st_'), icon: icon, name: api.t(self.ICON_NAME_KEY[icon]) });
      self._save();
      self._renderPanel();
    });
    body.appendChild(addSt);

    /* --- teams --- */
    var tl = api.el('div', 'cbd-seclbl');
    tl.textContent = api.t('teamsLbl');
    body.appendChild(tl);
    /* import chip (premium + a Name Sticks grouping exists) */
    var grouping = this._mc.groupings && this._mc.activeClassId && this._mc.groupings[this._mc.activeClassId];
    if (grouping && grouping.cups && grouping.cups.length) {
      var imp = api.el('button', 'cbd-chip manage' + (this.premium ? '' : ' locked'));
      imp.type = 'button';
      imp.textContent = api.t('importTeams');
      imp.addEventListener('click', function () {
        if (!self.premium) { self._gateInline(imp, 'gateSave'); return; }
        var cls = (self._mc.classes || []).filter(function (c) { return c.id === self._mc.activeClassId; })[0];
        var nameOf = function (id) {
          var st2 = cls && cls.students.filter(function (s2) { return s2.id === id; })[0];
          return st2 ? st2.name : null;
        };
        b.groups = grouping.cups.map(function (cup, i) {
          return {
            id: self._uid('g_'),
            teamIdx: i % 6,
            name: null,
            memberIds: cup.slice(),
            memberNames: cup.map(nameOf).filter(Boolean)
          };
        });
        b.perm = b.groups.map(function (_, i) { return i % Math.max(1, b.stations.length); });
        /* re-biject */
        var seen2 = {};
        b.perm = b.perm.map(function (p) { while (seen2[p]) p = (p + 1) % b.stations.length; seen2[p] = true; return p; });
        b.round = 1;
        self._save();
        self._renderPanel();
      });
      body.appendChild(imp);
    }
    b.groups.forEach(function (gr, gi) {
      var team = self.TEAMS[gr.teamIdx % 6];
      var row = api.el('div', 'cbd-prow');
      var ab = api.el('button', 'cbd-iconbtn');
      ab.type = 'button';
      ab.style.background = team.color;
      ab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + self.ANIMALS[team.animal] + '</svg>';
      ab.addEventListener('click', function () { gr.teamIdx = (gr.teamIdx + 1) % 6; self._save(); self._renderPanel(); });
      var nameIn2 = document.createElement('input');
      nameIn2.className = 'cbd-input grow';
      nameIn2.type = 'text';
      nameIn2.maxLength = 24;
      nameIn2.placeholder = api.t(team.key);
      nameIn2.value = gr.name || '';
      nameIn2.addEventListener('change', function () { gr.name = nameIn2.value.trim() || null; self._save(); });
      var del2 = api.el('button', 'cbd-linkbtn danger');
      del2.type = 'button';
      del2.textContent = '✕';
      del2.setAttribute('aria-label', api.t('deleteBtn'));
      del2.addEventListener('click', function () {
        b.groups.splice(gi, 1);
        b.perm.splice(gi, 1);
        self._save();
        self._renderPanel();
      });
      row.append(ab, nameIn2, del2);
      body.appendChild(row);
    });
    var addG = api.el('button', 'cbd-chip manage');
    addG.type = 'button';
    addG.textContent = '+ ' + api.t('addTeam');
    addG.addEventListener('click', function () {
      if (!self.premium && b.groups.length >= 2) { self._gateInline(addG, 'gateSize'); return; }
      if (b.groups.length >= b.stations.length) {
        var n = api.el('div', 'cbd-gate');
        n.textContent = api.t('mergeNudge');
        addG.insertAdjacentElement('afterend', n);
        setTimeout(function () { if (n.parentNode) n.remove(); }, 6000);
        return;
      }
      if (b.groups.length >= 6) return;
      var usedT = b.groups.map(function (g2) { return g2.teamIdx; });
      var idx = [0, 1, 2, 3, 4, 5].filter(function (i) { return usedT.indexOf(i) < 0; })[0];
      if (idx === undefined) idx = b.groups.length % 6;
      /* place the new group at the first FREE station (keeps the bijection) */
      var taken = {};
      b.perm.forEach(function (p) { taken[p] = true; });
      var seat = 0;
      while (taken[seat]) seat++;
      b.groups.push({ id: self._uid('g_'), teamIdx: idx, name: null });
      b.perm.push(seat % b.stations.length);
      self._save();
      self._renderPanel();
    });
    body.appendChild(addG);

    /* --- rounds --- */
    var rl2 = api.el('div', 'cbd-seclbl');
    rl2.textContent = api.t('rounds');
    body.appendChild(rl2);
    var rrow = api.el('div', 'cbd-prow');
    for (var n2 = 2; n2 <= 6; n2++) {
      (function (nn) {
        var chip = api.el('button', 'cbd-chip small' + (self._roundsTotal() === nn ? ' active' : ''));
        chip.type = 'button';
        chip.textContent = String(nn);
        chip.addEventListener('click', function () { b.roundsTotal = nn; self._save(); self._renderPanel(); });
        rrow.appendChild(chip);
      }(n2));
    }
    body.appendChild(rrow);

    /* free note */
    if (!this.premium) {
      var fn = api.el('div', 'cbd-freenote');
      fn.textContent = api.t('gateSave');
      body.appendChild(fn);
    }

    panel.appendChild(body);
  }
};

/* per-tool styling: STAGE ONLY + sanctioned body class + panel + print */
(function injectCSS() {
  var css = ''
  + 'body.cbd-wide .lcs-app{max-width:min(1120px,97vw);}'
  + '@media (max-width:480px){'
  +   'body.cbd-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  + '}'
  + '.cbd-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.4vmin,14px);width:100%;}'

  /* schedule strip */
  + '.cbd-strip{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;width:100%;}'
  + '.cbd-rdot{width:32px;height:32px;display:grid;place-items:center;border-radius:50%;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:2px solid var(--lcs-structure);}'
  + '.cbd-rdot.done{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.cbd-rdot.now{background:#F2784B;border-color:#F2784B;color:#fff;}'

  /* board grid */
  + '.cbd-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));'
  +   'justify-content:center;gap:16px;width:100%;}'
  + '.cbd-grid.cbd-n2{grid-template-columns:repeat(2,minmax(250px,340px));}'
  + '.cbd-grid.cbd-n3{grid-template-columns:repeat(3,minmax(230px,320px));}'
  + '.cbd-station{position:relative;background:#FFFEFB;border-radius:20px;box-shadow:var(--lcs-shadow-sm);'
  +   'border:3px solid #F7E9CF;padding:12px 14px;min-height:clamp(120px,16vh,200px);'
  +   'display:flex;flex-direction:column;gap:8px;transition:transform .12s var(--lcs-ease);}'
  + '.cbd-station.dropover{transform:translateY(-3px);outline:3px dashed var(--lcs-structure);outline-offset:3px;}'
  + '.cbd-sthead{display:flex;align-items:center;gap:9px;}'
  + '.cbd-stdisc{width:44px;height:44px;flex:none;display:grid;place-items:center;border-radius:50%;'
  +   'background:#F7E9CF;}'
  + '.cbd-stdisc svg{width:60%;height:60%;}'
  + '.cbd-stname{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(16px,2.6vmin,23px);color:var(--lcs-structure);flex:1;min-width:0;'
  +   'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'
  + '.cbd-stbadges{display:inline-flex;gap:5px;flex:none;}'
  + '.cbd-noise{width:26px;height:26px;display:grid;place-items:center;border-radius:8px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);}'
  + '.cbd-qrbadge{width:28px;height:28px;display:grid;place-items:center;border-radius:8px;cursor:pointer;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);}'
  + '.cbd-notechip{align-self:flex-start;font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;'
  +   'color:var(--lcs-ink-soft);background:var(--lcs-surface-2);border:1.5px dashed var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:3px 10px;cursor:pointer;max-width:100%;'
  +   'text-align:left;}'
  + '.cbd-notechip.open{color:var(--lcs-ink);background:#FDF0E0;border-style:solid;white-space:normal;}'
  + '.cbd-well{margin-top:auto;min-height:66px;background:#FDF7EC;border-radius:14px;'
  +   'box-shadow:inset 0 3px 6px rgba(20,30,28,.07);padding:7px;display:flex;flex-direction:column;'
  +   'gap:6px;align-items:center;justify-content:center;}'
  + '.cbd-well.empty{border:2px dashed #E8D9BD;box-shadow:none;}'
  + '.cbd-rest{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;color:var(--lcs-ink-soft);}'
  + '.cbd-chev{position:absolute;right:-17px;top:50%;transform:translateY(-50%);z-index:2;}'

  /* group card */
  + '.cbd-groupcard{display:inline-flex;align-items:center;gap:10px;border-radius:40px;'
  +   'padding:7px 18px 7px 8px;box-shadow:0 3px 7px rgba(20,30,28,.16);cursor:grab;'
  +   'touch-action:none;user-select:none;max-width:100%;}'
  + '.cbd-groupcard.dragging{cursor:grabbing;box-shadow:0 9px 16px rgba(20,30,28,.26);}'
  + '.cbd-adisc{width:40px;height:40px;flex:none;display:grid;place-items:center;border-radius:50%;'
  +   'background:rgba(255,254,251,.82);border:1.6px solid var(--lcs-structure);}'
  + '.cbd-adisc svg{width:72%;height:72%;}'
  + '.cbd-gcol{display:flex;flex-direction:column;min-width:0;}'
  + '.cbd-gname{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(15px,2.2vmin,19px);'
  +   'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'
  /* kid names ride a cream mini-pill so they read on ANY team color */
  + '.cbd-gkids{font-family:var(--lcs-font-body);font-weight:700;font-size:11.5px;'
  +   'background:rgba(255,254,251,.9);color:#1F2A28;border-radius:8px;padding:1px 7px;'
  +   'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;margin-top:2px;}'

  /* invite + done */
  + '.cbd-invite{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius);padding:12px 20px;'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:14px;color:var(--lcs-ink);}'
  + '.cbd-done{display:flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius);padding:26px 30px;margin:22px 0;}'
  + '.cbd-done p{margin:0;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(18px,3vmin,26px);color:var(--lcs-ink);}'

  /* dock */
  + '.cbd-dock{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;width:100%;}'
  + '.cbd-timerbox{display:flex;flex-direction:column;align-items:center;gap:2px;}'
  + '.cbd-wedge{width:76px;height:76px;display:block;}'
  + '.cbd-wedge svg{width:100%;height:100%;}'
  + '.cbd-roundlbl{font-family:var(--lcs-font-body);font-weight:800;font-size:13px;color:var(--lcs-structure);}'
  + '.cbd-big{min-width:170px;min-height:60px;padding:12px 34px;border-radius:var(--lcs-radius-pill);'
  +   'border:1.5px solid var(--lcs-structure);cursor:pointer;background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(17px,2.7vmin,23px);box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.cbd-big:active{transform:scale(.97);}'
  + '.cbd-big:disabled{opacity:.45;cursor:default;}'
  + '.cbd-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);}'
  + '.cbd-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.cbd-rotate.glow{animation:cbdGlow 2.4s ease-in-out infinite;border:2px solid #F2C879;}'
  + '@keyframes cbdGlow{0%,100%{box-shadow:0 4px 0 0 #C9502A,0 0 0 0 rgba(242,120,75,.35);}'
  +   '50%{box-shadow:0 4px 0 0 #C9502A,0 0 0 14px rgba(242,120,75,0);}}'
  + '.cbd-timerctl{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;}'
  + '.cbd-mlbl{font-family:var(--lcs-font-body);font-weight:800;font-size:12.5px;color:var(--lcs-ink-soft);}'
  + '.cbd-chip{display:inline-flex;align-items:center;gap:6px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:13.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 14px;min-height:44px;cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.cbd-chip:active{transform:scale(.96);}'
  + '.cbd-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.cbd-chip.small{min-width:44px;justify-content:center;}'
  + '.cbd-chip.manage{color:var(--lcs-structure);}'
  + '.cbd-chip.locked{color:var(--lcs-ink-soft);}'

  /* gate */
  + '.cbd-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;'
  +   'margin:8px auto;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.cbd-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'
  + '.cbd-freenote{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;color:var(--lcs-ink-soft);}'

  /* QR overlay */
  + '.cbd-qrscrim{position:absolute;inset:0;background:rgba(38,51,47,.34);z-index:80;'
  +   'display:grid;place-items:center;border-radius:inherit;}'
  + '.cbd-qrcard{background:var(--lcs-surface);border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);'
  +   'padding:20px 24px;max-width:380px;display:flex;flex-direction:column;align-items:center;gap:12px;}'
  + '.cbd-qrhead{display:flex;align-items:center;gap:10px;}'
  + '.cbd-qrname{font-family:var(--lcs-font-display);font-weight:700;font-size:22px;color:var(--lcs-structure);}'
  + '.cbd-qrimg{width:240px;height:240px;border-radius:12px;border:1.5px solid var(--lcs-line);}'
  + '.cbd-qrurl{font-family:var(--lcs-font-body);font-weight:700;font-size:11.5px;color:var(--lcs-ink-soft);'
  +   'word-break:break-all;text-align:center;max-width:320px;}'
  + '.cbd-qrrow{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}'

  /* panel */
  + '.cbd-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;'
  +   'pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.cbd-scrim.open{opacity:1;pointer-events:auto;}'
  + '.cbd-panel{position:absolute;left:50%;top:4%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(640px,94%);max-height:min(88vh,940px);overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.cbd-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.cbd-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.cbd-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:17px;color:var(--lcs-ink);}'
  + '.cbd-panel-close{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;border:none;}'
  + '.cbd-panel-body{padding:12px 16px 18px;display:flex;flex-direction:column;gap:8px;}'
  + '.cbd-seclbl{font-family:var(--lcs-font-display);font-weight:700;font-size:13px;'
  +   'color:var(--lcs-ink-soft);text-transform:uppercase;letter-spacing:.05em;margin-top:8px;}'
  + '.cbd-prow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}'
  + '.cbd-iconbtn{width:44px;height:44px;flex:none;display:grid;place-items:center;border-radius:12px;'
  +   'background:#F7E9CF;border:1.5px solid var(--lcs-line);cursor:pointer;}'
  + '.cbd-iconbtn svg{width:58%;height:58%;}'
  + '.cbd-nzoff{font-family:var(--lcs-font-display);font-weight:700;color:var(--lcs-ink-soft);}'
  + '.cbd-input{font-family:var(--lcs-font-body);font-weight:700;font-size:14px;padding:9px 11px;'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);box-sizing:border-box;min-width:0;}'
  + '.cbd-input.grow{flex:1 1 140px;}'
  + '.cbd-input.sub{width:100%;font-size:12.5px;font-weight:600;margin:-2px 0 4px 52px;'
  +   'width:calc(100% - 52px);}'
  + '.cbd-input.bad{border-color:#C9502A;}'
  + '.cbd-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:14px;color:var(--lcs-structure);'
  +   'background:transparent;border:none;cursor:pointer;text-decoration:underline;padding:6px;}'
  + '.cbd-linkbtn.danger{color:#C9502A;}'

  /* phone list layout */
  + '@media (max-width:560px){'
  +   '.cbd-grid,.cbd-grid.cbd-n2,.cbd-grid.cbd-n3{grid-template-columns:1fr;}'
  +   '.cbd-station{min-height:0;flex-direction:row;align-items:center;}'
  +   '.cbd-sthead{flex:1;min-width:0;}'
  +   '.cbd-well{margin-top:0;min-height:0;background:transparent;box-shadow:none;padding:0;}'
  +   '.cbd-notechip{display:none;}'
  +   '.cbd-chev{display:none;}'
  +   '.cbd-gkids{display:none;}'
  + '}'
  /* short screens (projector 1024×768) */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.cbd-wrap{gap:6px;}'
  +   '.cbd-station{min-height:clamp(130px,19vh,180px);padding:9px 12px;}'
  +   '.cbd-wedge{width:64px;height:64px;}'
  + '}'
  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.cbd-rotate.glow{animation:none;border:2px solid #F2C879;}'
  +   '.cbd-station{transition:none;}'
  + '}'
  /* print: only the QR card */
  + '@media print{'
  +   'body.cbd-wide *{visibility:hidden;}'
  +   'body.cbd-wide .cbd-qrcard,body.cbd-wide .cbd-qrcard *{visibility:visible;}'
  +   'body.cbd-wide .cbd-qrcard{position:fixed;left:50%;top:40mm;transform:translateX(-50%);box-shadow:none;}'
  + '}'

  /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
     The station grid is `repeat(auto-fit, minmax(250px,1fr))`, so it is one of
     the few tools where raising the CARD genuinely does the work on its own —
     a wider board fits more stations at a readable width instead of stretching
     three of them. The n2/n3 variants keep their own explicit tracks and are
     raised with it, or a 2- or 3-station board would stay pinned at 340/320px
     while the auto-fit case grew past it.
     `.cbd-station`'s min-height is a `vh` clamp and already follows the board;
     the chips and the station type are hand-ramped because they do not. */
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.cbd-wide .lcs-app{max-width:min(1192px,97vw);}'
  +   'body.cbd-wide .cbd-grid{grid-template-columns:repeat(auto-fit,minmax(290px,1fr));}'
  +   'body.cbd-wide .cbd-grid.cbd-n2{grid-template-columns:repeat(2,minmax(290px,1fr));}'
  +   'body.cbd-wide .cbd-roundlbl{font-size:22px;}'
  +   'body.cbd-wide .cbd-rdot{width:46px;height:46px;font-size:22px;}'
  +   'body.cbd-wide .cbd-stname{font-size:22px;}'
  +   'body.cbd-wide .cbd-grid.cbd-n3{grid-template-columns:repeat(3,minmax(270px,1fr));}'
  +   'body.cbd-wide .cbd-chip{font-size:17px;min-height:52px;}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.cbd-wide .lcs-app{max-width:min(1560px,97vw);}'
  +   'body.cbd-wide .cbd-grid{grid-template-columns:repeat(auto-fit,minmax(330px,1fr));}'
  +   'body.cbd-wide .cbd-grid.cbd-n2{grid-template-columns:repeat(2,minmax(330px,1fr));}'
  +   'body.cbd-wide .cbd-roundlbl{font-size:25px;}'
  +   'body.cbd-wide .cbd-rdot{width:52px;height:52px;font-size:25px;}'
  +   'body.cbd-wide .cbd-stname{font-size:25px;}'
  +   'body.cbd-wide .cbd-grid.cbd-n3{grid-template-columns:repeat(3,minmax(310px,1fr));}'
  +   'body.cbd-wide .cbd-chip{font-size:19px;min-height:56px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.cbd-wide .lcs-app{max-width:min(1752px,97vw);}'
  +   'body.cbd-wide .cbd-grid{grid-template-columns:repeat(auto-fit,minmax(360px,1fr));}'
  +   'body.cbd-wide .cbd-grid.cbd-n2{grid-template-columns:repeat(2,minmax(360px,1fr));}'
  +   'body.cbd-wide .cbd-roundlbl{font-size:28px;}'
  +   'body.cbd-wide .cbd-rdot{width:58px;height:58px;font-size:28px;}'
  +   'body.cbd-wide .cbd-stname{font-size:28px;}'
  +   'body.cbd-wide .cbd-grid.cbd-n3{grid-template-columns:repeat(3,minmax(340px,1fr));}'
  +   'body.cbd-wide .cbd-chip{font-size:21px;min-height:60px;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
