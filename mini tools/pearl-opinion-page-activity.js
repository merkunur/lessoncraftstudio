/* =====================================================================
   pearl-opinion-page-activity.js — ACTIVITY #175 of the one-by-one
   rebuild: "Pearl's Opinion Page" (RI.2.8) → THE SIGN THAT STANDS ON ITS
   REASONS. Model: reason-sign-core.js; pages: reason-sign-data.js.
   Design: docs/activities-rebuild/designs/175-pearl-opinion-page.md
   ---------------------------------------------------------------------
   Pearl the seal has painted her point on a wooden sign lying on the
   beach. The child slides a card under it (Level 2: under the sign it
   belongs to) and presses the tide button — that is the Check. Only then
   does every card show what it really is: a REASON becomes a post that
   lifts the sign out of the water; a RESTATEMENT becomes a second copy of
   the sign stacked on top (flat, soaked); an OFF-TOPIC card becomes a post
   planted beside the sign, holding nothing; a reason for the other point
   leans against the wrong sign; in Level 3 one reason holds the sign but
   it tilts. A second miss prints every card behind the point with the
   word "because", so the child can read which ones make sense.
   Next appears .OK_MS after success.
   ===================================================================== */
var PearlOpinionPageActivity = {
  id: 'pearl-opinion-page-activity',
  /* the drawn apparatus (beach, sign boards, posts, sockets, sea, dunes): declared for the hierarchy audit */
  apparatusClasses: ['ps-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Pearl's Opinion Page","de":"Pearls Meinungsseite","fr":"La page d’opinion de Pearl","es":"La página de opiniones de Pearl","pt":"A página de opiniões da Pérola","it":"La pagina delle opinioni di Perla","nl":"De meningspagina van Parel","sv":"Pärlas åsiktssida","da":"Perles meningsside","no":"Perles meningsside","fi":"Helmin mielipidesivu"},
    instruction: {"en":"Back up Pearl's point: slide a real reason under the sign. Then let the tide test it.","de":"Stütze Pearls Meinung: Schieb einen echten Grund unter das Schild. Dann prüft die Flut, ob es hält.","fr":"Appuie l’avis de Pearl : glisse une vraie raison sous le panneau. Puis laisse la marée le tester.","es":"Apoya la opinión de Pearl: pon una razón de verdad bajo el letrero. Luego deja que la marea lo pruebe.","pt":"Apoie a opinião da Pérola: coloque uma razão de verdade embaixo da placa. Depois deixe a maré testar.","it":"Sostieni l’opinione di Perla: metti un vero motivo sotto il cartello. Poi lascia che la marea lo metta alla prova.","nl":"Steun de mening van Parel: schuif een echte reden onder het bord. Laat dan het water het testen.","sv":"Stöd Pärlas åsikt: skjut in ett riktigt skäl under skylten. Låt sedan vågen testa den.","da":"Støt Perles mening: skub en rigtig grund ind under skiltet. Lad så bølgen teste det.","no":"Støtt Perles mening: skyv en ekte grunn inn under skiltet. La så bølgen teste det.","fi":"Tue Helmin mielipidettä: liu’uta oikea perustelu kyltin alle. Anna sitten aallon testata sitä."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    qOne: {"en":"Which card backs up Pearl's point?","de":"Welche Karte stützt Pearls Meinung?","fr":"Quelle carte appuie l’avis de Pearl ?","es":"¿Qué tarjeta apoya la opinión de Pearl?","pt":"Qual carta apoia a opinião da Pérola?","it":"Quale carta sostiene l’opinione di Perla?","nl":"Welk kaartje steunt de mening van Parel?","sv":"Vilket kort stöder Pärlas åsikt?","da":"Hvilket kort støtter Perles mening?","no":"Hvilket kort støtter Perles mening?","fi":"Mikä kortti tukee Helmin mielipidettä?"},
    qTwo: {"en":"Put each reason under the point it backs up.","de":"Leg jeden Grund unter die Meinung, die er stützt.","fr":"Place chaque raison sous l’avis qu’elle appuie.","es":"Pon cada razón bajo la opinión que apoya.","pt":"Coloque cada razão embaixo da opinião que ela apoia.","it":"Metti ogni motivo sotto l’opinione che sostiene.","nl":"Leg elke reden onder de mening die hij steunt.","sv":"Lägg varje skäl under den åsikt det stöder.","da":"Læg hver grund under den mening, den støtter.","no":"Legg hver grunn under meningen den støtter.","fi":"Laita jokainen perustelu oikean mielipiteen alle."},
    qLegs: {"en":"Find TWO reasons that back up Pearl's point.","de":"Finde ZWEI Gründe, die Pearls Meinung stützen.","fr":"Trouve DEUX raisons qui appuient l’avis de Pearl.","es":"Encuentra DOS razones que apoyen la opinión de Pearl.","pt":"Encontre DUAS razões que apoiem a opinião da Pérola.","it":"Trova DUE motivi che sostengono l’opinione di Perla.","nl":"Zoek TWEE redenen die de mening van Parel steunen.","sv":"Hitta TVÅ skäl som stöder Pärlas åsikt.","da":"Find TO grunde, der støtter Perles mening.","no":"Finn TO grunner som støtter Perles mening.","fi":"Etsi KAKSI perustelua, jotka tukevat Helmin mielipidettä."},
    hintEmpty: {"en":"Slide a card under the sign first.","de":"Schieb zuerst eine Karte unter das Schild.","fr":"Glisse d’abord une carte sous le panneau.","es":"Primero pon una tarjeta bajo el letrero.","pt":"Primeiro coloque uma carta embaixo da placa.","it":"Prima metti una carta sotto il cartello.","nl":"Schuif eerst een kaartje onder het bord.","sv":"Skjut först in ett kort under skylten.","da":"Skub først et kort ind under skiltet.","no":"Skyv først et kort inn under skiltet.","fi":"Liu’uta ensin kortti kyltin alle."},
    hintEmpty2: {"en":"Put a card under each sign first.","de":"Leg zuerst unter jedes Schild eine Karte.","fr":"Place d’abord une carte sous chaque panneau.","es":"Primero pon una tarjeta bajo cada letrero.","pt":"Primeiro coloque uma carta embaixo de cada placa.","it":"Prima metti una carta sotto ogni cartello.","nl":"Leg eerst onder elk bord een kaartje.","sv":"Lägg först ett kort under varje skylt.","da":"Læg først et kort under hvert skilt.","no":"Legg først et kort under hvert skilt.","fi":"Laita ensin kortti jokaisen kyltin alle."},
    hintPickSign: {"en":"Now tap the sign it backs up.","de":"Tippe jetzt auf das Schild, das sie stützt.","fr":"Touche maintenant le panneau qu’elle appuie.","es":"Ahora toca el letrero al que apoya la tarjeta.","pt":"Agora toque na placa que ela apoia.","it":"Ora tocca il cartello che la carta sostiene.","nl":"Tik nu op het bord waar het kaartje bij hoort.","sv":"Tryck nu på skylten som kortet stöder.","da":"Tryk nu på det skilt, kortet støtter.","no":"Trykk nå på skiltet som kortet støtter.","fi":"Napauta nyt kylttiä, jota kortti tukee."},
    hintRestate: {"en":"That card says the point again. What is a reason WHY?","de":"Diese Karte sagt die Meinung nur noch einmal. Was ist ein Grund, WARUM?","fr":"Cette carte redit l’avis. Quelle raison dit POURQUOI ?","es":"Esa tarjeta dice la opinión otra vez. ¿Cuál dice POR QUÉ?","pt":"Essa carta repete a opinião. Qual razão diz POR QUÊ?","it":"Questa carta ripete l’opinione. Quale motivo dice PERCHÉ?","nl":"Dit kaartje zegt de mening nog een keer. Wat is een reden WAAROM?","sv":"Det kortet säger åsikten en gång till. Vad är ett skäl VARFÖR?","da":"Det kort siger meningen igen. Hvad er en grund til HVORFOR?","no":"Det kortet sier meningen en gang til. Hva er en grunn til HVORFOR?","fi":"Tuo kortti sanoo mielipiteen uudestaan. Mikä perustelu kertoo MIKSI?"},
    hintOff: {"en":"That card is about something else. Which card tells WHY?","de":"Diese Karte handelt von etwas anderem. Welche Karte sagt, WARUM?","fr":"Cette carte parle d’autre chose. Quelle carte dit POURQUOI ?","es":"Esa tarjeta habla de otra cosa. ¿Qué tarjeta dice POR QUÉ?","pt":"Essa carta fala de outra coisa. Qual carta diz POR QUÊ?","it":"Questa carta parla d’altro. Quale carta dice PERCHÉ?","nl":"Dit kaartje gaat over iets anders. Welk kaartje zegt WAAROM?","sv":"Det kortet handlar om något annat. Vilket kort säger VARFÖR?","da":"Det kort handler om noget andet. Hvilket kort siger HVORFOR?","no":"Det kortet handler om noe annet. Hvilket kort sier HVORFOR?","fi":"Tuo kortti kertoo jostain muusta. Mikä kortti kertoo MIKSI?"},
    hintWrong: {"en":"That reason belongs to the other point.","de":"Dieser Grund gehört zur anderen Meinung.","fr":"Cette raison va avec l’autre avis.","es":"Esa razón es de la otra opinión.","pt":"Essa razão é da outra opinião.","it":"Questo motivo va con l’altra opinione.","nl":"Die reden hoort bij de andere mening.","sv":"Det skälet hör till den andra åsikten.","da":"Den grund hører til den anden mening.","no":"Den grunnen hører til den andre meningen.","fi":"Tuo perustelu kuuluu toiseen mielipiteeseen."},
    hintOneLeg: {"en":"One strong leg! Pearl's point needs one more reason.","de":"Ein starkes Bein! Pearls Meinung braucht noch einen Grund.","fr":"Un pied solide ! L’avis de Pearl a besoin d’une raison de plus.","es":"¡Una pata firme! La opinión de Pearl necesita otra razón.","pt":"Uma perna firme! A opinião da Pérola precisa de mais uma razão.","it":"Una gamba robusta! L’opinione di Perla ha bisogno di un altro motivo.","nl":"Eén stevige poot! De mening van Parel heeft nog een reden nodig.","sv":"Ett stadigt ben! Pärlas åsikt behöver ett skäl till.","da":"Ét stærkt ben! Perles mening har brug for én grund mere.","no":"Ett sterkt bein! Perles mening trenger én grunn til.","fi":"Yksi vahva jalka! Helmin mielipide tarvitsee vielä yhden perustelun."},
    hintMiss2: {"en":"Read each card with “because”. Which one makes sense?","de":"Lies jede Karte mit „denn“. Welche ergibt Sinn?","fr":"Lis chaque carte avec « parce que ». Laquelle a du sens ?","es":"Lee cada tarjeta con «porque». ¿Cuál tiene sentido?","pt":"Leia cada carta com “porque”. Qual faz sentido?","it":"Leggi ogni carta con «perché». Quale ha senso?","nl":"Lees elk kaartje met ‘want’. Welk klopt?","sv":"Läs varje kort med ”för”. Vilket låter rätt?","da":"Læs hvert kort med »for«. Hvilket giver mening?","no":"Les hvert kort med «for». Hvilket gir mening?","fi":"Lue jokainen kortti koska-sanan kanssa. Mikä kuulostaa järkevältä?"},
    okOne: {"en":"Backed up! {line}","de":"Gut gestützt! {line}","fr":"Bien appuyé ! {line}","es":"¡Bien apoyada! {line}","pt":"Bem apoiada! {line}","it":"Ben sostenuta! {line}","nl":"Goed gesteund! {line}","sv":"Väl stöttad! {line}","da":"Godt støttet! {line}","no":"Godt støttet! {line}","fi":"Hyvin perusteltu! {line}"},
    okTwo: {"en":"Both points are backed up!","de":"Beide Meinungen sind gestützt!","fr":"Les deux avis sont appuyés !","es":"¡Las dos opiniones están apoyadas!","pt":"As duas opiniões estão apoiadas!","it":"Tutte e due le opinioni sono sostenute!","nl":"Beide meningen zijn gesteund!","sv":"Båda åsikterna är stöttade!","da":"Begge meninger er støttet!","no":"Begge meningene er støttet!","fi":"Molemmat mielipiteet on perusteltu!"},
    okLegs: {"en":"Standing strong on two reasons! {r1} {r2}","de":"Steht fest auf zwei Gründen! {r1} {r2}","fr":"Bien solide sur deux raisons ! {r1} {r2}","es":"¡Firme sobre dos razones! {r1} {r2}","pt":"Firme em duas razões! {r1} {r2}","it":"Ben salda su due motivi! {r1} {r2}","nl":"Stevig op twee redenen! {r1} {r2}","sv":"Står stadigt på två skäl! {r1} {r2}","da":"Står fast på to grunde! {r1} {r2}","no":"Står støtt på to grunner! {r1} {r2}","fi":"Seisoo tukevasti kahden perustelun varassa! {r1} {r2}"},
    setLevel: {"en":"Level","de":"Stufe","fr":"Niveau","es":"Nivel","pt":"Nível","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    lvOne: {"en":"Back it up","de":"Stütze sie","fr":"Appuie-le","es":"Apóyala","pt":"Apoie a opinião","it":"Sostienila","nl":"Steun hem","sv":"Stöd den","da":"Støt den","no":"Støtt den","fi":"Tue sitä"},
    lvTwo: {"en":"Which point?","de":"Welche Meinung?","fr":"Quel avis ?","es":"¿Qué opinión?","pt":"Qual opinião?","it":"Quale opinione?","nl":"Welke mening?","sv":"Vilken åsikt?","da":"Hvilken mening?","no":"Hvilken mening?","fi":"Kumpi mielipide?"},
    lvLegs: {"en":"Two strong legs","de":"Zwei starke Beine","fr":"Deux pieds solides","es":"Dos patas firmes","pt":"Duas pernas firmes","it":"Due gambe robuste","nl":"Twee stevige poten","sv":"Två stadiga ben","da":"To stærke ben","no":"To sterke bein","fi":"Kaksi vahvaa jalkaa"},
    setBridge: {"en":"“Because” bridge","de":"„Denn“-Brücke","fr":"Le pont « parce que »","es":"Puente «porque»","pt":"Ponte “porque”","it":"Ponte «perché»","nl":"‘Want’-brug","sv":"”För”-bro","da":"»For«-bro","no":"«For»-bro","fi":"”Koska”-silta"},
    bOff: {"en":"Off","de":"Aus","fr":"Non","es":"No","pt":"Não","it":"No","nl":"Uit","sv":"Av","da":"Fra","no":"Av","fi":"Pois"},
    bOn: {"en":"On","de":"An","fr":"Oui","es":"Sí","pt":"Sim","it":"Sì","nl":"Aan","sv":"På","da":"Til","no":"På","fi":"Päällä"},
    aSign: {"en":"Pearl's point: {t}","de":"Pearls Meinung: {t}","fr":"L’avis de Pearl : {t}","es":"La opinión de Pearl: {t}","pt":"A opinião da Pérola: {t}","it":"L’opinione di Perla: {t}","nl":"De mening van Parel: {t}","sv":"Pärlas åsikt: {t}","da":"Perles mening: {t}","no":"Perles mening: {t}","fi":"Helmin mielipide: {t}"},
    aSocket: {"en":"Under the sign: {t}","de":"Unter dem Schild: {t}","fr":"Sous le panneau : {t}","es":"Bajo el letrero: {t}","pt":"Embaixo da placa: {t}","it":"Sotto il cartello: {t}","nl":"Onder het bord: {t}","sv":"Under skylten: {t}","da":"Under skiltet: {t}","no":"Under skiltet: {t}","fi":"Kyltin alla: {t}"},
    aSocketEmpty: {"en":"Empty place under the sign: {t}","de":"Freier Platz unter dem Schild: {t}","fr":"Place libre sous le panneau : {t}","es":"Lugar libre bajo el letrero: {t}","pt":"Lugar livre embaixo da placa: {t}","it":"Posto libero sotto il cartello: {t}","nl":"Lege plek onder het bord: {t}","sv":"Tom plats under skylten: {t}","da":"Tom plads under skiltet: {t}","no":"Ledig plass under skiltet: {t}","fi":"Tyhjä paikka kyltin alla: {t}"},
    aCard: {"en":"Card: {t}","de":"Karte: {t}","fr":"Carte : {t}","es":"Tarjeta: {t}","pt":"Carta: {t}","it":"Carta: {t}","nl":"Kaartje: {t}","sv":"Kort: {t}","da":"Kort: {t}","no":"Kort: {t}","fi":"Kortti: {t}"},
    aListen: {"en":"Listen","de":"Anhören","fr":"Écouter","es":"Escuchar","pt":"Ouvir","it":"Ascolta","nl":"Luisteren","sv":"Lyssna","da":"Lyt","no":"Lytt","fi":"Kuuntele"},
    aPearl: {"en":"Pearl the seal","de":"Pearl, die Robbe","fr":"Pearl le phoque","es":"Pearl la foca","pt":"Pérola, a foca","it":"Perla la foca","nl":"Parel de zeehond","sv":"Sälen Pärla","da":"Sælen Perle","no":"Selen Perle","fi":"Hylje Helmi"},
    aWet: {"en":"The sign is lying on the sand. It got wet.","de":"Das Schild liegt auf dem Sand. Es ist nass geworden.","fr":"Le panneau est couché sur le sable. Il est mouillé.","es":"El letrero está tirado en la arena. Se mojó.","pt":"A placa está deitada na areia. Ela se molhou.","it":"Il cartello è steso sulla sabbia. Si è bagnato.","nl":"Het bord ligt op het zand. Het is nat geworden.","sv":"Skylten ligger på sanden. Den blev blöt.","da":"Skiltet ligger på sandet. Det blev vådt.","no":"Skiltet ligger på sanden. Det ble vått.","fi":"Kyltti makaa hiekalla. Se kastui."},
    aTilt: {"en":"The sign stands on one post and tilts.","de":"Das Schild steht auf einem Pfosten und kippt.","fr":"Le panneau tient sur un seul poteau et penche.","es":"El letrero está sobre un solo poste y se inclina.","pt":"A placa está em um só poste e fica torta.","it":"Il cartello sta su un solo palo e pende.","nl":"Het bord staat op één paal en helt over.","sv":"Skylten står på en stolpe och lutar.","da":"Skiltet står på én stolpe og hælder.","no":"Skiltet står på én stolpe og heller.","fi":"Kyltti seisoo yhden tolpan varassa ja kallistuu."},
    aPost: {"en":"A post holds the sign up: {t}","de":"Ein Pfosten hält das Schild: {t}","fr":"Un poteau tient le panneau : {t}","es":"Un poste sostiene el letrero: {t}","pt":"Um poste segura a placa: {t}","it":"Un palo regge il cartello: {t}","nl":"Een paal houdt het bord omhoog: {t}","sv":"En stolpe håller upp skylten: {t}","da":"En stolpe holder skiltet oppe: {t}","no":"En stolpe holder skiltet oppe: {t}","fi":"Tolppa pitää kylttiä ylhäällä: {t}"},
    aCopy: {"en":"Just a second copy of the sign: {t}","de":"Nur eine zweite Kopie des Schilds: {t}","fr":"Juste une copie du panneau : {t}","es":"Solo una copia del letrero: {t}","pt":"Só uma cópia da placa: {t}","it":"Solo una copia del cartello: {t}","nl":"Alleen een tweede bord met hetzelfde: {t}","sv":"Bara en kopia av skylten: {t}","da":"Bare en kopi af skiltet: {t}","no":"Bare en kopi av skiltet: {t}","fi":"Vain kyltin kopio: {t}"},
    aLonely: {"en":"A post beside the sign holds nothing up: {t}","de":"Ein Pfosten neben dem Schild hält nichts: {t}","fr":"Un poteau à côté du panneau ne tient rien : {t}","es":"Un poste junto al letrero no sostiene nada: {t}","pt":"Um poste ao lado da placa não segura nada: {t}","it":"Un palo accanto al cartello non regge niente: {t}","nl":"Een paal naast het bord houdt niets omhoog: {t}","sv":"En stolpe bredvid skylten håller inte upp något: {t}","da":"En stolpe ved siden af skiltet holder ikke noget oppe: {t}","no":"En stolpe ved siden av skiltet holder ikke noe oppe: {t}","fi":"Kyltin vieressä oleva tolppa ei kannattele mitään: {t}"},
    aLean: {"en":"This post leans against the wrong sign: {t}","de":"Dieser Pfosten lehnt am falschen Schild: {t}","fr":"Ce poteau penche contre le mauvais panneau : {t}","es":"Este poste se apoya en el letrero equivocado: {t}","pt":"Este poste está encostado na placa errada: {t}","it":"Questo palo è appoggiato al cartello sbagliato: {t}","nl":"Deze paal leunt tegen het verkeerde bord: {t}","sv":"Den här stolpen lutar mot fel skylt: {t}","da":"Denne stolpe læner sig op ad det forkerte skilt: {t}","no":"Denne stolpen lener seg mot feil skilt: {t}","fi":"Tämä tolppa nojaa väärään kylttiin: {t}"}
  },/*STRINGS-END*/
  defaults: { level: 'one', bridge: 'off' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'one', labelKey: 'lvOne' }, { value: 'two', labelKey: 'lvTwo' }, { value: 'legs', labelKey: 'lvLegs' }] },
    { key: 'bridge', type: 'choice', labelKey: 'setBridge', options: [{ value: 'off', labelKey: 'bOff' }, { value: 'on', labelKey: 'bOn' }] }
  ],
  OK_MS: 500, FAST: false,
  TIDE_MS: 650, EBB_MS: 1300,
  PICS: { pearl: 'zoo animals/seal' },
  Q_KEY: { one: 'qOne', two: 'qTwo', legs: 'qLegs' },
  SHOW_KEY: { post: 'aPost', copy: 'aCopy', lonely: 'aLonely', lean: 'aLean' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._prev = null; this._pass = 0; this._levelKey = null;
    this._timers = []; this._ro = null; this._view = {}; this.dunes = 0;
    injectReasonSignCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._level()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return ReasonSignCore.levelOf(this._setting('level')); },
  _bridgeOn: function () { return this._setting('bridge') === 'on'; },
  /* the second miss shows the bridge word too: under the sign and in front of every card */
  _showBridge: function () { return this._bridgeOn() || !!(this.st && this.st.help && !this.st.done); },
  _loc: function () { return ReasonSignCore.locOf(this.api && this.api.lang); },
  _D: function () { return ReasonSignData[this._loc()]; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  /* French spacing: a narrow no-break space before ! ? : ; so the mark never wraps alone */
  _typo: function (s) { return this._loc() === 'fr' ? String(s).replace(/ ([!?:;»])/g, ' $1').replace(/« /g, '« ') : String(s); },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); },
  /* the locale's "because" in front of a card (French elides before a vowel: parce qu’un …) */
  _bridge: function (b) {
    if (this._loc() === 'fr' && /^[aeiouyhàâéèêîôû]/i.test(b)) return ['parce qu’', b];
    return [this._D().because, b];
  },
  _because: function (b) { var p = this._bridge(b); return p[0] + (/’$/.test(p[0]) ? '' : ' ') + p[1]; },
  _noStop: function (s) { return String(s).replace(/[.!]$/, ''); },

  /* ---------------- tasks ---------------- */
  /* the pool of a level: its eight rounds (Level 1 and 3: the eight points; Level 2: the eight pairs) */
  _ensurePool: function () {
    var lv = this._level();
    if (!this._pool || this._poolKey !== lv) { this._pool = [0, 1, 2, 3, 4, 5, 6, 7]; this._poolKey = lv; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = ReasonSignCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n, lv = this._level();
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(n, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'reason-sign.' + lv + '.' + k + '.' + (pass % 2), promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k, pass, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t(this.Q_KEY[this.st.level]); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k, pass, pos) {
    this._clearTimers();
    this.st = ReasonSignCore.newState(this._loc(), this._level(), k, pass || 0, pos || 0);
    this._view = { sel: null, note: '', soft: false, tide: false, shown: null, said: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) { var t = this.nextTask({ index: 0 }); t.setup(this); } this._render2(); this._watchWidth(); },
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
    var wrap = api.el('div', 'ps-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="ps-beach" data-qa="beach"></div><div class="ps-bar" data-qa="bar"></div><p class="ps-hint" data-qa="hint" aria-live="polite"></p><div class="ps-tray" data-qa="tray"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-k]'); if (!b || b.disabled || !wrap.contains(b)) return;
      var k = b.getAttribute('data-k');
      if (k === 'tide') self._tide();
      else if (k === 'listen') self._listen();
      else if (k.indexOf('card-') === 0) self._tapCard(k.slice(5));
      else if (k.indexOf('sock-') === 0) self._tapSocket(+k.slice(5));
    });
    wrap.addEventListener('keydown', function (e) {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); self._tide(); }
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width(), wide = W >= 600, cramp = W < 340;
    this._g = { W: W, wide: wide, cramp: cramp };
    this._wrap.setAttribute('lang', this._loc());
    this._wrap.className = 'ps-wrap is-' + st.level + (wide ? ' is-wide' : ' is-narrow') + (cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (v.tide ? ' is-tide' : '') + (v.shown ? ' is-shown' : '');
    this._paintBeach(); this._paintTray(); this._paintBar();
    var h = this._qs('.ps-hint');
    h.textContent = v.note || ''; h.className = 'ps-hint' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _card: function (id) { return ReasonSignCore.cardById(this.st, id); },
  /* words a card shares with its sign glow after a miss — the same simple 4-letter stem on both */
  _stems: function (s) { var o = {}; (String(s).toLowerCase().match(/\p{L}{4,}/gu) || []).forEach(function (w) { o[w.slice(0, 4)] = 1; }); return o; },
  _mark: function (text, other) {
    var st = other ? this._stems(other) : null, self = this;
    var safe = this._esc(this._typo(text));
    if (!st) return safe;
    return safe.replace(/\p{L}{4,}/gu, function (w) { return st[w.toLowerCase().slice(0, 4)] ? '<mark class="ps-glow">' + w + '</mark>' : w; });
  },

  /* ---- the beach: dunes, sign(s), sockets, the sea, Pearl ---- */
  _paintBeach: function () {
    var st = this.st, v = this._view, el = this._qs('.ps-beach'), self = this, sh = v.shown, html = '';
    var dunes = ''; for (var i = 0; i < Math.min(this.dunes, 12); i++) dunes += '<i></i>';
    html += '<div class="ps-dunes" aria-hidden="true">' + dunes + '</div>';
    html += '<div class="ps-signs">';
    st.round.signs.forEach(function (pid, si) {
      var point = self._D().points[pid].p, g = sh ? sh.signs[si] : null;
      var socks = []; st.sockets.forEach(function (s, i) { if (s.sign === si) socks.push(i); });
      var copies = '', mark = sh && !st.done;
      socks.forEach(function (i) { if (sh && sh.show[i] === 'copy') { var c = self._card(st.sockets[i].card); copies += '<button type="button" class="ps-board is-copy" data-k="sock-' + i + '" aria-label="' + self._esc(self._t('aCopy', { t: c.t })) + '"><span>' + self._mark(c.t, point) + '</span></button>'; } });
      var cls = 'ps-site ps-sign' + si + (g ? (g.dry ? ' is-up' : g.tilt ? ' is-tilt' : ' is-wet') : '');
      html += '<div class="' + cls + '">';
      html += '<div class="ps-boardwrap' + (copies ? ' has-copy' : '') + '">' + copies + '<div class="ps-board" role="note" aria-label="' + self._esc(self._t('aSign', { t: point })) + '"><span>' + (mark && copies ? self._mark(point, copies.replace(/<[^>]+>/g, ' ')) : self._esc(self._typo(point))) + '</span></div></div>';
      html += '<div class="ps-under">';
      socks.forEach(function (i) {
        var s = st.sockets[i], c = s.card ? self._card(s.card) : null, kind = sh && c ? sh.show[i] : null, inner = '', lab;
        html += '<div class="ps-col">' + (self._showBridge() ? '<span class="ps-because" aria-hidden="true">' + self._esc(self._D().because) + '</span>' : '');
        if (!c) { lab = self._t('aSocketEmpty', { t: self._noStop(point) }); inner = '<span class="ps-slot" aria-hidden="true"></span>'; }
        else if (kind === 'copy') { lab = self._t('aCopy', { t: c.t }); inner = '<span class="ps-slot is-left" aria-hidden="true"></span>'; }
        else {
          lab = kind ? self._t(self.SHOW_KEY[kind], { t: c.t }) : self._t('aSocket', { t: c.t });
          var glow = kind && kind !== 'post' && !st.done ? point : null;
          if (kind === 'lean') glow = self._D().points[c.point].p;
          inner = '<span class="ps-plank' + (kind ? ' is-' + kind : '') + '">' + (kind === 'post' || kind === 'lean' || kind === 'lonely' ? '<i class="ps-leg" aria-hidden="true"></i>' : '') + '<span class="ps-ptext">' + self._mark(c.t, glow) + '</span></span>';
        }
        html += '<button type="button" class="ps-socket' + (c ? ' is-full' : '') + (kind ? ' is-' + kind : '') + (v.sel && !c && st.level === 'two' ? ' is-target' : '') + '" data-k="sock-' + i + '" aria-label="' + self._esc(lab) + '"' + (st.done ? ' disabled' : '') + '>' + inner + '</button></div>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    if (this._g.wide) html += this._pearl();
    html += '<div class="ps-sea" aria-hidden="true"><i></i></div>';
    el.innerHTML = html;
  },
  _pearl: function () { return '<img class="ps-pearl' + (this.st.done ? ' is-happy' : '') + '" src="' + this._pic(this.PICS.pearl) + '" alt="' + this._esc(this._t('aPearl')) + '" draggable="false">'; },
  /* ---- the tray of cards ---- */
  _paintTray: function () {
    var st = this.st, v = this._view, el = this._qs('.ps-tray'), self = this, html = '', D = this._D(), help = st.help && !st.done;
    st.round.cards.forEach(function (c) {
      var placed = ReasonSignCore.socketOf(st, c.id) >= 0;
      if (placed) { html += '<span class="ps-card is-gone" aria-hidden="true"></span>'; return; }
      var txt = self._esc(self._typo(c.t));
      if (help) { var bp = self._bridge(D.points[c.point].b[c.key]); txt = '<b class="ps-bc">' + self._esc(bp[0]) + '</b>' + (/’$/.test(bp[0]) ? '' : ' ') + self._esc(self._typo(bp[1])); }
      html += '<button type="button" class="ps-card' + (v.sel === c.id ? ' is-sel' : '') + '" data-k="card-' + c.id + '" aria-label="' + self._esc(self._t('aCard', { t: c.t })) + '"' + (st.level === 'two' ? ' aria-pressed="' + (v.sel === c.id) + '"' : '') + (st.done ? ' disabled' : '') + '>' + txt + '</button>';
    });
    el.innerHTML = html;
  },
  _paintBar: function () {
    var st = this.st, v = this._view, el = this._qs('.ps-bar');
    var wave = '<svg viewBox="0 0 32 20" aria-hidden="true"><path d="M1 12c4-6 8-6 12 0s8 6 12 0 4-4 6-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M1 18c4-4 8-4 12 0s8 4 12 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".55"/></svg>';
    var spk = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    el.innerHTML = (this._g.wide ? '' : this._pearl()) + '<button type="button" class="ps-listen' + (v.said ? ' is-said' : '') + '" data-k="listen" aria-label="' + this._esc(this._t('aListen')) + '">' + spk + '</button>'
      + '<button type="button" class="ps-tidebtn" data-k="tide"' + (st.done || v.tide ? ' disabled' : '') + '>' + wave + '<span>' + this._esc(this._t('checkBtn')) + '</span></button>';
  },
  /* ---------------- the hand ---------------- */
  _clearShown: function () { this._view.shown = null; this._view.note = ''; },
  _tapCard: function (id) {
    var st = this.st, v = this._view, C = ReasonSignCore;
    if (st.done || v.tide) return;
    if (st.level === 'two') {
      v.sel = v.sel === id ? null : id;
      v.note = v.sel ? this._t('hintPickSign') : ''; v.soft = true;
      this._paint(); return;
    }
    if (C.place(st, id)) { this._clearShown(); this.api.sound(420); this._paint(); }
  },
  _tapSocket: function (i) {
    var st = this.st, v = this._view, C = ReasonSignCore;
    if (st.done || v.tide) return;
    if (st.level === 'two' && v.sel) {
      if (C.place(st, v.sel, i)) { v.sel = null; this._clearShown(); this.api.sound(420); this._paint(); }
      return;
    }
    if (st.sockets[i] && st.sockets[i].card) { C.take(st, i); this._clearShown(); this.api.sound(300); this._paint(); }
  },
  _listen: function () {
    var st = this.st, D = this._D(), self = this, parts = [];
    st.round.signs.forEach(function (pid) { parts.push(D.points[pid].p); });
    st.round.cards.forEach(function (c) { parts.push(c.t); });
    this._view.said = true; this._paint();
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'ui', text: parts.join(' '), lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { self._view.said = false; if (self._wrap) self._paint(); }, 1600);
  },
  /* ---------------- the tide = the Check ---------------- */
  _tide: function () {
    var st = this.st, v = this._view, C = ReasonSignCore, self = this;
    if (st.done || v.tide) return;
    var res = C.tide(st);
    if (res.result === 'no') return;
    if (res.result === 'empty') { v.note = this._t(res.key); v.soft = false; this.api.sound(200); this._paint(); return; }
    v.sel = null; v.note = '';
    var finish = function () {
      v.shown = res.read;
      if (res.result === 'ok') { self._success(); return; }
      v.soft = false; v.note = st.help ? self._t(C.hint(st, res)) + ' ' + self._t('hintMiss2') : self._t(C.hint(st, res));
      self.api.sound(150); self._paint();
      self.api.announce(self._t(res.read.signs.some(function (g) { return g.tilt; }) ? 'aTilt' : 'aWet') + ' ' + v.note);
      self._later(function () { v.tide = false; if (self._wrap) self._paint(); }, self.FAST ? 0 : self.EBB_MS - self.TIDE_MS);
    };
    this.api.sound(260);
    if (this.FAST) { finish(); v.tide = false; this._paint(); return; }
    v.tide = true; this._paint();
    this._later(finish, this.TIDE_MS);
  },
  _success: function () {
    var st = this.st, v = this._view, D = this._D(), self = this, msg;
    if (st.level === 'one') {
      var c = this._card(st.sockets[0].card);
      msg = this._t('okOne', { line: this._typo(this._noStop(D.points[st.round.signs[0]].p) + ' — ' + this._because(D.points[c.point].b[c.key])) });
    } else if (st.level === 'two') msg = this._t('okTwo');
    else { var a = this._card(st.sockets[0].card), b = this._card(st.sockets[1].card); msg = this._t('okLegs', { r1: this._typo(a.t), r2: this._typo(b.t) }); }
    v.note = ''; this.dunes++;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(660); this._later(function () { self.api.sound(990); }, 160);
    this._later(function () { v.tide = false; if (self._wrap) self._paint(); }, this.FAST ? 0 : this.EBB_MS - this.TIDE_MS);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectReasonSignCSS() {
  if (typeof document === 'undefined' || document.getElementById('ps-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ps-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;} .ps-wrap:focus{outline:none;}'
  /* the beach */
  + '.ps-beach{position:relative;overflow:hidden;border-radius:16px;padding:8px 116px 34px 12px;background:linear-gradient(#F6E3B8 0,#EBCB8D 100%);box-shadow:inset 0 0 0 3px #D3AE6B;min-height:250px;}'
  + '.ps-dunes{display:flex;gap:5px;min-height:14px;margin-bottom:6px;} .ps-dunes i{display:block;width:18px;height:12px;border-radius:2px;background:#B97F45;box-shadow:inset 0 -3px 0 #8A5A2B;}'
  + '.ps-signs{position:relative;display:flex;gap:14px;align-items:flex-start;justify-content:center;}'
  + '.ps-site{position:relative;flex:1 1 0;min-width:0;max-width:440px;display:flex;flex-direction:column;align-items:stretch;}'
  + '.ps-boardwrap{position:relative;z-index:2;transition:transform .35s ease;}'
  + '.ps-board{position:relative;display:flex;align-items:center;justify-content:center;min-height:62px;padding:10px 14px;border:0;border-radius:7px;background:repeating-linear-gradient(0deg,#E7BE83 0 15px,#DDB074 15px 16px);box-shadow:0 0 0 3px #8A5A2B,0 4px 0 #6E4520;font:800 20px/1.25 ' + H + ';color:#3A2310;text-align:center;transition:filter .4s,transform .35s;}'
  + '.ps-sign1 .ps-board{box-shadow:0 0 0 3px #2F6FB0,0 4px 0 #6E4520;}'
  + '.ps-board.is-copy{position:absolute;left:12px;right:-6px;top:-42px;z-index:3;transform:rotate(-2deg);cursor:pointer;font-size:17px;} .ps-boardwrap.has-copy{margin-top:42px;}'
  + '.ps-under{position:relative;display:flex;gap:10px;align-items:flex-start;min-height:84px;padding-top:10px;}'
  + '.ps-col{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:stretch;gap:4px;} .ps-because{position:relative;z-index:3;align-self:center;flex:0 0 auto;font:800 15px/1 ' + B + ';color:#146B5E;background:#FFFDF6;border-radius:999px;padding:4px 8px;box-shadow:0 1px 0 #C9A26E;}'
  + '.ps-socket{position:relative;flex:1 1 auto;width:100%;min-width:0;min-height:72px;padding:0;border:0;background:none;cursor:pointer;font:inherit;color:inherit;display:flex;align-items:stretch;}'
  + '.ps-socket:focus-visible{outline:3px solid #146B5E;outline-offset:2px;border-radius:10px;} .ps-socket:disabled{cursor:default;}'
  + '.ps-slot{flex:1 1 auto;border:3px dashed rgba(110,69,32,.45);border-radius:10px;background:rgba(255,253,246,.35);} .ps-socket.is-target .ps-slot{border-color:#146B5E;background:rgba(20,107,94,.12);}'
  + '.ps-plank{position:relative;flex:1 1 auto;display:flex;align-items:center;padding:8px 10px;border-radius:9px;background:#FFF8EA;box-shadow:0 0 0 2px #B98D5A,0 3px 0 #B98D5A;font:700 16px/1.3 ' + B + ';color:#2B2B2B;text-align:left;transition:transform .35s ease,background .3s;}'
  /* after the tide: a post holds the sign; a lonely post stands off to the side; a leaning post tips against the wrong sign */
  + '.ps-plank.is-post,.ps-plank.is-lonely,.ps-plank.is-lean{background:#A9733F;box-shadow:0 0 0 2px #6E4520,0 3px 0 #6E4520;color:#FFF6E6;}'
  + '.ps-leg{position:absolute;left:50%;width:14px;margin-left:-7px;top:-22px;height:22px;background:#8A5A2B;border-radius:2px;}'
  + '.ps-plank.is-lonely{transform:translate(14%,10px) scale(.94);} .ps-plank.is-lonely .ps-leg{display:none;} .ps-plank.is-lonely::after{content:"";position:absolute;left:50%;top:-16px;height:12px;border-left:3px dotted #8A5A2B;}'
  + '.ps-plank.is-lean{transform:rotate(7deg) translate(10px,6px);} .ps-plank.is-lean .ps-leg{transform:rotate(-14deg);}'
  + '.ps-socket.is-copy .ps-slot.is-left{border-style:dotted;}'
  + '.ps-glow{background:#FFE27A;color:inherit;border-radius:3px;padding:0 1px;} .ps-plank.is-post .ps-glow,.ps-plank.is-lonely .ps-glow,.ps-plank.is-lean .ps-glow{background:#FFE27A;color:#3A2310;}'
  + '.ps-site.is-up .ps-boardwrap{transform:translateY(-8px);} .ps-site.is-up .ps-under{padding-top:16px;}'
  + '.ps-site.is-wet .ps-board{filter:saturate(.55) brightness(.86);background:repeating-linear-gradient(0deg,#B9A585 0 15px,#AF9A79 15px 16px),#BFD7E0;text-shadow:0 1px 1px rgba(40,70,90,.5);}'
  + '.ps-site.is-tilt .ps-boardwrap{transform:rotate(-5deg) translateY(-4px);transform-origin:12% 100%;} .ps-site.is-tilt .ps-board{background:linear-gradient(90deg,#E7BE83 0 55%,#9CB8C4 100%);}'
  /* the sea: a band along the bottom that rolls up the beach on the tide */
  + '.ps-sea{position:absolute;left:0;right:0;bottom:0;height:26px;z-index:1;background:linear-gradient(#7FC4DA,#4F9DBA);transition:height .55s ease;} .ps-sea i{position:absolute;left:0;right:0;top:-6px;height:10px;background:radial-gradient(circle at 10px 10px,#FFFFFF 6px,rgba(255,255,255,0) 7px) repeat-x;background-size:22px 12px;opacity:.85;}'
  + '.ps-wrap.is-tide .ps-sea{height:58%;opacity:.88;}'
  + '.ps-pearl{position:absolute;right:10px;bottom:20px;z-index:2;width:96px;height:96px;object-fit:contain;} .ps-pearl.is-happy{animation:psClap .5s ease 2;} @keyframes psClap{50%{transform:translateY(-8px) rotate(-6deg)}}'
  /* the tray */
  + '.ps-tray{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}'
  + '.ps-card{min-height:64px;padding:8px 12px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 0 0 2px #C9A26E,0 4px 0 #C9A26E;font:700 16px/1.3 ' + B + ';color:#2B2B2B;text-align:left;cursor:pointer;transition:transform .12s;}'
  + '.ps-card:hover{transform:translateY(-2px);} .ps-card:focus-visible{outline:3px solid #146B5E;outline-offset:3px;} .ps-card:disabled{cursor:default;transform:none;}'
  + '.ps-card.is-sel{box-shadow:0 0 0 3px #146B5E,0 4px 0 #146B5E;transform:translateY(-3px);}'
  + '.ps-card.is-gone{display:block;min-height:64px;border-radius:12px;border:2px dashed rgba(201,162,110,.6);background:none;box-shadow:none;}'
  + '.ps-bar{display:flex;gap:10px;justify-content:center;align-items:center;}'
  + '.ps-listen{flex:0 0 48px;width:48px;height:48px;border:0;border-radius:50%;background:#FFFDF6;box-shadow:0 0 0 2px #C9A26E;color:#146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center;} .ps-listen svg{width:26px;height:26px;} .ps-listen.is-said{background:#E3F2EE;} .ps-listen:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.ps-tidebtn{flex:0 1 auto;min-width:0;display:flex;align-items:center;gap:8px;min-height:48px;padding:8px 22px;border:0;border-radius:999px;background:#146B5E;color:#FFFFFF;font:800 18px/1 ' + H + ';cursor:pointer;box-shadow:0 3px 0 #0C4A41;} .ps-tidebtn svg{width:30px;height:20px;} .ps-tidebtn:disabled{opacity:.5;cursor:default;} .ps-tidebtn:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '.ps-hint{margin:0;min-height:1.3em;font:700 17px/1.3 ' + B + ';color:#146B5E;text-align:center;} .ps-hint.is-hint{color:#A3401F;} .ps-hint:empty{display:none;}'
  + '.ps-bc{color:#146B5E;font-weight:800;background:#E3F2EE;border-radius:4px;padding:0 4px;}'
  /* two signs */
  + '.ps-wrap.is-two .ps-board{font-size:17px;min-height:56px;padding:8px 10px;}'
  + '.ps-wrap.is-two .ps-plank{font-size:15px;}'
  /* phones */
  + '.ps-wrap.is-narrow{gap:9px;} .ps-wrap.is-narrow .ps-beach{padding:8px 8px 30px 8px;min-height:0;} .ps-wrap.is-narrow .ps-sea{height:18px;} .ps-wrap.is-narrow .ps-dunes{min-height:12px;margin-bottom:4px;}'
  + '.ps-wrap.is-narrow .ps-pearl{position:static;width:64px;height:64px;margin-right:auto;}'
  + '.ps-wrap.is-narrow .ps-board{font-size:17px;min-height:56px;padding:8px 10px;}'
  + '.ps-wrap.is-narrow.is-two .ps-signs{flex-direction:column;gap:8px;} .ps-wrap.is-narrow.is-two .ps-site{max-width:none;width:100%;} .ps-wrap.is-narrow.is-two .ps-board{font-size:15px;min-height:50px;} .ps-wrap.is-narrow.is-two .ps-under{min-height:56px;padding-top:6px;}'
  + '.ps-wrap.is-narrow .ps-plank.is-lean{transform:rotate(3deg) translate(4px,2px);} .ps-wrap.is-narrow .ps-plank.is-lonely{transform:translateX(4%) scale(.95);}'
  + '.ps-wrap.is-narrow .ps-col{flex-direction:row;align-items:center;gap:6px;} .ps-wrap.is-narrow .ps-because{font-size:14px;padding:3px 6px;}'
  + '.ps-wrap.is-narrow:not(.is-cramp).is-two .ps-tray,.ps-wrap.is-narrow:not(.is-cramp).is-legs .ps-tray{grid-template-columns:repeat(2,minmax(0,1fr));} .ps-wrap.is-narrow.is-two .ps-card.is-gone,.ps-wrap.is-narrow.is-legs .ps-card.is-gone{height:auto;min-height:40px;}'
  + '.ps-wrap.is-narrow .ps-under{min-height:64px;gap:8px;} .ps-wrap.is-narrow .ps-socket{min-height:56px;} .ps-wrap.is-narrow .ps-plank{font-size:15px;padding:6px 8px;}'
  + '.ps-wrap.is-narrow .ps-tray{grid-template-columns:1fr;gap:8px;} .ps-wrap.is-narrow .ps-card{min-height:52px;font-size:15px;padding:6px 10px;} .ps-wrap.is-narrow .ps-card.is-gone{min-height:0;height:8px;border-width:2px;}'
  + '.ps-wrap.is-narrow .ps-hint{font-size:15px;}'
  + '.ps-wrap.is-cramp{gap:7px;} .ps-wrap.is-cramp .ps-beach{padding:6px 6px 24px 6px;} .ps-wrap.is-cramp .ps-board{font-size:15px;min-height:44px;padding:5px 8px;} .ps-wrap.is-cramp .ps-under{min-height:52px;padding-top:6px;} .ps-wrap.is-cramp .ps-socket{min-height:48px;} .ps-wrap.is-cramp .ps-plank{font-size:14px;padding:5px 7px;}'
  + '.ps-wrap.is-cramp .ps-tray{grid-template-columns:1fr;gap:6px;} .ps-wrap.is-cramp .ps-card{min-height:44px;font-size:14px;line-height:1.25;padding:5px 8px;} .ps-wrap.is-cramp .ps-card.is-gone{height:auto;min-height:44px;} .ps-wrap.is-cramp .ps-board.is-copy{top:-34px;} .ps-wrap.is-cramp .ps-boardwrap.has-copy{margin-top:34px;} .ps-wrap.is-cramp .ps-pearl{flex:0 0 64px;width:64px;height:64px;margin:-8px auto -8px 0;} .ps-wrap.is-cramp .ps-card.is-gone{display:none;} .ps-wrap.is-cramp .ps-dunes{min-height:8px;margin-bottom:2px;} .ps-wrap.is-cramp .ps-dunes i{height:8px;width:14px;} .ps-wrap.is-cramp .ps-hint{font-size:14px;line-height:1.25;} .ps-wrap.is-cramp .ps-tidebtn{min-height:48px;} .ps-wrap.is-cramp .ps-bar{gap:8px;} .ps-wrap.is-cramp .ps-tidebtn{padding:8px 14px;font-size:17px;} .ps-wrap.is-cramp.is-done .ps-bar{display:none;}'
  /* solved on a phone: the tray and bar step back so the success line and Next stay above the fold */
  + '.ps-wrap.is-narrow.is-done .ps-tray,.ps-wrap.is-narrow.is-done .ps-listen,.ps-wrap.is-narrow.is-done .ps-tidebtn{display:none;}'
  + '@media (prefers-reduced-motion:reduce){.ps-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'ps-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.PearlOpinionPageActivity = PearlOpinionPageActivity;
