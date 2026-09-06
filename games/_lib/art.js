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
   roster. REDRAWN 2026-09-06: the first fox passed every gate and was
   rejected on sight, because every gate renders a mascot at ~104px and
   at 400px the drawing did not hold up. What was wrong is worth keeping:
   TWO mismatched dangling limbs built from fat strokes and hung off the
   middle of the chest, a lobed muzzle that read as a beak with something
   in the jaws, ink-washed ears that read as horns, and oops brows sitting
   on the skull outline as a frown. Look at any new pose with
   _tools/art-sheet.js at 384 before believing a green gate.

   TEMPLATE (the hen's, kept): ONE shared body string byte-identical
   across all five poses + a swapped head group, and exactly ONE element
   varying by <g transform> - here the TAIL, as the hen varies its wing.
   Layer order is load-bearing: shadow, tail (BEHIND everything, so its
   root is buried in the haunch and no rotation can detach it), far legs,
   near legs, body, underbelly, head. The underbelly is a PATH whose lower
   edge follows the body's own bottom outline inset ~1.2 - an ellipse
   floats in the middle of the body and reads as a white pill, not a belly.

   POSE: side-on standing body, front-facing head. A three-quarter head with
   a projecting snout was the first fox and it is what failed - the snout
   has to be bolted on, and a bolted-on snout reads as a bill. Front-facing,
   the fox mask IS the head outline: a rounded triangle, wide at the ears,
   tapering to the nose. That shape is the strongest fox cue there is and it
   survives 48px, where a snout does not.

   The body is #C2603C, the accent DARKER tint, and that is the fox's
   ART-BIBLE §9.2 identity feature. Under the §9.4 warm-body clause it
   spends the entire exemption: NO #F6A07E and NO #F2784B appears anywhere
   on this character, and the consuming game may declare only one small
   geometric accent, well clear of the fox.
   ------------------------------------------------------------ */
LCSArt.register("fox.idle", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><g transform='rotate(0 25 59)'><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M21.3,29.1L21.2,28.3L21.1,27.6L21,26.8L20.9,26L20.9,25.3L20.8,24.5L20.8,23.7L20.9,22.9L20.9,22.1L21,21.2L21,20.4L21.2,19.6L21.3,18.8L21.5,18L21.6,17.2L21.9,16.4L22.1,15.6L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L12.7,9.1L11.8,10L10.9,10.9L10.1,11.9L9.3,12.9L8.6,14L7.9,15.1L7.2,16.2L6.6,17.3L6,18.5L5.5,19.7L5,20.9L4.6,22.1L4.2,23.3L3.8,24.6L3.5,25.8L3.2,27.1L3,28.4Z' fill='#FFFFFF'/><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='none' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/></g><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M14.55,62L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L23.45,62Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M47.08,61L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L54.92,61Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M25.5,51L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L38.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M27.13,64L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L36.88,64Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,51L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L69.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M59.66,63L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L68.34,63Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M62,37C53,34 43,33 32,35C21,37 13,43 13,52C13,61 18,66 26,66C34,66 40,60 47,61C54,62 58,66 64,64C69,62 70.5,55 70.5,47C70.5,40.5 67,37 62,37Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M67,38.4C68.6,46 66.4,52.6 60.6,56C53.4,60.2 32,60 17.4,54.8C15.8,59.6 20,64.6 26,64.6C33.4,64.6 40,58.9 47,59.9C54,60.9 58.6,64.4 63.6,62.7C67.2,61.5 69.4,55.4 69.6,47C69.7,43 68.8,39.9 67,38.4Z' fill='#FFFFFF'/><g transform='translate(-2 0)'><path d='M57.6,20.6L50.8,6.4L66.6,8.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58,15.9L54.2,9.1L62.9,10.1Z' fill='#C2603C'/><path d='M73,6.8L87.2,5.6L81,19.8Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M76.3,8L84.1,7.4L80.7,16.8Z' fill='#C2603C'/><path d='M55,18C53.5,26 54.6,33.4 58,37.6C61.6,42.2 67,44.2 73,43.2C79,42.2 85,40.2 89,38.2C92,36.2 93.8,34.6 93.6,32.8C93.4,30.7 90.4,29.4 87,28.6C83.4,27.9 81.4,26.6 80,24C79.6,20 80.6,15.4 79.6,11.4C78.6,7.4 73,5.2 67,6C60.4,6.9 56,11.4 55,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M54.6,27.6C56.6,33.4 60.6,36.4 66.2,37.6C73.2,39.2 82.2,38.4 91.4,34.6C90.8,35.8 90,36.8 88.8,37.6C84.8,40.4 78.8,42.4 72.6,43.4C66,44.4 60.8,42.4 57.6,36.8C56.2,34.2 55.2,31 54.6,27.6Z' fill='#FFFFFF'/><ellipse cx='64.2' cy='22' rx='3.99' ry='3.22' transform='rotate(11 64.2 22)' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='64.7' cy='22.2' r='2.2' fill='var(--ink)'/><ellipse cx='76.2' cy='23.2' rx='4.56' ry='3.68' transform='rotate(11 76.2 23.2)' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='76.7' cy='23.4' r='2.2' fill='var(--ink)'/><path d='M89,35.8C87.4,38.4 85.2,38.9 83.6,37.5' fill='none' stroke='var(--ink)' stroke-width='2.2' stroke-linecap='round'/><path d='M86.6,29.7C89.8,29.2 92.6,30.6 93.2,32.4C93.7,34 92.2,35.5 89.9,35.7C87.6,35.9 85.7,34.8 85.4,32.7C85.2,31 85.6,29.9 86.6,29.7Z' fill='var(--ink)'/></g></svg>",
  by: "artist-agent, 2026-09-06 (third drawing)",
  bible: "mascot §3 — the fox, neutral. THIRD drawing; the operator rejected two on sight (\"a terrible drawing of a fox\"). What changed is WHICH ANIMAL it is, not the rendering: SIDE PROFILE facing screen-right with the head turned a few degrees to the viewer, because a fox's identity lives in its profile and a front-facing mask reads as a cat. Four markings do the work and all four were wrong or missing before: (1) INK LOWER LEGS — the black stockings are the second-strongest fox cue there is and the previous fox wore WHITE SOCKS, which actively say 'not a fox'; (2) a BRUSH nearly as long as the body and as thick as the torso, swept from a centreline and a width profile (24 units at the rump tapering to 11) so it is a brush and not the paddle that hand-fitted curves produced; (3) INK EAR BACKS with a russet inner — a white inner read as an eye and a three-shape ear read as a split triangle with an accidental speck; (4) white throat that RUNS OFF into the chest — end it on the cheek and the head detaches from the body (measured against a chin-only variant at 384). NO GROUND SHADOW on any pose (operator ruling 2026-09-06; overrides §4 for this mascot). Legs are FILLED PATHS with their own 3px outline (§11.2), all four drawn, all four BEHIND the torso — drawing the near pair on top with a rounded haunch put two circles on the flank that read as wheels."
});

