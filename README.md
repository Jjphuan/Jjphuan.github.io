# Ree — demo portfolio

Static concept sites for Ree, a part-time freelance web developer in Malaysia. Plain HTML, CSS, and JavaScript. No build step, no framework, and no backend. Upload the folder as it is.

The cafe, salon, and tuition centre are fictional. They are sample work for prospective clients, not real businesses.

## Pages

| Path | What it is |
| --- | --- |
| `index.html` | Portfolio, starter packages, and Ree's contact details |
| `cafe/` | Senja Kopi, a fictional kopitiam in SS2, Petaling Jaya |
| `salon/` | Murni Atelier, a fictional beauty studio in Damansara Utama |
| `tuition/` | Akar Learning, a fictional tuition centre in USJ, Subang Jaya |

Each demo is one scrolling page. A banner and the footer both say it is a concept site, in English and in Chinese (演示网站，非真实商家).

## Replace Ree's contact details

All of Ree's own contact placeholders live in one file:

**`ree.config.js`** (in this folder)

| Field | What to put |
| --- | --- |
| `whatsappNumber` | Country code + number, digits only. No `+`, spaces, or dashes. A Malaysian mobile looks like `60123456789`. |
| `whatsappDisplay` | How the number should look on the page, for example `+60 12-345 6789`. |
| `email` | The address used for the email link. |
| `emailSubjectEn` / `emailSubjectZh` | Subject line for the email link. |
| `whatsappGreetingEn` / `whatsappGreetingZh` | The message that is already typed when someone taps WhatsApp. |

Save the file and refresh the portfolio. The WhatsApp buttons, the floating button, the displayed number, and the email link all read from this file.

The three demos do **not** use `ree.config.js`. Each fictional shop has its own number at the top of:

- `cafe/cafe.js` — `WA_NUMBER` and `WA_DISPLAY`
- `salon/salon.js` — same
- `tuition/tuition.js` — same

Those are part of the make-believe businesses (`60000000000` is not a real line). Change them only if you turn a demo into a real client site. The matching `https://wa.me/60000000000` links in each `index.html` are the fallback for when JavaScript is turned off. If you change a demo number, search the project for `60000000000` and update those fallbacks too.

## Edit the words

Open the page's `index.html`.

- English is the text you see between the tags.
- Chinese (Simplified) is the `data-zh="..."` attribute on the same element.

Edit both, and keep them as the same meaning. Do not put a raw `"` inside `data-zh`. Use 「」 if you need quotation marks.

Prices, hours, and most of the menu are ordinary text. The language button remembers the visitor's choice in this browser (`localStorage` key `ree-lang`).

Booking and enquiry forms do not save anything. They open WhatsApp with the details filled in. The visitor still has to press send.

## Run it on your computer

Any static server works. From this folder:

```bash
python3 -m http.server 8741
```

Then open `http://127.0.0.1:8741/`.

Opening `index.html` directly from the file manager also works for reading the pages. A small server is the better way to check links between the portfolio and the demos.

## Deploy free on GitHub Pages

1. Create a new empty repository on GitHub (no README, so you don't get a nested folder).
2. Upload these files, or push this folder with git. `index.html` must sit at the repository root, next to the `cafe`, `salon`, and `tuition` folders.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Choose the branch you pushed (often `main`) and the folder **`/ (root)`**. Save.
6. Wait a minute. GitHub shows the site address at the top of that settings page. A project site usually looks like `https://YOURNAME.github.io/REPO/`.

There is no build command. Leave the Pages source as the branch itself, not a framework.

Links in this project are relative (`cafe/`, `../index.html`), so the site still works when it is published inside a repository subpath.

## Deploy free on Netlify Drop

1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop). Sign in or create a free account if Netlify asks.
2. Drag **this folder** onto the page — the folder that contains `index.html`, `cafe`, `salon`, and `tuition`. Do not drag a parent folder, or the site will look for `index.html` in the wrong place.
3. Netlify publishes it and gives you an address ending in `.netlify.app`.
4. Optional: under **Site configuration → Domain management**, change the site name to something you like.

No build command. The publish directory is the folder root.

## Fonts and pictures

Fonts load from Google Fonts, so the first visit needs a network connection. If the fonts cannot load, the browser uses its own serif and sans, and Chinese uses the device's Chinese font. Illustrations are SVG in the HTML. Nothing is hotlinked from a photo site. See `CREDITS.md`.

The cafe map is a drawing, not a live map. "Open in Google Maps" is a normal search link and does not need an API key.
