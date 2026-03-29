#!/usr/bin/env node
/**
 * fix-spanish-accents.js — Fix missing diacritical marks in Spanish content files
 *
 * Scans all Spanish content files and replaces unaccented Spanish words with
 * their correctly accented forms. Only modifies content strings, NOT slugs/URLs.
 *
 * Usage:
 *   node scripts/fix-spanish-accents.js              # Dry run (report only)
 *   node scripts/fix-spanish-accents.js --fix        # Apply fixes
 *   node scripts/fix-spanish-accents.js --type tool  # Only tool-content
 */

const fs = require('fs');
const path = require('path');

const CONFIG_DIR = path.join(__dirname, '..', 'frontend', 'config');
const dryRun = !process.argv.includes('--fix');
const typeFilter = process.argv.includes('--type') ? process.argv[process.argv.indexOf('--type') + 1] : null;

const CONTENT_TYPES = {
  app:    'app-content',
  tool:   'tool-content',
  bundle: 'bundle-content',
  guide:  'guide-content',
  idea:   'idea-content',
  start:  'start-content',
};

// Word-boundary-safe replacements.
// Each entry: [unaccented regex, accented replacement]
// The regex uses lookbehind/lookahead to avoid matching inside longer words
// and avoids matching inside slugs/URLs.
const REPLACEMENTS = [
  // Common standalone words
  [/\blinea\b/g, 'línea'],
  [/\blineas\b/g, 'líneas'],
  [/\bLinea\b/g, 'Línea'],
  [/\bLineas\b/g, 'Líneas'],
  [/\bcredito\b/g, 'crédito'],
  [/\bCredito\b/g, 'Crédito'],
  [/\bcalculo\b/g, 'cálculo'],
  [/\bCalcule\b/g, 'Cálcule'],  // not needed but safe
  [/\bimagenes\b/g, 'imágenes'],
  [/\bImagenes\b/g, 'Imágenes'],
  [/\bmatematicas\b/g, 'matemáticas'],
  [/\bMatematicas\b/g, 'Matemáticas'],
  [/\bmatematicos\b/g, 'matemáticos'],
  [/\bMatematicos\b/g, 'Matemáticos'],
  [/\bmatematica\b/g, 'matemática'],
  [/\bMatematica\b/g, 'Matemática'],
  [/\bnumeros\b/g, 'números'],
  [/\bNumeros\b/g, 'Números'],
  [/\bnumero\b/g, 'número'],
  [/\bNumero\b/g, 'Número'],
  [/\bnumerica\b/g, 'numérica'],
  [/\bnumerico\b/g, 'numérico'],
  [/\bpagina\b/g, 'página'],
  [/\bPagina\b/g, 'Página'],
  [/\bpaginas\b/g, 'páginas'],
  [/\bPaginas\b/g, 'Páginas'],
  [/\bdecodificacion\b/g, 'decodificación'],
  [/\bvehiculos\b/g, 'vehículos'],
  [/\bVehiculos\b/g, 'Vehículos'],
  [/\bvehiculo\b/g, 'vehículo'],
  [/\bcodigo\b/g, 'código'],
  [/\bCodigo\b/g, 'Código'],
  [/\bcodigos\b/g, 'códigos'],
  [/\bespanol\b/g, 'español'],
  [/\bEspanol\b/g, 'Español'],
  [/\bespanola\b/g, 'española'],
  [/\bespanoles\b/g, 'españoles'],
  [/\blogica\b/g, 'lógica'],
  [/\bLogica\b/g, 'Lógica'],
  [/\blogico\b/g, 'lógico'],
  [/\blogicos\b/g, 'lógicos'],
  [/\bbasica\b/g, 'básica'],
  [/\bBasica\b/g, 'Básica'],
  [/\bbasico\b/g, 'básico'],
  [/\bbasicos\b/g, 'básicos'],
  [/\bbasicas\b/g, 'básicas'],
  [/\bpatron\b/g, 'patrón'],
  [/\bPatron\b/g, 'Patrón'],
  [/\bpatrones\b/g, 'patrones'], // patrones is correct (no accent on plural)
  [/\beducacion\b/g, 'educación'],
  [/\bEducacion\b/g, 'Educación'],
  [/\bleccion\b/g, 'lección'],
  [/\bLeccion\b/g, 'Lección'],
  [/\blecciones\b/g, 'lecciones'], // plural correct without accent
  [/\badicion\b/g, 'adición'],
  [/\bsustraccion\b/g, 'sustracción'],
  [/\bmultiplicacion\b/g, 'multiplicación'],
  [/\bdivision\b/g, 'división'],
  [/\bDivision\b/g, 'División'],
  [/\boperacion\b/g, 'operación'],
  [/\boperaciones\b/g, 'operaciones'], // plural correct
  [/\binformacion\b/g, 'información'],
  [/\bInformacion\b/g, 'Información'],
  [/\bevaluacion\b/g, 'evaluación'],
  [/\bcreacion\b/g, 'creación'],
  [/\bCreacion\b/g, 'Creación'],
  [/\bclasificacion\b/g, 'clasificación'],
  [/\bClasificacion\b/g, 'Clasificación'],
  [/\bcomparacion\b/g, 'comparación'],
  [/\basociacion\b/g, 'asociación'],
  [/\bresolucion\b/g, 'resolución'],
  [/\bnavegacion\b/g, 'navegación'],
  [/\bdescripcion\b/g, 'descripción'],
  [/\bconfiguracion\b/g, 'configuración'],
  [/\bConfiguracion\b/g, 'Configuración'],
  [/\bautomatizacion\b/g, 'automatización'],
  [/\boptimizacion\b/g, 'optimización'],
  [/\bOptimizacion\b/g, 'Optimización'],
  [/\bimpresion\b/g, 'impresión'],
  [/\bImpresion\b/g, 'Impresión'],
  [/\bsolucion\b/g, 'solución'],
  [/\bSolucion\b/g, 'Solución'],
  [/\bseleccion\b/g, 'selección'],
  [/\bSeleccion\b/g, 'Selección'],
  [/\bgeneracion\b/g, 'generación'],
  [/\bpersonalizacion\b/g, 'personalización'],
  [/\borganizacion\b/g, 'organización'],
  [/\bproduccion\b/g, 'producción'],
  [/\bdistribucion\b/g, 'distribución'],
  [/\bsuscripcion\b/g, 'suscripción'],
  [/\batencion\b/g, 'atención'],
  [/\bAtencion\b/g, 'Atención'],
  [/\brelacion\b/g, 'relación'],
  [/\bposicion\b/g, 'posición'],
  [/\biluminacion\b/g, 'iluminación'],
  [/\binstruccion\b/g, 'instrucción'],
  [/\bcoleccion\b/g, 'colección'],
  [/\bseccion\b/g, 'sección'],
  [/\bSeccion\b/g, 'Sección'],
  [/\bfuncion\b/g, 'función'],
  [/\bpresentacion\b/g, 'presentación'],
  [/\bpreparacion\b/g, 'preparación'],
  [/\binstalacion\b/g, 'instalación'],
  [/\bverificacion\b/g, 'verificación'],
  [/\bproteccion\b/g, 'protección'],
  [/\bmotivacion\b/g, 'motivación'],
  [/\bintroduccion\b/g, 'introducción'],
  [/\bcontribucion\b/g, 'contribución'],
  [/\bpublicacion\b/g, 'publicación'],
  [/\binversion\b/g, 'inversión'],
  [/\bversion\b/g, 'versión'],
  [/\bVersion\b/g, 'Versión'],
  [/\bdiscriminacion\b/g, 'discriminación'],
  [/\binteraccion\b/g, 'interacción'],
  [/\bconcentracion\b/g, 'concentración'],
  [/\bdecoración\b/g, 'decoración'],
  [/\bdecoracion\b/g, 'decoración'],
  [/\bilustracion\b/g, 'ilustración'],
  [/\bIlustracion\b/g, 'Ilustración'],
  [/\binnovacion\b/g, 'innovación'],
  [/\bsatisfaccion\b/g, 'satisfacción'],
  [/\brecomendacion\b/g, 'recomendación'],
  [/\bcomunicacion\b/g, 'comunicación'],
  [/\baplicacion\b/g, 'aplicación'],
  [/\bimaginacion\b/g, 'imaginación'],
  [/\bobservacion\b/g, 'observación'],
  [/\bretencion\b/g, 'retención'],
  [/\brotacion\b/g, 'rotación'],
  [/\bpromotion\b/g, 'promoción'],
  [/\bpromocion\b/g, 'promoción'],
  [/\bespecializacion\b/g, 'especialización'],
  [/\bdiversificacion\b/g, 'diversificación'],
  [/\bdiferenciacion\b/g, 'diferenciación'],
  [/\bsegmentacion\b/g, 'segmentación'],
  [/\bfidelizacion\b/g, 'fidelización'],
  [/\bmonetizacion\b/g, 'monetización'],
  [/\bvisualizacion\b/g, 'visualización'],
  [/\bcalibracion\b/g, 'calibración'],
  [/\bprogramacion\b/g, 'programación'],
  [/\bconfiguration\b/g, 'configuración'],  // English typo catch
  [/\brecaudacion\b/g, 'recaudación'],
  [/\bcombinacion\b/g, 'combinación'],
  [/\bmanipulacion\b/g, 'manipulación'],
  [/\bconexion\b/g, 'conexión'],
  [/\bdeteccion\b/g, 'detección'],
  [/\bplanificacion\b/g, 'planificación'],
  [/\bidentificacion\b/g, 'identificación'],
  // Ñ words
  [/\bninos\b/g, 'niños'],
  [/\bNinos\b/g, 'Niños'],
  [/\bnino\b/g, 'niño'],
  [/\bNino\b/g, 'Niño'],
  [/\bdiseno\b/g, 'diseño'],
  [/\bDiseno\b/g, 'Diseño'],
  [/\bsenalas\b/g, 'señalas'],
  [/\bsenales\b/g, 'señales'],
  [/\bensena\b/g, 'enseña'],
  [/\bensenanza\b/g, 'enseñanza'],
  [/\btamano\b/g, 'tamaño'],
  [/\bTamano\b/g, 'Tamaño'],
  [/\btamanos\b/g, 'tamaños'],
  [/\bpequeno\b/g, 'pequeño'],
  [/\bPequeno\b/g, 'Pequeño'],
  [/\bpequenos\b/g, 'pequeños'],
  [/\bpequena\b/g, 'pequeña'],
  [/\bpequenas\b/g, 'pequeñas'],
  [/\botono\b/g, 'otoño'],
  [/\bOtono\b/g, 'Otoño'],
  [/\bano\b/g, 'año'],
  [/\banos\b/g, 'años'],
  [/\bcompania\b/g, 'compañía'],
  // Ü words
  [/\bbilinguee?\b/g, 'bilingüe'],
  [/\blinguistica\b/g, 'lingüística'],
  // Accent on common verbs/words
  // NOTE: "mas" (but) vs "más" (more) — TOO RISKY for auto-fix, skip
  [/\btambien\b/g, 'también'],
  [/\bTambien\b/g, 'También'],
  [/\basi\b/g, 'así'],
  [/\bfacil\b/g, 'fácil'],
  [/\bFacil\b/g, 'Fácil'],
  [/\bfaciles\b/g, 'fáciles'],
  [/\brapido\b/g, 'rápido'],
  [/\bRapido\b/g, 'Rápido'],
  [/\brapida\b/g, 'rápida'],
  [/\brapidamente\b/g, 'rápidamente'],
  [/\butil\b/g, 'útil'],
  [/\bUtil\b/g, 'Útil'],
  [/\butiles\b/g, 'útiles'],
  [/\bunico\b/g, 'único'],
  [/\bUnico\b/g, 'Único'],
  [/\bunica\b/g, 'única'],
  [/\bunicos\b/g, 'únicos'],
  [/\bbusqueda\b/g, 'búsqueda'],
  [/\bBusqueda\b/g, 'Búsqueda'],
  [/\bbusquedas\b/g, 'búsquedas'],
  [/\bcatalogo\b/g, 'catálogo'],
  [/\bCatalogo\b/g, 'Catálogo'],
  [/\bcatalogos\b/g, 'catálogos'],
  [/\bautomatico\b/g, 'automático'],
  [/\bautomatica\b/g, 'automática'],
  [/\bautomaticos\b/g, 'automáticos'],
  [/\btematica\b/g, 'temática'],
  [/\btematicas\b/g, 'temáticas'],
  [/\btematico\b/g, 'temático'],
  [/\btematicos\b/g, 'temáticos'],
  [/\bgrafico\b/g, 'gráfico'],
  [/\bGrafico\b/g, 'Gráfico'],
  [/\bgraficos\b/g, 'gráficos'],
  [/\bgrafica\b/g, 'gráfica'],
  [/\bgraficas\b/g, 'gráficas'],
  [/\bpreractica\b/g, 'práctica'],
  [/\bpractica\b/g, 'práctica'],
  [/\bpracticas\b/g, 'prácticas'],
  [/\bpractico\b/g, 'práctico'],
  [/\bpracticos\b/g, 'prácticos'],
  // Question words — ONLY in question contexts (before ? or at H2 start)
  // "Como" can mean "as/like" (no accent) or "how" (Cómo) — TOO RISKY for auto-fix
  // "Que" can mean "that" (no accent) or "what" (Qué) — TOO RISKY for auto-fix
  // These must be fixed manually during content review phases
];

