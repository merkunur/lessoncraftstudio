/**
 * Part 162: Danish Theme+Grade SEO — Themes 29–32
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for dinosaurs, insects, fruits, vegetables Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  dinosaurs: {
    preschool: {
      seoTitle: 'Dinosaurer-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare dinosaurer-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dinosaurer f\u00f8rskole, dinosaurer opgaver 3\u20134 \u00e5r, dinosaurer \u00f8velser f\u00f8rskole, dinosaurer printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Dinosaurer-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare dinosaurer-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dinosaurer b\u00f8rnehaveklasse, dinosaurer opgaver 5\u20136 \u00e5r, dinosaurer \u00f8velser b\u00f8rnehaveklasse, dinosaurer printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Dinosaurer-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare dinosaurer-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dinosaurer 1. klasse, dinosaurer opgaver 6\u20137 \u00e5r, dinosaurer \u00f8velser 1. klasse, dinosaurer printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Dinosaurer-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare dinosaurer-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dinosaurer 2. klasse, dinosaurer opgaver 7\u20138 \u00e5r, dinosaurer \u00f8velser 2. klasse, dinosaurer printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Dinosaurer-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare dinosaurer-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'dinosaurer 3. klasse, dinosaurer opgaver 8\u20139 \u00e5r, dinosaurer \u00f8velser 3. klasse, dinosaurer printbar 3. klasse',
    },
  },
  insects: {
    preschool: {
      seoTitle: 'Insekter-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare insekter-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'insekter f\u00f8rskole, insekter opgaver 3\u20134 \u00e5r, insekter \u00f8velser f\u00f8rskole, insekter printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Insekter-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare insekter-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'insekter b\u00f8rnehaveklasse, insekter opgaver 5\u20136 \u00e5r, insekter \u00f8velser b\u00f8rnehaveklasse, insekter printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Insekter-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare insekter-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'insekter 1. klasse, insekter opgaver 6\u20137 \u00e5r, insekter \u00f8velser 1. klasse, insekter printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Insekter-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare insekter-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'insekter 2. klasse, insekter opgaver 7\u20138 \u00e5r, insekter \u00f8velser 2. klasse, insekter printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Insekter-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare insekter-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'insekter 3. klasse, insekter opgaver 8\u20139 \u00e5r, insekter \u00f8velser 3. klasse, insekter printbar 3. klasse',
    },
  },
  fruits: {
    preschool: {
      seoTitle: 'Frugter-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare frugter-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'frugter f\u00f8rskole, frugter opgaver 3\u20134 \u00e5r, frugter \u00f8velser f\u00f8rskole, frugter printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Frugter-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare frugter-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'frugter b\u00f8rnehaveklasse, frugter opgaver 5\u20136 \u00e5r, frugter \u00f8velser b\u00f8rnehaveklasse, frugter printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Frugter-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare frugter-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'frugter 1. klasse, frugter opgaver 6\u20137 \u00e5r, frugter \u00f8velser 1. klasse, frugter printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Frugter-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare frugter-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'frugter 2. klasse, frugter opgaver 7\u20138 \u00e5r, frugter \u00f8velser 2. klasse, frugter printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Frugter-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare frugter-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'frugter 3. klasse, frugter opgaver 8\u20139 \u00e5r, frugter \u00f8velser 3. klasse, frugter printbar 3. klasse',
    },
  },
  vegetables: {
    preschool: {
      seoTitle: 'Gr\u00f8ntsager-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare gr\u00f8ntsager-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'gr\u00f8ntsager f\u00f8rskole, gr\u00f8ntsager opgaver 3\u20134 \u00e5r, gr\u00f8ntsager \u00f8velser f\u00f8rskole, gr\u00f8ntsager printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Gr\u00f8ntsager-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare gr\u00f8ntsager-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'gr\u00f8ntsager b\u00f8rnehaveklasse, gr\u00f8ntsager opgaver 5\u20136 \u00e5r, gr\u00f8ntsager \u00f8velser b\u00f8rnehaveklasse, gr\u00f8ntsager printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Gr\u00f8ntsager-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare gr\u00f8ntsager-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'gr\u00f8ntsager 1. klasse, gr\u00f8ntsager opgaver 6\u20137 \u00e5r, gr\u00f8ntsager \u00f8velser 1. klasse, gr\u00f8ntsager printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Gr\u00f8ntsager-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare gr\u00f8ntsager-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'gr\u00f8ntsager 2. klasse, gr\u00f8ntsager opgaver 7\u20138 \u00e5r, gr\u00f8ntsager \u00f8velser 2. klasse, gr\u00f8ntsager printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Gr\u00f8ntsager-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare gr\u00f8ntsager-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'gr\u00f8ntsager 3. klasse, gr\u00f8ntsager opgaver 8\u20139 \u00e5r, gr\u00f8ntsager \u00f8velser 3. klasse, gr\u00f8ntsager printbar 3. klasse',
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
