/* =====================================================================
   SYLLABLE BUILDER — ACTIVITY   (syllable-builder-activity.js)
   ---------------------------------------------------------------------
   E8 facade. Reuses word-builder-core.js for the DOM/paint/state. Task
   source depends on the URL:

   • ?activity=<id>   -> fetches syllable-builder-activities.json, finds
                         the row, instantiates tasks from row.params.words.
   • no ?activity     -> falls back to a static demo task (gato) so a
                         direct load of /mini-tools/syllable-builder-
                         activity.html shows a working board.

   v1 proof: ONE row, ES only — "Forma las sílabas" (RF.K.2.B). Per-locale
   fan-out (it/pt/fr/fi) ships in separate commissions after the río
   accent-hiatus fix in the rule-syllabifier + vocab-phonics.json.
   ===================================================================== */

var SYLLABLE_ACTIVITY_STRINGS = {
  /* RF.K.2.B — Forma las sílabas. Kid sees picture + hears word, then
     arranges scrambled syllable tiles into ordered slots. Spanish-first;
     other locales currently fall back to ES because the proof is
     ES-only by design. */
  promptBuildSyllables: {
    en: 'Tap the syllables in order to build the word for this picture.',
    de: 'Tippe die Silben in der richtigen Reihenfolge an, um das Wort zum Bild zu bauen.',
    fr: 'Touche les syllabes dans l\'ordre pour former le mot de cette image.',
    it: 'Tocca le sillabe in ordine per formare la parola di questa immagine.',
    es: 'Toca las sílabas en orden para formar la palabra de esta imagen.',
    pt: 'Toque nas sílabas em ordem para formar a palavra.',
    nl: 'Tik op de klankgroepen in de juiste volgorde om het woord bij dit plaatje te bouwen.',
    sv: 'Tryck på stavelserna i rätt ordning för att bygga ordet till den här bilden.',
    da: 'Tryk på stavelserne i den rigtige rækkefølge for at danne ordet til dette billede.',
    no: 'Trykk på stavelsene i riktig rekkefølge for å lage ordet til dette bildet.',
    fi: 'Napauta tavut järjestyksessä muodostaaksesi sanan.'
  },
  hintFillAllSyllableSlots: {
    en: 'Place a syllable in each slot, then check.',
    de: 'Lege eine Silbe in jeden Platz und tippe dann auf Überprüfen.',
    fr: 'Place une syllabe dans chaque espace, puis touche Vérifier.',
    it: 'Posiziona una sillaba in ogni casella, poi tocca Verifica.',
    es: 'Pon una sílaba en cada espacio y luego revisa.',
    pt: 'Coloque uma sílaba em cada espaço e toque em Verificar.',
    nl: 'Leg een klankgroep in elk vakje en tik dan op Controleren.',
    sv: 'Lägg en stavelse i varje ruta och tryck sedan på Kontrollera.',
    da: 'Læg en stavelse i hver kasse, og tryk så på Tjek.',
    no: 'Legg en stavelse i hver rute, og trykk så på Sjekk.',
    fi: 'Aseta tavu jokaiseen ruutuun ja paina Tarkista.'
  },
  hintSyllableOrderOff: {
    en: 'Almost — listen again and try another order.',
    de: 'Fast! Hör nochmal hin und probier eine andere Reihenfolge.',
    fr: 'Presque ! Écoute encore et essaie un autre ordre.',
    it: 'Quasi! Ascolta ancora e prova un altro ordine.',
    es: 'Casi. Escucha otra vez y prueba otro orden.',
    pt: 'Quase! Ouça de novo e tente outra ordem.',
    nl: 'Bijna! Luister nog eens en probeer een andere volgorde.',
    sv: 'Nästan! Lyssna igen och försök med en annan ordning.',
    da: 'Næsten! Hør efter igen og prøv en anden rækkefølge.',
    no: 'Nesten! Hør en gang til og prøv en annen rekkefølge.',
    fi: 'Melkein! Kuuntele uudelleen ja kokeile toista järjestystä.'
  }
};

/* Static demo task — fires when /mini-tools/syllable-builder-activity.html
   is loaded directly without ?activity=. Single gato task in ES. */
var STATIC_DEMO_SYLLABLE_TASKS = [
  {
    id: 'demo-gato',
    promptKey: 'promptBuildSyllables',
    answerType: 'state',
    setup: function (tool) {
      var target = ['ga', 'to'];
      tool.setupTask({
        slots: target.length,
        palette: _shuffleSyllables(target, 'gato'),
        targetWord: 'gato',
        targetTiles: target,
        subject: {
          type: 'image',
          imgUrl: '/image-library-webp/themes/animals/cat@2x.webp',
          alt: 'gato',
          hearItWord: 'gato',
          hearItLang: 'es-ES'
        },
        language: 'es-ES'
      });
    },
    check: function (tool) {
      var correct = _tilesEqual(tool.tileAnswers, ['ga','to']);
      tool.showFeedback(correct);
      return correct;
    },
    hintKey: function (tool) {
      return tool.answer == null ? 'hintFillAllSyllableSlots' : 'hintSyllableOrderOff';
    }
  }
];

