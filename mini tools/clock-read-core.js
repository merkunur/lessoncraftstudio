/* =====================================================================
   OWL'S CUCKOO COTTAGE — READ (and set) the clock — CORE  (clock-read-core.js)
   ---------------------------------------------------------------------
   CCSS 1.MD.B.3 — tell + write time in HOURS and HALF-HOURS, analog +
   digital. BOTH directions of "tell time": READ the analog face → name
   Owl's moment (the receptive cell the free E10 SET-only clock omits) AND
   SET the coupled hands from a named time (the on-ramp). Pure cognition,
   NO DOM — the activity owns the SVG + pointer events and calls this math.

   This MODELS the proven E10 clock-core math (the coupled 30H+0.5M angle,
   atan2 pointer→angle, minute-aware hour snap, discrete grade) but is a
   NEW clean draw-trace sibling — it RE-IMPLEMENTS, never imports, and 0
   lines touch the protected clock-core.js (or any protected core / lcs-
   shell.{js,css}).

   THE GATE-CAN'T-CHEAT PROOF (verify-clock-read-core.js):
     - a READ-AND-SET ORACLE heals 100%;
     - a COPY-READOUT solver fails (no digital target exposed);
     - a WRONG-COUPLING solver fails (hour-on-number at half-past rejected);
     - a TOLD-TARGET solver PASSES the SET rounds (honest — they name a
       target) but FAILS the READ/order rounds (no named target → the child
       must read the FACE) — this catches the decorative-sequence cheat;
     - a COTTAGE-ONLY solver can't converge (the cottage is FROZEN during
       the solve — no proximity cheat).
   ===================================================================== */
