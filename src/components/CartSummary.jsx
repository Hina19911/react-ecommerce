import { useState } from 'react';
import PropTypes from 'prop-types';

export default function CartSummary({ items, cartTotal }) {
  // Local UI state for coupons
  const [code, setCode] = useState('');
  const [discountPct, setDiscountPct] = useState(0); // e.g., 0.10 for 10%
  const [message, setMessage] = useState(null);      // feedback to user

  // Compute discounted total
  const discountAmount = cartTotal * discountPct;
  const finalTotal = Math.max(cartTotal - discountAmount, 0);

  // Validate & apply coupon
  const applyCoupon = () => {
    const entered = code.trim().toUpperCase();

    if (!entered) {
      setDiscountPct(0);
      setMessage('Please enter a coupon code.');
      return;
    }

    // very simple demo rules
    if (entered === 'SAVE10') {
      setDiscountPct(0.10);
      setMessage('Coupon applied: 10% off');
      return;
    }

    if (entered === 'SAVE15') {
      if (cartTotal >= 100) {
        setDiscountPct(0.15);
        setMessage('Coupon applied: 15% off');
      } else {
        setDiscountPct(0);
        setMessage('SAVE15 requires a minimum subtotal of $100.');
      }
      return;
    }

    // Unknown code
    setDiscountPct(0);
    setMessage('Invalid coupon code.');
  };

  const clearCoupon = () => {
    setCode('');
    setDiscountPct(0);
    setMessage(null);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4">
        {/* Line items */}
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.title} (x{item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        {/* Subtotal */}
        <div className="border-t pt-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm text-gray-800">${cartTotal.toFixed(2)}</span>
          </div>

          {/* Discount row (only when applied) */}
          {discountPct > 0 && (
            <div className="flex justify-between text-sm text-emerald-700 mt-1">
              <span>Discount ({Math.round(discountPct * 100)}%)</span>
              <span>- ${discountAmount.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Coupon input + buttons */}
        <div className="pt-2">
          <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">
            Coupon Code
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="coupon"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. SAVE10"
              className="flex-1 rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Apply
            </button>
            {discountPct > 0 && (
              <button
                type="button"
                onClick={clearCoupon}
                className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Clear
              </button>
            )}
          </div>

          {/* Feedback message */}
          {message && (
            <p
              className={
                'mt-2 text-sm ' +
                (discountPct > 0 ? 'text-emerald-700' : 'text-red-600')
              }
            >
              {message}
            </p>
          )}
        </div>

        {/* Final total */}
        <div className="border-t pt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

CartSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        rate: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      }),
      quantity: PropTypes.number, // added for clarity
    })
  ).isRequired,
  cartTotal: PropTypes.number.isRequired,
};