LCSArt.register("fox.think", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><g transform='rotate(3 25 59)'><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M21.3,29.1L21.2,28.3L21.1,27.6L21,26.8L20.9,26L20.9,25.3L20.8,24.5L20.8,23.7L20.9,22.9L20.9,22.1L21,21.2L21,20.4L21.2,19.6L21.3,18.8L21.5,18L21.6,17.2L21.9,16.4L22.1,15.6L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L12.7,9.1L11.8,10L10.9,10.9L10.1,11.9L9.3,12.9L8.6,14L7.9,15.1L7.2,16.2L6.6,17.3L6,18.5L5.5,19.7L5,20.9L4.6,22.1L4.2,23.3L3.8,24.6L3.5,25.8L3.2,27.1L3,28.4Z' fill='#FFFFFF'/><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='none' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/></g><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M14.55,62L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L23.45,62Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M47.08,61L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L54.92,61Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M25.5,51L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L38.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M27.13,64L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L36.88,64Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,51L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L69.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M59.66,63L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L68.34,63Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M62,37C53,34 43,33 32,35C21,37 13,43 13,52C13,61 18,66 26,66C34,66 40,60 47,61C54,62 58,66 64,64C69,62 70.5,55 70.5,47C70.5,40.5 67,37 62,37Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M67,38.4C68.6,46 66.4,52.6 60.6,56C53.4,60.2 32,60 17.4,54.8C15.8,59.6 20,64.6 26,64.6C33.4,64.6 40,58.9 47,59.9C54,60.9 58.6,64.4 63.6,62.7C67.2,61.5 69.4,55.4 69.6,47C69.7,43 68.8,39.9 67,38.4Z' fill='#FFFFFF'/><g transform='translate(-2 0) rotate(4 70 28)'><path d='M57.6,20.6L50.8,6.4L66.6,8.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58,15.9L54.2,9.1L62.9,10.1Z' fill='#C2603C'/><path d='M73,6.8L87.2,5.6L81,19.8Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M76.3,8L84.1,7.4L80.7,16.8Z' fill='#C2603C'/><path d='M55,18C53.5,26 54.6,33.4 58,37.6C61.6,42.2 67,44.2 73,43.2C79,42.2 85,40.2 89,38.2C92,36.2 93.8,34.6 93.6,32.8C93.4,30.7 90.4,29.4 87,28.6C83.4,27.9 81.4,26.6 80,24C79.6,20 80.6,15.4 79.6,11.4C78.6,7.4 73,5.2 67,6C60.4,6.9 56,11.4 55,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M54.6,27.6C56.6,33.4 60.6,36.4 66.2,37.6C73.2,39.2 82.2,38.4 91.4,34.6C90.8,35.8 90,36.8 88.8,37.6C84.8,40.4 78.8,42.4 72.6,43.4C66,44.4 60.8,42.4 57.6,36.8C56.2,34.2 55.2,31 54.6,27.6Z' fill='#FFFFFF'/><ellipse cx='64.2' cy='22' rx='3.99' ry='3.22' transform='rotate(11 64.2 22)' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='65.8' cy='22.9' r='2.2' fill='var(--ink)'/><ellipse cx='76.2' cy='23.2' rx='4.56' ry='3.68' transform='rotate(11 76.2 23.2)' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='77.8' cy='24.1' r='2.2' fill='var(--ink)'/><path d='M89,36C87.6,38.2 85.8,38.6 84.4,37.9' fill='none' stroke='var(--ink)' stroke-width='2.2' stroke-linecap='round'/><path d='M86.6,29.7C89.8,29.2 92.6,30.6 93.2,32.4C93.7,34 92.2,35.5 89.9,35.7C87.6,35.9 85.7,34.8 85.4,32.7C85.2,31 85.6,29.9 86.6,29.7Z' fill='var(--ink)'/></g></svg>",
  by: "artist-agent, 2026-09-06 (third drawing)",
  bible: "head +4deg about (66,28), pupils forward and down: he looks at the thing the child should look at. The EARS rotate inside the same group (the hen's comb lesson). BINDING, and MEASURED not eyeballed: at +6deg the rotation carried the MUZZLE 1 design unit outside the viewBox — the far ear was the suspect, the muzzle was the culprit. Resolved by translating the whole head 2 units left rather than shortening the muzzle, because the muzzle length IS the fox cue. Worst clearance is now 2.9 units; re-measure after ANY change to the head, the rotation or the pivot."
});

