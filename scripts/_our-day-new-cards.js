/* =====================================================================
   The catalogue additions the pedagogy panel asked for, plus the art
   panel's finished SVG for each. Applied by add-our-day-cards.js.

   The headline hole it closes: THERE WAS NO MOTHER-TONGUE LESSON CARD.
   `italiano` (only:['it']) was the accidental one-locale instance of the
   single most-scheduled block of the week in every locale — fi
   äidinkieli, sv Svenska, de Deutsch, nl Taal, es Lengua. It is promoted
   to a universal `mothertongue`, and `language` is re-scoped as the
   FOREIGN-language card it actually was.
   ===================================================================== */
module.exports = {

  /* cards to ADD: {id, group, en, gloss, icon} — gloss is for the native
     panels, never rendered. group: 0 arrival 1 learning 2 care 3 move
     4 together 5 special */
  ADD: [
    { id: 'mothertongue', group: 1, en: 'Mother tongue', gloss: 'The lesson in the language of instruction — fi aidinkieli, sv Svenska, de Deutsch, nl Taal, es Lengua, fr francais. NOT foreign language. The most-scheduled block of the week.',
      icon: '<path d="M5 9h38v25H27l-10 8v-8H5z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.8" stroke-linejoin="round"/><path d="M24 16c-3.4-4.4-10-3.4-10 2.2 0 4.4 6.6 8.4 10 11 3.4-2.6 10-6.6 10-11 0-5.6-6.6-6.6-10-2.2z" fill="#F2784B" stroke="#C4552B" stroke-width="2" stroke-linejoin="round"/>' },

    { id: 'singing', group: 4, en: 'Singing', gloss: 'Song time as a ROUTINE, not the music lesson — sv Sangsamling, fi Laulutuokio, de Singkreis, nl Zingen. The operator asked for this one by name.',
      icon: '<circle cx="18" cy="20" r="12" fill="#F2C879" stroke="#E0A63C" stroke-width="2.4"/><circle cx="13.5" cy="16" r="1.8" fill="#8F6512"/><circle cx="22.5" cy="16" r="1.8" fill="#8F6512"/><ellipse cx="18" cy="26.5" rx="5" ry="5.5" fill="#C4552B"/><path d="M34 34V12q7 2 7 9" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round"/><ellipse cx="30.5" cy="34" rx="4.2" ry="3.4" fill="#F2784B"/>' },

    { id: 'guidedreading', group: 1, en: 'Small group', gloss: 'Guided reading / small-group teaching at the half-moon table — de Kleingruppe, sv Lasgrupp, fi Pienryhma, nl kleine kring / verlengde instructie.',
      icon: '<path d="M6 30a18 18 0 0 1 36 0z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.8" stroke-linejoin="round"/><circle cx="24" cy="40" r="6.5" fill="#F2C879" stroke="#E0A63C" stroke-width="2.2"/><circle cx="8" cy="16" r="4.8" fill="#F2784B"/><circle cx="24" cy="9" r="4.8" fill="#9CC3E5" stroke="#146B5E" stroke-width="1.8"/><circle cx="40" cy="16" r="4.8" fill="#7FA860"/>' },

    { id: 'onetoone', group: 1, en: 'Extra help', gloss: 'Support / intervention, usually a PULL-OUT: the child leaves the room — de Forderunterricht, sv Specialpedagog, fi erityisopettaja, no spesialpedagog, nl RT, es apoyo. The SEN specialist rates this the most important addition: a pull-out you cannot see coming is the classic trigger.',
      icon: '<circle cx="14" cy="14" r="8" fill="#F2C879" stroke="#E0A63C" stroke-width="2.4"/><path d="M3 43q0-13 11-13t11 13z" fill="#146B5E"/><circle cx="35" cy="21" r="6" fill="#F2784B"/><path d="M26 43q0-10 9-10t9 10z" fill="#9CC3E5" stroke="#146B5E" stroke-width="2"/>' },

    { id: 'homelang', group: 1, en: 'Home language', gloss: 'Mother-tongue tuition / EAL — sv modersmalsundervisning (a LEGAL entitlement that pulls children out weekly), fi oman aidinkielen opetus + S2, de DaZ, nl NT2, no morsmal, en EAL/ESL. Its absence from an 11-language product was the most surprising gap in the file.',
      icon: '<circle cx="24" cy="22" r="13" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.6"/><path d="M11 22h26M24 9q-6 13 0 26M24 9q6 13 0 26" fill="none" stroke="#FBF3E4" stroke-width="2.4"/><path d="M34 30h11v9h-3v4l-4-4h-4z" fill="#F2C879" stroke="#8F6512" stroke-width="2" stroke-linejoin="round"/>' },

    { id: 'dressing', group: 0, en: 'Coats on', gloss: 'Getting dressed to go outside — sv pakladning, fi pukeutuminen, no/da patoy/udetoj, nl aankleden. A NAMED, adult-supervised ten-minute routine that happens TWICE A DAY in a Nordic winter and is often longer than the break it precedes.',
      icon: '<path d="M18 9 7 14l3.5 10 5.5-2v18h16V22l5.5 2L41 14 30 9z" fill="#9CC3E5" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/><path d="M18 9q6 6 12 0" fill="none" stroke="#146B5E" stroke-width="2.4"/><path d="M24 16v24" stroke="#146B5E" stroke-width="2.2"/><circle cx="24" cy="34" r="2.2" fill="#F2C879"/>' },

    { id: 'changepe', group: 3, en: 'Getting changed', gloss: 'Changing for PE, a separate anxiety-heavy transition — de Umziehen, sv omkladning, fi vaihtaminen, no omkledning. In the Nordics the shower afterwards is its own event.',
      icon: '<path d="M18 8 8 13l3 9 5-2v13h16V20l5 2 3-9-10-5z" fill="#F2784B" stroke="#C4552B" stroke-width="2.2" stroke-linejoin="round"/><path d="M18 8q6 6 12 0" fill="none" stroke="#C4552B" stroke-width="2.2"/><path d="M15 35h18v3l-1.5 6h-6l-1.5-5-1.5 5h-6L15 38z" fill="#146B5E" stroke="#0E5147" stroke-width="2" stroke-linejoin="round"/>' },

    { id: 'quiet', group: 2, en: 'Quiet time', gloss: 'Calm-down / mindfulness / breathing. SPLIT FROM `rest`, which was doing two incompatible jobs: fr la sieste and it il riposino are a NAP, while sv Vila, da/no Hviletid and nl Rustmoment are a calm moment. K-3 classes do not nap; they do lugn stund.',
      icon: '<circle cx="24" cy="24" r="19" fill="none" stroke="#9CC3E5" stroke-width="2.6"/><path d="M9 39q6-12 15-12t15 12z" fill="#C9A8E0" stroke="#146B5E" stroke-width="2.2" stroke-linejoin="round"/><circle cx="24" cy="18" r="7.5" fill="#F2C879" stroke="#E0A63C" stroke-width="2.2"/><path d="M19.8 18q2 2.2 4 0m0.4 0q2 2.2 4 0" fill="none" stroke="#8F6512" stroke-width="2" stroke-linecap="round"/>' },

    { id: 'classmeeting', group: 4, en: 'Class meeting', gloss: 'A named, near-statutory weekly routine — sv Klassrad, da Klassens tid, no Klassens time, de Klassenrat, nl kringgesprek.',
      icon: '<circle cx="9" cy="35" r="6.5" fill="#F2784B"/><circle cx="24" cy="37" r="6.5" fill="#F2C879" stroke="#8F6512" stroke-width="1.8"/><circle cx="39" cy="35" r="6.5" fill="#9CC3E5" stroke="#146B5E" stroke-width="1.8"/><path d="M23 27V12a3.2 3.2 0 0 1 6.4 0v-1a3.2 3.2 0 0 1 6.4 0v11c0 4.4-2.6 7-7 7H27z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2.4" stroke-linejoin="round"/>' },

    { id: 'transport', group: 0, en: 'Bus home', gloss: 'School transport for the children who leave before the rest — sv skolskjuts, fi koulukyyti, de Bus, nl de taxi.',
      icon: '<rect x="9" y="6" width="30" height="34" rx="5" fill="#F2C879" stroke="#8F6512" stroke-width="2.4"/><rect x="13" y="11" width="22" height="11" rx="2" fill="#9CC3E5" stroke="#146B5E" stroke-width="1.8"/><circle cx="16" cy="30" r="3.2" fill="#FBF3E4" stroke="#146B5E" stroke-width="1.8"/><circle cx="32" cy="30" r="3.2" fill="#FBF3E4" stroke="#146B5E" stroke-width="1.8"/><path d="M12 43h6m12 0h6" stroke="#146B5E" stroke-width="4.5" stroke-linecap="round"/>' },

    { id: 'firedrill', group: 5, en: 'Practice alarm', gloss: 'The fire drill. The SEN specialist: a card saying "today a loud bell will happen and it is PLANNED" is worth more to an autistic child than any other card you could add. Name it as a PLANNED PRACTICE, never as an emergency.',
      icon: '<rect x="4" y="6" width="40" height="36" rx="5" fill="#7FA860" stroke="#146B5E" stroke-width="2.4"/><path d="M32 12h8v24h-8" fill="none" stroke="#FBF3E4" stroke-width="3.2" stroke-linejoin="round"/><circle cx="16" cy="14" r="3.6" fill="#FBF3E4"/><path d="M16 18l-4.5 8.5 5.5 3 2 9m-3.5-12L9 29.5" fill="none" stroke="#FBF3E4" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>' },

    { id: 'helper', group: 4, en: 'Helper of the day', gloss: 'The named classroom job — sv veckans vard / dagens hjalpreda, nl de hulpjes, de Dienst, fi paivan apulainen. In this tool the helper is the child who moves the sun.',
      icon: '<circle cx="24" cy="11" r="7" fill="#F2C879" stroke="#E0A63C" stroke-width="2.2"/><path d="M9 44q0-17 15-17t15 17z" fill="#F2784B" stroke="#C4552B" stroke-width="2"/><path d="M24 28v16" stroke="#FBF3E4" stroke-width="3.2"/><path d="M13 35h22" stroke="#FBF3E4" stroke-width="3.2"/>' }
  ],

  /* rename + rescope, no new art */
  RESCOPE: {
    /* `language` was the vaguest string in the file. It is the FOREIGN
       language lesson and nothing else, now that mothertongue exists. */
    language: { en: 'English lesson', gloss: 'The FOREIGN-language lesson. In every non-en locale this is already English (de Englisch, sv Engelska); in en it is whatever modern language the school teaches.' }
  },

  /* ⚠ REMOVED, and the reasons are on the record.
     `surprise`: a "?" on a schedule is contraindicated for exactly the
       cohort this tool names as its reason for existing. You schedule the
       STRUCTURE of an unknown ("something new — I will tell you first"),
       never the unknown.
     `change`: a droppable card literally named "Change" duplicated the
       change ritual and means nothing as a scheduled block. */
  REMOVE: ['surprise', 'change', 'italiano']
};
