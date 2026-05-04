# Personal apps portfolio

A static site for hosting privacy policies, terms, support pages, and the
text files ad networks need (`app-ads.txt`) for all your apps. Deploys on
GitHub Pages with no build step.

## File structure

```
/
├── index.html              ← homepage (lists all apps)
├── app-ads.txt             ← AdMob authorized sellers (ROOT — required)
├── ads.txt                 ← web ads (delete if unused)
│
├── privacy.html            ← site-wide privacy
├── terms.html              ← site-wide terms
├── privacy.md              ← EDIT — site-wide privacy content
├── terms.md                ← EDIT — site-wide terms content
│
├── assets/
│   ├── eink.css            ← all styling
│   └── doc.js              ← markdown renderer
│
└── auto-ai-jobs/           ← one folder per app
    ├── index.html          ← app landing page
    ├── privacy.html        ← thin wrapper
    ├── terms.html          ← thin wrapper
    ├── support.html        ← thin wrapper
    ├── privacy.md          ← EDIT — privacy content
    ├── terms.md            ← EDIT — terms content
    └── support.md          ← EDIT — support content
```

## First-time setup

1. **Find/replace your name everywhere** — open the folder in your editor
   and replace `Aryan` with whatever name you want shown publicly. About
   a dozen places: the homepage, the doc-page wrappers' `data-owner=`
   attributes, the wax-seal monogram (`A` in `index.html`), and the
   markdown contact lines.
2. **Find/replace `you@example.com`** with your real email.
3. **Find/replace `@yourhandle`** with your social/GitHub handles (or
   delete those rows from the contact list in `index.html`).
4. **Replace the `pub-XXXXXXXXXXXXXXXX`** in `app-ads.txt` with your
   AdMob publisher ID.
5. **Update each app card's `href="#"`** in `index.html` to point to the
   real app URL (Play Store / App Store / website).

## Deploying to GitHub Pages

1. Push the contents of this folder to a GitHub repo.
2. **Settings → Pages →** choose your branch (usually `main`) and the
   `/` (root) folder.
3. Your site is live at `https://your-username.github.io/repo-name/`
   (or, for a user site at `username.github.io`, just at the root).

## Custom domain (recommended)

For AdMob, a custom domain is cleaner:

1. **Settings → Pages → Custom domain** — add your domain.
2. Add a `CNAME` record at your DNS provider pointing to
   `your-username.github.io`.
3. GitHub auto-creates a `CNAME` file in the repo. Don't delete it.
4. Wait a few minutes for HTTPS to provision.

Make sure the **developer URL** on the Play Console / App Store Connect
matches the same domain you've set up here.

## Editing privacy / terms / support

You edit **markdown**, not HTML. Open the relevant `.md` file and write
in plain markdown — the page renders it automatically with matching
styling. Supported:

- Headings (`#`, `##`, `###`) — `##` automatically gets a `§` prefix
- **Bold**, *italics*, `code`, `> blockquotes`
- Bulleted and numbered lists (bullets become `❦`)
- Links: `[text](url)` and `[text](mailto:you@example.com)`
- Code blocks (triple-backtick), tables, horizontal rules

The first paragraph automatically gets a drop-cap.

## Adding a new app

1. **Copy** the `auto-ai-jobs/` folder, rename it (e.g. `cool-new-app/`).
2. **Open each `.html` file** inside the new folder and change the
   `data-app="..."` attribute and the `<title>` tag. For example, in
   `privacy.html`:

   ```html
   <body
     data-app="Cool New App"      ← change this
     data-type="Privacy Policy"
     data-source="privacy.md"
     data-back="index.html"
     data-back-label="back to Cool New App"
     data-effective="Replace with date"
     data-owner="Aryan">
   ```

3. **Edit** the three `.md` files (`privacy.md`, `terms.md`, `support.md`).
4. **Update** the hero text in `cool-new-app/index.html`.
5. **Add a card** for it on the main `index.html`. Copy any existing app
   card and update the name, description, and folder paths (e.g.
   `cool-new-app/privacy.html`).

## AdMob `app-ads.txt`

One file at the root of your domain covers **all your apps**. AdMob
crawls `https://yourdomain.com/app-ads.txt`, regardless of subfolders.

1. Get your publisher ID from **AdMob → Settings → Account information**
   (it looks like `pub-1234567890123456`).
2. Open `app-ads.txt`, replace `pub-XXXXXXXXXXXXXXXX`.
3. After deploying, verify by visiting
   `https://yourdomain.com/app-ads.txt` directly — it should load as
   plain text.
4. AdMob will pick it up within ~24h after your developer URL on the
   Play Store / App Store Connect points to your domain.

## Local preview

Markdown loads via `fetch()`, which doesn't work when you double-click
HTML files (`file://` URLs are blocked by browsers for `fetch`). To
preview locally, run:

```bash
python3 -m http.server 8000
```

…from inside this folder, then open <http://localhost:8000>.

## Customisation

- **Colors / fonts:** edit the CSS variables at the top of
  `assets/eink.css` (`--paper`, `--ink`, `--accent`, etc.).
- **Doodles:** all SVGs are inline in the HTML — feel free to swap, add,
  remove. They use `currentColor` and CSS variables, so they pick up
  the theme automatically.
- **Wax-seal monogram:** in `index.html`, search for `>A<` inside the
  `<svg class="wax-seal">` block to change the letter.

That's it. Have fun.
