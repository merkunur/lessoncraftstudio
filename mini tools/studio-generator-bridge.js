/* ============================================================================
   studio-generator-bridge.js — the Story Studio's embedded worksheet-maker
   flow (the flagship: design in any of the 29 generators WITHOUT leaving the
   Studio; the exercise lands in the story with no zip roundtrip).

   Mechanics: a full-screen overlay hosts the generator in a SAME-ORIGIN
   iframe (/worksheet-generators/<app>.html — no frame-busting, verified),
   so the parent calls iframe.contentWindow.__sepExport directly:
     __sepExport()      → in-memory package, AUTO crop (the union-bbox
                          default — the whole generated exercise)
     __sepExport('ui')  → the app's own crop UI (inside the overlay) then
                          the in-memory package (catalog-export.js ?v>=40;
                          feature-degraded to auto-crop on older caches)
   Result {descriptor, files:{name:Blob}} is posted to the story:
     tenant mode   → FormData → /api/studio/stories/<id>/exercises
     operator mode → JSON base64 → /studio/import-exercise-package/<id>
   Then onAdded({package, appType, family}) — the inspector applies the
   sb-worksheet-exercise mechanic. Generation logic in the apps: 0 lines.
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
      genFirst: 'Generate a worksheet first, then press "Add to my story".'
    },
    de: {
      add: 'In meine Geschichte übernehmen',
      part: 'Einen Teil auswählen…',
      cancel: 'Schließen',
      loading: 'Der Arbeitsblatt-Generator öffnet sich…',
      exporting: 'Ihre Aufgabe wird vorbereitet…',
      cropHint: 'Ziehen Sie den Rahmen um den gewünschten Teil und drücken Sie „Export this".',
      cancelled: 'Kein Problem — passen Sie das Arbeitsblatt an und versuchen Sie es erneut.',
      failed: 'Das hat nicht geklappt — erst „Generate" drücken, dann erneut versuchen.',
      saving: 'Wird zu Ihrer Geschichte hinzugefügt…',
      genFirst: 'Erst ein Arbeitsblatt erzeugen, dann „In meine Geschichte übernehmen" drücken.'
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

  /* open(app, { onAdded }) — app = an entry of studio-generators.json */
  function open(app, opts) {
    opts = opts || {};
    var loc = (global.Studio && global.Studio.state && global.Studio.state.storyLocale) || 'en';
    var title = (app.title && (app.title[loc] || app.title.en)) || app.id;

    var ov = el('div', 'stu-genov');
    var bar = el('div', 'stu-genbar');
    var name = el('div', 'stu-genname', title);
    var status = el('div', 'stu-genstatus', t('loading'));
    var btnPart = el('button', 'stu-btn stu-btn-small', t('part'));
    var btnAdd = el('button', 'stu-btn stu-btn-primary', t('add'));
    var btnClose = el('button', 'stu-btn stu-btn-small', t('cancel'));
    bar.appendChild(name); bar.appendChild(status);
    bar.appendChild(btnPart); bar.appendChild(btnAdd); bar.appendChild(btnClose);
    ov.appendChild(bar);
    var frame = el('iframe', 'stu-genframe');
    frame.src = '/worksheet-generators/' + app.id + '.html?sepEmbed=1';
    ov.appendChild(frame);
    document.body.appendChild(ov);

    var busy = false;
    function setBusy(b) {
      busy = b;
      btnAdd.disabled = b; btnPart.disabled = b;
    }
    function close() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
    btnClose.addEventListener('click', function () { if (!busy) close(); });

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
        if (!pkg || !pkg.descriptor) {
          /* crop UI cancelled (null) or nothing generated */
          setBusy(false);
          status.textContent = t('cancelled');
          return null;
        }
        status.textContent = t('saving');
        return importPackage(pkg).then(function (j) {
          setBusy(false);
          if (!j || j.__status !== 200 || !j.package) {
            status.textContent = '✗ ' + ((j && j.error) || t('failed'));
            return;
          }
          close();
          if (typeof opts.onAdded === 'function') {
            opts.onAdded({ package: j.package, exId: j.exId, appType: j.appType || app.id, family: j.family || app.sepFamily });
          }
        });
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
