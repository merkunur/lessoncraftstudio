import fs from "fs";
import path from "path";
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { getTranslations } from "next-intl/server";
import {
  TOPIC_ENABLED_LOCALES,
  TopicEnabledLocale,
} from "@/config/topic-locales";
import { listAllActivities } from "@/lib/activities";
import BreadcrumbTrail from "@/components/breadcrumbs/BreadcrumbTrail";
import { CANONICAL_HOST, canonicalUrl, localePath } from "@/lib/seo/url";
import { getHreflangCode } from "@/lib/schema-generator";
import { localizeStrand } from "@/lib/seo/strand-names";
import {
  parseActivityFilters,
  applyFilters,
  sortRows,
  buildFacets,
  deriveSubject,
  strandKey,
  shortTitle,
  ACTIVITY_PAGE_SIZE,
  type SortKey,
  type Subject,
} from "@/lib/activities-catalog";
import ActivityCatalogCard from "@/components/activities/ActivityCatalogCard";
import {
  ActivitySidebar,
  ActivityMobileFilters,
  ActivitySortControl,
  ActivityActiveChips,
  ActivityEmptyState,
  type FacetGroupVM,
} from "@/components/activities/ActivityCatalogFilters";
import { buildFilterUrl, withoutParam } from "@/components/catalog/filterUrl";
import Pagination from "@/components/catalog/Pagination";
import "./activities-catalog.css";

/**
 * Activities index — /<locale>/activities/
 *
 * A professional, faceted catalog (Direction A identity): left Subject / Grade
 * / Skill-area filter rail + sort + a responsive grid of illustrative-tile
 * cards (per-engine glyph + title + grade & CC chips + strand). Server-
 * rendered; all filter/sort state lives in the URL (shareable + crawlable).
 * Activities have no thumbnail (they're interactive iframes), so the card
 * visual is the crafted ActivityGlyph — see ActivityCatalogCard.
 */
export const revalidate = 3600;

const BASE_URL = CANONICAL_HOST;

// Direction A typography pairing (CLAUDE.md §A.13.47) — loaded per route, like
// the homepage. latin-ext covers all 11 site locales.
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

// Grade key → seo.educational_level.* (the SoT the detail-page chip uses; 11/11).
const GRADE_KEY_MAP: Record<string, string> = {
  K: "kindergarten",
  "1": "grade_1",
  "2": "grade_2",
  "3": "grade_3",
};
// Skill-area (strand) facet ordering: math domains first (CCSS sequence), then literacy.
const SKILL_ORDER: Record<string, number> = {
  counting: 0,
  operations: 1,
  "base-ten": 2,
  measurement: 3,
  geometry: 4,
  reading: 5,
  phonological: 6,
  language: 7,
  other: 99,
};
const GRADE_ORDER = ["K", "1", "2", "3"];

interface LandingStrings {
  pageTitle: string;
  pageIntro: string;
  tryItLink: string;
  metaTitle: string;
  metaDescription: string;
  gradeLabel: string;
  filtersHeading: string;
  subjectHeading: string;
  subjectMath: string;
  subjectLiteracy: string;
  skillHeading: string;
  sortHeading: string;
  sortNewest: string;
  clearAll: string;
  emptyTitle: string;
  emptyBody: string;
  resultsWord: string; // plural noun; rendered as "{count} {resultsWord}"
}

