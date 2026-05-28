import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TOPIC_ENABLED_LOCALES,
  TopicEnabledLocale,
} from "@/config/topic-locales";
import { listNonEmptyAxisKeys } from "@/lib/topic-decks";
import { getAxisSlug } from "@/lib/taxonomy";
import topicsTaxonomy from "@/config/topics-taxonomy.json";
import BreadcrumbTrail from "@/components/breadcrumbs/BreadcrumbTrail";
import { CANONICAL_HOST, canonicalUrl, localePath } from "@/lib/seo/url";

/**
 * Topics index landing — /<locale>/topic/
 *
 * Three sections mirroring the three CC §16.5 axes:
 *   - Subjects (exercise-type axis — 30 keys)
 *   - Themes (theme axis — 100 keys; "Show all" toggle past first 24)
 *   - Grade levels (educational-level axis — 5 keys)
 *
 * Each axis-key renders as a chip link to /<locale>/topic/<slug>/. Only
 * axis-keys with ≥1 published deck for the current locale render
 * (substrate-honesty per §16.6.1) — empty-state fallback when all 3
 * axes are empty for the locale.
 */
export const revalidate = 3600;

const BASE_URL = CANONICAL_HOST;

interface PageParams {
  locale: string;
}

interface AxisSchema {
  axes: {
    [axis: string]: {
      [axisKey: string]: {
        slug: Record<string, string>;
        name: Record<string, string>;
      };
    };
  };
}

const taxonomy = topicsTaxonomy as unknown as AxisSchema;

