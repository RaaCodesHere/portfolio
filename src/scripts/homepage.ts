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
     7. ARCHITECTURE DEEP-DIVE MODAL HANDLER
     =================================================================== */
  interface ProjectArchSpec {
    title: string;
    category: string;
    sla: string;
    latency: string;
    subtitle: string;
    systemType: string;
    flow: {
      ingest: { name: string; desc: string };
      verify: { name: string; desc: string };
      queue: { name: string; desc: string };
      dispatch: { name: string; desc: string };
    };
    specs: {
      concurrency: string;
      security: string;
      storage: string;
      rate: string;
    };
  }

  const projectSpecs: Record<string, ProjectArchSpec> = {
    'proj-01': {
      title: 'Cerberus OSINT — Threat Intelligence & Breach Surveillance Mesh',
      category: 'OSINT & THREAT INTELLIGENCE',
      sla: '99.9% UPTIME SLA',
      latency: 'P99: < 180ms Alert',
      subtitle: 'Multi-threaded reconnaissance crawler monitoring paste sites and credential leaks with automated takedown PDF dossier generation.',
      systemType: 'osint',
      flow: {
        ingest: { name: 'Paste & Darkweb Feeds', desc: 'Asynchronous event crawler scanning paste sites and leak repos.' },
        verify: { name: 'Regex & Entropy Scoring', desc: 'High-speed heuristic validation of exposed credentials and private keys.' },
        queue: { name: 'Redis Streams Queue', desc: 'Buffered threat pub/sub distributing forensic tasks across workers.' },
        dispatch: { name: 'Instant Webhook & PDF', desc: 'Sub-180ms webhook trigger with automated forensic evidence dump.' }
      },
      specs: {
        concurrency: 'Python 3.12 (asyncio + Playwright)',
        security: 'Tor SOCKS5 + Transient Sessions',
        storage: 'Redis Streams & SQLite (WAL)',
        rate: 'Token Bucket (12,000 pings/min)'
      }
    },
    'proj-02': {
      title: 'Aegis Sentinel — Enterprise Community & Merchant Defense Gateway',
      category: 'HIGH-CONCURRENCY BACKEND DEFENSE',
      sla: '< 4.0s RECOVERY SLA',
      latency: 'P99: < 35ms Filter',
      subtitle: 'High-throughput security gateway with behavioral raid detection, token quarantine, and automated SQLite WAL state rollbacks.',
      systemType: 'microservices',
      flow: {
        ingest: { name: 'WebSocket Event Stream', desc: 'High-speed event ingestion with zero serialization delay.' },
        verify: { name: 'Behavioral Anomaly Heuristics', desc: 'Rolling window pattern analyzer identifying burst joins & mass bans.' },
        queue: { name: 'Token-Bucket Shield', desc: 'Capacity of 50 tokens with 25/sec refill; eliminates 429 lockouts.' },
        dispatch: { name: 'Sub-4s WAL State Rollback', desc: 'Instant permission tree restore via continuous SQLite snapshot bus.' }
      },
      specs: {
        concurrency: 'Asynchronous Event Loop (50k req/min)',
        security: 'HMAC Authentication & Ephemeral Tokens',
        storage: 'SQLite WAL Snapshots + Redis Cache',
        rate: 'Sliding Window Token Bucket'
      }
    },
    'proj-03': {
      title: 'OmniVendor Bridge — Real-Life POS & Multi-Channel Vendor Pipeline',
      category: 'RETAIL POS & INVENTORY RECONCILIATION',
      sla: '99.9% UPTIME SLA',
      latency: 'P99: < 24ms Sync',
      subtitle: 'Fault-tolerant POS webhook pipeline connecting physical Clover/Square registers with digital checkouts and atomic inventory locks.',
      systemType: 'pos',
      flow: {
        ingest: { name: 'Hardware POS Webhook', desc: 'Inbound transaction payload from physical Clover/Square store register.' },
        verify: { name: 'HMAC-SHA256 Signature', desc: 'Cryptographic header validation; zero plain token disk storage.' },
        queue: { name: 'Celery + ACID Row Lock', desc: 'Atomic database row lock prevents overselling across channels.' },
        dispatch: { name: 'Multi-Store Reconciliation', desc: 'Sub-second inventory depletion broadcast & automated Stripe receipt.' }
      },
      specs: {
        concurrency: 'FastAPI + Celery Distributed Task Pool',
        security: 'HMAC-SHA256 Signature Verification',
        storage: 'PostgreSQL with Row-Level Locks',
        rate: 'Rate-limited Celery worker concurrency'
      }
    },
    'proj-04': {
      title: 'GhostProxy Stealth Engine — Cloudflare Turnstile & DataDome Evasion',
      category: 'ANTI-DETECTION BROWSER CLUSTERS',
      sla: '0.00% BAN RATE',
      latency: 'P99: < 320ms Render',
      subtitle: 'Autonomous browser crawler framework utilizing TLS JA3/JA4 spoofing, canvas 2D noise, and residential proxy rotation.',
      systemType: 'stealth',
      flow: {
        ingest: { name: 'Target Scraping Task', desc: 'Distributed queue job defining target endpoint and extract rules.' },
        verify: { name: 'TLS JA4 & Canvas Camoufox', desc: 'Randomized browser fingerprinting evading Cloudflare and DataDome.' },
        queue: { name: 'Residential SOCKS5 Mesh', desc: 'Healthy endpoint selector prioritizing latency under 35ms.' },
        dispatch: { name: 'JSON Feed Ingestion', desc: 'Structured data extraction delivered directly to database queue.' }
      },
      specs: {
        concurrency: 'Playwright Headless + Camoufox Mesh',
        security: 'Residential SOCKS5 Rotation + TLS Ciphers',
        storage: 'Redis Task Queue & JSON Pipelines',
        rate: '25M+ Monthly Requests Evaluated'
      }
    },
    'proj-05': {
      title: 'Discopay Escrow & Commerce Engine — Multi-Channel Storefront',
      category: 'COMMERCE & ESCROW AUTOMATION',
      sla: '99.9% SETTLEMENT SLA',
      latency: 'P99: < 40ms Webhook',
      subtitle: 'Custom commerce gateway allowing vendors to sell physical & digital stock seamlessly with instant invoice generation and escrow.',
      systemType: 'vendor',
      flow: {
        ingest: { name: 'Customer Checkout Trigger', desc: 'Interactive order generation via storefront interface or webhook.' },
        verify: { name: 'Stripe & Crypto Settlement', desc: 'Cryptographic invoice signing and multi-sig escrow verification.' },
        queue: { name: 'Role & License Provisioner', desc: 'Automated digital license issuance and customer role grants.' },
        dispatch: { name: 'Dispute Arbitration Bus', desc: 'Automated escrow lock with ticket escalation and refund ledger.' }
      },
      specs: {
        concurrency: 'FastAPI + Asynchronous Worker Queue',
        security: 'Stripe Webhook Signatures & Encrypted Keys',
        storage: 'PostgreSQL Ledger with Audit Logs',
        rate: 'Zero-drop webhook retry architecture'
      }
    },
    'proj-06': {
      title: 'SpecterWatch — Brand Protection & Rogue Clone Surveillance',
      category: 'BRAND RECONNAISSANCE & PROTECTION',
      sla: '24/7 DOMAIN SURVEILLANCE',
      latency: 'P99: < 120s Dossier',
      subtitle: 'Automated surveillance crawler identifying typosquatted vendor domains and fake storefronts, instantly generating takedown dossiers.',
      systemType: 'osint',
      flow: {
        ingest: { name: 'Brand Domain Seed', desc: 'Monitors brand keywords across 140+ top-level domain registrars.' },
        verify: { name: 'Levenshtein & WHOIS Recon', desc: 'Typosquatting permutation scoring and registrar entity correlation.' },
        queue: { name: 'Evidence Snapshot Queue', desc: 'Automated headless browser screenshotting & DNS record archival.' },
        dispatch: { name: 'Abuse PDF Dossier Dispatch', desc: 'Automated takedown dossier generation sent directly to registrar abuse.' }
      },
      specs: {
        concurrency: 'Scrapy + Async WHOIS Resolver',
        security: 'Passive DNS Reconnaissance Only',
        storage: 'ReportLab PDF Synthesis + SQLite Cache',
        rate: '140+ TLDs Continuously Polled'
      }
    }
  };

  const archDialog = document.getElementById('architecture-dialog') as HTMLDialogElement | null;
  let currentActiveSpec: ProjectArchSpec | null = null;

  function openArchitectureModal(projectId?: string): void {
    if (!archDialog) return;
    const spec = (projectId && projectSpecs[projectId]) ? projectSpecs[projectId] : projectSpecs['proj-03'];
    currentActiveSpec = spec;

    // Populate modal DOM
    const titleEl = document.getElementById('arch-dialog-title');
    const subtitleEl = document.getElementById('arch-modal-subtitle');
    const catEl = document.getElementById('arch-modal-category');
    const slaEl = document.getElementById('arch-modal-sla');
    const latEl = document.getElementById('arch-modal-latency');

    if (titleEl) titleEl.textContent = spec.title;
    if (subtitleEl) subtitleEl.textContent = spec.subtitle;
    if (catEl) catEl.textContent = spec.category;
    if (slaEl) slaEl.textContent = spec.sla;
    if (latEl) latEl.textContent = spec.latency;

    // Flow steps
    const f1Name = document.getElementById('arch-flow-ingest');
    const f1Desc = document.getElementById('arch-flow-ingest-desc');
    const f2Name = document.getElementById('arch-flow-verify');
    const f2Desc = document.getElementById('arch-flow-verify-desc');
    const f3Name = document.getElementById('arch-flow-queue');
    const f3Desc = document.getElementById('arch-flow-queue-desc');
    const f4Name = document.getElementById('arch-flow-dispatch');
    const f4Desc = document.getElementById('arch-flow-dispatch-desc');

    if (f1Name) f1Name.textContent = spec.flow.ingest.name;
    if (f1Desc) f1Desc.textContent = spec.flow.ingest.desc;
    if (f2Name) f2Name.textContent = spec.flow.verify.name;
    if (f2Desc) f2Desc.textContent = spec.flow.verify.desc;
    if (f3Name) f3Name.textContent = spec.flow.queue.name;
    if (f3Desc) f3Desc.textContent = spec.flow.queue.desc;
    if (f4Name) f4Name.textContent = spec.flow.dispatch.name;
    if (f4Desc) f4Desc.textContent = spec.flow.dispatch.desc;

    // Specs grid
    const spConc = document.getElementById('arch-spec-concurrency');
    const spSec = document.getElementById('arch-spec-security');
    const spStor = document.getElementById('arch-spec-storage');
    const spRate = document.getElementById('arch-spec-rate');

    if (spConc) spConc.textContent = spec.specs.concurrency;
    if (spSec) spSec.textContent = spec.specs.security;
    if (spStor) spStor.textContent = spec.specs.storage;
    if (spRate) spRate.textContent = spec.specs.rate;

    // Reset copy button label
    const copyLabel = document.getElementById('copy-arch-label');
    if (copyLabel) copyLabel.textContent = 'Copy Technical Brief';

    archDialog.showModal();
  }

  // Bind all Discuss Architecture triggers
  document.querySelectorAll('.btn-trigger-architecture, .btn-project-architecture').forEach((btn) => {
    btn.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const projId = (btn as HTMLElement).getAttribute('data-project-id') || undefined;
      openArchitectureModal(projId);
    });
  });

  // Close Architecture Modal
  const btnCloseArch = document.getElementById('btn-close-arch');
  const btnCloseArchDot = document.getElementById('btn-close-arch-dot');
  [btnCloseArch, btnCloseArchDot].forEach((el) => {
    el?.addEventListener('click', () => archDialog?.close());
  });

  // Light dismiss on backdrop click
  archDialog?.addEventListener('click', (e: MouseEvent) => {
    if (e.target === archDialog) {
      archDialog.close();
    }
  });

  // "Inquire About This Architecture" inside modal
  const btnInquireWithSpec = document.getElementById('btn-inquire-with-spec');
  btnInquireWithSpec?.addEventListener('click', () => {
    if (!currentActiveSpec) return;
    archDialog?.close();

    // Attach to contact section
    const banner = document.getElementById('arch-context-banner');
    const bannerName = document.getElementById('arch-context-name');
    if (banner && bannerName) {
      bannerName.textContent = currentActiveSpec.title;
      banner.style.display = 'flex';
    }

    // Set chip
    const typeChips = document.querySelectorAll('.type-chip');
    typeChips.forEach((chip) => {
      const isMatch = chip.getAttribute('data-type') === currentActiveSpec?.systemType;
      chip.classList.toggle('is-active', isMatch);
    });
    const hiddenType = document.getElementById('form-system-type') as HTMLInputElement | null;
    if (hiddenType && currentActiveSpec) {
      hiddenType.value = currentActiveSpec.systemType;
    }

    // Pre-populate message
    const msgInput = document.getElementById('form-message') as HTMLTextAreaElement | null;
    if (msgInput) {
      msgInput.value = `Hi Samyog,\n\nI would like to consult on the architecture and implementation of "${currentActiveSpec.title}".\n\nSpecific requirements:\n- Target Concurrency / Throughput:\n- Integration Scope (APIs / Webhooks / POS):\n- Deployment Timeline:\n\nLooking forward to discussing the technical specification!`;
    }

    // Smooth scroll to contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elPos = contactSection.getBoundingClientRect().top;
      const targetPos = elPos + window.scrollY - headerOffset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });

      // Focus message field
      setTimeout(() => {
        msgInput?.focus();
      }, 600);
    }
  });

  // "Copy Technical Brief" inside modal
  const btnCopyArchSpec = document.getElementById('btn-copy-arch-spec');
  btnCopyArchSpec?.addEventListener('click', async () => {
    if (!currentActiveSpec) return;
    const briefText = `[RaaSki Architecture Spec] ${currentActiveSpec.title}
Category: ${currentActiveSpec.category}
SLA Guarantee: ${currentActiveSpec.sla} | ${currentActiveSpec.latency}
Pipeline Flow:
1. ${currentActiveSpec.flow.ingest.name} — ${currentActiveSpec.flow.ingest.desc}
2. ${currentActiveSpec.flow.verify.name} — ${currentActiveSpec.flow.verify.desc}
3. ${currentActiveSpec.flow.queue.name} — ${currentActiveSpec.flow.queue.desc}
4. ${currentActiveSpec.flow.dispatch.name} — ${currentActiveSpec.flow.dispatch.desc}
Engineering Metrics:
- Concurrency: ${currentActiveSpec.specs.concurrency}
- Security: ${currentActiveSpec.specs.security}
- Storage: ${currentActiveSpec.specs.storage}
- Burst Protection: ${currentActiveSpec.specs.rate}
Consultation Inquiry: contact@codewithraa.me`;

    try {
      await navigator.clipboard.writeText(briefText);
      const copyLabel = document.getElementById('copy-arch-label');
      if (copyLabel) {
        copyLabel.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          copyLabel.textContent = 'Copy Technical Brief';
        }, 2200);
      }
    } catch {
      // Fallback
    }
  });

  /* ===================================================================
     8. QUICK CONNECT MODAL HANDLER
     =================================================================== */
  const quickConnectDialog = document.getElementById('quick-connect-dialog') as HTMLDialogElement | null;

  document.querySelectorAll('.btn-trigger-quick-connect').forEach((btn) => {
    btn.addEventListener('click', (e: Event) => {
      e.preventDefault();
      quickConnectDialog?.showModal();
    });
  });

  const btnCloseConnect = document.getElementById('btn-close-connect');
  const btnCloseConnectDot = document.getElementById('btn-close-connect-dot');
  [btnCloseConnect, btnCloseConnectDot].forEach((el) => {
    el?.addEventListener('click', () => quickConnectDialog?.close());
  });

  quickConnectDialog?.addEventListener('click', (e: MouseEvent) => {
    if (e.target === quickConnectDialog) {
      quickConnectDialog.close();
    }
  });

  // Quick Copy Email
  const btnQuickCopyEmail = document.getElementById('btn-quick-copy-email');
  btnQuickCopyEmail?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('contact@codewithraa.me');
      const label = document.getElementById('label-copy-email');
      if (label) {
        label.textContent = 'Copied!';
        setTimeout(() => { label.textContent = 'Copy Email'; }, 2000);
      }
    } catch {}
  });

  // Quick Copy Discord
  const btnQuickCopyDiscord = document.getElementById('btn-quick-copy-discord');
  btnQuickCopyDiscord?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('RaaSki');
      const label = document.getElementById('label-copy-discord');
      if (label) {
        label.textContent = 'Copied!';
        setTimeout(() => { label.textContent = 'Copy Handle'; }, 2000);
      }
    } catch {}
  });

  // Jump to form from Quick Connect
  const btnJumpToForm = document.getElementById('btn-jump-to-form');
  btnJumpToForm?.addEventListener('click', () => {
    quickConnectDialog?.close();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elPos = contactSection.getBoundingClientRect().top;
      window.scrollTo({ top: elPos + window.scrollY - headerOffset, behavior: 'smooth' });
    }
  });

  /* ===================================================================
     9. INTERACTIVE CONTACT FORM WITH CLASSIFICATION CHIPS
     =================================================================== */
  // Type chips
  const typeChips = document.querySelectorAll('.type-chip');
  const hiddenTypeInput = document.getElementById('form-system-type') as HTMLInputElement | null;
  typeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      typeChips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const typeVal = chip.getAttribute('data-type') || 'microservices';
      if (hiddenTypeInput) hiddenTypeInput.value = typeVal;
    });
  });

  // Timeline chips
  const timelineChips = document.querySelectorAll('.timeline-chip');
  const hiddenTimelineInput = document.getElementById('form-timeline') as HTMLInputElement | null;
  timelineChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      timelineChips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const timelineVal = chip.getAttribute('data-timeline') || 'urgent';
      if (hiddenTimelineInput) hiddenTimelineInput.value = timelineVal;
    });
  });

  // Clear attached arch spec button
  const btnClearArch = document.getElementById('btn-clear-arch');
  btnClearArch?.addEventListener('click', () => {
    const banner = document.getElementById('arch-context-banner');
    if (banner) banner.style.display = 'none';
    const msgInput = document.getElementById('form-message') as HTMLTextAreaElement | null;
    if (msgInput) msgInput.value = '';
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;

  if (contactForm) {
    contactForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get('name') as string || '').trim();
      const email = (formData.get('email') as string || '').trim();
      const discord = (formData.get('discord_handle') as string || '').trim();
      const message = (formData.get('message') as string || '').trim();
      const systemType = (formData.get('system_type') as string || 'microservices').toUpperCase();
      const timeline = (formData.get('timeline') as string || 'urgent').toUpperCase();

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
          <span>Dispatching Consultation...</span>
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
            statusNote.textContent = 'Consultation inquiry dispatched! Launching mail client draft...';
            statusNote.classList.remove('text-error');
            statusNote.classList.add('text-success');
          }

          // Trigger mailto with prefilled details
          const mailSubject = encodeURIComponent(`[${systemType} / ${timeline}] Consultation — ${name}`);
          const discordLine = discord ? `Discord / Org: ${discord}\n` : '';
          const mailBody = encodeURIComponent(`Hi Samyog,\n\nName: ${name}\nEmail: ${email}\n${discordLine}System Classification: ${systemType}\nEngagement Timeline: ${timeline}\n\nProject Scope & Requirements:\n${message}\n\nLooking forward to your architectural assessment!`);
          window.location.href = `mailto:contact@codewithraa.me?subject=${mailSubject}&body=${mailBody}`;

          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn--success');
            contactForm.reset();
            const banner = document.getElementById('arch-context-banner');
            if (banner) banner.style.display = 'none';
            if (statusNote) {
              statusNote.textContent = 'Guaranteed response within 4 hours. Direct technical triage from Kathmandu, Nepal.';
              statusNote.classList.remove('text-success');
            }
          }, 4500);
        }, 800);
      }
    });
  }

  /* ===================================================================
     10. SMOOTH SCROLL FOR ANCHOR LINKS
     =================================================================== */
  document.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e: Event) => {
      const rawHref = (anchor as HTMLAnchorElement).getAttribute('href');
      if (!rawHref) return;

      const hashIndex = rawHref.indexOf('#');
      if (hashIndex === -1) return;

      const targetId = rawHref.slice(hashIndex);
      if (!targetId || targetId === '#') return;

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