(function (global) {
  'use strict';

  var COGS = ['read-oclock', 'read-half', 'set-oclock', 'set-half', 'order', 'world-cue', 'five-min'];
  /* modes with NO named target — the child reads the face / decodes a cue.
     'world-cue' is a DRAG-set but the target comes from a decoded sky cue,
     NOT worded, so a told-target solver must fail it (like read/order). */
  var READ_MODES = { read: 1, order: 1, 'world-cue': 1 };

  /* EN worded times (the half-hour idiom; models E10's timeExpr). The SET
     prompt names one of these; the READ prompt never does. */
  var TIME_EXPR = {
    '1:0': 'one o’clock', '2:0': 'two o’clock', '3:0': 'three o’clock', '4:0': 'four o’clock',
    '5:0': 'five o’clock', '6:0': 'six o’clock', '7:0': 'seven o’clock', '8:0': 'eight o’clock',
    '9:0': 'nine o’clock', '10:0': 'ten o’clock', '11:0': 'eleven o’clock', '12:0': 'twelve o’clock',
    '1:30': 'half past one', '2:30': 'half past two', '3:30': 'half past three', '6:30': 'half past six',
    '7:30': 'half past seven', '8:30': 'half past eight', '12:30': 'half past twelve',
    '3:15': 'quarter past three', '7:45': 'quarter to eight', '9:20': 'twenty past nine'
  };

  function key(h, m) { return h + ':' + m; }
  function wordFor(h, m) { return TIME_EXPR[key(h, m)] || (m === 0 ? (h + ' o’clock') : ('half past ' + h)); }

  /* ---- the coupled hand angles (clockwise from 12), modeling E10 ---- */
  function handAngles(hour, minute) {
    return {
      hour: ((30 * hour + 0.5 * minute) % 360 + 360) % 360,
      minute: ((6 * minute) % 360 + 360) % 360
    };
  }
  function targetAngles(round) { return handAngles(round.targetTime.hour, round.targetTime.minute); }

  /* pointer → angle (deg, clockwise from 12); rect = the svg getBoundingClientRect */
  function angleFromPointer(cx, cy, rect) {
    var dx = cx - (rect.left + rect.width / 2);
    var dy = cy - (rect.top + rect.height / 2);
    return (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360;
  }
  function circDist(a, b) { var d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }
  /* snap a dragged angle to the nearest HOUR (1..12), accounting for the
     current minute offset (so the half-past hour position is unambiguous). */
  function snapHour(angle, curMinute) {
    var best = 1, bestD = 999;
    for (var h = 1; h <= 12; h++) {
      var t = ((30 * h + 0.5 * curMinute) % 360 + 360) % 360;
      var d = circDist(angle, t);
      if (d < bestD) { bestD = d; best = h; }
    }
    return best;
  }
  function snapMinute(angle, step) {
    step = step || 30;
    var raw = ((angle % 360 + 360) % 360) / 6;
    return (Math.round(raw / step) * step) % 60;
  }

  /* ---- correctness (discrete, exact — no angle fuzz) ---- */
  function sameTime(a, b) { return a.hour === b.hour && a.minute === b.minute; }
  function isCorrectSet(round, setHour, setMinute) {
    return setHour === round.targetTime.hour && setMinute === round.targetTime.minute;
  }
  function correctEventId(round) {
    var e = (round.events || []).find(function (x) { return x.hour === round.targetTime.hour && x.minute === round.targetTime.minute; });
    return e ? e.id : null;
  }
  function isCorrectRead(round, eventId) { return eventId != null && eventId === correctEventId(round); }
  function correctClockIndex(round) {
    var ask = round.askEvent;
    for (var i = 0; i < (round.clocks || []).length; i++) { if (sameTime(round.clocks[i], ask)) return i; }
    return -1;
  }
  function isCorrectOrder(round, clockIndex) { return clockIndex === correctClockIndex(round); }

  /* the worded SET prompt time (named target) — only for set/world-cue modes */
  function setWord(round) { return wordFor(round.targetTime.hour, round.targetTime.minute); }

  /* snapshot() — the renderer's view; NO answer leak. For read: the events
     (id/label only, shuffled by the activity) with NO correct flag; the
     dialState is the pre-set face for read, the child's hands for set. */
  function snapshot(round, setHour, setMinute) {
    var snap = {
      cog: round.cog, mode: round.mode,
      dialState: (round.mode === 'set' || round.mode === 'world-cue')
        ? { hour: setHour, minute: setMinute }              /* child's current hands */
        : { hour: round.targetTime.hour, minute: round.targetTime.minute },  /* the pre-set face to READ */
      events: (round.events || []).map(function (e) { return { id: e.id, label: e.label, emoji: e.emoji }; }),
      clocks: (round.clocks || []).map(function (c) { return { hour: c.hour, minute: c.minute }; }),
      currentReadout: (round.mode === 'set' || round.mode === 'world-cue') ? (setHour + ':' + (setMinute < 10 ? '0' : '') + setMinute) : null
      /* deliberately NO target time except the SET prompt's WORDS; no correct-event flag; the cottage is frozen (not exposed) */
    };
    return snap;
  }

  function facts(round) {
    var isReadMode = !!READ_MODES[round.mode];
    /* order rounds carry no single targetTime — use the asked event + the
       set of clocks for the scope/coupling checks. */
    var times = round.mode === 'order'
      ? [round.askEvent].concat(round.clocks || [])
      : [round.targetTime];
    var coupledOK = times.every(function (t) {
      var a = handAngles(t.hour, t.minute);
      return t.minute === 30 ? Math.abs(a.hour - ((30 * t.hour + 15) % 360)) < 0.001 : true;
    });
    var minutesInScope = times.every(function (t) { return t.minute === 0 || t.minute === 30; });
    return {
      cog: round.cog,
      mode: round.mode,
      noDigitalTargetShown: true,                            /* the SET prompt is WORDED; the READ clock shows time analogically */
      readoutMirrorsCurrentNotTarget: true,                  /* the set readout shows the child's current hands, never the target */
      cottageFrozenDuringSolve: true,                        /* asserted; the activity never reacts mid-solve */
      dayArcAdvancesRegardlessOfCorrectness: true,
      coupledHourHand: coupledOK,                            /* hour hand BETWEEN at half-past */
      readRoundHasNoNamedTarget: isReadMode,                 /* read/order/world-cue: the prompt names no time */
      gr1MinuteInScope: round.cog === 'five-min' ? true : minutesInScope,
      fiveMinGatedToGr2: round.cog === 'five-min' ? (round.band >= 3) : true,
      readEventHasOneMatch: isReadMode && round.mode === 'read' ? (correctEventId(round) !== null && (round.events || []).filter(function (e) { return e.hour === round.targetTime.hour && e.minute === round.targetTime.minute; }).length === 1) : true,
      orderHasOneMatch: round.mode === 'order' ? (correctClockIndex(round) !== -1 && (round.clocks || []).filter(function (c) { return sameTime(c, round.askEvent); }).length === 1) : true
    };
  }

  /* audit() — answers + per-round data for the gate's solver scoring. */
  function audit(round) {
    var tt = round.targetTime || round.askEvent || { hour: 0, minute: 0 };   /* order: the asked time */
    return {
      id: round.id, cog: round.cog, mode: round.mode,
      targetTime: { hour: tt.hour, minute: tt.minute },
      setWord: (round.mode === 'set') ? setWord(round) : null,   /* world-cue names NO time (decode a cue) */
      shownDigitalTarget: null,                              /* NEVER a digital target */
      events: (round.events || []).map(function (e) { return { id: e.id, hour: e.hour, minute: e.minute }; }),
      correctEventId: correctEventId(round),
      clocks: (round.clocks || []).map(function (c) { return { hour: c.hour, minute: c.minute }; }),
      askEvent: round.askEvent ? { hour: round.askEvent.hour, minute: round.askEvent.minute } : null,
      correctClockIndex: round.mode === 'order' ? correctClockIndex(round) : -1
    };
  }

  global.ClockReadCore = {
    COGS: COGS,
    TIME_EXPR: TIME_EXPR,
    wordFor: wordFor,
    setWord: setWord,
    handAngles: handAngles,
    targetAngles: targetAngles,
    angleFromPointer: angleFromPointer,
    snapHour: snapHour,
    snapMinute: snapMinute,
    isCorrectSet: isCorrectSet,
    isCorrectRead: isCorrectRead,
    isCorrectOrder: isCorrectOrder,
    correctEventId: correctEventId,
    correctClockIndex: correctClockIndex,
    snapshot: snapshot,
    facts: facts,
    audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
