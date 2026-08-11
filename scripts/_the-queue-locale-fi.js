/* fi — linguist named the parts LAITURI (jetty/platform, 0 collisions in
   `mini tools/` and tool-content; `jono` belongs to pattern-bench) and KULKIJA
   (0 collisions); `pää` is never bare, always "laiturin pää / tästä päästä",
   because in arrow-strip `pää` is a beetle's HEAD. Teacher ruled the counting
   frame over the walking one — the class COUNTS, the walker steps — so `step`
   leaves arrow-strip's `astua` alone; marketing took `Opettajatilaus`.
   REBUILT, not translated: `instruction` (the English asserts the landing
   ALWAYS changes, which `isSelfSame` refutes — Finnish asks it as a question),
   `endLeft/endRight` (bare elatives; the glyph carries the verb), `again`
   ("Toinen laituri" would read as PLATFORM TWO, so "Uusi"). {n} case solution:
   it is a bare numeral before `odottamassa`, so it never takes an ending. */
module.exports = {
  title: "Laiturin päät",

  /* ⚠ the English says the one you land on HAS CHANGED. That is false exactly
     when n is odd and k=(n+1)/2 — the tool ships a whole string for that case.
     Finnish states the invariant (nobody moved) and ASKS the variable. */
  instruction: "Laiturilla odottaa muutama. Valitse pää ja laske eteenpäin: kenen kohdalle pysähdyit? Valitse sitten toinen pää ja laske yhtä monta. Kukaan ei liikkunut — pysähdyitkö saman kohdalle?",

  /* ⚠ bare elatives, not "Aloita…": the two labels then contrast on their FIRST
     word, they fit a 320px row, and Finnish needs no verb to answer "mistä?" */
  endLeft: "Tästä päästä",
  endRight: "Toisesta päästä",
  /* ⚠ NOT "Astu eteenpäin" — `astua` is the motion verb arrow-strip already uses
     for its own beetle, and this tool IS that tool's unwired gesture. We count. */
  step: "Laske eteenpäin",
  board: "Yksi lähtee",
  /* ⚠⚠ "Toinen laituri" is readable as PLATFORM NUMBER TWO — a position word in
     the one tool whose binding law forbids one. "Uusi" has no such reading. */
  again: "Uusi laituri",
  print: "Tulosta arkki",

  /* ⭐ {n} stands alone before the 3rd infinitive, so any digit is grammatical:
     no partitive, no plural, no agreement to get wrong. */
  ariaPlatform: "Laiturilla on {n} odottamassa.",
  /* "kumpikaan" (neither of TWO) states the two-endedness in the furniture */
  ariaNoEnd: "Kumpaakaan päätä ei ole vielä valittu, joten kulkija on laiturin ulkopuolella.",
  ariaWalking: "Kulkija on siirtynyt eteenpäin valitusta päästä.",
  ariaLandedSame: "Kulkija pysähtyi saman odottajan kohdalle kuin toisesta päästä laskettaessa.",

  /* ⚠ no "ensin": the header struck "Pick an end FIRST" for exactly that word */
  sayPickEnd: "Valitse pää — muuten ei ole mistä aloittaa laskemista.",
  sayStepped: "Yksi askel eteenpäin.",
  sayLandedSame: "Sama odottaja kummastakin päästä laskien.",
  sayBoarded: "Yksi lähti pois. Laske uudelleen samasta päästä.",
  sayDealt: "Uusi laituri. Valitse pää, ennen kuin lasket.",
  sayEndOfLine: "Tähän laituri loppuu.",

  sizeLabel: "Montako odottaa",
  sizeThree: "kolme",
  sizeFour: "neljä",

  sheetTitle: "Laituri sellaisena kuin luokka sen jätti — ja tilaa kirjoittaa",
  sheetHint: "Yhdelle riville yksi laskeminen ja se, kenen kohdalle se päättyi.",
  lockedTitle: "Arkki kuuluu Opettajatilaukseen",
  lockedBody: "Koko väline on ilmainen: kaikki laiturit, molemmat päät, kulkija ja se, että yksi voi lähteä pois. Opettajatilaus lisää tulostettavan arkin, jossa näkyvät luokan katsoma laituri ja rivit kirjoittamista varten.",
  gateCta: "Tutustu Opettajatilaukseen"
};
