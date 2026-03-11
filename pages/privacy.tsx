import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Privacy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | AnonIntel</title>
        <meta name="description" content="Privacy Policy for AnonIntel cybersecurity intelligence platform." />
      </Head>

      <div className="min-h-screen bg-white text-slate-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: March 10, 2026</p>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. What We Collect</h2>
              <p>AnonIntel collects information you provide directly, such as your email address when signing up for the waitlist or subscribing. We also collect usage data (page views, interactions) to improve the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. How We Use Your Data</h2>
              <p>We use your data to: provide and maintain the service; process payments; send service-related communications (alerts, updates, security notifications); improve our products; and comply with legal obligations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Data Sharing</h2>
              <p>We do not sell your personal data. We may share it with third-party service providers (e.g., Stripe for payments, hosting providers) who assist in operating our service. These parties are bound by confidentiality agreements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data, including encryption, access controls, and regular security audits. However, no method of transmission or storage is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Cookies & Tracking</h2>
              <p>We use essential cookies to operate the service. We may also use analytics tools that respect privacy and do not collect personal data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Your Rights</h2>
              <p>You may request access to, correction of, or deletion of your personal data. Contact us at <a href="mailto:info@aibiojobs.com" className="text-blue-600 hover:underline">info@aibiojobs.com</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Changes to This Policy</h2>
              <p>We may update this Privacy Policy. We will notify users of material changes via email or in-app notice. Continued use after changes constitutes acceptance.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Contact</h2>
              <p>For privacy questions, contact us at <a href="mailto:info@aibiojobs.com" className="text-blue-600 hover:underline">info@aibiojobs.com</a>.</p>
            </section>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
