# Class links and results — legal drafts for review

**Status: DRAFTS written by the build session on 2026-11-11. Not legal advice. Nothing here is published.** Operator ruling: the class-results feature launches only after a data-protection lawyer has checked these texts once.

## What the lawyer is asked to check

| File | What it is | Who reads it |
|---|---|---|
| `privacy-policy-section.en.md` | A new section for the site's privacy policy | Everyone |
| `school-data-processing-agreement.en.md` | A data processing agreement a school can accept (GDPR Art. 28) | Schools, school authorities |
| `parent-note.en.md` | A short plain-language note a teacher can hand to parents | Parents |
| `FACTS.md` | What the feature really stores and does, checked against the code | The lawyer |

English is the source. The ten other languages are written natively only after the English is approved.

## The questions that need a lawyer's answer

1. **Roles.** The drafts treat the school (or the individual teacher where no school is involved) as controller and LessonCraftStudio as processor for class data. Is that right for a teacher who subscribes privately and uses it in a public school, in Germany, France, the Netherlands, Italy, Sweden, Denmark, Norway and Finland?
2. **Lawful basis.** The drafts say the school decides the basis (public task or legitimate interest for teaching), and that no consent of the child is collected by us. Is a parent notice enough, or do some of the eleven markets require consent for this kind of tool?
3. **United States.** The drafts rely on the school acting for parents under COPPA for a school-directed educational service, and on the "school official" route under FERPA. Is the feature as built inside those limits? Do any state student-privacy laws (for example California, New York, Illinois) require a signed agreement or a listed-vendor status before a teacher may use it?
4. **Brazil and Mexico.** LGPD Art. 14 (children's data, best interest, consent of a parent) and the Mexican federal law: is first name + results processed for a school within what is allowed without separate parental consent?
5. **Sub-processors and transfers.** The server is rented from Hetzner (the operator confirms the data centre's country; the drafts assume the EU). Cloudflare, a US company, sits in front as the content delivery network. Does the agreement need more than the listed standard clauses for Cloudflare?
6. **Retention.** 14 months unused, 60 days after the subscription ends, immediate deletion on request. Acceptable everywhere?
7. **Age.** The children are 4 to 10. Does any market need an age-related statement we do not have?
8. **The company details** in the agreement (legal name, address, contact for data protection) must be filled in by the operator.

## What changes if the lawyer says no to names

A class can already be switched to "numbers only": then no name is stored at all, only a seat number, a picture and results. If a market cannot have names on the server, that switch becomes the only mode there. No rebuild is needed.
