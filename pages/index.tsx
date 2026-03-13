import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

/* ── Feature data ─────────────────────────────────────── */
const features = [
  {
    icon: '🌐',
    title: 'Dark Web Monitoring',
    desc: 'Continuous scanning of 1000+ forums and marketplaces for mentions of your company or compounds.',
    color: 'from-brand-500/10 to-brand-600/5',
  },
  {
    icon: '🔑',
    title: 'Credential Leak Detection',
    desc: 'Instant alerts when employee emails or passwords appear in breach dumps.',
    color: 'from-accent-500/10 to-accent-600/5',
  },
  {
    icon: '💻',
    title: 'Code Repository Scanning',
    desc: 'Monitor GitHub for proprietary code, notebooks, or accidentally exposed secrets.',
    color: 'from-purple-500/10 to-purple-600/5',
  },
  {
    icon: '⚡',
    title: 'Real-time Alerts',
    desc: 'Instant notifications via email or Slack when threats are verified by our analysts.',
    color: 'from-amber-500/10 to-amber-600/5',
  },
  {
    icon: '🎯',
    title: 'Custom Keywords',
    desc: 'Define project codenames, compound names, or internal terms to track across the dark web.',
    color: 'from-rose-500/10 to-rose-600/5',
  },
  {
    icon: '📋',
    title: 'Audit & Compliance',
    desc: 'Detailed logs and reports for FDA, HIPAA, and GDPR compliance requirements.',
    color: 'from-cyan-500/10 to-cyan-600/5',
  },
];

const steps = [
  { num: '01', title: 'Configure Keywords', desc: 'Tell us your company name, compounds, researchers, and custom terms to monitor.' },
  { num: '02', title: 'Continuous Scanning', desc: 'Our AI systems monitor dark web, paste sites, GitHub, and more — 24/7, 365.' },
  { num: '03', title: 'Actionable Alerts', desc: 'Receive prioritized alerts with risk scores, context, and recommended actions.' },
];

const testimonials = [
  { quote: 'AnonIntel caught a credential leak from a third-party vendor before it became a full breach. Invaluable.', author: 'CISO', company: 'Series B Biotech' },
  { quote: 'The biotech-specific intelligence is what sets them apart. They understand our threat landscape.', author: 'VP Security', company: 'Top-20 Pharma' },
  { quote: 'We went from reactive to proactive overnight. The ROI paid for itself in the first month.', author: 'CTO', company: 'Clinical-Stage Biotech' },
  { quote: 'Finally, threat intelligence that doesn\'t require a team of analysts to interpret.', author: 'Head of IT', company: 'Gene Therapy Startup' },
];