LCSArt.register("fox.happy", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><g transform='rotate(14 25 59)'><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M21.3,29.1L21.2,28.3L21.1,27.6L21,26.8L20.9,26L20.9,25.3L20.8,24.5L20.8,23.7L20.9,22.9L20.9,22.1L21,21.2L21,20.4L21.2,19.6L21.3,18.8L21.5,18L21.6,17.2L21.9,16.4L22.1,15.6L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L12.7,9.1L11.8,10L10.9,10.9L10.1,11.9L9.3,12.9L8.6,14L7.9,15.1L7.2,16.2L6.6,17.3L6,18.5L5.5,19.7L5,20.9L4.6,22.1L4.2,23.3L3.8,24.6L3.5,25.8L3.2,27.1L3,28.4Z' fill='#FFFFFF'/><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='none' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/></g><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M14.55,62L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L23.45,62Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M47.08,61L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L54.92,61Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M25.5,51L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L38.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M27.13,64L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L36.88,64Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,51L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L69.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M59.66,63L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L68.34,63Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M62,37C53,34 43,33 32,35C21,37 13,43 13,52C13,61 18,66 26,66C34,66 40,60 47,61C54,62 58,66 64,64C69,62 70.5,55 70.5,47C70.5,40.5 67,37 62,37Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M67,38.4C68.6,46 66.4,52.6 60.6,56C53.4,60.2 32,60 17.4,54.8C15.8,59.6 20,64.6 26,64.6C33.4,64.6 40,58.9 47,59.9C54,60.9 58.6,64.4 63.6,62.7C67.2,61.5 69.4,55.4 69.6,47C69.7,43 68.8,39.9 67,38.4Z' fill='#FFFFFF'/><g transform='translate(-2 0)'><path d='M57.6,20.6L50.8,6.4L66.6,8.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58,15.9L54.2,9.1L62.9,10.1Z' fill='#C2603C'/><path d='M73,6.8L87.2,5.6L81,19.8Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M76.3,8L84.1,7.4L80.7,16.8Z' fill='#C2603C'/><path d='M55,18C53.5,26 54.6,33.4 58,37.6C61.6,42.2 67,44.2 73,43.2C79,42.2 85,40.2 89,38.2C92,36.2 93.8,34.6 93.6,32.8C93.4,30.7 90.4,29.4 87,28.6C83.4,27.9 81.4,26.6 80,24C79.6,20 80.6,15.4 79.6,11.4C78.6,7.4 73,5.2 67,6C60.4,6.9 56,11.4 55,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M54.6,27.6C56.6,33.4 60.6,36.4 66.2,37.6C73.2,39.2 82.2,38.4 91.4,34.6C90.8,35.8 90,36.8 88.8,37.6C84.8,40.4 78.8,42.4 72.6,43.4C66,44.4 60.8,42.4 57.6,36.8C56.2,34.2 55.2,31 54.6,27.6Z' fill='#FFFFFF'/><path d='M60.5,23.4Q64.2,18.6 67.9,23.4M72.5,24Q76.2,19.2 79.9,24' fill='none' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round'/><path d='M84.6,37.2Q82,41.4 79,38.5Q81.6,37.6 84.6,37.2Z' fill='var(--ink)'/><path d='M86.6,29.7C89.8,29.2 92.6,30.6 93.2,32.4C93.7,34 92.2,35.5 89.9,35.7C87.6,35.9 85.7,34.8 85.4,32.7C85.2,31 85.6,29.9 86.6,29.7Z' fill='var(--ink)'/></g></svg>",
  by: "artist-agent, 2026-09-06 (third drawing)",
  bible: "crescent eyes, small open mouth, tail +14deg about (25,59) — a pivot buried inside the haunch. The tail rotation is the ONLY byte differing from the shared body string. The open mouth is placed BACK from the nose: a filled ink mouth directly under the ink nose merges with it into one dark blob at 384 (a drawn mouth LINE may start at the nose, as idle's does, because that is where it starts on the animal)."
});

