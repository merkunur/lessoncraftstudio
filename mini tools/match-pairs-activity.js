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

  /* ---- equal-value template (1.OA.D.7) chrome. The kid works out each
     card (results are HIDDEN) and matches the addition to the subtraction
     with the SAME answer; each task has two pairs with two DIFFERENT answers.
     EN base-locale only this commission; the 10-locale fan-out adds entries
     per §A.13.48. The activity ships slug.en only, so it loads at lang='en'
     exclusively until fan-out — these EN-only keys are never read at any
     other lang (no key-leak). ---- */
  taskEqualValue:     { en: 'Match each addition to the subtraction with the same answer',
                        de: 'Finde zu jeder Plusaufgabe die Minusaufgabe mit demselben Ergebnis',
                        fr: 'Relie chaque addition à la soustraction qui a le même résultat',
                        da: 'Forbind hvert plusstykke med det minusstykke, der har samme resultat',
                        no: 'Koble hver plussoppgave til minusoppgaven som har samme resultat',
                        sv: 'Koppla ihop varje plusuppgift med minusuppgiften som har samma resultat',
                        fi: 'Yhdistä jokainen yhteenlasku vähennyslaskuun, jolla on sama tulos' },
  hintEqualValue:     { en: 'Work out each card, then match the ones with the same answer',
                        de: 'Rechne jede Karte aus und verbinde die mit demselben Ergebnis',
                        fr: 'Calcule chaque carte, puis relie celles qui ont le même résultat',
                        da: 'Regn hvert kort ud, og forbind dem, der har samme resultat',
                        no: 'Regn ut hvert kort, og koble dem som har samme resultat',
                        sv: 'Räkna ut varje kort och koppla ihop dem som har samma resultat',
                        fi: 'Laske kortit ja yhdistä ne, joilla on sama tulos' },
  hintTryEqualValue:  { en: 'Those answers aren\'t equal yet — tap a pair to break it and try again',
                        de: 'Die Ergebnisse passen noch nicht — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                        fr: 'Ces résultats ne sont pas encore égaux — touche une paire pour la défaire et réessaie',
                        da: 'Resultaterne er ikke ens endnu — tryk på et par for at løse det op og prøv igen',
                        no: 'Resultatene er ikke like ennå — trykk på et par for å løse det opp og prøv igjen',
                        sv: 'Resultaten är inte lika än — tryck på ett par för att lösa upp det och försök igen',
                        fi: 'Tulokset eivät ole vielä samat — paina paria avataksesi sen ja yritä uudelleen' },
  /* Truthful Check-correct celebration. Does NOT claim a number total — a
     task has TWO different answers, so "All pairs make 5!" would be false.
     The shell shows its visual "Great!"; this is the spoken line. EN-only. */
  speakMatchedAll:    { en: 'You matched every pair!',
                        de: 'Du hast alle Paare verbunden!',
                        fr: 'Tu as relié toutes les paires !',
                        da: 'Du har forbundet alle par!',
                        no: 'Du har koblet sammen alle par!',
                        sv: 'Du har kopplat ihop alla par!',
                        fi: 'Yhdistit kaikki parit!' }
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

/* task_template 'equal-value' (1.OA.D.7) — the kid works out each card
   (results are HIDDEN in `display`, e.g. "2 + 3" / "6 − 1") and matches the
   addition to the subtraction with the SAME answer. Each task has two pairs
   with two DIFFERENT answers, so each value maps to exactly one addition +
   one subtraction → every match is unique and there is no false-correct
   configuration. Cards are {display, kind, value} objects; validity is
   `a.value === b.value`. No single target → no banner (core omits it for
   object cards) and the celebration is number-free ("You matched every
   pair!"). The numeric make-n (K.OA.A.3) path is unaffected. */
function makeEqualValueTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.task-' + i,
      promptKey: 'taskEqualValue',
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ cards: cards });   /* no single target */
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair has two
           cards of EQUAL value (the addition and the subtraction that share
           an answer). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && typeof a.value === 'number' && a.value === b.value;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          /* Mark mismatched pairs visually + speak the gentle nudge. This
             template sets wrongIdxSet directly (core markWrongPairs is
             sum-based and unused here). */
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board + speak a TRUTHFUL, number-free
           celebration (a task has two different answers, so "All pairs make
           {n}!" would be false). */
        tool.readOnly = true;
        tool.paint();
        if (window.LCSAudio && window.LCSAudio.speak) {
          var done = (tool.strings.speakMatchedAll && tool.strings.speakMatchedAll[tool.language])
                     || tool.strings.speakMatchedAll.en;
          window.LCSAudio.speak({ type: 'ui', text: done, lang: tool.language, rate: 0.95 });
        }
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintEqualValue';
        return 'hintTryEqualValue';
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
    if (row.task_template === 'equal-value') {
      var evTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeEqualValueTasks(evTasks, row.id);
    }
    return STATIC_DEMO_TASKS_MP;
  }
});

MatchPairsCore.injectCSS();
