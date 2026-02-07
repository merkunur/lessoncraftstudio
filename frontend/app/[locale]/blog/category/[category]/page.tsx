import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Breadcrumb from '@/components/Breadcrumb';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import RelatedProducts from '@/components/blog/RelatedProducts';
import type { SupportedLocale } from '@/config/product-page-slugs';

// Enable ISR - revalidate every 30 minutes
export const revalidate = 1800;

const POSTS_PER_PAGE = 12;

// Valid category IDs
const VALID_CATEGORIES = [
  'teaching-resources',
  'worksheet-tips',
  'educational-activities',
  'learning-strategies',
  'curriculum-guides',
  'parent-resources',
  'seasonal-content'
];

// Category translations for display and SEO
const CATEGORY_TRANSLATIONS: Record<string, Record<string, { name: string; description: string }>> = {
  'teaching-resources': {
    en: { name: 'Teaching Resources', description: 'Expert teaching strategies, classroom management tips, and educational resources for teachers.' },
    de: { name: 'Unterrichtsmaterialien', description: 'Expertentipps für den Unterricht, Klassenführung und Bildungsressourcen für Lehrer.' },
    fr: { name: 'Ressources Pédagogiques', description: 'Stratégies d\'enseignement expertes, conseils de gestion de classe et ressources éducatives.' },
    es: { name: 'Recursos Didácticos', description: 'Estrategias de enseñanza expertas, consejos de gestión de aula y recursos educativos.' },
    pt: { name: 'Recursos de Ensino', description: 'Estratégias de ensino especializadas, dicas de gestão de sala de aula e recursos educacionais.' },
    it: { name: 'Risorse Didattiche', description: 'Strategie di insegnamento esperte, consigli per la gestione della classe e risorse educative.' },
    nl: { name: 'Onderwijsmiddelen', description: 'Deskundige onderwijsstrategieën, tips voor klasbeheer en educatieve bronnen voor leraren.' },
    sv: { name: 'Undervisningsresurser', description: 'Expertstrategier för undervisning, tips för klassrumsledning och utbildningsresurser.' },
    da: { name: 'Undervisningsressourcer', description: 'Ekspertstrategier for undervisning, tips til klasseledelse og uddannelsesressourcer.' },
    no: { name: 'Undervisningsressurser', description: 'Ekspertstrategier for undervisning, tips for klasseledelse og utdanningsressurser.' },
    fi: { name: 'Opetusresurssit', description: 'Asiantuntijastrategioita opetukseen, luokanhallintavinkkejä ja koulutusresursseja.' }
  },
  'worksheet-tips': {
    en: { name: 'Worksheet Tips', description: 'Design tips and best practices for creating effective educational worksheets.' },
    de: { name: 'Arbeitsblatt-Tipps', description: 'Designtipps und bewährte Methoden für die Erstellung effektiver Arbeitsblätter.' },
    fr: { name: 'Conseils sur les Fiches', description: 'Conseils de conception et meilleures pratiques pour créer des fiches efficaces.' },
    es: { name: 'Consejos de Fichas', description: 'Consejos de diseño y mejores prácticas para crear fichas educativas efectivas.' },
    pt: { name: 'Dicas de Planilhas', description: 'Dicas de design e melhores práticas para criar planilhas educacionais eficazes.' },
    it: { name: 'Suggerimenti per Schede', description: 'Consigli di design e best practice per creare schede educative efficaci.' },
    nl: { name: 'Werkblad Tips', description: 'Ontwerptips en best practices voor het maken van effectieve werkbladen.' },
    sv: { name: 'Arbetsbladstips', description: 'Designtips och bästa praxis för att skapa effektiva arbetsblad.' },
    da: { name: 'Arbejdsark Tips', description: 'Designtips og bedste praksis for at skabe effektive arbejdsark.' },
    no: { name: 'Arbeidsark Tips', description: 'Designtips og beste praksis for å lage effektive arbeidsark.' },
    fi: { name: 'Työarkkivinkit', description: 'Suunnitteluvinkkejä ja parhaita käytäntöjä tehokkaiden työarkkien luomiseen.' }
  },
  'educational-activities': {
    en: { name: 'Educational Activities', description: 'Fun and engaging learning activities for children of all ages.' },
    de: { name: 'Bildungsaktivitäten', description: 'Unterhaltsame und ansprechende Lernaktivitäten für Kinder jeden Alters.' },
    fr: { name: 'Activités Éducatives', description: 'Activités d\'apprentissage amusantes et engageantes pour enfants de tous âges.' },
    es: { name: 'Actividades Educativas', description: 'Actividades de aprendizaje divertidas y atractivas para niños de todas las edades.' },
    pt: { name: 'Atividades Educacionais', description: 'Atividades de aprendizagem divertidas e envolventes para crianças de todas as idades.' },
    it: { name: 'Attività Educative', description: 'Attività di apprendimento divertenti e coinvolgenti per bambini di tutte le età.' },
    nl: { name: 'Educatieve Activiteiten', description: 'Leuke en boeiende leeractiviteiten voor kinderen van alle leeftijden.' },
    sv: { name: 'Utbildningsaktiviteter', description: 'Roliga och engagerande läraktiviteter för barn i alla åldrar.' },
    da: { name: 'Uddannelsesaktiviteter', description: 'Sjove og engagerende læringsaktiviteter til børn i alle aldre.' },
    no: { name: 'Utdanningsaktiviteter', description: 'Morsomme og engasjerende læringsaktiviteter for barn i alle aldre.' },
    fi: { name: 'Koulutustoimintaa', description: 'Hauskoja ja mukaansatempaavia oppimisaktiviteetteja kaiken ikäisille lapsille.' }
  },
  'learning-strategies': {
    en: { name: 'Learning Strategies', description: 'Evidence-based learning techniques and study strategies for better outcomes.' },
    de: { name: 'Lernstrategien', description: 'Evidenzbasierte Lerntechniken und Studienstrategien für bessere Ergebnisse.' },
    fr: { name: 'Stratégies d\'Apprentissage', description: 'Techniques d\'apprentissage et stratégies d\'étude basées sur des preuves.' },
    es: { name: 'Estrategias de Aprendizaje', description: 'Técnicas de aprendizaje basadas en evidencia y estrategias de estudio.' },
    pt: { name: 'Estratégias de Aprendizagem', description: 'Técnicas de aprendizagem baseadas em evidências e estratégias de estudo.' },
    it: { name: 'Strategie di Apprendimento', description: 'Tecniche di apprendimento basate su evidenze e strategie di studio.' },
    nl: { name: 'Leerstrategieën', description: 'Evidentiegerichte leertechnieken en studiestrategieën voor betere resultaten.' },
    sv: { name: 'Inlärningsstrategier', description: 'Evidensbaserade inlärningstekniker och studiestrategier för bättre resultat.' },
    da: { name: 'Læringsstrategier', description: 'Evidensbaserede læringsteknikker og studiestrategier for bedre resultater.' },
    no: { name: 'Læringsstrategier', description: 'Evidensbaserte læringsteknikker og studiestrategier for bedre resultater.' },
    fi: { name: 'Oppimisstrategiat', description: 'Näyttöön perustuvat oppimistekniikat ja opiskelustrategiat parempiin tuloksiin.' }
  },
  'curriculum-guides': {
    en: { name: 'Curriculum Guides', description: 'Comprehensive curriculum guides and lesson planning resources.' },
    de: { name: 'Lehrplan-Leitfäden', description: 'Umfassende Lehrplanleitfäden und Unterrichtsplanungsressourcen.' },
    fr: { name: 'Guides du Programme', description: 'Guides de programme complets et ressources de planification de cours.' },
    es: { name: 'Guías del Currículo', description: 'Guías completas del currículo y recursos de planificación de lecciones.' },
    pt: { name: 'Guias de Currículo', description: 'Guias de currículo abrangentes e recursos de planejamento de aulas.' },
    it: { name: 'Guide del Curriculum', description: 'Guide complete del curriculum e risorse per la pianificazione delle lezioni.' },
    nl: { name: 'Curriculumgidsen', description: 'Uitgebreide curriculumgidsen en bronnen voor lesplanning.' },
    sv: { name: 'Läroplansguider', description: 'Omfattande läroplansguider och resurser för lektionsplanering.' },
    da: { name: 'Læseplansguider', description: 'Omfattende læseplansguider og ressourcer til lektionsplanlægning.' },
    no: { name: 'Læreplansveiledninger', description: 'Omfattende læreplansveiledninger og ressurser for leksjonsplanlegging.' },
    fi: { name: 'Opetussuunnitelmaoppaat', description: 'Kattavat opetussuunnitelmaoppaat ja oppituntisuunnitteluresurssit.' }
  },
  'parent-resources': {
    en: { name: 'Parent Resources', description: 'Guides and tips for parents supporting children\'s education at home.' },
    de: { name: 'Elternressourcen', description: 'Leitfäden und Tipps für Eltern zur Unterstützung der Bildung zu Hause.' },
    fr: { name: 'Ressources pour Parents', description: 'Guides et conseils pour les parents soutenant l\'éducation des enfants à la maison.' },
    es: { name: 'Recursos para Padres', description: 'Guías y consejos para padres que apoyan la educación de sus hijos en casa.' },
    pt: { name: 'Recursos para Pais', description: 'Guias e dicas para pais que apoiam a educação dos filhos em casa.' },
    it: { name: 'Risorse per Genitori', description: 'Guide e consigli per i genitori che supportano l\'istruzione dei bambini a casa.' },
    nl: { name: 'Ouderhulpmiddelen', description: 'Gidsen en tips voor ouders die de educatie van kinderen thuis ondersteunen.' },
    sv: { name: 'Föräldraresurser', description: 'Guider och tips för föräldrar som stödjer barns utbildning hemma.' },
    da: { name: 'Forældreressourcer', description: 'Guider og tips til forældre, der støtter børns uddannelse derhjemme.' },
    no: { name: 'Foreldreressurser', description: 'Guider og tips for foreldre som støtter barns utdanning hjemme.' },
    fi: { name: 'Vanhempien Resurssit', description: 'Oppaita ja vinkkejä vanhemmille, jotka tukevat lasten koulutusta kotona.' }
  },
  'seasonal-content': {
    en: { name: 'Seasonal Content', description: 'Holiday-themed activities and seasonal educational resources.' },
    de: { name: 'Saisonale Inhalte', description: 'Feiertagsthemen-Aktivitäten und saisonale Bildungsressourcen.' },
    fr: { name: 'Contenu Saisonnier', description: 'Activités thématiques de vacances et ressources éducatives saisonnières.' },
    es: { name: 'Contenido Estacional', description: 'Actividades temáticas de festividades y recursos educativos estacionales.' },
    pt: { name: 'Conteúdo Sazonal', description: 'Atividades temáticas de feriados e recursos educacionais sazonais.' },
    it: { name: 'Contenuti Stagionali', description: 'Attività a tema festivo e risorse educative stagionali.' },
    nl: { name: 'Seizoensinhoud', description: 'Vakantie-thema activiteiten en seizoensgebonden educatieve bronnen.' },
    sv: { name: 'Säsongsinnehåll', description: 'Helgtema-aktiviteter och säsongsbetonade utbildningsresurser.' },
    da: { name: 'Sæsonindhold', description: 'Ferietema-aktiviteter og sæsonbestemte uddannelsesressourcer.' },
    no: { name: 'Sesonginnhold', description: 'Ferietema-aktiviteter og sesongbaserte utdanningsressurser.' },
    fi: { name: 'Kauden Sisältö', description: 'Juhla-aiheisia aktiviteetteja ja kausiluonteisia koulutusresursseja.' }
  }
};

