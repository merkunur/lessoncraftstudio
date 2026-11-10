# The 435 new drawings: rejected (2026-11-07)

Operator, on seeing them: "There are a lot of discrepancies and most of the images are even not easy to identify. They are very
poor quality designs. You should use the best artist agent to recreate them."

Read drawing by drawing beside the operator's library (22 contact sheets at 278 px). The verdict stands: **all 435 are replaced**,
not only the worst, so the set reads as one hand and meets the library. Numbers are the order of the contact sheets: theme, then
noun. A drawing can be in several lists.

## The standard for the redraw

Operator: "each one of the images you will create should be a masterpiece because they are the moat of the product." Matching the
library is the minimum. A drawing ships only when it is one a child wants to color and a teacher remembers.

Operator: "cute doesn't mean to draw a face to all the objects. It is so stupid and cheap." Only living creatures and people have
faces. Charm in an object comes from its proportions, silhouette and observed detail. The one exception: the 11 Shape Friends
(326-336) stay as characters, operator: "shape friends can stay but they should be improved. They are also very poor quality
design." They are redrawn to the same standard, each with its own personality.

Operator: "the most terrible drawings are human and animal drawings. You should put even more effort to make them top quality."
People and animals get the most effort and the most review rounds.

Operator: "they should be simple cartoon images. Adding more details doesn't make them better. It is about the design, style." The
target is a simple professional cartoon: few confident lines, strong shape design, a clear silhouette, real appeal.

## What the library has and these do not

The library is designed cartoon: each subject has its own shape, pose and character, drawn with an organic contour and well-judged
proportions. These are clip art assembled from circles, ellipses and rectangles, with no design behind them. The gap is design and
style, not the amount of detail.

## Defects

**One stock face.** Measured: 348 of 435 carry the same eyes. On an object it hides what the thing is: 1, 10, 14, 16, 20, 22, 23,
24, 30, 34, 67, 78, 79, 86, 103, 116, 121, 125, 130, 154-171, 177, 178, 184-189, 192-195, 202, 208, 215, 264, 286-304, 308-310,
312, 313, 315, 316, 319, 320, 323, 326-336, 341, 343, 344, 345, 346, 348-352, 354, 356, 361, 364, 368-371, 378, 379, 385, 386, 390,
391, 394, 397, 398, 401-435.

**One animal body** (a sitting bear of stacked ovals): 81, 88, 93, 94, 97, 99, 104, 108, 112, 113, 117, 118, 119, 123, 127, 128,
129, 131, 179, 217, 224, 225, 227, 232, 237, 238, 245, 246, 267, 270, 272, 273, 274, 275, 278, 283, 285.

**One person body** (same head, same broken hair arcs, same dress): 39-47, 72, 82, 83, 134-153, 392.

**Does not read as what it is called:** 21 worm, 34 paper lantern, 50 brachiosaurus, 54 dinosaur footprint (a pineapple), 55
diplodocus, 57 fossil, 58 mammoth (a turtle), 59 parasaurolophus, 60 plesiosaur, 61 pterodactyl, 63 stegosaurus (a turtle), 66
velociraptor, 73 flying carpet, 75 glass slipper (a boot), 77 magic lamp (a blob), 81 pegasus (a dragon), 87 treasure key, 101 hay
bale, 102 horse, 122 mole, 170 toothbrush (a fork), 174 harp, 181 violin (a guitar), 191 rose (an eye on a stick), 197 coral reef,
199 dolphin (a shark), 204 narwhal, 205 octopus, 207 sea otter, 210 seahorse, 212 squid (a house), 221 gecko, 222 goldfish, 223
guinea pig, 230 pet collar, 234 sleeping puppy, 239 ice cave, 248 sled, 264 baobab, 265 camel, 266 chameleon, 281 sloth, 292 globe,
300 paint palette, 302 pencil case, 310 beach ball, 322 sunglasses, 325 windy day, 342 meteor shower, 355 baseball glove, 357 jump
rope, 359 skateboard, 368 bulldozer, 384 rocket car, 389 tow truck, 393 jack in the box, 397 spinning top, 403 banana, 405 broccoli,
411 corn, 416 honey pot, 417 hot dog (a pie dish), 420 lollipop, 423 pancakes, 425 pineapple, 428 pretzel, 431 sushi roll, 432 taco.

**The same small bear head stuck into a scene:** 73, 101, 218, 219, 239, 248, 362.

**Cut off at the edge of the picture:** 44, 316, 340, 342, 424.

**Lines crossing through a shape:** 24, 65, 97, 102, 108, 231, 232, 363, 411, 425.

## What it means for the build

The drawing sources are art-src/*.js. Everything derived from them must be rebuilt after the redraw: the 1,536 px and 512 px library
files, data/fl/d2d, cbn, htd, the traces, the Find the Differences scenes and pins, data/fl/index.json, previews, gates. Nouns stay,
so data/fl/names.js and groups.js stand, unless a drawing changes what it shows.
