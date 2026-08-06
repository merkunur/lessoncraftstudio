const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'frontend', 'messages');

const translations = {
  de: {
    metaKeywords: "ueber LessonCraftStudio, Arbeitsblatt-Generatoren, Druckvorlagen-Erstellungstools, Etsy-Druckvorlagen, Amazon-KDP-Arbeitsblaetter, Raetselbuch-Ersteller, kommerzieller Arbeitsblatt-Generator, mehrsprachige Arbeitsblaetter",
    expertise: {
      title: "Fuer Verkaeufer entwickelt",
      subtitle: "Jede Funktion ist darauf ausgelegt, Ihnen zu helfen, mehr Produkte schneller zu erstellen und zu verkaufen",
      curriculum: {
        title: "Kommerziell einsatzbereit",
        description: "300 DPI PDF-Export, automatische Loesungsschluessel, KDP-optimierte Formatierung und Graustufenmodus. Ihre Ausgabe ist sofort bereit fuer Etsy, Amazon KDP oder Teachers Pay Teachers."
      },
      educators: {
        title: "Volle kommerzielle Rechte",
        description: "Jedes kostenpflichtige Produkt beinhaltet uneingeschraenkte kommerzielle Rechte. Verkaufen Sie auf jeder Plattform, in jeder Menge. Keine Namensnennung erforderlich, keine Lizenzgebuehren, keine Einschraenkungen."
      },
      evidence: {
        title: "Einmaliger Kauf",
        description: "Keine Abonnements, keine monatlichen Gebuehren, keine versteckten Kosten. Zahlen Sie einmal und nutzen Sie Ihre Generatoren fuer immer. Alle Produkte beinhalten eine 30-Tage-Geld-zurueck-Garantie."
      }
    }
  },
  fr: {
    metaKeywords: "a propos de LessonCraftStudio, generateurs de fiches, outils de creation imprimables, imprimables Etsy, fiches Amazon KDP, createur de livres de puzzles, generateur de fiches commercial, fiches multilingues",
    expertise: {
      title: "Concu pour les vendeurs",
      subtitle: "Chaque fonctionnalite est concue pour vous aider a creer et vendre plus de produits, plus rapidement",
      curriculum: {
        title: "Production prete a la vente",
        description: "Export PDF 300 DPI, corriges automatiques, formatage optimise KDP et mode niveaux de gris. Vos fichiers sont prets a publier sur Etsy, Amazon KDP ou Teachers Pay Teachers immediatement."
      },
      educators: {
        title: "Droits commerciaux complets",
        description: "Chaque produit payant inclut des droits commerciaux illimites. Vendez sur toute plateforme, en toute quantite. Aucune attribution requise, aucune redevance, aucune restriction."
      },
      evidence: {
        title: "Achat unique",
        description: "Pas d'abonnement, pas de frais mensuels, pas de couts caches. Payez une fois et utilisez vos generateurs pour toujours. Tous les produits incluent une garantie de remboursement de 30 jours."
      }
    }
  },
  es: {
    metaKeywords: "sobre LessonCraftStudio, generadores de fichas, herramientas de creacion de imprimibles, imprimibles Etsy, fichas Amazon KDP, creador de libros de puzzles, generador de fichas comercial, fichas multilingues",
    expertise: {
      title: "Creado para vendedores",
      subtitle: "Cada funcion esta disenada para ayudarte a crear y vender mas productos, mas rapido",
      curriculum: {
        title: "Produccion lista para vender",
        description: "Exportacion PDF 300 DPI, claves de respuesta automaticas, formato optimizado para KDP y modo escala de grises. Tu produccion esta lista para publicar en Etsy, Amazon KDP o Teachers Pay Teachers inmediatamente."
      },
      educators: {
        title: "Derechos comerciales completos",
        description: "Cada producto de pago incluye derechos comerciales sin restricciones. Vende en cualquier plataforma, en cualquier cantidad. Sin atribucion requerida, sin regalias, sin restricciones."
      },
      evidence: {
        title: "Compra unica",
        description: "Sin suscripciones, sin cuotas mensuales, sin costos ocultos. Paga una vez y usa tus generadores para siempre. Todos los productos incluyen una garantia de devolucion de 30 dias."
      }
    }
  },
  pt: {
    metaKeywords: "sobre LessonCraftStudio, geradores de fichas, ferramentas de criacao de imprimiveis, imprimiveis Etsy, fichas Amazon KDP, criador de livros de puzzles, gerador de fichas comercial, fichas multilingues",
    expertise: {
      title: "Criado para vendedores",
      subtitle: "Cada funcionalidade e projetada para ajuda-lo a criar e vender mais produtos, mais rapido",
      curriculum: {
        title: "Producao pronta para venda",
        description: "Exportacao PDF 300 DPI, gabaritos automaticos, formatacao otimizada para KDP e modo escala de cinza. Sua producao esta pronta para publicar no Etsy, Amazon KDP ou Teachers Pay Teachers imediatamente."
      },
      educators: {
        title: "Direitos comerciais completos",
        description: "Cada produto pago inclui direitos comerciais sem restricoes. Venda em qualquer plataforma, em qualquer quantidade. Sem atribuicao necessaria, sem royalties, sem restricoes."
      },
      evidence: {
        title: "Compra unica",
        description: "Sem assinaturas, sem taxas mensais, sem custos ocultos. Pague uma vez e use seus geradores para sempre. Todos os produtos incluem garantia de reembolso de 30 dias."
      }
    }
  },
  it: {
    metaKeywords: "informazioni su LessonCraftStudio, generatori di schede, strumenti per la creazione di stampabili, stampabili Etsy, schede Amazon KDP, creatore di libri di puzzle, generatore di schede commerciale, schede multilingue",
    expertise: {
      title: "Progettato per i venditori",
      subtitle: "Ogni funzione e progettata per aiutarti a creare e vendere piu prodotti, piu velocemente",
      curriculum: {
        title: "Produzione pronta per la vendita",
        description: "Esportazione PDF 300 DPI, chiavi di risposta automatiche, formattazione ottimizzata per KDP e modalita scala di grigi. Il tuo output e pronto per la pubblicazione su Etsy, Amazon KDP o Teachers Pay Teachers immediatamente."
      },
      educators: {
        title: "Diritti commerciali completi",
        description: "Ogni prodotto a pagamento include diritti commerciali senza restrizioni. Vendi su qualsiasi piattaforma, in qualsiasi quantita. Nessuna attribuzione richiesta, nessuna royalty, nessuna restrizione."
      },
      evidence: {
        title: "Acquisto una tantum",
        description: "Nessun abbonamento, nessun canone mensile, nessun costo nascosto. Paga una volta e usa i tuoi generatori per sempre. Tutti i prodotti includono una garanzia di rimborso di 30 giorni."
      }
    }
  },
  nl: {
    metaKeywords: "over LessonCraftStudio, werkbladgeneratoren, tools voor printbare creatie, Etsy printables, Amazon KDP werkbladen, puzzelboekmaker, commerciele werkbladgenerator, meertalige werkbladen",
    expertise: {
      title: "Gebouwd voor verkopers",
      subtitle: "Elke functie is ontworpen om u te helpen meer producten sneller te maken en te verkopen",
      curriculum: {
        title: "Verkoopklare output",
        description: "300 DPI PDF-export, automatische antwoordsleutels, KDP-geoptimaliseerde opmaak en grijstintenmodus. Uw output is direct klaar voor Etsy, Amazon KDP of Teachers Pay Teachers."
      },
      educators: {
        title: "Volledige commerciele rechten",
        description: "Elk betaald product bevat onbeperkte commerciele rechten. Verkoop op elk platform, in elke hoeveelheid. Geen naamsvermelding vereist, geen royalties, geen beperkingen."
      },
      evidence: {
        title: "Eenmalige aankoop",
        description: "Geen abonnementen, geen maandelijkse kosten, geen verborgen kosten. Betaal eenmaal en gebruik uw generatoren voor altijd. Alle producten bevatten een 30 dagen geld-terug-garantie."
      }
    }
  },
  sv: {
    metaKeywords: "om LessonCraftStudio, arbetsbladsgeneratorer, verktyg foer utskriftsbar skapande, Etsy utskriftsbart, Amazon KDP arbetsblad, pusselbok-skapare, kommersiell arbetsbladsgenerator, flersprakiga arbetsblad",
    expertise: {
      title: "Byggt foer saeljare",
      subtitle: "Varje funktion aer utformad foer att hjaelpa dig skapa och saelja fler produkter, snabbare",
      curriculum: {
        title: "Saeljklar produktion",
        description: "300 DPI PDF-export, automatiska svarsmanualer, KDP-optimerad formatering och graskalalaege. Din produktion aer redo att publicera pa Etsy, Amazon KDP eller Teachers Pay Teachers omedelbart."
      },
      educators: {
        title: "Fullstaendiga kommersiella raettigheter",
        description: "Varje betald produkt inkluderar obegrraensade kommersiella raettigheter. Saelj pa vilken plattform som helst, i vilken maengd som helst. Ingen tillskrivning kraevs, inga royalties, inga begraensningar."
      },
      evidence: {
        title: "Engaangskoep",
        description: "Inga prenumerationer, inga maanadsavgifter, inga dolda kostnader. Betala en gang och anvaend dina generatorer foer alltid. Alla produkter inkluderar en 30 dagars pengarna-tillbaka-garanti."
      }
    }
  },
  da: {
    metaKeywords: "om LessonCraftStudio, arbejdsarkgeneratorer, vaerktojer til printbar oprettelse, Etsy printbare, Amazon KDP arbejdsark, puzzlebogsmaker, kommerciel arbejdsarkgenerator, flersprogede arbejdsark",
    expertise: {
      title: "Bygget til saelgere",
      subtitle: "Hver funktion er designet til at hjaelpe dig med at skabe og saelge flere produkter, hurtigere",
      curriculum: {
        title: "Salgsklar produktion",
        description: "300 DPI PDF-eksport, automatiske svarnogler, KDP-optimeret formatering og graskalatilstand. Din produktion er klar til at publicere pa Etsy, Amazon KDP eller Teachers Pay Teachers med det samme."
      },
      educators: {
        title: "Fulde kommercielle rettigheder",
        description: "Hvert betalt produkt inkluderer ubegraensede kommercielle rettigheder. Saelg pa enhver platform, i enhver maengde. Ingen tilskrivning kraevet, ingen royalties, ingen begraensninger."
      },
      evidence: {
        title: "Engangskob",
        description: "Ingen abonnementer, ingen manedlige gebyrer, ingen skjulte omkostninger. Betal en gang og brug dine generatorer for evigt. Alle produkter inkluderer en 30 dages pengene-tilbage-garanti."
      }
    }
  },
  no: {
    metaKeywords: "om LessonCraftStudio, arbeidsarkgeneratorer, verktoy for utskriftsbar oppretting, Etsy utskriftsbart, Amazon KDP arbeidsark, puslebokkskaper, kommersiell arbeidsarkgenerator, flerspraklige arbeidsark",
    expertise: {
      title: "Bygget for selgere",
      subtitle: "Hver funksjon er designet for a hjelpe deg med a lage og selge flere produkter, raskere",
      curriculum: {
        title: "Salgsklar produksjon",
        description: "300 DPI PDF-eksport, automatiske svarnoekler, KDP-optimert formatering og graskalamodus. Produksjonen din er klar til a publisere pa Etsy, Amazon KDP eller Teachers Pay Teachers umiddelbart."
      },
      educators: {
        title: "Fulle kommersielle rettigheter",
        description: "Hvert betalt produkt inkluderer ubegrensede kommersielle rettigheter. Selg pa hvilken som helst plattform, i hvilken som helst mengde. Ingen tilskrivning krevet, ingen royalties, ingen begrensninger."
      },
      evidence: {
        title: "Engangskjop",
        description: "Ingen abonnementer, ingen manedlige avgifter, ingen skjulte kostnader. Betal en gang og bruk generatorene dine for alltid. Alle produkter inkluderer en 30 dagers pengene-tilbake-garanti."
      }
    }
  },
  fi: {
    metaKeywords: "tietoa LessonCraftStudiosta, tyoarkkigeneraattorit, tulostettavien luontityokalut, Etsy tulostettavat, Amazon KDP tyoarkit, palapelikiirjan tekija, kaupallinen tyoarkkigeneraattori, monikieliset tyoarkit",
    expertise: {
      title: "Rakennettu myyjille",
      subtitle: "Jokainen ominaisuus on suunniteltu auttamaan sinua luomaan ja myymaan enemman tuotteita, nopeammin",
      curriculum: {
        title: "Myyntivalmis tuotanto",
        description: "300 DPI PDF-vienti, automaattiset vastausavaimet, KDP-optimoitu muotoilu ja harmaasavytila. Tuotantosi on valmis julkaistavaksi Etsyssa, Amazon KDP:ssa tai Teachers Pay Teachersissa valittomasti."
      },
      educators: {
        title: "Taydet kaupalliset oikeudet",
        description: "Jokainen maksullinen tuote sisaltaa rajoittamattomat kaupalliset oikeudet. Myy milla tahansa alustalla, missa tahansa maarassa. Ei mainintavaatimusta, ei rojalteja, ei rajoituksia."
      },
      evidence: {
        title: "Kertaosto",
        description: "Ei tilauksia, ei kuukausimaksuja, ei piilokustannuksia. Maksa kerran ja kaytta generaattoreitasi ikuisesti. Kaikki tuotteet sisaltavat 30 paivan rahat-takaisin-takuun."
      }
    }
  }
};

for (const [locale, trans] of Object.entries(translations)) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!content.about) {
    console.log(`SKIP ${locale}: no about section`);
    continue;
  }

  let changed = false;

  if (!content.about.metaKeywords) {
    content.about.metaKeywords = trans.metaKeywords;
    changed = true;
  }

  if (!content.about.expertise) {
    content.about.expertise = trans.expertise;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
    console.log(`${locale}: added missing about translations`);
  } else {
    console.log(`${locale}: already complete`);
  }
}

console.log('Done!');