const LANDING_STRINGS: Record<string, {
  pageTitle: string;
  pageIntro: string;
  sectionSubjects: string;
  sectionThemes: string;
  sectionLevels: string;
  showAllThemes: (n: number) => string;
  emptyState: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  en: {
    pageTitle: "Topics",
    pageIntro: "Browse the catalog by subject, theme, or grade level.",
    sectionSubjects: "Subjects",
    sectionThemes: "Themes",
    sectionLevels: "Grade levels",
    showAllThemes: (n) => `Show all ${n} themes`,
    emptyState: "Catalog coming soon — full content rolls out by language.",
    metaTitle: "Topics",
    metaDescription: "Browse K-3 worksheets and activities by subject, theme, or grade level.",
  },
  de: {
    pageTitle: "Themen",
    pageIntro: "Durchsuche den Katalog nach Fach, Thema oder Klassenstufe.",
    sectionSubjects: "Fächer",
    sectionThemes: "Themen",
    sectionLevels: "Klassenstufen",
    showAllThemes: (n) => `Alle ${n} Themen anzeigen`,
    emptyState: "Katalog kommt bald — Inhalte werden nach Sprache ausgerollt.",
    metaTitle: "Themen",
    metaDescription: "K-3-Arbeitsblätter und Aufgaben nach Fach, Thema oder Klassenstufe durchsuchen.",
  },
  es: {
    pageTitle: "Temas",
    pageIntro: "Explora el catálogo por materia, tema o nivel educativo.",
    sectionSubjects: "Materias",
    sectionThemes: "Temas",
    sectionLevels: "Niveles",
    showAllThemes: (n) => `Ver los ${n} temas`,
    emptyState: "Catálogo en camino — el contenido se publica por idioma.",
    metaTitle: "Temas",
    metaDescription: "Explora hojas de trabajo y actividades K-3 por materia, tema o nivel.",
  },
  fr: {
    pageTitle: "Sujets",
    pageIntro: "Parcours le catalogue par matière, thème ou niveau.",
    sectionSubjects: "Matières",
    sectionThemes: "Thèmes",
    sectionLevels: "Niveaux",
    showAllThemes: (n) => `Voir les ${n} thèmes`,
    emptyState: "Catalogue à venir — le contenu se déploie par langue.",
    metaTitle: "Sujets",
    metaDescription: "Parcours les fiches et activités K-3 par matière, thème ou niveau.",
  },
  it: {
    pageTitle: "Argomenti",
    pageIntro: "Sfoglia il catalogo per materia, tema o livello scolastico.",
    sectionSubjects: "Materie",
    sectionThemes: "Temi",
    sectionLevels: "Livelli scolastici",
    showAllThemes: (n) => `Mostra tutti i ${n} temi`,
    emptyState: "Catalogo in arrivo — i contenuti vengono pubblicati per lingua.",
    metaTitle: "Argomenti",
    metaDescription: "Sfoglia schede e attività K-3 per materia, tema o livello.",
  },
  pt: {
    pageTitle: "Tópicos",
    pageIntro: "Navegue pelo catálogo por matéria, tema ou nível.",
    sectionSubjects: "Matérias",
    sectionThemes: "Temas",
    sectionLevels: "Níveis",
    showAllThemes: (n) => `Ver os ${n} temas`,
    emptyState: "Catálogo em breve — o conteúdo é publicado por idioma.",
    metaTitle: "Tópicos",
    metaDescription: "Navegue por fichas e atividades K-3 por matéria, tema ou nível.",
  },
  nl: {
    pageTitle: "Onderwerpen",
    pageIntro: "Doorzoek de catalogus op vak, thema of leerjaar.",
    sectionSubjects: "Vakken",
    sectionThemes: "Thema's",
    sectionLevels: "Leerjaren",
    showAllThemes: (n) => `Alle ${n} thema's tonen`,
    emptyState: "Catalogus komt eraan — inhoud wordt per taal uitgerold.",
    metaTitle: "Onderwerpen",
    metaDescription: "Doorzoek K-3-werkbladen en activiteiten op vak, thema of leerjaar.",
  },
  sv: {
    pageTitle: "Ämnen",
    pageIntro: "Bläddra i katalogen efter ämne, tema eller årskurs.",
    sectionSubjects: "Ämnen",
    sectionThemes: "Teman",
    sectionLevels: "Årskurser",
    showAllThemes: (n) => `Visa alla ${n} teman`,
    emptyState: "Katalog på väg — innehåll publiceras språk för språk.",
    metaTitle: "Ämnen",
    metaDescription: "Bläddra i K-3-arbetsblad och aktiviteter efter ämne, tema eller årskurs.",
  },
  da: {
    pageTitle: "Emner",
    pageIntro: "Gennemse kataloget efter fag, tema eller klassetrin.",
    sectionSubjects: "Fag",
    sectionThemes: "Temaer",
    sectionLevels: "Klassetrin",
    showAllThemes: (n) => `Vis alle ${n} temaer`,
    emptyState: "Katalog på vej — indhold udrulles sprog for sprog.",
    metaTitle: "Emner",
    metaDescription: "Gennemse K-3-opgaveark og aktiviteter efter fag, tema eller klassetrin.",
  },
  no: {
    pageTitle: "Emner",
    pageIntro: "Bla gjennom katalogen etter fag, tema eller trinn.",
    sectionSubjects: "Fag",
    sectionThemes: "Temaer",
    sectionLevels: "Trinn",
    showAllThemes: (n) => `Vis alle ${n} temaer`,
    emptyState: "Katalog kommer — innhold rulles ut språk for språk.",
    metaTitle: "Emner",
    metaDescription: "Bla gjennom K-3-arbeidsark og aktiviteter etter fag, tema eller trinn.",
  },
  fi: {
    pageTitle: "Aiheet",
    pageIntro: "Selaa luetteloa aiheen, teeman tai luokkatason mukaan.",
    sectionSubjects: "Aineet",
    sectionThemes: "Teemat",
    sectionLevels: "Luokkatasot",
    showAllThemes: (n) => `Näytä kaikki ${n} teemaa`,
    emptyState: "Luettelo tulossa — sisältö julkaistaan kielittäin.",
    metaTitle: "Aiheet",
    metaDescription: "Selaa K-3-tehtäväpapereita ja aktiviteetteja aiheen, teeman tai tason mukaan.",
  },
};

const THEME_PAGE_SIZE = 24;

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

function resolveAxisName(axis: string, axisKey: string, locale: string): string {
  const entry = taxonomy.axes[axis]?.[axisKey];
  return entry?.name?.[locale] ?? entry?.name?.en ?? axisKey;
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
  const canonical = canonicalUrl(localePath(params.locale, "topic"));
  const alternates: Record<string, string> = {};
  for (const loc of TOPIC_ENABLED_LOCALES) {
    alternates[loc] = canonicalUrl(localePath(loc, "topic"));
  }
  alternates["x-default"] = canonicalUrl(localePath("en", "topic"));
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
    },
    robots: { index: true, follow: true },
  };
}

