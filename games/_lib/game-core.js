/* ============================================================
   game-core.js  —  Shared machinery for every LessonCraft game
   ------------------------------------------------------------
   Load this with a plain <script> tag AFTER theme.js and
   ui-strings.js and BEFORE your game code:

       <script src="../_lib/theme.js"></script>
       <script src="../_lib/ui-strings.js"></script>
       <script src="../_lib/phaser-3.90.0.min.js"></script>
       <script src="../_lib/game-core.js"></script>
       <script src="game.js"></script>

   No frameworks, no npm, no build step. It just hangs one
   global object, GameCore, off the window and expects THEME and
   UI_STRINGS (plus LANGUAGE_NAMES / LANGUAGE_ORDER) to already
   exist, which they do once the files above are loaded.

   WHAT BELONGS HERE
     Things every game needs and that must behave identically
     across all ~200 games: language lookup, kid-sized buttons,
     the language picker, praise pops, the start screen, tap tiles
     (makeTile), the ANIM runner (playAnim), Web-Audio tones (tone),
     the ART registry renderer (preloadArt / drawArt), and telling the
     parent page how tall the game is.

   WHAT DOES NOT BELONG HERE
     Game-specific content: questions, answers, animal names,
     levels. Those live in each game's own file.

   ------------------------------------------------------------
   THREE RULES THIS FILE FOLLOWS (keep following them if you
   edit anything here):

   1. NEVER size anything in vh units and NEVER watch the layout
      with a ResizeObserver. Inside an iframe vh measures the
      iframe, so growing to fit "vh" makes the iframe taller,
      which makes vh taller, which grows it again -> an endless
      growth loop. Use fixed pixels or Phaser's own scale manager.

   2. Every Phaser text style uses LONGHAND with a QUOTED family:
         { fontFamily: THEME.font.display, fontSize: "22px" }
      Never the shorthand { font: "700 22px Baloo 2" }. "Baloo 2"
      starts with a digit and quietly breaks the shorthand.

   3. Every colour and size comes from THEME. Never type a hex
      number here. And never put pure white on the coral accent
      (poor contrast); on coral use THEME.colour.bg or
      THEME.colour.inkOnAccent. See the contrast note in theme.js.
   ============================================================ */

/* GameCore is our single global. Everything is a method on it,
   and a leading underscore means "internal, other code should
   not call this directly". */
