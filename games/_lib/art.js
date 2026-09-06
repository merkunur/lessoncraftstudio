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


/* ------------------------------------------------------------
   GAME 002 "Number Nest" - the first real art in this library.
   The hen is the template for the 50-mascot roster (ART-BIBLE §3):
   ONE shared body string plus a swapped head group per pose is what
   keeps the four poses reading as one bird. Keep that structure for
   the other 49 characters.
   ------------------------------------------------------------ */
LCSArt.register("hen.idle", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='23' ry='3.4' fill='var(--ink)' opacity='.08'/><path d='M30,73C21,71 11,68 6,61C11,61 15,59 18,56C12,52 5,48 3,41C9,43 14,43 18,41C14,35 12,30 13,24C19,30 25,39 29,49Z' fill='#E9E1D2' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><g fill='none' stroke-linecap='round'><path d='M36,74L36,83M60,74L60,83' stroke='var(--ink)' stroke-width='8'/><path d='M36,83L29,86.7M36,83L36,87M36,83L43,86.7M60,83L53,86.7M60,83L60,87M60,83L67,86.7' stroke='var(--ink)' stroke-width='6.5'/><path d='M36,74L36,83M60,74L60,83' stroke='#F6A07E' stroke-width='5'/><path d='M36,83L29,86.7M36,83L36,87M36,83L43,86.7M60,83L53,86.7M60,83L60,87M60,83L67,86.7' stroke='#F6A07E' stroke-width='3.5'/></g><ellipse cx='48' cy='60' rx='29' ry='20' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3'/><ellipse cx='50' cy='64' rx='17' ry='10' fill='#FFFFFF'/><path d='M28,52C22,58 21,70 29,75C24,68 24,59 28,52Z' fill='#E9E1D2'/><g><path d='M62,55C71,57 74,67 66,73C56,80 44,79 38,75C48,71 52,58 62,55Z' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M64,62C58,66 52,69 45,72M66,68C60,72 54,75 47,76' fill='none' stroke='var(--inkSoft)' stroke-width='1.5' stroke-linecap='round'/></g><path d='M33,18C31,11 34,6 38,7C40,7 41,9 42,12C43,6 46,3 49,4C51.5,5 52,8.5 52.5,12C54,7 58,5 60,8C63,11 64,15 63,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><g><circle cx='48' cy='32' r='21' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3'/><path d='M31,21C27.2,28 27.5,40 34,46C30,39 29,29 31,21Z' fill='#E9E1D2'/><ellipse cx='50' cy='41' rx='13' ry='7' fill='#FFFFFF'/><ellipse cx='46.2' cy='55.5' rx='3.2' ry='4.6' transform='rotate(-12 46.2 55.5)' fill='#C2603C' stroke='var(--ink)' stroke-width='2.4'/><ellipse cx='51.8' cy='55.5' rx='3.2' ry='4.6' transform='rotate(12 51.8 55.5)' fill='#C2603C' stroke='var(--ink)' stroke-width='2.4'/><circle cx='40' cy='34' r='7' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='56' cy='34' r='7' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='40' cy='34' r='3.5' fill='var(--ink)'/><circle cx='56' cy='34' r='3.5' fill='var(--ink)'/><path d='M42.5,44L55.5,44L49,54Z' fill='#F6A07E' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - roster template, neutral. NOTE: the beak does not carry the silhouette (front-facing head sits inside the body outline); comb, tail and feet do."
});
LCSArt.register("hen.think", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='23' ry='3.4' fill='var(--ink)' opacity='.08'/><path d='M30,73C21,71 11,68 6,61C11,61 15,59 18,56C12,52 5,48 3,41C9,43 14,43 18,41C14,35 12,30 13,24C19,30 25,39 29,49Z' fill='#E9E1D2' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><g fill='none' stroke-linecap='round'><path d='M36,74L36,83M60,74L60,83' stroke='var(--ink)' stroke-width='8'/><path d='M36,83L29,86.7M36,83L36,87M36,83L43,86.7M60,83L53,86.7M60,83L60,87M60,83L67,86.7' stroke='var(--ink)' stroke-width='6.5'/><path d='M36,74L36,83M60,74L60,83' stroke='#F6A07E' stroke-width='5'/><path d='M36,83L29,86.7M36,83L36,87M36,83L43,86.7M60,83L53,86.7M60,83L60,87M60,83L67,86.7' stroke='#F6A07E' stroke-width='3.5'/></g><ellipse cx='48' cy='60' rx='29' ry='20' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3'/><ellipse cx='50' cy='64' rx='17' ry='10' fill='#FFFFFF'/><path d='M28,52C22,58 21,70 29,75C24,68 24,59 28,52Z' fill='#E9E1D2'/><g><path d='M62,55C71,57 74,67 66,73C56,80 44,79 38,75C48,71 52,58 62,55Z' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M64,62C58,66 52,69 45,72M66,68C60,72 54,75 47,76' fill='none' stroke='var(--inkSoft)' stroke-width='1.5' stroke-linecap='round'/></g><path d='M33,18C31,11 34,6 38,7C40,7 41,9 42,12C43,6 46,3 49,4C51.5,5 52,8.5 52.5,12C54,7 58,5 60,8C63,11 64,15 63,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><g transform='rotate(7 48 50)'><circle cx='48' cy='32' r='21' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3'/><path d='M31,21C27.2,28 27.5,40 34,46C30,39 29,29 31,21Z' fill='#E9E1D2'/><ellipse cx='50' cy='41' rx='13' ry='7' fill='#FFFFFF'/><ellipse cx='46.2' cy='55.5' rx='3.2' ry='4.6' transform='rotate(-12 46.2 55.5)' fill='#C2603C' stroke='var(--ink)' stroke-width='2.4'/><ellipse cx='51.8' cy='55.5' rx='3.2' ry='4.6' transform='rotate(12 51.8 55.5)' fill='#C2603C' stroke='var(--ink)' stroke-width='2.4'/><circle cx='40' cy='34' r='7' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='56' cy='34' r='7' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='43' cy='34' r='3.5' fill='var(--ink)'/><circle cx='59' cy='34' r='3.5' fill='var(--ink)'/><path d='M42.5,44L55.5,44L49,54Z' fill='#F6A07E' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - head +7deg toward the nest, pupils +3. Comb rotates with the skull on purpose; a comb that stays put while the head turns detaches."
});
LCSArt.register("hen.happy", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='23' ry='3.4' fill='var(--ink)' opacity='.08'/><path d='M30,73C21,71 11,68 6,61C11,61 15,59 18,56C12,52 5,48 3,41C9,43 14,43 18,41C14,35 12,30 13,24C19,30 25,39 29,49Z' fill='#E9E1D2' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><g fill='none' stroke-linecap='round'><path d='M36,74L36,83M60,74L60,83' stroke='var(--ink)' stroke-width='8'/><path d='M36,83L29,86.7M36,83L36,87M36,83L43,86.7M60,83L53,86.7M60,83L60,87M60,83L67,86.7' stroke='var(--ink)' stroke-width='6.5'/><path d='M36,74L36,83M60,74L60,83' stroke='#F6A07E' stroke-width='5'/><path d='M36,83L29,86.7M36,83L36,87M36,83L43,86.7M60,83L53,86.7M60,83L60,87M60,83L67,86.7' stroke='#F6A07E' stroke-width='3.5'/></g><ellipse cx='48' cy='60' rx='29' ry='20' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3'/><ellipse cx='50' cy='64' rx='17' ry='10' fill='#FFFFFF'/><path d='M28,52C22,58 21,70 29,75C24,68 24,59 28,52Z' fill='#E9E1D2'/><g transform='rotate(14 62 56)'><path d='M62,55C71,57 74,67 66,73C56,80 44,79 38,75C48,71 52,58 62,55Z' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M64,62C58,66 52,69 45,72M66,68C60,72 54,75 47,76' fill='none' stroke='var(--inkSoft)' stroke-width='1.5' stroke-linecap='round'/></g><path d='M33,18C31,11 34,6 38,7C40,7 41,9 42,12C43,6 46,3 49,4C51.5,5 52,8.5 52.5,12C54,7 58,5 60,8C63,11 64,15 63,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><g><circle cx='48' cy='32' r='21' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3'/><path d='M31,21C27.2,28 27.5,40 34,46C30,39 29,29 31,21Z' fill='#E9E1D2'/><ellipse cx='50' cy='41' rx='13' ry='7' fill='#FFFFFF'/><ellipse cx='46.2' cy='55.5' rx='3.2' ry='4.6' transform='rotate(-12 46.2 55.5)' fill='#C2603C' stroke='var(--ink)' stroke-width='2.4'/><ellipse cx='51.8' cy='55.5' rx='3.2' ry='4.6' transform='rotate(12 51.8 55.5)' fill='#C2603C' stroke='var(--ink)' stroke-width='2.4'/><path d='M34,37Q40,29 46,37M50,37Q56,29 62,37' fill='none' stroke='var(--ink)' stroke-width='2.5' stroke-linecap='round'/><path d='M43,47L55,47L49,58Z' fill='#C2603C'/><path d='M42.5,44L55.5,44L49,48.5Z' fill='#F6A07E' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M44,54L54,54L49,59Z' fill='#F6A07E' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - crescent eyes, open beak, wing +14deg"
});
LCSArt.register("hen.oops", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='23' ry='3.4' fill='var(--ink)' opacity='.08'/><path d='M30,73C21,71 11,68 6,61C11,61 15,59 18,56C12,52 5,48 3,41C9,43 14,43 18,41C14,35 12,30 13,24C19,30 25,39 29,49Z' fill='#E9E1D2' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><g fill='none' stroke-linecap='round'><path d='M36,74L36,83M60,74L60,83' stroke='var(--ink)' stroke-width='8'/><path d='M36,83L29,86.7M36,83L36,87M36,83L43,86.7M60,83L53,86.7M60,83L60,87M60,83L67,86.7' stroke='var(--ink)' stroke-width='6.5'/><path d='M36,74L36,83M60,74L60,83' stroke='#F6A07E' stroke-width='5'/><path d='M36,83L29,86.7M36,83L36,87M36,83L43,86.7M60,83L53,86.7M60,83L60,87M60,83L67,86.7' stroke='#F6A07E' stroke-width='3.5'/></g><ellipse cx='48' cy='60' rx='29' ry='20' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3'/><ellipse cx='50' cy='64' rx='17' ry='10' fill='#FFFFFF'/><path d='M28,52C22,58 21,70 29,75C24,68 24,59 28,52Z' fill='#E9E1D2'/><g><path d='M62,55C71,57 74,67 66,73C56,80 44,79 38,75C48,71 52,58 62,55Z' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M64,62C58,66 52,69 45,72M66,68C60,72 54,75 47,76' fill='none' stroke='var(--inkSoft)' stroke-width='1.5' stroke-linecap='round'/></g><path d='M33,18C31,11 34,6 38,7C40,7 41,9 42,12C43,6 46,3 49,4C51.5,5 52,8.5 52.5,12C54,7 58,5 60,8C63,11 64,15 63,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><g><circle cx='48' cy='32' r='21' fill='var(--surface2)' stroke='var(--ink)' stroke-width='3'/><path d='M31,21C27.2,28 27.5,40 34,46C30,39 29,29 31,21Z' fill='#E9E1D2'/><ellipse cx='50' cy='41' rx='13' ry='7' fill='#FFFFFF'/><ellipse cx='46.2' cy='55.5' rx='3.2' ry='4.6' transform='rotate(-12 46.2 55.5)' fill='#C2603C' stroke='var(--ink)' stroke-width='2.4'/><ellipse cx='51.8' cy='55.5' rx='3.2' ry='4.6' transform='rotate(12 51.8 55.5)' fill='#C2603C' stroke='var(--ink)' stroke-width='2.4'/><circle cx='39' cy='34' r='8' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='57' cy='34' r='8' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='39' cy='34' r='3' fill='var(--ink)'/><circle cx='57' cy='34' r='3' fill='var(--ink)'/><path d='M31,25Q39,18 47,25M49,25Q57,18 65,25' fill='none' stroke='var(--ink)' stroke-width='2.5' stroke-linecap='round'/><ellipse cx='49' cy='48.5' rx='5' ry='6' fill='#F6A07E' stroke='var(--ink)' stroke-width='3'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - SURPRISE, never disapproval: brows arch UP and OUT, beak is an 'o'. Eye centres 18 apart (not 16) because two r-8 whites at 16 intersect into a visible lens."
});
LCSArt.register("egg", {
  w: 64, h: 64,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path d='M32,1.5C44,1.5 55,20 55,38C55,52 45,62.5 32,62.5C19,62.5 9,52 9,38C9,20 20,1.5 32,1.5Z' fill='var(--surface)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M49,28C52.5,41 46,55 33,59C44,52 49,41 49,28Z' fill='#E9E1D2'/></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "object §4 - PLAIN and undecorated: a decorated egg reads as Easter in de/nl/sv/da/no, and colour variation between eggs invites sorting rather than counting. BINDING: the opaque ovoid must stay <=36 wide and <=48 tall, or the 12px counting clearance fails (1.0px / 1.5px of headroom at 35 x 46.5)."
});
LCSArt.register("nest", {
  w: 360, h: 152,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 152'><path d='M16.0,64.0 L9.6,66.3' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M16.7,58.5 L2.8,57.4' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M19.0,53.0 L9.1,47.5' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M22.6,47.7 L12.7,48.7' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M27.7,42.4 L20.3,40.1' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M34.2,37.4 L24.9,28.1' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M42.0,32.6 L29.2,31.1' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M51.1,28.1 L42.4,22.7' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M61.3,24.0 L57.9,17.3' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M72.6,20.2 L66.3,17.8' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M84.9,16.8 L76.7,7.6' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M98.0,13.8 L96.8,4.2' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M111.9,11.2 L104.4,6.0' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M126.4,9.2 L123.7,3.1' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M141.3,7.6 L144.1,-4.2' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M156.7,6.6 L149.7,-2.2' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M172.2,6.1 L171.7,-2.7' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M187.8,6.1 L191.9,-0.4' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M203.3,6.6 L201.4,1.2' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M218.7,7.6 L222.0,-3.2' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M233.6,9.2 L241.8,2.2' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M248.1,11.2 L248.2,3.2' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M262.0,13.8 L266.0,8.2' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M275.1,16.8 L288.1,10.7' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M287.4,20.2 L291.2,10.2' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M298.7,24.0 L306.7,17.9' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M308.9,28.1 L317.6,26.4' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M318.0,32.6 L321.8,28.0' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M325.8,37.4 L338.2,32.3' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M332.3,42.4 L344.2,42.8' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M337.4,47.7 L345.0,42.5' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M341.0,53.0 L348.9,51.8' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round' fill='none'/><path d='M343.3,58.5 L357.5,62.3' stroke='var(--ink)' stroke-width='3.2' stroke-linecap='round' fill='none'/><path d='M344.0,64.0 L355.9,59.8' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round' fill='none'/><path d='M10,58Q14,30 52,22Q112,10 180,10Q248,10 308,22Q346,30 350,58Q352,104 300,126Q244,146 180,146Q116,146 60,126Q8,104 10,58Z' fill='#E9E1D2' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M52,34Q112,20 180,18Q248,20 308,34' stroke='#FFFFFF' stroke-width='2' stroke-opacity='.55' stroke-linecap='round' fill='none'/><ellipse cx='180' cy='58' rx='146' ry='40' fill='#E9E1D2'/><ellipse cx='180' cy='58' rx='146' ry='40' fill='var(--ink)' fill-opacity='.13'/><path d='M40,44Q110,26 180,24Q250,26 320,44' stroke='var(--ink)' stroke-width='1.6' stroke-opacity='.30' stroke-linecap='round' fill='none'/><path d='M26,66Q100,44 180,42Q260,44 334,66' stroke='var(--ink)' stroke-width='1.6' stroke-opacity='.30' stroke-linecap='round' fill='none'/></svg>",
  by: "artist-agent + build revisions, 2026-09-06",
  bible: "object §4 - the BACK of the nest, drawn BEFORE the eggs. NON-SQUARE: a game ART row MUST set size===w or drawArt renders a 64x27 stamp with no error. Straw is the surface2 DARKER tint, not structure teal - a bright flat teal interior reads as water and the whole thing as a bathtub, which is what the first three drafts did. The cup is deep and recessed with ink at 13pc so the eggs sit DOWN IN it."
});