// Category intro text - 200-300 word descriptions for SEO content depth
const CATEGORY_INTROS: Record<string, Record<string, string>> = {
  'teaching-resources': {
    en: 'Our teaching resources collection brings together expert-written guides that help educators work more effectively. From classroom management techniques to lesson planning strategies, these articles provide actionable advice you can implement immediately. Whether you teach kindergarten or third grade, you will find tips for engaging students, organizing materials, and saving time on preparation. Many articles include free downloadable templates and worksheets you can use with our 33 professional generators.',
    de: 'Unsere Sammlung von Unterrichtsmaterialien vereint von Experten verfasste Anleitungen, die P\u00e4dagogen effektiver arbeiten lassen. Von Klassenzimmermanagement bis Unterrichtsplanung bieten diese Artikel umsetzbare Ratschl\u00e4ge. Viele Artikel enthalten kostenlose Vorlagen, die Sie mit unseren 33 Generatoren nutzen k\u00f6nnen.',
    fr: 'Notre collection de ressources p\u00e9dagogiques rassemble des guides \u00e9crits par des experts pour aider les enseignants \u00e0 travailler plus efficacement. De la gestion de classe \u00e0 la planification des cours, ces articles fournissent des conseils concrets. Beaucoup incluent des mod\u00e8les gratuits utilisables avec nos 33 g\u00e9n\u00e9rateurs.',
    es: 'Nuestra colecci\u00f3n de recursos did\u00e1cticos re\u00fane gu\u00edas escritas por expertos para ayudar a los educadores a trabajar m\u00e1s eficazmente. Desde t\u00e9cnicas de gesti\u00f3n del aula hasta estrategias de planificaci\u00f3n, estos art\u00edculos ofrecen consejos pr\u00e1cticos. Muchos incluyen plantillas gratuitas para usar con nuestros 33 generadores.',
    pt: 'Nossa cole\u00e7\u00e3o de recursos de ensino re\u00fane guias escritos por especialistas para ajudar educadores a trabalhar de forma mais eficaz. Do gerenciamento de sala de aula ao planejamento de aulas, estes artigos oferecem conselhos pr\u00e1ticos. Muitos incluem modelos gratuitos para usar com nossos 33 geradores.',
    it: 'La nostra collezione di risorse didattiche riunisce guide scritte da esperti per aiutare gli educatori a lavorare in modo pi\u00f9 efficace. Dalla gestione della classe alla pianificazione delle lezioni, questi articoli forniscono consigli pratici. Molti includono modelli gratuiti da usare con i nostri 33 generatori.',
    nl: 'Onze collectie onderwijsmiddelen brengt door experts geschreven gidsen samen die docenten effectiever helpen werken. Van klasbeheer tot lesplanning, deze artikelen bieden praktisch advies. Veel artikelen bevatten gratis sjablonen voor gebruik met onze 33 generatoren.',
    sv: 'V\u00e5r samling av undervisningsresurser samlar expertskrivna guider som hj\u00e4lper l\u00e4rare att arbeta mer effektivt. Fr\u00e5n klassrumsledning till lektionsplanering ger dessa artiklar praktiska r\u00e5d. M\u00e5nga inkluderar gratis mallar f\u00f6r anv\u00e4ndning med v\u00e5ra 33 generatorer.',
    da: 'Vores samling af undervisningsressourcer samler ekspertskrevne guider, der hj\u00e6lper l\u00e6rere med at arbejde mere effektivt. Fra klasseledelse til lektionsplanl\u00e6gning giver disse artikler praktiske r\u00e5d. Mange inkluderer gratis skabeloner til brug med vores 33 generatorer.',
    no: 'V\u00e5r samling av undervisningsressurser samler ekspertskrevne guider som hjelper l\u00e6rere \u00e5 jobbe mer effektivt. Fra klasseledelse til leksjonsplanlegging gir disse artiklene praktiske r\u00e5d. Mange inkluderer gratis maler for bruk med v\u00e5re 33 generatorer.',
    fi: 'Opetusresurssikokoelmamme kokoaa asiantuntijoiden kirjoittamia oppaita, jotka auttavat opettajia ty\u00f6skentelem\u00e4\u00e4n tehokkaammin. Luokanhallinnasta oppituntisuunnitteluun n\u00e4m\u00e4 artikkelit tarjoavat k\u00e4yt\u00e4nn\u00f6n neuvoja. Monet sis\u00e4lt\u00e4v\u00e4t ilmaisia malleja k\u00e4ytett\u00e4v\u00e4ksi 33 generaattorimme kanssa.'
  },
  'worksheet-tips': {
    en: 'Master the art of worksheet design with our expert tips and best practices. Learn how to create visually appealing, educationally effective worksheets that keep students engaged. These articles cover everything from choosing the right fonts and layouts to structuring problems for maximum learning impact. Discover how to use our 33 generators to create professional-quality materials in minutes instead of hours.',
    de: 'Meistern Sie die Kunst der Arbeitsblattgestaltung mit unseren Expertentipps und bew\u00e4hrten Methoden. Erfahren Sie, wie Sie visuell ansprechende und p\u00e4dagogisch effektive Arbeitsbl\u00e4tter erstellen. Entdecken Sie, wie Sie mit unseren 33 Generatoren professionelle Materialien in Minuten erstellen.',
    fr: 'Ma\u00eetrisez l\'art de la conception de fiches avec nos conseils d\'experts. Apprenez \u00e0 cr\u00e9er des fiches visuellement attrayantes et p\u00e9dagogiquement efficaces. D\u00e9couvrez comment utiliser nos 33 g\u00e9n\u00e9rateurs pour cr\u00e9er des mat\u00e9riaux professionnels en quelques minutes.',
    es: 'Domine el arte del dise\u00f1o de fichas con nuestros consejos expertos. Aprenda a crear fichas visualmente atractivas y educativamente efectivas. Descubra c\u00f3mo usar nuestros 33 generadores para crear materiales profesionales en minutos.',
    pt: 'Domine a arte do design de atividades com nossas dicas de especialistas. Aprenda a criar atividades visualmente atraentes e educacionalmente eficazes. Descubra como usar nossos 33 geradores para criar materiais profissionais em minutos.',
    it: 'Padroneggia l\'arte del design delle schede con i nostri consigli esperti. Impara a creare schede visivamente attraenti ed educativamente efficaci. Scopri come usare i nostri 33 generatori per creare materiali professionali in pochi minuti.',
    nl: 'Beheers de kunst van werkbladontwerp met onze experttips. Leer hoe u visueel aantrekkelijke en educatief effectieve werkbladen maakt. Ontdek hoe u met onze 33 generatoren professionele materialen in minuten kunt maken.',
    sv: 'Bemstra konsten att designa arbetsblad med v\u00e5ra experttips. L\u00e4r dig skapa visuellt tilltalande och pedagogiskt effektiva arbetsblad. Uppt\u00e4ck hur du anv\u00e4nder v\u00e5ra 33 generatorer f\u00f6r att skapa professionella material p\u00e5 minuter.',
    da: 'Behersk kunsten at designe arbejdsark med vores eksperttips. L\u00e6r at skabe visuelt tiltalende og p\u00e6dagogisk effektive arbejdsark. Opdag hvordan du bruger vores 33 generatorer til at skabe professionelle materialer p\u00e5 minutter.',
    no: 'Behersk kunsten \u00e5 designe arbeidsark med v\u00e5re eksperttips. L\u00e6r \u00e5 lage visuelt tiltalende og pedagogisk effektive arbeidsark. Oppdag hvordan du bruker v\u00e5re 33 generatorer til \u00e5 lage profesjonelle materialer p\u00e5 minutter.',
    fi: 'Hallitse ty\u00f6arkkien suunnittelun taito asiantuntijavinkkiemme avulla. Opi luomaan visuaalisesti houkuttelevia ja opetuksellisesti tehokkaita ty\u00f6arkkeja. Tutustu siihen, miten 33 generaattoriamme auttavat luomaan ammattimaisia materiaaleja minuuteissa.'
  },
  'educational-activities': {
    en: 'Explore creative, engaging learning activities designed for children of all ages. From hands-on crafts to printable games, these articles provide ready-to-use ideas that make learning fun. Each activity targets specific developmental skills while keeping young learners motivated and excited about education. Pair these activities with worksheets from our 33 generators for a complete learning experience.',
    de: 'Entdecken Sie kreative Lernaktivit\u00e4ten f\u00fcr Kinder jeden Alters. Von Bastelarbeiten bis zu druckbaren Spielen bieten diese Artikel sofort umsetzbare Ideen. Kombinieren Sie diese Aktivit\u00e4ten mit Arbeitsbl\u00e4ttern aus unseren 33 Generatoren.',
    fr: 'Explorez des activit\u00e9s d\'apprentissage cr\u00e9atives et engageantes pour les enfants de tous \u00e2ges. Des bricolages aux jeux imprimables, ces articles fournissent des id\u00e9es pr\u00eates \u00e0 l\'emploi. Associez ces activit\u00e9s aux fiches de nos 33 g\u00e9n\u00e9rateurs.',
    es: 'Explore actividades de aprendizaje creativas y atractivas para ni\u00f1os de todas las edades. Desde manualidades hasta juegos imprimibles, estos art\u00edculos proporcionan ideas listas para usar. Combine estas actividades con fichas de nuestros 33 generadores.',
    pt: 'Explore atividades de aprendizagem criativas e envolventes para crian\u00e7as de todas as idades. De artesanato a jogos imprim\u00edveis, estes artigos fornecem ideias prontas para uso. Combine estas atividades com fichas dos nossos 33 geradores.',
    it: 'Esplora attivit\u00e0 di apprendimento creative e coinvolgenti per bambini di tutte le et\u00e0. Dal fai-da-te ai giochi stampabili, questi articoli forniscono idee pronte all\'uso. Abbina queste attivit\u00e0 alle schede dei nostri 33 generatori.',
    nl: 'Ontdek creatieve leeractiviteiten voor kinderen van alle leeftijden. Van knutselen tot printbare spelletjes, deze artikelen bieden kant-en-klare idee\u00ebn. Combineer deze activiteiten met werkbladen van onze 33 generatoren.',
    sv: 'Utforska kreativa l\u00e4rande aktiviteter f\u00f6r barn i alla \u00e5ldrar. Fr\u00e5n pyssel till utskrivbara spel ger dessa artiklar f\u00e4rdiga id\u00e9er. Kombinera dessa aktiviteter med arbetsblad fr\u00e5n v\u00e5ra 33 generatorer.',
    da: 'Udforsk kreative l\u00e6ringsaktiviteter til b\u00f8rn i alle aldre. Fra h\u00e5ndarbejde til printbare spil giver disse artikler f\u00e6rdige id\u00e9er. Kombiner disse aktiviteter med arbejdsark fra vores 33 generatorer.',
    no: 'Utforsk kreative l\u00e6ringsaktiviteter for barn i alle aldre. Fra h\u00e5ndverk til utskrivbare spill gir disse artiklene ferdige ideer. Kombiner disse aktivitetene med arbeidsark fra v\u00e5re 33 generatorer.',
    fi: 'Tutustu luoviin oppimisaktiviteetteihin kaiken ik\u00e4isille lapsille. Askartelusta tulostettaviin peleihin n\u00e4m\u00e4 artikkelit tarjoavat valmiita ideoita. Yhdist\u00e4 n\u00e4m\u00e4 aktiviteetit 33 generaattorimme ty\u00f6arkkeihin.'
  },
  'learning-strategies': {
    en: 'Discover evidence-based learning techniques and study strategies that produce measurable results. These articles draw on educational research to provide practical methods for improving student outcomes. Learn about spaced repetition, active recall, differentiated instruction, and other proven approaches that transform how children learn and retain information.',
    de: 'Entdecken Sie evidenzbasierte Lerntechniken und Studienstrategien. Diese Artikel st\u00fctzen sich auf Bildungsforschung und bieten praktische Methoden zur Verbesserung der Sch\u00fclerergebnisse.',
    fr: 'D\u00e9couvrez des techniques d\'apprentissage bas\u00e9es sur des preuves et des strat\u00e9gies d\'\u00e9tude. Ces articles s\'appuient sur la recherche \u00e9ducative pour fournir des m\u00e9thodes pratiques d\'am\u00e9lioration des r\u00e9sultats.',
    es: 'Descubra t\u00e9cnicas de aprendizaje basadas en evidencia y estrategias de estudio. Estos art\u00edculos se basan en la investigaci\u00f3n educativa para proporcionar m\u00e9todos pr\u00e1cticos de mejora de resultados.',
    pt: 'Descubra t\u00e9cnicas de aprendizagem baseadas em evid\u00eancias e estrat\u00e9gias de estudo. Estes artigos baseiam-se em pesquisa educacional para fornecer m\u00e9todos pr\u00e1ticos de melhoria de resultados.',
    it: 'Scopri tecniche di apprendimento basate su evidenze e strategie di studio. Questi articoli si basano sulla ricerca educativa per fornire metodi pratici di miglioramento dei risultati.',
    nl: 'Ontdek evidence-based leertechnieken en studiestrategieen. Deze artikelen steunen op onderwijsonderzoek om praktische methoden voor betere resultaten te bieden.',
    sv: 'Uppt\u00e4ck evidensbaserade inl\u00e4rningstekniker och studiestrategier. Dessa artiklar bygger p\u00e5 utbildningsforskning f\u00f6r att ge praktiska metoder f\u00f6r b\u00e4ttre resultat.',
    da: 'Opdag evidensbaserede l\u00e6ringsteknikker og studiestrategier. Disse artikler bygger p\u00e5 uddannelsesforskning for at give praktiske metoder til bedre resultater.',
    no: 'Oppdag evidensbaserte l\u00e6ringsteknikker og studiestrategier. Disse artiklene bygger p\u00e5 utdanningsforskning for \u00e5 gi praktiske metoder for bedre resultater.',
    fi: 'Tutustu n\u00e4ytt\u00f6\u00f6n perustuviin oppimistekniikoihin ja opiskelustrategioihin. N\u00e4m\u00e4 artikkelit perustuvat koulutustutkimukseen tarjoten k\u00e4yt\u00e4nn\u00f6n menetelmi\u00e4 parempiin tuloksiin.'
  },
  'curriculum-guides': {
    en: 'Access comprehensive curriculum guides and lesson planning resources aligned with educational standards. These articles help you map out effective learning pathways for your students. From weekly planning templates to year-long curriculum overviews, find the structure you need to deliver quality education consistently.',
    de: 'Greifen Sie auf umfassende Lehrplanleitf\u00e4den und Unterrichtsplanungsressourcen zu. Diese Artikel helfen Ihnen, effektive Lernwege f\u00fcr Ihre Sch\u00fcler zu planen.',
    fr: 'Acc\u00e9dez \u00e0 des guides de programme complets et des ressources de planification de cours. Ces articles vous aident \u00e0 tracer des parcours d\'apprentissage efficaces pour vos \u00e9l\u00e8ves.',
    es: 'Acceda a gu\u00edas de curr\u00edculo completas y recursos de planificaci\u00f3n de lecciones. Estos art\u00edculos le ayudan a trazar caminos de aprendizaje efectivos para sus estudiantes.',
    pt: 'Acesse guias de curr\u00edculo abrangentes e recursos de planejamento de aulas. Estes artigos ajudam voc\u00ea a tra\u00e7ar caminhos de aprendizagem eficazes para seus alunos.',
    it: 'Accedi a guide del curriculum complete e risorse per la pianificazione delle lezioni. Questi articoli ti aiutano a tracciare percorsi di apprendimento efficaci per i tuoi studenti.',
    nl: 'Toegang tot uitgebreide curriculumgidsen en bronnen voor lesplanning. Deze artikelen helpen u effectieve leerpaden voor uw leerlingen uit te stippelen.',
    sv: 'F\u00e5 tillg\u00e5ng till omfattande l\u00e4roplansguider och resurser f\u00f6r lektionsplanering. Dessa artiklar hj\u00e4lper dig att kartl\u00e4gga effektiva l\u00e4rv\u00e4gar f\u00f6r dina elever.',
    da: 'F\u00e5 adgang til omfattende l\u00e6seplansguider og ressourcer til lektionsplanl\u00e6gning. Disse artikler hj\u00e6lper dig med at planl\u00e6gge effektive l\u00e6ringsveje for dine elever.',
    no: 'F\u00e5 tilgang til omfattende l\u00e6replansveiledninger og ressurser for leksjonsplanlegging. Disse artiklene hjelper deg med \u00e5 kartlegge effektive l\u00e6ringsveier for elevene dine.',
    fi: 'Tutustu kattaviin opetussuunnitelmaoppaisiin ja oppituntisuunnitteluresursseihin. N\u00e4m\u00e4 artikkelit auttavat sinua suunnittelemaan tehokkaita oppimispolkuja oppilaillesi.'
  },
  'parent-resources': {
    en: 'Find practical guides and tips for supporting your child\'s education at home. These articles cover everything from creating a productive homework routine to choosing age-appropriate learning activities. Whether you\'re supplementing school instruction or homeschooling, discover how to use our worksheet generators to create engaging materials tailored to your child\'s needs.',
    de: 'Finden Sie praktische Anleitungen und Tipps zur Unterst\u00fctzung der Bildung Ihres Kindes zu Hause. Entdecken Sie, wie Sie unsere Arbeitsblatt-Generatoren f\u00fcr individuell angepasste Materialien nutzen k\u00f6nnen.',
    fr: 'Trouvez des guides pratiques et des conseils pour soutenir l\'\u00e9ducation de votre enfant \u00e0 la maison. D\u00e9couvrez comment utiliser nos g\u00e9n\u00e9rateurs de fiches pour cr\u00e9er des mat\u00e9riaux adapt\u00e9s aux besoins de votre enfant.',
    es: 'Encuentre gu\u00edas pr\u00e1cticas y consejos para apoyar la educaci\u00f3n de su hijo en casa. Descubra c\u00f3mo usar nuestros generadores de fichas para crear materiales adaptados a las necesidades de su hijo.',
    pt: 'Encontre guias pr\u00e1ticos e dicas para apoiar a educa\u00e7\u00e3o do seu filho em casa. Descubra como usar nossos geradores de atividades para criar materiais adaptados \u00e0s necessidades do seu filho.',
    it: 'Trova guide pratiche e consigli per supportare l\'istruzione del tuo bambino a casa. Scopri come usare i nostri generatori di schede per creare materiali adattati alle esigenze del tuo bambino.',
    nl: 'Vind praktische gidsen en tips voor het ondersteunen van de educatie van uw kind thuis. Ontdek hoe u onze werkblad generatoren kunt gebruiken voor materialen op maat.',
    sv: 'Hitta praktiska guider och tips f\u00f6r att st\u00f6dja ditt barns utbildning hemma. Uppt\u00e4ck hur du anv\u00e4nder v\u00e5ra arbetsblad generatorer f\u00f6r anpassade material.',
    da: 'Find praktiske guider og tips til at st\u00f8tte dit barns uddannelse derhjemme. Opdag hvordan du bruger vores arbejdsark generatorer til skr\u00e6ddersyede materialer.',
    no: 'Finn praktiske guider og tips for \u00e5 st\u00f8tte barnets utdanning hjemme. Oppdag hvordan du bruker v\u00e5re arbeidsark generatorer for tilpassede materialer.',
    fi: 'L\u00f6yd\u00e4 k\u00e4yt\u00e4nn\u00f6n oppaita ja vinkkej\u00e4 lapsesi koulutuksen tukemiseen kotona. Tutustu siihen, miten ty\u00f6arkki-generaattorimme auttavat luomaan r\u00e4\u00e4t\u00e4l\u00f6ityj\u00e4 materiaaleja.'
  },
  'seasonal-content': {
    en: 'Celebrate holidays and seasons with themed educational activities and printable resources. From Halloween math worksheets to Christmas coloring pages, spring nature activities to back-to-school preparations, these articles provide timely content that keeps learning fresh and exciting throughout the year. Use our generators to create custom seasonal worksheets in minutes.',
    de: 'Feiern Sie Feiertage und Jahreszeiten mit thematischen Lernaktivit\u00e4ten und druckbaren Ressourcen. Nutzen Sie unsere Generatoren, um individuelle saisonale Arbeitsbl\u00e4tter in Minuten zu erstellen.',
    fr: 'C\u00e9l\u00e9brez les f\u00eates et les saisons avec des activit\u00e9s \u00e9ducatives th\u00e9matiques et des ressources imprimables. Utilisez nos g\u00e9n\u00e9rateurs pour cr\u00e9er des fiches saisonni\u00e8res personnalis\u00e9es en quelques minutes.',
    es: 'Celebre festividades y estaciones con actividades educativas tem\u00e1ticas y recursos imprimibles. Use nuestros generadores para crear fichas estacionales personalizadas en minutos.',
    pt: 'Celebre feriados e esta\u00e7\u00f5es com atividades educacionais tem\u00e1ticas e recursos imprim\u00edveis. Use nossos geradores para criar atividades sazonais personalizadas em minutos.',
    it: 'Celebra le festivit\u00e0 e le stagioni con attivit\u00e0 educative tematiche e risorse stampabili. Usa i nostri generatori per creare schede stagionali personalizzate in pochi minuti.',
    nl: 'Vier feestdagen en seizoenen met thematische educatieve activiteiten en printbare bronnen. Gebruik onze generatoren om aangepaste seizoenswerkbladen in minuten te maken.',
    sv: 'Fira helger och \u00e5rstider med tematiska utbildningsaktiviteter och utskrivbara resurser. Anv\u00e4nd v\u00e5ra generatorer f\u00f6r att skapa anpassade s\u00e4songsarbetsblad p\u00e5 minuter.',
    da: 'Fejr helligdage og \u00e5rstider med tematiske uddannelsesaktiviteter og printbare ressourcer. Brug vores generatorer til at skabe tilpassede s\u00e6sonarbejdsark p\u00e5 minutter.',
    no: 'Feir helligdager og \u00e5rstider med tematiske utdanningsaktiviteter og utskrivbare ressurser. Bruk v\u00e5re generatorer for \u00e5 lage tilpassede sesongarbeidsark p\u00e5 minutter.',
    fi: 'Juhli pyhip\u00e4ivi\u00e4 ja vuodenaikoja temaattisilla oppimisaktiviteeteilla ja tulostettavilla resursseilla. K\u00e4yt\u00e4 generaattoreitamme luodaksesi mukautettuja kausiluonteisia ty\u00f6arkkeja minuuteissa.'
  }
};

