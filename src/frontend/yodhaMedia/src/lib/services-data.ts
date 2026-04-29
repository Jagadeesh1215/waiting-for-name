// ─── Simple Service Card Data (used by homepage / services overview) ──────────

export interface ServiceCard {
  slug: string
  title: string
  shortDesc: string
  description: string
  icon: string
  color: string
  features: string[]
  process: { step: number; title: string; desc: string }[]
  benefits: string[]
  industries: string[]
}

export const serviceCards: ServiceCard[] = [
  {
    slug: 'social-media',
    title: 'Social Media',
    shortDesc: 'Build authentic connections and grow your brand across all platforms.',
    description:
      'From Instagram health tips to LinkedIn thought leadership, we craft social media strategies that position you as the go-to authority in your field.',
    icon: '📱',
    color: '#4a2d9e',
    features: [
      'Platform strategy & setup',
      'Content calendar creation',
      'Graphic & video production',
      'Community management',
      'Paid social campaigns',
      'Influencer partnerships',
    ],
    process: [
      { step: 1, title: 'Discover',  desc: 'Understand your audience and competitive landscape' },
      { step: 2, title: 'Create',    desc: 'Develop branded content that resonates' },
      { step: 3, title: 'Publish',   desc: 'Strategic posting at optimal times' },
      { step: 4, title: 'Engage',    desc: 'Active community management and growth' },
    ],
    benefits: ['Brand awareness', 'Patient trust building', 'Community growth', 'Referral traffic'],
    industries: ['Doctors', 'Wellness Brands', 'Health Tech', 'Modern Businesses'],
  },
  {
    slug: 'orm',
    title: 'Online Reputation Management',
    shortDesc: 'Own your Google presence and build unshakeable trust online.',
    description:
      'Manage your Google presence, reviews, and local visibility — making it easy for patients and customers to find and trust you.',
    icon: '⭐',
    color: '#1a6b4a',
    features: [
      'Google Business Profile optimization',
      'Review monitoring & response',
      'Local SEO & Google Maps ranking',
      'Regular Google posting',
      'Digital visiting cards',
      'Monthly ORM reports',
    ],
    process: [
      { step: 1, title: 'Audit',    desc: 'Comprehensive review of your online presence' },
      { step: 2, title: 'Optimize', desc: 'Overhaul your Google Business Profile' },
      { step: 3, title: 'Strategy', desc: 'Build a review generation system' },
      { step: 4, title: 'Monitor',  desc: 'Daily monitoring and professional responses' },
    ],
    benefits: ['Higher Google ranking', 'More walk-ins', 'Better review scores', 'Increased trust'],
    industries: ['Doctors & Clinics', 'Hospitals', 'Restaurants', 'Local Businesses'],
  },
  {
    slug: 'branding-partner',
    title: 'Branding Partner',
    shortDesc: 'Build a brand identity that commands trust and recognition.',
    description:
      'Professional print and offline branding that makes your business look credible, polished, and memorable across every touchpoint.',
    icon: '🎨',
    color: '#8B1A4A',
    features: [
      'Logo & visual identity design',
      'Brand guidelines',
      'Banners & hoardings',
      'Print collateral',
      'Canopy tents & event branding',
      'Posters & flyers',
    ],
    process: [
      { step: 1, title: 'Discovery',   desc: 'Understand your values and vision' },
      { step: 2, title: 'Concepts',    desc: 'Initial design concepts creation' },
      { step: 3, title: 'Iterations',  desc: 'Refine through feedback rounds' },
      { step: 4, title: 'Production',  desc: 'Print-ready files and delivery' },
    ],
    benefits: ['Professional credibility', 'Consistent identity', 'Higher perceived value', 'Better brand recall'],
    industries: ['New Practices', 'Rebranding', 'Hospital Groups', 'Health Startups'],
  },
  {
    slug: 'web-designing',
    title: 'Web Design & Development',
    shortDesc: 'Modern, fast websites that convert visitors into patients and leads.',
    description:
      'We design and develop modern, performance-optimized websites tailored to your brand and business goals — built to rank, built to convert.',
    icon: '💻',
    color: '#1a4a8B',
    features: [
      'Custom UI design',
      'Mobile-responsive development',
      'SEO structure built-in',
      'Blog & CMS integration',
      'Landing pages',
      'Ongoing maintenance',
    ],
    process: [
      { step: 1, title: 'Discovery',  desc: 'Define goals, audience, and requirements' },
      { step: 2, title: 'Design',     desc: 'High-fidelity mockups for review' },
      { step: 3, title: 'Build',      desc: 'Clean code, performance-optimized' },
      { step: 4, title: 'Launch',     desc: 'SSL, analytics, full configuration' },
    ],
    benefits: ['Professional credibility', 'Better Google ranking', 'More leads', 'Fast loading speeds'],
    industries: ['Doctors & Clinics', 'Hospitals', 'Businesses', 'E-commerce'],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDesc: 'Data-driven ad campaigns that deliver measurable ROI.',
    description:
      'Meta and Google ad campaigns strategically designed, launched, and optimized for maximum return on your investment.',
    icon: '📡',
    color: '#0f5a8B',
    features: [
      'Meta Ads (Facebook & Instagram)',
      'Google Ads (Search, Display, YouTube)',
      'Ad strategy & planning',
      'Creative design & copywriting',
      'Campaign optimization',
      'Transparent reporting',
    ],
    process: [
      { step: 1, title: 'Goals',     desc: 'Define KPIs and success metrics' },
      { step: 2, title: 'Research',  desc: 'Audience segmentation and targeting' },
      { step: 3, title: 'Build',     desc: 'Campaign structure with precise targeting' },
      { step: 4, title: 'Optimize',  desc: 'Continuous refinement and reporting' },
    ],
    benefits: ['Measurable ROI', 'Lower cost per lead', 'Targeted reach', 'Increased bookings'],
    industries: ['Hospitals', 'Clinics', 'E-commerce', 'Local Businesses'],
  },
  {
    slug: 'influencer-marketing',
    title: 'Influencer Marketing',
    shortDesc: 'Amplify your brand through trusted influencer partnerships.',
    description:
      'Leverage our network of verified influencers and Business Hub city pages to reach new audiences and build brand credibility.',
    icon: '🤳',
    color: '#6B1B8B',
    features: [
      'Influencer identification & vetting',
      'Campaign strategy & briefing',
      'City page & Business Hub promotions',
      'Negotiation & contracting',
      'Campaign management',
      'Performance tracking',
    ],
    process: [
      { step: 1, title: 'Brief',      desc: 'Understand goals and brand guidelines' },
      { step: 2, title: 'Research',   desc: 'Identify and vet creators' },
      { step: 3, title: 'Outreach',   desc: 'Negotiate terms and create briefs' },
      { step: 4, title: 'Track',      desc: 'Go live and track performance' },
    ],
    benefits: ['Expanded brand reach', 'Authentic recommendations', 'Higher trust signals', 'New audience segments'],
    industries: ['Healthcare', 'Beauty & Wellness', 'Restaurants', 'Local Services'],
  },
]

