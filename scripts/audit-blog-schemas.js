/**
 * Audit blog schema templates for Google Rich Results compliance.
 * Checks: BlogPosting, BreadcrumbList, LearningResource, ImageObject, Organization, FAQ/HowTo
 */
const fs = require('fs');
const path = require('path');

const issues = [];
let checks = 0;
let passed = 0;

function check(condition, severity, msg) {
  checks++;
  if (condition) { passed++; } else { issues.push({ severity, msg }); }
}

// Read source files
const schemaFile = path.join(__dirname, '..', 'frontend', 'lib', 'schema-generator.ts');
const analyzerFile = path.join(__dirname, '..', 'frontend', 'lib', 'content-analyzer.ts');
const schemaSource = fs.readFileSync(schemaFile, 'utf8');
const analyzerSource = fs.readFileSync(analyzerFile, 'utf8');

// Extract just the blog schema function (generateBlogSchemas)
const blogFnMatch = schemaSource.match(/export function generateBlogSchemas[\s\S]*?^}/m);
const blogFn = blogFnMatch ? blogFnMatch[0] : '';

console.log('\n=== BLOG SCHEMA AUDIT ===\n');

// 1. BlogPosting
console.log('Checking BlogPosting schema...');
check(blogFn.includes('"@type": "BlogPosting"'), 'CRITICAL', 'BlogPosting: Missing @type');
check(blogFn.includes('"@id":'), 'MEDIUM', 'BlogPosting: Missing @id');
check(blogFn.includes('"headline"'), 'CRITICAL', 'BlogPosting: Missing headline');
check(blogFn.includes('post.createdAt.toISOString()'), 'HIGH', 'BlogPosting: datePublished not from database');
check(blogFn.includes('post.updatedAt.toISOString()'), 'HIGH', 'BlogPosting: dateModified not from database');
check(blogFn.includes('"publisher"'), 'HIGH', 'BlogPosting: Missing publisher');
check(blogFn.includes('"author"'), 'HIGH', 'BlogPosting: Missing author');
check(blogFn.includes('"mainEntityOfPage"'), 'MEDIUM', 'BlogPosting: Missing mainEntityOfPage');
check(blogFn.includes('"isPartOf"'), 'LOW', 'BlogPosting: Missing isPartOf Blog reference');
check(blogFn.includes('"inLanguage"'), 'HIGH', 'BlogPosting: Missing inLanguage');

// Publisher should use @id reference (not duplicate Organization)
const publisherLine = blogFn.match(/"publisher":\s*\{[^}]*\}/);
const publisherUsesId = publisherLine && publisherLine[0].includes('@id');
check(publisherUsesId, 'MEDIUM', 'BlogPosting: Publisher should use @id reference to Organization');

// 2. BreadcrumbList
console.log('Checking Blog BreadcrumbList...');
check(blogFn.includes('"@type": "BreadcrumbList"'), 'CRITICAL', 'BreadcrumbList: Missing @type');
check(blogFn.includes('#breadcrumb'), 'MEDIUM', 'BreadcrumbList: Missing @id');
check(blogFn.includes('position": 1'), 'HIGH', 'BreadcrumbList: Missing first position');
// 4-level breadcrumb (Home > Blog > Category > Post)
check(blogFn.includes('position": 3') || blogFn.includes("position: 3"), 'MEDIUM', 'BreadcrumbList: Should have category level');

// 3. LearningResource
console.log('Checking LearningResource schema...');
check(blogFn.includes('"@type": "LearningResource"'), 'CRITICAL', 'LearningResource: Missing @type');
check(blogFn.includes('"educationalUse"'), 'MEDIUM', 'LearningResource: Missing educationalUse');
check(blogFn.includes('"educationalLevel"'), 'MEDIUM', 'LearningResource: Missing educationalLevel');
check(blogFn.includes('"isAccessibleForFree"'), 'LOW', 'LearningResource: Missing isAccessibleForFree');

// Provider should use @id reference
const providerLine = blogFn.match(/"provider":\s*\{[^}]*\}/);
const providerUsesId = providerLine && providerLine[0].includes('@id');
check(providerUsesId, 'MEDIUM', 'LearningResource: Provider should use @id reference');

// 4. ImageObject
console.log('Checking Blog ImageObject...');
check(blogFn.includes('"@type": "ImageObject"'), 'HIGH', 'ImageObject: Missing @type');
check(blogFn.includes('#primaryimage'), 'MEDIUM', 'ImageObject: Missing @id');
check(blogFn.includes('"license"'), 'MEDIUM', 'ImageObject: Missing license');
check(blogFn.includes('"creditText"'), 'LOW', 'ImageObject: Missing creditText');

// Creator should use @id reference
const creatorLine = blogFn.match(/"creator":\s*\{[^}]*\}/);
const creatorUsesId = creatorLine && creatorLine[0].includes('@id');
check(creatorUsesId, 'MEDIUM', 'ImageObject: Creator should use @id reference');

// 5. Organization
console.log('Checking Blog Organization schema...');
check(blogFn.includes('"@type": "EducationalOrganization"'), 'HIGH', 'Organization: Missing EducationalOrganization type');
check(blogFn.includes('/#organization'), 'MEDIUM', 'Organization: Missing @id');
check(blogFn.includes('"availableLanguage"'), 'LOW', 'Organization: Missing availableLanguage');
check(blogFn.includes('"sameAs"'), 'LOW', 'Organization: Missing sameAs social links');

// 6. Content Analyzer hreflang consistency
console.log('Checking content-analyzer hreflang...');
const esMxMatch = analyzerSource.includes("es: 'es-MX'");
check(!esMxMatch, 'HIGH', 'content-analyzer: Spanish mapped to es-MX instead of es (inconsistent with rest of site)');
const esPlainMatch = analyzerSource.includes("es: 'es'");
check(esPlainMatch, 'HIGH', 'content-analyzer: Spanish should map to plain es');

// Report
const critical = issues.filter(i => i.severity === 'CRITICAL');
const high = issues.filter(i => i.severity === 'HIGH');
const medium = issues.filter(i => i.severity === 'MEDIUM');
const low = issues.filter(i => i.severity === 'LOW');

console.log(`\n=== RESULTS ===`);
console.log(`Checks: ${checks} total, ${passed} passed, ${issues.length} issues`);
console.log(`Score: ${Math.round(passed / checks * 100)}/100`);

if (critical.length) {
  console.log(`\n--- CRITICAL (${critical.length}) ---`);
  critical.forEach(i => console.log(`  ${i.msg}`));
}
if (high.length) {
  console.log(`\n--- HIGH (${high.length}) ---`);
  high.forEach(i => console.log(`  ${i.msg}`));
}
if (medium.length) {
  console.log(`\n--- MEDIUM (${medium.length}) ---`);
  medium.forEach(i => console.log(`  ${i.msg}`));
}
if (low.length) {
  console.log(`\n--- LOW (${low.length}) ---`);
  low.forEach(i => console.log(`  ${i.msg}`));
}

if (!issues.length) {
  console.log('\nAll blog schema templates pass validation!');
}
