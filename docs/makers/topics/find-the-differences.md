# Maker: Find the Differences (`find-the-differences`)

Group **visual** · language need **little** · 11 existing templates + 1 new · replaces old app(s): —

## Settings a teacher sets

- scene
- number of differences (3, 5, 7, 10)
- colour / black-and-white
- kinds of changes
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Templates from today's worksheet types

**Compare two pictures and find what changed / what is missing**

- `K-395` Find 5 Differences: {UNIT} — Compare picture 1 with picture 2 below it, circle the 5 things that are different and tick a box for each one. · screen version (scripts/worksheet-gen/types/k/K-395-find-the-differences.js)
- `K-397` Find 3 Differences: {UNIT} — Find the 3 big things that are different in the bottom picture, circle them and tick the 3 boxes. · screen version (scripts/worksheet-gen/types/k/K-397-find-3-differences.js)
- `K-398` Find the Differences in Color — Circle the 5 things in the colored bottom picture that are different and tick a box for each; at least one of them has a new color. · screen version (scripts/worksheet-gen/types/k/K-398-find-the-differences-in-colour.js)
- `K-399` What Is Missing? — Circle the 3 empty places in the bottom picture where something from the top picture is missing, and tick a box for each. · screen version (scripts/worksheet-gen/types/k/K-399-what-is-missing.js)
- `K-400` Picture Pairs: Find the Difference — Each row shows the same close-up twice; circle the one place that is different in the right picture and tick the box of that row. · screen version (scripts/worksheet-gen/types/k/K-400-picture-pairs-find-the-difference.js)

**Visual discrimination: find 7 differences, how many differences, what changed (tick the words), mirror differences**

- `G1-412` Find 7 Differences at the Pond — Circle the 7 differences, 4 in the left pair of pictures and 3 in the right pair, and tick a box for each. · screen version (scripts/worksheet-gen/types/g1/G1-412-find-7-differences.js)
- `G1-413` How Many Differences? — Circle every difference in the bottom picture (some things may be gone), then write how many you found in the box. · screen version (scripts/worksheet-gen/types/g1/G1-413-how-many-differences.js)
- `G1-414` What Changed? Tick the Words — Circle the 3 differences in the bottom picture, then tick the words of the things that changed. · screen version (scripts/worksheet-gen/types/g1/G1-414-what-changed-tick-the-words.js)
- `G1-415` Mirror Pictures: Fold and Check — Picture 2 is flipped like a mirror; circle the 4 things or empty places that are still different, tick a box for each, then fold on the line to check. · screen version (scripts/worksheet-gen/types/g1/G1-415-mirror-pictures-find-the-differences.js)

**Visual discrimination: find 10 differences; write a sentence about each difference**

- `G2-388` Find 10 Differences in the Garden — Circle the 10 differences, 5 in each pair of pictures, and tick a box under the pair for every one you find. · screen version (scripts/worksheet-gen/types/g2/G2-388-find-10-differences.js)
- `G2-389` Write What Is Different — Circle the 3 differences (something may be gone), then write one sentence about each one on the lines, using the words in the two strips. · screen version (scripts/worksheet-gen/types/g2/G2-389-write-what-is-different.js)

## New templates to add

- **Differences between two of the teacher's own photos** — personal; may be impossible — see question

## FABLE-QUESTIONS (answered before the build)

1. [find-the-differences-Q1] FD scenes are 427 MB precomputed and every difference passes a raster diff gate. In the browser: ship which scenes, how big, and can the diff gate run client-side (lib/fd-browser-diff.js suggests yes)?