// ─── Full Service Page Data (used by /services/[slug]) ───────────────────────

export interface ServiceOfferItem {
  icon: string
  title: string
  description: string
  includes: string[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface BenefitItem {
  icon: string
  title: string
  description: string
}

export interface ServicePage {
  slug: string
  meta: { title: string; description: string }
  hero: {
    heading: string
    subheading: string
    categoryLabel: string
    gradientFrom: string
    gradientTo: string
    icon: string
  }
  challenge: { heading: string; problem: string; solution: string }
  whatWeOffer: { heading: string; items: ServiceOfferItem[] }
  process: { steps: ProcessStep[] }
  benefits: { heading: string; items: BenefitItem[] }
  industries: string[]
  cta: { heading: string; subtext: string }
}

export const SERVICE_PAGES: ServicePage[] = [
  // ─── 1. SOCIAL MEDIA PARTNER ──────────────────────────────────────────────
  {
    slug: 'social-media-partner',
    meta: {
      title: 'Social Media Partner | YodhaMedia',
      description:
        'End-to-end social media management — strategy, content creation, video production, and platform management for hospitals, doctors, and businesses.',
    },
    hero: {
      heading: 'Build a Powerful Social Media Presence That Drives Real Results',
      subheading:
        'End-to-end social media management — from strategy and content creation to daily management and growth.',
      categoryLabel: 'SOCIAL MEDIA MANAGEMENT',
      gradientFrom: '#4A2C9E',
      gradientTo: '#2D1B69',
      icon: '📱',
    },
    challenge: {
      heading: 'The Challenge vs Our Solution',
      problem:
        'Most businesses post inconsistently, lack a content strategy, and struggle to turn followers into customers. Without a system, social media becomes a time sink with little measurable return.',
      solution:
        'We handle everything — from creating a monthly content calendar to shooting, editing, and posting reels and carousels that engage your audience and drive real business results.',
    },
    whatWeOffer: {
      heading: 'Complete Service Suite',
      items: [
        {
          icon: '📅',
          title: 'Content Strategy & Calendar',
          description: 'A structured monthly plan aligned to your business goals.',
          includes: ['Monthly content calendar', 'Post scheduling', 'Trend research & hashtag strategy'],
        },
        {
          icon: '✍️',
          title: 'Script Writing & Direction',
          description: 'Compelling scripts crafted for maximum reach and engagement.',
          includes: ['Reel & story scripts', 'Educational content direction', 'Brand voice guidelines'],
        },
        {
          icon: '🎬',
          title: 'Video Shooting & Editing',
          description: 'Professional production that showcases your brand authentically.',
          includes: ['Reel production', 'Before/after cuts', 'Patient/customer testimonials'],
        },
        {
          icon: '🎨',
          title: 'Carousel & Graphic Design',
          description: 'Scroll-stopping visuals tailored to your brand identity.',
          includes: ['Branded carousels', 'Infographics', 'Promotional graphics'],
        },
        {
          icon: '💬',
          title: 'Account Management',
          description: 'Daily platform management so you never miss an engagement opportunity.',
          includes: ['Daily posting', 'Comment & DM replies', 'Follower engagement'],
        },
        {
          icon: '📊',
          title: 'Performance Reporting',
          description: 'Data-driven insights to continuously improve your strategy.',
          includes: ['Monthly analytics review', 'Strategy refinements', 'Growth tracking'],
        },
      ],
    },
    process: {
      steps: [
        { number: '01', title: 'Strategy Workshop', description: 'Deep-dive into your brand, audience, goals, and competitive landscape.' },
        { number: '02', title: 'Content Calendar',  description: 'Build a 30-day content plan with themes, formats, and scheduling.' },
        { number: '03', title: 'Production',         description: 'Shoot, edit, and design all content assets for the month.' },
        { number: '04', title: 'Review & Approval',  description: 'You review and approve all content before it goes live.' },
        { number: '05', title: 'Publish & Manage',   description: 'We post, engage, and manage your accounts daily.' },
        { number: '06', title: 'Monthly Review',      description: 'Analyse performance data and refine the strategy for the next month.' },
      ],
    },
    benefits: {
      heading: 'What You Gain With Us',
      items: [
        { icon: '📆', title: 'Consistent Posting Schedule', description: 'Never miss a post — your presence is always active and relevant.' },
        { icon: '🎯', title: 'Brand-Aligned Content',       description: 'Every asset reflects your unique voice, aesthetic, and values.' },
        { icon: '🚀', title: 'Higher Engagement Rates',     description: 'Reels, carousels, and stories crafted for maximum interaction.' },
        { icon: '📈', title: 'More Patient & Lead Inquiries', description: 'Strategically placed CTAs that convert followers into customers.' },
        { icon: '✨', title: 'Professional Brand Image',    description: 'Polished content that builds trust and authority in your niche.' },
      ],
    },
    industries: ['Hospitals', 'Doctors & Clinics', 'Aesthetic Centers', 'Pharmacies', 'Businesses', 'Brands'],
    cta: {
      heading: 'Ready to Transform Your Social Media?',
      subtext: 'Let us build a content system that grows your brand consistently and professionally — month after month.',
    },
  },

  // ─── 2. ORM ───────────────────────────────────────────────────────────────
  {
    slug: 'orm',
    meta: {
      title: 'Online Reputation Management | YodhaMedia',
      description:
        'Manage your Google presence, reviews, and local visibility. We make it easy for patients and customers to find and trust you.',
    },
    hero: {
      heading: 'Build and Protect Your Online Reputation',
      subheading:
        'Manage your Google presence, reviews, and local visibility — making it easy for patients and customers to find and trust you.',
      categoryLabel: 'ONLINE REPUTATION MANAGEMENT',
      gradientFrom: '#1a6b4a',
      gradientTo: '#2D1B69',
      icon: '⭐',
    },
    challenge: {
      heading: 'The Challenge vs Our Solution',
      problem:
        'Negative reviews, incomplete Google Business Profiles, and poor local SEO are costing you potential patients and customers every day. Your competitors are outranking you on Google Maps.',
      solution:
        'We optimize and manage your entire online reputation — from Google Business Profile to review strategy and local SEO — so customers find and choose you first.',
    },
    whatWeOffer: {
      heading: 'Complete Service Suite',
      items: [
        {
          icon: '🗺️',
          title: 'Google Business Profile Setup & Optimization',
          description: 'A fully optimized profile that ranks higher and converts more visitors.',
          includes: ['Complete profile setup', 'Category & attribute optimization', 'Photo & services management'],
        },
        {
          icon: '⭐',
          title: 'Review Management',
          description: 'Proactively manage your online reviews for maximum trust.',
          includes: ['Review monitoring', 'Professional response templates', 'Positive review generation strategy'],
        },
        {
          icon: '🔍',
          title: 'Local SEO',
          description: 'Rank higher in your city for searches that matter most.',
          includes: ['Geo-targeted keyword strategy', 'Location page optimization', 'Google Maps ranking improvement'],
        },
        {
          icon: '📝',
          title: 'Regular Google Posting',
          description: 'Keep your profile fresh and engaging with regular updates.',
          includes: ['Service updates & offers', 'Health tips & news', 'Event announcements'],
        },
        {
          icon: '💳',
          title: 'Digital Visiting Cards',
          description: 'Professional digital business cards for easy online sharing.',
          includes: ['NFC-enabled card design', 'QR code integration', 'Contact sharing optimization'],
        },
        {
          icon: '📋',
          title: 'Monthly ORM Reports',
          description: 'Clear visibility into your reputation growth and progress.',
          includes: ['Visibility tracking', 'Review score trends', 'Local ranking improvements'],
        },
      ],
    },
    process: {
      steps: [
        { number: '01', title: 'Profile Audit',    description: 'Comprehensive review of your current online presence and reputation gaps.' },
        { number: '02', title: 'Optimization',      description: 'Complete overhaul of your Google Business Profile and local citations.' },
        { number: '03', title: 'Review Strategy',   description: 'Build a system to generate and manage positive patient reviews.' },
        { number: '04', title: 'Content Calendar',  description: 'Plan regular Google posts to keep your profile active and engaging.' },
        { number: '05', title: 'Monitor & Respond', description: 'Daily monitoring of reviews and prompt professional responses.' },
        { number: '06', title: 'Monthly Review',    description: 'Performance analysis and strategy refinement for continuous improvement.' },
      ],
    },
    benefits: {
      heading: 'What You Gain With Us',
      items: [
        { icon: '🏆', title: 'Higher Google Ranking',    description: 'Appear at the top of local searches and Google Maps results.' },
        { icon: '🏥', title: 'More Patient Walk-ins',    description: 'Increased local visibility translates directly to more footfall.' },
        { icon: '⭐', title: 'Better Review Scores',     description: 'A proactive review strategy improves your average star rating.' },
        { icon: '🤝', title: 'Increased Trust',          description: 'A well-managed online presence builds confidence in your brand.' },
        { icon: '💼', title: 'Professional Online Image', description: 'Every touchpoint reflects the quality of your services.' },
      ],
    },
    industries: ['Doctors & Clinics', 'Hospitals', 'Restaurants', 'Retail', 'Professional Services', 'Local Businesses'],
    cta: {
      heading: 'Ready to Own Your Online Reputation?',
      subtext: 'Let us build a reputation management system that keeps you at the top of local searches — and patients\' minds.',
    },
  },

  // ─── 3. BRANDING PARTNER ──────────────────────────────────────────────────
  {
    slug: 'branding-partner',
    meta: {
      title: 'Branding Partner | YodhaMedia',
      description:
        'Professional print and offline branding that makes your business look credible, polished, and memorable.',
    },
    hero: {
      heading: 'Create a Brand Identity That Stands Out',
      subheading:
        'Professional print and offline branding that makes your business look credible, polished, and memorable.',
      categoryLabel: 'BRANDING & DESIGN',
      gradientFrom: '#8B1A4A',
      gradientTo: '#2D1B69',
      icon: '🎨',
    },
    challenge: {
      heading: 'The Challenge vs Our Solution',
      problem:
        'Many businesses have inconsistent branding across print materials — different fonts, colors, and styles that make them look unprofessional and untrustworthy to potential customers.',
      solution:
        'We design and produce all your offline branding materials with a consistent identity that reflects your brand\'s quality and professionalism across every touchpoint.',
    },
    whatWeOffer: {
      heading: 'Complete Service Suite',
      items: [
        {
          icon: '🪧',
          title: 'Banners & Hoardings',
          description: 'Large-format designs that command attention and build brand visibility.',
          includes: ['Clinic & office banners', 'Outdoor advertising hoardings', 'Flex printing coordination'],
        },
        {
          icon: '⛺',
          title: 'Canopy Tents & Event Branding',
          description: 'Branded event materials that make a strong impression at any venue.',
          includes: ['Branded canopy tents', 'Event standees', 'Exhibition materials'],
        },
        {
          icon: '📄',
          title: 'Posters & Flyers',
          description: 'Eye-catching promotional materials for campaigns and awareness drives.',
          includes: ['Campaign posters', 'Awareness flyers', 'Promotional inserts'],
        },
        {
          icon: '📋',
          title: 'Print Collateral',
          description: 'Professional materials that leave a lasting impression.',
          includes: ['Letterheads & envelopes', 'Visiting cards', 'Brochures & catalogues'],
        },
        {
          icon: '📖',
          title: 'Brand Guidelines',
          description: 'A comprehensive guide ensuring brand consistency everywhere.',
          includes: ['Logo usage rules', 'Color & typography specs', 'Tone of voice guidelines'],
        },
        {
          icon: '✏️',
          title: 'Logo Design & Identity',
          description: 'Professional logo and brand identity creation from scratch.',
          includes: ['Logo concepts & iterations', 'Final file formats', 'Color palette development'],
        },
      ],
    },
    process: {
      steps: [
        { number: '01', title: 'Brand Discovery',    description: 'Understand your business values, target audience, and competitive positioning.' },
        { number: '02', title: 'Concept Development', description: 'Create initial design concepts that capture your brand essence.' },
        { number: '03', title: 'Design Iterations',   description: 'Refine concepts through feedback rounds until the design is perfect.' },
        { number: '04', title: 'Final Production',    description: 'Prepare print-ready files and coordinate production if needed.' },
        { number: '05', title: 'Delivery',            description: 'Hand over all files in multiple formats with a brand guidelines document.' },
      ],
    },
    benefits: {
      heading: 'What You Gain With Us',
      items: [
        { icon: '💼', title: 'Professional Brand Image',  description: 'Every material communicates quality, trust, and professionalism.' },
        { icon: '🎯', title: 'Consistent Visual Identity', description: 'Unified look and feel across all channels and touchpoints.' },
        { icon: '💎', title: 'Higher Perceived Value',     description: 'Premium design signals premium service quality to your audience.' },
        { icon: '🧠', title: 'Better Brand Recall',        description: 'Distinctive design makes your brand memorable and recognizable.' },
        { icon: '🤝', title: 'Trust-Building Materials',   description: 'Professionally designed collateral builds confidence in your brand.' },
      ],
    },
    industries: ['Doctors & Clinics', 'Hospitals', 'Retail', 'Event Companies', 'Professional Services', 'Restaurants'],
    cta: {
      heading: 'Ready to Build a Brand That Commands Attention?',
      subtext: 'Let us create a cohesive brand identity that makes your business look as professional as it truly is.',
    },
  },

  // ─── 4. WEB DESIGNING ─────────────────────────────────────────────────────
  {
    slug: 'web-designing',
    meta: {
      title: 'Web Design & Development | YodhaMedia',
      description:
        'Modern, fast, and responsive websites designed to build credibility, rank on Google, and turn visitors into leads and patients.',
    },
    hero: {
      heading: 'Build a Website That Converts Visitors Into Customers',
      subheading:
        'Modern, fast, and responsive websites designed to build credibility, rank on Google, and turn visitors into leads.',
      categoryLabel: 'WEB DESIGN & DEVELOPMENT',
      gradientFrom: '#1a4a8B',
      gradientTo: '#2D1B69',
      icon: '💻',
    },
    challenge: {
      heading: 'The Challenge vs Our Solution',
      problem:
        'Most professional websites look outdated, load slowly, and fail to convert visitors into actual leads or patients. A poor website actively hurts your credibility and costs you business.',
      solution:
        'We design and develop modern, performance-optimized websites tailored to your brand and business goals — built to rank, built to convert.',
    },
    whatWeOffer: {
      heading: 'Complete Service Suite',
      items: [
        {
          icon: '🖥️',
          title: 'Website Design & Development',
          description: 'Custom, mobile-responsive websites built for performance and conversion.',
          includes: ['Custom UI design', 'Mobile-responsive development', 'Performance optimization'],
        },
        {
          icon: '🎯',
          title: 'UI/UX Design',
          description: 'User-centered design focused on clarity, trust, and conversion.',
          includes: ['User flow mapping', 'Wireframes & prototypes', 'Conversion rate optimization'],
        },
        {
          icon: '✍️',
          title: 'Blog Integration',
          description: 'SEO-ready blog setup for content marketing and patient education.',
          includes: ['Blog CMS setup', 'Category & tag structure', 'SEO-optimized templates'],
        },
        {
          icon: '🔍',
          title: 'SEO Structure',
          description: 'Technical foundation for strong Google rankings from day one.',
          includes: ['Meta tags & schema markup', 'Sitemap & robots.txt', 'Core Web Vitals optimization'],
        },
        {
          icon: '🔧',
          title: 'Maintenance & Updates',
          description: 'Ongoing support to keep your site secure, fast, and current.',
          includes: ['Security patches', 'Content updates', 'Performance monitoring'],
        },
        {
          icon: '📄',
          title: 'Landing Pages',
          description: 'Targeted pages for specific campaigns and services.',
          includes: ['Campaign landing pages', 'A/B test variants', 'Lead capture forms'],
        },
      ],
    },
    process: {
      steps: [
        { number: '01', title: 'Discovery & Planning', description: 'Understand your business goals, audience, and technical requirements.' },
        { number: '02', title: 'Design Mockups',        description: 'Create high-fidelity visual designs for your review and approval.' },
        { number: '03', title: 'Development',           description: 'Build your website with clean code, optimized performance, and SEO structure.' },
        { number: '04', title: 'Testing',               description: 'Thorough cross-browser and device testing before launch.' },
        { number: '05', title: 'Launch',                description: 'Go live with domain setup, SSL, analytics, and all configurations.' },
        { number: '06', title: 'Maintenance',           description: 'Ongoing updates, support, and optimization post-launch.' },
      ],
    },
    benefits: {
      heading: 'What You Gain With Us',
      items: [
        { icon: '🏅', title: 'Professional Credibility',     description: 'A modern website that instantly builds trust with every visitor.' },
        { icon: '🔍', title: 'Better Google Ranking',        description: 'Technical SEO built in from the ground up for organic visibility.' },
        { icon: '📈', title: 'More Leads & Appointments',    description: 'Conversion-optimized design that turns visitors into patients.' },
        { icon: '⚡', title: 'Fast Loading Speeds',          description: 'Performance-first development for excellent Core Web Vitals scores.' },
        { icon: '📱', title: 'Mobile-Friendly Experience',   description: 'Flawless experience across all devices and screen sizes.' },
      ],
    },
    industries: ['Doctors & Clinics', 'Hospitals', 'Businesses', 'E-commerce', 'Professional Services', 'Startups'],
    cta: {
      heading: 'Ready to Build a Website That Works for You?',
      subtext: 'Let us create a high-performance website that represents your brand, ranks on Google, and converts visitors into customers.',
    },
  },

  // ─── 5. DIGITAL MARKETING ─────────────────────────────────────────────────
  {
    slug: 'digital-marketing',
    meta: {
      title: 'Digital Marketing | YodhaMedia',
      description:
        'Meta and Google ad campaigns strategically designed, launched, and optimized for maximum return on your investment.',
    },
    hero: {
      heading: 'Run Data-Driven Campaigns That Deliver Real ROI',
      subheading:
        'Meta and Google ad campaigns strategically designed, launched, and optimized for maximum return on your investment.',
      categoryLabel: 'DIGITAL MARKETING',
      gradientFrom: '#0f5a8B',
      gradientTo: '#2D1B69',
      icon: '📡',
    },
    challenge: {
      heading: 'The Challenge vs Our Solution',
      problem:
        'Businesses waste thousands on poorly targeted ads with no clear strategy, tracking, or optimization — getting clicks but no conversions. Ad spend becomes a black hole with no measurable return.',
      solution:
        'We build and manage performance-driven ad campaigns with precise targeting, compelling creatives, and continuous optimization — every rupee is tracked and maximized.',
    },
    whatWeOffer: {
      heading: 'Complete Service Suite',
      items: [
        {
          icon: '📘',
          title: 'Meta Ads (Facebook & Instagram)',
          description: 'Audience-targeted campaigns that drive real leads and conversions.',
          includes: ['Audience research & targeting', 'Campaign setup & management', 'Retargeting campaigns'],
        },
        {
          icon: '🔴',
          title: 'Google Ads',
          description: 'Capture high-intent audiences actively searching for your services.',
          includes: ['Search campaigns', 'Display & YouTube ads', 'Smart Shopping campaigns'],
        },
        {
          icon: '🗺️',
          title: 'Ad Strategy & Planning',
          description: 'A clear roadmap for your advertising investment.',
          includes: ['Campaign structure planning', 'Budget allocation', 'Goal setting & KPIs'],
        },
        {
          icon: '🎨',
          title: 'Creative Design',
          description: 'Ad creatives and copy that stop the scroll and drive action.',
          includes: ['Ad visual design', 'Copywriting', 'Landing page recommendations'],
        },
        {
          icon: '🔬',
          title: 'Campaign Optimization',
          description: 'Continuous improvement to lower costs and increase conversions.',
          includes: ['A/B testing', 'Bid optimization', 'Audience refinement'],
        },
        {
          icon: '📊',
          title: 'Reporting & Analytics',
          description: 'Transparent reporting so you always know where your money goes.',
          includes: ['Monthly performance reports', 'Cost per lead tracking', 'Insights & recommendations'],
        },
      ],
    },
    process: {
      steps: [
        { number: '01', title: 'Goal Setting',       description: 'Define campaign objectives, KPIs, and success metrics for your business.' },
        { number: '02', title: 'Audience Research',  description: 'Identify and segment your ideal customers using data and insights.' },
        { number: '03', title: 'Campaign Build',     description: 'Structure campaigns with precise targeting, budgets, and bidding strategies.' },
        { number: '04', title: 'Creative Production', description: 'Design compelling ad creatives and copy for each audience segment.' },
        { number: '05', title: 'Launch',             description: 'Go live with full tracking setup, conversion pixels, and analytics.' },
        { number: '06', title: 'Optimize & Report',  description: 'Continuously refine campaigns and deliver transparent monthly reports.' },
      ],
    },
    benefits: {
      heading: 'What You Gain With Us',
      items: [
        { icon: '💰', title: 'Measurable ROI',        description: 'Every campaign is tracked so you see exactly what your money delivers.' },
        { icon: '📉', title: 'Lower Cost Per Lead',   description: 'Optimized campaigns consistently reduce your cost per acquisition.' },
        { icon: '🎯', title: 'Targeted Reach',        description: 'Your ads reach the right people at the right time in the right places.' },
        { icon: '📈', title: 'Increased Bookings & Sales', description: 'Campaigns built for conversions, not just clicks or impressions.' },
        { icon: '📋', title: 'Clear Performance Data', description: 'Transparent reporting with actionable insights every month.' },
      ],
    },
    industries: ['Hospitals', 'Clinics', 'E-commerce', 'Real Estate', 'Education', 'Local Businesses'],
    cta: {
      heading: 'Ready to Make Every Ad Rupee Count?',
      subtext: 'Let us build and manage data-driven campaigns that deliver consistent, measurable results for your business.',
    },
  },

  // ─── 6. INFLUENCER MARKETING ──────────────────────────────────────────────
  {
    slug: 'influencer-marketing',
    meta: {
      title: 'Influencer Marketing | YodhaMedia',
      description:
        'Leverage our network of verified influencers and Business Hub city pages to reach new audiences and build brand credibility.',
    },
    hero: {
      heading: 'Amplify Your Brand With Trusted Influencer Partnerships',
      subheading:
        'Leverage our network of verified influencers and Business Hub city pages to reach new audiences and build brand credibility.',
      categoryLabel: 'INFLUENCER MARKETING',
      gradientFrom: '#6B1B8B',
      gradientTo: '#2D1B69',
      icon: '🤳',
    },
    challenge: {
      heading: 'The Challenge vs Our Solution',
      problem:
        'Finding and managing influencers is time-consuming, expensive, and often delivers poor ROI without the right strategy and vetting. Most brands waste budgets on mismatched creators with disengaged audiences.',
      solution:
        'We handle the entire influencer marketing process — from identifying the right creators to managing campaigns and measuring results — through our vetted network.',
    },
    whatWeOffer: {
      heading: 'Complete Service Suite',
      items: [
        {
          icon: '🔍',
          title: 'Influencer Identification & Vetting',
          description: 'Finding niche-relevant creators with authentic, engaged audiences.',
          includes: ['Niche-match filtering', 'Audience authenticity checks', 'Engagement rate analysis'],
        },
        {
          icon: '📋',
          title: 'Campaign Strategy & Briefing',
          description: 'Detailed briefs ensuring influencers deliver exactly what you need.',
          includes: ['Campaign objectives', 'Content deliverables', 'Brand guidelines briefing'],
        },
        {
          icon: '🏙️',
          title: 'City Page & Business Hub Promotions',
          description: 'Sponsored posts on our established city and niche pages.',
          includes: ['City page sponsored posts', 'Business Hub features', 'Niche community promotions'],
        },
        {
          icon: '🤝',
          title: 'Negotiation & Contracting',
          description: 'Managing rates, deliverables, and agreements professionally.',
          includes: ['Rate negotiation', 'Contract management', 'Deliverable tracking'],
        },
        {
          icon: '🎬',
          title: 'Campaign Management',
          description: 'End-to-end oversight of content creation, approvals, and publishing.',
          includes: ['Content review & approvals', 'Posting schedule management', 'Quality assurance'],
        },
        {
          icon: '📊',
          title: 'Performance Tracking',
          description: 'Comprehensive reporting on reach, engagement, and conversions.',
          includes: ['Reach & impression tracking', 'Engagement analytics', 'Conversion reporting'],
        },
      ],
    },
    process: {
      steps: [
        { number: '01', title: 'Brand Brief',              description: 'Understand your campaign goals, target audience, and brand guidelines.' },
        { number: '02', title: 'Influencer Research',      description: 'Identify and vet the best creators for your brand and objectives.' },
        { number: '03', title: 'Outreach & Negotiation',   description: 'Reach out to shortlisted influencers and negotiate terms.' },
        { number: '04', title: 'Campaign Brief',           description: 'Provide detailed content guidelines and deliverable requirements.' },
        { number: '05', title: 'Content Creation & Approval', description: 'Oversee content production and approve before publishing.' },
        { number: '06', title: 'Publish & Track',          description: 'Go live and track performance with detailed reporting.' },
      ],
    },
    benefits: {
      heading: 'What You Gain With Us',
      items: [
        { icon: '🌐', title: 'Expanded Brand Reach',          description: 'Access new audiences through trusted voices in your niche.' },
        { icon: '💬', title: 'Authentic Peer Recommendations', description: 'Influencer endorsements carry far more trust than traditional ads.' },
        { icon: '🏆', title: 'Higher Trust Signals',          description: 'Third-party credibility boosts brand authority and conversions.' },
        { icon: '👥', title: 'New Audience Segments',         description: 'Reach demographics and communities you couldn\'t access otherwise.' },
        { icon: '📈', title: 'Measurable Campaign Metrics',   description: 'Clear ROI data on every campaign with detailed analytics.' },
      ],
    },
    industries: ['Healthcare', 'Beauty & Wellness', 'Restaurants', 'Fashion', 'E-commerce', 'Local Services'],
    cta: {
      heading: 'Ready to Amplify Your Brand With Influencers?',
      subtext: 'Let us connect you with the right creators and city pages to reach new audiences and build lasting brand credibility.',
    },
  },
]

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug)
}

export function getServiceCardBySlug(slug: string): ServiceCard | undefined {
  return serviceCards.find((s) => s.slug === slug)
}

// Legacy export alias — some pages import `services` directly
export const services = serviceCards
