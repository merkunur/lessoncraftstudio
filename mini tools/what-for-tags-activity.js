/* =====================================================================
   what-for-tags-activity.js — ACTIVITY #133 of the one-by-one rebuild:
   "Jasper's Just-Right Bag" → THE WHAT-FOR TAGS (L.1.5.c; all 11 locales).
   Model: what-for-tags-core.js (WhatForTagsCore).
   Design: docs/activities-rebuild/designs/133-jasper-just-right.md
   ---------------------------------------------------------------------
   The invention: everything in Jasper's bag wears a little tag saying
   what it is FOR. The child hangs one thing under each moment of the day
   (tap it, then the moment — or drag it there) and presses Go: a sun
   travels across the day and the tags flip. A thing whose tag fits clicks
   into its moment; one that does not drops back into the bag with its tag
   left open — now the child can read what it really is for. Tags of
   things never tried stay closed. No timer, no score.
   Test seams: window.WhatForTagsActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._pick / ._hang / ._go /
   .FAST / .OK_MS.
   ===================================================================== */
var WhatForTagsActivity = {
  id: 'what-for-tags',
  /* the drawn apparatus (the hierarchy gate): the day board and its windows, the hooks, the bag, the tags */
  apparatusClasses: ['wt-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"The What-For Tags",de:"Die Wozu-Schildchen",fr:"Les étiquettes « à quoi ça sert »",es:"Las etiquetas del para qué",pt:"As etiquetas do para quê",it:"Le etichette del “a che serve”",nl:"De waarvoor-labeltjes",sv:"Vad-är-den-till-lapparna",da:"Hvad-er-den-til-mærkerne",no:"Hva-er-den-til-lappene",fi:"Mihin se on -laput"},
    instruction: {en:"Read each moment of the day. Hang the thing you would use under it, then press Go.",de:"Lies jeden Moment des Tages. Häng darunter das Ding, das du brauchst, und drück dann auf Los.",fr:"Lis chaque moment de la journée. Accroche dessous la chose qui te servirait, puis appuie sur C’est parti.",es:"Lee cada momento del día. Cuelga debajo la cosa que usarías y luego aprieta Vamos.",pt:"Leia cada momento do dia. Pendure embaixo a coisa que você usaria e depois aperte Vai.",it:"Leggi ogni momento della giornata. Appendi sotto la cosa che useresti, poi premi Via.",nl:"Lees elk moment van de dag. Hang het ding dat je zou gebruiken eronder en druk dan op Start.",sv:"Läs varje stund under dagen. Häng saken du skulle använda under den och tryck sedan på Kör.",da:"Læs hvert øjeblik på dagen. Hæng den ting, du ville bruge, under det, og tryk så på Start.",no:"Les hvert øyeblikk av dagen. Heng tingen du ville brukt under det, og trykk så på Start.",fi:"Lue päivän jokainen hetki. Ripusta sen alle tavara, jota käyttäisit, ja paina sitten Mene."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Read what is happening: what would you use?",de:"Lies, was passiert: Was würdest du benutzen?",fr:"Lis ce qui se passe : qu’est-ce qui te servirait ?",es:"Lee lo que pasa: ¿qué usarías?",pt:"Leia o que está acontecendo: o que você usaria?",it:"Leggi che cosa succede: che cosa useresti?",nl:"Lees wat er gebeurt: wat zou je gebruiken?",sv:"Läs vad som händer: vad skulle du använda?",da:"Læs, hvad der sker: Hvad ville du bruge?",no:"Les hva som skjer: Hva ville du brukt?",fi:"Lue, mitä tapahtuu: mitä käyttäisit?"},
    t2: {en:"Hang it on every moment where it helps.",de:"Häng es an jeden Moment, bei dem es hilft.",fr:"Accroche-la à chaque moment où elle sert.",es:"Cuélgala en cada momento en que sirva.",pt:"Pendure a coisa em cada momento em que ela ajuda.",it:"Appendila a ogni momento in cui serve.",nl:"Hang het bij elk moment waarbij het helpt.",sv:"Häng den vid varje stund där den hjälper.",da:"Hæng den ved hvert øjeblik, hvor den hjælper.",no:"Heng den ved hvert øyeblikk der den hjelper.",fi:"Ripusta se jokaiseen hetkeen, jossa siitä on apua."},
    t3: {en:"What is it like? Hang each thing under its word.",de:"Wie ist es? Häng jedes Ding unter sein Wort.",fr:"C’est comment ? Accroche chaque chose sous son mot.",es:"¿Cómo es? Cuelga cada cosa debajo de su palabra.",pt:"Como é? Pendure cada coisa embaixo da sua palavra.",it:"Com’è? Appendi ogni cosa sotto la sua parola.",nl:"Hoe is het? Hang elk ding onder zijn woord.",sv:"Hur är det? Häng varje sak under sitt ord.",da:"Hvordan er det? Hæng hver ting under sit ord.",no:"Hvordan er det? Heng hver ting under ordet sitt.",fi:"Millainen se on? Ripusta jokainen tavara sanansa alle."},
    setLevel: {en:"What to do",de:"Was du tust",fr:"Que faire",es:"Qué hacer",pt:"O que fazer",it:"Che cosa fare",nl:"Wat je doet",sv:"Vad du gör",da:"Hvad du gør",no:"Hva du gjør",fi:"Mitä teet"},
    l1: {en:"Pack the day",de:"Den Tag packen",fr:"Préparer la journée",es:"Preparar el día",pt:"Arrumar o dia",it:"Preparare la giornata",nl:"De dag inpakken",sv:"Packa dagen",da:"Pak dagen",no:"Pakk dagen",fi:"Pakkaa päivä"},
    l2: {en:"More than one use",de:"Hilft öfter als einmal",fr:"Plus d’une utilité",es:"Más de un uso",pt:"Mais de um uso",it:"Più di un uso",nl:"Voor meer dan één ding",sv:"Till mer än en sak",da:"Til mere end én ting",no:"Til mer enn én ting",fi:"Moneen käyttöön"},
    l3: {en:"What is it like?",de:"Wie ist es?",fr:"C’est comment ?",es:"¿Cómo es?",pt:"Como é?",it:"Com’è?",nl:"Hoe is het?",sv:"Hur är det?",da:"Hvordan er det?",no:"Hvordan er det?",fi:"Millainen se on?"},
    setBag: {en:"Things in the bag",de:"Dinge in der Tasche",fr:"Choses dans le sac",es:"Cosas en la bolsa",pt:"Coisas na bolsa",it:"Cose nella borsa",nl:"Dingen in de tas",sv:"Saker i väskan",da:"Ting i tasken",no:"Ting i sekken",fi:"Tavaroita laukussa"},
    bag6: {en:"Six",de:"Sechs",fr:"Six",es:"Seis",pt:"Seis",it:"Sei",nl:"Zes",sv:"Sex",da:"Seks",no:"Seks",fi:"Kuusi"},
    bag8: {en:"Eight",de:"Acht",fr:"Huit",es:"Ocho",pt:"Oito",it:"Otto",nl:"Acht",sv:"Åtta",da:"Otte",no:"Åtte",fi:"Kahdeksan"},
    setWords: {en:"The moments",de:"Die Momente",fr:"Les moments",es:"Los momentos",pt:"Os momentos",it:"I momenti",nl:"De momenten",sv:"Stunderna",da:"Øjeblikkene",no:"Øyeblikkene",fi:"Hetket"},
    wordsText: {en:"Picture and sentence",de:"Bild und Satz",fr:"Image et phrase",es:"Dibujo y oración",pt:"Figura e frase",it:"Immagine e frase",nl:"Plaatje en zin",sv:"Bild och mening",da:"Billede og sætning",no:"Bilde og setning",fi:"Kuva ja lause"},
    wordsPic: {en:"Picture only",de:"Nur das Bild",fr:"Seulement l’image",es:"Solo el dibujo",pt:"Só a figura",it:"Solo l’immagine",nl:"Alleen het plaatje",sv:"Bara bilden",da:"Kun billedet",no:"Bare bildet",fi:"Vain kuva"},
    go: {en:"Go",de:"Los",fr:"C’est parti",es:"Vamos",pt:"Vai",it:"Via",nl:"Start",sv:"Kör",da:"Start",no:"Start",fi:"Mene"},
    okDay: {en:"Just right!",de:"Genau richtig!",fr:"Parfait !",es:"¡Justo lo que necesitas!",pt:"Na medida certa!",it:"Perfetto!",nl:"Precies goed!",sv:"Precis rätt!",da:"Helt rigtigt!",no:"Helt riktig!",fi:"Juuri oikein!"},
    hintHang: {en:"Hang one thing under every moment.",de:"Häng unter jeden Moment ein Ding.",fr:"Accroche une chose sous chaque moment.",es:"Cuelga una cosa debajo de cada momento.",pt:"Pendure uma coisa embaixo de cada momento.",it:"Appendi una cosa sotto ogni momento.",nl:"Hang onder elk moment één ding.",sv:"Häng en sak under varje stund.",da:"Hæng én ting under hvert øjeblik.",no:"Heng én ting under hvert øyeblikk.",fi:"Ripusta yksi tavara jokaisen hetken alle."},
    hintCopy: {en:"Hang it on at least one moment first.",de:"Häng es zuerst an mindestens einen Moment.",fr:"Accroche-la d’abord à au moins un moment.",es:"Primero cuélgala en un momento por lo menos.",pt:"Primeiro pendure em pelo menos um momento.",it:"Prima appendila ad almeno un momento.",nl:"Hang het eerst bij minstens één moment.",sv:"Häng den först vid minst en stund.",da:"Hæng den først ved mindst ét øjeblik.",no:"Heng den først ved minst ett øyeblikk.",fi:"Ripusta se ensin ainakin yhteen hetkeen."},
    hintFeel: {en:"Hang two things under every word.",de:"Häng unter jedes Wort zwei Dinge.",fr:"Accroche deux choses sous chaque mot.",es:"Cuelga dos cosas debajo de cada palabra.",pt:"Pendure duas coisas embaixo de cada palavra.",it:"Appendi due cose sotto ogni parola.",nl:"Hang onder elk woord twee dingen.",sv:"Häng två saker under varje ord.",da:"Hæng to ting under hvert ord.",no:"Heng to ting under hvert ord.",fi:"Ripusta kaksi tavaraa jokaisen sanan alle."},
    missTags: {en:"The tags that flipped open show what those things are for. Try again.",de:"Die aufgeklappten Schildchen zeigen, wozu die Dinge da sind. Versuch es noch einmal.",fr:"Les étiquettes retournées montrent à quoi servent ces choses. Essaie encore.",es:"Las etiquetas que se voltearon dicen para qué sirven esas cosas. Inténtalo otra vez.",pt:"As etiquetas que viraram mostram para que servem essas coisas. Tente de novo.",it:"Le etichette girate dicono a che cosa servono quelle cose. Riprova.",nl:"De omgeklapte labeltjes laten zien waarvoor die dingen zijn. Probeer het nog eens.",sv:"Lapparna som vändes visar vad sakerna är till för. Försök igen.",da:"Mærkerne, der vendte, viser, hvad tingene er til. Prøv igen.",no:"Lappene som snudde seg, viser hva tingene er til. Prøv igjen.",fi:"Kääntyneet laput kertovat, mihin tavarat ovat. Yritä uudelleen."},
    missFeel: {en:"The tags that flipped open tell what those things are like. Try again.",de:"Die aufgeklappten Schildchen zeigen, wie die Dinge sind. Versuch es noch einmal.",fr:"Les étiquettes retournées disent comment sont ces choses. Essaie encore.",es:"Las etiquetas que se voltearon dicen cómo son esas cosas. Inténtalo otra vez.",pt:"As etiquetas que viraram dizem como são essas coisas. Tente de novo.",it:"Le etichette girate dicono come sono quelle cose. Riprova.",nl:"De omgeklapte labeltjes laten zien hoe die dingen zijn. Probeer het nog eens.",sv:"Lapparna som vändes visar hur sakerna är. Försök igen.",da:"Mærkerne, der vendte, viser, hvordan tingene er. Prøv igen.",no:"Lappene som snudde seg, viser hvordan tingene er. Prøv igjen.",fi:"Kääntyneet laput kertovat, millaisia tavarat ovat. Yritä uudelleen."},
    missMore: {en:"Read its tag: where else does it help?",de:"Lies das Schildchen: Wo hilft es noch?",fr:"Lis son étiquette : où sert-elle encore ?",es:"Lee su etiqueta: ¿dónde más sirve?",pt:"Leia a etiqueta: onde mais ela ajuda?",it:"Leggi l’etichetta: dove serve ancora?",nl:"Lees het labeltje: waar helpt het nog meer?",sv:"Läs lappen: var mer hjälper den?",da:"Læs mærket: Hvor hjælper den ellers?",no:"Les lappen: Hvor ellers hjelper den?",fi:"Lue lappu: missä muualla siitä on apua?"},
    missTry: {en:"Try a thing whose tag is still closed.",de:"Probier ein Ding, dessen Schildchen noch zu ist.",fr:"Essaie une chose dont l’étiquette est encore fermée.",es:"Prueba una cosa con la etiqueta todavía cerrada.",pt:"Tente uma coisa com a etiqueta ainda fechada.",it:"Prova una cosa con l’etichetta ancora chiusa.",nl:"Probeer een ding met een labeltje dat nog dicht is.",sv:"Prova en sak vars lapp fortfarande är stängd.",da:"Prøv en ting, hvis mærke stadig er lukket.",no:"Prøv en ting som har lappen sin lukket ennå.",fi:"Kokeile tavaraa, jonka lappu on vielä kiinni."},
    missWhere: {en:"The glowing moments still need it.",de:"Die leuchtenden Momente brauchen es noch.",fr:"Les moments qui brillent en ont encore besoin.",es:"Los momentos que brillan todavía la necesitan.",pt:"Os momentos que brilham ainda precisam dela.",it:"I momenti che brillano ne hanno ancora bisogno.",nl:"De momenten die oplichten, hebben het nog nodig.",sv:"Stunderna som lyser behöver den fortfarande.",da:"Øjeblikkene, der lyser, mangler den stadig.",no:"Øyeblikkene som lyser, trenger den fortsatt.",fi:"Hehkuvat hetket tarvitsevat sitä vielä."},
    aHook: {en:"Moment {n}: {t}",de:"Moment {n}: {t}",fr:"Moment {n} : {t}",es:"Momento {n}: {t}",pt:"Momento {n}: {t}",it:"Momento {n}: {t}",nl:"Moment {n}: {t}",sv:"Stund {n}: {t}",da:"Øjeblik {n}: {t}",no:"Øyeblikk {n}: {t}",fi:"Hetki {n}: {t}"},
    aHookEmpty: {en:"Moment {n}: empty hook",de:"Moment {n}: leerer Haken",fr:"Moment {n} : crochet vide",es:"Momento {n}: gancho vacío",pt:"Momento {n}: gancho vazio",it:"Momento {n}: gancio vuoto",nl:"Moment {n}: lege haak",sv:"Stund {n}: tom krok",da:"Øjeblik {n}: tom krog",no:"Øyeblikk {n}: tom krok",fi:"Hetki {n}: tyhjä koukku"},
    aThing: {en:"In the bag: {t}",de:"In der Tasche: {t}",fr:"Dans le sac : {t}",es:"En la bolsa: {t}",pt:"Na bolsa: {t}",it:"Nella borsa: {t}",nl:"In de tas: {t}",sv:"I väskan: {t}",da:"I tasken: {t}",no:"I sekken: {t}",fi:"Laukussa: {t}"},
  },/*STRINGS-END*/

  defaults: { level: '1', bag: '6', words: 'text' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }] },
    { key: 'bag', type: 'choice', labelKey: 'setBag', options: [{ value: '6', labelKey: 'bag6' }, { value: '8', labelKey: 'bag8' }] },
    { key: 'words', type: 'choice', labelKey: 'setWords', options: [{ value: 'text', labelKey: 'wordsText' }, { value: 'pic', labelKey: 'wordsPic' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null;
    this._timers = []; this._ro = null; this._view = {};
    injectWhatForTagsCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return WhatForTagsCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return WhatForTagsCore.levelOf(this._setting('level')); },
  _bag: function () { return WhatForTagsCore.bagOf(this._setting('bag')); },
  _words: function () { return WhatForTagsCore.wordsOf(this._setting('words')); },
  _key: function () { return this._loc() + '/' + this._level() + '/' + (this._level() === '1' ? this._bag() : 6); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = WhatForTagsCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = WhatForTagsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev, this._bag()); this._prev = P.order; this._order = P.order.slice(); this._plan = P; this._orderForPool = pool; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'whatfortags.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers();
    /* never a round without a plan: an unplanned bag would stand its right things first */
    if (!this._plan || this._plan.order.indexOf(r) < 0 || (this._level() !== '2' && !this._plan.orders[r])) this._plan = WhatForTagsCore.plan(this._loc(), this._level(), Math.random, null, this._bag());
    var P = this._plan;
    this.st = WhatForTagsCore.newState(this._loc(), this._level(), r, { bag: this._bag(), order: P.orders[r], wins: P.wins[r] });
    this._view = { note: '', ok: '', play: false };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth();
  },
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
    var wrap = api.el('div', 'wt-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<p class="wt-note" aria-live="polite"></p><div class="wt-main"></div><div class="wt-foot"></div><p class="wt-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('pointerdown', function (e) { self._pdown(e); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _dims: function () { var W = this._width(), B = WhatForTagsCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, cramp: W < 310, pic: B.wide ? 96 : W < 310 ? 56 : 64 }; },
  _img: function (path, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + path + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.wt-sr'); if (el) el.textContent = s; },
  _list: function (a) {
    var loc = this._loc(), and = { en: 'and', de: 'und', fr: 'et', es: 'y', pt: 'e', it: 'e', nl: 'en', sv: 'och', da: 'og', no: 'og', fi: 'ja' }[loc];
    try { if (typeof Intl !== 'undefined' && Intl.ListFormat) return new Intl.ListFormat(loc === 'no' ? 'nb' : loc, { style: 'long', type: 'conjunction' }).format(a); } catch (e) {}
    return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ' + and + ' ' + a[a.length - 1];
  },
  /* a thing's tag: closed (dots) until it has been tried or has clicked in */
  _tagHtml: function (t, open) {
    var self = this;
    if (!open) return '<span class="wt-tag wt-art is-closed" aria-hidden="true"><i></i><i></i><i></i></span>';
    var words = this.st.rd.lvl === '3' ? t.feel.filter(function (f) { return self.st.rd.windows.some(function (w) { return w.word === f; }); }).map(function (f) { return WhatForTagsCore.DATA[self.st.loc].fw[f]; }) : this._tagWords(t);
    return '<span class="wt-tag wt-art is-open">' + words.map(esc).join('<br>') + '</span>';
  },
  /* level 1: the tag shows what the thing is for TODAY (a use one of the windows needs), else its first use */
  _tagWords: function (t) {
    var rd = this.st.rd; if (rd.lvl !== '1') return t.tag;
    var on = []; t.uses.forEach(function (u, i) { if (rd.windows.some(function (w) { return w.use === u; })) on.push(t.tag[i]); });
    return on.length ? on : t.tag.slice(0, 1);
  },
  _thingFace: function (t, open, D) { return this._img(t.pic, D.pic, 'wt-pic') + '<span class="wt-lab">' + esc(t.label) + '</span>' + this._tagHtml(t, open); },

  _paint_: function () {
    var st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'wt-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + rd.lvl + ' w-' + this._words() + (v.play ? ' is-play' : '');
    var main = this._qs('.wt-main'); main.innerHTML = '';
    if (rd.lvl === '2') main.appendChild(this._el('div', 'wt-solo wt-art', this._thingFace(rd.thing, st.open[0], D)));
    var board = this._el('div', 'wt-board wt-art n-' + rd.windows.length);
    board.insertAdjacentHTML('beforeend', '<span class="wt-sky wt-art"><i class="wt-sun"></i></span>');
    rd.windows.forEach(function (w, k) { board.appendChild(self._window(w, k, D)); });
    main.appendChild(board);
    if (rd.lvl !== '2') main.appendChild(this._bagEl(D));
    var foot = this._qs('.wt-foot'); foot.innerHTML = '';
    var go = this._btn('wt-go', 'check', this._t('go'), '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="#FFE07A" stroke="#FFF" stroke-width="1.6"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" stroke="#FFF" stroke-width="1.8" stroke-linecap="round"/></svg><span>' + esc(this._t('go')) + '</span>');
    go.disabled = st.done; go.addEventListener('click', function () { self._go(); }); foot.appendChild(go);
    var note = this._qs('.wt-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'wt-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'wt-note is-hint'; }
    else { note.textContent = ''; note.className = 'wt-note'; }
  },
  /* a moment window (levels 1, 2) or a feel window (level 3) with its hook(s) */
  _window: function (w, k, D) {
    var st = this.st, rd = st.rd, self = this, lv = rd.lvl;
    var lit = lv === '1' ? st.locked[k] : lv === '2' ? st.locked[k] : (st.locked[k * 2] && st.locked[k * 2 + 1]);
    var win = this._el('div', 'wt-win wt-art' + (lit ? ' is-lit' : '') + (st.glow && lv === '2' && st.glow.indexOf(k) >= 0 ? ' is-glow' : ''));
    var top = this._el('div', 'wt-wtop');
    if (lv === '3') top.appendChild(this._el('span', 'wt-feel wt-art', esc(w.label)));
    else top.insertAdjacentHTML('beforeend', this._img(w.pic, D.pic, 'wt-pic wt-mpic'));
    var hs = lv === '3' ? [k * 2, k * 2 + 1] : [k];
    hs.forEach(function (h) { top.appendChild(self._hook(h, w, D)); });
    win.appendChild(top);
    if (lv !== '3') win.appendChild(this._el('p', 'wt-sent', esc(w.sentence)));
    return win;
  },
  _hook: function (h, w, D) {
    var st = this.st, rd = st.rd, self = this, j = st.hook[h], lab;
    if (rd.lvl === '2') lab = j == null ? this._t('aHookEmpty', { n: h + 1 }) : this._t('aHook', { n: h + 1, t: rd.thing.label });
    else lab = j == null ? this._t('aHookEmpty', { n: h + 1 }) : this._t('aHook', { n: h + 1, t: rd.things[j].label });
    var b = this._btn('wt-hook wt-art' + (j != null ? ' is-full' : '') + (st.locked[h] ? ' is-in' : '') + (st.last === 'empty' && j == null ? ' is-swing' : ''), 'hook-' + h, lab, '');
    b.style.minWidth = b.style.minHeight = (D.pic + (D.tiny ? 4 : 8)) + 'px';
    if (j != null) {
      var t = rd.lvl === '2' ? rd.thing : rd.things[j];
      b.innerHTML = this._img(t.pic, D.pic, 'wt-pic') + (st.locked[h] ? this._tagHtml(t, true) : '');
    } else b.innerHTML = '<svg class="wt-hookmark" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 3v8a4 4 0 1 1-4 4" fill="none" stroke="#B98A55" stroke-width="2.6" stroke-linecap="round"/></svg>';
    b.disabled = st.done || st.locked[h];
    b.addEventListener('click', function () { self._hang(h); });
    return b;
  },
  /* the bag: the things not hanging, each with its tag */
  _bagEl: function (D) {
    var st = this.st, rd = st.rd, self = this, bag = this._el('div', 'wt-bag wt-art'), row = this._el('div', 'wt-things n-' + rd.things.length);
    rd.things.forEach(function (t, j) {
      var h = st.hook.indexOf(j);
      if (h >= 0) { row.appendChild(self._el('span', 'wt-gap', '<span style="width:' + D.pic + 'px;height:' + D.pic + 'px"></span>')); return; }
      var hop = st.glow && rd.lvl !== '2' && st.glow.indexOf(j) >= 0;
      var b = self._btn('wt-thing' + (st.sel === j ? ' is-sel' : '') + (hop ? ' is-hop' : '') + (st.open[j] ? ' is-tried' : ''), 'thing-' + j, self._t('aThing', { t: t.label }), self._thingFace(t, st.open[j], D));
      b.setAttribute('aria-pressed', st.sel === j ? 'true' : 'false'); b.disabled = st.done;
      b.addEventListener('click', function () { self._pick(j); });
      row.appendChild(b);
    });
    bag.appendChild(row);
    return bag;
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.play = false; },
  _pick: function (j) { var r = WhatForTagsCore.pick(this.st, j); if (r === 'no') return; this._moved(); this.api.sound(r === 'home' ? 380 : 560); this._paint(); },
  _hang: function (h, j) {
    var st = this.st, k = st.hook[h];
    /* tapping a hanging thing (with nothing chosen) sends it home */
    if (st.rd.lvl !== '2' && j == null && st.sel == null && k != null) { this._pick(k); return; }
    var r = WhatForTagsCore.hang(st, h, j); if (r === 'no') return; this._moved(); this.api.sound(r === 'on' ? 660 : 380); this._paint();
  },
  _pdown: function (e) {
    var st = this.st; if (!st || st.done || st.rd.lvl === '2' || (e.button != null && e.button !== 0)) return;
    var src = e.target.closest && e.target.closest('[data-k^="thing-"]'); if (!src || src.disabled) return;
    var self = this, j = +src.getAttribute('data-k').split('-')[1], sx = e.clientX, sy = e.clientY, ghost = null, img = src.querySelector('img');
    var move = function (ev) {
      if (!ghost) {
        var dx = Math.abs(ev.clientX - sx), dy = Math.abs(ev.clientY - sy); if (dx + dy < 10) return;
        /* phones: a sideways swipe scrolls the bag row; only a pull up or down lifts the thing */
        if (dx > dy && self._wrap.classList.contains('is-narrow')) { stop(); return; }
        ghost = img.cloneNode(true); ghost.className = 'wt-ghost'; document.body.appendChild(ghost); src.classList.add('is-dragging'); }
      ghost.style.left = (ev.clientX - 36) + 'px'; ghost.style.top = (ev.clientY - 36) + 'px';
    };
    var stop = function () { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', cancel); };
    var cancel = function () { stop(); if (ghost) { ghost.remove(); src.classList.remove('is-dragging'); } };
    var up = function (ev) {
      stop();
      if (!ghost) return; ghost.remove(); src.classList.remove('is-dragging');
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), t = hit && hit.closest && hit.closest('[data-k^="hook-"]');
      if (t) self._hang(+t.getAttribute('data-k').split('-')[1], j);
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', cancel);
  },
  _go: function () {
    var C = WhatForTagsCore, st = this.st, v = this._view, self = this; if (st.done) return;
    this._clearTimers();
    var res = C.go(st); if (res.result === 'done') return;
    if (res.result === 'ok') { this._success(); return; }
    v.ok = ''; v.note = this._t(C.hint(st)); v.play = res.result === 'miss';
    this.api.sound(res.result === 'empty' ? 400 : 240); this._paint(); this.api.announce(v.note);
    this._later(function () { self._view.play = false; }, 1200);
  },
  _success: function () {
    var C = WhatForTagsCore, st = this.st, v = this._view, self = this, msg = C.okLine(st, function (a) { return self._list(a); }, this._t('okDay'));
    v.note = ''; v.ok = msg; v.play = true; if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectWhatForTagsCSS() {
  if (typeof document === 'undefined' || document.getElementById('wt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.wt-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .wt-wrap:focus{outline:none;}'
  + '.wt-main{display:flex;flex-direction:column;align-items:stretch;gap:8px;}'
  /* the day board */
  + '.wt-board{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:20px 8px 8px;border-radius:16px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #E0C99A,0 4px 0 #D9C29A;}'
  + '.wt-board.n-5{grid-template-columns:repeat(5,1fr);} .wt-board.n-3{grid-template-columns:repeat(3,1fr);}'
  + '.wt-sky{position:absolute;left:14px;right:14px;top:6px;height:12px;border-radius:6px;background:linear-gradient(90deg,#FFE9A8,#C9D4F2);} .wt-sun{position:absolute;left:0;top:-4px;width:20px;height:20px;border-radius:50%;background:#F4CF62;box-shadow:0 0 10px rgba(244,207,98,.9);}'
  + '.wt-wrap.is-play .wt-sun{animation:wtSun 1s ease-in-out forwards;} @keyframes wtSun{0%{left:0;}100%{left:calc(100% - 20px);background:#E8EEF8;box-shadow:inset -6px 0 0 #9AA8C7;}}'
  + '.wt-win{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;padding:6px 4px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E7DCC3;}'
  + '.wt-win.is-lit{background:#FFF3C4;box-shadow:inset 0 0 0 3px #F4CF62,0 0 14px rgba(244,207,98,.6);} .wt-win.is-glow{box-shadow:inset 0 0 0 3px #F2784B;}'
  + '.wt-wtop{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.wt-sent{margin:0;font-family:' + B + ';font-weight:800;font-size:16px;line-height:1.2;text-align:center;color:' + INK + ';overflow-wrap:break-word;hyphens:auto;max-width:100%;}'
  + '.wt-wrap.w-pic .wt-sent{display:none;}'
  + '.wt-feel{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:4px 14px;border-radius:22px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;}'
  + '.wt-pic{display:block;object-fit:contain;}'
  + '.wt-hook{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:4px;border:3px dashed #D9C29A;border-radius:12px;background:#FFF;cursor:pointer;font:inherit;color:' + INK + ';}'
  + '.wt-hook.is-full{border-style:solid;border-color:#C98A4B;} .wt-hook.is-in{border-color:#F4CF62;background:#FFF8D6;cursor:default;} .wt-hook:disabled{cursor:default;}'
  + '.wt-hook.is-swing{animation:wtSwing .5s ease-in-out 2;} @keyframes wtSwing{25%{transform:rotate(-6deg);}75%{transform:rotate(6deg);}}'
  + '.wt-hook.is-in .wt-pic{animation:wtIn .3s ease-out;} @keyframes wtIn{0%{transform:translateY(20px);}100%{transform:none;}}'
  /* the bag and its things */
  + '.wt-bag{position:relative;padding:12px 8px 8px;border-radius:14px 14px 28px 28px;background:#E9B77E;box-shadow:inset 0 0 0 3px #A86A2E,0 4px 0 #8C5523;}'
  + '.wt-bag::before{content:"";position:absolute;left:30%;right:30%;top:-16px;height:22px;border:3px solid #A86A2E;border-bottom:0;border-radius:22px 22px 0 0;}'
  + '.wt-things{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));justify-items:stretch;gap:6px;} .wt-things.n-8{grid-template-columns:repeat(4,minmax(0,1fr));max-width:640px;margin:0 auto;}'
  + '.wt-thing{position:relative;min-width:0;display:flex;flex-direction:column;align-items:center;gap:2px;padding:3px 2px 4px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B48E,0 3px 0 #A86A2E;cursor:grab;font:inherit;color:' + INK + ';touch-action:none;}'
  + '.wt-thing.is-sel{background:#FBE9D2;box-shadow:inset 0 0 0 3px #F2784B,0 0 12px rgba(242,120,75,.5);} .wt-thing.is-hop{animation:wtHop .5s ease-out 2;} @keyframes wtHop{50%{transform:translateY(-8px);}}'
  + '.wt-thing.is-dragging{opacity:.35;} .wt-thing:disabled{cursor:default;}'
  + '.wt-gap{display:flex;justify-content:center;} .wt-gap span{display:block;border-radius:12px;border:2px dashed rgba(168,106,46,.5);box-sizing:border-box;margin:4px 6px 6px;}'
  + '.wt-lab{display:block;max-width:100%;overflow-wrap:anywhere;font-family:' + B + ';font-weight:800;font-size:15px;line-height:1.15;text-align:center;overflow-wrap:break-word;hyphens:auto;}'
  + '.wt-tag{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:22px;max-width:100%;padding:2px 5px;box-sizing:border-box;border-radius:4px 10px 10px 4px;font-family:' + B + ';font-weight:800;font-size:13px;line-height:1.15;text-align:center;overflow-wrap:anywhere;hyphens:auto;}'
  + '.wt-tag.is-closed{gap:3px;background:#FFF;box-shadow:inset 0 0 0 2px #D9C29A;} .wt-tag.is-closed i{display:block;width:4px;height:4px;border-radius:50%;background:#C9B48E;}'
  + '.wt-tag.is-open{background:#DDF1EC;box-shadow:inset 0 0 0 2px #2E8C7E;color:#0E4A41;animation:wtFlip .25s ease-out;} @keyframes wtFlip{0%{transform:rotateY(90deg);}100%{transform:none;}}'
  + '.wt-solo{align-self:center;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 18px;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #C9B48E,0 4px 0 #A86A2E;}'
  + '.wt-ghost{position:fixed;z-index:9999;width:72px;height:72px;pointer-events:none;opacity:.9;}'
  /* Go, the note */
  + '.wt-foot{display:flex;justify-content:center;} .wt-go{display:inline-flex;align-items:center;gap:8px;min-width:140px;min-height:56px;padding:8px 26px;border:0;border-radius:28px;background:#E0663A;box-shadow:0 5px 0 #A8431F;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .wt-go:disabled{opacity:.5;cursor:default;}'
  + '.wt-note{order:5;margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .wt-note.is-hint{color:#9A3D1C;} .wt-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.wt-wrap.is-wide .wt-note{order:5;} .wt-wrap.is-wide .wt-main{order:1;} .wt-wrap.is-wide .wt-foot{order:2;}'
  + '.wt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones: windows two by two, each with its picture and hook side by side; the hint at the top */
  + '.wt-wrap.is-narrow{gap:8px;} .wt-wrap.is-narrow .wt-note{order:-1;} .wt-wrap.is-narrow .wt-note:empty{display:none;}'
  + '.wt-wrap.is-narrow .wt-board,.wt-wrap.is-narrow .wt-board.n-5{grid-template-columns:repeat(2,1fr);gap:6px;padding:18px 6px 6px;} .wt-wrap.is-narrow .wt-board.n-3{grid-template-columns:1fr;}'
  + '.wt-wrap.is-narrow .wt-wtop{flex-direction:row;justify-content:center;} .wt-wrap.is-narrow .wt-win{padding:5px 3px;gap:3px;} .wt-wrap.is-narrow .wt-sent{font-size:14px;}'
  + '.wt-wrap.is-narrow .wt-feel{font-size:18px;min-width:96px;} .wt-wrap.is-narrow .wt-hook{padding:2px;}'
  + '.wt-wrap.is-narrow .wt-things{grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;} .wt-wrap.is-narrow .wt-things.n-8{grid-template-columns:repeat(4,minmax(0,1fr));} .wt-wrap.is-narrow .wt-thing{padding:3px 2px 4px;} .wt-wrap.is-narrow .wt-lab{font-size:13px;} .wt-wrap.is-narrow .wt-tag{font-size:12px;min-height:18px;} .wt-wrap.is-narrow .wt-tag.is-closed{display:none;}'
  + '.wt-wrap.is-narrow .wt-go{min-height:48px;min-width:120px;padding:6px 18px;font-size:20px;} .wt-wrap.is-narrow .wt-note{font-size:17px;}'
  + '.wt-wrap.is-cramp .wt-board{padding:16px 5px 5px;gap:5px;} .wt-wrap.is-cramp .wt-win{padding:3px 2px;gap:2px;}'
  + '.wt-wrap.is-cramp .wt-note{font-size:15px;} .wt-wrap.is-cramp .wt-go{min-width:0;gap:5px;padding:6px 11px;font-size:16px;} .wt-wrap.is-cramp .wt-go svg{width:20px;height:20px;}'
  + '.wt-wrap.is-tiny.lv-3 .wt-board.n-3{padding:16px 5px 5px;} .wt-wrap.is-tiny.lv-3 .wt-win{padding:2px 4px;} .wt-wrap.is-tiny .wt-feel{min-width:84px;font-size:17px;padding:2px 10px;}'
  /* every width: the hint and Go share the top row, right above the sky the sun runs along, so the whole day fits one screen */
  + '.wt-wrap{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;column-gap:10px;} .wt-wrap .wt-note{grid-column:1;grid-row:1;text-align:left;align-self:center;max-width:none;margin:0;} .wt-wrap .wt-foot{grid-column:2;grid-row:1;} .wt-wrap .wt-main{grid-column:1 / -1;grid-row:2;}'
  + '.wt-wrap.is-narrow .wt-thing.is-tried .wt-lab{display:none;}'
  /* phones: the bag is one row that scrolls sideways (the cut-off card at the edge says there is more) */
  + '.wt-wrap.is-narrow .wt-things,.wt-wrap.is-narrow .wt-things.n-8{display:flex;flex-wrap:nowrap;justify-content:safe center;overflow-x:auto;overflow-y:hidden;gap:6px;padding:2px 2px 6px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;}'
  + '.wt-wrap.is-narrow .wt-thing{flex:0 0 auto;width:86px;touch-action:pan-x;scroll-snap-align:start;} .wt-wrap.is-tiny .wt-thing{width:78px;}'
  + '.wt-wrap.is-narrow .wt-solo{flex-direction:row;padding:6px 14px;gap:10px;}'
  + '.wt-wrap.is-narrow .wt-hook .wt-tag{display:none;} .wt-wrap.is-narrow .wt-gap{display:none;}'
  + '.wt-wrap.is-narrow.lv-3 .wt-board.n-3{gap:5px;} .wt-wrap.is-narrow.lv-3 .wt-win{padding:4px;}'
  + '.wt-wrap.is-tiny .wt-sent{font-size:13px;} .wt-wrap.is-tiny .wt-bag{padding:10px 4px 6px;}'
  + '.wt-wrap.is-done .wt-bag,.wt-wrap.is-done .wt-foot{display:none;}'
  + '.wt-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.wt-wrap *{animation:none !important;transition:none !important;}}'
  + '.wt-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'wt-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.WhatForTagsActivity = WhatForTagsActivity;