function ChipGrid({
  locale,
  axis,
  axisKeys,
}: {
  locale: string;
  axis: "exercise-type" | "theme" | "educational-level";
  axisKeys: string[];
}) {
  if (axisKeys.length === 0) return null;
  // Alphabetize by localized name so the chip grid reads naturally per locale.
  const items = axisKeys
    .map((key) => ({
      key,
      slug: getAxisSlug(axis, key, locale),
      name: resolveAxisName(axis, key, locale),
    }))
    .filter((x) => !!x.slug)
    .sort((a, b) => a.name.localeCompare(b.name, locale));

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <Link
          key={it.key}
          href={`/${locale}/topic/${it.slug}/`}
          className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-50 border border-cream-300 text-sm text-ink-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-800 transition-colors"
        >
          {it.name}
        </Link>
      ))}
    </div>
  );
}

export default async function TopicsIndexPage({
  params,
}: {
  params: PageParams;
}) {
  if (!isTopicLocale(params.locale)) notFound();
  const locale = params.locale;
  const strings = LANDING_STRINGS[locale] ?? LANDING_STRINGS.en;

  // Fetch the non-empty axis-keys per axis for this locale. Each runs a
  // tiny SQL query; cached at ISR layer (revalidate=3600).
  let subjects: string[] = [];
  let themes: string[] = [];
  let levels: string[] = [];
  try {
    [subjects, themes, levels] = await Promise.all([
      listNonEmptyAxisKeys("exercise-type", locale),
      listNonEmptyAxisKeys("theme", locale),
      listNonEmptyAxisKeys("educational-level", locale),
    ]);
  } catch {
    // DB unavailable: arrays stay empty; we'll show the empty-state below.
  }

  const allEmpty = subjects.length === 0 && themes.length === 0 && levels.length === 0;

  // Theme axis splits at THEME_PAGE_SIZE — first chunk visible, the rest
  // behind a native <details>/<summary> toggle (no JS island needed).
  const themesAlpha = themes
    .map((key) => ({
      key,
      slug: getAxisSlug("theme", key, locale),
      name: resolveAxisName("theme", key, locale),
    }))
    .filter((x) => !!x.slug)
    .sort((a, b) => a.name.localeCompare(b.name, locale));
  const themesAbove = themesAlpha.slice(0, THEME_PAGE_SIZE);
  const themesBelow = themesAlpha.slice(THEME_PAGE_SIZE);
  const themesAboveKeys = themesAbove.map((t) => t.key);

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

        {allEmpty ? (
          <div className="bg-cream-50 rounded-3xl p-8 md:p-12 text-center text-stone-700">
            <p className="text-base md:text-lg">{strings.emptyState}</p>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {subjects.length > 0 && (
              <section>
                <h2 className="font-display font-semibold text-xl md:text-2xl text-teal-800 mb-4">
                  {strings.sectionSubjects}
                </h2>
                <ChipGrid locale={locale} axis="exercise-type" axisKeys={subjects} />
              </section>
            )}

            {themesAlpha.length > 0 && (
              <section>
                <h2 className="font-display font-semibold text-xl md:text-2xl text-teal-800 mb-4">
                  {strings.sectionThemes}
                </h2>
                <ChipGrid locale={locale} axis="theme" axisKeys={themesAboveKeys} />
                {themesBelow.length > 0 && (
                  <details className="mt-3">
                    <summary className="text-sm font-medium text-teal-700 hover:text-teal-900 cursor-pointer inline-block py-1">
                      {strings.showAllThemes(themesAlpha.length)}
                    </summary>
                    <div className="mt-3">
                      <ChipGrid
                        locale={locale}
                        axis="theme"
                        axisKeys={themesBelow.map((t) => t.key)}
                      />
                    </div>
                  </details>
                )}
              </section>
            )}

            {levels.length > 0 && (
              <section>
                <h2 className="font-display font-semibold text-xl md:text-2xl text-teal-800 mb-4">
                  {strings.sectionLevels}
                </h2>
                <ChipGrid locale={locale} axis="educational-level" axisKeys={levels} />
              </section>
            )}
          </div>
        )}
      </article>
    </main>
  );
}
