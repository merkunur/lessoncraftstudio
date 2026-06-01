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
   + PT + NL + SV + DA + NO + FI shipped — FULL 11-locale E12 rollout
   complete. PT is Brazilian Portuguese ('pt' canonical per CLAUDE.md §6;
   NEVER pt-BR). NO is Norwegian Bokmål (matches E9 syllable-builder
   locking). FI is Finnish (Uralic; partitive case after numbers).
   Warm K-3 register: "du" form for DE/SV/DA/NO; "tú" form for ES;
   "tu" form for IT/FR; "você" form for PT (BR-informal); "je" form
   for NL; "sinä"-implicit (Finnish drops 2sg pronoun in imperative)
   for FI — all mirror choice-board / ten-frame precedent. */
var ACTIVITY_STRINGS = {
  taskBuild:      { en: 'Build {n}',                       de: 'Baue {n}',                                            es: 'Construye {n}',                                       it: 'Costruisci {n}',                                       fr: 'Construis {n}',                                       pt: 'Construa {n}',                                        nl: 'Bouw {n}',                                            sv: 'Bygg {n}',                                            da: 'Byg {n}',                                             no: 'Bygg {n}',                                            fi: 'Rakenna {n}' },
  hintBuildMore:  { en: 'Keep going — you need more',      de: 'Mach weiter — du brauchst mehr',                      es: 'Sigue — necesitas más',                               it: 'Continua — ti servono di più',                        fr: 'Continue — il en faut plus',                          pt: 'Continue — precisa de mais',                          nl: 'Ga door — je hebt er meer nodig',                     sv: 'Fortsätt — du behöver fler',                          da: 'Fortsæt — du skal bruge flere',                       no: 'Fortsett — du trenger flere',                         fi: 'Jatka — tarvitset lisää' },
  hintTooMany:    { en: 'Too many — take some away',       de: 'Zu viele — nimm einige weg',                          es: 'Demasiados — quita algunos',                          it: 'Troppi — togline qualcuno',                           fr: 'Trop — enlève-en',                                    pt: 'Demais — remova alguns',                              nl: 'Te veel — haal er een paar weg',                      sv: 'För många — ta bort några',                           da: 'For mange — fjern nogle',                             no: 'For mange — fjern noen',                              fi: 'Liikaa — poista joitakin' },
  /* hintBundleTen is defensive (unreachable with maxOnes=9), but kept
     so a future grade-2 extension that lifts the cap can lean on it. */
  hintBundleTen:  { en: 'Ten ones make one ten — bundle them',
                    de: 'Zehn Einer ergeben einen Zehner — bündele sie',
                    es: 'Diez unidades forman una decena — agrúpalas',
                    it: 'Dieci unità fanno una decina — raggruppale',
                    fr: 'Dix unités font une dizaine — regroupe-les',
                    pt: 'Dez unidades formam uma dezena — agrupe-as',
                    nl: 'Tien eenheden maken één tiental — groepeer ze',
                    sv: 'Tio ental blir ett tiotal — gruppera dem',
                    da: 'Ti enere bliver til en tier — grupper dem',
                    no: 'Ti enere blir én tier — grupper dem',
                    fi: 'Kymmenen ykköstä on yksi kymmen — niputa ne' },
  /* 3-place activity (2.NBT.A.1) defensive hint — EN-only; unreachable
     with maxTens=9 but kept for future extensions that lift the cap. */
  hintBundleHundred: { en: 'Ten tens make one hundred — bundle them' },
  /* E12 Activity 3 (2.NBT.A.3 expanded form) — prompt EN only; fan-out adds
     the other 10 locales. Hints reuse the build-generic hintBuildMore /
     hintTooMany / hintBundle* above (identical "keep going" / "too many"
     semantics — nothing expanded-form-specific in the hint path). */
  taskExpanded:      { en: 'Show the expanded form of {n} — build it with the blocks' }
};

/* Fallback static task set when no ?activity= is given. Mirrors the
   pre-manifest demo so direct loads of place-value-activity.html show
   the canonical six-task set. */
var STATIC_DEMO_TASKS = makeBuildTasks([12, 19, 47, 50, 72, 89], 'demo');

