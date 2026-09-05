/* ============================================================
   theme.js  —  LessonCraft Studio brand tokens ("Direction A")
   ------------------------------------------------------------
   Exact values copied from mini tools/lcs-shell.css.
   Every game reads its colours and fonts from here so all 200
   games match the website and each other.

   DO NOT hardcode colours inside a game. Use THEME.colour.xxx
   so a future palette change is one edit, not 200.

   Phaser wants colours in two different formats depending on
   the call, so each one is provided both ways:
     .hex   "#146B5E"   for text styles and CSS
     .num   0x146B5E    for graphics fills and strokes
   ============================================================ */

const THEME = {

  colour: {
    /* Page and surfaces */
    bg:            { hex: "#FBF3E4", num: 0xFBF3E4 },  // warm cream paper
    surface:       { hex: "#FFFFFF", num: 0xFFFFFF },  // cards, game stage
    surface2:      { hex: "#FBF6EE", num: 0xFBF6EE },  // recessed wells

    /* Text */
    ink:           { hex: "#2A2A35", num: 0x2A2A35 },  // primary text
    inkSoft:       { hex: "#6B6B78", num: 0x6B6B78 },  // secondary text
    inkOnAccent:   { hex: "#14322D", num: 0x14322D },  // dark text for use ON coral

    /* Lines */
    line:          { hex: "#E7DCC8", num: 0xE7DCC8 },  // hairlines, borders

    /* Brand */
    structure:     { hex: "#146B5E", num: 0x146B5E },  // deep teal: frames, controls, titles
    structureSoft: { hex: "#E2F0EC", num: 0xE2F0EC },  // teal wash
    accent:        { hex: "#F2784B", num: 0xF2784B },  // warm coral: highlights
    good:          { hex: "#2FA56A", num: 0x2FA56A },  // success green
    focus:         { hex: "#1E8FD4", num: 0x1E8FD4 }   // focus ring
  },

  /* ----------------------------------------------------------
     CONTRAST RULE — this one matters for readability.
     Pure white on coral (#F2784B) measures 2.73:1, which fails
     accessibility and is genuinely hard for children to read.
     On coral, use cream or dark ink instead:
         colour.bg.hex          "#FBF3E4"
         colour.inkOnAccent.hex "#14322D"
     ---------------------------------------------------------- */

  font: {
    /* Headings and titles */
    display: '"Baloo 2", "Trebuchet MS", system-ui, sans-serif',
    /* Body text, questions, buttons */
    body:    '"Nunito", system-ui, -apple-system, sans-serif',

    /* NOTE: the quotes around "Baloo 2" are required. A font name
       starting with a digit invalidates a CSS font shorthand.
       In Phaser always use longhand:
         { fontFamily: THEME.font.display, fontSize: "22px" }
       NEVER:
         { font: "700 22px Baloo 2" }                             */

    /* The stylesheet that loads both faces. Put this in the
       <head> of every game. */
    webfontUrl: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap"
  },

  size: {
    radius:      18,   // standard corner rounding
    radiusSmall: 12,   // smaller elements
    minTap:      44,   // smallest allowed tap target, in pixels
    cardMaxWidth: 720  // stage never wider than this
  },

  shadow: "0 6px 22px rgba(20,107,94,.10), 0 1px 3px rgba(0,0,0,.06)",
  ease:   "cubic-bezier(.2,.8,.2,1)",

  /* ----------------------------------------------------------
     Buttons for children aged 7-10 are larger than the 44px
     accessibility minimum. These are the sizes games should use.
     ---------------------------------------------------------- */
  button: {
    width:      220,
    height:     72,
    fontSize:   "24px",
    gap:        18     // space between stacked buttons
  }
};
