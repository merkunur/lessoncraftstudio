/* =====================================================================
   TOOL #20 — OUR DAY   (our-day.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #20 of the Premium Tools Program
   (Wave 3, Teacher's Desk) — the predictable-routine display: a vertical
   strip of illustrated schedule cards built by tap-append in ~30s, a
   soft sun marker a HUMAN advances (teacher or the schedule helper —
   NEVER the clock: this tool must never compare the clock to the plan),
   gentle folds for finished activities, a friendly 3-tap change ritual
   for anxious kids (old activity stays small + legible: "was: PE"), a
   quiet moon-fold for skipped cards, and a calm display mode for the
   all-day projector.

   PREMIUM: per-card times (5-min picker; analog+digital chip) spoken
   COLLOQUIALLY via the Learning Clock's native-verified TIME_RULES
   (copied VERBATIM below — the formatMoney precedent; learning-clock.js
   is never touched), spoken activity names + advance announcements,
   saved weekly templates (Mon-Fri + 3 free slots, auto-load banner),
   and a same-DOM print stylesheet (the para/sub desk strip).

   LOCALE STRUCTURE (verified against TIME_RULES output): per-locale
   TIME_FRAME with a leading clock-word STRIP for fi/da/no (their pos-0
   emits "kello/klokken/klokka {H}" — a frame supplying its own clock
   word would double-emit); it/pt use the caseless clock-shows frame
   (article-contraction trap avoided); fi has a per-card announce-form
   field (label nominative, announcement partitive). Activity cards are
   a shared core + per-locale concept cards (de Frühstückspause, es-only
   honores a la bandera, pt escovação, Nordic aftercare) — fr ships NO
   religion card (laïcité).

   NO-SHAME: no timers/countdowns/elapsed bars; no clock-vs-plan cues
   EVER; the sun breathes slowly, never blinks; folds read as completion
   (card stays visible all day); speech declarative-warm; no punctuality
   praise. Day-state persists in localStorage (an all-day tool must
   survive a browser crash).

   ---------------------------------------------------------------------
   ⭐ REBUILD 2026-08-07 — what it is for, in one sentence:
   the tool was designed as a BUILDER and shipped as a builder, and the
   six hours a day it spends being a DISPLAY were never designed at all.

   THE INVENTION: the day is one object read at two scales at once — the
   whole day as a ribbon you can point at and count, and the current
   activity as a single card big enough to read from the back row. The
   sun is the only thing that moves between them, and only a person
   moves it.

   THE MOAT: eleven locales of AUTHORED (not translated) school-day
   vocabulary — per-locale concept cards, per-locale announce register,
   fi partitive forms, the fi/da/no clock-word strip — plus a teacher's
   own cards on top of it. No competitor ships a visual timetable that
   speaks Finnish correctly, and none lets a Swedish school put
   morgonsamling on the board at all.

   THE FENCE (§23.3, four surfaces, the occupied parts SUBTRACTED):
     · tools — calendar-wall owns WHICH DAY it is (its own header writes
       the boundary from the other side: "the calendar never shows a
       time; our-day never shows a date"); class-timer owns HOW LONG,
       and already ships the one-minute cue, so this tool must never
       grow a duration; center-board owns rotation INSIDE a block;
       learning-clock owns telling the time (its TIME_RULES are copied
       here verbatim under a byte-drift gate, never imported).
     · activities — none claim it; a daily schedule is not a CCSS skill.
     · the ~240 printable types — nearest are K-208-day-night and the
       G2/G3 clock sheets; neither is a class schedule.
     · the 33 apps — none.
     THE REMAINDER, and what this tool owns: THE ORDER OF TODAY.

   REFUSES, FOREVER:
     1. never compares the clock to the plan — no delta, no "late", no
        tint, no clock-fired anything. It may SHOW a planned time; it
        may never COMPARE one.
     2. never advances itself. A human moves the sun, always.
     3. no timer, countdown, elapsed bar, emptying jar, score, streak,
        or punctuality praise (§20.4).
     4. no record about a child — no per-child note, no name, no
        attendance, no trend (the feelings-check-in doctrine). A custom
        card carries a name, an icon and a colour, and nothing else.
     5. first-then is a LENS on the whole day, never a second schedule
        and never a contingency ("first work, then iPad" is forbidden;
        the next slot is always the actual next card).
     6. no free-text icon. A teacher chooses a symbol; she never draws
        one, and a card can never be text-only — a pre-reader has to be
        able to use this.
     7. no "?" card. You schedule the STRUCTURE of an unknown, never
        the unknown.
     8. the warning stage never animates on its own after the tap.
        Anything still moving is a countdown a child can read.
   ===================================================================== */

/* =====================================================================
   § THE MODEL — pure, total, no DOM.
   Everything a gate needs to prove lives here, so the gate can drive it
   in Node and cannot end up reimplementing the tool (§23.6: a gate that
   reimplements what it checks is testing a copy).

   ⚠ TOTALITY IS LOAD-BEARING. Every entry point coerces and clamps. A
   hand-edited or half-written localStorage blob must not be able to
   throw — `st || newDay()` is NOT total, because it catches null and 0
   and hands `[]` straight through to `.length`.
   ===================================================================== */
var ODM = {

  MAX_CARDS: 16,
  MAX_CUSTOM: 12,
  MAX_NAME: 20,

  /* ---------- day state ----------
     { items:[{id,time,changedFrom,skipped,skipDay,snap}], sunIdx, started, warned }
     sunIdx === items.length  MEANS THE DAY IS FINISHED (a real state,
     not an overflow — the old build had no end and the sun vanished). */
  newDay: function () { return { items: [], sunIdx: 0, started: false, warned: false }; },

  isKey: function (s) { return typeof s === 'string' && s.length > 0 && s.length < 64; },

  coerceTime: function (t) {
    if (!t || typeof t !== 'object') return null;
    var h = Math.floor(Number(t.h)), m = Math.floor(Number(t.m));
    if (!isFinite(h) || !isFinite(m)) return null;
    if (h < 0) h = 0; if (h > 23) h = 23;
    if (m < 0) m = 0; if (m > 59) m = 59;
    m = m - (m % 5);
    return { h: h, m: m };
  },

  /* a snapshot is what makes a custom card safe to delete and a saved
     plan safe to reopen in another locale (the old build stored only an
     id, so a plan saved with `showtell` reloaded in de rendered a
     literal em-dash from NAMES). */
  coerceSnap: function (s) {
    if (!s || typeof s !== 'object') return null;
    if (!this.isKey(s.name)) return null;
    return {
      name: String(s.name).slice(0, this.MAX_NAME),
      icon: this.isKey(s.icon) ? s.icon : 'centers',
      tint: this.isKey(s.tint) ? s.tint : 'teal'
    };
  },

  coerceItem: function (it) {
    if (!it || typeof it !== 'object' || !this.isKey(it.id)) return null;
    return {
      id: it.id,
      time: this.coerceTime(it.time),
      changedFrom: this.isKey(it.changedFrom) ? it.changedFrom : null,
      changedSnap: this.coerceSnap(it.changedSnap),
      skipped: !!it.skipped,
      skipDay: (typeof it.skipDay === 'number' && it.skipDay >= 0 && it.skipDay <= 4) ? it.skipDay : null,
      snap: this.coerceSnap(it.snap)
    };
  },

  coerceDay: function (d) {
    var out = this.newDay(), i, it;
    if (!d || typeof d !== 'object') return out;
    var src = (d.items && d.items.length !== undefined && typeof d.items !== 'string') ? d.items : [];
    for (i = 0; i < src.length && out.items.length < this.MAX_CARDS; i++) {
      it = this.coerceItem(src[i]);
      if (it) out.items.push(it);
    }
    out.started = !!d.started;
    out.warned = !!d.warned;
    var s = Math.floor(Number(d.sunIdx));
    if (!isFinite(s) || s < 0) s = 0;
    if (s > out.items.length) s = out.items.length;
    out.sunIdx = s;
    return out;
  },

  atEnd: function (day) { return day.sunIdx >= day.items.length; },
  isNow: function (day, i) { return day.started && !this.atEnd(day) && i === day.sunIdx; },
  isDone: function (day, i) { return day.started && i < day.sunIdx; },

  /* ⚠ THE PAST IS NOT EDITABLE. The old build's docblock claimed the
     moon-fold was "only for future cards" and the code had no guard of
     any kind, so a finished activity could be cancelled and the tool
     would announce a change about something that had already happened.
     SWAP reaches the current card (doing art instead, starting now, is
     a real classroom event); SKIP does not (you cannot un-happen the
     thing the class is in the middle of — you advance past it). */
  canSwap: function (day, i) { return i >= 0 && i < day.items.length && (!day.started || i >= day.sunIdx); },
  canSkip: function (day, i) { return i >= 0 && i < day.items.length && (!day.started || i > day.sunIdx); },

  /* the next index the sun may LAND on — skipped cards are not stops.
     The old advance() was a bare sunIdx++, so the tool announced
     "Now it's time for Swimming!" about the very card it had just
     moon-folded as not happening today. */
  nextStop: function (day, from) {
    var n = from + 1;
    while (n < day.items.length && day.items[n].skipped) n++;
    return n;                       /* may equal items.length = finished */
  },
  prevStop: function (day, from) {
    var p = from - 1;
    while (p >= 0 && day.items[p].skipped) p--;
    return p;                       /* -1 = nothing to go back to */
  },

  addCard: function (day, cardId, at, snap) {
    if (!this.isKey(cardId)) return false;
    if (day.items.length >= this.MAX_CARDS) return false;
    var item = { id: cardId, time: null, changedFrom: null, changedSnap: null, skipped: false, skipDay: null, snap: this.coerceSnap(snap) };
    if (at === undefined || at === null || at >= day.items.length || at < 0) {
      day.items.push(item);
    } else {
      day.items.splice(at, 0, item);
      /* ⚠ THE SUN MUST NOT DRIFT. removeCard adjusted sunIdx and these
         two did not, so inserting a card ahead of the sun mid-day
         silently rewrote which activities were finished — in a tool
         whose whole thesis is that the day does not change under you. */
      if (at <= day.sunIdx) day.sunIdx++;
    }
    return true;
  },

  removeCard: function (day, idx) {
    if (idx < 0 || idx >= day.items.length) return false;
    day.items.splice(idx, 1);
    if (day.sunIdx > idx) day.sunIdx--;
    if (day.sunIdx > day.items.length) day.sunIdx = day.items.length;
    return true;
  },

  moveCard: function (day, from, to) {
    if (from === to) return false;
    if (from < 0 || from >= day.items.length) return false;
    if (to < 0 || to >= day.items.length) return false;
    /* hold the CURRENT card by identity, move, then re-find it — the
       only way the sun stays on the same activity under a reorder. */
    var cur = this.atEnd(day) ? null : day.items[day.sunIdx];
    var it = day.items.splice(from, 1)[0];
    day.items.splice(to, 0, it);
    if (cur) {
      for (var i = 0; i < day.items.length; i++) if (day.items[i] === cur) { day.sunIdx = i; break; }
    } else {
      day.sunIdx = day.items.length;
    }
    return true;
  },

  startDay: function (day) {
    if (!day.items.length) return false;
    day.started = true;
    day.warned = false;
    var s = 0;
    while (s < day.items.length && day.items[s].skipped) s++;
    day.sunIdx = s;
    return true;
  },

  /* TWO-STAGE ADVANCE. Tap 1 arms the warning; tap 2 crosses. Returns
     'warned' | 'moved' | 'end' | false. The warning is a POSITION and an
     OUTLINE and nothing else — see REFUSE 8. */
  advance: function (day, force) {
    if (this.atEnd(day)) return false;
    var n = this.nextStop(day, day.sunIdx);
    if (!force && !day.warned && n < day.items.length) { day.warned = true; return 'warned'; }
    day.warned = false;
    day.sunIdx = n;
    return this.atEnd(day) ? 'end' : 'moved';
  },

  unAdvance: function (day) {
    if (day.warned) { day.warned = false; return 'unwarned'; }
    var start = this.atEnd(day) ? day.items.length : day.sunIdx;
    var p = this.prevStop(day, start);
    if (p < 0) return false;
    day.sunIdx = p;
    return 'moved';
  },

  swapCard: function (day, idx, newId, snap) {
    if (!this.canSwap(day, idx) || !this.isKey(newId)) return false;
    var it = day.items[idx];
    it.changedFrom = it.id;
    it.changedSnap = it.snap;
    it.id = newId;
    it.snap = this.coerceSnap(snap);
    it.skipped = false;
    it.skipDay = null;
    return true;
  },

  /* the moon-fold. `weekday` (0=Mon..4=Fri) turns a deferral into an
     appointment: the card reads "Thursday" instead of "another day",
     which is the difference between a loss and a plan. */
  skipCard: function (day, idx, weekday) {
    if (!this.canSkip(day, idx)) return false;
    var it = day.items[idx];
    it.skipped = !it.skipped;
    it.skipDay = it.skipped ? ((typeof weekday === 'number' && weekday >= 0 && weekday <= 4) ? weekday : null) : null;
    return true;
  },

  setTime: function (day, idx, h, m) {
    if (idx < 0 || idx >= day.items.length) return false;
    day.items[idx].time = (h === null || h === undefined) ? null : this.coerceTime({ h: h, m: m });
    return true;
  },

  /* ---------- teacher-authored cards ----------
     ⚠ APPEND, NEVER REPLACE, and REFUSE WITH A REASON, NEVER IN SILENCE
     (both bought by syllable-splitter). Returns 'ok' | 'listFull' |
     'tooLong' | 'empty' | 'duplicate'. */
  cleanName: function (s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\uFEFF]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/'/g, '’')
      .trim();
  },
  coerceCustom: function (c) {
    if (!c || typeof c !== 'object') return null;
    var name = this.cleanName(c.name);
    if (!name) return null;
    return {
      id: this.isKey(c.id) ? c.id : ('my:' + name.toLowerCase()),
      name: name.slice(0, this.MAX_NAME),
      icon: this.isKey(c.icon) ? c.icon : 'centers',
      tint: this.isKey(c.tint) ? c.tint : 'teal',
      group: (typeof c.group === 'number' && c.group >= 0 && c.group <= 5) ? c.group : 4
    };
  },
  coerceCustomList: function (list) {
    var out = [], i, c;
    if (!list || list.length === undefined || typeof list === 'string') return out;
    for (i = 0; i < list.length && out.length < this.MAX_CUSTOM; i++) {
      c = this.coerceCustom(list[i]);
      if (c) out.push(c);
    }
    return out;
  },
  addCustom: function (list, name, icon, tint, group, editId) {
    var clean = this.cleanName(name), i;
    if (!clean) return 'empty';
    if (clean.length > this.MAX_NAME) return 'tooLong';
    if (!editId && list.length >= this.MAX_CUSTOM) return 'listFull';
    /* shape AND colour together are what make an invented symbol
       separable at 34px from the back row — two cards sharing both are
       not distinguishable, so the save is refused. */
    for (i = 0; i < list.length; i++) {
      if (editId && list[i].id === editId) continue;
      if (list[i].icon === icon && list[i].tint === tint) return 'duplicate';
      if (list[i].name.toLowerCase() === clean.toLowerCase()) return 'duplicate';
    }
    if (editId) {
      for (i = 0; i < list.length; i++) {
        if (list[i].id === editId) { list[i].name = clean; list[i].icon = icon; list[i].tint = tint; list[i].group = group; return 'ok'; }
      }
      return 'empty';
    }
    list.push(this.coerceCustom({ id: 'my:' + Date.now().toString(36) + ':' + list.length, name: clean, icon: icon, tint: tint, group: group }));
    return 'ok';
  },
  /* ⚠ Deleting a custom card removes it from the PALETTE only. Cards
     already on today's strip or inside a saved plan keep their snapshot
     and stay exactly as they were — a deletion must never silently
     blank a saved Tuesday. */
  removeCustom: function (list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) { list.splice(i, 1); return true; }
    return false;
  },
  findCustom: function (list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  },

  /* ---------- templates ----------
     stored WITH snapshots, so a plan is locale-safe and custom-safe. */
  templateFromDay: function (day) {
    var out = [], i, it;
    for (i = 0; i < day.items.length; i++) {
      it = day.items[i];
      out.push({ id: it.id, time: it.time ? { h: it.time.h, m: it.time.m } : null, snap: it.snap });
    }
    return out;
  },
  dayFromTemplate: function (items) {
    var day = this.newDay(), i, it;
    var src = (items && items.length !== undefined && typeof items !== 'string') ? items : [];
    for (i = 0; i < src.length && day.items.length < this.MAX_CARDS; i++) {
      it = this.coerceItem({ id: src[i] && src[i].id, time: src[i] && src[i].time, snap: src[i] && src[i].snap });
      if (it) day.items.push(it);
    }
    return day;
  }
};

/* =====================================================================
   § THE ART FOR TEACHER-AUTHORED CARDS
   ⚠ THE COLOUR IS THE TILE AND THE SYMBOL IS KNOCKED OUT OF IT IN CREAM.
   A teacher cannot judge contrast, so she is never asked to: cream on
   any of these six tints is >=3:1 by construction, it greyscales cleanly
   at the 14mm print size, and a solid tile with a hole in it is the
   strongest mark available at the 16px plan-thumbnail size. Sky #9CC3E5
   and lilac #C9A8E0 are deliberately ABSENT as tile fills — cream on
   either is under 2:1.
   ===================================================================== */
var ODM_TINTS = ['#146B5E', '#F2784B', '#E0A63C', '#7FA860', '#8A6B4A', '#B08CD0'];

var ODM_GLYPHS = {
  /* the six she reaches for first */
  star:    '<path d="M24 10l4.4 8.9 9.8 1.4-7.1 6.9 1.7 9.8L24 32.4l-8.8 4.6 1.7-9.8-7.1-6.9 9.8-1.4z" fill="#FFFDF7"/>',
  book:    '<path d="M23 17v19c-3.2-2.1-7.6-3.2-12.4-3.2V13.8c4.8 0 9.2 1.1 12.4 3.2zm2 0v19c3.2-2.1 7.6-3.2 12.4-3.2V13.8c-4.8 0-9.2 1.1-12.4 3.2z" fill="#FFFDF7"/>',
  note:    '<path d="M20 34V14l16-3v19" fill="none" stroke="#FFFDF7" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="16" cy="34" rx="4.8" ry="3.9" fill="#FFFDF7"/><ellipse cx="32" cy="30" rx="4.8" ry="3.9" fill="#FFFDF7"/>',
  ball:    '<circle cx="24" cy="24" r="14" fill="#FFFDF7"/><path d="M24 15l8.3 6-3.2 9.8H18.9L15.7 21z" fill="currentColor"/>',
  hand:    '<path d="M15 32V22a3 3 0 0 1 6 0v-6a3 3 0 0 1 6 0v-2a3 3 0 0 1 6 0v4a3 3 0 0 1 6 0v14c0 6-4.6 10-10.5 10h-3C19.6 42 15 38 15 32z" fill="#FFFDF7"/>',
  bubble:  '<path d="M9 12h30v20H24l-9 8v-8H9z" fill="#FFFDF7"/>',
  /* objects */
  pencil:  '<path d="M12 36l18-18 6 6-18 18-8 2z" fill="#FFFDF7"/><path d="M30 18l4-4 6 6-4 4z" fill="#FFFDF7"/><path d="M30 18l6 6" stroke="currentColor" stroke-width="2.2"/>',
  brush:   '<path d="M14 40c-2 2-6.5 2-6.5 2s0-4.5 2-6.5l16-16 4.5 4.5z" fill="#FFFDF7"/><path d="M30 20l-4.5-4.5 7.5-7.5a3.2 3.2 0 0 1 4.5 4.5z" fill="#FFFDF7"/>',
  scissors:'<circle cx="14" cy="14" r="5" fill="none" stroke="#FFFDF7" stroke-width="3.4"/><circle cx="14" cy="30" r="5" fill="none" stroke="#FFFDF7" stroke-width="3.4"/><path d="M18 17 39 38M18 27 39 8" stroke="#FFFDF7" stroke-width="3.4" stroke-linecap="round"/>',
  bag:     '<path d="M18 18v-3a6 6 0 0 1 12 0v3" fill="none" stroke="#FFFDF7" stroke-width="3" stroke-linecap="round"/><path d="M11 18h26l-2.4 22a3 3 0 0 1-3 2.6H16.4a3 3 0 0 1-3-2.6z" fill="#FFFDF7"/>',
  screen:  '<rect x="9" y="12" width="30" height="20" rx="3" fill="#FFFDF7"/><rect x="13" y="16" width="22" height="12" rx="1.5" fill="currentColor"/><path d="M18 38h12" stroke="#FFFDF7" stroke-width="3.2" stroke-linecap="round"/>',
  bell:    '<path d="M24 9a3 3 0 0 1 3 3v.7c5.2 1.3 9 6 9 11.6v6.3l3 4.4H9l3-4.4v-6.3c0-5.6 3.8-10.3 9-11.6V12a3 3 0 0 1 3-3z" fill="#FFFDF7"/><path d="M19.6 38a4.5 4.5 0 0 0 8.8 0z" fill="#FFFDF7"/>',
  /* nature and weather */
  plant:   '<path d="M14 30h20l-2.4 10a2.6 2.6 0 0 1-2.6 2.2h-10a2.6 2.6 0 0 1-2.6-2.2z" fill="#FFFDF7"/><path d="M24 30V17" stroke="#FFFDF7" stroke-width="2.8" stroke-linecap="round"/><path d="M24 24q-9-1-9-9 9 0 9 9z" fill="#FFFDF7"/><path d="M24 26q9-1 9-9-9 0-9 9z" fill="#FFFDF7"/>',
  tree:    '<path d="M24 8 12 26h5l-7 11h28l-7-11h5z" fill="#FFFDF7"/><rect x="21.5" y="37" width="5" height="6" fill="#FFFDF7"/>',
  leaf:    '<path d="M38 9C19 9 10 18 10 29c0 3.2 1 6.2 2.7 8.7 4.6-8 11.9-13.3 21.3-15.4-7.3 3.5-13.6 8.9-17.7 17.8 3.1 1.6 6.2 2 8.7 2C36.6 42 40.4 27.6 38 9z" fill="#FFFDF7"/>',
  sun:     '<circle cx="24" cy="24" r="9" fill="#FFFDF7"/><path d="M24 7v4m0 26v4M7 24h4m26 0h4M12 12l3 3m18 18 3 3M12 36l3-3m18-18 3-3" stroke="#FFFDF7" stroke-width="3.2" stroke-linecap="round"/>',
  cloud:   '<path d="M17 38a8 8 0 0 1-1-15.9A10 10 0 0 1 35 21a7.5 7.5 0 0 1-1 17z" fill="#FFFDF7"/>',
  drop:    '<path d="M24 8s11 12.6 11 19a11 11 0 0 1-22 0c0-6.4 11-19 11-19z" fill="#FFFDF7"/>',
  /* places, things, food */
  house:   '<path d="M9 24 24 11l15 13" fill="none" stroke="#FFFDF7" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 24v16h22V24z" fill="#FFFDF7"/><rect x="21" y="30" width="6" height="10" fill="currentColor"/>',
  flag:    '<path d="M13 8v34" stroke="#FFFDF7" stroke-width="3.6" stroke-linecap="round"/><path d="M15 11h22l-5 7 5 7H15z" fill="#FFFDF7"/>',
  cup:     '<path d="M12 14h20v14a10 10 0 0 1-20 0z" fill="#FFFDF7"/><path d="M32 18h3.5a5 5 0 0 1 0 10H32" fill="none" stroke="#FFFDF7" stroke-width="3"/><path d="M14 40h20" stroke="#FFFDF7" stroke-width="3.2" stroke-linecap="round"/>',
  apple:   '<path d="M24 15c3-4 12.5-4 13.5 4.2C38.5 28.5 32.3 42 28 42c-2 0-3-1.4-4-1.4S22 42 20 42c-4.3 0-10.5-13.5-9.5-22.8C11.5 11 21 11 24 15z" fill="#FFFDF7"/><path d="M24 15q0-6 6.5-7" fill="none" stroke="#FFFDF7" stroke-width="2.8" stroke-linecap="round"/>',
  clock:   '<circle cx="24" cy="24" r="15" fill="#FFFDF7"/><path d="M24 14v10h8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>',
  block:   '<path d="M24 8l14 8v16l-14 8-14-8V16z" fill="#FFFDF7"/><path d="M24 24 10 16m14 8 14-8m-14 8v16" fill="none" stroke="currentColor" stroke-width="2.2"/>',
  /* play and making */
  shapes:  '<circle cx="15" cy="16" r="6.5" fill="#FFFDF7"/><rect x="26" y="9.5" width="13" height="13" rx="2" fill="#FFFDF7"/><path d="M24 27l9 15H15z" fill="#FFFDF7"/>',
  puzzle:  '<path d="M12 14h8a4 4 0 1 1 8 0h8v8a4 4 0 1 1 0 8v8h-8a4 4 0 1 0-8 0h-8z" fill="#FFFDF7"/>',
  dice:    '<rect x="10" y="10" width="28" height="28" rx="6" fill="#FFFDF7"/><circle cx="18" cy="18" r="3.2" fill="currentColor"/><circle cx="24" cy="24" r="3.2" fill="currentColor"/><circle cx="30" cy="30" r="3.2" fill="currentColor"/>',
  medal:   '<path d="M16.5 20 11 8h8l4.5 9.5m1 0L29 8h8l-5.5 12z" fill="#FFFDF7"/><circle cx="24" cy="31" r="11" fill="#FFFDF7"/><path d="M24 25.5l1.9 3.9 4.3.6-3.1 3 .7 4.3-3.8-2-3.8 2 .7-4.3-3.1-3 4.3-.6z" fill="currentColor"/>',
  camera:  '<path d="M17 15l2.5-4h9l2.5 4h6a3.2 3.2 0 0 1 3.2 3.2v14.6A3.2 3.2 0 0 1 37 36H11a3.2 3.2 0 0 1-3.2-3.2V18.2A3.2 3.2 0 0 1 11 15z" fill="#FFFDF7"/><circle cx="24" cy="25.5" r="7" fill="currentColor"/>',
  globe:   '<circle cx="24" cy="24" r="14" fill="#FFFDF7"/><path d="M10 24h28M24 10q-6 14 0 28M24 10q6 14 0 28" fill="none" stroke="currentColor" stroke-width="2.6"/>',
  /* people and going places */
  smile:   '<circle cx="24" cy="24" r="15" fill="#FFFDF7"/><circle cx="18.5" cy="21" r="2.3" fill="currentColor"/><circle cx="29.5" cy="21" r="2.3" fill="currentColor"/><path d="M17 28q7 6.5 14 0" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>',
  heart:   '<path d="M24 39S9 30 9 21.2A7.2 7.2 0 0 1 24 16.6 7.2 7.2 0 0 1 39 21.2C39 30 24 39 24 39z" fill="#FFFDF7"/>',
  shoe:    '<path d="M9 20v6h9l6 5 12 2a5.5 5.5 0 0 1 5 5.5V41H9z" fill="#FFFDF7"/>',
  boat:    '<path d="M7 32h34l-5.5 9H12.5z" fill="#FFFDF7"/><path d="M24 8v22M24 12l11 16H24" fill="#FFFDF7" stroke="#FFFDF7" stroke-width="2.8" stroke-linejoin="round"/>',
  key:     '<circle cx="17" cy="20" r="8" fill="none" stroke="#FFFDF7" stroke-width="4.2"/><path d="M22.5 26.5 37 41m-6-6 4-4m-8.5-2.5 4-4" stroke="#FFFDF7" stroke-width="4.2" stroke-linecap="round"/>',
  crown:   '<path d="M9 36 7 14l10 7.5L24 9l7 12.5L41 14l-2 22z" fill="#FFFDF7"/><path d="M10 41h28" stroke="#FFFDF7" stroke-width="3.4" stroke-linecap="round"/>'
};

