# J. Fernando Fajardo-Rojas - Academic Personal Website

A modern, visually distinctive academic website showcasing computational materials science research with AI/ML focus.

![Preview](assets/images/preview.png)

## ✨ Features

- **Dark/Light Mode Toggle** - Smooth theme switching with persistent preference
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Animated Particle Background** - Interactive canvas-based network visualization
- **Scroll Animations** - Elegant reveal effects using Intersection Observer
- **Publications Filter** - Filter publications by year
- **Sticky Navigation** - Smart navbar that adapts on scroll
- **Mobile-First** - Hamburger menu for mobile devices
- **Performance Optimized** - Respects reduced motion preferences

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/jfajardorojas/jfajardorojas.github.io.git
   cd jfajardorojas.github.io
   ```

2. **Add your content**
   - Replace `assets/images/profile.jpg` with your photo
   - Add your CV to `docs/cv.pdf`
   - Update publications in `index.html`

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update personal content"
   git push origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)`
   - Your site will be live at `https://yourusername.github.io`

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jfajardorojas/jfajardorojas.github.io.git
   cd jfajardorojas.github.io
   ```

2. **Start a local server**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx serve
   ```
   
   Using VS Code: Install "Live Server" extension and click "Go Live"

3. **Open in browser**
   Navigate to `http://localhost:8000`

## 📁 Project Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles (CSS variables, components, responsive)
├── js/
│   └── main.js         # JavaScript (theme, navigation, particles, animations)
├── assets/
│   └── images/
│       └── profile.jpg # Your profile photo
├── docs/
│   └── cv.pdf          # Your CV (downloadable)
└── README.md           # This file
```

## 🎨 Customization

### Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    /* Dark Theme */
    --accent-primary: #00d4aa;    /* Main accent color */
    --accent-secondary: #00b894;  /* Secondary accent */
    --bg-primary: #0a0f1a;        /* Background */
    /* ... */
}

[data-theme="light"] {
    --accent-primary: #059669;    /* Light theme accent */
    /* ... */
}
```

### Fonts

The site uses Google Fonts:
- **Outfit** - Headings and UI
- **Source Serif 4** - Body text
- **JetBrains Mono** - Code and accents

To change fonts, update the Google Fonts link in `index.html` and the CSS variables.

### Content

1. **Personal Information**: Update the hero section in `index.html`
2. **About**: Modify the about section with your bio
3. **Research**: Update research cards with your focus areas
4. **Publications**: Add your publications with proper formatting
5. **CV Timeline**: Update education and experience
6. **Contact**: Add your email and social links

### Social Links

Update the following placeholder URLs in `index.html`:
- Google Scholar: `https://scholar.google.com/citations?user=YOUR_ID`
- ORCID: `https://orcid.org/YOUR_ORCID`
- GitHub: `https://github.com/YOUR_USERNAME`
- LinkedIn: `https://linkedin.com/in/YOUR_PROFILE`
- Twitter/X: `https://twitter.com/YOUR_HANDLE`

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ⚡ Performance

- No external JavaScript frameworks
- Minimal dependencies (only Google Fonts)
- CSS-only animations where possible
- Lazy loading support for images
- Respects `prefers-reduced-motion`

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

MIT License - Feel free to use and modify for your own academic website.

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request.

---

**Built with ❤️ for the academic community**

*Designed to showcase research with elegance and professionalism.*

