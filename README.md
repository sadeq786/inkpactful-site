# Inkpactful — MVP website

Static site. No build step, no dependencies. Netlify serves the files as-is and
redeploys on every push to `main`.

## Deploying

Copy these files into the root of the `inkpactful-site` repo, replacing the
placeholder `index.html`, then:

```bash
git add -A
git commit -m "Replace placeholder with MVP site"
git push origin main
```

Netlify picks it up automatically. No manual redeploy.

## The one file you edit after launch

Everything that isn't ready yet lives at the top of **`site.js`**. Four values:

```js
bookingUrl:       null   // TidyCal link for the 15-MINUTE FIT CALL only
contactEmail:     null   // e.g. "hello@inkpactful.com"
linkedInShaikh:   null
linkedInTasmiha:  null
```

Fill them in, commit, push. Every booking button, every email link, and the
scheduler embed update across all seven pages. You do not need to touch the HTML.

While `bookingUrl` is `null`, the Book page shows a fallback panel asking
visitors to email instead. While `contactEmail` is `null`, email links render
as a highlighted placeholder so it is obvious the site is unfinished.

**Only the fit call link goes in `bookingUrl`.** The 90-minute Impact Lens
session and the 45-minute findings walkthrough stay unlisted in TidyCal and get
sent privately after payment clears.

## TidyCal booking questions

Qualification happens inside TidyCal, not on a separate form. Keep it to four:

1. Organization name
2. Organization website
3. What are you hoping to create or communicate? *(long answer)*
4. Is there a deadline or funding moment connected to this? *(short answer)*

Do not ask for annual revenue or operating budget.

## Files

| File | Purpose |
|---|---|
| `index.html` | Home |
| `services.html` | Services |
| `how-we-work.html` | Process, Impact Lens, three packages |
| `about.html` | Founders, philosophy, credential strip |
| `book.html` | Fit call scheduler |
| `privacy.html` | Privacy policy (not indexed) |
| `404.html` | Not found |
| `styles.css` | All styling |
| `site.js` | Config + mobile nav |
| `netlify.toml` | Clean URLs, security headers, `/call` shortlink |
| `favicon.svg` | Temporary mark — replace with real brand asset |
| `robots.txt`, `sitemap.xml` | Search basics |

## Still outstanding

- **`og-image.png`** is referenced but does not exist yet. Social shares will
  show no preview image until you add a 1200×630 PNG at the repo root.
- **Founder headshots** — `about.html` has two labelled placeholder boxes.
- **Favicon** is a generic lens mark, not final branding.
- **Analytics** — nothing is installed. If you add it, update `privacy.html`.
- **Payment** — deliberately absent. Square invoices are sent by email after the
  fit call. If you later want a `/start` page holding a Square payment link,
  that is a small addition.
- **Domain** — canonical tags and the sitemap assume `https://inkpactful.com/`.
  Update them if the final domain differs.
