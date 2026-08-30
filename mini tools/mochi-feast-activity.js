/* =====================================================================
   MOCHI'S COUNTING FEAST — ACTIVITY   (mochi-feast-activity.js)
   ---------------------------------------------------------------------
   Task-driven wrapper over mochi-feast-core.js. Task source depends on
   the URL:

   • ?activity=<id>  → fetches mochi-feast-activities.json, finds the row,
                       instantiates tasks from row.params.rounds.
   • no ?activity    → falls back to a static demo set (the
                       /mini-tools/mochi-feast-activity.html direct load
                       shows the same kind of feeding board).

   task_template 'count-out' — for each round { target, treat, seed } build
   a "Feed Mochi N <treat>" task. answerType:'state' (the bowl IS the answer
   surface; the shell renders no keypad/choices and leaves Check enabled).
   check() reads MochiFeastCore.isCorrect() — bowl count must EXACTLY equal
   the target; on success the board locks (readOnly) so Mochi's satisfied
   pose + the celebration are stable.

   One coordinate lives on this wrapper: K.CC.B.5 (count out a given number
   of objects) + K.CC.B.4 (cardinality). Its params.rounds is the POOL.

   VARIETY + SHUFFLE (CLAUDE.md §A.13.60): the pool has ≥7 ORIGINAL distinct
   rounds (each a genuinely different little feast — a different food + a
   different count, not one bowl with a new number), and after a full pass
   the order RESHUFFLES (order-only — same validated rounds) so no two
   consecutive passes share a sequence. The reshuffle lives here via the
   shell's `nextTask` contract — ZERO change to lcs-shell.js.
   ===================================================================== */

/* The canonical pool: 8 GENUINELY DIFFERENT feasts (§A.13.60 — the variety
   is the food + the count, both changing). Each `noun` is a real image-
   library prop (theme = its folder). Counts mix small + large across the K
   range (2..10) so cardinality is exercised, not a monotone climb. */
var DEMO_ROUNDS = [
  { target: 3,  noun: 'strawberry', theme: 'fruits',             seed: 11 },
  { target: 5,  noun: 'cookie',     theme: 'desserts and sweets', seed: 23 },
  { target: 4,  noun: 'cherry',     theme: 'fruits',             seed: 31 },
  { target: 6,  noun: 'cupcake',    theme: 'desserts and sweets', seed: 41 },
  { target: 2,  noun: 'banana',     theme: 'fruits',             seed: 53 },
  { target: 7,  noun: 'apple',      theme: 'fruits',             seed: 61 },
  { target: 8,  noun: 'donut',      theme: 'desserts and sweets', seed: 67 },
  { target: 10, noun: 'muffin',     theme: 'desserts and sweets', seed: 71 }
];

/* noun → the localizable prompt key (one per food, like fractions'
   promptHalves/Fourths). */
function _promptKeyFor(noun) {
  return 'prompt' + noun.charAt(0).toUpperCase() + noun.slice(1);
}

function makeFeastTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: _promptKeyFor(r.noun),
      promptArgs: { n: r.target },
      answerType: 'state',
      setup: function (tool) { tool.setupTask(r); },
      check: function (tool) {
        var ok = tool.isCorrect();           // bowl count === target
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      },
      hintKey: function (tool) {
        var have = tool.fed.length, need = tool.target;
        if (have === 0)   return 'hintAddSome';
        if (have > need)  return 'hintTooMany';
        return 'hintMore';                   // under-count
      }
    };
  });
}

/* Fallback static task pool when no ?activity= is given. */
var STATIC_DEMO_TASKS = makeFeastTasks(DEMO_ROUNDS, 'demo');

/* Order-only Fisher–Yates over n indices. When `prev` is given (and n≥2),
   the result is GUARANTEED to differ from prev (the per-pass "never the
   same sequence twice" requirement). n<2 is a no-op. */
function _sameOrder(a, b) {
  if (!b || a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return false; }
  return true;
}
function shuffledOrder(n, prev) {
  var idx = [], i, j, t;
  for (i = 0; i < n; i++) idx.push(i);
  if (n < 2) return idx;
  do {
    for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  } while (_sameOrder(idx, prev));
  return idx;
}

