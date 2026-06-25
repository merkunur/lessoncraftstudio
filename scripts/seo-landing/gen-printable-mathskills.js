#!/usr/bin/env node
/*
 * gen-printable-mathskills.js — SEO landing program Part 2, Batch 2.
 * Appends the 18 (type,level) themed-math-skill landings to en.json. Reads the structural
 * coordinates from printable-mathskills-coords.json (enum-printable-mathskills.js output:
 * slug/type/level/mode/standard/strand/canonicalDeckSlug/collapseSiblings) and merges the
 * authored prose/title/meta below (keyed by slug). Themeless coordinate (theme:"") + the
 * distinct per-level mode → no coordKey collision. Idempotent; format-fidelity guard.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', '..', 'frontend', 'content', 'seo-landing', 'en.json');
const COORDS = require('./printable-mathskills-coords.json').coordinates;

const LEVEL_LABEL = { kindergarten: 'Kindergarten', 'grade-1': 'Grade 1', 'grade-2': 'Grade 2', 'grade-3': 'Grade 3' };
const TYPE_NOUN = { fractions: 'Fractions', geometry: 'Geometry', measurement: 'Measurement', 'arrays-multiplication': 'Multiplication', 'graphing-data': 'Graphing', 'number-charts': 'Number Charts' };
const carouselLabel = (c) => (LEVEL_LABEL[c.level] || c.level) + ' ' + (TYPE_NOUN[c.type] || c.type);

// Authored prose per landing slug. p1 MUST contain the level label (slotTokens lint).
// No banned phrases; ≥200 words p1+p2+p3; printable-only voice (no "interactive play").
const PROSE = {
  'fractions-grade-2': {
    eyebrow: 'Fraction Worksheet',
    h1: 'Grade 2 Fraction Worksheets: Halves, Thirds, and Fourths',
    title: 'Fraction Worksheets for Grade 2 – Halves, Thirds & Fourths | Free Printable PDF',
    metaDescription: 'Free printable Grade 2 fraction worksheets — partition shapes into halves, thirds, and fourths and share a set into equal groups. Download the PDF, no sign-up.',
    p1: "These Grade 2 fraction worksheets introduce equal parts by cutting shapes and sharing sets fairly. On the partition pages a circle or rectangle is divided into two, three, or four equal pieces, and the child names the parts — halves, thirds, fourths — then checks that every piece is the same size. Other sheets share a group of objects equally among friends, so the child sees that a fraction can describe part of a set as well as part of a shape. A few pages ask whether a sharing is fair, and the child decides if the pieces really are equal or if one slice is bigger than the rest. Recognising equal parts, naming halves and fourths, and splitting both shapes and sets into fair shares are the foundations a second grader needs before formal fractions begin. The shapes are large and the cuts are clear, so a child can trace each line, count the pieces, and take the idea of equal one shape at a time.",
    p2: "In this set the work stays with halves, thirds, and fourths, the parts a second grader meets first. A child folds or cuts a shape into equal pieces, names what one piece is called, and shares a small set so everyone gets the same amount. The pictures are simple and the question is always the same gentle one: are the parts truly equal?",
    p3: "When your child is naming halves, thirds, and fourths with confidence, you can print more of these fraction worksheets as a PDF and keep going on paper. Everything here is free, with no sign-up and no account. There are no timers, no scores, and no badges, so a child can take each shape slowly and fix an uneven cut without any worry. Once equal parts feel easy, the Grade 3 fraction worksheets name fractions, place them on a number line, and compare which is bigger. You can also browse the full set of printable fraction worksheets to find the page that fits today.",
  },
  'fractions-grade-3': {
    eyebrow: 'Fraction Worksheet',
    h1: 'Grade 3 Fraction Worksheets: Name, Compare, and Place Fractions on a Number Line',
    title: 'Fraction Worksheets for Grade 3 – Number Line, Equivalent & Compare | Free Printable PDF',
    metaDescription: 'Free printable Grade 3 fraction worksheets — name and shade fractions, place them on a number line, find equivalent fractions, and compare. Download the PDF, no sign-up.',
    p1: "These Grade 3 fraction worksheets move from equal parts to naming, placing, and comparing fractions. On the naming pages a child looks at a shaded shape and writes the fraction, or shades a shape to match a fraction that is given. Number-line pages ask the child to mark where a fraction sits between zero and one, which builds the idea that a fraction is a number with its own place. Other sheets pair fractions that name the same amount so the child meets equivalent fractions, and comparison pages ask which of two fractions is bigger. A final group works backward from a part to find the whole. Writing a fraction, locating it on a number line, spotting equivalents, and comparing sizes are exactly the third-grade fraction skills these pages cover. The diagrams and number lines stay roomy, so a child can count the parts, mark the line carefully, and check each answer without any rush.",
    p2: "This set reads and writes fractions, then puts them in order. A child names the shaded part, marks a fraction on a number line, decides whether two fractions are equal, and circles the larger of a pair. The shapes and lines are clear, and the steps are short, so the move from equal pieces to fractions as numbers happens one careful page at a time.",
    p3: "Once your child can name fractions and compare them, you can print more of these fraction worksheets as a PDF and keep practising on paper. It is all free, with no sign-up and no account, and there are no timers or scores to hurry a careful count of the parts. A wrong answer is simply a reason to look at the shaded shape again. You can step back to the Grade 2 fraction worksheets for a gentler warm-up with halves and fourths, or browse every printable fraction worksheet to choose the next page.",
  },
  'geometry-kindergarten': {
    eyebrow: 'Geometry Worksheet',
    h1: 'Kindergarten Geometry Worksheets: Count the Sides and Sort Shapes',
    title: 'Shape Worksheets for Kindergarten – Count Sides & Sort Shapes | Free Printable PDF',
    metaDescription: 'Free printable Kindergarten geometry worksheets — count the sides of flat shapes and sort them by how many sides they have. Download the PDF, no sign-up needed.',
    p1: "These Kindergarten geometry worksheets help a child look closely at flat shapes and notice what makes each one different. On the counting pages a child traces the edge of a circle, triangle, square, or rectangle and counts how many sides it has, learning that a triangle has three and a square has four. The sorting pages put a mix of shapes together and ask the child to group them by their number of sides, so shapes that share a feature end up together. Looking carefully, counting sides, and sorting by a single attribute are the first steps in geometry, and they sharpen the same noticing skills a child uses everywhere. The shapes are big and friendly, with plenty of room to trace around the outside, so a child who is just learning the names can take each shape slowly and count the sides out loud.",
    p2: "In this set a child counts the sides of one shape at a time, then sorts a small group by how many sides each has. There is no measuring and no numbers beyond a quick count to three or four — just looking at a shape, running a finger around it, and deciding where it belongs. The pictures are clear and the task is calm.",
    p3: "When your child can count sides and sort shapes with ease, you can print more of these shape worksheets as a PDF and keep exploring on paper. Everything is free, with no sign-up and no account, and there are no timers or scores, so a child can trace each shape at their own pace. A mix-up is just a chance to count the sides again. When kindergarten shapes feel easy, the Grade 2 geometry worksheets look at faces, edges, and corners, and you can browse the full set of printable geometry worksheets any time.",
  },
  'geometry-grade-2': {
    eyebrow: 'Geometry Worksheet',
    h1: 'Grade 2 Geometry Worksheets: Faces, Edges, Corners, and Solid Shapes',
    title: 'Geometry Worksheets for Grade 2 – Faces, Edges & Solid Shapes | Free Printable PDF',
    metaDescription: 'Free printable Grade 2 geometry worksheets — count faces, edges, and corners, sort flat vs solid shapes, and find lines of symmetry. Download the PDF, no sign-up.',
    p1: "These Grade 2 geometry worksheets ask a child to look past a shape's name and count its parts. On the attribute pages the child counts the faces, edges, and corners of solid shapes like cubes, cones, and cylinders, and learns to tell a flat shape from a solid one. A shape-sorter page groups shapes by the features they share, and other sheets find solid shapes hiding in everyday objects. A set of mirror-line pages asks whether a folded shape matches itself, an early look at symmetry. Counting faces and edges, sorting flat from solid, and noticing lines of symmetry are exactly the second-grade geometry skills these pages build. The drawings are large and clearly labelled, so a child can point at each face, count the edges one by one, and decide what a shape is made of without any rush.",
    p2: "This set works with both flat and solid shapes. A child counts the faces of a cube, the edges of a prism, and the corners of a pyramid, sorts a group into flat and solid, and folds a picture to check for a line of symmetry. The steps are short and the shapes are roomy, so each feature can be counted carefully, one at a time.",
    p3: "When your child can count faces, edges, and corners and spot a line of symmetry, you can print more of these geometry worksheets as a PDF and keep going on paper. It is all free, with no sign-up and no account, and there are no timers or scores to rush a careful count. A missed edge is just a reason to walk around the shape again. The Grade 3 geometry worksheets move on to quadrilaterals, right angles, and area, and you can browse every printable geometry worksheet to pick the next page.",
  },
  'geometry-grade-3': {
    eyebrow: 'Geometry Worksheet',
    h1: 'Grade 3 Geometry Worksheets: Quadrilaterals, Right Angles, Perimeter, and Area',
    title: 'Geometry Worksheets for Grade 3 – Quadrilaterals, Perimeter & Area | Free Printable PDF',
    metaDescription: 'Free printable Grade 3 geometry worksheets — sort quadrilaterals, hunt for right angles, and measure perimeter and area. Download the PDF, no sign-up needed.',
    p1: "These Grade 3 geometry worksheets dig into quadrilaterals and the space shapes take up. On the quadrilateral pages a child sorts four-sided shapes into squares, rectangles, and rhombuses, learning what makes each group its own kind. Right-angle pages send the child hunting for square corners, and a set of mirror-line pages counts how many lines of symmetry a shape has. The measuring pages walk the edge of a shape to find its perimeter, and others show that two shapes can cover the same area while looking completely different, or share a perimeter while holding different space inside. Sorting quadrilaterals, finding right angles, and measuring perimeter and area are the third-grade geometry skills these pages cover. The figures are drawn on clear grids, so a child can count the units along each side and check perimeter and area square by square, without any hurry.",
    p2: "This set names shapes and then measures them. A child sorts quadrilaterals by their sides and corners, marks the right angles, counts the units around a shape for its perimeter, and counts the squares inside for its area. The grids are clear and the steps are short, so each count is easy to follow and easy to check.",
    p3: "Once your child can sort quadrilaterals and measure perimeter and area, you can print more of these geometry worksheets as a PDF and keep working on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to rush a careful count of the units. A wrong total is just a reason to walk the edge again. You can revisit the Grade 2 geometry worksheets for a lighter look at faces and edges, or browse the full set of printable geometry worksheets to find today's page.",
  },
  'measurement-kindergarten': {
    eyebrow: 'Measurement Worksheet',
    h1: 'Kindergarten Measurement Worksheets: Heavy or Light?',
    title: 'Measurement Worksheets for Kindergarten – Heavy or Light | Free Printable PDF',
    metaDescription: 'Free printable Kindergarten measurement worksheets — compare two objects and decide which is heavier and which is lighter. Download the PDF, no sign-up needed.',
    p1: "These Kindergarten measurement worksheets help a child compare how heavy things are without any numbers at all. On each page two objects sit side by side, often on a little balance, and the child decides which one is heavier and which one is lighter. A big stone next to a feather, a full basket next to an empty one — the pictures make the difference easy to feel, and the child circles or marks the heavier object. Comparing weight by looking, and using the words heavier and lighter, is one of the first measurement ideas a young child meets, long before any scale or unit. The drawings are large and friendly, and the choice is always between just two things, so a child can think it through calmly, picture lifting each one, and choose without any pressure.",
    p2: "In this set a child compares two objects at a time and names which is heavier and which is lighter. There is nothing to count and nothing to measure with a ruler — just a careful look and an everyday judgement about weight. The pictures are clear, the comparison is gentle, and the words heavier and lighter become familiar one page at a time.",
    p3: "When your child can compare weight and use the words heavier and lighter, you can print more of these measurement worksheets as a PDF and keep going on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to hurry a quiet comparison. A different answer is simply a chance to picture each object again. When this feels easy, the Grade 1 measurement worksheets begin to measure length with units, and you can browse the full set of printable measurement worksheets whenever you like.",
  },
  'measurement-grade-1': {
    eyebrow: 'Measurement Worksheet',
    h1: 'Grade 1 Measurement Worksheets: Measure Length with Units and Order by Size',
    title: 'Measurement Worksheets for Grade 1 – Measure Length & Order by Size | Free Printable PDF',
    metaDescription: 'Free printable Grade 1 measurement worksheets — measure length with cube units and order objects from short to long. Download the PDF, no sign-up needed.',
    p1: "These Grade 1 measurement worksheets begin to measure length using simple units a child can count. On the cube-by-cube pages a row of identical cubes lines up beneath an object, and the child counts the cubes to find how long the object is, learning that length is measured in equal units laid end to end. The ordering pages show three or four objects and ask the child to put them in order from short to long, or from long to short. Measuring with units and ordering by length are the first real measurement skills, the step beyond simply saying which looks bigger. The pictures are large and the cubes are easy to count, so a child can line up a finger with each unit, count carefully, and write the length without any rush.",
    p2: "In this set a child counts equal units to measure how long something is, then puts a small group of objects in order by length. The cubes are clear and the rows are short, so counting the units is calm work, and ordering from short to long is a matter of comparing the counts. There are no rulers yet — just counting equal lengths.",
    p3: "When your child can measure with units and order objects by length, you can print more of these measurement worksheets as a PDF and keep practising on paper. It is all free, with no sign-up and no account, and there are no timers or scores to rush a careful count of the units. A miscount is just a reason to line the cubes up again. The Grade 2 measurement worksheets move on to measuring with tools and comparing how much longer one thing is, and you can browse every printable measurement worksheet to choose the next page.",
  },
  'measurement-grade-2': {
    eyebrow: 'Measurement Worksheet',
    h1: 'Grade 2 Measurement Worksheets: Measure with Tools and Compare Lengths',
    title: 'Measurement Worksheets for Grade 2 – Measure with a Ruler & Compare | Free Printable PDF',
    metaDescription: 'Free printable Grade 2 measurement worksheets — measure objects with a ruler in units and work out how much longer one object is than another. Download the PDF, no sign-up.',
    p1: "These Grade 2 measurement worksheets measure length with a tool and then compare the results. On the measuring pages a child reads a ruler or unit scale lined up against an object and writes down its length in units. The comparison pages place two objects together and ask how much longer one is than the other, which turns measuring into a small subtraction with units. Measuring with a tool, recording a length, and comparing two lengths to find the difference are exactly the second-grade measurement skills these pages build. The rulers and objects are drawn clearly, with units that are easy to read, so a child can line the object up with the scale, read the length carefully, and work out the difference one step at a time.",
    p2: "This set reads a measuring tool and then compares. A child measures one object, measures another, and answers how much longer the first is than the second. The scales are clear and the numbers stay small, so reading the length is straightforward and finding the difference is a gentle next step rather than a leap.",
    p3: "When your child can measure with a tool and compare two lengths, you can print more of these measurement worksheets as a PDF and keep going on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to hurry a careful reading of the scale. A wrong length is just a reason to line the ruler up again. You can step back to the Grade 1 measurement worksheets for counting units, or browse the full set of printable measurement worksheets to find today's page.",
  },
  'measurement-grade-3': {
    eyebrow: 'Measurement Worksheet',
    h1: 'Grade 3 Measurement Worksheets: Temperature and Building with Cubes',
    title: 'Measurement Worksheets for Grade 3 – Temperature & Volume | Free Printable PDF',
    metaDescription: 'Free printable Grade 3 measurement worksheets — read whether things are hot or cold and count cubes to compare how much space a tower fills. Download the PDF, no sign-up.',
    p1: "These Grade 3 measurement worksheets look at two everyday measures: temperature and the space objects fill. On the hot-or-cold pages a child reads simple pictures and decides whether something is hot or cold, warmer or cooler, building the language of temperature before any thermometer scale. The cube-tower pages ask the child to count the cubes that make up a tower and compare how much space different towers fill, an early, hands-on look at volume. Reading temperature in everyday terms and counting cubes to compare how much space something takes up are the measurement ideas these pages explore. The pictures are large and clear, and the counts stay small, so a child can think through each comparison calmly, count the cubes one at a time, and decide without any hurry.",
    p2: "This set works with warmth and with space. A child sorts pictures into hot and cold, decides which of two things is warmer, and counts the cubes in a tower to see which fills more space. There is nothing to rush — just a careful look at each picture and a small, steady count of the cubes.",
    p3: "When your child is comfortable comparing temperature and counting cubes, you can print more of these measurement worksheets as a PDF and keep exploring on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to hurry a careful count. A different answer is just a chance to look at the picture again. You can step back to the Grade 2 measurement worksheets for measuring length, or browse the full set of printable measurement worksheets whenever you like.",
  },
  'arrays-multiplication-grade-2': {
    eyebrow: 'Multiplication Worksheet',
    h1: 'Grade 2 Multiplication Array Worksheets: Rows, Columns, and Repeated Addition',
    title: 'Multiplication Array Worksheets for Grade 2 – Rows, Columns & Equal Groups | Free Printable PDF',
    metaDescription: 'Free printable Grade 2 multiplication array worksheets — count rows and columns, turn equal groups into repeated addition, and meet the idea of times. Download the PDF, no sign-up.',
    p1: "These Grade 2 multiplication array worksheets build the idea of times from things a child can see and count. On the array pages a grid of pictures sits in neat rows and columns, and the child counts the rows, counts how many are in each row, and writes the repeated addition that matches — three rows of four is four plus four plus four. Other sheets gather objects into equal groups and ask how many there are altogether, or split a set into fair shares so the child meets grouping and sharing side by side. Counting rows and columns, turning equal groups into repeated addition, and seeing how repeated addition becomes multiplication are exactly the readiness skills a second grader needs. The arrays are large and evenly spaced, so a child can point along each row, count the groups, and write the matching sum without any rush.",
    p2: "In this set a child sees multiplication as equal groups before any times tables. They count the rows and columns of an array, write it as repeated addition, and decide how many groups a set makes. The pictures are clear and the numbers stay small, so the jump from adding equal groups to the idea of times feels natural rather than sudden.",
    p3: "When your child can read an array and write it as repeated addition, you can print more of these multiplication worksheets as a PDF and keep going on paper. It is all free, with no sign-up and no account, and there are no timers or scores to rush a careful count of the rows. A miscount is just a reason to point along the array again. The Grade 3 multiplication worksheets move on to facts, missing factors, and dividing into equal groups, and you can browse every printable multiplication worksheet to choose the next page.",
  },
  'arrays-multiplication-grade-3': {
    eyebrow: 'Multiplication Worksheet',
    h1: 'Grade 3 Multiplication and Division Worksheets: Facts, Arrays, and Equal Groups',
    title: 'Multiplication & Division Worksheets for Grade 3 – Arrays, Missing Factors & Equal Groups | Free Printable PDF',
    metaDescription: 'Free printable Grade 3 multiplication and division worksheets — read arrays, find the missing factor, use the commutative property, and divide into equal groups. Download the PDF, no sign-up.',
    p1: "These Grade 3 multiplication and division worksheets put arrays to work on real facts. On the array pages a child reads a grid of rows and columns and writes the multiplication it shows, then meets the idea that the order of the factors does not change the product. Missing-factor pages give a product and one factor and ask for the other, the first taste of division thinking. Other sheets divide a set into equal groups and ask how many are in each group, or how many groups there are, so multiplication and division sit together as two sides of the same idea. Reading arrays, finding a missing factor, using the commutative property, and dividing into equal groups are the third-grade skills these pages cover. The arrays and groups are drawn clearly, so a child can count the rows, check the product, and reason out the missing number one step at a time.",
    p2: "This set connects multiplication and division. A child reads an array as a fact, flips the factors to see the product stay the same, finds a missing factor, and shares a set into equal groups. The grids and groups are clear and the facts stay within a friendly range, so each step from times to sharing is easy to follow.",
    p3: "Once your child can read arrays and find missing factors, you can print more of these multiplication and division worksheets as a PDF and keep working on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to rush a careful count. A wrong product is just a reason to count the rows again. You can step back to the Grade 2 array worksheets for repeated addition, or browse the full set of printable multiplication worksheets to find today's page.",
  },
  'graphing-data-grade-1': {
    eyebrow: 'Graphing Worksheet',
    h1: 'Grade 1 Graphing Worksheets: Read Picture Graphs and Bar Graphs',
    title: 'Graphing Worksheets for Grade 1 – Picture Graphs & Bar Graphs | Free Printable PDF',
    metaDescription: 'Free printable Grade 1 graphing worksheets — read picture graphs and bar graphs, find which has the most, and sort and count data. Download the PDF, no sign-up needed.',
    p1: "These Grade 1 graphing worksheets help a child read simple picture graphs and bar graphs and answer questions about them. On the reading pages a small graph shows how many of each thing there are, and the child counts the pictures or reads the bars to answer how many, which has the most, and which is the tallest. The sort-and-count pages give a jumble of objects to sort into groups and tally, then turn the counts into a little graph. Reading a graph, finding the largest and smallest groups, and sorting data into a chart are the first data skills a first grader meets. The graphs are large and clearly labelled, with friendly pictures, so a child can run a finger along each row, count carefully, and answer each question without any rush.",
    p2: "In this set a child reads a finished graph and also builds a small one. They count the pictures in a picture graph, read the height of each bar, decide which group has the most, and sort a set of objects to fill in a chart. The graphs are clear and the questions are gentle, so reading data feels like careful looking rather than hard work.",
    p3: "When your child can read a picture graph and a bar graph, you can print more of these graphing worksheets as a PDF and keep going on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to hurry a careful count. A miscount is just a reason to run a finger along the row again. The Grade 2 graphing worksheets move on to scaled pictographs and line plots, and you can browse the full set of printable graphing worksheets any time.",
  },
  'graphing-data-grade-2': {
    eyebrow: 'Graphing Worksheet',
    h1: 'Grade 2 Graphing Worksheets: Bar Graphs, Pictographs, and Line Plots',
    title: 'Graphing Worksheets for Grade 2 – Bar Graphs, Pictographs & Line Plots | Free Printable PDF',
    metaDescription: 'Free printable Grade 2 graphing worksheets — read bar graphs, scaled pictographs where each picture counts double, line plots, and turn tallies into graphs. Download the PDF, no sign-up.',
    p1: "These Grade 2 graphing worksheets read richer graphs and start to build them. On the bar-graph and pictograph pages a child reads the data and answers questions, and on the scaled pictographs learns that one picture can stand for two, so the count is no longer one-for-one. Line-plot pages place marks above a number line and ask the child to read how many sit at each spot, and tally-to-graph pages turn a set of tally marks into a finished bar graph. Reading bar graphs, working with scaled pictographs, reading a line plot, and building a graph from tallies are exactly the second-grade data skills these pages cover. The graphs are clearly drawn and the scales are easy to follow, so a child can read each value, double it when a picture stands for two, and answer carefully without any rush.",
    p2: "This set reads graphs where the scale matters. A child reads a bar graph, counts a pictograph where each symbol means two, reads a line plot above a number line, and turns tally marks into a graph. The scales are clear and the steps are short, so the move from one-for-one counting to reading a scale happens gently.",
    p3: "When your child can read a scaled pictograph and a line plot, you can print more of these graphing worksheets as a PDF and keep working on paper. It is all free, with no sign-up and no account, and there are no timers or scores to hurry a careful read of the scale. A wrong total is just a reason to check what each picture stands for. You can step back to the Grade 1 graphing worksheets for one-for-one graphs, or browse the full set of printable graphing worksheets to choose the next page.",
  },
  'graphing-data-grade-3': {
    eyebrow: 'Graphing Worksheet',
    h1: 'Grade 3 Graphing Worksheets: Scaled Bar Graphs and Pictographs',
    title: 'Graphing Worksheets for Grade 3 – Scaled Bar Graphs & Pictographs | Free Printable PDF',
    metaDescription: 'Free printable Grade 3 graphing worksheets — read scaled bar graphs, pictographs where each picture means five, and build a graph from data. Download the PDF, no sign-up.',
    p1: "These Grade 3 graphing worksheets read and build graphs where each step on the scale stands for more than one. On the scaled-bar pages a child reads bars marked in twos, fives, or tens and works out a value that falls between the labelled lines, including the halfway marks. Pictograph pages use a key where one picture means five, so the child multiplies to find the real count. Build-the-graph pages give a set of data and ask the child to draw the bars to the right height on a scaled axis. Reading a scaled bar graph, using a pictograph key, and building a graph from data are exactly the third-grade data skills these pages cover. The axes and keys are clearly labelled, so a child can read the scale, multiply or count by the step size, and check each value without any rush.",
    p2: "This set works with scales bigger than one. A child reads a bar that lands between gridlines, uses a key where one picture means five, finds the halfway marks, and draws bars to match a set of data. The scales are clear and the keys are simple, so reading a larger scale becomes a matter of counting by the step size.",
    p3: "Once your child can read a scaled graph and use a pictograph key, you can print more of these graphing worksheets as a PDF and keep going on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to rush a careful read of the scale. A wrong value is just a reason to check the step size again. You can step back to the Grade 2 graphing worksheets for smaller scales, or browse the full set of printable graphing worksheets to find today's page.",
  },
  'number-charts-kindergarten': {
    eyebrow: 'Number Chart Worksheet',
    h1: 'Kindergarten Number Worksheets: Missing Numbers, Before and After',
    title: 'Number Worksheets for Kindergarten – Missing Numbers, Before & After | Free Printable PDF',
    metaDescription: 'Free printable Kindergarten number worksheets — fill in missing numbers to 10 and 20, find the number before and after, and count down from 10. Download the PDF, no sign-up.',
    p1: "These Kindergarten number worksheets help a child learn the order of numbers to ten and twenty. On the missing-number pages a short row of numbers has a gap, and the child writes the number that belongs, filling in the count up to ten and then to twenty. Before-and-after pages give one number and ask which comes just before and just after it, and the stuck-in-the-middle pages ask for the number between two others. A countdown set has the child count backward from ten, like a rocket blasting off. Filling in missing numbers, finding the number before and after, and counting both forward and back are the first number-line skills a young child meets. The numbers are large and the rows are short, so a child can say the count out loud, find the gap, and write the number without any rush.",
    p2: "In this set a child works along a short line of numbers, filling gaps and naming neighbours. They write a missing number, say which number comes before and after, find the one in the middle, and count down from ten. The rows are short and the numbers are clear, so building a sense of order feels calm and steady.",
    p3: "When your child can fill in missing numbers and name the number before and after, you can print more of these number worksheets as a PDF and keep going on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to hurry a careful count. A gap left blank is just a reason to say the count again. The Grade 1 number worksheets move on to the hundreds chart and skip counting, and you can browse the full set of printable number worksheets whenever you like.",
  },
  'number-charts-grade-1': {
    eyebrow: 'Number Chart Worksheet',
    h1: 'Grade 1 Number Chart Worksheets: Hundreds Chart and Skip Counting',
    title: 'Number Chart Worksheets for Grade 1 – Hundreds Chart & Skip Counting | Free Printable PDF',
    metaDescription: 'Free printable Grade 1 number chart worksheets — fill in the hundreds chart, skip-count by 2s, 5s, and 10s, and find 1 more, 1 less, 10 more, 10 less. Download the PDF, no sign-up.',
    p1: "These Grade 1 number chart worksheets build number sense with the hundreds chart and skip counting. On the chart pages a child fills in the missing numbers of a hundreds chart and colours a counting path, seeing how the numbers grow by one along each row and by ten down each column. Skip-counting pages count by twos, fives, and tens, colouring or circling the numbers along the way, and the more-and-less pages ask for one more and one less, then ten more and ten less than a given number. Filling in the hundreds chart, skip counting by twos, fives, and tens, and finding one or ten more and less are exactly the first-grade number skills these pages build. The charts are large and clearly gridded, so a child can run a finger along each row, count the steps, and write each number without any rush.",
    p2: "In this set a child works across and down the hundreds chart. They fill the gaps, colour a skip-counting path by twos, fives, or tens, and find one more, one less, ten more, and ten less. The grid makes the patterns easy to see, so counting in steps and jumping by ten feel like following a path rather than memorising.",
    p3: "When your child can fill the hundreds chart and skip-count by twos, fives, and tens, you can print more of these number chart worksheets as a PDF and keep going on paper. It is all free, with no sign-up and no account, and there are no timers or scores to hurry a careful count. A wrong square is just a reason to run a finger along the row again. The Grade 2 number chart worksheets move on to skip counting by threes and fours and a hundred more and less, and you can browse every printable number chart worksheet to choose the next page.",
  },
  'number-charts-grade-2': {
    eyebrow: 'Number Chart Worksheet',
    h1: 'Grade 2 Number Chart Worksheets: Skip Counting and 100 More, 100 Less',
    title: 'Number Chart Worksheets for Grade 2 – Skip Counting & 100 More, 100 Less | Free Printable PDF',
    metaDescription: 'Free printable Grade 2 number chart worksheets — skip-count by 3s and 4s, find 100 more and 100 less, and hunt for odd numbers on the chart. Download the PDF, no sign-up.',
    p1: "These Grade 2 number chart worksheets stretch number sense into bigger steps and bigger jumps. On the skip-counting pages a child counts by threes and fours, filling in the next numbers and noticing the pattern each step makes. The hundred-more-and-less pages ask for a hundred more and a hundred less than a given number, building the jump across hundreds that base-ten thinking needs. An odd-number hunt sends the child across the chart marking the odd numbers, sorting even from odd along the way. Skip counting by threes and fours, finding a hundred more and a hundred less, and telling odd numbers from even are exactly the second-grade number skills these pages cover. The charts are large and clearly gridded, so a child can count the steps, jump a whole row of a hundred, and check each number without any rush.",
    p2: "In this set a child counts in less familiar steps and jumps by a hundred. They skip-count by threes and fours, find a hundred more and a hundred less, and mark the odd numbers across a chart. The grid keeps the patterns visible, so counting by threes and jumping by a hundred feel like following the structure rather than guessing.",
    p3: "When your child can skip-count by threes and fours and jump by a hundred, you can print more of these number chart worksheets as a PDF and keep going on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to rush a careful count. A wrong jump is just a reason to count the steps again. You can step back to the Grade 1 number chart worksheets for the hundreds chart, or browse the full set of printable number chart worksheets to find today's page.",
  },
  'number-charts-grade-3': {
    eyebrow: 'Number Chart Worksheet',
    h1: 'Grade 3 Number Pattern Worksheets: Skip Counting, Patterns, and Number Machines',
    title: 'Number Pattern Worksheets for Grade 3 – Skip Counting & In-Out Machines | Free Printable PDF',
    metaDescription: 'Free printable Grade 3 number pattern worksheets — skip-count in bigger steps, crack number patterns, work in-and-out number machines, and count back. Download the PDF, no sign-up.',
    p1: "These Grade 3 number pattern worksheets turn counting into spotting and continuing patterns. On the big skip-counting pages a child counts in larger steps and fills in what comes next, then on the pattern pages works out the rule a sequence follows and continues it. Number-machine pages give an in number and an out number and ask the child to find the rule, then use it to fill the rest of the table, an early look at how a function works. Counting-back pages run a sequence downward, so the child practises decreasing patterns too. Skip counting in larger steps, finding and continuing number patterns, and working out the rule of an in-and-out machine are exactly the third-grade skills these pages cover. The sequences and tables are clearly laid out, so a child can compare each step, name the rule, and fill the gaps without any rush.",
    p2: "This set is about rules. A child skip-counts in bigger steps, studies a sequence to find its pattern, figures out what a number machine does to its input, and continues a count that goes down as well as up. The steps are clear and the tables are short, so naming a rule and using it feels like detective work rather than drill.",
    p3: "Once your child can find a pattern and work out a number machine's rule, you can print more of these number pattern worksheets as a PDF and keep going on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to rush a careful look at the pattern. A wrong step is just a reason to compare the numbers again. You can step back to the Grade 2 number chart worksheets for skip counting, or browse the full set of printable number worksheets to find today's page.",
  },
};

// ---- build entries
const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
const roundTrip = JSON.stringify(data, null, 2) + '\n';
if (roundTrip !== raw) { console.error('FORMAT MISMATCH — would reflow whole file. Aborting.'); process.exit(1); }
const have = new Set(data.landings.map((l) => l.slug));

// carousel = sibling grades within the same type (internal-link cross-grade ladder)
const byType = {};
for (const c of COORDS) (byType[c.type] || (byType[c.type] = [])).push(c);
const carouselFor = (c) => (byType[c.type] || []).filter((o) => o.slug !== c.slug).map((o) => ({ label: carouselLabel(o), href: o.slug }));

let added = 0;
for (const c of COORDS) {
  if (have.has(c.slug)) { console.log('skip (exists):', c.slug); continue; }
  const pr = PROSE[c.slug];
  if (!pr) { console.error('NO PROSE for ' + c.slug + ' — aborting.'); process.exit(1); }
  const label = LEVEL_LABEL[c.level] || c.level;
  if (!pr.p1.includes(label)) { console.error('p1 missing level label "' + label + '" for ' + c.slug + ' — aborting.'); process.exit(1); }
  const entry = {
    slug: c.slug,
    variantShape: 'collapsed',
    coordinate: { type: c.type, mode: c.mode, theme: '', level: c.level },
    eyebrow: pr.eyebrow,
    h1: pr.h1,
    strand: c.strand,
    slotTokens: [label],
    p1: pr.p1, p2: pr.p2, p3: pr.p3,
    canonicalDeckSlug: c.canonicalDeckSlug,
    collapseSiblings: c.collapseSiblings,
    carousel: carouselFor(c),
    title: pr.title,
    metaDescription: pr.metaDescription,
  };
  if (c.standard) entry.standard = c.standard; // standard-bearing → educationalAlignment chip; strand-only otherwise
  // place standard right after strand to match existing key order convention (cosmetic)
  if (c.standard) {
    const ordered = { slug: entry.slug, variantShape: entry.variantShape, coordinate: entry.coordinate, eyebrow: entry.eyebrow, h1: entry.h1, strand: entry.strand, standard: c.standard, slotTokens: entry.slotTokens, p1: entry.p1, p2: entry.p2, p3: entry.p3, canonicalDeckSlug: entry.canonicalDeckSlug, collapseSiblings: entry.collapseSiblings, carousel: carouselFor(c), title: entry.title, metaDescription: entry.metaDescription };
    data.landings.push(ordered);
  } else {
    data.landings.push(entry);
  }
  added++;
  console.log('added:', c.slug, '| decks=' + c.collapseSiblings.length, '| ' + (c.standard || 'strand-only'));
}
if (added) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('TOTAL added=' + added + ' | en.json landings now=' + data.landings.length);
} else {
  console.log('nothing added');
}
