import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CheckCircle, Loader } from 'lucide-react';

const SuccessPage: NextPage = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      // Optionally, fetch session details from Stripe to verify
      // For now, just show success message
      setLoading(false);
    }
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Welcome to AnonIntel!</title>
        <meta name="description" content="Thank you for subscribing to AnonIntel" />
      </Head>

      <div className="min-h-screen bg-[#020617] text-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            {loading ? (
              <Loader className="w-16 h-16 mx-auto animate-spin text-blue-500" />
            ) : (
              <CheckCircle className="w-16 h-16 mx-auto text-emerald-500" />
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">
            {loading ? 'Processing...' : 'Payment Successful!'}
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            {loading
              ? 'Please wait while we confirm your payment...'
              : 'Welcome to AnonIntel. Your subscription is now active. Check your email for confirmation and login details.'}
          </p>

          {!loading && (
            <div className="space-y-4">
              <a
                href="/"
                className="block w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition"
              >
                Return to Home
              </a>
              <p className="text-sm text-gray-500">
                Questions? Contact support@anonintel.com
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SuccessPage;