/* ============================================================
   art.js  —  the shared VECTOR art library for all games
   ------------------------------------------------------------
   Load AFTER theme.js and BEFORE game-core.js:
       <script src="../_lib/theme.js"></script>
       <script src="../_lib/ui-strings.js"></script>
       <script src="../_lib/art.js"></script>
       <script src="../_lib/phaser-3.90.0.min.js"></script>
       <script src="../_lib/game-core.js"></script>

   WHAT THIS IS
     Every recurring picture in the games — the mascots (fox, hen,
     owl …), their poses, and the everyday objects — is drawn ONCE
     here as inline SVG text, to the rules in games/ART-BIBLE.md,
     and reused by every game that needs it. No binary files.

   HOW A GAME USES IT
     In its ART registry a game writes
         fox: { kind: "svg", value: LCSArt.get("fox.idle"), size: 96 }
     and draws it with GameCore.drawArt(scene, ART, "fox", x, y).
     A game may also inline a one-off SVG string in its own ART
     entry; only art that at least two games share belongs here.

   ENTRY SHAPE
     LCSArt.register("fox.idle", {
       w: 96, h: 96,                  // the SVG's viewBox size (design units)
       svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'>…</svg>",
       by: "artist-agent, 2026-09-xx", // provenance
       bible: "mascot §3.2"           // which ART-BIBLE rule it follows
     });

   RULES (from ART-BIBLE.md; the check-build gate enforces some)
     - Colours are THEME tokens by name inside the SVG: write
       fill="var(--structure)" and the library's url() resolves them
       through LCSArt.tokens() at data-URL time, so the palette stays
       one edit. Plain hex is allowed ONLY for the two tints the bible
       defines per token (listed in ART-BIBLE §2).
     - Every SVG has an explicit viewBox and no external references
       (no <image href>, no fonts, no filters heavier than a soft
       drop shadow).
     - Names are dotted: "<subject>.<pose|part>" — fox.idle, fox.happy,
       fox.munch, berry, bowl, bowl.full, tile.card …
   ============================================================ */
var LCSArt = (function () {
  /* base64Utf8(str) — dependency-free (no Buffer, no btoa): the unit tests run this file
   * in a bare VM context, and the browser needs UTF-8 bytes, not UTF-16 code units. */
  var B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function base64Utf8(str) {
    var bytes = [], i, c;
    for (i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      if (c >= 0xD800 && c <= 0xDBFF && i + 1 < str.length) { c = 0x10000 + ((c - 0xD800) << 10) + (str.charCodeAt(++i) - 0xDC00); }
      if (c < 0x80) bytes.push(c);
      else if (c < 0x800) bytes.push(0xC0 | (c >> 6), 0x80 | (c & 63));
      else if (c < 0x10000) bytes.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
      else bytes.push(0xF0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    var out = "", j;
    for (j = 0; j < bytes.length; j += 3) {
      var a = bytes[j], b = bytes[j + 1], d = bytes[j + 2];
      var n = (a << 16) | ((b || 0) << 8) | (d || 0);
      out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + (b === undefined ? "=" : B64[(n >> 6) & 63]) + (d === undefined ? "=" : B64[n & 63]);
    }
    return out;
  }

  var lib = {};

  /* THEME colour tokens as CSS custom properties, injected into each
     SVG so entries can say fill="var(--structure)". THEME must be
     loaded first. */
  function tokens() {
    var out = "";
    if (typeof THEME !== "undefined" && THEME.colour) {
      for (var k in THEME.colour) {
        if (Object.prototype.hasOwnProperty.call(THEME.colour, k)) {
          out += "--" + k + ":" + THEME.colour[k].hex + ";";
        }
      }
    }
    return out;
  }

  /* Resolve var(--token) to hex inside an SVG string. Phaser loads the
     SVG as an <img>, and some browsers do not honour CSS variables in
     an <img>-loaded SVG, so we substitute them literally. */
  function resolve(svg) {
    if (typeof THEME === "undefined" || !THEME.colour) return svg;
    return svg.replace(/var\(--([a-zA-Z0-9]+)\)/g, function (m, name) {
      return THEME.colour[name] ? THEME.colour[name].hex : m;
    });
  }

  return {
    /* register(name, entry) — adds or replaces an entry. Returns it. */
    register: function (name, entry) {
      if (!entry || typeof entry.svg !== "string") {
        throw new Error("LCSArt.register: entry.svg must be an SVG string (" + name + ")");
      }
      if (!/viewBox=/.test(entry.svg)) {
        throw new Error("LCSArt.register: SVG needs an explicit viewBox (" + name + ")");
      }
      lib[name] = entry;
      return entry;
    },
    /* get(name) — the resolved SVG string (tokens substituted), or throws
       so a typo is caught at load time, never at draw time. */
    get: function (name) {
      var e = lib[name];
      if (!e) throw new Error("LCSArt.get: no entry named '" + name + "'");
      return resolve(e.svg);
    },
    /* entry(name) — the raw entry (w, h, svg, provenance). */
    entry: function (name) { return lib[name] || null; },
    has: function (name) { return Object.prototype.hasOwnProperty.call(lib, name); },
    names: function () { return Object.keys(lib).sort(); },
    /* dataUrl(svg) — an SVG string as a BASE64 data URL. Phaser (≥ 3.60) treats every
     * "data:" URL as base64 and runs atob() on it, so a percent-encoded form throws
     * InvalidCharacterError at load time (found by the harness self-test, 2026-09-05). */
    dataUrl: function (svg) {
      return "data:image/svg+xml;base64," + base64Utf8(resolve(svg));
    },
    tokens: tokens,
    resolve: resolve
  };
})();

/* ------------------------------------------------------------
   TEST-ONLY entry. It exists so the library and drawArt can be
   tested without any real art; it is NOT a bible-quality asset and
   no game may use it. Real entries are added per game by the artist
   agents (see BUILD-WORKFLOW.md) and listed in ART-BIBLE.md §7.
   ------------------------------------------------------------ */
LCSArt.register("_probe.dot", {
  w: 32, h: 32,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='var(--structure)' stroke='var(--ink)' stroke-width='2'/></svg>",
  by: "test fixture",
  bible: "none — test only"
});

if (typeof window !== "undefined") { window.LCSArt = LCSArt; }