LCSArt.register("nest.rim", {
  w: 360, h: 152,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 152'><path d='M10,58Q8,104 60,126Q116,146 180,146Q244,146 300,126Q352,104 350,58Q344,96 300,112Q242,132 180,132Q118,132 60,112Q16,96 10,58Z' fill='#E9E1D2' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M34,96Q108,124 180,128Q252,124 326,96' stroke='var(--ink)' stroke-width='1.5' stroke-opacity='.28' stroke-linecap='round' fill='none'/><path d='M46,112Q114,134 180,138Q246,134 314,112' stroke='var(--ink)' stroke-width='1.5' stroke-opacity='.28' stroke-linecap='round' fill='none'/><path d='M70,104 L86,120' stroke='#10564B' stroke-width='1.3' stroke-opacity='.30' stroke-linecap='round' fill='none'/><path d='M118,116 L132,132' stroke='#10564B' stroke-width='1.3' stroke-opacity='.30' stroke-linecap='round' fill='none'/><path d='M180,120 L192,136' stroke='#10564B' stroke-width='1.3' stroke-opacity='.30' stroke-linecap='round' fill='none'/><path d='M240,116 L254,132' stroke='#10564B' stroke-width='1.3' stroke-opacity='.30' stroke-linecap='round' fill='none'/><path d='M292,104 L306,118' stroke='#10564B' stroke-width='1.3' stroke-opacity='.30' stroke-linecap='round' fill='none'/></svg>",
  by: "artist-agent + build revisions, 2026-09-06",
  bible: "object §4 - the NEAR rim of the nest, drawn AFTER the eggs so their bases tuck behind it. Without this the eggs read as stuck to the outside of the bowl. Same 360x152 frame and same centre as nest, so the two register exactly."
});

