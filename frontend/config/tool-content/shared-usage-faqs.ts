interface FAQ { question: string; answer: string }

// Usage-intent FAQs prepended to every /[locale]/tools/[slug] page's FAQ
// section. These focus on the free browser experience: no signup, file
// formats, device compatibility, print settings, session persistence —
// topics that differentiate the informational /tools/*-maker pages from
// the commercial /apps/* pages.
//
// Only EN is populated today. Other locales fall back to EN. Translations
// queued in docs/seo-translation-queue-2026-04.md.
export const sharedUsageFAQs: Record<string, FAQ[]> = {
  en: [
    {
      question: 'Is there really no signup required?',
      answer:
        'Correct — you can open the generator, pick a theme, customize the page layout, and download a watermarked PDF or JPEG without creating an account. No email, no credit card, no trial period. The watermark is a small label in the corner; the underlying worksheet content is identical to the paid version. A one-time $49 license removes the watermark and unlocks commercial selling rights.',
    },
    {
      question: 'What file formats can I download?',
      answer:
        'Every worksheet exports as a print-ready PDF at 400+ DPI and a high-resolution JPEG. The PDF preserves vector text and sharp images for crisp printing at any size. The JPEG is useful for quick previews, social media posts, and platforms that prefer raster images. Both formats download instantly after you click Export.',
    },
    {
      question: 'Will it work on a tablet, Chromebook, or older browser?',
      answer:
        'The generator runs in any modern browser: Chrome, Safari, Firefox, and Edge — all version 90 or later. It works on Chromebooks, iPads, and Android tablets as well as desktops. Older browsers (Internet Explorer, Chrome pre-90) are not supported because the generator uses modern canvas and font-rendering features. If you hit a rendering issue, updating the browser usually fixes it.',
    },
    {
      question: 'What page sizes are supported? How do I print on A4 vs Letter?',
      answer:
        'The Page Setup panel offers Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square, and custom dimensions. Pick the size that matches your intended printer or target market (A4 for most of Europe and Asia, Letter for North America). The PDF export preserves the exact dimensions you chose, so it will print true-to-size on any printer.',
    },
    {
      question: 'Do my worksheets save if I close the tab?',
      answer:
        'Your current worksheet layout is held in browser memory only. Closing the tab clears it. To preserve a worksheet across sessions, download the PDF and JPEG before closing — re-importing the exact same configuration is not supported in the free browser version. If you frequently create batches of related worksheets, purchasing a license also gives you access to saved templates.',
    },
  ],
  de: [
    {
      question: 'Muss ich mich wirklich nicht registrieren?',
      answer:
        'Richtig — Sie können den Generator öffnen, ein Thema wählen, das Seitenlayout anpassen und ein PDF oder JPEG mit Wasserzeichen herunterladen, ohne ein Konto zu erstellen. Keine E-Mail, keine Kreditkarte, keine Testphase. Das Wasserzeichen ist ein kleiner Hinweis in der Ecke; der eigentliche Arbeitsblatt-Inhalt ist identisch mit der bezahlten Version. Eine einmalige Lizenz für 49 $ entfernt das Wasserzeichen und schaltet die kommerziellen Verkaufsrechte frei.',
    },
    {
      question: 'In welchen Dateiformaten kann ich herunterladen?',
      answer:
        'Jedes Arbeitsblatt wird als druckfertiges PDF mit 400+ DPI und als hochauflösendes JPEG exportiert. Das PDF bewahrt Vektortext und scharfe Bilder für gestochen scharfen Druck in jeder Größe. Das JPEG eignet sich für schnelle Vorschauen, Social-Media-Posts und Plattformen, die Rasterbilder bevorzugen. Beide Formate werden sofort heruntergeladen, sobald Sie auf Exportieren klicken.',
    },
    {
      question: 'Funktioniert der Generator auf Tablets, Chromebooks oder älteren Browsern?',
      answer:
        'Der Generator läuft in jedem modernen Browser: Chrome, Safari, Firefox und Edge — jeweils Version 90 oder neuer. Er funktioniert auf Chromebooks, iPads und Android-Tablets ebenso wie auf Desktops. Ältere Browser (Internet Explorer, Chrome vor Version 90) werden nicht unterstützt, da der Generator moderne Canvas- und Font-Rendering-Funktionen nutzt. Bei Darstellungsproblemen hilft meist ein Browser-Update.',
    },
    {
      question: 'Welche Seitenformate werden unterstützt? Wie drucke ich A4 vs. Letter?',
      answer:
        'Das Seitenlayout-Panel bietet Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat, Quadrat und benutzerdefinierte Maße. Wählen Sie die Größe, die zu Ihrem Drucker oder Zielmarkt passt (A4 für die meisten europäischen und asiatischen Märkte, Letter für Nordamerika). Der PDF-Export bewahrt die exakten Maße, sodass das Blatt auf jedem Drucker originalgetreu gedruckt wird.',
    },
    {
      question: 'Werden meine Arbeitsblätter gespeichert, wenn ich den Tab schließe?',
      answer:
        'Ihr aktuelles Arbeitsblatt-Layout liegt nur im Browser-Speicher. Beim Schließen des Tabs geht es verloren. Um ein Arbeitsblatt über Sitzungen hinweg zu erhalten, laden Sie das PDF und JPEG vor dem Schließen herunter — das erneute Importieren derselben Konfiguration wird in der kostenlosen Browser-Version nicht unterstützt. Wenn Sie regelmäßig mehrere verwandte Arbeitsblätter erstellen, erhalten Sie mit einer Lizenz auch Zugriff auf gespeicherte Vorlagen.',
    },
  ],
  fr: [
    {
      question: 'Vraiment aucune inscription requise ?',
      answer:
        'Exact — vous pouvez ouvrir le générateur, choisir un thème, personnaliser la mise en page et télécharger un PDF ou JPEG avec filigrane sans créer de compte. Aucun e-mail, aucune carte bancaire, aucune période d\'essai. Le filigrane est une petite mention dans un coin ; le contenu de la fiche est identique à la version payante. Une licence unique à 49 $ supprime le filigrane et active les droits de vente commerciale.',
    },
    {
      question: 'Quels formats de fichiers puis-je télécharger ?',
      answer:
        'Chaque fiche s\'exporte en PDF prêt à l\'impression à 400+ DPI et en JPEG haute résolution. Le PDF conserve le texte vectoriel et les images nettes pour une impression précise à toute taille. Le JPEG est utile pour des aperçus rapides, les publications sur les réseaux sociaux et les plateformes qui préfèrent les images matricielles. Les deux formats se téléchargent instantanément après un clic sur Exporter.',
    },
    {
      question: 'Le générateur fonctionne-t-il sur tablette, Chromebook ou ancien navigateur ?',
      answer:
        'Le générateur fonctionne sur tout navigateur moderne : Chrome, Safari, Firefox et Edge — version 90 ou ultérieure. Il fonctionne sur Chromebooks, iPads et tablettes Android ainsi que sur ordinateurs de bureau. Les anciens navigateurs (Internet Explorer, Chrome antérieur à la version 90) ne sont pas pris en charge car le générateur utilise des fonctions modernes de canvas et de rendu de polices. En cas de problème d\'affichage, une mise à jour du navigateur résout généralement la question.',
    },
    {
      question: 'Quels formats de page sont pris en charge ? Comment imprimer en A4 vs Letter ?',
      answer:
        'Le panneau Mise en page propose Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré et des dimensions personnalisées. Choisissez le format qui correspond à votre imprimante ou au marché ciblé (A4 pour la plupart des marchés européens et asiatiques, Letter pour l\'Amérique du Nord). L\'export PDF conserve exactement les dimensions choisies pour une impression fidèle sur toute imprimante.',
    },
    {
      question: 'Mes fiches sont-elles sauvegardées si je ferme l\'onglet ?',
      answer:
        'La mise en page actuelle reste uniquement en mémoire du navigateur. Fermer l\'onglet efface tout. Pour conserver une fiche entre les sessions, téléchargez le PDF et le JPEG avant de fermer — l\'import de la même configuration n\'est pas pris en charge dans la version navigateur gratuite. Si vous créez régulièrement des lots de fiches apparentées, une licence donne aussi accès aux modèles enregistrés.',
    },
  ],
  es: [
    {
      question: '¿De verdad no es necesario registrarse?',
      answer:
        'Correcto: puede abrir el generador, elegir un tema, personalizar la maquetación y descargar un PDF o JPEG con marca de agua sin crear una cuenta. Sin correo electrónico, sin tarjeta de crédito, sin período de prueba. La marca de agua es un pequeño indicativo en la esquina; el contenido de la ficha es idéntico a la versión de pago. La licencia única de 49 $ elimina la marca de agua y activa los derechos de venta comercial.',
    },
    {
      question: '¿Qué formatos de archivo puedo descargar?',
      answer:
        'Cada ficha se exporta como PDF listo para imprimir a 400+ DPI y como JPEG de alta resolución. El PDF conserva el texto vectorial y las imágenes nítidas para una impresión limpia a cualquier tamaño. El JPEG es útil para vistas previas rápidas, publicaciones en redes sociales y plataformas que prefieren imágenes rasterizadas. Ambos formatos se descargan de forma instantánea al pulsar Exportar.',
    },
    {
      question: '¿Funciona en tabletas, Chromebook o navegadores antiguos?',
      answer:
        'El generador funciona en cualquier navegador moderno: Chrome, Safari, Firefox y Edge, versión 90 o posterior. Funciona en Chromebooks, iPads y tabletas Android, además de en equipos de escritorio. Los navegadores antiguos (Internet Explorer, Chrome anterior a la 90) no son compatibles porque el generador utiliza funciones modernas de canvas y renderizado de fuentes. Si observa algún problema de visualización, actualizar el navegador suele resolverlo.',
    },
    {
      question: '¿Qué tamaños de página se admiten? ¿Cómo imprimo A4 vs Letter?',
      answer:
        'El panel de Maquetación ofrece Letter Vertical, Letter Horizontal, A4 Vertical, A4 Horizontal, Cuadrado y dimensiones personalizadas. Elija el tamaño que coincida con su impresora o mercado objetivo (A4 para la mayoría de mercados europeos e iberoamericanos, Letter para Norteamérica). La exportación a PDF conserva las dimensiones exactas elegidas para una impresión fiel en cualquier impresora.',
    },
    {
      question: '¿Se guardan mis fichas si cierro la pestaña?',
      answer:
        'La maquetación actual solo se conserva en la memoria del navegador. Cerrar la pestaña la elimina. Para conservar una ficha entre sesiones, descargue el PDF y el JPEG antes de cerrar: reimportar la misma configuración no es compatible en la versión gratuita del navegador. Si crea lotes de fichas relacionadas con frecuencia, la licencia también da acceso a plantillas guardadas.',
    },
  ],
  it: [
    {
      question: 'Davvero non serve registrarsi?',
      answer:
        'Esatto: puoi aprire il generatore, scegliere un tema, personalizzare l\'impaginazione e scaricare un PDF o JPEG con filigrana senza creare un account. Nessuna email, nessuna carta di credito, nessun periodo di prova. La filigrana è una piccola etichetta in un angolo; il contenuto della scheda è identico alla versione a pagamento. La licenza unica da 49 $ rimuove la filigrana e attiva i diritti di vendita commerciale.',
    },
    {
      question: 'Quali formati di file posso scaricare?',
      answer:
        'Ogni scheda si esporta come PDF pronto per la stampa a 400+ DPI e come JPEG ad alta risoluzione. Il PDF mantiene testo vettoriale e immagini nitide per una stampa pulita a qualsiasi dimensione. Il JPEG è utile per anteprime veloci, pubblicazioni sui social e piattaforme che preferiscono immagini raster. Entrambi i formati si scaricano all\'istante dopo il clic su Esporta.',
    },
    {
      question: 'Funziona su tablet, Chromebook o browser meno recenti?',
      answer:
        'Il generatore funziona su qualsiasi browser moderno: Chrome, Safari, Firefox ed Edge, versione 90 o successiva. Funziona su Chromebook, iPad e tablet Android oltre che su desktop. I browser meno recenti (Internet Explorer, Chrome precedente alla 90) non sono supportati perché il generatore usa funzioni moderne di canvas e rendering dei font. In caso di problemi di visualizzazione, aggiornare il browser di solito risolve.',
    },
    {
      question: 'Quali formati pagina sono supportati? Come stampo A4 vs Letter?',
      answer:
        'Il pannello Impaginazione offre Letter Verticale, Letter Orizzontale, A4 Verticale, A4 Orizzontale, Quadrato e dimensioni personalizzate. Scegli il formato che corrisponde alla tua stampante o al mercato target (A4 per la maggior parte dei mercati europei e asiatici, Letter per il Nord America). L\'esportazione PDF conserva le dimensioni esatte scelte per una stampa fedele su qualsiasi stampante.',
    },
    {
      question: 'Le mie schede vengono salvate se chiudo la scheda del browser?',
      answer:
        'L\'impaginazione attuale rimane solo nella memoria del browser. Chiudere la scheda la cancella. Per conservare una scheda tra sessioni, scarica il PDF e il JPEG prima di chiudere: reimportare la stessa configurazione non è supportato nella versione browser gratuita. Se crei regolarmente lotti di schede correlate, la licenza dà anche accesso ai modelli salvati.',
    },
  ],
  pt: [
    {
      question: 'Realmente não precisa de cadastro?',
      answer:
        'Correto: você pode abrir o gerador, escolher um tema, personalizar o layout da página e baixar um PDF ou JPEG com marca d\'água sem criar uma conta. Sem e-mail, sem cartão de crédito, sem período de teste. A marca d\'água é um pequeno rótulo no canto; o conteúdo da atividade é idêntico à versão paga. A licença única de US$ 49 remove a marca d\'água e libera os direitos de venda comercial.',
    },
    {
      question: 'Quais formatos de arquivo posso baixar?',
      answer:
        'Cada atividade é exportada como PDF pronto para impressão a 400+ DPI e JPEG em alta resolução. O PDF preserva o texto vetorial e as imagens nítidas para uma impressão limpa em qualquer tamanho. O JPEG é útil para prévias rápidas, postagens em redes sociais e plataformas que preferem imagens raster. Ambos os formatos são baixados instantaneamente após clicar em Exportar.',
    },
    {
      question: 'Funciona em tablet, Chromebook ou navegador mais antigo?',
      answer:
        'O gerador funciona em qualquer navegador moderno: Chrome, Safari, Firefox e Edge, versão 90 ou posterior. Funciona em Chromebooks, iPads e tablets Android, além de computadores desktop. Navegadores mais antigos (Internet Explorer, Chrome anterior à 90) não são suportados porque o gerador usa recursos modernos de canvas e renderização de fontes. Se houver problema de exibição, atualizar o navegador geralmente resolve.',
    },
    {
      question: 'Quais tamanhos de página são suportados? Como imprimo em A4 vs Letter?',
      answer:
        'O painel de Layout oferece Letter Retrato, Letter Paisagem, A4 Retrato, A4 Paisagem, Quadrado e dimensões personalizadas. Escolha o tamanho que combina com sua impressora ou mercado-alvo (A4 para a maioria dos mercados europeus, latino-americanos e asiáticos; Letter para a América do Norte). A exportação em PDF preserva as dimensões exatas escolhidas para uma impressão fiel em qualquer impressora.',
    },
    {
      question: 'Minhas atividades são salvas se eu fechar a aba?',
      answer:
        'O layout atual permanece apenas na memória do navegador. Fechar a aba apaga tudo. Para preservar uma atividade entre sessões, baixe o PDF e o JPEG antes de fechar: reimportar a mesma configuração não é suportado na versão gratuita do navegador. Se você cria lotes de atividades relacionadas com frequência, a licença também dá acesso a modelos salvos.',
    },
  ],
  nl: [
    {
      question: 'Is er echt geen registratie nodig?',
      answer:
        'Klopt: u kunt de generator openen, een thema kiezen, de pagina-indeling aanpassen en een PDF of JPEG met watermerk downloaden zonder een account aan te maken. Geen e-mail, geen creditcard, geen proefperiode. Het watermerk is een klein label in de hoek; de inhoud van het werkblad is identiek aan de betaalde versie. Een eenmalige licentie van $ 49 verwijdert het watermerk en activeert commerciële verkooprechten.',
    },
    {
      question: 'Welke bestandsformaten kan ik downloaden?',
      answer:
        'Elk werkblad wordt geëxporteerd als afdrukklaar PDF op 400+ DPI en als JPEG in hoge resolutie. Het PDF behoudt vectorteksten en scherpe afbeeldingen voor heldere afdrukken in elk formaat. Het JPEG is handig voor snelle previews, sociale media posts en platforms die rasterafbeeldingen verkiezen. Beide formaten worden direct gedownload na een klik op Exporteren.',
    },
    {
      question: 'Werkt de generator op tablet, Chromebook of oudere browser?',
      answer:
        'De generator werkt in elke moderne browser: Chrome, Safari, Firefox en Edge, versie 90 of hoger. Hij werkt op Chromebooks, iPads en Android-tablets naast desktops. Oudere browsers (Internet Explorer, Chrome vóór 90) worden niet ondersteund omdat de generator moderne canvas- en font-rendering-functies gebruikt. Bij weergaveproblemen lost het bijwerken van de browser het meestal op.',
    },
    {
      question: 'Welke paginaformaten worden ondersteund? Hoe print ik A4 vs Letter?',
      answer:
        'Het paneel Pagina-indeling biedt Letter Staand, Letter Liggend, A4 Staand, A4 Liggend, Vierkant en aangepaste afmetingen. Kies het formaat dat bij uw printer of doelmarkt past (A4 voor de meeste Europese en Aziatische markten, Letter voor Noord-Amerika). De PDF-export bewaart de exacte gekozen afmetingen voor een exacte afdruk op elke printer.',
    },
    {
      question: 'Worden mijn werkbladen bewaard als ik het tabblad sluit?',
      answer:
        'De huidige pagina-indeling blijft alleen in het geheugen van de browser. Het tabblad sluiten wist alles. Om een werkblad te bewaren tussen sessies, download het PDF en JPEG voordat u sluit — dezelfde configuratie opnieuw importeren wordt niet ondersteund in de gratis browserversie. Als u regelmatig lotten gerelateerde werkbladen maakt, geeft een licentie ook toegang tot opgeslagen sjablonen.',
    },
  ],
  sv: [
    {
      question: 'Behöver jag verkligen inte registrera mig?',
      answer:
        'Stämmer: du kan öppna generatorn, välja ett tema, anpassa sidlayouten och ladda ner en PDF eller JPEG med vattenstämpel utan att skapa ett konto. Ingen e-post, inget kreditkort, ingen provperiod. Vattenstämpeln är en liten etikett i hörnet; själva arbetsbladets innehåll är identiskt med den betalda versionen. Engångslicensen på 49 $ tar bort vattenstämpeln och aktiverar kommersiella försäljningsrättigheter.',
    },
    {
      question: 'Vilka filformat kan jag ladda ner?',
      answer:
        'Varje arbetsblad exporteras som tryckfärdig PDF på 400+ DPI och som JPEG i hög upplösning. PDF-filen bevarar vektortext och skarpa bilder för ren utskrift i valfri storlek. JPEG:en är praktisk för snabba förhandsvisningar, inlägg på sociala medier och plattformar som föredrar rasterbilder. Båda formaten laddas ner direkt efter klick på Exportera.',
    },
    {
      question: 'Fungerar generatorn på surfplatta, Chromebook eller äldre webbläsare?',
      answer:
        'Generatorn fungerar i alla moderna webbläsare: Chrome, Safari, Firefox och Edge, version 90 eller senare. Den fungerar på Chromebooks, iPads och Android-surfplattor förutom datorer. Äldre webbläsare (Internet Explorer, Chrome före version 90) stöds inte eftersom generatorn använder moderna canvas- och typsnittsrenderingsfunktioner. Vid visningsproblem brukar en uppdatering av webbläsaren lösa det.',
    },
    {
      question: 'Vilka sidstorlekar stöds? Hur skriver jag ut på A4 vs Letter?',
      answer:
        'Sidlayoutpanelen erbjuder Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat och anpassade mått. Välj den storlek som matchar din skrivare eller målmarknad (A4 för de flesta europeiska och asiatiska marknader, Letter för Nordamerika). PDF-exporten bevarar de exakta mått du valt för en korrekt utskrift på vilken skrivare som helst.',
    },
    {
      question: 'Sparas mina arbetsblad om jag stänger fliken?',
      answer:
        'Den aktuella layouten finns endast i webbläsarens minne. Att stänga fliken rensar den. För att bevara ett arbetsblad mellan sessioner, ladda ner PDF och JPEG innan du stänger — att återimportera samma konfiguration stöds inte i den gratis webbläsarversionen. Om du regelbundet skapar satser av relaterade arbetsblad ger en licens också tillgång till sparade mallar.',
    },
  ],
};

export function getSharedUsageFAQs(locale: string): FAQ[] {
  return sharedUsageFAQs[locale] || sharedUsageFAQs.en;
}
