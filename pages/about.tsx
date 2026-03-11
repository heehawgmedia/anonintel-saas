import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About AnonIntel | Threat Intelligence for Biotech</title>
        <meta name="description" content="Learn about AnonIntel's mission to protect biotech companies with advanced threat intelligence." />
      </Head>

      <div className="min-h-screen bg-white text-slate-900">
        {/* Header */}
        <header className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">About AnonIntel</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Securing the future of biotech with real-time threat intelligence.
            </p>
          </div>
        </header>

        {/* Mission */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              AnonIntel was founded to protect biotechnology companies from the growing threat of cyber attacks, data breaches, and intellectual property theft. We combine advanced AI, global threat feeds, and deep industry expertise to deliver actionable intelligence tailored specifically for biotech.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our platform monitors dark web markets, hacker forums, phishing campaigns, and emerging vulnerabilities — filtering the noise to bring you only the threats that matter to your research, patents, and clinical trials.
            </p>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why AnonIntel?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Proactive Defense', desc: 'Early warnings before breaches occur. We detect threats targeting your company, researchers, and IP in real-time.' },
                { title: 'Biotech-Focused', desc: 'Not a generic security tool. We understand the unique risks of R&D, clinical data, FDA compliance, and supply chain attacks.' },
                { title: 'Actionable Alerts', desc: 'No information overload. Each alert includes risk score, impact analysis, and recommended actions.' },
                { title: 'Unlimited History', desc: 'Full audit trail of all threats and incidents. Searchable by keyword, date, severity, or target.' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to secure your biotech company?</h2>
            <p className="text-slate-600 mb-8">Join the waitlist today and be among the first to experience intelligent threat intelligence.</p>
            <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
