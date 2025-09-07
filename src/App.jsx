

// Top-level app: fetches products (now via TanStack Query), manages filter state, and defines routes.
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// TanStack Query
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Pages
import ProductsPage from './components/Products'; // Home: Filters + Grid
import ItemPage from './pages/Product';           // Product details
import NotFound from './pages/NotFound';          // 404
import Checkout from './pages/Checkout';          //checkout
import { CartProvider } from './context/CartProvider';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';

// Create a single QueryClient for the app (module scope, not inside a component)
const queryClient = new QueryClient();

// This inner component contains your original app logic & UI.
// It runs INSIDE the provider so it can call useQuery.
function AppContent() {
  // 1) Current filter: { type: 'all' | 'price' | 'category', value?: any }
  const [filter, setFilter] = useState({ type: 'all' });

  // 2) Fetch products with TanStack Query (replaces useEffect + loading/error state)
  const { data: allProducts = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('https://fakestoreapi.com/products');
      // Normalize to array (defensive)
      return Array.isArray(data) ? data : (data?.products ?? []);
    },
    staleTime: 60 * 1000, // consider data fresh for 1 min
  });

  // 3) Derive the visible list from allProducts + filter (unchanged)
  const filteredProducts = useMemo(() => {
    switch (filter.type) {
      case 'price':
        return allProducts.filter(p => Number(p.price) < Number(filter.value));
      case 'category':
        return allProducts.filter(p => p.category === filter.value);
      case 'all':
      default:
        return allProducts;
    }
  }, [allProducts, filter]);

  // 4) Loading & error UIs (now from TanStack flags)
  if (isLoading) return <div className="p-6">Loading Products…</div>;
  if (isError)   return <div className="p-6 text-red-600">Could not load products.</div>;

  // 5) Your existing layout + routes (unchanged)
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex bg-gray-100">
        <section className="flex-grow p-4 w-full">
         
          <Routes>
            {/* Home: pass the derived list + filter setter */}
            <Route
              path="/"
              element={<ProductsPage products={filteredProducts} onFilter={setFilter} />}
            />
            {/*checkout details*/}
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            
            
            <Route path='/checkout/success' element={<CheckoutSuccess />} />
            {/* Details page: reads :id and fetches a single product */}
            <Route path="/item/:id" element={<ItemPage />} />

            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Wrap AppContent with the QueryClientProvider so useQuery works.
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
