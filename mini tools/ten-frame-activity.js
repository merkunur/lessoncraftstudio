/* =====================================================================
   TEN FRAME — ACTIVITY   (ten-frame-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of ten-frame. Reuses ten-frame-core.js for the
   DOM/paint/state. Task source depends on the URL:

   • ?activity=<id>   → fetches ten-frame-activities.json, finds the row,
                         instantiates tasks from the row's task_template +
                         params. If row has a theme, registers an 'image'
                         token referencing /image-library-webp/themes/<t>/.
   • no ?activity     → falls back to a static 5-task demo set (the
                         pre-CC pipeline behavior, kept for direct
                         /mini-tools/ten-frame-activity.html access).

   Color-only image filter (per §A defense-in-depth):
     The image-themes manifest only contains color themes (axis-key does
     NOT end in _bw, and no locale's displayName ends in its BW marker).
     The tool never references B&W themes regardless of activity input.
   ===================================================================== */
var ACTIVITY_STRINGS = {
  taskMake:     {en:'Make {n}',de:'Mache {n}',fr:'Fais {n}',it:'Fai {n}',es:'Haz {n}',pt:'Faça {n}',nl:'Maak {n}',sv:'Gör {n}',da:'Lav {n}',no:'Lag {n}',fi:'Tee {n}'},
  taskHowMany:  {en:'How many?',de:'Wie viele?',fr:'Combien ?',it:'Quanti?',es:'¿Cuántos?',pt:'Quantos?',nl:'Hoeveel?',sv:'Hur många?',da:'Hvor mange?',no:'Hvor mange?',fi:'Kuinka monta?'},
  hintAddMore:  {en:'Add more',de:'Mehr hinzufügen',fr:'Ajoute encore',it:'Aggiungi ancora',es:'Añade más',pt:'Adicione mais',nl:'Voeg meer toe',sv:'Lägg till fler',da:'Tilføj flere',no:'Legg til flere',fi:'Lisää enemmän'},
  hintTakeAway: {en:'Take some away',de:'Weniger nehmen',fr:'Enlève quelques-uns',it:'Togli qualcuno',es:'Quita algunos',pt:'Tire alguns',nl:'Haal er een paar weg',sv:'Ta bort några',da:'Fjern nogle',no:'Ta bort noen',fi:'Poista joitakin'}
};

/* Fallback static task set when no ?activity= is given. Kept identical to
   the pre-manifest demo so direct loads of ten-frame-activity.html still
   show the original 5-task showcase. */
var STATIC_DEMO_TASKS = [
  { id:'make-3', promptKey:'taskMake', promptArgs:{n:3}, answerType:'state',
    setup:   function (t) { t.readOnly = false; t.setCount(0); },
    check:   function (t) { return t.count === 3; },
    hintKey: function (t) { return t.count < 3 ? 'hintAddMore' : 'hintTakeAway'; } },
  { id:'make-7', promptKey:'taskMake', promptArgs:{n:7}, answerType:'state',
    setup:   function (t) { t.readOnly = false; t.setCount(0); },
    check:   function (t) { return t.count === 7; },
    hintKey: function (t) { return t.count < 7 ? 'hintAddMore' : 'hintTakeAway'; } },
  { id:'make-10', promptKey:'taskMake', promptArgs:{n:10}, answerType:'state',
    setup:   function (t) { t.readOnly = false; t.setCount(0); },
    check:   function (t) { return t.count === 10; },
    hintKey: function (t) { return t.count < 10 ? 'hintAddMore' : 'hintTakeAway'; } },
  { id:'count-4', promptKey:'taskHowMany', answerType:'number', answerMin:0, answerMax:10,
    setup: function (t) { t.setCount(4); t.readOnly = true; },
    check: function (t, ans) { return parseInt(ans, 10) === t.count; } },
  { id:'count-8', promptKey:'taskHowMany', answerType:'number', answerMin:0, answerMax:10,
    setup: function (t) { t.setCount(8); t.readOnly = true; },
    check: function (t, ans) { return parseInt(ans, 10) === t.count; } }
];

