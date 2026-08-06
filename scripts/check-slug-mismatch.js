const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
(async () => {
  const post = await p.blogPost.findUnique({
    where: { slug: '33-editable-worksheet-generators-elementary-teachers' },
    select: { id: true, slug: true, translations: true }
  });
  if (!post) { console.log('NOT FOUND'); return; }
  const t = post.translations;
  console.log('Primary slug:', post.slug);
  console.log('en.slug:', t.en?.slug);
  console.log('en.title:', t.en?.title?.substring(0, 80));
  console.log();
  const locales = ['de','fr','es','pt','it','nl','sv','da','no','fi'];
  for (const loc of locales) {
    if (t[loc]?.slug) console.log(loc + '.slug:', t[loc].slug.substring(0, 80));
  }
  await p.$disconnect();
})();
