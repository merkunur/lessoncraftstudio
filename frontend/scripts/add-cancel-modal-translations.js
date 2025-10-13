const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    title: 'Cancel Subscription',
    description: 'Are you sure you want to cancel your subscription? This action will stop future billing.',
    accessUntil: 'You will keep access until',
    accessNote: 'You\'ll retain access to all features until the end of your current billing period.',
    whatHappens: 'What happens when you cancel:',
    point1: 'No further charges will be made',
    point2: 'You\'ll keep access until the end of your billing period',
    point3: 'You can reactivate anytime before the period ends',
    keepSubscription: 'Keep Subscription',
    confirmCancel: 'Confirm Cancellation',
    processing: 'Processing...'
  },
  sv: {
    title: 'Avsluta prenumeration',
    description: 'Är du säker på att du vill avsluta din prenumeration? Detta stoppar framtida fakturering.',
    accessUntil: 'Du behåller åtkomst till',
    accessNote: 'Du behåller åtkomst till alla funktioner till slutet av din nuvarande faktureringsperiod.',
    whatHappens: 'Vad händer när du avslutar:',
    point1: 'Inga ytterligare avgifter kommer att debiteras',
    point2: 'Du behåller åtkomst till slutet av din faktureringsperiod',
    point3: 'Du kan återaktivera när som helst innan perioden slutar',
    keepSubscription: 'Behåll prenumeration',
    confirmCancel: 'Bekräfta avslut',
    processing: 'Bearbetar...'
  },
  de: {
    title: 'Abonnement kündigen',
    description: 'Sind Sie sicher, dass Sie Ihr Abonnement kündigen möchten? Dies stoppt zukünftige Abrechnungen.',
    accessUntil: 'Sie behalten den Zugriff bis',
    accessNote: 'Sie behalten Zugriff auf alle Funktionen bis zum Ende Ihrer aktuellen Abrechnungsperiode.',
    whatHappens: 'Was passiert wenn Sie kündigen:',
    point1: 'Es werden keine weiteren Gebühren erhoben',
    point2: 'Sie behalten Zugriff bis zum Ende Ihrer Abrechnungsperiode',
    point3: 'Sie können jederzeit vor Ablauf der Periode reaktivieren',
    keepSubscription: 'Abonnement behalten',
    confirmCancel: 'Kündigung bestätigen',
    processing: 'Wird bearbeitet...'
  },
  fr: {
    title: 'Annuler l\'abonnement',
    description: 'Êtes-vous sûr de vouloir annuler votre abonnement ? Cela arrêtera la facturation future.',
    accessUntil: 'Vous garderez l\'accès jusqu\'au',
    accessNote: 'Vous conserverez l\'accès à toutes les fonctionnalités jusqu\'à la fin de votre période de facturation actuelle.',
    whatHappens: 'Ce qui se passe lorsque vous annulez :',
    point1: 'Aucun frais supplémentaire ne sera facturé',
    point2: 'Vous garderez l\'accès jusqu\'à la fin de votre période de facturation',
    point3: 'Vous pouvez réactiver à tout moment avant la fin de la période',
    keepSubscription: 'Conserver l\'abonnement',
    confirmCancel: 'Confirmer l\'annulation',
    processing: 'Traitement...'
  },
  es: {
    title: 'Cancelar suscripción',
    description: '¿Estás seguro de que quieres cancelar tu suscripción? Esto detendrá la facturación futura.',
    accessUntil: 'Mantendrás el acceso hasta',
    accessNote: 'Conservarás el acceso a todas las funciones hasta el final de tu período de facturación actual.',
    whatHappens: 'Qué sucede cuando cancelas:',
    point1: 'No se realizarán más cargos',
    point2: 'Mantendrás el acceso hasta el final de tu período de facturación',
    point3: 'Puedes reactivar en cualquier momento antes de que termine el período',
    keepSubscription: 'Mantener suscripción',
    confirmCancel: 'Confirmar cancelación',
    processing: 'Procesando...'
  },
  pt: {
    title: 'Cancelar assinatura',
    description: 'Tem certeza de que deseja cancelar sua assinatura? Isso interromperá a cobrança futura.',
    accessUntil: 'Você manterá o acesso até',
    accessNote: 'Você manterá acesso a todos os recursos até o final do seu período de faturamento atual.',
    whatHappens: 'O que acontece quando você cancela:',
    point1: 'Nenhuma cobrança adicional será feita',
    point2: 'Você manterá o acesso até o final do seu período de faturamento',
    point3: 'Você pode reativar a qualquer momento antes do término do período',
    keepSubscription: 'Manter assinatura',
    confirmCancel: 'Confirmar cancelamento',
    processing: 'Processando...'
  },
  it: {
    title: 'Annulla abbonamento',
    description: 'Sei sicuro di voler annullare il tuo abbonamento? Questo interromperà la fatturazione futura.',
    accessUntil: 'Manterrai l\'accesso fino al',
    accessNote: 'Manterrai l\'accesso a tutte le funzionalità fino alla fine del tuo periodo di fatturazione attuale.',
    whatHappens: 'Cosa succede quando annulli:',
    point1: 'Non verranno effettuati ulteriori addebiti',
    point2: 'Manterrai l\'accesso fino alla fine del tuo periodo di fatturazione',
    point3: 'Puoi riattivare in qualsiasi momento prima della fine del periodo',
    keepSubscription: 'Mantieni abbonamento',
    confirmCancel: 'Conferma annullamento',
    processing: 'Elaborazione...'
  },
  nl: {
    title: 'Abonnement opzeggen',
    description: 'Weet je zeker dat je je abonnement wilt opzeggen? Dit stopt toekomstige facturering.',
    accessUntil: 'Je behoudt toegang tot',
    accessNote: 'Je behoudt toegang tot alle functies tot het einde van je huidige factureringsperiode.',
    whatHappens: 'Wat gebeurt er wanneer je opzegt:',
    point1: 'Er worden geen verdere kosten in rekening gebracht',
    point2: 'Je behoudt toegang tot het einde van je factureringsperiode',
    point3: 'Je kunt op elk moment vóór het einde van de periode opnieuw activeren',
    keepSubscription: 'Abonnement behouden',
    confirmCancel: 'Bevestig opzegging',
    processing: 'Verwerken...'
  },
  da: {
    title: 'Opsig abonnement',
    description: 'Er du sikker på, at du vil opsige dit abonnement? Dette stopper fremtidig fakturering.',
    accessUntil: 'Du beholder adgang indtil',
    accessNote: 'Du beholder adgang til alle funktioner indtil slutningen af din nuværende faktureringsperiode.',
    whatHappens: 'Hvad sker der når du opsiger:',
    point1: 'Der opkræves ingen yderligere gebyrer',
    point2: 'Du beholder adgang indtil slutningen af din faktureringsperiode',
    point3: 'Du kan genaktivere når som helst før perioden slutter',
    keepSubscription: 'Behold abonnement',
    confirmCancel: 'Bekræft opsigelse',
    processing: 'Behandler...'
  },
  no: {
    title: 'Avslutt abonnement',
    description: 'Er du sikker på at du vil avslutte abonnementet ditt? Dette stopper fremtidig fakturering.',
    accessUntil: 'Du beholder tilgang til',
    accessNote: 'Du beholder tilgang til alle funksjoner til slutten av din nåværende faktureringsperiode.',
    whatHappens: 'Hva skjer når du avslutter:',
    point1: 'Det blir ikke belastet ytterligere gebyrer',
    point2: 'Du beholder tilgang til slutten av faktureringsperioden',
    point3: 'Du kan reaktivere når som helst før perioden slutter',
    keepSubscription: 'Behold abonnement',
    confirmCancel: 'Bekreft avslutning',
    processing: 'Behandler...'
  },
  fi: {
    title: 'Peru tilaus',
    description: 'Oletko varma, että haluat perua tilauksesi? Tämä pysäyttää tulevan laskutuksen.',
    accessUntil: 'Säilytät pääsyn',
    accessNote: 'Säilytät pääsyn kaikkiin ominaisuuksiin nykyisen laskutuskauden loppuun asti.',
    whatHappens: 'Mitä tapahtuu kun peruutat:',
    point1: 'Lisämaksuja ei veloiteta',
    point2: 'Säilytät pääsyn laskutuskautesi loppuun',
    point3: 'Voit aktivoida uudelleen milloin tahansa ennen kauden päättymistä',
    keepSubscription: 'Säilytä tilaus',
    confirmCancel: 'Vahvista peruutus',
    processing: 'Käsitellään...'
  }
};

const messagesDir = path.join(__dirname, '../messages');

for (const [lang, trans] of Object.entries(translations)) {
  const filePath = path.join(messagesDir, `${lang}.json`);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Add cancelModal to billing section
    if (data.billing) {
      data.billing.cancelModal = trans;

      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`✅ ${lang}: Added cancelModal translations`);
    } else {
      console.log(`⚠️  ${lang}: No billing section found`);
    }
  } catch (error) {
    console.log(`❌ ${lang}: Error - ${error.message}`);
  }
}

console.log('\nDone!');
