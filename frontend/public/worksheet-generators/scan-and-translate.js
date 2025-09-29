/**
 * Automated Translation Scanner and Updater
 *
 * This Node.js script:
 * 1. Scans ALL worksheet generator HTML files
 * 2. Extracts ALL translatable text
 * 3. Updates translations.js with missing entries
 * 4. Generates a complete translation report
 *
 * Usage: node scan-and-translate.js
 */

const fs = require('fs').promises;
const path = require('path');

class TranslationScanner {
    constructor() {
        this.allTexts = new Map();
        this.existingTranslations = {};
        this.worksheetGeneratorsPath = __dirname;
        this.translationsPath = path.join(__dirname, 'js', 'translations.js');

        // Comprehensive patterns for finding UI text
        this.patterns = {
            // HTML element content
            htmlText: /<(h[1-6]|button|label|span|div|p|option|a|li|td|th)(?:\s[^>]*)?>([^<]+)</gi,

            // HTML attributes
            attributes: /(?:title|alt|placeholder|data-tooltip|aria-label|value)="([^"]+)"/gi,

            // JavaScript strings that look like UI text
            jsStrings: /['"`]([A-Z][a-zA-Z\s]{2,50})['"`]/g,

            // Common function calls with text
            functionCalls: /(?:showMessage|alert|confirm|prompt)\s*\(\s*['"`]([^'"`]+)['"`]/g,

            // Object literals with UI-related keys
            objectLiterals: /(?:label|title|text|message|placeholder|tooltip|name|displayName)\s*:\s*['"`]([^'"`]+)['"`]/g
        };

        // Skip patterns - text we don't want to translate
        this.skipPatterns = [
            /^[0-9\s\-\+\*\/\=\(\)]+$/,  // Math expressions
            /^(px|em|rem|%|vh|vw)$/,      // CSS units
            /^\#[0-9a-fA-F]{3,6}$/,       // Hex colors
            /^rgb\(/,                      // RGB colors
            /^https?:\/\//,               // URLs
            /\.(html|js|css|png|jpg|gif)$/i, // File extensions
            /^[a-z\-]+$/,                 // CSS classes/IDs (lowercase with dashes)
            /^(var|let|const|function|if|else|for|while|return)$/, // JS keywords
        ];
    }

    async init() {
        console.log('🔍 Starting translation scan...\n');

        // Load existing translations
        await this.loadExistingTranslations();

        // Scan all HTML files
        await this.scanAllFiles();

        // Generate report
        const report = this.generateReport();

        // Update translations.js
        await this.updateTranslationsFile(report);

        // Save detailed report
        await this.saveReport(report);

        console.log('\n✅ Translation scan complete!');
        console.log(`📊 Report saved to: translation-scan-report.json`);
        console.log(`📝 Translations updated in: js/translations.js`);

        return report;
    }

    async loadExistingTranslations() {
        try {
            const content = await fs.readFile(this.translationsPath, 'utf-8');
            const match = content.match(/const translations = ({[\s\S]*?});/);
            if (match) {
                // Safely evaluate the translations object
                this.existingTranslations = eval('(' + match[1] + ')');
                console.log(`✅ Loaded existing translations (${Object.keys(this.existingTranslations.en || {}).length} keys)`);
            }
        } catch (error) {
            console.log('⚠️ No existing translations found, starting fresh');
            this.existingTranslations = {
                en: {}, de: {}, fr: {}, es: {}, pt: {},
                it: {}, nl: {}, sv: {}, da: {}, no: {}, fi: {}
            };
        }
    }

    async scanAllFiles() {
        const files = await fs.readdir(this.worksheetGeneratorsPath);
        const htmlFiles = files.filter(f =>
            f.endsWith('.html') &&
            !f.includes('test') &&
            !f.includes('debug') &&
            !f.includes('backup')
        );

        console.log(`📂 Found ${htmlFiles.length} worksheet generator apps to scan\n`);

        for (const file of htmlFiles) {
            await this.scanFile(file);
        }
    }

    async scanFile(filename) {
        const filepath = path.join(this.worksheetGeneratorsPath, filename);
        const content = await fs.readFile(filepath, 'utf-8');

        const texts = new Set();

        // Remove script and style tags for cleaner extraction
        const cleanContent = content
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

        // Extract from HTML content
        let match;
        while ((match = this.patterns.htmlText.exec(cleanContent)) !== null) {
            const text = match[2].trim();
            if (this.isTranslatable(text)) {
                texts.add(text);
            }
        }

        // Extract from attributes
        this.patterns.attributes.lastIndex = 0;
        while ((match = this.patterns.attributes.exec(content)) !== null) {
            const text = match[1].trim();
            if (this.isTranslatable(text)) {
                texts.add(text);
            }
        }

        // Extract from JavaScript sections
        const scriptMatches = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
        scriptMatches.forEach(script => {
            // JavaScript strings
            this.patterns.jsStrings.lastIndex = 0;
            while ((match = this.patterns.jsStrings.exec(script)) !== null) {
                const text = match[1].trim();
                if (this.isTranslatable(text)) {
                    texts.add(text);
                }
            }

            // Function calls
            this.patterns.functionCalls.lastIndex = 0;
            while ((match = this.patterns.functionCalls.exec(script)) !== null) {
                const text = match[1].trim();
                if (this.isTranslatable(text)) {
                    texts.add(text);
                }
            }

            // Object literals
            this.patterns.objectLiterals.lastIndex = 0;
            while ((match = this.patterns.objectLiterals.exec(script)) !== null) {
                const text = match[1].trim();
                if (this.isTranslatable(text)) {
                    texts.add(text);
                }
            }
        });

        // Store with file source
        texts.forEach(text => {
            if (!this.allTexts.has(text)) {
                this.allTexts.set(text, []);
            }
            this.allTexts.get(text).push(filename);
        });

        console.log(`  ✓ ${filename}: Found ${texts.size} unique texts`);
    }

    isTranslatable(text) {
        // Basic checks
        if (!text || text.length < 2 || text.length > 100) return false;
        if (!/[a-zA-Z]/.test(text)) return false;

        // Check skip patterns
        for (const pattern of this.skipPatterns) {
            if (pattern.test(text)) return false;
        }

        // Skip if it looks like code
        if (text.includes('{') || text.includes('}') || text.includes(';')) return false;

        return true;
    }

    generateKey(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 50);
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTexts: this.allTexts.size,
                existingKeys: Object.keys(this.existingTranslations.en || {}).length,
                newTexts: 0,
                filesScanned: new Set([...this.allTexts.values()].flat()).size
            },
            newTranslations: {},
            existingCoverage: {},
            detailedTexts: []
        };

        // Check existing translations coverage
        const languages = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
        languages.forEach(lang => {
            if (!this.existingTranslations[lang]) {
                this.existingTranslations[lang] = {};
            }
            report.existingCoverage[lang] = Object.keys(this.existingTranslations[lang]).length;
        });

        // Process all found texts
        this.allTexts.forEach((sources, text) => {
            const key = this.generateKey(text);

            // Check if this text already exists in translations
            const existsInEnglish = Object.values(this.existingTranslations.en || {}).includes(text);

            if (!existsInEnglish) {
                report.summary.newTexts++;

                // Add to new translations
                if (!report.newTranslations[key]) {
                    report.newTranslations[key] = {
                        en: text
                    };

                    // Add placeholder translations for other languages
                    languages.slice(1).forEach(lang => {
                        report.newTranslations[key][lang] = `[NEEDS_TRANSLATION] ${text}`;
                    });
                }
            }

            // Add to detailed report
            report.detailedTexts.push({
                text,
                key,
                sources,
                isNew: !existsInEnglish
            });
        });

        return report;
    }

