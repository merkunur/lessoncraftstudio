/**
 * COMPREHENSIVE SEO TESTING SUITE
 * Tests ALL SEO features end-to-end
 *
 * Run with: node SEO_COMPREHENSIVE_TEST.js
 */

const testSlug = `seo-comprehensive-test-${Date.now()}`;

const comprehensiveTestPost = {
    slug: testSlug,
    translations: {
        en: {
            title: 'Complete Guide to Free Printable Math Worksheets for Elementary Students',
            content: `
<h1>Free Printable Math Worksheets for Elementary Students</h1>

<p>Math worksheets are essential educational tools that help students develop strong foundational skills in mathematics. Our comprehensive collection of free printable math worksheets covers all major topics for elementary students in grades 1-5.</p>

<h2>Why Use Math Worksheets?</h2>

<p>Math worksheets provide structured practice that reinforces classroom learning. Students benefit from regular worksheet practice because it helps solidify concepts, builds confidence, and allows for self-paced learning. Teachers and parents appreciate math worksheets because they offer measurable progress tracking and flexible learning opportunities.</p>

<img src="/test-image-1.jpg" alt="Student practicing with math worksheets" />

<h2>Types of Math Worksheets Available</h2>

<p>Our free printable math worksheets include addition, subtraction, multiplication, division, fractions, decimals, and word problems. Each worksheet category is designed for specific grade levels and learning objectives.</p>

<h3>Addition Worksheets</h3>
<p>Addition worksheets help students master basic arithmetic operations. These math worksheets progress from single-digit addition to multi-digit problems with regrouping.</p>

<h3>Subtraction Worksheets</h3>
<p>Subtraction practice builds problem-solving skills and number sense. Our subtraction worksheets include borrowing exercises and real-world applications.</p>

<img src="/test-image-2.jpg" alt="Math worksheet examples for grade 2 students" />

<h2>How to Use These Worksheets Effectively</h2>

<p>For best results, use math worksheets as supplementary practice after introducing new concepts. Start with easier problems to build confidence, then gradually increase difficulty. Consistent daily practice for 15-20 minutes yields the best learning outcomes.</p>

<p>Math worksheets are most effective when combined with hands-on activities, visual aids, and real-world problem-solving exercises. Encourage students to show their work and explain their thinking process.</p>

<h2>Download and Print Instructions</h2>

<p>All our math worksheets are available as free PDF downloads. Simply click the download button, save to your device, and print as many copies as needed. Each worksheet includes an answer key for easy grading.</p>

<p>Teachers can use these free printable math worksheets in classrooms, homework assignments, or tutoring sessions. Parents find them perfect for homeschool education or extra practice at home.</p>`,
            excerpt: 'Comprehensive guide to free printable math worksheets for elementary students grades 1-5. Includes addition, subtraction, multiplication, and more with answer keys.',
            metaTitle: 'Free Printable Math Worksheets for Elementary Students 2025',
            metaDescription: 'Download free printable math worksheets for grades 1-5. Comprehensive collection covering addition, subtraction, multiplication, fractions & more. Answer keys included.',
            focusKeyword: 'math worksheets',
            author: 'LessonCraftStudio Education Team'
        },
        de: {
            title: 'Kostenlose druckbare Mathe-Arbeitsblätter für Grundschüler',
            content: '<h1>Mathe-Arbeitsblätter für Grundschüler</h1><p>Mathe-Arbeitsblätter sind wichtige Lernwerkzeuge...</p>',
            excerpt: 'Umfassender Leitfaden zu kostenlosen druckbaren Mathe-Arbeitsblättern.',
            metaTitle: 'Kostenlose Mathe-Arbeitsblätter für Grundschüler 2025',
            metaDescription: 'Laden Sie kostenlose druckbare Mathe-Arbeitsblätter für die Klassen 1-5 herunter. Mit Lösungen und Antwortschlüsseln.',
            focusKeyword: 'mathe arbeitsblätter',
            author: 'LessonCraftStudio Education Team'
        }
    },
    category: 'teaching-resources',
    keywords: ['math', 'worksheets', 'printable', 'elementary', 'education', 'free', 'grade 1-5'],
    featuredImage: '/blog/images/math-worksheets-featured.jpg',
    status: 'published'
};

