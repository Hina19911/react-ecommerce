import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CheckoutForm({ onSubmit }) {
  // local pending UI while submit runs
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();                 // stop the default page reload
    setPending(true);
    try {
      // pass form data up if you want:
      const form = new FormData(e.currentTarget);
      await onSubmit(form);             // parent decides what to do (navigate, etc.)
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md" required />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md" required />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input type="text" id="address" name="address" className="w-full px-3 py-2 border rounded-md" required />
      </div>

      {/* City + Zip */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input type="text" id="city" name="city" className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
            Zip Code/Postal Code
          </label>
          <input type="text" id="zipCode" name="zipCode" className="w-full px-3 py-2 border rounded-md" required />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        disabled={pending}
      >
        {pending ? 'Processing order...' : 'Place Order'}
      </button>
    </form>
  );
}

CheckoutForm.propTypes = {
  // Parent supplies a function; it can accept FormData or Event (we send FormData)
  onSubmit: PropTypes.func.isRequired,
};
