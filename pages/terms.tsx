import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | AnonIntel</title>
        <meta name="description" content="Terms of Service for AnonIntel threat intelligence platform." />
      </Head>

      <div className="min-h-screen bg-white text-slate-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-slate-500 mb-8">Last updated: March 10, 2026</p>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using AnonIntel, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. Service Description</h2>
              <p>AnonIntel provides cybersecurity threat intelligence services targeted at biotechnology companies. The service includes monitoring, alerting, and analytics features delivered via web and API.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Subscriptions & Payment</h2>
              <p>Access to AnonIntel requires a paid subscription. All fees are billed in advance on a monthly or annual basis as selected at purchase. Refunds are not provided for partial months.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. User Responsibilities</h2>
              <p>You agree to: (a) provide accurate information; (b) keep your account credentials secure; (c) use the service in compliance with applicable laws; (d) not attempt to reverse engineer or abuse the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Intellectual Property</h2>
              <p>The service, its design, and content are owned by AnonIntel. You may use the service as intended but may not copy, modify, or create derivative works without permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Limitation of Liability</h2>
              <p>AnonIntel is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Changes to Terms</h2>
              <p>We may update these Terms. Continued use after changes constitutes acceptance. We will notify users of material changes via email or in-app notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Contact</h2>
              <p>Questions about these Terms? Contact us at <a href="mailto:info@aibiojobs.com" className="text-blue-600 hover:underline">info@aibiojobs.com</a>.</p>
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

export default Terms;
