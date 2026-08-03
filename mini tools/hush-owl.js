/* =====================================================================
   TOOL #28 — HUSH OWL   (hush-owl.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #13 of the Premium Tools Program
   (Wave 2) — the Teacher's Desk noise companion: a sleepy illustrated
   owl on a branch; the room's microphone volume sways the branch;
   sustained loudness slowly wakes him. The class's shared goal is
   "let the owl sleep."

   NO-SHAME DESIGN (pedagogy-locked): no sirens, no red anywhere, no
   decibel numbers, no meter bars, no history, no streaks, no per-child
   anything. Feedback is about the ROOM, ambient and gentle. The awake
   owl is curious, never angry (no brows in the part inventory — that is
   how cartoon owls get angry; structurally impossible here). Recovery
   is always identical — closure, not reward. This tool NEVER emits
   sound (a noise meter making noise is self-defeating).

   PRIVACY (GDPR-forward, measured by the harness): the microphone
   signal is analysed on this device only. Nothing is recorded, saved
   or sent — no MediaRecorder, no WebSocket, no RTCPeerConnection, no
   sendBeacon; the ONLY network call in this file is the entitlement
   check (/api/auth/me). The mic starts ONLY on the Start tap and
   track.stop() runs on Stop/pagehide so the OS mic light goes off.

   ENGINE (three time scales, all frame-rate-independent one-pole
   filters): a fast envelope drives the branch sway (attack 150ms /
   release 800ms); a slow 1.5s filter feeds the decision layer (a
   dropped pencil cannot move it); a calm-budget accumulator
   `wake` in [0,1] rises ~20s to fully wake and falls ~12s to sleep
   (recovery deliberately FASTER than escalation), with hysteresis
   thresholds 0.10/0.35/0.60/0.90 + a 2s dwell so the owl never
   flickers. Per-frame dt is clamped to 250ms — a hidden tab freezes
   the owl, it never dumps time. Manual "Teacher's ears" mode is a
   provider swap (teacher taps the room state); everything downstream
   is byte-identical.
   ===================================================================== */