var OurDay = {
  M: ODM,                    /* exposed so a Node gate drives the model
                                without a browser (calendar-wall :817) */
  id: 'our-day',

  strings: {
    title:        {en:'Our Day',de:'Unser Tag',fr:'Notre journée',it:'La nostra giornata',es:'Nuestro día',pt:'Nosso dia',nl:'Onze dag',sv:'Vår dag',da:'Vores dag',no:'Dagen vår',fi:'Meidän päivä'},
    instruction:  {en:'Tap the cards to build today — then tap the sun to move through the day.',de:'Tippt die Karten an und baut euren Tag — dann wandert die Sonne von Karte zu Karte.',fr:'Touchez les cartes pour construire la journée — puis touchez le soleil pour avancer.',it:'Tocca le carte per costruire la giornata — poi tocca il sole per andare avanti.',es:'Toca las tarjetas para armar el día — luego toca el sol para avanzar.',pt:'Toque nos cartões para montar o dia — depois toque no sol para avançar.',nl:'Tik op de kaartjes om de dag te bouwen — tik daarna op de zon om verder te gaan.',sv:'Tryck på korten för att bygga dagen — tryck sedan på solen för att gå vidare.',da:'Tryk på kortene for at bygge dagen — tryk så på solen for at gå videre.',no:'Trykk på kortene for å bygge dagen — trykk så på sola for å gå videre.',fi:'Rakenna päivä napauttamalla kortteja — sitten aurinko kuljettaa päivää eteenpäin.'},
    startDay:     {en:'Start the day',de:'Den Tag beginnen',fr:'Commencer la journée',it:'Inizia la giornata',es:'Empezar el día',pt:'Começar o dia',nl:'De dag beginnen',sv:'Starta dagen',da:'Start dagen',no:'Start dagen',fi:'Aloita päivä'},
    sunAria:      {en:'The sun — tap to move to the next activity',de:'Die Sonne — antippen, dann wandert sie zur nächsten Aktivität',fr:'Le soleil — toucher pour passer à l’activité suivante',it:'Il sole — tocca per passare all’attività successiva',es:'El sol — toca para pasar a la siguiente actividad',pt:'O sol — toque para ir à próxima atividade',nl:'De zon — tik om naar de volgende activiteit te gaan',sv:'Solen — tryck för att gå till nästa aktivitet',da:'Solen — tryk for at gå til næste aktivitet',no:'Sola — trykk for å gå til neste aktivitet',fi:'Aurinko — napauta siirtyäksesi seuraavaan puuhaan'},
    backAria:     {en:'Back one step',de:'Einen Schritt zurück',fr:'Reculer d’une étape',it:'Indietro di un passo',es:'Un paso atrás',pt:'Voltar um passo',nl:'Eén stap terug',sv:'Ett steg tillbaka',da:'Et trin tilbage',no:'Ett steg tilbake',fi:'Askel taaksepäin'},
    editChip:     {en:'Edit',de:'Bearbeiten',fr:'Modifier',it:'Modifica',es:'Editar',pt:'Editar',nl:'Bewerken',sv:'Ändra',da:'Rediger',no:'Rediger',fi:'Muokkaa'},
    doneChip:     {en:'Done',de:'Fertig',fr:'Terminé',it:'Fatto',es:'Listo',pt:'Pronto',nl:'Klaar',sv:'Klar',da:'Færdig',no:'Ferdig',fi:'Valmis'},
    changeTitle:  {en:'Something changed today',de:'Heute ist etwas anders',fr:'Quelque chose a changé aujourd’hui',it:'Oggi qualcosa è cambiato',es:'Hoy algo cambió',pt:'Hoje algo mudou',nl:'Er is vandaag iets veranderd',sv:'Något är annorlunda i dag',da:'Noget er anderledes i dag',no:'Noe er annerledes i dag',fi:'Tänään jokin muuttui'},
    changeSwap:   {en:'Swap it',de:'Tauschen',fr:'Remplacer',it:'Cambia',es:'Cambiarla',pt:'Trocar',nl:'Ruilen',sv:'Byt ut',da:'Byt den ud',no:'Bytt ut',fi:'Vaihda'},
    changeRemove: {en:'Remove it',de:'Herausnehmen',fr:'Retirer',it:'Togli',es:'Quitarla',pt:'Tirar',nl:'Weghalen',sv:'Ta bort',da:'Tag den ud',no:'Ta bort',fi:'Poista'},
    changeAddB:   {en:'Add before',de:'Davor einfügen',fr:'Ajouter avant',it:'Aggiungi prima',es:'Agregar antes',pt:'Adicionar antes',nl:'Ervoor toevoegen',sv:'Lägg till före',da:'Tilføj før',no:'Legg til før',fi:'Lisää edelle'},
    changeAddA:   {en:'Add after',de:'Danach einfügen',fr:'Ajouter après',it:'Aggiungi dopo',es:'Agregar después',pt:'Adicionar depois',nl:'Erna toevoegen',sv:'Lägg till efter',da:'Tilføj efter',no:'Legg til etter',fi:'Lisää perään'},
    wasLabel:     {en:'was: {name}',de:'vorher: {name}',fr:'avant : {name}',it:'prima: {name}',es:'antes: {name}',pt:'antes: {name}',nl:'eerst: {name}',sv:'förut: {name}',da:'før: {name}',no:'før: {name}',fi:'aiemmin: {name}'},
    changeSpoken: {en:'Change: today we have {nw} instead of {old}.',de:'Heute ist etwas anders: Wir haben {nw} statt {old}.',fr:'Changement : aujourd’hui, c’est {nw} qui remplace {old}.',it:'Cambio di programma: oggi c’è {nw}, non {old}.',es:'Cambio: hoy cambiamos {old} por {nw}.',pt:'Mudança: hoje temos {nw}, e não {old}.',nl:'Verandering: vandaag hebben we {nw} in plaats van {old}.',sv:'Ändring: i dag har vi {nw} i stället för {old}.',da:'Ændring: i dag har vi {nw} i stedet for {old}.',no:'Endring: i dag har vi {nw} i stedet for {old}.',fi:'Muutos: tänään on {nw}, ei {old}.',},
    skipCard:     {en:'Another day',de:'Ein andermal',fr:'Un autre jour',it:'Un altro giorno',es:'Otro día',pt:'Outro dia',nl:'Een andere keer',sv:'En annan dag',da:'En anden dag',no:'En annen dag',fi:'Toisena päivänä'},
    removedNote:  {en:'{name} moved to another day.',de:'{name} wandert auf einen anderen Tag.',fr:'{name}, ce sera pour un autre jour.',it:'{name} passa a un altro giorno.',es:'Guardamos {name} para otro día.',pt:'{name} ficou para outro dia.',nl:'{name} schuift door naar een andere dag.',sv:'{name} flyttas till en annan dag.',da:'{name} flyttes til en anden dag.',no:'{name} flyttes til en annen dag.',fi:'{name} siirtyy toiseen päivään.'},
    afterFrame:   {en:'{a} comes after {b}.',de:'{a} kommt nach {b}.',fr:'{a} vient après {b}.',it:'{a} viene dopo {b}.',es:'{a}, cuando terminemos con {b}.',pt:'{a} vem depois que {b} termina.',nl:'{a} komt na {b}.',sv:'{a} kommer efter {b}.',da:'{a} kommer efter {b}.',no:'{a} kommer etter {b}.',fi:'{a} on vuorossa, kun {b} on ohi.'},
    firstFrame:   {en:'{a} is how we start our day.',de:'Mit {a} beginnt unser Tag.',fr:'On commence la journée avec {a}.',it:'La giornata comincia con {a}.',es:'{a}: así empezamos el día.',pt:'{a} abre o nosso dia.',nl:'Met {a} begint onze dag.',sv:'Vi börjar dagen med {a}.',da:'Vi begynder dagen med {a}.',no:'Vi begynner dagen med {a}.',fi:'Päivä alkaa: {a}.'},
    emptyHint:    {en:'Tap the activity cards to build today.',de:'Tippt links auf die Karten und baut euren Tag.',fr:'Touchez les cartes à gauche pour construire la journée.',it:'Tocca le carte a sinistra per costruire la giornata.',es:'Toca las tarjetas de la izquierda para armar el día.',pt:'Toque nos cartões ao lado para montar o dia.',nl:'Tik links op de kaartjes om de dag te bouwen.',sv:'Tryck på korten till vänster för att bygga dagen.',da:'Tryk på kortene til venstre for at bygge dagen.',no:'Trykk på kortene til venstre for å bygge dagen.',fi:'Rakenna päivä napauttamalla vieressä olevia kortteja.'},
    dayFull:      {en:'Our day is full — 16 cards is the whole strip.',de:'Unser Tag ist voll — 16 Karten passen auf den Streifen.',fr:'La journée est pleine — 16 cartes, c’est le maximum.',it:'La giornata è piena — il massimo è 16 carte.',es:'El día está lleno — 16 tarjetas es el máximo.',pt:'O dia está cheio — 16 cartões é o máximo.',nl:'De dag is vol — 16 kaartjes is het maximum.',sv:'Dagen är full — fler än 16 kort får inte plats.',da:'Dagen er fuld — der er plads til 16 kort.',no:'Dagen er full — det er plass til 16 kort.',fi:'Päivä on täynnä — 16 korttia on enimmäismäärä.'},
    grpArrival:   {en:'Arriving & leaving',de:'Ankommen & Gehen',fr:'Arrivée & départ',it:'Arrivo e uscita',es:'Llegada y salida',pt:'Chegada e saída',nl:'Komen & gaan',sv:'Komma & gå',da:'Komme & gå',no:'Komme & gå',fi:'Tulo ja lähtö'},
    grpLearning:  {en:'Learning',de:'Lernen',fr:'Apprentissages',it:'Imparare',es:'Aprender',pt:'Aprender',nl:'Leren',sv:'Lärande',da:'Læring',no:'Læring',fi:'Oppiminen'},
    grpCare:      {en:'Food & care',de:'Essen & Pause',fr:'Repas & soins',it:'Pasti e cura',es:'Comer y descansar',pt:'Comida e cuidados',nl:'Eten & rust',sv:'Mat & vila',da:'Mad & hvile',no:'Mat & hvile',fi:'Ruoka ja lepo'},
    grpMove:      {en:'Moving & outside',de:'Bewegung & Draußen',fr:'Bouger & dehors',it:'Movimento e aria aperta',es:'Movimiento y aire libre',pt:'Movimento e lá fora',nl:'Bewegen & buiten',sv:'Rörelse & ute',da:'Bevægelse & ude',no:'Bevegelse & ute',fi:'Liikunta ja ulkoilu'},
    grpTogether:  {en:'Together',de:'Gemeinsam',fr:'Ensemble',it:'Insieme',es:'Juntos',pt:'Juntos',nl:'Samen',sv:'Tillsammans',da:'Sammen',no:'Sammen',fi:'Yhdessä'},
    grpSpecial:   {en:'Special cards',de:'Besondere Karten',fr:'Cartes spéciales',it:'Carte speciali',es:'Tarjetas especiales',pt:'Cartões especiais',nl:'Speciale kaartjes',sv:'Specialkort',da:'Særlige kort',no:'Spesialkort',fi:'Erikoiskortit'},
    tmplTitle:    {en:'Weekly plans',de:'Wochenpläne',fr:'Plans de la semaine',it:'Piani della settimana',es:'Planes de la semana',pt:'Planos da semana',nl:'Weekplannen',sv:'Veckoplaner',da:'Ugeplaner',no:'Ukeplaner',fi:'Viikkosuunnitelmat'},
    tmplReady:    {en:'{day}’s plan is ready — change anything?',de:'Der Plan für {day} liegt bereit — noch etwas ändern?',fr:'Le plan de {day} est prêt — on change quelque chose ?',it:'Il piano di {day} è pronto — vuoi cambiare qualcosa?',es:'{day}: el plan está listo — ¿cambiamos algo?',pt:'O plano de {day} está pronto — quer mudar algo?',nl:'Het plan voor {day} staat klaar — nog iets aanpassen?',sv:'Planen för {day} är klar — vill du ändra något?',da:'Planen for {day} er klar — skal noget ændres?',no:'Planen for {day} er klar — vil du endre noe?',fi:'{day}-suunnitelma on valmis — muutetaanko jotain?'},
    tmplUse:      {en:'Use it',de:'Übernehmen',fr:'Le garder',it:'Usalo',es:'Usarlo',pt:'Usar',nl:'Gebruiken',sv:'Använd den',da:'Brug den',no:'Bruk den',fi:'Käytä'},
    tmplFresh:    {en:'Start fresh',de:'Neu beginnen',fr:'Partir de zéro',it:'Ricomincia',es:'Empezar de cero',pt:'Começar do zero',nl:'Opnieuw beginnen',sv:'Börja om',da:'Start forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    printChip:    {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Afdrukken',sv:'Skriv ut',da:'Udskriv',no:'Skriv ut',fi:'Tulosta'},
    printWith:    {en:'Today with: ________',de:'Heute mit: ________',fr:'Aujourd’hui avec : ________',it:'Oggi con: ________',es:'Hoy con: ________',pt:'Hoje com: ________',nl:'Vandaag met: ________',sv:'I dag med: ________',da:'I dag med: ________',no:'I dag med: ________',fi:'Tänään mukana: ________'},
    printNotes:   {en:'Notes',de:'Notizen',fr:'Notes',it:'Note',es:'Notas',pt:'Anotações',nl:'Notities',sv:'Anteckningar',da:'Noter',no:'Notater',fi:'Muistiinpanot'},
    timeAria:     {en:'Set the time for {name}',de:'Uhrzeit für {name} festlegen',fr:'Régler l’heure pour {name}',it:'Imposta l’orario per {name}',es:'Poner la hora para {name}',pt:'Definir o horário: {name}',nl:'Tijd instellen voor {name}',sv:'Ställ in tiden för {name}',da:'Sæt tiden for {name}',no:'Sett tiden for {name}',fi:'Aseta aika: {name}'},
    timeNone:     {en:'No time',de:'Ohne Uhrzeit',fr:'Sans heure',it:'Senza orario',es:'Sin hora',pt:'Sem horário',nl:'Zonder tijd',sv:'Ingen tid',da:'Ingen tid',no:'Uten klokkeslett',fi:'Ei kellonaikaa'},
    setVoice:     {en:'Speak activities and times',de:'Aktivitäten und Uhrzeiten ansagen',fr:'Annoncer les activités et les heures',it:'Leggi attività e orari a voce alta',es:'Leer las actividades y las horas en voz alta',pt:'Ler as atividades e os horários em voz alta',nl:'Activiteiten en tijden uitspreken',sv:'Läs upp aktiviteter och tider',da:'Læs aktiviteter og tider højt',no:'Les opp aktiviteter og tider',fi:'Lue puuhat ja ajat ääneen'},
    setCues:      {en:'Sound cues',de:'Töne',fr:'Signaux sonores',it:'Segnali sonori',es:'Efectos de sonido',pt:'Sinais sonoros',nl:'Geluidssignalen',sv:'Ljudsignaler',da:'Lydsignaler',no:'Lydsignaler',fi:'Äänimerkit'},
    gatePremium:  {en:'Times on the cards, the spoken voice, weekly plans, and printing are part of Premium. Building today’s schedule — with the sun, the change cards, and every activity — is always free.',de:'Uhrzeiten auf den Karten, die Vorlesestimme, Wochenpläne und das Drucken gehören zu Premium. Den Tagesplan bauen — mit Sonne, Änderungskarten und allen Aktivitäten — bleibt immer kostenlos.',fr:'Les heures sur les cartes, la voix, les plans de la semaine et l’impression font partie de Premium. Construire la journée — avec le soleil, les cartes de changement et toutes les activités — reste toujours gratuit.',it:'Gli orari sulle carte, la voce che legge, i piani della settimana e la stampa fanno parte di Premium. Costruire la giornata — con il sole, i cambi di programma e tutte le attività — resta sempre gratuito.',es:'Las horas en las tarjetas, la voz, los planes de la semana y la impresión forman parte de Premium. Armar el día — con el sol, las tarjetas de cambio y todas las actividades — es gratis para siempre.',pt:'Os horários nos cartões, a voz, os planos da semana e a impressão fazem parte do Premium. Montar o dia — com o sol, os cartões de mudança e todas as atividades — é sempre gratuito.',nl:'Tijden op de kaartjes, de stem, weekplannen en afdrukken horen bij Premium. De dag bouwen — met de zon, de veranderkaartjes en alle activiteiten — blijft altijd gratis.',sv:'Tider på korten, rösten, veckoplaner och utskrift ingår i Premium. Att bygga dagen — med solen, ändringskorten och alla aktiviteter — är alltid gratis.',da:'Tider på kortene, stemmen, ugeplaner og udskrift er en del af Premium. At bygge dagen — med solen, ændringskortene og alle aktiviteter — er altid gratis.',no:'Klokkeslett på kortene, stemmen, ukeplaner og utskrift er en del av Premium. Å bygge dagen — med sola, endringskortene og alle aktivitetene — er alltid gratis.',fi:'Korttien kellonajat, ääni, viikkosuunnitelmat ja tulostus kuuluvat Premiumiin. Päivän rakentaminen — aurinkoineen, muutoskortteineen ja kaikkine puuhineen — on aina ilmaista.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    /* ---- REBUILD 2026-08-07: new keys ----
       ⚠ These are the ENGLISH SOURCE and it is the locale nobody
       reviews. Every native panel gets this block as a SOURCE TO AUDIT,
       not as a target to translate — that is where the last several
       tools' worst copy defects were caught. */
    soonFrame:    {en:'Soon it’s {a}.',de:'Gleich kommt {a}.',fr:'Bientôt, ce sera {a}.',it:'Fra poco c’è {a}.',es:'Ahora viene {a}.',pt:'Daqui a pouco é {a}.',nl:'Straks is het {a}.',sv:'Snart är det {a}.',da:'Om lidt er det {a}.',no:'Snart er det {a}.',fi:'Kohta on {a}.'},
    dayDoneTitle: {en:'That was our day.',de:'Das war unser Tag.',fr:'Voilà notre journée.',it:'Questa è stata la nostra giornata.',es:'Ese fue nuestro día.',pt:'Esse foi o nosso dia.',nl:'Dat was onze dag.',sv:'Det var vår dag.',da:'Det var vores dag.',no:'Det var dagen vår.',fi:'Se oli meidän päivä.'},
    dayDoneSpoken:{en:'That was our day.',de:'Das war unser Tag.',fr:'Voilà notre journée.',it:'Questa è stata la nostra giornata.',es:'Ese fue nuestro día.',pt:'Esse foi o nosso dia.',nl:'Dat was onze dag.',sv:'Det var vår dag.',da:'Det var vores dag.',no:'Det var dagen vår.',fi:'Se oli meidän päivä.'},
    tomorrowChip: {en:'Build tomorrow',de:'Morgen planen',fr:'Préparer demain',it:'Prepara domani',es:'Preparar mañana',pt:'Montar amanhã',nl:'Morgen klaarzetten',sv:'Bygg i morgon',da:'Byg i morgen',no:'Bygg i morgen',fi:'Rakenna huominen'},
    removedOnDay: {en:'{name} moves to {day}.',de:'{name} wandert auf {day}.',fr:'{name}, ce sera {day}.',it:'{name} passa a {day}.',es:'Guardamos {name} para el {day}.',pt:'{name} fica para {day}.',nl:'{name} schuift door naar {day}.',sv:'{name} flyttas till {day}.',da:'{name} flyttes til {day}.',no:'{name} flyttes til {day}.',fi:'{name} siirtyy {day}.'},
    skipWhich:    {en:'Which day instead?',de:'An welchem Tag dann?',fr:'Quel jour à la place ?',it:'Quale giorno, allora?',es:'¿Qué día en su lugar?',pt:'Em que dia, então?',nl:'Welke dag dan?',sv:'Vilken dag i stället?',da:'Hvilken dag i stedet?',no:'Hvilken dag i stedet?',fi:'Minä päivänä sitten?'},
    skipNoDay:    {en:'Another day',de:'Ein andermal',fr:'Un autre jour',it:'Un altro giorno',es:'Otro día',pt:'Outro dia',nl:'Een andere keer',sv:'En annan dag',da:'En anden dag',no:'En annen dag',fi:'Toisena päivänä'},
    setWarn:      {en:'Two taps to move on (a gentle warning first)',de:'Zwei Tipper zum Weitergehen (erst ein sanfter Hinweis)',fr:'Deux touches pour avancer (un signal doux d’abord)',it:'Due tocchi per proseguire (prima un segnale gentile)',es:'Dos toques para avanzar (primero un aviso suave)',pt:'Dois toques para avançar (primeiro um aviso suave)',nl:'Twee tikken om verder te gaan (eerst een zacht seintje)',sv:'Två tryck för att gå vidare (först en mjuk förvarning)',da:'To tryk for at gå videre (først et blidt varsel)',no:'To trykk for å gå videre (først et mykt varsel)',fi:'Kaksi napautusta eteenpäin (ensin lempeä ennakkomerkki)'},
    addOwn:       {en:'My cards',de:'Meine Karten',fr:'Mes cartes',it:'Le mie carte',es:'Mis tarjetas',pt:'Meus cartões',nl:'Mijn kaartjes',sv:'Mina kort',da:'Mine kort',no:'Mine kort',fi:'Omat kortit'},
    makeTitle:    {en:'Name this card',de:'Wie heißt diese Karte?',fr:'Nomme cette carte',it:'Dai un nome a questa carta',es:'Ponle nombre a esta tarjeta',pt:'Dê um nome a este cartão',nl:'Geef dit kaartje een naam',sv:'Vad heter det här kortet?',da:'Hvad hedder dette kort?',no:'Hva heter dette kortet?',fi:'Anna kortille nimi'},
    makeHint:     {en:'Children will see the picture, not the words.',de:'Die Kinder sehen das Bild, nicht die Wörter.',fr:'Les enfants voient l’image, pas les mots.',it:'I bambini vedono l’immagine, non le parole.',es:'Los niños ven el dibujo, no las palabras.',pt:'As crianças veem a imagem, não as palavras.',nl:'Kinderen zien het plaatje, niet de woorden.',sv:'Barnen ser bilden, inte orden.',da:'Børnene ser billedet, ikke ordene.',no:'Barna ser bildet, ikke ordene.',fi:'Lapset näkevät kuvan, eivät sanoja.'},
    makeAdd:      {en:'Add to today',de:'Zum Tag hinzufügen',fr:'Ajouter à la journée',it:'Aggiungi alla giornata',es:'Añadir al día',pt:'Adicionar ao dia',nl:'Aan vandaag toevoegen',sv:'Lägg till i dagen',da:'Føj til dagen',no:'Legg til i dagen',fi:'Lisää päivään'},
    makeSave:     {en:'Save',de:'Speichern',fr:'Enregistrer',it:'Salva',es:'Guardar',pt:'Salvar',nl:'Opslaan',sv:'Spara',da:'Gem',no:'Lagre',fi:'Tallenna'},
    makeDelete:   {en:'Delete this card',de:'Karte löschen',fr:'Supprimer cette carte',it:'Elimina questa carta',es:'Borrar esta tarjeta',pt:'Excluir este cartão',nl:'Dit kaartje verwijderen',sv:'Ta bort kortet',da:'Slet kortet',no:'Slett kortet',fi:'Poista kortti'},
    makeDeviceOnly:{en:'Your cards stay in this browser, on this computer.',de:'Deine Karten bleiben in diesem Browser, auf diesem Computer.',fr:'Vos cartes restent dans ce navigateur, sur cet ordinateur.',it:'Le tue carte restano in questo browser, su questo computer.',es:'Tus tarjetas se quedan en este navegador, en este ordenador.',pt:'Seus cartões ficam neste navegador, neste computador.',nl:'Je kaartjes blijven in deze browser, op deze computer.',sv:'Dina kort stannar i den här webbläsaren, på den här datorn.',da:'Dine kort bliver i denne browser, på denne computer.',no:'Kortene dine blir i denne nettleseren, på denne maskinen.',fi:'Korttisi säilyvät tässä selaimessa, tällä koneella.'},
    /* ⚠ REFUSE WITH A REASON, NEVER IN SILENCE. Each of these used to be
       impossible to reach because the feature did not exist; a bare
       `return` would be indistinguishable from the tool being broken. */
    noticeFull:   {en:'That’s twelve cards — the most you can keep. Edit one you already have.',de:'Das sind zwölf Karten — mehr lassen sich nicht behalten. Bearbeite eine vorhandene.',fr:'Cela fait douze cartes — c’est le maximum. Modifiez-en une existante.',it:'Sono dodici carte — il massimo. Modificane una che hai già.',es:'Son doce tarjetas — el máximo. Edita una que ya tengas.',pt:'São doze cartões — o máximo. Edite um que você já tem.',nl:'Dat zijn twaalf kaartjes — het maximum. Pas er een aan die je al hebt.',sv:'Det är tolv kort — fler går inte att spara. Ändra ett du redan har.',da:'Det er tolv kort — flere kan ikke gemmes. Rediger et, du allerede har.',no:'Det er tolv kort — flere kan ikke lagres. Endre ett du allerede har.',fi:'Kaksitoista korttia on enimmäismäärä. Muokkaa jotakin jo olemassa olevaa.'},
    noticeLong:   {en:'That name is a little long for the board — try twenty letters or fewer.',de:'Der Name ist für die Tafel etwas lang — höchstens zwanzig Zeichen.',fr:'Ce nom est un peu long pour le tableau — vingt lettres au maximum.',it:'Il nome è un po’ lungo per la lavagna — al massimo venti lettere.',es:'Ese nombre es un poco largo para la pizarra — veinte letras como máximo.',pt:'Esse nome é um pouco longo para o quadro — no máximo vinte letras.',nl:'Die naam is wat lang voor het bord — hoogstens twintig letters.',sv:'Namnet är lite långt för tavlan — högst tjugo tecken.',da:'Navnet er lidt langt til tavlen — højst tyve tegn.',no:'Navnet er litt langt for tavla — høyst tjue tegn.',fi:'Nimi on taululle vähän pitkä — enintään kaksikymmentä merkkiä.'},
    noticeDup:    {en:'You already have a card that looks like this one. Pick another picture or colour.',de:'So eine Karte gibt es schon. Wähle ein anderes Bild oder eine andere Farbe.',fr:'Vous avez déjà une carte qui ressemble à celle-ci. Choisissez une autre image ou couleur.',it:'Hai già una carta come questa. Scegli un’altra immagine o un altro colore.',es:'Ya tienes una tarjeta parecida. Elige otro dibujo u otro color.',pt:'Você já tem um cartão parecido. Escolha outra imagem ou outra cor.',nl:'Je hebt al zo’n kaartje. Kies een ander plaatje of een andere kleur.',sv:'Du har redan ett kort som ser ut så här. Välj en annan bild eller färg.',da:'Du har allerede et kort, der ser sådan ud. Vælg et andet billede eller en anden farve.',no:'Du har allerede et kort som ser slik ut. Velg et annet bilde eller en annen farge.',fi:'Sinulla on jo tällainen kortti. Valitse toinen kuva tai väri.'},
    noticeEmpty:  {en:'Give the card a name first.',de:'Gib der Karte zuerst einen Namen.',fr:'Donnez d’abord un nom à la carte.',it:'Prima dai un nome alla carta.',es:'Primero ponle un nombre a la tarjeta.',pt:'Primeiro dê um nome ao cartão.',nl:'Geef het kaartje eerst een naam.',sv:'Ge kortet ett namn först.',da:'Giv først kortet et navn.',no:'Gi kortet et navn først.',fi:'Anna kortille ensin nimi.'},
    recentLbl:    {en:'Used often',de:'Oft benutzt',fr:'Souvent utilisées',it:'Usate spesso',es:'Usadas a menudo',pt:'Usados com frequência',nl:'Vaak gebruikt',sv:'Ofta använda',da:'Ofte brugt',no:'Ofte brukt',fi:'Usein käytetyt'},
    addCardAria:  {en:'Add an activity',de:'Aktivität hinzufügen',fr:'Ajouter une activité',it:'Aggiungi un’attività',es:'Añadir una actividad',pt:'Adicionar uma atividade',nl:'Activiteit toevoegen',sv:'Lägg till en aktivitet',da:'Tilføj en aktivitet',no:'Legg til en aktivitet',fi:'Lisää puuha'},
    closeAria:    {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    upAria:       {en:'Move {name} earlier',de:'{name} nach vorn schieben',fr:'Déplacer {name} plus tôt',it:'Sposta {name} prima',es:'Mover {name} antes',pt:'Mover {name} para antes',nl:'{name} eerder zetten',sv:'Flytta {name} tidigare',da:'Flyt {name} tidligere',no:'Flytt {name} tidligere',fi:'Siirrä {name} aiemmaksi'},
    downAria:     {en:'Move {name} later',de:'{name} nach hinten schieben',fr:'Déplacer {name} plus tard',it:'Sposta {name} dopo',es:'Mover {name} después',pt:'Mover {name} para depois',nl:'{name} later zetten',sv:'Flytta {name} senare',da:'Flyt {name} senere',no:'Flytt {name} senere',fi:'Siirrä {name} myöhemmäksi'},
    nextLbl:      {en:'Next',de:'Danach',fr:'Ensuite',it:'Poi',es:'Después',pt:'Depois',nl:'Daarna',sv:'Sedan',da:'Derefter',no:'Deretter',fi:'Seuraavaksi'},
    focusChip:    {en:'Now and next',de:'Jetzt und danach',fr:'Maintenant et ensuite',it:'Adesso e poi',es:'Ahora y después',pt:'Agora e depois',nl:'Nu en straks',sv:'Nu och sedan',da:'Nu og derefter',no:'Nå og deretter',fi:'Nyt ja seuraavaksi'},
    moreChip:     {en:'Show the tools',de:'Werkzeuge zeigen',fr:'Afficher les outils',it:'Mostra gli strumenti',es:'Mostrar las herramientas',pt:'Mostrar as ferramentas',nl:'Toon de knoppen',sv:'Visa verktygen',da:'Vis værktøjerne',no:'Vis verktøyene',fi:'Näytä työkalut'},
    tmplReplace:  {en:'Replace {day}?',de:'{day} ersetzen?',fr:'Remplacer {day} ?',it:'Sostituire {day}?',es:'¿Reemplazar {day}?',pt:'Substituir {day}?',nl:'{day} vervangen?',sv:'Ersätta {day}?',da:'Erstat {day}?',no:'Erstatte {day}?',fi:'Korvataanko {day}?'},
    tmplSaveHere: {en:'Save today here',de:'Heute hier speichern',fr:'Enregistrer aujourd’hui ici',it:'Salva qui la giornata',es:'Guardar hoy aquí',pt:'Salvar hoje aqui',nl:'Vandaag hier opslaan',sv:'Spara dagen här',da:'Gem dagen her',no:'Lagre dagen her',fi:'Tallenna tämä päivä tähän'},
    tmplKeep:     {en:'Keep',de:'Behalten',fr:'Garder',it:'Mantieni',es:'Mantener',pt:'Manter',nl:'Behouden',sv:'Behåll',da:'Behold',no:'Behold',fi:'Säilytä'},
    tmplName:     {en:'Name this plan',de:'Plan benennen',fr:'Nommer ce plan',it:'Dai un nome al piano',es:'Ponle nombre al plan',pt:'Dê um nome ao plano',nl:'Geef dit plan een naam',sv:'Namnge planen',da:'Navngiv planen',no:'Gi planen et navn',fi:'Nimeä suunnitelma'},
    voiceMissing: {en:'No voice for this language is installed on this device.',de:'Auf diesem Gerät ist keine Stimme für diese Sprache installiert.',fr:'Aucune voix pour cette langue n’est installée sur cet appareil.',it:'Su questo dispositivo non è installata una voce per questa lingua.',es:'Este dispositivo no tiene instalada una voz para este idioma.',pt:'Este aparelho não tem uma voz instalada para este idioma.',nl:'Op dit apparaat is geen stem voor deze taal geïnstalleerd.',sv:'Det finns ingen röst för det här språket på den här enheten.',da:'Der er ingen stemme til dette sprog på denne enhed.',no:'Det er ikke installert noen stemme for dette språket på denne enheten.',fi:'Tässä laitteessa ei ole puheääntä tälle kielelle.'}
  },

  /* ================== the activity catalog ×11 ====================== */
  /* Card = { id, group, only?: [locales], not?: [locales] } — every card
     is REPEATABLE in the strip (fi välitunti happens several times a
     day). Names ×11 below; fan-out natives own the register (articles
     baked in for fr/es/it/pt so the announce frame never contracts). */
  GROUPS: ['grpArrival', 'grpLearning', 'grpCare', 'grpMove', 'grpTogether', 'grpSpecial'],
  CARDS: [
    { id: 'arrival',   group: 0 },
    { id: 'circle',    group: 0 },
    { id: 'tidyup',    group: 0 },
    { id: 'lineup',    group: 0 },
    { id: 'packup',    group: 0 },
    { id: 'home',      group: 0 },
    { id: 'aftercare', group: 0, only: ['sv', 'da', 'no', 'nl', 'fr', 'de', 'pt', 'fi'] },
    { id: 'reading',   group: 1 },
    { id: 'storytime', group: 1 },
    { id: 'writing',   group: 1 },
    { id: 'math',      group: 1 },
    { id: 'phonics',   group: 1 },
    { id: 'science',   group: 1 },
    { id: 'art',       group: 1 },
    { id: 'crafts',    group: 1 },
    { id: 'music',     group: 1 },
    { id: 'language',  group: 1 },
    { id: 'italiano',  group: 1, only: ['it'] },
    { id: 'religion',  group: 1, not: ['fr'] },
    { id: 'breakfast', group: 2, only: ['de', 'es', 'fi'] },
    { id: 'snack',     group: 2 },
    { id: 'lunch',     group: 2 },
    { id: 'washhands', group: 2 },
    { id: 'bathroom',  group: 2 },
    { id: 'brushing',  group: 2, only: ['pt', 'de'] },
    { id: 'rest',      group: 2 },
    { id: 'pe',        group: 3 },
    { id: 'swimming',  group: 3 },
    { id: 'recess',    group: 3 },
    { id: 'outdoor',   group: 3 },
    { id: 'forest',    group: 3 },
    { id: 'brainbreak',group: 3 },
    { id: 'dance',     group: 3 },
    { id: 'centers',   group: 4 },
    { id: 'stations',  group: 4 },
    { id: 'showtell',  group: 4, only: ['en'] },
    { id: 'library',   group: 4 },
    { id: 'computers', group: 4 },
    { id: 'calendar',  group: 4 },
    { id: 'birthday',  group: 4 },
    { id: 'assembly',  group: 4 },
    { id: 'fieldtrip', group: 4 },
    { id: 'visitor',   group: 4 },
    { id: 'honores',   group: 4, only: ['es', 'pt'] },
    { id: 'change',    group: 5 },
    { id: 'surprise',  group: 5 },
    { id: 'guest',     group: 5 },
    { id: 'celebrate', group: 5 }
  ],
  NAMES: {
    arrival:   {en:'Arrival',de:'Ankommen',fr:'l’accueil',it:'l’accoglienza',es:'la llegada',pt:'a acolhida',nl:'De inloop',sv:'Ankomst',da:'Ankomst',no:'Ankomst',fi:'Saapuminen'},
    circle:    {en:'Morning circle',de:'Morgenkreis',fr:'le regroupement',it:'il cerchio del mattino',es:'el círculo de la mañana',pt:'a roda de conversa',nl:'De kring',sv:'Samling',da:'Samling',no:'Samlingsstund',fi:'Aamupiiri'},
    tidyup:    {en:'Tidy-up',de:'Aufräumen',fr:'le rangement',it:'il riordino',es:'la hora de guardar',pt:'a arrumação',nl:'Opruimen',sv:'Städning',da:'Oprydning',no:'Ryddetid',fi:'Siivous'},
    lineup:    {en:'Line up',de:'Aufstellen',fr:'le rang',it:'la fila',es:'la fila',pt:'a fila',nl:'In de rij',sv:'Uppställning',da:'Opstilling',no:'Oppstilling',fi:'Jonoon'},
    packup:    {en:'Pack up',de:'Einpacken',fr:'le cartable',it:'lo zaino',es:'la mochila',pt:'a hora da mochila',nl:'Inpakken',sv:'Packa ihop',da:'Pakketid',no:'Pakketid',fi:'Pakkaaminen'},
    home:      {en:'Home time',de:'Schulschluss',fr:'la sortie',it:'l’uscita',es:'la salida',pt:'a saída',nl:'Naar huis',sv:'Hemgång',da:'Hjemtid',no:'Skoleslutt',fi:'Kotiinlähtö'},
    aftercare: {en:'After-school care',de:'Hort',fr:'la garderie',it:'il doposcuola',es:'la guardería',pt:'o contraturno',nl:'De opvang',sv:'Fritids',da:'SFO',no:'SFO',fi:'Iltapäiväkerho'},
    reading:   {en:'Reading',de:'Lesen',fr:'la lecture',it:'la lettura',es:'la lectura',pt:'a leitura',nl:'Lezen',sv:'Läsning',da:'Læsning',no:'Lesing',fi:'Lukeminen'},
    storytime: {en:'Story time',de:'Vorlesen',fr:'l’histoire',it:'la storia',es:'el cuento',pt:'a hora da história',nl:'Voorlezen',sv:'Sagostund',da:'Højtlæsning',no:'Høytlesing',fi:'Satuhetki'},
    writing:   {en:'Writing',de:'Schreiben',fr:'l’écriture',it:'la scrittura',es:'la escritura',pt:'a escrita',nl:'Schrijven',sv:'Skrivstund',da:'Skrivning',no:'Skriving',fi:'Kirjoittaminen'},
    math:      {en:'Math',de:'Mathe',fr:'les maths',it:'la matematica',es:'las matemáticas',pt:'a matemática',nl:'Rekenen',sv:'Matte',da:'Matematik',no:'Matte',fi:'Matematiikka'},
    phonics:   {en:'Phonics',de:'Buchstabenzeit',fr:'les sons et les lettres',it:'l’alfabeto',es:'las letras',pt:'a hora das letras',nl:'Letters',sv:'Bokstäver',da:'Bogstaver',no:'Bokstaver',fi:'Kirjaimet'},
    science:   {en:'Science',de:'Sachunterricht',fr:'la découverte du monde',it:'la scienza',es:'las ciencias',pt:'ciências',nl:'Wereldoriëntatie',sv:'NO',da:'Natur og teknologi',no:'Naturfag',fi:'Ympäristöoppi'},
    art:       {en:'Art',de:'Kunst',fr:'les arts plastiques',it:'l’arte',es:'el arte',pt:'a arte',nl:'Knutselen',sv:'Bild',da:'Billedkunst',no:'Kunst og håndverk',fi:'Kuvataide'},
    crafts:    {en:'Crafts',de:'Basteln',fr:'le bricolage',it:'il lavoretto',es:'las manualidades',pt:'a hora das atividades manuais',nl:'Handvaardigheid',sv:'Pyssel',da:'Krea',no:'Forming',fi:'Käsityö'},
    music:     {en:'Music',de:'Musik',fr:'la musique',it:'la musica',es:'la música',pt:'a música',nl:'Muziek',sv:'Musik',da:'Musik',no:'Musikk',fi:'Musiikki'},
    italiano:  {en:'Italian',de:'—',fr:'—',it:'l’italiano',es:'—',pt:'—',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},
    language:  {en:'Language class',de:'Englisch',fr:'l’anglais',it:'l’inglese',es:'el inglés',pt:'o inglês',nl:'Engels',sv:'Engelska',da:'Engelsk',no:'Engelsk',fi:'Englanti'},
    religion:  {en:'Religion & ethics',de:'Religion',fr:'—',it:'la religione',es:'la religión',pt:'o ensino religioso',nl:'Levensbeschouwing',sv:'SO',da:'Kristendom',no:'KRLE',fi:'Katsomusaine'},
    breakfast: {en:'Breakfast break',de:'Frühstückspause',fr:'—',it:'—',es:'el desayuno',pt:'—',nl:'Tien-uurtje',sv:'—',da:'—',no:'—',fi:'Aamupala'},
    snack:     {en:'Snack',de:'Obstpause',fr:'la collation',it:'la merenda',es:'el refrigerio',pt:'o lanche',nl:'Tien-uurtje',sv:'Fruktstund',da:'Frugtpause',no:'Fruktstund',fi:'Välipala'},
    lunch:     {en:'Lunch',de:'Mittagessen',fr:'la cantine',it:'la mensa',es:'la comida',pt:'o almoço',nl:'De lunch',sv:'Lunch',da:'Madpakketid',no:'Matpakketid',fi:'Ruokailu'},
    washhands: {en:'Wash hands',de:'Händewaschen',fr:'le lavage des mains',it:'il lavaggio delle mani',es:'el lavado de manos',pt:'a hora de lavar as mãos',nl:'Handen wassen',sv:'Handtvätt',da:'Håndvask',no:'Håndvask',fi:'Käsienpesu'},
    bathroom:  {en:'Bathroom',de:'Toilette',fr:'le passage aux toilettes',it:'il bagno',es:'el baño',pt:'a hora do banheiro',nl:'Naar de wc',sv:'Toalett',da:'Toilettid',no:'Dopause',fi:'Vessa'},
    brushing:  {en:'Tooth brushing',de:'Zähneputzen',fr:'—',it:'—',es:'—',pt:'a escovação',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},
    rest:      {en:'Rest time',de:'Ruhezeit',fr:'la sieste',it:'il riposino',es:'el descanso',pt:'a hora do descanso',nl:'Rustmoment',sv:'Vila',da:'Hviletid',no:'Hviletid',fi:'Lepohetki'},
    pe:        {en:'PE',de:'Sport',fr:'la motricité',it:'la motoria',es:'la educación física',pt:'a educação física',nl:'Gym',sv:'Idrott',da:'Idræt',no:'Gym',fi:'Liikunta'},
    swimming:  {en:'Swimming',de:'Schwimmen',fr:'la piscine',it:'il nuoto',es:'la natación',pt:'a natação',nl:'Schoolzwemmen',sv:'Simning',da:'Svømning',no:'Svømming',fi:'Uinti'},
    recess:    {en:'Recess',de:'Hofpause',fr:'la récréation',it:'la ricreazione',es:'el recreo',pt:'o recreio',nl:'Pauze',sv:'Rast',da:'Frikvarter',no:'Friminutt',fi:'Välitunti'},
    outdoor:   {en:'Outdoor time',de:'Draußenzeit',fr:'les jeux dehors',it:'il gioco all’aperto',es:'el tiempo al aire libre',pt:'o parquinho',nl:'Buitenspelen',sv:'Utevistelse',da:'Udetid',no:'Utetid',fi:'Ulkoilu'},
    forest:    {en:'Forest day',de:'Waldtag',fr:'la sortie nature',it:'la passeggiata nella natura',es:'el día en la naturaleza',pt:'o dia na natureza',nl:'Natuurdag',sv:'Skogsdag',da:'Skovdag',no:'Turdag',fi:'Metsäretki'},
    brainbreak:{en:'Movement break',de:'Bewegungspause',fr:'la pause active',it:'la pausa attiva',es:'la activación física',pt:'a pausa ativa',nl:'Beweegpauze',sv:'Rörelsepaus',da:'Bevægelsespause',no:'Aktivitetspause',fi:'Taukojumppa'},
    dance:     {en:'Dance',de:'Tanzen',fr:'la danse',it:'il ballo',es:'el baile',pt:'a dança',nl:'Dansen',sv:'Dans',da:'Dans',no:'Dans',fi:'Tanssi'},
    centers:   {en:'Free play',de:'Freispiel',fr:'le jeu libre',it:'il gioco libero',es:'el juego libre',pt:'a brincadeira livre',nl:'Vrij spelen',sv:'Fri lek',da:'Fri leg',no:'Frilek',fi:'Vapaa leikki'},
    stations:  {en:'Stations',de:'Freiarbeit',fr:'les ateliers',it:'il laboratorio',es:'las estaciones',pt:'a hora dos cantinhos',nl:'Hoekenwerk',sv:'Stationer',da:'Værksteder',no:'Stasjoner',fi:'Pistetyöskentely'},
    showtell:  {en:'Show and tell',de:'—',fr:'—',it:'—',es:'—',pt:'—',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},
    library:   {en:'Library',de:'Bücherei',fr:'la bibliothèque',it:'la biblioteca',es:'la biblioteca',pt:'a biblioteca',nl:'De bieb',sv:'Bibliotek',da:'Bibliotekstid',no:'Bibliotek',fi:'Kirjasto'},
    computers: {en:'Computers',de:'Tablet-Zeit',fr:'les tablettes',it:'il tablet',es:'las tabletas',pt:'a hora do tablet',nl:'Tablets',sv:'Lärplattor',da:'Tablets',no:'Nettbrett',fi:'Tabletit'},
    calendar:  {en:'Calendar & weather',de:'Kalender & Wetter',fr:'la date et la météo',it:'il calendario e il meteo',es:'el calendario y el clima',pt:'a hora do calendário',nl:'Kalender & weer',sv:'Kalender & väder',da:'Kalender og vejr',no:'Kalender og vær',fi:'Kalenteri ja sää'},
    birthday:  {en:'Birthday',de:'Geburtstag',fr:'l’anniversaire',it:'il compleanno',es:'el cumpleaños',pt:'o aniversário',nl:'Verjaardag',sv:'Födelsedag',da:'Fødselsdag',no:'Bursdag',fi:'Syntymäpäivä'},
    assembly:  {en:'Assembly',de:'Schulversammlung',fr:'le rassemblement',it:'l’assemblea',es:'la asamblea',pt:'a assembleia',nl:'Weekopening',sv:'Samling i aulan',da:'Fællessamling',no:'Fellessamling',fi:'Aamunavaus'},
    fieldtrip: {en:'Field trip',de:'Ausflug',fr:'la sortie scolaire',it:'la gita',es:'el paseo escolar',pt:'o passeio',nl:'Schoolreisje',sv:'Utflykt',da:'Udflugt',no:'Skoletur',fi:'Retki'},
    visitor:   {en:'Visitor',de:'Besuch',fr:'la visite',it:'l’ospite',es:'la visita',pt:'a visita',nl:'Bezoek',sv:'Besök',da:'Besøg',no:'Besøk',fi:'Vieras'},
    honores:   {en:'Flag ceremony',de:'—',fr:'—',it:'—',es:'los honores a la bandera',pt:'a hora cívica',nl:'—',sv:'—',da:'—',no:'—',fi:'—'},
    change:    {en:'Change',de:'Änderung',fr:'le changement',it:'il cambio di programma',es:'el cambio',pt:'a mudança',nl:'Verandering',sv:'Ändring',da:'Ændring',no:'Endring',fi:'Muutos'},
    surprise:  {en:'Surprise',de:'Überraschung',fr:'la surprise',it:'la sorpresa',es:'la sorpresa',pt:'a surpresa',nl:'Verrassing',sv:'Överraskning',da:'Overraskelse',no:'Overraskelse',fi:'Yllätys'},
    guest:     {en:'Guest teacher',de:'Vertretung',fr:'l’intervenant',it:'l’insegnante ospite',es:'el maestro invitado',pt:'o professor convidado',nl:'Invaljuf of invalmeester',sv:'Vikarie',da:'Vikartime',no:'Vikar',fi:'Vieraileva opettaja'},
    celebrate: {en:'Celebration',de:'Fest',fr:'la fête',it:'la festa',es:'la fiesta',pt:'a festa',nl:'Feest',sv:'Fest',da:'Fest',no:'Fest',fi:'Juhla'}
  },
  /* fi announces in the partitive/case-correct form where the nominative
     label reads wrong in "Nyt on {a}" (subjects want partitive); the fi
     fan-out native owns this table. Other locales fall back to NAMES. */
  ANNOUNCE: {
    de: { home: 'Nachhausegehen', celebrate: 'Feiern' },
    nl: { arrival: 'de inloop', circle: 'de kring', tidyup: 'opruimen', lineup: 'de rij', packup: 'inpakken', home: 'naar huis', aftercare: 'de opvang', reading: 'lezen', storytime: 'voorlezen', writing: 'schrijven', math: 'rekenen', phonics: 'letters', science: 'wereldoriëntatie', art: 'knutselen', crafts: 'handvaardigheid', music: 'muziek', language: 'Engels', religion: 'levensbeschouwing', snack: 'het tien-uurtje', lunch: 'de lunch', washhands: 'handen wassen', bathroom: 'de wc', rest: 'het rustmoment', pe: 'gym', swimming: 'schoolzwemmen', recess: 'pauze', outdoor: 'buitenspelen', forest: 'de natuurdag', brainbreak: 'een beweegpauze', dance: 'dansen', centers: 'vrij spelen', stations: 'hoekenwerk', library: 'de bieb', computers: 'de tablets', calendar: 'de kalender en het weer', birthday: 'de verjaardag', assembly: 'de weekopening', fieldtrip: 'het schoolreisje', visitor: 'het bezoek', surprise: 'een verrassing', guest: 'een invaljuf of invalmeester', celebrate: 'feest' },
    sv: { science: 'N O', religion: 'S O', calendar: 'kalender och väder', surprise: 'en överraskning' },
    fi: { arrival: 'saapumisen aika', circle: 'aamupiiri', tidyup: 'siivouksen aika', lineup: 'aika mennä jonoon', packup: 'pakkaamisen aika', home: 'kotiinlähdön aika', aftercare: 'iltapäiväkerho', reading: 'lukemista', storytime: 'satuhetki', writing: 'kirjoittamista', math: 'matikkaa', phonics: 'kirjainhetki', science: 'ympäristöoppia', art: 'kuvataidetta', crafts: 'käsitöitä', music: 'musiikkia', language: 'englantia', religion: 'katsomustunti', breakfast: 'aamupala', snack: 'välipala', lunch: 'ruokailu', washhands: 'käsienpesun aika', bathroom: 'vessahetki', rest: 'lepohetki', pe: 'liikuntaa', swimming: 'uintia', recess: 'välitunti', outdoor: 'ulkoilu', forest: 'metsäretki', brainbreak: 'taukojumppa', dance: 'tanssia', centers: 'vapaata leikkiä', stations: 'pistetyöskentelyä', library: 'kirjastohetki', computers: 'tablettihetki', calendar: 'kalenterihetki', birthday: 'syntymäpäivä', assembly: 'aamunavaus', fieldtrip: 'retki', visitor: 'vierailu', change: 'muutos', surprise: 'yllätys', guest: 'vierailevan opettajan tunti', celebrate: 'juhla' }
  },
  /* fi time-safe card names for the "{a} alkaa…" frame (labels like
     "Jonoon" cannot be sentence subjects) */
  TIME_NAMES: {
    fi: { lineup: 'Jonoon meno', bathroom: 'Vessakäynti', computers: 'Tablettihetki', phonics: 'Kirjainhetki', visitor: 'Vierailu', guest: 'Vierailevan opettajan tunti', calendar: 'Kalenterihetki' }
  },
  /* the "Now it's …" frame per locale (fi uses ANNOUNCE overrides) */
  NOW_FRAME: {en:'Now it’s time for {a}!',de:'Jetzt ist {a} dran!',fr:'Maintenant, c’est {a} !',it:'Adesso c’è {a}!',es:'¡Ahora vamos con {a}!',pt:'Agora é {a}!',nl:'Nu is het tijd voor {a}!',sv:'Nu är det {a}!',da:'Nu er det {a}!',no:'Nå er det {a}!',fi:'Nyt on {a}!'},
  /* the time frame per locale. fi/da/no STRIP the emitted leading clock
     word (their position-0 emits "kello/klokken/klokka {H}"); it/pt use
     the caseless clock-shows frame (article contraction avoided). */
  TIME_FRAME: {en:'{a} is at {t}.',de:'{a} ist um {t}.',fr:'{a}, c’est à {t}.',it:'{a} comincia quando l’orologio segna {t}.',es:'{a}, a {t}.',pt:'{a} começa quando o relógio marca {t}.',nl:'{a} is om {t}.',sv:'{a} börjar klockan {t}.',da:'{a} er klokken {t}.',no:'{a} er klokka {t}.',fi:'{a} alkaa, kun kello on {t}.'},
  CLOCKWORD_STRIP: { fi: 'kello ', da: 'klokken ', no: 'klokka ' },

  /* ======= TIME_RULES — copied VERBATIM from learning-clock.js =======
     (native-verified colloquial times; the drift gate in
     scripts/verify-our-day.js compares this byte-for-byte against the
     learning-clock source and FAILS on any divergence). */
  TIME_RULES: {
    /*__TR_en__*/ en: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:"{H} o'clock",5:'five past {H}',10:'ten past {H}',15:'quarter past {H}',20:'twenty past {H}',25:'twenty-five past {H}',30:'half past {H}',35:'twenty-five to {N}',40:'twenty to {N}',45:'quarter to {N}',50:'ten to {N}',55:'five to {N}'}, formal:{tpl:'{HW} {M#}',zero:"{HW} o'clock",low:'{HW} oh {M#}'}, specials:[] },
    /*__TR_de__*/ de: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:'{H} Uhr',5:'fünf nach {H}',10:'zehn nach {H}',15:'Viertel nach {H}',20:'zwanzig nach {H}',25:'fünf vor halb {N}',30:'halb {N}',35:'fünf nach halb {N}',40:'zwanzig vor {N}',45:'Viertel vor {N}',50:'zehn vor {N}',55:'fünf vor {N}'}, overlays:{deQuarter:{15:'viertel {N}',45:'dreiviertel {N}'}}, formal:{tpl:'{HW} Uhr {M#}',zero:'{HW} Uhr'}, specials:[] },
    /*__TR_fr__*/ fr: { hourWords:['une heure','deux heures','trois heures','quatre heures','cinq heures','six heures','sept heures','huit heures','neuf heures','dix heures','onze heures','midi'], hourWordsAlt:null, positions:{0:'{H}',5:'{H} cinq',10:'{H} dix',15:'{H} et quart',20:'{H} vingt',25:'{H} vingt-cinq',30:'{H} et demie',35:'{N} moins vingt-cinq',40:'{N} moins vingt',45:'{N} moins le quart',50:'{N} moins dix',55:'{N} moins cinq'}, formal:{tpl:'{H} {M#}',zero:'{H}'}, specials:[{h:12,m:30,text:'midi et demi'}] },
    /*__TR_it__*/ it: { hourWords:['l\'una','le due','le tre','le quattro','le cinque','le sei','le sette','le otto','le nove','le dieci','le undici','mezzogiorno'], hourWordsAlt:null, positions:{0:'{H}',5:'{H} e cinque',10:'{H} e dieci',15:'{H} e un quarto',20:'{H} e venti',25:'{H} e venticinque',30:'{H} e mezza',35:'{N} meno venticinque',40:'{N} meno venti',45:'{N} meno un quarto',50:'{N} meno dieci',55:'{N} meno cinque'}, formal:{tpl:'{H} e {M#}',zero:'{H}'}, specials:[{h:12,m:30,text:'mezzogiorno e mezzo'}] },
    /*__TR_es__*/ es: { hourWords:['la una','las dos','las tres','las cuatro','las cinco','las seis','las siete','las ocho','las nueve','las diez','las once','las doce'], hourWordsAlt:null, positions:{0:'{H} en punto',5:'{H} y cinco',10:'{H} y diez',15:'{H} y cuarto',20:'{H} y veinte',25:'{H} y veinticinco',30:'{H} y media',35:'veinticinco para {N}',40:'veinte para {N}',45:'un cuarto para {N}',50:'diez para {N}',55:'cinco para {N}'}, formal:{tpl:'{H} {M#}',zero:'{H} en punto',low:'{H} cero {M#}'}, specials:[] },
    /*__TR_pt__*/ pt: { hourWords:['uma','duas','três','quatro','cinco','seis','sete','oito','nove','dez','onze','meio-dia'], hourWordsAlt:['a uma','as duas','as três','as quatro','as cinco','as seis','as sete','as oito','as nove','as dez','as onze','o meio-dia'], positions:{0:'{H} horas',5:'{H} e cinco',10:'{H} e dez',15:'{H} e quinze',20:'{H} e vinte',25:'{H} e vinte e cinco',30:'{H} e meia',35:'vinte e cinco para {N2}',40:'vinte para {N2}',45:'quinze para {N2}',50:'dez para {N2}',55:'cinco para {N2}'}, formal:{tpl:'{H} e {M#}',zero:'{H} horas'}, specials:[{h:1,m:0,text:'uma hora'},{h:12,m:0,text:'meio-dia'}] },
    /*__TR_nl__*/ nl: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf'], positions:{0:'{H} uur',5:'vijf over {H}',10:'tien over {H}',15:'kwart over {H}',20:'tien voor half {N}',25:'vijf voor half {N}',30:'half {N}',35:'vijf over half {N}',40:'tien over half {N}',45:'kwart voor {N}',50:'tien voor {N}',55:'vijf voor {N}'}, formal:{tpl:'{HW} uur {M#}',zero:'{HW} uur'}, specials:[] },
    /*__TR_sv__*/ sv: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:'{H}',5:'fem över {H}',10:'tio över {H}',15:'kvart över {H}',20:'tjugo över {H}',25:'fem i halv {N}',30:'halv {N}',35:'fem över halv {N}',40:'tjugo i {N}',45:'kvart i {N}',50:'tio i {N}',55:'fem i {N}'}, formal:{tpl:'{HW} och {M#}',zero:'klockan {HW}',low:'{HW} noll {M#}'}, specials:[] },
    /*__TR_da__*/ da: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['et','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv'], positions:{0:'klokken {H}',5:'fem over {H}',10:'ti minutter over {H}',15:'kvart over {H}',20:'ti i halv {N2}',25:'fem i halv {N}',30:'halv {N}',35:'fem over halv {N}',40:'ti over halv {N2}',45:'kvart i {N}',50:'ti i {N}',55:'fem i {N}'}, formal:{tpl:'{HW} {M#}',zero:'klokken {HW}',low:'{HW} nul {M#}'}, specials:[] },
    /*__TR_no__*/ no: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['ett','to','tre','fire','fem','seks','sju','åtte','ni','ti','elleve','tolv'], positions:{0:'klokka {H}',5:'fem over {H}',10:'ti over {H}',15:'kvart over {H}',20:'ti på halv {N}',25:'fem på halv {N}',30:'halv {N}',35:'fem over halv {N}',40:'ti over halv {N}',45:'kvart på {N}',50:'ti på {N}',55:'fem på {N}'}, formal:{tpl:'{HW} {M#}',zero:'klokka {HW}',low:'{HW} null {M#}'}, specials:[] },
    /*__TR_fi__*/ fi: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista'], hourWordsAlt2:['yhtä','kahta','kolmea','neljää','viittä','kuutta','seitsemää','kahdeksaa','yhdeksää','kymmentä','yhtätoista','kahtatoista'], positions:{0:'kello {H}',5:'viisi yli {H2}',10:'kymmenen yli {H2}',15:'vartti yli {H2}',20:'kymmentä vaille puoli {N2}',25:'viittä vaille puoli {N2}',30:'puoli {N}',35:'viisi yli puoli {N2}',40:'kymmenen yli puoli {N2}',45:'varttia vaille {N2}',50:'kymmentä vaille {N2}',55:'viittä vaille {N2}'}, formal:{tpl:'{HW} {M#}',zero:'kello {HW}',low:'{HW} nolla {M#}'}, specials:[] },
  },

  defaults: { voice: true, soundCues: true, warnFirst: true },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' },
    { key: 'soundCues', type: 'toggle', labelKey: 'setCues' },
    /* the warning stage is opt-OUT, not opt-in: the teachers who most
       need it are the least likely to go looking for a setting. */
    { key: 'warnFirst', type: 'toggle', labelKey: 'setWarn' }
  ],

  /* ⚠ v2: the stored shape changed (items carry `snap`, the store carries
     `custom` and `recent`), so the KEY changes too rather than silently
     mis-reading a v1 blob. v1 days are same-day-only and expire at
     midnight anyway, so there is nothing worth migrating. */
  STORE_KEY: 'lcs:our-day:v2',
  ENT_TRUST_DAYS: 14,
  MAX_CARDS: 16,

  /* ===================== PURE engine ================================ */

  /* cards visible in a locale (only/not filters) */
  visibleCards: function (loc) {
    return this.CARDS.filter(function (c) {
      if (c.only && c.only.indexOf(loc) < 0) return false;
      if (c.not && c.not.indexOf(loc) >= 0) return false;
      return true;
    });
  },
  /* ⭐ THE SNAPSHOT WINS. Every card carried in the strip or in a saved
     plan stores its own {name,icon,tint}, and it is consulted first.
     That one rule buys three things at once: a teacher may delete a
     custom card without blanking the Tuesday it appears in; the printed
     sheet is always right; and it fixes the locale-blind template bug —
     a plan saved with `showtell` (en-only) or `honores` (es/pt-only)
     reopened in another locale used to render the literal em-dash that
     NAMES holds as its not-available marker, because '—' is truthy and
     the English fallback never fired. */
  cardName: function (id, loc, snap) {
    if (snap && snap.name) return snap.name;
    var c = ODM.findCustom(this._store && this._store.custom ? this._store.custom : [], id);
    if (c) return c.name;
    var m = this.NAMES[id];
    if (!m) return id;
    var v = m[loc];
    if (!v || v === '—') v = m.en;
    return (!v || v === '—') ? id : v;
  },
  /* a teacher's own words are never routed through ANNOUNCE or dropped
     into a frame that assumes a grammatical form — they are spoken bare. */
  isCustom: function (id) { return typeof id === 'string' && id.indexOf('my:') === 0; },
  announceName: function (id, loc, snap) {
    if (this.isCustom(id) || (snap && snap.name)) return this.cardName(id, loc, snap);
    var ov = this.ANNOUNCE[loc];
    return (ov && ov[id]) || this.cardName(id, loc, snap);
  },

  /* sayTime — positions-path of learning-clock's sayTime (this tool only
     emits 5-minute times, so the formal register never engages). */
  sayTime: function (loc, h, m) {
    var R = this.TIME_RULES[loc] || this.TIME_RULES.en;
    h = ((h - 1) % 12 + 12) % 12 + 1;
    m = ((m % 60) + 60) % 60;
    for (var i = 0; i < (R.specials || []).length; i++) {
      var sp = R.specials[i];
      if (sp.h === h && sp.m === m) return sp.text;
    }
    var tpl = R.positions[m];
    if (!tpl) return null;   /* non-5-min: the picker cannot produce this */
    var n = h % 12 + 1;
    var out = tpl;
    if (R.hourWordsAlt2) out = out.split('{N3}').join(R.hourWordsAlt2[n - 1]);
    if (R.hourWordsAlt) {
      out = out.split('{N2}').join(R.hourWordsAlt[n - 1]);
      out = out.split('{H2}').join(R.hourWordsAlt[h - 1]);
    } else {
      out = out.split('{N2}').join(R.hourWords[n - 1]);
      out = out.split('{H2}').join(R.hourWords[h - 1]);
    }
    out = out.split('{N}').join(R.hourWords[n - 1]);
    out = out.split('{H}').join(R.hourWords[h - 1]);
    return out;
  },
  /* the framed time sentence: "{Activity} ist um halb eins." with the
     fi/da/no leading clock-word STRIP (their pos-0 emits it; the frame
     supplies its own — a doubled clock word is the defect class). */
  timeSentence: function (loc, cardId, h24, m, snap) {
    var h = h24 % 12 === 0 ? 12 : h24 % 12;
    var t = this.sayTime(loc, h, m);
    if (t === null) return null;
    var strip = this.CLOCKWORD_STRIP[loc];
    if (strip && t.indexOf(strip) === 0) t = t.slice(strip.length);
    var frame = this.TIME_FRAME[loc] || this.TIME_FRAME.en;
    var tname = (snap && snap.name) ? snap.name
      : (((this.TIME_NAMES || {})[loc] || {})[cardId] || this.cardName(cardId, loc, snap));
    return frame.split('{a}').join(this._cap(tname)).split('{t}').join(t);
  },
  nowSentence: function (loc, cardId, snap) {
    /* a teacher's own words are spoken BARE — a dignified noun beats
       forcing "Morgonsamling" through a frame that assumes a case. */
    if (this.isCustom(cardId) || (snap && snap.name)) return this._cap(this.cardName(cardId, loc, snap)) + '.';
    var frame = this.NOW_FRAME[loc] || this.NOW_FRAME.en;
    return frame.split('{a}').join(this.announceName(cardId, loc, snap));
  },

  /* ⚠ THE DIGITAL CHIP USED TO BE 24-HOUR IN EVERY LOCALE. An English
     or Brazilian classroom read "13:30" on the card while the voice
     beside it correctly said "half past one" — the two halves of the
     same feature disagreeing. The clock convention is derived from the
     SAME per-locale table the speech uses, so the two cannot drift. */
  CLOCK_12H: { en: true, pt: true, es: true },
  fmtDigital: function (h24, m) {
    var mm = (m < 10 ? '0' + m : String(m));
    if (!this.CLOCK_12H[this.api && this.api.lang]) return h24 + ':' + mm;
    var h = h24 % 12; if (h === 0) h = 12;
    return h + ':' + mm + (h24 < 12 ? ' am' : ' pm');
  },

  /* weekday label: Intl (nb for no), SELF-capitalized, Monday-first */
  WEEKDAYS: ['mon', 'tue', 'wed', 'thu', 'fri'],
  weekdayLabel: function (loc, idx) {
    var locMap = { en: 'en', de: 'de', fr: 'fr', it: 'it', es: 'es-MX', pt: 'pt-BR', nl: 'nl', sv: 'sv', da: 'da', no: 'nb', fi: 'fi' };
    /* idx 0 = Monday; 2024-01-01 was a Monday */
    var d = new Date(Date.UTC(2024, 0, 1 + idx));
    var s = '';
    try { s = new Intl.DateTimeFormat(locMap[loc] || 'en', { weekday: 'long', timeZone: 'UTC' }).format(d); } catch (_) { s = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][idx]; }
    return this._cap(s);
  },
  todayWeekdayIdx: function () {
    var d = new Date().getDay();   /* 0=Sun */
    return d >= 1 && d <= 5 ? d - 1 : -1;
  },
  _cap: function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; },

  /* ========================== mount ================================= */

  premium: false,
  premiumKnown: false,      /* ⚠ unknown entitlement is PESSIMISTIC */

  init: function (api) {
    this.api = api;
    injectOurDayCSS();

    this.day = ODM.newDay();
    this.mode = 'build';        /* build | run | edit */
    this._closeOverlays();
    this.banner = null;         /* pending template banner {idx} */
    this.displayMode = false;
    this.focusMode = false;     /* first-then LENS — never a 2nd schedule */
    this._lastTouch = Date.now();
    this._lastAdvance = 0;      /* double-tap accelerator through the warning */
    this._speaking = false;
    this._actx = null;
    this._voiceState = null;

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 2, ent: null, settings: null, templates: {}, day: null, custom: [], recent: [] };
    if (!this._store.templates) this._store.templates = {};
    this._store.custom = ODM.coerceCustomList(this._store.custom);
    if (!this._store.recent || this._store.recent.length === undefined) this._store.recent = [];
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    /* an all-day tool survives a reload: restore today's day-state.
       ⚠ ALWAYS THROUGH coerceDay — a hand-edited or half-written blob
       must be made total on the way in, never trusted on the way in. */
    if (this._store.day && this._store.day.date === this._todayKey() && this._store.day.state) {
      this.day = ODM.coerceDay(this._store.day.state);
      if (this.day.started) this.mode = 'run';
    }

    this.render();
    this._fetchEntitlement();

    var self = this;
    this._idleTimer = setInterval(function () {
      if (self.mode === 'run' && !self.displayMode && !self._anyOverlayOpen() &&
          Date.now() - self._lastTouch > 60000) {
        self.displayMode = true;
        self.render();
      }
    }, 5000);
    /* ⚠ DISPLAY MODE USED TO BE A ONE-WAY TRAP. Sixty seconds of not
       touching the board — i.e. always, on a projector — set
       displayMode, and display mode set `pointer-events:none` on the
       toolbar that held the ONLY control which could clear it again.
       The teacher then had no Edit, no change ritual, no Print for the
       rest of the school day, and the one in-page escape was the shell's
       Reset, which wipes the day. Any pointer on the tool now leaves it. */
    this._onPointer = function () {
      self._lastTouch = Date.now();
      if (self.displayMode) { self.displayMode = false; self.render(); }
    };
    document.addEventListener('pointerdown', this._onPointer, true);
  },

  _todayKey: function () {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  },
  _persistDay: function () {
    this._store.day = { date: this._todayKey(), state: this.day };
    this._saveStore();
  },
  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },
  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var applyDeepLink = function () {
      if (!self.premium) return;
      var p = new URLSearchParams(location.search);
      var t = p.get('template');
      if (t && self.WEEKDAYS.indexOf(t) >= 0 && self._store.templates[t] && !self.day.started && self.day.items.length === 0) {
        self.banner = { idx: self.WEEKDAYS.indexOf(t) };
        self.render();
      } else if (self._wrap) self.render();
    };
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; self._maybeTemplateBanner(); applyDeepLink(); }
      }
    };
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    /* ⚠ UNKNOWN ENTITLEMENT IS PESSIMISTIC — an unknown tier is a free
       tier until proven otherwise, and the cached 14-day trust applies
       ONLY to a NETWORK failure. An authoritative "free" demotes at once. */
    if (!token) { this.premiumKnown = true; return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { trustCache(); self.premiumKnown = true; return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self.premiumKnown = true;
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        if (self._wrap) { self._maybeTemplateBanner(); applyDeepLink(); self.render(); }
      })
      .catch(function () { trustCache(); self.premiumKnown = true; if (self._wrap) self.render(); });
  },
  /* today's weekday template exists → pre-stage behind a banner (never
     silently start, never make her rebuild) */
  _maybeTemplateBanner: function () {
    if (!this.premium || this.day.started || this.day.items.length) return;
    var idx = this.todayWeekdayIdx();
    if (idx >= 0 && this._store.templates[this.WEEKDAYS[idx]]) this.banner = { idx: idx };
  },

  /* ==================== helpers + speech + sfx ====================== */

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _voiceOk: function () {
    if (this._voiceState !== null) return this._voiceState;
    var ok = true;
    /* ⚠ AN EMPTY getVoices() IS "NOT YET", NOT "YES". Chrome returns []
       until the `voiceschanged` event fires, and the old code fell
       through with ok=true and CACHED it — so on the device where the
       voice is genuinely missing the 🔇 indicator could never appear.
       An indeterminate answer is not cached, and we listen once. */
    try {
      if (!window.speechSynthesis) { this._voiceState = false; return false; }
      var voices = window.speechSynthesis.getVoices() || [];
      if (!voices.length) {
        if (!this._voiceBound) {
          this._voiceBound = true;
          var self = this;
          try {
            window.speechSynthesis.addEventListener('voiceschanged', function () {
              self._voiceState = null;
              if (self._wrap) self.render();
            });
          } catch (_) {}
        }
        return true;                       /* provisional, NOT cached */
      }
      var want = ({ no: 'nb', pt: 'pt' }[this.api.lang] || this.api.lang).toLowerCase();
      ok = voices.some(function (v) { return (v.lang || '').toLowerCase().indexOf(want) === 0; });
      if (!ok && this.api.lang === 'no') ok = voices.some(function (v) { return (v.lang || '').toLowerCase().indexOf('no') === 0; });
    } catch (_) { ok = true; }
    this._voiceState = ok;
    return ok;
  },
  /* one utterance at a time (a kid drumming on a phone must not queue
     twelve sentences); lang passed in THIS arm and the announce arm.

     ⚠ THE ARIA CHANNEL IS A PAYWALL SURFACE TOO. This used to run
     `api.announce(text)` unconditionally, BEFORE the entitlement check —
     so a free screen-reader user heard the whole premium sentence
     ("Lunch is at half past twelve") that the visual free tier never
     shows. A gate that reads the DOM cannot see that leak. The free
     tier now announces the bare activity name, which is exactly what the
     free tier renders. */
  _speak: function (text, item) {
    if (this.premium) this.api.announce(text);
    else if (item) this.api.announce(this.cardName(item.id, this.api.lang, item.snap));
    if (!this.premium || !this.api.settings.voice) return;
    if (!this._voiceOk()) return;
    var self = this;
    if (this._speaking) return;
    this._speaking = true;
    setTimeout(function () { self._speaking = false; }, 1200);
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },
  _anyOverlayOpen: function () {
    return this.changeIdx !== null || this.timeIdx !== null || this._palOpen ||
           this._makeOpen || this._tmplOpen || this.gateOpen;
  },
  _ctx: function () {
    if (this._actx === null) {
      try { var AC = window.AudioContext || window.webkitAudioContext; this._actx = AC ? new AC() : false; } catch (_) { this._actx = false; }
    }
    if (this._actx && this._actx.state === 'suspended') { try { this._actx.resume(); } catch (_) {} }
    return this._actx;
  },
  _note: function (freq, at, dur, peak) {
    if (!this.api.settings.soundCues) return;
    var ctx = this._ctx();
    if (!ctx) return;
    var t = ctx.currentTime + (at || 0);
    var osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak || 0.09, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.25));
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + (dur || 0.25) + 0.05);
  },
  _sfxAppend: function () { this._note(587.33, 0, 0.10, 0.06); },
  _sfxAdvance: function () { this._note(523.25, 0, 0.22, 0.07); this._note(659.25, 0.12, 0.30, 0.06); },
  _sfxChange: function () { this._note(493.88, 0, 0.14, 0.06); this._note(587.33, 0.10, 0.18, 0.06); },
  /* the warning cue — ONE soft descending pair, played once, never
     repeated and never chased by a second chime. Descending, so it
     cannot read as an alarm; quieter than the crossing, so the crossing
     is still the event. */
  _sfxWarn: function () { this._note(659.25, 0, 0.16, 0.045); this._note(523.25, 0.13, 0.26, 0.04); },
  _sfxDone: function () { this._note(523.25, 0, 0.26, 0.06); this._note(440.00, 0.16, 0.30, 0.05); this._note(349.23, 0.34, 0.46, 0.05); },

  /* ======================== day actions =============================
     ⚠ EVERY ONE OF THESE IS NOW A THIN WRAPPER OVER ODM. The state
     rules live in the pure model where a Node gate can drive them; what
     stays here is only the things a model must not know about — sound,
     speech, persistence and repaint. The old versions carried four bugs
     that a model gate would have caught on day one:
       · advance() was a bare sunIdx++, so the sun landed on a MOON-FOLDED
         card and the tool announced "Now it's time for Swimming!" about
         the very thing it had just cancelled;
       · addCard/moveCard never adjusted sunIdx while removeCard did, so
         inserting ahead of the sun silently rewrote which activities
         were finished;
       · skipCard/swapCard had no guard against the past, despite a
         comment claiming "only for future cards";
       · there was no end-of-day state at all.
     ================================================================= */

  addCard: function (cardId, at, snap) {
    if (this.day.items.length >= ODM.MAX_CARDS) { this._notice = 'dayFull'; this.render(); return false; }
    if (!ODM.addCard(this.day, cardId, at, snap)) return false;
    this._noteRecent(cardId);
    this._sfxAppend();
    this._persistDay();
    return true;
  },
  removeCard: function (idx) { if (ODM.removeCard(this.day, idx)) this._persistDay(); },
  moveCard: function (from, to) { if (ODM.moveCard(this.day, from, to)) this._persistDay(); },

  startDay: function () {
    if (!ODM.startDay(this.day)) return;
    this.mode = 'run';
    this._persistDay();
    var first = this.day.items[this.day.sunIdx];
    if (first) this._speak(this.nowSentence(this.api.lang, first.id), first);
    this.render();
  },

  /* TWO-STAGE ADVANCE — tap 1 warns, tap 2 crosses (§ REFUSE 8).
     `force` is the double-tap accelerator and the settings opt-out. */
  advance: function (force) {
    var r = ODM.advance(this.day, force || !this.api.settings.warnFirst);
    if (!r) return;
    if (r === 'warned') {
      this._sfxWarn();
      var nx = this.day.items[ODM.nextStop(this.day, this.day.sunIdx)];
      if (nx) this._speak(this.fmt('soonFrame', { a: this.announceName(nx.id, this.api.lang) }), nx);
      this._persistDay();
      this.render();
      return;
    }
    if (r === 'end') {
      this._sfxDone();
      this._speak(this.api.t('dayDoneSpoken'));
    } else {
      this._sfxAdvance();
      var next = this.day.items[this.day.sunIdx];
      if (next) this._speak(this.nowSentence(this.api.lang, next.id), next);
    }
    this._persistDay();
    this.render();
  },

  /* ⚠ THE STEP-BACK IS PERMANENT. It used to self-destruct 12 seconds
     after the advance, so a mis-tap noticed at the end of a sentence was
     unrecoverable — and once the day ended it was unreachable entirely,
     because it only rendered on the card the sun was sitting on. */
  unAdvance: function () {
    if (!ODM.unAdvance(this.day)) return;
    this._persistDay();
    this.render();
  },

  /* the change ritual — swap keeps the old activity small + legible */
  swapCard: function (idx, newId, snap) {
    var it = this.day.items[idx];
    if (!it) return;
    var oldId = it.id, oldSnap = it.snap;
    if (!ODM.swapCard(this.day, idx, newId, snap)) return;
    this._sfxChange();
    this._speak(this.fmt('changeSpoken', {
      nw: this.announceName(newId, this.api.lang, snap),
      old: this.announceName(oldId, this.api.lang, oldSnap)
    }));
    this._persistDay();
  },

  /* the moon-fold. A weekday turns a deferral into an appointment:
     "Thursday" instead of "another day" is the difference between a loss
     and a plan, and it is the cheapest kind thing in this tool. */
  skipCard: function (idx, weekday) {
    var it = this.day.items[idx];
    if (!it || !ODM.skipCard(this.day, idx, weekday)) return false;
    if (it.skipped) {
      this._notice = null;
      this.api.announce(this.fmt(it.skipDay === null ? 'removedNote' : 'removedOnDay', {
        name: this.cardName(it.id, this.api.lang, it.snap),
        day: it.skipDay === null ? '' : this.weekdayLabel(this.api.lang, it.skipDay)
      }));
    }
    this._persistDay();
    return true;
  },

  setTime: function (idx, h, m) { if (ODM.setTime(this.day, idx, h, m)) this._persistDay(); },

  /* the palette's Recent row — a teacher's day is the same 10-14 cards,
     and the catalogue is a long tail. This is what actually buys the
     "thirty seconds", far more than any grid does. */
  _noteRecent: function (cardId) {
    var r = this._store.recent || [];
    for (var i = 0; i < r.length; i++) if (r[i] === cardId) { r.splice(i, 1); break; }
    r.unshift(cardId);
    if (r.length > 8) r.length = 8;
    this._store.recent = r;
  },

  /* card-tap speech (RUN mode): time set → the framed time sentence;
     no time → the after/first frame; free tier → pulse only */
  speakCard: function (idx) {
    var it = this.day.items[idx];
    var loc = this.api.lang;
    if (it.time) { this._speak(this.timeSentence(loc, it.id, it.time.h, it.time.m, it.snap), it); return; }
    if (idx === 0) { this._speak(this.fmt('firstFrame', { a: this._cap(this.announceName(it.id, loc, it.snap)) }), it); return; }
    var prev = this.day.items[idx - 1];
    this._speak(this.fmt('afterFrame', {
      a: this._cap(this.announceName(it.id, loc, it.snap)),
      b: this.announceName(prev.id, loc, prev.snap)
    }), it);
  },

  /* templates — stored WITH snapshots, so a saved plan is safe against
     both a deleted custom card and a locale change. */
  saveTemplate: function (slot) {
    if (!this.premium) return;
    var prev = this._store.templates[slot];
    this._store.templates[slot] = {
      items: ODM.templateFromDay(this.day),
      name: prev && prev.name ? prev.name : null,
      ts: Date.now()
    };
    this._saveStore();
    this.render();
  },
  loadTemplate: function (slot) {
    if (!this.premium) return;
    var t = this._store.templates[slot];
    if (!t) return;
    this.day = ODM.dayFromTemplate(t.items);
    this.mode = 'build';
    this.banner = null;
    this._persistDay();
    this.render();
  },

  /* ============================ render ==============================
     BUILD / PAINT SPLIT. The old render() was `stage.innerHTML = ''`
     followed by a full rebuild, called from every interaction — which is
     survivable for a tool made only of buttons and fatal the moment a
     teacher is typing a card name into a field, because a re-render
     mid-keystroke throws her out of it. _build() lays the skeleton once;
     _paint() recomputes from state.

     ⚠ THE SHELL CALLS render() WITH NO ARGUMENTS and re-calls it on
     every settings commit and on resize. Taking an `api` parameter here
     would wipe this.api on the second call.
     ================================================================= */

  render: function () {
    if (!this._wrap || !this._wrap.parentNode) this._build();
    this._paint();
  },

  _build: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    document.body.classList.add('od-wide');

    var wrap = api.el('div', 'od-wrap');
    this._wrap = wrap;
    this._bannerHost = api.el('div', 'od-bannerhost');
    this._main       = api.el('div', 'od-main');
    this._ribbonHost = api.el('div', 'od-ribbonhost');
    this._nowHost    = api.el('div', 'od-nowhost');
    this._barHost    = api.el('div', 'od-barhost');
    this._sheetHost  = api.el('div', 'od-sheethost');
    this._main.append(this._ribbonHost, this._nowHost);
    wrap.append(this._bannerHost, this._main, this._barHost, this._sheetHost);
    api.stage.appendChild(wrap);

    /* ⚠ MEASURE THE BOX, DO NOT MATCH A MEDIA QUERY. Every wide tier
       this tool used to ship was keyed `min-width:1367px`, and the tool
       page pins the iframe at 704px at 1440, 1920 and 2560 alike — so
       all three tiers were dead on the one surface teachers actually
       use. A ResizeObserver on our own wrap cannot be wrong about that,
       and it also retires all five `vh` rules, which resolve against the
       iframe and form a feedback path with the shell's height broadcast. */
    var relayout = function () { self._measure(); };
    if (window.ResizeObserver) {
      this._ro = new ResizeObserver(relayout);
      this._ro.observe(wrap);
    }
    window.addEventListener('resize', relayout);
    if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
      document.fonts.ready.then(function () { self._measure(); self._paint(); });
    }
  },

  /* the three layouts. STACK = one narrow column. DESK = one column with
     room to breathe and height to spend. BOARD = the projector: the day
     as a ribbon on the left, ONE card at hero scale on the right. */
  _measure: function () {
    var wrap = this._wrap;
    if (!wrap) return;
    var w = Math.round(wrap.clientWidth || 0);
    var vh = Math.round((document.documentElement && document.documentElement.clientHeight) || 0);
    /* inside an auto-resizing iframe the visible height is the PARENT's
       and we cannot see it, so height-driven layout is only claimed when
       we are demonstrably standing alone. */
    var standalone = false;
    try { standalone = (window.self === window.top); } catch (_) { standalone = false; }
    var h = standalone ? vh : 0;
    var mode = 'desk';
    if (w < 560) mode = 'stack';
    else if (h > 0 && (w / h) >= 1.1) mode = 'board';
    wrap.style.setProperty('--od-w', String(w));
    wrap.style.setProperty('--od-h', String(h || Math.round(w * 0.9)) + 'px');
    if (this._layout !== mode) { this._layout = mode; wrap.setAttribute('data-layout', mode); return true; }
    wrap.setAttribute('data-layout', mode);
    return false;
  },

  _paint: function () {
    var self = this, api = this.api;
    if (!this._wrap) return;
    this._measure();

    this._wrap.className = 'od-wrap'
      + (this.displayMode ? ' od-display' : '')
      + (this.focusMode ? ' od-focus' : '')
      + (this.premium ? ' od-paid' : '');
    /* the print rules are scoped to this class, so the class IS the
       second half of the print double-lock (see the CSS). */
    document.body.classList.toggle('od-paid', !!this.premium);

    this._bannerHost.innerHTML = '';
    if (this.banner) this._bannerHost.appendChild(this._bannerEl());
    if (this._notice) this._bannerHost.appendChild(this._noticeEl());

    this._ribbonHost.innerHTML = '';
    this._ribbonHost.appendChild(this._strip());

    this._nowHost.innerHTML = '';
    if (this._layout === 'board' && this.mode !== 'build') this._nowHost.appendChild(this._nowPanel());

    this._barHost.innerHTML = '';
    this._barHost.appendChild(this._toolbar());
    /* ⚠ THE DISPLAY-MODE ESCAPE MUST BE IN THE DOM, not merely written.
       A dead control is exactly what made display mode a trap the first
       time, and a source scan cannot tell "the function exists" from
       "the function is reached". */
    if (!this._moreEl) { this._moreEl = this._moreBtn(); this._wrap.appendChild(this._moreEl); }

    this._sheetHost.innerHTML = '';
    if (this.gateOpen)          this._sheetHost.appendChild(this._gatePanel());
    if (this._palOpen)          this._sheetHost.appendChild(this._sheet(this._paletteBody(), 'od-sheet-pal'));
    if (this._makeOpen)         this._sheetHost.appendChild(this._sheet(this._makeBody(), 'od-sheet-make'));
    if (this._tmplOpen)         this._sheetHost.appendChild(this._sheet(this._templatesBody(), 'od-sheet-tmpl'));
    if (this.timeIdx !== null)  this._sheetHost.appendChild(this._sheet(this._timeBody(), 'od-sheet-time'));

    /* the printable documents live off-screen and are ABSENT from the
       DOM unless entitled — the first half of the print double-lock. */
    this._paintPrintDocs();
  },

  _noticeEl: function () {
    var n = this.api.el('div', 'od-notice');
    n.setAttribute('role', 'status');
    n.textContent = this.api.t(this._notice === 'dayFull' ? 'dayFull'
      : this._notice === 'listFull' ? 'noticeFull'
      : this._notice === 'tooLong' ? 'noticeLong'
      : this._notice === 'duplicate' ? 'noticeDup' : 'noticeEmpty');
    return n;
  },

  _bannerEl: function () {
    var api = this.api, self = this;
    var b = api.el('div', 'od-banner');
    var day = this.weekdayLabel(api.lang, this.banner.idx);
    var msg = api.el('span', '');
    msg.textContent = this.fmt('tmplReady', { day: day });
    b.appendChild(msg);
    b.appendChild(this._chipBtn(api.t('tmplUse'), 'od-chip od-on', function () {
      var slot = self.WEEKDAYS[self.banner.idx];
      self.banner = null;
      self.loadTemplate(slot);
    }));
    b.appendChild(this._chipBtn(api.t('tmplFresh'), 'od-chip', function () { self.banner = null; self.render(); }));
    return b;
  },

  /* ------- the strip / ribbon ------- */
  _strip: function () {
    var api = this.api, self = this;
    var host = api.el('div', 'od-striphost');
    var strip = api.el('div', 'od-strip');
    var n = this.day.items.length;

    if (!n) {
      var hint = api.el('div', 'od-empty');
      /* ⚠ the old copy said "the cards to the LEFT" in eight locales
         while the phone stacked the palette ABOVE — and after the
         rebuild the palette is a sheet, so no direction is true at all.
         Direction words are gone from every locale. */
      hint.textContent = api.t('emptyHint');
      strip.appendChild(hint);
      strip.appendChild(this._addSlot());
      host.appendChild(strip);
      return host;
    }

    /* ⚠ THE CARD-HEIGHT BUDGET IS NOW A REAL FIT, NOT A CLAIM. The old
       `max(56, min(96, 560/n))` stopped deciding at n>=10 — the 56 floor
       won, sixteen cards came to ~990px, neither the strip nor its host
       had any overflow, and the tool measured 117%-204% of the viewport
       at every viewport and every locale. The ribbon now solves for the
       space it actually has. */
    var cardH = this._cardHeight(n);
    strip.style.setProperty('--od-cardh', cardH + 'px');
    strip.setAttribute('data-cards', String(n));
    /* ⚠ TIGHT MODE IS A HONEST DEGRADATION, AND IT CHANGES WHAT THE ROWS
       ARE. Below 44px a ribbon row cannot be a tap target without
       breaking the control floor — so at that size it stops being one.
       On a projector the tappable things are the sun, the NOW panel and
       the toolbar; the ribbon is what the CLASS reads. Sixteen names at
       20px on a wall are unreadable anyway, while sixteen icons at 34px
       are recognisable, and §23.2 says the icon is the content. */
    this._tight = (cardH < 44);
    if (this._tight) strip.classList.add('od-tight');

    var showFrom = 0, showTo = n;
    if (this.focusMode && this.mode !== 'build' && !ODM.atEnd(this.day)) {
      showFrom = this.day.sunIdx;
      showTo = Math.min(n, this.day.sunIdx + 2);
    }
    for (var i = 0; i < n; i++) {
      if (i >= showFrom && i < showTo) strip.appendChild(this._cardEl(i, cardH));
      else if (this.focusMode) strip.appendChild(this._ghostEl(i));
    }
    if (this.mode === 'build' || this.mode === 'edit') strip.appendChild(this._addSlot());
    if (this.mode === 'run' && ODM.atEnd(this.day)) strip.appendChild(this._sunsetEl());
    host.appendChild(strip);
    /* ⚠ SHRINKING THE CONTENTS IS NOT ENOUGH — CAP THE CONTAINER.
       Card height has real floors under it (a 34px icon, a 52px sun that
       must stay a legal tap target), so past a certain card count the
       budget stops being achievable and the strip pushes the app past
       the projector again. On a board the ribbon scrolls instead; the
       apparatus never exceeds the screen it is projected on, which is
       the whole claim the old build made and never met. */
    if (this._layout === 'board') {
      var cap = this._availableStripHeight();
      if (cap > 120) { host.style.maxHeight = cap + 'px'; host.style.overflowY = 'auto'; }
    }
    return host;
  },

  /* ⚠ THE CHROME IS MEASURED, NOT GUESSED. The first version of this
     subtracted a flat 150px for "the chrome" and the board came out at
     131% of a 1024x768 projector — because the real chrome is the shell
     header (81-92px, and it grows with the locale), the toolbar (60),
     the strip host padding, the wrap gaps and the card padding, which is
     210-240px. A constant I invented is not a measurement; the DOM
     already knows the answer, so ask it. */
  _availableStripHeight: function () {
    var vh = (document.documentElement && document.documentElement.clientHeight) || 0;
    if (!vh) return 0;
    var top = 0;
    try { top = this._ribbonHost.getBoundingClientRect().top; } catch (_) { top = 120; }
    var bar = 0;
    try { bar = this._barHost.getBoundingClientRect().height || 60; } catch (_) { bar = 60; }
    /* 20 = the striphost's own vertical padding, 16 = wrap gap + breathing */
    return Math.max(120, vh - top - bar - 64);
  },

  _cardHeight: function (n) {
    var w = parseFloat(this._wrap.style.getPropertyValue('--od-w')) || 704;
    if (this._layout === 'board') {
      var avail = this._availableStripHeight();
      if (!avail) avail = 520;
      return Math.max(26, Math.min(84, Math.floor((avail - (n - 1) * 6 - 20) / Math.max(1, n))));
    }
    if (this._layout === 'stack') return Math.max(64, Math.min(96, Math.round(w * 0.22)));
    /* DESK: height is genuinely free — the iframe grows and the page
       scrolls — so the cards get the size that reads, not the size that
       fits an imaginary budget. */
    return Math.max(72, Math.min(104, Math.floor(1180 / Math.max(1, n))));
  },

  _ghostEl: function (i) {
    var it = this.day.items[i];
    var g = this.api.el('span', 'od-ghost' + (it.skipped ? ' od-ghost-skip' : ''));
    g.innerHTML = this._iconSVG(it.id, it.snap);
    g.title = this.cardName(it.id, this.api.lang, it.snap);
    return g;
  },

  /* the wordless "+" slot that opens the palette sheet */
  _addSlot: function () {
    var self = this;
    var b = this.api.el('button', 'od-addslot');
    b.type = 'button';
    b.setAttribute('aria-label', this.api.t('addCardAria'));
    b.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 8v16M8 16h16" stroke="#146B5E" stroke-width="3.4" stroke-linecap="round" fill="none"/></svg>';
    b.addEventListener('click', function () {
      self._palOpen = true; self._notice = null;
      /* open where she can act: her own cards if she has any, the cards
         she uses most if she has history, else the whole catalogue. */
      if (self._palGroup === undefined || self._palGroup === null) {
        self._palGroup = (self._store.custom && self._store.custom.length) ? 'mine' : 'recent';
      }
      self.render();
    });
    return b;
  },

  _cardEl: function (i, cardH) {
    var api = this.api, self = this;
    var it = this.day.items[i];
    var isDone = ODM.isDone(this.day, i);
    var isNow = ODM.isNow(this.day, i);
    var warnNext = this.day.warned && !ODM.atEnd(this.day) && i === ODM.nextStop(this.day, this.day.sunIdx);
    var cls = 'od-card'
      + (isDone ? ' od-done' : '')
      + (isNow ? ' od-now' : '')
      + (it.skipped ? ' od-skipped' : '')
      + (warnNext ? ' od-soon' : '');
    var row = api.el('div', cls);
    if (it.snap && it.snap.tint) row.style.setProperty('--od-tint', it.snap.tint);

    /* ⚠ THE RAIL IS A FIXED 2-CELL GRID, NOT A FLEX BOX. It used to be
       `flex:0 0 56px` holding a 52px sun PLUS a 30px step-back — 86px of
       content in a 56px basis — so the flex item grew and the current
       card's name started ~28px to the right of every other name.
       Cell 1: the ordinal, or the sun when this is the current card.
       Cell 2: the step-back, which is now PERMANENT. */
    var rail = api.el('div', 'od-rail');
    var c1 = api.el('div', 'od-railcell');
    if (isNow) {
      var sun = api.el('button', 'od-sun');
      sun.type = 'button';
      sun.setAttribute('aria-label', api.t('sunAria'));
      sun.innerHTML = this._sunSVG();
      sun.addEventListener('click', function () {
        var now = Date.now();
        var quick = (now - self._lastAdvance) < 1200;   /* double-tap passes through */
        self._lastAdvance = now;
        self.advance(quick);
      });
      c1.appendChild(sun);
    } else {
      /* numerals are explicitly permitted (§23.2) and they give the class
         and the schedule helper something to point at and count. */
      var ord = api.el('span', 'od-ord');
      ord.textContent = String(i + 1);
      ord.setAttribute('aria-hidden', 'true');
      c1.appendChild(ord);
    }
    rail.appendChild(c1);
    var c2 = api.el('div', 'od-railcell');
    if (this.mode === 'run' && this.day.sunIdx > 0 && isNow) c2.appendChild(this._pebble());
    rail.appendChild(c2);
    row.appendChild(rail);

    /* body: icon + name (+ was:). A display row in tight mode, a button
       everywhere else — see the note in _strip. */
    var body = api.el(this._tight ? 'div' : 'button', 'od-cardbody');
    if (!this._tight) body.type = 'button';
    var nm = this.cardName(it.id, api.lang, it.snap);
    var txt = '<span class="od-cardtext"><span class="od-cardname"' + (nm.length > 18 ? ' data-long="1"' : '') + '>'
      + this._esc(this._cap(nm)) + '</span>';
    if (it.changedFrom) {
      txt += '<span class="od-was">' + this._esc(this.fmt('wasLabel', { name: this.cardName(it.changedFrom, api.lang, it.changedSnap) })) + '</span>';
    }
    if (it.skipped) {
      txt += '<span class="od-was">' + this._esc(it.skipDay === null ? api.t('skipNoDay') : this.weekdayLabel(api.lang, it.skipDay)) + '</span>';
    }
    txt += '</span>';
    body.innerHTML = this._iconSVG(it.id, it.snap) + txt;
    body.addEventListener('click', function () {
      if (self.mode === 'edit') { self.changeIdx = (self.changeIdx === i ? null : i); self.changePick = null; self.render(); return; }
      body.classList.remove('od-pulse'); void body.offsetWidth; body.classList.add('od-pulse');
      if (self.premium && self.mode === 'run') self.speakCard(i);
      else self.api.announce(self.cardName(it.id, self.api.lang, it.snap));
    });
    row.appendChild(body);

    /* the drawn state marks — a real mark, not a CSS filter. A filter is
       subtractive and "finished" is additive; a filter cannot be two
       shapes for two opposite meanings; and, decisively, a filter CANNOT
       REACH PAPER, so the substitute's printed strip could not show
       which activities had happened. */
    if (isDone) { var dm = api.el('span', 'od-mark'); dm.innerHTML = this._doneMarkSVG(); row.appendChild(dm); }
    else if (it.skipped) { var sm = api.el('span', 'od-mark'); sm.innerHTML = this._skipMarkSVG(); row.appendChild(sm); }

    /* time chip (premium) */
    if (this.premium && (it.time || this.mode === 'edit')) {
      var chip = api.el('button', 'od-timechip' + (it.time ? '' : ' od-timechip-add'));
      chip.type = 'button';
      chip.setAttribute('aria-label', this.fmt('timeAria', { name: nm }));
      chip.innerHTML = it.time
        ? this._miniClock(it.time.h, it.time.m) + '<span>' + this._esc(this.fmtDigital(it.time.h, it.time.m)) + '</span>'
        : '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 6v12M6 12h12" stroke="#5B4A2F" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>';
      chip.addEventListener('click', function (e) {
        e.stopPropagation();
        if (self.mode === 'edit') { self.timeIdx = i; self._pick = null; self.render(); }
        else if (it.time) self._speak(self.timeSentence(self.api.lang, it.id, it.time.h, it.time.m, it.snap), it);
      });
      row.appendChild(chip);
    }

    if (this.mode === 'edit') row.appendChild(this._editTools(i, nm));
    if (this.changeIdx === i) row.appendChild(this._changePanel(i));
    return row;
  },

  /* ⚠ REORDER IS NO LONGER DRAG-ONLY. It used to be a pointerdown on a
     15px <span> with no tabindex and no role — so reordering the day was
     completely unavailable to a keyboard or to assistive tech, and the
     liveness gate scored the control DEAD because a synthetic click
     never fires pointerdown. Two 44px buttons are also simply better on
     an interactive whiteboard, where drag is unreliable. */
  _editTools: function (i, nm) {
    var api = this.api, self = this, n = this.day.items.length;
    var box = api.el('div', 'od-edittools');
    var up = api.el('button', 'od-iconbtn');
    up.type = 'button';
    up.setAttribute('aria-label', this.fmt('upAria', { name: nm }));
    up.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 18V7m-5 5 5-5 5 5" stroke="#146B5E" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    up.disabled = (i === 0);
    up.addEventListener('click', function (e) { e.stopPropagation(); self.moveCard(i, i - 1); self.render(); });
    var dn = api.el('button', 'od-iconbtn');
    dn.type = 'button';
    dn.setAttribute('aria-label', this.fmt('downAria', { name: nm }));
    dn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v11m-5-5 5 5 5-5" stroke="#146B5E" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    dn.disabled = (i === n - 1);
    dn.addEventListener('click', function (e) { e.stopPropagation(); self.moveCard(i, i + 1); self.render(); });
    box.append(up, dn);
    return box;
  },

  _pebble: function () {
    var self = this;
    var p = this.api.el('button', 'od-pebble');
    p.type = 'button';
    p.setAttribute('aria-label', this.api.t('backAria'));
    p.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6 9 12l6 6" stroke="#fff" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    p.addEventListener('click', function (e) { e.stopPropagation(); self.unAdvance(); });
    return p;
  },

  /* ------- the change ritual -------
     ⚠ IT IS NO LONGER A FULL-SCREEN SCRIM. The old overlay covered the
     whole strip in front of the class, so the anxious child could not
     see WHERE the change landed — which is the entire point of the
     ritual. The card itself opens downward and the day stays visible
     above and below it. The change belongs to that card. */
  _changePanel: function (idx) {
    var api = this.api, self = this;
    var it = this.day.items[idx];
    var p = api.el('div', 'od-changepanel');

    if (this.changePick === 'skip') {
      var q = api.el('div', 'od-change-hint');
      q.textContent = api.t('skipWhich');
      p.appendChild(q);
      var days = api.el('div', 'od-change-opts');
      for (var d = 0; d < 5; d++) {
        (function (dd) {
          days.appendChild(self._chipBtn(self.weekdayLabel(api.lang, dd), 'od-chip', function () {
            self.skipCard(idx, dd); self.changeIdx = null; self.changePick = null; self.render();
          }));
        }(d));
      }
      days.appendChild(this._chipBtn(api.t('skipNoDay'), 'od-chip od-chip-ghost', function () {
        self.skipCard(idx, null); self.changeIdx = null; self.changePick = null; self.render();
      }));
      p.appendChild(days);
      return p;
    }

    if (this.changePick) {                      /* pick a replacement card */
      var h = api.el('div', 'od-change-hint');
      h.textContent = api.t('changeTitle');
      p.appendChild(h);
      p.appendChild(this._paletteGrid(function (cardId, snap) {
        if (self.changePick === 'swap') self.swapCard(idx, cardId, snap);
        else if (self.changePick === 'before') self.addCard(cardId, idx, snap);
        else self.addCard(cardId, idx + 1, snap);
        self.changeIdx = null; self.changePick = null; self.render();
      }));
      return p;
    }

    var ttl = api.el('div', 'od-change-hint');
    ttl.textContent = api.t('changeTitle');
    p.appendChild(ttl);
    /* ⚠ ORDERED BY KINDNESS, NOT BY CODE PATH. The old panel put a
       destructive "Remove it" in the same chip row, at the same weight,
       as "Add before" — and buried the gentle "Another day" among them. */
    var r1 = api.el('div', 'od-change-opts');
    if (ODM.canSwap(this.day, idx)) {
      r1.appendChild(this._chipBtn(api.t('changeSwap'), 'od-chip od-on', function () { self.changePick = 'swap'; self.render(); }));
    }
    r1.appendChild(this._chipBtn(api.t('changeAddB'), 'od-chip', function () { self.changePick = 'before'; self.render(); }));
    r1.appendChild(this._chipBtn(api.t('changeAddA'), 'od-chip', function () { self.changePick = 'after'; self.render(); }));
    p.appendChild(r1);

    var r2 = api.el('div', 'od-change-opts od-change-quiet');
    if (ODM.canSkip(this.day, idx) && !it.skipped) {
      r2.appendChild(this._chipBtn(api.t('skipCard'), 'od-chip od-chip-ghost', function () { self.changePick = 'skip'; self.render(); }));
    } else if (it.skipped) {
      r2.appendChild(this._chipBtn(api.t('tmplUse'), 'od-chip od-chip-ghost', function () {
        self.skipCard(idx, null); self.changeIdx = null; self.render();
      }));
    }
    var rm = this._chipBtn(api.t('changeRemove'), 'od-chip od-chip-quiet', function () {
      self.removeCard(idx); self.changeIdx = null; self.render();
    });
    r2.appendChild(rm);
    p.appendChild(r2);
    return p;
  },

  /* ------- the end of the day -------
     The tool used to end on nothing: once sunIdx passed the last card no
     card was "now", so the sun AND the step-back both stopped rendering,
     and a comment claimed a CSS marker that did not exist. For a class
     that has watched a sun travel down a list all day, that is a story
     with no last page. */
  _sunsetEl: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'od-sunset');
    var art = api.el('button', 'od-sunset-art');
    art.type = 'button';
    art.setAttribute('aria-label', api.t('backAria'));
    art.innerHTML = this._dayDoneSVG();
    /* the resting sun IS the step-back, so the way back never disappears
       and it sits exactly where the class is already looking. */
    art.addEventListener('click', function () { self.unAdvance(); });
    box.appendChild(art);

    var ttl = api.el('div', 'od-sunset-title');
    ttl.textContent = api.t('dayDoneTitle');
    box.appendChild(ttl);

    /* one dot per card the class completed — wordless, countable, and
       five-year-olds count them aloud without being asked. A skipped
       card gets a hollow dot: a skipped thing is not a failed thing. */
    var dots = api.el('div', 'od-sunset-dots');
    dots.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < this.day.items.length; i++) {
      var d = api.el('span', 'od-dot' + (this.day.items[i].skipped ? ' od-dot-skip' : ''));
      dots.appendChild(d);
    }
    box.appendChild(dots);

    box.appendChild(this._chipBtn(api.t('tomorrowChip'), 'od-chip', function () {
      /* "same again" is the overwhelmingly common next action, and the
         only path used to be the shell's Reset, which blanks everything. */
      self.day.started = false;
      self.day.sunIdx = 0;
      self.day.warned = false;
      for (var k = 0; k < self.day.items.length; k++) {
        self.day.items[k].changedFrom = null;
        self.day.items[k].changedSnap = null;
        self.day.items[k].skipped = false;
        self.day.items[k].skipDay = null;
      }
      self.mode = 'build';
      self._persistDay();
      self.render();
    }));
    return box;
  },

  /* ------- the NOW panel (BOARD only) -------
     The current card stops earning its dominance with a 3px honey ring —
     which loses against a projector's washed gamma at four metres — and
     earns it by being a different object at a different scale. */
  _nowPanel: function () {
    var api = this.api, self = this;
    var p = api.el('div', 'od-now-panel');
    if (ODM.atEnd(this.day)) { p.appendChild(this._sunsetEl()); return p; }
    var it = this.day.items[this.day.sunIdx];
    if (!it) return p;

    var ic = api.el('div', 'od-now-icon');
    ic.innerHTML = this._iconSVG(it.id, it.snap);
    p.appendChild(ic);

    var nm = api.el('div', 'od-now-name');
    nm.textContent = this._cap(this.cardName(it.id, api.lang, it.snap));
    p.appendChild(nm);

    if (this.premium && it.time) {
      var t = api.el('div', 'od-now-time');
      t.innerHTML = this._miniClock(it.time.h, it.time.m) + '<span>' + this._esc(this.fmtDigital(it.time.h, it.time.m)) + '</span>';
      p.appendChild(t);
    }

    /* "what's after this?" is the most-asked question in the room, and
       the class used to have to squint at a ribbon to answer it. */
    var ni = ODM.nextStop(this.day, this.day.sunIdx);
    if (ni < this.day.items.length) {
      var nx = this.day.items[ni];
      var nrow = api.el('div', 'od-now-next' + (this.day.warned ? ' od-now-next-soon' : ''));
      nrow.innerHTML = '<span class="od-now-nextlbl">' + this._esc(api.t('nextLbl')) + '</span>'
        + this._iconSVG(nx.id, nx.snap)
        + '<span class="od-now-nextname">' + this._esc(this._cap(this.cardName(nx.id, api.lang, nx.snap))) + '</span>';
      p.appendChild(nrow);
    }
    return p;
  },

  /* ------- one sheet primitive for all four overlays -------
     The old tool had THREE overlay grammars: the gate was an inline
     block that pushed the layout down, change and time were fixed
     scrims, templates were an inline block appended after the toolbar
     that grew the iframe and shoved the page. */
  _sheet: function (body, cls) {
    var api = this.api, self = this;
    var scrim = api.el('div', 'od-scrim');
    var panel = api.el('div', 'od-sheet ' + (cls || ''));
    var x = api.el('button', 'od-close');
    x.type = 'button';
    x.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="#8A7A5C" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>';
    /* ⚠ this used to be a hard-coded English "close" in all 11 locales */
    x.setAttribute('aria-label', api.t('closeAria'));
    x.addEventListener('click', function () { self._closeSheets(); });
    panel.append(x, body);
    scrim.appendChild(panel);
    scrim.addEventListener('click', function (e) { if (e.target === scrim) self._closeSheets(); });
    return scrim;
  },
  _closeSheets: function () {
    this._palOpen = false;
    this._makeOpen = false;
    this._makeEdit = null;
    this._tmplOpen = false;
    this.timeIdx = null;
    this._pick = null;
    this._notice = null;
    this.render();
  },

  /* ------- the palette, as a sheet -------
     ⚠ THE OLD PALETTE COULD NOT DELIVER ITS OWN "THIRTY SECONDS".
     `flex:0 0 32%` of 704 is 213px holding variable-width chips, which
     is where the ragged rows of one and two came from; ~1500px of
     content sat inside a ~500px scroller clipped mid-card so it did not
     even look scrollable; and every append re-rendered the palette and
     reset its scrollTop, so a ten-card day meant re-scrolling a 1500px
     list ten times. */
  _paletteBody: function () {
    var api = this.api, self = this;
    var body = api.el('div', 'od-palbody');

    var t = api.el('h3', 'od-sheet-title');
    t.textContent = api.t('emptyHint');
    body.appendChild(t);

    /* the group rail: My cards first, then the six bands */
    var rail = api.el('div', 'od-grouprail');
    var mk = function (label, key) {
      var b = self._chipBtn(label, 'od-chip od-chip-sm' + (self._palGroup === key ? ' od-on' : ''), function () {
        self._palGroup = key; self.render();
      });
      rail.appendChild(b);
    };
    mk(api.t('addOwn'), 'mine');
    for (var g = 0; g < this.GROUPS.length; g++) mk(api.t(this.GROUPS[g]), g);
    body.appendChild(rail);

    body.appendChild(this._paletteGrid(function (cardId, snap) {
      if (self.addCard(cardId, undefined, snap)) self.render();     /* sheet STAYS OPEN for multi-add */
    }));
    return body;
  },

  /* the uniform grid. `repeat(auto-fill, minmax(...))` with identical
     tiles makes ragged wrapping structurally impossible. */
  _paletteGrid: function (onPick) {
    var api = this.api, self = this;
    var box = api.el('div', 'od-palwrap');
    var group = (this._palGroup === undefined || this._palGroup === null) ? 'recent' : this._palGroup;

    var tile = function (id, name, snap) {
      var b = api.el('button', 'od-tile');
      b.type = 'button';
      b.innerHTML = self._iconSVG(id, snap) + '<span class="od-tilename">' + self._esc(self._cap(name)) + '</span>';
      b.addEventListener('click', function () { onPick(id, snap); });
      return b;
    };

    /* Recent — a teacher's day is the same 10-14 cards and the catalogue
       is a long tail. THIS is what buys the thirty seconds. */
    var recent = this._store.recent || [];
    if (group === 'recent' && recent.length) {
      var rl = api.el('div', 'od-band-label'); rl.textContent = api.t('recentLbl');
      var rg = api.el('div', 'od-grid');
      for (var r = 0; r < recent.length; r++) {
        var cid = recent[r];
        var cs = ODM.findCustom(this._store.custom, cid);
        if (!cs && !this.NAMES[cid]) continue;
        rg.appendChild(tile(cid, this.cardName(cid, api.lang), cs ? { name: cs.name, icon: cs.icon, tint: cs.tint } : null));
      }
      box.append(rl, rg);
    }

    if (group === 'mine') {
      box.appendChild(this._mineGrid(onPick, tile));
      return box;
    }

    var cards = this.visibleCards(api.lang);
    var start = (group === 'recent') ? 0 : group;
    var end = (group === 'recent') ? this.GROUPS.length - 1 : group;
    for (var gi = start; gi <= end; gi++) {
      var inGroup = cards.filter(function (c) { return c.group === gi; });
      if (!inGroup.length) continue;
      var lbl = api.el('div', 'od-band-label');
      lbl.textContent = api.t(this.GROUPS[gi]);
      var grid = api.el('div', 'od-grid');
      for (var k = 0; k < inGroup.length; k++) grid.appendChild(tile(inGroup[k].id, this.cardName(inGroup[k].id, api.lang)));
      box.append(lbl, grid);
    }
    return box;
  },

  /* ------- ★ My cards ------- */
  _mineGrid: function (onPick, tile) {
    var api = this.api, self = this;
    var box = api.el('div', '');
    var lbl = api.el('div', 'od-band-label');
    lbl.textContent = api.t('addOwn');
    box.appendChild(lbl);

    var grid = api.el('div', 'od-grid');
    var list = this._store.custom || [];
    for (var i = 0; i < list.length; i++) {
      (function (c) {
        var snap = { name: c.name, icon: c.icon, tint: c.tint };
        var t = tile(c.id, c.name, snap);
        var pen = api.el('button', 'od-tileedit');
        pen.type = 'button';
        pen.setAttribute('aria-label', api.t('editChip') + ': ' + c.name);
        pen.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19h4L20 8l-4-4L5 15z" fill="none" stroke="#146B5E" stroke-width="2" stroke-linejoin="round"/></svg>';
        pen.addEventListener('click', function (e) {
          e.stopPropagation();
          self._makeEdit = c.id;
          self._makeName = c.name; self._makeIcon = c.icon; self._makeTint = c.tint;
          self._palOpen = false; self._makeOpen = true; self._notice = null;
          self.render();
        });
        t.appendChild(pen);
        grid.appendChild(t);
      }(list[i]));
    }

    var add = api.el('button', 'od-tile od-tile-new');
    add.type = 'button';
    add.setAttribute('aria-label', api.t('makeTitle'));
    add.innerHTML = '<svg class="od-ic" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 14v20M14 24h20" stroke="#146B5E" stroke-width="3.6" stroke-linecap="round" fill="none"/></svg>'
      + '<span class="od-tilename">' + this._esc(api.t('makeTitle')) + '</span>';
    add.addEventListener('click', function () {
      self._makeEdit = null;
      self._makeName = ''; self._makeIcon = 'star'; self._makeTint = ODM_TINTS[0];
      self._palOpen = false; self._makeOpen = true; self._notice = null;
      self.render();
    });
    grid.appendChild(add);
    box.appendChild(grid);

    var note = api.el('p', 'od-devicenote');
    note.textContent = api.t('makeDeviceOnly');
    box.appendChild(note);
    return box;
  },

  /* ------- make a card -------
     ⚠ THE COLOUR GOES ON THE TILE AND THE SYMBOL IS KNOCKED OUT OF IT
     IN CREAM. A teacher cannot judge contrast, and if she picks the ink
     she will eventually pick honey on cream and produce an invisible
     card. Inverting it makes legibility STRUCTURAL: cream on any of the
     six tints is >=3:1 by construction, it greyscales cleanly at 14mm,
     and a solid tile with a hole in it is the strongest possible mark at
     thumbnail size. It also means a teacher's card LOOKS like a
     teacher's card, which the class learns. */
  _makeBody: function () {
    var api = this.api, self = this;
    var body = api.el('div', 'od-makebody');

    var t = api.el('h3', 'od-sheet-title');
    t.textContent = api.t('makeTitle');
    body.appendChild(t);

    var inp = document.createElement('input');
    inp.className = 'od-input';
    inp.type = 'text';
    inp.maxLength = ODM.MAX_NAME;
    inp.value = this._makeName || '';
    inp.setAttribute('aria-label', api.t('makeTitle'));
    inp.autocapitalize = 'sentences';
    inp.addEventListener('input', function () { self._makeName = inp.value; });
    body.appendChild(inp);

    var hint = api.el('p', 'od-makehint');
    hint.textContent = api.t('makeHint');
    body.appendChild(hint);

    /* tints FIRST and above the grid, because tapping one recolours all
       36 tiles at once — the grid IS the preview, so she never has to
       compose the finished card in her head. */
    var tints = api.el('div', 'od-tintrow');
    for (var i = 0; i < ODM_TINTS.length; i++) {
      (function (tint) {
        var b = api.el('button', 'od-tintbtn' + (self._makeTint === tint ? ' od-on' : ''));
        b.type = 'button';
        b.style.setProperty('background-color', tint);
        b.setAttribute('aria-label', tint);
        b.addEventListener('click', function () { self._makeTint = tint; self.render(); });
        tints.appendChild(b);
      }(ODM_TINTS[i]));
    }
    body.appendChild(tints);

    var grid = api.el('div', 'od-glyphgrid');
    for (var k in ODM_GLYPHS) {
      (function (key) {
        var b = api.el('button', 'od-glyphbtn' + (self._makeIcon === key ? ' od-on' : ''));
        b.type = 'button';
        b.setAttribute('aria-label', key);
        b.innerHTML = self._madeSVG(key, self._makeTint);
        b.addEventListener('click', function () { self._makeIcon = key; self.render(); });
        grid.appendChild(b);
      }(k));
    }
    body.appendChild(grid);

    var acts = api.el('div', 'od-makeacts');
    acts.appendChild(this._chipBtn(api.t(this._makeEdit ? 'makeSave' : 'makeAdd'), 'od-chip od-on od-chip-go', function () {
      var r = ODM.addCustom(self._store.custom, self._makeName, self._makeIcon, self._makeTint, 4, self._makeEdit);
      if (r !== 'ok') { self._notice = r; self.render(); return; }
      self._saveStore();
      if (!self._makeEdit) {
        var c = self._store.custom[self._store.custom.length - 1];
        self.addCard(c.id, undefined, { name: c.name, icon: c.icon, tint: c.tint });
      }
      self._makeOpen = false; self._makeEdit = null; self._notice = null;
      self.render();
    }));
    if (this._makeEdit) {
      acts.appendChild(this._chipBtn(api.t('makeDelete'), 'od-chip od-chip-quiet', function () {
        /* removes it from the PALETTE only — cards already on today's
           strip or in a saved plan keep their snapshot and stay put. */
        ODM.removeCustom(self._store.custom, self._makeEdit);
        self._saveStore();
        self._makeOpen = false; self._makeEdit = null;
        self.render();
      }));
    }
    body.appendChild(acts);
    return body;
  },

  /* ------- weekly plans, as a shelf of objects -------
     The old panel was sixteen ragged chips in four rows: five weekday
     buttons, five "Save as <day>" buttons, then three unnameable stars
     with their own save buttons — and a thumbnail that was a vertical
     column of 16px icons. */
  _templatesBody: function () {
    var api = this.api, self = this;
    var body = api.el('div', 'od-tmplbody');
    var t = api.el('h3', 'od-sheet-title');
    t.textContent = api.t('tmplTitle');
    body.appendChild(t);

    if (!this.premium) { body.appendChild(this._gateLine()); return body; }

    var shelf = api.el('div', 'od-shelf');
    var slots = this.WEEKDAYS.concat(['a', 'b', 'c']);
    var today = this.todayWeekdayIdx();
    slots.forEach(function (slot, si) {
      var stored = self._store.templates[slot];
      var label = si < 5 ? self.weekdayLabel(api.lang, si)
        : ((stored && stored.name) ? stored.name : '★' + (si - 4));
      var card = api.el('div', 'od-plan' + (si === today ? ' od-plan-today' : ''));

      var open = api.el('button', 'od-plan-face');
      open.type = 'button';
      /* the thumbnail IS the day, shrunk — the same rows, the same
         order, one tinted bar per card. It reads instantly as a day
         because it is one. */
      var th = '<span class="od-thumb">';
      if (stored && stored.items) {
        for (var q = 0; q < Math.min(stored.items.length, 12); q++) {
          var sn = stored.items[q].snap;
          th += '<span class="od-thumbrow"' + (sn && sn.tint ? ' style="--od-tint:' + sn.tint + '"' : '') + '>'
             + self._iconSVG(stored.items[q].id, sn) + '</span>';
        }
      }
      th += '</span>';
      open.innerHTML = th + '<span class="od-plan-name">' + self._esc(label) + '</span>';
      open.addEventListener('click', function () { self._planOpen = (self._planOpen === slot ? null : slot); self.render(); });
      card.appendChild(open);

      if (self._planOpen === slot) {
        var acts = api.el('div', 'od-plan-acts');
        if (stored) {
          acts.appendChild(self._chipBtn(api.t('tmplUse'), 'od-chip od-chip-sm od-on', function () {
            self.loadTemplate(slot); self._planOpen = null; self._tmplOpen = false; self.render();
          }));
        }
        var saveLbl = stored ? api.t('tmplSaveHere') : api.t('tmplSaveHere');
        var save = self._chipBtn(saveLbl, 'od-chip od-chip-sm', function () {
          /* overwriting a term's work used to be silent */
          if (stored && self._planConfirm !== slot) { self._planConfirm = slot; self.render(); return; }
          self.saveTemplate(slot);
          self._planConfirm = null; self._planOpen = null;
          self.render();
        });
        save.disabled = !self.day.items.length;
        acts.appendChild(save);
        if (self._planConfirm === slot) {
          var q2 = api.el('span', 'od-plan-confirm');
          q2.textContent = self.fmt('tmplReplace', { day: label });
          acts.appendChild(q2);
          acts.appendChild(self._chipBtn(api.t('tmplKeep'), 'od-chip od-chip-sm od-chip-ghost', function () {
            self._planConfirm = null; self.render();
          }));
        }
        if (si >= 5) {
          var nin = document.createElement('input');
          nin.className = 'od-input od-input-sm';
          nin.type = 'text';
          nin.maxLength = 18;
          nin.value = (stored && stored.name) ? stored.name : '';
          nin.setAttribute('aria-label', api.t('tmplName'));
          nin.addEventListener('change', function () {
            var nm = ODM.cleanName(nin.value).slice(0, 18);
            if (!self._store.templates[slot]) return;
            self._store.templates[slot].name = nm || null;
            self._saveStore(); self.render();
          });
          nin.disabled = !stored;
          acts.appendChild(nin);
        }
        card.appendChild(acts);
      }
      shelf.appendChild(card);
    });
    body.appendChild(shelf);
    return body;
  },

  /* ------- the time picker ------- */
  _timeBody: function () {
    var api = this.api, self = this;
    var idx = this.timeIdx;
    var it = this.day.items[idx];
    var body = api.el('div', 'od-timebody');
    if (!it) return body;

    if (!this._pick || this._pickFor !== idx) {
      var seed = it.time;
      if (!seed) {
        for (var j = idx - 1; j >= 0; j--) {
          if (this.day.items[j].time) {
            var t0 = this.day.items[j].time;
            var mins = t0.h * 60 + t0.m + 30;
            /* ⚠ the old seed clamped the HOUR to 16 while keeping the
               rolled-over minutes, so a card at 16:45 seeded the next
               one at 16:15 — thirty minutes EARLIER than the card it
               follows. Clamp the whole minute count, not the hour. */
            if (mins > 18 * 60) mins = 18 * 60;
            seed = { h: Math.floor(mins / 60), m: mins % 60 - (mins % 60) % 5 };
            break;
          }
        }
      }
      if (!seed) seed = { h: 8, m: 0 };
      this._pick = { h: seed.h, m: seed.m };
      this._pickFor = idx;
    }

    var h3 = api.el('h3', 'od-sheet-title');
    h3.textContent = this.fmt('timeAria', { name: this.cardName(it.id, api.lang, it.snap) });
    body.appendChild(h3);

    var prev = api.el('div', 'od-tp-preview');
    prev.innerHTML = this._miniClock(this._pick.h, this._pick.m) + '<span>' + this._esc(this.fmtDigital(this._pick.h, this._pick.m)) + '</span>';
    body.appendChild(prev);

    var hrow = api.el('div', 'od-tp-row');
    /* 6-18, not 7-16: a breakfast club at 6:45 and aftercare at 17:00
       used to be silently unrepresentable. */
    for (var h = 6; h <= 18; h++) {
      (function (hh) {
        hrow.appendChild(self._chipBtn(String(hh), 'od-chip od-tp-key' + (self._pick.h === hh ? ' od-on' : ''), function () { self._pick.h = hh; self.render(); }));
      }(h));
    }
    body.appendChild(hrow);

    var mrow = api.el('div', 'od-tp-row');
    for (var m = 0; m < 60; m += 5) {
      (function (mm) {
        mrow.appendChild(self._chipBtn(':' + (mm < 10 ? '0' + mm : mm), 'od-chip od-tp-key' + (self._pick.m === mm ? ' od-on' : ''), function () { self._pick.m = mm; self.render(); }));
      }(m));
    }
    body.appendChild(mrow);

    var acts = api.el('div', 'od-tp-actions');
    acts.appendChild(this._chipBtn(api.t('doneChip'), 'od-chip od-on od-chip-go', function () {
      self.setTime(idx, self._pick.h, self._pick.m);
      self.timeIdx = null; self._pick = null; self.render();
    }));
    acts.appendChild(this._chipBtn(api.t('timeNone'), 'od-chip', function () {
      self.setTime(idx, null); self.timeIdx = null; self._pick = null; self.render();
    }));
    body.appendChild(acts);
    return body;
  },

  /* ------- the toolbar ------- */
  _toolbar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'od-toolbar');

    if (this.mode === 'build') {
      var start = api.el('button', 'od-start');
      start.type = 'button';
      start.textContent = api.t('startDay');
      start.disabled = !this.day.items.length;
      start.addEventListener('click', function () { self.startDay(); });
      bar.appendChild(start);
    } else {
      bar.appendChild(this._chipBtn(this.mode === 'edit' ? api.t('doneChip') : api.t('editChip'),
        'od-chip od-editchip' + (this.mode === 'edit' ? ' od-on' : ''), function () {
          self.mode = self.mode === 'edit' ? 'run' : 'edit';
          self.displayMode = false;
          self.changeIdx = null; self.changePick = null; self.timeIdx = null;
          self.render();
        }));
      /* ⚠ a card could not be removed or reordered in BUILD mode at all:
         Edit only rendered when mode !== 'build'. A mis-tap while
         building was undoable only by starting the day, entering Edit
         and fixing it there — or by Reset. */
      bar.appendChild(this._chipBtn(api.t('focusChip'), 'od-chip' + (this.focusMode ? ' od-on' : ''), function () {
        self.focusMode = !self.focusMode; self.render();
      }));
    }
    if (this.mode === 'build' && this.day.items.length) {
      bar.appendChild(this._chipBtn(api.t('editChip'), 'od-chip' + (this.mode === 'edit' ? ' od-on' : ''), function () {
        self.mode = 'edit'; self.render();
      }));
    }

    bar.appendChild(api.el('div', 'od-spacer'));

    if (this.api.settings.voice && this.premium && !this._voiceOk()) {
      var vm = api.el('span', 'od-voicemiss');
      vm.title = api.t('voiceMissing');
      vm.textContent = '🔇';
      bar.appendChild(vm);
    }

    bar.appendChild(this._chipBtn(api.t('tmplTitle'), 'od-chip' + (!this.premium ? ' od-locked' : ''), function () {
      if (!self.premium) { self.gateOpen = true; self.render(); return; }
      self._tmplOpen = true; self._planOpen = null; self._planConfirm = null;
      self.render();
    }));
    bar.appendChild(this._chipBtn(api.t('printChip'), 'od-chip' + (!this.premium ? ' od-locked' : ''), function () {
      if (!self.premium) { self.gateOpen = true; self.render(); return; }
      try { window.print(); } catch (_) {}
    }));
    return bar;
  },

  /* the display-mode exit. The chrome fades on a projector so the day
     owns the screen, but there must always be a way back to it. */
  _moreBtn: function () {
    var self = this;
    var b = this.api.el('button', 'od-more');
    b.type = 'button';
    b.setAttribute('aria-label', this.api.t('moreChip'));
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2" fill="#146B5E"/><circle cx="12" cy="12" r="2" fill="#146B5E"/><circle cx="18" cy="12" r="2" fill="#146B5E"/></svg>';
    b.addEventListener('click', function () { self.displayMode = false; self.render(); });
    return b;
  },

  /* ⚠ THE GATE LINE IS TWO NODES, NEVER A CONCATENATION. */
  _gateLine: function () {
    var api = this.api;
    var g = api.el('div', 'od-gate');
    var p = api.el('p', 'od-gate-text');
    p.textContent = api.t('gatePremium');
    var a = api.el('a', 'od-gate-link');
    a.href = '/' + api.lang + '/pricing?from=tool-our-day';
    a.target = '_top';
    a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(p, a);
    return g;
  },
  _gatePanel: function () {
    var self = this;
    var body = this.api.el('div', '');
    body.appendChild(this._gateLine());
    return this._sheet(body, 'od-sheet-gate');
  },

  _chipBtn: function (label, cls, fn) {
    var b = this.api.el('button', cls);
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },
  _esc: function (s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },


  /* ================= PRINT — two real documents =====================
     ⚠ DOUBLE-LOCKED, and the reason is on the record: gating the CHIP is
     not gating the FEATURE, because Ctrl+P is guarded by no button. The
     old build shipped an UNCONDITIONAL `@media print` block, so a free
     visitor pressing Ctrl+P got the whole premium sheet. So:
       1. these subtrees are ABSENT from the DOM unless entitled, and
       2. every print rule is scoped `body.od-paid`,
     and a free visitor pressing Ctrl+P therefore gets a NORMAL page —
     not a blank one, which is the other way to get this wrong.

     ⚠ AND THE SHELL RESET IS PART OF THE CONTRACT: lcs-shell.css ships
     ZERO @media print blocks (verified), so html,body{height:100%;
     overflow:hidden} and the .lcs-app max-width survive into print and
     would clip a twelve-card day to one screenful — which is exactly the
     day a substitute needs.

     Two documents, because they are two different jobs. A substitute
     needs a DOCUMENT (where the class goes, who to ask, what changed,
     who leaves the room). A child needs a STRIP (portrait,
     icon-dominant, one tick box per card, and NO TIMES — a time on a
     child's desk strip becomes a deadline the child polices themselves
     against, which is the exact failure §20.4 exists to prevent). */
  _paintPrintDocs: function () {
    if (!this._printHost) {
      this._printHost = this.api.el('div', 'od-printdocs');
      this._wrap.appendChild(this._printHost);
    }
    this._printHost.innerHTML = '';
    if (!this.premium) return;
    this._printHost.appendChild(this._subSheet());
    this._printHost.appendChild(this._deskStrip());
  },

  _subSheet: function () {
    var api = this.api, self = this;
    var d = api.el('section', 'od-doc od-doc-sub');

    var h = api.el('header', 'od-doc-head');
    h.innerHTML = '<h1>' + this._esc(api.t('title')) + '</h1>'
      + '<p class="od-doc-meta">' + this._esc(api.t('printWith')) + '</p>';
    d.appendChild(h);

    var list = api.el('ol', 'od-doc-list');
    for (var i = 0; i < this.day.items.length; i++) {
      var it = this.day.items[i];
      var li = api.el('li', 'od-doc-row' + (it.skipped ? ' od-doc-skip' : ''));
      var t = (this.premium && it.time) ? this.fmtDigital(it.time.h, it.time.m) : '';
      li.innerHTML = '<span class="od-doc-ord">' + (i + 1) + '</span>'
        + this._iconSVG(it.id, it.snap)
        + '<span class="od-doc-name">' + this._esc(this._cap(this.cardName(it.id, api.lang, it.snap))) + '</span>'
        + '<span class="od-doc-time">' + this._esc(t) + '</span>'
        + '<span class="od-doc-rule"></span>';
      list.appendChild(li);
    }
    d.appendChild(list);

    /* today's changes — this is where "was: PE" belongs on paper */
    var changed = [];
    for (var k = 0; k < this.day.items.length; k++) {
      var c = this.day.items[k];
      if (c.changedFrom) changed.push(this.fmt('changeSpoken', {
        nw: this.cardName(c.id, api.lang, c.snap),
        old: this.cardName(c.changedFrom, api.lang, c.changedSnap)
      }));
      else if (c.skipped) changed.push(this.fmt(c.skipDay === null ? 'removedNote' : 'removedOnDay', {
        name: this.cardName(c.id, api.lang, c.snap),
        day: c.skipDay === null ? '' : this.weekdayLabel(api.lang, c.skipDay)
      }));
    }
    if (changed.length) {
      var ch = api.el('div', 'od-doc-changes');
      ch.innerHTML = '<h2>' + this._esc(api.t('changeTitle')) + '</h2>';
      var ul = api.el('ul', '');
      for (var m = 0; m < changed.length; m++) {
        var li2 = api.el('li', '');
        li2.textContent = changed[m];
        ul.appendChild(li2);
      }
      ch.appendChild(ul);
      d.appendChild(ch);
    }

    var notes = api.el('div', 'od-doc-notes');
    notes.innerHTML = '<h2>' + this._esc(api.t('printNotes')) + '</h2>'
      + '<span class="od-doc-lines"></span>';
    d.appendChild(notes);
    return d;
  },

  _deskStrip: function () {
    var api = this.api;
    var d = api.el('section', 'od-doc od-doc-desk');
    /* printed 2-up so one sheet serves two children */
    for (var copy = 0; copy < 2; copy++) {
      var col = api.el('div', 'od-desk-col');
      var hd = api.el('div', 'od-desk-head');
      hd.textContent = api.t('printWith');
      col.appendChild(hd);
      for (var i = 0; i < this.day.items.length; i++) {
        var it = this.day.items[i];
        var row = api.el('div', 'od-desk-row' + (it.skipped ? ' od-doc-skip' : ''));
        row.innerHTML = this._iconSVG(it.id, it.snap)
          + '<span class="od-desk-name">' + this._esc(this._cap(this.cardName(it.id, api.lang, it.snap))) + '</span>'
          + '<span class="od-desk-tick"></span>';
        col.appendChild(row);
      }
      d.appendChild(col);
    }
    return d;
  },

  /* ------- SVG: the sun, the mini clock, the activity icons -------
     ⚠ THE SIGNATURE MARK WAS THE LEAST VISIBLE THING IN THE TOOL. Eight
     identical LINE rays stroked #F2C879 on #FFFCF2 is about 1.3:1 — on a
     projector in a daylit room the corona simply is not there, and on
     paper it is gone. Filled petals with a #E0A63C keyline have mass and
     survive both. The petals also ALTERNATE long and short, because a
     sun drawn with eight equal spokes is an asterisk. */
  _sunSVG: function () {
    var petal = '<path d="M24 3 27.4 15.4a13.4 13.4 0 0 0-6.8 0z"/>';
    var stub  = '<path d="M24 6.5 27 15.6a13.4 13.4 0 0 0-6 0z"/>';
    var rays = '', a = [0, 90, 180, 270], b = [45, 135, 225, 315], i;
    for (i = 0; i < a.length; i++) rays += '<g transform="rotate(' + a[i] + ' 24 24)">' + petal + '</g>';
    for (i = 0; i < b.length; i++) rays += '<g transform="rotate(' + b[i] + ' 24 24)">' + stub + '</g>';
    return '<svg viewBox="0 0 48 48" aria-hidden="true">'
      + '<g class="od-sun-rays" fill="#F2C879" stroke="#E0A63C" stroke-width="2" stroke-linejoin="round">' + rays + '</g>'
      + '<circle cx="24" cy="24" r="13" fill="#F2C879" stroke="#E0A63C" stroke-width="2.4"/>'
      + '<circle cx="20" cy="21.5" r="1.9" fill="#8F6512"/><circle cx="28" cy="21.5" r="1.9" fill="#8F6512"/>'
      + '<path d="M19.4 27q4.6 4 9.2 0" stroke="#8F6512" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>';
  },
  _miniClock: function (h24, m) {
    var h = h24 % 12;
    var ha = (h + m / 60) * 30 - 90, ma = m * 6 - 90;
    var hx = 12 + 5.5 * Math.cos(ha * Math.PI / 180), hy = 12 + 5.5 * Math.sin(ha * Math.PI / 180);
    var mx = 12 + 8 * Math.cos(ma * Math.PI / 180), my = 12 + 8 * Math.sin(ma * Math.PI / 180);
    return '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#146B5E" stroke-width="1.6"/>' +
      '<line x1="12" y1="12" x2="' + hx.toFixed(1) + '" y2="' + hy.toFixed(1) + '" stroke="#146B5E" stroke-width="2" stroke-linecap="round"/>' +
      '<line x1="12" y1="12" x2="' + mx.toFixed(1) + '" y2="' + my.toFixed(1) + '" stroke="#F2784B" stroke-width="1.5" stroke-linecap="round"/></svg>';
  },
  /* a teacher-made card: a solid tint tile with the symbol knocked out
     of it in cream. Legibility is structural, not a judgement call. */
  _madeSVG: function (glyph, tint) {
    var g = ODM_GLYPHS[glyph] || ODM_GLYPHS.star;
    return '<svg class="od-ic od-ic-made" viewBox="0 0 48 48" style="color:' + (tint || ODM_TINTS[0]) + '" aria-hidden="true">'
      + '<rect x="3" y="3" width="42" height="42" rx="13" fill="currentColor"/>' + g + '</svg>';
  },
  /* ⚠ THE UNKNOWN-ID FALLBACK IS NOT `centers`. It used to be, which
     means an unrecognised card silently rendered the FREE PLAY icon —
     on a board a class reads all day that is not a null state, it is a
     wrong statement. A neutral star claims nothing. */
  _iconSVG: function (id, snap) {
    if (snap && snap.icon) return this._madeSVG(snap.icon, snap.tint);
    var c = ODM.findCustom(this._store && this._store.custom ? this._store.custom : [], id);
    if (c) return this._madeSVG(c.icon, c.tint);
    var P = this.ICON_PATHS[id];
    if (!P) return this._madeSVG('star', ODM_TINTS[0]);
    return '<svg class="od-ic" viewBox="0 0 48 48" aria-hidden="true">' + P + '</svg>';
  },

  /* ------- the drawn state marks -------
     A filter is subtractive and "finished" is additive; every visual
     schedule a SEN coordinator recognises marks a finished thing by
     PUTTING SOMETHING ON IT. A filter also cannot be two shapes for two
     opposite meanings, and — decisively — it cannot reach paper, so the
     substitute's printed strip could not show what had happened. */
  _doneMarkSVG: function () {
    return '<svg viewBox="0 0 32 32" class="od-mark-done" aria-hidden="true">'
      + '<circle cx="16" cy="16" r="14" fill="#146B5E"/>'
      + '<path d="M9 16.5l4.6 4.8L23.2 11" fill="none" stroke="#FFFDF7" stroke-width="4.2"'
      + ' stroke-linecap="round" stroke-linejoin="round"/></svg>';
  },
  /* a BAR in a soft ring, never a red cross and never a diagonal slash.
     A cross means wrong; a slash means forbidden; a bar means removed
     from the list — which is the truth, and which is the mark Nordic
     bildschema already use. */
  _skipMarkSVG: function () {
    return '<svg viewBox="0 0 32 32" class="od-mark-skip" aria-hidden="true">'
      + '<circle cx="16" cy="16" r="13.6" fill="#FBF3E4" stroke="#8A9A96" stroke-width="2.8"/>'
      + '<path d="M9.5 16h13" stroke="#8A9A96" stroke-width="4.2" stroke-linecap="round"/></svg>';
  },

  /* the sun comes to rest. The only possible closing mark for this tool,
     because it is the only one with narrative continuity: the thing that
     carried the class through the day lies down at the end of it. No
     trophy and no fireworks — a class that had a hard day deserves the
     same ending as a class that had a good one. */
  _dayDoneSVG: function () {
    return '<svg viewBox="0 0 96 56" class="od-daydone" aria-hidden="true">'
      + '<g fill="#F2C879" stroke="#E0A63C" stroke-width="2" stroke-linejoin="round">'
      +   '<path d="M48 4 51.4 15a12 12 0 0 0-6.8 0z"/>'
      +   '<path d="M28.7 9.9 37 17.4a12 12 0 0 0-3.4 5.9z"/>'
      +   '<path d="M67.3 9.9 59 17.4a12 12 0 0 1 3.4 5.9z"/>'
      +   '<path d="M20 27h11.5a12 12 0 0 1 .6-3.4z"/>'
      +   '<path d="M76 27H64.5a12 12 0 0 0-.6-3.4z"/>'
      + '</g>'
      + '<path d="M35 38a13 13 0 0 1 26 0z" fill="#F2C879" stroke="#E0A63C" stroke-width="2.4" stroke-linejoin="round"/>'
      + '<path d="M42 31q2.6 2.8 5.2 0m1.6 0q2.6 2.8 5.2 0" fill="none" stroke="#8F6512" stroke-width="2.2" stroke-linecap="round"/>'
      + '<path d="M44 35.5q4 3.4 8 0" fill="none" stroke="#8F6512" stroke-width="2.2" stroke-linecap="round"/>'
      + '<path d="M4 38h88" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>'
      + '<circle cx="14" cy="17" r="2" fill="#C9A8E0"/><circle cx="24" cy="10" r="1.6" fill="#9CC3E5"/>'
      + '<circle cx="82" cy="16" r="2" fill="#C9A8E0"/><circle cx="72" cy="9" r="1.6" fill="#9CC3E5"/>'
      + '</svg>';
  },
  /* flat Direction-A icons — teal strokes, coral/honey accents, 2-4
     primitives each (deliberately simple: readable at 34px from the
     back row beats illustrative detail) */
  ICON_PATHS: {
    arrival:   '<rect x="27" y="6" width="15" height="36" rx="2" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6"/><circle cx="38" cy="24" r="1.8" fill="#E0A63C"/><circle cx="11" cy="12" r="5" fill="#F2C879" stroke="#E0A63C" stroke-width="1.8"/><path d="M11 17v11M6 23h10M6 41l5-13 5 13" fill="none" stroke="#F2784B" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 24h6m-2.6-3.4L26 24l-3.6 3.4" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    circle:    '<circle cx="24" cy="24" r="6.5" fill="#F2C879" stroke="#8F6512" stroke-width="2"/><circle cx="24" cy="11" r="6" fill="#F2784B"/><circle cx="36.4" cy="20" r="6" fill="#146B5E"/><circle cx="31.6" cy="34.5" r="6" fill="#9CC3E5" stroke="#146B5E" stroke-width="2"/><circle cx="16.4" cy="34.5" r="6" fill="#C9A8E0" stroke="#146B5E" stroke-width="2"/><circle cx="11.6" cy="20" r="6" fill="#7FA860"/>',
    tidyup:    '<path d="M32 6 24 21" stroke="#146B5E" stroke-width="3.4" stroke-linecap="round"/><path d="M18 21h12l2 5H16z" fill="#8A6B4A"/><path d="M14 26h20l4 14H10z" fill="#F2C879" stroke="#8F6512" stroke-width="2" stroke-linejoin="round"/><path d="M18 26v14m6-14v14m6-14v14" stroke="#8F6512" stroke-width="1.8" opacity=".55"/>',
    lineup:    '<circle cx="10" cy="13" r="5" fill="#F2784B"/><circle cx="24" cy="13" r="5" fill="#F2C879" stroke="#8F6512" stroke-width="1.8"/><circle cx="38" cy="13" r="5" fill="#9CC3E5" stroke="#146B5E" stroke-width="1.8"/><path d="M10 18v14m-4.5 6 4.5-6 4.5 6M24 18v14m-4.5 6 4.5-6 4.5 6M38 18v14m-4.5 6 4.5-6 4.5 6" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 43h40" stroke="#0E5147" stroke-width="2.6" stroke-linecap="round"/>',
    packup:    '<rect x="9" y="17" width="30" height="25" rx="5" fill="#F2784B"/><path d="M9 25a15 10 0 0 1 30 0z" fill="#C4552B"/><rect x="15" y="24" width="6" height="7" rx="1.6" fill="#F2C879"/><rect x="27" y="24" width="6" height="7" rx="1.6" fill="#F2C879"/><path d="M19 17q5-6 10 0" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round"/>',
    home:      '<path d="M8 24 24 10l16 14" fill="none" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 24v16h22V24" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><rect x="21" y="30" width="6" height="10" fill="#146B5E"/>',
    aftercare: '<path d="M5 25 24 11l19 14" fill="none" stroke="#146B5E" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="34" r="7" fill="#F2784B" stroke="#C4552B" stroke-width="2"/><rect x="27" y="28" width="13" height="13" rx="2.5" fill="#F2C879" stroke="#8F6512" stroke-width="2"/>',
    reading:   '<path d="M24 12q-8-5-16-3v26q8-2 16 3 8-5 16-3V9q-8-2-16 3z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 12v26" stroke="#146B5E" stroke-width="2.5"/>',
    storytime: '<path d="M24 16 8 11v20l16 5 16-5V11z" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/><path d="M24 16v20" stroke="#146B5E" stroke-width="2.4"/><circle cx="14" cy="43" r="5" fill="#F2784B"/><circle cx="34" cy="43" r="5" fill="#F2C879" stroke="#8F6512" stroke-width="1.8"/>',
    writing:   '<path d="M12 36 32 16l6 6-20 20-8 2z" fill="#F2C879" stroke="#E0A63C" stroke-width="2" stroke-linejoin="round"/><path d="M32 16l4-4 6 6-4 4" fill="#F2784B" stroke="#C4552B" stroke-width="2" stroke-linejoin="round"/>',
    math:      '<circle cx="12" cy="12" r="6" fill="#F2784B"/><circle cx="27" cy="12" r="6" fill="#F2C879" stroke="#8F6512" stroke-width="1.8"/><path d="M8 32h16M16 24v16" stroke="#146B5E" stroke-width="5" stroke-linecap="round"/><path d="M30 27h12m-12 9h12" stroke="#0E5147" stroke-width="4.5" stroke-linecap="round"/>',
    phonics:   '<path d="M6 39 17 9l11 30M10.5 30h13" fill="none" stroke="#146B5E" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="31" r="6.5" fill="none" stroke="#F2784B" stroke-width="4"/><path d="M42.5 25v13" stroke="#F2784B" stroke-width="4" stroke-linecap="round"/>',
    science:   '<path d="M20 8v12L10 38a4 4 0 0 0 4 6h20a4 4 0 0 0 4-6L28 20V8" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 32h16l4 8H13z" fill="#9CC3E5"/><path d="M17 8h14" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',
    art:       '<path d="M24 6C14 6 6 13 6 22s7 14 12 14c3 0 3-2 3-4 0-3 2-5 5-5h8c6 0 8-5 8-9C42 11 34 6 24 6z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.5"/><circle cx="15" cy="18" r="3" fill="#F2784B"/><circle cx="25" cy="13" r="3" fill="#F2C879"/><circle cx="34" cy="18" r="3" fill="#9CC3E5"/>',
    crafts:    '<circle cx="14" cy="14" r="5" fill="none" stroke="#F2784B" stroke-width="3"/><circle cx="14" cy="30" r="5" fill="none" stroke="#F2784B" stroke-width="3"/><path d="M18 17 40 38M18 27 40 8" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',
    music:     '<path d="M18 36V10l20-4v26" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="13" cy="36" rx="5" ry="4" fill="#F2784B"/><ellipse cx="33" cy="32" rx="5" ry="4" fill="#F2C879"/>',
    italiano:  '<path d="M5 9h38v25H26l-10 8v-8H5z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/><path d="M12 29 19 13l7 16M15 24h8" fill="none" stroke="#146B5E" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="33" cy="24" r="5" fill="none" stroke="#F2784B" stroke-width="3.2"/><path d="M38 19v10" stroke="#F2784B" stroke-width="3.2" stroke-linecap="round"/>',
    language:  '<path d="M5 8h22v16H15l-7 6v-6H5z" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/><path d="M11 16h10" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round"/><path d="M23 24h20v14h-6v5l-6-5h-8z" fill="#F2C879" stroke="#8F6512" stroke-width="2.4" stroke-linejoin="round"/><path d="M28 31h10" stroke="#8F6512" stroke-width="2.6" stroke-linecap="round"/>',
    religion:  '<circle cx="24" cy="19" r="14" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.6"/><path d="M10 19h28M24 5q-6.5 14 0 28M24 5q6.5 14 0 28" fill="none" stroke="#FBF3E4" stroke-width="2.4"/><circle cx="11" cy="40" r="5.5" fill="#F2784B"/><circle cx="24" cy="42" r="5.5" fill="#F2C879" stroke="#8F6512" stroke-width="1.8"/><circle cx="37" cy="40" r="5.5" fill="#7FA860"/>',
    breakfast: '<path d="M6 22h22v14a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/><path d="M28 25h5a5 5 0 0 1 0 10h-5" fill="none" stroke="#146B5E" stroke-width="2.8"/><path d="M6 22q0-7 11-7t11 7z" fill="#F2C879" stroke="#8F6512" stroke-width="2"/><path d="M13 11q2.5-4 0-7m8 7q2.5-4 0-7" fill="none" stroke="#9CC3E5" stroke-width="2.8" stroke-linecap="round"/>',
    snack:     '<circle cx="24" cy="27" r="13" fill="#F2784B"/><path d="M24 14q-1-5 4-7" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><path d="M28 12q4-2 6 2-4 3-6-2z" fill="#7FA860"/>',
    lunch:     '<circle cx="27" cy="24" r="14" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6"/><circle cx="27" cy="24" r="7.5" fill="#F2C879" stroke="#8F6512" stroke-width="2"/><path d="M8 8v9a4 4 0 0 0 8 0V8" fill="none" stroke="#146B5E" stroke-width="2.8" stroke-linecap="round"/><path d="M12 21v19" stroke="#146B5E" stroke-width="3.6" stroke-linecap="round"/>',
    washhands: '<path d="M7 7v10h15v7" fill="none" stroke="#146B5E" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 40V31a5 5 0 0 1 10 0v-2a5 5 0 0 1 10 0v10a5 5 0 0 1-5 5H14a5 5 0 0 1-5-5z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/><circle cx="33" cy="16" r="4" fill="#9CC3E5" stroke="#146B5E" stroke-width="1.8"/><circle cx="40" cy="25" r="2.8" fill="#9CC3E5" stroke="#146B5E" stroke-width="1.8"/><circle cx="32" cy="27" r="2.2" fill="#9CC3E5"/>',
    bathroom:  '<rect x="10" y="7" width="10" height="14" rx="2" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.4"/><path d="M13 21h20a4 4 0 0 1 4 4c0 6.5-5.4 12-12 12h-4a9 9 0 0 1-9-9z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/><path d="M18 37v5h11" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="15" cy="14" r="2" fill="#9CC3E5"/>',
    brushing:  '<path d="M24 6c-5-3.4-13 .4-13 8.6 0 7 3.6 11 5.4 15.4 1.5 3.6 4 3.6 4.8 0l1.4-5.6c.4-1.4 2.4-1.4 2.8 0l1.4 5.6c.8 3.6 3.3 3.6 4.8 0C34.4 25.6 38 21.6 38 14.6 38 6.4 29 2.6 24 6z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/><rect x="20" y="36" width="24" height="6" rx="3" fill="#F2784B"/><rect x="6" y="33" width="15" height="12" rx="2.5" fill="#F2C879" stroke="#8F6512" stroke-width="2"/><path d="M10 33v12m4-12v12m4-12v12" stroke="#8F6512" stroke-width="1.8" opacity=".6"/>',
    rest:      '<rect x="4" y="30" width="40" height="13" rx="5" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.4"/><circle cx="18" cy="21" r="9" fill="#F2C879" stroke="#E0A63C" stroke-width="2.2"/><path d="M13 20q2.4 2.6 4.8 0m2.4 0q2.4 2.6 4.8 0" fill="none" stroke="#8F6512" stroke-width="2" stroke-linecap="round"/><path d="M31 26q5-3.5 10 0" fill="none" stroke="#0E5147" stroke-width="2.6" stroke-linecap="round"/>',
    pe:        '<circle cx="24" cy="24" r="16" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.8"/><path d="M24 13l9.5 6.9-3.6 11.2H18.1L14.5 19.9z" fill="#146B5E"/><path d="M24 8v5M9.6 21.4l4.9-1.5M38.4 21.4l-4.9-1.5M15.6 39.6l2.5-8.5M32.4 39.6l-2.5-8.5" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round"/>',
    swimming:  '<path d="M4 35q5-4.5 10 0t10 0 10 0 10 0" fill="none" stroke="#9CC3E5" stroke-width="4" stroke-linecap="round"/><path d="M4 43q5-4.5 10 0t10 0 10 0 10 0" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round"/><circle cx="16" cy="19" r="6" fill="#F2C879" stroke="#E0A63C" stroke-width="2.2"/><path d="M22 24q8-5 16-1" stroke="#F2784B" stroke-width="4" fill="none" stroke-linecap="round"/>',
    recess:    '<path d="M8 43V15m9 28V15" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round"/><path d="M8 21h9m-9 8h9" stroke="#146B5E" stroke-width="2.8" stroke-linecap="round"/><path d="M17 15q0 20 22 25" fill="none" stroke="#F2C879" stroke-width="6.5" stroke-linecap="round"/><path d="M17 15q0 20 22 25" fill="none" stroke="#8F6512" stroke-width="1.8" stroke-linecap="round" opacity=".5"/><circle cx="21" cy="10" r="5" fill="#F2784B"/>',
    outdoor:   '<path d="M6 43 16 8h16l10 35" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 8h20" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round"/><path d="M19 10v18m10-18v18" stroke="#8F6512" stroke-width="2.4"/><rect x="15" y="28" width="18" height="5.5" rx="2.5" fill="#F2784B" stroke="#C4552B" stroke-width="1.8"/>',
    forest:    '<path d="M14 6 6 20h4l-6 12h20L18 20h4z" fill="#7FA860" stroke="#146B5E" stroke-width="2" stroke-linejoin="round"/><path d="M34 12l-6 10h3l-5 9h16l-5-9h3z" fill="#9BC178" stroke="#146B5E" stroke-width="2" stroke-linejoin="round"/><rect x="12" y="32" width="4" height="8" fill="#8A6B4A"/><rect x="32" y="31" width="4" height="9" fill="#8A6B4A"/>',
    brainbreak: '<circle cx="24" cy="9" r="6" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><path d="M24 16v13" stroke="#F2784B" stroke-width="4.6" stroke-linecap="round"/><path d="M8 12 24 22 40 12" fill="none" stroke="#F2784B" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 29 13 43M24 29l11 14" fill="none" stroke="#F2784B" stroke-width="4.6" stroke-linecap="round"/>',
    dance:     '<circle cx="18" cy="10" r="6" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><path d="M18 17 7 41h22z" fill="#C9A8E0" stroke="#146B5E" stroke-width="2.2" stroke-linejoin="round"/><path d="M18 22 31 15" fill="none" stroke="#C9A8E0" stroke-width="4.4" stroke-linecap="round"/><path d="M38 8v13" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><ellipse cx="35.4" cy="21.4" rx="3.6" ry="2.8" fill="#146B5E"/>',
    centers:   '<rect x="8" y="26" width="12" height="12" rx="2" fill="#F2784B"/><rect x="22" y="26" width="12" height="12" rx="2" fill="#F2C879"/><rect x="15" y="12" width="12" height="12" rx="2" fill="#9CC3E5"/>',
    stations:  '<path d="M4 24h40" stroke="#8A6B4A" stroke-width="4.5" stroke-linecap="round"/><path d="M9 27v14m30-14v14" stroke="#8A6B4A" stroke-width="3.6" stroke-linecap="round"/><rect x="11" y="12" width="11" height="10" rx="2" fill="#F2C879" stroke="#8F6512" stroke-width="2"/><path d="M27 22V13a3.5 3.5 0 0 1 7 0v9z" fill="#F2784B" stroke="#C4552B" stroke-width="1.8" stroke-linejoin="round"/><path d="M29 13V8m2.5 5V6.5m2.5 6.5V8" stroke="#146B5E" stroke-width="2.2" stroke-linecap="round"/>',
    showtell:  '<circle cx="15" cy="15" r="6" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><path d="M15 22v12m-6 10 6-10 6 10" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 26h9l4-6" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 6l3 6.1 6.7 1-4.9 4.7 1.2 6.7L34 21.3l-6 3.2 1.2-6.7-4.9-4.7 6.7-1z" fill="#F2C879" stroke="#8F6512" stroke-width="2" stroke-linejoin="round"/>',
    library:   '<rect x="8" y="8" width="8" height="32" rx="1.5" fill="#F2784B"/><rect x="18" y="12" width="8" height="28" rx="1.5" fill="#F2C879"/><rect x="28" y="8" width="8" height="32" rx="1.5" fill="#9CC3E5" transform="rotate(8 32 24)"/>',
    computers: '<rect x="8" y="10" width="32" height="22" rx="3" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6"/><rect x="12" y="14" width="24" height="14" rx="1.5" fill="#9CC3E5"/><path d="M18 38h12" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',
    calendar:  '<rect x="6" y="11" width="28" height="28" rx="3.5" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6"/><path d="M6 20h28" stroke="#146B5E" stroke-width="2.6"/><path d="M13 6v9m14-9v9" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round"/><circle cx="15" cy="29" r="3.6" fill="#F2784B"/><path d="M30 30a7 7 0 0 1 13 3 5 5 0 0 1-1 9H32a5.5 5.5 0 0 1-2-11z" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.2" stroke-linejoin="round"/>',
    birthday:  '<rect x="10" y="24" width="28" height="14" rx="3" fill="#F2784B"/><path d="M10 30q4-3 7 0t7 0 7 0 7 0" fill="none" stroke="#FBF3E4" stroke-width="2.4"/><rect x="22" y="14" width="4" height="10" fill="#F2C879"/><path d="M24 9q-2 2 0 4 2-2 0-4z" fill="#E0A63C"/>',
    assembly:  '<circle cx="24" cy="11" r="6" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><path d="M15 26q0-8 9-8t9 8z" fill="#146B5E"/><rect x="14" y="26" width="20" height="5" rx="1.5" fill="#8A6B4A"/><circle cx="7" cy="42" r="6" fill="#F2784B"/><circle cx="19" cy="44" r="6" fill="#9CC3E5" stroke="#146B5E" stroke-width="1.8"/><circle cx="31" cy="44" r="6" fill="#C9A8E0" stroke="#146B5E" stroke-width="1.8"/><circle cx="43" cy="42" r="6" fill="#7FA860"/>',
    fieldtrip: '<rect x="6" y="12" width="36" height="20" rx="4" fill="#F2C879" stroke="#E0A63C" stroke-width="2"/><rect x="10" y="16" width="8" height="7" fill="#FBF3E4"/><rect x="21" y="16" width="8" height="7" fill="#FBF3E4"/><circle cx="14" cy="36" r="4" fill="#146B5E"/><circle cx="34" cy="36" r="4" fill="#146B5E"/>',
    visitor:   '<rect x="4" y="7" width="15" height="35" rx="2" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6"/><circle cx="15" cy="26" r="1.8" fill="#E0A63C"/><circle cx="30" cy="14" r="7" fill="#F2C879" stroke="#E0A63C" stroke-width="2.2"/><path d="M30 22v20" stroke="#9CC3E5" stroke-width="8" stroke-linecap="round"/><path d="M30 26l8-8" stroke="#F2784B" stroke-width="3.6" fill="none" stroke-linecap="round"/>',
    honores:   '<path d="M12 6v36" stroke="#146B5E" stroke-width="4" stroke-linecap="round"/><path d="M6 42h12" stroke="#0E5147" stroke-width="3.4" stroke-linecap="round"/><circle cx="12" cy="5" r="2.8" fill="#F2C879" stroke="#8F6512" stroke-width="1.8"/><path d="M14 8h26l-6 8 6 8H14z" fill="#F2784B" stroke="#C4552B" stroke-width="2.2" stroke-linejoin="round"/>',
    change:    '<rect x="4" y="15" width="16" height="21" rx="3" fill="#F2C879" stroke="#8F6512" stroke-width="2.2"/><rect x="28" y="15" width="16" height="21" rx="3" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.2"/><path d="M20 21h8m-3.4-3.4L28 21l-3.4 3.4" fill="none" stroke="#F2784B" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 31h-8m3.4-3.4L20 31l3.4 3.4" fill="none" stroke="#F2784B" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>',
    surprise:  '<rect x="8" y="24" width="32" height="18" rx="3" fill="#C9A8E0" stroke="#146B5E" stroke-width="2.4"/><rect x="6" y="18" width="36" height="8" rx="2.5" fill="#B08CD0" stroke="#146B5E" stroke-width="2.4"/><circle cx="24" cy="7" r="4.5" fill="#F2784B"/><circle cx="12" cy="12" r="3.2" fill="#F2C879" stroke="#8F6512" stroke-width="1.8"/><circle cx="36" cy="12" r="3.2" fill="#7FA860"/>',
    guest:     '<rect x="4" y="8" width="24" height="20" rx="2.5" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.6"/><path d="M9 15h14m-14 6h9" stroke="#9CC3E5" stroke-width="2.8" stroke-linecap="round"/><path d="M10 28v13m12-13v13" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round"/><circle cx="37" cy="16" r="6.5" fill="#F2C879" stroke="#E0A63C" stroke-width="2.2"/><path d="M37 24v18" stroke="#F2784B" stroke-width="8" stroke-linecap="round"/>',
    celebrate: '<path d="M3 11q21 11 42 0" fill="none" stroke="#146B5E" stroke-width="2.8" stroke-linecap="round"/><path d="M8 14.4 17 16.4 12.5 27z" fill="#F2784B" stroke="#C4552B" stroke-width="1.8" stroke-linejoin="round"/><path d="M19 16.8h9L23.5 28z" fill="#F2C879" stroke="#8F6512" stroke-width="1.8" stroke-linejoin="round"/><path d="M30 16.5 39 14.5 34.5 26z" fill="#9CC3E5" stroke="#146B5E" stroke-width="1.8" stroke-linejoin="round"/>',
  },

  /* ⚠ RESET MUST CLEAR EVERY OVERLAY, NOT JUST THE DAY. The old version
     blanked day.items and left changeIdx/timeIdx set, so the render that
     followed did `this.day.items[this.changeIdx].id` on `undefined` and
     threw a TypeError. Reset is a SHELL control — always on screen, one
     click away — so this crashed from the most reachable button there is. */
  _closeOverlays: function () {
    this.changeIdx = null;
    this.changePick = null;
    this.timeIdx = null;
    this._pick = null;
    this._tmplOpen = false;
    this._palOpen = false;
    this._makeOpen = false;
    this._makeEdit = null;
    this.gateOpen = false;
    this._notice = null;
  },
  reset: function () {
    this.day = ODM.newDay();
    this.mode = 'build';
    this.banner = null;
    this.displayMode = false;
    this._closeOverlays();
    this._persistDay();
    this.render();
  },
  onSettings: function () { this._voiceState = null; this._saveStore(); this.render(); }
};

