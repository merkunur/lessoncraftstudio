'use strict';
/**
 * Teacher notes, English, thinking skills: the 20 lessons of the four Thinking Skills units (Daily Teaching System,
 * Stage D-3, 2026-11-25; plan decision 4: one unit per grade K-3, for morning work and centers, no year plan):
 * Look Closely and Think (K), Detective Thinking (Grade 1), Clues and Reasons (Grade 2), Logic Lab (Grade 3)
 * (design scripts/units/year/thinking-units.en.json, 2026-11-23). Each note was written from the live English pages the
 * lesson hands out, read at every level on contact sheets (lcs-stage-d/thinking/sheet-*.png) and from each type's
 * settings (rows, pairs, clues and pictures per level). Where the design said more than the page does, the note says
 * what the page does: G1-157 Picture Puzzles pairs every picture with itself at another size (big then small, or small
 * then big), so the lesson teaches that rule and keeps other relations for the spoken warm-up.
 * Pictures and puzzles change from copy to copy; a quoted sentence is one every copy prints, or a sentence to say.
 * The Grade 2 unit carries two Grade 1 points up one level: the town maze and the picture-clue puzzles at their
 * hardest level (lessons "1:mazes#shortest-way" and "1:logic-picture-clues#harder-level").
 * Every lesson has its routine (`routine`), printed under "What the class does".
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 1,850 letters in all, the routine included.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ---- Kindergarten: Look Closely and Think
    'K:same-different-visual': {
      title: 'Same or Different?',
      objective: 'Children look at every picture in a row and circle the one that is different, then find each picture\'s twin and join the two with a line.',
      routine: 'Day 1: line up four things on the rug, three the same and one different (three red crayons and a blue one; then three blocks and one bigger block). Point to each and the class whispers "same" or "different", then says what makes the odd one different: what it is, its color or its size. While the class closes their eyes, change one thing; they open their eyes and find it. Day 2: the pages at stations.',
      note: {
        mistake: 'Children circle the first picture that looks a little unusual without looking at the whole row, or circle two in one row. On the harder pages every picture in a row is the same kind of thing (all dinosaurs, all bugs), so a child who looks only at what the pictures are finds nothing.',
        words: 'Say: "Look at every picture in the row before you circle." "What is different about this one: what it is, its color, or its size?" For the pairs: "Find one picture, then hunt for its twin. Join them with a line." Same and Different has 4 rows of 4 pictures on Level 1, 4 rows of 5 on Level 2 and 5 rows of 6 on Level 3, where the pictures look very alike. Find the Pairs comes at one level: 6 pairs of shapes or toys in a grid.',
        watch: 'Right: one circle in each row, on the picture that is not like the others, and every picture joined to its twin once. A child who circles two in a row is guessing: ask "Which one is not like the others? Tell me why." A child who joins two shapes that differ in color has not looked closely yet.',
      },
    },
    'K:spot-the-difference': {
      title: 'Spot What Changed',
      objective: 'Children compare a top and a bottom picture part by part, circle the 3 big things that changed in the bottom one, and circle the 3 empty places where something is missing.',
      routine: 'Day 1: put five things on a tray and let the class look while you count slowly to ten. Cover the tray, take one thing away, uncover it and ask "What changed?" Play again, then swap a thing for another, turn one over or put a bigger one in its place. Then show a page on the board and model looking at one part of the top picture, then the same part of the bottom picture. Day 2: the pages at stations.',
      note: {
        mistake: 'Children look around the bottom picture at random, circle one change twice, or circle something that is the same in both. On What Is Missing? they circle a thing still there, not the empty place.',
        words: 'Say: "Look at one part of the top picture. Now find that part in the bottom picture. Same, or changed?" "Circle the change, then check one box." "Three boxes, three changes." A change can be something gone, something new, something swapped for another thing, or something bigger or smaller; on Level 3 a thing can also be flipped.',
        watch: 'Right: three circles in the bottom picture and three boxes checked. A child who has found two keeps looking at the parts not checked yet: cover the found ones with a finger. On the missing page each circle sits on an empty place. The answer key numbers each change.',
      },
    },
    'K:shadow-closure': {
      title: 'Shadows and Peekaboo Pictures',
      objective: 'Children match each picture to its shadow by its outline, then look at the top part of a picture and circle the whole picture it belongs to.',
      routine: 'Day 1: hold toys and classroom things in a flashlight beam so their shadows fall on the wall: which thing made this shadow? Turn one sideways and talk about how its outline changed. Then hide a picture card behind a folder and slide it up a little at a time until someone can name it, and ask what helped them know. Day 2: the pages at stations.',
      note: {
        mistake: 'Children join a picture to the shadow straight across from it or about the same size, not the one with the same outline, so two long thin shadows get swapped. On What Is It? they circle a picture of the same color as the part, not the one whose top has that shape.',
        words: 'Say: "Trace the edge of the shadow with your finger. Which picture has that same edge?" "Is it pointy? Round? Does it have legs, a handle, leaves?" For the part: "What could this be the top of? Which whole picture has this top?" Match the Shadow has 4 pairs on Level 1, 5 on Level 2 and 6 on Level 3. What Is It? shows a little more than half of each picture on Level 1 and less on each level after it.',
        watch: 'Right: every picture joined to one shadow and every shadow used once; on the part page, one circle in each row, on the whole picture whose top matches. A child who joins one picture to two shadows counts the lines: one line from each picture.',
      },
    },
    'K:mazes': {
      title: 'Find the Way Through a Maze',
      objective: 'Children look over a picture maze before they start, draw one line along the road from the start to the goal, and go back to try another road when they reach a dead end.',
      routine: 'Day 1: make a maze on the floor with painter\'s tape or chairs, with two dead ends. One child walks it while the class calls "keep going" or "dead end, go back". Then show a page on the board: the class finds the round teal start sign and the flag at the goal, and you trace slowly with a finger, saying where a road stops. Day 2: the pages, finger first, then pencil.',
      note: {
        mistake: 'Children draw straight toward the goal across the grass between the roads, keep pressing on at a dead end instead of going back, or start at the flag. Some lift the pencil and start again somewhere that looks closer.',
        words: 'Say: "Find the start: the round teal sign. Find the end: the flag." "Trace with your finger first. If the road stops, go back to the last place where it split and try the other way." "Your pencil stays on the road." The animal and its goal change from copy to copy (a hedgehog and an apple tree, a lamb and a haystack); each level has more roads and more dead ends.',
        watch: 'Right: one unbroken line inside the road from the teal start to the flag, never over the grass. A child who jumps across is guessing: let them trace again with a finger and say each turn. On the screen version the child draws along the road and taps Check. The answer key shows the way.',
      },
    },
    'K:grid-copy': {
      title: 'Copy the Picture Square by Square',
      objective: 'Children copy a picture onto an empty grid one square at a time, keeping their place row by row: on grids of 6 by 6 and 7 by 7, then on an 8 by 8 grid with a letter and a number for each square.',
      routine: 'Day 1: draw a 4 by 4 grid on the board and an empty twin beside it. Color three squares of the first. Point to the top row: "How many squares in from the left?" A child colors the same square in the twin. Go row by row, then check by laying a ruler under the same row of both grids. Day 2: the page; children may cover the finished rows with a strip of paper.',
      note: {
        mistake: 'Children copy the shape roughly instead of square by square, slip down a row partway through, or draw the picture facing the other way. On the labeled grid they count from the wrong corner.',
        words: 'Say: "Start at the top row. Count from the left: one, two, three. Color the same square." "Finished a row? Check it against the picture before you go on." Level 1 is a 6 by 6 grid, Level 2 a 7 by 7 grid, both without labels; Level 3 is 8 by 8 with letters A to H across and numbers 1 to 8 down: "Find the square under D, in row 3." Every page has two pictures to copy.',
        watch: 'Right: the same squares colored, in the same rows and columns, so the copy matches and faces the same way. Every picture faces one way only, so a flipped copy is wrong even when it looks nice. Check one row at a time with the child, never the whole picture at once.',
      },
    },
    'K:matrix-logic': {
      title: 'What Fits the Gap?',
      objective: 'Children notice that each row of a 3 by 3 picture grid holds one kind of picture and circle the piece that belongs in the empty box.',
      routine: 'Day 1: lay a 3 by 3 grid of real things on the rug: a row of crayons, a row of blocks, a row of spoons. While the class closes their eyes, take one away. Which kind of thing goes back, and why? Mix up the rows and play again, then let a child hide one. Day 2: the page; children say what the gap\'s row holds before they circle.',
      note: {
        mistake: 'Children choose the piece from another row, or the brightest piece, instead of reading across the gap\'s own row. A child who sees "a square" may circle any square-ish piece without checking it looks like the others in that row.',
        words: 'Say: "Read the row with the gap from left to right. What kind of picture lives in this row?" "Which piece belongs in this row?" Then: "Check the other rows. Does each row hold one kind?" The page comes at one level: a 3 by 3 grid with one empty box and three pieces to choose from.',
        watch: 'Right: one circle, on the piece that is the same as the other pictures in the gap\'s row. Ask the child to name the row out loud ("this is the square row") before circling. For more, replay the rug game with rows of look-alike things.',
      },
    },
    // ---- Grade 1: Detective Thinking
    '1:find-the-differences': {
      title: 'Find and Count the Differences',
      objective: 'Children circle every difference between two pictures, including things that are gone, write how many they found, and find the 4 differences between mirror pictures, folding the page to check.',
      routine: 'Day 1: stand in front of the class. Everyone looks, then turns around while you change three things (roll up a sleeve, take off your badge, move a pencil to the other hand). How many changes? Count on fingers, then check. Later, fold the mirror page on its line and hold it to the window: what does not line up is a difference.',
      note: {
        mistake: 'Children stop after a few differences, count one twice, or miss things that are gone. On the mirror page they circle the flip itself, though the whole picture is flipped.',
        words: 'Say: "Go part by part: the sky, the ground, the left side, the right side." "Something gone counts too. Is there an empty place?" "Circle, then count your circles, then write the number." Mirror page: "Picture 2 is flipped like a mirror. That is not a difference. Look for what is still different." How Many Differences? hides 3 or 4 on Level 1, 3 to 6 on Level 2 and 4 to 6 on Level 3; from Level 2 on, a thing can also be flipped or moved.',
        watch: 'Right: a circle on each difference and a number in the box that matches them; a child whose number and circles disagree recounts the circles. On the mirror page, 4 circles, 2 in each pair, and 4 boxes checked.',
      },
    },
    '1:mazes': {
      title: 'Plan the Route',
      objective: 'Children look at the whole maze before drawing, plan the way, follow each tangled string to its kite or balloon, and find a way past the things the page says to avoid.',
      routine: 'Day 1: show a big maze on the board. Children find the start, the goal and a dead end, and plan aloud: "From the start, the first turn goes ___." Then tangle three strings of yarn on a table, each tied to a toy: whose string is it? Day 2: the pages.',
      note: {
        mistake: 'Children draw before looking and hit a dead end, jump strings at a crossing, or take a road with a thing to avoid.',
        words: 'Say: "Eyes first, pencil second." Strings: "Keep your finger on ONE string. At a crossing, stay on yours." Avoid page: "Is anything from the strip at the bottom on your road?" The strings are 3, 4 and 5 on Levels 1 to 3.',
        watch: 'Right: one line inside the roads; each number once above a kite or balloon; on the avoid page, a road with nothing from the strip on it.',
      },
    },
    '1:grid-copy': {
      title: 'Draw It with the Grid',
      objective: 'Children copy a drawing onto an empty grid one square at a time, matching the lines each square holds, then draw it once more without the grid.',
      routine: 'Day 1: draw a simple house over a 2 by 2 grid on the board, with an empty 2 by 2 grid beside it. Cover every square but the top left one: where does a line come in, where does it leave? Draw those lines in the empty grid\'s top left square, then uncover the next square. After four squares, the house is there. Day 2: the page; a sticky note can cover the squares not yet copied.',
      note: {
        mistake: 'Children draw the whole picture at once and lose the grid, so parts come out too big or in the wrong square, or they copy each square but the lines do not meet at the edges.',
        words: 'Say: "One square at a time. Where does the line come into this square? Where does it leave?" "Check the edges: your line should meet the line in the next square." Then, in the big space: "Now draw it again without the grid. Look back at your copy." The picture changes from copy to copy (a dinosaur, a camper, a cat); Level 1 has big squares and Level 3 smaller ones.',
        watch: 'Right: each square of the copy holds the same lines as the same square of the picture, so every part sits in its place; the last drawing shows the same thing. Praise a careful square more than a pretty drawing.',
      },
    },
    '1:picture-analogies': {
      title: 'Picture Analogies: Big and Little',
      objective: 'Children say how the first two pictures of a row go together (the same thing drawn big, then small, or small, then big) and circle the picture that completes the second pair the same way.',
      routine: 'Day 1: play "the same way" aloud before the page. "A big block, a little block. A big ball, a ___." Then other pairs children know: "A bird has wings, a fish has ___." "A pencil writes, scissors ___." Children make up a pair for a partner to finish. Day 2: the page, where every pair is about size; children say the rule of each row before they circle.',
      note: {
        mistake: 'Children circle the right thing at the wrong size: the copy of the picture just before the gap. Some decide every row goes from big to little, though some rows go from little to big.',
        words: 'Say: "Look at the first pair. How do they go together? Big, then little? Or little, then big?" "Now say it for the second pair: big orange, ___ orange." "Which choice finishes it the same way?" The page comes at one level: 4 rows, each with three choices: the second thing small, the second thing big, and something else.',
        watch: 'Right: one circle in each row, on the second thing drawn at the size the rule asks for. A child who picks the right thing at the wrong size has the pair but not the rule: have them say the rule out loud, then look again.',
      },
    },
    '1:picture-sudoku': {
      title: '4x4 Picture Sudoku',
      objective: 'Children fill a 4 by 4 picture sudoku so that every row, column and box of four has each of the four pictures once, checking each row and column as they go.',
      routine: 'Day 1: tape a 4 by 4 grid on a table, with lines that mark four boxes of four, and use four kinds of things (blocks, crayons, erasers, counters), some already placed. Children take turns placing one thing and say why it fits: "not in this row, not in this column, not in this box." Then model on the board how to start with the cell that has the fewest choices. Day 2: the page; children may draw a quick sign for each picture.',
      note: {
        mistake: 'Children place a picture because it fits its row and forget the column or the box, so a picture shows up twice. Some fill the cells in reading order instead of starting where only one picture can go.',
        words: 'Say: "Pick an empty cell. What is already in its row? In its column? In its box? Which picture is left?" "Start where three pictures are already in the row." Level 1 gives 10 of the 16 pictures, Level 2 gives 8 and Level 3 gives 6; every puzzle has one answer. The four pictures are shown under the grid.',
        watch: 'Right: every row, column and 2 by 2 box shows the four pictures once. To check, the child runs a finger along each row, then each column, naming the four pictures. If a picture shows up twice, erase the last one placed, not the whole grid.',
      },
    },
    '1:logic-picture-clues': {
      title: 'Logic with Picture Clues',
      objective: 'Children read the picture clues beside each name (a circled picture means the child has it, a crossed-out one means the child does not), mark the grid, and circle the one picture each child has.',
      routine: 'Day 1: three children stand up, each holding a hidden card (an apple, a ball, a book). On the board, write their names and draw a big 3 by 3 grid. Give picture clues: beside one name, the ball crossed out; beside another, the apple circled. After each clue the class says where the X or the check goes. Work out the last child\'s card together, then turn the cards over. Day 2: the page.',
      note: {
        mistake: 'Children read a crossed-out picture as the child\'s picture, or circle an answer from one clue without marking the rest of the row and column. With a circled clue they forget that no one else can have that picture.',
        words: 'Say: "A circle means yes, this child has it. A cross means no, this child does not." "When a child has a picture, cross out the rest of that child\'s row, and that picture for everyone else." "When two are crossed out, the last one is the answer." Level 1 gives only circled clues, Level 2 both kinds, Level 3 only crossed-out clues. Each page has two puzzles of three children and three pictures.',
        watch: 'Right: each child with one picture circled in the answer strip, and no picture given to two children. For one answer of each puzzle, ask "Which clue told you that?"',
      },
    },
    // ---- Grade 2: Clues and Reasons
    '2:find-differences': {
      title: 'Find 10 Differences and Write About Them',
      objective: 'Children circle 10 differences in two pairs of pictures, then write one sentence about each of 3 differences, using the words in the two strips.',
      routine: 'Day 1: show two versions of a drawing on the board. Partners find a difference and say it as a full sentence: "In picture 2, the bird is missing." Write three of their sentences on chart paper and underline the thing and the word that tells what happened to it. Day 2: the page with 10 differences. Another day: the writing page.',
      note: {
        mistake: 'Children find the big differences and stop at 7 or 8, or check two boxes for one change. In the sentences they name only the thing ("the sun") without saying what happened to it, or use "changed" for everything.',
        words: 'Say: "Five in this pair, five in that pair. Check a box under the pair for each one." For the writing: "Say what it is and what happened to it: In picture 2, the tree is smaller." "Pick the strip word that tells exactly what happened; use changed only when one thing became another." Every sentence line starts "In picture 2,". The words in the strips change from copy to copy.',
        watch: 'Right: 10 boxes checked, 5 under each pair, and three sentences that each name a thing and what happened to it, with a period at the end. Any true sentence about a circled difference stands, even in the child\'s own words.',
      },
    },
    '1:mazes#shortest-way': {
      title: 'The Shortest Way Through Town',
      objective: 'Children compare several routes through a town maze, draw the shortest way for the vehicle, count the street pieces it takes and write the number in the box.',
      routine: 'Day 1: draw a small grid of streets on the board with a dot in the middle of each street piece and two different ways from a house to the school. Children count the street pieces (one dot each) along each way, then say which way is shorter and by how many. Ask: "Can anyone find a way that is shorter still?" Day 2: the page; partners compare their numbers and the ways they drew.',
      note: {
        mistake: 'Children draw the first way that reaches the goal, not the shortest one, or skip or double-count a dot, so their number is off by one.',
        words: 'Say: "There are many ways. Which one uses the fewest street pieces?" "Each street piece has one dot in its middle. Touch each dot on your line and count." "Check: is there a shortcut you did not try?" The box under the map shows one street piece "= 1". This lesson hands out the hardest level of the town maze, and the middle level as the easier page.',
        watch: 'Right: a line along the streets from the vehicle to the goal with no detour, and the number of pieces it takes in the box. When two children have different numbers, they count each other\'s way together. The answer key shows the shortest way.',
      },
    },
    '1:logic-picture-clues#harder-level': {
      title: 'Picture Clue Logic: Every Clue Says No',
      objective: 'Children use crossed-out picture clues to work out what each child cannot have, mark the grid, circle the one picture each child has, and tell a partner which clue decided each answer.',
      routine: 'Day 1: draw a 3 by 3 grid for Ana, Ben and Cal on the board and give only "no" clues: "Ana does not have the cat. Ben does not have the cat. Ben does not have the dog." After each clue the class says which boxes get an X. Then: who has the cat? What is left for Ben? For Ana? Partners explain one step: "Ben has the fish because the cat and the dog are crossed out." Day 2: the page; partners compare and explain one answer each.',
      note: {
        mistake: 'With no circled clue to start from, children guess an answer first. They cross out in a child\'s row but forget that once a child has a picture, that picture is crossed out for the others too.',
        words: 'Say: "No clue on this page says yes. Every clue says no. Cross out, then look for a row or a column with only one empty box." "Which clue decided this answer? Point to it." This lesson hands out the hardest level of the Grade 1 puzzles (three crossed-out clues for each puzzle); the easier page mixes circled and crossed-out clues.',
        watch: 'Right: each child with one picture circled and no picture used twice. Listen for a reason that names a clue ("the first clue crossed out the cat, so"), not "I just knew".',
      },
    },
    '2:logic-grid': {
      title: 'Logic Grids with Three Clues',
      objective: 'Children read clues, check what must be true and cross out what cannot, circle each child\'s picture, and read a solved grid to judge sentences true or false.',
      routine: 'Day 1: a grid of three names and three pictures on the board. Read one clue at a time: "Check or X? Where?" Then: "Mia has the dog or the cat." What does that say about the third picture? Chart the rules: yes, a check; no, an X; either-or, an X on the third picture. Day 2: the clue pages; later, the true-or-false page.',
      note: {
        mistake: 'Children check a "does not have" clue, read "The child with the duck is not Owen" as "Owen has the duck", or miss that an either-or clue rules out the third picture. On the true-or-false page they circle the mark in the box, so a true "does not have" sentence gets an X.',
        words: 'Say: "Does the clue say yes or no?" "Adam has the dog or the mouse, so not the parrot: X for Adam under the parrot." "Two X\'s in a row: the last box gets the check." True or false: "Find the box. Does it say the same as the sentence?"',
        watch: 'Right: one check in every row and column, the rest crossed out, the answers circled; on the reading page, the check mark for true sentences, the X for false ones.',
      },
    },
    // ---- Grade 3: Logic Lab
    '3:two-attribute-sort': {
      title: 'Venn Diagram Sorts',
      objective: 'Children sort numbered pictures into a Venn diagram by two attributes at once, kind and size: the middle for big pictures of the kind, outside the circles for small pictures of other things.',
      routine: 'Day 1: two hula hoops (or yarn circles) on the floor, overlapping. Label one "red" and one "blocks". Children place classroom things: a red block in the middle, a red crayon in the red circle only, a blue block in the block circle only, a green eraser outside both. Each child says why: "It is red AND it is a block." Day 2: the page; children write each picture\'s number, not the picture.',
      note: {
        mistake: 'Children put a big picture of the kind in one circle instead of the middle, or leave out the pictures that fit neither. Some sort by size alone because size is easiest to see.',
        words: 'Say: "Ask two questions about every picture. Is it this kind? Is it big?" "Yes and yes: the middle. Yes and no: the left circle only. No and yes: the right circle only. No and no: the box outside the circles." The left circle shows its kind with a picture and a word; the right circle is for big pictures. Level 1 sorts 8 pictures, Level 2 sorts 10 and Level 3 sorts 12.',
        watch: 'Right: every number written once, in the place its two answers give it. Ask about one number in the middle: "Why does it go there?" The answer key shows each number\'s place.',
      },
    },
    '3:two-attribute-sort~logic-cabinet': {
      title: 'What Completes the Puzzle?',
      objective: 'Children find what each row shares (the same picture) and what each column shares (the same size) in a 3 by 3 grid, and circle the one picture that fits the empty cell on both counts.',
      routine: 'Day 1: on the board, draw a 3 by 3 grid of letters in three sizes: a row of A\'s, big, medium and small, then a row of B\'s, then C\'s, with one cell empty. Ask: "What does every row share? What does every column share?" A child names the missing letter and its size, then defends it to the class. Day 2: the page; children say the row rule and the column rule before they circle.',
      note: {
        mistake: 'Children use only one rule: they circle the right picture at the wrong size, or a picture of the right size that belongs to another row. The choices are made to catch exactly that.',
        words: 'Say: "What do the pictures in this row have in common? And in this column?" "The empty cell must follow both: this picture AND this size." "Some choices follow only one rule. Which one follows both?" The page comes at one level: one grid of 3 by 3 and four choices.',
        watch: 'Right: one circle, on the choice that is the row\'s picture at the column\'s size. A child who picked a one-rule choice says which rule it breaks. For more, redo the letter grid on the board with three shapes in three colors.',
      },
    },
    '3:latin-square-sudoku': {
      title: '6x6 Picture Sudoku',
      objective: 'Children fill a 6 by 6 picture sudoku so that every row, column and box has each of the six pictures once, starting with the row, column or box that has the fewest empty cells.',
      routine: 'Day 1: show a 6 by 6 page on the board. The class finds the row, column or box with the most pictures already in it and lists what is missing there. Test each empty cell against its column and its box until one cell has only one choice. Model writing a small mark for each picture so that drawing does not slow anyone down. Day 2: the page; partners swap pages to check one row and one column.',
      note: {
        mistake: 'Children fill a row left to right, then meet a picture that would have to go in twice. They forget that a box is 3 cells across and 2 down, so they check the wrong group of cells.',
        words: 'Say: "Find the place with the most pictures. What is missing there?" "This cell: what is in its row, its column, its box? What is left?" "Each box is 3 across and 2 down." Level 1 gives 24 of the 36 pictures, Level 2 gives 20 and Level 3 gives 17; each puzzle has one answer.',
        watch: 'Right: each row, column and box shows the six pictures once. If a picture shows up twice, the child goes back to the cell where it was decided and checks it against its box. Praise a reason ("only the dog was left in this box") more than speed.',
      },
    },
    '3:logic-grids': {
      title: 'Logic Grids with Six Clues',
      objective: 'Children use every clue to cross out what cannot be true and check what must be true until each of four children has one answer, then solve puzzles where each child has one picture from each of two sets.',
      routine: 'Day 1: give four children a hidden card each and write six clues on the board, one at a time. After each clue the class says which boxes get an X. Stop when a row has three X\'s: "Which box gets the check, and what does that check cross out in its column?" Day 2: the 4 by 4 page. Another day: show how the bottom grid of the two-picture page links the two sets.',
      note: {
        mistake: 'Children mark each clue\'s X and stop, missing that three X\'s in a row or column give a check that crosses out its column. On the two-picture page they fill one grid and forget that a link clue joins two pictures in the bottom grid too.',
        words: 'Say: "After every check, cross out the rest of its row and its column." "Three X\'s in a row or column? The last box gets the check." Link clue: "Whoever has the apple also has the turtle. Find the apple and the turtle in the bottom grid and check that box." The 4 by 4 page has two puzzles of six clues; its Level 3 adds clues such as "The child with the lion is not Liam."',
        watch: 'Right: one check in each row and column of every grid, and answers that agree across the grids (the child with the apple in one grid has the turtle in the other).',
      },
    },
  },
};
