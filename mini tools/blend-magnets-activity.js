/* =====================================================================
   blend-magnets-activity.js — ACTIVITY #54 of the one-by-one rebuild:
   "Blend Onset and Rime" → THE BLENDING MAGNETS (RF.K.2.c, 11 locales).
   Design sheet: docs/activities-rebuild/designs/054-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: the first sound and the rest of the word are magnets on a
   rail; the gap between them is the pause (a dotted stretch line and a row
   of pause dots), and pushed close enough they snap into one word. Then
   tap the picture: Check runs the magnet test on its own name, part by
   part — matching parts attract, different parts jump away — so the rhyme
   shows "the end sticks, the start does not". Miss 2: every picture shows
   its first letter(s) on a little magnet. Right: the word goes onto the
   fridge as a word magnet. Level 2: one magnet per sound.

   ACTIVITY LAYER ONLY: the model is blend-magnets-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.BlendMagnetsActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var BlendMagnetsActivity = {
  id: 'blend-magnets',
  apparatusClasses: ['bmg-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:       {en:'The Blending Magnets',de:'Die Laut-Magnete',nl:'De klankmagneten',da:'Lydmagneterne',sv:'Ljudmagneterna',no:'Lydmagnetene',es:'Los imanes de sonidos',it:'Le calamite dei suoni',pt:'Os ímãs dos sons',fr:'Les aimants des sons',fi:'Äännemagneetit'},
    instruction: {en:'Push the first sound into the rest of the word until the magnets snap together. Then tap the picture of the word.',de:'Schieb den ersten Laut an den Rest des Wortes, bis die Magnete zusammenschnappen. Tipp dann auf das Bild zum Wort.',nl:'Duw de eerste klank tegen de rest van het woord tot de magneten vastklikken. Tik dan op het plaatje van het woord.',da:'Skub den første lyd hen til resten af ordet, til magneterne klikker sammen. Tryk så på billedet af ordet.',sv:'Skjut det första ljudet mot resten av ordet tills magneterna klickar ihop. Tryck sedan på bilden av ordet.',no:'Skyv den første lyden inntil resten av ordet til magnetene klikker sammen. Trykk så på bildet av ordet.',es:'Empuja el primer sonido hacia el resto de la palabra hasta que los imanes se peguen. Luego toca el dibujo de la palabra.',it:'Spingi il primo suono verso il resto della parola finché le calamite si attaccano. Poi tocca il disegno della parola.',pt:'Empurre o primeiro som em direção ao resto da palavra até os ímãs grudarem. Depois toque na figura da palavra.',fr:'Pousse le premier son vers le reste du mot jusqu’à ce que les aimants se collent. Puis touche l’image du mot.',fi:'Työnnä ensimmäinen äänne sanan loppuosaa vasten, kunnes magneetit napsahtavat yhteen. Napauta sitten sanan kuvaa.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    pOnset:      {en:'Push the first sound into the rest of the word, then tap its picture.',de:'Schieb den ersten Laut an den Rest des Wortes und tipp dann auf das Bild.',nl:'Duw de eerste klank tegen de rest van het woord en tik op het plaatje.',da:'Skub den første lyd hen til resten af ordet, og tryk på billedet.',sv:'Skjut det första ljudet mot resten av ordet och tryck på bilden.',no:'Skyv den første lyden inntil resten av ordet, og trykk på bildet.',es:'Empuja el primer sonido hacia el resto de la palabra y toca el dibujo.',it:'Spingi il primo suono verso il resto della parola e tocca il disegno.',pt:'Empurre o primeiro som em direção ao resto da palavra e toque na figura.',fr:'Pousse le premier son vers le reste du mot, puis touche l’image.',fi:'Työnnä ensimmäinen äänne sanan loppuosaa vasten ja napauta kuvaa.'},
    pSounds:     {en:'Push the sounds together, then tap the picture.',de:'Schieb die Laute zusammen und tipp dann auf das Bild.',nl:'Duw de klanken tegen elkaar en tik op het plaatje.',da:'Skub lydene sammen, og tryk på billedet.',sv:'Skjut ihop ljuden och tryck på bilden.',no:'Skyv lydene sammen, og trykk på bildet.',es:'Junta los sonidos y toca el dibujo.',it:'Avvicina i suoni e tocca il disegno.',pt:'Junte os sons e toque na figura.',fr:'Rapproche les sons, puis touche l’image.',fi:'Työnnä äänteet yhteen ja napauta kuvaa.'},
    hintSnap:    {en:'Push the magnets together first.',de:'Schieb zuerst die Magnete zusammen.',nl:'Duw eerst de magneten tegen elkaar.',da:'Skub først magneterne sammen.',sv:'Skjut ihop magneterna först.',no:'Skyv magnetene sammen først.',es:'Primero junta los imanes.',it:'Prima unisci le calamite.',pt:'Primeiro junte os ímãs.',fr:'Colle d’abord les aimants ensemble.',fi:'Työnnä ensin magneetit yhteen.'},
    hintChoose:  {en:'Now tap the picture of the word.',de:'Tipp jetzt auf das Bild zum Wort.',nl:'Tik nu op het plaatje van het woord.',da:'Tryk nu på billedet af ordet.',sv:'Tryck nu på bilden av ordet.',no:'Trykk nå på bildet av ordet.',es:'Ahora toca el dibujo de la palabra.',it:'Ora tocca il disegno della parola.',pt:'Agora toque na figura da palavra.',fr:'Touche maintenant l’image du mot.',fi:'Napauta nyt sanan kuvaa.'},
    hintRhyme:   {en:'The ends stick together, but the first sounds push apart. Listen to the first sound.',de:'Die Enden halten zusammen, aber die ersten Laute stoßen sich ab. Hör auf den ersten Laut.',nl:'De eindjes plakken, maar de eerste klanken duwen elkaar weg. Luister naar de eerste klank.',da:'Enderne hænger sammen, men de første lyde skubber hinanden væk. Lyt til den første lyd.',sv:'Slutet på orden fastnar, men de första ljuden stöter bort varandra. Lyssna på det första ljudet.',no:'Endene henger sammen, men de første lydene skyver hverandre bort. Lytt til den første lyden.',es:'Los finales se pegan, pero los primeros sonidos se empujan. Escucha el primer sonido.',it:'Le parti finali si attaccano, ma i primi suoni si respingono. Ascolta il primo suono.',pt:'Os finais grudam, mas os primeiros sons se empurram. Escute o primeiro som.',fr:'Les fins se collent, mais les premiers sons se repoussent. Écoute le premier son.',fi:'Loppuosat tarttuvat toisiinsa, mutta ensimmäiset äänteet hylkivät toisiaan. Kuuntele ensimmäistä äännettä.'},
    hintOnset:   {en:'The first sounds stick together, but the ends push apart. Listen to the end of the word.',de:'Die ersten Laute halten zusammen, aber die Enden stoßen sich ab. Hör auf das Ende des Wortes.',nl:'De eerste klanken plakken, maar de eindjes duwen elkaar weg. Luister naar het eind van het woord.',da:'De første lyde hænger sammen, men enderne skubber hinanden væk. Lyt til slutningen af ordet.',sv:'De första ljuden fastnar, men slutet på orden stöter bort varandra. Lyssna på slutet av ordet.',no:'De første lydene henger sammen, men endene skyver hverandre bort. Lytt til slutten av ordet.',es:'Los primeros sonidos se pegan, pero los finales se empujan. Escucha el final de la palabra.',it:'I primi suoni si attaccano, ma le parti finali si respingono. Ascolta la fine della parola.',pt:'Os primeiros sons grudam, mas os finais se empurram. Escute o final da palavra.',fr:'Les premiers sons se collent, mais les fins se repoussent. Écoute la fin du mot.',fi:'Ensimmäiset äänteet tarttuvat toisiinsa, mutta loppuosat hylkivät toisiaan. Kuuntele sanan loppua.'},
    hintNone:    {en:'Nothing sticks together. Listen to the whole word.',de:'Nichts hält zusammen. Hör dir das ganze Wort an.',nl:'Er plakt niets. Luister naar het hele woord.',da:'Intet hænger sammen. Lyt til hele ordet.',sv:'Ingenting fastnar. Lyssna på hela ordet.',no:'Ingenting henger sammen. Lytt til hele ordet.',es:'Nada se pega. Escucha la palabra completa.',it:'Non si attacca niente. Ascolta tutta la parola.',pt:'Nada gruda. Escute a palavra inteira.',fr:'Rien ne se colle. Écoute le mot en entier.',fi:'Mikään ei tartu. Kuuntele koko sanaa.'},
    hintSounds:  {en:'Sounds that stick: {n}. Sounds that push apart: {m}.',de:'Laute, die halten: {n}. Laute, die sich abstoßen: {m}.',nl:'Klanken die plakken: {n}. Klanken die elkaar wegduwen: {m}.',da:'Lyde, der hænger sammen: {n}. Lyde, der skubber væk: {m}.',sv:'Ljud som fastnar: {n}. Ljud som stöter bort: {m}.',no:'Lyder som henger sammen: {n}. Lyder som skyver bort: {m}.',es:'Sonidos que se pegan: {n}. Sonidos que se empujan: {m}.',it:'Suoni che si attaccano: {n}. Suoni che si respingono: {m}.',pt:'Sons que grudam: {n}. Sons que se empurram: {m}.',fr:'Sons qui se collent : {n}. Sons qui se repoussent : {m}.',fi:'Tarttuvia äänteitä: {n}. Hylkiviä äänteitä: {m}.'},
    hintHelp:    {en:'Look at the first letters on the pictures. Which one starts with {onset}?',de:'Schau auf die ersten Buchstaben an den Bildern. Welches Bild fängt mit {onset} an?',nl:'Kijk naar de eerste letters bij de plaatjes. Welk plaatje begint met {onset}?',da:'Se på de første bogstaver ved billederne. Hvilket billede begynder med {onset}?',sv:'Titta på de första bokstäverna vid bilderna. Vilken bild börjar med {onset}?',no:'Se på de første bokstavene ved bildene. Hvilket bilde begynner med {onset}?',es:'Mira las primeras letras en los dibujos. ¿Cuál empieza con «{onset}»?',it:'Guarda le prime lettere sui disegni. Quale comincia con «{onset}»?',pt:'Olhe as primeiras letras nas figuras. Qual começa com “{onset}”?',fr:'Regarde les premières lettres sur les images. Laquelle commence par « {onset} » ?',fi:'Katso kuvien ensimmäisiä kirjaimia. Mikä kuva alkaa kirjaimella {onset}?'},
    okOnset:     {en:'{onset} + {rime} = {word}!',de:'{onset} + {rime} = {word}!',nl:'{onset} + {rime} = {word}!',da:'{onset} + {rime} = {word}!',sv:'{onset} + {rime} = {word}!',no:'{onset} + {rime} = {word}!',es:'¡{onset} + {rime} = {word}!',it:'{onset} + {rime} = {word}!',pt:'{onset} + {rime} = {word}!',fr:'{onset} + {rime} = {word} !',fi:'{onset} + {rime} = {word}!'},
    okSounds:    {en:'{dash}: {n} sounds, one word: {word}!',de:'{dash}: {n} Laute, ein Wort: {word}!',nl:'{dash}: {n} klanken, één woord: {word}!',da:'{dash}: {n} lyde, ét ord: {word}!',sv:'{dash}: {n} ljud, ett ord: {word}!',no:'{dash}: {n} lyder, ett ord: {word}!',es:'{dash}: {n} sonidos, una palabra: ¡{word}!',it:'{dash}: {n} suoni, una parola: {word}!',pt:'{dash}: {n} sons, uma palavra: {word}!',fr:'{dash} : {n} sons, un seul mot : {word} !',fi:'{dash}: {n} äännettä, yksi sana: {word}!'},
    setLevel:    {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lvOnset:     {en:'First sound + rest',de:'Erster Laut + Rest',nl:'Eerste klank + rest',da:'Første lyd + resten',sv:'Första ljudet + resten',no:'Første lyd + resten',es:'Primer sonido + resto',it:'Primo suono + resto',pt:'Primeiro som + resto',fr:'Premier son + reste',fi:'Ensimmäinen äänne + loppu'},
    lvSounds:    {en:'Single sounds',de:'Einzelne Laute',nl:'Losse klanken',da:'Enkelte lyde',sv:'Enskilda ljud',no:'Enkeltlyder',es:'Sonidos sueltos',it:'Suoni singoli',pt:'Sons separados',fr:'Sons un par un',fi:'Yksittäiset äänteet'},
    setPull:     {en:'Magnet pull',de:'Magnetkraft',nl:'Magneetkracht',da:'Magnetkraft',sv:'Magnetkraft',no:'Magnetkraft',es:'Fuerza del imán',it:'Forza della calamita',pt:'Força do ímã',fr:'Force des aimants',fi:'Magneetin voima'},
    optStrong:   {en:'Strong',de:'Stark',nl:'Sterk',da:'Stærk',sv:'Stark',no:'Sterk',es:'Fuerte',it:'Forte',pt:'Forte',fr:'Forte',fi:'Vahva'},
    optGentle:   {en:'Gentle',de:'Sanft',nl:'Zacht',da:'Blid',sv:'Svag',no:'Svak',es:'Suave',it:'Debole',pt:'Fraca',fr:'Douce',fi:'Heikko'},
    ariaMagnet:  {en:'Magnet {s}',de:'Magnet {s}',nl:'Magneet {s}',da:'Magnet {s}',sv:'Magnet {s}',no:'Magnet {s}',es:'Imán {s}',it:'Calamita {s}',pt:'Ímã {s}',fr:'Aimant {s}',fi:'Magneetti {s}'},
    ariaGap:     {en:'Gap: {k} dots',de:'Abstand: {k} Punkte',nl:'Afstand: {k} stippen',da:'Afstand: {k} prikker',sv:'Avstånd: {k} prickar',no:'Avstand: {k} prikker',es:'Espacio: {k} puntos',it:'Distanza: {k} puntini',pt:'Distância: {k} pontinhos',fr:'Écart : {k} points',fi:'Väli: {k} pistettä'},
    ariaSnapped: {en:'Snapped: {word}',de:'Zusammen: {word}',nl:'Vast: {word}',da:'Klikket sammen: {word}',sv:'Ihopklickade: {word}',no:'Klikket sammen: {word}',es:'Pegados: {word}',it:'Attaccate: {word}',pt:'Grudados: {word}',fr:'Collés : {word}',fi:'Yhdessä: {word}'},
    ariaPicture: {en:'Picture {n} of 3: {word}',de:'Bild {n} von 3: {word}',nl:'Plaatje {n} van 3: {word}',da:'Billede {n} af 3: {word}',sv:'Bild {n} av 3: {word}',no:'Bilde {n} av 3: {word}',es:'Dibujo {n} de 3: {word}',it:'Disegno {n} di 3: {word}',pt:'Figura {n} de 3: {word}',fr:'Image {n} sur 3 : {word}',fi:'Kuva {n}/3: {word}'},
    ariaFridge:  {en:'Fridge: {count} words',de:'Kühlschrank: {count} Wörter',nl:'Koelkast: {count} woorden',da:'Køleskab: {count} ord',sv:'Kylskåp: {count} ord',no:'Kjøleskap: {count} ord',es:'Refrigerador: {count} palabras',it:'Frigorifero: {count} parole',pt:'Geladeira: {count} palavras',fr:'Frigo : {count} mots',fi:'Jääkaappi: {count} sanaa'},
    ariaFridge1: {en:'Fridge: 1 word',de:'Kühlschrank: 1 Wort',nl:'Koelkast: 1 woord',da:'Køleskab: 1 ord',sv:'Kylskåp: 1 ord',no:'Kjøleskap: 1 ord',es:'Refrigerador: 1 palabra',it:'Frigorifero: 1 parola',pt:'Geladeira: 1 palavra',fr:'Frigo : 1 mot',fi:'Jääkaappi: 1 sana'},
    ariaSay:     {en:'Hear the magnets',de:'Magnete anhören',nl:'Luister naar de magneten',da:'Hør magneterne',sv:'Lyssna på magneterna',no:'Hør på magnetene',es:'Escuchar los imanes',it:'Ascolta le calamite',pt:'Ouvir os ímãs',fr:'Écouter les aimants',fi:'Kuuntele magneetteja'}
    /*STRINGS-END*/
  },
  defaults: { level: 'onset', pull: 'strong' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'onset', labelKey: 'lvOnset' }, { value: 'sounds', labelKey: 'lvSounds' }] },
    { key: 'pull', type: 'choice', labelKey: 'setPull', options: [{ value: 'strong', labelKey: 'optStrong' }, { value: 'gentle', labelKey: 'optGentle' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._lay = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._drag = null;
    this._fridge = []; this._fridgePass = -1; this._view = {};
    injectMagnetCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else { if (this.st) this.st.pull = this._set('pull') === 'gentle' ? 'gentle' : 'strong'; if (this._wrap) this._render2(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return BlendMagnetsCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _lv: function () { return BlendMagnetsCore.level(this._set('level')); },
  _key: function () { return this._loc() + '/' + this._lv(); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { if (this._poolKey && this._poolKey !== k) { this._fridge = []; this._fridgePass = -1; } this._pool = BlendMagnetsCore.rounds(this._loc(), this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = BlendMagnetsCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._lay = C.deal(n, Math.random); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._lay = C.deal(n, Math.random); }
    var r = pool[this._order[index % n]], lay = this._lay[index % n], pss = pass, loc = r.loc;
    var args = { word: C.display(loc, r.word), onset: r.parts[0], rime: r.parts.slice(1).join(''), dash: r.parts.join('-'), n: r.parts.length };
    return {
      id: 'blend-magnets.' + loc + '.' + r.id, promptKey: r.level === 'onset' ? 'pOnset' : 'pSounds', promptArgs: args, celebrateKey: r.level === 'onset' ? 'okOnset' : 'okSounds', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {};
        if (tool._fridgePass !== pss) { tool._fridge = []; tool._fridgePass = pss; }
        tool.st = C.newState(r, { layout: lay, pull: self._set('pull') }); tool._args = args;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = BlendMagnetsCore.rounds(this._loc(), 'onset')[0]; this.st = BlendMagnetsCore.newState(r0, {}); this._args = { word: r0.word, onset: r0.parts[0], rime: r0.parts[1], dash: r0.parts.join('-'), n: 2 }; }
    this._render2();
    this._watchWidth();
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st;
    api.stage.innerHTML = '';
    var L = this._L = BlendMagnetsCore.layout(this._width());
    var wrap = api.el('div', 'bmg-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['frame', L.frame], ['pic', L.pic], ['mh', L.mh]].forEach(function (p) { wrap.style.setProperty('--bmg-' + p[0], p[1] + 'px'); });
    var fridge = api.el('div', 'bmg-fridge'); this._fridgeEl = fridge; wrap.appendChild(fridge);
    var gallery = api.el('div', 'bmg-gallery'); this._galleryEl = gallery; wrap.appendChild(gallery);
    var railRow = api.el('div', 'bmg-railrow'); wrap.appendChild(railRow);
    var say = api.el('button', 'bmg-say'); say.type = 'button'; say.setAttribute('aria-label', this._t('ariaSay'));
    say.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    say.addEventListener('click', function () { self._sayGap(); }); railRow.appendChild(say);
    var rail = api.el('div', 'bmg-rail'); this._railEl = rail; railRow.appendChild(rail);
    var dots = api.el('div', 'bmg-dots'); dots.setAttribute('aria-live', 'polite'); this._dotsEl = dots; wrap.appendChild(dots);
    var ask = api.el('div', 'bmg-ask'); wrap.appendChild(ask);
    var note = api.el('div', 'bmg-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'bmg-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap) { var cls = (a.className || '').split(' ')[0]; sel = '.' + cls + (a.hasAttribute('data-i') ? '[data-i="' + a.getAttribute('data-i') + '"]' : ''); }
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._railEl) return;
    var st = this.st, C = BlendMagnetsCore;
    this._paintFridge(); this._paintGallery(); this._paintRail();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : (this._view.won ? this._t(st.r.level === 'onset' ? 'okOnset' : 'okSounds', this._args) : '');
    else if (h && !this._busy) msg = this._t(h, { onset: st.r.parts[0], n: st.last && st.last.stick, m: st.last && st.last.apart });
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && ['snap', 'choose'].indexOf(st.last.result) < 0));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  /* a word magnet: the first part red, the rest blue (Level 2: alternating) */
  _wordMag: function (parts) { return parts.map(function (p, i) { return '<span class="bmg-wm ' + (i % 2 ? 'is-b' : 'is-r') + '">' + p + '</span>'; }).join(''); },
  _paintFridge: function () {
    var self = this, el = this._fridgeEl, keep = this._L.mode === 'narrow' ? 4 : 8;
    el.innerHTML = '';
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._fridge.length === 1 ? this._t('ariaFridge1') : this._t('ariaFridge', { count: this._fridge.length }));
    this._fridge.slice(-keep).forEach(function (f, i, a) {
      var b = self.api.el('button', 'bmg-fw' + (i === a.length - 1 && self._view.newWord ? ' is-new' : '')); b.type = 'button';
      b.innerHTML = self._wordMag(f.parts); b.setAttribute('aria-label', f.parts.join(''));
      b.addEventListener('click', function () { b.classList.remove('is-pop'); void b.offsetWidth; b.classList.add('is-pop'); self._say(f.parts.join('')); });
      el.appendChild(b);
    });
  },
  _paintGallery: function () {
    var self = this, st = this.st, C = BlendMagnetsCore, el = this._galleryEl, v = this._view, help = C.helpOn(st) && !this._busy;
    el.innerHTML = '';
    for (var s = 0; s < 3; s++) (function (s) {
      var p = C.picAt(st, s), chosen = st.chosen === s, test = st.test && st.test.slot === s;
      var cell = self.api.el('div', 'bmg-cell');
      var b = self.api.el('button', 'bmg-frame' + (chosen ? ' is-chosen' : '') + (st.done && p.role === 'target' ? ' is-win' : '') + (st.done && p.role !== 'target' ? ' is-fade' : ''));
      b.type = 'button'; b.setAttribute('data-i', s); b.setAttribute('aria-pressed', chosen ? 'true' : 'false');
      b.setAttribute('aria-label', self._t('ariaPicture', { n: s + 1, word: C.display(st.r.loc, p.word) }));
      b.innerHTML = '<img alt="" draggable="false" src="' + self._pic(p.pic) + '">' + (help ? '<span class="bmg-tag">' + p.parts[0] + '</span>' : '');
      b.addEventListener('click', function () { self._choose(s); });
      cell.appendChild(b);
      /* the magnet test: the picture's own name as magnets, each part sticking or jumping away */
      if (test && (st.show || st.done)) {
        var row = self.api.el('div', 'bmg-test' + (v.testing ? ' is-anim' : ''));
        st.test.parts.forEach(function (t, i) { if (!t.part) return; var m = self.api.el('span', 'bmg-tm ' + (i % 2 ? 'is-b' : 'is-r') + (t.attract ? ' is-stick' : ' is-push')); m.textContent = t.part; m.style.animationDelay = (i * 0.15) + 's'; row.appendChild(m); });
        cell.appendChild(row);
      }
      el.appendChild(cell);
    })(s);
  },
  /* the rail: the right-most magnet sits at the right stop; each magnet to its left stands off by its gap */
  _geom: function () {
    var st = this.st, L = this._L, parts = st.r.parts, n = parts.length, rw = this._railEl.clientWidth || (L.W - 60);
    var fs = st.r.level === 'onset' ? L.fs : L.fs2;
    var ws = parts.map(function (p) { return Math.max(n > 2 ? 46 : 58, Math.ceil(p.length * fs * 0.62 + 26)); });
    var sum = ws.reduce(function (a, b) { return a + b; }, 0), pad = 8, free = Math.max(0, rw - 2 * pad - sum), share = n > 1 ? free / (n - 1) : 0;
    if (sum > rw - 2 * pad) { var k = (rw - 2 * pad) / sum; ws = ws.map(function (w) { return Math.floor(w * k); }); fs = Math.floor(fs * k); share = 0; }
    var xs = []; xs[n - 1] = rw - pad - ws[n - 1];
    for (var i = n - 2; i >= 0; i--) xs[i] = xs[i + 1] - ws[i] - st.gaps[i] * share;
    return { xs: xs, ws: ws, share: share, fs: Math.max(18, fs), rw: rw };
  },
  _paintRail: function () {
    var self = this, st = this.st, C = BlendMagnetsCore, el = this._railEl, parts = st.r.parts, n = parts.length;
    el.innerHTML = '';
    var G = this._G = this._geom();
    el.insertAdjacentHTML('beforeend', '<span class="bmg-stop is-l" aria-hidden="true"></span><span class="bmg-stop is-r" aria-hidden="true"></span>');
    /* the pull zone mark (gentle pull: a narrow one) and the stretch lines */
    for (var i = 0; i < n - 1; i++) {
      var g = st.gaps[i], x0 = G.xs[i] + G.ws[i], x1 = G.xs[i + 1];
      if (g > 0) el.insertAdjacentHTML('beforeend', '<span class="bmg-stretch" aria-hidden="true" style="left:' + x0 + 'px;width:' + Math.max(0, x1 - x0) + 'px;background-size:' + Math.max(6, 6 + g * 14) + 'px 4px"></span>');
      if (g > 0) el.insertAdjacentHTML('beforeend', '<span class="bmg-zone" aria-hidden="true" style="left:' + (x1 - C.PULL[st.pull] * G.share) + 'px;width:' + (C.PULL[st.pull] * G.share) + 'px"></span>');
    }
    parts.forEach(function (p, i) {
      var joinedL = i > 0 && st.gaps[i - 1] === 0, joinedR = i < n - 1 && st.gaps[i] === 0, fixed = i === n - 1;
      var m = self.api.el(fixed ? 'span' : 'button', 'bmg-mag ' + (i % 2 ? 'is-b' : 'is-r') + (joinedL ? ' is-jl' : '') + (joinedR ? ' is-jr' : '') + (fixed ? ' is-fixed' : '') + (st.done && self._view.won ? ' is-glow' : ''));
      if (!fixed) { m.type = 'button'; m.setAttribute('data-i', i); }
      m.style.left = G.xs[i] + 'px'; m.style.width = G.ws[i] + 'px'; m.style.fontSize = G.fs + 'px';
      m.innerHTML = '<span>' + p + '</span>';
      m.setAttribute('aria-label', self._t('ariaMagnet', { s: p }) + (i < n - 1 ? '. ' + self._t('ariaGap', { k: C.dots(st.gaps[i]) }) : ''));
      if (!fixed) self._bindMagnet(m, i);
      el.appendChild(m);
    });
    /* the pause dots under the rail: the same pause, readable with the sound off */
    var total = 0; st.gaps.forEach(function (g) { total += C.dots(g); });
    var d = this._dotsEl; d.innerHTML = '';
    for (var k = 0; k < total; k++) d.insertAdjacentHTML('beforeend', '<i></i>');
    d.setAttribute('aria-label', C.whole(st) ? this._t('ariaSnapped', { word: st.r.word }) : this._t('ariaGap', { k: total }));
  },

  /* while a magnet is dragged the rail is NOT rebuilt (that would replace the magnet under the finger): the magnets slide, the stretch lines hide, the dots follow */
  _dragUpdate: function () {
    var st = this.st, C = BlendMagnetsCore, G = this._G = this._geom(), el = this._railEl;
    [].forEach.call(el.querySelectorAll('.bmg-mag'), function (m, i) { m.style.transition = 'none'; m.style.left = G.xs[i] + 'px'; });
    [].forEach.call(el.querySelectorAll('.bmg-stretch,.bmg-zone'), function (x) { x.style.display = 'none'; });
    var total = 0; st.gaps.forEach(function (g) { total += C.dots(g); });
    var d = this._dotsEl; d.innerHTML = ''; for (var k = 0; k < total; k++) d.insertAdjacentHTML('beforeend', '<i></i>');
  },
  /* ---- the hand ---- */
  _sayGap: function () {
    var st = this.st, C = BlendMagnetsCore;
    if (C.whole(st)) { this._say(st.r.word); return; }
    var self = this, parts = st.r.parts, t = 0;
    parts.forEach(function (p, i) { self._later(function () { self._say(p, 0.8); }, t); t += 450 + (i < st.gaps.length ? Math.min(1200, st.gaps[i] * 1200) : 0); });
  },
  _moveTo: function (i, g, quiet) {
    var C = BlendMagnetsCore, st = this.st, was = C.whole(st), before = st.gaps[i];
    if (!C.move(st, i, g)) return false;
    if (st.gaps[i] === 0 && before !== 0) { this.api.sound(780); if (C.whole(st) && !was && !quiet) this._say(st.r.word); }
    this._view = {}; this._paint(); return true;
  },
  _bindMagnet: function (m, i) {
    var self = this;
    m.addEventListener('pointerdown', function (ev) {
      if (self._busy || ev.button > 0) return;
      var st = self.st, x0 = ev.clientX, g0 = st.gaps[i], share = self._G.share || 1, moved = false;
      try { m.setPointerCapture(ev.pointerId); } catch (e) {}
      var move = function (e) {
        var dx = e.clientX - x0;
        if (!moved && Math.abs(dx) < 4) return;
        moved = true;
        var g = g0 === 0 ? (dx < -30 ? Math.min(1, -dx / share) : 0) : g0 - dx / share;
        /* follow the finger without snapping while dragging; the pull acts on release */
        st.gaps[i] = Math.max(0, Math.min(1, g)); self._dragUpdate(); e.preventDefault();
      };
      var up = function () {
        m.removeEventListener('pointermove', move); m.removeEventListener('pointerup', up); m.removeEventListener('pointercancel', up);
        if (!moved) { self._paint(); return; }
        var g = st.gaps[i]; st.gaps[i] = g0;
        if (!self._moveTo(i, g)) self._paint();
        if (st.gaps[i] > 0) self._sayGap();
      };
      m.addEventListener('pointermove', move, { passive: false }); m.addEventListener('pointerup', up); m.addEventListener('pointercancel', up);
    });
  },
  _choose: function (s) { if (this._busy || this.st.done) return; if (BlendMagnetsCore.choose(this.st, s)) { this.api.sound(620); this._say(BlendMagnetsCore.picAt(this.st, s).word); this._view = {}; this._paint(); } },
  _onKey: function (ev) {
    if (this._busy || ev.defaultPrevented) return;
    var t = ev.target, st = this.st;
    if (t && t.classList && t.classList.contains('bmg-mag') && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
      ev.preventDefault(); var i = +t.getAttribute('data-i');
      if (st.gaps[i] === 0 && ev.key === 'ArrowLeft') { BlendMagnetsCore.separate(st, i); this._view = {}; this._paint(); return; }
      this._moveTo(i, st.gaps[i] + (ev.key === 'ArrowLeft' ? 0.1 : -0.1));
    }
  },

  /* ---- Check ---- */
  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = BlendMagnetsCore;
    var res = C.check(st);
    if (res.kase === 'snap' || res.kase === 'choose') { this.api.sound(460); this._view = {}; this._paint(); return; }
    this._busy = true; this._view = { testing: true }; this._paint();
    res.test.forEach(function (x, i) { self._later(function () { self.api.sound(x.attract ? 880 : 220); }, self._ms(150 + i * 150)); });
    if (res.ok) return this._win(res.test.length);
    this._later(function () {
      self._busy = false; self._view = {}; self.api.sound(196);
      if (st.help >= 2) self._say(st.r.parts.join(' … '), 0.6);
      self._paint();
    }, this._ms(150 + res.test.length * 150 + 500));
  },
  _win: function (k) {
    var self = this, st = this.st, r = st.r;
    this._later(function () {
      self._view = { won: true, newWord: true }; self._fridge.push({ parts: r.parts }); if (self._fridge.length > 12) self._fridge.shift();
      self.api.sound(659); self._later(function () { self.api.sound(784); }, 110); self._later(function () { self.api.sound(1046); }, 220);
      self._say(r.parts.length > 2 ? r.word : r.parts.join(' … ') + ' … ' + r.word, 0.85);
      self.api.announce(self._t('ariaSnapped', { word: r.word }));
      self._busy = false; self._paint();
    }, this._ms(150 + k * 150 + 300));
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(150 + k * 150 + 300 + this.OK_MS));
  }
};

var bmgCssDone = false;
function injectMagnetCSS() {
  if (bmgCssDone || typeof document === 'undefined') return;
  bmgCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.bmg-wrap{position:relative;width:100%;display:flex;flex-direction:column;gap:10px;--bmg-ink:#2A2A35;--bmg-teal:#146B5E;--bmg-red:#D94B3A;--bmg-blue:#2F6FB0;user-select:none;-webkit-user-select:none;} .bmg-wrap:focus{outline:none;}'
  /* the fridge */
  + '.bmg-fridge{display:flex;flex-wrap:nowrap;gap:6px;min-height:52px;padding:4px 8px;border-radius:10px;background:linear-gradient(#FDFDFB,#ECEEEC);box-shadow:inset 0 0 0 2px #B9C2C1;align-items:center;overflow:hidden;}'
  + '.bmg-fw{flex:none;display:inline-flex;height:44px;padding:0 4px;border:0;background:transparent;cursor:pointer;align-items:center;} .bmg-fw.is-new{animation:bmg-stick .6s cubic-bezier(.3,1.4,.6,1);} @keyframes bmg-stick{0%{transform:translateY(40px) scale(.6);opacity:0;}} .bmg-fw.is-pop{animation:bmg-pop .7s ease-in-out;} @keyframes bmg-pop{30%{letter-spacing:6px;}}'
  + '.bmg-wm{display:inline-block;padding:3px 5px;font:800 16px/1 ' + D + ';color:#fff;} .bmg-wm.is-r{background:var(--bmg-red);border-radius:5px 0 0 5px;} .bmg-wm.is-b{background:var(--bmg-blue);} .bmg-wm:last-child{border-radius:0 5px 5px 0;} .bmg-wm:only-child{border-radius:5px;}'
  /* the gallery */
  + '.bmg-gallery{display:flex;justify-content:center;gap:clamp(10px,4vw,40px);}'
  + '.bmg-cell{display:flex;flex-direction:column;align-items:center;gap:6px;width:var(--bmg-frame);flex:0 0 auto;min-height:calc(var(--bmg-frame) + 40px);}'
  + '.bmg-frame{position:relative;width:var(--bmg-frame);height:var(--bmg-frame);padding:0;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 2px var(--bmg-ink),0 3px 0 rgba(42,42,53,.15);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s;} .bmg-frame img{width:var(--bmg-pic);height:var(--bmg-pic);object-fit:contain;}'
  + '.bmg-frame.is-chosen{transform:translateY(-6px);box-shadow:inset 0 0 0 3px #F2784B,0 0 0 4px rgba(242,120,75,.3),0 6px 0 rgba(42,42,53,.15);} .bmg-frame.is-win{box-shadow:inset 0 0 0 3px var(--bmg-teal),0 0 0 6px rgba(20,107,94,.25);animation:bmg-flash .5s ease-out;} @keyframes bmg-flash{0%{background:#F4FFFB;}} .bmg-frame.is-fade{opacity:.4;}'
  + '.bmg-tag{position:absolute;right:-6px;top:-8px;padding:3px 7px;border-radius:6px;background:var(--bmg-red);color:#fff;font:800 16px/1 ' + D + ';box-shadow:0 2px 0 rgba(0,0,0,.2);}'
  + '.bmg-test{display:flex;gap:2px;height:32px;align-items:center;} .bmg-tm{display:inline-block;padding:4px clamp(3px,1.2vw,7px);border-radius:5px;font-weight:800;font-size:clamp(16px,4.6vw,18px);line-height:1;font-family:' + D + ';color:#fff;} .bmg-tm.is-r{background:var(--bmg-red);} .bmg-tm.is-b{background:var(--bmg-blue);}'
  + '.bmg-tm.is-stick{box-shadow:0 0 0 3px rgba(20,107,94,.55);} .bmg-tm.is-push{opacity:.55;transform:translateY(6px) rotate(8deg);} .bmg-test.is-anim .bmg-tm.is-push{animation:bmg-push .45s ease-out both;} .bmg-test.is-anim .bmg-tm.is-stick{animation:bmg-clink .35s ease-out both;}'
  + '@keyframes bmg-push{0%{transform:none;opacity:1;}50%{transform:translateY(-18px) rotate(-180deg);}100%{transform:translateY(6px) rotate(8deg);opacity:.55;}} @keyframes bmg-clink{0%{transform:translateY(-14px);}70%{transform:translateY(2px);}100%{transform:none;}}'
  /* the rail and the magnets */
  + '.bmg-railrow{display:flex;align-items:center;gap:8px;}'
  + '.bmg-say{flex:none;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:#E3E8E7;box-shadow:inset 0 0 0 2px #5E7C78;color:#2B3F3D;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.bmg-rail{position:relative;flex:1;min-width:0;height:calc(var(--bmg-mh) + 24px);border-radius:12px;background:#5E7C78;box-shadow:inset 0 0 0 2px #2B3F3D;}'
  + '.bmg-rail::before{content:"";position:absolute;left:8px;right:8px;top:50%;height:10px;margin-top:-5px;border-radius:5px;background:linear-gradient(#E6EAEA,#9AA6A5);box-shadow:inset 0 0 0 1.5px #2B3F3D;}'
  + '.bmg-stop{position:absolute;top:8px;bottom:8px;width:6px;border-radius:3px;background:#2B3F3D;} .bmg-stop.is-l{left:2px;} .bmg-stop.is-r{right:2px;}'
  + '.bmg-stretch{position:absolute;top:50%;height:4px;margin-top:-2px;background-image:radial-gradient(circle,#FFF 1.6px,transparent 2px);background-repeat:repeat-x;background-position:0 50%;}'
  + '.bmg-zone{position:absolute;top:10px;bottom:10px;border-radius:4px;background:rgba(242,193,78,.35);}'
  + '.bmg-mag{position:absolute;top:12px;height:var(--bmg-mh);padding:0;border:0;border-radius:10px;color:#fff;font-family:' + D + ';font-weight:800;line-height:1;cursor:grab;touch-action:none;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 -6px 0 rgba(0,0,0,.18),0 3px 0 rgba(0,0,0,.25);transition:left .09s ease-in;}'
  + '.bmg-mag.is-r{background:linear-gradient(90deg,#C9D1D1 0 8px,var(--bmg-red) 8px);} .bmg-mag.is-b{background:linear-gradient(90deg,var(--bmg-blue) calc(100% - 8px),#C9D1D1 calc(100% - 8px));} .bmg-mag.is-fixed{cursor:default;}'
  + '.bmg-mag.is-jr{border-top-right-radius:0;border-bottom-right-radius:0;} .bmg-mag.is-jl{border-top-left-radius:0;border-bottom-left-radius:0;} .bmg-mag.is-glow{box-shadow:0 0 0 4px rgba(242,193,78,.7),inset 0 -6px 0 rgba(0,0,0,.18);}'
  + '.bmg-mag span{pointer-events:none;}'
  + '.bmg-dots{display:flex;justify-content:center;gap:10px;min-height:14px;font-size:clamp(14px,2.2vw,22px);} .bmg-dots i{width:10px;height:10px;border-radius:50%;background:#9AA6A5;}'
  + '.bmg-ask{display:flex;align-items:center;justify-content:center;gap:12px;}'
  + '.bmg-note{flex:1;min-height:28px;font:700 17px/1.3 ' + B + ';color:var(--bmg-teal);text-align:center;} .bmg-note:empty{display:none;} .bmg-note.is-ok{font-weight:800;} .bmg-note.is-wrong{color:#A6461F;} .is-narrow .bmg-note{font-size:15px;text-align:left;}'
  + '.bmg-check{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .bmg-check[hidden]{display:none;} .bmg-check:disabled{opacity:.5;}'
  + '.bmg-mag:focus-visible,.bmg-frame:focus-visible,.bmg-check:focus-visible,.bmg-say:focus-visible,.bmg-fw:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.bmg-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'bmg-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.BlendMagnetsActivity = BlendMagnetsActivity;
