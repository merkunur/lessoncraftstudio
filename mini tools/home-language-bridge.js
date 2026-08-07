/* =====================================================================
   TOOL #29 — SAY IT BOARD   (home-language-bridge.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). Rebuilt 2026-08-07 from the v2 build to the v4 bar.

   THE ONE THESIS — A CHILD WHO CANNOT SPEAK THE ROOM'S LANGUAGE IS NOT
   SILENT BY CHOICE. Give them a way to be heard on day one and the rest
   of the year is different. This is not vocabulary teaching and it is
   not assessment: it is a voice.

   ⭐⭐ THE ONE DEFECT THE REBUILD EXISTS TO FIX — THE BOARD COULD NOT
   SAY NO. All twelve shipped phrases were REQUESTS. Not one was an
   answer, a refusal, or a report: no `yes`, no `no`, no `stop`, no
   `it hurts`. A child handed only requests is trained into a supplicant
   for a year, which is the exact opposite of the thesis above. The
   first job of this rebuild was not categories, printing or authoring —
   it was yes / no / stop / it hurts. Everything else follows.

   ⭐ THE INVENTION — WHEN THE DEVICE HAS NO VOICE FOR THE CLASSROOM
   LANGUAGE, THE BOARD RECONFIGURES INSTEAD OF APOLOGISING. Show-big is
   FORCED ON and its chip is disabled with the reason. With no voice,
   showing is the only channel left, and a tool that requires a teacher
   to discover a chip in order to get it has failed the child. The
   failure mode changes the apparatus; it does not print a note under it.

   THE MOAT — the register. Every per-locale phrase elsewhere in this
   codebase is in the wrong grammatical person: routine labels, adult
   offers, system announcements, all spoken BY an adult TO a child.
   `our-day.js` has a `bathroom` label ("Toilettid"); that is a
   timetable entry, not a request. This is the only surface in the
   product where the CHILD is the speaker, in the first person, to an
   adult — which flips register in all eleven at once: politeness
   formulas, the child-to-teacher register, and whether the toilet
   request is euphemised (it is, differently, in every one).

   ⚠ AND THAT MOAT WAS UNBUILT UNTIL NOW. The v2 docblock claimed the
   ten non-English sets were "corrected in place by
   scripts/apply-home-language-bridge-fanout.js from the per-locale
   native 3-agent ensembles". THAT SCRIPT NEVER EXISTED — the only two
   references to the name in the whole repo were the comment and its
   own gitignored mirror, and `git log` showed exactly two commits on
   the file. No Finn had ever read the Finnish for "I need the toilet".
   The SoT + apply script named at the bottom of this header are real,
   and the panels have now run.

   ⚠ WHY IT IS ICON-FIRST, AND WHY THAT MATTERS MORE THAN IT SOUNDS.
   `lcs-shell.js:22` fixes the platform at eleven Latin-script European
   locales. The child who actually arrives mid-year in a German, Swedish
   or Dutch classroom speaks Ukrainian, Arabic, Turkish, Somali or
   Romanian — none of which we have. A tool built on a home-language
   WORD would have served the international-school child while wearing
   the newcomer's name. An ICON is understood by every child in every
   language. So the board is pictures first; the classroom-language line
   is support for the adult; and the home-language line appears only
   when that language happens to be one of ours — a bonus, never the
   premise.

   ⚠ NEVER SPEAK A LANGUAGE THE DEVICE HAS NO VOICE FOR — AND NEVER
   SPEAK A STRING WE DO NOT HAVE IN THAT LANGUAGE. `LCSAudio` sets
   `u.lang` and hopes; a missing voice is silently substituted, so a
   Finnish line gets German phonology. Two guards, not one:
     · `hasVoice(lang, voices)` — with an EMPTY getVoices() treated as
       "not yet", NOT as "yes" (Chrome returns [] until `voiceschanged`
       fires; the v2 build cached the optimistic answer, so on the very
       device where the voice is missing the warning could never appear).
     · NO `|| p.t.en` FALLBACK ON THE SPEECH PATH. The v2 build resolved
       `p.t[classroom] || p.t.en` and then spoke it tagged as the
       classroom language — English words in a Finnish voice, arriving
       through the one path the voice guard cannot see. Latent then;
       ACTIVE the moment a teacher writes her own phrase, because a
       teacher phrase has no per-locale translations by construction.
       A card we cannot say in the language asked for is SHOWN, not said.

   FENCES:
     Picture Word Wall  a vocabulary WALL: browse a theme, tap a card,
     (#12)              hear the noun with its article. No themes, no
                        nouns, no articles, no index here — the gate
                        asserts it never fetches pww-index at all.
     Feelings Check-In  owns how a child FEELS, by name and by day-slot.
     (#24)              THIS BOARD OWNS WHAT A CHILD NEEDS. There is no
                        "I feel" category here and there never will be.
                        ⚠ But PHYSICAL STATE IS NOT EMOTION: `sick`,
                        `tired`, `hurt`, `hot`, `cold` stay. "I feel
                        sick" belongs HERE, not there, on three grounds
                        — it demands action within seconds while #24 is
                        an arrival ritual tapped once at 08:55; #24's
                        day slot holds one value and clears nightly, so
                        a child ill at 11:20 has no route through it;
                        and vomiting is not a feeling.
     Our Day (#20)      owns the timetable. A schedule label is not a
                        request.

   REFUSES, FOREVER:
     · no assessment of the newcomer — no level, no score, no progress,
       no "words learned" (every product in this space adds one, and it
       is the harmful part)
     · ⚠⚠ NO USAGE LOG, AND IT IS STRUCTURAL, NOT A POLICY. No count of
       which cards were pressed, ever, not even "just for the teacher".
       "Tapped `toilet` nine times", "tapped `someone is unkind` four
       times" is a behavioural record of a vulnerable child and WILL be
       read as evidence in ways that harm. No counter keyed by phrase id
       exists in this file. `api.track` fires tool-level events only and
       never carries a phrase id; the gate asserts it.
       (The teacher desk's Recent-icons list is NOT this. It records
       which ICONS AN ADULT picked while authoring, in the adult
       surface. One is a tool remembering a teacher's own recent
       choices; the other is a record about a child.)
     · NO FLAGS: a flag is a country, not a language, and Spanish is not
       Spain to a Mexican child — languages are named endonymically
     · no adult-drive mode — no teacher-taps-to-prompt, no second
       device, no "teacher says" panel. The instant an adult can speak
       THROUGH the board it stops being the child's voice.
     · no emergency card and no alert routing. A child in danger shouts
       and runs; a screen-mediated emergency is slower and gives false
       assurance to everyone. Competitors sell this as "instant staff
       alert" and it is the most dangerous feature in the category.
     · no recording of a child's voice, not even for name pronunciation
       — biometric, a child, and the one datum a school cannot un-share.
       The teacher types a phonetic spelling instead.
     · no machine translation and no translate box. The first error will
       land on a toilet card or a pain card. Every home line comes from
       a human who speaks it.
     · the board never asks who is using it. No name, no roster, no
       "select the pupil" — a board that must be ASSIGNED marks the
       child it is assigned to.
     · no scarcity on a child's voice. Every child-voice card speaks in
       every entitlement state, and a teacher phrase already made never
       locks.
     · the home language is never smaller, greyed or bracketed
     · no timers, no chime on tap (a beep steps on the phrase and is
       precisely the "correct!" sound this board refuses)

   ⚠ MEASURED, not assumed:
     · the tool page pins this iframe at ~704px at 1440, 1920 and 2560
       alike (`max-w-3xl`), so the v2 build's three `(min-width:1367px)`
       tiers were DEAD for every desktop teacher. The board is sized
       with CONTAINER queries, which resolve against the element and so
       behave identically embedded and standalone.
     · `.hlb-icon` was `clamp(44px,13vw,56px)` — `vw` inside a
       manipulative, and it clamps at 56px above a 431px viewport, so
       the picture, the declared primary channel, NEVER GREW AT ANY
       WIDTH. On the widest tier the card reached 224px around a 56px
       icon: only the padding grew.
     · `lcs-shell.css` ships ZERO `@media print` blocks, so
       `html,body{overflow:hidden}` and `.lcs-app{max-width:720px}`
       survive into print. They are reset here explicitly.

   THE SOURCES OF TRUTH
     strings + phrases : scripts/_home-language-bridge-strings.js
     applied by        : scripts/apply-home-language-bridge-locales.js
     proved by         : scripts/verify-home-language-bridge.js
                         scripts/mutate-home-language-bridge.js
   ===================================================================== */
