/* =====================================================================
   willow-story-corner-activity.js — ACTIVITY #68 of the one-by-one
   rebuild: "Willow's Story Corner" → THE STORY ZIPPER (RL.K.9, 11 locales).
   Design sheet: docs/activities-rebuild/designs/068-willow-story-corner.md
   ---------------------------------------------------------------------
   THE INVENTION: two stories (or two animals) are the two sides of a
   zipper. The tooth is a question ("Who lost something?"). Put it in the
   middle (both stories), on one side (only that story) or in the pocket
   (neither), then pull the slider. The slider tests the claim against the
   panels: it zips past a tooth the stories prove — the evidence panels
   light — and JAMS at one they do not. Five teeth fill one zipper; on the
   fifth the whole zipper zips shut. Willow (the library tortoise) reads
   the two stories first (setting) and again when tapped.

   ACTIVITY LAYER ONLY: the model is story-zipper-core.js; lcs-shell.js and
   compare-tales-core.js are untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.WillowStoryCornerActivity.st / ._plan (= ._pool, the pass) / ._order / .FAST.
   ===================================================================== */
'use strict';

var WillowStoryCornerActivity = {
  id: 'willow-story-corner',
  apparatusClasses: ['sz-'],

  strings: {
    title:       {en:'Willow\'s Story Corner',de:'Willows Geschichtenecke',nl:'Het verhalenhoekje van Willow',da:'Willows historiehjørne',sv:'Willows berättarhörna',no:'Willows fortellerkrok',es:'El rincón de cuentos de Willow',it:'L’angolo delle storie di Willow',pt:'O cantinho das histórias da Willow',fr:'Le coin des histoires de Willow',fi:'Willow’n tarinanurkka'},
    instr:       {en:'Where does the tooth go?',de:'Wohin gehört der Zahn?',nl:'Waar hoort het tandje?',da:'Hvor skal tanden sidde?',sv:'Var ska tanden sitta?',no:'Hvor skal tannen sitte?',es:'¿Dónde va el diente?',it:'Dove va il dente?',pt:'Onde vai o dente?',fr:'Où va la dent ?',fi:'Mihin hammas kuuluu?'},
    check:       {en:'Zip it',de:'Zuziehen',nl:'Dichtritsen',da:'Lyn den',sv:'Dra igen',no:'Dra igjen',es:'Cierra',it:'Chiudi',pt:'Feche',fr:'Ferme',fi:'Vedä kiinni'},
    emptyPull:   {en:'Put the tooth on the zipper first.',de:'Leg zuerst den Zahn an den Reißverschluss.',nl:'Leg eerst het tandje bij de rits.',da:'Sæt først tanden på lynlåsen.',sv:'Sätt först tanden på blixtlåset.',no:'Sett først tannen på glidelåsen.',es:'Primero pon el diente en el cierre.',it:'Prima metti il dente sulla cerniera.',pt:'Primeiro coloque o dente no zíper.',fr:'Place d’abord la dent sur la fermeture éclair.',fi:'Laita ensin hammas vetoketjuun.'},
    hintBoth:    {en:'Is it in BOTH stories? Look again.',de:'Kommt es in BEIDEN Geschichten vor? Schau noch einmal.',nl:'Staat het in ALLEBEI de verhalen? Kijk nog eens.',da:'Sker det i BEGGE historier? Se igen.',sv:'Händer det i BÅDA berättelserna? Titta igen.',no:'Skjer det i BEGGE fortellingene? Se igjen.',es:'¿Pasa en LOS DOS cuentos? Míralos otra vez.',it:'Succede in TUTTE E DUE le storie? Guarda di nuovo.',pt:'Acontece nas DUAS histórias? Olhe de novo.',fr:'Est-ce que ça arrive dans LES DEUX histoires ? Regarde encore.',fi:'Tapahtuuko se MOLEMMISSA tarinoissa? Katso uudelleen.'},
    hintOther:   {en:'Look at the other story too.',de:'Schau dir auch die andere Geschichte an.',nl:'Kijk ook naar het andere verhaal.',da:'Se også på den anden historie.',sv:'Titta på den andra berättelsen också.',no:'Se på den andre fortellingen også.',es:'Mira también el otro cuento.',it:'Guarda anche l’altra storia.',pt:'Olhe a outra história também.',fr:'Regarde aussi l’autre histoire.',fi:'Katso myös toista tarinaa.'},
    hintThis:    {en:'Did that happen in this story?',de:'Ist das in dieser Geschichte passiert?',nl:'Gebeurde dat in dit verhaal?',da:'Skete det i den her historie?',sv:'Hände det i den här berättelsen?',no:'Skjedde det i denne fortellingen?',es:'¿Pasó eso en este cuento?',it:'È successo in questa storia?',pt:'Isso aconteceu nesta história?',fr:'Est-ce que c’est arrivé dans cette histoire ?',fi:'Tapahtuiko se tässä tarinassa?'},
    hintPocket:  {en:'One of the stories has it. Look again.',de:'Eine der Geschichten hat es. Schau noch einmal.',nl:'Een van de verhalen heeft het. Kijk nog eens.',da:'En af historierne har det. Se igen.',sv:'En av berättelserna har det. Titta igen.',no:'En av fortellingene har det. Se igjen.',es:'Uno de los cuentos lo tiene. Míralos otra vez.',it:'Una delle storie ce l’ha. Guarda di nuovo.',pt:'Uma das histórias tem isso. Olhe de novo.',fr:'Ça arrive dans une des histoires. Regarde encore.',fi:'Jossakin tarinassa se on. Katso uudelleen.'},
    hintBothA:   {en:'Do BOTH animals have it? Look again.',de:'Haben es BEIDE Tiere? Schau noch einmal.',nl:'Hebben ALLEBEI de dieren het? Kijk nog eens.',da:'Har BEGGE dyr det? Se igen.',sv:'Har BÅDA djuren det? Titta igen.',no:'Har BEGGE dyrene det? Se igjen.',es:'¿Lo tienen LOS DOS animales? Míralos otra vez.',it:'Ce l’hanno TUTTI E DUE gli animali? Guarda di nuovo.',pt:'Os DOIS animais têm isso? Olhe de novo.',fr:'Est-ce que LES DEUX animaux l’ont ? Regarde encore.',fi:'Onko se MOLEMMILLA eläimillä? Katso uudelleen.'},
    hintOtherA:  {en:'Look at the other animal too.',de:'Schau dir auch das andere Tier an.',nl:'Kijk ook naar het andere dier.',da:'Se også på det andet dyr.',sv:'Titta på det andra djuret också.',no:'Se på det andre dyret også.',es:'Mira también el otro animal.',it:'Guarda anche l’altro animale.',pt:'Olhe o outro animal também.',fr:'Regarde aussi l’autre animal.',fi:'Katso myös toista eläintä.'},
    hintThisA:   {en:'Does this animal have it?',de:'Hat dieses Tier das?',nl:'Heeft dit dier dat?',da:'Har det her dyr det?',sv:'Har det här djuret det?',no:'Har dette dyret det?',es:'¿Este animal lo tiene?',it:'Questo animale ce l’ha?',pt:'Este animal tem isso?',fr:'Est-ce que cet animal l’a ?',fi:'Onko tällä eläimellä se?'},
    hintPocketA: {en:'One of the animals has it. Look again.',de:'Eines der Tiere hat es. Schau noch einmal.',nl:'Een van de dieren heeft het. Kijk nog eens.',da:'Et af dyrene har det. Se igen.',sv:'Ett av djuren har det. Titta igen.',no:'Ett av dyrene har det. Se igjen.',es:'Uno de los animales lo tiene. Míralos otra vez.',it:'Uno degli animali ce l’ha. Guarda di nuovo.',pt:'Um dos animais tem isso. Olhe de novo.',fr:'Un des animaux l’a. Regarde encore.',fi:'Toisella eläimistä se on. Katso uudelleen.'},
    hintGlow:    {en:'The glowing pictures show where it happens.',de:'Die leuchtenden Bilder zeigen, wo es passiert.',nl:'De oplichtende plaatjes laten zien waar het gebeurt.',da:'De lysende billeder viser, hvor det sker.',sv:'De lysande bilderna visar var det händer.',no:'De lysende bildene viser hvor det skjer.',es:'Los dibujos que brillan muestran dónde pasa.',it:'I disegni che brillano mostrano dove succede.',pt:'As figuras que brilham mostram onde acontece.',fr:'Les images qui brillent montrent où ça arrive.',fi:'Hehkuvat kuvat näyttävät, missä se tapahtuu.'},
    hintNone:    {en:'No picture shows it. It goes in the pocket.',de:'Kein Bild zeigt es. Es kommt in die Tasche.',nl:'Geen enkel plaatje laat het zien. Het gaat in het zakje.',da:'Intet billede viser det. Det skal i lommen.',sv:'Ingen bild visar det. Det ska i fickan.',no:'Ingen bilder viser det. Det skal i lomma.',es:'Ningún dibujo lo muestra. Va en el bolsillo.',it:'Nessun disegno lo mostra. Va nella tasca.',pt:'Nenhuma figura mostra isso. Vai no bolso.',fr:'Aucune image ne le montre. Ça va dans la poche.',fi:'Mikään kuva ei näytä sitä. Se kuuluu taskuun.'},
    hintGlowA:   {en:'The glowing circle shows which animal has it.',de:'Der leuchtende Kreis zeigt, welches Tier es hat.',nl:'De oplichtende cirkel laat zien welk dier het heeft.',da:'Den lysende ring viser, hvilket dyr der har det.',sv:'Den lysande ringen visar vilket djur som har det.',no:'Den lysende ringen viser hvilket dyr som har det.',es:'El círculo que brilla muestra qué animal lo tiene.',it:'Il cerchio che brilla mostra quale animale ce l’ha.',pt:'O círculo que brilha mostra qual animal tem isso.',fr:'Le cercle qui brille montre quel animal l’a.',fi:'Hehkuva ympyrä näyttää, millä eläimellä se on.'},
    hintNoneA:   {en:'Neither animal has it. It goes in the pocket.',de:'Keines der Tiere hat es. Es kommt in die Tasche.',nl:'Geen van beide dieren heeft het. Het gaat in het zakje.',da:'Ingen af dyrene har det. Det skal i lommen.',sv:'Inget av djuren har det. Det ska i fickan.',no:'Ingen av dyrene har det. Det skal i lomma.',es:'Ninguno de los dos animales lo tiene. Va en el bolsillo.',it:'Nessuno dei due animali ce l’ha. Va nella tasca.',pt:'Nenhum dos dois animais tem isso. Vai no bolso.',fr:'Aucun des deux animaux ne l’a. Ça va dans la poche.',fi:'Kummallakaan eläimellä ei ole sitä. Se kuuluu taskuun.'},
    okZip:       {en:'The whole zipper is closed!',de:'Der ganze Reißverschluss ist zu!',nl:'De hele rits is dicht!',da:'Hele lynlåsen er lukket!',sv:'Hela blixtlåset är stängt!',no:'Hele glidelåsen er lukket!',es:'¡Todo el cierre está cerrado!',it:'Tutta la cerniera è chiusa!',pt:'O zíper inteiro está fechado!',fr:'Toute la fermeture éclair est fermée !',fi:'Koko vetoketju on kiinni!'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setCompare:  {en:'Compare',de:'Vergleichen',nl:'Vergelijken',da:'Sammenlign',sv:'Jämför',no:'Sammenlign',es:'Comparar',it:'Confronta',pt:'Comparar',fr:'Comparer',fi:'Vertaile'},
    cTales:      {en:'Two stories',de:'Zwei Geschichten',nl:'Twee verhalen',da:'To historier',sv:'Två berättelser',no:'To fortellinger',es:'Dos cuentos',it:'Due storie',pt:'Duas histórias',fr:'Deux histoires',fi:'Kaksi tarinaa'},
    cAnimals:    {en:'Two animals',de:'Zwei Tiere',nl:'Twee dieren',da:'To dyr',sv:'Två djur',no:'To dyr',es:'Dos animales',it:'Due animali',pt:'Dois animais',fr:'Deux animaux',fi:'Kaksi eläintä'},
    setListen:   {en:'Listen first',de:'Erst zuhören',nl:'Eerst luisteren',da:'Lyt først',sv:'Lyssna först',no:'Lytt først',es:'Escuchar primero',it:'Prima ascolta',pt:'Ouvir primeiro',fr:'Écouter d’abord',fi:'Kuuntele ensin'},
    lAlways:     {en:'Always',de:'Immer',nl:'Altijd',da:'Altid',sv:'Alltid',no:'Alltid',es:'Siempre',it:'Sempre',pt:'Sempre',fr:'Toujours',fi:'Aina'},
    lTap:        {en:'When I tap Willow',de:'Wenn ich Willow antippe',nl:'Als ik op Willow tik',da:'Når jeg trykker på Willow',sv:'När jag trycker på Willow',no:'Når jeg trykker på Willow',es:'Cuando toco a Willow',it:'Quando tocco Willow',pt:'Quando eu toco na Willow',fr:'Quand je touche Willow',fi:'Kun napautan Willow’ta'},
    ariaWillow:  {en:'Willow: read the two stories again',de:'Willow: die zwei Geschichten noch einmal vorlesen',nl:'Willow: lees de twee verhalen nog eens voor',da:'Willow: læs de to historier igen',sv:'Willow: läs de två berättelserna igen',no:'Willow: les de to fortellingene igjen',es:'Willow: lee otra vez los dos cuentos',it:'Willow: rileggi le due storie',pt:'Willow: leia as duas histórias de novo',fr:'Willow : relis les deux histoires',fi:'Willow: lue kaksi tarinaa uudelleen'},
    ariaTooth:   {en:'Tooth: {q}',de:'Zahn: {q}',nl:'Tandje: {q}',da:'Tand: {q}',sv:'Tand: {q}',no:'Tann: {q}',es:'Diente: {q}',it:'Dente: {q}',pt:'Dente: {q}',fr:'Dent : {q}',fi:'Hammas: {q}'},
    ariaLeft:    {en:'Left: only {a}',de:'Links: nur {a}',nl:'Links: alleen {a}',da:'Venstre: kun {a}',sv:'Vänster: bara {a}',no:'Venstre: bare {a}',es:'Izquierda: solo {a}',it:'Sinistra: solo {a}',pt:'Esquerda: só {a}',fr:'Gauche : seulement {a}',fi:'Vasen: vain {a}'},
    ariaMid:     {en:'Middle: both',de:'Mitte: beide',nl:'Midden: allebei',da:'Midten: begge',sv:'Mitten: båda',no:'Midten: begge',es:'Centro: los dos',it:'Centro: tutti e due',pt:'Meio: os dois',fr:'Milieu : les deux',fi:'Keskellä: molemmat'},
    ariaRight:   {en:'Right: only {a}',de:'Rechts: nur {a}',nl:'Rechts: alleen {a}',da:'Højre: kun {a}',sv:'Höger: bara {a}',no:'Høyre: bare {a}',es:'Derecha: solo {a}',it:'Destra: solo {a}',pt:'Direita: só {a}',fr:'Droite : seulement {a}',fi:'Oikea: vain {a}'},
    ariaPocket:  {en:'Pocket: neither',de:'Tasche: keine',nl:'Zakje: geen van beide',da:'Lomme: ingen af dem',sv:'Ficka: ingen av dem',no:'Lomme: ingen av dem',es:'Bolsillo: ninguno',it:'Tasca: nessuno dei due',pt:'Bolso: nenhum dos dois',fr:'Poche : aucun des deux',fi:'Tasku: ei kumpikaan'},
    ariaPanel:   {en:'{a}, picture {n}',de:'{a}, Bild {n}',nl:'{a}, plaatje {n}',da:'{a}, billede {n}',sv:'{a}, bild {n}',no:'{a}, bilde {n}',es:'{a}, dibujo {n}',it:'{a}, disegno {n}',pt:'{a}, figura {n}',fr:'{a}, image {n}',fi:'{a}, kuva {n}'},
    ariaSlider:  {en:'Pull the zipper',de:'Den Reißverschluss zuziehen',nl:'De rits dichttrekken',da:'Træk lynlåsen',sv:'Dra i blixtlåset',no:'Dra i glidelåsen',es:'Jala el cierre',it:'Tira la cerniera',pt:'Puxe o zíper',fr:'Tire la fermeture éclair',fi:'Vedä vetoketjua'},
    liveClosed:  {en:'The zipper closed.',de:'Der Reißverschluss ist zu.',nl:'De rits is dicht.',da:'Lynlåsen lukkede.',sv:'Blixtlåset stängdes.',no:'Glidelåsen lukket seg.',es:'El cierre se cerró.',it:'La cerniera si è chiusa.',pt:'O zíper fechou.',fr:'La fermeture éclair s’est fermée.',fi:'Vetoketju meni kiinni.'},
    liveJam:     {en:'The zipper jammed.',de:'Der Reißverschluss klemmt.',nl:'De rits zit vast.',da:'Lynlåsen sidder fast.',sv:'Blixtlåset fastnade.',no:'Glidelåsen satte seg fast.',es:'El cierre se atoró.',it:'La cerniera si è bloccata.',pt:'O zíper enroscou.',fr:'La fermeture éclair est coincée.',fi:'Vetoketju juuttui.'}
  },

  defaults: { compare: 'tales', listen: 'always' },
  settings: [
    { key: 'compare', type: 'choice', labelKey: 'setCompare', options: [{ value: 'tales', labelKey: 'cTales' }, { value: 'animals', labelKey: 'cAnimals' }] },
    { key: 'listen', type: 'choice', labelKey: 'setListen', options: [{ value: 'always', labelKey: 'lAlways' }, { value: 'tap', labelKey: 'lTap' }] }
  ],

  OK_MS: 500, FAST: false, READ_MS: 2200, PULL_MS: 700,

  init: function (api) {
    this.api = api;
    this.st = null; this._plan = null; this._planKey = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._drag = null; this._reading = null; this._read = {};
    injectZipperCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._planKey !== this._key()) { this._plan = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return StoryZipperCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _kind: function () { return this._set('compare') === 'animals' ? 'animals' : 'tales'; },
  _key: function () { return this._loc() + '/' + this._kind(); },
  _T: function () { return StoryZipperCore.DATA.TEXT[this._loc()]; },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },

  /* ---------------- rounds: a pass = three zippers × five teeth ---------------- */
  _ensurePlan: function (pass) {
    var k = this._key();
    if (!this._plan || this._planKey !== k) { this._planKey = k; this._pass = pass || 0; this._plan = StoryZipperCore.plan(this._kind(), Math.random, this._pass, null); }
    return this._plan;
  },
  /* the pass = the pool (the variety probe and visual-qa read it here) */
  _ensurePool: function () { return this._ensurePlan(0); },
  nextTask: function (opts) {
    var index = (opts && opts.index) || 0, C = StoryZipperCore, plan = this._ensurePlan(0), n = plan.length, pass = Math.floor(index / n);
    if (pass > this._pass) { this._plan = C.plan(this._kind(), Math.random, pass, this._plan); this._pass = pass; plan = this._plan; this._order = null; }
    this._pool = plan;
    var r = (this._order && this._orderForPool === plan && this._order.length === n) ? plan[this._order[index % n]] : plan[index % n], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'zipper.' + this._loc() + '.' + r.id, promptKey: 'instr', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._view = {}; tool._drag = null; tool._reading = null; tool.st = C.newState(r); if (r.row === 0) { tool._read = {}; tool._autoRead = tool._set('listen') !== 'tap'; } },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = StoryZipperCore; this.st = C.newState(C.plan(this._kind(), C.seeded('x'), 0, null)[0]); this._autoRead = this._set('listen') !== 'tap'; }
    this._render2();
    this._watchWidth();
    if (this._autoRead) { this._autoRead = false; this._startReading(); }
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sz-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    var top = api.el('div', 'sz-top'); wrap.appendChild(top);
    this._willowEl = api.el('button', 'sz-willow'); this._willowEl.type = 'button'; this._willowEl.setAttribute('data-k', 'willow');
    this._willowEl.addEventListener('click', function () { if (!self._busy) self._startReading(); }); top.appendChild(this._willowEl);
    this._toothEl = api.el('button', 'sz-tooth'); this._toothEl.type = 'button'; this._toothEl.setAttribute('data-k', 'tooth');
    this._toothEl.addEventListener('click', function () { if (self._free()) { self._view = { lifted: !self._view.lifted }; self._paint(); } });
    this._bindDrag(this._toothEl); top.appendChild(this._toothEl);
    this._stageEl = api.el('div', 'sz-stage'); wrap.appendChild(this._stageEl);
    this._barEl = api.el('div', 'sz-bar'); wrap.appendChild(this._barEl);
    var row = api.el('div', 'sz-row'); wrap.appendChild(row);
    var chk = api.el('button', 'sz-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._pull(); }); this._checkBtn = chk; row.appendChild(chk);
    var note = api.el('p', 'sz-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _sides: function () { var r = this.st.r; return StoryZipperCore.sides(r.kind, r.pair, r.swap); },
  _paint_: function () {
    if (!this._stageEl) return;
    var st = this.st, r = st.r, C = StoryZipperCore, v = this._view, T = this._T(), L = this._L = C.layout(this._width()), self = this;
    this._wrap.className = 'sz-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 300 ? ' is-tiny' : '') + ' is-' + r.kind + (st.done ? ' is-done' : '') + (v.zipped ? ' is-zipped' : '') + (this.FAST ? ' is-fast' : '');
    [['unit', L.unit], ['col', L.colW], ['zip', L.zipW], ['panel-h', L.panelH], ['animal', L.animal], ['badge', L.badge], ['gap', L.gap]].forEach(function (p) { this._wrap.style.setProperty('--sz-' + p[0], p[1] + 'px'); }, this);
    this._willowEl.innerHTML = ''; var wi = this.api.el('img', 'sz-img'); wi.alt = ''; wi.draggable = false; wi.src = this._pic(C.WILLOW); this._willowEl.appendChild(wi);
    this._willowEl.setAttribute('aria-label', this._t('ariaWillow')); this._willowEl.classList.toggle('is-reading', !!this._reading);
    /* the tooth: the question, on a brass tooth; it rides to its spot once placed */
    var q = T.q[r.pair + '.' + r.dim] || T.q[r.dim];
    this._toothEl.innerHTML = ''; this._toothEl.appendChild(this.api.el('span', 'sz-brass'));
    var qt = this.api.el('span', 'sz-q'); qt.textContent = q; this._toothEl.appendChild(qt);
    this._toothEl.setAttribute('aria-label', this._t('ariaTooth', { q: q }));
    this._toothEl.classList.toggle('is-lifted', !!v.lifted && !st.done); this._toothEl.classList.toggle('is-placed', !!st.spot); this._toothEl.disabled = !!st.done;
    /* the stage: left column, the zipper, right column */
    var S = this._sides(), help = C.helpOf(st) || {}, res = st.result, ev = st.done && res ? res.evidence : null;
    this._stageEl.innerHTML = '';
    this._stageEl.appendChild(this._column('left', S.left, help.left, ev ? ev.left : null));
    this._stageEl.appendChild(this._zipper(help));
    this._stageEl.appendChild(this._column('right', S.right, help.right, ev ? ev.right : null));
    /* the spot bar: left side / the middle / right side; the pocket sits at the foot of the zipper */
    this._barEl.innerHTML = '';
    [['left', 'ariaLeft', { a: T.names[S.left] }], ['mid', 'ariaMid', {}], ['right', 'ariaRight', { a: T.names[S.right] }]].forEach(function (x) {
      var b = self.api.el('button', 'sz-spot is-' + x[0] + (st.spot === x[0] ? ' is-on' : '') + (v.lifted && !st.spot ? ' is-wait' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'spot-' + x[0]); b.setAttribute('data-spot', x[0]); b.setAttribute('aria-label', self._t(x[1], x[2]));
      b.appendChild(self.api.el('span', 'sz-socket'));
      if (st.spot === x[0]) b.appendChild(self.api.el('span', 'sz-brass is-small'));
      b.disabled = !!st.done;
      b.addEventListener('click', function () { self._place(x[0]); });
      self._barEl.appendChild(b);
    });
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg; else if (v.caption) msg = v.caption; else if (h && !this._busy) msg = this._t(h);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!v.msg); this._note.classList.toggle('is-cap', !v.msg && !!v.caption); this._note.classList.toggle('is-wrong', !!(h && !v.msg && !v.caption && st.last && st.last.reason === 'wrong'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy; this._checkBtn.textContent = this._t('check');
  },
  /* a story column: three panels (tales) or one big animal; evidence glows on success (teal) and at miss 2 (gold) */
  _column: function (side, who, helpEv, okEv) {
    var api = this.api, self = this, r = this.st.r, C = StoryZipperCore, L = this._L, T = this._T();
    var col = api.el('div', 'sz-col is-' + side); col.setAttribute('data-side', side);
    var tag = api.el('span', 'sz-name'); tag.textContent = T.names[who]; col.appendChild(tag);
    if (r.kind === 'animals') {
      var A = C.DATA.ANIMALS[who], box = api.el('div', 'sz-beast' + (this._reading && this._reading.side === side ? ' is-reading' : '') + (this._dim(side, 0) ? ' is-dim' : ''));
      var im = api.el('img', 'sz-img'); im.alt = C.DATA.LABELS[A.pic][this._loc()] || ''; im.draggable = false; im.src = this._pic(A.pic); box.appendChild(im);
      var mark = (helpEv !== undefined && helpEv !== null) ? [helpEv, 'is-help'] : (okEv ? [okEv, 'is-ok'] : null);
      if (mark) { var g = api.el('span', 'sz-glow ' + mark[1]); g.style.left = mark[0][0] + '%'; g.style.top = mark[0][1] + '%'; g.style.width = g.style.height = (mark[0][2] * 2) + '%'; box.appendChild(g); }
      col.appendChild(box);
      return col;
    }
    var tale = C.DATA.TALES[who], wPanel = L.colW;
    tale.panels.forEach(function (p, i) {
      var ev = (helpEv === i) ? ' is-help' : (okEv === i ? ' is-ok' : '');
      var b = api.el('button', 'sz-panel' + ev + (self._reading && self._reading.side === side && self._reading.i === i ? ' is-reading' : '') + (self._dim(side, i) ? ' is-dim' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'panel-' + side + i); b.setAttribute('data-panel', side + i);
      b.setAttribute('aria-label', self._t('ariaPanel', { a: T.names[who], n: i + 1 }) + ': ' + T.caps[who][i]);
      var pic = api.el('span', 'sz-pic' + (p.d && p.d.night ? ' is-night' : ''));
      if (p.d && p.d.mound) pic.appendChild(api.el('span', 'sz-mound'));
      p.t.forEach(function (t) {
        var pl = C.placePic(t, wPanel - 6, L.panelH - 6, L.unit), s = api.el('span', 'sz-pp' + (t[4] === 'ghost' ? ' is-ghost' : ''));
        s.style.left = pl.left + 'px'; s.style.bottom = pl.bottom + 'px'; s.style.width = s.style.height = pl.size + 'px';
        var im = api.el('img', 'sz-img'); im.alt = ''; im.draggable = false; im.src = self._pic(t[0]); s.appendChild(im); pic.appendChild(s);
      });
      if (p.b) { var bd = api.el('img', 'sz-badge'); bd.alt = ''; bd.draggable = false; bd.src = self._pic(p.b); pic.appendChild(bd); }
      b.appendChild(pic);
      var cap = api.el('span', 'sz-cap'); cap.textContent = T.caps[who][i]; b.appendChild(cap);
      b.addEventListener('click', function () { if (self._drag) return; self._readOne(side, i); });
      col.appendChild(b);
    });
    return col;
  },
  /* the zipper: the slider at the top, five rows of teeth, the pocket at the foot */
  _zipper: function (help) {
    var api = this.api, self = this, st = this.st, r = st.r, v = this._view;
    var z = api.el('div', 'sz-zip' + (v.jam ? ' is-jam' : ''));
    var sl = api.el('button', 'sz-slider'); sl.type = 'button'; sl.setAttribute('data-k', 'slider'); sl.setAttribute('aria-label', this._t('ariaSlider'));
    sl.appendChild(api.el('span', 'sz-tab')); sl.disabled = !!st.done && !v.zipped;
    var at = v.zipped ? StoryZipperCore.ROWS : (v.pullTo !== undefined ? v.pullTo : r.row);
    sl.style.setProperty('--sz-at', at);
    sl.addEventListener('click', function () { self._pull(); });
    var track = api.el('div', 'sz-track');
    for (var k = 0; k < StoryZipperCore.ROWS; k++) {
      var h = k < r.row ? r.history[k].spot : (k === r.row && st.done ? st.spot : null);
      var row = api.el('span', 'sz-zrow' + (h ? ' is-' + h : '') + (k === r.row && !st.done ? ' is-now' : '') + (k === r.row && st.spot && !st.done ? ' is-try-' + st.spot : '') + (k === r.row && v.jam ? ' is-jammed' : ''));
      row.appendChild(api.el('span', 'sz-half is-l')); row.appendChild(api.el('span', 'sz-half is-r'));
      track.appendChild(row);
    }
    z.appendChild(sl); z.appendChild(track);
    var pk = api.el('button', 'sz-pocket' + (st.spot === 'pocket' ? ' is-on' : '') + (help.pocket ? ' is-help' : '') + (v.lifted && !st.spot ? ' is-wait' : ''));
    pk.type = 'button'; pk.setAttribute('data-k', 'spot-pocket'); pk.setAttribute('data-spot', 'pocket'); pk.setAttribute('aria-label', this._t('ariaPocket'));
    var n = r.history.filter(function (x) { return x.spot === 'pocket'; }).length + (st.done && st.spot === 'pocket' ? 1 : 0);
    for (var q = 0; q < n; q++) pk.appendChild(api.el('span', 'sz-brass is-tiny'));
    if (st.spot === 'pocket' && !st.done) pk.appendChild(api.el('span', 'sz-brass is-small is-try'));
    pk.disabled = !!st.done;
    pk.addEventListener('click', function () { self._place('pocket'); });
    z.appendChild(pk);
    return z;
  },
  _dim: function (side, i) { return !!(this._reading && !this._read[side + i]); },

  /* ---------------- reading: Willow reads both stories, panel by panel ---------------- */
  _startReading: function () {
    var self = this, r = this.st.r, S = this._sides(), T = this._T(), seq = [];
    ['left', 'right'].forEach(function (side) { if (r.kind === 'animals') seq.push([side, 0]); else for (var i = 0; i < 3; i++) seq.push([side, i]); });
    this._clearTimers(); this._read = {};
    var step = function (k) {
      if (k >= seq.length) { self._reading = null; self._view = { lifted: self._view.lifted }; self._paint(); return; }
      var side = seq[k][0], i = seq[k][1], who = S[side];
      self._reading = { side: side, i: i }; self._read[side + i] = true;
      var cap = r.kind === 'animals' ? T.names[who] : T.caps[who][i];
      self._view = { caption: cap, lifted: self._view.lifted }; self._paint(); self._say(cap);
      self._later(function () { step(k + 1); }, self._ms(self.READ_MS));
    };
    step(0);
  },
  _readOne: function (side, i) {
    var r = this.st.r, T = this._T(), who = this._sides()[side], cap = r.kind === 'animals' ? T.names[who] : T.caps[who][i];
    if (this._reading) return;
    this._view = { caption: cap, lifted: this._view.lifted }; this._paint(); this._say(cap);
  },

  /* ---------------- the hand ---------------- */
  _free: function () { return !(this._busy || this.st.done); },
  _place: function (spot) {
    if (!this._free()) return;
    if (StoryZipperCore.place(this.st, spot)) { this._view = {}; this.api.sound(520); this._paint(); }
  },
  _bindDrag: function (el) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (!self._free() || (ev.button !== undefined && ev.button !== 0)) return;
      var ghost = null, sx = ev.clientX, sy = ev.clientY; try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var targets = function () { return self._wrap.querySelectorAll('.sz-spot,.sz-pocket,.sz-col,.sz-track'); };
      var spotOf = function (n) { return n.getAttribute('data-spot') || (n.classList.contains('sz-track') ? 'mid' : n.getAttribute('data-side')); };
      var at = function (x, y) { var ss = targets(), hit = null; for (var z = 0; z < ss.length; z++) { var rc = ss[z].getBoundingClientRect(); if (x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom) { if (!hit || ss[z].classList.contains('sz-spot') || ss[z].classList.contains('sz-pocket')) hit = ss[z]; } } return hit; };
      var move = function (e) {
        if (!ghost && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!ghost) { self._drag = {}; ghost = self.api.el('span', 'sz-ghost'); ghost.appendChild(self.api.el('span', 'sz-brass')); document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - 22) + 'px'; ghost.style.top = (e.clientY - 22) + 'px';
        var h = at(e.clientX, e.clientY); [].forEach.call(targets(), function (s) { s.classList.toggle('is-over', s === h); });
      };
      var up = function (e) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        if (!ghost) return;
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost); self._drag = null;
        var h = at(e.clientX, e.clientY);
        if (h) self._place(spotOf(h)); else self._paint();
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    var k = ev.key, map = { ArrowLeft: 'left', ArrowDown: 'mid', ArrowRight: 'right', p: 'pocket', P: 'pocket' };
    if (map[k] && ev.target === this._wrap) { ev.preventDefault(); this._place(map[k]); return; }
    if (k === 'Enter' && ev.target === this._wrap) { ev.preventDefault(); this._pull(); }
  },

  /* ---------------- the pull ---------------- */
  _pull: function () {
    if (!this._free()) return;
    var self = this, st = this.st, C = StoryZipperCore, res = C.pull(st);
    if (res.reason === 'empty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    this._busy = true; this._clearTimers(); this._reading = null;
    this.api.sound(res.ok ? 640 : 300);
    if (res.ok) return this._win(res);
    this._view = { jam: true }; this._paint();
    this.api.announce(this._t('liveJam'));
    this._later(function () { self._busy = false; self.api.sound(196); self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(this.PULL_MS));
  },
  _win: function () {
    var self = this, st = this.st, r = st.r, T = this._T(), pa = this._pa || {};
    var msg = T.ok[r.pair + '.' + r.dim] + (r.last ? ' ' + this._t('okZip') : '');
    pa.msg = msg; this._view = { msg: msg }; this._paint();
    this.api.announce(this._t('liveClosed'));
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110));
    if (r.last) this._later(function () { self._view = { msg: msg, zipped: true }; self._paint(); self.api.sound(1046); }, this._ms(500));
    this._later(function () { self._busy = false; self._paint(); }, this._ms(600));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var szCssDone = false;
function injectZipperCSS() {
  if (szCssDone || typeof document === 'undefined') return;
  szCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sz-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--sz-ink:#2A2A35;--sz-teal:#146B5E;--sz-coral:#F2784B;--sz-cream:#FFF8EC;--sz-gold:#E8B83A;--sz-brass:#C9A227;--sz-brass-d:#8B6B12;user-select:none;-webkit-user-select:none;}'
  + '.sz-wrap:focus{outline:none;}'
  + '.sz-top{display:flex;align-items:center;gap:10px;width:100%;}'
  + '.sz-willow{flex:none;width:96px;height:96px;padding:0;border:0;background:transparent;cursor:pointer;border-radius:50%;}'
  + '.sz-willow .sz-img{width:96px;height:96px;object-fit:contain;display:block;} .sz-willow.is-reading{animation:szNod 1.1s ease-in-out infinite;}'
  + '.sz-tooth{flex:1;min-width:0;min-height:52px;display:flex;align-items:center;gap:10px;padding:6px 14px 6px 8px;border:0;border-radius:14px;background:#FFF6D9;box-shadow:inset 0 0 0 3px var(--sz-brass-d),0 3px 0 #C9B999;cursor:grab;touch-action:none;text-align:left;}'
  + '.sz-tooth.is-lifted{box-shadow:inset 0 0 0 4px var(--sz-teal),0 6px 0 #C9B999;transform:translateY(-2px);} .sz-tooth.is-placed .sz-brass{opacity:.35;} .sz-tooth:disabled{cursor:default;}'
  + '.sz-q{font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.25;color:var(--sz-ink);}'
  + '.sz-brass{flex:none;display:inline-block;width:34px;height:30px;border-radius:6px 6px 12px 12px;background:linear-gradient(180deg,#E9CC6A,var(--sz-brass) 55%,var(--sz-brass-d));box-shadow:inset 0 -3px 0 rgba(0,0,0,.18),0 2px 0 rgba(0,0,0,.2);position:relative;}'
  + '.sz-brass::after{content:"";position:absolute;left:50%;top:6px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:rgba(255,255,255,.45);}'
  + '.sz-brass.is-small{width:26px;height:22px;} .sz-brass.is-tiny{width:16px;height:13px;margin:1px;} .sz-brass.is-small::after{width:7px;height:7px;margin-left:-3.5px;top:4px;} .sz-brass.is-tiny::after{display:none;}'
  + '.sz-stage{display:grid;grid-template-columns:var(--sz-col) var(--sz-zip) var(--sz-col);gap:var(--sz-gap);width:100%;justify-content:center;align-items:stretch;}'
  + '.sz-col{position:relative;display:flex;flex-direction:column;gap:6px;min-width:0;transition:transform .5s ease;}'
  + '.sz-wrap.is-zipped .sz-col.is-left{transform:translateX(5px);} .sz-wrap.is-zipped .sz-col.is-right{transform:translateX(-5px);}'
  + '.sz-name{position:absolute;z-index:1;left:8px;top:7px;pointer-events:none;font-family:' + D + ';font-weight:700;font-size:17px;line-height:1.1;color:var(--sz-teal);padding:2px 12px;border-radius:999px;background:rgba(230,242,239,.94);box-shadow:0 1px 0 rgba(0,0,0,.08);}'
  + '.sz-panel{display:flex;flex-direction:column;gap:4px;padding:3px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px var(--sz-ink);cursor:pointer;text-align:center;transition:opacity .3s,box-shadow .2s;}'
  + '.sz-panel.is-dim,.sz-beast.is-dim{opacity:.35;} .sz-panel.is-reading,.sz-beast.is-reading{box-shadow:inset 0 0 0 4px var(--sz-gold),0 0 0 3px rgba(232,184,58,.45);}'
  + '.sz-panel.is-ok{box-shadow:inset 0 0 0 4px var(--sz-teal),0 0 0 4px rgba(20,107,94,.25);} .sz-panel.is-help{box-shadow:inset 0 0 0 4px var(--sz-gold),0 0 0 6px rgba(232,184,58,.55);animation:szGlow 1.2s ease-in-out infinite;}'
  + '.sz-pic{position:relative;display:block;height:var(--sz-panel-h);border-radius:9px;overflow:hidden;background:linear-gradient(180deg,#DCEEFB 0,#F1F8FD 64%,#C9E3A8 64%,#B5D88E 100%);}'
  + '.sz-pic.is-night{background:linear-gradient(180deg,#1E2A55 0,#3A4A80 64%,#4E6B5C 64%,#3E5A4A 100%);}'
  + '.sz-pp{position:absolute;display:block;} .sz-pp .sz-img{width:100%;height:100%;object-fit:contain;display:block;}'
  + '.sz-pp.is-ghost .sz-img{filter:grayscale(1) brightness(1.5);opacity:.35;} .sz-pp.is-ghost{outline:3px dashed #8E8E9C;outline-offset:-2px;border-radius:50%;}'
  + '.sz-mound{position:absolute;left:28%;right:12%;bottom:4%;height:18%;border-radius:50% 50% 8px 8px;background:#E7C88E;box-shadow:inset 0 -4px 0 #D2B072;}'
  + '.sz-badge{position:absolute;right:4px;top:4px;width:var(--sz-badge);height:var(--sz-badge);object-fit:contain;}'
  + '.sz-cap{display:block;font-family:' + B + ';font-weight:700;font-size:15px;line-height:1.25;color:var(--sz-ink);padding:0 4px 2px;}'
  + '.sz-beast{position:relative;flex:1;display:flex;align-items:center;justify-content:center;height:calc(var(--sz-animal) + 24px);border-radius:12px;background:linear-gradient(180deg,#DCEEFB 0,#F1F8FD 70%,#C9E3A8 70%);box-shadow:inset 0 0 0 3px var(--sz-ink);transition:opacity .3s;}'
  + '.sz-beast .sz-img{width:var(--sz-animal);height:var(--sz-animal);object-fit:contain;}'
  + '.sz-glow{position:absolute;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;}'
  + '.sz-beast .sz-glow{margin-left:0;} .sz-beast{--gx:0;}'
  + '.sz-glow.is-ok{box-shadow:0 0 0 4px var(--sz-teal),0 0 0 8px rgba(20,107,94,.25);} .sz-glow.is-help{box-shadow:0 0 0 4px var(--sz-gold),0 0 0 9px rgba(232,184,58,.5);animation:szGlow 1.2s ease-in-out infinite;}'
  /* the zipper */
  + '.sz-zip{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:4px;}'
  + '.sz-slider{position:relative;z-index:2;width:48px;height:48px;padding:0;border:0;border-radius:12px 12px 20px 20px;background:linear-gradient(180deg,#B8BCC6,#8D93A0);box-shadow:inset 0 0 0 3px #5E6470,0 3px 0 rgba(0,0,0,.2);cursor:pointer;transition:transform .5s ease;}'
  + '.sz-tab{position:absolute;left:50%;top:9px;width:18px;height:28px;margin-left:-9px;border-radius:9px;background:#5E6470;box-shadow:inset 0 0 0 4px #C8CCD5;}'
  + '.sz-zip.is-jam .sz-slider{animation:szJam .5s ease;}'
  + '.sz-track{position:relative;flex:1;width:100%;display:flex;flex-direction:column;justify-content:space-around;gap:6px;padding:6px 0;border-radius:10px;background:repeating-linear-gradient(180deg,#F6EBD0 0 6px,#EEDDB4 6px 12px);box-shadow:inset 0 0 0 2px #D9C38E;}'
  + '.sz-zrow{position:relative;display:flex;justify-content:center;align-items:center;gap:14px;height:28px;transition:gap .3s;}'
  + '.sz-half{display:block;width:calc((var(--sz-zip) - 24px) / 2);max-width:40px;height:20px;border-radius:5px;background:#D6CDB8;box-shadow:inset 0 0 0 2px #B9AC8E;transition:all .3s;}'
  + '.sz-zrow.is-now{outline:3px dashed var(--sz-teal);outline-offset:2px;border-radius:8px;}'
  + '.sz-zrow.is-mid{gap:0;} .sz-zrow.is-mid .sz-half{background:linear-gradient(180deg,#E9CC6A,var(--sz-brass));box-shadow:inset 0 -3px 0 rgba(0,0,0,.18);}'
  + '.sz-zrow.is-left .sz-half.is-l,.sz-zrow.is-right .sz-half.is-r{background:linear-gradient(180deg,#E9CC6A,var(--sz-brass));box-shadow:inset 0 -3px 0 rgba(0,0,0,.18);transform:scaleX(1.35);}'
  + '.sz-zrow.is-left .sz-half.is-l{transform-origin:right center;} .sz-zrow.is-right .sz-half.is-r{transform-origin:left center;}'
  + '.sz-zrow.is-pocket .sz-half{opacity:.4;}'
  + '.sz-zrow.is-try-mid .sz-half{background:#F3E2A6;} .sz-zrow.is-try-left .sz-half.is-l,.sz-zrow.is-try-right .sz-half.is-r{background:#F3E2A6;}'
  + '.sz-zrow.is-jammed{animation:szShake .45s ease;outline-color:var(--sz-coral);}'
  + '.sz-pocket{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;width:100%;min-height:52px;padding:4px;border:0;border-radius:6px 6px 16px 16px;background:#E9DEC6;box-shadow:inset 0 0 0 2px #B9AC8E;outline:2px dashed #A4977A;outline-offset:-7px;cursor:pointer;}'
  + '.sz-pocket.is-on{box-shadow:inset 0 0 0 4px var(--sz-teal);} .sz-pocket.is-help{animation:szGlow 1.2s ease-in-out infinite;outline-color:var(--sz-gold);}'
  + '.sz-pocket.is-wait,.sz-spot.is-wait{animation:szWait 1.2s ease-in-out infinite;}'
  /* the spot bar */
  + '.sz-bar{display:grid;grid-template-columns:var(--sz-col) var(--sz-zip) var(--sz-col);gap:var(--sz-gap);width:100%;justify-content:center;}'
  + '.sz-spot{position:relative;min-height:52px;display:flex;align-items:center;justify-content:center;gap:6px;padding:4px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px var(--sz-ink),0 3px 0 #C9B999;cursor:pointer;}'
  + '.sz-spot.is-on{box-shadow:inset 0 0 0 4px var(--sz-teal),0 3px 0 #C9B999;background:#EAF6F3;}'
  + '.sz-socket{display:block;width:30px;height:24px;border-radius:6px 6px 11px 11px;border:3px dashed #A4977A;box-sizing:border-box;}'
  + '.sz-spot.is-left .sz-socket{margin-left:auto;} .sz-spot.is-right .sz-socket{margin-right:auto;}'
  + '.sz-spot.is-on .sz-socket{display:none;}'
  + '.sz-spot.is-left::before,.sz-spot.is-right::after{content:"";width:0;height:0;border-top:9px solid transparent;border-bottom:9px solid transparent;}'
  + '.sz-spot.is-left::before{border-right:12px solid var(--sz-ink);order:-1;margin-right:auto;} .sz-spot.is-right::after{border-left:12px solid var(--sz-ink);order:9;margin-left:auto;}'
  + '.sz-spot.is-over,.sz-pocket.is-over,.sz-col.is-over .sz-name,.sz-track.is-over{box-shadow:inset 0 0 0 4px var(--sz-gold);}'
  + '.sz-row{display:flex;justify-content:flex-end;width:100%;}'
  + '.sz-check{min-height:52px;min-width:136px;padding:0 26px;border:0;border-radius:14px;background:var(--sz-coral);box-shadow:0 4px 0 #C55A30;color:#fff;font-family:' + D + ';font-weight:700;font-size:21px;cursor:pointer;}'
  + '.sz-check:disabled{opacity:.6;cursor:default;}'
  + '.sz-note{min-height:1.3em;margin:0;font-family:' + B + ';font-weight:700;font-size:20px;line-height:1.35;color:#9A4A1C;text-align:center;}'
  + '.sz-note.is-ok{color:var(--sz-teal);font-size:22px;} .sz-wrap.is-narrow .sz-note{font-size:17px;} .sz-wrap.is-narrow .sz-note.is-ok{font-size:18px;} .sz-note.is-cap{color:var(--sz-ink);}'
  + '.sz-ghost{position:fixed;z-index:50;pointer-events:none;width:44px;height:44px;display:flex;align-items:center;justify-content:center;}'
  /* narrow: captions move to the note line (Willow reads them there); smaller furniture */
  + '.sz-wrap.is-narrow{gap:8px;} .sz-wrap.is-narrow .sz-cap{display:none;} .sz-wrap.is-narrow .sz-willow,.sz-wrap.is-narrow .sz-willow .sz-img{width:64px;height:64px;}'
  + '.sz-wrap.is-narrow .sz-q{font-size:17px;} .sz-wrap.is-narrow .sz-name{font-size:14px;left:5px;top:5px;padding:1px 8px;} .sz-wrap.is-narrow .sz-col{gap:5px;} .sz-wrap.is-narrow .sz-zrow{height:22px;gap:8px;} .sz-wrap.is-narrow .sz-half{height:16px;}'
  + '.sz-wrap.is-narrow .sz-slider{width:46px;height:46px;} .sz-wrap.is-narrow .sz-spot,.sz-wrap.is-narrow .sz-pocket{min-height:46px;} .sz-wrap.is-narrow .sz-check{min-height:48px;min-width:118px;font-size:19px;}'
  + '.sz-wrap.is-narrow .sz-socket{width:24px;height:20px;} .sz-wrap.is-narrow .sz-spot.is-mid .sz-socket{width:22px;}'
  + '@keyframes szNod{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}'
  + '@keyframes szGlow{0%,100%{filter:none}50%{filter:brightness(1.08)}}'
  + '@keyframes szJam{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translate(-3px,-6px)}80%{transform:translateX(2px)}}'
  + '@keyframes szShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}'
  + '@keyframes szWait{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}'
  + '.sz-wrap.is-fast *,.sz-wrap.is-fast *::before,.sz-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.sz-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'sz-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.WillowStoryCornerActivity = WillowStoryCornerActivity;
