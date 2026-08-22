import { Metadata } from "next";
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Baloo_2, Nunito } from "next/font/google";
import { getTranslations } from "next-intl/server";
import {
  TOPIC_ENABLED_LOCALES,
  TopicEnabledLocale,
} from "@/config/topic-locales";
import {
  fetchLeadDeckForAxes,
  listNonEmptyAxisKeysWithCounts,
} from "@/lib/topic-decks";
import {
  getAxisSlug,
  getSubjectName,
  exerciseTypeKeysForSubject,
} from "@/lib/taxonomy";
import topicsTaxonomy from "@/config/topics-taxonomy.json";
import themeArtJson from "@/lib/topic-theme-art.json";
import { deckAssets } from "@/lib/seo/landing-content";
import { wwwImg } from "@/lib/img-host";
import { buildBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import ActivityGlyph from "@/components/activities/ActivityGlyph";
import BreadcrumbTrail from "@/components/breadcrumbs/BreadcrumbTrail";
import PageUsageBlock from "@/components/catalog/PageUsageBlock";
import { canonicalUrl, localePath } from "@/lib/seo/url";
import "@/styles/catalog-cards.css";

/**
 * Topics index landing — /<locale>/topic/ — the catalog's master directory.
 *
 * Direction A "catalog gallery" treatment (redesigned 2026-08-22 from the
 * legacy chip clouds): three sections mirroring the three CC §16.5 axes,
 * each rendered as real catalog material rather than text pills —
 *   - Grade levels (educational-level axis — 5 keys): teal-ladder cards
 *   - Subjects (exercise-type axis — 60 keys): grouped into the 5 localized
 *     subject buckets (taxonomy.subjects), each card showing the axis-key's
 *     LEAD DECK's real worksheet thumbnail (slug-derived per §8.1)
 *   - Themes (theme axis — 100 keys): image tiles with an archetypal
 *     image-library picture per theme (lib/topic-theme-art.json; "Show all"
 *     toggle past the first 24)
 *
 * Only axis-keys with ≥1 published deck for the current locale render
 * (substrate-honesty per §16.6.1) — empty-state fallback when all 3 axes are
 * empty. Copy stays in the in-file 11-locale LANDING_STRINGS map (house
 * convention); count pills reuse the existing topicPage.decksCount ICU string.
 *
 * Rate-limit frugality (nginx burst 40): every image beyond the first card
 * row is lazy, and no Link prefetches.
 */
export const revalidate = 3600;

// Direction A typography pairing (CLAUDE.md §A.13.47) — loaded per route,
// like the worksheets/activities/tools hubs. latin-ext covers all 11 locales.
const baloo2 = Baloo_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-baloo-2",
  display: "swap",
});
const nunito = Nunito({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
});

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
const themeArt = themeArtJson as unknown as Record<string, string>;

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

/* Fixed subject-bucket order (taxonomy.subjects; localized names via
   getSubjectName). Panel/edge tints extend the shipped SUBJECT_STYLE /
   TOOL_CATEGORY_STYLE vocabulary — one hue family per bucket. */
const SUBJECT_ORDER = ["math", "letters", "logic", "spatial-reasoning", "science"] as const;

const SUBJECT_TINT: Record<string, { panel: string; edge: string; glyph: string; glyphKey: string }> = {
  math: { panel: "bg-[#DCEAE6]", edge: "bg-lcs-teal", glyph: "text-lcs-teal", glyphKey: "operations" },
  letters: { panel: "bg-[#FBE0D2]", edge: "bg-lcs-coral", glyph: "text-lcs-coral-deep", glyphKey: "language" },
  logic: { panel: "bg-[#F1E7D6]", edge: "bg-[#D9A441]", glyph: "text-[#A67921]", glyphKey: "geometry" },
  "spatial-reasoning": { panel: "bg-[#E2EBE4]", edge: "bg-lcs-teal/70", glyph: "text-lcs-teal", glyphKey: "geometry" },
  science: { panel: "bg-[#DCE3D3]", edge: "bg-lcs-sage-deep", glyph: "text-lcs-teal", glyphKey: "counting" },
};