LCSArt.register("fox.oops", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><g transform='rotate(10 25 59)'><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M21.3,29.1L21.2,28.3L21.1,27.6L21,26.8L20.9,26L20.9,25.3L20.8,24.5L20.8,23.7L20.9,22.9L20.9,22.1L21,21.2L21,20.4L21.2,19.6L21.3,18.8L21.5,18L21.6,17.2L21.9,16.4L22.1,15.6L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L12.7,9.1L11.8,10L10.9,10.9L10.1,11.9L9.3,12.9L8.6,14L7.9,15.1L7.2,16.2L6.6,17.3L6,18.5L5.5,19.7L5,20.9L4.6,22.1L4.2,23.3L3.8,24.6L3.5,25.8L3.2,27.1L3,28.4Z' fill='#FFFFFF'/><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='none' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/></g><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M14.55,62L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L23.45,62Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M47.08,61L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L54.92,61Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M25.5,51L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L38.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M27.13,64L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L36.88,64Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,51L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L69.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M59.66,63L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L68.34,63Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M62,37C53,34 43,33 32,35C21,37 13,43 13,52C13,61 18,66 26,66C34,66 40,60 47,61C54,62 58,66 64,64C69,62 70.5,55 70.5,47C70.5,40.5 67,37 62,37Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M67,38.4C68.6,46 66.4,52.6 60.6,56C53.4,60.2 32,60 17.4,54.8C15.8,59.6 20,64.6 26,64.6C33.4,64.6 40,58.9 47,59.9C54,60.9 58.6,64.4 63.6,62.7C67.2,61.5 69.4,55.4 69.6,47C69.7,43 68.8,39.9 67,38.4Z' fill='#FFFFFF'/><g transform='translate(-2 0)'><path d='M57.6,20.6L50.8,6.4L66.6,8.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58,15.9L54.2,9.1L62.9,10.1Z' fill='#C2603C'/><path d='M73,6.8L87.2,5.6L81,19.8Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M76.3,8L84.1,7.4L80.7,16.8Z' fill='#C2603C'/><path d='M55,18C53.5,26 54.6,33.4 58,37.6C61.6,42.2 67,44.2 73,43.2C79,42.2 85,40.2 89,38.2C92,36.2 93.8,34.6 93.6,32.8C93.4,30.7 90.4,29.4 87,28.6C83.4,27.9 81.4,26.6 80,24C79.6,20 80.6,15.4 79.6,11.4C78.6,7.4 73,5.2 67,6C60.4,6.9 56,11.4 55,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M54.6,27.6C56.6,33.4 60.6,36.4 66.2,37.6C73.2,39.2 82.2,38.4 91.4,34.6C90.8,35.8 90,36.8 88.8,37.6C84.8,40.4 78.8,42.4 72.6,43.4C66,44.4 60.8,42.4 57.6,36.8C56.2,34.2 55.2,31 54.6,27.6Z' fill='#FFFFFF'/><ellipse cx='64.2' cy='22' rx='4.56' ry='3.68' transform='rotate(11 64.2 22)' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='64.6' cy='22.2' r='1.9' fill='var(--ink)'/><ellipse cx='76.2' cy='23.2' rx='5.13' ry='4.14' transform='rotate(11 76.2 23.2)' fill='var(--surface)' stroke='var(--ink)' stroke-width='2'/><circle cx='76.6' cy='23.4' r='1.9' fill='var(--ink)'/><path d='M59.6,15.8Q64.2,12.4 68.8,16M71.8,16.4Q76.4,13 80.6,16.6' fill='none' stroke='var(--ink)' stroke-width='2.4' stroke-linecap='round'/><ellipse cx='83.2' cy='38.4' rx='2.5' ry='3' fill='var(--ink)'/><path d='M86.6,29.7C89.8,29.2 92.6,30.6 93.2,32.4C93.7,34 92.2,35.5 89.9,35.7C87.6,35.9 85.7,34.8 85.4,32.7C85.2,31 85.6,29.9 86.6,29.7Z' fill='var(--ink)'/></g></svg>",
  by: "artist-agent, 2026-09-06 (third drawing)",
  bible: "SURPRISE, never disapproval. Whites grow 3.5/4.0 -> 4.0/4.5 while the pupils SHRINK 2.2 -> 1.9; that opposition is what reads as surprise. BINDING: the brows arch to y12.4 with their ends at y15.8-16.6, which leaves 6+ of forehead to the skull outline AND 2+ to the enlarged eyes. A brow drawn on the outline merges with it and becomes a frown. The far eye is 12% smaller than the near one in every pose — the head is TURNED, and two identical circles side by side read as goggles."
});

