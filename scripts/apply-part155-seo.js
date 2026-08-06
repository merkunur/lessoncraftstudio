/**
 * Part 155: Danish Theme+Grade SEO — Themes 1–4
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for animals, food, transportation, nature Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  animals: {
    preschool: {
      seoTitle: 'Dyr-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare dyr-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dyr f\u00f8rskole, dyr opgaver 3\u20134 \u00e5r, dyr \u00f8velser f\u00f8rskole, dyr printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Dyr-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare dyr-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dyr b\u00f8rnehaveklasse, dyr opgaver 5\u20136 \u00e5r, dyr \u00f8velser b\u00f8rnehaveklasse, dyr printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Dyr-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare dyr-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dyr 1. klasse, dyr opgaver 6\u20137 \u00e5r, dyr \u00f8velser 1. klasse, dyr printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Dyr-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare dyr-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dyr 2. klasse, dyr opgaver 7\u20138 \u00e5r, dyr \u00f8velser 2. klasse, dyr printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Dyr-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare dyr-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dyr 3. klasse, dyr opgaver 8\u20139 \u00e5r, dyr \u00f8velser 3. klasse, dyr printbar 3. klasse',
    },
  },
  food: {
    preschool: {
      seoTitle: 'Mad-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare mad-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'mad f\u00f8rskole, mad opgaver 3\u20134 \u00e5r, mad \u00f8velser f\u00f8rskole, mad printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Mad-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare mad-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'mad b\u00f8rnehaveklasse, mad opgaver 5\u20136 \u00e5r, mad \u00f8velser b\u00f8rnehaveklasse, mad printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Mad-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare mad-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'mad 1. klasse, mad opgaver 6\u20137 \u00e5r, mad \u00f8velser 1. klasse, mad printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Mad-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare mad-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'mad 2. klasse, mad opgaver 7\u20138 \u00e5r, mad \u00f8velser 2. klasse, mad printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Mad-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare mad-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'mad 3. klasse, mad opgaver 8\u20139 \u00e5r, mad \u00f8velser 3. klasse, mad printbar 3. klasse',
    },
  },
  transportation: {
    preschool: {
      seoTitle: 'Transport-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare transport-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'transport f\u00f8rskole, transport opgaver 3\u20134 \u00e5r, transport \u00f8velser f\u00f8rskole, transport printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Transport-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare transport-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'transport b\u00f8rnehaveklasse, transport opgaver 5\u20136 \u00e5r, transport \u00f8velser b\u00f8rnehaveklasse, transport printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Transport-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare transport-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'transport 1. klasse, transport opgaver 6\u20137 \u00e5r, transport \u00f8velser 1. klasse, transport printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Transport-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare transport-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'transport 2. klasse, transport opgaver 7\u20138 \u00e5r, transport \u00f8velser 2. klasse, transport printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Transport-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare transport-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'transport 3. klasse, transport opgaver 8\u20139 \u00e5r, transport \u00f8velser 3. klasse, transport printbar 3. klasse',
    },
  },
  nature: {
    preschool: {
      seoTitle: 'Natur-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare natur-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'natur f\u00f8rskole, natur opgaver 3\u20134 \u00e5r, natur \u00f8velser f\u00f8rskole, natur printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Natur-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare natur-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'natur b\u00f8rnehaveklasse, natur opgaver 5\u20136 \u00e5r, natur \u00f8velser b\u00f8rnehaveklasse, natur printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Natur-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare natur-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'natur 1. klasse, natur opgaver 6\u20137 \u00e5r, natur \u00f8velser 1. klasse, natur printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Natur-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare natur-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'natur 2. klasse, natur opgaver 7\u20138 \u00e5r, natur \u00f8velser 2. klasse, natur printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Natur-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare natur-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'natur 3. klasse, natur opgaver 8\u20139 \u00e5r, natur \u00f8velser 3. klasse, natur printbar 3. klasse',
    },
  },
};

const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

function escapeForTs(str) {
  // Escape single quotes and backslashes for TS string literal
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

let totalInserted = 0;

for (const [theme, grades] of Object.entries(seoData)) {
  const filePath = path.join(BASE, theme, 'da.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let inGradeContent = false;
  let currentGrade = null;
  let gradeLineFound = false;
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    // Detect gradeContent section
    if (trimmed.startsWith('gradeContent:') || trimmed.startsWith('gradeContent :')) {
      inGradeContent = true;
    }

    if (inGradeContent) {
      // Detect grade start (4-space or more indent with grade id)
      for (const gradeId of gradeIds) {
        if (trimmed.startsWith(`'${gradeId}':`)) {
          currentGrade = gradeId;
          gradeLineFound = true;
          break;
        }
      }

      // Detect the grade's intro line (must be inside gradeContent, after grade identifier)
      if (currentGrade && gradeLineFound && trimmed.startsWith('intro:') && grades[currentGrade]) {
        // Check if seoTitle already exists (skip if already inserted)
        if (i > 0 && !lines[i - 1].includes('seoKeywords:')) {
          const data = grades[currentGrade];
          const indent = line.match(/^(\s*)/)[1]; // match indentation
          newLines.push(`${indent}seoTitle: '${escapeForTs(data.seoTitle)}',`);
          newLines.push(`${indent}seoDescription: '${escapeForTs(data.seoDescription)}',`);
          newLines.push(`${indent}seoKeywords: '${escapeForTs(data.seoKeywords)}',`);
          totalInserted++;
          console.log(`  + ${theme}/${currentGrade}: inserted SEO fields`);
        } else {
          console.log(`  ~ ${theme}/${currentGrade}: SEO fields already present, skipping`);
        }
        currentGrade = null;
        gradeLineFound = false;
      }
    }

    newLines.push(line);
  }

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Updated ${theme}/da.ts`);
}

console.log(`\nDone! Inserted SEO fields for ${totalInserted} grade entries.`);
