import { use } from 'react';
import { CartContext } from '../context/CartContext';
import CartSummary from '../components/CartSummary';
import CheckoutForm from '../components/CheckoutForm';
import { useCheckout } from '../hooks/useCheckout';
import { useNavigate } from 'react-router-dom'; // ✅ from react-router-dom
import { startStripeCheckout } from '../../SERVER/StripeCheckout';

export default function Checkout() {
  const { items, cartTotal, clearCart } = use(CartContext);
  const { mutateAsync: submitCheckout } = useCheckout();
  const navigate = useNavigate();

  if (items.length === 0)
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Cart is Empty</h1>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">
            Add some items to your cart before checking out.
          </p>
        </div>
      </div>
    );

    async function handleCheckout(formData) {
      try {
        // 1. Build order data from form (keep this)
        const orderData = {
          userId: 1,
          date: new Date().toISOString(),
          products: items,
          customer: {
            name: formData.get('name'),
            email: formData.get('email'),
            address: formData.get('address'),
            city: formData.get('city'),
            zipCode: formData.get('zipCode'),
          },
        };
    
        // (Optional) keep FakeStore order for logging/demo
        try {
          await submitCheckout(orderData);
        } catch (err) {
          console.warn("FakeStore order failed (ok for demo):", err);
        }
    
        // 2. Send user to Stripe checkout (replaces navigate)
        await startStripeCheckout(items);
    
        // ⚠️ No clearCart or navigate here because user will leave page
        // On success_url, you'll show CheckoutSuccess page
      } catch (error) {
        console.error("Checkout failed:", error);
        alert("Failed to process checkout");
      }
    }
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <CheckoutForm onSubmit={handleCheckout} />
        <CartSummary items={items} cartTotal={cartTotal} />
      </div>
    </div>
  );
}