/* Teal ladder across the level band — light→deep from preschool to grade 3,
   so the row itself reads as the age progression. */
const LEVEL_TINT: Record<string, string> = {
  preschool: "bg-lcs-teal/30",
  kindergarten: "bg-lcs-teal/45",
  "grade-1": "bg-lcs-teal/60",
  "grade-2": "bg-lcs-teal/80",
  "grade-3": "bg-lcs-teal",
};

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
    robots: INDEXABLE_ROBOTS,
  };
}

/* ── local presentational pieces (server-rendered, all strings passed in) ── */

interface TopicItem {
  key: string;
  slug: string;
  name: string;
  count: number;
}

/** Grade-level card — no image; the teal accent ladder + count carry it. */
function LevelCard({
  locale,
  item,
  countLabel,
}: {
  locale: string;
  item: TopicItem;
  countLabel: string;
}) {
  const tint = LEVEL_TINT[item.key] ?? "bg-lcs-teal/50";
  return (
    <Link
      href={`/${locale}/topic/${item.slug}`}
      prefetch={false}
      className="actcat-card group flex flex-col rounded-3xl p-4 md:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-lcs-cream"
    >
      <span aria-hidden="true" className={`block h-1.5 w-10 rounded-full ${tint} mb-3`} />
      <h3 className="font-lcsDisplay font-bold text-base md:text-lg text-lcs-teal leading-snug capitalize break-words hyphens-auto mb-1">
        {item.name}
      </h3>
      <p className="font-lcsBody text-xs text-lcs-teal/65 leading-snug mb-3">{countLabel}</p>
      <span
        aria-hidden="true"
        className="mt-auto font-lcsDisplay font-bold text-sm text-lcs-coral-deep inline-flex items-center gap-1 group-hover:gap-2 transition-all"
      >
        →
      </span>
    </Link>
  );
}

/** Subject (exercise-type) card — the lead deck's real worksheet thumbnail. */
function SubjectCard({
  locale,
  item,
  thumbSlug,
  tint,
  countLabel,
  eager,
}: {
  locale: string;
  item: TopicItem;
  thumbSlug: string | null;
  tint: { panel: string; edge: string; glyph: string; glyphKey: string };
  countLabel: string;
  eager: boolean;
}) {
  return (
    <Link
      href={`/${locale}/topic/${item.slug}`}
      prefetch={false}
      className="actcat-card group flex flex-col rounded-3xl p-3 md:p-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-lcs-cream"
    >
      <div className={`relative overflow-hidden rounded-2xl ${tint.panel} aspect-[4/5] mb-3`}>
        <span aria-hidden="true" className={`absolute left-0 right-0 top-0 z-10 h-1.5 ${tint.edge}`} />
        {thumbSlug ? (
          /* Image sits BELOW the edge band (top-2.5), never under it — the
             worksheet's own title bar starts at the very top of the render
             and an overlaying band amputates it (visual-QA defect #1). */
          <div className="absolute inset-x-0 top-2.5 bottom-0">
            <Image
              src={wwwImg(deckAssets(locale, thumbSlug).thumbnail)}
              alt=""
              fill
              sizes="(max-width:639px) 45vw, (max-width:1023px) 30vw, (max-width:1279px) 23vw, 210px"
              loading={eager ? "eager" : "lazy"}
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <span className={`absolute inset-0 flex items-center justify-center ${tint.glyph}`}>
            <ActivityGlyph tool="" category={tint.glyphKey} className="w-14 h-14 opacity-80" />
          </span>
        )}
      </div>
      <h3 className="font-lcsDisplay font-bold text-sm md:text-base text-lcs-teal leading-snug line-clamp-2 break-words hyphens-auto mb-1">
        {item.name}
      </h3>
      <p className="font-lcsBody text-xs text-lcs-teal/65 leading-snug mb-2.5">{countLabel}</p>
      <span
        aria-hidden="true"
        className="mt-auto font-lcsDisplay font-bold text-sm text-lcs-coral-deep inline-flex items-center gap-1 group-hover:gap-2 transition-all"
      >
        →
      </span>
    </Link>
  );
}

