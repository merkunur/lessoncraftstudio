# DRAFT — data processing agreement for schools (classes and results)

> Draft for a lawyer's check (2026-11-11). Not published, not offered to any school. It follows the structure of GDPR Article 28(3). Square brackets mark what the operator or the school fills in. The technical statements must match `FACTS.md`; where they differ, `FACTS.md` is corrected or the feature is, before this is used.

**Between**

the school or school authority named at acceptance, represented by a person authorised to sign for it, or a private tutor or home educator who decides alone about the data ("the School", the controller), and

[legal name of the company operating LessonCraftStudio], [address], [registration] ("LessonCraftStudio", the processor).

## 1. Subject and duration

LessonCraftStudio provides the "classes and results" feature of its website to the School's teachers. This agreement applies for as long as a teacher of the School uses that feature, and until the data has been deleted under section 9.

## 2. Nature and purpose of the processing

Storing the classes a teacher makes, receiving the results of worksheets that children do through a class link, and showing those results to that teacher. The purpose is teaching: letting a teacher see what each child has understood. No other purpose.

## 3. Types of personal data

- Of children: a seat number and a picture; a display name (first name or nickname) only if the School has switched first names on; per worksheet: which worksheet, when it was opened, the number of right answers at the first Check and when that was, the number of answers, which answers were right, the number of Check presses, whether the page was finished; for a set with levels, the level of the page. Of the class: its name and language. In transit only, not stored with any of the above: the internet address of the device.
- Of teachers: the account data described in the general privacy policy.

No special categories of data are requested. The School instructs its teachers not to enter a child's name or other personal details in the class name, and, where first names are switched on, to enter nothing other than a first name or nickname as a display name.

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
- The database is on a single server in [Finland / Germany], reachable for administration only with a personal key. Backups of the database are kept on that server for 7 days [and, as far as class data is concerned, for at most 35 days on an encrypted computer of LessonCraftStudio in [country]].
- Backups are kept for no longer than 35 days as far as class data is concerned.
- The software that enforces these rules is covered by automated tests that are run before every release.

## 8. Sub-processors

The School agrees to these sub-processors:

| Sub-processor | Purpose | Place |
|---|---|---|
| Hetzner Online GmbH | Server hosting | [Germany / Finland], EU |
| Cloudflare, Inc. | Delivery of the website; requests pass through, class data is not stored | United States and its worldwide network; EU-US Data Privacy Framework certification of Cloudflare, Inc., and the EU standard contractual clauses (Implementing Decision (EU) 2021/914) in Cloudflare's data processing addendum |

LessonCraftStudio informs the School 30 days before adding or replacing a sub-processor, by e-mail to the account address of each teacher of the School and on the page [address]. LessonCraftStudio binds every sub-processor by contract to the same data-protection duties as in this agreement and remains fully liable to the School for what a sub-processor does. The School may object; if the objection cannot be met, the School may stop using the feature and its data is deleted.

## 9. Deletion and return

- A teacher can delete a child's results, a child, an assignment or a class at any time, and can print the results or save them as a PDF from the dashboard before doing so.
- A class not used for 14 months is deleted automatically. When the teacher's plan ends, their classes are deleted 60 days later.
- When this agreement ends, all class data is deleted within 60 days, and from backups within a further 35 days, unless a law requires it to be kept.

## 10. Helping the School

LessonCraftStudio helps the School answer requests from children and parents (access, correction, deletion, objection), with data-protection impact assessments, and in consultations with the supervisory authority, as far as the feature is concerned. Most requests can be met by the teacher directly in the feature. Requests that reach LessonCraftStudio are passed to the teacher without delay.

## 11. Personal data breaches

LessonCraftStudio tells the School without undue delay, and no later than 48 hours". Add: "The notice says what happened, which kinds of data and roughly how many children and records are affected, the likely consequences, what has been done, and whom to contact. after becoming aware of a breach that affects class data, what happened, which data and roughly how many children are affected, and what has been done.

## 12. Audits

LessonCraftStudio gives the School the information needed to show that this agreement is kept, and allows an audit by the School or an auditor it names, with reasonable notice, at most once a year unless there is a concrete reason.

## 13. No other use

LessonCraftStudio does not use class data for advertising of any kind, does not sell or rent it, does not use it to train any system, does not combine it with other data, and builds no profile of a child except what the feature shows the teacher for teaching (the result bands and the automatic choice of the next page in a set with levels). Statistics that contain no names and no results of single children are not personal data and are outside this agreement.

## 14. Transfers outside the EU / EEA

Class data is stored in [Finland / Germany] [and, in backups, in [country]]. It passes through the network of Cloudflare, Inc., which may process it in the United States; this transfer rests on Cloudflare's certification under the EU-US Data Privacy Framework and, should that fall away, on the EU standard contractual clauses in Cloudflare's data processing addendum. [If LessonCraftStudio is established outside the EEA and outside a country with an adequacy decision: The EU standard contractual clauses, Module Two (controller to processor), form part of this agreement; their annexes are sections 2 to 4, 7 and 8 of this agreement.]

## 15. Law and precedence

Where the School is in the European Economic Area, the United Kingdom or Switzerland, this agreement is governed by the law of the School's country and the courts at the School's seat decide. Otherwise it is governed by the law of [country of LessonCraftStudio]. A public school in the United States is governed by the law of its own state. Where this agreement and the general terms differ on personal data, this agreement applies.

## How a school accepts it

Decided: (1) For numbers-only classes these terms apply through the teacher's confirmation when she makes her first class. (2) To switch first names on, a person authorised to sign for the school accepts this agreement on the page [address], giving name, role, school, the school's official e-mail address and the confirmation "I am authorised to conclude this agreement for the school named above"; LessonCraftStudio confirms by e-mail to that address and only then switches first names on for the teachers the school names. (3) A countersigned PDF is sent on request. A teacher cannot accept for a school.
