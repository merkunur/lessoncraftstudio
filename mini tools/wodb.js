/* =====================================================================
   TOOL #22 — WHICH ONE DOESN'T BELONG?   (wodb.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #14 of the Premium Tools Program
   (Wave-2 closer) — the Morning Circle no-wrong-answer reasoning
   routine: a 2×2 grid of four items where EVERY item is a defensible
   answer. A child taps a cell (it lifts — chosen for discussion, never
   "correct"), the class argues why, the ear icon speaks sentence stems
   for emerging speakers, and the teacher reveals four "reasons" cards —
   every child was right.

   NO-SHAME DESIGN (pedagogy-locked): no vote tallies, no timers, no
   checkmarks/stars/crowns, no green/red verdict colors, no dimming of
   un-lifted cells, no confetti, no "Correct!" copy. The lift ring is
   teal (structure), the reveal warmth is honey — shared identically by
   all four cells. Any future "let the class vote and see the winner"
   request is to be refused: a winner implies losers, which is the exact
   thing WODB exists to abolish.

   DATA: mini tools/wodb-grids.json — 21 curated grids (cells are
   locale-neutral; titles + reasons carry an 11-locale map, authored
   per-locale in the fixed uniqueness frame "It's the only one that…").
   FREE = the weekly featured grid, complete (lifts, stems, reveal,
   TTS — full dignity, never a crippled demo) via deterministic
   ISO-week rotation; the library list is visible with soft-locked
   tiles. PREMIUM = every grid + the builder (assemble a grid from the
   1,495-image library via the pww-index) + saved grids.
   ===================================================================== */
