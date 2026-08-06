const fs = require('fs');
const path = require('path');

const toolSlugs = {
  'image-addition': 'generador-fichas-suma',
  'image-subtraction': 'generador-fichas-resta',
  'code-addition': 'generador-suma-codificada',
  'more-less': 'generador-comparacion-cantidades',
  'math-puzzle': 'generador-puzzles-matematicos',
  'math-worksheet': 'generador-ejercicios-matematicas',
  'alphabet-train': 'generador-tren-abecedario',
  'prepositions': 'generador-fichas-preposiciones',
  'word-guess': 'generador-adivinar-palabras',
  'word-scramble': 'generador-palabras-desordenadas',
  'word-search': 'generador-sopa-letras',
  'cryptogram': 'generador-criptogramas',
  'writing': 'generador-fichas-escritura',
  'big-small': 'generador-fichas-grande-pequeno',
  'pattern-train': 'generador-tren-patrones',
  'pattern-worksheet': 'generador-fichas-patrones',
  'draw-and-color': 'generador-dibujo-cuadricula',
  'drawing-lines': 'generador-fichas-grafomotricidad',
  'coloring': 'generador-paginas-colorear',
  'chart-count': 'generador-graficos-imagenes',
  'matching': 'generador-fichas-asociacion',
  'grid-match': 'generador-puzzle-cuadricula',
  'shadow-match': 'generador-discriminacion-visual',
  'bingo': 'generador-tarjetas-bingo',
  'picture-sort': 'generador-clasificacion-imagenes',
  'missing-pieces': 'generador-piezas-faltantes',
  'odd-one-out': 'generador-fichas-intruso',
  'sudoku': 'generador-sudoku-infantil',
  'picture-path': 'generador-recorrido-imagenes',
  'find-and-count': 'generador-busca-cuenta',
  'find-objects': 'generador-busca-objetos',
  'crossword': 'generador-crucigramas-imagenes',
  'treasure-hunt': 'generador-busqueda-tesoro',
};

const bundleSlugs = {
  'math-bundle': 'paquete-dominio-matematicas',
  'literacy-bundle': 'paquete-lectura-lenguaje',
  'visual-bundle': 'paquete-aprendizaje-visual',
  'matching-bundle': 'paquete-asociacion-clasificacion',
  'puzzle-bundle': 'paquete-puzzles-logica',
  'search-bundle': 'paquete-busca-encuentra',
};

function addEsSlugsMultiline(content, slugMap) {
  let modified = content;
  for (const [id, esSlug] of Object.entries(slugMap)) {
    // Match: fr: 'some-slug',\n    },  (multi-line format)
    // Add es: line after fr: line
    const frLineRegex = new RegExp(
      `(      fr: '[^']*',)\\n(    },)`,
      'g'
    );
    // We need to find the specific entry first
    const entryRegex = new RegExp(
      `'${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?(      fr: '[^']*',)\\n(    },)`
    );
    const match = modified.match(entryRegex);
    if (match) {
      const oldStr = match[1] + '\n' + match[2];
      const newStr = match[1] + '\n      es: \'' + esSlug + '\',\n' + match[2];
      modified = modified.replace(oldStr, newStr);
    } else {
      console.warn(`WARNING: Could not find entry for ${id}`);
    }
  }
  return modified;
}

const configDir = path.join(__dirname, '..', 'frontend', 'config');

// Tool file
const toolFile = path.join(configDir, 'tool-page-slugs.ts');
let toolContent = fs.readFileSync(toolFile, 'utf8');
toolContent = addEsSlugsMultiline(toolContent, toolSlugs);
fs.writeFileSync(toolFile, toolContent, 'utf8');

// Count es: lines
const toolEsCount = (toolContent.match(/es: '/g) || []).length;
console.log(`tool-page-slugs.ts: ${toolEsCount} es: entries (expected 33 + 1 type = 34)`);

// Bundle file
const bundleFile = path.join(configDir, 'bundle-page-slugs.ts');
let bundleContent = fs.readFileSync(bundleFile, 'utf8');
bundleContent = addEsSlugsMultiline(bundleContent, bundleSlugs);
fs.writeFileSync(bundleFile, bundleContent, 'utf8');

const bundleEsCount = (bundleContent.match(/es: '/g) || []).length;
console.log(`bundle-page-slugs.ts: ${bundleEsCount} es: entries (expected 6 + 1 type = 7)`);
