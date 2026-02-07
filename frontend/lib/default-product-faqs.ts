/**
 * Default FAQ fallback for product pages without custom FAQ content.
 * Provides 5 generic localized FAQ items per locale (11 locales).
 * Topics: free usage, printing, age range, commercial use, languages.
 */

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: Record<string, (productName: string) => FAQItem[]> = {
  en: (name) => [
    { question: `Is ${name} free to use?`, answer: `You can try ${name} and explore its features for free. Some generators require a Core or Full subscription for unlimited access. No credit card is needed to get started.` },
    { question: `Can I print the worksheets at home?`, answer: `Absolutely. Every worksheet is generated as a print-ready PDF that works with any standard home or office printer. Just click download and print.` },
    { question: `What ages are these worksheets suitable for?`, answer: `${name} worksheets are designed for children aged 3 to 9, covering preschool through third grade. You can adjust the difficulty settings to match each child\u2019s level.` },
    { question: `Can I use these worksheets for commercial purposes?`, answer: `The worksheets are intended for personal and classroom use. Teachers, tutors, and homeschooling parents may freely print and distribute them to their students.` },
    { question: `What languages are available?`, answer: `${name} is available in 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish.` },
  ],
  de: (name) => [
    { question: `Ist ${name} kostenlos?`, answer: `Sie k\u00f6nnen ${name} kostenlos ausprobieren und alle Funktionen erkunden. Einige Generatoren erfordern ein Core- oder Full-Abo f\u00fcr unbegrenzten Zugang. Keine Kreditkarte zum Start n\u00f6tig.` },
    { question: `Kann ich die Arbeitsbl\u00e4tter zu Hause ausdrucken?`, answer: `Selbstverst\u00e4ndlich. Jedes Arbeitsblatt wird als druckfertiges PDF erstellt, das mit jedem handels\u00fcblichen Drucker funktioniert. Einfach herunterladen und ausdrucken.` },
    { question: `F\u00fcr welches Alter sind die Arbeitsbl\u00e4tter geeignet?`, answer: `Die Arbeitsbl\u00e4tter von ${name} sind f\u00fcr Kinder von 3 bis 9 Jahren konzipiert \u2014 von der Vorschule bis zur dritten Klasse. Der Schwierigkeitsgrad l\u00e4sst sich individuell anpassen.` },
    { question: `Darf ich die Arbeitsbl\u00e4tter im Unterricht verwenden?`, answer: `Ja. Die Arbeitsbl\u00e4tter sind f\u00fcr den privaten und schulischen Gebrauch gedacht. Lehrkr\u00e4fte, Nachhilfelehrerinnen und Eltern d\u00fcrfen sie frei ausdrucken und an Sch\u00fcler verteilen.` },
    { question: `In welchen Sprachen ist das Angebot verf\u00fcgbar?`, answer: `${name} ist in 11 Sprachen verf\u00fcgbar: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.` },
  ],
  fr: (name) => [
    { question: `${name} est-il gratuit\u00a0?`, answer: `Vous pouvez essayer ${name} et d\u00e9couvrir ses fonctionnalit\u00e9s gratuitement. Certains g\u00e9n\u00e9rateurs n\u00e9cessitent un abonnement Core ou Full pour un acc\u00e8s illimit\u00e9. Aucune carte bancaire n\u00e9cessaire pour commencer.` },
    { question: `Puis-je imprimer les fiches \u00e0 la maison\u00a0?`, answer: `Bien s\u00fbr. Chaque fiche est g\u00e9n\u00e9r\u00e9e au format PDF pr\u00eat \u00e0 imprimer, compatible avec toute imprimante standard. T\u00e9l\u00e9chargez et imprimez en un clic.` },
    { question: `Pour quel \u00e2ge ces fiches sont-elles con\u00e7ues\u00a0?`, answer: `Les fiches de ${name} s\u2019adressent aux enfants de 3 \u00e0 9 ans, de la maternelle au CE2. Vous pouvez ajuster le niveau de difficult\u00e9 selon chaque enfant.` },
    { question: `Puis-je utiliser ces fiches dans un cadre professionnel\u00a0?`, answer: `Les fiches sont destin\u00e9es \u00e0 un usage personnel et p\u00e9dagogique. Les enseignants, les tuteurs et les parents pratiquant l\u2019instruction en famille peuvent les imprimer et les distribuer librement.` },
    { question: `Quelles langues sont disponibles\u00a0?`, answer: `${name} est disponible en 11 langues\u00a0: fran\u00e7ais, anglais, allemand, espagnol, portugais, italien, n\u00e9erlandais, su\u00e9dois, danois, norv\u00e9gien et finnois.` },
  ],
  es: (name) => [
    { question: `\u00bfEs gratuito ${name}?`, answer: `Puede probar ${name} y explorar sus funciones de forma gratuita. Algunos generadores requieren una suscripci\u00f3n Core o Full para acceso ilimitado. No se necesita tarjeta de cr\u00e9dito para empezar.` },
    { question: `\u00bfPuedo imprimir las fichas en casa?`, answer: `Por supuesto. Cada ficha se genera como un PDF listo para imprimir, compatible con cualquier impresora est\u00e1ndar. Solo descargue e imprima.` },
    { question: `\u00bfPara qu\u00e9 edades son adecuadas estas fichas?`, answer: `Las fichas de ${name} est\u00e1n dise\u00f1adas para ni\u00f1os de 3 a 9 a\u00f1os, desde preescolar hasta tercero de primaria. Puede ajustar la dificultad seg\u00fan el nivel de cada ni\u00f1o.` },
    { question: `\u00bfPuedo usar las fichas con fines comerciales?`, answer: `Las fichas est\u00e1n pensadas para uso personal y educativo. Docentes, tutores y familias que educan en casa pueden imprimirlas y distribuirlas libremente a sus alumnos.` },
    { question: `\u00bfEn qu\u00e9 idiomas est\u00e1 disponible?`, answer: `${name} est\u00e1 disponible en 11 idiomas: espa\u00f1ol, ingl\u00e9s, alem\u00e1n, franc\u00e9s, portugu\u00e9s, italiano, neerland\u00e9s, sueco, dan\u00e9s, noruego y fin\u00e9s.` },
  ],
  pt: (name) => [
    { question: `O ${name} \u00e9 gratuito?`, answer: `Pode experimentar o ${name} e explorar as suas funcionalidades gratuitamente. Alguns geradores requerem uma assinatura Core ou Full para acesso ilimitado. N\u00e3o \u00e9 necess\u00e1rio cart\u00e3o de cr\u00e9dito para come\u00e7ar.` },
    { question: `Posso imprimir as fichas em casa?`, answer: `Com certeza. Cada ficha \u00e9 gerada como um PDF pronto a imprimir, compat\u00edvel com qualquer impressora dom\u00e9stica ou de escrit\u00f3rio. Basta descarregar e imprimir.` },
    { question: `Para que idades s\u00e3o adequadas estas fichas?`, answer: `As fichas do ${name} destinam-se a crian\u00e7as dos 3 aos 9 anos, do pr\u00e9-escolar ao 3.\u00ba ano. Pode ajustar a dificuldade ao n\u00edvel de cada crian\u00e7a.` },
    { question: `Posso utilizar as fichas para fins comerciais?`, answer: `As fichas destinam-se a uso pessoal e pedag\u00f3gico. Professores, explicadores e pais que praticam ensino dom\u00e9stico podem imprimi-las e distribu\u00ed-las livremente.` },
    { question: `Em que l\u00ednguas est\u00e1 dispon\u00edvel?`, answer: `O ${name} est\u00e1 dispon\u00edvel em 11 l\u00ednguas: portugu\u00eas, ingl\u00eas, alem\u00e3o, franc\u00eas, espanhol, italiano, neerland\u00eas, sueco, dinamarqu\u00eas, noruegu\u00eas e finland\u00eas.` },
  ],
  it: (name) => [
    { question: `${name} \u00e8 gratuito?`, answer: `Puoi provare ${name} ed esplorare le sue funzionalit\u00e0 gratuitamente. Alcuni generatori richiedono un abbonamento Core o Full per l\u2019accesso illimitato. Non serve carta di credito per iniziare.` },
    { question: `Posso stampare le schede a casa?`, answer: `Certo. Ogni scheda viene generata come PDF pronto per la stampa, compatibile con qualsiasi stampante standard. Scarica e stampa in un clic.` },
    { question: `Per quali et\u00e0 sono adatte queste schede?`, answer: `Le schede di ${name} sono pensate per bambini dai 3 ai 9 anni, dalla scuola dell\u2019infanzia alla terza elementare. Puoi regolare la difficolt\u00e0 in base al livello di ogni bambino.` },
    { question: `Posso usare le schede a scopo commerciale?`, answer: `Le schede sono destinate all\u2019uso personale e didattico. Insegnanti, tutor e genitori che praticano l\u2019istruzione domestica possono stamparle e distribuirle liberamente.` },
    { question: `In quali lingue \u00e8 disponibile?`, answer: `${name} \u00e8 disponibile in 11 lingue: italiano, inglese, tedesco, francese, spagnolo, portoghese, olandese, svedese, danese, norvegese e finlandese.` },
  ],
  nl: (name) => [
    { question: `Is ${name} gratis?`, answer: `U kunt ${name} gratis uitproberen en alle functies verkennen. Sommige generatoren vereisen een Core- of Full-abonnement voor onbeperkte toegang. Geen creditcard nodig om te starten.` },
    { question: `Kan ik de werkbladen thuis printen?`, answer: `Absoluut. Elk werkblad wordt gegenereerd als een printklare PDF die met elke standaardprinter werkt. Gewoon downloaden en afdrukken.` },
    { question: `Voor welke leeftijden zijn deze werkbladen geschikt?`, answer: `De werkbladen van ${name} zijn ontworpen voor kinderen van 3 tot 9 jaar, van de kleuterschool tot en met groep 5. U kunt het niveau aanpassen aan elk kind.` },
    { question: `Mag ik de werkbladen voor commerci\u00eble doeleinden gebruiken?`, answer: `De werkbladen zijn bedoeld voor persoonlijk en educatief gebruik. Leerkrachten, bijlesdocenten en ouders die thuisonderwijs geven, mogen ze vrij printen en uitdelen.` },
    { question: `In welke talen is het beschikbaar?`, answer: `${name} is beschikbaar in 11 talen: Nederlands, Engels, Duits, Frans, Spaans, Portugees, Italiaans, Zweeds, Deens, Noors en Fins.` },
  ],
  sv: (name) => [
    { question: `\u00c4r ${name} gratis?`, answer: `Du kan prova ${name} och utforska alla funktioner gratis. Vissa generatorer kr\u00e4ver en Core- eller Full-prenumeration f\u00f6r obegr\u00e4nsad \u00e5tkomst. Inget kreditkort beh\u00f6vs f\u00f6r att b\u00f6rja.` },
    { question: `Kan jag skriva ut arbetsbladen hemma?`, answer: `Absolut. Varje arbetsblad genereras som en utskriftsklar PDF som fungerar med alla vanliga skrivare. Ladda ner och skriv ut direkt.` },
    { question: `F\u00f6r vilka \u00e5ldrar passar dessa arbetsblad?`, answer: `Arbetsbladen fr\u00e5n ${name} \u00e4r utformade f\u00f6r barn i \u00e5ldrarna 3 till 9 \u00e5r, fr\u00e5n f\u00f6rskolan till \u00e5rskurs 3. Du kan anpassa sv\u00e5righetsgraden efter varje barns niv\u00e5.` },
    { question: `F\u00e5r jag anv\u00e4nda arbetsbladen i kommersiellt syfte?`, answer: `Arbetsbladen \u00e4r avsedda f\u00f6r personligt och pedagogiskt bruk. L\u00e4rare, handledare och hemundervisande f\u00f6r\u00e4ldrar f\u00e5r fritt skriva ut och dela dem med sina elever.` },
    { question: `Vilka spr\u00e5k finns tillg\u00e4ngliga?`, answer: `${name} finns p\u00e5 11 spr\u00e5k: svenska, engelska, tyska, franska, spanska, portugisiska, italienska, nederl\u00e4ndska, danska, norska och finska.` },
  ],
  da: (name) => [
    { question: `Er ${name} gratis?`, answer: `Du kan pr\u00f8ve ${name} og udforske alle funktioner gratis. Nogle generatorer kr\u00e6ver et Core- eller Full-abonnement for ubegr\u00e6nset adgang. Intet kreditkort kr\u00e6ves for at komme i gang.` },
    { question: `Kan jeg printe opgaverne derhjemme?`, answer: `Selvf\u00f8lgelig. Hver opgave genereres som en printvenlig PDF, der virker med enhver standardprinter. Bare download og print.` },
    { question: `Hvilke aldersgrupper passer opgaverne til?`, answer: `Opgaverne fra ${name} er designet til b\u00f8rn i alderen 3 til 9 \u00e5r, fra b\u00f8rnehaveklasse til 3. klasse. Du kan justere sv\u00e6rhedsgraden efter hvert barns niveau.` },
    { question: `M\u00e5 jeg bruge opgaverne til kommercielle form\u00e5l?`, answer: `Opgaverne er beregnet til personlig og undervisningsm\u00e6ssig brug. L\u00e6rere, tutorer og for\u00e6ldre, der hjemmeunderviser, m\u00e5 frit printe og uddele dem til deres elever.` },
    { question: `Hvilke sprog er tilg\u00e6ngelige?`, answer: `${name} er tilg\u00e6ngelig p\u00e5 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, norsk og finsk.` },
  ],
  no: (name) => [
    { question: `Er ${name} gratis?`, answer: `Du kan pr\u00f8ve ${name} og utforske alle funksjoner gratis. Noen generatorer krever et Core- eller Full-abonnement for ubegrenset tilgang. Ingen kredittkort n\u00f8dvendig for \u00e5 starte.` },
    { question: `Kan jeg skrive ut oppgavene hjemme?`, answer: `Selvf\u00f8lgelig. Hver oppgave genereres som en utskriftsklar PDF som fungerer med alle vanlige skrivere. Bare last ned og skriv ut.` },
    { question: `Hvilke aldersgrupper passer oppgavene for?`, answer: `Oppgavene fra ${name} er laget for barn i alderen 3 til 9 \u00e5r, fra barnehage til 3. trinn. Du kan justere vanskelighetsgraden etter hvert barns niv\u00e5.` },
    { question: `Kan jeg bruke oppgavene til kommersielle form\u00e5l?`, answer: `Oppgavene er ment for personlig og pedagogisk bruk. L\u00e6rere, veiledere og foreldre som driver hjemmeundervisning, kan fritt skrive ut og dele dem med elevene sine.` },
    { question: `Hvilke spr\u00e5k er tilgjengelige?`, answer: `${name} er tilgjengelig p\u00e5 11 spr\u00e5k: norsk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk og finsk.` },
  ],
  fi: (name) => [
    { question: `Onko ${name} ilmainen?`, answer: `Voit kokeilla sovellusta ${name} ja tutustua sen ominaisuuksiin ilmaiseksi. Osa generaattoreista edellytt\u00e4\u00e4 Core- tai Full-tilausta rajattomaan k\u00e4ytt\u00f6\u00f6n. Luottokorttia ei tarvita aloittamiseen.` },
    { question: `Voinko tulostaa teht\u00e4v\u00e4t kotona?`, answer: `Totta kai. Jokainen teht\u00e4v\u00e4 luodaan tulostusvalmiina PDF-tiedostona, joka toimii mill\u00e4 tahansa tavallisella tulostimella. Lataa ja tulosta yhdell\u00e4 klikkauksella.` },
    { question: `Mink\u00e4 ik\u00e4isille n\u00e4m\u00e4 teht\u00e4v\u00e4t sopivat?`, answer: `Teht\u00e4v\u00e4t on suunniteltu 3\u20139-vuotiaille lapsille, esikoulusta kolmanteen luokkaan. Voit s\u00e4\u00e4t\u00e4\u00e4 vaikeustasoa jokaisen lapsen tason mukaan.` },
    { question: `Saanko k\u00e4ytt\u00e4\u00e4 teht\u00e4vi\u00e4 kaupallisiin tarkoituksiin?`, answer: `Teht\u00e4v\u00e4t on tarkoitettu henkil\u00f6kohtaiseen ja opetusk\u00e4ytt\u00f6\u00f6n. Opettajat, tukiopettajat ja kotiopetusta antavat vanhemmat voivat vapaasti tulostaa ja jakaa niit\u00e4 oppilailleen.` },
    { question: `Mill\u00e4 kielill\u00e4 palvelu on saatavilla?`, answer: `${name} on saatavilla 11 kielell\u00e4: suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja.` },
  ],
};

/**
 * Returns 5 generic localized FAQ items for a product page.
 * Used as a fallback when the product's content file has no FAQ items.
 */
export function getDefaultProductFAQs(productName: string, locale: string): FAQItem[] {
  const generator = defaultFAQs[locale] || defaultFAQs.en;
  return generator(productName);
}
