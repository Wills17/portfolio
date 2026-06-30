/* ============================================================
   scripts.js — Portfolio interactivity
   ============================================================ */

// ── Current year in footer ───────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();


// ── Navbar: scroll-aware background ──────────────────────────
const navbar = document.getElementById('navbar');
function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run on load


// ── Mobile hamburger menu ─────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));

  // Animate hamburger lines → X
  const lines = hamburger.querySelectorAll('span');
  if (isOpen) {
    lines[0].style.cssText = 'transform: translateY(7px) rotate(45deg);';
    lines[1].style.cssText = 'opacity: 0; transform: scaleX(0);';
    lines[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg);';
  } else {
    lines.forEach(l => l.style.cssText = '');
  }
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.querySelectorAll('span').forEach(l => l.style.cssText = '');
  });
});


// ── Scroll indicator → About section ─────────────────────────
const heroScroll = document.getElementById('hero-scroll');
if (heroScroll) {
  heroScroll.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
}


// ── Intersection Observer: reveal on scroll ───────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Once visible, stop observing to avoid re-triggering
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));

// Hero elements visible immediately (no scroll needed)
document.querySelectorAll('.hero .reveal').forEach(el => {
  el.classList.add('visible');
});


// ── Active nav link highlight on scroll ──────────────────────
const sections = document.querySelectorAll('section[id], .section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 110;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    link.style.background = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--primary)';
      link.style.background = 'var(--primary-light)';
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();


// ── Smooth scroll for all anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ── Contact form: simulated submit ───────────────────────────
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('form-submit');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name    = document.getElementById('form-name').value.trim();
    const email   = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Loading state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".3"/>
        <path d="M21 12a9 9 0 01-9 9"/>
      </svg>
      Sending…`;

    // Simulate async send
    await new Promise(resolve => setTimeout(resolve, 1200));

    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
    contactForm.reset();

    showToast('Message sent! I\'ll get back to you soon.', 'success');
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// ── Toast notifications ───────────────────────────────────────
function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  const icon = type === 'success'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;

  Object.assign(toast.style, {
    position:    'fixed',
    bottom:      '1.5rem',
    right:       '1.5rem',
    zIndex:      '9999',
    display:     'flex',
    alignItems:  'center',
    gap:         '0.625rem',
    padding:     '0.875rem 1.25rem',
    borderRadius:'0.75rem',
    background:  type === 'success' ? 'hsl(173, 58%, 39%)' : 'hsl(0, 72%, 51%)',
    color:       '#fff',
    fontFamily:  "'Inter', sans-serif",
    fontSize:    '0.9rem',
    fontWeight:  '500',
    boxShadow:   '0 10px 30px rgba(0,0,0,0.2)',
    transform:   'translateY(1rem)',
    opacity:     '0',
    transition:  'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    maxWidth:    '22rem',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity   = '1';
    });
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(1rem)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}


// ── Spinner keyframe (injected once) ─────────────────────────
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);
