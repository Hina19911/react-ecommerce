
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsGrid from './components/ProductsGrid';
import Filters from './components/Filters';
import { useEffect, useState } from 'react';
import Products from './components/Products';  // 
import axios from 'axios';

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // (Optional) if you want to show a message on failure:
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("https://fakestoreapi.in/api/products?limit=20");
        
        console.log("RAW API response:", data); // 👀 check this in DevTools
        
        // If data is { products: [...] }, grab that array
        const items = Array.isArray(data) ? data : (data.products ?? []);
        
        setAllProducts(items);
        setFilteredProducts(items);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  

  //  filter API 
  const handleFilter = (filterType) => {
    if (filterType === 'under500') {
      setFilteredProducts(allProducts.filter(p => p.price < 500));
    } else {
      setFilteredProducts(allProducts);
    }
  };

  if (loading) return <div className="p-6">Loading Products…</div>;
  if (error)   return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex bg-gray-100">
        {/* If your Filters expects onFilter (teacher’s style) */}
        <Filters onFilter={handleFilter} />

        <section className="flex-grow p-4">
          <ProductsGrid products={filteredProducts} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
