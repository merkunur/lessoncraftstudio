# Maker: Word Problems (`word-problems`)

Group **math** · language need **bound** · 12 existing templates + 3 new · replaces old app(s): —

## Settings a teacher sets

- operation: + / − / × / ÷ / mixed
- range
- story types (join, take away, compare, equal groups, sharing)
- pictures on/off
- names in stories
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Templates from today's worksheet types

**Solve add/subtract word problems within 10/20 using pictures**

- `G1-213` Picture Word Problems — Read each story. Use the pictures to help you. Write the answer in the box. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-213-word-problems.js)
- `G1-238` Addition Word Problems — Read each story. Use the pictures to help you. Write the answer in the box. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-238-addition-word-problems.js)
- `G1-239` Subtraction Word Problems — Read each story. Use the pictures to help you. Write the answer in the box. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-239-subtraction-word-problems.js)
- `G1-240` Word Problems Within 10 — Read each story. Use the pictures to help you. Write the answer in the box. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-240-word-problems-within-10.js)
- `G1-241` Word Problem Practice — Read each story. Use the pictures to help you. Write the answer in the box. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-241-word-problems-three-stories.js)

**Solve multiplication and division word problems by modelling groups vs group size (share vs make groups)**

- `G3-370` Multiplication and Division Word Problems — Read each story. Use the picture to help you. Write the answer in the box, then finish the answer sentence. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-370-muldiv-word-problems.js)
- `G3-371` Multiplication Word Problems — The picture shows the equal groups. Write each answer in the box. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-371-multiplication-word-problems.js)
- `G3-372` Division Word Problems: Sharing — Each story shares things out. Deal them into the boxes. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-372-division-word-problems-sharing.js)
- `G3-373` Division Word Problems: Making Groups — Ring the equal groups in the picture, then write the answer. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-373-division-word-problems-grouping.js)
- `G3-374` Division Word Problems: Two Ways — One story shares out, the other makes groups. Both are division. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-374-division-word-problems-two-ways.js)
- `G3-375` Multiply and Group: Word Problems — One story builds groups, the other breaks them up. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-375-multiplication-and-grouping-word-problems.js)
- `G3-376` Multiplication and Division: Mixed Problems — Three stories. Decide what each one asks before you answer. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-376-multiplication-and-division-word-problems-mixed.js)

## New templates to add

- **Two-step word problems (G2-3)** — only one-step stories exist
- **Write your own story for 7 + 5** — the reverse direction
- **Compare problems: how many more?** — the hardest K-2 story type, under-served

## FABLE-QUESTIONS (answered before the build)

1. [word-problems-Q1] Story frames are native per locale (data/word-problems/frames.js) with grammar for numbers, plurals and names. Teachers will want their class's names in stories: can names be inserted safely in all 11 (gendered pronouns and agreement in de/fr/es/pt/it)?