/* ------------------------------------------------------------
   GAME 001 "The Fox's Bowl" - the countable object and the vessel.
   The berry is the second countable instance in the library (after
   egg) and the bowl pair is the second container pair (after nest /
   nest.rim). Both pairs exist for the same reason: things that go
   INTO something must be occluded by its near edge, or they read as
   stuck to the outside.
   ------------------------------------------------------------ */
LCSArt.register("berry", {
  w: 64, h: 64,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='26' fill='#55555F'/><path d='M28.4,11.3A21,21 0 0 0 11.3,35.7L19.7,34.2A12.5,12.5 0 0 1 29.8,19.7Z' fill='#9A9AA5'/><circle cx='32' cy='32' r='26' fill='none' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><ellipse cx='32' cy='11.5' rx='4.2' ry='2.7' fill='var(--ink)' fill-opacity='.30'/><path d='M32,11L32,3.5M32,11L36.3,4.9M32,11L27.7,4.9M32,11L39.1,8.4M32,11L24.9,8.4' fill='none' stroke='var(--ink)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "object §4 - the countable instance: IDENTICAL every time, no stem, no leaf, no per-berry colour (decoration invites sorting rather than counting - the egg's recorded lesson). It is a DARK bilberry in the inkSoft darker tint #55555F on purpose: coral would spend the one-coral-per-screen budget ten times over, teal would lose figure/ground inside a teal 'counted' cell at exactly the moment the child re-counts, and white is already egg. BINDING: opaque circle d=52 (r26 at 32,32) = 30.9px at a 38px draw, which clears the 12px counting gap on any pitch >=45px. The 5-tick calyx crown is LOAD-BEARING - without it a berry is a plain dot and collides with the count-marker cue - but keep the ticks in a NARROW upward fan (+-70deg): a wider fan plus an enclosing ring reads as an INSECT sitting on the fruit at 128px, and is invisible at the size the gate screenshots. Master stroke 3 leaves 1.8px of line at a 38px draw, so 38 is the practical floor: draw it larger, never thin the master."
});

