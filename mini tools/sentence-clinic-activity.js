/* =====================================================================
   sentence-clinic-activity.js — ACTIVITY #176 of the one-by-one rebuild:
   "Dr. Plume's Sentence Clinic" (L.2.1 · L.2.2) → THE LISTENING LINE.
   Model: sentence-clinic-core.js; patients: sentence-clinic-data.js.
   Design: docs/activities-rebuild/designs/176-sentence-clinic.md
   ---------------------------------------------------------------------
   A sentence card lies on Dr. Plume's clinic bed. The child picks a tool
   from the tray — a full stop, a question mark (Level 3 also "!"),
   scissors (Level 2), and at Level 3 the word tools: add a word, take a
   word out, swap two words, change a word — and mends the sentence. Check
   is the LISTEN: a pen draws the Listening Line under the words, one beat
   per word; at every end it does what is there against the sentence's
   tune — it RESTS on a full stop, HOLDS OPEN on a question mark, SPIKES on
   "!", KINKS on the wrong mark, RUNS OFF where no mark is, KNOTS where two
   thoughts have no stop between them, SAGS where a stop cuts a thought;
   at Level 3 it leaves a FLAT gap for a missing word, a DOUBLE beat for a
   word too many, a BACKWARD beat for a word out of place, an OFF-KEY beat
   for a wrong form. Miss 1 freezes those marks; miss 2 spotlights the
   first one and wiggles the tool that mends it. A stop's next word gets
   its capital by itself (capitals are never the task — row 182).
   Next appears .OK_MS after success.
   ===================================================================== */
