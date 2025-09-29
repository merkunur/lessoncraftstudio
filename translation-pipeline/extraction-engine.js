/**
 * AUTOMATED TRANSLATION PIPELINE - EXTRACTION ENGINE
 * Extracts ALL translatable text from HTML/JavaScript files
 *
 * @author Senior Software Engineer (20 years experience)
 * @version 1.0.0
 * @date December 2024
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const cheerio = require('cheerio');

class TranslationExtractionEngine {
    constructor() {
        this.inventory = {
            htmlTexts: [],
            javascriptTexts: [],
            dynamicTexts: [],
            browserControlled: [],
            metadata: {
                extractedAt: new Date().toISOString(),
                version: '1.0.0',
                totalTexts: 0
            }
        };
        this.seenTexts = new Set();
        this.excludePatterns = [
            /^[0-9]+$/,           // Pure numbers
            /^[a-z0-9_-]+$/,     // IDs/classes
            /^\s*$/,              // Empty/whitespace
            /^https?:\/\//,       // URLs
            /^data:/,             // Data URIs
            /^[.#]/,              // CSS selectors
            /^\/\//,              // Comments
        ];
    }

    /**
     * Extract all texts from an HTML file
     */
    async extractFromHTML(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });
        const fileName = path.basename(filePath);

        // Extract text from HTML elements
        this.extractHTMLTexts($, fileName);

        // Extract JavaScript texts from inline scripts
        $('script').each((i, script) => {
            if (!$(script).attr('src')) {
                const scriptContent = $(script).html();
                if (scriptContent) {
                    this.extractFromJavaScript(scriptContent, fileName, 'inline');
                }
            }
        });

        // Extract attributes that might contain text
        this.extractAttributeTexts($, fileName);

        // Return full inventory with summary
        return {
            ...this.inventory,
            summary: {
                htmlTexts: this.inventory.htmlTexts.length,
                javascriptTexts: this.inventory.javascriptTexts.length,
                dynamicTexts: this.inventory.dynamicTexts.length,
                browserControlled: this.inventory.browserControlled.length,
                totalTexts: this.inventory.htmlTexts.length +
                           this.inventory.javascriptTexts.length +
                           this.inventory.dynamicTexts.length +
                           this.inventory.browserControlled.length,
                totalUniqueTexts: this.seenTexts.size
            }
        };
    }

    /**
     * Extract visible text from HTML elements
     */
    extractHTMLTexts($, fileName) {
        const self = this;
        const textElements = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'label', 'button', 'option', 'span',
            'a', 'td', 'th', 'li', 'div'
        ];

        textElements.forEach(tag => {
            $(tag).each(function() {
                const element = $(this);
                const children = element.children();

                // Get only direct text content
                const text = element.clone()
                    .children()
                    .remove()
                    .end()
                    .text()
                    .trim();

                if (text && self.isTranslatableText(text)) {
                    const lineNumber = element[0].startIndex || 'unknown';
                    const hasDataTranslate = element.attr('data-translate');

                    self.addTextToInventory({
                        type: 'html_element',
                        text: text,
                        tag: tag,
                        file: fileName,
                        line: lineNumber,
                        hasTranslation: !!hasDataTranslate,
                        translationKey: hasDataTranslate || self.generateKey(text),
                        selector: self.generateSelector(element),
                        context: self.getContext(element)
                    });
                }
            });
        });

        // Special handling for placeholders
        $('input[placeholder], textarea[placeholder]').each(function() {
            const placeholder = $(this).attr('placeholder');
            if (placeholder && self.isTranslatableText(placeholder)) {
                self.addTextToInventory({
                    type: 'placeholder',
                    text: placeholder,
                    file: fileName,
                    hasTranslation: !!$(this).attr('data-translate-placeholder'),
                    translationKey: $(this).attr('data-translate-placeholder') || self.generateKey(placeholder)
                });
            }
        });

        // Special handling for title attributes
        $('[title]').each(function() {
            const title = $(this).attr('title');
            if (title && self.isTranslatableText(title)) {
                self.addTextToInventory({
                    type: 'title_attribute',
                    text: title,
                    file: fileName,
                    hasTranslation: !!$(this).attr('data-translate-title'),
                    translationKey: $(this).attr('data-translate-title') || self.generateKey(title)
                });
            }
        });
    }

    /**
     * Extract text from JavaScript code
     */
    extractFromJavaScript(code, fileName, scriptType = 'file') {
        try {
            const ast = parser.parse(code, {
                sourceType: 'script',
                plugins: ['jsx'],
                errorRecovery: true
            });

            const self = this;

            traverse(ast, {
                // String literals
                StringLiteral(path) {
                    const value = path.node.value;
                    if (self.isTranslatableText(value)) {
                        self.analyzeJavaScriptString(value, path, fileName);
                    }
                },

                // Template literals
                TemplateLiteral(path) {
                    const quasis = path.node.quasis;
                    quasis.forEach(quasi => {
                        const value = quasi.value.cooked;
                        if (value && self.isTranslatableText(value)) {
                            const hasPlaceholders = path.node.expressions.length > 0;
                            self.addTextToInventory({
                                type: hasPlaceholders ? 'template_with_placeholders' : 'template_literal',
                                text: value,
                                file: fileName,
                                line: path.node.loc?.start.line,
                                hasPlaceholders: hasPlaceholders,
                                translationKey: self.generateKey(value),
                                context: self.getJavaScriptContext(path)
                            });
                        }
                    });
                },

                // Function calls that might generate UI text
                CallExpression(path) {
                    const callee = path.node.callee;

                    // Check for showMessage, alert, confirm, etc.
                    if (callee.type === 'Identifier') {
                        const funcName = callee.name;
                        const uiFunctions = ['showMessage', 'alert', 'confirm', 'console.log', 'console.error'];

                        if (uiFunctions.includes(funcName)) {
                            const args = path.node.arguments;
                            if (args.length > 0 && args[0].type === 'StringLiteral') {
                                self.addTextToInventory({
                                    type: 'ui_message',
                                    text: args[0].value,
                                    file: fileName,
                                    line: path.node.loc?.start.line,
                                    function: funcName,
                                    translationKey: self.generateKey(args[0].value),
                                    context: 'UI Message'
                                });
                            }
                        }
                    }

                    // Check for innerHTML/textContent assignments
                    if (callee.type === 'MemberExpression') {
                        const property = callee.property.name;
                        if (['innerHTML', 'textContent', 'innerText'].includes(property)) {
                            const args = path.parent.right;
                            if (args && args.type === 'StringLiteral') {
                                self.addTextToInventory({
                                    type: 'dom_assignment',
                                    text: args.value,
                                    file: fileName,
                                    line: path.node.loc?.start.line,
                                    property: property,
                                    translationKey: self.generateKey(args.value)
                                });
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(`Error parsing JavaScript in ${fileName}:`, error.message);

            // Fallback: Use regex patterns for common cases
            this.extractWithRegex(code, fileName);
        }
    }

    /**
     * Fallback regex-based extraction
     */
    extractWithRegex(code, fileName) {
        const patterns = [
            // showMessage calls
            /showMessage\s*\(\s*["'`]([^"'`]+)["'`]/g,
            // innerHTML assignments
            /innerHTML\s*=\s*["'`]([^"'`]+)["'`]/g,
            // textContent assignments
            /textContent\s*=\s*["'`]([^"'`]+)["'`]/g,
            // Alert/confirm
            /(?:alert|confirm)\s*\(\s*["'`]([^"'`]+)["'`]/g,
            // Option elements
            /<option[^>]*>([^<]+)<\/option>/g,
            // Button text
            /<button[^>]*>([^<]+)<\/button>/g
        ];

        patterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(code)) !== null) {
                const text = match[1].trim();
                if (text && this.isTranslatableText(text)) {
                    this.addTextToInventory({
                        type: 'regex_extracted',
                        text: text,
                        file: fileName,
                        method: 'regex',
                        translationKey: this.generateKey(text)
                    });
                }
            }
        });
    }

    /**
     * Analyze JavaScript string for context
     */
    analyzeJavaScriptString(value, path, fileName) {
        const parent = path.parent;
        let context = 'unknown';
        let shouldAdd = false;

        // Check if it's a UI-related string
        if (parent.type === 'CallExpression') {
            const callee = parent.callee;
            if (callee.type === 'MemberExpression') {
                const obj = callee.object.name;
                const prop = callee.property.name;

                // DOM manipulation
                if (['innerHTML', 'textContent', 'innerText'].includes(prop)) {
                    context = 'dom_content';
                    shouldAdd = true;
                }
                // Attribute setting
                else if (prop === 'setAttribute' && parent.arguments[0]?.value === 'placeholder') {
                    context = 'placeholder';
                    shouldAdd = true;
                }
            } else if (callee.type === 'Identifier') {
                // UI functions
                if (['showMessage', 'alert', 'confirm', 't'].includes(callee.name)) {
                    context = `${callee.name}_call`;
                    shouldAdd = true;
                }
            }
        }
        // Assignment to properties that might be UI-related
        else if (parent.type === 'AssignmentExpression') {
            const left = parent.left;
            if (left.type === 'MemberExpression') {
                const prop = left.property.name;
                if (['innerHTML', 'textContent', 'innerText', 'placeholder', 'title', 'value'].includes(prop)) {
                    context = `${prop}_assignment`;
                    shouldAdd = true;
                }
            }
        }
        // Object properties that might be labels
        else if (parent.type === 'ObjectProperty') {
            const key = parent.key.name || parent.key.value;
            if (['label', 'title', 'text', 'message', 'description', 'placeholder', 'content'].includes(key)) {
                context = `object_property_${key}`;
                shouldAdd = true;
            }
        }

        if (shouldAdd) {
            this.addTextToInventory({
                type: 'javascript_string',
                text: value,
                file: fileName,
                line: path.node.loc?.start.line,
                context: context,
                translationKey: this.generateKey(value)
            });
        }
    }

    /**
     * Extract text from HTML attributes
     */
    extractAttributeTexts($, fileName) {
        // Value attributes on buttons/inputs
        $('input[type="button"][value], input[type="submit"][value]').each((i, elem) => {
            const value = $(elem).attr('value');
            if (value && this.isTranslatableText(value)) {
                this.addTextToInventory({
                    type: 'input_value',
                    text: value,
                    file: fileName,
                    hasTranslation: !!$(elem).attr('data-translate'),
                    translationKey: this.generateKey(value)
                });
            }
        });

        // Alt text for images
        $('img[alt]').each((i, elem) => {
            const alt = $(elem).attr('alt');
            if (alt && this.isTranslatableText(alt)) {
                this.addTextToInventory({
                    type: 'alt_text',
                    text: alt,
                    file: fileName,
                    hasTranslation: !!$(elem).attr('data-translate-alt'),
                    translationKey: this.generateKey(alt)
                });
            }
        });
    }

    /**
     * Check if text is translatable
     */
    isTranslatableText(text) {
        if (!text || typeof text !== 'string') return false;

        text = text.trim();

        // Too short or too long
        if (text.length < 2 || text.length > 500) return false;

        // Check exclude patterns
        for (const pattern of this.excludePatterns) {
            if (pattern.test(text)) return false;
        }

        // Must contain at least one letter
        if (!/[a-zA-Z]/.test(text)) return false;

        // Exclude code-like strings
        if (text.includes('function(') || text.includes('=>') || text.includes('var ')) return false;

        return true;
    }

    /**
     * Generate a translation key from text
     */
    generateKey(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 50);
    }

    /**
     * Generate CSS selector for element
     */
    generateSelector(element) {
        const tag = element[0].name;
        const id = element.attr('id');
        const classes = element.attr('class');

        if (id) return `#${id}`;
        if (classes) return `${tag}.${classes.split(' ').join('.')}`;
        return tag;
    }

    /**
     * Get context information for element
     */
    getContext(element) {
        const parent = element.parent();
        const section = element.closest('.accordion-item, section, .panel, .main');

        return {
            parent: parent[0]?.name || 'root',
            section: section.find('.accordion-button').first().text() || 'main',
            formField: element.closest('label').text() || null
        };
    }

    /**
     * Get JavaScript context
     */
    getJavaScriptContext(path) {
        let context = [];
        let current = path;

        for (let i = 0; i < 3 && current.parent; i++) {
            const parent = current.parent;
            if (parent.type === 'CallExpression' && parent.callee.name) {
                context.push(`${parent.callee.name}()`);
            } else if (parent.type === 'VariableDeclarator' && parent.id.name) {
                context.push(`var ${parent.id.name}`);
            } else if (parent.type === 'ObjectProperty' && parent.key.name) {
                context.push(`{${parent.key.name}: ...}`);
            }
            current = parent;
        }

        return context.join(' → ');
    }

    /**
     * Add text to inventory
     */
    addTextToInventory(item) {
        // Avoid duplicates
        const textKey = `${item.text}::${item.type}`;
        if (this.seenTexts.has(textKey)) return;

        this.seenTexts.add(textKey);

        // Categorize by type
        if (item.type.startsWith('html_')) {
            this.inventory.htmlTexts.push(item);
        } else if (item.type.startsWith('javascript_') || item.type === 'regex_extracted') {
            this.inventory.javascriptTexts.push(item);
        } else if (item.type.includes('template') || item.hasPlaceholders) {
            this.inventory.dynamicTexts.push(item);
        } else if (item.type === 'file_input' || item.text.includes('Choose file')) {
            this.inventory.browserControlled.push(item);
        } else {
            this.inventory.javascriptTexts.push(item);
        }

        this.inventory.metadata.totalTexts++;
    }

    /**
     * Export inventory to JSON
     */
    exportToJSON(outputPath) {
        const output = {
            ...this.inventory,
            summary: {
                htmlTexts: this.inventory.htmlTexts.length,
                javascriptTexts: this.inventory.javascriptTexts.length,
                dynamicTexts: this.inventory.dynamicTexts.length,
                browserControlled: this.inventory.browserControlled.length,
                totalTexts: this.inventory.metadata.totalTexts,
                withTranslations: this.inventory.htmlTexts.filter(t => t.hasTranslation).length,
                withoutTranslations: this.inventory.htmlTexts.filter(t => !t.hasTranslation).length
            }
        };

        fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
        return output;
    }

    /**
     * Generate migration script
     */
    generateMigrationScript(inventory, targetLocale) {
        const script = [];

        script.push('// Auto-generated translation migration script');
        script.push(`// Target locale: ${targetLocale}`);
        script.push(`// Generated: ${new Date().toISOString()}`);
        script.push('');
        script.push('const translations = {');

        // Group by type
        const allTexts = [
            ...inventory.htmlTexts,
            ...inventory.javascriptTexts,
            ...inventory.dynamicTexts
        ];

        allTexts.forEach(item => {
            script.push(`  "${item.translationKey}": "[TRANSLATE: ${item.text}]",`);
        });

        script.push('};');
        script.push('');
        script.push('// Apply translations function');
        script.push('function applyTranslations() {');
        script.push('  // Implementation here');
        script.push('}');

        return script.join('\n');
    }
}

module.exports = TranslationExtractionEngine;

// CLI Usage
if (require.main === module) {
    const engine = new TranslationExtractionEngine();
    const filePath = process.argv[2];

    if (!filePath) {
        console.log('Usage: node extraction-engine.js <html-file>');
        process.exit(1);
    }

    console.log('🔍 Extracting translations from:', filePath);

    engine.extractFromHTML(filePath).then(inventory => {
        const outputPath = filePath.replace('.html', '_inventory.json');
        const result = engine.exportToJSON(outputPath);

        console.log('\n📊 Extraction Complete:');
        console.log(`  • HTML texts: ${result.summary.htmlTexts}`);
        console.log(`  • JavaScript texts: ${result.summary.javascriptTexts}`);
        console.log(`  • Dynamic texts: ${result.summary.dynamicTexts}`);
        console.log(`  • Browser-controlled: ${result.summary.browserControlled}`);
        console.log(`  • Total: ${result.summary.totalTexts}`);
        console.log(`\n✅ Inventory saved to: ${outputPath}`);
    }).catch(error => {
        console.error('❌ Extraction failed:', error);
    });
}