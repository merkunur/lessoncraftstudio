# The colouring alphabet and numbers across the 59 makers

Operator /goal 2026-11-06: "analyze all the 59 worksheet makers and find out which worksheet makers can use the coloring alphabet and
numbers and create new templates for these worksheet makers". Engine: `lib/color-glyphs.js` (`data/fl/glyphs.json`, 128 fat letters,
digits and marks of the 11 languages, ten skins). A maker takes them only where colouring a letter or number IS the task or gives the
child a reason to look at it: a letter or digit dressed up for its own sake teaches nothing.

## The test applied to each maker

1. Does the page ask about a letter, a number or a word the child can see whole?
2. Would colouring it be the answer, or the practice, and not decoration?
3. Does the fat letter still read at the size the page needs?

## Makers that take them (32), with the template

| Maker | New template | What the colouring does |
|---|---|---|
| Coloring Pages | K-579 Coloring Alphabet · K-580 Coloring Numbers · K-581 Color Your Name · K-582 Color and Count · K-583 Coloring Bookmarks | the page itself |
| Dot to Dot | K-584 Letter Dot-to-Dot · K-585 Number Dot-to-Dot | the joined outline is a fat letter or digit, then coloured |
| Color by Number & Code | K-587 Color by Addition · K-588 Color by Letters · G3-479 Color by Multiplication · G1-555 Mystery Grid Picture · G1-553 Hidden Letter Mosaic | the code; the mosaic hides a letter |
| Find the Differences | K-591 Letter Grid · K-592 Number Grid | look-alike letters and digits are the task |
| How to Draw | K-598 How to Draw Poster | the picture's name in bubble letters |
| Picture Tracing | K-602 Trace the Giant Letter · K-609 Trace the Giant Number | the dashed outline of a fat letter or digit |
| Counting | K-603 Count and Color the Number | the answer |
| Number Sequences | K-604 Color the Number Path | the path |
| Odd and Even | G1-554 Color the Odd Numbers | the sort |
| Compare Numbers | K-606 Color the Greater Number | the answer |
| Addition & Subtraction | K-607 Solve and Color the Answer | the answer |
| Multiplication & Division | G2-499 Color the Multiples | the pattern on the chart |
| Number Bonds | K-608 Color the Pair | the two parts |
| Place Value | G1-551 Color the Tens Digit | the digit's place |
| Number Tracing | K-610 Color and Trace | colour first, then the stroke |
| Number of the Day | K-611 My Number Poster | the number's page |
| Ten Frames | K-612 Color the Number, Fill the Frame | the numeral beside its quantity |
| Calendar | K-613 Color the Days | a month coloured day by day |
| Patterns | K-614 Color the Letter Pattern | same letter, same colour shows the unit |
| Sorting | K-615 Letters or Numbers? | the sort |
| Alphabet | K-616 Find and Color | letter recognition |
| Letter Tracing | K-617 Color and Trace | colour first, then the stroke |
| Phonics | K-618 Color the First Letter | the answer |
| Sight Words | K-619 Color the Sight Word | word recognition |
| Spelling | G1-552 Color the Right Spelling | the answer |
| Syllables | K-620 Color the Syllables | one colour per part |
| Word Writing | K-621 Color and Write the Word | the word's shape before writing it |
| Word Search | K-622 Coloring Word Search | the found word |
| Bingo | K-623 Color Bingo | the mark on the card |
| Picture Cards | K-624 Alphabet Coloring Cards | the card |
| Me, Family & Feelings | K-625 My Name Poster | the child's own name |

| Ordinal Numbers | K-626 Color the Letter in Its Place | the answer |

## Makers that do not take them (27), and why

| Makers | Reason |
|---|---|
| Number Lines · Doubles & Halves · Fractions · Money · Telling Time · Measurement & Size · Graphs & Data · Shapes & Geometry · Symmetry & Grid Copy · Maps & Coordinates | the model (line, part, coin, clock face, bar, shape, grid) carries the task; a fat numeral would cover it or add nothing |
| Word Problems · Rhyming Words · One & Many, Articles · Grammar · Vocabulary · Sentences · Reading Comprehension · Stories & Writing | the task is in running text or in sound: bubble letters do not read at sentence size and colouring says nothing about the meaning |
| Logic & Math Puzzles · Same & Different · Position Words · Mazes · Tangram · Pencil Control Lines | pictures, shapes or lines do the work: there is no letter or number to look at |
| Cursive · Crossword · Secret Code | the letter form is the lesson (cursive) or the letters are the child's own answers in small cells |

`scripts/makers/topic-map.js` is the list of makers (59 built; `health-safety` is not).
