const contentData = {
  "profile": {
    "name": "Rabbi Hasan",
    "email": "mdrabbihasan610@gmail.com",
    "github": "https://github.com/Rabbihasan610",
    "linkedin": "https://www.linkedin.com/in/md-rabbi-hasan-2229bb205"
  },
  "services": [
    {
      "icon": "fa-brands fa-laravel",
      "title": "Laravel SaaS Development",
      "description": "Multi-tenant applications, subscriptions, admin systems, queues, and maintainable domain architecture."
    },
    {
      "icon": "fa-solid fa-brain",
      "title": "AI Integration",
      "description": "OpenAI-powered agents, chat systems, automated workflows, and intelligent product features."
    },
    {
      "icon": "fa-solid fa-credit-card",
      "title": "Payment Integration",
      "description": "Secure Stripe and custom gateway integrations with verified webhooks and transaction tracking."
    },
    {
      "icon": "fa-solid fa-chart-line",
      "title": "High-Traffic Systems",
      "description": "Efficient database design, Redis caching, queues, profiling, and resilient backend patterns."
    },
    {
      "icon": "fa-solid fa-server",
      "title": "VPS / Nginx Optimization",
      "description": "Reliable Linux deployments, Nginx configuration, SSL, process management, and monitoring."
    },
    {
      "icon": "fa-solid fa-code-branch",
      "title": "REST API Development",
      "description": "Secure, documented, versioned APIs designed for mobile apps, SPAs, and third-party platforms."
    }
  ],
  "projects": [
    {
      "title": "Enterprise Gaming Platform",
      "type": "High-traffic platform",
      "category": "Laravel",
      "icon": "fa-solid fa-gamepad",
      "problem": "Synchronizing wallet data and provider callbacks under heavy transaction load.",
      "solution": "Built resilient API flows, Redis-backed processing, detailed callback logs, and turnover calculations.",
      "result": "Faster transactions, clear traceability, and a backend ready for sustained traffic.",
      "stack": [
        "Laravel",
        "MySQL",
        "Redis",
        "Nginx"
      ],
      "featured": true
    },
    {
      "title": "Payment Gateway System",
      "type": "Fintech infrastructure",
      "category": "Payment",
      "icon": "fa-solid fa-wallet",
      "problem": "Securely handling multiple payment states and callbacks.",
      "solution": "Verified webhooks, idempotent callbacks, and auditable transaction history.",
      "result": "Reliable checkout flow with fewer payment reconciliation issues.",
      "stack": [
        "Laravel",
        "Stripe",
        "ZapPay",
        "Webhooks"
      ]
    },
    {
      "title": "AI SaaS Platform",
      "type": "Intelligent SaaS",
      "category": "AI",
      "icon": "fa-solid fa-wand-magic-sparkles",
      "problem": "Creating useful AI workflows inside a paid SaaS experience.",
      "solution": "Agent workflows, contextual chat, subscriptions, and an operational dashboard.",
      "result": "A monetizable AI product with a clean path to new features.",
      "stack": [
        "Laravel",
        "React",
        "OpenAI API"
      ]
    },
    {
      "title": "ERP / Admin System",
      "type": "Business operations",
      "category": "Laravel",
      "icon": "fa-solid fa-chart-pie",
      "problem": "Fragmented operations, reports, and permission management.",
      "solution": "Role-based access, analytics, structured reports, and PDF/Excel exports.",
      "result": "Centralized workflows and quicker day-to-day decision making.",
      "stack": [
        "Laravel",
        "MySQL",
        "Tailwind"
      ]
    },
    {
      "title": "API-Heavy Platform",
      "type": "Integration platform",
      "category": "API",
      "icon": "fa-solid fa-network-wired",
      "problem": "Slow and fragile dependencies across third-party services.",
      "solution": "Caching, queued jobs, graceful failure handling, and service boundaries.",
      "result": "Lower latency and a more resilient integration architecture.",
      "stack": [
        "REST API",
        "MySQL",
        "Redis",
        "Queues"
      ]
    }
  ]
};