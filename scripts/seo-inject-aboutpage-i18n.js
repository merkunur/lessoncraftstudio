#!/usr/bin/env node
/**
 * One-shot: inject the `aboutPage` namespace into each of the 11 locale
 * message files for the new /[locale]/about/ SSR page (Phase 6 of the SEO
 * remediation arc).
 *
 * Per CLAUDE.md §A.13.48: this is a small namespace (~9 short strings),
 * intentionally below the threshold that triggers the 3-agent native
 * ensemble. Positioning copy is composed from existing brand voice in
 * `homepage.meta` plus locale-natural framing; credibility section is a
 * deliberate TODO-stub.
 *
 * Per CLAUDE.md §17.5.1: Nordic+Finnic (sv/da/no/fi) ship NSR-flagged at
 * commit time. Romance Tier 4 (fr/it/pt) ships without NSR per stronger
 * Claude quality assessment.
 *
 * Idempotent: re-running overwrites the existing `aboutPage` block with
 * the canonical strings below.
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'frontend', 'messages');

const ABOUT_PAGE_STRINGS = {
  en: {
    meta: {
      title: 'About | LessonCraftStudio',
      description: 'About LessonCraftStudio — free K-3 worksheets and interactive activities in 11 languages, built for dual-language, bilingual, and international-school classrooms.',
    },
    pageTitle: 'About LessonCraftStudio',
    intro: 'LessonCraftStudio publishes free K-3 worksheets and interactive activities in 11 languages. Everything is free to browse, print, share, and embed — no signup required.',
    whatWeOfferHeading: 'What we offer',
    whatWeOfferBody: 'Printable PDFs and browser-playable activities across math, phonics, and vocabulary, available in English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish.',
    audienceHeading: "Who it's for",
    audienceBody: 'Built for teachers and parents in dual-language, bilingual, and international-school classrooms, especially in early childhood (ages 3 to 7).',
    teamHeading: 'About our team',
    teamBody: "We're updating this section — check back soon.",
  },
  de: {
    meta: {
      title: 'Über uns | LessonCraftStudio',
      description: 'Über LessonCraftStudio — kostenlose K-3 Arbeitsblätter und interaktive Aufgaben in 11 Sprachen, für mehrsprachige, bilinguale und internationale Klassen.',
    },
    pageTitle: 'Über LessonCraftStudio',
    intro: 'LessonCraftStudio veröffentlicht kostenlose K-3 Arbeitsblätter und interaktive Aufgaben in 11 Sprachen. Alles ist frei zugänglich — keine Anmeldung nötig.',
    whatWeOfferHeading: 'Was wir anbieten',
    whatWeOfferBody: 'Druckbare PDFs und im Browser spielbare Aufgaben rund um Mathe, Phonetik und Wortschatz, verfügbar in Englisch, Deutsch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch.',
    audienceHeading: 'Für wen',
    audienceBody: 'Entwickelt für Lehrkräfte und Eltern in mehrsprachigen, bilingualen und internationalen Klassen, vor allem für die frühe Kindheit (3 bis 7 Jahre).',
    teamHeading: 'Über unser Team',
    teamBody: 'Wir aktualisieren diesen Abschnitt — bald gibt es mehr.',
  },
  fr: {
    meta: {
      title: 'À propos | LessonCraftStudio',
      description: 'À propos de LessonCraftStudio — fiches K-3 gratuites et activités interactives en 11 langues, pour les classes bilingues, plurilingues et internationales.',
    },
    pageTitle: 'À propos de LessonCraftStudio',
    intro: "LessonCraftStudio publie gratuitement des fiches K-3 et des activités interactives en 11 langues. Tout est en libre accès — pas d'inscription.",
    whatWeOfferHeading: 'Ce que nous proposons',
    whatWeOfferBody: 'Fiches imprimables en PDF et activités jouables dans le navigateur en mathématiques, phonétique et vocabulaire, disponibles en anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.',
    audienceHeading: 'Pour qui',
    audienceBody: 'Conçu pour les enseignants et les parents en classes bilingues, plurilingues et internationales, en particulier pour la petite enfance (3 à 7 ans).',
    teamHeading: 'À propos de notre équipe',
    teamBody: 'Nous mettons à jour cette section — à très vite.',
  },
  es: {
    meta: {
      title: 'Acerca de | LessonCraftStudio',
      description: 'Acerca de LessonCraftStudio — hojas de trabajo K-3 gratis y actividades interactivas en 11 idiomas, para aulas bilingües, plurilingües e internacionales.',
    },
    pageTitle: 'Acerca de LessonCraftStudio',
    intro: 'LessonCraftStudio publica hojas de trabajo K-3 gratis y actividades interactivas en 11 idiomas. Todo es de acceso libre — sin registro.',
    whatWeOfferHeading: 'Lo que ofrecemos',
    whatWeOfferBody: 'Hojas imprimibles en PDF y actividades jugables en el navegador de matemáticas, fonética y vocabulario, disponibles en inglés, alemán, francés, español, portugués, italiano, neerlandés, sueco, danés, noruego y finés.',
    audienceHeading: 'Para quién',
    audienceBody: 'Pensado para docentes y familias en aulas bilingües, plurilingües e internacionales, especialmente en la primera infancia (3 a 7 años).',
    teamHeading: 'Sobre nuestro equipo',
    teamBody: 'Estamos actualizando esta sección — vuelve pronto.',
  },
  pt: {
    meta: {
      title: 'Sobre | LessonCraftStudio',
      description: 'Sobre o LessonCraftStudio — fichas K-3 grátis e atividades interativas em 11 idiomas, para turmas bilíngues, plurilíngues e internacionais.',
    },
    pageTitle: 'Sobre o LessonCraftStudio',
    intro: 'O LessonCraftStudio publica fichas K-3 grátis e atividades interativas em 11 idiomas. Tudo é de acesso livre — sem cadastro.',
    whatWeOfferHeading: 'O que oferecemos',
    whatWeOfferBody: 'PDFs imprimíveis e atividades jogáveis no navegador para matemática, fonética e vocabulário, disponíveis em inglês, alemão, francês, espanhol, português, italiano, neerlandês, sueco, dinamarquês, norueguês e finlandês.',
    audienceHeading: 'Para quem é',
    audienceBody: 'Pensado para professores e famílias em turmas bilíngues, plurilíngues e internacionais, principalmente na primeira infância (3 a 7 anos).',
    teamHeading: 'Sobre nossa equipe',
    teamBody: 'Estamos atualizando esta seção — volte em breve.',
  },
  it: {
    meta: {
      title: 'Chi siamo | LessonCraftStudio',
      description: 'Chi siamo — LessonCraftStudio: schede K-3 gratuite e attività interattive in 11 lingue, per classi bilingui, plurilingui e internazionali.',
    },
    pageTitle: 'Chi siamo',
    intro: 'LessonCraftStudio pubblica schede K-3 gratuite e attività interattive in 11 lingue. Tutto è ad accesso libero — nessuna registrazione.',
    whatWeOfferHeading: 'Cosa offriamo',
    whatWeOfferBody: 'Schede stampabili in PDF e attività giocabili nel browser per matematica, fonetica e vocabolario, disponibili in inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, svedese, danese, norvegese e finlandese.',
    audienceHeading: 'Per chi',
    audienceBody: 'Pensato per insegnanti e famiglie in classi bilingui, plurilingui e internazionali, soprattutto nella prima infanzia (3-7 anni).',
    teamHeading: 'Il nostro team',
    teamBody: 'Stiamo aggiornando questa sezione — torna presto.',
  },
  nl: {
    meta: {
      title: 'Over ons | LessonCraftStudio',
      description: 'Over LessonCraftStudio — gratis K-3 werkbladen en interactieve activiteiten in 11 talen, voor tweetalige, meertalige en internationale klassen.',
    },
    pageTitle: 'Over LessonCraftStudio',
    intro: 'LessonCraftStudio publiceert gratis K-3 werkbladen en interactieve activiteiten in 11 talen. Alles is vrij toegankelijk — geen aanmelding nodig.',
    whatWeOfferHeading: 'Wat we bieden',
    whatWeOfferBody: "Afdrukbare PDF's en activiteiten die je in de browser speelt voor rekenen, fonetiek en woordenschat, beschikbaar in Engels, Duits, Frans, Spaans, Portugees, Italiaans, Nederlands, Zweeds, Deens, Noors en Fins.",
    audienceHeading: 'Voor wie',
    audienceBody: 'Gemaakt voor leerkrachten en ouders in tweetalige, meertalige en internationale klassen, vooral in de vroege jeugd (3 tot 7 jaar).',
    teamHeading: 'Over ons team',
    teamBody: 'We werken deze sectie bij — kom snel terug.',
  },
  // [NSR-FLAG][SV] per CLAUDE.md §17.5.1
  sv: {
    meta: {
      title: 'Om oss | LessonCraftStudio',
      description: 'Om LessonCraftStudio — gratis F-3 arbetsblad och interaktiva aktiviteter på 11 språk, för tvåspråkiga, flerspråkiga och internationella klassrum.',
    },
    pageTitle: 'Om LessonCraftStudio',
    intro: 'LessonCraftStudio publicerar gratis F-3 arbetsblad och interaktiva aktiviteter på 11 språk. Allt är fritt tillgängligt — ingen registrering.',
    whatWeOfferHeading: 'Vad vi erbjuder',
    whatWeOfferBody: 'Utskrivbara PDF:er och aktiviteter som spelas i webbläsaren för matematik, fonetik och ordförråd, tillgängliga på engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska och finska.',
    audienceHeading: 'För vem',
    audienceBody: 'Gjort för lärare och föräldrar i tvåspråkiga, flerspråkiga och internationella klassrum, särskilt i tidig barndom (3 till 7 år).',
    teamHeading: 'Om vårt team',
    teamBody: 'Vi uppdaterar det här avsnittet — kom tillbaka snart.',
  },
  // [NSR-FLAG][DA] per CLAUDE.md §17.5.1
  da: {
    meta: {
      title: 'Om os | LessonCraftStudio',
      description: 'Om LessonCraftStudio — gratis K-3 arbejdsark og interaktive aktiviteter på 11 sprog, til tosprogede, flersprogede og internationale klasser.',
    },
    pageTitle: 'Om LessonCraftStudio',
    intro: 'LessonCraftStudio udgiver gratis K-3 arbejdsark og interaktive aktiviteter på 11 sprog. Alt er frit tilgængeligt — ingen tilmelding.',
    whatWeOfferHeading: 'Hvad vi tilbyder',
    whatWeOfferBody: "Printbare PDF'er og aktiviteter, der spilles i browseren, til matematik, fonetik og ordforråd, tilgængelige på engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk.",
    audienceHeading: 'Til hvem',
    audienceBody: 'Lavet til lærere og forældre i tosprogede, flersprogede og internationale klasser, især i tidlig barndom (3 til 7 år).',
    teamHeading: 'Om vores team',
    teamBody: 'Vi opdaterer dette afsnit — kom snart tilbage.',
  },
  // [NSR-FLAG][NO] per CLAUDE.md §17.5.1 — bokmål
  no: {
    meta: {
      title: 'Om oss | LessonCraftStudio',
      description: 'Om LessonCraftStudio — gratis K-3 arbeidsark og interaktive aktiviteter på 11 språk, for tospråklige, flerspråklige og internasjonale klasser.',
    },
    pageTitle: 'Om LessonCraftStudio',
    intro: 'LessonCraftStudio publiserer gratis K-3 arbeidsark og interaktive aktiviteter på 11 språk. Alt er fritt tilgjengelig — ingen registrering.',
    whatWeOfferHeading: 'Hva vi tilbyr',
    whatWeOfferBody: 'Utskrivbare PDF-er og aktiviteter som spilles i nettleseren, for matematikk, fonetikk og ordforråd, tilgjengelig på engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk.',
    audienceHeading: 'For hvem',
    audienceBody: 'Laget for lærere og foreldre i tospråklige, flerspråklige og internasjonale klasser, spesielt i tidlig barndom (3 til 7 år).',
    teamHeading: 'Om teamet vårt',
    teamBody: 'Vi oppdaterer denne delen — kom tilbake snart.',
  },
  // [NSR-FLAG][FI] per CLAUDE.md §17.5.1
  fi: {
    meta: {
      title: 'Tietoa meistä | LessonCraftStudio',
      description: 'Tietoa LessonCraftStudiosta — ilmaisia K-3 tehtäväarkkeja ja interaktiivisia tehtäviä 11 kielellä, kaksikielisille, monikielisille ja kansainvälisille luokille.',
    },
    pageTitle: 'Tietoa LessonCraftStudiosta',
    intro: 'LessonCraftStudio julkaisee ilmaisia K-3 tehtäväarkkeja ja interaktiivisia tehtäviä 11 kielellä. Kaikki on vapaasti käytettävissä — ei rekisteröintiä.',
    whatWeOfferHeading: 'Mitä tarjoamme',
    whatWeOfferBody: 'Tulostettavia PDF-tiedostoja ja selaimessa pelattavia tehtäviä matematiikkaan, fonetiikkaan ja sanavarastoon, saatavilla englanniksi, saksaksi, ranskaksi, espanjaksi, portugaliksi, italiaksi, hollanniksi, ruotsiksi, tanskaksi, norjaksi ja suomeksi.',
    audienceHeading: 'Kenelle',
    audienceBody: 'Tarkoitettu opettajille ja vanhemmille kaksikielisillä, monikielisillä ja kansainvälisillä luokilla, erityisesti varhaislapsuudessa (3-7-vuotiaat).',
    teamHeading: 'Tietoa tiimistämme',
    teamBody: 'Päivitämme tätä osiota — palaa pian.',
  },
};

function inject(locale) {
  const file = path.join(MESSAGES_DIR, `${locale}.json`);
  const raw = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(raw);
  data.aboutPage = ABOUT_PAGE_STRINGS[locale];
  // 2-space indentation matches existing message files.
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  ${locale}.json: aboutPage namespace written`);
}

function main() {
  console.log('Injecting aboutPage namespace into 11 locale message files:');
  for (const locale of Object.keys(ABOUT_PAGE_STRINGS)) {
    inject(locale);
  }
  console.log('');
  console.log('Nordic+Finnic (sv/da/no/fi) require NSR review per CLAUDE.md §17.5.1.');
}

main();
