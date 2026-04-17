import type { FAQ } from './types';

// Commercial-intent FAQs prepended to every /[locale]/apps/[slug] page's FAQ
// section. These focus on licensing, platforms, refunds, team use, and
// language expansion — topics that differentiate the commercial /apps/*
// pages from the informational /tools/*-maker pages.
//
// Only EN is populated today. Other locales fall back to EN (same question
// text rendered in English). Translations queued in
// docs/seo-translation-queue-2026-04.md.
export const sharedCommercialFAQs: Record<string, FAQ[]> = {
  en: [
    {
      question: 'What does the commercial license include?',
      answer:
        'Every worksheet you generate comes with a full commercial license — no attribution required, no royalties, no unit caps. You can sell the worksheets you create on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, Your Own Store, or any other marketplace. The one-time $49 license covers unlimited commercial use for a single seller or business.',
    },
    {
      question: 'Can I sell worksheets on Etsy, Amazon KDP, Teachers Pay Teachers, and Gumroad?',
      answer:
        'Yes, all four platforms are covered under the commercial license. You can sell digital downloads on Etsy, compile worksheets into printed puzzle and activity books for Amazon KDP, offer classroom bundles on Teachers Pay Teachers, and distribute printables via Gumroad or your own ecommerce store. The license does not restrict which marketplace you sell on.',
    },
    {
      question: 'Can I share the license with team members or employees?',
      answer:
        'A single license covers one seller account or business. If you operate as a sole proprietor, the license covers you and any virtual assistants working under your business. For teams of 3 or more people generating worksheets independently, contact support about team licensing — we offer discounted multi-seat packages.',
    },
    {
      question: 'Can I sell the same worksheet in 11 languages as separate products?',
      answer:
        'Yes. The generator supports 11 languages (English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish), and each language-specific version counts as a distinct product under your license. Many sellers multiply revenue per theme by exporting the same worksheet in each language and listing them as separate SKUs on Etsy or KDP.',
    },
    {
      question: 'Are there any per-sale royalties or ongoing fees?',
      answer:
        'No. The license is a one-time $49 payment with no royalties, no monthly fees, and no per-sale deductions. Once you purchase, you own unlimited commercial rights — generate and sell as many worksheets as you want, forever, without paying anything further.',
    },
    {
      question: 'Can I use worksheets I made under the free trial after I purchase a license?',
      answer:
        'Yes. Any worksheets you created during the free trial — watermark and all — can be regenerated without the watermark once your license is active. Your commercial license applies retroactively, so evaluation work is never wasted.',
    },
  ],
  de: [
    {
      question: 'Was umfasst die kommerzielle Lizenz?',
      answer:
        'Jedes Arbeitsblatt, das Sie erstellen, kommt mit einer vollständigen kommerziellen Lizenz — ohne Quellennachweis, ohne Lizenzgebühren, ohne Stückzahl-Obergrenze. Sie dürfen die erstellten Arbeitsblätter auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, in Ihrem eigenen Shop oder auf jedem anderen Marktplatz verkaufen. Die einmalige Lizenz für 49 $ deckt unbegrenzte kommerzielle Nutzung für einen Verkäufer oder ein Unternehmen ab.',
    },
    {
      question: 'Darf ich Arbeitsblätter auf Etsy, Amazon KDP, Teachers Pay Teachers und Gumroad verkaufen?',
      answer:
        'Ja, alle vier Plattformen sind von der kommerziellen Lizenz abgedeckt. Sie können digitale Downloads auf Etsy verkaufen, Arbeitsblätter zu gedruckten Rätsel- und Aktivitätsbüchern für Amazon KDP zusammenstellen, Klassenraum-Bundles auf Teachers Pay Teachers anbieten und Druckvorlagen über Gumroad oder Ihren eigenen Online-Shop vertreiben. Die Lizenz schränkt nicht ein, auf welchem Marktplatz Sie verkaufen.',
    },
    {
      question: 'Kann ich die Lizenz mit Teammitgliedern oder Mitarbeitern teilen?',
      answer:
        'Eine einzelne Lizenz deckt ein Verkäuferkonto oder Unternehmen ab. Wenn Sie Einzelunternehmer sind, deckt die Lizenz Sie und alle virtuellen Assistenten ab, die für Ihr Unternehmen arbeiten. Für Teams ab 3 Personen, die unabhängig voneinander Arbeitsblätter erstellen, kontaktieren Sie den Support wegen Team-Lizenzen — wir bieten rabattierte Mehrplatz-Pakete.',
    },
    {
      question: 'Darf ich dasselbe Arbeitsblatt in 11 Sprachen als separate Produkte verkaufen?',
      answer:
        'Ja. Der Generator unterstützt 11 Sprachen (Englisch, Deutsch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch, Finnisch), und jede sprachspezifische Version gilt unter Ihrer Lizenz als eigenständiges Produkt. Viele Verkäufer vervielfachen ihren Umsatz pro Thema, indem sie dasselbe Arbeitsblatt in jeder Sprache exportieren und als separate Angebote auf Etsy oder KDP listen.',
    },
    {
      question: 'Fallen Verkaufs-Tantiemen oder laufende Gebühren an?',
      answer:
        'Nein. Die Lizenz ist eine einmalige Zahlung von 49 $ — keine Tantiemen, keine monatlichen Gebühren, keine Abzüge pro Verkauf. Sobald Sie gekauft haben, besitzen Sie unbegrenzte kommerzielle Rechte — erstellen und verkaufen Sie so viele Arbeitsblätter, wie Sie möchten, ohne jemals etwas Weiteres zu zahlen.',
    },
    {
      question: 'Kann ich Arbeitsblätter nutzen, die ich in der kostenlosen Testversion erstellt habe, nachdem ich eine Lizenz gekauft habe?',
      answer:
        'Ja. Alle Arbeitsblätter, die Sie während der kostenlosen Testversion erstellt haben — inklusive Wasserzeichen — können nach Aktivierung Ihrer Lizenz ohne Wasserzeichen neu generiert werden. Ihre kommerzielle Lizenz gilt rückwirkend, sodass Evaluierungsarbeit nie verschwendet ist.',
    },
  ],
  fr: [
    {
      question: 'Que comprend la licence commerciale ?',
      answer:
        'Chaque fiche générée est accompagnée d\'une licence commerciale complète — aucune attribution requise, aucune redevance, aucune limite d\'unités vendues. Vous pouvez vendre les fiches créées sur Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, votre propre boutique ou toute autre plateforme. La licence unique à 49 $ couvre un usage commercial illimité pour un vendeur ou une entreprise.',
    },
    {
      question: 'Puis-je vendre les fiches sur Etsy, Amazon KDP, Teachers Pay Teachers et Gumroad ?',
      answer:
        'Oui, ces quatre plateformes sont couvertes par la licence commerciale. Vous pouvez vendre des téléchargements numériques sur Etsy, compiler des fiches en livres d\'activités ou livres de casse-têtes imprimés pour Amazon KDP, proposer des packs de classe sur Teachers Pay Teachers et distribuer des imprimables via Gumroad ou votre propre boutique en ligne. La licence ne restreint pas la plateforme de vente.',
    },
    {
      question: 'Puis-je partager la licence avec des membres d\'équipe ou des employés ?',
      answer:
        'Une licence unique couvre un compte vendeur ou une entreprise. Si vous êtes entrepreneur individuel, la licence vous couvre ainsi que les assistants virtuels travaillant pour votre activité. Pour les équipes de 3 personnes ou plus créant des fiches indépendamment, contactez le support concernant les licences d\'équipe — nous proposons des forfaits multi-postes à prix réduit.',
    },
    {
      question: 'Puis-je vendre la même fiche en 11 langues comme produits distincts ?',
      answer:
        'Oui. Le générateur prend en charge 11 langues (anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien, finnois), et chaque version linguistique compte comme un produit distinct sous votre licence. De nombreux vendeurs multiplient leurs revenus par thème en exportant la même fiche dans chaque langue et en les listant comme produits séparés sur Etsy ou KDP.',
    },
    {
      question: 'Y a-t-il des redevances par vente ou des frais récurrents ?',
      answer:
        'Non. La licence est un paiement unique de 49 $ sans redevances, sans frais mensuels et sans déduction par vente. Une fois l\'achat effectué, vous possédez des droits commerciaux illimités — créez et vendez autant de fiches que vous le souhaitez, pour toujours, sans rien payer de plus.',
    },
    {
      question: 'Puis-je utiliser les fiches que j\'ai créées pendant l\'essai gratuit après avoir acheté une licence ?',
      answer:
        'Oui. Toutes les fiches que vous avez créées pendant l\'essai gratuit — filigrane inclus — peuvent être régénérées sans filigrane une fois votre licence activée. Votre licence commerciale s\'applique rétroactivement, de sorte que le travail d\'évaluation n\'est jamais perdu.',
    },
  ],
  es: [
    {
      question: '¿Qué incluye la licencia comercial?',
      answer:
        'Cada ficha que genere viene con una licencia comercial completa: sin atribución requerida, sin regalías, sin límite de unidades. Puede vender las fichas creadas en Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, su propia tienda o cualquier otro mercado. La licencia única de 49 $ cubre uso comercial ilimitado para un vendedor o empresa.',
    },
    {
      question: '¿Puedo vender las fichas en Etsy, Amazon KDP, Teachers Pay Teachers y Gumroad?',
      answer:
        'Sí, las cuatro plataformas están cubiertas por la licencia comercial. Puede vender descargas digitales en Etsy, compilar fichas en libros de actividades y acertijos impresos para Amazon KDP, ofrecer paquetes para el aula en Teachers Pay Teachers y distribuir imprimibles mediante Gumroad o su propia tienda online. La licencia no restringe el mercado donde vende.',
    },
    {
      question: '¿Puedo compartir la licencia con miembros del equipo o empleados?',
      answer:
        'Una licencia única cubre una cuenta de vendedor o empresa. Si trabaja como autónomo, la licencia le cubre a usted y a los asistentes virtuales que trabajen para su negocio. Para equipos de 3 o más personas que generen fichas de forma independiente, contacte al soporte sobre licencias de equipo: ofrecemos paquetes multiusuario con descuento.',
    },
    {
      question: '¿Puedo vender la misma ficha en 11 idiomas como productos distintos?',
      answer:
        'Sí. El generador admite 11 idiomas (inglés, alemán, francés, español, portugués, italiano, neerlandés, sueco, danés, noruego, finés), y cada versión por idioma cuenta como un producto distinto bajo su licencia. Muchos vendedores multiplican sus ingresos por tema exportando la misma ficha en cada idioma y listándolas como productos separados en Etsy o KDP.',
    },
    {
      question: '¿Hay regalías por venta o tarifas recurrentes?',
      answer:
        'No. La licencia es un pago único de 49 $ sin regalías, sin tarifas mensuales y sin deducciones por venta. Una vez comprada, posee derechos comerciales ilimitados: cree y venda todas las fichas que desee, para siempre, sin pagar nada más.',
    },
    {
      question: '¿Puedo usar las fichas que hice con la prueba gratuita después de comprar una licencia?',
      answer:
        'Sí. Cualquier ficha que haya creado durante la prueba gratuita — marca de agua incluida — puede regenerarse sin la marca de agua una vez que su licencia esté activa. Su licencia comercial se aplica retroactivamente, por lo que el trabajo de evaluación nunca se desperdicia.',
    },
  ],
  it: [
    {
      question: 'Cosa include la licenza commerciale?',
      answer:
        'Ogni scheda generata include una licenza commerciale completa: nessuna attribuzione richiesta, nessuna royalty, nessun limite di unità vendute. Puoi vendere le schede create su Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, sul tuo negozio o su qualsiasi altro marketplace. La licenza unica da 49 $ copre un uso commerciale illimitato per un venditore o un\'azienda.',
    },
    {
      question: 'Posso vendere le schede su Etsy, Amazon KDP, Teachers Pay Teachers e Gumroad?',
      answer:
        'Sì, tutte e quattro le piattaforme sono coperte dalla licenza commerciale. Puoi vendere download digitali su Etsy, comporre schede in libri di attività e rompicapo stampati per Amazon KDP, offrire pacchetti per la classe su Teachers Pay Teachers e distribuire stampabili tramite Gumroad o il tuo negozio online. La licenza non limita il marketplace su cui vendi.',
    },
    {
      question: 'Posso condividere la licenza con membri del team o dipendenti?',
      answer:
        'Una singola licenza copre un account venditore o un\'azienda. Se sei un libero professionista, la licenza copre te e gli assistenti virtuali che lavorano per la tua attività. Per team di 3 o più persone che generano schede in modo indipendente, contatta il supporto per le licenze team: offriamo pacchetti multi-postazione scontati.',
    },
    {
      question: 'Posso vendere la stessa scheda in 11 lingue come prodotti distinti?',
      answer:
        'Sì. Il generatore supporta 11 lingue (inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, svedese, danese, norvegese, finlandese), e ogni versione linguistica conta come prodotto distinto nella tua licenza. Molti venditori moltiplicano i ricavi per tema esportando la stessa scheda in ogni lingua e pubblicandole come prodotti separati su Etsy o KDP.',
    },
    {
      question: 'Ci sono royalty per vendita o costi ricorrenti?',
      answer:
        'No. La licenza è un pagamento unico di 49 $ senza royalty, senza costi mensili e senza trattenute sulle vendite. Una volta acquistata, possiedi diritti commerciali illimitati — crea e vendi tutte le schede che vuoi, per sempre, senza pagare altro.',
    },
    {
      question: 'Posso usare le schede create nella versione di prova dopo aver acquistato una licenza?',
      answer:
        'Sì. Qualsiasi scheda creata durante la versione di prova — filigrana inclusa — può essere rigenerata senza filigrana una volta attivata la licenza. La tua licenza commerciale si applica retroattivamente, quindi il lavoro di valutazione non va mai perso.',
    },
  ],
  pt: [
    {
      question: 'O que inclui a licença comercial?',
      answer:
        'Cada atividade que você gera vem com uma licença comercial completa: sem exigência de atribuição, sem royalties, sem limite de unidades vendidas. Você pode vender as atividades criadas na Hotmart, Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, sua própria loja ou em qualquer outro marketplace. A licença única de US$ 49 cobre uso comercial ilimitado para um vendedor ou empresa.',
    },
    {
      question: 'Posso vender as atividades na Hotmart, Etsy, Amazon KDP, Teachers Pay Teachers e Gumroad?',
      answer:
        'Sim, todas essas plataformas estão cobertas pela licença comercial. Você pode vender downloads digitais na Hotmart e Etsy, compilar atividades em livros de passatempos e atividades impressos para Amazon KDP, oferecer pacotes para a sala de aula no Teachers Pay Teachers e distribuir imprimíveis via Gumroad ou sua própria loja online. A licença não restringe o marketplace de venda.',
    },
    {
      question: 'Posso compartilhar a licença com membros da equipe ou colaboradores?',
      answer:
        'Uma única licença cobre uma conta de vendedor ou empresa. Se você trabalha como autônomo, a licença cobre você e os assistentes virtuais que trabalham para o seu negócio. Para equipes de 3 ou mais pessoas gerando atividades de forma independente, entre em contato com o suporte para licenças de equipe: oferecemos pacotes multiusuário com desconto.',
    },
    {
      question: 'Posso vender a mesma atividade em 11 idiomas como produtos distintos?',
      answer:
        'Sim. O gerador suporta 11 idiomas (inglês, alemão, francês, espanhol, português, italiano, holandês, sueco, dinamarquês, norueguês, finlandês), e cada versão por idioma conta como um produto distinto sob sua licença. Muitos vendedores multiplicam a receita por tema exportando a mesma atividade em cada idioma e listando-as como produtos separados na Hotmart, Etsy ou KDP.',
    },
    {
      question: 'Há royalties por venda ou taxas contínuas?',
      answer:
        'Não. A licença é um pagamento único de US$ 49 sem royalties, sem mensalidades e sem deduções por venda. Após a compra, você possui direitos comerciais ilimitados — crie e venda quantas atividades quiser, para sempre, sem pagar mais nada.',
    },
    {
      question: 'Posso usar atividades que criei na versão de teste depois de comprar uma licença?',
      answer:
        'Sim. Qualquer atividade que você criou durante o teste gratuito — com a marca d\'água — pode ser regenerada sem a marca d\'água assim que sua licença estiver ativa. Sua licença comercial se aplica retroativamente, portanto o trabalho de avaliação nunca é desperdiçado.',
    },
  ],
  nl: [
    {
      question: 'Wat omvat de commerciële licentie?',
      answer:
        'Elk werkblad dat u genereert komt met een volledige commerciële licentie — geen naamsvermelding vereist, geen royalty\'s, geen limiet op het aantal eenheden. U kunt de gemaakte werkbladen verkopen op Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, uw eigen winkel of elk ander platform. De eenmalige licentie van $ 49 dekt onbeperkt commercieel gebruik voor één verkoper of bedrijf.',
    },
    {
      question: 'Mag ik werkbladen verkopen op Etsy, Amazon KDP, Teachers Pay Teachers en Gumroad?',
      answer:
        'Ja, alle vier de platforms zijn gedekt door de commerciële licentie. U kunt digitale downloads verkopen op Etsy, werkbladen bundelen tot gedrukte puzzel- en activiteitenboeken voor Amazon KDP, klaslokaalpakketten aanbieden op Teachers Pay Teachers en printables distribueren via Gumroad of uw eigen webshop. De licentie beperkt niet op welk platform u verkoopt.',
    },
    {
      question: 'Mag ik de licentie delen met teamleden of medewerkers?',
      answer:
        'Eén licentie dekt één verkopersaccount of bedrijf. Als u zelfstandig werkt, dekt de licentie u en alle virtuele assistenten die voor uw bedrijf werken. Voor teams van 3 of meer personen die onafhankelijk werkbladen genereren, neem contact op met support voor teamlicenties — we bieden pakketten met meerdere gebruikers tegen een gereduceerd tarief.',
    },
    {
      question: 'Mag ik hetzelfde werkblad in 11 talen als aparte producten verkopen?',
      answer:
        'Ja. De generator ondersteunt 11 talen (Engels, Duits, Frans, Spaans, Portugees, Italiaans, Nederlands, Zweeds, Deens, Noors, Fins), en elke taalversie telt als een apart product onder uw licentie. Veel verkopers vermenigvuldigen hun omzet per thema door hetzelfde werkblad in elke taal te exporteren en als aparte producten op Etsy of KDP te plaatsen.',
    },
    {
      question: 'Zijn er royalty\'s per verkoop of doorlopende kosten?',
      answer:
        'Nee. De licentie is een eenmalige betaling van $ 49 zonder royalty\'s, zonder maandelijkse kosten en zonder inhouding per verkoop. Zodra u koopt, heeft u onbeperkte commerciële rechten — genereer en verkoop zoveel werkbladen als u wilt, voor altijd, zonder iets extra te betalen.',
    },
    {
      question: 'Mag ik werkbladen die ik met de gratis proefversie heb gemaakt gebruiken nadat ik een licentie heb gekocht?',
      answer:
        'Ja. Alle werkbladen die u tijdens de gratis proefversie heeft gemaakt — inclusief watermerk — kunnen zonder watermerk opnieuw worden gegenereerd zodra uw licentie actief is. Uw commerciële licentie werkt met terugwerkende kracht, zodat evaluatiewerk nooit verloren gaat.',
    },
  ],
  sv: [
    {
      question: 'Vad ingår i den kommersiella licensen?',
      answer:
        'Varje arbetsblad du genererar kommer med en fullständig kommersiell licens — ingen attribuering krävs, inga royalties, ingen gräns för antal enheter. Du kan sälja de arbetsblad du skapar på Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen butik eller vilken som helst annan marknadsplats. Engångslicensen på 49 $ täcker obegränsad kommersiell användning för en säljare eller ett företag.',
    },
    {
      question: 'Får jag sälja arbetsblad på Etsy, Amazon KDP, Teachers Pay Teachers och Gumroad?',
      answer:
        'Ja, alla fyra plattformar täcks av den kommersiella licensen. Du kan sälja digitala nedladdningar på Etsy, sammanställa arbetsblad till tryckta pussel- och aktivitetsböcker för Amazon KDP, erbjuda klasspaket på Teachers Pay Teachers och distribuera utskrifter via Gumroad eller din egen webbutik. Licensen begränsar inte vilken marknadsplats du säljer på.',
    },
    {
      question: 'Får jag dela licensen med teammedlemmar eller anställda?',
      answer:
        'En licens täcker ett säljarkonto eller ett företag. Om du driver enskild firma täcker licensen dig och de virtuella assistenter som arbetar för din verksamhet. För team med 3 eller fler personer som genererar arbetsblad självständigt, kontakta supporten om teamlicenser — vi erbjuder rabatterade flerplatspaket.',
    },
    {
      question: 'Får jag sälja samma arbetsblad på 11 språk som separata produkter?',
      answer:
        'Ja. Generatorn stöder 11 språk (engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska, finska), och varje språkversion räknas som en separat produkt under din licens. Många säljare mångdubblar intäkten per tema genom att exportera samma arbetsblad på varje språk och lista dem som separata produkter på Etsy eller KDP.',
    },
    {
      question: 'Finns det försäljningsavgifter eller löpande kostnader?',
      answer:
        'Nej. Licensen är en engångsbetalning på 49 $ utan royalties, utan månadsavgifter och utan avdrag per försäljning. När du köpt har du obegränsade kommersiella rättigheter — skapa och sälj så många arbetsblad du vill, för alltid, utan att betala något mer.',
    },
    {
      question: 'Får jag använda arbetsblad jag skapade med gratisversionen efter att jag köpt en licens?',
      answer:
        'Ja. Alla arbetsblad du skapade under gratisversionen — med vattenstämpel — kan genereras på nytt utan vattenstämpel när din licens är aktiv. Din kommersiella licens gäller retroaktivt, så utvärderingsarbete går aldrig förlorat.',
    },
  ],
  da: [
    {
      question: 'Hvad omfatter den kommercielle licens?',
      answer:
        'Hvert arbejdsark du genererer kommer med en fuld kommerciel licens — ingen navngivning påkrævet, ingen royalties, ingen grænse for antal enheder. Du kan sælge de oprettede arbejdsark på Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen butik eller enhver anden markedsplads. Engangslicensen på 49 $ dækker ubegrænset kommerciel brug for én sælger eller virksomhed.',
    },
    {
      question: 'Må jeg sælge arbejdsark på Etsy, Amazon KDP, Teachers Pay Teachers og Gumroad?',
      answer:
        'Ja, alle fire platforme er dækket af den kommercielle licens. Du kan sælge digitale downloads på Etsy, samle arbejdsark i trykte puslespils- og aktivitetsbøger til Amazon KDP, tilbyde klassepakker på Teachers Pay Teachers og distribuere printables via Gumroad eller din egen webshop. Licensen begrænser ikke hvilken markedsplads du sælger på.',
    },
    {
      question: 'Må jeg dele licensen med teammedlemmer eller medarbejdere?',
      answer:
        'Én licens dækker én sælgerkonto eller virksomhed. Hvis du driver enkeltmandsvirksomhed, dækker licensen dig og eventuelle virtuelle assistenter, der arbejder for din virksomhed. For teams med 3 eller flere personer, der genererer arbejdsark uafhængigt, kontakt supporten om teamlicenser — vi tilbyder rabatterede pakker til flere brugere.',
    },
    {
      question: 'Må jeg sælge det samme arbejdsark på 11 sprog som separate produkter?',
      answer:
        'Ja. Generatoren understøtter 11 sprog (engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk, finsk), og hver sprogversion tæller som et separat produkt under din licens. Mange sælgere mangedobler omsætningen per tema ved at eksportere det samme arbejdsark på hvert sprog og liste dem som separate produkter på Etsy eller KDP.',
    },
    {
      question: 'Er der royalties pr. salg eller løbende gebyrer?',
      answer:
        'Nej. Licensen er en engangsbetaling på 49 $ uden royalties, uden månedlige gebyrer og uden fradrag pr. salg. Når du har købt, ejer du ubegrænsede kommercielle rettigheder — opret og sælg så mange arbejdsark, du vil, for altid, uden at betale mere.',
    },
    {
      question: 'Må jeg bruge arbejdsark, jeg oprettede med den gratis prøveversion, efter jeg har købt en licens?',
      answer:
        'Ja. Alle arbejdsark, du oprettede under den gratis prøveversion — med vandmærke — kan genskabes uden vandmærke, når din licens er aktiv. Din kommercielle licens gælder med tilbagevirkende kraft, så evalueringsarbejde går aldrig tabt.',
    },
  ],
  no: [
    {
      question: 'Hva omfatter den kommersielle lisensen?',
      answer:
        'Hvert arbeidsark du genererer kommer med en fullstendig kommersiell lisens — ingen kreditering kreves, ingen royalties, ingen enhetsgrense. Du kan selge de opprettede arbeidsarkene på Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, din egen butikk eller en hvilken som helst annen markedsplass. Engangslisensen på 49 $ dekker ubegrenset kommersiell bruk for én selger eller bedrift.',
    },
    {
      question: 'Kan jeg selge arbeidsark på Etsy, Amazon KDP, Teachers Pay Teachers og Gumroad?',
      answer:
        'Ja, alle fire plattformer er dekket av den kommersielle lisensen. Du kan selge digitale nedlastinger på Etsy, sette sammen arbeidsark i trykte puslespill- og aktivitetsbøker for Amazon KDP, tilby klasseromssett på Teachers Pay Teachers og distribuere utskrifter via Gumroad eller din egen nettbutikk. Lisensen begrenser ikke hvilken markedsplass du selger på.',
    },
    {
      question: 'Kan jeg dele lisensen med teammedlemmer eller ansatte?',
      answer:
        'Én lisens dekker én selgerkonto eller bedrift. Hvis du driver enkeltpersonforetak, dekker lisensen deg og virtuelle assistenter som arbeider for virksomheten din. For team på 3 eller flere som genererer arbeidsark uavhengig, kontakt supporten om teamlisenser — vi tilbyr rabatterte flerbrukerpakker.',
    },
    {
      question: 'Kan jeg selge det samme arbeidsarket på 11 språk som separate produkter?',
      answer:
        'Ja. Generatoren støtter 11 språk (engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk, finsk), og hver språkversjon teller som et eget produkt under lisensen din. Mange selgere multipliserer inntektene per tema ved å eksportere det samme arbeidsarket på hvert språk og liste dem som separate produkter på Etsy eller KDP.',
    },
    {
      question: 'Finnes det royalties per salg eller løpende kostnader?',
      answer:
        'Nei. Lisensen er en engangsbetaling på 49 $ uten royalties, uten månedlige avgifter og uten fradrag per salg. Når du har kjøpt, eier du ubegrensede kommersielle rettigheter — lag og selg så mange arbeidsark du vil, for alltid, uten å betale mer.',
    },
    {
      question: 'Kan jeg bruke arbeidsark jeg lagde under gratisversjonen etter å ha kjøpt en lisens?',
      answer:
        'Ja. Alle arbeidsark du lagde under gratisversjonen — med vannmerke — kan genereres på nytt uten vannmerke når lisensen din er aktiv. Den kommersielle lisensen din gjelder med tilbakevirkende kraft, så evalueringsarbeid går aldri tapt.',
    },
  ],
  fi: [
    {
      question: 'Mitä kaupallinen lisenssi kattaa?',
      answer:
        'Jokaisen luomasi työarkin mukana tulee täysi kaupallinen lisenssi — ei attribuutiovelvoitetta, ei rojalteja, ei kappalerajaa. Voit myydä luomiasi työarkkeja Etsyssä, Amazon KDP:ssä, Teachers Pay Teachersissa, Gumroadissa, Creative Marketissa, omassa kaupassasi tai millä tahansa muulla markkinapaikalla. Kertalisenssi 49 $ kattaa rajattoman kaupallisen käytön yhdelle myyjälle tai yritykselle.',
    },
    {
      question: 'Saanko myydä työarkkeja Etsyssä, Amazon KDP:ssä, Teachers Pay Teachersissa ja Gumroadissa?',
      answer:
        'Kyllä, kaikki neljä alustaa kuuluvat kaupallisen lisenssin piiriin. Voit myydä digitaalisia latauksia Etsyssä, koota työarkkeja painettuihin pulma- ja tehtäväkirjoihin Amazon KDP:hen, tarjota luokkahuonepaketteja Teachers Pay Teachersissa ja jakaa tulostettavia Gumroadin tai oman verkkokauppasi kautta. Lisenssi ei rajoita sitä, millä markkinapaikalla myyt.',
    },
    {
      question: 'Voinko jakaa lisenssin tiimin jäsenten tai työntekijöiden kanssa?',
      answer:
        'Yksi lisenssi kattaa yhden myyjätilin tai yrityksen. Jos toimit yksityisenä elinkeinonharjoittajana, lisenssi kattaa sinut ja liiketoimintaasi työskentelevät virtuaaliavustajat. Kolmen tai useamman hengen tiimeille, jotka luovat työarkkeja itsenäisesti, ota yhteyttä tukeen tiimilisensseistä — tarjoamme alennettuja monipaikkapaketteja.',
    },
    {
      question: 'Voinko myydä saman työarkin 11 kielellä erillisinä tuotteina?',
      answer:
        'Kyllä. Generaattori tukee 11 kieltä (englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska, norja, suomi), ja jokainen kieliversio lasketaan erilliseksi tuotteeksi lisenssisi alla. Monet myyjät moninkertaistavat liikevaihtoa teemaa kohden viemällä saman työarkin jokaisella kielellä ja listaamalla ne erillisinä tuotteina Etsyssä tai KDP:ssä.',
    },
    {
      question: 'Onko myyntikohtaisia rojalteja tai jatkuvia maksuja?',
      answer:
        'Ei. Lisenssi on 49 dollarin kertamaksu ilman rojalteja, ilman kuukausimaksuja ja ilman myyntikohtaisia vähennyksiä. Ostettuasi omistat rajoittamattomat kaupalliset oikeudet — luo ja myy niin monta työarkkia kuin haluat, ikuisesti, maksamatta enää mitään.',
    },
    {
      question: 'Voinko käyttää ilmaisjaksolla tekemiäni työarkkeja lisenssin ostamisen jälkeen?',
      answer:
        'Kyllä. Kaikki ilmaisjakson aikana luomasi työarkit — vesileimoineen — voidaan luoda uudelleen ilman vesileimaa, kun lisenssisi on aktivoitu. Kaupallinen lisenssisi pätee takautuvasti, joten arviointijakson työ ei koskaan mene hukkaan.',
    },
  ],
};

export function getSharedCommercialFAQs(locale: string): FAQ[] {
  return sharedCommercialFAQs[locale] || sharedCommercialFAQs.en;
}