LCSArt.register("fox.munch", {
  w: 96, h: 96,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><g transform='rotate(6 25 59)'><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M21.3,29.1L21.2,28.3L21.1,27.6L21,26.8L20.9,26L20.9,25.3L20.8,24.5L20.8,23.7L20.9,22.9L20.9,22.1L21,21.2L21,20.4L21.2,19.6L21.3,18.8L21.5,18L21.6,17.2L21.9,16.4L22.1,15.6L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L12.7,9.1L11.8,10L10.9,10.9L10.1,11.9L9.3,12.9L8.6,14L7.9,15.1L7.2,16.2L6.6,17.3L6,18.5L5.5,19.7L5,20.9L4.6,22.1L4.2,23.3L3.8,24.6L3.5,25.8L3.2,27.1L3,28.4Z' fill='#FFFFFF'/><path d='M26.5,38.1L26.2,38.1L26.3,38.2L26.3,38.3L26.2,38.4L25.8,38.3L25.3,37.9L24.5,37.1L23.7,36L23,34.6L22.3,32.9L21.7,30.9L21.2,28.8L21,26.6L20.8,24.3L20.9,21.9L21.2,19.5L21.7,17.2L22.4,14.8A5.5,5.5 0 0 0 13.6,8.2L11,10.9L8.7,13.9L6.7,17.1L5.1,20.6L3.9,24.2L3,27.9L2.6,31.7L2.5,35.5L2.8,39.3L3.5,43.1L4.7,46.8L6.4,50.3L8.8,53.7L11.8,56.8L15.6,59.4L19.9,61.2L24.6,62L29.5,61.9Z' fill='none' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/></g><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M13,49L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L25,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M14.55,62L16.7,80L15.9,81Q15.9,85 18.9,85L19.1,85Q22.1,85 22.1,81L21.3,80L23.45,62Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M46,49L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L56,49Z' fill='var(--ink)' fill-opacity='.12'/><path d='M47.08,61L48.8,80L48,81Q48,85 51,85L51,85Q54,85 54,81L53.2,80L54.92,61Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M25.5,51L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L38.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M27.13,64L29.5,83L28.7,85Q28.7,89 31.7,89L32.3,89Q35.3,89 35.3,85L34.5,83L36.88,64Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58.5,51L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L69.5,51Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M59.66,63L61.6,83L60.8,85Q60.8,89 63.8,89L64.2,89Q67.2,89 67.2,85L66.4,83L68.34,63Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M62,37C53,34 43,33 32,35C21,37 13,43 13,52C13,61 18,66 26,66C34,66 40,60 47,61C54,62 58,66 64,64C69,62 70.5,55 70.5,47C70.5,40.5 67,37 62,37Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M67,38.4C68.6,46 66.4,52.6 60.6,56C53.4,60.2 32,60 17.4,54.8C15.8,59.6 20,64.6 26,64.6C33.4,64.6 40,58.9 47,59.9C54,60.9 58.6,64.4 63.6,62.7C67.2,61.5 69.4,55.4 69.6,47C69.7,43 68.8,39.9 67,38.4Z' fill='#FFFFFF'/><g transform='translate(-2 0)'><path d='M57.6,20.6L50.8,6.4L66.6,8.6Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M58,15.9L54.2,9.1L62.9,10.1Z' fill='#C2603C'/><path d='M73,6.8L87.2,5.6L81,19.8Z' fill='var(--ink)' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M76.3,8L84.1,7.4L80.7,16.8Z' fill='#C2603C'/><path d='M55,18C53.5,26 54.6,34.4 58,39C62,44.6 67,46.6 73,45C79,42.2 85,40.2 89,38.2C92,36.2 93.8,34.6 93.6,32.8C93.4,30.7 90.4,29.4 87,28.6C83.4,27.9 81.4,26.6 80,24C79.6,20 80.6,15.4 79.6,11.4C78.6,7.4 73,5.2 67,6C60.4,6.9 56,11.4 55,18Z' fill='#C2603C' stroke='var(--ink)' stroke-width='3' stroke-linejoin='round'/><path d='M54.6,27.6C56.6,33.4 60.6,36.4 66.2,37.6C73.2,39.2 82.2,38.4 91.4,34.6C90.8,35.8 90,36.8 88.8,37.6C84.8,40.4 78.8,42.4 72.6,43.4C66,44.4 60.8,42.4 57.6,36.8C56.2,34.2 55.2,31 54.6,27.6Z' fill='#FFFFFF'/><path d='M60.5,23.4Q64.2,18.6 67.9,23.4M72.5,24Q76.2,19.2 79.9,24' fill='none' stroke='var(--ink)' stroke-width='2.8' stroke-linecap='round'/><path d='M84.2,37.4Q81.2,42.2 77.6,38.7Q80.8,37.4 84.2,37.4Z' fill='var(--ink)'/><path d='M86.6,29.7C89.8,29.2 92.6,30.6 93.2,32.4C93.7,34 92.2,35.5 89.9,35.7C87.6,35.9 85.7,34.8 85.4,32.7C85.2,31 85.6,29.9 86.6,29.7Z' fill='var(--ink)'/></g></svg>",
  by: "artist-agent, 2026-09-06 (third drawing)",
  bible: "the 'act' pose. The fuller cheek is built INTO this pose's own face and cheek paths (the jaw segment re-curved down and out), never overlaid as a second shape — an overlaid bulge must close somewhere, and a closing stroke that does not land exactly on the head outline draws a line across the cheek. Those two re-curved paths are the only bytes differing from the other heads."
});

