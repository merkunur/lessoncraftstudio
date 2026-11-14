#!/usr/bin/env python3
"""
patch-nginx-class-beacon.py — a visit through a class link is not counted by the site's analytics.

WHY
---
Legal decision of 2026-11-14, condition E3b (docs/daily-teaching-system/legal/DECISION-2026-11-14.md): no analytics
runs on a page a child reaches through a class link. Every deck page (about 200,000 are published) and every page of
the app loads the site's own analytics script from /lcs-insights.js (self-hosted Umami, patch-nginx-umami.py).

WHAT
----
No page is rewritten. /lcs-insights.js becomes a small script of this site that looks at the address first:
  - the children's class page (/c/<code>), or an address that carries a class attempt (#lcs=<token>):
    it does nothing. The analytics script is not loaded and nothing is sent.
  - any other visit: it loads the analytics script from /lcs-insights-core.js (the address the analytics script
    itself moves to) with the same data attributes, and the visit is counted as before.

1. the wrapper file /var/www/lcs-media/site-js/lcs-insights.js (written by this script, WRAPPER below)
2. in the analytics block of the site config: `location = /lcs-insights.js` (the proxy to Umami) is renamed to
   `location = /lcs-insights-core.js`, and a new `location = /lcs-insights.js` serves the wrapper.

Idempotent; backup to /root/nginx-backups/; `nginx -t` before reload, the config restored on failure.

    python3 scripts/class-results/patch-nginx-class-beacon.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
JS_DIR = "/var/www/lcs-media/site-js"
JS_FILE = JS_DIR + "/lcs-insights.js"
MARKER = "# Analytics wrapper: a class visit is not counted (2026-11-14)"
END = "# Analytics wrapper: end"
DRY = "--dry-run" in sys.argv
OLD_LOC = "    location = /lcs-insights.js {\n        proxy_pass http://127.0.0.1:3100/script.js;"
NEW_LOC = "    location = /lcs-insights-core.js {\n        proxy_pass http://127.0.0.1:3100/script.js;"

WRAPPER = """/* LessonCraftStudio: the site's own analytics, behind one question. Managed by
   scripts/class-results/patch-nginx-class-beacon.py; do not edit on the server.
   A visit through a class link is NOT counted: on the children's class page (/c/<code>) and on any address that
   carries a class attempt (#lcs=<token>) this script does nothing, so no analytics script is loaded and nothing is
   sent. Every other visit loads the analytics script with the attributes this tag carries. */
(function () {
  try {
    if (/^\\/c\\//.test(location.pathname) || /[#&]lcs=[a-z2-9]{20}(?:&|$)/.test(location.hash || '')) return;
  } catch (e) { return; }
  var me = document.currentScript || document.getElementById('lcs-insights') || document.querySelector('script[src*="lcs-insights.js"]');
  var s = document.createElement('script');
  s.defer = true;
  s.src = (me && me.src ? me.src.replace(/lcs-insights\\.js.*$/, '') : '/') + 'lcs-insights-core.js';
  if (me) for (var i = 0; i < me.attributes.length; i++) { var a = me.attributes[i]; if (/^data-/.test(a.name)) s.setAttribute(a.name, a.value); }
  (document.head || document.documentElement).appendChild(s);
})();
"""

BLOCK = """    {marker}
    location = /lcs-insights.js {{
        alias {js};
        default_type application/javascript;
        add_header Cache-Control "public, max-age=3600";
        add_header X-Content-Type-Options nosniff;
        access_log off;
    }}
    {end}
""".format(marker=MARKER, end=END, js=JS_FILE)


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        return 1
    with open(CONF, encoding="utf-8") as f:
        original = f.read()
    text = original
    if MARKER in text:
        text = re.sub(re.escape("    " + MARKER) + r".*?" + re.escape(END) + r"\n", "", text, flags=re.S)
    if OLD_LOC in text:
        text = text.replace(OLD_LOC, NEW_LOC)
    if text.count(NEW_LOC) != 1:
        print("FATAL: the analytics script's location was not found exactly once (patch-nginx-umami.py's block)")
        return 1
    text = text.replace(NEW_LOC, BLOCK + NEW_LOC)
    if DRY:
        print(WRAPPER)
        print(BLOCK)
        print("dry run: would write %s and rename the analytics location" % JS_FILE)
        return 0
    os.makedirs(BACKUP_DIR, exist_ok=True)
    os.makedirs(JS_DIR, exist_ok=True)
    with open(JS_FILE, "w", encoding="utf-8") as f:
        f.write(WRAPPER)
    os.chmod(JS_DIR, 0o755)
    os.chmod(JS_FILE, 0o644)
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio.%s.bak" % time.strftime("%Y%m%dT%H%M%SZ", time.gmtime()))
    shutil.copy2(CONF, backup)
    with open(CONF, "w", encoding="utf-8") as f:
        f.write(text)
    t = run(["nginx", "-t"])
    if t.returncode != 0:
        shutil.copy2(backup, CONF)
        print("FATAL: nginx -t failed, config restored\n" + t.stderr)
        return 1
    r = run(["systemctl", "reload", "nginx"])
    if r.returncode != 0:
        shutil.copy2(backup, CONF)
        run(["systemctl", "reload", "nginx"])
        print("FATAL: reload failed, config restored\n" + r.stderr)
        return 1
    print("backup -> " + backup)
    print("installed + reloaded: /lcs-insights.js is the wrapper, the analytics script answers at /lcs-insights-core.js")
    return 0


if __name__ == "__main__":
    sys.exit(main())
