class CustomNavbar extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          z-index: 1000;
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          background: rgba(2, 6, 23, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding: 0.875rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          z-index: 1000;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        nav.scrolled {
          background: rgba(2, 6, 23, 0.82);
          border-color: rgba(255, 255, 255, 0.07);
        }

        .logo {
          color: white;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: -0.025em;
          transition: opacity 0.2s ease;
        }
        .logo:hover { opacity: 0.88; }

        .logo-dot { color: #14b8a6; }

        ul {
          display: flex;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        a, button.nav-link {
          color: rgba(226, 232, 240, 0.75);
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.45rem 0.9rem;
          border-radius: 0.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        a:hover, button.nav-link:hover {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.05);
        }

        .cta-btn {
          background: #14b8a6;
          color: #020617 !important;
          font-weight: 700 !important;
          padding: 0.5rem 1.1rem !important;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          text-decoration: none;
          transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 14px 0 hsla(173, 58%, 45%, 0.3);
        }
        .cta-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px 0 hsla(173, 58%, 45%, 0.4);
        }

        /* Mobile button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          z-index: 1100;
        }

        .mobile-menu-btn svg {
          width: 26px;
          height: 26px;
          stroke: #e2e8f0;
          stroke-width: 2;
          fill: none;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          nav { padding: 0.875rem 1.25rem; }

          .desktop-nav { display: none !important; }
          .cta-btn-desktop { display: none !important; }

          .mobile-menu-btn { display: block; }

          ul.mobile-open {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            position: fixed;
            top: 58px;
            left: 0;
            right: 0;
            background: rgba(2, 6, 23, 0.96);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            padding: 1rem 1.25rem 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.8);
            gap: 0.25rem;
            animation: slideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          ul.mobile-open a,
          ul.mobile-open button.nav-link {
            padding: 0.75rem 1rem;
            width: 100%;
            border-radius: 0.5rem;
            font-size: 1rem;
            text-align: left;
          }

          .mobile-cta {
            margin-top: 0.5rem;
            width: 100%;
            text-align: center;
            padding: 0.75rem 1rem !important;
            border-radius: 0.5rem !important;
          }
        }
      </style>

      <nav id="main-nav">
        <a href="/" class="logo">
          Williams<span class="logo-dot">.</span>
        </a>

        <!-- Desktop nav -->
        <ul id="desktop-links" class="desktop-nav">
          <li><a href="index.html#about">About</a></li>
          <li><a href="index.html#skills">Skills</a></li>
          <li><a href="index.html#experience">Experience</a></li>
          <li><a href="index.html#projects">Projects</a></li>
          <li><a href="index.html#contact">Contact</a></li>
        </ul>

        <a href="docs/Williams_Odunayo_CV.pdf" target="_blank" class="cta-btn cta-btn-desktop">Download CV</a>

        <button class="mobile-menu-btn" aria-label="Toggle menu">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      <!-- Mobile nav (hidden until toggled) -->
      <ul id="mobile-links">
        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#skills">Skills</a></li>
        <li><a href="index.html#experience">Experience</a></li>
        <li><a href="index.html#projects">Projects</a></li>
        <li><a href="index.html#contact">Contact</a></li>
        <li><a href="docs/Williams_Odunayo_CV.pdf" target="_blank" class="cta-btn mobile-cta">Download CV</a></li>
      </ul>
    `;

    const nav     = shadow.querySelector("#main-nav");
    const menuBtn = shadow.querySelector(".mobile-menu-btn");
    const menuIcon= shadow.querySelector(".menu-icon");
    const mobileLinks = shadow.querySelector("#mobile-links");

    // Scroll-based nav background
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });

    // Toggle mobile menu
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileLinks.classList.toggle("mobile-open");
      menuIcon.innerHTML = isOpen
        ? `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`
        : `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`;
    });

    // Auto-close on link click
    mobileLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileLinks.classList.remove("mobile-open");
        menuIcon.innerHTML = `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`;
      });
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);
