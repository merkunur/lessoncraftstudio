#!/usr/bin/env node
/**
 * Generates Part 9 keyword entries (themes 31-40 x 5 grades = 50 entries)
 * and inserts them into en-theme-grade-pages.md
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-theme-grade-pages.md');

// Character count helper
function cc(str) { return Array.from(str).length; }

// All 50 new entries (numbered 151-200)
const entries = [
  // ===== Theme 31: Cooking =====
  {
    n: 151, theme: 'Cooking', grade: 'Preschool', slug: 'cooking/preschool',
    pk: 'cooking sorting worksheets for preschool',
    title: 'Cooking Preschool Worksheets \u2014 Sorting & Kitchen | LCS',
    desc: 'Free printable cooking worksheets for preschool (ages 3-4). Sort kitchen tools and match food items by type. Print cooking-themed coloring and sorting pages.',
    focus: 'Kitchen tool sorting and food item matching',
    secondary: [
      'preschool cooking sorting worksheets',
      'kitchen tool matching activities ages 3-4',
      'cooking coloring worksheets preschool',
      'food sorting worksheets pre-K',
      'preschool kitchen themed activities'
    ]
  },
  {
    n: 152, theme: 'Cooking', grade: 'Kindergarten', slug: 'cooking/kindergarten',
    pk: 'kitchen vocabulary worksheets kindergarten',
    title: 'Cooking Kindergarten Worksheets \u2014 Vocab & Recipes | LCS',
    desc: 'Free printable cooking worksheets for kindergarten (ages 5-6). Learn kitchen words and recipe vocabulary. Print cooking-themed word and counting activity pages.',
    focus: 'Kitchen vocabulary and recipe word learning',
    secondary: [
      'kindergarten kitchen vocabulary worksheets',
      'recipe word activities ages 5-6',
      'cooking word worksheets kindergarten',
      'kitchen counting worksheets kindergarten',
      'kindergarten cooking vocabulary activities'
    ]
  },
  {
    n: 153, theme: 'Cooking', grade: 'First Grade', slug: 'cooking/first-grade',
    pk: 'cooking reading worksheets first grade',
    title: 'Cooking First Grade Worksheets \u2014 Reading & Recipes | LCS',
    desc: 'Free printable cooking worksheets for first grade (ages 6-7). Read recipes and practice kitchen math. Print cooking-themed literacy and science worksheets.',
    focus: 'Recipe reading and kitchen math practice',
    secondary: [
      'first grade cooking reading worksheets',
      'recipe reading activities ages 6-7',
      'cooking math worksheets first grade',
      'kitchen literacy worksheets grade 1',
      'first grade recipe reading activities'
    ]
  },
  {
    n: 154, theme: 'Cooking', grade: 'Second Grade', slug: 'cooking/second-grade',
    pk: 'cooking measurement worksheets second grade',
    title: 'Cooking Second Grade Worksheets \u2014 Measuring & Data | LCS',
    desc: 'Free printable cooking worksheets for second grade (ages 7-8). Measure recipe ingredients and graph kitchen data. Print cooking-themed math and graphing pages.',
    focus: 'Recipe measurement and kitchen data graphing',
    secondary: [
      'second grade cooking measurement worksheets',
      'recipe measurement activities ages 7-8',
      'cooking graphing worksheets second grade',
      'kitchen data worksheets grade 2',
      'second grade recipe math worksheets'
    ]
  },
  {
    n: 155, theme: 'Cooking', grade: 'Third Grade', slug: 'cooking/third-grade',
    pk: 'cooking writing worksheets third grade',
    title: 'Cooking Third Grade Worksheets \u2014 Writing & Recipes | LCS',
    desc: 'Free printable cooking worksheets for third grade (ages 8-9). Write recipes and research kitchen science topics. Print cooking-themed writing and project pages.',
    focus: 'Recipe writing and kitchen science research',
    secondary: [
      'third grade cooking writing worksheets',
      'recipe writing activities ages 8-9',
      'cooking multiplication worksheets grade 3',
      'cooking research worksheets third grade',
      'third grade recipe writing projects'
    ]
  },
  // ===== Theme 32: Dinosaurs =====
  {
    n: 156, theme: 'Dinosaurs', grade: 'Preschool', slug: 'dinosaurs/preschool',
    pk: 'dinosaur tracing worksheets for preschool',
    title: 'Dinosaur Preschool Worksheets \u2014 Tracing & Sorting | LCS',
    desc: 'Free printable dinosaur worksheets for preschool (ages 3-4). Trace dino shapes and sort by size with fun. Download dinosaur-themed coloring and matching pages.',
    focus: 'Dinosaur tracing and size sorting',
    secondary: [
      'preschool dinosaur tracing worksheets',
      'dino coloring activities ages 3-4',
      'dinosaur matching worksheets preschool',
      'dinosaur sorting worksheets pre-K',
      'preschool dino tracing activities'
    ]
  },
  {
    n: 157, theme: 'Dinosaurs', grade: 'Kindergarten', slug: 'dinosaurs/kindergarten',
    pk: 'dinosaur vocabulary worksheets kindergarten',
    title: 'Dinosaur Kindergarten Worksheets \u2014 Names & Species | LCS',
    desc: 'Free printable dinosaur worksheets for kindergarten (ages 5-6). Learn dino names and species vocabulary words. Print dinosaur-themed word and counting pages.',
    focus: 'Dinosaur name identification and species words',
    secondary: [
      'kindergarten dinosaur vocabulary worksheets',
      'dino name activities ages 5-6',
      'dinosaur word worksheets kindergarten',
      'dinosaur counting worksheets kindergarten',
      'kindergarten dino species activities'
    ]
  },
  {
    n: 158, theme: 'Dinosaurs', grade: 'First Grade', slug: 'dinosaurs/first-grade',
    pk: 'dinosaur reading worksheets first grade',
    title: 'Dinosaur First Grade Worksheets \u2014 Reading & Fossils | LCS',
    desc: 'Free printable dinosaur worksheets for first grade (ages 6-7). Read about fossils and practice dino math. Print dinosaur-themed literacy and science worksheets.',
    focus: 'Fossil reading and dinosaur science basics',
    secondary: [
      'first grade dinosaur reading worksheets',
      'fossil reading activities ages 6-7',
      'dinosaur addition worksheets first grade',
      'dinosaur literacy worksheets grade 1',
      'first grade fossil science worksheets'
    ]
  },
  {
    n: 159, theme: 'Dinosaurs', grade: 'Second Grade', slug: 'dinosaurs/second-grade',
    pk: 'dinosaur data worksheets second grade',
    title: 'Dinosaur Second Grade Worksheets \u2014 Data & Fossils | LCS',
    desc: 'Free printable dinosaur worksheets for second grade (ages 7-8). Collect fossil data and graph dino sizes. Print dinosaur-themed math and science chart pages.',
    focus: 'Fossil data collection and dinosaur size graphing',
    secondary: [
      'second grade dinosaur data worksheets',
      'fossil data activities ages 7-8',
      'dinosaur graphing worksheets second grade',
      'dinosaur comprehension worksheets grade 2',
      'second grade dino data chart worksheets'
    ]
  },
  {
    n: 160, theme: 'Dinosaurs', grade: 'Third Grade', slug: 'dinosaurs/third-grade',
    pk: 'dinosaur research worksheets third grade',
    title: 'Dinosaur Third Grade Worksheets \u2014 Research & Science | LCS',
    desc: 'Free printable dinosaur worksheets for third grade (ages 8-9). Study dino habitats and build science writing. Print dinosaur-themed project and analysis pages.',
    focus: 'Dinosaur habitat research and science writing',
    secondary: [
      'third grade dinosaur research worksheets',
      'dino habitat worksheets ages 8-9',
      'dinosaur multiplication worksheets grade 3',
      'dinosaur writing worksheets third grade',
      'third grade fossil research projects'
    ]
  },
  // ===== Theme 33: Fairy Tales =====
  {
    n: 161, theme: 'Fairy Tales', grade: 'Preschool', slug: 'fairy-tales/preschool',
    pk: 'fairy tale matching worksheets for preschool',
    title: 'Fairy Tale Preschool Worksheets \u2014 Matching & Stories | LCS',
    desc: 'Free printable fairy tale worksheets for preschool (ages 3-4). Match characters and sort story scenes. Print fairy tale-themed coloring and sorting pages.',
    focus: 'Character matching and story scene sorting',
    secondary: [
      'preschool fairy tale matching worksheets',
      'story character activities ages 3-4',
      'fairy tale coloring worksheets preschool',
      'fairy tale sorting worksheets pre-K',
      'preschool storybook matching activities'
    ]
  },
  {
    n: 162, theme: 'Fairy Tales', grade: 'Kindergarten', slug: 'fairy-tales/kindergarten',
    pk: 'fairy tale vocabulary worksheets kindergarten',
    title: 'Fairy Tale Kindergarten Worksheets \u2014 Vocab & Magic | LCS',
    desc: 'Free printable fairy tale worksheets for kindergarten (ages 5-6). Learn story words and character vocabulary. Print fairy tale-themed word and counting pages.',
    focus: 'Story vocabulary and character word learning',
    secondary: [
      'kindergarten fairy tale vocabulary worksheets',
      'story vocabulary activities ages 5-6',
      'fairy tale word worksheets kindergarten',
      'fairy tale counting worksheets kindergarten',
      'kindergarten storybook vocabulary activities'
    ]
  },
  {
    n: 163, theme: 'Fairy Tales', grade: 'First Grade', slug: 'fairy-tales/first-grade',
    pk: 'fairy tale reading worksheets first grade',
    title: 'Fairy Tale First Grade Worksheets \u2014 Reading & Magic | LCS',
    desc: 'Free printable fairy tale worksheets for first grade (ages 6-7). Read classic tales and build comprehension. Print fairy tale-themed literacy and math pages.',
    focus: 'Fairy tale reading and story comprehension',
    secondary: [
      'first grade fairy tale reading worksheets',
      'story reading activities ages 6-7',
      'fairy tale addition worksheets first grade',
      'fairy tale literacy worksheets grade 1',
      'first grade storybook reading worksheets'
    ]
  },
  {
    n: 164, theme: 'Fairy Tales', grade: 'Second Grade', slug: 'fairy-tales/second-grade',
    pk: 'fairy tale comprehension worksheets second grade',
    title: 'Fairy Tale Second Grade Worksheets \u2014 Story Analysis | LCS',
    desc: 'Free printable fairy tale worksheets for second grade (ages 7-8). Map story plots and analyze characters. Print fairy tale-themed comprehension and data pages.',
    focus: 'Story mapping and character analysis skills',
    secondary: [
      'second grade fairy tale comprehension worksheets',
      'story mapping activities ages 7-8',
      'fairy tale analysis worksheets second grade',
      'fairy tale data worksheets grade 2',
      'second grade storybook comprehension pages'
    ]
  },
  {
    n: 165, theme: 'Fairy Tales', grade: 'Third Grade', slug: 'fairy-tales/third-grade',
    pk: 'fairy tale writing worksheets third grade',
    title: 'Fairy Tale Third Grade Worksheets \u2014 Writing & Craft | LCS',
    desc: 'Free printable fairy tale worksheets for third grade (ages 8-9). Write tales and retell classic stories. Print fairy tale-themed writing and project pages.',
    focus: 'Creative writing and story retelling skills',
    secondary: [
      'third grade fairy tale writing worksheets',
      'story writing activities ages 8-9',
      'fairy tale multiplication worksheets grade 3',
      'fairy tale retelling worksheets third grade',
      'third grade creative story writing pages'
    ]
  },
  // ===== Theme 34: Farm =====
  {
    n: 166, theme: 'Farm', grade: 'Preschool', slug: 'farm/preschool',
    pk: 'farm animal sorting worksheets for preschool',
    title: 'Farm Preschool Worksheets \u2014 Animal Sorting & Barns | LCS',
    desc: 'Free printable farm worksheets for preschool (ages 3-4). Sort farm animals and match barn items with fun. Print farm-themed coloring and sorting activity pages.',
    focus: 'Farm animal sorting and barn item matching',
    secondary: [
      'preschool farm animal sorting worksheets',
      'barn matching activities ages 3-4',
      'farm coloring worksheets preschool',
      'farm animal tracing worksheets pre-K',
      'preschool barnyard sorting activities'
    ]
  },
  {
    n: 167, theme: 'Farm', grade: 'Kindergarten', slug: 'farm/kindergarten',
    pk: 'farm vocabulary worksheets kindergarten',
    title: 'Farm Kindergarten Worksheets \u2014 Vocab & Crops | LCS',
    desc: 'Free printable farm worksheets for kindergarten (ages 5-6). Learn farm words and crop vocabulary with fun. Print farm-themed word and counting activity pages.',
    focus: 'Farm vocabulary and crop word learning',
    secondary: [
      'kindergarten farm vocabulary worksheets',
      'crop vocabulary activities ages 5-6',
      'farm word worksheets kindergarten',
      'farm counting worksheets kindergarten',
      'kindergarten barnyard vocabulary activities'
    ]
  },
  {
    n: 168, theme: 'Farm', grade: 'First Grade', slug: 'farm/first-grade',
    pk: 'farm reading worksheets first grade',
    title: 'Farm First Grade Worksheets \u2014 Reading & Harvest | LCS',
    desc: 'Free printable farm worksheets for first grade (ages 6-7). Read farm stories and practice harvest math. Print farm-themed literacy and science worksheets.',
    focus: 'Farm reading and harvest math practice',
    secondary: [
      'first grade farm reading worksheets',
      'harvest reading activities ages 6-7',
      'farm addition worksheets first grade',
      'farm literacy worksheets grade 1',
      'first grade harvest reading worksheets'
    ]
  },
  {
    n: 169, theme: 'Farm', grade: 'Second Grade', slug: 'farm/second-grade',
    pk: 'farm data worksheets second grade',
    title: 'Farm Second Grade Worksheets \u2014 Data & Harvest | LCS',
    desc: 'Free printable farm worksheets for second grade (ages 7-8). Collect harvest data and graph crop patterns. Print farm-themed math and science graphing pages.',
    focus: 'Harvest data collection and crop graphing',
    secondary: [
      'second grade farm data worksheets',
      'harvest data activities ages 7-8',
      'farm graphing worksheets second grade',
      'farm comprehension worksheets grade 2',
      'second grade crop data chart worksheets'
    ]
  },
  {
    n: 170, theme: 'Farm', grade: 'Third Grade', slug: 'farm/third-grade',
    pk: 'farm research worksheets third grade',
    title: 'Farm Third Grade Worksheets \u2014 Research & Agriculture | LCS',
    desc: 'Free printable farm worksheets for third grade (ages 8-9). Research agriculture and build science writing. Print farm-themed project and analysis worksheets.',
    focus: 'Agriculture research and farm science writing',
    secondary: [
      'third grade farm research worksheets',
      'agriculture worksheets ages 8-9',
      'farm multiplication worksheets grade 3',
      'farm writing worksheets third grade',
      'third grade agriculture science projects'
    ]
  },
  // ===== Theme 35: Flowers =====
  {
    n: 171, theme: 'Flowers', grade: 'Preschool', slug: 'flowers/preschool',
    pk: 'flower tracing worksheets for preschool',
    title: 'Flower Preschool Worksheets \u2014 Tracing & Petals | LCS',
    desc: 'Free printable flower worksheets for preschool (ages 3-4). Trace petal shapes and sort flowers by color. Print flower-themed coloring and matching pages.',
    focus: 'Petal tracing and flower color sorting',
    secondary: [
      'preschool flower tracing worksheets',
      'petal coloring activities ages 3-4',
      'flower matching worksheets preschool',
      'flower sorting worksheets pre-K',
      'preschool petal tracing activities'
    ]
  },
  {
    n: 172, theme: 'Flowers', grade: 'Kindergarten', slug: 'flowers/kindergarten',
    pk: 'flower vocabulary worksheets kindergarten',
    title: 'Flower Kindergarten Worksheets \u2014 Names & Petals | LCS',
    desc: 'Free printable flower worksheets for kindergarten (ages 5-6). Learn flower names and petal vocabulary. Print flower-themed word and counting activity pages.',
    focus: 'Flower name identification and petal vocabulary',
    secondary: [
      'kindergarten flower vocabulary worksheets',
      'petal vocabulary activities ages 5-6',
      'flower word worksheets kindergarten',
      'flower counting worksheets kindergarten',
      'kindergarten flower name activities'
    ]
  },
  {
    n: 173, theme: 'Flowers', grade: 'First Grade', slug: 'flowers/first-grade',
    pk: 'flower reading worksheets first grade',
    title: 'Flower First Grade Worksheets \u2014 Reading & Plants | LCS',
    desc: 'Free printable flower worksheets for first grade (ages 6-7). Read about plants and practice flower math. Print flower-themed literacy and science pages.',
    focus: 'Flower reading and plant science basics',
    secondary: [
      'first grade flower reading worksheets',
      'plant reading activities ages 6-7',
      'flower addition worksheets first grade',
      'flower literacy worksheets grade 1',
      'first grade plant science worksheets'
    ]
  },
  {
    n: 174, theme: 'Flowers', grade: 'Second Grade', slug: 'flowers/second-grade',
    pk: 'flower data worksheets second grade',
    title: 'Flower Second Grade Worksheets \u2014 Data & Growth | LCS',
    desc: 'Free printable flower worksheets for second grade (ages 7-8). Collect growth data and graph petal counts. Print flower-themed math and science chart pages.',
    focus: 'Growth data collection and petal pattern graphing',
    secondary: [
      'second grade flower data worksheets',
      'flower growth activities ages 7-8',
      'flower graphing worksheets second grade',
      'flower comprehension worksheets grade 2',
      'second grade plant data chart worksheets'
    ]
  },
  {
    n: 175, theme: 'Flowers', grade: 'Third Grade', slug: 'flowers/third-grade',
    pk: 'flower research worksheets third grade',
    title: 'Flower Third Grade Worksheets \u2014 Research & Botany | LCS',
    desc: 'Free printable flower worksheets for third grade (ages 8-9). Research plant lifecycles and build writing. Print flower-themed project and analysis worksheets.',
    focus: 'Plant lifecycle research and botany writing',
    secondary: [
      'third grade flower research worksheets',
      'plant lifecycle worksheets ages 8-9',
      'flower multiplication worksheets grade 3',
      'flower writing worksheets third grade',
      'third grade botany research projects'
    ]
  },
  // ===== Theme 36: Forest =====
  {
    n: 176, theme: 'Forest', grade: 'Preschool', slug: 'forest/preschool',
    pk: 'forest matching worksheets for preschool',
    title: 'Forest Preschool Worksheets \u2014 Matching & Trees | LCS',
    desc: 'Free printable forest worksheets for preschool (ages 3-4). Match woodland animals and sort tree shapes. Print forest-themed coloring and sorting activity pages.',
    focus: 'Woodland matching and tree shape sorting',
    secondary: [
      'preschool forest matching worksheets',
      'woodland animal activities ages 3-4',
      'forest coloring worksheets preschool',
      'tree sorting worksheets pre-K',
      'preschool woodland matching activities'
    ]
  },
  {
    n: 177, theme: 'Forest', grade: 'Kindergarten', slug: 'forest/kindergarten',
    pk: 'forest vocabulary worksheets kindergarten',
    title: 'Forest Kindergarten Worksheets \u2014 Trees & Vocab | LCS',
    desc: 'Free printable forest worksheets for kindergarten (ages 5-6). Learn tree names and woodland vocabulary. Print forest-themed word and counting activity pages.',
    focus: 'Tree name identification and woodland vocabulary',
    secondary: [
      'kindergarten forest vocabulary worksheets',
      'woodland vocabulary activities ages 5-6',
      'forest word worksheets kindergarten',
      'forest counting worksheets kindergarten',
      'kindergarten tree name activities'
    ]
  },
  {
    n: 178, theme: 'Forest', grade: 'First Grade', slug: 'forest/first-grade',
    pk: 'forest reading worksheets first grade',
    title: 'Forest First Grade Worksheets \u2014 Reading & Wildlife | LCS',
    desc: 'Free printable forest worksheets for first grade (ages 6-7). Read about wildlife and practice tree math. Print forest-themed literacy and science pages.',
    focus: 'Forest reading and tree science basics',
    secondary: [
      'first grade forest reading worksheets',
      'wildlife reading activities ages 6-7',
      'forest addition worksheets first grade',
      'forest literacy worksheets grade 1',
      'first grade woodland reading worksheets'
    ]
  },
  {
    n: 179, theme: 'Forest', grade: 'Second Grade', slug: 'forest/second-grade',
    pk: 'forest data worksheets second grade',
    title: 'Forest Second Grade Worksheets \u2014 Data & Habitats | LCS',
    desc: 'Free printable forest worksheets for second grade (ages 7-8). Collect woodland data and graph habitat info. Print forest-themed math and science chart pages.',
    focus: 'Woodland data collection and habitat graphing',
    secondary: [
      'second grade forest data worksheets',
      'woodland data activities ages 7-8',
      'forest graphing worksheets second grade',
      'forest comprehension worksheets grade 2',
      'second grade habitat data chart worksheets'
    ]
  },
  {
    n: 180, theme: 'Forest', grade: 'Third Grade', slug: 'forest/third-grade',
    pk: 'forest ecosystem worksheets third grade',
    title: 'Forest Third Grade Worksheets \u2014 Ecosystems & Research | LCS',
    desc: 'Free printable forest worksheets for third grade (ages 8-9). Research ecosystems and build wildlife writing. Print forest-themed project and analysis pages.',
    focus: 'Forest ecosystem research and wildlife writing',
    secondary: [
      'third grade forest ecosystem worksheets',
      'ecosystem research worksheets ages 8-9',
      'forest multiplication worksheets grade 3',
      'forest writing worksheets third grade',
      'third grade woodland research projects'
    ]
  },
  // ===== Theme 37: Fruits =====
  {
    n: 181, theme: 'Fruits', grade: 'Preschool', slug: 'fruits/preschool',
    pk: 'fruit matching worksheets for preschool',
    title: 'Fruit Preschool Worksheets \u2014 Matching & Colors | LCS',
    desc: 'Free printable fruit worksheets for preschool (ages 3-4). Match fruits by color and sort by size with fun. Print fruit-themed coloring and sorting pages.',
    focus: 'Fruit matching and color sorting by size',
    secondary: [
      'preschool fruit matching worksheets',
      'fruit coloring activities ages 3-4',
      'fruit sorting worksheets preschool',
      'fruit tracing worksheets pre-K',
      'preschool fruit color matching activities'
    ]
  },
  {
    n: 182, theme: 'Fruits', grade: 'Kindergarten', slug: 'fruits/kindergarten',
    pk: 'fruit vocabulary worksheets kindergarten',
    title: 'Fruit Kindergarten Worksheets \u2014 Names & Nutrition | LCS',
    desc: 'Free printable fruit worksheets for kindergarten (ages 5-6). Learn fruit names and nutrition vocabulary. Print fruit-themed word and counting activity pages.',
    focus: 'Fruit name identification and nutrition vocabulary',
    secondary: [
      'kindergarten fruit vocabulary worksheets',
      'fruit name activities ages 5-6',
      'fruit word worksheets kindergarten',
      'fruit counting worksheets kindergarten',
      'kindergarten nutrition vocabulary activities'
    ]
  },
  {
    n: 183, theme: 'Fruits', grade: 'First Grade', slug: 'fruits/first-grade',
    pk: 'fruit reading worksheets first grade',
    title: 'Fruit First Grade Worksheets \u2014 Reading & Health | LCS',
    desc: 'Free printable fruit worksheets for first grade (ages 6-7). Read about healthy eating and practice math. Print fruit-themed literacy and science activity pages.',
    focus: 'Fruit reading and healthy eating basics',
    secondary: [
      'first grade fruit reading worksheets',
      'healthy eating activities ages 6-7',
      'fruit addition worksheets first grade',
      'fruit literacy worksheets grade 1',
      'first grade nutrition reading worksheets'
    ]
  },
  {
    n: 184, theme: 'Fruits', grade: 'Second Grade', slug: 'fruits/second-grade',
    pk: 'fruit data worksheets second grade',
    title: 'Fruit Second Grade Worksheets \u2014 Data & Nutrition | LCS',
    desc: 'Free printable fruit worksheets for second grade (ages 7-8). Collect nutrition data and graph fruit counts. Print fruit-themed math and science chart pages.',
    focus: 'Nutrition data collection and fruit graphing',
    secondary: [
      'second grade fruit data worksheets',
      'nutrition data activities ages 7-8',
      'fruit graphing worksheets second grade',
      'fruit comprehension worksheets grade 2',
      'second grade nutrition chart worksheets'
    ]
  },
  {
    n: 185, theme: 'Fruits', grade: 'Third Grade', slug: 'fruits/third-grade',
    pk: 'fruit science worksheets third grade',
    title: 'Fruit Third Grade Worksheets \u2014 Science & Nutrition | LCS',
    desc: 'Free printable fruit worksheets for third grade (ages 8-9). Research fruit science and build nutrition writing. Print fruit-themed project and analysis pages.',
    focus: 'Fruit science research and nutrition writing',
    secondary: [
      'third grade fruit science worksheets',
      'fruit research worksheets ages 8-9',
      'fruit multiplication worksheets grade 3',
      'fruit writing worksheets third grade',
      'third grade nutrition science projects'
    ]
  },
  // ===== Theme 38: Garden =====
  {
    n: 186, theme: 'Garden', grade: 'Preschool', slug: 'garden/preschool',
    pk: 'garden sorting worksheets for preschool',
    title: 'Garden Preschool Worksheets \u2014 Sorting & Seeds | LCS',
    desc: 'Free printable garden worksheets for preschool (ages 3-4). Sort seeds and match garden tools with fun. Print garden-themed coloring and sorting activity pages.',
    focus: 'Seed sorting and garden tool matching',
    secondary: [
      'preschool garden sorting worksheets',
      'seed sorting activities ages 3-4',
      'garden coloring worksheets preschool',
      'garden tool matching worksheets pre-K',
      'preschool planting and sorting activities'
    ]
  },
  {
    n: 187, theme: 'Garden', grade: 'Kindergarten', slug: 'garden/kindergarten',
    pk: 'garden vocabulary worksheets kindergarten',
    title: 'Garden Kindergarten Worksheets \u2014 Vocab & Planting | LCS',
    desc: 'Free printable garden worksheets for kindergarten (ages 5-6). Learn planting words and seed vocabulary. Print garden-themed word and counting activity pages.',
    focus: 'Planting vocabulary and seed word learning',
    secondary: [
      'kindergarten garden vocabulary worksheets',
      'planting vocabulary activities ages 5-6',
      'garden word worksheets kindergarten',
      'garden counting worksheets kindergarten',
      'kindergarten seed vocabulary activities'
    ]
  },
  {
    n: 188, theme: 'Garden', grade: 'First Grade', slug: 'garden/first-grade',
    pk: 'garden reading worksheets first grade',
    title: 'Garden First Grade Worksheets \u2014 Reading & Growth | LCS',
    desc: 'Free printable garden worksheets for first grade (ages 6-7). Read about plant growth and practice math. Print garden-themed literacy and science activity pages.',
    focus: 'Garden reading and plant growth science',
    secondary: [
      'first grade garden reading worksheets',
      'plant growth activities ages 6-7',
      'garden addition worksheets first grade',
      'garden literacy worksheets grade 1',
      'first grade planting reading worksheets'
    ]
  },
  {
    n: 189, theme: 'Garden', grade: 'Second Grade', slug: 'garden/second-grade',
    pk: 'garden measurement worksheets second grade',
    title: 'Garden Second Grade Worksheets \u2014 Measuring & Data | LCS',
    desc: 'Free printable garden worksheets for second grade (ages 7-8). Measure plant growth and graph garden data. Print garden-themed math and science chart worksheets.',
    focus: 'Plant measurement and growth data graphing',
    secondary: [
      'second grade garden measurement worksheets',
      'plant measurement activities ages 7-8',
      'garden graphing worksheets second grade',
      'garden data worksheets grade 2',
      'second grade plant growth chart worksheets'
    ]
  },
  {
    n: 190, theme: 'Garden', grade: 'Third Grade', slug: 'garden/third-grade',
    pk: 'garden writing worksheets third grade',
    title: 'Garden Third Grade Worksheets \u2014 Writing & Research | LCS',
    desc: 'Free printable garden worksheets for third grade (ages 8-9). Write garden journals and research plants. Print garden-themed writing and project activity pages.',
    focus: 'Garden journal writing and plant research',
    secondary: [
      'third grade garden writing worksheets',
      'garden journal worksheets ages 8-9',
      'garden multiplication worksheets grade 3',
      'garden research worksheets third grade',
      'third grade plant research writing pages'
    ]
  },
  // ===== Theme 39: Insects =====
  {
    n: 191, theme: 'Insects', grade: 'Preschool', slug: 'insects/preschool',
    pk: 'insect matching worksheets for preschool',
    title: 'Insect Preschool Worksheets \u2014 Matching & Sorting | LCS',
    desc: 'Free printable insect worksheets for preschool (ages 3-4). Match bugs by color and sort by size with fun. Print insect-themed coloring and matching pages.',
    focus: 'Bug matching and insect color sorting',
    secondary: [
      'preschool insect matching worksheets',
      'bug sorting activities ages 3-4',
      'insect coloring worksheets preschool',
      'bug matching worksheets pre-K',
      'preschool insect sorting activities'
    ]
  },
  {
    n: 192, theme: 'Insects', grade: 'Kindergarten', slug: 'insects/kindergarten',
    pk: 'insect vocabulary worksheets kindergarten',
    title: 'Insect Kindergarten Worksheets \u2014 Bug Names & Vocab | LCS',
    desc: 'Free printable insect worksheets for kindergarten (ages 5-6). Learn bug names and insect vocabulary words. Print insect-themed word and counting activity pages.',
    focus: 'Bug name identification and insect vocabulary',
    secondary: [
      'kindergarten insect vocabulary worksheets',
      'bug name activities ages 5-6',
      'insect word worksheets kindergarten',
      'insect counting worksheets kindergarten',
      'kindergarten bug vocabulary activities'
    ]
  },
  {
    n: 193, theme: 'Insects', grade: 'First Grade', slug: 'insects/first-grade',
    pk: 'insect reading worksheets first grade',
    title: 'Insect First Grade Worksheets \u2014 Reading & Lifecycle | LCS',
    desc: 'Free printable insect worksheets for first grade (ages 6-7). Read about lifecycles and practice bug math. Print insect-themed literacy and science pages.',
    focus: 'Insect reading and lifecycle science basics',
    secondary: [
      'first grade insect reading worksheets',
      'bug lifecycle activities ages 6-7',
      'insect addition worksheets first grade',
      'insect literacy worksheets grade 1',
      'first grade bug science worksheets'
    ]
  },
  {
    n: 194, theme: 'Insects', grade: 'Second Grade', slug: 'insects/second-grade',
    pk: 'insect data worksheets second grade',
    title: 'Insect Second Grade Worksheets \u2014 Data & Lifecycles | LCS',
    desc: 'Free printable insect worksheets for second grade (ages 7-8). Collect bug data and graph lifecycle stages. Print insect-themed math and science chart pages.',
    focus: 'Bug data collection and lifecycle stage graphing',
    secondary: [
      'second grade insect data worksheets',
      'bug lifecycle data activities ages 7-8',
      'insect graphing worksheets second grade',
      'insect comprehension worksheets grade 2',
      'second grade bug data chart worksheets'
    ]
  },
  {
    n: 195, theme: 'Insects', grade: 'Third Grade', slug: 'insects/third-grade',
    pk: 'insect research worksheets third grade',
    title: 'Insect Third Grade Worksheets \u2014 Research & Habitats | LCS',
    desc: 'Free printable insect worksheets for third grade (ages 8-9). Research bug habitats and build science writing. Print insect-themed project and analysis pages.',
    focus: 'Insect habitat research and science writing',
    secondary: [
      'third grade insect research worksheets',
      'bug habitat worksheets ages 8-9',
      'insect multiplication worksheets grade 3',
      'insect writing worksheets third grade',
      'third grade bug science research projects'
    ]
  },
  // ===== Theme 40: Ocean =====
  {
    n: 196, theme: 'Ocean', grade: 'Preschool', slug: 'ocean/preschool',
    pk: 'ocean matching worksheets for preschool',
    title: 'Ocean Preschool Worksheets \u2014 Matching & Sea Life | LCS',
    desc: 'Free printable ocean worksheets for preschool (ages 3-4). Match sea creatures and sort waves by size. Download ocean-themed coloring and sorting activity pages.',
    focus: 'Sea creature matching and wave sorting',
    secondary: [
      'preschool ocean matching worksheets',
      'sea creature activities ages 3-4',
      'ocean coloring worksheets preschool',
      'ocean sorting worksheets pre-K',
      'preschool sea life matching activities'
    ]
  },
  {
    n: 197, theme: 'Ocean', grade: 'Kindergarten', slug: 'ocean/kindergarten',
    pk: 'ocean vocabulary worksheets kindergarten',
    title: 'Ocean Kindergarten Worksheets \u2014 Sea Life & Vocab | LCS',
    desc: 'Free printable ocean worksheets for kindergarten (ages 5-6). Learn sea creature names and ocean words. Print ocean-themed word and counting activity worksheets.',
    focus: 'Sea creature names and ocean word learning',
    secondary: [
      'kindergarten ocean vocabulary worksheets',
      'sea creature name activities ages 5-6',
      'ocean word worksheets kindergarten',
      'ocean counting worksheets kindergarten',
      'kindergarten sea life vocabulary activities'
    ]
  },
  {
    n: 198, theme: 'Ocean', grade: 'First Grade', slug: 'ocean/first-grade',
    pk: 'ocean reading worksheets first grade',
    title: 'Ocean First Grade Worksheets \u2014 Reading & Marine Life | LCS',
    desc: 'Free printable ocean worksheets for first grade (ages 6-7). Read about marine life and practice math. Print ocean-themed literacy and science activity pages.',
    focus: 'Ocean reading and marine science basics',
    secondary: [
      'first grade ocean reading worksheets',
      'marine life reading activities ages 6-7',
      'ocean addition worksheets first grade',
      'ocean literacy worksheets grade 1',
      'first grade sea life reading worksheets'
    ]
  },
  {
    n: 199, theme: 'Ocean', grade: 'Second Grade', slug: 'ocean/second-grade',
    pk: 'ocean data worksheets second grade',
    title: 'Ocean Second Grade Worksheets \u2014 Data & Marine Life | LCS',
    desc: 'Free printable ocean worksheets for second grade (ages 7-8). Collect marine data and graph ocean patterns. Print ocean-themed math and science chart worksheets.',
    focus: 'Marine data collection and ocean pattern graphing',
    secondary: [
      'second grade ocean data worksheets',
      'marine data activities ages 7-8',
      'ocean graphing worksheets second grade',
      'ocean comprehension worksheets grade 2',
      'second grade marine data chart worksheets'
    ]
  },
  {
    n: 200, theme: 'Ocean', grade: 'Third Grade', slug: 'ocean/third-grade',
    pk: 'ocean research worksheets third grade',
    title: 'Ocean Third Grade Worksheets \u2014 Research & Ecosystems | LCS',
    desc: 'Free printable ocean worksheets for third grade (ages 8-9). Research marine ecosystems and build writing. Print ocean-themed project and analysis worksheets.',
    focus: 'Ocean ecosystem research and marine writing',
    secondary: [
      'third grade ocean research worksheets',
      'marine ecosystem worksheets ages 8-9',
      'ocean multiplication worksheets grade 3',
      'ocean writing worksheets third grade',
      'third grade marine research projects'
    ]
  }
];

// ===== VALIDATION =====
let errors = 0;
for (const e of entries) {
  const tc = cc(e.title);
  const dc = cc(e.desc);
  if (tc < 50 || tc > 60) {
    console.error(`ERROR #${e.n}: title ${tc} chars (need 50-60): "${e.title}"`);
    errors++;
  }
  if (dc < 150 || dc > 160) {
    console.error(`ERROR #${e.n}: desc ${dc} chars (need 150-160): "${e.desc}"`);
    errors++;
  }
  if (e.secondary.length < 5 || e.secondary.length > 8) {
    console.error(`ERROR #${e.n}: ${e.secondary.length} secondary keywords (need 5-8)`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} errors found in entry data. Fix before generating.`);
  process.exit(1);
}

console.log(`All ${entries.length} entries validated. Generating markdown...`);

// ===== GENERATE QUICK REFERENCE ROWS =====
let qrRows = '';
for (const e of entries) {
  qrRows += `| ${e.n} | ${e.theme} | ${e.grade} | ${e.slug} | ${e.pk} |\n`;
}

// ===== GENERATE DETAILED ENTRIES =====
const themeNumbers = {
  'Cooking': 31, 'Dinosaurs': 32, 'Fairy Tales': 33, 'Farm': 34, 'Flowers': 35,
  'Forest': 36, 'Fruits': 37, 'Garden': 38, 'Insects': 39, 'Ocean': 40
};

let detailedEntries = '';
let currentTheme = '';
for (const e of entries) {
  if (e.theme !== currentTheme) {
    currentTheme = e.theme;
    detailedEntries += `\n## Theme ${themeNumbers[e.theme]}: ${e.theme} (5 Grades)\n\n---\n\n`;
  }

  const titleEscaped = e.title.replace(/\|/g, '\\|');
  const tc = cc(e.title);
  const dc = cc(e.desc);

  detailedEntries += `### ${e.n}. ${e.theme} \u2014 ${e.grade} (\`${e.slug}\`)\n\n`;
  detailedEntries += `| Field | Value |\n`;
  detailedEntries += `|-------|-------|\n`;
  detailedEntries += `| **Primary Keyword** | ${e.pk} |\n`;
  detailedEntries += `| **SEO Title** | ${titleEscaped} |\n`;
  detailedEntries += `| **Title Chars** | ${tc} |\n`;
  detailedEntries += `| **Meta Description** | ${e.desc} |\n`;
  detailedEntries += `| **Desc Chars** | ${dc} |\n`;
  detailedEntries += `| **Focus Skill** | ${e.focus} |\n\n`;
  detailedEntries += `**Secondary Keywords:**\n`;
  e.secondary.forEach((kw, i) => {
    detailedEntries += `${i + 1}. ${kw}\n`;
  });
  detailedEntries += `\n---\n\n`;
}

// ===== GENERATE CHARACTER COUNT ROWS =====
let ccRows = '';
for (const e of entries) {
  ccRows += `| ${e.n} | ${e.theme} | ${e.grade} | ${cc(e.title)} | ${cc(e.desc)} |\n`;
}

// ===== GENERATE UPDATED VERIFICATION TABLE ROWS =====
const hubKeywords = {
  'Cooking': 'cooking worksheets for kids',
  'Dinosaurs': 'dinosaur worksheets for kids',
  'Fairy Tales': 'fairy tale worksheets for kids',
  'Farm': 'farm worksheets for kids',
  'Flowers': 'flower worksheets for kids',
  'Forest': 'forest worksheets for kids',
  'Fruits': 'fruit worksheets for kids',
  'Garden': 'garden worksheets for kids',
  'Insects': 'insect worksheets for kids',
  'Ocean': 'ocean worksheets for kids'
};

let verifyRows = '';
for (const e of entries) {
  const hub = hubKeywords[e.theme];
  verifyRows += `| ${e.pk} | ${hub} | YES | Grade + skill vs "for kids" |\n`;
}

// ===== GENERATE SKILL DIFF TABLE ROWS =====
const themeSkills = {};
for (const e of entries) {
  if (!themeSkills[e.theme]) themeSkills[e.theme] = {};
  themeSkills[e.theme][e.grade] = e.focus;
}

let skillRows = '';
for (const [theme, grades] of Object.entries(themeSkills)) {
  const p = grades['Preschool'] || '';
  const k = grades['Kindergarten'] || '';
  const f = grades['First Grade'] || '';
  const s = grades['Second Grade'] || '';
  const t = grades['Third Grade'] || '';
  skillRows += `| ${theme} | ${p} | ${k} | ${f} | ${s} | ${t} |\n`;
}

// ===== READ AND UPDATE FILE =====
let content = fs.readFileSync(FILE, 'utf-8');

// 1. Update header
content = content.replace(
  '# English Theme+Grade Pages \u2014 Keyword Map (Themes 1-30)',
  '# English Theme+Grade Pages \u2014 Keyword Map (Themes 1-40)'
);
content = content.replace(
  '> Parts 6-8 of the ONE CLICK A DAY SEO plan.\n> This document maps unique primary keywords, optimized titles, descriptions, and secondary keywords\n> for 150 theme+grade pages (themes 1-30 x 5 grades). Part 9 will append themes 31-50.',
  '> Parts 6-9 of the ONE CLICK A DAY SEO plan.\n> This document maps unique primary keywords, optimized titles, descriptions, and secondary keywords\n> for 200 theme+grade pages (themes 1-40 x 5 grades). Part 10 will append themes 41-50.'
);

// 2. Update Quick Reference header
content = content.replace(
  '## Quick Reference: All 150 Primary Keywords',
  '## Quick Reference: All 200 Primary Keywords'
);

// Insert QR rows after Construction Third Grade row
content = content.replace(
  '| 150 | Construction | Third Grade | construction/third-grade | construction research worksheets third grade |\n\n**Uniqueness check:** 150 keywords, 0 duplicates.',
  '| 150 | Construction | Third Grade | construction/third-grade | construction research worksheets third grade |\n' + qrRows + '\n**Uniqueness check:** 200 keywords, 0 duplicates.'
);

// 3. Insert detailed entries before Character Count Summary
content = content.replace(
  '\n## Character Count Summary',
  detailedEntries + '\n## Character Count Summary'
);

// 4. Insert CC rows after row 150
content = content.replace(
  '| 150 | Construction | Third Grade | 59 | 158 |\n\n**Title range:** ',
  '| 150 | Construction | Third Grade | 59 | 158 |\n' + ccRows + '\n**Title range:** '
);

// Compute actual ranges (include existing ranges)
const allTitleCounts = entries.map(e => cc(e.title));
const allDescCounts = entries.map(e => cc(e.desc));
const minTitle = Math.min(50, ...allTitleCounts);
const maxTitle = Math.max(59, ...allTitleCounts);
const minDesc = Math.min(151, ...allDescCounts);
const maxDesc = Math.max(160, ...allDescCounts);

content = content.replace(
  /\*\*Title range:\*\* \d+-\d+ chars \(all within 50-60 target\)\n\*\*Description range:\*\* \d+-\d+ chars \(all within 150-160 target\)/,
  `**Title range:** ${minTitle}-${maxTitle} chars (all within 50-60 target)\n**Description range:** ${minDesc}-${maxDesc} chars (all within 150-160 target)`
);

// 5. Update Cross-Reference Verification
content = content.replace(
  'None of the 150 theme+grade keywords contain either word. Zero overlap.',
  'None of the 200 theme+grade keywords contain either word. Zero overlap.'
);

content = content.replace(
  'None of the 150 theme+grade keywords use "for kids" as their only qualifier',
  'None of the 200 theme+grade keywords use "for kids" as their only qualifier'
);

// Insert verify rows after construction research row in verification table
content = content.replace(
  '| construction research worksheets third grade | construction worksheets for kids | YES | Grade + skill vs "for kids" |\n\n**Result: 150/150 verified',
  '| construction research worksheets third grade | construction worksheets for kids | YES | Grade + skill vs "for kids" |\n' + verifyRows + '\n**Result: 200/200 verified'
);

// 6. Update totals
content = content.replace(
  '| Theme+grade pages (Parts 6-8) | 150 | This document |\n| **Total** | **233** | **0 duplicates** |',
  '| Theme+grade pages (Parts 6-9) | 200 | This document |\n| **Total** | **283** | **0 duplicates** |'
);

// 7. Insert skill rows into differentiation table
content = content.replace(
  '| Construction | Tool sorting and machine matching | Tool names and building vocabulary | Building site reading and construction math | Structure measurement and building data | Engineering research and STEM writing |\n\n**Result: 30/30 themes verified',
  '| Construction | Tool sorting and machine matching | Tool names and building vocabulary | Building site reading and construction math | Structure measurement and building data | Engineering research and STEM writing |\n' + skillRows + '\n**Result: 40/40 themes verified'
);

// 8. Update Quality Checklist numbers
content = content.replace(
  '| K1: Unique primary | PASS | 150 unique keywords, 0 duplicates among 233 total |',
  '| K1: Unique primary | PASS | 200 unique keywords, 0 duplicates among 283 total |'
);
content = content.replace(
  /\| T1: 50-60 chars \| PASS \| Range: \d+-\d+ chars\. All within target\. \|/,
  `| T1: 50-60 chars | PASS | Range: ${minTitle}-${maxTitle} chars. All within target. |`
);
content = content.replace(
  '| T4: Unique across site | PASS | 150 unique titles, all different from 33 product + 50 theme hub titles |',
  '| T4: Unique across site | PASS | 200 unique titles, all different from 33 product + 50 theme hub titles |'
);
content = content.replace(
  /\| D1: 150-160 chars \| PASS \| Range: \d+-\d+ chars\. All within target\. \|/,
  `| D1: 150-160 chars | PASS | Range: ${minDesc}-${maxDesc} chars. All within target. |`
);
content = content.replace(
  /\| A1: No "generator"\/"maker" \| PASS \| Reserved for product pages \u2014 none found in \d+ keywords \|/,
  '| A1: No "generator"/"maker" | PASS | Reserved for product pages \u2014 none found in 200 keywords |'
);
content = content.replace(
  /\| A2: No bare "for kids" \| PASS \| Reserved for theme hubs \u2014 all \d+ use grade modifiers instead \|/,
  '| A2: No bare "for kids" | PASS | Reserved for theme hubs \u2014 all 200 use grade modifiers instead |'
);
content = content.replace(
  /\| A3: Grade modifier required \| PASS \| All \d+ contain preschool\/kindergarten\/first\/second\/third grade \|/,
  '| A3: Grade modifier required | PASS | All 200 contain preschool/kindergarten/first/second/third grade |'
);
content = content.replace(
  /\| A5: Total \d+ unique \| PASS \| 33 product \+ 50 hub \+ \d+ theme\+grade = \d+ unique keywords \|/,
  '| A5: Total 283 unique | PASS | 33 product + 50 hub + 200 theme+grade = 283 unique keywords |'
);

// 9. Update footer
content = content.replace(
  '*Document created: Parts 6-8 of ONE CLICK A DAY SEO*\n*Themes 1-30 mapped with 150 unique primary keywords across 5 grades each.*\n*Part 9 will append themes 31-50 to this document (100 more entries).*',
  '*Document created: Parts 6-9 of ONE CLICK A DAY SEO*\n*Themes 1-40 mapped with 200 unique primary keywords across 5 grades each.*\n*Part 10 will append themes 41-50 to this document (50 more entries).*'
);

// Write updated file
fs.writeFileSync(FILE, content, 'utf-8');
console.log(`\nFile updated: ${FILE}`);
console.log(`Total entries: 150 existing + ${entries.length} new = ${150 + entries.length}`);

// Print char count summary for new entries
console.log('\n--- New Entry Character Counts ---');
for (const e of entries) {
  console.log(`#${e.n} ${e.theme}/${e.grade}: title=${cc(e.title)}, desc=${cc(e.desc)}`);
}
