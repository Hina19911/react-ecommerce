# Ecommerce React App + Stripe Checkout

A simple ecommerce demo built with **React (Vite)**, **React Router**, **Context API** (cart), **TanStack Query** (data), **Tailwind CSS**, and **Stripe Checkout** for payments. Includes product listing with filters, product detail page, cart, checkout form, and a success screen.

---

## ✨ Features

- Product list with **price/category filters**
- Product **detail** page (`/item/:id`)
- **Cart** with add/remove/update quantity
- **Coupon** demo (`SAVE10`, `SAVE15` with $100 min)
- **Checkout** form + **Stripe Checkout** redirect
- **Success** page (`/checkout/success`)
- Data fetching with **TanStack Query**
- Styling with **Tailwind CSS**
- State via **React Context** (Cart)

---

## 🧱 Project Structure

```
.
├── ecommerce/                 # React app (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   │   └── screenshots/       # <— put images here for README
│   ├── .env                    # VITE_STRIPE_PUBLISHABLE_KEY=...
│   └── package.json
└── server/                    # Express server for Stripe
    ├── index.js
    ├── .env                   # STRIPE_SECRET_KEY=...
    └── package.json
```

---

## 🔧 Prerequisites

- Node.js 18+ recommended
- Stripe test keys (publishable + secret)

---

## ⚙️ Environment Variables

**Frontend `ecommerce/.env`**
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

**Backend `server/.env`**
```
STRIPE_SECRET_KEY=sk_test_xxx
```

> Never commit secrets. Ensure `.env` is in `.gitignore`.

---

## 🚀 Getting Started (Local)

### 1) Install & run the backend (Stripe server)
```bash
cd server
npm install
# If using ES Modules, package.json should include: "type": "module"
npm run start
# server runs on http://localhost:4242
```

**server/index.js** (summary)
- `POST /create-checkout-session` creates a Stripe Checkout Session from cart items.
- `success_url` → `http://localhost:5173/checkout/success`
- `cancel_url` → `http://localhost:5173/cart`

### 2) Install & run the frontend
```bash
cd ../ecommerce
npm install
npm run dev
# app runs on http://localhost:5173
```

---

## 🛒 Stripe Checkout Flow (how it works)

- In `Checkout.jsx`, the form collects user data.
- We call `startStripeCheckout(items)` (in `src/services/stripeCheckout.js`) which:
  1. `POST`s cart items to `http://localhost:4242/create-checkout-session`
  2. Receives a `session.id`
  3. Calls `stripe.redirectToCheckout({ sessionId })`
- Stripe hosts payment UI and, on success, redirects back to `/checkout/success`.

> If you want to clear the cart **after** real payment, call `clearCart()` in the Success page’s `useEffect`.

---

## 📸 Screenshots



### Filters (Products)
![Products](/public/Screenshot_1.png)

### Stripe Checkout
![Detail](/public/Screenshot_2.png)

### Shopping Cart
![Cart](/public/shoppingCart.png)

### Checkout
![Checkout](/public/Screenshot_3.png)


---

## 🧪 Test Cards (Stripe)

Use Stripe test card numbers on Checkout:

- **4242 4242 4242 4242** — any future expiry, any CVC, any ZIP

