/* =====================================================================
   verb-gates-activity.js — ACTIVITY #123 of the one-by-one rebuild:
   "Vera's Verb Match" → THE VERB GATES (L.1.1.c; all 11 locales).
   Model: verb-gates-core.js (VerbGatesCore).
   Design: docs/activities-rebuild/designs/123-vera-verb-match.md
   ---------------------------------------------------------------------
   The sentence lies on a strip with a gap. Below it, a path: the
   subject's house (its sign reads the subject), a gateway in the hedge,
   and the garden beyond. Every verb is a gate on the rack: the brass
   TURNSTILE lets exactly one through, the wooden DOUBLE GATE opens only
   when two or more push, the round STAR DOOR spins only for the star
   that means I (sv/da/no: the adjective's three forms; the t-turnstile
   turns only for an ett/et-word). Tap a gate to hang it in the gateway
   (tap it there to take it down). Check sends the crowd out of the
   house: the right gate lets everyone into the garden; a wrong one
   leaves a crowd sitting behind the turnstile, one alone waiting at the
   double gate, the star bouncing off. Tap the house any time to send
   them out without Check. No timer, no score. Test seams:
   window.VerbGatesActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / ._hang / ._send / .FAST / .OK_MS.
   ===================================================================== */
var VerbGatesActivity = {
  id: 'verb-gates',
  /* the drawn apparatus (the hierarchy gate): the gates, the hedge, the house, the path, the star, the flowers */
  apparatusClasses: ['vg-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Vera's Verb Match",de:"Veras Verb-Werkstatt",fr:"Vera et l’accord du verbe",es:"Vera y la concordancia del verbo",pt:"Vera e a concordância verbal",it:"Vera e l’accordo del verbo",nl:"Vera's werkwoordwerkplaats",sv:"Tuvas ordäng",da:"Veras ordlåger",no:"Veras ordgrinder",fi:"Veran verbiportit"},
    instruction: {en:"Hang the gate that lets everyone through. Read who is coming first!",de:"Häng das Tor ein, durch das alle kommen. Lies zuerst, wer kommt!",fr:"Accroche la porte qui laisse passer tout le monde. Lis d’abord qui arrive !",es:"Cuelga la puerta que deja pasar a todos. ¡Primero lee quién viene!",pt:"Pendure o portão que deixa todo mundo passar. Primeiro leia quem vem!",it:"Appendi il cancello che fa passare tutti. Prima leggi chi arriva!",nl:"Hang het hek op waar iedereen door kan. Lees eerst wie er komt!",sv:"Häng upp grinden som släpper igenom alla. Läs först vem som kommer!",da:"Hæng den låge op, som lukker alle igennem. Læs først, hvem der kommer!",no:"Heng opp grinda som slipper alle gjennom. Les først hvem som kommer!",fi:"Ripusta portti, josta kaikki pääsevät läpi. Lue ensin, kuka tulee!"},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Read who is coming. Which gate fits?",de:"Lies, wer kommt. Welches Tor passt?",fr:"Lis qui arrive. Quelle porte va ?",es:"Lee quién viene. ¿Qué puerta va?",pt:"Leia quem vem. Qual portão serve?",it:"Leggi chi arriva. Quale cancello va bene?",nl:"Lees wie er komt. Welk hek past?",sv:"Läs vem som kommer. Vilken grind passar?",da:"Læs, hvem der kommer. Hvilken låge passer?",no:"Les hvem som kommer. Hvilken grind passer?",fi:"Lue, kuka tulee. Mikä portti sopii?"},
    t2: {en:"Read who is coming. Which gate fits?",de:"Lies, wer kommt. Welches Tor passt?",fr:"Lis qui arrive. Quelle porte va ?",es:"Lee quién viene. ¿Qué puerta va?",pt:"Leia quem vem. Qual portão serve?",it:"Leggi chi arriva. Quale cancello va bene?",nl:"Lees wie er komt. Welk hek past?",sv:"Vem är det? Vilken grind passar?",da:"Hvem er det? Hvilken låge passer?",no:"Hvem er det? Hvilken grind passer?",fi:"Lue, kuka tulee. Mikä portti sopii?"},
    t3: {en:"Yesterday! Which gate fits?",de:"Gestern! Welches Tor passt?",fr:"Hier ! Quelle porte va ?",es:"¡Ayer! ¿Qué puerta va?",pt:"Ontem! Qual portão serve?",it:"Ieri! Quale cancello va bene?",nl:"Gisteren! Welk hek past?",sv:"Nu med var. Vilken grind passar?",da:"Nu med var. Hvilken låge passer?",no:"Nå med var. Hvilken grind passer?",fi:"Eilen! Mikä portti sopii?"},
    t4: {en:"One or more? Which gate fits?",de:"Einer oder mehr? Welches Tor passt?",fr:"Un seul ou plusieurs ? Quelle porte va ?",es:"¿Uno o más? ¿Qué puerta va?",pt:"Um ou mais? Qual portão serve?",it:"Uno o più? Quale cancello va bene?",nl:"Eén of meer? Welk hek past?",sv:"En eller flera? Vilken grind passar?",da:"En eller flere? Hvilken låge passer?",no:"En eller flere? Hvilken grind passer?",fi:"Yksi vai monta? Mikä portti sopii?"},
    t5: {en:"One or more? Which gate fits?",de:"Einer oder mehr? Welches Tor passt?",fr:"Un seul ou plusieurs ? Quelle porte va ?",es:"¿Uno o más? ¿Qué puerta va?",pt:"Um ou mais? Qual portão serve?",it:"Uno o più? Quale cancello va bene?",nl:"Eén of meer? Welk hek past?",sv:"En eller flera? Vilken grind passar?",da:"En eller flere? Hvilken låge passer?",no:"En eller flere? Hvilken grind passer?",fi:"Yksi vai monta? Mikä portti sopii?"},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    setLevel: {en:"Verbs",de:"Verben",fr:"Verbes",es:"Verbos",pt:"Verbos",it:"Verbi",nl:"Werkwoorden",sv:"Meningar",da:"Sætninger",no:"Setninger",fi:"Verbit"},
    l1: {en:"am · is · are",de:"bin · ist · sind",fr:"suis · est · sont",es:"estoy · está · están",pt:"estou · está · estão",it:"sto · sta · stanno",nl:"ben · is · zijn",sv:"Djur och saker",da:"Dyr og ting",no:"Dyr og ting",fi:"olen · on · ovat"},
    l2: {en:"Who is it?",de:"Wer ist es?",fr:"Qui est-ce ?",es:"¿Quién es?",pt:"Quem é?",it:"Chi è?",nl:"Wie is het?",sv:"Vem är det?",da:"Hvem er det?",no:"Hvem er det?",fi:"Kuka se on?"},
    l3: {en:"Yesterday: was · were",de:"Gestern: war · waren",fr:"Hier : étais · était · étaient",es:"Ayer: estaba · estaban",pt:"Ontem: estava · estavam",it:"Ieri: stavo · stava · stavano",nl:"Gisteren: was · waren",sv:"Med var",da:"Med var",no:"Med var",fi:"Eilen: olin · oli · olivat"},
    l4: {en:"has · goes · does",de:"hat · geht · macht",fr:"a · va · fait",es:"tiene · va · hace",pt:"tem · vai · faz",it:"ha · va · fa",nl:"heeft · gaat · doet",sv:"–",da:"–",no:"–",fi:"menee · tekee"},
    l5: {en:"Any verb",de:"Alle Verben",fr:"Tous les verbes",es:"Cualquier verbo",pt:"Qualquer verbo",it:"Tutti i verbi",nl:"Alle werkwoorden",sv:"–",da:"–",no:"–",fi:"Kaikki verbit"},
    setShow: {en:"Show who",de:"Wer kommt?",fr:"Qui arrive ?",es:"¿Quién viene?",pt:"Quem vem?",it:"Chi arriva?",nl:"Wie komt er?",sv:"Vem kommer?",da:"Hvem kommer?",no:"Hvem kommer?",fi:"Kuka tulee?"},
    showHide: {en:"Hide until Check",de:"Erst beim Prüfen zeigen",fr:"Cacher jusqu’à Vérifier",es:"Ocultar hasta Comprobar",pt:"Esconder até Verificar",it:"Nascondi fino a Controlla",nl:"Pas tonen bij Controleer",sv:"Visa först vid Kontrollera",da:"Vis først ved Tjek",no:"Vis først ved Sjekk",fi:"Näytä vasta tarkistaessa"},
    showShow: {en:"Show who is coming",de:"Zeigen, wer kommt",fr:"Montrer qui arrive",es:"Mostrar quién viene",pt:"Mostrar quem vem",it:"Mostra chi arriva",nl:"Laat zien wie er komt",sv:"Visa vem som kommer",da:"Vis, hvem der kommer",no:"Vis hvem som kommer",fi:"Näytä, kuka tulee"},
    hintEmpty: {en:"Hang a gate in the hedge. Who is coming down the path?",de:"Häng ein Tor in die Hecke. Wer kommt den Weg entlang?",fr:"Accroche une porte dans la haie. Qui arrive sur le chemin ?",es:"Cuelga una puerta en el seto. ¿Quién viene por el camino?",pt:"Pendure um portão na cerca viva. Quem vem pelo caminho?",it:"Appendi un cancello nella siepe. Chi arriva sul sentiero?",nl:"Hang een hek in de heg. Wie komt er over het pad?",sv:"Häng en grind i häcken. Vem kommer på stigen?",da:"Hæng en låge i hækken. Hvem kommer ad stien?",no:"Heng en grind i hekken. Hvem kommer langs stien?",fi:"Ripusta portti pensasaitaan. Kuka tulee polkua pitkin?"},
    missOne: {en:"The turnstile lets only ONE through. How many are coming?",de:"Das Drehkreuz lässt nur EINEN durch. Wie viele kommen?",fr:"Le tourniquet ne laisse passer qu’UN seul. Combien arrivent ?",es:"El torniquete deja pasar solo a UNO. ¿Cuántos vienen?",pt:"A catraca só deixa passar UM. Quantos estão vindo?",it:"Il tornello fa passare solo UNO. Quanti arrivano?",nl:"Het draaihek laat maar ÉÉN door. Hoeveel komen er?",sv:"Vändkorset släpper bara igenom EN. Hur många kommer?",da:"Drejekorset lukker kun ÉN igennem. Hvor mange kommer der?",no:"Dreiekorset slipper bare ÉN gjennom. Hvor mange kommer?",fi:"Kääntöportista pääsee vain YKSI. Montako tulee?"},
    missTwo: {en:"This gate needs two or more to push it open.",de:"Dieses Tor geht nur auf, wenn zwei oder mehr schieben.",fr:"Cette porte ne s’ouvre que si deux ou plus poussent.",es:"Esta puerta solo se abre si empujan dos o más.",pt:"Este portão só abre quando dois ou mais empurram.",it:"Questo cancello si apre solo se spingono in due o più.",nl:"Dit hek gaat pas open als er twee of meer duwen.",sv:"Den här grinden öppnas bara när två eller fler knuffar.",da:"Denne låge åbner kun, når to eller flere skubber.",no:"Denne grinda åpner seg bare når to eller flere dytter.",fi:"Tämä portti aukeaa vain, kun kaksi tai useampi työntää."},
    missStar: {en:"The star door is only for I.",de:"Die Sternentür ist nur für „ich“.",fr:"La porte étoile, c’est seulement pour « je ».",es:"La puerta de la estrella es solo para «yo».",pt:"A porta da estrela é só para \"eu\".",it:"La porta della stella è solo per «io».",nl:"De sterdeur is alleen voor ‘ik’.",sv:"Stjärndörren är bara för ”jag”.",da:"Stjernedøren er kun til ”jeg”.",no:"Stjernedøra er bare for «jeg».",fi:"Tähtiovi on vain sanalle minä."},
    missMe: {en:"Who is speaking? I — that is the star, just one.",de:"Wer spricht? Ich – das ist der Stern, nur einer.",fr:"Qui parle ? Je, c’est l’étoile : une seule personne.",es:"¿Quién habla? Yo: esa es la estrella, solo uno.",pt:"Quem está falando? Eu: essa é a estrela, só um.",it:"Chi parla? Io: è la stella, uno solo.",nl:"Wie praat er? Ik – dat is de ster, maar één.",sv:"Vem pratar? Jag – det är stjärnan, bara en.",da:"Hvem taler? Jeg – det er stjernen, kun én.",no:"Hvem snakker? Jeg – det er stjernen, bare én.",fi:"Kuka puhuu? Minä – se on tähti, vain yksi."},
    missGender: {en:"This gate does not turn for this word.",de:"Dieses Tor dreht sich für dieses Wort nicht.",fr:"Cette porte ne tourne pas pour ce mot.",es:"Esta puerta no gira para esta palabra.",pt:"Este portão não gira para esta palavra.",it:"Questo cancello non gira per questa parola.",nl:"Dit hek draait niet voor dit woord.",sv:"Den här grinden vrider sig inte. Är det ett en-ord eller ett ett-ord?",da:"Denne låge drejer ikke. Er det et en-ord eller et et-ord?",no:"Denne grinda snur seg ikke. Er det et en-ord eller et et-ord?",fi:"Tämä portti ei käänny tälle sanalle."},
    missGlow: {en:"Count who is coming, then try the glowing gate.",de:"Zähl, wer kommt, und probier dann das leuchtende Tor.",fr:"Compte qui arrive, puis essaie la porte qui brille.",es:"Cuenta quién viene y prueba la puerta que brilla.",pt:"Conte quem vem e experimente o portão que brilha.",it:"Conta chi arriva, poi prova il cancello che brilla.",nl:"Tel wie er komt en probeer dan het hek dat oplicht.",sv:"Räkna vem som kommer och prova sedan grinden som lyser.",da:"Tæl, hvem der kommer, og prøv så lågen, der lyser.",no:"Tell hvem som kommer, og prøv så grinda som lyser.",fi:"Laske, kuka tulee, ja kokeile sitten hohtavaa porttia."},
    okMe: {en:"{s} — I, so {W}!",de:"{s} – ich, also {W}!",fr:"{s} : je, donc {W} !",es:"{s}: yo, así que ¡{W}!",pt:"{s}: eu, então {W}!",it:"{s}: io, quindi {W}!",nl:"{s} – ik, dus {W}!",sv:"{s} – jag, så {W}!",da:"{s} – jeg, så {W}!",no:"{s} – jeg, så {W}!",fi:"{s} – minä, siis {W}!"},
    okOne: {en:"{s} — just one, so {W}!",de:"{s} – nur einer, also {W}!",fr:"{s} : un seul, donc {W} !",es:"{s}: solo uno, así que ¡{W}!",pt:"{s}: só um, então {W}!",it:"{s}: uno solo, quindi {W}!",nl:"{s} – maar één, dus {W}!",sv:"{s} – bara en, så {W}!",da:"{s} – kun én, så {W}!",no:"{s} – bare én, så {W}!",fi:"{s} – vain yksi, siis {W}!"},
    okT: {en:"{s} — just one, so {W}!",de:"{s} – nur einer, also {W}!",fr:"{s} : un seul, donc {W} !",es:"{s}: solo uno, así que ¡{W}!",pt:"{s}: só um, então {W}!",it:"{s}: uno solo, quindi {W}!",nl:"{s} – maar één, dus {W}!",sv:"{s} – ett ett-ord, så {W}!",da:"{s} – et et-ord, så {W}!",no:"{s} – et et-ord, så {W}!",fi:"{s} – vain yksi, siis {W}!"},
    okMany: {en:"{s} — more than one, so {W}!",de:"{s} – mehr als einer, also {W}!",fr:"{s} : plusieurs, donc {W} !",es:"{s}: más de uno, así que ¡{W}!",pt:"{s}: mais de um, então {W}!",it:"{s}: più di uno, quindi {W}!",nl:"{s} – meer dan één, dus {W}!",sv:"{s} – fler än en, så {W}!",da:"{s} – flere end én, så {W}!",no:"{s} – flere enn én, så {W}!",fi:"{s} – monta, siis {W}!"},
    aSentence: {en:"Sentence: {s}",de:"Satz: {s}",fr:"Phrase : {s}",es:"Oración: {s}",pt:"Frase: {s}",it:"Frase: {s}",nl:"Zin: {s}",sv:"Mening: {s}",da:"Sætning: {s}",no:"Setning: {s}",fi:"Lause: {s}"},
    aGap: {en:"gap",de:"Lücke",fr:"trou",es:"hueco",pt:"lacuna",it:"spazio",nl:"gat",sv:"lucka",da:"hul",no:"luke",fi:"aukko"},
    aGateStar: {en:"Gate {w}: only for I",de:"Tor {w}: nur für ich",fr:"Porte {w} : seulement pour je",es:"Puerta {w}: solo para yo",pt:"Portão {w}: só para eu",it:"Cancello {w}: solo per io",nl:"Hek {w}: alleen voor ik",sv:"Grind {w}: bara för jag",da:"Låge {w}: kun til jeg",no:"Grind {w}: bare for jeg",fi:"Portti {w}: vain minälle"},
    aGateOne: {en:"Gate {w}: lets one through",de:"Tor {w}: lässt einen durch",fr:"Porte {w} : laisse passer un seul",es:"Puerta {w}: deja pasar a uno",pt:"Portão {w}: deixa passar um",it:"Cancello {w}: fa passare uno",nl:"Hek {w}: laat er één door",sv:"Grind {w}: för en (inte ett-ord)",da:"Låge {w}: til én (ikke et-ord)",no:"Grind {w}: for én (ikke et-ord)",fi:"Portti {w}: päästää yhden"},
    aGateOneT: {en:"Gate {w}: lets one through",de:"Tor {w}: lässt einen durch",fr:"Porte {w} : laisse passer un seul",es:"Puerta {w}: deja pasar a uno",pt:"Portão {w}: deixa passar um",it:"Cancello {w}: fa passare uno",nl:"Hek {w}: laat er één door",sv:"Grind {w}: för ett ett-ord",da:"Låge {w}: til et et-ord",no:"Grind {w}: for et et-ord",fi:"Portti {w}: päästää yhden"},
    aGateMany: {en:"Gate {w}: needs two or more",de:"Tor {w}: braucht zwei oder mehr",fr:"Porte {w} : il faut deux ou plus",es:"Puerta {w}: necesita dos o más",pt:"Portão {w}: precisa de dois ou mais",it:"Cancello {w}: ne servono due o più",nl:"Hek {w}: heeft twee of meer nodig",sv:"Grind {w}: för två eller fler",da:"Låge {w}: til to eller flere",no:"Grind {w}: for to eller flere",fi:"Portti {w}: aukeaa kahdelle tai useammalle"},
    aHouse: {en:"{sign}: send them out",de:"{sign}: losschicken",fr:"{sign} : les faire sortir",es:"{sign}: hacerlos salir",pt:"{sign}: mandar sair",it:"{sign}: farli uscire",nl:"{sign}: laat ze naar buiten gaan",sv:"{sign}: skicka ut dem",da:"{sign}: send dem ud",no:"{sign}: send dem ut",fi:"{sign}: lähetä matkaan"},
    srThrough: {en:"Through the gate: {n}.",de:"Durchs Tor: {n}.",fr:"Passés par la porte : {n}.",es:"Pasaron la puerta: {n}.",pt:"Passaram pelo portão: {n}.",it:"Passati dal cancello: {n}.",nl:"Door het hek: {n}.",sv:"Genom grinden: {n}.",da:"Gennem lågen: {n}.",no:"Gjennom grinda: {n}.",fi:"Portista läpi: {n}."},
    srLeft: {en:"Left behind: {k}.",de:"Zurückgeblieben: {k}.",fr:"Restés derrière : {k}.",es:"Se quedaron atrás: {k}.",pt:"Ficaram para trás: {k}.",it:"Rimasti indietro: {k}.",nl:"Achtergebleven: {k}.",sv:"Kvar utanför: {k}.",da:"Blev tilbage: {k}.",no:"Ble igjen: {k}.",fi:"Jäi jälkeen: {k}."},
    okOneN: {en:"{s} — just one, so {W}!",de:"{s} – nur einer, also {W}!",fr:"{s} : un seul, donc {W} !",es:"{s}: solo uno, así que ¡{W}!",pt:"{s}: só um, então {W}!",it:"{s}: uno solo, quindi {W}!",nl:"{s} – maar één, dus {W}!",sv:"{s} – ett en-ord, så {W}!",da:"{s} – et en-ord, så {W}!",no:"{s} – et en-ord, så {W}!",fi:"{s} – vain yksi, siis {W}!"},
  },/*STRINGS-END*/

  defaults: { level: '1', show: 'hide' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }, { value: '4', labelKey: 'l4' }, { value: '5', labelKey: 'l5' }] },
    { key: 'show', type: 'choice', labelKey: 'setShow', options: [{ value: 'hide', labelKey: 'showHide' }, { value: 'show', labelKey: 'showShow' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    /* sv / da / no have three levels (no verb agreement to teach in 4–5) */
    var n = VerbGatesCore.levels(((api && api.lang) || 'en')).length;
    this.settings = [{ key: 'level', type: 'choice', labelKey: 'setLevel', options: VerbGatesCore.levels(((api && api.lang) || 'en')).map(function (v) { return { value: v, labelKey: 'l' + v }; }) }, this.settings[1]];
    if (api && api.settings && +api.settings.level > n) api.settings.level = '1';
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._flowers = 0; this._fresh = null;
    injectVerbGatesCSS();
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
  _loc: function () { return VerbGatesCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return VerbGatesCore.levelOf(this._loc(), this._setting('level')); },
  _showWho: function () { return this._setting('show') === 'show'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = VerbGatesCore.rounds(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._flowers = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = VerbGatesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var o = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev); this._prev = o; this._order = o.slice(); this._orderForPool = pool; if (pass > this._pass) this._flowers = 0; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'verbgates.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._fresh = null;
    this.st = VerbGatesCore.newState(this._loc(), this._level(), r);
    this._view = { note: '', ok: '', walk: null, sent: false };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
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
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'vg-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="vg-strip"></div><div class="vg-scene"></div><div class="vg-rack"></div><div class="vg-foot"></div><p class="vg-note" aria-live="polite"></p><p class="vg-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
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
  _dims: function () { var W = this._width(), B = VerbGatesCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, pic: B.wide ? 96 : 64 }; },
  _img: function (pic, size) { return '<img src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.vg-sr'); if (el) el.textContent = s; },
  /* the gates, drawn: the turnstile (one through), the t-turnstile (a pennant: an ett/et-word), the double gate (two leaves, two handles), the star door */
  _gateSvg: function (shape) {
    if (shape === 'many') return '<svg class="vg-art vg-g vg-gdouble" viewBox="0 0 96 72" aria-hidden="true"><rect x="2" y="64" width="92" height="6" rx="3" fill="#8C6239"/><rect x="2" y="6" width="5" height="62" rx="2" fill="#7A5638"/><rect x="89" y="6" width="5" height="62" rx="2" fill="#7A5638"/>'
      + '<g class="vg-leaf vg-leafl"><rect x="8" y="12" width="39" height="50" rx="3" fill="#C99A62" stroke="#7A5638" stroke-width="3"/><path d="M18 14v46M28 14v46M38 14v46" stroke="#A97A44" stroke-width="2.5"/><circle cx="40" cy="38" r="4.5" fill="#B8862A" stroke="#6E4F18" stroke-width="2"/></g>'
      + '<g class="vg-leaf vg-leafr"><rect x="49" y="12" width="39" height="50" rx="3" fill="#C99A62" stroke="#7A5638" stroke-width="3"/><path d="M58 14v46M68 14v46M78 14v46" stroke="#A97A44" stroke-width="2.5"/><circle cx="56" cy="38" r="4.5" fill="#B8862A" stroke="#6E4F18" stroke-width="2"/></g></svg>';
    if (shape === 'star') return '<svg class="vg-art vg-g vg-gstar" viewBox="0 0 96 72" aria-hidden="true"><rect x="2" y="64" width="92" height="6" rx="3" fill="#8C6239"/><g class="vg-sdoor"><circle cx="48" cy="36" r="29" fill="#7E9BD8" stroke="#3E5A9A" stroke-width="3.5"/><circle cx="48" cy="36" r="22" fill="none" stroke="#5E7BC0" stroke-width="2"/>'
      + '<path d="M48 22l4.1 8.6 9.4 1.2-6.9 6.5 1.8 9.3L48 43l-8.4 4.6 1.8-9.3-6.9-6.5 9.4-1.2z" fill="#F4CF62" stroke="#B8862A" stroke-width="2" stroke-linejoin="round"/></g></svg>';
    var flag = shape === 'oneT' ? '<path d="M48 4v10M48 4l16 4.5L48 13" fill="#2E8C7E" stroke="#1B5F55" stroke-width="2" stroke-linejoin="round"/>' : '';
    return '<svg class="vg-art vg-g vg-gturn' + (shape === 'oneT' ? ' vg-gt' : '') + '" viewBox="0 0 96 72" aria-hidden="true"><rect x="2" y="64" width="92" height="6" rx="3" fill="#8C6239"/>' + flag
      + '<rect x="44" y="14" width="8" height="52" rx="3" fill="#8C7A5A" stroke="#5A4A32" stroke-width="2"/><g class="vg-arms"><path d="M48 34H14M48 34l17-29M48 34l17 29" stroke="#B8862A" stroke-width="7" stroke-linecap="round"/></g><circle cx="48" cy="34" r="7" fill="#D6A846" stroke="#6E4F18" stroke-width="2.5"/></svg>';
  },
  _star: function (size) { return '<svg class="vg-art vg-starm" viewBox="0 0 64 64" width="' + size + '" height="' + size + '" aria-hidden="true"><circle cx="32" cy="32" r="29" fill="#FFF3C4" opacity=".75"/><path d="M32 7l7.3 15.2 16.7 2.1-12.3 11.5 3.2 16.6L32 44.3l-14.9 8.1 3.2-16.6L8 24.3l16.7-2.1z" fill="#F4CF62" stroke="#B8862A" stroke-width="3" stroke-linejoin="round"/></svg>'; },
  _gateLabel: function (g) { return this._t(g.shape === 'star' ? 'aGateStar' : g.shape === 'oneT' ? 'aGateOneT' : g.shape === 'many' ? 'aGateMany' : 'aGateOne', { w: g.w }); },
  /* who stands where: the crowd's members (pictures first, the star last), and where the walk left each */
  _members: function () {
    var rd = this.st.rd, m = [];
    for (var i = 0; i < rd.crowd.n; i++) m.push({ pic: rd.crowd.pic });
    if (rd.crowd.star) m.push({ star: true });
    var w = this._view.walk, st = this.st;
    if (st.done) { m.forEach(function (x) { x.at = 'garden'; }); return m; }
    if (!w) { m.forEach(function (x) { x.at = 'home'; }); return m; }
    m.forEach(function (x, i) {
      if (i < w.through) x.at = 'garden';
      else { x.at = 'home'; x.how = w.stuck ? 'sit' : w.waiting ? 'wait' : w.bounce ? 'bump' : ''; }
    });
    return m;
  },

  _paint_: function () {
    var C = VerbGatesCore, st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, glow = C.glow(st), clue = C.clue(st), w = v.walk;
    var before = {}; this._wrap.querySelectorAll('[data-flip]').forEach(function (e) { before[e.getAttribute('data-flip')] = e.getBoundingClientRect(); });
    this._wrap.className = 'vg-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    /* the sentence strip */
    var s = C.sentence(rd, st.hung), strip = this._qs('.vg-strip');
    strip.setAttribute('role', 'img');
    strip.setAttribute('aria-label', this._t('aSentence', { s: st.hung ? C.filled(rd, st.hung) : s.pre + this._t('aGap') + s.post }));
    strip.innerHTML = '<span class="vg-words">' + esc(s.pre) + (st.hung ? '<b class="vg-hw' + (st.done ? ' is-ok' : '') + (/^[.,!?]/.test(s.post) ? ' no-r' : '') + '">' + esc(s.w) + '</b>' : '<span class="vg-gap"></span>') + esc(s.post) + '</span>';
    /* the path: the house, the gateway in the hedge, the garden */
    var scene = this._qs('.vg-scene'); scene.innerHTML = '';
    var crowdShown = this._showWho() || st.misses > 0 || st.done || !!w || glow;
    var home = this._el('div', 'vg-home'), gardenRow = this._el('div', 'vg-arrived');
    var house = this._btn('vg-house' + (crowdShown ? ' is-open' : ''), 'house', this._t('aHouse', { sign: rd.sign }), '<span class="vg-sign">' + esc(rd.sign) + '</span>' + '<svg class="vg-art vg-hs" viewBox="0 0 110 72" aria-hidden="true"><path d="M6 32 55 4l49 28z" fill="#C8503A" stroke="#8C2E2B" stroke-width="3" stroke-linejoin="round"/><rect x="16" y="31" width="78" height="38" rx="2" fill="#F3E2C4" stroke="#7A5638" stroke-width="3"/><rect x="24" y="40" width="16" height="14" rx="2" fill="#BFD9F2" stroke="#7A5638" stroke-width="2.5"/><rect x="70" y="40" width="16" height="14" rx="2" fill="#BFD9F2" stroke="#7A5638" stroke-width="2.5"/><rect class="vg-hdoor" x="45" y="40" width="20" height="29" rx="2" stroke="#4A321F" stroke-width="2.5"/></svg>');
    house.disabled = st.done; house.addEventListener('click', function () { self._send(); });
    var queue = this._el('div', 'vg-queue');
    if (clue) queue.appendChild(this._el('span', 'vg-ghost', esc(clue.art)));
    this._members().forEach(function (m, i) {
      var html = m.star ? self._star(D.pic) : self._img(m.pic, D.pic);
      var el = self._el('span', 'vg-m' + (m.star ? ' is-star' : '') + (m.how ? ' is-' + m.how : '') + (m.at === 'garden' && self._fresh === 'walk' ? ' is-arrive' : ''), html);
      el.setAttribute('data-flip', 'm' + i); el.style.zIndex = String(10 - i);
      if (m.at === 'garden') gardenRow.appendChild(el); else if (crowdShown) queue.appendChild(el);
    });
    home.appendChild(house); home.appendChild(queue);
    /* the gateway: two hedge pieces, the posts, the hung gate (a button: tap to take it down) or a dashed empty frame */
    var gw = this._el('div', 'vg-gw');
    gw.appendChild(this._el('span', 'vg-hedge vg-art', ''));
    var mid;
    if (st.hung) {
      var g = C.gateOf(rd, st.hung), anim = w ? (w.all ? (st.hung === 'many' ? ' is-open' : st.hung === 'star' ? ' is-spin' : ' is-turn') : w.waiting ? ' is-push' : w.stuck ? ' is-turn is-lock' : ' is-bump') : '';
      mid = this._btn('vg-hung' + anim + (st.done ? ' is-ok' : ''), 'hung', this._gateLabel(g), '<span class="vg-gw-word">' + esc(g.w) + '</span>' + this._gateSvg(st.hung));
      mid.disabled = st.done; mid.addEventListener('click', function () { self._take(); });
    } else mid = this._el('span', 'vg-empty vg-art', '');
    gw.appendChild(mid);
    gw.appendChild(this._el('span', 'vg-hedge vg-art', ''));
    var garden = this._el('div', 'vg-garden');
    var bed = this._el('div', 'vg-bed vg-art', '');
    var fl = ''; for (var k = 0; k < 9; k++) fl += '<i class="vg-fl' + (k < this._flowers ? ' on' : '') + (this._fresh === 'walk' && st.done && k === this._flowers - 1 ? ' is-new' : '') + '"></i>';
    bed.innerHTML = fl; bed.setAttribute('aria-hidden', 'true');
    garden.appendChild(gardenRow); garden.appendChild(bed);
    scene.appendChild(home); scene.appendChild(gw); scene.appendChild(garden);
    /* the rack */
    var rack = this._qs('.vg-rack'); rack.innerHTML = '';
    rd.gates.forEach(function (g) {
      var on = st.hung === g.shape;
      var bt = self._btn('vg-gate' + (on ? ' is-out' : '') + (glow && g.shape === rd.right ? ' is-glow' : ''), 'gate-' + g.shape, self._gateLabel(g), '<span class="vg-gw-word">' + esc(g.w) + '</span>' + self._gateSvg(g.shape));
      bt.disabled = st.done; bt.setAttribute('aria-pressed', on ? 'true' : 'false');
      bt.addEventListener('click', function () { self._hang(g.shape); });
      rack.appendChild(bt);
    });
    var foot = this._qs('.vg-foot'); foot.innerHTML = '';
    var chk = this._btn('vg-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.vg-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'vg-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'vg-note is-hint'; }
    else { note.textContent = ''; note.className = 'vg-note'; }
    /* walk the crowd from the house through the gate (FLIP) */
    if (!this.FAST) this._wrap.querySelectorAll('[data-flip]').forEach(function (e, i) {
      var r0 = before[e.getAttribute('data-flip')]; if (!r0) return; var r1 = e.getBoundingClientRect(), dx = r0.left - r1.left, dy = r0.top - r1.top;
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return;
      e.style.transition = 'none'; e.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; void e.offsetWidth;
      e.style.transition = 'transform .5s cubic-bezier(.3,1.1,.5,1) ' + (i * 0.08) + 's'; e.style.transform = '';
    });
    this._fresh = null;
  },

  /* ---------------- the hand ---------------- */
  _hang: function (shape) {
    var st = this.st; if (st.done) return;
    var r = VerbGatesCore.hang(st, shape); if (r === 'no') return;
    this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.walk = null;
    this.api.sound(r === 'removed' ? 300 : 420); this._paint();
  },
  _take: function () { if (VerbGatesCore.unhang(this.st) === 'no') return; this._clearTimers(); this._view.note = ''; this._view.walk = null; this.api.sound(300); this._paint(); },
  /* the house tapped: the crowd walks out to whatever gate hangs there — exploring, no miss, no hint; it walks back after a moment */
  _send: function () {
    var C = VerbGatesCore, st = this.st, self = this; if (st.done) return;
    if (!st.hung) { this._view.note = this._t('hintEmpty'); this._paint(); return; }
    this._clearTimers();
    var w = C.walk(st.rd, st.hung); this._view.walk = w; this._view.note = ''; this._fresh = 'walk';
    this.api.sound(w.all ? 660 : 260); this._paint(); this._srWalk(w);
    this._later(function () { if (self.st === st && !st.done) { self._view.walk = null; self._paint(); } }, 2000);
  },
  _srWalk: function (w) { this._sr(this._t('srThrough', { n: w.through }) + (w.n - w.through ? ' ' + this._t('srLeft', { k: w.n - w.through }) : '')); },
  _check: function () {
    var C = VerbGatesCore, st = this.st, v = this._view; if (st.done) return;
    this._clearTimers();
    var res = C.check(st);
    if (res.result === 'ok') { v.walk = res.walk; this._success(); return; }
    v.ok = ''; v.walk = res.walk || null; v.note = this._t(C.hint(st)); this._fresh = res.walk ? 'walk' : null;
    this.api.sound(res.result === 'empty' ? 400 : 220); this._paint(); this.api.announce(v.note);
    if (res.walk) this._srWalk(res.walk);
  },
  _success: function () {
    var C = VerbGatesCore, st = this.st, v = this._view, s = C.filled(st.rd, st.hung).replace(/[.!]$/, '');
    var W = C.word(st.rd, st.hung).toLocaleUpperCase(this._loc());
    v.note = ''; v.ok = this._t(C.okKey(st.rd), { s: s, W: W });
    this._flowers = Math.min(9, this._flowers + 1); this._fresh = 'walk';
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: C.filled(st.rd, st.hung), lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectVerbGatesCSS() {
  if (typeof document === 'undefined' || document.getElementById('vg-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', LEAF = '#4E8F4A';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.vg-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;} .vg-wrap:focus{outline:none;}'
  /* the sentence strip */
  + '.vg-strip{display:flex;justify-content:center;align-items:center;min-height:68px;padding:8px 14px;border-radius:12px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #D9C29A,0 4px 0 #D9C29A;}'
  + '.vg-words{font-family:' + H + ';font-weight:800;font-size:32px;line-height:1.35;color:' + INK + ';text-align:center;overflow-wrap:break-word;}'
  + '.vg-gap{display:inline-block;vertical-align:middle;width:72px;height:40px;margin:0 4px;border-radius:8px;border:3px dashed #B98A55;box-sizing:border-box;}'
  + '.vg-hw{display:inline-block;padding:0 6px;margin:0 2px;border-radius:8px;background:#FDE8DD;color:#B04A26;} .vg-hw.is-ok{background:#DDF1EC;color:#146B5E;} .vg-hw.no-r{margin-right:0;padding-right:3px;}'
  /* the path */
  + '.vg-scene{display:flex;align-items:stretch;gap:0;min-height:236px;border-radius:14px;background:linear-gradient(#EAF4DC,#DCEBC8);box-shadow:inset 0 0 0 3px #B9D39A;padding:10px;}'
  + '.vg-home{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.vg-house{display:flex;flex-direction:column;align-items:center;gap:0;padding:0;border:0;background:none;cursor:pointer;min-height:44px;} .vg-house:disabled{cursor:default;}'
  + '.vg-sign{display:block;padding:3px 14px;border-radius:6px;background:#C99A62;box-shadow:inset 0 0 0 3px #7A5638;font-family:' + H + ';font-weight:800;font-size:26px;line-height:1.25;color:#2F1E10;white-space:nowrap;}'
  + '.vg-hs{display:block;width:110px;height:72px;margin-top:-4px;} .vg-hdoor{fill:#A9763F;} .vg-house.is-open .vg-hdoor{fill:#3A2616;}'
  + '.vg-queue{position:relative;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:2px 0;max-width:100%;}'
  + '.vg-m{position:relative;display:flex;margin-left:-26px;} .vg-m:first-child,.vg-ghost+.vg-m{margin-left:0;} .vg-m img,.vg-m svg{display:block;object-fit:contain;}'
  + '.vg-m.is-sit{transform:translateY(6px);opacity:.7;filter:grayscale(.4);} .vg-m.is-wait{animation:vgPush 1s ease-in-out 2;} .vg-m.is-bump{animation:vgBump .5s ease-out;}'
  + '@keyframes vgPush{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}} @keyframes vgBump{0%{transform:translateX(16px);}40%{transform:translateX(-6px);}}'
  + '.vg-ghost{position:absolute;top:-30px;left:50%;transform:translateX(-50%);z-index:20;padding:2px 10px;border-radius:8px;background:#FFF6D6;box-shadow:inset 0 0 0 2px #F4CF62;font-family:' + B + ';font-weight:800;font-size:20px;color:#7A5638;white-space:nowrap;}'
  /* the gateway */
  + '.vg-gw{position:relative;flex:none;width:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;}'
  + '.vg-gw::before{content:"";position:absolute;left:50%;top:-10px;bottom:-10px;width:60px;margin-left:-30px;background:#5E9E57;box-shadow:inset 0 0 0 3px #2F6B30;border-radius:6px;} .vg-gw>*{position:relative;} .vg-wrap.is-wide .vg-hedge{background:none;box-shadow:none;} .vg-wrap.is-narrow .vg-gw::before{display:none;}'
  + '.vg-hedge{display:block;flex:1;width:56px;min-height:20px;border-radius:14px;background:' + LEAF + ';box-shadow:inset 0 0 0 3px #2F6B30,inset 6px 6px 0 rgba(255,255,255,.12);}'
  + '.vg-empty{display:block;width:120px;height:104px;border-radius:10px;border:3px dashed #7FA866;box-sizing:border-box;}'
  + '.vg-hung{display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px;border:0;border-radius:10px;background:rgba(255,255,255,.55);cursor:pointer;} .vg-hung:disabled{cursor:default;}'
  + '.vg-gw-word{display:block;padding:0 8px;border-radius:6px;background:#3E2C1C;color:#FFF8E8;font-family:' + H + ';font-weight:800;font-size:24px;line-height:1.3;white-space:nowrap;}'
  + '.vg-g{display:block;width:112px;height:84px;overflow:visible;} .vg-arms,.vg-sdoor,.vg-leaf{transform-box:fill-box;}'
  + '.vg-arms{transform-origin:center;transition:transform .45s;} .vg-hung.is-turn .vg-arms{transform:rotate(120deg);} .vg-hung.is-lock .vg-arms{transition-delay:0s;}'
  + '.vg-leafl{transform-origin:left center;transition:transform .45s;} .vg-leafr{transform-origin:right center;transition:transform .45s;} .vg-hung.is-open .vg-leafl,.vg-hung.is-open .vg-leafr{transform:scaleX(.18);}'
  + '.vg-sdoor{transform-origin:center;} .vg-hung.is-spin .vg-sdoor{animation:vgSpin .6s ease-out;} @keyframes vgSpin{0%{transform:rotate(0);}100%{transform:rotate(360deg);}}'
  + '.vg-hung.is-push .vg-g{animation:vgWobble .5s ease-in-out 2;} @keyframes vgWobble{0%,100%{transform:rotate(0);}50%{transform:rotate(3deg);}}'
  + '.vg-hung.is-bump .vg-g{animation:vgShake .4s;} @keyframes vgShake{0%,100%{transform:none;}30%{transform:translateX(-4px);}60%{transform:translateX(4px);}}'
  + '.vg-hung.is-ok{background:rgba(221,241,236,.9);box-shadow:inset 0 0 0 3px #2E8C7E;}'
  /* the garden */
  + '.vg-garden{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;}'
  + '.vg-arrived{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;min-height:96px;}'
  + '.vg-m.is-arrive{animation:vgBob .5s ease-out .5s;} @keyframes vgBob{50%{transform:translateY(-6px);}}'
  + '.vg-bed{display:flex;justify-content:center;gap:4px;width:100%;max-width:220px;padding:6px 8px;border-radius:12px;background:#9B7A52;box-shadow:inset 0 0 0 3px #6E5232;box-sizing:border-box;}'
  + '.vg-fl{display:block;width:16px;height:16px;border-radius:50%;background:#B9A07C;} .vg-fl.on{background:radial-gradient(circle,#F4CF62 0 30%,#F2784B 32% 100%);box-shadow:0 0 0 2px #B04A26;} .vg-fl.is-new{animation:vgFl .5s ease-out;} @keyframes vgFl{0%{transform:scale(0);}}'
  /* the rack */
  + '.vg-rack{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding-top:6px;border-top:10px solid #C99A62;border-radius:4px;}'
  + '.vg-gate{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:120px;min-height:44px;padding:6px 8px 4px;border:0;border-radius:12px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #7A5638,0 4px 0 #7A5638;cursor:pointer;}'
  + '.vg-gate .vg-g{width:96px;height:72px;} .vg-gate:disabled{cursor:default;opacity:.7;}'
  + '.vg-gate.is-out{opacity:.4;box-shadow:inset 0 0 0 3px #B98A55;} .vg-gate.is-out .vg-g{visibility:hidden;}'
  + '.vg-gate.is-glow{box-shadow:inset 0 0 0 3px #2E8C7E,0 0 0 5px rgba(46,140,126,.35),0 4px 0 #1B5F55;transform:translateY(-6px);}'
  + '.vg-foot{display:flex;justify-content:center;} .vg-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .vg-check:disabled{opacity:.5;cursor:default;}'
  + '.vg-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .vg-note.is-hint{color:#8A3B1F;}'
  + '.vg-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones: the path runs down — the house, the gateway across the hedge, the garden */
  + '.vg-wrap.is-narrow{gap:8px;} .vg-wrap.is-narrow .vg-strip{min-height:56px;padding:6px 10px;} .vg-wrap.is-narrow .vg-words{font-size:24px;} .vg-wrap.is-narrow .vg-gap{width:56px;height:32px;}'
  + '.vg-wrap.is-narrow .vg-scene{flex-direction:column;min-height:0;padding:6px 8px;gap:4px;}'
  + '.vg-wrap.is-narrow .vg-home{flex-direction:row;justify-content:center;align-items:flex-end;gap:8px;min-height:72px;} .vg-wrap.is-narrow .vg-sign{font-size:20px;padding:2px 10px;} .vg-wrap.is-narrow .vg-hs{width:76px;height:50px;}'
  + '.vg-wrap.is-narrow .vg-queue{flex-wrap:nowrap;} .vg-wrap.is-narrow .vg-m{margin-left:-30px;} .vg-wrap.is-narrow .vg-m:first-child,.vg-wrap.is-narrow .vg-ghost+.vg-m{margin-left:0;} .vg-wrap.is-narrow .vg-ghost{top:-26px;font-size:17px;}'
  + '.vg-wrap.is-narrow .vg-gw{width:auto;flex-direction:row;gap:6px;} .vg-wrap.is-narrow .vg-hedge{width:auto;min-width:24px;height:30px;min-height:0;}'
  + '.vg-wrap.is-narrow .vg-empty{width:96px;height:78px;} .vg-wrap.is-narrow .vg-hung{flex-direction:row;gap:6px;padding:2px 6px;} .vg-wrap.is-narrow .vg-hung .vg-g{width:84px;height:63px;} .vg-wrap.is-narrow .vg-gw-word{font-size:20px;}'
  + '.vg-wrap.is-narrow .vg-garden{flex-direction:row;align-items:flex-end;justify-content:center;gap:8px;} .vg-wrap.is-narrow .vg-arrived{min-height:64px;flex-wrap:nowrap;} .vg-wrap.is-narrow .vg-bed{flex-wrap:wrap;width:62px;max-width:62px;gap:3px;padding:4px;} .vg-wrap.is-narrow .vg-fl{width:12px;height:12px;}'
  + '.vg-wrap.is-narrow .vg-rack{gap:8px;flex-wrap:nowrap;border-top-width:8px;} .vg-wrap.is-narrow .vg-gate{min-width:0;flex:1 1 0;max-width:120px;padding:4px 4px 2px;} .vg-wrap.is-narrow .vg-gate .vg-g{width:68px;height:51px;}'
  + '.vg-wrap.is-narrow .vg-check{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .vg-wrap.is-narrow .vg-note{font-size:17px;}'
  + '.vg-wrap.is-tiny{gap:6px;} .vg-wrap.is-tiny .vg-strip{min-height:50px;padding:4px 8px;} .vg-wrap.is-tiny .vg-hs{width:60px;height:40px;} .vg-wrap.is-tiny .vg-home{gap:4px;min-height:64px;} .vg-wrap.is-tiny .vg-m{margin-left:-38px;}'
  + ' .vg-wrap.is-tiny .vg-empty{height:66px;} .vg-wrap.is-tiny .vg-hung .vg-g{width:76px;height:57px;} .vg-wrap.is-tiny .vg-scene{padding:4px 6px;gap:2px;} .vg-wrap.is-tiny .vg-arrived{min-height:64px;}'
  + '.vg-wrap.is-tiny .vg-words{font-size:21px;} .vg-wrap.is-tiny .vg-gw-word{font-size:18px;padding:0 5px;} .vg-wrap.is-tiny .vg-sign{font-size:18px;}'
  /* a solved round on a phone: the rack and Check have no job left — they give their room to the shell's Next */
  + '.vg-wrap.is-narrow.is-done .vg-rack,.vg-wrap.is-narrow.is-done .vg-foot{display:none;}'
  + '.vg-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.vg-wrap *{animation:none !important;transition:none !important;}}'
  + '.vg-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'vg-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.VerbGatesActivity = VerbGatesActivity;
