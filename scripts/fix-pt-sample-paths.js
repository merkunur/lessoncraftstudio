const fs = require('fs');
const path = require('path');

// Load Portuguese and English sample filenames
const ptSamples = JSON.parse(fs.readFileSync(path.join(__dirname, 'pt-samples.json'), 'utf8'));
const enSamples = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-samples.json'), 'utf8'));

// For each app, get the non-answer-key sample files (worksheets only)
function getNonAnswerKeys(files) {
  return files.filter(f =>
    !f.includes('answer_key') &&
    !f.includes('answer-key') &&
    !f.includes('callout')
  );
}

// Build PT sample lookup: app -> [sample1, sample2, sample3, ...]
const ptWorksheets = {};
for (const [app, files] of Object.entries(ptSamples)) {
  ptWorksheets[app] = getNonAnswerKeys(files);
}

// Show what we have
console.log('\n=== Portuguese samples per app ===');
for (const [app, files] of Object.entries(ptWorksheets)) {
  console.log(`${app}: ${files.length} samples`);
  files.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
}

// Content directories to process
const contentDirs = [
  'frontend/config/app-content/pt',
  'frontend/config/tool-content/pt',
  'frontend/config/bundle-content/pt',
  'frontend/config/guide-content/pt',
  'frontend/config/start-content/pt',
];

const baseDir = path.join(__dirname, '..');

let totalFiles = 0;
let totalReplacements = 0;
let skippedFiles = 0;

for (const dir of contentDirs) {
  const fullDir = path.join(baseDir, dir);
  if (!fs.existsSync(fullDir)) {
    console.log(`\nSkipping ${dir} (not found)`);
    continue;
  }

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  console.log(`\n=== Processing ${dir} (${files.length} files) ===`);

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Find all /samples/english/[app]/[filename].webp references
    const sampleRegex = /\/samples\/english\/([^/]+)\/([^'"`]+\.webp)/g;
    const matches = [...content.matchAll(sampleRegex)];

    if (matches.length === 0) {
      skippedFiles++;
      continue;
    }

    // Group matches by app to track which PT sample index to use per app
    const appCounters = {};

    let replacements = 0;
    content = content.replace(sampleRegex, (match, appFolder, enFilename) => {
      // Check if we have Portuguese samples for this app
      if (!ptWorksheets[appFolder]) {
        console.log(`  WARNING: No PT samples for app "${appFolder}" in ${file}`);
        return match; // Keep English path
      }

      const ptFiles = ptWorksheets[appFolder];

      if (!appCounters[appFolder]) {
        appCounters[appFolder] = 0;
      }

      const idx = appCounters[appFolder] % ptFiles.length;
      const ptFilename = ptFiles[idx];
      appCounters[appFolder]++;

      replacements++;
      return `/samples/portuguese/${appFolder}/${ptFilename}`;
    });

    if (replacements > 0 && content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFiles++;
      totalReplacements += replacements;
      console.log(`  ${file}: ${replacements} replacements`);
    }
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Files modified: ${totalFiles}`);
console.log(`Total replacements: ${totalReplacements}`);
console.log(`Files skipped (no English samples): ${skippedFiles}`);

// Verify no English samples remain in PT content
console.log(`\n=== VERIFICATION ===`);
let remaining = 0;
for (const dir of contentDirs) {
  const fullDir = path.join(baseDir, dir);
  if (!fs.existsSync(fullDir)) continue;
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(fullDir, file), 'utf8');
    const matches = content.match(/\/samples\/english\//g);
    if (matches) {
      remaining += matches.length;
      console.log(`  REMAINING: ${file} has ${matches.length} English sample paths`);
    }
  }
}
console.log(`Remaining /samples/english/ paths: ${remaining}`);
