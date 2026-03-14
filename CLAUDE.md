# CLAUDE.md — MySite

## Project Purpose

Personal portfolio and CV website for António Rocha, a Senior Software Developer Engineer in Test (SDET). The site showcases professional biography, career history, skills, portfolio projects, and contact information. Hosted on GitHub Pages with a custom domain (`antoniorocha.pt`).

---

## Architecture

**Pure static site** — no build system, no package manager, no server-side rendering.

- Pages are standalone HTML files that share a common `#header`, navigation, and `#footer` structure.
- CSS is authored in SCSS (`assets/sass/`) and pre-compiled to `assets/css/main.css`.
- JavaScript is ES5 jQuery; all plugins live in `assets/js/`.
- Deployment: `git push origin master` triggers GitHub Pages auto-deploy.

### Page skeleton (every page follows this structure)

```html
<body class="no-sidebar">
  <div id="page-wrapper">
    <div id="header">… nav …</div>
    <div class="wrapper style1">
      <div class="container">… content …</div>
    </div>
    <div id="footer">… social links …</div>
  </div>
  <!-- scripts at bottom -->
</body>
```

---

## Key Files

| File                      | Purpose                                                                |
| ------------------------- | ---------------------------------------------------------------------- |
| `index.html`              | Homepage (Portuguese, default)                                         |
| `index.en.html`           | English variant of homepage                                            |
| `cv.html`                 | CV / résumé — timeline, skills, education                              |
| `portfolio.html`          | Project showcase with lightbox gallery                                 |
| `thank_you.html`          | Redirect target after form submission                                  |
| `assets/css/main.css`     | **Compiled** stylesheet — do not hand-edit if SCSS source is available |
| `assets/sass/main.scss`   | SCSS entry point — edit this for style changes                         |
| `assets/sass/libs/`       | SCSS partials: `_vars.scss`, `_mixins.scss`, `_skel.scss`, etc.        |
| `assets/js/main.js`       | Site initialisation: Skel breakpoints, plugin setup                    |
| `assets/js/jquery.min.js` | jQuery                                                                 |
| `images/`                 | Portfolio project images (Miguel.jpg, Pic*.jpg, bstrong*.jpg, etc.)    |
| `assets/images/`          | UI assets (lightbox arrows, icons)                                     |
| `CNAME`                   | Custom domain: `antoniorocha.pt`                                       |

---

## Tech Stack

- **HTML5** — semantic markup, no templating engine
- **CSS3 / SCSS** — Skel.js grid system, vendor-prefixed via `@include vendor`
- **JavaScript ES5 / jQuery** — dropotron (dropdown nav), scrolly (smooth scroll), onvisible, Lightbox.js
- **Font Awesome** — icon library (bundled in `assets/fonts/` and `assets/css/font-awesome.min.css`)
- **Google Fonts** — Source Sans Pro (loaded via CDN)
- **GitHub Pages** — static hosting from `master` branch

---

## Coding Conventions

### HTML

- Use semantic elements; keep `#header` and `#footer` identical across all pages.
- Grid columns use Skel utility classes: `.4u`, `.12u\(mobile\)`, `.8u\(narrow\)`, etc.
- Lightbox groups are tied via `data-lightbox="group-name"` on `<a>` tags.
- Navigation items that are inactive should be commented out (not deleted).

### CSS / SCSS

- Edit SCSS source; recompile with `sass assets/sass/main.scss assets/css/main.css`.
- Variables and breakpoints live in `assets/sass/libs/_vars.scss`.
- Skill/rating levels use classes: `.rat3` (3/10) through `.rat7` (7/10) applied to `<span>` elements.
- Responsive breakpoints (defined in `main.js` and mirrored in SCSS):
  - `wide` ≤ 1680 px
  - `normal` ≤ 1280 px
  - `narrow` ≤ 960 px
  - `narrower` ≤ 840 px
  - `mobile` ≤ 736 px

### JavaScript

- Wrap all custom code in `(function($) { … })(jQuery);`
- Plugin initialisation goes in `assets/js/main.js`.
- Load order matters: jQuery → plugins → main.js (scripts are at the bottom of `<body>`).

### File naming

- Kebab-case for HTML/CSS/JS files ( `font-awesome.min.css`).
- SCSS partials use underscore prefix (`_vars.scss`).
- Portfolio images follow pattern: `ProjectName1.jpg`, `ProjectName2.jpg`.

---

## Debugging

1. **Open HTML directly in a browser** — no local server needed for layout/content work.
2. **Layout regressions** — check Skel breakpoint classes in `assets/js/main.js` (`settings.breakpoints`) and the matching SCSS in `assets/sass/libs/_skel.scss`.
3. **JS errors** — open browser DevTools console; check plugin load order (jQuery must load before plugins, plugins before `main.js`).
4. **Nav dropdown not working** — dropotron plugin; verify `#nav ul` structure matches expected markup.

---

## Common Tasks

### Add a new page

1. Copy an existing page (e.g. `cp cv.html newpage.html`).
2. Update the `<title>` and main content area.
3. Add a nav link in the `#nav > ul` of **every existing page**.
4. Keep `#header` and `#footer` identical to other pages.

### Add a portfolio item

1. Open `portfolio.html`.
2. Duplicate an existing `<article>` block inside the portfolio grid.
3. Update the `<a href>` image path, `data-lightbox` group name, title, and description.
4. Place images in `images/` following the naming convention (e.g. `projectname1.jpg`).

### Update CV content

- Edit `cv.html`.
- Timeline entries use `<dl>` / `<dt>` / `<dd>` for date + description pairs.
- Skill level: change the `.rat*` class on the `<span>` (`.rat3` = low, `.rat7` = high).

### Style changes

1. Edit the relevant SCSS partial in `assets/sass/`.
2. Recompile: `sass assets/sass/main.scss assets/css/main.css`
3. If no SCSS compiler is available, edit `assets/css/main.css` directly — but mark the section clearly so it can be merged back into SCSS later.

### Deploy

```bash
git add .
git commit -m "Description of change"
git push origin master
```

GitHub Pages auto-deploys within ~1 minute.

---

## Things to Avoid

- **Do not hand-edit `assets/css/main.css`** when SCSS source is available — changes will be overwritten on the next recompile.
- **Do not introduce npm, webpack, or other build tools** without discussing first — the project is intentionally dependency-free.
- **Do not link to or reference** the experimental subdirectories (`/new/`, `/bar/`, `/modal/`, `/popup/`, `/fix/`) from production pages — they are sandboxes.
- **Do not use `email.php`** — it is deprecated and contains syntax errors. Use `send_mail.php` for all contact form work.
- **Do not force-push to master** — it is the live branch served by GitHub Pages.
