// A presentational component for the filter button bar.
// It does NOT own data; it just renders buttons and notifies parent on change.

// Props:
// - activeFilter (string): which filter is currently selected
// - onChange (fn): parent-supplied setter, e.g. setActiveFilter
export default function Filters({ onFilter }) {
  return (
    <div className="p-4 w-64 bg-white border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <button
        className="block w-full px-4 py-2 my-2 text-white rounded bg-gray-700 hover:bg-gray-800"
        onClick={() => onFilter('under500')}        // 👈 must call onFilter
      >
        Under $500
      </button>

      <button
        className="block w-full px-4 py-2 my-2 text-white rounded bg-blue-600 hover:bg-blue-700"
        onClick={() => onFilter('all')}             // 👈 and pass a value
      >
        Show all Products
      </button>
    </div>
  );
}
