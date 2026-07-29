/* =====================================================================
   TOOL #24 — FEELINGS CHECK-IN   (feelings-check-in.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). The Teacher's Desk, and the SIXTH of six: this is the tool
   that completes the suite, so it opens the Desk footer.

   THE RITUAL: a warm "how is your weather?" arrival board. Five feeling
   characters — calm, happy, sad, angry, tired. A child taps one, the
   character answers with a kind spoken line, and a small "what could
   help" menu offers something to do about it. In ROSTER MODE a child
   taps their own name first, so the teacher can see at a glance who has
   arrived and how the room is doing.

   THE DOCTRINE, from the catalogue, verbatim:
       "No history stored on children — each day starts fresh,
        deliberately."
   This is the most sensitive datum the platform has ever held, so the
   promise is STRUCTURAL, not a comment:

     1. ONE DAY EXISTS. The store holds a single `day` slot whose shape
        is closed — {dateKey, anon, picks} and nothing else. There is no
        `days` map, no array, no timestamp on a pick, no previous value.
        A trend is not merely unwritten, it is UNREPRESENTABLE.
     2. THE ROLL IS AN INVARIANT OF ACCESS, NOT A STEP. Nothing may
        reach `_store.day` except `_today()`, which re-validates the
        date on EVERY read and replaces the slot the moment it is
        stale. `_store.day` appears in exactly two function bodies in
        this file — one to read, one to write — which the gate checks. Center Board learned this the
        hard way: its `_dayRoll()` runs only in init while its board is
        swapped later by async entitlement, so the roll never runs
        against the board a premium teacher actually gets. That bug is
        structurally impossible here.
     3. NAMES NEVER LEAVE THE DEVICE, AND NEVER REACH A FREE VISITOR.
        my-classes is opened LAZILY and only on roster paths, so for a
        free visitor `_mc` stays null and a roster name never enters
        the JS heap — let alone the DOM. We READ my-classes and never
        write it (it is a whole-blob last-writer-wins store with one
        rightful owner, Name Sticks).
     4. NOTHING IS SENT. The only network call in this file is the
        entitlement check. No XHR, no sendBeacon, no WebSocket, no
        analytics — a feeling is never an event.

   dateKey is the non-padded LOCAL date, byte-identical to Name Sticks
   ('2026-7-9'). It is NOT string-comparable — '2026-7-9' sorts AFTER
   '2026-7-10' — so the roll is an EQUALITY test and this file contains
   no relational comparison of a dateKey anywhere.
   ===================================================================== */
