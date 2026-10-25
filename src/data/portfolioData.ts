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
  filterCategory: 'osint' | 'discord' | 'vendor' | 'scraping';
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
    badge: 'SENIOR PYTHON BOT ARCHITECT & OSINT SPECIALIST',
    titleLine1: 'Autonomous Discord bots,',
    titleLine2: 'vendor pipelines &',
    titleAccent: 'Python Swarms',
    subtitle:
      '5+ years engineering high-concurrency Discord bot frameworks, commercial vendor POS pipelines, stealth web scraping clusters, and autonomous reconnaissance swarms.',
    stats: [
      { number: '172+', label: 'Deployments & Automations' },
      { number: '5+ Yrs', label: 'Python Engineering' },
      { number: '99.9%', label: 'Production Reliability' },
      { number: 'UTC +5:45', label: 'Kathmandu, Nepal' },
    ],
    codeFilename: 'discord_sentinel.py',
    codeSnippet: `import asyncio
import discord
from discord.ext import commands
from core.defense import HeuristicEngine, RateLimiter

class DiscordSentinel(commands.Bot):
    """High-concurrency anti-raid & community security bot."""
    def __init__(self):
        intents = discord.Intents.default()
        intents.members = True
        intents.message_content = True
        super().__init__(command_prefix="/", intents=intents)
        self.heuristics = HeuristicEngine(window_seconds=3.0, threshold=12)
        self.limiter = RateLimiter(capacity=30, refill_rate=10.0)

    async def on_member_join(self, member: discord.Member):
        if not await self.heuristics.evaluate_join(member):
            await member.kick(reason="Automated anti-raid anomaly quarantine")
            return
        await self.assign_default_roles(member)

bot = DiscordSentinel()
if __name__ == "__main__":
    bot.run("DISCORD_TOKEN")`,
    liveLog: 'Connected to Gateway v10 | 120 shards nominal | Latency: 18ms',
  },
  about: {
    sectionTitle: 'Python Bot Architect & Systems Specialist',
    sectionSubtitle:
      '5+ years building production-grade Discord bot frameworks, commercial vendor POS pipelines, and automated intelligence tools.',
    bioParagraphs: [
      "I am Samyog Dhakal (RaaSki), a Python developer based in Kathmandu, Nepal, with over 5 years of focused engineering experience in asynchronous automation, Discord bot infrastructure, and commercial retail integrations.",
      "Over the past half-decade, I have designed and deployed over 172 custom bot systems and integrations for communities and business clients worldwide. My work ranges from high-concurrency Discord moderation engines protecting servers with 50,000+ members to robust POS bridges that synchronize physical store checkouts with digital inventory and Stripe billing.",
      "I take pride in writing resilient, clean Python code that operates 24/7 without babysitting—handling rate limits, webhook retries, and network hiccups quietly in the background.",
    ],
    skillCategories: [
      {
        id: 'cat-discord-vendor',
        name: 'Discord & Vendor Systems',
        skills: [
          'discord.py / Gateway v10',
          'Anti-Nuke / Anti-Raid Heuristics',
          'POS Ingestion (Square, Clover)',
          'Shopify / WooCommerce Webhooks',
          'Automated Invoicing & Stripe',
          'Token Bucket Rate Limiters',
          'Escrow & Dispute Bots',
          'Discord Slash Frameworks',
        ],
      },
      {
        id: 'cat-osint-stealth',
        name: 'OSINT & Anti-Detection Scraping',
        skills: [
          'Playwright & Camoufox',
          'TLS JA3 / JA4 Fingerprint Spoofing',
          'Cloudflare Turnstile & DataDome Evasion',
          'Canvas 2D / WebGL Noise Injection',
          'Dark-Web & Pastebin Crawlers',
          'Passive DNS & Entity Resolution',
          'Residential SOCKS5 Proxy Pools',
          'Scrapy / BeautifulSoup4',
        ],
      },
      {
        id: 'cat-backend-infra',
        name: 'Python Ecosystem & Distributed Queues',
        skills: [
          'Python 3.12+ (asyncio)',
          'FastAPI & Async WebSockets',
          'Redis Streams & Pub/Sub',
          'Celery Distributed Task Queue',
          'PostgreSQL & SQLite (WAL)',
          'Docker & Containerized Microservices',
          'HMAC Cryptographic Signing',
          'Linux Daemons & Systemd',
        ],
      },
    ],
  },
  projects: [
    {
      id: 'proj-01',
      title: 'Cerberus OSINT — Threat Intelligence & Leak Surveillance Mesh',
      category: 'OSINT, Threat Reconnaissance & Dark-Web Intel',
      filterCategory: 'osint',
      description:
        'Multi-threaded reconnaissance crawler indexing paste sites, credential breaches, and unauthorized vendor impersonations across Discord and web networks. Alerts within 180ms of leak discovery with automated forensic reporting.',
      tags: ['Python 3.12', 'asyncio', 'Playwright Headless', 'Redis Streams', 'OSINT Recon', 'Discord Webhooks'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
      draft: false,
    },
    {
      id: 'proj-02',
      title: 'Aegis Discord Sentinel — Enterprise Community & Merchant Defense',
      category: 'Discord Bot Security & Anti-Raid Automation',
      filterCategory: 'discord',
      description:
        'Military-grade security bot engineered for 100k+ member Discord servers and vendor marketplaces. Features behavioral heuristics for raid interception, instant bot token quarantine, and automated member rollback (1,000+ member recovery in 4s).',
      tags: ['Python', 'discord.py', 'Redis Pub/Sub', 'Anomaly Heuristics', 'SQLite WAL', 'HMAC Verification'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #0284C7 100%)',
      draft: false,
    },
    {
      id: 'proj-03',
      title: 'OmniVendor Bridge — Real-Life POS & Multi-Channel Vendor Pipeline',
      category: 'Retail Merchant Automation & Inventory Reconciliation',
      filterCategory: 'vendor',
      description:
        'High-throughput vendor integration pipeline connecting physical brick-and-mortar POS hardware (Square/Clover) with Shopify, Discord VIP marketplaces, and automated Stripe/crypto settlement webhooks with sub-second stock depletion alerts.',
      tags: ['Python', 'FastAPI', 'POS Webhook Bridge', 'Celery', 'Stripe API', 'PDF Invoicing'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
      draft: false,
    },
    {
      id: 'proj-04',
      title: 'GhostProxy Stealth Engine — Cloudflare Turnstile & DataDome Evasion',
      category: 'Advanced Anti-Detection & High-Volume Scraping',
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
      title: 'Discopay Escrow & Commerce Engine — Native In-Discord Storefront',
      category: 'Discord Commerce & Escrow Automation',
      filterCategory: 'discord',
      description:
        'Discord-native vendor bot allowing retail vendors to sell physical & digital stock directly within Discord with instant invoice generation, role provisioning, payment escrow, and dispute arbitration ticketing.',
      tags: ['Python', 'discord.py', 'Stripe Webhooks', 'Crypto Escrow', 'PostgreSQL', 'Ticket Dispatcher'],
      liveUrl: '/#projects',
      githubUrl: 'https://github.com/RaaCodesHere',
      previewGradient: 'linear-gradient(135deg, #831843 0%, #9D174D 50%, #BE185D 100%)',
      draft: false,
    },
    {
      id: 'proj-06',
      title: 'SpecterWatch — Vendor Brand Protection & Rogue Clone Takedown',
      category: 'Brand Protection, Anti-Phishing & OSINT',
      filterCategory: 'osint',
      description:
        'Automated surveillance crawler identifying typosquatted vendor domains, counterfeit listings, and fake Discord servers impersonating official vendors, instantly generating automated takedown dossiers.',
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