LCSArt.register("bowl", {
  w: 96, h: 44,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 44'><path d='M3,17C3,35 19,41 48,41C77,41 93,35 93,17A45,11 0 0 0 3,17Z' fill='#E9E1D2' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M14,12.7Q48,4.6 82,12.7' fill='none' stroke='#FFFFFF' stroke-width='2' stroke-opacity='.5' stroke-linecap='round'/><ellipse cx='48' cy='19' rx='39' ry='7' fill='#E9E1D2'/><ellipse cx='48' cy='19' rx='39' ry='7' fill='var(--ink)' fill-opacity='.20'/><path d='M16,17Q48,12 80,17' fill='none' stroke='var(--ink)' stroke-width='1.5' stroke-opacity='.28' stroke-linecap='round'/></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "object §4 - the BACK and body of the bowl, drawn BEFORE the berries; its partner bowl.rim is drawn AFTER them. NON-SQUARE (§9.1): a consuming game's ART row MUST set size===w (96) or drawArt scales it by 64/96 and renders a 64x29 postage stamp with NO error and NO console warning - this has already bitten once. BODY is the surface2 DARKER tint #E9E1D2, NOT var(--surface2): #FBF6EE on the #FBF3E4 stage differs by three units, so the vessel read as a bare outline instead of an object (measured on the first render). The hollow is the same tint plus ink at 20pc and carries NO stroke of its own (the nest precedent): the tonal step alone is what makes a berry sit DOWN IN it, and a hard inner ellipse stroke both fights the near lip that bowl.rim draws over the top and squeezes the far rim band to about 2.5 units of visible cream. It is a child's cereal bowl - wide, shallow, softly rounded, no pedestal foot, no handles, no pattern; a foot or a straight-walled trough reads as an animal's floor-level feeder."
});

