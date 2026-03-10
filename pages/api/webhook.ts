import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Simple local storage for events (in production, use a database)
const EVENTS_LOG = join(process.cwd(), 'data', 'stripe-events.json');

async function logEvent(event: Stripe.Event): Promise<void> {
  try {
    const existing = await writeFile(EVENTS_LOG, JSON.stringify(event, null, 2) + '\n', { flag: 'a' });
  } catch (err) {
    console.error('Failed to log event:', err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'] as string;

  if (!sig) {
    return res.status(400).json({ error: 'Missing stripe-signature header' });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Log event
    await logEvent(event);

    // Handle specific events
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`✅ Payment successful for ${session.customer_email}`);
        // TODO: Mark customer as subscribed in database, send welcome email
        break;

      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`📝 Subscription updated: ${subscription.id} - status: ${subscription.status}`);
        // TODO: Update subscription status in DB
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`💳 Payment succeeded for invoice ${invoice.id}`);
        // TODO: Grant/extend access
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log(`❌ Payment failed for invoice ${failedInvoice.id}`);
        // TODO: Notify customer, possibly suspend access
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }
}