/* Deterministic shuffle keyed on targetWord — same seed pattern as
   cvc-builder-activity._shuffle so the proof board is reproducible
   across re-renders and across locales (when fan-out lands). */
function _seedFromWord(word) {
  var s = 0;
  for (var i = 0; i < word.length; i++) s = (s * 31 + word.charCodeAt(i)) | 0;
  return s;
}
function _shuffleSyllables(tiles, seedWord) {
  var picks = tiles.slice();
  var s = _seedFromWord(seedWord);
  function rand() {
    s = (s + 0x6D2B79F5) | 0;
    var t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  /* If the deterministic shuffle accidentally lands on the identity
     order for short arrays (rare but possible at length 2), rotate once
     so the kid never opens a task already arranged correctly. */
  for (var j = picks.length - 1; j > 0; j--) {
    var k = Math.floor(rand() * (j + 1));
    var tmp = picks[j]; picks[j] = picks[k]; picks[k] = tmp;
  }
  var identity = true;
  for (var m = 0; m < picks.length; m++) {
    if (picks[m] !== tiles[m]) { identity = false; break; }
  }
  if (identity && picks.length >= 2) {
    var head = picks.shift();
    picks.push(head);
  }
  return picks;
}

/* Order-equality check for tile arrays. Order matters — syllable
   ordering IS the answer. */
function _tilesEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

window.SyllableBuilderActivity = Object.assign({}, WordBuilderCore, {
  id: 'syllable-builder-activity',
  strings: Object.assign({}, WordBuilderCore.strings, SYLLABLE_ACTIVITY_STRINGS, {
    title: {en:'Syllable Builder',de:'Silbenbauer',fr:'Constructeur de syllabes',it:'Costruttore di sillabe',es:'Constructor de sílabas',pt:'Construtor de sílabas',nl:'Klankgroepenbouwer',sv:'Stavelsebyggaren',da:'Stavelsesbyggeren',no:'Stavelsesbyggeren',fi:'Sanan rakentaja'},
    instruction: {en:'Look at the picture. Tap each syllable in order. Tap Check when you are ready.',de:'Schau dir das Bild an. Tippe die Silben in der richtigen Reihenfolge an. Tippe auf Überprüfen, wenn du fertig bist.',fr:'Regarde l\'image. Touche les syllabes dans l\'ordre. Touche Vérifier quand tu as fini.',it:'Guarda l\'immagine. Tocca ogni sillaba in ordine. Tocca Verifica quando sei pronto.',es:'Mira la imagen. Toca cada sílaba en orden. Toca Comprobar cuando estés listo.',pt:'Olhe a imagem. Toque nas sílabas em ordem. Toque em Verificar quando estiver pronto.',nl:'Kijk naar het plaatje. Tik op elke klankgroep in de juiste volgorde. Tik op Controleren als je klaar bent.',sv:'Titta på bilden. Tryck på varje stavelse i rätt ordning. Tryck på Kontrollera när du är klar.',da:'Se på billedet. Tryk på hver stavelse i den rigtige rækkefølge. Tryk på Tjek, når du er klar.',no:'Se på bildet. Trykk på hver stavelse i riktig rekkefølge. Trykk på Sjekk når du er klar.',fi:'Katso kuvaa. Napauta tavut järjestyksessä. Paina Tarkista, kun olet valmis.'}
  }),

  tasks: STATIC_DEMO_SYLLABLE_TASKS,

  init: function (api) {
    WordBuilderCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) this._loadActivity();
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/syllable-builder-activities.json').then(function (r) {
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
      if (window.console && console.warn) console.warn('[syllable-builder-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    /* TEMPLATE: build-syllables-word — show picture, kid arranges scrambled
       syllable tiles into the target order.
       params.words = [{ noun, themeDir, targetWord, syllables, label }, ...]. */
    if (row.task_template === 'build-syllables-word') {
      var words = row.params.words || [];
      var taskLang = row.params.language || 'es-ES';
      return words.map(function (entry) {
        var imgUrl = '/image-library-webp/themes/' + entry.themeDir + '/' + entry.noun + '@2x.webp';
        var targetTiles = entry.syllables.slice();
        var palette = _shuffleSyllables(targetTiles, entry.targetWord);
        return {
          id: row.id + '.' + entry.targetWord,
          promptKey: 'promptBuildSyllables',
          promptArgs: { word: entry.label || entry.targetWord },
          answerType: 'state',
          setup: function (tool) {
            tool.setupTask({
              slots: targetTiles.length,
              palette: palette,
              targetWord: entry.targetWord,
              targetTiles: targetTiles,
              subject: {
                type: 'image',
                imgUrl: imgUrl,
                alt: entry.label || entry.targetWord,
                hearItWord: entry.targetWord,
                hearItLang: entry.hearItLang || taskLang
              },
              language: entry.hearItLang || taskLang
            });
          },
          check: function (tool) {
            var correct = _tilesEqual(tool.tileAnswers, targetTiles);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintFillAllSyllableSlots' : 'hintSyllableOrderOff';
          }
        };
      });
    }

    return STATIC_DEMO_SYLLABLE_TASKS;
  }
});

WordBuilderCore.injectCSS();
