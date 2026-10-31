# Maker: Picture Tracing (`picture-tracing`)

Group **writing** · language need **little** · 20 existing templates + 1 new · replaces old app(s): —

## Settings a teacher sets

- picture / scene
- line: dashed / dotted
- thickness by age
- task: trace / trace and colour / count / finish / symmetry / hidden
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Templates from today's worksheet types

**(no teaching point recorded)**

- `K-418` Picture Tracing: Trace the Garden Path to the Door — Trace every dashed line to finish the garden, from the sun and the cloud down to the path and the rabbit. (scripts/worksheet-gen/types/k/K-418-picture-tracing.js)
- `K-419` Tracing Worksheets for Preschool: My First Big Whale — Start at the dot. Trace the big whale slowly, all the way round. (scripts/worksheet-gen/types/k/K-419-my-first-tracing-whale.js)
- `K-420` Trace the Picture: Look at the Animal, Then Trace It — Look at the picture in the frame. Then trace the same animal next to it. (scripts/worksheet-gen/types/k/K-420-look-then-trace.js)
- `K-421` Tracing for Toddlers and Preschoolers: Round Pictures — Start at each dot and trace round and round, like the letter o. (scripts/worksheet-gen/types/k/K-421-round-and-round-tracing.js)
- `K-422` Straight-Line Picture Tracing: Down, Across and Slanted — Look at the arrow above each column. Trace one column at a time: down, then across, then slanted. (scripts/worksheet-gen/types/k/K-422-straight-line-picture-tracing.js)
- `K-423` Trace the Picture: Zigzag Mountains and a Stormy Camp — Trace the whole picture. Stop at every tip of the zigzags: the mountains, the trees, the tent and the lightning. (scripts/worksheet-gen/types/k/K-423-zigzag-picture-tracing.js)
- `K-424` Tracing Pictures for Kids: Spirals and Loops — Trace the spirals and loops: the snail, the lollipop, the bow, the pretzel and the pinwheel. (scripts/worksheet-gen/types/k/K-424-curls-and-spirals-tracing.js)
- `K-425` Trace and Color the Picture: A Picnic Under the Tree — Trace the whole picnic picture. Then color it in any colors you like. (scripts/worksheet-gen/types/k/K-425-trace-and-color-picnic.js)
- `K-426` Picture Tracing for Kindergarten: Where Do I Start? — Start at each dot and follow the arrow. Go down the stairs, one picture at a time. (scripts/worksheet-gen/types/k/K-426-where-do-i-start-tracing.js)
- `K-427` Trace and Count: How Many Ducks Are on the Pond? — Trace the ducks. Count them. Write how many in the box. (scripts/worksheet-gen/types/k/K-427-trace-and-count-ducks.js)
- `K-428` Picture Tracing Sheets: Finish the Picture — Trace the dashed parts to finish each picture: wheels, a spout, a stick, a handle, a point and ears. (scripts/worksheet-gen/types/k/K-428-finish-the-picture-tracing.js)
- `K-429` Christmas Picture Tracing: Trace Round Every Bauble and Star — Trace the tree, the gifts, the armchair, the window and the rug. Then trace round every bauble and star. (scripts/worksheet-gen/types/k/K-429-christmas-picture-tracing.js)
- `K-430` Shape Tracing: A Rocket of Circles, Squares and Triangles — Trace every shape of the rocket and the sky. Then color every circle. (scripts/worksheet-gen/types/k/K-430-shape-picture-tracing.js)
- `K-431` Summer Picture Tracing: Trace the Waves Across the Sea — Trace the waves from left to right. Then trace the boat and the beach. (scripts/worksheet-gen/types/k/K-431-summer-sea-picture-tracing.js)
- `K-432` Tracing Pictures for Kids: Big, Middle and Small — In every row, trace the big one, then the middle one, then the small one. (scripts/worksheet-gen/types/k/K-432-big-middle-small-tracing.js)
- `G1-429` Dotted Picture Tracing for 1st Grade: A Morning in Town — Trace the dotted lines carefully, the small details too. (scripts/worksheet-gen/types/g1/G1-429-dotted-picture-tracing-street.js)
- `G1-430` Trace the Picture, Say Its Name and Trace the Word — Trace the picture. Say its name. Trace the word under it. (scripts/worksheet-gen/types/g1/G1-430-trace-the-picture-and-word.js)
- `G1-431` Trace the Picture, Then Draw: What Is the Tractor Carrying? — Trace the whole picture: the tractor, the trailer and the animals. Then draw what the tractor is carrying. (scripts/worksheet-gen/types/g1/G1-431-trace-then-draw-trailer.js)
- `G1-432` Symmetry Picture Tracing: Trace the Other Half — Trace the dashed half so both sides of each picture look the same. (scripts/worksheet-gen/types/g1/G1-432-symmetry-picture-tracing.js)
- `G1-433` Animal Tracing Pictures: Find the 5 Hidden Animals — Find the 5 hidden animals in the forest. Trace them. (scripts/worksheet-gen/types/g1/G1-433-find-and-trace-hidden-animals.js)

## New templates to add

- **Trace a teacher-chosen library picture** — any picture, not only the 300 scenes

## FABLE-QUESTIONS (answered before the build)

1. [picture-tracing-Q1] Tracing guides come from each drawing's own ink skeleton (lib/pt-*), heavy CPU, with measured band rules. Precompute for the whole B&W library (≈1,500 pictures?) or run in the browser? Own uploads?
