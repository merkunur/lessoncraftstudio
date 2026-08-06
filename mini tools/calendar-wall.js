/* =====================================================================
   TOOL #7 — CALENDAR WALL   (calendar-wall.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). Pilot-wave tool, REBUILT 2026-08-06 to the current
   bar: a pure model seam, events on days, a countdown in days, a print
   sheet, and the gate suite that would have caught what shipped.

   THE THESIS. A month is a row of days you can point at, and the two
   numbers a class cares about — WHICH DAY IT IS and HOW MANY DAYS WE
   HAVE BEEN HERE — are different numbers that drift apart. The calendar
   is where you can see why.

   ⭐⭐ WHAT THE REBUILD IS FOR, IN ONE SENTENCE: THE OLD ONE DID NOT
   SHOW ITS DATES. `back` cells got no numeral node at all, so on the 4th
   of August a 31-day month rendered SEVEN numerals — five of them on
   weekends. The face-down card is a lovely ritual for TODAY; applied to
   the whole future month it made the instrument unusable as a calendar,
   and it made the commissioned feature — mark the class trip on the
   18th — literally unbuildable, because the 18th was not written
   anywhere. Everything else in this rebuild is downstream of that.

   ⭐ AND THE INVERSION THAT FIXES IT IS ALSO THE PEDAGOGY. The pattern
   used to render ONLY on future cells and was ERASED the moment a day
   arrived, so the class could only ever see cards for days that had not
   happened. The physical pocket chart this imitates does the opposite:
   the date is printed on the pocket, and the pattern card is PLACED on
   the day as it arrives, and stays. So: future days are plain and
   numbered; the card is placed each morning; the strip grows behind you.
   That fixes the missing numerals, the future-only pattern and the
   erase-on-completion together, and it is the only version in which
   "what card goes on tomorrow?" is a real question.

   THE INVENTION: THE TWO NUMBERS. Every calendar counts down in sleeps.
   This one shows sleeps AND school days at the same time, and the gap
   between them is the lesson — "twelve sleeps but only eight school
   days, why?" The no-school mark is what makes them differ, which is
   why that mark is the load-bearing one and not the decorative one.

   THE MOAT: the school-day ordinal written into the cell. When the
   class counts day 61, the calendar writes 61 in today's corner and
   keeps it. Weekends and closed days have none. The grid stops being a
   display and becomes a RECORD — which is what makes the print sheet
   worth printing and what lets a child see why Monday is 61 when Friday
   was 60 though four days passed.

   THE FENCE (§23.3), four surfaces, occupied parts subtracted:
   · VIRGIN, measured: date-anchored marking of a calendar cell, and
     counting in DAYS toward a future date. No tool, no activity, none
     of the 240+ printable types, none of the 33 apps. There is no
     calendar, days-of-week or months printable anywhere.
   · `cold-line` owns the number between two marks as how-far-apart, and
     its refuse #2 is "NEVER DRAWS A JUMP, HOP OR ARROW." So the
     countdown NUMBERS CELLS IN PLACE and never draws an arc. Numbering
     a cell is a position label; an arc is the number line's verb.
   · `comparison-planks` owns the difference as a carried object and
     refuses to number it. No conflict: planks measures a CONTINUOUS
     length, where a numeral would launder the comparison; days are
     DISCRETE countable objects, where the numeral IS the count.
   · `number-line` + `open-number-line` + `hoppers-number-line` own hops
     on a line; `graph-it` owns "how many more" as a GRADED question;
     `span-length-gap-activity` owns the graded difference. So this tool
     CLAIMS NO CCSS CODE ANYWHERE and asks nothing it marks.
   · `our-day` owns the within-day strip. THE BOUNDARY, written down:
     our-day = what happens today, in order. calendar-wall = which day
     it is, and which days matter. The calendar never shows a time;
     our-day never shows a date.
   · `learning-clock` + six clock engines own elapsed time at the HOUR
     scale. This tool's unit is the DAY. TRIPWIRE, permanent: if it ever
     shows a unit smaller than a day it has become the clock's object
     and must be removed.

   REFUSES, FOREVER
     1. No attendance, no who-is-here, no record about a child.
     2. No time of day, no schedule, no periods, no recurring weekly
        specials. That is our-day.
     3. No per-country holiday presets. A country x religion x region
        table across eleven locales is an annual liability that will be
        wrong for somebody every year. The teacher marks her own.
     4. No jump, hop or arrow on the countdown path.
     5. No timer, no score, no streak, no percentage, no progress bar.
        Percent is not K-3 and a bar hides the discrete days that ARE
        the mathematics.
     6. No event may ever auto-change the day count. The count is a
        tally of LIVED days, not a function of the calendar.
     7. No capacity cap on events, ever.
     8. No emoji, icon or colour picker. Colour is derived from kind or
        it stops being a code the class can learn.
     9. No CCSS claim. Readiness class, the pattern-bench precedent.

   ⚠ MEASURED 2026-08-06, and it corrected two things I had assumed.
   The card is CONTENT-DRIVEN, not pinned: the chain is html(100%) ->
   body(100%) -> #lcs-root(AUTO) -> .lcs-app(100% of auto = auto). And
   NOTHING was clipped in any regime — the old height ladder genuinely
   worked. The real defects were (a) a two-jump load, measured 420 ->
   712 -> 954 in the embed, because `.cwl-widget{min-height:44vh}` fed
   its own iframe and stopped only when a clamp ceiling caught it;
   (b) the projector block keyed `min-width:768` never firing in the
   704px embed teachers actually use; and (c) TEN PIXELS of slack at
   1024x768 (dock bottom 758 of 768), which the countdown chip alone
   would have blown. That last one is why the layout rewrite is not a
   tidy-up: it is what makes the commission fit.
   ===================================================================== */
