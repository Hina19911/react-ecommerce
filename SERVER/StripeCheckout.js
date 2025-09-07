// src/services/stripeCheckout.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function startStripeCheckout(items) {
  // Call your server to create the session
  const resp = await fetch('http://localhost:4242/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Server error: ${text}`);
  }

  const { id } = await resp.json();
  const stripe = await stripePromise;

  const { error } = await stripe.redirectToCheckout({ sessionId: id });
  if (error) throw error;
}