LCSArt.register("bowl.rim", {
  w: 96, h: 44,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 44'><path d='M3,17C3,35 19,41 48,41C77,41 93,35 93,17L87,19A39,7 0 0 1 9,19L3,17Z' fill='#E9E1D2' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M12,22.5Q48,30 84,22.5' fill='none' stroke='#FFFFFF' stroke-width='2' stroke-opacity='.5' stroke-linecap='round'/><path d='M10,29Q48,39 86,29' fill='none' stroke='var(--ink)' stroke-width='1.5' stroke-opacity='.28' stroke-linecap='round'/><path d='M22,34Q48,41 74,34' fill='none' stroke='var(--ink)' stroke-width='1.5' stroke-opacity='.28' stroke-linecap='round'/></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "object §4 - the NEAR lip and front wall of the same bowl, drawn AFTER the berries so an arriving berry tucks behind it. Without this entry the berries read as stuck to the OUTSIDE of the dish, which is the exact defect the operator reported on the first game's nest. NON-SQUARE (§9.1): the consuming game's ART row MUST set size===w (96) - same silent postage-stamp trap as bowl. Registration is BY CONSTRUCTION, not by eye: the outer path 'M3,17C3,35 19,41 48,41C77,41 93,35 93,17' is byte-identical to bowl's front silhouette and both use the same 96x44 frame and the same centre, so the two register only if the game draws them at the same x,y AND the same size. If you ever edit one silhouette, edit the other in the same commit or the pair splits open."
});

/* ------------------------------------------------------------
   GAME 001 "The Fox's Bowl" - the SECOND mascot of the 50-character
   roster, built to the hen's template: ONE shared body string plus a
   swapped head group per pose, with the TAIL as the single varying
   <g transform> (the hen varies its wing exactly this way). Where the
   hen's beak sits inside the body outline and carries nothing, the
   fox's MUZZLE BREAKS the skull, and the silhouette load runs tail
   plume -> ears -> muzzle.

   The body is #C2603C, the accent DARKER tint, and that is the fox's
   ART-BIBLE §9.2 identity feature. Under the new §9.4 warm-body clause
   it spends the entire exemption: NO #F6A07E and NO #F2784B appears
   anywhere on this character, and the consuming game may declare only
   one small geometric accent, well clear of the fox. The three
   alternatives were each rejected on evidence - a light-coral body is
   indistinguishable from state coral to a five-year-old, a near-white
   body repeats the hen's still-open separation weakness on a bigger
   character, and a teal body collides SEMANTICALLY because teal
   already means counted / chosen / correct.
   ------------------------------------------------------------ */
