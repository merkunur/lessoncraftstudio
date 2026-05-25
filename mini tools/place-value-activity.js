/* =====================================================================
   PLACE VALUE — ACTIVITY   (place-value-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of place-value. Reuses place-value-core.js for the
   DOM/paint/state. Task source depends on the URL:

   • ?activity=<id>   → fetches place-value-activities.json, finds the
                         row, instantiates tasks from row.task_template
                         + row.params.
   • no ?activity     → falls back to a static demo set (the
                         /mini-tools/place-value-activity.html direct-
                         load shows the same kind of board).

   First task_template: 'build-tens-and-ones' — for each target N in
   params.targets, build a "Build N" task with strict per-component check
   (tensCount + onesCount must each match the decomposition; 13 ones for
   13 fails — bundling is the pedagogical point of 1.NBT.B.2).

   On correct Check, the activity calls PlaceValueCore.speakDecomposition()
   so the kid hears "four tens and two ones make forty-two" — the blend
   side of the decompose->blend pedagogy that mirrors WordBuilderCore's
   segment->blend pattern.
   ===================================================================== */

/* Localized chrome strings for activity tasks. EN + DE + ES + IT + FR
   + PT + NL + SV shipped. PT is Brazilian Portuguese ('pt' canonical per
   CLAUDE.md §6; NEVER pt-BR). Additional locales fan out one at a time
   per the §A.13.48 plan-mode-per-locale + 3-agent native ensemble
   discipline. Warm K-3 register: "du" form for DE/SV; "tú" form for ES;
   "tu" form for IT/FR; "você" form for PT (BR-informal); "je" form for
   NL — mirrors choice-board / ten-frame precedent. */
var ACTIVITY_STRINGS = {
  taskBuild:      { en: 'Build {n}',                       de: 'Baue {n}',                                            es: 'Construye {n}',                                       it: 'Costruisci {n}',                                       fr: 'Construis {n}',                                       pt: 'Construa {n}',                                        nl: 'Bouw {n}',                                            sv: 'Bygg {n}' },
  hintBuildMore:  { en: 'Keep going — you need more',      de: 'Mach weiter — du brauchst mehr',                      es: 'Sigue — necesitas más',                               it: 'Continua — ti servono di più',                        fr: 'Continue — il en faut plus',                          pt: 'Continue — precisa de mais',                          nl: 'Ga door — je hebt er meer nodig',                     sv: 'Fortsätt — du behöver fler' },
  hintTooMany:    { en: 'Too many — take some away',       de: 'Zu viele — nimm einige weg',                          es: 'Demasiados — quita algunos',                          it: 'Troppi — togline qualcuno',                           fr: 'Trop — enlève-en',                                    pt: 'Demais — remova alguns',                              nl: 'Te veel — haal er een paar weg',                      sv: 'För många — ta bort några' },
  /* hintBundleTen is defensive (unreachable with maxOnes=9), but kept
     so a future grade-2 extension that lifts the cap can lean on it. */
  hintBundleTen:  { en: 'Ten ones make one ten — bundle them',
                    de: 'Zehn Einer ergeben einen Zehner — bündele sie',
                    es: 'Diez unidades forman una decena — agrúpalas',
                    it: 'Dieci unità fanno una decina — raggruppale',
                    fr: 'Dix unités font une dizaine — regroupe-les',
                    pt: 'Dez unidades formam uma dezena — agrupe-as',
                    nl: 'Tien eenheden maken één tiental — groepeer ze',
                    sv: 'Tio ental blir ett tiotal — gruppera dem' }
};

/* Fallback static task set when no ?activity= is given. Mirrors the
   pre-manifest demo so direct loads of place-value-activity.html show
   the canonical six-task set. */
var STATIC_DEMO_TASKS = makeBuildTasks([12, 19, 47, 50, 72, 89], 'demo');

function makeBuildTasks(targets, idPrefix) {
  return targets.map(function (n) {
    var tens = Math.floor(n / 10);
    var ones = n % 10;
    return {
      id: idPrefix + '.build-' + n,
      promptKey: 'taskBuild',
      promptArgs: { n: n },
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ target: n });
        /* force a re-render so the new task's tray DOM is fresh +
           empty (paint() alone wouldn't tear down the old block
           buttons attached to the prior task's tray refs). */
        tool.render();
      },
      check: function (tool) {
        var correct = (tool.tensCount === tens) && (tool.onesCount === ones);
        if (correct) {
          tool.readOnly = true;
          tool.paint();
          tool.speakDecomposition();   /* "N tens and M ones make T" */
        }
        return correct;
      },
      hintKey: function (tool) {
        var built = tool.builtValue();
        if (built === 0) return 'hintBuildMore';
        if (built > n)   return 'hintTooMany';
        if (built < n)   return 'hintBuildMore';
        /* Same total but wrong decomposition (e.g., 0 tens + 12 ones = 12).
           Cap=9 makes >=10 ones unreachable, but defensive: */
        return 'hintBundleTen';
      }
    };
  });
}

window.PlaceValueActivity = Object.assign({}, PlaceValueCore, {
  id: 'place-value-activity',
  strings: Object.assign({}, PlaceValueCore.strings, ACTIVITY_STRINGS, {
    title:       {
      en: 'Place Value Activity',
      de: 'Stellenwert-Aufgaben',
      es: 'Actividad de valor posicional',
      it: 'Attività di valore posizionale',
      fr: 'Activité de valeur de position',
      pt: 'Atividade de valor posicional',
      nl: 'Plaatswaarde-oefening',
      sv: 'Platsvärde-övning'
    },
    instruction: {
      en: 'Follow the prompt. Tap Check when you’re ready.',
      de: 'Folge der Aufforderung. Tippe auf Prüfen, wenn du fertig bist.',
      es: 'Sigue la indicación. Toca Comprobar cuando estés listo.',
      it: 'Segui l\'istruzione. Tocca Verifica quando sei pronto.',
      fr: 'Suis la consigne. Touche Vérifier quand tu es prêt.',
      pt: 'Siga a indicação. Toque em Verificar quando estiver pronto.',
      nl: 'Volg de aanwijzing. Tik op Controleer wanneer je klaar bent.',
      sv: 'Följ instruktionen. Tryck på Kontrollera när du är klar.'
    }
  }),

  /* tasks resolved lazily: by ?activity=<id> if present, else fallback. */
  tasks: STATIC_DEMO_TASKS,

  init: function (api) {
    PlaceValueCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      this._loadActivity();
    }
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/place-value-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      self.tasks = self._buildTasksFromRow(row);
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[place-value-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'build-tens-and-ones') {
      var targets = (row.params && Array.isArray(row.params.targets)) ? row.params.targets : [];
      return makeBuildTasks(targets, row.id);
    }
    return STATIC_DEMO_TASKS;
  }
});

PlaceValueCore.injectCSS();
