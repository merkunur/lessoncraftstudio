/* =====================================================================
   marlo-magnifier-activity.js — ACTIVITY #117 of the one-by-one rebuild:
   "Marlo's Magnifier" → THE LENS THAT FINDS, THEN FOCUSES (RL.1.3; all
   11 locales). Model: marlo-magnifier-core.js (MarloLensCore).
   Design: docs/activities-rebuild/designs/117-marlo-magnifier.md
   ---------------------------------------------------------------------
   A claim card ("Mira is brave.") or a question card ("Where did Mira
   go?") with its key word inside a dashed focus ring, Marlo the raccoon beside
   it, a three-sentence story, and three clue cards. Tap a clue: it goes
   under Marlo's magnifier. Check: the lens hops along the story looking
   for the sentence the clue comes from — none, and the glass fogs; found,
   and that sentence glows, then the lens swings up to the claim — and
   only a real proof (or answer) snaps the ring into sharp gold focus, with a
   gold seal and a case pinned to the board. From miss 2 the lens parks
   over the sentence that holds the answer and the word pulses.
   No timer, no score. Test seams: window.MarloMagnifierActivity.st /
   ._pool / ._order / ._ensurePool / ._start / ._dims / ._render2 / .FAST /
   .OK_MS.
   ===================================================================== */
