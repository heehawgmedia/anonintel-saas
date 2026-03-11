import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage = () => {
  const siteUrl = 'https://anonintel.com';
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

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
    } catch (error) {
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
    } catch (error) {
      console.error(error);
      alert('Network error');
      setCheckoutLoading(null);
    }
  };

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
        <meta name="theme-color" content="#0f172a" />
      </Head>

      <div className="min-h-screen bg-white text-slate-900 font-sans">
        {/* Header */}
        <header className="bg-slate-900 text-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tight">AnonIntel</div>
            <nav className="hidden md:flex gap-8 text-sm">
              <a href="#features" className="hover:text-blue-400 transition">Features</a>
              <a href="#pricing" className="hover:text-blue-400 transition">Pricing</a>
              <a href="/about" className="hover:text-blue-400 transition">About</a>
              <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            </nav>
            <a href="#waitlist" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition">Join Waitlist</a>
          </div>
        </header>

        {/* Hero */}
        <section className="py-20 px-6 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Cybersecurity Intelligence <span className="text-blue-400">Curated for Biotech</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
              Monitor the dark web, GitHub, and paste sites for threats against your organization. Get actionable alerts before breaches happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#waitlist" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition">Get Early Access</a>
              <a href="#demo" className="border border-slate-600 hover:border-blue-400 px-8 py-4 rounded-lg font-semibold transition">Request Demo</a>
            </div>
          </div>
        </section>

        {/* Trusted By / Logos placeholder */}
        <section className="py-12 bg-slate-50 border-b">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
            Trusted by biotech companies worldwide
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Built for Biotech Security</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Purpose-built intelligence for life sciences. Protect your R&D, clinical data, and intellectual property.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Dark Web Monitoring', desc: 'Continuous scanning of 1000+ forums and marketplaces for mentions of your company or compounds.' },
                { title: 'Credential Leak Detection', desc: 'Alerts when employee emails or passwords appear in breach dumps.' },
                { title: 'Code Repository Scanning', desc: 'Monitor GitHub for proprietary code, notebooks, or secrets.' },
                { title: 'Real-time Alerts', desc: 'Instant notifications via email or Slack when threats are verified.' },
                { title: 'Custom Keywords', desc: 'Define project codenames, compound names, or internal terms to track.' },
                { title: 'Audit & Compliance', desc: 'Detailed logs and reports for FDA, HIPAA, and GDPR requirements.' },
              ].map((feature, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'You provide keywords', desc: 'Tell us your company name, compounds, researchers, and custom terms to monitor.' },
                { step: '2', title: 'We scan continuously', desc: 'Our systems monitor dark web, paste sites, GitHub, and more 24/7.' },
                { step: '3', title: 'You get alerts', desc: 'Receive prioritized alerts with risk scores and recommended actions.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">{item.step}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Pricing</h2>
              <p className="text-slate-600">Simple, transparent pricing. No hidden fees.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter */}
              <div className="border border-slate-200 rounded-xl p-8 bg-white">
                <h3 className="font-bold text-xl mb-2">Starter</h3>
                <p className="text-slate-500 text-sm mb-6">For small biotech startups</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$499</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-slate-700">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Up to 50 keywords</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Email alerts</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 30-day history</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Basic dashboard</li>
                </ul>
                <button onClick={() => handleCheckout('starter')} disabled={checkoutLoading === 'starter'} className="w-full py-3 border border-slate-300 hover:border-blue-500 rounded-lg font-medium transition disabled:opacity-50">
                  {checkoutLoading === 'starter' ? 'Redirecting...' : 'Get Started'}
                </button>
              </div>

              {/* Professional */}
              <div className="border-2 border-blue-600 rounded-xl p-8 bg-white relative transform md:-translate-y-4 shadow-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">Most Popular</div>
                <h3 className="font-bold text-xl mb-2">Professional</h3>
                <p className="text-slate-500 text-sm mb-6">For growing biotech companies</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$1,299</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-slate-700">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Up to 250 keywords</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Email + Slack alerts</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited history</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Advanced analytics</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> API access</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Dedicated analyst</li>
                </ul>
                <button onClick={() => handleCheckout('professional')} disabled={checkoutLoading === 'professional'} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50">
                  {checkoutLoading === 'professional' ? 'Redirecting...' : 'Get Started'}
                </button>
              </div>

              {/* Enterprise */}
              <div className="border border-slate-200 rounded-xl p-8 bg-white">
                <h3 className="font-bold text-xl mb-2">Enterprise</h3>
                <p className="text-slate-500 text-sm mb-6">For large pharmaceutical companies</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-slate-700">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited keywords</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> All alert channels</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Custom integrations</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> On-premise option</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 24/7 phone support</li>
                </ul>
                <button className="w-full py-3 border border-slate-300 hover:border-blue-500 rounded-lg font-medium transition">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist / Contact */}
        <section id="waitlist" className="py-20 px-6 bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Waitlist</h2>
            <p className="text-slate-300 mb-8">Be among the first biotech companies to experience intelligent threat intelligence. Early access includes discounted pricing.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                required
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50">
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
            {submitMessage && <p className={`mt-4 text-sm ${submitMessage.includes('Successfully') ? 'text-green-400' : 'text-red-400'}`}>{submitMessage}</p>}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-white text-lg mb-2">AnonIntel</div>
              <p className="text-sm max-w-md">Threat intelligence curated for biotech companies.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/about" className="hover:text-white transition">About</a>
              <a href="/privacy" className="hover:text-white transition">Privacy</a>
              <a href="/terms" className="hover:text-white transition">Terms</a>
              <a href="mailto:info@aibiojobs.com" className="hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-8 text-center text-xs text-slate-500">
            © 2024 AnonIntel. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
