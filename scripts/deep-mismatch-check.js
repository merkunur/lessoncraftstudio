/**
 * Deep mismatch check: look for slugs that contain language-specific patterns
 * belonging to a DIFFERENT language than the locale they're stored under.
 */
const db = require('./db-slugs-dump.json');
const audit = require('./blog-language-audit.json');

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

// Language-specific word patterns (words/fragments that are very strong indicators)
const langPatterns = {
  de: /\b(arbeitsblatt|arbeitsblaetter|und|fuer|grundschule|klasse|schueler|lernen|foerdern|unterricht|mathematik|lehrkraefte|bei|uebungen|wie|die|der|das|ein|mit|von|zur|zum)\b/,
  fr: /\b(fiches|pedagogiques|pour|les|des|avec|dans|une|generateurs|apprentissage|eleves|activites|classe|comment|ecriture|lapprentissage|lecriture|mathematiques|scolaire)\b/,
  es: /\b(fichas|educativas|para|los|las|del|con|generadores|alumnos|actividades|como|aprendizaje|estrategias|primaria|grado|ninos|trabajo|ensenanza)\b/,
  pt: /\b(atividades|professores|para|geradores|como|aprendizagem|ensino|escola|educacao|criancas|alunos|desenvolvimento|estrategias|trabalho)\b/,
  it: /\b(schede|didattiche|generatori|apprendimento|matematica|attivita|scuola|bambini|insegnanti|educativo|sviluppo|esercizi|classe|valutazione)\b/,
  nl: /\b(werkbladen|generatoren|voor|met|leren|basisschool|kinderen|onderwijs|activiteiten|oefeningen|leerkrachten|ontwikkeling|het|een|van)\b/,
  da: /\b(arbejdsark|generatorer|laerere|elever|undervisning|matematik|skole|aktiviteter|oevelser|udvikling|hvordan|eleverne|klasse|opgaver)\b/,
  sv: /\b(arbetsblad|generatorer|larare|elever|undervisning|matematik|skola|aktiviteter|ovningar|utveckling|laerande|utbildning)\b/,
  no: /\b(oppgaveark|oppgavegeneratorer|laerere|elever|undervisning|matematikk|skole|aktiviteter|ovelser|utvikling|laering|hvordan)\b/,
  fi: /\b(tehtaevae|generaattorit|opettajille|oppilaille|oppimateriaali|matematiikka|koulu|aktiviteetit|harjoitukset|kehitys|oppiminen)\b/,
};

// Also check for slug duplicates across locales within same post
const mismatches = [];

for (const post of db) {
  const auditPost = audit.posts.find(p => p.primarySlug === post.primarySlug);

  // Check each non-English locale
  for (const locale of ALL_LOCALES) {
    if (locale === 'en') continue;

    const slug = post.localeSlugs[locale];
    const enSlug = post.localeSlugs.en;
    if (!slug) continue;

    // Check 1: slug is identical to English slug
    if (slug === enSlug) {
      const title = auditPost?.locales?.[locale]?.title || '';
      const enTitle = auditPost?.locales?.en?.title || '';
      mismatches.push({
        post: post.primarySlug,
        postId: post.id,
        locale,
        issue: 'identical-to-english',
        slug,
        title: title.substring(0, 80),
        titleIsEnglish: title === enTitle
      });
      continue;
    }

    // Check 2: slug is identical to a DIFFERENT locale's slug (not en)
    for (const otherLocale of ALL_LOCALES) {
      if (otherLocale === locale || otherLocale === 'en') continue;
      if (slug === post.localeSlugs[otherLocale]) {
        mismatches.push({
          post: post.primarySlug,
          postId: post.id,
          locale,
          issue: `identical-to-${otherLocale}`,
          slug,
          otherLocale
        });
        break;
      }
    }

    // Check 3: title is identical to English title
    if (auditPost) {
      const title = auditPost.locales?.[locale]?.title;
      const enTitle = auditPost.locales?.en?.title;
      if (title && enTitle && title.trim() === enTitle.trim()) {
        // Already caught by slug check probably, but double-check
        if (slug !== enSlug) {
          mismatches.push({
            post: post.primarySlug,
            postId: post.id,
            locale,
            issue: 'title-identical-to-english-but-slug-differs',
            slug,
            enSlug,
            title: title.substring(0, 80)
          });
        }
      }

      // Check 4: title is identical to a different locale's title
      for (const otherLocale of ALL_LOCALES) {
        if (otherLocale === locale || otherLocale === 'en') continue;
        const otherTitle = auditPost.locales?.[otherLocale]?.title;
        if (title && otherTitle && title.trim() === otherTitle.trim() && title.trim().length > 10) {
          mismatches.push({
            post: post.primarySlug,
            postId: post.id,
            locale,
            issue: `title-identical-to-${otherLocale}`,
            title: title.substring(0, 80),
            otherLocale
          });
        }
      }
    }
  }
}

// Deduplicate
const seen = new Set();
const unique = mismatches.filter(m => {
  const key = `${m.post}:${m.locale}:${m.issue}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log('Total confirmed mismatches:', unique.length);

// Group by issue type
const byIssue = {};
for (const m of unique) {
  const issueType = m.issue.startsWith('identical-to-') ? 'slug-duplicate' :
                    m.issue.startsWith('title-identical-to-') ? 'title-duplicate' : m.issue;
  byIssue[issueType] = byIssue[issueType] || [];
  byIssue[issueType].push(m);
}

for (const [type, items] of Object.entries(byIssue)) {
  console.log(`\n=== ${type} (${items.length}) ===`);
  for (const item of items) {
    console.log(`  ${item.post}`);
    console.log(`    ${item.locale}: ${item.issue}`);
    if (item.slug) console.log(`    slug: ${item.slug}`);
    if (item.title) console.log(`    title: ${item.title}`);
  }
}

// Save for the fix script
const fs = require('fs');
const path = require('path');
fs.writeFileSync(
  path.join(__dirname, 'confirmed-mismatches.json'),
  JSON.stringify(unique, null, 2),
  'utf8'
);
console.log('\nSaved to confirmed-mismatches.json');
