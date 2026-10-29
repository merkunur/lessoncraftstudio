/* =====================================================================
   snip-tape-activity.js — ACTIVITY #155 of the one-by-one rebuild:
   "Span's Length Gap" → THE SNIP-OUT TAPE (2.MD.A.4; all 11 locales).
   Model: snip-tape-core.js (SnipTapeCore).
   Design: docs/activities-rebuild/designs/155-span-length-gap.md
   ---------------------------------------------------------------------
   The invention: two real things lie on two lanes against a zero wall,
   one tape measure between them. Clip where each thing ends — the coral
   clip for the top thing, the teal clip for the bottom one — and the tape
   between the clips glows: the gap is already a thing you can see. Type how
   many cm longer, Check, and the glowing piece is snipped out of the tape
   into the tray, where it counts itself from zero. A wrong number lies
   beside it as a dashed strip of the child's own length; a clip in the
   wrong place shades what it missed; the second miss puts one dot in every
   centimetre SPACE of the piece. In "loose starts" the things sit away from
   the wall and must be pushed against it first.
   No timer, no score, no words on the apparatus: numerals and cm.
   Test seams: window.SnipTapeActivity.st / ._pool / ._order / ._ensurePool
   / ._start / ._render2 / ._clip / ._move / ._push / ._type / ._back /
   ._check / ._g / .FAST / .OK_MS.
   ===================================================================== */
