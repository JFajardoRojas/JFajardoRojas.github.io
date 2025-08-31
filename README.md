# Academic Website (GitHub Pages)

This is a minimalist, accessible academic website for GitHub Pages. Edit the HTML files directly or extend as needed.

## Quick Start

1. Create a new GitHub repo (public). Name options:
   - `your-username.github.io` (auto-publishes at the root domain), or
   - Any name; then enable Pages from **Settings → Pages → Source: GitHub Actions** or **Deploy from a branch** (main / root).

2. Upload the files from this folder to the repository root. Commit and push.

3. In **Settings → Pages**, set:
   - **Build and deployment**: Deploy from branch
   - **Branch**: `main` and **Folder**: `/ (root)`
   - Or use **GitHub Actions** with a static site workflow.

4. (Optional) Add a custom domain in **Settings → Pages** and create a `CNAME` file with your domain.

5. Replace placeholders:
   - `/assets/profile.jpg`, `/cv/Fajardo_CV.pdf`, and social/profile links in `index.html`
   - Update `assets/publications.json` with your list
   - Edit the JSON-LD schema in the `<head>` as needed

## Local Preview

You can open `index.html` in a browser locally. No build tools required.

## Add Publications

Edit `assets/publications.json` with objects shaped like:
```json
{
  "title": "Paper title",
  "authors": "A. Author, B. Author",
  "venue": "Journal",
  "year": 2025,
  "doi": "https://doi.org/...",
  "arxiv": "https://arxiv.org/abs/...",
  "pdf": "https://.../paper.pdf",
  "code": "https://github.com/..."
}
```

## Optional Enhancements
- Add analytics (Plausible or GA) by inserting the script in `<head>`.
- Add a blog by creating `/blog/` and linking posts.
- Use a custom `404.html` for not-found pages.

© 2025 Fernando Fajardo
