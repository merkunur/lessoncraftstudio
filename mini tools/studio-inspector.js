/* ============================================================================
   studio-inspector.js — Storybook Studio: chrome, page rail, inspector panel,
   the meta.studio form engine, drawers (library / scenes / cast / mechanic
   picker / preview / validate), narration + strings editing.

   Everything human-facing is plain language; keys are generated + immutable;
   forms are generated from each module's meta.studio (single source of
   truth); modules without a spec get a guarded JSON editor. Preview is the
   REAL player in an iframe.
   ========================================================================= */
(function (global) {
  'use strict';
  var doc = global.document;

  function el(tag, cls, text) {
    var d = doc.createElement(tag);
    if (cls) d.className = cls;
    if (text !== undefined) d.textContent = text;
    return d;
  }
  function S() { return global.Studio.state; }
  function pageObj() { return global.Studio.page(); }
  function mutate(l, f) { return global.Studio.mutate(l, f); }
  function pgIdx() { return S().pageIndex; }

  var refs = {};      /* topbar, rail, panel, drawerHost, banner */
  var drawer = null;  /* current drawer element */

  /* ================= drawers ================= */
  function openDrawer(title, buildFn, wide) {
    closeDrawer();
    var ov = el('div', 'stu-drawer-scrim');
    ov.addEventListener('click', function (ev) { if (ev.target === ov) closeDrawer(); });
    var d = el('div', 'stu-drawer' + (wide ? ' stu-drawer-wide' : ''));
    var head = el('div', 'stu-drawer-head');
    head.appendChild(el('div', 'stu-drawer-title', title));
    var x = el('button', 'stu-x', '✕');
    x.addEventListener('click', closeDrawer);
    head.appendChild(x);
    d.appendChild(head);
    var body = el('div', 'stu-drawer-body');
    d.appendChild(body);
    ov.appendChild(d);
    refs.drawerHost.appendChild(ov);
    drawer = ov;
    buildFn(body);
  }
  function closeDrawer() {
    if (drawer && drawer.parentNode) drawer.parentNode.removeChild(drawer);
    drawer = null;
  }

  /* ---- transient toast (bottom-center teal pill; non-blocking) ---- */
  var _toastEl = null, _toastTimer = null;
  function toast(msg) {
    if (_toastEl && _toastEl.parentNode) _toastEl.parentNode.removeChild(_toastEl);
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastEl = el('div', 'stu-toast', msg);
    doc.body.appendChild(_toastEl);
    _toastTimer = setTimeout(function () {
      if (_toastEl && _toastEl.parentNode) _toastEl.parentNode.removeChild(_toastEl);
      _toastEl = null;
    }, 2400);
  }

  /* ================= teacher mode =================
     TEACHER (== tenant mode, ?mode=teacher) hides operator-only affordances
     (raw JSON, zip uploads, cross-story pools, tech copy) and swaps chrome
     to teacher language. T(en, de) picks German for German-authoring
     teachers; the full 11-locale chrome extraction is a fast-follow. */
  var TEACHER = false;
  try { TEACHER = new URLSearchParams(global.location.search).get('mode') === 'teacher'; } catch (e) {}
  function T(en, de) {
    return (TEACHER && (global.Studio.state.storyLocale === 'de') && de) ? de : en;
  }
  /* POWER: operator-grade affordances — the local operator studio always,
     and ADMINS in the hosted teacher studio (server-confirmed via ping;
     every operator endpoint re-enforces isAdmin server-side). */
  function POWER() {
    return !TEACHER || !!global.Studio.state.isAdmin;
  }
  /* ================= shell state (canvas-first chrome) =================
     Three collapsibles — toolbar / page rail / inspector — as classes on
     #stu-app, remembered per browser. Focus collapses all three at once and
     restores what was open. Zoom is never persisted (every load = Fit). */
  var UI = { top: true, rail: true, panel: true, focus: false, focusPrev: null };
  function loadUI() {
    try {
      ['top', 'rail', 'panel'].forEach(function (k) {
        var v = localStorage.getItem('studio.ui.' + k);
        if (v === '0') UI[k] = false;
        if (v === '1') UI[k] = true;
      });
    } catch (e) {}
  }
  function saveUI() {
    try {
      ['top', 'rail', 'panel'].forEach(function (k) {
        localStorage.setItem('studio.ui.' + k, UI[k] ? '1' : '0');
      });
    } catch (e) {}
  }
  function syncShellClasses() {
    var app = doc.getElementById('stu-app');
    if (!app) return;
    app.classList.toggle('stu-top-closed', !UI.top);
    app.classList.toggle('stu-rail-closed', !UI.rail);
    app.classList.toggle('stu-panel-closed', !UI.panel);
  }
  function setShell(o, opts2) {
    o = o || {};
    ['top', 'rail', 'panel'].forEach(function (k) { if (typeof o[k] === 'boolean') UI[k] = o[k]; });
    if (!(opts2 && opts2.transient)) saveUI();
    syncShellClasses();
    if (!(opts2 && opts2.noRender)) render();
  }
  function toggleFocus() {
    if (!UI.focus) {
      UI.focusPrev = { top: UI.top, rail: UI.rail, panel: UI.panel };
      UI.focus = true;
      setShell({ top: false, rail: false, panel: false }, { transient: true });
    } else {
      UI.focus = false;
      setShell(UI.focusPrev || { top: true, rail: true, panel: true }, { transient: true });
      UI.focusPrev = null;
    }
  }

  /* minZone → a teacher-readable size word (du² thresholds) */
  function sizeWord(minZone) {
    var a = (minZone.w || 0) * (minZone.h || 0);
    if (a <= 700 * 560) return T('small', 'klein');
    if (a <= 1000 * 720) return T('medium', 'mittelgroß');
    return T('large', 'groß');
  }

  /* ================= library picker ================= */
  var _lib = null;
  function openLibrary(onPick) {
    openDrawer(T('Pick a picture', 'Bild auswählen'), function (body) {
      var bar = el('div', 'stu-libbar');
      var sel = el('select');
      var search = el('input');
      search.placeholder = 'Search…';
      /* upload a picture from the operator's own computer */
      var upBtn = el('button', 'stu-btn', '⬆ Upload from my computer');
      var upInp = el('input'); upInp.type = 'file'; upInp.accept = 'image/*'; upInp.style.display = 'none';
      upBtn.addEventListener('click', function () { upInp.click(); });
      upInp.addEventListener('change', function () {
        var file = upInp.files && upInp.files[0]; if (!file) return;
        upBtn.textContent = 'Uploading ' + file.name + '…';
        file.arrayBuffer().then(function (arrbuf) {
          /* Studio.api — tenant mode maps + carries the Bearer header */
          return global.Studio.api('/studio/import-image/' + S().id,
            { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: arrbuf });
        }).then(function (j) {
          if (j.__status !== 200 || !j.src) { upBtn.textContent = '✗ ' + (j.error || 'upload failed'); return; }
          closeDrawer();
          if (typeof onPick === 'function') onPick(j.src, null, null);
        }).catch(function () { upBtn.textContent = '✗ couldn\'t reach the Studio server'; });
      });
      bar.appendChild(sel); bar.appendChild(search); bar.appendChild(upBtn); bar.appendChild(upInp);
      body.appendChild(bar);
      var grid = el('div', 'stu-libgrid');
      body.appendChild(grid);

      function renderGrid() {
        grid.innerHTML = '';
        var theme = sel.value;
        var q = search.value.trim().toLowerCase();
        var t = _lib.themes.filter(function (x) { return x.theme === theme; })[0];
        var pool = [];
        if (q) {
          _lib.themes.forEach(function (th) {
            th.nouns.forEach(function (n) {
              if (n.toLowerCase().indexOf(q) >= 0) pool.push({ theme: th.theme, noun: n });
            });
          });
          pool = pool.slice(0, 80);
        } else if (t) {
          pool = t.nouns.slice(0, 200).map(function (n) { return { theme: theme, noun: n }; });
        }
        pool.forEach(function (it) {
          /* store the DECODED path (real spaces) — browsers auto-encode in
             img.src / fetch; the validator resolves it on disk directly */
          var src = '/image-library-webp/themes/' + it.theme + '/' + it.noun + '@2x.webp';
          var card = el('button', 'stu-libcard');
          var im = el('img'); im.loading = 'lazy'; im.src = src;
          card.appendChild(im);
          var vocabKey = it.noun.replace(/\s+\d+$/, '').toLowerCase();
          var word = vocabWord(vocabKey) || it.noun;
          card.appendChild(el('div', 'stu-libname', word));
          card.addEventListener('click', function () {
            closeDrawer();
            onPick(src, vocabKey, word);
          });
          grid.appendChild(card);
        });
        if (!pool.length) grid.appendChild(el('div', 'stu-empty', 'Nothing here — try another theme or search.'));
      }
      function boot() {
        _lib.themes.forEach(function (t2) {
          var o = el('option'); o.value = t2.theme; o.textContent = t2.theme + ' (' + t2.count + ')';
          sel.appendChild(o);
        });
        var fruits = _lib.themes.filter(function (x) { return /fruit/i.test(x.theme); })[0];
        if (fruits) sel.value = fruits.theme;
        renderGrid();
      }
      sel.addEventListener('change', renderGrid);
      search.addEventListener('input', renderGrid);
      if (_lib) boot();
      else {
        /* static props manifest first (CF-cached, works in both modes);
           fall back to the dynamic index endpoint */
        fetch('/mini-tools/storybook-library/props-manifest.json', { cache: 'no-cache' })
          .then(function (r) { if (!r.ok) throw new Error('no manifest'); return r.json(); })
          .then(function (j) { _lib = j; boot(); })
          .catch(function () {
            global.Studio.api('/studio/library').then(function (j) { _lib = j; boot(); })
              .catch(function () { body.appendChild(el('div', 'stu-empty', 'Couldn\'t reach the Studio server — is it running? (node scripts/storybook/studio-server.js)')); });
          });
      }
    }, true);
  }
  function vocabWord(key) {
    try {
      var v = global.IMAGE_VOCABULARY || (global.ImageVocab && global.ImageVocab.DATA);
      var e = v && v[key];
      var loc = (global.Studio.state && global.Studio.state.storyLocale) || 'en';
      return (e && e[loc] && e[loc][0]) || (e && e.en && e.en[0]);
    } catch (e) { return null; }
  }

  /* ---- the platform library (characters + backgrounds), a static manifest
     generated by scripts/storybook/build-library-manifest.js and served from
     /mini-tools/storybook-library/ in BOTH modes ---- */
  var _sblib = null;
  function fetchLibraryManifest() {
    if (_sblib) return Promise.resolve(_sblib);
    return fetch('/mini-tools/storybook-library/manifest.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('no manifest'); return r.json(); })
      .then(function (j) { _sblib = j; return j; });
  }
  function libName(nameMap) {
    var loc = (global.Studio.state && global.Studio.state.storyLocale) || 'en';
    return (nameMap && (nameMap[loc] || nameMap.en)) || '';
  }

  /* ================= form engine ================= */
  /* Renders meta.studio.fields for taskData; commits via one mutate per change. */
  function renderFields(host, fields, getObj, commit, opts) {
    fields.forEach(function (f) {
      /* teacher mode (non-admin): no zip uploads, no cross-story exercise
         pool, no raw JSON — worksheet exercises come from the generator
         bridge. Admins get everything. */
      if (!POWER()) {
        if (f.kind === 'json') return;
        if (f.kind === 'upload' && /zip/i.test(f.accept || '')) return;
        if (typeof f.from === 'string' && f.from.indexOf('endpoint:/studio/exercises') === 0) return;
      }
      if (f.showIf) {
        var cur = getObj();
        for (var k in f.showIf) if (cur[k] !== f.showIf[k]) return;
      }
      var row = el('div', 'stu-frow');
      if (f.kind !== 'boolean' && f.kind !== 'correctPick') row.appendChild(el('label', 'stu-flabel', f.label));
      var val = getObj()[f.key];

      if (f.kind === 'text') {
        var inp = el('input');
        inp.value = val || '';
        inp.addEventListener('change', function () {
          var v = f.lowercase ? inp.value.toLowerCase().trim() : inp.value.trim();
          commit(function (o) { o[f.key] = v; });
        });
        row.appendChild(inp);
      } else if (f.kind === 'number') {
        var num = el('input'); num.type = 'number';
        if (f.min !== undefined) num.min = f.min;
        if (f.max !== undefined) num.max = f.max;
        if (f.step) num.step = f.step;
        num.value = val !== undefined ? val : '';
        num.addEventListener('change', function () {
          commit(function (o) { o[f.key] = Number(num.value); });
        });
        row.appendChild(num);
      } else if (f.kind === 'boolean') {
        var lb = el('label', 'stu-check');
        var cb = el('input'); cb.type = 'checkbox'; cb.checked = !!val;
        cb.addEventListener('change', function () {
          commit(function (o) { o[f.key] = cb.checked; });
        });
        lb.appendChild(cb); lb.appendChild(doc.createTextNode(' ' + f.label));
        row.appendChild(lb);
      } else if (f.kind === 'enum') {
        var s2 = el('select');
        var fill = function (list, labels) {
          list.forEach(function (v, i) {
            var o = el('option'); o.value = String(v);
            o.textContent = (labels && labels[i]) || String(v);
            s2.appendChild(o);
          });
          s2.value = String(val !== undefined && val !== '' ? val : list[0]);
        };
        if (typeof f.from === 'string' && f.from.indexOf('endpoint:') === 0) {
          global.Studio.api(f.from.slice(9)).then(function (j) {
            var xs = (j.exercises || []).map(function (e2) { return e2.fromStory === S().id ? e2.package : e2.absolute; });
            var ls = (j.exercises || []).map(function (e2) { return e2.appType + ' — ' + (e2.prompt || e2.package); });
            fill(xs, ls);
          }).catch(function () { var o = el('option'); o.textContent = '(server unreachable)'; s2.appendChild(o); });
        } else fill(f.from, f.labels);
        s2.addEventListener('change', function () {
          var raw = s2.value;
          var typed = (typeof (f.from !== 'string' && f.from && f.from[0]) === 'number') ? Number(raw) : raw;
          commit(function (o) { o[f.key] = typed; });
        });
        row.appendChild(s2);
      } else if (f.kind === 'seed') {
        var b = el('button', 'stu-btn', '🎲 ' + (f.label || 'Shuffle'));
        b.addEventListener('click', function () {
          commit(function (o) { o[f.key] = 1 + Math.floor(Math.random() * 9998); });
        });
        row.innerHTML = ''; row.appendChild(b);
      } else if (f.kind === 'stringRef') {
        var ta = el('input');
        var cur2 = val && String(val).charAt(0) === '@' ? global.Studio.str(String(val).slice(1)) : '';
        ta.value = cur2;
        ta.placeholder = f.label;
        ta.addEventListener('change', function () {
          var text = ta.value.trim();
          commit(function (o, draft) {
            var key = (o[f.key] && String(o[f.key]).charAt(0) === '@') ? String(o[f.key]).slice(1) : null;
            if (!key) {
              key = allocPageKey(f.keyHint || f.key, opts);
              o[f.key] = '@' + key;
            }
            draft.strings[key] = draft.strings[key] || {};
            draft.strings[key][global.Studio.state.storyLocale || 'en'] = text;
          });
        });
        row.appendChild(ta);
      } else if (f.kind === 'image') {
        var wrap = el('div', 'stu-imgpick');
        var asset = val && S().doc.story.assets[val];
        if (asset) {
          var th = el('img'); th.src = asset.src; wrap.appendChild(th);
        }
        var pick = el('button', 'stu-btn', asset ? 'Change picture' : 'Pick a picture');
        pick.addEventListener('click', function () {
          openLibrary(function (src, vocabKey, word) {
            commit(function (o, draft) {
              var id = global.Studio.ensureImageAsset(draft, src, vocabKey);
              o[f.key] = id;
              if (f.vocabAutofill) applyVocabAutofill(o, draft, vocabKey, word, opts);
            });
          });
        });
        wrap.appendChild(pick);
        row.appendChild(wrap);
      } else if (f.kind === 'chips') {
        row.appendChild(renderChips(f, getObj, commit));
      } else if (f.kind === 'group') {
        row.appendChild(renderGroup(f, getObj, commit, opts));
      } else if (f.kind === 'list') {
        row.appendChild(renderList(f, getObj, commit, opts));
      } else if (f.kind === 'correctPick') {
        row.appendChild(el('label', 'stu-flabel', f.label));
        var listArr = getObj()[f.of] || [];
        if (!listArr.length) {
          var ph = el('select'); ph.disabled = true;
          var o0 = el('option'); o0.textContent = '— add the pictures above first —'; ph.appendChild(o0);
          row.appendChild(ph);
        } else {
        var rad = el('div', 'stu-radios');
        listArr.forEach(function (it) {
          var lab = el('label', 'stu-radio');
          var r = el('input'); r.type = 'radio'; r.name = 'cp-' + f.key;
          r.checked = getObj()[f.key] === it[f.by];
          r.addEventListener('change', function () {
            commit(function (o) { o[f.key] = it[f.by]; });
          });
          lab.appendChild(r);
          lab.appendChild(doc.createTextNode(' ' + (it[f.by] || '?')));
          rad.appendChild(lab);
        });
        row.appendChild(rad);
        }
      } else if (f.kind === 'assetRef') {
        /* a field whose value is an OBJECT holding an .image assetId (+ maybe alt/at) —
           e.g. listen-place object/reference, dot-stamp subject. Pick sets .image, keeps the rest. */
        var wrapA = el('div', 'stu-imgpick');
        var curA = getObj()[f.key] || {};
        var assetA = curA.image && S().doc.story.assets[curA.image];
        if (assetA) { var thA = el('img'); thA.src = assetA.src; wrapA.appendChild(thA); }
        var pickA = el('button', 'stu-btn', assetA ? 'Change picture' : 'Pick a picture');
        pickA.addEventListener('click', function () {
          openLibrary(function (src, vocabKey, word) {
            commit(function (o, draft) {
              var id = global.Studio.ensureImageAsset(draft, src, vocabKey);
              if (!o[f.key] || typeof o[f.key] !== 'object') o[f.key] = {};
              o[f.key].image = id;
              if (f.vocabAutofill) applyVocabAutofill(o[f.key], draft, vocabKey, word, opts);
            });
          });
        });
        wrapA.appendChild(pickA);
        row.appendChild(wrapA);
      } else if (f.kind === 'json') {
        /* any structured value with no bespoke control — an editable JSON box, never a dead label */
        var wrapJ = el('div', 'stu-jsonfield');
        var taJ = el('textarea', 'stu-json stu-json-small');
        taJ.value = JSON.stringify(val === undefined ? (f['default'] !== undefined ? f['default'] : null) : val);
        var applyJ = el('button', 'stu-btn stu-btn-small', 'Apply');
        applyJ.addEventListener('click', function () {
          try { var parsed = JSON.parse(taJ.value); commit(function (o) { o[f.key] = parsed; }); }
          catch (e) { alert('That is not valid yet: ' + e.message); }
        });
        wrapJ.appendChild(taJ); wrapJ.appendChild(applyJ);
        row.appendChild(wrapJ);
      } else if (f.kind === 'upload') {
        /* upload a file to an endpoint, then set a key from the response. Used to import
           an SEP worksheet export (ZIP) into the story and select it as the exercise. */
        var upWrap = el('div', 'stu-upload');
        var fileInp = el('input'); fileInp.type = 'file'; if (f.accept) fileInp.accept = f.accept; fileInp.style.display = 'none';
        var upBtn = el('button', 'stu-btn', f.label || 'Upload…');
        var upStatus = el('span', 'stu-note', '');
        upBtn.addEventListener('click', function () { fileInp.click(); });
        fileInp.addEventListener('change', function () {
          var file = fileInp.files && fileInp.files[0]; if (!file) return;
          upStatus.textContent = 'Uploading ' + file.name + '…';
          file.arrayBuffer().then(function (arrbuf) {
            return fetch(f.endpoint + '/' + S().id, { method: 'POST', headers: { 'Content-Type': 'application/zip' }, body: arrbuf })
              .then(function (r) { return r.json().then(function (j) { j.__status = r.status; return j; }); });
          }).then(function (j) {
            if (j.__status !== 200) { upStatus.textContent = '✗ ' + (j.error || ('failed (' + j.__status + ')')); return; }
            commit(function (o) { o[f.setKey || f.key] = j.package || ('exercises/' + j.exId); });
            upStatus.textContent = '✓ added ' + j.exId;
            if (global.StudioInspector) global.StudioInspector.render();
          }).catch(function () { upStatus.textContent = '✗ couldn\'t reach the Studio server'; });
        });
        upWrap.appendChild(upBtn); upWrap.appendChild(fileInp); upWrap.appendChild(upStatus);
        row.appendChild(upWrap);
      }
      if (f.note) row.appendChild(el('div', 'stu-note', f.note));
      host.appendChild(row);
    });
  }

  function renderChips(f, getObj, commit) {
    var wrap = el('div', 'stu-chips');
    var arr = (getObj()[f.key] || []).slice();
    arr.forEach(function (c, i) {
      var chip = el('span', 'stu-chip', String(c));
      var x = el('button', 'stu-chip-x', '✕');
      x.addEventListener('click', function () {
        commit(function (o) { o[f.key].splice(i, 1); });
      });
      chip.appendChild(x);
      wrap.appendChild(chip);
    });
    if (f.from && Array.isArray(f.from)) {
      var sel = el('select');
      sel.appendChild(el('option', null, '+ add…'));
      f.from.forEach(function (v) {
        var o = el('option'); o.value = v; o.textContent = v; sel.appendChild(o);
      });
      sel.addEventListener('change', function () {
        var v = sel.value;
        if (!v || v === '+ add…') return;
        commit(function (o) { (o[f.key] = o[f.key] || []).push(v); });
      });
      wrap.appendChild(sel);
    } else {
      var inp = el('input'); inp.placeholder = f.singleChar ? 'letters (e.g. cat)' : 'add + Enter';
      inp.className = 'stu-chip-in';
      inp.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter') return;
        ev.preventDefault();
        var v = inp.value.trim();
        if (!v) return;
        commit(function (o) {
          o[f.key] = o[f.key] || [];
          if (f.singleChar) v.toLowerCase().split('').forEach(function (ch) { if (/\S/.test(ch)) o[f.key].push(ch); });
          else if (f.numeric) o[f.key].push(Number(v));
          else o[f.key].push(v.toLowerCase());
        });
      });
      wrap.appendChild(inp);
    }
    return wrap;
  }

  function renderGroup(f, getObj, commit, opts) {
    var box = el('div', 'stu-group');
    var val = getObj()[f.key];
    if (f.optional) {
      var lb = el('label', 'stu-check');
      var cb = el('input'); cb.type = 'checkbox'; cb.checked = !!val;
      cb.addEventListener('change', function () {
        commit(function (o) { o[f.key] = cb.checked ? {} : null; });
      });
      lb.appendChild(cb); lb.appendChild(doc.createTextNode(' use this'));
      box.appendChild(lb);
    }
    if (val) {
      renderFields(box, f.fields, function () { return getObj()[f.key] || {}; },
        function (fn) {
          commit(function (o, draft) { o[f.key] = o[f.key] || {}; fn(o[f.key], draft); });
        }, opts);
    }
    return box;
  }

  function renderList(f, getObj, commit, opts) {
    var box = el('div', 'stu-list');
    var arr = getObj()[f.key] || [];
    arr.forEach(function (item, i) {
      var rowEl = el('div', 'stu-list-item');
      var head = el('div', 'stu-list-head');
      head.appendChild(el('span', 'stu-list-n', String(i + 1)));
      if (f.keyField && item[f.keyField]) head.appendChild(el('span', 'stu-list-key', item[f.keyField]));
      var del = el('button', 'stu-x', '✕');
      del.addEventListener('click', function () {
        commit(function (o) { o[f.key].splice(i, 1); });
      });
      head.appendChild(del);
      rowEl.appendChild(head);
      if (f.selfList) {
        /* list of bare values (e.g. memory pairs = assetIds) */
        renderFields(rowEl, f.itemFields, function () { return { __self: (getObj()[f.key] || [])[i] }; },
          function (fn) {
            commit(function (o, draft) {
              var tmp = { __self: o[f.key][i] };
              fn(tmp, draft);
              o[f.key][i] = tmp.__self;
            });
          }, opts);
      } else {
        renderFields(rowEl, f.itemFields, function () { return (getObj()[f.key] || [])[i] || {}; },
          function (fn) {
            commit(function (o, draft) { fn(o[f.key][i], draft); applyItemMappings(f, o[f.key][i]); });
          }, opts);
      }
      box.appendChild(rowEl);
    });
    var add = el('button', 'stu-btn', '+ ' + (f.addLabel || 'Add'));
    add.addEventListener('click', function () {
      commit(function (o) {
        o[f.key] = o[f.key] || [];
        o[f.key].push(f.selfList ? '' : (f.keyField ? keyedNewItem(f, o[f.key]) : {}));
      });
    });
    box.appendChild(add);
    return box;
  }
  function keyedNewItem(f, arr) {
    var it = {};
    var n = arr.length + 1;
    var k = 'item-' + n;
    while (arr.some(function (x) { return x[f.keyField] === k; })) k = 'item-' + (++n);
    it[f.keyField] = k;
    return it;
  }
  /* choice-board's groupCount → group:{image,count} mapping */
  function applyItemMappings(f, item) {
    if (!item) return;
    var gc = (f.itemFields || []).filter(function (x) { return x.mapsTo === 'group'; })[0];
    if (gc) {
      if (item.groupCount > 0 && item.image) {
        item.group = { image: item.image, count: item.groupCount };
        delete item.image; delete item.label;
      }
      delete item.groupCount;
    }
  }

  /* vocabAutofill hook: image pick fills key + word + (find[] via mustFind default) */
  function applyVocabAutofill(item, draft, vocabKey, word, opts) {
    if (item.key === undefined || item.key === '' || /^item-\d+$/.test(item.key || '')) {
      var base = vocabKey, k = base, n = 2;
      var siblings = (opts && opts.siblingKeys && opts.siblingKeys()) || [];
      while (siblings.indexOf(k) >= 0) k = base + '-' + n++;
      item.key = k;
    }
    if (item.word !== undefined || (opts && opts.wantsWord)) {
      var pgId = draft.story.pages[pgIdx()].id;
      var strKey = pgId + '.word.' + item.key;
      if (!item.word || String(item.word).charAt(0) !== '@') item.word = '@' + strKey;
      var kk = String(item.word).slice(1);
      draft.strings[kk] = draft.strings[kk] || {};
      var _wloc = global.Studio.state.storyLocale || 'en';
      if (!draft.strings[kk][_wloc]) draft.strings[kk][_wloc] = word;
    }
  }

  function allocPageKey(hint, opts) {
    var pgId = pageObj().id;
    return global.Studio.allocKey(pgId + '.' + hint + '.');
  }

  /* ================= mechanic picker + form host ================= */
  function openMechanicPicker() {
    openDrawer(T('Choose an activity', 'Aufgabe auswählen'), function (body) {
      /* two tabs: the story-activity modules, and the 29 worksheet makers
         (designed inside the Studio via the generator bridge — no zips) */
      var tabs = el('div', 'stu-tabs');
      var tabStory = el('button', 'stu-tab stu-tab-on', T('Story activities', 'Geschichten-Aufgaben'));
      var tabWs = el('button', 'stu-tab', T('Worksheet activities', 'Arbeitsblatt-Aufgaben'));
      tabs.appendChild(tabStory); tabs.appendChild(tabWs);
      body.appendChild(tabs);
      var paneStory = el('div');
      var paneWs = el('div');
      paneWs.style.display = 'none';
      body.appendChild(paneStory);
      body.appendChild(paneWs);
      function switchTab(ws) {
        paneStory.style.display = ws ? 'none' : '';
        paneWs.style.display = ws ? '' : 'none';
        tabStory.className = 'stu-tab' + (ws ? '' : ' stu-tab-on');
        tabWs.className = 'stu-tab' + (ws ? ' stu-tab-on' : '');
      }
      tabStory.addEventListener('click', function () { switchTab(false); });
      tabWs.addEventListener('click', function () { switchTab(true); });

      /* ---- tab 1: the interaction modules ---- */
      var groups = {};
      global.SBModules.types().forEach(function (t) {
        var m = global.SBModules.get(t).meta;
        var stu = m.studio || { label: t, blurb: '(no form yet — JSON editing)', group: 'Other', icon: '⬜' };
        (groups[stu.group] = groups[stu.group] || []).push({ type: t, meta: m, stu: stu });
      });
      Object.keys(groups).sort().forEach(function (g) {
        paneStory.appendChild(el('h3', 'stu-h3', g));
        var row = el('div', 'stu-cards');
        groups[g].forEach(function (entry) {
          var c = el('button', 'stu-card');
          c.appendChild(el('div', 'stu-card-icon', entry.stu.icon || '⬜'));
          c.appendChild(el('div', 'stu-card-label', entry.stu.label));
          c.appendChild(el('div', 'stu-card-blurb', entry.stu.blurb));
          c.appendChild(el('div', 'stu-card-min', TEACHER
            ? T('Needs a ' + sizeWord(entry.meta.minZone) + ' area', 'Braucht einen ' + sizeWord(entry.meta.minZone) + 'en Bereich')
            : 'needs space: ' + entry.meta.minZone.w + '×' + entry.meta.minZone.h));
          c.addEventListener('click', function () {
            closeDrawer();
            applyMechanic(entry.type);
          });
          row.appendChild(c);
        });
        paneStory.appendChild(row);
      });

      /* ---- tab 2: the worksheet makers (studio-generators.json) ---- */
      if (global.StudioGeneratorBridge) {
        global.StudioGeneratorBridge.fetchGenerators().then(function (man) {
          var loc = S().storyLocale || 'en';
          var band = S().gradeBand;
          var groupsDef = man.groups || {};
          var byGroup = {};
          (man.apps || []).forEach(function (a) {
            (byGroup[a.skillGroup] = byGroup[a.skillGroup] || []).push(a);
          });
          paneWs.appendChild(el('div', 'stu-note',
            T('Design a worksheet in any maker — it becomes a playable activity on this page.', 'Gestalten Sie ein Arbeitsblatt in einem Generator – es wird eine spielbare Aufgabe auf dieser Seite.')));
          Object.keys(byGroup).forEach(function (g) {
            var gd = groupsDef[g] || {};
            paneWs.appendChild(el('h3', 'stu-h3',
              ((gd.icon || '') + ' ' + ((gd[loc] || gd.en) || g)).trim()));
            var row = el('div', 'stu-cards');
            var apps = byGroup[g].slice();
            if (band) {
              /* soft grade-band recommendation: matching makers sort first */
              apps.sort(function (a, b) {
                var am = (a.gradeBands || []).indexOf(band) >= 0 ? 0 : 1;
                var bm = (b.gradeBands || []).indexOf(band) >= 0 ? 0 : 1;
                return am - bm;
              });
            }
            apps.forEach(function (a) {
              var c = el('button', 'stu-card');
              c.appendChild(el('div', 'stu-card-icon', gd.icon || '📝'));
              c.appendChild(el('div', 'stu-card-label', (a.title && (a.title[loc] || a.title.en)) || a.id));
              c.appendChild(el('div', 'stu-card-blurb', (a.blurb && (a.blurb[loc] || a.blurb.en)) || ''));
              if (band && (a.gradeBands || []).indexOf(band) >= 0) {
                c.appendChild(el('div', 'stu-card-min stu-card-fit', T('★ fits this story\'s grade', '★ passt zur Klassenstufe')));
              }
              c.addEventListener('click', function () {
                closeDrawer();
                global.StudioGeneratorBridge.open(a, {
                  onAdded: function (res) { applyWorksheetExercise(res); }
                });
              });
              row.appendChild(c);
            });
            paneWs.appendChild(row);
          });
        }).catch(function () {
          paneWs.appendChild(el('div', 'stu-empty', 'The worksheet-maker list could not be loaded.'));
        });
      } else {
        paneWs.appendChild(el('div', 'stu-empty', 'The worksheet-maker bridge is not loaded.'));
      }
    }, true);
  }

  /* a freshly imported SEP package becomes THE page activity, placed ON the
     current page as a SELECTED element ready to drag/resize:
       - a zone the operator already drew on this page is PRESERVED (their
         intent wins; an under-density zone shows the existing amber cue),
       - else the zone is aspect-fit to the exercise's crop, centered, capped
         at 1400×840 and floored at the module minZone. Density-safe: the
         validator's boardScale is a min(), so an aspect-fit zone at the cap
         letterboxes to the SAME scale the old fixed 1400×840 box gave —
         full sheets keep clearing the 16px density floor. res may be a bare
         package path (legacy/upload path) or the bridge's full result
         {package, descriptor, …}. */
  function applyWorksheetExercise(res) {
    var pkg = (typeof res === 'string') ? res : (res && res.package);
    var desc = (res && typeof res === 'object') ? res.descriptor : null;
    if (!pkg) return;
    var prev = pageObj() && pageObj().interaction;
    var prevZone = (prev && prev.zone) ? global.Studio.clone(prev.zone) : null;
    applyMechanic('sb-worksheet-exercise');
    mutate('set worksheet exercise', function (draft) {
      var inter = draft.story.pages[pgIdx()].interaction;
      if (!inter) return;
      inter.taskData.package = pkg;
      inter.zone = prevZone || zoneFromCrop(desc);
    });
    global.StudioCanvas.select({ kind: 'zone' });
    toast(T('Activity placed — drag or resize it on the page.',
            'Aufgabe eingefügt – auf der Seite verschieben oder vergrößern.'));
  }
  function zoneFromCrop(desc) {
    var c = desc && desc.crop;
    if (!c || !c.w || !c.h) return { x: 100, y: 110, w: 1400, h: 840 };
    var mod = global.SBModules.get('sb-worksheet-exercise');
    var mz = (mod && mod.meta && mod.meta.minZone) || { w: 640, h: 520 };
    /* aspect-fit into the large box; never upscale a small exercise > 1.6× */
    var s = Math.min(1400 / c.w, 840 / c.h, 1.6);
    var w = Math.max(mz.w, Math.min(1400, Math.round(c.w * s)));
    var h = Math.max(mz.h, Math.min(840, Math.round(c.h * s)));
    return { x: Math.round((1600 - w) / 2), y: Math.round((940 - h) / 2) + 60, w: w, h: h };
  }

  function applyMechanic(type) {
    var m = global.SBModules.get(type).meta;
    var stu = m.studio || {};
    mutate('choose activity', function (draft) {
      var pg = draft.story.pages[pgIdx()];
      var w = Math.min(1400, Math.round(m.minZone.w * 1.25));
      var h = Math.min(840, Math.round(m.minZone.h * 1.25));
      pg.interaction = {
        moduleType: type,
        zone: { x: Math.round((1600 - w) / 2), y: Math.round((940 - h) / 2) + 60, w: w, h: h },
        completionMode: m.completionModes[0],
        taskData: global.Studio.clone(stu.defaults || {})
      };
    });
  }

  /* ================= floating shell chrome =================
     Lives INSIDE #stu-canvas-host (over the canvas, never reserving space):
     the toolbar-restore pill, the inspector edge tab, the zoom cluster.
     openStory() wipes the host, so this rebuilds idempotently on render. */
  function renderShellChrome() {
    var host = refs.canvasHost;
    if (!host || !S().doc) return;

    if (!host.querySelector('.stu-menu-pill')) {
      var pill = el('button', 'stu-menu-pill');
      pill.appendChild(el('span', 'stu-savedot'));
      pill.appendChild(doc.createTextNode('∨ ' + T('Menu', 'Menü')));
      pill.title = T('Show the toolbar', 'Werkzeugleiste anzeigen');
      pill.addEventListener('click', function () { setShell({ top: true }); });
      host.appendChild(pill);
    }
    var pillDot = host.querySelector('.stu-menu-pill .stu-savedot');
    if (pillDot) {
      var st = S().saveState;
      pillDot.className = 'stu-savedot' +
        (st === 'saving' ? ' stu-dot-saving' : (st === 'conflict' || st === 'error') ? ' stu-dot-bad' : '');
    }

    if (!host.querySelector('.stu-panel-tab')) {
      var tab = el('button', 'stu-panel-tab', '« ' + T('Page setup', 'Seiten-Einstellungen'));
      tab.title = T('Show the page panel', 'Seitenpanel anzeigen');
      tab.addEventListener('click', function () { setShell({ panel: true }); });
      host.appendChild(tab);
    }

    if (!host.querySelector('.stu-zoombar')) {
      var z = el('div', 'stu-zoombar');
      var mk = function (label, title, fn, cls) {
        var b = el('button', 'stu-zbtn' + (cls ? ' ' + cls : ''), label);
        b.title = title;
        b.addEventListener('click', fn);
        z.appendChild(b);
        return b;
      };
      mk('−', T('Zoom out', 'Verkleinern') + ' (Ctrl −)', function () { global.StudioCanvas.zoomOut(); });
      var pct = mk('100%', T('Zoom to 100%', 'Auf 100 % zoomen') + ' (Ctrl 1)', function () { global.StudioCanvas.zoom100(); }, 'stu-zpct');
      mk('+', T('Zoom in', 'Vergrößern') + ' (Ctrl +)', function () { global.StudioCanvas.zoomIn(); });
      z.appendChild(el('span', 'stu-zdiv'));
      mk(T('Fit', 'Einpassen'), T('Fit the whole page', 'Ganze Seite einpassen') + ' (Ctrl 0)', function () { global.StudioCanvas.zoomFit(); });
      z.appendChild(el('span', 'stu-zdiv'));
      var focusBtn = mk('⛶ ' + T('Focus', 'Fokus'),
        T('Hide the panels for a clean view', 'Alle Leisten ausblenden – freie Sicht') + ' (Ctrl \\)',
        function () { toggleFocus(); renderShellChrome(); }, 'stu-zfocus');
      mk('⤢', T('Fullscreen', 'Vollbild'), function () {
        try {
          if (doc.fullscreenElement) doc.exitFullscreen();
          else doc.documentElement.requestFullscreen();
        } catch (e) {}
      });
      host.appendChild(z);
      if (global.StudioCanvas.onView) {
        global.StudioCanvas.onView(function (v) {
          var p2 = refs.canvasHost && refs.canvasHost.querySelector('.stu-zpct');
          if (p2) p2.textContent = Math.round(v.scale * 100) + '%';
        });
      }
      var v0 = global.StudioCanvas.getView && global.StudioCanvas.getView();
      if (v0) pct.textContent = Math.round(v0.scale * 100) + '%';
    }
    var fb = host.querySelector('.stu-zfocus');
    if (fb) {
      fb.classList.toggle('stu-on', !!UI.focus);
      fb.textContent = UI.focus ? '⛶ ' + T('Exit focus', 'Fokus beenden') : '⛶ ' + T('Focus', 'Fokus');
    }
  }

  /* ================= inspector panel ================= */
  var _lastSelKey = null;
  function render() {
    if (!refs.panel || !S().doc) return;
    /* a NEW selection summons the inspector — a collapsed panel can never
       strand a non-technical user (change-triggered, so collapsing while
       something stays selected sticks) */
    var selNow = S().selection;
    var selKey = selNow ? JSON.stringify(selNow) : null;
    if (selNow && selKey !== _lastSelKey && !UI.panel) {
      UI.panel = true;
      saveUI();
      syncShellClasses();
    }
    _lastSelKey = selKey;
    renderRail();
    renderTopbar();
    renderShellChrome();
    var p = refs.panel;
    p.innerHTML = '';
    var hide = el('button', 'stu-panel-collapse', '»');
    hide.title = T('Hide this panel', 'Panel ausblenden');
    hide.addEventListener('click', function () { setShell({ panel: false }); });
    p.appendChild(hide);
    var sel = S().selection;
    var pg = pageObj();
    if (!pg) return;

    if (sel && sel.kind === 'character') { renderCharPanel(p, sel); return; }
    if (sel && (sel.kind === 'drawable' || sel.kind === 'point')) { renderDrawablePanel(p, sel); return; }

    /* -------- page panel -------- */
    p.appendChild(el('h2', 'stu-h2', T('Page ', 'Seite ') + (pgIdx() + 1)));
    p.appendChild(checklist(pg));

    /* THE PAGE RECIPE — picture → characters → story lines → activity →
       hint & cheer (story first, task second: the order teachers think in).
       Teacher mode numbers the steps. */
    var stepNo = 0;
    var step = function (title, de) {
      stepNo++;
      return TEACHER ? (stepNo + ' · ' + T(title, de)) : title;
    };

    /* picture */
    section(p, step('Picture', 'Bild'), function (box) {
      var btn = el('button', 'stu-btn', pg.scene && pg.scene.image
        ? T('Change the picture', 'Bild ändern') : T('Pick a picture', 'Bild auswählen'));
      btn.addEventListener('click', openScenePicker);
      box.appendChild(btn);
    });

    /* characters */
    section(p, step('Characters', 'Figuren'), function (box) {
      (pg.characters || []).forEach(function (pl, i) {
        var chip = el('button', 'stu-chip stu-chip-btn', pl.characterId + ' · ' + pl.pose);
        chip.addEventListener('click', function () { global.StudioCanvas.select({ kind: 'character', index: i }); });
        box.appendChild(chip);
      });
      var add = el('button', 'stu-btn', T('+ Add a character', '+ Figur hinzufügen'));
      add.addEventListener('click', function () { openCastPicker(); });
      box.appendChild(add);
    });

    /* story lines */
    section(p, step('Story lines (what ' + guideName() + ' says)', 'Erzähltext (was ' + guideName() + ' sagt)'), function (box) {
      renderNarration(box, pg);
    });

    /* activity */
    section(p, step('Activity', 'Aufgabe'), function (box) {
      if (!pg.interaction) {
        var b = el('button', 'stu-btn stu-btn-primary', T('Choose an activity', 'Aufgabe auswählen'));
        b.addEventListener('click', openMechanicPicker);
        box.appendChild(b);
        return;
      }
      renderMechanicForm(box, pg.interaction);
    });

    /* hint + cheer */
    section(p, step('Hint & cheer', 'Tipp & Lob'), function (box) {
      box.appendChild(labeledStringBox(T('Hint — when the child is stuck', 'Tipp – wenn das Kind nicht weiterkommt'),
        pg.interaction && pg.interaction.hintKey,
        function (draft, key) { draft.story.pages[pgIdx()].interaction.hintKey = key; },
        pg.id + '-hint', !pg.interaction));
      box.appendChild(labeledStringBox(T('Cheer — after they succeed', 'Lob – wenn es geschafft ist'),
        pg.success && pg.success.narrationKey,
        function (draft, key) {
          var dpg = draft.story.pages[pgIdx()];
          dpg.success = dpg.success || { celebration: 'burst', holdMs: 1200 };
          dpg.success.narrationKey = key;
        },
        pg.id + '-bravo', false));
    });

    /* page actions */
    section(p, T('This page', 'Diese Seite'), function (box) {
      var dup = el('button', 'stu-btn', T('Duplicate page', 'Seite duplizieren'));
      dup.addEventListener('click', duplicatePage);
      var del = el('button', 'stu-btn stu-btn-danger', T('Remove page…', 'Seite entfernen…'));
      del.addEventListener('click', deletePageConfirm);
      box.appendChild(dup); box.appendChild(del);
    });

    /* tidy up */
    var unused = POWER() ? global.Studio.unusedKeys() : [];
    if (unused.length) {
      section(p, 'Tidy up', function (box) {
        box.appendChild(el('div', 'stu-note', unused.length + ' unused line(s) of text are kept safe. Remove them when you are sure.'));
        var b2 = el('button', 'stu-btn', 'Show unused text…');
        b2.addEventListener('click', openLedger);
        box.appendChild(b2);
      });
    }
  }

  function guideName() {
    var g = (S().doc.story.cast || []).filter(function (c) { return c.role === 'guide'; })[0];
    return g ? global.Studio.str('cast.' + g.id + '.name') || g.id : T('the helper', 'die Erzählfigur');
  }

  function section(p, title, fn) {
    var s = el('div', 'stu-section');
    s.appendChild(el('h3', 'stu-h3', title));
    var box = el('div', 'stu-section-body');
    fn(box);
    s.appendChild(box);
    p.appendChild(s);
  }

  function checklist(pg) {
    var c = el('div', 'stu-checklist');
    var items = [
      [T('Picture', 'Bild'), !!(pg.scene && pg.scene.image)],
      [T('Character', 'Figur'), (pg.characters || []).length > 0],
      [T('Story lines', 'Erzähltext'), ((pg.narration && pg.narration.cues) || []).length > 0],
      [T('Activity', 'Aufgabe'), !!pg.interaction],
      [T('Cheer', 'Lob'), !!(pg.success && pg.success.narrationKey)]
    ];
    items.forEach(function (it) {
      var d = el('span', 'stu-checkitem' + (it[1] ? ' stu-ok' : ''), (it[1] ? '✓ ' : '· ') + it[0]);
      c.appendChild(d);
    });
    return c;
  }

  function renderMechanicForm(box, inter) {
    var m = global.SBModules.get(inter.moduleType);
    var stu = m && m.meta.studio;
    var head = el('div', 'stu-mech-head');
    head.appendChild(el('strong', null, (stu && stu.label) || inter.moduleType));
    var change = el('button', 'stu-btn stu-btn-small', T('Change…', 'Ändern…'));
    change.addEventListener('click', openMechanicPicker);
    head.appendChild(change);
    var rm = el('button', 'stu-btn stu-btn-small stu-btn-danger', T('Remove', 'Entfernen'));
    rm.addEventListener('click', function () {
      mutate('remove activity', function (draft) { draft.story.pages[pgIdx()].interaction = null; });
    });
    head.appendChild(rm);
    box.appendChild(head);
    if (stu && stu.note) box.appendChild(el('div', 'stu-note', stu.note));

    /* a placed worksheet exercise: Replace (from a maker) beats Edit —
       generators can't round-trip their state, so re-design + re-export */
    if (inter.moduleType === 'sb-worksheet-exercise' && global.StudioGeneratorBridge) {
      var rep = el('button', 'stu-btn stu-btn-small', T('↻ Replace from a worksheet maker…', '↻ Neu aus einem Generator einfügen…'));
      rep.addEventListener('click', openMechanicPicker);
      box.appendChild(rep);
    }

    var commit = function (fn) {
      mutate('edit activity', function (draft) {
        fn(draft.story.pages[pgIdx()].interaction.taskData, draft);
      });
    };
    var getTd = function () { return pageObj().interaction.taskData; };

    if (stu && stu.pattern) renderPatternEditor(box, getTd, commit);
    else if (stu && stu.spotDiff) renderSpotDiffEditor(box, getTd, commit);
    else if (stu && stu.fields) {
      renderFields(box, stu.fields, getTd, commit, {
        siblingKeys: function () {
          var td = getTd();
          var lists = [];
          (stu.fields || []).concat(stu.drawables || []).forEach(function (f) {
            if (f.bind && td[f.bind]) lists = lists.concat(td[f.bind].map(function (x) { return x.key; }));
            if (f.kind === 'list' && f.keyField && td[f.key]) lists = lists.concat(td[f.key].map(function (x) { return x[f.keyField]; }));
          });
          return lists;
        }
      });
    }
    /* drawable add buttons */
    (stu && stu.drawables || []).forEach(function (dr) {
      var b = el('button', 'stu-btn', '+ ' + (dr.addLabel || 'Add') + ' (click the picture where it goes)');
      b.addEventListener('click', function () {
        if (dr.kind === 'rect') {
          global.StudioCanvas.startPlaceRect(dr, function (idx) {
            if (dr.fields && dr.fields.some(function (f) { return f.kind === 'image'; })) {
              openLibrary(function (src, vocabKey, word) {
                mutate('set object picture', function (draft) {
                  var item = draft.story.pages[pgIdx()].interaction.taskData[dr.bind][idx];
                  item.image = global.Studio.ensureImageAsset(draft, src, vocabKey);
                  applyVocabAutofill(item, draft, vocabKey, word, { wantsWord: true });
                  if (item.mustFind === undefined) {
                    item.mustFind = true;
                    var find = draft.story.pages[pgIdx()].interaction.taskData.find =
                      draft.story.pages[pgIdx()].interaction.taskData.find || [];
                    if (find.indexOf(item.key) < 0) find.push(item.key);
                  }
                });
              });
            }
          });
        } else if (dr.kind === 'path') {
          global.StudioCanvas.startPlacePath(dr);
        } else if (dr.kind === 'maze') {
          global.StudioCanvas.startPlaceMaze(dr);
        } else if (dr.kind === 'scalarPoint') {
          global.StudioCanvas.startPlaceScalarPoint(dr);
        } else global.StudioCanvas.startPlacePoint(dr);
      });
      box.appendChild(b);
      /* path/maze are multi-click — offer an explicit Finish (also Enter / double-click) */
      if (dr.kind === 'path' || dr.kind === 'maze') {
        var fin = el('button', 'stu-btn', (dr.kind === 'path' ? 'Finish path' : 'Done drawing walls') + ' (or press Enter)');
        fin.addEventListener('click', function () { global.StudioCanvas.finishPlace(); });
        box.appendChild(fin);
      }
    });

    /* advanced JSON + inline validation (operator/admin) */
    if (POWER()) {
      var adv = el('details', 'stu-adv');
      adv.appendChild(el('summary', null, 'Advanced (raw settings)'));
      var ta = el('textarea', 'stu-json');
      ta.value = JSON.stringify(getTd(), null, 2);
      var apply = el('button', 'stu-btn stu-btn-small', 'Apply');
      apply.addEventListener('click', function () {
        try {
          var parsed = JSON.parse(ta.value);
          mutate('edit activity (advanced)', function (draft) {
            draft.story.pages[pgIdx()].interaction.taskData = parsed;
          });
        } catch (e) { alert('That is not valid JSON yet: ' + e.message); }
      });
      adv.appendChild(ta); adv.appendChild(apply);
      box.appendChild(adv);
    }

    var errs = global.Studio.validateInteraction(inter);
    if (errs.length) {
      var elist = el('div', 'stu-errors');
      errs.forEach(function (e2) { elist.appendChild(el('div', 'stu-error', '• ' + e2)); });
      box.appendChild(elist);
    } else {
      box.appendChild(el('div', 'stu-okline', '✓ This activity is ready.'));
    }
  }

  /* ---- bespoke: pattern editor ---- */
  function renderPatternEditor(box, getTd, commit) {
    var td = getTd();
    box.appendChild(el('div', 'stu-note', 'Build the pattern: add pictures, then tap them in order. One slot is the gap the child fills.'));
    /* palette of tile keys */
    var pal = el('div', 'stu-chips');
    Object.keys(td.tiles || {}).forEach(function (k) {
      var asset = S().doc.story.assets[td.tiles[k]];
      var chip = el('button', 'stu-tilechip');
      if (asset) { var im = el('img'); im.src = asset.src; chip.appendChild(im); }
      chip.addEventListener('click', function () {
        commit(function (o) { (o.sequence = o.sequence || []).push(k); });
      });
      pal.appendChild(chip);
    });
    var addT = el('button', 'stu-btn stu-btn-small', '+ picture');
    addT.addEventListener('click', function () {
      openLibrary(function (src, vocabKey) {
        commit(function (o, draft) {
          var id = global.Studio.ensureImageAsset(draft, src, vocabKey);
          o.tiles = o.tiles || {};
          var k = String.fromCharCode(97 + Object.keys(o.tiles).length);
          o.tiles[k] = id;
          o.choices = Object.keys(o.tiles);
          if (!o.answerKey) o.answerKey = k;
        });
      });
    });
    pal.appendChild(addT);
    box.appendChild(pal);
    /* the strip */
    var strip = el('div', 'stu-strip');
    (td.sequence || []).forEach(function (k, i) {
      var cell = el('button', 'stu-stripcell' + (k === null ? ' stu-gap' : ''));
      if (k === null) cell.textContent = '?';
      else {
        var asset = S().doc.story.assets[(td.tiles || {})[k]];
        if (asset) { var im2 = el('img'); im2.src = asset.src; cell.appendChild(im2); }
      }
      cell.title = 'Click to remove';
      cell.addEventListener('click', function () {
        commit(function (o) { o.sequence.splice(i, 1); });
      });
      strip.appendChild(cell);
    });
    box.appendChild(strip);
    var gapB = el('button', 'stu-btn stu-btn-small', '+ the gap (?)');
    gapB.addEventListener('click', function () {
      commit(function (o) { (o.sequence = o.sequence || []).push(null); });
    });
    box.appendChild(gapB);
    /* answer */
    if (Object.keys(td.tiles || {}).length) {
      var ans = el('div', 'stu-frow');
      ans.appendChild(el('label', 'stu-flabel', 'What fills the gap?'));
      Object.keys(td.tiles).forEach(function (k) {
        var lab = el('label', 'stu-radio');
        var r = el('input'); r.type = 'radio'; r.name = 'pat-ans';
        r.checked = td.answerKey === k;
        r.addEventListener('change', function () { commit(function (o) { o.answerKey = k; o.choices = Object.keys(o.tiles); }); });
        lab.appendChild(r);
        var asset = S().doc.story.assets[td.tiles[k]];
        if (asset) { var im3 = el('img'); im3.className = 'stu-mini'; im3.src = asset.src; lab.appendChild(im3); }
        ans.appendChild(lab);
      });
      box.appendChild(ans);
    }
  }

  /* ---- bespoke: spot-diff editor ---- */
  function renderSpotDiffEditor(box, getTd, commit) {
    var td = getTd();
    box.appendChild(el('div', 'stu-note', 'Fill the grid with pictures, then mark 1–4 cells as changed (different picture, or missing on the right).'));
    var dims = el('div', 'stu-frow');
    ['rows', 'cols'].forEach(function (dk) {
      var s2 = el('select');
      (dk === 'rows' ? [1, 2, 3] : [2, 3, 4]).forEach(function (n) {
        var o = el('option'); o.value = n; o.textContent = dk + ': ' + n; s2.appendChild(o);
      });
      s2.value = String((td.grid || {})[dk] || (dk === 'rows' ? 2 : 3));
      s2.addEventListener('change', function () {
        commit(function (o) {
          o.grid = o.grid || { rows: 2, cols: 3 };
          o.grid[dk] = Number(s2.value);
          var n = o.grid.rows * o.grid.cols;
          o.cells = (o.cells || []).slice(0, n);
          while (o.cells.length < n) o.cells.push(o.cells[0] || null);
          o.diffs = (o.diffs || []).filter(function (d) { return d.index < n; });
        });
      });
      dims.appendChild(s2);
    });
    box.appendChild(dims);

    var g = td.grid || { rows: 2, cols: 3 };
    var grid = el('div', 'stu-sdgrid');
    grid.style.gridTemplateColumns = 'repeat(' + g.cols + ', 64px)';
    var diffBy = {};
    (td.diffs || []).forEach(function (d) { diffBy[d.index] = d; });
    for (var i = 0; i < g.rows * g.cols; i++) {
      (function (idx) {
        var cellKey = (td.cells || [])[idx];
        var cell = el('button', 'stu-sdcell' + (diffBy[idx] ? ' stu-sd-diff' : ''));
        var asset = cellKey && S().doc.story.assets[(td.tiles || {})[cellKey]];
        if (asset) { var im = el('img'); im.src = asset.src; cell.appendChild(im); }
        else cell.textContent = '+';
        var mark = diffBy[idx] ? (diffBy[idx].rightKey === null ? 'missing' : 'changed') : '';
        if (mark) cell.appendChild(el('div', 'stu-sdmark', mark));
        cell.addEventListener('click', function (ev) {
          if (ev.shiftKey && cellKey) {
            /* shift-click cycles the diff state: none → changed(pick) → missing → none */
            if (!diffBy[idx]) {
              openLibrary(function (src, vocabKey) {
                commit(function (o, draft) {
                  var id = global.Studio.ensureImageAsset(draft, src, vocabKey);
                  o.tiles = o.tiles || {};
                  var k = keyForTile(o.tiles, id, vocabKey);
                  o.diffs = o.diffs || [];
                  o.diffs.push({ index: idx, rightKey: k });
                });
              });
            } else if (diffBy[idx].rightKey !== null) {
              commit(function (o) {
                o.diffs.forEach(function (d) { if (d.index === idx) d.rightKey = null; });
              });
            } else {
              commit(function (o) { o.diffs = o.diffs.filter(function (d) { return d.index !== idx; }); });
            }
          } else {
            openLibrary(function (src, vocabKey) {
              commit(function (o, draft) {
                var id = global.Studio.ensureImageAsset(draft, src, vocabKey);
                o.tiles = o.tiles || {};
                var k = keyForTile(o.tiles, id, vocabKey);
                o.cells = o.cells || [];
                var n = (o.grid.rows * o.grid.cols);
                while (o.cells.length < n) o.cells.push(null);
                o.cells[idx] = k;
              });
            });
          }
        });
        grid.appendChild(cell);
      }(i));
    }
    box.appendChild(grid);
    box.appendChild(el('div', 'stu-note', 'Click a cell = set its picture. Shift-click = mark it changed → missing → back.'));
  }
  function keyForTile(tiles, assetId, hint) {
    for (var k in tiles) if (tiles[k] === assetId) return k;
    var base = (hint || 'x').charAt(0), key = base, n = 2;
    while (tiles[key]) key = base + n++;
    tiles[key] = assetId;
    return key;
  }

  /* ---- selection panels ---- */
  function renderCharPanel(p, sel) {
    var pg = pageObj();
    var pl = pg.characters[sel.index];
    if (!pl) { global.StudioCanvas.select(null); return; }
    p.appendChild(el('h2', 'stu-h2', pl.characterId));
    var castDef = (S().doc.story.cast || []).filter(function (c) { return c.id === pl.characterId; })[0];
    var chg = el('button', 'stu-btn', 'Change character…');
    chg.addEventListener('click', function () {
      openCastPicker(function (newCast) {
        mutate('change character', function (draft) {
          ensureCastEntry(draft, newCast);
          var c = draft.story.pages[pgIdx()].characters[sel.index];
          c.characterId = newCast.characterId;
          c.pose = (newCast.poses && newCast.poses[0]) || 'neutral';
        });
        global.StudioCanvas.select({ kind: 'character', index: sel.index });
      });
    });
    p.appendChild(chg);
    var poses = (castDef && castDef.poses) || [];
    section(p, 'Pose', function (box) {
      if (!poses.length) { box.appendChild(el('div', 'stu-note', 'This character has no named poses.')); return; }
      poses.forEach(function (pose) {
        var b = el('button', 'stu-chip stu-chip-btn' + (pl.pose === pose ? ' stu-on' : ''), pose);
        b.addEventListener('click', function () {
          mutate('change pose', function (draft) { draft.story.pages[pgIdx()].characters[sel.index].pose = pose; });
        });
        box.appendChild(b);
      });
    });
    var clipNames = Object.keys((castDef && castDef.clips) || {});
    section(p, 'Animations', function (box) {
      if (clipNames.length) {
        box.appendChild(el('div', 'stu-flabel', 'Entrance (plays when the page opens)'));
        var esel = el('select');
        var none = el('option'); none.value = ''; none.textContent = '— none —'; esel.appendChild(none);
        clipNames.forEach(function (nm) { var o = el('option'); o.value = nm; o.textContent = nm; esel.appendChild(o); });
        esel.value = pl.entranceClip || '';
        esel.addEventListener('change', function () {
          mutate('entrance animation', function (draft) {
            var c = draft.story.pages[pgIdx()].characters[sel.index];
            if (esel.value) c.entranceClip = esel.value; else delete c.entranceClip;
          });
        });
        box.appendChild(esel);
        box.appendChild(el('div', 'stu-note', clipNames.length + ' animation' + (clipNames.length > 1 ? 's' : '') + ': ' + clipNames.join(', ') + '. Attach one to a spoken line in the Narration panel.'));
      } else {
        box.appendChild(el('div', 'stu-note', 'No animations yet. Upload a TexturePacker animation sheet (name its frames wave_0001, nod_0001, …) to give this character gestures you can play on any spoken line.'));
      }
      /* clips upload = operator/admin (TexturePacker); teachers use the
         platform library's pre-animated characters */
      if (!POWER()) return;
      var addBtn = el('button', 'stu-btn', '⬆ Add animations (sheet + .json)');
      var addInp = el('input'); addInp.type = 'file'; addInp.accept = 'image/*,.json,application/json'; addInp.multiple = true; addInp.style.display = 'none';
      addBtn.addEventListener('click', function () { addInp.click(); });
      addInp.addEventListener('change', function () {
        var files = [].slice.call(addInp.files || []);
        var img = files.filter(function (f) { return /^image\//.test(f.type) || /\.(png|jpe?g|webp|gif)$/i.test(f.name); })[0];
        var jsn = files.filter(function (f) { return f.type === 'application/json' || /\.json$/i.test(f.name); })[0];
        if (!img || !jsn) { addBtn.textContent = '✗ select BOTH the animation sheet image and its .json'; return; }
        addBtn.textContent = 'Uploading ' + img.name + '…';
        var rB64 = function (f) { return new Promise(function (rs, rj) { var r = new FileReader(); r.onload = function () { rs(String(r.result).split(',')[1] || ''); }; r.onerror = rj; r.readAsDataURL(f); }); };
        var rTxt = function (f) { return new Promise(function (rs, rj) { var r = new FileReader(); r.onload = function () { rs(r.result); }; r.onerror = rj; r.readAsText(f); }); };
        Promise.all([rB64(img), rTxt(jsn)]).then(function (r) {
          var atlas; try { atlas = JSON.parse(r[1]); } catch (e) { addBtn.textContent = '✗ that .json is not valid JSON'; return null; }
          return global.Studio.api('/studio/import-character-clips/' + S().id + '?character=' + encodeURIComponent(pl.characterId), {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ atlas: atlas, imageBase64: r[0], imageExt: (String(img.name).split('.').pop() || '').toLowerCase() }) });
        }).then(function (j) {
          if (!j) return;
          if (j.__status !== 200 || !(j.clips || []).length) { addBtn.textContent = '✗ ' + (j.error || 'upload failed'); return; }
          mutate('add animations', function (draft) {
            var entry = (draft.story.cast || []).filter(function (c) { return c.id === pl.characterId; })[0];
            applyCastClips(draft, entry, pl.characterId, j.atlasClips, j.clips, entry && entry.poses);
          });
        }).catch(function () { addBtn.textContent = '✗ couldn\'t reach the Studio server'; });
      });
      box.appendChild(addBtn); box.appendChild(addInp);
    });
    section(p, 'Facing', function (box) {
      var b = el('button', 'stu-btn', pl.flip ? '↩ Face left (flipped)' : '↪ Face right (normal)');
      b.addEventListener('click', function () {
        mutate('flip', function (draft) {
          var c = draft.story.pages[pgIdx()].characters[sel.index];
          c.flip = !c.flip;
        });
      });
      box.appendChild(b);
    });
    section(p, 'Size', function (box) {
      var rng = el('input'); rng.type = 'range'; rng.min = 0.3; rng.max = 2; rng.step = 0.05;
      rng.value = pl.scale || 1;
      rng.addEventListener('change', function () {
        mutate('resize character', function (draft) {
          draft.story.pages[pgIdx()].characters[sel.index].scale = Number(rng.value);
        });
      });
      box.appendChild(rng);
    });
    var del = el('button', 'stu-btn stu-btn-danger', 'Remove from this page');
    del.addEventListener('click', function () {
      mutate('remove character', function (draft) {
        draft.story.pages[pgIdx()].characters.splice(sel.index, 1);
      });
      global.StudioCanvas.select(null);
    });
    p.appendChild(del);
    backLink(p);
  }

  function renderDrawablePanel(p, sel) {
    var inter = pageObj().interaction;
    var mod = inter && global.SBModules.get(inter.moduleType);
    var stu = mod && mod.meta && mod.meta.studio;
    if (!stu) { global.StudioCanvas.select(null); return; }
    var dr = (stu.drawables || []).filter(function (d) { return d.bind === sel.bind; })[0];
    var bindArr = inter.taskData && inter.taskData[sel.bind];
    var item = bindArr && bindArr[sel.index];
    if (!dr || !item) { global.StudioCanvas.select(null); return; }
    p.appendChild(el('h2', 'stu-h2', 'Object ' + (sel.index + 1)));
    renderFields(p, dr.fields || [], function () { return pageObj().interaction.taskData[sel.bind][sel.index]; },
      function (fn) {
        mutate('edit object', function (draft) {
          var it = draft.story.pages[pgIdx()].interaction.taskData[sel.bind][sel.index];
          var beforeKey = it.key;
          fn(it, draft);
          /* memberOf sync (mustFind ↔ find[]) */
          (dr.fields || []).forEach(function (f) {
            if (f.memberOf && it[f.key] !== undefined) {
              var arr = draft.story.pages[pgIdx()].interaction.taskData[f.memberOf] =
                draft.story.pages[pgIdx()].interaction.taskData[f.memberOf] || [];
              var i2 = arr.indexOf(beforeKey);
              if (i2 >= 0) arr.splice(i2, 1);
              if (it[f.key]) arr.push(it.key);
              delete it[f.key];
              it.__mustFind = undefined;
            }
          });
        });
      }, { wantsWord: true });
    /* show mustFind state from find[] */
    var find = inter.taskData.find || [];
    var lb = el('label', 'stu-check');
    var cb = el('input'); cb.type = 'checkbox';
    cb.checked = find.indexOf(item.key) >= 0;
    cb.addEventListener('change', function () {
      mutate('must find', function (draft) {
        var td = draft.story.pages[pgIdx()].interaction.taskData;
        td.find = td.find || [];
        var i2 = td.find.indexOf(item.key);
        if (cb.checked && i2 < 0) td.find.push(item.key);
        if (!cb.checked && i2 >= 0) td.find.splice(i2, 1);
      });
    });
    lb.appendChild(cb); lb.appendChild(doc.createTextNode(' Must find this one'));
    p.appendChild(lb);
    backLink(p);
  }

  function backLink(p) {
    var b = el('button', 'stu-btn stu-btn-small', '← Back to the page');
    b.addEventListener('click', function () { global.StudioCanvas.select(null); });
    p.insertBefore(b, p.firstChild);
  }

  /* ---- narration ---- */
  function renderNarration(box, pg) {
    var cues = (pg.narration && pg.narration.cues) || [];
    cues.forEach(function (cue, i) {
      var row = el('div', 'stu-cue');
      var who = el('select');
      (S().doc.story.cast || []).forEach(function (c) {
        var o = el('option'); o.value = c.id; o.textContent = global.Studio.str('cast.' + c.id + '.name') || c.id;
        who.appendChild(o);
      });
      who.value = cue.characterId || '';
      who.addEventListener('change', function () {
        mutate('change speaker', function (draft) {
          var c = draft.story.pages[pgIdx()].narration.cues[i];
          c.characterId = who.value;
          delete c.clip; /* the animation belonged to the previous speaker */
        });
      });
      row.appendChild(who);
      var txt = el('textarea', 'stu-cuetext');
      txt.value = global.Studio.str(cue.id);
      txt.rows = 2;
      txt.addEventListener('change', function () {
        mutate('edit line', function (draft) {
          draft.strings[cue.id] = draft.strings[cue.id] || {};
          draft.strings[cue.id][global.Studio.state.storyLocale || 'en'] = txt.value;
        });
      });
      row.appendChild(txt);
      var meta = el('div', 'stu-cue-meta');
      /* ▶ hear the line the way students will (the player's TTS voice) */
      var say = el('button', 'stu-btn stu-btn-small', '▶ ' + T('Hear it', 'Anhören'));
      say.title = T('Students hear these lines read aloud automatically.',
        'Diese Zeilen werden den Kindern automatisch vorgelesen.');
      say.addEventListener('click', function () {
        try {
          global.speechSynthesis.cancel();
          var u2 = new SpeechSynthesisUtterance(global.Studio.str(cue.id));
          u2.lang = S().storyLocale || 'en';
          u2.rate = 0.95;
          global.speechSynthesis.speak(u2);
        } catch (e) {}
      });
      meta.appendChild(say);
      /* recording state: operator/admin concern — teacher stories are TTS-first */
      if (POWER()) {
        var dot = el('span', 'stu-audiodot' + (S().audioHave[(S().storyLocale || 'en') + '/' + cue.id] ? ' stu-have' : ''),
          S().audioHave[(S().storyLocale || 'en') + '/' + cue.id] ? '● recorded' : '○ no recording yet (fine for testing)');
        meta.appendChild(dot);
      }
      /* animation-while-speaking: only when this line's speaker has clips */
      var speaker = (S().doc.story.cast || []).filter(function (c) { return c.id === cue.characterId; })[0];
      var speakerClips = Object.keys((speaker && speaker.clips) || {});
      if (speakerClips.length) {
        var asel = el('select', 'stu-cue-anim');
        var an = el('option'); an.value = ''; an.textContent = '🎬 no animation'; asel.appendChild(an);
        speakerClips.forEach(function (nm) { var o = el('option'); o.value = nm; o.textContent = '🎬 ' + nm; asel.appendChild(o); });
        asel.value = cue.clip || '';
        asel.title = 'Play this animation while ' + (global.Studio.str('cast.' + cue.characterId + '.name') || cue.characterId) + ' says this line';
        asel.addEventListener('change', function () {
          mutate('line animation', function (draft) {
            var c = draft.story.pages[pgIdx()].narration.cues[i];
            if (asel.value) c.clip = asel.value; else delete c.clip;
          });
        });
        meta.appendChild(asel);
      }
      var del = el('button', 'stu-x', '✕');
      del.addEventListener('click', function () {
        mutate('remove line', function (draft) {
          draft.story.pages[pgIdx()].narration.cues.splice(i, 1);
        });
      });
      meta.appendChild(del);
      row.appendChild(meta);
      box.appendChild(row);
    });
    var add = el('button', 'stu-btn', '+ Add a line');
    add.addEventListener('click', function () {
      mutate('add line', function (draft) {
        var dpg = draft.story.pages[pgIdx()];
        dpg.narration = dpg.narration || { gate: 'end', cues: [] };
        var key = global.Studio.allocKey(dpg.id + '-l');
        draft.strings[key] = { en: '' };
        var guide = (draft.story.cast.filter(function (c) { return c.role === 'guide'; })[0] || draft.story.cast[0]);
        dpg.narration.cues.push({ id: key, characterId: guide && guide.id });
      });
    });
    box.appendChild(add);
  }

  function labeledStringBox(label, currentKey, setKeyFn, preferredKey, disabled) {
    var wrap = el('div', 'stu-frow');
    wrap.appendChild(el('label', 'stu-flabel', label));
    var inp = el('input');
    inp.value = currentKey ? global.Studio.str(currentKey) : '';
    inp.disabled = !!disabled;
    if (disabled) inp.placeholder = 'Choose an activity first';
    inp.addEventListener('change', function () {
      mutate('edit ' + label, function (draft) {
        var key = currentKey || preferredKey;
        draft.strings[key] = draft.strings[key] || {};
        draft.strings[key][global.Studio.state.storyLocale || 'en'] = inp.value;
        setKeyFn(draft, key);
      });
    });
    wrap.appendChild(inp);
    return wrap;
  }

  /* ---- scene / cast pickers ---- */
  function setSceneFromSrc(src, slugSrc) {
    mutate('set picture', function (draft) {
      var slug = String(slugSrc || src).replace(/^.*[\/]/, '').replace(/@2x\.webp$/i, '').replace(/\.webp$/i, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      var id = 'scene.' + (slug || 'bg');
      draft.story.assets[id] = draft.story.assets[id] || { kind: 'image', src: src, size: { w: 1600, h: 1000 } };
      draft.story.pages[pgIdx()].scene = { image: id };
    });
  }
  function openScenePicker() {
    openDrawer(T('Pick the picture for this page', 'Bild für diese Seite auswählen'), function (body) {
      /* 1. the PLATFORM background library — the curated first choice */
      var bgHead = el('div', 'stu-note', T('Backgrounds:', 'Hintergründe:'));
      var bgGrid = el('div', 'stu-libgrid');
      body.appendChild(bgHead);
      body.appendChild(bgGrid);
      fetchLibraryManifest().then(function (man) {
        var bgs = man.backgrounds || [];
        if (!bgs.length) { bgHead.style.display = 'none'; return; }
        bgs.forEach(function (bg) {
          var c = el('button', 'stu-libcard stu-scenecard');
          var im = el('img'); im.loading = 'lazy'; im.src = bg.thumb || bg.src;
          c.appendChild(im);
          c.appendChild(el('div', 'stu-libname', libName(bg.name) || bg.id));
          c.addEventListener('click', function () { closeDrawer(); setSceneFromSrc(bg.src, bg.id); });
          bgGrid.appendChild(c);
        });
      }).catch(function () { bgHead.style.display = 'none'; });

      /* 2. the props/pictures library — a story background can be any library picture */
      var libBtn = el('button', 'stu-btn', '🖼️  Use a picture from the library');
      libBtn.addEventListener('click', function () {
        closeDrawer();
        openLibrary(function (src, vocabKey) { setSceneFromSrc(src, vocabKey || src); });
      });
      body.appendChild(libBtn);

      /* 3. upload my own (tenant: server cover-fits to 1600×1000) */
      if (global.Studio.tenant) {
        var upBtn = el('button', 'stu-btn', '⬆ Upload my own background');
        var upInp = el('input'); upInp.type = 'file'; upInp.accept = 'image/*'; upInp.style.display = 'none';
        upBtn.addEventListener('click', function () { upInp.click(); });
        upInp.addEventListener('change', function () {
          var file = upInp.files && upInp.files[0]; if (!file) return;
          upBtn.textContent = 'Uploading ' + file.name + '…';
          file.arrayBuffer().then(function (arrbuf) {
            return global.Studio.api('/studio/scenes/' + S().id,
              { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: arrbuf });
          }).then(function (j) {
            if (j.__status !== 200 || !j.src) { upBtn.textContent = '✗ ' + (j.error || 'upload failed'); return; }
            closeDrawer();
            setSceneFromSrc(j.src, j.file || 'upload');
          }).catch(function () { upBtn.textContent = '✗ upload failed'; });
        });
        body.appendChild(upBtn); body.appendChild(upInp);
      }

      body.appendChild(el('div', 'stu-note', 'or pick one of this story\'s own scene pictures:'));
      var grid = el('div', 'stu-libgrid');
      body.appendChild(grid);
      global.Studio.api('/studio/scenes/' + S().id).then(function (j) {
        (j.scenes || []).forEach(function (sc) {
          var c = el('button', 'stu-libcard stu-scenecard');
          var im = el('img'); im.src = sc.src;
          c.appendChild(im);
          c.appendChild(el('div', 'stu-libname', sc.file));
          c.addEventListener('click', function () { closeDrawer(); setSceneFromSrc(sc.src, sc.file); });
          grid.appendChild(c);
        });
        if (!(j.scenes || []).length) {
          grid.appendChild(el('div', 'stu-note', global.Studio.tenant
            ? 'No uploads yet — pick a background above, or upload your own.'
            : 'This story has no picture files yet — use the library button above, or drop 1600×1000 .webp files into its scenes folder.'));
          if (!global.Studio.tenant) {
            var open = el('button', 'stu-btn stu-btn-small', 'Open the scenes folder (Windows)');
            open.addEventListener('click', function () { global.Studio.api('/studio/reveal/' + S().id, { method: 'POST' }).catch(function () {}); });
            grid.appendChild(open);
          }
        }
      }).catch(function () {
        grid.appendChild(el('div', 'stu-empty', 'Couldn\'t reach the Studio server — is it running? (node scripts/storybook/studio-server.js)'));
      });
    }, true);
  }

  /* onPick(castDef) optional — when given (Change character), swap in place; else Add + place. */
  function openCastPicker(onPick) {
    /* a DOM Event may arrive here (when used directly as a click listener) — only a real
       function is a swap callback; otherwise this is the Add flow (place on the canvas). */
    var pick = (typeof onPick === 'function') ? onPick : null;
    openDrawer(pick ? T('Change to which character?', 'Zu welcher Figur wechseln?') : T('Add a character', 'Figur hinzufügen'), function (body) {
      /* the PLATFORM character library — ready-made, multi-pose, animated */
      var platHead = el('div', 'stu-note', T('Ready-made characters:', 'Fertige Figuren:'));
      var platRow = el('div', 'stu-cards');
      body.appendChild(platHead);
      body.appendChild(platRow);
      fetchLibraryManifest().then(function (man) {
        var chars = man.characters || [];
        if (!chars.length) { platHead.style.display = 'none'; return; }
        chars.forEach(function (c) {
          var card = el('button', 'stu-card');
          var im = el('img', 'stu-card-thumb'); im.loading = 'lazy'; im.src = c.card;
          card.appendChild(im);
          card.appendChild(el('div', 'stu-card-label', libName(c.name) || c.id));
          card.appendChild(el('div', 'stu-card-blurb', (c.poses || []).join(', ')));
          card.addEventListener('click', function () {
            closeDrawer();
            var def = { characterId: c.id, atlasBase: c.atlasBase, poses: c.poses,
              clips: c.clips, atlasClips: c.atlasClips, displayName: libName(c.name) };
            if (pick) pick(def); else addCharacterHere(def);
          });
          platRow.appendChild(card);
        });
      }).catch(function () { platHead.style.display = 'none'; });

      if (!pick) {
        /* upload YOUR OWN character — a single image (one pose); operator mode
           additionally accepts a TexturePacker sheet + .json (many poses). */
        var basic = !POWER();   /* teachers: single picture; operator/admin: + TexturePacker */
        var upBtn = el('button', 'stu-btn', basic
          ? '⬆ Upload my own character (a single picture)'
          : '⬆ Upload a character (image, or TexturePacker sheet + .json)');
        var upInp = el('input'); upInp.type = 'file';
        upInp.accept = basic ? 'image/*' : 'image/*,.json,application/json';
        upInp.multiple = !basic; upInp.style.display = 'none';
        var isImg = function (f) { return /^image\//.test(f.type) || /\.(png|jpe?g|webp|gif)$/i.test(f.name); };
        var isJson = function (f) { return f.type === 'application/json' || /\.json$/i.test(f.name); };
        var readText = function (f) { return new Promise(function (rs, rj) { var r = new FileReader(); r.onload = function () { rs(r.result); }; r.onerror = rj; r.readAsText(f); }); };
        var readB64 = function (f) { return new Promise(function (rs, rj) { var r = new FileReader(); r.onload = function () { rs(String(r.result).split(',')[1] || ''); }; r.onerror = rj; r.readAsDataURL(f); }); };
        var done = function (j) {
          if (!j || j.__status !== 200 || !j.characterId) { upBtn.textContent = '✗ ' + ((j && j.error) || 'upload failed'); return; }
          closeDrawer();
          addCharacterHere({ characterId: j.characterId, atlasBase: j.atlasBase, poses: j.poses || ['neutral'] });
        };
        var fail = function () { upBtn.textContent = '✗ couldn\'t reach the Studio server'; };
        upBtn.addEventListener('click', function () { upInp.click(); });
        upInp.addEventListener('change', function () {
          var files = [].slice.call(upInp.files || []);
          var img = files.filter(isImg)[0], jsn = basic ? null : files.filter(isJson)[0];
          if (!img && jsn) { upBtn.textContent = '✗ also select the sheet image (.webp/.png), not just the .json'; return; }
          if (!img) return;
          var nm = String(img.name || 'character').replace(/\.[^.]+$/, '').trim() || 'character';
          if (jsn) {
            /* TexturePacker sheet: image + atlas .json → a multi-pose character */
            upBtn.textContent = 'Uploading ' + img.name + ' + ' + jsn.name + '…';
            Promise.all([readB64(img), readText(jsn)]).then(function (r) {
              var atlas; try { atlas = JSON.parse(r[1]); } catch (e) { upBtn.textContent = '✗ that .json is not valid JSON'; return null; }
              return global.Studio.api('/studio/import-character-sheet/' + S().id, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nm, atlas: atlas, imageBase64: r[0], imageExt: (String(img.name).split('.').pop() || '').toLowerCase() }) });
            }).then(function (j) { if (j) done(j); }).catch(fail);
          } else {
            /* single image → a one-pose character (Studio.api: tenant mapping + Bearer) */
            upBtn.textContent = 'Uploading ' + img.name + '…';
            img.arrayBuffer().then(function (arrbuf) {
              return global.Studio.api('/studio/import-character/' + S().id + '?name=' + encodeURIComponent(nm),
                { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: arrbuf });
            }).then(done).catch(fail);
          }
        });
        body.appendChild(upBtn); body.appendChild(upInp);
        body.appendChild(el('div', 'stu-note', basic
          ? 'Your picture becomes a character with one pose — great for a class mascot or a photo cut-out.'
          : 'Tip: for many poses/emotions, select BOTH the TexturePacker sheet image and its .json. Or tap a ready-made character below.'));
      }
      global.Studio.api('/studio/cast').then(function (j) {
        if ((j.cast || []).length) {
          body.appendChild(el('div', 'stu-note', global.Studio.tenant
            ? 'This story\'s own characters:' : 'Characters from your stories:'));
        }
        var row = el('div', 'stu-cards');
        (j.cast || []).forEach(function (c) {
          var card = el('button', 'stu-card');
          card.appendChild(el('div', 'stu-card-label', c.characterId));
          card.appendChild(el('div', 'stu-card-blurb', c.poses.join(', ')));
          global.StudioCanvas.FrameCache.load(c.atlasBase).then(function (frames) {
            var f = frames.frames['pose_neutral'] || frames.frames[Object.keys(frames.frames)[0]];
            if (f) { var im = el('img', 'stu-card-thumb'); im.src = f.dataURL; card.insertBefore(im, card.firstChild); }
          }).catch(function () {});
          card.addEventListener('click', function () {
            closeDrawer();
            if (pick) pick(c); else addCharacterHere(c);
          });
          row.appendChild(card);
        });
        if (!pick) body.appendChild(el('div', 'stu-note', 'Tap a character — they appear on the picture right away; then drag them where you want.'));
        body.appendChild(row);
      }).catch(function () {
        body.appendChild(el('div', 'stu-empty', 'Couldn\'t reach the Studio server — is it running? (node scripts/storybook/studio-server.js)'));
      });
    });
  }

  /* record a character's animation clips onto its cast entry (from the picker OR a later
     clips upload) — atlasClips asset + a clips map { <name>: { fallbackPose } } as the
     runtime + validate-story.js expect. fallbackPose is a real declared pose. */
  function applyCastClips(draft, entry, cid, atlasClipsUrl, clipNames, poses) {
    if (!entry || !atlasClipsUrl || !(clipNames || []).length) return;
    var clipsAssetId = 'atlas.' + cid + '.clips';
    draft.story.assets[clipsAssetId] = { kind: 'atlas', src: atlasClipsUrl };
    entry.atlasClips = clipsAssetId;
    var fallback = (poses && poses[0]) || (entry.poses && entry.poses[0]) || 'neutral';
    entry.clips = entry.clips || {};
    clipNames.forEach(function (nm) { entry.clips[nm] = entry.clips[nm] || { fallbackPose: fallback }; });
  }

  /* ensure a story has a cast entry + atlas asset for a picked character (mirrors the Add flow) */
  function ensureCastEntry(draft, castDef) {
    var cid = castDef.characterId;
    var entry = (draft.story.cast || []).filter(function (c) { return c.id === cid; })[0];
    if (!entry) {
      var atlasId = 'atlas.' + cid + '.base';
      draft.story.assets[atlasId] = draft.story.assets[atlasId] || { kind: 'atlas', src: castDef.atlasBase };
      draft.story.cast = draft.story.cast || [];
      entry = { id: cid, name: '@cast.' + cid + '.name',
        role: (draft.story.cast.length ? 'companion' : 'guide'), atlasBase: atlasId, poses: castDef.poses };
      draft.story.cast.push(entry);
      if (!draft.strings['cast.' + cid + '.name']) {
        var nameStr = {};
        nameStr[global.Studio.state.storyLocale || 'en'] =
          castDef.displayName || (cid.charAt(0).toUpperCase() + cid.slice(1));
        draft.strings['cast.' + cid + '.name'] = nameStr;
      }
    }
    /* carry clips through if the picked castDef already has them */
    if (castDef.atlasClips && (castDef.clips || []).length) applyCastClips(draft, entry, cid, castDef.atlasClips, castDef.clips, castDef.poses || entry.poses);
    return cid;
  }

  /* Add flow — place the picked character immediately (no hidden "click the canvas" step);
     it lands centre-bottom, offset per existing count, and is selected so it can be dragged. */
  function addCharacterHere(castDef) {
    mutate('add character', function (draft) {
      ensureCastEntry(draft, castDef);
      var dpg = draft.story.pages[pgIdx()];
      dpg.characters = dpg.characters || [];
      var n = dpg.characters.length;
      dpg.characters.push({
        characterId: castDef.characterId,
        pose: (castDef.poses && castDef.poses[0]) || 'neutral',
        anchor: { x: Math.min(1400, 500 + n * 120), y: 880 }, scale: 1, flip: false
      });
    });
    var pg = pageObj();
    if (pg && pg.characters) global.StudioCanvas.select({ kind: 'character', index: pg.characters.length - 1 });
  }

  function openLedger() {
    openDrawer('Unused text', function (body) {
      global.Studio.unusedKeys().forEach(function (k) {
        var row = el('div', 'stu-cue');
        row.appendChild(el('code', null, k));
        row.appendChild(el('span', 'stu-note', ' “' + (global.Studio.str(k) || '') + '”'));
        var del = el('button', 'stu-x', 'remove');
        del.addEventListener('click', function () {
          mutate('remove unused text', function (draft) { delete draft.strings[k]; });
          closeDrawer(); openLedger();
        });
        row.appendChild(del);
        body.appendChild(row);
      });
    });
  }

  /* ---- pages ---- */
  function duplicatePage() {
    mutate('duplicate page', function (draft) {
      var src = draft.story.pages[pgIdx()];
      var ids = draft.story.pages.map(function (x) { return x.id; });
      var n = draft.story.pages.length + 1;
      var id = 'p' + (n < 10 ? '0' + n : n);
      while (ids.indexOf(id) >= 0) { n++; id = 'p' + (n < 10 ? '0' + n : n); }
      draft.story.pages.splice(pgIdx() + 1, 0, {
        id: id,
        scene: global.Studio.clone(src.scene),
        characters: global.Studio.clone(src.characters || []),
        narration: { gate: 'end', cues: [] },
        interaction: null,
        success: { celebration: 'burst', holdMs: 1000 }
      });
    });
    S().pageIndex = pgIdx() + 1;
    global.StudioCanvas.select(null);
  }

  function deletePageConfirm() {
    var pg = pageObj();
    var lines = ((pg.narration && pg.narration.cues) || []).length;
    var msg = 'Remove page ' + (pgIdx() + 1) + '?' +
      (lines ? ' Its ' + lines + ' story line(s) move to “unused text”.' : '') +
      ' Any recordings stay on disk. You can undo this.';
    if (!confirm(msg)) return;
    mutate('remove page', function (draft) {
      if (draft.story.pages.length <= 1) { alert('A story needs at least one page.'); return false; }
      draft.story.pages.splice(pgIdx(), 1);
    });
    S().pageIndex = Math.max(0, pgIdx() - 1);
    global.StudioCanvas.select(null);
  }

  function renderRail() {
    var r = refs.rail;
    r.innerHTML = '';
    var tog = el('button', 'stu-rail-toggle', UI.rail ? '«' : '»');
    tog.title = UI.rail ? T('Collapse the page strip', 'Seitenleiste einklappen')
                        : T('Show the page strip', 'Seitenleiste anzeigen');
    tog.addEventListener('click', function () { setShell({ rail: !UI.rail }); });
    r.appendChild(tog);
    var story = S().doc.story;
    story.pages.forEach(function (pg, i) {
      var t = el('button', 'stu-thumb' + (i === pgIdx() ? ' stu-on' : ''));
      var sceneAsset = pg.scene && pg.scene.image && story.assets[pg.scene.image];
      if (sceneAsset) { var im = el('img'); im.src = sceneAsset.src; t.appendChild(im); }
      t.appendChild(el('div', 'stu-thumb-n', String(i + 1)));
      if (!pg.interaction) t.appendChild(el('div', 'stu-thumb-badge', 'no activity'));
      t.addEventListener('click', function () {
        S().pageIndex = i;
        global.StudioCanvas.select(null);
      });
      if (i > 0) {
        var up = el('button', 'stu-thumb-move', '↑');
        up.addEventListener('click', function (ev) {
          ev.stopPropagation();
          mutate('reorder pages', function (draft) {
            var arr = draft.story.pages;
            var x = arr.splice(i, 1)[0];
            arr.splice(i - 1, 0, x);
          });
          S().pageIndex = i - 1;
        });
        t.appendChild(up);
      }
      r.appendChild(t);
    });
    var add = el('button', 'stu-thumb stu-thumb-add', '+');
    add.title = 'Add a page';
    add.addEventListener('click', function () { S().pageIndex = story.pages.length - 1; duplicatePage(); });
    r.appendChild(add);
  }

  /* ---- topbar + validate + preview ---- */
  function saveStateText() {
    var st = S().saveState;
    return st === 'saving' ? T('Saving…', 'Wird gespeichert…')
      : st === 'saved' ? T('All changes saved', 'Alles gespeichert') + (S().savedAt ? ' · ' + S().savedAt.toLocaleTimeString().slice(0, 5) : '')
      : st === 'conflict' ? (TEACHER
          ? '⚠ ' + T('This story was edited somewhere else — reload to see the latest.', 'Diese Geschichte wurde woanders bearbeitet — bitte neu laden.')
          : '⚠ This story also changed on disk — reload to get the latest version before editing more')
      : st === 'error' ? (TEACHER
          ? '⚠ ' + T('Could not save — check your connection.', 'Speichern fehlgeschlagen — bitte Verbindung prüfen.')
          : '⚠ Could not save — is the Studio server running?')
      : '';
  }
  function makeSaveState() {
    var st = S().saveState;
    var save = el('span', 'stu-savestate');
    var dot = el('span', 'stu-savedot');
    if (st === 'saving') dot.classList.add('stu-dot-saving');
    if (st === 'conflict' || st === 'error') dot.classList.add('stu-dot-bad');
    save.appendChild(dot);
    var txt = el('span', 'stu-savetext', saveStateText());
    save.appendChild(txt);
    save.title = saveStateText();
    if (st === 'conflict' || st === 'error') save.classList.add('stu-savebad');
    return save;
  }
  function goMyStories() {
    if (TEACHER) {
      /* the Next wrapper owns navigation (full-viewport iframe) */
      try { global.parent.postMessage({ type: 'lcs-studio-nav', target: 'stories' }, location.origin); } catch (e) {}
      return;
    }
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
    launcher();
  }
  function renderTopbar() {
    var t = refs.topbar;
    t.innerHTML = '';

    /* a failed/conflicted save must never be hidden behind a collapsed bar */
    var st = S().saveState;
    if ((st === 'conflict' || st === 'error') && !UI.top) {
      UI.top = true;
      syncShellClasses();
    }

    var back = el('button', 'stu-tb-back', '← ' + T('My stories', 'Meine Geschichten'));
    back.addEventListener('click', goMyStories);
    t.appendChild(back);

    var title = el('input', 'stu-title');
    title.value = global.Studio.str('story.title') || S().id;
    title.addEventListener('change', function () { global.Studio.setStr('story.title', title.value); });
    t.appendChild(title);

    var undo = el('button', 'stu-btn', '↶ Undo');
    undo.disabled = !S().undoStack.length;
    undo.addEventListener('click', global.Studio.undo);
    t.appendChild(undo);
    var redo = el('button', 'stu-btn', '↷ Redo');
    redo.disabled = !S().redoStack.length;
    redo.addEventListener('click', global.Studio.redo);
    t.appendChild(redo);

    t.appendChild(el('span', 'stu-tb-spacer'));
    t.appendChild(makeSaveState());

    var prev = el('button', 'stu-btn stu-btn-primary',
      TEACHER ? '▶ ' + T('Preview as a student', 'Aus Schülersicht ansehen') : '▶ Try it');
    prev.addEventListener('click', openPreview);
    t.appendChild(prev);
    var check = el('button', 'stu-btn stu-tb-wide', '✔ ' + T('Check my story', 'Geschichte prüfen'));
    check.addEventListener('click', runCheck);
    t.appendChild(check);
    if (TEACHER) {
      var share = el('button', 'stu-btn stu-tb-wide', '🔗 ' + T('Share with your class', 'Mit der Klasse teilen'));
      share.addEventListener('click', openShare);
      t.appendChild(share);
    }

    /* narrow viewports: the same actions live behind ⋯ (both sets always in
       the DOM; a media query decides which set is visible) */
    var over = el('span', 'stu-tb-over');
    var dots = el('button', 'stu-btn', '⋯');
    dots.title = T('More actions', 'Weitere Aktionen');
    var pop = el('div', 'stu-tb-pop');
    var check2 = el('button', 'stu-btn', '✔ ' + T('Check my story', 'Geschichte prüfen'));
    check2.addEventListener('click', function () { pop.classList.remove('stu-open'); runCheck(); });
    pop.appendChild(check2);
    if (TEACHER) {
      var share2 = el('button', 'stu-btn', '🔗 ' + T('Share with your class', 'Mit der Klasse teilen'));
      share2.addEventListener('click', function () { pop.classList.remove('stu-open'); openShare(); });
      pop.appendChild(share2);
    }
    dots.addEventListener('click', function () { pop.classList.toggle('stu-open'); });
    over.appendChild(dots); over.appendChild(pop);
    t.appendChild(over);

    var collapse = el('button', 'stu-collapse', '∧');
    collapse.title = T('Hide the toolbar', 'Werkzeugleiste ausblenden');
    collapse.addEventListener('click', function () { setShell({ top: false }); });
    t.appendChild(collapse);
  }

  function openPreview() {
    global.Studio.saveNow();
    openDrawer(TEACHER ? T('Preview — exactly what your students see', 'Vorschau — genau das sehen Ihre Schüler') : 'Try it — the real player', function (body) {
      var bar = el('div', 'stu-libbar');
      var widths = [[T('Phone', 'Handy'), 700], ['Tablet', 900], [T('Big', 'Groß'), 1180]];
      var iframe = el('iframe', 'stu-preview');
      var makeSrc = function () {
        /* tenant mode: the player reads the story through its preview play
           link (?src=), not the static /mini-tools/stories/ tree */
        var ident = (global.Studio.tenant && S().previewLinkId)
          ? '?src=' + encodeURIComponent('/api/play/' + S().previewLinkId + '/')
          : '?story=' + S().id;
        return '/mini-tools/storybook.html' + ident +
          '&lang=' + (S().storyLocale || 'en') +
          '&embed=1&debug=1&sound=off&page=' + (pgIdx() + 1) + '&r=' + Date.now();
      };
      widths.forEach(function (wdef) {
        var b = el('button', 'stu-btn stu-btn-small', wdef[0]);
        b.addEventListener('click', function () { iframe.style.width = wdef[1] + 'px'; });
        bar.appendChild(b);
      });
      var fromStart = el('button', 'stu-btn stu-btn-small', T('From the start', 'Von Anfang an'));
      fromStart.addEventListener('click', function () {
        iframe.src = makeSrc().replace(/&page=\d+/, '&page=1');
      });
      bar.appendChild(fromStart);
      body.appendChild(bar);
      iframe.src = makeSrc();
      iframe.style.width = '900px';
      body.appendChild(iframe);
      /* Studio.on has no off(): listeners from every drawer open stay
         registered forever. Guard on THIS iframe still being in the DOM so
         stale listeners are no-ops (a detached iframe getting a new src
         still fetches — that was a phantom request storm on every save). */
      var onSaved = function (ev) { if (ev === 'saved' && iframe.isConnected) iframe.src = makeSrc(); };
      global.Studio.on(onSaved);
    }, true);
  }

  /* validator ERROR → teacher language. The raw message survives as the
     fallback (it is already fairly readable); page ids become page numbers. */
  function friendlyError(msg) {
    var out = String(msg);
    var pm = out.match(/^page ([a-z0-9-]+): ?/);
    var pageNo = null;
    if (pm) {
      var idx = S().doc.story.pages.findIndex(function (p) { return p.id === pm[1]; });
      if (idx >= 0) pageNo = idx + 1;
      out = out.slice(pm[0].length);
    }
    var MAP = [
      [/SEP too dense/i, T('The worksheet is too crowded — make its box bigger, or design it with fewer problems.',
        'Das Arbeitsblatt ist zu voll – machen Sie den Bereich größer oder wählen Sie weniger Aufgaben.')],
      [/zone .* < .* minZone/i, T('The activity box is too small — drag its corner to make it bigger.',
        'Der Aufgabenbereich ist zu klein – ziehen Sie an der Ecke, um ihn zu vergrößern.')],
      [/strings\.json missing key|missing locale/i, T('Some words are missing — check the text boxes on this page.',
        'Hier fehlt noch Text – prüfen Sie die Textfelder auf dieser Seite.')],
      [/scene\.image or scene\.layers required/i, T('This page needs a picture.', 'Diese Seite braucht noch ein Bild.')],
      [/no slots|has no (cells|columns|choices|paths)|needs >= 2/i, T('The activity is empty — open it and finish setting it up.',
        'Die Aufgabe ist leer – bitte öffnen und fertig einrichten.')],
      [/SEP (descriptor|visual) missing/i, T('The worksheet activity is broken — replace it from a worksheet maker.',
        'Die Arbeitsblatt-Aufgabe ist beschädigt – bitte neu aus einem Generator einfügen.')],
      [/anchor out of bounds|outside the .* design space/i, T('Something is placed outside the page — drag it back in.',
        'Etwas liegt außerhalb der Seite – ziehen Sie es zurück auf die Seite.')]
    ];
    for (var i = 0; i < MAP.length; i++) {
      if (MAP[i][0].test(out)) { out = MAP[i][1]; break; }
    }
    return (pageNo ? T('Page ', 'Seite ') + pageNo + ' — ' : '') + out;
  }

  function runCheck() {
    global.Studio.saveNow();
    setTimeout(function () {
      openDrawer(T('Checking your story…', 'Ihre Geschichte wird geprüft…'), function (body) {
        body.appendChild(el('div', 'stu-note', T('One moment…', 'Einen Moment…')));
        global.Studio.api('/studio/validate/' + S().id, { method: 'POST' }).then(function (j) {
          body.innerHTML = '';
          if (j.ok) {
            var ok = el('div', 'stu-ready');
            ok.appendChild(el('h3', null, '✓ ' + T('Ready!', 'Fertig!')));
            ok.appendChild(el('p', null, TEACHER
              ? T('Your story is saved and checked — it is ready to share with your class.',
                  'Ihre Geschichte ist gespeichert und geprüft — bereit zum Teilen mit Ihrer Klasse.')
              : 'Your story is saved and checked. It lives in its story folder — nothing else to export.'));
            if (POWER()) ok.appendChild(el('p', 'stu-note', 'Next (for the tech side): node scripts/storybook/qa-storybook.js --story=' + S().id));
            body.appendChild(ok);
          } else {
            var en1 = j.errors.length;
            body.appendChild(el('h3', null, TEACHER
              ? (en1 === 1 ? T('Almost ready — 1 thing to fix', 'Fast fertig – noch 1 Punkt')
                           : T('Almost ready — ' + en1 + ' things to fix', 'Fast fertig – noch ' + en1 + ' Punkte'))
              : en1 + ' thing(s) to fix'));
            j.errors.forEach(function (e2) {
              var card = el('div', 'stu-vcard');
              card.appendChild(el('div', null, TEACHER ? friendlyError(e2) : e2));
              var m = e2.match(/page ([a-z0-9-]+):/);
              if (m) {
                var go = el('button', 'stu-btn stu-btn-small', T('Show me', 'Zeigen'));
                go.addEventListener('click', function () {
                  var i = S().doc.story.pages.findIndex(function (p) { return p.id === m[1]; });
                  if (i >= 0) { S().pageIndex = i; closeDrawer(); global.StudioCanvas.select(null); }
                });
                card.appendChild(go);
              }
              body.appendChild(card);
            });
          }
          if (j.warns && j.warns.length) {
            var det = el('details');
            var wn = j.warns.length;
            det.appendChild(el('summary', null, TEACHER
              ? (wn === 1 ? T('1 small note — fine to share', '1 kleiner Hinweis – Teilen ist trotzdem möglich')
                          : T(wn + ' small notes — fine to share', wn + ' kleine Hinweise – Teilen ist trotzdem möglich'))
              : wn + ' small note(s) — fine to ship'));
            j.warns.forEach(function (w) { det.appendChild(el('div', 'stu-note', w)); });
            body.appendChild(det);
          }
        }).catch(function () {
          body.innerHTML = '';
          body.appendChild(el('div', 'stu-empty', 'Couldn\'t reach the Studio server to check — is it running? (node scripts/storybook/studio-server.js)'));
        });
      }, true);
    }, 1000);
  }

  /* ---- share with your class (teacher mode) ----
     Private-by-default: one live class link per story. Creating/rotating is
     server-gated on the story validating clean — sharing a broken story is
     impossible; the 409 brings back the teacher-language fix list. */
  function openShare() {
    global.Studio.saveNow();
    openDrawer(T('Share with your class', 'Mit der Klasse teilen'), function (body) {
      var box = el('div');
      body.appendChild(box);

      function linkUrl(share) { return location.origin + share.path; }

      function renderState(share) {
        box.innerHTML = '';
        if (!share) {
          box.appendChild(el('p', 'stu-note', T(
            'Your story gets one private link. Anyone with the link can play it — no accounts, on any device. Students always see your latest saved version.',
            'Ihre Geschichte bekommt einen privaten Link. Jeder mit dem Link kann sie spielen — ohne Konto, auf jedem Gerät. Ihre Schüler sehen immer die zuletzt gespeicherte Version.')));
          var make = el('button', 'stu-btn stu-btn-primary', T('Create the class link', 'Klassen-Link erstellen'));
          make.addEventListener('click', function () { createOrRotate(); });
          box.appendChild(make);
          return;
        }
        box.appendChild(el('p', 'stu-note', T('Your class link:', 'Ihr Klassen-Link:')));
        var urlRow = el('div', 'stu-sharerow');
        var inp = el('input');
        inp.value = linkUrl(share);
        inp.readOnly = true;
        inp.addEventListener('focus', function () { inp.select(); });
        var copy = el('button', 'stu-btn stu-btn-primary', T('Copy', 'Kopieren'));
        copy.addEventListener('click', function () {
          try { navigator.clipboard.writeText(inp.value); copy.textContent = '✓ ' + T('Copied', 'Kopiert'); }
          catch (e) { inp.select(); document.execCommand('copy'); copy.textContent = '✓ ' + T('Copied', 'Kopiert'); }
        });
        urlRow.appendChild(inp); urlRow.appendChild(copy);
        box.appendChild(urlRow);

        /* QR — students scan it from the board or a printed poster */
        var qrWrap = el('div', 'stu-qrwrap');
        var qr = el('img', 'stu-qr');
        qr.alt = 'QR';
        qr.src = '/api/play/' + share.linkId + '/qr.png';
        qrWrap.appendChild(qr);
        var poster = el('button', 'stu-btn stu-btn-small', '🖨 ' + T('Print QR poster', 'QR-Poster drucken'));
        poster.addEventListener('click', function () {
          var title = global.Studio.str(String(S().doc.story.title || '').replace(/^@/, '')) || '';
          var w = window.open('', '_blank');
          if (!w) return;
          w.document.write(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
            title.replace(/</g, '&lt;') + '</title>' +
            '<style>body{font-family:"Nunito","Segoe UI",sans-serif;background:#FBF3E4;margin:0;' +
            'display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center}' +
            'h1{color:#146B5E;font-size:44px;margin:0 0 12px;padding:0 40px}' +
            'p{color:#6b6154;font-size:20px;margin:6px 0}' +
            'img{width:420px;height:420px;margin:26px 0;background:#fff;padding:18px;border-radius:24px}' +
            'code{font-size:17px;color:#146B5E;word-break:break-all;padding:0 40px}' +
            '@media print{body{background:#fff}}</style></head><body>' +
            '<h1>' + title.replace(/</g, '&lt;') + '</h1>' +
            '<p>' + T('Scan to play our story!', 'Scannen und unsere Geschichte spielen!') + '</p>' +
            '<img src="' + location.origin + '/api/play/' + share.linkId + '/qr.png">' +
            '<code>' + linkUrl(share) + '</code>' +
            '</body></html>');
          w.document.close();
          var img = w.document.querySelector('img');
          var doPrint = function () { try { w.focus(); w.print(); } catch (e) {} };
          if (img && !img.complete) img.onload = doPrint; else setTimeout(doPrint, 300);
        });
        qrWrap.appendChild(poster);
        box.appendChild(qrWrap);

        box.appendChild(el('p', 'stu-note', T(
          'Tip: project it, put it on the class blog, or send it home.',
          'Tipp: an die Tafel projizieren, in den Klassenblog stellen oder mit nach Hause geben.')));
        var row = el('div', 'stu-sharerow');
        var rotate = el('button', 'stu-btn stu-btn-small', T('Get a new link', 'Neuen Link erstellen'));
        rotate.addEventListener('click', function () { createOrRotate(); });
        var stop = el('button', 'stu-btn stu-btn-small stu-btn-danger', T('Stop sharing', 'Nicht mehr teilen'));
        stop.addEventListener('click', function () {
          global.Studio.api('/studio/share/' + S().id, { method: 'DELETE' }).then(function () { renderState(null); });
        });
        row.appendChild(rotate); row.appendChild(stop);
        box.appendChild(row);
      }

      function createOrRotate() {
        box.innerHTML = '';
        box.appendChild(el('div', 'stu-note', T('Checking your story first…', 'Ihre Geschichte wird zuerst geprüft…')));
        global.Studio.api('/studio/share/' + S().id, { method: 'POST' }).then(function (j) {
          if (j.__status === 409 && j.errors) {
            box.innerHTML = '';
            var en2 = j.errors.length;
            box.appendChild(el('h3', null, en2 === 1
              ? T('Almost ready — 1 thing to fix first', 'Fast fertig – vorher noch 1 Punkt')
              : T('Almost ready — ' + en2 + ' things to fix first', 'Fast fertig – vorher noch ' + en2 + ' Punkte')));
            j.errors.forEach(function (e2) {
              var card = el('div', 'stu-vcard');
              card.appendChild(el('div', null, friendlyError(e2)));
              var m = String(e2).match(/page ([a-z0-9-]+):/);
              if (m) {
                var go = el('button', 'stu-btn stu-btn-small', T('Show me', 'Zeigen'));
                go.addEventListener('click', function () {
                  var i = S().doc.story.pages.findIndex(function (p) { return p.id === m[1]; });
                  if (i >= 0) { S().pageIndex = i; closeDrawer(); global.StudioCanvas.select(null); }
                });
                card.appendChild(go);
              }
              box.appendChild(card);
            });
            return;
          }
          if (j.__status !== 200 || !j.share) {
            box.innerHTML = '';
            box.appendChild(el('div', 'stu-empty', T('Sharing did not go through — please try again.',
              'Das Teilen hat nicht geklappt — bitte erneut versuchen.')));
            return;
          }
          renderState(j.share);
        });
      }

      box.appendChild(el('div', 'stu-note', T('One moment…', 'Einen Moment…')));
      global.Studio.api('/studio/share/' + S().id).then(function (j) {
        renderState(j.share || null);
      }).catch(function () {
        box.innerHTML = '';
        box.appendChild(el('div', 'stu-empty', T('Could not load the sharing state — please try again.',
          'Der Freigabestatus konnte nicht geladen werden – bitte erneut versuchen.')));
      });
    }, true);
  }

  /* ---- launcher ---- */
  function launcher() {
    refs.panel.innerHTML = '';
    refs.rail.innerHTML = '';
    refs.topbar.innerHTML = '';
    var host = refs.canvasHost;
    host.innerHTML = '';
    var box = el('div', 'stu-launcher');
    box.appendChild(el('h1', null, 'Storybook Studio'));
    var cards = el('div', 'stu-cards');
    global.Studio.api('/studio/stories').then(function (j) {
      (j.stories || []).forEach(function (st) {
        var c = el('button', 'stu-card');
        if (st.firstScene) { var im = el('img', 'stu-card-thumb'); im.src = st.firstScene; c.appendChild(im); }
        c.appendChild(el('div', 'stu-card-label', st.title));
        c.appendChild(el('div', 'stu-card-blurb', st.pages + ' page(s)'));
        c.addEventListener('click', function () { openStory(st.id); });
        cards.appendChild(c);
      });
      var nw = el('button', 'stu-card stu-card-new', '+ New story');
      nw.addEventListener('click', newStoryDialog);
      cards.appendChild(nw);
    }).catch(function () {
      cards.appendChild(el('div', 'stu-empty', 'Couldn\'t reach the Studio server — start it with: node scripts/storybook/studio-server.js'));
    });
    box.appendChild(cards);
    host.appendChild(box);
  }

  function newStoryDialog() {
    var title = prompt('What is the story called?');
    if (!title) return;
    var id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    global.Studio.api('/studio/scaffold', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, title: title })
    }).then(function (j) {
      if (j.__status === 409) { alert('That name is taken — try another.'); return; }
      if (j.__status !== 200) { alert(j.error || 'Could not create'); return; }
      openStory(id);
    }).catch(function () { alert('Couldn\'t reach the Studio server — is it running?'); });
  }

  function openStory(id) {
    refs.canvasHost.innerHTML = '';
    global.StudioCanvas.mount(refs.canvasHost);
    global.Studio.load(id).then(function () {
      /* keep &mode=teacher — a refresh must stay in tenant mode */
      history.replaceState(null, '', '?story=' + id + (TEACHER ? '&mode=teacher' : ''));
    }).catch(function (e) {
      alert(TEACHER
        ? T('Could not open this story — please refresh the page.', 'Die Geschichte konnte nicht geöffnet werden — bitte Seite neu laden.')
        : 'Could not open: ' + e.message);
    });
  }

  /* ---- boot ---- */
  function mount(r) {
    refs = r;
    loadUI();
    syncShellClasses();
    doc.addEventListener('keydown', function (ev) {
      var tag = (doc.activeElement && doc.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if ((ev.ctrlKey || ev.metaKey) && ev.key === '\\') {
        ev.preventDefault();
        toggleFocus();
        renderShellChrome();
      }
    });
    global.Studio.on(function (ev) {
      if (ev === 'change' || ev === 'loaded' || ev === 'savestate' || ev === 'audio') render();
    });
    /* server check (local studio-server / the authenticated tenant API) */
    global.Studio.api('/studio/ping').then(function (j) {
      if (!j || !j.studio) throw new Error();
      if (global.Studio.setAdmin) global.Studio.setAdmin(!!j.isAdmin);
      var q = new URLSearchParams(location.search);
      var sid = q.get('story');
      if (sid) openStory(sid); else launcher();
    }).catch(function () {
      refs.banner.textContent = TEACHER
        ? T('The Studio could not connect. Please refresh the page — if it keeps happening, sign in again.',
            'Das Studio konnte keine Verbindung herstellen. Bitte laden Sie die Seite neu – wenn das Problem weiterhin auftritt, melden Sie sich bitte erneut an.')
        : 'This is the Storybook Studio — it runs on your computer. Open a terminal and run:  node scripts/storybook/studio-server.js   then open the address it prints.';
      refs.banner.style.display = 'block';
    });
  }

  global.StudioInspector = { mount: mount, render: render, openLibrary: openLibrary, launcher: launcher,
    setShell: setShell, toggleFocus: toggleFocus };
}(typeof window !== 'undefined' ? window : this));
