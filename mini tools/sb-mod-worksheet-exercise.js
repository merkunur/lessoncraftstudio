/* ============================================================================
   sb-mod-worksheet-exercise.js — the WORKSHEET-GENERATOR BRIDGE ingestion
   module ("Storybook Exercise Package", format sep-1).

   Mounts an exported worksheet exercise (transparent visual + machine-readable
   interaction descriptor) as a first-class storybook interaction. The SEP
   descriptor — NOT the deck runtime — is the contract; check logic is
   re-implemented here per family against descriptor data.

   v1 families:
     A — tap-letter fill-in  (input.policy 'tap-palette'; the deck's <input>
         is replaced WHOLESALE by a tap-letter palette — K-3 no-typing rule)
     F — drag-and-drop        (two-phase fill → check → retry; palette reveals)

   Package layout (unzipped under the story's assets):
     <package>/descriptor.json
     <package>/visual@2x.webp | .png       (alpha; descriptor.visual.format wins)
     <package>/assets/reveal-NN.webp       (Family F)

   Page taskData:
     { "package": "exercises/word-guess-01" }      // relative to the story base
                                                    // (or an absolute /mini-tools/… path)
   All element rects in the descriptor are crop-space, top-left convention
   (normalized at EXPORT) — this module is a dumb %-overlay renderer.
   Tap-target floor: every interactive element carries a centered ::after hit
   area inflated to >= 44 real px (pure CSS max(100%, 44px)).
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbwe{position:relative;width:100%;height:100%;display:flex;flex-direction:column;',
      '  align-items:center;justify-content:center;gap:8px;}',
      '.sbwe-board{position:relative;flex:0 0 auto;}',
      '.sbwe-visual{display:block;width:100%;height:100%;pointer-events:none;user-select:none;-webkit-user-drag:none;}',
      '.sbwe-el{position:absolute;-webkit-tap-highlight-color:transparent;}',
      /* inflated hit area: >= 44 real px regardless of slot scale */
      '.sbwe-hit::after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);',
      '  width:max(100%,44px);height:max(100%,44px);}',
      /* Family A slots */
      '.sbwe-slot{border:3px dashed rgba(20,107,94,.65);border-radius:8px;background:rgba(255,255,255,.55);',
      '  color:#1c1a17;font-weight:900;display:flex;align-items:center;justify-content:center;cursor:pointer;',
      '  padding:0;font-family:inherit;}',
      '.sbwe-slot.sbwe-sel{border-style:solid;border-color:#F2784B;box-shadow:0 0 0 3px rgba(242,120,75,.35);}',
      '.sbwe-slot.sbwe-ok{border-style:solid;border-color:#146B5E;background:rgba(20,107,94,.18);cursor:default;}',
      '.sbwe-slot.sbwe-bad{border-style:solid;border-color:#D64541;background:rgba(214,69,65,.16);}',
      /* palette strip */
      '.sbwe-palette{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;',
      '  padding:6px 4px;max-width:100%;}',
      '.sbwe-key{position:relative;min-width:48px;min-height:48px;border:none;border-radius:12px;',
      '  background:#146B5E;color:#fff;font-size:22px;font-weight:900;cursor:pointer;',
      '  box-shadow:0 3px 8px rgba(0,0,0,.25);font-family:inherit;}',
      '.sbwe-key:active{transform:scale(.94);}',
      '.sbwe-key.sbwe-back{background:#8a6d5c;font-size:19px;}',
      /* Family F */
      '.sbwe-cell{border:3px dashed rgba(20,107,94,.5);border-radius:6px;background:rgba(255,255,255,.35);}',
      '.sbwe-cell.sbwe-filled{border-style:solid;background:transparent;}',
      '.sbwe-cell.sbwe-ok{border-color:#146B5E;}',
      '.sbwe-cell.sbwe-bad{border-color:#D64541;background:rgba(214,69,65,.14);}',
      '.sbwe-cell img{width:100%;height:100%;object-fit:contain;pointer-events:none;}',
      '.sbwe-tile{border:2px solid rgba(28,26,23,.35);border-radius:8px;background:#fff;cursor:grab;',
      '  padding:0;touch-action:none;}',
      '.sbwe-tile img{width:100%;height:100%;object-fit:contain;pointer-events:none;-webkit-user-drag:none;}',
      '.sbwe-tile.sbwe-used{visibility:hidden;}',
      '.sbwe-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.85;',
      '  filter:drop-shadow(0 6px 10px rgba(0,0,0,.35));}',
      '.sbwe-ghost img{width:100%;height:100%;object-fit:contain;}',
      '.sbwe-loading{color:#146B5E;font-weight:800;padding:20px;}',
      '@media (prefers-reduced-motion: reduce){.sbwe-key:active{transform:none;}}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbwe-css';
    st.textContent = css;
    global.document.head.appendChild(st);
  }

  function pct(v, total) { return (v / total * 100) + '%'; }

  function localesBlock(desc, locale) {
    var L = desc.locales || {};
    return L[locale] || L.en || {};
  }

  /* ---------------------------------------------------------------------- */
  /* Family A — tap-letter fill-in                                           */
  /* ---------------------------------------------------------------------- */
  function familyA(ctx, desc, boardEl, paletteHost, api) {
    var slots = (desc.elements && desc.elements.slots) || [];
    var caseMode = (desc.input && desc.input.tapPalette && desc.input.tapPalette.case) || 'upper';
    var letters = (desc.input && desc.input.tapPalette && desc.input.tapPalette.letters) || [];
    var values = slots.map(function () { return ''; });
    var locked = slots.map(function () { return false; });
    var slotEls = [];
    var selected = -1;

    function displayCase(ch) {
      return caseMode === 'lower' ? String(ch).toLowerCase() : String(ch).toUpperCase();
    }
    function firstEmpty(from) {
      for (var i = 0; i < slots.length; i++) {
        var k = (from + i) % slots.length;
        if (!locked[k] && !values[k]) return k;
      }
      return -1;
    }
    function select(i) {
      selected = i;
      slotEls.forEach(function (el, k) { el.classList.toggle('sbwe-sel', k === selected && !locked[k]); });
    }
    function paint() {
      slotEls.forEach(function (el, k) { el.textContent = values[k] ? displayCase(values[k]) : ''; });
      api.answerChanged(values.every(function (v, k) { return locked[k] || !!v; }));
    }
    function writeLetter(ch) {
      if (selected < 0 || locked[selected]) return;
      values[selected] = ch;
      if (desc.audio && desc.audio.perElement === 'letter') {
        ctx.audio.speak({ type: 'word', text: displayCase(ch) });
      }
      paint();
      var nxt = firstEmpty(selected + 1);
      select(nxt);
    }
    function backspace() {
      var target = selected >= 0 && values[selected] && !locked[selected] ? selected : -1;
      if (target < 0) {
        for (var i = slots.length - 1; i >= 0; i--) {
          if (values[i] && !locked[i]) { target = i; break; }
        }
      }
      if (target < 0) return;
      values[target] = '';
      paint();
      select(target);
    }

    /* slots over the visual */
    slots.forEach(function (s, i) {
      var b = ctx.el('button', 'sbwe-el sbwe-slot sbwe-hit');
      b.type = 'button';
      b.style.left = pct(s.rect.x, desc.crop.w);
      b.style.top = pct(s.rect.y, desc.crop.h);
      b.style.width = pct(s.rect.w, desc.crop.w);
      b.style.height = pct(s.rect.h, desc.crop.h);
      b.addEventListener('click', function () { if (api.enabled() && !locked[i]) select(i); });
      boardEl.appendChild(b);
      slotEls.push(b);
    });
    /* slot font sizes are set at layout time via fontResize (ResizeObserver) */

    /* palette */
    var pal = ctx.el('div', 'sbwe-palette');
    letters.forEach(function (ch) {
      var k = ctx.el('button', 'sbwe-key');
      k.type = 'button';
      k.textContent = displayCase(ch);
      k.addEventListener('click', function () { if (api.enabled()) writeLetter(ch); });
      pal.appendChild(k);
    });
    var back = ctx.el('button', 'sbwe-key sbwe-back');
    back.type = 'button';
    back.textContent = '⌫';
    back.setAttribute('aria-label', 'undo');
    back.addEventListener('click', function () { if (api.enabled()) backspace(); });
    pal.appendChild(back);
    paletteHost.appendChild(pal);

    select(firstEmpty(0));
    paint();

    return {
      check: function () {
        var allOk = true;
        slots.forEach(function (s, i) {
          var ok = values[i] && values[i].toLowerCase() === String(s.expected).toLowerCase();
          slotEls[i].classList.toggle('sbwe-ok', !!ok);
          slotEls[i].classList.toggle('sbwe-bad', !ok);
          if (ok) locked[i] = true;
          else allOk = false;
        });
        if (!allOk) {
          setTimeout(function () {
            slots.forEach(function (s, i) {
              if (!locked[i]) { values[i] = ''; slotEls[i].classList.remove('sbwe-bad'); }
            });
            paint();
            select(firstEmpty(0));
          }, 1100);
        }
        return allOk;
      },
      showHint: function () {
        var i = firstEmpty(0);
        if (i >= 0) select(i);
      },
      autoSolve: function () {
        slots.forEach(function (s, i) { if (!locked[i]) values[i] = String(s.expected); });
        paint();
      },
      fontResize: function (boardPx) {
        var scale = boardPx.w / desc.crop.w;
        slots.forEach(function (s, i) {
          slotEls[i].style.fontSize = Math.max(14, Math.round(s.rect.h * scale * 0.62)) + 'px';
        });
      }
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Family F — drag-and-drop                                                */
  /* ---------------------------------------------------------------------- */
  function familyF(ctx, desc, boardEl, paletteHost, api, packageBase) {
    var cells = (desc.elements && desc.elements.gridCells) || [];
    var tiles = (desc.elements && desc.elements.paletteTiles) || [];
    var solution = (desc.elements && desc.elements.answers && desc.elements.answers.solutionLabels) ||
                   (desc.elements && desc.elements.solutionLabels) || {};
    var placed = {};          /* cellIndex -> paletteNumber */
    var lockedCells = {};     /* cellIndex -> true (correct after check) */
    var cellEls = {}, tileEls = {};
    var ghost = null, dragTile = null;

    function revealURL(t) {
      return packageBase + (t.revealFile || ('assets/reveal-' + t.paletteNumber + '.webp'));
    }
    function fillableCells() {
      return cells.filter(function (c) { return !c.isClue; });
    }
    function paintAnswerState() {
      var full = fillableCells().every(function (c) {
        return lockedCells[c.index] || placed[c.index] !== undefined;
      });
      api.answerChanged(full);
    }
    function placeTile(cellIndex, paletteNumber) {
      placed[cellIndex] = paletteNumber;
      var cEl = cellEls[cellIndex];
      cEl.innerHTML = '';
      var img = ctx.el('img');
      img.src = revealURL(tiles.filter(function (t) { return t.paletteNumber === paletteNumber; })[0]);
      img.alt = '';
      cEl.appendChild(img);
      cEl.classList.add('sbwe-filled');
      tileEls[paletteNumber].classList.add('sbwe-used');
      paintAnswerState();
    }
    function unplace(cellIndex) {
      var pn = placed[cellIndex];
      if (pn === undefined) return;
      delete placed[cellIndex];
      var cEl = cellEls[cellIndex];
      cEl.innerHTML = '';
      cEl.classList.remove('sbwe-filled', 'sbwe-bad');
      tileEls[pn].classList.remove('sbwe-used');
      paintAnswerState();
    }
    /* crop-space hit test: pointer → board px → crop units */
    function cellAt(clientX, clientY) {
      var r = boardEl.getBoundingClientRect();
      var cx = (clientX - r.left) / r.width * desc.crop.w;
      var cy = (clientY - r.top) / r.height * desc.crop.h;
      for (var i = 0; i < cells.length; i++) {
        var c = cells[i];
        if (c.isClue || lockedCells[c.index]) continue;
        if (cx >= c.rect.x && cx <= c.rect.x + c.rect.w &&
            cy >= c.rect.y && cy <= c.rect.y + c.rect.h) return c;
      }
      return null;
    }
    function startDrag(ev, paletteNumber, fromCell) {
      if (!api.enabled()) return;
      dragTile = { pn: paletteNumber, fromCell: fromCell };
      ghost = ctx.el('div', 'sbwe-ghost');
      var img = ctx.el('img');
      img.src = revealURL(tiles.filter(function (t) { return t.paletteNumber === paletteNumber; })[0]);
      ghost.appendChild(img);
      var sz = Math.max(44, Math.round(boardEl.getBoundingClientRect().width / desc.crop.w *
               (cells[0] ? cells[0].rect.w : 80)));
      ghost.style.width = sz + 'px';
      ghost.style.height = sz + 'px';
      moveGhost(ev.clientX, ev.clientY);
      global.document.body.appendChild(ghost);   /* removed in destroy — allowed exception */
      global.addEventListener('pointermove', onMove);
      global.addEventListener('pointerup', onUp);
      ev.preventDefault();
    }
    function moveGhost(x, y) {
      if (!ghost) return;
      ghost.style.left = (x - ghost.offsetWidth / 2) + 'px';
      ghost.style.top = (y - ghost.offsetHeight / 2) + 'px';
    }
    function onMove(ev) { moveGhost(ev.clientX, ev.clientY); }
    function onUp(ev) {
      global.removeEventListener('pointermove', onMove);
      global.removeEventListener('pointerup', onUp);
      if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
      ghost = null;
      if (!dragTile) return;
      var t = dragTile; dragTile = null;
      var cell = cellAt(ev.clientX, ev.clientY);
      if (t.fromCell !== undefined && t.fromCell !== null) unplace(t.fromCell);
      else if (t.fromCell === undefined || t.fromCell === null) {
        /* from palette */
      }
      if (cell) {
        if (placed[cell.index] !== undefined) unplace(cell.index);
        placeTile(cell.index, t.pn);
      } else if (t.fromCell === undefined || t.fromCell === null) {
        /* dropped outside from palette → nothing placed */
      }
    }

    /* build grid cells */
    cells.forEach(function (c) {
      var d = ctx.el('div', 'sbwe-el sbwe-cell' + (c.isClue ? ' sbwe-filled' : ''));
      d.style.left = pct(c.rect.x, desc.crop.w);
      d.style.top = pct(c.rect.y, desc.crop.h);
      d.style.width = pct(c.rect.w, desc.crop.w);
      d.style.height = pct(c.rect.h, desc.crop.h);
      if (c.isClue) d.style.borderColor = 'transparent';
      d.addEventListener('pointerdown', function (ev) {
        if (placed[c.index] !== undefined && !lockedCells[c.index]) {
          var pn = placed[c.index];
          startDrag(ev, pn, c.index);
        }
      });
      boardEl.appendChild(d);
      cellEls[c.index] = d;
    });
    /* build palette tiles at their descriptor rects */
    tiles.forEach(function (t) {
      var b = ctx.el('button', 'sbwe-el sbwe-tile sbwe-hit');
      b.type = 'button';
      b.style.left = pct(t.rect.x, desc.crop.w);
      b.style.top = pct(t.rect.y, desc.crop.h);
      b.style.width = pct(t.rect.w, desc.crop.w);
      b.style.height = pct(t.rect.h, desc.crop.h);
      var img = ctx.el('img');
      img.src = revealURL(t);
      img.alt = '';
      b.appendChild(img);
      b.addEventListener('pointerdown', function (ev) {
        if (!b.classList.contains('sbwe-used')) startDrag(ev, t.paletteNumber, null);
      });
      boardEl.appendChild(b);
      tileEls[t.paletteNumber] = b;
    });
    paintAnswerState();

    return {
      check: function () {
        var allOk = true;
        fillableCells().forEach(function (c) {
          if (lockedCells[c.index]) return;
          var ok = placed[c.index] !== undefined &&
                   String(solution[c.index]) === String(placed[c.index]);
          cellEls[c.index].classList.toggle('sbwe-ok', !!ok);
          cellEls[c.index].classList.toggle('sbwe-bad', !ok);
          if (ok) lockedCells[c.index] = true;
          else allOk = false;
        });
        if (!allOk) {
          setTimeout(function () {
            fillableCells().forEach(function (c) {
              if (!lockedCells[c.index] && placed[c.index] !== undefined) unplace(c.index);
            });
          }, 1100);
        }
        return allOk;
      },
      showHint: function () {
        var open = fillableCells().filter(function (c) {
          return !lockedCells[c.index] && placed[c.index] === undefined;
        })[0];
        if (open) {
          var el = open ? cellEls[open.index] : null;
          if (el) {
            el.style.boxShadow = '0 0 0 5px #F2784B';
            setTimeout(function () { el.style.boxShadow = ''; }, 1500);
          }
        }
      },
      autoSolve: function () {
        fillableCells().forEach(function (c) {
          if (placed[c.index] === undefined && solution[c.index] !== undefined) {
            placeTile(c.index, solution[c.index]);
          }
        });
      },
      fontResize: function () {},
      cleanup: function () {
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        global.removeEventListener('pointermove', onMove);
        global.removeEventListener('pointerup', onUp);
      }
    };
  }

  /* ---------------------------------------------------------------------- */
  /* the module                                                              */
  /* ---------------------------------------------------------------------- */
  global.SBModules.register({
    meta: {
      type: 'sb-worksheet-exercise',
      version: 1,
      surfaces: ['dom'],
      completionModes: ['check'],
      minZone: { w: 640, h: 520 }
    },

    /* Author-time validation of the taskData itself; the referenced package's
       descriptor is validated separately (and more deeply) by the story
       validator's SEP ruleset — see scripts/storybook/validate-story.js. */
    validateTask: function (taskData, v) {
      if (!taskData.package || typeof taskData.package !== 'string') {
        v.error('sb-worksheet-exercise: taskData.package (path) required');
      }
      if (v.sepPackage) v.sepPackage(taskData.package);
    },

    create: function () {
      var ctx = null;
      var family = null;
      var enabled = false;
      var startPending = false;
      var built = false;
      var desc = null;
      var boardEl = null;

      function packageBase() {
        var p = ctx.taskData.package;
        if (p.charAt(0) === '/') return p.replace(/\/?$/, '/');
        return ctx.storyBase + p.replace(/\/?$/, '/');
      }

      var api = {
        enabled: function () { return enabled; },
        answerChanged: function (has) { ctx.report.answerChanged(has); }
      };

      function build(d) {
        desc = d;
        if (d.formatVersion !== 'sep-1') {
          throw new Error('[sbwe] unsupported formatVersion ' + d.formatVersion);
        }
        var root = ctx.surface.el.querySelector('.sbwe');
        root.innerHTML = '';

        boardEl = ctx.el('div', 'sbwe-board');
        var vis = ctx.el('img', 'sbwe-visual');
        vis.src = packageBase() + d.visual.file;
        vis.alt = '';
        boardEl.appendChild(vis);
        root.appendChild(boardEl);

        var paletteHost = ctx.el('div');
        paletteHost.style.width = '100%';
        paletteHost.style.display = 'flex';
        paletteHost.style.justifyContent = 'center';
        root.appendChild(paletteHost);

        /* contain-fit the board into the zone minus the palette strip —
           JS sizing (CSS aspect-ratio cannot honor both max constraints) */
        var aspect = d.crop.w / d.crop.h;
        function sizeBoard() {
          var zw = ctx.surface.el.clientWidth;
          var zh = ctx.surface.el.clientHeight;
          var ph = paletteHost.getBoundingClientRect().height;
          var availH = Math.max(80, zh - ph - 10);
          var w = Math.min(zw, availH * aspect);
          boardEl.style.width = Math.floor(w) + 'px';
          boardEl.style.height = Math.floor(w / aspect) + 'px';
          var r = boardEl.getBoundingClientRect();
          if (family && family.fontResize) family.fontResize({ w: r.width, h: r.height });
        }

        if (d.family === 'A') family = familyA(ctx, d, boardEl, paletteHost, api);
        else if (d.family === 'F') family = familyF(ctx, d, boardEl, paletteHost, api, packageBase());
        else throw new Error('[sbwe] family not supported in v1: ' + d.family);

        /* prompt: announce + optionally speak (module utterance channel) */
        var loc = localesBlock(d, ctx.locale);
        if (loc.prompt) {
          ctx.announce(loc.prompt);
          if (d.audio && d.audio.speakPromptOnMount) {
            ctx.audio.speak({ type: 'ui', text: loc.prompt });
          }
        }

        sizeBoard();
        if (global.ResizeObserver) {
          var ro = new global.ResizeObserver(sizeBoard);
          ro.observe(ctx.surface.el);
          ro.observe(paletteHost);
        } else {
          global.addEventListener('resize', sizeBoard);
        }
        /* palette images load async — re-fit once more after paint */
        setTimeout(sizeBoard, 120);
        built = true;
        if (startPending) { enabled = true; startPending = false; }
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var root = ctx.el('div', 'sbwe');
          var ld = ctx.el('div', 'sbwe-loading');
          ld.textContent = '…';
          root.appendChild(ld);
          ctx.surface.el.appendChild(root);
          global.fetch(packageBase() + 'descriptor.json', { cache: 'no-cache' })
            .then(function (r) {
              if (!r.ok) throw new Error('[sbwe] descriptor fetch ' + r.status);
              return r.json();
            })
            .then(build)
            .catch(function (err) {
              try { console.error(err); } catch (e) {}
              ld.textContent = '!';
            });
        },
        start: function () {
          if (built) enabled = true;
          else startPending = true;
        },
        setEnabled: function (b) {
          if (!b) { enabled = false; startPending = false; }
          else if (built) enabled = true;
          else startPending = true;
        },
        check: function () {
          if (!family) return { ok: false };
          return { ok: !!family.check() };
        },
        showHint: function () { if (family && family.showHint) family.showHint(); },
        autoSolve: function () {
          enabled = true;
          if (family && family.autoSolve) family.autoSolve();
        },
        destroy: function () {
          enabled = false;
          if (family && family.cleanup) family.cleanup();
          family = null; desc = null; built = false;
        }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