(function () {
  'use strict';

  /* ===================================================================
     THE MODEL — pure, total, no DOM, no `this` on the hot paths.
     Everything a gate needs to prove is in here, so the gate can drive
     it in Node and cannot end up reimplementing the tool (§23.6: a gate
     that reimplements what it checks is testing a copy).
     ⚠ TOTALITY IS LOAD-BEARING. Every entry point coerces and clamps
     rather than trusting its input; `st || newWall()` is NOT total
     because it catches null and 0 and hands anything else straight
     through (recorded on #39).
     =================================================================== */
  var MODEL = {

    /* ---- local date keys. NEVER toISOString: that is UTC midnight and
       is a day out for half the planet for part of every day. ---- */
    pad: function (n) { return (n < 10 ? '0' : '') + n; },

    keyOf: function (y, m, d) {
      return String(y) + '-' + this.pad(m + 1) + '-' + this.pad(d);
    },

    keyFromDate: function (dt) {
      return this.keyOf(dt.getFullYear(), dt.getMonth(), dt.getDate());
    },

    /* a key is well-formed iff it round-trips through a real local Date */
    isKey: function (k) {
      if (typeof k !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(k)) return false;
      var d = this.dateFromKey(k);
      return !!d && this.keyFromDate(d) === k;
    },

    dateFromKey: function (k) {
      if (typeof k !== 'string') return null;
      var p = k.split('-');
      if (p.length !== 3) return null;
      var y = +p[0], m = +p[1] - 1, d = +p[2];
      if (!isFinite(y) || !isFinite(m) || !isFinite(d)) return null;
      return new Date(y, m, d);          /* local midnight, DST-safe */
    },

    /* ⚠ DAY ARITHMETIC GOES THROUGH THE DATE CONSTRUCTOR, never
       +86400000. On a DST transition a day is 23 or 25 hours long, and
       millisecond arithmetic silently lands on the wrong date twice a
       year in every European locale this ships to. */
    shiftKey: function (k, n) {
      var d = this.dateFromKey(k);
      if (!d) return k;
      return this.keyFromDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + (n | 0)));
    },

    monthOf: function (k) { return String(k).slice(0, 7); },

    addMonths: function (ym, n) {
      var y = +String(ym).slice(0, 4), m = +String(ym).slice(5, 7) - 1 + (n | 0);
      var d = new Date(y, m, 1);
      return String(d.getFullYear()) + '-' + this.pad(d.getMonth() + 1);
    },

    daysInMonth: function (y, m) { return new Date(y, m + 1, 0).getDate(); },

    dowOf: function (k) {
      var d = this.dateFromKey(k);
      return d ? d.getDay() : 0;         /* 0 = Sunday */
    },

    /* ---- the month matrix ------------------------------------------
       Returns whole weeks only, so `rows` is 4, 5 or 6 and the grid can
       size itself by aspect-ratio without a magic constant. February in
       a non-leap year beginning on the week's first day is the genuine
       4-row case; it exists and must not crash the ratio.
       ---------------------------------------------------------------- */
    monthMatrix: function (ym, weekStart) {
      var y = +String(ym).slice(0, 4), m = +String(ym).slice(5, 7) - 1;
      if (!isFinite(y) || !isFinite(m) || m < 0 || m > 11) return { rows: 0, cells: [] };
      var startSun = weekStart === 'sun';
      var first = new Date(y, m, 1);
      var offset = (first.getDay() - (startSun ? 0 : 1) + 7) % 7;
      var n = this.daysInMonth(y, m);
      var rows = Math.ceil((offset + n) / 7);
      var cells = [], i;
      for (i = 0; i < offset; i++) cells.push({ key: null, day: null });
      for (i = 1; i <= n; i++) cells.push({ key: this.keyOf(y, m, i), day: i });
      while (cells.length < rows * 7) cells.push({ key: null, day: null });
      return { rows: rows, cells: cells };
    },

    /* ---- which days this class meets --------------------------------
       A class that meets four days a week was invisible before: the old
       code hardcoded Sat/Sun everywhere. `meets` is a 7-slot boolean
       array indexed by getDay(), so a Tuesday/Thursday nursery, a
       Friday-off school and a five-day class are all just data.
       ---------------------------------------------------------------- */
    DEFAULT_MEETS: [false, true, true, true, true, true, false],

    meetsDow: function (wall, dow) {
      var m = (wall && wall.meets) || this.DEFAULT_MEETS;
      return m[dow] !== false && m[dow] !== 0;
    },

    /* A day is a possible school day iff the class meets on that weekday
       AND no `off` mark covers it. This is the ONE predicate the +1
       affordance, the school-day countdown and the print sheet all read,
       so they can never disagree with each other. */
    isSchoolDay: function (wall, key) {
      if (!this.isKey(key)) return false;
      if (!this.meetsDow(wall, this.dowOf(key))) return false;
      return !this.hasKind(wall, key, 'off');
    },

    /* ---- the durable per-day record ---------------------------------
       The old `countLog` was a 10-entry repair log that was shifted on
       every advance and wiped on a new year, so NOTHING anywhere knew
       which days had been school days. Every ambition in this rebuild —
       the ordinal in the cell, the school-day countdown, the print sheet
       — needs that record, so it is now the primary store.
       ---------------------------------------------------------------- */
    newWall: function (name) {
      return {
        name: (name === undefined ? null : name),
        createdAt: null,
        days: {},          /* key -> { n: schoolDayOrdinal } */
        events: {},        /* key -> [ {id,k,t,span,rep} ] */
        weather: {},       /* 'YYYY-MM' -> { 'DD': weatherId } */
        meets: this.DEFAULT_MEETS.slice(),
        pattern: 'ab',
        target: null,      /* the countdown flag: an event id */
        lastSummary: null
      };
    },

    /* ⚠ TOTAL. Anything missing is filled; anything of the wrong shape
       is replaced. A wall loaded from a store written by an older build
       must come out usable, not half-usable. */
    wall: function (w) {
      var out = this.newWall(null);
      if (!w || typeof w !== 'object') return out;
      out.name = (typeof w.name === 'string' && w.name) ? w.name : null;
      out.createdAt = this.isKey(w.createdAt) ? w.createdAt : null;
      if (w.days && typeof w.days === 'object') {
        for (var k in w.days) {
          if (!Object.prototype.hasOwnProperty.call(w.days, k)) continue;
          if (!this.isKey(k)) continue;
          var n = w.days[k] && w.days[k].n;
          if (typeof n === 'number' && isFinite(n) && n > 0) out.days[k] = { n: Math.floor(n) };
        }
      }
      if (w.events && typeof w.events === 'object') {
        for (var ek in w.events) {
          if (!Object.prototype.hasOwnProperty.call(w.events, ek)) continue;
          if (!this.isKey(ek)) continue;
          var list = w.events[ek];
          if (!list || !list.length) continue;
          var keep = [], i;
          for (i = 0; i < list.length; i++) {
            var e = this.event(list[i]);
            if (e) keep.push(e);
          }
          if (keep.length) out.events[ek] = keep;
        }
      }
      if (w.weather && typeof w.weather === 'object') out.weather = w.weather;
      if (Object.prototype.toString.call(w.meets) === '[object Array]' && w.meets.length === 7) {
        out.meets = [];
        for (var d = 0; d < 7; d++) out.meets.push(w.meets[d] !== false && w.meets[d] !== 0);
      }
      if (w.pattern === 'ab' || w.pattern === 'abb' || w.pattern === 'abc') out.pattern = w.pattern;
      if (typeof w.target === 'string' && w.target) out.target = w.target;
      if (w.lastSummary && typeof w.lastSummary.days === 'number') {
        out.lastSummary = { days: Math.max(0, Math.floor(w.lastSummary.days)) };
      }
      return out;
    },

    /* the ordinal written in the cell; 0 means "not a counted day" */
    ordinalOn: function (wall, key) {
      var rec = wall && wall.days && wall.days[key];
      return (rec && rec.n) ? rec.n : 0;
    },

    /* the highest ordinal recorded — the number the counter shows */
    dayCount: function (wall) {
      var best = 0;
      if (!wall || !wall.days) return 0;
      for (var k in wall.days) {
        if (!Object.prototype.hasOwnProperty.call(wall.days, k)) continue;
        var n = wall.days[k].n;
        if (n > best) best = n;
      }
      return best;
    },

    countedOn: function (wall, key) { return this.ordinalOn(wall, key) > 0; },

    /* ⚠ A REFUSAL, NOT A CLAMP. Counting a day that is already counted,
       or a day the class does not meet, returns null so the caller can
       tell "nothing happened" from "something happened". The old code
       returned silently and the button had to guess. */
    countDay: function (wall, key) {
      if (!this.isKey(key)) return null;
      if (this.countedOn(wall, key)) return null;
      if (!this.isSchoolDay(wall, key)) return null;
      wall.days[key] = { n: this.dayCount(wall) + 1 };
      return wall.days[key].n;
    },

    /* Only the most recently counted day can be un-counted, so the
       ordinals can never develop a hole. */
    uncountDay: function (wall, key) {
      var n = this.ordinalOn(wall, key);
      if (!n || n !== this.dayCount(wall)) return null;
      delete wall.days[key];
      return n - 1;
    },

    /* The teacher stepper. Reality beats arithmetic — she was in the
       room and the tool was not — so this sets the ordinal of ONE day
       directly and re-bases nothing else. */
    setCountOn: function (wall, key, n) {
      if (!this.isKey(key)) return null;
      n = Math.max(0, Math.min(999, Math.floor(Number(n) || 0)));
      if (n === 0) { delete wall.days[key]; return 0; }
      wall.days[key] = { n: n };
      return n;
    },

    /* ===== events ==================================================== */

    /* FOUR KINDS, AND THE CLOSEDNESS IS THE DESIGN.
       off   — the only mathematically load-bearing mark. It is why the
               date and the day-count diverge and it is the term that
               makes the countdown's two numbers differ.
       trip  — the operator's named case and the archetypal target.
       bday  — the highest-frequency teacher mark in a real K-3 room,
               and the only one a CHILD has a personal stake in. Carries
               NO NAME by default: a cake on a day. The label is the
               teacher's to write or leave blank, which is also what
               keeps a summer-born child from being visible by absence.
       star  — the deliberate catch-all. IT EXISTS TO PROTECT THE OTHER
               THREE: without it teachers overload the bus until the bus
               stops meaning bus.
       A fifth "note" kind was proposed and rejected — a mark a
       pre-reader cannot read is furniture. The note IS the star plus
       the optional label. */
    KINDS: ['off', 'trip', 'bday', 'star'],

    isKind: function (k) {
      for (var i = 0; i < this.KINDS.length; i++) if (this.KINDS[i] === k) return true;
      return false;
    },

    MAX_TITLE: 40,
    MAX_SPAN: 10,

    /* ⚠ PURE AND TOTAL, and it never throws — the teacher types this.
       Collapses whitespace, strips control AND invisible characters,
       caps the length. Cloned from class-graph's cleanText.
       ⚠ THE INVISIBLE-CHARACTER CLASS IS WRITTEN AS ESCAPES ON
       PURPOSE, and that is not a style choice. Spelling it with the
       literal characters makes a rule whose correctness is invisible to
       whoever edits it next, and it made this entire file read as
       BINARY to grep the moment it was first written. A rule you cannot
       see is a rule nobody can review. */
    cleanText: function (s, max) {
      if (s === null || s === undefined) return '';
      var t = String(s).replace(/[\u0000-\u001f\u007f\u200b-\u200d\u2060\ufeff]/g, '')
                       .replace(/\s+/g, ' ').trim();
      if (typeof max === 'number' && t.length > max) t = t.slice(0, max).trim();
      return t;
    },

    event: function (e) {
      if (!e || typeof e !== 'object') return null;
      if (!this.isKind(e.k)) return null;
      var span = Math.max(1, Math.min(this.MAX_SPAN, Math.floor(Number(e.span) || 1)));
      return {
        id: (typeof e.id === 'string' && e.id) ? e.id : null,
        k: e.k,
        t: this.cleanText(e.t, this.MAX_TITLE),
        span: span,
        rep: (e.rep === 'year') ? 'year' : 'once'
      };
    },

    /* `span` is stored ONLY on the run's first day; continuation days
       are derived. Storing it per-day would let a run disagree with
       itself after an edit. */
    addEvent: function (wall, key, kind, title, span, rep, id) {
      if (!this.isKey(key) || !this.isKind(kind)) return null;
      var e = this.event({ id: id || null, k: kind, t: title, span: span, rep: rep });
      if (!e) return null;
      if (!e.id) e.id = 'e_' + Math.floor(Math.random() * 1e9).toString(36) + String(Object.keys(wall.events).length);
      if (!wall.events[key]) wall.events[key] = [];
      wall.events[key].push(e);
      return e.id;
    },

    findEvent: function (wall, id) {
      for (var k in wall.events) {
        if (!Object.prototype.hasOwnProperty.call(wall.events, k)) continue;
        var list = wall.events[k];
        for (var i = 0; i < list.length; i++) if (list[i].id === id) return { key: k, index: i, e: list[i] };
      }
      return null;
    },

    updateEvent: function (wall, id, patch) {
      var hit = this.findEvent(wall, id);
      if (!hit) return null;
      var merged = this.event({
        id: id,
        k: (patch && patch.k !== undefined) ? patch.k : hit.e.k,
        t: (patch && patch.t !== undefined) ? patch.t : hit.e.t,
        span: (patch && patch.span !== undefined) ? patch.span : hit.e.span,
        rep: (patch && patch.rep !== undefined) ? patch.rep : hit.e.rep
      });
      if (!merged) return null;
      wall.events[hit.key][hit.index] = merged;
      return merged;
    },

    removeEvent: function (wall, id) {
      var hit = this.findEvent(wall, id);
      if (!hit) return null;
      var e = wall.events[hit.key][hit.index];
      wall.events[hit.key].splice(hit.index, 1);
      if (!wall.events[hit.key].length) delete wall.events[hit.key];
      if (wall.target === id) wall.target = null;
      return { key: hit.key, e: e };
    },

    /* ---- what is on a given day ------------------------------------
       Resolves BOTH multi-day runs and yearly repeats. Entries carry
       their own run position so the renderer never recomputes it.

       ⚠ IT ITERATES THE EVENTS, NOT THE CALENDAR, AND THAT IS A
       CORRECTNESS-SHAPED PERFORMANCE RULE. The first version probed
       backwards day-by-day and then swept sixty candidate years for each
       of those days — about six hundred lookups PER CALL. `isSchoolDay`
       calls `hasKind` calls this; `schoolDaysBetween` calls
       `isSchoolDay` up to twenty-one times; the month grid calls it once
       per cell. That is ~600 x 42 on every single repaint, for a wall
       that typically holds a couple of dozen events. Iterating the
       events instead is O(#events), gives the identical answer, and is
       the only version that can also say honestly what happens on a
       29 February: `isKey` rejects the non-existent anchor, so the
       repeat simply does not occur that year rather than silently
       sliding onto the 28th or the 1st.
       ---------------------------------------------------------------- */
    eventsOn: function (wall, key) {
      var out = [];
      if (!this.isKey(key) || !wall || !wall.events) return out;
      var y = +key.slice(0, 4);

      for (var origin in wall.events) {
        if (!Object.prototype.hasOwnProperty.call(wall.events, origin)) continue;
        var list = wall.events[origin];
        if (!list || !list.length) continue;
        var oy = +origin.slice(0, 4);
        var md = origin.slice(5);

        /* the anchors this origin could cover `key` from: itself, plus —
           for a yearly repeat — this year's and last year's same
           month-and-day (last year's matters only for a run that crosses
           New Year). Any anchor that is not a real date is skipped. */
        var anchors = [{ k: origin, rep: false }];
        for (var i = 0; i < list.length; i++) {
          if (list[i].rep === 'year') {
            if (y > oy) {
              var a1 = String(y) + '-' + md, a2 = String(y - 1) + '-' + md;
              if (this.isKey(a1)) anchors.push({ k: a1, rep: true });
              if (y - 1 > oy && this.isKey(a2)) anchors.push({ k: a2, rep: true });
            }
            break;
          }
        }

        for (var a = 0; a < anchors.length; a++) {
          var off = this.sleepsBetween(anchors[a].k, key);
          if (off === null || off < 0 || off >= this.MAX_SPAN) continue;
          for (var j = 0; j < list.length; j++) {
            var e = list[j];
            if (anchors[a].rep && e.rep !== 'year') continue;
            if (off >= e.span) continue;
            out.push({
              id: e.id, k: e.k, t: e.t, span: e.span, rep: e.rep,
              startKey: anchors[a].k, offset: off,
              isStart: off === 0,
              isEnd: off === e.span - 1,
              viaRepeat: anchors[a].rep
            });
          }
        }
      }

      /* stable, kind-ordered: `off` first so it can own the cell ground */
      var rank = { off: 0, trip: 1, bday: 2, star: 3 };
      out.sort(function (p, q) {
        return (rank[p.k] - rank[q.k]) || (p.id < q.id ? -1 : (p.id > q.id ? 1 : 0));
      });
      return out;
    },

    hasKind: function (wall, key, kind) {
      var on = this.eventsOn(wall, key);
      for (var i = 0; i < on.length; i++) if (on[i].k === kind) return true;
      return false;
    },

    /* ===== the countdown ============================================
       ⚠ NEVER DRAWS A JUMP, HOP OR ARROW — cold-line's refuse #2,
       adopted verbatim, because the horizontal number line is heavily
       occupied. This returns NUMBERS; the view numbers cells in place.
       ================================================================ */
    HORIZON: 21,

    /* Exactly one target at a time. Setting a second visibly releases
       the first — two competing countdowns halve the ritual and double
       the confusion. */
    setTarget: function (wall, id) {
      if (id === null) { wall.target = null; return null; }
      if (!this.findEvent(wall, id)) return null;
      wall.target = id;
      return id;
    },

    /* whole days from `a` to `b`; negative if b is in the past */
    sleepsBetween: function (a, b) {
      if (!this.isKey(a) || !this.isKey(b)) return null;
      var da = this.dateFromKey(a), db = this.dateFromKey(b);
      /* ⚠ noon-anchored so a DST transition inside the span cannot round
         the quotient down to 11.958 days and floor to 11. */
      var ms = Date.UTC(db.getFullYear(), db.getMonth(), db.getDate())
             - Date.UTC(da.getFullYear(), da.getMonth(), da.getDate());
      return Math.round(ms / 86400000);
    },

    /* The second number, and the one that does the work: days the class
       will actually be in the room, AFTER `a` and up to and including
       `b`. Excludes non-meeting weekdays and every day marked `off`. */
    schoolDaysBetween: function (wall, a, b) {
      var n = this.sleepsBetween(a, b);
      if (n === null || n <= 0) return 0;
      var count = 0, k = a, i;
      for (i = 0; i < n; i++) {
        k = this.shiftKey(k, 1);
        if (this.isSchoolDay(wall, k)) count++;
      }
      return count;
    },

    /* The chip's whole content. Returns null outside the horizon, which
       IS the anti-nag mechanism — beyond three weeks it does not render
       at all. */
    countdown: function (wall, todayKey) {
      if (!wall || !wall.target) return null;
      var hit = this.findEvent(wall, wall.target);
      if (!hit) return null;
      var targetKey = hit.key;
      /* a yearly-repeat target counts to its NEXT occurrence */
      if (hit.e.rep === 'year') {
        var y = +todayKey.slice(0, 4);
        var md = targetKey.slice(5);
        var thisYear = String(y) + '-' + md;
        if (this.isKey(thisYear) && this.sleepsBetween(todayKey, thisYear) >= 0) targetKey = thisYear;
        else {
          var next = String(y + 1) + '-' + md;
          if (this.isKey(next)) targetKey = next;
        }
      }
      var sleeps = this.sleepsBetween(todayKey, targetKey);
      if (sleeps === null || sleeps < 0) return null;
      if (sleeps > this.HORIZON) return null;
      return {
        id: hit.e.id, kind: hit.e.k, title: hit.e.t, key: targetKey,
        sleeps: sleeps,
        schoolDays: this.schoolDaysBetween(wall, todayKey, targetKey),
        today: sleeps === 0
      };
    },

    /* the cells the "count them together" move numbers, in order */
    countdownPath: function (wall, todayKey) {
      var c = this.countdown(wall, todayKey);
      if (!c || c.sleeps < 1) return [];
      var out = [], k = todayKey, i;
      for (i = 1; i <= c.sleeps; i++) { k = this.shiftKey(k, 1); out.push({ key: k, n: i }); }
      return out;
    },

    /* ===== the pattern ==============================================
       INVERTED. The index is the ORDINAL of the school day, not the day
       of the month — so the strip runs across the days the class was
       actually there and does not stutter over weekends and holidays.
       Returns null for a day that has not been counted yet, which is
       what makes "what card goes on tomorrow?" a real question with a
       findable answer rather than a guess at a hidden rule.
       ================================================================ */
    PATTERNS: { ab: 2, abb: 3, abc: 3 },

    patternIndexOn: function (wall, key) {
      var n = this.ordinalOn(wall, key);
      if (!n) return null;
      var p = (wall && wall.pattern) || 'ab';
      if (p === 'abb') return ((n - 1) % 3 === 0) ? 0 : 1;
      if (p === 'abc') return (n - 1) % 3;
      return (n - 1) % 2;
    },

    /* the answer to "what goes on tomorrow?" — the NEXT unplaced card */
    nextPatternIndex: function (wall) {
      var n = this.dayCount(wall) + 1;
      var p = (wall && wall.pattern) || 'ab';
      if (p === 'abb') return ((n - 1) % 3 === 0) ? 0 : 1;
      if (p === 'abc') return (n - 1) % 3;
      return (n - 1) % 2;
    },

    /* ===== weather =================================================== */
    weatherOn: function (wall, key) {
      var ym = this.monthOf(key), dd = String(key).slice(8, 10);
      var mo = wall && wall.weather && wall.weather[ym];
      return (mo && mo[dd]) || null;
    },

    setWeatherOn: function (wall, key, id) {
      if (!this.isKey(key)) return null;
      var ym = this.monthOf(key), dd = key.slice(8, 10);
      if (!wall.weather[ym]) wall.weather[ym] = {};
      wall.weather[ym][dd] = id;
      return id;
    },

    weatherCounts: function (wall, ym, ids) {
      var counts = {}, i;
      for (i = 0; i < ids.length; i++) counts[ids[i]] = 0;
      var mo = (wall && wall.weather && wall.weather[ym]) || {};
      for (var dd in mo) {
        if (!Object.prototype.hasOwnProperty.call(mo, dd)) continue;
        if (counts[mo[dd]] !== undefined) counts[mo[dd]]++;
      }
      return counts;
    }
  };

  /* ===================================================================
     THE ART.
     ⚠ ONE INK, ONE GROUND, AND THAT IS THE ACCESSIBILITY RULING — not a
     redundant-colour scheme but the absence of a colour scheme. Every
     event badge is #0E5147 on a cream disc, so there is no colour
     difference between "no school" and "class trip" and therefore
     NOTHING FOR A COLOUR-BLIND TEACHER TO BE BLIND TO. A hundred per
     cent of the distinction is silhouette, which is also a hundred per
     cent of what a pre-reader can use and a hundred per cent of what
     survives a photocopier. The disc carries its own ground, so the
     badge holds 8.3:1 whatever the cell underneath is doing.
     Craft rules the source obeys: one 24-grid, live area 2..22; SOLID
     silhouettes, never keylines (a 2px keyline is 1.2px at 14px and
     greys out under projector gamma); counter-forms are evenodd holes in
     a single path, never a second-colour overlay; minimum feature 2.5
     units; currentColor only.
     ⚠ NO “id” AND NO “<use>” ANYWHERE. These are stamped up to 62 times
     on a page and duplicate ids across inline SVG is a live bug.
     =================================================================== */
  var EV_ICON = {
    /* no school: the wall-planner's own blocked-out bands, so the editor
       button shows exactly what the cell will look like */
    off: '<svg viewBox="0 0 24 24" class="cwl-ev" aria-hidden="true"><g fill="currentColor">' +
      '<path d="M2.6 12.9 12.9 2.6a1.8 1.8 0 1 1 2.5 2.5L5.1 15.4a1.8 1.8 0 1 1-2.5-2.5Z"/>' +
      '<path d="M8.6 18.9 18.9 8.6a1.8 1.8 0 1 1 2.5 2.5L11.1 21.4a1.8 1.8 0 1 1-2.5-2.5Z"/>' +
      '</g></svg>',
    /* ⚠ A RUCKSACK, NOT A BUS. The yellow school bus is US-coded and the
       European coach is not iconic; a rucksack is what every child in
       all eleven locales actually takes on the trip. The pocket is an
       evenodd hole so it survives any ground and any recolour. */
    trip: '<svg viewBox="0 0 24 24" class="cwl-ev" aria-hidden="true">' +
      '<path fill="currentColor" fill-rule="evenodd" d="M9.2 1.9h5.6a1.35 1.35 0 0 1 0 2.7H9.2a1.35 1.35 0 0 1 0-2.7Zm2.8 2.9c-4.35 0-7.3 2.85-7.3 6.9v7.8A2.5 2.5 0 0 0 7.2 22h9.6a2.5 2.5 0 0 0 2.5-2.5v-7.8c0-4.05-2.95-6.9-7.3-6.9Zm-2.6 8.7h5.2a1.15 1.15 0 0 1 1.15 1.15v3.1A1.15 1.15 0 0 1 14.6 19H9.4a1.15 1.15 0 0 1-1.15-1.15v-3.1A1.15 1.15 0 0 1 9.4 13.5Z"/>' +
      '</svg>',
    /* cake: the 8-unit candle spike is the identity and it holds at 12px */
    bday: '<svg viewBox="0 0 24 24" class="cwl-ev" aria-hidden="true"><g fill="currentColor">' +
      '<path d="M12 1.7c1.45 1.75 2.15 2.8 2.15 3.75a2.15 2.15 0 0 1-4.3 0c0-.95.7-2 2.15-3.75Z"/>' +
      '<path d="M11.1 6.6h1.8v5.1h-1.8Z"/>' +
      '<path d="M2.4 16.1q1.6-3.2 3.2 0 1.6-3.2 3.2 0 1.6-3.2 3.2 0 1.6-3.2 3.2 0 1.6-3.2 3.2 0 1.6-3.2 3.2 0v3.55A1.75 1.75 0 0 1 19.85 21.4H4.15A1.75 1.75 0 0 1 2.4 19.65Z"/>' +
      '</g></svg>',
    /* a FOUR-point sparkle: a five-point star mushes at 14px, and four
       concave-sided spikes stay clean at 12. Carries no reward meaning
       here because this tool has no score to reward. */
    star: '<svg viewBox="0 0 24 24" class="cwl-ev" aria-hidden="true">' +
      '<path fill="currentColor" d="M12 2.6c1.3 5.6 3.5 7.8 9.1 9.1-5.6 1.3-7.8 3.5-9.1 9.1-1.3-5.6-3.5-7.8-9.1-9.1 5.6-1.3 7.8-3.5 9.1-9.1Z"/>' +
      '</svg>',
    /* the countdown flag RENDERS as a target: the only radially
       symmetric mark in either set, so it cannot be misread rotated and
       it survives to 12px. Rings are 3.2 units = 1.9px at 14px. */
    target: '<svg viewBox="0 0 24 24" class="cwl-ev" aria-hidden="true"><g fill="currentColor" fill-rule="evenodd">' +
      '<path d="M12 1.6a10.4 10.4 0 1 1 0 20.8 10.4 10.4 0 0 1 0-20.8Zm0 3.2a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4Z"/>' +
      '<path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/>' +
      '</g></svg>'
  };

  /* ⚠ ONE SHARED CLOUD MASTER, and it is a correctness fix rather than a
     tidy-up. The old six were three construction languages, four stroke
     weights and a 3.4x spread in optical weight — and in a STRICT 1:1
     pictograph a light icon biases the very length comparison the chart
     exists to teach, which makes it a DATA defect. Five of six now share
     this identical cloud; identity is the mark hanging off it, never the
     cloud and never the colour. Circles plus a rect in ONE fill give a
     seamless union with no arc arithmetic to get wrong. */
  var CLOUD =
    '<circle cx="12" cy="25.5" r="5"/><circle cx="17.5" cy="20.5" r="7.5"/>' +
    '<circle cx="28" cy="18.5" r="9.5"/><circle cx="35.5" cy="25" r="5.5"/>' +
    '<rect x="12" y="24" width="23.5" height="7"/>';

  var WEATHER = [
    { id: 'sun', labelKey: 'wSun', svg:
      '<svg viewBox="0 0 48 48" class="cwl-i" aria-hidden="true"><g class="i-solar">' +
      '<circle cx="24" cy="24" r="12.2"/>' +
      '<path d="M20.4 9.8h7.2L24 3Z"/><path d="M20.4 38.2h7.2L24 45Z"/>' +
      '<path d="M9.8 20.4v7.2L3 24Z"/><path d="M38.2 20.4v7.2L45 24Z"/>' +
      '<g transform="rotate(45 24 24)">' +
      '<path d="M20.4 9.8h7.2L24 3Z"/><path d="M20.4 38.2h7.2L24 45Z"/>' +
      '<path d="M9.8 20.4v7.2L3 24Z"/><path d="M38.2 20.4v7.2L45 24Z"/>' +
      '</g></g></svg>' },

    { id: 'cloud', labelKey: 'wCloud', svg:
      '<svg viewBox="0 0 48 48" class="cwl-i" aria-hidden="true"><g class="i-sky">' + CLOUD + '</g></svg>' },

    { id: 'rain', labelKey: 'wRain', svg:
      '<svg viewBox="0 0 48 48" class="cwl-i" aria-hidden="true">' +
      '<g class="i-sky" transform="translate(0,-5)">' + CLOUD + '</g><g class="i-water">' +
      '<path transform="translate(16,31)"   d="M0 0c1.9 3.1 3.1 4.9 3.1 6.4a3.1 3.1 0 0 1-6.2 0C-3.1 4.9-1.9 3.1 0 0Z"/>' +
      '<path transform="translate(24.5,34)" d="M0 0c1.9 3.1 3.1 4.9 3.1 6.4a3.1 3.1 0 0 1-6.2 0C-3.1 4.9-1.9 3.1 0 0Z"/>' +
      '<path transform="translate(33,31)"   d="M0 0c1.9 3.1 3.1 4.9 3.1 6.4a3.1 3.1 0 0 1-6.2 0C-3.1 4.9-1.9 3.1 0 0Z"/>' +
      '</g></svg>' },

    /* ⚠ NOT AN ASTERISK. The old snow was three crossed hairlines with
       tick serifs 1.9px wide at stamp size — they vanished and it read
       as an asterisk, and it was the only precipitation icon with no
       cloud, structurally inconsistent with rain. Identity now sits in
       the SETTLED DRIFT on the baseline, which is a big shape, with
       falling dots as the structural pair to rain's drops. */
    { id: 'snow', labelKey: 'wSnow', svg:
      '<svg viewBox="0 0 48 48" class="cwl-i" aria-hidden="true">' +
      '<g class="i-sky" transform="translate(0,-6)">' + CLOUD + '</g><g class="i-water">' +
      '<circle cx="16.5" cy="30.5" r="2.6"/><circle cx="24" cy="28.8" r="2.6"/>' +
      '<circle cx="31.5" cy="30.5" r="2.6"/></g>' +
      '<path class="i-sky" d="M9 44c5-5 10-6.5 15-6.5s10 1.5 15 6.5Z"/></svg>' },

    /* the three thin swirls are gone: they were 30% of the set's optical
       weight. Wind is the cloud master driven by three HORIZONTAL gusts,
       the only horizontal marks in the set, so they can never read as rain. */
    { id: 'wind', labelKey: 'wWind', svg:
      '<svg viewBox="0 0 48 48" class="cwl-i" aria-hidden="true">' +
      '<g class="i-sky" transform="translate(0,-3)">' + CLOUD + '</g><g class="i-sky">' +
      '<path d="M8 30.8 36 31.5v2.4L8 33.2Z"/>' +
      '<path d="M15 35.3 35 35.9v2.4L15 37.7Z"/>' +
      '<path d="M10 39.8 35 40.4v2.4L10 42.2Z"/></g></svg>' },

    /* the bolt starts INSIDE the cloud at y=19 and runs to 45, so it
       NOTCHES the silhouette — at stamp size storm and cloud are now
       different SHAPES, not the same blob with a warm smudge. */
    { id: 'storm', labelKey: 'wStorm', svg:
      '<svg viewBox="0 0 48 48" class="cwl-i" aria-hidden="true">' +
      '<g class="i-sky" transform="translate(0,-4)">' + CLOUD + '</g>' +
      '<path class="i-solar" d="M27 19 15.5 33.5H23l-3 11.5L34 29.5h-7.5Z"/></svg>' }
  ];

  /* pre-K four-set. pt swaps the useless snow for wind (the pt panel
     rules on keeping this; it is the only per-locale art decision). */
  var WEATHER_FOUR = { pt: ['sun', 'cloud', 'rain', 'wind'] };

  /* ===================================================================
     DATE_L10N — the spoken and written date, per locale. LIFTED VERBATIM
     from the previous build: these are hand-authored native literals
     (the sv-themes doctrine) and re-inventing them would be re-doing
     work that was already paid for and reviewed.
     The template composes {weekday} (Intl), {dateword} (the literals
     below) and {month} (Intl, from a day+month formatter so inflecting
     locales come out right — fi partitive heinaekuuta).
     ⚠ TTS MUST NEVER READ A RAW DIGIT DATE. "July 15" comes out as
     "fifteen" in most voices, which is the one thing this line exists to
     prevent.
     =================================================================== */
  var DATE_L10N = {
    en: { weekStart:'sun', intl:'en-US', template:'{weekday}, {month} {dateword}',
      dateWords:['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth','twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth','twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first'] },
    de: { weekStart:'mon', intl:'de-DE', template:'{weekday}, der {dateword} {month}',
      dateWords:['erste','zweite','dritte','vierte','fünfte','sechste','siebte','achte','neunte','zehnte','elfte','zwölfte','dreizehnte','vierzehnte','fünfzehnte','sechzehnte','siebzehnte','achtzehnte','neunzehnte','zwanzigste','einundzwanzigste','zweiundzwanzigste','dreiundzwanzigste','vierundzwanzigste','fünfundzwanzigste','sechsundzwanzigste','siebenundzwanzigste','achtundzwanzigste','neunundzwanzigste','dreißigste','einunddreißigste'] },
    fr: { weekStart:'mon', intl:'fr-FR', template:'{weekday} {dateword} {month}',
      dateWords:['premier','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf','vingt','vingt et un','vingt-deux','vingt-trois','vingt-quatre','vingt-cinq','vingt-six','vingt-sept','vingt-huit','vingt-neuf','trente','trente et un'] },
    es: { weekStart:'sun', intl:'es-MX', template:'{weekday} {dateword} de {month}',
      dateWords:['primero','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve','treinta','treinta y uno'] },
    pt: { weekStart:'sun', intl:'pt-BR', four:['sun','cloud','rain','wind'], template:'{weekday}, {dateword} de {month}',
      dateWords:['primeiro','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove','vinte','vinte e um','vinte e dois','vinte e três','vinte e quatro','vinte e cinco','vinte e seis','vinte e sete','vinte e oito','vinte e nove','trinta','trinta e um'] },
    it: { weekStart:'mon', intl:'it-IT', template:'{weekday} {dateword} {month}',
      dateWords:['primo','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove','venti','ventuno','ventidue','ventitré','ventiquattro','venticinque','ventisei','ventisette','ventotto','ventinove','trenta','trentuno'] },
    nl: { weekStart:'mon', intl:'nl-NL', template:'{weekday} {dateword} {month}',
      dateWords:['één','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien','twintig','eenentwintig','tweeëntwintig','drieëntwintig','vierentwintig','vijfentwintig','zesentwintig','zevenentwintig','achtentwintig','negenentwintig','dertig','eenendertig'] },
    sv: { weekStart:'mon', intl:'sv-SE', template:'{weekday} den {dateword} {month}',
      dateWords:['första','andra','tredje','fjärde','femte','sjätte','sjunde','åttonde','nionde','tionde','elfte','tolfte','trettonde','fjortonde','femtonde','sextonde','sjuttonde','artonde','nittonde','tjugonde','tjugoförsta','tjugoandra','tjugotredje','tjugofjärde','tjugofemte','tjugosjätte','tjugosjunde','tjugoåttonde','tjugonionde','trettionde','trettioförsta'] },
    da: { weekStart:'mon', intl:'da-DK', template:'{weekday} den {dateword} {month}',
      dateWords:['første','anden','tredje','fjerde','femte','sjette','syvende','ottende','niende','tiende','ellevte','tolvte','trettende','fjortende','femtende','sekstende','syttende','attende','nittende','tyvende','enogtyvende','toogtyvende','treogtyvende','fireogtyvende','femogtyvende','seksogtyvende','syvogtyvende','otteogtyvende','niogtyvende','tredivte','enogtredivte'] },
    no: { weekStart:'mon', intl:'nb-NO', template:'{weekday} den {dateword} {month}',
      dateWords:['første','andre','tredje','fjerde','femte','sjette','sjuende','åttende','niende','tiende','ellevte','tolvte','trettende','fjortende','femtende','sekstende','syttende','attende','nittende','tjuende','tjueførste','tjueandre','tjuetredje','tjuefjerde','tjuefemte','tjuesjette','tjuesjuende','tjueåttende','tjueniende','trettiende','trettiførste'] },
    fi: { weekStart:'mon', intl:'fi-FI', template:'{weekday}, {dateword} {month}',
      dateWords:['ensimmäinen','toinen','kolmas','neljäs','viides','kuudes','seitsemäs','kahdeksas','yhdeksäs','kymmenes','yhdestoista','kahdestoista','kolmastoista','neljästoista','viidestoista','kuudestoista','seitsemästoista','kahdeksastoista','yhdeksästoista','kahdeskymmenes','kahdeskymmenesyhdes','kahdeskymmeneskahdes','kahdeskymmeneskolmas','kahdeskymmenesneljäs','kahdeskymmenesviides','kahdeskymmeneskuudes','kahdeskymmenesseitsemäs','kahdeskymmeneskahdeksas','kahdeskymmenesyhdeksäs','kolmaskymmenes','kolmaskymmenesyhdes'] }
  }

  /* ===================================================================
     THE TOOL.
     =================================================================== */
  var CalendarWall = {
    id: 'calendar-wall',

    /* the model is exposed so a Node gate can drive it WITHOUT a browser
       and without reimplementing it */
    M: MODEL,
    EV_ICON: EV_ICON,
    WEATHER: WEATHER,
    DATE_L10N: DATE_L10N,

    /* ⚠ GENERATED. Do not hand-edit: scripts/apply-calendar-wall-locales.js
       rewrites this whole block from scripts/_calendar-wall-strings.js and
       the next run silently overwrites anything typed here. */
    strings: {
    title: {en:"Calendar Wall",de:"Kalendertafel",fr:"Calendrier de la classe",it:"Calendario della classe",es:"Calendario del salón",pt:"Mural do calendário",nl:"Kalenderbord",sv:"Samlingskalender",da:"Kalendervæg",no:"Kalendervegg",fi:"Kalenteriseinä"},
    instruction: {en:"The month your class can point at: every date visible, the school days counted, and the days that matter marked.",de:"Der Monat zum Draufzeigen: jedes Datum sichtbar, die Schultage gezählt, die besonderen Tage eingetragen.",fr:"Le mois entier sous les yeux de la classe : chaque date bien visible, les jours d’école numérotés, et les grands jours marqués.",it:"Il mese intero davanti alla classe: ogni data ben visibile, i giorni di scuola numerati e i giorni che contano segnati.",es:"El mes completo frente al salón: cada fecha bien visible, los días de escuela numerados y los días que importan marcados.",pt:"O mês inteiro à vista da turma: cada data bem visível, os dias de aula numerados e os dias que importam marcados.",nl:"De maand om naar te wijzen: elke datum in beeld, de schooldagen geteld en de bijzondere dagen ingevuld.",sv:"Månaden som klassen kan peka på: varje datum syns, skoldagarna räknas och de dagar som betyder något är markerade.",da:"Måneden, klassen kan pege på: hver dato er synlig, skoledagene bliver talt, og de dage, der betyder noget, er markeret.",no:"Måneden klassen kan peke på: hver dato er synlig, skoledagene blir telt, og dagene som betyr noe, er merket.",fi:"Kuukausi, jota luokka voi osoittaa: jokainen päivämäärä näkyy, koulupäivät lasketaan ja tärkeät päivät on merkitty."},
    dockCalendar: {en:"Calendar",de:"Kalender",fr:"Calendrier",it:"Calendario",es:"Calendario",pt:"Calendário",nl:"Kalender",sv:"Kalender",da:"Kalender",no:"Kalender",fi:"Kalenteri"},
    dockCounter: {en:"Days in school",de:"Schultage",fr:"Chaque jour compte",it:"Giorni di scuola",es:"Días de escuela",pt:"Dias de aula",nl:"Schooldagen",sv:"Skoldagar",da:"Skoledage",no:"Skoledager",fi:"Koulupäivät"},
    dockWeather: {en:"Weather",de:"Wetter",fr:"Météo",it:"Tempo",es:"Clima",pt:"Tempo",nl:"Weer",sv:"Väder",da:"Vejr",no:"Vær",fi:"Sää"},
    prevWidget: {en:"Previous",de:"Zurück",fr:"Précédent",it:"Indietro",es:"Anterior",pt:"Anterior",nl:"Vorige",sv:"Föregående",da:"Forrige",no:"Forrige",fi:"Edellinen"},
    nextWidget: {en:"Next",de:"Weiter",fr:"Suivant",it:"Avanti",es:"Siguiente",pt:"Próximo",nl:"Volgende",sv:"Nästa",da:"Næste",no:"Neste",fi:"Seuraava"},
    stripYesterday: {en:"Yesterday was {w}.",de:"Gestern war {w}.",fr:"Hier, c’était {w}.",it:"Ieri era {w}.",es:"Ayer fue {w}.",pt:"Ontem foi {w}.",nl:"Gisteren was het {w}.",sv:"I går var det {w}.",da:"I går var det {w}.",no:"I går var det {w}.",fi:"Eilen oli {w}."},
    stripToday: {en:"Today is {d}.",de:"Heute ist {d}.",fr:"Aujourd’hui, c’est {d}.",it:"Oggi è {d}.",es:"Hoy es {d}.",pt:"Hoje é {d}.",nl:"Vandaag is het {d}.",sv:"I dag är det {d}.",da:"I dag er det {d}.",no:"I dag er det {d}.",fi:"Tänään on {d}."},
    stripTomorrow: {en:"Tomorrow will be {w}.",de:"Morgen ist {w}.",fr:"Demain, ce sera {w}.",it:"Domani sarà {w}.",es:"Mañana será {w}.",pt:"Amanhã será {w}.",nl:"Morgen wordt het {w}.",sv:"I morgon blir det {w}.",da:"I morgen bliver det {w}.",no:"I morgen blir det {w}.",fi:"Huomenna on {w}."},
    todayBtn: {en:"Today",de:"Heute",fr:"Aujourd’hui",it:"Oggi",es:"Hoy",pt:"Hoje",nl:"Vandaag",sv:"I dag",da:"I dag",no:"I dag",fi:"Tänään"},
    speakDateAria: {en:"Hear today’s date",de:"Das heutige Datum anhören",fr:"Écouter la date d’aujourd’hui",it:"Ascolta la data di oggi",es:"Escuchar la fecha de hoy",pt:"Ouvir a data de hoje",nl:"De datum van vandaag beluisteren",sv:"Lyssna på dagens datum",da:"Hør dagens dato",no:"Hør dagens dato",fi:"Kuuntele tämän päivän päivämäärä"},
    prevMonth: {en:"Previous month",de:"Voriger Monat",fr:"Mois précédent",it:"Mese precedente",es:"Mes anterior",pt:"Mês anterior",nl:"Vorige maand",sv:"Föregående månad",da:"Forrige måned",no:"Forrige måned",fi:"Edellinen kuukausi"},
    nextMonth: {en:"Next month",de:"Nächster Monat",fr:"Mois suivant",it:"Mese successivo",es:"Mes siguiente",pt:"Próximo mês",nl:"Volgende maand",sv:"Nästa månad",da:"Næste måned",no:"Neste måned",fi:"Seuraava kuukausi"},
    close: {en:"Close",de:"Schließen",fr:"Fermer",it:"Chiudi",es:"Cerrar",pt:"Fechar",nl:"Sluiten",sv:"Stäng",da:"Luk",no:"Lukk",fi:"Sulje"},
    cancel: {en:"Cancel",de:"Abbrechen",fr:"Annuler",it:"Annulla",es:"Cancelar",pt:"Cancelar",nl:"Annuleren",sv:"Avbryt",da:"Annuller",no:"Avbryt",fi:"Peruuta"},
    daysLabelOne: {en:"day in school",de:"Schultag",fr:"jour d’école",it:"giorno di scuola",es:"día de escuela",pt:"dia de aula",nl:"schooldag",sv:"skoldag",da:"skoledag",no:"skoledag",fi:"koulupäivä"},
    plusOne: {en:"+1 school day",de:"+1 Schultag",fr:"+1 jour d’école",it:"+1 giorno di scuola",es:"+1 día de escuela",pt:"+1 dia de aula",nl:"+1 schooldag",sv:"+1 skoldag",da:"+1 skoledag",no:"+1 skoledag",fi:"+1 koulupäivä"},
    countedToday: {en:"Counted today ✓",de:"Heute gezählt ✓",fr:"Compté aujourd’hui ✓",it:"Contato oggi ✓",es:"Ya contamos hoy ✓",pt:"Já contamos hoje ✓",nl:"Vandaag geteld ✓",sv:"Räknat i dag ✓",da:"Talt i dag ✓",no:"Telt i dag ✓",fi:"Laskettu tänään ✓"},
    undo: {en:"Undo",de:"Rückgängig",fr:"Annuler",it:"Annulla",es:"Deshacer",pt:"Desfazer",nl:"Ongedaan maken",sv:"Ångra",da:"Fortryd",no:"Angre",fi:"Kumoa"},
    daysLabel: {en:"days in school",de:"Schultage",fr:"jours d’école",it:"giorni di scuola",es:"días de escuela",pt:"dias de aula",nl:"schooldagen",sv:"skoldagar",da:"skoledage",no:"skoledager",fi:"koulupäivää"},
    jarHundreds: {en:"Hundreds",de:"Hunderter",fr:"Centaines",it:"Centinaia",es:"Centenas",pt:"Centenas",nl:"Honderdtallen",sv:"Hundratal",da:"Hundreder",no:"Hundrere",fi:"Sadat"},
    jarTens: {en:"Tens",de:"Zehner",fr:"Dizaines",it:"Decine",es:"Decenas",pt:"Dezenas",nl:"Tientallen",sv:"Tiotal",da:"Tiere",no:"Tiere",fi:"Kymmenet"},
    jarOnes: {en:"Ones",de:"Einer",fr:"Unités",it:"Unità",es:"Unidades",pt:"Unidades",nl:"Eenheden",sv:"Ental",da:"Enere",no:"Enere",fi:"Ykköset"},
    editCount: {en:"Set the count",de:"Zählerstand ändern",fr:"Corriger le compteur",it:"Modifica il conteggio",es:"Cambiar el conteo",pt:"Ajustar a contagem",nl:"Telling aanpassen",sv:"Ändra antalet dagar",da:"Ret tallet",no:"Endre tellingen",fi:"Muuta lukemaa"},
    narrTen: {en:"Ten ones make one ten!",de:"Aus zehn Einern wird ein Zehner!",fr:"Dix unités font une dizaine !",it:"Dieci unità fanno una decina!",es:"¡Diez unidades forman una decena!",pt:"Dez unidades formam uma dezena!",nl:"Tien eenheden worden samen één tiental!",sv:"Tio ental blir ett tiotal!",da:"Ti enere bliver til én tier!",no:"Ti enere blir én tier!",fi:"Kymmenen ykköstä on yksi kymppi!"},
    narrHundred: {en:"We have been in school for one hundred days!",de:"Hurra! Heute ist unser hundertster Schultag!",fr:"C’est le centième jour d’école !",it:"Siamo a scuola da cento giorni!",es:"¡Llevamos cien días de escuela!",pt:"Já são cem dias de aula!",nl:"Hoera! We zitten al honderd dagen op school!",sv:"Vi har gått i skolan i hundra dagar!",da:"Vi har gået i skole i hundrede dage!",no:"Vi har gått på skolen i hundre dager!",fi:"Olemme olleet koulussa jo sata päivää!"},
    wSun: {en:"Sunny",de:"Sonne",fr:"Soleil",it:"Sole",es:"Soleado",pt:"Ensolarado",nl:"Zon",sv:"Soligt",da:"Solskin",no:"Sol",fi:"Aurinkoista"},
    wCloud: {en:"Cloudy",de:"Wolken",fr:"Nuages",it:"Nuvole",es:"Nublado",pt:"Nublado",nl:"Wolken",sv:"Molnigt",da:"Skyet",no:"Overskyet",fi:"Pilvistä"},
    wRain: {en:"Rainy",de:"Regen",fr:"Pluie",it:"Pioggia",es:"Lluvioso",pt:"Chuvoso",nl:"Regen",sv:"Regnigt",da:"Regnvejr",no:"Regn",fi:"Sateista"},
    wSnow: {en:"Snowy",de:"Schnee",fr:"Neige",it:"Neve",es:"Nevado",pt:"Com neve",nl:"Sneeuw",sv:"Snöigt",da:"Snevejr",no:"Snø",fi:"Lumisadetta"},
    wWind: {en:"Windy",de:"Wind",fr:"Vent",it:"Vento",es:"Ventoso",pt:"Ventoso",nl:"Wind",sv:"Blåsigt",da:"Blæsevejr",no:"Vind",fi:"Tuulista"},
    wStorm: {en:"Stormy",de:"Gewitter",fr:"Orage",it:"Temporale",es:"Tormenta",pt:"Tempestade",nl:"Onweer",sv:"Åska",da:"Tordenvejr",no:"Torden",fi:"Ukkosta"},
    todayPill: {en:"Today: {w}",de:"Heute: {w}",fr:"Aujourd’hui : {w}",it:"Oggi: {w}",es:"Hoy: {w}",pt:"Hoje: {w}",nl:"Vandaag: {w}",sv:"I dag: {w}",da:"I dag: {w}",no:"I dag: {w}",fi:"Tänään: {w}"},
    changeWeather: {en:"Change",de:"Ändern",fr:"Modifier",it:"Cambia",es:"Cambiar",pt:"Mudar",nl:"Veranderen",sv:"Ändra",da:"Skift",no:"Endre",fi:"Muuta"},
    whatWeather: {en:"What is the weather like today?",de:"Wie ist das Wetter heute?",fr:"Quel temps fait-il aujourd’hui ?",it:"Che tempo fa oggi?",es:"¿Cómo está el clima hoy?",pt:"Como está o tempo hoje?",nl:"Wat voor weer is het vandaag?",sv:"Vad är det för väder i dag?",da:"Hvordan er vejret i dag?",no:"Hvordan er været i dag?",fi:"Millainen sää tänään on?"},
    promptMost: {en:"Which weather has the most days so far?",de:"Welches Wetter gab es bisher am häufigsten?",fr:"Quel temps revient le plus souvent ce mois-ci ?",it:"Quale tempo ha più giorni finora?",es:"¿Qué clima tiene más días hasta ahora?",pt:"Que tempo apareceu mais vezes até agora?",nl:"Welk weer zien we tot nu toe het vaakst?",sv:"Vilket väder har flest dagar hittills?",da:"Hvilket vejr har flest dage indtil nu?",no:"Hvilket vær har flest dager så langt?",fi:"Mitä säätä on ollut tähän mennessä eniten?"},
    promptCompare: {en:"How many more sunny days than rainy days?",de:"Wie viele Sonnentage mehr als Regentage haben wir?",fr:"Combien de jours de soleil de plus que de jours de pluie ?",it:"Quanti giorni di sole in più rispetto ai giorni di pioggia?",es:"¿Cuántos días soleados más que lluviosos llevamos?",pt:"Quantos dias de sol a mais do que dias de chuva?",nl:"Hoeveel zonnige dagen zijn er meer dan regendagen?",sv:"Hur många fler soldagar än regndagar?",da:"Hvor mange flere soldage end regndage har vi haft?",no:"Hvor mange flere soldager enn regndager?",fi:"Montako aurinkoista päivää on enemmän kuin sateisia?"},
    promptTotal: {en:"How many days have we recorded altogether?",de:"Wie viele Tage haben wir insgesamt eingetragen?",fr:"Combien de jours avons-nous notés en tout ?",it:"Quanti giorni abbiamo registrato in tutto?",es:"¿Cuántos días hemos registrado en total?",pt:"Quantos dias registramos ao todo?",nl:"Hoeveel dagen hebben we in totaal al ingevuld?",sv:"Hur många dagar har vi fyllt i sammanlagt?",da:"Hvor mange dage har vi noteret i alt?",no:"Hvor mange dager har vi notert til sammen?",fi:"Montako päivää olemme merkinneet yhteensä?"},
    promptPredict: {en:"What do you predict for tomorrow?",de:"Was glaubst du: Wie wird das Wetter morgen?",fr:"Quel temps prévois-tu pour demain ?",it:"Che tempo prevedi per domani?",es:"¿Qué clima predices para mañana?",pt:"O que você prevê para amanhã?",nl:"Wat voor weer wordt het morgen, denk je?",sv:"Vad tror du om vädret i morgon?",da:"Hvad tror du om vejret i morgen?",no:"Hva tror du om været i morgen?",fi:"Millaista säätä ennustat huomiseksi?"},
    wallsTitle: {en:"Class walls",de:"Klassenkalender",fr:"Mes classes",it:"Calendari di classe",es:"Mis calendarios",pt:"Meus murais",nl:"Mijn klassen",sv:"Klasskalendrar",da:"Klassevægge",no:"Klassevegger",fi:"Luokkaseinät"},
    wallDefault: {en:"My class",de:"Meine Klasse",fr:"Ma classe",it:"La mia classe",es:"Mi grupo",pt:"Minha turma",nl:"Mijn klas",sv:"Min klass",da:"Min klasse",no:"Klassen min",fi:"Oma luokka"},
    newWall: {en:"+ New class wall",de:"+ Neuer Klassenkalender",fr:"+ Nouvelle classe",it:"+ Nuovo calendario di classe",es:"+ Nuevo grupo",pt:"+ Novo mural de turma",nl:"+ Nieuwe klas",sv:"+ Ny klasskalender",da:"+ Ny klassevæg",no:"+ Ny klassevegg",fi:"+ Uusi luokkaseinä"},
    renameWall: {en:"Rename",de:"Umbenennen",fr:"Renommer",it:"Rinomina",es:"Cambiar nombre",pt:"Renomear",nl:"Hernoemen",sv:"Byt namn",da:"Omdøb",no:"Gi nytt navn",fi:"Nimeä uudelleen"},
    newYear: {en:"Start a new school year",de:"Neues Schuljahr beginnen",fr:"Commencer une nouvelle année scolaire",it:"Inizia un nuovo anno scolastico",es:"Empezar un nuevo ciclo escolar",pt:"Começar um novo ano letivo",nl:"Een nieuw schooljaar beginnen",sv:"Starta ett nytt läsår",da:"Start et nyt skoleår",no:"Start et nytt skoleår",fi:"Aloita uusi lukuvuosi"},
    newYearConfirm: {en:"{name} has {n} school days recorded — start a fresh year?",de:"{name} hat {n} gezählte Schultage — ein neues Schuljahr beginnen?",fr:"{name} a {n} jours d’école enregistrés — commencer une nouvelle année ?",it:"{name} ha {n} giorni di scuola registrati — iniziare un nuovo anno?",es:"{name} tiene {n} días de escuela registrados — ¿empezamos un nuevo ciclo?",pt:"{name} tem {n} dias de aula registrados — começar um novo ano letivo?",nl:"{name} heeft {n} schooldagen geteld — een nieuw schooljaar beginnen?",sv:"{name} har {n} räknade skoldagar — starta ett nytt läsår?",da:"{name} har talt {n} skoledage — start et nyt skoleår?",no:"{name} har {n} telte skoledager — starte et nytt år?",fi:"{name}: {n} laskettua koulupäivää — aloitetaanko uusi lukuvuosi?"},
    newYearGo: {en:"Yes, start fresh",de:"Ja, neu beginnen",fr:"Oui, on recommence",it:"Sì, ricominciamo",es:"Sí, empezar de nuevo",pt:"Sim, começar de novo",nl:"Ja, opnieuw beginnen",sv:"Ja, börja om",da:"Ja, begynd forfra",no:"Ja, begynn på nytt",fi:"Kyllä, aloita alusta"},
    lastYear: {en:"Last year: {n} school days",de:"Letztes Schuljahr: {n} Schultage",fr:"L’an dernier : {n} jours d’école",it:"L’anno scorso: {n} giorni di scuola",es:"El ciclo pasado: {n} días de escuela",pt:"Ano passado: {n} dias de aula",nl:"Vorig jaar: {n} schooldagen",sv:"Förra läsåret: {n} skoldagar",da:"Sidste år: {n} skoledage",no:"I fjor: {n} skoledager",fi:"Viime lukuvuonna: {n} koulupäivää"},
    deviceNote: {en:"This wall is saved in this computer’s browser. It won’t follow you to another device or survive clearing browser data.",de:"Dieser Kalender wird im Browser dieses Computers gespeichert. Er wandert nicht auf andere Geräte mit und geht beim Löschen der Browserdaten verloren.",fr:"Ce calendrier est enregistré dans le navigateur de cet ordinateur. Il ne vous suivra pas sur un autre appareil.",it:"Questo calendario è salvato nel browser di questo computer: non ti segue su un altro dispositivo e si perde se cancelli i dati di navigazione.",es:"Este calendario se guarda en el navegador de esta computadora. No te seguirá a otro dispositivo ni se conserva si borras los datos del navegador.",pt:"Este mural fica salvo no navegador deste computador. Ele não acompanha você em outro aparelho.",nl:"Dit kalenderbord wordt bewaard in de browser van deze computer. De gegevens gaan niet mee naar een ander apparaat en overleven het wissen van browsergegevens niet.",sv:"Den här kalendern sparas i den här datorns webbläsare. Den följer inte med till en annan enhet och försvinner om webbläsardata rensas.",da:"Denne væg gemmes i denne computers browser. Den følger ikke med til en anden enhed.",no:"Denne veggen lagres i nettleseren på denne maskinen. Den følger ikke med til en annen enhet.",fi:"Tämä seinä tallentuu tämän tietokoneen selaimeen. Se ei seuraa mukana toiselle laitteelle."},
    patternLabel: {en:"Card pattern",de:"Kartenmuster",fr:"Le motif",it:"Ritmo dei cartellini",es:"El patrón",pt:"O padrão",nl:"Kaartpatroon",sv:"Kortmönster",da:"Kortmønster",no:"Kortmønster",fi:"Korttikuvio"},
    freeWeatherGate: {en:"The whole of this month is yours. Subscribers keep the months that have already gone by.",de:"Der ganze Monat wächst hier kostenlos mit. Die Monate davor gehören zum Lehrer-Paket.",fr:"Tout le mois en cours est à vous. Avec l’abonnement, les mois déjà passés restent affichés eux aussi.",it:"Tutto il mese in corso è vostro. Con l’abbonamento restano anche i mesi già passati.",es:"Todo el mes en curso es tuyo. Con la suscripción también se quedan los meses que ya pasaron.",pt:"O mês atual inteiro é seu. Com a assinatura, os meses que já passaram também continuam aí.",nl:"De hele maand groeit hier gratis mee. Eerdere maanden horen bij het Leerkracht-pakket.",sv:"Den här månadens väder är ert. Prenumeranter kan dessutom bläddra tillbaka till tidigare månader.",da:"Denne måneds vejr er jeres. Abonnenter kan desuden bladre tilbage til tidligere måneder.",no:"Denne månedens vær er deres. Abonnenter kan i tillegg bla tilbake til tidligere måneder.",fi:"Tämän kuukauden sää on teidän. Tilaajat voivat lisäksi selata aiempia kuukausia."},
    newWallGate: {en:"Extra class walls are part of Premium — one wall is always free.",de:"Weitere Klassenkalender gehören zu Premium — ein Kalender bleibt immer kostenlos.",fr:"Les classes supplémentaires font partie de Premium — une classe reste toujours gratuite.",it:"I calendari di classe aggiuntivi fanno parte di Premium — un calendario resta sempre gratuito.",es:"Los grupos adicionales son parte de Premium — el primer grupo siempre es gratis.",pt:"Murais de turma extras fazem parte do Premium — um mural é sempre gratuito.",nl:"Extra klassen horen bij Premium — één klas is altijd gratis.",sv:"Fler klasskalendrar ingår i Premium — en kalender är alltid gratis.",da:"Ekstra klassevægge er en del af Premium — én væg er altid gratis.",no:"Flere klassevegger er en del av Premium — én vegg er alltid gratis.",fi:"Lisäseinät kuuluvat Premiumiin — yksi seinä on aina ilmainen."},
    unlock: {en:"Keep your wall all year",de:"Behalten Sie Ihren Kalender das ganze Schuljahr",fr:"Gardez votre calendrier toute l’année",it:"Conserva il tuo calendario tutto l'anno",es:"Conserva tu calendario todo el año",pt:"Mantenha seu mural o ano todo",nl:"Bewaar je kalenderbord het hele schooljaar",sv:"Behåll klassens kalender hela läsåret",da:"Behold din væg hele året",no:"Behold veggen din hele året",fi:"Pidä seinäsi koko lukuvuoden"},
    setWeather: {en:"Weather icons",de:"Wettersymbole",fr:"Icônes météo",it:"Icone del tempo",es:"Íconos del clima",pt:"Ícones do tempo",nl:"Weerpictogrammen",sv:"Vädersymboler",da:"Vejrsymboler",no:"Værsymboler",fi:"Sääkuvakkeet"},
    setWeather4: {en:"4 (pre-K)",de:"4 (Vorschule)",fr:"4 (maternelle)",it:"4 (infanzia)",es:"4 (preescolar)",pt:"4 (educação infantil)",nl:"4 (kleuters)",sv:"4 (förskola)",da:"4 (børnehave)",no:"4 (barnehage)",fi:"4 (esikoulu)"},
    setWeather6: {en:"6",de:"6",fr:"6",it:"6",es:"6",pt:"6",nl:"6",sv:"6",da:"6",no:"6",fi:"6"},
    setCounter: {en:"Day counter shows",de:"Der Zähler zeigt",fr:"Le compteur montre",it:"Il contatore mostra",es:"El contador muestra",pt:"O contador mostra",nl:"De teller toont",sv:"Räknaren visar",da:"Tælleren viser",no:"Telleren viser",fi:"Laskuri näyttää"},
    setCounterAll: {en:"Bundles + frame + number",de:"Bündel + Zehnerfeld + Zahl",fr:"Pailles + boîte de dix + nombre",it:"Mazzetti + tabella + numero",es:"Manojos + marco + número",pt:"Feixes + quadro + número",nl:"Bundels + tienraam + getal",sv:"Buntar + tioram + tal",da:"Bundter + tierramme + tal",no:"Bunter + tierramme + tall",fi:"Niput + kymmenruudukko + luku"},
    setCounterTwo: {en:"Frame + number",de:"Zehnerfeld + Zahl",fr:"Boîte de dix + nombre",it:"Tabella + numero",es:"Marco + número",pt:"Quadro + número",nl:"Tienraam + getal",sv:"Tioram + tal",da:"Tierramme + tal",no:"Tierramme + tall",fi:"Kymmenruudukko + luku"},
    setCounterNum: {en:"Number only",de:"Nur die Zahl",fr:"Nombre seul",it:"Solo il numero",es:"Solo el número",pt:"Só o número",nl:"Alleen het getal",sv:"Bara talet",da:"Kun tallet",no:"Bare tallet",fi:"Vain luku"},
    setSpeak: {en:"Speak the date",de:"Datum vorlesen",fr:"Dire la date",it:"Leggi la data ad alta voce",es:"Decir la fecha",pt:"Falar a data",nl:"Datum uitspreken",sv:"Läs upp datumet",da:"Læs datoen op",no:"Les datoen høyt",fi:"Lue päivämäärä ääneen"},
    setWeek: {en:"Week starts on",de:"Die Woche beginnt am",fr:"La semaine commence le",it:"La settimana inizia di",es:"La semana empieza el",pt:"Início da semana",nl:"De week begint op",sv:"Veckan börjar på",da:"Ugen starter",no:"Uken starter på",fi:"Viikko alkaa"},
    setWeekAuto: {en:"Automatic",de:"Automatisch",fr:"Automatique",it:"Automatico",es:"Automático",pt:"Automático",nl:"Automatisch",sv:"Automatiskt",da:"Automatisk",no:"Automatisk",fi:"Automaattisesti"},
    setWeekMon: {en:"Monday",de:"Montag",fr:"Lundi",it:"Lunedì",es:"Lunes",pt:"Segunda",nl:"Maandag",sv:"Måndag",da:"Mandag",no:"Mandag",fi:"Maanantaista"},
    setWeekSun: {en:"Sunday",de:"Sonntag",fr:"Dimanche",it:"Domenica",es:"Domingo",pt:"Domingo",nl:"Zondag",sv:"Söndag",da:"Søndag",no:"Søndag",fi:"Sunnuntaista"},
    kindOff: {en:"No school",de:"Schulfrei",fr:"Pas d’école",it:"Niente scuola",es:"Sin clases",pt:"Sem aula",nl:"Geen school",sv:"Ingen skola",da:"Ingen skole",no:"Ingen skole",fi:"Ei koulua"},
    kindTrip: {en:"Trip",de:"Klassenausflug",fr:"Excursion",it:"Escursione",es:"Excursión",pt:"Excursão",nl:"Schooluitje",sv:"Utflyktsdag",da:"Udflugtsdag",no:"Utfluktsdag",fi:"Retkipäivä"},
    kindBday: {en:"Birthday",de:"Geburtstag",fr:"Anniversaire",it:"Compleanno",es:"Cumpleaños",pt:"Aniversário",nl:"Verjaardag",sv:"Födelsedag",da:"Fødselsdag",no:"Bursdag",fi:"Syntymäpäivä"},
    kindStar: {en:"Special day",de:"Besonderer Tag",fr:"Jour spécial",it:"Giorno speciale",es:"Día especial",pt:"Dia especial",nl:"Bijzondere dag",sv:"Särskild dag",da:"Særlig dag",no:"Spesiell dag",fi:"Erityinen päivä"},
    teacherKey: {en:"Teacher: mark days",de:"Lehrkraft: Tage eintragen",fr:"Enseignant : marquer les jours",it:"Insegnante: segnare i giorni",es:"Docente: marcar días",pt:"Docente: marcar dias",nl:"Leerkracht: dagen invullen",sv:"Lärare: märk dagar",da:"Lærer: markér dage",no:"Lærer: merk dager",fi:"Opettaja: merkitse päiviä"},
    teacherOn: {en:"Marking is on",de:"Eintragen ist an",fr:"Marquage activé",it:"Segni attivi",es:"Marcado activado",pt:"Marcação ativada",nl:"Invullen staat aan",sv:"Du kan märka dagar",da:"Du kan markere dage",no:"Du kan merke dager",fi:"Voit merkitä päiviä"},
    daySheet: {en:"Nothing is marked on this day.",de:"An diesem Tag ist noch nichts eingetragen.",fr:"Rien de marqué ce jour-là.",it:"In questo giorno non c’è nulla di segnato.",es:"Este día no tiene nada marcado.",pt:"Neste dia não há nada marcado.",nl:"Op deze dag staat nog niets.",sv:"Inget är markerat den här dagen.",da:"Der er ikke markeret noget denne dag.",no:"Ingenting er merket denne dagen.",fi:"Tälle päivälle ei ole merkintöjä."},
    addMark: {en:"Add a mark",de:"Eintrag hinzufügen",fr:"Ajouter une marque",it:"Aggiungi un segno",es:"Agregar una marca",pt:"Adicionar uma marca",nl:"Een merkteken zetten",sv:"Lägg till ett märke",da:"Tilføj et mærke",no:"Legg til et merke",fi:"Lisää merkintä"},
    markName: {en:"Name it (optional)",de:"Name (optional)",fr:"Lui donner un nom (facultatif)",it:"Dagli un nome (facoltativo)",es:"Ponle un nombre (opcional)",pt:"Dê um nome (opcional)",nl:"Naam (optioneel)",sv:"Ge det ett namn (valfritt)",da:"Giv det et navn (valgfrit)",no:"Gi det et navn (valgfritt)",fi:"Anna nimi (valinnainen)"},
    runsFor: {en:"Runs for",de:"Dauert",fr:"Dure",it:"Dura",es:"Dura",pt:"Dura",nl:"Duurt",sv:"Varar",da:"Varer",no:"Varer",fi:"Kestää"},
    daysUnit: {en:"days",de:"Tage",fr:"jours",it:"giorni",es:"días",pt:"dias",nl:"dagen",sv:"dagar",da:"dage",no:"dager",fi:"päivää"},
    repeatYear: {en:"Every year",de:"Jedes Jahr",fr:"Chaque année",it:"Ogni anno",es:"Cada año",pt:"Todo ano",nl:"Elk jaar",sv:"Varje år",da:"Hvert år",no:"Hvert år",fi:"Joka vuosi"},
    removeMark: {en:"Remove",de:"Entfernen",fr:"Retirer",it:"Rimuovi",es:"Quitar",pt:"Remover",nl:"Weghalen",sv:"Ta bort",da:"Fjern",no:"Fjern",fi:"Poista"},
    removeAsk: {en:"Remove “{t}”?",de:"„{t}“ entfernen?",fr:"Retirer « {t} » ?",it:"Rimuovere “{t}”?",es:"¿Quitar “{t}”?",pt:"Remover “{t}”?",nl:"‘{t}’ weghalen?",sv:"Ta bort ”{t}”?",da:"Fjern ”{t}”?",no:"Fjerne ”{t}”?",fi:"Poistetaanko ”{t}”?"},
    undoRemove: {en:"Put it back",de:"Zurückholen",fr:"Remettre",it:"Rimettilo",es:"Regresarla",pt:"Colocar de volta",nl:"Terugzetten",sv:"Lägg tillbaka det",da:"Læg det tilbage",no:"Legg det tilbake",fi:"Palauta"},
    cdSleeps: {en:"{n} sleeps",de:"noch {n}-mal schlafen",fr:"encore {n} nuits",it:"mancano {n} notti",es:"faltan {n} noches",pt:"faltam {n} noites",nl:"nog {n} keer slapen",sv:"{n} nätter",da:"{n} gange at sove",no:"{n} netter",fi:"{n} yötä"},
    cdSchool: {en:"{n} school days",de:"davon {n} in der Schule",fr:"{n} jours d’école",it:"{n} giorni di scuola",es:"{n} días de escuela",pt:"{n} dias de aula",nl:"daarvan {n} op school",sv:"{n} skoldagar",da:"{n} skoledage",no:"{n} skoledager",fi:"{n} koulupäivää"},
    cdSleepsOne: {en:"{n} sleep",de:"noch {n}-mal schlafen",fr:"encore {n} nuit",it:"manca {n} notte",es:"falta {n} noche",pt:"falta {n} noite",nl:"nog {n} keer slapen",sv:"{n} natt",da:"{n} gang at sove",no:"{n} natt",fi:"{n} yö"},
    cdSchoolOne: {en:"{n} school day",de:"davon {n} in der Schule",fr:"{n} jour d’école",it:"{n} giorno di scuola",es:"{n} día de escuela",pt:"{n} dia de aula",nl:"daarvan {n} op school",sv:"{n} skoldag",da:"{n} skoledag",no:"{n} skoledag",fi:"{n} koulupäivä"},
    cdToday: {en:"It is today!",de:"Heute ist es so weit!",fr:"C’est aujourd’hui !",it:"È oggi!",es:"¡Es hoy!",pt:"É hoje!",nl:"Het is vandaag!",sv:"Det är i dag!",da:"Det er i dag!",no:"Det er i dag!",fi:"Se on tänään!"},
    cdSetTarget: {en:"Count down to this",de:"Bis zu diesem Tag zählen",fr:"Lancer le décompte",it:"Avvia il conto alla rovescia",es:"Iniciar la cuenta regresiva",pt:"Iniciar a contagem regressiva",nl:"Naar deze dag aftellen",sv:"Räkna ner till den här dagen",da:"Tæl ned til denne dag",no:"Tell ned til denne dagen",fi:"Laske päivät tähän päivään"},
    cdClearTarget: {en:"Stop counting down",de:"Nicht mehr zu diesem Tag zählen",fr:"Arrêter le décompte",it:"Ferma il conto alla rovescia",es:"Detener la cuenta regresiva",pt:"Parar a contagem regressiva",nl:"Niet meer naar deze dag aftellen",sv:"Sluta räkna ner",da:"Stop med at tælle ned",no:"Slutt å telle ned",fi:"Lopeta laskeminen"},
    cdCountTogether: {en:"Count them together",de:"Die Tage zusammen zählen",fr:"Comptons ensemble",it:"Contiamoli insieme",es:"Contemos juntos",pt:"Vamos contar juntos",nl:"Tel de dagen af",sv:"Räkna dagarna tillsammans",da:"Lad os tælle dagene",no:"La oss telle dagene",fi:"Lasketaan päivät yhdessä"},
    cellAria: {en:"{d}. {state}",de:"{d}. {state}",fr:"{d}. {state}",it:"{d}. {state}",es:"{d}. {state}",pt:"{d}. {state}",nl:"{d}. {state}",sv:"{d}. {state}",da:"{d}. {state}",no:"{d}. {state}",fi:"{d}. {state}"},
    stateSchoolDay: {en:"School day {n}",de:"Schultag {n}",fr:"Jour d’école {n}",it:"Giorno di scuola {n}",es:"Día de escuela {n}",pt:"Dia de aula {n}",nl:"Schooldag {n}",sv:"Skoldag {n}",da:"Skoledag {n}",no:"Skoledag {n}",fi:"Koulupäivä {n}"},
    stateToday: {en:"Today",de:"Heute",fr:"Aujourd’hui",it:"Oggi",es:"Hoy",pt:"Hoje",nl:"Vandaag",sv:"I dag",da:"I dag",no:"I dag",fi:"Tänään"},
    stateNoSchool: {en:"No school",de:"Schulfrei",fr:"Pas d’école",it:"Niente scuola",es:"Sin clases",pt:"Sem aula",nl:"Geen school",sv:"Ingen skola",da:"Ingen skole",no:"Ingen skole",fi:"Ei koulua"},
    stateAhead: {en:"Still to come",de:"Kommt noch",fr:"À venir",it:"Deve ancora arrivare",es:"Todavía no llega",pt:"Ainda vai chegar",nl:"Moet nog komen",sv:"Kommer senare",da:"Kommer senere",no:"Kommer senere",fi:"Vielä edessä"},
    patternNext: {en:"Which card comes tomorrow?",de:"Welche Karte kommt morgen?",fr:"Quelle étiquette vient demain ?",it:"Quale cartellino viene domani?",es:"¿Qué sigue mañana?",pt:"O que vem amanhã?",nl:"Welke kaart komt morgen?",sv:"Vilket kort kommer i morgon?",da:"Hvilket kort kommer i morgen?",no:"Hvilket kort kommer i morgen?",fi:"Mikä kortti tulee huomenna?"},
    setMeets: {en:"Our school days",de:"Wir haben Schule an",fr:"Nos jours d’école",it:"I nostri giorni di scuola",es:"Nuestros días de escuela",pt:"Nossos dias de aula",nl:"We hebben school op",sv:"Skoldagar i veckan",da:"Skoledage i ugen",no:"Skoledager i uka",fi:"Koulupäivät viikossa"},
    printMonth: {en:"Print this month",de:"Diesen Monat drucken",fr:"Imprimer ce mois",it:"Stampa questo mese",es:"Imprimir este mes",pt:"Imprimir este mês",nl:"Deze maand afdrukken",sv:"Skriv ut den här månaden",da:"Udskriv denne måned",no:"Skriv ut denne måneden",fi:"Tulosta tämä kuukausi"},
    printGate: {en:"The printable month is part of a subscription.",de:"Der druckbare Monat gehört zum Lehrer-Paket.",fr:"Le mois à imprimer fait partie de l’abonnement.",it:"Il mese da stampare fa parte dell’abbonamento.",es:"El mes para imprimir es parte de la suscripción.",pt:"O mês para imprimir faz parte da assinatura.",nl:"De afdrukbare maand hoort bij het Leerkracht-pakket.",sv:"Den utskrivbara månaden ingår i prenumerationen.",da:"Den udskrivbare måned er en del af abonnementet.",no:"Den utskrivbare måneden er en del av abonnementet.",fi:"Tulostettava kuukausi kuuluu tilaukseen."},
    eventsGate: {en:"A mark lasts one day on the free plan. Subscribers can stretch it across several days and bring it back every year.",de:"Mehrtägige Einträge und die jährliche Wiederholung gehören zum Lehrer-Paket. Einzelne Tage eintragen bleibt kostenlos.",fr:"Une marque dure un jour. Avec l’abonnement, elle peut s’étendre sur plusieurs jours et revenir chaque année.",it:"Un segno dura un giorno. Con l’abbonamento può coprire più giorni e tornare ogni anno.",es:"Una marca dura un día. Con la suscripción puede abarcar varios días y repetirse cada año.",pt:"Uma marca dura um dia. Com a assinatura, ela pode ocupar vários dias e voltar todo ano.",nl:"Merktekens over meer dagen en de jaarlijkse herhaling horen bij het Leerkracht-pakket. Losse dagen invullen blijft gratis.",sv:"Gratis gäller märket en dag. Prenumeranter kan låta ett märke sträcka sig över flera dagar och återkomma varje år.",da:"Gratis gælder mærket én dag. Abonnenter kan lade et mærke strække sig over flere dage og gå igen hvert år.",no:"Gratis gjelder merket én dag. Abonnenter kan la et merke strekke seg over flere dager og komme igjen hvert år.",fi:"Ilmaisversiossa merkintä koskee yhtä päivää. Tilaajat voivat venyttää merkinnän usealle päivälle ja toistaa sen joka vuosi."},
    daysUnitOne: {en:"day",de:"Tag",fr:"jour",it:"giorno",es:"día",pt:"dia",nl:"dag",sv:"dag",da:"dag",no:"dag",fi:"päivän"}
  },

    /* ⚠ weekendsChart IS GONE, and its absence is the point. It sat in
       defaults and in the settings schema and was NEVER READ anywhere in
       1736 lines — a live toggle in the shipped drawer that did nothing,
       forever. The shared liveness gate scored it green because a drawer
       switch flips aria-checked ON ITSELF, which is exactly how a
       consequence-free control survives. */
    defaults: {
      weatherSet: '6', counterViews: 'all', speakDate: true, weekStart: 'auto'
    },

    settings: [
      { key: 'weatherSet', type: 'choice', labelKey: 'setWeather', options: [
        { value: '6', labelKey: 'setWeather6' }, { value: '4', labelKey: 'setWeather4' } ] },
      { key: 'counterViews', type: 'choice', labelKey: 'setCounter', options: [
        { value: 'all', labelKey: 'setCounterAll' },
        { value: 'two', labelKey: 'setCounterTwo' },
        { value: 'num', labelKey: 'setCounterNum' } ] },
      { key: 'speakDate', type: 'toggle', labelKey: 'setSpeak' },
      { key: 'weekStart', type: 'choice', labelKey: 'setWeek', options: [
        { value: 'auto', labelKey: 'setWeekAuto' },
        { value: 'mon', labelKey: 'setWeekMon' },
        { value: 'sun', labelKey: 'setWeekSun' } ] }
    ],

    /* v2: the store shape changed (days{} replaced countLog[]), so the
       key changes too rather than silently mis-reading a v1 blob. */
    STORE_KEY: 'lcs:calendar-wall:v2',
    LEGACY_KEY: 'lcs:calendar-wall:v1',
    premium: false,
    premiumKnown: false,
    ENT_TRUST_DAYS: 14,
    TEACHER_MS: 90000,
    UNDO_MS: 20000,
    TRASH_MAX: 5,
    WIDGETS: ['calendar', 'counter', 'weather'],

    /* ================= lifecycle ================= */

    init: function (api) {
      this.api = api;
      this._widx = 0;
      this._trash = [];
      this._teacherUntil = 0;
      this._sheetKey = null;
      this._pendingRemove = null;
      this._stepperOpen = false;
      this._pickerOpen = false;
      this._backfill = null;
      this._counting = null;

      this._store = this._loadStore();
      if (!this._store || !this._store.v) this._store = { v: 2, activeWallId: null, ent: null, walls: {} };
      if (!this._store.walls || !Object.keys(this._store.walls).length) this._migrateOrSeed();

      var saved = this._store.settings || {};
      for (var k in saved) {
        if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
      }

      this._todayKey = MODEL.keyFromDate(new Date());
      this._viewMonth = MODEL.monthOf(this._todayKey);

      var params = new URLSearchParams(location.search);
      var cls = params.get('class');
      if (cls && this._store.walls[cls]) this._store.activeWallId = cls;
      var w = params.get('widget');
      var idx = this.WIDGETS.indexOf(w);
      if (idx >= 0) this._widx = idx;

      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this._fetchEntitlement();
      this._bindDayRoll();
    },

    _migrateOrSeed: function () {
      var id = 'w_' + Math.floor(Math.random() * 1e9).toString(36);
      this._store.walls = {};
      /* the name stays null until renamed: a STORED default would freeze
         in whatever locale created it (Meine Klasse on a Finnish page) */
      var fresh = MODEL.newWall(null);
      fresh.createdAt = MODEL.keyFromDate(new Date());

      /* ⚠ MIGRATE THE v1 COUNT RATHER THAN DROPPING IT. A teacher on day
         61 must not open the rebuild and find a zero. v1 knew the total
         and the date it was last touched but not WHICH days were school
         days, so the honest migration writes the total onto that last
         date and leaves the earlier days unmarked: the number she trusts
         survives, and the record starts accumulating from today. */
      try {
        var raw = localStorage.getItem(this.LEGACY_KEY);
        var v1 = raw ? JSON.parse(raw) : null;
        if (v1 && v1.walls) {
          var keys = Object.keys(v1.walls);
          if (keys.length) {
            var old = v1.walls[keys[0]];
            if (old) {
              if (typeof old.name === 'string' && old.name) fresh.name = old.name;
              if (old.pattern) fresh.pattern = old.pattern;
              if (old.weather) fresh.weather = old.weather;
              if (old.dayCount > 0 && MODEL.isKey(old.lastCountDate)) {
                fresh.days[old.lastCountDate] = { n: Math.floor(old.dayCount) };
              }
              if (old.lastSummary) fresh.lastSummary = old.lastSummary;
            }
          }
        }
      } catch (e) { /* a broken v1 blob must not stop the tool opening */ }

      this._store.walls[id] = fresh;
      this._store.activeWallId = id;
    },

    _loadStore: function () {
      try {
        var raw = localStorage.getItem(this.STORE_KEY);
        var j = raw ? JSON.parse(raw) : null;
        if (j && j.walls) { for (var k in j.walls) j.walls[k] = MODEL.wall(j.walls[k]); }
        return (j && typeof j === 'object') ? j : null;
      } catch (e) { return null; }
    },

    _saveStore: function () {
      var s = this._store;
      s.settings = {};
      for (var i = 0; i < this.settings.length; i++) {
        s.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
      }
      try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (e) { /* private mode */ }
    },

    wall: function () { return this._store.walls[this._store.activeWallId]; },

    /* ⚠ UNKNOWN ENTITLEMENT IS PESSIMISTIC. An unknown tier is a free
       tier until proven otherwise. The 14-day cached trust applies ONLY
       to a NETWORK failure — an authoritative "free" demotes at once. */
    _fetchEntitlement: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      var cached = this._store.ent;
      var trustCache = function () {
        if (cached && cached.tier === 'full' && MODEL.isKey(cached.checkedAt)) {
          var age = MODEL.sleepsBetween(cached.checkedAt, MODEL.keyFromDate(new Date()));
          if (age !== null && age <= self.ENT_TRUST_DAYS) { self.premium = true; self.premiumKnown = true; self._paint(); }
        }
      };
      var token = null;
      try { token = localStorage.getItem('accessToken'); } catch (e) {}
      if (!token) { this.premiumKnown = true; return; }
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j) { trustCache(); return; }
          var tier = j.user && j.user.subscriptionTier;
          var sub = j.subscription;
          var prem = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self.premium = prem;
          self.premiumKnown = true;
          self._store.ent = { tier: prem ? 'full' : 'free', checkedAt: MODEL.keyFromDate(new Date()) };
          self._saveStore();
          self._paint();
        })
        .catch(function () { trustCache(); });
    },

    _bindDayRoll: function () {
      var self = this;
      var check = function () {
        var now = MODEL.keyFromDate(new Date());
        if (now !== self._todayKey) {
          self._todayKey = now;
          self._viewMonth = MODEL.monthOf(now);
          self._paint();
        }
      };
      document.addEventListener('visibilitychange', check);
      window.addEventListener('focus', check);
      setInterval(check, 60000);
      window.addEventListener('resize', function () { self._fitBoard(); });
      /* ⚠ RE-FIT WHEN THE WEB FONTS LAND. Measured: the first fit is
         computed against a fallback-font layout and the real faces push
         the date line — and everything under it — about 7px down, which
         put the dock back under the fold at 1024x768. */
      try {
        if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
          document.fonts.ready.then(function () { self._fitBoard(); });
        }
      } catch (e) { /* the resize hook still covers the common case */ }
    },

    /* ================= helpers ================= */

    fmt: function (key, args) {
      var s = this.api.t(key);
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (args && k in args) ? String(args[k]) : m;
      });
    },
    L: function () { return DATE_L10N[this.api.lang] || DATE_L10N.en; },
    _reduced: function () {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    _weekStart: function () {
      var s = this.api.settings.weekStart;
      if (s === 'mon' || s === 'sun') return s;
      try {
        var lo = new Intl.Locale(this.L().intl);
        var wi = lo.getWeekInfo ? lo.getWeekInfo() : lo.weekInfo;
        if (wi && wi.firstDay) return wi.firstDay === 7 ? 'sun' : 'mon';
      } catch (e) {}
      return this.L().weekStart;
    },
    _weekdayName: function (d, style) {
      return new Intl.DateTimeFormat(this.L().intl, { weekday: style || 'long' }).format(d);
    },
    _monthWord: function (d) {
      var parts = new Intl.DateTimeFormat(this.L().intl, { day: 'numeric', month: 'long' }).formatToParts(d);
      for (var i = 0; i < parts.length; i++) if (parts[i].type === 'month') return parts[i].value;
      return '';
    },
    _monthTitle: function (ym) {
      var d = new Date(+ym.slice(0, 4), +ym.slice(5, 7) - 1, 1);
      var s = new Intl.DateTimeFormat(this.L().intl, { month: 'long', year: 'numeric' }).format(d);
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    _dateSentence: function (d, standalone) {
      var L = this.L();
      var s = L.template
        .replace('{weekday}', this._weekdayName(d, 'long'))
        .replace('{dateword}', L.dateWords[d.getDate() - 1] || String(d.getDate()))
        .replace('{month}', this._monthWord(d));
      if (standalone) s = s.charAt(0).toUpperCase() + s.slice(1);
      return s;
    },

    /* ⚠ THE ANNOUNCEMENT IS NOT GATED BY THE SPEECH SETTING, and the old
       build got this exactly backwards: api.announce sat INSIDE the
       early return, so switching off the loudspeaker also silenced the
       screen reader. They are different users with different needs. */
    _sayDate: function (dt) {
      var text = this._dateSentence(dt || new Date(), true);
      this.api.announce(text);
      if (this.api.settings.speakDate && typeof LCSAudio !== 'undefined') {
        LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.9 });
      }
      return text;
    },

    /* the teacher window: a WINDOW, not a mode — there is nothing to
       leave switched on, and it closes itself */
    teacherOpen: function () { return Date.now() < this._teacherUntil; },
    _armTeacher: function (on) {
      this._teacherUntil = on ? (Date.now() + this.TEACHER_MS) : 0;
      var self = this;
      if (this._teacherTimer) clearTimeout(this._teacherTimer);
      if (on) this._teacherTimer = setTimeout(function () { self._paint(); }, this.TEACHER_MS + 40);
      this._paint();
    },

    weatherSet: function () {
      if (this.api.settings.weatherSet !== '4') return WEATHER;
      var four = WEATHER_FOUR[this.api.lang];
      if (!four) return WEATHER.slice(0, 4);
      var out = [], i, j;
      for (i = 0; i < four.length; i++) {
        for (j = 0; j < WEATHER.length; j++) if (WEATHER[j].id === four[i]) out.push(WEATHER[j]);
      }
      return out;
    },
    weatherById: function (id) {
      for (var i = 0; i < WEATHER.length; i++) if (WEATHER[i].id === id) return WEATHER[i];
      return null;
    },

    /* =================================================================
       BUILD / PAINT.
       _build() creates the skeleton ONCE; _paint() recomputes everything
       from state. The old build called render() from fifteen places and
       each one did stage.innerHTML = '' — which replayed every animation
       and DESTROYED FOCUS unconditionally, so opening the teacher stepper
       re-popped 37 ten-frame dots and the stepper itself was unusable by
       keyboard (its own change handler destroyed the input mid-edit).

       ⭐ THE RAIL WAS MEASURED AND DECLINED, and the reason is recorded
       so it is not re-litigated as an oversight. The design panel wanted
       calendar-as-permanent-stage with the counter and weather as side
       readouts; its decisive argument was that the countdown is
       cross-widget and would otherwise be absent two days in three.
       THAT ARGUMENT IS ANSWERED BY PUTTING THE COUNTDOWN IN THE HEADER
       ROW, which is persistent across all three widgets already — so the
       morning's three numbers are always on the board without a second
       layout to maintain, and the pedagogy panel's "ritual stability"
       and the art panel's "structure right" both survive. The pager was
       the container, not the pedagogy; the header row is the container
       now.
       ================================================================= */

    render: function () {
      /* ⚠ THE SHELL CALLS render() WITH NO ARGUMENTS and re-calls it on
         every settings commit and on resize. Taking an api parameter
         here would wipe this.api on the second call. */
      if (!this.api) return;
      if (!this._wrap || !this._wrap.parentNode) this._build();
      this._paint();
    },

    reset: function () {
      /* the shell always draws a Reset button; a tool without reset()
         leaves it dead on every path. Reset is a VIEW reset — it must
         never touch a teacher's record. */
      this._widx = 0;
      this._viewMonth = MODEL.monthOf(this._todayKey);
      this._stepperOpen = false;
      this._pickerOpen = false;
      this._backfill = null;
      this._counting = null;
      this._armTeacher(false);
      this._closeSheet();
      this._closePanel();
      this._paint();
    },

    onSettings: function () { this._saveStore(); },

    _build: function () {
      var api = this.api, self = this;
      api.stage.innerHTML = '';
      document.body.classList.add('cwl-page');

      var wrap = api.el('div', 'cwl-wrap');
      this._wrap = wrap;

      /* --- row 1: the wall chip + the teacher key --- */
      var head = api.el('div', 'cwl-headrow');
      this._wallChip = api.el('button', 'cwl-chipbtn cwl-wallchip');
      this._wallChip.type = 'button';
      this._wallChip.setAttribute('data-fk', 'wallchip');
      this._wallChip.addEventListener('click', function () { self._openPanel(); });
      this._keyChip = api.el('button', 'cwl-chipbtn cwl-keychip');
      this._keyChip.type = 'button';
      this._keyChip.setAttribute('data-fk', 'keychip');
      this._keyChip.addEventListener('click', function () { self._armTeacher(!self.teacherOpen()); });
      /* ⚠ THE PRINT CHIP CARRIES THE CLASS THE SHARED GATE LOOKS FOR.
         audit-tool-print-sheets asserts that .cwl-chip and the dock are
         GONE on paper; a chip under some other name would leave the gate
         asserting nothing about it. */
      this._printChip = api.el('button', 'cwl-chip cwl-printchip');
      this._printChip.type = 'button';
      this._printChip.setAttribute('data-fk', 'print');
      this._printChip.addEventListener('click', function () { self._printMonth(); });
      head.append(this._wallChip, this._keyChip, this._printChip);
      wrap.appendChild(head);

      /* --- row 2: the date line --- */
      this._dateLine = api.el('button', 'cwl-dateline');
      this._dateLine.type = 'button';
      this._dateLine.setAttribute('data-fk', 'dateline');
      this._dateLine.addEventListener('click', function () { self._sayDate(); });
      wrap.appendChild(this._dateLine);

      /* --- row 3: the persistent readouts (countdown + day count + weather) --- */
      this._readouts = api.el('div', 'cwl-readouts');
      wrap.appendChild(this._readouts);

      /* --- row 4: the widget (the 1fr row) --- */
      this._widget = api.el('div', 'cwl-widget');
      wrap.appendChild(this._widget);

      /* --- row 5: the dock --- */
      this._dock = api.el('div', 'cwl-dock');
      wrap.appendChild(this._dock);

      api.stage.appendChild(wrap);

      /* the print sheet is a SIBLING of the wrap, never a child: print
         hides the wrap, so a nested sheet would inherit display:none */
      this._sheetDoc = api.el('div', 'cwl-sheet');
      this._sheetDoc.setAttribute('aria-hidden', 'true');
      api.stage.appendChild(this._sheetDoc);

      if (!this._keysBound) {
        this._keysBound = true;
        document.addEventListener('keydown', function (e) { self._onKey(e); });
      }
    },

    /* ⚠ SCOPED. The old handler was bound to document and excluded only
       INPUT/TEXTAREA, so arrow-keying the SETTINGS DRAWER silently
       flipped the widget behind the scrim. It also stole Left/Right from
       every radiogroup and had no modifier check, so Alt+Left (Back) moved
       the calendar instead of the page. */
    _onKey: function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var t = e.target;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (t && t.closest && (t.closest('.lcs-drawer') || t.closest('.cwl-sheetdlg') || t.closest('.cwl-panel'))) {
        if (e.key === 'Escape' && t.closest('.cwl-sheetdlg')) { this._sheetEscape(e); }
        return;
      }
      if (document.querySelector('.lcs-drawer.open')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); this._goWidget(this._widx - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); this._goWidget(this._widx + 1); }
      else if (e.key === 'Escape') { this._closeSheet(); this._closePanel(); }
    },

    _goWidget: function (i) {
      var n = this.WIDGETS.length;
      this._widx = ((i % n) + n) % n;
      this._stepperOpen = false;
      this._pickerOpen = false;
      this._paint();
      this.api.announce(this.api.t(['dockCalendar', 'dockCounter', 'dockWeather'][this._widx]));
      this.api.track('widget', { id: this.WIDGETS[this._widx] });
    },

    /* focus survives a repaint: every control carries data-fk, and the
       node holding focus is re-found by that key afterwards */
    _focusSnap: function () {
      var a = document.activeElement;
      return (a && a.getAttribute) ? a.getAttribute('data-fk') : null;
    },
    _focusRestore: function (fk) {
      if (!fk || !this._wrap) return;
      var el = this._wrap.querySelector('[data-fk="' + fk + '"]');
      if (el && el.focus) el.focus();
    },

    _paint: function () {
      if (!this._wrap) return;
      var api = this.api, self = this;
      var fk = this._focusSnap();
      var wall = this.wall();
      var teacher = this.teacherOpen();

      this._wrap.className = 'cwl-wrap' + (this.premium ? ' cwl-paid' : '') + (teacher ? ' cwl-teacher' : '');
      document.body.classList.toggle('cwl-paid', !!this.premium);

      /* chips */
      this._wallChip.textContent = wall.name || api.t('wallDefault');
      this._wallChip.setAttribute('aria-label', api.t('wallsTitle'));
      this._keyChip.innerHTML = '<span class="cwl-keyglyph" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14 2a6 6 0 1 0-5.7 8L9 11H7v2H5v2H2v4h6v-3h2v-2h2l1-1.3A6 6 0 0 0 14 2Zm2.6 4.4a1.6 1.6 0 1 1-2.2 2.2 1.6 1.6 0 0 1 2.2-2.2Z"/></svg>' +
        '</span><span class="cwl-keytext">' + api.t(teacher ? 'teacherOn' : 'teacherKey') + '</span>';
      this._keyChip.setAttribute('aria-pressed', String(teacher));
      this._keyChip.classList.toggle('on', teacher);

      this._printChip.innerHTML = '<span class="cwl-keyglyph" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 3h10v4H7Zm-3 6h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2v-4H6v4H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Zm4 6h8v6H8Z"/></svg>' +
        '</span><span class="cwl-keytext">' + this._esc(api.t('printMonth')) + '</span>';
      this._printChip.setAttribute('aria-label', api.t('printMonth'));
      if (this.premium) this._buildPrintSheet(); else this._sheetDoc.innerHTML = '';

      /* the date line */
      this._dateLine.innerHTML = this._datelineHTML();
      this._dateLine.setAttribute('aria-label', api.t('speakDateAria'));

      this._paintReadouts();

      /* the widget */
      this._widget.innerHTML = '';
      this._widget.setAttribute('data-widget', this.WIDGETS[this._widx]);
      if (this._widx === 0) this._paintCalendar(this._widget);
      else if (this._widx === 1) this._paintCounter(this._widget);
      else this._paintWeather(this._widget);

      this._paintDock();
      if (this._sheetKey) this._paintSheet();
      if (this._panelEl && this._panelEl.classList.contains('open')) this._paintPanel();
      this._saveStore();
      this._focusRestore(fk);
      this._fitBoard();
    },

    /* ⚠ STANDALONE ONLY. In an iframe this returns immediately and the
       board is content-driven; capping it there would read a height that
       is itself derived from the content and feed it back. */
    _fitBoard: function () {
      var board = this._wrap &&
        (this._wrap.querySelector('.cwl-grid') || this._wrap.querySelector('.cwl-chart'));
      if (board) board.style.maxHeight = '';
      if (!board || this.api.embed) return;

      /* first estimate: everything from the board's top to the bottom of
         the dock has to fit in what is left of the viewport */
      var top = board.getBoundingClientRect().top;
      var dockBottom = this._dock.getBoundingClientRect().bottom;
      var boardH = board.getBoundingClientRect().height;
      var below = dockBottom - (top + boardH);
      var cap = Math.max(160, Math.round(window.innerHeight - top - below));
      board.style.maxHeight = cap + 'px';

      /* ⭐ THEN READ THE RESULT AND CORRECT IT. The gaps, the padding and
         a month title that wrapped are all things the browser already
         knows and I would otherwise be guessing at. Shrink-only, one
         correction, so it cannot oscillate. */
      var over = this._dock.getBoundingClientRect().bottom - window.innerHeight;
      if (over > 0) { cap = Math.max(160, cap - Math.ceil(over) - 2); board.style.maxHeight = cap + 'px'; }

      /* ⚠ TIGHT MODE IS DECIDED BY THE MEASURED BUDGET, NOT BY A MEDIA
         QUERY. The previous build had a projector block that trimmed
         exactly these things — and keyed it (max-height:960) and
         (min-width:768), so it could never fire in the 704px iframe the
         tool actually ships in. A budget the layout can see is the only
         thing that is true in both regimes. */
      var rows = 6, gridEl = this._wrap.querySelector('.cwl-grid');
      if (gridEl) rows = parseInt(gridEl.style.getPropertyValue('--rows'), 10) || 6;
      var tight = (cap / rows) < 62;
      if (tight !== this._wrap.classList.contains('cwl-tight')) {
        this._wrap.classList.toggle('cwl-tight', tight);
        /* the trim changed the chrome above the board, so the budget it
           was computed from is stale — take it again, once */
        board.style.maxHeight = '';
        var t2 = board.getBoundingClientRect().top;
        var b2 = this._dock.getBoundingClientRect().bottom - (t2 + board.getBoundingClientRect().height);
        cap = Math.max(160, Math.round(window.innerHeight - t2 - b2));
        board.style.maxHeight = cap + 'px';
        var o2 = this._dock.getBoundingClientRect().bottom - window.innerHeight;
        if (o2 > 0) { cap = Math.max(160, cap - Math.ceil(o2) - 2); board.style.maxHeight = cap + 'px'; }
      }

      /* ⭐ AND THE WIDTH FOLLOWS THE HEIGHT, or the cell stops being a
         square and becomes a ledger row. 1.55 is the widest a calendar
         cell can get before it reads as a spreadsheet — measured against
         the previous build's own stated objection at 2.3, which it made
         about a cell far squarer than the 2.7 this produced unclamped. */
      if (gridEl) {
        var mat = gridEl.closest ? gridEl.closest('.cwl-mat') : null;
        /* ⚠ THE FLOOR IS A FINGER, NOT A PREFERENCE. Below MIN_ROW the
           board stops shrinking and the mat scrolls instead, because a
           cell too small to hit is worse than a board you have to move. */
        var MIN_ROW = 38;
        if (mat) { mat.style.overflowY = ''; mat.style.maxHeight = ''; }
        if (cap / rows < MIN_ROW) {
          var needed = Math.round(rows * MIN_ROW + (rows - 1) * 4);
          gridEl.style.maxHeight = '';
          gridEl.style.height = needed + 'px';
          if (mat) {
            mat.style.maxHeight = cap + 'px';
            mat.style.overflowY = 'auto';
          }
        } else {
          gridEl.style.height = '';
        }
        var maxW = Math.round(7 * 1.55 * Math.max(cap, rows * MIN_ROW) / rows);
        gridEl.style.maxWidth = maxW + 'px';
        if (mat) mat.style.maxWidth = (maxW + 32) + 'px';

        /* ⭐ AND MEASURE AFTER THE LAST THING YOU DID. The scroller and
           the width cap both change the height of what sits above the
           dock, so the correction computed before them is stale by
           exactly their effect — at 320x640 that was 58px of dock
           hanging under a fold that cannot scroll. Shrink-only, bounded,
           and it clamps the SCROLLER's own box, which is the one thing
           that can still be too tall once the grid has stopped
           shrinking. */
        var host = mat || gridEl;
        for (var pass = 0; pass < 3; pass++) {
          var spill = this._dock.getBoundingClientRect().bottom - window.innerHeight;
          if (spill <= 0) break;
          var h = host.getBoundingClientRect().height;
          var next = Math.max(120, Math.round(h - spill - 2));
          host.style.maxHeight = next + 'px';
          host.style.overflowY = 'auto';
        }
      }
    },

    _datelineHTML: function () {
      var d = new Date();
      var s = this._dateSentence(d, true);
      /* ⭐ LIGHT WHAT CHANGES DAILY. The old build tinted the weekday and
         the MONTH — but the month does not change for a month, and the
         date WORD, the thing actually being learned, was left in plain
         ink. So: weekday and dateword are hot, the month is not. */
      var wd = this._weekdayName(d, 'long');
      var dw = this.L().dateWords[d.getDate() - 1] || String(d.getDate());
      var esc = function (x) { return String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
      var hot = function (str, word) {
        if (!word) return str;
        return str.replace(new RegExp('(?<!\\p{L})' + esc(word) + '(?!\\p{L})', 'iu'),
          function (m) { return '<span class="cwl-hot">' + m + '</span>'; });
      };
      var html = hot(hot(s, wd), dw);
      return '<span class="cwl-datetext">' + html +
        ' <svg class="cwl-spk" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" ' +
        'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg></span>';
    },

    /* ================= the persistent readouts =================
       The three numbers of the morning, on the board whatever widget is
       showing: how many days until the thing we are waiting for, how
       many days we have been here, and what the sky is doing.
       =========================================================== */
    _paintReadouts: function () {
      var api = this.api, self = this, wall = this.wall();
      this._readouts.innerHTML = '';

      var cd = MODEL.countdown(wall, this._todayKey);
      if (cd) {
        var chip = api.el('button', 'cwl-cd' + (cd.today ? ' now' : ''));
        chip.type = 'button';
        chip.setAttribute('data-fk', 'countdown');
        var glyph = '<span class="cwl-cdicon" aria-hidden="true">' + (EV_ICON[cd.kind] || EV_ICON.star) + '</span>';
        if (cd.today) {
          chip.innerHTML = glyph + '<span class="cwl-cdnow">' + api.t('cdToday') + '</span>' +
            (cd.title ? '<span class="cwl-cdname">' + this._esc(cd.title) + '</span>' : '');
        } else {
          /* TWO NUMBERS, sleeps first — it answers the question the child
             actually asked — and school days second. THE GAP BETWEEN THEM
             IS THE LESSON, so both are always shown, never one. */
          /* ⚠ n=1 IS NOT AN EDGE CASE HERE — a countdown passes through it
             on the day before every single event. "1 school days" shipped
             past every assertion in the DoD because they all asked
             whether the string RENDERED, and none asked whether it was a
             sentence. */
          chip.innerHTML = glyph +
            '<span class="cwl-cdbig">' + this.fmt(cd.sleeps === 1 ? 'cdSleepsOne' : 'cdSleeps', { n: cd.sleeps }) + '</span>' +
            '<span class="cwl-cdsmall">' + this.fmt(cd.schoolDays === 1 ? 'cdSchoolOne' : 'cdSchool', { n: cd.schoolDays }) + '</span>' +
            (cd.title ? '<span class="cwl-cdname">' + this._esc(cd.title) + '</span>' : '');
        }
        chip.addEventListener('click', function () {
          self._viewMonth = MODEL.monthOf(cd.key);
          self._widx = 0;
          api.announce(chip.textContent);
          self._paint();
        });
        this._readouts.appendChild(chip);

        /* ⚠ THE COUNT-TOGETHER MOVE HAD NO CONTROL. It fired when the
           chip was tapped inside the teacher window and nothing told
           anyone that, so the richest thing in the feature — walking the
           class along the intervening days, one number at a time — was
           reachable only by accident. Its string was authored in eleven
           locales for a button that was never drawn. */
        if (this.teacherOpen() && cd.sleeps > 0) {
          var ct = api.el('button', 'cwl-counttogether');
          ct.type = 'button';
          ct.setAttribute('data-fk', 'counttogether');
          ct.textContent = api.t('cdCountTogether');
          ct.addEventListener('click', function () {
            self._viewMonth = MODEL.monthOf(cd.key);
            self._widx = 0;
            self._countTogether(cd);
          });
          this._readouts.appendChild(ct);
        }
      }

      var n = MODEL.dayCount(wall);
      var days = api.el('span', 'cwl-ro');
      days.innerHTML = '<b>' + n + '</b> ' + this._esc(api.t(n === 1 ? 'daysLabelOne' : 'daysLabel'));
      this._readouts.appendChild(days);

      var wid = MODEL.weatherOn(wall, this._todayKey);
      if (wid) {
        var w = this.weatherById(wid);
        if (w) {
          var wr = api.el('span', 'cwl-ro cwl-rowx');
          wr.innerHTML = '<span class="cwl-roicon">' + w.svg + '</span>' + this._esc(api.t(w.labelKey));
          this._readouts.appendChild(wr);
        }
      }
    },

    /* "count them together": the intervening cells light 1..N in
       sequence. ⚠ IT NUMBERS CELLS IN PLACE AND NEVER DRAWS AN ARC —
       cold-line's refuse #2. */
    _countTogether: function (cd) {
      var self = this, path = MODEL.countdownPath(this.wall(), this._todayKey);
      this._counting = 0;
      this._paint();
      if (this._reduced()) { this._counting = path.length; this._paint(); return; }
      var step = function () {
        self._counting++;
        self._paint();
        if (self._counting < path.length) setTimeout(step, 260);
        else setTimeout(function () { self._counting = null; self._paint(); }, 2600);
      };
      setTimeout(step, 200);
    },

    _esc: function (s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    _paintDock: function () {
      var api = this.api, self = this;
      this._dock.innerHTML = '';
      var icons = [
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>',
        /* ⭐ the dock icon now matches the widget it opens: the counter is
           BUNDLES, so the chip is a tied bundle, not a tally mark */
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/><path d="M3 12h18"/></svg>',
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="11" r="4.2"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="18" x2="12" y2="20"/><line x1="3" y1="11" x2="5" y2="11"/><line x1="19" y1="11" x2="21" y2="11"/><line x1="5.6" y1="4.6" x2="7" y2="6"/><line x1="17" y1="16" x2="18.4" y2="17.4"/><line x1="5.6" y1="17.4" x2="7" y2="16"/><line x1="17" y1="6" x2="18.4" y2="4.6"/></svg>'
      ];
      var labels = ['dockCalendar', 'dockCounter', 'dockWeather'];
      var mk = function (dir) {
        var b = api.el('button', 'cwl-nav');
        b.type = 'button';
        b.setAttribute('data-fk', 'nav-' + dir);
        b.setAttribute('aria-label', api.t(dir === 'prev' ? 'prevWidget' : 'nextWidget'));
        b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="' +
          (dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '"/></svg>';
        b.addEventListener('click', function () { self._goWidget(self._widx + (dir === 'prev' ? -1 : 1)); });
        return b;
      };
      this._dock.appendChild(mk('prev'));
      for (var i = 0; i < 3; i++) {
        (function (i) {
          var chip = api.el('button', 'cwl-dockchip' + (i === self._widx ? ' active' : ''));
          chip.type = 'button';
          chip.setAttribute('data-fk', 'dock-' + i);
          chip.setAttribute('aria-current', i === self._widx ? 'true' : 'false');
          chip.innerHTML = '<span class="cwl-dockicon">' + icons[i] + '</span><span class="cwl-docklabel">' +
            self._esc(api.t(labels[i])) + '</span>';
          chip.setAttribute('aria-label', api.t(labels[i]));
          chip.addEventListener('click', function () { self._goWidget(i); });
          self._dock.appendChild(chip);
        }(i));
      }
      this._dock.appendChild(mk('next'));
    },

    /* =================================================================
       WIDGET 1 — THE MONTH.
       ⭐⭐ EVERY DAY CARRIES ITS NUMBER. That single line is what this
       rebuild is for. The old build appended the numeral node only when
       the cell was NOT a face-down card, so the whole future half of the
       month was blank and a teacher could not point at the eighteenth to
       mark the trip on it.
       ================================================================= */

    _paintCalendar: function (host) {
      var api = this.api, self = this, wall = this.wall();
      var ym = this._viewMonth;
      var isCurrent = ym === MODEL.monthOf(this._todayKey);

      /* --- month header. FORWARD NAVIGATION NOW EXISTS: the old build
         hard-returned past the current month and disabled the forward
         arrow, so in September you could not open October — you could
         not mark a trip more than a few weeks out, which is most trips. */
      var headRow = api.el('div', 'cwl-monthrow');
      var back = this._monavBtn('prev', -1);
      var title = api.el('h2', 'cwl-monthtitle');
      title.textContent = this._monthTitle(ym);
      var fwd = this._monavBtn('next', 1);
      headRow.append(back, title, fwd);
      if (!isCurrent) {
        var tb = api.el('button', 'cwl-todaybtn');
        tb.type = 'button';
        tb.setAttribute('data-fk', 'today');
        tb.textContent = api.t('todayBtn');
        tb.addEventListener('click', function () {
          self._viewMonth = MODEL.monthOf(self._todayKey);
          self._paint();
        });
        headRow.appendChild(tb);
      }
      host.appendChild(headRow);

      /* --- yesterday / today / tomorrow, current month only --- */
      if (isCurrent) {
        var strips = api.el('div', 'cwl-strips');
        var today = new Date();
        var yd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
        var tm = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var mk = function (key, args, hot) {
          var s = api.el('span', 'cwl-strip' + (hot ? ' hot' : ''));
          s.textContent = self.fmt(key, args);
          return s;
        };
        strips.appendChild(mk('stripYesterday', { w: this._weekdayName(yd) }));
        strips.appendChild(mk('stripToday', { d: this._dateSentence(today) }, true));
        strips.appendChild(mk('stripTomorrow', { w: this._weekdayName(tm) }));
        host.appendChild(strips);
      }

      /* --- the mat --- */
      var mat = api.el('div', 'cwl-mat');
      var startSun = this._weekStart() === 'sun';
      var mx = MODEL.monthMatrix(ym, startSun ? 'sun' : 'mon');

      var wdRow = api.el('div', 'cwl-wdrow');
      /* ⚠ THE WEEKDAY STYLE COMES FROM A CONTAINER QUERY IN CSS, NOT FROM
         window.innerWidth READ AT PAINT TIME. The old build read the
         window once per render, so the labels were whatever width the
         page happened to be when it last painted — wrong after any
         resize that did not repaint, and wrong in the embed, where the
         window is not the box the grid lives in. All three forms are
         emitted and CSS shows one. */
      for (var wdi = 0; wdi < 7; wdi++) {
        var ref = new Date(2026, 5, (startSun ? 7 : 8) + wdi);   /* a known Sun/Mon anchor week */
        var cellH = api.el('span', 'cwl-wd');
        cellH.innerHTML =
          '<abbr class="cwl-wd-l" title="' + this._esc(this._weekdayName(ref, 'long')) + '">' +
            this._esc(this._weekdayName(ref, 'long')) + '</abbr>' +
          '<span class="cwl-wd-s" aria-hidden="true">' + this._esc(this._weekdayName(ref, 'short')) + '</span>' +
          '<span class="cwl-wd-n" aria-hidden="true">' + this._esc(this._weekdayName(ref, 'narrow')) + '</span>';
        wdRow.appendChild(cellH);
      }
      mat.appendChild(wdRow);

      var grid = api.el('div', 'cwl-grid');
      grid.setAttribute('role', 'grid');
      grid.setAttribute('aria-label', this._monthTitle(ym));
      /* --rows drives the aspect ratio, so February and a six-row August
         are each proportioned correctly instead of sharing one constant */
      grid.style.setProperty('--rows', String(mx.rows));

      var path = this._counting === null || this._counting === undefined
        ? [] : MODEL.countdownPath(wall, this._todayKey);
      var pathIdx = {};
      for (var pi = 0; pi < path.length && pi < this._counting; pi++) pathIdx[path[pi].key] = path[pi].n;

      for (var i = 0; i < mx.cells.length; i++) {
        grid.appendChild(this._cellNode(mx.cells[i], wall, pathIdx));
      }
      mat.appendChild(grid);
      host.appendChild(mat);

      /* --- the pattern question. It is a question with a FINDABLE
         answer now: the strip runs over school-day ordinals, the cards
         placed so far are on the board, and the next one is derivable. */
      if (isCurrent && MODEL.dayCount(wall) > 0) {
        /* ⚠ THE ANSWER IS HIDDEN UNTIL SOMEONE ASKS FOR IT. The first
           version drew tomorrow's card beside the question, so the class
           was asked to predict a thing that was already on the board.
           A question posed with its answer next to it is not a question,
           and gate 5 says this tool exists to manufacture a conversation. */
        var q = api.el('button', 'cwl-patq');
        q.type = 'button';
        q.setAttribute('data-fk', 'patq');
        var shown = !!this._patShown;
        q.innerHTML = this._esc(api.t('patternNext')) +
          (shown
            ? ' <span class="cwl-patcard p' + MODEL.nextPatternIndex(wall) + '" aria-hidden="true"></span>'
            : ' <span class="cwl-patcard hidden" aria-hidden="true"></span>');
        q.setAttribute('aria-expanded', String(shown));
        q.addEventListener('click', function () { self._patShown = !self._patShown; self._paint(); });
        host.appendChild(q);
      }
    },

    _monavBtn: function (dir, delta) {
      var api = this.api, self = this;
      var b = api.el('button', 'cwl-monav');
      b.type = 'button';
      b.setAttribute('data-fk', 'mon-' + dir);
      b.setAttribute('aria-label', api.t(dir === 'prev' ? 'prevMonth' : 'nextMonth'));
      b.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="' +
        (dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '"/></svg>';
      b.addEventListener('click', function () {
        self._viewMonth = MODEL.addMonths(self._viewMonth, delta);
        self._paint();
        self.api.announce(self._monthTitle(self._viewMonth));
      });
      return b;
    },

    /* -----------------------------------------------------------------
       ONE CELL.
       Two bands that CANNOT overlap by construction — no z-index games:
       the numeral and the ordinal own the top, the weather stamp and the
       event badges own the bottom. Sizes are container-query units so
       everything scales with the CELL, not with the window.
       ----------------------------------------------------------------- */
    _cellNode: function (info, wall, pathIdx) {
      var api = this.api, self = this;
      if (!info.key) {
        var pad = api.el('span', 'cwl-cell empty');
        pad.setAttribute('role', 'gridcell');
        pad.setAttribute('aria-hidden', 'true');
        return pad;
      }

      var key = info.key;
      var isToday = key === this._todayKey;
      var ord = MODEL.ordinalOn(wall, key);
      var evs = MODEL.eventsOn(wall, key);
      var off = false, runOn = false, runStart = false, runEnd = false;
      var badges = [];
      for (var i = 0; i < evs.length; i++) {
        if (evs[i].k === 'off') off = true;
        if (evs[i].span > 1) { runOn = true; runStart = runStart || evs[i].isStart; runEnd = runEnd || evs[i].isEnd; }
        badges.push(evs[i]);
      }
      var meets = MODEL.meetsDow(wall, MODEL.dowOf(key));
      var isTarget = false;
      for (var b = 0; b < badges.length; b++) if (badges[b].id === wall.target) isTarget = true;

      var cls = 'cwl-cell';
      if (!meets) cls += ' off-day';
      if (off) cls += ' ev-off';
      if (ord) cls += ' counted';
      if (isToday) cls += ' today';
      if (runOn) cls += ' run' + (runStart ? ' run-start' : '') + (runEnd ? ' run-end' : '');
      var pIdx = MODEL.patternIndexOn(wall, key);
      if (pIdx !== null) cls += ' pat p' + pIdx;

      /* EVERY day is a button: the events feature is "mark THAT day", and
         a span cannot be tabbed to. The old grid had exactly one
         focusable cell in the month and zero roles. */
      var cell = api.el('button', cls);
      cell.type = 'button';
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('data-fk', 'cell-' + key);
      cell.setAttribute('data-key', key);
      if (isToday) cell.setAttribute('aria-current', 'date');

      var state = isToday ? this.api.t('stateToday')
        : off ? this.api.t('stateNoSchool')
        : ord ? this.fmt('stateSchoolDay', { n: ord })
        : (key > this._todayKey ? this.api.t('stateAhead') : '');
      var names = [];
      for (var n2 = 0; n2 < badges.length; n2++) {
        names.push(badges[n2].t || this.api.t(this._kindKey(badges[n2].k)));
      }
      cell.setAttribute('aria-label',
        this.fmt('cellAria', { d: this._dateSentence(MODEL.dateFromKey(key)), state: state }) +
        (names.length ? '. ' + names.join(', ') : ''));

      var num = api.el('span', 'cwl-cellnum');
      num.textContent = String(info.day);
      cell.appendChild(num);

      /* ⭐ THE ORDINAL — the moat. "Monday is 61 although Friday was 60
         and four days passed" is a question the grid can now answer by
         itself, and it is what makes the printed month worth keeping. */
      if (ord) {
        var o = api.el('span', 'cwl-ord');
        o.textContent = String(ord);
        o.setAttribute('aria-hidden', 'true');
        cell.appendChild(o);
      }

      var wid = MODEL.weatherOn(wall, key);
      if (wid) {
        var w = this.weatherById(wid);
        if (w) {
          var ws = api.el('span', 'cwl-cellw');
          ws.innerHTML = w.svg;
          ws.setAttribute('aria-hidden', 'true');
          cell.appendChild(ws);
        }
      }

      if (badges.length) {
        var marks = api.el('span', 'cwl-marks');
        marks.setAttribute('aria-hidden', 'true');
        /* AT MOST TWO, AND THE THIRD IS REFUSED BY THE APPARATUS RATHER
           THAN BY A DIALOG: there is no third slot, so the constraint
           needs no words in any locale. */
        marks.setAttribute('data-n', String(Math.min(2, badges.length)));
        for (var m = 0; m < badges.length && m < 2; m++) {
          var mk2 = api.el('span', 'cwl-mark');
          mk2.innerHTML = (isTarget && badges[m].id === wall.target)
            ? EV_ICON.target : (EV_ICON[badges[m].k] || EV_ICON.star);
          marks.appendChild(mk2);
        }
        cell.appendChild(marks);
      }

      if (pathIdx && pathIdx[key]) {
        var cn = api.el('span', 'cwl-pathn');
        cn.textContent = String(pathIdx[key]);
        cn.setAttribute('aria-hidden', 'true');
        cell.appendChild(cn);
      }

      cell.addEventListener('click', function () { self._openSheet(key); });
      return cell;
    },

    _kindKey: function (k) {
      return { off: 'kindOff', trip: 'kindTrip', bday: 'kindBday', star: 'kindStar' }[k] || 'kindStar';
    },

    /* =================================================================
       THE FREE LINE, and it is the one thing in the old build that was
       actively dishonest.

       _effectiveCount() used to return ZERO to a free teacher who had not
       yet tapped, while _advanceDay incremented the STORED value — so she
       opened on day 37, read "0 days in school", tapped once, and the
       numeral jumped 0 to 38 in front of the class. Worse, three
       artefacts disagreed: the code persistently saved the count, the
       copy said "yesterday's count isn't saved", and the local test
       ASSERTED THE ZERO WAS CORRECT.

       A counting instrument may never assert a false quantity. So the
       NUMBER is always true and always free. What a subscription buys is
       the RECORD — the ordinals on earlier months, the marks that stay
       all year, and the printable sheet. Withholding now looks like
       withholding instead of looking like nothing.
       ================================================================= */
    historyVisible: function (key) {
      if (this.premium) return true;
      return MODEL.monthOf(key) === MODEL.monthOf(this._todayKey);
    },

    /* =================================================================
       WIDGET 2 — DAYS IN SCHOOL.
       ================================================================= */
    _paintCounter: function (host) {
      var api = this.api, self = this, wall = this.wall();
      var count = MODEL.dayCount(wall);
      var countedToday = MODEL.countedOn(wall, this._todayKey);
      var canCount = MODEL.isSchoolDay(wall, this._todayKey);
      var views = api.settings.counterViews;

      var box = api.el('div', 'cwl-counter');

      var row = api.el('div', 'cwl-repr-row');
      if (views === 'all') {
        row.appendChild(this._bundlesPanel(count));
        var eq = api.el('span', 'cwl-eq');
        eq.textContent = '=';
        eq.setAttribute('aria-hidden', 'true');
        row.appendChild(eq);
      }
      row.appendChild(this._numeralPanel(count));
      if (views === 'all' || views === 'two') row.appendChild(this._framePanel(count));
      box.appendChild(row);

      var label = api.el('div', 'cwl-dayslabel');
      label.textContent = api.t(count === 1 ? 'daysLabelOne' : 'daysLabel');
      box.appendChild(label);

      var ctr = api.el('div', 'cwl-advance');
      if (countedToday) {
        var done = api.el('span', 'cwl-counted');
        done.textContent = api.t('countedToday');
        ctr.appendChild(done);
        var undo = api.el('button', 'cwl-linkbtn');
        undo.type = 'button';
        undo.setAttribute('data-fk', 'undo');
        undo.textContent = api.t('undo');
        undo.addEventListener('click', function () {
          if (MODEL.uncountDay(wall, self._todayKey) === null) return;
          self._saveStore(); api.sound(330); self._paint();
        });
        ctr.appendChild(undo);
      } else if (canCount) {
        var plus = api.el('button', 'cwl-plusone');
        plus.type = 'button';
        plus.setAttribute('data-fk', 'plusone');
        plus.textContent = api.t('plusOne');
        plus.addEventListener('click', function () { self._advance(); });
        ctr.appendChild(plus);
      } else {
        /* ⚠ THE MATERIAL PUSHES BACK, IT DOES NOT LOCK HER OUT. On a day
           the class is not in — a weekend, or a day she marked no-school
           — the +1 is not offered, because the tool should not invite a
           count on a day nobody was there. The stepper below still
           works: she was in the room and the tool was not. */
        var closed = api.el('span', 'cwl-closed');
        closed.textContent = api.t(MODEL.hasKind(wall, this._todayKey, 'off') ? 'stateNoSchool' : 'stateAhead');
        ctr.appendChild(closed);
      }

      var pencil = api.el('button', 'cwl-pencil');
      pencil.type = 'button';
      pencil.setAttribute('data-fk', 'pencil');
      pencil.setAttribute('aria-label', api.t('editCount'));
      pencil.setAttribute('aria-expanded', String(!!this._stepperOpen));
      pencil.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4L8 20l-5 1 1-5L17 3z"/></svg>';
      pencil.addEventListener('click', function () { self._stepperOpen = !self._stepperOpen; self._paint(); });
      ctr.appendChild(pencil);
      box.appendChild(ctr);

      if (this._stepperOpen) box.appendChild(this._stepper(wall, count));

      if (wall.lastSummary && count < 5) {
        var note = api.el('div', 'cwl-lastyear');
        note.textContent = this.fmt('lastYear', { n: wall.lastSummary.days });
        box.appendChild(note);
      }
      /* ⚠ NO GATE LINE HERE, and its absence is the fix. There is nothing
         gated on this widget: historyVisible() is consulted in exactly
         one place in this file — the weather chart — and _saveStore
         persists the count and every ordinal for everybody. The line
         that used to sit here told a free teacher that subscribers
         "keep the record", which is false. Selling something the code
         gives away is the same offence as withholding something the
         copy promises. */
      host.appendChild(box);
    },

    _stepper: function (wall, count) {
      var api = this.api, self = this;
      var step = api.el('div', 'cwl-stepper');
      var apply = function (n) {
        /* the stepper sets TODAY's ordinal, so the record and the number
           can never disagree about which day the count belongs to */
        MODEL.setCountOn(wall, self._todayKey, n);
        self._saveStore();
        self._paint();
      };
      var minus = api.el('button', 'cwl-stepbtn');
      minus.type = 'button'; minus.textContent = '\u2212';
      minus.setAttribute('data-fk', 'step-');
      minus.setAttribute('aria-label', api.t('editCount'));
      minus.addEventListener('click', function () { apply(Math.max(0, count - 1)); });
      var input = document.createElement('input');
      input.className = 'cwl-stepinput';
      input.type = 'number'; input.min = '0'; input.max = '999';
      input.value = String(count);
      input.setAttribute('data-fk', 'step-in');
      input.setAttribute('aria-label', api.t('editCount'));
      /* ⚠ COMMIT ON change/Enter, NEVER ON EVERY KEYSTROKE. The old
         stepper repainted on input, which destroyed the field mid-edit
         and made it unusable by keyboard. */
      input.addEventListener('change', function () { apply(+input.value); });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); apply(+input.value); }
      });
      var plusB = api.el('button', 'cwl-stepbtn');
      plusB.type = 'button'; plusB.textContent = '+';
      plusB.setAttribute('data-fk', 'step+');
      plusB.setAttribute('aria-label', api.t('editCount'));
      plusB.addEventListener('click', function () { apply(count + 1); });
      step.append(minus, input, plusB);
      return step;
    },

    _advance: function () {
      var api = this.api, self = this, wall = this.wall();
      var to = MODEL.countDay(wall, this._todayKey);
      if (to === null) return;
      this._saveStore();
      api.sound(523);
      api.track('advance', { to: to });
      if (to > 0 && to % 100 === 0) this._regroup('hundred', to);
      else if (to > 0 && to % 10 === 0) this._regroup('ten', to);
      else {
        this._paint();
        api.announce(String(to) + ' ' + api.t(to === 1 ? 'daysLabelOne' : 'daysLabel'));
      }
    },

    /* ⚠ THE REGROUP AT ONE HUNDRED IS A DIFFERENT REGROUP, and the old
       build animated the wrong one: its chain hardcoded ten STRAWS, so
       the biggest day of the K year showed ten ones becoming a ten. At a
       hundred it is the TENS that gather — ten bundles into one raft. */
    _regroup: function (kind, to) {
      var api = this.api, self = this;
      var line = api.t(kind === 'hundred' ? 'narrHundred' : 'narrTen');
      this._paint();
      var jar = this._widget.querySelector(kind === 'hundred' ? '.cwl-jar.tens' : '.cwl-jar.ones');
      var say = function () {
        api.announce(line);
        if (self.api.settings.speakDate && typeof LCSAudio !== 'undefined') {
          LCSAudio.speak({ type: 'ui', text: line, lang: api.lang, rate: 0.9 });
        }
      };
      if (this._reduced() || !jar) { say(); return; }
      jar.classList.add('gather');
      api.sound(587);
      setTimeout(function () { jar.classList.add('tied'); api.sound(659); }, 380);
      setTimeout(function () { jar.classList.add('handoff'); api.sound(784); }, 760);
      setTimeout(function () { self._paint(); say(); }, 1200);
    },

    /* ---- the material ------------------------------------------------
       ⚠ THE BUNDLE MUST LOOK LIKE TEN. The old one drew ten sticks 2.3px
       wide with 0.7px gaps at render size and photographed as a BARCODE —
       ten things a child cannot count is not a picture of ten. And the
       old hundred drew TEN STRAWS with two ribbons and called it a
       hundred, which is a lie about the mathematics in the one widget
       whose whole job is place value. One hundred is TEN BUNDLES OF TEN,
       so it is drawn as ten tied bundles, each with its own tie, and a
       child can count the ties.
       ------------------------------------------------------------------ */
    _strawSvg: function () {
      return '<svg viewBox="0 0 10 46" class="cwl-straw" aria-hidden="true">' +
        '<rect x="2.4" y="1" width="5.2" height="44" rx="2.6" fill="#C2562F"/>' +
        '<rect x="3.4" y="2" width="1.6" height="42" rx="0.8" fill="#F2A184"/></svg>';
    },
    _bundleSvg: function () {
      var s = '<svg viewBox="0 0 48 52" class="cwl-bundle" aria-hidden="true">', i;
      for (i = 0; i < 10; i++) {
        s += '<rect x="' + (2.4 + i * 4.2).toFixed(1) + '" y="' + (2 + (i % 3) * 0.8).toFixed(1) +
             '" width="2.9" height="46" rx="1.45" fill="#C2562F"/>';
      }
      return s + '<path d="M1 30 47 23v6.2L1 36.2Z" fill="#146B5E"/>' +
                 '<path d="M22 24.8l5.6-.9 1.4 5.4-5.6.9Z" fill="#0E5147"/></svg>';
    },
    _hundredSvg: function () {
      var s = '<svg viewBox="0 0 66 56" class="cwl-hundred" aria-hidden="true">', i, x;
      for (i = 0; i < 10; i++) {
        x = 2.5 + i * 6.2;
        s += '<rect x="' + x.toFixed(1) + '" y="3" width="4.6" height="50" rx="2.3" fill="#C2562F"/>' +
             '<rect x="' + (x + 1.5).toFixed(1) + '" y="4" width="1.2" height="48" rx=".6" fill="#F2A184"/>' +
             '<rect x="' + (x - 0.5).toFixed(1) + '" y="24" width="5.6" height="3.4" rx="1.7" fill="#146B5E"/>';
      }
      return s + '<rect x="0" y="12" width="66" height="4.4" rx="2.2" fill="#0E5147"/>' +
                 '<rect x="0" y="38" width="66" height="4.4" rx="2.2" fill="#0E5147"/></svg>';
    },

    _bundlesPanel: function (count) {
      var api = this.api;
      var hundreds = Math.floor(count / 100), tens = Math.floor((count % 100) / 10), ones = count % 10;
      var panel = api.el('div', 'cwl-jars');
      /* ⚠ THE HUNDREDS COLUMN IS ALWAYS DRAWN, EMPTY OR NOT. The old one
         appeared at a hundred and pushed tens and ones sideways — in a
         place-value apparatus a column that MOVES teaches that position
         is negotiable. */
      var cfg = [
        { key: 'jarHundreds', cls: 'hundreds', n: hundreds, svg: this._hundredSvg() },
        { key: 'jarTens', cls: 'tens', n: tens, svg: this._bundleSvg() },
        { key: 'jarOnes', cls: 'ones', n: ones, svg: this._strawSvg() }
      ];
      for (var j = 0; j < cfg.length; j++) {
        var col = api.el('div', 'cwl-jarcol');
        var jar = api.el('div', 'cwl-jar ' + cfg[j].cls);
        for (var i = 0; i < cfg[j].n; i++) {
          var it = api.el('span', 'cwl-jaritem');
          /* ⭐ --i IS SET HERE, and its absence is why the celebration
             never happened. The gather rule read var(--i,0) and NOTHING
             in 1736 lines ever set it, so every straw fell back to 0 and
             slid the same 10px: the animation the docblock called "the
             celebration IS the mathematics" did not gather. */
          it.style.setProperty('--i', String(i));
          it.innerHTML = cfg[j].svg;
          jar.appendChild(it);
        }
        var lab = api.el('span', 'cwl-jarlabel');
        lab.textContent = api.t(cfg[j].key);
        col.append(jar, lab);
        panel.appendChild(col);
      }
      return panel;
    },

    /* the ten-frame earns its place by answering a DIFFERENT question
       from the ones jar: not "how many ones" but "how many more to the
       next ten". The empty cells are the answer, so they are drawn. */
    _framePanel: function (count) {
      var api = this.api;
      var ones = count % 10;
      var panel = api.el('div', 'cwl-frame-panel');
      var frame = api.el('div', 'cwl-tf');
      for (var i = 0; i < 10; i++) {
        var cell = api.el('span', 'cwl-tfcell' + (i < ones ? ' filled' : ' gap'));
        if (i < ones) cell.innerHTML = '<span class="cwl-dot"></span>';
        frame.appendChild(cell);
      }
      panel.appendChild(frame);
      var lab = api.el('span', 'cwl-jarlabel');
      lab.textContent = api.t('jarOnes');
      panel.appendChild(lab);
      return panel;
    },

    _numeralPanel: function (count) {
      var api = this.api;
      var panel = api.el('div', 'cwl-numpanel');
      var num = api.el('div', 'cwl-numeral');
      var digits = String(count).split('');
      for (var i = 0; i < digits.length; i++) {
        var d = api.el('span', 'cwl-digit');
        d.textContent = digits[i];
        num.appendChild(d);
      }
      panel.appendChild(num);
      return panel;
    },

    /* =================================================================
       WIDGET 3 — THE WEATHER MONTH.
       ⚠ LAID DOWN AS ROWS, not columns, and it is arithmetic that forces
       it: a column of 22 stamps is 660px tall inside a card the height
       ladder exists to keep from clipping. Rows also let the stamps be
       GROUPED IN FIVES, which preserves the strict 1:1 the pictograph
       depends on while making a run of seventeen readable without a
       numeral.
       ⚠ AND THE GHOSTS ARE GONE. Two 14%-opacity stamps per row sat above
       a label reading 0 — phantom data on a data display, under a prompt
       asking which weather has the most days.
       ================================================================= */
    _paintWeather: function (host) {
      var api = this.api, self = this, wall = this.wall();
      var ym = this._viewMonth;
      var isCurrent = ym === MODEL.monthOf(this._todayKey);
      var set = this.weatherSet();
      var todayPick = isCurrent ? MODEL.weatherOn(wall, this._todayKey) : null;

      var headRow = api.el('div', 'cwl-monthrow');
      headRow.append(this._monavBtn('prev', -1), (function () {
        var t = api.el('h2', 'cwl-monthtitle'); t.textContent = self._monthTitle(ym); return t;
      }()), this._monavBtn('next', 1));
      if (!isCurrent) {
        var tb = api.el('button', 'cwl-todaybtn');
        tb.type = 'button'; tb.textContent = api.t('todayBtn');
        tb.setAttribute('data-fk', 'today');
        tb.addEventListener('click', function () { self._viewMonth = MODEL.monthOf(self._todayKey); self._paint(); });
        headRow.appendChild(tb);
      }
      host.appendChild(headRow);

      if (isCurrent && (!todayPick || this._pickerOpen)) {
        var q = api.el('div', 'cwl-wq');
        q.textContent = api.t('whatWeather');
        host.appendChild(q);
        var picker = api.el('div', 'cwl-picker');
        for (var i = 0; i < set.length; i++) {
          (function (w) {
            var b = api.el('button', 'cwl-wbtn');
            b.type = 'button';
            b.setAttribute('data-w', w.id);
            b.setAttribute('data-fk', 'w-' + w.id);
            b.innerHTML = '<span class="cwl-wicon">' + w.svg + '</span><span class="cwl-wlabel">' +
              self._esc(api.t(w.labelKey)) + '</span>';
            b.addEventListener('click', function () { self._pickWeather(w.id, self._todayKey); });
            picker.appendChild(b);
          }(set[i]));
        }
        host.appendChild(picker);
      } else if (isCurrent) {
        var w2 = this.weatherById(todayPick);
        var pill = api.el('button', 'cwl-todaypill');
        pill.type = 'button';
        pill.setAttribute('data-fk', 'wpill');
        pill.innerHTML = '<span class="cwl-pillicon">' + (w2 ? w2.svg : '') + '</span><span>' +
          this._esc(this.fmt('todayPill', { w: w2 ? api.t(w2.labelKey) : todayPick })) +
          '</span><span class="cwl-pillchange">' + this._esc(api.t('changeWeather')) + '</span>';
        pill.addEventListener('click', function () { self._pickerOpen = true; self._paint(); });
        host.appendChild(pill);
      }

      /* the chart */
      var ids = [];
      for (var s2 = 0; s2 < set.length; s2++) ids.push(set[s2].id);
      var counts = this.historyVisible(ym + '-01')
        ? MODEL.weatherCounts(wall, ym, ids)
        : (function () { var c = {}; for (var k = 0; k < ids.length; k++) c[ids[k]] = 0;
                         if (todayPick && c[todayPick] !== undefined) c[todayPick] = 1; return c; }());

      var board = api.el('div', 'cwl-chart');
      board.setAttribute('role', 'table');
      board.setAttribute('aria-label', api.t('dockWeather'));
      for (var ci = 0; ci < set.length; ci++) {
        var w3 = set[ci], n = counts[w3.id];
        var rowEl = api.el('div', 'cwl-wrow');
        rowEl.setAttribute('role', 'row');
        /* ⚠ THE KEY IS THE UNIT, AT FULL STRENGTH. The old axis icon was
           the same drawing at 85% opacity, i.e. 1.98:1 — in a pictograph
           a five-year-old must be able to match a stamp to its row, and a
           faded copy is not the same mark. */
        var keyCell = api.el('div', 'cwl-wkey');
        keyCell.setAttribute('role', 'rowheader');
        keyCell.innerHTML = '<span class="cwl-wkeyicon">' + w3.svg + '</span>' +
          '<span class="cwl-wkeylabel">' + this._esc(api.t(w3.labelKey)) + '</span>';
        var track = api.el('div', 'cwl-wtrack');
        track.setAttribute('role', 'cell');
        for (var k2 = 0; k2 < n; k2++) {
          var st = api.el('span', 'cwl-stamp' + ((k2 + 1) % 5 === 0 ? ' five' : ''));
          st.innerHTML = w3.svg;
          track.appendChild(st);
        }
        var cnt = api.el('span', 'cwl-wcount');
        cnt.textContent = String(n);
        rowEl.append(keyCell, track, cnt);
        board.appendChild(rowEl);
      }
      host.appendChild(board);

      if (!this.premium) host.appendChild(this._gateLine('freeWeatherGate'));

      var prompts = ['promptMost', 'promptCompare', 'promptTotal', 'promptPredict'];
      var p = api.el('div', 'cwl-prompt');
      p.textContent = api.t(prompts[(new Date().getDate() + new Date().getMonth()) % prompts.length]);
      host.appendChild(p);
    },

    _pickWeather: function (id, key) {
      var api = this.api;
      MODEL.setWeatherOn(this.wall(), key, id);
      this._pickerOpen = false;
      this._saveStore();
      api.sound(587);
      var w = this.weatherById(id);
      if (w) api.announce(api.t(w.labelKey));
      api.track('weather', { w: id });
      this._paint();
    },

    _gateLine: function (key) {
      var api = this.api;
      var g = api.el('div', 'cwl-gate');
      /* two nodes, never a concatenation */
      var s = api.el('span', '');
      s.textContent = api.t(key);
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-calendar-wall';
      a.target = '_top';
      a.rel = 'noopener';
      a.textContent = api.t('unlock');
      g.append(s, a);
      return g;
    },

    /* =================================================================
       THE DAY SHEET — where a teacher marks a day.

       WITH THE TEACHER WINDOW CLOSED it is a CHILD affordance: tapping a
       day speaks its date and shows what is on it, read-only. That is a
       real K-3 skill and it is free.
       WITH THE WINDOW OPEN it gains the add row and per-mark controls.

       PATH: three taps, zero typing. Key chip, the cell, a kind chip —
       and the kind chip CREATES the mark immediately, so nothing is ever
       lost by not typing a name.

       PROTECTION, in increasing order of usefulness: the window must be
       open; the window times out; a two-step in-place confirm; and an
       UNDO CHIP for twenty seconds. Undo is the one that actually works,
       because it survives the case where the teacher was not looking.
       ================================================================= */

    _openSheet: function (key) {
      this._sheetKey = key;
      this._pendingRemove = null;
      this._draft = '';
      this._sheetReturn = document.activeElement;
      if (!this._sheetEl) this._buildSheet();
      this._paintSheet();
      this._sheetEl.classList.add('open');
      this._sheetScrim.classList.add('open');
      this._sayDate(MODEL.dateFromKey(key));
      var first = this._sheetEl.querySelector('button, input');
      if (first) first.focus();
    },

    _closeSheet: function () {
      if (!this._sheetEl) return;
      this._sheetEl.classList.remove('open');
      this._sheetScrim.classList.remove('open');
      this._sheetKey = null;
      this._pendingRemove = null;
      this._draft = '';
      /* focus goes back where it came from — the contract the old wall
         panel never had */
      if (this._sheetReturn && this._sheetReturn.focus) this._sheetReturn.focus();
      this._sheetReturn = null;
    },

    /* ⚠ TWO-STAGE ESCAPE. A stray key must not eat a sentence: the first
       Escape clears a half-typed name and keeps the sheet open; only the
       second closes it. */
    _sheetEscape: function (e) {
      e.preventDefault();
      var input = this._sheetEl && this._sheetEl.querySelector('.cwl-titlein');
      if (input && input.value && input.value.length) {
        input.value = '';
        this._draft = '';
        this.api.announce(this.api.t('cancel'));
        input.focus();
        return;
      }
      this._closeSheet();
    },

    _buildSheet: function () {
      var api = this.api, self = this;
      var host = document.querySelector('.lcs-app') || document.body;
      this._sheetScrim = api.el('div', 'cwl-scrim');
      this._sheetScrim.addEventListener('click', function () { self._closeSheet(); });
      this._sheetEl = api.el('div', 'cwl-sheetdlg');
      this._sheetEl.setAttribute('role', 'dialog');
      this._sheetEl.setAttribute('aria-modal', 'true');
      /* focus trap: Tab wraps inside the dialog at both ends */
      this._sheetEl.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        var f = self._sheetEl.querySelectorAll('button:not([disabled]), input, a[href]');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      host.append(this._sheetScrim, this._sheetEl);
    },

    _paintSheet: function () {
      var api = this.api, self = this, wall = this.wall();
      var key = this._sheetKey;
      if (!key) return;
      var el = this._sheetEl;
      var teacher = this.teacherOpen();
      el.innerHTML = '';

      var head = api.el('div', 'cwl-sheethead');
      var h = api.el('h2', 'cwl-sheetdate');
      h.textContent = this._dateSentence(MODEL.dateFromKey(key), true);
      h.id = 'cwl-sheet-date';
      el.setAttribute('aria-labelledby', 'cwl-sheet-date');
      var x = api.el('button', 'cwl-sheetclose');
      x.type = 'button';
      x.setAttribute('aria-label', api.t('close'));
      x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      x.addEventListener('click', function () { self._closeSheet(); });
      head.append(h, x);
      el.appendChild(head);

      var body = api.el('div', 'cwl-sheetbody');

      var ord = MODEL.ordinalOn(wall, key);
      if (ord) {
        var o = api.el('p', 'cwl-sheetord');
        o.textContent = this.fmt('stateSchoolDay', { n: ord });
        body.appendChild(o);
      }

      /* existing marks */
      var evs = MODEL.eventsOn(wall, key);
      for (var i = 0; i < evs.length; i++) {
        (function (ev) {
          var row = api.el('div', 'cwl-evrow');
          var sw = api.el('span', 'cwl-evsw');
          sw.innerHTML = (wall.target === ev.id) ? EV_ICON.target : (EV_ICON[ev.k] || EV_ICON.star);
          sw.setAttribute('aria-hidden', 'true');
          var nm = api.el('span', 'cwl-evname');
          nm.textContent = ev.t || api.t(self._kindKey(ev.k));
          row.append(sw, nm);

          if (teacher && self._pendingRemove === ev.id) {
            var msg = api.el('span', 'cwl-evask');
            msg.textContent = self.fmt('removeAsk', { t: ev.t || api.t(self._kindKey(ev.k)) });
            var go = api.el('button', 'cwl-linkbtn danger');
            go.type = 'button';
            go.textContent = api.t('removeMark');
            go.addEventListener('click', function () { self._removeEvent(ev.id); });
            var no = api.el('button', 'cwl-linkbtn');
            no.type = 'button';
            no.textContent = api.t('cancel');
            no.addEventListener('click', function () { self._pendingRemove = null; self._paintSheet(); });
            row.append(msg, go, no);
          } else if (teacher) {
            var tgt = api.el('button', 'cwl-iconbtn' + (wall.target === ev.id ? ' on' : ''));
            tgt.type = 'button';
            tgt.setAttribute('aria-pressed', String(wall.target === ev.id));
            tgt.setAttribute('aria-label', api.t(wall.target === ev.id ? 'cdClearTarget' : 'cdSetTarget'));
            tgt.innerHTML = EV_ICON.target;
            tgt.addEventListener('click', function () {
              MODEL.setTarget(wall, wall.target === ev.id ? null : ev.id);
              self._saveStore(); self._paintSheet(); self._paint();
            });
            var del = api.el('button', 'cwl-iconbtn');
            del.type = 'button';
            del.setAttribute('aria-label', api.t('removeMark'));
            del.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>';
            del.addEventListener('click', function () { self._pendingRemove = ev.id; self._paintSheet(); });
            row.append(tgt, del);
          }
          body.appendChild(row);
        }(evs[i]));
      }

      if (teacher) body.appendChild(this._addRow(key, wall));
      else if (!evs.length) {
        var none = api.el('p', 'cwl-sheetnone');
        none.textContent = api.t('daySheet');
        body.appendChild(none);
      }

      /* weather on ANY day — the old backfill was premium-only,
         yesterday-only and refused weekends, so the commonest case of
         all (filling in Friday on a Monday) was impossible */
      var wsec = api.el('div', 'cwl-sheetw');
      var wnow = MODEL.weatherOn(wall, key);
      var set = this.weatherSet();
      for (var s2 = 0; s2 < set.length; s2++) {
        (function (w) {
          var b = api.el('button', 'cwl-wpick' + (wnow === w.id ? ' on' : ''));
          b.type = 'button';
          b.setAttribute('aria-pressed', String(wnow === w.id));
          b.setAttribute('aria-label', api.t(w.labelKey));
          b.innerHTML = w.svg;
          b.addEventListener('click', function () {
            self._pickWeather(w.id, key);
            self._paintSheet();
          });
          wsec.appendChild(b);
        }(set[s2]));
      }
      body.appendChild(wsec);

      el.appendChild(body);
    },

    _addRow: function (key, wall) {
      var api = this.api, self = this;
      var box = api.el('div', 'cwl-addrow');

      var lab = api.el('div', 'cwl-addlab');
      lab.textContent = api.t('addMark');
      box.appendChild(lab);

      var chips = api.el('div', 'cwl-kinds');
      chips.setAttribute('role', 'group');
      chips.setAttribute('aria-label', api.t('addMark'));
      var kinds = MODEL.KINDS;
      for (var i = 0; i < kinds.length; i++) {
        (function (k) {
          var b = api.el('button', 'cwl-kind k-' + k);
          b.type = 'button';
          b.setAttribute('data-kind', k);
          b.setAttribute('data-fk', 'kind-' + k);
          b.innerHTML = '<span class="cwl-kindicon">' + EV_ICON[k] + '</span>' +
            '<span class="cwl-kindlab">' + self._esc(api.t(self._kindKey(k))) + '</span>';
          /* ⭐ THE CHIP CREATES THE MARK. Three taps, zero typing — the
             name is optional and nothing is lost by not writing one. */
          b.addEventListener('click', function () { self._createEvent(key, k); });
          chips.appendChild(b);
        }(kinds[i]));
      }
      box.appendChild(chips);

      var input = document.createElement('input');
      input.className = 'cwl-titlein';
      input.type = 'text';
      input.maxLength = MODEL.MAX_TITLE;
      input.value = this._draft || '';
      input.placeholder = api.t('markName');
      input.setAttribute('aria-label', api.t('markName'));
      input.addEventListener('input', function () {
        self._draft = input.value;
        var c = box.querySelector('.cwl-count');
        /* ⚠ A VISIBLE COUNTER, NOT A SILENT TRUNCATION. cleanText caps at
           40 and a teacher whose sentence vanished has no way to know why. */
        if (c) c.textContent = (input.value.length >= 30) ? (input.value.length + '/' + MODEL.MAX_TITLE) : '';
      });
      var cnt = api.el('span', 'cwl-count');
      var wrapIn = api.el('div', 'cwl-inwrap');
      wrapIn.append(input, cnt);
      box.appendChild(wrapIn);

      /* premium depth: multi-day runs and the yearly repeat */
      var opts = api.el('div', 'cwl-addopts');
      var spanBox = api.el('label', 'cwl-spanbox');
      var spanLab = api.el('span', '');
      spanLab.textContent = api.t('runsFor');
      var spanIn = document.createElement('input');
      spanIn.type = 'number'; spanIn.min = '1'; spanIn.max = String(MODEL.MAX_SPAN);
      spanIn.value = String(this._draftSpan || 1);
      spanIn.className = 'cwl-spanin';
      spanIn.setAttribute('aria-label', api.t('runsFor'));
      spanIn.disabled = !this.premium;
      spanIn.addEventListener('change', function () {
        self._draftSpan = Math.max(1, Math.min(MODEL.MAX_SPAN, +spanIn.value || 1));
        self._paintSheet();   /* the unit is singular at 1 and must follow */
      });
      var spanUnit = api.el('span', '');
      /* ⚠ THE STEPPER OPENS AT 1, so the plural-only string made the
         DEFAULT state the ungrammatical one in every language. */
      spanUnit.textContent = api.t((this._draftSpan || 1) === 1 ? 'daysUnitOne' : 'daysUnit');
      spanBox.append(spanLab, spanIn, spanUnit);

      var rep = api.el('button', 'cwl-repbtn' + (this._draftRep === 'year' ? ' on' : ''));
      rep.type = 'button';
      rep.textContent = api.t('repeatYear');
      rep.setAttribute('aria-pressed', String(this._draftRep === 'year'));
      rep.disabled = !this.premium;
      rep.addEventListener('click', function () {
        self._draftRep = (self._draftRep === 'year') ? 'once' : 'year';
        self._paintSheet();
      });
      opts.append(spanBox, rep);
      box.appendChild(opts);
      if (!this.premium) box.appendChild(this._gateLine('eventsGate'));
      return box;
    },

    _createEvent: function (key, kind) {
      var api = this.api, wall = this.wall();
      var id = MODEL.addEvent(wall, key, kind, this._draft || '',
        this.premium ? (this._draftSpan || 1) : 1,
        this.premium ? (this._draftRep || 'once') : 'once');
      if (!id) return;
      this._draft = '';
      this._draftSpan = 1;
      this._draftRep = 'once';
      this._saveStore();
      api.sound(587);
      api.announce(api.t(this._kindKey(kind)));
      api.track('mark', { k: kind });
      this._paintSheet();
      this._paint();
    },

    _removeEvent: function (id) {
      var self = this, api = this.api, wall = this.wall();
      var gone = MODEL.removeEvent(wall, id);
      if (!gone) return;
      this._trash.push(gone);
      if (this._trash.length > this.TRASH_MAX) this._trash.shift();
      this._pendingRemove = null;
      this._saveStore();
      api.sound(330);
      this._paintSheet();
      this._paint();
      this._showUndo();
    },

    /* ⚠ THE UNDO CHIP MOUNTS ON THE CARD, ABOVE EVERY SCRIM, and that is
       a reachability fix rather than a placement preference. It used to
       sit in the readouts row inside .cwl-wrap — but a mark is removed
       with the day sheet OPEN, so the modal scrim covered it and a real
       pointer aimed at the chip hit the scrim instead. It is the one
       affordance meant to survive a mistake nobody noticed, so it has to
       be reachable from wherever the mistake was made. */
    _showUndo: function () {
      var api = this.api, self = this;
      if (this._undoTimer) clearTimeout(this._undoTimer);
      if (this._undoEl && this._undoEl.parentNode) this._undoEl.parentNode.removeChild(this._undoEl);
      /* on the BODY, so no ancestor's overflow or transform can clip it
         or re-root the fixed positioning */
      var host = document.body;
      var b = api.el('button', 'cwl-undochip');
      b.type = 'button';
      b.setAttribute('data-fk', 'undoevent');
      b.textContent = api.t('undoRemove');
      b.addEventListener('click', function () {
        var last = self._trash.pop();
        if (!last) { self._hideUndo(); return; }
        MODEL.addEvent(self.wall(), last.key, last.e.k, last.e.t, last.e.span, last.e.rep, last.e.id);
        self._saveStore();
        self._hideUndo();
        self._paint();
        if (self._sheetKey) self._paintSheet();
        api.announce(api.t('undoRemove'));
      });
      host.appendChild(b);
      this._undoEl = b;
      this._undoTimer = setTimeout(function () { self._hideUndo(); }, this.UNDO_MS);
    },

    _hideUndo: function () {
      if (this._undoTimer) { clearTimeout(this._undoTimer); this._undoTimer = null; }
      if (this._undoEl && this._undoEl.parentNode) this._undoEl.parentNode.removeChild(this._undoEl);
      this._undoEl = null;
    },

    /* =================================================================
       THE WALL PANEL — classes, the days we meet, the pattern, the year.
       ================================================================= */
    _openPanel: function () {
      if (!this._panelEl) this._buildPanel();
      this._panelReturn = document.activeElement;
      this._paintPanel();
      this._panelEl.classList.add('open');
      this._panelScrim.classList.add('open');
      var f = this._panelEl.querySelector('button, input');
      if (f) f.focus();
    },
    _closePanel: function () {
      if (!this._panelEl) return;
      this._panelEl.classList.remove('open');
      this._panelScrim.classList.remove('open');
      this._pendingConfirm = null;
      if (this._panelReturn && this._panelReturn.focus) this._panelReturn.focus();
      this._panelReturn = null;
    },
    _buildPanel: function () {
      var api = this.api, self = this;
      var host = document.querySelector('.lcs-app') || document.body;
      this._panelScrim = api.el('div', 'cwl-scrim');
      this._panelScrim.addEventListener('click', function () { self._closePanel(); });
      this._panelEl = api.el('div', 'cwl-panel');
      this._panelEl.setAttribute('role', 'dialog');
      this._panelEl.setAttribute('aria-modal', 'true');
      this._panelEl.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); self._closePanel(); return; }
        if (e.key !== 'Tab') return;
        var f = self._panelEl.querySelectorAll('button:not([disabled]), input, a[href]');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      host.append(this._panelScrim, this._panelEl);
    },

    _paintPanel: function () {
      var api = this.api, self = this, store = this._store, wall = this.wall();
      var panel = this._panelEl;
      panel.innerHTML = '';

      var head = api.el('div', 'cwl-panel-head');
      var h = api.el('h2', 'cwl-panel-title');
      h.textContent = api.t('wallsTitle');
      h.id = 'cwl-panel-title';
      panel.setAttribute('aria-labelledby', 'cwl-panel-title');
      var x = api.el('button', 'cwl-sheetclose');
      x.type = 'button';
      x.setAttribute('aria-label', api.t('close'));
      x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      x.addEventListener('click', function () { self._closePanel(); });
      head.append(h, x);
      panel.appendChild(head);

      var body = api.el('div', 'cwl-panel-body');

      Object.keys(store.walls).forEach(function (id) {
        var w = store.walls[id];
        var row = api.el('div', 'cwl-wallrow' + (id === store.activeWallId ? ' active' : ''));
        var pick = api.el('button', 'cwl-wallpick');
        pick.type = 'button';
        pick.textContent = w.name || api.t('wallDefault');
        pick.addEventListener('click', function () {
          store.activeWallId = id; self._saveStore(); self._closePanel(); self._paint();
        });
        var meta = api.el('span', 'cwl-wallmeta');
        var n = MODEL.dayCount(w);
        meta.textContent = n + ' ' + api.t(n === 1 ? 'daysLabelOne' : 'daysLabel');
        /* ⚠ AN INLINE FIELD, NOT prompt(). A native modal on a projector
           is wrong, it is inconsistent with every sibling tool, and it
           cannot tell Cancel from a cleared field. */
        var ren = document.createElement('input');
        ren.className = 'cwl-renamein';
        ren.type = 'text';
        ren.maxLength = 40;
        ren.value = w.name || '';
        ren.placeholder = api.t('wallDefault');
        ren.setAttribute('aria-label', api.t('renameWall'));
        var commit = function () {
          var v = MODEL.cleanText(ren.value, 40);
          w.name = v || null;
          self._saveStore(); self._paint();
        };
        ren.addEventListener('change', commit);
        ren.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); commit(); ren.blur(); } });
        row.append(pick, meta, ren);
        body.appendChild(row);
      });

      var add = api.el('button', 'cwl-newwall');
      add.type = 'button';
      add.textContent = api.t('newWall');
      add.addEventListener('click', function () {
        if (!self.premium) {
          var old = body.querySelector('.cwl-gate');
          if (old) old.remove();
          add.insertAdjacentElement('beforebegin', self._gateLine('newWallGate'));
          return;
        }
        var id = 'w_' + Math.floor(Math.random() * 1e9).toString(36);
        var fresh = MODEL.newWall(null);
        fresh.createdAt = MODEL.keyFromDate(new Date());
        store.walls[id] = fresh;
        store.activeWallId = id;
        self._saveStore(); self._paintPanel(); self._paint();
      });
      body.appendChild(add);

      /* which days we meet — the four-day class was invisible before */
      var meetRow = api.el('div', 'cwl-meetrow');
      var meetLab = api.el('span', 'cwl-patlabel');
      meetLab.textContent = api.t('setMeets');
      meetRow.appendChild(meetLab);
      var startSun = this._weekStart() === 'sun';
      for (var d = 0; d < 7; d++) {
        (function (i) {
          var dow = startSun ? i : ((i + 1) % 7);
          var ref = new Date(2026, 5, (startSun ? 7 : 8) + i);
          var b = api.el('button', 'cwl-meetbtn' + (MODEL.meetsDow(wall, dow) ? ' on' : ''));
          b.type = 'button';
          /* ⚠ `short`, NOT `narrow`. Portuguese narrow weekdays are
             S T Q Q S S D — three S and two Q — so the row a Brazilian
             teacher is asked to configure carries no information at
             all. French and Italian repeat M. The calendar header
             picks its own form from a container query where space is
             actually tight; this panel row has room. */
          b.textContent = self._weekdayName(ref, 'short');
          b.setAttribute('aria-pressed', String(MODEL.meetsDow(wall, dow)));
          b.setAttribute('aria-label', self._weekdayName(ref, 'long'));
          b.addEventListener('click', function () {
            wall.meets[dow] = !MODEL.meetsDow(wall, dow);
            self._saveStore(); self._paintPanel(); self._paint();
          });
          meetRow.appendChild(b);
        }(d));
      }
      body.appendChild(meetRow);

      var patRow = api.el('div', 'cwl-patrow');
      var patLab = api.el('span', 'cwl-patlabel');
      patLab.textContent = api.t('patternLabel');
      patRow.appendChild(patLab);
      ['ab', 'abb', 'abc'].forEach(function (p) {
        var b = api.el('button', 'cwl-patbtn' + (wall.pattern === p ? ' on' : ''));
        b.type = 'button';
        b.textContent = p.toUpperCase();
        b.setAttribute('aria-pressed', String(wall.pattern === p));
        b.addEventListener('click', function () { wall.pattern = p; self._saveStore(); self._paintPanel(); self._paint(); });
        patRow.appendChild(b);
      });
      body.appendChild(patRow);

      /* ⚠ THE DESTRUCTIVE ACTION IS THE QUIET ONE. The old confirm made
         "Yes, start fresh" a filled coral button and cancel a bare glyph
         that read as "close the dialog", not "don't do it". */
      if (!this._pendingConfirm) {
        var ny = api.el('button', 'cwl-linkbtn danger');
        ny.type = 'button';
        ny.textContent = api.t('newYear');
        ny.addEventListener('click', function () { self._pendingConfirm = 'newYear'; self._paintPanel(); });
        body.appendChild(ny);
      } else {
        var conf = api.el('div', 'cwl-confirm');
        var msg = api.el('p', '');
        msg.textContent = this.fmt('newYearConfirm', {
          name: wall.name || api.t('wallDefault'), n: MODEL.dayCount(wall)
        });
        var keep = api.el('button', 'cwl-btn');
        keep.type = 'button';
        keep.textContent = api.t('cancel');
        keep.addEventListener('click', function () { self._pendingConfirm = null; self._paintPanel(); });
        var go = api.el('button', 'cwl-linkbtn danger');
        go.type = 'button';
        go.textContent = api.t('newYearGo');
        go.addEventListener('click', function () {
          wall.lastSummary = { days: MODEL.dayCount(wall) };
          wall.days = {}; wall.events = {}; wall.weather = {}; wall.target = null;
          self._pendingConfirm = null;
          self._saveStore(); self._closePanel(); self._paint();
        });
        conf.append(msg, keep, go);
        body.appendChild(conf);
      }

      var note = api.el('p', 'cwl-devicenote');
      note.textContent = api.t('deviceNote');
      body.appendChild(note);
      panel.appendChild(body);
    },

    /* =================================================================
       PRINT — the month, on paper, with the record on it.
       ⚠ DOUBLE-LOCKED. The sheet subtree is ABSENT from the DOM unless
       entitled, AND every print rule is scoped body.cwl-paid — because
       Ctrl+P is guarded by no button and gating the CHIP is not gating
       the FEATURE.
       ⚠ AND THE SHELL RESET IS MANDATORY: lcs-shell.css ships ZERO
       @media print blocks, so html,body{height:100%;overflow:hidden} and
       the .lcs-app max-width survive into print and would clip the sheet.
       ================================================================= */
    _printMonth: function () {
      if (!this.premium) { this._showPrintGate(); return; }
      this._buildPrintSheet();
      try { window.print(); } catch (e) { /* no printer in a headless gate */ }
    },

    _showPrintGate: function () {
      var host = this._readouts;
      var old = host.querySelector('.cwl-gate');
      if (old) old.remove();
      host.appendChild(this._gateLine('printGate'));
    },

    _buildPrintSheet: function () {
      var api = this.api, wall = this.wall(), self = this;
      var ym = this._viewMonth;
      var sheet = this._sheetDoc;
      sheet.innerHTML = '';
      if (!this.premium) return;

      var title = api.el('h1', 'cwl-p-title');
      title.textContent = this._monthTitle(ym);
      sheet.appendChild(title);

      var nameRule = api.el('div', 'cwl-p-rule');
      nameRule.setAttribute('aria-hidden', 'true');
      sheet.appendChild(nameRule);

      var startSun = this._weekStart() === 'sun';
      var mx = MODEL.monthMatrix(ym, startSun ? 'sun' : 'mon');
      var grid = api.el('div', 'cwl-p-grid');
      grid.style.setProperty('--rows', String(mx.rows));
      for (var wd = 0; wd < 7; wd++) {
        var ref = new Date(2026, 5, (startSun ? 7 : 8) + wd);
        var hcell = api.el('div', 'cwl-p-wd');
        hcell.textContent = this._weekdayName(ref, 'short');
        grid.appendChild(hcell);
      }
      for (var i = 0; i < mx.cells.length; i++) {
        var c = mx.cells[i];
        var cell = api.el('div', 'cwl-p-cell');
        if (!c.key) { cell.className += ' empty'; grid.appendChild(cell); continue; }
        var evs = MODEL.eventsOn(wall, c.key);
        var isOff = MODEL.hasKind(wall, c.key, 'off');
        if (!MODEL.meetsDow(wall, MODEL.dowOf(c.key))) cell.className += ' weekend';
        /* ⚠ NO-SCHOOL PRINTS AS ITS HATCH ONLY, never hatch + badge: the
           hatch already says it and a badge would double-state it. The
           denser hatch is what distinguishes it from a weekend in ONE ink. */
        if (isOff) cell.className += ' closed';
        var num = api.el('span', 'cwl-p-num');
        num.textContent = String(c.day);
        cell.appendChild(num);
        var ord = MODEL.ordinalOn(wall, c.key);
        if (ord) {
          var o = api.el('span', 'cwl-p-ord');
          o.textContent = String(ord);
          cell.appendChild(o);
        }
        var shown = 0;
        for (var e = 0; e < evs.length; e++) {
          if (evs[e].k === 'off') continue;
          if (shown >= 2) break;
          var m = api.el('span', 'cwl-p-mark');
          m.innerHTML = EV_ICON[evs[e].k] || EV_ICON.star;
          cell.appendChild(m);
          shown++;
        }
        grid.appendChild(cell);
      }
      sheet.appendChild(grid);

      /* the legend carries the TEACHER'S OWN words, which is the only
         language on the sheet and the reason the sheet is hers */
      var seen = {}, legend = api.el('ul', 'cwl-p-legend');
      var mxAll = MODEL.monthMatrix(ym, startSun ? 'sun' : 'mon');
      for (var g = 0; g < mxAll.cells.length; g++) {
        var kk = mxAll.cells[g].key;
        if (!kk) continue;
        var list = MODEL.eventsOn(wall, kk);
        for (var q = 0; q < list.length; q++) {
          if (!list[q].isStart || seen[list[q].id]) continue;
          seen[list[q].id] = 1;
          var li = api.el('li', '');
          li.innerHTML = '<span class="cwl-p-mark">' + (EV_ICON[list[q].k] || EV_ICON.star) + '</span>' +
            '<b>' + mxAll.cells[g].day + '</b> ' +
            this._esc(list[q].t || api.t(this._kindKey(list[q].k)));
          legend.appendChild(li);
        }
      }
      if (legend.children.length) sheet.appendChild(legend);
    }
  };

  /* ===================================================================
     CSS. Direction A tokens, cwl- prefix, injected once.
     ⚠ NO vh AND NO vmin ANYWHERE, and here that is a measured rule
     rather than a style one. The old build carried
     .cwl-cell{height:clamp(38px,min(9.5vmin,10.5vh),104px)} and
     .cwl-widget{min-height:clamp(300px,44vh,540px)} while its OWN
     comment declared vh forbidden inside a manipulative. Measured in the
     704px embed: the iframe went 420 -> 712 -> 954 in three postMessage
     round trips, each animated by the parent's height transition, so the
     tool visibly GREW IN TWO JUMPS on every single load. It converged
     only because a clamp ceiling caught it — an open loop that happens
     to hit a wall is not a closed loop.
     ⚠ NO inline background SHORTHAND, and NO font shorthand: an unquoted
     Baloo 2 inside one makes the whole declaration invalid and it is
     dropped silently, taking any clamp floor with it.
     =================================================================== */
  function injectCSS() {
    if (typeof document === 'undefined' || document.getElementById('cwl-style')) return;
    var s = document.createElement('style');
    s.id = 'cwl-style';
    s.textContent = ''

    /* ---- the page ---- */
    + 'body.cwl-page .lcs-app{max-width:min(1180px,96vw);}'
    + 'body.cwl-page .lcs-title{overflow-wrap:break-word;hyphens:auto;}'
    + '@media (min-width:1500px){body.cwl-page .lcs-app{max-width:min(1440px,94vw);}}'
    + '@media (max-width:480px){'
    +   'body.cwl-page .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
    + '}'

    /* ---- THE LAYOUT RULE that replaces the whole height ladder ----
       Five rows: chips, date, readouts, the widget (1fr), the dock.
       The widget row absorbs the slack standalone and collapses to its
       content in the embed, and NOTHING reads the viewport. */
    /* ⚠ NO height:100% HERE. The card is auto-height in BOTH regimes
       (measured), so a percentage height resolves to auto and the 1fr
       row silently becomes auto — which is exactly how the board
       escaped the fold at 1024x768. The rows still order the layout;
       the BUDGET is applied to the board by _fitBoard, from a
       measurement, and only where a real viewport exists. */
    + '.cwl-wrap{display:grid;grid-template-rows:auto auto auto auto auto;'
    +   'gap:clamp(6px,1.1vw,12px);width:100%;min-height:0;}'
    + '.cwl-widget{min-height:0;display:flex;flex-direction:column;'
    +   'align-items:center;gap:clamp(6px,1.1vw,12px);}'

    /* ---- head row ---- */
    + '.cwl-headrow{display:flex;justify-content:flex-end;gap:8px;width:100%;flex-wrap:wrap;}'
    + '.cwl-chipbtn,.cwl-chip{display:inline-flex;align-items:center;gap:7px;'
    +   'font-family:var(--lcs-font-body);font-weight:800;font-size:13.5px;'
    +   'color:var(--lcs-structure);background-color:var(--lcs-surface);'
    +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
    +   'padding:7px 14px;min-height:44px;box-shadow:var(--lcs-shadow-sm);cursor:pointer;}'
    + '.cwl-chipbtn:hover,.cwl-chip:hover{background-color:var(--lcs-structure-soft);}'
    + '.cwl-keychip.on{background-color:var(--lcs-structure);color:var(--lcs-surface);'
    +   'border-color:var(--lcs-structure);}'
    + '.cwl-keyglyph{display:grid;place-items:center;width:18px;height:18px;}'
    + '.cwl-keyglyph svg{width:100%;height:100%;}'
    + '@media (max-width:560px){.cwl-keytext{display:none;}}'

    /* ---- the date line ---- */
    + '.cwl-dateline{display:flex;align-items:center;justify-content:center;gap:10px;'
    +   'width:100%;cursor:pointer;background-color:transparent;border:none;'
    +   'font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(24px,3.6vw,52px);color:var(--lcs-ink);line-height:1.14;'
    +   'text-align:center;flex-wrap:wrap;padding:0;}'
    /* ⭐ the HOT words are the ones that change DAILY — weekday and date
       word. The old build tinted the month, which does not change for a
       month, and left the date word (the thing being learned) plain. */
    + '.cwl-hot{color:#C2562F;}'
    + '.cwl-spk{color:var(--lcs-structure);display:inline;vertical-align:middle;}'

    /* ---- the persistent readouts ---- */
    + '.cwl-readouts{display:flex;align-items:center;justify-content:center;'
    +   'gap:10px;flex-wrap:wrap;width:100%;}'
    + '.cwl-ro{display:inline-flex;align-items:center;gap:6px;'
    +   'font-family:var(--lcs-font-body);font-weight:700;font-size:14px;'
    +   'color:var(--lcs-ink-soft);background-color:var(--lcs-surface);'
    +   'border-radius:var(--lcs-radius-pill);padding:6px 14px;min-height:34px;'
    +   'box-shadow:var(--lcs-shadow-sm);}'
    + '.cwl-ro b{font-family:var(--lcs-font-display);font-size:17px;color:var(--lcs-structure);}'
    + '.cwl-roicon{width:20px;height:20px;display:inline-grid;place-items:center;}'
    + '.cwl-roicon svg{width:100%;height:100%;}'
    + '.cwl-cd{display:inline-flex;align-items:center;gap:9px;min-height:44px;'
    +   'padding:6px 16px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
    +   'background-color:#FDEEE6;border:1.5px solid #F2C3AC;box-shadow:var(--lcs-shadow-sm);}'
    + '.cwl-cd.now{background-color:#C2562F;border-color:#C2562F;color:#fff;}'
    + '.cwl-cdicon{width:22px;height:22px;color:#8A3B1C;display:inline-grid;place-items:center;}'
    + '.cwl-cd.now .cwl-cdicon{color:#fff;}'
    + '.cwl-cdicon svg{width:100%;height:100%;}'
    + '.cwl-cdbig{font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(17px,1.9vw,24px);color:#8A3B1C;}'
    + '.cwl-cd.now .cwl-cdbig,.cwl-cd.now .cwl-cdnow{color:#fff;}'
    + '.cwl-cdnow{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(17px,1.9vw,24px);}'
    + '.cwl-cdsmall{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
    +   'color:#6B4A3A;border-left:1.5px solid #F2C3AC;padding-left:9px;}'
    + '.cwl-cdname{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
    +   'color:var(--lcs-ink-soft);max-width:15ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
    + '.cwl-cd.now .cwl-cdname{color:#FDEEE6;}'
    /* z-index 80: above the scrim (70) and above the dialogs (71),
       because a mark is removed from inside a dialog */
    /* ⚠ FIXED, NOT ABSOLUTE. Measured: anchored to the card it landed
       at y=907 in a 900px viewport and elementFromPoint returned
       nothing — the card is content-driven and taller than the
       window, so its bottom is not the screen's bottom. */
    + '.cwl-counttogether{display:inline-flex;align-items:center;min-height:44px;'
    +   'padding:9px 16px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
    +   'font-family:var(--lcs-font-body);font-weight:800;font-size:13.5px;'
    +   'color:var(--lcs-surface);background-color:var(--lcs-structure);border:none;'
    +   'box-shadow:var(--lcs-shadow-sm);}'
    + '.cwl-undochip{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);'
    +   'z-index:80;font-family:var(--lcs-font-body);font-weight:800;font-size:14px;'
    +   'color:var(--lcs-surface);background-color:var(--lcs-structure);border:none;'
    +   'border-radius:var(--lcs-radius-pill);padding:11px 22px;min-height:44px;cursor:pointer;'
    +   'box-shadow:0 6px 18px rgba(20,30,28,.28);}'

    /* ---- month header ---- */
    + '.cwl-monthrow{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}'
    + '.cwl-monthtitle{margin:0;font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(18px,2.2vw,32px);color:var(--lcs-structure);}'
    + '.cwl-monav{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;'
    +   'color:var(--lcs-structure);background-color:var(--lcs-surface);'
    +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;border:none;}'
    + '.cwl-todaybtn{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
    +   'padding:10px 16px;min-height:44px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
    +   'background-color:var(--lcs-structure);color:var(--lcs-surface);border:none;}'
    + '.cwl-strips{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;}'
    + '.cwl-strip{font-family:var(--lcs-font-body);font-weight:700;font-size:clamp(12px,1.3vw,16px);'
    +   'color:var(--lcs-ink-soft);background-color:var(--lcs-surface);'
    +   'border-radius:var(--lcs-radius-pill);padding:4px 14px;box-shadow:var(--lcs-shadow-sm);}'
    + '.cwl-strip.hot{color:var(--lcs-ink);background-color:#FDEEE6;}'
    + '@media (max-width:480px){.cwl-strip:not(.hot){display:none;}}'
    /* tight mode: the same trim the old projector block made, but fired
       from a measurement instead of from a media query that could not
       reach the surface it was written for */
    + '.cwl-wrap.cwl-tight .cwl-strip:not(.hot){display:none;}'
    + '.cwl-wrap.cwl-tight .cwl-dateline{font-size:clamp(20px,2.6vw,32px);}'
    + '.cwl-wrap.cwl-tight .cwl-monthtitle{font-size:clamp(17px,1.8vw,24px);}'
    + '.cwl-wrap.cwl-tight{gap:6px;}'
    + '.cwl-wrap.cwl-tight .cwl-mat{padding:6px;}'

    /* ---- THE MAT: felt, with a co-prime tooth ----
       5px and 7px can never phase into a lattice and can never be
       counted, and a countable mark on a counting surface is a defect. */
    + '.cwl-mat{width:100%;min-height:0;margin-inline:auto;padding:clamp(6px,0.9vw,14px);'
    +   'border-radius:var(--lcs-radius);display:flex;flex-direction:column;'
    +   'background-color:#146B5E;'
    +   'background-image:repeating-linear-gradient(63deg,rgba(255,255,255,.030) 0 1px,rgba(255,255,255,0) 1px 5px),'
    +     'repeating-linear-gradient(-29deg,rgba(6,44,38,.045) 0 1px,rgba(6,44,38,0) 1px 7px),'
    +     'radial-gradient(122% 92% at 50% -12%,rgba(255,255,255,.070) 0%,rgba(255,255,255,0) 46%);'
    +   'box-shadow:inset 0 2px 5px rgba(6,44,38,.34),inset 0 -1px 0 rgba(255,255,255,.10),'
    +     '0 10px 26px -14px rgba(20,30,28,.45);}'
    + '.cwl-wdrow{display:grid;grid-template-columns:repeat(7,1fr);gap:clamp(3px,0.5vw,8px);'
    +   'margin-bottom:clamp(3px,0.5vw,8px);}'
    + '.cwl-wd{text-align:center;font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(11px,1.1vw,18px);color:#EAF6F2;text-transform:uppercase;'
    +   'letter-spacing:.04em;padding:3px 0;overflow:hidden;white-space:nowrap;}'
    + '.cwl-wd abbr{text-decoration:none;color:inherit;}'
    /* ⚠ the weekday form is chosen by a CONTAINER query, not by reading
       window.innerWidth at paint time — the window is not the box the
       grid lives in, and a value read at the last repaint is stale after
       any resize that did not repaint. */
    + '.cwl-mat{container-type:inline-size;}'
    + '.cwl-wd-l{display:none;}.cwl-wd-s{display:none;}.cwl-wd-n{display:inline;}'
    + '@container (min-width:430px){.cwl-wd-n{display:none;}.cwl-wd-s{display:inline;}}'
    + '@container (min-width:820px){.cwl-wd-s{display:none;}.cwl-wd-l{display:inline;}}'

    /* ---- THE GRID: the ratio lives HERE, never on the cell ----
       aspect-ratio + min-height on the ITEM forced its width past the 1fr
       track and clipped the seventh column at 360; the previous build
       records the pixel proof. max-height lets the board SHRINK rather
       than clip when the row is short, which is what makes the old
       clipping defect structurally impossible. */
    + '.cwl-grid{display:grid;grid-template-columns:repeat(7,1fr);'
    +   'grid-template-rows:repeat(var(--rows,6),1fr);gap:clamp(3px,0.5vw,8px);'
    +   'width:100%;aspect-ratio:7 / calc(var(--rows,6) * 1.04);'
    +   'margin-inline:auto;}'

    /* ---- ONE CELL ---- */
    + '.cwl-cell{position:relative;container-type:inline-size;display:block;padding:0;'
    +   'border:none;border-radius:10px;cursor:pointer;min-width:0;min-height:0;overflow:hidden;'
    +   'background-color:#EFE3C8;'
    +   'background-image:repeating-linear-gradient(90deg,rgba(120,96,58,.055) 0 1px,rgba(120,96,58,0) 1px 3px);'
    +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -1px 0 rgba(93,72,45,.14),'
    +     '0 1px 0 rgba(93,72,45,.18);}'
    + '.cwl-cell.empty{background-color:transparent;background-image:none;box-shadow:none;cursor:default;}'
    /* the future day KEEPS ITS NUMBER, blind-embossed into the card back:
       #735F44 on #EFE3C8 is 4.78:1, i.e. real content, and the 1px white
       underline is the emboss and costs no contrast */
    + '.cwl-cellnum{position:absolute;left:8%;top:5%;line-height:1;'
    +   'font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(13px,30cqw,34px);color:#735F44;'
    +   'text-shadow:0 1px 0 rgba(255,255,255,.55);}'
    + '.cwl-ord{position:absolute;right:7%;top:6%;line-height:1;'
    +   'font-family:var(--lcs-font-body);font-weight:800;'
    +   'font-size:clamp(9px,16cqw,17px);color:#146B5E;opacity:.9;}'
    /* a day the class was here is stamped and slightly SUNK */
    + '.cwl-cell.counted{background-color:#FFFDF7;background-image:none;'
    +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.92),inset 0 2px 4px -2px rgba(93,72,45,.22),'
    +     'inset 0 -1px 0 rgba(93,72,45,.10),0 1px 0 rgba(93,72,45,.16);}'
    + '.cwl-cell.counted .cwl-cellnum{color:#5F5A50;text-shadow:none;}'
    /* the weekend is a DRAWN BAND, not a mint hue that dies in greyscale
       and is 2.64:1 against its own numeral */
    + '.cwl-cell.off-day{background-color:#E8DCC2;'
    +   'background-image:linear-gradient(180deg,rgba(93,72,45,.10) 0 34%,rgba(93,72,45,0) 34%);}'
    + '.cwl-cell.off-day .cwl-cellnum{color:#7A6952;}'
    /* ⭐ a day the class was NOT there is a card that was never turned —
       a third channel that is not a badge and not a colour */
    + '.cwl-cell.ev-off::before{content:"";position:absolute;inset:0;border-radius:inherit;'
    +   'pointer-events:none;z-index:1;'
    +   'background-image:repeating-linear-gradient(-45deg,rgba(14,81,71,.20) 0 3px,rgba(14,81,71,0) 3px 9px);}'
    /* the pattern card: a discrete TAB along the bottom of a placed day.
       The old tints were 1.03-1.08:1 and their dots 1.17-1.22:1 —
       invisible to everybody, and a period-2 or -3 run across seven
       columns renders as a diagonal moire because 7 is coprime with both. */
    + '.cwl-cell.pat::after{content:"";position:absolute;left:14%;right:14%;bottom:0;height:6px;'
    +   'border-radius:3px 3px 0 0;pointer-events:none;z-index:2;}'
    + '.cwl-cell.pat.p0::after{background-color:#146B5E;}'
    + '.cwl-cell.pat.p1::after{background-color:#EFE3C8;box-shadow:inset 0 0 0 1px rgba(93,72,45,.45);}'
    + '.cwl-cell.pat.p2::after{background-image:repeating-linear-gradient(90deg,#146B5E 0 5px,rgba(20,107,94,0) 5px 10px);}'
    /* ⭐ TODAY IS PINNED, NOT ROTATED. rotate(-2deg) scale(1.12) made
       today physically overlap both neighbours — which would occlude
       their marks — and a tilt reads as MISALIGNMENT when nothing else
       on the board is off-axis. A strip of cotton tape says today. */
    + '.cwl-cell.today{background-color:#FFFDF7;background-image:none;'
    +   'transform:translateY(-2px);z-index:3;'
    +   'box-shadow:0 6px 14px -4px rgba(20,30,28,.38),0 2px 0 rgba(93,72,45,.20),'
    +     'inset 0 1px 0 rgba(255,255,255,.95);}'
    + '.cwl-cell.today::after{content:"";position:absolute;left:-2%;right:-2%;top:10%;height:15%;'
    +   'background-color:#C2562F;z-index:1;pointer-events:none;border-radius:2px;'
    +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 1px 0 rgba(58,32,14,.22);}'
    + '.cwl-cell.today.pat::after{top:auto;bottom:0;left:14%;right:14%;height:6px;border-radius:3px 3px 0 0;}'
    + '.cwl-cell.today .cwl-cellnum{color:#0E5147;z-index:2;text-shadow:none;}'
    + '.cwl-cell:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:2px;z-index:4;}'

    /* the marks: one ink, one ground, so there is no colour to be blind to */
    + '.cwl-marks{position:absolute;right:6%;bottom:5%;display:flex;gap:5%;'
    +   'align-items:flex-end;pointer-events:none;z-index:2;}'
    + '.cwl-mark{width:clamp(13px,32cqw,34px);aspect-ratio:1;border-radius:50%;'
    +   'display:grid;place-items:center;flex:0 0 auto;'
    +   'background-color:#FBF3E4;color:#0E5147;'
    +   'box-shadow:0 0 0 1px rgba(93,72,45,.30),0 1px 1.5px rgba(58,32,14,.26);}'
    + '.cwl-marks[data-n="2"] .cwl-mark{width:clamp(11px,25cqw,27px);}'
    + '.cwl-mark .cwl-ev{width:72%;height:72%;display:block;}'
    /* the weather stamp is dropped on a small cell: the month pictograph
       carries the record and a deliberate mark outranks an observation */
    + '.cwl-cellw{position:absolute;left:7%;bottom:5%;width:clamp(12px,26cqw,26px);'
    +   'aspect-ratio:1;z-index:2;}'
    + '.cwl-cellw svg{width:100%;height:100%;}'
    + '@container (max-width:44px){.cwl-cellw{display:none;}}'
    + '.cwl-pathn{position:absolute;inset:0;display:grid;place-items:center;z-index:3;'
    +   'font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(16px,40cqw,44px);'
    +   'color:#fff;background-color:rgba(194,86,47,.92);border-radius:inherit;}'
    + '.cwl-patq{font-family:var(--lcs-font-body);font-weight:700;font-size:14px;'
    +   'color:var(--lcs-structure);display:flex;align-items:center;gap:8px;}'
    + '.cwl-patcard{width:26px;height:9px;border-radius:4px 4px 0 0;display:inline-block;}'
    + '.cwl-patcard.p0{background-color:#146B5E;}'
    + '.cwl-patcard.p1{background-color:#EFE3C8;box-shadow:inset 0 0 0 1px rgba(93,72,45,.45);}'
    + '.cwl-patcard.p2{background-image:repeating-linear-gradient(90deg,#146B5E 0 5px,rgba(20,107,94,0) 5px 10px);}'
    + '.cwl-patcard.hidden{background-color:#EFE3C8;box-shadow:inset 0 0 0 1px rgba(93,72,45,.45);'
    +   'background-image:repeating-linear-gradient(90deg,rgba(120,96,58,.22) 0 1px,rgba(120,96,58,0) 1px 3px);}'
    + '.cwl-patq{cursor:pointer;border:none;background-color:transparent;min-height:44px;}'

    /* ---- dock ---- */
    + '.cwl-dock{display:flex;align-items:center;justify-content:center;gap:8px;'
    +   'width:100%;flex-wrap:wrap;}'
    + '.cwl-dockchip{display:inline-flex;align-items:center;gap:8px;min-height:48px;'
    +   'padding:8px 18px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
    +   'font-family:var(--lcs-font-display);font-weight:700;font-size:15px;'
    +   'color:var(--lcs-structure);background-color:var(--lcs-surface);'
    +   'border:1.5px solid var(--lcs-line);box-shadow:var(--lcs-shadow-sm);}'
    + '.cwl-dockchip.active{background-color:var(--lcs-structure);color:var(--lcs-surface);'
    +   'border-color:var(--lcs-structure);}'
    + '.cwl-dockicon{display:grid;place-items:center;}'
    + '.cwl-nav{width:48px;height:48px;flex:0 0 auto;display:grid;place-items:center;'
    +   'border-radius:50%;border:none;background-color:var(--lcs-surface);'
    +   'box-shadow:var(--lcs-shadow-sm);color:var(--lcs-structure);cursor:pointer;}'
    + '@media (max-width:560px){'
    +   '.cwl-docklabel{display:none;}'
    +   '.cwl-dockchip{min-width:48px;justify-content:center;padding:8px 12px;border-radius:50%;}'
    + '}'

    /* ---- counter ---- */
    + '.cwl-counter{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.2vw,16px);width:100%;}'
    + '.cwl-repr-row{display:flex;align-items:center;justify-content:center;'
    +   'gap:clamp(10px,1.6vw,26px);flex-wrap:wrap;width:100%;}'
    + '.cwl-eq{font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(26px,3.4vw,52px);color:var(--lcs-structure);}'
    + '.cwl-jars{display:flex;gap:clamp(8px,1.2vw,18px);align-items:flex-end;}'
    + '.cwl-jarcol{display:flex;flex-direction:column;align-items:center;gap:6px;}'
    + '.cwl-jar{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;gap:2px;'
    +   'min-width:70px;max-width:160px;min-height:92px;padding:10px 8px 6px;'
    +   'background-color:var(--lcs-surface-2);border:2px solid #E2F0EC;'
    +   'border-radius:6px 6px 16px 16px;position:relative;'
    +   'box-shadow:inset 0 3px 8px rgba(20,30,28,.08),inset 0 -2px 0 rgba(255,255,255,.7);}'
    + '.cwl-jaritem{display:inline-flex;transition:transform .26s var(--lcs-ease),opacity .3s;}'
    + '.cwl-jaritem .cwl-straw{width:9px;height:44px;}'
    + '.cwl-jaritem .cwl-bundle{width:44px;height:48px;}'
    + '.cwl-jaritem .cwl-hundred{width:62px;height:52px;}'
    /* --i IS SET IN JS, which is why this actually gathers now */
    + '.cwl-jar.gather .cwl-jaritem{transform:translateX(calc((4.5 - var(--i,0)) * 3px)) scale(.94);}'
    + '.cwl-jar.tied::after{content:"";position:absolute;left:10%;right:10%;top:46%;height:9px;'
    +   'border-radius:5px;background-color:var(--lcs-structure);}'
    + '.cwl-jar.handoff .cwl-jaritem{opacity:0;transform:translateY(-30px);}'
    + '.cwl-jarlabel{font-family:var(--lcs-font-body);font-weight:800;font-size:clamp(10px,1.1vw,14px);'
    +   'color:var(--lcs-ink-soft);text-transform:uppercase;letter-spacing:.05em;}'
    + '.cwl-frame-panel{display:flex;flex-direction:column;align-items:center;gap:6px;'
    +   'padding-left:clamp(8px,1.2vw,20px);border-left:2px dashed var(--lcs-line);}'
    + '.cwl-tf{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;'
    +   'background-color:var(--lcs-structure);padding:7px;border-radius:12px;}'
    + '.cwl-tfcell{width:clamp(20px,2.6vw,40px);aspect-ratio:1;background-color:var(--lcs-surface);'
    +   'border-radius:7px;display:grid;place-items:center;}'
    /* the empty cells are the ANSWER to "how many more to the next ten",
       which is what stops this being a second copy of the ones jar */
    + '.cwl-tfcell.gap{background-color:rgba(255,255,255,.35);'
    +   'box-shadow:inset 0 0 0 2px rgba(255,255,255,.55);}'
    + '.cwl-dot{width:68%;height:68%;border-radius:50%;background-color:#C2562F;'
    +   'box-shadow:inset 0 -3px 0 rgba(0,0,0,.12);}'
    + '.cwl-numpanel{display:flex;align-items:center;}'
    + '.cwl-numeral{display:flex;background-color:var(--lcs-surface);border-radius:var(--lcs-radius);'
    +   'padding:clamp(6px,0.9vw,16px) clamp(12px,1.6vw,26px);box-shadow:var(--lcs-shadow);}'
    /* the counter numeral used to be 3.7x the date line at 2560, which
       inverted the tool's own stated hierarchy; 2.1x is enough */
    + '.cwl-digit{font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(48px,7.2vw,112px);line-height:1;color:var(--lcs-structure);}'
    + '.cwl-dayslabel{font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(15px,1.7vw,24px);color:var(--lcs-ink-soft);}'
    + '.cwl-advance{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;}'
    + '.cwl-plusone{font-family:var(--lcs-font-display);font-weight:800;'
    +   'font-size:clamp(17px,1.9vw,24px);padding:14px 30px;border-radius:var(--lcs-radius-pill);'
    +   'cursor:pointer;background-color:#C2562F;color:#fff;border:none;min-height:56px;'
    +   'box-shadow:0 4px 0 0 #8A3B1C,0 6px 14px rgba(20,30,28,.14);}'
    + '.cwl-plusone:active{transform:translateY(3px);box-shadow:0 1px 0 0 #8A3B1C;}'
    + '.cwl-counted,.cwl-closed{font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(15px,1.6vw,20px);color:var(--lcs-structure);'
    +   'background-color:var(--lcs-structure-soft);padding:12px 22px;'
    +   'border-radius:var(--lcs-radius-pill);min-height:44px;display:inline-flex;align-items:center;}'
    + '.cwl-closed{color:var(--lcs-ink-soft);background-color:var(--lcs-surface-2);}'
    + '.cwl-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;'
    +   'color:var(--lcs-structure);background-color:transparent;border:none;cursor:pointer;'
    +   'text-decoration:underline;padding:10px 8px;min-height:44px;}'
    + '.cwl-linkbtn.danger{color:#A8461F;}'
    + '.cwl-pencil{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;'
    +   'color:var(--lcs-ink-soft);background-color:var(--lcs-surface);border:none;'
    +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;}'
    + '.cwl-stepper{display:flex;align-items:center;gap:8px;}'
    + '.cwl-stepbtn{width:44px;height:44px;border-radius:50%;font-size:24px;cursor:pointer;'
    +   'font-family:var(--lcs-font-display);background-color:var(--lcs-surface);'
    +   'color:var(--lcs-structure);box-shadow:var(--lcs-shadow-sm);border:1.5px solid var(--lcs-line);}'
    + '.cwl-stepinput{width:88px;min-height:44px;text-align:center;'
    +   'font-family:var(--lcs-font-display);font-weight:700;font-size:22px;padding:8px;'
    +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
    +   'background-color:var(--lcs-surface);color:var(--lcs-ink);}'
    + '.cwl-lastyear{font-family:var(--lcs-font-body);font-weight:700;font-size:14px;color:var(--lcs-ink-soft);}'

    /* ---- weather, laid down ---- */
    + '.cwl-wq{text-align:center;font-family:var(--lcs-font-display);font-weight:700;'
    +   'font-size:clamp(16px,1.9vw,26px);color:var(--lcs-ink);}'
    + '.cwl-picker{display:flex;justify-content:center;gap:clamp(8px,1.1vw,16px);flex-wrap:wrap;}'
    + '.cwl-wbtn{display:flex;flex-direction:column;align-items:center;gap:6px;'
    +   'width:clamp(64px,7vw,104px);min-height:44px;padding:10px 6px;border-radius:14px;cursor:pointer;'
    +   'background-image:linear-gradient(180deg,#FFFEFB 0%,#F7EBD3 100%);border:none;'
    +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 3px 0 0 #E6D8AF,0 5px 10px rgba(20,30,28,.10);}'
    + '.cwl-wicon{width:70%;aspect-ratio:1;}'
    + '.cwl-wicon svg{width:100%;height:100%;}'
    + '.cwl-wlabel{font-family:var(--lcs-font-body);font-weight:800;font-size:clamp(11px,1.1vw,15px);color:var(--lcs-ink);}'
    + '.cwl-todaypill{display:inline-flex;align-items:center;gap:10px;min-height:52px;'
    +   'padding:8px 20px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
    +   'font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(15px,1.8vw,21px);'
    +   'color:var(--lcs-ink);background-color:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
    +   'box-shadow:var(--lcs-shadow-sm);align-self:center;}'
    + '.cwl-pillicon{width:32px;height:32px;}'
    + '.cwl-pillicon svg{width:100%;height:100%;}'
    + '.cwl-pillchange{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;'
    +   'color:var(--lcs-structure);text-decoration:underline;}'
    + '.cwl-chart{width:100%;display:flex;flex-direction:column;gap:4px;'
    +   'background-color:var(--lcs-surface);border-radius:var(--lcs-radius);'
    +   'border:1.5px solid var(--lcs-line);padding:clamp(8px,1.1vw,18px);min-height:0;}'
    + '.cwl-wrow{display:grid;grid-template-columns:minmax(86px,auto) 1fr auto;'
    +   'align-items:center;gap:10px;min-height:40px;}'
    + '.cwl-wkey{display:flex;align-items:center;gap:7px;}'
    /* the key is the UNIT at full strength — a faded copy is not the
       same mark, and matching a stamp to its row is the whole skill */
    + '.cwl-wkeyicon{width:30px;height:30px;flex:0 0 auto;}'
    + '.cwl-wkeyicon svg{width:100%;height:100%;}'
    + '.cwl-wkeylabel{font-family:var(--lcs-font-body);font-weight:800;font-size:12.5px;'
    +   'color:var(--lcs-ink-soft);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
    + '.cwl-wtrack{display:flex;flex-wrap:wrap;align-items:center;gap:2px;min-width:0;'
    +   'border-bottom:1px solid rgba(20,107,94,.10);}'
    + '.cwl-stamp{width:clamp(22px,2.4vw,30px);aspect-ratio:1;flex:0 0 auto;}'
    /* grouped in fives: strict 1:1 preserved, and a run of seventeen
       becomes readable without a numeral */
    + '.cwl-stamp.five{margin-inline-end:10px;}'
    + '.cwl-stamp svg{width:100%;height:100%;}'
    + '.cwl-wcount{font-family:var(--lcs-font-display);font-weight:700;font-size:17px;'
    +   'color:var(--lcs-structure);min-width:2ch;text-align:right;}'
    + '.cwl-prompt{text-align:center;font-family:var(--lcs-font-body);font-weight:700;'
    +   'font-size:clamp(13px,1.4vw,17px);color:var(--lcs-structure);'
    +   'background-color:var(--lcs-structure-soft);border-radius:var(--lcs-radius-pill);'
    +   'padding:8px 20px;align-self:center;}'
    + '@media (max-width:560px){.cwl-wkeylabel{display:none;}'
    +   '.cwl-wrow{grid-template-columns:36px 1fr auto;}}'

    /* ---- the icon inks ---- */
    + '.cwl-i{display:block;width:100%;height:100%;}'
    + '.cwl-i .i-sky{fill:#6E837C;}.cwl-i .i-solar{fill:#B87A0E;}.cwl-i .i-water{fill:#2E6E8E;}'

    /* ---- gates ---- */
    + '.cwl-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:560px;'
    +   'align-self:center;background-color:#FDEEE6;border-radius:var(--lcs-radius-sm);'
    +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
    + '.cwl-gate a{color:#A8461F;font-weight:800;text-decoration:underline;}'

    /* ---- dialogs ---- */
    + '.cwl-scrim{position:absolute;inset:0;background-color:rgba(38,51,47,.32);'
    +   'opacity:0;pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
    + '.cwl-scrim.open{opacity:1;pointer-events:auto;}'
    + '.cwl-sheetdlg,.cwl-panel{position:absolute;left:50%;top:5%;'
    +   'transform:translateX(-50%) translateY(8px);width:min(540px,94%);max-height:90%;'
    +   'overflow:auto;background-color:var(--lcs-surface);border-radius:var(--lcs-radius);'
    +   'box-shadow:var(--lcs-shadow);z-index:71;opacity:0;pointer-events:none;'
    +   'transition:opacity .2s,transform .2s var(--lcs-ease);display:flex;flex-direction:column;}'
    + '.cwl-sheetdlg.open,.cwl-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
    + '.cwl-sheethead,.cwl-panel-head{display:flex;align-items:center;justify-content:space-between;'
    +   'gap:10px;padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
    + '.cwl-sheetdate,.cwl-panel-title{margin:0;font-family:var(--lcs-font-display);'
    +   'font-weight:700;font-size:17px;color:var(--lcs-ink);}'
    + '.cwl-sheetclose{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;'
    +   'color:var(--lcs-ink-soft);background-color:transparent;border:none;cursor:pointer;flex:0 0 auto;}'
    + '.cwl-sheetbody,.cwl-panel-body{padding:12px 16px 16px;display:flex;flex-direction:column;gap:10px;}'
    + '.cwl-sheetord{margin:0;font-family:var(--lcs-font-body);font-weight:800;font-size:14px;'
    +   'color:var(--lcs-structure);}'
    + '.cwl-sheetnone{margin:0;font-family:var(--lcs-font-body);font-size:13.5px;color:var(--lcs-ink-soft);}'
    + '.cwl-evrow{display:flex;align-items:center;gap:9px;flex-wrap:wrap;padding:8px 10px;'
    +   'border-radius:var(--lcs-radius-sm);background-color:var(--lcs-surface-2);'
    +   'border:1.5px solid var(--lcs-line);}'
    + '.cwl-evsw{width:28px;height:28px;flex:0 0 auto;display:grid;place-items:center;'
    +   'border-radius:50%;background-color:#FBF3E4;color:#0E5147;'
    +   'box-shadow:0 0 0 1px rgba(93,72,45,.30);}'
    + '.cwl-evsw .cwl-ev{width:70%;height:70%;}'
    + '.cwl-evname{flex:1;font-family:var(--lcs-font-body);font-weight:700;font-size:14px;'
    +   'color:var(--lcs-ink);min-width:6ch;}'
    + '.cwl-evask{flex:1 1 100%;font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:#A8461F;}'
    + '.cwl-iconbtn{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;'
    +   'border:none;background-color:transparent;color:var(--lcs-ink-soft);cursor:pointer;flex:0 0 auto;}'
    + '.cwl-iconbtn.on{background-color:var(--lcs-structure);color:#fff;}'
    + '.cwl-iconbtn .cwl-ev{width:20px;height:20px;}'
    + '.cwl-addrow{display:flex;flex-direction:column;gap:9px;padding-top:6px;'
    +   'border-top:1px solid var(--lcs-line);}'
    + '.cwl-addlab{font-family:var(--lcs-font-body);font-weight:800;font-size:12.5px;'
    +   'color:var(--lcs-ink-soft);text-transform:uppercase;letter-spacing:.05em;}'
    + '.cwl-kinds{display:flex;gap:8px;flex-wrap:wrap;}'
    + '.cwl-kind{display:flex;flex-direction:column;align-items:center;gap:5px;'
    +   'padding:9px 8px;min-width:74px;min-height:64px;border-radius:12px;cursor:pointer;'
    +   'background-color:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);}'
    + '.cwl-kind:hover{background-color:var(--lcs-structure-soft);}'
    + '.cwl-kindicon{width:26px;height:26px;display:grid;place-items:center;'
    +   'border-radius:50%;background-color:#FBF3E4;color:#0E5147;'
    +   'box-shadow:0 0 0 1px rgba(93,72,45,.30);}'
    + '.cwl-kindicon .cwl-ev{width:70%;height:70%;}'
    + '.cwl-kindlab{font-family:var(--lcs-font-body);font-weight:700;font-size:11.5px;'
    +   'color:var(--lcs-ink);text-align:center;line-height:1.2;}'
    + '.cwl-inwrap{display:flex;align-items:center;gap:8px;}'
    + '.cwl-titlein,.cwl-renamein{flex:1;min-height:44px;padding:9px 12px;'
    +   'font-family:var(--lcs-font-body);font-size:14.5px;color:var(--lcs-ink);'
    +   'background-color:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
    +   'border-radius:var(--lcs-radius-sm);min-width:0;}'
    + '.cwl-count{font-family:var(--lcs-font-body);font-size:12px;color:var(--lcs-ink-soft);min-width:5ch;}'
    + '.cwl-addopts{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}'
    + '.cwl-spanbox{display:inline-flex;align-items:center;gap:7px;'
    +   'font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:var(--lcs-ink-soft);}'
    + '.cwl-spanin{width:64px;min-height:44px;text-align:center;font-size:15px;'
    +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
    +   'background-color:var(--lcs-surface);color:var(--lcs-ink);}'
    + '.cwl-repbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
    +   'padding:10px 14px;min-height:44px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
    +   'background-color:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);color:var(--lcs-ink-soft);}'
    + '.cwl-repbtn.on{background-color:var(--lcs-structure);color:#fff;border-color:var(--lcs-structure);}'
    + '.cwl-repbtn[disabled],.cwl-spanin[disabled]{opacity:.45;cursor:default;}'
    + '.cwl-sheetw{display:flex;gap:7px;flex-wrap:wrap;padding-top:8px;border-top:1px solid var(--lcs-line);}'
    + '.cwl-wpick{width:46px;height:46px;padding:6px;border-radius:12px;cursor:pointer;'
    +   'background-color:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);}'
    + '.cwl-wpick.on{border-color:var(--lcs-structure);background-color:var(--lcs-structure-soft);}'
    + '.cwl-wpick svg{width:100%;height:100%;}'
    + '.cwl-wallrow{display:flex;align-items:center;gap:10px;padding:10px 14px;flex-wrap:wrap;'
    +   'border-radius:var(--lcs-radius-sm);background-color:var(--lcs-surface-2);'
    +   'border:1.5px solid var(--lcs-line);}'
    + '.cwl-wallrow.active{border-color:var(--lcs-structure);background-color:var(--lcs-structure-soft);}'
    + '.cwl-wallpick{font-family:var(--lcs-font-body);font-weight:800;font-size:15px;color:var(--lcs-ink);'
    +   'background-color:transparent;border:none;cursor:pointer;flex:1;text-align:left;min-height:44px;min-width:6ch;}'
    + '.cwl-wallmeta{font-size:12.5px;color:var(--lcs-ink-soft);font-weight:700;font-family:var(--lcs-font-body);}'
    + '.cwl-newwall{font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;'
    +   'padding:11px 18px;min-height:44px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
    +   'align-self:flex-start;background-color:var(--lcs-surface);'
    +   'border:1.5px solid var(--lcs-structure);color:var(--lcs-structure);}'
    + '.cwl-meetrow,.cwl-patrow{display:flex;align-items:center;gap:7px;flex-wrap:wrap;}'
    + '.cwl-patlabel{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
    +   'color:var(--lcs-ink-soft);flex:1 1 100%;}'
    + '.cwl-meetbtn,.cwl-patbtn{min-width:44px;min-height:44px;padding:6px 12px;'
    +   'border-radius:var(--lcs-radius-pill);cursor:pointer;font-family:var(--lcs-font-display);'
    +   'font-weight:700;font-size:13px;background-color:var(--lcs-surface-2);'
    +   'border:1.5px solid var(--lcs-line);color:var(--lcs-ink-soft);}'
    + '.cwl-meetbtn.on,.cwl-patbtn.on{background-color:var(--lcs-structure);color:#fff;'
    +   'border-color:var(--lcs-structure);}'
    + '.cwl-confirm{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 14px;'
    +   'background-color:#FDEEE6;border-radius:var(--lcs-radius-sm);}'
    + '.cwl-confirm p{margin:0;font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;'
    +   'color:var(--lcs-ink);flex:1 1 100%;}'
    + '.cwl-btn{font-family:var(--lcs-font-display);font-weight:800;font-size:14px;padding:11px 18px;'
    +   'min-height:44px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
    +   'background-color:var(--lcs-structure);border:none;color:#fff;}'
    + '.cwl-devicenote{margin:2px 0 0;font-family:var(--lcs-font-body);font-size:12.5px;'
    +   'color:var(--lcs-ink-soft);line-height:1.45;}'

    /* ---- the print sheet: hidden on screen, absent when unpaid ---- */
    + '.cwl-sheet{display:none;}'

    + '@media (prefers-reduced-motion: reduce){'
    +   '.cwl-jaritem{transition:none;}'
    +   '.cwl-cell.today{transform:none;}'
    + '}'

    /* ===================================================================
       PRINT.
       ⚠ EVERY RULE IS SCOPED body.cwl-paid. Gating the chip is not gating
       the feature: Ctrl+P is guarded by no button, and a free visitor who
       presses it must get a NORMAL page, not a blank one — which is why
       the chrome-hiding rules are scoped too, not just the sheet.
       ⚠ AND THE SHELL RESET IS PART OF THE CONTRACT: lcs-shell.css ships
       zero @media print blocks, so html,body{height:100%;overflow:hidden}
       and the .lcs-app max-width would otherwise clip the sheet to one
       screenful of a 720px column.
       =================================================================== */
    + '@media print{'
    +   'body.cwl-paid,body.cwl-paid html{height:auto !important;overflow:visible !important;'
    +     'background-color:#fff !important;}'
    +   'body.cwl-paid .lcs-app{max-width:none !important;height:auto !important;'
    +     'overflow:visible !important;box-shadow:none !important;background-image:none !important;'
    +     'background-color:#fff !important;border-radius:0 !important;padding:0 !important;}'
    +   'body.cwl-paid .lcs-header,body.cwl-paid .cwl-wrap,body.cwl-paid .cwl-dock,'
    +     'body.cwl-paid .cwl-chip,body.cwl-paid .cwl-scrim,body.cwl-paid .cwl-sheetdlg,'
    +     'body.cwl-paid .cwl-panel,body.cwl-paid .cwl-gate,body.cwl-paid .lcs-sr-only'
    +     '{display:none !important;}'
    +   'body.cwl-paid .cwl-sheet{display:block !important;}'
    +   '@page{size:landscape;margin:10mm;}'
    + '}'
    /* the sheet itself: borders, strokes and text only — Chrome ships
       "Background graphics" OFF for most teachers, so anything expressed
       as a background-color can come out of the photocopier blank */
    + '.cwl-p-title{font-family:var(--lcs-font-display);font-size:20pt;margin:0 0 2mm;color:#000;}'
    + '.cwl-p-rule{border-bottom:0.7pt solid #444;width:82mm;height:7mm;margin:0 0 3mm;}'
    + '.cwl-p-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:0;width:100%;}'
    + '.cwl-p-wd{font-family:var(--lcs-font-body);font-size:8pt;font-weight:700;'
    +   'text-align:center;padding:1mm 0;border-bottom:0.7pt solid #333;color:#000;}'
    + '.cwl-p-cell{position:relative;border:0.7pt solid #333;border-radius:1mm;'
    +   'aspect-ratio:1/0.78;padding:1mm;}'
    + '.cwl-p-cell.empty{border-color:transparent;}'
    + '.cwl-p-num{font-family:var(--lcs-font-body);font-size:11pt;font-weight:700;color:#000;}'
    + '.cwl-p-ord{position:absolute;right:1.5mm;top:1.5mm;font-size:7pt;color:#333;}'
    + '.cwl-p-cell.weekend{background-image:repeating-linear-gradient(45deg,'
    +   'rgba(0,0,0,.28) 0 0.45pt,rgba(0,0,0,0) 0.45pt 2.2mm);}'
    /* the SAME hatch, denser — so weekend and closed survive in one ink */
    + '.cwl-p-cell.closed{background-image:repeating-linear-gradient(45deg,'
    +   'rgba(0,0,0,.34) 0 0.5pt,rgba(0,0,0,0) 0.5pt 1.6mm);}'
    + '.cwl-p-mark{display:inline-grid;place-items:center;width:4.5mm;height:4.5mm;color:#000;}'
    + '.cwl-p-mark .cwl-ev{width:100%;height:100%;}'
    + '.cwl-p-cell .cwl-p-mark{position:absolute;right:1.2mm;bottom:1.2mm;}'
    + '.cwl-p-legend{list-style:none;margin:4mm 0 0;padding:0;display:flex;flex-wrap:wrap;gap:2mm 8mm;'
    +   'font-family:var(--lcs-font-body);font-size:9pt;color:#000;}'
    + '.cwl-p-legend li{display:flex;align-items:center;gap:1.5mm;}';

    document.head.appendChild(s);
  }
  injectCSS();

  if (typeof window !== 'undefined') window.CalendarWall = CalendarWall;
  if (typeof module !== 'undefined' && module.exports) module.exports = CalendarWall;
}());
