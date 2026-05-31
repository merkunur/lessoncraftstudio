import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TOPIC_ENABLED_LOCALES,
  TopicEnabledLocale,
} from "@/config/topic-locales";
import { listAllActivities } from "@/lib/activities";
import BreadcrumbTrail from "@/components/breadcrumbs/BreadcrumbTrail";
import { CANONICAL_HOST, canonicalUrl, localePath } from "@/lib/seo/url";
import { getHreflangCode } from "@/lib/schema-generator";

/**
 * Activities index landing — /<locale>/activities/
 *
 * Lists every activity row from `mini tools/<engine>-activities.json` for
 * the current locale. Card grid mirrors the /<locale>/tools/ shape: title +
 * Common Core code chip + intro + "Try it" link to the per-activity
 * landing page.
 *
 * Counterpart to:
 *   - /<locale>/tools/  → free-play manipulatives
 *   - /<locale>/activities/  → CC-pinned activities (this file)
 *   - /<locale>/activities/[slug]/  → individual activity landing
 */
export const revalidate = 3600;

const BASE_URL = CANONICAL_HOST;

const LANDING_STRINGS: Record<string, {
  pageTitle: string;
  pageIntro: string;
  tryItLink: string;
  metaTitle: string;
  metaDescription: string;
  gradeLabel: string;
}> = {
  en: {
    pageTitle: "Activities",
    pageIntro: "Common-Core-pinned activities your students complete in the browser. Each one is a short task set built around a single standard.",
    tryItLink: "Try it",
    metaTitle: "Activities",
    metaDescription: "Browser-playable K-3 activities aligned to Common Core standards. Free; no signup.",
    gradeLabel: "Grade",
  },
  de: {
    pageTitle: "Aufgaben",
    pageIntro: "Aufgaben, die an den Lehrplänen ausgerichtet sind und die deine Schüler im Browser bearbeiten. Jede ist eine kurze Aufgabenreihe zu einem einzelnen Lernbereich.",
    tryItLink: "Ausprobieren",
    metaTitle: "Aufgaben",
    metaDescription: "Im Browser spielbare K-3-Aufgaben, ausgerichtet an den Lehrplänen. Kostenlos; ohne Anmeldung.",
    gradeLabel: "Klasse",
  },
  es: {
    pageTitle: "Actividades",
    pageIntro: "Actividades alineadas con el currículo oficial que tus estudiantes completan en el navegador. Cada una es una serie corta de tareas centrada en un objetivo de aprendizaje.",
    tryItLink: "Probar",
    metaTitle: "Actividades",
    metaDescription: "Actividades K-3 jugables en el navegador, alineadas con el currículo oficial. Gratis; sin registro.",
    gradeLabel: "Grado",
  },
  fr: {
    pageTitle: "Activités",
    pageIntro: "Activités conformes aux programmes officiels que tes élèves font dans le navigateur. Chacune est une courte série de tâches autour d'une seule notion.",
    tryItLink: "Essayer",
    metaTitle: "Activités",
    metaDescription: "Activités K-3 jouables dans le navigateur, conformes aux programmes officiels. Gratuit ; sans inscription.",
    gradeLabel: "Niveau",
  },
  it: {
    pageTitle: "Attività",
    pageIntro: "Attività allineate alle Indicazioni nazionali che i tuoi studenti completano nel browser. Ognuna è una breve serie di compiti su un singolo obiettivo.",
    tryItLink: "Prova",
    metaTitle: "Attività",
    metaDescription: "Attività K-3 giocabili nel browser, allineate alle Indicazioni nazionali. Gratis; senza registrazione.",
    gradeLabel: "Classe",
  },
  pt: {
    pageTitle: "Atividades",
    pageIntro: "Atividades alinhadas à BNCC que seus alunos completam no navegador. Cada uma é uma série curta de tarefas em torno de uma única habilidade.",
    tryItLink: "Experimentar",
    metaTitle: "Atividades",
    metaDescription: "Atividades K-3 jogáveis no navegador, alinhadas à BNCC. Grátis; sem cadastro.",
    gradeLabel: "Série",
  },
  nl: {
    pageTitle: "Activiteiten",
    pageIntro: "Activiteiten afgestemd op de kerndoelen die je leerlingen in de browser doen. Elke activiteit is een korte reeks taken rond één leerdoel.",
    tryItLink: "Probeer",
    metaTitle: "Activiteiten",
    metaDescription: "K-3-activiteiten in de browser, afgestemd op de kerndoelen. Gratis; zonder aanmelden.",
    gradeLabel: "Groep",
  },
  sv: {
    pageTitle: "Aktiviteter",
    pageIntro: "Aktiviteter anpassade till Lgr22 som dina elever genomför i webbläsaren. Varje aktivitet är en kort uppgiftsserie kring ett enda mål.",
    tryItLink: "Prova",
    metaTitle: "Aktiviteter",
    metaDescription: "K-3-aktiviteter att spela i webbläsaren, anpassade till Lgr22. Gratis; ingen registrering.",
    gradeLabel: "Årskurs",
  },
  da: {
    pageTitle: "Aktiviteter",
    pageIntro: "Aktiviteter tilpasset Fælles Mål, som dine elever gennemfører i browseren. Hver aktivitet er en kort opgaveserie omkring ét mål.",
    tryItLink: "Prøv",
    metaTitle: "Aktiviteter",
    metaDescription: "K-3-aktiviteter spilbare i browseren, tilpasset Fælles Mål. Gratis; ingen tilmelding.",
    gradeLabel: "Klasse",
  },
  no: {
    pageTitle: "Aktiviteter",
    pageIntro: "Aktiviteter tilpasset LK20 som elevene gjør i nettleseren. Hver aktivitet er en kort oppgaveserie rundt ett mål.",
    tryItLink: "Prøv",
    metaTitle: "Aktiviteter",
    metaDescription: "K-3-aktiviteter spillbare i nettleseren, tilpasset LK20. Gratis; ingen registrering.",
    gradeLabel: "Trinn",
  },
  fi: {
    pageTitle: "Tehtävät",
    pageIntro: "OPS 2014:ään sidotut tehtävät, joita oppilaasi tekevät selaimessa. Jokainen on lyhyt tehtäväsarja yhden tavoitteen ympärille.",
    tryItLink: "Kokeile",
    metaTitle: "Tehtävät",
    metaDescription: "Selaimessa pelattavat K-3-tehtävät, jotka on sidottu OPS 2014:ään. Ilmaiset; ei rekisteröitymistä.",
    gradeLabel: "Luokka",
  },
};

