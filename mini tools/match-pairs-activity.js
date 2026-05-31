/* =====================================================================
   MATCH PAIRS — ACTIVITY   (match-pairs-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of match-pairs. Reuses match-pairs-core.js for
   the DOM/paint/state.

   Task source:
   • ?activity=<id>   → fetches match-pairs-activities.json, finds row,
                         instantiates tasks from row.task_template +
                         row.params.tasks.
   • no ?activity     → falls back to a static demo set.

   First task_template: 'make-n' — for each {target, cards} task in
   row.params.tasks, builds a "Make N" task whose check function asserts
   every pair in tool.pairsFormed sums to target.

   On correct Check, the activity calls MatchPairsCore.speakAllPairs()
   so the kid hears "All pairs make 5!" — the celebration of having
   found multiple decompositions, which is the K.OA.A.3 teaching point.
   ===================================================================== */

/* Localized chrome strings. EN base-locale only this commission; future
   locale fan-outs add entries under each key per the §A.13.48 plan-mode-
   per-locale discipline. */
var ACTIVITY_STRINGS_MP = {
  taskMakeN:       { en: 'Make {n}',                                                de: 'Bilde {n}',                                                                                            es: 'Forma {n}',                                                                                            it: 'Forma {n}',                                                                                                            fr: 'Compose {n}',                                                                                                                                                       pt: 'Forme {n}',                                                                                                                                                                                                                            nl: 'Maak {n}',                                                                                                                       sv: 'Gör {n}',                                                                                                              da: 'Lav {n}',                                                                                                              no: 'Lag {n}',                                                                                                              fi: 'Tee {n}' },
  hintFormPairs:   { en: 'Tap a number, then tap its partner',                      de: 'Tippe auf eine Zahl, dann auf ihren Partner',                                                          es: 'Toca un número, luego toca su pareja',                                                                 it: 'Tocca un numero, poi tocca il suo compagno',                                                                           fr: 'Touche un nombre, puis touche son partenaire',                                                                                                                      pt: 'Toque em um número, depois toque no par dele',                                                                                                                                                                                         nl: 'Tik op een getal, dan op zijn partner',                                                                                          sv: 'Tryck på ett tal, sedan på dess kompis',                                                                               da: 'Tryk på et tal, derefter på dets makker',                                                                              no: 'Trykk på et tall, deretter på makkeren',                                                                               fi: 'Paina numeroa, sitten paina sen paria' },
  hintTryDifferent:{ en: 'Some pairs don\'t add up — tap a pair to break it and try again',
                     de: 'Manche Paare ergeben nicht das Ziel — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                     es: 'Algunas parejas no forman el objetivo — toca una pareja para deshacerla e inténtalo de nuevo',
                     it: 'Alcune coppie non vanno — tocca una coppia per scioglierla e riprova',
                     fr: 'Certaines paires ne font pas l\'objectif — touche une paire pour la défaire et réessaie',
                     pt: 'Alguns pares não fazem o objetivo — toque em um par para desfazê-lo e tente novamente',
                     nl: 'Sommige paren maken het doel niet — tik op een paar om het te ontkoppelen en probeer opnieuw',
                     sv: 'Vissa par når inte målet — tryck på ett par för att lösa upp det och försök igen',
                     da: 'Nogle par når ikke målet — tryk på et par for at løse det op og prøv igen',
                     no: 'Noen par når ikke målet — trykk på et par for å løse det opp og prøv igjen',
                     fi: 'Jotkin parit eivät yllä tavoitteeseen — paina paria avataksesi sen ja yritä uudelleen' },

  /* ---- unknown-addend template (1.OA.B.4) chrome. EN base-locale only
     this commission; the 10-locale fan-out adds entries per §A.13.48. The
     unknown-addend activity ships slug.en only, so it loads at lang='en'
     exclusively until fan-out — these EN-only keys are never read at any
     other lang (no key-leak). ---- */
  taskUnknownAddend:  { en: 'Match each subtraction with the addition that completes it' },
  hintPairSubAdd:     { en: 'Tap a subtraction, then tap the addition that completes it' },
  hintTryDifferentUA: { en: 'Some pairs don\'t match yet — tap a pair to break it and try again' }
};

/* Fallback static task set when no ?activity= is given. Same shape as
   the manifest's params.tasks array. */
var STATIC_DEMO_TASKS_MP = makeMatchTasks([
  { target: 3, cards: [0, 3, 1, 2] },
  { target: 5, cards: [0, 5, 1, 4, 2, 3] }
], 'demo');

function makeMatchTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var target = t.target;
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.make-' + target + '-' + i,
      promptKey: 'taskMakeN',
      promptArgs: { n: target },
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ target: target, cards: cards });
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every pair sums to target. */
        if (!tool.allPaired()) return false;
        for (var i = 0; i < tool.pairsFormed.length; i++) {
          var p = tool.pairsFormed[i];
          var sum = tool.cards[p[0]] + tool.cards[p[1]];
          if (sum !== target) {
            /* Mark wrong pairs visually + speak nudge. */
            tool.markWrongPairs();
            tool.speakTryAgain();
            return false;
          }
        }
        /* Correct! Lock the board + speak celebration. */
        tool.readOnly = true;
        tool.paint();
        tool.speakAllPairs();
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintFormPairs';
        return 'hintTryDifferent';
      }
    };
  });
}

