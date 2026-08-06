#!/usr/bin/env node
/**
 * verify-part133.js — Verify Part 133 Finnish blog SEO metadata
 * Spot-checks 5 posts from the final batch (96-112).
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/verify-part133.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const sampleSlugs = [
  "complete-how-to-guide-mastering-worksheet-generators-from-setup-to-print",
  "working-memory-accommodations-7-worksheets-with-visual-support",
  "visual-discrimination-activities-frostig-hornes-five-foundational-skills",
  "unique-solvability-validation-the-math-behind-frustration-free-algebra-worksheets",
  "middle-school-transition-preparing-5th-graders-for-independent-learning"
];

async function main() {
  console.log('Verifying Part 133 Finnish blog SEO metadata (5 sample posts)\n');

  let ok = 0;
  let fail = 0;

  for (const slug of sampleSlugs) {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      console.log(`MISSING: ${slug}`);
      fail++;
      continue;
    }

    const fi = post.translations?.fi;
    if (!fi) {
      console.log(`NO FI: ${slug}`);
      fail++;
      continue;
    }

    const t = fi.metaTitle || '';
    const d = fi.metaDescription || '';
    const k = fi.focusKeyword || '';
    const tOk = t.length >= 50 && t.length <= 60;
    const dOk = d.length >= 150 && d.length <= 160;
    const kOk = k.length > 0;

    if (tOk && dOk && kOk) {
      console.log(`OK: ${slug}`);
      console.log(`  title(${t.length}): ${t}`);
      console.log(`  desc(${d.length}): ${d.substring(0, 70)}...`);
      console.log(`  keyword: ${k}`);
      ok++;
    } else {
      console.log(`FAIL: ${slug}`);
      if (!tOk) console.log(`  title(${t.length}): ${t}`);
      if (!dOk) console.log(`  desc(${d.length}): ${d}`);
      if (!kOk) console.log(`  keyword missing`);
      fail++;
    }
  }

  console.log(`\nResult: ${ok} OK, ${fail} FAIL out of ${sampleSlugs.length} samples`);

  // Also count total Finnish blog posts with SEO metadata
  const allPosts = await prisma.blogPost.findMany({
    select: { slug: true, translations: true },
  });

  let withFiSeo = 0;
  for (const p of allPosts) {
    const fi = p.translations?.fi;
    if (fi && fi.metaTitle && fi.metaDescription && fi.focusKeyword) {
      withFiSeo++;
    }
  }

  console.log(`\nTotal blog posts with Finnish SEO metadata: ${withFiSeo}/${allPosts.length}`);
  console.log(withFiSeo >= 112 ? 'ALL 112 Finnish blog posts have SEO metadata!' : `WARNING: Expected 112, got ${withFiSeo}`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
