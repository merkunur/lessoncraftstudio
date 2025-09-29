/**
 * AUTOMATED TRANSLATION PIPELINE - RUNTIME VALIDATOR
 * Detects untranslated text at runtime and generates real-time reports
 *
 * @author Senior Software Engineer (20 years experience)
 * @version 1.0.0
 */

(function() {
    'use strict';

    class TranslationRuntimeValidator {
        constructor(config = {}) {
            this.config = {
                locale: config.locale || window.currentLocale || 'en',
                detectEnglish: config.detectEnglish !== false,
                logLevel: config.logLevel || 'warn', // 'debug', 'info', 'warn', 'error'
                reportInterval: config.reportInterval || 5000,
                validateOnMutation: config.validateOnMutation !== false,
                highlightUntranslated: config.highlightUntranslated || false,
                autoReport: config.autoReport !== false,
                excludePatterns: config.excludePatterns || [],
                ...config
            };

            this.untranslatedTexts = new Map();
            this.validatedElements = new WeakSet();
            this.statistics = {
                totalElements: 0,
                translatedElements: 0,
                untranslatedElements: 0,
                dynamicTexts: 0,
                startTime: Date.now()
            };

            this.englishPatterns = [
                /^(the|a|an|is|are|was|were|have|has|had|do|does|did)\s/i,
                /\s(and|or|but|for|with|without|from|to|at|in|on|by)\s/i,
                /(click|select|choose|enter|type|upload|download|save|cancel|close|open)/i,
                /(error|warning|success|info|message|alert|confirm)/i,
                /(please|thank you|sorry|welcome|hello|hi|bye)/i
            ];

            this.init();
        }

        /**
         * Initialize the validator
         */
        init() {
            this.log('info', '🔍 Translation Runtime Validator initialized', {
                locale: this.config.locale,
                mode: this.config.highlightUntranslated ? 'visual' : 'logging'
            });

            // Initial validation
            this.validateDocument();

            // Set up mutation observer
            if (this.config.validateOnMutation) {
                this.setupMutationObserver();
            }

            // Set up periodic reporting
            if (this.config.autoReport) {
                setInterval(() => this.generateReport(), this.config.reportInterval);
            }

            // Expose API
            window.TranslationValidator = this;
            window.validateTranslations = () => this.validateDocument();
            window.getTranslationReport = () => this.generateReport();
        }

        /**
         * Validate entire document
         */
        validateDocument() {
            this.log('debug', 'Starting document validation...');

            const startTime = performance.now();

            // Reset statistics
            this.statistics.totalElements = 0;
            this.statistics.translatedElements = 0;
            this.statistics.untranslatedElements = 0;

            // Validate all text nodes
            this.walkTextNodes(document.body, (node) => {
                this.validateTextNode(node);
            });

            // Validate attributes
            this.validateAttributes();

            // Validate dynamic content
            this.validateDynamicContent();

            const duration = performance.now() - startTime;

            this.log('info', `✅ Validation complete in ${duration.toFixed(2)}ms`, this.statistics);

            return this.statistics;
        }

        /**
         * Walk through all text nodes
         */
        walkTextNodes(element, callback) {
            if (element.nodeType === Node.TEXT_NODE) {
                callback(element);
            } else if (element.nodeType === Node.ELEMENT_NODE) {
                // Skip script and style elements
                if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') {
                    return;
                }

                for (let child of element.childNodes) {
                    this.walkTextNodes(child, callback);
                }
            }
        }

        /**
         * Validate a text node
         */
        validateTextNode(node) {
            const text = node.textContent.trim();

            if (!text || text.length < 2) return;

            // Skip if already validated
            if (node.parentElement && this.validatedElements.has(node.parentElement)) {
                return;
            }

            this.statistics.totalElements++;

            const element = node.parentElement;

            // Check if element has translation attribute
            const hasTranslation = element && (
                element.hasAttribute('data-translate') ||
                element.hasAttribute('data-translate-text')
            );

            if (hasTranslation) {
                this.statistics.translatedElements++;
                this.markAsTranslated(element);
            } else if (this.isUntranslated(text)) {
                this.statistics.untranslatedElements++;
                this.recordUntranslated(text, element, 'text_node');

                if (this.config.highlightUntranslated && element) {
                    this.highlightElement(element);
                }
            }

            if (element) {
                this.validatedElements.add(element);
            }
        }

        /**
         * Validate attributes (placeholders, titles, alts)
         */
        validateAttributes() {
            // Placeholders
            document.querySelectorAll('[placeholder]').forEach(element => {
                const text = element.getAttribute('placeholder');
                if (text && !element.hasAttribute('data-translate-placeholder')) {
                    if (this.isUntranslated(text)) {
                        this.recordUntranslated(text, element, 'placeholder');
                        if (this.config.highlightUntranslated) {
                            this.highlightElement(element);
                        }
                    }
                }
            });

            // Titles
            document.querySelectorAll('[title]').forEach(element => {
                const text = element.getAttribute('title');
                if (text && !element.hasAttribute('data-translate-title')) {
                    if (this.isUntranslated(text)) {
                        this.recordUntranslated(text, element, 'title');
                    }
                }
            });

            // Alt texts
            document.querySelectorAll('img[alt]').forEach(element => {
                const text = element.getAttribute('alt');
                if (text && !element.hasAttribute('data-translate-alt')) {
                    if (this.isUntranslated(text)) {
                        this.recordUntranslated(text, element, 'alt');
                    }
                }
            });

            // Input values
            document.querySelectorAll('input[type="button"], input[type="submit"]').forEach(element => {
                const text = element.value;
                if (text && !element.hasAttribute('data-translate')) {
                    if (this.isUntranslated(text)) {
                        this.recordUntranslated(text, element, 'input_value');
                        if (this.config.highlightUntranslated) {
                            this.highlightElement(element);
                        }
                    }
                }
            });
        }

        /**
         * Validate dynamically generated content
         */
        validateDynamicContent() {
            // Override showMessage if it exists
            if (typeof window.showMessage === 'function') {
                const originalShowMessage = window.showMessage;
                window.showMessage = (msg, ...args) => {
                    if (this.isUntranslated(msg)) {
                        this.recordUntranslated(msg, null, 'showMessage');
                        this.log('warn', `Untranslated showMessage: "${msg}"`);
                    }
                    return originalShowMessage(msg, ...args);
                };
            }

            // Override alert
            const originalAlert = window.alert;
            window.alert = (msg) => {
                if (typeof msg === 'string' && this.isUntranslated(msg)) {
                    this.recordUntranslated(msg, null, 'alert');
                    this.log('warn', `Untranslated alert: "${msg}"`);
                }
                return originalAlert(msg);
            };

            // Override confirm
            const originalConfirm = window.confirm;
            window.confirm = (msg) => {
                if (typeof msg === 'string' && this.isUntranslated(msg)) {
                    this.recordUntranslated(msg, null, 'confirm');
                    this.log('warn', `Untranslated confirm: "${msg}"`);
                }
                return originalConfirm(msg);
            };
        }

        /**
         * Set up mutation observer
         */
        setupMutationObserver() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                this.validateTextNode(node);
                            } else if (node.nodeType === Node.ELEMENT_NODE) {
                                this.walkTextNodes(node, (textNode) => {
                                    this.validateTextNode(textNode);
                                });
                            }
                        });
                    } else if (mutation.type === 'characterData') {
                        this.validateTextNode(mutation.target);
                    } else if (mutation.type === 'attributes') {
                        const attr = mutation.attributeName;
                        if (['placeholder', 'title', 'alt', 'value'].includes(attr)) {
                            const element = mutation.target;
                            const text = element.getAttribute(attr) || element[attr];
                            if (text && this.isUntranslated(text)) {
                                this.recordUntranslated(text, element, `attribute_${attr}`);
                                this.statistics.dynamicTexts++;
                            }
                        }
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ['placeholder', 'title', 'alt', 'value']
            });

            this.log('debug', 'Mutation observer started');
        }

        /**
         * Check if text is untranslated
         */
        isUntranslated(text) {
            if (!text || typeof text !== 'string') return false;

            text = text.trim();

            // Too short
            if (text.length < 2) return false;

            // Check exclude patterns
            for (const pattern of this.config.excludePatterns) {
                if (pattern.test(text)) return false;
            }

            // If not detecting English, assume all text needs checking
            if (!this.config.detectEnglish) {
                return true;
            }

            // For non-English locales, detect English text
            if (this.config.locale !== 'en') {
                // Check for English patterns
                for (const pattern of this.englishPatterns) {
                    if (pattern.test(text)) {
                        return true;
                    }
                }

                // Check for common English words
                const words = text.toLowerCase().split(/\s+/);
                const englishWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'have', 'has',
                                     'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
                                     'may', 'might', 'must', 'can', 'could', 'shall'];

                const englishCount = words.filter(w => englishWords.includes(w)).length;
                if (englishCount >= 2 || (englishCount === 1 && words.length <= 3)) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Record untranslated text
         */
        recordUntranslated(text, element, type) {
            const key = `${text}::${type}`;

            if (!this.untranslatedTexts.has(key)) {
                this.untranslatedTexts.set(key, {
                    text: text,
                    type: type,
                    occurrences: [],
                    firstSeen: Date.now()
                });
            }

            const entry = this.untranslatedTexts.get(key);
            entry.occurrences.push({
                element: element,
                selector: element ? this.getSelector(element) : null,
                timestamp: Date.now()
            });
        }

        /**
         * Mark element as translated
         */
        markAsTranslated(element) {
            if (element && this.config.highlightUntranslated) {
                element.style.removeProperty('outline');
                element.style.removeProperty('background-color');
                element.removeAttribute('data-untranslated');
            }
        }

        /**
         * Highlight untranslated element
         */
        highlightElement(element) {
            if (!element) return;

            element.style.outline = '2px dashed red';
            element.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            element.setAttribute('data-untranslated', 'true');

            // Add tooltip
            const existingTitle = element.getAttribute('title');
            element.setAttribute('title', `⚠️ Untranslated text (${this.config.locale})`);
            element.setAttribute('data-original-title', existingTitle || '');
        }

        /**
         * Get CSS selector for element
         */
        getSelector(element) {
            if (!element) return null;

            if (element.id) return `#${element.id}`;

            let path = [];
            while (element && element.nodeType === Node.ELEMENT_NODE) {
                let selector = element.nodeName.toLowerCase();

                if (element.className) {
                    selector += '.' + element.className.split(' ').join('.');
                }

                path.unshift(selector);
                element = element.parentNode;

                if (path.length > 3) break; // Limit depth
            }

            return path.join(' > ');
        }

        /**
         * Generate report
         */
        generateReport() {
            const report = {
                locale: this.config.locale,
                timestamp: new Date().toISOString(),
                duration: Date.now() - this.statistics.startTime,
                statistics: {
                    ...this.statistics,
                    coverage: this.statistics.totalElements > 0
                        ? Math.round((this.statistics.translatedElements / this.statistics.totalElements) * 100)
                        : 0
                },
                untranslatedTexts: Array.from(this.untranslatedTexts.values()).map(entry => ({
                    text: entry.text,
                    type: entry.type,
                    count: entry.occurrences.length,
                    firstSeen: new Date(entry.firstSeen).toISOString(),
                    selectors: [...new Set(entry.occurrences.map(o => o.selector).filter(Boolean))]
                })).sort((a, b) => b.count - a.count)
            };

            if (this.untranslatedTexts.size > 0) {
                this.log('warn', `📊 Found ${this.untranslatedTexts.size} untranslated texts`, report);
            } else {
                this.log('info', '✅ All texts appear to be translated!', report);
            }

            // Save to localStorage
            localStorage.setItem('translation_validation_report', JSON.stringify(report));

            // Dispatch event
            window.dispatchEvent(new CustomEvent('translationValidation', { detail: report }));

            return report;
        }

        /**
         * Export report to console table
         */
        exportToConsole() {
            const report = this.generateReport();

            console.group('🌍 Translation Validation Report');
            console.log(`Locale: ${report.locale}`);
            console.log(`Coverage: ${report.statistics.coverage}%`);
            console.log(`Total Elements: ${report.statistics.totalElements}`);
            console.log(`Translated: ${report.statistics.translatedElements}`);
            console.log(`Untranslated: ${report.statistics.untranslatedElements}`);

            if (report.untranslatedTexts.length > 0) {
                console.group('Untranslated Texts');
                console.table(report.untranslatedTexts.slice(0, 20));
                console.groupEnd();
            }

            console.groupEnd();

            return report;
        }

        /**
         * Log helper
         */
        log(level, message, data) {
            const levels = ['debug', 'info', 'warn', 'error'];
            const currentLevel = levels.indexOf(this.config.logLevel);
            const messageLevel = levels.indexOf(level);

            if (messageLevel >= currentLevel) {
                const method = console[level] || console.log;
                if (data) {
                    method(`[TranslationValidator] ${message}`, data);
                } else {
                    method(`[TranslationValidator] ${message}`);
                }
            }
        }

        /**
         * Destroy validator
         */
        destroy() {
            // Remove highlights
            document.querySelectorAll('[data-untranslated]').forEach(element => {
                this.markAsTranslated(element);
                const originalTitle = element.getAttribute('data-original-title');
                if (originalTitle) {
                    element.setAttribute('title', originalTitle);
                } else {
                    element.removeAttribute('title');
                }
            });

            // Clear data
            this.untranslatedTexts.clear();
            this.validatedElements = new WeakSet();

            this.log('info', 'Validator destroyed');
        }
    }

    // Auto-initialize if locale is not English
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.currentLocale && window.currentLocale !== 'en') {
                new TranslationRuntimeValidator({
                    locale: window.currentLocale,
                    highlightUntranslated: true,
                    logLevel: 'warn'
                });
            }
        });
    } else {
        if (window.currentLocale && window.currentLocale !== 'en') {
            new TranslationRuntimeValidator({
                locale: window.currentLocale,
                highlightUntranslated: true,
                logLevel: 'warn'
            });
        }
    }

    // Expose class for manual initialization
    window.TranslationRuntimeValidator = TranslationRuntimeValidator;

})();