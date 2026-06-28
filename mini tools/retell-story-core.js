/* =====================================================================
   CORE — Retell Story  (retell-story-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "reconstruct-and-retell a heard story with key
   details" cognition (the spec's `engine-retell-story.js`) — the head of a
   reusable narrative-reconstruction family. First skin: "Wake Up, Pip!" —
   CCSS RL.K.2 (retell a familiar story INCLUDING KEY DETAILS), co-primary
   SL.K.4 (told to a friend = the audience). Gated on the READ-BACK ("Tell
   it!"), never on a visible model (the watch-film is GONE at retell).

   Validity is DERIVED from the causal-dependency DAG (`requires`) + the
   per-beat `key{who,what}` map — NEVER a stored order/boolean. The friend
   reacts to the WHOLE retell with a DIFFUSE symptom: breakKind ∈ exactly 3
   coarse symbols (EFFECT_BEFORE_CAUSE / MISSING_PIECE / FACE_DOESNT_FIT) —
   the failing SLOT INDEX is computed-then-DISCARDED, never surfaced. That
   3-symbol channel is the anti-leak keystone: a child who doesn't
   comprehend cannot trial-and-error (feedback-hill-climb) to the answer
   (the build-gate proves the climber gains nothing from seeing breakKind).

   `childView` is the ONLY projection the skin may consume (per tile
   {panel,caption} + structure) — it NEVER carries order/key/requires.

   Pure functions, no DOM. Mirrors mend-page-core.js / compound-order-core.js.
   ===================================================================== */