/* task_template 'unknown-addend' (1.OA.B.4) — pair each subtraction card
   with the addition that completes it as an unknown-addend problem
   (to do W−b, find what adds to b to make W). Each task is anchored on a
   single whole W (stored in t.target, the same field setupTask + the core
   speakAllPairs() already read — so "All pairs make {W}!" is spoken with
   the value-verified cardSpoken word table, no core rename, no new audio
   string). Cards are {display, kind, pairKey} objects; validity is an
   authored pairKey shared by exactly one subtraction + its one completing
   addition. The manifest guarantees no two subtrahends in a task sum to W,
   so each subtraction has exactly ONE valid completing addition on the
   board (no commutative ambiguity). The numeric make-n path is unaffected. */
function makeUnknownAddendTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var whole = t.target;            /* the whole W; drives speakAllPairs */
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.whole-' + whole + '-' + i,
      promptKey: 'taskUnknownAddend',
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ target: whole, cards: cards });
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair is a
           valid subtraction↔completing-addition pair (shared pairKey). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && a.pairKey != null && a.pairKey === b.pairKey;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          /* Mark mismatched pairs visually + speak the gentle nudge. The
             new template sets wrongIdxSet directly (core markWrongPairs is
             sum-based and unused here). */
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board + speak "All pairs make {W}!". */
        tool.readOnly = true;
        tool.paint();
        tool.speakAllPairs();
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintPairSubAdd';
        return 'hintTryDifferentUA';
      }
    };
  });
}

window.MatchPairsActivity = Object.assign({}, MatchPairsCore, {
  id: 'match-pairs-activity',
  strings: Object.assign({}, MatchPairsCore.strings, ACTIVITY_STRINGS_MP, {
    title: {
      en: 'Make the Number',
      de: 'Bilde die Zahl',
      es: 'Forma el número',
      it: 'Forma il numero',
      fr: 'Compose le nombre',
      pt: 'Forme o número',
      nl: 'Maak het getal',
      sv: 'Gör talet',
      da: 'Lav tallet',
      no: 'Lag tallet',
      fi: 'Tee luku'
    },
    instruction: {
      en: 'Find pairs of numbers that add up to the target. Tap Check when you\'re ready.',
      de: 'Finde Zahlenpaare, die zusammen das Ziel ergeben. Tippe auf Prüfen, wenn du fertig bist.',
      es: 'Encuentra parejas de números que sumen el objetivo. Toca Comprobar cuando estés listo.',
      it: 'Trova coppie di numeri che fanno l\'obiettivo. Tocca Verifica quando sei pronto.',
      fr: 'Trouve des paires de nombres qui font l\'objectif. Touche Vérifier quand tu es prêt.',
      pt: 'Encontre pares de números que formam o objetivo. Toque em Verificar quando estiver pronto.',
      nl: 'Zoek getallenparen die samen het doel maken. Tik op Controleer als je klaar bent.',
      sv: 'Hitta talpar som tillsammans blir målet. Tryck på Kontrollera när du är klar.',
      da: 'Find talpar, der tilsammen bliver målet. Tryk på Tjek, når du er klar.',
      no: 'Finn tallpar som til sammen blir målet. Trykk på Sjekk når du er klar.',
      fi: 'Etsi lukupareja, jotka yhdessä tekevät tavoitteen. Paina Tarkista kun olet valmis.'
    }
  }),

  /* tasks resolved lazily: by ?activity=<id> if present, else fallback. */
  tasks: STATIC_DEMO_TASKS_MP,

  init: function (api) {
    MatchPairsCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      this._loadActivity();
    }
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/match-pairs-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      /* Sync the in-iframe shell title to this row's page_title. The shell
         rendered the generic facade title at mount (before this async fetch
         resolved); with two+ activities on one facade the specific title
         must come from the loaded row. Guarded to write ONLY when the text
         differs, so K.OA.A.3 (whose facade title == page_title in every
         locale) gets ZERO DOM mutation and stays byte-identical. */
      var titleEl = document.querySelector('.lcs-title');
      var wantTitle = row.page_title && row.page_title[self.language];
      if (titleEl && wantTitle && titleEl.textContent !== wantTitle) {
        titleEl.textContent = wantTitle;
      }
      self.tasks = self._buildTasksFromRow(row);
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[match-pairs-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'make-n') {
      var tasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeMatchTasks(tasks, row.id);
    }
    if (row.task_template === 'unknown-addend') {
      var uaTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeUnknownAddendTasks(uaTasks, row.id);
    }
    return STATIC_DEMO_TASKS_MP;
  }
});

MatchPairsCore.injectCSS();