/* ------------------------------------------------------------
   GAME 120 "The Lantern Lift" - Bramble the owl, the street's
   lamplighter, and the lantern she carries up the mast.

   The template the hen started and the fox kept: ONE shared body
   string, byte-identical in all five poses, plus a swapped head
   group, and exactly one element varying by <g transform> - here
   the WINGS, as the hen varies her wing and the fox his tail. The
   body is composed from parts below so that identity is structural
   rather than a claim in a comment: OWL_BODY is one string and five
   registrations concatenate it.

   COLOUR. Her body is the surface2 DARKER tint #E9E1D2 with the
   belly and facial disc in surface2 / surface, and every marking is
   ink. There is NO coral anywhere on her and none is ever to be
   added: game 120 spends its entire state-coral budget on the ask
   ring, because on that street coral means "this is the house", and
   a coral owl would say it too.

   STROKE WEIGHT is the one deliberate departure from §3's "3 px":
   the master is 96 and this mascot is drawn at 40 on the hoist
   cradle, where a 3-unit line lands at 1.25 px and dissolves. 4.5
   units is 1.9 px at the 40 draw - §3's own floor for sizes <= 48 -
   and 4.5 px at the 96 Boot/Finish draw, which is heavy but reads as
   the same rounded weight as Baloo 2 next to it. Never draw her
   below 40.

   THE FACE, MEASURED. The first drawing gave the tufts their own
   triangles, the body its own outline, a stroked facial disc and two
   stroked eye rings, and at 48 px the head band held SEVEN near-
   parallel ink lines: body edge, tuft inner, disc, two rings twice
   each, beak. It read as a speckled egg, not an owl (checked by
   rasterising at 48 and printing the pixel grid - this model has no
   image input, so the check had to be numeric and textual). What is
   here instead: ONE closed silhouette carrying the tufts, a facial
   plate defined by a TONAL step and a 18%-ink hairline rather than a
   4-unit outline, and two SOLID beads with a highlight. Four marks in
   the head band instead of seven.
   ------------------------------------------------------------ */
var OWL_INK = "var(--ink)", OWL_S2 = "var(--surface2)", OWL_SURF = "var(--surface)";
var OWL_TINT = "#E9E1D2", OWL_SOFT = "#9A9AA5";

/* ONE closed silhouette (two ear tufts, crown, body) + talons + belly.
   SHARED, byte-identical, all five poses. */
var OWL_BODY =
  "<path d='M48,16 C43,16 39,14 36,12 C32,9 28,6 26,5 C26,10 27,17 29,23 C22,29 17,39 17,51 C17,73 30,86 48,86 C66,86 79,73 79,51 C79,39 74,29 67,23 C69,17 70,10 70,5 C68,6 64,9 60,12 C57,14 53,16 48,16 Z' fill='" + OWL_TINT + "' stroke='" + OWL_INK + "' stroke-width='4.5' stroke-linejoin='round'/>" +
  "<g fill='none' stroke='" + OWL_INK + "' stroke-width='4' stroke-linecap='round'><path d='M41,82 L41,89 M41,89 L35,92 M41,89 L41,93.5 M41,89 L47,92'/><path d='M55,82 L55,89 M55,89 L49,92 M55,89 L55,93.5 M55,89 L61,92'/></g>" +
  "<ellipse cx='48' cy='68' rx='20' ry='14.5' fill='" + OWL_S2 + "' stroke='" + OWL_INK + "' stroke-opacity='.2' stroke-width='2.5'/>";

/* Both wings sweep FORWARD and meet over the chest, and they START at
   y=50 so they never enter the face band. That folded shape is the
   wordless reason she does not simply fly: her wings are full. */
