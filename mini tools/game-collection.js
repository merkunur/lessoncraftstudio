/* =====================================================================
   LessonCraft Studio — CROSS-GAME COLLECTION  (game-collection.js)
   ---------------------------------------------------------------------
   The persistent meta-reward the whole premium games program rests on:
   a keepsake the child earns by completing a game once, collected ACROSS
   games + ACROSS sessions into one little world/album. This is the anti-
   "re-skin fatigue" hook from the catalog vision.

   Persistence = per-device localStorage ONLY (operator-locked decision):
   no server, no account, no PII; it fills across sessions on the device
   and clears with browser data. This honors the no-tracking lock (there
   is NO server-side progress/analytics here).

   A game declares a `reward` keepsake:
     reward: { id:'mochi-figurine', label:{en:'Mochi figurine',...}, emoji:'🐻' }
   The shell grants it on completing a full pass; granting is idempotent
   (keyed by reward id) so replay never duplicates.
   ===================================================================== */
(function (global) {
  'use strict';

  var KEY = 'lcs.games.collection.v1';
  var mem = null;                 /* in-memory fallback if storage unavailable */

  function load() {
    if (mem) return mem;
    try {
      var raw = global.localStorage && global.localStorage.getItem(KEY);
      mem = raw ? JSON.parse(raw) : { earned: {} };
    } catch (e) { mem = { earned: {} }; }
    if (!mem.earned) mem.earned = {};
    return mem;
  }
  function save() {
    try { if (global.localStorage) global.localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {}
  }

  var i18n = (global.LCS && global.LCS.i18n) || { current: 'en' };
  function label(reward) {
    var l = reward && reward.label;
    if (!l) return reward && reward.id || '';
    if (typeof l === 'string') return l;
    return l[i18n.current] || l.en || reward.id;
  }

  function grant(reward) {
    if (!reward || !reward.id) return false;
    var db = load();
    if (db.earned[reward.id]) return false;          /* idempotent */
    db.earned[reward.id] = {
      id: reward.id,
      label: label(reward),
      emoji: reward.emoji || '★',
      ts: Date.now()
    };
    save();
    return true;
  }
  function has(id) { return !!load().earned[id]; }
  function all() {
    var e = load().earned;
    return Object.keys(e).map(function (k) { return e[k]; }).sort(function (a, b) { return a.ts - b.ts; });
  }
  function count() { return Object.keys(load().earned).length; }
  function reset() { mem = { earned: {} }; save(); }

  function forGame(/* game */) {
    return { grant: grant, has: has, all: all, count: count };
  }

  /* render the collection into a container (used by collection.html). */
  function render(container) {
    if (!container) return;
    var items = all();
    container.innerHTML = '';
    if (!items.length) {
      var empty = document.createElement('p');
      empty.className = 'lcs-collection-empty';
      empty.textContent = 'Your collection is empty — play a game to earn your first keepsake!';
      container.appendChild(empty);
      return;
    }
    var grid = document.createElement('div');
    grid.className = 'lcs-collection-grid';
    items.forEach(function (it) {
      var card = document.createElement('div');
      card.className = 'lcs-collection-card';
      var em = document.createElement('div');
      em.className = 'lcs-collection-emoji';
      em.textContent = it.emoji;
      var nm = document.createElement('div');
      nm.className = 'lcs-collection-name';
      nm.textContent = it.label;
      card.append(em, nm);
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  global.GameCollection = {
    forGame: forGame, grant: grant, has: has, all: all, count: count, reset: reset, render: render
  };

}(typeof window !== 'undefined' ? window : this));
