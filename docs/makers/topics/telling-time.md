# Maker: Telling Time (`telling-time`)

Group **math** · language need **little** · 15 existing templates + 2 new · replaces old app(s): —

## Settings a teacher sets

- to the hour / half / quarter / 5 min / minute
- analog / digital / both
- task: read / draw hands / match / elapsed / 12-24h
- clock style: numbers, ticks, minute numbers
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Locale conventions (en = American English, es = Mexican Spanish, pt = Brazilian Portuguese)

- en-US uses a.m./p.m. and 12-hour; most others teach 24-hour by grade 2

## Templates from today's worksheet types

**Tell time to the hour and half hour; match analog to digital**

- `G1-148` On the Hour — Read each clock. Circle the matching time. · screen version (scripts/worksheet-gen/types/g1/G1-148-oclock.js)
- `G1-149` Half Past What? — Read each clock. Circle the matching time. · screen version (scripts/worksheet-gen/types/g1/G1-149-half-past.js)
- `G1-150` Clock Partners — Draw a line from each clock to its digital time. · screen version (scripts/worksheet-gen/types/g1/G1-150-match-clocks.js)

**Draw (set) the clock hands for o'clock, half past, quarter hours, five minutes, mixed**

- `G1-212` Draw the Clock Hands — Read the time. Draw the hour hand and the minute hand on the clock. · screen version (scripts/worksheet-gen/types/g1/G1-212-draw-clock-hands.js)
- `G1-233` Draw the Hands: O'Clock — Read the time. Draw the hour hand and the minute hand on the clock. · screen version (scripts/worksheet-gen/types/g1/G1-233-draw-hands-oclock.js)
- `G1-234` Draw the Hands: Half Past — Read the time. Draw the hour hand and the minute hand on the clock. · screen version (scripts/worksheet-gen/types/g1/G1-234-draw-hands-half-past.js)
- `G1-235` Draw the Hands: Quarter Hours — Read the time. Draw the hour hand and the minute hand on the clock. · screen version (scripts/worksheet-gen/types/g1/G1-235-draw-hands-quarter-hours.js)
- `G1-236` Draw the Hands: Five Minutes — Read the time. Draw the hour hand and the minute hand on the clock. · screen version (scripts/worksheet-gen/types/g1/G1-236-draw-hands-five-minutes.js)
- `G1-237` Draw the Hands: Mixed Times — Read the time. Draw the hour hand and the minute hand on the clock. · screen version (scripts/worksheet-gen/types/g1/G1-237-draw-hands-mixed-times.js)

**Tell time to 5 minutes and to the quarter hour**

- `G2-249` What Time Is It? — Read each clock. Circle the matching time. · screen version (scripts/worksheet-gen/types/g2/G2-249-time-five-minutes.js)
- `G2-250` Quarter Hours — Read each clock. Circle the matching time. · screen version (scripts/worksheet-gen/types/g2/G2-250-time-quarter-hour.js)

**Find how much time passed between two clock times**

- `G3-344` How Much Time Passed? — Compare the two clocks. Write how many hours passed. · screen version (scripts/worksheet-gen/types/g3/G3-344-elapsed-time-clocks.js)

**Read an analog clock to the minute**

- `G3-354` To the Minute — Read each clock. Circle the matching time. · screen version (scripts/worksheet-gen/types/g3/G3-354-time-to-the-minute.js)

**Convert between 12-hour and 24-hour time**

- `G3-355` 12-Hour and 24-Hour Time — Match each time to its 12-hour or 24-hour form. Circle the correct one. · screen version (scripts/worksheet-gen/types/g3/G3-355-time-12-24-conversion.js)

**Add or subtract minutes/hours to a clock time**

- `G3-356` Add and Subtract Time — Start at the time shown, then add or subtract. Write the new time. · screen version (scripts/worksheet-gen/types/g3/G3-356-time-add-subtract.js)

## New templates to add

- **Clock with written times ("half past three" in the language)** — reading time words, the hard part in de/nl/sv (halb vier = 3:30)
- **Daily routine timeline** — time in context

## FABLE-QUESTIONS (answered before the build)

1. [telling-time-Q1] Half-hour idioms invert across locales (de/nl/sv/da/no/fi "half four" = 3:30; en-US "half past three"). The time-words engine must be native per locale — confirm where it lives today (the activities clock-core has it) and reuse it rather than re-author.
