const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const p = new PrismaClient();

async function run() {
  const slugs = [
    'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8',
    'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
    'advanced-differentiation-managing-multi-level-classrooms',
    '33-editable-worksheet-generators-every-elementary-teacher-needs',
    'getting-started-guide-for-new-teachers-essential-worksheet-systems',
  ];
  for (const s of slugs) {
    const r = await p.blogPost.findUnique({ where: { slug: s } });
    const t = r.translations.fi;
    console.log('---');
    console.log('slug:', s.substring(0, 60));
    console.log('title:', t.metaTitle, '(' + t.metaTitle.length + ')');
    console.log('desc:', t.metaDescription.substring(0, 70) + '...', '(' + t.metaDescription.length + ')');
    console.log('kw:', t.focusKeyword);
  }
  await p.$disconnect();
}
run();
