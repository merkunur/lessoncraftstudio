/**
 * Find the Norwegian content mismatch from the audit.
 */
const audit = require('./blog-language-audit.json');
const posts = audit.posts;

for (const post of posts) {
  const noData = post.locales?.no;
  if (noData && !noData.contentMatch) {
    console.log('Found Norwegian content mismatch:');
    console.log('  Primary slug:', post.primarySlug);
    console.log('  Title:', noData.title);
    console.log('  Slug:', noData.slug);
    console.log('  Content lang:', noData.contentLang, '(' + noData.contentConf + ')');
    console.log('  Content score:', noData.contentScore);
    console.log('  Second candidate:', noData.contentSecond, '(' + noData.contentSecondScore + ')');
    console.log('  Title lang:', noData.titleLang, '(' + noData.titleConf + ')');
  }
}