var Wodb = {
  id: 'wodb',

  strings: {
    title:        {en:'Which One Doesn’t Belong?',de:'Was passt nicht dazu?',fr:'Quel est l’intrus ?',it:'Chi è l’intruso?',es:'¿Cuál no encaja?',pt:'Qual não pertence?',nl:'Welke hoort er niet bij?',sv:'Vilken passar inte in?',da:'Hvad passer ikke ind?',no:'Hvilken passer ikke inn?',fi:'Mikä ei kuulu joukkoon?'},
    /* the doctrine line — every locale MUST state that every answer can be right */
    instruction:  {en:'Four things — and every answer can be right! Tap the one you would pick, and tell us why.',de:'Vier Dinge — und jede Antwort kann eine gute sein! Tippe auf deins und erzähl uns, warum.',fr:'Quatre choses — et chaque réponse peut être la bonne ! Touche celle que tu choisis et dis-nous pourquoi.',it:'Quattro cose — e ogni risposta può andare bene! Tocca la tua e raccontaci perché.',es:'Cuatro cosas — ¡y toda respuesta puede estar bien! Toca la tuya y cuéntanos por qué.',pt:'Quatro coisas — e toda resposta pode estar certa! Toque na sua e conte para a gente o porquê.',nl:'Vier dingen — en elk antwoord kan goed zijn! Tik op wat jij zou kiezen en vertel ons waarom.',sv:'Fyra saker — och varje svar kan vara rätt! Tryck på den du skulle välja och berätta varför.',da:'Fire ting — og alle svar kan være gode! Tryk på den, du vælger, og fortæl os hvorfor.',no:'Fire ting — og alle svar kan være gode! Trykk på den du velger, og fortell oss hvorfor.',fi:'Neljä asiaa — ja jokainen vastaus voi olla hyvä! Napauta omaasi ja kerro meille, miksi.'},
    /* the three sentence stems — NEVER interpolate cell content */
    stem1:        {en:'This one doesn’t belong because…',de:'Das passt nicht dazu, weil…',fr:'Celui-ci est l’intrus parce que…',it:'Per me l’intruso è questo, perché…',es:'Este no encaja porque…',pt:'Esse aqui não pertence porque…',nl:'Deze hoort er niet bij, want…',sv:'Den här passar inte in, för att…',da:'Den her passer ikke ind, fordi…',no:'Denne passer ikke inn fordi…',fi:'Tämä ei kuulu joukkoon, koska…'},
    stem2:        {en:'It’s the only one that…',de:'Es ist das Einzige, das…',fr:'C’est le seul qui…',it:'È l’unico che…',es:'Es el único que…',pt:'É o único que…',nl:'Het is de enige die…',sv:'Den är den enda som…',da:'Den er den eneste, der…',no:'Den er den eneste som…',fi:'Se on ainoa, joka…'},
    stem3:        {en:'I noticed that…',de:'Mir ist aufgefallen, dass…',fr:'J’ai remarqué que…',it:'Ho notato che…',es:'Me di cuenta de que…',pt:'Eu percebi que…',nl:'Mij valt op dat…',sv:'Jag märkte att…',da:'Jeg lagde mærke til, at…',no:'Jeg la merke til at…',fi:'Huomasin, että…'},
    closing:      {en:'Every one was a good answer!',de:'Jede Antwort war eine gute Antwort!',fr:'Chaque réponse était une bonne réponse !',it:'Ogni risposta era una buona risposta!',es:'¡Todas fueron buenas respuestas!',pt:'Todas foram boas respostas!',nl:'Elk antwoord was een goed antwoord!',sv:'Varje svar var ett bra svar!',da:'Alle svar var gode svar!',no:'Alle svarene var gode svar!',fi:'Jokainen vastaus oli hyvä vastaus!'},
    /* dock */
    showReasons:  {en:'Show the reasons',de:'Gründe zeigen',fr:'Voir les raisons',it:'Mostra i motivi',es:'Ver las razones',pt:'Mostrar os motivos',nl:'Laat de redenen zien',sv:'Visa skälen',da:'Vis grundene',no:'Vis grunnene',fi:'Näytä perustelut'},
    hideReasons:  {en:'Hide the reasons',de:'Gründe verstecken',fr:'Cacher les raisons',it:'Nascondi i motivi',es:'Ocultar las razones',pt:'Esconder os motivos',nl:'Verberg de redenen',sv:'Dölj skälen',da:'Skjul grundene',no:'Skjul grunnene',fi:'Piilota perustelut'},
    revealHint:   {en:'Tap a card to show its reason.',de:'Tippe auf eine Karte, um ihren Grund zu sehen.',fr:'Touche une carte pour montrer sa raison.',it:'Tocca una carta per mostrare il suo motivo.',es:'Toca una tarjeta para ver su razón.',pt:'Toque em um cartão para mostrar o motivo.',nl:'Tik op een kaart om de reden te laten zien.',sv:'Tryck på ett kort för att se skälet.',da:'Tryk på et kort for at se grunden.',no:'Trykk på et kort for å vise grunnen.',fi:'Napauta korttia, niin näet sen perustelun.'},
    revealAll:    {en:'Reveal all',de:'Alle zeigen',fr:'Tout montrer',it:'Mostra tutti',es:'Mostrar todas',pt:'Mostrar todos',nl:'Laat alles zien',sv:'Visa alla',da:'Vis alle',no:'Vis alle',fi:'Näytä kaikki'},
    startAgain:   {en:'Start again',de:'Noch einmal',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Begynd forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    library:      {en:'Grid library',de:'Rätsel-Sammlung',fr:'Collection de grilles',it:'La raccolta di quartetti',es:'Colección de tarjetas',pt:'Coleção de cartelas',nl:'Verzameling',sv:'Samlingen',da:'Samlingen',no:'Samlingen',fi:'Kokoelma'},
    build:        {en:'Build your own',de:'Selber bauen',fr:'Créer la vôtre',it:'Crea il tuo',es:'Crea la tuya',pt:'Monte a sua',nl:'Zelf maken',sv:'Bygg ett eget',da:'Byg dit eget',no:'Lag din egen',fi:'Tee oma'},
    thisWeek:     {en:'This week’s grid',de:'Rätsel der Woche',fr:'La grille de la semaine',it:'Il quartetto della settimana',es:'La tarjeta de la semana',pt:'A cartela da semana',nl:'Denkkaart van de week',sv:'Veckans rutnät',da:'Ugens sæt',no:'Ukens rutenett',fi:'Viikon ruudukko'},
    myGrids:      {en:'My grids',de:'Meine Rätsel',fr:'Mes grilles',it:'I miei quartetti',es:'Mis tarjetas',pt:'Minhas cartelas',nl:'Mijn denkkaarten',sv:'Mina rutnät',da:'Mine sæt',no:'Mine rutenett',fi:'Omat ruudukot'},
    bandK:        {en:'Ages 4–6',de:'4–6 Jahre',fr:'4–6 ans',it:'4–6 anni',es:'4–6 años',pt:'4–6 anos',nl:'4–6 jaar',sv:'4–6 år',da:'4–6 år',no:'4–6 år',fi:'4–6 v'},
    bandG1:       {en:'Ages 6–7',de:'6–7 Jahre',fr:'6–7 ans',it:'6–7 anni',es:'6–7 años',pt:'6–7 anos',nl:'6–7 jaar',sv:'6–7 år',da:'6–7 år',no:'6–7 år',fi:'6–7 v'},
    bandG23:      {en:'Ages 7–9',de:'7–9 Jahre',fr:'7–9 ans',it:'7–9 anni',es:'7–9 años',pt:'7–9 anos',nl:'7–9 jaar',sv:'7–9 år',da:'7–9 år',no:'7–9 år',fi:'7–9 v'},
    /* builder */
    save:         {en:'Save this grid',de:'Rätsel speichern',fr:'Enregistrer la grille',it:'Salva il quartetto',es:'Guardar la tarjeta',pt:'Salvar a cartela',nl:'Denkkaart opslaan',sv:'Spara rutnätet',da:'Gem sættet',no:'Lagre rutenettet',fi:'Tallenna ruudukko'},
    cancel:       {en:'Cancel',de:'Abbrechen',fr:'Annuler',it:'Annulla',es:'Cancelar',pt:'Cancelar',nl:'Annuleren',sv:'Avbryt',da:'Annuller',no:'Avbryt',fi:'Peruuta'},
    deleteBtn:    {en:'Delete',de:'Löschen',fr:'Supprimer',it:'Elimina',es:'Eliminar',pt:'Excluir',nl:'Verwijderen',sv:'Ta bort',da:'Slet',no:'Slett',fi:'Poista'},
    gridName:     {en:'Name your grid',de:'Wie soll dein Rätsel heißen?',fr:'Nom de la grille',it:'Dai un nome al tuo quartetto',es:'Ponle nombre a tu tarjeta',pt:'Nome da cartela',nl:'Geef je denkkaart een naam',sv:'Vad ska rutnätet heta?',da:'Giv dit sæt et navn',no:'Gi rutenettet et navn',fi:'Anna ruudukolle nimi'},
    myGridDefault:{en:'My grid',de:'Mein Rätsel',fr:'Ma grille',it:'Il mio quartetto',es:'Mi tarjeta',pt:'Minha cartela',nl:'Mijn denkkaart',sv:'Mitt rutnät',da:'Mit sæt',no:'Mitt rutenett',fi:'Oma ruudukko'},
    guidance:     {en:'The best grids let every corner be the odd one out — check that each of your four has its own reason.',de:'Die besten Rätsel lassen jede Ecke die Ausnahme sein — prüfe, ob jede deiner vier Ecken ihren eigenen Grund hat.',fr:'Dans les meilleures grilles, chaque coin peut être l’intrus — vérifiez que chacune de vos quatre cases a sa propre raison.',it:'I quartetti migliori lasciano che ogni angolo possa essere l’intruso — controlla che ognuno dei tuoi quattro abbia il suo motivo.',es:'Las mejores tarjetas dejan que cada esquina sea la diferente — revisa que cada una de tus cuatro tenga su propia razón.',pt:'As melhores cartelas deixam cada canto ser o diferente — confira se cada um dos seus quatro tem seu próprio motivo.',nl:'De beste denkkaarten laten elke hoek de vreemde eend in de bijt zijn — kijk of elk van je vier een eigen reden heeft.',sv:'De bästa rutnäten låter varje hörn vara det udda — kolla att vart och ett av dina fyra har sitt eget skäl.',da:'De bedste sæt lader hvert hjørne være den, der skiller sig ud — tjek, at hver af dine fire har sin egen grund.',no:'De beste rutenettene lar hvert hjørne være det som skiller seg ut — sjekk at hver av dine fire har sin egen grunn.',fi:'Parhaissa ruudukoissa jokainen kulma voi olla erilainen — tarkista, että jokaisella neljästä on oma perustelunsa.'},
    tabPicture:   {en:'Picture',de:'Bild',fr:'Image',it:'Immagine',es:'Imagen',pt:'Imagem',nl:'Plaatje',sv:'Bild',da:'Billede',no:'Bilde',fi:'Kuva'},
    tabNumber:    {en:'Number',de:'Zahl',fr:'Nombre',it:'Numero',es:'Número',pt:'Número',nl:'Getal',sv:'Tal',da:'Tal',no:'Tall',fi:'Luku'},
    tabWord:      {en:'Word',de:'Wort',fr:'Mot',it:'Parola',es:'Palabra',pt:'Palavra',nl:'Woord',sv:'Ord',da:'Ord',no:'Ord',fi:'Sana'},
    tabShape:     {en:'Shape',de:'Form',fr:'Forme',it:'Forma',es:'Figura',pt:'Forma',nl:'Vorm',sv:'Form',da:'Form',no:'Form',fi:'Muoto'},
    tabDots:      {en:'Dots',de:'Punkte',fr:'Points',it:'Punti',es:'Puntos',pt:'Pontos',nl:'Stippen',sv:'Prickar',da:'Prikker',no:'Prikker',fi:'Pisteet'},
    tabClock:     {en:'Clock',de:'Uhr',fr:'Horloge',it:'Orologio',es:'Reloj',pt:'Relógio',nl:'Klok',sv:'Klocka',da:'Ur',no:'Klokke',fi:'Kello'},
    place:        {en:'Place it',de:'Einsetzen',fr:'Placer',it:'Metti qui',es:'Colocar',pt:'Colocar',nl:'Plaatsen',sv:'Placera',da:'Sæt ind',no:'Sett inn',fi:'Aseta'},
    addReason:    {en:'Add a reason (optional)',de:'Einen Grund dazuschreiben (freiwillig)',fr:'Ajouter une raison (facultatif)',it:'Aggiungi un motivo (facoltativo)',es:'Agregar una razón (opcional)',pt:'Adicionar um motivo (opcional)',nl:'Een reden toevoegen (niet verplicht)',sv:'Lägg till ett skäl (frivilligt)',da:'Tilføj en grund (valgfrit)',no:'Legg til en grunn (valgfritt)',fi:'Lisää perustelu (vapaaehtoinen)'},
    reasonPh:     {en:'It’s the only one that…',de:'Es ist das Einzige, das…',fr:'C’est le seul qui…',it:'È l’unico che…',es:'Es el único que…',pt:'É o único que…',nl:'Het is de enige die…',sv:'Den är den enda som…',da:'Den er den eneste, der…',no:'Den er den eneste som…',fi:'Se on ainoa, joka…'},
    pickTheme:    {en:'Pick a theme',de:'Wähle ein Thema',fr:'Choisissez un thème',it:'Scegli un tema',es:'Elige un tema',pt:'Escolha um tema',nl:'Kies een thema',sv:'Välj ett tema',da:'Vælg et tema',no:'Velg et tema',fi:'Valitse teema'},
    back:         {en:'Back',de:'Zurück',fr:'Retour',it:'Indietro',es:'Atrás',pt:'Voltar',nl:'Terug',sv:'Tillbaka',da:'Tilbage',no:'Tilbake',fi:'Takaisin'},
    close:        {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    /* settings */
    setShowWords: {en:'Show the words under pictures',de:'Wörter unter den Bildern zeigen',fr:'Montrer les mots sous les images',it:'Mostra le parole sotto le immagini',es:'Mostrar las palabras debajo de las imágenes',pt:'Mostrar as palavras embaixo das imagens',nl:'Laat de woorden onder de plaatjes zien',sv:'Visa orden under bilderna',da:'Vis ordene under billederne',no:'Vis ordene under bildene',fi:'Näytä sanat kuvien alla'},
    /* gates */
    gateLibrary:  {en:'The full grid library — a new reasoning talk for every day — is part of Premium. This week’s grid is always free.',de:'Die ganze Rätsel-Sammlung — jeden Tag ein neues Denkgespräch — gehört zu Premium. Das Rätsel der Woche bleibt immer kostenlos.',fr:'La collection complète — une nouvelle discussion chaque jour — fait partie de Premium. La grille de la semaine reste gratuite.',it:'La raccolta completa di quartetti — ogni giorno una nuova discussione — fa parte di Premium. Il quartetto della settimana resta sempre gratuito.',es:'La colección completa — una charla de razonamiento nueva cada día — es parte de Premium. La tarjeta de la semana siempre es gratis.',pt:'A coleção completa — uma nova conversa de raciocínio para cada dia — faz parte do Premium. A cartela da semana é sempre gratuita.',nl:'De hele verzameling — elke dag een nieuw denkgesprek — hoort bij Premium. De denkkaart van de week blijft altijd gratis.',sv:'Hela samlingen — ett nytt resonemangssamtal varje dag — ingår i Premium. Veckans rutnät är alltid gratis.',da:'Hele samlingen — en ny tænkesnak til hver dag — er en del af Premium. Ugens sæt er altid gratis.',no:'Hele samlingen — en ny tenkesamtale hver dag — er en del av Premium. Ukens rutenett er alltid gratis.',fi:'Koko kokoelma — uusi päättelykeskustelu joka päivälle — kuuluu Premiumiin. Viikon ruudukko on aina ilmainen.'},
    gateBuilder:  {en:'Building your own grids from 1,495 pictures is part of Premium. This week’s grid is always free.',de:'Eigene Rätsel aus 1.495 Bildern zu bauen gehört zu Premium. Das Rätsel der Woche bleibt immer kostenlos.',fr:'Créer vos propres grilles à partir de 1 495 images fait partie de Premium. La grille de la semaine reste gratuite.',it:'Creare i tuoi quartetti con 1.495 immagini fa parte di Premium. Il quartetto della settimana resta sempre gratuito.',es:'Crear tus propias tarjetas con 1495 imágenes es parte de Premium. La tarjeta de la semana siempre es gratis.',pt:'Montar suas próprias cartelas com 1.495 imagens faz parte do Premium. A cartela da semana é sempre gratuita.',nl:'Zelf denkkaarten maken met 1.495 plaatjes hoort bij Premium. De denkkaart van de week blijft altijd gratis.',sv:'Att bygga egna rutnät av 1 495 bilder ingår i Premium. Veckans rutnät är alltid gratis.',da:'At bygge dine egne sæt af 1.495 billeder er en del af Premium. Ugens sæt er altid gratis.',no:'Å lage egne rutenett av 1 495 bilder er en del av Premium. Ukens rutenett er alltid gratis.',fi:'Omien ruudukoiden tekeminen 1 495 kuvasta kuuluu Premiumiin. Viikon ruudukko on aina ilmainen.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    loading:      {en:'Laying out the four…',de:'Die vier werden hingelegt…',fr:'On installe les quatre…',it:'Sistemiamo i quattro…',es:'Acomodando los cuatro…',pt:'Arrumando os quatro…',nl:'De vier worden neergelegd…',sv:'De fyra läggs fram…',da:'De fire lægges frem…',no:'De fire legges fram…',fi:'Asetellaan neljä paikoilleen…'},

    /* ======================================================================
       ⚠ NEW IN THE v4 REBUILD — authored in ENGLISH ONLY so far.
       The shell falls back entry[locale] || entry.en, so a non-English
       classroom sees correct English rather than a raw key while the
       eleven native panels run. They are NOT translated afterwards: each
       locale is REBUILT by its own three-person panel, and the English
       below is handed over as a SOURCE TO AUDIT, not a target.
       ⚠ Do not hand-edit these once scripts/_wodb-strings.js exists —
       apply-wodb-locales.js rewrites the whole block.
       ====================================================================== */

    /* the doctrine line, now rendered ON the stage (the shell hides it) */
    doctrine:     {en:'Four things — and every answer can be right.',de:'Vier Dinge — und jede Antwort kann eine gute sein!',fr:'Quatre choses — et chaque réponse peut être la bonne !',it:'Quattro cose — e ogni risposta può andare bene.',es:'Cuatro cosas — y toda respuesta puede estar bien.',pt:'Quatro coisas — e toda resposta pode estar certa.',nl:'Vier dingen — en elk antwoord kan goed zijn.',sv:'Fyra saker — och varje svar kan vara rätt!',da:'Fire ting — og alle svar kan være gode.',no:'Fire ting — og alle svar kan være gode.',fi:'Neljä asiaa — ja jokainen vastaus voi olla hyvä!'},
    invite:       {en:'Tap the one you would pick, and tell us why.',de:'Tippe auf deins und erzähl uns, warum.',fr:'Touche celle que tu choisis et dis-nous pourquoi.',it:'Tocca la tua e raccontaci perché.',es:'Toca la que tú elijas y cuéntanos por qué.',pt:'Toque na sua e conte para a gente o porquê.',nl:'Tik op wat jij zou kiezen en vertel ons waarom.',sv:'Tryck på den du skulle välja och berätta varför.',da:'Tryk på den, du vælger, og fortæl os hvorfor.',no:'Trykk på den du velger, og fortell oss hvorfor.',fi:'Napauta omaasi ja kerro meille, miksi.'},
    stemPrompt:   {en:'Tell us why. Tap a speaker to hear a sentence starter.',de:'Erzähl uns, warum. Tippe auf den Lautsprecher, dann hörst du einen Satzanfang.',fr:'Dis-nous pourquoi. Touche le haut-parleur pour écouter un début de phrase.',it:'Raccontaci perché. Tocca l’orecchio per ascoltare un avvio di frase.',es:'Cuéntanos por qué. Toca la oreja para escuchar cómo empezar la frase.',pt:'Agora conte o porquê. Toque no alto-falante para ouvir um começo de frase.',nl:'Vertel waarom. Tik om een startzin te horen.',sv:'Berätta varför. Tryck på örat för att höra hur du kan börja meningen.',da:'Fortæl hvorfor. Tryk på højttaleren for at høre en sætning, du kan starte med.',no:'Fortell oss hvorfor. Trykk på øret for å høre en setningsstarter.',fi:'Kerro, miksi. Napauta korvaa, niin kuulet lauseen alun.'},

    /* navigation */
    nextGrid:     {en:'Next grid',de:'Nächstes Rätsel',fr:'Grille suivante',it:'Quartetto successivo',es:'Siguiente tarjeta',pt:'Próxima cartela',nl:'Volgende denkkaart',sv:'Nästa rutnät',da:'Næste sæt',no:'Neste rutenett',fi:'Seuraava ruudukko'},
    prevGrid:     {en:'Previous grid',de:'Vorheriges Rätsel',fr:'Grille précédente',it:'Quartetto precedente',es:'Tarjeta anterior',pt:'Cartela anterior',nl:'Vorige denkkaart',sv:'Föregående rutnät',da:'Forrige sæt',no:'Forrige rutenett',fi:'Edellinen ruudukko'},
    turnIt:       {en:'Turn the corners',de:'Einmal drehen',fr:'Changer les coins',it:'Ruota il quartetto',es:'Girar la tarjeta',pt:'Girar a cartela',nl:'Kwartslag draaien',sv:'Vrid rutnätet',da:'Drej sættet',no:'Snu rutenettet',fi:'Kierrä ruudukkoa'},
    turnedAnnounce:{en:'The same four things, in new corners. Look again.',de:'Dieselben vier — neue Ecken. Schau noch mal hin.',fr:'Les mêmes quatre choses, dans d’autres coins. Regarde encore.',it:'Le stesse quattro, in angoli nuovi. Guardate ancora.',es:'Son las mismas cuatro, pero en otras esquinas. Míralas otra vez.',pt:'As mesmas quatro coisas — em outros cantos. Olhe de novo.',nl:'Dezelfde vier — andere hoeken. Kijk nog eens goed.',sv:'Samma fyra — nya hörn. Titta en gång till.',da:'Samme fire — nye hjørner. Kig en gang til.',no:'Samme fire — nye hjørner. Se en gang til.',fi:'Samat neljä — uudet kulmat. Katso uudelleen.'},
    turnedFull:   {en:'All the way round — the four are back where they started.',fr:'Un tour complet — les quatre choses sont revenues à leur place.'},
    endOfBand:    {en:'That was the last grid for {band} — {n} in the set.',de:'Das waren alle Rätsel für {band} — insgesamt {n}.',fr:'C’est la dernière grille pour les {band} — {n} en tout.',it:'Questi sono tutti i quartetti per {band}: {n} in tutto.',es:'Estas son todas las tarjetas de {band}: {n} en total.',pt:'Fim das cartelas de {band}. Ao todo: {n}.',nl:'Dit waren alle {n} denkkaarten voor {band}.',sv:'{n} rutnät för {band} — det var alla.',da:'Det var det hele — {n} sæt til {band}.',no:'Det var alle rutenettene for {band} — {n} i alt.',fi:'Nämä olivat kaikki ikäryhmän {band} ruudukot, yhteensä {n}.'},
    startSetAgain:{en:'Start the set again',de:'Zurück zum ersten Rätsel',fr:'Reprendre à la première grille',it:'Riparti dal primo',es:'Volver a la primera tarjeta',pt:'Voltar para a primeira cartela',nl:'Weer bij de eerste beginnen',sv:'Börja om från första rutnätet',da:'Tilbage til det første sæt',no:'Tilbake til det første',fi:'Aloita ruudukot alusta'},
    endOfMine:    {en:'That was the last of your own grids — {n} in all.',fr:'C’est la dernière de vos propres grilles — {n} en tout.'},
    goToBand:     {en:'Go to {band}',de:'Weiter: {band}',fr:'Passer aux {band}',it:'Vai a {band}',es:'Ir a {band}',pt:'Ir para {band}',nl:'Verder met {band}',sv:'Gå vidare till {band}',da:'Videre til {band}',no:'Gå til {band}',fi:'Siirry ikäryhmään {band}'},
    freeNote:     {en:'A new grid free every Monday — and the ones you have already been given stay unlocked.',de:'Jeden Montag ein neues Rätsel — und alle bisherigen bleiben freigeschaltet.',fr:'La grille de la semaine — une nouvelle chaque lundi, et toutes celles des semaines passées vous restent.',it:'Il quartetto della settimana: uno nuovo ogni lunedì, e quelli che hai già ricevuto restano tuoi.',es:'Tarjeta de esta semana: cada lunes llega una nueva, y todas las que ya recibiste se quedan contigo.',pt:'A cartela da semana — uma nova toda segunda-feira, e as que já vieram continuam suas.',nl:'De denkkaart van de week — elke maandag een nieuwe, en alle kaarten die je kreeg blijven van jou.',sv:'Veckans rutnät — ett nytt varje måndag, och alla du har fått får du behålla.',da:'Ugens sæt — et nyt hver mandag, og I beholder alle dem, I har fået.',no:'Ukens rutenett — et nytt hvert mandag, og du beholder alle du har fått.',fi:'Viikon ruudukko — uusi joka maanantai, ja kaikki saamasi ruudukot jäävät sinulle.'},
    noReasonsYet: {en:'This grid has no reasons yet.',de:'Für dieses Rätsel gibt es noch keine Gründe.',fr:'Cette grille n’a pas encore de raisons.',it:'Questo quartetto non ha ancora i motivi.',es:'Esta tarjeta todavía no tiene razones.',pt:'Esta cartela ainda não tem motivos.',nl:'Bij deze denkkaart staan nog geen redenen.',sv:'Det här rutnätet har inga skäl än.',da:'Det her sæt har ingen grunde endnu.',no:'Dette rutenettet har ingen grunner ennå.',fi:'Tässä ruudukossa ei ole vielä perusteluja.'},

    /* the ritual + accessibility */
    hearStem:     {en:'Hear a sentence starter',de:'Einen Satzanfang hören',fr:'Écouter un début de phrase',it:'Ascolta un avvio di frase',es:'Escuchar cómo empezar la frase',pt:'Ouvir um começo de frase',nl:'Een startzin horen',sv:'Lyssna på hur du kan börja meningen',da:'Hør en sætning, du kan starte med',no:'Hør en setningsstarter',fi:'Kuuntele lauseen alku'},
    chosenToTalk: {en:'chosen to talk about',de:'zum Reden ausgewählt',fr:'on en parle',it:'da discutere insieme',es:'para comentar en clase',pt:'entrou na conversa',nl:'gekozen om over te praten',sv:'vi ska prata om det här hörnet',da:'valgt til at snakke om',no:'valgt til samtale',fi:'valittu keskusteltavaksi'},
    noLongerChosen:{en:'not chosen any more',de:'nicht mehr ausgewählt',fr:'on n’en parle plus',it:'non più da discutere',es:'sin elegir',pt:'saiu da conversa',nl:'niet meer gekozen',sv:'vi ska inte prata om det här hörnet',da:'ikke længere valgt',no:'ikke valgt lenger',fi:'valinta poistettu'},
    readAloud:    {en:'read aloud',de:'vorlesen',fr:'lire à voix haute',it:'leggi ad alta voce',es:'escuchar en voz alta',pt:'ler em voz alta',nl:'voorlezen',sv:'läs upp',da:'læs højt',no:'les opp',fi:'lue ääneen'},
    anotherWay:   {en:'You could also say:',de:'Man kann es auch so sehen:',fr:'On peut aussi le voir comme ça :',it:'Un altro modo di vederlo:',es:'Y también se puede ver así:',pt:'Também dá para ver assim:',nl:'Je kunt er ook zo naar kijken:',sv:'Man kan också tänka så här:',da:'Man kan også se det sådan her:',no:'En annen måte å se det på:',fi:'Voi ajatella myös näin:'},
    reasonFrom:   {en:'{pos}: {reason}',de:'{pos}: {reason}',fr:'{pos} : {reason}',it:'{pos}: {reason}',es:'{pos}: {reason}',pt:'{pos}: {reason}',nl:'{pos}: {reason}',sv:'{pos}: {reason}',da:'{pos}: {reason}',no:'{pos}: {reason}',fi:'{pos}: {reason}'},

    /* corner names — POSITION FIRST, because that is how a class refers
       to a corner out loud, and it is what makes the reveal narratable */
    posTL:        {en:'Top left',de:'Oben links',fr:'En haut à gauche',it:'In alto a sinistra',es:'Arriba a la izquierda',pt:'Em cima à esquerda',nl:'Linksboven',sv:'Uppe till vänster',da:'Øverst til venstre',no:'Øverst til venstre',fi:'Vasen yläkulma'},
    posTR:        {en:'Top right',de:'Oben rechts',fr:'En haut à droite',it:'In alto a destra',es:'Arriba a la derecha',pt:'Em cima à direita',nl:'Rechtsboven',sv:'Uppe till höger',da:'Øverst til højre',no:'Øverst til høyre',fi:'Oikea yläkulma'},
    posBL:        {en:'Bottom left',de:'Unten links',fr:'En bas à gauche',it:'In basso a sinistra',es:'Abajo a la izquierda',pt:'Embaixo à esquerda',nl:'Linksonder',sv:'Nere till vänster',da:'Nederst til venstre',no:'Nederst til venstre',fi:'Vasen alakulma'},
    posBR:        {en:'Bottom right',de:'Unten rechts',fr:'En bas à droite',it:'In basso a destra',es:'Abajo a la derecha',pt:'Embaixo à direita',nl:'Rechtsonder',sv:'Nere till höger',da:'Nederst til højre',no:'Nederst til høyre',fi:'Oikea alakulma'},

    /* spoken descriptions of cell content, for the screen reader */
    nDots:        {en:'{n} dots',de:'Punkte: {n}',fr:'{n} points',it:'{n} punti',es:'{n} puntos',pt:'{n} pontos',nl:'{n} stippen',sv:'antal prickar: {n}',da:'{n} prikker',no:'{n} prikker',fi:'{n} pistettä'},
    oneDot:       {en:'1 dot',fr:'1 point'},
    clockTime:    {en:'a clock showing {h}:{m}',de:'{h}:{m} Uhr',fr:'une horloge qui indique {h} h {m}',it:'{h}:{m} su un orologio',es:'{h}:{m} en un reloj',pt:'{h}:{m} no relógio',nl:'{h}:{m} op de klok',sv:'en klocka som visar {h}:{m}',da:'et ur, der viser {h}.{m}',no:'en klokke som viser {h}:{m}',fi:'kello {h}.{m}'},
    arr_dice:     {en:'in a dice pattern',de:'als Würfelbild',fr:'comme sur un dé',it:'come sul dado',es:'como en un dado',pt:'como num dado',nl:'als op een dobbelsteen',sv:'som på en tärning',da:'som på en terning',no:'som på en terning',fi:'kuten nopassa'},
    arr_row:      {en:'in a row',de:'in einer Reihe',fr:'en ligne',it:'in fila',es:'en fila',pt:'em fila',nl:'op een rij',sv:'på rad',da:'på række',no:'på rekke',fi:'rivissä'},
    arr_rowWrapped:{en:'in two rows',fr:'sur deux lignes'},
    arr_circle:   {en:'in a ring',de:'als Kreisbild',fr:'en rond',it:'in cerchio',es:'en círculo',pt:'em roda',nl:'in een kring',sv:'i en ring',da:'i en ring',no:'i ring',fi:'renkaana'},
    arr_scatter:  {en:'scattered',de:'durcheinander',fr:'en désordre',it:'sparsi',es:'sin orden',pt:'espalhados',nl:'door elkaar',sv:'utspridda',da:'spredt ud',no:'spredt utover',fi:'sikin sokin'},
    arr_tenframe: {en:'in a ten-frame',de:'im Zehnerfeld',fr:'dans une boîte de dix',it:'nella tabella del dieci',es:'en un marco de diez',pt:'no quadro de dez',nl:'in een tienraam',sv:'i en tioram',da:'i en tierramme',no:'i en tierramme',fi:'kymmenruudukossa'},
    fillSolid:    {en:'filled in',fr:'rempli'},
    fillOutline:  {en:'not filled in',de:'nicht ausgemalt',fr:'seulement le contour',it:'solo il contorno',es:'sin rellenar',pt:'só o contorno',nl:'niet ingekleurd',sv:'bara kanten',da:'ikke fyldt ud',no:'bare omriss',fi:'ei väritetty sisältä'},
    fillHatch:    {en:'striped',de:'gestreift',fr:'à rayures',it:'a righe',es:'con rayas',pt:'com listras',nl:'gestreept',sv:'med ränder',da:'skråstribet',no:'stripete',fi:'viivoitettu'},
    fillStipple:  {en:'speckled',de:'getupft',fr:'à pois',it:'a puntini',es:'con puntitos',pt:'com bolinhas',nl:'gespikkeld',sv:'med små punkter',da:'prikket',no:'prikkete',fi:'täplikäs'},
    rotated:      {en:'turned',fr:'dans un autre sens'},
    sizeSmall:    {en:'small',de:'klein',fr:'en plus petit',it:'in piccolo',es:'de tamaño pequeño',pt:'de tamanho pequeno',nl:'klein',sv:'liten storlek',da:'lille',no:'liten størrelse',fi:'pieni'},
    sizeMedium:   {en:'medium',fr:'en taille moyenne'},
    sizeLarge:    {en:'large',fr:'en plus grand'},
    shape_circle: {en:'a circle',de:'ein Kreis',fr:'un cercle',it:'un cerchio',es:'un círculo',pt:'um círculo',nl:'een cirkel',sv:'en cirkel',da:'en cirkel',no:'en sirkel',fi:'ympyrä'},
    shape_square: {en:'a square',de:'ein Quadrat',fr:'un carré',it:'un quadrato',es:'un cuadrado',pt:'um quadrado',nl:'een vierkant',sv:'en kvadrat',da:'et kvadrat',no:'et kvadrat',fi:'neliö'},
    shape_rectangle:{en:'a rectangle',de:'ein Rechteck',fr:'un rectangle',it:'un rettangolo',es:'un rectángulo',pt:'um retângulo',nl:'een rechthoek',sv:'en rektangel',da:'et rektangel',no:'et rektangel',fi:'suorakulmio'},
    shape_triangle:{en:'a triangle',de:'ein Dreieck',fr:'un triangle',it:'un triangolo',es:'un triángulo',pt:'um triângulo',nl:'een driehoek',sv:'en triangel',da:'en trekant',no:'en trekant',fi:'kolmio'},
    shape_rightTriangle:{en:'a triangle with a square corner',de:'ein Dreieck mit einem rechten Winkel',fr:'un triangle avec un angle droit',it:'un triangolo con un angolo retto',es:'un triángulo con una esquina cuadrada',pt:'um triângulo com um ângulo reto',nl:'een driehoek met een rechte hoek',sv:'en triangel med en rät vinkel',da:'en trekant med et ret hjørne',no:'en trekant med en rett vinkel',fi:'suorakulmainen kolmio'},
    shape_hexagon:{en:'a hexagon',de:'ein Sechseck',fr:'un hexagone',it:'un esagono',es:'un hexágono',pt:'um hexágono',nl:'een zeshoek',sv:'en sexhörning',da:'en sekskant',no:'en sekskant',fi:'kuusikulmio'},
    shape_pentagon:{en:'a pentagon',de:'ein Fünfeck',fr:'un pentagone',it:'un pentagono',es:'un pentágono',pt:'um pentágono',nl:'een vijfhoek',sv:'en femhörning',da:'en femkant',no:'en femkant',fi:'viisikulmio'},
    shape_octagon:{en:'an octagon',de:'ein Achteck',fr:'un octogone',it:'un ottagono',es:'un octágono',pt:'um octógono',nl:'een achthoek',sv:'en åttahörning',da:'en ottekant',no:'en åttekant',fi:'kahdeksankulmio'},
    shape_ellipse:{en:'an oval',de:'ein Oval',fr:'un ovale',it:'un ovale',es:'un óvalo',pt:'uma figura oval',nl:'een ovaal',sv:'en oval',da:'en oval',no:'en oval',fi:'soikio'},
    shape_rhombus:{en:'a rhombus',de:'eine Raute',fr:'un losange',it:'un rombo',es:'un rombo',pt:'um losango',nl:'een ruit',sv:'en romb',da:'en rombe',no:'en rombe',fi:'vinoneliö'},
    shape_trapezoid:{en:'a trapezoid',de:'ein Trapez',fr:'un trapèze',it:'un trapezio',es:'un trapecio',pt:'um trapézio',nl:'een trapezium',sv:'en trapets',da:'et trapez',no:'et trapes',fi:'puolisuunnikas'},
    shape_semicircle:{en:'a half circle',de:'ein Halbkreis',fr:'un demi-cercle',it:'un semicerchio',es:'medio círculo',pt:'meio círculo',nl:'een halve cirkel',sv:'en halvcirkel',da:'en halvcirkel',no:'en halvsirkel',fi:'puoliympyrä'},
    shape_star:   {en:'a star',de:'ein Stern',fr:'une étoile',it:'una stella',es:'una estrella',pt:'uma estrela',nl:'een ster',sv:'en stjärna',da:'en stjerne',no:'en stjerne',fi:'tähti'},
    shape_cross:  {en:'a cross',de:'ein Kreuz',fr:'une croix',it:'una croce',es:'una cruz',pt:'uma cruz',nl:'een kruis',sv:'ett kors',da:'et kors',no:'et kors',fi:'risti'},
    shape_heart:  {en:'a heart',de:'ein Herz',fr:'un cœur',it:'un cuore',es:'un corazón',pt:'um coração',nl:'een hart',sv:'ett hjärta',da:'et hjerte',no:'et hjerte',fi:'sydän'},

    /* settings */
    setBand:      {en:'Your class',de:'Alter der Kinder',fr:'Votre classe',it:'La tua classe',es:'Tu clase',pt:'Sua turma',nl:'Jouw groep',sv:'Din klass',da:'Din klasse',no:'Klassen din',fi:'Ikäryhmä'},

    /* print */
    /* ⚠ `printTalkTitle` and `printTeacher` were authored here and never
       reached — the sheet uses `title` for its heading and has no teacher
       page yet. A dead string is not harmless: it goes to eleven native
       panels, costs eleven pieces of real work, and renders nowhere.
       Deleted rather than given a home it does not have. */
    printSheet:   {en:'Print the sheet',de:'Arbeitsblatt drucken',fr:'Imprimer la fiche',it:'Stampa le schede',es:'Imprimir las páginas',pt:'Imprimir as folhas',nl:'Denkblad printen',sv:'Skriv ut arbetsbladet',da:'Print arket',no:'Skriv ut arkene',fi:'Tulosta moniste'},
    printChildLine:{en:'It’s the only one that',de:'Es ist das Einzige, das',fr:'C’est le seul qui',it:'Ho scelto ____________ .  È l’unico che',es:'Yo elegí ____________ . Es diferente porque',pt:'É o único que ______________________________',nl:'Het is de enige die',sv:'Jag valde ____________. Den är den enda som',da:'Den er den eneste, der',no:'Jeg valgte ____________ .  Den er den eneste som',fi:'Minä valitsin: ____________ . Se on ainoa, joka'},
    printOthers:  {en:'Someone else chose ____________. They said it was the only one that',de:'Jemand anderes hat eine andere Ecke gewählt. Warum?',fr:'Quelqu’un d’autre a choisi ____________. Sa raison :',it:'Un compagno o una compagna ha scelto ____________ .  Il suo motivo:',es:'Alguien más eligió ____________ . Su razón:',pt:'Alguém da turma escolheu ____________ . O motivo foi:',nl:'Iemand anders koos ____________ . De reden daarvoor:',sv:'Någon annan valde ____________. Skälet var:',da:'En anden valgte ____________ . Grunden var:',no:'En annen valgte ____________ .  Grunnen var:',fi:'Joku toinen valitsi: ____________ . Hänen perustelunsa:'},
    printMakeOwn: {en:'Make your own grid',de:'Baue dein eigenes Rätsel',fr:'Crée ta propre grille',it:'Crea un quartetto in cui ogni angolo può essere l’intruso.',es:'Crea una tarjeta en la que cada una de las cuatro pueda ser la diferente.',pt:'Monte uma cartela em que cada canto possa ser o diferente.',nl:'Maak zelf een denkkaart waarbij elke hoek de vreemde eend in de bijt kan zijn.',sv:'Gör ett eget rutnät där varje hörn kan vara det som inte passar in.',da:'Lav et sæt, hvor alle fire kan være den, der skiller sig ud.',no:'Lag et rutenett der hvert hjørne kan være det som skiller seg ut.',fi:'Tee oma ruudukko, jossa jokainen voi olla se, joka ei kuulu joukkoon.'},
    gatePrint:    {en:'The printable sheet is part of Premium. Everything on the board stays free.',de:'Die Arbeitsblätter zum Ausdrucken gehören zu Premium. Das Rätsel der Woche bleibt immer kostenlos.',fr:'Les fiches à imprimer font partie de Premium. La grille de la semaine reste gratuite.',it:'Le schede da stampare fanno parte di Premium. Il quartetto della settimana resta sempre gratuito.',es:'Las páginas para imprimir son parte de Premium. La tarjeta de la semana siempre es gratis.',pt:'As folhas para imprimir fazem parte do Premium. A cartela da semana é sempre gratuita.',nl:'De denkbladen om te printen horen bij Premium. De denkkaart van de week blijft altijd gratis.',sv:'Att skriva ut arbetsbladen ingår i Premium. Veckans rutnät är alltid gratis.',da:'Ark til print er en del af Premium. Ugens sæt er altid gratis.',no:'Arkene til utskrift er en del av Premium. Ukens rutenett er alltid gratis.',fi:'Tulostettavat monisteet kuuluvat Premiumiin. Viikon ruudukko on aina ilmainen.'}
  },

  /* ⭐ THE BAND IS A SETTING, NOT A BROWSE FILTER. It decides which deck
     Next walks AND which grid the free weekly rotation hands out. The
     shipped rotation ignored band entirely — it indexed all 21 grids by
     ISO week — so a reception teacher's one free grid was age-appropriate
     in 8 weeks out of 21, and two weeks in three the shop window showed
     her a Grade-2 clock face. That is where her judgement of the whole
     product was formed. */
  defaults: { showWords: false, band: 'K' },
  settings: [
    { key: 'band', type: 'choice', labelKey: 'setBand',
      options: [
        { value: 'K', labelKey: 'bandK' },
        { value: 'G1', labelKey: 'bandG1' },
        { value: 'G23', labelKey: 'bandG23' }
      ] },
    { key: 'showWords', type: 'toggle', labelKey: 'setShowWords' }
  ],

  STORE_KEY: 'lcs:wodb:v1',
  ENT_TRUST_DAYS: 14,

  /* ⭐⭐ COLOUR IS NO LONGER AN ANSWER. This is the largest design change
     in the rebuild and it was forced by measurement, not taste.

     The shipped palette was functionally TWO colours:
       teal #146B5E vs plum #6B4C9A   1.05:1   (and identical under all
                                                three dichromacies)
       coral #F2784B vs honey #F2C879 1.76:1
       honey vs the cell #FFFEFB      1.56:1
     `wodb-shape-k-onlyone` and `wodb-shape-23-triangles` each offered
     "It's the only purple one" as one of their four answers. For roughly
     one boy in twelve that answer did not exist — nor did it in
     greyscale, on a photocopy, or on a washed-out projector. A tool whose
     whole premise is "every answer can be right" was shipping an answer
     that, for some children, was not there.

     ⚠ I then tried to fix it by choosing better colours, and
     scripts/audit-wodb-palette.js proved that CANNOT BE DONE: an
     exhaustive sweep of 15,190 candidate inks found NO set of four that
     stays >=1.9:1 apart under normal, deuteranopic, protanopic AND
     tritanopic vision while each keeps >=2.4:1 on the cell. Three is the
     ceiling, and the three are ugly. (An art panel's prescription,
     plum #8E3F86, measured 1.03:1 against teal — worse than what it
     replaced. A proposed hex is a hypothesis too.)

     So the channel goes. ONE ink for every abstract medium, and the
     discriminating channel becomes FILL TEXTURE — solid / outline /
     hatch / stipple — which survives greyscale, print, projection and
     every dichromacy. This is not a compromise: colour was always the
     weakest reason in the file, a graphic-design property rather than a
     mathematical one, exactly like the "not coloured in" the pedagogy
     audit flagged. Shape, size, orientation, count and texture are all
     things a child can reason ABOUT. "Purple" never was.

     ⭐ And the law is now unbreakable rather than merely enforced: a grid
     cannot discriminate by colour because there is no colour to
     discriminate by. */
  INK: '#146B5E',                                   /* the one abstract-media ink */
  FILLS: ['solid', 'outline', 'hatch', 'stipple'],  /* the answer-bearing channel */
  /* chrome only — these never have to be told apart from each other,
     because none of them is ever one of the four answers */
  UI: {
    ear:   '#123F58',   /* 12.1:1 on the cell; deliberately NOT coral, which
                           collided with coral shapes on three grids       */
    warm:  '#C98A05',   /* the reveal rule + ribbon edge                    */
    plate: '#F6E3B4'    /* the all-revealed plate — warmth as AREA          */
  },
  /* legacy shim: grids authored before this change carry `color` on their
     shape cells. It is ignored for ink, but the value still selects a
     TEXTURE, so an old grid that leaned on colour degrades into the new
     channel instead of collapsing into four identical shapes. */
  LEGACY_FILL: { teal: 'solid', coral: 'solid', honey: 'stipple', plum: 'hatch' },

  BAND_KEY: { K: 'bandK', G1: 'bandG1', G23: 'bandG23' },
  BANDS: ['K', 'G1', 'G23'],
  /* position first, because that is how a class refers to a corner out
     loud, and it is what makes the reveal narratable to a screen reader */
  POS_KEY: ['posTL', 'posTR', 'posBL', 'posBR'],

  /* ==================== THE MODEL (pure, no DOM) ====================
     Everything below is a function of its arguments only, so the Node
     gate can enumerate it without a browser. */

  /* A quarter turn of the four corners. This is the FREE tier's real
     move — same four things, new corners — and it is good WODB practice
     rather than a consolation prize: position is not meaning, and a class
     that anchored on "the top-left one" has to look again.
     Clockwise: TL->TR, TR->BR, BR->BL, BL->TL. */
  turnCells: function (cells) {
    if (!cells || cells.length !== 4) return cells;
    return [cells[2], cells[0], cells[3], cells[1]];
  },

  /* Four turns are the identity — the property the gate checks, because
     it is the one thing a wrong permutation cannot also satisfy. */
  bandOf: function (g) { return (g && g.band) || 'K'; },

  /* The ids of one band, in the repertoire's own order. The deck a
     teacher walks with Next is THEIR BAND, never the whole library: a
     Year-1 class must not be dropped into a Grade-2 grid mid-lesson. */
  deckFor: function (payload, band) {
    var out = [], all = (payload && payload.grids) || [], i;
    for (i = 0; i < all.length; i++) if (all[i].band === band) out.push(all[i].id);
    return out;
  },

  /* ISO week — the deterministic weekly rotation is this tool's signature
     (number-sieve was deliberately denied one to keep it so). */
  isoWeek: function (now) {
    var d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    var day = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - day + 3);
    var first = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
    return 1 + Math.round(((d - first) / 86400000 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
  },

  /* ⭐ BAND-SCOPED. The shipped rotation indexed all 21 grids by ISO week
     ignoring band, so a reception teacher's one free grid was
     age-appropriate in 8 weeks out of 21 — and that is where her
     judgement of the whole product was formed. */
  featuredIdFor: function (payload, band, now) {
    var order = (payload && payload.featuredOrder) || [];
    var pool = [], i;
    var byId = {};
    ((payload && payload.grids) || []).forEach(function (g) { byId[g.id] = g; });
    /* honour the curated order, filtered to the band */
    for (i = 0; i < order.length; i++) {
      if (byId[order[i]] && byId[order[i]].band === band) pool.push(order[i]);
    }
    if (!pool.length) pool = this.deckFor(payload, band);
    if (!pool.length) return null;
    return pool[this.isoWeek(now || new Date()) % pool.length];
  },

  /* reasons[i] is an ARRAY. A real WODB corner has two to four defensible
     reasons; storing one and presenting it in an authoritative card,
     spoken aloud, is a soft verdict — the lift ring is scrupulously
     non-judgemental and the reveal was undoing it. Legacy single-object
     and plain-string shapes still resolve, so every grid authored before
     this change keeps working. */
  reasonListFor: function (g, i, lang) {
    if (!g || !g.reasons || !g.reasons[i]) return [];
    var r = g.reasons[i];
    var pick = function (x) {
      if (!x) return null;
      if (typeof x === 'string') return x || null;      /* custom saved grids */
      return x[lang] || x.en || null;                    /* per-locale map    */
    };
    if (Object.prototype.toString.call(r) === '[object Array]') {
      var out = [], j;
      for (j = 0; j < r.length; j++) { var v = pick(r[j]); if (v) out.push(v); }
      return out;
    }
    var one = pick(r);
    return one ? [one] : [];
  },

  /* ⭐ ONE PLACE DECIDES A CELL'S FILL, so the renderer, the accessible
     name and the print sheet can never disagree about it. They did: the
     Italian panel measured `wodb-shape-23-triangles` cell 4, which is
     `{shape:'triangle', color:'plum', fill:'filled'}` — LEGACY_FILL maps
     plum to `hatch`, so it RENDERS hatched while the screen reader said
     "a triangle, small". That grid is titled "All triangles!"; telling
     the four apart is its entire task. */
  fillOf: function (cell) {
    var fk = cell && cell.fill;
    if (!fk || fk === 'filled') fk = 'solid';
    if (fk === 'solid' && cell && cell.color && this.LEGACY_FILL[cell.color]) {
      fk = this.LEGACY_FILL[cell.color];
    }
    return fk;
  },

  /* ⚠ WHAT WAS DRAWN, NOT WHAT WAS DECLARED. `_dotsSVG` substitutes a
     scatter for a dice count it has no face for and for a ten-frame over
     ten, and wraps a row above eight — so `wodb-dots-1-twelve`'s
     `{arr:'row', n:12}` renders as two rows of six while the label said
     "in a row", in the one grid that exists to compare four
     representations of twelve. */
  renderedArr: function (arr, n) {
    n = Math.max(0, Math.round(Number(n) || 0));
    if (arr === 'dice' && !this.DICE[n]) return 'scatter';
    if (arr === 'tenframe' && n > 10) return 'scatter';
    if (arr === 'row' && n > 8) return 'rowWrapped';
    return arr;
  },

  /* how many corners actually carry a reason — NOT four. A custom grid
     with two reasons could never reach the closing line, because the
     shipped check compared against a hard 4. */
  reasonedCount: function (g, lang) {
    var n = 0, i;
    for (i = 0; i < 4; i++) if (this.reasonListFor(g, i, lang).length) n++;
    return n;
  },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    var self = this;
    this.api = api;
    this.premium = false;
    this.grids = null;          /* wodb-grids.json payload */
    this.byId = {};
    this.current = null;
    this.lifted = {};           /* cellIndex -> true */
    this.revealMode = false;
    this.revealed = {};
    this.closingShown = false;
    this._stemIdx = 0;
    this.building = false;
    this._draft = null;
    this._pwwIndex = null;      /* lazy-loaded for the builder */

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, savedGrids: [], settings: null };
    if (!Array.isArray(this._store.savedGrids)) this._store.savedGrids = [];
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var params = new URLSearchParams(location.search);
    this._wantGrid = params.get('grid') || null;   /* premium-gated at resolve */

    fetch('/mini-tools/wodb-grids.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        self.grids = j;
        (j.grids || []).forEach(function (g) { self.byId[g.id] = g; });
        self.current = self._resolveGrid();
        self.render();
      })
      .catch(function () {
        var ld = api.el('div', 'wdb-loading');
        ld.textContent = api.t('loading');
        api.stage.appendChild(ld);
      });

    /* ⚠⚠ THE PICTURE CELLS HAD NO ACCESSIBLE NAME AT ALL, AND THE INDEX
       THAT SUPPLIES IT WAS ONLY LOADED IF A SETTING HAPPENED TO BE ON.
       `_pwwWord` reads `_pwwIndex`, which was fetched lazily by the
       BUILDER and by the showWords toggle — so on a picture grid a
       screen-reader user heard four corners with a position and nothing
       else, and the reveal could not be narrated. Found by a consequence
       probe that compared two different grids and got identical labels
       out of both. Loaded eagerly now; the render repaints when it lands. */
    this._loadPwwIndex().then(function () { if (self._wrap) self.render(); });

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
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) { self.current = self._resolveGrid(); self.render(); } }
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
        if (self._wrap) { self.current = self._resolveGrid(); self.render(); }
      })
      .catch(function () { trustCache(); });
  },

  /* ============================ helpers ============================ */

  _loc: function (map, fallbackKey) {
    if (!map) return fallbackKey ? this.api.t(fallbackKey) : '';
    return map[this.api.lang] || map.en || '';
  },
  /* ⚠ `_isoWeek` USED TO LIVE HERE, byte-identical to the model's
     `isoWeek` above. The mutation harness found it — a needle aimed at
     the week calculation matched twice and could not say which copy it
     meant. Two copies of one rule is the half-fixed trap: a correction to
     either leaves the other wrong, and the free tier's whole rotation
     hangs off it. Deleted; `isoWeek` is the single implementation and
     the gate checks it against an independently written one. */

  /* the band a teacher has chosen, persisted beside showWords */
  _band: function () {
    var b = this.api && this.api.settings && this.api.settings.band;
    return this.BANDS.indexOf(b) >= 0 ? b : 'K';
  },

  _featuredGrid: function () {
    var id = this.featuredIdFor(this.grids, this._band(), new Date());
    return (id && this.byId[id]) || null;
  },
  _isFeatured: function (g) {
    var f = this._featuredGrid();
    return !!(f && g && f.id === g.id);
  },

  /* ⭐ EVERY FREE GRID A TEACHER HAS EVER BEEN GIVEN STAYS UNLOCKED.
     The shipped tier handed out one grid and took it back on Monday, so
     a year of use left a teacher with exactly one. Now the weekly gift
     accumulates — about forty over a school year — and the paid offer
     becomes "all of them now, plus the builder" instead of a drip. It
     costs one array and it is the difference between a free tier and a
     teaser. */
  _seeFree: function (id) {
    if (!id) return;
    var seen = this._store.seenFree || (this._store.seenFree = []);
    if (seen.indexOf(id) < 0) { seen.push(id); this._saveStore(); }
  },
  _canOpen: function (g) {
    if (!g) return false;
    if (this.premium) return true;
    if (g.mine) return true;                               /* their own work */
    if (this._isFeatured(g)) return true;                  /* this week's    */
    return (this._store.seenFree || []).indexOf(g.id) >= 0;/* every past week*/
  },

  /* STRUCTURAL free gate: a ?grid= deep link still cannot reach anything
     a free teacher was never given. */
  _resolveGrid: function () {
    if (!this.grids) return null;
    var want = this._wantGrid && (this.byId[this._wantGrid] ||
      this._store.savedGrids.filter(function (g) { return g.id === this._wantGrid; })[0]);
    if (want && this._canOpen(want)) return want;
    if (this.current && this._canOpen(this.current)) return this.current;
    return this._featuredGrid();
  },

  /* ⚠ a grid with TWO reasons is still a grid with reasons. The shipped
     check demanded `reasons.length === 4`, so a custom grid the teacher
     part-filled showed no reveal control at all. */
  _hasReasons: function (g) {
    return this.reasonedCount(g, this.api ? this.api.lang : 'en') > 0;
  },

  /* ========================= the deck ==============================
     Next walks the teacher's OWN BAND, never the whole library — the
     one thing that must not happen mid-lesson is a Year-1 class being
     handed a Grade-2 clock face. */
  _deck: function () {
    var self = this;
    if (this.current && this.current.mine) {
      return this._store.savedGrids.map(function (g) { return g.id; });
    }
    return this.deckFor(this.grids, this._band()).filter(function (id) {
      return self._canOpen(self.byId[id]);
    });
  },
  /* curated grids live in byId, a teacher's own in the store — one
     resolver, so no caller can look in only half the world */
  _gridById: function (id) {
    if (!id) return null;
    if (this.byId[id]) return this.byId[id];
    var mine = this._store.savedGrids.filter(function (g) { return g.id === id; });
    return mine.length ? mine[0] : null;
  },
  _deckPos: function () {
    var d = this._deck();
    return this.current ? d.indexOf(this.current.id) : -1;
  },
  _step: function (delta) {
    var d = this._deck(), i = this._deckPos();
    if (i < 0) i = 0; else i += delta;
    if (i < 0) return false;
    if (i >= d.length) return false;              /* never wrap silently */
    var g = this._gridById(d[i]);
    if (!g) return false;
    this._setGrid(g);
    this.api.track(delta > 0 ? 'grid:next' : 'grid:prev', { id: g.id, band: g.band });
    this.api.announce(this._loc(g.title) + ' — ' + (i + 1) + '/' + d.length);
    return true;
  },

  /* the FREE move, and a real one: same four things, new corners.
     Position is not meaning, and a class that anchored on "the top-left
     one" has to look again. It is not a consolation prize and it is not
     a paywall dressed as a button. */
  _turnIt: function () {
    if (!this.current) return;
    var g = this.current;
    var turned = {};
    for (var k in g) if (Object.prototype.hasOwnProperty.call(g, k)) turned[k] = g[k];
    turned.cells = this.turnCells(g.cells);
    if (g.reasons) turned.reasons = this.turnCells(g.reasons);
    turned._turns = (g._turns || 0) + 1;
    this.byId[g.id] = turned;                    /* keep identity for the deck */
    this.current = turned;
    this._resetRitual();
    this.render();
    this.api.track('grid:turn', { id: g.id, turns: turned._turns });
    /* ⚠ FOUR TURNS ARE THE IDENTITY, so the fourth press puts the grid
       back exactly where it started — and announcing "new corners" there
       is a string describing a move the code did not make. The Swedish
       panel found this by reading the model; no gate would have, because
       the turn itself is correct every single time. */
    this.api.announce(this.api.t(turned._turns % 4 === 0 ? 'turnedFull' : 'turnedAnnounce'));
  },
  _speak: function (text) {
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.92 }); } catch (_) {}
    this.api.announce(text);
  },

  /* ======================== cell renderers ========================= */
  /* One renderer, two scales — the library thumbnails are the SAME
     renderers at mini scale (no thumbnail pipeline). */

  _cellContent: function (cell, mini) {
    var api = this.api;
    var host = api.el('div', 'wdb-cc' + (mini ? ' mini' : ''));
    if (!cell) return host;
    if (cell.t === 'num') {
      var n = api.el('div', 'wdb-num' + (String(cell.v).length >= 3 ? ' three' : (String(cell.v).length === 2 ? ' two' : '')));
      n.textContent = String(cell.v);
      host.appendChild(n);
    } else if (cell.t === 'word') {
      var w = api.el('div', 'wdb-wordcell');
      w.textContent = this._loc(cell.w) || (cell.w && cell.w.en) || '';
      host.appendChild(w);
    } else if (cell.t === 'shape') {
      host.innerHTML = this._shapeSVG(cell);
    } else if (cell.t === 'dots') {
      host.innerHTML = this._dotsSVG(cell.arr, cell.n);
    } else if (cell.t === 'clock') {
      host.innerHTML = this._clockSVG(cell.h, cell.m);
    } else if (cell.t === 'img') {
      var img = document.createElement('img');
      img.className = 'wdb-img';
      img.loading = 'lazy'; img.decoding = 'async';
      img.alt = '';
      img.src = '/image-library-webp/themes/' + encodeURIComponent(cell.d) + '/' + cell.f + '@' + (mini ? '1x' : '2x') + '.webp';
      host.appendChild(img);
      if (!mini && this.api.settings.showWords && this._pwwWord(cell)) {
        var cw = api.el('div', 'wdb-cellword');
        cw.textContent = this._pwwWord(cell);
        host.appendChild(cw);
      }
    }
    return host;
  },
  _pwwWord: function (cell) {
    if (!this._pwwIndex) return null;
    for (var i = 0; i < this._pwwIndex.themes.length; i++) {
      var t = this._pwwIndex.themes[i];
      if (t.k !== cell.theme) continue;
      for (var j = 0; j < t.c.length; j++) if (t.c[j].k === cell.k) return t.c[j].s;
    }
    return null;
  },

  /* ⭐ GEOMETRY, ON A KEYLINE SYSTEM, WITH AN OPTICAL ANCHOR EACH.
     Measured on the shipped paths (shoelace, 100x100 viewBox):
       square 5184 · circle 4536 · hexagon 4536 · rectangle 4032
       triangle 2880 · rightTriangle 2592 · star 2321
     `wodb-shape-1-sides` puts triangle/square/hexagon/star side by side —
     THE SQUARE CARRIED 2.23x THE INK OF THE STAR, in a routine whose
     entire premise is that the four are equal claims. You cannot area-match
     a triangle to a circle without shrinking the circle to nothing, so the
     fix is envelope keylines with a per-shape optical scale, the way icon
     systems do it: pointed shapes get a bigger circumcircle because points
     read lighter than their area.
     ⚠ And the star was not a star: its outer radii ran 42.0/44.6/46.6/
     46.6/44.6 (11% variance) at 74.4/70.2/70.8/70.2/74.4 degrees instead
     of a constant 72. Hand-eyeballed, and obvious at 400px.
     ⚠ `rot` used to pivot on (50,50). A triangle's optical anchor is at
     y=52.7, so a 180-degree turn moved it 5 units — the two triangles in
     `wodb-shape-23-triangles` were misaligned by 5% of the cell. */
  SHAPES: {
    /* d: path · a: [ax, ay] optical anchor · k: scale so the ink balances */
    circle:        { d: 'M50 6 A44 44 0 1 1 49.9 6 Z',                                        a: [50, 50],     k: 0.93 },
    square:        { d: 'M14 10 H86 A4 4 0 0 1 90 14 V86 A4 4 0 0 1 86 90 H14 A4 4 0 0 1 10 86 V14 A4 4 0 0 1 14 10 Z', a: [50, 50], k: 0.90 },
    rectangle:     { d: 'M10 24 H90 A4 4 0 0 1 94 28 V72 A4 4 0 0 1 90 76 H10 A4 4 0 0 1 6 72 V28 A4 4 0 0 1 10 24 Z',  a: [50, 50], k: 1.07 },
    triangle:      { d: 'M50 8 L94 84.2 L6 84.2 Z',                                           a: [50, 58.8],   k: 1.25 },
    rightTriangle: { d: 'M14 12 L14 88 L90 88 Z',                                             a: [39.3, 62.7], k: 1.34 },
    hexagon:       { d: 'M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z',                 a: [50, 50],     k: 0.99 },
    pentagon:      { d: 'M50 7 L94.7 39.5 L77.6 92 L22.4 92 L5.3 39.5 Z',                     a: [50, 55.4],   k: 1.00 },
    octagon:       { d: 'M67.6 7.5 L92.5 32.4 L92.5 67.6 L67.6 92.5 L32.4 92.5 L7.5 67.6 L7.5 32.4 L32.4 7.5 Z', a: [50, 50], k: 0.93 },
    ellipse:       { d: 'M50 18 A48 32 0 1 1 49.9 18 Z',                                      a: [50, 50],     k: 1.04 },
    rhombus:       { d: 'M50 5 L81 50 L50 95 L19 50 Z',                                       a: [50, 50],     k: 1.34 },
    trapezoid:     { d: 'M26.5 24 L73.5 24 L97 76 L3 76 Z',                                   a: [50, 53.3],   k: 1.19 },
    semicircle:    { d: 'M2 71 A48 48 0 0 1 98 71 Z',                                         a: [50, 60.6],   k: 1.20 },
    /* a regular pentagram: R = 48, r = 0.38197 R, first point at -90deg */
    star:          { d: 'M50 2 L60.8 35.2 L95.7 35.2 L67.4 55.7 L78.2 88.8 L50 68.3 ' +
                        'L21.8 88.8 L32.6 55.7 L4.3 35.2 L39.2 35.2 Z',                       a: [50, 50.5],   k: 1.34 },
    cross:         { d: 'M38 6 H62 V38 H94 V62 H62 V94 H38 V62 H6 V38 H38 Z',                 a: [50, 50],     k: 1.20 },
    /* kept, but it is a SYMBOL not a figure — it has no side count, no
       vertex count and no symmetry order, so it can join no reasoning
       frame the others support. Never mix it into a geometry grid. */
    heart:         { d: 'M50 88 C20 64 8 46 12 32 C16 18 34 14 50 30 C66 14 84 18 88 32 C92 46 80 64 50 88 Z', a: [50, 54], k: 1.03 }
  },

  _shapeSVG: function (cell, mini) {
    var ink = this.INK;
    var S = this.SHAPES[cell.shape] || this.SHAPES.circle;
    /* 0.55 was a 30% area — not "the small one" but "the speck". 0.62 is
       38%, still unmistakable beside a full-size sibling. */
    var scale = (cell.size === 'sm' ? (mini ? 0.75 : 0.62) : (cell.size === 'md' ? 0.82 : 1)) * S.k;

    /* fill: the answer-bearing channel now that colour is not one. Old
       grids carry `color`; it selects a texture rather than an ink. */
    var fillKind = cell.fill;
    if (!fillKind || fillKind === 'filled') fillKind = 'solid';
    if (fillKind === 'solid' && cell.color && this.LEGACY_FILL[cell.color]) {
      fillKind = this.LEGACY_FILL[cell.color];
    }

    /* ⚠ OUTLINE MUST BE THE SAME SIZE AS SOLID. A 6-unit stroke centred on
       the path put 3 units outside it, so an outline circle was
       effectively r=41 against a filled r=38 — "the only one not coloured
       in" was ALSO "the only bigger one", an unintended second
       discriminator. non-scaling-stroke keeps the line weight a family
       constant instead of shrinking with `sm`. */
    var uid = 'wdbp' + (this._pat = (this._pat || 0) + 1);
    var defs = '', paint = ink, extra = '';
    if (fillKind === 'outline') {
      paint = 'none';
      extra = ' stroke="' + ink + '" stroke-width="6" stroke-linejoin="round" ' +
        'stroke-miterlimit="2" vector-effect="non-scaling-stroke"';
    } else if (fillKind === 'hatch' || fillKind === 'stipple') {
      var body = fillKind === 'hatch'
        ? '<path d="M0 8 L8 0" stroke="' + ink + '" stroke-width="2.6"/>' +
          '<path d="M-2 2 L2 -2 M6 10 L10 6" stroke="' + ink + '" stroke-width="2.6"/>'
        : '<circle cx="4" cy="4" r="1.9" fill="' + ink + '"/>';
      defs = '<defs><pattern id="' + uid + '" width="8" height="8" patternUnits="userSpaceOnUse">' +
        body + '</pattern></defs>';
      paint = 'url(#' + uid + ')';
      /* a textured shape still needs its silhouette, or it reads as a
         cloud rather than a hexagon */
      extra = ' stroke="' + ink + '" stroke-width="3.5" stroke-linejoin="round"';
    }

    var inner = '<path d="' + S.d + '" fill="' + paint + '"' + extra + '/>';

    /* rotate about the OPTICAL anchor, then scale about it too, so a
       turned or shrunk shape stays where the eye expects it */
    var tf = [];
    if (cell.rot) tf.push('rotate(' + cell.rot + ' ' + S.a[0] + ' ' + S.a[1] + ')');
    if (scale !== 1) {
      tf.push('translate(' + (S.a[0] - S.a[0] * scale).toFixed(2) + ' ' +
        (S.a[1] - S.a[1] * scale).toFixed(2) + ') scale(' + scale.toFixed(3) + ')');
    }
    /* ⚠ overflow:visible — a `lg` square at rot:45 has a 101.8-unit
       diagonal in a 100-unit box and used to have its four tips sheared
       off by the root's default clip. */
    return '<svg class="wdb-shape" viewBox="0 0 100 100" overflow="visible" aria-hidden="true">' +
      defs + (tf.length ? '<g transform="' + tf.join(' ') + '">' + inner + '</g>' : inner) + '</svg>';
  },

  DICE: {
    1: [[50, 50]],
    2: [[28, 72], [72, 28]],
    3: [[26, 74], [50, 50], [74, 26]],
    4: [[30, 30], [70, 30], [30, 70], [70, 70]],
    5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
    6: [[30, 24], [70, 24], [30, 50], [70, 50], [30, 76], [70, 76]],
    7: [[30, 24], [70, 24], [30, 50], [50, 50], [70, 50], [30, 76], [70, 76]],
    8: [[30, 22], [70, 22], [30, 41], [70, 41], [30, 59], [70, 59], [30, 78], [70, 78]],
    9: [[28, 28], [50, 28], [72, 28], [28, 50], [50, 50], [72, 50], [28, 72], [50, 72], [72, 72]]
  },
  SCATTER: {
    4: [[30, 34], [66, 22], [44, 66], [76, 62]],
    12: [[16, 26], [38, 16], [62, 24], [84, 18], [24, 48], [48, 42], [72, 46], [90, 52], [18, 74], [42, 82], [64, 70], [84, 80]]
  },
  _dot: function (x, y, r, col, mini) {
    var c = '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) +
      '" fill="' + col + '"/>';
    /* the highlight is a tactile bead at 58px and 24 wasted DOM nodes per
       cell at 4px, so the thumbnails do without it. ⚠ It also used to sit
       up-LEFT while the house light source — set by the cell's own
       box-shadow — is directly overhead. */
    if (mini) return c;
    return c + '<circle cx="' + x.toFixed(1) + '" cy="' + (y - r * 0.34).toFixed(1) +
      '" r="' + (r * 0.26).toFixed(1) + '" fill="#fff" opacity="0.30"/>';
  },

  /* ⚠⚠ A COUNTING RENDERER THAT SILENTLY DREW THE WRONG NUMBER. The
     shipped code had THREE ways to do it: `DICE[n] || DICE[6]`,
     `SCATTER[n] || SCATTER[4]` and `Math.min(n, 10)`. A cell declaring
     `{arr:'scatter', n:8}` drew FOUR DOTS, in a tool whose whole subject
     is how many there are, and nothing errored. Every arrangement now
     generates for any n, and an arrangement that genuinely cannot show a
     count returns null so the caller can refuse rather than mislead.

     ⚠⚠ AND THE COUNTER CHANGED SIZE BETWEEN CELLS. `row` sized itself by
     bounding box (W = max(100, n*17) at r=7.5), so in `wodb-dots-1-twelve`
     — a grid asking a child to compare four representations of TWELVE —
     the row drew 23.5px counters beside the dice's 58px and filled 12% of
     its cell. Every arrangement now targets the SAME dot diameter, and a
     row longer than eight wraps instead of shrinking. */
  DOT_R: 11,

  _dotsSVG: function (arr, n, mini) {
    var col = this.INK, s = '', i, R = this.DOT_R;
    n = Math.max(0, Math.round(Number(n) || 0));
    if (!n) return null;

    if (arr === 'dice') {
      var pts = this.DICE[n];
      if (!pts) return this._dotsSVG('scatter', n, mini);   /* never a wrong count */
      for (i = 0; i < pts.length; i++) s += this._dot(pts[i][0], pts[i][1], R, col, mini);
      return this._fitDots('<svg class="wdb-dots" viewBox="0 0 100 100" aria-hidden="true">' + s + '</svg>', 100, R);
    }

    if (arr === 'row') {
      /* above eight, wrap to two rows: twelve counters strung across one
         line are not a row a five-year-old can count, and shrinking them
         to fit is what broke the comparison in the first place */
      var perRow = n > 8 ? Math.ceil(n / 2) : n;
      var rows = n > 8 ? 2 : 1;
      var step = R * 2.6;
      var W = perRow * step, H = rows * step;
      for (i = 0; i < n; i++) {
        var rr = Math.floor(i / perRow), cc = i % perRow;
        s += this._dot(step * (cc + 0.5), step * (rr + 0.5), R, col, mini);
      }
      return this._fitDots('<svg class="wdb-dots row' + (rows > 1 ? ' wrapped' : '') +
        '" viewBox="0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0) + '" aria-hidden="true">' + s + '</svg>', W, R);
    }

    if (arr === 'circle') {
      var ring = Math.max(30, Math.min(38, (n * R * 2.3) / (2 * Math.PI)));
      for (i = 0; i < n; i++) {
        var a = (i / n) * 2 * Math.PI - Math.PI / 2;
        s += this._dot(50 + ring * Math.cos(a), 50 + ring * Math.sin(a), R * 0.82, col, mini);
      }
      return this._fitDots('<svg class="wdb-dots" viewBox="0 0 100 100" aria-hidden="true">' + s + '</svg>', 100, R * 0.82);
    }

    if (arr === 'scatter') {
      /* ⚠ THE SHIPPED "SCATTER" WAS NOT SCATTERED. SCATTER[4] was two rows
         of two — a tilted quadrilateral sitting next to dice-4, whose own
         reason is "the dots make a square", while scatter's was "all
         jumbled up"; the two configurations rhymed. SCATTER[12] was a
         jittered 4x3 array. Generated instead: a deterministic
         dart-throw with a minimum separation, so it is genuinely
         irregular, different for every n, and identical on every render
         (no Math.random — a grid must look the same to the class as it
         did to the teacher who previewed it). */
      var P = this._scatterPts(n, R);
      for (i = 0; i < P.length; i++) s += this._dot(P[i][0], P[i][1], R * 0.78, col, mini);
      return this._fitDots('<svg class="wdb-dots" viewBox="0 0 100 100" aria-hidden="true">' + s + '</svg>', 100, R * 0.78);
    }

    /* tenframe: 5x2, fill top row first. ⚠ it cannot show more than ten,
       and quietly clamping was the third silent miscount. */
    if (n > 10) return this._dotsSVG('scatter', n, mini);
    var cw = 28, frows = 2, cols = 5, W2 = cols * cw + 4, H2 = frows * cw + 4;
    var sw = mini ? 5 : 3, iw = mini ? 4 : 2;
    s += '<rect x="2" y="2" width="' + (cols * cw) + '" height="' + (frows * cw) +
      '" fill="#FFFEFB" stroke="' + col + '" stroke-width="' + sw + '" rx="4"/>';
    for (i = 1; i < cols; i++) s += '<line x1="' + (2 + i * cw) + '" y1="2" x2="' + (2 + i * cw) +
      '" y2="' + (2 + frows * cw) + '" stroke="' + col + '" stroke-width="' + iw + '"/>';
    s += '<line x1="2" y1="' + (2 + cw) + '" x2="' + (2 + cols * cw) + '" y2="' + (2 + cw) +
      '" stroke="' + col + '" stroke-width="' + iw + '"/>';
    for (i = 0; i < n; i++) {
      var r0 = Math.floor(i / cols), c0 = i % cols;
      s += this._dot(2 + c0 * cw + cw / 2, 2 + r0 * cw + cw / 2, mini ? 11 : 10.2, col, mini);
    }
    return this._fitDots('<svg class="wdb-dots frame" viewBox="0 0 ' + W2 + ' ' + H2 +
      '" aria-hidden="true">' + s + '</svg>', W2, mini ? 11 : 10.2);
  },

  /* ⭐ THE COUNTER IS THE THING THAT MUST BE CONSTANT, NOT THE BOX.
     Each arrangement has its own viewBox width, so an identical dot
     RADIUS still rendered at different sizes once CSS scaled the box:
     measured in a 400px cell, dice 28.5px against row 20.3px. The width
     is therefore derived from the viewBox so that the dot always lands at
     TARGET_DOT of the cell, whatever the arrangement. Capped at 94% so a
     long row never touches the cell wall. */
  TARGET_DOT: 12,
  _fitDots: function (svg, vbW, r) {
    var pct = Math.min(94, (this.TARGET_DOT * vbW) / (2 * r));
    return svg.replace('<svg ', '<svg style="width:' + pct.toFixed(1) + '%" ');
  },

  /* deterministic irregular placement — a tiny LCG, so the same n always
     yields the same picture without Math.random */
  _scatterPts: function (n, R) {
    var seed = 9301 + n * 4931, out = [], tries = 0;
    var rnd = function () { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    var min = Math.max(R * 1.9, 42 / Math.sqrt(n + 2));
    while (out.length < n && tries < 4000) {
      tries++;
      var x = 12 + rnd() * 76, y = 12 + rnd() * 76, okp = true;
      for (var i = 0; i < out.length; i++) {
        var dx = out[i][0] - x, dy = out[i][1] - y;
        if (dx * dx + dy * dy < min * min) { okp = false; break; }
      }
      if (okp) out.push([x, y]);
      if (tries % 900 === 0) min *= 0.86;          /* relax rather than hang */
    }
    /* ⚠ never return fewer than asked — that would be a fourth silent
       miscount. If the relaxation still could not place them, fall back to
       a jittered grid, which is at least the right NUMBER. */
    while (out.length < n) {
      var k = out.length, cols2 = Math.ceil(Math.sqrt(n));
      out.push([14 + (k % cols2) * (72 / Math.max(1, cols2 - 1) || 0) + (rnd() - 0.5) * 6,
        14 + Math.floor(k / cols2) * (72 / Math.max(1, cols2 - 1) || 0) + (rnd() - 0.5) * 6]);
    }
    return out;
  },

  /* fresh static clock — protected clock-core untouched; the hand math
     is the standard hour = 30H + 0.5M, minute = 6M (degrees from 12) */
  /* ⚠⚠ THE DIAL USED TO CARRY FOUR NUMERALS, AND ONE OF ITS OWN REASONS
     NAMED A FIFTH. `wodb-clock-23-four` cell 4 is 4:45 and reads "It's the
     only one where the little hand is closer to the 5" — on a dial that
     drew only 12, 3, 6 and 9. The house's own learning-clock.js has
     shipped 60 ticks and all twelve numerals since it was built; this one
     never caught up. It also placed its "12" at baseline y=21 while the
     minute hand runs to y=12, so at every o'clock the hand struck through
     the numeral.
     ⚠ dominant-baseline is explicit: the SVG inherits the page font and
     without it the vertical placement is font-metric-dependent, so a
     fallback font shifts every numeral. */
  _clockSVG: function (h, m, mini) {
    var ink = this.INK, i, a;
    var s = '<circle cx="50" cy="50" r="45" fill="#FFFEFB" stroke="' + ink + '" stroke-width="' +
      (mini ? 6 : 3.4) + '"/>';

    if (mini) {
      /* a thumbnail is a DIFFERENT drawing, not a small one: at the real
         ~52px minicell the full dial's ticks land at 1.3px and its
         numerals at 4.6px, which photographs as mud. Four quarter marks
         and two fat hands still read as "a clock at about four". */
      for (i = 0; i < 4; i++) {
        a = i * Math.PI / 2;
        s += '<line x1="' + (50 + 30 * Math.sin(a)).toFixed(1) + '" y1="' + (50 - 30 * Math.cos(a)).toFixed(1) +
          '" x2="' + (50 + 41 * Math.sin(a)).toFixed(1) + '" y2="' + (50 - 41 * Math.cos(a)).toFixed(1) +
          '" stroke="' + ink + '" stroke-width="6" stroke-linecap="round"/>';
      }
      s += '<g transform="rotate(' + (30 * (h % 12) + 0.5 * m).toFixed(1) + ' 50 50)">' +
        '<line x1="50" y1="50" x2="50" y2="24" stroke="' + ink + '" stroke-width="13" stroke-linecap="round"/></g>';
      s += '<g transform="rotate(' + (6 * m).toFixed(1) + ' 50 50)">' +
        '<line x1="50" y1="50" x2="50" y2="10" stroke="' + ink + '" stroke-width="9" stroke-linecap="round"/></g>';
      s += '<circle cx="50" cy="50" r="7" fill="' + ink + '"/>';
      return '<svg class="wdb-clock" viewBox="0 0 100 100" aria-hidden="true">' + s + '</svg>';
    }

    /* 60 minute ticks in three weights, so the minute hand has something
       to point AT — which is what "the long hand points to the 3" means */
    for (i = 0; i < 60; i++) {
      a = i * Math.PI / 30;
      var hour = i % 5 === 0, quarter = i % 15 === 0;
      var r1 = quarter ? 36 : (hour ? 38 : 40.5), r2 = 43;
      s += '<line x1="' + (50 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (50 - r1 * Math.cos(a)).toFixed(1) +
        '" x2="' + (50 + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (50 - r2 * Math.cos(a)).toFixed(1) +
        '" stroke="' + ink + '" stroke-width="' + (quarter ? 3 : (hour ? 2.2 : 1.1)) +
        '" stroke-linecap="round" opacity="' + (hour ? 1 : 0.55) + '"/>';
    }
    /* all twelve, on a 30-unit ring so the hands clear them */
    for (i = 1; i <= 12; i++) {
      a = i * Math.PI / 6;
      s += '<text x="' + (50 + 30 * Math.sin(a)).toFixed(1) + '" y="' + (50 - 30 * Math.cos(a)).toFixed(1) +
        '" text-anchor="middle" dominant-baseline="central" font-family="' +
        'Baloo 2, Trebuchet MS, system-ui, sans-serif" font-size="9.5" font-weight="700" fill="' +
        ink + '">' + i + '</text>';
    }
    /* the two hands differ in LENGTH and WIDTH and SHAPE — never in
       colour, because a colour difference is exactly what a colour-blind
       child cannot use, and "the little hand" is a stated reason on two
       grids. The hour hand is a tapered blade, the minute a thin needle. */
    s += '<g transform="rotate(' + (30 * (h % 12) + 0.5 * m).toFixed(1) + ' 50 50)">' +
      '<path d="M46.6 50 L50 24 L53.4 50 Z" fill="' + ink + '"/></g>';
    s += '<g transform="rotate(' + (6 * m).toFixed(1) + ' 50 50)">' +
      '<path d="M48.3 50 L50 11 L51.7 50 Z" fill="' + ink + '"/></g>';
    s += '<circle cx="50" cy="50" r="3.4" fill="' + Wodb.UI.warm + '" stroke="' + ink + '" stroke-width="1.6"/>';
    return '<svg class="wdb-clock" viewBox="0 0 100 100" aria-hidden="true">' + s + '</svg>';
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('wdb-wide');
    if (!this.grids) return;

    var wrap = api.el('div', 'wdb-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    /* the entitlement class lives on the BODY, so the print rules — which
       fire on Ctrl+P with no chip involved — cannot disagree with the
       model about who is entitled */
    document.body.classList[this.premium ? 'add' : 'remove']('wdb-paid');
    /* ⚠⚠ THE DOCUMENT ITSELF HAD TO BE RELEASED, AND I ONLY FOUND IT BY
       LOOKING. lcs-shell.css:54 is `html,body{height:100%;overflow:hidden}`.
       Once the board became content-driven the app grew past the viewport
       and the <html> box CLIPPED it — measured at 1024 the app was 877px
       inside a 635px document, so the dock, and with it the Next-grid
       control this whole rebuild exists for, was unreachable on the
       standalone page. The embed hid it, because there the parent grows
       the iframe. Tool-scoped on documentElement; the shell is untouched. */
    document.documentElement.classList.add('wdb-html');

    if (this.building) { this._renderBuilder(wrap); return; }

    var g = this.current;
    if (!g) return;
    if (!this.premium && this._isFeatured(g)) this._seeFree(g.id);

    /* ⭐⭐ THE DOCTRINE LINE, ON THE STAGE. `strings.instruction` — "Four
       things, and every answer can be right!" — is authored in eleven
       locales, handed to the shell, and `lcs-shell.css:261` is
       `.lcs-app.embed .lcs-instruction{display:none}`. The tool page
       mounts with `&embed=1`. So the one sentence carrying the entire
       premise of the routine has never been seen by a teacher. It is
       true of every tool in the house; here it was fatal, because
       without it the grid is just four pictures and a child who picks
       "wrong" has no way to know there is no wrong. */
    wrap.appendChild(this._hintBand(g));

    /* the grid stage */
    var stageBox = api.el('div', 'wdb-stage');
    var grid = api.el('div', 'wdb-grid');
    if (this.revealMode) grid.classList.add('reveal-armed');
    this._gridEl = grid;
    var cells = g.cells || [];
    /* a group, so a screen reader hears the four as one thing */
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', this._loc(g.title) || api.t('title'));
    for (var i = 0; i < 4; i++) grid.appendChild(this._cellSlot(cells[i], i, g));
    stageBox.appendChild(grid);
    wrap.appendChild(stageBox);

    /* ⚠ the stem bar used to be min-height:0 at rest and 1.4em when
       shown, with the grid flexing above it — so THE WHOLE BOARD JUMPED
       the instant a child tapped the ear. The space is reserved. */
    var stembar = api.el('div', 'wdb-stembar');
    stembar.setAttribute('role', 'status');
    this._stembarEl = stembar;
    wrap.appendChild(stembar);

    /* ⭐ THE REVEAL NO LONGER COVERS THE EVIDENCE. The shipped band sat
       at bottom:0 with max-height:38%, i.e. over the lower 38% of the
       cell. Measured: a clock's SVG spans 18.5%-81.5% of its cell, so at
       4:30 the minute-hand tip lands at 73.9% — UNDER THE BAND — while
       the band says "It's the only one at half past". Dice-6 ink spans
       27.7%-72.3%, so a child could not count the dots the reason was
       about. And a board-legible reason needs ~54px, which wraps to five
       lines and 80% of the cell: the band was architecturally impossible
       as well as wrong. It is a ribbon under the board now, and a 2x2
       map when all four are out, so position carries the association. */
    if (this.revealMode) wrap.appendChild(this._revealArea(g));

    /* closing line */
    if (this.closingShown) {
      grid.classList.add('all-revealed');
      var cl = api.el('button', 'wdb-closing');
      cl.type = 'button';
      cl.textContent = api.t('closing');
      cl.setAttribute('aria-label', api.t('closing') + ' — ' + api.t('readAloud'));
      cl.addEventListener('click', function () { self._speak(api.t('closing')); });
      wrap.appendChild(cl);
    }

    wrap.appendChild(this._dock(g));
    this._paintHint(g);        /* the dock exists now, so the chip can be sized */
    this._bindKeys();
  },

  /* a describable name for one corner: POSITION first, because that is
     how a class refers to a corner out loud and it is what makes the
     reveal narratable. The shipped cells were <button> with an
     aria-hidden SVG or an alt="" image inside — a screen reader heard
     "button, not pressed" four times. */
  _cellName: function (cell, i) {
    var api = this.api, pos = api.t(this.POS_KEY[i] || 'posTL');
    var what = '';
    if (!cell) return pos;
    if (cell.t === 'num') what = String(cell.v);
    else if (cell.t === 'word') what = this._loc(cell.w) || '';
    else if (cell.t === 'shape') {
      /* ⚠⚠ THE ANSWER CHANNEL WAS INAUDIBLE, AND FIVE PANELS FOUND IT
         INDEPENDENTLY — which makes it a fix, not a note. Colour was
         removed as an answer because one child in twelve could not use
         it; `_cellName` then spoke only `fillOutline` and `sizeSmall`, so
         a solid, a hatched and a stippled hexagon all announced as "a
         hexagon". The replacement channel excluded a different child.
         Rotation was mute too, so "the only one turned on its point"
         could not be heard at all. */
      what = api.t('shape_' + cell.shape) || cell.shape;
      var fk = this.fillOf(cell);
      if (fk !== 'solid') what += ', ' + api.t('fill' + fk.charAt(0).toUpperCase() + fk.slice(1));
      if (cell.size === 'sm') what += ', ' + api.t('sizeSmall');
      if (cell.rot) what += ', ' + api.t('rotated');
    } else if (cell.t === 'dots') {
      /* ⚠ announce what was DRAWN, not what was declared. `_dotsSVG`
         falls back to a scatter for a dice count it has no face for and
         for a ten-frame over ten — so `{arr:'dice', n:11}` drew scattered
         dots and said "in a dice pattern". */
      var arr = this.renderedArr(cell.arr, cell.n);
      /* ⚠ "1 dots". Every panel flagged it; several said it is worse in
         their language than in mine. A singular key, never a "(s)" that a
         screen reader reads out as "open bracket ess close bracket". */
      what = this._fill(api.t(cell.n === 1 ? 'oneDot' : 'nDots'), { n: cell.n }) +
        ', ' + (api.t('arr_' + arr) || arr);
    } else if (cell.t === 'clock') {
      what = this._fill(api.t('clockTime'), { h: cell.h, m: (cell.m < 10 ? '0' : '') + cell.m });
    } else if (cell.t === 'img') {
      what = this._pwwWord(cell) || '';
    }
    return what ? (pos + ': ' + what) : pos;
  },
  _fill: function (tpl, vals) {
    var s = String(tpl || '');
    for (var k in vals) s = s.replace('{' + k + '}', vals[k]);
    return s;
  },

  /* ⚠ the cell and its ear are SIBLINGS. The shipped code appended a
     <button class="wdb-ear"> INSIDE the <button class="wdb-cell"> —
     invalid HTML, unreachable by keyboard, and the outer aria-pressed
     fought the inner control for assistive tech. Same defect on the
     library's delete span and the builder's pen. */
  _cellSlot: function (cell, i, g) {
    var api = this.api, self = this;
    var slot = api.el('div', 'wdb-slot');

    var el = api.el('button', 'wdb-cell');
    el.type = 'button';
    el.setAttribute('data-fk', 'cell:' + i);
    el.setAttribute('aria-pressed', this.lifted[i] ? 'true' : 'false');
    el.setAttribute('aria-label', this._cellName(cell, i));
    if (this.revealed[i]) el.classList.add('revealed');
    el.appendChild(this._cellContent(cell, false));

    var reasons = this.reasonListFor(g, i, api.lang);

    el.addEventListener('click', function () {
      if (self.revealMode) {
        if (!reasons.length) return;
        if (self.revealed[i]) { self._showReason(i); return; }
        self.revealed[i] = true;
        self.api.track('reason:reveal', { id: g.id, cell: i });
        var done = 0, k;
        for (k = 0; k < 4; k++) if (self.revealed[k]) done++;
        if (done >= self.reasonedCount(g, api.lang) && !self.closingShown) self.closingShown = true;
        self.render();
        self._showReason(i);
        return;
      }
      /* multi-lift: up to all four, identical styling — four equal claims */
      self.lifted[i] = !self.lifted[i];
      if (!self.lifted[i]) delete self.lifted[i];
      el.setAttribute('aria-pressed', self.lifted[i] ? 'true' : 'false');
      /* aria-pressed reads as "toggle"; the announcement carries the
         MEANING, which is emphatically not correctness */
      api.announce(self._cellName(cell, i) + ' — ' +
        api.t(self.lifted[i] ? 'chosenToTalk' : 'noLongerChosen'));
      self._paintHint();
    });
    slot.appendChild(el);

    /* the ear — a sibling, and it no longer requires a lift. A child who
       is not ready to choose could not reach the sentence frames at all,
       which is exactly backwards for the children they exist for. */
    var ear = api.el('button', 'wdb-ear');
    ear.type = 'button';
    ear.setAttribute('data-fk', 'ear:' + i);
    /* ⚠ the shipped label was hard-wired to stem1 while _stemIdx cycled
       all three, so it announced one frame and spoke another */
    /* ⚠ ALL FOUR SPEAKERS SHARED ONE NAME. A screen-reader user heard
       "Hear a sentence starter, button" four times with nothing to tell
       them apart — in a routine whose whole vocabulary is which CORNER
       you mean. */
    ear.setAttribute('aria-label', api.t('hearStem') + ' — ' + api.t(this.POS_KEY[i]));
    /* ⚠⚠ IT DREW A LOUDSPEAKER AND EVERY SURFACE CALLED IT AN EAR.
       The class is `.wdb-ear`, the file header has said "the ear icon
       speaks sentence stems" since the tool was built, and six of the
       eleven native panels independently wrote "tap the ear" — while the
       glyph was a speaker cone with two sound arcs. The French, German,
       Portuguese, Danish and Dutch panels each reported it as a child
       being sent to hunt for a body part that is not on screen; it is the
       #41 "fourth named part" defect. The DRAWING was the outlier, so the
       drawing changed: an ear, with the two arcs kept as the listening
       cue. */
    ear.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 20.5c0-2-1-2.6-1.9-3.6C5.3 15.5 4.5 13.9 4.5 11.5a6 6 0 0 1 12 0c0 2-1.4 3-2.8 3.4-1 .3-1.7.8-1.7 1.9 0 1.2-.9 2-2 2a1.6 1.6 0 0 1-1.5-1.1" fill="currentColor" fill-opacity=".14"/><path d="M8.6 11.2a2.9 2.9 0 0 1 5.8 0c0 1.4-1.1 2-1.9 2.5" /><path d="M19.2 8.2a7.5 7.5 0 0 1 0 7.6"/></svg>';
    ear.addEventListener('click', function (e) {
      e.stopPropagation();
      var stems = ['stem1', 'stem2', 'stem3'];
      var text = api.t(stems[self._stemIdx % 3]);
      self._stemIdx++;
      if (self._stembarEl) { self._stembarEl.textContent = text; self._stembarEl.classList.add('show'); }
      ear.classList.add('speaking');
      el.classList.add('speaking');
      self._speak(text);
      api.track('stem:speak', {});
      setTimeout(function () { ear.classList.remove('speaking'); el.classList.remove('speaking'); }, 2600);
    });
    slot.appendChild(ear);
    return slot;
  },

  /* one reason into the ribbon, spoken. Nothing ever covers a cell. */
  _showReason: function (i) {
    var g = this.current, list = this.reasonListFor(g, i, this.api.lang);
    if (!list.length) return;
    var txt = list[0];
    /* ⚠⚠ THE RIBBON GOES STALE THE MOMENT THE MAP REPLACES IT.
       `_revealArea` only creates a ribbon while fewer than two cards are
       out; from the second reveal onward `_ribbonEl` points at a node
       `stage.innerHTML=''` already destroyed, so this string rendered
       once per grid and never again. The English panel found it by
       reading the model — it is invisible to every gate, because the
       reveal still WORKS: the map shows the text and only the spoken
       ribbon silently stopped. Re-resolve against the live DOM. */
    if (!this._ribbonEl || !this._ribbonEl.isConnected) {
      this._ribbonEl = this._wrap && this._wrap.querySelector('.wdb-ribbon');
    }
    if (this._ribbonEl) {
      this._ribbonEl.textContent = this._fill(this.api.t('reasonFrom'),
        { pos: this.api.t(this.POS_KEY[i]), reason: txt });
      this._ribbonEl.classList.add('show');
    }
    this._speak(txt);
  },

  _reasonFor: function (g, i) {
    var l = this.reasonListFor(g, i, this.api ? this.api.lang : 'en');
    return l.length ? l[0] : null;
  },

  /* ── the hint ladder: what is on the board decides what it says ──
     Modelled on lids._buildHint. Every rung is guarded on real state, so
     it can never instruct a move the model would refuse. */
  _hintBand: function (g) {
    var api = this.api;
    var band = api.el('div', 'wdb-hint');
    var l1 = api.el('div', 'wdb-doctrine');
    var l2 = api.el('div', 'wdb-invite');
    l1.textContent = api.t('doctrine');
    band.appendChild(l1); band.appendChild(l2);
    this._hintEl = l2;
    this._paintHint(g);
    return band;
  },
  _paintHint: function (g) {
    var api = this.api, acted = 0, lifted = 0, i;
    for (i = 0; i < 4; i++) {
      if (this.lifted[i]) lifted++;
      if (this.lifted[i] || this.revealed[i]) acted++;
    }
    if (this._hintEl) {
      var key;
      if (this.closingShown) key = 'closing';
      else if (this.revealMode) key = 'revealHint';
      else if (lifted) key = 'stemPrompt';
      else key = 'invite';
      this._hintEl.textContent = api.t(key);
    }
    /* the closing move becomes available the moment ANYTHING has happened
       — it used to wait for all four cards to be turned over, so a
       teacher who revealed two and moved on never reached the one line
       the whole tool exists to deliver */
    if (this._closeChip) {
      this._closeChip.style.display = (acted && !this.closingShown) ? '' : 'none';
    }
  },

  /* ── the reveal area: a ribbon for one, a 2x2 map once several are out ── */
  _revealArea: function (g) {
    var api = this.api;
    var host = api.el('div', 'wdb-revealarea');
    var done = 0, i;
    for (i = 0; i < 4; i++) if (this.revealed[i]) done++;

    if (done >= 2) {
      /* the map mirrors the board's own arrangement, so POSITION carries
         the association and no connector lines are needed */
      var map = api.el('div', 'wdb-reasonmap');
      for (i = 0; i < 4; i++) {
        var card = api.el('div', 'wdb-reasoncard' + (this.revealed[i] ? ' out' : ''));
        var list = this.reasonListFor(g, i, api.lang);
        var head = api.el('div', 'wdb-reasonpos');
        head.textContent = api.t(this.POS_KEY[i]);
        var body = api.el('div', 'wdb-reasontext');
        body.textContent = this.revealed[i] ? (list[0] || '') : '';
        card.appendChild(head); card.appendChild(body);
        /* every OTHER way to see it, under the first. A corner has two to
           four defensible reasons; showing one as THE reason is a soft
           verdict in a tool built to have none. */
        if (this.revealed[i] && list.length > 1) {
          var alt = api.el('div', 'wdb-reasonalt');
          alt.textContent = api.t('anotherWay') + ' ' + list.slice(1).join(' ');
          card.appendChild(alt);
        }
        map.appendChild(card);
      }
      host.appendChild(map);
    } else {
      var ribbon = api.el('div', 'wdb-ribbon');
      ribbon.setAttribute('role', 'status');
      ribbon.textContent = api.t('revealHint');
      this._ribbonEl = ribbon;
      host.appendChild(ribbon);
    }
    return host;
  },

  /* ⭐ THE TARGET USER IS A TEACHER AT THE BACK OF THE ROOM WITH A
     PRESENTER CLICKER, and a remote sends Right/Left or PageDown/PageUp.
     Those ARE the next-grid controls; without them the tool cannot be
     driven from where it is actually used. */
  _bindKeys: function () {
    if (this._keysBound) return;
    this._keysBound = true;
    var self = this;
    document.addEventListener('keydown', function (e) {
      if (self.building) return;
      var t = e.target || {};
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
      if (self._pickerEl) {                       /* topmost layer first */
        if (e.key === 'Escape') { e.preventDefault(); self._closePicker(); }
        return;
      }
      if (self._panelEl && self._panelEl.classList.contains('open')) {
        if (e.key === 'Escape') { e.preventDefault(); self._closePanel(); }
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); self._advance(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); self._retreat(); }
      else if (e.key === 'r' || e.key === 'R') { e.preventDefault(); self._toggleReasons(); }
    });
  },

  _toggleReasons: function () {
    if (!this._hasReasons(this.current)) return;
    this.revealMode = !this.revealMode;
    if (!this.revealMode) { this.revealed = {}; this.closingShown = false; }
    this.api.track('reasons:' + (this.revealMode ? 'show' : 'hide'), { id: this.current.id });
    this.render();
  },
  /* ⚠⚠ THE LABEL AND THE BEHAVIOUR MUST BE THE SAME FUNCTION.
     The Spanish panel read the model and found that `_dock` chose the
     chip's label from `_deckHasNext()` alone while `_advance` ALSO
     branched on `premium` — so a paying teacher on the last grid of a
     band pressed a chip reading "Turn it", wearing a rotate icon, and
     got an end-of-band card instead. One button, two behaviours, one
     label. Both now ask the same question. */
  _advanceKind: function () {
    if (this._deckHasNext()) return 'next';
    return this.premium ? 'end' : 'turn';
  },
  _advance: function () {
    var k = this._advanceKind();
    if (k === 'next') { this._step(1); return; }
    if (k === 'turn') { this._turnIt(); return; }
    this._showEndOfBand();
  },
  _retreat: function () { this._step(-1); },
  _deckHasNext: function () {
    var d = this._deck(), i = this._deckPos();
    return i >= 0 && i < d.length - 1;
  },
  _showEndOfBand: function () {
    var api = this.api, self = this, bi = this.BANDS.indexOf(this._band());
    var host = this._wrap.querySelector('.wdb-dock');
    if (!host) return;
    var old = this._wrap.querySelector('.wdb-endband');
    if (old) old.parentNode.removeChild(old);
    var box = api.el('div', 'wdb-endband');
    var line = api.el('div', 'wdb-endline');
    /* ⚠ THE LABEL MUST DESCRIBE THE DECK THAT ACTUALLY RAN OUT. `_deck()`
       returns the teacher's OWN grids when the current one is theirs, but
       this line read the band SETTING — so a teacher at the end of three
       saved grids was told "that is all 3 in Ages 4-6", about grids that
       are in no band at all. Four panels reported it independently. */
    var mine = !!(this.current && this.current.mine);
    line.textContent = this._fill(api.t(mine ? 'endOfMine' : 'endOfBand'),
      { n: this._deck().length, band: api.t(this.BAND_KEY[this._band()]) });
    box.appendChild(line);
    var row = api.el('div', 'wdb-chiprow');
    var again = api.el('button', 'wdb-chip');
    again.type = 'button';
    again.textContent = api.t('startSetAgain');
    again.addEventListener('click', function () {
      /* ⚠ `byId` holds only the CURATED grids, so on a saved-grid deck
         this set `current` to undefined and render() returned on a blank
         stage — the Portuguese panel traced it. Resolve from both. */
      var g0 = self._gridById(self._deck()[0]);
      if (g0) self._setGrid(g0);
    });
    row.appendChild(again);
    /* a teacher inside their own grids has no "next band" to go to */
    if (!mine && bi >= 0 && bi < this.BANDS.length - 1) {
      var nxt = api.el('button', 'wdb-chip teal');
      nxt.type = 'button';
      nxt.textContent = this._fill(api.t('goToBand'),
        { band: api.t(this.BAND_KEY[this.BANDS[bi + 1]]) });
      nxt.addEventListener('click', function () {
        api.settings.band = self.BANDS[bi + 1];
        self._saveStore();
        var g0 = self._gridById(self._deck()[0]);
        if (g0) self._setGrid(g0); else self.render();
      });
      row.appendChild(nxt);
    }
    box.appendChild(row);
    host.insertAdjacentElement('beforebegin', box);
    api.announce(line.textContent);
  },

  _dock: function (g) {
    var api = this.api, self = this;
    var dock = api.el('div', 'wdb-dock');

    /* ⚠ the shipped chip showed "This week's grid" INSTEAD of the title,
       so the free user's one playable grid was the one grid with no
       description. Badge AND title, with the deck position beside them. */
    var name = api.el('div', 'wdb-namechip');
    var lbl = api.el('span', 'wdb-namelbl');
    var deck = this._deck(), pos = this._deckPos();
    lbl.textContent = this._isFeatured(g) ? api.t('thisWeek')
      : (pos >= 0 && deck.length > 1
        ? api.t(this.BAND_KEY[this._band()]) + ' · ' + (pos + 1) + '/' + deck.length
        : api.t(this.BAND_KEY[this.bandOf(g)]));
    var ttl = api.el('span', 'wdb-nametitle');
    ttl.textContent = this._loc(g.title) || g.title || api.t('myGridDefault');
    name.appendChild(lbl); name.appendChild(ttl);
    dock.appendChild(name);

    var row = api.el('div', 'wdb-chiprow');

    /* ⚠ the whole reveal block used to VANISH when a grid had no reasons,
       silently reordering every chip beside it. The slot is kept and
       disabled instead, so a teacher's muscle memory holds. */
    var rev = api.el('button', 'wdb-chip primary' + (this.revealMode ? ' active' : ''));
    rev.type = 'button';
    rev.setAttribute('data-fk', 'reasons');
    rev.textContent = api.t(this.revealMode ? 'hideReasons' : 'showReasons');
    if (!this._hasReasons(g)) { rev.disabled = true; rev.title = api.t('noReasonsYet'); }
    rev.addEventListener('click', function () { self._toggleReasons(); });
    row.appendChild(rev);

    /* ⚠ promoted from a 13px underlined link — 5 arcmin from the back of
       a classroom, which is neither readable nor hittable */
    if (this.revealMode && this._hasReasons(g)) {
      var revealedN = 0, k;
      for (k = 0; k < 4; k++) if (this.revealed[k]) revealedN++;
      if (revealedN < this.reasonedCount(g, api.lang)) {
        var all = api.el('button', 'wdb-chip');
        all.type = 'button';
        all.setAttribute('data-fk', 'revealall');
        all.textContent = api.t('revealAll');
        all.addEventListener('click', function () {
          self.revealed = { 0: true, 1: true, 2: true, 3: true };
          self.closingShown = true;
          self.api.track('reasons:all', { id: g.id });
          self.render();
        });
        row.appendChild(all);
      }
    }

    /* ⚠ the closing move used to require all four cards turned over, and
       the count was a hard 4 — so a teacher who revealed two and moved on
       never reached the payoff, and a custom grid with two reasons could
       never reach it at all. Available as soon as anything has happened. */
    /* ⚠ BUILT ALWAYS, SHOWN CONDITIONALLY. Lifting a cell deliberately
       does NOT re-render — a re-render would kill the lift transition and
       throw keyboard focus — so a chip that only existed at render time
       could never appear in response to the very act that earns it. It is
       in the DOM from the start and _paintHint reveals it. */
    var close = api.el('button', 'wdb-chip honey');
    close.type = 'button';
    close.setAttribute('data-fk', 'closing');
    close.textContent = api.t('closing');
    close.addEventListener('click', function () {
      self.closingShown = true;
      self.api.track('closing', { id: g.id });
      self.render();
      self._speak(api.t('closing'));
    });
    this._closeChip = close;
    row.appendChild(close);

    var again = api.el('button', 'wdb-chip');
    again.type = 'button';
    again.setAttribute('data-fk', 'again');
    again.textContent = api.t('startAgain');
    again.addEventListener('click', function () { self._resetRitual(); self.render(); });
    row.appendChild(again);

    /* ── the navigation the operator asked for ──────────────────────
       A teacher finishing a grid had to discover that "Grid library"
       opens a modal and then hunt for a tile. The move that ends every
       WODB is "next one", and it had no button at all. */
    var nav = api.el('div', 'wdb-nav');
    var prev = api.el('button', 'wdb-chip small');
    prev.type = 'button';
    prev.setAttribute('data-fk', 'prev');
    prev.setAttribute('aria-label', api.t('prevGrid'));
    prev.title = api.t('prevGrid');
    prev.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5 L8 12 L15 19"/></svg>';
    /* never wraps backwards: over-tapping Next and losing the grid the
       class is mid-argument on is the commonest live-lesson accident */
    prev.disabled = this._deckPos() <= 0;
    prev.addEventListener('click', function () { self._retreat(); });
    nav.appendChild(prev);

    var next = api.el('button', 'wdb-chip go');
    next.type = 'button';
    next.setAttribute('data-fk', 'next');
    /* ⭐ FREE GETS A REAL CONTROL, NOT A PAYWALL WEARING A PRIMARY BUTTON.
       A chip on a classroom board whose only function is to sell is
       refused. "Turn it" rotates the four corners — same content, new
       positions — and it is genuinely good practice, because position is
       not meaning and a class that anchored on "the top-left one" has to
       look again. */
    var canNext = this._deckHasNext();
    var label = api.el('span');
    label.textContent = canNext ? api.t('nextGrid') : api.t('turnIt');
    next.appendChild(label);
    next.insertAdjacentHTML('beforeend', canNext
      ? ' <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5 L16 12 L9 19"/></svg>'
      : ' <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/></svg>');
    next.addEventListener('click', function () { self._advance(); });
    nav.appendChild(next);
    row.appendChild(nav);

    var lib = api.el('button', 'wdb-chip teal');
    lib.type = 'button';
    lib.setAttribute('data-fk', 'library');
    lib.textContent = api.t('library');
    lib.addEventListener('click', function () { self._openPanel(); });
    row.appendChild(lib);

    dock.appendChild(row);

    /* one quiet, permanent, honest line for the free tier — better than a
       gate that flashes for twelve seconds and is missed. `Build your own`
       moved into the library panel head: nobody builds a grid in front of
       a live class, and it was occupying prime dock space. */
    if (!this.premium) {
      var note = api.el('div', 'wdb-freenote');
      var nt = api.el('span');
      nt.textContent = api.t('freeNote');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-wodb';
      a.target = '_blank'; a.rel = 'noopener';
      a.textContent = api.t('unlock');
      note.appendChild(nt); note.appendChild(a);
      dock.appendChild(note);
    }
    return dock;
  },

  _resetRitual: function () {
    this.lifted = {};
    this.revealed = {};
    this.revealMode = false;
    this.closingShown = false;
    this._stemIdx = 0;
  },

  _setGrid: function (g) {
    this.current = g;
    this._resetRitual();
    this.render();
  },

  /* ================== THE PRINT SHEET (paid) =======================
     ⚠⚠ TWO LOCKS, NOT ONE. #40 and #41 each shipped a Print chip calling
     window.print() with no @media print block at all, so they printed the
     whole web page — and the generic liveness gate scores that green,
     because window.print fires either way. And `lids` shipped with only
     the CHIP gated, so Ctrl+P handed a free visitor the paid sheet: the
     subtree is absent unless entitled AND every print rule is scoped to
     body.wdb-paid.

     ⚠⚠ IT IS LINE ART, NOT A GREYSCALE SCREENSHOT. Chrome ships
     "Background graphics" OFF for a great many teachers, so anything
     carried by a fill comes out blank. Shapes print as outlines and the
     FILL becomes a hatch — which is what preserves "the only one not
     coloured in" on paper, where a straight outline-everything
     conversion would destroy it. Dots print as OPEN RINGS: solid discs
     are toner x25 and two close ones photocopy into one blob.

     ⚠⚠ AND IT IS A PURE FUNCTION OF `cells`. It never reads `lifted`,
     `revealed` or `closingShown`, and it never prints a reason — which
     is what makes an answer key structurally impossible on a sheet for a
     routine that may not have one. */
  _ensureSheet: function () {
    if (!this.premium || !this._wrap) return null;
    var api = this.api, g = this.current;
    if (!g) return null;
    var old = document.querySelector('.wdb-sheet');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var sheet = api.el('div', 'wdb-sheet');

    /* page 1 — the talk record. The four boxes are labelled by POSITION
       WORDS, never A/B/C/D, which would imply an order, and it doubles as
       positional-language practice. */
    var p1 = api.el('div', 'wdb-page');
    var h = api.el('div', 'wdb-p-head');
    h.textContent = api.t('title');
    var doc = api.el('div', 'wdb-p-doctrine');
    doc.textContent = api.t('doctrine');
    p1.appendChild(h); p1.appendChild(doc);
    var pg = api.el('div', 'wdb-p-grid');
    for (var i = 0; i < 4; i++) {
      var c = api.el('div', 'wdb-p-cell');
      c.innerHTML = this._printCell((g.cells || [])[i]);
      pg.appendChild(c);
    }
    p1.appendChild(pg);
    var lines = api.el('div', 'wdb-p-lines');
    for (i = 0; i < 4; i++) {
      var row = api.el('div', 'wdb-p-row');
      var pos = api.el('span', 'wdb-p-pos');
      pos.textContent = api.t(this.POS_KEY[i]);
      var rule = api.el('span', 'wdb-p-rule');
      rule.textContent = api.t('printChildLine');
      row.appendChild(pos); row.appendChild(rule);
      lines.appendChild(row);
    }
    /* the line that makes the paper worth printing: it turns "every
       answer can be right" from something the teacher SAYS into
       something the child DOES. */
    var others = api.el('div', 'wdb-p-others');
    others.textContent = api.t('printOthers');
    lines.appendChild(others);
    p1.appendChild(lines);
    sheet.appendChild(p1);

    /* page 2 — make your own. The guidance string is already authored in
       eleven locales and, until now, only ever appeared inside the
       premium builder. Constructing a WODB is far harder and far more
       valuable than solving one, and this page costs nothing. */
    var p2 = api.el('div', 'wdb-page');
    var h2 = api.el('div', 'wdb-p-head');
    h2.textContent = api.t('printMakeOwn');
    var g2 = api.el('div', 'wdb-p-grid');
    for (i = 0; i < 4; i++) g2.appendChild(api.el('div', 'wdb-p-cell empty'));
    var gd = api.el('div', 'wdb-p-guide');
    gd.textContent = api.t('guidance');
    p2.appendChild(h2); p2.appendChild(g2); p2.appendChild(gd);
    sheet.appendChild(p2);

    document.querySelector('.lcs-app').appendChild(sheet);
    return sheet;
  },

  /* outline-only, hatch-for-fill, open rings — see the docblock above */
  _printCell: function (cell) {
    if (!cell) return '';
    var B = '#000';
    if (cell.t === 'num') return '<span class="wdb-p-num">' + String(cell.v) + '</span>';
    if (cell.t === 'word') return '<span class="wdb-p-word">' + (this._loc(cell.w) || '') + '</span>';
    if (cell.t === 'shape') {
      var S = this.SHAPES[cell.shape] || this.SHAPES.circle;
      var k = (cell.size === 'sm' ? 0.62 : (cell.size === 'md' ? 0.82 : 1)) * S.k;
      var fk = cell.fill;
      if (!fk || fk === 'filled') fk = 'solid';
      if (fk === 'solid' && cell.color && this.LEGACY_FILL[cell.color]) fk = this.LEGACY_FILL[cell.color];
      var pid = 'wdbpp' + (this._pp = (this._pp || 0) + 1);
      var defs = '', paint = 'none';
      if (fk !== 'outline') {
        var b = fk === 'stipple' ? '<circle cx="4" cy="4" r="1.2" fill="' + B + '"/>'
          : (fk === 'hatch' ? '<path d="M0 8 L8 0 M-2 2 L2 -2 M6 10 L10 6" stroke="' + B + '" stroke-width="1"/>'
            : '<path d="M0 8 L8 0" stroke="' + B + '" stroke-width="0.9"/>');
        defs = '<defs><pattern id="' + pid + '" width="8" height="8" patternUnits="userSpaceOnUse">' + b + '</pattern></defs>';
        paint = 'url(#' + pid + ')';
      }
      var tf = [];
      if (cell.rot) tf.push('rotate(' + cell.rot + ' ' + S.a[0] + ' ' + S.a[1] + ')');
      if (k !== 1) tf.push('translate(' + (S.a[0] - S.a[0] * k).toFixed(2) + ' ' +
        (S.a[1] - S.a[1] * k).toFixed(2) + ') scale(' + k.toFixed(3) + ')');
      var inner = '<path d="' + S.d + '" fill="' + paint + '" stroke="' + B + '" stroke-width="1.6"/>';
      return '<svg viewBox="0 0 100 100" overflow="visible">' + defs +
        (tf.length ? '<g transform="' + tf.join(' ') + '">' + inner + '</g>' : inner) + '</svg>';
    }
    if (cell.t === 'dots' || cell.t === 'clock') {
      var svg = cell.t === 'dots' ? this._dotsSVG(cell.arr, cell.n, false) : this._clockSVG(cell.h, cell.m, false);
      if (!svg) return '';
      /* solid discs -> open rings; every ink -> black; drop the highlight */
      return svg
        .replace(/<circle ([^>]*?)fill="#146B5E"\/>/g, '<circle $1fill="none" stroke="#000" stroke-width="1.4"/>')
        .replace(/<circle [^>]*opacity="0\.30"[^>]*\/>/g, '')
        .replace(/#146B5E/g, '#000')
        .replace(new RegExp(this.UI.warm, 'g'), '#fff');
    }
    /* ⚠ photos do NOT print: a 1x webp at 78mm is about 81dpi and a
       mid-tone illustration photocopies to a blob. The word plus a box to
       draw it in is a better artefact than a grey smudge. */
    if (cell.t === 'img') {
      var w = this._pwwWord(cell) || '';
      return '<span class="wdb-p-word">' + w + '</span><span class="wdb-p-draw"></span>';
    }
    return '';
  },

  _print: function () {
    if (!this.premium) { this._gateInline(this._wrap.querySelector('.wdb-dock'), 'gatePrint'); return; }
    this._ensureSheet();
    this.api.track('print', { id: this.current && this.current.id });
    try { window.print(); } catch (e) { /* no printer in a headless gate */ }
  },

  _gateInline: function (host, key) {
    var api = this.api;
    var old = this._wrap.querySelector('.wdb-gate');
    if (old) old.remove();
    var g = api.el('div', 'wdb-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-wodb';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  /* ======================= library panel =========================== */

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
    var scrim = api.el('div', 'wdb-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'wdb-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('library'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },
  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';
    var head = api.el('div', 'wdb-panel-head');
    var h = api.el('div', 'wdb-panel-title');
    h.textContent = api.t('library');
    var x = api.el('button', 'wdb-panel-close');
    x.type = 'button';
    x.setAttribute('aria-label', api.t('close'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePanel(); });

    /* ⚠ BOTH OF THESE MOVED OUT OF THE DOCK. Nobody builds a grid in
       front of a live class, and a Print chip beside "Next grid" is a
       mis-tap that fires a print dialog over a lesson. They belong where
       a teacher already is when they think "I want one about vehicles":
       here, in the library. */
    var acts = api.el('div', 'wdb-panel-acts');
    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

    var build = api.el('button', 'wdb-chip teal' + (this.premium ? '' : ' locked'));
    build.type = 'button';
    build.textContent = api.t('build');
    if (!this.premium) build.insertAdjacentHTML('beforeend', lock);
    build.addEventListener('click', function () {
      if (!self.premium) { self._panelGate('gateBuilder'); return; }
      self._closePanel();
      self._startBuilder();
    });
    acts.appendChild(build);

    var pr = api.el('button', 'wdb-chip' + (this.premium ? '' : ' locked'));
    pr.type = 'button';
    pr.textContent = api.t('printSheet');
    if (!this.premium) pr.insertAdjacentHTML('beforeend', lock);
    pr.addEventListener('click', function () {
      if (!self.premium) { self._panelGate('gatePrint'); return; }
      self._closePanel();
      self._print();
    });
    acts.appendChild(pr);

    head.append(h, acts, x);
    panel.appendChild(head);

    var body = api.el('div', 'wdb-panel-body');

    /* My grids (premium) */
    if (this.premium && this._store.savedGrids.length) {
      var lbl0 = api.el('div', 'wdb-bandlbl');
      lbl0.textContent = api.t('myGrids');
      body.appendChild(lbl0);
      var tiles0 = api.el('div', 'wdb-tiles');
      this._store.savedGrids.forEach(function (g) {
        tiles0.appendChild(self._tileEl(g, false, true));
      });
      body.appendChild(tiles0);
    }

    /* curated bands — the whole library is VISIBLE to free (soft-locked) */
    ['K', 'G1', 'G23'].forEach(function (band) {
      var lbl = api.el('div', 'wdb-bandlbl');
      lbl.textContent = api.t(self.BAND_KEY[band]);
      body.appendChild(lbl);
      var tiles = api.el('div', 'wdb-tiles');
      self.grids.grids.filter(function (g) { return g.band === band; }).forEach(function (g) {
        /* every free grid the teacher has ever been given stays open */
        var locked = !self._canOpen(g);
        tiles.appendChild(self._tileEl(g, locked, false));
      });
      body.appendChild(tiles);
    });
    panel.appendChild(body);
  },
  _tileEl: function (g, locked, mine) {
    var api = this.api, self = this;
    var tile = api.el('button', 'wdb-tile' + (locked ? ' locked' : '') + (this.current && this.current.id === g.id ? ' active' : ''));
    tile.type = 'button';
    var minigrid = api.el('div', 'wdb-mini');
    (g.cells || []).forEach(function (c) {
      var mc = api.el('div', 'wdb-minicell');
      mc.appendChild(self._cellContent(c, true));
      minigrid.appendChild(mc);
    });
    tile.appendChild(minigrid);
    if (locked) tile.insertAdjacentHTML('beforeend', '<span class="wdb-lock"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span>');
    var nm = api.el('div', 'wdb-tilename');
    nm.textContent = this._isFeatured(g) && !mine ? api.t('thisWeek') : (this._loc(g.title) || g.title || api.t('myGridDefault'));
    tile.appendChild(nm);
    if (mine) {
      var del = api.el('span', 'wdb-tiledel');
      del.textContent = api.t('deleteBtn');
      del.addEventListener('click', function (e) {
        e.stopPropagation();
        self._store.savedGrids = self._store.savedGrids.filter(function (x) { return x.id !== g.id; });
        self._saveStore();
        if (self.current && self.current.id === g.id) self.current = self._featuredGrid();
        self._renderPanel();
        self.render();
      });
      tile.appendChild(del);
    }
    tile.addEventListener('click', function () {
      /* ⚠ THE GATE NO LONGER CLOSES THE PANEL. It used to shut the
         library and flash a band under the dock — so a teacher scanning
         twenty-one tiles lost their place to find out that one of them
         was locked. The gate now pins under the panel head and the list
         stays exactly where it was. */
      if (locked) { self._panelGate('gateLibrary'); return; }
      self._closePanel();
      self._setGrid(g);
      self.api.track('grid:open', { id: g.id, from: 'library' });
    });
    return tile;
  },

  _panelGate: function (key) {
    var api = this.api, panel = this._panelEl;
    if (!panel) return;
    var old = panel.querySelector('.wdb-gate');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var box = api.el('div', 'wdb-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-wodb';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    box.append(txt, a);
    var body = panel.querySelector('.wdb-panel-body');
    if (body) body.insertAdjacentElement('beforebegin', box); else panel.appendChild(box);
  },

  /* ========================== the builder ========================== */

  _startBuilder: function () {
    this.building = true;
    this._draft = { cells: [null, null, null, null], reasons: ['', '', '', ''], title: '' };
    this._resetRitual();
    this._loadPwwIndex();
    this.render();
  },
  _loadPwwIndex: function () {
    var self = this;
    if (this._pwwIndex) return Promise.resolve(this._pwwIndex);
    return fetch('/mini-tools/pww-index-' + this.api.lang + '.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : fetch('/mini-tools/pww-index-en.json', { cache: 'no-cache' }).then(function (r2) { return r2.json(); }); })
      .then(function (j) { self._pwwIndex = j; return j; })
      .catch(function () { return null; });
  },

  _renderBuilder: function (wrap) {
    var api = this.api, self = this;
    var d = this._draft;

    var stageBox = api.el('div', 'wdb-stage');
    var grid = api.el('div', 'wdb-grid building');
    for (var i = 0; i < 4; i++) {
      (function (idx) {
        var cell = d.cells[idx];
        var el = api.el('button', 'wdb-cell' + (cell ? '' : ' empty'));
        el.type = 'button';
        if (cell) {
          el.appendChild(self._cellContent(cell, false));
          var pen = api.el('span', 'wdb-pen');
          pen.textContent = '✎';
          pen.title = api.t('addReason');
          pen.addEventListener('click', function (e) { e.stopPropagation(); self._reasonEditIdx = self._reasonEditIdx === idx ? null : idx; self.render(); });
          el.appendChild(pen);
        } else {
          var plus = api.el('span', 'wdb-plus');
          plus.textContent = '+';
          el.appendChild(plus);
        }
        el.addEventListener('click', function () { self._openPicker(idx); });
        grid.appendChild(el);
      }(i));
    }
    stageBox.appendChild(grid);
    wrap.appendChild(stageBox);

    if (this._reasonEditIdx != null && d.cells[this._reasonEditIdx]) {
      var rrow = api.el('div', 'wdb-reasonrow');
      var rin = document.createElement('input');
      rin.className = 'wdb-reasoninput';
      rin.type = 'text';
      rin.maxLength = 90;
      rin.placeholder = api.t('reasonPh');
      rin.value = d.reasons[this._reasonEditIdx] || '';
      rin.addEventListener('input', function () { d.reasons[self._reasonEditIdx] = rin.value; });
      rrow.appendChild(rin);
      wrap.appendChild(rrow);
      setTimeout(function () { rin.focus(); }, 50);
    }

    var guide = api.el('p', 'wdb-guide');
    guide.textContent = api.t('guidance');
    wrap.appendChild(guide);

    var dock = api.el('div', 'wdb-dock');
    var row = api.el('div', 'wdb-chiprow');
    var nameIn = document.createElement('input');
    nameIn.className = 'wdb-nameinput';
    nameIn.type = 'text';
    nameIn.maxLength = 40;
    nameIn.placeholder = api.t('gridName');
    nameIn.value = d.title;
    nameIn.addEventListener('input', function () { d.title = nameIn.value; });
    row.appendChild(nameIn);
    var save = api.el('button', 'wdb-big coral');
    save.type = 'button';
    save.textContent = api.t('save');
    save.disabled = d.cells.some(function (c) { return !c; });
    save.addEventListener('click', function () {
      if (d.cells.some(function (c) { return !c; })) return;
      var hasR = d.reasons.some(function (r) { return r && r.trim(); });
      var g = {
        id: 'my-' + Math.random().toString(36).slice(2, 8),
        title: d.title.trim() || api.t('myGridDefault'),
        cells: d.cells,
        reasons: hasR ? d.reasons.map(function (r) { return (r || '').trim(); }) : null,
        mine: true
      };
      self._store.savedGrids.push(g);
      self._saveStore();
      self.building = false;
      self._reasonEditIdx = null;
      self._setGrid(g);
    });
    row.appendChild(save);
    var cancel = api.el('button', 'wdb-chip');
    cancel.type = 'button';
    cancel.textContent = api.t('cancel');
    cancel.addEventListener('click', function () { self.building = false; self._reasonEditIdx = null; self.render(); });
    row.appendChild(cancel);
    dock.appendChild(row);
    wrap.appendChild(dock);
  },

  /* the picker sheet — Picture (pww-index) / Number / Word / Shape / Dots / Clock */
  _openPicker: function (idx) {
    var api = this.api, self = this;
    this._closePicker();
    var scrim = api.el('div', 'wdb-scrim open picker');
    scrim.addEventListener('click', function () { self._closePicker(); });
    var sheet = api.el('div', 'wdb-picker');
    sheet.setAttribute('role', 'dialog');
    this._pickerScrim = scrim;
    this._pickerEl = sheet;
    this._pickerIdx = idx;
    this._pickerTab = 'picture';
    this._pickerTheme = null;
    document.querySelector('.lcs-app').append(scrim, sheet);
    this._renderPicker();
    this._loadPwwIndex().then(function () { if (self._pickerEl) self._renderPicker(); });
  },
  _closePicker: function () {
    if (this._pickerEl) { this._pickerEl.remove(); this._pickerEl = null; }
    if (this._pickerScrim) { this._pickerScrim.remove(); this._pickerScrim = null; }
  },
  _placeCell: function (cell) {
    this._draft.cells[this._pickerIdx] = cell;
    this._closePicker();
    this.render();
  },
  _renderPicker: function () {
    var api = this.api, self = this;
    var sheet = this._pickerEl;
    if (!sheet) return;
    sheet.innerHTML = '';

    var tabs = api.el('div', 'wdb-tabs');
    [['picture', 'tabPicture'], ['number', 'tabNumber'], ['word', 'tabWord'], ['shape', 'tabShape'], ['dots', 'tabDots'], ['clock', 'tabClock']].forEach(function (t) {
      var b = api.el('button', 'wdb-tab' + (self._pickerTab === t[0] ? ' active' : ''));
      b.type = 'button';
      b.textContent = api.t(t[1]);
      b.addEventListener('click', function () { self._pickerTab = t[0]; self._pickerTheme = null; self._renderPicker(); });
      tabs.appendChild(b);
    });
    var x = api.el('button', 'wdb-panel-close');
    x.type = 'button';
    x.setAttribute('aria-label', api.t('close'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePicker(); });
    tabs.appendChild(x);
    sheet.appendChild(tabs);

    var body = api.el('div', 'wdb-picker-body');
    sheet.appendChild(body);
    var tab = this._pickerTab;

    if (tab === 'picture') {
      if (!this._pwwIndex) {
        var ld = api.el('div', 'wdb-loading');
        ld.textContent = api.t('loading');
        body.appendChild(ld);
        return;
      }
      if (!this._pickerTheme) {
        var lbl = api.el('div', 'wdb-bandlbl');
        lbl.textContent = api.t('pickTheme');
        body.appendChild(lbl);
        var tgrid = api.el('div', 'wdb-themegrid');
        this._pwwIndex.themes.forEach(function (t) {
          var b = api.el('button', 'wdb-themetile');
          b.type = 'button';
          var im = document.createElement('img');
          im.loading = 'lazy'; im.decoding = 'async'; im.alt = '';
          im.src = '/image-library-webp/themes/' + encodeURIComponent(t.d) + '/' + t.c[0].f + '@1x.webp';
          b.appendChild(im);
          var nm = api.el('span');
          nm.textContent = t.n;
          b.appendChild(nm);
          b.addEventListener('click', function () { self._pickerTheme = t; self._renderPicker(); });
          tgrid.appendChild(b);
        });
        body.appendChild(tgrid);
      } else {
        var backrow = api.el('div', 'wdb-backrow');
        var back = api.el('button', 'wdb-chip');
        back.type = 'button';
        back.textContent = '‹ ' + api.t('back');
        back.addEventListener('click', function () { self._pickerTheme = null; self._renderPicker(); });
        backrow.appendChild(back);
        var tl = api.el('span', 'wdb-bandlbl inlin');
        tl.textContent = this._pickerTheme.n;
        backrow.appendChild(tl);
        body.appendChild(backrow);
        var cgrid = api.el('div', 'wdb-cardgrid');
        var th = this._pickerTheme;
        th.c.forEach(function (c) {
          var b = api.el('button', 'wdb-cardtile');
          b.type = 'button';
          var im = document.createElement('img');
          im.loading = 'lazy'; im.decoding = 'async'; im.alt = c.s;
          im.src = '/image-library-webp/themes/' + encodeURIComponent(th.d) + '/' + c.f + '@1x.webp';
          b.appendChild(im);
          var nm = api.el('span');
          nm.textContent = c.s;
          b.appendChild(nm);
          b.addEventListener('click', function () {
            self._placeCell({ t: 'img', theme: th.k, d: th.d, f: c.f, k: c.k });
          });
          cgrid.appendChild(b);
        });
        body.appendChild(cgrid);
      }
      return;
    }

    if (tab === 'number' || tab === 'word') {
      var inp = document.createElement('input');
      inp.className = 'wdb-biginput';
      inp.type = 'text';
      inp.maxLength = tab === 'number' ? 4 : 16;
      if (tab === 'number') inp.inputMode = 'numeric';
      body.appendChild(inp);
      var place = api.el('button', 'wdb-big coral');
      place.type = 'button';
      place.textContent = api.t('place');
      place.addEventListener('click', function () {
        var v = inp.value.trim();
        if (!v) return;
        if (tab === 'number') {
          v = v.replace(/[^\d]/g, '');
          if (!v) return;
          self._placeCell({ t: 'num', v: v });
        } else {
          var w = {}; w[api.lang] = v; w.en = w.en || v;
          self._placeCell({ t: 'word', w: w });
        }
      });
      body.appendChild(place);
      setTimeout(function () { inp.focus(); }, 60);
      return;
    }

    if (tab === 'shape') {
      /* the full vocabulary, not the seven it used to offer — a teacher
         cannot build a shape grid about quadrilaterals without a
         trapezium or a rhombus, and the picker was the ceiling */
      var srow = api.el('div', 'wdb-chippick');
      var shapes = ['circle', 'ellipse', 'semicircle', 'square', 'rectangle', 'rhombus',
        'trapezoid', 'triangle', 'rightTriangle', 'pentagon', 'hexagon', 'octagon',
        'star', 'cross', 'heart'];
      this._pickShape = this._pickShape || 'circle';
      shapes.forEach(function (sh) {
        var b = api.el('button', 'wdb-shapechip' + (self._pickShape === sh ? ' active' : ''));
        b.type = 'button';
        b.setAttribute('aria-label', api.t('shape_' + sh) || sh);
        b.innerHTML = self._shapeSVG({ shape: sh, size: 'lg', fill: 'solid' });
        b.addEventListener('click', function () { self._pickShape = sh; self._renderPicker(); });
        srow.appendChild(b);
      });
      body.appendChild(srow);

      /* ⚠ WAS A COLOUR PICKER. Colour is no longer an answer — the gate
         proved no four inks stay apart under all three dichromacies — so
         the teacher picks the channel that actually survives greyscale,
         print and colour-blindness. It is also the more mathematical
         choice: "the only striped one" is a property of the drawing, but
         so was "the only purple one", and this one at least survives a
         photocopier. */
      var frow = api.el('div', 'wdb-chippick');
      this._pickFill = this._pickFill || 'solid';
      this.FILLS.forEach(function (fk) {
        var b = api.el('button', 'wdb-shapechip' + (self._pickFill === fk ? ' active' : ''));
        b.type = 'button';
        /* ⚠ `api.t` RETURNS THE RAW KEY ON A MISS, and a raw key is
           truthy — so `|| fk` could never fire and this chip announced
           the literal string "fillSolid" in all eleven locales. The
           recorded `t(k) || 'default'` trap, found by four panels. The
           key exists now; the fallback is gone because it never worked. */
        b.setAttribute('aria-label', api.t('fill' + fk.charAt(0).toUpperCase() + fk.slice(1)));
        b.innerHTML = self._shapeSVG({ shape: 'square', size: 'lg', fill: fk });
        b.addEventListener('click', function () { self._pickFill = fk; self._renderPicker(); });
        frow.appendChild(b);
      });
      body.appendChild(frow);

      var zrow = api.el('div', 'wdb-chippick');
      this._pickSize = this._pickSize || 'lg';
      ['sm', 'md', 'lg'].forEach(function (sz) {
        var b = api.el('button', 'wdb-shapechip' + (self._pickSize === sz ? ' active' : ''));
        b.type = 'button';
        b.setAttribute('aria-label',
          api.t(sz === 'sm' ? 'sizeSmall' : (sz === 'md' ? 'sizeMedium' : 'sizeLarge')));
        b.innerHTML = self._shapeSVG({ shape: 'circle', size: sz, fill: 'solid' });
        b.addEventListener('click', function () { self._pickSize = sz; self._renderPicker(); });
        zrow.appendChild(b);
      });
      body.appendChild(zrow);
      var place2 = api.el('button', 'wdb-big coral');
      place2.type = 'button';
      place2.textContent = api.t('place');
      place2.addEventListener('click', function () {
        self._placeCell({ t: 'shape', shape: self._pickShape, size: self._pickSize, fill: self._pickFill });
      });
      body.appendChild(place2);
      return;
    }

    if (tab === 'dots') {
      var arrow = api.el('div', 'wdb-chippick');
      var arrs = ['dice', 'row', 'circle', 'scatter', 'tenframe'];
      this._pickArr = this._pickArr || 'dice';
      arrs.forEach(function (a) {
        var b = api.el('button', 'wdb-chip' + (self._pickArr === a ? ' active' : ''));
        b.type = 'button';
        /* ⚠ these five chips carried NO accessible name at all — SVG
           only — while `arr_*` sat authored in eleven locales and unused.
           Three panels reported it. */
        b.setAttribute('aria-label', api.t('arr_' + a));
        b.innerHTML = '<span class="wdb-arrmini">' + self._dotsSVG(a, a === 'scatter' ? 4 : (a === 'tenframe' ? 7 : 5)) + '</span>';
        b.addEventListener('click', function () { self._pickArr = a; self._renderPicker(); });
        arrow.appendChild(b);
      });
      body.appendChild(arrow);
      var nrow = api.el('div', 'wdb-chippick');
      this._pickN = this._pickN || 5;
      for (var n = 1; n <= 12; n++) {
        (function (nn) {
          if (self._pickArr === 'dice' && nn > 9) return;
          if (self._pickArr === 'tenframe' && nn > 10) return;
          /* ⚠ a leftover of the old SCATTER lookup table: the renderer
             generates a scatter for ANY n now, so the picker was gating
             on a limit that no longer exists. The Dutch panel spotted it
             while reading the model. */
          var b = api.el('button', 'wdb-chip small' + (self._pickN === nn ? ' active' : ''));
          b.type = 'button';
          b.textContent = String(nn);
          b.addEventListener('click', function () { self._pickN = nn; self._renderPicker(); });
          nrow.appendChild(b);
        }(n));
      }
      body.appendChild(nrow);
      var place3 = api.el('button', 'wdb-big coral');
      place3.type = 'button';
      place3.textContent = api.t('place');
      place3.addEventListener('click', function () {
        var nn = self._pickN;
        if (self._pickArr === 'dice' && nn > 9) nn = 9;
        if (self._pickArr === 'scatter') nn = nn > 8 ? 12 : 4;
        self._placeCell({ t: 'dots', arr: self._pickArr, n: nn });
      });
      body.appendChild(place3);
      return;
    }

    /* clock */
    var hrow = api.el('div', 'wdb-chippick');
    this._pickH = this._pickH || 3;
    for (var h = 1; h <= 12; h++) {
      (function (hh) {
        var b = api.el('button', 'wdb-chip small' + (self._pickH === hh ? ' active' : ''));
        b.type = 'button';
        b.textContent = String(hh);
        b.addEventListener('click', function () { self._pickH = hh; self._renderPicker(); });
        hrow.appendChild(b);
      }(h));
    }
    body.appendChild(hrow);
    var mrow = api.el('div', 'wdb-chippick');
    this._pickM = this._pickM == null ? 0 : this._pickM;
    [0, 15, 30, 45].forEach(function (mm) {
      var b = api.el('button', 'wdb-chip small' + (self._pickM === mm ? ' active' : ''));
      b.type = 'button';
      b.textContent = ':' + ('0' + mm).slice(-2);
      b.addEventListener('click', function () { self._pickM = mm; self._renderPicker(); });
      mrow.appendChild(b);
    });
    body.appendChild(mrow);
    var prev = api.el('div', 'wdb-clockprev');
    prev.innerHTML = this._clockSVG(this._pickH, this._pickM);
    body.appendChild(prev);
    var place4 = api.el('button', 'wdb-big coral');
    place4.type = 'button';
    place4.textContent = api.t('place');
    place4.addEventListener('click', function () {
      self._placeCell({ t: 'clock', h: self._pickH, m: self._pickM });
    });
    body.appendChild(place4);
  },

  onSettings: function (key, val) {
    this._saveStore();
    if (key === 'showWords' && val && !this._pwwIndex) {
      var self = this;
      this._loadPwwIndex().then(function () { self.render(); });
      return;
    }
    this.render();
  },

  /* shell reset: back to the featured/current grid, ritual cleared */
  reset: function () {
    this.building = false;
    this._reasonEditIdx = null;
    this._closePicker();
    this._resetRitual();
    this.render();
  },
  paint: function () {}
};

/* ⭐ DUAL EXPORT + A GUARDED INJECTOR. Without these the file cannot be
   `require`d in Node at all — the injector calls document.createElement at
   load — which is why the only gate this tool ever had had to run it
   through a `vm` sandbox with a fake document, and why it never had a
   mutation harness. Now verify-wodb.js requires the real model and
   mutate-wodb.js can point WDB_TOOL_DIR at a doctored copy.
   (picture-word-wall.js:1092 for the guard, build-plan.js:930 for the
   export — both house-standard.) */
if (typeof window !== 'undefined') window.Wodb = Wodb;
if (typeof module !== 'undefined' && module.exports) module.exports = Wodb;

/* per-tool styling: STAGE ONLY + the sanctioned body class */
if (typeof document !== 'undefined') (function injectCSS() {
  var css = ''
  /* ⭐⭐ THE BOARD IS WIDTH-DRIVEN, AND THE ROOT IS NOT BOUND TO THE VIEWPORT.
     MEASURED on production 2026-08-05 (scripts/repro-wodb-iframe-height.js):
     the shipped `body.wdb-wide #lcs-root{height:100%}` made
     `.lcs-app{height:100%}` (lcs-shell.css:70) resolve against the IFRAME
     viewport; lcs-shell.js:940 then reports that same height back to the
     parent, which set it in the first place from ActivityIframe's
     INITIAL_HEIGHT = 420. A fixed point. The board rendered at 234px with
     112px CELLS at BOTH 1440 and 2560 — against the 740px cells the
     wide-viewport programme measured against wodb.html standalone, where
     the viewport really is the screen. Phones escaped only because the
     560px rule flipped the root back to height:auto, which is exactly why
     nobody saw it: it bit only at the widths a teacher projects from.
     The controls (build-plan 859px, lids 731px) grow, so the fault was
     this one declaration. Now: no root binding, the grid sized by
     max-width + aspect-ratio (the build-plan.js:952 pattern), content
     height drives the iframe. */
  + 'body.wdb-wide .lcs-app{max-width:min(1080px,96vw);}'
  /* ⚠ the doctrine line now lives ON the stage (the shell hides its copy
     in every embed, which is where teaching happens). Hiding the shell's
     copy here too means it is not printed twice on the standalone page —
     tool-scoped, the shell is untouched. */
  + 'body.wdb-wide .lcs-instruction{display:none;}'
  + '@media (max-width:480px){body.wdb-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}}'
  + '.wdb-wrap{display:flex;flex-direction:column;align-items:center;'
  +   'gap:clamp(8px,1.4vmin,16px);width:100%;--wdb-board:560px;}'

  /* stage + grid
     ⚠ THE LIFT NEEDS ROOM ABOVE IT. A lifted cell rises 2.6% and grows
     3.5%, and its ring stands 12px outside the cell — measured, the top
     row climbed straight into the hint line and sat ON the words. Every
     gate was green: they each measured one box against a floor, and none
     of them asked whether two rendered things COLLIDE. */
  + '.wdb-stage{width:100%;display:flex;align-items:center;justify-content:center;'
  +   'padding:clamp(10px,2.2vmin,22px) 14px;}'
  + '.wdb-grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;'
  +   'gap:clamp(10px,1.8vmin,18px);width:100%;max-width:var(--wdb-board);'
  +   'aspect-ratio:1/1;margin:0 auto;'
  /* the all-revealed warmth is an AREA, not a 3px line. Measured: the
     shipped honey ring was 1.47:1 against the app ground — the emotional
     payoff of the whole product, invisible from two metres. A plate reads
     instantly at seven. */
  +   'padding:0;border-radius:26px;transition:background-color .6s var(--lcs-ease),padding .6s var(--lcs-ease);}'
  /* ⚠ container-type:size lets the numeral track the CELL. `19vmin`
     measured the iframe VIEWPORT, which is why four media-query tiers
     existed to patch it and why a short-but-wide frame still under-sized
     it. Three declarations replace eighteen lines and a whole failure class. */
  + '.wdb-cell{position:relative;background:#FFFEFB;border:none;border-radius:18px;min-width:0;min-height:0;'
  +   'container-type:size;'
  +   'cursor:pointer;overflow:hidden;display:grid;place-items:center;padding:5%;'
  +   'box-shadow:0 1px 3px rgba(20,30,28,.08),0 6px 16px rgba(20,30,28,.09);'
  +   'transition:transform .18s var(--lcs-ease),box-shadow .18s var(--lcs-ease);}'
  /* lifted = chosen for discussion — teal ring, NEVER green, no check.
     ⚠ 3px is 1.5 arcmin from the back row, at the resolution limit, and
     it surrounds teal content on every dots/clock/triangle grid: figure
     and ground the same colour. A paper gap separates the ring from what
     it rings, and translateY is a PERCENTAGE so the lift scales with the
     board instead of vanishing on a big one. */
  + '.wdb-cell[aria-pressed="true"]{transform:translateY(-2.6%) scale(1.035);'
  +   'box-shadow:0 6px 14px rgba(20,30,28,.10),0 26px 44px rgba(20,30,28,.18),'
  +   '0 0 0 3px #FFFDF4,0 0 0 9px var(--lcs-structure);}'
  + '.wdb-cell.speaking{box-shadow:0 4px 10px rgba(20,30,28,.10),0 20px 36px rgba(20,30,28,.16),'
  +   '0 0 0 3px var(--lcs-structure),0 0 22px 6px rgba(242,120,75,.28);}'

  /* cell content */
  + '.wdb-cc{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;'
  +   'width:100%;height:100%;min-height:0;pointer-events:none;}'
  /* ⚠ cqmin, not vmin — see the container-type note above. The three
     ratios are tuned so a 1-, 2- and 3-digit numeral carry the same ink
     AREA (a 2-digit numeral is 1.6x wider and 0.8x shorter than a
     1-digit one at equal font-size, which is a third source of unequal
     optical weight in a routine whose premise is four equal claims). */
  + '.wdb-num{font-family:var(--lcs-font-display);font-weight:700;font-size:43cqmin;'
  +   'line-height:1;color:var(--lcs-structure);}'
  + '.wdb-num.two{font-size:38cqmin;}'
  + '.wdb-num.three{font-size:31cqmin;}'
  + '@supports not (container-type:size){'
  +   '.wdb-num{font-size:clamp(64px,19vmin,158px);}'
  +   '.wdb-num.two{font-size:clamp(52px,16vmin,126px);}'
  +   '.wdb-num.three{font-size:clamp(44px,12vmin,98px);}'
  + '}'
  /* ⚠ NEVER overflow-wrap:anywhere on a word cell. The builder accepts 16
     characters; at the old size that broke Finnish "kuusi" into "kuus / i"
     mid-word with no hyphen, in a cell whose whole job is to show ONE word.
     The word is fitted instead (see _fitWord). */
  + '.wdb-wordcell{font-family:var(--lcs-font-display);font-weight:700;font-size:30cqmin;'
  +   'color:var(--lcs-structure);text-align:center;white-space:nowrap;max-width:100%;}'
  + '.wdb-shape{width:62%;height:auto;max-height:88%;}'
  + '.wdb-dots{width:72%;height:auto;max-height:82%;}'
  + '.wdb-dots.row{width:88%;}'
  + '.wdb-dots.frame{width:80%;}'
  + '.wdb-clock{width:70%;height:auto;max-height:88%;}'
  + '.wdb-img{max-width:86%;max-height:82%;object-fit:contain;}'
  + '.wdb-cellword{font-family:var(--lcs-font-body);font-weight:700;font-size:clamp(15px,2.4vmin,21px);color:#2B2622;}'
  + '.wdb-cc.mini{gap:0;}'
  + '.wdb-cc.mini .wdb-num{font-size:19px;}'
  + '.wdb-cc.mini .wdb-num.two{font-size:16px;}'
  + '.wdb-cc.mini .wdb-num.three{font-size:13px;}'
  + '.wdb-cc.mini .wdb-wordcell{font-size:11px;}'
  + '.wdb-cc.mini .wdb-shape{width:78%;max-height:100%;}'
  + '.wdb-cc.mini .wdb-dots{width:86%;max-height:100%;}'
  + '.wdb-cc.mini .wdb-clock{width:84%;max-height:100%;}'
  + '.wdb-cc.mini .wdb-img{max-width:92%;max-height:92%;}'
  + '.wdb-cc.mini .wdb-cellword{display:none;}'

  /* the ear */
  /* ⚠ THE EAR IS ALWAYS REACHABLE. It used to appear only on a LIFTED
     cell, so a child who was not ready to choose could not reach the
     sentence frames at all — exactly backwards for the children they
     exist for. It also used to be coral, on grids whose shapes were
     coral, and a fixed 44px: 11% of a projector cell but 28% of a phone
     one. Navy, sized as a proportion, and always live. */
  + '.wdb-ear{position:absolute;top:5%;inset-inline-end:5%;'
  +   'width:clamp(38px,11%,64px);height:clamp(38px,11%,64px);display:grid;'
  +   'place-items:center;border-radius:50%;background:' + Wodb.UI.ear + ';color:#fff;'
  /* ⚠ at rest it must not compete with the material. Four solid circles
     on a projector read as part of the apparatus, and on this apparatus
     the four things ARE the subject. Quiet until wanted, full the moment
     a corner is chosen or the pointer arrives. */
  +   'border:none;cursor:pointer;box-shadow:0 3px 0 0 #08222F;opacity:.24;'
  +   'transition:opacity .14s var(--lcs-ease),transform .14s var(--lcs-ease);}'
  + '.wdb-ear:hover,.wdb-ear:focus-visible{opacity:1;}'
  + '.wdb-ear:active{transform:translateY(2px);box-shadow:0 1px 0 0 #08222F;}'
  + '.wdb-slot .wdb-cell[aria-pressed="true"]+.wdb-ear{opacity:1;}'
  + '.wdb-ear.speaking{animation:wdbSpeak .9s ease-in-out infinite;}'
  + '@keyframes wdbSpeak{0%,100%{transform:scale(1);}50%{transform:scale(1.1);}}'
  /* ⚠ the shell gives :focus-visible a 3px outline and .wdb-cell has
     overflow:hidden, which CLIPPED it — a keyboard teacher could not see
     where they were. */
  + '.wdb-cell:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:-5px;}'

  /* ── the hint band: the doctrine line the shell was hiding ──
     ⚠ CLASS-FACING TEXT IS SIZED FOR THE BACK ROW. At 1080p from 7m one
     pixel is 0.51 arcmin and legibility needs ~20 arcmin of cap height,
     i.e. ~54px. The shipped reason was 20px (7 arcmin), the stem bar 21px
     (7.6) and the closing line 24px (8.7) — all three unreadable by the
     class they were written for. */
  + '.wdb-hint{width:100%;max-width:min(96%,var(--wdb-board));text-align:center;'
  +   'display:flex;flex-direction:column;gap:2px;}'
  + '.wdb-doctrine{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(16px,2.9vmin,30px);line-height:1.2;color:var(--lcs-structure);}'
  + '.wdb-invite{font-family:var(--lcs-font-body);font-weight:600;'
  +   'font-size:clamp(13px,2.1vmin,21px);line-height:1.25;color:var(--lcs-ink-soft);'
  +   'min-height:1.3em;}'

  /* ── the reveal, under the board and never over it ── */
  + '.wdb-revealarea{width:100%;max-width:min(96%,var(--wdb-board));}'
  + '.wdb-ribbon{background:#FDF0DC;border-top:3px solid ' + Wodb.UI.warm + ';'
  +   'border-radius:0 0 14px 14px;padding:10px 16px;text-align:center;'
  +   'font-family:var(--lcs-font-body);font-weight:700;'
  +   'font-size:clamp(15px,2.9vmin,30px);line-height:1.3;color:#2B2622;'
  +   'opacity:.72;transition:opacity .2s var(--lcs-ease);text-wrap:balance;}'
  + '.wdb-ribbon.show{opacity:1;}'
  /* the map mirrors the BOARD, so position carries the association */
  + '.wdb-reasonmap{display:grid;grid-template-columns:1fr 1fr;gap:clamp(6px,1.2vmin,12px);'
  +   'width:100%;}'
  + '.wdb-reasoncard{background:#FBF6EE;border:2px dashed rgba(201,138,5,.45);border-radius:12px;'
  +   'padding:8px 10px;min-height:3.2em;opacity:.45;transition:opacity .3s var(--lcs-ease),'
  +   'background-color .3s var(--lcs-ease),border-color .3s var(--lcs-ease);}'
  + '.wdb-reasoncard.out{opacity:1;background:#FDF0DC;border-style:solid;'
  +   'border-color:' + Wodb.UI.warm + ';}'
  + '.wdb-reasonpos{font-family:var(--lcs-font-body);font-weight:700;font-size:11.5px;'
  +   'text-transform:uppercase;letter-spacing:.07em;color:var(--lcs-ink-soft);}'
  + '.wdb-reasontext{font-family:var(--lcs-font-body);font-weight:700;'
  +   'font-size:clamp(13px,2.1vmin,22px);line-height:1.28;color:#2B2622;text-wrap:balance;}'
  + '.wdb-reasonalt{font-family:var(--lcs-font-body);font-weight:600;'
  +   'font-size:clamp(11.5px,1.7vmin,17px);line-height:1.3;color:var(--lcs-ink-soft);margin-top:3px;}'

  /* all revealed → warmth as AREA. The shipped 3px honey ring measured
     1.47:1 against the ground: the emotional payoff of the entire
     product, invisible from two metres. */
  + '.wdb-grid.all-revealed{background:' + Wodb.UI.plate + ';padding:clamp(8px,1.4vmin,16px);}'
  + '.wdb-closing{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(18px,3.4vmin,44px);'
  +   'color:var(--lcs-structure);background:#FDF0DC;border:2px solid ' + Wodb.UI.warm + ';'
  +   'border-radius:var(--lcs-radius-pill);padding:10px 26px;cursor:pointer;min-height:52px;'
  +   'animation:wdbClose .7s var(--lcs-ease);}'
  + '@keyframes wdbClose{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}'

  /* stem bar — ⚠ the height is RESERVED. It used to be min-height:0 at
     rest and 1.4em when shown, with the grid flexing above it, so the
     whole board jumped the instant a child tapped the ear. */
  + '.wdb-stembar{min-height:1.5em;max-width:min(96%,var(--wdb-board));text-align:center;'
  +   'font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(15px,2.8vmin,30px);color:var(--lcs-ink);opacity:0;'
  +   'transition:opacity .2s var(--lcs-ease);}'
  + '.wdb-stembar.show{opacity:1;}'

  /* the cell slot — the ear is a SIBLING of the cell button, never a
     child of it (a button inside a button is invalid and unreachable) */
  + '.wdb-slot{position:relative;min-width:0;min-height:0;}'
  + '.wdb-slot>.wdb-cell{width:100%;height:100%;}'

  /* dock */
  + '.wdb-dock{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  /* ⚠ ALL SIX font-weight:800 DECLARATIONS ARE GONE. lcs-shell.css:12
     imports Baloo 2 at 500;600;700 and Nunito at 400;600;700 — there is
     no 800, so every one of them was FAUX bold: thicker strokes with
     unopened counters, worst at .wdb-bandlbl's 12.5px uppercase. The
     house recorded this lesson on learning-clock.js:1515 and this tool
     violated it six times. */
  + '.wdb-namechip{display:flex;flex-direction:column;align-items:center;gap:1px;text-align:center;}'
  + '.wdb-namelbl{font-family:var(--lcs-font-body);font-weight:700;font-size:clamp(11px,1.2vmin,15px);'
  +   'text-transform:uppercase;letter-spacing:.07em;color:var(--lcs-ink-soft);}'
  + '.wdb-nametitle{font-family:var(--lcs-font-body);font-weight:700;'
  +   'font-size:clamp(14px,1.7vmin,22px);color:var(--lcs-ink);}'

  /* ── navigation: the move that ends every WODB, which had no button ── */
  + '.wdb-nav{display:inline-flex;align-items:center;gap:6px;}'
  + '.wdb-chip.go{background:var(--lcs-structure);color:#fff;border-color:var(--lcs-structure);'
  +   'font-weight:700;padding-inline:20px;}'
  + '.wdb-chip.go svg{margin-inline-start:2px;}'
  + '.wdb-chip.primary{background:' + Wodb.UI.warm + ';color:#fff;border-color:' + Wodb.UI.warm + ';}'
  + '.wdb-chip.primary.active{background:var(--lcs-structure);border-color:var(--lcs-structure);}'
  + '.wdb-chip.honey{background:#FDF0DC;border-color:' + Wodb.UI.warm + ';color:#7A5401;}'
  + '.wdb-chip:disabled{opacity:.4;cursor:default;}'
  + '.wdb-endband{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px 14px;'
  +   'margin:2px auto;max-width:560px;background:#FDF0DC;border:2px solid ' + Wodb.UI.warm + ';'
  +   'border-radius:var(--lcs-radius-sm);}'
  + '.wdb-endline{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(15px,2.2vmin,22px);color:var(--lcs-structure);text-align:center;}'
  + '.wdb-freenote{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;'
  +   'font-family:var(--lcs-font-body);font-weight:600;font-size:clamp(11.5px,1.3vmin,15px);'
  +   'color:var(--lcs-ink-soft);text-align:center;max-width:640px;}'
  + '.wdb-freenote a{color:#A9430F;font-weight:700;text-decoration:underline;}'
  + '.wdb-chiprow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;}'
  + '.wdb-chip{display:inline-flex;align-items:center;gap:6px;min-height:46px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:14.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 16px;cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.wdb-chip:active{transform:scale(.96);}'
  + '.wdb-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.wdb-chip.teal{color:var(--lcs-structure);}'
  + '.wdb-chip.locked{color:var(--lcs-ink-soft);}'
  + '.wdb-chip.small{min-width:44px;justify-content:center;padding:8px 10px;}'
  + '.wdb-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:var(--lcs-ink-soft);'
  +   'background:transparent;border:none;cursor:pointer;text-decoration:underline;padding:6px;min-height:44px;}'
  + '.wdb-big{min-width:170px;min-height:52px;padding:10px 28px;border-radius:var(--lcs-radius-pill);'
  +   'border:1.5px solid var(--lcs-structure);cursor:pointer;background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:700;font-size:16px;'
  +   'box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.wdb-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);}'
  + '.wdb-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.wdb-big:disabled{opacity:.5;cursor:default;}'

  /* gate */
  + '.wdb-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;margin:4px auto;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.wdb-gate a{color:#C9502A;font-weight:700;text-decoration:underline;}'
  + '.wdb-loading{font-family:var(--lcs-font-body);font-weight:700;color:var(--lcs-ink-soft);padding:24px;text-align:center;}'

  /* library panel */
  + '.wdb-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;pointer-events:none;'
  +   'transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.wdb-scrim.open{opacity:1;pointer-events:auto;}'
  + '.wdb-panel{position:absolute;left:50%;top:5%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(720px,94%);max-height:88%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;opacity:0;pointer-events:none;'
  +   'transition:opacity .2s,transform .2s var(--lcs-ease);display:flex;flex-direction:column;}'
  + '.wdb-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.wdb-panel-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;'
  +   'border-bottom:1px solid var(--lcs-line);}'
  + '.wdb-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:17px;color:var(--lcs-ink);}'
  + '.wdb-panel-close{width:40px;height:40px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;border:none;}'
  + '.wdb-panel-body{padding:12px 16px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.wdb-bandlbl{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;text-transform:uppercase;'
  +   'letter-spacing:.08em;color:var(--lcs-ink-soft);margin-top:6px;}'
  + '.wdb-bandlbl.inlin{margin-top:0;text-transform:none;font-size:14px;}'
  + '.wdb-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:8px;}'
  + '.wdb-tile{position:relative;display:flex;flex-direction:column;gap:5px;padding:8px;cursor:pointer;'
  +   'background:var(--lcs-surface);border:2px solid var(--lcs-line);border-radius:14px;text-align:center;}'
  + '.wdb-tile.active{border-color:var(--lcs-structure);}'
  + '.wdb-tile.locked{opacity:.62;}'
  + '.wdb-lock{position:absolute;top:6px;right:8px;color:var(--lcs-ink-soft);}'
  + '.wdb-mini{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:2px;'
  +   'background:#FDF6E8;border-radius:8px;padding:3px;aspect-ratio:1/1;}'
  + '.wdb-minicell{display:grid;place-items:center;background:#FFFEFB;border-radius:5px;overflow:hidden;min-height:0;min-width:0;}'
  + '.wdb-tilename{font-family:var(--lcs-font-body);font-weight:700;font-size:12px;color:var(--lcs-ink);'
  +   'min-height:2.4em;display:flex;align-items:center;justify-content:center;}'
  + '.wdb-tiledel{font-family:var(--lcs-font-body);font-weight:700;font-size:12px;color:#C9502A;'
  +   'text-decoration:underline;cursor:pointer;padding:2px;}'

  /* builder */
  + '.wdb-cell.empty{background:var(--lcs-surface-2);border:2px dashed rgba(242,200,121,.9);box-shadow:none;}'
  + '.wdb-plus{font-family:var(--lcs-font-display);font-weight:700;font-size:56px;color:var(--lcs-ink-soft);}'
  + '.wdb-pen{position:absolute;bottom:8px;inset-inline-end:10px;font-size:17px;color:var(--lcs-ink-soft);'
  +   'background:var(--lcs-surface);border-radius:50%;width:34px;height:34px;display:grid;place-items:center;'
  +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;}'
  + '.wdb-guide{margin:0;max-width:640px;text-align:center;font-family:var(--lcs-font-body);'
  +   'font-weight:600;font-size:12.5px;line-height:1.45;color:var(--lcs-ink-soft);}'
  + '.wdb-reasonrow{width:100%;display:flex;justify-content:center;}'
  + '.wdb-reasoninput,.wdb-nameinput{font-family:var(--lcs-font-body);font-weight:700;font-size:14.5px;'
  +   'padding:10px 14px;border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);min-height:46px;box-sizing:border-box;}'
  + '.wdb-reasoninput{width:min(560px,94%);}'
  + '.wdb-nameinput{width:min(260px,50vw);}'
  + '.wdb-reasoninput:focus,.wdb-nameinput:focus,.wdb-biginput:focus{outline:none;border-color:var(--lcs-structure);}'

  /* picker sheet */
  + '.wdb-scrim.picker{z-index:72;}'
  + '.wdb-picker{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:73;'
  +   'width:min(640px,94%);max-height:min(80%,620px);background:#FFFEFB;border-radius:24px;'
  +   'box-shadow:0 8px 24px rgba(20,30,28,.18),0 30px 70px rgba(20,30,28,.22);'
  +   'display:flex;flex-direction:column;overflow:hidden;}'
  + '.wdb-tabs{display:flex;align-items:center;gap:6px;padding:12px 12px 10px;flex-wrap:wrap;'
  +   'border-bottom:1px solid var(--lcs-line);}'
  + '.wdb-tab{min-height:44px;font-family:var(--lcs-font-display);font-weight:700;font-size:13.5px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:8px 14px;cursor:pointer;}'
  + '.wdb-tab.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.wdb-tabs .wdb-panel-close{margin-left:auto;}'
  + '.wdb-picker-body{padding:14px;display:flex;flex-direction:column;gap:12px;align-items:center;'
  +   'overflow:auto;min-height:0;}'
  + '.wdb-themegrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px;width:100%;}'
  + '.wdb-themetile{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px;cursor:pointer;'
  +   'background:var(--lcs-surface);border:2px solid var(--lcs-line);border-radius:12px;}'
  + '.wdb-themetile img{width:52px;height:52px;object-fit:contain;}'
  + '.wdb-themetile span{font-family:var(--lcs-font-body);font-weight:700;font-size:11.5px;color:var(--lcs-ink);'
  +   'text-align:center;line-height:1.2;}'
  + '.wdb-backrow{display:flex;align-items:center;gap:10px;width:100%;}'
  + '.wdb-cardgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px;width:100%;}'
  + '.wdb-cardtile{display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px;cursor:pointer;'
  +   'background:var(--lcs-surface);border:2px solid var(--lcs-line);border-radius:12px;}'
  + '.wdb-cardtile img{width:56px;height:56px;object-fit:contain;}'
  + '.wdb-cardtile span{font-family:var(--lcs-font-body);font-weight:700;font-size:11px;color:var(--lcs-ink);'
  +   'text-align:center;line-height:1.2;}'
  + '.wdb-biginput{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(32px,6vmin,46px);'
  +   'text-align:center;border:2px dashed var(--lcs-line);border-radius:16px;padding:12px 20px;'
  +   'min-height:72px;width:min(340px,86%);background:var(--lcs-surface-2);color:var(--lcs-ink);}'
  + '.wdb-chippick{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:wrap;}'
  + '.wdb-shapechip{width:56px;height:56px;padding:8px;background:var(--lcs-surface);cursor:pointer;'
  +   'border:2px solid var(--lcs-line);border-radius:12px;}'
  + '.wdb-shapechip.active{border-color:var(--lcs-structure);}'
  + '.wdb-shapechip svg{width:100%;height:100%;}'
  + '.wdb-colorchip{width:44px;height:44px;border-radius:50%;border:3px solid transparent;cursor:pointer;}'
  + '.wdb-colorchip.active{border-color:var(--lcs-ink);}'
  + '.wdb-arrmini{display:inline-flex;width:44px;}'
  + '.wdb-arrmini svg{width:100%;height:auto;}'
  + '.wdb-clockprev{width:120px;}'
  + '.wdb-clockprev svg{width:100%;height:auto;}'

  /* ── the paid sheet: absent on screen, and every rule below is scoped
        to body.wdb-paid, because Ctrl+P is guarded by no chip ── */
  + '.wdb-sheet{display:none;}'
  + '@media print{'
  +   'body.wdb-paid .wdb-wrap,body.wdb-paid .lcs-header,body.wdb-paid .wdb-panel,'
  +     'body.wdb-paid .wdb-scrim,body.wdb-paid .wdb-picker{display:none !important;}'
  +   'body.wdb-paid .wdb-sheet{display:block !important;}'
  +   'body.wdb-paid .lcs-app{box-shadow:none !important;background:#fff !important;'
  +     'max-width:none !important;height:auto !important;}'
  +   '.wdb-page{break-after:page;break-inside:avoid;color:#000;padding:0;}'
  +   '.wdb-page:last-child{break-after:auto;}'
  +   '.wdb-p-head{font-family:var(--lcs-font-display);font-weight:700;font-size:19pt;'
  +     'color:#000;margin-bottom:2mm;}'
  +   '.wdb-p-doctrine{font-family:var(--lcs-font-body);font-weight:700;font-size:12pt;'
  +     'color:#000;margin-bottom:5mm;}'
  +   '.wdb-p-grid{display:grid;grid-template-columns:1fr 1fr;gap:4mm;width:150mm;}'
  +   '.wdb-p-cell{border:1pt solid #000;border-radius:3mm;height:52mm;display:flex;'
  +     'align-items:center;justify-content:center;overflow:hidden;}'
  +   '.wdb-p-cell svg{width:70%;height:70%;}'
  +   '.wdb-p-num{font-family:var(--lcs-font-display);font-weight:700;font-size:40pt;color:#000;}'
  +   '.wdb-p-word{font-family:var(--lcs-font-body);font-weight:700;font-size:20pt;color:#000;}'
  +   '.wdb-p-draw{display:block;width:38mm;height:26mm;border:0.7pt dashed #000;margin-top:3mm;}'
  +   '.wdb-p-lines{margin-top:6mm;}'
  +   '.wdb-p-row{display:flex;gap:3mm;align-items:baseline;margin-bottom:9mm;'
  +     'border-bottom:0.7pt solid #000;padding-bottom:1mm;}'
  +   '.wdb-p-pos{font-family:var(--lcs-font-body);font-weight:700;font-size:10pt;'
  +     'color:#000;min-width:30mm;}'
  +   '.wdb-p-rule{font-family:var(--lcs-font-body);font-size:11pt;color:#000;}'
  +   '.wdb-p-others{font-family:var(--lcs-font-body);font-size:11pt;color:#000;margin-top:4mm;'
  +     'border-bottom:0.7pt solid #000;padding-bottom:1mm;}'
  +   '.wdb-p-guide{font-family:var(--lcs-font-body);font-size:10pt;color:#000;margin-top:5mm;}'
  +   '.wdb-p-cell.empty{border-style:dashed;}'
  +   '@page{size:A4;margin:14mm;}'
  + '}'

  /* ⚠ the root is no longer bound to the viewport, so on the STANDALONE
     page a tall board could be clipped by the shell's
     `html,body{overflow:hidden}`. Tool-scoped, via the sanctioned body
     class — the shell is untouched. In the embed the parent grows the
     iframe instead, which is the whole point of the change. */
  + 'html.wdb-html,html.wdb-html body.wdb-wide{height:auto;min-height:100%;overflow-y:auto;}'
  + 'html.wdb-html body.wdb-wide{overflow-x:hidden;}'

  /* phone */
  + '@media (max-width:560px){'
  +   '.wdb-grid{gap:10px;}'
  /* ⚠ the gutter is 10px here, and a 9px ring plus the scale growth would
     make two lifted neighbours touch. The ring shrinks with the gap. */
  +   '.wdb-cell[aria-pressed="true"]{transform:translateY(-1.8%) scale(1.02);'
  +     'box-shadow:0 4px 10px rgba(20,30,28,.10),0 16px 28px rgba(20,30,28,.16),'
  +     '0 0 0 2px #FFFDF4,0 0 0 5px var(--lcs-structure);}'
  +   '.wdb-ear{width:40px;height:40px;}'
  +   '.wdb-reason{font-size:13px;max-height:44%;}'
  +   '.wdb-panel{width:100%;left:0;transform:none;top:0;max-height:94%;border-radius:0 0 18px 18px;}'
  +   '.wdb-panel.open{transform:none;}'
  +   '.wdb-picker{width:100%;max-height:92%;border-radius:18px 18px 0 0;top:auto;bottom:0;transform:translateX(-50%);left:50%;}'
  + '}'

  /* short screens (projector 1024×768) */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.wdb-wrap{gap:5px;}'
  +   '.wdb-guide{font-size:11.5px;}'
  + '}'

  /* reduced motion: lift becomes ring-only; fades, no stagger */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.wdb-cell,.wdb-reason,.wdb-panel,.wdb-scrim{transition-duration:.12s;}'
  +   '.wdb-cell[aria-pressed="true"]{transform:none;}'
  +   '.wdb-cell.speaking .wdb-ear,.wdb-ear.speaking{animation:none;}'
  +   '.wdb-grid.stagger .wdb-cell .wdb-reason{transition-delay:0ms;}'
  + '}'

  /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
     ⚠⚠ KEYED ON min-width ONLY. The shipped tiers also required
     `min-height:880px` / `1080px`, and MEASURED on production the iframe
     viewport is 422px at every desktop width — so neither tier could ever
     match. (The control told us more than it was asked: build-plan's
     iframe is 859px and ITS tiers need 880px, so the same min-height
     gating is dead across ~46 tools on the production page. Reported, not
     fixed here — that is a separate commission.)
     Nothing needs a height condition now: the board is width-driven and
     the numerals are cqmin, so they track the cell at any frame shape. */
  + '@media (min-width:1200px){'
  +   'body.wdb-wide .lcs-app{max-width:min(1192px,96vw);}'
  +   '.wdb-wrap{--wdb-board:660px;}'
  + '}'
  + '@media (min-width:1600px){'
  +   'body.wdb-wide .lcs-app{max-width:min(1560px,96vw);}'
  +   '.wdb-wrap{--wdb-board:820px;}'
  + '}'
  + '@media (min-width:2100px){'
  +   'body.wdb-wide .lcs-app{max-width:min(1752px,96vw);}'
  +   '.wdb-wrap{--wdb-board:940px;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