var OWL_WING_L = "<path d='M21,50 C16,62 22,76 35,81 C39,82.5 43,81 45,77.5 C35,74 28,65 27,54 C26,51 23,50 21,50 Z' fill='" + OWL_S2 + "' stroke='" + OWL_INK + "' stroke-width='3.6' stroke-linejoin='round'/>";
var OWL_WING_R = "<path d='M75,50 C80,62 74,76 61,81 C57,82.5 53,81 51,77.5 C61,74 68,65 69,54 C70,51 73,50 75,50 Z' fill='" + OWL_S2 + "' stroke='" + OWL_INK + "' stroke-width='3.6' stroke-linejoin='round'/>";
var OWL_WINGS_HOLD = OWL_WING_L + OWL_WING_R;
/* think: the near wing comes off her flank with the head turn. At 40 px a
   gesture that moves only the pupils is not a gesture - measured, 6 px of
   difference against idle, which is the same picture. */
var OWL_WINGS_LIFT = "<g transform='rotate(-24 22 52)'>" + OWL_WING_L + "</g>" + OWL_WING_R;
/* the act pose: the near wing stays, the far wing reaches out and up to the
   hook. An ink capsule with a surface2 core: a bare 6.5-unit line lands at
   2.7 px at 40 and reads as a stick, not a wing. */
var OWL_WINGS_REACH = OWL_WING_L +
  "<g transform='rotate(-28 68 48)'><path d='M66,42 C76,38 83,32 87,24' fill='none' stroke='" + OWL_INK + "' stroke-width='13' stroke-linecap='round'/><path d='M66,42 C76,38 83,32 87,24' fill='none' stroke='" + OWL_S2 + "' stroke-width='6.5' stroke-linecap='round'/></g>";

/* the face: a pale plate (tonal step, 18%-ink hairline - NOT a 4-unit
   outline), two solid beads with highlights, a small beak. */
var OWL_PLATE = "<ellipse cx='48' cy='37' rx='21' ry='16.5' fill='" + OWL_SURF + "' stroke='" + OWL_INK + "' stroke-opacity='.18' stroke-width='2.5'/>";
var OWL_BEAK = "<path d='M48,42 L52.4,47.5 L48,53.5 L43.6,47.5 Z' fill='" + OWL_SOFT + "' stroke='" + OWL_INK + "' stroke-width='2.4' stroke-linejoin='round'/>";
function owlHead(eyes, mouth) { return OWL_PLATE + eyes + OWL_BEAK + (mouth || ""); }
var OWL_BEADS =
  "<g><circle cx='41' cy='35' r='5.4' fill='" + OWL_INK + "'/><circle cx='55' cy='35' r='5.4' fill='" + OWL_INK + "'/>" +
  "<circle cx='39.3' cy='33.3' r='1.7' fill='" + OWL_SURF + "'/><circle cx='53.3' cy='33.3' r='1.7' fill='" + OWL_SURF + "'/></g>";
var OWL_BEADS_UP =
  "<g><circle cx='42.6' cy='32' r='5.4' fill='" + OWL_INK + "'/><circle cx='56.6' cy='32' r='5.4' fill='" + OWL_INK + "'/>" +
  "<circle cx='40.9' cy='30.3' r='1.7' fill='" + OWL_SURF + "'/><circle cx='54.9' cy='30.3' r='1.7' fill='" + OWL_SURF + "'/></g>";
var OWL_BEADS_WIDE =
  "<g><circle cx='40.6' cy='34.4' r='6.5' fill='" + OWL_INK + "'/><circle cx='55.4' cy='34.4' r='6.5' fill='" + OWL_INK + "'/>" +
  "<circle cx='38.6' cy='32.4' r='2.1' fill='" + OWL_SURF + "'/><circle cx='53.4' cy='32.4' r='2.1' fill='" + OWL_SURF + "'/></g>";
var OWL_CRESCENTS = "<g fill='none' stroke='" + OWL_INK + "' stroke-width='4' stroke-linecap='round'><path d='M35.5,36.5 C38,30.5 43.5,30.5 46,36.5'/><path d='M50,36.5 C52.5,30.5 58,30.5 60.5,36.5'/></g>";

function owlSvg(body) {
  return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'>" + body + "</svg>";
}
var OWL_BY = "artist-agent, 2026-09-06";

