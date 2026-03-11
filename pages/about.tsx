import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Shield, Lock, Zap, BarChart3 } from 'lucide-react';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About AnonIntel - Cybersecurity Intelligence for Biotech</title>
        <meta name="description" content="Learn about AnonIntel's mission to protect biotech companies with advanced threat intelligence." />
      </Head>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              About AnonIntel
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Securing the future of biotech with real-time threat intelligence.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              AnonIntel was founded to protect biotechnology companies from the growing threat of cyber attacks, data breaches, and intellectual property theft. We combine advanced AI, global threat feeds, and deep industry expertise to deliver actionable intelligence tailored specifically for biotech.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our platform monitors dark web markets, hacker forums, phishing campaigns, and emerging vulnerabilities — filtering the noise to bring you only the threats that matter to your research, patents, and clinical trials.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why AnonIntel?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#111] border border-blue-900/30 rounded-xl p-6">
                <Shield className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Proactive Defense</h3>
                <p className="text-gray-400">Early warnings before breaches occur. We detect threats targeting your company, researchers, and IP in real-time.</p>
              </div>
              <div className="bg-[#111] border border-blue-900/30 rounded-xl p-6">
                <Lock className="w-12 h-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Biotech-Focused</h3>
                <p className="text-gray-400">Not a generic security tool. We understand the unique risks of R&D, clinical data, FDA compliance, and supply chain attacks.</p>
              </div>
              <div className="bg-[#111] border border-blue-900/30 rounded-xl p-6">
                <Zap className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Actionable Alerts</h3>
                <p className="text-gray-400">No information overload. Each alert includes risk score, impact analysis, and recommended actions.</p>
              </div>
              <div className="bg-[#111] border border-blue-900/30 rounded-xl p-6">
                <BarChart3 className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Unlimited History</h3>
                <p className="text-gray-400">Full audit trail of all threats and incidents. Searchable by keyword, date, severity, or target.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to secure your biotech company?</h2>
            <p className="text-gray-300 mb-8">Join the waitlist today and be among the first to experience intelligent threat intelligence.</p>
            <Link href="/" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
