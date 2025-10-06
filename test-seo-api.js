// SEO API Test Script
const testSlug = `seo-test-${Date.now()}`;

const testPost = {
    slug: testSlug,
    translations: {
        en: {
            title: 'Complete Guide to Math Worksheets for Elementary Students',
            content: '<h1>Math Worksheets Guide</h1><h2>Introduction to Math Worksheets</h2><p>Math worksheets are essential educational tools that help students practice and master mathematical concepts. Our comprehensive collection of math worksheets covers various topics including addition, subtraction, multiplication, and division. These printable math worksheets are designed for elementary students in grades 1-5 and include detailed answer keys for easy grading. Teachers and parents can use these free math worksheets to supplement classroom learning or provide extra practice at home. Each worksheet is carefully crafted to make learning math fun and engaging while building strong foundational skills.</p><h2>Benefits of Using Math Worksheets</h2><p>Regular practice with math worksheets helps students develop problem-solving skills, improve computational fluency, and build confidence in mathematics. Our math worksheets feature colorful designs and age-appropriate content that keeps students motivated and interested in learning.</p>',
            excerpt: 'Comprehensive guide to using math worksheets for elementary education. Includes free printable worksheets with answer keys for grades 1-5.',
            metaTitle: 'Math Worksheets for Elementary Students - Free Printable Guide 2025',
            metaDescription: 'Download free printable math worksheets for grades 1-5. Comprehensive collection with answer keys. Perfect for teachers, parents, and homeschool education.',
            focusKeyword: 'math worksheets',
            author: 'LessonCraftStudio Team'
        },
        de: {
            title: 'Vollständiger Leitfaden zu Mathe-Arbeitsblättern für Grundschüler',
            content: '<h1>Mathe-Arbeitsblätter Leitfaden</h1><h2>Einführung in Mathe-Arbeitsblätter</h2><p>Mathe-Arbeitsblätter sind wichtige Lernwerkzeuge für Schüler. Diese Arbeitsblätter helfen beim Üben mathematischer Konzepte.</p>',
            excerpt: 'Umfassender Leitfaden zur Verwendung von Mathe-Arbeitsblättern.',
            metaTitle: 'Mathe-Arbeitsblätter für Grundschüler - Kostenloser Leitfaden 2025',
            metaDescription: 'Laden Sie kostenlose druckbare Mathe-Arbeitsblätter für die Klassen 1-5 herunter. Umfassende Sammlung mit Lösungsschlüsseln.',
            focusKeyword: 'mathe arbeitsblätter',
            author: 'LessonCraftStudio Team'
        },
        fr: {
            title: 'Guide complet des feuilles de calcul mathématiques pour étudiants',
            content: '<h1>Guide des feuilles de mathématiques</h1><h2>Introduction aux feuilles de mathématiques</h2><p>Les feuilles de mathématiques sont des outils éducatifs essentiels. Ces feuilles aident à pratiquer les concepts mathématiques.</p>',
            excerpt: 'Guide complet sur l\'utilisation des feuilles de calcul mathématiques.',
            metaTitle: 'Feuilles de Mathématiques pour Élèves - Guide Gratuit 2025',
            metaDescription: 'Téléchargez des feuilles de mathématiques imprimables gratuites pour les classes 1-5. Collection complète avec clés de réponses.',
            focusKeyword: 'feuilles de mathématiques',
            author: 'LessonCraftStudio Team'
        }
    },
    category: 'teaching-resources',
    keywords: ['math', 'worksheets', 'elementary', 'education', 'printable', 'free'],
    featuredImage: null,
    status: 'published'
};

