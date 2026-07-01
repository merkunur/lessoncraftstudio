# Storybook Studio — Quickstart (for the operator)

The Studio is the visual tool for making storybooks. You compose each page by
eye — drop a picture, place your characters, draw where the activity goes,
pick the activity, type the words — and the Studio saves a finished story that
just works. No coordinates, no code.

## Start it (once per session)

1. Open a terminal in the project folder.
2. Run:  `node scripts/storybook/studio-server.js`
3. It prints an address like `http://127.0.0.1:5055/mini-tools/storybook-studio.html` — open that in your browser.

(If you open the page and see a red bar saying "run this on your computer",
the server isn't running — do steps 1–2.)

## Make a story

**New story** → give it a name → it opens on a blank first page.

Everything for the page you're on is in the panel on the **right**, top to
bottom. The little checklist (Picture · Character · Story lines · Activity ·
Cheer) tells you what's done.

1. **Picture** — click *Pick a picture* and choose a background. (Your
   backgrounds go in the story's `scenes` folder — the Studio can open it for
   you.)
2. **Characters** — *Add a character*, then **click the spot on the picture
   where their feet should stand.** Click a character to change its **pose**,
   **flip** it, or **size** it. Drag it anywhere. The orange dot is its feet.
3. **Activity** — *Choose an activity* from the picture menu. It drops a
   ready-to-go activity box on the page. Drag the box or its round handles to
   move/size it; the panel shows a simple form for it.
   - For **Find the objects**: *Add an object*, then click where it hides;
     pick its picture; it fills in the name and word for you. Untick
     *Must find* to make it a decoy.
4. **Story lines** — *Add a line*, choose who speaks, type what they say.
5. **Hint & Cheer** — what the helper says if the child is stuck, and after
   they win.

**Pages**: the strip on the left. *Add a page* copies the current page's
picture and characters (handy for a series). Reorder with the ↑ arrows.

## Check it and you're done

- **Try it** plays the real story in a window — exactly what the child sees.
  Switch phone/tablet width, or watch from the start.
- **Check my story** looks for anything missing and tells you in plain words,
  with a **Show me** button that jumps to the page. When it says **Ready!**,
  you're finished — the story is already saved in its folder.

## Good to know

- **It saves as you go.** The top bar shows "All changes saved". You can't
  lose work; **Undo** is right there.
- **Recordings are optional.** A line with no voice recording still works
  (the computer reads it). Record the mp3s later.
- **Other languages come later.** Write everything in English here; the
  language experts fill in the other ten from your English, word for word.

## The two things the Studio can't do for you

1. **Art** — backgrounds (1600×1000 pictures) and character drawings. Drop
   backgrounds into the story's `scenes` folder; characters are packed once by
   the tech side.
2. **Voice recordings** — one short mp3 per line, when you want them.

Everything else — the layout, the numbers, the file format — the Studio does.
