/* =====================================================================
   PIP'S STACKING FENCE — ACTIVITY SKIN  (graph-it-activity.js)
   ---------------------------------------------------------------------
   2.MD.D.10 · data/bar-graphs. The lcs-shell activity skin over
   graph-it-core.js. answerType:'state'.

   TWO verbs:
     • BUILD/FIX — the child taps a category COLUMN to place one unit (the bar
       grows by hand); an Undo removes the last; auto-resolves on the EXACT
       per-category count (graph-it-core builtMatchesData).
     • INTERPRET — the given graph + an answer rail; the child SELECTS a chip
       then taps a DELIBERATE "That's my answer!" commit. A wrong commit routes
       through a GUIDED RE-READ (the two bars highlight + Pip speaks the
       scaffold + the rail reshuffles), NOT a shell try-again. MATCH = tap the
       graph that fits the tally.

   The relational question rides in the SHELL prompt (free TTS) via promptKey +
   promptArgs; the in-stage line carries Pip's reactions. The shell Check is
   the post-resolve advance, hidden until resolved (a `.lcs-app.graphit-resolved`
   marker; 0 lines to lcs-shell.js/.css). A per-round token guards deferred
   callbacks. 0 lines to any core / lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.GraphItCore;

  /* category display defs — distinguished by SHAPE + LABEL, never hue alone. */
  var CAT = {
    leaf: { label: 'Leaves', color: '#4E9A5E', shape: 'leaf' },
    berry: { label: 'Berries', color: '#C0392B', shape: 'circle' },
    acorn: { label: 'Acorns', color: '#9B7340', shape: 'acorn' },
    pinecone: { label: 'Pinecones', color: '#6B4F2A', shape: 'triangle' },
    mushroom: { label: 'Mushrooms', color: '#D35400', shape: 'dome' },
    flower: { label: 'Flowers', color: '#C2569B', shape: 'star' }
  };
  function cdef(k) { return CAT[k] || { label: k, color: '#146B5E', shape: 'circle' }; }

  /* Per-locale category labels (plural nouns). EN mirrors CAT.label; DE per the
     native ensemble. clabel() reads the shell's current locale (like txt). */
  var CAT_L = {
    en: { leaf: 'Leaves', berry: 'Berries', acorn: 'Acorns', pinecone: 'Pinecones', mushroom: 'Mushrooms', flower: 'Flowers' },
    de: { leaf: 'Blätter', berry: 'Beeren', acorn: 'Eicheln', pinecone: 'Tannenzapfen', mushroom: 'Pilze', flower: 'Blumen' },
    /* FR — lowercase article-less plurals so they slot into the comparatives
       « Combien de {a} de plus que de {b} ? » (agreement-proof; French common
       nouns are not capitalized mid-sentence). Also the bar labels. */
    fr: { leaf: 'feuilles', berry: 'baies', acorn: 'glands', pinecone: 'pommes de pin', mushroom: 'champignons', flower: 'fleurs' },
    /* es-MX — native ensemble. "piñas de pino" (NOT bare "piñas" = piña/pineapple in MX);
       "hongos" (masc — el único masculino; el resto femenino → ver el truco de género
       en qMore/qFewer/qTotal, partitivo "de {a}"). */
    es: { leaf: 'hojas', berry: 'bayas', acorn: 'bellotas', pinecone: 'piñas de pino', mushroom: 'hongos', flower: 'flores' },
    /* pt-BR — native ensemble. Lowercase article-less plurals for the partitive "de {a}"
       (agreement-proof, §A.13.56). "pinhas de pinheiro" (NÃO "pinhas" = fruta-do-conde/ata em BR);
       "cogumelos" (masc — o único; o resto feminino → truque de gênero em qMore/qFewer/qTotal). */
    pt: { leaf: 'folhas', berry: 'frutinhas', acorn: 'bolotas', pinecone: 'pinhas de pinheiro', mushroom: 'cogumelos', flower: 'flores' }
  };
  function clabel(k) { var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en'; return (CAT_L[lang] && CAT_L[lang][k]) || (CAT_L.en && CAT_L.en[k]) || cdef(k).label; }

  /* EN pilot strings. The relational phrasings are a §A.13.48 native-ensemble
     table-fill at fan-out (the §A.13.56 comparative-agreement trap). */
  var L = {
    en: {
      buildLine: 'Read the tally — tap each fence to stack it up!',
      fixLine: 'One fence is wrong. Fix it to match the tally!',
      matchLine: 'Which fence matches the tally?',
      readLine: 'Read Pip’s fence and pick the answer.',
      undo: 'Undo',
      commit: 'That’s my answer!',
      yes: 'Yes — you read it right!',
      buildDone: 'The fence is built — nice stacking!',
      missMore: '{A} has {ca}, {B} has {cb} — count up from {B}.',
      missTotal: '{A} has {ca} and {B} has {cb} — put them together.',
      missVerify: '{A} has {ca}, {B} has {cb}. Look again!',
      missMatch: 'Not quite — check each bar against the tally.',
      tru: 'True', fls: 'False',
      announceBar: '{label} bar is now {n}',
      srCaption: 'Bar graph data'
    },
    /* DE — native ensemble (linguist + Klasse-2 educator). Math vocab clean
       (Säulendiagramm/Säule/Strichliste/ablesen); „Zaun" flavour stays in the title
       only. Comparative qMore/qFewer use article-less plural labels (agreement-proof);
       miss-lines and qVerify use „Es gibt"/colon-count to dodge the plural-verb trap. */
    de: {
      buildLine: 'Lies die Strichliste – tipp auf jede Säule, um sie aufzustapeln!',
      fixLine: 'Eine Säule ist falsch. Verbessere sie, damit sie zur Strichliste passt!',
      matchLine: 'Welches Säulendiagramm passt zur Strichliste?',
      readLine: 'Lies Pips Säulendiagramm und wähle die Antwort.',
      undo: 'Zurück',
      commit: 'Das ist meine Antwort!',
      yes: 'Ja – du hast richtig abgelesen!',
      buildDone: 'Das Säulendiagramm ist fertig – super gestapelt!',
      missMore: '{A}: {ca}, {B}: {cb} – zähl von {cb} aus weiter.',
      missTotal: '{A}: {ca} und {B}: {cb} – zähl sie zusammen.',
      missVerify: '{A}: {ca}, {B}: {cb}. Schau noch mal genau hin!',
      missMatch: 'Noch nicht ganz – vergleiche jede Säule mit der Strichliste.',
      tru: 'Richtig', fls: 'Falsch',
      announceBar: 'Die {label}-Säule ist jetzt {n}',
      srCaption: 'Daten des Säulendiagramms'
    },
    /* FR — native ensemble (linguiste + pédagogue CE1, « Organisation et gestion
       de données »). « diagramme en barres »/« tableau de comptage »/« hauteur ».
       miss-lines use the colon form ({A} : {ca}) to dodge the plural-verb agreement
       trap, exactly like DE. */
    fr: {
      buildLine: 'Lis le tableau de comptage — tape sur chaque barre pour l\'empiler !',
      fixLine: 'Une barre est fausse. Corrige-la pour qu\'elle corresponde au tableau de comptage !',
      matchLine: 'Quel diagramme correspond au tableau de comptage ?',
      readLine: 'Lis le diagramme de Pip et choisis la bonne réponse.',
      undo: 'Annuler',
      commit: 'C\'est ma réponse !',
      yes: 'Oui — tu as bien lu !',
      buildDone: 'Le diagramme est fini — bel empilement !',
      missMore: '{A} : {ca}, {B} : {cb} — compte à partir de {cb}.',
      missTotal: '{A} : {ca} et {B} : {cb} — additionne-les.',
      missVerify: '{A} : {ca}, {B} : {cb}. Regarde encore bien !',
      missMatch: 'Pas tout à fait — compare chaque barre au tableau de comptage.',
      tru: 'Vrai', fls: 'Faux',
      announceBar: 'La barre des {label} est maintenant à {n}.',
      srCaption: 'Données du diagramme en barres'
    },
    /* es-MX — native ensemble (lingüista + pedagoga de 2º, análisis de datos SEP).
       Vocabulario: gráfica de barras / conteo (tabla de conteo) / barra / verdadero-falso.
       miss-lines en forma de dos puntos ({A}: {ca}) para esquivar la concordancia del
       verbo plural (Hojas TIENEN, no tiene). Tono cálido, sin marcador; "Casi" no "mal". */
    es: {
      buildLine: '¡Lee el conteo y toca cada barra para irla apilando!',
      fixLine: '¡Una barra está mal! Arréglala para que quede igual al conteo.',
      matchLine: '¿Cuál gráfica coincide con el conteo?',
      readLine: 'Lee la gráfica de Pip y elige la respuesta.',
      undo: 'Deshacer',
      commit: '¡Esa es mi respuesta!',
      yes: '¡Sí, lo leíste bien!',
      buildDone: '¡La gráfica quedó lista, qué bien apilaste!',
      missMore: '{A}: {ca}, {B}: {cb}. Cuenta hacia adelante desde {B}.',
      missTotal: '{A}: {ca}, {B}: {cb}. Ahora júntalos.',
      missVerify: '{A}: {ca}, {B}: {cb}. ¡Míralo de nuevo!',
      missMatch: 'Casi. Compara cada barra con el conteo.',
      tru: 'Verdadero', fls: 'Falso',
      announceBar: 'La barra de {label} ahora tiene {n}.',
      srCaption: 'Datos de la gráfica de barras'
    },
    /* pt-BR — native ensemble. Miss-lines usam a forma de dois-pontos (agreement-proof, §A.13.56);
       são anúncios aria (o {A}/{B} sai de clabel() minúsculo, como es/fr). Registro cálido BR. */
    pt: {
      buildLine: 'Leia a contagem e toque em cada cerca para empilhar!',
      fixLine: 'Uma cerca está errada. Conserte para ficar igual à contagem!',
      matchLine: 'Qual cerca combina com a contagem?',
      readLine: 'Leia a cerca do Pip e escolha a resposta.',
      undo: 'Desfazer',
      commit: 'Essa é a minha resposta!',
      yes: 'Isso! Você leu certinho!',
      buildDone: 'A cerca ficou pronta — muito bem empilhada!',
      missMore: '{A}: {ca}, {B}: {cb}. Conte para a frente a partir de {B}.',
      missTotal: '{A}: {ca}, {B}: {cb}. Agora junte tudo.',
      missVerify: '{A}: {ca}, {B}: {cb}. Olhe de novo!',
      missMatch: 'Quase! Compare cada barra com a contagem.',
      tru: 'Verdadeiro', fls: 'Falso',
      announceBar: 'A barra de {label} agora tem {n}.',
      srCaption: 'Dados do gráfico de barras'
    }
  };
  function txt(key) { var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en'; return (L[lang] || L.en)[key] || L.en[key] || key; }
  function fill(s, args) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? args[k] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* ---- graph geometry ---- */
  var GW = 280, GH = 116, BY = 96, U = 7.4, BW = 30;

  function shapeIcon(shape, color, s) {
    var h = 'width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true"';
    switch (shape) {
      case 'leaf': return '<svg ' + h + '><path d="M12 2C6 6 4 14 8 20c6-2 10-9 8-18-1 1-3 2-4 4z" fill="' + color + '"/></svg>';
      case 'circle': return '<svg ' + h + '><circle cx="12" cy="12" r="9" fill="' + color + '"/></svg>';
      case 'acorn': return '<svg ' + h + '><ellipse cx="12" cy="14" rx="7" ry="8" fill="' + color + '"/><rect x="4" y="4" width="16" height="6" rx="3" fill="#7a5a30"/></svg>';
      case 'triangle': return '<svg ' + h + '><path d="M12 3 L20 20 L4 20 Z" fill="' + color + '"/></svg>';
      case 'dome': return '<svg ' + h + '><path d="M3 13a9 7 0 0 1 18 0z" fill="' + color + '"/><rect x="9" y="13" width="6" height="8" rx="2" fill="#e8d8b8"/></svg>';
      case 'star': return '<svg ' + h + '><path d="M12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9 z" fill="' + color + '"/></svg>';
      default: return '<svg ' + h + '><circle cx="12" cy="12" r="9" fill="' + color + '"/></svg>';
    }
  }

  function tallyMarks(c) {
    var out = '';
    for (var i = 0; i < c; i++) {
      var inGroup = i % 5;
      if (inGroup === 4) out += '<span class="gi-tmark gi-tcross"></span>';
      else out += '<span class="gi-tmark"></span>';
      if (inGroup === 4 && i < c - 1) out += '<span class="gi-tgap"></span>';
    }
    return out;
  }

  /* build a bar-graph SVG from a counts map. opts: {cats, highlight:[k], tappable:bool} */
  function graphSVG(cats, countMap, opts) {
    opts = opts || {};
    var n = cats.length;
    var slot = Math.min(64, (GW - 16) / n);
    var startX = (GW - n * slot) / 2 + slot / 2;
    var s = '<svg class="gi-graph" viewBox="0 0 ' + GW + ' ' + GH + '" role="img" aria-label="Bar graph">';
    /* faint unit gridlines + axis numbers 5 and 10 */
    [5, 10].forEach(function (g) {
      var y = BY - g * U;
      s += '<line x1="14" y1="' + y + '" x2="' + (GW - 6) + '" y2="' + y + '" stroke="#E4D8BE" stroke-width="1"/>';
      s += '<text x="10" y="' + (y + 3) + '" font-size="8" fill="#9a8a66" text-anchor="end">' + g + '</text>';
    });
    s += '<line x1="14" y1="' + BY + '" x2="' + (GW - 6) + '" y2="' + BY + '" stroke="#C9B68C" stroke-width="2"/>';
    cats.forEach(function (k, i) {
      var d = cdef(k), c = countMap[k] || 0, cx = startX + i * slot, x = cx - BW / 2;
      var hl = opts.highlight && opts.highlight.indexOf(k) >= 0;
      /* per-unit stacked cells */
      for (var u = 0; u < c; u++) {
        var uy = BY - (u + 1) * U + 1;
        s += '<rect x="' + x + '" y="' + uy + '" width="' + BW + '" height="' + (U - 1.4) + '" rx="1.5" fill="' + d.color + '"' + (hl ? ' stroke="#F2784B" stroke-width="2"' : '') + '/>';
      }
      if (hl) s += '<rect x="' + (x - 3) + '" y="' + (BY - c * U - 3) + '" width="' + (BW + 6) + '" height="' + (c * U + 6) + '" rx="4" fill="none" stroke="#F2784B" stroke-width="2.5"/>';
      /* category shape marker under the axis */
      s += '<g transform="translate(' + (cx - 9) + ',' + (BY + 3) + ')">' + shapeIcon(d.shape, d.color, 18) + '</g>';
      /* tappable invisible column (build) */
      if (opts.tappable) s += '<rect class="gi-col" data-cat="' + k + '" x="' + (cx - slot / 2 + 2) + '" y="6" width="' + (slot - 4) + '" height="' + (BY - 6) + '" fill="transparent" style="cursor:pointer"/>';
    });
    s += '</svg>';
    return s;
  }

  var GraphItActivity = {
    id: 'graph-it',
    strings: {
      /* es-MX — el truco de género (§A.13.56): en qMore/qFewer/qTotal el sustantivo va
         DENTRO del partitivo "de {a}" → "cuántas" es pronombre interrogativo autónomo
         (refiere a una cantidad femenina implícita), NO concuerda con {a}; funciona para
         hongos (m) igual que para hojas (f). qVerify usa "Hay {by} {x}…" (impersonal → invariable). */
      title: { en: "Pip's Stacking Fence", de: 'Pips Stapelzaun', fr: 'La palissade de Pip', es: 'La cerca apilada de Pip', pt: 'A cerca empilhada do Pip' },
      instruction: { en: 'Build a bar graph, then read how many more!', de: 'Baue ein Säulendiagramm und lies dann ab, wie viele mehr!', fr: 'Construis un diagramme en barres, puis lis combien il y en a de plus !', es: '¡Construye una gráfica de barras y descubre cuántas hay de más!', pt: 'Monte um gráfico de barras e descubra quantas tem a mais!' },
      qBuild: { en: 'Build the fence to match the tally.', de: 'Baue das Säulendiagramm nach der Strichliste.', fr: 'Construis le diagramme en barres d\'après le tableau de comptage.', es: 'Construye la gráfica para que quede igual al conteo.', pt: 'Monte a cerca para ficar igual à contagem.' },
      qFix: { en: 'One fence bar is wrong — fix it!', de: 'Eine Säule ist falsch – verbessere sie!', fr: 'Une barre est fausse — corrige-la !', es: '¡Una barra está mal, arréglala!', pt: 'Uma barra da cerca está errada — conserte!' },
      qMatch: { en: 'Which fence matches the tally?', de: 'Welches Säulendiagramm passt zur Strichliste?', fr: 'Quel diagramme correspond au tableau de comptage ?', es: '¿Cuál gráfica coincide con el conteo?', pt: 'Qual cerca combina com a contagem?' },
      qMore: { en: 'How many MORE {a} than {b}?', de: 'Wie viele {a} mehr als {b}?', fr: 'Combien de {a} de plus que de {b} ?', es: '¿Cuántas MÁS hay de {a} que de {b}?', pt: 'Quantas a MAIS tem de {a} do que de {b}?' },
      qFewer: { en: 'How many FEWER {a} than {b}?', de: 'Wie viele {a} weniger als {b}?', fr: 'Combien de {a} de moins que de {b} ?', es: '¿Cuántas MENOS hay de {a} que de {b}?', pt: 'Quantas a MENOS tem de {a} do que de {b}?' },
      qTotal: { en: 'How many {a} and {b} TOGETHER?', de: 'Wie viele {a} und {b} zusammen?', fr: 'Combien de {a} et de {b} en tout ?', es: '¿Cuántas hay de {a} y de {b} en TOTAL?', pt: 'Quantas tem de {a} e de {b} no TOTAL?' },
      qVerify: { en: '{x} beat {y} by {by}. True or false?', de: 'Es gibt {by} {x} mehr als {y}. Stimmt das?', fr: 'Il y a {by} {x} de plus que de {y}. Vrai ou faux ?', es: 'Hay {by} {x} más que {y}. ¿Verdadero o falso?', pt: 'Tem {by} {x} a mais que {y}. Verdadeiro ou falso?' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._harvest = 0; this._round = null; this._built = {}; this._placeOrder = [];
      this._selected = null; this._rail = null; this._resolved = false; this._token = 0;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('gi-style')) return;
      var s = el('style'); s.id = 'gi-style';
      s.textContent = [
        /* center the play cluster in the activity stage so it isn't top-aligned
           with a dead band below on tall desktops (inert if the stage isn't a
           flex column; content stays within the fold either way) */
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.gi-root{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:540px;margin:0 auto;}',
        '.gi-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.gi-pip{flex:0 0 auto;}',
        '.gi-line{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .92rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.gi-line.miss{color:#C2410C;}',
        '.gi-basket{flex:0 0 auto;}',
        '.gi-graph{width:100%;height:auto;max-height:112px;display:block;}',
        '.gi-tally{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 14px;width:100%;}',
        '.gi-trow{display:inline-flex;align-items:center;gap:5px;font:700 .8rem/1 Nunito,sans-serif;color:#5a4a2a;}',
        '.gi-tmarks{display:inline-flex;align-items:flex-end;gap:2px;height:14px;}',
        '.gi-tmark{width:2px;height:13px;background:#7a5a30;display:inline-block;}',
        '.gi-tcross{background:#C0392B;}', '.gi-tgap{width:6px;display:inline-block;}',
        '.gi-rail{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;width:100%;}',
        '.gi-chip{min-width:46px;min-height:46px;border:2.5px solid #146B5E;border-radius:12px;background:#fff;color:#0F4A40;',
        'font:800 1.15rem/1 Baloo 2,Nunito,sans-serif;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:4px 10px;}',
        '.gi-chip.sel{background:#146B5E;color:#fff;}',
        '.gi-chip.tf{min-width:88px;font-size:1rem;}',
        '.gi-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;width:100%;}',
        '.gi-btn{min-height:46px;border-radius:13px;border:none;font:800 1rem/1 Baloo 2,Nunito,sans-serif;cursor:pointer;padding:8px 18px;}',
        '.gi-commit{background:#F2784B;color:#fff;}', '.gi-commit[disabled]{opacity:.45;cursor:default;}',
        '.gi-undo{background:#fff;color:#146B5E;border:2.5px solid #146B5E;min-width:88px;}',
        '.gi-thumbs{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;}',
        '.gi-thumb{border:3px solid #146B5E;border-radius:12px;background:#fff;cursor:pointer;padding:5px;width:144px;}',
        '.gi-thumb svg{width:100%;height:auto;}',
        '.gi-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '.lcs-app:not(.graphit-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'graph-it.bar-graph.2-md-d-10';
      var tries = ['/mini-tools/graph-it-activities.json', 'graph-it-activities.json', '../mini tools/graph-it-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._pool = (row && row.params && row.params.rounds) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    /* build rounds first (gentle ramp), then meta+interpret shuffled per pass */
    _bandOrder: function (pool, prev) {
      var head = [], rest = [];
      for (var i = 0; i < pool.length; i++) { if (pool[i].kind === 'build') head.push(i); else rest.push(i); }
      function sh(a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; }
      var order = head.concat(sh(rest.slice()));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = head.concat(sh(rest.slice())); }
      return order;
    },

    nextTask: function (ctx) {
      var pool = this._pool || []; if (!pool.length) return null;
      var n = pool.length, index = (ctx && ctx.index) || 0, pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) { this._order = this._bandOrder(pool); this._orderForPool = pool; this._curPass = 0; }
      else if (pass > this._curPass) { this._order = this._bandOrder(pool, this._order); this._curPass = pass; }
      return this._makeTask(pool[this._order[index % n]]);
    },

    _makeTask: function (round) {
      var q = round.question || {}, self = this;
      var promptKey, promptArgs = {};
      if (round.cog === 'fix') promptKey = 'qFix';
      else if (round.cog === 'match') promptKey = 'qMatch';
      else if (round.kind === 'build') promptKey = 'qBuild';
      else if (q.type === 'more') { promptKey = 'qMore'; promptArgs = { a: clabel(q.a), b: clabel(q.b) }; }
      else if (q.type === 'fewer') { promptKey = 'qFewer'; promptArgs = { a: clabel(q.a), b: clabel(q.b) }; }
      else if (q.type === 'total') { promptKey = 'qTotal'; promptArgs = { a: clabel(q.a), b: clabel(q.b) }; }
      else if (q.type === 'verify') { promptKey = 'qVerify'; promptArgs = { x: clabel(q.x), y: clabel(q.y), by: q.by }; }
      return {
        id: round.id, promptKey: promptKey, promptArgs: promptArgs, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._selected = null; this._rail = null;
      this._placeOrder = []; this._highlight = []; this._thumbOrder = null;
      this._token = (this._token || 0) + 1;
      /* build/fix start state: empty for build, the wrong graph for fix */
      this._built = {};
      Core.catKeys(round).forEach(function (k) { this._built[k] = 0; }, this);
      if (round.cog === 'fix' && round.graphInit) { var gi = round.graphInit; for (var k in gi) if (gi.hasOwnProperty(k)) this._built[k] = gi[k]; }
      if (this._app) this._app.classList.remove('graphit-resolved');
    },

    _reduceMotion: function () { return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches; },

    /* ---- render dispatch ---- */
    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'gi-root');

      var say = el('div', 'gi-say');
      var pip = el('div'); pip.innerHTML = pipSVG();
      var line = el('p', 'gi-line'); line.setAttribute('aria-live', 'polite'); line.textContent = this._defaultLine();
      var bask = el('div'); bask.innerHTML = basketSVG(this._harvest);
      say.append(pip, line, bask); root.appendChild(say);

      if (round.kind === 'interpret') this._renderInterpret(root);
      else if (round.cog === 'match') this._renderMatch(root);
      else this._renderBuild(root);   /* build + fix */

      root.appendChild(this._tableMirror());
      stage.appendChild(root);
      this._line = line;
    },

    _defaultLine: function () {
      var r = this._round;
      if (r.cog === 'fix') return txt('fixLine');
      if (r.cog === 'match') return txt('matchLine');
      if (r.kind === 'build') return txt('buildLine');
      return txt('readLine');
    },

    /* ----- BUILD / FIX ----- */
    _renderBuild: function (root) {
      var self = this, round = this._round, cats = Core.catKeys(round);
      var gwrap = el('div'); gwrap.style.width = '100%';
      gwrap.innerHTML = graphSVG(cats, this._built, { cats: cats, tappable: true });
      root.appendChild(gwrap);
      gwrap.querySelectorAll('.gi-col').forEach(function (c) {
        c.addEventListener('click', function () { self._place(c.getAttribute('data-cat')); });
      });
      /* the tally / icon source to decode */
      var tally = el('div', 'gi-tally');
      cats.forEach(function (k) {
        var d = cdef(k), row = el('div', 'gi-trow');
        var goal = round.data[k] || 0;
        var marks = round.source === 'icons'
          ? '<span class="gi-tmarks">' + Array.apply(null, { length: goal }).map(function () { return shapeIcon(d.shape, d.color, 12); }).join('') + '</span>'
          : '<span class="gi-tmarks">' + tallyMarks(goal) + '</span>';
        row.innerHTML = shapeIcon(d.shape, d.color, 16) + '<span>' + clabel(k) + '</span>' + marks;
        tally.appendChild(row);
      });
      root.appendChild(tally);
      var rowEl = el('div', 'gi-row');
      var undo = el('button', 'gi-btn gi-undo gi-card'); undo.type = 'button'; undo.textContent = txt('undo');
      undo.addEventListener('click', function () { self._undo(); });
      rowEl.appendChild(undo); root.appendChild(rowEl);
    },

    _place: function (cat) {
      if (this._resolved) return;
      Core.placeOne(this._built, cat); this._placeOrder.push(cat);
      this._api.sound && this._api.sound(640);
      this._afterBuildChange(cat);
    },
    _undo: function () {
      if (this._resolved || !this._placeOrder.length) return;
      var cat = this._placeOrder.pop(); Core.removeOne(this._built, cat);
      this._afterBuildChange(cat);
    },
    _afterBuildChange: function (cat) {
      this.render();
      this._api.announce && this._api.announce(fill(txt('announceBar'), { label: clabel(cat), n: (this._built[cat] || 0) }));
      if (Core.builtMatchesData(this._round, this._built)) {
        if (this._line) this._line.textContent = txt('buildDone');
        this._resolve();
      }
    },

    /* ----- INTERPRET ----- */
    _renderInterpret: function (root) {
      var self = this, round = this._round, cats = Core.catKeys(round), q = round.question;
      var gwrap = el('div'); gwrap.style.width = '100%';
      gwrap.innerHTML = graphSVG(cats, round.data, { cats: cats, highlight: this._highlight || [] });
      root.appendChild(gwrap);
      var rail = el('div', 'gi-rail');
      if (q.type === 'verify') {
        if (!this._rail) this._rail = ['T', 'F'];
        this._rail.forEach(function (v) {
          var b = el('button', 'gi-chip tf gi-card'); b.type = 'button'; b.textContent = v === 'T' ? txt('tru') : txt('fls');
          if (self._selected === v) b.classList.add('sel');
          b.addEventListener('click', function () { self._select(v); });
          rail.appendChild(b);
        });
      } else {
        if (!this._rail) this._rail = this._buildRail(Core.audit(round).expectedAnswer, Core.railMax(round));
        this._rail.forEach(function (v) {
          var b = el('button', 'gi-chip gi-card'); b.type = 'button'; b.textContent = String(v);
          if (self._selected === v) b.classList.add('sel');
          b.addEventListener('click', function () { self._select(v); });
          rail.appendChild(b);
        });
      }
      root.appendChild(rail);
      var rowEl = el('div', 'gi-row');
      var commit = el('button', 'gi-btn gi-commit gi-card'); commit.type = 'button'; commit.textContent = txt('commit');
      commit.disabled = (this._selected == null);
      commit.addEventListener('click', function () { self._commit(); });
      rowEl.appendChild(commit); root.appendChild(rowEl);
    },

    _buildRail: function (answer, railMax) {
      var lo = Math.max(0, answer - 2), set = [];
      for (var v = lo; v <= answer + 3 && set.length < 6; v++) set.push(v);
      while (set.length < 5) set.push(set[set.length - 1] + 1);
      /* shuffle */
      for (var k = set.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = set[k]; set[k] = set[j]; set[j] = t; }
      return set;
    },

    _select: function (v) {
      if (this._resolved) return;
      this._selected = (this._selected === v) ? null : v;
      this.render();
    },

    _commit: function () {
      if (this._resolved || this._selected == null) return;
      var round = this._round, q = round.question;
      var committed = (q.type === 'verify') ? (this._selected === 'T') : this._selected;
      if (Core.isInterpretCorrect(round, committed)) {
        if (this._line) { this._line.textContent = txt('yes'); this._line.classList.remove('miss'); }
        this._resolve();
      } else {
        this._guidedReread();
      }
    },

    _guidedReread: function () {
      var round = this._round, q = round.question, d = round.data;
      var a = q.a || q.x, b = q.b || q.y;
      this._highlight = [a, b];
      var msg;
      if (q.type === 'total') msg = fill(txt('missTotal'), { A: clabel(a), B: clabel(b), ca: d[a], cb: d[b] });
      else if (q.type === 'verify') msg = fill(txt('missVerify'), { A: clabel(a), B: clabel(b), ca: d[a], cb: d[b] });
      else msg = fill(txt('missMore'), { A: clabel(a), B: clabel(b), ca: d[a], cb: d[b] });
      this._selected = null;
      this._rail = null;   /* reshuffle on next render */
      this.render();       /* re-renders with the two bars highlighted (this._highlight) */
      if (this._line) { this._line.textContent = msg; this._line.classList.add('miss'); }
      this._api.announce && this._api.announce(msg);
      this._api.sound && this._api.sound(420);
      /* the highlight persists until the next commit/round (a warm guide, not a flash) */
    },

    /* ----- MATCH ----- */
    _renderMatch: function (root) {
      var self = this, round = this._round, cats = Core.catKeys(round);
      var tally = el('div', 'gi-tally');
      cats.forEach(function (k) {
        var d = cdef(k), row = el('div', 'gi-trow');
        row.innerHTML = shapeIcon(d.shape, d.color, 16) + '<span>' + clabel(k) + '</span><span class="gi-tmarks">' + tallyMarks(round.data[k] || 0) + '</span>';
        tally.appendChild(row);
      });
      root.appendChild(tally);
      if (!this._thumbOrder) {
        this._thumbOrder = round.options.map(function (_, i) { return i; });
        for (var k = this._thumbOrder.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = this._thumbOrder[k]; this._thumbOrder[k] = this._thumbOrder[j]; this._thumbOrder[j] = t; }
      }
      var thumbs = el('div', 'gi-thumbs');
      this._thumbOrder.forEach(function (oi) {
        var b = el('button', 'gi-thumb gi-card'); b.type = 'button';
        b.innerHTML = graphSVG(cats, round.options[oi], { cats: cats });
        b.addEventListener('click', function () { self._pickThumb(oi); });
        thumbs.appendChild(b);
      });
      root.appendChild(thumbs);
    },
    _pickThumb: function (oi) {
      if (this._resolved) return;
      if (oi === Core.matchIndex(this._round)) { if (this._line) this._line.textContent = txt('yes'); this._resolve(); }
      else { if (this._line) { this._line.textContent = txt('missMatch'); this._line.classList.add('miss'); } this._api.sound && this._api.sound(420); this._api.announce && this._api.announce(txt('missMatch')); }
    },

    /* ----- SR table mirror ----- */
    _tableMirror: function () {
      var round = this._round, cats = Core.catKeys(round);
      var src = (round.kind === 'interpret' || round.cog === 'match') ? round.data : this._built;
      var wrap = el('div', 'gi-sronly'); wrap.setAttribute('aria-live', 'polite');
      var rows = cats.map(function (k) { return '<tr><th>' + clabel(k) + '</th><td>' + (src[k] || 0) + '</td></tr>'; }).join('');
      wrap.innerHTML = '<table><caption>' + txt('srCaption') + '</caption><tbody>' + rows + '</tbody></table>';
      return wrap;
    },

    _resolve: function () {
      this._resolved = true;
      this._harvest += 1;
      if (this._app) this._app.classList.add('graphit-resolved');
      /* refresh the basket */
      var b = this._api.stage.querySelector('.gi-basket'); if (b) b.innerHTML = basketSVG(this._harvest);
      this._api.sound && this._api.sound(860);
    },

    reset: function () { if (this._round) { this._thumbOrder = null; this._beginRound(this._round); this.render(); } }
  };

  function pipSVG() {
    return '<svg class="gi-pip" viewBox="0 0 64 64" width="30" height="30" aria-hidden="true">' +
      '<ellipse cx="32" cy="40" rx="20" ry="18" fill="#C98A4B"/>' +
      '<path d="M16 26 q-3 -12 7 -13 q4 5 3 13 z" fill="#B5763A"/><path d="M48 26 q3 -12 -7 -13 q-4 5 -3 13 z" fill="#B5763A"/>' +
      '<circle cx="25" cy="38" r="4" fill="#2B2B2B"/><circle cx="39" cy="38" r="4" fill="#2B2B2B"/>' +
      '<ellipse cx="32" cy="46" rx="4" ry="3" fill="#2B2B2B"/>' +
      '<path d="M20 52 q12 7 24 0 l0 6 q-12 6 -24 0 z" fill="#146B5E"/></svg>';
  }
  function basketSVG(n) {
    var berries = '', cap = Math.min(n, 12);
    for (var i = 0; i < cap; i++) { var row = Math.floor(i / 4), col = i % 4, bx = 12 + col * 9 + (row % 2) * 4, by = 22 - row * 6; berries += '<circle cx="' + bx + '" cy="' + by + '" r="3.4" fill="#9B2D6B"/>'; }
    return '<svg class="gi-basket" viewBox="0 0 58 40" width="36" height="26" aria-hidden="true">' + berries + '<path d="M5 22 h48 l-4 14 q-1 3 -4 3 H13 q-3 0 -4 -3 z" fill="#B07A47"/><path d="M5 22 h48 l1 4 H4 z" fill="#8C5E33"/></svg>';
  }

  global.GraphItActivity = GraphItActivity;

}(typeof window !== 'undefined' ? window : this));
