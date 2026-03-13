import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const values = [
  {
    icon: '🛡️',
    title: 'Proactive Defense',
    desc: 'Early warnings before breaches occur. We detect threats targeting your company, researchers, and IP in real-time.',
    gradient: 'from-brand-500/10 to-brand-600/5',
  },
  {
    icon: '🧬',
    title: 'Biotech-Focused',
    desc: 'Not a generic security tool. We understand the unique risks of R&D, clinical data, FDA compliance, and supply chain attacks.',
    gradient: 'from-accent-500/10 to-accent-600/5',
  },
  {
    icon: '⚡',
    title: 'Actionable Alerts',
    desc: 'No information overload. Each alert includes risk score, impact analysis, and recommended actions.',
    gradient: 'from-amber-500/10 to-amber-600/5',
  },
  {
    icon: '📊',
    title: 'Unlimited History',
    desc: 'Full audit trail of all threats and incidents. Searchable by keyword, date, severity, or target.',
    gradient: 'from-purple-500/10 to-purple-600/5',
  },
];

const stats = [
  { value: '1,000+', label: 'Dark Web Sources' },
  { value: '24/7', label: 'Monitoring' },
  { value: '<5min', label: 'Alert Latency' },
  { value: '99.9%', label: 'Uptime SLA' },
];

const About: NextPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>About AnonIntel | Threat Intelligence for Biotech</title>
        <meta name="description" content="Learn about AnonIntel's mission to protect biotech companies with advanced threat intelligence." />
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
              <Link href="/#features" className="text-sm text-slate-600 hover:text-brand-600 transition-colors font-medium">Features</Link>
              <Link href="/#pricing" className="text-sm text-slate-600 hover:text-brand-600 transition-colors font-medium">Pricing</Link>
              <Link href="/about" className="text-sm text-brand-600 font-semibold">About</Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/#waitlist" className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold relative z-10">
                <span className="relative z-10">Get Early Access</span>
              </Link>
            </div>

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

          {mobileMenuOpen && (
            <div className="md:hidden glass border-t border-slate-200/50 px-6 py-4 space-y-3">
              <Link href="/#features" className="block text-sm font-medium text-slate-700 py-2">Features</Link>
              <Link href="/#pricing" className="block text-sm font-medium text-slate-700 py-2">Pricing</Link>
              <Link href="/about" className="block text-sm font-semibold text-brand-600 py-2">About</Link>
              <Link href="/#waitlist" className="btn-primary block text-center text-white px-5 py-2.5 rounded-xl text-sm font-semibold relative">
                <span className="relative z-10">Get Early Access</span>
              </Link>
            </div>
          )}
        </nav>

        {/* ── Hero ────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
          <div className="absolute top-20 right-[10%] w-80 h-80 bg-brand-400/10 rounded-full blur-3xl animate-blob pointer-events-none" />
          <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-accent-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 dot-grid opacity-40" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 text-brand-700 text-xs font-semibold mb-8 backdrop-blur-sm">
              About Us
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Securing the future
              <br />
              <span className="text-gradient-brand">of biotech</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
              We combine advanced AI, global threat feeds, and deep industry expertise to deliver actionable intelligence tailored specifically for biotechnology.
            </p>
          </div>
        </section>

        {/* ── Stats ───────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gradient-brand mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission ─────────────────────────────────── */}
        <section className="py-28 px-6 relative">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-semibold mb-4">
                  Our Mission
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
                  Defending innovation, <span className="text-gradient-accent">one alert at a time</span>
                </h2>
                <div className="space-y-5 text-slate-500 leading-relaxed text-lg">
                  <p>
                    AnonIntel was founded to protect biotechnology companies from the growing threat of cyber attacks, data breaches, and intellectual property theft.
                  </p>
                  <p>
                    Our platform monitors dark web markets, hacker forums, phishing campaigns, and emerging vulnerabilities — filtering the noise to bring you only the threats that matter to your research, patents, and clinical trials.
                  </p>
                </div>
              </div>

              {/* Visual element */}
              <div className="hidden lg:block relative">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Abstract layered cards */}
                  <div className="absolute inset-0 glass-card rounded-3xl rotate-6 opacity-40" />
                  <div className="absolute inset-0 glass-card rounded-3xl -rotate-3 opacity-60" />
                  <div className="relative glass-card rounded-3xl p-10 shadow-elevated">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">Threat Intelligence</div>
                          <div className="text-sm text-slate-400">Purpose-built for biotech</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-brand-600">1K+</span>
                          <span className="text-xs text-brand-400">Sources</span>
                        </div>
                        <div className="h-24 bg-gradient-to-br from-accent-100 to-accent-50 rounded-2xl flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-accent-600">24/7</span>
                          <span className="text-xs text-accent-400">Monitoring</span>
                        </div>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-brand-400 to-accent-400 rounded-full" />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Threat Coverage</span>
                        <span className="font-semibold text-slate-600">75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values – Asymmetric grid ────────────────── */}
        <section className="py-28 px-6 bg-surface-100 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-4">
                Why AnonIntel?
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                What sets us <span className="text-gradient-mixed">apart</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <div
                  key={i}
                  className={`stacked-card glass-card rounded-2xl p-8 ${i === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-2xl mb-5`}>
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-slate-800">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <section className="relative py-32 px-6 overflow-hidden hero-dark-gradient">
          <div className="geo-ring w-[400px] h-[400px] -top-32 -right-32 animate-spin-slow" style={{ position: 'absolute' }} />
          <div className="geo-ring w-[250px] h-[250px] -bottom-16 -left-16 animate-spin-slow" style={{ position: 'absolute', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
              Ready to secure your
              <br />
              <span className="text-gradient-mixed">biotech company?</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Join the waitlist today and be among the first to experience intelligent threat intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#waitlist" className="btn-primary text-white px-8 py-4 rounded-2xl font-semibold text-base relative inline-flex items-center justify-center gap-2">
                <span className="relative z-10">Join Waitlist</span>
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/" className="btn-secondary px-8 py-4 rounded-2xl font-semibold text-base text-slate-300 inline-flex items-center justify-center border-white/10 hover:border-white/20">
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────── */}
        <footer className="bg-surface-950 text-slate-400 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
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
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><a href="mailto:info@aibiojobs.com" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
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

export default About;
