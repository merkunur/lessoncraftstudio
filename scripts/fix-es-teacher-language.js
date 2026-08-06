const fs = require('fs');
const path = require('path');

const dirs = [
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/app-content/es',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/tool-content/es',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/guide-content/es',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/bundle-content/es',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/idea-content/es',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/start-content/es',
];

// Order matters: longest/most specific phrases first
const replacements = [
  // Multi-word phrases first (longest first to avoid partial matches)
  // TPT / Teachers Pay Teachers (but NOT in slugs/paths)
  [/Teachers Pay Teachers/g, 'Gumroad'],
  [/Teachers Pay/g, 'Gumroad'],

  // "impresión en el aula" -> "impresión en volumen"
  [/impresión en el aula/gi, 'impresión en volumen'],
  [/Impresión en el aula/g, 'Impresión en volumen'],

  // Context-specific aula phrases
  [/uso en el aula/gi, 'uso comercial'],
  [/necesidades del aula/gi, 'necesidades del mercado'],
  [/necesidades de aula/gi, 'necesidades del mercado'],
  [/entorno de aula/gi, 'entorno comercial'],
  [/implementación en el aula/gi, 'implementación comercial'],
  [/listos para el aula/gi, 'listos para vender'],
  [/listo para el aula/gi, 'listo para vender'],
  [/ready for the aula/gi, 'listo para vender'],
  [/para el aula/gi, 'para venta en línea'],
  [/para la aula/gi, 'para venta en línea'],
  [/del aula/gi, 'del mercado'],
  [/de la aula/gi, 'del mercado'],
  [/en el aula/gi, 'en línea'],
  [/en clase/gi, 'en línea'],
  [/de aula/gi, 'del mercado'],
  [/en aulas/gi, 'en tiendas'],

  // "salón de clases" -> "tienda"
  [/salones de clases/gi, 'tiendas'],
  [/salón de clases/gi, 'tienda'],

  // "diferenciación pedagógica" / "instrucción diferenciada"
  [/diferenciación pedagógica/gi, 'paquetes escalonados por nivel'],
  [/instrucción diferenciada/gi, 'paquetes escalonados por nivel'],

  // "plan de estudios" / "currículo" / "curriculum"
  [/planes de estudios/gi, 'catálogos de productos'],
  [/plan de estudios/gi, 'catálogo de productos'],
  [/currículos/gi, 'catálogos de productos'],
  [/currículo/gi, 'catálogo de productos'],
  [/curriculums/gi, 'catálogos de productos'],
  [/curricular/gi, 'de productos'],
  [/curriculum/gi, 'catálogo de productos'],

  // "material pedagógico" / "recursos pedagógicos" / "material educativo"
  [/materiales pedagógicos/gi, 'productos imprimibles'],
  [/material pedagógico/gi, 'productos imprimibles'],
  [/recursos pedagógicos/gi, 'productos imprimibles'],
  [/materiales educativos/gi, 'productos imprimibles'],
  [/material educativo/gi, 'productos imprimibles'],
  [/materiales didácticos/gi, 'productos imprimibles'],
  [/material didáctico/gi, 'productos imprimibles'],
  [/contenido educativo/gi, 'contenido imprimible'],

  // "apto para niños" / "amigable para niños" / "adaptada a niños"
  [/apto para niños/gi, 'legible'],
  [/aptos para niños/gi, 'legibles'],
  [/apta para niños/gi, 'legible'],
  [/aptas para niños/gi, 'legibles'],
  [/amigable para niños/gi, 'claro'],
  [/amigables para niños/gi, 'claros'],
  [/adaptada a niños/gi, 'atractivo'],
  [/adaptado a niños/gi, 'atractivo'],
  [/adaptadas a niños/gi, 'atractivos'],
  [/adaptados a niños/gi, 'atractivos'],
  [/adaptada para niños/gi, 'atractivo'],
  [/adaptado para niños/gi, 'atractivo'],
  [/amigables con los niños/gi, 'claros'],
  [/amigable con los niños/gi, 'claro'],

  // "nombre del alumno" / "nombre del estudiante"
  [/nombre y fecha del alumno/gi, 'nombre y fecha'],
  [/nombre del alumno/gi, 'nombre'],
  [/nombre del estudiante/gi, 'nombre'],
  [/nombres de los alumnos/gi, 'nombres'],
  [/nombres de los estudiantes/gi, 'nombres'],
  [/nombres de alumnos/gi, 'nombres'],
  [/nombres de estudiantes/gi, 'nombres'],

  // "para maestros" / "para profesores"
  [/para maestros/gi, 'para vendedores'],
  [/para profesores/gi, 'para vendedores'],
  [/para docentes/gi, 'para vendedores'],
  [/para educadores/gi, 'para emprendedores'],

  // "notas para el profesor" -> "notas de uso"
  [/notas para el profesor/gi, 'notas de uso'],
  [/notas para el maestro/gi, 'notas de uso'],
  [/guía del profesor/gi, 'guía de uso'],
  [/guía del maestro/gi, 'guía de uso'],

  // "calificación" / "tiempo de corrección" -> "valor percibido"
  [/tiempo de corrección/gi, 'valor percibido'],
  [/tiempo de planificación/gi, 'tiempo de producción'],

  // "fuentes amigables/adaptadas"
  [/fuentes amigables para niños/gi, 'fuentes legibles'],
  [/fuentes adaptadas a niños/gi, 'fuentes legibles'],

  // "experiencia docente" -> "experiencia en el mercado"
  [/experiencia docente/gi, 'experiencia en el mercado'],
  [/experiencia de enseñanza/gi, 'experiencia en el mercado'],
  [/credenciales docentes/gi, 'credenciales profesionales'],

  // "especialidad docente" -> "especialidad de productos"
  [/especialidad docente/gi, 'especialidad de productos'],

  // "aulas reales" -> "mercados reales"
  [/aulas reales/gi, 'mercados reales'],

  // "marketplace educativo" -> keep or adjust
  // "audiencia educadora" -> "audiencia compradora"
  [/audiencia educadora/gi, 'audiencia compradora'],

  // "educador a educador" -> "vendedor a comprador"
  [/de educador a educador/gi, 'de vendedor a comprador'],

  // "educación en casa" -> "trabajo desde casa" when about audience
  // Actually homeschool parents are legitimate buyers, keep as is mostly

  // Single words with word boundaries
  // "alumnos" / "estudiantes" -> "usuarios" / "resolutores"
  [/\blos alumnos\b/g, 'los usuarios'],
  [/\bLos alumnos\b/g, 'Los usuarios'],
  [/\blos estudiantes\b/g, 'los usuarios'],
  [/\bLos estudiantes\b/g, 'Los usuarios'],
  [/\balumnos\b/g, 'usuarios'],
  [/\bAlumnos\b/g, 'Usuarios'],
  [/\balumno\b/g, 'usuario'],
  [/\bAlumno\b/g, 'Usuario'],
  [/\bestudiantes\b/g, 'usuarios'],
  [/\bEstudiantes\b/g, 'Usuarios'],
  [/\bestudiante\b/g, 'usuario'],
  [/\bEstudiante\b/g, 'Usuario'],

  // "maestros" / "profesores" / "docentes" -> "vendedores" / "compradores"
  [/\blos maestros\b/g, 'los vendedores'],
  [/\bLos maestros\b/g, 'Los vendedores'],
  [/\blos profesores\b/g, 'los vendedores'],
  [/\bLos profesores\b/g, 'Los vendedores'],
  [/\bmaestros\b/g, 'vendedores'],
  [/\bMaestros\b/g, 'Vendedores'],
  [/\bmaestro\b/g, 'vendedor'],
  [/\bMaestro\b/g, 'Vendedor'],
  [/\bprofesores\b/g, 'vendedores'],
  [/\bProfesores\b/g, 'Vendedores'],
  [/\bprofesor\b/g, 'vendedor'],
  [/\bProfesor\b/g, 'Vendedor'],
  [/\bdocentes\b/g, 'vendedores'],
  [/\bDocentes\b/g, 'Vendedores'],
  [/\bdocente\b/g, 'vendedor'],
  [/\bDocente\b/g, 'Vendedor'],

  // "educadores" -> "emprendedores"
  [/\beducadores\b/g, 'emprendedores'],
  [/\bEducadores\b/g, 'Emprendedores'],
  [/\beducador\b/g, 'emprendedor'],
  [/\bEducador\b/g, 'Emprendedor'],

  // "aula" -> "tienda"
  [/\baulas\b/g, 'tiendas'],
  [/\bAulas\b/g, 'Tiendas'],
  [/\baula\b/g, 'tienda'],
  [/\bAula\b/g, 'Tienda'],

  // "calificación" -> "valor percibido" (when about grading, not ratings)
  // Be careful: "calificaciones" as "ratings" should stay
  // Only replace singular "calificación" meaning "grading"
  [/\bcalificación\b/g, 'valor percibido'],
];