// Breadcrumb labels
const BREADCRUMB_LABELS: Record<string, { blog: string; categories: string }> = {
  en: { blog: 'Blog', categories: 'Categories' },
  de: { blog: 'Blog', categories: 'Kategorien' },
  fr: { blog: 'Blog', categories: 'Catégories' },
  es: { blog: 'Blog', categories: 'Categorías' },
  pt: { blog: 'Blog', categories: 'Categorias' },
  it: { blog: 'Blog', categories: 'Categorie' },
  nl: { blog: 'Blog', categories: 'Categorieën' },
  sv: { blog: 'Blogg', categories: 'Kategorier' },
  da: { blog: 'Blog', categories: 'Kategorier' },
  no: { blog: 'Blogg', categories: 'Kategorier' },
  fi: { blog: 'Blogi', categories: 'Kategoriat' }
};

interface CategoryPageProps {
  params: {
    locale: string;
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

// Generate static params for all category/locale combinations
export async function generateStaticParams() {
  const locales = [...SUPPORTED_LOCALES];
  const params = [];

  for (const locale of locales) {
    for (const category of VALID_CATEGORIES) {
      params.push({ locale, category });
    }
  }

  return params;
}

// Fetch posts for a category
async function getCategoryPosts(category: string, locale: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        category: category
      },
      select: {
        id: true,
        slug: true,
        translations: true,
        category: true,
        featuredImage: true,
        createdAt: true,
        _count: {
          select: { pdfs: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Filter posts that have translations for this locale
    return posts.filter(post => {
      const translations = post.translations as any;
      const translation = translations[locale];
      return translation && translation.title && translation.content;
    }).map(post => {
      const translations = post.translations as any;
      const translation = translations[locale];
      return {
        id: post.id,
        slug: translation.slug || post.slug,
        title: translation.title,
        excerpt: translation.excerpt || '',
        author: translation.author || 'LessonCraftStudio Team',
        date: post.createdAt.toISOString().split('T')[0],
        category: post.category,
        featuredImage: translation.featuredImage || post.featuredImage,
        hasSampleWorksheets: post._count.pdfs > 0
      };
    });
  } catch (error) {
    console.error(`Error fetching category posts for ${category}:`, error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = params;
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Validate category
  if (!VALID_CATEGORIES.includes(category)) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false }
    };
  }

  const categoryMeta = CATEGORY_TRANSLATIONS[category]?.[locale] || CATEGORY_TRANSLATIONS[category]?.['en'];
  if (!categoryMeta) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false }
    };
  }

  // Fetch posts to calculate total pages
  const posts = await getCategoryPosts(category, locale);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Build canonical URL
  const canonicalUrl = currentPage === 1
    ? `${baseUrl}/${locale}/blog/category/${category}`
    : `${baseUrl}/${locale}/blog/category/${category}?page=${currentPage}`;

  // Build title with page number for pages > 1
  // SEO: Category-specific titles with action words for better query matching
  const blogLabel: Record<string, string> = {
    en: 'Free Guides & Tips', de: 'Kostenlose Anleitungen & Tipps', fr: 'Guides & Conseils Gratuits',
    es: 'Gu\u00edas y Consejos Gratis', pt: 'Guias e Dicas Gr\u00e1tis', it: 'Guide e Consigli Gratis',
    nl: 'Gratis Gidsen & Tips', sv: 'Gratis Guider & Tips', da: 'Gratis Guider & Tips',
    no: 'Gratis Guider & Tips', fi: 'Ilmaiset Oppaat & Vinkit'
  };
  const suffix = blogLabel[locale] || blogLabel.en;
  const pageTitle = currentPage > 1
    ? `${categoryMeta.name} - Page ${currentPage} | LessonCraftStudio`
    : `${categoryMeta.name}: ${suffix} | LessonCraftStudio`;

  // Build pagination links
  const otherLinks: Record<string, string> = {};
  if (currentPage > 1) {
    otherLinks.prev = currentPage === 2
      ? `${baseUrl}/${locale}/blog/category/${category}`
      : `${baseUrl}/${locale}/blog/category/${category}?page=${currentPage - 1}`;
  }
  if (currentPage < totalPages) {
    otherLinks.next = `${baseUrl}/${locale}/blog/category/${category}?page=${currentPage + 1}`;
  }

  // Generate hreflang alternates
  const locales = [...SUPPORTED_LOCALES];
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/blog/category/${category}${currentPage > 1 ? `?page=${currentPage}` : ''}`;
  }
  return {
    title: pageTitle,
    description: categoryMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates
    },
    openGraph: {
      title: pageTitle,
      description: categoryMeta.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale
    },
    other: otherLinks
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, category } = params;
  const currentPage = parseInt(searchParams.page || '1', 10);
  const baseUrl = 'https://www.lessoncraftstudio.com';

  // Validate category
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const categoryMeta = CATEGORY_TRANSLATIONS[category]?.[locale] || CATEGORY_TRANSLATIONS[category]?.['en'];
  if (!categoryMeta) {
    notFound();
  }

  // Fetch posts
  let allPosts: Awaited<ReturnType<typeof getCategoryPosts>>;
  try {
    allPosts = await getCategoryPosts(category, locale);
  } catch (err) {
    console.error(`Category page error (category=${category}, locale=${locale}):`, err);
    allPosts = [];
  }
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  // Paginate
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Breadcrumb labels
  const breadcrumbLabel = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS['en'];

  // CollectionPage schema for SEO
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryMeta.name,
    "description": categoryMeta.description,
    "url": `${baseUrl}/${locale}/blog/category/${category}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": categoryMeta.name
    },
    "inLanguage": getHreflangCode(locale),
    "numberOfItems": allPosts.length,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "LessonCraftStudio",
      "url": baseUrl
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumb
        locale={locale}
        items={[
          { label: breadcrumbLabel.blog, href: `/${locale}/blog` },
          { label: categoryMeta.name }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryMeta.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {categoryMeta.description}
            </p>
            <p className="mt-4 text-white/70">
              {allPosts.length} {allPosts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </div>

        {/* Category Introduction - SEO content depth */}
        {CATEGORY_INTROS[category]?.[locale] && (
          <div className="container mx-auto px-4 pt-10 pb-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-600 leading-relaxed text-lg">
                {CATEGORY_INTROS[category][locale]}
              </p>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="container mx-auto px-4 py-12">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.date}</span>
                        {post.hasSampleWorksheets && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            PDF Samples
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found in this category.</p>
              <Link
                href={`/${locale}/blog`}
                className="mt-4 inline-block text-primary hover:underline"
              >
                View all articles
              </Link>
            </div>
          )}

          {/* Related Products Section - SEO Internal Linking */}
          {posts.length > 0 && (
            <div className="mt-12">
              <RelatedProducts
                locale={locale as SupportedLocale}
                category={category}
                keywords={[]}
                limit={4}
              />
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2
                    ? `/${locale}/blog/category/${category}`
                    : `/${locale}/blog/category/${category}?page=${currentPage - 1}`
                  }
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Previous
                </Link>
              )}

              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages && (
                <Link
                  href={`/${locale}/blog/category/${category}?page=${currentPage + 1}`}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          )}

          {/* Back to Blog Link */}
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/blog`}
              className="text-primary hover:underline"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
