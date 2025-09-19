// Verify all German translations are present

async function verifyGermanTranslations() {
    console.log('\n🔍 Verifying German Translations...\n');
    
    try {
        const response = await fetch('http://localhost:3000/api/homepage/content?raw=true');
        const content = await response.json();
        
        let totalFields = 0;
        let germanFields = 0;
        let missingTranslations = [];
        
        // Check function for nested objects
        function checkTranslations(obj, path = '') {
            if (!obj) return;
            
            for (const key in obj) {
                const currentPath = path ? `${path}.${key}` : key;
                
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    // Check if this is a translation object (has language keys)
                    if (obj[key].en !== undefined) {
                        totalFields++;
                        if (obj[key].de) {
                            germanFields++;
                            console.log(`✅ ${currentPath}: "${obj[key].de}"`);
                        } else {
                            missingTranslations.push(`${currentPath} (EN: "${obj[key].en}")`);
                            console.log(`❌ ${currentPath}: MISSING (EN: "${obj[key].en}")`);
                        }
                    } else if (Array.isArray(obj[key])) {
                        // Handle arrays
                        obj[key].forEach((item, index) => {
                            if (typeof item === 'object') {
                                checkTranslations(item, `${currentPath}[${index}]`);
                            }
                        });
                    } else {
                        // Recurse into nested objects
                        checkTranslations(obj[key], currentPath);
                    }
                }
            }
        }
        
        // Check all sections
        console.log('=== NAVIGATION ===' );
        checkTranslations(content.navigation, 'navigation');
        
        console.log('\n=== HERO ===' );
        checkTranslations(content.hero, 'hero');
        
        console.log('\n=== FEATURES SECTION ===' );
        checkTranslations(content.featuresSection, 'featuresSection');
        
        console.log('\n=== FEATURES ===' );
        checkTranslations(content.features, 'features');
        
        console.log('\n=== SAMPLES SECTION ===' );
        checkTranslations(content.samplesSection, 'samplesSection');
        
        console.log('\n=== SAMPLES ===' );
        checkTranslations(content.samples, 'samples');
        
        console.log('\n=== PRICING SECTION ===' );
        checkTranslations(content.pricingSection, 'pricingSection');
        
        console.log('\n=== PRICING TIERS ===' );
        checkTranslations(content.pricing, 'pricing');
        
        console.log('\n=== FOOTER ===' );
        checkTranslations(content.footer, 'footer');
        
        console.log('\n=== COMMON UI ===' );
        checkTranslations(content.commonUI, 'commonUI');
        
        console.log('\n=== SEO ===' );
        checkTranslations(content.seo, 'seo');
        
        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 TRANSLATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total translatable fields: ${totalFields}`);
        console.log(`Fields with German translation: ${germanFields}`);
        console.log(`Completion rate: ${Math.round(germanFields/totalFields * 100)}%`);
        
        if (missingTranslations.length > 0) {
            console.log(`\n⚠️  Missing ${missingTranslations.length} German translations:`);
            missingTranslations.forEach(field => {
                console.log(`  - ${field}`);
            });
        } else {
            console.log('\n🎉 ALL GERMAN TRANSLATIONS ARE COMPLETE!');
        }
        
        // Test actual API response for German locale
        console.log('\n' + '='.repeat(50));
        console.log('🇩🇪 Testing German API Response...');
        console.log('='.repeat(50));
        
        const germanResponse = await fetch('http://localhost:3000/api/homepage/content?locale=de');
        const germanContent = await germanResponse.json();
        
        console.log('Hero Title (DE):', germanContent.content?.hero?.title);
        console.log('First Feature (DE):', germanContent.content?.features?.items?.[0]?.title);
        console.log('Footer Company (DE):', germanContent.content?.footer?.companyName);
        
        console.log('\n🌐 Visit http://localhost:3000/de to see the German homepage');
        console.log('📝 Visit http://localhost:3000/homepage-content-manager-v3.html to edit');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run verification
verifyGermanTranslations();