// Special TPT replacement - avoid slugs and paths
function replaceTpt(text) {
  // Protect slug-like contexts and path contexts
  const protected = [];
  // Protect anything in single quotes that contains tpt with hyphens (slugs)
  let result = text.replace(/'[a-z0-9-]*tpt[a-z0-9-]*'/gi, (match) => {
    protected.push(match);
    return `__PROT_${protected.length - 1}__`;
  });
  // Protect image-library paths
  result = result.replace(/\/image-library\/[a-z-]+\//gi, (match) => {
    protected.push(match);
    return `__PROT_${protected.length - 1}__`;
  });

  // Now replace TPT in normal text
  result = result.replace(/\bTPT\b/g, 'Gumroad');
  result = result.replace(/\bTpT\b/g, 'Gumroad');

  // Restore protected
  for (let i = 0; i < protected.length; i++) {
    result = result.replace(`__PROT_${i}__`, protected[i]);
  }

  return result;
}

let totalFiles = 0;
let totalChanges = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    continue;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  console.log(`\n--- ${dir} (${files.length} files) ---`);
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Apply all regex replacements
    for (const [pattern, replacement] of replacements) {
      content = content.replace(pattern, replacement);
    }

    // Apply TPT replacement with slug protection
    content = replaceTpt(content);

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFiles++;
      const origLines = original.split('\n');
      const newLines = content.split('\n');
      let changes = 0;
      for (let i = 0; i < Math.max(origLines.length, newLines.length); i++) {
        if (origLines[i] !== newLines[i]) changes++;
      }
      totalChanges += changes;
      console.log(`  ${file}: ${changes} lines changed`);
    }
  }
}

console.log(`\n=== TOTAL: ${totalFiles} files updated, ${totalChanges} lines changed ===`);