function makeBuildTasks(targets, idPrefix, opts) {
  opts = opts || {};
  var places = Array.isArray(opts.places) ? opts.places.slice() : null;
  var is3p = places && places.indexOf('hundreds') >= 0;
  return targets.map(function (n) {
    var hundreds = is3p ? Math.floor(n / 100) : 0;
    var tens = is3p ? Math.floor((n % 100) / 10) : Math.floor(n / 10);
    var ones = n % 10;
    return {
      id: idPrefix + '.build-' + n,
      promptKey: 'taskBuild',
      promptArgs: { n: n },
      answerType: 'state',
      setup: function (tool) {
        /* 2-place call (no opts.places) preserves byte-identical
           setupTask({target: n}) invocation. 3-place call adds places. */
        tool.setupTask(places ? { target: n, places: places } : { target: n });
        /* force a re-render so the new task's tray DOM is fresh +
           empty (paint() alone wouldn't tear down the old block
           buttons attached to the prior task's tray refs). */
        tool.render();
      },
      check: function (tool) {
        var correct = (tool.tensCount === tens) && (tool.onesCount === ones);
        if (is3p) correct = correct && (tool.hundredsCount === hundreds);
        if (correct) {
          tool.readOnly = true;
          tool.paint();
          tool.speakDecomposition();   /* 2-place: "N tens and M ones make T";
                                          3-place: "H hundreds, T tens, and O ones make N" */
        }
        return correct;
      },
      hintKey: function (tool) {
        var built = tool.builtValue();
        if (built === 0) return 'hintBuildMore';
        if (built > n)   return 'hintTooMany';
        if (built < n)   return 'hintBuildMore';
        /* Same total but wrong decomposition. Cap=9 per place makes the
           bundle-up case unreachable, but defensive: in 3-place mode
           bubble up tens→hundreds; in 2-place mode bubble up ones→tens. */
        if (is3p && tool.tensCount >= 10) return 'hintBundleHundred';
        return 'hintBundleTen';
      }
    };
  });
}

/* E12 Activity 3 (2.NBT.A.3) — EXPANDED FORM. Build the 3-digit number on the
   columns (reuses the engine build, exactly like A2), then on correct Check the
   activity SHOWS the expanded-form equation (200 + 40 + 7 = 247) and SPEAKS the
   place-VALUE summands. Distinct from A2 (which speaks place-UNIT decomposition
   "2 hundreds, 4 tens, 7 ones") and from E4 A3 (card matching). FULLY ADDITIVE:
   place-value-core.js is NOT touched; speakExpandedForm reuses tool._numberWord
   read-only; reachable only via the build-expanded-form dispatch branch, so it
   cannot perturb A1/A2 (which use makeBuildTasks). */
function makeExpandedFormTasks(targets, idPrefix) {
  return targets.map(function (n) {
    var hundreds = Math.floor(n / 100);
    var tens = Math.floor((n % 100) / 10);
    var ones = n % 10;
    return {
      id: idPrefix + '.expanded-' + n,
      promptKey: 'taskExpanded',
      promptArgs: { n: n },
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ target: n, places: ['hundreds', 'tens', 'ones'] });
        tool.render();
      },
      check: function (tool) {
        var correct = (tool.hundredsCount === hundreds) && (tool.tensCount === tens) && (tool.onesCount === ones);
        if (correct) {
          tool.readOnly = true;
          tool.paint();
          showExpandedCaption(tool, n);   /* SHOW the expanded-form equation */
          speakExpandedForm(tool);        /* SPEAK the place-value summands */
        }
        return correct;
      },
      hintKey: function (tool) {
        var built = tool.builtValue();
        if (built === 0) return 'hintBuildMore';
        if (built > n)   return 'hintTooMany';
        if (built < n)   return 'hintBuildMore';
        if (tool.tensCount >= 10) return 'hintBundleHundred';
        return 'hintBundleTen';
      }
    };
  });
}

/* Inject the expanded-form equation caption additively below the mat. Reuses the
   existing .pv-readout Direction-A styling (NO new CSS / no injectCSS edit); the
   extra .pv-expanded-caption marker class carries no rules (de-dup + verify hook).
   Zero places are omitted from the + chain per standard expanded-form notation
   (the spoken "zero tens" carries the teaching point). Cleared on the next task's
   render() (stage.innerHTML=''). */
