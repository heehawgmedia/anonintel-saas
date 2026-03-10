import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
        ctx.fill();
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('✓ Successfully joined the waitlist! We\'ll be in touch.');
        setEmail('');
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async (plan: 'starter' | 'professional' | 'enterprise') => {
    setCheckoutLoading(plan);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          customerEmail: email || undefined,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to start checkout. Please try again.');
        setCheckoutLoading(null);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Network error. Please try again.');
      setCheckoutLoading(null);
    }
  };

  return (
    <>
      <Head>
        <title>AnonIntel - Threat Intelligence for Biotech</title>
        <meta name="description" content="AnonIntel monitors dark web, GitHub, and paste sites for threats against your biotech company. Get alerts on leaked credentials, trade secrets, and research data." />
        <meta name="keywords" content="threat intelligence, cybersecurity, biotech, dark web monitoring, credential leaks, trade secrets protection" />

        {/* Open Graph */}
        <meta property="og:title" content="AnonIntel - Threat Intelligence for Biotech" />
        <meta property="og:description" content="Protect your biotech research and intellectual property with intelligent threat monitoring." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AnonIntel - Threat Intelligence for Biotech" />
        <meta name="twitter:description" content="Protect your biotech research and intellectual property with intelligent threat monitoring." />
        <meta name="twitter:image" content="/og-image.png" />

        {/* Theme */}
        <meta name="theme-color" content="#020617" />
      </Head>

      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className="min-h-screen bg-[#020617] text-gray-100 relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-[#020617]/95 backdrop-blur-md border-b border-blue-900/30 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">AnonIntel</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Features</a>
                <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">How It Works</a>
                <a href="#pricing" className="text-gray-300 hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Pricing</a>
                <a href="#waitlist" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-lg transition shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                  Join Waitlist
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/30 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <span className="text-xs text-emerald-400 font-medium tracking-wider">🛡️ PROTECTING BIOTECH INTELLECTUAL PROPERTY</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Threat Intelligence</span>
              <span className="block bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-pulse-slow">
                Curated for Biotech
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
              Monitor the dark web, GitHub, and paste sites for mentions of your company,
              leaked credentials, and research data. Get alerts only on credible threats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="#waitlist"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all transform hover:scale-105"
              >
                Join the Waitlist
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 border-2 border-blue-900/50 hover:border-blue-500 text-gray-300 hover:text-blue-400 font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                See How It Works
              </a>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-20 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 blur-3xl animate-pulse" />
              <div className="relative bg-[#0a0a0a] border border-blue-900/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                {/* Dashboard Header */}
                <div className="bg-[#111] border-b border-blue-900/30 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308]" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#22c55e]" />
                  </div>
                  <span className="text-sm text-gray-500 font-mono">AnonIntel Dashboard — Live</span>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Alert Feed */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                      Recent Alerts
                    </h3>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-[#111] border border-blue-900/30 rounded-lg p-4 hover:border-blue-500/50 transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full shadow-lg ${i === 1 ? 'bg-red-500' : i === 2 ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                            <span className={`text-sm font-medium ${i === 1 ? 'text-red-400' : i === 2 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                              {i === 1 ? 'CRITICAL' : i === 2 ? 'MEDIUM' : 'LOW'}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 font-mono">{(i * 2) + 1}h ago</span>
                        </div>
                        <h4 className="text-white font-medium mb-1">
                          {i === 1 ? 'Credential leak detected' : i === 2 ? 'Research paper mentioned' : 'New paste detected'}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {i === 1
                            ? 'Employee credentials found in a dark web dump from 48 hours ago'
                            : i === 2
                            ? 'Upcoming publication references your proprietary compound'
                            : 'Potential data exfiltration from GitHub repository'}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-400 mb-4">Threat Metrics</h3>
                    <div className="bg-[#111] border border-blue-900/30 rounded-lg p-4 hover:border-blue-500/30 transition">
                      <div className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">24</div>
                      <div className="text-sm text-gray-500">Alerts This Week</div>
                    </div>
                    <div className="bg-[#111] border border-blue-900/30 rounded-lg p-4 hover:border-blue-500/30 transition">
                      <div className="text-3xl font-bold text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">5</div>
                      <div className="text-sm text-gray-500">Critical Threats</div>
                    </div>
                    <div className="bg-[#111] border border-blue-900/30 rounded-lg p-4 hover:border-blue-500/30 transition">
                      <div className="text-3xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">1,247</div>
                      <div className="text-sm text-gray-500">Sources Monitored</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Your Research is Valuable.
                  <span className="block text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"> Don't Let It Get Stolen.</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Biotech companies are prime targets. Your R&D represents billions in investment
                  and years of work. Yet most breach detection systems are generic and miss
                  industry-specific threats.
                </p>
                <ul className="space-y-4">
                  {[
                    'Dark web markets trading your compounds',
                    'Insider threats posting code to GitHub',
                    'Paste sites leaking clinical trial data',
                    'Credential stuffing from previous breaches'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl blur-2xl animate-pulse" />
                <div className="relative bg-[#111] border border-blue-900/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  <div className="aspect-video bg-[#0a0a0a] rounded-lg flex items-center justify-center mb-6 border border-blue-900/20">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🔴</div>
                      <div className="text-gray-500">Threat detected visualization</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-blue-900/30">
                      <div className="flex justify-between mb-2">
                        <span className="text-red-400 font-medium">Threat Level</span>
                        <span className="text-red-400 font-bold drop-shadow-[0_0_5px_rgba(239,68,68,0.6)]">CRITICAL</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Chemical formula for XYZ-123 found on dark web marketplace
                      </div>
                    </div>
                    <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-blue-900/30">
                      <div className="flex justify-between mb-2">
                        <span className="text-blue-400 font-medium">Source</span>
                        <span className="text-gray-300">Dark Web Forum</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Encrypted channel • Verified seller
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">How AnonIntel Works</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                We continuously monitor the places attackers hide, so you don't have to.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Continuous Monitoring',
                  description: 'Our systems scan 1000+ dark web forums, GitHub repositories, and paste sites 24/7 for any mention of your organization or IP.',
                  icon: '🔍'
                },
                {
                  step: '02',
                  title: 'AI-Powered Analysis',
                  description: 'Advanced algorithms filter noise from signal, identifying genuinely credible threats and eliminating false positives.',
                  icon: '🤖'
                },
                {
                  step: '03',
                  title: 'Instant Alerts',
                  description: 'Receive prioritized alerts via email or Slack when threats are verified. Take action before damage occurs.',
                  icon: '🚨'
                }
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative bg-[#111] border border-blue-900/30 rounded-xl p-6 h-full hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <div className="text-blue-400 text-sm font-bold mb-2 font-mono">{item.step}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">Built for Biotech Security</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Purpose-built features designed specifically for life sciences and biotech companies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Proprietary Compound Detection',
                  desc: 'Automatically identifies mentions of your specific chemical compounds, drug candidates, or formulations.',
                  icon: '🧬'
                },
                {
                  title: 'Employee Credential Monitoring',
                  desc: 'Alert when employee emails or passwords appear in breach databases or credential dumps.',
                  icon: '🔑'
                },
                {
                  title: 'Code Repository Scanning',
                  desc: 'Monitor GitHub for proprietary code, research notebooks, or sensitive configurations.',
                  icon: '💻'
                },
                {
                  title: 'Clinical Trial Leak Detection',
                  desc: 'Identify unauthorized disclosure of trial data, protocols, or patient information.',
                  icon: '📊'
                },
                {
                  title: 'Vendor Risk Insights',
                  desc: 'Track threats against your supply chain and third-party partners.',
                  icon: '🤝'
                },
                {
                  title: 'Custom Keyword Alerts',
                  desc: 'Define industry-specific terms, project codenames, or internal terminology to track.',
                  icon: '⚙️'
                }
              ].map((feature, i) => (
                <div key={i} className="bg-[#111] border border-blue-900/30 rounded-lg p-6 hover:border-blue-500/50 transition-all group hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Why Biotech Companies
                  <span className="block text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Choose AnonIntel</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { title: 'Industry-Specific Intelligence', desc: 'Generic threat feeds miss biotech. We focus on your vertical.' },
                    { title: 'Zero False Positive Guarantee', desc: 'Our AI filters noise so you only get actionable alerts.' },
                    { title: 'Compliance Ready', desc: 'Audit trails and reports for FDA, HIPAA, and GDPR requirements.' },
                    { title: 'Expert Analysis', desc: 'Each alert reviewed by cybersecurity experts with biotech experience.' }
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#111] border border-emerald-500/50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{benefit.title}</h4>
                        <p className="text-gray-400">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-2xl blur-2xl animate-pulse" />
                <div className="relative bg-[#111] border border-blue-900/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Alert Details</h3>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                      Verified
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Source</div>
                      <div className="text-white font-medium">Dark Web Marketplace - AlphaBay</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Content</div>
                      <div className="bg-[#0a0a0a] rounded p-3 text-sm text-gray-300 font-mono border border-blue-900/30">
                        "...compound XYZ-123 synthesis method now available..."
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Impact</div>
                      <div className="text-red-400 font-medium drop-shadow-[0_0_5px_rgba(239,68,68,0.6)]">High - Proprietary compound at risk</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Recommended Action</div>
                      <div className="text-gray-300 text-sm">
                        Contact legal team immediately. Document for potential takedown request.
                      </div>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-400">
                Choose the plan that fits your organization's needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter */}
              <div className="bg-[#111] border border-blue-900/30 rounded-xl p-8 hover:border-blue-500/30 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                <p className="text-gray-400 text-sm mb-6">For small biotech startups</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$499</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Up to 50 monitored keywords
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Email alerts
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    30-day alert history
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Basic dashboard
                  </li>
                </ul>
                <button
                  onClick={() => handleCheckout('starter')}
                  disabled={checkoutLoading === 'starter'}
                  className="w-full py-3 border border-blue-900/30 text-gray-300 hover:border-blue-500 hover:text-blue-400 rounded-lg transition hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkoutLoading === 'starter' ? 'Redirecting...' : 'Get Started'}
                </button>
              </div>

              {/* Professional */}
              <div className="bg-[#111] border-2 border-blue-500 rounded-xl p-8 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                <p className="text-gray-400 text-sm mb-6">For growing biotech companies</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$1,299</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Up to 250 monitored keywords
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Email + Slack alerts
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Unlimited alert history
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    API access
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Dedicated analyst
                  </li>
                </ul>
                <button
                  onClick={() => handleCheckout('professional')}
                  disabled={checkoutLoading === 'professional'}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-medium rounded-lg transition shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkoutLoading === 'professional' ? 'Redirecting...' : 'Get Started'}
                </button>
              </div>

              {/* Enterprise */}
              <div className="bg-[#111] border border-blue-900/30 rounded-xl p-8 hover:border-blue-500/30 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-gray-400 text-sm mb-6">For large pharmaceutical companies</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Unlimited keywords
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    All alert channels
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Custom integrations
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    On-premise option
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    24/7 phone support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Custom SLA
                  </li>
                </ul>
                <button className="w-full py-3 border border-blue-900/30 text-gray-300 hover:border-blue-500 hover:text-blue-400 rounded-lg transition hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Signup */}
        <section id="waitlist" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-blue-900/30 rounded-2xl p-12 text-center relative overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-emerald-500/5 to-blue-500/5" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Join the Waitlist</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Be among the first biotech companies to experience intelligent threat intelligence.
                  Early access includes discounted pricing and priority support.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      required
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-S0 focus:border-transparent shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </button>
                  {submitMessage && (
                    <div className={`text-sm ${submitMessage.includes('Successfully') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {submitMessage}
                    </div>
                  )}
                </form>

                <p className="text-sm text-gray-500 mt-6">
                  No spam, ever. We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-blue-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">AnonIntel</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  Threat intelligence curated specifically for biotech companies.
                  Monitor, detect, and respond to threats before they become breaches.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#features" className="hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Features</a></li>
                  <li><a href="#pricing" className="hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Pricing</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Documentation</a></li>
                  <li><a href="#waitlist" className="hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Waitlist</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">About</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Careers</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-blue-900/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">© 2024 AnonIntel. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-blue-400 transition">Privacy</a>
                <a href="#" className="text-gray-500 hover:text-blue-400 transition">Terms</a>
              </div>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Home;
