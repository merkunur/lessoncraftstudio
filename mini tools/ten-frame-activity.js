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
  hintTakeAway: {en:'Take some away',de:'Weniger nehmen',fr:'Enlève quelques-uns',it:'Togli qualcuno',es:'Quita algunos',pt:'Tire alguns',nl:'Haal er een paar weg',sv:'Ta bort några',da:'Fjern nogle',no:'Ta bort noen',fi:'Poista joitakin'},
  /* represent-operation template (K.OA.A.1) prompts. EN base-locale now; the
     10-locale fan-out adds entries per §A.13.48. {a}/{b} are language-neutral
     numerals. taskRepresentAdd → place a+b counters (first a one colour, next b
     another); taskRepresentSub → start with a, take b away. */
  taskRepresentAdd: {"en":"Show {a} + {b}","de":"Zeige {a} + {b}","es":"Muestra {a} + {b}","it":"Mostra {a} + {b}","pt":"Mostre {a} + {b}","fr":"Montre {a} + {b}","nl":"Laat {a} + {b} zien","sv":"Visa {a} + {b}","da":"Vis {a} + {b}","no":"Vis {a} + {b}","fi":"Näytä {a} + {b}"},
  taskRepresentSub: {"en":"Show {a} − {b} — take some away","de":"Zeige {a} − {b} — nimm etwas weg","es":"Muestra {a} − {b}: quita algunas","it":"Mostra {a} − {b} — togline alcune","pt":"Mostre {a} − {b} — tire alguns","fr":"Montre {a} − {b} — enlèves-en quelques-uns","nl":"Laat {a} − {b} zien — haal er een paar weg","sv":"Visa {a} − {b} — ta bort några","da":"Vis {a} − {b} — tag nogle væk","no":"Vis {a} − {b} — ta noen bort","fi":"Näytä {a} − {b} — ota osa pois"},
  /* word-problem template (K.OA.A.2) prompt — pure "{text}" passthrough; the native
     story sentence rides promptArgs.text (the E18 #6 pattern). Locale-independent. */
  taskStoryProblem: {en:'{text}',de:'{text}',es:'{text}',it:'{text}',pt:'{text}',fr:'{text}',nl:'{text}',sv:'{text}',da:'{text}',no:'{text}',fi:'{text}'},
  /* quick-fact template (K.OA.A.5) prompts — bare within-5 expression; pure math
     notation, locale-independent (all 11 identical, for api.t-fallback safety).
     − is U+2212. */
  taskQuickAdd: {en:'{a} + {b} = ?',de:'{a} + {b} = ?',es:'{a} + {b} = ?',it:'{a} + {b} = ?',pt:'{a} + {b} = ?',fr:'{a} + {b} = ?',nl:'{a} + {b} = ?',sv:'{a} + {b} = ?',da:'{a} + {b} = ?',no:'{a} + {b} = ?',fi:'{a} + {b} = ?'},
  taskQuickSub: {en:'{a} − {b} = ?',de:'{a} − {b} = ?',es:'{a} − {b} = ?',it:'{a} − {b} = ?',pt:'{a} − {b} = ?',fr:'{a} − {b} = ?',nl:'{a} − {b} = ?',sv:'{a} − {b} = ?',da:'{a} − {b} = ?',no:'{a} − {b} = ?',fi:'{a} − {b} = ?'}
};

/* Per-pass order-only reshuffle (§A.13.60) — ported from number-bond-activity.js.
   Used ONLY by the represent-operation template (which installs tool.nextTask +
   nulls tool.tasks); make-n/how-many keep the shell's per-mount tool.tasks[] path. */
function _sameOrderTF(a, b) {
  if (!b || a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return false; }
  return true;
}
function shuffledOrderTF(n, prev) {
  var idx = [], i, j, t;
  for (i = 0; i < n; i++) idx.push(i);
  if (n < 2) return idx;
  do {
    for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  } while (_sameOrderTF(idx, prev));
  return idx;
}

/* Fallback static task set when no ?activity= is given. Kept identical to
   the pre-manifest demo so direct loads of ten-frame-activity.html still
   show the original 5-task showcase. */
