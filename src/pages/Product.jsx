import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function ItemPage() {
  // useParams gives us access to the dynamic route parameter (:id)
  // If URL = /item/3, then id = "3"
  const { id } = useParams();

  // Local state for this page only
  const [item, setItem] = useState(null);  // Holds fetched product object
  const [loading, setLoading] = useState(true); // True until fetch finishes
  const { addItem } = useCart();
  useEffect(() => {
    let cancelled = false;  // flag to prevent state updates after unmount

    async function run() {
      try {
        // Fetch a single product using the id from the URL
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if (!cancelled) setItem(data); // update state only if still mounted
      } finally {
        if (!cancelled) setLoading(false); // stop loading spinner
      }
    }

    run();

    // Cleanup: runs if component unmounts before fetch finishes
    return () => { cancelled = true; };
  }, [id]);  // re-run if user navigates to a different item ID

  // Early return: show loading state while waiting
  if (loading) return <div className="p-6">Loading item…</div>;
  // Early return: show error if no product found
  if (!item)   return <div className="p-6">Item not found.</div>;

  // Once data is loaded, render product details
  return (
    <div className="max-w-4xl mx-auto bg-white rounded p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product image */}
        <img
          src={item.image}
          alt={item.title}
          className="w-64 h-64 object-contain mx-auto"
        />

        {/* Product info */}
        <div>
          <h1 className="text-2xl font-semibold">{item.title}</h1>
          <p className="text-gray-600 mt-2 capitalize">{item.category}</p>
          <p className="text-xl mt-4">${item.price}</p>
          <p className="mt-4 text-gray-700">{item.description}</p>

          {/* Future enhancement: Add to Cart button */}
          <button
   type="button"
  className="mt-6 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
   onClick={() => addItem(item, 1)}
 > Add to Cart  </button>
        </div>
      </div>
    </div>
  );
}