const LANDING_STRINGS: Record<string, LandingStrings> = {
  en: {
    pageTitle: "Free K-3 Learning Activities",
    pageIntro: "Common-Core-pinned activities your students play in the browser — counting, addition, phonics and more. Pick a subject, grade or skill to narrow down. Free, no signup, in 11 languages.",
    tryItLink: "Try it",
    metaTitle: "Free K-3 Learning Activities — Common Core Aligned",
    metaDescription: "Free browser-playable K-3 learning activities aligned to Common Core standards — counting, addition, phonics and more. No signup, works in 11 languages.",
    gradeLabel: "Grade",
    filtersHeading: "Filters",
    subjectHeading: "Subject",
    subjectMath: "Math",
    subjectLiteracy: "Literacy",
    skillHeading: "Skill area",
    sortHeading: "Sort",
    sortNewest: "Newest",
    clearAll: "Clear all",
    emptyTitle: "No activities match",
    emptyBody: "Try removing a filter to see more activities.",
    resultsWord: "activities",
  },
  de: {
    pageTitle: "Kostenlose Lernaufgaben für die Klassen K-3",
    pageIntro: "Aufgaben passend zum Lehrplan, die deine Schüler im Browser bearbeiten — Zählen, Addition, Phonik und mehr. Nach Fach, Klasse oder Lernbereich filtern. Kostenlos, ohne Anmeldung, in 11 Sprachen.",
    tryItLink: "Ausprobieren",
    metaTitle: "Kostenlose Lernaufgaben (K-3) — am Lehrplan ausgerichtet",
    metaDescription: "Kostenlose, im Browser spielbare Lernaufgaben für die Klassen K-3, ausgerichtet an den Lehrplänen — Zählen, Addition, Phonik und mehr. Ohne Anmeldung, in 11 Sprachen.",
    gradeLabel: "Klasse",
    filtersHeading: "Filter",
    subjectHeading: "Fach",
    subjectMath: "Mathematik",
    subjectLiteracy: "Sprache",
    skillHeading: "Lernbereich",
    sortHeading: "Sortieren",
    sortNewest: "Neueste",
    clearAll: "Alle zurücksetzen",
    emptyTitle: "Keine Aufgaben gefunden",
    emptyBody: "Entferne einen Filter, um mehr Aufgaben zu sehen.",
    resultsWord: "Aufgaben",
  },
  es: {
    pageTitle: "Actividades de aprendizaje gratuitas para Infantil y Primaria (K-3)",
    pageIntro: "Actividades alineadas con el currículo que tus estudiantes juegan en el navegador: contar, sumar, fonética y más. Filtra por materia, grado o área. Gratis, sin registro, en 11 idiomas.",
    tryItLink: "Probar",
    metaTitle: "Actividades de aprendizaje gratuitas (K-3) — alineadas al currículo",
    metaDescription: "Actividades de aprendizaje K-3 gratuitas y jugables en el navegador, alineadas con el currículo: contar, sumar, fonética y más. Sin registro, en 11 idiomas.",
    gradeLabel: "Grado",
    filtersHeading: "Filtros",
    subjectHeading: "Materia",
    subjectMath: "Matemáticas",
    subjectLiteracy: "Lengua",
    skillHeading: "Área",
    sortHeading: "Ordenar",
    sortNewest: "Más recientes",
    clearAll: "Borrar todo",
    emptyTitle: "No hay actividades",
    emptyBody: "Prueba a quitar un filtro para ver más actividades.",
    resultsWord: "actividades",
  },
  fr: {
    pageTitle: "Activités d'apprentissage gratuites (maternelle au CE1)",
    pageIntro: "Des activités conformes aux programmes que tes élèves font dans le navigateur : compter, additionner, phonétique et plus. Filtre par matière, niveau ou domaine. Gratuit, sans inscription, en 11 langues.",
    tryItLink: "Essayer",
    metaTitle: "Activités d'apprentissage gratuites (K-3) — conformes aux programmes",
    metaDescription: "Activités d'apprentissage K-3 gratuites et jouables dans le navigateur, conformes aux programmes : compter, additionner, phonétique et plus. Sans inscription, en 11 langues.",
    gradeLabel: "Niveau",
    filtersHeading: "Filtres",
    subjectHeading: "Matière",
    subjectMath: "Mathématiques",
    subjectLiteracy: "Langage",
    skillHeading: "Domaine",
    sortHeading: "Trier",
    sortNewest: "Plus récentes",
    clearAll: "Tout effacer",
    emptyTitle: "Aucune activité",
    emptyBody: "Essaie d'enlever un filtre pour voir plus d'activités.",
    resultsWord: "activités",
  },
  it: {
    pageTitle: "Attività di apprendimento gratuite (scuola dell'infanzia e primaria)",
    pageIntro: "Attività allineate alle Indicazioni nazionali che i tuoi studenti svolgono nel browser: contare, addizione, fonetica e altro. Filtra per disciplina, classe o ambito. Gratis, senza registrazione, in 11 lingue.",
    tryItLink: "Prova",
    metaTitle: "Attività di apprendimento gratuite (K-3) — allineate alle Indicazioni nazionali",
    metaDescription: "Attività di apprendimento K-3 gratuite e giocabili nel browser, allineate alle Indicazioni nazionali: contare, addizione, fonetica e altro. Senza registrazione, in 11 lingue.",
    gradeLabel: "Classe",
    filtersHeading: "Filtri",
    subjectHeading: "Disciplina",
    subjectMath: "Matematica",
    subjectLiteracy: "Lingua",
    skillHeading: "Ambito",
    sortHeading: "Ordina",
    sortNewest: "Più recenti",
    clearAll: "Cancella tutto",
    emptyTitle: "Nessuna attività",
    emptyBody: "Prova a togliere un filtro per vedere più attività.",
    resultsWord: "attività",
  },
  pt: {
    pageTitle: "Atividades de aprendizagem gratuitas (educação infantil e anos iniciais)",
    pageIntro: "Atividades alinhadas à BNCC que seus alunos jogam no navegador: contar, adição, fonética e mais. Filtre por disciplina, série ou habilidade. Grátis, sem cadastro, em 11 idiomas.",
    tryItLink: "Experimentar",
    metaTitle: "Atividades de aprendizagem gratuitas (K-3) — alinhadas à BNCC",
    metaDescription: "Atividades de aprendizagem K-3 gratuitas e jogáveis no navegador, alinhadas à BNCC: contar, adição, fonética e mais. Sem cadastro, em 11 idiomas.",
    gradeLabel: "Série",
    filtersHeading: "Filtros",
    subjectHeading: "Disciplina",
    subjectMath: "Matemática",
    subjectLiteracy: "Linguagem",
    skillHeading: "Habilidade",
    sortHeading: "Ordenar",
    sortNewest: "Mais recentes",
    clearAll: "Limpar tudo",
    emptyTitle: "Nenhuma atividade",
    emptyBody: "Tente remover um filtro para ver mais atividades.",
    resultsWord: "atividades",
  },
  nl: {
    pageTitle: "Gratis leeractiviteiten voor kleuters t/m groep 5",
    pageIntro: "Activiteiten afgestemd op de kerndoelen die je leerlingen in de browser doen: tellen, optellen, klanken en meer. Filter op vak, groep of leergebied. Gratis, zonder aanmelden, in 11 talen.",
    tryItLink: "Probeer",
    metaTitle: "Gratis leeractiviteiten (K-3) — afgestemd op de kerndoelen",
    metaDescription: "Gratis leeractiviteiten voor K-3 die in de browser werken, afgestemd op de kerndoelen: tellen, optellen, klanken en meer. Zonder aanmelden, in 11 talen.",
    gradeLabel: "Groep",
    filtersHeading: "Filters",
    subjectHeading: "Vak",
    subjectMath: "Rekenen",
    subjectLiteracy: "Taal",
    skillHeading: "Leergebied",
    sortHeading: "Sorteren",
    sortNewest: "Nieuwste",
    clearAll: "Alles wissen",
    emptyTitle: "Geen activiteiten",
    emptyBody: "Verwijder een filter om meer activiteiten te zien.",
    resultsWord: "activiteiten",
  },
  sv: {
    pageTitle: "Gratis lärandeaktiviteter för förskoleklass till åk 2",
    pageIntro: "Aktiviteter anpassade till Lgr22 som dina elever gör i webbläsaren: räkna, addition, fonem och mer. Filtrera på ämne, årskurs eller område. Gratis, utan registrering, på 11 språk.",
    tryItLink: "Prova",
    metaTitle: "Gratis lärandeaktiviteter (K-3) — anpassade till Lgr22",
    metaDescription: "Gratis lärandeaktiviteter för K-3 som spelas i webbläsaren, anpassade till Lgr22: räkna, addition, fonem och mer. Utan registrering, på 11 språk.",
    gradeLabel: "Årskurs",
    filtersHeading: "Filter",
    subjectHeading: "Ämne",
    subjectMath: "Matematik",
    subjectLiteracy: "Språk",
    skillHeading: "Område",
    sortHeading: "Sortera",
    sortNewest: "Senaste",
    clearAll: "Rensa allt",
    emptyTitle: "Inga aktiviteter",
    emptyBody: "Ta bort ett filter för att se fler aktiviteter.",
    resultsWord: "aktiviteter",
  },
  da: {
    pageTitle: "Gratis læringsaktiviteter for børnehaveklasse til 2. klasse",
    pageIntro: "Aktiviteter tilpasset Fælles Mål, som dine elever laver i browseren: tælle, addition, lyde og mere. Filtrér på fag, klasse eller område. Gratis, uden tilmelding, på 11 sprog.",
    tryItLink: "Prøv",
    metaTitle: "Gratis læringsaktiviteter (K-3) — tilpasset Fælles Mål",
    metaDescription: "Gratis læringsaktiviteter for K-3, der spilles i browseren, tilpasset Fælles Mål: tælle, addition, lyde og mere. Uden tilmelding, på 11 sprog.",
    gradeLabel: "Klasse",
    filtersHeading: "Filtre",
    subjectHeading: "Fag",
    subjectMath: "Matematik",
    subjectLiteracy: "Sprog",
    skillHeading: "Område",
    sortHeading: "Sortér",
    sortNewest: "Nyeste",
    clearAll: "Ryd alt",
    emptyTitle: "Ingen aktiviteter",
    emptyBody: "Fjern et filter for at se flere aktiviteter.",
    resultsWord: "aktiviteter",
  },
  no: {
    pageTitle: "Gratis læringsaktiviteter for barnehage til 2. trinn",
    pageIntro: "Aktiviteter tilpasset LK20 som elevene gjør i nettleseren: telle, addisjon, lyder og mer. Filtrer på fag, trinn eller område. Gratis, uten registrering, på 11 språk.",
    tryItLink: "Prøv",
    metaTitle: "Gratis læringsaktiviteter (K-3) — tilpasset LK20",
    metaDescription: "Gratis læringsaktiviteter for K-3 som spilles i nettleseren, tilpasset LK20: telle, addisjon, lyder og mer. Uten registrering, på 11 språk.",
    gradeLabel: "Trinn",
    filtersHeading: "Filtre",
    subjectHeading: "Fag",
    subjectMath: "Matematikk",
    subjectLiteracy: "Språk",
    skillHeading: "Område",
    sortHeading: "Sorter",
    sortNewest: "Nyeste",
    clearAll: "Tøm alt",
    emptyTitle: "Ingen aktiviteter",
    emptyBody: "Fjern et filter for å se flere aktiviteter.",
    resultsWord: "aktiviteter",
  },
  fi: {
    pageTitle: "Ilmaisia oppimistehtäviä esiopetuksesta 2. luokalle",
    pageIntro: "OPS 2014:ään sidottuja tehtäviä, joita oppilaasi tekevät selaimessa: laskeminen, yhteenlasku, äänteet ja muuta. Suodata oppiaineen, luokan tai taitoalueen mukaan. Ilmaisia, ei rekisteröitymistä, 11 kielellä.",
    tryItLink: "Kokeile",
    metaTitle: "Ilmaisia oppimistehtäviä (K-3) — sidottu OPS 2014:ään",
    metaDescription: "Ilmaisia, selaimessa pelattavia K-3-oppimistehtäviä, jotka on sidottu OPS 2014:ään: laskeminen, yhteenlasku, äänteet ja muuta. Ei rekisteröitymistä, 11 kielellä.",
    gradeLabel: "Luokka",
    filtersHeading: "Suodattimet",
    subjectHeading: "Oppiaine",
    subjectMath: "Matematiikka",
    subjectLiteracy: "Kieli",
    skillHeading: "Taitoalue",
    sortHeading: "Lajittele",
    sortNewest: "Uusimmat",
    clearAll: "Tyhjennä",
    emptyTitle: "Ei tehtäviä",
    emptyBody: "Poista jokin suodatin nähdäksesi lisää tehtäviä.",
    resultsWord: "tehtävää",
  },
};