function showExpandedCaption(tool, n) {
  var stage = tool.api && tool.api.stage;
  if (!stage) return;
  var wrap = stage.querySelector('.pv-wrap') || stage;
  var prior = wrap.querySelector('.pv-expanded-caption');
  if (prior) prior.parentNode.removeChild(prior);
  var parts = [];
  if (tool.hundredsCount > 0) parts.push(String(tool.hundredsCount * 100));
  if (tool.tensCount > 0)     parts.push(String(tool.tensCount * 10));
  if (tool.onesCount > 0)     parts.push(String(tool.onesCount));
  var cap = document.createElement('div');
  cap.className = 'pv-readout pv-expanded-caption';
  cap.textContent = parts.join(' + ') + ' = ' + n;
  wrap.appendChild(cap);
}

/* Speak the expanded form as place-VALUE summands, each a standalone type:"number"
   unit (record-smaller-and-separate), then a "makes N" blend. Interior/trailing
   zero places are NAMED ("zero tens" / "zero ones") — the 0-place teaching point.
   EN only now; the fan-out adds per-locale branches (the summand assembly + "makes"
   connective bind Nordic/agglutinative grammar). Reuses tool._numberWord (read-only)
   — NO core edit, NO match-pairs import. */
function speakExpandedForm(tool) {
  if (!window.LCSAudio || !window.LCSAudio.speak) return;
  var lang = tool.language || 'en';
  var places = [
    { v: tool.hundredsCount * 100, noun: 'hundreds' },
    { v: tool.tensCount * 10,      noun: 'tens' },
    { v: tool.onesCount,           noun: 'ones' }
  ];
  places.forEach(function (p) {
    if (p.v > 0) {
      window.LCSAudio.speak({ type: 'number', text: tool._numberWord(p.v, lang), lang: lang, rate: 0.9 });
    } else if (p.noun !== 'hundreds') {
      /* name the zero place — the 2.NBT.A.3 / engine "0 tens" teaching point (EN) */
      window.LCSAudio.speak({ type: 'ui', text: 'zero ' + p.noun, lang: lang, rate: 0.9 });
    }
  });
  window.LCSAudio.speak({ type: 'ui', text: 'makes ' + tool._numberWord(tool.builtValue(), lang), lang: lang, rate: 0.9 });
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
      sv: 'Platsvärde-övning',
      da: 'Pladsværdi-øvelse',
      no: 'Plassverdi-øvelse',
      fi: 'Paikka-arvotehtävä'
    },
    instruction: {
      en: 'Follow the prompt. Tap Check when you’re ready.',
      de: 'Folge der Aufforderung. Tippe auf Prüfen, wenn du fertig bist.',
      es: 'Sigue la indicación. Toca Comprobar cuando estés listo.',
      it: 'Segui l\'istruzione. Tocca Verifica quando sei pronto.',
      fr: 'Suis la consigne. Touche Vérifier quand tu es prêt.',
      pt: 'Siga a indicação. Toque em Verificar quando estiver pronto.',
      nl: 'Volg de aanwijzing. Tik op Controleer wanneer je klaar bent.',
      sv: 'Följ instruktionen. Tryck på Kontrollera när du är klar.',
      da: 'Følg anvisningen. Tryk på Tjek, når du er klar.',
      no: 'Følg instruksjonen. Trykk på Sjekk når du er klar.',
      fi: 'Seuraa ohjetta. Napauta Tarkista, kun olet valmis.'
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
    if (row.task_template === 'build-hundreds-tens-and-ones') {
      var targets3 = (row.params && Array.isArray(row.params.targets)) ? row.params.targets : [];
      return makeBuildTasks(targets3, row.id, { places: ['hundreds', 'tens', 'ones'] });
    }
    if (row.task_template === 'build-expanded-form') {
      var targetsE = (row.params && Array.isArray(row.params.targets)) ? row.params.targets : [];
      return makeExpandedFormTasks(targetsE, row.id);
    }
    return STATIC_DEMO_TASKS;
  }
});

PlaceValueCore.injectCSS();
