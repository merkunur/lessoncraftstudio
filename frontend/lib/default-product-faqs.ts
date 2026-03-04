/**
 * Default FAQ fallback for product pages without custom FAQ content.
 * Provides 6 generic localized FAQ items per locale (11 locales).
 * Topics: free usage, printing, age range, commercial use, languages, refund policy.
 */

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: Record<string, (productName: string) => FAQItem[]> = {
  en: (name) => [
    { question: `Is ${name} free to use?`, answer: `You can try ${name} completely free with all features — no signup, no credit card. Downloaded files include a watermark. Remove it with a one-time Commercial Pack or Full Access Pack purchase.` },
    { question: `Can I print the worksheets at home?`, answer: `Absolutely. Every worksheet is generated as a print-ready PDF that works with any standard home or office printer. Just click download and print.` },
    { question: `What ages are these worksheets suitable for?`, answer: `${name} worksheets are designed for children aged 3 to 9, covering preschool through third grade. You can adjust the difficulty settings to match each child’s level.` },
    { question: `Can I use these worksheets for commercial purposes?`, answer: `Yes — both the Commercial Pack and Full Access Pack include a commercial license. You can sell worksheets on Etsy, Amazon KDP, Teachers Pay Teachers, and other marketplaces.` },
    { question: `What languages are available?`, answer: `${name} is available in 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish.` },
    { question: `What is your refund policy?`, answer: `We do not offer refunds. Every app is free to try with all features — the only difference is a watermark on downloads. Try before you buy: test the app, create worksheets, check the quality, and purchase only when satisfied.` },
  ],
  de: (name) => [
    { question: `Ist ${name} kostenlos?`, answer: `Sie können ${name} völlig kostenlos mit allen Funktionen ausprobieren — ohne Anmeldung, ohne Kreditkarte. Heruntergeladene Dateien enthalten ein Wasserzeichen. Entfernen Sie es mit einem einmaligen Kauf des Commercial Pack oder Full Access Pack.` },
    { question: `Kann ich die Arbeitsblätter zu Hause ausdrucken?`, answer: `Selbstverständlich. Jedes Arbeitsblatt wird als druckfertiges PDF erstellt, das mit jedem handelsüblichen Drucker funktioniert. Einfach herunterladen und ausdrucken.` },
    { question: `Für welches Alter sind die Arbeitsblätter geeignet?`, answer: `Die Arbeitsblätter von ${name} sind für Kinder von 3 bis 9 Jahren konzipiert — von der Vorschule bis zur dritten Klasse. Der Schwierigkeitsgrad lässt sich individuell anpassen.` },
    { question: `Darf ich die Arbeitsblätter kommerziell nutzen?`, answer: `Ja — sowohl das Commercial Pack als auch das Full Access Pack enthalten eine kommerzielle Lizenz. Sie können Arbeitsblätter auf Etsy, Amazon KDP, Lehrermarktplatz und anderen Plattformen verkaufen.` },
    { question: `In welchen Sprachen ist das Angebot verfügbar?`, answer: `${name} ist in 11 Sprachen verfügbar: Deutsch, Englisch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch.` },
    { question: `Wie ist Ihre Rückerstattungsrichtlinie?`, answer: `Wir bieten keine Rückerstattungen an. Jede App kann kostenlos mit allen Funktionen getestet werden — der einzige Unterschied ist ein Wasserzeichen auf Downloads. Testen Sie vor dem Kauf: Erstellen Sie Arbeitsblätter, prüfen Sie die Qualität, und kaufen Sie erst, wenn Sie zufrieden sind.` },
  ],
  fr: (name) => [
    { question: `${name} est-il gratuit ?`, answer: `Vous pouvez essayer ${name} gratuitement avec toutes les fonctionnalités — sans inscription, sans carte bancaire. Les fichiers téléchargés comportent un filigrane. Supprimez-le avec un achat unique du Commercial Pack ou du Full Access Pack.` },
    { question: `Puis-je imprimer les fiches à la maison ?`, answer: `Bien sûr. Chaque fiche est générée au format PDF prêt à imprimer, compatible avec toute imprimante standard. Téléchargez et imprimez en un clic.` },
    { question: `Pour quel âge ces fiches sont-elles conçues ?`, answer: `Les fiches de ${name} s’adressent aux enfants de 3 à 9 ans, de la maternelle au CE2. Vous pouvez ajuster le niveau de difficulté selon chaque enfant.` },
    { question: `Puis-je utiliser ces fiches à des fins commerciales ?`, answer: `Oui — le Commercial Pack et le Full Access Pack incluent tous deux une licence commerciale. Vous pouvez vendre vos fiches sur Etsy, Amazon KDP, Teachers Pay Teachers et d’autres plateformes.` },
    { question: `Quelles langues sont disponibles ?`, answer: `${name} est disponible en 11 langues : français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.` },
    { question: `Quelle est votre politique de remboursement ?`, answer: `Nous n’offrons pas de remboursements. Chaque application est gratuite avec toutes les fonctionnalités — la seule différence est un filigrane sur les téléchargements. Essayez avant d’acheter : testez l’application, créez des fiches, vérifiez la qualité, et achetez uniquement quand vous êtes satisfait.` },
  ],
  es: (name) => [
    { question: `¿Es gratuito ${name}?`, answer: `Puede probar ${name} completamente gratis con todas las funciones — sin registro, sin tarjeta de crédito. Los archivos descargados incluyen una marca de agua. Elimínela con una compra única del Commercial Pack o Full Access Pack.` },
    { question: `¿Puedo imprimir las fichas en casa?`, answer: `Por supuesto. Cada ficha se genera como un PDF listo para imprimir, compatible con cualquier impresora estándar. Solo descargue e imprima.` },
    { question: `¿Para qué edades son adecuadas estas fichas?`, answer: `Las fichas de ${name} están diseñadas para niños de 3 a 9 años, desde preescolar hasta tercero de primaria. Puede ajustar la dificultad según el nivel de cada niño.` },
    { question: `¿Puedo usar las fichas con fines comerciales?`, answer: `Sí — tanto el Commercial Pack como el Full Access Pack incluyen una licencia comercial. Puede vender fichas en Etsy, Amazon KDP, Teachers Pay Teachers y otras plataformas.` },
    { question: `¿En qué idiomas está disponible?`, answer: `${name} está disponible en 11 idiomas: español, inglés, alemán, francés, portugués, italiano, neerlandés, sueco, danés, noruego y finés.` },
    { question: `¿Cuál es su política de reembolso?`, answer: `No ofrecemos reembolsos. Cada aplicación es gratuita con todas las funciones — la única diferencia es una marca de agua en las descargas. Pruebe antes de comprar: use la aplicación, cree fichas, verifique la calidad, y compre solo cuando esté satisfecho.` },
  ],
  pt: (name) => [
    { question: `O ${name} é gratuito?`, answer: `Pode experimentar o ${name} gratuitamente com todas as funcionalidades — sem registo, sem cartão de crédito. Os ficheiros descarregados incluem uma marca de água. Remova-a com uma compra única do Commercial Pack ou Full Access Pack.` },
    { question: `Posso imprimir as fichas em casa?`, answer: `Com certeza. Cada ficha é gerada como um PDF pronto a imprimir, compatível com qualquer impressora doméstica ou de escritório. Basta descarregar e imprimir.` },
    { question: `Para que idades são adequadas estas fichas?`, answer: `As fichas do ${name} destinam-se a crianças dos 3 aos 9 anos, do pré-escolar ao 3.º ano. Pode ajustar a dificuldade ao nível de cada criança.` },
    { question: `Posso utilizar as fichas para fins comerciais?`, answer: `Sim — tanto o Commercial Pack como o Full Access Pack incluem uma licença comercial. Pode vender fichas no Etsy, Amazon KDP, Teachers Pay Teachers e noutras plataformas.` },
    { question: `Em que línguas está disponível?`, answer: `O ${name} está disponível em 11 línguas: português, inglês, alemão, francês, espanhol, italiano, neerlandês, sueco, dinamarquês, norueguês e finlandês.` },
    { question: `Qual é a vossa política de reembolso?`, answer: `Não oferecemos reembolsos. Cada aplicação pode ser testada gratuitamente com todas as funcionalidades — a única diferença é uma marca de água nos downloads. Experimente antes de comprar: teste a aplicação, crie fichas, verifique a qualidade, e compre apenas quando estiver satisfeito.` },
  ],
  it: (name) => [
    { question: `${name} è gratuito?`, answer: `Puoi provare ${name} gratuitamente con tutte le funzionalità — senza registrazione, senza carta di credito. I file scaricati includono una filigrana. Rimuovila con un acquisto unico del Commercial Pack o del Full Access Pack.` },
    { question: `Posso stampare le schede a casa?`, answer: `Certo. Ogni scheda viene generata come PDF pronto per la stampa, compatibile con qualsiasi stampante standard. Scarica e stampa in un clic.` },
    { question: `Per quali età sono adatte queste schede?`, answer: `Le schede di ${name} sono pensate per bambini dai 3 ai 9 anni, dalla scuola dell’infanzia alla terza elementare. Puoi regolare la difficoltà in base al livello di ogni bambino.` },
    { question: `Posso usare le schede a scopo commerciale?`, answer: `Sì — sia il Commercial Pack che il Full Access Pack includono una licenza commerciale. Puoi vendere le schede su Etsy, Amazon KDP, Teachers Pay Teachers e altre piattaforme.` },
    { question: `In quali lingue è disponibile?`, answer: `${name} è disponibile in 11 lingue: italiano, inglese, tedesco, francese, spagnolo, portoghese, olandese, svedese, danese, norvegese e finlandese.` },
    { question: `Qual è la vostra politica di rimborso?`, answer: `Non offriamo rimborsi. Ogni app è gratuita con tutte le funzionalità — l’unica differenza è una filigrana sui download. Prova prima di acquistare: testa l’app, crea schede, verifica la qualità, e acquista solo quando sei soddisfatto.` },
  ],
  nl: (name) => [
    { question: `Is ${name} gratis?`, answer: `U kunt ${name} volledig gratis uitproberen met alle functies — zonder registratie, zonder creditcard. Gedownloade bestanden bevatten een watermerk. Verwijder het met een eenmalige aankoop van het Commercial Pack of Full Access Pack.` },
    { question: `Kan ik de werkbladen thuis printen?`, answer: `Absoluut. Elk werkblad wordt gegenereerd als een printklare PDF die met elke standaardprinter werkt. Gewoon downloaden en afdrukken.` },
    { question: `Voor welke leeftijden zijn deze werkbladen geschikt?`, answer: `De werkbladen van ${name} zijn ontworpen voor kinderen van 3 tot 9 jaar, van de kleuterschool tot en met groep 5. U kunt het niveau aanpassen aan elk kind.` },
    { question: `Mag ik de werkbladen voor commerciële doeleinden gebruiken?`, answer: `Ja — zowel het Commercial Pack als het Full Access Pack bevat een commerciële licentie. U kunt werkbladen verkopen op Etsy, Amazon KDP, Teachers Pay Teachers en andere platforms.` },
    { question: `In welke talen is het beschikbaar?`, answer: `${name} is beschikbaar in 11 talen: Nederlands, Engels, Duits, Frans, Spaans, Portugees, Italiaans, Zweeds, Deens, Noors en Fins.` },
    { question: `Wat is uw restitutiebeleid?`, answer: `Wij bieden geen restituties aan. Elke app is gratis te gebruiken met alle functies — het enige verschil is een watermerk op downloads. Probeer voor u koopt: test de app, maak werkbladen, controleer de kwaliteit, en koop pas wanneer u tevreden bent.` },
  ],
  sv: (name) => [
    { question: `Är ${name} gratis?`, answer: `Du kan prova ${name} helt gratis med alla funktioner — ingen registrering, inget kreditkort. Nedladdade filer innehåller ett vattenstämpel. Ta bort det med ett engångsköp av Commercial Pack eller Full Access Pack.` },
    { question: `Kan jag skriva ut arbetsbladen hemma?`, answer: `Absolut. Varje arbetsblad genereras som en utskriftsklar PDF som fungerar med alla vanliga skrivare. Ladda ner och skriv ut direkt.` },
    { question: `För vilka åldrar passar dessa arbetsblad?`, answer: `Arbetsbladen från ${name} är utformade för barn i åldrarna 3 till 9 år, från förskolan till årskurs 3. Du kan anpassa svårighetsgraden efter varje barns nivå.` },
    { question: `Får jag använda arbetsbladen kommersiellt?`, answer: `Ja — både Commercial Pack och Full Access Pack inkluderar en kommersiell licens. Du kan sälja arbetsblad på Etsy, Amazon KDP, Teachers Pay Teachers och andra plattformar.` },
    { question: `Vilka språk finns tillgängliga?`, answer: `${name} finns på 11 språk: svenska, engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, danska, norska och finska.` },
    { question: `Vad är er återbetalningspolicy?`, answer: `Vi erbjuder inga återbetalningar. Varje app är gratis att använda med alla funktioner — den enda skillnaden är en vattenstämpel på nedladdningar. Prova innan du köper: testa appen, skapa arbetsblad, kontrollera kvaliteten, och köp först när du är nöjd.` },
  ],
  da: (name) => [
    { question: `Er ${name} gratis?`, answer: `Du kan prøve ${name} helt gratis med alle funktioner — ingen tilmelding, intet kreditkort. Downloadede filer indeholder et vandmærke. Fjern det med et engangskøb af Commercial Pack eller Full Access Pack.` },
    { question: `Kan jeg printe opgaverne derhjemme?`, answer: `Selvfølgelig. Hver opgave genereres som en printvenlig PDF, der virker med enhver standardprinter. Bare download og print.` },
    { question: `Hvilke aldersgrupper passer opgaverne til?`, answer: `Opgaverne fra ${name} er designet til børn i alderen 3 til 9 år, fra børnehaveklasse til 3. klasse. Du kan justere sværhedsgraden efter hvert barns niveau.` },
    { question: `Må jeg bruge opgaverne kommercielt?`, answer: `Ja — både Commercial Pack og Full Access Pack inkluderer en kommerciel licens. Du kan sælge opgaver på Etsy, Amazon KDP, Teachers Pay Teachers og andre platforme.` },
    { question: `Hvilke sprog er tilgængelige?`, answer: `${name} er tilgængelig på 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, norsk og finsk.` },
    { question: `Hvad er jeres refusionspolitik?`, answer: `Vi tilbyder ikke refusioner. Hver app er gratis at bruge med alle funktioner — den eneste forskel er et vandmærke på downloads. Prøv før du køber: test appen, lav opgaver, tjek kvaliteten, og køb først når du er tilfreds.` },
  ],
  no: (name) => [
    { question: `Er ${name} gratis?`, answer: `Du kan prøve ${name} helt gratis med alle funksjoner — ingen registrering, ingen kredittkort. Nedlastede filer inneholder et vannmerke. Fjern det med et engangskjøp av Commercial Pack eller Full Access Pack.` },
    { question: `Kan jeg skrive ut oppgavene hjemme?`, answer: `Selvfølgelig. Hver oppgave genereres som en utskriftsklar PDF som fungerer med alle vanlige skrivere. Bare last ned og skriv ut.` },
    { question: `Hvilke aldersgrupper passer oppgavene for?`, answer: `Oppgavene fra ${name} er laget for barn i alderen 3 til 9 år, fra barnehage til 3. trinn. Du kan justere vanskelighetsgraden etter hvert barns nivå.` },
    { question: `Kan jeg bruke oppgavene kommersielt?`, answer: `Ja — både Commercial Pack og Full Access Pack inkluderer en kommersiell lisens. Du kan selge oppgaver på Etsy, Amazon KDP, Teachers Pay Teachers og andre plattformer.` },
    { question: `Hvilke språk er tilgjengelige?`, answer: `${name} er tilgjengelig på 11 språk: norsk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk og finsk.` },
    { question: `Hva er refusjonspolicyen deres?`, answer: `Vi tilbyr ikke refusjoner. Hver app er gratis å bruke med alle funksjoner — den eneste forskjellen er et vannmerke på nedlastinger. Prøv før du kjøper: test appen, lag oppgaver, sjekk kvaliteten, og kjøp først når du er fornøyd.` },
  ],
  fi: (name) => [
    { question: `Onko ${name} ilmainen?`, answer: `Voit kokeilla sovellusta ${name} täysin ilmaiseksi kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Ladatuissa tiedostoissa on vesileima. Poista se kertaostoksella: Commercial Pack tai Full Access Pack.` },
    { question: `Voinko tulostaa tehtävät kotona?`, answer: `Totta kai. Jokainen tehtävä luodaan tulostusvalmiina PDF-tiedostona, joka toimii millä tahansa tavallisella tulostimella. Lataa ja tulosta yhdellä klikkauksella.` },
    { question: `Minkä ikäisille nämä tehtävät sopivat?`, answer: `Tehtävät on suunniteltu 3–9-vuotiaille lapsille, esikoulusta kolmanteen luokkaan. Voit säätää vaikeustasoa jokaisen lapsen tason mukaan.` },
    { question: `Saanko käyttää tehtäviä kaupallisiin tarkoituksiin?`, answer: `Kyllä — sekä Commercial Pack että Full Access Pack sisältävät kaupallisen lisenssin. Voit myydä tehtäviä Etsyssä, Amazon KDP:ssä, Teachers Pay Teachersissä ja muilla alustoilla.` },
    { question: `Millä kielillä palvelu on saatavilla?`, answer: `${name} on saatavilla 11 kielellä: suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja.` },
    { question: `Mikä on palautuskäytäntönne?`, answer: `Emme tarjoa palautuksia. Jokainen sovellus on ilmainen käyttää kaikilla ominaisuuksilla — ainoa ero on vesileima latauksissa. Kokeile ennen ostoa: testaa sovellus, luo tehtäviä, tarkista laatu, ja osta vasta kun olet tyytyväinen.` },
  ],
};

/**
 * Returns 6 generic localized FAQ items for a product page.
 * Used as a fallback when the product's content file has no FAQ items.
 */
export function getDefaultProductFAQs(productName: string, locale: string): FAQItem[] {
  const generator = defaultFAQs[locale] || defaultFAQs.en;
  return generator(productName);
}
