/* =====================================================================
   fruit-stand-activity.js — ACTIVITY #11 of the one-by-one rebuild:
   "Count to 20 with Fruits" (K.CC.B.4) — THE FRUIT STAND.
   Design sheet: docs/activities-rebuild/011-fruit-stand.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: FILL TO HERE. An order slip shows a number; two market
   trays of ten (a double ten-frame) wait. A tap on an empty space fills
   every space up to it, one fruit after another in counting order; a tap
   on a fruit takes back that fruit and every fruit after it — so the
   child does not tap seventeen times, they find where seventeen ENDS (a
   full tray and 7 more). Check: the stand numbers its fruit; a wrong
   count is named (too many · too few · only the part after ten · only the
   full tray) and a second wrong Check marks the extra fruit or the spaces
   still waiting. The help never moves a fruit. Setting "one at a time":
   a tap adds one fruit / takes back the last. No mascot: an order slip,
   two trays, library fruit. Counting never includes 0.

   ACTIVITY LAYER ONLY: the model is fruit-stand-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.FruitStandActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var FruitStandActivity = {
  id: 'fruit-stand',
  apparatusClasses: ['fs-'],

  strings: {
    title:          {en:'The Fruit Stand',de:'Der Obststand',fr:'L’étal de fruits',es:'El puesto de frutas',pt:'A banca de frutas',it:'La bancarella della frutta',nl:'De fruitkraam',sv:'Fruktståndet',da:'Frugtboden',no:'Fruktboden',fi:'Hedelmäkoju'},
    instruction:    {en:'Tap an empty space to put fruit in, and a fruit to take fruit back.',de:'Tippe auf einen leeren Platz, um Obst hineinzulegen, und auf eine Frucht, um Obst zurückzunehmen.',fr:'Touche une case vide pour mettre des fruits, et un fruit pour en reprendre.',es:'Toca un lugar vacío para poner frutas y una fruta para quitar frutas.',pt:'Toque em um lugar vazio para pôr frutas e em uma fruta para tirar frutas.',it:'Tocca un posto vuoto per mettere la frutta e un frutto per toglierla.',nl:'Tik op een leeg vakje om fruit erin te leggen en op een stuk fruit om fruit terug te nemen.',sv:'Tryck på en tom ruta för att lägga i frukt och på en frukt för att ta bort frukt.',da:'Tryk på en tom plads for at lægge frugt i og på en frugt for at tage frugt væk.',no:'Trykk på en tom plass for å legge i frukt og på en frukt for å ta bort frukt.',fi:'Napauta tyhjää paikkaa, niin hedelmiä tulee lisää, ja hedelmää, niin hedelmiä lähtee pois.'},
    prompt:         {en:'Read the order. Put exactly that many fruits in the trays, then press Check.',de:'Lies die Bestellung. Lege genau so viele Früchte in die Schalen und drücke dann auf Prüfen.',fr:'Lis la commande. Mets exactement ce nombre de fruits dans les plateaux, puis appuie sur Vérifier.',es:'Lee el pedido. Pon exactamente esa cantidad de frutas en las charolas y luego oprime Comprobar.',pt:'Leia o pedido. Coloque exatamente essa quantidade de frutas nas bandejas e depois aperte Verificar.',it:'Leggi l’ordine. Metti nei vassoi esattamente quel numero di frutti, poi premi Verifica.',nl:'Lees de bestelling. Leg precies zoveel stuks fruit in de bakjes en druk dan op Controleer.',sv:'Läs beställningen. Lägg exakt så många frukter i brickorna och tryck sedan på Kontrollera.',da:'Læs bestillingen. Læg præcis så mange frugter i bakkerne, og tryk så på Tjek.',no:'Les bestillingen. Legg nøyaktig så mange frukter i brettene, og trykk så på Sjekk.',fi:'Lue tilaus. Laita tarjottimille täsmälleen niin monta hedelmää ja paina sitten Tarkista.'},
    orderLabel:     {en:'The order: {n}',de:'Die Bestellung: {n}',fr:'La commande : {n}',es:'El pedido: {n}',pt:'O pedido: {n}',it:'L’ordine: {n}',nl:'De bestelling: {n}',sv:'Beställningen: {n}',da:'Bestillingen: {n}',no:'Bestillingen: {n}',fi:'Tilaus: {n}'},
    trayLabel:      {en:'Tray {k}',de:'Schale {k}',fr:'Plateau {k}',es:'Charola {k}',pt:'Bandeja {k}',it:'Vassoio {k}',nl:'Bakje {k}',sv:'Bricka {k}',da:'Bakke {k}',no:'Brett {k}',fi:'Tarjotin {k}'},
    cupEmpty:       {en:'Fill up to here',de:'Bis hierher füllen',fr:'Remplir jusqu’ici',es:'Llenar hasta aquí',pt:'Encher até aqui',it:'Riempire fino a qui',nl:'Tot hier vullen',sv:'Fyll på hit',da:'Fyld op hertil',no:'Fyll opp hit',fi:'Täytä tähän asti'},
    cupFull:        {en:'Take the fruit back from here',de:'Ab hier zurücknehmen',fr:'Reprendre les fruits à partir d’ici',es:'Quitar las frutas desde aquí',pt:'Tirar as frutas daqui em diante',it:'Togliere la frutta da qui in poi',nl:'Vanaf hier terugnemen',sv:'Ta bort härifrån',da:'Tag væk herfra',no:'Ta bort herfra',fi:'Ota pois tästä eteenpäin'},
    cupAdd:         {en:'Add one fruit',de:'Eine Frucht dazulegen',fr:'Ajouter un fruit',es:'Poner una fruta',pt:'Pôr uma fruta',it:'Aggiungere un frutto',nl:'Eén stuk fruit erbij',sv:'Lägg i en frukt',da:'Læg én frugt i',no:'Legg i én frukt',fi:'Lisää yksi hedelmä'},
    cupTake:        {en:'Take one fruit back',de:'Eine Frucht zurücknehmen',fr:'Reprendre un fruit',es:'Quitar una fruta',pt:'Tirar uma fruta',it:'Togliere un frutto',nl:'Eén stuk fruit terugnemen',sv:'Ta bort en frukt',da:'Tag én frugt væk',no:'Ta bort én frukt',fi:'Ota yksi hedelmä pois'},
    noteCompare:    {en:'In the trays: {a}. The order: {n}.',de:'In den Schalen: {a}. Bestellt: {n}.',fr:'Dans les plateaux : {a}. La commande : {n}.',es:'En las charolas: {a}. El pedido: {n}.',pt:'Nas bandejas: {a}. O pedido: {n}.',it:'Nei vassoi: {a}. L’ordine: {n}.',nl:'In de bakjes: {a}. Besteld: {n}.',sv:'I brickorna: {a}. Beställt: {n}.',da:'I bakkerne: {a}. Bestilt: {n}.',no:'I brettene: {a}. Bestilt: {n}.',fi:'Tarjottimilla: {a}. Tilaus: {n}.'},
    hintNone:       {en:'Tap an empty space to put fruit in first.',de:'Tippe zuerst auf einen leeren Platz, um Obst hineinzulegen.',fr:'Touche d’abord une case vide pour mettre des fruits.',es:'Primero toca un lugar vacío para poner frutas.',pt:'Primeiro toque em um lugar vazio para pôr frutas.',it:'Prima tocca un posto vuoto per mettere la frutta.',nl:'Tik eerst op een leeg vakje om fruit erin te leggen.',sv:'Tryck först på en tom ruta för att lägga i frukt.',da:'Tryk først på en tom plads for at lægge frugt i.',no:'Trykk først på en tom plass for å legge i frukt.',fi:'Napauta ensin tyhjää paikkaa, niin hedelmiä tulee tarjottimille.'},
    hintMore:       {en:'Too many — tap a fruit to take fruit back.',de:'Zu viele – tippe auf eine Frucht, um Obst zurückzunehmen.',fr:'Trop de fruits — touche un fruit pour en reprendre.',es:'Son demasiadas: toca una fruta para quitar frutas.',pt:'Frutas demais: toque em uma fruta para tirar frutas.',it:'Troppi: tocca un frutto per toglierne.',nl:'Te veel – tik op een stuk fruit om fruit terug te nemen.',sv:'För många – tryck på en frukt för att ta bort frukt.',da:'For mange – tryk på en frugt for at tage frugt væk.',no:'For mange – trykk på en frukt for å ta bort frukt.',fi:'Liikaa – napauta hedelmää, niin hedelmiä lähtee pois.'},
    hintFewer:      {en:'Too few — tap an empty space to put more fruit in.',de:'Zu wenige – tippe auf einen leeren Platz, um mehr Obst hineinzulegen.',fr:'Pas assez — touche une case vide pour ajouter des fruits.',es:'Faltan: toca un lugar vacío para poner más frutas.',pt:'Faltam frutas: toque em um lugar vazio para pôr mais.',it:'Troppo pochi: tocca un posto vuoto per aggiungere frutta.',nl:'Te weinig – tik op een leeg vakje om meer fruit erbij te leggen.',sv:'För få – tryck på en tom ruta för att lägga i fler frukter.',da:'For få – tryk på en tom plads for at lægge flere frugter i.',no:'For få – trykk på en tom plass for å legge i flere frukter.',fi:'Liian vähän – napauta tyhjää paikkaa, niin hedelmiä tulee lisää.'},
    hintOnesOnly:   {en:'That is only the part after ten. A number from 11 to 20 is a full tray of ten and some more.',de:'Das ist nur der Teil nach der Zehn. Eine Zahl von 11 bis 20 ist eine volle Schale mit zehn und noch etwas mehr.',fr:'Ce n’est que la partie après dix. Un nombre de 11 à 20, c’est un plateau plein de dix et encore quelques fruits.',es:'Eso es solo lo que va después del diez. Un número del 11 al 20 es una charola llena de diez y algunas más.',pt:'Isso é só a parte depois do dez. Um número de 11 a 20 é uma bandeja cheia de dez e mais algumas.',it:'Questa è solo la parte dopo il dieci. Un numero da 11 a 20 è un vassoio pieno da dieci e ancora qualche frutto.',nl:'Dat is alleen het stuk na de tien. Een getal van 11 tot en met 20 is een vol bakje van tien en nog wat meer.',sv:'Det är bara delen efter tio. Ett tal från 11 till 20 är en full bricka med tio och några till.',da:'Det er kun delen efter ti. Et tal fra 11 til 20 er en fuld bakke med ti og nogle flere.',no:'Det er bare delen etter ti. Et tall fra 11 til 20 er et fullt brett med ti og noen til.',fi:'Tuo on vain kymmenen jälkeinen osa. Luku 11–20 on täysi kymmenen hedelmän tarjotin ja vielä vähän lisää.'},
    hintTenOnly:    {en:'That is one full tray — ten. The order wants ten and some more.',de:'Das ist eine volle Schale – zehn. Bestellt sind zehn und noch etwas mehr.',fr:'C’est un plateau plein — dix. La commande demande dix et encore quelques fruits.',es:'Esa es una charola llena: diez. El pedido es diez y algunas más.',pt:'Essa é uma bandeja cheia: dez. O pedido é dez e mais algumas.',it:'Questo è un vassoio pieno: dieci. L’ordine è dieci e ancora qualche frutto.',nl:'Dat is één vol bakje – tien. Er is tien en nog wat meer besteld.',sv:'Det är en full bricka – tio. Beställningen är tio och några till.',da:'Det er én fuld bakke – ti. Bestillingen er ti og nogle flere.',no:'Det er ett fullt brett – ti. Bestillingen er ti og noen til.',fi:'Tuo on yksi täysi tarjotin – kymmenen. Tilaus on kymmenen ja vielä vähän lisää.'},
    celebrate:      {en:'Just right — the order is packed!',de:'Genau richtig – die Bestellung ist fertig!',fr:'Pile le bon nombre — la commande est prête !',es:'¡Exacto! ¡El pedido está listo!',pt:'Certinho! O pedido está pronto!',it:'Giusto! L’ordine è pronto!',nl:'Precies goed – de bestelling is klaar!',sv:'Precis rätt – beställningen är klar!',da:'Helt rigtigt – bestillingen er klar!',no:'Helt riktig – bestillingen er klar!',fi:'Juuri oikein – tilaus on valmis!'},
    setRange:       {en:'Orders',de:'Bestellungen',fr:'Commandes',es:'Pedidos',pt:'Pedidos',it:'Ordini',nl:'Bestellingen',sv:'Beställningar',da:'Bestillinger',no:'Bestillinger',fi:'Tilaukset'},
    rangeTo10:      {en:'Up to 10 (one tray)',de:'Bis 10 (eine Schale)',fr:'Jusqu’à 10 (un plateau)',es:'Hasta 10 (una charola)',pt:'Até 10 (uma bandeja)',it:'Fino a 10 (un vassoio)',nl:'Tot en met 10 (één bakje)',sv:'Upp till 10 (en bricka)',da:'Op til 10 (én bakke)',no:'Opptil 10 (ett brett)',fi:'10:een asti (yksi tarjotin)'},
    rangeTo20:      {en:'Up to 20',de:'Bis 20',fr:'Jusqu’à 20',es:'Hasta 20',pt:'Até 20',it:'Fino a 20',nl:'Tot en met 20',sv:'Upp till 20',da:'Op til 20',no:'Opptil 20',fi:'20:een asti'},
    setTap:         {en:'A tap on an empty space',de:'Ein Tipp auf einen leeren Platz',fr:'Toucher une case vide',es:'Tocar un lugar vacío',pt:'Tocar em um lugar vazio',it:'Toccare un posto vuoto',nl:'Tikken op een leeg vakje',sv:'Ett tryck på en tom ruta',da:'Tryk på en tom plads',no:'Trykk på en tom plass',fi:'Tyhjän paikan napautus'},
    tapFill:        {en:'Fills up to there',de:'Füllt bis dorthin',fr:'Remplit jusque-là',es:'Llena hasta ahí',pt:'Enche até ali',it:'Riempie fino a lì',nl:'Vult tot daar',sv:'Fyller på dit',da:'Fylder op til den',no:'Fyller opp dit',fi:'Täyttää siihen asti'},
    tapOne:         {en:'Adds one fruit',de:'Legt eine Frucht dazu',fr:'Ajoute un fruit',es:'Pone una fruta',pt:'Põe uma fruta',it:'Aggiunge un frutto',nl:'Legt één stuk fruit erbij',sv:'Lägger i en frukt',da:'Lægger én frugt i',no:'Legger i én frukt',fi:'Lisää yhden hedelmän'}
  },

  defaults: { range: 'to20', tap: 'fill' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to10', labelKey: 'rangeTo10' }, { value: 'to20', labelKey: 'rangeTo20' }] },
    { key: 'tap', type: 'choice', labelKey: 'setTap', options: [{ value: 'fill', labelKey: 'tapFill' }, { value: 'one', labelKey: 'tapOne' }] }
  ],

  DROP_MS: 40,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null;
    injectFruitStandCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(FruitStandCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the trays stay empty */ });
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
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return FruitStandCore.POOLS[r] ? r : 'to20'; },
  _mode: function () { var m = this.api && this.api.settings && this.api.settings.tap; return FruitStandCore.MODES.indexOf(m) >= 0 ? m : 'fill'; },
  _ensurePool: function () { var key = this._range(); if (!this._pool || this._poolKey !== key) { this._pool = FruitStandCore.rounds(key, 'fs'); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'fruit-stand.' + r.id,
      promptKey: 'prompt',
      promptArgs: {},
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = FruitStandCore.newState(r, tool._mode()); tool._preload(); },
      check: function (tool) { var res = FruitStandCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return FruitStandCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = FruitStandCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to20', 'fs')[1], 'fill');
    var wrap = api.el('div', 'fs-wrap'); this._wrap = wrap;

    /* the order slip and the note */
    var top = api.el('div', 'fs-top');
    var slip = api.el('div', 'fs-slip'); slip.setAttribute('role', 'img');
    var num = api.el('span', 'fs-slip-num'); slip.appendChild(num);
    this._slip = slip; this._slipNum = num; top.appendChild(slip);
    var note = api.el('div', 'fs-note'); note.setAttribute('aria-live', 'polite'); this._note = note; top.appendChild(note);
    wrap.appendChild(top);

    /* the trays */
    var trays = api.el('div', 'fs-trays'); this._trayEls = []; this._cupEls = [];
    for (var k = 0; k < 2; k++) {
      var tray = api.el('div', 'fs-tray'); tray.setAttribute('role', 'group');
      var grid = api.el('div', 'fs-cups');
      for (var j = 0; j < C.TRAY; j++) {
        (function (ci) {
          var cup = api.el('button', 'fs-cup'); cup.type = 'button';
          cup.addEventListener('click', function () { self._tap(ci); });
          var nb = api.el('span', 'fs-num'); nb.setAttribute('aria-hidden', 'true'); cup.appendChild(nb);
          grid.appendChild(cup); self._cupEls.push(cup);
        }(k * C.TRAY + j));
      }
      tray.appendChild(grid); trays.appendChild(tray); this._trayEls.push(tray);
    }
    this._trays = trays; wrap.appendChild(trays);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = FruitStandCore.layout(this._width(), st ? st.trays : 2);
    var w = this._wrap;
    w.classList.toggle('is-row', L.mode === 'row');
    w.classList.toggle('is-stack', L.mode === 'stack');
    w.style.setProperty('--fs-cup', L.cup + 'px');
    w.style.setProperty('--fs-pic', L.pic + 'px');
    w.style.setProperty('--fs-frame', L.frame + 'px');
    w.style.setProperty('--fs-gap', L.gap + 'px');
    w.style.setProperty('--fs-trayw', L.trayW + 'px');
    w.style.setProperty('--fs-between', L.between + 'px');
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
  _fruitName: function () {
    var st = this.st;
    if (!this._theme || !this._theme.nouns[st.noun]) return st.noun;
    try { return LCSPictures.label(this._theme, st.noun, this.api.lang, { plural: false }); } catch (e) { return st.noun; }
  },
  _preload: function () {
    if (!this._theme || !this.st || typeof Image === 'undefined') return;
    if (this._theme.nouns[this.st.noun]) { var im = new Image(); im.src = LCSPictures.url(this._theme, this.st.noun); }
  },

  _paint: function () {
    var st = this.st, t = this.api.t, C = FruitStandCore, lang = this.api.lang;
    var view = C.cupView(st), name = this._fruitName(), one = st.mode === 'one';
    this._wrap.classList.toggle('is-done', st.done);
    this._wrap.classList.toggle('is-one', st.trays === 1);
    this._slipNum.textContent = String(st.n);
    this._slip.setAttribute('aria-label', interp(t('orderLabel'), { n: st.n }));
    for (var k = 0; k < 2; k++) { this._trayEls[k].hidden = k >= st.trays; this._trayEls[k].setAttribute('aria-label', interp(t('trayLabel'), { k: k + 1 })); }
    for (var c = 0; c < this._cupEls.length; c++) {
      var cup = this._cupEls[c], on = c < st.filled, v = view[c] || { num: '', mark: '' };
      cup.classList.toggle('has-fruit', on);
      var img = cup.querySelector('img');
      if (on && this._theme && this._theme.nouns[st.noun]) {
        if (!img) { img = LCSPictures.img(this._theme, st.noun, lang, { plural: false }); img.className = 'fs-fruit'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); cup.insertBefore(img, cup.firstChild); }
        else if (img.getAttribute('data-noun') !== st.noun) img.src = LCSPictures.url(this._theme, st.noun);
        img.setAttribute('data-noun', st.noun);
      } else if (img) cup.removeChild(img);
      cup.disabled = st.done || c >= C.cups(st);
      cup.setAttribute('aria-label', on ? (one ? t('cupTake') : t('cupFull')) + ' — ' + name : (one ? t('cupAdd') : t('cupEmpty')));
      var nb = cup.querySelector('.fs-num');
      nb.textContent = v.num === '' ? '' : String(v.num);
      nb.classList.toggle('is-on', v.num !== '');
      nb.classList.toggle('is-gold', v.mark === 'last');
      cup.classList.toggle('is-extra', v.mark === 'extra');
      cup.classList.toggle('is-need', v.mark === 'need');
    }
    var nt = C.note(st);
    this._note.textContent = nt ? interp(t('noteCompare'), nt) : '';
    this._note.classList.toggle('is-on', !!nt);
  },

  /* ---------------- the hand ---------------- */
  _tap: function (c) {
    var st = this.st;
    if (!st) return;
    var res = FruitStandCore.tap(st, c);
    if (!res) return;
    this._paint();
    if (res.to > res.from) {
      /* the fruit tumbles in, cup after cup, in counting order (≤ 0.6 s) */
      var step = Math.min(this.DROP_MS, Math.floor(600 / (res.to - res.from)));
      for (var i = res.from; i < res.to; i++) { var cup = this._cupEls[i]; cup.style.setProperty('--fs-delay', ((i - res.from) * step) + 'ms'); bounce(cup, 'fs-in'); }
      this.api.sound(420 + 14 * res.to);
    } else this.api.sound(320);
    this.api.track('tap', { n: st.n, from: res.from, to: res.to, mode: st.mode });
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._paint();
    if (res.slip === 'none') return;
    /* the stand numbers its fruit, one after another */
    for (var c = 0; c < st.filled; c++) { var nb = this._cupEls[c].querySelector('.fs-num'); nb.style.setProperty('--fs-delay', (c * 60) + 'ms'); bounce(nb, 'fs-pop'); }
    if (res.ok) { this.api.sound(660); this._speakNumber(st.n); }
    else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, slip: res.slip, a: res.a, misses: st.misses });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var fsCssDone = false;
