// Story Studio — dashboard/editor-wrapper chrome strings (EN + DE at launch
// per operator ruling; remaining 9 locales fast-follow, then fold into the
// next-intl message files if the namespace stabilizes).

export interface StudioStrings {
  metaTitle: string;
  dashTitle: string;
  dashIntro: string;
  newStory: string;
  startBlank: string;
  startBlankBlurb: string;
  fromTemplate: string;
  titleLabel: string;
  titlePlaceholder: string;
  gradeLabel: string;
  gradeHint: string;
  grades: Record<string, string>;
  create: string;
  creating: string;
  cancel: string;
  myStories: string;
  emptyTitle: string;
  emptyBody: string;
  open: string;
  play: string;
  delete_: string;
  deleteConfirm: string;
  pagesLabel: string;
  edited: string;
  draft: string;
  shared: string;
  loading: string;
  errorGeneric: string;
  signInTitle: string;
  signInBody: string;
  signInCta: string;
  subscriberTitle: string;
  subscriberBody: string;
  subscriberCta: string;
  backToStories: string;
  editorAuthLost: string;
  editorAuthCta: string;
  smallScreenTitle: string;
  smallScreenBody: string;
}

const en: StudioStrings = {
  metaTitle: 'Story Studio',
  dashTitle: 'Story Studio',
  dashIntro:
    'Create interactive read-along stories for your class — with characters, narration, and activities from every worksheet maker.',
  newStory: 'Start a new story',
  startBlank: 'Blank story',
  startBlankBlurb: 'Start from an empty first page.',
  fromTemplate: 'Start from a template',
  titleLabel: 'What is your story called?',
  titlePlaceholder: 'e.g. The Counting Picnic',
  gradeLabel: 'Who is it for?',
  gradeHint: 'This helps us suggest the right activities and story length.',
  grades: {
    PK: 'Preschool',
    K: 'Kindergarten',
    '1': 'Grade 1',
    '2': 'Grade 2',
    '3': 'Grade 3',
  },
  create: 'Create my story',
  creating: 'Creating…',
  cancel: 'Cancel',
  myStories: 'My stories',
  emptyTitle: 'Your first story takes about 10 minutes.',
  emptyBody: 'Start from a template — everything in it can be changed.',
  open: 'Open',
  play: 'Preview',
  delete_: 'Delete',
  deleteConfirm: 'Delete this story? Your class link will stop working.',
  pagesLabel: 'pages',
  edited: 'Edited',
  draft: 'Draft',
  shared: 'Shared',
  loading: 'Loading…',
  errorGeneric: 'Something went wrong. Please try again.',
  signInTitle: 'Sign in to open the Story Studio',
  signInBody: 'The Story Studio is part of your LessonCraftStudio account.',
  signInCta: 'Sign in',
  subscriberTitle: 'The Story Studio is part of the Teacher plan',
  subscriberBody:
    'Compose narrated, playable stories with characters, backgrounds, and live worksheet activities — then share them with your class with one link.',
  subscriberCta: 'See plans',
  backToStories: 'My stories',
  editorAuthLost: 'You have been signed out. Your latest changes are saved on this device.',
  editorAuthCta: 'Sign in again',
  smallScreenTitle: 'Story Studio needs a bigger screen',
  smallScreenBody:
    'Editing works best on a computer or a tablet in landscape. Your stories are waiting for you there — and students can play them on anything.',
};

const de: StudioStrings = {
  metaTitle: 'Geschichten-Studio',
  dashTitle: 'Geschichten-Studio',
  dashIntro:
    'Erstellen Sie interaktive Vorlesegeschichten für Ihre Klasse — mit Figuren, Erzählstimme und Aufgaben aus allen Arbeitsblatt-Generatoren.',
  newStory: 'Neue Geschichte beginnen',
  startBlank: 'Leere Geschichte',
  startBlankBlurb: 'Mit einer leeren ersten Seite beginnen.',
  fromTemplate: 'Mit einer Vorlage beginnen',
  titleLabel: 'Wie heißt Ihre Geschichte?',
  titlePlaceholder: 'z. B. Das Zähl-Picknick',
  gradeLabel: 'Für wen ist sie?',
  gradeHint: 'So können wir passende Aufgaben und die richtige Länge vorschlagen.',
  grades: {
    PK: 'Vorschule',
    K: 'Kindergarten',
    '1': 'Klasse 1',
    '2': 'Klasse 2',
    '3': 'Klasse 3',
  },
  create: 'Geschichte erstellen',
  creating: 'Wird erstellt…',
  cancel: 'Abbrechen',
  myStories: 'Meine Geschichten',
  emptyTitle: 'Ihre erste Geschichte dauert etwa 10 Minuten.',
  emptyBody: 'Beginnen Sie mit einer Vorlage — alles darin lässt sich ändern.',
  open: 'Öffnen',
  play: 'Vorschau',
  delete_: 'Löschen',
  deleteConfirm: 'Diese Geschichte löschen? Der Klassen-Link funktioniert dann nicht mehr.',
  pagesLabel: 'Seiten',
  edited: 'Bearbeitet',
  draft: 'Entwurf',
  shared: 'Geteilt',
  loading: 'Wird geladen…',
  errorGeneric: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
  signInTitle: 'Melden Sie sich an, um das Geschichten-Studio zu öffnen',
  signInBody: 'Das Geschichten-Studio gehört zu Ihrem LessonCraftStudio-Konto.',
  signInCta: 'Anmelden',
  subscriberTitle: 'Das Geschichten-Studio gehört zum Teacher-Tarif',
  subscriberBody:
    'Gestalten Sie erzählte, spielbare Geschichten mit Figuren, Hintergründen und echten Arbeitsblatt-Aufgaben — und teilen Sie sie mit einem Link mit Ihrer Klasse.',
  subscriberCta: 'Tarife ansehen',
  backToStories: 'Meine Geschichten',
  editorAuthLost: 'Sie wurden abgemeldet. Ihre letzten Änderungen sind auf diesem Gerät gesichert.',
  editorAuthCta: 'Erneut anmelden',
  smallScreenTitle: 'Das Geschichten-Studio braucht einen größeren Bildschirm',
  smallScreenBody:
    'Das Bearbeiten funktioniert am besten am Computer oder am Tablet im Querformat. Ihre Geschichten warten dort auf Sie — abspielen können Ihre Schüler sie auf jedem Gerät.',
};

export function studioStrings(locale: string): StudioStrings {
  return locale === 'de' ? de : en;
}
