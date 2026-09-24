---
name: feedback_native_panels_read_the_model
description: "Brief every native locale panel to READ THE CODE and audit the English as a source — they find model bugs no gate can, and they find them independently"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f974ba13-5c31-4506-bc65-1378587152b3
  modified: 2026-08-05T04:05:11.792Z
---

**Rule:** when running per-locale native panels, hand them the tool's SOURCE, the English as a
**source to audit** rather than a target to translate, and ask explicitly for model bugs with
`file:line`. Reproduce every claim before fixing. Then re-brief the *later* panels with the
CORRECTED English, so they do not inherit the mistakes the first ones found.

**Why:** on the Number Bonds Board rebuild (2026-08-05) eleven three-person panels found
**seven model bugs and two dozen copy defects**, and the two most serious were invisible to a
gate suite of nine scripts:

- the colour picker shipped **three blank chips** (option value was the scheme key; the shell
  paints `style.background = value`) — found independently by **four** panels;
- a free visitor's **Ctrl+P printed a blank page** (print DOM premium-only, print CSS
  unconditional) — found by two.

They also caught: the stepper printing the number the cloth was hiding; the record leaking a
split recorded one carry earlier; an arrow key that moved focus in the wrong direction; a covered
tray whose cursor advertised a grab it refused; and a guard (`partB(...) !== undefined`) that
could never be false.

And they corrected the English itself: *"a new pair each time"* was **false** (the dedupe
function exists *because* pairs repeat), the instruction named the counter when the **tray** is
the handle, `Show it written → Not written` contradicted itself, and *"this part / that part"*
is meaningless to a screen-reader user.

**How to apply:**
- Brief: *"READ THE MODEL AND THE RENDERER, not just the strings. If the code does not do what a
  string says, that is the most valuable thing you can find."*
- Tell them what earlier panels already found, so they spend their attention on new ground —
  and say which rulings are settled so they do not re-litigate.
- Make them check the candidate nouns against the **shipped lexicon of the sibling tools**, not
  against English. Seven locales here had to be renamed because every container noun was already
  a sibling's title (`cadre`/`marco`/`quadro`/`telaio`/`ram`/`ramme` all belong to the ten-frame
  or the rekenrek). The answer in each was to name the **action**, not the furniture.
- Ask Scandinavian panels for the **definite forms** of every noun (sv `duken` is also the
  projection screen; sv `ramen` is also the noodle dish; da/no `klæder`/`klær` means *clothes*).
- Ask them to check every noun **against the mathematics**: it and pt independently vetoed
  *"the four operations"* for a fact family, because in both languages that phrase means
  +−×÷.
- Ask them to normalise the paid-plan name against the **pricing page the button opens**, not
  against the other tools — the de panel found the tools and the page disagree.

⚠ **A panel finding is a hypothesis until reproduced.** Every one above was confirmed with a
throwaway puppeteer probe before a line changed; one earlier finding (a reset "losing" the
teacher's number) was real in the code but invisible that day, and only reading the source
settled it.

Related: [[feedback_the_english_source_is_the_locale_nobody_reads]] ·
[[feedback_panels_read_the_code_not_just_the_copy]] · [[project_number_bonds_board_rebuild]]
