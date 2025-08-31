// A presentational component for the filter button bar.
// It does NOT own data; it just renders buttons and notifies parent on change.

// Props:
// - activeFilter (string): which filter is currently selected
// - onChange (fn): parent-supplied setter, e.g. setActiveFilter

// src/components/Filters.jsx
import { use, Suspense } from 'react';

// fetch once, cache at module level
const categoriesPromise = fetch('https://fakestoreapi.com/products/categories')
  .then(r => r.json());

// Inner component that suspends while categories load
function FiltersContent({ onFilter }) {
  const categories = use(categoriesPromise);

  const send = (payload) => {
    if (typeof onFilter === 'function') onFilter(payload);
  };

  return (
    <aside className="p-4 w-64 bg-white border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price & All (your buttons) */}
      <button
        type="button"
        className="block w-full px-4 py-2 my-2 text-white rounded bg-gray-700 hover:bg-gray-800"
        onClick={() => send({ type: 'price', value: 500 })}
      >
        Under $500
      </button>

      <button
        type="button"
        className="block w-full px-4 py-2 my-2 text-white rounded bg-blue-600 hover:bg-blue-700"
        onClick={() => send({ type: 'all' })}
      >
        Show all Products
      </button>

      {/* Category buttons (dynamic) */}
      {categories.map((cat) => (
        <button
          type="button"
          key={cat}
          className="block w-full px-4 py-2 my-2 text-white rounded bg-gray-500 hover:bg-gray-600"
          onClick={() => send({ type: 'category', value: cat })}
        >
          {cat}
        </button>
      ))}
    </aside>
  );
}

// Suspense boundary shows fallback until categories resolve
export default function Filters(props) {
  return (
    <Suspense fallback={<div className="p-4">Loading filters…</div>}>
      <FiltersContent {...props} />
    </Suspense>
  );
}