/* ========================== styles ==================================
   ⚠ NOT ONE `vh` IN THIS FILE. Every one of the old five resolved
   against the IFRAME, which for a non-task tool is content-driven and
   broadcast back to the parent by the shell's ResizeObserver — a real
   feedback path, and forbidden outright for a manipulative (§23.6).
   Layout keys on `[data-layout]`, which JS sets from a measured box.

   ⚠ AND NOT ONE LAYOUT MEDIA QUERY ABOVE 700px. The tool page pins the
   iframe at 704px at 1440, 1920 and 2560 alike, so every `min-width:
   1367px` tier the old build shipped was dead on the one surface a
   teacher actually uses. The wide tiers that remain do only what they
   are entitled to do — raise the shell's own card cap on the
   full-screen link, which is genuinely uncapped.
   ================================================================== */
function injectOurDayCSS() {
  if (document.getElementById('od-style')) return;
  var st = document.createElement('style');
  st.id = 'od-style';
  st.textContent = ''
    /* ---------------- shell + frame ---------------- */
    + '.od-wrap{display:flex;flex-direction:column;gap:10px;width:100%;margin:0 auto;padding:2px 2px 8px;}'
    + '.od-main{display:flex;gap:14px;align-items:flex-start;width:100%;}'
    + '.od-ribbonhost{flex:1 1 auto;min-width:0;}'
    + '.od-nowhost{display:none;}'
    /* BOARD: the day as a ribbon, and ONE card at hero scale */
    + '.od-wrap[data-layout="board"] .od-ribbonhost{flex:0 0 30%;max-width:34%;min-width:220px;}'
    + '.od-wrap[data-layout="board"] .od-nowhost{display:block;flex:1 1 auto;min-width:0;}'
    /* ⭐ the shell documents `body.<ns>-wide .lcs-app` at (0,1,1) as the
       intended override point for a tool with its own cap. This tool set
       `od-wide` on <body> on every render and used it for NOTHING but a
       scale variable, so on a 1024 projector the app stayed boxed at
       720px and 30% of the screen was cream before the strip was even
       measured. One rule. */
    + 'body.od-wide .lcs-app{max-width:100%;}'

    /* ---------------- banner + notice ---------------- */
    + '.od-bannerhost:empty{display:none;}'
    + '.od-banner{display:flex;flex-wrap:wrap;align-items:center;gap:10px;background:#FDF7EA;border:2px solid #F2C87966;border-radius:14px;padding:10px 14px;font-family:Nunito,sans-serif;font-weight:800;color:#5B4A2F;font-size:15px;}'
    /* refuse with a reason, never in silence — and VISIBLY, not only to
       a screen reader, which is how "our day is full" used to be told. */
    + '.od-notice{background:#FFF3E8;border:2px solid #F2784B66;border-radius:14px;padding:10px 14px;font-family:Nunito,sans-serif;font-weight:800;color:#8A3E1B;font-size:15px;line-height:1.4;}'

    /* ---------------- the strip ---------------- */
    + '.od-striphost{background:#FFFDF7;border-radius:18px;padding:10px 12px;box-shadow:0 2px 10px rgba(20,107,94,.10);min-height:120px;}'
    + '.od-strip{display:flex;flex-direction:column;gap:6px;}'
    + '.od-empty{font-family:Nunito,sans-serif;font-weight:700;color:#7A8C88;padding:22px 10px 14px;text-align:center;font-size:16px;line-height:1.4;}'
    + '.od-card{position:relative;display:flex;align-items:center;gap:10px;min-height:var(--od-cardh,72px);border:1.5px solid rgba(20,107,94,.12);border-radius:14px;background:#fff;padding:0 10px 0 0;transition:min-height .35s ease,background .35s ease;}'
    + '.od-card.od-now{border-color:#F2C879;box-shadow:0 0 0 3px #F2C87955,0 2px 10px rgba(224,166,60,.25);background:#FFFCF2;}'
    /* the warning: a difference in KIND (a ring), never in hue */
    + '.od-card.od-soon{border-color:#146B5E;box-shadow:0 0 0 2px #146B5E33;}'
    /* ⚠ done LOSES HEIGHT, NEVER SATURATION. A finished card is the
       child\'s evidence of a day survived and it must stay readable from
       the back row for the rest of the day; `opacity:.72` on a daylit
       projector took it to roughly 5:1 and every honey element below
       1.5:1 — on the wall it was not dimmed, it was GONE. */
    + '.od-card.od-done{--od-markgap:calc(var(--od-cardh,72px)*.36 + 14px);min-height:calc(var(--od-cardh,72px)*.78);background:#FBF3E4;border-color:rgba(20,107,94,.10);}'
    + '.od-card.od-done .od-cardname{color:#3C6C64;}'
    + '.od-card.od-skipped{--od-markgap:calc(var(--od-cardh,72px)*.36 + 14px);min-height:calc(var(--od-cardh,72px)*.66);background:#FFFDF7;border-style:dashed;border-color:#8A9A9666;}'
    + '.od-card.od-skipped .od-ic{opacity:.8;}'

    /* the rail: a FIXED 2-cell grid. It used to be flex:0 0 56px holding
       86px of content, so the current card\'s name started ~28px right of
       every other name. */
    + '.od-rail{flex:0 0 auto;display:grid;grid-template-columns:44px 44px;align-items:center;justify-items:center;align-self:stretch;}'
    + '.od-railcell{display:flex;align-items:center;justify-content:center;width:44px;min-height:44px;}'
    + '.od-ord{font-family:Baloo\\ 2,cursive;font-size:clamp(15px,calc(var(--od-cardh,72px)*.26),26px);color:#9BAAA6;line-height:1;}'
    + '.od-sun{border:0;background:transparent;cursor:pointer;padding:2px;min-width:52px;min-height:52px;width:clamp(52px,calc(var(--od-cardh,72px)*.68),92px);}'
    + '.od-sun svg{width:100%;height:auto;display:block;}'
    + '.od-pebble{border:0;background:#F2784B;color:#fff;border-radius:50%;width:44px;height:44px;min-width:44px;min-height:44px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;padding:0;}'
    + '.od-pebble svg{width:24px;height:24px;}'

    + '.od-cardbody{flex:1;display:flex;align-items:center;gap:12px;padding-right:var(--od-markgap,0px);border:0;background:transparent;cursor:pointer;padding:6px 0;text-align:left;min-width:0;min-height:44px;}'
    + '.od-cardbody .od-ic{width:clamp(34px,calc(var(--od-cardh,72px)*.62),96px);height:clamp(34px,calc(var(--od-cardh,72px)*.62),96px);flex:none;}'
    + '.od-cardtext{display:flex;flex-direction:column;min-width:0;flex:1;}'
    /* ⚠ A SCHEDULE ITEM IS CONTENT, AND CONTENT IS NEVER ELLIPSISED.
       The old rule was nowrap+ellipsis, so pt "a hora das atividades
       manuais", es "el tiempo al aire libre" and nl "Invaljuf of
       invalmeester" were cut off on the primary display surface. */
    + '.od-cardname{font-family:Baloo\\ 2,cursive;font-size:clamp(17px,calc(var(--od-cardh,72px)*.38),46px);color:#0E5147;line-height:1.05;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:break-word;hyphens:auto;}'
    + '.od-cardname[data-long]{font-size:clamp(15px,calc(var(--od-cardh,72px)*.31),36px);}'
    + '.od-was{font-family:Nunito,sans-serif;font-weight:700;font-size:clamp(12px,calc(var(--od-cardh,72px)*.17),18px);color:#7A8C88;}'
    + '.od-strip.od-tight .od-cardname,.od-strip.od-tight .od-was{display:none;}'
    + '.od-strip.od-tight .od-cardbody{gap:6px;min-height:0;padding:2px 0;cursor:default;}'
    + '.od-strip.od-tight .od-railcell{min-height:0;width:34px;}'
    + '.od-strip.od-tight .od-rail{grid-template-columns:34px;}'
    + '.od-strip.od-tight .od-card{padding-right:6px;}'
    + '.od-strip.od-tight .od-mark{right:6px;width:clamp(16px,calc(var(--od-cardh,72px)*.6),26px);height:clamp(16px,calc(var(--od-cardh,72px)*.6),26px);}'
    + '.od-strip.od-tight .od-ord{font-size:clamp(11px,calc(var(--od-cardh,72px)*.42),18px);}'

    /* the drawn state marks */
    + '.od-mark{position:absolute;right:10px;top:50%;transform:translateY(-50%);width:clamp(20px,calc(var(--od-cardh,72px)*.32),40px);height:clamp(20px,calc(var(--od-cardh,72px)*.32),40px);pointer-events:none;}'
    + '.od-mark svg{width:100%;height:100%;display:block;}'
    + '@keyframes odStamp{0%{transform:translateY(-50%) scale(1.55) rotate(-11deg);opacity:0;}55%{transform:translateY(-50%) scale(.93) rotate(2deg);opacity:1;}100%{transform:translateY(-50%) scale(1) rotate(0);opacity:1;}}'
    + '.od-card.od-done .od-mark{animation:odStamp .28s cubic-bezier(.2,.9,.3,1);}'

    + '.od-timechip{display:flex;align-items:center;gap:5px;border:1.5px solid #E0A63C88;background:#FDF7EA;border-radius:999px;padding:6px 12px;cursor:pointer;font-family:Nunito,sans-serif;font-weight:800;font-size:15px;color:#5B4A2F;flex:none;min-height:44px;}'
    /* ⚠ NOT 45% OPACITY. That is the universal DISABLED signal, and it is
       the recorded defect from the unroll-tape flag. A dashed chip with a
       full-contrast + reads as "add one". */
    + '.od-timechip-add{border-style:dashed;background:#FFFDF7;min-width:48px;justify-content:center;}'
    + '.od-badge{position:absolute;top:-8px;right:-6px;background:#F2C879;color:#5B4A2F;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 1px 3px rgba(0,0,0,.18);}'
    + '@keyframes odPulse{0%{transform:scale(1);}45%{transform:scale(1.03);}100%{transform:scale(1);}}'
    + '.od-cardbody.od-pulse{animation:odPulse .5s ease;}'

    + '.od-edittools{display:flex;gap:6px;flex:none;}'
    + '.od-iconbtn{width:44px;height:44px;min-width:44px;min-height:44px;border:1.5px solid rgba(20,107,94,.16);background:#fff;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;}'
    + '.od-iconbtn svg{width:24px;height:24px;}'
    + '.od-iconbtn:disabled{opacity:.35;cursor:default;}'

    /* the wordless add slot */
    + '.od-addslot{width:100%;min-height:56px;border:2.5px dashed rgba(20,107,94,.28);background:#FFFDF7;border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:8px;}'
    + '.od-addslot svg{width:30px;height:30px;}'

    /* the first-then ghosts — the rest of the day is ALWAYS present, or
       the child learns the day is two things and every third is a shock */
    + '.od-ghost{display:inline-flex;width:22px;height:22px;margin:0 2px;opacity:.5;}'
    + '.od-ghost .od-ic{width:22px;height:22px;}'
    + '.od-ghost-skip{opacity:.25;}'

    /* ---------------- the NOW panel (BOARD) ---------------- */
    + '.od-now-panel{background:#FFFCF2;border:2px solid #F2C879;border-radius:22px;padding:18px 20px;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 3px 16px rgba(224,166,60,.22);}'
    + '.od-now-icon{width:min(38%,300px);min-width:120px;}'
    + '.od-now-icon .od-ic{width:100%;height:auto;}'
    + '.od-now-name{font-family:Baloo\\ 2,cursive;font-size:clamp(30px,calc(var(--od-w,704)*0.055px),120px);color:#0E5147;line-height:1.03;text-align:center;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
    + '.od-now-time{display:flex;align-items:center;gap:8px;font-family:Nunito,sans-serif;font-weight:800;font-size:clamp(18px,calc(var(--od-w,704)*0.024px),44px);color:#5B4A2F;}'
    + '.od-now-next{display:flex;align-items:center;gap:10px;opacity:.62;border-top:2px dashed rgba(20,107,94,.18);padding-top:10px;width:100%;justify-content:center;}'
    + '.od-now-next .od-ic{width:clamp(28px,calc(var(--od-w,704)*0.035px),80px);height:auto;}'
    + '.od-now-nextlbl{font-family:Nunito,sans-serif;font-weight:800;font-size:14px;color:#4E6E69;text-transform:uppercase;letter-spacing:.05em;}'
    + '.od-now-nextname{font-family:Baloo\\ 2,cursive;font-size:clamp(18px,calc(var(--od-w,704)*0.028px),52px);color:#0E5147;}'
    + '.od-now-next-soon{opacity:1;border-top-style:solid;border-top-color:#146B5E55;}'

    /* ---------------- the sunset ---------------- */
    + '.od-sunset{display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px 8px 6px;}'
    + '.od-sunset-art{border:0;background:transparent;cursor:pointer;padding:0;width:min(78%,260px);}'
    + '.od-sunset-art svg{width:100%;height:auto;display:block;}'
    + '@keyframes odSettle{0%{opacity:0;transform:translateY(-4px);}100%{opacity:1;transform:translateY(0);}}'
    + '.od-sunset-art{animation:odSettle .9s cubic-bezier(.2,.7,.3,1) .6s both;}'
    + '.od-sunset-title{font-family:Baloo\\ 2,cursive;font-size:clamp(20px,calc(var(--od-w,704)*0.032px),44px);color:#0E5147;text-align:center;}'
    + '.od-sunset-dots{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}'
    + '.od-dot{width:14px;height:14px;border-radius:50%;background:#F2C879;box-shadow:inset 0 0 0 1.5px #E0A63C;}'
    + '.od-dot-skip{background:transparent;box-shadow:inset 0 0 0 2px #8A9A96;}'

    /* ---------------- toolbar ---------------- */
    + '.od-toolbar{display:flex;align-items:center;gap:8px;background:#fff;border-radius:14px;padding:8px 10px;box-shadow:0 1px 4px rgba(20,107,94,.08);flex-wrap:wrap;}'
    + '.od-spacer{flex:1;}'
    + '.od-voicemiss{font-size:17px;}'
    + '.od-start{min-width:180px;min-height:56px;border-radius:15px;border:0;background:#F2784B;color:#fff;font-family:Baloo\\ 2,cursive;font-size:21px;cursor:pointer;box-shadow:0 3px 0 #C4552B;padding:6px 18px;}'
    + '.od-start:disabled{opacity:.4;box-shadow:none;cursor:default;}'
    /* ⚠ EVERY CONTROL CLEARS 44px. Five classes were under it, and one of
       them (.od-pal-card at 40) was the tool\'s most-used control. The old
       local-test asserted "Start >= 44" and nothing else, which is why
       none of the other five was ever caught. */
    + '.od-chip{border:2px solid #146B5E22;background:#fff;border-radius:999px;padding:9px 15px;font-family:Nunito,sans-serif;font-weight:800;font-size:15px;color:#146B5E;cursor:pointer;min-height:44px;}'
    + '.od-chip.od-on{background:#146B5E;border-color:#146B5E;color:#fff;}'
    + '.od-chip.od-locked::after{content:" \\1F512";font-size:12px;}'
    + '.od-chip-sm{padding:7px 12px;font-size:14px;min-height:44px;}'
    + '.od-chip-ghost{background:#FBF3E4;border-color:#E0A63C55;color:#5B4A2F;}'
    + '.od-chip-quiet{border-color:transparent;background:transparent;color:#8A9A96;font-size:14px;text-decoration:underline;}'
    + '.od-chip-go{font-size:16px;}'
    + '.od-chip:disabled{opacity:.4;cursor:default;}'
    + '.od-more{position:absolute;left:12px;bottom:12px;width:56px;height:56px;border-radius:50%;border:0;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.14);opacity:.45;cursor:pointer;display:none;align-items:center;justify-content:center;z-index:30;}'
    + '.od-more svg{width:26px;height:26px;}'

    /* ---------------- one sheet primitive ---------------- */
    + '.od-scrim{position:relative;background:rgba(20,40,36,.28);display:flex;align-items:flex-start;justify-content:center;z-index:80;padding:12px;border-radius:18px;}'
    + '.od-sheet{position:relative;background:#fff;border-radius:18px;padding:16px 16px 18px;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:620px;width:100%;margin:auto;}'
    + '.od-sheet-title{margin:0 34px 10px 0;font-family:Baloo\\ 2,cursive;color:#146B5E;font-size:20px;line-height:1.2;}'
    + '.od-close{position:absolute;top:8px;right:8px;width:44px;height:44px;min-width:44px;min-height:44px;border:0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;}'
    + '.od-close svg{width:24px;height:24px;}'

    /* the palette grid — uniform tiles make ragged wrap impossible */
    + '.od-grouprail{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;position:sticky;top:0;background:#fff;padding-bottom:6px;z-index:2;}'
    + '.od-palwrap{max-height:none;}'
    + '.od-band-label{font-family:Nunito,sans-serif;font-weight:800;font-size:12px;color:#4E6E69;text-transform:uppercase;letter-spacing:.05em;margin:10px 0 5px;display:block;}'
    + '.od-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px;}'
    + '.od-tile{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:5px;min-height:92px;border:1.5px solid rgba(20,107,94,.14);background:#FFFDF7;border-radius:12px;padding:8px 6px;cursor:pointer;}'
    + '.od-tile .od-ic{width:40px;height:40px;flex:none;}'
    + '.od-tilename{font-family:Nunito,sans-serif;font-weight:800;font-size:13px;color:#146B5E;line-height:1.15;text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;}'
    + '.od-tile-new{border-style:dashed;}'
    + '.od-tileedit{position:absolute;top:2px;right:2px;width:30px;height:30px;border:0;background:transparent;cursor:pointer;padding:0;}'
    + '.od-tileedit svg{width:18px;height:18px;}'

    /* make-a-card */
    + '.od-input{width:100%;box-sizing:border-box;min-height:48px;border:2px solid rgba(20,107,94,.24);border-radius:12px;padding:10px 12px;font-family:Baloo\\ 2,cursive;font-size:20px;color:#0E5147;background:#FFFDF7;}'
    + '.od-input-sm{min-height:44px;font-size:16px;}'
    + '.od-makehint{margin:8px 0 12px;font-family:Nunito,sans-serif;font-weight:700;font-size:14px;color:#4E6E69;}'
    + '.od-tintrow{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px;}'
    + '.od-tintbtn{width:44px;height:44px;min-width:44px;min-height:44px;border-radius:50%;border:3px solid transparent;cursor:pointer;padding:0;}'
    + '.od-tintbtn.od-on{border-color:#0E5147;box-shadow:0 0 0 2px #fff inset;}'
    + '.od-glyphgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(56px,1fr));gap:8px;}'
    + '.od-glyphbtn{border:2px solid transparent;background:transparent;border-radius:14px;cursor:pointer;padding:2px;min-width:56px;min-height:56px;}'
    + '.od-glyphbtn .od-ic{width:100%;height:auto;display:block;}'
    + '.od-glyphbtn.od-on{border-color:#0E5147;}'
    + '.od-makeacts{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;align-items:center;}'
    + '.od-devicenote{margin:12px 0 0;font-family:Nunito,sans-serif;font-weight:700;font-size:13px;color:#8A9A96;}'

    /* the plan shelf */
    + '.od-shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:10px;}'
    + '.od-plan{border:1.5px solid rgba(20,107,94,.14);border-radius:14px;background:#FFFDF7;padding:8px;display:flex;flex-direction:column;gap:6px;}'
    + '.od-plan-today{border-color:#F2C879;box-shadow:0 0 0 2px #F2C87955;}'
    + '.od-plan-face{border:0;background:transparent;cursor:pointer;display:flex;flex-direction:column;gap:6px;align-items:center;padding:4px;min-height:110px;}'
    + '.od-thumb{display:flex;flex-direction:column;gap:2px;width:100%;min-height:56px;}'
    + '.od-thumbrow{display:block;height:8px;border-radius:3px;background:var(--od-tint,#146B5E22);}'
    + '.od-thumbrow .od-ic{display:none;}'
    + '.od-plan-name{font-family:Nunito,sans-serif;font-weight:800;font-size:14px;color:#146B5E;}'
    + '.od-plan-acts{display:flex;flex-wrap:wrap;gap:6px;align-items:center;}'
    + '.od-plan-confirm{font-family:Nunito,sans-serif;font-weight:800;font-size:13px;color:#8A3E1B;}'

    /* time picker */
    + '.od-tp-preview{display:flex;align-items:center;gap:8px;font-family:Baloo\\ 2,cursive;font-size:26px;color:#146B5E;margin-bottom:10px;}'
    + '.od-tp-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}'
    + '.od-tp-key{min-width:48px;min-height:48px;padding:6px 10px;}'
    + '.od-tp-actions{display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;}'

    /* the change ritual, INLINE on its own card — the strip stays
       visible above and below it, because the anxious child has to see
       WHERE the change lands, which is the whole point of the ritual */
    + '.od-changepanel{position:absolute;left:0;right:0;top:100%;z-index:20;margin-top:6px;background:#fff;border:2px solid #F2C879;border-radius:16px;padding:12px;box-shadow:0 6px 20px rgba(0,0,0,.16);}'
    + '.od-change-hint{font-family:Nunito,sans-serif;font-weight:800;color:#5B4A2F;margin:0 0 8px;font-size:15px;}'
    + '.od-change-opts{display:flex;flex-wrap:wrap;gap:8px;}'
    + '.od-change-quiet{margin-top:10px;padding-top:8px;border-top:1px dashed rgba(20,107,94,.16);align-items:center;}'
    + '.od-changepanel .od-grid{grid-template-columns:repeat(auto-fill,minmax(92px,1fr));}'
    + '.od-changepanel .od-tile{min-height:80px;}'
    + '.od-changepanel .od-tile .od-ic{width:32px;height:32px;}'

    /* gate — two nodes, never a concatenation */
    + '.od-gate{background:#FDF7EA;border:2px solid #F2C879;border-radius:16px;padding:14px 16px;font-family:Nunito,sans-serif;}'
    + '.od-gate-text{margin:0 0 10px;font-weight:700;color:#5B4A2F;font-size:15px;line-height:1.5;}'
    + '.od-gate-link{display:inline-block;min-height:44px;line-height:44px;color:#C4552B;font-weight:900;text-decoration:underline;font-size:16px;}'

    /* display mode — the chrome fades so the day owns the screen, but
       there is ALWAYS a way back to it (the old version had none, and
       sixty idle seconds disabled the change ritual for the whole day) */
    + '.od-wrap.od-display .od-toolbar{opacity:0;pointer-events:none;transition:opacity .8s ease;}'
    + '.od-wrap.od-display .od-more{display:flex;}'
    + '.od-wrap{position:relative;}'

    /* the print documents live off-screen on screen */
    + '.od-printdocs{position:absolute;left:-99999px;top:0;width:1px;height:1px;overflow:hidden;}'

    /* ---------------- STACK ---------------- */
    + '.od-wrap[data-layout="stack"] .od-main{flex-direction:column;}'
    + '.od-wrap[data-layout="stack"] .od-cardbody .od-ic{width:38px;height:38px;}'
    + '.od-wrap[data-layout="stack"] .od-grid{grid-template-columns:repeat(auto-fill,minmax(92px,1fr));}'
    + '.od-wrap[data-layout="stack"] .od-sheet{padding:14px 12px;}'
    + '@media (prefers-reduced-motion:reduce){.od-sun-rays{animation:none;}.od-cardbody.od-pulse{animation:none;}.od-card{transition:none;}.od-card.od-done .od-mark{animation:none;}.od-sunset-art{animation:none;}}'

    /* the sun breathes: ONLY the corona moves and the face never does —
       that is the whole difference between breathing and blinking. 5.5s
       asymmetric (~11 breaths/min, a calm adult breath); the old 4s
       symmetric cycle is 15/min, which is why it read as hurrying. */
    + '.od-sun-rays{transform-box:fill-box;transform-origin:center;animation:odSunBreathe 5.5s cubic-bezier(.42,0,.35,1) infinite;}'
    + '@keyframes odSunBreathe{0%{transform:scale(1);opacity:.94;}38%{transform:scale(1.045);opacity:1;}50%{transform:scale(1.045);opacity:1;}100%{transform:scale(1);opacity:.94;}}'

    /* ---------------- PRINT ----------------
       ⚠ EVERY RULE IS SCOPED body.od-paid. Gating the chip is not gating
       the feature: Ctrl+P is guarded by no button, and a free visitor who
       presses it must get a NORMAL page, not a blank one — which is why
       the chrome-hiding rules are scoped too, not only the sheets.
       ⚠ AND THE SHELL RESET IS MANDATORY: lcs-shell.css ships zero
       @media print blocks, so html,body{height:100%;overflow:hidden} and
       the .lcs-app max-width would clip a twelve-card day to one screen. */
    + '@media print{'
    +   'html{height:auto !important;overflow:visible !important;}'
    +   'body.od-paid{height:auto !important;overflow:visible !important;background:#fff !important;}'
    +   'body.od-paid .lcs-app{max-width:none !important;height:auto !important;overflow:visible !important;box-shadow:none !important;background-image:none !important;background-color:#fff !important;border-radius:0 !important;padding:0 !important;}'
    +   'body.od-paid .lcs-header,body.od-paid .od-toolbar,body.od-paid .od-banner,body.od-paid .od-notice,'
    +     'body.od-paid .od-scrim,body.od-paid .od-gate,body.od-paid .od-striphost,body.od-paid .od-nowhost,'
    +     'body.od-paid .od-more,body.od-paid .od-addslot,body.od-paid .od-edittools,body.od-paid .od-chip,'
    +     'body.od-paid .od-close{display:none !important;}'
    +   'body.od-paid .od-printdocs{position:static !important;left:auto !important;width:auto !important;height:auto !important;overflow:visible !important;}'
    +   '@page{margin:12mm;}'
    +   '.od-doc{page-break-after:always;font-family:Nunito,sans-serif;color:#000;}'
    +   '.od-doc:last-child{page-break-after:auto;}'
    +   '.od-doc-head h1{font-family:Baloo\\ 2,cursive;font-size:22pt;margin:0 0 4pt;}'
    +   '.od-doc-meta{font-size:12pt;margin:0 0 10pt;}'
    +   '.od-doc-list{list-style:none;margin:0;padding:0;}'
    +   '.od-doc-row{display:flex;align-items:center;gap:6mm;border-bottom:1px solid #999;padding:2.5mm 0;page-break-inside:avoid;}'
    +   '.od-doc-ord{font-family:Baloo\\ 2,cursive;font-size:14pt;width:8mm;}'
    +   '.od-doc-row .od-ic{width:12mm;height:12mm;flex:none;}'
    +   '.od-doc-name{font-size:15pt;flex:1;}'
    +   '.od-doc-time{font-size:13pt;width:22mm;text-align:right;}'
    +   '.od-doc-rule{width:45mm;border-bottom:1px dotted #bbb;height:6mm;}'
    +   '.od-doc-skip{opacity:1;text-decoration:line-through;}'
    +   '.od-doc-changes{margin-top:8mm;}'
    +   '.od-doc-changes h2,.od-doc-notes h2{font-family:Baloo\\ 2,cursive;font-size:14pt;margin:0 0 3mm;}'
    +   '.od-doc-lines{display:block;height:45mm;border-bottom:1px dotted #bbb;}'
    +   '.od-doc-desk{display:flex;gap:8mm;}'
    +   '.od-desk-col{flex:1;border-right:1px dashed #bbb;padding-right:6mm;}'
    +   '.od-desk-col:last-child{border-right:0;}'
    +   '.od-desk-head{font-size:11pt;margin-bottom:4mm;}'
    +   '.od-desk-row{display:flex;align-items:center;gap:4mm;padding:2mm 0;border-bottom:1px solid #ddd;page-break-inside:avoid;}'
    +   '.od-desk-row .od-ic{width:14mm;height:14mm;flex:none;}'
    +   '.od-desk-name{font-size:13pt;flex:1;}'
    +   '.od-desk-tick{width:8mm;height:8mm;border:1.4pt solid #444;border-radius:2mm;flex:none;}'
    /* a teacher tile at a tone that keeps its cream glyph legible */
    +   '.od-ic-made rect{fill:#5A5A5A !important;}'
    + '}'
    ;
  document.head.appendChild(st);
}
