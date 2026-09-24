---
name: feedback_a_crashed_gate_masquerades_as_a_failed_gate
description: "deploy.sh's `|| { echo \"<specific defect>\"; exit 1; }` prints a content-defect message for ANY non-zero exit, including a gate that could not start"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fd3abd5a-1a0f-4a51-951f-005820734717
  modified: 2026-08-03T01:27:53.765Z
---

Every `deploy.sh` preflight is wired as:

```sh
node /opt/lessoncraftstudio/scripts/<gate>.js \
  || { echo "ERROR: <a very specific content defect>"; exit 1; }
```

That message is printed on **any** non-zero exit — including a crash before the gate
evaluates anything. **A gate that cannot RUN is indistinguishable from a gate that FOUND
something**, and the message actively points you at the wrong thing.

**Empirical (2026-08-03).** A deploy aborted with
`ERROR: an image directory is half-mirrored — see CLAUDE.md §A.7.2`. There was no
half-mirrored directory. `audit-theme-webp-coverage.js` had died on
`MODULE_NOT_FOUND: @prisma/client` — visible only in the stack trace *four lines below*
the confident error line. I started hunting a content defect in the image library on the
strength of that message.

**How to apply:**

- **Read the lines AFTER the ERROR line before believing it.** `deploy.sh` echoes its
  message first; the interpreter's stack trace follows.
- **`cmd | tail` reports `tail`'s exit code, not the command's.** A failing deploy piped
  to `tail` reports `0`. Capture the exit code without a pipe, or use `PIPESTATUS[0]`.
  This is how the aborted deploy first read as a success.
- When adding a gate, make the *crash* case say so distinctly — catch the unavailable
  dependency and exit with a message naming what was missing and where it looked, rather
  than letting a raw `require` stack fall through to a message about content.

Sibling of [[feedback_deploy_gates_must_be_browser_free]] (the same gate family, the other
failure mode: a gate that cannot run on the deploy host at all). See also
[[feedback_diagnostic_order_for_post_deploy_symptoms]] and
[[feedback_verify_rendered_not_source]].