LCSArt.register("fox.idle", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='24' ry='3.4' fill='var(--ink)' opacity='.08'/><g transform='rotate(0 24 58)'><path d='M32,70C20,71 5,65 4,52C3,42 3.5,30 9,23.5C14,19 21.5,23 23.5,33C27,43 29,53 33,62C36,65.5 37,67.5 38,69Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M32,70C20,71 5,65 4,52C3.2,44 3.6,34 7,27C7,38 10,51 16,60C21,67 28,69.5 32,70Z' fill='var(--ink)' fill-opacity='.12'/><path d='M6.2,40C5.2,32.5 6.4,27 11,24C15.4,21.2 20.4,24.4 22,31.4C15.6,31.6 10.2,34.8 6.2,40Z' fill='#FFFFFF'/></g><path d='M27,62L27,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><ellipse cx='42' cy='59' rx='26' ry='15' fill='#C2603C' stroke='var(--ink)' stroke-width='3'/><path d='M51,46C62,49 66,58 62,67C57,73 46,74 40,70C46,64 45,52 51,46Z' fill='#FFFFFF'/><path d='M58,64L58,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M58,64L58,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M58,81L58,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><g><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='var(--ink)' fill-opacity='.12'/><path d='M55,14.5Q61,11 64,3Q65,14.7 69,26.5Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,15.5Q62,12.5 64,7Q64.3,15 66,22.5Z' fill='var(--ink)' fill-opacity='.12'/><path d='M68.3,38A19,19 0 1 0 60.6,48.8C66,55.4 72,56.2 77,53.6C80.7,51.8 81.4,46.8 79.8,44C78.2,41.2 74,38.8 68.3,38Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M34.6,23C31.2,29.4 31.5,40.2 37.3,45.7C33.7,39.3 32.8,30.3 34.6,23Z' fill='var(--ink)' fill-opacity='.12'/><path d='M60.6,48.8C65,49.6 72,50.4 78.8,47.8C80.6,49.6 79.8,52 77,53.6C72,56.2 66,55.4 60.6,48.8Z' fill='#FFFFFF'/><path d='M69.8,43.4L75.4,45.6L72,49.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='2' stroke-linejoin='round'/><path d='M72,49.6L71.8,50.6M67.8,50.4Q70.2,52 71.8,50.6' fill='none' stroke='var(--ink)' stroke-width='2.2' stroke-linecap='round'/><circle cx='44' cy='34' r='6.5' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='60' cy='34' r='6.5' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='44' cy='34' r='3.2' fill='var(--ink)'/><circle cx='60' cy='34' r='3.2' fill='var(--ink)'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - the fox, neutral. BINDING: skull and snout are ONE path. A separately stroked muzzle draws its back edge straight through the near eye and across the cheek (measured on the first draft) - the single outline is what lets the snout break the silhouette AND keeps the face clean. The snout is russet with a WHITE CHIN only; filling the whole snout white makes it read as a beak. Shadow cy/ry copy the hen so the two stand on one ground line (measured: fox feet y90.0, hen y90.25). NO coral anywhere - the #C2603C body already spends the whole accent budget (§9.2 identity tint, §9.4 warm-body clause). Blackout-verified: 62pc ink coverage against the hen's 64pc on the same harness, four distinct spikes on the top edge, ink reaching column 1 (plume) and column 40 (muzzle) at a 48px draw."
});
LCSArt.register("fox.think", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='24' ry='3.4' fill='var(--ink)' opacity='.08'/><g transform='rotate(0 24 58)'><path d='M32,70C20,71 5,65 4,52C3,42 3.5,30 9,23.5C14,19 21.5,23 23.5,33C27,43 29,53 33,62C36,65.5 37,67.5 38,69Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M32,70C20,71 5,65 4,52C3.2,44 3.6,34 7,27C7,38 10,51 16,60C21,67 28,69.5 32,70Z' fill='var(--ink)' fill-opacity='.12'/><path d='M6.2,40C5.2,32.5 6.4,27 11,24C15.4,21.2 20.4,24.4 22,31.4C15.6,31.6 10.2,34.8 6.2,40Z' fill='#FFFFFF'/></g><path d='M27,62L27,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><ellipse cx='42' cy='59' rx='26' ry='15' fill='#C2603C' stroke='var(--ink)' stroke-width='3'/><path d='M51,46C62,49 66,58 62,67C57,73 46,74 40,70C46,64 45,52 51,46Z' fill='#FFFFFF'/><path d='M58,64L58,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M58,64L58,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M58,81L58,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><g transform='rotate(6 50 52)'><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='var(--ink)' fill-opacity='.12'/><path d='M55,14.5Q61,11 64,3Q65,14.7 69,26.5Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,15.5Q62,12.5 64,7Q64.3,15 66,22.5Z' fill='var(--ink)' fill-opacity='.12'/><path d='M68.3,38A19,19 0 1 0 60.6,48.8C66,55.4 72,56.2 77,53.6C80.7,51.8 81.4,46.8 79.8,44C78.2,41.2 74,38.8 68.3,38Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M34.6,23C31.2,29.4 31.5,40.2 37.3,45.7C33.7,39.3 32.8,30.3 34.6,23Z' fill='var(--ink)' fill-opacity='.12'/><path d='M60.6,48.8C65,49.6 72,50.4 78.8,47.8C80.6,49.6 79.8,52 77,53.6C72,56.2 66,55.4 60.6,48.8Z' fill='#FFFFFF'/><path d='M69.8,43.4L75.4,45.6L72,49.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='2' stroke-linejoin='round'/><path d='M72,49.6L71.8,50.6M67.8,50.4Q70.2,52 71.8,50.6' fill='none' stroke='var(--ink)' stroke-width='2.2' stroke-linecap='round'/><circle cx='44' cy='34' r='6.5' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='60' cy='34' r='6.5' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='46.5' cy='34' r='3.2' fill='var(--ink)'/><circle cx='62.5' cy='34' r='3.2' fill='var(--ink)'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - head +6deg about the neck at (50,52), pupils +2.5x toward the thing the child should look at. BINDING: the EARS sit INSIDE the rotating <g>; a feature that stays put while the skull turns visually detaches (the hen's comb lesson)."
});
LCSArt.register("fox.happy", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='24' ry='3.4' fill='var(--ink)' opacity='.08'/><g transform='rotate(12 24 58)'><path d='M32,70C20,71 5,65 4,52C3,42 3.5,30 9,23.5C14,19 21.5,23 23.5,33C27,43 29,53 33,62C36,65.5 37,67.5 38,69Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M32,70C20,71 5,65 4,52C3.2,44 3.6,34 7,27C7,38 10,51 16,60C21,67 28,69.5 32,70Z' fill='var(--ink)' fill-opacity='.12'/><path d='M6.2,40C5.2,32.5 6.4,27 11,24C15.4,21.2 20.4,24.4 22,31.4C15.6,31.6 10.2,34.8 6.2,40Z' fill='#FFFFFF'/></g><path d='M27,62L27,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><ellipse cx='42' cy='59' rx='26' ry='15' fill='#C2603C' stroke='var(--ink)' stroke-width='3'/><path d='M51,46C62,49 66,58 62,67C57,73 46,74 40,70C46,64 45,52 51,46Z' fill='#FFFFFF'/><path d='M58,64L58,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M58,64L58,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M58,81L58,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><g><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='var(--ink)' fill-opacity='.12'/><path d='M55,14.5Q61,11 64,3Q65,14.7 69,26.5Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,15.5Q62,12.5 64,7Q64.3,15 66,22.5Z' fill='var(--ink)' fill-opacity='.12'/><path d='M68.3,38A19,19 0 1 0 60.6,48.8C66,55.4 72,56.2 77,53.6C80.7,51.8 81.4,46.8 79.8,44C78.2,41.2 74,38.8 68.3,38Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M34.6,23C31.2,29.4 31.5,40.2 37.3,45.7C33.7,39.3 32.8,30.3 34.6,23Z' fill='var(--ink)' fill-opacity='.12'/><path d='M60.6,48.8C65,49.6 72,50.4 78.8,47.8C80.6,49.6 79.8,52 77,53.6C72,56.2 66,55.4 60.6,48.8Z' fill='#FFFFFF'/><path d='M69.8,43.4L75.4,45.6L72,49.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='2' stroke-linejoin='round'/><path d='M65.2,49.4C68.4,51.2 71.6,51.6 74,50.8C73.4,52.4 70.8,53.4 68.2,52.8C66.2,52.4 65.2,51.4 65.2,49.4Z' fill='var(--ink)'/><path d='M39,36Q44,29.8 49,36M55,36Q60,29.8 65,36' fill='none' stroke='var(--ink)' stroke-width='2.6' stroke-linecap='round'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - crescent eyes, open smile, tail <g> +12deg. The tail angle is the ONLY byte that differs from the other poses' body string (the hen's wing-transform rule) - never re-author the tail path per pose."
});
LCSArt.register("fox.oops", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='24' ry='3.4' fill='var(--ink)' opacity='.08'/><g transform='rotate(0 24 58)'><path d='M32,70C20,71 5,65 4,52C3,42 3.5,30 9,23.5C14,19 21.5,23 23.5,33C27,43 29,53 33,62C36,65.5 37,67.5 38,69Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M32,70C20,71 5,65 4,52C3.2,44 3.6,34 7,27C7,38 10,51 16,60C21,67 28,69.5 32,70Z' fill='var(--ink)' fill-opacity='.12'/><path d='M6.2,40C5.2,32.5 6.4,27 11,24C15.4,21.2 20.4,24.4 22,31.4C15.6,31.6 10.2,34.8 6.2,40Z' fill='#FFFFFF'/></g><path d='M27,62L27,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><ellipse cx='42' cy='59' rx='26' ry='15' fill='#C2603C' stroke='var(--ink)' stroke-width='3'/><path d='M51,46C62,49 66,58 62,67C57,73 46,74 40,70C46,64 45,52 51,46Z' fill='#FFFFFF'/><path d='M58,64L58,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M58,64L58,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M58,81L58,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><g><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='var(--ink)' fill-opacity='.12'/><path d='M55,14.5Q61,11 64,3Q65,14.7 69,26.5Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,15.5Q62,12.5 64,7Q64.3,15 66,22.5Z' fill='var(--ink)' fill-opacity='.12'/><path d='M68.3,38A19,19 0 1 0 60.6,48.8C66,55.4 72,56.2 77,53.6C80.7,51.8 81.4,46.8 79.8,44C78.2,41.2 74,38.8 68.3,38Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M34.6,23C31.2,29.4 31.5,40.2 37.3,45.7C33.7,39.3 32.8,30.3 34.6,23Z' fill='var(--ink)' fill-opacity='.12'/><path d='M60.6,48.8C65,49.6 72,50.4 78.8,47.8C80.6,49.6 79.8,52 77,53.6C72,56.2 66,55.4 60.6,48.8Z' fill='#FFFFFF'/><path d='M69.8,43.4L75.4,45.6L72,49.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='2' stroke-linejoin='round'/><ellipse cx='69' cy='50.4' rx='2.4' ry='2.2' fill='var(--ink)'/><circle cx='43' cy='34' r='7.5' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='61' cy='34' r='7.5' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='43' cy='34' r='3' fill='var(--ink)'/><circle cx='61' cy='34' r='3' fill='var(--ink)'/><path d='M36.5,25.4Q43,19.4 49.5,25.4M54.5,25.4Q61,19.4 67.5,25.4' fill='none' stroke='var(--ink)' stroke-width='2.6' stroke-linecap='round'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - SURPRISE, never disapproval: brows arch UP and OUT, mouth a small 'o'. The whites grow r6.5 -> r7.5 while the pupil SHRINKS 3.2 -> 3.0; that opposition is what reads as surprise. Eye separation is DERIVED, not copied: centres must be at least 2r + 3 apart (16 at r6.5, 18 at r7.5) or the two whites intersect into a visible lens."
});
LCSArt.register("fox.munch", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><ellipse cx='48' cy='91.5' rx='24' ry='3.4' fill='var(--ink)' opacity='.08'/><g transform='rotate(6 24 58)'><path d='M32,70C20,71 5,65 4,52C3,42 3.5,30 9,23.5C14,19 21.5,23 23.5,33C27,43 29,53 33,62C36,65.5 37,67.5 38,69Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M32,70C20,71 5,65 4,52C3.2,44 3.6,34 7,27C7,38 10,51 16,60C21,67 28,69.5 32,70Z' fill='var(--ink)' fill-opacity='.12'/><path d='M6.2,40C5.2,32.5 6.4,27 11,24C15.4,21.2 20.4,24.4 22,31.4C15.6,31.6 10.2,34.8 6.2,40Z' fill='#FFFFFF'/></g><path d='M27,62L27,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,62L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><ellipse cx='42' cy='59' rx='26' ry='15' fill='#C2603C' stroke='var(--ink)' stroke-width='3'/><path d='M51,46C62,49 66,58 62,67C57,73 46,74 40,70C46,64 45,52 51,46Z' fill='#FFFFFF'/><path d='M58,64L58,84' stroke='var(--ink)' stroke-width='12' stroke-linecap='round' fill='none'/><path d='M58,64L58,84' stroke='#C2603C' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M27,81L27,84' stroke='var(--ink)' stroke-opacity='.12' stroke-width='9' stroke-linecap='round' fill='none'/><path d='M58,81L58,84' stroke='#FFFFFF' stroke-width='9' stroke-linecap='round' fill='none'/><g><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M43,15.5Q37,12.9 33,5Q34.2,15.9 31,27Z' fill='var(--ink)' fill-opacity='.12'/><path d='M55,14.5Q61,11 64,3Q65,14.7 69,26.5Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,15.5Q62,12.5 64,7Q64.3,15 66,22.5Z' fill='var(--ink)' fill-opacity='.12'/><path d='M68.3,38A19,19 0 1 0 60.6,48.8C66,55.4 72,56.2 77,53.6C80.7,51.8 81.4,46.8 79.8,44C78.2,41.2 74,38.8 68.3,38Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M67.5,25.5C73,28 73.5,35 68.3,38A19,19 0 0 0 67.5,25.5Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M34.6,23C31.2,29.4 31.5,40.2 37.3,45.7C33.7,39.3 32.8,30.3 34.6,23Z' fill='var(--ink)' fill-opacity='.12'/><path d='M60.6,48.8C65,49.6 72,50.4 78.8,47.8C80.6,49.6 79.8,52 77,53.6C72,56.2 66,55.4 60.6,48.8Z' fill='#FFFFFF'/><path d='M69.8,43.4L75.4,45.6L72,49.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='2' stroke-linejoin='round'/><ellipse cx='69.4' cy='50.4' rx='4.6' ry='2' transform='rotate(6 69.4 50.4)' fill='var(--ink)'/><path d='M39,36Q44,29.8 49,36M55,36Q60,29.8 65,36' fill='none' stroke='var(--ink)' stroke-width='2.6' stroke-linecap='round'/></g></svg>",
  by: "artist-agent, 2026-09-06",
  bible: "mascot §3 - the act pose: crescent eyes, open lozenge, tail <g> +6deg, near cheek +3.1 units (measured). BINDING: the cheek bulge closes with an ARC OF THE SAME r19 circle, so its closing stroke lands exactly on the head outline and disappears - and it must be drawn AFTER the skull, or its opaque fill cannot cover the outline it replaces."
});

if (typeof window !== "undefined") { window.LCSArt = LCSArt; }
