/* fr — the linguist named the three parts LE QUAI · CEUX QUI ATTENDENT · LE MARCHEUR:
   `file` and `piste` are both arrow-strip's French name, `ligne`/`rang`/`rangée` are
   taken (our-day ships « le rang »), and `plateforme` is the word the French landing
   prose already uses for the WEBSITE — `quai` measured 0 in the whole French corpus.
   The members get a description, not a coined noun, so no gender is imposed on a
   material that refuses to rank itself. The CP/CE1 teacher ruled vouvoiement, struck
   « d’abord » from sayPickEnd (the English header already struck "first" there), and
   kept trois/quatre as the only number words. REBUILT not translated: `instruction`
   (the English asserts the landing always changes — false at k=(n+1)/2, which is the
   tool's own headline moment, so the French ends on the routine's question instead),
   `ariaWalking` (the English never says the walker LANDED, and it is the only channel
   a blind user has), `endLeft`/`endRight` (the English "this end / the other end"
   quietly makes ⇤ the home end, which is the misconception), and `sheetTitle` (the
   sheet draws neither the walker nor the chosen end, so "as the class left it" is an
   over-claim). Marketing took « l’abonnement Enseignant », never "Premium". */
module.exports = {
  /* LE QUAI DES DEUX BOUTS — place-name shape (rue des Deux-Ponts), which is what a
     product name should be, and it says the apparatus and the thesis in four words.
     ⚠ It deliberately avoids « qui attend »: BOTH arrow-strip (« La file qui attend »)
     and pair-gate (« Le défilé qui attend ») already own that relative clause.
     « deux » counts ENDS — a genuine cardinal, never a rank. */
  title: "Le quai des deux bouts",

  /* REBUILT. The English closes on "the one you land on has changed" — a universal the
     model breaks on purpose: at odd n and k=(n+1)/2 the landing is the SAME, and that
     is precisely what `sayLandedSame` celebrates. So the copy would contradict the
     tool's best event. The French states only what is true at every n and every k —
     nobody moved — and hands the class the routine's own third question. */
  instruction: "Quelques-uns attendent sur le quai. Choisissez un bout, puis faites avancer le marcheur pas à pas et regardez sur qui il s’arrête. Repartez de l’autre bout et faites exactement le même nombre de pas. Personne n’a bougé sur le quai : est-ce le même ?",

  /* controls — house infinitive style.
     ⚠ REBUILT: the English pair is "this end" / "the OTHER end", which presupposes one
     end is the one you start from. Invention #1 of this tool is that NEITHER END IS
     HOME. The French pair is symmetric — « ce bout-ci » / « ce bout-là », the same noun
     twice, differentiated only by the deictic a teacher points with, exactly as the ⇤/⇥
     glyphs differentiate the buttons. Neither label can be read as the real one. */
  endLeft: "Partir de ce bout-ci",
  endRight: "Partir de ce bout-là",
  step: "Avancer d’un pas",
  /* ⚠ NO VEHICLE. Not « monter dans », not « le train part ». Somebody simply leaves —
     and shape-stretcher already ships « s’en va » as the house verb for it. */
  board: "Quelqu’un s’en va",
  again: "Un autre quai",
  print: "Imprimer la fiche",

  /* aria. ⚠ This is the one channel with no picture, and the no-position law leaves it
     with nothing to say about WHERE. Every string below therefore states a fact that is
     true without naming a rank. */
  ariaPlatform: "Un quai avec {n} qui attendent.",
  ariaNoEnd: "Aucun bout n’est choisi : le marcheur est resté à côté du quai.",
  /* REBUILT. The English says only that the walker "has moved along" — a blind user is
     never told it came to rest ON somebody, which is the whole event. Adding « et s’est
     arrêté sur quelqu’un » is position-free and is the only thing this channel can give. */
  ariaWalking: "Le marcheur s’est avancé depuis le bout choisi et s’est arrêté sur quelqu’un.",
  ariaLandedSame: "Le marcheur s’est arrêté sur le même qu’en partant de l’autre bout.",

  /* said aloud — never a position, never a cardinal for an ordinal.
     ⚠ « d’abord » is refused here: the English header records that "Pick an end FIRST"
     was struck from this exact string, and French would smuggle the same word back. */
  sayPickEnd: "Choisissez un bout : sans bout choisi, on ne sait pas d’où compter.",
  /* an increment, not a rank — « un pas de plus », never « le premier pas ». */
  sayStepped: "Un pas de plus.",
  sayLandedSame: "Le même, compté d’un bout ou de l’autre.",
  /* echoes the `board` label’s own verb, so the class hears one event, not two. */
  sayBoarded: "Quelqu’un est parti. Recomptez depuis le même bout.",
  sayDealt: "Un autre quai. Choisissez un bout, puis comptez.",
  sayEndOfLine: "Le quai ne va pas plus loin.",

  /* settings — the ONE place a number word is honest: it counts how many are waiting. */
  sizeLabel: "Combien attendent",
  sizeThree: "trois",
  sizeFour: "quatre",

  /* REBUILT. `_buildSheet` draws the members and six ruled lines — it draws NEITHER the
     walker NOR the chosen end, so the English "as the class left it" promises a state
     the paper does not carry. The French promises only the quai that is on screen. */
  sheetTitle: "Le quai tel qu’il est à l’écran, et de quoi écrire",
  sheetHint: "Sur chaque ligne, un comptage fait par la classe, et sur qui le marcheur s’est arrêté.",

  /* verified against the code: `premium` gates `_print` and `_buildSheet` ONLY (and the
     beforeprint guard blanks the sheet). Both ends, the stepping, the leaving, the
     re-deal and both sizes are free at every tier. The claim below is true.
     ⚠ The sheet clause is narrowed to « le quai affiché à l’écran » for the same reason
     as sheetTitle — the printed frame carries no walker and no chosen end. */
  lockedTitle: "La fiche fait partie de l’abonnement Enseignant",
  lockedBody: "Tout l’appareil est gratuit : chaque quai, les deux bouts, le marcheur, et le départ de quelqu’un. L’abonnement Enseignant ajoute la fiche imprimée, qui reprend le quai affiché à l’écran, avec des lignes pour écrire.",
  gateCta: "Voir l’abonnement Enseignant"
};