/* Which activities have a generated preview WebP (rendered locally by
   scripts/generate-activity-previews.js, served from /mini-tools/previews/).
   Read once per server lifetime; the candidate paths cover local dev + the
   standalone build (public/mini-tools is symlinked to the served storage).
   Missing → the card falls back to the per-engine glyph. */
let _previewSet: Set<string> | null = null;
function loadPreviewIds(): Set<string> {
  if (_previewSet) return _previewSet;
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "public", "mini-tools", "previews"),
    path.join(cwd, "..", "public", "mini-tools", "previews"),
    path.join(cwd, "frontend", "public", "mini-tools", "previews"),
  ];
  const set = new Set<string>();
  for (const dir of candidates) {
    try {
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith(".webp")) set.add(f.slice(0, -5));
      }
      if (set.size) break;
    } catch {
      /* try next candidate */
    }
  }
  _previewSet = set;
  return set;
}

interface PageParams {
  locale: string;
}
interface PageProps {
  params: PageParams;
  searchParams: Record<string, string | string[] | undefined>;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export function generateStaticParams(): PageParams[] {
  return TOPIC_ENABLED_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  if (!isTopicLocale(params.locale)) return {};
  const strings = LANDING_STRINGS[params.locale] ?? LANDING_STRINGS.en;
  // Canonical is always the BARE index — filters/sort are a UX layer, one
  // indexable surface (no thin filtered duplicates).
  const canonical = canonicalUrl(localePath(params.locale, "activities"));
  const alternates: Record<string, string> = {};
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
    robots: INDEXABLE_ROBOTS,
  };
}