    async updateTranslationsFile(report) {
        // Merge new translations with existing
        const updatedTranslations = { ...this.existingTranslations };

        Object.entries(report.newTranslations).forEach(([key, translations]) => {
            Object.entries(translations).forEach(([lang, text]) => {
                if (!updatedTranslations[lang]) {
                    updatedTranslations[lang] = {};
                }
                updatedTranslations[lang][key] = text;
            });
        });

        // Generate the new translations.js content
        let content = `// Translation system for worksheet generators
// Auto-generated on ${new Date().toISOString()}
// Total keys: ${Object.keys(updatedTranslations.en).length}

const translations = ${JSON.stringify(updatedTranslations, null, 2)};

// Helper function to get translation
function getTranslation(key, locale = 'en') {
    const localeTranslations = translations[locale] || translations['en'];
    return localeTranslations[key] || key;
}

// Helper function to translate element
function translateElement(element, key, locale = 'en') {
    const translation = getTranslation(key, locale);
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
    } else if (element.tagName === 'OPTION' || element.tagName === 'SELECT') {
        element.value = translation;
    } else {
        element.textContent = translation;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
`;

        // Backup existing file
        try {
            const existing = await fs.readFile(this.translationsPath, 'utf-8');
            await fs.writeFile(this.translationsPath + '.backup', existing);
        } catch (e) {
            // No existing file to backup
        }

        // Write updated file
        await fs.writeFile(this.translationsPath, content);
        console.log(`\n✅ Updated translations.js with ${report.summary.newTexts} new keys`);
    }

    async saveReport(report) {
        const reportPath = path.join(this.worksheetGeneratorsPath, 'translation-scan-report.json');
        await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

        // Also create a human-readable summary
        const summaryPath = path.join(this.worksheetGeneratorsPath, 'translation-summary.md');
        const summary = `# Translation Scan Report

Generated: ${report.timestamp}

## Summary
- **Total unique texts found:** ${report.summary.totalTexts}
- **Existing translation keys:** ${report.summary.existingKeys}
- **New texts needing translation:** ${report.summary.newTexts}
- **Files scanned:** ${report.summary.filesScanned}

## Coverage by Language
${Object.entries(report.existingCoverage)
    .map(([lang, count]) => `- **${lang.toUpperCase()}:** ${count} translations`)
    .join('\n')}

## New Texts Found
${Object.entries(report.newTranslations)
    .slice(0, 20)
    .map(([key, trans]) => `- **${key}:** "${trans.en}"`)
    .join('\n')}

${Object.keys(report.newTranslations).length > 20 ?
    `\n...and ${Object.keys(report.newTranslations).length - 20} more texts\n` : ''}

## Next Steps
1. Review the new translations in \`translations.js\`
2. Replace placeholder translations marked with [NEEDS_TRANSLATION]
3. Test the translations in each worksheet generator app
4. Run validation to ensure completeness
`;

        await fs.writeFile(summaryPath, summary);
    }
}

// Run the scanner
if (require.main === module) {
    const scanner = new TranslationScanner();
    scanner.init().catch(console.error);
}

module.exports = TranslationScanner;