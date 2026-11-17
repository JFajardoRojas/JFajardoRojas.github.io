# jfajardorojas.github.io

Personal academic website of J. Fernando Fajardo-Rojas, built with Jekyll and hosted on GitHub Pages.
Pushing to `main` publishes the site (usually within 1–2 minutes).

## Everyday edits

| What | Where |
|------|-------|
| Position, institution, email, profile links | `_config.yml` (top section) |
| Add a paper | `_data/publications.yml` (copy a block, put it at the top) |
| Show a paper on the home page | add `selected: true` to it |
| Add news | `_data/news.yml` (any order; sorted by date automatically) |
| Research text | `research.html` |
| Bio (home page) | `index.html` |
| Research images | `assets/images/research/` (swap in your own figures, same file names) |
| CV PDF | replace `docs/CV.pdf` |
| Discovery-loop labels and captions | `STEPS` at the top of `js/discovery-loop.js` |

Publication themes (used by the filter on the Publications page):
`adsorption`, `stability`, `catalysis`, `data`, `interfaces`, `other`.

## Changing jobs

Edit `position`, `department`, `institution`, `group`, `location`, `office` and `email` in
`_config.yml`. Every page picks up the change.

## Structure

```
_config.yml              site settings and current position
_data/publications.yml   all publications
_data/news.yml           news items
_includes/               head (SEO), header/nav, footer
_layouts/default.html    page shell
index.html               home: intro panel, portrait, bio, latest news
research.html            discovery loop + four research themes
publications.html  news.html  cv.html  contact.html
about.html               redirects to the home page
css/styles.css           all styles (colors at the top)
js/main.js               mobile menu, publication filter, scroll reveal
js/discovery-loop.js     interactive hero visual
docs/CV.pdf              downloadable CV
```

## Hidden sections

The blog (`blog.html`, `_posts/`) and photo gallery (`photos.html`, `_data/photos.yml`) are kept but
not published. To bring them back, remove the lines marked "Hidden" in `_config.yml` and
`_includes/nav.html`. (They still use the previous design and would need restyling.)

## Local preview (optional)

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```
