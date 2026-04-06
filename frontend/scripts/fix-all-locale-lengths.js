/**
 * Fix title-long (>60 chars) and desc-long (>160 chars) across all locales.
 * Trims at sentence boundaries where possible.
 *
 * Run: node frontend/scripts/fix-all-locale-lengths.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CONTENT_TYPES = ['app-content', 'tool-content', 'guide-content', 'blog-content', 'idea-content', 'start-content', 'bundle-content', 'compare-content'];

function extractField(text, key) {
  const r1 = new RegExp(key + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'", 's');
  let m = text.match(r1);
  if (m) return m[1].replace(/\\'/g, "'").trim();
  const r2 = new RegExp(key + '\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"', 's');
  m = text.match(r2);
  if (m) return m[1].replace(/\\"/g, '"').trim();
  return '';
}

function extractSeoField(text, key) {
  const seoBlock = text.match(/seo:\s*\{[\s\S]*?\n\s*\}/);
  if (!seoBlock) return extractField(text, key);
  return extractField(seoBlock[0], key);
}

function trimTitle(title) {
  if (title.length <= 60) return title;
  // Try to cut at | LCS or | LessonCraftStudio
  const pipeIdx = title.lastIndexOf(' | ');
  if (pipeIdx > 0) {
    // Try shorter brand suffix
    const beforePipe = title.substring(0, pipeIdx);
    if ((beforePipe + ' | LCS').length <= 60) return beforePipe + ' | LCS';
    // Remove brand entirely if still too long
    if (beforePipe.length <= 60) return beforePipe;
  }
  // Try to cut at last word boundary before 58 chars + ...
  const cut = title.substring(0, 57).replace(/\s+\S*$/, '');
  return cut.length > 20 ? cut + '...' : title.substring(0, 57) + '...';
}

function trimDesc(desc) {
  if (desc.length <= 160) return desc;
  // Try cutting at last sentence boundary before 160
  const sentences = desc.split(/(?<=\.)\s+/);
  let result = '';
  for (const s of sentences) {
    if ((result + ' ' + s).trim().length > 158) break;
    result = (result + ' ' + s).trim();
  }
  if (result.length >= 80) return result;
  // Fallback: cut at word boundary
  const cut = desc.substring(0, 157).replace(/\s+\S*$/, '');
  return cut.length > 80 ? cut + '.' : desc.substring(0, 157) + '...';
}

let titleFixes = 0;
let descFixes = 0;

for (const locale of LOCALES) {
  for (const type of CONTENT_TYPES) {
    const dirPath = path.join('frontend', 'config', type, locale);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort();
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');
      let changed = false;

      // Fix title length
      const title = extractSeoField(text, 'titleTag');
      if (title.length > 60) {
        const newTitle = trimTitle(title);
        const escapedOld = title.replace(/'/g, "\\'");
        const escapedNew = newTitle.replace(/'/g, "\\'");
        // Use a precise regex to only match titleTag in seo block
        const titleRe = new RegExp("titleTag:\\s*'" + escapedOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'");
        if (titleRe.test(text)) {
          text = text.replace(titleRe, "titleTag: '" + escapedNew + "'");
          changed = true;
          titleFixes++;
          console.log(`TITLE: ${locale}/${type}/${file} (${title.length} -> ${newTitle.length})`);
        }
      }

      // Fix desc length
      const desc = extractSeoField(text, 'metaDescription');
      if (desc.length > 160) {
        const newDesc = trimDesc(desc);
        const escapedOld = desc.replace(/'/g, "\\'");
        const escapedNew = newDesc.replace(/'/g, "\\'");
        const descRe = new RegExp("'" + escapedOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'");
        if (descRe.test(text)) {
          text = text.replace(descRe, "'" + escapedNew + "'");
          changed = true;
          descFixes++;
          console.log(`DESC:  ${locale}/${type}/${file} (${desc.length} -> ${newDesc.length})`);
        } else {
          // Try with double quotes
          const escapedOldDq = desc.replace(/"/g, '\\"');
          const descReDq = new RegExp('"' + escapedOldDq.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"');
          if (descReDq.test(text)) {
            text = text.replace(descReDq, "'" + escapedNew + "'");
            changed = true;
            descFixes++;
            console.log(`DESC:  ${locale}/${type}/${file} (${desc.length} -> ${newDesc.length}) [dq]`);
          } else {
            console.log(`SKIP DESC (no match): ${locale}/${type}/${file}`);
          }
        }
      }

      if (changed) fs.writeFileSync(filePath, text, 'utf-8');
    }
  }
}

console.log(`\nDone: ${titleFixes} titles trimmed, ${descFixes} descriptions trimmed.`);
