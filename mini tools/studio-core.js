/* ============================================================================
   studio-core.js — Storybook Studio: document state, undo, autosave, API.

   ONE document, exactly sb-1 shaped: {story, strings}. Every mutation
   deep-clones (files are tiny), pushes an undo snapshot, marks dirty, and
   notifies subscribers. Ephemeral state (selection, drags, drawers) lives
   OUTSIDE the document and outside undo.

   The coordinate invariant lives here: toAbsDu/toZoneRel are the ONLY
   conversion points between zone-relative storage and the absolute design
   units the canvas works in; reencodeZoneChildren keeps absolute positions
   fixed when the zone itself moves.
   ========================================================================= */
(function (global) {
  'use strict';

  var listeners = [];
  var S = {
    id: null,
    doc: null,            /* {story, strings} — PURE sb-1 */
    etag: null,
    pageIndex: 0,
    selection: null,      /* {kind:'character'|'zone'|'drawable'|'point', ...} */
    dirty: false,
    savedAt: null,
    saveState: 'idle',    /* idle | saving | saved | conflict | error */
    audioHave: {},        /* '<loc>/<lineId>' -> true */
    undoStack: [],
    redoStack: [],
    previewLinkId: null,  /* tenant mode: the story's preview play link */
    storyLocale: 'en',    /* the story's single authoring language */
    isAdmin: false        /* server-confirmed via /studio/ping (see setAdmin) */
  };

  function emit(ev) { listeners.forEach(function (fn) { try { fn(ev || 'change'); } catch (e) { console.error(e); } }); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ---------------- API ----------------
     Dual-mode: operator mode talks to the local studio-server's /studio/*
     endpoints (unchanged); tenant mode (?mode=teacher on the studio URL —
     the hosted, subscriber-gated Studio) translates each call onto the
     authenticated /api/studio/* routes and adds the Bearer header from
     localStorage.accessToken (same-origin iframe shares localStorage with
     the Next app). The rest of the client keeps speaking the local dialect. */
  var TENANT = false;
  var ADMIN_HINT = false;   /* UI hint from the wrapper (&admin=1); the ping
                               response's isAdmin is the confirmed flag —
                               every operator endpoint re-enforces on the
                               server regardless. */
  try {
    var _q = new URLSearchParams(global.location.search);
    TENANT = _q.get('mode') === 'teacher';
    ADMIN_HINT = _q.get('admin') === '1';
  } catch (e) {}

  function tenantRoute(pathname, opts) {
    var q = '';
    var qi = pathname.indexOf('?');
    if (qi >= 0) { q = pathname.slice(qi); pathname = pathname.slice(0, qi); }
    var m;
    var url = null;
    if (pathname === '/studio/ping') url = '/api/studio/ping';
    else if (pathname === '/studio/stories') url = '/api/studio/stories';
    else if (pathname === '/studio/library') url = '/api/studio/library';
    else if (pathname === '/studio/cast') url = '/api/studio/stories/' + S.id + '/cast';
    else if (pathname === '/studio/exercises') url = '/api/studio/stories/' + S.id + '/exercises';
    else if ((m = pathname.match(/^\/studio\/story\/([A-Za-z0-9-]+)$/))) {
      url = '/api/studio/stories/' + m[1];
      if (opts && opts.method === 'POST') { opts = Object.assign({}, opts, { method: 'PUT' }); }
    }
    else if ((m = pathname.match(/^\/studio\/(scenes|audio|validate|share)\/([A-Za-z0-9-]+)$/))) {
      url = '/api/studio/stories/' + m[2] + '/' + m[1];
    }
    else if ((m = pathname.match(/^\/studio\/import-image\/([A-Za-z0-9-]+)$/))) {
      url = '/api/studio/stories/' + m[1] + '/images';
    }
    else if ((m = pathname.match(/^\/studio\/import-character\/([A-Za-z0-9-]+)$/))) {
      url = '/api/studio/stories/' + m[1] + '/characters';
    }
    else if ((m = pathname.match(/^\/studio\/import-exercise\/([A-Za-z0-9-]+)$/))) {
      url = '/api/studio/stories/' + m[1] + '/exercises';
    }
    else if ((m = pathname.match(/^\/studio\/import-character-sheet\/([A-Za-z0-9-]+)$/))) {
      /* ADMIN-only server-side (requireStudioAdmin) */
      url = '/api/studio/stories/' + m[1] + '/characters/sheet';
    }
    else if ((m = pathname.match(/^\/studio\/import-character-clips\/([A-Za-z0-9-]+)$/))) {
      /* ?character=<slug> becomes the path segment; ADMIN-only server-side */
      var _cs = '';
      try { _cs = new URLSearchParams(q).get('character') || ''; } catch (e) {}
      url = '/api/studio/stories/' + m[1] + '/characters/' + encodeURIComponent(_cs) + '/clips';
      q = '';
    }
    /* scaffold / reveal are local-operator affordances — unmapped by design. */
    return { url: (url || pathname) + q, opts: opts };
  }

  /* One shared token refresh via the wrapper (single-flight: parallel 401s —
     the 800ms autosave can race enumerations — share one round-trip). The
     wrapper runs the app's refreshToken() and answers lcs-studio-refresh-done. */
  var _refreshInFlight = null;
  function requestParentRefresh() {
    if (_refreshInFlight) return _refreshInFlight;
    _refreshInFlight = new Promise(function (resolve) {
      var settled = false;
      function finish(ok) {
        if (settled) return;
        settled = true;
        global.removeEventListener('message', onMsg);
        resolve(!!ok);
      }
      function onMsg(ev) {
        if (ev.origin !== location.origin) return;
        if (ev.data && ev.data.type === 'lcs-studio-refresh-done') finish(ev.data.ok);
      }
      global.addEventListener('message', onMsg);
      try { global.parent.postMessage({ type: 'lcs-studio-refresh' }, location.origin); } catch (e) {}
      setTimeout(function () { finish(false); }, 8000);
    }).then(function (ok) { _refreshInFlight = null; return ok; });
    return _refreshInFlight;
  }
  function notifyAuthLost() {
    try { global.parent.postMessage({ type: 'lcs-studio-auth', status: 401 }, location.origin); } catch (e) {}
  }

  function api(pathname, opts) {
    /* the token is re-read from localStorage on EVERY send, so a retry after
       the wrapper's refresh automatically carries the rotated token */
    function send() {
      var p = pathname, o = opts;
      if (TENANT) {
        var mapped = tenantRoute(pathname, opts);
        p = mapped.url;
        o = Object.assign({}, mapped.opts || opts || {});
        var token = null;
        try { token = localStorage.getItem('accessToken'); } catch (e) {}
        o.headers = Object.assign({}, o.headers || {},
          token ? { Authorization: 'Bearer ' + token } : {});
      }
      return fetch(p, o);
    }
    return send().then(function (r) {
      if (TENANT && r.status === 401) {
        /* the Session row's token rotates on any refresh/sign-in anywhere —
           a mid-edit 401 is usually a rotation race, not a real sign-out.
           Refresh through the wrapper and retry ONCE; only a failed retry
           surfaces the sign-in pill. */
        return requestParentRefresh().then(function (ok) {
          if (!ok) { notifyAuthLost(); return r; }
          return send().then(function (r2) {
            if (r2.status === 401) notifyAuthLost();
            return r2;
          });
        });
      }
      return r;
    }).then(function (r) {
      return r.json().then(function (j) { j.__status = r.status; return j; });
    });
  }

  /* ---------------- document ---------------- */
  function load(id) {
    S.id = id;   /* set BEFORE the call — tenant route mapping needs it */
    return api('/studio/story/' + id).then(function (j) {
      if (j.__status !== 200) throw new Error(j.error || 'load failed');
      S.doc = { story: j.story, strings: j.strings };
      S.etag = j.etag;
      S.previewLinkId = j.previewLinkId || null;
      S.storyLocale = j.locale ||
        (j.story && j.story.locales && j.story.locales[0]) || 'en';
      S.gradeBand = j.gradeBand ||
        (j.story && j.story.alignment && j.story.alignment.grade) || null;
      S.pageIndex = 0;
      S.selection = null;
      S.undoStack = []; S.redoStack = [];
      S.dirty = false; S.saveState = 'saved'; S.savedAt = new Date();
      offerBackupRestore(id);
      refreshAudio();
      emit('loaded');
    });
  }

  /* The backup blob is written on every mutation and removed on successful
     save — one existing at load time means a previous session ended with
     UNSAVED edits (a 401 race, a crash, a closed tab). Offer it back instead
     of silently dropping work; restoring goes through mutate(), so it is
     undoable and autosaves to the server. */
  function offerBackupRestore(id) {
    try {
      var key = 'studio.backup.' + id;
      var raw = localStorage.getItem(key);
      if (!raw) return;
      var bk = JSON.parse(raw);
      var fresh = bk && bk.doc && bk.at && (Date.now() - bk.at) < 48 * 3600 * 1000;
      if (!fresh || JSON.stringify(bk.doc) === JSON.stringify(S.doc)) {
        localStorage.removeItem(key);
        return;
      }
      var de = S.storyLocale === 'de';
      var when = new Date(bk.at).toLocaleString();
      var msg = de
        ? 'Wir haben nicht gespeicherte Änderungen an dieser Geschichte gefunden (' + when + ').\n\nWiederherstellen? („Abbrechen" behält die zuletzt gespeicherte Version.)'
        : 'We found unsaved changes to this story from ' + when + '.\n\nRestore them? ("Cancel" keeps the last saved version.)';
      if (global.confirm(msg)) {
        mutate('restore unsaved work', function (draft) {
          draft.story = bk.doc.story;
          draft.strings = bk.doc.strings;
        });
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {}
  }

  function refreshAudio() {
    if (!S.id) return;
    api('/studio/audio/' + S.id).then(function (j) {
      S.audioHave = j.have || {};
      emit('audio');
    }).catch(function () {});
  }

  /* mutate(fn): fn receives a DRAFT doc; returning false aborts. */
  function mutate(label, fn) {
    var draft = clone(S.doc);
    var out = fn(draft);
    if (out === false) return false;
    S.undoStack.push({ label: label, doc: S.doc });
    if (S.undoStack.length > 100) S.undoStack.shift();
    S.redoStack = [];
    S.doc = draft;
    S.dirty = true;
    scheduleSave();
    backupLocal();
    emit('change');
    return true;
  }

  function undo() {
    var top = S.undoStack.pop();
    if (!top) return;
    S.redoStack.push({ label: top.label, doc: S.doc });
    S.doc = top.doc;
    S.dirty = true; scheduleSave(); backupLocal(); emit('change');
  }
  function redo() {
    var top = S.redoStack.pop();
    if (!top) return;
    S.undoStack.push({ label: top.label, doc: S.doc });
    S.doc = top.doc;
    S.dirty = true; scheduleSave(); backupLocal(); emit('change');
  }

  /* ---------------- autosave ---------------- */
  var saveTimer = null;
  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer);
    S.saveState = 'saving';
    emit('savestate');
    saveTimer = setTimeout(doSave, 800);
  }
  function doSave() {
    saveTimer = null;
    if (!S.id || !S.doc) return;
    api('/studio/story/' + S.id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ story: S.doc.story, strings: S.doc.strings, baseEtag: S.etag })
    }).then(function (j) {
      if (j.__status === 409) { S.saveState = 'conflict'; emit('savestate'); return; }
      if (j.__status !== 200) { S.saveState = 'error'; emit('savestate'); return; }
      S.etag = j.etag;
      S.dirty = false;
      S.saveState = 'saved'; S.savedAt = new Date();
      try { localStorage.removeItem('studio.backup.' + S.id); } catch (e) {}
      emit('savestate');
      emit('saved');
    }).catch(function () { S.saveState = 'error'; emit('savestate'); });
  }
  function backupLocal() {
    try {
      localStorage.setItem('studio.backup.' + S.id,
        JSON.stringify({ at: Date.now(), doc: S.doc }));
    } catch (e) {}
  }

  /* ---------------- accessors ---------------- */
  function page() { return S.doc.story.pages[S.pageIndex] || null; }
  /* Text reads/writes go through the story's authoring locale (S.storyLocale;
     'en' for operator stories, the teacher's language for tenant stories). */
  function str(key) {
    var e = S.doc.strings[key];
    return (e && (e[S.storyLocale] || e.en)) || '';
  }
  function setStr(key, value) {
    return mutate('edit text', function (d) {
      d.strings[key] = d.strings[key] || {};
      d.strings[key][S.storyLocale] = value;
    });
  }

  /* generated, immutable, single-owner keys */
  function allocKey(prefix) {
    var n = 1;
    while (S.doc.strings[prefix + (n < 10 ? '0' + n : n)] !== undefined ||
           usedAnywhere(prefix + (n < 10 ? '0' + n : n))) n++;
    return prefix + (n < 10 ? '0' + n : n);
  }
  function usedAnywhere(key) {
    return JSON.stringify(S.doc.story).indexOf('"' + key + '"') >= 0 ||
           JSON.stringify(S.doc.story).indexOf('@' + key) >= 0;
  }

  /* every '@key' + stringKey/hintKey/narrationKey/cue-id referenced by the story */
  function referencedKeys() {
    var refs = {};
    var scan = function (v) {
      if (typeof v === 'string' && v.charAt(0) === '@') refs[v.slice(1)] = true;
      else if (Array.isArray(v)) v.forEach(scan);
      else if (v && typeof v === 'object') {
        Object.keys(v).forEach(function (k) {
          if ((k === 'stringKey' || k === 'hintKey' || k === 'narrationKey') && typeof v[k] === 'string') refs[v[k]] = true;
          scan(v[k]);
        });
      }
    };
    scan(S.doc.story);
    (S.doc.story.pages || []).forEach(function (pg) {
      ((pg.narration && pg.narration.cues) || []).forEach(function (c) { refs[c.id] = true; });
    });
    return refs;
  }
  function unusedKeys() {
    var refs = referencedKeys();
    return Object.keys(S.doc.strings).filter(function (k) { return !refs[k]; });
  }

  /* asset management: find-or-create an image asset entry for a library src */
  function ensureImageAsset(draft, src, vocabKey) {
    var assets = draft.story.assets;
    for (var id in assets) {
      if (assets[id].src === src) return id;
    }
    var base = 'img.' + (vocabKey || src.split('/').pop().replace(/@\dx\.webp$/i, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase());
    var id2 = base, n = 2;
    while (assets[id2]) { id2 = base + '-' + n++; }
    assets[id2] = { kind: 'image', src: src };
    if (vocabKey) assets[id2].vocab = vocabKey;
    return id2;
  }

  /* ---------------- the coordinate invariant ---------------- */
  function toAbsDu(zone, r) { return { x: zone.x + r.x, y: zone.y + r.y, w: r.w, h: r.h }; }
  function toZoneRel(zone, rAbs) { return { x: rAbs.x - zone.x, y: rAbs.y - zone.y, w: rAbs.w, h: rAbs.h }; }
  function toAbsPt(zone, p) { return { x: zone.x + p.x, y: zone.y + p.y }; }
  function toZoneRelPt(zone, pAbs) { return { x: pAbs.x - zone.x, y: pAbs.y - zone.y }; }

  /* When the zone moves/resizes: re-encode bound geometry so ABSOLUTE
     positions hold; clamp anything that no longer fits (returns clamped ids). */
  function reencodeZoneChildren(inter, oldZone, newZone) {
    var clamped = [];
    var mod = global.SBModules.get(inter.moduleType);
    var studio = mod && mod.meta && mod.meta.studio;
    if (!studio || !studio.drawables) return clamped;
    studio.drawables.forEach(function (dr) {
      var arr = inter.taskData[dr.bind];
      if (!Array.isArray(arr)) return;
      arr.forEach(function (item, i) {
        if (dr.kind === 'rect' && item.rect) {
          var abs = toAbsDu(oldZone, item.rect);
          var rel = toZoneRel(newZone, abs);
          if (rel.x < 0 || rel.y < 0 || rel.x + rel.w > newZone.w || rel.y + rel.h > newZone.h) {
            rel.x = Math.max(0, Math.min(rel.x, newZone.w - rel.w));
            rel.y = Math.max(0, Math.min(rel.y, newZone.h - rel.h));
            clamped.push(dr.bind + '[' + i + ']');
          }
          item.rect = { x: Math.round(rel.x), y: Math.round(rel.y), w: item.rect.w, h: item.rect.h };
        } else if (dr.kind === 'point' && typeof item.x === 'number') {
          var absP = toAbsPt(oldZone, item);
          var relP = toZoneRelPt(newZone, absP);
          if (relP.x < 56 || relP.y < 56 || relP.x > newZone.w - 56 || relP.y > newZone.h - 56) {
            relP.x = Math.max(56, Math.min(relP.x, newZone.w - 56));
            relP.y = Math.max(56, Math.min(relP.y, newZone.h - 56));
            clamped.push(dr.bind + '[' + i + ']');
          }
          item.x = Math.round(relP.x); item.y = Math.round(relP.y);
        } else if (dr.kind === 'path' && item && typeof item.x === 'number') {
          /* sb-trace path vertex — keep it fixed in ABSOLUTE space on a zone move */
          var relV = toZoneRelPt(newZone, toAbsPt(oldZone, item));
          item.x = Math.round(Math.max(0, Math.min(relV.x, newZone.w)));
          item.y = Math.round(Math.max(0, Math.min(relV.y, newZone.h)));
        } else if (dr.kind === 'maze' && item && typeof item.x1 === 'number') {
          /* sb-maze wall — re-encode both endpoints (abs-fixed) */
          var a1 = toZoneRelPt(newZone, toAbsPt(oldZone, { x: item.x1, y: item.y1 }));
          var b1 = toZoneRelPt(newZone, toAbsPt(oldZone, { x: item.x2, y: item.y2 }));
          item.x1 = Math.round(a1.x); item.y1 = Math.round(a1.y);
          item.x2 = Math.round(b1.x); item.y2 = Math.round(b1.y);
        }
      });
    });
    /* sb-maze start/end/solution live outside a drawable-bound array — re-encode too */
    if (studio.drawables.some(function (dr) { return dr.kind === 'maze'; })) {
      ['start', 'end'].forEach(function (k) {
        var p = inter.taskData[k];
        if (p && typeof p.x === 'number') { var r = toZoneRelPt(newZone, toAbsPt(oldZone, p)); inter.taskData[k] = { x: Math.round(r.x), y: Math.round(r.y) }; }
      });
      if (Array.isArray(inter.taskData.solution)) {
        inter.taskData.solution = inter.taskData.solution.map(function (p) { var r = toZoneRelPt(newZone, toAbsPt(oldZone, p)); return { x: Math.round(r.x), y: Math.round(r.y) }; });
      }
    }
    return clamped;
  }

  /* ---------------- inline validation (mirrors validate-story's v) ---------------- */
  function validateInteraction(inter) {
    var errors = [];
    if (!inter) return errors;
    var def = global.SBModules.get(inter.moduleType);
    if (!def) return ['Unknown activity type: ' + inter.moduleType];
    var v = {
      zone: inter.zone ? { w: inter.zone.w, h: inter.zone.h } : null,
      error: function (msg) { errors.push(String(msg).replace(/^sb-[a-z-]+:\s*/, '')); },
      assetExists: function (id) {
        if (!S.doc.story.assets[id]) errors.push('Missing picture: ' + id);
      },
      stringExists: function (key) {
        var e = S.doc.strings[key];
        if (!e || !(e[S.storyLocale] || e.en)) errors.push('Missing words for: ' + key);
      },
      vocab: function () {},
      sepPackage: function () {}
    };
    try { def.validateTask(inter.taskData || {}, v); }
    catch (e) { errors.push('Form error: ' + e.message); }
    if (inter.zone && def.meta.minZone &&
        (inter.zone.w < def.meta.minZone.w || inter.zone.h < def.meta.minZone.h)) {
      errors.push(TENANT
        ? 'Make the activity box a bit bigger — drag its corner.'
        : 'The activity area is too small — needs at least ' +
          def.meta.minZone.w + '×' + def.meta.minZone.h);
    }
    return errors;
  }

  global.Studio = {
    state: S,
    tenant: TENANT,
    adminHint: ADMIN_HINT,
    /* the inspector's mount() ping confirms admin server-side and calls this */
    setAdmin: function (v) { S.isAdmin = !!v; emit('change'); },
    on: function (fn) { listeners.push(fn); },
    api: api,
    load: load,
    mutate: mutate,
    undo: undo,
    redo: redo,
    saveNow: doSave,
    refreshAudio: refreshAudio,
    page: page,
    str: str,
    setStr: setStr,
    allocKey: allocKey,
    unusedKeys: unusedKeys,
    referencedKeys: referencedKeys,
    ensureImageAsset: ensureImageAsset,
    toAbsDu: toAbsDu, toZoneRel: toZoneRel, toAbsPt: toAbsPt, toZoneRelPt: toZoneRelPt,
    reencodeZoneChildren: reencodeZoneChildren,
    validateInteraction: validateInteraction,
    clone: clone
  };
}(typeof window !== 'undefined' ? window : this));