// Lines to SKIP (slugs, URLs, import/export, keys)
function isSkippableLine(line) {
  const trimmed = line.trim();
  // Import/export statements
  if (/^(import|export\s+(const|default|interface|type))\b/.test(trimmed)) return true;
  // Comments
  if (/^\/\//.test(trimmed)) return true;
  // Slug fields
  if (/^slug:\s*['"`]/.test(trimmed)) return true;
  // AppId fields
  if (/^appId:\s*['"`]/.test(trimmed)) return true;
  // Source/URL fields
  if (/^(src|href|url):\s*['"`]/.test(trimmed)) return true;
  // PageType fields
  if (/^pageType:\s*['"`]/.test(trimmed)) return true;
  return false;
}

let totalFixed = 0;
let filesModified = 0;

for (const [type, dir] of Object.entries(CONTENT_TYPES)) {
  if (typeFilter && type !== typeFilter) continue;

  const esDir = path.join(CONFIG_DIR, dir, 'es');
  if (!fs.existsSync(esDir)) continue;

  const files = fs.readdirSync(esDir).filter(f => f.endsWith('.ts')).sort();

  for (const file of files) {
    const filePath = path.join(esDir, file);
    const original = fs.readFileSync(filePath, 'utf8');
    const lines = original.split('\n');
    let fileFixCount = 0;

    const fixedLines = lines.map((line, idx) => {
      if (isSkippableLine(line)) return line;

      let fixedLine = line;
      for (const [pattern, replacement] of REPLACEMENTS) {
        // Reset regex lastIndex
        pattern.lastIndex = 0;
        const before = fixedLine;
        fixedLine = fixedLine.replace(pattern, replacement);
        if (fixedLine !== before) {
          const matchCount = (before.match(pattern) || []).length;
          fileFixCount += matchCount;
        }
        pattern.lastIndex = 0;
      }
      return fixedLine;
    });

    if (fileFixCount > 0) {
      const fixedContent = fixedLines.join('\n');
      if (!dryRun) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
      }
      console.log(`${dryRun ? '[DRY RUN] ' : ''}${type}/${path.basename(file, '.ts')}: ${fileFixCount} fix(es)`);
      totalFixed += fileFixCount;
      filesModified++;
    }
  }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`${dryRun ? '[DRY RUN] ' : ''}Total: ${totalFixed} fixes across ${filesModified} files`);
if (dryRun) {
  console.log('Run with --fix to apply changes.');
}
