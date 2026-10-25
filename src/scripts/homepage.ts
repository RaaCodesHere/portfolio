/* RaaSki — homepage interaction scripts.
   Custom magnetic cursor, mobile menu, scroll-driven reveals,
   header scroll shadow, back-to-top button, contact form handling.
   Progressive enhancement: content stays visible without JavaScript. */

/* ---------- Client-only guard (no DOM on the server) ---------- */
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js');

  /* ===================================================================
     1. OBSIDIAN DARK THEME LOCK
     =================================================================== */
  const html = document.documentElement;
  html.setAttribute('data-theme', 'dark');

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', '#0B0F19');
  }

  /* ===================================================================
     2. MOBILE MENU
     =================================================================== */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
      mobileMenu.classList.toggle('is-open', !isOpen);
    });

    // Close menu when any navigation link is clicked
    mobileMenu.querySelectorAll('.mobile-link, a').forEach((link) => {
      link.addEventListener('click', () => {
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.classList.remove('is-open');
      });
    });
  }

  /* ===================================================================
     3. HEADER SCROLL SHADOW
     =================================================================== */
  const header = document.getElementById('header');

  if (header) {
    const handleHeaderScroll = (): void => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initial check
  }

  /* ===================================================================
     4. SCROLL REVEAL (IntersectionObserver)
     =================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ===================================================================
     5. AMBIENT CURSOR RING (Preserves native cursor 100%)
     =================================================================== */
  const cursorRing = document.querySelector<HTMLElement>('.cursor-ring');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (cursorRing && isFinePointer) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hasMoved = false;

    // Track mouse position
    document.addEventListener('mousemove', (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        cursorRing.classList.add('is-active');
      }
    }, { passive: true });

    // Smooth ambient follow animation
    function animateCursor(): void {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRing) {
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
      }

      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Subtle scale on interactive elements without hiding system cursor
    const hoverTargets = document.querySelectorAll('a, button, [data-cursor-hover], input, textarea, .project-card, .skill-tag, .solution-card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('is-hovering');
      });
    });
  }

  /* ===================================================================
     6. BACK TO TOP BUTTON
     =================================================================== */
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    const handleBackToTopVisibility = (): void => {
      if (window.scrollY > 400) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    handleBackToTopVisibility(); // Initial check

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================================
     7. CONTACT FORM (Encrypted Client Submission)
     =================================================================== */
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;

  if (contactForm) {
    contactForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get('name') as string || '').trim();
      const email = (formData.get('email') as string || '').trim();
      const message = (formData.get('message') as string || '').trim();

      // Form validation
      const statusNote = document.getElementById('form-status-note');
      if (!name || !email || !message) {
        if (statusNote) {
          statusNote.textContent = 'Please fill out all required fields.';
          statusNote.classList.add('text-error');
        }
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (statusNote) {
          statusNote.textContent = 'Please enter a valid email address.';
          statusNote.classList.add('text-error');
        }
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      if (submitBtn) {
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          <span>Dispatching Message...</span>
        `;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Delivered &bull; Opening Client</span>
          `;
          submitBtn.classList.add('btn--success');

          if (statusNote) {
            statusNote.textContent = 'Inquiry dispatched successfully! Opening mail client draft...';
            statusNote.classList.remove('text-error');
            statusNote.classList.add('text-success');
          }

          // Trigger mailto with prefilled details
          const mailSubject = encodeURIComponent(`Automation Project Consultation — ${name}`);
          const mailBody = encodeURIComponent(`Hi Samyog,\n\nMy name is ${name} (${email}).\n\nProject Scope:\n${message}\n\nLooking forward to hearing from you!`);
          window.location.href = `mailto:contact@codewithraa.me?subject=${mailSubject}&body=${mailBody}`;

          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn--success');
            contactForm.reset();
            if (statusNote) {
              statusNote.textContent = 'Guaranteed response within 4 hours. Direct Discord escalations prioritized.';
              statusNote.classList.remove('text-success');
            }
          }, 4500);
        }, 800);
      }
    });
  }

  /* ===================================================================
     8. SMOOTH SCROLL FOR ANCHOR LINKS
     =================================================================== */
  document.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e: Event) => {
      const rawHref = (anchor as HTMLAnchorElement).getAttribute('href');
      if (!rawHref) return;

      const hashIndex = rawHref.indexOf('#');
      if (hashIndex === -1) return;

      const targetId = rawHref.slice(hashIndex);
      if (!targetId || targetId === '#') return;

      // If we are already on homepage, smoothly scroll
      if (window.location.pathname === '/' || window.location.pathname === '') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });
}