LCSArt.register("owl.idle", {
  w: 96, h: 96,
  svg: owlSvg(OWL_BODY + OWL_WINGS_HOLD + owlHead(OWL_BEADS)),
  by: OWL_BY,
  bible: "mascot \u00a73 - the owl, neutral. Ear tufts + facial plate + two big forward beads are the three owl cues and all three survive at 40 px; the plate is ONE ellipse rather than the figure-eight of a real barn owl because two overlapping outlines at 40 px merge into mush. Wings folded forward over the chest: she is carrying something. NO CORAL (\u00a79.2) - the consuming game spends its whole state-coral budget on the ask ring."
});
LCSArt.register("owl.think", {
  w: 96, h: 96,
  svg: owlSvg(OWL_BODY + OWL_WINGS_LIFT + "<g transform='rotate(14 48 54) translate(0 -3)'>" + owlHead(OWL_BEADS_UP) + "</g>"),
  by: OWL_BY,
  bible: "head +14deg about the jaw (48,54), lifted 3, beads up and to the right, near wing lifted off the flank: she is looking at the gap between the plank's end and the parapet, which is the thing the child must look at. MEASURED at 44 px against idle: 14.8% of the glyph changes, so the pose is legible where the earlier pupils-only version changed 6 px and was the same picture. No brows - two brows read as surprise, and surprise is owl.oops. Re-measure viewBox clearance after ANY change to the head, the angle or the pivot (worst case is the far tuft at 5 units from the edge)."
});
LCSArt.register("owl.happy", {
  w: 96, h: 96,
  svg: owlSvg(OWL_BODY + OWL_WINGS_HOLD + owlHead(OWL_CRESCENTS, "<ellipse cx='48' cy='57.5' rx='4.6' ry='5.6' fill='" + OWL_INK + "'/>")),
  by: OWL_BY,
  bible: "crescent eyes, open mouth. The mouth sits BELOW the beak's diamond with 4 units of plate between them: touching, the two merge into one dark blob at 40 px (the fox's happy-pose lesson - a filled mouth sits back from the nose, not under it). 5.1% of the glyph changes against idle and every changed pixel is in the face, which is where the child is looking."
});
LCSArt.register("owl.hang", {
  w: 96, h: 96,
  svg: owlSvg(OWL_BODY + OWL_WINGS_REACH + "<g transform='rotate(-8 48 46)'>" + owlHead(OWL_BEADS) + "</g>"),
  by: OWL_BY,
  bible: "the 'act' pose: she reaches out and UP with the far wing to the resident's hook, head tipped the same way so the whole body points at where the lantern is going. 9.8% of the glyph changes against idle at 44 px, most of it the wing - the pose that means the delivery."
});
LCSArt.register("owl.oops", {
  w: 96, h: 96,
  svg: owlSvg(OWL_BODY + OWL_WINGS_HOLD + owlHead(OWL_BEADS_WIDE, "<circle cx='48' cy='58' r='4.2' fill='" + OWL_INK + "'/>")),
  by: OWL_BY,
  bible: "SURPRISE, never disapproval: the beads grow 5.4 -> 6.5 and the mouth opens to an 'o'. (Rings around the whites were tried and abandoned: two r-7.4 whites 14.8 apart touch, and with a 2.4 stroke they merge into a figure-eight goggle bar at 44 px - the hen's lens lesson again, from the other side.) FORBIDDEN IN PLAY at game 120: its wrong-hoist pose is owl.think, and the reviewer's check is one screenshot - same body, same size, right or wrong. Kept for the roster and for Boot demos."
});

/* ------------------------------------------------------------
   GAME 120 - the lantern. Always lit: the unlit state does not
   exist in that game, and the dark WINDOW is what carries the lack.
   Its glow is structureSoft because coral is the ask ring's own on
   that screen and a second coral would spend the budget twice; the
   flame is therefore a pale teal light in a teal frame, which is
   what this palette's "lit" looks like everywhere else too (the
   lit window is surface fill + structure stroke).
   ------------------------------------------------------------ */
LCSArt.register("lantern", {
  w: 64, h: 64,
  svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='34' r='27' fill='var(--structureSoft)' opacity='.5'/><path d='M32,3 L32,8' fill='none' stroke='var(--ink)' stroke-width='3.4' stroke-linecap='round'/><circle cx='32' cy='11' r='4.4' fill='none' stroke='var(--ink)' stroke-width='3.2'/><path d='M21,17 L43,17 L41,21 L23,21 Z' fill='var(--structure)' stroke='var(--ink)' stroke-width='2.6' stroke-linejoin='round'/><path d='M23,21 L41,21 L44,45 L20,45 Z' fill='var(--surface)' stroke='var(--structure)' stroke-width='3.4' stroke-linejoin='round'/><path d='M32,26 C36.5,31 37.5,35.5 32,41 C26.5,35.5 27.5,31 32,26 Z' fill='var(--structureSoft)' stroke='var(--structure)' stroke-width='2.2' stroke-linejoin='round'/><path d='M17,45 L47,45 L46,51 L18,51 Z' fill='var(--structure)' stroke='var(--ink)' stroke-width='2.6' stroke-linejoin='round'/><path d='M25,22 L23,44 M39,22 L41,44' fill='none' stroke='var(--structure)' stroke-width='2' opacity='.45'/></svg>",
  by: OWL_BY,
  bible: "object \u00a74 - one instance, identical every time it is drawn (carried, hung, and held by every served resident). The halo is part of the object, not a second entry: a lit thing whose glow is a separate sprite can be drawn without it and then it is just a lamp. The glass is surface so the frame carries the shape; the flame is structureSoft with a structure outline so it survives on white glass."
});

if (typeof window !== "undefined") { window.LCSArt = LCSArt; }