var SnipTapeActivity = {
  id: 'snip-tape',
  /* the drawn apparatus (the hierarchy gate): the board, the tape, the clips, the pictures */
  apparatusClasses: ['st-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Span's Length Gap","de":"Wie viel länger?","fr":"Combien de cm de plus ?","es":"¿Cuánto más mide?","pt":"Quanto mede a mais?","it":"Quanti centimetri in più?","nl":"Hoeveel langer?","sv":"Hur mycket längre?","da":"Hvor meget længere?","no":"Hvor mye lengre?","fi":"Kuinka paljon pidempi?"},
    instruction: {"en":"Clip where each thing ends on the tape. How much longer is the longer one? Type it, then press Check.","de":"Klemm an, wo jedes Ding endet. Wie viel länger ist das längere? Tipp die Zahl ein und drück auf Prüfen.","fr":"Pince le ruban là où finit chaque objet. De combien de centimètres le plus long dépasse-t-il l’autre ? Tape le nombre, puis touche Vérifier.","es":"Pon una pinza en el metro donde termina cada cosa. ¿Cuánto más mide la más larga? Escribe el número y oprime Revisar.","pt":"Prenda um pregador na fita onde cada coisa termina. Quanto a mais mede a mais comprida? Digite o número e toque em Conferir.","it":"Metti una molletta sul metro dove finisce ogni cosa. Di quanto è più lunga quella più lunga? Scrivi il numero e tocca Controlla.","nl":"Zet een knijper op het meetlint waar elk ding eindigt. Hoeveel langer is het langste? Typ het getal en druk op Controleer.","sv":"Sätt en klämma på måttbandet där varje sak slutar. Hur mycket längre är den långa? Skriv talet och tryck på Kontrollera.","da":"Sæt en klemme på målebåndet, hvor hver ting slutter. Hvor meget længere er den længste? Skriv tallet, og tryk på Tjek.","no":"Sett en klype på målebåndet der hver ting slutter. Hvor mye lengre er den lengste? Skriv tallet, og trykk på Sjekk.","fi":"Kiinnitä kumpikin pyykkipoika mittanauhaan kohtaan, jossa sen esine päättyy. Kuinka paljon pidempi pitkä esine on? Kirjoita luku ja paina Tarkista."},
    taskLine: {"en":"Clip where each thing ends, then type how many cm longer the longer one is.","de":"Klemm an, wo jedes Ding endet, und tipp ein, wie viele cm das längere länger ist.","fr":"Pince là où finit chaque objet, puis tape de combien de cm le plus long dépasse.","es":"Pon una pinza donde termina cada cosa y escribe cuántos cm más mide la más larga.","pt":"Prenda um pregador onde cada coisa termina e digite quantos cm a mais a mais comprida mede.","it":"Metti una molletta dove finisce ogni cosa e scrivi di quanti cm è più lunga quella più lunga.","nl":"Zet een knijper waar elk ding eindigt en typ hoeveel cm het langste langer is.","sv":"Sätt en klämma där varje sak slutar och skriv hur många cm längre den långa är.","da":"Sæt en klemme, hvor hver ting slutter, og skriv, hvor mange cm længere den længste er.","no":"Sett en klype der hver ting slutter, og skriv hvor mange cm lengre den lengste er.","fi":"Kiinnitä pyykkipojat esineiden päihin ja kirjoita, montako cm pidempi pitkä esine on."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    hintClips: {"en":"First put a clip where each thing ends: the orange clip for the top one, the green clip for the bottom one.","de":"Setz zuerst eine Klammer dorthin, wo jedes Ding endet: die orange für das obere, die grüne für das untere.","fr":"Pince d’abord le bout de chaque objet : la pince orange pour celui du haut, la verte pour celui du bas.","es":"Primero pon una pinza al final de cada cosa: la naranja para la de arriba y la verde para la de abajo.","pt":"Primeiro prenda um pregador onde cada coisa termina: o laranja para a de cima e o verde para a de baixo.","it":"Prima metti una molletta alla fine di ogni cosa: quella arancione per la cosa in alto, quella verde per la cosa in basso.","nl":"Zet eerst een knijper aan het eind van elk ding: de oranje voor het bovenste, de groene voor het onderste.","sv":"Sätt först en klämma vid slutet av varje sak: den orange för den övre, den gröna för den nedre.","da":"Sæt først en klemme ved enden af hver ting: den orange til den øverste, den grønne til den nederste.","no":"Sett først en klype ved enden av hver ting: den oransje til den øverste, den grønne til den nederste.","fi":"Kiinnitä ensin pyykkipoika kummankin esineen päähän: oranssi ylempään, vihreä alempaan."},
    hintWall: {"en":"Push each thing against the wall first.","de":"Schieb zuerst jedes Ding an die Wand.","fr":"Pousse d’abord chaque objet contre le mur.","es":"Primero empuja cada cosa hasta la pared.","pt":"Primeiro empurre cada coisa até a parede.","it":"Prima spingi ogni cosa contro il muro.","nl":"Schuif eerst elk ding tegen de muur.","sv":"Skjut först varje sak mot väggen.","da":"Skub først hver ting ind til væggen.","no":"Skyv først hver ting inntil veggen.","fi":"Työnnä ensin kumpikin esine seinää vasten."},
    hintType: {"en":"Now type how much longer.","de":"Tipp jetzt ein, wie viel länger.","fr":"Tape maintenant de combien c’est plus long.","es":"Ahora escribe cuánto más mide.","pt":"Agora digite quanto mede a mais.","it":"Ora scrivi di quanto è più lunga.","nl":"Typ nu hoeveel langer.","sv":"Skriv nu hur mycket längre.","da":"Skriv nu, hvor meget længere.","no":"Skriv nå hvor mye lengre.","fi":"Kirjoita nyt, kuinka paljon pidempi."},
    hintClipA: {"en":"Slide the orange clip to the very end of the top thing.","de":"Schieb die orange Klammer genau ans Ende des oberen Dings.","fr":"Fais glisser la pince orange tout au bout de l’objet du haut.","es":"Desliza la pinza naranja justo hasta el final de la cosa de arriba.","pt":"Arraste o pregador laranja até o finalzinho da coisa de cima.","it":"Fai scorrere la molletta arancione proprio alla fine della cosa in alto.","nl":"Schuif de oranje knijper precies naar het eind van het bovenste ding.","sv":"Skjut den orange klämman ända till slutet av den övre saken.","da":"Skub den orange klemme helt hen til enden af den øverste ting.","no":"Skyv den oransje klypa helt bort til enden av den øverste tingen.","fi":"Liu’uta oranssi pyykkipoika aivan ylemmän esineen päähän."},
    hintClipB: {"en":"Slide the green clip to the very end of the bottom thing.","de":"Schieb die grüne Klammer genau ans Ende des unteren Dings.","fr":"Fais glisser la pince verte tout au bout de l’objet du bas.","es":"Desliza la pinza verde justo hasta el final de la cosa de abajo.","pt":"Arraste o pregador verde até o finalzinho da coisa de baixo.","it":"Fai scorrere la molletta verde proprio alla fine della cosa in basso.","nl":"Schuif de groene knijper precies naar het eind van het onderste ding.","sv":"Skjut den gröna klämman ända till slutet av den nedre saken.","da":"Skub den grønne klemme helt hen til enden af den nederste ting.","no":"Skyv den grønne klypa helt bort til enden av den nederste tingen.","fi":"Liu’uta vihreä pyykkipoika aivan alemman esineen päähän."},
    hintGhost: {"en":"Your number is the dashed strip. Is it as long as the cut-out piece?","de":"Deine Zahl ist der gestrichelte Streifen. Ist er so lang wie das ausgeschnittene Stück?","fr":"Ton nombre, c’est la bande en pointillés. Est-elle aussi longue que le morceau découpé ?","es":"Tu número es la tira de rayitas. ¿Mide lo mismo que el pedazo recortado?","pt":"O seu número é a tira tracejada. Ela é do tamanho do pedaço recortado?","it":"Il tuo numero è la striscia tratteggiata. È lunga come il pezzo ritagliato?","nl":"Jouw getal is de gestippelde strook. Is die even lang als het uitgeknipte stuk?","sv":"Ditt tal är den streckade remsan. Är den lika lång som den urklippta biten?","da":"Dit tal er den stiplede strimmel. Er den lige så lang som det udklippede stykke?","no":"Tallet ditt er den stiplede stripen. Er den like lang som biten som er klippet ut?","fi":"Lukusi on katkoviivainen suikale. Onko se yhtä pitkä kuin leikattu pala?"},
    hintDots: {"en":"Count the spaces on the piece — one dot is one centimeter.","de":"Zähl die Abstände auf dem Stück – ein Punkt ist ein Zentimeter.","fr":"Compte les espaces sur le morceau : un point, c’est un centimètre.","es":"Cuenta los espacios del pedazo: un punto es un centímetro.","pt":"Conte os espaços do pedaço: um ponto é um centímetro.","it":"Conta gli spazi sul pezzo: un puntino è un centimetro.","nl":"Tel de vakjes op het stuk: één stip is één centimeter.","sv":"Räkna mellanrummen på biten – en prick är en centimeter.","da":"Tæl mellemrummene på stykket – en prik er en centimeter.","no":"Tell mellomrommene på biten – én prikk er én centimeter.","fi":"Laske palan välit – yksi piste on yksi senttimetri."},
    okTop: {"en":"The top one is {a} cm, the bottom one is {b} cm: {a} − {b} = {gap}. The top one is {gap} cm longer!","de":"Das obere ist {a} cm lang, das untere {b} cm: {a} − {b} = {gap}. Das obere ist {gap} cm länger!","fr":"Celui du haut mesure {a} cm, celui du bas {b} cm : {a} − {b} = {gap}. Celui du haut est plus long de {gap} cm !","es":"La de arriba mide {a} cm y la de abajo {b} cm: {a} − {b} = {gap}. ¡La de arriba mide {gap} cm más!","pt":"A de cima mede {a} cm e a de baixo, {b} cm: {a} − {b} = {gap}. A de cima mede {gap} cm a mais!","it":"Quella in alto è lunga {a} cm, quella in basso {b} cm: {a} − {b} = {gap}. Quella in alto è più lunga di {gap} cm!","nl":"Het bovenste is {a} cm, het onderste {b} cm: {a} − {b} = {gap}. Het bovenste is {gap} cm langer!","sv":"Den övre är {a} cm, den nedre {b} cm: {a} − {b} = {gap}. Den övre är {gap} cm längre!","da":"Den øverste er {a} cm, den nederste {b} cm: {a} − {b} = {gap}. Den øverste er {gap} cm længere!","no":"Den øverste er {a} cm, den nederste {b} cm: {a} − {b} = {gap}. Den øverste er {gap} cm lengre!","fi":"Ylempi on {a} cm, alempi {b} cm: {a} − {b} = {gap}. Ylempi on {gap} cm pidempi!"},
    okBottom: {"en":"The bottom one is {a} cm, the top one is {b} cm: {a} − {b} = {gap}. The bottom one is {gap} cm longer!","de":"Das untere ist {a} cm lang, das obere {b} cm: {a} − {b} = {gap}. Das untere ist {gap} cm länger!","fr":"Celui du bas mesure {a} cm, celui du haut {b} cm : {a} − {b} = {gap}. Celui du bas est plus long de {gap} cm !","es":"La de abajo mide {a} cm y la de arriba {b} cm: {a} − {b} = {gap}. ¡La de abajo mide {gap} cm más!","pt":"A de baixo mede {a} cm e a de cima, {b} cm: {a} − {b} = {gap}. A de baixo mede {gap} cm a mais!","it":"Quella in basso è lunga {a} cm, quella in alto {b} cm: {a} − {b} = {gap}. Quella in basso è più lunga di {gap} cm!","nl":"Het onderste is {a} cm, het bovenste {b} cm: {a} − {b} = {gap}. Het onderste is {gap} cm langer!","sv":"Den nedre är {a} cm, den övre {b} cm: {a} − {b} = {gap}. Den nedre är {gap} cm längre!","da":"Den nederste er {a} cm, den øverste {b} cm: {a} − {b} = {gap}. Den nederste er {gap} cm længere!","no":"Den nederste er {a} cm, den øverste {b} cm: {a} − {b} = {gap}. Den nederste er {gap} cm lengre!","fi":"Alempi on {a} cm, ylempi {b} cm: {a} − {b} = {gap}. Alempi on {gap} cm pidempi!"},
    setRuler: {"en":"Tape measure","de":"Maßband","fr":"Ruban","es":"Metro","pt":"Fita","it":"Metro","nl":"Meetlint","sv":"Måttband","da":"Målebånd","no":"Målebånd","fi":"Mittanauha"},
    r12: {"en":"0 to 12 cm","de":"0 bis 12 cm","fr":"de 0 à 12 cm","es":"de 0 a 12 cm","pt":"de 0 a 12 cm","it":"da 0 a 12 cm","nl":"0 tot 12 cm","sv":"0 till 12 cm","da":"0 til 12 cm","no":"0 til 12 cm","fi":"0–12 cm"},
    r20: {"en":"0 to 20 cm","de":"0 bis 20 cm","fr":"de 0 à 20 cm","es":"de 0 a 20 cm","pt":"de 0 a 20 cm","it":"da 0 a 20 cm","nl":"0 tot 20 cm","sv":"0 till 20 cm","da":"0 til 20 cm","no":"0 til 20 cm","fi":"0–20 cm"},
    setStarts: {"en":"Starts","de":"Anfang","fr":"Départ","es":"Inicio","pt":"Início","it":"Partenza","nl":"Begin","sv":"Start","da":"Start","no":"Start","fi":"Alku"},
    sLined: {"en":"lined up at the wall","de":"an der Wand","fr":"contre le mur","es":"pegadas a la pared","pt":"encostadas na parede","it":"contro il muro","nl":"tegen de muur","sv":"mot väggen","da":"ved væggen","no":"inntil veggen","fi":"seinää vasten"},
    sLoose: {"en":"loose: push them to the wall","de":"lose: an die Wand schieben","fr":"décalés : pousse-les contre le mur","es":"sueltas: empújalas a la pared","pt":"soltas: empurre até a parede","it":"spostate: spingile contro il muro","nl":"los: schuif ze tegen de muur","sv":"lösa: skjut dem mot väggen","da":"løse: skub dem ind til væggen","no":"løse: skyv dem inntil veggen","fi":"erillään seinästä: työnnä seinää vasten"},
    aClipA: {"en":"orange clip at {n} centimeters","de":"orange Klammer bei {n} Zentimetern","fr":"pince orange à {n} centimètres","es":"pinza naranja en {n} centímetros","pt":"pregador laranja em {n} centímetros","it":"molletta arancione a {n} centimetri","nl":"oranje knijper op {n} centimeter","sv":"orange klämma vid {n} centimeter","da":"orange klemme ved {n} centimeter","no":"oransje klype ved {n} centimeter","fi":"oranssi pyykkipoika kohdassa {n} senttimetriä"},
    aClipB: {"en":"green clip at {n} centimeters","de":"grüne Klammer bei {n} Zentimetern","fr":"pince verte à {n} centimètres","es":"pinza verde en {n} centímetros","pt":"pregador verde em {n} centímetros","it":"molletta verde a {n} centimetri","nl":"groene knijper op {n} centimeter","sv":"grön klämma vid {n} centimeter","da":"grøn klemme ved {n} centimeter","no":"grønn klype ved {n} centimeter","fi":"vihreä pyykkipoika kohdassa {n} senttimetriä"},
    aParkedA: {"en":"orange clip, not on the tape yet","de":"orange Klammer, noch nicht am Maßband","fr":"pince orange, pas encore sur le ruban","es":"pinza naranja, todavía fuera del metro","pt":"pregador laranja, ainda fora da fita","it":"molletta arancione, non ancora sul metro","nl":"oranje knijper, nog niet op het meetlint","sv":"orange klämma, inte på måttbandet än","da":"orange klemme, ikke på målebåndet endnu","no":"oransje klype, ikke på målebåndet ennå","fi":"oranssi pyykkipoika, ei vielä mittanauhassa"},
    aParkedB: {"en":"green clip, not on the tape yet","de":"grüne Klammer, noch nicht am Maßband","fr":"pince verte, pas encore sur le ruban","es":"pinza verde, todavía fuera del metro","pt":"pregador verde, ainda fora da fita","it":"molletta verde, non ancora sul metro","nl":"groene knijper, nog niet op het meetlint","sv":"grön klämma, inte på måttbandet än","da":"grøn klemme, ikke på målebåndet endnu","no":"grønn klype, ikke på målebåndet ennå","fi":"vihreä pyykkipoika, ei vielä mittanauhassa"},
    aTop: {"en":"top thing: tap to push it to the wall","de":"oberes Ding: tippen, um es an die Wand zu schieben","fr":"objet du haut : touche pour le pousser contre le mur","es":"cosa de arriba: toca para empujarla a la pared","pt":"coisa de cima: toque para empurrar até a parede","it":"cosa in alto: tocca per spingerla contro il muro","nl":"bovenste ding: tik om het tegen de muur te schuiven","sv":"övre saken: tryck för att skjuta den mot väggen","da":"øverste ting: tryk for at skubbe den ind til væggen","no":"øverste ting: trykk for å skyve den inntil veggen","fi":"ylempi esine: napauta, niin se työntyy seinää vasten"},
    aBottom: {"en":"bottom thing: tap to push it to the wall","de":"unteres Ding: tippen, um es an die Wand zu schieben","fr":"objet du bas : touche pour le pousser contre le mur","es":"cosa de abajo: toca para empujarla a la pared","pt":"coisa de baixo: toque para empurrar até a parede","it":"cosa in basso: tocca per spingerla contro il muro","nl":"onderste ding: tik om het tegen de muur te schuiven","sv":"nedre saken: tryck för att skjuta den mot väggen","da":"nederste ting: tryk for at skubbe den ind til væggen","no":"nederste ting: trykk for å skyve den inntil veggen","fi":"alempi esine: napauta, niin se työntyy seinää vasten"},
    aBack: {"en":"delete","de":"löschen","fr":"effacer","es":"borrar","pt":"apagar","it":"cancella","nl":"wissen","sv":"radera","da":"slet","no":"slett","fi":"poista"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    aGap: {"en":"The cut-out piece is {n} centimeters long.","de":"Das ausgeschnittene Stück ist {n} Zentimeter lang.","fr":"Le morceau découpé mesure {n} centimètres.","es":"El pedazo recortado mide {n} centímetros.","pt":"O pedaço recortado mede {n} centímetros.","it":"Il pezzo ritagliato è lungo {n} centimetri.","nl":"Het uitgeknipte stuk is {n} centimeter lang.","sv":"Den urklippta biten är {n} centimeter lång.","da":"Det udklippede stykke er {n} centimeter langt.","no":"Biten som er klippet ut, er {n} centimeter lang.","fi":"Leikattu pala on {n} senttimetriä pitkä."}
  },/*STRINGS-END*/
  defaults: { ruler: '12', starts: 'lined' },
  settings: [
    { key: 'ruler', type: 'choice', labelKey: 'setRuler', options: [{ value: '12', labelKey: 'r12' }, { value: '20', labelKey: 'r20' }] },
    { key: 'starts', type: 'choice', labelKey: 'setStarts', options: [{ value: 'lined', labelKey: 'sLined' }, { value: 'loose', labelKey: 'sLoose' }] }
  ],
  OK_MS: 500, FAST: false,
  /* the themes the pictures come from (read from the core, so they can never drift) */
  THEMES: (function () { var P = (typeof SnipTapeCore !== 'undefined' ? SnipTapeCore : window.SnipTapeCore).PICS, out = []; for (var k in P) if (out.indexOf(P[k].theme) < 0) out.push(P[k].theme); return out; })(),
  COLORS: { a: '#F2784B', b: '#2E9C88' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false; this._drag = null; this._skipClick = 0;
    injectSnipTapeCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.loose !== (this._starts() === 'loose')) this._start(this.st.k);
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return SnipTapeCore.levelOf(this._setting('ruler')); },
  _starts: function () { return SnipTapeCore.startsOf(this._setting('starts')); },
  _key: function () { return this._level(); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SnipTapeCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SnipTapeCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'snip-tape.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = SnipTapeCore.newState(this._level(), k, this._starts());
    this._view = { note: '', soft: false, win: false, count: 0, shake: null };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
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
    var wrap = api.el('div', 'st-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="st-board" data-qa="board"></div><p class="st-note" data-qa="note" aria-live="polite"></p><div class="st-pad"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
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
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  /* the geometry of the board for this width and this round: one cm = u px everywhere */
  _geometry: function (W) {
    var C = SnipTapeCore, r = this.st.round, wide = W >= 560, cramp = W < 310;
    var padX = 4, wall = wide ? 14 : 10, park = wide ? 50 : 46;
    var trayH = wide ? 58 : cramp ? 34 : 42, railH = wide ? 26 : 24, tapeH = wide ? 48 : 40, laneMax = wide ? 150 : cramp ? 60 : 88;
    var cap = r.max === 12 ? 46 : 28.6;
    var uW = (W - 2 * padX - wall - park) / (r.max + 1);
    var need = Math.max(C.shortSide(r.a.obj, r.a.len, 1), C.shortSide(r.b.obj, r.b.len, 1));
    var u = Math.min(cap, uW, laneMax / need);
    var laneH = Math.ceil(need * u) + 12;
    padX = Math.max(4, (W - wall - park - (r.max + 1) * u) / 2);   /* centre the apparatus */
    var x0 = padX + wall, y = 4, g = { W: W, wide: wide, cramp: cramp, u: u, x0: x0, wall: wall, padX: padX, park: park, laneH: laneH, railH: railH, tapeH: tapeH };
    g.trayY = y; g.trayH = trayH; y += trayH + 6;
    g.laneAY = y; y += laneH;
    g.railAY = y; y += railH;
    g.tapeY = y; y += tapeH;
    g.railBY = y; y += railH;
    g.laneBY = y; y += laneH;
    g.H = y + 4;
    g.x = function (cm) { return x0 + cm * u; };
    g.tapeEnd = x0 + (r.max + 1) * u;
    return g;
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W);
    this._wrap.className = 'st-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (st.loose ? ' is-loose' : '');
    this._paintBoard();
    this._paintPad();
    var note = this._qs('.st-note');
    if (v.note) { note.textContent = v.note; note.className = 'st-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'st-note'; }
    this._setPrompt();
  },

  /* ---------- the board: tray, lane A, the tape and its clips, lane B ---------- */
  _paintBoard: function () {
    var st = this.st, r = st.round, v = this._view, g = this._g, C = SnipTapeCore, self = this, col = this.COLORS;
    var board = this._qs('.st-board'); board.innerHTML = ''; board.style.width = g.W + 'px'; board.style.height = g.H + 'px';
    var u = g.u, X = g.x, o = '', snipped = !!(st.done || (st.verdict && st.verdict.kind === 'number'));
    var lo = st.clipA !== null && st.clipB !== null ? Math.min(st.clipA, st.clipB) : null, hi = lo !== null ? Math.max(st.clipA, st.clipB) : null;
    o += '<defs><pattern id="st-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="rgba(255,236,120,.55)"/><path d="M0 0V8" stroke="rgba(214,160,20,.55)" stroke-width="3"/></pattern></defs>';
    /* the gap tray, with its own zero */
    o += '<rect class="st-tray" x="' + (g.x0 - 2) + '" y="' + g.trayY + '" width="' + (g.tapeEnd - g.x0 + 4) + '" height="' + g.trayH + '" rx="10"/>';
    o += '<path class="st-tick0" d="M' + g.x0 + ' ' + (g.trayY + 4) + 'V' + (g.trayY + g.trayH - 4) + '"/>';
    /* the lanes and the zero wall */
    [['a', g.laneAY], ['b', g.laneBY]].forEach(function (L) {
      o += '<rect class="st-lane" x="' + g.x0 + '" y="' + L[1] + '" width="' + (g.tapeEnd - g.x0) + '" height="' + g.laneH + '"/>';
      o += '<rect class="st-stripe" x="' + g.x0 + '" y="' + (L[1] + 4) + '" width="5" height="' + (g.laneH - 8) + '" fill="' + col[L[0]] + '"/>';
    });
    o += '<path class="st-shelf" d="M' + g.x0 + ' ' + (g.laneAY + g.laneH) + 'H' + g.tapeEnd + 'M' + g.x0 + ' ' + (g.laneBY + g.laneH) + 'H' + g.tapeEnd + '"/>';
    o += '<rect class="st-wall" x="' + g.padX + '" y="' + g.laneAY + '" width="' + g.wall + '" height="' + (g.laneBY + g.laneH - g.laneAY) + '" rx="3"/>';
    /* the tape: 0 … max, one blank centimetre, then "cm" */
    o += '<rect class="st-tape" x="' + g.x0 + '" y="' + g.tapeY + '" width="' + (g.tapeEnd - g.x0) + '" height="' + g.tapeH + '" rx="4"/>';
    if (lo !== null && hi > lo && !snipped) o += '<rect class="st-glow" data-glow="1" x="' + X(lo) + '" y="' + (g.tapeY + 1) + '" width="' + (hi - lo) * u + '" height="' + (g.tapeH - 2) + '" fill="url(#st-hatch)"/>';
    if (snipped && lo !== null && hi > lo) {
      /* the hole the snipped piece left, with zig-zag cuts at both clips */
      o += '<rect class="st-hole" data-hole="1" x="' + X(lo) + '" y="' + (g.tapeY + 1) + '" width="' + (hi - lo) * u + '" height="' + (g.tapeH - 2) + '"/>';
      [lo, hi].forEach(function (c) { o += '<path class="st-cut" d="' + self._zig(X(c), g.tapeY, g.tapeY + g.tapeH) + '"/>'; });
    }
    var every = u >= 24 ? 1 : u >= 10 ? 2 : 5, small = u < 30 ? " is-small" : "";
    for (var c = 0; c <= r.max + 1; c++) {
      if (snipped && lo !== null && c > lo && c < hi) continue;
      var big = c % 5 === 0, tl = c % 10 === 0 ? g.tapeH * 0.5 : big ? g.tapeH * 0.4 : g.tapeH * 0.26;
      if (c <= r.max) o += '<path class="st-tick" d="M' + X(c).toFixed(1) + ' ' + g.tapeY + 'v' + tl.toFixed(1) + '"/>';
      if (c <= r.max && c % every === 0) o += '<text class="st-num' + small + '" x="' + X(c).toFixed(1) + '" y="' + (g.tapeY + g.tapeH - 6) + '" text-anchor="middle">' + c + '</text>';
    }
    /* the unit is content: in the tape's last blank centimetre when there is room, else just above the tape's end */
    if (u >= 34) o += '<text class="st-unit" x="' + ((X(r.max) + g.tapeEnd) / 2 + 2).toFixed(1) + '" y="' + (g.tapeY + g.tapeH - 6) + '" text-anchor="middle">cm</text>';
    else o += '<text class="st-unit" x="' + g.tapeEnd.toFixed(1) + '" y="' + (g.tapeY - 6) + '" text-anchor="end">cm</text>';
    /* plumb lines: from each placed clip through its own lane */
    if (st.clipA !== null) o += '<path class="st-plumb" data-plumb="a" stroke="' + col.a + '" d="M' + X(st.clipA).toFixed(1) + ' ' + g.railAY + 'V' + g.laneAY + '"/>';
    if (st.clipB !== null) o += '<path class="st-plumb" data-plumb="b" stroke="' + col.b + '" d="M' + X(st.clipB).toFixed(1) + ' ' + (g.railBY + g.railH) + 'V' + (g.laneBY + g.laneH) + '"/>';
    /* a clip in the wrong place: the real end gets a notch, the part the clip missed is shaded in its colour */
    var vk = st.verdict && st.verdict.kind;
    if (vk === 'clipA' || vk === 'clipB') {
      var w = vk === 'clipA' ? 'a' : 'b', clip = w === 'a' ? st.clipA : st.clipB, end = C.endOf(st, w), ly = w === 'a' ? g.laneAY : g.laneBY;
      o += '<rect class="st-miss" data-missed="' + w + '" x="' + X(Math.min(clip, end)) + '" y="' + (ly + 3) + '" width="' + Math.abs(end - clip) * u + '" height="' + (g.laneH - 6) + '" fill="' + col[w] + '"/>';
      o += '<path class="st-notch" data-notch="' + w + '" d="M' + X(end) + ' ' + (ly + 2) + 'V' + (ly + g.laneH - 2) + '"/>';
    }
    /* the tray: the snipped piece from the tray's zero, the child's number as a dashed strip, the dots, the count */
    var ty = g.trayY + 8, th = g.trayH - 16, trayEnd = g.tapeEnd;
    if (snipped) {
      var pw = r.gap * u, py = ty + th * 0.18, ph = th * 0.64;
      o += '<rect class="st-piece" data-piece="' + r.gap + '" x="' + g.x0 + '" y="' + py + '" width="' + pw + '" height="' + ph + '" rx="3"/>';
      for (var i = 0; i <= r.gap; i++) o += '<path class="st-tick" d="M' + X(i).toFixed(1) + ' ' + py + 'v' + (ph * (i % 5 === 0 ? 0.45 : 0.28)).toFixed(1) + '"/>';
      if (st.done) for (var n = 0; n <= Math.min(r.gap, v.count); n++) if (n % every === 0 || n === r.gap) o += '<text class="st-num st-pnum' + small + '" x="' + X(n).toFixed(1) + '" y="' + (py + ph - 3).toFixed(1) + '" text-anchor="middle">' + n + '</text>';
      if (st.verdict && st.verdict.kind === 'number') {
        var gl = st.verdict.typed * u, room = trayEnd - g.x0, gy = ty + th - 4;
        if (gl <= room) o += '<path class="st-ghost" data-ghost="' + st.verdict.typed + '" d="M' + g.x0 + ' ' + gy + 'H' + (g.x0 + gl).toFixed(1) + '"/>';
        else o += '<path class="st-ghost" data-ghost="' + st.verdict.typed + '" data-buckled="1" d="M' + g.x0 + ' ' + gy + 'H' + (trayEnd - 12).toFixed(1) + self._buckle(trayEnd - 12, gy, gl - room) + '"/>';
        o += '<path class="st-ghostend" d="M' + Math.min(g.x0 + gl, trayEnd).toFixed(1) + ' ' + (gy - 7) + 'v14"/>';
        if (st.help) for (var d = 0; d < r.gap; d++) o += '<circle class="st-dot" data-dot="' + d + '" cx="' + (g.x0 + (d + 0.5) * u).toFixed(1) + '" cy="' + (py + ph * 0.78).toFixed(1) + '" r="' + Math.max(3, Math.min(6, u * 0.16)).toFixed(1) + '"/>';
      }
    }
    /* the readout: the typed number, at the tray's right end */
    var rw = g.wide ? 108 : 86;
    o += '<rect class="st-readbox' + (st.typed == null ? ' is-empty' : '') + '" x="' + (trayEnd - rw) + '" y="' + (g.trayY + 6) + '" width="' + rw + '" height="' + (g.trayH - 12) + '" rx="8"/>';
    o += '<text class="st-read" data-read="1" x="' + (trayEnd - rw / 2) + '" y="' + (g.trayY + g.trayH / 2 + (g.wide ? 8 : 6)) + '" text-anchor="middle">' + (st.typed == null ? '? cm' : st.typed + ' cm') + '</text>';
    /* success: the longer thing's overhang past the shorter one's end glows — as long as the piece */
    if (st.done) {
      var L = r.longer, S = L === 'a' ? 'b' : 'a', oy = L === 'a' ? g.laneAY : g.laneBY;
      o += '<rect class="st-over" data-over="' + r.gap + '" x="' + X(r[S].len) + '" y="' + (oy + 3) + '" width="' + r.gap * u + '" height="' + (g.laneH - 6) + '"/>';
    }
    board.insertAdjacentHTML('beforeend', '<svg class="st-art st-svg" width="' + g.W + '" height="' + g.H + '" viewBox="0 0 ' + g.W + ' ' + g.H + '" aria-hidden="true">' + o + '</svg>');
    /* the things: library pictures, their ink exactly len × u long, left edge on their start */
    ['a', 'b'].forEach(function (w) { self._thing(board, w); });
    /* the tape is tappable: upper half moves the coral clip, lower half the teal one */
    var hit = document.createElement('div'); hit.className = 'st-tapehit'; hit.setAttribute('data-k', 'tape');
    hit.style.cssText = 'left:' + g.x0 + 'px;top:' + g.railAY + 'px;width:' + (g.tapeEnd - g.x0) + 'px;height:' + (2 * g.railH + g.tapeH) + 'px;';
    hit.addEventListener('pointerdown', function (e) { if (e.button) return; e.preventDefault(); self._tapTape(e); });
    board.appendChild(hit);
    ['a', 'b'].forEach(function (w) { self._clipBtn(board, w); });
  },
  _zig: function (x, y0, y1) { var d = 'M' + x + ' ' + y0, n = 6, h = (y1 - y0) / n; for (var i = 1; i <= n; i++) d += 'L' + (x + (i % 2 ? 4 : -4)) + ' ' + (y0 + i * h).toFixed(1); return d; },
  _buckle: function (x, y, extra) { var d = '', n = Math.max(2, Math.min(8, Math.round(extra / 10))), step = 10 / n; for (var i = 1; i <= n; i++) d += 'L' + (x + i * step).toFixed(1) + ' ' + (y - (i % 2 ? 10 : 2)); return d; },
  _thing: function (board, w) {
    var st = this.st, r = st.round, g = this._g, t = r[w], p = SnipTapeCore.PICS[t.obj], th = this._themes[p.theme], self = this;
    var start = w === 'a' ? st.startA : st.startB, len = t.len * g.u, S = len / (p.r - p.l), hgt = (p.b - p.t) * S;
    var bx = g.x(start), by = w === 'a' ? g.laneAY + g.laneH - 4 - hgt : g.laneBY + 4;
    var box = st.loose && !st.done ? this._btn('st-thing', w === 'a' ? 'thingA' : 'thingB', this._t(w === 'a' ? 'aTop' : 'aBottom')) : document.createElement('div');
    if (!(st.loose && !st.done)) box.className = 'st-thing';
    box.classList.add('st-art'); box.setAttribute('data-thing', w);
    if (this._view.shake === w) box.classList.add('is-shake');
    box.style.cssText = 'left:' + bx.toFixed(2) + 'px;top:' + by.toFixed(2) + 'px;width:' + len.toFixed(2) + 'px;height:' + hgt.toFixed(2) + 'px;';
    if (th && typeof LCSPictures !== 'undefined') {
      var im = LCSPictures.img(th, t.obj, this._loc(), {}), cx = -p.l * S, cy = -p.t * S;
      im.className = 'st-pic'; im.setAttribute('data-pic', t.obj); im.setAttribute('data-qa-skip', ''); im.alt = '';
      im.style.cssText = 'left:' + (cx - S / 2).toFixed(2) + 'px;top:' + (cy - S / 2).toFixed(2) + 'px;width:' + S.toFixed(2) + 'px;height:' + S.toFixed(2) + 'px;transform:rotate(' + p.ang + 'deg);';
      box.appendChild(im);
    }
    if (box.tagName === 'BUTTON') {
      box.addEventListener('pointerdown', function (e) { if (e.button) return; e.preventDefault(); self._dragThing(e, w); });
      box.addEventListener('click', function () { if (Date.now() - self._skipClick < 500) return; self._push(w); });
    }
    board.appendChild(box);
  },
  _clipBtn: function (board, w) {
    var st = this.st, g = this._g, self = this, cm = w === 'a' ? st.clipA : st.clipB, parked = cm === null;
    var label = parked ? this._t(w === 'a' ? 'aParkedA' : 'aParkedB') : this._t(w === 'a' ? 'aClipA' : 'aClipB', { n: cm });
    var b = this._btn('st-clip st-clip-' + w + (parked ? ' is-parked' : ''), w === 'a' ? 'clipA' : 'clipB', label);
    b.setAttribute('role', 'slider'); b.setAttribute('aria-valuemin', '0'); b.setAttribute('aria-valuemax', String(st.round.max + 1));
    if (!parked) b.setAttribute('aria-valuenow', String(cm));
    var cx = parked ? g.tapeEnd + g.park / 2 : g.x(cm), top = w === 'a' ? g.railAY : g.tapeY + g.tapeH / 2, h = g.railH + g.tapeH / 2;
    b.style.cssText = 'left:' + (cx - 22).toFixed(1) + 'px;top:' + top.toFixed(1) + 'px;width:44px;height:' + h.toFixed(1) + 'px;';
    var c = this.COLORS[w], hh = g.railH - 4;
    b.innerHTML = w === 'a'
      ? '<svg class="st-art" viewBox="0 0 44 ' + h + '" width="44" height="' + h + '" aria-hidden="true"><rect x="13" y="2" width="18" height="' + hh + '" rx="5" fill="' + c + '" stroke="#2F2A3B" stroke-width="2"/><path d="M22 ' + (hh + 2) + 'V' + (h - 1) + '" stroke="#2F2A3B" stroke-width="3" stroke-linecap="round"/></svg>'
      : '<svg class="st-art" viewBox="0 0 44 ' + h + '" width="44" height="' + h + '" aria-hidden="true"><path d="M22 1V' + (h - hh - 2) + '" stroke="#2F2A3B" stroke-width="3" stroke-linecap="round"/><rect x="13" y="' + (h - hh - 2) + '" width="18" height="' + hh + '" rx="5" fill="' + c + '" stroke="#2F2A3B" stroke-width="2"/></svg>';
    b.addEventListener('pointerdown', function (e) { if (e.button) return; e.preventDefault(); self._dragClip(e, w); });
    b.addEventListener('click', function () { if (Date.now() - self._skipClick < 500) return; if ((w === 'a' ? st.clipA : st.clipB) === null) self._clip(w, st.round.max + 1); });
    b.addEventListener('keydown', function (e) {
      var k = e.key, cur = w === 'a' ? st.clipA : st.clipB, step = e.shiftKey ? 5 : 1;
      if (k === 'ArrowRight' || k === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); self._clip(w, cur === null ? 0 : cur + step); }
      else if (k === 'ArrowLeft' || k === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); self._clip(w, cur === null ? st.round.max + 1 : cur - step); }
    });
    board.appendChild(b);
  },

  /* ---------- the keypad: digits, delete, Check ---------- */
  _paintPad: function () {
    var st = this.st, self = this, el = this._qs('.st-pad'); el.innerHTML = '';
    el.className = 'st-pad';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].forEach(function (d) {
      var b = self._btn('st-key', 'key-' + d, d, d); b.disabled = st.done;
      b.addEventListener('click', function () { self._type(d); }); el.appendChild(b);
    });
    var bk = this._btn('st-key st-back', 'back', this._t('aBack'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11v12H9l-6-6z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 9.5l5 5M17 9.5l-5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>');
    bk.disabled = st.done || st.typed == null; bk.addEventListener('click', function () { self._back(); }); el.appendChild(bk);
    var c = this._btn('st-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done; c.addEventListener('click', function () { self._check(); }); el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _after: function () { this._view.note = ''; this._view.shake = null; this._paint(); },
  _clip: function (w, cm) { if (!SnipTapeCore.placeClip(this.st, w, cm)) return false; this.api.sound(w === 'a' ? 620 : 520); this._after(); return true; },
  _move: function (w, cm) { if (!SnipTapeCore.moveThing(this.st, w, cm)) return false; this._after(); return true; },
  _push: function (w) { var ok = SnipTapeCore.pushToWall(this.st, w); if (ok) { this.api.sound(180); this._after(); } return ok; },
  _type: function (d) { if (!SnipTapeCore.typeDigit(this.st, d)) return false; this.api.sound(440); this._after(); return true; },
  _back: function () { if (!SnipTapeCore.backspace(this.st)) return false; this._after(); return true; },
  _cmAt: function (clientX) { var b = this._qs('.st-board').getBoundingClientRect(); return (clientX - b.left - this._g.x0) / this._g.u; },
  _tapTape: function (e) {
    var b = this._qs('.st-board').getBoundingClientRect(), g = this._g, y = e.clientY - b.top;
    this._clip(y < g.tapeY + g.tapeH / 2 ? 'a' : 'b', Math.round(this._cmAt(e.clientX)));
  },
  _dragClip: function (e, w) {
    var self = this, sx = e.clientX, moved = false;
    this._endDrag();
    var mv = function (ev) { if (!moved && Math.abs(ev.clientX - sx) < 6) return; moved = true; ev.preventDefault(); self._clip(w, Math.round(self._cmAt(ev.clientX))); };
    var up = function () { self._endDrag(); if (moved) { self._skipClick = Date.now(); return; } self._skipClick = Date.now(); var st = self.st; if ((w === 'a' ? st.clipA : st.clipB) === null) self._clip(w, st.round.max + 1); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _dragThing: function (e, w) {
    var self = this, sx = e.clientX, moved = false, s0 = w === 'a' ? this.st.startA : this.st.startB;
    this._endDrag();
    var mv = function (ev) { var dx = ev.clientX - sx; if (!moved && Math.abs(dx) < 6) return; moved = true; ev.preventDefault(); var to = s0 + Math.round(dx / self._g.u); if (self._move(w, to) && to <= 0) self.api.sound(160); };
    var up = function () { self._endDrag(); self._skipClick = Date.now(); if (!moved) self._push(w); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _keyboard: function (e) {
    var k = e.key;
    if (/^[0-9]$/.test(k)) { e.preventDefault(); this._type(k); }
    else if (k === 'Backspace') { e.preventDefault(); this._back(); }
    else if (k === 'Enter' && (e.target === this._wrap || /^key-|^back$/.test(e.target.getAttribute('data-k') || ''))) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = SnipTapeCore; if (st.done) return;
    var r = C.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; v.shake = r.which || null; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (r.result === 'ok') { this._success(); return; }
    v.soft = false; v.note = this._t(C.hint(st)); v.shake = null;
    this._paint();
    this.api.announce(v.note);
    this.api.sound(240);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = SnipTapeCore, self = this;
    var msg = this._t(C.okKey(r), C.okArgs(r));
    v.note = ''; v.win = true; v.count = this.FAST ? r.gap : 0;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg + ' ' + this._t('aGap', { n: r.gap }));
    this.api.sound(988);
    /* the piece counts itself from 0, one soft pop per centimetre */
    var tick = function () { if (!self.st || self.st !== st || v.count >= r.gap) return; v.count++; self.api.sound(500 + 30 * v.count); self._paint(); self._later(tick, 120); };
    if (!this.FAST) this._later(tick, 120);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectSnipTapeCSS() {
  if (typeof document === 'undefined' || document.getElementById('st-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.st-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .st-wrap:focus{outline:none;}'
  + '.st-board{position:relative;flex:none;touch-action:none;}'
  + '.st-svg{position:absolute;left:0;top:0;pointer-events:none;}'
  + '.st-tray{fill:#F3EBDD;stroke:#CDBFA4;stroke-width:2;} .st-tick0{stroke:#B08550;stroke-width:3;stroke-linecap:round;}'
  + '.st-lane{fill:#FBF3E4;} .st-shelf{stroke:#146B5E;stroke-width:2;} .st-wall{fill:#C9A86B;stroke:' + INK + ';stroke-width:3;}'
  + '.st-tape{fill:#F2C14E;stroke:' + INK + ';stroke-width:2;} .st-tick{stroke:' + INK + ';stroke-width:1.4;} .st-num{font-family:' + H + ';font-weight:800;font-size:18px;fill:' + INK + ';paint-order:stroke;stroke:#F2C14E;stroke-width:4px;stroke-linejoin:round;} .st-num.is-small{font-size:14px;} .st-wrap.is-narrow .st-num{font-size:13px;} .st-unit{font-family:' + H + ';font-weight:800;font-size:15px;fill:' + INK + ';}'
  + '.st-glow{stroke:#D6A014;stroke-width:2;} .st-hole{fill:#FFFDF6;stroke:none;} .st-cut{fill:none;stroke:' + INK + ';stroke-width:2;}'
  + '.st-plumb{stroke-width:2.5;stroke-dasharray:5 4;fill:none;}'
  + '.st-miss{opacity:.35;} .st-notch{stroke:' + INK + ';stroke-width:3;stroke-dasharray:3 3;}'
  + '.st-piece{fill:#F2C14E;stroke:' + INK + ';stroke-width:2;} .st-pnum{font-size:16px;} .st-wrap.is-narrow .st-pnum{font-size:12px;}'
  + '.st-ghost{fill:none;stroke:#0F5247;stroke-width:4;stroke-dasharray:7 5;stroke-linecap:round;} .st-ghostend{stroke:#0F5247;stroke-width:3;}'
  + '.st-dot{fill:#C4522F;} .st-wrap:not(.is-fast) .st-dot{animation:stDot .5s ease-out both;}'
  + '.st-over{fill:rgba(255,226,90,.55);stroke:#D6A014;stroke-width:2;stroke-dasharray:6 4;}'
  + '.st-readbox{fill:#FFFDF6;stroke:#146B5E;stroke-width:2.5;} .st-readbox.is-empty{stroke:#CDBFA4;stroke-dasharray:5 4;} .st-read{font-family:' + H + ';font-weight:800;font-size:26px;fill:' + INK + ';} .st-wrap.is-narrow .st-read{font-size:20px;}'
  + '.st-thing{position:absolute;display:block;padding:0;margin:0;border:0;background:none;overflow:hidden;cursor:default;} button.st-thing{cursor:grab;} button.st-thing:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.st-thing.is-shake{animation:stShake .4s ease-in-out 2;} .st-pic{position:absolute;display:block;object-fit:contain;pointer-events:none;transform-origin:50% 50%;}'
  + '.st-tapehit{position:absolute;cursor:pointer;}'
  + '.st-clip{position:absolute;padding:0;margin:0;border:0;background:none;cursor:grab;touch-action:none;z-index:2;} .st-clip svg{display:block;} .st-clip:focus-visible{outline:3px solid #146B5E;outline-offset:1px;border-radius:8px;}'
  + '.st-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .st-wrap.is-narrow .st-note{font-size:16px;line-height:1.25;} .st-wrap.is-cramp .st-note{font-size:15px;line-height:1.15;} .st-wrap.is-cramp{gap:6px;} .st-note.is-hint{color:#9A3412;}'
  + '.st-pad{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;max-width:100%;}'
  + '.st-key{width:46px;height:50px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;display:flex;align-items:center;justify-content:center;} .st-key svg{width:24px;height:24px;} .st-key:disabled{opacity:.45;cursor:default;}'
  + '.st-go{height:50px;padding:0 16px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .st-go svg{width:22px;height:22px;} .st-go:disabled{opacity:.45;cursor:default;}'
  + '.st-wrap.is-narrow .st-pad{display:grid;grid-template-columns:repeat(6,minmax(44px,1fr));width:100%;gap:5px;} .st-wrap.is-narrow .st-key{width:auto;height:44px;font-size:21px;} .st-wrap.is-narrow .st-go{height:44px;justify-content:center;padding:0;} .st-wrap.is-narrow .st-go span{display:none;}'
  + '.st-wrap.is-done .st-pad{display:none;} .st-wrap.is-done .st-note:empty{display:none;}'
  + '@keyframes stShake{0%,100%{transform:translateX(0);}30%{transform:translateX(-7px);}70%{transform:translateX(4px);}}'
  + '@keyframes stDot{from{opacity:0;transform:scale(.3);}to{opacity:1;transform:scale(1);}}'
  + '.st-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'st-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.SnipTapeActivity = SnipTapeActivity;
