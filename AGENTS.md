# RaaSki — Implementation Notes

## Chosen stack
- **Framework:** Astro (v5), static site output (`astro build` → `dist/`)
- **Language:** TypeScript with strict typing (`tsconfig.json` extends `astro/tsconfigs/strict`)
- **Styling:** Component-scoped `<style>` blocks + modular CSS custom property token system
  - `src/styles/tokens.css` — shared tokens (colors, gradients, typography scale, spacing, elevation shadows, motion timings)
  - `src/styles/global.css` — modern reset, custom magnetic cursor styles, scrollbar styling, utility classes, and prefers-reduced-motion overrides
- **Fonts:** Google Fonts CDN: Plus Jakarta Sans (primary body and headings) + JetBrains Mono (monospace labels, code card, and tags)
- **Dependencies:** Lightweight zero-bloat setup (`astro`, `@astrojs/check`, `typescript`). No unnecessary runtime UI libraries or heavyweight CSS frameworks.
- **Client scripts:** `src/scripts/homepage.ts` — vanilla TypeScript for custom magnetic cursor (dot + expanding ring), mobile navigation drawer, header scroll shadow, `IntersectionObserver` scroll reveals, floating label forms, and back-to-top smooth scrolling.

## Design direction & Theme
Modern, minimal, and highly professional personal portfolio tailored for **Python Development, Discord Bot Automation, Vendor POS Systems & OSINT Reconnaissance**:
- **Obsidian Dark Mode (Locked):** Pure obsidian background (`#0B0F19`), elevated card surfaces (`#131B2E`), subtle borders (`rgba(255,255,255,0.08)`), high-contrast text (`#F8FAFC` and `#94A3B8`), and vibrant accent gradients: **Electric Cyan (`#06B6D4`)**, **Radiant Emerald (`#10B981`)**, and **Electric Blue (`#3B82F6`)**. Light mode toggling removed completely.
- **Brand Identity & Favicon:** Animated cyber monogram icon beside "RaaSki" in the header with continuous breathing glow, pulse rings, and orbiting beacon. Custom SVG favicon at `public/favicon.svg` matching the brand aesthetic.
- **Fixed Header Geometry:** Fixed header overlap bug by declaring `--header-height: 84px`, setting explicit top padding in the Hero, and adding `scroll-margin-top` to all section anchors.
- **De-slopified Human-Crafted Aesthetic:** Removed generic AI tropes (chaotic particle loops, fake crypto telemetry tickers, and uncanny AI generated portraits).
- **Aesthetic Coder Cat Avatar:** Developer profile card in About section features an aesthetic dark-mode coder cat avatar with headphones and neon reflections (`/images/cat-avatar.jpg`), verified Kathmandu Nepal (UTC +5:45) location badge, real credentials, and direct links.
- **Elevated Technical Capability Cards:** Transformed loose skill tags into 3 structured glassmorphic capability cards with category icons, tool counters, and micro-dot chips.
- **Grounded Nepal Client Social Proof:** Realistic metrics tailored for 5 years of Python development: **172+ Automations Delivered**, **$65K+ Client Commercial Flow**, **120+ Discord Communities Assisted**, and **99.9% Production Reliability**.
- **Hero Architecture:** Exact requested badge, headline, and subtitle with smooth staggered text reveal animations, animated SVG constellation network background with flowing light beams, and switchable multi-tab Python 3.12 architecture card (`discord_sentinel.py`, `pos_inventory_bridge.py`, `stealth_session.py`) with clipboard copy.
- **Strain-Free Projects Showcase:** 6 robust projects (Cerberus OSINT, Aegis Discord Sentinel, OmniVendor Bridge, GhostProxy Stealth Engine, Discopay Escrow, SpecterWatch Brand Protection) with clean syntax-highlighted code previews, verified GitHub links, and architectural discussion links.
- **Production SLAs & Engagement Lifecycle (Vendor Section):** Replaced the clunky interactive flow diagram with an authoritative 4-pillar SLA matrix (Zero-Token Storage & HMAC Verification, 50k+ req/min Token Bucket Limiter, Atomic Multi-Channel Row Locks, <4s Rollback) and a structured 4-stage client delivery roadmap.
- **Cluster Status & Node Map (`/status`):** Dedicated live status dashboard and distributed node matrix across 8 regions with interactive ping latency probes.
- **Verified Contact Details:**
  - GitHub: `https://github.com/RaaCodesHere`
  - LinkedIn: `https://www.linkedin.com/in/samyog-dhakal/`
  - Discord: `https://discord.com/users/1105760622462914623`
  - Email: `contact@codewithraa.me`
  - Telegram completely removed across all pages, components, and compliance policies.
- **Admin Panel:** Completely decommissioned and deleted.
