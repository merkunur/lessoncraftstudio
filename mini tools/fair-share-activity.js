/* =====================================================================
   fair-share-activity.js — ACTIVITY #18 of the one-by-one rebuild:
   "The Friendship Bridge — compare groups: more, fewer, same" (K.CC.C.6).
   Design sheet: docs/activities-rebuild/018-friendship-bridge.md
   ---------------------------------------------------------------------
   Two plates of library toys, one above the other, a plank bridge between
   them. Step 1: the child taps the plate with more, or "The same". Step 2,
   THE INVENTION — THE BRIDGE: a tap on a toy sends it walking across the
   bridge to the other plate, one at a time, until both plates hold the
   same; then Check. Making "the same" by hand needs counting both plates
   again and again (#17 owns matching). A wrong judgment shakes the plate
   (no miss); a wrong Check names the plate with more and numbers both
   plates; the second also lights one toy to send. No mascot is drawn.

   ACTIVITY LAYER ONLY: the model is fair-share-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.FairShareActivity.st / ._order / ._pool / .WALK_MS.
   ===================================================================== */
'use strict';

var FairShareActivity = {
  id: 'fair-share',
  apparatusClasses: ['fs-'],

  strings: {
    title:        {en:'The Friendship Bridge',de:'Die Freundschaftsbrücke',fr:'Le pont de l’amitié',es:'El puente de la amistad',pt:'A ponte da amizade',it:'Il ponte dell’amicizia',nl:'De vriendschapsbrug',sv:'Vänskapsbron',da:'Venskabsbroen',no:'Vennskapsbrua',fi:'Ystävyyden silta'},
    instruction:  {en:'Which plate has more toys, or do they have the same? Tap that plate, or “The same”. Then make it fair: tap a toy to send it across the bridge, until both plates have the same.',de:'Auf welchem Teller sind mehr Spielsachen, oder sind es gleich viele? Tippe auf diesen Teller oder auf „Gleich viele“. Dann mach es gerecht: Tippe auf ein Spielzeug, um es über die Brücke zu schicken, bis auf beiden Tellern gleich viele sind.',fr:'Sur quelle assiette y a-t-il le plus de jouets, ou y en a-t-il autant ? Touche cette assiette, ou « Autant ». Puis partage équitablement : touche un jouet pour l’envoyer de l’autre côté du pont, jusqu’à ce qu’il y en ait autant sur les deux assiettes.',es:'¿En qué plato hay más juguetes, o hay la misma cantidad? Toca ese plato, o «La misma cantidad». Luego reparte parejo: toca un juguete para mandarlo por el puente, hasta que los dos platos tengan la misma cantidad.',pt:'Em qual prato há mais brinquedos, ou há a mesma quantidade? Toque nesse prato, ou em “A mesma quantidade”. Depois deixe justo: toque em um brinquedo para mandá-lo pela ponte, até os dois pratos terem a mesma quantidade.',it:'In quale piatto ci sono più giocattoli, o ce ne sono tanti quanti? Tocca quel piatto, oppure «Tanti quanti». Poi fai le parti giuste: tocca un giocattolo per mandarlo sull’altro piatto attraverso il ponte, finché nei due piatti ce ne sono tanti quanti.',nl:'Op welk bord liggen meer speeltjes, of zijn het er evenveel? Tik op dat bord, of op ‘Evenveel’. Maak het daarna eerlijk: tik op een speeltje om het over de brug te sturen, tot er op allebei de borden evenveel liggen.',sv:'Vilken tallrik har fler leksaker, eller har de lika många? Tryck på den tallriken, eller på ”Lika många”. Gör det sedan rättvist: tryck på en leksak för att skicka den över bron, tills båda tallrikarna har lika många.',da:'Hvilken tallerken har flere stykker legetøj, eller har de lige mange? Tryk på den tallerken, eller på ”Lige mange”. Gør det så retfærdigt: tryk på et stykke legetøj for at sende det over broen, indtil begge tallerkener har lige mange.',no:'Hvilken tallerken har flere leker, eller har de like mange? Trykk på den tallerkenen, eller på «Like mange». Gjør det så rettferdig: trykk på en leke for å sende den over brua, til begge tallerkenene har like mange.',fi:'Kummalla lautasella on enemmän leluja, vai onko niitä yhtä monta? Napauta sitä lautasta tai ”Yhtä monta”. Tee sitten jaosta reilu: napauta lelua lähettääksesi sen sillan yli, kunnes molemmilla lautasilla on yhtä monta.'},
    prompt:       {en:'Who has more? Tap that plate, or “The same”. Then make it fair and press Check.',de:'Wer hat mehr? Tippe auf diesen Teller oder auf „Gleich viele“. Dann mach es gerecht und drücke auf Prüfen.',fr:'Qui en a le plus\u202f? Touche cette assiette, ou «\u00a0Autant\u00a0». Puis partage équitablement et appuie sur Vérifier.',es:'¿Quién tiene más? Toca ese plato, o «La misma cantidad». Luego reparte parejo y oprime Comprobar.',pt:'Quem tem mais? Toque nesse prato, ou em “A mesma quantidade”. Depois deixe justo e aperte Verificar.',it:'Chi ne ha di più? Tocca quel piatto, oppure «Tanti quanti». Poi fai le parti giuste e premi Verifica.',nl:'Wie heeft er meer? Tik op dat bord, of op ‘Evenveel’. Maak het daarna eerlijk en druk op Controleer.',sv:'Vem har fler? Tryck på den tallriken, eller på ”Lika många”. Gör det sedan rättvist och tryck på Kontrollera.',da:'Hvem har flere? Tryk på den tallerken, eller på ”Lige mange”. Gør det så retfærdigt, og tryk på Tjek.',no:'Hvem har flere? Trykk på den tallerkenen, eller på «Like mange». Gjør det så rettferdig, og trykk på Sjekk.',fi:'Kummalla on enemmän? Napauta sitä lautasta tai ”Yhtä monta”. Tee sitten jaosta reilu ja paina Tarkista.'},
    sameBtn:      {en:'The same',de:'Gleich viele',fr:'Autant',es:'La misma cantidad',pt:'A mesma quantidade',it:'Tanti quanti',nl:'Evenveel',sv:'Lika många',da:'Lige mange',no:'Like mange',fi:'Yhtä monta'},
    moreTag:      {en:'More',de:'Mehr',fr:'Plus',es:'Más',pt:'Mais',it:'Di più',nl:'Meer',sv:'Fler',da:'Flere',no:'Flere',fi:'Enemmän'},
    topPick:      {en:'The top plate has more',de:'Auf dem oberen Teller sind mehr',fr:'L’assiette du haut en a plus',es:'El plato de arriba tiene más',pt:'O prato de cima tem mais',it:'Il piatto in alto ne ha di più',nl:'Het bovenste bord heeft er meer',sv:'Den övre tallriken har fler',da:'Den øverste tallerken har flere',no:'Den øverste tallerkenen har flere',fi:'Ylemmällä lautasella on enemmän'},
    bottomPick:   {en:'The bottom plate has more',de:'Auf dem unteren Teller sind mehr',fr:'L’assiette du bas en a plus',es:'El plato de abajo tiene más',pt:'O prato de baixo tem mais',it:'Il piatto in basso ne ha di più',nl:'Het onderste bord heeft er meer',sv:'Den nedre tallriken har fler',da:'Den nederste tallerken har flere',no:'Den nederste tallerkenen har flere',fi:'Alemmalla lautasella on enemmän'},
    topLabel:     {en:'The top plate',de:'Der obere Teller',fr:'L’assiette du haut',es:'El plato de arriba',pt:'O prato de cima',it:'Il piatto in alto',nl:'Het bovenste bord',sv:'Den övre tallriken',da:'Den øverste tallerken',no:'Den øverste tallerkenen',fi:'Ylempi lautanen'},
    bottomLabel:  {en:'The bottom plate',de:'Der untere Teller',fr:'L’assiette du bas',es:'El plato de abajo',pt:'O prato de baixo',it:'Il piatto in basso',nl:'Het onderste bord',sv:'Den nedre tallriken',da:'Den nederste tallerken',no:'Den nederste tallerkenen',fi:'Alempi lautanen'},
    toyAria:      {en:'Send this toy across the bridge',de:'Dieses Spielzeug über die Brücke schicken',fr:'Envoyer ce jouet de l’autre côté du pont',es:'Mandar este juguete por el puente',pt:'Mandar este brinquedo pela ponte',it:'Manda questo giocattolo oltre il ponte',nl:'Dit speeltje over de brug sturen',sv:'Skicka leksaken över bron',da:'Send det her stykke legetøj over broen',no:'Send leken over brua',fi:'Lähetä tämä lelu sillan yli'},
    bridgeLabel:  {en:'The bridge',de:'Die Brücke',fr:'Le pont',es:'El puente',pt:'A ponte',it:'Il ponte',nl:'De brug',sv:'Bron',da:'Broen',no:'Brua',fi:'Silta'},
    hintJudge:    {en:'First: which plate has more? Tap it, or tap “The same”.',de:'Zuerst: Auf welchem Teller sind mehr? Tippe darauf oder auf „Gleich viele“.',fr:'D’abord : quelle assiette en a le plus ? Touche-la, ou touche « Autant ».',es:'Primero: ¿qué plato tiene más? Tócalo, o toca «La misma cantidad».',pt:'Primeiro: qual prato tem mais? Toque nele, ou em “A mesma quantidade”.',it:'Prima: quale piatto ne ha di più? Toccalo, oppure tocca «Tanti quanti».',nl:'Eerst: welk bord heeft er meer? Tik erop, of tik op ‘Evenveel’.',sv:'Först: vilken tallrik har fler? Tryck på den, eller på ”Lika många”.',da:'Først: hvilken tallerken har flere? Tryk på den, eller på ”Lige mange”.',no:'Først: hvilken tallerken har flere? Trykk på den, eller på «Like mange».',fi:'Ensin: kummalla lautasella on enemmän? Napauta sitä tai ”Yhtä monta”.'},
    hintShare:    {en:'Send toys across the bridge until both plates have the same.',de:'Schicke Spielsachen über die Brücke, bis auf beiden Tellern gleich viele sind.',fr:'Envoie des jouets de l’autre côté du pont jusqu’à ce qu’il y en ait autant sur les deux assiettes.',es:'Manda juguetes por el puente hasta que los dos platos tengan la misma cantidad.',pt:'Mande brinquedos pela ponte até os dois pratos terem a mesma quantidade.',it:'Manda giocattoli oltre il ponte finché nei due piatti ce ne sono tanti quanti.',nl:'Stuur speeltjes over de brug tot er op allebei de borden evenveel liggen.',sv:'Skicka leksaker över bron tills båda tallrikarna har lika många.',da:'Send legetøj over broen, indtil begge tallerkener har lige mange.',no:'Send leker over brua til begge tallerkenene har like mange.',fi:'Lähetä leluja sillan yli, kunnes molemmilla lautasilla on yhtä monta.'},
    hintMoreTop:  {en:'Not the same yet: the top plate has more. Send a toy down.',de:'Noch nicht gleich viele: Auf dem oberen Teller sind mehr. Schicke ein Spielzeug nach unten.',fr:'Pas encore autant : l’assiette du haut en a plus. Envoie un jouet en bas.',es:'Todavía no es la misma cantidad: el plato de arriba tiene más. Manda un juguete hacia abajo.',pt:'Ainda não é a mesma quantidade: o prato de cima tem mais. Mande um brinquedo para baixo.',it:'Non ancora tanti quanti: il piatto in alto ne ha di più. Manda un giocattolo giù.',nl:'Nog niet evenveel: het bovenste bord heeft er meer. Stuur een speeltje naar beneden.',sv:'Inte lika många än: den övre tallriken har fler. Skicka ner en leksak.',da:'Ikke lige mange endnu: den øverste tallerken har flere. Send et stykke legetøj ned.',no:'Ikke like mange ennå: den øverste tallerkenen har flere. Send en leke ned.',fi:'Ei vielä yhtä monta: ylemmällä lautasella on enemmän. Lähetä yksi lelu alas.'},
    hintMoreBottom:{en:'Not the same yet: the bottom plate has more. Send a toy up.',de:'Noch nicht gleich viele: Auf dem unteren Teller sind mehr. Schicke ein Spielzeug nach oben.',fr:'Pas encore autant : l’assiette du bas en a plus. Envoie un jouet en haut.',es:'Todavía no es la misma cantidad: el plato de abajo tiene más. Manda un juguete hacia arriba.',pt:'Ainda não é a mesma quantidade: o prato de baixo tem mais. Mande um brinquedo para cima.',it:'Non ancora tanti quanti: il piatto in basso ne ha di più. Manda un giocattolo su.',nl:'Nog niet evenveel: het onderste bord heeft er meer. Stuur een speeltje naar boven.',sv:'Inte lika många än: den nedre tallriken har fler. Skicka upp en leksak.',da:'Ikke lige mange endnu: den nederste tallerken har flere. Send et stykke legetøj op.',no:'Ikke like mange ennå: den nederste tallerkenen har flere. Send en leke opp.',fi:'Ei vielä yhtä monta: alemmalla lautasella on enemmän. Lähetä yksi lelu ylös.'},
    hintOneTop:   {en:'The top plate still has more. Send the glowing toy down, then count both plates again.',de:'Auf dem oberen Teller sind immer noch mehr. Schicke das leuchtende Spielzeug nach unten und zähle dann beide Teller noch einmal.',fr:'L’assiette du haut en a encore plus. Envoie le jouet qui brille en bas, puis recompte les deux assiettes.',es:'El plato de arriba todavía tiene más. Manda hacia abajo el juguete que brilla y luego vuelve a contar los dos platos.',pt:'O prato de cima ainda tem mais. Mande para baixo o brinquedo que brilha e depois conte os dois pratos de novo.',it:'Il piatto in alto ne ha ancora di più. Manda giù il giocattolo che brilla, poi conta di nuovo i due piatti.',nl:'Het bovenste bord heeft er nog steeds meer. Stuur het speeltje dat oplicht naar beneden en tel dan allebei de borden opnieuw.',sv:'Den övre tallriken har fortfarande fler. Skicka ner leksaken som lyser och räkna sedan båda tallrikarna igen.',da:'Den øverste tallerken har stadig flere. Send det stykke legetøj, der lyser, ned, og tæl så begge tallerkener igen.',no:'Den øverste tallerkenen har fortsatt flere. Send ned leken som lyser, og tell så begge tallerkenene igjen.',fi:'Ylemmällä lautasella on yhä enemmän. Lähetä hohtava lelu alas ja laske sitten molemmat lautaset uudelleen.'},
    hintOneBottom:{en:'The bottom plate still has more. Send the glowing toy up, then count both plates again.',de:'Auf dem unteren Teller sind immer noch mehr. Schicke das leuchtende Spielzeug nach oben und zähle dann beide Teller noch einmal.',fr:'L’assiette du bas en a encore plus. Envoie le jouet qui brille en haut, puis recompte les deux assiettes.',es:'El plato de abajo todavía tiene más. Manda hacia arriba el juguete que brilla y luego vuelve a contar los dos platos.',pt:'O prato de baixo ainda tem mais. Mande para cima o brinquedo que brilha e depois conte os dois pratos de novo.',it:'Il piatto in basso ne ha ancora di più. Manda su il giocattolo che brilla, poi conta di nuovo i due piatti.',nl:'Het onderste bord heeft er nog steeds meer. Stuur het speeltje dat oplicht naar boven en tel dan allebei de borden opnieuw.',sv:'Den nedre tallriken har fortfarande fler. Skicka upp leksaken som lyser och räkna sedan båda tallrikarna igen.',da:'Den nederste tallerken har stadig flere. Send det stykke legetøj, der lyser, op, og tæl så begge tallerkener igen.',no:'Den nederste tallerkenen har fortsatt flere. Send opp leken som lyser, og tell så begge tallerkenene igjen.',fi:'Alemmalla lautasella on yhä enemmän. Lähetä hohtava lelu ylös ja laske sitten molemmat lautaset uudelleen.'},
    celebrate:    {en:'Fair! {n} and {n}.',de:'Gerecht! {n} und {n}.',fr:'C’est juste ! {n} et {n}.',es:'¡Justo! {n} y {n}.',pt:'Justo! {n} e {n}.',it:'Giusto! {n} e {n}.',nl:'Eerlijk! {n} en {n}.',sv:'Rättvist! {n} och {n}.',da:'Retfærdigt! {n} og {n}.',no:'Rettferdig! {n} og {n}.',fi:'Reilua! {n} ja {n}.'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:     {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',es:'Hasta 5',pt:'Até 5',it:'Fino a 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:    {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',es:'Hasta 10',pt:'Até 10',it:'Fino a 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setLayout:    {en:'The toys',de:'Die Spielsachen',fr:'Les jouets',es:'Los juguetes',pt:'Os brinquedos',it:'I giocattoli',nl:'De speeltjes',sv:'Leksakerna',da:'Legetøjet',no:'Lekene',fi:'Lelut'},
    layoutScatter:{en:'Scattered',de:'Durcheinander',fr:'En vrac',es:'Revueltos',pt:'Espalhados',it:'Sparsi',nl:'Door elkaar',sv:'Huller om buller',da:'Hulter til bulter',no:'Hulter til bulter',fi:'Sikin sokin'},
    layoutRows:   {en:'In rows',de:'In Reihen',fr:'En rangées',es:'En hileras',pt:'Em fileiras',it:'In file',nl:'In rijen',sv:'I rader',da:'I rækker',no:'I rader',fi:'Riveissä'}
  },

  defaults: { range: 'to10', layout: 'scatter' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'layout', type: 'choice', labelKey: 'setLayout', options: [{ value: 'scatter', labelKey: 'layoutScatter' }, { value: 'rows', labelKey: 'layoutRows' }] }
  ],

  WALK_MS: 520,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null;
    injectFairShareCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(FairShareCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the plates stay bare */ });
    }
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 640;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return FairShareCore.POOLS[r] ? r : 'to10'; },
  _arr: function () { var a = this.api && this.api.settings && this.api.settings.layout; return a === 'rows' ? 'rows' : 'scatter'; },
  _ensurePool: function () { var key = this._range() + ':' + this._arr(); if (!this._pool || this._poolKey !== key) { this._pool = FairShareCore.rounds(this._range(), 'fs', this._arr()); this._poolKey = key; this._order = null; } return this._pool; },
  _shuffled: function (n, prev) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (var g = 0; g < 10; g++) {
      for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!prev || n < 2 || a.join(',') !== prev.join(',')) break;
    }
    return a;
  },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = this._shuffled(n, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = this._shuffled(n, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    return {
      id: 'fair-share.' + r.id,
      promptKey: 'prompt',
      promptArgs: { n: r.fair },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = FairShareCore.newState(r); },
      check: function (tool) { var res = FairShareCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return FairShareCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = FairShareCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'fs')[0]);
    var wrap = api.el('div', 'fs-wrap'); this._wrap = wrap;
    this._plates = {}; this._toys = { a: [], b: [] }; this._picks = {}; this._tags = {};
    var mkPlate = function (side) {
      var plate = api.el('div', 'fs-plate fs-plate-' + side); plate.setAttribute('role', 'group'); plate.setAttribute('aria-label', t(side === 'a' ? 'topLabel' : 'bottomLabel'));
      for (var p = 0; p < C.PLACES; p++) {
        (function (place) {
          var b = api.el('button', 'fs-toy'); b.type = 'button'; b.hidden = true; b.setAttribute('aria-label', t('toyAria'));
          b.addEventListener('click', function () { self._move(side, place); });
          var nb = api.el('span', 'fs-num'); nb.setAttribute('aria-hidden', 'true'); b.appendChild(nb);
          plate.appendChild(b); self._toys[side].push(b);
        }(p));
      }
      /* step 1: the whole plate is the answer */
      var pick = api.el('button', 'fs-pick'); pick.type = 'button'; pick.setAttribute('aria-label', t(side === 'a' ? 'topPick' : 'bottomPick'));
      pick.addEventListener('click', function () { self._judge(side); });
      plate.appendChild(pick); self._picks[side] = pick;
      var tag = api.el('span', 'fs-tag'); tag.setAttribute('aria-hidden', 'true'); tag.textContent = t('moreTag');
      plate.appendChild(tag); self._tags[side] = tag;
      self._plates[side] = plate;
      return plate;
    };
    wrap.appendChild(mkPlate('a'));
    var bridge = api.el('div', 'fs-bridge'); bridge.setAttribute('role', 'group'); bridge.setAttribute('aria-label', t('bridgeLabel'));
    bridge.innerHTML = '<span class="fs-plank" aria-hidden="true"></span>';
    var same = api.el('button', 'fs-same'); same.type = 'button'; same.textContent = t('sameBtn');
    same.addEventListener('click', function () { self._judge('same'); });
    bridge.appendChild(same); this._same = same; this._bridge = bridge;
    wrap.appendChild(bridge);
    wrap.appendChild(mkPlate('b'));
    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var L = this._L = FairShareCore.layout(this._width()), w = this._wrap;
    ['wide', 'stack', 'narrow'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.setProperty('--fs-cell', L.cell + 'px');
    w.style.setProperty('--fs-pic', L.pic + 'px');
    w.style.setProperty('--fs-pw', L.plateW + 'px');
    w.style.setProperty('--fs-ph', L.plateH + 'px');
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

  _paint: function () {
    var st = this.st, C = FairShareCore, L = this._L, self = this;
    var w = this._wrap, judging = st.phase === 'judge';
    w.classList.toggle('is-judge', judging);
    w.classList.toggle('is-share', !judging);
    w.classList.toggle('is-done', st.done);
    w.classList.toggle('judged-same', st.judged === 'same');
    var nums = C.showNums(st), sug = C.suggest(st);
    ['a', 'b'].forEach(function (side) {
      var plate = st.plates[side], order = nums ? C.readOrder(st, side, L) : [];
      for (var p = 0; p < C.PLACES; p++) {
        var b = self._toys[side][p], on = plate.indexOf(p) >= 0;
        b.hidden = !on;
        if (!on) continue;
        var s = C.placeSpot(st, side, p, L);
        b.style.left = s.x + 'px'; b.style.top = s.y + 'px'; b.style.setProperty('--fs-tilt', s.tilt + 'deg');
        var img = b.querySelector('img');
        if (img && img.getAttribute('data-noun') !== st.noun) { img.remove(); img = null; }
        if (!img && self._theme && self._theme.nouns[st.noun]) { img = LCSPictures.img(self._theme, st.noun, self.api.lang, { plural: false }); img.className = 'fs-pic'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.setAttribute('data-noun', st.noun); b.insertBefore(img, b.firstChild); }
        b.disabled = judging || st.done;
        b.classList.toggle('is-suggest', !!(sug && sug.side === side && sug.place === p));
        var nb = b.querySelector('.fs-num'), k = order.indexOf(p), v = nums && k >= 0 ? String(k + 1) : '';
        nb.textContent = v; nb.classList.toggle('is-on', !!v); nb.classList.toggle('is-gold', !!v && k === order.length - 1);
      }
      self._picks[side].hidden = !judging;
      self._tags[side].classList.toggle('is-on', st.judged === side);
    });
    this._same.disabled = !judging;
    this._same.classList.toggle('is-on', st.judged === 'same');
  },

  /* ---------------- the hand ---------------- */
  _judge: function (c) {
    var r = FairShareCore.judge(this.st, c);
    if (!r) return;
    if (r === 'wrong') {
      this.api.sound(260);
      bounce(c === 'same' ? this._same : this._plates[c], 'fs-shake');
    } else {
      this.api.sound(620);
      this._paint();
      if (c !== 'same') bounce(this._tags[c], 'fs-pop');
    }
    this.api.track('judge', { choice: c, result: r, misses: this.st.judgeMisses });
  },
  _move: function (side, place) {
    var st = this.st, el = this._toys[side][place], im = el.querySelector('img'), from = im ? im.getBoundingClientRect() : null;
    var dest = FairShareCore.move(st, side, place);
    if (dest < 0) return;
    this.api.sound(side === 'a' ? 420 : 520);
    this._paint();
    var other = side === 'a' ? 'b' : 'a', ti = this._toys[other][dest].querySelector('img');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (ti && from && ti.animate && !reduce) {
      var to = ti.getBoundingClientRect(), br = this._bridge.getBoundingClientRect();
      var mx = br.left + br.width / 2 - (to.left + to.width / 2), my = br.top + br.height / 2 - (to.top + to.height / 2);
      var fx = (from.left + from.width / 2) - (to.left + to.width / 2), fy = (from.top + from.height / 2) - (to.top + to.height / 2);
      /* across the plank: from where it was, over the middle of the bridge, to its new place */
      ti.animate([{ transform: 'translate(' + fx + 'px,' + fy + 'px)' }, { transform: 'translate(' + mx + 'px,' + my + 'px) scale(.9)', offset: 0.5 }, { transform: 'none' }], { duration: this.WALK_MS, easing: 'ease-in-out' });
    }
    this.api.track('move', { from: side, a: FairShareCore.count(st, 'a'), b: FairShareCore.count(st, 'b') });
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._paint();
    if (res.slip === 'judge') return;
    if (res.ok) {
      this.api.sound(660);
      if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'number', text: String(st.fair), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ } }
    } else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, slip: res.slip, a: res.a, b: res.b, misses: st.misses, moves: st.moves });
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var fsCssDone = false;
function injectFairShareCSS() {
  if (fsCssDone || typeof document === 'undefined') return;
  fsCssDone = true;
  var css = ''
  + '.fs-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:0;padding-top:30px;box-sizing:border-box;--fs-cell:100px;--fs-pic:94px;--fs-pw:616px;--fs-ph:216px;}'
  /* the plates: two round-cornered picnic plates */
  + '.fs-plate{position:relative;width:var(--fs-pw);height:var(--fs-ph);box-sizing:border-box;border-radius:44px;background:radial-gradient(ellipse at 50% 45%,#FFFFFF 0 58%,#F4EEE2 59% 100%);box-shadow:inset 0 0 0 4px #E2D6BE,0 8px 16px rgba(60,45,20,.16);}'
  + '.fs-plate-a{background:radial-gradient(ellipse 80% 90% at 50% 45%,#FFFFFF 0 70%,#E4F1F6 71% 100%);box-shadow:inset 0 0 0 4px #B9D4DF,0 8px 16px rgba(30,60,80,.14);}'
  + '.fs-plate-b{background:radial-gradient(ellipse 80% 90% at 50% 45%,#FFFFFF 0 70%,#F8E7DC 71% 100%);box-shadow:inset 0 0 0 4px #E3C2AE,0 8px 16px rgba(80,45,20,.14);}'
  + '.fs-toy{position:absolute;width:var(--fs-pic);height:var(--fs-pic);padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;touch-action:manipulation;transform:rotate(var(--fs-tilt,0deg));-webkit-tap-highlight-color:transparent;z-index:1;} .fs-toy[hidden]{display:none;}'
  + '.fs-toy:disabled{cursor:default;} .fs-toy:focus-visible,.fs-pick:focus-visible,.fs-same:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.fs-pic{position:relative;width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 3px 2px rgba(40,30,10,.25));transition:transform .15s;}'
  + '.fs-wrap.is-share .fs-toy:not(:disabled):hover .fs-pic{transform:translateY(-4%) scale(1.05);}'
  + '.fs-toy.is-suggest::before{content:"";position:absolute;inset:-4%;border-radius:50%;background:radial-gradient(circle,rgba(246,217,138,.85),rgba(246,217,138,0) 70%);animation:fs-glow 1.1s ease-in-out infinite;} @keyframes fs-glow{0%,100%{opacity:.55;}50%{opacity:1;}}'
  /* step 1: each plate is a big answer button */
  + '.fs-pick{position:absolute;inset:0;z-index:2;border:0;border-radius:44px;background:transparent;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;} .fs-pick[hidden]{display:none;}'
  + '.fs-pick:hover{background:rgba(20,107,94,.06);box-shadow:inset 0 0 0 4px rgba(20,107,94,.35);}'
  + '.fs-plate.fs-shake{animation:fs-shake .4s ease 1;} .fs-same.fs-shake{animation:fs-shake .4s ease 1;} @keyframes fs-shake{0%,100%{transform:none;}25%{transform:translateX(-7px);}75%{transform:translateX(7px);}}'
  + '.fs-tag{position:absolute;left:14px;top:-30px;z-index:3;padding:4px 12px 4px 30px;border-radius:14px;background:var(--lcs-structure);color:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:16px;line-height:1.3;display:none;box-shadow:0 3px 6px rgba(0,0,0,.18);}'
  + '.fs-tag::before{content:"";position:absolute;left:11px;top:50%;width:6px;height:11px;margin-top:-7px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg);}'
  + '.fs-tag.is-on{display:block;} .fs-tag.fs-pop{animation:fs-pop .3s var(--lcs-ease) 1;} @keyframes fs-pop{0%{transform:scale(0);}70%{transform:scale(1.15);}100%{transform:scale(1);}}'
  /* the bridge: a plank walkway between the plates, "The same" on it in step 1 */
  + '.fs-bridge{position:relative;width:var(--fs-pw);height:64px;display:flex;align-items:center;justify-content:center;}'
  + '.fs-plank{position:absolute;left:50%;top:-14px;bottom:-14px;width:min(170px,40%);transform:translateX(-50%);background:repeating-linear-gradient(180deg,#C9934F 0 12px,#B07A3A 12px 14px);border-left:6px solid #8D5A24;border-right:6px solid #8D5A24;border-radius:6px;box-shadow:0 3px 6px rgba(60,35,10,.2);}'
  + '.fs-same{position:relative;z-index:2;min-height:46px;min-width:140px;max-width:90%;padding:0 18px;border-radius:23px;border:3px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;font-size:18px;line-height:1.1;cursor:pointer;touch-action:manipulation;}'
  + '.fs-wrap.is-share .fs-same{display:none;} .fs-wrap.is-share.judged-same .fs-same{display:block;background:var(--lcs-structure);border-color:var(--lcs-structure);color:#fff;opacity:1;}'
  + '.fs-num{position:absolute;right:-2px;top:-2px;min-width:26px;height:26px;padding:0 5px;box-sizing:border-box;border-radius:13px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:15px;line-height:22px;text-align:center;pointer-events:none;z-index:3;transform:rotate(calc(-1 * var(--fs-tilt,0deg)));}'
  + '.fs-num:not(.is-on){display:none;} .fs-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:32px;height:32px;line-height:28px;font-size:18px;border-radius:16px;}'
  + '.fs-wrap.is-narrow .fs-num{min-width:18px;height:18px;padding:0 2px;font-size:11px;line-height:14px;} .fs-wrap.is-narrow .fs-num.is-gold{min-width:24px;height:24px;line-height:20px;font-size:14px;}'
  + '.fs-wrap.is-stack .fs-bridge,.fs-wrap.is-narrow .fs-bridge{height:46px;} .fs-wrap.is-stack .fs-plank,.fs-wrap.is-narrow .fs-plank{top:-10px;bottom:-10px;}'
  + '.fs-wrap.is-stack .fs-plate,.fs-wrap.is-narrow .fs-plate{border-radius:40px;} .fs-wrap.is-stack .fs-pick,.fs-wrap.is-narrow .fs-pick{border-radius:40px;}'
  + '.fs-wrap.is-stack,.fs-wrap.is-narrow{padding-top:6px;} .fs-wrap.is-stack .fs-tag,.fs-wrap.is-narrow .fs-tag{left:-8px;top:-10px;width:32px;height:32px;padding:0;border-radius:50%;font-size:0;border:2px solid #fff;box-sizing:border-box;} .fs-wrap.is-stack .fs-tag::before,.fs-wrap.is-narrow .fs-tag::before{left:10px;top:50%;margin-top:-8px;}'   /* phones: the tag shrinks to a check badge on the rim, no strip above the plate */
  + '@media (prefers-reduced-motion:reduce){.fs-toy::before,.fs-plate,.fs-same,.fs-tag{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'fs-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = FairShareActivity;
if (typeof window !== 'undefined') window.FairShareActivity = FairShareActivity;
