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

// Feminine forms and remaining patterns
const replacements = [
  // Feminine forms
  [/\bprofesoras\b/g, 'vendedoras'],
  [/\bProfesoras\b/g, 'Vendedoras'],
  [/\bprofesora\b/g, 'vendedora'],
  [/\bProfesora\b/g, 'Vendedora'],
  [/\bmaestras\b/g, 'vendedoras'],
  [/\bMaestras\b/g, 'Vendedoras'],
  [/\bmaestra\b/g, 'vendedora'],
  [/\bMaestra\b/g, 'Vendedora'],
  [/\beducadoras\b/g, 'emprendedoras'],
  [/\bEducadoras\b/g, 'Emprendedoras'],
  [/\beducadora en casa\b/g, 'emprendedora'],
  [/\beducadora\b/g, 'emprendedora'],
  [/\bEducadora\b/g, 'Emprendedora'],

  // "educación en casa" related
  [/madre que educa en casa/g, 'emprendedora'],
  [/madres que educan en casa/g, 'emprendedoras'],
  [/familias que educan en casa/g, 'emprendedores'],
  [/padres que educan en casa/g, 'emprendedores'],
  [/educan en casa/g, 'trabajan desde casa'],
  [/educa en casa/g, 'trabaja desde casa'],
  [/educación en casa/g, 'trabajo desde casa'],

  // "enseñanza" when about teaching in classroom context
  [/enseñanza diferenciada/g, 'oferta diferenciada'],
  [/diferenciar la enseñanza/g, 'diferenciar la oferta'],

  // "calificaciones" as in grading plural
  // Leave alone as it could mean "ratings"
];

let totalFiles = 0;
let totalChanges = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    for (const [pattern, replacement] of replacements) {
      content = content.replace(pattern, replacement);
    }

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
      console.log(`  ${path.basename(dir)}/${file}: ${changes} lines changed`);
    }
  }
}

console.log(`\n=== Pass 2: ${totalFiles} files updated, ${totalChanges} lines changed ===`);
