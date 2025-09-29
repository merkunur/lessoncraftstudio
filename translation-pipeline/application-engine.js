/**
 * AUTOMATED TRANSLATION PIPELINE - APPLICATION ENGINE
 * Automatically applies translations to HTML/JS files based on inventory
 *
 * @author Senior Software Engineer (20 years experience)
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class TranslationApplicationEngine {
    constructor(inventory, translations) {
        this.inventory = inventory;
        this.translations = translations;
        this.applied = [];
        this.failed = [];
        this.stats = {
            totalItems: 0,
            applied: 0,
            failed: 0,
            skipped: 0
        };
    }

    /**
     * Apply all translations to an HTML file
     */
    async applyToHTML(filePath, locale = 'de') {
        console.log(`\n🔧 Applying translations to: ${filePath}`);
        console.log(`   Target locale: ${locale}`);

        let content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, {
            decodeEntities: false,
            xmlMode: false
        });

        // Phase 1: Apply HTML element translations
        this.applyHTMLTranslations($, locale);

        // Phase 2: Fix JavaScript translations
        content = $.html();
        content = this.applyJavaScriptTranslations(content, locale);

        // Phase 3: Add translation infrastructure
        content = this.ensureTranslationInfrastructure(content, locale);

        // Phase 4: Handle special cases
        content = this.handleSpecialCases(content, locale);

        return content;
    }

    /**
     * Apply translations to HTML elements
     */
    applyHTMLTranslations($, locale) {
        console.log('\n📝 Phase 1: HTML Elements');

        // Process each HTML text in inventory
        this.inventory.htmlTexts.forEach(item => {
            this.stats.totalItems++;

            try {
                // Find element by text content
                const elements = $('*').filter(function() {
                    const text = $(this).clone().children().remove().end().text().trim();
                    return text === item.text;
                });

                if (elements.length > 0) {
                    elements.each((i, elem) => {
                        const $elem = $(elem);

                        // Add data-translate attribute
                        if (!$elem.attr('data-translate')) {
                            $elem.attr('data-translate', item.translationKey);
                            this.stats.applied++;
                            console.log(`  ✅ Added data-translate="${item.translationKey}" to ${$elem[0].name}`);
                        }
                    });
                } else if (item.selector) {
                    // Try finding by selector
                    const $elem = $(item.selector);
                    if ($elem.length > 0 && !$elem.attr('data-translate')) {
                        $elem.attr('data-translate', item.translationKey);
                        this.stats.applied++;
                        console.log(`  ✅ Added data-translate to ${item.selector}`);
                    }
                }
            } catch (error) {
                this.failed.push({ item, error: error.message });
                this.stats.failed++;
                console.log(`  ❌ Failed: ${item.text.substring(0, 30)}...`);
            }
        });

        // Handle placeholders
        this.inventory.htmlTexts
            .filter(item => item.type === 'placeholder')
            .forEach(item => {
                const elements = $(`[placeholder="${item.text}"]`);
                elements.each((i, elem) => {
                    $(elem).attr('data-translate-placeholder', item.translationKey);
                    this.stats.applied++;
                });
            });

        // Handle title attributes
        this.inventory.htmlTexts
            .filter(item => item.type === 'title_attribute')
            .forEach(item => {
                const elements = $(`[title="${item.text}"]`);
                elements.each((i, elem) => {
                    $(elem).attr('data-translate-title', item.translationKey);
                    this.stats.applied++;
                });
            });
    }

    /**
     * Apply translations to JavaScript code
     */
    applyJavaScriptTranslations(content, locale) {
        console.log('\n📝 Phase 2: JavaScript Strings');

        const replacements = new Map();

        // Process JavaScript texts
        [...this.inventory.javascriptTexts, ...this.inventory.dynamicTexts].forEach(item => {
            this.stats.totalItems++;

            try {
                const translationKey = item.translationKey;

                // Different replacement strategies based on context
                if (item.type === 'ui_message' || item.context?.includes('showMessage')) {
                    // showMessage("text") → showMessage(t('key'))
                    const patterns = [
                        new RegExp(`showMessage\\s*\\(\\s*["'\`]${this.escapeRegex(item.text)}["'\`]`, 'g'),
                        new RegExp(`alert\\s*\\(\\s*["'\`]${this.escapeRegex(item.text)}["'\`]`, 'g'),
                        new RegExp(`confirm\\s*\\(\\s*["'\`]${this.escapeRegex(item.text)}["'\`]`, 'g')
                    ];

                    patterns.forEach(pattern => {
                        const replacement = pattern.source.includes('showMessage')
                            ? `showMessage(t('${translationKey}')`
                            : pattern.source.includes('alert')
                            ? `alert(t('${translationKey}')`
                            : `confirm(t('${translationKey}')`;

                        if (content.match(pattern)) {
                            replacements.set(pattern, replacement);
                        }
                    });
                }

                // innerHTML assignments
                if (item.context?.includes('innerHTML')) {
                    const pattern = new RegExp(
                        `innerHTML\\s*=\\s*["'\`]${this.escapeRegex(item.text)}["'\`]`,
                        'g'
                    );
                    if (content.match(pattern)) {
                        replacements.set(pattern, `innerHTML = t('${translationKey}')`);
                    }
                }

                // textContent assignments
                if (item.context?.includes('textContent')) {
                    const pattern = new RegExp(
                        `textContent\\s*=\\s*["'\`]${this.escapeRegex(item.text)}["'\`]`,
                        'g'
                    );
                    if (content.match(pattern)) {
                        replacements.set(pattern, `textContent = t('${translationKey}')`);
                    }
                }

                // Template literals with placeholders
                if (item.type === 'template_with_placeholders') {
                    const escapedText = this.escapeRegex(item.text);
                    const pattern = new RegExp(`\\\`${escapedText}.*?\\\``, 'g');

                    content.replace(pattern, (match) => {
                        // Extract placeholders
                        const placeholders = match.match(/\${[^}]+}/g) || [];
                        let replacement = `t('${translationKey}')`;

                        placeholders.forEach((ph, index) => {
                            const varName = ph.replace(/[${}]/g, '');
                            replacement += `.replace('{${index}}', ${varName})`;
                        });

                        replacements.set(new RegExp(this.escapeRegex(match), 'g'), replacement);
                        return match;
                    });
                }
            } catch (error) {
                this.failed.push({ item, error: error.message });
                this.stats.failed++;
            }
        });

        // Apply all replacements
        replacements.forEach((replacement, pattern) => {
            const before = content.length;
            content = content.replace(pattern, replacement);
            if (content.length !== before) {
                this.stats.applied++;
                console.log(`  ✅ Replaced: ${pattern.source.substring(0, 50)}...`);
            }
        });

        return content;
    }

    /**
     * Ensure translation infrastructure exists
     */
    ensureTranslationInfrastructure(content, locale) {
        console.log('\n📝 Phase 3: Translation Infrastructure');

        // Check if t() function exists
        if (!content.includes('function t(')) {
            console.log('  ⚠️ Adding t() function...');

            const tFunction = `
    // Translation function (AUTO-GENERATED)
    function t(key) {
        if (typeof translations === 'undefined') {
            console.warn('[TRANSLATION] translations object not found, returning key:', key);
            return key;
        }

        const currentLocale = window.currentLocale || '${locale}';
        const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                          (translations.en && translations.en[key]) ||
                          key;

        return translation;
    }

    // Format translation with placeholders (AUTO-GENERATED)
    function formatTranslation(key, replacements) {
        let translation = t(key);
        if (replacements) {
            Object.keys(replacements).forEach(placeholder => {
                translation = translation.replace(\`{\${placeholder}}\`, replacements[placeholder]);
            });
        }
        return translation;
    }`;

            // Insert after currentLocale declaration or at start of first script
            const insertPoint = content.indexOf('let currentLocale');
            if (insertPoint !== -1) {
                const lineEnd = content.indexOf('\n', insertPoint);
                content = content.substring(0, lineEnd + 1) + tFunction + content.substring(lineEnd + 1);
            } else {
                const scriptIndex = content.indexOf('<script>');
                if (scriptIndex !== -1) {
                    content = content.substring(0, scriptIndex + 8) + tFunction + content.substring(scriptIndex + 8);
                }
            }
        }

        // Check if applyTranslations function exists
        if (!content.includes('function applyTranslations(')) {
            console.log('  ⚠️ Adding applyTranslations() function...');

            const applyFunction = `
    // Apply translations to DOM (AUTO-GENERATED)
    function applyTranslations() {
        console.log('[TRANSLATION] Applying translations for locale:', window.currentLocale || '${locale}');

        // Text content
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = t(key);

            if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) {
                element.value = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            element.placeholder = t(key);
        });

        // Title attributes
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            element.title = t(key);
        });

        // Update page title if it has data-translate
        const titleElement = document.querySelector('title[data-translate]');
        if (titleElement) {
            document.title = t(titleElement.getAttribute('data-translate'));
        }
    }`;

            // Insert after t() function
            const tFunctionEnd = content.indexOf('function t(');
            if (tFunctionEnd !== -1) {
                const functionEnd = content.indexOf('\n}', tFunctionEnd) + 2;
                content = content.substring(0, functionEnd) + applyFunction + content.substring(functionEnd);
            }
        }

        // Ensure applyTranslations is called on load
        if (!content.includes('applyTranslations()')) {
            console.log('  ⚠️ Adding applyTranslations() call to DOMContentLoaded...');

            const domLoadPattern = /document\.addEventListener\(["']DOMContentLoaded["']/;
            const match = content.match(domLoadPattern);

            if (match) {
                const startIndex = content.indexOf(match[0]);
                const functionStart = content.indexOf('{', startIndex);
                const insertCode = `
        // Apply translations on load (AUTO-GENERATED)
        if (typeof applyTranslations === 'function') {
            applyTranslations();

            // Also apply after delay for dynamic content
            setTimeout(() => {
                applyTranslations();
                console.log('[TRANSLATION] Applied translations after delay');
            }, 500);
        }
`;
                content = content.substring(0, functionStart + 1) + insertCode + content.substring(functionStart + 1);
            }
        }

        return content;
    }

    /**
     * Handle special cases
     */
    handleSpecialCases(content, locale) {
        console.log('\n📝 Phase 4: Special Cases');

        // Browser-controlled file inputs
        const fileInputPattern = /<input[^>]*type=["']file["'][^>]*>/gi;
        const fileInputs = content.match(fileInputPattern);

        if (fileInputs && fileInputs.length > 0) {
            console.log('  ⚠️ Found file inputs, adding custom wrappers...');

            fileInputs.forEach(input => {
                if (!content.includes('file-input-wrapper')) {
                    const inputId = input.match(/id=["']([^"']+)["']/)?.[1] || 'fileInput';
                    const wrapper = `<div class="file-input-wrapper" style="display: flex; align-items: center; gap: 10px;">
                    <button type="button" class="custom-file-button" onclick="document.getElementById('${inputId}').click()" style="background: var(--app-surface-dark); color: var(--app-text-primary-dark-theme); border: 1px solid var(--app-border-dark); padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 13px;">
                        <span data-translate="chooseFiles">Choose Files</span>
                    </button>
                    <span class="file-selection-text" id="${inputId}Text" data-translate="noFileChosen" style="color: var(--app-text-secondary-dark-theme); font-size: 13px;">No file chosen</span>
                    ${input.replace('>', ' style="display: none;">')}
                </div>`;

                    content = content.replace(input, wrapper);
                    this.stats.applied++;
                }
            });
        }

        // Dynamic selected count messages
        const selectedCountPattern = /selectedCountMsg\.textContent\s*=\s*`[^`]+`/g;
        const selectedCountMatches = content.match(selectedCountPattern);

        if (selectedCountMatches) {
            selectedCountMatches.forEach(match => {
                if (match.includes('${')) {
                    const newCode = `selectedCountMsg.textContent = t('selectedForCustomCallouts').replace('{count}', selectedImages.length)`;
                    content = content.replace(match, newCode);
                    this.stats.applied++;
                    console.log('  ✅ Fixed dynamic selected count message');
                }
            });
        }

        return content;
    }

    /**
     * Escape regex special characters
     */
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Save the modified file
     */
    async saveFile(content, originalPath, suffix = '_translated') {
        const dir = path.dirname(originalPath);
        const ext = path.extname(originalPath);
        const base = path.basename(originalPath, ext);
        const outputPath = path.join(dir, `${base}${suffix}${ext}`);

        fs.writeFileSync(outputPath, content);

        console.log('\n📊 Application Statistics:');
        console.log(`  • Total items: ${this.stats.totalItems}`);
        console.log(`  • Applied: ${this.stats.applied}`);
        console.log(`  • Failed: ${this.stats.failed}`);
        console.log(`  • Skipped: ${this.stats.skipped}`);
        console.log(`\n✅ Saved to: ${outputPath}`);

        return outputPath;
    }

    /**
     * Generate report
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            statistics: this.stats,
            applied: this.applied.map(a => ({ text: a.item.text, key: a.item.translationKey })),
            failed: this.failed.map(f => ({ text: f.item.text, error: f.error })),
            coverage: {
                percentage: Math.round((this.stats.applied / this.stats.totalItems) * 100),
                complete: this.stats.failed === 0
            }
        };

        return report;
    }
}

module.exports = TranslationApplicationEngine;

// CLI Usage
if (require.main === module) {
    const inventoryPath = process.argv[2];
    const htmlPath = process.argv[3];
    const locale = process.argv[4] || 'de';

    if (!inventoryPath || !htmlPath) {
        console.log('Usage: node application-engine.js <inventory.json> <file.html> [locale]');
        process.exit(1);
    }

    const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
    const engine = new TranslationApplicationEngine(inventory, {});

    engine.applyToHTML(htmlPath, locale).then(content => {
        engine.saveFile(content, htmlPath);

        const report = engine.generateReport();
        fs.writeFileSync(htmlPath.replace('.html', '_report.json'), JSON.stringify(report, null, 2));

        console.log('\n✅ Translation application complete!');
        console.log(`   Coverage: ${report.coverage.percentage}%`);
    }).catch(error => {
        console.error('❌ Application failed:', error);
    });
}