var FeelingsCheckIn = {
  id: 'feelings-check-in',

  /* CURATED: en authored; the other ten carry drafts until their native
     ensemble pass lands via apply-feelings-check-in-fanout.js. Emotion
     words carry `na:1` in the platform vocabulary — they are adjectives
     with FABRICATED genders and must NEVER take an article in any
     locale (picture-word-wall.js:34-37). */
  strings: {
    title:        {en:'Feelings Check-In',de:'Gefühlswetter',fr:'La météo des émotions',it:'Come stai oggi?',es:'¿Cómo te sientes hoy?',pt:'Como você está hoje?',nl:'Gevoelsbord',sv:'Känslokoll',da:'Følelsestjek',no:'Følelsessjekk',fi:'Tunnesää'},
    instruction:  {en:'How is your weather today? Tap the one that fits.',de:'Wie ist dein Wetter heute? Tippe an, was passt.',fr:'Quel temps fait-il en toi aujourd’hui ? Touche ce qui te ressemble.',it:'Che tempo fa dentro di te oggi? Tocca quello che senti.',es:'¿Cómo está el clima hoy dentro de ti? Toca lo que sientas.',pt:'Que tempo faz dentro de você hoje? Toque no que combina com você.',nl:'Wat voor weer is het vandaag binnen in jou? Tik op wat past.',sv:'Vilket väder har du idag? Tryck på det som stämmer.',da:'Hvilket vejr har du i dag? Tryk på det, der passer.',no:'Hvilket vær har du i dag? Trykk på det som passer.',fi:'Millainen sää sinulla on tänään? Napauta sitä, joka tuntuu omalta.'},
    privacyLine:  {en:'Nothing is saved about a child and nothing is ever sent. It all stays on this device, and every day starts fresh.',de:'Alles bleibt auf diesem Gerät, und jeder Tag beginnt neu – über Nacht wird nichts über ein Kind gespeichert und nichts verschickt.',fr:'Tout reste sur cet appareil et chaque jour repart de zéro : rien concernant un enfant n’est gardé d’un jour à l’autre ni envoyé ailleurs.',it:'Tutto resta su questo dispositivo e ogni giorno riparte da zero: nulla di ciò che riguarda un bambino viene conservato la notte o inviato altrove.',es:'Todo se queda en este dispositivo y cada día empieza de cero: nada de ningún niño ni de ninguna niña se guarda de un día para otro ni se envía a ninguna parte.',pt:'Tudo fica neste aparelho e cada dia começa do zero: nada sobre uma criança fica guardado de um dia para o outro nem é enviado para lugar nenhum.',nl:'Alles blijft op dit apparaat en elke dag begint opnieuw — niets over een kind blijft ’s nachts bewaard of wordt ergens naartoe gestuurd.',sv:'Allt stannar på den här enheten och varje dag börjar om — inget om ett barn sparas över natten eller skickas vidare.',da:'Alt bliver på denne enhed, og hver dag starter forfra — der gemmes ikke noget om et barn natten over, og der sendes ikke noget videre.',no:'Alt blir værende på denne enheten, og hver dag starter på nytt – ingenting om et barn lagres over natten eller sendes videre.',fi:'Kaikki pysyy tällä laitteella ja jokainen päivä alkaa alusta – mitään lapsesta ei tallenneta yön yli eikä lähetetä mihinkään.'},

    /* modes */
    modeAnon:     {en:'Just me',de:'Nur ich',fr:'Juste moi',it:'Solo io',es:'Solo yo',pt:'Só eu',nl:'Alleen ik',sv:'Bara jag',da:'Kun mig',no:'Bare meg',fi:'Vain minä'},
    modeRoster:   {en:'Our class',de:'Unsere Klasse',fr:'Notre classe',it:'La nostra classe',es:'Nuestra clase',pt:'Nossa turma',nl:'Onze klas',sv:'Vår klass',da:'Vores klasse',no:'Klassen vår',fi:'Meidän luokka'},

    /* the five feelings — adjectives, NEVER with an article */
    feelCalm:     {en:'Calm',de:'Ruhig',fr:'Calme',it:'Tranquillo',es:'Calma',pt:'Calmo',nl:'Rustig',sv:'Lugn',da:'Rolig',no:'Rolig',fi:'Rauhallinen'},
    feelHappy:    {en:'Happy',de:'Fröhlich',fr:'Content',it:'Felice',es:'Alegría',pt:'Feliz',nl:'Blij',sv:'Glad',da:'Glad',no:'Glad',fi:'Iloinen'},
    feelSad:      {en:'Sad',de:'Traurig',fr:'Triste',it:'Triste',es:'Tristeza',pt:'Triste',nl:'Verdrietig',sv:'Ledsen',da:'Ked af det',no:'Lei seg',fi:'Surullinen'},
    feelAngry:    {en:'Angry',de:'Wütend',fr:'En colère',it:'Arrabbiato',es:'Enojo',pt:'Com raiva',nl:'Boos',sv:'Arg',da:'Vred',no:'Sint',fi:'Vihainen'},
    feelTired:    {en:'Tired',de:'Müde',fr:'Fatigué',it:'Stanco',es:'Cansancio',pt:'Cansado',nl:'Moe',sv:'Trött',da:'Træt',no:'Trøtt',fi:'Väsynyt'},

    /* the kind spoken validation — never fixes the feeling, never praises it */
    valCalm:      {en:'Thank you for telling us. Calm is welcome here.',de:'Ruhig in den Tag zu starten, ist schön. Danke, dass du es uns sagst.',fr:'C’est tout calme en toi. Merci de nous le dire.',it:'La calma è un bel modo di iniziare la giornata. Grazie di averlo detto.',es:'Estar en calma es una buena manera de empezar el día. Gracias por contarnos.',pt:'Calmo é um bom jeito de começar o dia. Que bom que você contou.',nl:'Rustig is een fijne start van de dag. Dank je wel dat je het vertelt.',sv:'Att vara lugn är en fin start på dagen. Tack för att du berättar.',da:'Rolig er en dejlig måde at begynde dagen på. Tak fordi du fortæller det.',no:'Rolig er en fin start på dagen. Takk for at du sier fra.',fi:'Rauhallinen olo on hyvä tapa aloittaa päivä. Kiitos, että kerroit.'},
    valHappy:     {en:'Thank you for telling us. Happy is welcome here.',de:'Wie schön. Danke, dass du das heute mitbringst.',fr:'Du soleil en toi aujourd’hui. Merci de le partager avec nous.',it:'Che bello. Grazie di aver portato questo con te oggi.',es:'Qué bonito. Gracias por traer eso hoy al salón.',pt:'Que alegria. Ainda bem que você trouxe isso para a gente hoje.',nl:'Wat fijn. Dank je wel dat je dat vandaag meebrengt.',sv:'Vad fint. Tack för att du tar med dig det hit idag.',da:'Hvor dejligt. Tak fordi du tager det med i dag.',no:'Så fint. Takk for at du tar det med i dag.',fi:'Ihanaa. Kiitos, että toit sen mukanasi tänään.'},
    valSad:       {en:'Thank you for telling us. Sad is welcome here.',de:'Danke, dass du es uns sagst. Hier darfst du traurig sein.',fr:'Merci de nous le dire. Ici, on a le droit d’être triste.',it:'Grazie di averlo detto. Qui c’è posto anche per la tristezza.',es:'Gracias por contarnos. Aquí está bien sentirse triste.',pt:'Que bom que você contou. Aqui a gente pode ficar triste.',nl:'Dank je wel dat je het vertelt. Hier mag je verdrietig zijn.',sv:'Tack för att du berättar. Här får man vara ledsen.',da:'Tak fordi du fortæller det. Her må man godt være ked af det.',no:'Takk for at du sier fra. Her er det lov å være lei seg.',fi:'Kiitos, että kerroit. Täällä saa olla surullinen.'},
    valAngry:     {en:'Thank you for telling us. Angry is welcome here.',de:'Danke, dass du es uns sagst. Wütend darfst du hier auch sein.',fr:'Merci de nous le dire. Ici aussi, la colère a sa place.',it:'Grazie di averlo detto. Anche la rabbia può stare qui con noi.',es:'Gracias por contarnos. Aquí también está bien sentir enojo.',pt:'Que bom que você contou. Aqui a gente também pode sentir raiva.',nl:'Dank je wel dat je het vertelt. Boos zijn mag hier ook.',sv:'Tack för att du berättar. Här får man vara arg också.',da:'Tak fordi du fortæller det. Her må man også godt være vred.',no:'Takk for at du sier fra. Her er det lov å være sint også.',fi:'Kiitos, että kerroit. Täällä saa olla myös vihainen.'},
    valTired:     {en:'Thank you for telling us. Tired is welcome here.',de:'Danke, dass du es uns sagst. Wir gehen es heute ruhig an.',fr:'Merci de nous le dire. On y va tout doucement aujourd’hui.',it:'Grazie di averlo detto. Oggi andiamo piano.',es:'Gracias por contarnos. Hoy vamos con calma.',pt:'Que bom que você contou. Hoje a gente vai com calma.',nl:'Dank je wel dat je het vertelt. We doen het vandaag rustig aan.',sv:'Tack för att du berättar. Vi tar det lugnt idag.',da:'Tak fordi du fortæller det. Vi tager det roligt i dag.',no:'Takk for at du sier fra. Vi tar det rolig i dag.',fi:'Kiitos, että kerroit. Otetaan tänään rauhallisesti.'},

    /* what could help — FREE, always. The care is never behind the gate. */
    helpTitle:    {en:'What could help?',de:'Was könnte helfen?',fr:'Qu’est-ce qui pourrait aider ?',it:'Che cosa potrebbe aiutare?',es:'¿Qué podría ayudar?',pt:'O que poderia ajudar?',nl:'Wat zou kunnen helpen?',sv:'Vad kan hjälpa?',da:'Hvad kunne hjælpe?',no:'Hva kan hjelpe?',fi:'Mikä voisi auttaa?'},
    helpWater:    {en:'A drink of water',de:'Etwas Wasser trinken',fr:'Boire un peu d’eau',it:'Bere un po’ d’acqua',es:'Tomar un poco de agua',pt:'Beber um pouco de água',nl:'Een slokje water',sv:'Dricka lite vatten',da:'Drikke lidt vand',no:'Drikke litt vann',fi:'Lasillinen vettä'},
    helpQuiet:    {en:'The quiet corner',de:'Die Ruhe-Ecke',fr:'Le coin calme',it:'L’angolo della calma',es:'El rincón de la calma',pt:'O cantinho da calma',nl:'De stille hoek',sv:'Lugna hörnan',da:'Det stille hjørne',no:'Den rolige kroken',fi:'Rauhallinen nurkkaus'},
    helpBreathe:  {en:'Three slow breaths',de:'Dreimal langsam atmen',fr:'Respirer trois fois tout doucement',it:'Tre respiri lenti',es:'Respirar hondo tres veces',pt:'Três respirações lentas',nl:'Drie keer rustig ademhalen',sv:'Tre lugna andetag',da:'Tre rolige vejrtrækninger',no:'Tre rolige pust',fi:'Kolme rauhallista hengitystä'},
    helpGrownup:  {en:'Tell a grown-up',de:'Einem Erwachsenen Bescheid sagen',fr:'En parler à un adulte',it:'Dirlo a un adulto',es:'Contarle a una persona adulta',pt:'Contar para um adulto',nl:'Het aan een volwassene vertellen',sv:'Berätta för en vuxen',da:'Fortælle det til en voksen',no:'Si det til en voksen',fi:'Kertoa aikuiselle'},
    helpNote:     {en:'You can pick one, or none at all. Nobody has to pick.',de:'Du kannst dir eins aussuchen oder auch nichts. Du musst nichts davon tun.',fr:'Tu peux en choisir un, ou aucun. Rien ici n’est obligatoire.',it:'Puoi sceglierne uno, oppure nessuno. Qui niente è un compito.',es:'Puedes elegir una cosa, o ninguna. Nada de esto es tarea.',pt:'Você pode escolher um, ou nenhum. Nada aqui é obrigação.',nl:'Je mag er één kiezen, of geen. Niets hiervan moet.',sv:'Du kan välja ett, eller inget alls. Inget här är en uppgift.',da:'Du kan vælge én — eller ingen. Der er ikke noget her, du skal.',no:'Du kan velge én, eller ingen. Ingenting her er en oppgave.',fi:'Voit valita yhden tai olla valitsematta. Mikään näistä ei ole tehtävä.'},
    backBtn:      {en:'Back to the board',de:'Zurück zur Tafel',fr:'Retour au tableau',it:'Torna al tabellone',es:'Volver al tablero',pt:'Voltar ao quadro',nl:'Terug naar het bord',sv:'Tillbaka till tavlan',da:'Tilbage til tavlen',no:'Tilbake til tavla',fi:'Takaisin taululle'},

    /* roster mode */
    rosterPick:   {en:'Tap your name',de:'Tippe deinen Namen an',fr:'Touche ton prénom',it:'Tocca il tuo nome',es:'Toca tu nombre',pt:'Toque no seu nome',nl:'Tik op je naam',sv:'Tryck på ditt namn',da:'Tryk på dit navn',no:'Trykk på navnet ditt',fi:'Napauta nimeäsi'},
    rosterThen:   {en:'Now tap how you feel, {name}.',de:'Und jetzt: Wie fühlst du dich, {name}?',fr:'Maintenant, choisis comment tu te sens, {name}.',it:'Ora scegli come ti senti, {name}.',es:'Ahora elige cómo te sientes, {name}.',pt:'Agora escolha como você está, {name}.',nl:'Kies nu hoe je je voelt, {name}.',sv:'Välj nu hur du känner dig, {name}.',da:'Vælg nu, hvordan du har det, {name}.',no:'Velg nå hvordan du har det, {name}.',fi:'Valitse nyt, miltä sinusta tuntuu, {name}.'},
    rosterDone:   {en:'{n} of {m} have checked in',de:'{n} von {m} haben sich eingetragen',fr:'{n} sur {m} ont répondu',it:'{n} su {m} hanno risposto',es:'{n} de {m} ya respondieron',pt:'{n} de {m} já responderam',nl:'{n} van de {m} hebben al gekozen',sv:'{n} av {m} har svarat',da:'{n} ud af {m} har tjekket ind',no:'{n} av {m} har sjekket inn',fi:'Kuulumiset kerrottu: {n} / {m}'},
    rosterAgain:  {en:'Change my answer',de:'Antwort ändern',fr:'Changer ma réponse',it:'Cambia la risposta',es:'Cambiar mi respuesta',pt:'Mudar minha resposta',nl:'Mijn keuze veranderen',sv:'Ändra mitt svar',da:'Skift mit svar',no:'Endre svaret mitt',fi:'Vaihda vastausta'},
    noClass:      {en:'Add a class in Name Sticks first — this board reads the same roster.',de:'Legen Sie zuerst in den Namensstäbchen eine Klasse an – diese Tafel liest dieselbe Liste.',fr:'Créez d’abord une classe dans les Bâtonnets de prénoms : ce tableau lit la même liste.',it:'Crea prima una classe in Bastoncini dei nomi: questo tabellone legge lo stesso elenco.',es:'Crea primero una clase en Palitos con nombre: este tablero lee la misma lista.',pt:'Primeiro crie uma turma em Palitos de nomes — este quadro lê a mesma lista.',nl:'Maak eerst een klas aan in Beurtenstokjes — dit bord leest dezelfde lijst.',sv:'Skapa först en klass i Namnpinnar — den här tavlan läser samma lista.',da:'Opret først en klasse i Navnepinde — denne tavle læser den samme liste.',no:'Lag først en klasse i Navnepinner – denne tavla leser den samme lista.',fi:'Luo ensin luokka Nimitikuissa – tämä taulu lukee saman listan.'},

    /* the class weather summary */
    weatherTitle: {en:'Our class weather',de:'Unser Klassenwetter',fr:'La météo de la classe',it:'Il meteo della nostra classe',es:'El clima de nuestra clase',pt:'O tempo da nossa turma',nl:'Het weer in onze klas',sv:'Vårt klassväder',da:'Vores klassevejr',no:'Været i klassen vår',fi:'Luokkamme sää'},
    weatherMostly:{en:'Our class is mostly {main} today, with a little {minor}.',de:'In unserer Klasse ist es heute vor allem {main}, mit ein wenig {minor}.',fr:'Aujourd’hui, notre classe est surtout {main}, avec un peu de {minor}.',it:'Oggi la nostra classe è soprattutto {main}, con un po’ di {minor}.',es:'Hoy nuestra clase está en su mayoría {main}, con un poco de {minor}.',pt:'Hoje a nossa turma está principalmente {main}, com um pouco de {minor}.',nl:'Onze klas is vandaag vooral {main}, met een beetje {minor}.',sv:'I vår klass är det mest {main} idag, med lite {minor}.',da:'Vores klasse er mest {main} i dag, med lidt {minor}.',no:'Klassen vår er mest {main} i dag, med litt {minor}.',fi:'Luokassamme on tänään enimmäkseen {main} ja vähän {minor}.'},
    weatherAll:   {en:'Our whole class is {main} today.',de:'In unserer ganzen Klasse ist es heute {main}.',fr:'Aujourd’hui, toute notre classe est {main}.',it:'Oggi tutta la classe è {main}.',es:'Hoy toda la clase está {main}.',pt:'Hoje a nossa turma inteira está {main}.',nl:'Onze hele klas is vandaag {main}.',sv:'I hela vår klass är det {main} idag.',da:'Hele vores klasse er {main} i dag.',no:'Hele klassen vår er {main} i dag.',fi:'Koko luokassamme on tänään {main}.'},
    weatherNone:  {en:'Nobody has checked in yet today.',de:'Heute hat sich noch niemand eingetragen.',fr:'Personne n’a encore répondu aujourd’hui.',it:'Oggi non ha ancora risposto nessuno.',es:'Hoy todavía nadie ha respondido.',pt:'Hoje ainda ninguém respondeu.',nl:'Vandaag heeft nog niemand gekozen.',sv:'Ingen har svarat ännu idag.',da:'Ingen har tjekket ind endnu i dag.',no:'Ingen har sjekket inn ennå i dag.',fi:'Kukaan ei ole vielä kertonut kuulumisiaan tänään.'},
    wxSun:        {en:'sunny',de:'sonnig',fr:'ensoleillée',it:'soleggiata',es:'soleada',pt:'ensolarada',nl:'zonnig',sv:'soligt',da:'solrig',no:'solrik',fi:'aurinkoista'},
    wxCloud:      {en:'cloudy',de:'wolkig',fr:'nuageuse',it:'nuvolosa',es:'nublada',pt:'nublada',nl:'bewolkt',sv:'molnigt',da:'skyet',no:'skyet',fi:'pilvistä'},
    wxRain:       {en:'rainy',de:'regnerisch',fr:'pluvieuse',it:'piovosa',es:'lluviosa',pt:'chuvosa',nl:'regenachtig',sv:'regnigt',da:'regnfuld',no:'regnfull',fi:'sateista'},
    wxSnow:       {en:'snowy',de:'verschneit',fr:'enneigée',it:'nevosa',es:'nevada',pt:'nevada',nl:'winters',sv:'snöigt',da:'snefuld',no:'snøfull',fi:'lumista'},
    wxStorm:      {en:'stormy',de:'stürmisch',fr:'orageuse',it:'tempestosa',es:'tormentosa',pt:'tempestuosa',nl:'stormachtig',sv:'stormigt',da:'stormfuld',no:'stormfull',fi:'myrskyistä'},
    wxnSun:       {en:'sunshine',de:'Sonne',fr:'soleil',it:'sole',es:'sol',pt:'sol',nl:'zon',sv:'sol',da:'sol',no:'sol',fi:'aurinkoa'},
    wxnCloud:     {en:'cloud',de:'Bewölkung',fr:'nuages',it:'nuvole',es:'nubes',pt:'nuvens',nl:'bewolking',sv:'moln',da:'skydække',no:'skydekke',fi:'pilviä'},
    wxnRain:      {en:'rain',de:'Regen',fr:'pluie',it:'pioggia',es:'lluvia',pt:'chuva',nl:'regen',sv:'regn',da:'regn',no:'regn',fi:'sadetta'},
    wxnSnow:      {en:'snow',de:'Schnee',fr:'neige',it:'neve',es:'nieve',pt:'neve',nl:'sneeuw',sv:'snö',da:'sne',no:'snø',fi:'lunta'},
    wxnStorm:     {en:'thunder',de:'Donner',fr:'tonnerre',it:'tuoni',es:'tormenta',pt:'trovoada',nl:'onweer',sv:'åska',da:'torden',no:'torden',fi:'ukkosta'},
    freshDaily:   {en:'This board clears itself every night.',de:'Diese Tafel leert sich jede Nacht von selbst.',fr:'Ce tableau s’efface tout seul chaque nuit.',it:'Questo tabellone si svuota da solo ogni notte.',es:'Este tablero se borra solo cada noche.',pt:'Este quadro se apaga sozinho toda noite.',nl:'Dit bord maakt zichzelf elke nacht weer leeg.',sv:'Den här tavlan tömmer sig själv varje natt.',da:'Denne tavle tømmer sig selv hver nat.',no:'Denne tavla tømmer seg selv hver natt.',fi:'Tämä taulu tyhjenee itsestään joka yö.'},

    /* gate */
    gateRoster:   {en:'Checking in by name and the class weather are part of Premium — the feelings board is always free.',de:'Das Eintragen mit Namen und das Klassenwetter gehören zu Premium – die Gefühlstafel bleibt immer kostenlos.',fr:'L’appel par prénom et la météo de la classe font partie de Premium — le tableau des émotions reste toujours gratuit.',it:'L’appello con i nomi e il meteo della classe fanno parte di Premium: il tabellone delle emozioni resta sempre gratuito.',es:'El pase de lista con nombres y el clima de la clase son parte de Premium: el tablero de emociones siempre es gratis.',pt:'A chamada com os nomes e o tempo da turma fazem parte do Premium — o quadro das emoções é sempre gratuito.',nl:'Inchecken met namen en het weer in de klas horen bij Premium — het gevoelsbord blijft altijd gratis.',sv:'Att svara med sitt namn och klassvädret ingår i Premium — känslotavlan är alltid gratis.',da:'At tjekke ind med navn og se klassevejret er en del af Premium — følelsestavlen er altid gratis.',no:'Innsjekk med navn og klassevær er en del av Premium – følelsestavla er alltid gratis.',fi:'Omalla nimellä vastaaminen ja luokan sää kuuluvat Premiumiin – tunnetaulu on aina ilmainen.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Voir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Ver o Premium',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium',fi:'Katso Premium'},
    gateClose:    {en:'Not now',de:'Jetzt nicht',fr:'Pas maintenant',it:'Non ora',es:'Ahora no',pt:'Agora não',nl:'Nu niet',sv:'Inte nu',da:'Ikke nu',no:'Ikke nå',fi:'Ei nyt'},

    /* settings */
    setVoice:     {en:'Speak the replies',de:'Antworten vorlesen',fr:'Lire les réponses à voix haute',it:'Leggi le risposte ad alta voce',es:'Leer las respuestas en voz alta',pt:'Ler as respostas em voz alta',nl:'Antwoorden voorlezen',sv:'Läs upp svaren',da:'Læs svarene op',no:'Les opp svarene',fi:'Lue vastaukset ääneen'},

    /* The Teacher’s Desk suite footer — opened by this tool (the sixth) */
    suiteLabel:   {en:'Teacher’s desk tools:',de:'Werkzeuge für den Lehrertisch:',fr:'Outils du bureau de la classe :',it:'Strumenti per la cattedra:',es:'Herramientas para tu escritorio:',pt:'Ferramentas da mesa do professor:',nl:'Hulpmiddelen voor je bureau:',sv:'Verktyg för lärarbordet:',da:'Værktøjer til lærerbordet:',no:'Verktøy for lærerpulten:',fi:'Opettajanpöydän työkalut:'},
    siblingTimer: {en:'Class Timer',de:'Klassen-Timer',fr:'Minuteur de classe',it:'Timer visivo',es:'Temporizador del salón',pt:'Timer da turma',nl:'Klassentimer',sv:'Klassrumstimer',da:'Nedtællingsur',no:'Klassens tidsur',fi:'Luokan ajastin'},
    siblingSticks:{en:'Name Sticks',de:'Namensstäbchen',fr:'Bâtonnets de prénoms',it:'Bastoncini dei nomi',es:'Palitos con nombre',pt:'Palitos de nomes',nl:'Beurtenstokjes',sv:'Namnpinnar',da:'Navnepinde',no:'Navnepinner',fi:'Nimitikut'},
    siblingCenter:{en:'Center Board',de:'Stationen-Tafel',fr:'Tableau des ateliers',it:'Tabellone degli angoli',es:'Tablero de rincones',pt:'Quadro de cantinhos',nl:'Hoekenbord',sv:'Stationstavla',da:'Værkstedstavle',no:'Stasjonstavle',fi:'Työpistetaulu'},
    siblingHush:  {en:'Hush Owl',de:'Die Leise-Eule',fr:'Chouette Dodo',it:'Il gufo della nanna',es:'El búho dormilón',pt:'A coruja dorminhoca',nl:'De slaapuil',sv:'Sovugglan',da:'Uglen sover',no:'Ugla sover',fi:'Unipöllö'},
    siblingDay:   {en:'Our Day',de:'Unser Tag',fr:'Notre journée',it:'La nostra giornata',es:'Nuestro día',pt:'Nosso dia',nl:'Onze dag',sv:'Vår dag',da:'Vores dag',no:'Dagen vår',fi:'Meidän päivä'}
  },

  /* the five, in board order. ids are STABLE and never localized. */
  FEELINGS: ['calm', 'happy', 'sad', 'angry', 'tired'],

  /* feeling -> the weather it reads as on the class summary. The glyphs
     themselves are lifted verbatim from calendar-wall.js:161-174, so a
     teacher who ran Calendar Wall at 8:55 meets the same sun at 9:00. */
  WEATHER_OF: { happy: 'sun', calm: 'cloud', tired: 'snow', sad: 'rain', angry: 'storm' },

  DAY_KEYS: ['dateKey', 'anon', 'picks'],
  MC_KEY: 'lcs:my-classes:v1',          /* READ ONLY. getItem only, ever. */
  STORE_KEY: 'lcs:feelings-check-in:v1',/* the ONLY key this tool writes  */
  ENT_TRUST_DAYS: 14,
  DAY_TICK_MS: 60000,

  defaults: { voice: true },
  settings: [{ key: 'voice', labelKey: 'setVoice', type: 'toggle' }],

  premium: false,

  /* =================================================================
     PURE ENGINE — no DOM, no clock, no storage. The build gate calls
     these directly, which is why they take every input as an argument.
     ================================================================= */

  /* non-padded LOCAL date, byte-identical to name-sticks.js:190.
     NOT string-comparable: '2026-7-9' sorts AFTER '2026-7-10'. */
  dateKeyFrom: function (d) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  },

  /* the closed shape. Adding a key here is a doctrine change, not a tweak. */
  freshDay: function (dateKey) {
    return { dateKey: dateKey, anon: { calm: 0, happy: 0, sad: 0, angry: 0, tired: 0 }, picks: {} };
  },

  /* EQUALITY, never `<` or `>`. Returns the SAME object when the day is
     current, so the caller can detect a roll by identity and never
     re-saves for nothing. Never mutates its input. */
  dayRoll: function (day, todayKey) {
    if (day && day.dateKey === todayKey) return day;
    return this.freshDay(todayKey);
  },

  /* THE STRUCTURAL GATE — the roster mode does not exist for a free
     visitor, so its tab is never built and its names are never read. */
  modesFor: function (premium) { return premium ? ['anon', 'roster'] : ['anon']; },

  /* Returns a COPY, never the live my-classes array — a consumer that
     mutates what it reads mutates someone else’s store. */
  rosterFor: function (mc, classId, premium) {
    if (!premium || !mc || !classId) return [];
    var classes = mc.classes || [];
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].id === classId) {
        var out = [], st = classes[i].students || [];
        for (var j = 0; j < st.length; j++) out.push({ id: st[j].id, name: st[j].name });
        return out;
      }
    }
    return [];
  },

  resolveDeepLink: function (params, premium) {
    if (!params) return null;
    var mode = params.mode === 'roster' ? 'roster' : 'anon';
    if (mode === 'roster' && !premium) return null;   /* refused, never optimistic */
    return { mode: mode, classId: (mode === 'roster' && params.classId) ? params.classId : null };
  },

  /* ONE string per child. Overwrite, never append — a second value is
     the beginning of a history. */
  setPick: function (day, classId, sid, fid) {
    if (!day || !classId || !sid) return day;
    if (this.FEELINGS.indexOf(fid) < 0) return day;
    var picks = {}, k;
    for (k in day.picks) if (Object.prototype.hasOwnProperty.call(day.picks, k)) picks[k] = day.picks[k];
    var cls = {};
    for (k in (picks[classId] || {})) if (Object.prototype.hasOwnProperty.call(picks[classId], k)) cls[k] = picks[classId][k];
    cls[sid] = fid;
    picks[classId] = cls;
    return { dateKey: day.dateKey, anon: day.anon, picks: picks };
  },

  clearPick: function (day, classId, sid) {
    if (!day || !classId || !day.picks[classId]) return day;
    var picks = {}, k;
    for (k in day.picks) if (Object.prototype.hasOwnProperty.call(day.picks, k)) picks[k] = day.picks[k];
    var cls = {};
    for (k in picks[classId]) if (Object.prototype.hasOwnProperty.call(picks[classId], k) && k !== sid) cls[k] = picks[classId][k];
    picks[classId] = cls;
    return { dateKey: day.dateKey, anon: day.anon, picks: picks };
  },

  /* a count, and nothing else — no id, no timestamp. Anonymity means we
     cannot tell a repeat tap from a second child, and that is the
     honest price rather than something to engineer around. */
  addAnon: function (day, fid) {
    if (!day || this.FEELINGS.indexOf(fid) < 0) return day;
    var anon = {}, i;
    for (i = 0; i < this.FEELINGS.length; i++) anon[this.FEELINGS[i]] = day.anon[this.FEELINGS[i]] || 0;
    anon[fid] = anon[fid] + 1;
    return { dateKey: day.dateKey, anon: anon, picks: day.picks };
  },

  tally: function (day, classId, premium) {
    var out = {}, i;
    for (i = 0; i < this.FEELINGS.length; i++) out[this.FEELINGS[i]] = 0;
    if (!day) return out;
    if (premium && classId && day.picks[classId]) {
      var cls = day.picks[classId];
      for (var sid in cls) if (Object.prototype.hasOwnProperty.call(cls, sid)) {
        if (out[cls[sid]] !== undefined) out[cls[sid]]++;
      }
      return out;
    }
    for (i = 0; i < this.FEELINGS.length; i++) out[this.FEELINGS[i]] = day.anon[this.FEELINGS[i]] || 0;
    return out;
  },

  /* Returns a PRIMITIVE — a bare id string or null. The #23 compare()
     discipline: no per-child field can hide inside an object field. */
  weatherFor: function (tally) {
    var best = null, bestN = 0, second = null, secondN = 0, i, f, n;
    for (i = 0; i < this.FEELINGS.length; i++) {
      f = this.FEELINGS[i]; n = tally[f] || 0;
      if (n > bestN) { second = best; secondN = bestN; best = f; bestN = n; }
      else if (n > secondN) { second = f; secondN = n; }
    }
    if (!bestN) return null;
    return secondN ? (best + '+' + second) : best;
  },

  checkedInCount: function (day, classId) {
    if (!day || !classId || !day.picks[classId]) return 0;
    var n = 0;
    for (var sid in day.picks[classId]) if (Object.prototype.hasOwnProperty.call(day.picks[classId], sid)) n++;
    return n;
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    for (var k in args) if (Object.prototype.hasOwnProperty.call(args, k))
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
    return s;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */

  init: function (api) {
    var self = this;
    this.api = api;
    injectFeelingsCheckInCSS();

    this.mode = 'anon';
    this.opened = null;        /* the feeling whose card is open */
    this.selectedSid = null;   /* roster: the child who tapped their name */
    this._mc = null;           /* LAZY — a free visitor never loads it */
    this._classId = null;      /* our own field; the my-classes blob stays frozen */
    this._timers = [];
    this.premiumKnown = false;
    this._deepPending = this._readParams();
    this._store = this._loadStore();

    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this._today();             /* call site 1 — before the first paint */
    this._fetchEntitlement();

    /* call site 3 — a door tablet sleeps overnight and is woken at 08:00
       without ever being reloaded */
    this._onVis = function () { if (!document.hidden) self._tickDay(); };
    document.addEventListener('visibilitychange', this._onVis);

    /* call site 4 — an always-on kiosk that is never hidden and never
       touched still has to cross midnight */
    this._dayTimer = setInterval(function () { self._tickDay(); }, this.DAY_TICK_MS);

    /* call site 5 — the roster was edited in a Name Sticks tab */
    this._onStorage = function (e) {
      if (!e || e.key !== self.MC_KEY || !self.premium) return;
      self._mc = self._loadMC(true);
      self._pruneOrphans();
      if (self._wrap) self.render();
    };
    window.addEventListener('storage', this._onStorage);
  },

  destroy: function () {
    if (this._dayTimer) clearInterval(this._dayTimer);
    if (this._onVis) document.removeEventListener('visibilitychange', this._onVis);
    if (this._onStorage) window.removeEventListener('storage', this._onStorage);
    this._clearTimers();
  },

  _readParams: function () {
    try {
      var p = new URLSearchParams(window.location.search);
      return { mode: p.get('mode'), classId: p.get('class') };
    } catch (_) { return null; }
  },

  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 1;
    if (!s.day || typeof s.day !== 'object') s.day = this.freshDay(this._dateKey());
    return s;
  },

  _saveStore: function () {
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}
  },

  /* my-classes is opened LAZILY and READ-ONLY. A free visitor never gets
     here, so a roster name never enters this tool’s heap. */
  _loadMC: function (force) {
    if (!this.premium) return null;
    if (this._mc && !force) return this._mc;
    try { this._mc = JSON.parse(localStorage.getItem(this.MC_KEY)); } catch (_) { this._mc = null; }
    return this._mc;
  },

  _dateKey: function () { return this.dateKeyFrom(new Date()); },

  /* =================================================================
     THE ONLY TWO PATHS TO THE DAY — one to read, one to write. Nothing
     else in this file may touch `_store.day`: the gate strips these two
     bodies and asserts that no other reference survives (P13). That is
     what makes the Center Board bug unrepeatable — a caller cannot hold
     a day object across an async entitlement swap, because it must ask
     again every time.
     ================================================================= */
  _today: function () {
    var k = this._dateKey();
    var rolled = this.dayRoll(this._store.day, k);
    if (rolled !== this._store.day) { this._store.day = rolled; this._saveStore(); }
    return this._store.day;
  },

  /* every mutation lands here, and only ever on a day that was just
     re-validated by _today() */
  _commitDay: function (next) {
    if (!next || next === this._store.day) return;
    this._store.day = next;
    this._saveStore();
  },

  /* the tick/wake path: roll, and repaint only if the day actually turned */
  _tickDay: function () {
    var before = this._today();
    if (before !== this._lastDayRef) {
      this._lastDayRef = before;
      this.selectedSid = null;
      this.opened = null;
      if (this._wrap) this.render();
    }
  },

  /* a child removed from the roster leaves no orphaned id behind */
  _pruneOrphans: function () {
    if (!this.premium || !this._classId) return;
    var day = this._today();
    var known = {}, roster = this.rosterFor(this._mc, this._classId, this.premium), i;
    for (i = 0; i < roster.length; i++) known[roster[i].id] = 1;
    var cls = day.picks[this._classId];
    if (!cls) return;
    var next = day;
    for (var sid in cls) if (Object.prototype.hasOwnProperty.call(cls, sid) && !known[sid])
      next = this.clearPick(next, this._classId, sid);
    this._commitDay(next);
  },

  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}

    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
      } else self.premium = false;
      self.premiumKnown = true;
      self._settle();
    };

    if (!token) { self.premium = false; self.premiumKnown = true; self._settle(); return; }

    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; self._settle(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        self._settle();
      })
      .catch(trustCache);
  },

  /* call site 2 — THE CENTER BOARD LESSON. Entitlement lands async and
     swaps which board renders; the roll has to happen on THIS path too,
     or the day a premium teacher actually sees is never rolled. */
  _settle: function () {
    this._today();
    this._applyEntryState();
    if (this._wrap) this.render();
  },

  _applyEntryState: function () {
    var d = this._deepPending ? this.resolveDeepLink(this._deepPending, this.premium) : null;
    if (d) {
      if (this.modesFor(this.premium).indexOf(d.mode) >= 0) this.mode = d.mode;
      if (this.premiumKnown) this._deepPending = null;
    }
    if (this.modesFor(this.premium).indexOf(this.mode) < 0) this.mode = 'anon';

    if (this.premium) {
      var mc = this._loadMC();
      var wanted = (d && d.classId) || this._store.lastClassId || (mc && mc.activeClassId) || null;
      var classes = (mc && mc.classes) || [];
      this._classId = null;
      for (var i = 0; i < classes.length; i++) if (classes[i].id === wanted) this._classId = wanted;
      if (!this._classId && classes.length) this._classId = classes[0].id;
      if (this._classId && this._store.lastClassId !== this._classId) {
        this._store.lastClassId = this._classId;
        this._saveStore();
      }
      this._pruneOrphans();
    } else {
      this._mc = null;
      this._classId = null;
    }
  },

  /* =================================================================
     SPEECH
     ================================================================= */

  _speak: function (text) {
    this.api.announce(text);
    if (!this.api.settings.voice) return;
    var self = this;
    if (this._speaking) return;             /* one utterance at a time */
    this._speaking = true;
    this._after(1200, function () { self._speaking = false; });
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },

  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* =================================================================
     RENDER
     ================================================================= */

  render: function () {
    var api = this.api;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'fci-wrap');
    this._wrap = wrap;
    this._lastDayRef = this._today();

    var modes = this.modesFor(this.premium);
    if (modes.length > 1) wrap.appendChild(this._buildModeStrip(modes));

    if (this.opened) wrap.appendChild(this._buildOpened());
    else if (this.mode === 'roster') wrap.appendChild(this._buildRoster());
    else wrap.appendChild(this._buildBoard(null));

    if (this.premium && this.mode === 'roster') wrap.appendChild(this._buildWeather());
    wrap.appendChild(this._buildSiblings());
    if (this.gateOpen) wrap.appendChild(this._buildGate());
    api.stage.appendChild(wrap);
  },

  _buildModeStrip: function (modes) {
    var self = this, api = this.api;
    var strip = api.el('div', 'fci-modes');
    for (var i = 0; i < modes.length; i++) {
      (function (m) {
        var b = api.el('button', 'fci-modebtn' + (self.mode === m ? ' fci-on' : ''));
        b.type = 'button';
        b.textContent = api.t(m === 'anon' ? 'modeAnon' : 'modeRoster');
        b.addEventListener('click', function () {
          self.mode = m; self.opened = null; self.selectedSid = null; self.render();
        });
        strip.appendChild(b);
      })(modes[i]);
    }
    return strip;
  },

  /* ---- the board: five feelings ---- */
  _buildBoard: function (forName) {
    var self = this, api = this.api;
    var box = api.el('div', 'fci-card');

    /* The shell already prints `instruction` in the header strip, so the
       card only speaks when it has something the header does not: the
       name of the child whose turn it is. */
    if (forName) {
      var h = api.el('p', 'fci-lead');
      h.textContent = this.fmt('rosterThen', { name: forName });
      box.appendChild(h);
    }

    var row = api.el('div', 'fci-row');
    for (var i = 0; i < this.FEELINGS.length; i++) {
      (function (f) {
        var b = api.el('button', 'fci-feel');
        b.type = 'button';
        b.setAttribute('data-feel', f);
        var face = api.el('span', 'fci-face');
        face.innerHTML = self._faceSVG(f);
        var lbl = api.el('span', 'fci-feellabel');
        lbl.textContent = api.t(self._labelKey(f));
        b.appendChild(face); b.appendChild(lbl);
        b.setAttribute('aria-label', api.t(self._labelKey(f)));
        b.addEventListener('click', function () { self._chooseFeeling(f); });
        row.appendChild(b);
      })(this.FEELINGS[i]);
    }
    box.appendChild(row);

    var priv = api.el('p', 'fci-privacy');
    priv.textContent = api.t('privacyLine');
    box.appendChild(priv);
    return box;
  },

  _labelKey: function (f) {
    return 'feel' + f.charAt(0).toUpperCase() + f.slice(1);
  },

  /* feeling -> its weather word. The MAIN slot takes the adjective
     ("mostly sunny"), the MINOR slot the noun ("with a little rain") —
     "with a little snowy" is not a sentence in any of the eleven. */
  _wxKey: function (f, noun) {
    var w = this.WEATHER_OF[f] || 'cloud';
    return (noun ? 'wxn' : 'wx') + w.charAt(0).toUpperCase() + w.slice(1);
  },

  _chooseFeeling: function (f) {
    var day = this._today();
    if (this.mode === 'roster' && this.premium && this._classId && this.selectedSid) {
      this._commitDay(this.setPick(day, this._classId, this.selectedSid, f));
    } else {
      this._commitDay(this.addAnon(day, f));
    }
    this.opened = f;
    try { this.api.sound(660); } catch (_) {}
    this.render();
    this._speak(this.api.t('val' + f.charAt(0).toUpperCase() + f.slice(1)));
  },

  /* ---- the opened card: validation + what could help ---- */
  _buildOpened: function () {
    var self = this, api = this.api;
    var f = this.opened;
    var box = api.el('div', 'fci-card fci-opened');

    var face = api.el('div', 'fci-bigface');
    face.innerHTML = this._faceSVG(f, true);
    box.appendChild(face);

    var name = api.el('p', 'fci-bigname');
    name.textContent = api.t(this._labelKey(f));
    box.appendChild(name);

    var val = api.el('p', 'fci-validation');
    val.textContent = api.t('val' + f.charAt(0).toUpperCase() + f.slice(1));
    box.appendChild(val);

    /* the help menu is FREE — the supportive half is never sold */
    var ht = api.el('h2', 'fci-helptitle'); ht.textContent = api.t('helpTitle');
    box.appendChild(ht);
    var hrow = api.el('div', 'fci-helprow');
    var HELP = [['water', 'helpWater'], ['quiet', 'helpQuiet'], ['breathe', 'helpBreathe'], ['grownup', 'helpGrownup']];
    for (var i = 0; i < HELP.length; i++) {
      (function (h) {
        var c = api.el('button', 'fci-help');
        c.type = 'button';
        var ic = api.el('span', 'fci-helpic'); ic.innerHTML = self._helpSVG(h[0]);
        var t = api.el('span', 'fci-helplabel'); t.textContent = api.t(h[1]);
        c.appendChild(ic); c.appendChild(t);
        c.addEventListener('click', function () { self._speak(api.t(h[1])); });
        hrow.appendChild(c);
      })(HELP[i]);
    }
    box.appendChild(hrow);

    var note = api.el('p', 'fci-helpnote'); note.textContent = api.t('helpNote');
    box.appendChild(note);

    var back = api.el('button', 'fci-go'); back.type = 'button';
    back.textContent = api.t('backBtn');
    back.addEventListener('click', function () {
      self.opened = null; self.selectedSid = null; self.render();
    });
    box.appendChild(back);
    return box;
  },

  /* ---- roster mode ---- */
  _buildRoster: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'fci-card');

    var roster = this.rosterFor(this._loadMC(), this._classId, this.premium);
    if (!roster.length) {
      var note = api.el('p', 'fci-lead'); note.textContent = api.t('noClass');
      box.appendChild(note);
      return box;
    }

    if (this.selectedSid) {
      var who = null;
      for (var k = 0; k < roster.length; k++) if (roster[k].id === this.selectedSid) who = roster[k];
      if (who) return this._buildBoard(who.name);
      this.selectedSid = null;
    }

    var lead = api.el('p', 'fci-lead'); lead.textContent = api.t('rosterPick');
    box.appendChild(lead);

    var day = this._today();
    var picks = day.picks[this._classId] || {};
    var grid = api.el('div', 'fci-names');
    for (var i = 0; i < roster.length; i++) {
      (function (s) {
        var done = picks[s.id];
        var b = api.el('button', 'fci-name' + (done ? ' fci-done' : ''));
        b.type = 'button';
        if (done) {
          var mini = api.el('span', 'fci-minface');
          mini.innerHTML = self._faceSVG(done);
          b.appendChild(mini);
        }
        var t = api.el('span', 'fci-nametext'); t.textContent = s.name;
        b.appendChild(t);
        b.addEventListener('click', function () { self.selectedSid = s.id; self.render(); });
        grid.appendChild(b);
      })(roster[i]);
    }
    box.appendChild(grid);

    var count = api.el('p', 'fci-count');
    count.textContent = this.fmt('rosterDone', { n: this.checkedInCount(day, this._classId), m: roster.length });
    box.appendChild(count);

    var fresh = api.el('p', 'fci-privacy'); fresh.textContent = api.t('freshDaily');
    box.appendChild(fresh);
    return box;
  },

  /* ---- the class weather summary (premium) ---- */
  _buildWeather: function () {
    var api = this.api;
    var box = api.el('div', 'fci-weather');
    var h = api.el('h2', 'fci-wtitle'); h.textContent = api.t('weatherTitle');
    box.appendChild(h);

    var t = this.tally(this._today(), this._classId, this.premium);
    var key = this.weatherFor(t);
    var line = api.el('p', 'fci-wline');

    if (!key) { line.textContent = api.t('weatherNone'); box.appendChild(line); return box; }

    var parts = key.split('+');
    var icons = api.el('div', 'fci-wicons');
    for (var i = 0; i < parts.length; i++) {
      var g = api.el('span', 'fci-wicon');
      g.innerHTML = this._weatherSVG(this.WEATHER_OF[parts[i]]);
      icons.appendChild(g);
    }
    box.appendChild(icons);

    /* the sentence speaks WEATHER, never the feeling adjectives: a class
       is "mostly sunny with a little rain", never "mostly calm with a
       little tired". The metaphor is what keeps the summary about the
       room rather than about any child — and it sidesteps the article
       and agreement traps that the feeling adjectives carry (na:1). */
    if (parts.length === 1) line.textContent = this.fmt('weatherAll', { main: api.t(this._wxKey(parts[0])) });
    else line.textContent = this.fmt('weatherMostly', {
      main: api.t(this._wxKey(parts[0])),
      minor: api.t(this._wxKey(parts[1], true))
    });
    box.appendChild(line);
    return box;
  },

  /* ---- gate + suite footer ---- */
  _buildGate: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'fci-scrim');
    scrim.addEventListener('click', function (e) { if (e.target === scrim) { self.gateOpen = false; self.render(); } });
    var g = api.el('div', 'fci-gate');
    var p = api.el('p', 'fci-gate-line'); p.textContent = api.t('gateRoster');
    g.appendChild(p);
    var a = api.el('a', 'fci-gate-cta');
    a.href = '/' + api.lang + '/pricing?from=tool-feelings-check-in';
    a.target = '_top';
    a.textContent = api.t('unlock');
    g.appendChild(a);
    var c = api.el('button', 'fci-gate-close'); c.type = 'button';
    c.textContent = api.t('gateClose');
    c.addEventListener('click', function () { self.gateOpen = false; self.render(); });
    g.appendChild(c);
    scrim.appendChild(g);
    return scrim;
  },

  /* The Teacher’s Desk suite footer. This is the SIXTH of six, so it is
     the tool that opens it — additively, in this file only. */
  _buildSiblings: function () {
    var api = this.api;
    var f = api.el('div', 'fci-siblings');
    var lbl = api.el('span', 'fci-sib-label'); lbl.textContent = api.t('suiteLabel') + ' ';
    f.appendChild(lbl);
    var defs = [
      { file: 'class-timer', key: 'siblingTimer' },
      { file: 'name-sticks', key: 'siblingSticks' },
      { file: 'center-board', key: 'siblingCenter' },
      { file: 'hush-owl', key: 'siblingHush' },
      { file: 'our-day', key: 'siblingDay' }
    ];
    for (var i = 0; i < defs.length; i++) {
      if (i) { var sep = api.el('span', 'fci-sib-sep'); sep.textContent = ' · '; f.appendChild(sep); }
      var a = api.el('a', 'fci-sib-link');
      a.href = '/mini-tools/' + defs[i].file + '.html?lang=' + api.lang;
      a.target = '_top';
      a.textContent = api.t(defs[i].key);
      f.appendChild(a);
    }
    return f;
  },

  /* =================================================================
     ART — five faces, four help pictos, six weather glyphs.
     Flat Direction-A: teal structure, coral cheeks, cream face, honey
     ink for features. Hardcoded hex (never var()) so the fragments stay
     portable, exactly as our-day.js:1013-1015 does it.

     TONE (docs/character-art-spec.md): sad "doesn’t cry, they just go
     quiet" — never scolded, never pitiable; angry is felt, never bad.
     ================================================================= */

  _faceSVG: function (f, big) {
    var uid = 'fci' + (++this._uid || (this._uid = 1));
    var base = '<circle cx="24" cy="24" r="17" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.4"/>';
    var cheeks = '<circle cx="13.5" cy="27" r="3.2" fill="#F2784B" opacity="0.32"/><circle cx="34.5" cy="27" r="3.2" fill="#F2784B" opacity="0.32"/>';
    var F = {
      /* calm — eyes softly closed, a small settled smile */
      calm: '<g stroke="#8F6512" stroke-width="1.9" fill="none" stroke-linecap="round">'
        + '<path d="M15.5 22.5 q3 2.6 6 0"/><path d="M26.5 22.5 q3 2.6 6 0"/>'
        + '<path d="M19.5 30.5 q4.5 2.6 9 0"/></g>',
      /* happy — eyes happy-closed (^ ^), open smile */
      happy: '<g stroke="#8F6512" stroke-width="1.9" fill="none" stroke-linecap="round">'
        + '<path d="M15.5 23.5 q3 -3.4 6 0"/><path d="M26.5 23.5 q3 -3.4 6 0"/></g>'
        + '<path d="M18 29 q6 6.4 12 0 z" fill="#C4552B"/>',
      /* sad — looking down, mouth small and level. No tears. */
      sad: '<g fill="#8F6512"><circle cx="18.5" cy="24.6" r="2"/><circle cx="29.5" cy="24.6" r="2"/></g>'
        + '<g stroke="#8F6512" stroke-width="1.7" fill="none" stroke-linecap="round">'
        + '<path d="M15 20.5 q3.4 -1.6 6.6 0.4"/><path d="M33 20.5 q-3.4 -1.6 -6.6 0.4"/>'
        + '<path d="M20 31.5 q4 -2 8 0"/></g>',
      /* angry — brows in, mouth level. Felt, not bad. */
      angry: '<g fill="#8F6512"><circle cx="18.5" cy="24" r="2"/><circle cx="29.5" cy="24" r="2"/></g>'
        + '<g stroke="#8F6512" stroke-width="2.1" fill="none" stroke-linecap="round">'
        + '<path d="M14.6 19.6 l6.2 2.6"/><path d="M33.4 19.6 l-6.2 2.6"/>'
        + '<path d="M19.5 31 h9"/></g>',
      /* tired — heavy half-lids and a small yawn */
      tired: '<g stroke="#8F6512" stroke-width="1.9" fill="none" stroke-linecap="round">'
        + '<path d="M15.5 24 q3 -2.4 6 0"/><path d="M26.5 24 q3 -2.4 6 0"/></g>'
        + '<ellipse cx="24" cy="31" rx="3.2" ry="2.4" fill="#C4552B"/>'
        + '<g stroke="#146B5E" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.75">'
        + '<path d="M36 12 h4 l-4 4 h4"/></g>'
    };
    return '<svg viewBox="0 0 48 48" aria-hidden="true" data-uid="' + uid + '"'
      + (big ? ' class="fci-svg-big"' : '') + '>' + base + cheeks + (F[f] || F.calm) + '</svg>';
  },

  _helpSVG: function (id) {
    var P = {
      water: '<path d="M17 14 h14 l-2 26 a5 5 0 0 1 -10 0 z" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/><path d="M17.9 26 h12.2 l-1.1 14 a5 5 0 0 1 -10 0 z" fill="#9CC3E5"/>',
      quiet: '<path d="M9 40 v-9 a9 9 0 0 1 9 -9 h12 a9 9 0 0 1 9 9 v9" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><path d="M6 40 h36" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round"/><path d="M16 22 v-4 a8 8 0 0 1 16 0 v4" fill="none" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round"/>',
      breathe: '<circle cx="24" cy="24" r="7" fill="#BFE3DC" stroke="#146B5E" stroke-width="2.2"/><g stroke="#146B5E" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.55"><circle cx="24" cy="24" r="13"/></g><g stroke="#F2784B" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M24 3 v5"/><path d="M24 40 v5"/></g>',
      grownup: '<circle cx="18" cy="15" r="6" fill="#F2C879"/><path d="M7 40 q0 -12 11 -12 t11 12" fill="#146B5E"/><circle cx="34" cy="21" r="4.6" fill="#F2C879"/><path d="M26 40 q0 -9 8 -9 t8 9" fill="#F2784B"/>'
    };
    return '<svg viewBox="0 0 48 48" aria-hidden="true">' + (P[id] || P.breathe) + '</svg>';
  },

  /* lifted verbatim from calendar-wall.js:161-174 — same house, same sky */
  _weatherSVG: function (id) {
    var W = {
      sun: '<circle cx="24" cy="24" r="10" fill="#F2A93B"/><g stroke="#F2A93B" stroke-width="3.4" stroke-linecap="round"><line x1="24" y1="3" x2="24" y2="9"/><line x1="24" y1="39" x2="24" y2="45"/><line x1="3" y1="24" x2="9" y2="24"/><line x1="39" y1="24" x2="45" y2="24"/><line x1="9.2" y1="9.2" x2="13.4" y2="13.4"/><line x1="34.6" y1="34.6" x2="38.8" y2="38.8"/><line x1="9.2" y1="38.8" x2="13.4" y2="34.6"/><line x1="34.6" y1="13.4" x2="38.8" y2="9.2"/></g>',
      cloud: '<path d="M13 34a8 8 0 1 1 1.4-15.9A11 11 0 0 1 35.5 20 8.5 8.5 0 0 1 35 34z" fill="#9FB6B0"/>',
      rain: '<path d="M13 27a8 8 0 1 1 1.4-15.9A11 11 0 0 1 35.5 13 8.5 8.5 0 0 1 35 27z" fill="#9FB6B0"/><g stroke="#4A90B8" stroke-width="3.2" stroke-linecap="round"><line x1="16" y1="33" x2="14" y2="41"/><line x1="25" y1="33" x2="23" y2="41"/><line x1="34" y1="33" x2="32" y2="41"/></g>',
      snow: '<g stroke="#7FB4CC" stroke-width="3" stroke-linecap="round"><line x1="24" y1="6" x2="24" y2="42"/><line x1="8.4" y1="15" x2="39.6" y2="33"/><line x1="8.4" y1="33" x2="39.6" y2="15"/><line x1="24" y1="6" x2="20" y2="11"/><line x1="24" y1="6" x2="28" y2="11"/><line x1="24" y1="42" x2="20" y2="37"/><line x1="24" y1="42" x2="28" y2="37"/></g>',
      storm: '<path d="M13 25a8 8 0 1 1 1.4-15.9A11 11 0 0 1 35.5 11 8.5 8.5 0 0 1 35 25z" fill="#8AA8A0"/><path d="M26 24l-8 12h6l-3 10 11-14h-6l4-8z" fill="#F2A93B"/>'
    };
    return '<svg viewBox="0 0 48 48" aria-hidden="true">' + (W[id] || W.cloud) + '</svg>';
  },

  reset: function () {
    this.opened = null;
    this.selectedSid = null;
    this.mode = 'anon';
    if (this._wrap) this.render();
  },

  onSettings: function () { if (this._wrap) this.render(); }
};

