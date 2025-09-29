/**
 * FORCE TRANSLATIONS - A solution that ACTUALLY works
 * This will translate everything, no matter what
 */

(function() {
    'use strict';

    console.log('[FORCE-TRANSLATIONS] Initializing...');

    // Wait for everything to load
    function waitForLoad(callback) {
        if (document.readyState === 'complete' &&
            typeof translations !== 'undefined' &&
            document.body) {
            callback();
        } else {
            setTimeout(() => waitForLoad(callback), 100);
        }
    }

    function forceTranslateEverything() {
        const locale = window.currentLocale ||
                      new URLSearchParams(window.location.search).get('locale') ||
                      'en';

        console.log(`[FORCE-TRANSLATIONS] Translating to: ${locale}`);

        if (!translations || !translations[locale]) {
            console.error('[FORCE-TRANSLATIONS] No translations for locale:', locale);
            return;
        }

        const trans = translations[locale];
        let count = 0;

        // Method 1: Find ALL elements with data-translate
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (trans[key]) {
                if (el.tagName === 'INPUT') {
                    if (el.type === 'button' || el.type === 'submit') {
                        el.value = trans[key];
                    } else {
                        el.placeholder = trans[key];
                    }
                } else if (el.tagName === 'SELECT') {
                    // Skip select elements
                } else {
                    el.textContent = trans[key];
                }
                count++;
                console.log(`[FORCE-TRANSLATIONS] Translated ${key} -> ${trans[key]}`);
            }
        });

        // Method 2: Find ALL text nodes and translate them
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodesToTranslate = [];
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent.trim();
            if (text && text.length > 1) {
                // Check if this text has a translation
                for (const [key, value] of Object.entries(translations.en || {})) {
                    if (value === text && trans[key] && trans[key] !== text) {
                        textNodesToTranslate.push({
                            node: node,
                            newText: trans[key]
                        });
                        break;
                    }
                }
            }
        }

        // Apply text node translations
        textNodesToTranslate.forEach(item => {
            item.node.textContent = item.newText;
            count++;
            console.log(`[FORCE-TRANSLATIONS] Text node: "${item.node.textContent}" -> "${item.newText}"`);
        });

        // Method 3: Translate specific problematic elements by class/id
        const specificTranslations = {
            // Add any specific selectors that are problematic
        };

        Object.entries(specificTranslations).forEach(([selector, key]) => {
            const el = document.querySelector(selector);
            if (el && trans[key]) {
                el.textContent = trans[key];
                count++;
            }
        });

        console.log(`[FORCE-TRANSLATIONS] Completed: ${count} elements translated`);

        // Method 4: Watch for changes and retranslate
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if it has data-translate
                            if (node.getAttribute && node.getAttribute('data-translate')) {
                                const key = node.getAttribute('data-translate');
                                if (trans[key]) {
                                    node.textContent = trans[key];
                                }
                            }
                            // Check children
                            const children = node.querySelectorAll ? node.querySelectorAll('[data-translate]') : [];
                            children.forEach(child => {
                                const key = child.getAttribute('data-translate');
                                if (trans[key]) {
                                    child.textContent = trans[key];
                                }
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Run immediately and after delays
    waitForLoad(() => {
        forceTranslateEverything();

        // Run again after short delays to catch late-loading content
        setTimeout(forceTranslateEverything, 500);
        setTimeout(forceTranslateEverything, 1000);
        setTimeout(forceTranslateEverything, 2000);

        // Listen for language changes
        document.addEventListener('languageChanged', forceTranslateEverything);

        // Override any existing translation functions to ensure ours runs too
        const originalTranslateAllElements = window.translateAllElements;
        window.translateAllElements = function() {
            if (originalTranslateAllElements) {
                originalTranslateAllElements.apply(this, arguments);
            }
            forceTranslateEverything();
        };

        const originalApplyTranslations = window.applyTranslations;
        window.applyTranslations = function() {
            if (originalApplyTranslations) {
                originalApplyTranslations.apply(this, arguments);
            }
            forceTranslateEverything();
        };
    });

    // Also expose globally for debugging
    window.forceTranslateEverything = forceTranslateEverything;

})();