var STATIC_DEMO_TASKS = [
  { id:'make-3', promptKey:'taskMake', promptArgs:{n:3}, answerType:'state',
    setup:   function (t) { t.hideReadout = false; t.readOnly = false; t.setCount(0); },
    check:   function (t) { return t.count === 3; },
    hintKey: function (t) { return t.count < 3 ? 'hintAddMore' : 'hintTakeAway'; } },
  { id:'make-7', promptKey:'taskMake', promptArgs:{n:7}, answerType:'state',
    setup:   function (t) { t.hideReadout = false; t.readOnly = false; t.setCount(0); },
    check:   function (t) { return t.count === 7; },
    hintKey: function (t) { return t.count < 7 ? 'hintAddMore' : 'hintTakeAway'; } },
  { id:'make-10', promptKey:'taskMake', promptArgs:{n:10}, answerType:'state',
    setup:   function (t) { t.hideReadout = false; t.readOnly = false; t.setCount(0); },
    check:   function (t) { return t.count === 10; },
    hintKey: function (t) { return t.count < 10 ? 'hintAddMore' : 'hintTakeAway'; } },
  /* how-many demo tasks: hideReadout=true so the COUNT readout doesn't
     show the kid the answer they're being asked to determine */
  { id:'count-4', promptKey:'taskHowMany', answerType:'number', answerMin:0, answerMax:10,
    setup: function (t) { t.hideReadout = true; t.readOnly = true; t.setCount(4); },
    check: function (t, ans) { return parseInt(ans, 10) === t.count; } },
  { id:'count-8', promptKey:'taskHowMany', answerType:'number', answerMin:0, answerMax:10,
    setup: function (t) { t.hideReadout = true; t.readOnly = true; t.setCount(8); },
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
      if (row.task_template === 'represent-operation' || row.task_template === 'word-problem' || row.task_template === 'quick-fact') {
        /* §A.13.60 per-pass reshuffle: install nextTask + null tasks so the shell
           routes through tool.nextTask() (tasks takes priority in the shell, so it
           MUST be null). make-n/how-many fall through and keep the tasks[] path. */
        self._pool = self._buildTasksFromRow(row);
        self.tasks = null;
        self._order = null; self._curPass = 0; self._orderForPool = null;
        self.nextTask = function (opts) {
          var pool = (self._pool && self._pool.length) ? self._pool : STATIC_DEMO_TASKS;
          var n = pool.length;
          var i = (opts && opts.index) || 0;
          if (!self._order || self._orderForPool !== pool || self._order.length !== n) {
            self._order = shuffledOrderTF(n, null);
            self._orderForPool = pool;
            self._curPass = 0;
          }
          var pass = (n > 0) ? Math.floor(i / n) : 0;
          if (pass > self._curPass) { self._order = shuffledOrderTF(n, self._order); self._curPass = pass; }
          return pool[self._order[i % n]];
        };
      } else {
        self.tasks = self._buildTasksFromRow(row);
      }
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
    /* Register an 'image' token shape on the shell. The shell calls
       registered token functions as fn(color, size) — so for an image
       token we use the "color" slot to carry the image-KEY (e.g. "cat")
       and "size" for the pixel dimension. Matching the contract here
       is what makes width/height numeric (not the literal "undefined"
       string that was rendering images at natural pixel size and
       overflowing every cell). */
    LCS.registerToken('image', function (key, size) {
      var px = (typeof size === 'number' && size > 0) ? size : 56;
      var src = srcPattern.replace('{key}', key);
      return '<img src="' + src + '" width="' + px + '" height="' + px +
             '" alt="' + key + '" loading="lazy" style="object-fit:contain;display:block;">';
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
            tool.hideReadout = false;                    // make-n: kid sees their progress
            tool.readOnly = false;
            if (row.params.frames) tool.api.settings.frames = row.params.frames;
            tool.render();                               // force re-render to honor hideReadout flip
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
            tool.hideReadout = true;                     // how-many: hide the answer
            tool.readOnly = true;
            if (row.params.frames) tool.api.settings.frames = row.params.frames;
            tool.render();                               // force re-render so readout disappears
            tool.setCount(n);
          },
          check: function (tool, ans) { return parseInt(ans, 10) === tool.count; }
        };
      });
    }
    if (t === 'represent-operation') {
      /* K.OA.A.1 — represent an addition/subtraction on the ten-frame.
         addition: fill to a+b (first a counters = primary colour, next b =
         splitColor → the two addends visible). subtraction: pre-fill a, the
         child REMOVES b (tap-to-remove) → count === a-b. answerType state. */
      return row.params.problems.map(function (p) {
        var a = p.a, b = p.b, op = p.op;
        var isAdd = (op === '+');
        var result = isAdd ? (a + b) : (a - b);
        return {
          id: row.id + '.' + (isAdd ? 'add' : 'sub') + '-' + a + '-' + b,
          promptKey: isAdd ? 'taskRepresentAdd' : 'taskRepresentSub',
          promptArgs: { a: a, b: b },
          answerType: 'state',
          setup: function (tool) {
            tool.hideReadout = false;                  // kid sees their count build/shrink
            tool.readOnly = false;
            tool.api.settings.frames = (row.params.frames || 1);
            if (isAdd) { tool.splitAt = a; tool.splitColor = '#1B9E8F'; }
            else { tool.splitAt = null; tool.splitColor = null; }
            tool.render();                             // re-render to honor frames + clear prior split
            tool.setCount(isAdd ? 0 : a);              // addition starts empty; subtraction pre-fills a
          },
          check: function (tool) { return tool.count === result; },
          hintKey: function (tool) { return tool.count < result ? 'hintAddMore' : 'hintTakeAway'; }
        };
      });
    }
    if (t === 'word-problem') {
      /* K.OA.A.2 — solve a within-10 word problem on the ten-frame. The story
         rides the prompt strip ("{text}" passthrough); the frame is the
         modeling tool (interactive, child places/clears counters to represent
         the situation); the answer is KEYPADED (the solve). per-locale rounds:
         numbers fixed across locales, native story text. */
      /* content locale = window.LCS.i18n.current (the E18 #6 pattern); self.language
         / api.lang is NOT the content locale (it's 'en'/default) — using it served
         English text for every locale. */
      var lang = (typeof window !== 'undefined' && window.LCS && window.LCS.i18n && window.LCS.i18n.current) || 'en';
      var byLoc = (row.params && row.params.byLocale) || {};
      var rounds = ((byLoc[lang] || byLoc.en || {}).rounds) || [];
      return rounds.map(function (r, i) {
        return {
          id: row.id + '.wp-' + i,
          promptKey: 'taskStoryProblem',
          promptArgs: { text: r.text },
          answerType: 'number',
          answerMin: 0,
          answerMax: 10,
          answer: r.answer,                           // metadata for the local-test harness
          setup: function (tool) {
            tool.hideReadout = false;                  // frame is a modeling aid; the keypad is the answer
            tool.readOnly = false;                     // interactive — child models the story
            tool.splitAt = null; tool.splitColor = null;
            tool.api.settings.frames = (row.params.frames || 1);
            tool.render();
            tool.setCount(0);                          // empty start — child models the whole story
          },
          check: function (tool, ans) { return parseInt(ans, 10) === r.answer; }
        };
      });
    }
    if (t === 'quick-fact') {
      /* K.OA.A.5 — fluently add/subtract within 5. Bare expression prompt + a fast
         CHOICE-tap (recall). The frame is an empty interactive within-5 scratch aid
         (not graded); the answer is the tapped chip. Choices are pre-varied in the
         manifest (the shell renders them in array order). */
      var problems = (row.params && Array.isArray(row.params.problems)) ? row.params.problems : [];
      return problems.map(function (p) {
        var isAdd = (p.op === '+');
        return {
          id: row.id + '.' + (isAdd ? 'add' : 'sub') + '-' + p.a + '-' + p.b,
          promptKey: isAdd ? 'taskQuickAdd' : 'taskQuickSub',
          promptArgs: { a: p.a, b: p.b },
          answerType: 'choice',
          choices: (p.choices || []).map(function (v) { return { value: v }; }),
          answer: p.answer,                          // metadata for the local-test harness
          setup: function (tool) {
            tool.hideReadout = false;
            tool.readOnly = false;                   // empty interactive within-5 scratch aid
            tool.splitAt = null; tool.splitColor = null;
            tool.api.settings.frames = (row.params.frames || 1);
            tool.render();
            tool.setCount(0);
          },
          check: function (tool, ans) { return ans === p.answer; }
        };
      });
    }
    return STATIC_DEMO_TASKS;
  }
});

TenFrameCore.injectCSS();
