/* =====================================================================
   constellation-activity.js — ACTIVITY #4 of the one-by-one rebuild:
   "Count the Stars Awake" (K.CC.A.2) — THE CONSTELLATION THREAD.
   Design sheet: docs/activities-rebuild/004-constellation.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE CONSTELLATION THREAD. A night sky of numbered stars.
   One star is awake — the given number, never 1. The child taps the star
   that comes next: it wakes, a gold thread runs to it, the number is spoken;
   star by star the thread draws a picture (a kite, a cup, a crown …) that
   closes on the last tap. Stars numbered BELOW the start sleep in the same
   sky (1 is always there): tapping one is the slip the standard names and
   the strip says so — "7 comes before 12; you don't have to go back".
   A star too far ahead is "too far, one at a time". Nothing lights for a
   wrong tap. The run so far is read out as chips (7 · 8 · 9). Nothing here
   is drawn by hand: a sky panel, star discs with rays, a thread, chips.

   ACTIVITY LAYER ONLY: the model is constellation-core.js; lcs-shell.js is
   untouched. Test seams: window.ConstellationActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var ConstellationActivity = {
  id: 'constellation',
  apparatusClasses: ['sky-'],

  strings: {
    title:        {en:'Count the Stars Awake',de:'Zähl die Sterne wach',fr:'Réveille les étoiles en comptant',it:'Conta e sveglia le stelle',es:'Cuenta y despierta las estrellas',pt:'Conte e acorde as estrelas',nl:'Tel de sterren wakker',sv:'Räkna stjärnorna vakna',da:'Tæl stjernerne vågne',no:'Tell stjernene våkne',fi:'Laske tähdet hereille'},
    instruction:  {en:'A night sky of numbered stars. One star is awake — count on from it: tap the star that comes next, and the next, until the thread has drawn a picture. You don’t have to start at 1.',de:'Ein Nachthimmel voller Zahlensterne. Ein Stern ist wach – zähle von ihm weiter: Tippe auf den Stern, der als Nächstes kommt, und dann auf den nächsten, bis der Faden ein Bild gezeichnet hat. Du musst nicht bei 1 anfangen.',fr:'Un ciel de nuit plein d’étoiles numérotées. Une étoile est réveillée : continue à compter à partir d’elle. Touche l’étoile qui vient juste après, puis la suivante, jusqu’à ce que le fil ait dessiné une image. Pas besoin de repartir de 1.',it:'Un cielo notturno pieno di stelle numerate. Una stella è sveglia: continua a contare da lì. Tocca la stella che viene dopo, poi la successiva, finché il filo non ha disegnato una figura. Non serve ripartire da 1.',es:'Un cielo nocturno lleno de estrellas con números. Una estrella está despierta: sigue contando desde ella. Toca la estrella que sigue, y luego la siguiente, hasta que el hilo dibuje una figura. No tienes que empezar en 1.',pt:'Um céu noturno cheio de estrelas numeradas. Uma estrela está acordada: continue contando a partir dela. Toque na estrela que vem depois, e na próxima, até o fio desenhar uma figura. Não precisa começar do 1.',nl:'Een nachthemel vol sterren met getallen. Eén ster is wakker: tel vanaf daar verder. Tik op de ster die erna komt, en dan op de volgende, tot de draad een figuur heeft getekend. Je hoeft niet bij 1 te beginnen.',sv:'En natthimmel full av stjärnor med tal. En stjärna är vaken – räkna vidare från den: tryck på stjärnan som kommer efter, och sedan nästa, tills tråden har ritat en bild. Du behöver inte börja på 1.',da:'En nattehimmel fuld af stjerner med tal. Én stjerne er vågen – tæl videre fra den: tryk på den stjerne, der kommer efter, og så den næste, indtil tråden har tegnet et billede. Du behøver ikke at starte ved 1.',no:'En nattehimmel full av stjerner med tall. Én stjerne er våken – tell videre fra den: trykk på stjernen som kommer etter, og så den neste, til tråden har tegnet et bilde. Du trenger ikke å begynne på 1.',fi:'Yötaivas täynnä numeroituja tähtiä. Yksi tähti on hereillä – jatka laskemista siitä: napauta tähteä, joka tulee seuraavaksi, ja sitten taas seuraavaa, kunnes lanka on piirtänyt kuvan. Ykkösestä ei tarvitse aloittaa.'},
    prompt:       {en:'Start at {s}. Count on and wake the stars one by one.',de:'Beginne bei {s}. Zähle weiter und wecke die Sterne nacheinander.',fr:'Commence à {s}. Continue à compter et réveille les étoiles une à une.',it:'Parti da {s}. Continua a contare e sveglia le stelle una alla volta.',es:'Empieza en el {s}. Sigue contando y despierta las estrellas una por una.',pt:'Comece no {s}. Continue contando e acorde as estrelas uma por uma.',nl:'Begin bij {s}. Tel verder en maak de sterren één voor één wakker.',sv:'Börja på {s}. Räkna vidare och väck stjärnorna en i taget.',da:'Begynd ved {s}. Tæl videre, og væk stjernerne én ad gangen.',no:'Begynn på {s}. Tell videre og vekk stjernene én om gangen.',fi:'Aloita luvusta {s}. Jatka laskemista ja herätä tähdet yksi kerrallaan.'},
    hintStart:    {en:'Tap the star that comes right after the one that is awake.',de:'Tippe auf den Stern, der direkt nach dem wachen Stern kommt.',fr:'Touche l’étoile qui vient juste après celle qui est réveillée.',it:'Tocca la stella che viene subito dopo quella sveglia.',es:'Toca la estrella que viene justo después de la que está despierta.',pt:'Toque na estrela que vem logo depois da que está acordada.',nl:'Tik op de ster die direct na de wakkere ster komt.',sv:'Tryck på stjärnan som kommer direkt efter den vakna.',da:'Tryk på den stjerne, der kommer lige efter den vågne.',no:'Trykk på stjernen som kommer rett etter den våkne.',fi:'Napauta tähteä, joka tulee heti hereillä olevan tähden jälkeen.'},
    hintUnfinished:{en:'Not finished yet — keep counting on, one star at a time.',de:'Noch nicht fertig – zähle weiter, einen Stern nach dem anderen.',fr:'Ce n’est pas fini : continue à compter, une étoile à la fois.',it:'Non è ancora finito: continua a contare, una stella alla volta.',es:'Todavía no terminas: sigue contando, una estrella a la vez.',pt:'Ainda não acabou: continue contando, uma estrela de cada vez.',nl:'Nog niet klaar: tel verder, één ster tegelijk.',sv:'Inte klart än – räkna vidare, en stjärna i taget.',da:'Ikke færdig endnu – tæl videre, én stjerne ad gangen.',no:'Ikke ferdig ennå – tell videre, én stjerne om gangen.',fi:'Ei vielä valmis – jatka laskemista, tähti kerrallaan.'},
    noteNext:     {en:'You are on {cur}. Which star comes next?',de:'Du bist bei {cur}. Welcher Stern kommt als Nächstes?',fr:'Tu en es à {cur}. Quelle étoile vient ensuite ?',it:'Sei alla stella {cur}. Quale viene dopo?',es:'Estás en el {cur}. ¿Qué estrella sigue?',pt:'Você está no {cur}. Qual estrela vem depois?',nl:'Je bent bij {cur}. Welke ster komt erna?',sv:'Du är på {cur}. Vilken stjärna kommer efter?',da:'Du er på {cur}. Hvilken stjerne kommer efter?',no:'Du er på {cur}. Hvilken stjerne kommer etter?',fi:'Olet tähdellä {cur}. Mikä tähti tulee seuraavaksi?'},
    noteBack:     {en:'{v} comes before {cur}. You don’t have to go back — count on from {cur}.',de:'{v} kommt vor {cur}. Du musst nicht zurück – zähle von {cur} weiter.',fr:'{v} vient avant {cur}. Pas besoin de revenir en arrière : continue à compter à partir de {cur}.',it:'{v} viene prima di {cur}. Non serve tornare indietro: continua a contare da {cur}.',es:'El {v} viene antes del {cur}. No tienes que regresar: sigue contando desde el {cur}.',pt:'O {v} vem antes do {cur}. Não precisa voltar: continue contando a partir do {cur}.',nl:'{v} komt vóór {cur}. Je hoeft niet terug: tel verder vanaf {cur}.',sv:'{v} kommer före {cur}. Du behöver inte gå tillbaka – räkna vidare från {cur}.',da:'{v} kommer før {cur}. Du behøver ikke at gå tilbage – tæl videre fra {cur}.',no:'{v} kommer før {cur}. Du trenger ikke å gå tilbake – tell videre fra {cur}.',fi:'{v} tulee ennen lukua {cur}. Ei tarvitse palata taaksepäin – jatka laskemista luvusta {cur}.'},
    noteSkip:     {en:'{v} is too far. Count on one at a time from {cur}.',de:'{v} ist zu weit. Zähle von {cur} aus Schritt für Schritt weiter.',fr:'{v}, c’est trop loin. Continue à compter un par un à partir de {cur}.',it:'{v} è troppo lontano. Conta un numero alla volta da {cur}.',es:'El {v} está muy lejos. Cuenta de uno en uno desde el {cur}.',pt:'O {v} está longe demais. Conte de um em um a partir do {cur}.',nl:'{v} is te ver. Tel één voor één verder vanaf {cur}.',sv:'{v} är för långt bort. Räkna ett steg i taget från {cur}.',da:'{v} er for langt væk. Tæl ét skridt ad gangen fra {cur}.',no:'{v} er for langt unna. Tell ett steg om gangen fra {cur}.',fi:'{v} on liian kaukana. Laske yksi kerrallaan luvusta {cur}.'},
    noteSame:     {en:'You are on {cur} already. Count on one more.',de:'Du bist schon bei {cur}. Zähle eins weiter.',fr:'Tu en es déjà à {cur}. Compte encore un.',it:'Sei già alla stella {cur}. Conta uno in più.',es:'Ya estás en el {cur}. Cuenta uno más.',pt:'Você já está no {cur}. Conte mais um.',nl:'Je bent al bij {cur}. Tel één verder.',sv:'Du är redan på {cur}. Räkna ett steg vidare.',da:'Du er allerede på {cur}. Tæl ét videre.',no:'Du er allerede på {cur}. Tell ett videre.',fi:'Olet jo tähdellä {cur}. Laske yksi eteenpäin.'},
    noteDone:     {en:'From {s} to {e} — the picture is awake!',de:'Von {s} bis {e} – das Bild ist wach!',fr:'De {s} à {e} : l’image est réveillée !',it:'Da {s} a {e}: la figura è sveglia!',es:'Del {s} al {e}: ¡la figura despertó!',pt:'Do {s} ao {e}: a figura acordou!',nl:'Van {s} tot en met {e}: de figuur is wakker!',sv:'Från {s} till {e} – bilden är vaken!',da:'Fra {s} til {e} – billedet er vågent!',no:'Fra {s} til {e} – bildet er våkent!',fi:'Luvusta {s} lukuun {e} – kuva on hereillä!'},
    celebrate:    {en:'Yes! From {s} to {e} — you woke {shape}!',de:'Ja! Von {s} bis {e} – du hast {shape} geweckt!',fr:'Oui ! De {s} à {e} : tu as réveillé {shape} !',it:'Sì! Da {s} a {e}: hai svegliato {shape}!',es:'¡Sí! Del {s} al {e}: ¡despertaste {shape}!',pt:'Isso! Do {s} ao {e}: você acordou {shape}!',nl:'Ja! Van {s} tot en met {e} – je hebt {shape} wakker gemaakt!',sv:'Ja! Från {s} till {e} – du väckte {shape}!',da:'Ja! Fra {s} til {e} – du vækkede {shape}!',no:'Ja! Fra {s} til {e} – du vekket {shape}!',fi:'Hienoa! Luvusta {s} lukuun {e} – herätit {shape}!'},
    skyLabel:     {en:'The night sky',de:'Der Nachthimmel',fr:'Le ciel de nuit',it:'Il cielo notturno',es:'El cielo nocturno',pt:'O céu noturno',nl:'De nachthemel',sv:'Natthimlen',da:'Nattehimlen',no:'Nattehimmelen',fi:'Yötaivas'},
    starSleeping: {en:'star {v}, asleep',de:'Stern {v}, schläft',fr:'étoile {v}, endormie',it:'stella {v}, addormentata',es:'estrella {v}, dormida',pt:'estrela {v}, dormindo',nl:'ster {v}, slaapt',sv:'stjärna {v}, sover',da:'stjerne {v}, sover',no:'stjerne {v}, sover',fi:'tähti {v}, nukkuu'},
    starLit:      {en:'star {v}, awake',de:'Stern {v}, wach',fr:'étoile {v}, réveillée',it:'stella {v}, sveglia',es:'estrella {v}, despierta',pt:'estrela {v}, acordada',nl:'ster {v}, wakker',sv:'stjärna {v}, vaken',da:'stjerne {v}, vågen',no:'stjerne {v}, våken',fi:'tähti {v}, hereillä'},
    starHere:     {en:'you are on star {v}',de:'du bist bei Stern {v}',fr:'tu es sur l’étoile {v}',it:'sei sulla stella {v}',es:'estás en la estrella {v}',pt:'você está na estrela {v}',nl:'je bent bij ster {v}',sv:'du är på stjärna {v}',da:'du er på stjerne {v}',no:'du er på stjerne {v}',fi:'olet tähdellä {v}'},
    runLabel:     {en:'Counted so far',de:'Bis hierher gezählt',fr:'Compté jusqu’ici',it:'Contato finora',es:'Contado hasta ahora',pt:'Contado até agora',nl:'Tot nu toe geteld',sv:'Räknat hittills',da:'Talt indtil nu',no:'Telt så langt',fi:'Laskettu tähän asti'},
    restart:      {en:'Start again',de:'Noch einmal',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw',sv:'Börja om',da:'Start forfra',no:'Start på nytt',fi:'Aloita alusta'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    range10:      {en:'to 10',de:'bis 10',fr:'jusqu’à 10',it:'fino a 10',es:'hasta 10',pt:'até 10',nl:'t/m 10',sv:'till 10',da:'til 10',no:'til 10',fi:'10:een asti'},
    range20:      {en:'to 20',de:'bis 20',fr:'jusqu’à 20',it:'fino a 20',es:'hasta 20',pt:'até 20',nl:'t/m 20',sv:'till 20',da:'til 20',no:'til 20',fi:'20:een asti'},
    setSky:       {en:'Sky',de:'Himmel',fr:'Ciel',it:'Cielo',es:'Cielo',pt:'Céu',nl:'Hemel',sv:'Himmel',da:'Himmel',no:'Himmel',fi:'Taivas'},
    skyStarry:    {en:'Full of stars',de:'Voller Sterne',fr:'Plein d’étoiles',it:'Pieno di stelle',es:'Lleno de estrellas',pt:'Cheio de estrelas',nl:'Vol sterren',sv:'Full av stjärnor',da:'Fuld af stjerner',no:'Full av stjerner',fi:'Täynnä tähtiä'},
    skyClear:     {en:'Only the picture',de:'Nur das Bild',fr:'Seulement l’image',it:'Solo la figura',es:'Solo la figura',pt:'Só a figura',nl:'Alleen de figuur',sv:'Bara bilden',da:'Kun billedet',no:'Bare bildet',fi:'Vain kuva'},
    /* the pictures, in object form after "you woke …" (de accusative; fi -n/-t object) */
    shapeMountains:{en:'the mountains',de:'die Berge',fr:'les montagnes',it:'le montagne',es:'las montañas',pt:'as montanhas',nl:'de bergen',sv:'bergen',da:'bjergene',no:'fjellene',fi:'vuoret'},
    shapeStar:    {en:'a star',de:'einen Stern',fr:'une étoile',it:'una stella',es:'una estrella',pt:'uma estrela',nl:'een ster',sv:'en stjärna',da:'en stjerne',no:'en stjerne',fi:'tähden'},
    shapeHouse:   {en:'a house',de:'ein Haus',fr:'une maison',it:'una casa',es:'una casa',pt:'uma casa',nl:'een huis',sv:'ett hus',da:'et hus',no:'et hus',fi:'talon'},
    shapeFish:    {en:'a fish',de:'einen Fisch',fr:'un poisson',it:'un pesce',es:'un pez',pt:'um peixe',nl:'een vis',sv:'en fisk',da:'en fisk',no:'en fisk',fi:'kalan'},
    shapeCup:     {en:'a cup',de:'eine Tasse',fr:'une tasse',it:'una tazza',es:'una taza',pt:'uma xícara',nl:'een kopje',sv:'en kopp',da:'en kop',no:'en kopp',fi:'kupin'},
    shapeKite:    {en:'a kite',de:'einen Drachen',fr:'un cerf-volant',it:'un aquilone',es:'un papalote',pt:'uma pipa',nl:'een vlieger',sv:'en drake',da:'en drage',no:'en drage',fi:'leijan'},
    shapeBoat:    {en:'a boat',de:'ein Boot',fr:'un bateau',it:'una barca',es:'un barco',pt:'um barco',nl:'een boot',sv:'en båt',da:'en båd',no:'en båt',fi:'veneen'},
    shapeBolt:    {en:'a lightning bolt',de:'einen Blitz',fr:'un éclair',it:'un fulmine',es:'un rayo',pt:'um raio',nl:'een bliksemflits',sv:'en blixt',da:'et lyn',no:'et lyn',fi:'salaman'},
    shapeSaucepan:{en:'a saucepan',de:'einen Kochtopf',fr:'une casserole',it:'un pentolino',es:'una cacerola',pt:'uma panela',nl:'een steelpan',sv:'en kastrull',da:'en gryde',no:'en kjele',fi:'kattilan'},
    shapeCrown:   {en:'a crown',de:'eine Krone',fr:'une couronne',it:'una corona',es:'una corona',pt:'uma coroa',nl:'een kroon',sv:'en krona',da:'en krone',no:'en krone',fi:'kruunun'},
    shapeUmbrella:{en:'an umbrella',de:'einen Regenschirm',fr:'un parapluie',it:'un ombrello',es:'un paraguas',pt:'um guarda-chuva',nl:'een paraplu',sv:'ett paraply',da:'en paraply',no:'en paraply',fi:'sateenvarjon'},
    shapeWave:    {en:'a wave',de:'eine Welle',fr:'une vague',it:'un’onda',es:'una ola',pt:'uma onda',nl:'een golf',sv:'en våg',da:'en bølge',no:'en bølge',fi:'aallon'},
    shapeStairs:  {en:'a staircase',de:'eine Treppe',fr:'un escalier',it:'una scala',es:'una escalera',pt:'uma escada',nl:'een trap',sv:'en trappa',da:'en trappe',no:'en trapp',fi:'portaat'}
  },

  defaults: { range: '10', sky: 'starry' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: '10', labelKey: 'range10' }, { value: '20', labelKey: 'range20' }] },
    { key: 'sky', type: 'choice', labelKey: 'setSky', options: [{ value: 'starry', labelKey: 'skyStarry' }, { value: 'clear', labelKey: 'skyClear' }] }
  ],

  init: function (api) {
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = ''; this._order = null; this._curPass = 0;
    this._ro = null; this._note = null; this._autoCheck = null;
    injectConstellationCSS();
  },
  destroy: function () {
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._autoCheck) { clearTimeout(this._autoCheck); this._autoCheck = null; }
  },
  onSettings: function (key) {
    if (key === 'range') { this._pool = null; this._order = null; }
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  _skyWidth: function () { var s = this.api && this.api.stage; var w = s ? s.clientWidth : 0; return w > 160 ? w : 560; },
  _range: function () { return (this.api && this.api.settings && this.api.settings.range === '20') ? 20 : 10; },
  _sky: function () { return (this.api && this.api.settings && this.api.settings.sky === 'clear') ? 'clear' : 'starry'; },
  _ensurePool: function () {
    var key = String(this._range());
    if (this._pool && this._poolKey === key) return this._pool;
    this._pool = ConstellationCore.rounds(this._range(), 'sky');
    this._poolKey = key;
    if (!(this._order && this._order.length === this._pool.length)) { this._order = null; this._curPass = 0; }
    return this._pool;
  },
  _shuffled: function (n, prev) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (var g = 0; g < 10; g++) {
      for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!prev || n < 2 || a.join(',') !== prev.join(',')) break;
    }
    return a;
  },
  _shapeKey: function (shape) { return 'shape' + shape.charAt(0).toUpperCase() + shape.slice(1); },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    if (!n) return null;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = this._shuffled(n, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = this._shuffled(n, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]], self = this;
    return {
      id: 'constellation.' + r.N + '.' + r.shape + '.' + r.start,
      promptKey: 'prompt',
      promptArgs: { s: r.start, e: r.end, shape: this.api.t(this._shapeKey(r.shape)) },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { if (tool._autoCheck) { clearTimeout(tool._autoCheck); tool._autoCheck = null; } tool._note = null; tool.st = ConstellationCore.newState(r, tool._sky()); },
      check: function (tool) { var ok = ConstellationCore.verdict(tool.st) === 'done'; if (ok) tool._onRight(); return ok; },
      hintKey: function (tool) { tool._nudgeNext(); return tool.st.lit.length === 1 ? 'hintStart' : 'hintUnfinished'; }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = ConstellationCore.newState(ConstellationCore.rounds(10, 'sky')[5], 'starry');   // boot: the kite 3→8
    var st = this.st;
    var wrap = api.el('div', 'sky-wrap');
    this._wrap = wrap;

    /* ---- the sky ---- */
    var mat = api.el('div', 'sky-mat');
    mat.setAttribute('role', 'group');
    mat.setAttribute('aria-label', t('skyLabel'));
    this._mat = mat;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'sky-thread');
    svg.setAttribute('aria-hidden', 'true');
    this._svg = svg;
    mat.appendChild(svg);
    this._stars = {};
    for (var i = 0; i < st.stars.length; i++) {
      var q = st.stars[i];
      var b = api.el('button', 'sky-star');
      b.type = 'button';
      b.dataset.v = String(q.v);
      b.dataset.kind = q.kind;
      b.innerHTML = '<svg class="sky-rays" viewBox="0 0 100 100" aria-hidden="true"><g stroke-linecap="round"><line x1="50" y1="2" x2="50" y2="20"/><line x1="50" y1="80" x2="50" y2="98"/><line x1="2" y1="50" x2="20" y2="50"/><line x1="80" y1="50" x2="98" y2="50"/><line x1="16" y1="16" x2="28" y2="28"/><line x1="72" y1="72" x2="84" y2="84"/><line x1="84" y1="16" x2="72" y2="28"/><line x1="28" y1="72" x2="16" y2="84"/></g></svg><span class="sky-disc">' + q.v + '</span>';
      b.addEventListener('click', this._onStar.bind(this, q.v));
      this._stars[q.v] = b;
      mat.appendChild(b);
    }
    wrap.appendChild(mat);

    /* ---- the readout strip ---- */
    var strip = api.el('div', 'sky-strip');
    var now = api.el('div', 'sky-now'); now.setAttribute('aria-hidden', 'true'); this._now = now; strip.appendChild(now);
    var run = api.el('div', 'sky-run'); run.setAttribute('role', 'group'); run.setAttribute('aria-label', t('runLabel')); this._run = run; strip.appendChild(run);
    var note = api.el('div', 'sky-note'); note.setAttribute('aria-live', 'polite'); this._noteEl = note; strip.appendChild(note);
    var tools = api.el('div', 'sky-tools');
    var again = api.el('button', 'sky-tool sky-again'); again.type = 'button';
    again.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg><span class="sky-tool-text"></span>';
    again.lastChild.textContent = t('restart'); again.setAttribute('aria-label', t('restart'));
    again.addEventListener('click', this._restart.bind(this));
    tools.appendChild(again); this._again = again;
    strip.appendChild(tools);
    this._strip = strip;
    wrap.appendChild(strip);

    stage.appendChild(wrap);
    this._layout();
    this._paint(false);
    this._watchWidth();
  },

  _layout: function () {
    var st = this.st, W = this._skyWidth();
    var L = ConstellationCore.layout(st, W);
    this._L = L;
    var mat = this._mat;
    mat.style.height = L.H + 'px';
    mat.style.setProperty('--sky-star', L.star + 'px');
    this._svg.setAttribute('viewBox', '0 0 ' + W + ' ' + L.H);
    this._svg.setAttribute('width', W); this._svg.setAttribute('height', L.H);
    for (var v in this._stars) {
      var p = L.pos[v], b = this._stars[v]; if (!p) continue;
      b.style.left = (p.x - L.R) + 'px'; b.style.top = (p.y - L.R) + 'px';
      b.style.width = L.star + 'px'; b.style.height = L.star + 'px';
    }
    this._drawThread(false);
  },
  _drawThread: function (animate) {
    var st = this.st, svg = this._svg;
    var L = this._L = ConstellationCore.layout(st, this._L.W);      // the thread follows the LIVE lit set
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var segs = L.segments.slice();
    if (st.done) segs = segs.concat(L.closing);
    var n = segs.length;
    for (var i = 0; i < n; i++) {
      var a = L.pos[segs[i][0]], b = L.pos[segs[i][1]]; if (!a || !b) continue;
      var isNew = animate && (i === n - 1 || (st.done && i >= L.segments.length));
      var glow = line(a, b, 'sky-glow'), ink = line(a, b, 'sky-ink' + (isNew ? ' sky-draw' : ''));
      if (isNew) { var len = Math.hypot(b.x - a.x, b.y - a.y); ink.style.strokeDasharray = len; ink.style.strokeDashoffset = len; ink.style.animationDelay = (st.done && i >= L.segments.length ? 120 * (i - L.segments.length) : 0) + 'ms'; }
      svg.appendChild(glow); svg.appendChild(ink);
    }
  },
  _paint: function (animate) {
    var st = this.st, t = this.api.t;
    for (var v in this._stars) {
      var b = this._stars[v], n = Number(v);
      var lit = ConstellationCore.isLit(st, n), here = !st.done && n === st.cur;
      b.classList.toggle('is-lit', lit);
      b.classList.toggle('is-here', here);
      b.classList.toggle('is-done', st.done && lit);
      b.classList.toggle('sky-still', !animate);
      b.setAttribute('aria-label', interp(t(here ? 'starHere' : lit ? 'starLit' : 'starSleeping'), { v: n }));
      b.setAttribute('aria-pressed', String(lit));
    }
    this._now.textContent = String(st.cur);
    this._now.classList.toggle('is-done', st.done);
    var run = this._run; run.innerHTML = '';
    for (var i = 0; i < st.lit.length; i++) {
      var chip = this.api.el('span', 'sky-chip' + (i === 0 ? ' is-start' : '') + (i === st.lit.length - 1 && i > 0 ? ' is-last' : ''));
      chip.textContent = String(st.lit[i]);
      run.appendChild(chip);
    }
    var note = this._note || { key: st.done ? 'noteDone' : 'noteNext', args: { cur: st.cur, s: st.start, e: st.end }, slip: false };
    this._noteEl.textContent = interp(t(note.key), note.args);
    this._noteEl.classList.toggle('is-slip', !!note.slip);
    this._noteEl.classList.toggle('is-done', st.done);
    this._again.disabled = st.lit.length < 2;
    this._drawThread(animate);
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._skyWidth();
    this._ro = new ResizeObserver(function () {
      var w = self._skyWidth();
      if (Math.abs(w - last) < 8 || !self._mat || !self._mat.isConnected) return;
      last = w;
      self._layout();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- interaction ---------------- */
  _onStar: function (v) {
    var st = this.st, b = this._stars[v], self = this;
    var res = ConstellationCore.tap(st, v);
    if (res.kind === 'none') return;
    if (res.kind === 'same') {
      this._note = { key: 'noteSame', args: { cur: st.cur }, slip: false };
      bounce(b, 'sky-bounce'); this.api.sound(380); this._paint(true);
      this.api.track('same', { v: v });
      return;
    }
    if (res.kind === 'back' || res.kind === 'skip') {
      this._note = { key: res.kind === 'back' ? 'noteBack' : 'noteSkip', args: { v: v, cur: st.cur }, slip: true };
      bounce(b, 'sky-wobble'); this.api.sound(300); this._paint(true);
      this.api.announce(this._noteEl.textContent);
      this.api.track(res.kind, { v: v, cur: st.cur, start: st.start });
      return;
    }
    /* next / done */
    this._note = null;
    this._paint(true);
    bounce(b, 'sky-wake');
    this.api.sound(520 + 24 * (st.cur - st.start));
    this._speakNumber(v);
    this.api.announce(String(v));
    this.api.track(res.kind, { v: v, start: st.start, end: st.end });
    if (res.kind === 'done') {
      var lit = st.lit.slice();
      for (var k = 0; k < lit.length; k++) (function (el, d) { setTimeout(function () { bounce(el, 'sky-twinkle'); }, 300 + d); }(this._stars[lit[k]], 70 * k));
      this._mat.classList.remove('sky-glowing'); void this._mat.offsetWidth; this._mat.classList.add('sky-glowing');
      /* the picture is complete: Check fires itself once the closing lines have drawn */
      if (this._autoCheck) clearTimeout(this._autoCheck);
      this._autoCheck = setTimeout(function () {
        self._autoCheck = null;
        var btn = document.querySelector('.lcs-activity-check');
        if (btn && !btn.hidden && !btn.disabled && self.st === st && st.done) btn.click();
      }, 750);
    }
  },
  _restart: function () {
    var st = this.st;
    if (st.lit.length < 2) return;
    ConstellationCore.restart(st);
    this._note = null;
    this._paint(true);
    this.api.sound(380);
    this.api.announce(interp(this.api.t('noteNext'), { cur: st.cur }));
    this.api.track('restart', { start: st.start });
  },
  _nudgeNext: function () {
    var st = this.st;
    bounce(this._stars[st.cur], 'sky-bounce');
    if (!st.done) this._note = null;
    this._paint(true);
  },
  _onRight: function () {
    var st = this.st;
    this._note = null;
    this._paint(true);
    this.api.sound(660); var self = this; setTimeout(function () { self.api.sound(880); }, 160);
    this.api.track('right', { start: st.start, end: st.end, shape: st.shape, N: st.N });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
function line(a, b, cls) { var l = document.createElementNS('http://www.w3.org/2000/svg', 'line'); l.setAttribute('x1', a.x); l.setAttribute('y1', a.y); l.setAttribute('x2', b.x); l.setAttribute('y2', b.y); l.setAttribute('class', cls); return l; }

var skyCssDone = false;
function injectConstellationCSS() {
  if (skyCssDone || typeof document === 'undefined') return;
  skyCssDone = true;
  var css = ''
  + '.sky-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--sky-gold:#F3C04B;--sky-gold2:#D99A22;--sky-night:#0F4A43;--sky-night2:#0A3531;}'
  /* the sky */
  + '.sky-mat{position:relative;width:100%;border-radius:22px;background:radial-gradient(120% 90% at 50% 0%,#15605A 0%,var(--sky-night) 45%,var(--sky-night2) 100%);border:3px solid var(--lcs-structure);overflow:hidden;--sky-star:56px;'
  + 'box-shadow:inset 0 2px 0 rgba(255,255,255,.08),inset 0 -8px 0 rgba(0,0,0,.14),0 6px 0 rgba(20,107,94,.18),0 10px 22px rgba(20,30,28,.10);}'
  + '.sky-mat.sky-glowing{animation:sky-glowing 1.6s var(--lcs-ease) 1;}'
  + '@keyframes sky-glowing{0%{box-shadow:inset 0 2px 0 rgba(255,255,255,.08),inset 0 -8px 0 rgba(0,0,0,.14),0 6px 0 rgba(20,107,94,.18),0 10px 22px rgba(20,30,28,.10);}30%{box-shadow:inset 0 0 0 6px rgba(243,192,75,.35),0 6px 0 rgba(20,107,94,.18),0 10px 28px rgba(243,192,75,.35);}100%{box-shadow:inset 0 2px 0 rgba(255,255,255,.08),inset 0 -8px 0 rgba(0,0,0,.14),0 6px 0 rgba(20,107,94,.18),0 10px 22px rgba(20,30,28,.10);}}'
  + '.sky-thread{position:absolute;left:0;top:0;pointer-events:none;}'
  + '.sky-thread .sky-glow{stroke:rgba(243,192,75,.28);stroke-width:12;stroke-linecap:round;}'
  + '.sky-thread .sky-ink{stroke:var(--sky-gold);stroke-width:5;stroke-linecap:round;}'
  + '.sky-thread .sky-draw{animation:sky-draw .45s var(--lcs-ease) forwards;}'
  + '@keyframes sky-draw{to{stroke-dashoffset:0;}}'
  /* stars */
  + '.sky-star{position:absolute;padding:0;margin:0;border:0;background:none;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;display:flex;align-items:center;justify-content:center;z-index:1;}'
  + '.sky-star:focus-visible{outline:3px solid #FFE7A3;outline-offset:2px;border-radius:50%;}'
  + '.sky-rays{position:absolute;inset:0;width:100%;height:100%;}'
  + '.sky-rays line{stroke:rgba(251,243,228,.38);stroke-width:5;transition:stroke .3s;}'
  + '.sky-disc{position:relative;width:66%;height:66%;border-radius:50%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;'
  + 'background:rgba(251,243,228,.10);border:2px solid rgba(251,243,228,.6);color:rgba(251,243,228,.92);font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--sky-star) * .34);line-height:1;transition:background .3s,color .3s,border-color .3s,transform .25s var(--lcs-ease);}'
  + '.sky-star:hover .sky-disc{background:rgba(251,243,228,.2);}'
  + '.sky-star.is-lit .sky-rays line{stroke:var(--sky-gold);}'
  + '.sky-star.is-lit .sky-disc{background:var(--sky-gold);border-color:#FFF4D1;color:var(--lcs-ink);box-shadow:0 0 14px rgba(243,192,75,.55),0 2px 0 var(--sky-gold2);}'
  + '.sky-star.is-here .sky-disc{animation:sky-halo 1.6s ease-in-out infinite;}'
  + '.sky-star.sky-still .sky-disc,.sky-star.sky-still .sky-rays line{transition:none;}'
  + '@keyframes sky-halo{0%,100%{box-shadow:0 0 0 0 rgba(243,192,75,.0),0 0 14px rgba(243,192,75,.55),0 2px 0 var(--sky-gold2);}50%{box-shadow:0 0 0 9px rgba(243,192,75,.25),0 0 18px rgba(243,192,75,.7),0 2px 0 var(--sky-gold2);}}'
  + '.sky-star.is-done .sky-disc{animation:none;}'
  + '.sky-bounce{animation:sky-bounce .4s var(--lcs-ease) 1;}'
  + '@keyframes sky-bounce{0%,100%{transform:none;}40%{transform:translateY(-6px) scale(1.06);}}'
  + '.sky-wobble .sky-disc{animation:sky-wobble .45s var(--lcs-ease) 1;}'
  + '@keyframes sky-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px) rotate(-4deg);}75%{transform:translateX(6px) rotate(4deg);}}'
  + '.sky-wake .sky-disc{animation:sky-wake .5s var(--lcs-ease) 1;}'
  + '@keyframes sky-wake{0%{transform:scale(.7);}55%{transform:scale(1.22);}100%{transform:none;}}'
  + '.sky-twinkle .sky-disc{animation:sky-twinkle .6s var(--lcs-ease) 1;}'
  + '@keyframes sky-twinkle{0%,100%{transform:none;}45%{transform:scale(1.25) rotate(12deg);}}'
  /* the readout strip */
  + '.sky-strip{width:100%;display:flex;align-items:center;gap:12px;flex-wrap:wrap;box-sizing:border-box;padding:10px 12px;border-radius:18px;background:var(--lcs-surface);border:2px solid var(--lcs-line);}'
  + '.sky-now{flex:0 0 auto;width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--sky-gold);border:3px solid #FFF4D1;box-shadow:0 2px 0 var(--sky-gold2),0 0 0 3px rgba(243,192,75,.25);font-family:var(--lcs-font-display);font-weight:800;font-size:24px;color:var(--lcs-ink);}'
  + '.sky-now.is-done{background:var(--lcs-good);box-shadow:0 2px 0 rgba(0,0,0,.15);color:#fff;}'
  + '.sky-run{display:flex;align-items:center;gap:6px;flex-wrap:wrap;flex:0 1 auto;}'
  + '.sky-chip{min-width:30px;height:30px;padding:0 6px;border-radius:10px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;background:#FFF4D1;border:2px solid var(--sky-gold);font-family:var(--lcs-font-display);font-weight:800;font-size:15px;color:var(--lcs-ink);}'
  + '.sky-chip.is-start{background:var(--lcs-structure);border-color:var(--lcs-structure);color:#fff;}'
  + '.sky-chip.is-last{transform:scale(1.08);}'
  + '.sky-note{flex:1 1 140px;min-width:0;font-family:var(--lcs-font-body);font-weight:700;font-size:15px;line-height:1.3;color:var(--lcs-structure);}'
  + '.sky-note.is-slip{color:var(--lcs-accent);}'
  + '.sky-note.is-done{color:var(--lcs-good);}'
  + '.sky-tools{display:flex;gap:8px;flex:0 0 auto;margin-left:auto;}'
  + '.sky-tool{min-height:44px;min-width:44px;padding:0 16px 0 12px;border-radius:999px;border:2px solid var(--lcs-structure-soft);background:var(--lcs-surface);font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;display:inline-flex;align-items:center;gap:6px;}'
  + '.sky-tool:hover{background:var(--lcs-structure-soft);} .sky-tool:disabled{opacity:.45;cursor:default;}'
  /* a phone strip: two rows — [now · chips · ↺] over the note; the button keeps its icon and its aria-label */
  + '@media (max-width:420px){.sky-strip{display:grid;grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:"now run again" "note note note";gap:6px 8px;padding:8px 10px;align-items:center;} .sky-now{grid-area:now;width:40px;height:40px;font-size:18px;} .sky-run{grid-area:run;gap:4px;} .sky-chip{min-width:26px;height:26px;font-size:13px;padding:0 4px;border-radius:8px;} .sky-note{grid-area:note;font-size:14px;} .sky-tools{grid-area:again;margin:0;} .sky-tool{padding:0;width:44px;justify-content:center;} .sky-tool-text{display:none;}}'
  + '@media (prefers-reduced-motion:reduce){.sky-star,.sky-disc,.sky-rays line,.sky-mat,.sky-ink{animation:none!important;transition:none!important;} .sky-thread .sky-draw{stroke-dashoffset:0!important;}}';
  var style = document.createElement('style');
  style.id = 'sky-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = ConstellationActivity;
if (typeof window !== 'undefined') window.ConstellationActivity = ConstellationActivity;
