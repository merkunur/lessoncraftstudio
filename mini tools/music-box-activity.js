/* =====================================================================
   music-box-activity.js — ACTIVITY #29 of the one-by-one rebuild:
   "Quick Facts to 5" (K.OA.A.5) — THE MUSIC-BOX STRIP.
   Design sheet: docs/activities-rebuild/designs/029-ten-frame.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: each answer bar is a note as long as its number (the
   longer, the lower). A round's facts are drawn so their answers, in
   order, are the notes of a real song phrase. A right bar punches a hole
   in its row of a music-box strip; a wrong bar punches nothing — the
   fact's own rods lie beside it, and the stick-out is the size of the
   error. During a round every bar knocks the same "tok" (the melody
   cannot answer the maths); when the strip is full the crank plays the
   song at its own tempo, never faster for a faster child, and the song's
   picture pops up on the lid. "Music box" is open play.

   ACTIVITY LAYER ONLY: the model is music-box-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity when the
   song has played). Test seams: window.MusicBoxActivity.st / ._order /
   ._pool / .FAST (no playback timing, for the gates).
   ===================================================================== */
'use strict';

var MusicBoxActivity = {
  id: 'music-box',
  apparatusClasses: ['mb-'],

  strings: {
    title:        {en:'Facts to 5',de:'Aufgaben bis 5',fr:'Calculs jusqu’à 5',it:'Calcoli fino a 5',es:'Operaciones hasta 5',pt:'Contas até 5',nl:'Sommen tot 5',sv:'Uträkningar upp till 5',da:'Regnestykker op til 5',no:'Regnestykker opp til 5',fi:'Laskut 5:een asti'},
    instruction:  {en:'Tap the bar that answers the fact. Every right answer punches a hole — fill the strip, then turn the crank to hear your song!',de:'Tipp auf den Stab, der die Aufgabe löst. Jede richtige Antwort stanzt ein Loch – füll den Streifen und dreh dann die Kurbel, um dein Lied zu hören!',fr:'Touche la lame qui donne la réponse. Chaque bonne réponse perce un trou : remplis la bande, puis tourne la manivelle pour entendre ta chanson !',it:'Tocca la barra che dà la risposta. Ogni risposta giusta fa un buco: riempi la striscia, poi gira la manovella per sentire la tua canzone!',es:'Toca la barra que responde la operación. Cada respuesta correcta perfora un agujero: ¡llena la tira y luego gira la manivela para oír tu canción!',pt:'Toque na barra que responde a conta. Cada resposta certa faz um furo: complete a fita e depois gire a manivela para ouvir sua música!',nl:'Tik op de staaf met het antwoord. Elk goed antwoord prikt een gaatje: vul de strook en draai dan aan de slinger om je liedje te horen!',sv:'Tryck på staven som är svaret. Varje rätt svar stansar ett hål – fyll remsan och veva sedan för att höra din sång!',da:'Tryk på den stav, der er svaret. Hvert rigtigt svar slår et hul – fyld strimlen, og drej så på håndsvinget for at høre din sang!',no:'Trykk på staven som er svaret. Hvert riktig svar slår et hull – fyll strimmelen, og sveiv så for å høre sangen din!',fi:'Napauta sauvaa, joka on laskun vastaus. Jokainen oikea vastaus lyö reiän – täytä nauha ja kierrä sitten kampea, niin kuulet laulusi!'},
    promptTap:    {en:'Tap the bar for the answer.',de:'Tipp auf den Stab mit der Antwort.',fr:'Touche la lame de la réponse.',it:'Tocca la barra della risposta.',es:'Toca la barra de la respuesta.',pt:'Toque na barra da resposta.',nl:'Tik op de staaf met het antwoord.',sv:'Tryck på staven med svaret.',da:'Tryk på staven med svaret.',no:'Trykk på staven med svaret.',fi:'Napauta vastauksen sauvaa.'},
    hintRods:     {en:'Look — the rods and the bar are not the same height.',de:'Schau – die Klötzchen und der Stab sind nicht gleich hoch.',fr:'Regarde : les réglettes et la lame n’ont pas la même hauteur.',it:'Guarda: i regoli e la barra non hanno la stessa altezza.',es:'Mira: las regletas y la barra no tienen la misma altura.',pt:'Olhe: as barrinhas e a barra não têm a mesma altura.',nl:'Kijk: de staafjes en de staaf zijn niet even hoog.',sv:'Titta – klossarna och staven är inte lika höga.',da:'Se – stængerne og staven er ikke lige høje.',no:'Se – klossene og staven er ikke like høye.',fi:'Katso – palikat ja sauva eivät ole yhtä korkeita.'},
    hintCount:    {en:'Count the counters, then tap the bar with that number.',de:'Zähl die Plättchen und tipp dann auf den Stab mit dieser Zahl.',fr:'Compte les jetons, puis touche la lame de ce nombre.',it:'Conta i gettoni, poi tocca la barra di quel numero.',es:'Cuenta las fichas y luego toca la barra de ese número.',pt:'Conte as fichas e depois toque na barra desse número.',nl:'Tel de fiches en tik dan op de staaf met dat getal.',sv:'Räkna markörerna och tryck sedan på staven med det talet.',da:'Tæl brikkerne, og tryk så på staven med det tal.',no:'Tell brikkene, og trykk så på staven med det tallet.',fi:'Laske nappulat ja napauta sitten sen luvun sauvaa.'},
    hintCountLeft:{en:'Count the counters that are left, then tap the bar with that number.',de:'Zähl die Plättchen, die übrig sind, und tipp dann auf den Stab mit dieser Zahl.',fr:'Compte les jetons qui restent, puis touche la lame de ce nombre.',it:'Conta i gettoni che restano, poi tocca la barra di quel numero.',es:'Cuenta las fichas que quedan y luego toca la barra de ese número.',pt:'Conte as fichas que sobraram e depois toque na barra desse número.',nl:'Tel de fiches die over zijn en tik dan op de staaf met dat getal.',sv:'Räkna markörerna som är kvar och tryck sedan på staven med det talet.',da:'Tæl de brikker, der er tilbage, og tryk så på staven med det tal.',no:'Tell brikkene som er igjen, og trykk så på staven med det tallet.',fi:'Laske jäljelle jääneet nappulat ja napauta sitten sen luvun sauvaa.'},
    hintCrank:    {en:'The strip is full — turn the crank!',de:'Der Streifen ist voll – dreh die Kurbel!',fr:'La bande est pleine : tourne la manivelle !',it:'La striscia è piena: gira la manovella!',es:'La tira está llena: ¡gira la manivela!',pt:'A fita está completa: gire a manivela!',nl:'De strook is vol: draai aan de slinger!',sv:'Remsan är full – veva!',da:'Strimlen er fuld – drej på håndsvinget!',no:'Strimmelen er full – sveiv!',fi:'Nauha on täynnä – kierrä kampea!'},
    celebrateSong:{en:'You played {song}! {n} facts, {n} notes.',de:'Du hast {song} gespielt! {n} Aufgaben, {n} Töne.',fr:'Tu as joué {song} ! {n} calculs, {n} notes.',it:'Hai suonato {song}! {n} calcoli, {n} note.',es:'¡Tocaste {song}! {n} operaciones, {n} notas.',pt:'Você tocou {song}! {n} contas, {n} notas.',nl:'Je speelde {song}! {n} sommen, {n} noten.',sv:'Du spelade {song}! {n} uträkningar, {n} toner.',da:'Du spillede {song}! {n} regnestykker, {n} toner.',no:'Du spilte {song}! {n} regnestykker, {n} toner.',fi:'Soitit kappaleen {song}! {n} laskua, {n} säveltä.'},
    celebratePass:{en:'Your music box has played {m} strips!',de:'Deine Spieluhr hat {m} Streifen gespielt!',fr:'Ta boîte à musique a joué {m} bandes !',it:'Il tuo carillon ha suonato {m} strisce!',es:'¡Tu caja de música ya tocó {m} tiras!',pt:'Sua caixinha de música já tocou {m} fitas!',nl:'Je speeldoos heeft {m} stroken gespeeld!',sv:'Din speldosa har spelat {m} remsor!',da:'Din spilledåse har spillet {m} strimler!',no:'Spilledåsen din har spilt {m} strimler!',fi:'Soittorasiasi on soittanut {m} nauhaa!'},
    songFrere:    {en:'Frère Jacques',de:'Bruder Jakob',fr:'Frère Jacques',it:'Fra Martino',es:'Martinillo',pt:'Frei Martinho',nl:'Vader Jacob',sv:'Broder Jakob',da:'Mester Jakob',no:'Fader Jakob',fi:'Jaakko kulta'},
    songOde:      {en:'Ode to Joy',de:'Ode an die Freude',fr:'l’Hymne à la joie',it:'l’Inno alla gioia',es:'el Himno de la alegría',pt:'o Hino da Alegria',nl:'Ode aan de vreugde',sv:'Ode till glädjen',da:'Ode til glæden',no:'Ode til gleden',fi:'Oodi ilolle'},
    songRow:      {en:'Lightly Row',de:'Hänschen klein',fr:'la chanson du bateau',it:'la canzone della barca',es:'la canción del barquito',pt:'a música do barquinho',nl:'het bootjesliedje',sv:'Båtvisan',da:'Bådsangen',no:'Båtsangen',fi:'Venelaulu'},
    songDuck:     {en:'the Duckling Song',de:'Alle meine Entchen',fr:'la chanson des canetons',it:'la canzone degli anatroccoli',es:'la canción de los patitos',pt:'a música dos patinhos',nl:'het eendjesliedje',sv:'Ankvisan',da:'Ællingesangen',no:'Andungesangen',fi:'Ankanpoikalaulu'},
    songBuns:     {en:'Hot Cross Buns',de:'das Brötchenlied',fr:'la chanson des petits pains',it:'la canzone dei panini',es:'la canción de los panecitos',pt:'a música dos pãezinhos',nl:'het broodjesliedje',sv:'Bullvisan',da:'Bollesangen',no:'Bollesangen',fi:'Pullalaulu'},
    songStar:     {en:'Twinkle, Twinkle, Little Star',de:'Funkel, funkel, kleiner Stern',fr:'«\u202fAh\u202f! vous dirai-je, maman\u202f»',it:'Brilla brilla la stellina',es:'Estrellita',pt:'Brilha, brilha, estrelinha',nl:'Twinkel twinkel kleine ster',sv:'Blinka lilla stjärna',da:'Blinke lille stjerne',no:'Blinke, blinke, lille stjerne',fi:'Tuiki tuiki tähtönen'},
    songMoon:     {en:'Au Clair de la Lune',de:'das Mondlied',fr:'Au clair de la lune',it:'la canzone della luna',es:'la canción de la luna',pt:'a música da lua',nl:'het maanliedje',sv:'Månvisan',da:'Månesangen',no:'Månesangen',fi:'Kuulaulu'},
    songLamb:     {en:'Mary Had a Little Lamb',de:'das Lämmchenlied',fr:'la chanson du petit agneau',it:'la canzone dell’agnellino',es:'la canción del corderito',pt:'a música do carneirinho',nl:'het lammetjesliedje',sv:'Lammvisan',da:'Lammesangen',no:'Lammesangen',fi:'Karitsalaulu'},
    crank:        {en:'Turn the crank',de:'Kurbel drehen',fr:'Tourner la manivelle',it:'Gira la manovella',es:'Girar la manivela',pt:'Girar a manivela',nl:'Aan de slinger draaien',sv:'Veva',da:'Drej på håndsvinget',no:'Sveiv',fi:'Kierrä kampea'},
    frameBtn:     {en:'Show the counters',de:'Plättchen zeigen',fr:'Montrer les jetons',it:'Mostra i gettoni',es:'Mostrar las fichas',pt:'Mostrar as fichas',nl:'Fiches laten zien',sv:'Visa markörerna',da:'Vis brikkerne',no:'Vis brikkene',fi:'Näytä nappulat'},
    bar:          {en:'bar {k}',de:'Stab {k}',fr:'lame {k}',it:'barra {k}',es:'barra {k}',pt:'barra {k}',nl:'staaf {k}',sv:'stav {k}',da:'stav {k}',no:'stav {k}',fi:'sauva {k}'},
    factPlus:     {en:'{a} plus {b}',de:'{a} plus {b}',fr:'{a} plus {b}',it:'{a} più {b}',es:'{a} más {b}',pt:'{a} mais {b}',nl:'{a} plus {b}',sv:'{a} plus {b}',da:'{a} plus {b}',no:'{a} pluss {b}',fi:'{a} plus {b}'},
    factMinus:    {en:'{a} minus {b}',de:'{a} minus {b}',fr:'{a} moins {b}',it:'{a} meno {b}',es:'{a} menos {b}',pt:'{a} menos {b}',nl:'{a} min {b}',sv:'{a} minus {b}',da:'{a} minus {b}',no:'{a} minus {b}',fi:'{a} miinus {b}'},
    stripLabel:   {en:'Holes punched: {p} of {n}',de:'Gestanzte Löcher: {p} von {n}',fr:'Trous percés : {p} sur {n}',it:'Buchi fatti: {p} su {n}',es:'Agujeros hechos: {p} de {n}',pt:'Furos feitos: {p} de {n}',nl:'Geprikte gaatjes: {p} van {n}',sv:'Stansade hål: {p} av {n}',da:'Slåede huller: {p} af {n}',no:'Slåtte hull: {p} av {n}',fi:'Lyötyjä reikiä: {p}/{n}'},
    rodsTaller:   {en:'The rods stick out {d} above bar {k}.',de:'Die Klötzchen ragen {d} über Stab {k} hinaus.',fr:'Les réglettes dépassent la lame {k} de {d}.',it:'I regoli superano la barra {k} di {d}.',es:'Las regletas sobresalen {d} por encima de la barra {k}.',pt:'As barrinhas passam {d} da barra {k}.',nl:'De staafjes steken {d} boven staaf {k} uit.',sv:'Klossarna är {d} högre än stav {k}.',da:'Stængerne er {d} højere end stav {k}.',no:'Klossene er {d} høyere enn stav {k}.',fi:'Palikat ovat {d} palikan verran korkeampia kuin sauva {k}.'},
    rodsShorter:  {en:'The rods stop {d} below bar {k}.',de:'Den Klötzchen fehlen {d} bis zu Stab {k}.',fr:'Il manque {d} aux réglettes pour atteindre la lame {k}.',it:'Ai regoli mancano {d} per arrivare alla barra {k}.',es:'A las regletas les faltan {d} para llegar a la barra {k}.',pt:'Faltam {d} para as barrinhas chegarem à barra {k}.',nl:'De staafjes zijn {d} lager dan staaf {k}.',sv:'Klossarna är {d} lägre än stav {k}.',da:'Stængerne er {d} lavere end stav {k}.',no:'Klossene er {d} lavere enn stav {k}.',fi:'Palikat ovat {d} palikan verran matalampia kuin sauva {k}.'},
    play:         {en:'Music box',de:'Spieluhr',fr:'Boîte à musique',it:'Carillon',es:'Caja de música',pt:'Caixinha de música',nl:'Speeldoos',sv:'Speldosa',da:'Spilledåse',no:'Spilledåse',fi:'Soittorasia'},
    playBack:     {en:'Back to the songs',de:'Zurück zu den Liedern',fr:'Retour aux chansons',it:'Torna alle canzoni',es:'Volver a las canciones',pt:'Voltar às músicas',nl:'Terug naar de liedjes',sv:'Tillbaka till sångerna',da:'Tilbage til sangene',no:'Tilbake til sangene',fi:'Takaisin lauluihin'},
    playNote:     {en:'Tap any bars to punch your own tune, then turn the crank.',de:'Tipp auf beliebige Stäbe, um deine eigene Melodie zu stanzen, und dreh dann die Kurbel.',fr:'Touche les lames que tu veux pour percer ta propre mélodie, puis tourne la manivelle.',it:'Tocca le barre che vuoi per bucare la tua melodia, poi gira la manovella.',es:'Toca las barras que quieras para perforar tu propia melodía y luego gira la manivela.',pt:'Toque nas barras que quiser para furar sua própria melodia e depois gire a manivela.',nl:'Tik op staven naar keuze om je eigen melodie te prikken en draai dan aan de slinger.',sv:'Tryck på vilka stavar du vill för att stansa din egen melodi och veva sedan.',da:'Tryk på de stave, du vil, for at slå din egen melodi, og drej så på håndsvinget.',no:'Trykk på stavene du vil, for å slå din egen melodi, og sveiv så.',fi:'Napauta haluamiasi sauvoja ja lyö oma sävelmäsi, kierrä sitten kampea.'},
    playClear:    {en:'New strip',de:'Neuer Streifen',fr:'Nouvelle bande',it:'Nuova striscia',es:'Tira nueva',pt:'Fita nova',nl:'Nieuwe strook',sv:'Ny remsa',da:'Ny strimmel',no:'Ny strimmel',fi:'Uusi nauha'},
    setLevel:     {en:'Level',de:'Stufe',fr:'Niveau',it:'Livello',es:'Nivel',pt:'Nível',nl:'Niveau',sv:'Nivå',da:'Niveau',no:'Nivå',fi:'Taso'},
    to5:          {en:'To 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opp til 5',fi:'5:een asti'},
    to10:         {en:'To 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opp til 10',fi:'10:een asti'},
    setFacts:     {en:'Facts',de:'Aufgaben',fr:'Calculs',it:'Calcoli',es:'Operaciones',pt:'Contas',nl:'Sommen',sv:'Uträkningar',da:'Regnestykker',no:'Regnestykker',fi:'Laskut'},
    both:         {en:'Add and subtract',de:'Plus und minus',fr:'Additions et soustractions',it:'Addizioni e sottrazioni',es:'Sumas y restas',pt:'Adição e subtração',nl:'Plus en min',sv:'Plus och minus',da:'Plus og minus',no:'Pluss og minus',fi:'Yhteen- ja vähennyslaskut'},
    add:          {en:'Add only',de:'Nur plus',fr:'Additions seulement',it:'Solo addizioni',es:'Solo sumas',pt:'Só adição',nl:'Alleen plus',sv:'Bara plus',da:'Kun plus',no:'Bare pluss',fi:'Vain yhteenlaskut'},
    setDisplay:   {en:'Show facts as',de:'Aufgaben zeigen als',fr:'Montrer les calculs en',it:'Mostra i calcoli come',es:'Mostrar las operaciones con',pt:'Mostrar as contas com',nl:'Sommen tonen als',sv:'Visa uträkningar som',da:'Vis regnestykker som',no:'Vis regnestykker som',fi:'Näytä laskut'},
    numbers:      {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Siffror',da:'Tal',no:'Tall',fi:'Numeroina'},
    dots:         {en:'Dots',de:'Punkte',fr:'Points',it:'Pallini',es:'Puntos',pt:'Bolinhas',nl:'Stippen',sv:'Prickar',da:'Prikker',no:'Prikker',fi:'Pisteinä'},
    pictures:     {en:'Pictures',de:'Bilder',fr:'Images',it:'Immagini',es:'Dibujos',pt:'Figuras',nl:'Plaatjes',sv:'Bilder',da:'Billeder',no:'Bilder',fi:'Kuvina'},
    setNotes:     {en:'Notes',de:'Töne',fr:'Notes',it:'Note',es:'Notas',pt:'Notas',nl:'Noten',sv:'Toner',da:'Toner',no:'Toner',fi:'Sävelet'},
    end:          {en:'At the end',de:'Am Schluss',fr:'À la fin',it:'Alla fine',es:'Al final',pt:'No final',nl:'Aan het eind',sv:'På slutet',da:'Til sidst',no:'Til slutt',fi:'Lopussa'},
    go:           {en:'As you go',de:'Gleich beim Tippen',fr:'À chaque réponse',it:'A ogni risposta',es:'Con cada respuesta',pt:'A cada resposta',nl:'Bij elk antwoord',sv:'Vid varje svar',da:'Ved hvert svar',no:'Ved hvert svar',fi:'Joka vastauksella'}
  },

  defaults: { level: 'to5', facts: 'both', display: 'numbers', notes: 'end' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'to5', labelKey: 'to5' }, { value: 'to10', labelKey: 'to10' }] },
    { key: 'facts', type: 'choice', labelKey: 'setFacts', options: [{ value: 'both', labelKey: 'both' }, { value: 'add', labelKey: 'add' }] },
    { key: 'display', type: 'choice', labelKey: 'setDisplay', options: [{ value: 'numbers', labelKey: 'numbers' }, { value: 'dots', labelKey: 'dots' }, { value: 'pictures', labelKey: 'pictures' }] },
    { key: 'notes', type: 'choice', labelKey: 'setNotes', options: [{ value: 'end', labelKey: 'end' }, { value: 'go', labelKey: 'go' }] }
  ],

  FLASH_MS: 1000, IDLE_MS: 8000, FAST: false,
  SONG_KEY: { frere: 'songFrere', ode: 'songOde', row: 'songRow', duck: 'songDuck', buns: 'songBuns', star: 'songStar', moon: 'songMoon', lamb: 'songLamb' },

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._busy = false; this._timers = []; this._ro = null; this._frameAsked = false; this._flash = null; this._lit = null; this._lidOn = false;
    this._themes = {};
    injectMusicBoxCSS();
    if (typeof LCSPictures !== 'undefined') ['fruits', 'christmas', 'vehicles', 'farm animals', 'bakery', 'music', 'space'].forEach(function (dir) {
      LCSPictures.load(dir).then(function (th) { self._themes[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* bare */ });
    });
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var st = self._cur(); if (!st) return;
      if (/^[0-9]$/.test(ev.key)) { var k = ev.key === '0' ? 10 : +ev.key; if (k <= MusicBoxCore.maxBar(st.level)) { self._tap(k); ev.preventDefault(); } }
      else if (ev.key === 'f' || ev.key === 'F') { self._toggleFrame(); ev.preventDefault(); }
      else if (ev.key === 'c' || ev.key === 'C') { self._crank(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    var key = this._poolKeyNow();
    if (this._poolKey !== key) { this._pool = null; this._order = null; this._playing = false; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); return; }
    if (this._wrap) {
      /* one demonstration ring of bar 3 when the Notes setting changes */
      if (this._lastNotes !== this._notes()) { var st = this._cur(); if (st) this.api.sound(MusicBoxCore.barSound(st, 3, this._notes())); }
      this._lastNotes = this._notes();
      this._layout(); this._paint();
    }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },

  /* ---------------- rounds ---------------- */
  _set: function (k, d) { return (this.api && this.api.settings && this.api.settings[k]) || d; },
  _level: function () { return MusicBoxCore.level(this._set('level', 'to5')); },
  _mode: function () { return MusicBoxCore.factsMode(this._set('facts', 'both')); },
  _display: function () { var d = this._set('display', 'numbers'); return d === 'dots' || d === 'pictures' ? d : 'numbers'; },
  _notes: function () { return this._set('notes', 'end') === 'go' ? 'go' : 'end'; },
  _poolKeyNow: function () { return this._level() + '.' + this._mode(); },
  _ensurePool: function () { var key = this._poolKeyNow(); if (!this._pool || this._poolKey !== key) { this._pool = MusicBoxCore.rounds(this._level(), this._mode()); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, self = this;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = MusicBoxCore.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = MusicBoxCore.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    var last = index % n === n - 1;
    var songName = this.api ? this.api.t(this.SONG_KEY[r.song]) : r.song;
    return {
      id: 'music-box.' + r.id,
      promptKey: 'promptTap',
      promptArgs: { song: songName, n: r.notes.length, m: n },
      celebrateKey: MusicBoxCore.celebrateKey(r, last),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool.st = MusicBoxCore.newState(r); tool._round = r; tool._playing = false;
        tool._busy = false; tool._frameAsked = false; tool._flash = null; tool._lit = null; tool._lidOn = false; tool._dip = null;
        tool._armIdle();
      },
      /* this activity presses Check itself when the song has played */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },
  _src: function (pair) { var th = this._themes[pair[0]]; if (!th || typeof LCSPictures === 'undefined') return ''; try { return LCSPictures.url(th, pair[1]); } catch (e) { return ''; } },
  _armIdle: function () { var self = this; if (this._idleT) clearTimeout(this._idleT); this._idleT = setTimeout(function () { if (self._frameBtn && !self._frameAsked) bounce(self._frameBtn, 'mb-pulse'); }, this.IDLE_MS); },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this;
    if (!this.st) { this._round = MusicBoxCore.rounds('to5', 'both')[0]; this.st = MusicBoxCore.newState(this._round); }
    this._lastNotes = this._notes();
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'mb-wrap'); this._wrap = wrap;

    /* the music box: the lid picture, the strip through the comb, the crank */
    var box = api.el('div', 'mb-box'); this._box = box;
    var lid = api.el('div', 'mb-lid'); lid.innerHTML = '<img class="mb-lidpic" alt="" draggable="false">'; this._lid = lid; box.appendChild(lid);
    var stripWrap = api.el('div', 'mb-stripwrap'); stripWrap.setAttribute('role', 'img'); this._stripWrap = stripWrap;
    var strip = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); strip.setAttribute('class', 'mb-strip'); strip.setAttribute('aria-hidden', 'true'); this._strip = strip; stripWrap.appendChild(strip); box.appendChild(stripWrap);
    var comb = api.el('div', 'mb-comb'); comb.setAttribute('aria-hidden', 'true'); comb.innerHTML = '<i></i><i></i><i></i><i></i><i></i>'; box.appendChild(comb);
    var crank = api.el('button', 'mb-crank'); crank.type = 'button'; crank.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#7A5A1C"/><path d="M24 24 L40 12" stroke="#7A5A1C" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="12" r="6" fill="#F2784B" stroke="#2B3A36" stroke-width="2"/></svg>'; crank.addEventListener('click', function () { self._crank(); }); this._crankBtn = crank; box.appendChild(crank);
    wrap.appendChild(box);

    /* the fact card + the five-frame */
    var cardRow = api.el('div', 'mb-cardrow'); this._cardRow = cardRow;
    var card = api.el('div', 'mb-card'); card.setAttribute('role', 'img'); this._card = card; cardRow.appendChild(card);
    var fbtn = api.el('button', 'mb-framebtn'); fbtn.type = 'button'; fbtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 7v10M10 7v10M14 7v10M18 7v10" stroke="currentColor" stroke-width="1.6"/><circle cx="4" cy="12" r="1.4" fill="currentColor"/><circle cx="8" cy="12" r="1.4" fill="currentColor"/></svg>'; fbtn.addEventListener('click', function () { self._toggleFrame(); }); this._frameBtn = fbtn; cardRow.appendChild(fbtn);
    wrap.appendChild(cardRow);
    var frame = api.el('div', 'mb-frame'); frame.setAttribute('aria-hidden', 'true'); this._frame = frame; wrap.appendChild(frame);

    /* the bars */
    var bars = api.el('div', 'mb-bars'); bars.setAttribute('role', 'group'); this._bars = bars; wrap.appendChild(bars);

    var note = api.el('div', 'mb-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var live = api.el('div', 'mb-live'); live.setAttribute('aria-live', 'polite'); this._live = live; wrap.appendChild(live);
    var row = api.el('div', 'mb-actions'); this._actions = row;
    var clearBtn = api.el('button', 'mb-tool mb-clear'); clearBtn.type = 'button'; clearBtn.addEventListener('click', function () { self._clearPlay(); }); this._clearBtn = clearBtn; row.appendChild(clearBtn);
    var playBtn = api.el('button', 'mb-tool mb-playbtn'); playBtn.type = 'button'; playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn; row.appendChild(playBtn);
    wrap.appendChild(row);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _layout: function () {
    var st = this._cur(), lv = st ? st.level : this._level();
    var L = this._L = MusicBoxCore.layout(this._width(), lv), w = this._wrap;
    w.classList.toggle('is-wide', L.mode === 'wide'); w.classList.toggle('is-narrow', L.mode === 'narrow');
    /* on the smallest phones the Music box button becomes a ♪ icon in the fact-card row */
    this._tiny = this._width() < 300; w.classList.toggle('is-tiny', this._tiny);
    if (this._playBtn) { var host = this._tiny ? this._cardRow : this._actions; if (this._playBtn.parentNode !== host) host.appendChild(this._playBtn); }
    w.style.setProperty('--mb-barw', L.barW + 'px'); w.style.setProperty('--mb-block', L.block + 'px');
    w.style.setProperty('--mb-gap', L.gap + 'px'); w.style.setProperty('--mb-disc', L.disc + 'px');
    w.style.setProperty('--mb-crank', L.crank + 'px'); w.style.setProperty('--mb-pic', L.pic + 'px'); w.style.setProperty('--mb-cardf', L.cardFont + 'px');
    this._barsKey = null;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, self = this, C = MusicBoxCore, L = this._L;
    if (!st || !this._wrap) return;
    var w = this._wrap, top = C.maxBar(st.level);
    w.classList.toggle('is-play', !!st.explore);
    w.classList.toggle('is-full', !!st.full);
    w.classList.toggle('is-ring', this._notes() === 'go');
    w.classList.toggle('is-ten', top === 10);

    /* the strip: one row per bar (row 1 at the top), one column per note; punched holes, the position mark */
    var cols = st.explore ? C.PLAY_MAX : st.notes.length, rowsN = top, avail = this._width() - (L.mode === 'wide' ? 140 : 100), colW = Math.max(14, Math.min(40, Math.floor((avail - 16) / cols))), rowH = top === 10 ? (L.mode === 'wide' ? 10 : 8) : (L.mode === 'wide' ? 18 : 12);
    var SW = cols * colW + 16, SH = rowsN * rowH + 12, hole = Math.min(L.hole, rowH - 2, colW - 4), s = '';
    for (var r = 1; r <= rowsN; r++) s += '<line class="mb-guide" x1="4" x2="' + (SW - 4) + '" y1="' + (6 + (r - 0.5) * rowH) + '" y2="' + (6 + (r - 0.5) * rowH) + '"/>';
    for (var c = 0; c < st.punched.length; c++) {
      var k = st.punched[c], cx = 8 + (c + 0.5) * colW, cy = 6 + (k - 0.5) * rowH;
      s += '<circle class="mb-hole' + (this._lit === c ? ' is-lit' : '') + '" cx="' + cx + '" cy="' + cy + '" r="' + hole / 2 + '"/>';
    }
    if (!st.full && !st.done && st.pos < cols) { var px = 8 + (st.pos + 0.5) * colW; s += '<rect class="mb-pos" x="' + (px - colW / 2 + 2) + '" y="2" width="' + (colW - 4) + '" height="' + (SH - 4) + '" rx="4"/>'; }
    this._strip.setAttribute('viewBox', '0 0 ' + SW + ' ' + SH); this._strip.style.width = SW + 'px'; this._strip.style.height = SH + 'px'; this._strip.innerHTML = s;
    this._stripWrap.setAttribute('aria-label', interp(t('stripLabel'), { p: st.punched.length, n: cols }));
    /* the crank: live when the strip is full (or, in play, when anything is punched) */
    var canCrank = !this._busy && !st.done && (st.full || (st.explore && st.punched.length > 0));
    this._crankBtn.disabled = !canCrank; this._crankBtn.classList.toggle('is-ready', canCrank);
    this._crankBtn.setAttribute('aria-label', t('crank')); this._crankBtn.title = t('crank');
    /* the lid picture: closed until the song plays */
    var pic = this._lid.querySelector('.mb-lidpic'), psrc = this._round && !st.explore ? this._src(this._round.pic) : '';
    if (psrc && pic.getAttribute('src') !== psrc) pic.setAttribute('src', psrc);
    this._lid.classList.toggle('is-open', !!(this._lidOn && psrc));
    pic.hidden = !(this._lidOn && psrc);

    /* the fact card */
    /* the card always shows the fact to answer now; the one just answered flashes in the note line */
    var f = st.explore ? null : C.fact(st), disp = this._display();
    this._card.className = 'mb-card is-' + disp;
    var html = '', aria = '';
    if (f) {
      aria = interp(t(f.op === '+' ? 'factPlus' : 'factMinus'), { a: f.a, b: f.b });
      var sign = f.op === '+' ? '+' : '−';
      if (disp === 'numbers') html = '<span class="mb-num">' + f.a + ' ' + sign + ' ' + f.b + '</span>';
      else if (disp === 'dots') html = f.op === '+' ? '<span class="mb-domino">' + pips(f.a, 0) + '<i class="mb-split"></i>' + pips(f.b, 0) + '</span>' : '<span class="mb-domino is-one">' + pips(f.a, f.b) + '</span>';
      else html = this._pictures(f);
    } else if (st.explore) html = '<span class="mb-num mb-free">♪</span>';
    if (this._card.getAttribute('data-h') !== html) { this._card.innerHTML = html; this._card.setAttribute('data-h', html); }
    this._card.setAttribute('aria-label', aria || t('play'));
    this._frameBtn.hidden = !!st.explore || (disp === 'pictures' && top === 10);
    this._frameBtn.setAttribute('aria-label', t('frameBtn')); this._frameBtn.title = t('frameBtn');
    this._frameBtn.setAttribute('aria-pressed', String(!!this._frameAsked));

    /* the five-frame (ten-frame at "to 10"): the fact as counters, never the answer by itself */
    /* at "to 10" the picture card already shows the fact as counters on ten-frames — no second frame */
    var showFrame = f && C.frameOpen(st, this._frameAsked) && !(disp === 'pictures' && top === 10);
    var fh = '';
    if (showFrame) {
      var cells = top === 10 ? 10 : 5, cs = [];
      for (var q = 0; q < cells; q++) cs.push('');
      if (f.op === '+') { for (q = 0; q < f.a; q++) cs[q] = 'a'; for (q = f.a; q < f.a + f.b && q < cells; q++) cs[q] = 'b'; }
      else { for (q = 0; q < f.a; q++) cs[q] = q >= f.a - f.b ? 'off' : 'a'; }
      fh = cs.map(function (x) { return '<i class="mb-cell">' + (x ? '<b class="mb-ctr is-' + x + '"></b>' : '') + '</i>'; }).join('');
    }
    if (this._frame.getAttribute('data-h') !== fh) { this._frame.innerHTML = fh; this._frame.setAttribute('data-h', fh); }
    this._frame.hidden = !showFrame;
    this._frame.classList.toggle('is-ten', top === 10);

    /* the bars: bar k is k blocks tall; the rods beside the bar a miss points to */
    var key = top + '|' + L.barW + '|' + L.rows;
    if (this._barsKey !== key) {
      this._barsKey = key; this._bars.innerHTML = '';
      var perRow = top / L.rows;
      for (var ro = 0; ro < L.rows; ro++) {
        var rowEl = this.api.el('div', 'mb-barrow');
        for (var b = ro * perRow + 1; b <= (ro + 1) * perRow; b++) (function (kk) {
          var bt = self.api.el('button', 'mb-bar'); bt.type = 'button'; bt.setAttribute('data-k', String(kk));
          var blocks = ''; for (var x = 0; x < kk; x++) blocks += '<i class="mb-block' + (x % 2 ? ' is-alt' : '') + (x === 4 && kk > 5 ? ' is-five' : '') + '"></i>';
          bt.innerHTML = '<span class="mb-rod" hidden></span><span class="mb-blocks">' + blocks + '</span><b class="mb-disc">' + kk + '</b>';
          bt.addEventListener('click', function () { self._tap(kk); });
          rowEl.appendChild(bt);
        }(b));
        this._bars.appendChild(rowEl);
      }
    }
    var rb = C.rodBar(st), rods = st.last ? C.rods(st.last.fact) : null, ans = f ? C.answerOf(f) : null;
    [].forEach.call(this._bars.querySelectorAll('.mb-bar'), function (bt) {
      var kk = +bt.getAttribute('data-k');
      bt.disabled = self._busy || !!st.done || (!!st.full && !st.explore);
      bt.setAttribute('aria-label', interp(t('bar'), { k: kk }));
      bt.classList.toggle('is-dip', self._dip === kk);
      var rod = bt.querySelector('.mb-rod');
      if (rods && rb === kk) {
        var rh = '';
        for (var o = 0; o < rods.off; o++) rh += '<i class="mb-rb is-off"></i>';
        rods.kept.forEach(function (n, gi) { for (var m = 0; m < n; m++) rh += '<i class="mb-rb is-' + (gi === 0 ? 'a' : 'b') + '"></i>'; });
        if (rod.getAttribute('data-h') !== rh) { rod.innerHTML = rh; rod.setAttribute('data-h', rh); }
        rod.hidden = false;
      } else { rod.hidden = true; rod.removeAttribute('data-h'); rod.innerHTML = ''; }
    });

    /* the note */
    var h = st.explore ? { key: 'playNote' } : st.full && !st.done ? { key: 'hintCrank' } : C.hint(st);
    var text = h ? interp(t(h.key), h) : '';
    if (!h && this._flash) { var ff = this._flash.fact; text = ff.a + ' ' + (ff.op === '+' ? '+' : '−') + ' ' + ff.b + ' = ' + C.answerOf(ff); h = { good: true }; }
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !!(h && h.wrong));
    this._note.classList.toggle('is-good', !!(h && h.good));
    this._clearBtn.hidden = !st.explore; this._clearBtn.textContent = t('playClear'); this._clearBtn.disabled = this._busy || !st.punched.length;
    var pl = t(st.explore ? 'playBack' : 'play');
    this._playBtn.textContent = this._tiny ? (st.explore ? '↩' : '♪') : pl;
    this._playBtn.setAttribute('aria-label', pl); this._playBtn.title = pl;
    this._playBtn.disabled = this._busy;
  },
  /* pictures: "to 5" — two groups of one library fruit (the taken-away ones crossed); "to 10" — counters
     on two ten-frames labelled by ONE fruit (never shrink library pictures into frame cells) */
  _pictures: function (f) {
    var st = this._cur(), src = this._src(['fruits', this._round ? this._round.fruit : 'apple']), img = function (cls) { return '<i class="mb-fr' + (cls || '') + '">' + (src ? '<img alt="" draggable="false" src="' + src + '">' : '') + '</i>'; };
    if (st.level === 'to10') {
      var fr = function (n, off, cls) { var h = '<span class="mb-tf">'; for (var i = 0; i < 10; i++) h += '<i class="mb-cell">' + (i < n ? '<b class="mb-ctr is-' + (i >= n - off ? 'off' : cls) + '"></b>' : '') + '</i>'; return h + '</span>'; };
      var lab = src ? '<img class="mb-frlabel" alt="" draggable="false" src="' + src + '">' : '';
      return f.op === '+' ? '<span class="mb-pics is-frames">' + lab + fr(f.a, 0, 'a') + '<b class="mb-sign">+</b>' + fr(f.b, 0, 'b') + '</span>' : '<span class="mb-pics is-frames">' + lab + fr(f.a, f.b, 'a') + '</span>';
    }
    var grp = function (n, off) { var h = '<span class="mb-grp">'; for (var i = 0; i < n; i++) h += img(i >= n - off ? ' is-off' : ''); return h + '</span>'; };
    return f.op === '+' ? '<span class="mb-pics">' + grp(f.a, 0) + '<b class="mb-sign">+</b>' + grp(f.b, 0) + '</span>' : '<span class="mb-pics">' + grp(f.a, f.b) + '</span>';
  },

  /* ---------------- the hand ---------------- */
  _tap: function (k) {
    var st = this._cur(), self = this, C = MusicBoxCore;
    if (!st || this._busy || st.done) return;
    var res = C.tap(st, k);
    if (res.act === 'locked') { this.api.sound(150); return; }
    this._armIdle();
    this._dip = k; this._later(function () { if (self._dip === k) { self._dip = null; self._paint(); } }, 170);
    this.api.track('tap', { id: st.id, k: k, ok: res.ok });
    if (res.ok) {
      this.api.sound(C.barSound(st, k, this._notes()));
      this._frameAsked = false;
      if (!st.explore) {
        /* the fact flashes complete for a moment, then the next one slides in */
        this._flash = { fact: res.fact };
        this._later(function () { self._flash = null; self._paint(); }, this._ms(this.FLASH_MS));
      }
      this._paint();
      return;
    }
    this.api.sound(C.barSound(st, k, this._notes()));
    var d = res.diff;
    this._say(interp(this.api.t(d > 0 ? 'rodsTaller' : 'rodsShorter'), { d: Math.abs(d), k: k }));
    this._paint();
  },
  _toggleFrame: function () { var st = this._cur(); if (!st || st.explore || st.done || this._busy) return; this._frameAsked = !this._frameAsked; this.api.sound(520); this._paint(); },
  _say: function (s) { if (this._live) this._live.textContent = s; },
  /* the crank: the strip rolls back through the comb at the song's own tempo; each hole lights and its bar
     rings and dips; the lid picture pops up */
  _crank: function () {
    var st = this._cur(), self = this, C = MusicBoxCore;
    if (!st || this._busy || st.done) return;
    var sched = C.crank(st);
    if (!sched) return;
    this.api.track('crank', { id: st.id, n: sched.length });
    this._busy = true; bounce(this._crankBtn, 'mb-turn'); this._paint();
    var end = sched.length ? sched[sched.length - 1].t + sched[sched.length - 1].dur : 0;
    sched.forEach(function (e) {
      self._later(function () { self._lit = e.col; self._dip = e.bar; self.api.sound(C.freq(st.level, e.bar)); self._paint(); }, self._ms(e.t));
    });
    this._later(function () {
      self._lit = null; self._dip = null;
      if (!st.explore) { self._lidOn = true; bounce(self._lid, 'mb-pop'); }
      self._busy = false; self._paint();
      if (st.done) self._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, self._ms(500));
    }, this._ms(end + 200));
  },

  /* ---------------- free play ---------------- */
  _togglePlay: function () {
    if (this._busy) return;
    this._flash = null; this._lit = null; this._dip = null;
    if (this._playing) { this._playing = false; this._layout(); this._paint(); return; }
    this._playing = true; this._play = MusicBoxCore.newPlay(this._level());
    this._layout(); this._paint();
  },
  _clearPlay: function () { if (!this._playing || this._busy) return; MusicBoxCore.clearPlay(this._play); this.api.sound(330); this._paint(); }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args && args[k] != null) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }
