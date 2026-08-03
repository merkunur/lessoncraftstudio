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
    loading:      {en:'Laying out the four…',de:'Die vier werden hingelegt…',fr:'On installe les quatre…',it:'Sistemiamo i quattro…',es:'Acomodando los cuatro…',pt:'Arrumando os quatro…',nl:'De vier worden neergelegd…',sv:'De fyra läggs fram…',da:'De fire lægges frem…',no:'De fire legges fram…',fi:'Asetellaan neljä paikoilleen…'}
  },

  defaults: { showWords: false },
  settings: [
    { key: 'showWords', type: 'toggle', labelKey: 'setShowWords' }
  ],

  STORE_KEY: 'lcs:wodb:v1',
  ENT_TRUST_DAYS: 14,
  COLORS: { teal: '#146B5E', coral: '#F2784B', honey: '#F2C879', plum: '#6B4C9A' },
  BAND_KEY: { K: 'bandK', G1: 'bandG1', G23: 'bandG23' },

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
  /* ISO week number — the free weekly rotation is deterministic */
  _isoWeek: function (now) {
    var d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    var day = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - day + 3);
    var first = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
    return 1 + Math.round(((d - first) / 86400000 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
  },
  _featuredGrid: function () {
    var order = (this.grids && this.grids.featuredOrder) || [];
    if (!order.length) return null;
    var idx = this._isoWeek(new Date()) % order.length;
    return this.byId[order[idx]] || this.byId[order[0]];
  },
  _isFeatured: function (g) {
    var f = this._featuredGrid();
    return !!(f && g && f.id === g.id);
  },
  /* STRUCTURAL free gate: free resolves ONLY the weekly featured grid —
     a ?grid= deep link cannot leak a premium grid */
  _resolveGrid: function () {
    if (!this.grids) return null;
    if (this.premium && this._wantGrid) {
      if (this.byId[this._wantGrid]) return this.byId[this._wantGrid];
      var mine = this._store.savedGrids.filter(function (g) { return g.id === this._wantGrid; }, this);
      if (mine.length) return mine[0];
    }
    if (this.premium && this.current) return this.current;
    return this._featuredGrid();
  },
  _hasReasons: function (g) {
    return !!(g && g.reasons && g.reasons.length === 4 && g.reasons.some(function (r) { return r && (r.en || Object.keys(r).length); }));
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

  _shapeSVG: function (cell) {
    var col = this.COLORS[cell.color] || this.COLORS.coral;
    var scale = cell.size === 'sm' ? 0.55 : (cell.size === 'md' ? 0.8 : 1);
    var fill = cell.fill === 'outline' ? 'none' : col;
    var stroke = cell.fill === 'outline' ? ('stroke="' + col + '" stroke-width="6" stroke-linejoin="round"') : '';
    var inner = '';
    switch (cell.shape) {
      case 'circle': inner = '<circle cx="50" cy="50" r="38" fill="' + fill + '" ' + stroke + '/>'; break;
      case 'square': inner = '<rect x="14" y="14" width="72" height="72" rx="6" fill="' + fill + '" ' + stroke + '/>'; break;
      case 'rectangle': inner = '<rect x="8" y="26" width="84" height="48" rx="6" fill="' + fill + '" ' + stroke + '/>'; break;
      case 'triangle': inner = '<path d="M50 12 L90 84 L10 84 Z" fill="' + fill + '" ' + stroke + '/>'; break;
      case 'rightTriangle': inner = '<path d="M16 14 L16 86 L88 86 Z" fill="' + fill + '" ' + stroke + '/>'; break;
      case 'hexagon': inner = '<path d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" fill="' + fill + '" ' + stroke + '/>'; break;
      case 'star': inner = '<path d="M50 8 L61 38 L93 38 L67 57 L77 88 L50 69 L23 88 L33 57 L7 38 L39 38 Z" fill="' + fill + '" ' + stroke + '/>'; break;
      case 'heart': inner = '<path d="M50 88 C20 64 8 46 12 32 C16 18 34 14 50 30 C66 14 84 18 88 32 C92 46 80 64 50 88 Z" fill="' + fill + '" ' + stroke + '/>'; break;
      default: inner = '<circle cx="50" cy="50" r="38" fill="' + fill + '" ' + stroke + '/>';
    }
    var tf = [];
    if (cell.rot) tf.push('rotate(' + cell.rot + ' 50 50)');
    if (scale !== 1) tf.push('translate(' + (50 - 50 * scale) + ' ' + (50 - 50 * scale) + ') scale(' + scale + ')');
    return '<svg class="wdb-shape" viewBox="0 0 100 100" aria-hidden="true">' + (tf.length ? '<g transform="' + tf.join(' ') + '">' + inner + '</g>' : inner) + '</svg>';
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
  _dot: function (x, y, r, col) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + col + '"/>' +
      '<circle cx="' + (x - r * 0.28) + '" cy="' + (y - r * 0.33) + '" r="' + (r * 0.28) + '" fill="#fff" opacity="0.35"/>';
  },
  _dotsSVG: function (arr, n) {
    var col = this.COLORS.teal, s = '', i;
    if (arr === 'dice') {
      var pts = this.DICE[n] || this.DICE[6];
      for (i = 0; i < pts.length; i++) s += this._dot(pts[i][0], pts[i][1], 11, col);
      return '<svg class="wdb-dots" viewBox="0 0 100 100" aria-hidden="true">' + s + '</svg>';
    }
    if (arr === 'row') {
      var W = Math.max(100, n * 17);
      var step = W / n;
      for (i = 0; i < n; i++) s += this._dot(step * (i + 0.5), 14, 7.5, col);
      return '<svg class="wdb-dots row" viewBox="0 0 ' + W + ' 28" aria-hidden="true">' + s + '</svg>';
    }
    if (arr === 'circle') {
      for (i = 0; i < n; i++) {
        var a = (i / n) * 2 * Math.PI - Math.PI / 2;
        s += this._dot(50 + 36 * Math.cos(a), 50 + 36 * Math.sin(a), n > 8 ? 7.5 : 9, col);
      }
      return '<svg class="wdb-dots" viewBox="0 0 100 100" aria-hidden="true">' + s + '</svg>';
    }
    if (arr === 'scatter') {
      var sc = this.SCATTER[n] || this.SCATTER[4];
      for (i = 0; i < sc.length && i < n; i++) s += this._dot(sc[i][0], sc[i][1], 8, col);
      return '<svg class="wdb-dots" viewBox="0 0 100 100" aria-hidden="true">' + s + '</svg>';
    }
    /* tenframe: 5×2 frame, fill top row first */
    var cw = 28, rows = 2, cols = 5, W2 = cols * cw + 4, H2 = rows * cw + 4;
    s += '<rect x="2" y="2" width="' + (cols * cw) + '" height="' + (rows * cw) + '" fill="#FFFEFB" stroke="' + col + '" stroke-width="3" rx="4"/>';
    for (i = 1; i < cols; i++) s += '<line x1="' + (2 + i * cw) + '" y1="2" x2="' + (2 + i * cw) + '" y2="' + (2 + rows * cw) + '" stroke="' + col + '" stroke-width="2"/>';
    s += '<line x1="2" y1="' + (2 + cw) + '" x2="' + (2 + cols * cw) + '" y2="' + (2 + cw) + '" stroke="' + col + '" stroke-width="2"/>';
    for (i = 0; i < Math.min(n, 10); i++) {
      var r0 = Math.floor(i / cols), c0 = i % cols;
      s += this._dot(2 + c0 * cw + cw / 2, 2 + r0 * cw + cw / 2, 9.5, col);
    }
    return '<svg class="wdb-dots frame" viewBox="0 0 ' + W2 + ' ' + H2 + '" aria-hidden="true">' + s + '</svg>';
  },

  /* fresh static clock — protected clock-core untouched; the hand math
     is the standard hour = 30H + 0.5M, minute = 6M (degrees from 12) */
  _clockSVG: function (h, m) {
    var teal = this.COLORS.teal;
    var s = '<circle cx="50" cy="50" r="46" fill="#FFFEFB" stroke="' + teal + '" stroke-width="4"/>';
    for (var i = 1; i <= 12; i++) {
      var a = i * Math.PI / 6;
      var big = i % 3 === 0;
      var r1 = big ? 39 : 41.5, r2 = 44.5;
      s += '<line x1="' + (50 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (50 - r1 * Math.cos(a)).toFixed(1) +
        '" x2="' + (50 + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (50 - r2 * Math.cos(a)).toFixed(1) +
        '" stroke="' + teal + '" stroke-width="' + (big ? 3 : 2) + '" stroke-linecap="round"/>';
    }
    [[12, 50, 21], [3, 82, 53.5], [6, 50, 86], [9, 18, 53.5]].forEach(function (nm) {
      s += '<text x="' + nm[1] + '" y="' + nm[2] + '" text-anchor="middle" font-size="11" font-weight="700" fill="' + teal + '">' + nm[0] + '</text>';
    });
    var hourDeg = (30 * (h % 12) + 0.5 * m).toFixed(1);
    var minDeg = (6 * m).toFixed(1);
    s += '<g transform="rotate(' + hourDeg + ' 50 50)"><line x1="50" y1="50" x2="50" y2="26" stroke="' + teal + '" stroke-width="7" stroke-linecap="round"/></g>';
    s += '<g transform="rotate(' + minDeg + ' 50 50)"><line x1="50" y1="50" x2="50" y2="12" stroke="' + teal + '" stroke-width="5" stroke-linecap="round"/></g>';
    s += '<circle cx="50" cy="50" r="4" fill="' + this.COLORS.coral + '"/>';
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

    if (this.building) { this._renderBuilder(wrap); return; }

    var g = this.current;
    if (!g) return;

    /* the grid stage */
    var stageBox = api.el('div', 'wdb-stage');
    var grid = api.el('div', 'wdb-grid');
    if (this.revealMode) grid.classList.add('reveal-armed');
    this._gridEl = grid;
    var cells = g.cells || [];
    for (var i = 0; i < 4; i++) grid.appendChild(this._cellEl(cells[i], i, g));
    stageBox.appendChild(grid);
    wrap.appendChild(stageBox);

    /* stem bar (filled by the ear) */
    var stembar = api.el('div', 'wdb-stembar');
    this._stembarEl = stembar;
    wrap.appendChild(stembar);

    /* closing line */
    if (this.closingShown) {
      grid.classList.add('all-revealed');
      var cl = api.el('button', 'wdb-closing');
      cl.type = 'button';
      cl.textContent = api.t('closing');
      cl.addEventListener('click', function () { self._speak(api.t('closing')); });
      wrap.appendChild(cl);
    }

    wrap.appendChild(this._dock(g));
  },

  _cellEl: function (cell, i, g) {
    var api = this.api, self = this;
    var el = api.el('button', 'wdb-cell');
    el.type = 'button';
    el.setAttribute('aria-pressed', this.lifted[i] ? 'true' : 'false');
    if (this.revealed[i]) el.classList.add('revealed');
    el.appendChild(this._cellContent(cell, false));

    /* the ear — appears only while lifted; stems NEVER name the item */
    var ear = api.el('button', 'wdb-ear');
    ear.type = 'button';
    ear.setAttribute('aria-label', api.t('stem1'));
    ear.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10 v4 h3.5 L13 19 V5 L7.5 10 Z" fill="currentColor" stroke="none"/><path d="M16.5 9.5 a4 4 0 0 1 0 5"/><path d="M19 7.5 a7.5 7.5 0 0 1 0 9"/></svg>';
    ear.addEventListener('click', function (e) {
      e.stopPropagation();
      var stems = ['stem1', 'stem2', 'stem3'];
      var key = stems[self._stemIdx % 3];
      self._stemIdx++;
      var text = api.t(key);
      if (self._stembarEl) { self._stembarEl.textContent = text; self._stembarEl.classList.add('show'); }
      ear.classList.add('speaking');
      el.classList.add('speaking');
      self._speak(text);
      setTimeout(function () { ear.classList.remove('speaking'); el.classList.remove('speaking'); }, 2600);
    });
    el.appendChild(ear);

    /* the reason band (slides up in reveal mode, per-cell) */
    var reasonText = this._reasonFor(g, i);
    if (reasonText) {
      var band = api.el('div', 'wdb-reason');
      band.textContent = reasonText;
      el.appendChild(band);
    }

    el.addEventListener('click', function () {
      if (self.revealMode) {
        if (!reasonText) return;
        if (self.revealed[i]) { self._speak(reasonText); return; }   /* tap a revealed card → it speaks */
        self.revealed[i] = true;
        el.classList.add('revealed');
        if (Object.keys(self.revealed).length === 4 && !self.closingShown) {
          self.closingShown = true;
          self.render();
        }
        return;
      }
      /* multi-lift: up to all four, identical styling — four equal claims */
      self.lifted[i] = !self.lifted[i];
      if (!self.lifted[i]) delete self.lifted[i];
      el.setAttribute('aria-pressed', self.lifted[i] ? 'true' : 'false');
    });
    return el;
  },

  _reasonFor: function (g, i) {
    if (!g.reasons || !g.reasons[i]) return null;
    var r = g.reasons[i];
    if (typeof r === 'string') return r || null;         /* custom saved grids */
    return this._loc(r) || null;
  },

  _dock: function (g) {
    var api = this.api, self = this;
    var dock = api.el('div', 'wdb-dock');

    /* current-grid chip: featured badge or title */
    var name = api.el('div', 'wdb-namechip');
    var isFeat = this._isFeatured(g);
    name.textContent = (isFeat ? api.t('thisWeek') : (this._loc(g.title) || g.title || api.t('myGridDefault')));
    dock.appendChild(name);

    var row = api.el('div', 'wdb-chiprow');

    if (this._hasReasons(g)) {
      var rev = api.el('button', 'wdb-chip' + (this.revealMode ? ' active' : ''));
      rev.type = 'button';
      rev.textContent = api.t(this.revealMode ? 'hideReasons' : 'showReasons');
      rev.addEventListener('click', function () {
        self.revealMode = !self.revealMode;
        if (!self.revealMode) { self.revealed = {}; self.closingShown = false; }
        self.render();
        if (self.revealMode && self._stembarEl) { self._stembarEl.textContent = api.t('revealHint'); self._stembarEl.classList.add('show'); }
      });
      row.appendChild(rev);
      if (this.revealMode && Object.keys(this.revealed).length < 4) {
        var all = api.el('button', 'wdb-linkbtn');
        all.type = 'button';
        all.textContent = api.t('revealAll');
        all.addEventListener('click', function () {
          self.revealed = { 0: true, 1: true, 2: true, 3: true };
          self.closingShown = true;
          self.render();
          self._gridEl.classList.add('stagger');
        });
        row.appendChild(all);
      }
    }

    var again = api.el('button', 'wdb-chip');
    again.type = 'button';
    again.textContent = api.t('startAgain');
    again.addEventListener('click', function () { self._resetRitual(); self.render(); });
    row.appendChild(again);

    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

    var lib = api.el('button', 'wdb-chip teal');
    lib.type = 'button';
    lib.textContent = api.t('library');
    lib.addEventListener('click', function () { self._openPanel(); });
    row.appendChild(lib);

    var build = api.el('button', 'wdb-chip teal' + (this.premium ? '' : ' locked'));
    build.type = 'button';
    build.textContent = api.t('build');
    if (!this.premium) build.innerHTML += lock;
    build.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(dock, 'gateBuilder'); return; }
      self._startBuilder();
    });
    row.appendChild(build);

    dock.appendChild(row);
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
    head.append(h, x);
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
        var locked = !self.premium && !self._isFeatured(g);
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
      if (locked) { self._closePanel(); self._gateInline(self._wrap.querySelector('.wdb-dock'), 'gateLibrary'); return; }
      self._closePanel();
      self._setGrid(g);
    });
    return tile;
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
      var srow = api.el('div', 'wdb-chippick');
      var shapes = ['circle', 'square', 'rectangle', 'triangle', 'hexagon', 'star', 'heart'];
      this._pickShape = this._pickShape || 'circle';
      shapes.forEach(function (sh) {
        var b = api.el('button', 'wdb-shapechip' + (self._pickShape === sh ? ' active' : ''));
        b.type = 'button';
        b.innerHTML = self._shapeSVG({ shape: sh, color: 'teal', size: 'lg', fill: 'filled' });
        b.addEventListener('click', function () { self._pickShape = sh; self._renderPicker(); });
        srow.appendChild(b);
      });
      body.appendChild(srow);
      var crow = api.el('div', 'wdb-chippick');
      var colors = ['teal', 'coral', 'honey', 'plum'];
      this._pickColor = this._pickColor || 'coral';
      colors.forEach(function (cn) {
        var b = api.el('button', 'wdb-colorchip' + (self._pickColor === cn ? ' active' : ''));
        b.type = 'button';
        b.style.background = self.COLORS[cn];
        b.setAttribute('aria-label', cn);
        b.addEventListener('click', function () { self._pickColor = cn; self._renderPicker(); });
        crow.appendChild(b);
      });
      body.appendChild(crow);
      var place2 = api.el('button', 'wdb-big coral');
      place2.type = 'button';
      place2.textContent = api.t('place');
      place2.addEventListener('click', function () {
        self._placeCell({ t: 'shape', shape: self._pickShape, color: self._pickColor, size: 'lg', fill: 'filled' });
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
          if (self._pickArr === 'scatter' && nn !== 4 && nn !== 12) return;
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

/* per-tool styling: STAGE ONLY + the sanctioned body class */
(function injectCSS() {
  var css = ''
  + 'body.wdb-wide .lcs-app{max-width:min(1080px,96vw);}'
  + 'body.wdb-wide #lcs-root{height:100%;min-height:0;}'
  + '@media (max-width:560px){body.wdb-wide{overflow-y:auto;}body.wdb-wide #lcs-root{height:auto;}}'
  + '@media (max-width:480px){body.wdb-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}}'
  + '.wdb-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;height:100%;min-height:0;}'

  /* stage + grid */
  + '.wdb-stage{flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center;}'
  + '.wdb-grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;'
  +   'gap:clamp(10px,1.8vmin,18px);height:100%;aspect-ratio:1/1;max-width:100%;max-height:100%;}'
  + '.wdb-cell{position:relative;background:#FFFEFB;border:none;border-radius:18px;min-width:0;min-height:0;'
  +   'cursor:pointer;overflow:hidden;display:grid;place-items:center;padding:5%;'
  +   'box-shadow:0 1px 3px rgba(20,30,28,.08),0 6px 16px rgba(20,30,28,.09);'
  +   'transition:transform .18s var(--lcs-ease),box-shadow .18s var(--lcs-ease);}'
  /* lifted = chosen for discussion — teal ring, NEVER green, no check */
  + '.wdb-cell[aria-pressed="true"]{transform:translateY(-10px) scale(1.03);'
  +   'box-shadow:0 4px 10px rgba(20,30,28,.10),0 20px 36px rgba(20,30,28,.16),0 0 0 3px var(--lcs-structure);}'
  + '.wdb-cell.speaking{box-shadow:0 4px 10px rgba(20,30,28,.10),0 20px 36px rgba(20,30,28,.16),'
  +   '0 0 0 3px var(--lcs-structure),0 0 22px 6px rgba(242,120,75,.28);}'

  /* cell content */
  + '.wdb-cc{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;'
  +   'width:100%;height:100%;min-height:0;pointer-events:none;}'
  + '.wdb-num{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(64px,19vmin,158px);'
  +   'line-height:1;color:var(--lcs-structure);}'
  + '.wdb-num.two{font-size:clamp(52px,16vmin,126px);}'
  + '.wdb-num.three{font-size:clamp(44px,12vmin,98px);}'
  + '.wdb-wordcell{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(30px,7vmin,64px);'
  +   'color:var(--lcs-structure);text-align:center;overflow-wrap:anywhere;}'
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
  + '.wdb-ear{position:absolute;top:8px;inset-inline-end:8px;width:44px;height:44px;display:grid;'
  +   'place-items:center;border-radius:50%;background:#F2784B;color:#fff;border:none;cursor:pointer;'
  +   'box-shadow:0 3px 0 0 #C9502A;opacity:0;transform:scale(.8);pointer-events:none;'
  +   'transition:opacity .14s var(--lcs-ease),transform .14s var(--lcs-ease);}'
  + '.wdb-ear:active{transform:translateY(2px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.wdb-cell[aria-pressed="true"] .wdb-ear{opacity:1;transform:scale(1);pointer-events:auto;}'
  + '.wdb-ear.speaking{animation:wdbSpeak .9s ease-in-out infinite;}'
  + '@keyframes wdbSpeak{0%,100%{transform:scale(1);}50%{transform:scale(1.1);}}'

  /* the reveal band — parchment, honey; identical for all four */
  + '.wdb-reason{position:absolute;left:0;right:0;bottom:0;max-height:38%;overflow:hidden;'
  +   'background:#FDF0DC;border-top:2px solid #F2C879;padding:7px 10px;'
  +   'font-family:var(--lcs-font-body);font-weight:800;font-size:clamp(14px,2.2vmin,20px);'
  +   'line-height:1.25;color:#2B2622;text-align:center;'
  +   'transform:translateY(102%);transition:transform .32s var(--lcs-ease);}'
  + '.wdb-cell.revealed .wdb-reason{transform:translateY(0);}'
  + '.wdb-grid.stagger .wdb-cell:nth-child(2) .wdb-reason{transition-delay:70ms;}'
  + '.wdb-grid.stagger .wdb-cell:nth-child(3) .wdb-reason{transition-delay:140ms;}'
  + '.wdb-grid.stagger .wdb-cell:nth-child(4) .wdb-reason{transition-delay:210ms;}'
  /* all four revealed → the shared honey warmth (never green, never per-cell) */
  + '.wdb-grid.all-revealed .wdb-cell{box-shadow:0 1px 3px rgba(20,30,28,.08),'
  +   '0 4px 20px rgba(242,200,121,.5),0 0 0 3px rgba(242,200,121,.85);transition:box-shadow .6s var(--lcs-ease);}'
  + '.wdb-closing{font-family:var(--lcs-font-display);font-weight:800;font-size:clamp(17px,2.8vmin,24px);'
  +   'color:var(--lcs-structure);background:#FDF0DC;border:2px solid #F2C879;border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 22px;cursor:pointer;min-height:46px;}'

  /* stem bar */
  + '.wdb-stembar{min-height:0;max-width:720px;text-align:center;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:clamp(15px,2.4vmin,21px);color:var(--lcs-ink);opacity:0;'
  +   'transition:opacity .2s var(--lcs-ease);}'
  + '.wdb-stembar.show{opacity:1;min-height:1.4em;}'

  /* dock */
  + '.wdb-dock{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.wdb-namechip{font-family:var(--lcs-font-body);font-weight:800;font-size:13px;color:var(--lcs-ink-soft);}'
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
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;font-size:16px;'
  +   'box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.wdb-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);}'
  + '.wdb-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.wdb-big:disabled{opacity:.5;cursor:default;}'

  /* gate */
  + '.wdb-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;margin:4px auto;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.wdb-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'
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
  + '.wdb-bandlbl{font-family:var(--lcs-font-body);font-weight:800;font-size:12.5px;text-transform:uppercase;'
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

  /* phone */
  + '@media (max-width:560px){'
  +   '.wdb-stage{min-height:300px;}'
  +   '.wdb-grid{aspect-ratio:1/1;width:100%;height:auto;gap:10px;}'
  +   '.wdb-cell[aria-pressed="true"]{transform:translateY(-6px) scale(1.02);}'
  +   '.wdb-num{font-size:clamp(48px,17vmin,96px);}'
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
     The grid is `aspect-ratio:1/1` inside a flex stage, so it grows until
     EITHER the card width or the stage height stops it — raising the card cap
     alone genuinely scales the four cells, because everything inside them is
     a percentage. The one thing that is NOT is the numeral: its clamp caps at
     158px and 19vmin computes 274 at 1440, so it sits pinned and would have
     stayed the same size in a cell half the screen wide. All three length
     variants are ramped — a two- or three-digit number carries its own clamp
     and would otherwise fall behind the single digits. */
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.wdb-wide .lcs-app{max-width:min(1192px,96vw);}'
  +   'body.wdb-wide .wdb-num{font-size:clamp(64px,19vmin,196px);}'
  +   'body.wdb-wide .wdb-num.two{font-size:clamp(52px,16vmin,156px);}'
  +   'body.wdb-wide .wdb-num.three{font-size:clamp(44px,12vmin,122px);}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.wdb-wide .lcs-app{max-width:min(1560px,96vw);}'
  +   'body.wdb-wide .wdb-num{font-size:clamp(64px,19vmin,244px);}'
  +   'body.wdb-wide .wdb-num.two{font-size:clamp(52px,16vmin,194px);}'
  +   'body.wdb-wide .wdb-num.three{font-size:clamp(44px,12vmin,152px);}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.wdb-wide .lcs-app{max-width:min(1752px,96vw);}'
  +   'body.wdb-wide .wdb-num{font-size:clamp(64px,19vmin,280px);}'
  +   'body.wdb-wide .wdb-num.two{font-size:clamp(52px,16vmin,222px);}'
  +   'body.wdb-wide .wdb-num.three{font-size:clamp(44px,12vmin,174px);}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
