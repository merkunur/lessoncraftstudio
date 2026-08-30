/* =====================================================================
   BRAMBLE'S PARKING TOWER — ACTIVITY  (parking-tower-activity.js)
   ---------------------------------------------------------------------
   CCSS K.G.A.1 — positional language (above / below / beside / next-to /
   between). A side-on cross-section parking tower: a position WORD names a
   relation to a parked landmark; the child parks the vehicle in the bay
   that matches. Side-on view = above is literally higher on screen, with a
   visible FLOOR-SLAB between levels (so "above the bus" is unambiguous).

   COGNITION reused from mini tools/place-by-relation-core.js
   (window.PlaceByRelationCore: isCorrect = targetSpotIds id-match). Answer
   DERIVED, never read as an index. Full lcs-shell tool. answerType:'state'.

   No timer/score/red-X: a wrong park = a polite beep + the bay reverses +
   a 2-stage re-teach (1st miss = re-teach the term without naming the wrong
   bay; 2nd = name the mismatch). Progress = the skyline lights up. Beaver
   Bramble = SVG PLACEHOLDER via the _setPose CA5 seam. Words ALWAYS DOM.
   Fully playable audio-off (TTS is a scaffold). 0 lines to the protected
   cores + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PlaceByRelationCore;

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', RIM: '#FFFFFF', GOOD: '#2FA56A',
    SLAB: '#9FB0AE', SLAB2: '#7E908E', SKY: '#CFE6E0', WOOD: '#C7956A'
  };
  var VCOLOR = { bus: '#F2A23B', van: '#5BA8D6', car: '#E2607A', truck: '#7DB36B', boat: '#C98AD0' };
  var LANG = 'en';
  var VEHICLE_DE = {
    bus:   { bare: 'Bus',         akk: 'den Bus',         dat: 'dem Bus' },
    van:   { bare: 'Transporter', akk: 'den Transporter', dat: 'dem Transporter' },
    car:   { bare: 'Auto',        akk: 'das Auto',        dat: 'dem Auto' },
    truck: { bare: 'Lastwagen',   akk: 'den Lastwagen',   dat: 'dem Lastwagen' },
    boat:  { bare: 'Boot',        akk: 'das Boot',        dat: 'dem Boot' }
  };
  var PREP_DE = { above: 'über', below: 'unter', 'next-to': 'neben' };
  /* French: position prepositions FUSE de+article with gender (au-dessus DU bus /
     au-dessus DE LA voiture), but « entre » takes the plain article. So each
     vehicle carries a def-form (le bus / la voiture — for « entre ») AND a
     de-form (du bus / de la voiture — for au-dessus/en dessous/à côté). All words
     are consonant-initial → no « de l' » elision. */
  var VEHICLE_FR = {
    bus:   { bare: 'bus',         def: 'le bus',         de: 'du bus' },
    van:   { bare: 'camionnette', def: 'la camionnette', de: 'de la camionnette' },
    car:   { bare: 'voiture',     def: 'la voiture',     de: 'de la voiture' },
    truck: { bare: 'camion',      def: 'le camion',      de: 'du camion' },
    boat:  { bare: 'bateau',      def: 'le bateau',      de: 'du bateau' }
  };
  var PREP_FR = { above: 'au-dessus', below: 'en dessous', 'next-to': 'à côté' };
  /* Spanish (MX): CAMIÓN = BUS in Mexico → bus=autobús, truck=tráiler (collision-safe). def = definite form (for « entre » + the mover);
     art/noun feed the esFused helper in makeTasks (de+el→del, a+el→al for the governed prep; fem "camioneta" stays "de la"/"a la"). */
  var VEHICLE_ES = {
    bus:   { bare: 'Autobús',   def: 'el autobús',   art: 'el', noun: 'autobús'   },
    van:   { bare: 'Camioneta', def: 'la camioneta', art: 'la', noun: 'camioneta' },
    car:   { bare: 'Carro',     def: 'el carro',     art: 'el', noun: 'carro'     },
    truck: { bare: 'Tráiler',   def: 'el tráiler',   art: 'el', noun: 'tráiler'   },
    boat:  { bare: 'Barco',     def: 'el barco',     art: 'el', noun: 'barco'     }
  };
  var PREP_ES = { above: 'encima', below: 'debajo', 'next-to': 'junto' };
  /* Portuguese (BR): all three governed preps take the SAME de+article contraction
     (em cima DE / embaixo DE / ao lado DE → do/da), so — unlike Spanish (next-to→a→al) —
     there is NO rel-branch in ptFused. « entre » takes the plain def form (entre o ônibus
     e a van). van = feminine ("a van"); the other four are masculine. */
  var VEHICLE_PT = {
    bus:   { bare: 'Ônibus',   def: 'o ônibus',   art: 'o', noun: 'ônibus'   },
    van:   { bare: 'Van',      def: 'a van',      art: 'a', noun: 'van'      },
    car:   { bare: 'Carro',    def: 'o carro',    art: 'o', noun: 'carro'    },
    truck: { bare: 'Caminhão', def: 'o caminhão', art: 'o', noun: 'caminhão' },
    boat:  { bare: 'Barco',    def: 'o barco',    art: 'o', noun: 'barco'     }
  };
  var PREP_PT = { above: 'em cima', below: 'embaixo', 'next-to': 'ao lado' };
  /* Italian: sopra/sotto take the PLAIN definite article (NO "di": sopra il bus, NOT sopra del bus);
     ONLY next-to ("accanto a") contracts (a+il=al, a+la=alla) — the itFused helper in makeTasks branches on next-to.
     Vehicle names are apostrophe-safe by construction (il bus NOT l-autobus; la macchina NOT l-auto). "entre"→"tra" (plain). */
  var VEHICLE_IT = {
    bus:   { bare: 'Bus',      def: 'il bus',      art: 'il', noun: 'bus'      },
    van:   { bare: 'Furgone',  def: 'il furgone',  art: 'il', noun: 'furgone'  },
    car:   { bare: 'Macchina', def: 'la macchina', art: 'la', noun: 'macchina' },
    truck: { bare: 'Camion',   def: 'il camion',   art: 'il', noun: 'camion'   },
    boat:  { bare: 'Barca',    def: 'la barca',    art: 'la', noun: 'barca'     }
  };
  var PREP_IT = { above: 'sopra', below: 'sotto', 'next-to': 'accanto' };
  /* Dutch: boven/onder/naast/tussen govern NO case and do NOT contract with the article
     (unlike German dative / Romance de+article fusion), so a single DEFINITE form suffices
     everywhere (after the prep, inside "tussen … en …", and as the mover). All five vehicles
     are de-words → no de/het mixing. van = "bestelwagen" (collision-safe; NOT "busje"). */
  var VEHICLE_NL = {
    bus:   { bare: 'Bus',         def: 'de bus'         },
    van:   { bare: 'Bestelwagen', def: 'de bestelwagen' },
    car:   { bare: 'Auto',        def: 'de auto'        },
    truck: { bare: 'Vrachtwagen', def: 'de vrachtwagen' },
    boat:  { bare: 'Boot',        def: 'de boot'        }
  };
  var PREP_NL = { above: 'boven', below: 'onder', 'next-to': 'naast' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function interp(t, args) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? args[k] : m; }); }
  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.92 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .92; u.lang = (LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG === 'nl' ? 'nl-NL' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffledOrder(n, prev) {
    var idx = [], i, j, t; for (i = 0; i < n; i++) idx.push(i); if (n < 2) return idx;
    function same(a, b) { if (!b) return false; for (var k = 0; k < a.length; k++) if (a[k] !== b[k]) return false; return true; }
    do { for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; } } while (same(idx, prev));
    return idx;
  }

  /* simple side-view vehicle SVGs (placeholders; CA5 sprites swap in later) */
  function vehicleSVG(type) {
    var col = VCOLOR[type] || C.T2;
    if (type === 'boat') {
      return '<svg class="pt-veh-svg" viewBox="0 0 100 64" aria-hidden="true">' +
        '<path d="M16 44 L84 44 L74 58 L26 58 Z" fill="' + col + '" stroke="' + C.INK + '" stroke-width="2"/>' +
        '<rect x="48" y="14" width="3" height="30" fill="' + C.INK + '"/><path d="M51 16 L74 40 L51 40 Z" fill="' + C.RIM + '" stroke="' + C.INK + '" stroke-width="1.5"/>' +
        '</svg>';
    }
    var len = (type === 'bus') ? 86 : (type === 'van') ? 72 : (type === 'truck') ? 80 : 66;
    var x0 = (100 - len) / 2;
    var body = (type === 'truck')
      ? '<rect x="' + x0 + '" y="30" width="' + (len * 0.46) + '" height="20" rx="3" fill="' + col + '" stroke="' + C.INK + '" stroke-width="2"/>' +
        '<path d="M' + (x0 + len * 0.46) + ' 22 h' + (len * 0.5) + ' v28 h-' + (len * 0.5) + ' z" fill="' + col + '" stroke="' + C.INK + '" stroke-width="2"/>'
      : '<rect x="' + x0 + '" y="' + (type === 'bus' ? 16 : 22) + '" width="' + len + '" height="' + (type === 'bus' ? 34 : 28) + '" rx="6" fill="' + col + '" stroke="' + C.INK + '" stroke-width="2"/>';
    var win = (type === 'truck')
      ? '<rect x="' + (x0 + 4) + '" y="33" width="' + (len * 0.32) + '" height="11" rx="2" fill="' + C.RIM + '" opacity=".85"/>'
      : '<rect x="' + (x0 + 5) + '" y="' + (type === 'bus' ? 21 : 26) + '" width="' + (len - 10) + '" height="' + (type === 'bus' ? 12 : 9) + '" rx="2" fill="' + C.RIM + '" opacity=".85"/>';
    var w1 = x0 + len * 0.22, w2 = x0 + len * 0.78;
    return '<svg class="pt-veh-svg" viewBox="0 0 100 64" aria-hidden="true">' + body + win +
      '<circle cx="' + w1 + '" cy="52" r="7" fill="' + C.INK + '"/><circle cx="' + w1 + '" cy="52" r="3" fill="#888"/>' +
      '<circle cx="' + w2 + '" cy="52" r="7" fill="' + C.INK + '"/><circle cx="' + w2 + '" cy="52" r="3" fill="#888"/>' +
      '</svg>';
  }

  /* Beaver Bramble — SVG PLACEHOLDER (attendant cap + big tail). */
  function brambleSVG() {
    return '<svg class="pt-bramble-svg" viewBox="0 0 120 120" role="img" aria-label="' + (LANG === 'de' ? 'Benno der Biber' : LANG === 'fr' ? 'Bramble le castor' : LANG === 'es' ? 'Beto el castor' : LANG === 'pt' ? 'o castor Beto' : LANG === 'it' ? 'Bruno, il castoro' : LANG === 'nl' ? 'Bram de bever' : 'Bramble the beaver') + '">' +
      '<ellipse cx="60" cy="113" rx="30" ry="6" fill="rgba(0,0,0,.08)"/>' +
      '<path d="M84 96 Q108 92 104 72 Q92 78 84 88 Z" fill="' + C.WOOD + '" stroke="' + C.CORAL2 + '" stroke-width="2"/>' +   /* tail */
      '<path d="M32 64 Q32 36 60 36 Q88 36 88 64 Q88 98 60 100 Q32 98 32 64 Z" fill="' + C.WOOD + '"/>' +
      '<ellipse cx="60" cy="56" rx="24" ry="22" fill="#E9C9A2"/>' +
      '<path d="M34 40 Q60 22 86 40 Q86 48 60 44 Q34 48 34 40 Z" fill="' + C.CORAL + '"/>' +  /* cap */
      '<g class="pt-br-eyes-open"><circle cx="52" cy="52" r="3.4" fill="' + C.INK + '"/><circle cx="68" cy="52" r="3.4" fill="' + C.INK + '"/></g>' +
      '<g class="pt-br-eyes-happy"><path d="M47 52 Q52 47 57 52" stroke="' + C.INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M63 52 Q68 47 73 52" stroke="' + C.INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>' +
      '<ellipse cx="60" cy="62" rx="7" ry="5" fill="#C98A5E"/><rect x="55" y="64" width="4" height="7" rx="1" fill="' + C.RIM + '"/><rect x="61" y="64" width="4" height="7" rx="1" fill="' + C.RIM + '"/>' +
      '</svg>';
  }

  global.ParkingTowerActivity = {
    id: 'parking-tower-activity',

    strings: {
      title:        { en: "Bramble's Parking Tower", de: 'Bennos Parkturm', fr: 'Le parking à étages de Bramble', es: 'El estacionamiento de Beto', pt: 'O estacionamento do Beto', it: 'La torre-parcheggio di Bruno', nl: 'De parkeertoren van Bram' },
      instruction:  { en: 'Help Bramble park each vehicle in the right spot. Tap Check when it is parked.', de: 'Hilf Benno, jedes Fahrzeug am richtigen Platz zu parken. Tippe auf Prüfen, wenn es geparkt ist.', fr: 'Aide Bramble à garer chaque véhicule au bon endroit. Touche Vérifier quand il est garé.', es: 'Ayuda a Beto a estacionar cada vehículo en su lugar. Toca Comprobar cuando ya esté estacionado.', pt: 'Ajude o castor Beto a estacionar cada veículo no lugar certo. Toque em Verificar quando ele estiver estacionado.', it: 'Aiuta Bruno a parcheggiare ogni veicolo al posto giusto. Tocca Controlla quando è parcheggiato.', nl: 'Help Bram om elk voertuig op de juiste plek te parkeren. Tik op Controleer als het geparkeerd is.' },
      promptPlace:  { en: 'Park the {mover} {rel} the {landmark}.', de: 'Parke {mover} {rel} {landmark}.', fr: 'Gare {mover} {rel} {landmark}.', es: 'Estaciona {mover} {rel} {landmark}.', pt: 'Estacione {mover} {rel} {landmark}.', it: 'Parcheggia {mover} {rel} {landmark}.', nl: 'Parkeer {mover} {rel} {landmark}.' },
      promptBetween:{ en: 'Park the {mover} between the {lm1} and the {lm2}.', de: 'Parke {mover} zwischen {lm1} und {lm2}.', fr: 'Gare {mover} entre {lm1} et {lm2}.', es: 'Estaciona {mover} entre {lm1} y {lm2}.', pt: 'Estacione {mover} entre {lm1} e {lm2}.', it: 'Parcheggia {mover} tra {lm1} e {lm2}.', nl: 'Parkeer {mover} tussen {lm1} en {lm2}.' },
      promptReverse:{ en: 'Bramble parked {rel} the {landmark}. Tap his truck.', de: 'Benno hat {rel} {landmark} geparkt. Tippe auf seinen Lastwagen.', fr: 'Bramble s’est garé {rel} {landmark}. Touche son camion.', es: 'Beto estacionó {rel} {landmark}. Toca su tráiler.', pt: 'O Beto estacionou {rel} {landmark}. Toque no caminhão dele.', it: 'Bruno ha parcheggiato {rel} {landmark}. Tocca il suo camion.', nl: 'Bram parkeerde {rel} {landmark}. Tik op zijn vrachtwagen.' },
      promptTwoTruck:{ en: 'Park the {mover} between your two trucks.', de: 'Parke {mover} zwischen deinen beiden Lastwagen.', fr: 'Gare {mover} entre tes deux camions.', es: 'Estaciona {mover} entre tus dos tráileres.', pt: 'Estacione {mover} entre os dois caminhões.', it: 'Parcheggia {mover} tra i tuoi due camion.', nl: 'Parkeer {mover} tussen je twee vrachtwagens.' },
      reteachAbove: { en: 'Above means one level higher up — try again!', de: 'Über bedeutet eine Ebene höher — versuch es noch einmal!', fr: 'Au-dessus, ça veut dire un étage plus haut — essaie encore !', es: 'Encima quiere decir un piso más arriba… ¡inténtalo otra vez!', pt: 'Em cima quer dizer um andar acima… tente de novo!', it: 'Sopra vuol dire un piano più in alto — riprova!', nl: 'Boven betekent één verdieping hoger — probeer opnieuw!' },
      reteachBelow: { en: 'Below means one level lower down — try again!', de: 'Unter bedeutet eine Ebene tiefer — versuch es noch einmal!', fr: 'En dessous, ça veut dire un étage plus bas — essaie encore !', es: 'Debajo quiere decir un piso más abajo… ¡inténtalo otra vez!', pt: 'Embaixo quer dizer um andar abaixo… tente de novo!', it: 'Sotto vuol dire un piano più in basso — riprova!', nl: 'Onder betekent één verdieping lager — probeer opnieuw!' },
      reteachNext:  { en: 'Next to means right beside it, same level — try again!', de: 'Neben bedeutet direkt daneben, auf derselben Ebene — versuch es noch einmal!', fr: 'À côté, ça veut dire juste à côté, au même étage — essaie encore !', es: 'Junto quiere decir en el mismo piso, al lado… ¡inténtalo otra vez!', pt: 'Ao lado quer dizer bem do lado, no mesmo andar… tente de novo!', it: 'Accanto vuol dire proprio di fianco, sullo stesso piano — riprova!', nl: 'Naast betekent er vlak naast, op dezelfde verdieping — probeer opnieuw!' },
      reteachBetween:{ en: 'Between means in the middle of the two — try again!', de: 'Zwischen bedeutet in der Mitte zwischen den beiden — versuch es noch einmal!', fr: 'Entre, ça veut dire au milieu des deux — essaie encore !', es: 'Entre quiere decir en medio de los dos… ¡inténtalo otra vez!', pt: 'Entre quer dizer no meio dos dois… tente de novo!', it: 'Tra vuol dire in mezzo ai due — riprova!', nl: 'Tussen betekent in het midden van de twee — probeer opnieuw!' },
      reteach2:     { en: 'That spot is {sib}, not {rel}. Listen again.', de: 'Dieser Platz ist {sib}, nicht {rel}. Hör noch einmal zu.', fr: 'Cette place est {sib}, pas {rel}. Écoute encore.', es: 'Ese lugar está {sib}, no {rel}. Escucha otra vez.', pt: 'Esse lugar está {sib}, não {rel}. Escute de novo.', it: 'Quel posto è {sib}, non {rel}. Ascolta di nuovo.', nl: 'Die plek is {sib}, niet {rel}. Luister nog eens.' },
      parked:       { en: 'Yes! Parked just right.', de: 'Ja! Genau richtig geparkt.', fr: 'Oui ! Bien garé.', es: '¡Sí! Quedó justo en su lugar.', pt: 'Isso! Estacionou certinho.', it: 'Sì! Parcheggiato proprio bene.', nl: 'Ja! Precies goed geparkeerd.' },
      hintCheck:    { en: 'Park the vehicle in the right spot, then tap Check.', de: 'Parke das Fahrzeug am richtigen Platz und tippe dann auf Prüfen.', fr: 'Gare le véhicule au bon endroit, puis touche Vérifier.', es: 'Estaciona el vehículo en el lugar correcto y luego toca Comprobar.', pt: 'Estacione o veículo no lugar certo e depois toque em Verificar.', it: 'Parcheggia il veicolo al posto giusto, poi tocca Controlla.', nl: 'Parkeer het voertuig op de juiste plek en tik dan op Controleer.' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks(Core.buildRounds()); this._order = null; this._curPass = 0; this._orderForPool = null;
      this.round = null; this.phase = 'play'; this.placed = null; this.misses = 0; this.readOnly = false; this.solved = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round; this.scene = round.scene;
      this.phase = 'play'; this.placed = null; this.misses = 0; this.readOnly = false; this.solvedNow = false;
    },

    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'pt-wrap');
      var scene = api.el('div', 'pt-scene');

      var board = api.el('div', 'pt-board');
      var bramble = api.el('div', 'pt-bramble'); bramble.setAttribute('data-pose', 'idle'); bramble.innerHTML = brambleSVG(); this._brambleEl = bramble;
      var towerWrap = api.el('div', 'pt-towerwrap'); this._towerWrapEl = towerWrap;
      board.append(bramble, towerWrap);

      /* a little city skyline behind the tower — its windows light up as
         progress (non-numeric vessel) so the scene reads as a parking-tower WORLD */
      var sky = api.el('div', 'pt-sky');
      var heights = [58, 82, 46, 92, 64, 74, 50];
      heights.forEach(function (h) {
        var b = api.el('div', 'pt-bldg'); b.style.height = h + '%';
        var n = Math.max(1, Math.round(h / 24));
        for (var w = 0; w < n; w++) b.appendChild(api.el('span', 'pt-win'));
        sky.appendChild(b);
      });
      this._skyEl = sky;

      scene.append(sky, board);
      wrap.appendChild(scene);
      stage.appendChild(wrap);
      this._renderTower();
      this._paintSky();
      this._setPose('idle');
    },

    _renderTower: function () {
      var self = this, api = this.api, s = this.scene, wrap = this._towerWrapEl; wrap.innerHTML = '';
      if (!s) return;                                            // mount-time render before the first task loads
      var tower = api.el('div', 'pt-tower');
      tower.style.setProperty('--pt-cols', s.cols); tower.style.setProperty('--pt-levels', s.levels);

      function cellEl(col, level) {
        var el = api.el('div', 'pt-cell');
        el.style.gridColumn = String(col); el.style.gridRow = String(s.levels - level + 1);
        if (level === 1) el.classList.add('pt-ground');
        return el;
      }
      /* floor + every grid cell as a slot */
      for (var lv = s.levels; lv >= 1; lv--) for (var co = 1; co <= s.cols; co++) tower.appendChild(cellEl(co, lv));

      /* landmarks (parked, not tappable) */
      s.landmarks.forEach(function (l) { var c = cellEl(l.col, l.level); c.classList.add('pt-occupied'); var lbl = (LANG === 'de' && VEHICLE_DE[l.label]) ? VEHICLE_DE[l.label].bare : (LANG === 'fr' && VEHICLE_FR[l.label]) ? VEHICLE_FR[l.label].bare : (LANG === 'es' && VEHICLE_ES[l.label]) ? VEHICLE_ES[l.label].bare : (LANG === 'pt' && VEHICLE_PT[l.label]) ? VEHICLE_PT[l.label].bare : (LANG === 'it' && VEHICLE_IT[l.label]) ? VEHICLE_IT[l.label].bare : (LANG === 'nl' && VEHICLE_NL[l.label]) ? VEHICLE_NL[l.label].bare : l.label; c.innerHTML = '<span class="pt-veh pt-landmark">' + vehicleSVG(l.vehicle) + '</span><span class="pt-label">' + esc(lbl) + '</span>'; tower.appendChild(c); });

      /* candidates — dashed BAYS (place) or TRUCKS (reverse), tappable */
      s.candidates.forEach(function (cd) {
        var c = api.el('button', 'pt-cell pt-cand ' + (cd.kind === 'truck' ? 'pt-cand-truck' : 'pt-bay')); c.type = 'button';
        c.setAttribute('data-id', cd.id);
        c.style.gridColumn = String(cd.col); c.style.gridRow = String(s.levels - cd.level + 1);
        if (cd.level === 1) c.classList.add('pt-ground');
        c.setAttribute('aria-label', LANG === 'de' ? (cd.kind === 'truck' ? 'ein Lastwagen' : 'ein leerer Parkplatz') : LANG === 'fr' ? (cd.kind === 'truck' ? 'un camion' : 'une place libre') : LANG === 'es' ? (cd.kind === 'truck' ? 'un tráiler' : 'un lugar vacío para estacionar') : LANG === 'pt' ? (cd.kind === 'truck' ? 'um caminhão' : 'uma vaga de estacionamento vazia') : LANG === 'it' ? (cd.kind === 'truck' ? 'un camion' : 'un posto libero') : LANG === 'nl' ? (cd.kind === 'truck' ? 'een vrachtwagen' : 'een lege parkeerplek') : (cd.kind === 'truck' ? 'a truck' : 'an empty parking spot'));
        if (cd.kind === 'truck') c.innerHTML = '<span class="pt-veh">' + vehicleSVG(cd.vehicle) + '</span>';
        else if (self.placed === cd.id && s.mover) c.innerHTML = '<span class="pt-veh pt-parked">' + vehicleSVG(s.mover.vehicle) + '</span>';
        else c.innerHTML = '<span class="pt-bay-mark"></span>';
        if (self.readOnly) { c.disabled = true; }
        else (function (id) { c.addEventListener('click', function () { self._tap(id, c); }); }(cd.id));
        if (self.readOnly && self.placed === cd.id) c.classList.add('pt-correct');
        tower.appendChild(c);
      });
      wrap.appendChild(tower);

      /* the mover waiting at the entrance (place rounds) */
      if (s.mover && !this.round.reverse) {
        var dock = api.el('div', 'pt-dock');
        dock.innerHTML = '<span class="pt-veh pt-mover' + (this.placed ? ' pt-gone' : '') + '">' + vehicleSVG(s.mover.vehicle) + '</span>';
        wrap.appendChild(dock);
      }
    },

    _tap: function (id, cellEl) {
      if (this.readOnly) return;
      if (Core.isCorrect(this.round, id)) { this.placed = id; this._win(); }
      else { this.misses++; this._reteach(cellEl); }
    },

    _win: function () {
      this.readOnly = true; this.phase = 'done'; this.solvedNow = true;
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 7);
      this._setPose('happy'); this.api.sound && this.api.sound(880);
      this._renderTower(); this._paintSky(); this._sparkle();
      if (this.api.announce) this.api.announce(this.api.t('parked'));
    },

    _reteach: function (cellEl) {
      this._setPose('think'); this.api.sound && this.api.sound(330);
      var rel = this.round.relation;
      var msg = this.api.t(rel === 'above' ? 'reteachAbove' : rel === 'below' ? 'reteachBelow' : rel === 'between' ? 'reteachBetween' : 'reteachNext');
      if (this.misses >= 2) msg = msg + ' ' + this.api.t('hintCheck');     // 2nd miss: re-teach + nudge
      if (this.api.announce) this.api.announce(msg);
      speak(msg);
      if (cellEl) { cellEl.classList.add('pt-nope'); setTimeout(function () { cellEl.classList.remove('pt-nope'); }, 520); }
    },

    _paintSky: function () {
      if (!this._skyEl) return;
      var wins = this._skyEl.querySelectorAll('.pt-win'); var n = (this._pool && this._pool.length) || 7;
      var lit = Math.round(wins.length * this.solved / n);
      for (var i = 0; i < wins.length; i++) wins[i].classList.toggle('lit', i < lit);
    },
    _setPose: function (name) { if (this._brambleEl) this._brambleEl.setAttribute('data-pose', name === 'happy' ? 'happy' : 'idle'); },
    _sparkle: function () {
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var w = this._towerWrapEl; if (!w) return; var s = document.createElement('span'); s.className = 'pt-sparkle'; s.textContent = '✦';
      w.appendChild(s); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 700);
    },

    isCorrect: function () { return this.phase === 'done'; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks(Core.buildRounds());
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = (n > 0) ? Math.floor(i / n) : 0;
      if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/parking-tower-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = self._buildTasksFromRow(row); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[parking-tower] manifest load failed; fallback:', e.message); });
    },
    _buildTasksFromRow: function (row) { if (row.params && Array.isArray(row.params.rounds)) return makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); return makeTasks(Core.buildRounds()); },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pt-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);width:100%;max-width:min(96vw,600px);margin:0 auto;}'
        + '.pt-scene{position:relative;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,10px);width:fit-content;max-width:min(94vw,540px);margin:0 auto;'
        +   'background:linear-gradient(180deg,#E8F2EE,#FBF3E4 70%);border:2.5px solid rgba(20,107,94,.18);border-radius:22px;padding:clamp(8px,2vw,14px) clamp(10px,2.4vw,18px) clamp(10px,2.4vw,16px);box-shadow:0 6px 0 rgba(20,107,94,.10),inset 0 2px 0 rgba(255,255,255,.5);}'
        /* city skyline (behind the tower) — windows light up as progress */
        + '.pt-sky{display:flex;gap:clamp(3px,1vw,6px);align-items:flex-end;justify-content:center;height:clamp(28px,7.5vw,42px);width:100%;opacity:.9;}'
        + '.pt-bldg{width:clamp(14px,4vw,26px);background:linear-gradient(180deg,#2C5E55,#19443D);border-radius:3px 3px 0 0;display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:center;gap:2px;padding:3px 2px;box-shadow:inset 0 2px 0 rgba(255,255,255,.06);}'
        + '.pt-win{width:clamp(3px,1vw,5px);height:clamp(3px,1vw,5px);border-radius:1px;background:rgba(255,255,255,.14);transition:background .3s,box-shadow .3s;}'
        + '.pt-win.lit{background:#FFD66B;box-shadow:0 0 5px rgba(255,214,107,.8);}'
        + '.pt-board{display:flex;align-items:flex-end;gap:clamp(4px,1.4vw,12px);margin-top:-6px;}'
        + '.pt-bramble{width:clamp(52px,13vw,80px);flex:0 0 auto;}'
        + '.pt-bramble-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.pt-towerwrap{position:relative;display:flex;flex-direction:column;align-items:center;}'
        /* the tower as a CROSS-SECTION building — thick walls + roof + a concrete
           FLOOR-BEAM under every level (vehicles rest ON the floor) */
        + '.pt-tower{display:grid;grid-template-columns:repeat(var(--pt-cols,3),clamp(56px,15vw,90px));grid-template-rows:repeat(var(--pt-levels,2),clamp(50px,13vw,74px));'
        +   'background:linear-gradient(180deg,#EAF0EE,#DCE6E3);border-left:7px solid ' + C.SLAB2 + ';border-right:7px solid ' + C.SLAB2 + ';border-top:9px solid ' + C.SLAB2 + ';border-radius:9px 9px 0 0;overflow:hidden;box-shadow:0 4px 0 rgba(126,144,142,.5);}'
        + '.pt-cell{position:relative;border-right:2px solid rgba(126,144,142,.35);display:flex;align-items:flex-end;justify-content:center;'
        +   'border-bottom:clamp(8px,2.2vw,12px) solid ' + C.SLAB + ';box-shadow:inset 0 -2px 0 rgba(255,255,255,.4),inset 0 calc(-1 * clamp(8px,2.2vw,12px) - 2px) 0 rgba(126,144,142,.25);}'
        + '.pt-cell.pt-ground{border-bottom:clamp(11px,3vw,16px) solid ' + C.SLAB2 + ';}'
        + '.pt-veh{display:block;width:90%;margin-bottom:1px;}'
        + '.pt-veh-svg{width:100%;height:auto;display:block;}'
        + '.pt-label{position:absolute;bottom:2px;left:0;right:0;text-align:center;font-family:"Nunito",sans-serif;font-weight:800;font-size:clamp(9px,2.4vw,12px);color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4);}'
        /* dashed empty bay (sits on the floor) */
        + '.pt-bay{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;padding:0;}'
        + '.pt-bay .pt-bay-mark{width:78%;height:64%;margin-bottom:6%;border:3px dashed rgba(242,120,75,.65);border-radius:8px;background:rgba(242,120,75,.06);}'
        + '.pt-bay:hover .pt-bay-mark,.pt-bay:focus-visible .pt-bay-mark{border-color:' + C.CORAL + ';}'
        + '.pt-cand-truck{background:none;cursor:pointer;padding:0;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}'
        + '.pt-cand:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:-2px;}'
        + '.pt-cand:active{transform:scale(.97);}'
        + '.pt-correct{background:rgba(47,165,106,.18);}'
        + '.pt-parked{animation:ptDrive .4s var(--lcs-ease,ease);}'
        + '@keyframes ptDrive{0%{transform:translateX(-30px);opacity:.2;}100%{transform:translateX(0);opacity:1;}}'
        + '.pt-nope{animation:ptNope .5s ease;}'
        + '@keyframes ptNope{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
        /* dock + mover */
        + '.pt-dock{margin-top:5px;width:clamp(52px,14vw,74px);}'
        + '.pt-mover{width:90%;margin:0 auto;}'
        + '.pt-mover.pt-gone{opacity:.25;}'
        /* Bramble pose + juice */
        + '.pt-br-eyes-happy{display:none;} .pt-bramble[data-pose="happy"] .pt-br-eyes-open{display:none;} .pt-bramble[data-pose="happy"] .pt-br-eyes-happy{display:inline;}'
        + '.pt-sparkle{position:absolute;left:50%;top:-6px;transform:translateX(-50%);color:' + C.CORAL + ';font-size:20px;animation:ptSpark .7s ease forwards;pointer-events:none;}'
        + '@keyframes ptSpark{0%{opacity:0;transform:translate(-50%,6px) scale(.5);}30%{opacity:1;}100%{opacity:0;transform:translate(-50%,-22px) scale(1.1);}}'
        + '@media (max-width:360px){.pt-scene{padding:7px 9px;} .pt-board{gap:4px;} .pt-bramble{width:46px;}}'
        + '@media (prefers-reduced-motion: reduce){.pt-parked,.pt-nope,.pt-sparkle{animation:none;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-parking-tower', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  /* ---- helpers shared with makeTasks ---- */
  function relWord(r) { return { above: 'above', below: 'below', 'next-to': 'next to', between: 'between' }[r] || r; }

  function makeTasks(rounds) {
    return rounds.map(function (round) {
      var s = round.scene;
      var de = (LANG === 'de'), fr = (LANG === 'fr'), es = (LANG === 'es'), pt = (LANG === 'pt'), it = (LANG === 'it'), nl = (LANG === 'nl');
      var lm = function (id) { var l = s.landmarks.filter(function (x) { return x.id === id; })[0]; return l ? l.label : id; };
      /* es: the landmark AFTER a governed prep, with de+el→del / a+el→al contraction (fem "camioneta" stays "de la"/"a la").
         next-to governs "a" (junto al …); above/below govern "de" (encima/debajo del …). */
      var esFused = function (rel, k) { var v = VEHICLE_ES[k]; if (!v) return k; var toA = (rel === 'next-to'); if (v.art === 'el') return (toA ? 'al ' : 'del ') + v.noun; return (toA ? 'a ' : 'de ') + v.def; };
      /* pt: ALL three governed preps take de+article contraction (do/da) — no rel-branch. */
      var ptFused = function (k) { var v = VEHICLE_PT[k]; if (!v) return k; return (v.art === 'o' ? 'do ' : 'da ') + v.noun; };
      /* it: sopra/sotto take the PLAIN def article (il/la — no "di"); next-to ("accanto a") contracts (a+il=al, a+la=alla). */
      var itFused = function (rel, k) { var v = VEHICLE_IT[k]; if (!v) return k; var toA = (rel === 'next-to'); if (v.art === 'il') return (toA ? 'al ' : 'il ') + v.noun; return (toA ? 'alla ' : 'la ') + v.noun; };
      /* landmark after a preposition: de = dative; fr = the de-FUSED form (du bus / de la voiture) for au-dessus/en dessous/à côté; pt = the do/da-contracted form */
      var lmVal = function (id) { var k = lm(id); return pt ? ptFused(k) : es ? esFused(round.relation, k) : it ? itFused(round.relation, k) : de ? ((VEHICLE_DE[k] && VEHICLE_DE[k].dat) || k) : fr ? ((VEHICLE_FR[k] && VEHICLE_FR[k].de) || k) : nl ? ((VEHICLE_NL[k] && VEHICLE_NL[k].def) || k) : k; };
      /* landmark inside « entre … et … »: de = dative (same); fr = the plain DEF form (le bus / la voiture); es = the DEF form (el autobús / la camioneta); pt = the DEF form (o ônibus / a van) */
      var lmDef = function (id) { var k = lm(id); return pt ? ((VEHICLE_PT[k] && VEHICLE_PT[k].def) || k) : es ? ((VEHICLE_ES[k] && VEHICLE_ES[k].def) || k) : it ? ((VEHICLE_IT[k] && VEHICLE_IT[k].def) || k) : de ? ((VEHICLE_DE[k] && VEHICLE_DE[k].dat) || k) : fr ? ((VEHICLE_FR[k] && VEHICLE_FR[k].def) || k) : nl ? ((VEHICLE_NL[k] && VEHICLE_NL[k].def) || k) : k; };
      var moverKey = s.mover ? s.mover.vehicle : 'truck';
      var moverVal = pt ? ((VEHICLE_PT[moverKey] && VEHICLE_PT[moverKey].def) || moverKey) : es ? ((VEHICLE_ES[moverKey] && VEHICLE_ES[moverKey].def) || moverKey) : it ? ((VEHICLE_IT[moverKey] && VEHICLE_IT[moverKey].def) || moverKey) : de ? ((VEHICLE_DE[moverKey] && VEHICLE_DE[moverKey].akk) || moverKey) : fr ? ((VEHICLE_FR[moverKey] && VEHICLE_FR[moverKey].def) || moverKey) : nl ? ((VEHICLE_NL[moverKey] && VEHICLE_NL[moverKey].def) || moverKey) : (s.mover ? s.mover.label : 'truck');
      var relVal = pt ? (PREP_PT[round.relation] || round.relation) : es ? (PREP_ES[round.relation] || round.relation) : it ? (PREP_IT[round.relation] || round.relation) : de ? (PREP_DE[round.relation] || round.relation) : fr ? (PREP_FR[round.relation] || round.relation) : nl ? (PREP_NL[round.relation] || round.relation) : relWord(round.relation);
      var pk, pa = {};
      if (round.experience === 'between') { pk = 'promptBetween'; pa = { mover: moverVal, lm1: lmDef(round.termRef[0]), lm2: lmDef(round.termRef[1]) }; }
      else if (round.experience === 'reverse') { pk = 'promptReverse'; pa = { rel: relVal, landmark: lmVal(round.termRef[0]) }; }
      else if (round.experience === 'two-truck') { pk = 'promptTwoTruck'; pa = { mover: moverVal }; }
      else { pk = 'promptPlace'; pa = { mover: moverVal, rel: relVal, landmark: lmVal(round.termRef[0]) }; }
      return {
        id: 'parking-tower.' + round.id, band: round.band,
        promptKey: pk, promptArgs: pa, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { var ok = tool.isCorrect(); if (ok) tool.readOnly = true; return ok; },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }

  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; });
    var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
