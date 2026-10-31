# Maker: Sorting & Categories (`sorting`)

Group **visual** · language need **little** · 11 existing templates + 2 new · replaces old app(s): `picture-sort`

## Settings a teacher sets

- categories (2-4, from the library's category data or own)
- line / cut and paste / write
- pictures per bin
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Templates from today's worksheet types

**Sort pictures into two or more groups by category (incl. cut-and-paste sorts)**

- `K-042` Sort It Out — Draw a line from each picture to the bin where it belongs. · picture themes (scripts/worksheet-gen/types/k/K-042-sort-two-bins.js)
- `K-235` Sort by Category — Draw a line from each picture to the group it belongs to. (scripts/worksheet-gen/types/k/K-235-category-sort.js)
- `K-240` Cut, Sort, and Paste — Cut out the pictures at the bottom. Sort them and glue each one into its box. · picture themes (scripts/worksheet-gen/types/k/K-240-cut-and-paste.js)
- `K-264` Cut and Paste: Two Big Groups — Cut out the pictures at the bottom. Sort them and glue each one into its box. · picture themes (scripts/worksheet-gen/types/k/K-264-cut-and-paste-two-groups.js)

**Everyday foods and sometimes foods**

- `K-203` Healthy and Not-Healthy Foods — Draw a line from each food to the group it belongs to. (scripts/worksheet-gen/types/k/K-203-healthy-food.js)

**Land, water and air transport; things that fly**

- `K-206` Things That Fly — Draw a line from each picture to the group it belongs to. (scripts/worksheet-gen/types/k/K-206-can-fly.js)
- `K-210` Land, Water, and Air Transportation — Draw a line from each vehicle to where it travels. (scripts/worksheet-gen/types/k/K-210-transportation.js)

**Wants and needs**

- `K-212` Wants and Needs — Draw a line from each picture to the group it belongs to. (scripts/worksheet-gen/types/k/K-212-wants-needs.js)

**Community helpers and the tools they use**

- `K-213` Community Helpers and Their Tools — Draw a line from each helper to the tool they use. (scripts/worksheet-gen/types/k/K-213-helper-tool.js)

**Sort pictures into three groups**

- `G1-160` Three Groups — Draw a line from each picture to the bin where it belongs. · picture themes (scripts/worksheet-gen/types/g1/G1-160-categorize-three-bins.js)

**Sort foods into the four food groups**

- `G1-207` The Four Food Groups — Draw a line from each food to its food group. (scripts/worksheet-gen/types/g1/G1-207-food-groups.js)

## New templates to add

- **Sort by the teacher's own two labels** — any classification
- **Venn sort (two overlapping rings)** — G1-2 classification

## FABLE-QUESTIONS (answered before the build)

1. [sorting-Q1] Category membership for pictures: today per-sheet JSON lists (data/science/*.json, category-vocab). A general "sort anything" maker needs a reviewed attribute table for library pictures (object-attributes.json is partly reviewed: 456/933). Decide what may be offered before review completes.
