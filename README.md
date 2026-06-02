# 🎨 Rowimay Tamayo | Personal Portfolio

A sleek, responsive, and highly interactive creative developer portfolio showcasing front-end projects, skills, and experience. Built using modern web standards, semantic HTML5, custom premium CSS, and native JavaScript.

---

## 🚀 Live Demo & Project Links
* **Main Portfolio:** [rowimaytamayo.com](https://rowimaytamayo.com)
* **Featured Projects:**
  * [Going Marry (Reloved Bridal Treasures)](https://goingmarry.rowimaytamayo.com)
  * [Sanji's All Blue](https://allblue.rowimaytamayo.com)
  * [Ohara](https://ohara.rowimaytamayo.com)
  * [CottonVet](https://cottonvet.rowimaytamayo.com)
  * [MemoMemoMovies](https://mmm.rowimaytamayo.com)



---

## ✨ Premium Features & UX Enhancements

This portfolio is packed with interactive details and polished styling that make it feel alive:

* **🎬 Hover-to-Play Project Previews:** Screen recordings of web apps (like *Going Marry*) stay cleanly paused on load, showing a custom high-fidelity preview frame. Hovering over a card starts smooth video playback seamlessly, resetting back to the preview frame on mouse leave.
* **⚡ Zero-Flicker Instant Loading (FOUC Fixed):** All assets, stylesheets, and Google Fonts are structured to render synchronously. This eliminates layout distortions, shifting text, and raw white loading flashes, ensuring a premium load feel.
* **📱 Responsive Mobile Bottom Navigation:** Includes a sticky bottom-nav layout custom-tailored for mobile devices, complete with bottom page padding protection to ensure navigation bars never overlap content or footers.
* **🖤 Grounded Branding Footers:** Unified dark-themed footers across all major pages, featuring clean micro-scaled vector social links for LinkedIn, GitHub, and Instagram.
* **📦 CDN Asset Management:** High-definition assets, SVGs, and screencasts are served dynamically from a Supabase Storage CDN bucket with active cache-busting configurations for instant updates.

---

## 🛠️ Technology Stack
* **Markup:** Semantic HTML5
* **Styling:** CSS3, Bootstrap 5 (Responsive Grid), Vanilla CSS Utilities
* **Interactions & Scripting:** Vanilla JavaScript (ES6+), Web APIs
* **Asset CDN:** Supabase Storage & CDN caching

---

## 📂 Project Structure
```bash
portfolio/
├── index.html          # Main landing/intro screen
├── README.md           # Project documentation (this file)
├── package.json        # Local dev environment settings
└── pages/
    ├── portfolio.html  # Featured projects grid & contact form
    ├── profile.html    # Profile cards (LinkedIn, GitHub, Resume, Instagram)
    ├── portfolio.css   # Main stylesheet containing custom premium variables & media queries
    └── app.js          # Core JavaScript handling dynamic projects rendering & video hovers
```

---

## 💻 How to Run Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rowietamayo/rstPortfolio.git
   cd rstPortfolio
   ```

2. **Serve Locally:**
   Since assets are loaded dynamically, serve the files using a local development server (such as `http-server` or VS Code's *Live Server* extension):
   ```bash
   npx http-server ./
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:8080` (or the port specified by your server) to preview your portfolio!