/* ── Component ────────────────────────────────────────── */
const Home: NextPage = () => {
  const siteUrl = 'https://anonintel.com';
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitMessage('✓ Successfully joined the waitlist!');
        setEmail('');
      } else {
        setSubmitMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setSubmitMessage('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async (plan: string) => {
    setCheckoutLoading(plan);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, customerEmail: email || undefined }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else { alert('Checkout failed'); setCheckoutLoading(null); }
    } catch {
      alert('Network error');
      setCheckoutLoading(null);
    }
  };

  const starterPrice = isAnnual ? 399 : 499;
  const proPrice = isAnnual ? 999 : 1299;

  return (
    <>
      <Head>
        <title>AnonIntel | Threat Intelligence for Biotech</title>
        <meta name="description" content="AnonIntel provides real-time cybersecurity threat intelligence for biotechnology companies. Monitor dark web, phishing, and IP theft." />
        <meta name="keywords" content="threat intelligence, cybersecurity, biotech, dark web monitoring, IP protection" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content="AnonIntel | Threat Intelligence for Biotech" />
        <meta property="og:description" content="Protect your biotech company with AI-powered threat intelligence." />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AnonIntel | Threat Intelligence for Biotech" />
        <meta name="twitter:description" content="Real-time cybersecurity intelligence for biotech." />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
        <meta name="theme-color" content="#080816" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-surface-50 text-slate-900 font-sans overflow-x-hidden">

        {/* ── Navigation ─────────────────────────────── */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled
              ? 'nav-blur shadow-sm border-b border-slate-200/50'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight">AnonIntel</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-brand-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-sm text-slate-600 hover:text-brand-600 transition-colors font-medium">How It Works</a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-brand-600 transition-colors font-medium">Pricing</a>
              <Link href="/about" className="text-sm text-slate-600 hover:text-brand-600 transition-colors font-medium">About</Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="#waitlist" className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold relative z-10">
                <span className="relative z-10">Get Early Access</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden glass border-t border-slate-200/50 px-6 py-4 space-y-3">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-700 py-2">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-700 py-2">How It Works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-700 py-2">Pricing</a>
              <Link href="/about" className="block text-sm font-medium text-slate-700 py-2">About</Link>
              <a href="#waitlist" className="btn-primary block text-center text-white px-5 py-2.5 rounded-xl text-sm font-semibold relative">
                <span className="relative z-10">Get Early Access</span>
              </a>
            </div>
          )}
        </nav>

        {/* ── Hero – Diagonal split with animated bg ── */}
        <section className="relative min-h-[90vh] flex items-center hero-gradient diagonal-clip pt-20">
          {/* Decorative blobs */}
          <div className="absolute top-20 right-[15%] w-72 h-72 bg-brand-400/10 rounded-full blur-3xl animate-blob pointer-events-none" />
          <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent-400/8 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />

          {/* Dot grid overlay */}
          <div className="absolute inset-0 dot-grid opacity-60" />

          <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 text-brand-700 text-xs font-semibold mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                Now in Early Access
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
                Threat Intel
                <br />
                <span className="text-gradient-brand">Built for Biotech</span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-500 max-w-lg mb-10 leading-relaxed font-light">
                Monitor the dark web, GitHub, and paste sites for threats against your organization. Get actionable alerts before breaches happen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#waitlist" className="btn-primary text-white px-8 py-4 rounded-2xl font-semibold text-base relative inline-flex items-center justify-center gap-2">
                  <span className="relative z-10">Get Early Access</span>
                  <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#demo" className="btn-secondary px-8 py-4 rounded-2xl font-semibold text-base text-slate-700 inline-flex items-center justify-center gap-2">
                  Request Demo
                </a>
              </div>

              <div className="mt-12 flex items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  SOC 2 compliant
                </div>
              </div>
            </div>

            {/* Right: Abstract visual */}
            <div className="hidden lg:flex justify-center animate-slide-up-delayed">
              <div className="relative w-full max-w-md">
                {/* Stacked cards to represent the dashboard */}
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-72 glass-card rounded-2xl p-6 rotate-[-3deg] opacity-60">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-slate-200 rounded-full w-3/4" />
                      <div className="h-3 bg-slate-200 rounded-full w-1/2" />
                    </div>
                  </div>
                  <div className="relative w-full h-72 glass-card rounded-2xl p-6 shadow-elevated rotate-[2deg]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-brand-600 mb-2">THREAT DETECTED</div>
                      <div className="h-3 bg-slate-200 rounded-full w-full mb-2" />
                      <div className="h-3 bg-slate-200 rounded-full w-2/3" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 bg-gradient-to-br from-brand-100 to-brand-50 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-brand-600">24</span>
                      </div>
                      <div className="h-20 bg-gradient-to-br from-accent-100 to-accent-50 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-accent-600">3</span>
                      </div>
                      <div className="h-20 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-amber-600">7</span>
                      </div>
                    </div>
                  </div>
                  {/* Floating notification */}
                  <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-4 shadow-elevated animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-800">Critical Alert</div>
                        <div className="text-xs text-slate-500">Credentials found on dark web</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo strip ─────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-10">
              Trusted by security-conscious biotech teams
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 opacity-40">
              {['BioNova', 'GeneSec', 'PharmGuard', 'CellShield', 'NeuroSafe'].map((name) => (
                <span key={name} className="text-2xl font-bold text-slate-600 tracking-tight">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features – Stacked cards with overlap ── */}
        <section id="features" className="py-28 px-6 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <div className="max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold mb-4">
                Features
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Built for <span className="text-gradient-brand">Biotech Security</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Purpose-built intelligence for life sciences. Protect your R&D, clinical data, and intellectual property.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`stacked-card glass-card rounded-2xl p-8 ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-5`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ────────────────────────────── */}
        <section id="how-it-works" className="py-28 px-6 bg-surface-100 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-semibold mb-4">
                How It Works
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Three steps to <span className="text-gradient-accent">proactive defense</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-brand-200 via-brand-400 to-accent-400" />

              {steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-32 h-32 mx-auto mb-8 glass-card rounded-3xl flex flex-col items-center justify-center shadow-card relative z-10">
                    <span className="text-3xl font-extrabold text-gradient-brand">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-slate-800">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials – Asymmetric grid ──────────── */}
        <section className="py-28 px-6 relative">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-4">
                Testimonials
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                Loved by <span className="text-gradient-mixed">security teams</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`glass-card rounded-2xl p-8 ${i === 0 ? 'md:row-span-2' : ''} flex flex-col justify-between`}
                >
                  <div>
                    <svg className="w-8 h-8 text-brand-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                    </svg>
                    <p className={`text-slate-700 leading-relaxed mb-6 ${i === 0 ? 'text-lg' : 'text-base'}`}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 flex items-center justify-center text-white font-bold text-sm">
                      {t.author[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-800">{t.author}</div>
                      <div className="text-xs text-slate-400">{t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing – Cards with toggle ─────────────── */}
        <section id="pricing" className="py-28 px-6 bg-surface-100 relative overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-brand-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold mb-4">
                Pricing
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-slate-500 text-lg mb-8">No hidden fees. Cancel anytime.</p>

              {/* Monthly / Annual toggle */}
              <div className="inline-flex items-center gap-4">
                <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
                <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`pricing-toggle ${isAnnual ? 'active' : ''}`}
                  aria-label="Toggle annual pricing"
                  role="switch"
                  aria-checked={isAnnual}
                />
                <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
                  Annual <span className="text-accent-600 text-xs font-semibold ml-1">Save 20%</span>
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Starter */}
              <div className="glass-card rounded-2xl p-8 flex flex-col">
                <h3 className="font-bold text-xl mb-1 text-slate-800">Starter</h3>
                <p className="text-slate-400 text-sm mb-6">For small biotech startups</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold tracking-tight">${starterPrice}</span>
                  <span className="text-slate-400 text-sm ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['Up to 50 keywords', 'Email alerts', '30-day history', 'Basic dashboard'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout('starter')}
                  disabled={checkoutLoading === 'starter'}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm border border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-all disabled:opacity-50"
                >
                  {checkoutLoading === 'starter' ? 'Redirecting...' : 'Get Started'}
                </button>
              </div>

              {/* Professional – Featured */}
              <div className="relative glass-card rounded-2xl p-8 flex flex-col ring-2 ring-brand-500 shadow-glow-brand md:-translate-y-4">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-bold rounded-full shadow-lg">
                  Most Popular
                </div>
                <h3 className="font-bold text-xl mb-1 text-slate-800">Professional</h3>
                <p className="text-slate-400 text-sm mb-6">For growing biotech companies</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold tracking-tight">${proPrice}</span>
                  <span className="text-slate-400 text-sm ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['Up to 250 keywords', 'Email + Slack alerts', 'Unlimited history', 'Advanced analytics', 'API access', 'Dedicated analyst'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout('professional')}
                  disabled={checkoutLoading === 'professional'}
                  className="btn-primary w-full py-3.5 rounded-xl font-semibold text-sm text-white relative disabled:opacity-50"
                >
                  <span className="relative z-10">{checkoutLoading === 'professional' ? 'Redirecting...' : 'Get Started'}</span>
                </button>
              </div>

              {/* Enterprise */}
              <div className="glass-card rounded-2xl p-8 flex flex-col">
                <h3 className="font-bold text-xl mb-1 text-slate-800">Enterprise</h3>
                <p className="text-slate-400 text-sm mb-6">For large pharmaceutical companies</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold tracking-tight">Custom</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['Unlimited keywords', 'All alert channels', 'Custom integrations', 'On-premise option', '24/7 phone support'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3.5 rounded-xl font-semibold text-sm border border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gradient CTA / Waitlist ─────────────────── */}
        <section id="waitlist" className="relative py-32 px-6 overflow-hidden hero-dark-gradient">
          {/* Geometric shapes */}
          <div className="geo-ring w-[500px] h-[500px] -top-40 -right-40 animate-spin-slow" style={{ position: 'absolute' }} />
          <div className="geo-ring w-[300px] h-[300px] -bottom-20 -left-20 animate-spin-slow" style={{ position: 'absolute', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
              Ready to protect your
              <br />
              <span className="text-gradient-mixed">biotech company?</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Be among the first to experience intelligent threat intelligence. Early access includes discounted pricing.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                required
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent backdrop-blur-sm transition"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-base relative disabled:opacity-50"
              >
                <span className="relative z-10">{isSubmitting ? 'Joining...' : 'Join Waitlist'}</span>
              </button>
            </form>
            {submitMessage && (
              <p className={`mt-4 text-sm ${submitMessage.includes('Successfully') ? 'text-accent-400' : 'text-red-400'}`}>
                {submitMessage}
              </p>
            )}

            <div className="mt-8 flex justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                No spam, ever
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Unsubscribe anytime
              </span>
            </div>
          </div>
        </section>

        {/* ── Footer – Minimalist with social icons ─── */}
        <footer className="bg-surface-950 text-slate-400 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">AnonIntel</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Threat intelligence curated for biotechnology companies.
                </p>
                {/* Social icons */}
                <div className="flex gap-4">
                  {[
                    { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                    { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
                    { label: 'GitHub', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
                  ].map(({ label, path }) => (
                    <a key={label} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label={label}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={path} /></svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="mailto:info@aibiojobs.com" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-600">© {new Date().getFullYear()} AnonIntel. All rights reserved.</p>
              <p className="text-xs text-slate-600">Built with 🛡️ for biotech security teams</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
