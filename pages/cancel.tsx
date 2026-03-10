import type { NextPage } from 'next';
import Head from 'next/head';
import { XCircle } from 'lucide-react';

const CancelPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Subscription Cancelled - AnonIntel</title>
        <meta name="description" content="Your subscription was cancelled" />
      </Head>

      <div className="min-h-screen bg-[#020617] text-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <XCircle className="w-16 h-16 mx-auto text-red-500" />
          </div>

          <h1 className="text-4xl font-bold mb-4 text-red-400">Subscription Cancelled</h1>

          <p className="text-gray-400 text-lg mb-8">
            No worries, you weren't charged. If you have any questions or concerns,
            feel free to reach out.
          </p>

          <div className="space-y-4">
            <a
              href="/pricing"
              className="block w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition"
            >
              View Pricing Again
            </a>
            <a
              href="/"
              className="block w-full py-3 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-400 transition"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelPage;