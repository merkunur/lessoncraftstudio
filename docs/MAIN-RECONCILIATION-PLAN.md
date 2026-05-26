# `main` reconciliation — plan (NOT an action)

> **Must be a dedicated effort, gated on operator decision, never coupled to a feature/SEO PR.** Reconciliation has a different risk profile from any in-flight feature work and must not share a blast radius with it.

Authored as part of the SEO close-out arc (`SEO-FINAL-CLOSEOUT-REPORT.md` §4). The SEO PR merges into `pivot/printable-business-toolkit` independently. This document captures the divergence + the options + the decoupling rule so the work is named and tracked, not silently dropped.

---

## 1. Divergence facts

Captured in plan mode for `SEO-VERIFICATION-REPORT.md` §1 A.1. Verbatim:

```
$ git log main..pivot/printable-business-toolkit --oneline | wc -l
2063

$ git tag | grep -i teardown
v1-teardown-complete            # exists, but NOT in main's ancestry

$ git merge-base main pivot/printable-business-toolkit
4d6cd2d6b0d0a8190c95234258415267070e6e5c    # pre-teardown

$ git show main:frontend/middleware.ts | grep -c "REMOVED_PREFIXES"
0                                # main carries no 410 middleware

$ for d in apps pricing blog guides bundles start compare gallery ideas; do
    echo "  /[locale]/$d/: $(git ls-tree -r main --name-only | grep -c "^frontend/app/\[locale\]/$d/") files on main"
  done
  /[locale]/apps/:     7 files on main
  /[locale]/pricing/:  1 file on main
  /[locale]/blog/:     5 files on main
  /[locale]/guides/:   0 files on main
  /[locale]/bundles/:  0 files on main
  /[locale]/start/:    0 files on main
  /[locale]/compare/:  0 files on main
  /[locale]/gallery/:  0 files on main
  /[locale]/ideas/:    0 files on main
```

**Summary.** `main` is 2,063 commits behind `pivot/printable-business-toolkit`. It still carries seller route trees (`apps/`, `pricing/`, `blog/`). Its middleware does not 410-Gone seller prefixes. Tag `v1-teardown-complete` is not in `main`'s ancestry.

---

## 2. Risk scenarios (why this matters)

`main` is an **unexploded landmine.** Any of the following silently undoes the teardown:

- A hotfix branched off `main` reintroduces the seller route tree on merge.
- A fresh clone defaults to `main` — the developer's dev environment looks "year ago" and any code they write against it inherits the seller surface.
- A CI job keyed to `main` (image build, preview environment, security scan, Snyk baseline, Dependabot base, code-search index) runs against the pre-teardown state and gives misleading signals.
- Any external tooling pinned to `main` as "this is what's live" (uptime monitor configs, blue/green deploy traffic mirrors, documentation snippets) carries the wrong assumption.

**None of these triggers a loud failure.** That's the failure mode — `main` quietly looks fine while it's actually a year out of date and seller-flavored.

---

## 3. Options + tradeoffs

Operator picks one. Each is its own dedicated arc — none of them can ride this SEO PR.

### (a) Replace `main` with the pivot lineage

```
# Conceptual, not executable from this doc:
git checkout main
git reset --hard pivot/printable-business-toolkit   # OR fast-forward if ancestry permits
git push --force-with-lease origin main
```

**Implications.**
- Cleanest endgame. `main` immediately matches deploy reality.
- Open PRs targeting `main` need rebasing (or retargeting at the new HEAD).
- Branch-protection rules around `main` already cover the new tip.
- CI keyed to `main` immediately sees current code.
- `git log main` history changes shape: the 2,063-commit pivot lineage becomes the main lineage. Whether `--force-with-lease` is acceptable depends on operator's archival policy.

**Risk:** force-update is destructive to anyone with a checkout of old `main`; their `git pull` becomes a non-fast-forward fetch and they'll need to reset their local `main`. Coordinate.

### (b) Reconciliation merge

```
# Conceptual:
git checkout main
git merge pivot/printable-business-toolkit
# resolve conflicts (likely large — 2K commits span the teardown)
git push origin main
```

**Implications.**
- Preserves both lineages in history.
- The conflict resolution will be substantial. The teardown alone deleted hundreds of seller files that still exist on `main`; resolving them as "deletion wins" is the obvious call but every conflicting file must be touched.
- Heavier review burden than (a).
- After merge, `main` matches pivot HEAD and the seller artifacts are gone.

**Risk:** conflict resolution is the surface where errors creep in. Anything resolved the wrong way reintroduces a piece of the seller surface silently. Needs a careful diff review post-merge.

### (c) Retire `main`, rename pivot as the new default

```
# Conceptual — depends on host (GitHub/GitLab) settings:
# 1. Push pivot/printable-business-toolkit to a new branch (e.g. `production` or `trunk`)
# 2. Change the repo's default branch in host settings.
# 3. Migrate branch-protection rules to the new default.
# 4. Delete (or archive + noindex-tag) the old `main`.
```

**Implications.**
- Cleanest from a "what does production look like" standpoint — the default branch is by definition the deploy target.
- Every CI trigger, deploy hook, external tool, and PR review URL pinned to `main` needs updating.
- Open PRs in flight need rebasing onto the new default.
- Some hosts (depending on plan) restrict default-branch deletion or auto-redirect old branch URLs.

**Risk:** the broadest change surface — every external reference to `main` is a thing that might break. But it also makes the "we don't deploy from main" reality explicit.

---

## 4. Recommended next-action shape (NOT a decision)

This document does not pick. The operator decides between (a), (b), and (c) based on:
- Tolerance for `--force` operations (excludes (a)).
- Tolerance for a large merge conflict surface (excludes (b)).
- Willingness to update external references to the default branch name (excludes (c)).
- Audit/compliance requirements about history preservation.

Once the operator chooses, a separate `[CHORE][REPO] main reconciliation — <chosen-option>` arc opens with its own plan, branch, PR, and validation. The SEO branch (`seo-remediation`) merges first into `pivot/printable-business-toolkit` and is unrelated to this.

---

## 5. What this doc is NOT

- Not authorization to run any of (a)/(b)/(c).
- Not a recommendation between them.
- Not part of the SEO close-out PR — it is a tracked obligation for a future operator decision.

The decoupling banner at the top of this document is the load-bearing sentence.
