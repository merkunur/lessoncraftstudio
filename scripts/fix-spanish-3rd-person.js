#!/usr/bin/env node
/**
 * fix-spanish-3rd-person.js — Fix 3rd-person verbs incorrectly changed to subjunctive
 *
 * The usted conversion script incorrectly changed some 3rd-person present tense
 * verbs to subjunctive form (e.g., "incluye" → "incluya" when subject is "ficha").
 *
 * This script reverses those incorrect conversions by detecting common 3rd-person
 * contexts and restoring the correct indicative form.
 *
 * Usage:
 *   node scripts/fix-spanish-3rd-person.js              # Dry run
 *   node scripts/fix-spanish-3rd-person.js --fix        # Apply
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

// Pattern: "se + subjunctive" should be "se + indicative" (reflexive 3rd person)
// e.g., "se exporte" → "se exporta", "se genere" → "se genera"
const REFLEXIVE_FIXES = [
  [/\bse exporte\b/g, 'se exporta'],
  [/\bse genere\b/g, 'se genera'],
  [/\bse active\b/g, 'se activa'],
  [/\bse desactive\b/g, 'se desactiva'],
  [/\bse actualice\b/g, 'se actualiza'],
  [/\bse configure\b/g, 'se configura'],
  [/\bse seleccione\b/g, 'se selecciona'],
  [/\bse ajuste\b/g, 'se ajusta'],
  [/\bse descargue\b/g, 'se descarga'],
  [/\bse guarde\b/g, 'se guarda'],
  [/\bse combine\b/g, 'se combina'],
  [/\bse publique\b/g, 'se publica'],
  [/\bse aplique\b/g, 'se aplica'],
  [/\bse cree\b/g, 'se crea'],
  [/\bse use\b/g, 'se usa'],
  [/\bse muestre\b/g, 'se muestra'],
  [/\bse incluya\b/g, 'se incluye'],
  [/\bse explore\b/g, 'se explora'],
  [/\bse realice\b/g, 'se realiza'],
  [/\bse añada\b/g, 'se añade'],
  [/\bse verifique\b/g, 'se verifica'],
  [/\bse introduzca\b/g, 'se introduce'],
  [/\bse determine\b/g, 'se determina'],
  [/\bse establezca\b/g, 'se establece'],
  [/\bse personalice\b/g, 'se personaliza'],
  [/\bse convierte\b/g, 'se convierte'],  // ensure correct
  [/\bse inicie\b/g, 'se inicia'],
  [/\bse revise\b/g, 'se revisa'],
  [/\bse cambie\b/g, 'se cambia'],
  [/\bse coloque\b/g, 'se coloca'],
  [/\bse nombre\b/g, 'se nombra'],
  [/\bse pulse\b/g, 'se pulsa'],
  [/\bse arrastre\b/g, 'se arrastra'],
  [/\bse importe\b/g, 'se importa'],
];

// Pattern: article/demonstrative + noun + incorrectly changed verb
// "Las descargas incluyan" → "Las descargas incluyen"
// "la ficha incluya" → "la ficha incluye"
// "el generador genere" → "el generador genera"
const THIRD_PERSON_NOUN_VERB = [
  // incluya → incluye (3rd person after nouns)
  [/\bincluya(?:n)?\b/g, (match) => match === 'incluyan' ? 'incluyen' : 'incluye'],
  // But we need context — "incluya" can be correct as subjunctive in "para que incluya"
  // Let's be more specific with patterns
];

// More targeted: fix specific wrong patterns
const SPECIFIC_FIXES = [
  // "Las descargas incluyen" pattern - plural nouns + verb
  [/\bLas descargue incluyen\b/g, 'Las descargas incluyen'],
  [/\blas descargue incluyen\b/g, 'las descargas incluyen'],
  [/\bLas descargue incluyan\b/g, 'Las descargas incluyen'],
  [/\blas descargue incluyan\b/g, 'las descargas incluyen'],

  // "cada ficha incluye" pattern
  [/\bincluya la clave\b/g, 'incluye la clave'],
  [/\bincluya el solucionario\b/g, 'incluye el solucionario'],
  [/\bincluya una\b/g, 'incluye una'],
  [/\bincluya un\b/g, 'incluye un'],
  [/\bincluya las\b/g, 'incluye las'],
  [/\bincluya los\b/g, 'incluye los'],
  [/\bincluya hojas\b/g, 'incluye hojas'],
  [/\bincluya hoja\b/g, 'incluye hoja'],
  [/\bincluya marca\b/g, 'incluye marca'],

  // "se exporta" not "se exporte" (already in REFLEXIVE_FIXES)

  // Nouns incorrectly changed: "las descargas" → "las descargue"
  [/\blas descargue\b/g, 'las descargas'],
  [/\bLas descargue\b/g, 'Las descargas'],
  [/\bla descargue\b/g, 'la descarga'],
  [/\bLa descargue\b/g, 'La descarga'],

  // "cada ficha genera" not "cada ficha genere"
  [/\bficha genere\b/g, 'ficha genera'],
  [/\bficha use\b/g, 'ficha usa'],
  [/\bficha incluya\b/g, 'ficha incluye'],
  [/\bfichas incluyan\b/g, 'fichas incluyen'],

  // "el generador genera" not "el generador genere"
  [/\bgenerador genere\b/g, 'generador genera'],
  [/\bgenerador cree\b/g, 'generador crea'],
  [/\bgenerador use\b/g, 'generador usa'],
  [/\bgenerador exporte\b/g, 'generador exporta'],
  [/\bgenerador produzca\b/g, 'generador produce'],
  [/\bgenerador incluya\b/g, 'generador incluye'],

  // "la aplicación genera" not "la aplicación genere"
  [/\baplicación genere\b/g, 'aplicación genera'],
  [/\baplicación cree\b/g, 'aplicación crea'],
  [/\baplicación use\b/g, 'aplicación usa'],
  [/\baplicación exporte\b/g, 'aplicación exporta'],
  [/\baplicación incluya\b/g, 'aplicación incluye'],
  [/\baplicación ajuste\b/g, 'aplicación ajusta'],
  [/\baplicación amplíe\b/g, 'aplicación amplía'],

  // "la herramienta" patterns
  [/\bherramienta genere\b/g, 'herramienta genera'],
  [/\bherramienta cree\b/g, 'herramienta crea'],
  [/\bherramienta use\b/g, 'herramienta usa'],
  [/\bherramienta exporte\b/g, 'herramienta exporta'],
  [/\bherramienta incluya\b/g, 'herramienta incluye'],
  [/\bherramienta produzca\b/g, 'herramienta produce'],

  // "el sistema" patterns
  [/\bsistema genere\b/g, 'sistema genera'],
  [/\bsistema cree\b/g, 'sistema crea'],
  [/\bsistema use\b/g, 'sistema usa'],
  [/\bsistema incluya\b/g, 'sistema incluye'],

  // "el lienzo se actualiza" — reflexive already covered
  // "la vista previa" patterns
  [/\bvista previa se actualice\b/g, 'vista previa se actualiza'],
  [/\bvista previa se genere\b/g, 'vista previa se genera'],
  [/\bvista previa se exporte\b/g, 'vista previa se exporta'],
  [/\bvista previa se muestre\b/g, 'vista previa se muestra'],

  // "el producto" patterns
  [/\bproducto incluya\b/g, 'producto incluye'],
  [/\bproducto genere\b/g, 'producto genera'],

  // "el archivo" patterns
  [/\barchivo se exporte\b/g, 'archivo se exporta'],
  [/\barchivo incluya\b/g, 'archivo incluye'],

  // "funciones están" — estan should be están
  [/\bestan disponibles\b/g, 'están disponibles'],
  [/\bestan incluidas\b/g, 'están incluidas'],

  // CRITICAL: "prueba" is a NOUN (trial/test), NOT a verb — restore noun form
  [/\bpruebe gratuita\b/gi, 'prueba gratuita'],
  [/\bPruebe gratuita\b/g, 'Prueba gratuita'],
  [/\bla pruebe\b/g, 'la prueba'],
  [/\bLa pruebe\b/g, 'La prueba'],
  [/\buna pruebe\b/g, 'una prueba'],
  [/\bUna pruebe\b/g, 'Una prueba'],
  [/\bde pruebe\b/g, 'de prueba'],
  [/\ben pruebe\b/g, 'en prueba'],

  // "te permiten" → "le permiten" (missed "te" possessive)
  [/\bte permiten\b/g, 'le permiten'],
  [/\bte permite\b/g, 'le permite'],
  [/\bte ayuda\b/g, 'le ayuda'],
  [/\bte ayudan\b/g, 'le ayudan'],
  [/\bte da\b/g, 'le da'],
  [/\bte dan\b/g, 'le dan'],
  [/\bte ofrece\b/g, 'le ofrece'],
  [/\bte ofrecen\b/g, 'le ofrecen'],
  [/\bte muestra\b/g, 'le muestra'],
  [/\bte muestran\b/g, 'le muestran'],

  // Subject + incorrectly changed verb
  [/\binglés use\b/g, 'inglés usa'],
  [/\balemán añada\b/g, 'alemán añade'],
  [/\bfrancés añada\b/g, 'francés añade'],
  [/\bespañol incluya\b/g, 'español incluye'],
  [/\bcontrol cree\b/g, 'control crea'],
  [/\brevelaciones cree\b/g, 'revelaciones crea'],
  [/\brevelaciones creen\b/g, 'revelaciones crean'],
  [/\bformato cree\b/g, 'formato crea'],
  [/\bdiseño cree\b/g, 'diseño crea'],

  // "Tu" missed by possessive script (in middle of sentences)
  [/\bTu frase\b/g, 'Su frase'],
  [/\bTu ficha\b/g, 'Su ficha'],
  [/\bTu catálogo\b/g, 'Su catálogo'],
  [/\bTu catalogo\b/g, 'Su catálogo'],
  [/\bTu negocio\b/g, 'Su negocio'],
  [/\bTu tienda\b/g, 'Su tienda'],
  [/\bTu producto\b/g, 'Su producto'],
  [/\bTu lienzo\b/g, 'Su lienzo'],
  [/\bTu imagen\b/g, 'Su imagen'],
  [/\bTu Negocio\b/g, 'Su Negocio'],
  [/\bTu archivo\b/g, 'Su archivo'],
  [/\bTu trabajo\b/g, 'Su trabajo'],
  [/\bTu cuenta\b/g, 'Su cuenta'],
  [/\bTu marca\b/g, 'Su marca'],
  [/\bTu contenido\b/g, 'Su contenido'],
  [/\bTu público\b/g, 'Su público'],
  [/\bTu inversión\b/g, 'Su inversión'],

  // "que genere" in relative clauses should often stay subjunctive,
  // but "que genera" (indicative) is more common in descriptions
  // Only fix when clearly 3rd person:
  [/\bque le genere\b/g, 'que le genera'],

  // Common 3rd person subjects
  [/\bpágina genere\b/g, 'página genera'],
  [/\bpágina incluya\b/g, 'página incluye'],
  [/\bpágina use\b/g, 'página usa'],
  [/\bpágina muestre\b/g, 'página muestra'],

  // "este generador" patterns
  [/\bEste generador genere\b/g, 'Este generador genera'],
  [/\beste generador genere\b/g, 'este generador genera'],
  [/\bEste generador cree\b/g, 'Este generador crea'],
  [/\beste generador cree\b/g, 'este generador crea'],
  [/\bEste generador produzca\b/g, 'Este generador produce'],
  [/\beste generador produzca\b/g, 'este generador produce'],

  // "esta herramienta" patterns
  [/\bEsta herramienta genere\b/g, 'Esta herramienta genera'],
  [/\besta herramienta genere\b/g, 'esta herramienta genera'],
  [/\bEsta herramienta cree\b/g, 'Esta herramienta crea'],
  [/\besta herramienta cree\b/g, 'esta herramienta crea'],
];

let totalFixed = 0;
let filesModified = 0;

for (const [type, dir] of Object.entries(CONTENT_TYPES)) {
  if (typeFilter && type !== typeFilter) continue;

  const esDir = path.join(CONFIG_DIR, dir, 'es');
  if (!fs.existsSync(esDir)) continue;

  const files = fs.readdirSync(esDir).filter(f => f.endsWith('.ts')).sort();

  for (const file of files) {
    const filePath = path.join(esDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let fileFixCount = 0;

    const allFixes = [...REFLEXIVE_FIXES, ...SPECIFIC_FIXES];

    for (const [pattern, replacement] of allFixes) {
      pattern.lastIndex = 0;
      const before = content;
      if (typeof replacement === 'function') {
        content = content.replace(pattern, replacement);
      } else {
        content = content.replace(pattern, replacement);
      }
      if (content !== before) {
        const matchCount = (before.match(pattern) || []).length;
        fileFixCount += matchCount;
      }
      pattern.lastIndex = 0;
    }

    if (fileFixCount > 0) {
      if (!dryRun) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
      console.log(`${dryRun ? '[DRY RUN] ' : ''}${type}/${path.basename(file, '.ts')}: ${fileFixCount} fix(es)`);
      totalFixed += fileFixCount;
      filesModified++;
    }
  }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`${dryRun ? '[DRY RUN] ' : ''}Total: ${totalFixed} fixes across ${filesModified} files`);
if (dryRun) console.log('Run with --fix to apply changes.');