/** Theme tile — archetypal image-library picture as a sticker on paper. */
function ThemeTile({
  locale,
  item,
  countLabel,
}: {
  locale: string;
  item: TopicItem;
  countLabel: string;
}) {
  const art = themeArt[item.key];
  return (
    <Link
      href={`/${locale}/topic/${item.slug}`}
      prefetch={false}
      className="actcat-card group flex flex-col rounded-2xl p-2 md:p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-lcs-cream"
    >
      <div className="relative overflow-hidden rounded-xl bg-white/70 aspect-square mb-2 flex items-center justify-center">
        {art ? (
          /* Plain <img> (mini-tool pattern): the mirror art is already a
             small WebP; skip the optimizer to spare the nginx burst. */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={encodeURI(art)}
            alt=""
            width={160}
            height={160}
            loading="lazy"
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.06]"
          />
        ) : (
          <span className="font-lcsDisplay font-bold text-2xl text-lcs-teal/40">
            {item.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {/* Two lines + break-words: German/Finnish compound theme names were
          reduced to fragments (or hard-clipped) on one line (QA defects #3/#4). */}
      <span className="font-lcsBody font-bold text-xs md:text-[0.8rem] text-lcs-teal leading-tight text-center line-clamp-2 break-words hyphens-auto px-0.5 min-h-[2.1em]">
        {item.name}
      </span>
      <span className="font-lcsBody text-[0.65rem] text-lcs-teal/60 text-center">{countLabel}</span>
    </Link>
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

  // Localized count phrase ("# worksheets" / "# Arbeitsblätter" / …) — reuses
  // the existing native topicPage.decksCount ICU string (read-from-SoT §10.4).
  const tTopic = await getTranslations({ locale, namespace: "topicPage" });
  const countLabel = (n: number) => tTopic("decksCount", { count: n });

  // Non-empty axis-keys per axis WITH published-deck counts (substrate-honesty
  // gate + count pills in one round-trip per axis). ISR-cached (3600).
  let subjectCounts: Array<{ axisKey: string; count: number }> = [];
  let themeCounts: Array<{ axisKey: string; count: number }> = [];
  let levelCounts: Array<{ axisKey: string; count: number }> = [];
  try {
    [subjectCounts, themeCounts, levelCounts] = await Promise.all([
      listNonEmptyAxisKeysWithCounts("exercise-type", locale),
      listNonEmptyAxisKeysWithCounts("theme", locale),
      listNonEmptyAxisKeysWithCounts("educational-level", locale),
    ]);
  } catch {
    // DB unavailable: arrays stay empty; we'll show the empty-state below.
  }

  // Lead-deck thumbnail per exercise-type (real worksheet render, slug-derived
  // per §8.1). Failure degrades a card to its subject glyph, never crashes.
  const leadSlugByType = new Map<string, string>();
  try {
    const leads = await Promise.all(
      subjectCounts.map(async ({ axisKey }) => ({
        axisKey,
        lead: await fetchLeadDeckForAxes([{ axis: "exercise-type", axisKey }], locale),
      }))
    );
    for (const { axisKey, lead } of leads) {
      if (lead?.slug) leadSlugByType.set(axisKey, lead.slug);
    }
  } catch {
    /* glyph fallback */
  }

  const allEmpty =
    subjectCounts.length === 0 && themeCounts.length === 0 && levelCounts.length === 0;

  const toItem = (axis: "exercise-type" | "theme" | "educational-level") =>
    (x: { axisKey: string; count: number }): TopicItem | null => {
      const slug = getAxisSlug(axis, x.axisKey, locale);
      if (!slug) return null;
      return { key: x.axisKey, slug, name: resolveAxisName(axis, x.axisKey, locale), count: x.count };
    };

  // Levels keep taxonomy registry order (the preschool→grade-3 ladder).
  const levelItems = levelCounts
    .map(toItem("educational-level"))
    .filter((x): x is TopicItem => x !== null);

  // Subjects group into the 5 localized buckets; alphabetical within each.
  const countByType = new Map(subjectCounts.map((x) => [x.axisKey, x.count]));
  const bucketed = new Set<string>();
  const subjectGroups = SUBJECT_ORDER.map((subjectKey) => {
    const keys = exerciseTypeKeysForSubject(subjectKey).filter((k) => countByType.has(k));
    for (const k of keys) bucketed.add(k);
    const items = keys
      .map((k) => toItem("exercise-type")({ axisKey: k, count: countByType.get(k) ?? 0 }))
      .filter((x): x is TopicItem => x !== null)
      .sort((a, b) => a.name.localeCompare(b.name, locale));
    return { subjectKey, label: getSubjectName(subjectKey, locale) ?? subjectKey, items };
  }).filter((g) => g.items.length > 0);
  // Safety net: any published exercise-type outside every bucket still renders.
  const ungroupedSubjects = subjectCounts
    .filter((x) => !bucketed.has(x.axisKey))
    .map(toItem("exercise-type"))
    .filter((x): x is TopicItem => x !== null)
    .sort((a, b) => a.name.localeCompare(b.name, locale));

  // Themes alphabetical; first THEME_PAGE_SIZE visible, rest behind <details>.
  const themeItems = themeCounts
    .map(toItem("theme"))
    .filter((x): x is TopicItem => x !== null)
    .sort((a, b) => a.name.localeCompare(b.name, locale));
  const themesAbove = themeItems.slice(0, THEME_PAGE_SIZE);
  const themesBelow = themeItems.slice(THEME_PAGE_SIZE);

  const totalSubjects = subjectGroups.reduce((s, g) => s + g.items.length, 0) + ungroupedSubjects.length;

  // JSON-LD: BreadcrumbList mirrors the visible BreadcrumbTrail (Home › Topics);
  // CollectionPage marks the hub itself. Additive — metadata untouched.
  const tBreadcrumb = await getTranslations({ locale, namespace: "topicPage.breadcrumb" });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb("home"), path: localePath(locale) },
    { name: strings.pageTitle, path: localePath(locale, "topic") },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: strings.metaTitle,
    description: strings.metaDescription,
    url: canonicalUrl(localePath(locale, "topic")),
    inLanguage: locale,
  };

  const sectionH2 = "font-lcsDisplay font-extrabold text-xl md:text-2xl text-lcs-coral mb-4 md:mb-5";
  const jumpChip =
    "inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/70 border border-lcs-teal/15 font-lcsBody font-semibold text-xs md:text-sm text-lcs-teal hover:bg-lcs-teal hover:text-white hover:border-lcs-teal transition-colors";

  return (
    <main
      className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <article className="mx-auto max-w-6xl">
        <BreadcrumbTrail locale={locale} trail={[{ label: strings.pageTitle }]} />

        <header className="mb-7 md:mb-10 max-w-3xl">
          <h1 className="font-lcsDisplay font-extrabold text-3xl md:text-4xl text-lcs-teal leading-tight mb-2.5">
            {strings.pageTitle}
          </h1>
          <span aria-hidden="true" className="block w-16 h-1.5 rounded-full bg-lcs-coral mb-3.5" />
          <p className="font-lcsBody text-sm md:text-base text-lcs-teal/80 leading-relaxed">
            {strings.pageIntro}
          </p>
        </header>

        {allEmpty ? (
          <div className="actcat-card-flat rounded-3xl p-8 md:p-12 text-center text-lcs-teal/80">
            <p className="font-lcsBody text-base md:text-lg">{strings.emptyState}</p>
          </div>
        ) : (
          <>
            {/* Section jump links — in-page anchors, JS-free. */}
            <nav aria-label={strings.pageTitle} className="flex flex-wrap gap-2 mb-8 md:mb-10">
              {levelItems.length > 0 && (
                <a href="#levels" className={jumpChip}>
                  {strings.sectionLevels}
                  <span className="ml-1.5 text-[0.7rem] opacity-60">{levelItems.length}</span>
                </a>
              )}
              {totalSubjects > 0 && (
                <a href="#subjects" className={jumpChip}>
                  {strings.sectionSubjects}
                  <span className="ml-1.5 text-[0.7rem] opacity-60">{totalSubjects}</span>
                </a>
              )}
              {themeItems.length > 0 && (
                <a href="#themes" className={jumpChip}>
                  {strings.sectionThemes}
                  <span className="ml-1.5 text-[0.7rem] opacity-60">{themeItems.length}</span>
                </a>
              )}
            </nav>

            <div className="space-y-10 md:space-y-14">
              {levelItems.length > 0 && (
                <section id="levels" className="scroll-mt-24">
                  <h2 className={sectionH2}>{strings.sectionLevels}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
                    {levelItems.map((it) => (
                      <LevelCard key={it.key} locale={locale} item={it} countLabel={countLabel(it.count)} />
                    ))}
                  </div>
                </section>
              )}

              {totalSubjects > 0 && (
                <section id="subjects" className="scroll-mt-24">
                  <h2 className={sectionH2}>{strings.sectionSubjects}</h2>
                  <div className="space-y-8 md:space-y-10">
                    {subjectGroups.map((g, gi) => {
                      const tint = SUBJECT_TINT[g.subjectKey] ?? SUBJECT_TINT.math;
                      return (
                        <div key={g.subjectKey}>
                          <h3 className="font-lcsDisplay font-bold text-lg md:text-xl text-lcs-teal mb-3.5 md:mb-4">
                            {g.label}
                            <span className="ml-2 font-lcsBody font-semibold text-xs text-lcs-teal/50 align-middle">
                              {g.items.length}
                            </span>
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                            {g.items.map((it, i) => (
                              <SubjectCard
                                key={it.key}
                                locale={locale}
                                item={it}
                                thumbSlug={leadSlugByType.get(it.key) ?? null}
                                tint={tint}
                                countLabel={countLabel(it.count)}
                                eager={gi === 0 && i < 5}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    {ungroupedSubjects.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                        {ungroupedSubjects.map((it) => (
                          <SubjectCard
                            key={it.key}
                            locale={locale}
                            item={it}
                            thumbSlug={leadSlugByType.get(it.key) ?? null}
                            tint={SUBJECT_TINT.math}
                            countLabel={countLabel(it.count)}
                            eager={false}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {themeItems.length > 0 && (
                <section id="themes" className="scroll-mt-24">
                  <h2 className={sectionH2}>{strings.sectionThemes}</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
                    {themesAbove.map((it) => (
                      <ThemeTile key={it.key} locale={locale} item={it} countLabel={countLabel(it.count)} />
                    ))}
                  </div>
                  {themesBelow.length > 0 && (
                    <details className="mt-4">
                      <summary className="inline-flex items-center px-4 py-2 rounded-full border border-lcs-teal/25 bg-white/70 font-lcsBody font-bold text-sm text-lcs-teal hover:bg-lcs-teal hover:text-white cursor-pointer transition-colors list-none [&::-webkit-details-marker]:hidden">
                        {strings.showAllThemes(themeItems.length)}
                      </summary>
                      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
                        {themesBelow.map((it) => (
                          <ThemeTile key={it.key} locale={locale} item={it} countLabel={countLabel(it.count)} />
                        ))}
                      </div>
                    </details>
                  )}
                </section>
              )}
            </div>
          </>
        )}

        {/* PageUsageBlock ships legacy font-display/ink classes (shared with
            legacy-styled topic detail pages) — re-skin it into Direction A
            here via scoped arbitrary variants (QA defect #6). */}
        <div className="mt-10 md:mt-14 [&_h2]:font-lcsDisplay [&_h2]:font-bold [&_h2]:text-lcs-teal [&_p]:font-lcsBody [&_p]:text-lcs-teal/80">
          <PageUsageBlock locale={locale} variant="hub" />
        </div>
      </article>
    </main>
  );
}