var HushOwl = {
  id: 'hush-owl',

  strings: {
    title:        {en:'Hush Owl',de:'Schlummereule',fr:'Chouette Dodo',it:'Il gufo della nanna',es:'El búho dormilón',pt:'A coruja dorminhoca',nl:'De slaapuil',sv:'Sovugglan',da:'Uglen sover',no:'Ugla sover',fi:'Unipöllö'},
    instruction:  {en:'Pick today’s voices, then tap Start — while the room stays calm and cozy, the owl sleeps.',de:'Wählt die Stimmen für heute und tippt auf Start — solange es im Raum schön ruhig bleibt, schläft die Eule.',fr:'Choisissez les voix du jour, puis appuyez sur « Commencer l’écoute » — tant que la classe reste bien calme, la chouette dort.',it:'Scegli le voci di oggi e tocca Avvia — finché la classe resta tranquilla, il gufo dorme.',es:'Elige las voces de hoy y toca «Empezar a escuchar» — mientras el salón esté tranquilo, el búho duerme.',pt:'Escolha as vozes de hoje e toque em Começar — enquanto a sala estiver calma e aconchegante, a coruja dorme.',nl:'Kies de stemmen van vandaag en tik op Start — zolang het lekker rustig blijft in de klas, slaapt de uil.',sv:'Välj dagens röster och tryck på Börja lyssna — så länge det är lugnt och mysigt i rummet sover ugglan.',da:'Vælg dagens stemmer, og tryk på Start — så længe der er ro og hygge i klassen, sover uglen.',no:'Velg dagens stemmer og trykk på Start — så lenge det er rolig i rommet, sover ugla.',fi:'Valitse päivän äänitaso ja napauta Aloita — niin kauan kuin luokassa on rauhallista, pöllö nukkuu.'},
    /* the shared goal — one line per character */
    goalOwl:      {en:'Let the owl sleep.',de:'Lasst die Eule schlafen.',fr:'Laissons dormir la chouette.',it:'Lasciamo dormire il gufo.',es:'Dejemos dormir al búho.',pt:'Vamos deixar a coruja dormir.',nl:'Laat de uil slapen.',sv:'Låt ugglan sova.',da:'Lad uglen sove.',no:'La ugla sove.',fi:'Annetaan pöllön nukkua.'},
    goalCat:      {en:'Let the cat sleep.',de:'Lasst die Katze schlafen.',fr:'Laissons dormir le chat.',it:'Lasciamo dormire il gatto.',es:'Dejemos dormir al gato.',pt:'Vamos deixar o gato dormir.',nl:'Laat de poes slapen.',sv:'Låt katten sova.',da:'Lad katten sove.',no:'La katten sove.',fi:'Annetaan kissan nukkua.'},
    goalDragon:   {en:'Let the dragon sleep.',de:'Lasst den Drachen schlafen.',fr:'Laissons dormir le dragon.',it:'Lasciamo dormire il draghetto.',es:'Dejemos dormir al dragón.',pt:'Vamos deixar o dragão dormir.',nl:'Laat het draakje slapen.',sv:'Låt draken sova.',da:'Lad dragen sove.',no:'La dragen sove.',fi:'Annetaan lohikäärmeen nukkua.'},
    /* voice-level targets — names + pictograms, never numbers */
    levelRow:     {en:'Today’s voices',de:'Unsere Stimmen heute',fr:'Les voix du jour',it:'Le voci di oggi',es:'Las voces de hoy',pt:'As vozes de hoje',nl:'De stemmen van vandaag',sv:'Dagens röster',da:'Dagens stemmer',no:'Dagens stemmer',fi:'Päivän äänitaso'},
    levelSilent:  {en:'Silent',de:'Stille',fr:'Silence',it:'Silenzio',es:'Silencio',pt:'Silêncio',nl:'Stilte',sv:'Tyst arbete',da:'Helt stille',no:'Stille',fi:'Hiljaisuus'},
    levelWhisper: {en:'Whisper voices',de:'Flüsterstimme',fr:'Voix chuchotée',it:'Voce sussurrata',es:'Voz de secreto',pt:'Voz de sussurro',nl:'Fluisterstem',sv:'Viskröst',da:'Hviskestemme',no:'Hviskestemme',fi:'Kuiskausääni'},
    levelPartner: {en:'Partner voices',de:'Partnerstimme',fr:'Voix à deux',it:'Voce a coppie',es:'Voz baja',pt:'Voz de dupla',nl:'Overlegstem',sv:'Samtalsröst',da:'Makkerstemme',no:'Makkerstemme',fi:'Parityön ääni'},
    levelGroup:   {en:'Group-work voices',de:'Gruppenstimme',fr:'Voix de groupe',it:'Lavoro di gruppo',es:'Voz de equipo',pt:'Trabalho em grupo',nl:'Groepsstem',sv:'Grupparbetsröst',da:'Gruppearbejde',no:'Gruppestemme',fi:'Ryhmätyön ääni'},
    /* listening controls */
    start:        {en:'Start listening',de:'Zuhören starten',fr:'Commencer l’écoute',it:'Inizia ad ascoltare',es:'Empezar a escuchar',pt:'Começar a escutar',nl:'Start met luisteren',sv:'Börja lyssna',da:'Begynd at lytte',no:'Begynn å lytte',fi:'Aloita kuuntelu'},
    stopListen:   {en:'Stop',de:'Stopp',fr:'Arrêter',it:'Ferma',es:'Detener',pt:'Parar',nl:'Stoppen',sv:'Stoppa',da:'Stop',no:'Stopp',fi:'Lopeta'},
    resumeListen: {en:'Resume listening',de:'Weiter zuhören',fr:'Reprendre l’écoute',it:'Riprendi l’ascolto',es:'Seguir escuchando',pt:'Continuar escutando',nl:'Verder luisteren',sv:'Fortsätt lyssna',da:'Lyt videre',no:'Fortsett å lytte',fi:'Jatka kuuntelua'},
    statusListening:{en:'The owl is listening to the room',de:'Die Eule lauscht in den Raum',fr:'La chouette écoute la classe',it:'Il gufo ascolta la classe',es:'El búho está escuchando el salón',pt:'A coruja está escutando a sala',nl:'De uil luistert naar de klas',sv:'Ugglan lyssnar på rummet',da:'Uglen lytter til klassen',no:'Ugla lytter til rommet',fi:'Pöllö kuuntelee luokkaa'},
    statusPaused: {en:'The microphone is off',de:'Das Mikrofon ist aus',fr:'Le micro est éteint',it:'Il microfono è spento',es:'El micrófono está apagado',pt:'O microfone está desligado',nl:'De microfoon staat uit',sv:'Mikrofonen är av',da:'Mikrofonen er slukket',no:'Mikrofonen er av',fi:'Mikrofoni on pois päältä'},
    /* the privacy promise — recorded / saved / sent must stay THREE distinct verbs */
    privacy:      {en:'The owl only listens right here in your classroom — sound levels are measured on this device and nothing is ever recorded, saved, or sent anywhere.',de:'Die Eule hört nur hier im Klassenzimmer zu — die Lautstärke wird direkt auf diesem Gerät gemessen, und nichts wird jemals aufgenommen, gespeichert oder übertragen.',fr:'La chouette écoute uniquement ici, dans votre classe — le niveau sonore est mesuré sur cet appareil et rien n’est jamais enregistré, conservé ou transmis.',it:'Il gufo ascolta solo qui, nella vostra classe — il volume viene misurato su questo dispositivo e niente viene mai registrato, salvato o inviato.',es:'El búho solo escucha aquí, en tu salón — el nivel de sonido se mide en este dispositivo y nada se graba, se guarda ni se envía jamás.',pt:'A coruja só escuta aqui, na sua sala de aula — o nível de som é medido neste aparelho e nada jamais é gravado, salvo ou enviado a lugar nenhum.',nl:'De uil luistert alleen hier in de klas — het geluidsniveau wordt op dit apparaat gemeten en er wordt nooit iets opgenomen, bewaard of verstuurd.',sv:'Ugglan lyssnar bara här i klassrummet — ljudnivån mäts på den här enheten och ingenting spelas någonsin in, sparas eller skickas.',da:'Uglen lytter kun her i klasseværelset — lydniveauet måles på denne enhed, og intet bliver nogensinde optaget, gemt eller sendt.',no:'Ugla lytter bare her i klasserommet — lydnivået måles på denne enheten, og ingenting blir noen gang tatt opp, lagret eller sendt.',fi:'Pöllö kuuntelee vain täällä luokassa — äänitaso mitataan tällä laitteella, eikä mitään koskaan äänitetä, tallenneta tai lähetetä.'},
    /* microphone problems — each offers Teacher’s ears */
    errDenied:    {en:'The microphone is blocked. Check the padlock icon in the address bar — on school devices this setting may be managed by your school. Teacher’s ears works without a microphone.',de:'Das Mikrofon ist blockiert. Prüfe das Schloss-Symbol in der Adressleiste — auf Schulgeräten kann diese Einstellung von der Schule verwaltet sein. Der Modus „Deine Ohren“ funktioniert ganz ohne Mikrofon.',fr:'Le micro est bloqué. Vérifiez le cadenas dans la barre d’adresse — sur les appareils de l’école, ce réglage peut être géré par l’établissement. Le mode « Mes oreilles » fonctionne sans micro.',it:'Il microfono è bloccato. Controlla il lucchetto nella barra degli indirizzi — sui dispositivi scolastici questa impostazione può essere gestita dalla scuola. Le orecchie dell’insegnante funzionano senza microfono.',es:'El micrófono está bloqueado. Revisa el candado en la barra de direcciones — en los equipos escolares, este ajuste puede estar administrado por tu escuela. Los oídos de profe funcionan sin micrófono.',pt:'O microfone está bloqueado. Verifique o cadeado na barra de endereço — em aparelhos escolares, essa configuração pode ser gerenciada pela escola. Os ouvidos da professora funcionam sem microfone.',nl:'De microfoon is geblokkeerd. Kijk bij het slotje in de adresbalk — op schoolapparaten kan deze instelling door de school worden beheerd. De oren van de juf of meester werken zonder microfoon.',sv:'Mikrofonen är blockerad. Titta på hänglåset i adressfältet — på skolans enheter kan inställningen styras av skolan. Lärarens öron fungerar utan mikrofon.',da:'Mikrofonen er blokeret. Tjek hængelåsen i adresselinjen — på skolens enheder kan indstillingen være styret af skolen. Lærerens ører virker uden mikrofon.',no:'Mikrofonen er blokkert. Sjekk hengelåsen i adressefeltet — på skolens enheter kan innstillingen styres av skolen. Lærerens ører fungerer uten mikrofon.',fi:'Mikrofoni on estetty. Tarkista lukkokuvake osoiterivillä — koulun laitteilla tämä asetus voi olla koulun hallinnoima. Opettajan korvat toimivat ilman mikrofonia.'},
    errNoMic:     {en:'No microphone was found on this device. Teacher’s ears works without one.',de:'Auf diesem Gerät wurde kein Mikrofon gefunden. Der Modus „Deine Ohren“ funktioniert auch ohne.',fr:'Aucun micro n’a été trouvé sur cet appareil. Le mode « Mes oreilles » fonctionne sans micro.',it:'Su questo dispositivo non è stato trovato alcun microfono. Le orecchie dell’insegnante funzionano anche senza.',es:'No se encontró ningún micrófono en este equipo. Los oídos de profe funcionan sin micrófono.',pt:'Não encontramos nenhum microfone neste aparelho. Os ouvidos da professora funcionam sem ele.',nl:'Er is geen microfoon gevonden op dit apparaat. De oren van de juf of meester werken ook zonder.',sv:'Ingen mikrofon hittades på den här enheten. Lärarens öron fungerar ändå.',da:'Der blev ikke fundet nogen mikrofon på denne enhed. Lærerens ører virker uden.',no:'Ingen mikrofon ble funnet på denne enheten. Lærerens ører fungerer uten.',fi:'Tästä laitteesta ei löytynyt mikrofonia. Opettajan korvat toimivat ilman sitä.'},
    errBusy:      {en:'Another app is using the microphone. Close video-call apps and try again — or use Teacher’s ears.',de:'Eine andere App benutzt gerade das Mikrofon. Schließe Videoanruf-Apps und versuche es noch einmal — oder nutze den Modus „Deine Ohren“.',fr:'Une autre application utilise le micro. Fermez les applications de visioconférence et réessayez — ou passez en mode « Mes oreilles ».',it:'Un’altra app sta usando il microfono. Chiudi le app di videochiamata e riprova — oppure usa le orecchie dell’insegnante.',es:'Otra aplicación está usando el micrófono. Cierra las apps de videollamada e inténtalo de nuevo — o usa los oídos de profe.',pt:'Outro aplicativo está usando o microfone. Feche os apps de videochamada e tente de novo — ou use Os ouvidos da professora.',nl:'Een andere app gebruikt de microfoon. Sluit videobel-apps en probeer het opnieuw — of gebruik de oren van de juf of meester.',sv:'En annan app använder mikrofonen. Stäng videosamtalsappar och försök igen — eller använd Lärarens öron.',da:'En anden app bruger mikrofonen. Luk videoopkalds-apps, og prøv igen — eller brug Lærerens ører.',no:'En annen app bruker mikrofonen. Lukk videosamtale-apper og prøv igjen — eller bruk Lærerens ører.',fi:'Toinen sovellus käyttää mikrofonia. Sulje videopuhelusovellukset ja yritä uudelleen — tai käytä Opettajan korvia.'},
    retry:        {en:'Try again',de:'Noch einmal versuchen',fr:'Réessayer',it:'Riprova',es:'Intentar de nuevo',pt:'Tentar de novo',nl:'Opnieuw proberen',sv:'Försök igen',da:'Prøv igen',no:'Prøv igjen',fi:'Yritä uudelleen'},
    /* Teacher’s ears — the honest no-microphone mode */
    manualName:   {en:'Teacher’s ears',de:'Deine Ohren',fr:'Mes oreilles',it:'Le orecchie dell’insegnante',es:'Oídos de profe',pt:'Os ouvidos da professora',nl:'Oren van de juf of meester',sv:'Lärarens öron',da:'Lærerens ører',no:'Lærerens ører',fi:'Opettajan korvat'},
    manualHint:   {en:'No microphone — you tell the owl how the room sounds.',de:'Ohne Mikrofon — du sagst der Eule, wie es im Raum klingt.',fr:'Sans micro — dites vous-même à la chouette si la classe est calme ou bruyante.',it:'Senza microfono — sei tu a dire al gufo quanto rumore c’è in classe.',es:'Sin micrófono — tú le dices al búho cómo suena el salón.',pt:'Sem microfone — é você quem conta para a coruja como está a sala.',nl:'Zonder microfoon — jij vertelt de uil hoe het klinkt in de klas.',sv:'Utan mikrofon — du berättar för ugglan hur det låter i rummet.',da:'Uden mikrofon — du fortæller uglen, hvordan det lyder i klassen.',no:'Uten mikrofon — du forteller ugla hvordan det høres ut i rommet.',fi:'Ilman mikrofonia — sinä kerrot pöllölle, miltä luokassa kuulostaa.'},
    manualQuiet:  {en:'Calm and cozy',de:'Ruhig und gemütlich',fr:'Calme et tranquille',it:'Tutto calmo e tranquillo',es:'Tranquilo y a gusto',pt:'Tudo calmo e tranquilo',nl:'Rustig en gezellig',sv:'Lugnt och mysigt',da:'Roligt og hyggeligt',no:'Rolig og koselig',fi:'Rauhallista ja mukavaa'},
    manualMid:    {en:'Getting loud',de:'Es wird lauter',fr:'Ça devient bruyant',it:'Il volume sta salendo',es:'Se está poniendo ruidoso',pt:'Está ficando barulhento',nl:'Het wordt rumoerig',sv:'Det börjar bli högljutt',da:'Det begynder at larme',no:'Det begynner å bli mye lyd',fi:'Alkaa olla äänekästä'},
    manualLoud:   {en:'Too loud for sleeping',de:'Zu laut zum Schlafen',fr:'Trop de bruit pour dormir',it:'Troppo rumore per dormire',es:'Demasiado ruido para dormir',pt:'Barulho demais para dormir',nl:'Te veel lawaai om te slapen',sv:'För högljutt för att sova',da:'For meget larm til at sove',no:'For mye lyd til å sove',fi:'Liian äänekästä nukkumiseen'},
    /* settings */
    setSensitivity:{en:'How easily the owl hears',de:'Wie fein die Eule hört',fr:'L’ouïe de la chouette',it:'L’udito del gufo',es:'El oído del búho',pt:'O ouvido da coruja',nl:'Het gehoor van de uil',sv:'Ugglans hörsel',da:'Uglens hørelse',no:'Hvor godt ugla hører',fi:'Pöllön kuulo'},
    sens1:        {en:'Much less',de:'Viel weniger',fr:'Beaucoup moins',it:'Molto meno',es:'Mucho menos',pt:'Bem menos',nl:'Veel minder',sv:'Mycket mindre',da:'Meget mindre',no:'Mye mindre',fi:'Hyvin heikko'},
    sens2:        {en:'Less',de:'Weniger',fr:'Moins',it:'Meno',es:'Menos',pt:'Menos',nl:'Minder',sv:'Mindre',da:'Mindre',no:'Mindre',fi:'Heikko'},
    sens3:        {en:'Normal',de:'Normal',fr:'Normal',it:'Normale',es:'Normal',pt:'Normal',nl:'Normaal',sv:'Normal',da:'Normal',no:'Normal',fi:'Tavallinen'},
    sens4:        {en:'More',de:'Mehr',fr:'Plus',it:'Di più',es:'Más',pt:'Mais',nl:'Meer',sv:'Mer',da:'Mere',no:'Mer',fi:'Tarkka'},
    sens5:        {en:'Much more',de:'Viel mehr',fr:'Beaucoup plus',it:'Molto di più',es:'Mucho más',pt:'Bem mais',nl:'Veel meer',sv:'Mycket mer',da:'Meget mere',no:'Mye mer',fi:'Hyvin tarkka'},
    setTheme:     {en:'Sleepy friend',de:'Schlummerfreund',fr:'Ami endormi',it:'Amico dormiglione',es:'Amigo dormilón',pt:'Amigo dorminhoco',nl:'Slaapvriendje',sv:'Sovkompis',da:'Sovedyr',no:'Sovevenn',fi:'Unikaveri'},
    themeOwl:     {en:'Owl',de:'Eule',fr:'Chouette',it:'Gufo',es:'Búho',pt:'Coruja',nl:'Uil',sv:'Uggla',da:'Ugle',no:'Ugle',fi:'Pöllö'},
    themeCat:     {en:'Cat',de:'Katze',fr:'Chat',it:'Gatto',es:'Gato',pt:'Gato',nl:'Poes',sv:'Katt',da:'Kat',no:'Katt',fi:'Kissa'},
    themeDragon:  {en:'Dragon',de:'Drache',fr:'Dragon',it:'Draghetto',es:'Dragón',pt:'Dragão',nl:'Draakje',sv:'Drake',da:'Drage',no:'Drage',fi:'Lohikäärme'},
    setManual:    {en:'Teacher’s ears (no microphone)',de:'Deine Ohren (ohne Mikrofon)',fr:'Mes oreilles (sans micro)',it:'Orecchie dell’insegnante (senza microfono)',es:'Oídos de profe (sin micrófono)',pt:'Ouvidos da professora (sem microfone)',nl:'Oren van de juf of meester (zonder microfoon)',sv:'Lärarens öron (utan mikrofon)',da:'Lærerens ører (uden mikrofon)',no:'Lærerens ører (uten mikrofon)',fi:'Opettajan korvat (ilman mikrofonia)'},
    /* corner mode */
    cornerMode:   {en:'Corner view',de:'Eckansicht',fr:'Vue en coin d’écran',it:'Modalità angolo',es:'Vista de esquina',pt:'Cantinho da tela',nl:'Hoekweergave',sv:'Hörnvy',da:'Hjørnevisning',no:'Hjørnevisning',fi:'Kulmanäkymä'},
    cornerHint:   {en:'Open the owl in a second browser window and snap it beside your other tool.',de:'Öffne die Eule in einem zweiten Browserfenster und schiebe sie neben dein anderes Tool.',fr:'Ouvrez la chouette dans une seconde fenêtre et placez-la à côté de votre autre outil.',it:'Apri il gufo in una seconda finestra e affiancalo all’altro strumento.',es:'Abre el búho en una segunda ventana del navegador y acomódalo junto a tu otra herramienta.',pt:'Abra a coruja em outra janela do navegador e encaixe do lado da sua outra ferramenta.',nl:'Open de uil in een tweede browservenster en zet hem naast je andere tool.',sv:'Öppna ugglan i ett nytt webbläsarfönster och lägg det bredvid ditt andra verktyg.',da:'Åbn uglen i et nyt browservindue, og sæt det ved siden af dit andet værktøj.',no:'Åpne ugla i et nytt nettleservindu og legg det ved siden av det andre verktøyet.',fi:'Avaa pöllö uuteen selainikkunaan ja kiinnitä se toisen työkalun viereen.'},
    expand:       {en:'Back to full view',de:'Zurück zur großen Ansicht',fr:'Revenir en grand',it:'Torna alla vista grande',es:'Volver a la vista grande',pt:'Voltar para a visão completa',nl:'Terug naar grote weergave',sv:'Tillbaka till den stora vyn',da:'Tilbage til stor visning',no:'Tilbake til stor visning',fi:'Takaisin isoon näkymään'},
    /* gates */
    gateLevels:   {en:'Choosing other voice levels — silent, whisper and group work — is part of Premium. Partner voices are always free.',de:'Weitere Stimm-Stufen — Stille, Flüsterstimme und Gruppenstimme — gehören zu Premium. Die Partnerstimme bleibt immer kostenlos.',fr:'Les autres niveaux de voix — silence, voix chuchotée et voix de groupe — font partie de Premium. La voix à deux reste toujours gratuite.',it:'Gli altri livelli di voce — silenzio, sussurro e lavoro di gruppo — fanno parte di Premium. La voce a coppie resta sempre gratuita.',es:'Los demás niveles de voz — silencio, voz de secreto y voz de equipo — son parte de Premium. La voz baja siempre es gratis.',pt:'Os outros níveis de voz — silêncio, sussurro e trabalho em grupo — fazem parte do Premium. A voz de dupla é sempre gratuita.',nl:'De andere stemniveaus — stilte, fluisterstem en groepsstem — horen bij Premium. De overlegstem blijft altijd gratis.',sv:'De andra röstnivåerna — tyst arbete, viskröst och grupparbetsröst — ingår i Premium. Samtalsrösten är alltid gratis.',da:'De andre stemmeniveauer — helt stille, hviskestemme og gruppearbejde — er en del af Premium. Makkerstemmen er altid gratis.',no:'De andre stemmenivåene — stille, hviskestemme og gruppestemme — er en del av Premium. Makkerstemmen er alltid gratis.',fi:'Muut äänitasot — hiljaisuus, kuiskausääni ja ryhmätyön ääni — kuuluvat Premiumiin. Parityön ääni on aina ilmainen.'},
    gateTheme:    {en:'The sleepy cat and the little dragon are part of Premium. The owl is always free.',de:'Die schlafende Katze und der kleine Drache gehören zu Premium. Die Eule bleibt immer kostenlos.',fr:'Le chat endormi et le petit dragon font partie de Premium. La chouette reste toujours gratuite.',it:'Il gatto dormiglione e il draghetto fanno parte di Premium. Il gufo resta sempre gratuito.',es:'El gato dormilón y el dragoncito son parte de Premium. El búho siempre es gratis.',pt:'O gato dorminhoco e o dragãozinho fazem parte do Premium. A coruja é sempre gratuita.',nl:'De slapende poes en het draakje horen bij Premium. De uil blijft altijd gratis.',sv:'Den sovande katten och den lilla draken ingår i Premium. Ugglan är alltid gratis.',da:'Den sovende kat og den lille drage er en del af Premium. Uglen er altid gratis.',no:'Den sovende katten og den lille dragen er en del av Premium. Ugla er alltid gratis.',fi:'Uninen kissa ja pieni lohikäärme kuuluvat Premiumiin. Pöllö on aina ilmainen.'},
    gateCorner:   {en:'Corner view is part of Premium — perfect beside another projected tool.',de:'Die Eckansicht gehört zu Premium — perfekt neben einem zweiten Tool an der Tafel.',fr:'La vue en coin d’écran fait partie de Premium — parfaite à côté d’un autre outil projeté.',it:'La modalità angolo fa parte di Premium — perfetta accanto a un altro strumento proiettato.',es:'La vista de esquina es parte de Premium — perfecta junto a otra herramienta proyectada.',pt:'O cantinho da tela faz parte do Premium — perfeito ao lado de outra ferramenta projetada.',nl:'De hoekweergave hoort bij Premium — perfect naast een andere tool op het digibord.',sv:'Hörnvyn ingår i Premium — perfekt bredvid ett annat projicerat verktyg.',da:'Hjørnevisningen er en del af Premium — perfekt ved siden af et andet projiceret værktøj.',no:'Hjørnevisningen er en del av Premium — perfekt ved siden av et annet projisert verktøy.',fi:'Kulmanäkymä kuuluu Premiumiin — se sopii täydellisesti toisen heijastetun työkalun viereen.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås op for det hele',no:'Lås opp alt',fi:'Avaa kaikki'},
    loading:      {en:'Fluffing the feathers…',de:'Das Federkleid wird aufgeplustert…',fr:'On ébouriffe les plumes…',it:'Sistemiamo le piume…',es:'Esponjando las plumas…',pt:'Ajeitando as penas…',nl:'De veertjes worden opgeschud…',sv:'Fjädrarna burras upp…',da:'Uglen pudser fjer…',no:'Ugla bruser med fjærene…',fi:'Höyheniä pörrötetään…'}
  },

  defaults: {
    sensitivity: '3', theme: 'owl', manual: false
  },
  settings: [
    { key:'sensitivity', type:'choice', labelKey:'setSensitivity', options:[
        { value:'1', labelKey:'sens1' },
        { value:'2', labelKey:'sens2' },
        { value:'3', labelKey:'sens3' },
        { value:'4', labelKey:'sens4' },
        { value:'5', labelKey:'sens5' }
    ]},
    { key:'theme', type:'choice', labelKey:'setTheme', options:[
        { value:'owl', labelKey:'themeOwl' },
        { value:'cat', labelKey:'themeCat' },
        { value:'dragon', labelKey:'themeDragon' }
    ]},
    { key:'manual', type:'toggle', labelKey:'setManual' }
  ],

  STORE_KEY: 'lcs:hush-owl:v1',
  ENT_TRUST_DAYS: 14,
  LEVEL_ORDER: ['silent', 'whisper', 'partner', 'group'],
  LEVELS: { silent: 0.25, whisper: 0.40, partner: 0.55, group: 0.75 },
  LEVEL_LABEL: { silent:'levelSilent', whisper:'levelWhisper', partner:'levelPartner', group:'levelGroup' },
  /* pictograms (24×24, stroke-only) — chips + the wooden sign share these */
  PICTO: {
    silent:  '<circle cx="12" cy="12" r="8"/><line x1="12" y1="8.5" x2="12" y2="15.5"/>',
    whisper: '<circle cx="9" cy="12" r="6"/><path d="M18 8.5 q 3.6 3.5 0 7"/>',
    partner: '<circle cx="7.5" cy="12" r="5"/><circle cx="16.5" cy="12" r="5"/>',
    group:   '<circle cx="7" cy="8" r="3.6"/><circle cx="17" cy="8" r="3.6"/><circle cx="7" cy="17" r="3.6"/><circle cx="17" cy="17" r="3.6"/>'
  },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    var self = this;
    this.api = api;
    this.premium = false;
    this.phase = 'idle';            /* idle | starting | live | paused | error */
    this.errCode = null;            /* denied | no-mic | busy */
    this._manualIdx = 0;
    this._actx = null; this._stream = null; this._track = null;
    this._analyser = null; this._buf = null; this._bbuf = null;
    this._lastRms = -1; this._zeroT = 0; this._rebuilt = false;
    this._lastTs = null; this._hiddenTimer = null;

    /* the engine state + config (10× faster under ?hshtest=1 on localhost) */
    var test = /(^|[?&])hshtest=1/.test(location.search) &&
               /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    this._cfg = test
      ? { attack:0.15, release:0.8, slowTau:0.25, rise:2, fall:1.2, drift:6, dwell:0.2, manualTau:0.35, dead:0.06 }
      : { attack:0.15, release:0.8, slowTau:1.5, rise:20, fall:12, drift:60, dwell:2, manualTau:3, dead:0.06 };
    this._E = { lvl:0, env:0, slow:0, wake:0, state:'asleep', dwellUntil:0, phase: Math.random()*6 };

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, level: null, settings: null };
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    if (this.LEVEL_ORDER.indexOf(this._store.level) < 0) this._store.level = 'partner';

    /* deep links: ?level= ?theme= are stored but only take EFFECT with
       premium (the _effLevel/_effTheme gate); ?embed=corner per donor. */
    var params = new URLSearchParams(location.search);
    var lv = params.get('level');
    if (this.LEVEL_ORDER.indexOf(lv) >= 0) this._store.level = lv;
    var th = params.get('theme');
    if (['owl', 'cat', 'dragon'].indexOf(th) >= 0) api.settings.theme = th;
    this.corner = params.get('embed') === 'corner';

    /* read-only debug/harness hooks (no setters — observation only) */
    try {
      var E = this._E;
      window.__hushOwl = {
        get level01 () { return E.lvl; },
        get env ()     { return E.env; },
        get slow ()    { return E.slow; },
        get wake ()    { return E.wake; },
        get state ()   { return E.state; },
        get phase ()   { return self.phase; },
        get theme ()   { return self._effTheme(); },
        get level ()   { return self._effLevel(); }
      };
    } catch (_) {}

    document.addEventListener('visibilitychange', function () { self._onVisibility(); });
    window.addEventListener('pagehide', function () { self._teardownMic(); });
    document.addEventListener('keydown', function (e) {
      if (self.phase !== 'live' || !self.api.settings.manual) return;
      if (e.key === '1') self._setManual(0);
      else if (e.key === '2') self._setManual(1);
      else if (e.key === '3') self._setManual(2);
    });

    /* one rAF loop for the whole life of the tool: engine + sway */
    this._raf = requestAnimationFrame(function (t) { self._frame(t); });

    this._fetchEntitlement();
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      st.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },

  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) self.render(); }
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
        if (self._wrap) self.render();
      })
      .catch(function () { trustCache(); });
  },

  /* ============================ helpers ============================ */

  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  /* the STRUCTURAL premium gates: free is forced to partner voices +
     the owl, no matter what the store or a deep link says */
  _effLevel: function () {
    return this.premium ? this._store.level : 'partner';
  },
  _effTheme: function () {
    return this.premium ? (this.api.settings.theme || 'owl') : 'owl';
  },
  _goalKey: function () {
    var t = this._effTheme();
    return t === 'cat' ? 'goalCat' : (t === 'dragon' ? 'goalDragon' : 'goalOwl');
  },

  /* ========================= the mic engine ========================= */

  _start: function () {
    var self = this;
    if (this.phase === 'live' || this.phase === 'starting') return;
    if (this.api.settings.manual) {
      /* Teacher’s ears needs no permission — same downstream engine */
      this.phase = 'live'; this.errCode = null;
      this._saveStore(); this.render();
      return;
    }
    /* the tap IS the gesture: create + resume the context SYNCHRONOUSLY
       before any await (iPad consumes the gesture otherwise) */
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.phase = 'error'; this.errCode = 'no-mic'; this.render();
      return;
    }
    try {
      this._actx = new AC();
      if (this._actx.state === 'suspended') this._actx.resume();
    } catch (_) { this._actx = null; }
    this.phase = 'starting';
    this.render();
    navigator.mediaDevices.getUserMedia({
      audio: {
        /* browser DSP would defeat a level meter: NS removes classroom
           noise (= our signal), AGC flattens sustained loudness. Bare
           booleans have IDEAL semantics — never OverconstrainedError. */
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: { ideal: 1 }
      },
      video: false
    }).then(function (stream) {
      self._wireStream(stream);
      self.phase = 'live'; self.errCode = null;
      self._zeroT = 0;
      self.render();
    }).catch(function (err) {
      self._teardownMic();
      self.phase = 'error';
      self.errCode = self._mapErr(err);
      self.render();
    });
  },

  _wireStream: function (stream) {
    var self = this;
    this._stream = stream;
    this._track = stream.getAudioTracks()[0] || null;
    this.agcActive = false;
    try {
      if (this._track && this._track.getSettings) {
        var st = this._track.getSettings();
        /* missing key = unknown → assume DSP on (old Safari) */
        this.agcActive = st.autoGainControl !== false;
      }
    } catch (_) {}
    if (!this._actx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      try { this._actx = new AC(); } catch (_) { this._actx = null; }
    }
    if (!this._actx) return;
    try {
      this._source = this._actx.createMediaStreamSource(stream);
      this._analyser = this._actx.createAnalyser();
      this._analyser.fftSize = 2048;
      /* zero-gain tail: guarantees the graph is pulled on WebKit AND
         guarantees no mic audio is ever audible (projector feedback) */
      this._zeroGain = this._actx.createGain();
      this._zeroGain.gain.value = 0;
      this._source.connect(this._analyser);
      this._analyser.connect(this._zeroGain);
      this._zeroGain.connect(this._actx.destination);
      this._buf = new Float32Array(this._analyser.fftSize);
      this._bbuf = new Uint8Array(this._analyser.fftSize);
    } catch (_) {}
    if (this._track) {
      this._track.onended = function () {
        if (self.phase === 'live') { self._teardownMic(); self.phase = 'paused'; self.render(); }
      };
    }
  },

  /* iOS route-change bug: the mic can flip the hardware route and leave
     the context producing pure silence — rebuild the graph exactly once */
  _rebuildAudio: function () {
    var stream = this._stream;
    if (!stream) return;
    try { if (this._source) this._source.disconnect(); } catch (_) {}
    try { if (this._actx) this._actx.close(); } catch (_) {}
    this._actx = null; this._analyser = null;
    var AC = window.AudioContext || window.webkitAudioContext;
    try { this._actx = new AC(); } catch (_) { return; }
    this._wireStream(stream);
  },

  _teardownMic: function () {
    try { if (this._source) this._source.disconnect(); } catch (_) {}
    if (this._stream) {
      try { this._stream.getTracks().forEach(function (t) { t.stop(); }); } catch (_) {}
    }
    try { if (this._actx) this._actx.close(); } catch (_) {}
    this._actx = null; this._stream = null; this._track = null;
    this._analyser = null; this._source = null; this._zeroGain = null;
    this._rebuilt = false; this._zeroT = 0; this._lastRms = -1;
  },

  _mapErr: function (err) {
    var n = err && err.name;
    if (n === 'NotAllowedError' || n === 'SecurityError') return 'denied';
    if (n === 'NotFoundError' || n === 'OverconstrainedError') return 'no-mic';
    if (n === 'NotReadableError' || n === 'AbortError') return 'busy';
    return 'busy';
  },

  _stopListening: function () {
    this._teardownMic();
    this.phase = 'paused';
    this.render();
  },

  _onVisibility: function () {
    var self = this;
    if (document.visibilityState === 'visible') {
      if (this._hiddenTimer) { clearTimeout(this._hiddenTimer); this._hiddenTimer = null; }
      if (this._needsRender) { this._needsRender = false; this.render(); }
      if (this._actx && this._actx.state !== 'running') { try { this._actx.resume(); } catch (_) {} }
      /* iPadOS mutes the track while hidden; if it stays muted, degrade
         honestly to the paused state (one-tap resume = fresh gesture) */
      if (this.phase === 'live' && !this.api.settings.manual && this._track) {
        setTimeout(function () {
          if (self.phase === 'live' && self._track && self._track.muted) {
            self._teardownMic(); self.phase = 'paused'; self.render();
          }
        }, 1000);
      }
      return;
    }
    /* hidden: an indicator light burning on a hidden tab is a privacy-
       optics problem — after 60s release the mic fully */
    if (this.phase === 'live' && !this.api.settings.manual) {
      this._hiddenTimer = setTimeout(function () {
        self._hiddenTimer = null;
        if (self.phase === 'live' && document.visibilityState !== 'visible') {
          self._teardownMic(); self.phase = 'paused';
          self._needsRender = true;   /* render lazily on return — hidden now */
        }
      }, 60000);
    }
  },

  _readMic: function () {
    var an = this._analyser;
    if (!an) { this._lastRms = -1; return 0; }
    var buf = this._buf, i, s, sum = 0;
    try {
      if (an.getFloatTimeDomainData) an.getFloatTimeDomainData(buf);
      else {
        an.getByteTimeDomainData(this._bbuf);
        for (i = 0; i < buf.length; i++) buf[i] = (this._bbuf[i] - 128) / 128;
      }
    } catch (_) { return 0; }
    for (i = 0; i < buf.length; i++) { s = buf[i]; sum += s * s; }
    var rms = Math.sqrt(sum / buf.length);
    this._lastRms = rms;
    var db = 20 * Math.log10(Math.max(rms, 1e-7));
    /* sensitivity = a dB-window SHIFT (never a gain node): monotonic,
       unclippable, every notch is the same audible step */
    var sens = (parseInt(this.api.settings.sensitivity, 10) - 1) / 4;   /* 0..1 */
    if (isNaN(sens)) sens = 0.5;
    var floorDb = -45 - 20 * sens;
    return Math.max(0, Math.min(1, (db - floorDb) / 40));
  },

  _setManual: function (idx) {
    this._manualIdx = idx;
    var row = this._wrap && this._wrap.querySelector('.hsh-manualrow');
    if (row) {
      var btns = row.querySelectorAll('.hsh-manualbtn');
      for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('active', i === idx);
    }
  },

  /* ------------------------- the rAF loop -------------------------- */

  _frame: function (ts) {
    var self = this;
    this._raf = requestAnimationFrame(function (t) { self._frame(t); });
    if (this._lastTs == null) { this._lastTs = ts; return; }
    /* clamp: a throttled/hidden tab must never dump time into the owl */
    var dt = Math.min(0.25, Math.max(0, (ts - this._lastTs) / 1000));
    this._lastTs = ts;
    var E = this._E, C = this._cfg;
    var manual = !!this.api.settings.manual;

    var lvl = 0;
    if (this.phase === 'live') {
      if (manual) {
        /* the honest wobble keeps the scene alive; it never claims to
           be a microphone (±0.03 around the tapped state) */
        lvl = [0.15, 0.45, 0.8][this._manualIdx] + 0.03 * Math.sin(ts / 700);
      } else {
        lvl = this._readMic();
      }
    }
    E.lvl = lvl;

    /* fast envelope (sway): asymmetric attack/release */
    E.env += (lvl - E.env) * (1 - Math.exp(-dt / (lvl > E.env ? C.attack : C.release)));
    /* slow decision filter: a 200ms spike barely moves a 1.5s pole */
    E.slow += (lvl - E.slow) * (1 - Math.exp(-dt / C.slowTau));

    /* calm-budget accumulator */
    if (this.phase === 'live') {
      if (manual) {
        var target = [0, 0.55, 1][this._manualIdx];
        E.wake += (target - E.wake) * (1 - Math.exp(-dt / C.manualTau));
      } else {
        var T = this.LEVELS[this._effLevel()];
        if (E.slow > T + C.dead) E.wake += dt / C.rise;
        else if (E.slow < T - C.dead) E.wake -= dt / C.fall;
        else E.wake -= dt / C.drift;
      }
    } else {
      E.wake -= dt / C.fall;      /* idle/paused: drift back to sleep */
    }
    E.wake = Math.max(0, Math.min(1, E.wake));

    /* state machine: non-adjacent hysteresis + a minimum dwell —
       the owl can never flicker, and never skips a state */
    var now = ts / 1000;
    if (now >= E.dwellUntil) {
      var st = E.state;
      if (st === 'asleep' && E.wake >= 0.35) st = 'stirring';
      else if (st === 'stirring' && E.wake >= 0.90) st = 'awake';
      else if (st === 'awake' && E.wake <= 0.60) st = 'stirring';
      else if (st === 'stirring' && E.wake <= 0.10) st = 'asleep';
      if (st !== E.state) {
        E.state = st;
        E.dwellUntil = now + C.dwell;
        this._applyState();
      }
    }

    /* branch sway — rAF is the smoothing, no CSS transition */
    if (this._sceneEl && !this._reducedMotion()) {
      var amp = (0.4 + 2.0 * E.env) * (this.corner ? 0.5 : 1);
      E.phase += 2 * Math.PI * (0.14 + 0.22 * E.env) * dt;
      this._sceneEl.style.setProperty('--hsh-sway', (amp * Math.sin(E.phase)).toFixed(2) + 'deg');
    }

    /* silence watchdog (iOS route-change): 3s of EXACT zero → rebuild once */
    if (this.phase === 'live' && !manual) {
      if (this._lastRms === 0) {
        this._zeroT += dt;
        if (this._zeroT > 3 && !this._rebuilt) { this._rebuilt = true; this._rebuildAudio(); }
      } else this._zeroT = 0;
    }
  },

  _applyState: function () {
    if (this._sceneEl) this._sceneEl.setAttribute('data-state', this._E.state);
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('hsh-wide');
    if (this.corner) document.body.classList.add('hsh-corner');

    var wrap = api.el('div', 'hsh-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    /* corner mode: the same scene, slice-cropped small; tap to expand */
    if (this.corner) {
      var cwrap = api.el('button', 'hsh-cornercard');
      cwrap.type = 'button';
      cwrap.setAttribute('aria-label', api.t('expand'));
      cwrap.appendChild(this._buildScene());
      var mini = api.el('div', 'hsh-cornerrow');
      mini.appendChild(this._pictoSVG(this._effLevel(), 18));
      var mlbl = api.el('span');
      mlbl.textContent = api.t(this.LEVEL_LABEL[this._effLevel()]);
      mini.appendChild(mlbl);
      if (this.phase === 'live') {
        var dot = api.el('span', 'hsh-livedot');
        mini.appendChild(dot);
      }
      cwrap.appendChild(mini);
      cwrap.addEventListener('click', function () {
        var u = new URL(location.href);
        u.searchParams.delete('embed');
        location.href = u.toString();
      });
      wrap.appendChild(cwrap);
      this._applyState();
      return;
    }

    /* the scene */
    wrap.appendChild(this._buildScene());

    /* the dock (per phase) */
    wrap.appendChild(this._dock());

    /* the privacy promise — visible in EVERY phase */
    var priv = api.el('p', 'hsh-privacy');
    priv.textContent = api.t('privacy');
    wrap.appendChild(priv);

    this._applyState();
  },

  _buildScene: function () {
    var host = this.api.el('div', 'hsh-stage');
    var theme = this._effTheme();
    host.innerHTML = this._sceneSVG(theme);
    this._sceneEl = host.querySelector('.hsh-scene');
    /* per-theme sway pivot (the owl's branch levers from its root;
       the cushion and the rock rock in place) */
    var perch = this._sceneEl.querySelector('#hshPerch');
    if (perch) perch.style.transformOrigin = theme === 'owl' ? '240px 640px' : (theme === 'cat' ? '800px 610px' : '800px 652px');
    this._updateSign();
    return host;
  },

  _updateSign: function () {
    if (!this._sceneEl) return;
    var level = this._effLevel();
    var txt = this._sceneEl.querySelector('.hsh-signtext');
    var pic = this._sceneEl.querySelector('.hsh-signpic');
    if (pic) pic.innerHTML = '<g transform="scale(2.1)" fill="none" stroke="#FBF3E4" stroke-width="2.2" stroke-linecap="round">' + this.PICTO[level] + '</g>';
    if (txt) {
      txt.textContent = this.api.t(this.LEVEL_LABEL[level]);
      /* fit long localized names onto the board */
      try {
        var fs = 30;
        txt.setAttribute('font-size', fs);
        while (fs > 16 && txt.getComputedTextLength() > 224) {
          fs -= 2;
          txt.setAttribute('font-size', fs);
        }
      } catch (_) {}
    }
  },

  _pictoSVG: function (level, size) {
    var span = document.createElement('span');
    span.className = 'hsh-picto';
    span.innerHTML = '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">' + this.PICTO[level] + '</svg>';
    return span;
  },

  /* ----------------------------- dock ------------------------------ */

  _levelRow: function (compact) {
    var api = this.api, self = this;
    var row = api.el('div', 'hsh-chiprow');
    if (!compact) {
      var lbl = api.el('span', 'hsh-rowlabel');
      lbl.textContent = api.t('levelRow');
      row.appendChild(lbl);
    }
    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
    this.LEVEL_ORDER.forEach(function (key) {
      var locked = !self.premium && key !== 'partner';
      var chip = api.el('button', 'hsh-chip' + (self._effLevel() === key ? ' active' : '') + (locked ? ' locked' : ''));
      chip.type = 'button';
      chip.appendChild(self._pictoSVG(key, 18));
      var t = api.el('span');
      t.textContent = api.t(self.LEVEL_LABEL[key]);
      chip.appendChild(t);
      if (locked) chip.insertAdjacentHTML('beforeend', lock);
      chip.addEventListener('click', function () {
        if (locked) { self._gateInline(row, 'gateLevels'); return; }
        self._store.level = key;
        self._saveStore();
        self._updateSign();
        self.render();
      });
      row.appendChild(chip);
    });
    return row;
  },

  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'hsh-dock');
    var manual = !!api.settings.manual;

    if (this.phase === 'starting') {
      var ld = api.el('div', 'hsh-status');
      ld.textContent = api.t('loading');
      dock.appendChild(ld);
      return dock;
    }

    if (this.phase === 'error') {
      var card = api.el('div', 'hsh-err');
      var msg = api.el('p');
      msg.textContent = api.t(this.errCode === 'denied' ? 'errDenied' : (this.errCode === 'no-mic' ? 'errNoMic' : 'errBusy'));
      card.appendChild(msg);
      var row = api.el('div', 'hsh-chiprow');
      var retry = api.el('button', 'hsh-ctrlchip');
      retry.type = 'button';
      retry.textContent = api.t('retry');
      retry.addEventListener('click', function () { self.phase = 'idle'; self._start(); });
      var ears = api.el('button', 'hsh-ctrlchip teal');
      ears.type = 'button';
      ears.textContent = api.t('manualName');
      ears.addEventListener('click', function () {
        api.settings.manual = true;
        self.phase = 'live'; self.errCode = null;
        self._saveStore(); self.render();
      });
      row.append(retry, ears);
      card.appendChild(row);
      dock.appendChild(card);
      return dock;
    }

    if (this.phase === 'live') {
      if (manual) {
        var hint = api.el('div', 'hsh-manualhint');
        hint.textContent = api.t('manualHint');
        dock.appendChild(hint);
        var mrow = api.el('div', 'hsh-manualrow');
        [['manualQuiet', 0], ['manualMid', 1], ['manualLoud', 2]].forEach(function (m) {
          var b = api.el('button', 'hsh-manualbtn' + (self._manualIdx === m[1] ? ' active' : ''));
          b.type = 'button';
          b.textContent = api.t(m[0]);
          b.addEventListener('click', function () { self._setManual(m[1]); });
          mrow.appendChild(b);
        });
        dock.appendChild(mrow);
      } else {
        var srow = api.el('div', 'hsh-chiprow');
        var status = api.el('div', 'hsh-status live');
        var d = api.el('span', 'hsh-livedot');
        status.appendChild(d);
        var stxt = api.el('span');
        stxt.textContent = api.t('statusListening');
        status.appendChild(stxt);
        srow.appendChild(status);
        dock.appendChild(srow);
      }
      dock.appendChild(this._levelRow(true));
      var crow = api.el('div', 'hsh-chiprow');
      var stop = api.el('button', 'hsh-ctrlchip');
      stop.type = 'button';
      stop.textContent = api.t('stopListen');
      stop.addEventListener('click', function () {
        if (manual) { self.phase = 'idle'; self.render(); }
        else self._stopListening();
      });
      crow.appendChild(stop);
      crow.appendChild(this._cornerChip());
      dock.appendChild(crow);
      return dock;
    }

    if (this.phase === 'paused') {
      var prow = api.el('div', 'hsh-chiprow');
      var ps = api.el('div', 'hsh-status');
      ps.textContent = api.t('statusPaused');
      prow.appendChild(ps);
      dock.appendChild(prow);
      var resume = api.el('button', 'hsh-big coral');
      resume.type = 'button';
      resume.textContent = api.t(manual ? 'start' : 'resumeListen');
      resume.addEventListener('click', function () { self.phase = 'idle'; self._start(); });
      var rw = api.el('div', 'hsh-startrow');
      rw.appendChild(resume);
      dock.appendChild(rw);
      dock.appendChild(this._levelRow(true));
      return dock;
    }

    /* idle: level cards + Start */
    dock.appendChild(this._levelRow(false));
    var startRow = api.el('div', 'hsh-startrow');
    var start = api.el('button', 'hsh-big coral');
    start.type = 'button';
    start.textContent = api.t('start');
    start.addEventListener('click', function () { self._start(); });
    startRow.appendChild(start);
    dock.appendChild(startRow);
    if (manual) {
      var mh = api.el('div', 'hsh-manualhint');
      mh.textContent = api.t('manualHint');
      dock.appendChild(mh);
    }
    var crow2 = api.el('div', 'hsh-chiprow');
    crow2.appendChild(this._cornerChip());
    dock.appendChild(crow2);
    return dock;
  },

  _cornerChip: function () {
    var api = this.api, self = this;
    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
    var corner = api.el('button', 'hsh-ctrlchip subtle' + (this.premium ? '' : ' locked'));
    corner.type = 'button';
    corner.textContent = api.t('cornerMode');
    if (!this.premium) corner.innerHTML += lock;
    corner.title = api.t('cornerHint');
    corner.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(corner.parentNode || self._wrap, 'gateCorner'); return; }
      var u = new URL(location.href);
      u.searchParams.set('embed', 'corner');
      location.href = u.toString();
    });
    return corner;
  },

  onSettings: function (key, val) {
    var self = this;
    if (key === 'theme' && val !== 'owl' && !this.premium) {
      this.api.settings.theme = 'owl';
      this._saveStore();
      requestAnimationFrame(function () {
        if (self._wrap) self._gateInline(self._wrap.querySelector('.hsh-stage') || self._wrap, 'gateTheme');
      });
      return;
    }
    if (key === 'manual') {
      if (val && this._stream) this._teardownMic();
      if (!val && this.phase === 'live') this.phase = 'paused';   /* mic needs a fresh gesture */
    }
    this._saveStore();
    this.render();
  },

  /* shell reset: back to the idle pose, mic released, settings kept */
  reset: function () {
    this._teardownMic();
    this.phase = 'idle';
    this.errCode = null;
    this._manualIdx = 0;
    this._E.wake = 0; this._E.env = 0; this._E.slow = 0;
    this._E.state = 'asleep'; this._E.dwellUntil = 0;
    this.render();
  },
  paint: function () {},

  _gateInline: function (host, key) {
    var api = this.api;
    var old = this._wrap.querySelector('.hsh-gate');
    if (old) old.remove();
    var g = api.el('div', 'hsh-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-hush-owl';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('afterend', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  /* ======================= the scene (SVG) ========================== */
  /* One hand-authored scene, viewBox 0 0 1600 900, slice-cropped.
     Critical content lives in the central 1200-unit safe zone so 4:3
     projectors and the corner card crop symmetrically. All state
     visuals hang off data-state on the scene root + the single
     --hsh-sway custom property — JS never animates parts directly.  */

  _z: function (x, y, w) {
    var h = Math.round(w * 0.8);
    return '<path d="M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + x + ' ' + (y + h) + ' L' + (x + w) + ' ' + (y + h) + '" fill="none" stroke="#F5E9CF" stroke-width="' + Math.max(5, Math.round(w / 4)) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  },
  _zzzSVG: function (x, y) {
    return '<g class="hsh-zzz">' + this._z(x, y, 32) + this._z(x + 44, y - 46, 24) + this._z(x + 82, y - 84, 18) + '</g>';
  },
  _eyeSVG: function (cx, cy, clipId, lidFill) {
    return '' +
      '<g class="hsh-eye">' +
      '<path class="hsh-eye-closed" d="M' + (cx - 22) + ' ' + cy + ' Q ' + cx + ' ' + (cy + 16) + ' ' + (cx + 22) + ' ' + cy + '" stroke="#7A5238" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<g class="hsh-eye-open" clip-path="url(#' + clipId + ')">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="30" fill="#FFFDF6"/>' +
      '<g class="hsh-pupil"><circle cx="' + cx + '" cy="' + cy + '" r="13" fill="#2A2A35"/><circle cx="' + (cx + 5) + '" cy="' + (cy - 5) + '" r="4.5" fill="#FFFFFF" opacity="0.9"/></g>' +
      '<circle class="hsh-lid" cx="' + cx + '" cy="' + (cy - 72) + '" r="40" fill="' + lidFill + '"/>' +
      '</g>' +
      '<clipPath id="' + clipId + '"><circle cx="' + cx + '" cy="' + cy + '" r="30"/></clipPath>' +
      '</g>';
  },
  _signSVG: function (bx, by, ropes) {
    return (ropes || '') +
      '<g class="hsh-sign">' +
      '<rect x="' + bx + '" y="' + by + '" width="316" height="80" rx="14" fill="#8A6044" stroke="#6E4A32" stroke-width="5"/>' +
      '<g class="hsh-signpic" transform="translate(' + (bx + 18) + ' ' + (by + 15) + ')"></g>' +
      '<text class="hsh-signtext" x="' + (bx + 190) + '" y="' + (by + 51) + '" text-anchor="middle" font-size="30" fill="#FBF3E4"></text>' +
      '</g>';
  },

  _sceneSVG: function (theme) {
    var sky = '' +
      '<defs>' +
      '<linearGradient id="hshSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22424D"/><stop offset="1" stop-color="#3C685F"/></linearGradient>' +
      '<radialGradient id="hshGlowGrad"><stop offset="0" stop-color="#F2A96B"/><stop offset="1" stop-color="#F2A96B" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<rect x="0" y="0" width="1600" height="900" fill="url(#hshSky)"/>' +
      /* vertical safe zone: wide stages slice-crop the top — everything
         that must stay visible lives in y 160..745 */
      '<g fill="#F5E9CF">' +
      '<path class="hsh-tw1" d="M350 191 Q351.5 198.5 359 200 Q351.5 201.5 350 209 Q348.5 201.5 341 200 Q348.5 198.5 350 191 Z"/>' +
      '<circle cx="520" cy="300" r="4" opacity="0.6"/>' +
      '<path class="hsh-tw2" d="M660 174 Q662 185 673 187 Q662 189 660 200 Q658 189 647 187 Q658 185 660 174 Z"/>' +
      '<circle cx="960" cy="250" r="4" opacity="0.55"/>' +
      '<path d="M1380 291 Q1381.5 298.5 1389 300 Q1381.5 301.5 1380 309 Q1378.5 301.5 1371 300 Q1378.5 298.5 1380 291 Z" opacity="0.7"/>' +
      '<circle cx="260" cy="350" r="3.6" opacity="0.5"/>' +
      '<circle cx="1450" cy="330" r="3.6" opacity="0.5"/>' +
      '<circle cx="1075" cy="180" r="4.4" opacity="0.65"/>' +
      '</g>' +
      '<g transform="translate(1210 250)">' +
      '<circle r="150" fill="#FBF3E4" opacity="0.10"/>' +
      '<circle r="72" fill="#FBF3E4"/>' +
      '<circle cx="25" cy="-10" r="10" fill="#EFE2C8"/>' +
      '<circle cx="-18" cy="22" r="7" fill="#EFE2C8"/>' +
      '</g>' +
      '<ellipse id="hshGlow" cx="800" cy="430" rx="420" ry="260" fill="url(#hshGlowGrad)"/>' +
      '<ellipse cx="800" cy="910" rx="900" ry="110" fill="#1D3841" opacity="0.35"/>';

    var perch = this.THEME_ART[theme] || this.THEME_ART.owl;
    return '<svg class="hsh-scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" data-state="asleep" aria-hidden="true" focusable="false">' +
      sky +
      '<g id="hshPerch">' + perch.branch.call(this) + '<g id="hshChar" transform="translate(' + perch.charAt + ')">' + perch.char.call(this) + '</g></g>' +
      '</svg>';
  },

  THEME_ART: {
    owl: {
      charAt: '800 580',
      branch: function () {
        var leaves = '';
        [[470, 655], [700, 650], [990, 645]].forEach(function (p) {
          leaves += '<g fill="#2F5D52" transform="translate(' + p[0] + ' ' + p[1] + ')">' +
            '<ellipse cx="-10" cy="8" rx="26" ry="11" transform="rotate(38 -10 8)"/>' +
            '<ellipse cx="16" cy="16" rx="26" ry="11" transform="rotate(-26 16 16)"/>' +
            '<ellipse cx="-22" cy="24" rx="20" ry="9" transform="rotate(72 -22 24)"/>' +
            '<ellipse cx="2" cy="10" rx="9" ry="4" fill="#3E7263"/>' +
            '</g>';
        });
        return '' +
          /* the bough runs past BOTH sign ropes (x 898 + 1160) — a rope
             attached to air reads as a torn-off sign */
          '<path d="M238 622 C 450 585 700 572 1240 582 L1240 602 C 700 600 450 625 238 662 Z" fill="#6E4A32"/>' +
          '<path d="M238 626 C 450 589 700 576 1236 586" fill="none" stroke="#8A6044" stroke-width="6" stroke-linecap="round"/>' +
          leaves +
          /* sign raised so max downward sway keeps its bottom inside the
             vertical safe window (crop y ≤ ~746 at wide aspect) */
          this._signSVG(872, 626,
            '<line x1="898" y1="596" x2="892" y2="630" stroke="#8A6044" stroke-width="5"/>' +
            '<line x1="1160" y1="592" x2="1166" y2="630" stroke="#8A6044" stroke-width="5"/>');
      },
      char: function () {
        return this._zzzSVG(150, -390) +
          '<g class="hsh-body">' +
          '<ellipse cx="0" cy="-165" rx="150" ry="170" fill="#D9A45B"/>' +
          '<ellipse cx="0" cy="-130" rx="102" ry="118" fill="#F6E7C9"/>' +
          '<path d="M-58 -160 q 20 15 40 0 M-18 -160 q 20 15 40 0" stroke="#E8C89A" stroke-width="5" fill="none" stroke-linecap="round"/>' +
          '<path d="M-38 -120 q 20 15 40 0 M2 -120 q 20 15 40 0" stroke="#E8C89A" stroke-width="5" fill="none" stroke-linecap="round"/>' +
          '</g>' +
          '<g class="hsh-wing-l"><ellipse cx="-132" cy="-155" rx="46" ry="100" fill="#C08A4B" transform="rotate(12 -132 -155)"/></g>' +
          '<g class="hsh-wing-r"><ellipse cx="132" cy="-155" rx="46" ry="100" fill="#C08A4B" transform="rotate(-12 132 -155)"/></g>' +
          '<g class="hsh-head">' +
          '<g class="hsh-tuft-l"><path d="M-96 -382 q -20 -36 -8 -62 q 28 12 36 48 Z" fill="#C08A4B"/></g>' +
          '<g class="hsh-tuft-r"><path d="M96 -382 q 20 -36 8 -62 q -28 12 -36 48 Z" fill="#C08A4B"/></g>' +
          '<circle cx="0" cy="-300" r="112" fill="#D9A45B"/>' +
          '<ellipse cx="0" cy="-286" rx="90" ry="78" fill="#F6E7C9"/>' +
          '<circle cx="-74" cy="-258" r="15" fill="#F2A48B" opacity="0.35"/>' +
          '<circle cx="74" cy="-258" r="15" fill="#F2A48B" opacity="0.35"/>' +
          this._eyeSVG(-44, -296, 'hshEyeL', '#F6E7C9') +
          this._eyeSVG(44, -296, 'hshEyeR', '#F6E7C9') +
          '<path d="M0 -276 L-14 -254 Q 0 -242 14 -254 Z" fill="#F2784B"/>' +
          '</g>' +
          '<g class="hsh-feet" fill="#F2784B">' +
          '<circle cx="-60" cy="-4" r="9"/><circle cx="-48" cy="0" r="9"/><circle cx="-36" cy="-4" r="9"/>' +
          '<circle cx="36" cy="-4" r="9"/><circle cx="48" cy="0" r="9"/><circle cx="60" cy="-4" r="9"/>' +
          '</g>';
      }
    },

    cat: {
      charAt: '800 522',
      branch: function () {
        return '' +
          '<rect x="470" y="600" width="660" height="24" rx="8" fill="#8A6044"/>' +
          '<path d="M500 624 l18 28 M1100 624 l-18 28" stroke="#6E4A32" stroke-width="8" stroke-linecap="round"/>' +
          '<rect x="614" y="518" width="372" height="94" rx="46" fill="#146B5E"/>' +
          '<rect x="628" y="530" width="344" height="70" rx="35" fill="none" stroke="#FBF3E4" stroke-width="4" opacity="0.5"/>' +
          '<circle cx="716" cy="565" r="7" fill="#F2784B"/><circle cx="884" cy="565" r="7" fill="#F2784B"/>' +
          this._signSVG(872, 656,
            '<line x1="940" y1="622" x2="932" y2="660" stroke="#8A6044" stroke-width="5"/>' +
            '<line x1="1120" y1="622" x2="1128" y2="660" stroke="#8A6044" stroke-width="5"/>');
      },
      char: function () {
        return this._zzzSVG(30, -300) +
          '<g class="hsh-wing-r"><path d="M168 -70 C 205 -30 160 8 60 2 C 10 0 -6 -20 30 -26" fill="none" stroke="#7A8FA6" stroke-width="30" stroke-linecap="round"/></g>' +
          '<g class="hsh-body">' +
          '<ellipse cx="10" cy="-100" rx="170" ry="102" fill="#8FA3B8"/>' +
          '<path d="M-40 -188 q 25 -16 50 0 M30 -180 q 25 -16 50 0 M95 -158 q 22 -14 44 0" stroke="#7A8FA6" stroke-width="10" fill="none" stroke-linecap="round"/>' +
          '</g>' +
          '<g class="hsh-wing-l"><ellipse cx="-118" cy="-28" rx="52" ry="24" fill="#8FA3B8"/><path d="M-148 -28 v14 M-118 -30 v16 M-88 -28 v14" stroke="#7A8FA6" stroke-width="4" stroke-linecap="round"/></g>' +
          '<g class="hsh-head">' +
          '<g class="hsh-tuft-l"><path d="M-118 -222 L-104 -274 L-68 -232 Z" fill="#8FA3B8"/><path d="M-108 -234 L-101 -258 L-84 -237 Z" fill="#F2A48B"/></g>' +
          '<g class="hsh-tuft-r"><path d="M-4 -226 L16 -276 L46 -230 Z" fill="#8FA3B8"/><path d="M8 -238 L18 -260 L32 -239 Z" fill="#F2A48B"/></g>' +
          '<circle cx="-60" cy="-158" r="84" fill="#8FA3B8"/>' +
          '<ellipse cx="-60" cy="-124" rx="48" ry="30" fill="#EEF2F5"/>' +
          '<path d="M-68 -140 h16 l-8 11 Z" fill="#F2A48B"/>' +
          '<path d="M-108 -126 h-32 M-106 -114 h-28 M-14 -126 h32 M-16 -114 h28" stroke="#EEF2F5" stroke-width="3" stroke-linecap="round"/>' +
          this._eyeSVG(-92, -172, 'hshEyeL', '#8FA3B8') +
          this._eyeSVG(-28, -172, 'hshEyeR', '#8FA3B8') +
          '</g>';
      }
    },

    dragon: {
      charAt: '800 560',
      branch: function () {
        return '' +
          '<path d="M642 664 C 630 592 700 556 800 552 C 900 556 972 594 958 664 Q 800 694 642 664 Z" fill="#5E6E75"/>' +
          '<ellipse cx="700" cy="568" rx="40" ry="12" fill="#3E7263"/>' +
          '<ellipse cx="880" cy="576" rx="34" ry="10" fill="#3E7263"/>' +
          '<rect x="1112" y="608" width="14" height="130" rx="4" fill="#8A6044"/>' +
          this._signSVG(962, 560, '');
      },
      char: function () {
        return this._zzzSVG(150, -370) +
          '<g class="hsh-body">' +
          '<ellipse cx="0" cy="-150" rx="138" ry="152" fill="#7FB59A"/>' +
          '<rect x="-76" y="-96" width="152" height="26" rx="13" fill="#DFF0E3"/>' +
          '<rect x="-66" y="-130" width="132" height="26" rx="13" fill="#DFF0E3"/>' +
          '<rect x="-56" y="-164" width="112" height="26" rx="13" fill="#DFF0E3"/>' +
          '<path d="M118 -240 l26 -12 -12 26 Z" fill="#F2784B"/>' +
          '<path d="M130 -196 l28 -6 -16 24 Z" fill="#F2784B"/>' +
          '<path d="M136 -150 l28 0 -18 22 Z" fill="#F2784B"/>' +
          '</g>' +
          /* wings folded DOWN at the sides — raised wings read as
             cheering/startled, the opposite of a dozing dragon */
          '<g class="hsh-wing-l"><path d="M-124 -216 q -58 18 -64 84 q 50 10 80 -36 Z" fill="#6AA58A"/></g>' +
          '<g class="hsh-wing-r"><path d="M124 -216 q 58 18 64 84 q -50 10 -80 -36 Z" fill="#6AA58A"/></g>' +
          '<g class="hsh-head">' +
          '<g class="hsh-tuft-l"><path d="M-58 -358 q -8 -32 6 -48 q 18 12 16 46 Z" fill="#DFF0E3"/></g>' +
          '<g class="hsh-tuft-r"><path d="M58 -358 q 8 -32 -6 -48 q -18 12 -16 46 Z" fill="#DFF0E3"/></g>' +
          '<circle cx="0" cy="-292" r="96" fill="#7FB59A"/>' +
          '<ellipse cx="0" cy="-258" rx="56" ry="34" fill="#9BC7AB"/>' +
          '<circle cx="-16" cy="-258" r="5" fill="#4E8A6F"/><circle cx="16" cy="-258" r="5" fill="#4E8A6F"/>' +
          '<circle cx="-72" cy="-252" r="14" fill="#F2A48B" opacity="0.3"/>' +
          '<circle cx="72" cy="-252" r="14" fill="#F2A48B" opacity="0.3"/>' +
          this._eyeSVG(-42, -306, 'hshEyeL', '#7FB59A') +
          this._eyeSVG(42, -306, 'hshEyeR', '#7FB59A') +
          '</g>' +
          '<g class="hsh-accent"><circle class="hsh-smoke1" cx="-16" cy="-272" r="10" fill="#B9AEC6"/><circle class="hsh-smoke2" cx="16" cy="-272" r="8" fill="#B9AEC6"/></g>' +
          '<g class="hsh-feet"><ellipse cx="-56" cy="-4" rx="34" ry="16" fill="#6AA58A"/><ellipse cx="56" cy="-4" rx="34" ry="16" fill="#6AA58A"/></g>';
      }
    }
  }
};

/* per-tool styling: STAGE ONLY + the sanctioned body class */
(function injectCSS() {
  var css = ''
  + 'body.hsh-wide .lcs-app{max-width:min(1280px,96vw);}'
  /* phone scroll opt-in — the shell body clips at overflow:hidden */
  + '@media (max-width:560px){body.hsh-wide{overflow-y:auto;}}'
  + '@media (max-width:480px){'
  +   'body.hsh-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  + '}'
  + '.hsh-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;}'

  /* the scene card — a night window inside the warm cream chrome */
  + '.hsh-stage{position:relative;width:100%;height:clamp(230px,52vh,600px);border-radius:22px;'
  +   'overflow:hidden;box-shadow:var(--lcs-shadow);background:#22424D;}'
  + '.hsh-scene{display:block;width:100%;height:100%;}'
  + '.hsh-signtext{font-family:var(--lcs-font-display);font-weight:700;}'

  /* sway: rAF writes --hsh-sway; the pivot is set per theme inline */
  + '#hshPerch{transform:rotate(var(--hsh-sway,0deg));transform-box:view-box;}'

  /* breathing (duration per state) */
  + '.hsh-body{transform-box:fill-box;transform-origin:50% 100%;animation:hshBreathe 4.6s ease-in-out infinite;}'
  + '.hsh-scene[data-state=stirring] .hsh-body{animation-duration:3.2s;}'
  + '.hsh-scene[data-state=awake] .hsh-body{animation-duration:2.6s;}'
  + '@keyframes hshBreathe{0%,100%{transform:scale(1,1);}50%{transform:scale(1.015,1.035);}}'

  /* eyes: crossfade closed-arc vs clipped open eye; the lid slides */
  + '.hsh-eye-closed{opacity:1;transition:opacity 1.2s var(--lcs-ease);}'
  + '.hsh-eye-open{opacity:0;transition:opacity 1.2s var(--lcs-ease);}'
  + '.hsh-scene[data-state=stirring] .hsh-eye-closed,.hsh-scene[data-state=awake] .hsh-eye-closed{opacity:0;}'
  + '.hsh-scene[data-state=stirring] .hsh-eye-open,.hsh-scene[data-state=awake] .hsh-eye-open{opacity:1;}'
  + '.hsh-lid{transition:transform 1.4s var(--lcs-ease);}'
  + '.hsh-scene[data-state=stirring] .hsh-lid{transform:translateY(42px);}'
  + '.hsh-scene[data-state=awake] .hsh-lid{transform:translateY(12px);animation:hshBlink 5.5s infinite;}'
  + '@keyframes hshBlink{0%,8%,12%,45%,49%,100%{transform:translateY(12px);}10%,47%{transform:translateY(80px);}}'

  /* z-motes: information by removal — they fade the moment the room stirs */
  + '.hsh-zzz path{opacity:0;transition:opacity .8s;transform-box:fill-box;transform-origin:center;}'
  + '.hsh-scene[data-state=asleep] .hsh-zzz path{animation:hshZzz 5.5s ease-out infinite;}'
  + '.hsh-scene[data-state=asleep] .hsh-zzz path:nth-child(2){animation-delay:1.6s;}'
  + '.hsh-scene[data-state=asleep] .hsh-zzz path:nth-child(3){animation-delay:3.2s;}'
  + '@keyframes hshZzz{0%{opacity:0;transform:translate(0,0) scale(.7);}20%{opacity:.85;}100%{opacity:0;transform:translate(44px,-70px) scale(1.05);}}'

  /* stirring: ear/horn twitch */
  + '.hsh-tuft-l,.hsh-tuft-r{transform-box:fill-box;transform-origin:50% 90%;}'
  + '.hsh-scene[data-state=stirring] .hsh-tuft-l{animation:hshTwitch 4s infinite;}'
  + '.hsh-scene[data-state=stirring] .hsh-tuft-r{animation:hshTwitch 4s 2s infinite;}'
  + '@keyframes hshTwitch{0%,8%,100%{transform:rotate(0);}3%{transform:rotate(-7deg);}}'

  /* awake: pupils look around the ROOM (never at the class), head follows */
  + '.hsh-pupil{transform-box:fill-box;transform-origin:center;}'
  + '.hsh-scene[data-state=awake] .hsh-pupil{animation:hshLook 8s ease-in-out infinite;}'
  + '@keyframes hshLook{0%,18%,44%,48%,76%,100%{transform:translateX(0);}22%,40%{transform:translateX(-10px);}52%,72%{transform:translateX(10px);}}'
  + '.hsh-head{transform-box:fill-box;transform-origin:50% 80%;}'
  + '.hsh-scene[data-state=awake] .hsh-head{animation:hshHeadTurn 8s ease-in-out -0.5s infinite;}'
  + '@keyframes hshHeadTurn{0%,18%,44%,48%,76%,100%{transform:rotate(0);}22%,40%{transform:rotate(-3.5deg);}52%,72%{transform:rotate(3.5deg);}}'
  + '.hsh-wing-l,.hsh-wing-r{transform-box:fill-box;transform-origin:50% 20%;transition:transform 1.2s var(--lcs-ease);}'
  + '.hsh-scene[data-state=awake] .hsh-wing-l{transform:rotate(4deg);}'
  + '.hsh-scene[data-state=awake] .hsh-wing-r{transform:rotate(-4deg);}'

  /* the dawn glow — loudness framed as morning energy, never badness */
  + '#hshGlow{opacity:0;transition:opacity 2s linear;}'
  + '.hsh-scene[data-state=stirring] #hshGlow{opacity:.10;}'
  + '.hsh-scene[data-state=awake] #hshGlow{opacity:.18;}'

  /* dragon smoke puffs (cozy chimney, never fire) */
  + '.hsh-accent circle{opacity:0;transform-box:fill-box;transform-origin:center;}'
  + '.hsh-scene[data-state=awake] .hsh-smoke1{animation:hshSmoke 3.4s infinite;}'
  + '.hsh-scene[data-state=awake] .hsh-smoke2{animation:hshSmoke 3.4s 1.7s infinite;}'
  + '@keyframes hshSmoke{0%{opacity:0;transform:translate(0,0) scale(.5);}25%{opacity:.5;}100%{opacity:0;transform:translate(6px,-60px) scale(1.15);}}'

  /* star twinkle (decorative) */
  + '.hsh-tw1{animation:hshTwinkle 7s ease-in-out infinite;}'
  + '.hsh-tw2{animation:hshTwinkle 9s ease-in-out infinite;}'
  + '@keyframes hshTwinkle{0%,100%{opacity:.5;}50%{opacity:.9;}}'
  + '@media (max-width:479px){.hsh-tw1,.hsh-tw2{animation:none;}}'

  /* dock */
  + '.hsh-dock{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
  + '.hsh-chiprow{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:wrap;}'
  + '.hsh-rowlabel{font-family:var(--lcs-font-body);font-weight:800;font-size:13px;color:var(--lcs-ink-soft);margin-right:2px;}'
  + '.hsh-chip{display:inline-flex;align-items:center;gap:7px;min-height:46px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:14.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 14px;'
  +   'cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.hsh-chip:active{transform:scale(.96);}'
  + '.hsh-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.hsh-chip.locked{color:var(--lcs-ink-soft);}'
  + '.hsh-picto{display:inline-flex;align-items:center;}'
  + '.hsh-startrow{display:flex;justify-content:center;}'
  + '.hsh-big{min-width:200px;min-height:58px;padding:12px 36px;border-radius:var(--lcs-radius-pill);'
  +   'border:1.5px solid var(--lcs-structure);cursor:pointer;background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(17px,2.6vmin,22px);box-shadow:var(--lcs-shadow-sm);'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.hsh-big:active{transform:scale(.97);}'
  + '.hsh-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);}'
  + '.hsh-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.hsh-ctrlchip{font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:10px 18px;min-height:48px;cursor:pointer;'
  +   'box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.hsh-ctrlchip:active{transform:scale(.97);}'
  + '.hsh-ctrlchip.teal{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.hsh-ctrlchip.subtle{color:var(--lcs-ink-soft);box-shadow:none;}'
  + '.hsh-ctrlchip.locked{color:var(--lcs-ink-soft);}'

  /* status + privacy */
  + '.hsh-status{display:inline-flex;align-items:center;gap:8px;font-family:var(--lcs-font-body);'
  +   'font-weight:700;font-size:14px;color:var(--lcs-ink-soft);background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius-pill);padding:8px 16px;box-shadow:var(--lcs-shadow-sm);}'
  + '.hsh-livedot{width:9px;height:9px;border-radius:50%;background:var(--lcs-structure);'
  +   'animation:hshPulse 2.4s ease-in-out infinite;}'
  + '@keyframes hshPulse{0%,100%{opacity:.35;}50%{opacity:1;}}'
  + '.hsh-privacy{margin:0;max-width:640px;text-align:center;font-family:var(--lcs-font-body);'
  +   'font-weight:600;font-size:12.5px;line-height:1.45;color:var(--lcs-ink-soft);}'

  /* Teacher’s ears */
  + '.hsh-manualhint{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-ink-soft);text-align:center;}'
  + '.hsh-manualrow{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}'
  + '.hsh-manualbtn{min-height:56px;min-width:150px;padding:10px 20px;border-radius:var(--lcs-radius-pill);'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:15.5px;cursor:pointer;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.hsh-manualbtn:active{transform:scale(.97);}'
  + '.hsh-manualbtn.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'

  /* error card */
  + '.hsh-err{display:flex;flex-direction:column;gap:10px;max-width:560px;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow-sm);padding:16px 20px;text-align:center;}'
  + '.hsh-err p{margin:0;font-family:var(--lcs-font-body);font-weight:700;font-size:14.5px;'
  +   'line-height:1.5;color:var(--lcs-ink);}'

  /* gate */
  + '.hsh-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;'
  +   'margin:8px auto;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.hsh-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'

  /* corner mode */
  + 'body.hsh-corner .lcs-header,body.hsh-corner .lcs-instruction{display:none;}'
  + 'body.hsh-corner .lcs-app{max-width:340px;padding:8px;}'
  + '.hsh-cornercard{display:flex;flex-direction:column;align-items:center;gap:6px;width:300px;'
  +   'background:#FFFEFB;border-radius:18px;box-shadow:var(--lcs-shadow);border:none;cursor:pointer;'
  +   'padding:10px;}'
  + '.hsh-cornercard .hsh-stage{height:200px;border-radius:14px;box-shadow:none;}'
  + '.hsh-cornerrow{display:flex;align-items:center;gap:8px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:15px;color:var(--lcs-structure);max-width:280px;'
  +   'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'

  /* phone */
  + '@media (max-width:560px){'
  +   '.hsh-stage{height:clamp(200px,42vh,400px);}'
  +   '.hsh-chip{font-size:13.5px;padding:7px 11px;}'
  + '}'

  /* short screens (projector 1024×768) */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.hsh-wrap{gap:5px;}'
  +   '.hsh-stage{height:clamp(220px,46vh,480px);}'
  +   '.hsh-privacy{font-size:11.5px;}'
  + '}'

  /* reduced motion: loops off, sway off (JS also skips the write);
     each state keeps a distinguishable STATIC pose */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.hsh-body,.hsh-tw1,.hsh-tw2,.hsh-livedot{animation:none;}'
  +   '.hsh-scene[data-state=asleep] .hsh-zzz path{animation:none;opacity:.7;}'
  +   '.hsh-scene[data-state=stirring] .hsh-tuft-l,.hsh-scene[data-state=stirring] .hsh-tuft-r{animation:none;}'
  +   '.hsh-scene[data-state=awake] .hsh-pupil,.hsh-scene[data-state=awake] .hsh-head{animation:none;}'
  +   '.hsh-scene[data-state=awake] .hsh-lid{animation:none;}'
  +   '.hsh-scene[data-state=awake] .hsh-smoke1,.hsh-scene[data-state=awake] .hsh-smoke2{animation:none;}'
  +   '.hsh-eye-open,.hsh-eye-closed,.hsh-lid,.hsh-wing-l,.hsh-wing-r{transition-duration:.3s;}'
  +   '#hshPerch{transform:none !important;}'
  + '}'

  /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
     ⚠⚠ THE SCENE IS `preserveAspectRatio="xMidYMid slice"` OVER A 1600x900
     viewBox, so it COVERS its box and CROPS whatever does not fit. The stage
     is `width:100%` with a height clamp, which means the naive fix — raise the
     card and leave `height:clamp(230px,52vh,600px)` — would have widened the
     box to 1704 against a 600px height, an aspect of 2.84 against the scene's
     1.78, and simply sliced the top and bottom off the owl. Bigger box, LESS
     owl.
     So above 1367 the stage is pinned to the scene's own 16:9 and its width is
     derived from the height budget (`Kvh * 16/9`), which keeps it uncropped
     and as large as the fold allows at every tier floor. `height:auto` because
     aspect-ratio supplies it. */
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.hsh-wide .lcs-app{max-width:min(1400px,96vw);}'
  +   'body.hsh-wide .hsh-stage{aspect-ratio:16/9;height:auto;width:min(100%,calc(54vh * 1.7778));}'
  +   'body.hsh-wide .hsh-chip{min-height:52px;font-size:17px;}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.hsh-wide .lcs-app{max-width:min(1600px,96vw);}'
  +   'body.hsh-wide .hsh-stage{width:min(100%,calc(56vh * 1.7778));}'
  +   'body.hsh-wide .hsh-chip{min-height:56px;font-size:19px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.hsh-wide .lcs-app{max-width:min(1752px,96vw);}'
  +   'body.hsh-wide .hsh-stage{width:min(100%,calc(58vh * 1.7778));}'
  +   'body.hsh-wide .hsh-chip{min-height:60px;font-size:21px;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
