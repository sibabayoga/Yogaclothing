/* =========================================
   YOGA CLOTHING â€“ Interactive JavaScript
   ========================================= */

// ===== SIZE TAB SWITCHER (global, used by inline onclick) =====
function switchSizeTab(gender) {
  const tablePria = document.getElementById('tablePria');
  const tableWanita = document.getElementById('tableWanita');
  const tabPria = document.getElementById('tabPria');
  const tabWanita = document.getElementById('tabWanita');

  if (gender === 'pria') {
    tablePria.style.display = '';
    tableWanita.style.display = 'none';
    tabPria.classList.add('active');
    tabWanita.classList.remove('active');
  } else {
    tablePria.style.display = 'none';
    tableWanita.style.display = '';
    tabWanita.classList.add('active');
    tabPria.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', function () {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when link clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== HERO COLOR SWATCHES =====
  const heroSwatches = document.querySelectorAll('.hero-swatch');
  const tshirtSvg = document.querySelector('.tshirt-svg-wrap .tshirt-svg');
  const tagColor = document.querySelector('.tag-color');

  heroSwatches.forEach(swatch => {
    swatch.addEventListener('click', function () {
      // Update active state
      heroSwatches.forEach(s => s.classList.remove('active'));
      this.classList.add('active');

      // Update t-shirt color
      const color = this.getAttribute('data-color');
      const name = this.getAttribute('data-name');

      if (tshirtSvg) {
        tshirtSvg.style.color = color;
        // Add pop animation
        tshirtSvg.style.transform = 'scale(1.05) rotate(-2deg)';
        setTimeout(() => {
          tshirtSvg.style.transform = '';
          tshirtSvg.style.transition = 'color 0.5s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
        }, 20);
      }

      if (tagColor) {
        tagColor.textContent = name;
        // Update hero orb colors
        document.querySelector('.orb-1').style.background =
          `radial-gradient(circle, ${hexToRgba(color, 0.28)} 0%, transparent 70%)`;
      }
    });
  });

  // Trigger initial color animation
  setTimeout(() => {
    if (heroSwatches[0]) heroSwatches[0].dispatchEvent(new Event('click'));
  }, 300);

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // ===== COLOR CARDS â€“ Click to animate =====
  document.querySelectorAll('.color-card').forEach(card => {
    card.addEventListener('click', function () {
      const color = this.getAttribute('data-color');
      // Flash the card
      this.style.transform = 'scale(0.96)';
      setTimeout(() => {
        this.style.transform = '';
        this.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
      }, 120);
    });
  });

  // ===== TOGGLE COLORS LOGIC =====
  const colorCardsGrid = document.querySelectorAll('.colors-grid .color-card');
  const toggleBtn = document.getElementById('toggleColorsBtn');
  let isExpanded = false;

  // Hide cards beyond 12 initially
  colorCardsGrid.forEach((card, index) => {
    if (index >= 12) {
      card.style.display = 'none';
      card.classList.add('hidden-color-card');
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      isExpanded = !isExpanded;
      if (isExpanded) {
        colorCardsGrid.forEach((card, index) => {
          if (index >= 12) {
            card.style.display = '';
            // Add slight stagger to intro
            card.style.animation = `fadeInUp 0.4s ease forwards`;
          }
        });
        this.textContent = 'Sembunyikan';
      } else {
        colorCardsGrid.forEach((card, index) => {
          if (index >= 12) {
            card.style.display = 'none';
            card.style.animation = ''; // Reset
          }
        });
        this.textContent = 'Lihat Lainnya';
        document.getElementById('colors').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll(
    '.color-card, .product-card, .fabric-card, .testimonial-card, .section-header, .size-content, .hero-stats'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, i * 50);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));

  // ===== STAGGERED CARD OBSERVER (for grids) =====
  function staggerObserve(selector, delay = 80) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, i) => {
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, i * delay);
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      cardObserver.observe(card);
    });
  }

  staggerObserve('.color-card', 60);
  staggerObserve('.fabric-card', 90);
  staggerObserve('.product-card', 100);
  staggerObserve('.testimonial-card', 80);

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== ACTIVE NAV HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    {
      rootMargin: '-20% 0px -70% 0px'
    }
  );

  sections.forEach(sec => sectionObserver.observe(sec));

  // ===== FIXED WA BUTTON PULSE =====
  const waFixed = document.getElementById('waFixed');
  if (waFixed) {
    // Show/hide label on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > 300) {
        waFixed.style.opacity = '1';
        waFixed.style.transform = 'translateY(0)';
      }
      lastScroll = current;
    }, { passive: true });
  }

  // ===== SIZE TABLE ROW HOVER GLOW =====
  document.querySelectorAll('.size-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function () {
      this.style.boxShadow = 'inset 0 0 0 1px rgba(90,124,107,.3)';
    });
    row.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';
    });
  });

  // ===== NAVBAR ACTIVE LINK STYLE =====
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: var(--green-400) !important; }`;
  document.head.appendChild(style);

  // ===== HERO ENTRANCE ANIMATION =====
  const heroBadge = document.querySelector('.hero-badge');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroActions = document.querySelector('.hero-actions');
  const heroVisual = document.querySelector('.hero-visual');

  function animateIn(el, delay, translateY = 30) {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = `translateY(${translateY}px)`;
    el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  }

  animateIn(heroBadge, 100);
  animateIn(heroTitle, 250);
  animateIn(heroSubtitle, 400);
  animateIn(heroActions, 550);
  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'translateX(30px)';
    heroVisual.style.transition = 'opacity 1s ease 600ms, transform 1s cubic-bezier(0.22, 1, 0.36, 1) 600ms';
    setTimeout(() => {
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = 'translateX(0)';
    }, 50);
  }

  // ===== CURSOR GLOW EFFECT (desktop) =====
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9999;
      width: 350px; height: 350px; border-radius: 50%;
      background: radial-gradient(circle, rgba(90,124,107,0.06) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 0.15s ease, top 0.15s ease;
      left: -400px; top: -400px;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ===== IMAGE MODAL =====
  const modal = document.getElementById("imageModal");
  const expandedImg = document.getElementById("expandedImg");
  const spanClose = document.querySelector(".img-modal-close");

  if (modal && expandedImg) {
    document.querySelectorAll('.product-img').forEach(img => {
      img.addEventListener('click', function() {
        modal.style.display = "flex";
        expandedImg.src = this.src;
        document.body.style.overflow = "hidden"; // Prevent scrolling
      });
    });

    if (spanClose) {
      spanClose.addEventListener('click', function() {
        modal.style.display = "none";
        document.body.style.overflow = "";
      });
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === "Escape" && modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  console.log('%cðŸŒ¿ Yoga Clothing Landing Page', 'color: #5a7c6b; font-size: 16px; font-weight: bold;');
  console.log('%cBuilt with love & DM Sans ðŸ’›', 'color: #c9a84c; font-size: 12px;');

  // ===== STAR RATING =====
  const stars = document.querySelectorAll('.star');
  const inputRating = document.getElementById('inputRating');

  stars.forEach(star => {
    star.addEventListener('mouseenter', function () {
      const val = parseInt(this.getAttribute('data-value'));
      stars.forEach((s, i) => s.classList.toggle('active', i < val));
    });
    star.addEventListener('click', function () {
      const val = this.getAttribute('data-value');
      if (inputRating) inputRating.value = val;
      stars.forEach((s, i) => s.classList.toggle('active', i < parseInt(val)));
    });
  });

  const starRatingEl = document.getElementById('starRating');
  if (starRatingEl) {
    starRatingEl.addEventListener('mouseleave', function () {
      const selectedVal = inputRating ? parseInt(inputRating.value) || 0 : 0;
      stars.forEach((s, i) => s.classList.toggle('active', i < selectedVal));
    });
  }

  // ===== FEEDBACK FORM - Submit to Google Forms =====
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackMsg = document.getElementById('feedbackMsg');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nama = (document.getElementById('inputNama') || {}).value || '';
      const feedbackText = (document.getElementById('inputFeedback') || {}).value || '';
      const rating = inputRating ? inputRating.value : '';

      if (!feedbackText.trim()) {
        feedbackMsg.textContent = 'Mohon isi feedback Anda sebelum mengirim.';
        feedbackMsg.className = 'feedback-msg error';
        feedbackMsg.style.display = 'block';
        return;
      }

      const FORM_ID = '1FAIpQLScfFmTcvsQ5eGOmqrzv0tFMzYNc5Nn3iqA9VtOnQ0dNqSF1eA';
      const ENTRY_NAMA = 'entry.1452510871';
      const ENTRY_RATING = 'entry.371006999';
      const ENTRY_FEEDBACK = 'entry.1193197312';

      const params = new URLSearchParams();
      if (nama.trim()) params.set(ENTRY_NAMA, nama.trim());
      if (rating) params.set(ENTRY_RATING, rating);
      params.set(ENTRY_FEEDBACK, feedbackText.trim());

      const formAction = 'https://docs.google.com/forms/d/e/' + FORM_ID + '/formResponse';

      let iframe = document.getElementById('hiddenFormTarget');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hiddenFormTarget';
        iframe.name = 'hiddenFormTarget';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      const tempForm = document.createElement('form');
      tempForm.method = 'POST';
      tempForm.action = formAction;
      tempForm.target = 'hiddenFormTarget';
      params.forEach((val, key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = val;
        tempForm.appendChild(input);
      });
      document.body.appendChild(tempForm);
      tempForm.submit();
      document.body.removeChild(tempForm);

      feedbackMsg.textContent = 'Terima kasih! Feedback Anda telah berhasil dikirim.';
      feedbackMsg.className = 'feedback-msg success';
      feedbackMsg.style.display = 'block';
      feedbackForm.reset();
      if (inputRating) inputRating.value = '';
      stars.forEach(s => s.classList.remove('active'));
      setTimeout(() => { feedbackMsg.style.display = 'none'; }, 6000);
    });
  }

});
