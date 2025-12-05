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
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          z-index: 1000;
        }

        .logo {
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          white-space: nowrap;
        }

        .logo-icon {
          color: #6366f1;
        }

        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        a:hover {
          color: #10b981;
        }

        /* Mobile button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1100;
        }

        .mobile-menu-btn svg {
          width: 28px;
          height: 28px;
          stroke: white;
          stroke-width: 2;
          fill: none;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          ul {
            display: none;
          }

          ul.mobile-open {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: fixed;
            top: 64px; /* just below navbar */
            left: 0;
            right: 0;
            background: rgba(17, 24, 39, 0.98);
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            animation: fadeDown 0.25s ease;
          }

          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      </style>

      <nav>
        <a href="/portfolio" class="logo">
          <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <rect x="9" y="9" width="6" height="6"/>
          </svg>
          Williams Odunayo
        </a>

        <button class="mobile-menu-btn" aria-label="Toggle menu">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <ul id="nav-links">
          <li><a href="index.html#about">About</a></li>
          <li><a href="index.html#skills">Skills</a></li>
          <li><a href="index.html#projects">Projects</a></li>
          <li><a href="index.html#contact">Contact</a></li>
        </ul>
      </nav>
    `;

    const menuBtn = shadow.querySelector(".mobile-menu-btn");
    const menuIcon = shadow.querySelector(".menu-icon");
    const navLinks = shadow.querySelector("#nav-links");

    // Toggle dropdown on click
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("mobile-open");
      menuIcon.innerHTML = isOpen
        ? `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`
        : `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`;
    });

    // Auto close menu when section link is clicked
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("mobile-open")) {
          navLinks.classList.remove("mobile-open");
          menuIcon.innerHTML = `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`;
        }
      });
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);