(function () {
  'use strict';

  /* ===================================================================
     THE ICON SYSTEM
     -------------------------------------------------------------------
     ⭐ THE COLOUR LAW, and it is a decoding rule rather than decoration:

         TEAL is the world.  CORAL is me, and the point of the sentence.

     `myturn` is a coral person with a teal arrow; `playtoo` is teal
     people with a coral arrow; `grownup` is a teal adult and a coral
     child; an ache glows coral at the part that hurts. One rule,
     learned once, paying out across seventy-two pictures. That is what
     makes this a system rather than seventy-two drawings, and it does
     the separation work a monochrome outline set cannot.

     ARROW LAW: an arrow means "toward / becomes", is short, and is
     NEVER the sole content. Only a handful carry one — that cap is what
     prevents arrow-soup, the failure mode of every large AAC set.

     ⚠ SKIN TONE — RULED, WITH THE RESIDUAL STATED.
     Where a whole person is unavoidable: no skin tone, no hair, no
     face, ever. Cream disc + #146B5E ring + a solid single-colour body.
       1. A board carries ONE CHILD'S OWN utterance. A figure with a skin
          tone reads as a third party — "that boy" — not "me". A
          tone-free schematic is A PRONOUN, NOT A PORTRAIT.
       2. Seventy-two icons times five tones is 360 drawings, and a tone
          picker is a choice the child must make under pressure while
          trying to ask for the toilet. That is a design failure, not
          inclusion.
       3. Any single naturalistic tone is wrong for most of the room.
       4. Cream is the product's own paper and carries a hard teal ring.
     The residual, stated honestly rather than hidden: cream is arguably
     a light skin tone. It is the LEAST-WRONG option, not a costless one.
     Differentiate by size, posture and GARMENT colour — never by head
     colour. Colour on a garment is a costume; colour on a head is a race.

     THE GRID (G1-G11, all enforced by verify-home-language-bridge.js):
       G1  viewBox 0 0 48 48, children only — no outer <svg>
       G2  live area 4..44; nothing touches the edge
       G3  minimum feature 2.6u (2.4px at the 44px floor)
       G4  stroke widths from a fixed set; always round caps and joins
       G5  every path declares fill or fill="none"+stroke, never defaulted
       G6  at most 4 hex per fragment (5 for a face)
       G7  ⚠ NO id, <use>, <defs>, url(#…), filter, mask, <text>, <image>
           — these stamp seventy-two times on one page, and duplicate ids
           across inline SVG is a live bug
       G8  no currentColor. A DELIBERATE divergence from calendar-wall,
           whose badges sit on VARIABLE grounds and so must inherit. A
           Say It card ground is always #FFFDF7, and fixing the colour
           lets figure/ground contrast do the separation work.
       G9  opacity never below 0.30
       G10 BANNED MARKS: no tick, no cross, no star, no thumbs-up, no
           red/green pair, no flag, no emoji codepoint, no medical cross,
           no prohibition slash. A VERDICT MARK AND A REWARD MARK ARE
           BOTH REFUSALS OF WHAT THIS BOARD IS.
       G11 legible at 32 / 44 / 96 and with CSS off

     ⚠ AND THE PRINT CONSTRAINT, which is why colour may never carry
     meaning: many school printers are monochrome, so every icon must be
     unambiguous as PURE BLACK LINE ART at card size. Colour adds warmth;
     colour never carries the message. The print path strips it.

     BOARD RULE, from the confusion audit: `help`, `stop` and `nomore`
     are all coral hands, separated by their COMPANION MARK (a forearm /
     a teal post / a cream plate). They are never placed adjacent.
     =================================================================== */
  var ICONS = {

    /* ---- CORE ------------------------------------------------------ */

    /* ⚠ NO THUMBS-UP. The gesture is obscene across parts of West Asia,
       the Middle East and West Africa — precisely where our newcomer
       comes from. No tick either: a verdict mark. A head with a nodding
       arc is the most transparent pair available.
       RESIDUAL RISK, FLAGGED NOT SOLVED: the head-shake is inverted in
       Bulgaria and ambiguous in parts of South Asia. No gesture-free
       alternative is more transparent; the mitigation is that yes/no
       sit adjacent so they read as a pair, plus the text line beneath. */
    /* ⚠⚠ REDRAWN AFTER I LOOKED AT THE CONTACT SHEET, and no gate caught
       it: as a bare ring with chevrons under it, `yes` read as a
       DOWNLOAD ARROW and `no` — a ring with an arrow either side — read
       as an EXPAND control. The two most important cards on the board
       were UI furniture. The gate could not see it because both were
       perfectly distinct from everything else and from each other;
       distinctness is not legibility, and only a person reading the
       render can tell them apart.
       The fixes are a SOLID head with a shoulder line, so the disc is
       read as a person rather than a circle, and a single unambiguous
       motion arrow: an arc curving DOWN over the head for the nod, and
       a double-headed arc ACROSS it for the shake. */
    /* ⚠ THE ARC IS VERTICAL, and getting that wrong is what the gate
       caught. I drew the nod as a curve ACROSS THE TOP of the head —
       which is the same gesture as the shake — so `yes` and `no`
       measured 0.718 against each other: the two cards on this board
       where a confusion is worst, drawn as the same motion.
       A nod goes DOWN. The arc runs down the side of the head and the
       arrowhead points at the floor; `no` sweeps across. One is
       vertical, one is horizontal, and that reads at any size. */
    yes: '<circle cx="21" cy="24" r="10.5" fill="#FFFDF7" stroke="#146B5E" stroke-width="3"/>'
       + '<path d="M8 43v-1a13 13 0 0 1 26 0v1z" fill="#146B5E"/>'
       + '<path d="M38 9q7 14 0 26" fill="none" stroke="#F2784B" stroke-width="3.4" stroke-linecap="round"/>'
       + '<path d="M38 35l-6-4.5M38 35l1.5-7.5" fill="none" stroke="#F2784B" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>',

    no: '<circle cx="24" cy="25" r="10.5" fill="#FFFDF7" stroke="#146B5E" stroke-width="3"/>'
      + '<path d="M11 43v-1a13 13 0 0 1 26 0v1z" fill="#146B5E"/>'
      + '<path d="M6 11q18 8 36 0" fill="none" stroke="#F2784B" stroke-width="3.4" stroke-linecap="round"/>'
      + '<g fill="none" stroke="#F2784B" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">'
      + '<path d="M6 11l7.5-2M6 11l4 6.5"/><path d="M42 11l-7.5-2M42 11l-4 6.5"/></g>',

    /* help — a raised hand WITH a forearm to the bottom edge. The arm is
       what separates it from `stop` at card size. */
    /* ⚠ THE FINGERS ARE SEPARATED, AND THAT IS THE WHOLE DRAWING.
       This one cost two measurements and the first was the wrong
       direction. Against `thanks` — a raised hand and a heart, which no
       reader would ever confuse — the 34px monochrome silhouette scored
       0.658, because a heart and a domed hand are both a compact
       rounded coral mass. I narrowed the wrist to break the mass up and
       re-measured: it went to 0.684, i.e. WORSE, because removing the
       forearm made the shape MORE compact and so more heart-like.
       ⭐ MEASURE THE DIRECTION OF A FIX, DO NOT ASSUME IT. What
       separates a hand from a heart is not its bulk, it is that the top
       edge is SERRATED rather than domed — so the fingers are thinner
       with real gaps between them, and the forearm runs to the bottom
       edge, which no heart has. */
    help: '<g fill="#F2784B">'
        + '<rect x="15.5" y="9" width="4" height="14" rx="2"/>'
        + '<rect x="21.3" y="5" width="4" height="18" rx="2"/>'
        + '<rect x="27.1" y="7" width="4" height="16" rx="2"/>'
        + '<rect x="32.9" y="11.5" width="4" height="11.5" rx="2"/>'
        + '<path d="M15.5 20l-5.6 5a2.8 2.8 0 0 0 2.2 4.8l3.4-.8z"/>'
        + '<path d="M13.5 20h23.4v7A8.5 8.5 0 0 1 28.4 35.5h-6.4a8.5 8.5 0 0 1-8.5-8.5z"/>'
        + '<rect x="19" y="33" width="11" height="11" rx="2.4"/>'
        + '</g>',

    /* ⚠ ONLY TWO ICONS IN THE SET CARRY A QUESTION MARK, and they differ
       by CONTAINER: a "?" in a BUBBLE is about what you SAID; a "?"
       beside a PIN is about a PLACE. Nothing else uses one. */
    nounder: '<path d="M6 10.5A4.5 4.5 0 0 1 10.5 6h27A4.5 4.5 0 0 1 42 10.5v17a4.5 4.5 0 0 1-4.5 4.5H21l-9 8.5V32h-1.5A4.5 4.5 0 0 1 6 27.5z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
           + '<path d="M19.5 15.5a5 5 0 1 1 6.4 4.8c-1.2.4-1.7 1.2-1.7 2.3v.9" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round"/>'
           + '<circle cx="24" cy="27" r="2.1" fill="#F2784B"/>',

    /* stop — the same hand meeting a teal post. NOT an octagon (a
       traffic sign), NOT a slash-circle (a verdict). No forearm: that
       is the tell that separates it from `help`. */
    stop: '<rect x="34" y="7" width="7" height="34" rx="2.5" fill="#146B5E"/>'
        + '<g fill="#F2784B">'
        + '<rect x="12" y="11" width="4.6" height="15" rx="2.3"/>'
        + '<rect x="17.5" y="8.5" width="4.6" height="17.5" rx="2.3"/>'
        + '<rect x="23" y="10" width="4.6" height="16" rx="2.3"/>'
        + '<rect x="28.5" y="14" width="4.6" height="12" rx="2.3"/>'
        + '<path d="M10 23h23.1v8.5A9.5 9.5 0 0 1 23.6 41h-4.1A9.5 9.5 0 0 1 10 31.5z"/>'
        + '</g>',

    /* ⭐ toilet — cistern, pedestal, seat, water. The v2 build drew this
       card as `door`: M12 6h16v28H12zM24 20h.1, a rectangle with a dot,
       which is equally a door, a window, a card, a phone or a book. A
       door means EXIT, so a newcomer pointing at it read as "I want to
       leave", whose adult answer is no. THE ONE PHRASE A CHILD MUST BE
       ABLE TO SAY WITHOUT WORDS WAS DRAWN AS AN AMBIGUOUS RECTANGLE. */
    /* ⚠⚠ SIDE VIEW, and this is the second time this one card has had to
       be redrawn. The v2 build drew it as a DOOR, which means exit. My
       first replacement drew it head-on — cistern above, oval bowl
       below — and on the contact sheet it read as A TABLE LAMP. Both
       versions passed every mechanical check.
       A toilet is recognised in profile: a tank standing behind, a seat
       running forward from it, a pedestal under. That is the AAC
       convention and it is the shape a three-year-old points at.
       This is the single card on the board that most has to work. */
    toilet: '<rect x="7" y="7" width="12" height="17" rx="2" fill="#9FB6B0"/>'
          + '<rect x="8.5" y="4" width="9" height="3.5" rx="1.5" fill="#146B5E"/>'
          + '<path d="M19 13h19a4 4 0 0 1 4 4v1a9 9 0 0 1-9 9h-9a5 5 0 0 1-5-5z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
          + '<ellipse cx="30" cy="19.5" rx="7" ry="3.4" fill="#9CC3E5"/>'
          + '<path d="M22 27h11l3 16H19z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>',

    look: '<path d="M4.5 24s7.5-11 19.5-11 19.5 11 19.5 11-7.5 11-19.5 11S4.5 24 4.5 24z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
        + '<circle cx="24" cy="24" r="6.5" fill="#3C7C72"/>'
        + '<circle cx="24" cy="24" r="3" fill="#146B5E"/>'
        + '<circle cx="26.4" cy="21.6" r="1.6" fill="#FFFDF7"/>',

    /* ⚠ NOT A TICK. A checkmark is a verdict mark and this board refuses
       verdicts — a teacher glancing at the card would read "correct",
       which is the one thing it must never say. The page is IN A TRAY:
       handed in, not judged. (The v2 build had this reasoning right and
       drew a folded-corner page, which reads as "a document" rather
       than "finished"; the tray is what carries the meaning.) */
    finished: '<path d="M14 5h14l6 6v18H14z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
            + '<path d="M28 5v6h6" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
            + '<g stroke="#9FB6B0" stroke-width="2.4" stroke-linecap="round"><path d="M18.5 16h11M18.5 22h11"/></g>'
            + '<path d="M6 31h36v6a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#F2784B"/>',

    /* ---- 1 · MY BODY ----------------------------------------------- */

    /* an outline-only glass is an empty vessel; the blue liquid is what
       says WATER. Lifted from feelings-check-in.js so a child who knows
       that tool already knows this card. */
    water: '<path d="M17 14h14l-2 26a5 5 0 0 1-10 0z" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
         + '<path d="M17.9 26h12.2l-1.1 14a5 5 0 0 1-10 0z" fill="#9CC3E5"/>',

    hungry: '<ellipse cx="24" cy="28" rx="14" ry="9" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6"/>'
          + '<ellipse cx="24" cy="28" rx="8" ry="4.6" fill="#F2C879"/>'
          + '<g stroke="#146B5E" stroke-width="2.6" fill="none" stroke-linecap="round">'
          + '<path d="M5.5 8v8M9 8v8M7.2 16v13"/><path d="M42 8q-3 5 0 9v12"/></g>',

    /* "I can't eat this" — the hand is FLAT and HORIZONTAL over a plate.
       `stop` is vertical against a post; `help` has a forearm.
       ⚠ THE CARD NEVER SAYS WHY. Halal, kosher, allergy or texture — a
       child should not have to declare their religion to eat lunch. */
    nomore: '<ellipse cx="24" cy="33" rx="13" ry="8" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6"/>'
          + '<g fill="#F2784B">'
          + '<rect x="11" y="9" width="5" height="12" rx="2.5"/>'
          + '<rect x="18" y="6.5" width="5" height="14.5" rx="2.5"/>'
          + '<rect x="25" y="7.5" width="5" height="13.5" rx="2.5"/>'
          + '<rect x="32" y="11" width="5" height="10" rx="2.5"/>'
          + '<path d="M8 20h32v3.5a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z"/></g>',

    /* hurt — a plaster on the diagonal + a coral throb. One icon for
       "it hurts" AND "I need a plaster", which removes a pair. */
    hurt: '<g transform="rotate(-28 24 24)">'
        + '<rect x="7" y="17.5" width="34" height="13" rx="6.5" fill="#F2C879" stroke="#8F6512" stroke-width="2"/>'
        + '<rect x="17.5" y="18.5" width="13" height="11" fill="#FBF3E4"/>'
        + '<g fill="#8F6512"><circle cx="21" cy="21.8" r="1.3"/><circle cx="27" cy="21.8" r="1.3"/>'
        + '<circle cx="21" cy="26.2" r="1.3"/><circle cx="27" cy="26.2" r="1.3"/></g></g>'
        + '<g stroke="#F2784B" stroke-width="2.8" stroke-linecap="round">'
        + '<path d="M32.5 9l2.5-2.5M38 15h3.5M36.5 21.5l3 1.5"/></g>',

    /* sick — queasy. GREY-GREEN cheeks and a wavy mouth. The v2 build
       drew THE SAD FACE here, a straight collision with the tool this
       one fences against.
       ⚠ The features are 2.2, not the 1.9 the house faces use. The icon
       gate caught the 1.9 and I fixed the DRAWING rather than widening
       the rule: this face is not lifted from anywhere, so there is no
       cross-tool-consistency argument for a sub-2.0 stroke, and a 1.9
       at card size is 1.35px — the weight calendar-wall records as
       greying out under projector gamma. */
    sick: '<circle cx="24" cy="24" r="17" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.4"/>'
        + '<circle cx="13.5" cy="27" r="3.6" fill="#9FB6B0" opacity="0.6"/>'
        + '<circle cx="34.5" cy="27" r="3.6" fill="#9FB6B0" opacity="0.6"/>'
        + '<g stroke="#8F6512" stroke-width="2.2" fill="none" stroke-linecap="round">'
        + '<path d="M15.5 23.5q3-2.6 6 0"/><path d="M26.5 23.5q3-2.6 6 0"/>'
        + '<path d="M18 31q3-2.6 6 0t6 0"/></g>',

    /* "I need to be sick" — a bowl, held. Split from `sick` deliberately:
       one means sit down and let me look at you, the other means bin,
       now, door. */
    /* ⚠ REDRAWN: the first version put three rising strokes above the
       bowl, and on the contact sheet they read as STEAM — so the card
       for "I need to be sick" showed a hot bowl of soup, two cards away
       from `hungry`. Rising lines mean heat; the arrow points DOWN, into
       the bowl, and the bowl is held. There is no misreading a bowl
       being held under a face with something going into it. */
    basin: '<circle cx="24" cy="8" r="5.5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
         + '<path d="M24 15v8m-4-4 4 4 4-4" fill="none" stroke="#F2784B" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'
         + '<path d="M7 25h34v3a13 13 0 0 1-13 13h-8A13 13 0 0 1 7 28z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
         + '<path d="M4 25h40" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',

    /* ⭐ "I need a little break" — a low soft cushion, sat on.
       ⚠ THIS SLOT USED TO BE A `tired` FACE AND THE GATE'S FENCE CAUGHT
       IT. "I am tired" is a FEELING, and feelings-check-in (#24) already
       ships `feelTired`; drawing it here would have re-opened the exact
       fence this tool's header spends a paragraph defending. The
       pedagogy panel named the substitution: our equivalent of "tired"
       is "I need a little break", which is a REQUEST — the thing this
       board is for — not a state report.
       ⚠ And NOT the v2 build's bench outline, which read equally as a
       table, a bed or a sofa: "I need a break" is not legible from a
       piece of furniture. A person ON the soft thing is. */
    rest: '<path d="M4 29h40a6 6 0 0 1 0 12H4a6 6 0 0 1 0-12z" fill="#3C7C72"/>'
        + '<circle cx="24" cy="12" r="6.6" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
        + '<path d="M13 29V26a11 11 0 0 1 22 0v3z" fill="#F2784B"/>',

    /* sun ABOVE, coral heat waves BELOW. `outside` puts a small sun off
       to one side beside a tree; this one is central and rayed. */
    hot: '<circle cx="24" cy="17" r="8.5" fill="#F2A93B"/>'
       + '<g stroke="#F2A93B" stroke-width="3" stroke-linecap="round">'
       + '<path d="M24 6.5v-2.5M13 17H8M35 17h5M15.5 8.5l-3-3M32.5 8.5l3-3"/></g>'
       + '<g stroke="#F2784B" stroke-width="3" fill="none" stroke-linecap="round">'
       + '<path d="M14 33q3.3-3.6 6.7 0t6.7 0t6.6 0"/>'
       + '<path d="M14 40q3.3-3.6 6.7 0t6.7 0t6.6 0"/></g>',

    /* snowflake + SHIVER arcs. The shiver is what makes it "I am cold"
       rather than "it is snowing outside". */
    cold: '<g stroke="#4A90B8" stroke-width="3" stroke-linecap="round">'
        + '<path d="M24 7v34M12.3 13.8 35.7 34.2M12.3 34.2 35.7 13.8"/>'
        + '<path d="M24 7l-4 4.6M24 7l4 4.6M24 41l-4-4.6M24 41l4-4.6"/></g>'
        + '<g stroke="#9CC3E5" stroke-width="2.6" fill="none" stroke-linecap="round">'
        + '<path d="M6.5 19q2.6 5 0 10"/><path d="M41.5 19q-2.6 5 0 10"/></g>',

    /* ⭐ "I need dry clothes" — a folded, clean set of clothes. NEVER a
       puddle, never a wet mark, never anything that names the event.
       The wording of the phrase is itself a ruling and the picture obeys
       it: name the REMEDY, not the accident. It assigns no fault, it
       tells the adult exactly what to do, and it survives eleven
       translations without picking up a blame word. */
    /* ⚠ A FOLDED STACK, not a hanging shirt. The render measured a
       hanging-garment drawing at 0.851 against `coat` — the two highest
       silhouettes in the whole set, and both are clothes, so a child
       reaching for dry trousers would have been reading a coat. A stack
       from the cupboard is what "dry clothes" actually is, and its
       silhouette (flat horizontal layers) shares nothing with a coat. */
    /* ⚠ A FOLDED SHIRT WITH A COLLAR, on one more layer — the third
       drawing of this icon and the second caught by my own eyes rather
       than by a gate. As three plain horizontal bars it measured safely
       below the similarity floor and then read, on the rendered board,
       as a SOFA — two cards away from `rest`, which is a person on a
       cushion. Two pieces of furniture, in one category, for "I need
       dry clothes" and "I need a break". The collar notch is what makes
       a stack of fabric legible as clothing. */
    /* ⚠ TEAL, and the colour law is why — clothes are a thing in the
       world, and CORAL IS RESERVED FOR ME AND THE POINT OF THE
       SENTENCE. Drawn coral it collided with `lunchbox` at 0.719 and
       `stop` at 0.715, because a filled coral rounded mass is what
       those already are. The law and the measurement agreed. */
    /* ⚠ SLEEVES. Four attempts, and the first three all failed for the
       same reason: a stack, a folded square and a rounded box are all
       BOXES, and this category already contains two (`lunchbox`,
       `nose`). Colour could not help — the similarity is measured in
       monochrome, exactly as a school printer renders it. A T-shirt
       silhouette shares its outline with nothing else in the set, which
       is the only thing that actually separates a picture at 34px. */
    clothes: '<path d="M17 9h14l10 6-4.5 8-4-2v18H15.5V21l-4 2L7 15z" fill="#3C7C72" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/>'
           + '<path d="M17 9h14a7 7 0 0 1-14 0z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2"/>'
           + '<path d="M6 43h36" stroke="#9FB6B0" stroke-width="3" stroke-linecap="round"/>',

    /* ⚠ the cap is teal, not grey-green: the gate's 4-colour cap fired
       at five, and dropping a colour is the fix, not raising the cap. */
    medicine: '<rect x="16" y="4.5" width="16" height="6" rx="2" fill="#146B5E"/>'
            + '<path d="M12 12h24v25a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
            + '<path d="M12 24h24v13a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z" fill="#F2C879"/>'
            + '<circle cx="24" cy="18" r="3.4" fill="#F2784B"/>',

    /* the WHITE SPIKE above the box is what separates it from the other
       two boxes in the set. */
    /* ⚠ THE TISSUE IS PULLED OUT AND SOFT, and the box is squarer. As a
       wide shallow box with a rigid triangle on top it read on the
       rendered board as a BASKET — the tissue looked like a lid. A
       tissue is limp; giving it a curved, asymmetric silhouette is what
       stops the whole thing reading as one solid container. */
    nose: '<rect x="11" y="24" width="26" height="17" rx="3" fill="#9CC3E5"/>'
        + '<rect x="11" y="24" width="26" height="5" rx="2" fill="#4A90B8"/>'
        + '<path d="M17 26q1-13 7-15 1 7 5 8 -4 3 -4 7z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2" stroke-linejoin="round"/>',

    /* ---- 2 · I DON'T UNDERSTAND (the speech-bubble family) --------- */

    /* the circular arrow lives INSIDE the bubble, which ties it to the
       speech family and away from `more` and `next`. */
    /* ⚠ THE ARROW IS LARGE AND OUTSIDE THE BUBBLE, which is the whole
       redraw. Four icons in this category are bubbles and the bubble is
       most of the ink, so a small mark inside one is invisible to a
       shape comparison — `again` measured 0.713 against `nounder` and
       0.766 against `howsay` purely on the container they share. Here
       the bubble is small and the loop wraps it: the loop is the
       silhouette, and nothing else in the set loops. */
    again: '<path d="M14 12.5A3.5 3.5 0 0 1 17.5 9h13a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5h-5l-5 4v-4h-3a3.5 3.5 0 0 1-3.5-3.5z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/>'
         + '<path d="M40 21a16 16 0 1 1-9-14.5" fill="none" stroke="#F2784B" stroke-width="3.6" stroke-linecap="round"/>'
         + '<path d="M23 4.5 32 7l-2.5 9" fill="none" stroke="#F2784B" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>',

    /* three WIDELY SPACED dots. The gaps are the meaning: "say it ...
       with ... gaps". No snail and no tortoise — both culture-bound. */
    /* ⚠ THE DOTS ARE THE SILHOUETTE, not a mark inside a bubble. As a
       full bubble it measured 0.677 against `nounder`: in this category
       the bubble is most of the ink, so four bubbles are four of the
       same shape however different the marks inside them are. The
       bubble is now a small tail on the left and the three widely
       spaced dots carry the picture — and the GAPS between them are the
       meaning, "say it ... with ... gaps". No snail and no tortoise:
       both are culture-bound. */
    slower: '<path d="M4 15A3.5 3.5 0 0 1 7.5 11.5h6A3.5 3.5 0 0 1 17 15v5a3.5 3.5 0 0 1-3.5 3.5h-2l-4.5 4v-4h-.5A3.5 3.5 0 0 1 4 20z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/>'
          + '<g fill="#F2784B"><circle cx="24" cy="30" r="5"/><circle cx="35" cy="30" r="5"/><circle cx="44" cy="30" r="3.6"/></g>',

    showme: '<rect x="20" y="9" width="22" height="26" rx="3" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6"/>'
          + '<g stroke="#9FB6B0" stroke-width="2.6" stroke-linecap="round"><path d="M25 17h12M25 23h12M25 29h8"/></g>'
          + '<path d="M4.5 24h14v6.5a3 3 0 0 1-3 3H10a5.5 5.5 0 0 1-5.5-5.5z" fill="#F2784B"/>'
          + '<rect x="9" y="20.5" width="12" height="5" rx="2.5" fill="#F2784B"/>',

    write: '<path d="M10 38l4-10 18-18 6 6-18 18z" fill="#F2C879" stroke="#8F6512" stroke-width="2.2" stroke-linejoin="round"/>'
         + '<g stroke="#8F6512" stroke-width="2.2" stroke-linecap="round"><path d="M32 10l6 6M14 28l6 6"/></g>'
         + '<path d="M8 42h20" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/>',

    /* "What is this?" — a coral finger pointing AT a teal thing. No
       question mark: the pointing is the question, and the two "?"
       icons are already spoken for. */
    /* ⚠ A FINGER ON A FLAT CARD, not on a cube. Drawn against the cube
       it measured 0.817 against `mine` and 0.739 against `wanttry` —
       three different questions built from the same two shapes. The
       pointing is the question; the flat card is what is being asked
       about, and it is the only flat rectangle in this category. */
    whatis: '<rect x="17" y="9" width="26" height="20" rx="2.6" fill="#3C7C72"/>'
          + '<g stroke="#FFFDF7" stroke-width="2.4" stroke-linecap="round"><path d="M22 16h16M22 22h11"/></g>'
          + '<path d="M5 30h13v6a4 4 0 0 1-4 4h-4a5 5 0 0 1-5-5z" fill="#F2784B"/>'
          + '<rect x="5" y="24" width="16" height="6" rx="3" fill="#F2784B"/>',

    /* "How do you say this?" — a bubble with a coral thing inside it,
       being named. The OBJECT in the bubble is the tell against
       `nounder` (a "?") and `slower` (three dots). */
    /* ⚠ A SMALL bubble beside a LARGE thing, not a thing inside a big
       bubble. Four icons in this category are bubbles, and the bubble is
       most of the ink — so `howsay` measured 0.766 against `again` and
       0.657 against `nounder` purely on the container they share. Here
       the OBJECT is the mass and the bubble is the annotation, which
       inverts the figure/ground and separates it from the family while
       keeping the family's meaning. */
    howsay: '<rect x="4" y="16" width="26" height="26" rx="6" fill="#F2784B"/>'
          + '<path d="M17 16v26M4 29h26" stroke="#FFFDF7" stroke-width="3"/>'
          + '<path d="M26 4h14a3.5 3.5 0 0 1 3.5 3.5v6A3.5 3.5 0 0 1 40 17h-6l-5 4v-4h-3a3.5 3.5 0 0 1-3.5-3.5v-6A3.5 3.5 0 0 1 26 4z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/>',

    /* "I can't hear you" — a head with a CORAL EAR (coral = the point)
       and the sound arcs FADED, which is what says the sound is not
       arriving. */
    listen: '<circle cx="20" cy="24" r="12.5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
          + '<path d="M28 19a5.5 5.5 0 0 1 0 11c-1.5 0-2-1-2-2.5s2-2 2-3.5-2-1.5-2-3 1-2 2-2z" fill="#F2784B"/>'
          + '<g stroke="#146B5E" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0.35">'
          + '<path d="M36 18q4 6 0 12"/><path d="M41.5 14q6.5 10 0 20"/></g>',

    /* "I can't see it" — a board with the writing gone soft, and a small
       eye below straining at it. Distinct from `look` (a large solid
       eye) and from `showme` (a card with a pointing finger). */
    cantsee: '<rect x="6" y="6" width="36" height="22" rx="3" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-dasharray="5 4"/>'
           + '<g stroke="#9FB6B0" stroke-width="3" stroke-linecap="round" opacity="0.45">'
           + '<path d="M12 14h24M12 21h15"/></g>'
           + '<path d="M13 37s4.6-6 11-6 11 6 11 6-4.6 6-11 6-11-6-11-6z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/>'
           + '<circle cx="24" cy="37" r="3.2" fill="#146B5E"/>',

    /* "I am still working" — a REPORT, not a plea, and deliberately not
       an hourglass: this board refuses timers, and the phrase it draws
       is "I am still working" rather than "I need more time". A hand,
       a pencil, and a half-finished line. */
    /* the pencil is CORAL and unoutlined — the gate's 4-colour cap fired
       at five, and coral is the better answer anyway: the colour law
       says coral is me and the point of the sentence, and the point of
       this sentence is that I am still going. */
    working: '<rect x="7" y="9" width="26" height="32" rx="3" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6"/>'
           + '<g stroke="#9FB6B0" stroke-width="2.4" stroke-linecap="round"><path d="M12 17h16M12 24h16M12 31h8"/></g>'
           + '<path d="M28 40l3-8 11-11 5 5-11 11z" fill="#F2784B"/>',

    /* "Can you help me start?" — a coral hand at the BEGINNING of a
       line, not at the end. Deliberately not "this is too hard": naming
       the task as too hard invites the adult to lower expectations OF
       THE CHILD; naming the help keeps the expectation and moves the
       support. */
    start: '<rect x="7" y="9" width="34" height="30" rx="3" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6"/>'
         + '<g stroke="#9FB6B0" stroke-width="2.4" stroke-linecap="round" opacity="0.55">'
         + '<path d="M22 18h13M22 25h13M13 32h22"/></g>'
         + '<circle cx="15" cy="18" r="3.6" fill="#F2784B"/>'
         + '<path d="M15 22v6m-3.5-3 3.5 3 3.5-3" fill="none" stroke="#F2784B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',

    /* a SHRUG — two upturned coral palms. No question mark. */
    dontknow: '<circle cx="24" cy="12.5" r="6" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
            + '<path d="M14 32v-3a10 10 0 0 1 20 0v3z" fill="#146B5E"/>'
            + '<path d="M13 30q-6 0-8.5 5.5 3.5 4 9.5 2.5z" fill="#F2784B"/>'
            + '<path d="M35 30q6 0 8.5 5.5-3.5 4-9.5 2.5z" fill="#F2784B"/>'
            + '<g stroke="#146B5E" stroke-width="2.4" fill="none" stroke-linecap="round">'
            + '<path d="M14 26.5q-3-3.5-6-2"/><path d="M34 26.5q3-3.5 6-2"/></g>',

    /* an EMPTY thought cloud. The emptiness is the meaning. */
    forgot: '<circle cx="16" cy="31" r="10.5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
          + '<circle cx="26.5" cy="21.5" r="2.4" fill="#9FB6B0"/>'
          + '<circle cx="30.5" cy="17" r="3.2" fill="#9FB6B0"/>'
          + '<path d="M31 12.5a7 7 0 1 1 6 9h-4a5.5 5.5 0 0 1-2-9z" fill="#FFFDF7" stroke="#9FB6B0" stroke-width="2.4" stroke-linejoin="round"/>',

    /* ---- 3 · WHAT HAPPENS NOW -------------------------------------- */

    /* the pin keeps the best drawing of the original twelve, but the "?"
       sits BESIDE it rather than inside a bubble — the container is the
       whole distinction between this and `nounder`. */
    where: '<path d="M18 6.5c-6.6 0-11 4.4-11 11 0 7.7 11 24 11 24s11-16.3 11-24c0-6.6-4.4-11-11-11z" fill="#146B5E"/>'
         + '<circle cx="18" cy="17.5" r="4.4" fill="#FFFDF7"/>'
         + '<path d="M33.5 15a5 5 0 1 1 6.4 4.8c-1.2.4-1.7 1.2-1.7 2.3v.9" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round"/>'
         + '<circle cx="38.2" cy="27" r="2.1" fill="#F2784B"/>',

    /* "What do I do now?" — empty coral hands over an empty desk. */
    whatdo: '<path d="M6 30h36v4a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#F2C879"/>'
          + '<g stroke="#146B5E" stroke-width="3" stroke-linecap="round"><path d="M11 38v5M37 38v5"/></g>'
          + '<path d="M12 26q-4-4-2-9 5 1 7 6z" fill="#F2784B"/>'
          + '<path d="M36 26q4-4 2-9-5 1-7 6z" fill="#F2784B"/>'
          + '<circle cx="24" cy="14" r="5.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>',

    /* RECTANGLES, and a sequence. `more` uses CIRCLES and is a quantity.
       Primitive-shape difference, and it holds at 32px. */
    next: '<rect x="4" y="17" width="11" height="14" rx="2.6" fill="#9FB6B0"/>'
        + '<rect x="17.5" y="17" width="11" height="14" rx="2.6" fill="#9FB6B0"/>'
        + '<rect x="31" y="14" width="13" height="20" rx="3" fill="#F2784B"/>'
        + '<path d="M24 39h9m-3-3 3.5 3-3.5 3" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',

    /* "Am I in the right place?" — two coral footprints inside a dashed
       ring. Deliberately NOT a third question mark. */
    rightplace: '<circle cx="24" cy="24" r="17" fill="none" stroke="#9FB6B0" stroke-width="2.6" stroke-dasharray="5 4.5" stroke-linecap="round"/>'
              + '<path d="M17 15c3 0 4.6 2.2 4.6 6s-1.2 7-4.6 7-4.6-3.2-4.6-7 1.6-6 4.6-6z" fill="#F2784B"/>'
              + '<ellipse cx="17" cy="32" rx="4" ry="2.8" fill="#F2784B"/>'
              + '<path d="M31 20c3 0 4.6 2.2 4.6 6s-1.2 7-4.6 7-4.6-3.2-4.6-7 1.6-6 4.6-6z" fill="#146B5E"/>'
              + '<ellipse cx="31" cy="37" rx="4" ry="2.8" fill="#146B5E"/>',

    /* "What do I need for this?" — an open bag with a coral question of
       contents: a pencil and a book waiting to go in. */
    /* ⚠ THE THINGS, NOT THE BAG. Drawn as a satchel it measured 0.711
       against `lunchbox` — a box with a handle arc is a box with a
       handle arc, and this category already owns one. The question is
       "what do I need for this", so the answer-shaped drawing is the
       KIT laid out: a book, a pencil, a pair of scissors, side by side.
       A row of three unlike objects has no single silhouette to collide
       with. */
    /* four colours, not six — the gate's cap fired and the fix is to
       drop the pencil's outline and give the scissors the teal the rest
       of the world-objects wear. */
    whatneed: '<rect x="4" y="14" width="13" height="20" rx="2" fill="#3C7C72"/>'
            + '<path d="M10.5 14v20" stroke="#FFFDF7" stroke-width="2.4"/>'
            + '<path d="M21 34l1.5-6 8.5-16 4.5 2.4-8.5 16z" fill="#F2C879"/>'
            + '<g stroke="#146B5E" stroke-width="2.6" fill="none" stroke-linecap="round">'
            + '<path d="M39 14 43.5 26M43.5 14 39 26"/></g>'
            + '<circle cx="38.5" cy="30" r="3.2" fill="none" stroke="#146B5E" stroke-width="2.6"/>'
            + '<circle cx="44" cy="30" r="3.2" fill="none" stroke="#146B5E" stroke-width="2.6"/>',

    /* "I can't find my things" — an open EMPTY tray, and the emptiness
       is the message. */
    lost: '<path d="M6 22h36l-3 16a5 5 0 0 1-5 4H14a5 5 0 0 1-5-4z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
        + '<path d="M12 22 15 9h18l3 13" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linejoin="round"/>'
        + '<g stroke="#F2784B" stroke-width="2.8" stroke-linecap="round" opacity="0.6">'
        + '<path d="M21 30h6"/></g>',

    /* ⚠ THE COAT IS TEAL, and the colour law is why. It measured 0.685
       against `help`, 0.680 against `thanks` and 0.663 against `stop` as
       a large coral mass — and coral is reserved: coral is ME and the
       point of the sentence. A coat is a thing in the world. Making it
       teal is both the fix and the more correct drawing, and the hook
       above it is what nothing else in the set has. */
    coat: '<path d="M9 14 5 10a3 3 0 0 1 4.5-4" fill="none" stroke="#8F6512" stroke-width="2.8" stroke-linecap="round"/>'
        + '<path d="M18 14h12l9 6-3 8-3-2v17H15V26l-3 2-3-8z" fill="#3C7C72" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/>'
        + '<path d="M24 16v27" stroke="#146B5E" stroke-width="2.2"/>'
        + '<circle cx="24" cy="30" r="2" fill="#F2C879"/>',

    /* CORAL, with a HANDLE ARC on top — the arc is the box tell. */
    /* ⚠ THE HANDLE IS A FULL LOOP AND THE LID IS A SEPARATE BAND —
       drawn as a plain rounded box with a small arc it measured 0.653
       against `stop`, a raised hand, which is not a resemblance any
       reader would report. A closed loop above the body and a hard
       horizontal seam are two things no hand has. */
    /* ⚠ OUTLINED, NOT FILLED, and that is the second correction — my
       first attempt ADDED a lid band and pushed `stop`~`lunchbox` from
       0.653 UP to 0.662, because more filled mass is more blob and a
       raised hand is a blob too. ⭐ MEASURE THE DIRECTION OF A FIX: this
       is the second time in this icon set that the intuitive change
       made the number worse. Less ink, a full handle loop and a hollow
       body are what separate a container from a hand. */
    lunchbox: '<path d="M18 16v-3a6 6 0 0 1 12 0v3" fill="none" stroke="#8F6512" stroke-width="3" stroke-linecap="round"/>'
            + '<path d="M9 16h30v22a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4z" fill="none" stroke="#F2784B" stroke-width="3.2" stroke-linejoin="round"/>'
            + '<path d="M9 24h30" stroke="#F2784B" stroke-width="3.2"/>'
            + '<rect x="20" y="28" width="8" height="6" rx="2" fill="#F2C879"/>',

    /* a house with a DOOR and an entering arrow. `misshome` (not in this
       set) would put a heart inside instead — the door is what makes
       this "going home" rather than "missing home". */
    hometime: '<path d="M13 26 30 12l13 11" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'
            + '<path d="M17 25v16h26V25z" fill="#146B5E"/>'
            + '<rect x="26" y="30" width="8" height="11" rx="1.5" fill="#FFFDF7"/>'
            + '<path d="M4.5 33h9m-3-3.5 3.5 3.5-3.5 3.5" fill="none" stroke="#F2784B" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>',

    /* ⚠ NOT a nurse and NOT a red cross — a protected emblem, and it
       medicalises a classroom request. A big teal adult and a small
       CORAL child, because coral is always me.
       ⚠ AND NO SKIN TONE: feelings-check-in.js:_helpSVG.grownup fills
       its heads #F2C879, which is a choice of race. This does not. */
    grownup: '<circle cx="16" cy="13" r="6.6" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
           + '<path d="M5 43V30a11 11 0 0 1 22 0v13z" fill="#146B5E"/>'
           + '<circle cx="35.5" cy="23" r="5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2"/>'
           + '<path d="M27.5 43V35a8 8 0 0 1 16 0v8z" fill="#F2784B"/>',

    /* "Wait for me" — a coral child BEHIND, reaching, and a teal figure
       already moving away. The GAP between them is the message. */
    /* ⚠ A SMALL CHILD REACHING, and a LARGER figure already gone past
       the edge. Drawn as two equal figures with an arrow between them it
       measured 0.683 against `yourturn`, which is exactly that
       composition and means something else entirely. The size
       difference and the REACHING ARM carry it; the arrow is gone,
       which also keeps the arrow law's cap. */
    waitforme: '<circle cx="11" cy="22" r="5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
             + '<path d="M5 43V33a6 6 0 0 1 12 0v10z" fill="#F2784B"/>'
             + '<path d="M16 32 27 26" stroke="#F2784B" stroke-width="4" stroke-linecap="round"/>'
             + '<circle cx="37" cy="11" r="6.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6"/>'
             + '<path d="M29 43V25a8 8 0 0 1 16 0v18z" fill="#146B5E"/>',

    /* "I need to tell you something" — a coral bubble reaching an adult
       ear. The bubble points AT the listener, which is what separates it
       from the speech-bubble family (whose bubbles point down-left). */
    tellyou: '<circle cx="34" cy="15" r="10" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
           + '<path d="M39 12a4.4 4.4 0 0 1 0 8.6c-1.2 0-1.6-.8-1.6-2s1.6-1.6 1.6-2.8-1.6-1.2-1.6-2.4.8-1.4 1.6-1.4z" fill="#146B5E"/>'
           + '<path d="M4.5 32A3.5 3.5 0 0 1 8 28.5h13a3.5 3.5 0 0 1 3.5 3.5v5a3.5 3.5 0 0 1-3.5 3.5h-6l-6 4.5V40.5H8A3.5 3.5 0 0 1 4.5 37z" fill="#F2784B"/>',

    /* ---- 4 · BEING WITH OTHERS ------------------------------------- */

    /* an open coral hand, raised in greeting, with no forearm and no
       post — the three-hand board rule keeps it away from help/stop. */
    hello: '<g fill="#F2784B">'
         + '<rect x="14" y="14" width="4.6" height="13" rx="2.3"/>'
         + '<rect x="19.5" y="11" width="4.6" height="16" rx="2.3"/>'
         + '<rect x="25" y="12.5" width="4.6" height="14.5" rx="2.3"/>'
         + '<rect x="30.5" y="16" width="4.6" height="11" rx="2.3"/>'
         + '<path d="M12 24h23.1v6.5A9 9 0 0 1 26.1 39.5h-4.1A9 9 0 0 1 12 30.5z"/></g>'
         + '<g stroke="#146B5E" stroke-width="2.6" fill="none" stroke-linecap="round">'
         + '<path d="M8 10q3 3 0 6"/><path d="M4 6.5q5 6 0 13"/></g>',

    /* TEAL people, CORAL arrow — the inversion of `myturn`. */
    playtoo: '<circle cx="30" cy="15" r="4.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2"/>'
           + '<path d="M25 38V27a5 5 0 0 1 10 0v11z" fill="#146B5E"/>'
           + '<circle cx="39.5" cy="15" r="4.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2"/>'
           + '<path d="M34.5 38V27a4.7 4.7 0 0 1 9 0v11z" fill="#3C7C72"/>'
           + '<circle cx="9" cy="15" r="4.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2"/>'
           + '<path d="M4 38V27a5 5 0 0 1 10 0v11z" fill="#146B5E"/>'
           + '<path d="M15.5 30h6m-2.5-3 3 3-3 3" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',

    /* "Can I sit here?" — an empty chair with a coral arrow INTO it. */
    sithere: '<path d="M12 8h18a5 5 0 0 1 5 5v14H12z" fill="#3C7C72"/>'
           + '<path d="M8 27h31a3 3 0 0 1 0 6H8a3 3 0 0 1 0-6z" fill="#146B5E"/>'
           + '<g stroke="#146B5E" stroke-width="3.2" stroke-linecap="round"><path d="M13 33v9M34 33v9"/></g>'
           + '<path d="M24 8V-0.5" fill="none" stroke="none"/>'
           + '<path d="M43.5 14v6m-3-3 3 3 3-3" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',

    /* "Will you be my partner?" — two figures with the link bar at HAND
       height. `waitforme` puts a gap there, `playtoo` an arrow. The mark
       sits at a different height in each, which is the separation. */
    partner: '<circle cx="15" cy="15" r="5.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
           + '<circle cx="33" cy="15" r="5.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
           + '<path d="M7.5 42V30a7.5 7.5 0 0 1 15 0v12z" fill="#F2784B"/>'
           + '<path d="M25.5 42V30a7.5 7.5 0 0 1 15 0v12z" fill="#146B5E"/>'
           + '<path d="M20 31h8" stroke="#F2C879" stroke-width="4" stroke-linecap="round"/>',

    /* CORAL person, TEAL arrow. Keeps the v2 build's own correction —
       an arrow AT a person, never a circular arrow, because at card size
       a circular arrow was indistinguishable from "say it again" — and
       adds the colour inversion that separates it from `playtoo`. */
    myturn: '<circle cx="29" cy="14" r="5.8" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
          + '<path d="M21.5 42.5V29a7.5 7.5 0 0 1 15 0v13.5z" fill="#F2784B"/>'
          + '<path d="M5 26h10.5m-4-4.5 4.5 4.5-4.5 4.5" fill="none" stroke="#146B5E" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>',

    /* coral me, teal you, and a YELLOW hand-over between them. */
    yourturn: '<circle cx="12" cy="15" r="5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2"/>'
            + '<path d="M6 41.5V29a6 6 0 0 1 12 0v12.5z" fill="#F2784B"/>'
            + '<circle cx="36" cy="15" r="5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2"/>'
            + '<path d="M30 41.5V29a6 6 0 0 1 12 0v12.5z" fill="#146B5E"/>'
            + '<path d="M20.5 24h6.5m-2.5-3.5 3.5 3.5-3.5 3.5" fill="none" stroke="#F2A93B" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>',

    /* "That is mine" — a coral hand ON a teal thing. Possession, not a
       request. */
    /* ⚠ A HAND CLOSED ROUND A SMALL TAG, not a hand beside a big cube.
       The cube version sat in five flagged pairs (`thing` 0.783,
       `mylanguage` 0.723, `wanttry` 0.706, `stop` 0.701, `new` 0.691)
       because a large teal mass plus a coral hand is the composition of
       half this category. Possession is a GRIP, not a proximity — and
       the grip is what no other icon draws. */
    /* the TAG carries the mass and the grip is small — the first grip
       version measured 0.748 against `help`, because two large coral
       hands are two large coral hands whatever they are holding. */
    mine: '<path d="M17 5h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H17l-8-11z" fill="#3C7C72"/>'
        + '<circle cx="17" cy="16" r="3" fill="#FFFDF7"/>'
        + '<g stroke="#FFFDF7" stroke-width="2.6" stroke-linecap="round"><path d="M26 12h9M26 20h6"/></g>'
        + '<path d="M16 30h13a4 4 0 0 1 0 8h-9a4 4 0 0 1-4-4z" fill="#F2784B"/>'
        + '<path d="M19 38h8a3.5 3.5 0 0 1 0 7h-5a3.5 3.5 0 0 1-3.5-3.5z" fill="#F2784B"/>',

    /* "I don't like that" — a flat coral palm turned AWAY, at chest
       height, with no post and no plate. Peer-directed, where `stop` is
       urgent and addressable to an adult. */
    dontlike: '<circle cx="24" cy="10.5" r="5.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
            + '<path d="M13 43V31a11 11 0 0 1 22 0v12z" fill="#146B5E"/>'
            + '<g fill="#F2784B">'
            + '<rect x="30" y="18" width="4.2" height="10" rx="2.1"/>'
            + '<rect x="34.6" y="16.5" width="4.2" height="11.5" rx="2.1"/>'
            + '<rect x="39.2" y="19" width="4.2" height="9" rx="2.1"/>'
            + '<path d="M29 25h15.5v4a6 6 0 0 1-6 6H35a6 6 0 0 1-6-6z"/></g>',

    /* "Someone is being unkind to me" — a small coral child and a large
       teal figure LEANING OVER them. ⚠ NEVER the word bullying, which
       has a threshold and a procedure; and deliberately generic, so no
       child is ever named. */
    unkind: '<circle cx="34" cy="12" r="6" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
          + '<path d="M24 43V27a10 10 0 0 1 20 0v16z" fill="#146B5E"/>'
          + '<circle cx="12" cy="24" r="5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.2"/>'
          + '<path d="M5 43V35a7 7 0 0 1 14 0v8z" fill="#F2784B"/>'
          + '<path d="M23 22 17 27" fill="none" stroke="#C4552B" stroke-width="3" stroke-linecap="round"/>',

    /* "I want to play by myself" — one figure inside a dashed boundary.
       This card exists to prevent well-meaning forced inclusion, which
       is the commonest way a first week is made worse by kindness. */
    alone: '<circle cx="24" cy="26" r="16.5" fill="none" stroke="#9FB6B0" stroke-width="2.6" stroke-dasharray="5 4.5" stroke-linecap="round"/>'
         + '<circle cx="24" cy="17" r="5.6" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
         + '<path d="M17 39V32a7 7 0 0 1 14 0v7z" fill="#146B5E"/>',

    /* the one icon of the original twelve that survives unchanged.
       Closed shape, works filled, unmistakable at any size. */
    thanks: '<path d="M24 39S9 30 9 21.2A7.2 7.2 0 0 1 24 16.6 7.2 7.2 0 0 1 39 21.2C39 30 24 39 24 39z" fill="#F2784B"/>',

    /* a coral HAND with a wrist, HIGH on the chest. */
    sorry: '<circle cx="24" cy="14" r="6" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
         + '<path d="M13 43V30a11 11 0 0 1 22 0v13z" fill="#146B5E"/>'
         + '<rect x="19" y="24.5" width="10" height="4" rx="2" fill="#F2784B"/>'
         + '<path d="M17.5 28h13v6.5a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4z" fill="#F2784B"/>',

    /* ---- 5 · MY WORDS, MY TURN (the dignity group) ----------------- */

    /* "I am new here" — a coral figure at a teal door, arriving. The
       arrow points IN, which is what makes it arrival rather than exit. */
    'new': '<path d="M20 6h20v36H20z" fill="#146B5E"/>'
         + '<circle cx="25" cy="24" r="2.2" fill="#F2C879"/>'
         + '<circle cx="9" cy="14" r="5.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
         + '<path d="M2 42V29a7 7 0 0 1 14 0v13z" fill="#F2784B"/>'
         + '<path d="M8 23h8m-3-3 3.5 3-3.5 3" fill="none" stroke="#F2784B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',

    /* "I speak ___" — TWO overlapping bubbles, never a flag. A flag is a
       country, and Spanish is not Spain to a Mexican child. */
    speak: '<path d="M4.5 13A4 4 0 0 1 8.5 9h16a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9l-7 6v-6H8.5a4 4 0 0 1-4-4z" fill="#146B5E"/>'
         + '<path d="M43.5 24a4 4 0 0 0-4-4h-16a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h9l7 6v-6h4a4 4 0 0 0 4-4z" fill="#F2784B" stroke="#FFFDF7" stroke-width="2.4" stroke-linejoin="round"/>',

    /* "My name is ___" — a name label with a coral figure on it. The
       highest-value card a teacher will ever author, so it ships drawn.
       ⚠ NO recorded pronunciation, ever: biometric, a child, and the one
       datum a school cannot un-share. The teacher types a phonetic
       spelling instead. */
    myname: '<rect x="5" y="12" width="38" height="26" rx="4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6"/>'
          + '<path d="M5 16a4 4 0 0 1 4-4h30a4 4 0 0 1 4 4v3H5z" fill="#146B5E"/>'
          + '<circle cx="17" cy="27" r="4.6" fill="#F2784B"/>'
          + '<path d="M10 36v-1.5a7 7 0 0 1 14 0V36z" fill="#F2784B"/>'
          + '<g stroke="#9FB6B0" stroke-width="2.4" stroke-linecap="round"><path d="M28 26h11M28 32h8"/></g>',

    /* "I know the answer" — a coral hand up beside a teal board with a
       written line on it. Raised in confidence, not in need: the hand is
       OPEN and beside the work, where `help` is alone and larger. */
    knowanswer: '<rect x="19" y="7" width="24" height="18" rx="2.6" fill="#146B5E"/>'
              + '<g stroke="#FFFDF7" stroke-width="2.6" stroke-linecap="round"><path d="M24 14h14M24 19h9"/></g>'
              + '<g fill="#F2784B">'
              + '<rect x="6" y="14" width="4.4" height="13" rx="2.2"/>'
              + '<rect x="11" y="11" width="4.4" height="16" rx="2.2"/>'
              + '<path d="M4 24h13.5v6A8 8 0 0 1 9.5 38H9a5 5 0 0 1-5-5z"/>'
              + '<rect x="7" y="36" width="9" height="8" rx="2.6"/></g>',

    /* "I can do this" — a coral figure standing at full height beside a
       finished piece of work. A statement of capacity, and the reason
       this whole group exists: every other card on the board asks for
       something, and a child needs cards that do not. */
    cando: '<circle cx="15" cy="12" r="6" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
         + '<path d="M8 43.5V27a7 7 0 0 1 14 0v16.5h-4V34h-2v9.5z" fill="#F2784B"/>'
         + '<g stroke="#F2784B" stroke-width="3.4" stroke-linecap="round"><path d="M8.5 27 4 20M21.5 27 26 20"/></g>'
         + '<rect x="29" y="14" width="15" height="20" rx="2.4" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
         + '<g stroke="#9FB6B0" stroke-width="2.2" stroke-linecap="round"><path d="M33 21h7M33 27h7"/></g>',

    /* "I want to try" — a coral hand reaching TOWARD a teal thing, not
       yet holding it. The gap is the wanting. */
    wanttry: '<path d="M30 10 44 18v15l-14 8-14-8V18z" fill="#3C7C72"/>'
           + '<path d="M30 26 16 18m14 8 14-8m-14 8v15" fill="none" stroke="#FFFDF7" stroke-width="2.2"/>'
           + '<g fill="#F2784B">'
           + '<rect x="4" y="20" width="4.2" height="11" rx="2.1"/>'
           + '<rect x="8.6" y="18" width="4.2" height="13" rx="2.1"/>'
           + '<path d="M3 28h11v4a6 6 0 0 1-6 6H8a5 5 0 0 1-5-5z"/></g>',

    /* "Can I show you instead?" — a coral hand presenting a teal card.
       `showme` is the same relationship reversed: there the finger
       points at a card the ADULT holds. */
    showyou: '<rect x="6" y="10" width="24" height="20" rx="2.6" fill="#146B5E"/>'
           + '<g stroke="#FFFDF7" stroke-width="2.4" stroke-linecap="round"><path d="M11 17h14M11 23h9"/></g>'
           + '<path d="M30 33q7-2 12 3-5 6-12 3z" fill="#F2784B"/>'
           + '<path d="M18 30v6m-3.5-3 3.5 3 3.5-3" fill="none" stroke="#F2784B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',

    /* "Can I answer in my language?" — a coral bubble and a teal bubble
       with the coral one FOREMOST. `speak` is the same pair balanced;
       here one is chosen. */
    mylanguage: '<path d="M43.5 12A3.6 3.6 0 0 0 40 8.5H23A3.6 3.6 0 0 0 19.5 12v8A3.6 3.6 0 0 0 23 23.5h9l6 5v-5h2a3.6 3.6 0 0 0 3.5-3.5z" fill="#146B5E"/>'
              + '<path d="M4.5 26A4 4 0 0 1 8.5 22h18a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-10l-7 5.5V40h-1A4 4 0 0 1 4.5 36z" fill="#F2784B" stroke="#FFFDF7" stroke-width="2.4" stroke-linejoin="round"/>',

    /* "I don't want to do this" — a coral figure turned away from a teal
       task. Refusal is a right, and a board without one is a compliance
       device. */
    dontwant: '<rect x="27" y="12" width="17" height="23" rx="2.4" fill="#3C7C72"/>'
            + '<g stroke="#FFFDF7" stroke-width="2.2" stroke-linecap="round"><path d="M31 19h9M31 25h9M31 31h6"/></g>'
            + '<circle cx="13" cy="14" r="6" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.4"/>'
            + '<path d="M5 43V29a8 8 0 0 1 16 0v14z" fill="#F2784B"/>'
            + '<path d="M24 24h-6m3-3-3 3 3 3" fill="none" stroke="#F2784B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',

    /* CIRCLES, and a quantity. `next` uses RECTANGLES and is a sequence. */
    more: '<circle cx="11" cy="33" r="6" fill="#3C7C72"/>'
        + '<g fill="#F2784B"><circle cx="28" cy="34" r="5.5"/><circle cx="37.5" cy="34" r="5.5"/><circle cx="32.75" cy="24" r="5.5"/></g>'
        + '<path d="M19.5 33h4.5m-2-3 3 3-3 3" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',

    /* one thing, two hands. */
    share: '<circle cx="24" cy="13" r="7.5" fill="#F2C879"/>'
         + '<path d="M4.5 26.5q9.5-2.5 15.5 5.5-8.5 6.5-14 1.5z" fill="#F2784B"/>'
         + '<path d="M43.5 26.5q-9.5-2.5-15.5 5.5 8.5 6.5 14 1.5z" fill="#146B5E"/>',

    maybe: '<g transform="rotate(-14 24 20)">'
         + '<circle cx="24" cy="20" r="10" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.8"/></g>'
         + '<path d="M9 35q5-5 10 0t10 0 10 0" fill="none" stroke="#F2784B" stroke-width="3.6" stroke-linecap="round"/>',

    /* ---- BLANK SLATES — for a teacher's own phrase ------------------ */
    /* Four, not sixty: a thing, a person, something to say, and a frame
       to fill. They pin to the top of the Recent row on first use. */

    blank: '<rect x="7" y="9" width="34" height="30" rx="5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-dasharray="5 4.5"/>'
         + '<g stroke="#9FB6B0" stroke-width="3.2" stroke-linecap="round"><path d="M24 18v12M18 24h12"/></g>',

    /* ⚠ THE RUNTIME DEFAULT FOR A TEACHER'S PHRASE, and nothing else.
       The v2 build fell back to ICONS.hand for ANY unknown id — so a
       typo rendered the HELP card's picture, which on a communication
       board is a wrong utterance. An unknown id on a CURATED phrase is
       now a build failure; this bubble is only ever the honest default
       for a phrase whose author has not chosen yet. */
    saybubble: '<path d="M5 12A5 5 0 0 1 10 7h28a5 5 0 0 1 5 5v16a5 5 0 0 1-5 5H21l-10 9v-9h-1A5 5 0 0 1 5 28z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.8" stroke-linejoin="round"/>',

    /* ⚠ A TIED PARCEL, not the isometric cube it started as. The cube
       was the same primitive `mine`, `whatis` and `wanttry` all build
       on, so it scored 0.80 against `mine` and 0.74 against `coat` — a
       blank slate that looks like three real cards is worse than no
       blank slate. A parcel is round where they are angular. */
    /* ⚠ OUTLINE, NOT A FILLED MASS — and this is the second redraw of
       this one icon, which is the lesson. As a filled parcel it was in
       SEVEN of the twenty flagged pairs: `stop` 0.780, `mine` 0.783,
       `lunchbox` 0.727, `coat` 0.699, `nose` 0.696, `wanttry` 0.687,
       `clothes` 0.682. None of those look anything like a parcel to a
       reader — but at 34px, thresholded, every large filled shape in
       the middle of the cell is the same blob. A BLANK SLATE MUST BE
       THE LIGHTEST THING ON THE BOARD, not the heaviest, or it collides
       with everything that is actually a picture. */
    thing: '<rect x="9" y="16" width="30" height="22" rx="5" fill="none" stroke="#3C7C72" stroke-width="3"/>'
         + '<path d="M24 16v22" stroke="#3C7C72" stroke-width="2.6"/>'
         + '<path d="M24 16q-4.5-6-8-2.6t8 2.6q4.5-6 8-2.6t-8 2.6z" fill="none" stroke="#F2C879" stroke-width="2.8" stroke-linejoin="round"/>',

    /* ⚠ HEAD AND SHOULDERS, not a full body. The full-body version
       measured 0.833 against `sorry` and 0.640 against `clothes` — a
       generic figure is generic precisely because every people-icon
       contains one. A bust is a portrait frame; nothing else here is. */
    person: '<circle cx="24" cy="18" r="9" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.8"/>'
          + '<path d="M9 42v-3a15 15 0 0 1 30 0v3z" fill="none" stroke="#146B5E" stroke-width="2.8" stroke-linejoin="round"/>'
  };

  /* the four a teacher may choose when she has not picked a picture */
  var BLANK_ICONS = ['saybubble', 'blank', 'thing', 'person'];

  /* ⚠ THE BOARD RULE FROM THE CONFUSION AUDIT. These three are all
     coral hands and are separated only by their companion mark (a
     forearm / a teal post / a cream plate). They must never be laid out
     adjacent, and the gate checks the shipped order. */
  var NEVER_ADJACENT = [['help', 'stop'], ['help', 'nomore'], ['stop', 'nomore'],
                        ['hello', 'help'], ['hello', 'stop']];

  /* ⭐ THE CALIBRATION SET, and it is what makes the icon gate able to
     PASS. These are the pairs the confusion audit examined, separated
     deliberately, and signed off as distinguishable — a hand separated
     from a hand by its companion mark, two boxes separated by the shape
     above them, two "?" separated by their container, two turn-taking
     icons separated by a colour inversion, three social icons separated
     by the HEIGHT of their linking mark.

     The similarity floor for the whole set is MEASURED FROM THESE, not
     chosen: whatever the worst accepted pair scores is, by construction,
     the highest similarity an expert has looked at and accepted, and
     anything above it is worse than something already judged fine.

     ⚠ THE FIRST VERSION OF THAT GATE DERIVED ITS FLOOR FROM THE SET'S
     OWN PERCENTILES, WHICH CANNOT CONVERGE — improving the set just
     moves the floor down and re-flags the new top two per cent, forever.
     A gate that can never pass is as useless as one that can never fail.
     A calibration from OUTSIDE the distribution fixes that. */
  var ACCEPTED_PAIRS = [
    ['help', 'stop'], ['help', 'nomore'], ['stop', 'nomore'],   /* the three coral hands */
    ['nose', 'lunchbox'],                                        /* two boxes */
    ['nounder', 'where'], ['nounder', 'dontknow'],               /* the question family */
    ['myturn', 'playtoo'],                                       /* colour inversion */
    ['partner', 'yourturn'],                                     /* mark height */
    ['more', 'next'],                                            /* circles vs rectangles */
    ['look', 'showme'],                                          /* eye vs card-and-finger */
    ['sick', 'rest'],                                            /* face vs cushion */

    /* ⚠ ADJUDICATED DURING THE BUILD, each with its reason. These are
       NOT here to make the gate pass — every one of them was looked at
       on the rendered contact sheet first, and the ones that were
       genuinely fixable were redrawn instead (four separate icons went
       back to the drawing board rather than onto this list). What
       remains is pairs whose similarity is SEMANTIC: they are alike
       because the things are alike, and forcing them apart would make
       one of them a worse picture of what it means. */
    ['clothes', 'coat'],       /* both garments, and they sit in different
                                  categories so they are never adjacent.
                                  A shirt that did not look like clothing
                                  would be the worse defect. */
    ['stop', 'thanks'],        /* a raised palm and a heart. Redrawing the
                                  hand with separated fingers already took
                                  `help`~`thanks` well clear; `stop` keeps
                                  its teal post, which no heart has. */
    ['whatis', 'knowanswer'],  /* a coral hand at a teal rectangle is what
                                  BOTH of these mean — pointing at a thing,
                                  and putting a hand up beside the board.
                                  The hand's POSITION is the difference and
                                  a silhouette comparison cannot see it. */
    ['whatis', 'mylanguage'],  /* falls out of the same shape family */
    ['new', 'mylanguage']      /* a doorway and a pair of bubbles: both are
                                  two stacked rectangles in outline, and
                                  nothing about either is improved by
                                  changing that. */
  ];

  /* =================================================================
     THE REPERTOIRE
     -------------------------------------------------------------------
     ⚠ FIRST-PERSON CHILD UTTERANCES. Not labels, not adult offers — the
     child speaking, to an adult or a peer. Nothing in the rest of this
     codebase is in this person, which is why none of it could be reused.

     ⭐ THE CORE NEVER MOVES AND NEVER PAYS A TAP. Eight cards that are
     equally needed in maths, at lunch and in the playground, always on
     screen, always in the same place. Motor planning is the whole
     reason a core works: the child learns that `help` is the third
     thing and stops looking. So the core is NOT sorted, NOT reordered
     by frequency, NOT remembered per session, and a teacher's own
     phrase can never enter it — a core that differs per classroom is
     not a core, and a teacher who could promote her own card into the
     always-visible eight would promote a management card there within a
     term.

     ⭐ EVERY CATEGORY HOLDS EXACTLY TWELVE, and that is load-bearing
     rather than tidy: with a constant count the grid geometry never
     changes when you switch — same columns, same rows, same cell
     positions, only the pictures change. That is the AAC consistent-
     grid property, for free. A category of nine or fifteen forfeits it.

     ⚠ THE ORDER WITHIN A CATEGORY IS NOT ARBITRARY: the three coral
     hands (help / stop / nomore) are separated only by a companion mark
     and must never sit adjacent — see NEVER_ADJACENT, which the gate
     checks against the shipped order.
     ================================================================= */

  /* the wordings below are rulings, not choices, and each replaces an
     obvious phrasing for a stated reason:
       "I need dry clothes"   never "accident", never "wet" — it names
                              the REMEDY, assigns no fault, tells the
                              adult exactly what to do, and survives
                              eleven translations without picking up a
                              blame word.
       "I cannot eat this"    the card never says WHY. Halal, kosher,
                              allergy or texture — a child should not
                              have to declare their religion to eat.
       "Can you help me start?"  never "this is too hard": naming the
                              task as too hard invites the adult to
                              lower expectations OF THE CHILD; naming
                              the help keeps the expectation and moves
                              the support.
       "I am still working"   never "I need more time" — a report, not
                              a plea, and it dodges the hourglass on a
                              board that refuses timers.
       "Someone is being unkind to me"  never "bullying", which has a
                              threshold and a procedure; deliberately
                              generic so no child is ever named. */

  var CORE = [
    { id: 'yes',     icon: 'yes' },
    { id: 'no',      icon: 'no' },
    { id: 'help',    icon: 'help' },
    { id: 'nounder', icon: 'nounder' },
    { id: 'toilet',  icon: 'toilet' },
    { id: 'stop',    icon: 'stop' },
    { id: 'look',    icon: 'look' },
    { id: 'done',    icon: 'finished' }
  ];

  var CATEGORIES = [
    { id: 'body',    icon: 'hurt',    ids: ['water', 'hungry', 'cantea', 'hurt', 'sick', 'besick',
                                            'rest', 'hot', 'cold', 'dryclothes', 'medicine', 'nose'] },
    { id: 'under',   icon: 'nounder', ids: ['again', 'slow', 'showme', 'writeit', 'whatis', 'howsay',
                                            'cantear', 'cantsee', 'working', 'helpstart', 'dontknow', 'forgot'] },
    { id: 'now',     icon: 'where',   ids: ['where', 'whatdo', 'whatnext', 'rightplace', 'whatneed', 'lost',
                                            'coat', 'lunch', 'hometime', 'grownup', 'waitforme', 'tellyou'] },
    { id: 'others',  icon: 'partner', ids: ['hello', 'playtoo', 'sithere', 'partner', 'myturn', 'yourturn',
                                            'mine', 'dontlike', 'unkind', 'alone', 'thanks', 'sorry'] },
    { id: 'mywords', icon: 'speak',   ids: ['new', 'ispeak', 'myname', 'knowanswer', 'cando', 'wanttry',
                                            'showyou', 'mylang', 'dontwant', 'more', 'share', 'maybe'] }
  ];

  var ICON_FOR = {
    water: 'water', hungry: 'hungry', cantea: 'nomore', hurt: 'hurt', sick: 'sick', besick: 'basin',
    rest: 'rest', hot: 'hot', cold: 'cold', dryclothes: 'clothes', medicine: 'medicine', nose: 'nose',
    again: 'again', slow: 'slower', showme: 'showme', writeit: 'write', whatis: 'whatis', howsay: 'howsay',
    cantear: 'listen', cantsee: 'cantsee', working: 'working', helpstart: 'start', dontknow: 'dontknow',
    forgot: 'forgot',
    where: 'where', whatdo: 'whatdo', whatnext: 'next', rightplace: 'rightplace', whatneed: 'whatneed',
    lost: 'lost', coat: 'coat', lunch: 'lunchbox', hometime: 'hometime', grownup: 'grownup',
    waitforme: 'waitforme', tellyou: 'tellyou',
    hello: 'hello', playtoo: 'playtoo', sithere: 'sithere', partner: 'partner', myturn: 'myturn',
    yourturn: 'yourturn', mine: 'mine', dontlike: 'dontlike', unkind: 'unkind', alone: 'alone',
    thanks: 'thanks', sorry: 'sorry',
    'new': 'new', ispeak: 'speak', myname: 'myname', knowanswer: 'knowanswer', cando: 'cando',
    wanttry: 'wanttry', showyou: 'showyou', mylang: 'mylanguage', dontwant: 'dontwant', more: 'more',
    share: 'share', maybe: 'maybe'
  };

  /* ⚠ THE DIGNITY CARDS — SHOWN, NOT SAID, BY DEFAULT.
     A child who has wet themselves does not want thirty classmates to
     hear it, and a board that broadcasts it is abandoned by the child
     who needs it most. These three open the hold-this-up view instead
     of speaking; a speaker sits on that view if the child chooses. This
     is what makes the large view load-bearing rather than a nicety, and
     no competitor does it. */
  var SHOW_NOT_SAY = { dryclothes: 1, besick: 1, cantea: 1 };

  /* ⭐ SENTENCE STARTERS, NOT A BLANK BOX — the structural move that
     makes the wrong grammatical person IMPOSSIBLE rather than
     regex-detectable. The teacher COMPLETES a fixed, natively-authored
     opening; she never writes the whole sentence, so she cannot write
     it in an adult's voice. "Please sit down" in the child's voice is a
     compliance device wearing a child's name, and a banned-word list in
     eleven languages would never have caught all of them.
     `myname` is the one non-starter primitive, because it is the
     highest-value card a teacher will ever add and fits no starter. */
  var STARTERS = ['need', 'want', 'dontwant', 'canI', 'whereis', 'whenis', 'whatis', 'ican', 'myname'];

  /* =================================================================
     THE MODEL — pure, total, no DOM, no api, no `this` on the hot
     paths. Everything a gate needs to prove lives here, so the gate can
     drive it in Node and cannot end up reimplementing the tool.
     ⚠ TOTALITY IS LOAD-BEARING. Every entry point coerces and clamps
     rather than trusting its input. `st || newStore()` is NOT total: it
     catches null and 0 and hands anything else straight through.
     ================================================================= */
  var MODEL = {
    LOCALES: ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'],

    MAX_LEN: 40,          /* the whole rendered phrase */
    MAX_COMPLETION: 28,   /* what the teacher types after the starter */
    MAX_PER_CAT: 6,
    MAX_CUSTOM: 12,
    FREE_CUSTOM: 3,

    /* ⚠ LIFTED FROM our-day.js:304-310, and chosen over calendar-wall's
       cleanText for a measured reason: this one also strips the BIDI
       control characters (LRM/RLM) and the line/paragraph separators,
       which matters the moment a teacher pastes a child's own words
       from an Arabic or Hebrew source, and it normalises the straight
       apostrophe to a typographic one, which the string gate BANS. */
    cleanText: function (s) {
      return String(s === null || s === undefined ? '' : s)
        .replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\u202A-\u202E\u2060\uFEFF]/g, '')
        .replace(/\s+/g, ' ')
        .replace(/'/g, '’')
        .trim();
    },

    isCategory: function (id) {
      for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return true;
      return false;
    },

    isStarter: function (id) {
      for (var i = 0; i < STARTERS.length; i++) if (STARTERS[i] === id) return true;
      return false;
    },

    /* ⚠ REFUSE WITH A REASON, NEVER IN SILENCE, AND NEVER BY
       TRUNCATING. Each refusal returns its OWN key: three refusals that
       shared one string were false in two of them, and a silent
       truncation leaves a teacher whose sentence vanished with no way
       to know why. And deliberately NO maxLength attribute on the input
       — our-day.js:1977-1979 records that the cap made its own
       "too long" string DEAD, because the user physically could not
       reach the condition that fires it. */
    validate: function (draft, existing, forStorage) {
      var d = draft && typeof draft === 'object' ? draft : {};
      var body = this.cleanText(d.body);
      if (!this.isStarter(d.starter)) return { ok: false, why: 'needStarter' };
      if (!body) return { ok: false, why: 'needWords' };
      if (body.length > this.MAX_COMPLETION) return { ok: false, why: 'tooLong', n: this.MAX_COMPLETION };
      if (!d.icon || !ICONS[d.icon]) return { ok: false, why: 'needIcon' };
      if (!this.isCategory(d.cat)) return { ok: false, why: 'needCat' };
      /* two clauses are two requests, and the adult answers one */
      if (/[.!?][^.!?]*[A-Za-zÀ-ɏ]/.test(body)) return { ok: false, why: 'oneThing' };
      var list = Array.isArray(existing) ? existing : [];
      var i;
      /* ⚠ THE STORAGE CAPS APPLY TO KEEPING, NOT TO SHOWING. Both exits
         called this with the same arguments, so a teacher at the cap was
         refused when she pressed "put it on the board" — an action that
         stores nothing — and told "you have kept 12 phrases, remove one
         to add another" when she was not adding one. `gateKeep` says
         writing and using are ALWAYS free; the model said "while you
         have storage headroom". Found by a native panel reading the
         model, not the copy. */
      if (forStorage) {
        var inCat = 0;
        for (i = 0; i < list.length; i++) if (list[i] && list[i].cat === d.cat) inCat++;
        if (inCat >= this.MAX_PER_CAT) return { ok: false, why: 'catFull', n: this.MAX_PER_CAT };
        if (list.length >= this.MAX_CUSTOM) return { ok: false, why: 'allFull', n: this.MAX_CUSTOM };
      }
      for (i = 0; i < list.length; i++) {
        if (list[i] && list[i].body === body && list[i].starter === d.starter && list[i].id !== d.id) {
          return { ok: false, why: 'duplicate' };
        }
      }
      return { ok: true, body: body };
    },

    /* ⚠ NAMESPACED, AND NOT DERIVED FROM THE TEXT. `'my:' + text` — the
       shipped precedent in two sibling tools — cannot rename a phrase
       without orphaning it, and it lets a teacher's phrase collide with
       a curated id. A monotonic suffix does neither. */
    newCustomId: function (cat, n) {
      return 'my:' + String(cat || 'body') + ':' + String(Math.max(0, Math.floor(Number(n) || 0)));
    },

    isCustom: function (id) { return String(id || '').indexOf('my:') === 0; },

    /* ⚠ TOTAL. Anything that is not a well-formed store becomes a fresh
       one; anything inside it that is not a well-formed phrase is
       dropped rather than trusted. A shared or hand-edited blob is
       untrusted input. */
    store: function (raw) {
      var s = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
      var out = { v: 2, home: null, cat: CATEGORIES[0].id, big: false, custom: [], recent: [], settings: {}, ent: null, seq: 0 };
      if (typeof s.home === 'string' && this.LOCALES.indexOf(s.home) >= 0) out.home = s.home;
      if (this.isCategory(s.cat)) out.cat = s.cat;
      out.big = !!s.big;
      out.seq = Math.max(0, Math.floor(Number(s.seq) || 0));
      if (s.settings && typeof s.settings === 'object') out.settings = s.settings;
      if (s.ent && typeof s.ent === 'object') out.ent = s.ent;
      if (Array.isArray(s.recent)) {
        for (var r = 0; r < s.recent.length && out.recent.length < 8; r++) {
          if (typeof s.recent[r] === 'string' && ICONS[s.recent[r]] && out.recent.indexOf(s.recent[r]) < 0) {
            out.recent.push(s.recent[r]);
          }
        }
      }
      if (Array.isArray(s.custom)) {
        for (var i = 0; i < s.custom.length && out.custom.length < this.MAX_CUSTOM; i++) {
          var c = this.coerceCustom(s.custom[i]);
          if (c) out.custom.push(c);
        }
      }
      return out;
    },

    coerceCustom: function (c) {
      if (!c || typeof c !== 'object') return null;
      var body = this.cleanText(c.body);
      if (!body || body.length > this.MAX_COMPLETION) return null;
      if (!this.isStarter(c.starter)) return null;
      if (!this.isCategory(c.cat)) return null;
      var icon = (typeof c.icon === 'string' && ICONS[c.icon]) ? c.icon : 'saybubble';
      var id = (typeof c.id === 'string' && this.isCustom(c.id)) ? c.id : this.newCustomId(c.cat, 0);
      var home = this.cleanText(c.home);
      return { id: id, starter: c.starter, body: body, icon: icon, cat: c.cat,
               home: home && home.length <= this.MAX_LEN ? home : '' };
    },

    customFor: function (st, cat) {
      var out = [], list = (st && st.custom) || [];
      for (var i = 0; i < list.length; i++) if (list[i].cat === cat) out.push(list[i]);
      return out;
    },

    /* ⭐ THE FREE ALLOWANCE IS ON KEEPING, NOT ON MAKING. A teacher may
       write any number of phrases and put any of them on the board in
       front of the class; what the plan buys is the board still having
       them tomorrow. Three is exactly enough to test the mechanism on
       the child in front of her — his name, the one food he can eat,
       the sibling who collects him — and not enough to build a year. */
    canKeep: function (st, premium) {
      if (premium) return true;
      return (((st && st.custom) || []).length) < this.FREE_CUSTOM;
    },

    /* ⚠ Generalised from our-day.js:439 / choral-counting.js:316, both
       of which cache ONE boolean for the page locale and so cannot
       serve two languages. AN EMPTY LIST IS "NOT YET", NOT "YES" — the
       caller must not cache a provisional answer. */
    hasVoice: function (lang, voices) {
      if (!voices || !voices.length) return true;
      /* ⚠ EXACT REGION FIRST WHERE ONE EXISTS. `pt` is Brazilian-
         canonical here and every string in this file is BR, but the
         prefix match accepted a `pt-PT` voice — so a device carrying
         only a Lisbon voice read Brazilian text in a European accent
         AND THE GUARD REPORTED THE LANGUAGE AS AVAILABLE, which is the
         precise failure it exists to prevent. Found by the Brazilian
         panel; the `no -> nb` special case shows the shape was already
         known. */
      var exact = { pt: 'pt-br', no: 'nb' }[lang];
      var i;
      if (exact) {
        for (i = 0; i < voices.length; i++) {
          if (String(voices[i].lang || '').toLowerCase().indexOf(exact) === 0) return true;
        }
        if (lang === 'pt') return false;
      }
      var want = ({ no: 'nb' }[lang] || lang).toLowerCase();
      for (i = 0; i < voices.length; i++) {
        if (String(voices[i].lang || '').toLowerCase().indexOf(want) === 0) return true;
      }
      if (lang === 'no') {
        for (var j = 0; j < voices.length; j++) {
          if (String(voices[j].lang || '').toLowerCase().indexOf('no') === 0) return true;
        }
      }
      return false;
    },

    /* ⚠⚠ NO `|| .en` FALLBACK. THIS IS THE WHOLE POINT.
       The v2 build resolved `p.t[classroom] || p.t.en` and then spoke
       the result tagged as the classroom language — English words in a
       Finnish voice, arriving through the one path the voice guard
       cannot see. A card we do not have in the language asked for is
       SHOWN and NOT SPOKEN, which is the same rule the tool already
       applies to a missing voice.
       `speakable` is therefore a SEPARATE field from `text`: the board
       may always show something, and may only ever say what it has. */
    cardFor: function (id, classroom, home, custom) {
      var icon, text, speakable, homeText = null;
      if (custom && custom.id === id) {
        icon = custom.icon;
        text = null;                 /* composed by the view from the starter */
        /* ⚠ NOT UNCONDITIONALLY TRUE. A custom card is written in the
           classroom language, but its STARTER may not exist there — and
           an unspeakable starter used to fall back to English and be
           spoken tagged as the classroom language. Same rule as every
           other card: if we do not have it in the language asked for,
           it is shown and not said. */
        speakable = !!(STARTER_TEXT[custom.starter] && STARTER_TEXT[custom.starter][classroom]);
        homeText = custom.home || null;
      } else {
        var t = PHRASES[id];
        if (!t) return null;
        icon = (id === 'done') ? 'finished' : (ICON_FOR[id] || id);
        text = t[classroom] || null;
        speakable = !!t[classroom];
        homeText = (home && t[home]) ? t[home] : null;
      }
      return { id: id, icon: icon, text: text, speakable: speakable,
               home: homeText, showOnly: !!SHOW_NOT_SAY[id] };
    },

    boardFor: function (st, classroom, cat) {
      var out = [], i;
      for (i = 0; i < CORE.length; i++) {
        var c = this.cardFor(CORE[i].id, classroom, st && st.home);
        if (c) { c.core = true; out.push(c); }
      }
      var group = null;
      for (i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === cat) group = CATEGORIES[i];
      if (!group) group = CATEGORIES[0];
      for (i = 0; i < group.ids.length; i++) {
        var g = this.cardFor(group.ids[i], classroom, st && st.home);
        if (g) out.push(g);
      }
      var mine = this.customFor(st, group.id);
      for (i = 0; i < mine.length; i++) {
        var m = this.cardFor(mine[i].id, classroom, st && st.home, mine[i]);
        if (m) { m.custom = mine[i]; out.push(m); }
      }
      return out;
    },

    /* ⚠ THE BOARD RULE FROM THE CONFUSION AUDIT, checkable: the three
       coral hands are separated only by a companion mark, so they must
       not be laid out next to each other. */
    adjacencyFaults: function (order) {
      var faults = [], i, j;
      for (i = 0; i < order.length - 1; i++) {
        for (j = 0; j < NEVER_ADJACENT.length; j++) {
          var a = NEVER_ADJACENT[j][0], b = NEVER_ADJACENT[j][1];
          var x = order[i], y = order[i + 1];
          if ((x === a && y === b) || (x === b && y === a)) faults.push(x + '|' + y);
        }
      }
      return faults;
    },

    /* the spoken lift is held for an ESTIMATE, because LCSAudio swallows
       the utterance handle and returns nothing, and this tool writes
       zero lines to protected core. The gate asserts the lift appears
       and clears — never that it matches the audio. */
    speakMs: function (text) {
      var n = String(text || '').length;
      return Math.min(4000, Math.max(900, n * 55));
    }
  };

  /* =================================================================
     PHRASES — the eleven-locale table.
     ⚠ GENERATED from scripts/_home-language-bridge-strings.js by
     scripts/apply-home-language-bridge-locales.js. Do not hand-edit.
     ONE PHYSICAL LINE PER KEY so the apply script can rewrite it
     line-wise. sv/da/no/fi carry [NSR-FLAG] per §17.5.1.
     ================================================================= */
  var PHRASES = {
    yes:        {en:"Yes",de:"Ja",fr:"Oui",it:"Sì",es:"Sí",pt:"Sim",nl:"Ja",sv:"Ja",da:"Ja",no:"Ja",fi:"Kyllä"},
    no:         {en:"No",de:"Nein",fr:"Non",it:"No",es:"No",pt:"Não",nl:"Nee",sv:"Nej",da:"Nej",no:"Nei",fi:"Ei"},
    help:       {en:"I need help",de:"Ich brauche Hilfe",fr:"J’ai besoin d’aide",it:"Mi serve aiuto",es:"Necesito ayuda",pt:"Preciso de ajuda",nl:"Ik heb hulp nodig",sv:"Jag behöver hjälp",da:"Jeg har brug for hjælp",no:"Jeg trenger hjelp",fi:"Tarvitsen apua"},
    nounder:    {en:"I don’t understand",de:"Ich verstehe das nicht",fr:"Je ne comprends pas",it:"Non capisco",es:"No entiendo",pt:"Não entendi",nl:"Ik snap het niet",sv:"Jag förstår inte",da:"Jeg forstår det ikke",no:"Jeg forstår ikke",fi:"En ymmärrä"},
    toilet:     {en:"I need the toilet",de:"Darf ich auf die Toilette?",fr:"Est-ce que je peux aller aux toilettes ?",it:"Devo andare in bagno",es:"Tengo que ir al baño",pt:"Posso ir ao banheiro?",nl:"Ik moet naar de wc",sv:"Jag måste gå på toa",da:"Jeg skal på toilettet",no:"Jeg må på toalettet",fi:"Minun pitää päästä vessaan"},
    stop:       {en:"Stop",de:"Stopp",fr:"Stop",it:"Basta",es:"¡Para!",pt:"Para!",nl:"Stop",sv:"Sluta",da:"Stop",no:"Stopp",fi:"Lopeta"},
    look:       {en:"Please look at me",de:"Schauen Sie mich bitte an",fr:"Regardez-moi, s’il vous plaît",it:"Guardami, per favore",es:"Mírame, por favor",pt:"Olha pra mim, por favor",nl:"Kijk eens naar mij",sv:"Titta på mig, tack",da:"Vil du kigge på mig?",no:"Kan du se på meg?",fi:"Katso minua, kiitos"},
    done:       {en:"I have finished",de:"Ich bin fertig",fr:"J’ai fini",it:"Ho finito",es:"Ya terminé",pt:"Já terminei",nl:"Ik ben klaar",sv:"Jag är klar",da:"Jeg er færdig",no:"Jeg er ferdig",fi:"Olen valmis"},
    water:      {en:"Can I have a drink of water?",de:"Darf ich etwas Wasser trinken?",fr:"Est-ce que je peux boire de l’eau ?",it:"Posso bere un po’ d’acqua?",es:"¿Puedo beber agua?",pt:"Posso beber água?",nl:"Mag ik water drinken?",sv:"Får jag dricka vatten?",da:"Må jeg få noget vand?",no:"Får jeg litt vann?",fi:"Saanko juoda vettä?"},
    hungry:     {en:"I am hungry",de:"Ich habe Hunger",fr:"J’ai faim",it:"Ho fame",es:"Tengo hambre",pt:"Estou com fome",nl:"Ik heb honger",sv:"Jag är hungrig",da:"Jeg er sulten",no:"Jeg er sulten",fi:"Minulla on nälkä"},
    cantea:     {en:"I can’t eat this",de:"Das darf ich nicht essen",fr:"Je ne peux pas manger ça",it:"Questo non lo posso mangiare",es:"Esto no lo puedo comer",pt:"Não posso comer isso",nl:"Dit kan ik niet eten",sv:"Det här får jag inte äta",da:"Det her må jeg ikke spise",no:"Dette får jeg ikke spise",fi:"Tätä en saa syödä"},
    hurt:       {en:"It hurts",de:"Mir tut etwas weh",fr:"Ça fait mal",it:"Mi fa male",es:"Me duele aquí",pt:"Está doendo",nl:"Het doet pijn",sv:"Det gör ont",da:"Det gør ondt",no:"Det gjør vondt",fi:"Sattuu"},
    sick:       {en:"I don’t feel well",de:"Mir geht es nicht gut",fr:"Je ne me sens pas bien",it:"Non mi sento bene",es:"No me siento bien",pt:"Não estou bem",nl:"Ik voel me niet lekker",sv:"Jag mår inte bra",da:"Jeg har det ikke godt",no:"Jeg føler meg ikke bra",fi:"Minulla on paha olo"},
    besick:     {en:"I need to be sick",de:"Mir ist schlecht",fr:"J’ai envie de vomir",it:"Mi viene da vomitare",es:"Tengo ganas de vomitar",pt:"Acho que vou vomitar",nl:"Ik moet overgeven",sv:"Jag måste kräkas",da:"Jeg skal kaste op",no:"Jeg må kaste opp",fi:"Minua oksettaa"},
    rest:       {en:"I need a little break",de:"Ich brauche eine kleine Pause",fr:"J’ai besoin d’une petite pause",it:"Mi serve una pausa",es:"Necesito un descanso",pt:"Preciso descansar um pouco",nl:"Ik heb even rust nodig",sv:"Jag behöver en liten paus",da:"Jeg har brug for en lille pause",no:"Jeg trenger en liten pause",fi:"Tarvitsen pienen tauon"},
    hot:        {en:"I am too hot",de:"Mir ist zu warm",fr:"J’ai trop chaud",it:"Ho troppo caldo",es:"Tengo mucho calor",pt:"Estou com muito calor",nl:"Ik heb het te warm",sv:"Jag är för varm",da:"Jeg har det for varmt",no:"Jeg er for varm",fi:"Minulla on liian kuuma"},
    cold:       {en:"I am too cold",de:"Mir ist zu kalt",fr:"J’ai trop froid",it:"Ho troppo freddo",es:"Tengo mucho frío",pt:"Estou com muito frio",nl:"Ik heb het te koud",sv:"Jag fryser",da:"Jeg fryser",no:"Jeg fryser",fi:"Minulla on liian kylmä"},
    dryclothes: {en:"I need dry clothes",de:"Ich brauche trockene Sachen",fr:"J’ai besoin de vêtements de rechange",it:"Mi servono vestiti asciutti",es:"Necesito ropa seca",pt:"Preciso de roupa seca",nl:"Ik heb droge kleren nodig",sv:"Jag behöver torra kläder",da:"Jeg har brug for tørt tøj",no:"Jeg trenger tørre klær",fi:"Tarvitsen kuivat vaatteet"},
    medicine:   {en:"I need my medicine",de:"Ich brauche meine Medizin",fr:"J’ai besoin de mon médicament",it:"Mi serve la mia medicina",es:"Necesito mi medicina",pt:"Preciso do meu remédio",nl:"Ik heb mijn medicijn nodig",sv:"Jag behöver min medicin",da:"Jeg har brug for min medicin",no:"Jeg trenger medisinen min",fi:"Tarvitsen lääkkeeni"},
    nose:       {en:"I need a tissue",de:"Ich brauche ein Taschentuch",fr:"J’ai besoin d’un mouchoir",it:"Mi serve un fazzoletto",es:"Necesito un pañuelo",pt:"Preciso de um lenço de papel",nl:"Ik heb een zakdoekje nodig",sv:"Jag behöver en näsduk",da:"Jeg har brug for et lommetørklæde",no:"Jeg trenger et lommetørkle",fi:"Tarvitsen nenäliinan"},
    again:      {en:"Please say that again",de:"Sagen Sie das bitte noch einmal",fr:"Répétez, s’il vous plaît",it:"Ripeti, per favore",es:"Otra vez, por favor",pt:"Fala de novo, por favor",nl:"Kun je het nog een keer zeggen?",sv:"Säg det igen, tack",da:"Sig det igen, tak",no:"Si det en gang til, takk",fi:"Sano se uudelleen, kiitos"},
    slow:       {en:"Please say it slowly",de:"Sprechen Sie bitte langsamer",fr:"Parlez plus lentement, s’il vous plaît",it:"Dillo più lentamente, per favore",es:"Más despacio, por favor",pt:"Fala mais devagar, por favor",nl:"Kun je het langzamer zeggen?",sv:"Säg det långsamt, tack",da:"Sig det langsomt, tak",no:"Si det sakte, takk",fi:"Sano se hitaasti, kiitos"},
    showme:     {en:"Please show me",de:"Zeigen Sie es mir bitte",fr:"Montrez-moi, s’il vous plaît",it:"Fammi vedere, per favore",es:"Muéstramelo, por favor",pt:"Me mostra, por favor",nl:"Kun je het laten zien?",sv:"Visa mig, tack",da:"Vis mig det, tak",no:"Vis meg det, takk",fi:"Näytä minulle, kiitos"},
    writeit:    {en:"Please write it down",de:"Schreiben Sie es bitte auf",fr:"Écrivez-le, s’il vous plaît",it:"Scrivilo, per favore",es:"Escríbelo, por favor",pt:"Escreve pra mim, por favor",nl:"Kun je het opschrijven?",sv:"Skriv upp det, tack",da:"Skriv det ned, tak",no:"Skriv det ned, takk",fi:"Kirjoita se ylös, kiitos"},
    whatis:     {en:"What is this?",de:"Was ist das?",fr:"Qu’est-ce que c’est ?",it:"Che cos’è questo?",es:"¿Qué es esto?",pt:"O que é isso?",nl:"Wat is dit?",sv:"Vad är det här?",da:"Hvad er det her?",no:"Hva er dette?",fi:"Mikä tämä on?"},
    howsay:     {en:"How do you say this?",de:"Wie sagt man das?",fr:"Comment on dit ça ?",it:"Come si dice questo?",es:"¿Cómo se dice esto?",pt:"Como se fala isso?",nl:"Hoe zeg je dit?",sv:"Hur säger man det här?",da:"Hvordan siger man det her?",no:"Hvordan sier man dette?",fi:"Miten tämä sanotaan?"},
    cantear:    {en:"I can’t hear you",de:"Ich höre Sie nicht",fr:"Je ne vous entends pas",it:"Non ti sento",es:"No te oigo",pt:"Não estou ouvindo",nl:"Ik hoor je niet",sv:"Jag hör dig inte",da:"Jeg kan ikke høre dig",no:"Jeg hører deg ikke",fi:"En kuule sinua"},
    cantsee:    {en:"I can’t see it",de:"Ich sehe es nicht",fr:"Je ne le vois pas",it:"Non riesco a vederlo",es:"No lo veo",pt:"Não estou vendo",nl:"Ik kan het niet zien",sv:"Jag ser det inte",da:"Jeg kan ikke se det",no:"Jeg ser det ikke",fi:"En näe sitä"},
    working:    {en:"I have not finished yet",de:"Ich bin noch nicht fertig",fr:"Je travaille encore",it:"Non ho ancora finito",es:"Todavía estoy trabajando",pt:"Ainda estou fazendo",nl:"Ik ben nog bezig",sv:"Jag är inte klar än",da:"Jeg er stadig i gang",no:"Jeg er ikke ferdig ennå",fi:"En ole vielä valmis"},
    helpstart:  {en:"Can you help me start?",de:"Können Sie mir beim Anfangen helfen?",fr:"Vous pouvez m’aider à commencer ?",it:"Mi aiuti a cominciare?",es:"¿Me ayudas a empezar?",pt:"Pode me ajudar a começar?",nl:"Wil je me op weg helpen?",sv:"Kan du hjälpa mig att börja?",da:"Kan du hjælpe mig i gang?",no:"Kan du hjelpe meg å begynne?",fi:"Autatko minua aloittamaan?"},
    dontknow:   {en:"I don’t know",de:"Ich weiß es nicht",fr:"Je ne sais pas",it:"Non lo so",es:"No lo sé",pt:"Não sei",nl:"Ik weet het niet",sv:"Jag vet inte",da:"Det ved jeg ikke",no:"Jeg vet ikke",fi:"En tiedä"},
    forgot:     {en:"I have forgotten",de:"Ich habe es vergessen",fr:"J’ai oublié",it:"Non mi ricordo",es:"Se me olvidó",pt:"Eu esqueci",nl:"Ik ben het vergeten",sv:"Jag har glömt det",da:"Jeg har glemt det",no:"Jeg har glemt det",fi:"Unohdin sen"},
    where:      {en:"Where do I go?",de:"Wo muss ich hin?",fr:"Où est-ce que je dois aller ?",it:"Dove devo andare?",es:"¿Adónde tengo que ir?",pt:"Pra onde eu vou?",nl:"Waar moet ik heen?",sv:"Vart ska jag gå?",da:"Hvor skal jeg hen?",no:"Hvor skal jeg gå?",fi:"Minne minun pitää mennä?"},
    whatdo:     {en:"What do I do now?",de:"Was soll ich jetzt machen?",fr:"Qu’est-ce que je fais maintenant ?",it:"Che cosa faccio adesso?",es:"¿Qué hago ahora?",pt:"O que eu faço agora?",nl:"Wat moet ik nu doen?",sv:"Vad ska jag göra nu?",da:"Hvad skal jeg lave nu?",no:"Hva skal jeg gjøre nå?",fi:"Mitä minä nyt teen?"},
    whatnext:   {en:"What happens next?",de:"Was kommt danach?",fr:"Qu’est-ce qui vient après ?",it:"Che cosa viene dopo?",es:"¿Qué viene después?",pt:"O que vem depois?",nl:"Wat komt er hierna?",sv:"Vad kommer sedan?",da:"Hvad sker der bagefter?",no:"Hva skjer etterpå?",fi:"Mitä tapahtuu seuraavaksi?"},
    rightplace: {en:"Am I in the right place?",de:"Bin ich hier richtig?",fr:"Est-ce que je suis au bon endroit ?",it:"Sono nel posto giusto?",es:"¿Estoy en el lugar correcto?",pt:"Estou no lugar certo?",nl:"Zit ik hier goed?",sv:"Är jag på rätt ställe?",da:"Er jeg det rigtige sted?",no:"Er jeg på rett sted?",fi:"Olenko oikeassa paikassa?"},
    whatneed:   {en:"What do I need for this?",de:"Was brauche ich dafür?",fr:"De quoi j’ai besoin pour ça ?",it:"Che cosa mi serve per questo?",es:"¿Qué necesito para esto?",pt:"Do que eu preciso para isso?",nl:"Wat heb ik hiervoor nodig?",sv:"Vad behöver jag till det här?",da:"Hvad skal jeg bruge til det her?",no:"Hva trenger jeg til dette?",fi:"Mitä tarvitsen tähän?"},
    lost:       {en:"I can’t find my things",de:"Ich finde meine Sachen nicht",fr:"Je ne trouve pas mes affaires",it:"Non trovo le mie cose",es:"No encuentro mis cosas",pt:"Não estou achando minhas coisas",nl:"Ik kan mijn spullen niet vinden",sv:"Jag hittar inte mina saker",da:"Jeg kan ikke finde mine ting",no:"Jeg finner ikke tingene mine",fi:"En löydä tavaroitani"},
    coat:       {en:"Can I get my coat?",de:"Darf ich meine Jacke holen?",fr:"Est-ce que je peux prendre mon manteau ?",it:"Posso prendere il mio giubbotto?",es:"¿Puedo ir a buscar mi abrigo?",pt:"Posso pegar meu casaco?",nl:"Mag ik mijn jas halen?",sv:"Får jag hämta min jacka?",da:"Må jeg hente min jakke?",no:"Får jeg hente jakka mi?",fi:"Saanko hakea takkini?"},
    lunch:      {en:"When is lunch?",de:"Wann gibt es Mittagessen?",fr:"C’est quand le repas ?",it:"Quando si mangia?",es:"¿Cuándo comemos?",pt:"Quando é o almoço?",nl:"Wanneer gaan we eten?",sv:"När är lunchen?",da:"Hvornår er der frokost?",no:"Når er matpausen?",fi:"Milloin on ruoka?"},
    hometime:   {en:"Is it home time?",de:"Ist die Schule aus?",fr:"C’est l’heure de rentrer ?",it:"È ora di andare a casa?",es:"¿Ya es hora de ir a casa?",pt:"Já é hora de ir para casa?",nl:"Is de school uit?",sv:"Är det dags att gå hem?",da:"Er det tid til at gå hjem?",no:"Er det på tide å gå hjem?",fi:"Onko jo kotiinlähtö?"},
    grownup:    {en:"When is my grown-up coming?",de:"Wann werde ich abgeholt?",fr:"Quand est-ce qu’on vient me chercher ?",it:"Quando vengono a prendermi?",es:"¿Cuándo vienen a buscarme?",pt:"Quando vão me buscar?",nl:"Wanneer word ik opgehaald?",sv:"När kommer någon och hämtar mig?",da:"Hvornår bliver jeg hentet?",no:"Når blir jeg hentet?",fi:"Milloin minut haetaan?"},
    waitforme:  {en:"Wait for me",de:"Warte auf mich",fr:"Attends-moi",it:"Aspettami",es:"Espérame",pt:"Me espera!",nl:"Wacht op mij",sv:"Vänta på mig",da:"Vent på mig",no:"Vent på meg",fi:"Odota minua"},
    tellyou:    {en:"I need to tell you something",de:"Ich muss Ihnen etwas sagen",fr:"J’ai quelque chose à vous dire",it:"Ti devo dire una cosa",es:"Te tengo que decir una cosa",pt:"Preciso te contar uma coisa",nl:"Ik moet je iets vertellen",sv:"Jag måste säga en sak",da:"Jeg skal fortælle dig noget",no:"Jeg må fortelle deg noe",fi:"Minun pitää kertoa sinulle jotain"},
    hello:      {en:"Hello",de:"Hallo",fr:"Bonjour",it:"Ciao",es:"Hola",pt:"Oi",nl:"Hallo",sv:"Hej",da:"Hej",no:"Hei",fi:"Hei"},
    playtoo:    {en:"Can I play too?",de:"Darf ich mitspielen?",fr:"Est-ce que je peux jouer aussi ?",it:"Posso giocare anch’io?",es:"¿Puedo jugar yo también?",pt:"Posso brincar também?",nl:"Mag ik ook meedoen?",sv:"Får jag vara med?",da:"Må jeg være med?",no:"Får jeg være med?",fi:"Saanko minäkin leikkiä?"},
    sithere:    {en:"Can I sit here?",de:"Darf ich hier sitzen?",fr:"Est-ce que je peux m’asseoir ici ?",it:"Posso sedermi qui?",es:"¿Puedo sentarme aquí?",pt:"Posso sentar aqui?",nl:"Mag ik hier zitten?",sv:"Får jag sitta här?",da:"Må jeg sidde her?",no:"Får jeg sitte her?",fi:"Saanko istua tässä?"},
    partner:    {en:"Will you be my partner?",de:"Machen wir zusammen?",fr:"Tu veux te mettre avec moi ?",it:"Ti metti con me?",es:"¿Hacemos pareja?",pt:"Quer fazer dupla comigo?",nl:"Wil je mijn maatje zijn?",sv:"Vill du jobba med mig?",da:"Vil du være min makker?",no:"Vil du være makkeren min?",fi:"Tuletko minun parikseni?"},
    myturn:     {en:"It’s my turn",de:"Ich bin dran",fr:"C’est mon tour",it:"Tocca a me",es:"Me toca a mí",pt:"É a minha vez",nl:"Ik ben aan de beurt",sv:"Det är min tur",da:"Det er min tur",no:"Det er min tur",fi:"Nyt on minun vuoroni"},
    yourturn:   {en:"It’s your turn",de:"Du bist dran",fr:"C’est ton tour",it:"Tocca a te",es:"Te toca a ti",pt:"É a sua vez",nl:"Jij bent aan de beurt",sv:"Det är din tur",da:"Det er din tur",no:"Det er din tur",fi:"Nyt on sinun vuorosi"},
    mine:       {en:"That is mine",de:"Das gehört mir",fr:"C’est à moi",it:"È mio",es:"Eso es mío",pt:"Isso é meu",nl:"Dat is van mij",sv:"Det där är mitt",da:"Det der er mit",no:"Det der er mitt",fi:"Tuo on minun"},
    dontlike:   {en:"I don’t like that",de:"Das mag ich nicht",fr:"Je n’aime pas ça",it:"Questo non mi piace",es:"Eso no me gusta",pt:"Não gosto disso",nl:"Dat vind ik niet fijn",sv:"Det tycker jag inte om",da:"Det kan jeg ikke lide",no:"Det liker jeg ikke",fi:"En pidä tuosta"},
    unkind:     {en:"Someone is being mean to me",de:"Jemand ist gemein zu mir",fr:"Quelqu’un n’est pas gentil avec moi",it:"Qualcuno mi tratta male",es:"Alguien se está metiendo conmigo",pt:"Alguém está mexendo comigo",nl:"Iemand doet gemeen tegen mij",sv:"Någon är elak mot mig",da:"Nogen driller mig",no:"Noen er slem mot meg",fi:"Joku on ilkeä minulle"},
    alone:      {en:"I want to play by myself",de:"Ich möchte allein spielen",fr:"Je veux jouer dans mon coin",it:"Voglio giocare per conto mio",es:"Quiero jugar a solas",pt:"Quero brincar só eu",nl:"Ik wil alleen spelen",sv:"Jag vill leka själv",da:"Jeg vil gerne lege alene",no:"Jeg vil leke alene",fi:"Haluan leikkiä yksin"},
    thanks:     {en:"Thank you",de:"Danke",fr:"Merci",it:"Grazie",es:"Gracias",pt:"Obrigado",nl:"Dank je wel",sv:"Tack",da:"Tak",no:"Takk",fi:"Kiitos"},
    sorry:      {en:"Sorry",de:"Entschuldigung",fr:"Pardon",it:"Scusa",es:"Perdón",pt:"Desculpa",nl:"Sorry",sv:"Förlåt",da:"Undskyld",no:"Unnskyld",fi:"Anteeksi"},
    new:        {en:"I am new here",de:"Ich bin neu hier",fr:"Je viens d’arriver",it:"È il mio primo giorno qui",es:"Acabo de llegar",pt:"É o meu primeiro dia aqui",nl:"Ik ben hier nieuw",sv:"Jag är ny här",da:"Jeg er ny her",no:"Jeg er ny her",fi:"Olen uusi täällä"},
    ispeak:     {en:"I speak my own language",de:"Ich kann schon eine Sprache",fr:"Je parle ma langue à moi",it:"Io parlo la mia lingua",es:"Yo hablo mi propio idioma",pt:"Eu falo a minha língua",nl:"Ik spreek mijn eigen taal",sv:"Jag pratar mitt eget språk",da:"Jeg snakker mit eget sprog",no:"Jeg snakker mitt eget språk",fi:"Puhun omaa kieltäni"},
    myname:     {en:"Let me say my name",de:"Ich sage meinen Namen selbst",fr:"Je veux dire mon prénom",it:"Il mio nome lo dico io",es:"Digo yo mi nombre",pt:"Deixa eu falar meu nome",nl:"Ik zeg zelf mijn naam",sv:"Jag säger mitt namn själv",da:"Jeg siger selv mit navn",no:"Jeg sier navnet mitt selv",fi:"Sanon nimeni itse"},
    knowanswer: {en:"I know the answer",de:"Ich weiß die Antwort",fr:"Je connais la réponse",it:"Io so la risposta",es:"Yo sé la respuesta",pt:"Eu sei a resposta",nl:"Ik weet het antwoord",sv:"Jag vet svaret",da:"Jeg ved svaret",no:"Jeg vet svaret",fi:"Tiedän vastauksen"},
    cando:      {en:"I can do this",de:"Das kann ich",fr:"Je sais le faire",it:"Questo lo so fare",es:"Yo sé hacer esto",pt:"Isso eu sei fazer",nl:"Dit kan ik",sv:"Det här kan jag",da:"Det her kan jeg",no:"Dette kan jeg",fi:"Tämän minä osaan"},
    wanttry:    {en:"I want to try",de:"Ich will es probieren",fr:"Je veux essayer",it:"Voglio provare",es:"Quiero intentarlo",pt:"Quero tentar",nl:"Ik wil het proberen",sv:"Jag vill försöka",da:"Jeg vil gerne prøve",no:"Jeg vil prøve",fi:"Haluan kokeilla"},
    showyou:    {en:"Can I show you instead?",de:"Darf ich es Ihnen lieber zeigen?",fr:"Est-ce que je peux vous le montrer ?",it:"Posso fartelo vedere?",es:"Mejor te lo muestro",pt:"Posso mostrar em vez de falar?",nl:"Mag ik het liever laten zien?",sv:"Får jag visa i stället?",da:"Må jeg vise det i stedet?",no:"Får jeg vise det i stedet?",fi:"Saanko mieluummin näyttää?"},
    mylang:     {en:"Can I answer in my language?",de:"Darf ich in meiner Sprache antworten?",fr:"Est-ce que je peux répondre dans ma langue ?",it:"Posso rispondere nella mia lingua?",es:"¿Puedo responder en mi idioma?",pt:"Posso responder na minha língua?",nl:"Mag ik in mijn eigen taal antwoorden?",sv:"Får jag svara på mitt språk?",da:"Må jeg svare på mit sprog?",no:"Får jeg svare på språket mitt?",fi:"Saanko vastata omalla kielelläni?"},
    dontwant:   {en:"I don’t want to do this",de:"Das möchte ich nicht machen",fr:"Je ne veux pas faire ça",it:"Questo non lo voglio fare",es:"Esto no lo quiero hacer",pt:"Isso eu não quero fazer",nl:"Dit wil ik niet doen",sv:"Det här vill jag inte göra",da:"Det her vil jeg ikke",no:"Dette vil jeg ikke gjøre",fi:"En halua tehdä tätä"},
    more:       {en:"I would like some more",de:"Ich hätte gern noch etwas",fr:"J’en voudrais encore",it:"Ne vorrei ancora",es:"Quisiera un poco más",pt:"Eu queria mais um pouco",nl:"Ik wil graag nog wat meer",sv:"Jag vill ha lite mer",da:"Jeg vil gerne have mere",no:"Jeg vil gjerne ha mer",fi:"Haluaisin vielä vähän"},
    share:      {en:"Shall we share?",de:"Sollen wir teilen?",fr:"On partage ?",it:"Facciamo a metà?",es:"¿Lo compartimos?",pt:"Vamos dividir?",nl:"Zullen we delen?",sv:"Ska vi dela på det?",da:"Skal vi dele?",no:"Skal vi dele?",fi:"Jaetaanko?"},
    maybe:      {en:"Maybe",de:"Vielleicht",fr:"Peut-être",it:"Forse",es:"Quizás",pt:"Talvez",nl:"Misschien",sv:"Kanske",da:"Måske",no:"Kanskje",fi:"Ehkä"}
  };

  /* ⚠ GENERATED — see the PHRASES note above. */
  var STRINGS = {
    title:        {en:"Say It Board",de:"Sag-es-Tafel",fr:"Le tableau pour se faire comprendre",it:"La tabella per farsi capire",es:"El tablero para decirlo",pt:"Meu quadro para falar",nl:"Het praatbord",sv:"Säg-det-tavlan",da:"Sig-det-tavlen",no:"Si-det-tavla",fi:"Puhetaulu"},
    instruction:  {en:"Tap a picture and it is said out loud, in the language of the class.",de:"Tippe ein Bild an — die Klasse hört es laut, in der Sprache des Klassenzimmers.",fr:"Touche une image — la classe l’entend à voix haute, dans la langue de la classe.",it:"Tocca un’immagine — la classe la sente ad alta voce, nella lingua dell’aula.",es:"Toca una imagen — la clase lo oye en voz alta, en el idioma del aula.",pt:"Toque numa imagem — a turma ouve em voz alta, na língua da sala.",nl:"Tik op een plaatje en het wordt hardop gezegd, in de taal van de klas.",sv:"Tryck på en bild — klassen hör det högt, på klassrummets språk.",da:"Tryk på et billede — klassen hører det højt, på klassens sprog.",no:"Trykk på et bilde — klassen hører det høyt, på klasserommets språk.",fi:"Napauta kuvaa — luokka kuulee sen ääneen, luokan kielellä."},
    catBody:      {en:"My body",de:"Mein Körper",fr:"Mon corps",it:"Il mio corpo",es:"Mi cuerpo",pt:"Meu corpo",nl:"Mijn lijf",sv:"Min kropp",da:"Min krop",no:"Kroppen min",fi:"Kehoni"},
    catUnder:     {en:"I don’t understand",de:"Ich verstehe nicht",fr:"Je ne comprends pas",it:"Non capisco",es:"No entiendo",pt:"Não entendi",nl:"Ik snap het niet",sv:"Jag förstår inte",da:"Jeg forstår ikke",no:"Jeg forstår ikke",fi:"En ymmärrä"},
    catNow:       {en:"What now",de:"Was jetzt passiert",fr:"Et maintenant ?",it:"Che cosa succede adesso",es:"Lo que pasa ahora",pt:"O que acontece agora",nl:"Wat er nu gebeurt",sv:"Vad händer nu",da:"Hvad sker der nu",no:"Hva skjer nå",fi:"Mitä nyt tapahtuu"},
    catOthers:    {en:"Being with others",de:"Mit den anderen",fr:"Avec les autres",it:"Stare con gli altri",es:"Estar con los demás",pt:"Estar com os outros",nl:"Samen met anderen",sv:"Tillsammans med andra",da:"Sammen med andre",no:"Sammen med andre",fi:"Muiden kanssa"},
    catMywords:   {en:"My words, my turn",de:"Meine Wörter",fr:"Mes mots, mon tour",it:"Le mie parole, tocca a me",es:"Mis palabras, mi turno",pt:"Minhas palavras, minha vez",nl:"Mijn woorden, mijn beurt",sv:"Mina ord, min tur",da:"Mine ord, min tur",no:"Mine ord, min tur",fi:"Minun sanani, minun vuoroni"},
    catMine:      {en:"Our own phrases",de:"Unsere Klasse",fr:"Notre classe",it:"La nostra classe",es:"Nuestra clase",pt:"Nossa turma",nl:"Onze klas",sv:"Vår klass",da:"Vores klasse",no:"Klassen vår",fi:"Meidän luokkamme"},
    roomLang:     {en:"The class hears",de:"Die Klasse hört",fr:"La classe entend",it:"La classe sente",es:"La clase oye",pt:"A turma ouve",nl:"De klas hoort",sv:"Klassen hör",da:"Klassen hører",no:"Klassen hører",fi:"Luokka kuulee"},
    addHome:      {en:"Add the child’s language",de:"Sprache des Kindes hinzufügen",fr:"Ajouter la langue de l’enfant",it:"Aggiungi la lingua del bambino",es:"Añadir el idioma del niño",pt:"Adicionar a língua da criança",nl:"De taal van het kind toevoegen",sv:"Lägg till barnets språk",da:"Tilføj barnets sprog",no:"Legg til barnets språk",fi:"Lisää lapsen kieli"},
    homeHint:     {en:"Add it only if the child’s language is on this list — the pictures work in any language.",de:"Nur wenn sie dabei ist — die Bilder funktionieren in jeder Sprache.",fr:"Seulement si elle est dans la liste — les images marchent quelle que soit la langue.",it:"Solo se è tra queste — le immagini funzionano qualunque lingua parli.",es:"Solo si está en la lista — las imágenes funcionan hable el idioma que hable.",pt:"Só se estiver na lista — as imagens funcionam seja qual for a língua.",nl:"Alleen als die erbij staat — de plaatjes werken bij elke taal.",sv:"Bara om det finns med — bilderna fungerar oavsett språk.",da:"Kun hvis det er på listen — billederne virker uanset sprog.",no:"Bare hvis det er på lista — bildene virker uansett språk.",fi:"Vain jos se on listalla — kuvat toimivat kielestä riippumatta."},
    noHome:       {en:"Pictures only",de:"Nur Bilder",fr:"Images uniquement",it:"Solo immagini",es:"Solo imágenes",pt:"Só imagens",nl:"Alleen plaatjes",sv:"Bara bilder",da:"Kun billeder",no:"Bare bilder",fi:"Vain kuvat"},
    changeHome:   {en:"Change",de:"Ändern",fr:"Changer",it:"Cambia",es:"Cambiar",pt:"Mudar",nl:"Wijzigen",sv:"Byt",da:"Skift",no:"Bytt",fi:"Vaihda"},
    showBig:      {en:"Show big",de:"Groß zeigen",fr:"Afficher en grand",it:"Mostra in grande",es:"Mostrar en grande",pt:"Mostrar ampliado",nl:"Groot laten zien",sv:"Visa stort",da:"Vis stort",no:"Vis stort",fi:"Näytä isona"},
    bigHint:      {en:"Tap anywhere to close.",de:"Tippe irgendwohin, um zu schließen.",fr:"Touche n’importe où pour fermer.",it:"Tocca dove vuoi per chiudere.",es:"Toca en cualquier sitio para cerrar.",pt:"Toque em qualquer lugar para fechar.",nl:"Tik ergens op om te sluiten.",sv:"Tryck var som helst för att stänga.",da:"Tryk et vilkårligt sted for at lukke.",no:"Trykk hvor som helst for å lukke.",fi:"Sulje napauttamalla mihin tahansa."},
    sayAloud:     {en:"Say this out loud",de:"Laut sagen",fr:"Dire ceci à voix haute",it:"Di’ questo ad alta voce",es:"Decir esto en voz alta",pt:"Dizer isso em voz alta",nl:"Dit hardop zeggen",sv:"Säg det här högt",da:"Sig det her højt",no:"Si dette høyt",fi:"Sano tämä ääneen"},
    sayInHome:    {en:"Hear it in your language",de:"In deiner Sprache hören",fr:"L’entendre dans ta langue",it:"Sentilo nella tua lingua",es:"Escúchalo en tu idioma",pt:"Ouvir na sua língua",nl:"Hoor het in jouw taal",sv:"Hör det på ditt språk",da:"Hør det på dit sprog",no:"Hør det på ditt språk",fi:"Kuule se omalla kielelläsi"},
    noVoiceBig:   {en:"This device has no voice for this language, so the board shows every card big instead.",de:"Dieses Gerät hat keine Stimme für diese Sprache — die Tafel zeigt jede Karte stattdessen groß.",fr:"Cet appareil n’a pas de voix pour cette langue : le tableau affiche chaque carte en grand.",it:"Questo dispositivo non ha una voce per quella lingua: la tabella mostra ogni scheda in grande.",es:"Este dispositivo no tiene voz para ese idioma, así que el tablero muestra cada tarjeta en grande.",pt:"Este aparelho não tem voz para essa língua, por isso o quadro mostra cada cartão em grande.",nl:"Dit apparaat heeft geen stem voor die taal, dus het bord toont elke kaart groot.",sv:"Den här enheten har ingen röst för det språket, så tavlan visar varje kort stort i stället.",da:"Denne enhed har ingen stemme til det sprog, så tavlen viser hvert kort stort i stedet.",no:"Denne enheten har ingen stemme for det språket, så tavla viser hvert kort stort i stedet.",fi:"Tässä laitteessa ei ole ääntä sille kielelle, joten taulu näyttää jokaisen kortin isona."},
    noVoiceHome:  {en:"No voice for this language on this device — the words are shown, not spoken.",de:"Keine Stimme für diese Sprache auf diesem Gerät — die Wörter werden gezeigt, nicht gesprochen.",fr:"Pas de voix pour cette langue sur cet appareil — les mots sont affichés, pas prononcés.",it:"Nessuna voce per questa lingua su questo dispositivo — le parole sono mostrate, non pronunciate.",es:"No hay voz para este idioma en este dispositivo — las palabras se muestran, no se dicen.",pt:"Não há voz para esta língua neste aparelho — as palavras aparecem, não são faladas.",nl:"Geen stem voor deze taal op dit apparaat — de woorden worden getoond, niet uitgesproken.",sv:"Ingen röst för det här språket på enheten — orden visas men sägs inte.",da:"Ingen stemme til dette sprog på enheden — ordene vises, men siges ikke.",no:"Ingen stemme for dette språket på enheten — ordene vises, men sies ikke.",fi:"Tälle kielelle ei ole ääntä tässä laitteessa — sanat näytetään, mutta niitä ei sanota."},
    privacy:      {en:"Nothing about the child is measured or sent anywhere. Your choices stay on this device.",de:"Über das Kind wird nichts gemessen oder irgendwohin gesendet. Deine Einstellungen bleiben auf diesem Gerät.",fr:"Rien n’est mesuré ni envoyé au sujet de l’enfant. Vos choix restent sur cet appareil.",it:"Sul bambino non si misura né si invia nulla. Le tue scelte restano su questo dispositivo.",es:"No se mide ni se envía nada sobre el niño. Tus opciones se quedan en este dispositivo.",pt:"Nada sobre a criança é medido ou enviado. As suas escolhas ficam neste aparelho.",nl:"Er wordt niets over het kind gemeten of verstuurd. Je keuzes blijven op dit apparaat.",sv:"Ingenting om barnet mäts eller skickas någonstans. Dina val stannar på den här enheten.",da:"Der måles eller sendes intet om barnet. Dine valg bliver på denne enhed.",no:"Ingenting om barnet måles eller sendes noe sted. Valgene dine blir på denne enheten.",fi:"Lapsesta ei mitata eikä lähetetä mitään. Valintasi pysyvät tässä laitteessa."},
    teacherKey:   {en:"For the teacher",de:"Für die Lehrkraft",fr:"Espace enseignant",it:"Per l’insegnante",es:"Para docentes",pt:"Para o professor",nl:"Voor de leerkracht",sv:"För läraren",da:"Til læreren",no:"For læreren",fi:"Opettajalle"},
    deskTitle:    {en:"Add a phrase this class needs",de:"Einen Satz hinzufügen, den diese Klasse braucht",fr:"Ajouter une phrase dont cette classe a besoin",it:"Aggiungi una frase che serve a questa classe",es:"Añadir una frase que esta clase necesita",pt:"Adicionar uma frase de que esta turma precisa",nl:"Een zin toevoegen die deze klas nodig heeft",sv:"Lägg till en fras den här klassen behöver",da:"Tilføj en sætning, denne klasse har brug for",no:"Legg til en setning denne klassen trenger",fi:"Lisää lause, jota tämä luokka tarvitsee"},
    deskHint:     {en:"Pick an opening, then finish it in the child’s own voice. The board always speaks as the child.",de:"Wähle einen Anfang und vervollständige ihn aus der Sicht des Kindes. Die Tafel spricht immer als das Kind.",fr:"Choisis un début, puis complète-le à la voix de l’enfant. Le tableau parle toujours comme l’enfant.",it:"Scegli un inizio e completalo con la voce del bambino. La tabella parla sempre come il bambino.",es:"Elige un comienzo y complétalo con la voz del niño. El tablero siempre habla como el niño.",pt:"Escolha um começo e complete-o na voz da criança. O quadro fala sempre como a criança.",nl:"Kies een begin en maak het af in de stem van het kind. Het bord spreekt altijd als het kind.",sv:"Välj en början och avsluta den med barnets röst. Tavlan talar alltid som barnet.",da:"Vælg en begyndelse, og gør den færdig med barnets stemme. Tavlen taler altid som barnet.",no:"Velg en begynnelse og fullfør den med barnets stemme. Tavla snakker alltid som barnet.",fi:"Valitse aloitus ja täydennä se lapsen äänellä. Taulu puhuu aina lapsena."},
    pickIcon:     {en:"Pick a picture",de:"Bild auswählen",fr:"Choisir une image",it:"Scegli un’immagine",es:"Elige una imagen",pt:"Escolha uma imagem",nl:"Kies een plaatje",sv:"Välj en bild",da:"Vælg et billede",no:"Velg et bilde",fi:"Valitse kuva"},
    iconRecent:   {en:"Recently used",de:"Zuletzt benutzt",fr:"Récentes",it:"Recenti",es:"Recientes",pt:"Recentes",nl:"Recent",sv:"Senaste",da:"Seneste",no:"Nylige",fi:"Viimeisimmät"},
    iconAll:      {en:"All pictures",de:"Alle Bilder",fr:"Toutes les images",it:"Tutte le immagini",es:"Todas las imágenes",pt:"Todas as imagens",nl:"Alle plaatjes",sv:"Alla bilder",da:"Alle billeder",no:"Alle bilder",fi:"Kaikki kuvat"},
    pickCat:      {en:"Which group?",de:"Welche Gruppe?",fr:"Quel groupe ?",it:"Quale gruppo?",es:"¿Qué grupo?",pt:"Qual grupo?",nl:"In welke rubriek?",sv:"Vilken grupp?",da:"Hvilken gruppe?",no:"Hvilken gruppe?",fi:"Mikä ryhmä?"},
    homeLine:     {en:"The same phrase in the child’s language (optional)",de:"Derselbe Satz in der Sprache des Kindes (optional)",fr:"La même phrase dans la langue de l’enfant (facultatif)",it:"La stessa frase nella lingua del bambino (facoltativo)",es:"La misma frase en el idioma del niño (opcional)",pt:"A mesma frase na língua da criança (opcional)",nl:"Dezelfde zin in de taal van het kind (optioneel)",sv:"Samma fras på barnets språk (valfritt)",da:"Den samme sætning på barnets sprog (valgfrit)",no:"Den samme setningen på barnets språk (valgfritt)",fi:"Sama lause lapsen kielellä (valinnainen)"},
    homeLineWhy:  {en:"Type it only if someone who speaks it wrote it for you. Nothing here is translated by machine.",de:"Nur eintragen, wenn jemand, der die Sprache spricht, es für dich geschrieben hat. Hier wird nichts maschinell übersetzt.",fr:"À saisir seulement si quelqu’un qui parle cette langue vous l’a écrit. Rien n’est traduit automatiquement ici.",it:"Scrivilo solo se te lo ha scritto qualcuno che parla quella lingua. Qui non si traduce nulla a macchina.",es:"Escríbelo solo si te lo ha escrito alguien que habla ese idioma. Aquí no se traduce nada a máquina.",pt:"Escreva apenas se alguém que fala essa língua escreveu para você. Aqui nada é traduzido por máquina.",nl:"Alleen invullen als iemand die de taal spreekt het voor je heeft opgeschreven. Hier wordt niets machinaal vertaald.",sv:"Skriv bara in det om någon som talar språket har skrivit det åt dig. Ingenting här maskinöversätts.",da:"Skriv det kun, hvis nogen der taler sproget har skrevet det til dig. Intet her maskinoversættes.",no:"Skriv det bare inn hvis noen som snakker språket har skrevet det for deg. Ingenting her maskinoversettes.",fi:"Kirjoita se vain, jos kielen puhuja on kirjoittanut sen sinulle. Täällä ei konekäännetä mitään."},
    showOnBoard:  {en:"Put it on the board",de:"Auf die Tafel legen",fr:"La mettre au tableau",it:"Mettila sulla tabella",es:"Ponerla en el tablero",pt:"Colocar no quadro",nl:"Op het bord zetten",sv:"Visa den på tavlan",da:"Vis den på tavlen",no:"Vis den på tavla",fi:"Laita se taululle"},
    keepPhrase:   {en:"Keep it",de:"Behalten",fr:"La garder",it:"Salvala",es:"Guardarla",pt:"Guardar",nl:"Bewaren",sv:"Spara den",da:"Gem den",no:"Behold den",fi:"Pidä se"},
    kept:         {en:"{n} of {max} kept",de:"{n} von {max} behalten",fr:"{n} sur {max} gardées",it:"{n} di {max} salvate",es:"{n} de {max} guardadas",pt:"{n} de {max} guardadas",nl:"{n} van {max} bewaard",sv:"{n} av {max} sparade",da:"{n} af {max} gemt",no:"{n} av {max} beholdt",fi:"{n}/{max} tallennettu"},
    removePhrase: {en:"Remove",de:"Entfernen",fr:"Retirer",it:"Togli",es:"Quitar",pt:"Remover",nl:"Verwijderen",sv:"Ta bort",da:"Fjern",no:"Fjern",fi:"Poista"},
    undo:         {en:"Undo",de:"Rückgängig",fr:"Rétablir",it:"Annulla",es:"Deshacer",pt:"Desfazer",nl:"Ongedaan maken",sv:"Ångra",da:"Fortryd",no:"Angre",fi:"Kumoa"},
    closeDesk:    {en:"Back to the board",de:"Zurück zur Tafel",fr:"Retour au tableau",it:"Torna alla tabella",es:"Volver al tablero",pt:"Voltar ao quadro",nl:"Terug naar het bord",sv:"Tillbaka till tavlan",da:"Tilbage til tavlen",no:"Tilbake til tavla",fi:"Takaisin taululle"},
    needStarter:  {en:"Pick an opening first.",de:"Wähle zuerst einen Anfang.",fr:"Choisis d’abord un début.",it:"Scegli prima un inizio.",es:"Elige primero un comienzo.",pt:"Escolha primeiro um começo.",nl:"Kies eerst een begin.",sv:"Välj en början först.",da:"Vælg en begyndelse først.",no:"Velg en begynnelse først.",fi:"Valitse ensin aloitus."},
    needWords:    {en:"Finish the sentence.",de:"Vervollständige den Satz.",fr:"Termine la phrase.",it:"Completa la frase.",es:"Termina la frase.",pt:"Termine a frase.",nl:"Maak de zin af.",sv:"Skriv klart meningen.",da:"Gør sætningen færdig.",no:"Fullfør setningen.",fi:"Täydennä lause."},
    tooLong:      {en:"That is longer than {n} characters. A phrase a child cannot take in at a glance is one they will not find under pressure.",de:"Das ist länger als {n} Zeichen. Ein Satz, den ein Kind nicht auf einen Blick erfasst, wird unter Druck nicht gefunden.",fr:"C’est plus long que {n} caractères. Une phrase qu’un enfant ne saisit pas d’un coup d’œil, il ne la trouvera pas sous pression.",it:"È più lungo di {n} caratteri. Una frase che un bambino non coglie a colpo d’occhio non la troverà sotto pressione.",es:"Eso pasa de {n} caracteres. Una frase que un niño no capta de un vistazo no la encontrará bajo presión.",pt:"Isso passa de {n} caracteres. Uma frase que a criança não capta num relance não será encontrada sob pressão.",nl:"Dat is langer dan {n} tekens. Een zin die een kind niet in één oogopslag ziet, vindt het niet onder druk.",sv:"Det är längre än {n} tecken. En fras ett barn inte fattar med en blick hittar det inte under press.",da:"Det er længere end {n} tegn. En sætning et barn ikke fatter med et blik, finder det ikke under pres.",no:"Det er lengre enn {n} tegn. En setning et barn ikke fatter med et blikk, finner det ikke under press.",fi:"Tuo on yli {n} merkkiä. Lause jota lapsi ei hahmota yhdellä silmäyksellä jää löytymättä paineen alla."},
    needIcon:     {en:"Pick a picture. The child who needs this cannot read the words.",de:"Wähle ein Bild. Das Kind, das dies braucht, kann die Wörter nicht lesen.",fr:"Choisissez une image. L’enfant qui en a besoin ne peut pas encore lire ces mots.",it:"Scegli un’immagine. Chi ne ha bisogno non riesce ancora a leggere queste parole.",es:"Elige una imagen. Quien la necesita todavía no puede leer estas palabras.",pt:"Escolha uma imagem. A criança que precisa dela não sabe ler as palavras.",nl:"Kies een plaatje. Het kind dat dit nodig heeft kan de woorden niet lezen.",sv:"Välj en bild. Barnet som behöver den kan inte läsa orden.",da:"Vælg et billede. Barnet der har brug for det, kan ikke læse ordene.",no:"Velg et bilde. Barnet som trenger det, kan ikke lese ordene.",fi:"Valitse kuva. Lapsi, joka tätä tarvitsee, ei osaa lukea näitä sanoja."},
    needCat:      {en:"Pick a group for it.",de:"Wähle eine Gruppe dafür.",fr:"Choisis un groupe.",it:"Scegli un gruppo.",es:"Elige un grupo.",pt:"Escolha um grupo.",nl:"Kies er een rubriek bij.",sv:"Välj en grupp.",da:"Vælg en gruppe.",no:"Velg en gruppe.",fi:"Valitse ryhmä."},
    oneThing:     {en:"One thing at a time — two sentences are two requests, and only one gets answered.",de:"Eins nach dem anderen — zwei Sätze sind zwei Bitten, und nur eine wird beantwortet.",fr:"Une chose à la fois — deux phrases font deux demandes, et une seule reçoit une réponse.",it:"Una cosa alla volta — due frasi sono due richieste, e ne viene esaudita una sola.",es:"Una cosa a la vez — dos frases son dos peticiones, y solo se responde a una.",pt:"Uma coisa de cada vez — duas frases são dois pedidos, e só um é atendido.",nl:"Eén ding tegelijk — twee zinnen zijn twee vragen, en er wordt er maar één beantwoord.",sv:"En sak i taget — två meningar är två önskningar, och bara en besvaras.",da:"Én ting ad gangen — to sætninger er to ønsker, og kun ét bliver besvaret.",no:"Én ting om gangen — to setninger er to ønsker, og bare ett blir besvart.",fi:"Yksi asia kerrallaan — kaksi lausetta on kaksi pyyntöä, ja vain toiseen vastataan."},
    duplicate:    {en:"That phrase is already on the board.",de:"Dieser Satz steht schon auf der Tafel.",fr:"Cette phrase est déjà au tableau.",it:"Quella frase è già sulla tabella.",es:"Esa frase ya está en el tablero.",pt:"Essa frase já está no quadro.",nl:"Die zin staat al op het bord.",sv:"Den frasen finns redan på tavlan.",da:"Den sætning står allerede på tavlen.",no:"Den setningen står allerede på tavla.",fi:"Se lause on jo taululla."},
    catFull:      {en:"This group already holds {n} of your phrases.",de:"Diese Gruppe enthält schon {n} deiner Sätze.",fr:"Ce groupe contient déjà {n} de vos phrases.",it:"Questo gruppo contiene già {n} tue frasi.",es:"Este grupo ya tiene {n} frases tuyas.",pt:"Este grupo já tem {n} frases suas.",nl:"In deze rubriek staan al {n} van je zinnen.",sv:"Den här gruppen har redan {n} av dina fraser.",da:"Denne gruppe har allerede {n} af dine sætninger.",no:"Denne gruppa har allerede {n} av setningene dine.",fi:"Tässä ryhmässä on jo {n} lausettasi."},
    allFull:      {en:"You have kept {n} phrases. Remove one to add another.",de:"Du hast {n} Sätze behalten. Entferne einen, um einen weiteren hinzuzufügen.",fr:"Vous avez gardé {n} phrases. Retirez-en une pour en ajouter une autre.",it:"Hai tenuto {n} frasi. Togline una per aggiungerne un’altra.",es:"Has guardado {n} frases. Quita una para añadir otra.",pt:"Você guardou {n} frases. Remova uma para adicionar outra.",nl:"Je hebt {n} zinnen bewaard. Verwijder er een om een nieuwe toe te voegen.",sv:"Du har sparat {n} fraser. Ta bort en för att lägga till en till.",da:"Du har gemt {n} sætninger. Fjern én for at tilføje en mere.",no:"Du har beholdt {n} setninger. Fjern én for å legge til en til.",fi:"Olet tallentanut {n} lausetta. Poista yksi lisätäksesi toisen."},
    gateKeep:     {en:"Keeping more than {n} of your own phrases is part of the Teacher plan. Writing them and using them is always free.",de:"Mehr als {n} eigene Sätze zu behalten gehört zum Lehrer-Paket. Sätze zu schreiben und zu benutzen ist immer kostenlos.",fr:"Garder plus de {n} phrases à vous fait partie de l’offre Enseignant. Les écrire et les utiliser reste toujours gratuit.",it:"Tenere più di {n} frasi tue fa parte del piano Insegnante. Scriverle e usarle è sempre gratuito.",es:"Guardar más de {n} frases tuyas es parte del plan Docente. Escribirlas y usarlas siempre es gratis.",pt:"Guardar mais de {n} frases suas faz parte do plano Professor. Escrevê-las e usá-las é sempre grátis.",nl:"Meer dan {n} eigen zinnen bewaren hoort bij het Leerkracht-pakket. Ze schrijven en gebruiken is altijd gratis.",sv:"Att spara fler än {n} egna fraser ingår i Lärarpaketet. Att skriva och använda dem är alltid gratis.",da:"At gemme flere end {n} egne sætninger er en del af Lærerpakken. At skrive og bruge dem er altid gratis.",no:"Å beholde flere enn {n} egne setninger er en del av Lærerpakken. Å skrive og bruke dem er alltid gratis.",fi:"Yli {n} oman lauseen tallentaminen kuuluu Opettaja-tilaukseen. Niiden kirjoittaminen ja käyttö on aina ilmaista."},
    gatePrint:    {en:"The wall poster and the family sheet are part of the Teacher plan. The lanyard cards are always free.",de:"Das Wandposter und der Elternbogen gehören zum Lehrer-Paket. Die Kärtchen für das Band sind immer kostenlos.",fr:"L’affiche murale et la feuille pour la famille font partie de l’offre Enseignant. Les cartes de cordon sont toujours gratuites.",it:"Il poster da parete e il foglio per la famiglia fanno parte del piano Insegnante. I cartellini da collo sono sempre gratuiti.",es:"El póster de pared y la hoja para la familia son parte del plan Docente. Las tarjetas de cordón siempre son gratis.",pt:"O cartaz de parede e a folha para a família fazem parte do plano Professor. Os cartões de cordão são sempre grátis.",nl:"De wandposter en het gezinsblad horen bij het Leerkracht-pakket. De koordkaartjes zijn altijd gratis.",sv:"Väggaffischen och familjebladet ingår i Lärarpaketet. Korten till nyckelbandet är alltid gratis.",da:"Vægplakaten og familiearket er en del af Lærerpakken. Kortene til nøglesnoren er altid gratis.",no:"Veggplakaten og familiearket er en del av Lærerpakken. Kortene til nøkkelbåndet er alltid gratis.",fi:"Seinäjuliste ja perheen lomake kuuluvat Opettaja-tilaukseen. Kaulanauhakortit ovat aina ilmaisia."},
    unlock:       {en:"See the Teacher plan",de:"Lehrer-Paket ansehen",fr:"Voir l’offre Enseignant",it:"Vedi il piano Insegnante",es:"Ver el plan Docente",pt:"Ver o plano Professor",nl:"Bekijk het Leerkracht-pakket",sv:"Se Lärarpaketet",da:"Se Lærerpakken",no:"Se Lærerpakken",fi:"Katso Opettaja-tilaus"},
    printBtn:     {en:"Print",de:"Drucken",fr:"Imprimer",it:"Stampa",es:"Imprimir",pt:"Imprimir",nl:"Afdrukken",sv:"Skriv ut",da:"Udskriv",no:"Skriv ut",fi:"Tulosta"},
    sheetCards:   {en:"Cards for a lanyard",de:"Kärtchen für das Band",fr:"Cartes pour un cordon",it:"Cartellini da collo",es:"Tarjetas para el cordón",pt:"Cartões de cordão",nl:"Kaartjes voor een koord",sv:"Kort till nyckelband",da:"Kort til nøglesnor",no:"Kort til nøkkelbånd",fi:"Kortit kaulanauhaan"},
    sheetWall:    {en:"Poster for the wall",de:"Poster für die Wand",fr:"Affiche pour le mur",it:"Poster da parete",es:"Póster para la pared",pt:"Cartaz para a parede",nl:"Poster voor de muur",sv:"Affisch för väggen",da:"Plakat til væggen",no:"Plakat til veggen",fi:"Juliste seinälle"},
    sheetHome:    {en:"Sheet for the family",de:"Bogen für die Familie",fr:"Feuille pour la famille",it:"Foglio per la famiglia",es:"Hoja para la familia",pt:"Folha para a família",nl:"Blad voor het gezin",sv:"Blad till familjen",da:"Ark til familien",no:"Ark til familien",fi:"Lomake perheelle"},
    printName:    {en:"Name",de:"Name",fr:"Prénom",it:"Nome",es:"Nombre",pt:"Nome",nl:"Naam",sv:"Namn",da:"Navn",no:"Navn",fi:"Nimi"},
    printBack:    {en:"Write here the words your child uses at home, and we will learn them.",de:"Schreiben Sie hier die Wörter auf, die Ihr Kind zu Hause benutzt — wir lernen sie.",fr:"Écrivez ici les mots que votre enfant utilise à la maison, et nous les apprendrons.",it:"Scrivete qui le parole che vostro figlio usa a casa, e le impareremo.",es:"Escriban aquí las palabras que su hijo usa en casa, y las aprenderemos.",pt:"Escrevam aqui as palavras que seu filho usa em casa, e nós vamos aprendê-las.",nl:"Schrijf hier de woorden die uw kind thuis gebruikt, dan leren wij ze.",sv:"Skriv orden ert barn använder hemma här, så lär vi oss dem.",da:"Skriv de ord jeres barn bruger hjemme her, så lærer vi dem.",no:"Skriv ordene barnet deres bruker hjemme her, så lærer vi dem.",fi:"Kirjoittakaa tähän sanat, joita lapsenne käyttää kotona — me opettelemme ne."},
    setVoice:     {en:"Speak the cards",de:"Laut sagen",fr:"Dire à voix haute",it:"Leggi ad alta voce",es:"Decirlo en voz alta",pt:"Dizer em voz alta",nl:"Hardop zeggen",sv:"Läs upp högt",da:"Læs op",no:"Les opp",fi:"Lue ääneen"},
    setBig:       {en:"Always show big",de:"Immer groß zeigen",fr:"Toujours afficher en grand",it:"Mostra sempre in grande",es:"Mostrar siempre en grande",pt:"Mostrar sempre ampliado",nl:"Altijd groot laten zien",sv:"Visa alltid stort",da:"Vis altid stort",no:"Vis alltid stort",fi:"Näytä aina isona"}
  };

  /* ⚠ GENERATED. */
  var STARTER_TEXT = {
    need:     {en:"I need {x}",de:"Ich brauche {x}",fr:"Il me faut {x}",it:"Mi serve {x}",es:"Necesito {x}",pt:"Preciso de {x}",nl:"Ik heb {x} nodig",sv:"Jag behöver {x}",da:"Jeg skal bruge {x}",no:"Jeg trenger {x}",fi:"Tarvitsen {x}"},
    want:     {en:"I would like {x}",de:"Ich möchte {x}",fr:"Je voudrais {x}",it:"Vorrei {x}",es:"Quiero {x}",pt:"Eu queria {x}",nl:"Ik wil graag {x}",sv:"Jag skulle vilja ha {x}",da:"Jeg vil gerne have {x}",no:"Jeg vil gjerne ha {x}",fi:"Haluaisin {x}"},
    dontwant: {en:"I don’t want {x}",de:"Ich möchte {x} nicht",fr:"Je ne veux pas {x}",it:"Non voglio {x}",es:"No quiero {x}",pt:"Não quero {x}",nl:"Ik wil {x} niet",sv:"Jag vill inte ha {x}",da:"Jeg vil ikke have {x}",no:"Jeg vil ikke ha {x}",fi:"En halua {x}"},
    canI:     {en:"Can I {x}?",de:"Darf ich {x}?",fr:"Est-ce que je peux {x} ?",it:"Posso {x}?",es:"¿Puedo {x}?",pt:"Posso {x}?",nl:"Mag ik {x}?",sv:"Får jag {x}?",da:"Må jeg {x}?",no:"Får jeg {x}?",fi:"Saanko {x}?"},
    whereis:  {en:"Where is {x}?",de:"Wo ist {x}?",fr:"Où est {x} ?",it:"Dove trovo {x}?",es:"¿Dónde está {x}?",pt:"Onde eu acho {x}?",nl:"Waar is {x}?",sv:"Var är {x}?",da:"Hvor er {x}?",no:"Hvor er {x}?",fi:"Missä on {x}?"},
    whenis:   {en:"When is {x}?",de:"Wann ist {x}?",fr:"C’est quand {x} ?",it:"Quando c’è {x}?",es:"¿Cuándo es {x}?",pt:"Quando é {x}?",nl:"Wanneer is {x}?",sv:"När är {x}?",da:"Hvornår er {x}?",no:"Når er {x}?",fi:"Milloin on {x}?"},
    whatis:   {en:"What is {x}?",de:"Was ist {x}?",fr:"C’est quoi {x} ?",it:"Che cos’è {x}?",es:"¿Qué es {x}?",pt:"O que é {x}?",nl:"Wat is {x}?",sv:"Vad är {x}?",da:"Hvad er {x}?",no:"Hva er {x}?",fi:"Mikä on {x}?"},
    ican:     {en:"I can {x}",de:"Ich kann {x}",fr:"Je sais {x}",it:"So {x}",es:"Sé {x}",pt:"Eu sei {x}",nl:"Ik kan {x}",sv:"Jag kan {x}",da:"Jeg kan {x}",no:"Jeg kan {x}",fi:"Osaan {x}"},
    myname:   {en:"My name is {x}",de:"Ich heiße {x}",fr:"Je m’appelle {x}",it:"Mi chiamo {x}",es:"Me llamo {x}",pt:"Meu nome é {x}",nl:"Ik heet {x}",sv:"Jag heter {x}",da:"Jeg hedder {x}",no:"Jeg heter {x}",fi:"Nimeni on {x}"}
  };

  /* ⭐ WORKED EXAMPLES, shown under the textarea for the selected
     starter. The panels found that a fixed opening makes the wrong
     grammatical PERSON impossible and the wrong CASE, ARTICLE and
     NUMBER invisible — and the Finnish panel was explicit that the fix
     must be data, because a machine must not adjudicate a native
     speaker's Finnish. ⚠ GENERATED. */
  var STARTER_EG = {
    need:     {en:"e.g. a pencil · scissors · a plaster",de:"z. B. einen Stift · eine Schere · ein Pflaster",fr:"p. ex. un crayon · des ciseaux · un pansement",it:"es. una matita · le forbici · un cerotto",es:"p. ej. un lápiz · unas tijeras · una tirita",pt:"ex. um lápis · uma tesoura · um curativo",nl:"bijv. een potlood · een schaar · een pleister",sv:"t.ex. en penna · en sax · ett plåster",da:"f.eks. en blyant · en saks · et plaster",no:"f.eks. en blyant · en saks · et plaster",fi:"esim. kynän · sakset · laastarin"},
    want:     {en:"e.g. more paper · a turn · some water",de:"z. B. noch Papier · einen Versuch · etwas Wasser",fr:"p. ex. encore du papier · un tour · de l’eau",it:"es. ancora un foglio · un turno · dell’acqua",es:"p. ej. más papel · un turno · agua",pt:"ex. mais papel · uma vez · água",nl:"bijv. nog papier · een beurt · wat water",sv:"t.ex. mer papper · en tur · lite vatten",da:"f.eks. mere papir · en tur · lidt vand",no:"f.eks. mer papir · en tur · litt vann",fi:"esim. lisää paperia · vuoron · vettä"},
    dontwant: {en:"e.g. to sit there · milk · to go outside",de:"z. B. Milch · das Lied · den Nachtisch",fr:"p. ex. de lait · aller dehors · m’asseoir là",it:"es. il latte · uscire · sedermi lì",es:"p. ej. leche · salir · sentarme ahí",pt:"ex. leite · sair · sentar ali",nl:"bijv. melk · naar buiten · daar zitten",sv:"t.ex. mjölk · gå ut · sitta där",da:"f.eks. mælk · gå ud · sidde der",no:"f.eks. melk · gå ut · sitte der",fi:"esim. maitoa · mennä ulos · istua siinä"},
    canI:     {en:"a verb — e.g. sit here · go outside · help you",de:"ein Verb — z. B. hier sitzen · rausgehen · helfen",fr:"un verbe — p. ex. m’asseoir ici · sortir · aider",it:"un verbo — es. sedermi qui · uscire · aiutare",es:"un verbo — p. ej. sentarme aquí · salir · ayudar",pt:"um verbo — ex. sentar aqui · sair · ajudar",nl:"een werkwoord — bijv. hier zitten · naar buiten",sv:"ett verb — t.ex. sitta här · gå ut · hjälpa till",da:"et udsagnsord — f.eks. sidde her · gå ud · hjælpe",no:"et verb — f.eks. sitte her · gå ut · hjelpe til",fi:"verbi — esim. istua tässä · mennä ulos · auttaa"},
    whereis:  {en:"e.g. the toilet · my coat · the library",de:"z. B. die Toilette · meine Jacke · die Bücherei",fr:"p. ex. les toilettes · mon manteau · la bibliothèque",it:"es. il bagno · il mio giubbotto · la biblioteca",es:"p. ej. el baño · mi abrigo · la biblioteca",pt:"ex. o banheiro · meu casaco · a biblioteca",nl:"bijv. de wc · mijn jas · de bibliotheek",sv:"t.ex. toaletten · min jacka · biblioteket",da:"f.eks. toilettet · min jakke · biblioteket",no:"f.eks. toalettet · jakka mi · biblioteket",fi:"esim. vessa · takkini · kirjasto"},
    whenis:   {en:"e.g. lunch · playtime · swimming",de:"z. B. das Mittagessen · die Pause · Schwimmen",fr:"p. ex. le repas · la récréation · la piscine",it:"es. la mensa · la ricreazione · il nuoto",es:"p. ej. la comida · el recreo · la piscina",pt:"ex. o almoço · o recreio · a natação",nl:"bijv. het eten · de pauze · zwemmen",sv:"t.ex. lunchen · rasten · simningen",da:"f.eks. frokosten · frikvarteret · svømning",no:"f.eks. matpausen · friminuttet · svømming",fi:"esim. ruoka · välitunti · uinti"},
    whatis:   {en:"e.g. this word · that sign · this room",de:"z. B. dieses Wort · das Schild · dieser Raum",fr:"p. ex. ce mot · ce panneau · cette salle",it:"es. questa parola · quel cartello · questa stanza",es:"p. ej. esta palabra · ese cartel · esta sala",pt:"ex. esta palavra · aquela placa · esta sala",nl:"bijv. dit woord · dat bord · deze ruimte",sv:"t.ex. det här ordet · den skylten · det här rummet",da:"f.eks. dette ord · det skilt · dette rum",no:"f.eks. dette ordet · det skiltet · dette rommet",fi:"esim. tämä sana · tuo kyltti · tämä huone"},
    ican:     {en:"a verb — e.g. read this · swim · tie my shoes",de:"ein Verb — z. B. das lesen · schwimmen · zubinden",fr:"un verbe — p. ex. lire ça · nager · faire mes lacets",it:"un verbo — es. leggerlo · nuotare · allacciarmi le scarpe",es:"un verbo — p. ej. leer esto · nadar · atarme los zapatos",pt:"um verbo — ex. ler isso · nadar · amarrar o sapato",nl:"een werkwoord — bijv. dit lezen · zwemmen · veters strikken",sv:"ett verb — t.ex. läsa det här · simma · knyta skorna",da:"et udsagnsord — f.eks. læse det · svømme · binde snørebånd",no:"et verb — f.eks. lese dette · svømme · knyte skoene",fi:"verbi — esim. lukea tämän · uida · sitoa kengännauhat"},
    myname:   {en:"the child writes it as they say it",de:"so schreiben, wie das Kind es sagt",fr:"écrivez-le comme l’enfant le dit",it:"scrivetelo come lo dice il bambino",es:"escríbanlo como lo dice el niño o la niña",pt:"escreva como a criança fala",nl:"schrijf het zoals het kind het zegt",sv:"skriv det som barnet säger det",da:"skriv det, som barnet siger det",no:"skriv det slik barnet sier det",fi:"kirjoita se niin kuin lapsi sen sanoo"}
  };

  /* which locales a native panel has actually signed off. ⚠ GENERATED. */
  var REVIEWED = {en:true,de:true,fr:true,it:true,es:true,pt:true,nl:true,sv:true,da:true,no:true,fi:true};

  var ENDONYM = {
    en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano', es: 'Español',
    pt: 'Português', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', no: 'Norsk', fi: 'Suomi'
  };

  /* =================================================================
     THE TOOL
     ================================================================= */
  var SayItBoard = {
    id: 'home-language-bridge',

    /* exposed so a Node gate can drive the model WITHOUT a browser and
       WITHOUT reimplementing it — a gate that reimplements what it
       checks is testing a copy. */
    M: MODEL,
    ICONS: ICONS,
    PHRASES: PHRASES,
    CORE: CORE,
    CATEGORIES: CATEGORIES,
    STARTERS: STARTERS,
    STARTER_TEXT: STARTER_TEXT,
    STARTER_EG: STARTER_EG,
    ENDONYM: ENDONYM,
    REVIEWED: REVIEWED,
    NEVER_ADJACENT: NEVER_ADJACENT,
    ACCEPTED_PAIRS: ACCEPTED_PAIRS,
    BLANK_ICONS: BLANK_ICONS,
    SHOW_NOT_SAY: SHOW_NOT_SAY,

    strings: STRINGS,

    defaults: { voice: true, big: false },
    settings: [
      { key: 'voice', type: 'toggle', labelKey: 'setVoice' },
      { key: 'big', type: 'toggle', labelKey: 'setBig' }
    ],

    STORE_KEY: 'lcs:home-language-bridge:v2',
    LEGACY_KEY: 'lcs:home-language-bridge:v1',
    ENT_TRUST_DAYS: 14,
    TEACHER_MS: 90000,
    UNDO_MS: 20000,

    premium: false,
    /* ⚠ UNKNOWN ENTITLEMENT IS PESSIMISTIC for a CONTROL gate. It is
       NOT pessimistic for CONTENT ALREADY ON THE DEVICE: a teacher's
       own kept phrases render immediately, because withholding her own
       data on her own machine is a bug, not a gate. */
    premiumKnown: false,

    /* ---------------- lifecycle ---------------- */
    init: function (api) {
      this.api = api;
      injectSayItCSS();
      document.body.classList.add('hlb-page');
      document.documentElement.classList.add('hlb-page');

      this._store = MODEL.store(this._loadRaw());
      var saved = this._store.settings || {};
      for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

      this.classroom = api.lang;
      this.cat = this._store.cat;
      this.big = !!api.settings.big;
      this.lifted = null;      /* the card being held up */
      this.desk = false;       /* the adult surface */
      this.draft = null;
      this.notice = null;
      this.trash = null;
      this._timers = [];
      this._voiceState = null;
      this._voiceBound = false;
      this._teacherUntil = 0;

      this._fetchEntitlement();
      this.render();
    },

    /* ⚠ THE SHELL HAS NO destroy() HOOK — verified, it is never called
       anywhere in lcs-shell.js. The v2 build declared one and it was
       dead code, which is why `hlb-wide` was added to <body> at mount
       and could never be removed. Nothing here relies on teardown:
       every timer is cleared on the next paint instead. */
    _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
    _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

    _loadRaw: function () {
      var raw = null;
      try { raw = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (e) {}
      if (raw) return raw;
      /* a real migration from v1, not a drop — and inside a try/catch,
         because a broken v1 blob must not stop the tool opening. */
      try {
        var old = JSON.parse(localStorage.getItem(this.LEGACY_KEY));
        if (old && typeof old === 'object') return { home: old.home, settings: old.settings, ent: old.ent };
      } catch (e) {}
      return null;
    },

    _save: function () {
      var s = this._store;
      s.cat = this.cat;
      s.settings = {};
      for (var i = 0; i < this.settings.length; i++) s.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
      try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (e) {}
    },

    /* ⚠ THE CANONICAL SHAPE, and ENT_TRUST_DAYS is now READ rather than
       merely declared. The v2 build defined it and referenced it
       exactly once — in its own declaration — while trusting a cached
       tier with no age check at all. The cached trust applies ONLY to a
       NETWORK FAILURE; an authoritative "free" demotes at once. */
    _fetchEntitlement: function () {
      var self = this;
      if (typeof fetch !== 'function') { this.premiumKnown = true; return; }
      var cached = this._store.ent;
      var trustCache = function () {
        if (cached && cached.tier === 'full' && cached.at) {
          var age = (Date.now() - Number(cached.at)) / 86400000;
          if (age >= 0 && age <= self.ENT_TRUST_DAYS) self.premium = true;
        }
        self.premiumKnown = true;
        if (self._wrap) self._paint();
      };
      var token = null;
      try { token = localStorage.getItem('accessToken'); } catch (e) {}
      if (!token) { this.premiumKnown = true; return; }
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j) { trustCache(); return; }
          var tier = j.user && j.user.subscriptionTier;
          var sub = j.subscription;
          self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self.premiumKnown = true;
          self._store.ent = { tier: self.premium ? 'full' : 'free', at: Date.now() };
          self._save();
          if (self._wrap) self._paint();
        })
        .catch(trustCache);
    },

    /* ---------------- voice ---------------- */
    /* ⚠ AN EMPTY getVoices() IS "NOT YET", NOT "YES". Chrome returns []
       until `voiceschanged` fires, and the v2 build fell through with
       true and CACHED it — so on the very device where the voice is
       genuinely missing, the warning could never appear and the board
       spoke through a silently substituted voice. An indeterminate
       answer is not cached, and we listen exactly once. */
    _voices: function () {
      try { return (window.speechSynthesis && window.speechSynthesis.getVoices()) || []; }
      catch (e) { return []; }
    },

    _canSpeak: function (lang) {
      var voices = this._voices();
      if (!voices.length) {
        if (!this._voiceBound) {
          this._voiceBound = true;
          var self = this;
          try {
            window.speechSynthesis.addEventListener('voiceschanged', function () {
              self._voiceState = null;
              if (self._wrap) self._paint();
            });
          } catch (e) {}
        }
        return true;                      /* provisional, NOT cached */
      }
      return MODEL.hasVoice(lang, voices);
    },

    /* ⚠ NO `|| en` FALLBACK ANYWHERE ON THIS PATH. A card we do not
       have in the language asked for is shown and not said. */
    _say: function (text, lang) {
      if (!this.api.settings.voice || !text) return false;
      if (!this._canSpeak(lang)) return false;
      try { LCSAudio.speak({ type: 'ui', text: String(text), lang: lang, rate: 0.9 }); } catch (e) {}
      return true;
    },

    /* ---------------- text composition ---------------- */
    textOf: function (card) {
      if (card.custom) return this.composeCustom(card.custom, this.classroom);
      return card.text;
    },

    composeCustom: function (c, loc) {
      var t = STARTER_TEXT[c.starter];
      /* ⚠ NO `|| .en`. My own H8b gate missed this one: its regex was
         `\|\|\s*(p\.)?t\.en`, and the parenthesis in `(t && t.en)`
         walked straight past it. A native panel found it by reading the
         line. `composeCustom` feeds `textOf` -> `_say`, so an English
         pattern here would be SPOKEN tagged as the classroom language —
         the v2 defect verbatim, in the one place the gate could not see. */
      var pattern = (t && t[loc]) || null;
      if (!pattern) return null;
      /* ⚠ A FUNCTION, NOT A STRING. `String.replace` interprets `$&`,
         `` $` ``, `$'` and `$$` IN THE REPLACEMENT — so a teacher who
         types `$'` had the rest of the starter swallowed, and `$$`
         became `$`. Found by the Nordic panel reading the model. */
      return pattern.replace('{x}', function () { return c.body; });
    },

    /* ⚠⚠ THIS COMMENT USED TO CLAIM MORE THAN THE CODE DOES, and the
       German panel caught it by reading the model. It said "a category
       whose locale has not been through a native panel DOES NOT RENDER"
       and that "an unreviewed toilet phrase is the precise defect the
       whole SoT exists to end" — while withholding the three LEAST
       sensitive groups (now / others / mywords) and shipping the two
       MOST sensitive, plus the entire core rail, `toilet` included.
       Exactly backwards, and stated in the opposite direction.

       What it actually is, said plainly: a PARTIAL HEDGE, not a
       guarantee. The core eight and the two first-need groups always
       render, because a board that cannot say "toilet", "stop" or "it
       hurts" is not a board — withholding them would harm the child
       this exists for far more than an imperfect phrasing does. The
       three later groups are held back until a native panel has read
       that locale, because those are the ones a teacher can do without
       for a week.
       The strings are AUTHORED, never machine-translated, and the panel
       verdicts are tracked in REVIEWED. Do not restate this as a
       guarantee again. */
    categoriesFor: function (loc) {
      if (REVIEWED[loc]) return CATEGORIES;
      var out = [];
      for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === 'body' || CATEGORIES[i].id === 'under') out.push(CATEGORIES[i]);
      return out;
    },

    /* ---------------- render ---------------- */
    /* `_build()` makes the skeleton ONCE; `_paint()` recomputes from
       state. The v2 build called render() from five places and every
       one did `stage.innerHTML = ''`, which DESTROYED FOCUS — on a
       switch scanner, which is exactly the assistive technology this
       tool is most likely to meet, that is a hard failure. */
    render: function () {
      if (!this.api) return;
      if (!this._wrap || !this._wrap.parentNode) this._build();
      this._paint();
    },

    reset: function () {
      /* a VIEW reset. It must never touch the teacher's own phrases. */
      this.lifted = null; this.desk = false; this.draft = null; this.notice = null;
      this.cat = this.categoriesFor(this.classroom)[0].id;
      if (this._wrap) this._paint();
    },

    onSettings: function () {
      this.big = !!this.api.settings.big;
      this._save();
      /* the shell calls render() itself right after this; painting here
         too would paint twice per toggle. */
    },

    _build: function () {
      var api = this.api;
      api.stage.innerHTML = '';
      var wrap = api.el('div', 'hlb-wrap');
      this._wrap = wrap;
      this._bar = api.el('div', 'hlb-bar');
      this._tabs = api.el('div', 'hlb-tabs');
      this._rail = api.el('div', 'hlb-rail');
      this._board = api.el('div', 'hlb-board');
      this._foot = api.el('div', 'hlb-foot');
      this._deskEl = api.el('div', 'hlb-desk');
      this._bigEl = api.el('div', 'hlb-big');
      wrap.append(this._bar, this._tabs, this._rail, this._board, this._foot, this._deskEl, this._bigEl);
      api.stage.appendChild(wrap);
      /* ⚠ THE PRINT SHEET IS A SIBLING OF THE WRAP, NEVER A CHILD:
         print hides the wrap, and a nested sheet would inherit
         display:none from it. */
      this._sheet = api.el('div', 'hlb-sheet');
      api.stage.appendChild(this._sheet);
    },

    _focusSnap: function () {
      var a = document.activeElement;
      return (a && a.getAttribute) ? a.getAttribute('data-fk') : null;
    },
    _focusRestore: function (fk) {
      if (!fk || !this._wrap) return;
      var el = this._wrap.querySelector('[data-fk="' + fk + '"]');
      if (el && el.focus) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
    },

    _paint: function () {
      var fk = this._focusSnap();
      this._clearTimers();
      var forcedBig = !this._canSpeak(this.classroom);
      this._forcedBig = forcedBig;
      document.body.classList.toggle('hlb-paid', !!this.premium);

      /* ⚠ CLAMP FIRST. _paintBoard clamped `cat` but ran AFTER
         _paintTabs, so on a paint where a stored category was out of
         range for the locale the tab strip rendered with nothing
         selected while the board rendered a different group. */
      var okCats = this.categoriesFor(this.classroom).map(function (c) { return c.id; });
      if (this.cat !== 'mine' && okCats.indexOf(this.cat) < 0) this.cat = okCats[0];
      this._paintBar();
      this._paintTabs();
      this._paintRail();
      this._paintBoard();
      this._paintFoot();
      this._paintDesk();
      this._paintBig();
      this._buildSheet();
      /* ⚠ THE DESK REPLACES THE STAGE, it does not sit under it. The
         first build appended it below the board, so a teacher tapping
         "For the teacher" on a 704px page got a desk BELOW THE FOLD and
         appeared to get nothing at all — the control fired, the DOM
         changed, every gate would have scored it live, and the feature
         was invisible. Found by looking at the render.
         And hiding the child's board while an adult types is the point
         anyway: the board a child picks up is never mid-edit. */
      this._wrap.classList.toggle('hlb-desking', !!this.desk);
      /* ⚠ AFTER the cards are rebuilt — see the note in _tapCard. */
      this._applySaid();
      this._save();
      this._focusRestore(fk);
    },

    _t: function (key, args) {
      var s = this.api.t(key);
      if (!args) return s;
      return String(s).replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? String(args[k]) : m; });
    },

    _paintBar: function () {
      var self = this, api = this.api, bar = this._bar;
      bar.innerHTML = '';
      var room = api.el('div', 'hlb-room');
      var lbl = api.el('span', 'hlb-roomlbl'); lbl.textContent = api.t('roomLang');
      var val = api.el('span', 'hlb-roomval'); val.textContent = ENDONYM[this.classroom] || this.classroom;
      val.setAttribute('lang', this.classroom);
      room.append(lbl, val);
      bar.appendChild(room);

      var home = api.el('button', 'hlb-chip'); home.type = 'button'; home.setAttribute('data-fk', 'home');
      home.setAttribute('aria-expanded', this.picking ? 'true' : 'false');
      if (this._store.home) {
        home.textContent = (ENDONYM[this._store.home] || this._store.home) + ' · ' + api.t('changeHome');
        home.setAttribute('lang', this._store.home);
      } else {
        home.textContent = api.t('addHome');
      }
      home.addEventListener('click', function () { self.picking = !self.picking; self._paint(); });
      bar.appendChild(home);

      /* ⭐ THE INVENTION. With no voice for the room's language, Show-big
         is FORCED ON and the chip is disabled WITH THE REASON — the
         apparatus reconfigures rather than printing an apology. */
      var big = api.el('button', 'hlb-chip' + (this.big || this._forcedBig ? ' hlb-on' : '')); big.type = 'button';
      big.setAttribute('data-fk', 'big');
      big.textContent = api.t('showBig');
      big.setAttribute('aria-pressed', (this.big || this._forcedBig) ? 'true' : 'false');
      if (this._forcedBig) {
        big.disabled = true;
        big.title = api.t('noVoiceBig');
      } else {
        big.addEventListener('click', function () {
          self.big = !self.big; self.api.settings.big = self.big; self._paint();
        });
      }
      bar.appendChild(big);

      if (this.picking) bar.appendChild(this._buildChooser());
      if (this._forcedBig) {
        var note = api.el('div', 'hlb-note'); note.textContent = api.t('noVoiceBig');
        bar.appendChild(note);
      }
    },

    _buildChooser: function () {
      var self = this, api = this.api;
      var box = api.el('div', 'hlb-chooser');
      box.setAttribute('role', 'group');
      box.setAttribute('aria-label', api.t('addHome'));
      var hint = api.el('div', 'hlb-hint'); hint.textContent = api.t('homeHint');
      box.appendChild(hint);
      var grid = api.el('div', 'hlb-langgrid');
      var mk = function (loc, label) {
        var b = api.el('button', 'hlb-lang' + ((self._store.home === loc) ? ' hlb-on' : '')); b.type = 'button';
        b.textContent = label;
        b.setAttribute('role', 'radio');
        b.setAttribute('aria-checked', (self._store.home === loc) ? 'true' : 'false');
        if (loc) b.setAttribute('lang', loc);
        b.addEventListener('click', function () {
          self._store.home = loc; self.picking = false; self._paint();
        });
        grid.appendChild(b);
      };
      mk(null, api.t('noHome'));
      for (var i = 0; i < MODEL.LOCALES.length; i++) {
        var loc = MODEL.LOCALES[i];
        if (loc === this.classroom) continue;
        mk(loc, ENDONYM[loc]);
      }
      grid.setAttribute('role', 'radiogroup');
      box.appendChild(grid);
      return box;
    },

    _paintTabs: function () {
      var self = this, api = this.api, host = this._tabs;
      host.innerHTML = '';
      host.setAttribute('role', 'tablist');
      var cats = this.categoriesFor(this.classroom);
      var mine = (this._store.custom || []).length;
      for (var i = 0; i < cats.length; i++) {
        (function (c) {
          var on = self.cat === c.id;
          var b = api.el('button', 'hlb-tab' + (on ? ' hlb-on' : '')); b.type = 'button';
          b.setAttribute('role', 'tab');
          b.setAttribute('data-fk', 'tab-' + c.id);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
          /* ⚠ THE SELECTED TAB IS NOT A CONTROL. Tapping the group you
             are already looking at can do nothing by definition, and a
             control that can do nothing is furniture wearing a button's
             clothes — the shared liveness gate scored it DEAD in all
             three entitlement states, correctly. It is disabled AT FULL
             CONTRAST: opacity is the universal *unavailable* signal and
             would say the wrong thing about the group a child is
             currently in. */
          if (on) b.disabled = true;
          /* ⚠ AN ICON AS WELL AS A WORD. The child who needs this board
             cannot read the tab. */
          b.appendChild(iconSVG(c.icon, 'hlb-tabicon'));
          var t = api.el('span'); t.textContent = api.t('cat' + c.id.charAt(0).toUpperCase() + c.id.slice(1));
          b.appendChild(t);
          b.addEventListener('click', function () { self.cat = c.id; self._paint(); });
          host.appendChild(b);
        }(cats[i]));
      }
      if (mine) {
        var b2 = api.el('button', 'hlb-tab' + (this.cat === 'mine' ? ' hlb-on' : '')); b2.type = 'button';
        b2.setAttribute('role', 'tab'); b2.setAttribute('data-fk', 'tab-mine');
        b2.setAttribute('aria-selected', this.cat === 'mine' ? 'true' : 'false');
        b2.appendChild(iconSVG('saybubble', 'hlb-tabicon'));
        var t2 = api.el('span'); t2.textContent = api.t('catMine');
        b2.appendChild(t2);
        b2.addEventListener('click', function () { self.cat = 'mine'; self._paint(); });
        host.appendChild(b2);
      }
    },

    _paintRail: function () {
      var host = this._rail;
      host.innerHTML = '';
      host.setAttribute('role', 'group');
      host.setAttribute('aria-label', this.api.t('title'));
      for (var i = 0; i < CORE.length; i++) {
        var card = MODEL.cardFor(CORE[i].id, this.classroom, this._store.home);
        if (card) host.appendChild(this._cardEl(card, true));
      }
    },

    _paintBoard: function () {
      var host = this._board;
      host.innerHTML = '';
      host.setAttribute('role', 'group');
      var cats = this.categoriesFor(this.classroom);
      var ok = false, i;
      for (i = 0; i < cats.length; i++) if (cats[i].id === this.cat) ok = true;
      if (this.cat === 'mine') ok = true;
      if (!ok) this.cat = cats[0].id;

      var list;
      if (this.cat === 'mine') {
        list = [];
        var mine = (this._store.custom || []);
        for (i = 0; i < mine.length; i++) {
          var c = MODEL.cardFor(mine[i].id, this.classroom, this._store.home, mine[i]);
          if (c) { c.custom = mine[i]; list.push(c); }
        }
      } else {
        list = MODEL.boardFor(this._store, this.classroom, this.cat);
        list = list.filter(function (c) { return !c.core; });
      }
      /* the un-kept phrase the teacher put on the board — see the note
         beside the "put it on the board" handler. It is transient by
         design: it is not in `_store.custom`, so it does not survive a
         reload, which is exactly the line between free and kept. */
      if (this.preview && this.preview.cat === this.cat) {
        var pv = MODEL.cardFor(this.preview.id, this.classroom, this._store.home, this.preview);
        if (pv) { pv.custom = this.preview; list.push(pv); }
      }
      for (i = 0; i < list.length; i++) host.appendChild(this._cardEl(list[i], false));
    },

    _cardEl: function (card, isCore) {
      var self = this, api = this.api;
      var b = api.el('button', 'hlb-card' + (isCore ? ' hlb-core' : '') + (card.custom ? ' hlb-mine' : ''));
      b.type = 'button';
      b.setAttribute('data-fk', 'card-' + card.id);
      b.setAttribute('data-id', card.id);
      b.appendChild(iconSVG(card.icon, 'hlb-icon'));

      var text = this.textOf(card);
      /* ⚠ ONE TEXT CLASS FOR BOTH LINES — identical size, weight and
         colour, so neither language can become the secondary one. Home
         first, always. */
      if (card.home) {
        var h = api.el('span', 'hlb-text'); h.textContent = card.home;
        h.setAttribute('lang', this._store.home); b.appendChild(h);
      }
      if (text) {
        var t = api.el('span', 'hlb-text'); t.textContent = text;
        t.setAttribute('lang', this.classroom); b.appendChild(t);
      }

      /* ⚠ THE LABEL CARRIES BOTH LINES. The v2 build set aria-label to
         the classroom line alone, and an aria-label OVERRIDES inner
         text — so a screen-reader user got only one of the two
         languages although both rendered, on a board whose doctrine
         says the home language is never smaller or bracketed. For
         assistive technology it was absent. */
      var label = (card.home ? card.home + ', ' : '') + (text || '');
      b.setAttribute('aria-label', label + ' — ' + api.t(card.showOnly ? 'showBig' : 'sayAloud'));

      b.addEventListener('click', function () { self._tapCard(card, b); });
      return b;
    },

    /* ⭐ A TAP ALWAYS HAS A VISIBLE CONSEQUENCE, EVEN WITH THE SOUND OFF.
       The v2 build's only response to a tap was `:active{translateY(1px)}`
       — 1px, gone on pointerup, invisible at projector distance — and
       `_say` returned early whenever the voice toggle was off or the
       device had no voice. Schools mute tablets. A newcomer tapped
       "I need the toilet" and NOTHING WHATSOEVER HAPPENED.
       ⚠ And the shared liveness gate would still have scored that LIVE,
       because its change-signature includes window.__spoken and the
       default is voice-on: the gate was satisfied by the one path that
       happened to work and was structurally blind to the muted one. */
    _tapCard: function (card, el) {
      var self = this;
      var text = this.textOf(card);

      /* the dignity cards are SHOWN, not said. A child who has wet
         themselves does not want thirty classmates to hear it, and a
         board that broadcasts it is abandoned by the child who needs it
         most. */
      if (card.showOnly || this.big || this._forcedBig) {
        this.lifted = card;
        this._paint();
        return;
      }

      var said = card.speakable && this._say(text, this.classroom);
      if (text) this.api.announce(text);

      /* the lift: the card grows and its icon's own stroke thickens, so
         a voice is made visible as a thickening line ON THE PICTURE —
         legible from the back of a room and impossible to read as a
         mark. ⚠ The duration is an ESTIMATE: LCSAudio swallows the
         utterance handle and returns nothing, and this tool writes zero
         lines to protected core. The gate asserts the lift appears and
         clears, never that it matches the audio.

         ⚠⚠ THE LIFT LIVES IN THE MODEL, NOT ONLY IN THE DOM, AND
         PRODUCTION IS WHERE I FOUND OUT WHY. Locally the class was set
         straight on the element and it worked every time. On the live
         site it failed in nine locales out of eleven, intermittently —
         because real Chrome loads its voices ASYNCHRONOUSLY, the
         `voiceschanged` listener fires, and the repaint it triggers
         rebuilt every card and threw away the confirmation a child was
         at that moment looking at. Any repaint would have done it: an
         entitlement resolving, a settings toggle, a resize.
         Transient view state that only exists in the DOM is state that
         the next paint silently deletes. */
      this._said = { id: card.id, until: Date.now() + (said ? MODEL.speakMs(text) : 1200) };
      this._applySaid();
      var self2 = this;
      this._after(this._said.until - Date.now(), function () {
        self2._said = null;
        self2._applySaid();
      });

      /* a card we cannot say in the language asked for is shown instead
         — never silent AND still. */
      if (!said && !this.api.settings.voice) return;
      if (!said) { this.lifted = card; this._paint(); }
    },

    /* re-applied on EVERY paint, from `this._said`, so a repaint cannot
       lose it. Idempotent: it clears whatever was lifted before. */
    _applySaid: function () {
      if (!this._wrap) return;
      var all = this._wrap.querySelectorAll('.hlb-said');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('hlb-said');
      if (!this._said || Date.now() >= this._said.until) { this._said = null; return; }
      var el = this._wrap.querySelector('.hlb-card[data-id="' + this._said.id + '"]');
      if (el) el.classList.add('hlb-said');
    },

    _paintFoot: function () {
      var self = this, api = this.api, foot = this._foot;
      foot.innerHTML = '';

      var teach = api.el('button', 'hlb-chip'); teach.type = 'button';
      teach.setAttribute('data-fk', 'teacher');
      teach.textContent = api.t('teacherKey');
      teach.addEventListener('click', function () {
        /* ⭐ TIME-BOXED, NOT A TOGGLE. A toggle gets left on; a window
           closes itself, so the board a child picks up is always the
           child's board. No password — the threat model is a
           six-year-old tapping things. */
        self._teacherUntil = Date.now() + self.TEACHER_MS;
        self.desk = true; self.notice = null;
        self._paint();
      });
      foot.appendChild(teach);

      /* ⭐ THREE SHEETS, THREE JOBS — and the gate is what found that I
         had authored all three names and wired only one. A dead string
         is usually a typo; here it was a missing feature, in the copy's
         own words, sitting in eleven locales.
           A · lanyard cards — FREE. The board is free because it is a
               care surface, and this IS the board on paper for the
               child with no device at break. Gating it gates the
               child's voice.
           B · the wall poster — paid. ⚠ It carries no child's name: a
               poster naming the newcomer marks them, and an unnamed one
               gets used by four children in the first week.
           C · the family sheet — paid, and offered ONLY when a home
               language is set, because without one it would be a
               monolingual word list, i.e. the thing this tool refuses
               to be. */
      var sheets = [['cards', 'sheetCards', false], ['wall', 'sheetWall', true], ['home', 'sheetHome', true]];
      for (var i = 0; i < sheets.length; i++) {
        (function (kind, key, paid) {
          if (kind === 'home' && !self._store.home) return;
          var b = api.el('button', 'hlb-chip' + (paid && !self.premium ? ' hlb-locked' : ''));
          b.type = 'button';
          b.setAttribute('data-fk', 'print-' + kind);
          b.textContent = api.t('printBtn') + ' · ' + api.t(key);
          b.addEventListener('click', function () { self._print(kind); });
          foot.appendChild(b);
        }(sheets[i][0], sheets[i][1], sheets[i][2]));
      }

      var pv = api.el('div', 'hlb-privacy'); pv.textContent = api.t('privacy');
      foot.appendChild(pv);
    },

    /* ---------------- the hold-this-up view ---------------- */
    _paintBig: function () {
      var self = this, api = this.api, host = this._bigEl;
      host.innerHTML = '';
      if (!this.lifted) { host.classList.remove('hlb-open'); return; }
      host.classList.add('hlb-open');
      /* ⚠ role="status", NOT dialog and NOT aria-modal: a dialog traps
         focus, and on a switch scanner a focus trap is a jail. */
      host.setAttribute('role', 'status');

      var card = this.lifted;
      var text = this.textOf(card);
      var inner = api.el('div', 'hlb-bigin');
      inner.appendChild(iconSVG(card.icon, 'hlb-bigicon'));
      if (card.home) {
        var h = api.el('div', 'hlb-bigtext'); h.textContent = card.home;
        h.setAttribute('lang', this._store.home); inner.appendChild(h);
      }
      if (text) {
        var t = api.el('div', 'hlb-bigtext'); t.textContent = text;
        t.setAttribute('lang', this.classroom); inner.appendChild(t);
      }

      var row = api.el('div', 'hlb-bigrow');
      if (card.speakable && this._canSpeak(this.classroom)) {
        var say = api.el('button', 'hlb-bigbtn'); say.type = 'button';
        say.setAttribute('data-fk', 'bigsay');
        say.textContent = api.t('sayAloud');
        say.addEventListener('click', function (e) {
          e.stopPropagation();
          self._say(text, self.classroom);
          if (text) api.announce(text);
        });
        row.appendChild(say);
      }
      /* ⭐ THE CHILD'S PRIVATE CONFIRMATION CHANNEL. The ROOM hears the
         classroom language; the CHILD hears their own. This is the only
         way a child who reads neither line can confirm they pressed the
         right card. ⚠ Not rendered at all when the device has no voice
         for it — never a dead control. */
      if (card.home && this._store.home && this._canSpeak(this._store.home)) {
        var mine = api.el('button', 'hlb-bigbtn hlb-bigmine'); mine.type = 'button';
        mine.setAttribute('data-fk', 'bigmine');
        mine.textContent = api.t('sayInHome');
        mine.setAttribute('lang', this._store.home);
        mine.addEventListener('click', function (e) {
          e.stopPropagation();
          self._say(card.home, self._store.home);
        });
        row.appendChild(mine);
      } else if (card.home && this._store.home) {
        var nv = api.el('div', 'hlb-bignote'); nv.textContent = api.t('noVoiceHome');
        row.appendChild(nv);
      }
      inner.appendChild(row);

      var hint = api.el('div', 'hlb-bighint'); hint.textContent = api.t('bigHint');
      inner.appendChild(hint);
      host.appendChild(inner);

      /* ⚠ EVERY PIXEL DISMISSES IT. A stressed five-year-old's recovery
         gesture is to tap the screen again, and it must always work.
         No corner close button: children do not look in corners. */
      host.addEventListener('click', function () { self.lifted = null; self._paint(); });
      this._after(10000, function () { if (self.lifted === card) { self.lifted = null; self._paint(); } });
    },

    /* ---------------- the teacher desk ---------------- */
    _paintDesk: function () {
      var self = this, api = this.api, host = this._deskEl;
      host.innerHTML = '';
      if (!this.desk) { host.classList.remove('hlb-open'); return; }
      if (Date.now() > this._teacherUntil) { this.desk = false; host.classList.remove('hlb-open'); return; }
      host.classList.add('hlb-open');
      document.body.classList.add('hlb-desking');

      var h = api.el('h2', 'hlb-desktitle'); h.textContent = api.t('deskTitle');
      var hint = api.el('p', 'hlb-deskhint'); hint.textContent = api.t('deskHint');
      host.append(h, hint);

      var d = this.draft || (this.draft = { starter: 'need', body: '', icon: '', cat: this.cat === 'mine' ? CATEGORIES[0].id : this.cat, home: '' });

      /* the starters — fixed, natively authored, not editable */
      var srow = api.el('div', 'hlb-starters');
      srow.setAttribute('role', 'radiogroup');
      for (var i = 0; i < STARTERS.length; i++) {
        (function (s) {
          var b = api.el('button', 'hlb-starter' + (d.starter === s ? ' hlb-on' : '')); b.type = 'button';
          b.setAttribute('role', 'radio');
          b.setAttribute('aria-checked', d.starter === s ? 'true' : 'false');
          b.setAttribute('data-fk', 'starter-' + s);
          var pat = (STARTER_TEXT[s] && (STARTER_TEXT[s][self.classroom] || STARTER_TEXT[s].en)) || '{x}';
          b.textContent = pat.replace('{x}', '…');
          b.addEventListener('click', function () { d.starter = s; self.notice = null; self._paint(); });
          srow.appendChild(b);
        }(STARTERS[i]));
      }
      host.appendChild(srow);

      /* ⚠ NO maxLength ATTRIBUTE. our-day.js:1977-1979 records why: a
         cap the user physically cannot exceed makes the "too long"
         message a DEAD STRING, and a silent truncation is worse than
         being told. Validate on submit, refuse with the number. */
      var ta = api.el('textarea', 'hlb-input');
      ta.rows = 2; ta.value = d.body;
      ta.setAttribute('data-fk', 'body');
      ta.setAttribute('aria-label', api.t('deskTitle'));
      ta.addEventListener('input', function () {
        d.body = ta.value;
        counter.textContent = ta.value.length >= MODEL.MAX_COMPLETION - 6
          ? ta.value.length + '/' + MODEL.MAX_COMPLETION : '';
      });
      host.appendChild(ta);
      /* the worked example for the SELECTED starter — three real
         completions in the teacher's own language, which is the only
         thing that shows her the shape of the slot. */
      var eg = api.el('div', 'hlb-deskwhy hlb-eg');
      var egT = STARTER_EG[d.starter];
      eg.textContent = (egT && (egT[this.classroom] || egT.en)) || '';
      host.appendChild(eg);
      var counter = api.el('div', 'hlb-counter');
      host.appendChild(counter);

      host.appendChild(this._iconPicker(d));

      /* which group */
      var cl = api.el('div', 'hlb-deskrow'); cl.textContent = api.t('pickCat');
      host.appendChild(cl);
      var crow = api.el('div', 'hlb-starters');
      /* ⚠ ONLY THE GROUPS THIS LOCALE RENDERS. The desk looped over
         every category, so a teacher could file her phrase into a tab
         that does not exist in her language — it vanished. */
      var deskCats = this.categoriesFor(this.classroom);
      if (!this.M.isCategory(d.cat) || deskCats.map(function (c) { return c.id; }).indexOf(d.cat) < 0) d.cat = deskCats[0].id;
      for (var j = 0; j < deskCats.length; j++) {
        (function (c) {
          var b = api.el('button', 'hlb-starter' + (d.cat === c.id ? ' hlb-on' : '')); b.type = 'button';
          b.setAttribute('data-fk', 'cat-' + c.id);
          b.textContent = api.t('cat' + c.id.charAt(0).toUpperCase() + c.id.slice(1));
          b.addEventListener('click', function () { d.cat = c.id; self._paint(); });
          crow.appendChild(b);
        }(deskCats[j]));
      }
      host.appendChild(crow);

      /* the home line, only when a home language is set */
      if (this._store.home) {
        var hl = api.el('div', 'hlb-deskrow'); hl.textContent = api.t('homeLine');
        var hw = api.el('div', 'hlb-deskwhy'); hw.textContent = api.t('homeLineWhy');
        var hi = api.el('input', 'hlb-input'); hi.type = 'text'; hi.value = d.home || '';
        hi.setAttribute('data-fk', 'homeline');
        hi.setAttribute('lang', this._store.home);
        hi.setAttribute('aria-label', api.t('homeLine'));
        hi.addEventListener('input', function () { d.home = hi.value; });
        host.append(hl, hw, hi);
      }

      if (this.notice) {
        var n = api.el('div', 'hlb-notice');
        n.setAttribute('role', 'alert');
        n.textContent = this._t(this.notice.key, this.notice.args);
        host.appendChild(n);
      }

      /* ⭐ TWO EXITS, and this is the honest shape. Writing a phrase is
         free. Putting it on the board in front of the class is free.
         Having it there tomorrow is the plan. Both buttons REFUSE with
         a reason rather than sitting mute — a disabled button explains
         nothing, and two controls with the same precondition once
         disagreed about how to say no. */
      var row = api.el('div', 'hlb-deskbtns');

      var show = api.el('button', 'hlb-btn hlb-ghost'); show.type = 'button';
      show.setAttribute('data-fk', 'showboard');
      show.textContent = api.t('showOnBoard');
      /* ⚠⚠ THIS BUTTON DID NOT DO WHAT ITS LABEL SAYS, IN ELEVEN
         LANGUAGES, and TWO native panels found it independently by
         reading the model rather than the copy. It set `lifted` — a
         one-shot hold-up overlay that the next tap discards — and never
         touched the board, while `gateKeep` sells the free tier on
         "writing them and using them is always free". "Using" meant one
         overlay that vanished.
         It now puts the phrase ON THE BOARD, for real, until the
         teacher replaces it or resets. That is the free tier the copy
         describes: make it, use it in front of the class, and only
         KEEPING it past three is the plan. */
      show.addEventListener('click', function () {
        var v = MODEL.validate(d, self._store.custom, false);
        if (!v.ok) { self.notice = { key: v.why, args: { n: v.n } }; self._paint(); return; }
        self.notice = null;
        self.preview = { id: 'my:preview', icon: d.icon, starter: d.starter, body: v.body,
                         cat: d.cat, home: MODEL.cleanText(d.home) };
        self._noteRecent(d.icon);
        self.cat = d.cat;
        self.desk = false;
        self._paint();
      });
      row.appendChild(show);

      var canKeep = MODEL.canKeep(this._store, this.premium && this.premiumKnown);
      var keep = api.el('button', 'hlb-btn' + (canKeep ? '' : ' hlb-locked')); keep.type = 'button';
      keep.setAttribute('data-fk', 'keep');
      keep.textContent = api.t('keepPhrase');
      keep.addEventListener('click', function () {
        var v = MODEL.validate(d, self._store.custom, true);
        if (!v.ok) { self.notice = { key: v.why, args: { n: v.n } }; self._paint(); return; }
        if (!MODEL.canKeep(self._store, self.premium && self.premiumKnown)) {
          /* ⚠ IN THE MODEL, NOT STRAIGHT INTO THE DOM. Appended
             directly it was deleted by the next repaint — an
             entitlement resolving, voiceschanged, a settings toggle —
             which is the SAME defect already recorded and fixed for the
             tap confirmation forty lines up, left unfixed here. */
          self.gate = { key: 'gateKeep', args: { n: MODEL.FREE_CUSTOM } };
          self._paint();
          return;
        }
        self._store.seq++;
        self._store.custom.push({
          id: MODEL.newCustomId(d.cat, self._store.seq), starter: d.starter, body: v.body,
          icon: d.icon, cat: d.cat, home: MODEL.cleanText(d.home)
        });
        self._noteRecent(d.icon);
        self.draft = null; self.notice = null;
        self._save(); self._paint();
      });
      row.appendChild(keep);

      var close = api.el('button', 'hlb-btn hlb-ghost'); close.type = 'button';
      close.setAttribute('data-fk', 'closedesk');
      close.textContent = api.t('closeDesk');
      close.addEventListener('click', function () {
        self.desk = false; document.body.classList.remove('hlb-desking'); self._paint();
      });
      row.appendChild(close);
      host.appendChild(row);

      var kept = api.el('div', 'hlb-kept');
      kept.textContent = this._t('kept', { n: (this._store.custom || []).length, max: this.premium ? MODEL.MAX_CUSTOM : MODEL.FREE_CUSTOM });
      host.appendChild(kept);

      if (this.gate) this._gateLine(host, this.gate.key, this.gate.args);
      host.appendChild(this._mineList());

      /* the window closes itself */
      var left = this._teacherUntil - Date.now();
      if (left > 0) this._after(left, function () { self.desk = false; self._paint(); });
    },

    /* ⭐ NOT SIXTY-TWO CELLS, AND NO SEARCH FIELD. `our-day.js:1175-1177`
       records the finding this borrows: "a teacher's day is the same
       10-14 cards, and the catalogue is a long tail. This is what
       actually buys the thirty seconds, far more than any grid does."
       She is picking a PICTURE and does not know what we called it, so
       text search over icon ids is a trap.
       ⚠ AND THIS RECENCY LIST IS NOT A USAGE LOG. It records which
       icons an ADULT picked while authoring, in the adult surface. The
       refuse-listed counter is which cards a CHILD pressed. Nothing
       here is keyed by phrase id. */
    _iconPicker: function (d) {
      var self = this, api = this.api;
      var box = api.el('div', 'hlb-picker');
      var lbl = api.el('div', 'hlb-deskrow'); lbl.textContent = api.t('pickIcon');
      box.appendChild(lbl);

      var recent = (this._store.recent || []).slice(0);
      for (var i = 0; i < BLANK_ICONS.length && recent.length < 8; i++) {
        if (recent.indexOf(BLANK_ICONS[i]) < 0) recent.push(BLANK_ICONS[i]);
      }
      var rl = api.el('div', 'hlb-deskwhy'); rl.textContent = api.t('iconRecent');
      box.appendChild(rl);
      var row = api.el('div', 'hlb-iconrow');
      var add = function (name) {
        var b = api.el('button', 'hlb-iconbtn' + (d.icon === name ? ' hlb-on' : '')); b.type = 'button';
        b.setAttribute('data-fk', 'icon-' + name);
        b.setAttribute('aria-pressed', d.icon === name ? 'true' : 'false');
        b.setAttribute('aria-label', name);
        b.appendChild(iconSVG(name, 'hlb-pickicon'));
        b.addEventListener('click', function () { d.icon = name; self.notice = null; self._paint(); });
        return b;
      };
      for (var r = 0; r < recent.length; r++) row.appendChild(add(recent[r]));
      box.appendChild(row);

      var more = api.el('button', 'hlb-link'); more.type = 'button';
      more.setAttribute('data-fk', 'iconall');
      more.textContent = api.t('iconAll');
      more.setAttribute('aria-expanded', this._allIcons ? 'true' : 'false');
      more.addEventListener('click', function () { self._allIcons = !self._allIcons; self._paint(); });
      box.appendChild(more);

      if (this._allIcons) {
        var all = api.el('div', 'hlb-icongrid');
        var keys = Object.keys(ICONS);
        for (var k = 0; k < keys.length; k++) all.appendChild(add(keys[k]));
        box.appendChild(all);
      }
      return box;
    },

    _noteRecent: function (name) {
      if (!name || !ICONS[name]) return;
      var r = this._store.recent || (this._store.recent = []);
      var at = r.indexOf(name);
      if (at >= 0) r.splice(at, 1);
      r.unshift(name);
      while (r.length > 8) r.pop();
    },

    _mineList: function () {
      var self = this, api = this.api;
      var box = api.el('div', 'hlb-minelist');
      var list = this._store.custom || [];
      for (var i = 0; i < list.length; i++) {
        (function (c) {
          var row = api.el('div', 'hlb-minerow');
          row.appendChild(iconSVG(c.icon, 'hlb-minicon'));
          var t = api.el('span', 'hlb-minetext');
          t.textContent = self.composeCustom(c, self.classroom);
          row.appendChild(t);
          var rm = api.el('button', 'hlb-link'); rm.type = 'button';
          rm.setAttribute('data-fk', 'rm-' + c.id);
          rm.textContent = api.t('removePhrase');
          rm.addEventListener('click', function () {
            /* the destructive action is the quiet one, and it is
               undoable: a two-step confirm survives the teacher not
               looking far worse than an undo chip does. */
            self._store.custom = self._store.custom.filter(function (x) { return x.id !== c.id; });
            self.trash = c;
            self._save(); self._paint();
          });
          row.appendChild(rm);
          box.appendChild(row);
        }(list[i]));
      }
      if (this.trash) {
        var u = api.el('button', 'hlb-btn hlb-ghost'); u.type = 'button';
        u.setAttribute('data-fk', 'undo');
        u.textContent = api.t('undo');
        u.addEventListener('click', function () {
          if (!self.trash) return;
          self._store.custom.push(self.trash); self.trash = null;
          self._save(); self._paint();
        });
        box.appendChild(u);
        this._after(this.UNDO_MS, function () { if (self.trash) { self.trash = null; if (self._wrap) self._paint(); } });
      }
      return box;
    },

    /* ⚠ TWO NODES, NEVER A CONCATENATION, and it persists until the
       teacher closes it. The v2 build removed its gate after twelve
       seconds with no close control, so a teacher's only two states
       were "wait" and "gone".
       ⛔ AND IT MAY NEVER RENDER ON THE CHILD-FACING BOARD. The host is
       always the desk. */
    _gateLine: function (host, key, args) {
      var api = this.api;
      var old = host.querySelector('.hlb-gate');
      if (old) old.remove();
      var g = api.el('div', 'hlb-gate');
      var s = api.el('span', '');
      s.textContent = this._t(key, args);
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-home-language-bridge';
      a.target = '_top'; a.rel = 'noopener';
      a.setAttribute('data-fk', 'unlock');
      a.textContent = api.t('unlock');
      var x = api.el('button', 'hlb-link'); x.type = 'button';
      /* ⚠ its own string. It used to reuse `closeDesk` — "back to the
         board" — on a control that removes a message and goes nowhere,
         in eleven languages. */
      x.textContent = api.t('notNow');
      var self = this;
      x.addEventListener('click', function () { self.gate = null; g.remove(); });
      g.append(s, a, x);
      host.appendChild(g);
      api.track('gate', { key: key });
    },

    /* ---------------- print ---------------- */
    /* ⚠ DOUBLE-LOCKED, and the free path prints something REAL.
       The v2 build built the sheet only when entitled but hid every
       screen element unconditionally, so A FREE TEACHER PRESSING Ctrl+P
       GOT A BLANK PAGE. Here the lanyard cards are FREE — the board is
       free because it is a care surface, and the lanyard card IS the
       board on paper for the child with no device at break; gating it
       would gate the child's voice. The poster and the family sheet are
       the plan. Every print rule is scoped to a body class so a free
       Ctrl+P yields a normal page, and the shell is reset explicitly
       because lcs-shell.css ships no @media print block at all. */
    _print: function (kind) {
      /* ⚠⚠ THE GATE OPENS THE DESK; IT NEVER RENDERS ON THE BOARD.
         `_gateLine`'s own comment says "it may never render on the
         child-facing board — the host is always the desk", and this
         line passed it `this._foot`, which is on the board and is
         hidden only while desking. A pricing link with target="_top"
         sat under a newcomer's cards. TWO native panels found it.
         ⚠ And my own local test asserted "the gate NEVER renders on the
         child-facing board" while checking only .hlb-board, .hlb-rail
         and .hlb-big — the hole was exactly where the defect was. */
      if (kind !== 'cards' && !(this.premium && this.premiumKnown)) {
        this._teacherUntil = Date.now() + this.TEACHER_MS;
        this.desk = true;
        this.notice = null;
        this.gate = { key: 'gatePrint' };
        this._paint();
        return;
      }
      this._sheetKind = kind;
      this._buildSheet();
      this.api.track('print', { sheet: kind });
      try { window.print(); } catch (e) {}
    },

    _buildSheet: function () {
      var api = this.api, sheet = this._sheet;
      if (!sheet) return;
      sheet.innerHTML = '';
      var kind = this._sheetKind || 'cards';
      if (kind !== 'cards' && !this.premium) kind = 'cards';
      sheet.setAttribute('data-sheet', kind);

      var cards = [], i;
      for (i = 0; i < CORE.length; i++) {
        var c = MODEL.cardFor(CORE[i].id, this.classroom, this._store.home);
        if (c) cards.push(c);
      }
      var extra = MODEL.boardFor(this._store, this.classroom, this.cat === 'mine' ? CATEGORIES[0].id : this.cat);
      for (i = 0; i < extra.length && cards.length < 12; i++) if (!extra[i].core) cards.push(extra[i]);

      /* the NAME LINE, and it is deliberately absent from the poster.
         ⚠ TWO NATIVE PANELS FOUND THIS INDEPENDENTLY by reading the
         model: the head was appended for EVERY sheet kind, so the paid
         wall poster printed "Name: ____" — while the comment that
         justifies that poster says, four hundred lines above, "it
         carries no child's name: a poster naming the newcomer marks
         them". The artefact did the documented harm. A lanyard card is
         one child's, so it gets the line; a poster on the wall belongs
         to the room, so it does not. */
      if (kind !== 'wall') {
        var head = api.el('div', 'hlb-p-head');
        var nm = api.el('span', 'hlb-p-name'); nm.textContent = api.t('printName') + ': ';
        var rule = api.el('span', 'hlb-p-rule');
        head.append(nm, rule);
        sheet.appendChild(head);
      }

      var grid = api.el('div', 'hlb-p-grid');
      for (i = 0; i < cards.length; i++) {
        var card = cards[i];
        var cell = api.el('div', 'hlb-p-card');
        /* ⭐ THE PICTURE IS ON THE PAPER. The v2 print sheet emitted two
           columns of TEXT and zero icons — measured: not one call to the
           icon builder in the whole function. The entire thesis is that
           the drawing carries the meaning for a child who cannot read,
           and the object that child carried to the playground was two
           columns of words in two languages they could read neither of.
           It became the bilingual word list its own header says it
           refused to be, the moment it hit paper. */
        cell.appendChild(iconSVG(card.icon, 'hlb-p-icon'));
        if (card.home) {
          var a = api.el('div', 'hlb-p-text'); a.textContent = card.home;
          a.setAttribute('lang', this._store.home); cell.appendChild(a);
        }
        var txt = this.textOf(card);
        if (txt) {
          var b = api.el('div', 'hlb-p-text'); b.textContent = txt;
          b.setAttribute('lang', this.classroom); cell.appendChild(b);
        }
        grid.appendChild(cell);
      }
      sheet.appendChild(grid);

      /* the family sheet goes BOTH ways: blank rows so the family
         writes back the words their child uses at home. A handout goes
         one way and is why every competitor's version is thrown away. */
      if (kind === 'home') {
        var back = api.el('div', 'hlb-p-back');
        back.textContent = api.t('printBack');
        sheet.appendChild(back);
        var rows = api.el('div', 'hlb-p-rows');
        for (i = 0; i < 6; i++) rows.appendChild(api.el('div', 'hlb-p-row'));
        sheet.appendChild(rows);
      }
    }
  };

  /* ⚠ FRAGMENTS, NOT A BARE `d`. The v2 `_icon` set one path's `d`
     attribute from a single-path table; these are multi-node drawings.
     ⚠ AND AN UNKNOWN ID IS A BUILD FAILURE, NOT A FALLBACK. The v2
     build fell back to ICONS.hand for any unknown name — so a typo
     rendered the HELP card's picture, and on a communication board a
     wrong icon is a wrong utterance. `saybubble` is the honest default
     for a TEACHER's phrase that has no picture yet; it is never a
     silent substitute for a curated card. */
  function iconSVG(name, cls) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', cls || 'hlb-icon');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = ICONS[name] || ICONS.saybubble;
    return svg;
  }

  /* the print-sheet and liveness gates discover a tool by looking for a
     window-reachable object carrying id + STORE_KEY + a writable
     `premium`; the Node gates require the CommonJS export. */
  if (typeof window !== 'undefined') window.HomeLanguageBridge = SayItBoard;
  if (typeof module !== 'undefined' && module.exports) module.exports = SayItBoard;

  function injectSayItCSS() {
    if (document.getElementById('hlb-style')) return;
    var st = document.createElement('style');
    st.id = 'hlb-style';
    st.textContent = ''

      /* ⚠⚠ CONTAINER QUERIES, NOT MEDIA QUERIES, AND THAT IS THE WHOLE
         LAYOUT DECISION. Media queries inside an iframe resolve against
         THE IFRAME, and the tool page pins this one at about 704px at
         1440, 1920 and 2560 alike. The v2 build carried three tiers
         keyed `(min-width:1367px)` — every one of them DEAD for every
         desktop teacher who ever opened it, while looking perfectly
         correct standalone, which is where it was tested. A container
         query resolves against the element and therefore behaves
         identically embedded and standalone. */
      + '.hlb-wrap{container-type:inline-size;container-name:hlb;'
      +   'display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
      + 'body.hlb-page .lcs-app{max-width:min(1180px,94vw);}'

      /* the language bar */
      + '.hlb-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;width:100%;}'
      + '.hlb-room{display:flex;align-items:baseline;gap:6px;}'
      + '.hlb-roomlbl{font:400 14px Nunito,system-ui,sans-serif;color:#6B6558;}'
      + '.hlb-roomval{font:600 18px "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;}'
      + '.hlb-chip{min-height:44px;padding:8px 15px;border-radius:999px;border:1.5px solid rgba(20,107,94,.3);'
      +   'background:#FFFDF7;color:#3C7C72;font:400 14px Nunito,system-ui,sans-serif;cursor:pointer;}'
      + '.hlb-chip:hover{background:#F3EADA;}'
      + '.hlb-chip.hlb-on{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
      + '.hlb-chip[disabled]{cursor:default;opacity:1;border-style:dashed;}'
      + '.hlb-note{flex-basis:100%;font:400 14px Nunito,system-ui,sans-serif;color:#6B6558;text-align:center;max-width:56ch;margin:0 auto;}'

      + '.hlb-chooser{flex-basis:100%;display:flex;flex-direction:column;align-items:center;gap:8px;'
      +   'padding:12px;border-radius:16px;background:#FFFDF7;border:2px solid rgba(20,107,94,.18);}'
      + '.hlb-hint{font:400 14px Nunito,system-ui,sans-serif;color:#3C7C72;text-align:center;max-width:52ch;}'
      + '.hlb-langgrid{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}'
      + '.hlb-lang{min-height:44px;padding:9px 15px;border-radius:12px;border:2px solid rgba(20,107,94,.3);'
      +   'background:#FBF3E4;color:#146B5E;font:400 15px Nunito,system-ui,sans-serif;cursor:pointer;}'
      + '.hlb-lang.hlb-on{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'

      /* ⚠ THE TABS WRAP AND ALL OF THEM ARE VISIBLE. A horizontally
         scrolling strip was refused: off-screen categories do not exist
         to a five-year-old, and `justify-content:center` on an
         overflowing row puts the first item beyond any scroll. */
      + '.hlb-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;width:100%;}'
      + '.hlb-tab{display:flex;align-items:center;gap:6px;min-height:44px;padding:7px 13px;border-radius:999px;'
      +   'border:1.5px solid rgba(20,107,94,.25);background:#FFFDF7;color:#3C7C72;'
      +   'font:400 14px Nunito,system-ui,sans-serif;cursor:pointer;}'
      /* full contrast, and NOT the browser's disabled grey — see the
         note beside `b.disabled` in _paintTabs. */
      + '.hlb-tab.hlb-on{background:#146B5E;border-color:#146B5E;color:#FFFDF7;'
      +   'opacity:1;cursor:default;}'
      + '.hlb-tabicon{width:22px;height:22px;flex:0 0 auto;}'
      + '.hlb-tab.hlb-on .hlb-tabicon{filter:brightness(0) invert(1);}'

      /* ⭐ THE CORE RAIL — always four across, always the same eight
         cards, in the same places, whatever the category. Motor
         planning is the entire reason a core works: the child learns
         where `help` lives and stops looking. It is tinted, shorter and
         wider than a board card, and separated by a rule, so it reads
         as a different KIND of row rather than a first row. */
      + '.hlb-rail{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:100%;'
      +   'padding-bottom:10px;border-bottom:2px solid rgba(20,107,94,.18);}'
      + '.hlb-board{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;}'

      /* ⚠⚠ `min-width:0` IS LOAD-BEARING AND IT IS WHY THE CORE RAIL WAS
         CLIPPED ON A PHONE. A grid item defaults to `min-width:auto`,
         i.e. min-CONTENT — so a track holding the word "understand"
         refuses to shrink below that word, the four fixed columns of
         the rail overflow 360px, and the last two of the eight cards
         the child needs most are cut off the right edge. Every gate
         passed: there is no horizontal document overflow (the card
         clips it), the cells are all above the tap floor, and nothing
         is "off screen" by the measures anyone was taking. I found it
         by reading the render.
         The BOARD never showed it because it drops to three columns;
         the RAIL is fixed at four so the eight core cards stay in the
         same eight places, which is the entire point of a core. */
      + '.hlb-card{min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;'
      +   'min-height:104px;padding:10px 7px;border-radius:16px;border:2px solid rgba(20,107,94,.22);'
      +   'background:#FFFDF7;cursor:pointer;font:inherit;text-align:center;'
      +   'transition:transform .12s ease,box-shadow .12s ease;}'
      + '.hlb-card.hlb-core{min-height:72px;background:#E2F0EC;border-color:rgba(20,107,94,.3);}'
      + '.hlb-card:hover{background:#F3EADA;}'
      + '.hlb-card:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
      /* the tap lands: instant, and big enough to see across a room */
      + '.hlb-card:active{transform:scale(.97);}'
      /* ⭐ AND THE VOICE IS MADE VISIBLE — the card lifts and the icon
         stroke thickens, ON THE PICTURE, so a muted tablet still shows
         the child that the message went. Never a tick, never a colour
         that reads as right or wrong. */
      + '.hlb-card.hlb-said{transform:scale(1.05);box-shadow:0 0 0 3px #146B5E;}'
      + '.hlb-card.hlb-said .hlb-icon [stroke]{stroke-width:3.2;}'
      + '@media (prefers-reduced-motion:reduce){'
      +   '.hlb-card{transition:none !important;}'
      +   '.hlb-card.hlb-said{transform:none;}'
      + '}'
      + '.hlb-icon{width:40px;height:40px;flex:0 0 auto;}'
      /* ⚠ ONE TEXT CLASS FOR BOTH LANGUAGES: identical size, weight and
         colour, so neither can become the secondary one. */
      /* ⚠ `overflow-wrap:anywhere` — the companion to `min-width:0` on
         the card. Letting the track shrink is only half the fix: an
         unbreakable word ("understand", and every German compound this
         board will meet) then pushes past the rounded edge instead.
         Both are needed, and only the render shows it. */
      + '.hlb-text{font:400 14px/1.25 Nunito,system-ui,sans-serif;color:#146B5E;'
      +   'overflow-wrap:anywhere;hyphens:auto;}'

      /* ⚠ THE STEPS ARE CONTAINER WIDTHS. 4x3 holds from 560 to 1179,
         so the 704px embed and a 1024 standalone are THE SAME BOARD —
         same cell, same place — which is the AAC consistent-grid
         property for free. */
      + '@container hlb (min-width:400px){'
      +   '.hlb-card{min-height:120px;}.hlb-icon{width:48px;height:48px;}.hlb-text{font-size:15px;}'
      + '}'
      + '@container hlb (min-width:560px){'
      +   '.hlb-board{grid-template-columns:repeat(4,1fr);gap:14px;}'
      +   '.hlb-rail{gap:12px;}'
      +   '.hlb-card{min-height:140px;padding:14px 10px;}'
      +   '.hlb-card.hlb-core{min-height:96px;}'
      +   '.hlb-icon{width:60px;height:60px;}.hlb-text{font-size:17px;}'
      + '}'
      + '@container hlb (min-width:900px){'
      +   '.hlb-card{min-height:156px;}.hlb-card.hlb-core{min-height:104px;}'
      +   '.hlb-icon{width:68px;height:68px;}.hlb-text{font-size:18px;}'
      + '}'
      + '@container hlb (min-width:1180px){'
      +   '.hlb-board{grid-template-columns:repeat(6,1fr);gap:18px;}'
      +   '.hlb-rail{grid-template-columns:repeat(8,1fr);}'
      +   '.hlb-card{min-height:190px;}.hlb-card.hlb-core{min-height:120px;}'
      +   '.hlb-icon{width:88px;height:88px;}.hlb-text{font-size:22px;}'
      + '}'

      + '.hlb-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 14px;width:100%;}'
      + '.hlb-privacy{flex-basis:100%;font:400 14px Nunito,system-ui,sans-serif;color:#6B6558;text-align:center;}'

      /* ⚠ absolute, NEVER fixed: a fixed panel cannot make a
         content-driven iframe grow, so it would be cut off in the embed
         — which is where every teacher meets this tool. */
      + '.hlb-big{display:none;}'
      + '.hlb-big.hlb-open{display:flex;position:absolute;inset:0;z-index:30;'
      +   'align-items:center;justify-content:center;background:#FBF3E4;cursor:pointer;}'
      + '.hlb-bigin{display:flex;flex-direction:column;align-items:center;gap:14px;padding:18px;text-align:center;}'
      + '.hlb-bigicon{width:clamp(120px,40cqw,280px);height:clamp(120px,40cqw,280px);}'
      + '.hlb-bigtext{font:600 clamp(24px,6cqw,44px)/1.15 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;max-width:18ch;}'
      + '.hlb-bigrow{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}'
      + '.hlb-bigbtn{min-height:64px;min-width:64px;padding:12px 20px;border-radius:999px;'
      +   'border:2px solid #146B5E;background:#FFFDF7;color:#146B5E;'
      +   'font:600 17px Nunito,system-ui,sans-serif;cursor:pointer;}'
      + '.hlb-bigmine{border-color:#F2784B;color:#C2562F;}'
      + '.hlb-bignote,.hlb-bighint{font:400 14px Nunito,system-ui,sans-serif;color:#6B6558;max-width:44ch;}'

      /* the adult surface REPLACES the child's board rather than
         appearing under it — see the note beside the class toggle. */
      + '.hlb-wrap.hlb-desking > .hlb-tabs,'
      +   '.hlb-wrap.hlb-desking > .hlb-rail,'
      +   '.hlb-wrap.hlb-desking > .hlb-board,'
      +   '.hlb-wrap.hlb-desking > .hlb-foot{display:none !important;}'
      + '.hlb-desk{display:none;}'
      + '.hlb-desk.hlb-open{display:flex;flex-direction:column;gap:10px;width:100%;max-width:640px;'
      +   'padding:16px;border-radius:18px;background:#FFFDF7;border:2px solid rgba(20,107,94,.2);}'
      + '.hlb-desktitle{margin:0;font:700 19px "Baloo 2",Nunito,sans-serif;color:#146B5E;}'
      + '.hlb-deskhint,.hlb-deskwhy{margin:0;font:400 14px Nunito,system-ui,sans-serif;color:#6B6558;}'
      + '.hlb-deskrow{font:600 14px Nunito,system-ui,sans-serif;color:#3C7C72;margin-top:4px;}'
      + '.hlb-starters{display:flex;flex-wrap:wrap;gap:6px;}'
      + '.hlb-starter{min-height:44px;padding:8px 13px;border-radius:12px;border:1.5px solid rgba(20,107,94,.3);'
      +   'background:#FBF3E4;color:#146B5E;font:400 14px Nunito,system-ui,sans-serif;cursor:pointer;}'
      + '.hlb-starter.hlb-on{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
      + '.hlb-input{width:100%;min-height:48px;padding:10px 12px;border-radius:12px;box-sizing:border-box;'
      +   'border:2px solid rgba(20,107,94,.3);background:#FFFDF7;color:#146B5E;'
      +   'font:400 16px Nunito,system-ui,sans-serif;}'
      + '.hlb-eg{color:#3C7C72;}'
      + '.hlb-counter{font:400 14px Nunito,system-ui,sans-serif;color:#6B6558;min-height:18px;text-align:right;}'
      + '.hlb-iconrow{display:flex;flex-wrap:wrap;gap:8px;}'
      + '.hlb-icongrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(56px,1fr));gap:8px;'
      +   'max-height:320px;overflow-y:auto;padding:6px;border-radius:12px;background:#FBF3E4;}'
      + '.hlb-iconbtn{width:56px;height:56px;display:flex;align-items:center;justify-content:center;'
      +   'border-radius:12px;border:2px solid rgba(20,107,94,.25);background:#FFFDF7;cursor:pointer;padding:4px;}'
      + '.hlb-iconbtn.hlb-on{border-color:#F2784B;border-width:3px;}'
      + '.hlb-pickicon{width:40px;height:40px;}'
      + '.hlb-link{min-height:44px;padding:6px 10px;border:0;background:none;color:#C2562F;'
      +   'font:600 14px Nunito,system-ui,sans-serif;cursor:pointer;text-decoration:underline;}'
      + '.hlb-deskbtns{display:flex;flex-wrap:wrap;gap:8px;}'
      + '.hlb-btn{min-height:48px;padding:11px 18px;border-radius:999px;border:2px solid #146B5E;'
      +   'background:#146B5E;color:#FFFDF7;font:600 15px Nunito,system-ui,sans-serif;cursor:pointer;}'
      + '.hlb-ghost{background:#FFFDF7;color:#146B5E;}'
      /* ⚠ A LOCKED CONTROL KEEPS FULL CONTRAST AND STAYS LIVE. Opacity
         is the universal *disabled* signal and says nothing about why;
         a padlock plus a refusal-with-a-reason says exactly one thing.
         ⚠ And the padlock is drawn as a CHARACTER-free border box that
         still has a text fallback in the accessible name — a glyph made
         only of borders vanishes under forced-colors. */
      + '.hlb-locked{border-color:#F2784B;background:#FFFDF7;color:#C2562F;}'
      + '.hlb-locked::before{content:"";display:inline-block;width:11px;height:13px;margin-right:7px;'
      +   'vertical-align:-1px;border:2px solid currentColor;border-radius:2px;border-top-width:6px;'
      +   'border-top-left-radius:7px;border-top-right-radius:7px;box-sizing:border-box;}'
      + '@media (forced-colors:active){.hlb-locked{border-style:dashed;}}'
      + '.hlb-notice{padding:9px 12px;border-radius:12px;background:#FBE6DA;'
      +   'border:1px solid rgba(242,120,75,.45);font:400 14px Nunito,system-ui,sans-serif;color:#8A3B1B;}'
      + '.hlb-kept{font:400 14px Nunito,system-ui,sans-serif;color:#6B6558;}'
      + '.hlb-minelist{display:flex;flex-direction:column;gap:6px;}'
      + '.hlb-minerow{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:10px;background:#FBF3E4;}'
      + '.hlb-minicon{width:28px;height:28px;flex:0 0 auto;}'
      + '.hlb-minetext{flex:1;font:400 14px Nunito,system-ui,sans-serif;color:#146B5E;}'
      + '.hlb-gate{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:8px;'
      +   'padding:9px 13px;border-radius:12px;background:#FBE6DA;border:1px solid rgba(242,120,75,.45);'
      +   'font:400 14px Nunito,system-ui,sans-serif;color:#8A3B1B;}'
      + '.hlb-gate a{color:#C2562F;font-weight:700;}'

      /* ⚠ THE SHELL SETS html,body{overflow:hidden}, SO PAST THE FOLD IS
         UNREACHABLE, NOT MERELY OFF-SCREEN. The v2 build scoped its
         escape hatch to `max-width:560px`, which left a band — a
         1024x768 laptop standalone — where the Print chip could not be
         reached at all. It is unconditional here, and there is NO
         height-based media query anywhere: inside a content-driven
         iframe that is a feedback loop, the same family as the vh ban. */
      /* ⚠⚠ THE CLASS GOES ON <html> TOO, AND THAT IS THE WHOLE FIX.
         The shell sets `html, body { overflow:hidden }`. Unsetting it on
         BODY alone does nothing a finger can use: with `html` hidden the
         viewport does not scroll, and past the fold stays unreachable.
         ⭐ My first reachability check blessed this, because it asked
         whether `scrollTop` MOVED — and `overflow:hidden` does not stop a
         PROGRAMMATIC scrollTop, only a gesture. The strengthened check
         asks what the computed overflow permits, and it failed all 77
         cells at 320px immediately. A check that cannot fail is not a
         check, and this one had been passing on a real defect. */
      + 'html.hlb-page,body.hlb-page{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'
      + 'body.hlb-page .lcs-stage{position:relative;}'
      /* ⚠ NARROW ONLY. On a phone the shell header puts an eight-letter
         title beside four control buttons and the title broke MID-WORD
         — "Say / It / Boar / d". The v2 build stacked the header at
         EVERY width to avoid this, which costs vertical space on a
         projector, where it is scarcest. A max-width query is the right
         tool here: this is shell chrome outside the board's container,
         and unlike the board it does not live inside an iframe whose
         width lies about the viewport. */
      + '@media (max-width:430px){'
      +   'body.hlb-page .lcs-header{flex-direction:column;align-items:flex-start;gap:6px;}'
      + '}'

      + '.hlb-sheet{display:none;}'

      /* =============================================================
         PRINT — and it is DOUBLE-LOCKED in the direction that matters.
         ⚠ EVERY RULE IS SCOPED. The v2 build hid the whole board
         unconditionally and built the sheet only when entitled, so A
         FREE TEACHER PRESSING Ctrl+P GOT A BLANK PAGE. Gating the chip
         is not gating the feature, and Ctrl+P is guarded by no chip.
         Here the lanyard cards are FREE and always in the DOM, so any
         Ctrl+P prints something real; `body.hlb-paid` unlocks only the
         poster and the family sheet.
         ⚠ AND THE SHELL RESET IS MANDATORY: lcs-shell.css ships ZERO
         @media print blocks, so html,body{height:100%;overflow:hidden}
         and .lcs-app{max-width:720px;overflow:hidden} survive into
         print and would clip A4 to a single 720px column.
         ⚠ BLACK LINE ART, NO print-color-adjust: the right answer to
         "many school printers are monochrome" is to DESIGN for
         monochrome, and every icon in this set was proved legible with
         its colour stripped. A coral card reduces to an indistinct grey
         blob on exactly the machines most classrooms own.
         ============================================================= */
      + '@media print{'
      +   '@page{size:A4 portrait;margin:12mm;}'
      +   'html,body{height:auto !important;overflow:visible !important;background:#fff !important;}'
      +   '.lcs-app,.lcs-stage{max-width:none !important;overflow:visible !important;'
      +     'background:none !important;box-shadow:none !important;height:auto !important;}'
      +   '.lcs-header,.lcs-controls,.lcs-drawer,.lcs-drawer-scrim{display:none !important;}'
      +   '.hlb-wrap{display:none !important;}'
      +   '.hlb-sheet{display:block !important;}'
      +   '.hlb-sheet,.hlb-sheet *{color:#000 !important;}'
      +   '.hlb-sheet [fill]{fill:#000 !important;}'
      +   '.hlb-sheet [fill="#FFFDF7"],.hlb-sheet [fill="#FBF3E4"]{fill:#fff !important;}'
      +   '.hlb-sheet [fill="none"]{fill:none !important;}'
      +   '.hlb-sheet [stroke]{stroke:#000 !important;}'
      +   '.hlb-p-head{display:flex;align-items:flex-end;gap:3mm;margin:0 0 5mm;}'
      +   '.hlb-p-name{font:400 10pt Nunito,sans-serif;}'
      +   '.hlb-p-rule{flex:1;border-bottom:0.3mm solid #000;height:6mm;}'
      +   '.hlb-p-grid{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:54mm;gap:0;}'
      +   '.hlb-p-card{border:0.3mm dashed #555;padding:4mm 3mm;display:flex;flex-direction:column;'
      +     'align-items:center;justify-content:center;gap:2mm;break-inside:avoid;text-align:center;}'
      +   '.hlb-p-icon{width:18mm;height:18mm;}'
      +   '.hlb-p-text{font:400 10pt/1.2 Nunito,sans-serif;}'
      +   '.hlb-p-back{margin:6mm 0 3mm;font:400 10pt Nunito,sans-serif;}'
      +   '.hlb-p-rows{display:flex;flex-direction:column;gap:0;}'
      +   '.hlb-p-row{height:12mm;border-bottom:0.3mm solid #999;}'
      +   'body.hlb-paid .hlb-sheet[data-sheet="wall"] .hlb-p-grid{grid-template-columns:1fr 1fr;grid-auto-rows:80mm;}'
      +   'body.hlb-paid .hlb-sheet[data-sheet="wall"] .hlb-p-icon{width:40mm;height:40mm;}'
      +   'body.hlb-paid .hlb-sheet[data-sheet="home"] .hlb-p-grid{grid-template-columns:1fr;grid-auto-rows:18mm;}'
      + '}';
    document.head.appendChild(st);
  }

}());
