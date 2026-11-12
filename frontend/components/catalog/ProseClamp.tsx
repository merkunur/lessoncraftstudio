/**
 * The introduction of a topic page, shown as its first three lines with a "Read more" control (Daily Teaching
 * System, Part 11.6: the first worksheet of a topic page stood 1,480 px down on a desktop screen and 2,358 px on a
 * phone, under a text most visitors scroll past).
 *
 * Nothing is taken out of the page: the whole text is in the HTML, in the same place, and a search engine reads all
 * of it. The control is a checkbox and a label, so it works without JavaScript and the page stays a server page.
 */
const MORE: Record<string, string> = {
  en: 'Read more', de: 'Weiterlesen', fr: 'Lire la suite', es: 'Leer más', pt: 'Ler mais', it: 'Leggi tutto',
  nl: 'Lees meer', sv: 'Läs mer', da: 'Læs mere', no: 'Les mer', fi: 'Lue lisää',
};

export default function ProseClamp({ locale, id, children }: { locale: string; id: string; children: React.ReactNode }) {
  return (
    <div className="lcs-prose-clamp">
      <input type="checkbox" id={id} className="peer sr-only" />
      <div className="line-clamp-3 peer-checked:line-clamp-none">{children}</div>
      <label
        htmlFor={id}
        className="mt-1 inline-flex min-h-[44px] cursor-pointer items-center text-[15px] font-semibold text-[#146B5E] underline underline-offset-2 peer-checked:hidden peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[#146B5E] print:hidden"
      >
        {MORE[locale] || MORE.en}
      </label>
    </div>
  );
}