var GameCore = (function () {

  /* The list of language codes we support. This comes straight
     from LANGUAGE_ORDER in ui-strings.js, so there is exactly one
     place to edit if that list ever changes. */
  var VALID = {};
  for (var i = 0; i < LANGUAGE_ORDER.length; i++) {
    VALID[LANGUAGE_ORDER[i]] = true;
  }

  /* Internal state. These hold the answers init() worked out, the
     list of things that want to be redrawn when the language
     changes, and the buttons the keyboard can tab between. */
  var state = {
    lang: "en",
    isEmbedded: false,
    soundEnabled: true,
    listeners: [],   // functions called on every language change
    buttons: [],     // keyboard-focusable buttons currently alive
    focusIndex: -1,  // which entry in `buttons` has the focus ring
    keyboardScenes: [] // Phaser scenes we already hooked up
  };

  /* ------------------------------------------------------------
     normaliseCode(raw)
     Turns anything that looks like a language tag into a bare
     two-letter code, lower case. So "de", "DE", "de-DE" and
     "de_CH" all become "de". Returns null for anything that is
     not a string at all.
     YOU CAN SAFELY CHANGE: the separator split if you ever want
     to reject sub-tags instead of trimming them.
     ------------------------------------------------------------ */
  function normaliseCode(raw) {
    if (typeof raw !== "string") return null;
    var code = raw.trim().toLowerCase().split(/[-_]/)[0];
    return code || null;
  }

  /* ------------------------------------------------------------
     resolveLanguage(queryLang, optionLang, htmlLang)
     Decides the starting language using EXACTLY this order and
     stopping at the first recognised code:
        1. the ?lang= value in the URL  (it is "lang", not locale)
        2. options.lang passed to init()
        3. the lang="..." attribute on the <html> tag
        4. "en"
     Anything unrecognised is skipped, and if nothing matches we
     fall back hard to "en".
     YOU CAN SAFELY CHANGE: the priority order, but keep "en" last.
     ------------------------------------------------------------ */
  function resolveLanguage(queryLang, optionLang, htmlLang) {
    var candidates = [queryLang, optionLang, htmlLang];
    for (var i = 0; i < candidates.length; i++) {
      var code = normaliseCode(candidates[i]);
      if (code && VALID[code]) return code;
    }
    return "en";
  }

  /* ------------------------------------------------------------
     substitute(str, values)
     Fills {placeholders} in a translated string. Given
     "Question {n} of {total}" and {n:3, total:10} it returns
     "Question 3 of 10". A placeholder with no matching value is
     left untouched so you can see what went wrong.
     ------------------------------------------------------------ */
  function substitute(str, values) {
    if (!values) return str;
    return str.replace(/\{(\w+)\}/g, function (whole, name) {
      return Object.prototype.hasOwnProperty.call(values, name)
        ? String(values[name])
        : whole;
    });
  }

  /* ------------------------------------------------------------
     notifyLanguageChange()
     Tells every registered listener that the language just
     changed, so buttons, the picker and the start screen can
     redraw their text. Internal.
     ------------------------------------------------------------ */
  function notifyLanguageChange() {
    for (var i = 0; i < state.listeners.length; i++) {
      try { state.listeners[i](state.lang); } catch (e) { /* keep going */ }
    }
  }

  /* ------------------------------------------------------------
     onLanguageChange(fn)  (also exposed as GameCore.onLanguageChange)
     Register a function to run whenever the language changes.
     Handy if your own game has text that needs translating. The
     function receives the new language code. Returns an "off"
     function you can call to unregister.
     YOU CAN SAFELY CHANGE: nothing here is sacred.
     ------------------------------------------------------------ */
  function onLanguageChange(fn) {
    if (typeof fn !== "function") return function () {};
    state.listeners.push(fn);
    return function () {
      var at = state.listeners.indexOf(fn);
      if (at >= 0) state.listeners.splice(at, 1);
    };
  }

  /* ------------------------------------------------------------
     drawRoundedRect(g, w, h, fillColor, radius)
     Small helper that paints a centred rounded rectangle onto a
     Graphics object g. Centred on (0,0) so it sits nicely inside
     a container. Everything comes from THEME. Internal.
     ------------------------------------------------------------ */
  function drawRoundedRect(g, w, h, fillColor, radius) {
    g.fillStyle(fillColor, 1);
    g.fillRoundedRect(-w / 2, -h / 2, w, h, radius);
  }

  /* ============================================================
     PUBLIC API
     ============================================================ */

  return {

    /* ----------------------------------------------------------
       init(options)
       Call once, at the very top of your game, before you create
       anything. It reads the page and remembers three things:

         - which language to use (see resolveLanguage)
         - GameCore.isEmbedded  : true when ?embed=1 is present,
           meaning the host wants the extra chrome hidden
         - GameCore.soundEnabled: false when ?sound=off is present

       It returns the language code it settled on, which is handy
       for logging. It does NOT touch Phaser, so call it first.

       YOU CAN SAFELY CHANGE: nothing needs changing to use it. If
       you add a new query flag, read it here and expose it here.
       ---------------------------------------------------------- */
    init: function (options) {
      options = options || {};

      var params;
      try {
        params = new URLSearchParams(
          (typeof window !== "undefined" && window.location)
            ? window.location.search
            : ""
        );
      } catch (e) {
        params = { get: function () { return null; } };
      }

      // ?embed=1 hides extra chrome; anything else is not embedded.
      this.isEmbedded = params.get("embed") === "1";
      state.isEmbedded = this.isEmbedded;

      // ?sound=off silences the game; otherwise sound is allowed.
      // Note: this flag is the *permission*. Your game should also
      // respect it before playing any audio.
      this.soundEnabled = params.get("sound") !== "off";
      state.soundEnabled = this.soundEnabled;

      // Language, in the strict order defined above.
      state.lang = resolveLanguage(
        params.get("lang"),
        options.lang,
        (typeof document !== "undefined" && document.documentElement)
          ? document.documentElement.getAttribute("lang")
          : null
      );

      // Keep the <html lang> in sync so assistive tech agrees.
      if (typeof document !== "undefined" && document.documentElement) {
        document.documentElement.setAttribute("lang", state.lang);
      }

      return state.lang;
    },

    /* The current language code, kept up to date by setLanguage.
       Read it if you need it; don't write to it directly. */
    get lang() { return state.lang; },

    /* ----------------------------------------------------------
       t(key, values)
       Returns the interface text for the current language.
         t("start")                 -> "Start"
         t("question_x_of_y",
           {n:3, total:10})         -> "Question 3 of 10"

       If a key is missing in the current language it falls back to
       English, and if it is missing there too it returns the key
       itself (so you always see *something* on screen).

       YOU CAN SAFELY CHANGE: nothing. Add new keys to ui-strings.js.
       ---------------------------------------------------------- */
    t: function (key, values) {
      var dict = UI_STRINGS[state.lang] || {};
      var str = dict[key];
      if (str == null) str = UI_STRINGS.en[key];
      if (str == null) str = key;
      return substitute(str, values);
    },

    /* ----------------------------------------------------------
       setLanguage(code)
       Changes the language everywhere and re-renders anything that
       registered itself (buttons, the picker, the start screen).
       Unknown codes are ignored, so this is safe to wire straight
       to a UI control. Pass a code like "fr"; sub-tags like
       "fr-CA" are accepted and trimmed to "fr".

       YOU CAN SAFELY CHANGE: add side-effects here (e.g. reload
       audio) if a language change needs them.
       ---------------------------------------------------------- */
    setLanguage: function (code) {
      var c = normaliseCode(code);
      if (!c || !VALID[c]) return; // ignore anything we do not support
      state.lang = c;
      if (typeof document !== "undefined" && document.documentElement) {
        document.documentElement.setAttribute("lang", c);
      }
      notifyLanguageChange();
    },

    /* Register a language-change listener (see onLanguageChange). */
    onLanguageChange: onLanguageChange,

    /* ----------------------------------------------------------
       isEmbedded  /  soundEnabled
       Plain booleans set by init(). Read them; your game decides
       what "embedded" means for its layout and checks soundEnabled
       before making any noise.
       ---------------------------------------------------------- */
    isEmbedded: false,
    soundEnabled: true,

    /* ----------------------------------------------------------
       makeButton(scene, x, y, label, onClick)
       Builds a friendly, kid-sized button and adds it to the scene.
       It uses THEME.button sizes and THEME colours, has rounded
       corners, grows a touch on hover, dips on press, and is fully
       keyboard accessible (Tab moves between buttons, Enter or
       Space presses the focused one).

         scene  : your Phaser scene
         x, y   : centre of the button in scene coordinates
         label  : text to show. Pass a key (e.g. "start") and it is
                  translated, and it updates automatically when the
                  language changes. Pass a plain word and that word
                  is shown as-is.
         onClick: function to run when the child taps or presses it.

       Returns the container so you can move or hide it later.
       It is also added to a shared keyboard list automatically.

       YOU CAN SAFELY CHANGE: colours here are all from THEME, so
       they stay on brand. To make a wider button change
       THEME.button.width rather than editing this function.
       ---------------------------------------------------------- */
    makeButton: function (scene, x, y, label, onClick) {
      var core = this;
      var w = THEME.button.width;
      var h = THEME.button.height;
      var radius = THEME.size.radius;

      // Never place a button so far off the edges that part of it (or
      // its focus ring) falls outside the stage. Centred on (x, y), so
      // keep at least 16px of the frame visible on every side.
      var MARGIN = 16;
      function clamp(v, lo, hi) {
        if (hi < lo) hi = lo;
        return v < lo ? lo : (v > hi ? hi : v);
      }
      x = clamp(x, MARGIN + w / 2, scene.scale.width - MARGIN - w / 2);
      y = clamp(y, MARGIN + h / 2, scene.scale.height - MARGIN - h / 2);

      var container = scene.add.container(x, y);
      container.setSize(w, h);

      var bg = scene.add.graphics();
      var text = scene.add.text(0, 0, "", {
        fontFamily: THEME.font.display,
        fontSize: THEME.button.fontSize,
        color: THEME.colour.surface.hex,
        align: "center"
      }).setOrigin(0.5);

      container.add([bg, text]);

      // Painter for the button's current look.
      function redraw() {
        bg.clear();
        if (api.focused) {
          bg.lineStyle(3, THEME.colour.focus.num, 1);
          bg.strokeRoundedRect(
            -w / 2 - 3, -h / 2 - 3, w + 6, h + 6, radius + 3
          );
        }
        drawRoundedRect(
          bg, w, h,
          api.pressed ? THEME.colour.inkOnAccent.num
                      : THEME.colour.structure.num,
          radius
        );
      }

      // Paint the label. Keys translate; other text is used as-is.
      // Long labels shrink to fit the fixed button width instead of
      // spilling past the rounded corners.
      function refresh() {
        text.setText(UI_STRINGS[state.lang] && UI_STRINGS[state.lang][label] != null
          ? core.t(label)
          : (UI_STRINGS.en[label] != null ? UI_STRINGS.en[label] : label));
        text.setFontSize(parseInt(THEME.button.fontSize, 10) || 24);
        var guard = 0;
        while (text.width > w - 20 && text.fontSize > 12 && guard++ < 40) {
          text.setFontSize(text.fontSize - 1);
        }
      }

      // The object we hand back and also register for keyboard use.
      var api = {
        container: container,
        label: label,
        focused: false,
        pressed: false,
        hovered: false,
        setFocused: function (v) {
          api.focused = !!v;
          // Pull the focused button above siblings (e.g. an open
          // language panel) so its focus ring is never hidden.
          if (v && container.scene && container.scene.bringToTop) {
            container.scene.bringToTop(container);
          }
          redraw();
        },
        // The plain callback, no animation. Pointer uses this.
        run: function () {
          if (typeof onClick === "function") onClick();
        },
        // Animated press used by the keyboard (Enter / Space).
        activate: function () {
          api.pressed = true; redraw();
          container.setScale(0.96);
          scene.tweens.add({
            targets: container, scale: api.hovered ? 1.04 : 1,
            duration: 110,
            onComplete: function () { api.pressed = false; redraw(); }
          });
          api.run();
        }
      };

      refresh();
      redraw();

      // Pointer behaviour: hover grow, press dip, tap to activate.
      // A single handler per event, so nothing fires twice.
      container.setInteractive(new Phaser.Geom.Rectangle(
        -w / 2, -h / 2, w, h
      ), Phaser.Geom.Rectangle.contains);

      container.on("pointerover", function () {
        api.hovered = true;
        if (!api.pressed) container.setScale(1.04);
      });
      container.on("pointerout", function () {
        api.hovered = false;
        if (!api.pressed) container.setScale(1);
      });
      container.on("pointerdown", function () {
        api.pressed = true; redraw();
        container.setScale(0.96);
      });
      container.on("pointerup", function () {
        // Released inside: restore look, take keyboard focus, run.
        api.pressed = false; redraw();
        container.setScale(api.hovered ? 1.04 : 1);
        core.setFocus(api);
        api.run();
      });
      container.on("pointerupoutside", function () {
        // Dragged off before releasing: cancel the press, do nothing.
        api.pressed = false; redraw();
        container.setScale(api.hovered ? 1.04 : 1);
      });

      // Re-translate automatically whenever the language changes,
      // and unregister + drop from the keyboard list when destroyed.
      var off = onLanguageChange(refresh);
      container.once("destroy", function () {
        off();
        core._removeButton(api);
      });

      // Register so the keyboard can reach it.
      core._registerButton(scene, api);
      return container;
    },

    /* ----------------------------------------------------------
       makeLanguagePicker(scene, x, y)
       A small control that lets the child switch language. It
       shows the current language; tapping it opens a panel with
       every language written in its own name (English, Deutsch,
       Français ...) in the standard LANGUAGE_ORDER. Tapping one
       switches the whole game and closes the panel.

       x, y are the top-left corner of the picker.
       Returns the container so you can position or hide it.

       YOU CAN SAFELY CHANGE: the column count (COLS below) for
       more or fewer languages per row.
       ---------------------------------------------------------- */
    makeLanguagePicker: function (scene, x, y) {
      var core = this;
      var MARGIN = 16;              // hard floor from every stage edge
      var pillH = THEME.size.minTap;
      var gapX = 10, gapY = 10, pad = 14;
      var radius = THEME.size.radiusSmall;
      var headerW = 150, headerH = pillH;

      // The picker lives inside a wrapper anchored at its own top-left
      // (0,0) and drawn with POSITIVE coordinates. That keeps the maths
      // simple: the header box is (0..headerW, 0..headerH) and the panel
      // hangs below (or above) it, all measured from the same corner.
      var root = scene.add.container(0, 0);

      function clamp(v, lo, hi) {
        if (hi < lo) hi = lo;
        return v < lo ? lo : (v > hi ? hi : v);
      }
      function fitFont(t, maxW) {
        var guard = 0;
        while (t.width > maxW && t.fontSize > 8 && guard++ < 40) {
          t.setFontSize(t.fontSize - 1);
        }
      }

      // Header: shows the current language, toggles the panel.
      //
      // The background Graphics and the globe+label Text share ONE
      // coordinate space: the header container's own frame, whose
      // origin is the box's top-left (0,0). The rectangle is drawn
      // from (0,0) and the Text is centred at (headerW/2, headerH/2)
      // in that SAME frame, so rectangle, globe and label move together
      // as one unit. The container is then positioned once, at the
      // root's (0,0); no per-child absolute offsets are mixed in.
      var headerBg = scene.add.graphics();
      var headerText = scene.add.text(headerW / 2, headerH / 2, "", {
        fontFamily: THEME.font.display,
        fontSize: "16px",
        color: THEME.colour.structure.hex
      }).setOrigin(0.5);
      fitFont(headerText, headerW - 16);

      function drawHeader() {
        headerBg.clear();
        headerBg.fillStyle(THEME.colour.surface.num, 1);
        headerBg.fillRoundedRect(0, 0, headerW, headerH, radius);
        headerBg.lineStyle(2, THEME.colour.structure.num, 1);
        headerBg.strokeRoundedRect(0, 0, headerW, headerH, radius);
      }

      function refreshHeader() {
        headerText.setText("\uD83C\uDF10 " + LANGUAGE_NAMES[state.lang]);
        headerText.setFontSize(16);
        fitFont(headerText, headerW - 16);
        drawHeader();
      }
      refreshHeader();

      var header = scene.add.container(0, 0, [headerBg, headerText]);
      header.setSize(headerW, headerH);
      header.setInteractive(new Phaser.Geom.Rectangle(
        0, 0, headerW, headerH
      ), Phaser.Geom.Rectangle.contains);

      // Panel: a bordered surface holding one pill per language. The
      // layout is recomputed from the CURRENT stage size every time it
      // opens, so it always fits, even when the game is resized or
      // runs inside an iframe.
      var panel = scene.add.container(0, 0);
      var panelBg = scene.add.graphics();
      panel.add(panelBg);
      panel.setVisible(false);

      var optionBgs = {}; // code -> its Graphics, so we can highlight

      function relayout() {
        var W = scene.scale.width, H = scene.scale.height;
        var availW = Math.max(48, W - 2 * MARGIN);

        // Choose a column count that fits, then size the pills to fill
        // it. Drop to a single column before ever overflowing sideways.
        var COLS = 2;
        var pillW = clamp(
          Math.floor((availW - pad * 2 - (COLS - 1) * gapX) / COLS),
          80, 150);
        if (COLS * pillW + (COLS - 1) * gapX + pad * 2 > availW) {
          COLS = 1;
          pillW = Math.min(150, availW - pad * 2);
        }
        var rows = Math.ceil(LANGUAGE_ORDER.length / COLS);
        var panelW = pad * 2 + COLS * pillW + (COLS - 1) * gapX;
        var panelH = pad * 2 + rows * pillH + (rows - 1) * gapY;

        // If even the shortest layout is taller than the stage, squeeze
        // the pill rows (never below a finger-friendly 34px) so the
        // whole panel stays on screen.
        var availH = Math.max(pillH, H - 2 * MARGIN);
        if (panelH > availH) {
          pillH = clamp(
            Math.floor((availH - pad * 2 - (rows - 1) * gapY) / rows),
            34, THEME.size.minTap);
          panelH = pad * 2 + rows * pillH + (rows - 1) * gapY;
        }

        // Panel background, drawn centred on the panel's own origin.
        panelBg.clear();
        panelBg.fillStyle(THEME.colour.surface.num, 1);
        panelBg.fillRoundedRect(
          -panelW / 2, -panelH / 2, panelW, panelH, radius);
        panelBg.lineStyle(2, THEME.colour.line.num, 1);
        panelBg.strokeRoundedRect(
          -panelW / 2, -panelH / 2, panelW, panelH, radius);

        // Place each language pill, sized and shrunk-to-fit as needed.
        LANGUAGE_ORDER.forEach(function (code, idx) {
          var col = idx % COLS;
          var row = Math.floor(idx / COLS);
          var cx = -panelW / 2 + pad + pillW / 2 + col * (pillW + gapX);
          var cy = -panelH / 2 + pad + pillH / 2 + row * (pillH + gapY);

          var pillBg = optionBgs[code].bg;
          var pillText = optionBgs[code].text;
          pillBg.x = cx; pillBg.y = cy;
          pillText.x = cx; pillText.y = cy;
          pillText.setFontSize(16);
          fitFont(pillText, pillW - 14);
          optionBgs[code].cx = cx;
          optionBgs[code].cy = cy;
          optionBgs[code].w = pillW;
          optionBgs[code].h = pillH;

          var pill = optionBgs[code].container;
          pill.setSize(pillW, pillH);
          pill.setInteractive(new Phaser.Geom.Rectangle(
            -pillW / 2, -pillH / 2, pillW, pillH
          ), Phaser.Geom.Rectangle.contains);

          drawRoundedRect(pillBg, pillW, pillH,
            code === state.lang ? THEME.colour.structureSoft.num
                                : THEME.colour.surface2.num, radius);
          if (code === state.lang) {
            pillBg.lineStyle(2, THEME.colour.structure.num, 1);
            pillBg.strokeRoundedRect(
              -pillW / 2, -pillH / 2, pillW, pillH, radius);
          }
        });

        // Keep the header (the always-visible toggle) inside the stage
        // with a 16px margin, clamped minimally from wherever the game
        // asked for it. The header never jumps far; only clamps.
        var left = clamp(x, MARGIN, W - MARGIN - headerW);
        var top = clamp(y, MARGIN, H - MARGIN - headerH);

        // Open the panel downward when there is room, otherwise flip it
        // upward. Then nudge it (never past a margin) so it is fully on
        // screen; on a stage too short for 11 pills either way, the
        // clamp keeps as much visible as possible.
        var spaceBelow = H - MARGIN - (top + headerH);
        var spaceAbove = top - MARGIN;
        var openUp = spaceBelow < panelH && spaceAbove >= spaceBelow;

        // Offsets are relative to the root's top-left (same frame the
        // header box 0..headerH occupies), so "just below the header"
        // is headerH + 6 + half the panel, and "just above" mirrors it.
        var panelY = openUp
          ? -(6 + panelH / 2)                 // above the header
          : (headerH + 6 + panelH / 2);       // below the header
        // Keep the panel's own box inside the stage (bounds relative to
        // the root top). If the header sits mid-stage and the panel fits
        // neither side, this clamps it fully on screen and it overlaps
        // the header instead — a popover on top, still all visible.
        panelY = clamp(panelY,
          MARGIN - top + panelH / 2,
          H - MARGIN - top - panelH / 2);

        // Slide sideways so the panel never spills past a side margin.
        var panelX = clamp(0,
          MARGIN - left + panelW / 2,
          W - MARGIN - left - panelW / 2);

        root.x = left;
        root.y = top;
        panel.x = panelX;
        panel.y = panelY;
        header.setScale(1);
      }

      // Build the pills once (background + label per language, wrapped
      // in a Container so each is one interactive target).
      LANGUAGE_ORDER.forEach(function (code) {
        var pillBg = scene.add.graphics();
        var pillText = scene.add.text(0, 0, LANGUAGE_NAMES[code], {
          fontFamily: THEME.font.display,
          fontSize: "16px",
          color: THEME.colour.ink.hex
        }).setOrigin(0.5);
        var pill = scene.add.container(0, 0, [pillBg, pillText]);
        pill.on("pointerup", function () {
          core.setLanguage(code);
          setOpen(false);
        });
        optionBgs[code] = { bg: pillBg, text: pillText, container: pill };
        panel.add(pill);
      });

      function highlightOptions() {
        LANGUAGE_ORDER.forEach(function (code) {
          var o = optionBgs[code];
          var g = o.bg;
          g.clear();
          var isCurrent = code === state.lang;
          drawRoundedRect(g, o.w, o.h,
            isCurrent ? THEME.colour.structureSoft.num
                      : THEME.colour.surface2.num, radius);
          if (isCurrent) {
            g.lineStyle(2, THEME.colour.structure.num, 1);
            g.strokeRoundedRect(
              -o.w / 2, -o.h / 2, o.w, o.h, radius);
          }
        });
      }

      function setOpen(open) {
        if (open) relayout();
        panel.setVisible(open);
        header.setScale(open ? 1.04 : 1);
      }

      // Place the picker now (even while closed) so the header is on
      // screen, and keep it correct if the game stage resizes.
      relayout();
      if (scene.scale && scene.scale.on) {
        scene.scale.on("resize", function () {
          var wasOpen = panel.visible;
          relayout();
          if (wasOpen) highlightOptions();
        });
      }

      header.on("pointerup", function () {
        setOpen(!panel.visible);
        if (panel.visible) highlightOptions();
      });

      // Keep text and highlight correct when language changes.
      onLanguageChange(function () {
        refreshHeader();
        relayout();
        if (panel.visible) highlightOptions();
      });

      root.add([panel, header]);
      return root;
    },

    /* ----------------------------------------------------------
       showPraise(scene, message)
       Shows an encouraging pop in the middle of the screen: it
       springs in, holds for about 1.2 seconds, then fades away and
       cleans itself up. Use it ONLY for encouragement, never for
       criticism.

         scene   : your Phaser scene
         message : text to show. A key is translated (e.g. "great_job");
                   any other text is shown as written.

       Returns nothing. Safe to call as often as you like; each pop
       is independent.

       YOU CAN SAFELY CHANGE: the hold time and the colours (all
       from THEME) to taste.
       ---------------------------------------------------------- */
    showPraise: function (scene, message) {
      var text = (UI_STRINGS[state.lang] && UI_STRINGS[state.lang][message] != null)
        ? this.t(message)
        : (UI_STRINGS.en[message] != null ? UI_STRINGS.en[message] : message);

      var cx = scene.scale.width / 2;
      var cy = scene.scale.height / 2;

      var label = scene.add.text(
        cx, cy, text, {
          fontFamily: THEME.font.display,
          fontSize: "40px",
          color: THEME.colour.structure.hex,
          stroke: THEME.colour.bg.hex,
          strokeThickness: 8
        }
      ).setOrigin(0.5).setScale(0.6).setAlpha(0).setDepth(1000);

      // Shrink long praise so it never spills past the stage width.
      var guard = 0;
      var maxW = scene.scale.width - 32;
      while (label.width > maxW && label.fontSize > 16 && guard++ < 40) {
        label.setFontSize(label.fontSize - 2);
      }
      // Keep the final resting spot (it drifts up 24px) on screen.
      label.y = Math.max(cy, label.height / 2 + 16 + 24);

      // Spring in, hold, fade out, then destroy.
      scene.tweens.chain({
        targets: label,
        tweens: [
          { alpha: 1, scale: 1.1, duration: 180, ease: "Back.Out" },
          { scale: 1.0, duration: 120, ease: "Sine.Out" },
          { pauseFor: 1200 },
          { alpha: 0, y: label.y - 24, duration: 320, ease: "Sine.In" }
        ],
        onComplete: function () { label.destroy(); }
      });
    },

    /* ----------------------------------------------------------
       makeStartScreen(scene, title, onStart)
       Builds a simple title screen with the game title and one big
       Start button. A game must NEVER begin on its own: play only
       starts when the child presses Start, and that calls onStart.

         scene  : your Phaser scene
         title  : the title text (plain word; not translated)
         onStart: function to run when Start is pressed

       Returns the Start button container. On language change the
       Start label re-translates itself automatically.

       YOU CAN SAFELY CHANGE: the title size, or add a subtitle
       here, but keep the Start button big and obvious.
       ---------------------------------------------------------- */
    makeStartScreen: function (scene, title, onStart) {
      var MARGIN = 16;
      var W = scene.scale.width, H = scene.scale.height;
      // Keep the title + button block inside the stage at any size,
      // so a small iframe never pushes the Start button off-screen.
      var blockH = 90 + THEME.button.height; // title above, button below
      var cy = Math.max(MARGIN + blockH / 2, Math.min(H / 2, H - MARGIN - blockH / 2));
      if (cy - blockH / 2 < MARGIN) cy = MARGIN + blockH / 2;
      var cx = W / 2;

      var titleText = scene.add.text(cx, cy - 90, title, {
        fontFamily: THEME.font.display,
        fontSize: "52px",
        color: THEME.colour.structure.hex,
        align: "center",
        wordWrap: { width: Math.max(140, Math.min(THEME.size.cardMaxWidth, W) - 2 * MARGIN) }
      }).setOrigin(0.5);
      // Shrink the title until it fits the stage height too.
      var guard = 0;
      while (titleText.height > (cy - 90 - MARGIN) * 2 && titleText.fontSize > 20 && guard++ < 40) {
        titleText.setFontSize(titleText.fontSize - 2);
      }

      var btn = this.makeButton(scene, cx, cy + 40, "start", onStart);

      // Report a sensible height once the screen is laid out, but
      // only if the game has not already set up its own sizing.
      return { titleText: titleText, startButton: btn };
    },

    /* ----------------------------------------------------------
       reportHeight()
       Tells the page hosting this iframe how tall the game is by
       posting {type:'lcs-activity-resize', height} to window.parent,
       so the host can grow or shrink the iframe to fit with no
       inner scrollbar.

       The reported height is the real content height but NEVER
       below 320 pixels. Call it after any layout change.

       IMPORTANT: this reads fixed pixel heights on purpose. Do not
       add a ResizeObserver here and do not measure anything sized
       in vh, or the iframe will feed on itself and grow forever.

       YOU CAN SAFELY CHANGE: the MIN constant if every game needs
       a taller floor.
       ---------------------------------------------------------- */
    reportHeight: function () {
      var MIN = 320;
      if (typeof document === "undefined" || typeof window === "undefined") {
        return;
      }
      var de = document.documentElement;
      var body = document.body;
      var height = Math.max(
        MIN,
        (body && body.scrollHeight) || 0,
        (de && de.scrollHeight) || 0
      );
      try {
        window.parent.postMessage(
          { type: "lcs-activity-resize", height: height }, "*"
        );
      } catch (e) {
        // Cross-origin parent may refuse; ignore quietly.
      }
    },

    /* ----------------------------------------------------------
       makeTile(scene, x, y, w, h, opts)
       A tappable tile of ANY size: an answer card, a grid cell, a
       picture button, a number pill. This is the workhorse of the
       games. It is a rounded rectangle with an optional label
       (emoji, a word, a numeral) centred on it, and it is fully
       keyboard-reachable exactly like makeButton (Tab / arrows to
       move the focus ring, Enter or Space to tap).

         scene  : your Phaser scene
         x, y   : CENTRE of the tile in scene coordinates
         w, h   : width and height in pixels (see the tap floors in
                  catalogue/BUILD-CONVENTIONS.md: 56 logical px for
                  ages 6-9, 80 for ages 5-6)
         opts   : all optional
           label         text or emoji to draw in the middle
           fontSize      pixel number; default = half the short side
           fontFamily    default THEME.font.display
           color         THEME colour token for the label
           fill          THEME colour token for the background
                         (default THEME.colour.surface)
           stroke        THEME colour token for the 2px border
                         (default THEME.colour.line)
           selectedFill  / selectedStroke : look when selected
                         (defaults structureSoft / structure)
           radius        corner radius (default THEME.size.radiusSmall)
           selected      start selected (default false)
           onTap         function(api) run on tap / Enter / Space

       RETURNS THE API OBJECT (not the container), because a tile
       has state a game needs to change:
         api.container        the Phaser container (move / hide it)
         api.setSelected(v)   toggle the selected look
         api.setLabel(str)    change the label, re-fits the font
         api.setEnabled(v)    disabled tiles dim to 50% and ignore taps
         api.selected / api.enabled  current state
         api.destroy()        removes it and drops it from Tab order

       Never pass a hex colour; pass THEME tokens so the palette stays
       one edit. Meaning must never ride on the colour alone: a game
       that marks "chosen" with selectedFill also moves, outlines or
       labels it (see the colour-blind rule in BUILD-CONVENTIONS).

       YOU CAN SAFELY CHANGE: the disabled alpha, the label fit
       margin, the hover/press scale amounts.
       ---------------------------------------------------------- */
    makeTile: function (scene, x, y, w, h, opts) {
      opts = opts || {};
      var core = this;
      var radius = opts.radius != null ? opts.radius : THEME.size.radiusSmall;
      var fillTok = opts.fill || THEME.colour.surface;
      var strokeTok = opts.stroke || THEME.colour.line;
      var selFillTok = opts.selectedFill || THEME.colour.structureSoft;
      var selStrokeTok = opts.selectedStroke || THEME.colour.structure;
      var labelTok = opts.color || THEME.colour.ink;
      var fontPx = opts.fontSize || Math.round(Math.min(w, h) * 0.5);

      var container = scene.add.container(x, y);
      container.setSize(w, h);
      var bg = scene.add.graphics();
      var text = scene.add.text(0, 0, opts.label != null ? String(opts.label) : "", {
        fontFamily: opts.fontFamily || THEME.font.display,
        fontSize: fontPx + "px",
        color: labelTok.hex,
        align: "center"
      }).setOrigin(0.5);
      container.add([bg, text]);

      function fit() {
        text.setFontSize(fontPx);
        var guard = 0;
        while (text.width > w - 12 && text.fontSize > 10 && guard++ < 60) {
          text.setFontSize(text.fontSize - 1);
        }
      }

      function redraw() {
        bg.clear();
        if (api.focused) {
          bg.lineStyle(3, THEME.colour.focus.num, 1);
          bg.strokeRoundedRect(-w / 2 - 3, -h / 2 - 3, w + 6, h + 6, radius + 3);
        }
        var f = api.selected ? selFillTok : fillTok;
        var s = api.selected ? selStrokeTok : strokeTok;
        bg.fillStyle(api.pressed ? THEME.colour.surface2.num : f.num, 1);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, radius);
        bg.lineStyle(api.selected ? 3 : 2, s.num, 1);
        bg.strokeRoundedRect(-w / 2, -h / 2, w, h, radius);
        container.setAlpha(api.enabled ? 1 : 0.5);
      }

      var api = {
        container: container,
        label: opts.label,
        focused: false,
        pressed: false,
        hovered: false,
        selected: !!opts.selected,
        enabled: true,
        setFocused: function (v) {
          api.focused = !!v;
          if (v && container.scene && container.scene.bringToTop) {
            container.scene.bringToTop(container);
          }
          redraw();
        },
        setSelected: function (v) { api.selected = !!v; redraw(); },
        setLabel: function (s) { api.label = s; text.setText(s == null ? "" : String(s)); fit(); },
        setEnabled: function (v) { api.enabled = !!v; redraw(); },
        run: function () {
          if (!api.enabled) return;
          if (typeof opts.onTap === "function") opts.onTap(api);
        },
        activate: function () {
          if (!api.enabled) return;
          api.pressed = true; redraw();
          container.setScale(0.96);
          scene.tweens.add({
            targets: container, scale: api.hovered ? 1.04 : 1,
            duration: 110,
            onComplete: function () { api.pressed = false; redraw(); }
          });
          api.run();
        },
        destroy: function () { container.destroy(); }
      };

      fit();
      redraw();

      container.setInteractive(new Phaser.Geom.Rectangle(
        -w / 2, -h / 2, w, h
      ), Phaser.Geom.Rectangle.contains);

      container.on("pointerover", function () {
        api.hovered = true;
        if (api.enabled && !api.pressed) container.setScale(1.04);
      });
      container.on("pointerout", function () {
        api.hovered = false;
        if (!api.pressed) container.setScale(1);
      });
      container.on("pointerdown", function () {
        if (!api.enabled) return;
        api.pressed = true; redraw();
        container.setScale(0.96);
      });
      container.on("pointerup", function () {
        if (!api.enabled) return;
        api.pressed = false; redraw();
        container.setScale(api.hovered ? 1.04 : 1);
        core.setFocus(api);
        api.run();
      });
      container.on("pointerupoutside", function () {
        api.pressed = false; redraw();
        container.setScale(api.hovered ? 1.04 : 1);
      });

      container.once("destroy", function () { core._removeButton(api); });
      core._registerButton(scene, api);
      return api;
    },

    /* ----------------------------------------------------------
       playAnim(scene, target, spec, onComplete)
       Runs ONE entry of a game's ANIM registry as a Phaser tween.
       Every game declares its motion once, at the top of the file:

         const ANIM = {
           pop:   { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true },
           nudge: { x: "+=12",  duration: 90,  ease: "Sine.InOut", yoyo: true, repeat: 1 },
           rise:  { y: "-=40",  alpha: 0, duration: 400, ease: "Sine.In" }
         };

       and then calls  GameCore.playAnim(this, tile.container, ANIM.pop).
       The spec is a plain Phaser tween config MINUS "targets"; any
       key named trigger / note / name / what is documentation and is
       ignored. Returns the tween (or null if spec is missing) so a
       game can stop it.

       YOU CAN SAFELY CHANGE: the list of ignored documentation keys.
       ---------------------------------------------------------- */
    playAnim: function (scene, target, spec, onComplete) {
      if (!spec || !target || !scene || !scene.tweens) return null;
      var IGNORE = { trigger: 1, note: 1, name: 1, what: 1 };
      var cfg = {};
      for (var k in spec) {
        if (Object.prototype.hasOwnProperty.call(spec, k) && !IGNORE[k]) cfg[k] = spec[k];
      }
      cfg.targets = target;
      if (typeof onComplete === "function") cfg.onComplete = onComplete;
      return scene.tweens.add(cfg);
    },

    /* ----------------------------------------------------------
       tone(name, step)
       Plays a tiny Web Audio sound. No audio FILES anywhere: these
       are oscillator notes made on the spot. Names:

         "tap"      one short soft note      (a tile was tapped)
         "correct"  two rising notes         (right answer)
         "nudge"    one low mellow note      (not yet - try again;
                                              deliberately NOT a buzzer)
         "finish"   three-note rising chime  (the game is complete)

       It does nothing (and returns false) when the child or host
       Optional step (integer, default 0) raises the pitch by that
       many semitones, so a counting game can play tone("tap", i) on
       the i-th object and the child HEARS the count climb (one note
       per counted object, pitch rising with quantity).

       the browser has no AudioContext, or before the first user
       gesture (browsers refuse to make sound before a tap; the Start
       tap is that gesture). Returns true when a sound was scheduled.

       YOU CAN SAFELY CHANGE: the note tables below (frequencies in
       Hz, durations in seconds). Keep everything short and quiet.
       ---------------------------------------------------------- */
    tone: function (name, step) {
      if (!state.soundEnabled) return false;
      var AC = (typeof window !== "undefined") &&
               (window.AudioContext || window.webkitAudioContext);
      if (!AC) return false;
      try {
        if (!state.audioCtx) state.audioCtx = new AC();
        var ctx = state.audioCtx;
        if (ctx.state === "suspended" && ctx.resume) ctx.resume();
        var TABLE = {
          tap:     { type: "sine",     notes: [[440, 0.06]] },
          correct: { type: "sine",     notes: [[523, 0.09], [659, 0.12]] },
          nudge:   { type: "triangle", notes: [[330, 0.14]] },
          finish:  { type: "sine",     notes: [[523, 0.12], [659, 0.12], [784, 0.2]] }
        };
        var def = TABLE[name] || TABLE.tap;
        var shift = Math.pow(2, ((step | 0) || 0) / 12);
        var t = ctx.currentTime;
        for (var i = 0; i < def.notes.length; i++) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = def.type;
          osc.frequency.value = def.notes[i][0] * shift;
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + def.notes[i][1]);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + def.notes[i][1] + 0.02);
          t += def.notes[i][1];
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    /* ----------------------------------------------------------
       setSoundEnabled(v)
       Lets a game offer a mute toggle (labels: t("sound_on") /
       t("sound_off")). ?sound=off still wins at load; this only
       changes the setting for the rest of the session.
       ---------------------------------------------------------- */
    setSoundEnabled: function (v) {
      state.soundEnabled = !!v;
      this.soundEnabled = state.soundEnabled;
      return state.soundEnabled;
    },


    /* ----------------------------------------------------------
       preloadArt(scene, ART)
       Call in the scene's preload(): registers every ART entry of
       kind "svg" as a Phaser texture (key "art:<name>") from its
       inline SVG string, rasterised at 2x the declared size so it is
       crisp on high-density tablets. Entries of kind emoji / text /
       shape need no preload. Safe to call more than once.
       ---------------------------------------------------------- */
    preloadArt: function (scene, ART) {
      if (!scene || !scene.load || !ART) return;
      for (var name in ART) {
        if (!Object.prototype.hasOwnProperty.call(ART, name)) continue;
        var e = ART[name];
        if (!e || e.kind !== "svg" || typeof e.value !== "string") continue;
        var key = "art:" + name;
        if (scene.textures && scene.textures.exists && scene.textures.exists(key)) continue;
        var size = e.size || 64;
        // Phaser runs atob() on every "data:" URL, so the URL MUST be base64 (LCSArt.dataUrl).
        if (typeof LCSArt === "undefined" || !LCSArt.dataUrl) throw new Error("preloadArt: _lib/art.js must be loaded before game-core.js");
        var url = LCSArt.dataUrl(e.value);
        scene.load.svg(key, url, { width: (e.w || size) * 2, height: (e.h || size) * 2 });
      }
    },

    /* ----------------------------------------------------------
       drawArt(scene, ART, name, x, y, opts)
       The ONE way a game puts an ART entry on screen, centred at
       (x, y). Dispatches on entry.kind:
         "svg"    -> scene.add.image using the texture preloadArt made,
                     displayed at opts.size || entry.size (square) or
                     entry.w x entry.h
         "emoji"  -> scene.add.text (falls back to entry.fallback when
                     the glyph is missing — measured, not assumed)
         "text"   -> scene.add.text in THEME.font[entry.font]
         "shape"  -> scene.add.graphics drawing roundRect / rect /
                     circle / ellipse / polygon / line / arc with THEME
                     colour tokens named in entry.fill / entry.stroke
       Returns the game object. Games never call add.image / add.text
       for art directly, so the art upgrade stays one registry edit.
       ---------------------------------------------------------- */
    drawArt: function (scene, ART, name, x, y, opts) {
      opts = opts || {};
      var e = ART && ART[name];
      if (!e) throw new Error("drawArt: no ART entry '" + name + "'");
      var size = opts.size || e.size || 64;
      var tok = function (n, dflt) { return (THEME.colour[n] || THEME.colour[dflt || "ink"]); };

      if (e.kind === "svg") {
        var img = scene.add.image(x, y, "art:" + name);
        if (e.w && e.h) img.setDisplaySize(e.w * (size / (e.size || e.w)), e.h * (size / (e.size || e.w)));
        else img.setDisplaySize(size, size);
        return img;
      }
      if (e.kind === "emoji" || e.kind === "text") {
        var value = e.value;
        if (e.kind === "emoji" && e.fallback && typeof document !== "undefined") {
          // Measure: a missing glyph renders as the replacement box, whose
          // width equals U+FFFD's. Compare widths; fall back when equal.
          try {
            var c = document.createElement("canvas").getContext("2d");
            c.font = size + "px sans-serif";
            if (Math.abs(c.measureText(value).width - c.measureText("\uFFFD").width) < 0.5) value = e.fallback;
          } catch (err) { /* keep value */ }
        }
        return scene.add.text(x, y, value, {
          fontFamily: THEME.font[e.font || "body"] || THEME.font.body,
          fontSize: size + "px",
          color: tok(e.color, "ink").hex
        }).setOrigin(0.5);
      }
      if (e.kind === "shape") {
        var g = scene.add.graphics({ x: x, y: y });
        var w = e.w || size, h = e.h || size, r = e.r || size / 2;
        if (e.fill) g.fillStyle(tok(e.fill).num, e.alpha == null ? 1 : e.alpha);
        if (e.stroke) g.lineStyle(e.strokeWidth || 2, tok(e.stroke).num, 1);
        switch (e.shape) {
          case "roundRect":
            if (e.fill) g.fillRoundedRect(-w / 2, -h / 2, w, h, e.radius == null ? THEME.size.radiusSmall : e.radius);
            if (e.stroke) g.strokeRoundedRect(-w / 2, -h / 2, w, h, e.radius == null ? THEME.size.radiusSmall : e.radius);
            break;
          case "rect":
            if (e.fill) g.fillRect(-w / 2, -h / 2, w, h);
            if (e.stroke) g.strokeRect(-w / 2, -h / 2, w, h);
            break;
          case "circle":
            if (e.fill) g.fillCircle(0, 0, r);
            if (e.stroke) g.strokeCircle(0, 0, r);
            break;
          case "ellipse":
            if (e.fill) g.fillEllipse(0, 0, w, h);
            if (e.stroke) g.strokeEllipse(0, 0, w, h);
            break;
          case "polygon":
            var pts = (e.points || []).map(function (p) { return { x: p[0], y: p[1] }; });
            if (e.fill) g.fillPoints(pts, true);
            if (e.stroke) g.strokePoints(pts, true);
            break;
          case "line":
            g.lineBetween(-w / 2, 0, w / 2, 0);
            break;
          case "arc":
            var a0 = (e.start == null ? 0 : e.start) * Math.PI / 180, a1 = (e.end == null ? 360 : e.end) * Math.PI / 180;
            g.beginPath(); g.arc(0, 0, r, a0, a1, false); if (e.stroke) g.strokePath(); if (e.fill) g.fillPath();
            break;
          default:
            throw new Error("drawArt: unknown shape '" + e.shape + "' in ART." + name);
        }
        return g;
      }
      throw new Error("drawArt: unknown kind '" + e.kind + "' in ART." + name);
    },

    /* ============================================================
       KEYBOARD ACCESSIBILITY (internal plumbing used by makeButton)
       ============================================================ */

    /* ----------------------------------------------------------
       _registerButton(scene, api)
       Adds a button to the shared keyboard list and, the first time
       a scene uses it, hooks up Tab / arrows / Enter / Space for
       that scene. You do not call this directly; makeButton does.
       ---------------------------------------------------------- */
    _registerButton: function (scene, api) {
      state.buttons.push(api);

      // Hook the keyboard to this scene only once.
      if (state.keyboardScenes.indexOf(scene) === -1) {
        state.keyboardScenes.push(scene);
        if (scene.input && scene.input.keyboard) {
          scene.input.keyboard.on("keydown", function (event) {
            handleKey(scene, event);
          });
        }
        // When the scene shuts down or restarts, forget it so the
        // list does not grow forever across restarts.
        if (scene.events && scene.events.once) {
          scene.events.once("shutdown", function () {
            var at = state.keyboardScenes.indexOf(scene);
            if (at >= 0) state.keyboardScenes.splice(at, 1);
          });
        }
      }
    },

    /* ----------------------------------------------------------
       _removeButton(api)
       Takes a dead button out of the keyboard list so Tab skips it.
       Called automatically when a button is destroyed.
       ---------------------------------------------------------- */
    _removeButton: function (api) {
      var at = state.buttons.indexOf(api);
      if (at >= 0) state.buttons.splice(at, 1);
      if (state.focusIndex >= state.buttons.length) {
        state.focusIndex = state.buttons.length - 1;
      }
    },

    /* ----------------------------------------------------------
       setFocus(api)
       Moves the keyboard focus ring onto a given button. You can
       call this to send focus somewhere on purpose (for example
       focusing Start when a screen opens).
       ---------------------------------------------------------- */
    setFocus: function (api) {
      for (var i = 0; i < state.buttons.length; i++) {
        var isTarget = state.buttons[i] === api;
        state.buttons[i].setFocused(isTarget);
        if (isTarget) state.focusIndex = i;
      }
    },

    /* The language machinery for games that prefer calling these
       directly rather than through a button. */
    _state: state
  };

  /* ------------------------------------------------------------
     pruneButtons()
     Drops any buttons that have been destroyed, so Tab never lands
     on a ghost. Internal.
     ------------------------------------------------------------ */
  // (Defined here because it needs the closure over `state`.)
  function pruneButtons() {
    var alive = [];
    for (var i = 0; i < state.buttons.length; i++) {
      var c = state.buttons[i].container;
      // A destroyed Phaser object has active === false.
      if (c && c.active) alive.push(state.buttons[i]);
    }
    state.buttons = alive;
  }

  /* ------------------------------------------------------------
     handleKey(scene, event)
     Shared keyboard handler for a scene. Tab / Shift-Tab / arrows
     move the focus ring between buttons; Enter or Space presses
     whatever is focused. Internal.
     ------------------------------------------------------------ */
  function handleKey(scene, event) {
    pruneButtons();
    if (state.buttons.length === 0) return;

    var key = event.key;
    if (key === "Tab" && event.shiftKey) {
      event.preventDefault();
      moveFocus(-1);
    } else if (key === "Tab" || key === "ArrowRight" || key === "ArrowDown") {
      event.preventDefault();
      moveFocus(1);
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      event.preventDefault();
      moveFocus(-1);
    } else if (key === "Enter" || key === "Space") {
      if (state.focusIndex >= 0 && state.focusIndex < state.buttons.length) {
        event.preventDefault();
        state.buttons[state.focusIndex].activate();
      }
    }
  }

  /* ------------------------------------------------------------
     moveFocus(step)
     Moves the focus ring forward or backward by one, wrapping
     around the ends. Internal.
     ------------------------------------------------------------ */
  function moveFocus(step) {
    if (state.buttons.length === 0) return;
    var next = state.focusIndex + step;
    if (next < 0) next = state.buttons.length - 1;
    if (next >= state.buttons.length) next = 0;
    for (var i = 0; i < state.buttons.length; i++) {
      state.buttons[i].setFocused(i === next);
    }
    state.focusIndex = next;
  }

})();

/* Expose it on the window too, so inline scripts and the game file
   can both reach GameCore however they like. */
if (typeof window !== "undefined") {
  window.GameCore = GameCore;
}
