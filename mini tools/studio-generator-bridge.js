/* ============================================================================
   studio-generator-bridge.js — the Story Studio's embedded worksheet-maker
   flow (the flagship: design in any of the 29 generators WITHOUT leaving the
   Studio; the exercise lands in the story with no zip roundtrip).

   Mechanics: a full-screen overlay hosts the generator in a SAME-ORIGIN
   iframe (/worksheet-generators/<app>.html?sepEmbed=1 — no frame-busting,
   verified). Two directions, one trust model:
     parent → child : the bar buttons call iframe.contentWindow.__sepExport
       __sepExport()      → in-memory package, AUTO crop (union-bbox default)
       __sepExport('ui')  → the app's own crop UI, then the in-memory package
                            (catalog-export.js ?v>=41; degraded to auto-crop
                            on older caches)
     child → parent : the app's own "Export for Storybook" button (relabeled
       "Add to my story" by catalog-export.js under sepEmbed) delivers its
       package to window.__lcsSepBridge.receive — exposed here while the
       overlay is open, torn down on close. Same receiver carries the
       Escape relay (esc) and error surface (fail).
   Every package flows through ONE import path:
     tenant mode   → FormData → /api/studio/stories/<id>/exercises
     operator mode → JSON base64 → /studio/import-exercise-package/<id>
   then onAdded({package, exId, appType, family, descriptor}) — the inspector
   places the sb-worksheet-exercise on the CURRENT page, selected. The overlay
   shows "✓ Placed — back to your story" and closes itself.
   Lifecycle: one overlay at a time (open() replaces any existing one),
   Esc closes (parent capture listener + the in-iframe relay), Close button
   always visible; busy operations make Esc/Close inert until they settle.
   Generation logic in the apps: 0 lines.
   ========================================================================= */