window.MochiFeastActivity = Object.assign({}, MochiFeastCore, {
  id: 'mochi-feast-activity',

  /* Core strings (EN copied verbatim) + de added in the wrapper — 0 lines to
     mochi-feast-core.js. All chrome is api.t-resolved (content-locale aware);
     the German treat PLURAL rides each per-treat prompt (no separate noun map).
     Teller = the dish you tap; Schüssel = the bowl treats land in. */
  strings: {
    title:        { en: "Mochi's Counting Feast", de: 'Mochis Zählfest', fr: 'Le grand festin de Mochi', es: 'El banquete de Mochi', pt: 'O banquete do Mochi', it: 'Il banchetto dei numeri di Mochi', nl: "Mochi's telfeest" },
    instruction:  { en: "Tap the dish to feed Mochi the right number of treats, then tap Check.", de: 'Tippe auf den Teller, um Mochi die richtige Anzahl Leckereien zu geben, und tippe dann auf „Prüfen".', fr: 'Tape sur le plat pour donner à Mochi le bon nombre de gourmandises, puis tape sur « Vérifier ».', es: 'Toca el plato para darle a Mochi el número correcto de golosinas y luego toca Comprobar.', pt: 'Toque no prato para dar a quantidade certa de guloseimas ao Mochi. Depois, toque em Verificar.', it: 'Tocca il piatto per dare a Mochi il numero giusto di golosità, poi tocca Verifica.', nl: 'Tik op het bord om Mochi het juiste aantal lekkernijen te geven, tik dan op Controleer.' },
    promptStrawberry: { en: "Feed Mochi {n} strawberries!", de: 'Gib Mochi {n} Erdbeeren!', fr: 'Donne {n} fraises à Mochi !', es: '¡Dale a Mochi {n} fresas!', pt: 'Dê {n} morangos ao Mochi!', it: 'Dai {n} fragole a Mochi!', nl: 'Geef Mochi {n} aardbeien!' },
    promptCookie:     { en: "Feed Mochi {n} cookies!",      de: 'Gib Mochi {n} Kekse!', fr: 'Donne {n} cookies à Mochi !', es: '¡Dale a Mochi {n} galletas!', pt: 'Dê {n} biscoitos ao Mochi!', it: 'Dai {n} biscotti a Mochi!', nl: 'Geef Mochi {n} koekjes!' },
    promptCherry:     { en: "Feed Mochi {n} cherries!",     de: 'Gib Mochi {n} Kirschen!', fr: 'Donne {n} cerises à Mochi !', es: '¡Dale a Mochi {n} cerezas!', pt: 'Dê {n} cerejas ao Mochi!', it: 'Dai {n} ciliegie a Mochi!', nl: 'Geef Mochi {n} kersen!' },
    promptCupcake:    { en: "Feed Mochi {n} cupcakes!",     de: 'Gib Mochi {n} Cupcakes!', fr: 'Donne {n} cupcakes à Mochi !', es: '¡Dale a Mochi {n} cupcakes!', pt: 'Dê {n} cupcakes ao Mochi!', it: 'Dai {n} cupcake a Mochi!', nl: 'Geef Mochi {n} cupcakes!' },
    promptBanana:     { en: "Feed Mochi {n} bananas!",      de: 'Gib Mochi {n} Bananen!', fr: 'Donne {n} bananes à Mochi !', es: '¡Dale a Mochi {n} plátanos!', pt: 'Dê {n} bananas ao Mochi!', it: 'Dai {n} banane a Mochi!', nl: 'Geef Mochi {n} bananen!' },
    promptApple:      { en: "Feed Mochi {n} apples!",       de: 'Gib Mochi {n} Äpfel!', fr: 'Donne {n} pommes à Mochi !', es: '¡Dale a Mochi {n} manzanas!', pt: 'Dê {n} maçãs ao Mochi!', it: 'Dai {n} mele a Mochi!', nl: 'Geef Mochi {n} appels!' },
    promptDonut:      { en: "Feed Mochi {n} donuts!",       de: 'Gib Mochi {n} Donuts!', fr: 'Donne {n} donuts à Mochi !', es: '¡Dale a Mochi {n} donas!', pt: 'Dê {n} rosquinhas ao Mochi!', it: 'Dai {n} ciambelle a Mochi!', nl: 'Geef Mochi {n} donuts!' },
    promptMuffin:     { en: "Feed Mochi {n} muffins!",      de: 'Gib Mochi {n} Muffins!', fr: 'Donne {n} muffins à Mochi !', es: '¡Dale a Mochi {n} muffins!', pt: 'Dê {n} muffins ao Mochi!', it: 'Dai {n} muffin a Mochi!', nl: 'Geef Mochi {n} muffins!' },
    hintAddSome: { en: "Tap the dish to give Mochi a treat.", de: 'Tippe auf den Teller, um Mochi eine Leckerei zu geben.', fr: 'Tape sur le plat pour donner une gourmandise à Mochi.', es: 'Toca el plato para darle una golosina a Mochi.', pt: 'Toque no prato para dar uma guloseima ao Mochi.', it: 'Tocca il piatto per dare una golosità a Mochi.', nl: 'Tik op het bord om Mochi een lekkernij te geven.' },
    hintMore:    { en: "Mochi is still a little hungry — add a few more.", de: 'Mochi hat noch ein bisschen Hunger – leg noch ein paar dazu.', fr: 'Mochi a encore un petit peu faim… ajoute-en encore quelques-unes.', es: 'Mochi todavía tiene un poquito de hambre… agrégale unas cuantas más.', pt: 'O Mochi ainda está com um pouquinho de fome — coloque mais algumas.', it: 'Mochi ha ancora un poco di fame: aggiungine altre.', nl: 'Mochi heeft nog een beetje honger — leg er nog een paar bij.' },
    hintTooMany: { en: "Ooh, that's a lot! Tap a treat in the bowl to take one back.", de: 'Oh, das sind zu viele! Tippe auf eine Leckerei in der Schüssel, um eine zurückzunehmen.', fr: 'Oh là là, ça fait beaucoup ! Tape sur une gourmandise dans le bol pour en reprendre une.', es: '¡Uy, son muchas! Toca una golosina del tazón para quitar una.', pt: 'Opa, quanta coisa! Toque em uma guloseima na tigela para tirar uma.', it: 'Ops, quante! Tocca una golosità nella ciotola per riprenderla.', nl: 'Oeps, dat zijn er veel! Tik op een lekkernij in de kom om er eentje terug te nemen.' },
    trayLabel:  { en: "Tap to feed", de: 'Zum Füttern tippen', fr: 'Tape pour nourrir', es: 'Toca para dar', pt: 'Toque para alimentar', it: 'Tocca per servire', nl: 'Tik om te geven' },
    srAddTreat: { en: "Give Mochi a treat", de: 'Mochi eine Leckerei geben', fr: 'Donner une gourmandise à Mochi', es: 'Darle una golosina a Mochi', pt: 'Dar uma guloseima ao Mochi', it: 'Dai una golosità a Mochi', nl: 'Mochi een lekkernij geven' },
    srTakeBack: { en: "Take this treat back", de: 'Diese Leckerei zurücknehmen', fr: 'Reprendre cette gourmandise', es: 'Quitar esta golosina', pt: 'Tirar esta guloseima', it: 'Riprendi questa golosità', nl: 'Deze lekkernij terugnemen' }
  },

  /* NO `tasks` property → the shell calls our nextTask() for ordering, so
     we own the per-pass reshuffle (§A.13.60). Pool resolved lazily: by
     ?activity=<id> if present, else the static demo. */

  init: function (api) {
    MochiFeastCore.init.call(this, api);
    this._pool = STATIC_DEMO_TASKS;
    this._order = null; this._curPass = 0; this._orderForPool = null;
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) { this._loadActivity(); }
  },

  /* Shell ordering hook — same contract as fractions/array: build a
     shuffled order over the pool; rebuild on pool length/ref change
     (demo→manifest swap); RESHUFFLE (≠ previous) on a FORWARD pass
     boundary (transition-driven so getTask(0) at mount is idempotent).
     Order-only — every served round is a pre-validated feast spec. */
  nextTask: function (opts) {
    var pool = (this._pool && this._pool.length) ? this._pool : STATIC_DEMO_TASKS;
    var n = pool.length;
    var i = (opts && opts.index) || 0;
    if (!this._order || this._orderForPool !== pool || this._order.length !== n) {
      this._order = shuffledOrder(n, null);
      this._orderForPool = pool;
      this._curPass = 0;
    }
    var pass = (n > 0) ? Math.floor(i / n) : 0;
    if (pass > this._curPass) {
      this._order = shuffledOrder(n, this._order);
      this._curPass = pass;
    }
    return pool[this._order[i % n]];
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/mochi-feast-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      self._pool = self._buildTasksFromRow(row);
      self._order = null;   // force nextTask to rebuild the order for the new pool
      if (typeof window.LCS_reloadFirstTask === 'function') { window.LCS_reloadFirstTask(); }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[mochi-feast] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'count-out') {
      var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
      /* defensive: every target within the K count-out range (1..20); each
         round must name a library prop (noun + theme). */
      if (window.console && console.warn) {
        rounds.forEach(function (r, ri) {
          if (!(r.target >= 1 && r.target <= 20)) console.warn('[mochi-feast] round ' + ri + ' target ' + r.target + ' outside 1..20');
          if (!r.noun || !r.theme) console.warn('[mochi-feast] round ' + ri + ' missing noun/theme');
        });
      }
      return makeFeastTasks(rounds, row.id);
    }
    return STATIC_DEMO_TASKS;
  }
});

MochiFeastCore.injectCSS();
