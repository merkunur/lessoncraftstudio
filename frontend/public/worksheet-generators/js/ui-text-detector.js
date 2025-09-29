/**
 * Professional UI Text Detection System
 *
 * This system captures ALL text in the UI including:
 * - Static HTML text
 * - Dynamically generated content
 * - JavaScript-created elements
 * - Canvas text
 * - Pseudo-elements (::before, ::after)
 * - Attributes (placeholder, title, alt, aria-label)
 * - Select options
 * - Button values
 * - Text added after page load
 *
 * @author Expert Web Developer
 * @version 2.0.0
 */

class UITextDetector {
    constructor() {
        this.detectedTexts = new Map();
        this.ignoredTexts = new Set();
        this.observer = null;
        this.isRunning = false;

        // Patterns to ignore (not translatable)
        this.ignorePatterns = [
            /^[0-9\s\.\,\-\+\*\/\=\(\)\%]+$/, // Numbers and math
            /^[a-f0-9]{6}$/i,                  // Hex colors
            /^#[a-f0-9]{3,6}$/i,              // Hex colors with #
            /^rgba?\(/,                        // RGB colors
            /^https?:\/\//,                   // URLs
            /^data:/,                         // Data URLs
            /^[a-z0-9\-\_]+$/,               // IDs and classes (lowercase only)
            /^\s*$/,                         // Empty or whitespace
            /^[A-Z]{1}$/,                   // Single letters (except in specific contexts)
            /^(px|em|rem|%|vh|vw|pt)$/,    // CSS units
            /\.(png|jpg|jpeg|gif|svg|webp|css|js|html)$/i, // File extensions
        ];

        // HTML tags to check for text content
        this.textTags = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'span', 'div', 'label', 'button',
            'a', 'li', 'td', 'th', 'dt', 'dd',
            'option', 'legend', 'caption', 'figcaption',
            'summary', 'em', 'strong', 'b', 'i', 'u',
            'blockquote', 'cite', 'code', 'pre',
            'nav', 'header', 'footer', 'section', 'article'
        ];

        // Attributes that contain translatable text
        this.textAttributes = [
            'placeholder', 'title', 'alt', 'aria-label',
            'aria-description', 'data-tooltip', 'data-title',
            'data-label', 'data-text', 'data-content',
            'value' // for buttons and inputs
        ];
    }

    /**
     * Start detecting all UI text
     */
    start() {
        if (this.isRunning) {
            console.log('UI Text Detector is already running');
            return;
        }

        this.isRunning = true;
        this.detectedTexts.clear();

        console.log('🔍 Starting comprehensive UI text detection...');

        // Phase 1: Initial DOM scan
        this.scanDOM();

        // Phase 2: Scan computed styles for pseudo-elements
        this.scanPseudoElements();

        // Phase 3: Intercept dynamic text creation
        this.interceptDynamicText();

        // Phase 4: Set up mutation observer for future changes
        this.setupMutationObserver();

        // Phase 5: Monitor canvas operations
        this.monitorCanvas();

        // Phase 6: Scan for JavaScript-generated text
        this.scanJavaScriptText();

        // Phase 7: Check for text in shadow DOM
        this.scanShadowDOM();

        return this;
    }

    /**
     * Phase 1: Scan the entire DOM for text
     */
    scanDOM() {
        const startTime = performance.now();

        // Get all text nodes
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    const text = node.textContent.trim();
                    if (text && this.isTranslatable(text)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );

        let node;
        while (node = walker.nextNode()) {
            this.addText(node.textContent.trim(), 'DOM Text Node', node.parentElement);
        }

        // Scan all elements for attributes
        document.querySelectorAll('*').forEach(element => {
            // Check attributes
            this.textAttributes.forEach(attr => {
                const value = element.getAttribute(attr);
                if (value && this.isTranslatable(value)) {
                    this.addText(value, `Attribute: ${attr}`, element);
                }
            });

            // Check input/button values
            if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                const value = element.value;
                if (value && this.isTranslatable(value)) {
                    this.addText(value, 'Input/Button Value', element);
                }
            }

            // Check select options
            if (element.tagName === 'OPTION') {
                const text = element.textContent.trim();
                if (text && this.isTranslatable(text)) {
                    this.addText(text, 'Select Option', element);
                }
            }
        });