async function runTests() {
    console.log('🧪 SEO API TESTING SUITE\n' + '='.repeat(50));

    try {
        // Test 1: Create Post with SEO Fields
        console.log('\n📝 Test 1: Creating blog post with SEO fields...');
        const createResponse = await fetch('http://localhost:3001/api/admin/blog/posts', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer dev-bypass',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testPost)
        });

        if (!createResponse.ok) {
            const error = await createResponse.text();
            console.log('❌ FAILED: Could not create post');
            console.log('Error:', error);
            return;
        }

        const createData = await createResponse.json();
        console.log('✅ PASSED: Post created successfully');
        console.log(`   Slug: ${createData.post.slug}`);

        // Test 2: Retrieve Post and Verify SEO Fields (English)
        console.log('\n🔍 Test 2: Verifying English SEO fields...');
        const getResponse = await fetch(`http://localhost:3001/api/admin/blog/posts/${testSlug}`, {
            headers: { 'Authorization': 'Bearer dev-bypass' }
        });

        if (!getResponse.ok) {
            console.log('❌ FAILED: Could not retrieve post');
            return;
        }

        const getData = await getResponse.json();
        const post = getData.post;
        const enTranslation = post.translations.en;

        // Verify each SEO field
        const tests = [
            { field: 'metaTitle', expected: testPost.translations.en.metaTitle, actual: enTranslation.metaTitle },
            { field: 'metaDescription', expected: testPost.translations.en.metaDescription, actual: enTranslation.metaDescription },
            { field: 'focusKeyword', expected: testPost.translations.en.focusKeyword, actual: enTranslation.focusKeyword }
        ];

        let allPassed = true;
        tests.forEach(test => {
            if (test.actual === test.expected) {
                console.log(`✅ PASSED: ${test.field} persisted correctly`);
            } else {
                console.log(`❌ FAILED: ${test.field} mismatch`);
                console.log(`   Expected: ${test.expected}`);
                console.log(`   Actual: ${test.actual}`);
                allPassed = false;
            }
        });

        // Test 3: Verify German SEO Fields
        console.log('\n🔍 Test 3: Verifying German SEO fields...');
        const deTranslation = post.translations.de;

        if (deTranslation && deTranslation.metaTitle && deTranslation.focusKeyword) {
            console.log('✅ PASSED: German SEO fields exist');
            console.log(`   Meta Title: ${deTranslation.metaTitle}`);
            console.log(`   Focus Keyword: ${deTranslation.focusKeyword}`);
        } else {
            console.log('❌ FAILED: German SEO fields missing or incomplete');
            allPassed = false;
        }

        // Test 4: Verify French SEO Fields
        console.log('\n🔍 Test 4: Verifying French SEO fields...');
        const frTranslation = post.translations.fr;

        if (frTranslation && frTranslation.metaTitle && frTranslation.focusKeyword) {
            console.log('✅ PASSED: French SEO fields exist');
            console.log(`   Meta Title: ${frTranslation.metaTitle}`);
            console.log(`   Focus Keyword: ${frTranslation.focusKeyword}`);
        } else {
            console.log('❌ FAILED: French SEO fields missing or incomplete');
            allPassed = false;
        }

        // Test 5: Calculate SEO Score
        console.log('\n📊 Test 5: Calculating SEO score...');
        const seoMetrics = {
            titleLength: enTranslation.title.length,
            metaTitleLength: enTranslation.metaTitle.length,
            metaDescLength: enTranslation.metaDescription.length,
            keywordInTitle: enTranslation.title.toLowerCase().includes(enTranslation.focusKeyword.toLowerCase()),
            keywordInMetaDesc: enTranslation.metaDescription.toLowerCase().includes(enTranslation.focusKeyword.toLowerCase()),
            keywordInContent: enTranslation.content.toLowerCase().includes(enTranslation.focusKeyword.toLowerCase())
        };

        console.log(`   Title length: ${seoMetrics.titleLength} chars (optimal: 30-60)`);
        console.log(`   Meta title length: ${seoMetrics.metaTitleLength} chars (optimal: 50-60)`);
        console.log(`   Meta desc length: ${seoMetrics.metaDescLength} chars (optimal: 150-160)`);
        console.log(`   Keyword in title: ${seoMetrics.keywordInTitle ? '✅' : '❌'}`);
        console.log(`   Keyword in meta desc: ${seoMetrics.keywordInMetaDesc ? '✅' : '❌'}`);
        console.log(`   Keyword in content: ${seoMetrics.keywordInContent ? '✅' : '❌'}`);

        // Test 6: Update Post
        console.log('\n✏️ Test 6: Updating post with new SEO data...');
        const updatedPost = {
            ...testPost,
            translations: {
                ...post.translations,
                en: {
                    ...enTranslation,
                    metaTitle: 'Updated Math Worksheets Guide - Best Free Printables 2025',
                    focusKeyword: 'free math worksheets'
                }
            }
        };

        const updateResponse = await fetch(`http://localhost:3001/api/admin/blog/posts/${testSlug}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer dev-bypass',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        });

        if (updateResponse.ok) {
            const updateData = await updateResponse.json();
            console.log('✅ PASSED: Post updated successfully');
        } else {
            console.log('❌ FAILED: Could not update post');
            allPassed = false;
        }

        // Test 7: Cleanup - Delete Test Post
        console.log('\n🗑️ Test 7: Cleaning up test post...');
        const deleteResponse = await fetch(`http://localhost:3001/api/admin/blog/posts/${testSlug}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer dev-bypass' }
        });

        if (deleteResponse.ok) {
            console.log('✅ PASSED: Test post deleted successfully');
        } else {
            console.log('⚠️ WARNING: Could not delete test post - manual cleanup may be needed');
        }

        // Final Summary
        console.log('\n' + '='.repeat(50));
        console.log(allPassed ? '✅ ALL TESTS PASSED' : '⚠️ SOME TESTS FAILED');
        console.log('='.repeat(50));

    } catch (error) {
        console.log('\n❌ TEST SUITE FAILED');
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
    }
}

// Run the tests
runTests();