var SentenceClinicActivity = {
  id: 'sentence-clinic-activity',
  /* the drawn apparatus (the bed, the word tiles, the line, the tools): declared for the hierarchy audit */
  apparatusClasses: ['sc-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Dr. Plume's Sentence Clinic","de":"Dr. Plumes Satzklinik","fr":"La clinique des phrases du Dr Plume","es":"La clínica de oraciones de la Dra. Plume","pt":"A Clínica de Frases da Dra. Plume","it":"La clinica delle frasi della Dott.ssa Plume","nl":"Dr. Plumes zinnenkliniek","sv":"Doktor Fjäders meningsklinik","da":"Doktor Fjers sætningsklinik","no":"Doktor Fjærs setningsklinikk","fi":"Tohtori Sulan lauseklinikka"},
    instruction: {"en":"Pick a tool, mend the sentence, then let Dr. Plume listen.","de":"Wähle ein Werkzeug, verbessere den Satz und lass Dr. Plume zuhören.","fr":"Choisis un outil, soigne la phrase, puis laisse le Dr Plume écouter.","es":"Elige una herramienta, cura la oración y deja que la Dra. Plume escuche.","pt":"Escolha uma ferramenta, cure a frase e deixe a Dra. Plume escutar.","it":"Scegli uno strumento, cura la frase e lascia ascoltare la Dott.ssa Plume.","nl":"Kies een gereedschap, maak de zin beter en laat Dr. Plume luisteren.","sv":"Välj ett verktyg, laga meningen och låt Doktor Fjäder lyssna.","da":"Vælg et værktøj, ret sætningen, og lad Doktor Fjer lytte.","no":"Velg et verktøy, rett setningen og la Doktor Fjær lytte.","fi":"Valitse työkalu, korjaa lause ja anna Tohtori Sulan kuunnella."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    qOne: {"en":"Listen with Dr. Plume: give every sentence the mark it needs.","de":"Hör mit Dr. Plume zu: Gib jedem Satz das Zeichen, das er braucht.","fr":"Écoute avec le Dr Plume : donne à chaque phrase le signe qu’il lui faut.","es":"Escucha con la Dra. Plume: ponle a cada oración el signo que necesita.","pt":"Escute com a Dra. Plume: dê a cada frase o sinal de que ela precisa.","it":"Ascolta con la Dott.ssa Plume: dai a ogni frase il segno che le serve.","nl":"Luister met Dr. Plume: geef elke zin het teken dat hij nodig heeft.","sv":"Lyssna med Doktor Fjäder: ge varje mening det tecken den behöver.","da":"Lyt med Doktor Fjer: giv hver sætning det tegn, den skal have.","no":"Lytt med Doktor Fjær: gi hver setning tegnet den trenger.","fi":"Kuuntele Tohtori Sulan kanssa: anna jokaiselle lauseelle sen tarvitsema merkki."},
    qTwo: {"en":"Listen with Dr. Plume: where does the first sentence stop?","de":"Hör mit Dr. Plume zu: Wo hört der erste Satz auf?","fr":"Écoute avec le Dr Plume : où s’arrête la première phrase ?","es":"Escucha con la Dra. Plume: ¿dónde termina la primera oración?","pt":"Escute com a Dra. Plume: onde termina a primeira frase?","it":"Ascolta con la Dott.ssa Plume: dove finisce la prima frase?","nl":"Luister met Dr. Plume: waar houdt de eerste zin op?","sv":"Lyssna med Doktor Fjäder: var slutar den första meningen?","da":"Lyt med Doktor Fjer: hvor slutter den første sætning?","no":"Lytt med Doktor Fjær: hvor slutter den første setningen?","fi":"Kuuntele Tohtori Sulan kanssa: mihin ensimmäinen lause loppuu?"},
    qThree: {"en":"Listen with Dr. Plume: make the sentence sound right.","de":"Hör mit Dr. Plume zu: Sorg dafür, dass der Satz richtig klingt.","fr":"Écoute avec le Dr Plume : répare la phrase pour qu’elle sonne juste.","es":"Escucha con la Dra. Plume: arregla la oración para que suene bien.","pt":"Escute com a Dra. Plume: conserte a frase para ela soar certa.","it":"Ascolta con la Dott.ssa Plume: sistema la frase perché suoni giusta.","nl":"Luister met Dr. Plume: zorg dat de zin goed klinkt.","sv":"Lyssna med Doktor Fjäder: gör så att meningen låter rätt.","da":"Lyt med Doktor Fjer: få sætningen til at lyde rigtigt.","no":"Lytt med Doktor Fjær: få setningen til å høres riktig ut.","fi":"Kuuntele Tohtori Sulan kanssa: korjaa lause niin, että se kuulostaa oikealta."},
    hintEmpty: {"en":"Pick a tool first — Dr. Plume needs to hear a change.","de":"Wähl zuerst ein Werkzeug – Dr. Plume muss eine Änderung hören.","fr":"Choisis d’abord un outil : le Dr Plume doit entendre un changement.","es":"Primero elige una herramienta: la Dra. Plume necesita oír un cambio.","pt":"Primeiro escolha uma ferramenta: a Dra. Plume precisa ouvir uma mudança.","it":"Prima scegli uno strumento: la Dott.ssa Plume deve sentire un cambiamento.","nl":"Kies eerst een gereedschap: Dr. Plume moet een verandering horen.","sv":"Välj ett verktyg först – Doktor Fjäder behöver höra en ändring.","da":"Vælg først et værktøj – Doktor Fjer skal høre en ændring.","no":"Velg et verktøy først – Doktor Fjær må høre en endring.","fi":"Valitse ensin työkalu – Tohtori Sulan pitää kuulla muutos."},
    hintMiss1: {"en":"Listen again: the line stumbles where the sentence still hurts.","de":"Hör noch einmal hin: Die Linie stolpert, wo der Satz noch wehtut.","fr":"Écoute encore : la ligne trébuche là où la phrase a encore mal.","es":"Escucha otra vez: la línea tropieza donde la oración todavía duele.","pt":"Escute de novo: a linha tropeça onde a frase ainda dói.","it":"Ascolta di nuovo: la linea inciampa dove la frase fa ancora male.","nl":"Luister nog eens: de lijn struikelt waar de zin nog pijn doet.","sv":"Lyssna igen: linjen snubblar där meningen fortfarande gör ont.","da":"Lyt igen: linjen snubler, hvor sætningen stadig gør ondt.","no":"Lytt igjen: linja snubler der setningen fortsatt gjør vondt.","fi":"Kuuntele uudestaan: viiva kompastuu siinä, missä lause on vielä kipeä."},
    hintKnot: {"en":"Two thoughts are squashed together here. Where does the first one end?","de":"Hier sind zwei Gedanken zusammengequetscht. Wo endet der erste?","fr":"Deux idées sont collées ici. Où finit la première ?","es":"Aquí hay dos ideas apretadas. ¿Dónde termina la primera?","pt":"Aqui tem duas ideias espremidas juntas. Onde termina a primeira?","it":"Qui due pensieri sono schiacciati insieme. Dove finisce il primo?","nl":"Hier zitten twee gedachten tegen elkaar. Waar houdt de eerste op?","sv":"Här är två tankar hopklämda. Var slutar den första?","da":"Her er to tanker klemt sammen. Hvor slutter den første?","no":"Her er to tanker klemt sammen. Hvor slutter den første?","fi":"Tässä on kaksi ajatusta puristettu yhteen. Mihin ensimmäinen loppuu?"},
    hintMiss2: {"en":"Try the tool that is wiggling, right here.","de":"Probier das Werkzeug, das wackelt – genau hier.","fr":"Essaie l’outil qui bouge, juste ici.","es":"Prueba la herramienta que se mueve, justo aquí.","pt":"Tente a ferramenta que está balançando, bem aqui.","it":"Prova lo strumento che si muove, proprio qui.","nl":"Probeer het gereedschap dat wiebelt, precies hier.","sv":"Prova verktyget som vickar, precis här.","da":"Prøv værktøjet, der vrikker, lige her.","no":"Prøv verktøyet som vrikker, akkurat her.","fi":"Kokeile heiluvaa työkalua juuri tässä."},
    hintSag: {"en":"This stop cuts a thought in half. Tap it to take it away.","de":"Dieses Zeichen schneidet einen Gedanken entzwei. Tipp es an, um es wegzunehmen.","fr":"Ce signe coupe une idée en deux. Touche-le pour l’enlever.","es":"Este signo corta una idea a la mitad. Tócalo para quitarlo.","pt":"Este sinal corta uma ideia no meio. Toque nele para tirar.","it":"Questo segno taglia un pensiero a metà. Toccalo per toglierlo.","nl":"Dit teken knipt een gedachte doormidden. Tik erop om het weg te halen.","sv":"Det här tecknet klipper en tanke mitt itu. Tryck på det för att ta bort det.","da":"Dette tegn klipper en tanke over. Tryk på det for at fjerne det.","no":"Dette tegnet klipper en tanke i to. Trykk på det for å ta det bort.","fi":"Tämä merkki katkaisee ajatuksen kahtia. Poista se napauttamalla."},
    hintPick: {"en":"Choose the word that fits.","de":"Wähle das Wort, das passt.","fr":"Choisis le mot qui convient.","es":"Elige la palabra que va.","pt":"Escolha a palavra que combina.","it":"Scegli la parola giusta.","nl":"Kies het woord dat past.","sv":"Välj ordet som passar.","da":"Vælg det ord, der passer.","no":"Velg ordet som passer.","fi":"Valitse sana, joka sopii."},
    hintSwap: {"en":"Now tap the word to swap it with.","de":"Tipp jetzt das Wort an, mit dem es tauschen soll.","fr":"Touche maintenant le mot avec lequel l’échanger.","es":"Ahora toca la palabra con la que la cambias.","pt":"Agora toque na palavra que vai trocar de lugar com ela.","it":"Ora tocca la parola con cui scambiarla.","nl":"Tik nu op het woord waarmee het moet ruilen.","sv":"Tryck nu på ordet det ska byta plats med.","da":"Tryk nu på det ord, det skal bytte plads med.","no":"Trykk nå på ordet det skal bytte plass med.","fi":"Napauta nyt sanaa, jonka kanssa se vaihtaa paikkaa."},
    ok: {"en":"Now it sounds right: “{s}”","de":"Jetzt klingt es richtig: „{s}“","fr":"Maintenant, ça sonne juste : « {s} »","es":"Ahora suena bien: «{s}»","pt":"Agora soa certo: “{s}”","it":"Ora suona giusta: «{s}»","nl":"Nu klinkt het goed: ‘{s}’","sv":"Nu låter det rätt: ”{s}”","da":"Nu lyder det rigtigt: »{s}«","no":"Nå høres det riktig ut: «{s}»","fi":"Nyt se kuulostaa oikealta: ”{s}”"},
    okTwo: {"en":"Two thoughts, two sentences.","de":"Zwei Gedanken, zwei Sätze.","fr":"Deux idées, deux phrases.","es":"Dos ideas, dos oraciones.","pt":"Duas ideias, duas frases.","it":"Due pensieri, due frasi.","nl":"Twee gedachten, twee zinnen.","sv":"Två tankar, två meningar.","da":"To tanker, to sætninger.","no":"To tanker, to setninger.","fi":"Kaksi ajatusta, kaksi lausetta."},
    setLevel: {"en":"What to fix","de":"Was verbessern","fr":"Quoi soigner","es":"Qué arreglar","pt":"O que consertar","it":"Cosa sistemare","nl":"Wat verbeteren","sv":"Vad ska lagas","da":"Hvad skal rettes","no":"Hva skal rettes","fi":"Mitä korjataan"},
    lvOne: {"en":"Which mark?","de":"Welches Zeichen?","fr":"Quel signe ?","es":"¿Qué signo?","pt":"Qual sinal?","it":"Quale segno?","nl":"Welk teken?","sv":"Vilket tecken?","da":"Hvilket tegn?","no":"Hvilket tegn?","fi":"Mikä merkki?"},
    lvTwo: {"en":"Where does it end?","de":"Wo endet der Satz?","fr":"Où finit la phrase ?","es":"¿Dónde termina?","pt":"Onde termina?","it":"Dove finisce?","nl":"Waar eindigt de zin?","sv":"Var slutar meningen?","da":"Hvor slutter sætningen?","no":"Hvor slutter setningen?","fi":"Mihin lause loppuu?"},
    lvThree: {"en":"Does it sound right?","de":"Klingt der Satz richtig?","fr":"Ça sonne juste ?","es":"¿Suena bien?","pt":"Soa certo?","it":"Suona giusta?","nl":"Klinkt de zin goed?","sv":"Låter meningen rätt?","da":"Lyder sætningen rigtigt?","no":"Høres setningen riktig ut?","fi":"Kuulostaako lause oikealta?"},
    setLine: {"en":"The line","de":"Die Linie","fr":"La ligne","es":"La línea","pt":"A linha","it":"La linea","nl":"De lijn","sv":"Linjen","da":"Linjen","no":"Linja","fi":"Viiva"},
    lnCheck: {"en":"Plays when I check","de":"Läuft beim Prüfen","fr":"Joue quand je vérifie","es":"Suena al comprobar","pt":"Toca quando eu verifico","it":"Parte quando verifico","nl":"Speelt als ik controleer","sv":"Spelas när jag kontrollerar","da":"Spiller, når jeg tjekker","no":"Spilles når jeg sjekker","fi":"Soi, kun tarkistan"},
    lnFirst: {"en":"Shows the tune first","de":"Zeigt zuerst die Melodie","fr":"Montre d’abord la mélodie","es":"Muestra primero la melodía","pt":"Mostra a melodia antes","it":"Mostra prima la melodia","nl":"Laat eerst de melodie zien","sv":"Visar melodin först","da":"Viser melodien først","no":"Viser melodien først","fi":"Näyttää sävelmän ensin"},
    aFull: {"en":"Period","de":"Punkt","fr":"Point","es":"Punto","pt":"Ponto final","it":"Punto","nl":"Punt","sv":"Punkt","da":"Punktum","no":"Punktum","fi":"Piste"},
    aQuest: {"en":"Question mark","de":"Fragezeichen","fr":"Point d’interrogation","es":"Signos de interrogación","pt":"Ponto de interrogação","it":"Punto interrogativo","nl":"Vraagteken","sv":"Frågetecken","da":"Spørgsmålstegn","no":"Spørsmålstegn","fi":"Kysymysmerkki"},
    aExcl: {"en":"Exclamation mark","de":"Ausrufezeichen","fr":"Point d’exclamation","es":"Signos de exclamación","pt":"Ponto de exclamação","it":"Punto esclamativo","nl":"Uitroepteken","sv":"Utropstecken","da":"Udråbstegn","no":"Utropstegn","fi":"Huutomerkki"},
    aCut: {"en":"Scissors","de":"Schere","fr":"Ciseaux","es":"Tijeras","pt":"Tesoura","it":"Forbici","nl":"Schaar","sv":"Sax","da":"Saks","no":"Saks","fi":"Sakset"},
    aIns: {"en":"Add a word","de":"Wort einfügen","fr":"Ajouter un mot","es":"Agregar una palabra","pt":"Pôr uma palavra","it":"Aggiungere una parola","nl":"Woord toevoegen","sv":"Lägg till ett ord","da":"Tilføj et ord","no":"Legg til et ord","fi":"Lisää sana"},
    aLift: {"en":"Take a word out","de":"Wort herausnehmen","fr":"Enlever un mot","es":"Quitar una palabra","pt":"Tirar uma palavra","it":"Togliere una parola","nl":"Woord weghalen","sv":"Ta bort ett ord","da":"Fjern et ord","no":"Ta bort et ord","fi":"Poista sana"},
    aSwap: {"en":"Change the order","de":"Reihenfolge ändern","fr":"Changer l’ordre","es":"Cambiar el orden","pt":"Trocar a ordem","it":"Cambiare l’ordine","nl":"Volgorde veranderen","sv":"Byt ordning","da":"Byt rækkefølge","no":"Bytt rekkefølge","fi":"Vaihda järjestystä"},
    aWheel: {"en":"Change the word","de":"Wort verändern","fr":"Changer le mot","es":"Cambiar la palabra","pt":"Trocar a palavra","it":"Cambiare la parola","nl":"Woord veranderen","sv":"Byt ord","da":"Skift ordet","no":"Bytt ordet","fi":"Vaihda sanan muoto"},
    aWord: {"en":"Word: {w}","de":"Wort: {w}","fr":"Mot : {w}","es":"Palabra: {w}","pt":"Palavra: {w}","it":"Parola: {w}","nl":"Woord: {w}","sv":"Ord: {w}","da":"Ord: {w}","no":"Ord: {w}","fi":"Sana: {w}"},
    aGap: {"en":"After “{w}”","de":"Nach „{w}“","fr":"Après « {w} »","es":"Después de «{w}»","pt":"Depois de “{w}”","it":"Dopo «{w}»","nl":"Na ‘{w}’","sv":"Efter ”{w}”","da":"Efter »{w}«","no":"Etter «{w}»","fi":"Sanan ”{w}” jälkeen"},
    aPutBack: {"en":"Put back “{w}”","de":"„{w}“ zurücklegen","fr":"Remettre « {w} »","es":"Devolver «{w}»","pt":"Pôr de volta “{w}”","it":"Rimettere «{w}»","nl":"‘{w}’ terugzetten","sv":"Lägg tillbaka ”{w}”","da":"Læg »{w}« tilbage","no":"Legg «{w}» tilbake","fi":"Palauta ”{w}”"},
    aTrouble: {"en":"The line stumbles after “{w}”.","de":"Die Linie stolpert nach „{w}“.","fr":"La ligne trébuche après « {w} ».","es":"La línea tropieza después de «{w}».","pt":"A linha tropeça depois de “{w}”.","it":"La linea inciampa dopo «{w}».","nl":"De lijn struikelt na ‘{w}’.","sv":"Linjen snubblar efter ”{w}”.","da":"Linjen snubler efter »{w}«.","no":"Linja snubler etter «{w}».","fi":"Viiva kompastuu sanan ”{w}” jälkeen."}
  },/*STRINGS-END*/
  defaults: { level: 'two', line: 'check' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'one', labelKey: 'lvOne' }, { value: 'two', labelKey: 'lvTwo' }, { value: 'three', labelKey: 'lvThree' }] },
    { key: 'line', type: 'choice', labelKey: 'setLine', options: [{ value: 'check', labelKey: 'lnCheck' }, { value: 'first', labelKey: 'lnFirst' }] }
  ],
  OK_MS: 500, FAST: false,
  BEAT_MS: 260,
  Q_KEY: { one: 'qOne', two: 'qTwo', three: 'qThree' },
  TOOL_KEY: { '.': 'aFull', '?': 'aQuest', '!': 'aExcl', cut: 'aCut', ins: 'aIns', lift: 'aLift', swap: 'aSwap', wheel: 'aWheel' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._prev = null; this._pass = 0;
    this._timers = []; this._ro = null; this._view = {};
    injectSentenceClinicCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._level()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return SentenceClinicCore.levelOf(this._setting('level')); },
  _tuneFirst: function () { return this._setting('line') === 'first'; },
  _loc: function () { return SentenceClinicCore.locOf(this.api && this.api.lang); },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var lv = this._level();
    if (!this._pool || this._poolKey !== lv) { var n = SentenceClinicCore.pool(this._loc(), lv).length, p = []; for (var i = 0; i < n; i++) p.push(i); this._pool = p; this._poolKey = lv; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SentenceClinicCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(n, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }, lv = this._level(); this._pa = pa;
    return {
      id: 'sentence-clinic.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t(this.Q_KEY[this.st.level]); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = SentenceClinicCore.newState(this._loc(), this._level(), k);
    var r = this.st.round, opts = r.options ? r.options.slice() : null;
    if (opts) for (var i = opts.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = opts[i]; opts[i] = opts[j]; opts[j] = t; }
    this._view = { tool: null, swapFrom: null, drawer: null, opts: opts, playing: false, events: null, frozen: false, spot: null, wiggle: null, note: '', soft: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) { var t = this.nextTask({ index: 0 }); t.setup(this); } this._render2(); this._watchWidth(); },
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
    var wrap = api.el('div', 'sc-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="sc-bed" data-qa="bed"></div><div class="sc-drawer" data-qa="drawer"></div><div class="sc-tray" data-qa="tray"></div><p class="sc-hint" data-qa="hint" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-k]'); if (!b || b.disabled || !wrap.contains(b)) return;
      var k = b.getAttribute('data-k');
      if (k === 'listen') self._check();
      else if (k.indexOf('tool-') === 0) self._pickTool(k.slice(5));
      else if (k.indexOf('gap-') === 0) self._tapGap(k.slice(4) === 'end' ? 'end' : +k.slice(4));
      else if (k.indexOf('w-') === 0) self._tapWord(+k.slice(2));
      else if (k.indexOf('opt-') === 0) self._pickOption(+k.slice(4));
      else if (k.indexOf('back-') === 0) self._putBack(+k.slice(5));
    });
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { self._view.tool = null; self._view.swapFrom = null; self._view.drawer = null; self._paint(); }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); self._check(); }
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width(), wide = W >= 600, cramp = W < 340;
    this._g = { W: W, wide: wide, cramp: cramp };
    this._wrap.setAttribute('lang', this._loc());
    this._wrap.className = 'sc-wrap is-' + st.level + (wide ? ' is-wide' : ' is-narrow') + (cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (v.tool ? ' has-tool tool-' + this._toolCls(v.tool) : '') + (v.spot != null ? ' is-spot' : '') + (v.playing ? ' is-playing' : '');
    this._paintBed(); this._paintDrawer(); this._paintTray();
    var h = this._qs('.sc-hint');
    h.textContent = v.note || ''; h.className = 'sc-hint' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _toolCls: function (t) { return { '.': 'stop', '?': 'ask', '!': 'excl' }[t] || t; },
  /* the words as they read now: capitals rise after a stop; es ¿ ¡ open a sentence that ends in ? ! */
  _words: function () {
    var st = this.st, loc = st.loc, C = SentenceClinicCore, out = [];
    if (st.level === 'three') {
      st.words.forEach(function (w, i) { out.push({ w: w.w, i: i, lead: '' }); });
      if (loc === 'es' && (st.mark === '?' || st.mark === '!') && out.length) out[0].lead = st.mark === '?' ? '¿' : '¡';
      return out;
    }
    var r = st.round, start = 0;
    r.tokens.forEach(function (t, i) {
      var cap = i === 0 || !!st.marks[i - 1];
      out.push({ w: cap ? C.cap(t, loc) : t, i: i, lead: '' });
      if (st.marks[i] || i === r.tokens.length - 1) {
        if (loc === 'es' && (st.marks[i] === '?' || st.marks[i] === '!')) out[start].lead = st.marks[i] === '?' ? '¿' : '¡';
        start = i + 1;
      }
    });
    return out;
  },
  /* the events of the last listen, by place */
  _evAt: function () {
    var v = this._view, gap = {}, word = {};
    (v.events || []).forEach(function (e, n) { e.n = n; if (e.type === 'offkey' || e.type === 'backbeat' || e.type === 'doublebeat') word[e.at] = e; else gap[e.at] = e; });
    return { gap: gap, word: word };
  },
  _isTrouble: function (e) { return !!e && ['kink', 'runoff', 'knot', 'sag', 'flatgap', 'doublebeat', 'backbeat', 'offkey'].indexOf(e.type) >= 0; },
  /* the tune drawn faintly before Check (setting "Shows the tune first") */
  _tuneAt: function () {
    var st = this.st, o = {};
    if (!this._tuneFirst() || st.level === 'three') return o;
    st.round.units.forEach(function (u) { o[u.to] = u.tune; });
    return o;
  },
  _paintBed: function () {
    var st = this.st, v = this._view, el = this._qs('.sc-bed'), self = this, C = SentenceClinicCore;
    var words = this._words(), ev = this._evAt(), show = !!v.events, n = words.length, tune = this._tuneAt();
    var targets = st.level === 'three' ? null : C.targets(st);
    var html = '<div class="sc-line-row">';
    words.forEach(function (x, idx) {
      var i = x.i, we = show ? ev.word[i] : null, order = idx;
      var beat = self._beat(we, show, order);
      var isTile = st.level === 'three';
      var tcls = 'sc-tile' + (v.swapFrom === i ? ' is-sel' : '') + (st.level === 'three' && C.wheelAt(st) === i && v.tool === 'wheel' ? ' is-target' : '') + (we && self._isTrouble(we) && (v.frozen || v.playing) ? ' is-bad' : '') + (v.spot === 'w' + i ? ' is-spot' : '');
      html += '<span class="sc-u"><span class="sc-w">' + (isTile
        ? '<button type="button" class="' + tcls + '" data-k="w-' + i + '" aria-label="' + self._esc(self._t('aWord', { w: x.w })) + '"' + (st.done ? ' disabled' : '') + '>' + self._esc(x.lead + x.w) + '</button>'
        : '<span class="' + tcls + '">' + self._esc(x.lead + x.w) + '</span>') + beat + '</span>';
      /* the gap after this word */
      var g = i, isEnd = idx === n - 1, key = st.level === 'three' ? (isEnd ? 'end' : g) : g;
      var ge = show ? ev.gap[st.level === 'three' ? (isEnd ? 'end' : g) : g] : null;
      var mark = st.level === 'three' ? (isEnd ? st.mark : null) : st.marks[g];
      var cutHere = st.level === 'two' && st.cuts[g];
      var clickable = !st.done && (st.level === 'three' ? (isEnd || v.tool === 'ins') : targets.indexOf(g) >= 0);
      var piece = self._end(ge, show, order + 0.5, tune[g]);
      var mk = mark ? (st.loc === 'fr' && mark !== '.' ? ' ' : '') + mark : '';
      var gcls = 'sc-gap' + (mark ? ' has-mark' : '') + (cutHere ? ' is-cut' : '') + (clickable ? ' is-live' : '') + (isEnd ? ' is-end' : '') + (ge && self._isTrouble(ge) && (v.frozen || v.playing) ? ' is-bad' : '') + (v.spot === 'g' + key ? ' is-spot' : '');
      var lab = self._t('aGap', { w: x.w }) + (mark ? ' ' + mark : '');
      html += clickable
        ? '<button type="button" class="' + gcls + '" data-k="gap-' + key + '" aria-label="' + self._esc(lab) + '"><span class="sc-mk">' + self._esc(mk) + '</span>' + piece + '</button>'
        : '<span class="' + gcls + '"><span class="sc-mk">' + self._esc(mk) + '</span>' + piece + '</span>';
      html += '</span>';
    });
    html += '</div>';
    if (st.level === 'three' && st.lifted.length) {
      html += '<div class="sc-lifted">' + st.lifted.map(function (x, j) { return '<button type="button" class="sc-ghost" data-k="back-' + j + '" aria-label="' + self._esc(self._t('aPutBack', { w: x.w })) + '"' + (st.done ? ' disabled' : '') + '>' + self._esc(x.w) + '</button>'; }).join('') + '</div>';
    }
    el.innerHTML = '<div class="sc-badge" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#146B5E"/><path d="M6 21h7l3-7 5 14 4-10 3 3h6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' + html;
    el.className = 'sc-bed' + (st.done ? ' is-cured' : '');
  },
  /* one beat under a word: a bump; off-key = jagged; backward = an arrowhead pointing back; double = two bumps */
  _beat: function (e, show, order) {
    var t = e ? e.type : 'beat', bad = this._isTrouble(e), d;
    if (t === 'offkey') d = 'M0 14 L18 6 L32 15 L48 3 L64 15 L80 5 L100 14';
    else if (t === 'backbeat') d = 'M100 14 Q50 2 0 14 M14 6 L0 14 L16 18';
    else if (t === 'doublebeat') d = 'M0 14 Q25 2 50 14 Q75 2 100 14';
    else d = 'M0 14 Q50 4 100 14';
    var cls = 'sc-beat' + (show ? ' is-drawn' : '') + (bad ? ' is-bad' : '');
    return '<svg class="' + cls + '" viewBox="0 0 100 22" preserveAspectRatio="none" aria-hidden="true" style="animation-delay:' + (this.FAST ? 0 : Math.round(order * this.BEAT_MS)) + 'ms"><path d="' + d + '"/></svg>';
  },
  /* the line in a gap: rest-curl, open hook, spike, kink, run-off, knot, sag, flat gap — or the faint tune before Check */
  _end: function (e, show, order, tune) {
    var t = e ? e.type : null, d = 'M0 14 H100', cls = 'sc-end';
    if (show && t) {
      d = { rest: 'M0 14 C30 14 50 16 62 12 C74 7 90 9 84 15 C80 19 70 16 74 13', hook: 'M0 14 C30 14 55 8 72 3 C82 0 92 3 88 9', spike: 'M0 14 L40 1 L58 16 L100 14',
        kink: 'M0 14 L20 3 L40 18 L60 2 L80 16 L100 6', runoff: 'M0 14 H100', knot: 'M0 14 C30 14 70 -4 56 10 C44 22 20 8 50 6 C76 4 80 14 100 14', sag: 'M0 14 Q50 30 100 14',
        flatgap: 'M0 14 H100' }[t] || d;
      cls += ' is-drawn is-' + t + (this._isTrouble(e) ? ' is-bad' : '');
    } else if (show) cls += ' is-drawn';
    else if (tune) { d = tune === 'A' ? 'M0 14 C40 14 70 6 92 2' : 'M0 10 C40 10 70 16 92 16'; cls += ' is-tune'; }
    return '<svg class="' + cls + '" viewBox="0 0 100 26" preserveAspectRatio="none" aria-hidden="true" style="animation-delay:' + (this.FAST ? 0 : Math.round(order * this.BEAT_MS)) + 'ms"><path d="' + d + '"/></svg>';
  },
  /* the word drawer (add a word / change a word) */
  _paintDrawer: function () {
    var v = this._view, el = this._qs('.sc-drawer'), self = this;
    if (!v.drawer || this.st.done) { el.innerHTML = ''; el.className = 'sc-drawer'; return; }
    el.className = 'sc-drawer is-open';
    el.innerHTML = v.opts.map(function (o, j) { return '<button type="button" class="sc-opt" data-k="opt-' + j + '">' + self._esc(o) + '</button>'; }).join('');
  },
  _tools: function () {
    var st = this.st;
    if (st.level === 'one') return ['.', '?'];
    if (st.level === 'two') return ['.', '?', 'cut'];
    return ['.', '?', '!', 'ins', 'lift', 'swap', 'wheel'];
  },
  _toolOn: function (t) { var k = this.st.round.kind; return !(t === 'ins' && k !== 'ins') && !(t === 'wheel' && k !== 'form'); },
  _glyph: function (t) {
    if (t === '.' || t === '?' || t === '!') return '<span class="sc-glyph">' + t + '</span>';
    var d = { cut: '<circle cx="8" cy="18" r="4"/><circle cx="8" cy="6" r="4"/><path d="M11 8 L22 17 M11 16 L22 7"/>',
      ins: '<path d="M5 17 L12 6 L19 17"/><path d="M12 6 V2"/>',
      lift: '<path d="M12 20 V6 M6 11 L12 5 L18 11"/><path d="M5 22 H19" stroke-dasharray="2 3"/>',
      swap: '<path d="M4 9 H18 M14 5 L18 9 L14 13"/><path d="M20 15 H6 M10 11 L6 15 L10 19"/>',
      wheel: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22"/>' }[t];
    return '<svg class="sc-ico" viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  },
  _paintTray: function () {
    var st = this.st, v = this._view, el = this._qs('.sc-tray'), self = this;
    var html = '<div class="sc-tools">' + this._tools().map(function (t) {
      var on = self._toolOn(t);
      return '<button type="button" class="sc-tool tool-' + self._toolCls(t) + (v.tool === t ? ' is-held' : '') + (v.wiggle === t ? ' is-wiggle' : '') + '" data-k="tool-' + t + '" aria-label="' + self._esc(self._t(self.TOOL_KEY[t])) + '" aria-pressed="' + (v.tool === t) + '"' + (st.done || !on || v.playing ? ' disabled' : '') + '>' + self._glyph(t) + '</button>';
    }).join('') + '</div>';
    html += '<button type="button" class="sc-listen" data-k="listen"' + (st.done || v.playing ? ' disabled' : '') + '><svg viewBox="0 0 34 20" aria-hidden="true"><path d="M1 14 Q6 4 11 14 Q16 4 21 14 C25 14 28 12 30 9 C32 6 34 8 32 12" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span></button>';
    el.innerHTML = html;
  },

  /* ---------------- the hand ---------------- */
  _clearShown: function () { var v = this._view; v.events = null; v.frozen = false; v.spot = null; v.wiggle = null; v.note = ''; },
  _pickTool: function (t) {
    var v = this._view; if (this.st.done || v.playing) return;
    v.tool = v.tool === t ? null : t; v.swapFrom = null; v.drawer = null;
    v.note = ''; this.api.sound(500); this._paint();
  },
  _tapGap: function (g) {
    var st = this.st, v = this._view, C = SentenceClinicCore;
    if (st.done || v.playing) return;
    var t = v.tool, changed = false;
    if (st.level === 'three') {
      if (t === 'ins' && g !== 'end') { v.drawer = { type: 'ins', g: g }; v.note = this._t('hintPick'); v.soft = true; this._paint(); return; }
      if (t === 'ins' && g === 'end') { v.drawer = { type: 'ins', g: st.words.length - 1 }; v.note = this._t('hintPick'); v.soft = true; this._paint(); return; }
      if (g === 'end' && (t === '.' || t === '?' || t === '!')) changed = C.setMark(st, 'end', t);
      else if (g === 'end' && !t && st.mark) changed = C.setMark(st, 'end', st.mark);
    } else if (t === 'cut') changed = C.cut(st, g);
    else if (t === '.' || t === '?') changed = C.setMark(st, g, t);
    else if (!t && st.marks[g]) changed = C.setMark(st, g, st.marks[g]);
    else if (!t && st.cuts[g]) changed = C.cut(st, g);
    if (changed) { this._clearShown(); this.api.sound(t === 'cut' ? 260 : 420); }
    this._paint();
  },
  _tapWord: function (i) {
    var st = this.st, v = this._view, C = SentenceClinicCore, changed = false;
    if (st.done || v.playing || st.level !== 'three') return;
    if (v.tool === 'lift') changed = C.lift(st, i);
    else if (v.tool === 'swap') {
      if (v.swapFrom == null) { v.swapFrom = i; v.note = this._t('hintSwap'); v.soft = true; this._paint(); return; }
      changed = C.swap(st, v.swapFrom, i); v.swapFrom = null;
    } else if (v.tool === 'wheel' && C.wheelAt(st) === i) { v.drawer = { type: 'wheel' }; v.note = this._t('hintPick'); v.soft = true; this._paint(); return; }
    if (changed) { this._clearShown(); this.api.sound(380); }
    this._paint();
  },
  _pickOption: function (j) {
    var st = this.st, v = this._view, C = SentenceClinicCore, w = v.opts[j], changed = false;
    if (!v.drawer || st.done) return;
    if (v.drawer.type === 'wheel') changed = C.setForm(st, w); else changed = C.insertAt(st, v.drawer.g, w);
    v.drawer = null;
    if (changed) { this._clearShown(); this.api.sound(440); }
    this._paint();
  },
  _putBack: function (j) { if (SentenceClinicCore.unlift(this.st, j)) { this._clearShown(); this.api.sound(360); } this._paint(); },

  /* ---------------- Check = the listen ---------------- */
  _wordBefore: function (e) {
    var st = this.st, w = this._words();
    if (!e) return '';
    if (e.at === 'end') return w.length ? w[w.length - 1].w : '';
    var x = w.filter(function (y) { return y.i === e.at; })[0];
    return x ? x.w : (w[0] ? w[0].w : '');
  },
  _check: function () {
    var st = this.st, v = this._view, C = SentenceClinicCore, self = this;
    if (st.done || v.playing) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'empty') { v.note = this._t('hintEmpty'); v.soft = false; this.api.sound(200); this._paint(); return; }
    v.tool = null; v.swapFrom = null; v.drawer = null; v.note = ''; v.events = res.events; v.frozen = false; v.spot = null; v.wiggle = null;
    var beats = this._words().length;
    var finish = function () {
      v.playing = false;
      if (res.result === 'ok') { self._success(); return; }
      var f = res.first;
      v.frozen = true; v.soft = false;
      if (st.help) {
        v.spot = f ? (f.type === 'offkey' || f.type === 'backbeat' || f.type === 'doublebeat' ? 'w' + f.at : 'g' + f.at) : null;
        v.wiggle = C.toolFor(st, f);
        v.note = f && f.type === 'sag' ? self._t('hintSag') : self._t('hintMiss2');
      } else v.note = f && f.type === 'knot' ? self._t('hintKnot') : f && f.type === 'sag' ? self._t('hintSag') : self._t('hintMiss1');
      self.api.sound(150); self._paint();
      self.api.announce(self._t('aTrouble', { w: self._wordBefore(f) }) + ' ' + v.note);
    };
    this.api.sound(300);
    if (this.FAST) { finish(); return; }
    v.playing = true; this._paint();
    this._later(finish, this.BEAT_MS * (beats + 1) + 200);
  },
  _success: function () {
    var st = this.st, v = this._view, self = this;
    var s = SentenceClinicCore.render(st);
    var msg = this._t('ok', { s: s }) + (st.level === 'two' ? ' ' + this._t('okTwo') : '');
    v.note = ''; v.frozen = false;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(660); this._later(function () { self.api.sound(880); }, 160);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'ui', text: s, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectSentenceClinicCSS() {
  if (typeof document === 'undefined' || document.getElementById('sc-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sc-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;} .sc-wrap:focus{outline:none;}'
  /* the bed: a cream card on two teal legs, lying a little tilted; cured, it sits up */
  + '.sc-bed{position:relative;padding:18px 18px 22px 64px;border-radius:16px;background:#FFFDF6;box-shadow:0 0 0 3px #146B5E,0 10px 0 -4px #D9CFB8;transform:rotate(-1.2deg);transition:transform .45s ease;min-height:150px;}'
  + '.sc-bed::before,.sc-bed::after{content:"";position:absolute;bottom:-16px;width:12px;height:16px;background:#146B5E;border-radius:0 0 4px 4px;} .sc-bed::before{left:40px;} .sc-bed::after{right:40px;}'
  + '.sc-bed.is-cured{transform:rotate(0) translateY(-6px);}'
  + '.sc-badge{position:absolute;left:14px;top:16px;width:40px;height:40px;} .sc-badge svg{width:100%;height:100%;} .sc-bed.is-cured .sc-badge{animation:scPulse 1.8s ease-in-out 3;} @keyframes scPulse{50%{transform:scale(1.12)}}'
  + '.sc-line-row{display:flex;flex-wrap:wrap;align-items:flex-start;row-gap:8px;}'
  + '.sc-u{display:inline-flex;align-items:flex-start;flex:0 0 auto;} .sc-w{position:relative;display:inline-block;padding-bottom:24px;}'
  + '.sc-tile{display:inline-block;padding:2px 7px;border:2px solid #2B2B2B;border-radius:10px;background:#FFF8EA;font:800 30px/1.25 ' + B + ';color:#2B2B2B;white-space:nowrap;min-height:44px;}'
  + 'button.sc-tile{cursor:pointer;min-width:44px;text-align:center;} button.sc-tile:focus-visible{outline:3px solid #F2784B;outline-offset:2px;} button.sc-tile:disabled{cursor:default;}'
  + '.sc-tile.is-sel{background:#E3F2EE;box-shadow:0 0 0 3px #146B5E;} .sc-tile.is-target{box-shadow:0 0 0 3px #146B5E;}'
  + '.sc-wrap.tool-lift button.sc-tile,.sc-wrap.tool-swap button.sc-tile{box-shadow:0 0 0 2px rgba(20,107,94,.45);}'
  /* the gaps: invisible until a tool is held; the mark sits in them; tap zone 44 px */
  + '.sc-gap{position:relative;display:inline-block;min-width:14px;padding:0 0 24px;border:0;background:none;font:inherit;color:#146B5E;text-align:center;vertical-align:top;}'
  + 'button.sc-gap{min-width:44px;min-height:44px;margin:0 -15px;z-index:2;cursor:pointer;border-radius:8px;} button.sc-gap:focus-visible{outline:3px solid #F2784B;outline-offset:-2px;}'
  + '.sc-wrap.has-tool button.sc-gap.is-live{background:rgba(20,107,94,.10);box-shadow:inset 0 0 0 2px rgba(20,107,94,.55);}'
  + '.sc-wrap.is-one button.sc-gap.is-live,.sc-wrap.is-three button.sc-gap.is-end{box-shadow:inset 0 0 0 2px rgba(20,107,94,.35);}'
  + '.sc-mk{display:block;height:44px;font:900 34px/44px ' + H + ';color:#146B5E;white-space:pre;}'
  + '.sc-gap.is-cut .sc-mk::before{content:"";display:inline-block;width:2px;height:30px;margin:7px 6px 0;border-left:3px dashed #146B5E;}'
  + '.sc-gap.has-mark,.sc-gap.is-cut{min-width:30px;} button.sc-gap.has-mark,button.sc-gap.is-cut{min-width:44px;margin:0 -4px 0 -6px;} .sc-gap.has-mark .sc-mk{text-align:left;padding-left:9px;}'
  /* the Listening Line: a beat under every word, a shape in every gap */
  + '.sc-beat{position:absolute;left:0;right:0;bottom:0;width:100%;height:22px;overflow:visible;} .sc-end{position:absolute;left:0;right:0;bottom:-2px;width:100%;height:26px;overflow:visible;}'
  + '.sc-beat path,.sc-end path{fill:none;stroke:#C9C1AE;stroke-width:3;stroke-dasharray:3 6;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round;}'
  + '.sc-beat.is-drawn path,.sc-end.is-drawn path{stroke:#146B5E;stroke-width:4;stroke-dasharray:none;}'
  + '.sc-wrap.is-playing .sc-beat.is-drawn,.sc-wrap.is-playing .sc-end.is-drawn{opacity:0;animation:scDraw .26s ease forwards;}'
  + '@keyframes scDraw{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}'
  + '.sc-beat.is-bad path,.sc-end.is-bad path{stroke:#E2603A;}'
  + '.sc-end.is-runoff path{stroke-dasharray:4 5;} .sc-gap.is-end .sc-end.is-runoff{right:-60%;width:auto;}'
  + '.sc-end.is-tune path{stroke:#9FC7BE;stroke-dasharray:2 5;}'
  + '.sc-gap.is-bad::after,.sc-tile.is-bad::after{content:"";position:absolute;left:50%;bottom:-6px;width:30px;height:30px;margin-left:-15px;border:3px solid rgba(226,96,58,.55);border-radius:50%;animation:scRing 1.4s ease-in-out infinite;pointer-events:none;}'
  + '.sc-tile{position:relative;} @keyframes scRing{50%{transform:scale(1.25);opacity:.4}}'
  + '.sc-wrap.is-spot .sc-line-row .sc-w,.sc-wrap.is-spot .sc-line-row .sc-gap{opacity:.55;transition:opacity .3s;} .sc-wrap.is-spot .sc-line-row .sc-w:has(.is-spot),.sc-wrap.is-spot .sc-line-row .sc-gap.is-spot{opacity:1;}'
  + '.sc-gap.is-spot,.sc-tile.is-spot{box-shadow:0 0 0 3px #F2784B;border-radius:8px;} button.sc-gap.is-spot{min-width:44px;margin:0 4px;}'
  + '.sc-lifted{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;} .sc-ghost{min-height:44px;padding:4px 12px;border:2px dashed #8A7A5C;border-radius:10px;background:none;font:700 20px/1 ' + B + ';color:#8A7A5C;cursor:pointer;}'
  /* the drawer */
  + '.sc-drawer{display:none;} .sc-drawer.is-open{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}'
  + '.sc-opt{min-height:52px;min-width:96px;padding:6px 16px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 0 0 2px #146B5E,0 4px 0 #146B5E;font:800 24px/1 ' + B + ';color:#2B2B2B;cursor:pointer;} .sc-opt:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  /* the tray */
  + '.sc-tray{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;}'
  + '.sc-tools{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
  + '.sc-tool{width:56px;height:56px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:0 0 0 2px #C9A26E,0 4px 0 #C9A26E;color:#146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .06s;}'
  + '.sc-tool:focus-visible{outline:3px solid #F2784B;outline-offset:3px;} .sc-tool:disabled{opacity:.35;cursor:default;}'
  + '.sc-tool.is-held{transform:translateY(-8px);box-shadow:0 0 0 3px #146B5E,0 8px 0 #146B5E;background:#E3F2EE;}'
  + '.sc-tool.is-wiggle{animation:scWiggle .5s ease-in-out infinite;} @keyframes scWiggle{25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}'
  + '.sc-glyph{font:900 38px/1 ' + H + ';} .sc-ico{width:30px;height:30px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;}'
  + '.sc-listen{display:flex;align-items:center;gap:8px;min-height:52px;padding:8px 22px;border:0;border-radius:999px;background:#146B5E;color:#fff;font:800 19px/1 ' + H + ';cursor:pointer;box-shadow:0 3px 0 #0C4A41;} .sc-listen svg{width:34px;height:20px;} .sc-listen:disabled{opacity:.5;cursor:default;} .sc-listen:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '.sc-hint{margin:0;min-height:1.3em;font:700 clamp(14px, 1.4vw + 9.5px, 20px)/1.3 ' + B + ';color:#146B5E;text-align:center;} .sc-hint.is-hint{color:#A3401F;} .sc-hint:empty{display:none;}'
  /* phones */
  + '.sc-wrap.is-narrow{gap:9px;} .sc-wrap.is-narrow .sc-bed{padding:12px 10px 16px 50px;min-height:0;} .sc-wrap.is-narrow .sc-badge{left:8px;top:12px;width:34px;height:34px;}'
  + '.sc-wrap.is-narrow .sc-tile{font-size:24px;padding:3px 6px;} .sc-wrap.is-narrow .sc-mk{font-size:30px;}'
  + '.sc-wrap.is-narrow .sc-tool{width:50px;height:50px;} .sc-wrap.is-narrow .sc-tools{gap:8px;} .sc-wrap.is-narrow .sc-opt{font-size:20px;min-width:80px;}'
  + '.sc-wrap.is-cramp .sc-w,.sc-wrap.is-cramp .sc-gap{padding-bottom:20px;} .sc-wrap.is-cramp .sc-beat{height:18px;} .sc-wrap.is-cramp .sc-line-row{row-gap:5px;} .sc-wrap.is-cramp .sc-tile{font-size:21px;padding:1px 5px;} .sc-wrap.is-cramp span.sc-tile{min-height:40px;} .sc-wrap.is-cramp .sc-bed{padding:10px 8px 14px 8px;} .sc-wrap.is-cramp .sc-badge{display:none;} .sc-wrap.is-cramp .sc-tool{width:44px;height:44px;} .sc-wrap.is-cramp .sc-tools{gap:6px;} .sc-wrap.is-cramp .sc-tray{gap:8px;} .sc-wrap.is-cramp .sc-glyph{font-size:30px;} .sc-wrap.is-cramp .sc-ico{width:26px;height:26px;} .sc-wrap.is-cramp .sc-listen{min-height:48px;padding:6px 12px;font-size:16px;gap:6px;} .sc-wrap.is-cramp .sc-listen svg{width:26px;}'
  /* solved on a phone: the tray steps back so the success line and Next stay above the fold */
  + '.sc-wrap.is-narrow.is-done .sc-tray{display:none;}'
  + '.sc-wrap.is-narrow.is-done .sc-tile{font-size:18px;padding:0 2px;min-height:0;border-color:transparent;background:none;} .sc-wrap.is-narrow.is-done .sc-mk{height:26px;font-size:22px;line-height:26px;} .sc-wrap.is-narrow.is-done .sc-w,.sc-wrap.is-narrow.is-done .sc-gap{padding-bottom:14px;} .sc-wrap.is-narrow.is-done .sc-beat{height:12px;} .sc-wrap.is-narrow.is-done .sc-end{height:16px;} .sc-wrap.is-narrow.is-done .sc-bed{padding-top:8px;padding-bottom:12px;}'
  + '@media (prefers-reduced-motion:reduce){.sc-wrap *{animation:none !important;transition:none !important;opacity:1 !important;}}';
  var s = document.createElement('style'); s.id = 'sc-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.SentenceClinicActivity = SentenceClinicActivity;