function toSearchParamsString(sp: Record<string, string | string[] | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) v.forEach((x) => p.append(k, x));
    else p.append(k, v);
  }
  return p.toString();
}

export default async function ActivitiesIndexPage({ params, searchParams }: PageProps) {
  if (!isTopicLocale(params.locale)) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  const locale = params.locale;
  const strings = LANDING_STRINGS[locale] ?? LANDING_STRINGS.en;
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const gradeName = (grade: string): string => {
    const key = GRADE_KEY_MAP[grade];
    return key ? tSeo(`educational_level.${key}`) : `${strings.gradeLabel} ${grade}`;
  };

  const basePath = localePath(locale, "activities");
  const spString = toSearchParamsString(searchParams);
  const filters = parseActivityFilters(searchParams);

  const all = (await listAllActivities()).filter(
    (r) => r.slug[locale] && r.page_title[locale],
  );
  const previewIds = loadPreviewIds();

  // Facet view-models (localized labels + counts + active flags).
  const facets = buildFacets(all, filters);
  const countMap = (opts: { value: string; count: number }[]) =>
    new Map(opts.map((o) => [o.value, o.count]));
  const subjCounts = countMap(facets.subject);
  const gradeCounts = countMap(facets.grade);
  const skillCounts = countMap(facets.skill);

  const subjectLabel = (s: Subject) => (s === "math" ? strings.subjectMath : strings.subjectLiteracy);

  const subjectItems = (["math", "literacy"] as Subject[])
    .filter((v) => subjCounts.has(v))
    .map((v) => ({
      paramKey: "subject" as const,
      value: v,
      label: subjectLabel(v),
      count: subjCounts.get(v) || 0,
      active: filters.subject === v,
    }));

  const gradeItems = GRADE_ORDER.filter((g) => gradeCounts.has(g)).map((g) => ({
    paramKey: "grade" as const,
    value: g,
    label: gradeName(g),
    count: gradeCounts.get(g) || 0,
    active: filters.grade === g,
  }));

  // Skill (strand) facet: localized strand name per key, ordered math→literacy.
  const skillKeyToStrand = new Map<string, string>();
  for (const r of all) {
    const k = strandKey(r.alignment.strand);
    if (!skillKeyToStrand.has(k)) skillKeyToStrand.set(k, r.alignment.strand);
  }
  const skillItems = [...skillCounts.keys()]
    .sort((a, b) => (SKILL_ORDER[a] ?? 99) - (SKILL_ORDER[b] ?? 99))
    .map((k) => ({
      paramKey: "skill" as const,
      value: k,
      label: localizeStrand(skillKeyToStrand.get(k) || "", locale),
      count: skillCounts.get(k) || 0,
      active: filters.skill === k,
    }));

  const facetGroups: FacetGroupVM[] = [
    { key: "subject", heading: strings.subjectHeading, items: subjectItems },
    { key: "grade", heading: strings.gradeLabel, items: gradeItems },
    { key: "skill", heading: strings.skillHeading, items: skillItems },
  ];

  // Filter + sort + paginate the visible set.
  const filtered = sortRows(
    applyFilters(all, { subject: filters.subject, grade: filters.grade, skill: filters.skill }),
    locale,
    filters.sort,
  );
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / ACTIVITY_PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);
  const pageRows = filtered.slice((page - 1) * ACTIVITY_PAGE_SIZE, page * ACTIVITY_PAGE_SIZE);

  // Active-filter chips + clear-all.
  const removeHref = (key: string) => {
    const next = withoutParam(new URLSearchParams(spString), key);
    next.delete("page");
    return buildFilterUrl(basePath, next);
  };
  const chips: { label: string; removeHref: string }[] = [];
  if (filters.subject) chips.push({ label: subjectLabel(filters.subject), removeHref: removeHref("subject") });
  if (filters.grade) chips.push({ label: gradeName(filters.grade), removeHref: removeHref("grade") });
  if (filters.skill)
    chips.push({
      label: localizeStrand(skillKeyToStrand.get(filters.skill) || "", locale),
      removeHref: removeHref("skill"),
    });
  const clearAllHref = (() => {
    const next = new URLSearchParams(spString);
    ["subject", "grade", "skill", "sort", "page"].forEach((k) => next.delete(k));
    return buildFilterUrl(basePath, next);
  })();

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "newest", label: strings.sortNewest },
    { value: "az", label: "A–Z" },
    { value: "za", label: "Z–A" },
  ];

  return (
    <main
      className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6`}
    >
      <div className="mx-auto max-w-6xl">
        <BreadcrumbTrail locale={locale} trail={[{ label: strings.pageTitle }]} />

        <header className="mb-7 md:mb-9 max-w-3xl">
          <h1 className="font-lcsDisplay font-extrabold text-3xl md:text-4xl text-lcs-teal leading-tight mb-2.5">
            {strings.pageTitle}
          </h1>
          <span aria-hidden="true" className="block w-16 h-1.5 rounded-full bg-lcs-coral mb-3.5" />
          <p className="font-lcsBody text-sm md:text-base text-lcs-teal/80 leading-relaxed">
            {strings.pageIntro}
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <ActivitySidebar
            heading={strings.filtersHeading}
            groups={facetGroups}
            basePath={basePath}
            spString={spString}
          />

          <div className="lg:col-span-9">
            <ActivityMobileFilters
              heading={strings.filtersHeading}
              groups={facetGroups}
              basePath={basePath}
              spString={spString}
            />

            <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
              <p className="font-lcsBody text-sm font-semibold text-lcs-teal/70">
                {total} {strings.resultsWord}
              </p>
              <ActivitySortControl
                heading={strings.sortHeading}
                options={sortOptions}
                current={filters.sort}
                basePath={basePath}
                spString={spString}
              />
            </div>

            <ActivityActiveChips chips={chips} clearAllHref={clearAllHref} clearAllLabel={strings.clearAll} />

            {pageRows.length === 0 ? (
              <ActivityEmptyState
                title={strings.emptyTitle}
                body={strings.emptyBody}
                clearAllHref={clearAllHref}
                clearAllLabel={strings.clearAll}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {pageRows.map((row) => (
                  <ActivityCatalogCard
                    key={row.id}
                    href={localePath(locale, "activities", row.slug[locale])}
                    tool={row.tool}
                    subject={deriveSubject(row.alignment.strand)}
                    title={shortTitle(row.page_title[locale])}
                    gradeLabel={gradeName(row.alignment.grade)}
                    code={row.alignment.code}
                    strandLabel={localizeStrand(row.alignment.strand, locale)}
                    category={strandKey(row.alignment.strand)}
                    tryItLabel={strings.tryItLink}
                    previewUrl={previewIds.has(row.id) ? `/mini-tools/previews/${row.id}.webp` : undefined}
                  />
                ))}
              </div>
            )}

            <Pagination
              locale={locale}
              currentPage={page}
              pageCount={pageCount}
              basePath={basePath}
              searchParamsString={spString}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