var MarloMagnifierActivity = {
  id: 'marlo-magnifier',
  /* the drawn apparatus (the hierarchy gate): Marlo's magnifier */
  apparatusClasses: ['mm-lens'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Marlo's Magnifier",de:"Marlos Lupe",fr:"La loupe de Marlo",es:"La lupa de Marlo",pt:"A lupa do Marlo",it:"La lente di Marlo",nl:"Het vergrootglas van Marlo",sv:"Marlos förstoringsglas",da:"Marlos lup",no:"Marlos lupe",fi:"Marlon suurennuslasi"},
    instruction: {en:"Read the story. Which clue proves the claim?",de:"Lies die Geschichte. Welcher Hinweis beweist die Aussage?",fr:"Lis l’histoire. Quel indice prouve ce qui est dit ?",es:"Lee el cuento. ¿Qué pista demuestra la afirmación?",pt:"Leia a história. Qual pista prova a afirmação?",it:"Leggi la storia. Quale indizio dimostra l’affermazione?",nl:"Lees het verhaal. Welke aanwijzing bewijst de bewering?",sv:"Läs berättelsen. Vilken ledtråd bevisar påståendet?",da:"Læs historien. Hvilket spor beviser påstanden?",no:"Les historien. Hvilket spor beviser påstanden?",fi:"Lue tarina. Mikä vihje todistaa väitteen?"},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    tProof: {en:"Read the story. Which clue proves the claim?",de:"Lies die Geschichte. Welcher Hinweis beweist die Aussage?",fr:"Lis l’histoire. Quel indice prouve ce qui est dit ?",es:"Lee el cuento. ¿Qué pista demuestra la afirmación?",pt:"Leia a história. Qual pista prova a afirmação?",it:"Leggi la storia. Quale indizio dimostra l’affermazione?",nl:"Lees het verhaal. Welke aanwijzing bewijst de bewering?",sv:"Läs berättelsen. Vilken ledtråd bevisar påståendet?",da:"Læs historien. Hvilket spor beviser påstanden?",no:"Les historien. Hvilket spor beviser påstanden?",fi:"Lue tarina. Mikä vihje todistaa väitteen?"},
    tQuestion: {en:"Read the story. Which clue answers the question?",de:"Lies die Geschichte. Welcher Hinweis beantwortet die Frage?",fr:"Lis l’histoire. Quel indice répond à la question ?",es:"Lee el cuento. ¿Qué pista responde la pregunta?",pt:"Leia a história. Qual pista responde à pergunta?",it:"Leggi la storia. Quale indizio risponde alla domanda?",nl:"Lees het verhaal. Welke aanwijzing beantwoordt de vraag?",sv:"Läs berättelsen. Vilken ledtråd svarar på frågan?",da:"Læs historien. Hvilket spor svarer på spørgsmålet?",no:"Les historien. Hvilket spor svarer på spørsmålet?",fi:"Lue tarina. Mikä vihje vastaa kysymykseen?"},
    nudge: {en:"Tap a clue: it goes under Marlo's magnifier. Then press Check.",de:"Tipp einen Hinweis an: Er kommt unter Marlos Lupe. Dann drück auf Prüfen.",fr:"Touche un indice : il va sous la loupe de Marlo. Puis appuie sur Vérifier.",es:"Toca una pista: va debajo de la lupa de Marlo. Luego presiona Comprobar.",pt:"Toque em uma pista: ela vai para baixo da lupa do Marlo. Depois toque em Verificar.",it:"Tocca un indizio: va sotto la lente di Marlo. Poi premi Controlla.",nl:"Tik op een aanwijzing: die gaat onder het vergrootglas van Marlo. Druk dan op Controleer.",sv:"Tryck på en ledtråd: den hamnar under Marlos förstoringsglas. Tryck sedan på Kontrollera.",da:"Tryk på et spor: Det kommer under Marlos lup. Tryk så på Tjek.",no:"Trykk på et spor: Det havner under lupen til Marlo. Trykk så på Sjekk.",fi:"Napauta vihjettä: se menee Marlon suurennuslasin alle. Paina sitten Tarkista."},
    hintEmpty: {en:"Put a clue under the magnifier.",de:"Leg einen Hinweis unter die Lupe.",fr:"Mets un indice sous la loupe.",es:"Pon una pista debajo de la lupa.",pt:"Coloque uma pista embaixo da lupa.",it:"Metti un indizio sotto la lente.",nl:"Leg een aanwijzing onder het vergrootglas.",sv:"Lägg en ledtråd under förstoringsglaset.",da:"Læg et spor under luppen.",no:"Legg et spor under lupen.",fi:"Laita vihje suurennuslasin alle."},
    hintFog: {en:"Marlo can't find that clue in the story. Pick a clue the story tells you.",de:"Marlo findet diesen Hinweis nicht in der Geschichte. Nimm einen Hinweis, den die Geschichte erzählt.",fr:"Marlo ne trouve pas cet indice dans l’histoire. Choisis un indice que l’histoire raconte.",es:"Marlo no encuentra esa pista en el cuento. Elige una pista que el cuento sí cuente.",pt:"O Marlo não acha essa pista na história. Escolha uma pista que a história conta.",it:"Marlo non trova questo indizio nella storia. Scegli un indizio che la storia racconta.",nl:"Marlo kan die aanwijzing niet vinden in het verhaal. Kies een aanwijzing die het verhaal vertelt.",sv:"Marlo hittar inte den ledtråden i berättelsen. Välj en ledtråd som står i berättelsen.",da:"Marlo kan ikke finde det spor i historien. Vælg et spor, der står i historien.",no:"Marlo finner ikke det sporet i historien. Velg et spor som står i historien.",fi:"Marlo ei löydä tätä vihjettä tarinasta. Valitse vihje, joka on tarinassa."},
    hintNotProof: {en:"That is in the story. But does it prove “{claim}”?",de:"Das steht in der Geschichte. Aber beweist es „{claim}“?",fr:"Ça, c’est dans l’histoire. Mais est-ce que ça prouve « {claim} » ?",es:"Eso sí está en el cuento. Pero ¿eso demuestra «{claim}»?",pt:"Isso está na história. Mas isso prova “{claim}”?",it:"Questo c’è nella storia. Ma dimostra «{claim}»?",nl:"Dat staat in het verhaal. Maar bewijst het ‘{claim}’?",sv:"Det står i berättelsen. Men bevisar det ”{claim}”?",da:"Det står i historien. Men beviser det ”{claim}”?",no:"Det står i historien. Men beviser det «{claim}»?",fi:"Se on tarinassa. Mutta todistaako se väitteen ”{claim}”?"},
    hintNotAnswer: {en:"That is in the story. But does it answer the question?",de:"Das steht in der Geschichte. Aber beantwortet es die Frage?",fr:"Ça, c’est dans l’histoire. Mais est-ce que ça répond à la question ?",es:"Eso sí está en el cuento. Pero ¿responde la pregunta?",pt:"Isso está na história. Mas responde à pergunta?",it:"Questo c’è nella storia. Ma risponde alla domanda?",nl:"Dat staat in het verhaal. Maar beantwoordt het de vraag?",sv:"Det står i berättelsen. Men svarar det på frågan?",da:"Det står i historien. Men svarer det på spørgsmålet?",no:"Det står i historien. Men svarer det på spørsmålet?",fi:"Se on tarinassa. Mutta vastaako se kysymykseen?"},
    hintMiss2: {en:"Look at the underlined sentence. Which clue says the same thing?",de:"Schau auf den unterstrichenen Satz. Welcher Hinweis sagt dasselbe?",fr:"Regarde la phrase soulignée. Quel indice dit la même chose ?",es:"Mira la oración subrayada. ¿Qué pista dice lo mismo?",pt:"Olhe a frase sublinhada. Qual pista diz a mesma coisa?",it:"Guarda la frase sottolineata. Quale indizio dice la stessa cosa?",nl:"Kijk naar de onderstreepte zin. Welke aanwijzing zegt hetzelfde?",sv:"Titta på den understrukna meningen. Vilken ledtråd säger samma sak?",da:"Se på den understregede sætning. Hvilket spor siger det samme?",no:"Se på den understrekede setningen. Hvilket spor sier det samme?",fi:"Katso alleviivattua lausetta. Mikä vihje sanoo saman asian?"},
    hintMiss2Q: {en:"Look at the underlined sentence. Which clue answers the question?",de:"Schau auf den unterstrichenen Satz. Welcher Hinweis beantwortet die Frage?",fr:"Regarde la phrase soulignée. Quel indice répond à la question ?",es:"Mira la oración subrayada. ¿Qué pista responde la pregunta?",pt:"Olhe a frase sublinhada. Qual pista responde à pergunta?",it:"Guarda la frase sottolineata. Quale indizio risponde alla domanda?",nl:"Kijk naar de onderstreepte zin. Welke aanwijzing beantwoordt de vraag?",sv:"Titta på den understrukna meningen. Vilken ledtråd svarar på frågan?",da:"Se på den understregede sætning. Hvilket spor svarer på spørgsmålet?",no:"Se på den understrekede setningen. Hvilket spor svarer på spørsmålet?",fi:"Katso alleviivattua lausetta. Mikä vihje vastaa kysymykseen?"},
    okProof: {en:"Proved! {claim}.",de:"Bewiesen! {claim}.",fr:"Prouvé ! {claim}.",es:"¡Demostrado! {claim}.",pt:"Provado! {claim}.",it:"Dimostrato! {claim}.",nl:"Bewezen! {claim}.",sv:"Bevisat! {claim}.",da:"Bevist! {claim}.",no:"Bevist! {claim}.",fi:"Todistettu! {claim}."},
    okQuestion: {en:"Yes! {question} — {answer}.",de:"Ja! {question} – {answer}.",fr:"Oui ! {question} – {answer}.",es:"¡Sí! {question} — {answer}.",pt:"Isso! {question} — {answer}.",it:"Sì! {question} – {answer}.",nl:"Ja! {question} – {answer}.",sv:"Ja! {question} – {answer}.",da:"Ja! {question} – {answer}.",no:"Ja! {question} – {answer}.",fi:"Kyllä! {question} – {answer}."},
    aClue: {en:"Clue: {t}",de:"Hinweis: {t}",fr:"Indice : {t}",es:"Pista: {t}",pt:"Pista: {t}",it:"Indizio: {t}",nl:"Aanwijzing: {t}",sv:"Ledtråd: {t}",da:"Spor: {t}",no:"Spor: {t}",fi:"Vihje: {t}"},
    aLens: {en:"Magnifier, holding: {t}",de:"Lupe, darunter: {t}",fr:"Loupe, avec l’indice : {t}",es:"Lupa, con la pista: {t}",pt:"Lupa, com a pista: {t}",it:"Lente, con l’indizio: {t}",nl:"Vergrootglas, met: {t}",sv:"Förstoringsglas, med: {t}",da:"Lup, med: {t}",no:"Lupe, med: {t}",fi:"Suurennuslasi, alla: {t}"},
    aLensEmpty: {en:"Magnifier, empty",de:"Lupe, leer",fr:"Loupe, vide",es:"Lupa, vacía",pt:"Lupa, vazia",it:"Lente, vuota",nl:"Vergrootglas, leeg",sv:"Förstoringsglas, tomt",da:"Lup, tom",no:"Lupe, tom",fi:"Suurennuslasi, tyhjä"},
    aClaim: {en:"Claim: {t}",de:"Aussage: {t}",fr:"Affirmation : {t}",es:"Afirmación: {t}",pt:"Afirmação: {t}",it:"Affermazione: {t}",nl:"Bewering: {t}",sv:"Påstående: {t}",da:"Påstand: {t}",no:"Påstand: {t}",fi:"Väite: {t}"},
    aQuestion: {en:"Question: {t}",de:"Frage: {t}",fr:"Question : {t}",es:"Pregunta: {t}",pt:"Pergunta: {t}",it:"Domanda: {t}",nl:"Vraag: {t}",sv:"Fråga: {t}",da:"Spørgsmål: {t}",no:"Spørsmål: {t}",fi:"Kysymys: {t}"},
    aSentence: {en:"Story sentence {i}: {t}",de:"Satz {i} der Geschichte: {t}",fr:"Phrase {i} de l’histoire : {t}",es:"Oración {i} del cuento: {t}",pt:"Frase {i} da história: {t}",it:"Frase {i} della storia: {t}",nl:"Zin {i} van het verhaal: {t}",sv:"Mening {i} i berättelsen: {t}",da:"Sætning {i} i historien: {t}",no:"Setning {i} i historien: {t}",fi:"Tarinan lause {i}: {t}"},
    aBoard: {en:"Solved cases: {n}",de:"Gelöste Fälle: {n}",fr:"Enquêtes résolues : {n}",es:"Casos resueltos: {n}",pt:"Casos resolvidos: {n}",it:"Casi risolti: {n}",nl:"Opgeloste zaken: {n}",sv:"Lösta fall: {n}",da:"Opklarede sager: {n}",no:"Løste saker: {n}",fi:"Ratkaistut tapaukset: {n}"},
    srFog: {en:"Not in the story.",de:"Steht nicht in der Geschichte.",fr:"Ce n’est pas dans l’histoire.",es:"No está en el cuento.",pt:"Não está na história.",it:"Non c’è nella storia.",nl:"Staat niet in het verhaal.",sv:"Står inte i berättelsen.",da:"Står ikke i historien.",no:"Står ikke i historien.",fi:"Ei ole tarinassa."},
    srFound: {en:"Found in sentence {i}. It does not prove it.",de:"Gefunden in Satz {i}. Es beweist das nicht.",fr:"Trouvé dans la phrase {i}. Ça ne le prouve pas.",es:"Está en la oración {i}. No lo demuestra.",pt:"Está na frase {i}. Não prova isso.",it:"Trovato nella frase {i}. Non lo dimostra.",nl:"Gevonden in zin {i}. Het bewijst het niet.",sv:"Hittad i mening {i}. Den bevisar det inte.",da:"Fundet i sætning {i}. Det beviser det ikke.",no:"Funnet i setning {i}. Det beviser det ikke.",fi:"Löytyi lauseesta {i}. Se ei todista sitä."},
    srFoundQ: {en:"Found in sentence {i}. It does not answer the question.",de:"Gefunden in Satz {i}. Es beantwortet die Frage nicht.",fr:"Trouvé dans la phrase {i}. Ça ne répond pas à la question.",es:"Está en la oración {i}. No responde la pregunta.",pt:"Está na frase {i}. Não responde à pergunta.",it:"Trovato nella frase {i}. Non risponde alla domanda.",nl:"Gevonden in zin {i}. Het beantwoordt de vraag niet.",sv:"Hittad i mening {i}. Den svarar inte på frågan.",da:"Fundet i sætning {i}. Det svarer ikke på spørgsmålet.",no:"Funnet i setning {i}. Det svarer ikke på spørsmålet.",fi:"Löytyi lauseesta {i}. Se ei vastaa kysymykseen."},
    srOk: {en:"Found in sentence {i}. It fits.",de:"Gefunden in Satz {i}. Es passt.",fr:"Trouvé dans la phrase {i}. Ça colle.",es:"Está en la oración {i}. Sí encaja.",pt:"Está na frase {i}. Combina.",it:"Trovato nella frase {i}. Va bene.",nl:"Gevonden in zin {i}. Het klopt.",sv:"Hittad i mening {i}. Den passar.",da:"Fundet i sætning {i}. Det passer.",no:"Funnet i setning {i}. Det passer.",fi:"Löytyi lauseesta {i}. Se sopii."},
    setCase: {en:"Case",de:"Fall",fr:"Enquête",es:"Caso",pt:"Caso",it:"Caso",nl:"Zaak",sv:"Fall",da:"Sag",no:"Sak",fi:"Tapaus"},
    cProof: {en:"Proof",de:"Beweis",fr:"La preuve",es:"La prueba",pt:"A prova",it:"La prova",nl:"Bewijs",sv:"Bevis",da:"Bevis",no:"Bevis",fi:"Todiste"},
    cDetail: {en:"Proof or just a detail?",de:"Beweis oder nur eine Einzelheit?",fr:"Preuve ou simple détail ?",es:"¿Prueba o solo un detalle?",pt:"Prova ou só um detalhe?",it:"Prova o solo un dettaglio?",nl:"Bewijs of alleen een detail?",sv:"Bevis eller bara en detalj?",da:"Bevis eller bare en detalje?",no:"Bevis eller bare en detalj?",fi:"Todiste vai pelkkä yksityiskohta?"},
    cQuestions: {en:"Questions",de:"Fragen",fr:"Questions",es:"Preguntas",pt:"Perguntas",it:"Domande",nl:"Vragen",sv:"Frågor",da:"Spørgsmål",no:"Spørsmål",fi:"Kysymykset"},
  },/*STRINGS-END*/

  defaults: { case: 'proof' },
  settings: [
    { key: 'case', type: 'choice', labelKey: 'setCase', options: [{ value: 'proof', labelKey: 'cProof' }, { value: 'detail', labelKey: 'cDetail' }, { value: 'questions', labelKey: 'cQuestions' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._board = {}; this._nudged = false; this._anim = null;
    injectMarloLensCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; this._anim = null; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return MarloLensCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return MarloLensCore.levelOf(this._setting('case')); },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = MarloLensCore.rounds(this._loc()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = MarloLensCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev, pass);
      this._prev = P.order; this._order = P.order.slice(); this._slots = P.slots; this._orderForPool = pool; this._pass = pass;
      this._board[this._key()] = 0;
    }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'marlolens.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t(this.st.level === 'questions' ? 'tQuestion' : 'tProof'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._at = at || 0;
    this.st = MarloLensCore.newState(this._loc(), this._level(), r, { slot: this._slots ? this._slots[r] : null });
    this._view = { note: '', ok: '' };
    if (!this._nudged) { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; },
  /* the claim (or question) as plain text, without its closing stop — for the hint and the success line */
  _claimText: function () { var c = this.st.level === 'questions' ? this.st.F.q : this.st.F.claim; return (c.pre + c.word + c.post).replace(/[\s ]*[.!?]\s*$/, '').trim(); },
  _fullText: function (c) { return (c.pre + c.word + c.post).trim(); },

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
    var wrap = api.el('div', 'mm-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="mm-top"><div class="mm-claim"></div><div class="mm-dock" aria-hidden="true"></div><div class="mm-marlo"></div></div><div class="mm-story"></div><div class="mm-tray"></div><div class="mm-foot"></div><p class="mm-note" aria-live="polite"></p><div class="mm-board"></div><div class="mm-lens"></div><p class="mm-sr" aria-live="polite"></p>';
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
  _dims: function () { var W = this._width(), B = MarloLensCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, pic: B.wide ? 96 : 64, lens: B.wide ? 120 : B.xs ? 60 : B.tiny ? 76 : 96 }; },
  _img: function (pic, size) { return '<img src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.mm-sr'); if (el) el.textContent = s; },

  /* where the lens is: it travels over the story only while it sweeps (a sentence index, 'fog' or 'claim');
     at rest it sits in its dock, because a lens parked on the story would cover the words a child has to read */
  _lensAt: function () { var a = this._anim; return a == null ? 'park' : a === 'fog' ? 2 : a; },
  _paint_: function () {
    var C = MarloLensCore, st = this.st, D = this._dims(), v = this._view, self = this, F = st.F, help = C.help(st);
    var lensAt = this._lensAt(), fog = !this._anim && st.last === 'fog' || this._anim === 'fog';
    this._wrap.className = 'mm-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' case-' + st.level + (help ? ' is-help' : '');
    /* the claim or the question, its key word in a focus ring (readable always: a child cannot test evidence for a claim it cannot read) */
    var claim = this._qs('.mm-claim'), cl = st.level === 'questions' ? F.q : F.claim, sharp = st.done && !this._anim;
    claim.className = 'mm-claim' + (st.level === 'questions' ? ' is-question' : '') + (sharp ? ' is-sharp' : '') + (help ? ' is-pulse' : '') + (!sharp && (st.last === 'notProof' || st.last === 'notAnswer') && !this._anim ? ' is-slip' : '');
    claim.setAttribute('role', 'note'); claim.setAttribute('aria-label', this._t(st.level === 'questions' ? 'aQuestion' : 'aClaim', { t: this._fullText(cl) }));
    claim.innerHTML = '<span class="mm-ctext">' + esc(cl.pre) + '<span class="mm-word">' + esc(cl.word) + '</span>' + esc(cl.post) + '</span>' +
      (sharp ? '<span class="mm-seal" aria-hidden="true"><svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="18" fill="#E9B23C" stroke="#B9831F" stroke-width="3"/><path d="M12 20.5l5.5 5.5L28.5 14" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' : '');
    var dock = this._qs('.mm-dock'); dock.style.width = (D.lens + 12) + 'px'; dock.style.height = (D.xs ? Math.round(D.lens * 0.8) : D.lens + 30) + 'px';
    var marlo = this._qs('.mm-marlo'); marlo.className = 'mm-marlo' + (sharp ? ' is-nod' : ''); marlo.setAttribute('aria-hidden', 'true');
    marlo.innerHTML = this._img('forest creatures/raccoon', D.pic); marlo.style.width = marlo.style.height = (D.pic + 8) + 'px';
    /* the story: three sentences, the story's picture in the corner */
    var story = this._qs('.mm-story'); story.innerHTML = '';
    if (F.pic && !D.tiny) { var pc = document.createElement('div'); pc.className = 'mm-pic'; pc.setAttribute('aria-hidden', 'true'); pc.innerHTML = this._img(F.pic, D.pic); pc.style.width = pc.style.height = (D.pic + 8) + 'px'; story.appendChild(pc); }
    var key = help ? C.keySentence(st) : null, found = (!this._anim && !help && (st.last === 'notProof' || st.last === 'notAnswer' || st.done)) ? st.found : null;
    F.story.forEach(function (s, i) {
      var p = document.createElement('p'); p.className = 'mm-sent' + (found === i ? ' is-found' : '') + (key === i ? ' is-key' : '') + (self._anim === i ? ' is-under' : '');
      p.setAttribute('aria-label', self._t('aSentence', { i: i + 1, t: s })); p.textContent = s; story.appendChild(p);
    });
    /* the clue cards */
    var tray = this._qs('.mm-tray'); tray.innerHTML = '';
    st.cards.forEach(function (c, i) {
      var b = self._btn('mm-card' + (st.clip === i ? ' is-in' : '') + (st.done && i === st.right ? ' is-proved' : ''), 'card-' + i, self._t('aClue', { t: c.t }), '<span>' + esc(c.t) + '</span>');
      b.disabled = st.done; b.addEventListener('click', function () { self._drop(i); }); tray.appendChild(b);
    });
    var foot = this._qs('.mm-foot'); foot.innerHTML = '';
    var chk = this._btn('mm-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done || !!this._anim; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.mm-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'mm-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'mm-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'mm-note'; }
    /* the case board: one seal per case solved this pass */
    var n = this._board[this._key()] || 0, board = this._qs('.mm-board'); board.setAttribute('role', 'img'); board.setAttribute('aria-label', this._t('aBoard', { n: n }));
    var bh = ''; for (var k = 0; k < this._pool.length; k++) bh += '<i class="mm-tab' + (k < n ? ' is-on' : '') + '"></i>'; board.innerHTML = bh;
    /* the lens */
    var lens = this._qs('.mm-lens'), held = st.clip != null;
    lens.className = 'mm-lens' + (held ? ' is-held' : '') + (fog ? ' is-fog' : '') + (lensAt === 'claim' ? ' at-claim' : lensAt === 'park' ? ' at-park' : ' at-sent');
    lens.setAttribute('role', 'img'); lens.setAttribute('aria-label', held ? this._t('aLens', { t: st.cards[st.clip].t }) : this._t('aLensEmpty'));
    var L = D.lens;
    lens.style.width = (L + 12) + 'px'; lens.style.height = (L + 30) + 'px';
    lens.innerHTML = '<svg viewBox="0 0 132 150" width="' + (L + 12) + '" height="' + (L + 30) + '" aria-hidden="true">' +
      '<rect x="58" y="118" width="16" height="30" rx="6" fill="#7A4E2A" transform="rotate(-28 66 118)"/>' +
      '<circle cx="66" cy="62" r="56" fill="' + (fog ? 'rgba(214,220,226,.92)' : 'rgba(225,240,255,.22)') + '" stroke="#C9952E" stroke-width="10"/>' +
      '<circle cx="66" cy="62" r="49" fill="none" stroke="#F3D68A" stroke-width="2"/>' +
      (fog ? '<path d="M32 66c8-10 18-10 24-2 6-10 18-10 24 0 8-6 16-2 18 6" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".9"/>' : '<path d="M38 40c8-10 20-14 30-12" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".75"/>') +
      (held ? '<rect x="57" y="112" width="18" height="12" rx="4" fill="#F2784B" transform="rotate(-28 66 118)"/>' : '') + '</svg>';
    this._placeLens(lensAt, L);
  },
  /* move the lens over its target, kept inside the card */
  _placeLens: function (at, L) {
    var wrap = this._wrap, lens = this._qs('.mm-lens'), wr = wrap.getBoundingClientRect(), x, y, R = (L + 12) / 2;
    if (at === 'claim') { var w = this._qs('.mm-word').getBoundingClientRect(); x = w.left + w.width / 2; y = w.top + w.height / 2; }
    else if (at === 'park') { var d0 = this._qs('.mm-dock').getBoundingClientRect(); x = d0.left + d0.width / 2; y = d0.top + d0.height / 2 - 8; }
    else {
      /* just past the last word of the sentence (the box runs under the story picture; the text does not) */
      var el = this._wrap.querySelectorAll('.mm-sent')[at], p = el.getBoundingClientRect(), last = null;
      try { var rg = document.createRange(); rg.selectNodeContents(el); var rs = rg.getClientRects(); last = rs.length ? rs[rs.length - 1] : null; } catch (e) {}
      if (last) { x = last.right + R * 0.35; y = last.top + last.height / 2; } else { x = p.right - R * 0.55; y = p.top + p.height / 2; }
    }
    var cx = Math.max(R, Math.min(wr.width - R, x - wr.left)), cy = y - wr.top;
    lens.style.left = Math.round(cx - R) + 'px'; lens.style.top = Math.round(cy - R * (62 / 66)) + 'px';
  },

  /* ---------------- the hand ---------------- */
  _drop: function (i) { if (this._anim) return; var r = MarloLensCore.drop(this.st, i); if (r === 'no') return; this.api.sound(r === 'in' ? 520 : 300); this._clearHelp(); this._paint(); },

  /* ---------------- Check: sweep, then focus ---------------- */
  _check: function () {
    var C = MarloLensCore, st = this.st, v = this._view, self = this;
    if (st.done || this._anim) return;
    this._nudged = true;
    var a = C.check(st);
    if (a.result === 'empty') { v.nudge = false; v.note = this._t('hintEmpty'); this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    var path = C.sweep(st), finish = function () {
      self._anim = null;
      if (a.result === 'ok') { self._success(); return; }
      var h = C.hint(st); v.nudge = false; v.note = self._t(h.key, { claim: self._claimText() });
      self.api.sound(180);
      self._sr(a.kind === 'fog' ? self._t('srFog') : self._t(st.level === 'questions' ? 'srFoundQ' : 'srFound', { i: a.found + 1 }));
      self._paint(); self.api.announce(v.note);
    };
    if (this.FAST) { finish(); return; }
    var step = 0, hop = function () {
      if (step >= path.length) { finish(); return; }
      self._anim = path[step]; step++; self.api.sound(self._anim === 'fog' ? 160 : self._anim === 'claim' ? 660 : 440); self._paint();
      self._later(hop, self._anim === 'claim' ? 420 : step === path.length - 1 && path[path.length - 1] === 'claim' ? 320 : 170);
    };
    hop();
  },
  _success: function () {
    var st = this.st, v = this._view;
    v.ok = st.level === 'questions' ? this._t('okQuestion', { question: this._fullText(st.F.q), answer: st.F.ans.t.replace(/[.!]\s*$/, '') }) : this._t('okProof', { claim: this._claimText() });
    this._board[this._key()] = (this._board[this._key()] || 0) + 1;
    this.api.sound(988); this._sr(this._t('srOk', { i: st.found + 1 })); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectMarloLensCSS() {
  if (typeof document === 'undefined' || document.getElementById('mm-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', GOLD = '#E9B23C';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.mm-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .mm-wrap:focus{outline:none;}'
  /* the claim card and Marlo */
  + '.mm-top{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;}'
  + '.mm-claim{position:relative;flex:1;min-width:0;display:flex;align-items:center;justify-content:center;min-height:84px;padding:10px 16px;box-sizing:border-box;border-radius:14px;background:#FFF8EC;box-shadow:0 3px 0 #E3CFA8,inset 0 0 0 2px #E8DCC2;font-family:' + B + ';font-weight:800;font-size:22px;line-height:1.3;color:' + INK + ';text-align:center;}'
  + '.mm-word{display:inline-block;margin:0 2px;padding:0 8px;border-radius:12px;box-shadow:0 0 0 2px #FFF8EC,0 0 0 4px #B9AFA0;outline:2px dashed #B9AFA0;outline-offset:3px;font-family:' + H + ';font-size:28px;color:' + INK + ';transition:box-shadow .35s,outline-color .35s;}'
  + '.mm-claim.is-sharp .mm-word{color:#146B5E;outline:3px solid ' + GOLD + ';outline-offset:3px;box-shadow:inset 0 -4px 0 ' + GOLD + ';} .mm-claim.is-pulse .mm-word{animation:mmPulse 1.2s ease-in-out infinite;} .mm-claim.is-slip .mm-word{animation:mmSlip .5s ease-in-out;}'
  + '@keyframes mmPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.12);}} @keyframes mmSlip{0%,100%{transform:none;}30%{transform:translateX(-4px);}70%{transform:translateX(4px);}}'
  + '.mm-seal{position:absolute;right:-10px;top:-12px;animation:mmThump .4s ease-out;} @keyframes mmThump{0%{transform:scale(1.8);opacity:0;}100%{transform:scale(1);opacity:1;}}'
  + '.mm-marlo{flex:none;display:flex;align-items:center;justify-content:center;border-radius:14px;background:#F5EEDC;transition:transform .5s;} .mm-marlo.is-nod{animation:mmNod .8s ease-in-out;} @keyframes mmNod{0%,100%{transform:none;}35%{transform:rotate(-8deg) translateY(4px);}70%{transform:rotate(4deg);}}'
  + '.mm-dock{flex:none;} .mm-wrap.is-tiny .mm-marlo{display:none;}'
  + '.mm-marlo img,.mm-pic img{display:block;object-fit:contain;pointer-events:none;}'
  /* the story */
  + '.mm-story{position:relative;width:100%;padding:14px 18px;box-sizing:border-box;border-radius:14px;background:#FFFDF7;box-shadow:0 3px 0 #E3CFA8,inset 0 0 0 2px #E8DCC2;}'
  + '.mm-pic{float:right;display:flex;align-items:center;justify-content:center;margin:0 0 6px 12px;border-radius:12px;background:#F5EEDC;}'
  + '.mm-sent{margin:0;padding:6px 8px;border-radius:8px;font-family:' + B + ';font-weight:700;font-size:20px;line-height:1.55;color:' + INK + ';transition:background .25s;}'
  + '.mm-sent.is-under{background:#FFF3D1;} .mm-sent.is-found{background:#FFE6A3;box-shadow:inset 4px 0 0 ' + GOLD + ';} .mm-sent.is-key{background:#FFE6A3;text-decoration:underline;text-decoration-color:#C9952E;text-decoration-thickness:3px;text-underline-offset:4px;}'
  /* the lens */
  + '.mm-lens{position:absolute;left:0;top:0;pointer-events:none;z-index:3;transition:left .16s ease,top .16s ease;} .mm-lens svg{display:block;filter:drop-shadow(0 3px 4px rgba(60,40,10,.25));} .mm-wrap.is-fast .mm-lens{transition:none;}'
  + '.mm-lens.at-claim{transition:left .4s ease,top .4s ease;}'
  /* the clue cards */
  + '.mm-tray{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;} .mm-wrap.is-narrow .mm-tray{grid-template-columns:1fr;gap:8px;}'
  + '.mm-card{min-height:64px;padding:8px 12px;border:0;border-radius:12px;background:#FFF8EC;box-shadow:0 3px 0 #E3CFA8,inset 0 0 0 2px #E8DCC2;font-family:' + B + ';font-weight:800;font-size:18px;line-height:1.25;color:' + INK + ';text-align:center;cursor:pointer;}'
  + '.mm-card.is-in{background:#FFE9A8;box-shadow:0 0 0 4px #F2784B;} .mm-card:disabled{cursor:default;opacity:.6;} .mm-card.is-proved{opacity:1;background:#FFE9A8;box-shadow:0 0 0 4px ' + GOLD + ';}'
  + '.mm-wrap.is-narrow .mm-card{min-height:52px;font-size:17px;padding:6px 10px;}'
  + '.mm-foot{display:flex;justify-content:center;width:100%;}'
  + '.mm-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .mm-check:disabled{opacity:.5;cursor:default;}'
  + '.mm-note{margin:0;min-height:1.3em;max-width:620px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .mm-note.is-hint{color:#8A3B1F;} .mm-note.is-nudge{color:#5E6770;} .mm-wrap.is-narrow .mm-note{font-size:17px;}'
  /* the case board */
  + '.mm-board{display:flex;gap:6px;justify-content:center;padding:6px 12px;border-radius:10px;background:#C99A5B;box-shadow:inset 0 0 0 2px #A87B42;}'
  + '.mm-tab{display:block;width:18px;height:18px;border-radius:50%;background:#B2864D;box-shadow:inset 0 0 0 2px #9C7240;} .mm-tab.is-on{background:' + GOLD + ';box-shadow:0 0 0 2px #FFF4C7;}'
  + '.mm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.mm-wrap.is-narrow .mm-claim{min-height:68px;font-size:19px;padding:8px 10px;} .mm-wrap.is-narrow .mm-word{font-size:24px;}'
  + '.mm-wrap.is-narrow .mm-story{padding:10px 12px;} .mm-wrap.is-narrow .mm-sent{font-size:18px;line-height:1.45;padding:4px 6px;}'
  + '.mm-wrap.is-tiny .mm-sent{font-size:17px;line-height:1.35;padding:3px 6px;} .mm-wrap.is-tiny .mm-story{padding:8px 10px;} .mm-wrap.is-tiny .mm-card{min-height:46px;font-size:16px;padding:4px 8px;} .mm-wrap.is-tiny .mm-tray{gap:6px;} .mm-wrap.is-tiny .mm-claim{min-height:60px;}'
  + '.mm-wrap.is-tiny{gap:8px;} .mm-wrap.is-tiny .mm-check{min-width:112px;min-height:50px;padding:6px 14px;font-size:20px;}'
  + '.mm-wrap.is-xs .mm-sent{font-size:16px;line-height:1.3;padding:2px 6px;} .mm-wrap.is-xs .mm-card{min-height:44px;font-size:15px;padding:3px 8px;} .mm-wrap.is-xs .mm-story{padding:6px 8px;}'
  + '.mm-wrap.is-xs{gap:6px;} .mm-wrap.is-xs .mm-claim{min-height:50px;padding:6px 8px;} .mm-wrap.is-xs .mm-check{min-height:46px;} .mm-wrap.is-xs .mm-claim{font-size:18px;} .mm-wrap.is-xs .mm-word{font-size:22px;}'
  + '@media (prefers-reduced-motion: reduce){.mm-lens,.mm-word{transition:none;} .mm-claim .mm-word{animation:none !important;}}'
  + '.mm-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'mm-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.MarloMagnifierActivity = MarloMagnifierActivity;
