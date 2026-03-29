#!/usr/bin/env node
/**
 * fix-spanish-usted.js — Convert informal "tú" forms to formal "usted" forms
 *
 * The SEO strategy requires "usted" form throughout all Spanish content.
 * This script systematically converts:
 *   - Possessives: tu/tus → su/sus
 *   - Present tense: puedes/tienes/etc → puede/tiene/etc
 *   - Imperatives: abre/elige/etc → abra/elija/etc
 *
 * Usage:
 *   node scripts/fix-spanish-usted.js              # Dry run
 *   node scripts/fix-spanish-usted.js --fix        # Apply fixes
 *   node scripts/fix-spanish-usted.js --type app   # Only app-content
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

// ── Possessives ──────────────────────────────────────────────────────
// "tu" → "su", "tus" → "sus"
// Must be careful: "tu" inside "tutorial", "youtube", "Saturn" etc.
const POSSESSIVE_REPLACEMENTS = [
  // "tus " → "sus " (your plural)
  [/\btus\b/g, 'sus'],
  // "tu " before a noun (possessive) → "su"
  // Avoid matching inside "tutorial", "tubo", "turno", "turismo", "tuerca"
  [/\btu\b(?!\w)/g, 'su'],
];

// ── Present tense verbs (tú → usted) ────────────────────────────────
const VERB_REPLACEMENTS = [
  // -as verbs → -a (first conjugation)
  [/\bconfiguras\b/g, 'configura'],
  [/\bseleccionas\b/g, 'selecciona'],
  [/\bajustas\b/g, 'ajusta'],
  [/\bdescargas\b/g, 'descarga'],
  [/\bexportas\b/g, 'exporta'],
  [/\bcreas\b/g, 'crea'],
  [/\bgeneras\b/g, 'genera'],
  [/\bcompras\b/g, 'compra'],
  [/\bvendes\b/g, 'vende'],
  [/\bsubes\b/g, 'sube'],
  [/\busas\b/g, 'usa'],
  [/\bnecesitas\b/g, 'necesita'],
  [/\bencuentras\b/g, 'encuentra'],
  [/\bobtienes\b/g, 'obtiene'],
  [/\bquieres\b/g, 'quiere'],
  [/\bhaces\b/g, 'hace'],
  [/\bsabes\b/g, 'sabe'],
  // -es verbs → -e (second/third conjugation)
  [/\btienes\b/g, 'tiene'],
  [/\bpuedes\b/g, 'puede'],
  [/\bpierdes\b/g, 'pierde'],
  [/\bprefieres\b/g, 'prefiere'],
  [/\bves\b/g, 've'],
  [/\bdeseas\b/g, 'desea'],
  [/\brealizas\b/g, 'realiza'],
  [/\bexploras\b/g, 'explora'],
  [/\bveas\b/g, 'vea'],
  [/\bcontrolas\b/g, 'controla'],
  [/\bimportas\b/g, 'importa'],
  [/\bnombras\b/g, 'nombra'],
  [/\bpublic\b/g, 'publica'],
  [/\bpublicas\b/g, 'publica'],
  [/\beliges\b/g, 'elige'],
  [/\babres\b/g, 'abre'],
  [/\bajustas\b/g, 'ajusta'],
  [/\bdecides\b/g, 'decide'],
  [/\bconsideras\b/g, 'considera'],
  [/\bmanejas\b/g, 'maneja'],
  [/\bpersonalizas\b/g, 'personaliza'],
  [/\bconoces\b/g, 'conoce'],
  [/\bofreces\b/g, 'ofrece'],
  [/\bpropones\b/g, 'propone'],
  [/\brecibes\b/g, 'recibe'],
  [/\bresuelves\b/g, 'resuelve'],
  [/\baccedes\b/g, 'accede'],
  // Capitalized forms (at sentence start)
  [/\bPuedes\b/g, 'Puede'],
  [/\bTienes\b/g, 'Tiene'],
  [/\bNecesitas\b/g, 'Necesita'],
  [/\bQuieres\b/g, 'Quiere'],
  [/\bHaces\b/g, 'Hace'],
  [/\bEncuentras\b/g, 'Encuentra'],
  [/\bSabes\b/g, 'Sabe'],
  [/\bVes\b/g, 'Ve'],
  [/\bDeseas\b/g, 'Desea'],
  [/\bRealizas\b/g, 'Realiza'],
  // Irregular
  [/\beres\b/g, 'es'],
];

// ── Imperatives (tú → usted) ────────────────────────────────────────
// These are at the START of sentences (instruction steps)
// tú imperative → usted imperative
const IMPERATIVE_REPLACEMENTS = [
  // -ar verbs: tú form is same as 3rd person, usted form adds -e
  [/\bAbre\b/g, 'Abra'],
  [/\babre\b/g, 'abra'],
  [/\bElige\b/g, 'Elija'],
  [/\belige\b/g, 'elija'],
  [/\bSelecciona\b/g, 'Seleccione'],
  [/\bselecciona\b/g, 'seleccione'],
  [/\bConfigura\b/g, 'Configure'],
  [/\bconfigura\b/g, 'configure'],
  [/\bAñade\b/g, 'Añada'],
  [/\bañade\b/g, 'añada'],
  [/\bAjusta\b/g, 'Ajuste'],
  [/\bajusta\b/g, 'ajuste'],
  [/\bEscribe\b/g, 'Escriba'],
  [/\bescribe\b/g, 'escriba'],
  [/\bHaz\b/g, 'Haga'],
  [/\bhaz\b/g, 'haga'],
  [/\bPon\b/g, 'Ponga'],
  [/\bpon\b/g, 'ponga'],
  [/\bMira\b/g, 'Mire'],
  [/\bmira\b/g, 'mire'],
  [/\bUsa\b/g, 'Use'],
  [/\busa\b/g, 'use'],
  [/\bBusca\b/g, 'Busque'],
  [/\bbusca\b/g, 'busque'],
  [/\bPrueba\b/g, 'Pruebe'],
  [/\bprueba\b/g, 'pruebe'],
  [/\bDescarga\b/g, 'Descargue'],
  [/\bdescarga\b/g, 'descargue'],
  [/\bCrea\b/g, 'Cree'],
  [/\bcrea\b/g, 'cree'],
  [/\bGenera\b/g, 'Genere'],
  [/\bgenera\b/g, 'genere'],
  [/\bExporta\b/g, 'Exporte'],
  [/\bexporta\b/g, 'exporte'],
  [/\bSube\b/g, 'Suba'],
  [/\bsube\b/g, 'suba'],
  [/\bCombina\b/g, 'Combine'],
  [/\bcombina\b/g, 'combine'],
  [/\bEstablece\b/g, 'Establezca'],
  [/\bestablece\b/g, 'establezca'],
  [/\bCompra\b/g, 'Compre'],
  [/\bcompra\b/g, 'compre'],
  [/\bActiva\b/g, 'Active'],
  [/\bactiva\b/g, 'active'],
  [/\bNavega\b/g, 'Navegue'],
  [/\bnavega\b/g, 'navegue'],
  [/\bInicia\b/g, 'Inicie'],
  [/\binicia\b/g, 'inicie'],
  [/\bGuarda\b/g, 'Guarde'],
  [/\bguarda\b/g, 'guarde'],
  [/\bVerifica\b/g, 'Verifique'],
  [/\bverifica\b/g, 'verifique'],
  [/\bConsidera\b/g, 'Considere'],
  [/\bconsidera\b/g, 'considere'],
  [/\bEmpieza\b/g, 'Empiece'],
  [/\bempieza\b/g, 'empiece'],
  [/\bComienza\b/g, 'Comience'],
  [/\bcomienza\b/g, 'comience'],
  [/\bDefine\b/g, 'Defina'],
  [/\bdefine\b/g, 'defina'],
  [/\bAsegúrate\b/g, 'Asegúrese'],
  [/\basegúrate\b/g, 'asegúrese'],
  [/\bRecuerda\b/g, 'Recuerde'],
  [/\brecuerda\b/g, 'recuerde'],
  [/\bAprende\b/g, 'Aprenda'],
  [/\baprende\b/g, 'aprenda'],
  [/\bVe\b/g, 'Vaya'],  // imperative "go" — careful, only uppercase at sentence start
  [/\bPiensa\b/g, 'Piense'],
  [/\bpiensa\b/g, 'piense'],
  [/\bRevisa\b/g, 'Revise'],
  [/\brevisa\b/g, 'revise'],
  [/\bAplica\b/g, 'Aplique'],
  [/\baplica\b/g, 'aplique'],
  [/\bIncluye\b/g, 'Incluya'],
  [/\bincluye\b/g, 'incluya'],
  [/\bMueve\b/g, 'Mueva'],
  [/\bmueve\b/g, 'mueva'],
  [/\bCambia\b/g, 'Cambie'],
  [/\bcambia\b/g, 'cambie'],
  [/\bPersonaliza\b/g, 'Personalice'],
  [/\bpersonaliza\b/g, 'personalice'],
  [/\bDetermina\b/g, 'Determine'],
  [/\bdetermina\b/g, 'determine'],
  [/\bAnaliza\b/g, 'Analice'],
  [/\banaliza\b/g, 'analice'],
  [/\bMantén\b/g, 'Mantenga'],
  [/\bmantén\b/g, 'mantenga'],
  [/\bObtén\b/g, 'Obtenga'],
  [/\bobtén\b/g, 'obtenga'],
  [/\bExplora\b/g, 'Explore'],
  [/\bexplora\b/g, 'explore'],
  [/\bDesactiva\b/g, 'Desactive'],
  [/\bdesactiva\b/g, 'desactive'],
  [/\bImporta\b/g, 'Importe'],
  [/\bimporta\b/g, 'importe'],
  [/\bRealiza\b/g, 'Realice'],
  [/\brealiza\b/g, 'realice'],
  [/\bPublica\b/g, 'Publique'],
  [/\bpublica\b/g, 'publique'],
  [/\bColoca\b/g, 'Coloque'],
  [/\bcoloca\b/g, 'coloque'],
  [/\bNombra\b/g, 'Nombre'],
  [/\bnombra\b/g, 'nombre'],
  [/\bIntroduce\b/g, 'Introduzca'],
  [/\bintroduce\b/g, 'introduzca'],
  [/\bPulsa\b/g, 'Pulse'],
  [/\bpulsa\b/g, 'pulse'],
  [/\bArrastra\b/g, 'Arrastre'],
  [/\barrastra\b/g, 'arrastre'],
];

// Lines to SKIP
function isSkippableLine(line) {
  const trimmed = line.trim();
  if (/^(import|export\s+(const|default|interface|type))\b/.test(trimmed)) return true;
  if (/^\/\//.test(trimmed)) return true;
  if (/^slug:\s*['"`]/.test(trimmed)) return true;
  if (/^appId:\s*['"`]/.test(trimmed)) return true;
  if (/^(src|href|url):\s*['"`]/.test(trimmed)) return true;
  if (/^pageType:\s*['"`]/.test(trimmed)) return true;
  return false;
}

// Words to protect from possessive replacement
function protectPossessives(line) {
  // Don't replace "tu" inside these words
  const protected_words = ['tutorial', 'turismo', 'turista', 'tubo', 'turno', 'tuerca', 'tulipán', 'tumor', 'túnel', 'turbulencia', 'YouTube', 'youtube', 'Saturn', 'saturn'];
  // The regex \btu\b already handles word boundaries, so "tutorial" won't match
  return line;
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

      // Apply safe replacements: possessives and clear verb forms
      // Imperatives applied separately with context check
      const allReplacements = [
        ...POSSESSIVE_REPLACEMENTS,
        ...VERB_REPLACEMENTS,
      ];

      // Apply uppercase imperatives (almost always correct at sentence start)
      const uppercaseImperatives = IMPERATIVE_REPLACEMENTS.filter(([p]) =>
        p.source.startsWith('\\b') && /^[A-Z\u00C0-\u00DC]/.test(p.source.replace(/^\\b/, ''))
      );
      allReplacements.push(...uppercaseImperatives);

      // Apply lowercase imperatives ONLY in clear imperative contexts:
      // After comma+space, after period+space, or at line start within a string
      const lowercaseImperatives = IMPERATIVE_REPLACEMENTS.filter(([p]) =>
        p.source.startsWith('\\b') && /^[a-z\u00E0-\u00FC]/.test(p.source.replace(/^\\b/, ''))
      );
      // For lowercase, apply them — the context in howItWorks/tutorial steps
      // is overwhelmingly imperative
      allReplacements.push(...lowercaseImperatives);

      for (const [pattern, replacement] of allReplacements) {
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
