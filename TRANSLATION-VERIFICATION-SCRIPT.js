/**
 * AUTOMATED TRANSLATION VERIFICATION SCRIPT
 * =========================================
 * This script MUST be run BEFORE and AFTER any translation implementation
 * to ensure 100% coverage and proper UI/content language separation
 */

const fs = require('fs');
const path = require('path');

// Configuration
const APP_FILE = process.argv[2] || 'addition.html';
const APP_PATH = path.join(__dirname, 'frontend', 'public', 'worksheet-generators', APP_FILE);
const TRANSLATIONS_PATH = path.join(__dirname, 'frontend', 'public', 'worksheet-generators', 'js', 'translations.js');

console.log('='.repeat(80));
console.log('TRANSLATION VERIFICATION REPORT');
console.log('='.repeat(80));
console.log(`App: ${APP_FILE}`);
console.log(`Date: ${new Date().toISOString()}`);
console.log('='.repeat(80));

// Read files
const appContent = fs.readFileSync(APP_PATH, 'utf8');
const translationsContent = fs.readFileSync(TRANSLATIONS_PATH, 'utf8');

// Load translations
const translations = {};
try {
    eval(translationsContent);
} catch (e) {
    console.error('Failed to load translations:', e.message);
}

const issues = {
    critical: [],
    missing_translations: [],
    untranslated_elements: [],
    hardcoded_strings: [],
    missing_keys: {}
};

// ============================================
// 1. CHECK FOR UI/CONTENT LANGUAGE SEPARATION
// ============================================
console.log('\n1. LANGUAGE SELECTOR SEPARATION CHECK');
console.log('-'.repeat(40));

const hasInterfaceLanguageSelect = appContent.includes('interfaceLanguageSelect') || appContent.includes('uiLanguageSelect');
const hasContentLanguageSelect = appContent.includes('contentLanguageSelect') || appContent.includes('worksheetLanguageSelect');
const hasSingleLanguageSelect = appContent.includes('id="languageSelect"');

if (!hasInterfaceLanguageSelect || !hasContentLanguageSelect) {
    if (hasSingleLanguageSelect) {
        issues.critical.push('❌ CRITICAL: Only ONE language selector found! Need separate UI and Content language selectors.');
        console.log('❌ FAILED: Single language selector found');
        console.log('   Required: Separate selectors for UI language and worksheet content language');
    } else {
        issues.critical.push('❌ CRITICAL: No proper language selectors found!');
        console.log('❌ FAILED: No language selectors found');
    }
} else {
    console.log('✅ PASSED: Separate UI and content language selectors found');
}

// ============================================
// 2. CHECK ALL data-translate ATTRIBUTES
// ============================================
console.log('\n2. DATA-TRANSLATE ATTRIBUTE CHECK');
console.log('-'.repeat(40));

const dataTranslateRegex = /data-translate="([^"]+)"/g;
const dataTranslateKeys = new Set();
let match;

while ((match = dataTranslateRegex.exec(appContent)) !== null) {
    dataTranslateKeys.add(match[1]);
}

console.log(`Found ${dataTranslateKeys.size} unique data-translate keys`);

// Check if each key exists in translations for each language
const languages = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const missingByLanguage = {};

dataTranslateKeys.forEach(key => {
    languages.forEach(lang => {
        if (!translations[lang] || !translations[lang][key]) {
            if (!missingByLanguage[lang]) missingByLanguage[lang] = [];
            missingByLanguage[lang].push(key);
        }
    });
});

// Report missing translations
Object.entries(missingByLanguage).forEach(([lang, keys]) => {
    if (keys.length > 0) {
        console.log(`\n   ${lang}: Missing ${keys.length} translations`);
        keys.slice(0, 5).forEach(key => {
            console.log(`      - "${key}"`);
        });
        if (keys.length > 5) {
            console.log(`      ... and ${keys.length - 5} more`);
        }
        issues.missing_keys[lang] = keys;
    }
});

// ============================================
// 3. CHECK FOR HARDCODED ENGLISH STRINGS
// ============================================
console.log('\n3. HARDCODED STRING CHECK');
console.log('-'.repeat(40));