function injectFruitStandCSS() {
  if (fsCssDone || typeof document === 'undefined') return;
  fsCssDone = true;
  var css = ''
  + '.fs-wrap{width:100%;position:relative;display:flex;flex-direction:column;align-items:center;gap:12px;--fs-cup:96px;--fs-pic:88px;--fs-frame:12px;--fs-gap:6px;--fs-trayw:560px;--fs-between:12px;--fs-tray:#8DBF6A;--fs-tray2:#6FA64E;--fs-tray3:#4C7F33;--fs-well:#F6FBEF;}'
  /* the order slip + the note */
  + '.fs-top{display:flex;align-items:center;gap:14px;width:var(--fs-trayw);max-width:100%;min-height:84px;}'
  + '.fs-wrap.is-stack .fs-top{width:100%;}'
  + '.fs-slip{position:relative;flex:0 0 auto;min-width:104px;height:84px;box-sizing:border-box;padding:0 16px;border-radius:10px;background:#FFFDF6;border:3px solid #B98552;box-shadow:0 4px 10px rgba(60,35,10,.14);display:grid;place-items:center;transform:rotate(-2deg);}'
  + '.fs-slip::before{content:"";position:absolute;left:50%;top:-10px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:#E05A3A;box-shadow:0 2px 3px rgba(0,0,0,.25);}'
  + '.fs-slip-num{font-family:var(--lcs-font-display);font-weight:800;font-size:58px;line-height:1;color:#5B3A12;}'
  + '.fs-wrap.is-stack{gap:8px;} .fs-wrap.is-stack .fs-slip{min-width:72px;height:54px;} .fs-wrap.is-stack .fs-slip-num{font-size:38px;} .fs-wrap.is-stack .fs-top{min-height:54px;}'
  + '.fs-note{flex:1 1 auto;min-width:0;font-family:var(--lcs-font-body);font-weight:800;font-size:clamp(15px,1vw + 11px,19px);line-height:1.35;color:#B3512A;visibility:hidden;}'
  + '.fs-note.is-on{visibility:visible;}'
  /* the trays */
  + '.fs-trays{display:flex;flex-direction:column;align-items:center;gap:var(--fs-between);}'
  + '.fs-wrap.is-stack .fs-trays{flex-direction:row;align-items:flex-start;justify-content:center;}'
  + '.fs-tray{box-sizing:border-box;padding:var(--fs-frame);border-radius:18px;background:linear-gradient(180deg,var(--fs-tray),var(--fs-tray2));box-shadow:inset 0 0 0 3px var(--fs-tray3),0 6px 14px rgba(40,70,25,.18);} .fs-tray[hidden]{display:none;}'
  + '.fs-cups{display:grid;grid-template-columns:repeat(5,var(--fs-cup));grid-template-rows:repeat(2,var(--fs-cup));gap:var(--fs-gap);}'
  + '.fs-wrap.is-stack .fs-cups{grid-template-columns:repeat(2,var(--fs-cup));grid-template-rows:repeat(5,var(--fs-cup));grid-auto-flow:column;}'
  + '.fs-cup{position:relative;width:var(--fs-cup);height:var(--fs-cup);padding:0;border:0;border-radius:50%;background:radial-gradient(circle at 50% 42%,var(--fs-well) 0 55%,#E3EED6 70%,#CFE0BD 100%);box-shadow:inset 0 4px 8px rgba(40,70,25,.28);display:grid;place-items:center;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}'
  /* the first five spaces of each tray share a warmer well, so five reads as a unit */
  + '.fs-cup:nth-child(-n+5){background:radial-gradient(circle at 50% 42%,#FFFBEA 0 55%,#F3EBC8 70%,#E5DAAE 100%);}'
  + '.fs-cup:hover:not(:disabled){box-shadow:inset 0 4px 8px rgba(40,70,25,.28),0 0 0 3px #fff;} .fs-cup:disabled{cursor:default;} .fs-cup:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.fs-fruit{width:var(--fs-pic);height:var(--fs-pic);object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(40,25,10,.2));}'
  + '.fs-cup.fs-in .fs-fruit{animation:fs-in .32s cubic-bezier(.3,.7,.2,1) var(--fs-delay,0ms) both;} @keyframes fs-in{0%{transform:translateY(-26px);opacity:0;}70%{transform:translateY(3px);opacity:1;}100%{transform:none;opacity:1;}}'
  + '.fs-cup.is-need{box-shadow:inset 0 0 0 3px var(--lcs-accent),inset 0 4px 8px rgba(40,70,25,.2);}'
  + '.fs-cup.is-extra{box-shadow:inset 0 0 0 4px var(--lcs-accent),inset 0 4px 8px rgba(40,70,25,.2);}'
  + '.fs-num{position:absolute;right:0;top:0;min-width:30px;height:30px;padding:0 5px;box-sizing:border-box;border-radius:15px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:17px;line-height:26px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.28);pointer-events:none;z-index:2;}'
  + '.fs-num:not(.is-on){display:none;}'
  + '.fs-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:38px;height:38px;line-height:34px;font-size:22px;border-radius:19px;}'
  + '.fs-cup.is-extra .fs-num{background:var(--lcs-accent);}'
  + '.fs-num.fs-pop{animation:fs-pop .3s var(--lcs-ease) var(--fs-delay,0ms) both;} @keyframes fs-pop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}'
  + '.fs-wrap.is-stack .fs-num{min-width:22px;height:22px;font-size:13px;line-height:18px;} .fs-wrap.is-stack .fs-num.is-gold{min-width:28px;height:28px;line-height:24px;font-size:16px;}'
  + '@media (prefers-reduced-motion:reduce){.fs-fruit,.fs-num{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'fs-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = FruitStandActivity;
if (typeof window !== 'undefined') window.FruitStandActivity = FruitStandActivity;