(function (global) {
  'use strict';

  var BREAK_KINDS = {
    EFFECT_BEFORE_CAUSE: 'effect-before-cause', // "an effect happened before its cause"
    MISSING_PIECE: 'missing-piece',             // "a piece of the story is missing"
    FACE_DOESNT_FIT: 'face-doesnt-fit'          // "a face / part that doesn't belong"
  };

  /* ---- beat / panel lookups ---- */
  function beats(round) { return round.story.beats; }
  function beatById(round, id) { return beats(round).filter(function (b) { return b.id === id; })[0] || null; }
  function panelToBeat(round, panel) { var bs = beats(round); for (var i = 0; i < bs.length; i++) if (bs[i].panel === panel) return bs[i]; return null; }
  function isHinge(round, beat) { return beats(round).some(function (b) { return (b.requires || []).indexOf(beat.id) >= 0; }); }
  function isNarrativeKey(beat) { return !!beat.narrative_key; }

  function allDistractors(round) {
    var out = [];
    var tw = round.trivialWhats || {};
    Object.keys(tw).forEach(function (k) { (tw[k] || []).forEach(function (d) { out.push(d); }); });
    (round.foreignWhats || []).forEach(function (d) { out.push(d); });
    (round.foreignWhos || []).forEach(function (d) { out.push(d); });
    return out;
  }
  function distractorByPanel(round, panel) { var ds = allDistractors(round); for (var i = 0; i < ds.length; i++) if (ds[i].id === panel) return ds[i]; return null; }
  function isTrivialPanel(round, panel) { var d = distractorByPanel(round, panel); return !!(d && d.in_story === true); }
  function isForeignPanel(round, panel) { var d = distractorByPanel(round, panel); return !!(d && d.in_story === false); }
  function panelCaption(round, panel) { var b = panelToBeat(round, panel); if (b) return b.caption; var d = distractorByPanel(round, panel); return d ? d.caption : ''; }

  /* ---- the causal DAG ---- */
  function requiredBeatSet(round) { return beats(round).map(function (b) { return b.id; }).slice().sort(); }
  function canonicalOrder(round) {
    var bs = beats(round), used = {}, placed = [];
    while (placed.length < bs.length) {
      var next = null;
      for (var i = 0; i < bs.length; i++) { var b = bs[i]; if (used[b.id]) continue; if ((b.requires || []).every(function (r) { return used[r]; })) { next = b; break; } }
      if (!next) break; // cyclic data — should never happen (gate would catch)
      used[next.id] = true; placed.push(next);
    }
    return placed;
  }
  function solutionOrders(round) {
    var bs = beats(round), res = [];
    (function rec(seq, used) {
      if (seq.length === bs.length) { res.push(seq.map(function (b) { return b.panel; })); return; }
      for (var i = 0; i < bs.length; i++) { var b = bs[i]; if (used[b.id]) continue; if ((b.requires || []).every(function (r) { return used[r]; })) { used[b.id] = true; rec(seq.concat(b), used); used[b.id] = false; } }
    })([], {});
    return res;
  }
  function isTopoOrder(round, placedIds) {
    var seen = {};
    for (var i = 0; i < placedIds.length; i++) {
      var b = panelToBeat(round, placedIds[i]); if (!b) return false;
      var reqs = b.requires || []; for (var j = 0; j < reqs.length; j++) if (!seen[reqs[j]]) return false;
      seen[b.id] = true;
    }
    return true;
  }

  /* ---- the FACE_DOESNT_FIT check (identity/key-detail), ranging over keySlots ---- */
  function faceDoesntFit(round, placedIds) {
    var ks = round.keySlots || []; if (!ks.length) return false;
    var canon = canonicalOrder(round);
    for (var k = 0; k < ks.length; k++) {
      var i = ks[k], beat = panelToBeat(round, placedIds[i]);
      if (!beat) return true;                                   // a distractor (trivial/foreign) in a key slot
      if (!(isHinge(round, beat) || isNarrativeKey(beat))) return true;
      var expWho = canon[i] ? canon[i].key.who : null;          // the actor the slot's beat requires
      if (expWho != null && beat.key.who !== expWho) return true; // a face that doesn't fit
    }
    return false;
  }

  /* ---- THE adjudication (only on "Tell it!"); priority FDF -> MP -> EBC ---- */
  function validateRetell(round, placedIds) {
    if (faceDoesntFit(round, placedIds)) return { ok: false, breakKind: BREAK_KINDS.FACE_DOESNT_FIT };
    var got = placedIds.map(function (p) { var b = panelToBeat(round, p); return b ? b.id : null; }).filter(function (x) { return x != null; }).sort();
    var req = requiredBeatSet(round);
    if (got.length !== req.length || !got.every(function (v, i) { return v === req[i]; })) return { ok: false, breakKind: BREAK_KINDS.MISSING_PIECE };
    if (!isTopoOrder(round, placedIds)) return { ok: false, breakKind: BREAK_KINDS.EFFECT_BEFORE_CAUSE }; // first-violation index COMPUTED-THEN-DISCARDED
    return { ok: true };
  }

  /* ---- the canonical full placement (gate + with-prompting co-construction) ---- */
  function freeSlots(round) {
    if (round.type === 'supply-key') { var locked = {}; (round.locked || []).forEach(function (l) { locked[l.slot] = 1; }); var f = []; for (var i = 0; i < beats(round).length; i++) if (!locked[i]) f.push(i); return f; }
    return beats(round).map(function (_, i) { return i; });
  }
  function baseAssembly(round) {
    var n = beats(round).length, arr = []; for (var i = 0; i < n; i++) arr.push(null);
    if (round.type === 'supply-key') (round.locked || []).forEach(function (l) { arr[l.slot] = l.panel; });
    else if (round.type === 'fix-memory') (round.prefill || []).forEach(function (p, i) { arr[i] = p; });
    return arr;
  }
  function poolFor(round) {
    if (round.type === 'fix-memory') return (round.prefill || []).slice().concat(round.tray || []);
    return (round.tray || []).slice();
  }
  function canonicalPlacement(round) {
    var canon = canonicalOrder(round);
    if (round.type === 'supply-key') { var arr = baseAssembly(round); freeSlots(round).forEach(function (i) { arr[i] = canon[i].panel; }); return arr; }
    return canon.map(function (b) { return b.panel; });
  }
  // does the round's pool carry distractors (a "content" round) or only the beats (an "order" round)? — VISIBLE to the child.
  function poolHasDistractors(round) {
    var pool = poolFor(round);
    if (pool.length > beats(round).length) return true;
    return pool.some(function (p) { return panelToBeat(round, p) == null; });
  }

  /* ---- the RETELL-stage projection (the answer surface — NEVER order/key/requires) ---- */
  function childView(round) {
    return {
      id: round.id, type: round.type, slots: beats(round).length,
      tray: (round.tray || []).map(function (p) { return { panel: p, caption: panelCaption(round, p) }; }),
      locked: (round.locked || []).map(function (l) { return { slot: l.slot, panel: l.panel, caption: panelCaption(round, l.panel) }; }),
      prefill: (round.prefill || []).map(function (p) { return p ? { panel: p, caption: panelCaption(round, p) } : null; })
    };
  }
  /* ---- the WATCH film (stage 0 ONLY — narrated in causal order, then GONE before retell) ---- */
  function watchFilm(round) { return canonicalOrder(round).map(function (b) { return { panel: b.panel, caption: b.caption }; }); }

  /* ---- seeded rng (the gate drives the solvers deterministically) ---- */
  function mulberry32(seed) { var a = seed >>> 0; return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuffle(arr, rng) { arr = arr.slice(); for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }

  /* ---- assembly helpers for solvers (respect locked/prefill, fill free slots) ---- */
  function assembleWith(round, freeChoice) { // freeChoice: map slotIndex -> panel
    var arr = baseAssembly(round); freeSlots(round).forEach(function (i) { arr[i] = freeChoice[i]; }); return arr;
  }
  function randomAssembly(round, rng) {
    var fs = freeSlots(round), pool = shuffle(poolFor(round), rng), choice = {};
    for (var i = 0; i < fs.length; i++) choice[fs[i]] = pool[i % pool.length];
    return assembleWith(round, choice);
  }

  /* ---- SOLVERS (the gate's adversary bank; scored against validateRetell) ---- */
  function pickByPanelPosition(round) { // place tray in its given (scrambled) order
    var fs = freeSlots(round), pool = poolFor(round), choice = {}; for (var i = 0; i < fs.length; i++) choice[fs[i]] = pool[i % pool.length]; return assembleWith(round, choice);
  }
  function pickByCaptionLength(round) { // sort available panels by caption length
    var fs = freeSlots(round), pool = poolFor(round).slice().sort(function (a, b) { return panelCaption(round, a).length - panelCaption(round, b).length; }), choice = {}; for (var i = 0; i < fs.length; i++) choice[fs[i]] = pool[i % pool.length]; return assembleWith(round, choice);
  }
  function pickByRecency(round) { // last-seen-first (reverse tray)
    var fs = freeSlots(round), pool = poolFor(round).slice().reverse(), choice = {}; for (var i = 0; i < fs.length; i++) choice[fs[i]] = pool[i % pool.length]; return assembleWith(round, choice);
  }
  function dagBlindBaseline(round, rng) { return randomAssembly(round, rng); }
  function oracleSolver(round) { return canonicalPlacement(round); }

  /* ---- the FEEDBACK-HILL-CLIMBER (the keystone anti-leak bot) ----
     Both arms are STRUCTURE-AWARE (they read the VISIBLE round mode: a tray
     with distractors => 'content', else 'order') and pick the same move-set
     from that. The seen-arm ADDITIONALLY conditions on breakKind. Because
     breakKind only names the CATEGORY (already visible from structure) and
     NEVER the slot, the seen-arm gains no targeting advantage — proven by the
     gate comparing solve-rate + calls-to-solve of the two arms. If validity
     ever leaked a position, the seen-arm could target it and pull ahead. */
  function climberMove(round, arr, rng, moveType) {
    var fs = freeSlots(round); arr = arr.slice();
    if (moveType === 'reorder' && fs.length >= 2) {
      var a = fs[Math.floor(rng() * fs.length)], b = fs[Math.floor(rng() * fs.length)];
      var t = arr[a]; arr[a] = arr[b]; arr[b] = t;
    } else { // swap a free slot with a random pool panel (brings tray tiles in / pushes distractors out)
      var slot = fs[Math.floor(rng() * fs.length)], pool = poolFor(round);
      arr[slot] = pool[Math.floor(rng() * pool.length)];
    }
    return arr;
  }
  function feedbackClimber(round, rng, opts) {
    var K = opts.K || 30, content = poolHasDistractors(round);
    var arr = randomAssembly(round, rng);
    for (var t = 0; t < K; t++) {
      var res = validateRetell(round, arr);
      if (res.ok) return { placed: arr, calls: t + 1, solved: true };
      var moveType;
      if (opts.seeBreakKind) { // the MOST a 3-symbol signal allows: map category -> move-type (== the visible mode)
        moveType = (res.breakKind === BREAK_KINDS.EFFECT_BEFORE_CAUSE) ? 'reorder' : 'swap';
      } else { // structure-aware baseline: the same category, read from the VISIBLE pool
        moveType = content ? 'swap' : 'reorder';
      }
      arr = climberMove(round, arr, rng, moveType);
    }
    return { placed: arr, calls: K, solved: false };
  }

  global.RetellStoryCore = {
    BREAK_KINDS: BREAK_KINDS,
    validateRetell: validateRetell,
    panelToBeat: panelToBeat, isHinge: isHinge, isNarrativeKey: isNarrativeKey,
    isTrivialPanel: isTrivialPanel, isForeignPanel: isForeignPanel,
    requiredBeatSet: requiredBeatSet, canonicalOrder: canonicalOrder, isTopoOrder: isTopoOrder,
    solutionOrders: solutionOrders, canonicalPlacement: canonicalPlacement,
    faceDoesntFit: faceDoesntFit, panelCaption: panelCaption,
    freeSlots: freeSlots, poolFor: poolFor, poolHasDistractors: poolHasDistractors,
    childView: childView, watchFilm: watchFilm,
    mulberry32: mulberry32,
    SOLVERS: {
      pickByPanelPosition: pickByPanelPosition, pickByCaptionLength: pickByCaptionLength,
      pickByRecency: pickByRecency, dagBlindBaseline: dagBlindBaseline,
      feedbackClimber: feedbackClimber, oracleSolver: oracleSolver
    }
  };

}(typeof window !== 'undefined' ? window : this));