interface PageParams {
  locale: string;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export function generateStaticParams(): PageParams[] {
  return TOPIC_ENABLED_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: PageParams;
}): Metadata {
  if (!isTopicLocale(params.locale)) return {};
  const strings = LANDING_STRINGS[params.locale] ?? LANDING_STRINGS.en;
  const canonical = canonicalUrl(localePath(params.locale, "activities"));
  const alternates: Record<string, string> = {};
  // hreflang KEY must be the hreflang code (pt → pt-BR per CLAUDE.md §6),
  // not the bare locale code. Mirrors homepage/worksheets/about pattern.
  for (const loc of TOPIC_ENABLED_LOCALES) {
    alternates[getHreflangCode(loc)] = canonicalUrl(localePath(loc, "activities"));
  }
  alternates["x-default"] = canonicalUrl(localePath("en", "activities"));
  return {
    title: strings.metaTitle,
    description: strings.metaDescription,
    alternates: { canonical, languages: alternates },
    openGraph: {
      title: strings.metaTitle,
      description: strings.metaDescription,
      url: canonical,
      siteName: "LessonCraftStudio",
      locale: params.locale,
      type: "website",
      images: [
        {
          url: `${CANONICAL_HOST}/og-homepage.png`,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "LessonCraftStudio — K-3 worksheets in 11 languages",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: strings.metaTitle,
      description: strings.metaDescription,
      images: [`${CANONICAL_HOST}/og-homepage.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ActivitiesIndexPage({
  params,
}: {
  params: PageParams;
}) {
  if (!isTopicLocale(params.locale)) notFound();
  const locale = params.locale;
  const strings = LANDING_STRINGS[locale] ?? LANDING_STRINGS.en;

  const all = await listAllActivities();
  // Filter to rows that have a slug+title in this locale.
  const rows = all.filter((r) => r.slug[locale] && r.page_title[locale]);

  return (
    <main className="bg-cream-100 min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6">
      <article className="mx-auto max-w-5xl">
        <BreadcrumbTrail locale={locale} trail={[{ label: strings.pageTitle }]} />
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-teal-800 leading-tight mb-3">
            {strings.pageTitle}
          </h1>
          <p className="text-sm md:text-base text-stone-700 max-w-2xl mx-auto leading-relaxed">
            {strings.pageIntro}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rows.map((row) => {
            const title = row.page_title[locale];
            const intro = row.page_intro[locale];
            const slug = row.slug[locale];
            const href = localePath(locale, "activities", slug);
            return (
              <div
                key={row.id}
                className="bg-cream-50 rounded-3xl shadow-md hover:shadow-lg transition-shadow p-5 md:p-6 flex flex-col"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2 self-start">
                  <span>{strings.gradeLabel} {row.alignment.grade}</span>
                  <span className="text-teal-400">·</span>
                  <span className="font-mono">{row.alignment.code}</span>
                </div>
                <h2 className="font-display font-bold text-xl md:text-2xl text-teal-800 mb-2">
                  {title}
                </h2>
                <p className="text-sm text-stone-700 leading-relaxed mb-5 flex-grow">
                  {intro}
                </p>
                <Link
                  href={href}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors self-start"
                >
                  {strings.tryItLink} <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </article>
    </main>
  );
}