var TenFrameActivity = Object.assign({}, TenFrameCore, {
  id: 'ten-frame-activity',
  strings: Object.assign({}, TenFrameCore.strings, ACTIVITY_STRINGS, {
    title:       {en:'Ten Frame Activity',de:'Zehnerfeld-Aufgaben',fr:'Cadre de dix — activités',it:'Tabella del dieci — attività',es:'Marco de diez — actividades',pt:'Quadro de dez — atividades',nl:'Tienraam-oefeningen',sv:'Tioram-uppgifter',da:'Tierramme-opgaver',no:'Tierramme-oppgaver',fi:'Kymmenruudukko-tehtävät'},
    instruction: {en:'Follow the prompt. Tap Check when you’re ready.',de:'Folge der Aufforderung. Tippe Prüfen, wenn du fertig bist.',fr:'Suis la consigne. Tape Vérifier quand tu es prêt.',it:'Segui l’istruzione. Tocca Verifica quando sei pronto.',es:'Sigue la indicación. Toca Comprobar cuando estés listo.',pt:'Siga a instrução. Toque em Verificar quando estiver pronto.',nl:'Volg de opdracht. Tik op Controleer als je klaar bent.',sv:'Följ uppmaningen. Tryck på Kontrollera när du är klar.',da:'Følg opgaven. Tryk på Tjek, når du er klar.',no:'Følg oppgaven. Trykk på Sjekk når du er klar.',fi:'Seuraa ohjetta. Paina Tarkista, kun olet valmis.'}
  }),

  /* tasks resolved lazily: by ?activity=<id> if present, else fallback */
  tasks: STATIC_DEMO_TASKS,

  init: function (api) {
    TenFrameCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      /* the manifest fetch is async — STATIC_DEMO_TASKS is the placeholder
         until the real tasks load; then we trigger LCS_reloadFirstTask(). */
      this._loadActivity();
    }
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/ten-frame-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      if (row.theme) {
        return fetch('/mini-tools/ten-frame-image-themes.json').then(function (r2) {
          return r2.json();
        }).then(function (themes) {
          self._setupImageTheme(row.theme, themes);
          return row;
        });
      }
      return row;
    }).then(function (row) {
      if (!row) return;
      self.tasks = self._buildTasksFromRow(row);
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[ten-frame-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _setupImageTheme: function (themeKey, themeManifest) {
    var pool = themeManifest && themeManifest.themes && themeManifest.themes[themeKey];
    if (!pool || !pool.color_verified || !pool.keys || !pool.keys.length) return;
    this._imagePool = pool;
    var srcPattern = pool.src_pattern;   // e.g., '/image-library-webp/themes/animals/{key}@2x.webp'
    /* Register an 'image' token shape on the shell. Per CLAUDE.md §14.3a
       this is the canonical asset-swap point. */
    LCS.registerToken('image', function (key, color, size) {
      var src = srcPattern.replace('{key}', key);
      return '<img src="' + src + '" width="' + size + '" height="' + size +
             '" alt="' + key + '" loading="lazy" style="object-fit:contain;">';
    });
    /* Override paint() to use image tokens cycling through the pool. The
       shape setting is ignored when an image theme is active. */
    var origPaint = TenFrameCore.paint;
    var self = this;
    this.paint = function () {
      var s = this.api.settings;
      var emptyWord = this.api.t('empty'), filledWord = this.api.t('filled');
      for (var k = 0; k < this.cells.length; k++) {
        var cell = this.cells[k], ord = +cell.dataset.ord, filled = ord <= this.count;
        if (filled) {
          if (!cell.classList.contains('filled')) {
            cell.classList.add('filled');
            var key = self._imagePool.keys[k % self._imagePool.keys.length];
            cell.innerHTML = this.api.token('image', key, 56);
          }
        } else if (cell.classList.contains('filled')) {
          cell.classList.remove('filled');
          cell.innerHTML = '';
        }
        cell.setAttribute('aria-label', ord + ', ' + (filled ? filledWord : emptyWord));
      }
      if (this.readoutNum) this.readoutNum.textContent = String(this.count);
      this.api.announce(this.api.t('count') + ': ' + this.count);
    };
  },

  _buildTasksFromRow: function (row) {
    var self = this;
    var t = row.task_template;
    if (t === 'make-n') {
      return row.params.targets.map(function (n) {
        return {
          id: row.id + '.make-' + n,
          promptKey: row.kid_prompt_template,
          promptArgs: { n: n },
          answerType: 'state',
          setup: function (tool) {
            if (row.params.frames && tool.api.settings.frames !== row.params.frames) {
              tool.api.settings.frames = row.params.frames;
              tool.render();
            }
            tool.readOnly = false;
            tool.setCount(0);
          },
          check: function (tool) { return tool.count === n; },
          hintKey: function (tool) { return tool.count < n ? 'hintAddMore' : 'hintTakeAway'; }
        };
      });
    }
    if (t === 'how-many') {
      return row.params.targets.map(function (n) {
        return {
          id: row.id + '.count-' + n,
          promptKey: row.kid_prompt_template,
          answerType: 'number',
          answerMin: row.params.range.min,
          answerMax: row.params.range.max,
          setup: function (tool) {
            if (row.params.frames && tool.api.settings.frames !== row.params.frames) {
              tool.api.settings.frames = row.params.frames;
              tool.render();
            }
            tool.setCount(n);
            tool.readOnly = true;
          },
          check: function (tool, ans) { return parseInt(ans, 10) === tool.count; }
        };
      });
    }
    return STATIC_DEMO_TASKS;
  }
});

TenFrameCore.injectCSS();