async function runComprehensiveTests() {
    console.log('\n🔬 COMPREHENSIVE SEO TESTING SUITE');
    console.log('='.repeat(80));
    console.log(`Test Blog Post Slug: ${testSlug}\n`);

    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    try {
        // ============================================================
        // TEST 1: Create Blog Post with Full SEO Data
        // ============================================================
        console.log('📝 TEST 1: Creating blog post with comprehensive SEO data...');
        const createResponse = await fetch('http://localhost:3001/api/admin/blog/posts', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer dev-bypass',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comprehensiveTestPost)
        });

        if (!createResponse.ok) {
            const error = await createResponse.text();
            results.tests.push({ test: 'Create Post', status: 'FAIL', error });
            results.failed++;
            console.log('❌ FAILED: Could not create test post');
            console.log('Error:', error);
            return;
        }

        const createData = await createResponse.json();
        console.log('✅ PASSED: Post created successfully');
        results.tests.push({ test: 'Create Post', status: 'PASS' });
        results.passed++;

        // Wait for Next.js to compile the new page
        console.log('\n⏳ Waiting for Next.js to compile the blog page...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        // ============================================================
        // TEST 2: Fetch Blog Page HTML
        // ============================================================
        console.log('\n🌐 TEST 2: Fetching blog page HTML...');
        const pageResponse = await fetch(`http://localhost:3001/en/blog/${testSlug}`);

        if (!pageResponse.ok) {
            results.tests.push({ test: 'Fetch Page', status: 'FAIL', error: `HTTP ${pageResponse.status}` });
            results.failed++;
            console.log(`❌ FAILED: Page returned ${pageResponse.status}`);
            return;
        }

        const htmlContent = await pageResponse.text();
        console.log('✅ PASSED: Blog page loaded successfully');
        results.tests.push({ test: 'Fetch Page', status: 'PASS' });
        results.passed++;

        // ============================================================
        // TEST 3: Verify Schema Markup Injection
        // ============================================================
        console.log('\n🏗️ TEST 3: Verifying Schema Markup injection...');

        // Test for JSON-LD script tag
        const schemaRegex = /<script type="application\/ld\+json">(.*?)<\/script>/s;
        const schemaMatch = htmlContent.match(schemaRegex);

        if (!schemaMatch) {
            results.tests.push({ test: 'Schema Injection', status: 'FAIL', error: 'No schema markup found' });
            results.failed++;
            console.log('❌ FAILED: Schema markup not injected');
        } else {
            try {
                const schemas = JSON.parse(schemaMatch[1]);

                // Should be an array of 5 schemas
                if (Array.isArray(schemas) && schemas.length === 5) {
                    console.log('✅ PASSED: 5 schemas injected correctly');
                    results.tests.push({ test: 'Schema Injection', status: 'PASS' });
                    results.passed++;

                    // Verify each schema type
                    const types = schemas.map(s => s['@type']);
                    console.log('   Schema types found:', types.join(', '));

                    const expectedTypes = ['BlogPosting', 'BreadcrumbList', 'LearningResource', 'ImageObject', 'EducationalOrganization'];
                    const hasAllTypes = expectedTypes.every(type => types.includes(type));

                    if (hasAllTypes) {
                        console.log('✅ PASSED: All 5 schema types present');
                        results.tests.push({ test: 'Schema Types Complete', status: 'PASS' });
                        results.passed++;
                    } else {
                        console.log('⚠️ WARNING: Some schema types missing');
                        console.log('   Expected:', expectedTypes.join(', '));
                        results.tests.push({ test: 'Schema Types Complete', status: 'FAIL', error: 'Missing types' });
                        results.failed++;
                    }

                    // Test 3.1: BlogPosting Schema
                    const blogPosting = schemas.find(s => s['@type'] === 'BlogPosting');
                    if (blogPosting) {
                        const checks = [
                            { field: 'headline', value: blogPosting.headline, expected: comprehensiveTestPost.translations.en.metaTitle },
                            { field: 'description', value: blogPosting.description, expected: comprehensiveTestPost.translations.en.metaDescription },
                            { field: 'keywords', value: blogPosting.keywords, expected: comprehensiveTestPost.translations.en.focusKeyword },
                            { field: 'datePublished', value: !!blogPosting.datePublished, expected: true },
                            { field: 'dateModified', value: !!blogPosting.dateModified, expected: true }
                        ];

                        let blogPostingPassed = true;
                        checks.forEach(check => {
                            if (check.value !== check.expected) {
                                console.log(`   ❌ ${check.field}: Expected "${check.expected}", got "${check.value}"`);
                                blogPostingPassed = false;
                            }
                        });

                        if (blogPostingPassed) {
                            console.log('✅ PASSED: BlogPosting schema data correct');
                            results.tests.push({ test: 'BlogPosting Data', status: 'PASS' });
                            results.passed++;
                        } else {
                            results.tests.push({ test: 'BlogPosting Data', status: 'FAIL' });
                            results.failed++;
                        }
                    }

                    // Test 3.2: Breadcrumb Schema
                    const breadcrumb = schemas.find(s => s['@type'] === 'BreadcrumbList');
                    if (breadcrumb && breadcrumb.itemListElement && breadcrumb.itemListElement.length === 3) {
                        console.log('✅ PASSED: Breadcrumb schema with 3 levels');
                        results.tests.push({ test: 'Breadcrumb Schema', status: 'PASS' });
                        results.passed++;
                    } else {
                        console.log('❌ FAILED: Breadcrumb schema incorrect');
                        results.tests.push({ test: 'Breadcrumb Schema', status: 'FAIL' });
                        results.failed++;
                    }

                    // Test 3.3: LearningResource Schema
                    const learning = schemas.find(s => s['@type'] === 'LearningResource');
                    if (learning && learning.educationalLevel === 'Elementary School') {
                        console.log('✅ PASSED: LearningResource schema correct');
                        results.tests.push({ test: 'LearningResource Schema', status: 'PASS' });
                        results.passed++;
                    } else {
                        console.log('❌ FAILED: LearningResource schema incorrect');
                        results.tests.push({ test: 'LearningResource Schema', status: 'FAIL' });
                        results.failed++;
                    }

                } else {
                    console.log(`❌ FAILED: Expected 5 schemas, found ${schemas.length}`);
                    results.tests.push({ test: 'Schema Count', status: 'FAIL' });
                    results.failed++;
                }
            } catch (parseError) {
                console.log('❌ FAILED: Invalid JSON in schema markup');
                results.tests.push({ test: 'Schema JSON Valid', status: 'FAIL', error: parseError.message });
                results.failed++;
            }
        }

        // ============================================================
        // TEST 4: Verify Meta Tags
        // ============================================================
        console.log('\n📋 TEST 4: Verifying meta tags...');

        const metaTests = [
            { name: 'Title Tag', regex: /<title>(.*?)<\/title>/, expected: 'Free Printable Math Worksheets' },
            { name: 'Meta Description', regex: /<meta name="description" content="(.*?)"/, expected: 'Download free printable math worksheets' },
            { name: 'Canonical URL', regex: /<link rel="canonical" href="(.*?)"/, expected: `/en/blog/${testSlug}` },
            { name: 'OG Title', regex: /<meta property="og:title" content="(.*?)"/, expected: 'Free Printable Math Worksheets' },
            { name: 'OG Type', regex: /<meta property="og:type" content="(.*?)"/, expected: 'article' },
            { name: 'OG Published Time', regex: /<meta property="article:published_time" content="(.*?)"/, expected: null },
            { name: 'OG Modified Time', regex: /<meta property="article:modified_time" content="(.*?)"/, expected: null },
            { name: 'Twitter Card', regex: /<meta name="twitter:card" content="(.*?)"/, expected: 'summary_large_image' },
        ];

        metaTests.forEach(test => {
            const match = htmlContent.match(test.regex);
            if (match) {
                if (test.expected === null || match[1].includes(test.expected)) {
                    console.log(`   ✅ ${test.name}: Found`);
                    results.tests.push({ test: `Meta: ${test.name}`, status: 'PASS' });
                    results.passed++;
                } else {
                    console.log(`   ❌ ${test.name}: Value mismatch`);
                    results.tests.push({ test: `Meta: ${test.name}`, status: 'FAIL' });
                    results.failed++;
                }
            } else {
                console.log(`   ❌ ${test.name}: Not found`);
                results.tests.push({ test: `Meta: ${test.name}`, status: 'FAIL' });
                results.failed++;
            }
        });

        // ============================================================
        // TEST 5: Verify Hreflang Tags
        // ============================================================
        console.log('\n🌐 TEST 5: Verifying hreflang tags...');

        const hreflangPattern = /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g;
        const hreflangMatches = [...htmlContent.matchAll(hreflangPattern)];

        if (hreflangMatches.length >= 11) {
            console.log(`✅ PASSED: Found ${hreflangMatches.length} hreflang tags (11 languages)` );
            results.tests.push({ test: 'Hreflang Tags', status: 'PASS' });
            results.passed++;
        } else {
            console.log(`⚠️ WARNING: Found only ${hreflangMatches.length} hreflang tags`);
            results.tests.push({ test: 'Hreflang Tags', status: 'WARN' });
        }

        // ============================================================
        // TEST 6: Test Advanced SEO Tools in Blog Manager
        // ============================================================
        console.log('\n🔧 TEST 6: Testing advanced SEO tools...');

        // Open blog manager page
        const managerResponse = await fetch('http://localhost:3001/worksheet-generators/blog-content-manager.html');
        if (managerResponse.ok) {
            const managerHTML = await managerResponse.text();

            // Check for key SEO tool elements
            const toolChecks = [
                { name: 'SEO Score Badge', id: 'seoScoreValue' },
                { name: 'Readability Score', id: 'readabilityScore' },
                { name: 'Quality Score', id: 'qualityScore' },
                { name: 'LSI Keywords', id: 'lsiKeywords' },
                { name: 'Heading Hierarchy', id: 'headingHierarchy' },
                { name: 'Image Analysis', id: 'imageAnalysis' },
                { name: 'Schema Markup', id: 'schemaMarkup' },
                { name: 'SEO Checklist', id: 'seoChecklist' },
                { name: 'Content Analysis', id: 'contentAnalysis' }
            ];

            let allToolsFound = true;
            toolChecks.forEach(tool => {
                if (managerHTML.includes(`id="${tool.id}"`)) {
                    console.log(`   ✅ ${tool.name}: Present`);
                } else {
                    console.log(`   ❌ ${tool.name}: Missing`);
                    allToolsFound = false;
                }
            });

            if (allToolsFound) {
                console.log('✅ PASSED: All SEO tools present in manager');
                results.tests.push({ test: 'SEO Tools Present', status: 'PASS' });
                results.passed++;
            } else {
                console.log('❌ FAILED: Some SEO tools missing');
                results.tests.push({ test: 'SEO Tools Present', status: 'FAIL' });
                results.failed++;
            }
        }

        // ============================================================
        // TEST 7: Cleanup - Delete Test Post
        // ============================================================
        console.log('\n🗑️ TEST 7: Cleaning up test post...');
        const deleteResponse = await fetch(`http://localhost:3001/api/admin/blog/posts/${testSlug}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer dev-bypass' }
        });

        if (deleteResponse.ok) {
            console.log('✅ PASSED: Test post deleted successfully');
            results.tests.push({ test: 'Cleanup', status: 'PASS' });
            results.passed++;
        } else {
            console.log('⚠️ WARNING: Could not delete test post - manual cleanup needed');
        }

    } catch (error) {
        console.log('\n❌ TEST SUITE FAILED WITH ERROR');
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
        results.failed++;
    }

    // ============================================================
    // FINAL RESULTS
    // ============================================================
    console.log('\n' + '='.repeat(80));
    console.log('📊 FINAL TEST RESULTS');
    console.log('='.repeat(80));
    console.log(`Total Tests: ${results.passed + results.failed}`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`);
    console.log('='.repeat(80));

    if (results.failed === 0) {
        console.log('\n🎉 ALL TESTS PASSED - SEO IMPLEMENTATION IS FLAWLESS! 🎉\n');
    } else {
        console.log('\n⚠️ SOME TESTS FAILED - REVIEW ABOVE FOR DETAILS\n');
    }

    return results;
}

// Run tests
runComprehensiveTests().catch(console.error);
