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

  /* ================= library picker ================= */
  var _lib = null;
  function openLibrary(onPick) {
    openDrawer('Pick a picture', function (body) {
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
          return fetch('/studio/import-image/' + S().id, { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: arrbuf })
            .then(function (r) { return r.json().then(function (j) { j.__status = r.status; return j; }); });
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
      else global.Studio.api('/studio/library').then(function (j) { _lib = j; boot(); })
        .catch(function () { body.appendChild(el('div', 'stu-empty', 'Couldn\'t reach the Studio server — is it running? (node scripts/storybook/studio-server.js)')); });
    }, true);
  }
  function vocabWord(key) {
    try {
      var v = global.IMAGE_VOCABULARY || (global.ImageVocab && global.ImageVocab.DATA);
      var e = v && v[key];
      return e && e.en && e.en[0];
    } catch (e) { return null; }
  }

  /* ================= form engine ================= */
  /* Renders meta.studio.fields for taskData; commits via one mutate per change. */
  function renderFields(host, fields, getObj, commit, opts) {
    fields.forEach(function (f) {
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
            draft.strings[key].en = text;
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
      if (!draft.strings[kk].en) draft.strings[kk].en = word;
    }
  }

  function allocPageKey(hint, opts) {
    var pgId = pageObj().id;
    return global.Studio.allocKey(pgId + '.' + hint + '.');
  }

  /* ================= mechanic picker + form host ================= */
  function openMechanicPicker() {
    openDrawer('Choose an activity', function (body) {
      var groups = {};
      global.SBModules.types().forEach(function (t) {
        var m = global.SBModules.get(t).meta;
        var stu = m.studio || { label: t, blurb: '(no form yet — JSON editing)', group: 'Other', icon: '⬜' };
        (groups[stu.group] = groups[stu.group] || []).push({ type: t, meta: m, stu: stu });
      });
      Object.keys(groups).sort().forEach(function (g) {
        body.appendChild(el('h3', 'stu-h3', g));
        var row = el('div', 'stu-cards');
        groups[g].forEach(function (entry) {
          var c = el('button', 'stu-card');
          c.appendChild(el('div', 'stu-card-icon', entry.stu.icon || '⬜'));
          c.appendChild(el('div', 'stu-card-label', entry.stu.label));
          c.appendChild(el('div', 'stu-card-blurb', entry.stu.blurb));
          c.appendChild(el('div', 'stu-card-min', 'needs space: ' + entry.meta.minZone.w + '×' + entry.meta.minZone.h));
          c.addEventListener('click', function () {
            closeDrawer();
            applyMechanic(entry.type);
          });
          row.appendChild(c);
        });
        body.appendChild(row);
      });
    }, true);
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

  /* ================= inspector panel ================= */
  function render() {
    if (!refs.panel || !S().doc) return;
    renderRail();
    renderTopbar();
    var p = refs.panel;
    p.innerHTML = '';
    var sel = S().selection;
    var pg = pageObj();
    if (!pg) return;

    if (sel && sel.kind === 'character') { renderCharPanel(p, sel); return; }
    if (sel && (sel.kind === 'drawable' || sel.kind === 'point')) { renderDrawablePanel(p, sel); return; }

    /* -------- page panel -------- */
    p.appendChild(el('h2', 'stu-h2', 'Page ' + (pgIdx() + 1)));
    p.appendChild(checklist(pg));

    /* picture */
    section(p, 'Picture', function (box) {
      var btn = el('button', 'stu-btn', pg.scene && pg.scene.image ? 'Change the picture' : 'Pick a picture');
      btn.addEventListener('click', openScenePicker);
      box.appendChild(btn);
    });

    /* characters */
    section(p, 'Characters', function (box) {
      (pg.characters || []).forEach(function (pl, i) {
        var chip = el('button', 'stu-chip stu-chip-btn', pl.characterId + ' · ' + pl.pose);
        chip.addEventListener('click', function () { global.StudioCanvas.select({ kind: 'character', index: i }); });
        box.appendChild(chip);
      });
      var add = el('button', 'stu-btn', '+ Add a character');
      add.addEventListener('click', function () { openCastPicker(); });
      box.appendChild(add);
    });

    /* activity */
    section(p, 'Activity', function (box) {
      if (!pg.interaction) {
        var b = el('button', 'stu-btn stu-btn-primary', 'Choose an activity');
        b.addEventListener('click', openMechanicPicker);
        box.appendChild(b);
        return;
      }
      renderMechanicForm(box, pg.interaction);
    });

    /* story lines */
    section(p, 'Story lines (what ' + guideName() + ' says)', function (box) {
      renderNarration(box, pg);
    });

    /* hint + cheer */
    section(p, 'Hint & cheer', function (box) {
      box.appendChild(labeledStringBox('Hint — when the child is stuck',
        pg.interaction && pg.interaction.hintKey,
        function (draft, key) { draft.story.pages[pgIdx()].interaction.hintKey = key; },
        pg.id + '-hint', !pg.interaction));
      box.appendChild(labeledStringBox('Cheer — after they succeed',
        pg.success && pg.success.narrationKey,
        function (draft, key) {
          var dpg = draft.story.pages[pgIdx()];
          dpg.success = dpg.success || { celebration: 'burst', holdMs: 1200 };
          dpg.success.narrationKey = key;
        },
        pg.id + '-bravo', false));
    });

    /* page actions */
    section(p, 'This page', function (box) {
      var dup = el('button', 'stu-btn', 'Duplicate page');
      dup.addEventListener('click', duplicatePage);
      var del = el('button', 'stu-btn stu-btn-danger', 'Remove page…');
      del.addEventListener('click', deletePageConfirm);
      box.appendChild(dup); box.appendChild(del);
    });

    /* tidy up */
    var unused = global.Studio.unusedKeys();
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
    return g ? global.Studio.str('cast.' + g.id + '.name') || g.id : 'the helper';
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
      ['Picture', !!(pg.scene && pg.scene.image)],
      ['Character', (pg.characters || []).length > 0],
      ['Story lines', ((pg.narration && pg.narration.cues) || []).length > 0],
      ['Activity', !!pg.interaction],
      ['Cheer', !!(pg.success && pg.success.narrationKey)]
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
    var change = el('button', 'stu-btn stu-btn-small', 'Change…');
    change.addEventListener('click', openMechanicPicker);
    head.appendChild(change);
    var rm = el('button', 'stu-btn stu-btn-small stu-btn-danger', 'Remove');
    rm.addEventListener('click', function () {
      mutate('remove activity', function (draft) { draft.story.pages[pgIdx()].interaction = null; });
    });
    head.appendChild(rm);
    box.appendChild(head);
    if (stu && stu.note) box.appendChild(el('div', 'stu-note', stu.note));

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

    /* advanced JSON + inline validation */
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
          return fetch('/studio/import-character-clips/' + S().id + '?character=' + encodeURIComponent(pl.characterId), {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ atlas: atlas, imageBase64: r[0], imageExt: (String(img.name).split('.').pop() || '').toLowerCase() }) })
            .then(function (rp) { return rp.json().then(function (j) { j.__status = rp.status; return j; }); });
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
          draft.strings[cue.id].en = txt.value;
        });
      });
      row.appendChild(txt);
      var meta = el('div', 'stu-cue-meta');
      var dot = el('span', 'stu-audiodot' + (S().audioHave['en/' + cue.id] ? ' stu-have' : ''),
        S().audioHave['en/' + cue.id] ? '● recorded' : '○ no recording yet (fine for testing)');
      meta.appendChild(dot);
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
        draft.strings[key].en = inp.value;
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
    openDrawer('Pick the picture for this page', function (body) {
      /* the library option — always here, so a story with no on-disk scenes still gets a background */
      var libBtn = el('button', 'stu-btn', '🖼️  Use a picture from the library');
      libBtn.addEventListener('click', function () {
        closeDrawer();
        openLibrary(function (src, vocabKey) { setSceneFromSrc(src, vocabKey || src); });
      });
      body.appendChild(libBtn);
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
          grid.appendChild(el('div', 'stu-note',
            'This story has no picture files yet — use the library button above, or drop 1600×1000 .webp files into its scenes folder.'));
          var open = el('button', 'stu-btn stu-btn-small', 'Open the scenes folder (Windows)');
          open.addEventListener('click', function () { global.Studio.api('/studio/reveal/' + S().id, { method: 'POST' }).catch(function () {}); });
          grid.appendChild(open);
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
    openDrawer(pick ? 'Change to which character?' : 'Add a character', function (body) {
      if (!pick) {
        /* upload YOUR OWN character — a single image (one pose) OR a TexturePacker sheet
           (its image + .json = many poses/emotions). Select BOTH files for multiple poses. */
        var upBtn = el('button', 'stu-btn', '⬆ Upload a character (image, or TexturePacker sheet + .json)');
        var upInp = el('input'); upInp.type = 'file'; upInp.accept = 'image/*,.json,application/json'; upInp.multiple = true; upInp.style.display = 'none';
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
          var img = files.filter(isImg)[0], jsn = files.filter(isJson)[0];
          if (!img && jsn) { upBtn.textContent = '✗ also select the sheet image (.webp/.png), not just the .json'; return; }
          if (!img) return;
          var nm = String(img.name || 'character').replace(/\.[^.]+$/, '').trim() || 'character';
          if (jsn) {
            /* TexturePacker sheet: image + atlas .json → a multi-pose character */
            upBtn.textContent = 'Uploading ' + img.name + ' + ' + jsn.name + '…';
            Promise.all([readB64(img), readText(jsn)]).then(function (r) {
              var atlas; try { atlas = JSON.parse(r[1]); } catch (e) { upBtn.textContent = '✗ that .json is not valid JSON'; return null; }
              return fetch('/studio/import-character-sheet/' + S().id, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nm, atlas: atlas, imageBase64: r[0], imageExt: (String(img.name).split('.').pop() || '').toLowerCase() }) })
                .then(function (rp) { return rp.json().then(function (j) { j.__status = rp.status; return j; }); });
            }).then(function (j) { if (j) done(j); }).catch(fail);
          } else {
            /* single image → a one-pose character */
            upBtn.textContent = 'Uploading ' + img.name + '…';
            img.arrayBuffer().then(function (arrbuf) {
              return fetch('/studio/import-character/' + S().id + '?name=' + encodeURIComponent(nm), { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: arrbuf })
                .then(function (rp) { return rp.json().then(function (j) { j.__status = rp.status; return j; }); });
            }).then(done).catch(fail);
          }
        });
        body.appendChild(upBtn); body.appendChild(upInp);
        body.appendChild(el('div', 'stu-note', 'Tip: for many poses/emotions, select BOTH the TexturePacker sheet image and its .json. Or tap a ready-made character below.'));
      }
      global.Studio.api('/studio/cast').then(function (j) {
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
      draft.strings['cast.' + cid + '.name'] = draft.strings['cast.' + cid + '.name'] || { en: cid.charAt(0).toUpperCase() + cid.slice(1) };
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
  function renderTopbar() {
    var t = refs.topbar;
    t.innerHTML = '';
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

    var prev = el('button', 'stu-btn stu-btn-primary', '▶ Try it');
    prev.addEventListener('click', openPreview);
    t.appendChild(prev);
    var check = el('button', 'stu-btn', '✔ Check my story');
    check.addEventListener('click', runCheck);
    t.appendChild(check);

    var save = el('span', 'stu-savestate');
    var st = S().saveState;
    save.textContent = st === 'saving' ? 'Saving…'
      : st === 'saved' ? 'All changes saved' + (S().savedAt ? ' · ' + S().savedAt.toLocaleTimeString().slice(0, 5) : '')
      : st === 'conflict' ? '⚠ This story also changed on disk — reload to get the latest version before editing more'
      : st === 'error' ? '⚠ Could not save — is the Studio server running?'
      : '';
    if (st === 'conflict' || st === 'error') save.classList.add('stu-savebad');
    t.appendChild(save);
  }

  function openPreview() {
    global.Studio.saveNow();
    openDrawer('Try it — the real player', function (body) {
      var bar = el('div', 'stu-libbar');
      var widths = [['Phone', 700], ['Tablet', 900], ['Big', 1180]];
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
      var fromStart = el('button', 'stu-btn stu-btn-small', 'From the start');
      fromStart.addEventListener('click', function () {
        iframe.src = makeSrc().replace(/&page=\d+/, '&page=1');
      });
      bar.appendChild(fromStart);
      body.appendChild(bar);
      iframe.src = makeSrc();
      iframe.style.width = '900px';
      body.appendChild(iframe);
      var onSaved = function (ev) { if (ev === 'saved' && drawer) iframe.src = makeSrc(); };
      global.Studio.on(onSaved);
    }, true);
  }

  function runCheck() {
    global.Studio.saveNow();
    setTimeout(function () {
      openDrawer('Checking your story…', function (body) {
        body.appendChild(el('div', 'stu-note', 'One moment…'));
        global.Studio.api('/studio/validate/' + S().id, { method: 'POST' }).then(function (j) {
          body.innerHTML = '';
          if (j.ok) {
            var ok = el('div', 'stu-ready');
            ok.appendChild(el('h3', null, '✓ Ready!'));
            ok.appendChild(el('p', null, 'Your story is saved and checked. It lives in its story folder — nothing else to export.'));
            ok.appendChild(el('p', 'stu-note', 'Next (for the tech side): node scripts/storybook/qa-storybook.js --story=' + S().id));
            body.appendChild(ok);
          } else {
            body.appendChild(el('h3', null, j.errors.length + ' thing(s) to fix'));
            j.errors.forEach(function (e2) {
              var card = el('div', 'stu-vcard');
              card.appendChild(el('div', null, e2));
              var m = e2.match(/page ([a-z0-9-]+):/);
              if (m) {
                var go = el('button', 'stu-btn stu-btn-small', 'Show me');
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
            det.appendChild(el('summary', null, j.warns.length + ' small note(s) — fine to ship'));
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
      history.replaceState(null, '', '?story=' + id);
    }).catch(function (e) { alert('Could not open: ' + e.message); });
  }

  /* ---- boot ---- */
  function mount(r) {
    refs = r;
    global.Studio.on(function (ev) {
      if (ev === 'change' || ev === 'loaded' || ev === 'savestate' || ev === 'audio') render();
    });
    /* local-server check */
    global.Studio.api('/studio/ping').then(function (j) {
      if (!j || !j.studio) throw new Error();
      var q = new URLSearchParams(location.search);
      var sid = q.get('story');
      if (sid) openStory(sid); else launcher();
    }).catch(function () {
      refs.banner.textContent = 'This is the Storybook Studio — it runs on your computer. Open a terminal and run:  node scripts/storybook/studio-server.js   then open the address it prints.';
      refs.banner.style.display = 'block';
    });
  }

  global.StudioInspector = { mount: mount, render: render, openLibrary: openLibrary, launcher: launcher };
}(typeof window !== 'undefined' ? window : this));
