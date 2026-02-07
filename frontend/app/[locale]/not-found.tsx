import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | LessonCraftStudio',
  robots: {
    index: false,
    follow: false,
  },
};

// Localized 404 messages
const notFoundMessages: Record<string, {
  title: string;
  description: string;
  homepage: string;
  apps: string;
  blog: string;
  help: string;
  contact: string;
}> = {
  en: {
    title: '404 - Page Not Found',
    description: "Sorry, we couldn't find the page you're looking for. The page may have been moved or no longer exists.",
    homepage: 'Go to Homepage',
    apps: 'Browse All Apps',
    blog: 'Read Our Blog',
    help: 'Need help?',
    contact: 'Contact us',
  },
  de: {
    title: '404 - Seite nicht gefunden',
    description: 'Entschuldigung, wir konnten die gesuchte Seite nicht finden. Die Seite wurde moglicherweise verschoben oder existiert nicht mehr.',
    homepage: 'Zur Startseite',
    apps: 'Alle Apps durchsuchen',
    blog: 'Unseren Blog lesen',
    help: 'Brauchen Sie Hilfe?',
    contact: 'Kontaktieren Sie uns',
  },
  fr: {
    title: '404 - Page non trouvee',
    description: "Desolee, nous n'avons pas pu trouver la page que vous cherchez. La page a peut-etre ete deplacee ou n'existe plus.",
    homepage: "Aller a l'accueil",
    apps: 'Parcourir toutes les applications',
    blog: 'Lire notre blog',
    help: "Besoin d'aide?",
    contact: 'Contactez-nous',
  },
  es: {
    title: '404 - Pagina no encontrada',
    description: 'Lo sentimos, no pudimos encontrar la pagina que buscas. Es posible que la pagina se haya movido o ya no exista.',
    homepage: 'Ir al inicio',
    apps: 'Ver todas las aplicaciones',
    blog: 'Leer nuestro blog',
    help: 'Necesitas ayuda?',
    contact: 'Contactanos',
  },
  it: {
    title: '404 - Pagina non trovata',
    description: 'Spiacenti, non siamo riusciti a trovare la pagina che stavi cercando. La pagina potrebbe essere stata spostata o non esiste piu.',
    homepage: 'Vai alla home',
    apps: 'Sfoglia tutte le app',
    blog: 'Leggi il nostro blog',
    help: 'Hai bisogno di aiuto?',
    contact: 'Contattaci',
  },
  pt: {
    title: '404 - Pagina nao encontrada',
    description: 'Desculpe, nao conseguimos encontrar a pagina que voce esta procurando. A pagina pode ter sido movida ou nao existe mais.',
    homepage: 'Ir para a pagina inicial',
    apps: 'Ver todos os aplicativos',
    blog: 'Ler nosso blog',
    help: 'Precisa de ajuda?',
    contact: 'Entre em contato',
  },
  nl: {
    title: '404 - Pagina niet gevonden',
    description: 'Sorry, we konden de pagina die je zoekt niet vinden. De pagina is mogelijk verplaatst of bestaat niet meer.',
    homepage: 'Naar de startpagina',
    apps: 'Alle apps bekijken',
    blog: 'Lees onze blog',
    help: 'Hulp nodig?',
    contact: 'Neem contact op',
  },
  sv: {
    title: '404 - Sidan hittades inte',
    description: 'Tyvarr kunde vi inte hitta sidan du letar efter. Sidan kan ha flyttats eller existerar inte langre.',
    homepage: 'Ga till startsidan',
    apps: 'Blaeddra bland alla appar',
    blog: 'Laes var blogg',
    help: 'Behover du hjalp?',
    contact: 'Kontakta oss',
  },
  da: {
    title: '404 - Side ikke fundet',
    description: 'Beklager, vi kunne ikke finde den side, du leder efter. Siden er muligvis blevet flyttet eller eksisterer ikke laengere.',
    homepage: 'Ga til forsiden',
    apps: 'Gennemse alle apps',
    blog: 'Laes vores blog',
    help: 'Brug for hjaelp?',
    contact: 'Kontakt os',
  },
  no: {
    title: '404 - Siden ble ikke funnet',
    description: 'Beklager, vi kunne ikke finne siden du leter etter. Siden kan ha blitt flyttet eller eksisterer ikke lenger.',
    homepage: 'Ga til hjemmesiden',
    apps: 'Bla gjennom alle apper',
    blog: 'Les bloggen var',
    help: 'Trenger du hjelp?',
    contact: 'Kontakt oss',
  },
  fi: {
    title: '404 - Sivua ei loytynyt',
    description: 'Valitettavasti emme loytaneet etsimaaasi sivua. Sivu on ehka siirretty tai sita ei ole enaa olemassa.',
    homepage: 'Siirry etusivulle',
    apps: 'Selaa kaikkia sovelluksia',
    blog: 'Lue blogiamme',
    help: 'Tarvitsetko apua?',
    contact: 'Ota yhteytta',
  },
};

export default function LocaleNotFound() {
  // This is a Server Component, so we need to handle locale detection differently
  // For now, we'll use English as the default since we can't access params directly in not-found
  const messages = notFoundMessages.en;
  const locale = 'en';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <span className="text-6xl" role="img" aria-label="confused face">
            🤔
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {messages.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {messages.description}
        </p>

        <div className="space-y-3">
          <Link
            href={`/${locale}`}
            className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {messages.homepage}
          </Link>

          <Link
            href={`/${locale}/apps`}
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {messages.apps}
          </Link>

          <Link
            href={`/${locale}/blog`}
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {messages.blog}
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          {messages.help}{' '}
          <Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">
            {messages.contact}
          </Link>
        </p>
      </div>
    </div>
  );
}
