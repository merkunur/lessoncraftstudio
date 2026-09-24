# Swedish (sv) for Comparison Creek — native linguist panel output

Read: `mini tools/comparison-creek-activity.js`, `mini tools/river-steer-core.js`,
`mini tools/comparison-creek-activities.json`.

## The 23 strings

```
title            'Kapten Quills flodfärd'
instruction      'Styr kapten Quill genom rätt flodarm varje gång floden delar sig. Tryck på en flodarm och tryck sedan på Kontrollera.'
promptBigger     'Styr till det STÖRRE talet!'
promptSmaller    'Styr till det MINDRE talet!'
promptMoreDots   'Styr till sidan med FLER prickar!'
promptBiggerOne  'Prickar eller siffra — styr till det STÖRRE talet!'
promptSum        'Räkna ihop varje sida — styr till den STÖRRE summan!'
promptSize       'Titta på TALET — inte på hur stort det står!'
promptTie        'Samma tal? Tryck på likhetstecknet!'
promptName       'Är {a} STÖRRE eller MINDRE än {b}?'
promptBetween    'Vilket tal ligger MELLAN {lo} och {hi}?'
readback         'Du valde {n}.'
reBig            '{a} är större än {b}. Titta en gång till — vilken flodarm har {a} nu?'
reSmall          '{a} är mindre än {b}. Titta en gång till — vilken flodarm har {a} nu?'
reEqual          'Talen är lika stora — tryck på likhetstecknet!'
win              'Snyggt styrt!'
hintCheck        'Välj ett svar och tryck sedan på Kontrollera.'
relMore          'STÖRRE'
relLess          'MINDRE'
ariaSteerLeft    'styr åt vänster'
ariaSteerRight   'styr åt höger'
ariaEqual        'de är lika stora'
quillName        'Kapten Quill'
```

## Code defects found (all inherited by the 7 shipped locales)

1. **`btw-5-8` re-teach names the WRONG buoy.** `_bonk` (l.235-237) has no `between`
   branch; promptKey `between` !== `smaller` so it falls to `reBig` with a=max=8 —
   "8 is more than 5, which channel has 8 now?" while the correct answer is 5.
2. **Round 11 (`name-6-7`) re-teach states the answer AND names a control that
   does not exist.** l.234 → reSmall "6 is less than 7" (that IS the answer) then
   "which channel has 6 now?" — the round renders only MORE/LESS buttons, and
   `swap` never fires for `relation`, so "now" is false too.
3. **`readback` says 0 on the sum round.** l.217 reads `.value` not `Core.val()`;
   sum channels carry `value:0` with the real number in `addends`.
4. **`speak()` has no `sv` branch** (l.35) — Swedish falls through to `en-US`.
5. **`hintCheck` is round-invariant** but says "steer down a channel"; false on the
   tie round (answer = the `=` beacon) and round 11 (buttons only).
6. **`instruction`/`hintCheck` promise a two-step choose-then-Check**; the tap
   commits and is graded immediately.
7. `reBig`/`reSmall` on the four adjacent-numeral rounds hand over the comparison,
   reducing a wrong attempt to a find-the-numeral task (probably intended).

## Addendum — 8 live page_titles, English title case → Swedish sentence case
No proper nouns (tioram = common compound noun). No meaning change. `I`→`i` in #3
is a strict improvement (capital `I` is the archaic pronoun "ye"). Particle verbs
*dela in / lägg ihop / para ihop / räkna ut* are correctly two words. #1 is 60
chars = at the SERP display cap before any suffix.

## Definite forms checked
floden · flodarmen · bojen · flotten · **bäcken (⚠ = pelvis/bedpan, avoided)** · ån ·
pricken/prickarna · siffran · talet/talen · likhetstecknet · kaptenen · summan ·
sidan · kröken · förgreningen
