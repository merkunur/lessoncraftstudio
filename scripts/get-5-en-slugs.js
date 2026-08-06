const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
(async () => {
  const posts = await p.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, translations: true },
    orderBy: { createdAt: 'asc' },
  });
  // Pick 5 spread across the list: first, quarter, middle, three-quarter, last
  const indices = [0, Math.floor(posts.length/4), Math.floor(posts.length/2), Math.floor(3*posts.length/4), posts.length-1];
  for (const i of indices) {
    const post = posts[i];
    const enSlug = post.translations.en?.slug || post.slug;
    console.log(enSlug);
  }
  await p.$disconnect();
})();