        const endTime = performance.now();
        console.log(`✅ DOM scan complete in ${(endTime - startTime).toFixed(2)}ms`);
    }

    /**
     * Phase 2: Scan for pseudo-element content
     */
    scanPseudoElements() {
        const elements = document.querySelectorAll('*');

        elements.forEach(element => {
            const styles = window.getComputedStyle(element);

            // Check ::before
            const beforeContent = window.getComputedStyle(element, '::before').content;
            if (beforeContent && beforeContent !== 'none' && beforeContent !== 'normal') {
                const text = beforeContent.replace(/^["']|["']$/g, '');
                if (this.isTranslatable(text)) {
                    this.addText(text, 'Pseudo ::before', element);
                }
            }

            // Check ::after
            const afterContent = window.getComputedStyle(element, '::after').content;
            if (afterContent && afterContent !== 'none' && afterContent !== 'normal') {
                const text = afterContent.replace(/^["']|["']$/g, '');
                if (this.isTranslatable(text)) {
                    this.addText(text, 'Pseudo ::after', element);
                }
            }
        });
    }

    /**
     * Phase 3: Intercept dynamic text creation
     */
    interceptDynamicText() {
        // Intercept innerHTML and textContent setters
        const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
        const originalTextContent = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');

        const self = this;

        // Override innerHTML
        Object.defineProperty(Element.prototype, 'innerHTML', {
            set: function(value) {
                originalInnerHTML.set.call(this, value);

                // Extract text from the new HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = value;
                self.scanElement(tempDiv, 'Dynamic innerHTML');
            },
            get: originalInnerHTML.get
        });

        // Override textContent
        Object.defineProperty(Node.prototype, 'textContent', {
            set: function(value) {
                if (value && self.isTranslatable(value)) {
                    self.addText(value, 'Dynamic textContent', this);
                }
                originalTextContent.set.call(this, value);
            },
            get: originalTextContent.get
        });

        // Intercept document.createElement to track dynamically created elements
        const originalCreateElement = document.createElement;
        document.createElement = function(...args) {
            const element = originalCreateElement.apply(document, args);

            // Set up observer for this element
            setTimeout(() => {
                if (element.textContent && self.isTranslatable(element.textContent)) {
                    self.addText(element.textContent, 'Dynamic createElement', element);
                }
            }, 0);

            return element;
        };
    }

    /**
     * Phase 4: Set up mutation observer
     */
    setupMutationObserver() {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                // Check added nodes
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        const text = node.textContent.trim();
                        if (text && this.isTranslatable(text)) {
                            this.addText(text, 'Mutation: Text Node', node.parentElement);
                        }
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        this.scanElement(node, 'Mutation: Element');
                    }
                });

                // Check attribute changes
                if (mutation.type === 'attributes') {
                    const attr = mutation.attributeName;
                    if (this.textAttributes.includes(attr)) {
                        const value = mutation.target.getAttribute(attr);
                        if (value && this.isTranslatable(value)) {
                            this.addText(value, `Mutation: ${attr}`, mutation.target);
                        }
                    }
                }

                // Check character data changes
                if (mutation.type === 'characterData') {
                    const text = mutation.target.textContent.trim();
                    if (text && this.isTranslatable(text)) {
                        this.addText(text, 'Mutation: Character Data', mutation.target.parentElement);
                    }
                }
            });
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            characterDataOldValue: true
        });

        console.log('✅ Mutation observer started');
    }

    /**
     * Phase 5: Monitor canvas text operations
     */
    monitorCanvas() {
        const canvases = document.querySelectorAll('canvas');

        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Intercept fillText
            const originalFillText = ctx.fillText;
            ctx.fillText = (text, ...args) => {
                if (this.isTranslatable(text)) {
                    this.addText(text, 'Canvas fillText', canvas);
                }
                return originalFillText.call(ctx, text, ...args);
            };

            // Intercept strokeText
            const originalStrokeText = ctx.strokeText;
            ctx.strokeText = (text, ...args) => {
                if (this.isTranslatable(text)) {
                    this.addText(text, 'Canvas strokeText', canvas);
                }
                return originalStrokeText.call(ctx, text, ...args);
            };
        });
    }

    /**
     * Phase 6: Scan JavaScript for hardcoded strings
     */
    scanJavaScriptText() {
        // Check for common message functions
        const messageFunctions = ['alert', 'confirm', 'prompt'];

        messageFunctions.forEach(func => {
            const original = window[func];
            window[func] = (message, ...args) => {
                if (message && this.isTranslatable(message)) {
                    this.addText(message, `JavaScript: ${func}`, null);
                }
                return original.call(window, message, ...args);
            };
        });

        // Check console messages (often contain user-facing text)
        const originalLog = console.log;
        console.log = (...args) => {
            args.forEach(arg => {
                if (typeof arg === 'string' && this.isTranslatable(arg)) {
                    this.addText(arg, 'Console.log', null);
                }
            });
            return originalLog.apply(console, args);
        };
    }

    /**
     * Phase 7: Scan shadow DOM
     */
    scanShadowDOM() {
        const elementsWithShadow = document.querySelectorAll('*');

        elementsWithShadow.forEach(element => {
            if (element.shadowRoot) {
                this.scanElement(element.shadowRoot, 'Shadow DOM');
            }
        });
    }

    /**
     * Scan a specific element and its children
     */
    scanElement(element, source) {
        if (!element) return;

        // Get text content
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    const text = node.textContent.trim();
                    if (text && this.isTranslatable(text)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );

        let node;
        while (node = walker.nextNode()) {
            this.addText(node.textContent.trim(), source, node.parentElement);
        }

        // Check attributes
        const elements = element.querySelectorAll ? element.querySelectorAll('*') : [];
        elements.forEach(el => {
            this.textAttributes.forEach(attr => {
                const value = el.getAttribute(attr);
                if (value && this.isTranslatable(value)) {
                    this.addText(value, `${source} - ${attr}`, el);
                }
            });
        });
    }

    /**
     * Check if text should be translated
     */
    isTranslatable(text) {
        // Too short or too long
        if (text.length < 2 || text.length > 200) return false;

        // Check ignore patterns
        for (const pattern of this.ignorePatterns) {
            if (pattern.test(text)) return false;
        }

        // Must contain at least one letter
        if (!/[a-zA-Z]/.test(text)) return false;

        // Check if already detected
        if (this.ignoredTexts.has(text)) return false;

        return true;
    }

    /**
     * Add detected text
     */
    addText(text, source, element) {
        text = text.trim();
        if (!text) return;

        if (!this.detectedTexts.has(text)) {
            this.detectedTexts.set(text, {
                sources: [],
                elements: [],
                firstSeen: Date.now()
            });
        }

        const entry = this.detectedTexts.get(text);
        if (!entry.sources.includes(source)) {
            entry.sources.push(source);
        }
        if (element && !entry.elements.includes(element)) {
            entry.elements.push(element);
        }
    }

    /**
     * Get all detected texts
     */
    getDetectedTexts() {
        return Array.from(this.detectedTexts.entries())
            .map(([text, data]) => ({
                text,
                sources: data.sources,
                elementCount: data.elements.length,
                firstSeen: data.firstSeen
            }))
            .sort((a, b) => a.text.localeCompare(b.text));
    }

    /**
     * Generate report of detected texts
     */
    generateReport() {
        const texts = this.getDetectedTexts();
        const report = {
            timestamp: new Date().toISOString(),
            totalTexts: texts.length,
            bySource: {},
            texts: texts
        };

        // Group by source
        texts.forEach(item => {
            item.sources.forEach(source => {
                if (!report.bySource[source]) {
                    report.bySource[source] = 0;
                }
                report.bySource[source]++;
            });
        });

        console.log('📊 UI Text Detection Report:');
        console.log(`Total unique texts found: ${report.totalTexts}`);
        console.log('By source:', report.bySource);

        return report;
    }

    /**
     * Export detected texts for translation
     */
    exportForTranslation() {
        const texts = this.getDetectedTexts();
        const exportData = {};

        texts.forEach(item => {
            // Generate key from text
            const key = item.text
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '_')
                .substring(0, 50);

            exportData[key] = {
                en: item.text,
                de: `[NEEDS_TRANSLATION] ${item.text}`,
                sources: item.sources
            };
        });

        return exportData;
    }

    /**
     * Stop detection
     */
    stop() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.isRunning = false;
        console.log('🛑 UI Text Detector stopped');
    }

    /**
     * Run complete detection and return results
     */
    static async detectAll() {
        const detector = new UITextDetector();
        detector.start();

        // Wait for dynamic content to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Trigger some UI interactions to reveal hidden text
        document.querySelectorAll('.accordion-button').forEach(btn => {
            btn.click();
            setTimeout(() => btn.click(), 100);
        });

        // Wait for any animations
        await new Promise(resolve => setTimeout(resolve, 500));

        const report = detector.generateReport();
        detector.stop();

        return report;
    }
}

// Auto-detect when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.uiTextDetector = new UITextDetector();
    });
} else {
    window.uiTextDetector = new UITextDetector();
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UITextDetector;
}