function injectFeelingsCheckInCSS() {
  if (document.getElementById('fci-style')) return;
  var st = document.createElement('style');
  st.id = 'fci-style';
  st.textContent = ''
    + '.fci-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'

    + '.fci-modes{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}'
    + '.fci-modebtn{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFFDF7;'
    + 'border:2px solid #146B5E22;border-radius:999px;padding:11px 18px;min-height:44px;cursor:pointer;}'
    + '.fci-modebtn.fci-on{background:#146B5E;color:#FFFDF7;border-color:#146B5E;}'

    + '.fci-card{position:relative;width:100%;max-width:680px;margin-inline:auto;background:#FFFDF7;'
    + 'border-radius:22px;box-shadow:0 6px 22px rgba(20,107,94,.10),0 1px 3px rgba(0,0,0,.06);'
    + 'padding:20px 16px 16px;display:flex;flex-direction:column;align-items:center;gap:12px;box-sizing:border-box;}'

    + '.fci-lead{font:600 clamp(15px,3.4vw,19px)/1.4 Nunito,system-ui,sans-serif;color:#146B5E;'
    + 'text-align:center;margin:0;max-width:34ch;}'

    /* the five feelings */
    + '.fci-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;width:100%;}'
    + '.fci-feel{display:flex;flex-direction:column;align-items:center;gap:6px;background:#FFF9EE;'
    + 'border:2.5px solid #146B5E22;border-radius:20px;padding:16px 12px;min-width:112px;min-height:44px;'
    + 'cursor:pointer;transition:transform .16s cubic-bezier(.2,.8,.2,1),border-color .16s;}'
    + '.fci-feel:hover,.fci-feel:focus-visible{border-color:#146B5E;transform:translateY(-2px);}'
    + '.fci-face{width:clamp(56px,13vw,92px);aspect-ratio:1;display:block;}'
    + '.fci-face svg{width:100%;height:100%;}'
    + '.fci-feellabel{font:700 clamp(14px,3.2vw,18px)/1.1 Nunito,system-ui,sans-serif;color:#3A3226;}'

    /* the opened card */
    + '.fci-opened{gap:8px;}'
    + '.fci-bigface{width:clamp(90px,26vw,140px);aspect-ratio:1;}'
    + '.fci-bigface svg{width:100%;height:100%;}'
    + '.fci-bigname{font:700 clamp(20px,5vw,28px)/1.1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}'
    + '.fci-validation{font:600 clamp(15px,3.4vw,19px)/1.45 Nunito,system-ui,sans-serif;color:#3A3226;'
    + 'text-align:center;margin:0 0 6px;max-width:32ch;}'
    + '.fci-helptitle{font:700 clamp(14px,3vw,17px)/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:4px 0 0;}'
    + '.fci-helprow{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;}'
    + '.fci-help{display:flex;flex-direction:column;align-items:center;gap:5px;background:#FFF9EE;'
    + 'border:2px solid #146B5E1f;border-radius:14px;padding:10px 8px;min-width:84px;min-height:44px;cursor:pointer;}'
    + '.fci-help:hover,.fci-help:focus-visible{border-color:#146B5E;}'
    + '.fci-helpic{width:34px;height:34px;}'
    + '.fci-helpic svg{width:100%;height:100%;}'
    + '.fci-helplabel{font:600 12.5px/1.25 Nunito,system-ui,sans-serif;color:#3A3226;text-align:center;max-width:13ch;}'
    + '.fci-helpnote{font:italic 500 12.5px/1.4 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;margin:2px 0 0;}'

    + '.fci-go{font:700 15px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;border:none;'
    + 'border-radius:999px;padding:14px 26px;min-height:44px;cursor:pointer;margin-top:6px;}'

    /* roster */
    + '.fci-names{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;}'
    + '.fci-name{display:inline-flex;align-items:center;gap:7px;background:#F7E9CF;'
    + 'border:2.5px solid #146B5E;border-radius:999px;padding:10px 16px;min-height:44px;cursor:pointer;'
    + 'font:700 15px/1 Nunito,system-ui,sans-serif;color:#1F2A28;}'
    + '.fci-name.fci-done{background:#E2F0EC;border-color:#146B5E66;}'
    + '.fci-minface{width:24px;height:24px;flex:none;}'
    + '.fci-minface svg{width:100%;height:100%;}'
    + '.fci-count{font:600 14px/1.3 Nunito,system-ui,sans-serif;color:#146B5E;margin:2px 0 0;}'

    /* the class weather */
    + '.fci-weather{width:100%;max-width:680px;margin-inline:auto;background:#FFF9EE;'
    + 'border:2px solid #146B5E1a;border-radius:18px;padding:14px;text-align:center;box-sizing:border-box;}'
    + '.fci-wtitle{font:700 15px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0 0 8px;}'
    + '.fci-wicons{display:flex;gap:10px;justify-content:center;margin-bottom:6px;}'
    + '.fci-wicon{width:40px;height:40px;}'
    + '.fci-wicon svg{width:100%;height:100%;}'
    + '.fci-wline{font:600 clamp(14px,3.2vw,17px)/1.4 Nunito,system-ui,sans-serif;color:#3A3226;margin:0;}'

    + '.fci-privacy{font:500 12px/1.45 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;'
    + 'margin:6px 0 0;max-width:46ch;}'

    /* gate */
    + '.fci-scrim{position:fixed;inset:0;background:rgba(20,30,28,.45);display:grid;place-items:center;'
    + 'padding:18px;z-index:70;}'
    + '.fci-gate{background:#FFFDF7;border-radius:20px;max-width:420px;width:100%;padding:20px;text-align:center;z-index:71;}'
    + '.fci-gate-line{font:600 16px/1.45 Nunito,system-ui,sans-serif;color:#3A3226;margin:0 0 14px;}'
    + '.fci-gate-cta{display:inline-block;font:700 15px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;'
    + 'border-radius:999px;padding:14px 22px;text-decoration:none;min-height:44px;box-sizing:border-box;}'
    + '.fci-gate-close{display:block;margin:12px auto 0;font:600 14px/1 Nunito,system-ui,sans-serif;color:#7A6A55;'
    + 'background:none;border:none;cursor:pointer;min-height:44px;}'

    + '.fci-siblings{font:500 13px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;}'
    + '.fci-sib-link{color:#146B5E;text-decoration:underline;}'

    + '@media (max-width:420px){'
    + '.fci-card{padding:14px 10px 12px;border-radius:18px;}'
    + '.fci-feel{min-width:88px;padding:11px 7px;}'
    + '.fci-help{min-width:74px;}'
    + '}'

    + '@media (prefers-reduced-motion:reduce){'
    + '.fci-feel{transition:none;}'
    + '.fci-feel:hover,.fci-feel:focus-visible{transform:none;}'
    + '}'

    + '@media print{'
    + '.fci-modes,.fci-go,.fci-scrim,.fci-siblings,.fci-helprow{display:none !important;}'
    + '.fci-card{box-shadow:none;border:1.5pt solid #666;page-break-inside:avoid;break-inside:avoid;}'
    + '}';
  document.head.appendChild(st);
}
