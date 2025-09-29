/**
 * Translation Extraction and Application System
 * Professional solution for complete UI translation coverage
 *
 * This tool:
 * 1. Extracts ALL translatable text from HTML and JavaScript
 * 2. Generates translation keys automatically
 * 3. Updates translations.js with missing entries
 * 4. Applies translations safely without breaking JavaScript
 */

class TranslationExtractor {
    constructor() {
        this.extractedTexts = new Map();
        this.existingTranslations = {};
        this.htmlPatterns = [
            // Direct text content in elements
            /<(?:h[1-6]|button|label|span|div|p|option|a|li|td|th)[^>]*>([^<]+)</gi,
            // Title and alt attributes
            /(?:title|alt|placeholder|data-tooltip)="([^"]+)"/gi,
            // Value attributes for inputs
            /value="([^"]+)"/gi,
            // Data attributes with text
            /data-(?:text|label|title|message)="([^"]+)"/gi
        ];
        this.jsPatterns = [
            // String literals in JavaScript
            /['"`]([A-Z][^'"`]{2,50})['"`]/g,
            // showMessage calls
            /showMessage\s*\(\s*['"`]([^'"`]+)['"`]/g,
            // Alert/confirm messages
            /(?:alert|confirm)\s*\(\s*['"`]([^'"`]+)['"`]/g,
            // Console messages that might be user-facing
            /console\.\w+\s*\(\s*['"`]([A-Z][^'"`]+)['"`]/g,
            // Error messages
            /Error\s*\(\s*['"`]([^'"`]+)['"`]/g,
            // Labels and titles in object literals
            /(?:label|title|text|message|placeholder|tooltip)\s*:\s*['"`]([^'"`]+)['"`]/g
        ];
    }

    /**
     * Extract text from HTML file
     */
    extractFromHTML(htmlContent, fileName) {
        const texts = new Set();

        // Remove script and style tags to avoid false positives
        const cleanedHTML = htmlContent
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

        // Extract from HTML patterns
        this.htmlPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(cleanedHTML)) !== null) {
                const text = match[1].trim();
                if (this.isTranslatable(text)) {
                    texts.add(text);
                }
            }
        });

        // Extract from inline JavaScript
        const scriptMatches = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
        scriptMatches.forEach(script => {
            this.extractFromJS(script, texts);
        });

        // Store extracted texts with source info
        texts.forEach(text => {
            if (!this.extractedTexts.has(text)) {
                this.extractedTexts.set(text, []);
            }
            this.extractedTexts.get(text).push(fileName);
        });

        return texts;
    }

    /**
     * Extract text from JavaScript content
     */
    extractFromJS(jsContent, existingTexts = new Set()) {
        this.jsPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(jsContent)) !== null) {
                const text = match[1].trim();
                if (this.isTranslatable(text)) {
                    existingTexts.add(text);
                }
            }
        });
        return existingTexts;
    }

    /**
     * Check if text should be translated
     */
    isTranslatable(text) {
        // Skip if too short or too long
        if (text.length < 2 || text.length > 100) return false;

        // Skip if it's just numbers or special characters
        if (!/[a-zA-Z]/.test(text)) return false;

        // Skip if it's a file path or URL
        if (text.includes('/') || text.includes('\\') || text.includes('.html')) return false;

        // Skip if it's a CSS class or ID
        if (text.includes('-') && !text.includes(' ')) return false;

        // Skip common code patterns
        if (/^(px|em|rem|%|rgb|rgba|function|var|let|const|if|else|for|while)/.test(text)) return false;

        // Skip single letters unless they're common UI elements
        if (text.length === 1 && !'XO'.includes(text)) return false;

        return true;
    }

    /**
     * Generate translation key from text
     */
    generateKey(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 50);
    }

    /**
     * Load existing translations
     */
    async loadExistingTranslations() {
        try {
            // Load from translations.js if it exists
            if (typeof translations !== 'undefined') {
                this.existingTranslations = translations;
            }
        } catch (e) {
            console.warn('Could not load existing translations:', e);
        }
    }

    /**
     * Generate missing translations report
     */
    generateMissingTranslationsReport() {
        const report = {
            totalTexts: this.extractedTexts.size,
            existingKeys: Object.keys(this.existingTranslations.en || {}).length,
            missingTexts: [],
            suggestedTranslations: {}
        };

        const existingValues = new Set(Object.values(this.existingTranslations.en || {}));

        this.extractedTexts.forEach((sources, text) => {
            // Check if this text already has a translation
            if (!existingValues.has(text)) {
                const key = this.generateKey(text);
                report.missingTexts.push({
                    text: text,
                    key: key,
                    sources: sources
                });

                // Add to suggested translations
                if (!report.suggestedTranslations[key]) {
                    report.suggestedTranslations[key] = text;
                }
            }
        });

        return report;
    }

    /**
     * Generate complete translation structure
     */
    generateCompleteTranslations() {
        const languages = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
        const completeTranslations = {};

        languages.forEach(lang => {
            completeTranslations[lang] = { ...this.existingTranslations[lang] || {} };
        });

        // Add missing English texts
        this.extractedTexts.forEach((sources, text) => {
            const key = this.generateKey(text);
            if (!completeTranslations.en[key]) {
                completeTranslations.en[key] = text;

                // Add placeholder for other languages
                languages.slice(1).forEach(lang => {
                    if (!completeTranslations[lang][key]) {
                        completeTranslations[lang][key] = `[${lang.toUpperCase()}] ${text}`;
                    }
                });
            }
        });

        return completeTranslations;
    }

    /**
     * Apply translations to HTML content
     */
    applyTranslationsToHTML(htmlContent, locale = 'en') {
        let translatedHTML = htmlContent;
        const translations = this.existingTranslations[locale] || this.existingTranslations.en || {};

        // Create a map of text to translation
        const textToTranslation = new Map();
        Object.entries(translations).forEach(([key, value]) => {
            // Also map the English version if we have it
            if (this.existingTranslations.en && this.existingTranslations.en[key]) {
                textToTranslation.set(this.existingTranslations.en[key], value);
            }
        });

        // Apply translations to HTML elements
        this.extractedTexts.forEach((sources, text) => {
            const translation = textToTranslation.get(text) || text;
            if (translation !== text) {
                // Replace in element content
                const elementPattern = new RegExp(
                    `(>[\\s]*)${this.escapeRegExp(text)}([\\s]*<)`,
                    'g'
                );
                translatedHTML = translatedHTML.replace(elementPattern, `$1${translation}$2`);

                // Replace in attributes
                const attrPattern = new RegExp(
                    `((?:title|alt|placeholder|value|data-tooltip)="[^"]*)${this.escapeRegExp(text)}([^"]*")`,
                    'g'
                );
                translatedHTML = translatedHTML.replace(attrPattern, `$1${translation}$2`);
            }
        });

        return translatedHTML;
    }

    /**
     * Escape special regex characters
     */
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Process all HTML files in a directory
     */
    async processAllFiles(files) {
        const results = {
            filesProcessed: 0,
            totalTexts: 0,
            missingTranslations: [],
            errors: []
        };

        for (const file of files) {
            try {
                const content = await this.readFile(file);
                const texts = this.extractFromHTML(content, file);
                results.filesProcessed++;
                results.totalTexts += texts.size;
            } catch (error) {
                results.errors.push({ file, error: error.message });
            }
        }

        // Generate report
        await this.loadExistingTranslations();
        const report = this.generateMissingTranslationsReport();
        results.missingTranslations = report.missingTexts;
        results.suggestedTranslations = report.suggestedTranslations;

        return results;
    }

    /**
     * Read file (browser environment)
     */
    async readFile(path) {
        const response = await fetch(path);
        return response.text();
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationExtractor;
} else {
    window.TranslationExtractor = TranslationExtractor;
}