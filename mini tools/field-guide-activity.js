/* =====================================================================
   DETECTIVE DEWEY'S FIELD GUIDE — ACTIVITY SKIN  (field-guide-activity.js)
   ---------------------------------------------------------------------
   1.RI.5 · use text features to LOCATE. The lcs-shell activity skin over
   field-guide-core.js. answerType:'state'. EN-ONLY pilot.

   FEATURES-AS-LIST is the canonical render (SR + mobile = ONE path): the
   question rides in the SHELL prompt (question-only TTS); the feature text is
   a readable block (a fictional creature CAPTION for diagram rounds, or a
   TOC / heading / glossary / icon-menu / index list whose entries ARE the
   tappable targets); a TAP-TO-LOCATE picks a target. A correct tap → resolve
   (the shell Check = the post-resolve advance, hidden until resolved via
   `.lcs-app.dewey-resolved`). A WRONG tap → a GUIDED RE-READ (the relevant
   feature text gently highlights + Dewey nudges, NO red-X), retry with the
   target ORDER reshuffled (distractor-set rotation). NO feature-text TTS
   (reading the feature IS the cognition → RI, not SL). Per-round token guard.
   0 lines to any core / lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.FieldGuideCore;

  var L = {
    en: {
      readLine: 'Read the page, then tap the answer.',
      diagramLine: 'Read the caption, then tap the right part.',
      whichLine: 'Think about what each book tool is for.',
      reread: 'Hmm — let’s re-read what the page says. Try again!',
      found: 'FOUND IT! Nice reading, detective.',
      wordsToKnow: 'Words to Know',
      contents: 'Contents'
    },
    de: {
      readLine: 'Lies die Seite und tippe dann auf die Antwort.',
      diagramLine: 'Lies die Beschriftung und tippe auf den richtigen Teil.',
      whichLine: 'Überlege, wofür jedes Buch-Werkzeug da ist.',
      reread: 'Hmm – lies noch einmal nach, was auf der Seite steht. Probier es noch mal!',
      found: 'Gefunden! Gut gelesen, Spürnase!',
      wordsToKnow: 'Wichtige Wörter',
      contents: 'Inhalt'
    },
    fr: {
      readLine: 'Lis la page, puis tape la réponse.',
      diagramLine: 'Lis la légende, puis tape la bonne partie.',
      whichLine: 'Réfléchis à ce que sert chaque outil du livre.',
      reread: 'Hmm… relisons ce que dit la page. Réessaie !',
      found: 'TROUVÉ ! Bien lu, détective.',
      wordsToKnow: 'Mots à connaître',
      contents: 'Sommaire'
    },
    /* es: `contents` is «Índice» — deliberately the same word as the which-feature TOC label.
       In a real Mexican book the section header AND the tool name are the same word, and the
       which-feature round asks about a FUNCTION (not about which page the child saw), so this
       reinforces rather than telegraphs. «pie de imagen» (a drawing) — never «pie de foto». */
    es: {
      readLine: 'Lee la página y luego toca la respuesta.',
      diagramLine: 'Lee el pie de imagen y luego toca la parte correcta.',
      whichLine: 'Piensa para qué sirve cada parte del libro.',
      reread: 'Mmm… volvamos a leer lo que dice la página. ¡Inténtalo otra vez!',
      found: '¡LO ENCONTRASTE! Qué bien lees, detective.',
      wordsToKnow: 'Palabras importantes',
      contents: 'Índice'
    },
    /* pt-BR: `contents` = «Sumário» (ABNT: table of contents = Sumário; Índice = back-of-book
       alphabetical index). Matches the which-feature TOC label. «Legenda» = image caption
       (never «pé de imagem»/«pie de imagen»). você-form; warm BR K-2 «achou!». */
    pt: {
      readLine: 'Leia a página e depois toque na resposta.',
      diagramLine: 'Leia a legenda e depois toque na parte certa.',
      whichLine: 'Pense para que serve cada parte do livro.',
      reread: 'Hmm… vamos ler de novo o que a página diz. Tente outra vez!',
      found: 'ACHOU! Que bom que você lê bem, detetive.',
      wordsToKnow: 'Palavras importantes',
      contents: 'Sumário'
    },
    it: {
      readLine: 'Leggi la pagina, poi tocca la risposta.',
      diagramLine: 'Leggi la didascalia, poi tocca la parte giusta.',
      whichLine: 'Pensa a che cosa serve ogni strumento del libro.',
      reread: 'Hmm, rileggiamo che cosa dice la pagina. Riprova!',
      found: 'TROVATO! Bella lettura, detective.',
      wordsToKnow: 'Parole da sapere',
      contents: 'Indice'
    }
  };
  function txt(k) { var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en'; return (L[lang] || L.en)[k] || L.en[k] || k; }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* a tiny wordless "field-guide creature" stub for diagram rounds (decorative;
     aria-hidden; carries NO function telegraph — equal-salience blobs). */
  function creatureSVG() {
    return '<svg class="fg-creature" viewBox="0 0 120 64" width="60" height="28" aria-hidden="true">' +
      '<ellipse cx="60" cy="40" rx="34" ry="20" fill="#9DB8A6"/>' +
      '<circle cx="92" cy="30" r="14" fill="#9DB8A6"/>' +
      '<circle cx="96" cy="27" r="3" fill="#2B2B2B"/>' +
      '<path d="M30 30 q-10 -14 2 -20 q6 6 6 16 z" fill="#86A290"/>' +
      '<ellipse cx="40" cy="58" rx="6" ry="4" fill="#7A917F"/><ellipse cx="78" cy="58" rx="6" ry="4" fill="#7A917F"/>' +
      '</svg>';
  }
  function deweySVG() {
    return '<svg class="fg-dewey" viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">' +
      '<circle cx="24" cy="26" r="16" fill="#E04A3A"/>' +
      '<path d="M24 10 v16 M8 26 h32" stroke="#7a1f16" stroke-width="2"/>' +
      '<circle cx="18" cy="20" r="3" fill="#2B2B2B"/><circle cx="30" cy="20" r="3" fill="#2B2B2B"/>' +
      '<circle cx="36" cy="12" r="7" fill="none" stroke="#146B5E" stroke-width="2.5"/><line x1="31" y1="17" x2="26" y2="22" stroke="#146B5E" stroke-width="2.5"/>' +
      '</svg>';
  }
  function journalSVG(n) {
    var bits = '', cap = Math.min(n, 10);
    for (var i = 0; i < cap; i++) { var r = Math.floor(i / 4), c = i % 4; bits += '<circle cx="' + (10 + c * 9) + '" cy="' + (20 - r * 6) + '" r="3" fill="' + ['#5AA469', '#C2569B', '#9B7340'][i % 3] + '"/>'; }
    return '<svg class="fg-journal" viewBox="0 0 52 40" width="34" height="26" aria-hidden="true">' + bits + '<rect x="4" y="20" width="44" height="16" rx="2" fill="#C9A063"/><rect x="4" y="20" width="44" height="4" fill="#A37E40"/></svg>';
  }

  var FieldGuideActivity = {
    id: 'field-guide',
    strings: {
      /* es: «guía» not «cuaderno»/«carnet» — the object is a PUBLISHED book (índice, capítulos,
         glosario), not a personal notebook. 27 ch: stays 1 line at 320px.
         Template grammar: Spanish fuses only a+el→al / de+el→del, and NO template ends in a
         preposition that can meet an article — every {fn} slot takes a bare infinitive, so no
         German-style nominalization is needed (Spanish behaves like French here). Verified on the
         hardest case, the reflexive: «…le ayuda a esconderse?» / «…que sirve para esconderse?».
         «parte del libro» not «herramienta» (abstract-adult); «renglón» not «línea» (MX school word). */
      /* pt-BR: «guia de campo» = the BR field-guide genre (a published bird/creature ID book —
         índice/capítulos/glossário); «caderno de campo» = a researcher's notebook (wrong object).
         você-form; every {fn} slot takes a BARE INFINITIVE (pt fuses no article after a/para/consegue),
         so no German-style nominalization — verified on the reflexive «…ajuda ele a se esconder?». */
      title: { en: "Detective Dewey's Field Guide", de: 'Detektiv Deweys Forscherheft', fr: 'Le carnet du détective Dewey', es: 'La guía del detective Dewey', pt: 'O guia de campo do detetive Dewey', it: 'Il taccuino del detective Dewey' },
      instruction: { en: 'Read the book’s tools to find the fact!', de: 'Lies die Werkzeuge des Buches, um die Information zu finden!', fr: 'Lis les outils du livre pour trouver l’information !', es: '¡Lee las partes del libro para encontrar el dato!', pt: 'Leia as partes do livro para achar a informação!', it: 'Leggi gli strumenti del libro per trovare la risposta!' },
      qDiagram: { en: 'Which part helps it {fn}?', de: 'Welcher Teil hilft ihm beim {fn}?', fr: 'Quelle partie l’aide à {fn} ?', es: '¿Qué parte le ayuda a {fn}?', pt: 'Qual parte ajuda ele a {fn}?', it: 'Quale parte lo aiuta a {fn}?' },
      qGlossary: { en: 'Which word means the part that can {fn}?', de: 'Welches Wort beschreibt den Teil zum {fn}?', fr: 'Quel mot désigne la partie qui sert à {fn} ?', es: '¿Qué palabra nombra la parte que sirve para {fn}?', pt: 'Qual palavra é a parte que serve para {fn}?', it: 'Quale parola indica la parte che può {fn}?' },
      qToc: { en: 'Which chapter is about how it can {fn}?', de: 'In welchem Kapitel geht es ums {fn}?', fr: 'Quel chapitre explique comment il fait pour {fn} ?', es: '¿Qué capítulo explica cómo hace para {fn}?', pt: 'Qual capítulo mostra como ele consegue {fn}?', it: 'Quale capitolo parla di come può {fn}?' },
      qHeading: { en: 'Which heading tells how it can {fn}?', de: 'Welche Überschrift handelt vom {fn}?', fr: 'Quel titre raconte comment il fait pour {fn} ?', es: '¿Qué título cuenta cómo hace para {fn}?', pt: 'Qual título conta como ele consegue {fn}?', it: 'Quale titolo dice come può {fn}?' },
      qMenu: { en: 'Which button helps you {fn}?', de: 'Welcher Knopf hilft dir beim {fn}?', fr: 'Quel bouton t’aide à {fn} ?', es: '¿Qué botón te ayuda a {fn}?', pt: 'Qual botão ajuda você a {fn}?', it: 'Quale pulsante ti aiuta a {fn}?' },
      /* es/pt: no round uses qIndex — the back-of-book alphabetical index cog is dropped (a 2.º child
         never meets it; BR/MX school books carry a front Sumário/Índice only). Kept for parity. */
      qIndex: { en: 'Which line leads to the part that can {fn}?', de: 'Welche Zeile führt zur Stelle übers {fn}?', fr: 'Quelle ligne mène à la partie qui sert à {fn} ?', es: '¿Qué renglón te lleva a la página donde se habla de {fn}?', pt: 'Qual linha leva à parte que serve para {fn}?', it: 'Quale riga porta alla parte che può {fn}?' },
      qWhichMeaning: { en: 'To find what a WORD means, which tool do you open?', de: 'Um herauszufinden, was ein WORT bedeutet — welches Buch-Werkzeug öffnest du?', fr: 'Pour trouver ce qu’un MOT veut dire, quel outil ouvres-tu ?', es: 'Para saber qué significa una PALABRA, ¿qué parte del libro abres?', pt: 'Para descobrir o que uma PALAVRA quer dizer, qual ferramenta do livro você abre?', it: 'Per scoprire che cosa vuole dire una PAROLA, quale strumento apri?' },
      qWhichTopic: { en: 'To find which chapter a TOPIC is in, which tool do you open?', de: 'Um herauszufinden, in welchem KAPITEL ein Thema steht — welches Buch-Werkzeug nimmst du?', fr: 'Pour trouver dans quel CHAPITRE un sujet se trouve, quel outil prends-tu ?', es: 'Para saber en qué capítulo está un TEMA, ¿qué parte del libro abres?', pt: 'Para descobrir em qual CAPÍTULO um assunto está, qual ferramenta do livro você abre?', it: 'Per scoprire in quale capitolo si trova un ARGOMENTO, quale strumento apri?' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._displayOrder = null; this._highlight = false;
      this._resolved = false; this._token = 0;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('fg-style')) return;
      var s = el('style'); s.id = 'fg-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.fg-root{display:flex;flex-direction:column;align-items:center;gap:4px;width:100%;max-width:540px;margin:0 auto;}',
        '.fg-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.fg-dewey{flex:0 0 auto;}', '.fg-journal{flex:0 0 auto;}',
        '.fg-line{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.15 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.fg-line.miss{color:#C2410C;}',
        '.fg-caption{width:100%;text-align:center;font:600 .92rem/1.25 Nunito,system-ui,sans-serif;color:#3a3a3a;background:#FFFDF7;border:2px dashed #C9B68C;border-radius:10px;padding:5px 10px;box-sizing:border-box;}',
        '.fg-caption .fg-hl{background:#FCE3C8;border-radius:4px;padding:0 2px;}',
        '.fg-featbox{width:100%;box-sizing:border-box;}',
        '.fg-featlabel{font:800 .7rem/1 Baloo 2,Nunito,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#146B5E;margin:0 0 3px 2px;}',
        '.fg-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px;width:100%;}',
        '.fg-entry{display:flex;flex-direction:column;align-items:flex-start;gap:0;width:100%;box-sizing:border-box;min-height:46px;justify-content:center;',
        'border:2.5px solid #146B5E;border-radius:12px;background:#fff;color:#0F4A40;cursor:pointer;padding:4px 11px;text-align:left;font-family:Nunito,system-ui,sans-serif;}',
        '.fg-entry:hover{background:#EAF5F1;}',
        '.fg-entry .fg-elabel{font:800 1rem/1.15 Baloo 2,Nunito,sans-serif;}',
        '.fg-entry .fg-egloss{font:600 .82rem/1.2 Nunito,sans-serif;color:#5a5a5a;}',
        '.fg-entry.fg-hlrow{border-color:#F2784B;background:#FCEDE4;}',
        '.fg-entry.fg-tool{flex-direction:row;align-items:center;gap:8px;justify-content:center;font-weight:800;}',
        '.fg-icon{width:20px;height:20px;border-radius:50%;background:#146B5E;flex:0 0 auto;}',
        '.fg-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;}',
        '.fg-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '.lcs-app:not(.dewey-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'field-guide.text-features.1-ri-5';
      var tries = ['/mini-tools/field-guide-activities.json', 'field-guide-activities.json', '../mini tools/field-guide-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en';
            self._activityRow = row; self._pool = (row && row.params && ((row.params.roundsL10n && row.params.roundsL10n[lang]) || row.params.rounds)) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = this._shuffle(pool.map(function (_, i) { return i; })); }
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
      var fn = (round.question || {}).functionPhrase, promptKey, args = { fn: fn };
      switch (round.cog) {
        case 'diagram': promptKey = 'qDiagram'; break;
        case 'glossary': promptKey = 'qGlossary'; break;
        case 'toc': promptKey = 'qToc'; break;
        case 'heading': promptKey = 'qHeading'; break;
        case 'menu': promptKey = 'qMenu'; break;
        case 'index': promptKey = 'qIndex'; break;
        case 'which-feature': promptKey = (fn === 'meaning') ? 'qWhichMeaning' : 'qWhichTopic'; args = {}; break;
        default: promptKey = 'qDiagram';
      }
      return {
        id: round.id, promptKey: promptKey, promptArgs: args, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._highlight = false;
      this._token = (this._token || 0) + 1;
      /* per-serve target ORDER shuffle = the distractor-set rotation (no stable
         stimulus→position pair to memorize) */
      this._displayOrder = this._shuffle(Core.items(round).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('dewey-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var self = this, items = Core.items(round);

      var root = el('div', 'fg-root');

      var say = el('div', 'fg-say');
      var dewey = el('div'); dewey.innerHTML = deweySVG();
      var line = el('p', 'fg-line'); line.setAttribute('aria-live', 'polite');
      line.textContent = round.cog === 'diagram' ? txt('diagramLine') : (round.cog === 'which-feature' ? txt('whichLine') : txt('readLine'));
      var jr = el('div'); jr.innerHTML = journalSVG(this._finds);
      say.append(dewey, line, jr); root.appendChild(say);

      /* DIAGRAM skin: a wordless creature + a caption block to read */
      if (round.cog === 'diagram') {
        var art = el('div'); art.style.textAlign = 'center'; art.innerHTML = creatureSVG(); root.appendChild(art);
        var cap = el('p', 'fg-caption');
        var fp = round.question.functionPhrase;
        cap.innerHTML = items.map(function (it) {
          var t = esc(it.gloss);
          if (self._highlight && (it.functions || []).indexOf(fp) >= 0) t = '<span class="fg-hl">' + t + '</span>';
          return t;
        }).join(' ');
        root.appendChild(cap);
      }

      /* the feature box + the tappable entries (FEATURES-AS-LIST canonical) */
      var box = el('div', 'fg-featbox');
      if (round.cog === 'glossary') { var gl = el('p', 'fg-featlabel'); gl.textContent = txt('wordsToKnow'); box.appendChild(gl); }
      else if (round.cog === 'toc') { var tl = el('p', 'fg-featlabel'); tl.textContent = txt('contents'); box.appendChild(tl); }
      var list = el('ul', 'fg-list');
      var fp2 = round.question.functionPhrase;
      this._displayOrder.forEach(function (oi) {
        var it = items[oi];
        var b = el('li', 'fg-entry fg-card'); b.setAttribute('role', 'button'); b.tabIndex = 0;
        b.setAttribute('aria-label', it.label + (it.gloss ? ' — ' + it.gloss : ''));
        var showGloss = (round.cog !== 'diagram' && round.cog !== 'which-feature' && it.gloss);
        if (round.cog === 'which-feature' || round.cog === 'menu') b.classList.add('fg-tool');
        var lab = (round.cog === 'menu' || round.cog === 'which-feature') ? '<span class="fg-icon"></span><span class="fg-elabel">' + esc(it.label) + '</span>' : '<span class="fg-elabel">' + esc(it.label) + '</span>';
        b.innerHTML = lab + (showGloss ? '<span class="fg-egloss">' + esc(it.gloss) + '</span>' : '');
        if (self._highlight && (it.functions || []).indexOf(fp2) >= 0 && round.cog !== 'diagram') b.classList.add('fg-hlrow');
        function tap() { self._tap(it.id); }
        b.addEventListener('click', tap);
        b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
        list.appendChild(b);
      });
      box.appendChild(list); root.appendChild(box);

      root.appendChild(this._srMirror());
      stage.appendChild(root);
      this._line = line;
    },

    _tap: function (id) {
      if (this._resolved) return;
      if (Core.isCorrect(this._round, id)) {
        if (this._line) { this._line.textContent = txt('found'); this._line.classList.remove('miss'); }
        this._resolve();
      } else {
        this._highlight = true;
        /* per-serve re-shuffle of the target order = distractor-set rotation */
        this._displayOrder = this._shuffle(Core.items(this._round).map(function (_, i) { return i; }));
        this.render();
        if (this._line) { this._line.textContent = txt('reread'); this._line.classList.add('miss'); }
        this._api.announce && this._api.announce(txt('reread'));
        this._api.sound && this._api.sound(420);
      }
    },

    _srMirror: function () {
      var round = this._round, items = Core.items(round);
      var wrap = el('div', 'fg-sronly'); wrap.setAttribute('aria-live', 'polite');
      wrap.innerHTML = '<p>' + esc((round.question || {}).functionPhrase || '') + '</p><ul>' +
        items.map(function (it) { return '<li>' + esc(it.label) + (it.gloss ? ': ' + esc(it.gloss) : '') + '</li>'; }).join('') + '</ul>';
      return wrap;
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('dewey-resolved');
      var j = this._api.stage.querySelector('.fg-journal'); if (j) j.outerHTML = journalSVG(this._finds);
      this._api.sound && this._api.sound(860);
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.FieldGuideActivity = FieldGuideActivity;

}(typeof window !== 'undefined' ? window : this));
