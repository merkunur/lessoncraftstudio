"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

/**
 * Platform search box — typeahead over activities + manipulatives.
 *
 * Scope discipline (operator-locked 2026-05-21): does NOT index decks.
 * Placeholder + "no results" copy reflects this honestly ("Search
 * activities and tools…" not "Search topics, skills, and more…").
 *
 * Pattern follows LanguageSelector.tsx: custom state + click-outside
 * close + Esc key. No @radix-ui / @headlessui dependency (per
 * CLAUDE.md §10.3 add-dependency guard).
 *
 * Index loaded once per locale from /api/search-index?locale=<loc>.
 * Cached client-side in component state for the session.
 */

interface SearchEntry {
  id: string;
  type: "activity" | "manipulative";
  label: string;
  url: string;
  hint: string;
}

// Localized chrome strings — keys mirror the messages file (nav.search.*).
// Inlined here so the component is self-contained; identical shape to the
// LanguageSelector pattern. Migrate to next-intl if a second consumer appears.
const CHROME: Record<string, {
  placeholder: string;
  noResults: string;
  sectionActivities: string;
  sectionManipulatives: string;
  scopeNote: string;
  clearLabel: string;
}> = {
  en: {
    placeholder: "Search activities and tools…",
    noResults: "No matches",
    sectionActivities: "Activities",
    sectionManipulatives: "Tools",
    scopeNote: "Searches activities & tools only",
    clearLabel: "Clear search",
  },
  de: {
    placeholder: "Aufgaben und Werkzeuge suchen…",
    noResults: "Keine Treffer",
    sectionActivities: "Aufgaben",
    sectionManipulatives: "Werkzeuge",
    scopeNote: "Sucht nur in Aufgaben und Werkzeugen",
    clearLabel: "Suche leeren",
  },
  es: {
    placeholder: "Buscar actividades y herramientas…",
    noResults: "Sin resultados",
    sectionActivities: "Actividades",
    sectionManipulatives: "Herramientas",
    scopeNote: "Busca solo en actividades y herramientas",
    clearLabel: "Borrar búsqueda",
  },
  fr: {
    placeholder: "Rechercher activités et outils…",
    noResults: "Aucun résultat",
    sectionActivities: "Activités",
    sectionManipulatives: "Outils",
    scopeNote: "Recherche limitée aux activités et outils",
    clearLabel: "Effacer la recherche",
  },
  it: {
    placeholder: "Cerca attività e strumenti…",
    noResults: "Nessun risultato",
    sectionActivities: "Attività",
    sectionManipulatives: "Strumenti",
    scopeNote: "Cerca solo tra attività e strumenti",
    clearLabel: "Cancella ricerca",
  },
  pt: {
    placeholder: "Buscar atividades e ferramentas…",
    noResults: "Sem resultados",
    sectionActivities: "Atividades",
    sectionManipulatives: "Ferramentas",
    scopeNote: "Busca apenas em atividades e ferramentas",
    clearLabel: "Limpar busca",
  },
  nl: {
    placeholder: "Zoek activiteiten en hulpmiddelen…",
    noResults: "Geen resultaten",
    sectionActivities: "Activiteiten",
    sectionManipulatives: "Hulpmiddelen",
    scopeNote: "Zoekt alleen in activiteiten en hulpmiddelen",
    clearLabel: "Zoekopdracht wissen",
  },
  sv: {
    placeholder: "Sök aktiviteter och verktyg…",
    noResults: "Inga träffar",
    sectionActivities: "Aktiviteter",
    sectionManipulatives: "Verktyg",
    scopeNote: "Söker endast i aktiviteter och verktyg",
    clearLabel: "Rensa sökning",
  },
  da: {
    placeholder: "Søg aktiviteter og værktøjer…",
    noResults: "Ingen resultater",
    sectionActivities: "Aktiviteter",
    sectionManipulatives: "Værktøjer",
    scopeNote: "Søger kun i aktiviteter og værktøjer",
    clearLabel: "Ryd søgning",
  },
  no: {
    placeholder: "Søk aktiviteter og verktøy…",
    noResults: "Ingen treff",
    sectionActivities: "Aktiviteter",
    sectionManipulatives: "Verktøy",
    scopeNote: "Søker kun i aktiviteter og verktøy",
    clearLabel: "Tøm søk",
  },
  fi: {
    placeholder: "Etsi tehtäviä ja työkaluja…",
    noResults: "Ei tuloksia",
    sectionActivities: "Tehtävät",
    sectionManipulatives: "Työkalut",
    scopeNote: "Hakee vain tehtävistä ja työkaluista",
    clearLabel: "Tyhjennä haku",
  },
};

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreEntry(entry: SearchEntry, q: string, tokens: string[]): number {
  const label = normalize(entry.label);
  const hint = normalize(entry.hint);
  const haystack = label + " " + hint;
  if (!tokens.every((t) => haystack.includes(t))) return -1;

  let score = 0;
  if (label.startsWith(q)) score += 100;
  else if (label.includes(q)) score += 50;
  if (hint.includes(q)) score += 10;
  for (const t of tokens) {
    if (label.includes(t)) score += 5;
    if (hint.includes(t)) score += 1;
  }
  return score;
}

