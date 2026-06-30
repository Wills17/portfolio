class CustomFooter extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        footer {
          background: rgba(2, 6, 23, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #64748b;
          padding: 3rem 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          font-family: 'Inter', sans-serif;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .logo {
          color: #e2e8f0;
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: -0.025em;
          text-decoration: none;
        }

        .logo-dot { color: #14b8a6; }

        .copyright {
          font-size: 0.8rem;
          color: #475569;
        }
      </style>

      <footer>
        <div class="footer-content">
          <span class="logo">Williams<span class="logo-dot">.</span></span>
          <p class="copyright">&copy; ${new Date().getFullYear()} Williams Odunayo. All rights reserved. Built with passion.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