(function (global) {
  'use strict';

  var EXPORT_TIMEOUT_MS = 60000;

  var STR = {
    en: {
      add: 'Add to my story',
      part: 'Choose a part…',
      cancel: 'Close',
      loading: 'Opening the worksheet maker…',
      exporting: 'Preparing your activity…',
      cropHint: 'Drag the box around the part you want, then press "Export this".',
      cancelled: 'No problem — adjust your worksheet and try again.',
      failed: 'That didn\'t work — press Generate in the maker, then try again.',
      saving: 'Adding it to your story…',
      placed: '✓ Placed — back to your story',
      genFirst: 'Generate a worksheet first, then press "Add to my story".'
    },
    de: {
      add: 'In meine Geschichte einfügen',
      part: 'Einen Teil auswählen…',
      cancel: 'Schließen',
      loading: 'Der Arbeitsblatt-Generator öffnet sich…',
      exporting: 'Ihre Aufgabe wird vorbereitet…',
      cropHint: 'Ziehen Sie den Rahmen um den gewünschten Teil und tippen Sie dann auf „Export this“.',
      cancelled: 'Kein Problem – passen Sie das Arbeitsblatt an und versuchen Sie es erneut.',
      failed: 'Das hat nicht geklappt – bitte erst auf „Generate“ klicken und dann noch einmal versuchen.',
      saving: 'Wird zu Ihrer Geschichte hinzugefügt…',
      placed: '✓ Eingefügt – zurück zu Ihrer Geschichte',
      genFirst: 'Erstellen Sie zuerst ein Arbeitsblatt und tippen Sie dann auf „In meine Geschichte einfügen“.'
    }
  };
  function t(k) {
    var loc = (global.Studio && global.Studio.state && global.Studio.state.storyLocale) || 'en';
    return (STR[loc] || STR.en)[k] || STR.en[k];
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* build the story-import request from the in-memory package */
  function importPackage(pkg) {
    var sid = global.Studio.state.id;
    if (global.Studio.tenant) {
      var form = new FormData();
      form.append('descriptor', JSON.stringify(pkg.descriptor));
      Object.keys(pkg.files || {}).forEach(function (name) {
        form.append(name, pkg.files[name], name.split('/').pop());
      });
      return global.Studio.api('/studio/import-exercise/' + sid, { method: 'POST', body: form });
    }
    /* operator mode: the local studio-server takes a JSON base64 envelope */
    var names = Object.keys(pkg.files || {});
    return Promise.all(names.map(function (name) {
      return new Promise(function (resolve, reject) {
        var r = new FileReader();
        r.onload = function () { resolve([name, String(r.result).split(',')[1] || '']); };
        r.onerror = reject;
        r.readAsDataURL(pkg.files[name]);
      });
    })).then(function (pairs) {
      var files64 = {};
      pairs.forEach(function (p) { files64[p[0]] = p[1]; });
      return global.Studio.api('/studio/import-exercise-package/' + sid, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descriptor: pkg.descriptor, filesBase64: files64 })
      });
    });
  }

  var _current = null;   /* the one live overlay — open() replaces it cleanly */

  /* open(app, { onAdded }) — app = an entry of studio-generators.json */
  function open(app, opts) {
    opts = opts || {};
    if (_current) _current.destroy();   /* opening another generator replaces the session */
    var loc = (global.Studio && global.Studio.state && global.Studio.state.storyLocale) || 'en';
    var title = (app.title && (app.title[loc] || app.title.en)) || app.id;

    var ov = el('div', 'stu-genov');
    var bar = el('div', 'stu-genbar');
    var name = el('div', 'stu-genname', title);
    var status = el('div', 'stu-genstatus', t('loading'));
    var btnPart = el('button', 'stu-btn stu-btn-small', t('part'));
    var btnAdd = el('button', 'stu-btn stu-btn-primary', t('add'));
    var btnClose = el('button', 'stu-btn stu-btn-small', t('cancel'));
    btnClose.title = t('cancel') + ' (Esc)';
    bar.appendChild(name); bar.appendChild(status);
    bar.appendChild(btnPart); bar.appendChild(btnAdd); bar.appendChild(btnClose);
    ov.appendChild(bar);

    var busy = false;
    function setBusy(b) {
      busy = b;
      btnAdd.disabled = b; btnPart.disabled = b;
    }
    function close() {
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      try { delete global.__lcsSepBridge; } catch (e) { global.__lcsSepBridge = undefined; }
      document.removeEventListener('keydown', onKey, true);
      if (_current && _current.destroy === close) _current = null;
    }
    /* Esc closes — capture phase so it never reaches studio-canvas's own
       Escape (which would clear the selection underneath). Inert while busy. */
    function onKey(ev) {
      if (ev.key !== 'Escape') return;
      ev.stopPropagation(); ev.preventDefault();
      if (!busy) close();
    }
    document.addEventListener('keydown', onKey, true);
    btnClose.addEventListener('click', function () { if (!busy) close(); });

    /* ONE import path for every package, bar- or button-initiated */
    function handlePackage(pkg) {
      if (!pkg || !pkg.descriptor) {
        /* crop UI cancelled (null) or nothing generated */
        setBusy(false);
        status.textContent = t('cancelled');
        return null;
      }
      setBusy(true);
      status.textContent = t('saving');
      return importPackage(pkg).then(function (j) {
        if (!j || j.__status !== 200 || !j.package) {
          setBusy(false);
          status.textContent = '✗ ' + ((j && j.error) || t('failed'));
          return;
        }
        /* place FIRST (selected on the current page, visible behind the
           overlay), then the "back to your story" beat, then close */
        if (typeof opts.onAdded === 'function') {
          opts.onAdded({ package: j.package, exId: j.exId, appType: j.appType || app.id,
                         family: j.family || app.sepFamily, descriptor: pkg.descriptor });
        }
        status.textContent = t('placed');
        setTimeout(function () { setBusy(false); close(); }, 900);
      }).catch(function () {
        setBusy(false);
        status.textContent = t('failed');
      });
    }

    /* the child-side receiver: the app's own relabeled export button lands
       here (catalog-export.js _sepParentBridge). Exposed BEFORE the iframe
       loads so the app's embed-init feature-detects it reliably. */
    global.__lcsSepBridge = {
      receive: function (pkg) { if (!busy) handlePackage(pkg); },
      esc: function () { if (!busy) close(); },
      fail: function (msg) { setBusy(false); status.textContent = '✗ ' + (msg || t('failed')); }
    };

    var frame = el('iframe', 'stu-genframe');
    frame.src = '/worksheet-generators/' + app.id + '.html?sepEmbed=1';
    ov.appendChild(frame);
    document.body.appendChild(ov);
    _current = { destroy: close };

    frame.addEventListener('load', function () {
      status.textContent = '';
    });

    function runExport(mode) {
      if (busy) return;
      var cw = frame.contentWindow;
      if (!cw || typeof cw.__sepExport !== 'function') {
        status.textContent = t('genFirst');
        return;
      }
      setBusy(true);
      status.textContent = mode === 'ui' ? t('cropHint') : t('exporting');

      var timer;
      var exportPromise;
      try {
        exportPromise = Promise.resolve(cw.__sepExport(mode === 'ui' ? 'ui' : undefined));
      } catch (e) {
        exportPromise = Promise.reject(e);
      }
      var timeout = new Promise(function (_, reject) {
        timer = setTimeout(function () { reject(new Error('timeout')); }, EXPORT_TIMEOUT_MS);
      });

      Promise.race([exportPromise, timeout]).then(function (pkg) {
        clearTimeout(timer);
        setBusy(false);          /* handlePackage re-arms busy for the import */
        return handlePackage(pkg);
      }).catch(function () {
        clearTimeout(timer);
        setBusy(false);
        status.textContent = t('failed');
      });
    }

    btnAdd.addEventListener('click', function () { runExport('auto'); });
    btnPart.addEventListener('click', function () { runExport('ui'); });
  }

  /* the generator manifest (static, both modes) */
  var _gens = null;
  function fetchGenerators() {
    if (_gens) return Promise.resolve(_gens);
    return fetch('/mini-tools/studio-generators.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('no generators manifest'); return r.json(); })
      .then(function (j) { _gens = j; return j; });
  }

  global.StudioGeneratorBridge = { open: open, fetchGenerators: fetchGenerators };
}(typeof window !== 'undefined' ? window : this));
