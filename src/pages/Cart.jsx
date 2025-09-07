// ✅ React 19 hook: `use` lets you read from a context without `useContext`
import { use } from 'react';
// Import the CartContext object that holds cart state/actions
import { CartContext } from '../context/CartContext';
// For navigation to checkout page
import { Link } from 'react-router-dom'; // use react-router-dom for web apps

export default function Cart() {
  // 🧠 Extract values from CartContext (items, functions, totals)
  // `use(CartContext)` automatically subscribes this component to context updates.
  const { items, removeItem, updateQuantity, cartTotal } = use(CartContext);

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      {/* Title */}
      <h1 className='text-2xl font-bold mb-6'>Shopping Cart</h1>

      {/* Main cart container */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        {/* Divider between each cart item */}
        <div className='divide-y divide-gray-200'>
          {/* Loop through each item in the cart */}
          {items.map((item) => (
            <div key={item.id} className='p-6 flex items-center gap-6'>
              {/* Product image */}
              <img
                src={item.image}
                alt={item.title}
                className='w-24 h-24 object-contain'
              />

              {/* Product title & price */}
              <div className='flex-1'>
                <h3 className='text-lg font-semibold'>{item.title}</h3>
                <p className='text-gray-600'>${item.price}</p>
              </div>

              {/* Quantity controls + remove button */}
              <div className='flex items-center gap-2'>
                {/* Decrease quantity */}
                <button
                  className='p-1 rounded-md hover:bg-gray-100'
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>

                {/* Show current quantity */}
                <span className='w-8 text-center'>{item.quantity}</span>

                {/* Increase quantity */}
                <button
                  className='p-1 rounded-md hover:bg-gray-100'
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>

                {/* Remove from cart completely */}
                <button
                  className='text-red-600 hover:text-red-800'
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart summary & checkout link */}
        <div className='p-6 bg-gray-50'>
          {/* Total price */}
          <div className='flex justify-between items-center mb-6'>
            <span className='text-lg font-semibold'>Total: </span>
            <span className='text-2xl font-bold'>${cartTotal.toFixed(2)}</span>
          </div>

          {/* Proceed to checkout button */}
          <div className='flex justify-end'>
            <Link
              to='/checkout'
              className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
