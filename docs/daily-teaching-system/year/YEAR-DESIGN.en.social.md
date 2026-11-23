# Year design, English social (Stage D-1, 2026-11-23)

Designed by one Opus agent in the role of a US K–3 social teacher (brief: lcs-stage-d/D1-SOCIAL-BRIEF.md); checked by `check-design.js --loc=en --subject=social --poison` (all poisons caught) and read by me. The design file: `scripts/units/year/design.en.social.json`. The designer's report follows.

# D-1 Social studies year (en, K-3): report

File: `scripts/units/year/design.en.social.json`. `check-design.js --loc=en --subject=social` passes, and so does `--poison` (13 of 13 caught). My own script confirms all 48 K-2 indicators and all 11 points are placed. Pacing is 2 sessions of about 30 minutes a week. Lessons are 2 sessions; 3 only for multi-day making.

## Kindergarten: 55 of 56 sessions (5 point, 13 new, 2 teacher-led)
1. Me and My School: 4 lessons, 11 sessions
2. My Family: 4, 11 (around Thanksgiving)
3. Helpers, Needs and Wants: 4, 11
4. Our Country and Being Fair: 4, 11 (February)
5. Maps, Places and Getting Around: 4, 11

## Grade 1: 56 of 56 (2 point, 17 new, 1 teacher-led)
1. Rules and Good Citizens: 4, 11
2. Families Long Ago and Today: 4, 11
3. Maps and Places: 4, 12 (the map key takes 3 sessions)
4. Our Country's Symbols and Stories: 4, 11
5. Goods, Services and Money: 4, 11

## Grade 2: 56 of 56 (3 point, 16 new, 1 teacher-led)
1. Our Class and Our Community: 4, 11
2. Maps and Our World: 4, 11
3. Communities Near and Far: 4, 11 (winter traditions in December)
4. History of Our Community: 4, 11
5. Producers, Consumers and Money: 4, 12 (the class market takes 3)

## Grade 3: 51 of 52 (1 point, 17 new, 1 teacher-led)
1. Citizens, Rules and Laws: 4, 11 (Constitution Day falls inside)
2. Maps of Our World and Our State: 5, 14
3. How Our Government Works: 5, 13
4. Our Community Then and Now: 5, 13

Grade 3 teaches 19 indicators of the 3-5 band.

## notCovered
None. Every K-2 indicator is the standard of at least one K-2 lesson.

## leftOut
None. Two placements are a judgement call because the C3 Framework has no kinship code:
- K:family is under D2.Civ.6 (a family shares tasks and roles).
- 2:family-relationships is under D2.His.1 (relatives placed by generation).

## Wrong facts on existing pages (top priority)
1. **"Label the Continents" (G2-370) and "Continents and Oceans" (G3-396)** call the seventh continent **"Oceania"** in English (`scripts/worksheet-gen/data/b5/maps.js`, `continentNames`).
   - US schools, and the National Geographic seven-continent list that the file itself cites, call it **Australia**. Oceania is the wider region of Pacific islands.
   - A US child looks for "Australia" in the word box and does not find it.
   - Fix: label it "Australia" in English.
2. **"Community Helpers and Their Tools" (K-213)** pairs **astronaut → rocket** and **musician → trumpet** (`data/science/helper-tool.json`).
   - A rocket is a vehicle, not a tool, and neither worker is a community helper.
   - Fix: replace them with local helpers, such as a police officer, a librarian or a mail carrier.

Not a wrong fact, but a grade-fit problem: K-370 and K-375 ask Kindergarten to read and write family words. The design has the teacher read the words aloud.

Note: after writing the design with the Write tool, I made small fact edits with a checked replace script. The checker was run again after the edits.