/* pips: a die face for 1–6, two rows of five beyond; the last `off` pips crossed out */
function pips(n, off) {
  var pos = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [0, 2], [2, 0], [2, 2]], 5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]], 6: [[0, 0], [1, 0], [2, 0], [0, 2], [1, 2], [2, 2]] };
  var h = '<span class="mb-die' + (n > 6 ? ' is-many' : '') + '">';
  if (n <= 6) (pos[n] || []).forEach(function (p, i) { h += '<i class="mb-pip' + (i >= n - off ? ' is-off' : '') + '" style="grid-row:' + (p[0] + 1) + ';grid-column:' + (p[1] + 1) + '"></i>'; });
  else for (var i = 0; i < n; i++) h += '<i class="mb-pip' + (i >= n - off ? ' is-off' : '') + '"></i>';
  return h + '</span>';
}

var mbCssDone = false;
function injectMusicBoxCSS() {
  if (mbCssDone || typeof document === 'undefined') return;
  mbCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.mb-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;--mb-ink:#2B3A36;--mb-coral:#F2784B;--mb-teal:#2E9C88;--mb-wood:#B57A45;--mb-barw:96px;--mb-block:34px;--mb-gap:14px;--mb-disc:40px;--mb-crank:56px;--mb-pic:96px;--mb-cardf:56px;}'
  /* the music box */
  + '.mb-box{position:relative;display:flex;align-items:center;gap:8px;padding:10px 10px 10px 12px;border-radius:14px;background:linear-gradient(180deg,#C98D55,var(--mb-wood));box-shadow:inset 0 0 0 3px var(--mb-ink),0 4px 0 #7A4E25;max-width:100%;box-sizing:border-box;}'
  + '.mb-lid{position:absolute;left:50%;top:50%;z-index:4;transform:translate(-50%,-50%);width:calc(var(--mb-pic) + 16px);height:calc(var(--mb-pic) + 12px);border-radius:14px;background:#FFF6DA;box-shadow:inset 0 0 0 3px #B58A2E,0 6px 14px rgba(0,0,0,.2);display:none;place-items:center;}'
  + '.mb-lid.is-open{display:grid;} .mb-lid.mb-pop{animation:mb-popk .4s ease-out both;} @keyframes mb-popk{0%{transform:translate(-50%,-30%) scale(.6);}70%{transform:translate(-50%,-54%) scale(1.06);}100%{transform:translate(-50%,-50%);}}'
  + '.mb-lidpic{width:var(--mb-pic);height:var(--mb-pic);object-fit:contain;} .mb-lidpic[hidden]{display:none;}'
  + '.mb-stripwrap{flex:none;display:flex;max-width:100%;} .mb-strip{flex:none;background:#FFFBF2;border-radius:6px;box-shadow:inset 0 0 0 2px #E2D3B5;max-width:100%;}'
  + '.mb-guide{stroke:#E8DCC4;stroke-width:1;} .mb-hole{fill:var(--mb-ink);} .mb-hole.is-lit{fill:#F2C14E;stroke:#B58A2E;stroke-width:2;}'
  + '.mb-pos{fill:rgba(242,120,75,.08);stroke:var(--mb-coral);stroke-width:2;stroke-dasharray:4 3;}'
  + '.mb-comb{display:flex;flex-direction:column;gap:3px;flex:none;} .mb-comb i{width:22px;height:5px;border-radius:2px;background:linear-gradient(90deg,#D9DEDC,#8C9894);}'
  + '.mb-crank{flex:none;width:var(--mb-crank);height:var(--mb-crank);padding:4px;border:0;border-radius:50%;background:#F4EEE2;box-shadow:inset 0 0 0 2px var(--mb-ink);cursor:pointer;opacity:.5;}'
  + '.mb-crank svg{width:100%;height:100%;display:block;} .mb-crank:disabled{cursor:default;} .mb-crank.is-ready{opacity:1;background:#FFE9A6;box-shadow:inset 0 0 0 3px #B58A2E,0 0 0 4px #FFF1C2;animation:mb-ready 1.2s ease-in-out infinite;}'
  + '@keyframes mb-ready{50%{transform:rotate(-20deg);}} .mb-crank.mb-turn svg{animation:mb-turnk .6s linear 4;} @keyframes mb-turnk{to{transform:rotate(360deg);}}'
  /* the fact card */
  + '.mb-cardrow{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;}'
  + '.mb-card{min-width:200px;min-height:96px;padding:8px 16px;box-sizing:border-box;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 3px var(--mb-ink),0 3px 0 #C9BFA8;display:flex;align-items:center;justify-content:center;max-width:calc(100% - 60px);}'
  + '.mb-num{font:800 var(--mb-cardf)/1 var(--lcs-font-display);color:var(--mb-ink);white-space:nowrap;}'
  + '.mb-domino{display:flex;align-items:center;gap:6px;padding:6px;border-radius:12px;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--mb-ink);}'
  + '.mb-split{width:3px;align-self:stretch;background:var(--mb-ink);border-radius:2px;}'
  + '.mb-die{display:grid;grid-template-columns:repeat(3,18px);grid-template-rows:repeat(3,18px);gap:4px;padding:6px;} .mb-die.is-many{grid-template-columns:repeat(5,16px);grid-template-rows:repeat(2,16px);gap:5px;}'
  + '.mb-pip{width:100%;height:100%;border-radius:50%;background:var(--mb-ink);position:relative;} .mb-pip.is-off{background:#C9CED0;} .mb-pip.is-off::after{content:"";position:absolute;left:-3px;right:-3px;top:50%;height:3px;margin-top:-1.5px;background:var(--mb-coral);transform:rotate(-45deg);border-radius:2px;}'
  + '.mb-pics{display:flex;align-items:center;gap:8px;} .mb-grp{display:grid;grid-template-columns:repeat(3,var(--mb-pic));gap:2px;} .mb-wrap.is-narrow .mb-grp{grid-template-columns:repeat(2,var(--mb-pic));}'
  + '.mb-fr{position:relative;width:var(--mb-pic);height:var(--mb-pic);display:block;} .mb-fr img{width:100%;height:100%;object-fit:contain;display:block;}'
  + '.mb-fr.is-off img{opacity:.45;} .mb-fr.is-off::after{content:"";position:absolute;left:8%;right:8%;top:50%;height:6px;margin-top:-3px;background:var(--mb-coral);border-radius:3px;transform:rotate(-40deg);}'
  + '.mb-sign{font:800 36px/1 var(--lcs-font-display);color:var(--mb-ink);}'
  + '.mb-pics.is-frames{flex-wrap:wrap;justify-content:center;} .mb-frlabel{width:var(--mb-pic);height:var(--mb-pic);object-fit:contain;}'
  + '.mb-tf{display:grid;grid-template-columns:repeat(5,22px);gap:2px;padding:3px;border-radius:6px;box-shadow:inset 0 0 0 2px var(--mb-ink);}'
  + '.mb-framebtn{flex:none;width:48px;height:48px;padding:10px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure,#146B5E);cursor:pointer;} .mb-framebtn[hidden]{display:none;} .mb-framebtn svg{width:100%;height:100%;display:block;}'
  + '.mb-framebtn[aria-pressed="true"]{background:#E3F1EC;} .mb-framebtn.mb-pulse{animation:mb-pulsek .6s ease-in-out 2;} @keyframes mb-pulsek{50%{transform:scale(1.12);box-shadow:0 0 0 4px #CFE3DD;}}'
  + '.mb-frame{display:grid;grid-template-columns:repeat(5,40px);gap:3px;padding:4px;border-radius:8px;box-shadow:inset 0 0 0 3px var(--mb-ink);background:#fff;} .mb-frame[hidden]{display:none;}'
  + '.mb-cell{display:grid;place-items:center;width:100%;aspect-ratio:1;box-shadow:inset 0 0 0 1px #C9BFA8;border-radius:4px;}'
  + '.mb-ctr{width:72%;height:72%;border-radius:50%;} .mb-ctr.is-a{background:var(--mb-coral);} .mb-ctr.is-b{background:var(--mb-teal);} .mb-ctr.is-off{background:#C9CED0;transform:translateY(6px);opacity:.75;}'
  /* the bars */
  + '.mb-bars{display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px 4px 0;border-bottom:6px solid #7A6A58;max-width:100%;}'
  + '.mb-barrow{display:flex;align-items:flex-end;justify-content:center;gap:var(--mb-gap);}'
  + '.mb-bar{position:relative;width:var(--mb-barw);padding:0;border:0;background:none;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:transform .16s;}'
  + '.mb-bar:disabled{cursor:default;} .mb-bar.is-dip{transform:translateY(3px);}'
  + '.mb-blocks{display:flex;flex-direction:column-reverse;width:100%;}'
  + '.mb-block{height:var(--mb-block);box-sizing:border-box;border-radius:6px;background:#FFFBF2;box-shadow:inset 0 0 0 2px var(--mb-ink);position:relative;} .mb-block.is-alt{background:#F6E3B0;}'
  + '.mb-block::after{content:"";position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:#B58A2E;}'
  + '.mb-block.is-five{box-shadow:inset 0 0 0 2px var(--mb-ink),inset 0 3px 0 var(--mb-coral);}'
  + '.mb-disc{display:grid;place-items:center;width:var(--mb-disc);height:var(--mb-disc);margin-top:4px;border-radius:50%;background:#146B5E;color:#fff;font:800 calc(var(--mb-disc) * .62)/1 var(--lcs-font-display);transition:transform .2s;}'
  + '.mb-wrap.is-ring .mb-disc::after{content:"♪";position:absolute;margin:-26px 0 0 26px;font-size:16px;color:#7A5A1C;}'
  + '.mb-rod{position:absolute;right:4px;bottom:calc(var(--mb-disc) + 4px);width:calc(var(--mb-barw) * .34);display:flex;flex-direction:column;z-index:3;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.2));} .mb-rod[hidden]{display:none;}'
  + '.mb-rb{height:var(--mb-block);box-sizing:border-box;border-radius:4px;box-shadow:inset 0 0 0 2px var(--mb-ink);} .mb-rb.is-a{background:var(--mb-coral);} .mb-rb.is-b{background:var(--mb-teal);}'
  + '.mb-rb.is-off{background:#E6E8E7;box-shadow:inset 0 0 0 2px #8C9894;opacity:.8;transform:translateX(5px) rotate(8deg);border-style:dashed;}'
  + '.mb-rod .mb-rb + .mb-rb{margin-top:0;}'
  /* the note and the actions */
  + '.mb-note{box-sizing:border-box;width:100%;max-width:560px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--mb-ink);text-align:center;} .mb-note[hidden]{display:none;}'
  + '.mb-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .mb-note.is-good{border-color:#C9A24A;background:#FFF6DA;font-family:var(--lcs-font-display);font-size:22px;font-weight:800;}'
  + '.mb-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  + '.mb-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}'
  + '.mb-tool{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 15px/1 var(--lcs-font-body);cursor:pointer;} .mb-tool[hidden]{display:none;} .mb-tool:disabled{opacity:.45;cursor:default;}'
  + '.mb-bar:focus-visible,.mb-crank:focus-visible,.mb-framebtn:focus-visible,.mb-tool:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  /* narrow */
  + '.mb-wrap.is-tiny .mb-cardrow .mb-playbtn{width:48px;min-height:48px;padding:0;font-size:24px;flex:none;} .mb-wrap.is-tiny .mb-card{min-width:120px;}'
  + '.mb-wrap.is-narrow{gap:6px;} .mb-wrap.is-narrow .mb-bars{padding-top:4px;} .mb-wrap.is-narrow .mb-note{font-size:15px;line-height:1.3;padding:4px 10px;} .mb-wrap.is-narrow .mb-box{padding:8px;gap:6px;}'
  + '.mb-wrap.is-narrow .mb-comb i{width:14px;} .mb-wrap.is-narrow .mb-card{min-width:150px;min-height:72px;padding:6px 10px;}'
  + '.mb-wrap.is-narrow .mb-die{grid-template-columns:repeat(3,14px);grid-template-rows:repeat(3,14px);gap:3px;} .mb-wrap.is-narrow .mb-die.is-many{grid-template-columns:repeat(5,12px);grid-template-rows:repeat(2,12px);gap:3px;}'
  + '.mb-wrap.is-narrow .mb-frame{grid-template-columns:repeat(5,34px);} .mb-wrap.is-narrow .mb-tf{grid-template-columns:repeat(5,16px);}'
  + '@media (prefers-reduced-motion:reduce){.mb-bar,.mb-crank,.mb-crank svg,.mb-lid,.mb-framebtn,.mb-rb{animation:none!important;transition:none!important;} .mb-rb.is-off{transform:none;}}';
  var style = document.createElement('style');
  style.id = 'mb-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = MusicBoxActivity;
if (typeof window !== 'undefined') window.MusicBoxActivity = MusicBoxActivity;