export function PlatformSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const t = CHROME[currentLocale] || CHROME.en;

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  // Locale-keyed cache of search entries. Replaces the prior one-way
  // `loaded: boolean` flag which prevented re-fetch on locale switch
  // (the LanguageSelector does client-side router.push, so this
  // component stays mounted across locale changes — without re-fetching,
  // the EN-loaded entries would persist into /de, /es, etc.).
  const [indexCache, setIndexCache] = useState<Record<string, SearchEntry[]>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch the index for the current locale whenever it changes. Cached
  // per-locale so re-visiting a previously-loaded locale doesn't refetch.
  useEffect(() => {
    if (indexCache[currentLocale]) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/search-index?locale=${encodeURIComponent(currentLocale)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setIndexCache((prev) => ({ ...prev, [currentLocale]: data.entries || [] }));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("[PlatformSearch] index load failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentLocale, indexCache]);

  // Current locale's entries (empty array until the fetch resolves).
  const index: SearchEntry[] = indexCache[currentLocale] || [];

  // Click-outside + Esc.
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Compute matches.
  const q = normalize(query);
  const tokens = q.split(" ").filter(Boolean);
  const results: SearchEntry[] = q
    ? index
        .map((e) => ({ e, s: scoreEntry(e, q, tokens) }))
        .filter((x) => x.s >= 0)
        .sort((a, b) => (b.s !== a.s ? b.s - a.s : a.e.label.localeCompare(b.e.label)))
        .slice(0, 10)
        .map((x) => x.e)
    : [];

  // Reset active index when results change.
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const activities = results.filter((r) => r.type === "activity");
  const tools = results.filter((r) => r.type === "manipulative");

  function navigateTo(entry: SearchEntry) {
    setIsOpen(false);
    setQuery("");
    router.push(entry.url);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIdx]) navigateTo(results[activeIdx]);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md"
      role="search"
    >
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={isOpen && query.length > 0}
          aria-controls="platform-search-results"
          aria-autocomplete="list"
          placeholder={t.placeholder}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={onKeyDown}
          className="w-full pl-10 pr-9 py-2 bg-white border border-cream-300 rounded-full text-sm text-ink-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent shadow-sm"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label={t.clearLabel}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-500 hover:text-ink-900 rounded-full hover:bg-cream-200"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {isOpen && query.length > 0 && (
        <div
          id="platform-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-white border border-cream-300 rounded-2xl shadow-xl z-50 max-h-[420px] overflow-y-auto"
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-stone-700 mb-1">{t.noResults}</p>
              <p className="text-xs text-stone-500">{t.scopeNote}</p>
            </div>
          ) : (
            <>
              {activities.length > 0 && (
                <div>
                  <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {t.sectionActivities}
                  </div>
                  <ul className="pb-1">
                    {activities.map((r) => {
                      const idx = results.indexOf(r);
                      const isActive = idx === activeIdx;
                      return (
                        <li key={r.id} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveIdx(idx)}
                            onClick={() => navigateTo(r)}
                            className={`w-full text-left px-4 py-2 flex flex-col gap-0.5 transition-colors ${
                              isActive ? "bg-teal-50" : "hover:bg-cream-100"
                            }`}
                          >
                            <span className="text-sm font-medium text-ink-900 leading-tight">{r.label}</span>
                            <span className="text-xs text-stone-600">{r.hint}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {tools.length > 0 && (
                <div className={activities.length > 0 ? "border-t border-cream-300" : ""}>
                  <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {t.sectionManipulatives}
                  </div>
                  <ul className="pb-2">
                    {tools.map((r) => {
                      const idx = results.indexOf(r);
                      const isActive = idx === activeIdx;
                      return (
                        <li key={r.id} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveIdx(idx)}
                            onClick={() => navigateTo(r)}
                            className={`w-full text-left px-4 py-2 flex flex-col gap-0.5 transition-colors ${
                              isActive ? "bg-teal-50" : "hover:bg-cream-100"
                            }`}
                          >
                            <span className="text-sm font-medium text-ink-900 leading-tight">{r.label}</span>
                            <span className="text-xs text-stone-600">{r.hint}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <div className="px-4 py-2 border-t border-cream-300 bg-cream-50 text-xs text-stone-500">
                {t.scopeNote}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
