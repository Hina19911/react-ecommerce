require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    const line_items = (items || []).map((it) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: it.title,
          images: it.image ? [it.image] : [],
        },
        unit_amount: Math.round(Number(it.price) * 100),
      },
      quantity: Number(it.quantity ?? 1),
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: 'http://localhost:5173/checkout/success',
      cancel_url: 'http://localhost:5173/cart',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log('Stripe server listening on :4242'));