// Common patterns that indicate hardcoded strings
const hardcodedPatterns = [
    /showMessage\(['"`]([A-Z][^'"`]+)['"`]/g,
    /alert\(['"`]([A-Z][^'"`]+)['"`]/g,
    /innerHTML\s*=\s*['"`]([A-Z][^'"`]+)['"`]/g,
    /textContent\s*=\s*['"`]([A-Z][^'"`]+)['"`]/g,
    /placeholder\s*=\s*['"`]([A-Z][^'"`]+)['"`]/g,
    />([A-Z][a-zA-Z\s]{2,})</g  // Text content in HTML
];

const suspiciousStrings = new Set();
hardcodedPatterns.forEach(pattern => {
    const contentCopy = appContent;
    let match;
    while ((match = pattern.exec(contentCopy)) !== null) {
        const text = match[1];
        // Filter out common false positives
        if (!text.match(/^(PDF|JPEG|HTML|CSS|JS|API|URL|RGB|px|pt|em)$/)) {
            suspiciousStrings.add(text);
        }
    }
});

if (suspiciousStrings.size > 0) {
    console.log(`❌ Found ${suspiciousStrings.size} potentially hardcoded strings:`);
    Array.from(suspiciousStrings).slice(0, 10).forEach(str => {
        console.log(`   - "${str}"`);
        issues.hardcoded_strings.push(str);
    });
} else {
    console.log('✅ No obvious hardcoded strings found');
}

// ============================================
// 4. CHECK FOR t() FUNCTION USAGE
// ============================================
console.log('\n4. TRANSLATION FUNCTION USAGE CHECK');
console.log('-'.repeat(40));

const tFunctionCalls = appContent.match(/t\(['"]/g) || [];
console.log(`Found ${tFunctionCalls.length} t() function calls`);

if (tFunctionCalls.length < 30) {
    console.log('⚠️ WARNING: Very few t() calls found. Many dynamic texts may be untranslated.');
    issues.critical.push('Low number of t() function calls detected');
}

// ============================================
// 5. CHECK SPECIFIC KNOWN PROBLEM KEYS
// ============================================
console.log('\n5. KNOWN PROBLEM KEYS CHECK');
console.log('-'.repeat(40));

const knownProblemKeys = [
    'selectBackgroundTheme',
    'selectBorderTheme',
    'settings',
    'chooseFiles',
    'noFileChosen'
];

knownProblemKeys.forEach(key => {
    const inHTML = appContent.includes(`data-translate="${key}"`) || appContent.includes(`t('${key}')`);
    const inTranslations = {};

    ['en', 'de', 'fr'].forEach(lang => {
        inTranslations[lang] = translations[lang] && translations[lang][key];
    });

    if (inHTML) {
        console.log(`\n   "${key}":`);
        console.log(`      In HTML: ✓`);
        console.log(`      In EN: ${inTranslations.en ? '✓' : '✗'}`);
        console.log(`      In DE: ${inTranslations.de ? '✓' : '✗'}`);
        console.log(`      In FR: ${inTranslations.fr ? '✓' : '✗'}`);

        if (!inTranslations.en || !inTranslations.de || !inTranslations.fr) {
            issues.critical.push(`Key "${key}" is used but missing translations`);
        }
    }
});

// ============================================
// 6. CHECK FOR CUSTOM FILE INPUT WRAPPER
// ============================================
console.log('\n6. FILE INPUT WRAPPER CHECK');
console.log('-'.repeat(40));

const hasNativeFileInput = appContent.includes('type="file"');
const hasCustomWrapper = appContent.includes('custom-file-input-wrapper') ||
                         appContent.includes('customFileButton');

if (hasNativeFileInput && !hasCustomWrapper) {
    console.log('❌ FAILED: Native file input found without custom wrapper');
    issues.critical.push('Native file input without custom wrapper - cannot be translated!');
} else if (hasCustomWrapper) {
    console.log('✅ PASSED: Custom file input wrapper found');
} else {
    console.log('ℹ️ No file input found in this app');
}

// ============================================
// FINAL SUMMARY
// ============================================
console.log('\n' + '='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));

const criticalCount = issues.critical.length;
const totalMissingKeys = Object.values(issues.missing_keys).flat().length;

if (criticalCount === 0 && totalMissingKeys === 0) {
    console.log('\n✅✅✅ ALL CHECKS PASSED! ✅✅✅');
    console.log('The translation implementation appears complete.');
} else {
    console.log('\n❌ TRANSLATION IMPLEMENTATION INCOMPLETE ❌\n');

    if (criticalCount > 0) {
        console.log(`CRITICAL ISSUES (${criticalCount}):`);
        issues.critical.forEach(issue => {
            console.log(`  🔴 ${issue}`);
        });
    }

    if (totalMissingKeys > 0) {
        console.log(`\nMISSING TRANSLATIONS: ${totalMissingKeys} keys across languages`);
    }

    console.log('\n📋 ACTION ITEMS:');
    console.log('1. Fix all critical issues first');
    console.log('2. Add missing translation keys to translations.js');
    console.log('3. Implement UI/content language separation if missing');
    console.log('4. Replace hardcoded strings with t() calls');
    console.log('5. Run this script again to verify fixes');
}

console.log('\n' + '='.repeat(80));

// Save report to file
const reportPath = path.join(__dirname, `translation-report-${APP_FILE}-${Date.now()}.json`);
fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2));
console.log(`\n📄 Detailed report saved to: ${reportPath}`);