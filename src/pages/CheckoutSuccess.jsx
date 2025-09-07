import { Link } from 'react-router-dom';
import checkmarkIcon from '../assets/checkmark.png'; // icon
import { use } from 'react';
import { CartContext } from '../context/CartContext';

export default function CheckoutSuccess() {
  const { clearCart } = use(CartContext);

  useEffect(() => {
    clearCart(); // empty cart when returning from Stripe
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
      <div className="mb-8">
        <img src={checkmarkIcon} alt="Checkout success" className="w-16 h-16 mx-auto" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8">
        Thanks for your purchase. We will send you an email with your order details.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
