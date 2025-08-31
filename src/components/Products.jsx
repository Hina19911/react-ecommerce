import Filters from "../components/Filters";
import ProductsGrid from "../components/ProductsGrid";

export default function ProductsPage({ products, onFilter }) {
  // props:
  // - products: array of products derived in App.jsx (filteredProducts)
  // - onFilter: function passed from App.jsx (setFilter), expects {type, value}

  return (
    <>
      {/* Sidebar / filter section */}
      <div className="mb-4">
        {/* Pass the parent filter setter down to Filters component */}
        <Filters onFilter={onFilter} />
      </div>

      {/* Products grid: shows whatever products list was passed */}
      <ProductsGrid products={products} />
    </>
  );
}
