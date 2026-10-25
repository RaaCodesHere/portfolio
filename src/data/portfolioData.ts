/* RaaSki — centralized portfolio data store.
   Tailored for Python Development, Bot Automation, Discord Infrastructure,
   Vendor Integrations, and OSINT Reconnaissance. */

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  filterCategory: 'osint' | 'backend' | 'vendor' | 'scraping';
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  previewGradient: string;
  draft: boolean;
}

export interface HeroStat {
  number: string;
  label: string;
}

export interface PortfolioData {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleAccent: string;
    subtitle: string;
    stats: HeroStat[];
    codeFilename: string;
    codeSnippet: string;
    liveLog: string;
  };
  about: {
    sectionTitle: string;
    sectionSubtitle: string;
    bioParagraphs: string[];
    skillCategories: SkillCategory[];
  };
  projects: ProjectItem[];
  contact: {
    email: string;
    location: string;
    socials: {
      github: string;
      linkedin: string;
      discord: string;
    };
  };
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    badge: 'SENIOR PYTHON BACKEND ARCHITECT & AUTOMATION SPECIALIST',
    titleLine1: 'High-Throughput Microservices,',
    titleLine2: 'vendor POS bridges &',
    titleAccent: 'Autonomous Pipelines',
    subtitle:
      '5+ years architecting fault-tolerant Python backends, retail POS integration bridges, stealth data extraction clusters, and high-concurrency automation systems with 99.9% uptime.',
    stats: [
      { number: '172+', label: 'Deployments & Automations' },
      { number: '5+ Yrs', label: 'Python Systems Architecture' },
      { number: '45M+', label: 'Monthly Processed Events' },
      { number: '99.9%', label: 'Production SLA' },
    ],
    codeFilename: 'pos_inventory_bridge.py',
    codeSnippet: `import hmac, hashlib
from fastapi import FastAPI, Header, HTTPException
from core.queues import celery_app
from core.database import atomic_inventory_lock

app = FastAPI(title="OmniVendor POS Gateway", version="3.2.0")

@app.post("/webhooks/clover-sync")
async def sync_pos_transaction(payload: dict, x_signature: str = Header()):
    # Cryptographic HMAC verification from physical store register
    expected = hmac.new(SECRET_KEY, str(payload).encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, x_signature):
        raise HTTPException(status_code=401, detail="Invalid HMAC signature")

    # Atomic multi-channel stock lock across physical and digital storefronts
    async with atomic_inventory_lock(payload["sku"]):
        task = celery_app.send_task("reconcile_stock", args=[payload["sku"], -1])
        return {"status": "ENQUEUED", "task_id": task.id, "latency_ms": 14}`,
    liveLog: 'FastAPI Gateway nominal | Celery queue active | P99 Latency: 22ms',
  },
  about: {
    sectionTitle: 'Python Systems Architect & Automation Specialist',
    sectionSubtitle:
      '5+ years architecting resilient Python backends, high-throughput commercial vendor bridges, and autonomous intelligence systems.',
    bioParagraphs: [
      "I am Samyog Dhakal (RaaSki), a Python systems developer based in Kathmandu, Nepal, with over 5 years of focused engineering experience in asynchronous backend architecture, commercial retail integrations, and distributed automation pipelines.",
      "Over the past half-decade, I have architected and deployed over 172 robust systems for clients across e-commerce, commercial retail, cybersecurity, and community infrastructure. My work centers on high-throughput microservices, sub-second POS inventory synchronization between physical store registers and online channels, and anti-abuse security engines.",
      "I take pride in writing fault-tolerant, clean Python code that operates 24/7 without intervention—handling concurrency spikes, HMAC signature validations, and distributed task retries quietly in the background.",
    ],
    skillCategories: [
      {
        id: 'cat-backend-infra',
        name: 'Python Backends & Microservices',
        skills: [
          'Python 3.12+ (asyncio)',
          'FastAPI & Async WebSockets',
          'Redis Streams & Pub/Sub',
          'Celery Task Queues',
          'PostgreSQL & SQLite (WAL)',
          'HMAC Cryptographic Signing',
          'Docker & Systemd Daemons',
          'Token Bucket Rate Limiters',
        ],
      },
      {
        id: 'cat-vendor-pos',
        name: 'Vendor POS & Retail Commerce',
        skills: [
          'POS Ingestion (Square, Clover)',
          'Multi-Store Inventory Locks',
          'Shopify / WooCommerce Webhooks',
          'Automated Invoicing & Stripe',
          'Crypto Escrow Gateways',
          'Sub-Second Stock Depletion',
          'Discord & Slack Webhooks',
          'PDF Statement Generation',
        ],
      },
      {
        id: 'cat-osint-stealth',
        name: 'OSINT Intelligence & Stealth Scraping',
        skills: [
          'Playwright & Camoufox',
          'TLS JA3 / JA4 Spoofing',
          'Cloudflare Turnstile & DataDome',
          'Canvas 2D / WebGL Noise',
          'Dark-Web & Breach Crawlers',
          'Passive DNS Entity Resolution',
          'Residential SOCKS5 Proxy Pools',
          'Automated Abuse Takedowns',
        ],
      },
    ],
  },
  projects: [
    {
      id: 'proj-01',
      title: 'Cerberus OSINT — Threat Intelligence & Breach Surveillance Mesh',
      category: 'OSINT, Threat Reconnaissance & Dark-Web Intel',
      filterCategory: 'osint',
      description:
        'Multi-threaded reconnaissance crawler indexing paste sites, credential breaches, and unauthorized vendor impersonations across web networks. Alerts within 180ms of leak discovery with automated forensic reporting.',
      tags: ['Python 3.12', 'asyncio', 'Playwright Headless', 'Redis Streams', 'OSINT Recon', 'Webhook Alerts'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
      draft: false,
    },
    {
      id: 'proj-02',
      title: 'Aegis Sentinel — Enterprise Community & Merchant Defense Gateway',
      category: 'High-Concurrency Backend & Anti-Raid Defense',
      filterCategory: 'backend',
      description:
        'Fault-tolerant security gateway engineered for 100k+ member platforms and merchant infrastructure. Features behavioral heuristics for raid interception, instant token quarantine, and automated member rollback (1,000+ member recovery in 4s).',
      tags: ['Python', 'Async Event Loop', 'Redis Pub/Sub', 'Anomaly Heuristics', 'SQLite WAL', 'HMAC Verification'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #0284C7 100%)',
      draft: false,
    },
    {
      id: 'proj-03',
      title: 'OmniVendor Bridge — Real-Life POS & Multi-Channel Vendor Pipeline',
      category: 'Retail POS Automation & Inventory Reconciliation',
      filterCategory: 'vendor',
      description:
        'High-throughput vendor integration pipeline connecting physical brick-and-mortar POS hardware (Square/Clover) with Shopify, multi-channel marketplaces, and automated Stripe/crypto settlement webhooks with sub-second stock depletion alerts.',
      tags: ['Python', 'FastAPI', 'POS Webhook Bridge', 'Celery', 'Stripe API', 'PDF Invoicing'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
      draft: false,
    },
    {
      id: 'proj-04',
      title: 'GhostProxy Stealth Engine — Cloudflare Turnstile & DataDome Evasion',
      category: 'Anti-Detection Browser Clusters & High-Volume Scraping',
      filterCategory: 'scraping',
      description:
        'Autonomous browser crawler framework utilizing fingerprint spoofing (TLS JA3/JA4, Canvas 2D noise, WebGL uniform spoofing) with Celery distributed async queues processing 25M+ requests monthly with 0 bans.',
      tags: ['Python', 'Playwright', 'Camoufox', 'TLS JA3/JA4', 'Residential SOCKS5', 'Anti-Detect'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #581C87 0%, #6B21A8 50%, #7E22CE 100%)',
      draft: false,
    },
    {
      id: 'proj-05',
      title: 'Discopay Escrow & Commerce Engine — Multi-Channel Storefront Automation',
      category: 'Automated Escrow & Commerce Workflows',
      filterCategory: 'vendor',
      description:
        'Custom commerce gateway allowing vendors to sell physical & digital stock seamlessly with instant invoice generation, role provisioning, payment escrow, and dispute arbitration ticketing.',
      tags: ['Python', 'FastAPI', 'Stripe Webhooks', 'Crypto Escrow', 'PostgreSQL', 'Ticket Dispatcher'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #831843 0%, #9D174D 50%, #BE185D 100%)',
      draft: false,
    },
    {
      id: 'proj-06',
      title: 'SpecterWatch — Brand Protection & Rogue Clone Surveillance',
      category: 'Automated Brand Protection & Reconnaissance',
      filterCategory: 'osint',
      description:
        'Automated surveillance crawler identifying typosquatted vendor domains, counterfeit listings, and fake community portals impersonating official vendors, instantly generating automated takedown dossiers.',
      tags: ['Python', 'Scrapy', 'BeautifulSoup4', 'WHOIS OSINT', 'ReportLab PDF', 'Takedown Alerts'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #475569 100%)',
      draft: false,
    },
  ],
  contact: {
    email: 'contact@codewithraa.me',
    location: 'Kathmandu, Nepal (UTC +5:45) • Worldwide Remote',
    socials: {
      github: 'https://github.com/RaaCodesHere',
      linkedin: 'https://www.linkedin.com/in/samyog-dhakal/',
      discord: 'https://discord.com/users/1105760622462914623',
    },
  },
};
