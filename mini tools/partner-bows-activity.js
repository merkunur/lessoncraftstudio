/* =====================================================================
   partner-bows-activity.js — ACTIVITY #17 of the one-by-one rebuild:
   "Which group has more?" (K.CC.C.6) — THE PARTNER BOWS.
   Design sheet: docs/activities-rebuild/017-partner-bows.md
   ---------------------------------------------------------------------
   Two mats: bees on top, flowers below (bunnies and carrots, squirrels and
   acorns…), library pictures, the spacing often a trick (the smaller group
   spread out, the bigger one huddled — but not always: spacing never tells). THE INVENTION: THE PARTNER BOWS — a
   tap on one at the top, then one at the bottom, and both wear the same bow
   (a colour AND a shape, so colour is never the only cue). Whoever is left
   without a bow shows which group has more. Or the child counts. The answer
   is the "More" button in a mat's corner, or "The same" between the mats.
   Miss 2 pairs the rest for the child and rings the ones with no partner;
   done numbers both groups. No mascot is drawn.

   ACTIVITY LAYER ONLY: the model is partner-bows-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.PartnerBowsActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var PartnerBowsActivity = {
  id: 'partner-bows',
  apparatusClasses: ['pb-'],

  strings: {
    title:        {en:'The Partner Bows',de:'Die Partnerschleifen',fr:'Les rubans des copains',es:'Los moños de pareja',pt:'Os laços dos pares',it:'I fiocchi delle coppie',nl:'De maatjesstrikken',sv:'Kompisrosetterna',da:'Makkersløjferne',no:'Kompissløyfene',fi:'Parirusetit'},
    instruction:  {en:'Which group has more? Pair them up: tap one at the top, then one at the bottom, and both get the same bow. Who has no partner? Or count both groups.',de:'Welche Gruppe hat mehr? Bilde Paare: Tippe oben auf eins, dann unten auf eins, und beide bekommen dieselbe Schleife. Wer hat keinen Partner? Oder zähle beide Gruppen.',fr:'Quel groupe en a le plus ? Fais des paires : touche un animal ou un objet en haut, puis un en bas, et les deux reçoivent le même ruban. Qui n’a pas de copain ? Ou compte les deux groupes.',es:'¿Qué grupo tiene más? Forma parejas: toca uno de arriba y luego uno de abajo, y los dos reciben el mismo moño. ¿Quién se queda sin pareja? O cuenta los dos grupos.',pt:'Qual grupo tem mais? Forme pares: toque em um de cima e depois em um de baixo, e os dois ganham o mesmo laço. Quem fica sem par? Ou conte os dois grupos.',it:'Quale gruppo ne ha di più? Forma le coppie: tocca uno in alto e poi uno in basso, e tutti e due ricevono lo stesso fiocco. Chi resta senza compagno? Oppure conta i due gruppi.',nl:'Welke groep heeft er meer? Maak paren: tik er boven één aan en dan onder één, en ze krijgen allebei dezelfde strik. Wie heeft geen maatje? Of tel allebei de groepen.',sv:'Vilken grupp har fler? Gör par: tryck på en uppe och sedan på en nere, så får båda samma rosett. Vem blir utan kompis? Eller räkna båda grupperna.',da:'Hvilken gruppe har flere? Lav par: tryk på én foroven og så på én forneden, så får de begge den samme sløjfe. Hvem har ingen makker? Eller tæl begge grupper.',no:'Hvilken gruppe har flere? Lag par: trykk på én oppe og så på én nede, så får begge den samme sløyfen. Hvem har ingen kompis? Eller tell begge gruppene.',fi:'Kummassa ryhmässä on enemmän? Tee pareja: napauta yhtä ylhäällä ja sitten yhtä alhaalla, niin molemmat saavat saman rusetin. Kuka jää ilman paria? Tai laske molemmat ryhmät.'},
    prompt:       {en:'Which group has more? Tap “More” on that group, or “The same”, then press Check.',de:'Welche Gruppe hat mehr? Tippe bei dieser Gruppe auf „Mehr“ oder auf „Gleich viele“ und drücke dann auf Prüfen.',fr:'Quel groupe en a le plus ? Touche « Plus » sur ce groupe, ou « Autant », puis appuie sur Vérifier.',es:'¿Qué grupo tiene más? Toca «Más» en ese grupo, o «Igual», y luego oprime Comprobar.',pt:'Qual grupo tem mais? Toque em “Mais” nesse grupo, ou em “Igual”, e depois aperte Verificar.',it:'Quale gruppo ne ha di più? Tocca «Di più» su quel gruppo, oppure «Tanti quanti», poi premi Verifica.',nl:'Welke groep heeft er meer? Tik bij die groep op ‘Meer’, of op ‘Evenveel’, en druk dan op Controleer.',sv:'Vilken grupp har fler? Tryck på ”Fler” vid den gruppen, eller på ”Lika många”, och tryck sedan på Kontrollera.',da:'Hvilken gruppe har flere? Tryk på ”Flere” ved den gruppe, eller på ”Lige mange”, og tryk så på Tjek.',no:'Hvilken gruppe har flere? Trykk på «Flere» ved den gruppen, eller på «Like mange», og trykk så på Sjekk.',fi:'Kummassa ryhmässä on enemmän? Napauta sen ryhmän kohdalla ”Enemmän” tai ”Yhtä monta” ja paina sitten Tarkista.'},
    moreBtn:      {en:'More',de:'Mehr',fr:'Plus',es:'Más',pt:'Mais',it:'Di più',nl:'Meer',sv:'Fler',da:'Flere',no:'Flere',fi:'Enemmän'},
    moreTopAria:  {en:'The top group has more',de:'Die obere Gruppe hat mehr',fr:'Le groupe du haut en a plus',es:'El grupo de arriba tiene más',pt:'O grupo de cima tem mais',it:'Il gruppo in alto ne ha di più',nl:'De bovenste groep heeft er meer',sv:'Den övre gruppen har fler',da:'Den øverste gruppe har flere',no:'Den øverste gruppen har flere',fi:'Ylemmässä ryhmässä on enemmän'},
    moreBottomAria:{en:'The bottom group has more',de:'Die untere Gruppe hat mehr',fr:'Le groupe du bas en a plus',es:'El grupo de abajo tiene más',pt:'O grupo de baixo tem mais',it:'Il gruppo in basso ne ha di più',nl:'De onderste groep heeft er meer',sv:'Den nedre gruppen har fler',da:'Den nederste gruppe har flere',no:'Den nederste gruppen har flere',fi:'Alemmassa ryhmässä on enemmän'},
    sameBtn:      {en:'The same',de:'Gleich viele',fr:'Autant',es:'Igual',pt:'Igual',it:'Tanti quanti',nl:'Evenveel',sv:'Lika många',da:'Lige mange',no:'Like mange',fi:'Yhtä monta'},
    topLabel:     {en:'The top group',de:'Die obere Gruppe',fr:'Le groupe du haut',es:'El grupo de arriba',pt:'O grupo de cima',it:'Il gruppo in alto',nl:'De bovenste groep',sv:'Den övre gruppen',da:'Den øverste gruppe',no:'Den øverste gruppen',fi:'Ylempi ryhmä'},
    bottomLabel:  {en:'The bottom group',de:'Die untere Gruppe',fr:'Le groupe du bas',es:'El grupo de abajo',pt:'O grupo de baixo',it:'Il gruppo in basso',nl:'De onderste groep',sv:'Den nedre gruppen',da:'Den nederste gruppe',no:'Den nederste gruppen',fi:'Alempi ryhmä'},
    pairAria:     {en:'Give this one a partner',de:'Diesem einen Partner geben',fr:'Lui donner un copain',es:'Darle una pareja',pt:'Dar um par a este',it:'Dargli un compagno',nl:'Deze een maatje geven',sv:'Ge den här en kompis',da:'Giv denne en makker',no:'Gi denne en kompis',fi:'Anna tälle pari'},
    pairedAria:   {en:'Has a partner: tap to take the pair apart',de:'Hat einen Partner: Tippe, um das Paar zu trennen',fr:'A un copain : touche pour défaire la paire',es:'Tiene pareja: toca para deshacer la pareja',pt:'Tem par: toque para desfazer o par',it:'Ha un compagno: tocca per sciogliere la coppia',nl:'Heeft een maatje: tik om het paar uit elkaar te halen',sv:'Har en kompis: tryck för att ta isär paret',da:'Har en makker: tryk for at skille parret ad',no:'Har en kompis: trykk for å ta paret fra hverandre',fi:'Tällä on pari: napauta purkaaksesi parin'},
    hintStart:    {en:'Tap “More” on the group with more, or “The same”.',de:'Tippe bei der Gruppe mit mehr auf „Mehr“ oder auf „Gleich viele“.',fr:'Touche « Plus » sur le groupe qui en a le plus, ou « Autant ».',es:'Toca «Más» en el grupo que tiene más, o «Igual».',pt:'Toque em “Mais” no grupo que tem mais, ou em “Igual”.',it:'Tocca «Di più» sul gruppo che ne ha di più, oppure «Tanti quanti».',nl:'Tik op ‘Meer’ bij de groep met meer, of op ‘Evenveel’.',sv:'Tryck på ”Fler” vid gruppen som har fler, eller på ”Lika många”.',da:'Tryk på ”Flere” ved gruppen med flere, eller på ”Lige mange”.',no:'Trykk på «Flere» ved gruppen med flere, eller på «Like mange».',fi:'Napauta ”Enemmän” sen ryhmän kohdalla, jossa on enemmän, tai ”Yhtä monta”.'},
    hintPair:     {en:'Not that one. Give each a partner: tap one at the top, then one at the bottom.',de:'Das stimmt nicht. Gib jedem einen Partner: Tippe oben auf eins, dann unten auf eins.',fr:'Ce n’est pas ça. Donne un copain à chacun : touche un en haut, puis un en bas.',es:'No es esa. Dale una pareja a cada uno: toca uno de arriba y luego uno de abajo.',pt:'Não é essa. Dê um par a cada um: toque em um de cima e depois em um de baixo.',it:'Non è questa. Dai un compagno a ognuno: tocca uno in alto e poi uno in basso.',nl:'Dat klopt niet. Geef elk een maatje: tik er boven één aan en dan onder één.',sv:'Inte det. Ge var och en en kompis: tryck på en uppe och sedan på en nere.',da:'Ikke det. Giv hver en makker: tryk på én foroven og så på én forneden.',no:'Ikke det. Gi hver en kompis: trykk på én oppe og så på én nede.',fi:'Ei se. Anna jokaiselle pari: napauta yhtä ylhäällä ja sitten yhtä alhaalla.'},
    hintLeft:     {en:'Not that one. Look for the ones with no bow: who has no partner?',de:'Das stimmt nicht. Schau, wer keine Schleife hat: Wer hat keinen Partner?',fr:'Ce n’est pas ça. Cherche ceux qui n’ont pas de ruban : qui n’a pas de copain ?',es:'No es esa. Busca los que no tienen moño: ¿quién se quedó sin pareja?',pt:'Não é essa. Procure os que estão sem laço: quem ficou sem par?',it:'Non è questa. Cerca quelli senza fiocco: chi è rimasto senza compagno?',nl:'Dat klopt niet. Zoek wie geen strik heeft: wie heeft geen maatje?',sv:'Inte det. Leta efter dem utan rosett: vem har ingen kompis?',da:'Ikke det. Kig efter dem uden sløjfe: hvem har ingen makker?',no:'Ikke det. Se etter dem uten sløyfe: hvem har ingen kompis?',fi:'Ei se. Etsi ne, joilla ei ole rusettia: kenellä ei ole paria?'},
    hintTied:     {en:'Now every pair has a bow. The ringed ones have no partner: which group are they in?',de:'Jetzt hat jedes Paar eine Schleife. Die eingekreisten haben keinen Partner: In welcher Gruppe sind sie?',fr:'Maintenant, chaque paire a son ruban. Ceux qui sont entourés n’ont pas de copain : dans quel groupe sont-ils ?',es:'Ahora cada pareja tiene su moño. Los que tienen un círculo no tienen pareja: ¿en qué grupo están?',pt:'Agora cada par tem seu laço. Os que estão circulados não têm par: em que grupo eles estão?',it:'Adesso ogni coppia ha il suo fiocco. Quelli cerchiati non hanno un compagno: in quale gruppo sono?',nl:'Nu heeft elk paar een strik. De omcirkelde hebben geen maatje: in welke groep zitten ze?',sv:'Nu har varje par en rosett. De inringade har ingen kompis: vilken grupp är de i?',da:'Nu har hvert par en sløjfe. De, der har en ring om sig, har ingen makker: hvilken gruppe er de i?',no:'Nå har hvert par en sløyfe. De som har ring rundt seg, har ingen kompis: hvilken gruppe er de i?',fi:'Nyt jokaisella parilla on rusetti. Ympyröidyillä ei ole paria: kummassa ryhmässä ne ovat?'},
    hintTiedSame: {en:'Now every pair has a bow, and nobody is left without a partner.',de:'Jetzt hat jedes Paar eine Schleife, und niemand bleibt ohne Partner.',fr:'Maintenant, chaque paire a son ruban, et personne ne reste sans copain.',es:'Ahora cada pareja tiene su moño y nadie se queda sin pareja.',pt:'Agora cada par tem seu laço e ninguém ficou sem par.',it:'Adesso ogni coppia ha il suo fiocco e nessuno resta senza compagno.',nl:'Nu heeft elk paar een strik, en niemand blijft zonder maatje.',sv:'Nu har varje par en rosett, och ingen blir utan kompis.',da:'Nu har hvert par en sløjfe, og ingen står uden makker.',no:'Nå har hvert par en sløyfe, og ingen står uten kompis.',fi:'Nyt jokaisella parilla on rusetti, eikä kukaan jää ilman paria.'},
    celebrateMore:{en:'Yes — {m} is more than {f}!',de:'Ja – {m} ist mehr als {f}!',fr:'Oui — {m}, c’est plus que {f} !',es:'¡Sí: {m} es más que {f}!',pt:'Isso: {m} é mais que {f}!',it:'Sì: {m} è più di {f}!',nl:'Ja – {m} is meer dan {f}!',sv:'Ja – {m} är fler än {f}!',da:'Ja – {m} er flere end {f}!',no:'Ja – {m} er flere enn {f}!',fi:'Kyllä – {m} on enemmän kuin {f}!'},
    celebrateSame:{en:'Yes — {a} and {a}, the same!',de:'Ja – {a} und {a}, gleich viele!',fr:'Oui — {a} et {a}, autant !',es:'¡Sí: {a} y {a}, la misma cantidad!',pt:'Isso: {a} e {a}, a mesma quantidade!',it:'Sì: {a} e {a}, tanti quanti!',nl:'Ja – {a} en {a}, evenveel!',sv:'Ja – {a} och {a}, lika många!',da:'Ja – {a} og {a}, lige mange!',no:'Ja – {a} og {a}, like mange!',fi:'Kyllä – {a} ja {a}, yhtä monta!'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:     {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',es:'Hasta 5',pt:'Até 5',it:'Fino a 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:    {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',es:'Hasta 10',pt:'Até 10',it:'Fino a 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setSpacing:   {en:'Spacing',de:'Verteilung',fr:'Espacement',es:'Acomodo',pt:'Arrumação',it:'Disposizione',nl:'Verdeling',sv:'Utspridning',da:'Fordeling',no:'Fordeling',fi:'Sijoittelu'},
    spacingTricky:{en:'Tricky: spacing that fools the eye',de:'Knifflig: Verteilung täuscht',fr:'Piège\u00a0: l’espacement trompe l’œil',es:'Con truco: el acomodo engaña',pt:'Com pegadinha: a arrumação engana',it:'Con trabocchetto: la disposizione inganna',nl:'Lastig: de verdeling misleidt',sv:'Klurigt: utspridningen lurar ögat',da:'Drilsk: fordelingen snyder øjet',no:'Lur: fordelingen lurer øyet',fi:'Kinkkinen: sijoittelu hämää silmää'},
    spacingEven:  {en:'Even',de:'Gleichmäßig',fr:'Régulier',es:'Parejo',pt:'Regular',it:'Regolare',nl:'Gelijkmatig',sv:'Jämn',da:'Jævn',no:'Jevn',fi:'Tasainen'}
  },

  defaults: { range: 'to10', spacing: 'tricky' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'spacing', type: 'choice', labelKey: 'setSpacing', options: [{ value: 'tricky', labelKey: 'spacingTricky' }, { value: 'even', labelKey: 'spacingEven' }] }
  ],

  BOW_COLORS: ['#E4572E', '#2E86AB', '#E9B824', '#4E9A3A', '#8E44AD', '#F18F01', '#C2185B', '#2A9D8F', '#6D4C41', '#3F51B5'],
  BOW_KNOTS: ['circle', 'square', 'diamond', 'triangle', 'star', 'heart', 'circle', 'square', 'diamond', 'triangle'],

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._themes = {};
    injectPartnerBowsCSS();
    if (typeof LCSPictures !== 'undefined') {
      var dirs = {}; PartnerBowsCore.KINDS.forEach(function (k) { dirs[k.aTheme] = 1; dirs[k.bTheme] = 1; });
      Object.keys(dirs).forEach(function (d) {
        LCSPictures.load(d).then(function (theme) { self._themes[d] = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* that kind stays bare */ });
      });
    }
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },
  _ready: function () { var k = this.st && this.st.kind; return !!(k && this._themes[k.aTheme] && this._themes[k.bTheme]); },

  /* ---------------- rounds ---------------- */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 640;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return PartnerBowsCore.POOLS[r] ? r : 'to10'; },
  _spacing: function () { var s = this.api && this.api.settings && this.api.settings.spacing; return s === 'even' ? 'even' : 'tricky'; },
  _ensurePool: function () { var key = this._range() + ':' + this._spacing(); if (!this._pool || this._poolKey !== key) { this._pool = PartnerBowsCore.rounds(this._range(), 'pb', this._spacing()); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'partner-bows.' + r.id,
      promptKey: 'prompt',
      promptArgs: { a: r.a, b: r.b, m: Math.max(r.a, r.b), f: Math.min(r.a, r.b) },
      celebrateKey: r.answer === 'same' ? 'celebrateSame' : 'celebrateMore',
      answerType: 'state',
      setup: function (tool) { tool.st = PartnerBowsCore.newState(r); },
      check: function (tool) { var res = PartnerBowsCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { var k = PartnerBowsCore.hintKey(tool.st); return k === 'hintTied' && tool.st.answer === 'same' ? 'hintTiedSame' : k; }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = PartnerBowsCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'pb')[0]);
    var wrap = api.el('div', 'pb-wrap'); this._wrap = wrap;
    this._mats = {}; this._items = { a: [], b: [] }; this._more = {};
    ['a', 'b'].forEach(function (side) {
      var mat = api.el('div', 'pb-mat pb-mat-' + side); mat.setAttribute('role', 'group'); mat.setAttribute('aria-label', t(side === 'a' ? 'topLabel' : 'bottomLabel'));
      for (var k = 0; k < 10; k++) {
        (function (i) {
          var b = api.el('button', 'pb-it'); b.type = 'button'; b.hidden = true;
          b.addEventListener('click', function () { self._tap(side, i); });
          var bow = api.el('span', 'pb-bow'); bow.setAttribute('aria-hidden', 'true'); b.appendChild(bow);
          var nb = api.el('span', 'pb-num'); nb.setAttribute('aria-hidden', 'true'); b.appendChild(nb);
          mat.appendChild(b); self._items[side].push(b);
        }(k));
      }
      var more = api.el('button', 'pb-more'); more.type = 'button'; more.textContent = t('moreBtn');
      more.setAttribute('aria-label', t(side === 'a' ? 'moreTopAria' : 'moreBottomAria'));
      more.addEventListener('click', function () { self._choose(side); });
      mat.appendChild(more); self._more[side] = more;
      self._mats[side] = mat;
    });
    var seam = api.el('div', 'pb-seam');
    var same = api.el('button', 'pb-same'); same.type = 'button'; same.textContent = t('sameBtn');
    same.addEventListener('click', function () { self._choose('same'); });
    seam.appendChild(same); this._same = same;
    wrap.appendChild(this._mats.a); wrap.appendChild(seam); wrap.appendChild(this._mats.b);
    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = PartnerBowsCore.layout(this._width(), st ? st.places : 12), w = this._wrap;
    ['wide', 'stack', 'narrow'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.setProperty('--pb-cell', L.cell + 'px');
    w.style.setProperty('--pb-pic', L.pic + 'px');
    w.style.setProperty('--pb-mw', L.matW + 'px');
    w.style.setProperty('--pb-mh', L.matH + 'px');
    w.style.setProperty('--pb-more-w', (L.mode === 'narrow' ? 2 * L.cell : L.cell) + 'px');
    this._layoutFor = st ? st.places : 12; this._spotsFor = null;
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
  _bowSvg: function (k) {
    var c = this.BOW_COLORS[k % this.BOW_COLORS.length], shape = this.BOW_KNOTS[k % this.BOW_KNOTS.length];
    var knot = { circle: '<circle cx="20" cy="14" r="5.5" fill="#fff"/>', square: '<rect x="15" y="9" width="10" height="10" rx="1.5" fill="#fff"/>', diamond: '<path d="M20 7.5l6.5 6.5-6.5 6.5-6.5-6.5z" fill="#fff"/>', triangle: '<path d="M20 8l6.5 11h-13z" fill="#fff"/>',
      star: '<path d="M20 7.5l1.9 4.2 4.6.4-3.5 3 1.1 4.5L20 17.3l-4.1 2.3 1.1-4.5-3.5-3 4.6-.4z" fill="#fff"/>', heart: '<path d="M20 20s-6-3.6-6-7.4c0-2 1.5-3.4 3.2-3.4 1.2 0 2.2.7 2.8 1.6.6-.9 1.6-1.6 2.8-1.6 1.7 0 3.2 1.4 3.2 3.4 0 3.8-6 7.4-6 7.4z" fill="#fff"/>' }[shape];
    return '<svg viewBox="0 0 40 28"><path d="M20 14L3 4c-2 0-3 2-3 10s1 10 3 10z M20 14L37 4c2 0 3 2 3 10s-1 10-3 10z" fill="' + c + '" stroke="rgba(0,0,0,.25)" stroke-width="1"/><circle cx="20" cy="14" r="8" fill="' + c + '" stroke="#fff" stroke-width="2"/>' + knot.replace('fill="#fff"', 'fill="#fff" opacity=".95"') + '</svg>';
  },

  _paint: function () {
    var st = this.st, C = PartnerBowsCore, t = this.api.t, self = this;
    if (this._layoutFor !== st.places) this._layout();
    var L = this._L;
    if (this._spotsFor !== st.id + ':' + L.mode) { this._spots = { a: C.spots(st, 'a', L), b: C.spots(st, 'b', L) }; this._spotsFor = st.id + ':' + L.mode; }
    this._wrap.classList.toggle('is-done', st.done);
    var showLone = C.showLone(st), lone = { a: showLone ? C.lone(st, 'a') : [], b: showLone ? C.lone(st, 'b') : [] };
    ['a', 'b'].forEach(function (side) {
      var noun = side === 'a' ? st.kind.a : st.kind.b, theme = self._themes[side === 'a' ? st.kind.aTheme : st.kind.bTheme];
      for (var i = 0; i < 10; i++) {
        var b = self._items[side][i], on = i < st[side];
        b.hidden = !on;
        if (!on) continue;
        var s = self._spots[side][i];
        b.style.left = s.x + 'px'; b.style.top = s.y + 'px'; b.style.setProperty('--pb-tilt', s.tilt + 'deg');
        var img = b.querySelector('img');
        if (img && img.getAttribute('data-noun') !== noun) { img.remove(); img = null; }
        if (!img && theme && theme.nouns[noun]) { img = LCSPictures.img(theme, noun, self.api.lang, { plural: false }); img.className = 'pb-pic'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.setAttribute('data-noun', noun); b.insertBefore(img, b.firstChild); }
        var k = C.pairOf(st, side, i), bow = b.querySelector('.pb-bow');
        if (k >= 0) { if (bow.getAttribute('data-k') !== String(k)) { bow.innerHTML = self._bowSvg(k); bow.setAttribute('data-k', String(k)); } bow.classList.add('is-on'); }
        else { bow.classList.remove('is-on'); bow.removeAttribute('data-k'); bow.innerHTML = ''; }
        b.classList.toggle('is-paired', k >= 0);
        b.classList.toggle('is-picked', !!(st.pick && st.pick.side === side && st.pick.i === i));
        b.classList.toggle('is-lone', lone[side].indexOf(i) >= 0);
        b.setAttribute('aria-label', t(k >= 0 ? 'pairedAria' : 'pairAria'));
        b.disabled = st.done;
        var nb = b.querySelector('.pb-num'), num = '';
        if (st.done) { var pos = self._readOrder(side).indexOf(i); num = String(pos + 1); }
        nb.textContent = num; nb.classList.toggle('is-on', !!num); nb.classList.toggle('is-gold', st.done && num === String(st[side]));
      }
      self._more[side].classList.toggle('is-on', st.choice === side);
      self._more[side].setAttribute('aria-pressed', String(st.choice === side));
      self._more[side].disabled = st.done;
    });
    this._same.classList.toggle('is-on', st.choice === 'same');
    this._same.setAttribute('aria-pressed', String(st.choice === 'same'));
    this._same.disabled = st.done;
  },
  /* the order a group is numbered in when done: rows top to bottom, each left to right */
  _readOrder: function (side) {
    var sp = this._spots[side], idx = [];
    for (var i = 0; i < this.st[side]; i++) idx.push(i);
    return idx.sort(function (p, q) { var dy = sp[p].y - sp[q].y; return (Math.abs(dy) > 8 ? dy : sp[p].x - sp[q].x) || p - q; });
  },

  /* ---------------- the hand ---------------- */
  _tap: function (side, i) {
    var r = PartnerBowsCore.tap(this.st, side, i);
    if (!r) return;
    this.api.sound(r === 'pair' ? 620 : r === 'unpair' ? 330 : 470);
    this._paint();
    if (r === 'pair') { var pr = this.st.pairs[this.st.pairs.length - 1]; bounce(this._items.a[pr[0]], 'pb-tie'); bounce(this._items.b[pr[1]], 'pb-tie'); }
    this.api.track('tap', { side: side, result: r, pairs: this.st.pairs.length });
  },
  _choose: function (c) {
    if (!PartnerBowsCore.choose(this.st, c)) return;
    this.api.sound(520);
    this._paint();
    this.api.track('choose', { choice: c });
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._paint();
    if (res.slip === 'none') return;
    if (res.ok) { this.api.sound(660); }
    else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, choice: res.choice, misses: st.misses, pairs: st.pairs.length });
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var pbCssDone = false;
function injectPartnerBowsCSS() {
  if (pbCssDone || typeof document === 'undefined') return;
  pbCssDone = true;
  var css = ''
  + '.pb-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:4px;--pb-cell:100px;--pb-pic:94px;--pb-mw:616px;--pb-mh:216px;--pb-more-w:100px;}'
  /* the two mats: a meadow (top) and a garden bed (bottom) */
  + '.pb-mat{position:relative;width:var(--pb-mw);height:var(--pb-mh);box-sizing:border-box;border-radius:22px;}'
  + '.pb-mat-a{background:radial-gradient(120% 100% at 30% 20%,#EEF7DD,#D9EDBE);box-shadow:inset 0 0 0 4px #B7D48E,0 6px 12px rgba(50,80,20,.12);}'
  + '.pb-mat-b{background:radial-gradient(120% 100% at 70% 20%,#FBF0DE,#F1DDBB);box-shadow:inset 0 0 0 4px #DCC08E,0 6px 12px rgba(80,60,20,.12);}'
  + '.pb-it{position:absolute;width:var(--pb-pic);height:var(--pb-pic);padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;touch-action:manipulation;transform:rotate(var(--pb-tilt,0deg));-webkit-tap-highlight-color:transparent;z-index:1;} .pb-it[hidden]{display:none;}'
  + '.pb-it::before{content:"";position:absolute;inset:4%;border-radius:50%;transition:background .15s,box-shadow .15s;}'
  + '.pb-it.is-picked::before{background:rgba(255,248,220,.85);box-shadow:0 0 0 4px #E9B824,0 0 14px 4px rgba(233,184,36,.55);} .pb-it.is-picked .pb-pic{transform:translateY(-6%) scale(1.06);}'
  + '.pb-it:disabled{cursor:default;} .pb-it:focus-visible,.pb-more:focus-visible,.pb-same:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.pb-pic{position:relative;width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 3px 2px rgba(40,40,20,.22));transition:transform .15s;}'
  /* the bow: a ribbon in a colour, its knot in a shape */
  + '.pb-bow{position:absolute;left:50%;bottom:-4%;width:max(30px,calc(var(--pb-pic) * .46));height:max(21px,calc(var(--pb-pic) * .32));transform:translateX(-50%) rotate(calc(-1 * var(--pb-tilt,0deg)));display:none;z-index:2;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25));pointer-events:none;} .pb-bow.is-on{display:block;} .pb-bow svg{width:100%;height:100%;display:block;}'
  + '.pb-it.pb-tie .pb-bow{animation:pb-tie .32s var(--lcs-ease) 1;} @keyframes pb-tie{0%{transform:translateX(-50%) scale(0) rotate(-30deg);}70%{transform:translateX(-50%) scale(1.2);}100%{transform:translateX(-50%) scale(1);}}'
  /* the ones without a partner, at help 2 and when done */
  + '.pb-it.is-lone::after{content:"";position:absolute;inset:-3%;border-radius:50%;border:4px solid var(--lcs-accent);pointer-events:none;}'
  /* the answers: "More" in each mat\'s top-right corner (a place no creature uses), "The same" between */
  + '.pb-more{position:absolute;right:14px;top:10px;width:calc(var(--pb-more-w) - 12px);min-height:44px;height:min(60px,calc(var(--pb-cell) - 8px));box-sizing:border-box;padding:0 6px;border-radius:16px;border:3px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;font-size:clamp(14px,calc(var(--pb-cell) * .2),20px);line-height:1.1;cursor:pointer;touch-action:manipulation;z-index:3;box-shadow:0 3px 0 rgba(0,0,0,.08);}'
  + '.pb-more.is-on,.pb-same.is-on{background:var(--lcs-structure);border-color:var(--lcs-structure);color:#fff;}'
  + '.pb-seam{width:var(--pb-mw);min-height:48px;display:flex;align-items:center;justify-content:center;}'
  + '.pb-same{min-height:46px;min-width:140px;padding:0 20px;border-radius:23px;border:3px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;font-size:18px;cursor:pointer;touch-action:manipulation;}'
  + '.pb-num{position:absolute;right:-2px;top:-2px;min-width:26px;height:26px;padding:0 5px;box-sizing:border-box;border-radius:13px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:15px;line-height:22px;text-align:center;pointer-events:none;z-index:3;transform:rotate(calc(-1 * var(--pb-tilt,0deg)));}'
  + '.pb-num:not(.is-on){display:none;} .pb-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:34px;height:34px;line-height:30px;font-size:20px;border-radius:17px;}'
  + '.pb-wrap.is-narrow .pb-num{min-width:18px;height:18px;padding:0 2px;font-size:11px;line-height:14px;} .pb-wrap.is-narrow .pb-num.is-gold{min-width:24px;height:24px;line-height:20px;font-size:14px;}'
  + '.pb-wrap.is-stack .pb-mat,.pb-wrap.is-narrow .pb-mat{border-radius:18px;} .pb-wrap.is-stack .pb-seam,.pb-wrap.is-narrow .pb-seam{min-height:44px;} .pb-wrap.is-stack,.pb-wrap.is-narrow{gap:2px;} .pb-wrap.is-stack .pb-same,.pb-wrap.is-narrow .pb-same{min-height:44px;}'
  + '@media (prefers-reduced-motion:reduce){.pb-it .pb-bow{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'pb-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = PartnerBowsActivity;
if (typeof window !== 'undefined') window.PartnerBowsActivity = PartnerBowsActivity;
