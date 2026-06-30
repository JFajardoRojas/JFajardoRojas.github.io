# J. Fernando Fajardo-Rojas — Academic Website

Personal academic site (https://jfajardorojas.github.io) built with **Jekyll** and
hosted on **GitHub Pages**. Sections: Home, About, Research, Publications, **News**,
**Blog & Reseñas**, **Photos**, CV, Contact.

The site is designed so you can keep it updated **without writing code** — most
updates are either dropping a file in a folder or adding a few lines to a list.

---

## ✍️ How to add content (the only three things you need)

### 1. Add a News item

Open **`_data/news.yml`** and copy this block to the **top** of the list
(newest first). Keep the indentation exactly.

```yaml
- date: 2026-07-15
  tag: Paper              # optional: Paper, Talk, Award, Conference, Milestone…
  title: "Your headline here"
  body: "One or two sentences (optional)."
  link: "https://…"       # optional
```

The 3 most recent items also appear automatically on the home page.

### 2. Add a Photo

1. Put the image file in **`assets/images/photos/`**
   (JPG or WebP, long edge ~1600px, under ~500 KB looks best).
2. Open **`_data/photos.yml`** and add a block:

```yaml
- src: /assets/images/photos/my-photo.jpg
  caption: "Short caption"     # optional
  location: "Where it was"     # optional
  date: 2026-07-15             # optional
```

### 3. Write a Blog post or Reseña

Create a file in **`_posts/`** named `YYYY-MM-DD-short-title.md`.
Start it with this header (called *front matter*), then write in Markdown below it:

```markdown
---
title: "Your title"
date: 2026-07-15
lang: en              # en  or  es   → shows an EN/ES badge and powers the filter
category: opinion     # opinion  or  reseña
description: "One line for search engines / previews."
# --- extra fields for book reviews (reseñas) ---
book: "Book title"            # optional
book_author: "Author name"   # optional
# cover: /assets/images/blog/my-cover.jpg   # optional banner image
---

Write your post here using **Markdown**.

Add `<!--more-->` after the opening paragraph to control where the
preview excerpt on the blog list ends.
```

Posts are sorted newest-first automatically and can be filtered by topic and by
language (EN/ES) on the Blog page. Two example posts are included — read them in
`_posts/` for a template, then delete them when you're ready.

---

## 🚀 Publishing changes

GitHub Pages rebuilds the site automatically. Two easy ways to publish:

- **In the browser:** edit or add files directly at
  https://github.com/jfajardorojas/jfajardorojas.github.io → commit. The live
  site updates in 1–2 minutes.
- **From your computer:**
  ```bash
  git add .
  git commit -m "Add new post / photo / news"
  git push
  ```

## 🔍 Preview locally (optional)

Only needed if you want to see changes before pushing:

```bash
bundle install        # first time only
bundle exec jekyll serve
# open http://localhost:4000
```

---

## 🗂️ Project structure

```
_config.yml              Site-wide settings (title, URL, blog options)
_layouts/                Page templates
  default.html             shared shell (head + nav + footer)
  post.html                blog post template
_includes/               Reusable pieces: head.html, nav.html, footer.html
_data/
  news.yml                 ← edit to add News
  photos.yml               ← edit to add Photos
_posts/                  ← add Markdown files here for the Blog
index.html               Home (Hero, About, Research, Latest News, Publications, CV, Contact)
news.html  blog.html  photos.html   The three new section pages
css/styles.css           All styling
js/main.js               Navigation, filters, photo lightbox
assets/images/photos/    ← put gallery images here
assets/images/blog/      ← optional blog cover images
docs/CV.pdf              Your CV
```

## 🎨 Design

Light academic theme — navy accent (`#1a4480`), Source Serif 4 (body) and
Source Sans 3 (headings). All colors and spacing are defined as variables at the
top of `css/styles.css`, so you can re-theme the whole site by changing a few
values there.
