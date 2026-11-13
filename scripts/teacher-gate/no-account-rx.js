/**
 * The wording that says playing, printing or downloading needs NO ACCOUNT, per language (scan-no-account.js,
 * fix-no-account.js, gates.js P8). A pattern ends at a word boundary of the language: French "sans compter" (without
 * counting) and Portuguese "sem contar" are no account wording, and the first version of this list took both.
 * Two shapes per language: "without / no <account word>", and the sentence with a verb ("does not ask for a
 * sign-up", "you do not need an account"), which the first version did not read at all.
 */
'use strict';
const W = '(?![\\p{L}\\p{N}])';      // the word ends here
const B = '(?<![\\p{L}\\p{N}])';     // the word starts here
const rx = (alts) => new RegExp(B + '(?:' + alts.join('|') + ')' + W, 'iu');
module.exports = {
  en: rx(['no sign[- ]?ups?', 'no log[- ]?ins?', 'no accounts?', 'no registration', 'without (?:an account|signing up|a login|logging in|registering|creating an account|making an account)', 'no need to (?:sign|log|register)',
    '(?:don[\'’]t|do not|doesn[\'’]t|does not|never) (?:need|require|have to)s? (?:to )?(?:an? |any )?(?:account|log[- ]?in|sign[- ]?up|sign up|register|registration)', '(?:sign[- ]?up|registration|log[- ]?in|account)(?: is| are)? not (?:needed|required)']),
  de: rx(['ohne (?:Anmeldung|Registrierung|Konto|Login|Account|Anmelden)', 'keine Anmeldung', 'kein Konto', 'keine Registrierung', 'kein(?:en)? (?:Login|Account)', 'ohne sich (?:anzumelden|zu registrieren|anmelden zu müssen)',
    '(?:Anmeldung|Registrierung)(?: ist)? nicht (?:nötig|erforderlich|notwendig)', 'nicht (?:anmelden|registrieren)']),
  nl: rx(['zonder (?:account|aanmelden|inloggen|registratie|registreren|in te loggen|aanmelding|je aan te melden)', 'geen account', 'geen registratie', 'geen (?:aanmelding|login|inlog)', '(?:inloggen|aanmelden|registreren|een account)(?: is)? niet nodig']),
  es: rx(['sin (?:registro|registrarse|registrarte|cuentas?|iniciar sesi[oó]n|necesidad de registr\\p{L}+|crear (?:una )?cuenta|tener que registr\\p{L}+)',
    'no (?:requiere|necesita|pide|exige|hace falta|necesitas|tienes que)(?: de)? (?:ning[uú]n |una |crear (?:una )?)?(?:registro|registrarse|registrarte|cuenta|iniciar sesi[oó]n)']),
  fr: rx(['sans (?:inscription|compte|s[\'’]inscrire|connexion|cr[ée]er (?:de|un) compte)', 'aucune inscription', 'aucun compte', 'pas besoin (?:de |d[\'’])(?:cr[ée]er un )?(?:compte|inscription|s[\'’]inscrire|se connecter|connexion)',
    'aucune (?:connexion|création de compte)', 'ne (?:nécessite|demande|requiert) (?:aucune? |pas (?:de |d[\'’]))(?:compte|inscription|connexion)']),
  pt: rx(['sem (?:cadastro|conta|login|se cadastrar|registro|precisar de (?:cadastro|conta|login)|criar conta|fazer (?:cadastro|login)|precisar se cadastrar)',
    'não (?:pede|precisa de|exige|requer|é preciso|é necessário)(?: fazer| ter| criar)? (?:nenhum |uma )?(?:cadastro|conta|login|se cadastrar)']),
  it: rx(['senza (?:registrazione|registrarsi|account|iscrizione|login|iscriversi)', 'nessuna registrazione', 'nessun account', 'nessun login',
    'non (?:serve|servono|richiede|occorre|è richiest[ao]|è necessari[ao])(?: la| una| alcuna| nessuna| un| alcun)? (?:registrazione|registrarsi|account|iscrizione|login)']),
  sv: rx(['utan (?:konto|inloggning|registrering|att logga in)', 'inget konto', 'ingen inloggning', 'ingen registrering', 'kräver (?:ingen|inget|inte) (?:inloggning|konto|registrering)', 'behöver (?:du |man |ni )?inte (?:logga in|registrera|skapa (?:ett )?konto)']),
  da: rx(['uden (?:konto|login|tilmelding|at logge ind|oprettelse)', 'ingen konto', 'intet login', 'ingen oprettelse', 'ingen tilmelding', 'kræver (?:ingen|intet|ikke) (?:login|konto|tilmelding|oprettelse)', 'behøver (?:du |man |I )?ikke (?:at )?(?:logge ind|oprette)']),
  no: rx(['uten (?:konto|innlogging|registrering|å logge inn|pålogging)', 'ingen konto', 'ingen innlogging', 'ingen registrering', 'ingen pålogging', 'krever (?:ingen|ikke) (?:innlogging|konto|registrering|pålogging)', 'trenger (?:du |man )?ikke (?:å )?(?:logge inn|registrere|konto)']),
  fi: rx(['ilman (?:tili[äa]|kirjautumista|rekister[öo]itymist[äa]|tunnuksia)', 'ei (?:tarvita |tarvitse )?tili[äa]', 'ei kirjautumista', 'ei rekister[öo]itymist[äa]', 'ei (?:vaadi|edellyt[äa]) (?:kirjautumista|rekister[öo]itymist[äa]|tili[äa]|tunnuksia)',
    '(?:kirjautumista|rekister[öo]itymist[äa]|tili[äa]|tunnuksia) ei tarvita', 'ei tarvitse (?:kirjautua|rekister[öo]ity[äa])']),
};
