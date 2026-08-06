/**
 * Part 161: Danish Theme+Grade SEO — Themes 25–28
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for xmas, winter, farm, ocean Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  xmas: {
    preschool: {
      seoTitle: 'Jul-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare jul-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'jul f\u00f8rskole, jul opgaver 3\u20134 \u00e5r, jul \u00f8velser f\u00f8rskole, jul printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Jul-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare jul-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'jul b\u00f8rnehaveklasse, jul opgaver 5\u20136 \u00e5r, jul \u00f8velser b\u00f8rnehaveklasse, jul printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Jul-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare jul-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'jul 1. klasse, jul opgaver 6\u20137 \u00e5r, jul \u00f8velser 1. klasse, jul printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Jul-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare jul-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'jul 2. klasse, jul opgaver 7\u20138 \u00e5r, jul \u00f8velser 2. klasse, jul printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Jul-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare jul-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'jul 3. klasse, jul opgaver 8\u20139 \u00e5r, jul \u00f8velser 3. klasse, jul printbar 3. klasse',
    },
  },
  winter: {
    preschool: {
      seoTitle: 'Vinter-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare vinter-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vinter f\u00f8rskole, vinter opgaver 3\u20134 \u00e5r, vinter \u00f8velser f\u00f8rskole, vinter printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Vinter-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare vinter-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vinter b\u00f8rnehaveklasse, vinter opgaver 5\u20136 \u00e5r, vinter \u00f8velser b\u00f8rnehaveklasse, vinter printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Vinter-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare vinter-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vinter 1. klasse, vinter opgaver 6\u20137 \u00e5r, vinter \u00f8velser 1. klasse, vinter printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Vinter-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare vinter-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vinter 2. klasse, vinter opgaver 7\u20138 \u00e5r, vinter \u00f8velser 2. klasse, vinter printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Vinter-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare vinter-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vinter 3. klasse, vinter opgaver 8\u20139 \u00e5r, vinter \u00f8velser 3. klasse, vinter printbar 3. klasse',
    },
  },
  farm: {
    preschool: {
      seoTitle: 'Bondeg\u00e5rd-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare bondeg\u00e5rd-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'bondeg\u00e5rd f\u00f8rskole, bondeg\u00e5rd opgaver 3\u20134 \u00e5r, bondeg\u00e5rd \u00f8velser f\u00f8rskole, bondeg\u00e5rd printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Bondeg\u00e5rd-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare bondeg\u00e5rd-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'bondeg\u00e5rd b\u00f8rnehaveklasse, bondeg\u00e5rd opgaver 5\u20136 \u00e5r, bondeg\u00e5rd \u00f8velser b\u00f8rnehaveklasse, bondeg\u00e5rd printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Bondeg\u00e5rd-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare bondeg\u00e5rd-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'bondeg\u00e5rd 1. klasse, bondeg\u00e5rd opgaver 6\u20137 \u00e5r, bondeg\u00e5rd \u00f8velser 1. klasse, bondeg\u00e5rd printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Bondeg\u00e5rd-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare bondeg\u00e5rd-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'bondeg\u00e5rd 2. klasse, bondeg\u00e5rd opgaver 7\u20138 \u00e5r, bondeg\u00e5rd \u00f8velser 2. klasse, bondeg\u00e5rd printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Bondeg\u00e5rd-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare bondeg\u00e5rd-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'bondeg\u00e5rd 3. klasse, bondeg\u00e5rd opgaver 8\u20139 \u00e5r, bondeg\u00e5rd \u00f8velser 3. klasse, bondeg\u00e5rd printbar 3. klasse',
    },
  },
  ocean: {
    preschool: {
      seoTitle: 'Hav-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare hav-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'hav f\u00f8rskole, hav opgaver 3\u20134 \u00e5r, hav \u00f8velser f\u00f8rskole, hav printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Hav-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare hav-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'hav b\u00f8rnehaveklasse, hav opgaver 5\u20136 \u00e5r, hav \u00f8velser b\u00f8rnehaveklasse, hav printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Hav-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare hav-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'hav 1. klasse, hav opgaver 6\u20137 \u00e5r, hav \u00f8velser 1. klasse, hav printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Hav-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare hav-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'hav 2. klasse, hav opgaver 7\u20138 \u00e5r, hav \u00f8velser 2. klasse, hav printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Hav-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare hav-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'hav 3. klasse, hav opgaver 8\u20139 \u00e5r, hav \u00f8velser 3. klasse, hav printbar 3. klasse',
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
