/* =====================================================================
   REASON SUPPORT — CORE  (reason-support-core.js)
   ---------------------------------------------------------------------
   CCSS RI.2.8 — describe how REASONS support specific points an author
   makes. First skin: "Pearl's Opinion Page." Pure cognition, NO DOM. The
   child reads a POINT (the author's claim), then taps the card that gives a
   REASON that backs it up.

   THE ANSWER IS THE CARD TAGGED `reason`, NEVER A STORED INDEX. The foils are
   a `restate` (a circular paraphrase that echoes the point's own words but
   adds no reason) and an `offtopic` true fact. The restatement has the HIGHEST
   word-overlap with the point, so a "pick the card most like the claim"
   shortcut grabs the restatement and is WRONG — a real reason adds NEW
   justification ("because…"). `childView` exposes the point + option TEXTS
   only (never `kind`). 0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function options(round) { return round.options || []; }
  function optionById(round, id) { var o = options(round); for (var i = 0; i < o.length; i++) if (o[i].id === id) return o[i]; return null; }
  function reasonOption(round) { var o = options(round); for (var i = 0; i < o.length; i++) if (o[i].kind === 'reason') return o[i]; return null; }

  function grade(round, pickedId) { var o = optionById(round, pickedId); return !!(o && o.kind === 'reason'); }
  function oracle(round) { var r = reasonOption(round); return r ? r.id : null; }
  function pointText(round) { return round.point || ''; }

  function words(s) { return String(s || '').toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(Boolean); }
  function overlap(round, opt) {
    var pw = {}; words(pointText(round)).forEach(function (w) { pw[w] = 1; });
    var n = 0; words(opt.text).forEach(function (w) { if (pw[w]) n++; }); return n;
  }

  function childView(round) {
    return { id: round.id, point: pointText(round), options: options(round).map(function (o) { return { id: o.id, text: o.text }; }) };
  }

  function facts(round) {
    var o = options(round);
    return {
      threeOptions: o.length === 3,
      oneReason: o.filter(function (x) { return x.kind === 'reason'; }).length === 1,
      oneRestate: o.filter(function (x) { return x.kind === 'restate'; }).length === 1,
      oneOfftopic: o.filter(function (x) { return x.kind === 'offtopic'; }).length === 1,
      derivedNotStored: !('answer' in round) && !('correctIndex' in round)
    };
  }

  function audit(round) {
    return {
      id: round.id, point: pointText(round),
      options: options(round).map(function (o) { return { id: o.id, text: o.text, kind: o.kind, overlap: overlap(round, o), len: o.text.length }; }),
      reasonId: (reasonOption(round) || {}).id
    };
  }

  global.ReasonSupportCore = {
    options: options, optionById: optionById, reasonOption: reasonOption,
    grade: grade, oracle: oracle, pointText: pointText, overlap: overlap,
    childView: childView, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
