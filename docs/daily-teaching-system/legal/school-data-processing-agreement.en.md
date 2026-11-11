# DRAFT — data processing agreement for schools (classes and results)

> Draft for a lawyer's check (2026-11-11). Not published, not offered to any school. It follows the structure of GDPR Article 28(3). Square brackets mark what the operator or the school fills in. The technical statements must match `FACTS.md`; where they differ, `FACTS.md` is corrected or the feature is, before this is used.

**Between**

the school, school authority or teacher that accepts this agreement ("the School", the controller), and

[legal name of the company operating LessonCraftStudio], [address], [registration] ("LessonCraftStudio", the processor).

## 1. Subject and duration

LessonCraftStudio provides the "classes and results" feature of its website to the School's teachers. This agreement applies for as long as a teacher of the School uses that feature, and until the data has been deleted under section 9.

## 2. Nature and purpose of the processing

Storing the classes a teacher makes, receiving the results of worksheets that children do through a class link, and showing those results to that teacher. The purpose is teaching: letting a teacher see what each child has understood. No other purpose.

## 3. Types of personal data

- Of children: a display name (first name or nickname) if the teacher enters one; a seat number and a picture; per worksheet the number of right answers, the number of answers, which answers were right, the number of Check presses, whether the page was finished, date and time; for a set with levels, the level of the page.
- Of teachers: the account data described in the general privacy policy.

No special categories of data are requested. The School instructs its teachers not to enter anything other than a first name or nickname as a display name.

## 4. Data subjects

Children in the School's classes, typically 4 to 10 years old. The School's teachers.

## 5. Instructions

LessonCraftStudio processes the data only on the School's documented instructions. The School gives its instructions by using the feature: making, changing and deleting classes, seats and assignments. LessonCraftStudio tells the School if it believes an instruction breaks data-protection law.

## 6. Confidentiality

Everyone at LessonCraftStudio who can access the data is bound to confidentiality. Access is limited to what is needed to run and repair the service.

## 7. Security

LessonCraftStudio keeps at least these measures:

- Transport encryption (HTTPS) for every page and request.
- Results can be read only by the teacher who owns the class, after signing in; every request is checked against the owner on the server.
- A class link contains a random key of 10 characters from 32 symbols; the teacher can replace it at any time. A result is tied to a seat by a random one-time token of 20 characters.
- A child's result request carries no cookie; no device identification is stored.
- The database is on a single server in the European Union, reachable for administration only with a personal key.
- Backups are kept for no longer than 35 days as far as class data is concerned.
- The software that enforces these rules is covered by automated tests that are run before every release.

## 8. Sub-processors

The School agrees to these sub-processors:

| Sub-processor | Purpose | Place |
|---|---|---|
| Hetzner Online GmbH | Server hosting | [Germany / Finland], EU |
| Cloudflare, Inc. | Delivery of the website; requests pass through, class data is not stored | Worldwide; [transfer mechanism] |

LessonCraftStudio informs the School [30] days before adding or replacing a sub-processor, by [email to the teacher's account address / a notice on a named page]. The School may object; if the objection cannot be met, the School may stop using the feature and its data is deleted.

## 9. Deletion and return

- A teacher can delete a child's results, a child, an assignment or a class at any time, and can copy the results out of the dashboard before doing so.
- A class not used for 14 months is deleted automatically. When the teacher's plan ends, their classes are deleted 60 days later.
- When this agreement ends, all class data is deleted within 60 days, and from backups within a further 35 days, unless a law requires it to be kept.

## 10. Helping the School

LessonCraftStudio helps the School answer requests from children and parents (access, correction, deletion, objection), with data-protection impact assessments, and in consultations with the supervisory authority, as far as the feature is concerned. Most requests can be met by the teacher directly in the feature. Requests that reach LessonCraftStudio are passed to the teacher without delay.

## 11. Personal data breaches

LessonCraftStudio tells the School without undue delay, and no later than [48] hours after becoming aware of a breach that affects class data, what happened, which data and roughly how many children are affected, and what has been done.

## 12. Audits

LessonCraftStudio gives the School the information needed to show that this agreement is kept, and allows an audit by the School or an auditor it names, with reasonable notice, at most once a year unless there is a concrete reason.

## 13. No other use

LessonCraftStudio does not use class data for advertising, profiling, sale, or the training of any system, and does not combine it with other data. Statistics that contain no names and no results of single children are not personal data and are outside this agreement.

## 14. Transfers outside the EU / EEA

Class data is stored in the European Union. [Statement on Cloudflare and the transfer mechanism, as advised.]

## 15. Law and precedence

[Governing law and court, as advised.] Where this agreement and the general terms differ on personal data, this agreement applies.

## How a school accepts it

[To be decided with the lawyer: a countersigned PDF on request, or acceptance by a named person in the teacher's account. Until that is decided, schools ask at the contact address and receive the PDF.]
